"""Turn one of Harry's Obsidian notes into app sections: [[heading, [item, ...]], ...].

- `##` / `###` headings start a section; `####` / `#####` become a bold sub-heading item inside it, so their
  content is kept and the section count stays the same.
- bullets and numbered items become items; nested ones (tab or spaces) become "– " items.
- tables become "<b>row</b>: header value; ..." items (`<br>` inside a cell becomes "; ").
- callouts (`> [!warning] Exam trap`) become one item with its label in bold.
- plain paragraph lines become items (they used to be dropped).
- `![[image]]` embeds and `%% image: ... %%` comments are collected in `figs` (diagram ideas), never output.
- everything from a "Practice Questions" heading on is cut (the book's questions stay in the private vault).

usage: python3 md2sec.py NOTE.md [NOTE2.md ...]   prints a summary per note
"""
import re, sys


def inl(s):
    s = s.replace('&', '&amp;').replace('<br>', '\x00').replace('<br/>', '\x00').replace('<', '&lt;').replace('>', '&gt;')
    s = re.sub(r'\*\*`([^`]+)`\*\*', r'<code>\1</code>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)([^*]+?)(?<!\s)\*(?![\w*])', r'\1', s)   # *italic* -> plain
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\[\[\d+ ([^\]|]+)(\|[^\]]*)?\]\]', r'\1', s)
    s = re.sub(r'\[\[([^\]|]+)\|([^\]]+)\]\]', r'\2', s)
    s = re.sub(r'\[\[([^\]]+)\]\]', r'\1', s)
    s = s.replace('\\*', '*')
    s = re.sub(r'\s*\x00\s*', '; ', s)
    return s.strip()


def conv(path, figs=None):
    """Sections of the note at `path`. Pass a list as `figs` to collect image embeds and %% image %% notes."""
    figs = figs if figs is not None else []
    L = open(path, encoding='utf-8').read().replace('\r\n', '\n').split('\n')
    if L and L[0].strip() == '---':
        L = L[L.index('---', 1) + 1:]
    secs = []; cur = None; hdr = None; co = False

    def add(item):
        nonlocal cur
        if cur is None:
            cur = ['Introduction', []]; secs.append(cur)
        cur[1].append(item)

    for ln in L:
        if re.match(r'^#{2,6} +Practice Questions', ln): break
        for m in re.finditer(r'!\[\[([^\]]+)\]\]', ln):
            figs.append(('embed', m.group(1), cur[0] if cur else ''))
        m = re.match(r'^%%\s*image:?\s*(.*?)\s*%%\s*$', ln)
        if m:
            figs.append(('figure', m.group(1), cur[0] if cur else '')); continue
        ln = re.sub(r'!\[\[[^\]]+\]\]', '', ln)
        m = re.match(r'^> \[!(\w+)\][+-]? *(.*)$', ln)
        if m:  # Obsidian callout: '> [!warning] Exam trap' then '> text' lines -> one item with its label
            kind, title = m.groups()
            lab = title.strip() or {'note': 'Note', 'tip': 'Tip', 'warning': 'Warning', 'important': 'Important'}.get(kind.lower(), kind.title())
            add('<b>' + inl(lab) + '</b> '); co = True; continue
        if ln.startswith('>') and co:
            cur[1][-1] = (cur[1][-1] + ' ' + inl(ln[1:])).replace('</b>  ', '</b> ').rstrip(); continue
        co = False
        if ln.startswith('%%') or not ln.strip():
            hdr = None if not ln.strip() else hdr; continue
        m = re.match(r'^#{2,3} +(.*)', ln)
        if m:
            cur = [m.group(1).strip(), []]; secs.append(cur); hdr = None; continue  # raw, as already in the app
        m = re.match(r'^#{4,6} +(.*)', ln)
        if m:
            add('<b>' + inl(m.group(1)).replace('<b>', '').replace('</b>', '') + '</b>'); hdr = None; continue
        if ln.startswith('|'):
            cells = [c.strip() for c in ln.strip().strip('|').split('|')]
            if set(''.join(cells)) <= set('-: '): continue
            if hdr is None: hdr = cells; continue
            it = '<b>' + inl(cells[0]).replace('<b>', '').replace('</b>', '') + '</b>: ' + '; '.join(
                (inl(hdr[k]) + ' ' + inl(c) if k < len(hdr) and hdr[k] and len(cells) > 2 else inl(c))
                for k, c in enumerate(cells) if k > 0 and c not in ('-', ''))
            add(it); continue
        m = re.match(r'^([ \t]*)(?:[-*+] |\d+[.)] )(.*)', ln)
        if m:
            t = inl(m.group(2))
            if t: add(('– ' if m.group(1) else '') + t)
            continue
        if ln.strip() in ('---', '***'): continue
        t = inl(ln)
        if t: add(t)
    return [s for s in secs if s[1]]


if __name__ == '__main__':
    for p in sys.argv[1:]:
        figs = []
        print('==', p)
        for s in conv(p, figs): print('  ', s[0], len(s[1]), 'items, longest', max(len(x) for x in s[1]))
        for f in figs: print('   figure:', *f)
