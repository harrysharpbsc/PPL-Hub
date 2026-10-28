import os
from playwright.sync_api import sync_playwright
OUT=os.environ.get('SHOTS','.')
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(430,1100),(1280,1000)]:
        pg=b.new_page(viewport={'width':w,'height':h});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        pg.locator('button.nv:visible:has-text("Practice")').first.click();pg.locator('[data-a="mock"]').first.click();pg.wait_for_timeout(200)
        for i in range(6):
            pg.locator('.opt').nth(i%4).click()
            if i<5: pg.locator('[data-a="mnext"]').click()
        pg.screenshot(path=OUT+'/mock_now_%d.png'%w,full_page=True)
        tiles=pg.evaluate("[].map.call(document.querySelectorAll('.mt'),t=>t.className.replace('mt','').trim()||'-')")
        print(w,'tiles as-I-go:',tiles[:8])
        pg.locator('[data-a="mfb"][data-v="end"]').click();pg.locator('.mt').nth(9).click();pg.locator('.opt').first.click();pg.locator('.opt').nth(1).click()
        print(w,'end mode tiles:',pg.evaluate("[].map.call(document.querySelectorAll('.mt'),t=>t.className.replace('mt','').trim()||'-')")[:11])
        pg.locator('[data-a="mfin"]').click();print(w,'finish arm:',pg.locator('[data-a="mfin"]').text_content())
        pg.locator('[data-a="mfin"]').click();pg.wait_for_timeout(200)
        print(w,'score',pg.locator('.score').text_content(),'| result tiles',pg.evaluate("[].map.call(document.querySelectorAll('.mt'),t=>t.className.replace('mt','').trim()||'-')")[:11])
        pg.locator('.mt').nth(1).click();pg.wait_for_timeout(100);pg.screenshot(path=OUT+'/mock_done_%d.png'%w,full_page=True)
        print(w,'review shown:',pg.locator('.sum .card .q').count(),'errors',errs)
