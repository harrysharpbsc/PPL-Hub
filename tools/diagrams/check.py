"""Check the generated previews before they go in the app.

    python3 tools/diagrams/check.py                    # every preview in tools/diagrams/out/
    python3 tools/diagrams/check.py out/altimeter.html [shots-dir]

Renders each preview light and dark at 2x and fails on: text over text, text over a step badge,
text spilling out of its box, text outside the diagram. Screenshots go to shots-dir (default out/shots).
It cannot see text crossing a line, a wrong arrow direction or a wrong number: look at the screenshots.
"""
import sys
from playwright.sync_api import sync_playwright
import glob, os
here = os.path.dirname(os.path.abspath(__file__))
srcs = [os.path.abspath(sys.argv[1])] if len(sys.argv) > 1 else sorted(glob.glob(os.path.join(here, 'out', '*.html')))
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(here, 'out', 'shots')
os.makedirs(out, exist_ok=True)
JS = """()=>[...document.querySelectorAll('figure svg')].map((svg,fi)=>{const sr=svg.getBoundingClientRect();
 const ts=[...svg.querySelectorAll('text')].filter(t=>t.textContent.trim()).map(t=>({s:t.textContent,r:t.getBoundingClientRect()}));
 const cs=[...svg.querySelectorAll('circle')].filter(c=>+c.getAttribute('r')>=8).map(c=>c.getBoundingClientRect());
 const boxes=[...svg.querySelectorAll('rect')].map(r=>r.getBoundingClientRect()).filter(b=>b.width<sr.width*0.97&&b.height>12);
 const hit=(a,b)=>a.left<b.right-0.5&&b.left<a.right-0.5&&a.top<b.bottom-0.5&&b.top<a.bottom-0.5;
 const inside=(a,b)=>a.left>=b.left-0.5&&a.right<=b.right+0.5&&a.top>=b.top-0.5&&a.bottom<=b.bottom+0.5;
 const o=[];for(let i=0;i<ts.length;i++){const a=ts[i].r;
  for(let j=i+1;j<ts.length;j++)if(hit(a,ts[j].r))o.push(ts[i].s+' <> '+ts[j].s);
  if(!/^\\d$/.test(ts[i].s))cs.forEach(c=>{if(hit(a,c)&&!inside(a,c))o.push(ts[i].s+' <> badge')});
  if(!cs.some(c=>inside(a,c)))boxes.forEach(b=>{const cx=(a.left+a.right)/2,cy=(a.top+a.bottom)/2;if(cx>b.left&&cx<b.right&&cy>b.top&&cy<b.bottom&&!inside(a,b)&&b.width>30)o.push(ts[i].s+' spills out of its box')});
  if(!inside(a,sr))o.push('outside svg: '+ts[i].s)}
 return {fig:fi,n:ts.length,o}})"""
with sync_playwright() as p:
    b = p.chromium.launch(); bad = 0
    for src in srcs:
     name = os.path.splitext(os.path.basename(src))[0]
     for theme in ['light', 'dark']:
        pg = b.new_page(viewport={'width': 760, 'height': 900}, device_scale_factor=2)
        pg.goto('file://' + src); pg.evaluate(f"document.documentElement.setAttribute('data-theme','{theme}')")
        pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
        for r in pg.evaluate(JS):
            if r['o']: print(name, theme, r)
            bad += len(r['o'])
        for i, f in enumerate(pg.locator('figure').all()): f.screenshot(path=f'{out}/{name}-{theme}-{i}.png')
    print(len(srcs), 'previews checked; problems:', bad)
    assert not bad
