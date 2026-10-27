import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':800});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    def labs(): pg.locator('button.nv:visible:has-text("Labs")').first.click()
    def scribble():
        bx=pg.locator('#kb-cv').bounding_box();pg.mouse.move(bx['x']+80,bx['y']+40);pg.mouse.down();pg.mouse.move(bx['x']+200,bx['y']+80,steps=8);pg.mouse.up()
        pg.locator('[data-kbt="type"]').click();pg.locator('#kb-txt').fill('QNH 1009');pg.locator('[data-kbt="draw"]').click()
    st="(function(){return __T.KB.s.length+'/'+__T.KB.t.length})()"
    labs();pg.locator('[data-id="circ"]').click();pg.locator('[data-k="go"]').click();pg.locator('#kb-fab').click();pg.wait_for_timeout(200)
    scribble();print('after notes',pg.evaluate(st))
    pg.locator('[data-kbx="1"]').click();print('after close x (hide only)',pg.evaluate(st))
    pg.locator('button:has-text("End")').first.click();pg.wait_for_timeout(200);print('after End',pg.evaluate(st))
    labs();pg.locator('[data-id="circ"]').click();pg.locator('[data-k="go"]').click();pg.locator('#kb-fab').click();scribble();print('notes again',pg.evaluate(st))
    n=0
    while n<20:
        pg.wait_for_timeout(60)
        if pg.locator('.score').count(): break
        if pg.locator('.lev .opt').count():
            idx=pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)");pg.locator('.lev .opt').nth(idx).click();pg.locator('[data-k="n"]').click();n+=1
        elif pg.locator('.lev .chipb').count():
            ans=pg.evaluate("__T.ses.cur.ans")
            for i in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
            pg.locator('[data-k="chk"]').click();pg.locator('[data-k="n"]').click();n+=1
    print('after finish',pg.evaluate(st),errs)
