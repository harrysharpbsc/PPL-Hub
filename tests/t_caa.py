from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':800,'height':1100});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://hub_test.html');pg.wait_for_timeout(800)
    pg.click('[data-v="subjects"] >> visible=true >> nth=0');pg.wait_for_timeout(300);print(pg.inner_text('body')[:700])
    for sub,top in [('Meteorology','Winter weather'),('Flight Performance and Planning','Weight, balance')]:
        pg.click('[data-v="subjects"] >> visible=true >> nth=0') 
        pg.click('text='+sub);pg.wait_for_timeout(300)
        pg.click('text='+top);pg.wait_for_timeout(300)
        print(pg.inner_text('body')[:300].replace('\n',' | '))
        pg.click('[data-a="step"] >> nth=0');pg.wait_for_timeout(400)
        print('STEP:',pg.inner_text('body')[:200].replace('\n',' | '))
        pg.screenshot(path='c_%s.png'%sub[:3])
        pg.goto('file://hub_test.html');pg.wait_for_timeout(500);pg.click('[data-v="subjects"] >> visible=true >> nth=0');pg.wait_for_timeout(200)
    print(errs)
    b.close()
