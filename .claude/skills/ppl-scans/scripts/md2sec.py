import re,json,sys,glob
def inl(s):
    s=s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    s=re.sub(r'\*\*`([^`]+)`\*\*',r'<code>\1</code>',s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<b>\1</b>',s)
    s=re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
    s=re.sub(r'\[\[\d+ ([^\]]+)\]\]',r'\1',s)
    s=s.replace('\\*','*')
    return s.strip()
def conv(path):
    L=open(path).read().split('\n')
    i=L.index('---',1)+1; L=L[i:]
    secs=[];cur=None;hdr=None;co=False
    for ln in L:
        if ln.startswith('### Practice') : break
        m=re.match(r'^> \[!(\w+)\][+-]? *(.*)$',ln)
        if m:  # Obsidian callout: '> [!warning] Exam trap' then '> text' lines -> one item with its label
            kind,title=m.groups()
            lab=title.strip() or {'note':'Note','tip':'Tip','warning':'Warning','important':'Important'}.get(kind.lower(),kind.title())
            cur[1].append('<b>'+inl(lab)+'</b> '); co=True; continue
        if ln.startswith('>') and co:
            cur[1][-1]=(cur[1][-1]+' '+inl(ln[1:])).replace('</b>  ','</b> ').rstrip(); continue
        co=False
        if ln.startswith('%%') or not ln.strip(): hdr=None if not ln.strip() else hdr; continue
        m=re.match(r'#{2,3} (.*)',ln)
        if m: cur=[m.group(1).strip(),[]];secs.append(cur);hdr=None;continue
        if ln.startswith('|'):
            cells=[c.strip() for c in ln.strip('|').split('|')]
            if set(''.join(cells))<=set('- '): continue
            if hdr is None: hdr=cells; continue
            it='<b>'+inl(cells[0]).replace('<b>','').replace('</b>','')+'</b>: '+'; '.join((inl(hdr[k])+' '+inl(c) if hdr[k] and len(cells)>2 else inl(c)) for k,c in enumerate(cells) if k>0 and c not in ('-',''))
            cur[1].append(it); continue
        m=re.match(r'^([ \t]*)(?:- |\d+\. )(.*)',ln)
        if m:
            t=inl(m.group(2))
            cur[1].append(('– ' if m.group(1) else '')+t)
    secs=[s for s in secs if s[1]]
    return secs
if __name__=='__main__':
    for p in sorted(glob.glob('../notes/*.md')):
        print('==',p)
        for s in conv(p): print('  ',s[0],len(s[1]), max(len(x) for x in s[1]))
