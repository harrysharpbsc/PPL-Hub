import os,sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':520,'height':1000});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    for rep in range(3):
        pg.locator('[data-id="xc"]').click()
        if rep<3: pg.screenshot(path='x2_start_%d.png'%rep)
        pg.locator('[data-k="go"]').click();n=0;shots=0
        while n<60:
            pg.wait_for_timeout(60)
            if pg.locator('.score').count(): break
            if pg.locator('.lev .opt').count():
                cur=pg.evaluate("(function(){var c=__T.ses.cur;return {o:c.opts,q:c.q}})()")
                idx=pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)")
                if len(set(cur['o']))<len(cur['o']): print('DUP',cur)
                pg.locator('.lev .opt').nth(idx).click()
                if pg.locator('.fb.no').count(): print('WRONG',cur)
                if rep<3 and n in(3,12,17): pg.screenshot(path='x2_%d_%d.png'%(rep,n))
                pg.locator('[data-k="n"]').click();n+=1
            elif pg.locator('.lev .chipb').count():
                ans=pg.evaluate("__T.ses.cur.ans")
                for i in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
                pg.locator('[data-k="chk"]').click()
                if pg.locator('.fb.no').count(): print('WRONGB',ans)
                pg.locator('[data-k="n"]').click();n+=1
        print(rep,pg.locator('.score').inner_text(),n)
        pg.locator('button:has-text("Done")').click()
    print(errs)
