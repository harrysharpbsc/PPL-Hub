"""ppl-notes-sync drift check on a synthetic vault (tests/fixtures/notes). Run from src/."""
import os, sys, json, shutil, subprocess, tempfile
src = os.getcwd(); here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(here, '..', '.claude', 'skills', 'ppl-scans', 'scripts'))
from md2sec import conv
D = tempfile.mkdtemp(); C = os.path.join(D, 'content', '01-air-law'); N = os.path.join(D, 'notes'); os.makedirs(C); os.makedirs(N)
shutil.copy(os.path.join(here, 'fixtures', 'notes', '91 New Style.md'), N)
secs = conv(os.path.join(N, '91 New Style.md'))
h = secs[0][0]
topic = {'seq': 0, 's': 0, 'topic': 'New Style', 'num': 91, 'order': 910, 'conf': 'weak', 'status': 'draft', 'summary': 'x',
         'sections': secs, 'sum': {h: 'y'}, 'cards': [{'q': 'Term?', 'a': 'A definition.', 'ref': {'sec': h[:6]}}], 'quiz': []}
json.dump(topic, open(os.path.join(C, '00-new-style.json'), 'w'))
A, R = 'fA', 'fR'
def listing(mod, extra=()):
    files = [{'title': '91 New Style.md', 'id': '1', 'parent': A, 'modified': mod},
             {'title': '92 Not Imported.md', 'id': '2', 'parent': A, 'modified': mod}] + list(extra)
    p = os.path.join(D, 'l.json'); json.dump({'root': R, 'folders': {A: '01 Air Law', R: 'PPL'}, 'files': files}, open(p, 'w')); return p
def run(*a):
    env = dict(os.environ, PPL_CONTENT=os.path.join(D, 'content'))
    r = subprocess.run([sys.executable, os.path.join(here, '..', '.claude', 'skills', 'ppl-notes-sync', 'scripts', 'drift.py')] + list(a),
                       cwd=src, env=env, capture_output=True, text=True)
    assert r.returncode == 0, r.stderr
    return r.stdout
out = run(listing('2026-11-01T00:00:00Z', [{'title': '91 New Style.md', 'id': '3', 'parent': R, 'modified': '2026-10-01T00:00:00Z'}]),
          '--notes', N, '--record', '--json', os.path.join(D, 'r.json'))
r = json.load(open(os.path.join(D, 'r.json')))
assert r['first_seen'] and not r['diffs'], r
assert r['no_topic'] and '92 Not Imported' in r['no_topic'][0], r
assert r['outside_subject_folder'] and 'vault root' in r['outside_subject_folder'][0], r
t = json.load(open(os.path.join(C, '00-new-style.json')))
assert t['note']['modified'] == '2026-11-01T00:00:00Z' and len(t['note']['sha']) == 16, t['note']
# unchanged on a second run
run(listing('2026-11-01T00:00:00Z'), '--notes', N, '--json', os.path.join(D, 'r.json'))
r = json.load(open(os.path.join(D, 'r.json'))); assert r['unchanged'] and not r['changed'], r
# Harry edits the note: one bullet changes and a section is added
p = os.path.join(N, '91 New Style.md'); s = open(p).read()
s = s.replace('a definition, see', 'a better definition, see').replace('### Practice Questions', '## A new section\n- New fact\n\n### Practice Questions')
open(p, 'w').write(s)
out = run(listing('2026-11-20T00:00:00Z'), '--notes', N, '--json', os.path.join(D, 'r.json'))
r = json.load(open(os.path.join(D, 'r.json')))
assert r['changed'], r
d = r['diffs']['New Style']
assert d['added_sections'] == ['A new section'], d
assert h in d['changed'] and any('better definition' in x for x in d['changed'][h]['new_in_note']), d
assert d['items_to_recheck'] == [['card', 'Term?']], d
assert 'Edited since they were imported' in out, out
shutil.rmtree(D)
print('PASS drift')
