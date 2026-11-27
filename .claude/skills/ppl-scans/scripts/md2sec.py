"""Obsidian note -> app sections [[heading, [item html, ...]], ...].
Each ##/### heading with content becomes a section. Bullets and numbered items become items; tab-indented
(or 2+ space) children become a nested <ul> inside their parent item. Tables become "<b>row</b>: col value; ..."
items. Callouts (> [!note] / > [!warning] Title) become "Note: ..." / "Trap: ..." items. %% comments and
everything from '### Practice Questions' on are dropped."""
import re,sys,glob
def inl(s):
    s=s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    s=re.sub(r'\*\*`([^`]+)`\*\*',r'<code>\1</code>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
    s=re.sub(r'\[\[(?:\d+ )?([^\]|]+)(?:\|([^\]]+))?\]\]',lambda m:m.group(2) or m.group(1),s)
    return s.replace('\\*','*').strip()
def conv(path):
    L=open(path).read().split('\n')
    i=L.index('---',1)+1; L=L[i:]
    secs=[];cur=None;hdr=None;items=None;co=None
    def flush():
        nonlocal co
        if co and cur is not None:
            cur[1].append(co[0]+': '+' '.join(co[1]))
        co=None
    for ln in L:
        if ln.startswith('### Practice'): break
        if ln.startswith('%%'): continue
        m=re.match(r'^> \[!(\w+)\]\s*(.*)$',ln)
        if m:
            flush(); kind=m.group(1).lower(); t=m.group(2).strip()
            co=[t or {'note':'Note','warning':'Trap','tip':'Tip'}.get(kind,kind.title()),[]]; continue
        if ln.startswith('>') and co is not None: co[1].append(inl(ln.lstrip('> '))); continue
        flush()
        if not ln.strip(): hdr=None; continue
        m=re.match(r'#{2,3} (.*)',ln)
        if m: cur=[m.group(1).strip(),[]];secs.append(cur);hdr=None;continue
        if ln.startswith('|'):
            cells=[c.strip() for c in ln.strip('|').split('|')]
            if set(''.join(cells))<=set('-: '): continue
            if hdr is None: hdr=cells; continue
            first='<b>'+re.sub(r'</?b>','',inl(cells[0]))+'</b>: '
            rest='; '.join((inl(hdr[k])+' '+inl(c) if hdr[k] and len(cells)>2 else inl(c)) for k,c in enumerate(cells) if k>0 and c not in ('-',''))
            cur[1].append(first+rest); continue
        m=re.match(r'^(\t+| {2,})?(?:- |\d+\. )(.*)$',ln)
        if m:
            t=inl(m.group(2))
            if m.group(1) and cur[1]:
                last=cur[1][-1]
                cur[1][-1]=last[:-5]+'<li>'+t+'</li></ul>' if last.endswith('</ul>') else last+'<ul><li>'+t+'</li></ul>'
            else: cur[1].append(t)
    flush()
    return [s for s in secs if s[1]]
if __name__=='__main__':
    for p in sorted(glob.glob(sys.argv[1]+'/*.md')):
        print('==',p)
        for s in conv(p): print('  ',s[0],len(s[1]))
