import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':430,'height':1000});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    tiles=[];print('SR in chromium:',pg.evaluate("!!(window.SpeechRecognition||window.webkitSpeechRecognition)"))
    for lid,reps in [('xc',3),('circ',1),('ctlarr',1),('ctldep',1)]:
        for rep in range(reps):
            pg.locator('[data-id="%s"]'%lid).click()
            if rep==0 and lid=='xc':
                pg.locator('.vtog button:has-text("Speaking")').first.click();pg.screenshot(path='v_start.png')
            pg.locator('[data-k="go"]').click();n=0;bad=0
            while n<60:
                pg.wait_for_timeout(60)
                if pg.locator('.score').count(): break
                if pg.locator('.lev .opt').count() and not pg.locator('#vx-txt').count():
                    q=pg.evaluate("__T.ses.cur.q")
                    idx=pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)");pg.locator('.lev .opt').nth(idx).click()
                    tiles.append(q[:50]);pg.locator('[data-k="n"]').click();n+=1;continue
                if pg.locator('#vx-txt').count():
                    kind=pg.evaluate("__T.ses.cur.kind")
                    if kind=='mcq': txt=pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]")
                    else: txt=pg.evaluate("(function(){var e=__T.ses.cur,o=e.opt||[];return e.ans.filter(function(t){return o.indexOf(t)<0}).join(', ')})()")
                    pg.locator('#vx-txt').fill(txt)
                    pg.locator('[data-k="vchk"]').click()
                    if n==1 and rep==0 and lid=='xc': pg.screenshot(path='v_fb.png',full_page=True)
                    if pg.locator('.fb.no').count(): print('WRONG',lid,txt[:80]);bad+=1
                    pg.locator('[data-k="n"]').click();n+=1
            print(lid,rep,pg.locator('.score').inner_text(),n)
            pg.locator('button:has-text("Done")').click()
    # wrong answer check
    pg.locator('[data-id="circ"]').click();pg.locator('[data-k="go"]').click();pg.wait_for_timeout(300)
    pg.locator('#vx-txt').fill('Mayday mayday, over');pg.locator('[data-k="vchk"]').click();pg.screenshot(path='v_wrong.png',full_page=True)
    print('wrong marked:',pg.locator('.fb.no').count())
    print('tile questions:',sorted(set(tiles)));print(errs)
