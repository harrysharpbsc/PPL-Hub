import os
from playwright.sync_api import sync_playwright
from PIL import Image
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':700,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    def labs(): pg.locator('button.nv:visible:has-text("Labs")').first.click()
    labs();shots=[]
    # row side view: find item
    pg.locator('[data-id="row"]').click();pg.locator('[data-k="go"]').click()
    for q in range(12):
        if pg.locator('.score').count():break
        side=pg.evaluate("(__T.ses.items[__T.ses.i].svg||'').indexOf('Side view')>=0")
        if side: pg.locator('.lev svg').first.screenshot(path='pp_side.png');shots.append('pp_side.png')
        idx=pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()");pg.locator('.lev .opt').nth(idx).click();pg.locator('[data-k="n"]').click()
    pg.locator('button:has-text("Done")').click()
    for lid in ['inst','diag','ukquiz']:
        pg.locator('[data-id="%s"]'%lid).click();pg.locator('[data-k="go"]').click();pg.wait_for_timeout(200)
        for q in range(10):
            if pg.locator('.lev svg').count():
                f='pp_%s.png'%lid;pg.locator('.lev svg').first.screenshot(path=f);shots.append(f);break
            idx=pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()");pg.locator('.lev .opt').nth(idx).click();pg.locator('[data-k="n"]').click()
        pg.locator('button:has-text("End")').first.click();labs()
    for lid in ['wind','wb','ls']:
        pg.locator('[data-id="%s"]'%lid).click();pg.wait_for_timeout(300)
        f='pp_%s.png'%lid;pg.locator('svg.lsv').first.screenshot(path=f);shots.append(f)
        pg.locator('button:has-text("End")').first.click();labs()
    print(shots,errs)
    ims=[Image.open(f) for f in shots]
    for im in ims: im.thumbnail((330,240))
    o=Image.new('RGB',(330*3,250*((len(ims)+2)//3)),'white')
    for i,im in enumerate(ims):o.paste(im,((i%3)*330,(i//3)*250))
    o.save('pp_m.png')
