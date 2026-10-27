import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':800,'height':900})
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    for rep in range(6):
        pg.locator('[data-id="circ"]').click();pg.locator('[data-k="go"]').click();n=0
        while n<40:
            pg.wait_for_timeout(80)
            if pg.locator('.score').count(): break
            if pg.locator('.lev .opt').count():
                idx=pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)");pg.locator('.lev .opt').nth(idx).click()
                if pg.locator('.fb.no').count(): print('WRONG',pg.evaluate("__T.ses.cur.q"))
                pg.locator('[data-k="n"]').click();n+=1
            elif pg.locator('.lev .chipb').count():
                ans=pg.evaluate("__T.ses.cur.ans")
                for i in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
                pg.locator('[data-k="chk"]').click()
                if pg.locator('.fb.no').count(): print('WRONGB',ans)
                pg.locator('[data-k="n"]').click();n+=1
        print(pg.locator('.score').inner_text());pg.locator('button:has-text("Done")').click()
