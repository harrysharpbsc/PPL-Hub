"""ppl-scans assemble.py: synthetic note + content -> a new topic file that passes the lint. Run from src/."""
import os, sys, json, shutil, subprocess, tempfile, glob
src = os.getcwd(); here = os.path.dirname(os.path.abspath(__file__))
D = tempfile.mkdtemp(); C = os.path.join(D, 'content'); shutil.copytree(os.path.join(src, 'content'), C)
N = os.path.join(here, 'fixtures', 'notes')
open(os.path.join(D, 'c.py'), 'w').write('''T={'91 New Style.md':dict(topic="New Style Test",num=91,summary="S.",
 sum={"Visual flight":"One line."},
 cards=[["What is a term?","A definition.",{"sec":"Visual flight","rule":"SERA.5005"}]],
 quiz=[["Which is right?",["Alpha one","Bravo two","Charlie 3","Delta four"],0,"Because.",{"sec":"Visual flight"}]])}''')
env = dict(os.environ, PPL_CONTENT=C)
A = os.path.join(here, '..', '.claude', 'skills', 'ppl-scans', 'scripts', 'assemble.py')
r = subprocess.run([sys.executable, A, N, os.path.join(D, 'c.py')], cwd=src, env=env, capture_output=True, text=True)
assert r.returncode == 0, r.stderr
assert 'diagram idea: Figure 8-1' in r.stderr, r.stderr
f = glob.glob(os.path.join(C, '01-air-law', '*-new-style-test.json'))
assert len(f) == 1, f
t = json.load(open(f[0]))
assert t['seq'] == 39 and t['num'] == 91 and t['note']['file'] == '91 New Style.md', t
assert t['cards'][0]['ref'] == {'sec': 'Visual flight', 'rule': 'SERA.5005'}
r = subprocess.run([sys.executable, os.path.join(here, 't_content.py')], cwd=src, env=env, capture_output=True, text=True)
assert r.returncode == 0 and 'PASS' in r.stdout, r.stdout + r.stderr
# a second run refuses (topic exists); content without a ref is refused
r = subprocess.run([sys.executable, A, N, os.path.join(D, 'c.py')], cwd=src, env=env, capture_output=True, text=True)
assert r.returncode != 0 and 'already in the app' in r.stderr
open(os.path.join(D, 'c2.py'), 'w').write(open(os.path.join(D, 'c.py')).read().replace('New Style Test', 'Other').replace(',{"sec":"Visual flight","rule":"SERA.5005"}', '').replace('num=91,', 'num=91,rename={"Visual flight rules":"Visual flight rules 2"},'))
r = subprocess.run([sys.executable, A, N, os.path.join(D, 'c2.py')], cwd=src, env=env, capture_output=True, text=True)
assert r.returncode != 0 and 'needs a ref' in r.stderr, r.stderr
shutil.rmtree(D)
print('PASS assemble')
