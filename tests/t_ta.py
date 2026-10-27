import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1280,'height':900},has_touch=True,is_mobile=False)
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="circ"]').click()
    pg.locator('.vtog button:has-text("Speaking")').first.click();pg.locator('[data-k="go"]').click();pg.wait_for_timeout(400)
    if pg.locator('[data-k="vkb"]').count() and 'keyboard' in pg.locator('[data-k="vkb"]').inner_text(): pg.locator('[data-k="vkb"]').click()
    pg.evaluate("window._ta=document.getElementById('vx-txt')")
    pg.locator('#vx-txt').tap();pg.wait_for_timeout(500)
    print('same element:',pg.evaluate("window._ta===document.getElementById('vx-txt')"),'focused:',pg.evaluate("document.activeElement&&document.activeElement.id"))
    pg.keyboard.type('Hexworth Radio');pg.wait_for_timeout(1500)
    print('value:',pg.evaluate("document.getElementById('vx-txt').value"),'same:',pg.evaluate("window._ta===document.getElementById('vx-txt')"))
