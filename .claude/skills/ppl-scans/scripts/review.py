"""Build the claude.ai review page for a batch.
usage: python3 review.py figs.json fixes.json OUT.html "Page title" collection "Lede HTML"
fixes.json: [["Topic (NN)", "where the notes depart from the book, and why"], ...] (may be [])
Publish OUT.html with the Artifact tool, capabilities {"db":{}, "user":{}}; read answers with ArtifactData list <collection>.
Each doc: {choice:'ok'|'fix', comment, title, topic}; doc '_general' holds the free-text box."""
import json,re,html,sys,os
A=os.path.join(os.path.dirname(__file__),'..','assets')
figs,fixes,out,title,coll,lede=sys.argv[1:7]
d=json.load(open(figs)); fx=json.load(open(fixes))
head=open(A+'/review_head.html').read().replace('__TITLE__',html.escape(title))
script=open(A+'/review_script.html').read().replace('__COLL__',coll)
slug=lambda s:re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
o=[head,'<div class="wrap"><h1>'+html.escape(title)+'</h1><p class="lede">'+lede+'</p><p class="saveinfo" id="saveinfo">Connecting to save…</p>']
if fx: o.append('<div class="fix"><b>Where I didn\'t follow the book</b><ul>'+''.join('<li><b>'+html.escape(a)+':</b> '+html.escape(b)+'</li>' for a,b in fx)+'</ul></div>')
o.append('<div class="bar"><span class="count" id="count">0 of 0 checked</span><span class="tally" id="tally"></span><label><input type="checkbox" id="only"> Only show unchecked</label></div>')
o.append('<nav class="nav">'+''.join('<a href="#'+slug(t['t'])+'">'+html.escape(t['t'])+'<span>'+str(len(t['f']))+'</span></a>' for t in d)+'</nav>')
for t in d:
    o.append('<section class="topic" id="'+slug(t['t'])+'"><h2>'+html.escape(t['t'])+'</h2>')
    for f in t['f']:
        ttl=re.search(r'<figcaption><b>(.*?)</b>',f['h']).group(1)
        tag=('Reused from '+html.escape(f['from'])) if f['from'] else 'New'
        o.append('<div class="pair" data-key="'+slug(t['t'])[:30]+'-'+slug(ttl)[:50]+'"><h3>'+ttl+'</h3><p class="tp">'+tag+' · section "'+html.escape(f['sec'])+'…"</p><div class="dgs" style="max-width:460px">'+f['h']+'</div><div class="pick" role="group" aria-label="Sign off"><button type="button" data-c="ok">Looks right</button><button type="button" data-c="fix">Needs work</button><span class="st" aria-live="polite"></span></div><label class="cm"><span>What needs changing</span><textarea rows="2" placeholder="e.g. move the label off the arrow"></textarea></label></div>')
    o.append('</section>')
o.append('<label class="gen"><b>Anything else (notes, quiz, wording)?</b><textarea id="general" rows="3"></textarea></label></div>'+script)
open(out,'w').write(''.join(o)); print(out, sum(len(t['f']) for t in d),'figures')
