import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':430,'height':1000});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    pg.locator('[data-id="circ"]').click();pg.locator('.vtog button:has-text("Speaking")').first.click();pg.locator('[data-k="go"]').click();pg.wait_for_timeout(300)
    pg.locator('[data-k="vkb"]').click();pg.wait_for_timeout(200)
    print('focused:',pg.evaluate("document.activeElement&&document.activeElement.id"),'speak btn:',pg.locator('#vx-rec').count())
    pg.screenshot(path='kb.png',full_page=True)
    n=0
    while n<20:
        pg.wait_for_timeout(60)
        if pg.locator('.score').count(): break
        if pg.locator('#vx-txt').count():
            kind=pg.evaluate("__T.ses.cur.kind")
            txt=pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]") if kind=='mcq' else pg.evaluate("(function(){var e=__T.ses.cur,o=e.opt||[];return e.ans.filter(function(t){return o.indexOf(t)<0}).join(', ')})()")
            pg.locator('#vx-txt').fill(txt);pg.locator('#vx-txt').press('Enter')
            if pg.locator('.fb.no').count(): print('WRONG',txt)
            pg.locator('[data-k="n"]').click();n+=1
    print(pg.locator('.score').inner_text(),n,errs)
