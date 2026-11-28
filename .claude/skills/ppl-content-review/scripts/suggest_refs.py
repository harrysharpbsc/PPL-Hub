"""Suggest ref.sec for cards/questions without a ref, by word overlap with each section of the topic.
usage (from src/): python3 suggest_refs.py OUT.json [--topic NAME ...]
OUT.json: [{"file","kind","i","q","best","score","second","score2","rule"}] - a suggestion, never applied
automatically: Claude checks each one (the fact must really be in that section) before writing it."""
import sys, os, re, json, math
sys.path.insert(0, os.getcwd())
import content
STOP = set('a an the of to in on at for and or is are be by with as it its this that from which what who when where how '
           'must may can not no if than then there their they you your do does did was were has have had will would should '
           'about into over under more less any all each other also only one two three four true false following'.split())
RULE = re.compile(r'\b(SERA\.\d+|Rule \d+|Part-[A-Z]+(?:\.[A-Z]+)*\.\d+|ICAO Annex \d+|ANO(?: 2016)?(?: art(?:icle)?\.? ?\d+)?|CAP \d+|Article \d+|Annex \d+)', re.I)


def words(s):
    s = re.sub(r'<[^>]+>', ' ', s).lower()
    return [w for w in re.findall(r"[a-z0-9][a-z0-9.,'-]*[a-z0-9]|[a-z0-9]", s) if w not in STOP]


def suggest(t):
    secs = t['sections']
    df = {}
    docs = []
    for h, b in secs:
        ws = set(words(h + ' ' + ' '.join(b)))
        docs.append((h, ws, set(words(h))))
        for w in ws: df[w] = df.get(w, 0) + 1
    idf = lambda w: math.log((len(secs) + 1) / (df.get(w, 0) + 0.5))
    out = []
    for kind, items in (('card', t['cards']), ('quiz', t['quiz'])):
        for i, it in enumerate(items):
            if it.get('ref'): continue
            text = it['q'] + ' ' + (it['a'] if kind == 'card' else it['o'][it['a']] + ' ' + it['why'])
            qw = set(words(text))
            sc = sorted(((sum(idf(w) for w in qw & ws) + 0.5 * sum(idf(w) for w in qw & hw), h) for h, ws, hw in docs), reverse=True)
            best, second = sc[0], (sc[1] if len(sc) > 1 else (0, ''))
            m = RULE.search(best[1]) or RULE.search(text)
            out.append({'file': t['_file'], 'topic': t['topic'], 'kind': kind, 'i': i, 'q': it['q'], 'best': best[1], 'score': round(best[0], 1),
                        'second': second[1], 'score2': round(second[0], 1), 'rule': m.group(1) if m else ''})
    return out


if __name__ == '__main__':
    a = sys.argv[1:]; only = set(a[i + 1] for i, x in enumerate(a) if x == '--topic')
    res = [r for t in content.load() if not only or t['topic'] in only for r in suggest(t)]
    json.dump(res, open(a[0], 'w'), ensure_ascii=False, indent=1)
    sure = [r for r in res if r['score'] >= 2 * max(r['score2'], 0.1)]
    print(len(res), 'items,', len(sure), 'with a clear best section (score at least twice the runner-up),', len(res) - len(sure), 'to judge by hand')
