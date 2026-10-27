import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':430,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    pg.locator('[data-id="ukmap"]').click();pg.wait_for_timeout(400)
    pg.locator('[data-k="base"][data-v="chart"]').click();pg.wait_for_timeout(400)
    pg.locator('#ukmap').screenshot(path='ukc0.png')
    for i in range(3): pg.locator('[data-k="zi"]').click();pg.wait_for_timeout(200)
    pg.wait_for_timeout(400);pg.locator('#ukmap').screenshot(path='ukc1.png')
    print(errs, pg.locator('#uk-attr').inner_text())
