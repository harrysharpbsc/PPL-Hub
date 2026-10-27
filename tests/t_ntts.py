import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1100,'height':1000});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.route('**cdn.jsdelivr.net/**',lambda r:r.abort())
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="xc"]').click()
    pg.locator('[data-k="fs"][data-f="voices"][data-v="natural"]').click();pg.wait_for_timeout(1500)
    print('status:',pg.locator('#ntts-st').inner_text())
    pg.locator('[data-k="go"]').click();pg.wait_for_timeout(800)
    pg.evaluate("(function(){window.__said=[];speechSynthesis.speak=function(u){__said.push(u.text)};return 1})()")
    for i in range(40):
        if pg.evaluate("!!(__T.ses.cur&&__T.ses.cur.atc)"): break
        if pg.locator('.lev .chipb').count():
            ans=pg.evaluate("__T.ses.cur.ans")
            for j in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%j).click()
            pg.locator('[data-k="chk"]').click();pg.locator('[data-k="n"]').click()
        pg.wait_for_timeout(150)
    pg.locator('[data-k="say"]').click();pg.wait_for_timeout(300)
    print('fallback spoke:',pg.evaluate("__said.length"),errs)
