import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(1280,800),(800,1100)]:
        pg=b.new_page(viewport={'width':w,'height':h},has_touch=False);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        pg.locator('button.nv:visible:has-text("Labs")').first.click()
        print('fab on labs page:',pg.locator('#kb-fab:visible').count())
        pg.locator('[data-id="xc"]').click();pg.wait_for_timeout(200)
        print('fab in fly lab:',pg.locator('#kb-fab:visible').count())
        pg.locator('#kb-fab').click();pg.wait_for_timeout(300)
        bx=pg.locator('#kb-cv').bounding_box()
        # draw "QNH 1013"-ish scribble
        x0,y0=bx['x']+70,bx['y']+30
        for k in range(3):
            pg.mouse.move(x0+k*40,y0);pg.mouse.down()
            for j in range(12): pg.mouse.move(x0+k*40+j*2,y0+ (j%4)*6)
            pg.mouse.up()
        pg.locator('[data-kbc="red"]').click()
        pg.mouse.move(x0,y0+90);pg.mouse.down();pg.mouse.move(x0+150,y0+110,steps=10);pg.mouse.up()
        pg.locator('[data-k="go"]').click();pg.wait_for_timeout(1500)
        pg.screenshot(path='kbd_%d.png'%w)
        pg.locator('[data-kbt="type"]').click();pg.locator('#kb-txt').fill('QNH 1009\nSquawk 4521\nNot above 2000');pg.wait_for_timeout(200)
        pg.screenshot(path='kbd_t_%d.png'%w)
        pg.locator('[data-kbt="draw"]').click()
        n=pg.evaluate("KB.s.length") if False else None
        pg.locator('button:has-text("End")').first.click();pg.wait_for_timeout(200)
        print(w,'kb hidden after end:',pg.locator('#kb:visible').count()==0,errs)
        pg.reload();pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="circ"]').click();pg.wait_for_timeout(300)
        print('persisted open & strokes visible:',pg.locator('#kb:visible').count())
        pg.screenshot(path='kbd_p_%d.png'%w)
