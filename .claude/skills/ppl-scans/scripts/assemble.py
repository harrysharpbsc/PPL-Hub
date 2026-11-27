"""Turn Obsidian notes + hand-written app content into NOTES.push(...) blocks for src/data.js.

usage: python3 assemble.py NOTES_DIR CONTENT.py [CONTENT2.py ...] > newtopics.js
Each CONTENT.py defines T = {'<note file name>.md': dict(topic=, num=, summary=, sum={heading prefix: one-liner},
cards=[[q,a],...], quiz=[[question,[4 options],0,why],...], rename={'old heading':'new heading'})}.
Checks: every section has a one-line summary, no summary key clashes with other topics (pass --existing src dir),
4 distinct options per quiz item. Write the correct option first (index 0); the app shuffles them.
"""
import json,sys,os,re,subprocess,importlib.util
sys.path.insert(0,os.path.dirname(__file__))
from md2sec import conv
args=sys.argv[1:]; src=None
if '--existing' in args: i=args.index('--existing'); src=args[i+1]; del args[i:i+2]
ndir,mods=args[0],args[1:]
T={}
for m in mods:
    spec=importlib.util.spec_from_file_location('c',m); mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod); T.update(mod.T)
old=set(); topics=set()
if src:  # existing SUM keys and topic names, so new headings don't overwrite another topic's summary
    js=("var NOTES=[],SUM={},MN={},vm=require('vm'),fs=require('fs');var c={NOTES:NOTES,SUM:SUM,MN:MN};vm.createContext(c);"
        "fs.readdirSync(process.argv[1]).filter(f=>/^(data|radio|caa\\d*)\\.js$/.test(f)).forEach(f=>{try{vm.runInContext(fs.readFileSync(process.argv[1]+'/'+f,'utf8'),c)}catch(e){}});"
        "console.log(JSON.stringify({s:Object.keys(c.SUM),t:c.NOTES.map(n=>n.topic)}))")
    r=json.loads(subprocess.check_output(['node','-e',js,src])); old=set(r['s']); topics=set(r['t'])
out=[];seen={}
for f,d in sorted(T.items()):
    secs=conv(os.path.join(ndir,f))
    for s in secs: s[0]=d.get('rename',{}).get(s[0],s[0])
    heads=[s[0] for s in secs]; sm={}
    assert d['topic'] not in topics, 'topic name already in the app: '+d['topic']
    for k,v in d['sum'].items():
        hs=[h for h in heads if h.startswith(k)]
        assert len(hs)==1,(f,k,hs)
        assert hs[0] not in old and hs[0] not in seen, 'heading clashes with another topic, rename it: '+hs[0]
        sm[hs[0]]=v; seen[hs[0]]=1
    miss=[h for h in heads if h not in sm]
    assert not miss, (f,'sections without a one-line summary',miss)
    for q in d['quiz']: assert len(q[1])==4 and len(set(q[1]))==4 and 0<=q[2]<4, q[0]
    n={"s":d.get('s',0),"topic":d['topic'],"num":d['num'],"order":d['num']*10,"conf":"weak","status":"draft","summary":d['summary'],"sections":secs,"cards":d['cards'],"quiz":d['quiz']}
    out.append('NOTES.push('+json.dumps(n,ensure_ascii=False)+');\nObject.assign(SUM,'+json.dumps(sm,ensure_ascii=False)+');')
    print(d['num'],d['topic'],len(secs),'sections',len(d['cards']),'cards',len(d['quiz']),'quiz',file=sys.stderr)
print('\n'.join(out))
