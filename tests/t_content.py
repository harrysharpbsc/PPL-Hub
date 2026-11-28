"""Content lint for src/content (no browser). Run from src/.
  python3 ../tests/t_content.py               report; fails on schema problems or errors not in the baseline
  python3 ../tests/t_content.py --all         list every error and warning, baseline included
  python3 ../tests/t_content.py --rebaseline  accept today's errors as known debt (only when they are old debt)
Also checks that each rule fires on a bad example (self-test)."""
import sys, os, json, copy
sys.path.insert(0, os.getcwd())
import content

ts = content.load()
P = content.check(ts)
assert not P, P[:10]
E, W = content.lint(ts)

if '--rebaseline' in sys.argv:
    b = {}
    for code, where, _ in E: b.setdefault(code, []).append(where)
    json.dump({k: sorted(set(v)) for k, v in sorted(b.items())}, open(os.path.join(content.ROOT, 'lint_baseline.json'), 'w'),
              ensure_ascii=False, indent=1)
    print('baseline written:', {k: len(v) for k, v in b.items()})

base = content.baseline()
known = {(k, w) for k, v in base.items() for w in v}
new = [e for e in E if (e[0], e[1]) not in known]
gone = len(known - {(e[0], e[1]) for e in E})
by = {}
for e in E: by[e[0]] = by.get(e[0], 0) + 1
byw = {}
for w in W: byw[w[0]] = byw.get(w[0], 0) + 1
print('errors by rule:', by)
print('warnings by rule:', byw)
if gone: print('%d baseline entries are fixed now; run --rebaseline to shrink the baseline' % gone)
if '--all' in sys.argv:
    for e in E: print('ERROR  ', *e)
    for w in W: print('WARNING', *w)

# self-test: every rule must catch a planted problem
t0 = copy.deepcopy([t for t in ts if t['quiz'] and t['cards']][0])
def fires(mut, code):
    t = copy.deepcopy(t0); t['_file'] = 'selftest'; mut(t)
    E2, W2 = content.lint([t])
    return any(e[0] == code for e in E2 + W2)
h0 = t0['sections'][0][0]
q = lambda t: t['quiz'][0]
assert fires(lambda t: t['cards'].append(dict(t['cards'][0])), 'dup-question')
assert fires(lambda t: q(t).update(o=['A', 'A', 'B', 'C']), 'quiz-shape')
assert fires(lambda t: q(t).update(o=['None of the above', 'x', 'y', 'z'], a=1), 'all-above')
assert fires(lambda t: q(t).update(o=['a much longer correct option here', 'short', 'brief', 'tiny'], a=0), 'longest')
assert fires(lambda t: q(t).pop('ref', None), 'no-ref')
assert fires(lambda t: q(t).update(ref={'sec': 'No such heading xyz'}), 'bad-ref')
assert fires(lambda t: t['sum'].pop(h0), 'no-summary')
assert fires(lambda t: t['cards'][0].update(a='ATC is ultimately responsible for avoiding a collision.'), 'errata')
assert fires(lambda t: t['cards'][0].update(a='About 27 ft per hPa.'), 'errata')
assert not fires(lambda t: t['cards'][0].update(a='About 30 ft per hPa (27 ft per hPa more precisely).'), 'errata')
assert fires(lambda t: t['cards'][0].update(a='x' * 200), 'card-long')
assert content.check([dict(t0, quiz=[{'q': 'x'}])]), 'schema check must catch a malformed quiz item'

assert not new, 'new lint errors:\n' + '\n'.join(' | '.join(e) for e in new[:30])
print('PASS', len(ts), 'topics,', len(E), 'known errors,', len(W), 'warnings')
