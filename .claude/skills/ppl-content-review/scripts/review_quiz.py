"""Review page for changed cards and questions (old -> new), in the same design and save flow as the
ppl-scans diagram review page.
usage (from src/): python3 review_quiz.py CHANGES.json OUT.html "Page title" collection "Lede HTML"
CHANGES.json: [{"topic", "kind": "quiz"|"card"|"new"|"split", "old": item|null, "new": item, "why": "one line"}]
  items as in src/content (quiz {q,o,a,why,ref}, card {q,a,m?,ref}).
Publish OUT.html with the Artifact tool, capabilities {"db":{}, "user":{}}; read answers with ArtifactData list <collection>.
Each doc: {choice:'ok'|'fix', comment, title, topic}; doc '_general' holds the free-text box."""
import json, re, html, sys, os, hashlib
here = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(here, '..', '..', 'ppl-scans', 'assets')
sys.path.insert(0, os.getcwd())
import content
src, out, title, coll, lede = sys.argv[1:6]
ch = json.load(open(src))
T = {t['topic']: t for t in content.load()}
E = html.escape
strip = lambda s: re.sub(r'<[^>]+>', '', s)
slug = lambda s: re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
CSS = """<style>
.diff{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:10px 0}
@media (max-width:640px){.diff{grid-template-columns:1fr}}
.diff>div{border:1px solid var(--line);border-radius:10px;padding:10px 12px;min-width:0}
.diff h4{margin:0 0 6px;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;opacity:.7}
.diff ol{margin:0;padding-left:20px}.diff li{margin:3px 0;overflow-wrap:anywhere}
.diff li.r{font-weight:600;color:var(--good)}.diff li.r::after{content:"  ✓"}
.diff .len{opacity:.6;font-size:.8rem;font-weight:400}
.diff p{margin:6px 0 0;overflow-wrap:anywhere}.src{font-size:.9rem;opacity:.8;margin:4px 0}
</style>"""


def ref_text(t, r):
    if not r: return 'no source'
    hd = next((s[0] for s in t['sections'] if s[0].startswith(r['sec'])), r['sec'] + ' (no such section!)')
    f = ('note %02d' % t['num']) if 'num' in t else (t['src'][0][0] if t.get('src') else t['topic'])
    return f + ': ' + hd + (' · ' + r['rule'] if r.get('rule') and r['rule'] not in hd else '') + (' · ' + r['p'] if r.get('p') else '')


def box(label, it, t):
    if not it: return '<div><h4>' + label + '</h4><p>(none)</p></div>'
    if 'o' in it:
        L = [len(strip(o)) for o in it['o']]
        body = '<p><b>' + E(it['q']) + '</b></p><ol type="A">' + ''.join(
            '<li class="' + ('r' if i == it['a'] else '') + '">' + E(strip(o)) + ' <span class="len">(' + str(L[i]) + ')</span></li>'
            for i, o in enumerate(it['o'])) + '</ol><p><i>Why:</i> ' + E(strip(it['why'])) + '</p>'
    else:
        body = '<p><b>' + E(it['q']) + '</b></p><p>' + E(strip(it['a'])) + '</p>' + (
            '<p><i>Memory aid:</i> ' + E(it['m']) + '</p>' if it.get('m') else '')
    return '<div><h4>' + label + '</h4>' + body + '<p class="src">From ' + E(ref_text(t, it.get('ref'))) + '</p></div>'


head = open(A + '/review_head.html').read().replace('__TITLE__', E(title)).replace('</head>', CSS + '</head>')
script = open(A + '/review_script.html').read().replace('__COLL__', coll)
by = {}
for c in ch: by.setdefault(c['topic'], []).append(c)
o = [head, '<div class="wrap"><h1>' + E(title) + '</h1><p class="lede">' + lede + '</p><p class="saveinfo" id="saveinfo">Connecting to save…</p>',
     '<div class="bar"><span class="count" id="count">0 of 0 checked</span><span class="tally" id="tally"></span><label><input type="checkbox" id="only"> Only show unchecked</label></div>',
     '<nav class="nav">' + ''.join('<a href="#' + slug(tn) + '">' + E(tn) + '<span>' + str(len(v)) + '</span></a>' for tn, v in by.items()) + '</nav>']
KIND = {'quiz': 'Question rewritten', 'card': 'Card rewritten', 'new': 'New item', 'split': 'Card split'}
for tn, v in by.items():
    t = T[tn]
    o.append('<section class="topic" id="' + slug(tn) + '"><h2>' + E(tn) + '</h2>')
    for c in v:
        key = slug(tn)[:24] + '-' + hashlib.sha1((c['new'] or c['old'])['q'].encode()).hexdigest()[:10]
        o.append('<div class="pair" data-key="' + key + '"><h3>' + E((c['new'] or c['old'])['q']) + '</h3><p class="tp">' + KIND.get(c['kind'], c['kind']) + ' · ' + E(c.get('why', '')) + '</p>'
                 '<div class="diff">' + box('Before', c['old'], t) + box('After', c['new'], t) + '</div>'
                 '<div class="pick" role="group" aria-label="Sign off"><button type="button" data-c="ok">Looks right</button><button type="button" data-c="fix">Needs work</button><span class="st" aria-live="polite"></span></div>'
                 '<label class="cm"><span>What needs changing</span><textarea rows="2" placeholder="e.g. option C is also true"></textarea></label></div>')
    o.append('</section>')
o.append('<label class="gen"><b>Anything else?</b><textarea id="general" rows="3"></textarea></label></div>' + script)
open(out, 'w').write(''.join(o)); print(out, len(ch), 'changes')
