import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for f in ['hub_download.html']:
        pg=b.new_page(viewport={'width':1280,'height':900});errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
        pg.goto('file://'+os.getcwd()+'/'+f);pg.wait_for_timeout(500)
        def nav(t):
            l=pg.locator('button.nv:visible:has-text("%s")'%t)
            if l.count(): l.first.click();pg.wait_for_timeout(150)
        def end():
            l=pg.locator('button:has-text("End")')
            if l.count(): l.first.click();pg.wait_for_timeout(150)
        for t in ['Today','Practice','Radio','Labs','Progress','Subjects']: nav(t)
        nav('Subjects');n=pg.locator('button.sc[data-a="sub"]').count()
        for i in range(n):
            nav('Subjects');pg.locator('button.sc[data-a="sub"]').nth(i).click();pg.wait_for_timeout(100)
            pg.locator('button.sc[data-a="topic"]').first.click();pg.wait_for_timeout(150)
            pg.locator('[data-a="step"]').first.click();pg.wait_for_timeout(150);end()
        nav('Labs');ids=pg.evaluate("[].map.call(document.querySelectorAll('[data-a=lab]'),function(b){return b.dataset.id})")
        for lid in ids:
            nav('Labs');pg.locator('[data-id="%s"]'%lid).click();pg.wait_for_timeout(150)
            g=pg.locator('[data-k="go"]')
            if g.count():
                g.first.click();pg.wait_for_timeout(700)
                if pg.locator('.lev .opt').count(): pg.locator('.lev .opt').first.click();pg.wait_for_timeout(100)
            end()
        print(f,len(ids),'labs',n,'subjects; errors:',[e for e in errs if 'net::' not in e and 'ERR_' not in e][:10])
