import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (1024,390):
        pg=b.new_page(viewport={'width':w,'height':900});errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        pg.locator('button.nv:visible:has-text("Subjects")').first.click()
        pg.locator('button.sc[data-a="sub"]').first.click()
        pg.locator('button:has-text("One-page cheat sheet")').click()
        pg.wait_for_timeout(300)
        pg.screenshot(path='sheet_%d.png'%w,full_page=True)
        if w==1024: pg.pdf(path='sheet.pdf',format='A4',print_background=True)
        print(w,errs,pg.locator('.shbox').count())
    b.close()
