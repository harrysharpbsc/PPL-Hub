import os
from playwright.sync_api import sync_playwright
OUT=os.environ.get('SHOTS','.')
T="[].map.call(document.querySelectorAll('.mt'),t=>t.className.replace('mt','').trim()||'-')"
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(430,1100),(1280,1000)]:
        pg=b.new_page(viewport={'width':w,'height':h});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        pg.locator('button.nv:visible:has-text("Practice")').first.click();pg.locator('[data-a="mfb"][data-v="now"]').click()
        if w==430: pg.locator('.mfb').screenshot(path=OUT+'/mock_setting.png')
        pg.locator('[data-a="mock"]').first.click();pg.wait_for_timeout(200)
        pg.screenshot(path=OUT+'/mock_q1_%d.png'%w,full_page=True)
        for i in range(6):
            pg.locator('.opt').nth(i%4).click()
            if i<5: pg.locator('[data-a="mnext"]').click()
        pg.screenshot(path=OUT+'/mock_now_%d.png'%w,full_page=True)
        print(w,'as I go:',pg.evaluate(T)[:8])
        # overflow check: every button inside its card
        print(w,'overflow:',pg.evaluate("[].filter.call(document.querySelectorAll('#main button'),b=>{const r=b.getBoundingClientRect(),c=b.closest('.card');if(!c||!r.width)return false;const q=c.getBoundingClientRect();return r.left<q.left-1||r.right>q.right+1}).map(b=>b.textContent.trim())"))
        pg.locator('[data-a="mfin"]').click();pg.locator('[data-a="mfin"]').click();pg.wait_for_timeout(150);print(w,'result:',pg.evaluate(T)[:8])
        pg.locator('[data-a="end"]').first.click();pg.locator('button.nv:visible:has-text("Practice")').first.click();pg.locator('[data-a="mfb"][data-v="end"]').click()
        pg.locator('[data-a="mock"]').first.click();pg.locator('.opt').first.click();pg.locator('.opt').nth(1).click();pg.locator('.mt').nth(4).click();pg.locator('.opt').nth(2).click()
        print(w,'at the end:',pg.evaluate(T)[:6],'| errors',errs)
