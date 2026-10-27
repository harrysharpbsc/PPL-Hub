import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={'width':430,'height':900},color_scheme='dark')
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    for lid in ['xc','inf','chart']:
        pg.locator('[data-id="%s"]'%lid).click()
        if lid!='xc': pg.locator('[data-k="go"]').click()
        pg.wait_for_timeout(300);pg.screenshot(path='dk_%s.png'%lid)
        pg.locator('button:has-text("End")').first.click();pg.locator('button.nv:visible:has-text("Labs")').first.click()
    pg2=b.new_page(viewport={'width':430,'height':900})
    pg2.goto('file://'+os.getcwd()+'/hub_test.html')
    pg2.locator('button.nv:visible:has-text("Labs")').first.click()
    pg2.locator('[data-id="inf"]').click();pg2.locator('[data-k="go"]').click();pg2.wait_for_timeout(300);pg2.screenshot(path='lt_inf.png')
