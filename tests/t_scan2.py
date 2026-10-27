import os
from playwright.sync_api import sync_playwright
exec(open('t_scan.py').read().split('with sync_playwright')[0])
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(1280,900),(430,900)]:
        pg=b.new_page(viewport={'width':w,'height':h})
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        res={}
        def nav(t):
            l=pg.locator('button.nv:visible:has-text("%s")'%t)
            if l.count(): l.first.click();pg.wait_for_timeout(150)
        def scan(name):
            r=pg.evaluate(JS)
            if r: res[name]=r[:6]
        for page in ['Practice','Radio','Today']:
            nav(page)
            items=pg.evaluate("[].map.call(document.querySelectorAll('#main button[data-a]'),function(b,i){return [i,b.dataset.a,b.textContent.trim().slice(0,24)]})")
            for i,a,t in items:
                if a in ('reset','theme','nav','export','import','clear'): continue
                nav(page)
                bl=pg.locator('#main button[data-a]')
                if i>=bl.count(): continue
                try: bl.nth(i).click(timeout=2000)
                except Exception: continue
                pg.wait_for_timeout(250);scan(page+':'+t)
                for step in range(3):
                    o=pg.locator('#main .opt:visible')
                    if o.count():
                        o.first.click();pg.wait_for_timeout(120);scan(page+':'+t+':ans')
                    nb=pg.locator('#main button:has-text("Show answer"),#main button:has-text("Next"),#main button:has-text("Reveal")')
                    if nb.count():
                        try: nb.first.click(timeout=1000)
                        except Exception: pass
                        pg.wait_for_timeout(120);scan(page+':'+t+':next')
                e=pg.locator('button:has-text("End")')
                if e.count():
                    try: e.first.click(timeout=1000)
                    except Exception: pass
        for k,v in res.items(): print(w,k,v)
        print(w,'done')
