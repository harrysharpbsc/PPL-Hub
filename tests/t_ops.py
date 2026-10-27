import sys,os
from playwright.sync_api import sync_playwright
ids=['join','ctlarr','ctldep','signs','divert']
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in((1024,800),(390,800)):
        for i in ids:
            pg=b.new_page(viewport={'width':w,'height':h});errs=[]
            pg.on('pageerror',lambda e:errs.append(str(e)))
            pg.goto('file://'+os.getcwd()+'/hub_test.html')
            pg.locator('button.nv:visible:has-text("Labs")').first.click()
            n=pg.locator('[data-id="%s"]'%i).count()
            if n:
                pg.locator('[data-id="%s"]'%i).first.click();pg.wait_for_timeout(300)
                pg.locator('[data-k="go"]').first.click() if pg.locator('[data-k="go"]').count() else None
                pg.wait_for_timeout(300)
                pg.screenshot(path='ops_%s_%d.png'%(i,w))
            print(w,i,'card',n,'errs',errs)
            pg.close()
    b.close()
