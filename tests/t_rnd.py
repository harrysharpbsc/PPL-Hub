import os,sys
from playwright.sync_api import sync_playwright
def run(pg,lid,shot=None):
    pg.locator('[data-id="%s"]'%lid).click(); pg.locator('[data-k="go"]').click()
    n=0;intro=''
    while n<40:
        pg.wait_for_timeout(120)
        if pg.locator('.score').count(): break
        if pg.locator('.lev .opt').count():
            txt=pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]")
            pg.locator('.lev .opt',has_text=txt[:30]).first.click()
            if shot and n==shot[0]: pg.screenshot(path=shot[1])
            pg.locator('[data-k="n"]').click(); n+=1
        elif pg.locator('.lev .chipb').count():
            ans=pg.evaluate("__T.ses.cur.ans")
            for i in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
            pg.locator('[data-k="chk"]').click(); pg.locator('[data-k="n"]').click(); n+=1
    return pg.locator('.score').inner_text(),n
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (1024,390):
        pg=b.new_page(viewport={'width':w,'height':800});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        pg.locator('button.nv:visible:has-text("Labs")').first.click()
        for lid in ['rxc','rcirc','rctl']:
            for rep in range(4):
                pg.locator('[data-id="%s"]'%lid).click()
                pg.screenshot(path='rnd_%s_start_%d_%d.png'%(lid,w,rep)) if rep<2 and w==390 else None
                pg.locator('[data-k="go"]').click()
                n=0
                while n<40:
                    pg.wait_for_timeout(100)
                    if pg.locator('.score').count(): break
                    if pg.locator('.lev .opt').count():
                        txt=pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]")
                        pg.locator('.lev .opt',has_text=txt[:30]).first.click()
                        if rep==0 and n==2 and w==390: pg.screenshot(path='rnd_%s_mid.png'%lid)
                        pg.locator('[data-k="n"]').click(); n+=1
                    elif pg.locator('.lev .chipb').count():
                        ans=pg.evaluate("__T.ses.cur.ans")
                        for i in range(len(ans)): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
                        pg.locator('[data-k="chk"]').click(); pg.locator('[data-k="n"]').click(); n+=1
                print(w,lid,rep,pg.locator('.score').inner_text(),n)
                pg.locator('button:has-text("Done")').click()
        print(w,errs)
    b.close()
