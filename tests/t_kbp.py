import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':800});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="xc"]').click();pg.locator('[data-k="go"]').click();pg.locator('#kb-fab').click();pg.wait_for_timeout(200)
    def draw(n):
        bx=pg.locator('#kb-cv').bounding_box()
        for i in range(n): pg.mouse.move(bx['x']+90,bx['y']+30+i*30);pg.mouse.down();pg.mouse.move(bx['x']+220,bx['y']+40+i*30,steps=6);pg.mouse.up()
    st="__T.KB.bg+':'+__T.KB.s.length"
    draw(3);print(pg.evaluate(st))
    pg.select_option('#kb-bgsel','transit');print(pg.evaluate(st))
    draw(2);print(pg.evaluate(st))
    pg.select_option('#kb-bgsel','contact');print(pg.evaluate(st));pg.locator('#kb').screenshot(path='kbp1.png')
    pg.select_option('#kb-bgsel','transit');print(pg.evaluate(st))
    pg.locator('[data-kbclr="1"]').click();pg.locator('[data-kbclr="1"]').click();print('cleared page',pg.evaluate(st))
    pg.select_option('#kb-bgsel','contact');print('contact kept',pg.evaluate(st))
    pg.locator('button:has-text("End")').first.click();print('after end',pg.evaluate("Object.keys(__T.KB.pages).map(function(k){return k+':'+__T.KB.pages[k].length}).join(',')"),errs)
