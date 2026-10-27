import os
from playwright.sync_api import sync_playwright
from PIL import Image
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':700,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    def labs(): pg.locator('button.nv:visible:has-text("Labs")').first.click()
    labs();shots=[]
    for lid,sel in [('inst','.lev svg'),('alt','svg.ldial'),('row','.lev svg'),('ls','svg.lsv'),('xc','svg.lmap')]:
        pg.locator('[data-id="%s"]'%lid).click()
        if lid!='ls' and lid!='xc': pg.locator('[data-k="go"]').click()
        for q in range(10):
            pg.wait_for_timeout(150)
            if pg.locator(sel).count():
                f='in_%s.png'%lid;pg.locator(sel).first.screenshot(path=f);shots.append(f);break
            idx=pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()");pg.locator('.lev .opt').nth(idx).click();pg.locator('[data-k="n"]').click()
        pg.locator('button:has-text("End")').first.click();labs()
    print(shots,errs)
    ims=[Image.open(f) for f in shots]
    for im in ims: im.thumbnail((380,300))
    o=Image.new('RGB',(760,300*3),'white')
    for i,im in enumerate(ims):o.paste(im,((i%2)*380,(i//2)*300))
    o.save('in_m.png')
