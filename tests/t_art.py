import os
from playwright.sync_api import sync_playwright
OUT=os.environ.get('SHOTS','.')
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(430,1000),(1280,900)]:
        pg=b.new_page(viewport={'width':w,'height':h});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html');pg.locator('button.nv:visible:has-text("Labs")').first.click()
        pg.locator('[data-id="articles"]').click();pg.wait_for_timeout(100)
        if w==430: pg.screenshot(path=OUT+'/art_menu.png',full_page=True)
        for bi in ['0','1','2','3','4','all']:
            pg.locator('[data-k="learn"][data-v="%s"]'%bi).click()
            if bi=='3' and w==430: pg.screenshot(path=OUT+'/art_learn.png',full_page=True)
            pg.locator('[data-k="hide"]').click();pg.locator('.art').first.click()
            if bi=='0' and w==430: pg.screenshot(path=OUT+'/art_cover.png',full_page=True)
            pg.locator('[data-k="quiz"]').first.click();n=0
            while pg.locator('[data-k="ans"]').count() and n<20:
                pg.locator('[data-k="ans"]').first.click();pg.locator('[data-k="qn"]').click();n+=1
            sc=pg.locator('.score').text_content()
            pg.locator('[data-k="learn"]').first.click();pg.locator('[data-k="match"]').first.click()
            # solve match by trying all
            for i in range(10):
                L=pg.locator('[data-k="L"]:not([disabled])')
                if not L.count():break
                L.first.click()
                for j in range(pg.locator('[data-k="R"]:not([disabled])').count()):
                    R=pg.locator('[data-k="R"]:not([disabled])').nth(j);R.click()
                    if pg.locator('[data-k="L"].sel').count()==0:break
                    if not pg.locator('[data-k="L"].sel').count():break
            done=pg.locator('.score').count()
            print(w,bi,'quiz qs',n,'score',sc,'| match done',bool(done))
            pg.locator('[data-k="learn"]').first.click() if pg.locator('[data-k="learn"]').count() else None
            pg.locator('[data-k="menu"]').first.click()
        if w==430: pg.screenshot(path=OUT+'/art_menu2.png',full_page=True)
        print(w,'errors',errs)
