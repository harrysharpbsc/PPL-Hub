from playwright.sync_api import sync_playwright
import json
URL='file://hub_test.html'
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    for w,name in [(1000,'d'),(390,'m')]:
        pg=b.new_page(viewport={'width':w,'height':1000});pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto(URL);pg.wait_for_timeout(600)
        # empty state
        pg.locator('nav button:has-text("Progress"), button:has-text("Progress")').locator('visible=true').first.click();pg.wait_for_timeout(300)
        t=pg.inner_text('body');print(name,'empty:',t[:300].replace('\n',' | '))
        # seed progress via UI: do a pre-test on first topic quickly
        pg.locator('[data-v="subjects"]').locator('visible=true').first.click();pg.click('text=Air Law');pg.click('text=Rules of the Air essentials');pg.click('[data-a="step"] >> nth=0');pg.wait_for_timeout(300)
        for _ in range(4):
            pg.click('.opt >> nth=0');pg.wait_for_timeout(150)
            pg.click('[data-a="conf"] >> nth=1');pg.wait_for_timeout(150)
            pg.click('[data-a="nq"]');pg.wait_for_timeout(150)
        pg.wait_for_timeout(300);print(pg.inner_text('body')[:200].replace('\n',' | '))
        pg.locator('button:has-text("Done")').first.click();pg.wait_for_timeout(300)
        pg.locator('nav button:has-text("Progress"), button:has-text("Progress")').locator('visible=true').first.click();pg.wait_for_timeout(300)
        pg.click('[data-a="pexp"] >> nth=0');pg.wait_for_timeout(300)
        pg.screenshot(path='prog_%s.png'%name,full_page=True)
        print(name,pg.inner_text('body')[:900].replace('\n',' | '))
        # tap topic row
        pg.locator('.btn-row').first.click();pg.wait_for_timeout(300);print(name,'topic opened:',pg.inner_text('h1')[:60])
        pg.close()
    print(errs);b.close()
