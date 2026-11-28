"""Compare Harry's Obsidian vault (Drive) with the app topics in src/content. Run from src/.

usage: python3 drift.py LISTING.json [--notes DIR] [--record] [--json OUT.json]
  LISTING.json  {"root": vault folder id, "folders": {id: name}, "files": [{"title","id","parent","modified"}]}
                written by Claude from Drive search_files results (keep it in the scratchpad: IDs stay out of git)
  --notes DIR   raw notes downloaded from Drive, named by title ("08 Visual Flight Rules.md"); changed notes
                found here are diffed section by section against the app
  --record      write note {file, modified, sha} into each matched topic file (do this only after an import
                or re-import Harry has approved, or once to set the starting point)
Report only: it never edits his vault."""
import sys, os, json, re, hashlib
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(here, '..', '..', 'ppl-scans', 'scripts'))
sys.path.insert(0, os.getcwd())
from md2sec import conv
import content

a = sys.argv[1:]
listing = json.load(open(a[0]))
notes_dir = a[a.index('--notes') + 1] if '--notes' in a else None
record = '--record' in a
out_json = a[a.index('--json') + 1] if '--json' in a else None
SUBJ = json.loads(re.search(r'var SUBJECTS=(\[.*?\]);', open('data.js').read()).group(1))

folders = listing['folders']; root = listing['root']


def subject_of(folder_id):
    """Subject index for a subject folder ('01 Air Law'), else None."""
    name = folders.get(folder_id, '')
    m = re.match(r'^(\d\d) +(.*)$', name)
    if not m: return None
    for i, s in enumerate(SUBJ):
        if s.lower() == m.group(2).strip().lower(): return i
    return int(m.group(1)) - 1


def norm(x):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', x)).replace('&amp;', '&').strip().lstrip('– ').lower()


notes = [f for f in listing['files'] if re.match(r'^\d\d [^/]+\.md$', f['title']) and not f['title'].endswith('.excalidraw.md')]
ts = content.load()
R = {'changed': [], 'unchanged': [], 'first_seen': [], 'duplicates': [], 'no_topic': [], 'no_note': [],
     'outside_subject_folder': [], 'diffs': {}}
by_key = {}
for f in notes:
    s = subject_of(f['parent'])
    if s is None:
        R['outside_subject_folder'].append('%s (in %s)' % (f['title'], 'vault root' if f['parent'] == root else folders.get(f['parent'], 'another folder')))
        continue
    by_key.setdefault((s, int(f['title'][:2])), []).append(f)
for k, fs in by_key.items():
    if len(fs) > 1:
        fs.sort(key=lambda f: f['modified'], reverse=True)
        R['duplicates'].append('%s: %d copies in %s; using the newest (%s)' % (fs[0]['title'], len(fs), folders[fs[0]['parent']], fs[0]['modified']))

changed_files = []
for t in ts:
    if 'num' not in t: continue
    fs = by_key.pop((t['s'], t['num']), None)
    if not fs:
        R['no_note'].append('%s (note %02d, %s)' % (t['topic'], t['num'], SUBJ[t['s']])); continue
    f = fs[0]
    old = t.get('note', {}).get('modified')
    line = '%s → %s' % (f['title'], t['topic'])
    if not old: R['first_seen'].append(line)
    elif f['modified'] > old: R['changed'].append(line + ' (edited %s, imported version %s)' % (f['modified'][:16], old[:16]))
    else: R['unchanged'].append(line)
    if not old or f['modified'] > old: changed_files.append((t, f))
    raw = None
    if notes_dir and os.path.exists(os.path.join(notes_dir, f['title'])):
        p = os.path.join(notes_dir, f['title'])
        raw = open(p, 'rb').read()
        if old and f['modified'] > old or not old:
            secs = conv(p)
            app = {h: b for h, b in t['sections']}
            note = {h: b for h, b in secs}
            d = {'added_sections': [h for h in note if h not in app], 'removed_sections': [h for h in app if h not in note], 'changed': {}}
            for h in note:
                if h in app:
                    A = {norm(x) for x in app[h]}; B = {norm(x) for x in note[h]}
                    if A != B: d['changed'][h] = {'new_in_note': sorted(B - A), 'only_in_app': sorted(A - B)}
            touched = set(d['changed']) | set(d['removed_sections'])
            items = [('card', c['q']) for c in t['cards'] if c.get('ref') and any(h.startswith(c['ref']['sec']) for h in touched)]
            items += [('quiz', q['q']) for q in t['quiz'] if q.get('ref') and any(h.startswith(q['ref']['sec']) for h in touched)]
            d['items_to_recheck'] = items
            d['progress_reset_if_sections_reordered'] = bool(d['added_sections'] or d['removed_sections'])
            if d['added_sections'] or d['removed_sections'] or d['changed']: R['diffs'][t['topic']] = d
    if record:
        t['note'] = {'file': f['title'], 'modified': f['modified']}
        if raw is not None: t['note']['sha'] = hashlib.sha256(raw).hexdigest()[:16]
        tt = {k: v for k, v in t.items() if not k.startswith('_')}
        order = ['seq', 's', 'topic', 'num', 'order', 'conf', 'status', 'summary', 'src', 'note', 'sections', 'sum', 'cards', 'quiz']
        tt = {k: tt[k] for k in order if k in tt}
        open(os.path.join(content.ROOT, t['_file']), 'w', encoding='utf-8').write(json.dumps(tt, ensure_ascii=False, indent=1) + '\n')
for (s, n), fs in sorted(by_key.items()):
    R['no_topic'].append('%s (%s): no app topic yet; run the ppl-scans import' % (fs[0]['title'], SUBJ[s]))

print('Vault check: %d notes matched, %d changed since import, %d not recorded yet' % (len(R['changed']) + len(R['unchanged']) + len(R['first_seen']), len(R['changed']), len(R['first_seen'])))
for k, title in [('changed', 'Edited since they were imported'), ('first_seen', 'No import date recorded yet'),
                 ('no_topic', 'Notes with no app topic'), ('no_note', 'App topics whose note was not found'),
                 ('duplicates', 'Duplicate notes'), ('outside_subject_folder', 'Numbered notes outside a subject folder')]:
    if R[k]:
        print('\n' + title + ':'); [print('  - ' + x) for x in R[k]]
for tn, d in R['diffs'].items():
    print('\nDiff for %s:' % tn)
    for h in d['added_sections']: print('  + new section: ' + h)
    for h in d['removed_sections']: print('  - section gone from note: ' + h)
    for h, c in d['changed'].items(): print('  ~ %s: %d new bullet(s) in note, %d only in app' % (h, len(c['new_in_note']), len(c['only_in_app'])))
    if d['items_to_recheck']: print('  %d card/quiz item(s) point at changed sections: re-check them' % len(d['items_to_recheck']))
if record: print('\nRecorded note dates in %d topic files.' % sum(1 for t in ts if 'num' in t and t.get('note')))
if out_json: json.dump(R, open(out_json, 'w'), ensure_ascii=False, indent=1)
