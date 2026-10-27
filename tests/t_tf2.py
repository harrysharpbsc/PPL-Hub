import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':700,'height':1100});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.on('console',lambda m:errs.append('C:'+m.text) if m.type=='error' else None)
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    for rep in range(80):
        pg.locator('[data-id="xc"]').click()
        if not pg.locator('[data-k="go"]').count():
            print('FAIL at',rep,errs[:3]);pg.screenshot(path='tf_fail.png');break
        pg.locator('button:has-text("End")').first.click();pg.locator('button.nv:visible:has-text("Labs")').first.click()
    print('done',errs[:3])
