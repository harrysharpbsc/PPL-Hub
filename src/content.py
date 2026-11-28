"""Study content: one JSON file per topic in src/content/<NN-subject>/<seq>-<slug>.json.

load()       -> topics sorted by seq (seq = position in NOTES, so n.id and progress stay stable)
check(ts)    -> schema problems (always fatal)
lint(ts)     -> (errors, warnings), each a list of (code, where, message)
to_js(ts)    -> the NOTES / SUM / MN block build.py inserts at /*DATA*/
gate()       -> what build.py runs: schema + lint, fails on any error not in lint_baseline.json

Shape of a topic file (see content/schema.md):
  seq, s, topic, [num], order, conf, status, summary, [src], [note], sections, sum, cards, quiz
  card = {q, a, [m], [ref]}   quiz = {q, o:[4 options, correct one usually first], a, why, [ref]}
  ref  = {sec: heading prefix in this topic, [rule]: "SERA.3210", [p]: "p.46"}
Progress is keyed on topic name + question text, so never change those for an existing item.
"""
import json, os, re, sys, glob

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, 'content')

TOPIC_KEYS = {'seq': int, 's': int, 'topic': str, 'num': int, 'order': int, 'conf': str, 'status': str,
              'summary': str, 'src': list, 'note': dict, 'sections': list, 'sum': dict, 'cards': list, 'quiz': list}
REQUIRED = ['seq', 's', 'topic', 'order', 'conf', 'status', 'summary', 'sections', 'sum', 'cards', 'quiz']
LONG_RATIO = 1.3        # correct option this much longer than the average wrong one gives the answer away
SUBJECT_LONGEST = 0.35  # at most this share of a subject's questions may have the correct option longest
CARD_MAX = 160          # longer card answers are rarely one fact


def load(root=ROOT):
    ts = []
    for f in sorted(glob.glob(os.path.join(root, '*', '*.json'))):
        t = json.load(open(f, encoding='utf-8'))
        t['_file'] = os.path.relpath(f, root)
        ts.append(t)
    ts.sort(key=lambda t: t.get('seq', 1e9))
    return ts


def _strip(s):
    return re.sub(r'<[^>]+>', '', s).replace('&amp;', '&').strip()


def check(ts):
    """Schema problems: wrong types, missing keys, malformed items. These can never be baselined."""
    P = []
    seqs = {}
    for t in ts:
        w = t.get('_file', '?')
        for k in REQUIRED:
            if k not in t: P.append(('schema', w, 'missing key ' + k))
        for k, v in t.items():
            if k.startswith('_'): continue
            if k not in TOPIC_KEYS: P.append(('schema', w, 'unknown key ' + k)); continue
            if not isinstance(v, TOPIC_KEYS[k]) or (TOPIC_KEYS[k] is int and isinstance(v, bool)):
                P.append(('schema', w, '%s should be %s' % (k, TOPIC_KEYS[k].__name__)))
        if P and P[-1][1] == w: continue
        if t['seq'] in seqs: P.append(('schema', w, 'seq %d also used by %s' % (t['seq'], seqs[t['seq']])))
        seqs[t['seq']] = w
        for s in t['sections']:
            if not (isinstance(s, list) and len(s) == 2 and isinstance(s[0], str) and isinstance(s[1], list)
                    and all(isinstance(b, str) for b in s[1])):
                P.append(('schema', w, 'bad section %r' % (s[:1],)))
        for i, c in enumerate(t['cards']):
            if not (isinstance(c, dict) and isinstance(c.get('q'), str) and isinstance(c.get('a'), str)
                    and set(c) <= {'q', 'a', 'm', 'ref'}):
                P.append(('schema', w, 'bad card %d' % i))
            elif 'ref' in c: P += _check_ref(c['ref'], w, 'card %d' % i)
        for i, q in enumerate(t['quiz']):
            if not (isinstance(q, dict) and isinstance(q.get('q'), str) and isinstance(q.get('o'), list)
                    and isinstance(q.get('a'), int) and isinstance(q.get('why'), str)
                    and set(q) <= {'q', 'o', 'a', 'why', 'ref'}):
                P.append(('schema', w, 'bad quiz item %d' % i))
            elif 'ref' in q: P += _check_ref(q['ref'], w, 'quiz %d' % i)
        if 'src' in t and not all(isinstance(x, list) and len(x) == 2 for x in t['src']):
            P.append(('schema', w, 'src should be [[title, url], ...]'))
    return P


def _check_ref(r, w, it):
    if not (isinstance(r, dict) and isinstance(r.get('sec'), str) and set(r) <= {'sec', 'rule', 'p'}
            and all(isinstance(v, str) for v in r.values())):
        return [('schema', w, it + ': ref should be {sec, [rule], [p]} strings')]
    return []


def _errata():
    f = os.path.join(ROOT, 'errata.json')
    return json.load(open(f, encoding='utf-8')) if os.path.exists(f) else []


def longest_tell(q):
    """True when the correct option is the unique longest and clearly longer than the wrong ones."""
    L = [len(_strip(o)) for o in q['o']]
    c = L[q['a']]
    rest = [x for i, x in enumerate(L) if i != q['a']]
    return c > max(rest) and c >= LONG_RATIO * (sum(rest) / len(rest))


def unique_longest(q):
    L = [len(_strip(o)) for o in q['o']]
    return L[q['a']] > max(x for i, x in enumerate(L) if i != q['a'])


def lint(ts):
    E, W = [], []
    errata = [(re.compile(e['re'], re.I), e.get('unless') and re.compile(e['unless'], re.I), e['msg']) for e in _errata()]
    names, heads = {}, {}
    per_subject = {}
    for t in ts:
        tn = t['topic']
        if tn in names: E.append(('dup-topic', tn, 'topic name also in ' + names[tn]))
        names[tn] = t['_file']
        hl = [s[0] for s in t['sections']]
        for h in hl:
            if h in heads and heads[h] != tn:
                E.append(('dup-heading', tn + ' | ' + h, 'heading also in "%s" (SUM is shared, one summary is lost)' % heads[h]))
            heads.setdefault(h, tn)
            if not t['sum'].get(h): E.append(('no-summary', tn + ' | ' + h, 'section has no one-line summary'))
        for k in t['sum']:
            if k not in hl: E.append(('stray-summary', tn + ' | ' + k, 'summary for a heading this topic does not have'))
        used = set()

        def ref_ok(r, where):
            if not r:
                E.append(('no-ref', where, 'no ref to the note section it comes from')); return
            if not any(h.startswith(r['sec']) for h in hl):
                E.append(('bad-ref', where, 'ref.sec "%s" matches no section heading' % r['sec'])); return
            used.update(h for h in hl if h.startswith(r['sec']))
            if t['s'] == 0 and 'num' in t and not r.get('rule'):
                W.append(('no-rule', where, 'Air Law item without ref.rule (SERA/ANO/Part-FCL...)'))

        seen = set()
        for c in t['cards']:
            where = tn + ' | card: ' + c['q'][:70]
            if c['q'] in seen: E.append(('dup-question', where, 'same question twice in this topic (progress clash)'))
            seen.add(c['q'])
            ref_ok(c.get('ref'), where)
            a = _strip(c['a'])
            if len(a) > CARD_MAX or a.count(';') >= 2:
                W.append(('card-long', where, '%d chars: probably more than one fact' % len(a)))
            for rx, un, msg in errata:
                if rx.search(a) and not (un and un.search(a)): E.append(('errata', where, msg))
        seenq = set()
        ps = per_subject.setdefault(t['s'], [0, 0])
        for q in t['quiz']:
            where = tn + ' | quiz: ' + q['q'][:70]
            if q['q'] in seenq: E.append(('dup-question', where, 'same question twice in this topic (progress clash)'))
            seenq.add(q['q'])
            if len(q['o']) != 4 or len(set(q['o'])) != 4 or not 0 <= q['a'] < len(q['o']):
                E.append(('quiz-shape', where, 'needs 4 distinct options and a valid answer index')); continue
            if any(re.search(r'\b(all|none|both) of the (above|these)\b', o, re.I) for o in q['o']):
                E.append(('all-above', where, 'options are shuffled, so "all/none of the above" breaks'))
            ref_ok(q.get('ref'), where)
            if longest_tell(q): E.append(('longest', where, 'correct option is clearly the longest (guessable)'))
            ps[0] += 1; ps[1] += unique_longest(q)
            right = _strip(q['o'][q['a']]) + ' ' + _strip(q['why'])
            for rx, un, msg in errata:
                if rx.search(_strip(q['o'][q['a']])) and not (un and un.search(right)): E.append(('errata', where, msg))
        if t['cards'] or t['quiz']:
            for h in hl:
                if h not in used and any(x.get('ref') for x in t['cards'] + t['quiz']):
                    W.append(('uncovered', tn + ' | ' + h, 'no card or question points at this section'))
    for s, (n, l) in sorted(per_subject.items()):
        if n and l / n > SUBJECT_LONGEST:
            E.append(('subject-longest', 'subject %d' % s, '%d%% of questions have the correct option longest (max %d%%)'
                      % (round(100 * l / n), round(100 * SUBJECT_LONGEST))))
    return E, W


def _card(c):
    return [c['q'], c['a']] + ([c['ref']] if c.get('ref') else [])


def _quiz(q):
    return [q['q'], q['o'], q['a'], q['why']] + ([q['ref']] if q.get('ref') else [])


def to_js(ts):
    out = ['var NOTES=[],SUM={},MN={};']
    for t in ts:
        n = {k: t[k] for k in ['s', 'topic', 'num', 'order', 'conf', 'status', 'summary', 'sections'] if k in t}
        n['cards'] = [_card(c) for c in t['cards']]
        n['quiz'] = [_quiz(q) for q in t['quiz']]
        if 'src' in t: n['src'] = t['src']
        out.append('NOTES.push(' + json.dumps(n, ensure_ascii=False, separators=(',', ':')) + ');')
        out.append('Object.assign(SUM,' + json.dumps(t['sum'], ensure_ascii=False, separators=(',', ':')) + ');')
        mn = {c['q']: c['m'] for c in t['cards'] if c.get('m')}
        if mn: out.append('Object.assign(MN,' + json.dumps(mn, ensure_ascii=False, separators=(',', ':')) + ');')
    return '\n'.join(out)


def baseline():
    f = os.path.join(ROOT, 'lint_baseline.json')
    return json.load(open(f, encoding='utf-8')) if os.path.exists(f) else {}


def gate(ts=None, verbose=False):
    """Fail (SystemExit) on schema problems or lint errors not listed in lint_baseline.json."""
    ts = ts if ts is not None else load()
    P = check(ts)
    if P:
        for p in P: print('SCHEMA', *p, file=sys.stderr)
        sys.exit('content: %d schema problem(s)' % len(P))
    E, W = lint(ts)
    base = baseline()
    new = [e for e in E if e[1] not in set(base.get(e[0], []))]
    if verbose or new:
        for e in new: print('ERROR', *e, file=sys.stderr)
    if new:
        sys.exit('content: %d new lint error(s); fix them (or, only for known old debt, rerun tests/t_content.py --rebaseline)' % len(new))
    return E, W


if __name__ == '__main__':
    E, W = gate(verbose=True)
    print(len(E), 'known errors (baseline),', len(W), 'warnings')
