import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in(1024,390):
        pg=b.new_page(viewport={'width':w,'height':800});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        pg.locator('button.nv:visible:has-text("Subjects")').first.click()
        pg.locator('button.sc[data-a="sub"]').first.click()
        pg.screenshot(path='stb_list_%d.png'%w)
        pg.locator('button.sc[data-a="topic"]').first.click()
        pg.screenshot(path='stb_%d.png'%w);print(w,errs)
