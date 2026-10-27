import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':700,'height':1100});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    shots=0
    for lid,reps in [('ctlarr',4),('xc',12)]:
        for rep in range(reps):
            pg.locator('[data-id="%s"]'%lid).click();pg.locator('[data-k="go"]').click();n=0
            while n<60:
                pg.wait_for_timeout(60)
                if pg.locator('.score').count(): break
                if pg.locator('.lev .opt').count():
                    q=pg.evaluate("__T.ses.cur.atc||''")
                    if 'number two' in q and shots<3:
                        pg.wait_for_timeout(200);pg.screenshot(path='tf_%d.png'%shots);shots+=1
                    if 'cleared to land' in q and shots<5 and shots>=1:
                        pg.screenshot(path='tf_%d.png'%shots);shots+=1
                    idx=pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)");pg.locator('.lev .opt').nth(idx).click()
                    if pg.locator('.fb.no').count(): print('WRONG',q)
                    pg.locator('[data-k="n"]').click();n+=1
                elif pg.locator('.lev .chipb').count():
                    ans=pg.evaluate("__T.ses.cur.ans")
                    for i in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
                    pg.locator('[data-k="chk"]').click();pg.locator('[data-k="n"]').click();n+=1
            print(lid,rep,pg.locator('.score').inner_text(),n)
            pg.locator('button:has-text("Done")').click()
    print(errs,shots)
