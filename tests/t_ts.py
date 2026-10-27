import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1100,'height':1000});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="circ"]').click()
    pg.locator('.vtog button:has-text("Speaking")').first.click();pg.locator('[data-k="go"]').click();n=0
    while n<30:
        pg.wait_for_timeout(80)
        if pg.locator('.score').count(): break
        if pg.locator('#vx-txt').count():
            kind=pg.evaluate("__T.ses.cur.kind")
            txt=pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]") if kind=='mcq' else pg.evaluate("(function(){var e=__T.ses.cur,o=e.opt||[];return e.ans.filter(function(t){return o.indexOf(t)<0}).join(', ')})()")
            if n==0: txt='Hexworth radio golf mayday over'
            pg.locator('#vx-txt').fill(txt);pg.locator('[data-k="vchk"]').click();pg.locator('[data-k="n"]').click();n+=1
        elif pg.locator('.lev .opt').count():
            idx=pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)");pg.locator('.lev .opt').nth(idx).click();pg.locator('[data-k="n"]').click();n+=1
    pg.locator('[data-k="tscopy"]').click();pg.wait_for_timeout(300)
    print(pg.locator('#ts-txt').input_value()[:900]);print(errs, pg.locator('#toast').inner_text())
    pg.screenshot(path='ts.png',full_page=True)
