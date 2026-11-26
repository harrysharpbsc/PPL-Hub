"""Build mock-up B: python3 mockups/deck/build.py -> index.html (open locally) and artifact.html (for claude.ai)."""
import base64,os,re
d=os.path.dirname(os.path.abspath(__file__))
css=''
for w in (400,700):
    b=base64.b64encode(open(os.path.join(d,'fonts','b612-latin-%d-normal.woff2'%w),'rb').read()).decode()
    css+='@font-face{font-family:"B612";font-weight:%d;font-style:normal;font-display:swap;src:url(data:font/woff2;base64,%s) format("woff2")}\n'%(w,b)
logo=open(os.path.join(d,'..','..','docs','icon.svg')).read()
logo=re.sub(r'^<svg[^>]*>|</svg>\s*$','',logo.strip())
CHEV='<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg>'
def tape(p): return '<div class="tape"><div class="ticks"></div><div class="arcs"></div><div class="pass"></div><div class="ptr" style="left:%d%%"></div></div>'%p
def subj(name,sub,p,go=''):
    g=' data-go="airlaw"' if go else ''
    return '<button class="row"%s><div class="main"><div class="t">%s</div><div class="s">%s</div>%s</div><span class="ro">%d<small>%%</small></span></button>'%(g,name,sub,tape(p),p)
S=[('Air Law','10 topics, 323 cards',62,1),('Aircraft General Knowledge','1 topic, 10 cards',12,0),('Flight Performance and Planning','3 topics, 36 cards',0,0),
   ('Human Performance and Limitations','2 topics, 26 cards',80,0),('Meteorology','2 topics, 26 cards',31,0),('Navigation','4 topics, 48 cards',22,0),
   ('Operational Procedures','5 topics, 63 cards',0,0),('Principles of Flight','1 topic, 10 cards',5,0),('Communications','2 topics, 45 cards',48,0)]
s1=''.join(subj(*x) for x in S[:5]);s2=''.join(subj(*x) for x in S[5:])
P=sorted(S,key=lambda x:-x[2])
def prog(x): return '<div class="row"><div class="main"><div class="t">%s</div>%s</div><span class="ro">%d<small>%%</small></span></div>'%(x[0],tape(x[2]),x[2])
p1=''.join(prog(x) for x in P[:5]);p2=''.join(prog(x) for x in P[5:])
T=[('Operations of Aircraft','Next: pre-test',0),('Aviation Law and organisations','Next: quiz',3),('Rules of the Air','All steps done, 41 of 50 cards secure',4),
   ('Aerodromes','Next: flashcards',2),('Altimeter Setting Procedures','Next: read the notes',1),('Airspace','Next: pre-test, new',0),('Air Traffic Services','Next: pre-test, new',0)]
def topic(i,t):
    pips=''.join('<span class="sq%s"></span>'%(' on' if k<t[2] else '') for k in range(4))
    return '<button class="row"><span class="num">%d</span><div class="main"><div class="t">%s</div><div class="s">%s</div></div><span class="steps" aria-label="%d of 4 steps done">%s</span>%s</button>'%(i+1,t[0],t[1],t[2],pips,CHEV)
tp=''.join(topic(i,t) for i,t in enumerate(T))
s=open(os.path.join(d,'src.html')).read()
for k,v in [('/*FONTS*/',css),('/*LOGO*/',logo),('/*SUBJ1*/',s1),('/*SUBJ2*/',s2),('/*PROG1*/',p1),('/*PROG2*/',p2),('/*TOPICS*/',tp)]:
    assert k in s,k; s=s.replace(k,v)
open(os.path.join(d,'artifact.html'),'w').write(s)
open(os.path.join(d,'index.html'),'w').write('<!doctype html>\n<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  +s.replace('<style>','<style>[hidden]{display:none!important}',1).replace('</style>','</style></head><body>',1)+'</body></html>\n')
print('built',len(s))
