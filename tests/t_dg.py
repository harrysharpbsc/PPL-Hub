import os,sys
from playwright.sync_api import sync_playwright
topics=sys.argv[1].split('|') if len(sys.argv)>1 else []
dark=len(sys.argv)>2
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1100,'height':900},device_scale_factor=1);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    if dark: pg.evaluate("document.documentElement.setAttribute('data-theme','dark')")
    k=0
    for t in topics:
        ok=pg.evaluate("""(function(t){var i=-1;document.querySelectorAll('x').length;return 1})('%s')"""%t)
        # navigate via subject list: find topic id by evaluating NOTES through __T? not exposed; use UI search
        pg.locator('button.nv:visible:has-text("Subjects")').first.click()
        found=False
        for si in range(9):
            pg.locator('button.nv:visible:has-text("Subjects")').first.click()
            btns=pg.locator('button.sc[data-a="sub"]')
            if si>=btns.count(): break
            btns.nth(si).click()
            tb=pg.locator('button.sc[data-a="topic"]',has_text=t)
            if tb.count():
                tb.first.click();found=True;break
        if not found: print('NOTFOUND',t);continue
        rd=pg.locator('[data-a="step"][data-k="read"]')
        if rd.count(): rd.first.click()
        pg.wait_for_timeout(200)
        el=pg.locator('.dgs').first
        if el.count():
            el.screenshot(path='dg_%d.png'%k);print(t,'->','dg_%d.png'%k);k+=1
        else: print('NODIAG',t)
    print(errs)
