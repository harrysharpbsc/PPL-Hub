import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1000,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    shots=[]
    for lid,want in [('row',3),('join',3),('diag',12)]:
        pg.locator('[data-id="%s"]'%lid).click();pg.locator('[data-k="go"]').click()
        got=0
        for q in range(12):
            if pg.locator('.score').count(): break
            svg=pg.locator('.lev svg').first
            lab=pg.evaluate("(function(){var i=__T.ses.items[__T.ses.i];return (i.svg||'').indexOf('chsv')>=0})()")
            if svg.count() and lab and got<3:
                f='chs_%s_%d.png'%(lid,got);svg.screenshot(path=f);shots.append(f);got+=1
            idx=pg.evaluate("(function(){var s=__T.ses;return s.ord.indexOf(s.items[s.i].a)})()")
            pg.locator('.lev .opt').nth(idx).click();pg.locator('[data-k="n"]').click()
        pg.locator('button:has-text("Done")').click()
    print(shots,errs)
    from PIL import Image
    ims=[Image.open(f) for f in shots];W=330;H=230
    o=Image.new('RGB',(W*3,H*((len(ims)+2)//3)),'white')
    for i,im in enumerate(ims):im.thumbnail((W,H));o.paste(im,((i%3)*W,(i//3)*H))
    o.save('chs_m.png')
