import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':800,'height':900})
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    for lid in ['xc','circ','ctlarr','ctldep']:
        for rep in range(2):
            pg.locator('[data-id="%s"]'%lid).click();pg.locator('[data-k="go"]').click()
            n=0
            while n<40:
                pg.wait_for_timeout(80)
                if pg.locator('.score').count(): break
                if pg.locator('.lev .opt').count():
                    cur=pg.evaluate("(function(){var c=__T.ses.cur;return {o:c.opts,a:c.a,q:c.q,atc:c.atc}})()")
                    idx=pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)")
                    pg.locator('.lev .opt').nth(idx).click()
                    if pg.locator('.fb.no').count(): print('WRONG',lid,cur)
                    # duplicates
                    if len(set(cur['o']))<len(cur['o']): print('DUP',lid,cur['o'])
                    pg.locator('[data-k="n"]').click(); n+=1
                elif pg.locator('.lev .chipb').count():
                    cur=pg.evaluate("(function(){var c=__T.ses.cur;return {a:c.ans,b:c.bank}})()")
                    for i in range(len(cur['a'])): pg.locator('.lev .chipb[data-v="%d"]'%i).click()
                    pg.locator('[data-k="chk"]').click()
                    if pg.locator('.fb.no').count(): print('WRONGB',lid,cur)
                    pg.locator('[data-k="n"]').click(); n+=1
            pg.locator('button:has-text("Done")').click()
    b.close()
