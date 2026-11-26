"""List the figures a topic already has, before adding any (old hand-written and generated alike).

    cd src && python3 build.py && python3 ../tools/diagrams/existing.py "Altimeter Setting Procedures"

Prints each figure's note section and title from the built app (src/hub_test.html). Read the list, and look at
the figures in the app, before drawing: most of Harry's notes already have figures redrawn from his own notes,
and a new figure must not repeat one of them.
"""
import os
import sys
from playwright.sync_api import sync_playwright

topic = sys.argv[1] if len(sys.argv) > 1 else ""
src = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "src", "hub_test.html")
JS = r"""t=>{const T=__T,out=[];const add=(tp,sec,f)=>{const m=f.match(/<figcaption><b>([\s\S]*?)<\/b>/);
 out.push([tp,sec,m?m[1]:'',/class="pdg"/.test(f)?'generated':'not generated'])};
 Object.keys(T.DSEC).forEach(tp=>T.DSEC[tp].forEach(e=>add(tp,e[0],e[1])));
 Object.keys(T.DIAG).forEach(tp=>(T.DIAG[tp].match(/<figure[\s\S]*?<\/figure>/g)||[]).forEach(f=>add(tp,'(top panel)',f)));
 return out.filter(r=>!t||r[0]===t)}"""
with sync_playwright() as p:
    pg = p.chromium.launch().new_page()
    pg.goto("file://" + os.path.abspath(src)); pg.wait_for_timeout(300)
    rows = pg.evaluate(JS, topic)
    for tp, sec, title, kind in rows:
        print(f"{tp} | {sec} | {title} [{kind}]")
    print(len(rows), "figures")
