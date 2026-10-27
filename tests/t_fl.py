import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':1000});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="xc"]').click();pg.wait_for_timeout(200)
    pg.screenshot(path='fl_start.png',full_page=True)
    pg.locator('[data-k="fs"][data-f="hide"][data-v="on"]').click()
    pg.locator('[data-k="go"]').click();pg.wait_for_timeout(600)
    # first event build: wrong attempt via tapping (tap 1 piece then transmit)
    pg.locator('.lev .chipb').first.click();pg.locator('[data-k="chk"]').click();pg.wait_for_timeout(100)
    print('retry btn:',pg.locator('[data-k="retry"]').count());pg.locator('[data-k="retry"]').click()
    ans=pg.evaluate("__T.ses.cur.ans")
    for i in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
    pg.locator('[data-k="chk"]').click();print('res after retry:',pg.evaluate("JSON.stringify(__T.ses.res)")[:160])
    ei=pg.evaluate("__T.ses.ei");pg.wait_for_timeout(2600);print('auto advanced:',pg.evaluate("__T.ses.ei")>ei)
    # wait for next event (fast pace)
    for i in range(80):
        if pg.evaluate("!!__T.ses.cur"): break
        pg.wait_for_timeout(100)
    print('next event q:',pg.evaluate("__T.ses.cur.q"),'| atc hidden:',pg.locator('.rx p.m').count(),'| kb page:',pg.evaluate("__T.KB.bg"))
    pg.screenshot(path='fl_hidden.png',full_page=True)
    pg.locator('[data-k="fsset"]').click();pg.wait_for_timeout(100);pg.screenshot(path='fl_set.png',full_page=True)
    print(errs)
