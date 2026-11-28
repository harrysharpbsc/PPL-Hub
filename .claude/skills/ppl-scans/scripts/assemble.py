"""Turn Obsidian notes + hand-written app content into topic files in src/content/<NN-subject>/.

usage (from src/): python3 assemble.py NOTES_DIR CONTENT.py [CONTENT2.py ...]
Each CONTENT.py defines T = {'<note file name>.md': dict(
    topic=, num=, s=0, summary=, sum={heading prefix: one-liner},
    cards=[["Question?", "Answer.", {"sec": "Heading prefix", "rule": "SERA.3210"}], ...],
    quiz=[["Question", ["right", "wrong", "wrong", "wrong"], 0, "Why ...", {"sec": "...", "rule": "..."}], ...],
    rename={'old heading': 'new heading'},   # optional, to avoid heading clashes
    modified='<Drive modifiedTime of the note>')}  # optional; ppl-notes-sync --record can fill it later
Every card and question needs its ref (the section the fact is in; rule where one exists).
Write the correct option first (index 0); the app shuffles them.
New topics take the next free seq, so existing progress is untouched. Refuses to overwrite a topic.
Then run python3 ../tests/t_content.py: the lint must show no new errors.
"""
import json, sys, os, re, importlib.util, hashlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.getcwd())
from md2sec import conv
import content

ndir, mods = sys.argv[1], sys.argv[2:]
T = {}
for m in mods:
    spec = importlib.util.spec_from_file_location('c', m); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod); T.update(mod.T)
SUBJ = json.loads(re.search(r'var SUBJECTS=(\[.*?\]);', open('data.js').read()).group(1))
ts = content.load()
topics = {t['topic'] for t in ts}
heads = {s[0] for t in ts for s in t['sections']}
seq = max(t['seq'] for t in ts) + 1


def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower().replace("'", '')).strip('-')


def ref(x, where):
    assert isinstance(x, dict) and x.get('sec'), where + ': needs a ref {"sec": ..., "rule": ...}'
    return x


new = []
for f, d in sorted(T.items(), key=lambda kv: kv[1]['num']):
    p = os.path.join(ndir, f); figs = []
    secs = conv(p, figs)
    for s in secs: s[0] = d.get('rename', {}).get(s[0], s[0])
    hl = [s[0] for s in secs]; sm = {}
    assert d['topic'] not in topics, 'topic name already in the app: ' + d['topic']
    for k, v in d['sum'].items():
        hs = [h for h in hl if h.startswith(k)]
        assert len(hs) == 1, (f, k, hs)
        assert hs[0] not in heads, 'heading clashes with another topic, rename it: ' + hs[0]
        sm[hs[0]] = v; heads.add(hs[0])
    miss = [h for h in hl if h not in sm]
    assert not miss, (f, 'sections without a one-line summary', miss)
    s = d.get('s', 0)
    t = {'seq': seq, 's': s, 'topic': d['topic'], 'num': d['num'], 'order': d['num'] * 10, 'conf': 'weak', 'status': 'draft',
         'summary': d['summary'],
         'note': dict({'file': f, 'sha': hashlib.sha256(open(p, 'rb').read()).hexdigest()[:16]}, **({'modified': d['modified']} if d.get('modified') else {})),
         'sections': secs, 'sum': sm,
         'cards': [{'q': c[0], 'a': c[1], 'ref': ref(c[2] if len(c) > 2 else None, 'card ' + c[0][:50])} for c in d['cards']],
         'quiz': [{'q': q[0], 'o': q[1], 'a': q[2], 'why': q[3], 'ref': ref(q[4] if len(q) > 4 else None, 'quiz ' + q[0][:50])} for q in d['quiz']]}
    for q in t['quiz']: assert len(q['o']) == 4 and len(set(q['o'])) == 4 and 0 <= q['a'] < 4, q['q']
    dirn = os.path.join(content.ROOT, '%02d-%s' % (s + 1, slug(SUBJ[s])))
    os.makedirs(dirn, exist_ok=True)
    out = os.path.join(dirn, '%02d-%s.json' % (seq, slug(d['topic'])))
    assert not os.path.exists(out), 'refusing to overwrite ' + out
    open(out, 'w', encoding='utf-8').write(json.dumps(t, ensure_ascii=False, indent=1) + '\n')
    topics.add(d['topic']); seq += 1
    print(d['num'], d['topic'], len(secs), 'sections', len(t['cards']), 'cards', len(t['quiz']), 'quiz ->', os.path.relpath(out), file=sys.stderr)
    for fg in figs: print('   diagram idea:', fg[1], '(section: %s)' % fg[2], file=sys.stderr)
