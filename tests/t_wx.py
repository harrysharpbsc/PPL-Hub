from playwright.sync_api import sync_playwright
URL='file:///tmp/claude-0/-home-claude/558a3edc-86fe-5e9d-8495-aab074e535e7/scratchpad/hub_test.html'
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':420,'height':900});errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(URL);pg.wait_for_timeout(600)
    pg.locator('button:has-text("Practice")').locator('visible=true').first.click();pg.wait_for_timeout(300)
    for m in ['wxm','wxt','wxc']:
        for run in range(25):
            pg.locator('button:has-text("Practice")').locator('visible=true').first.click() if run==0 and m!='wxm' else None
            pg.click('[data-m="%s"]'%m);pg.wait_for_timeout(100)
            for i in range(8):
                txt=pg.inner_text('.q') if pg.locator('.q').count() else ''
                n=pg.locator('[data-a="ropt"]').count()
                if n!=4: errs.append((m,run,i,'options',n,txt[:120]))
                pg.locator('[data-a="ropt"]').nth(i%4).click();pg.wait_for_timeout(30)
                pg.click('[data-a="rnext"]');pg.wait_for_timeout(30)
            if run==0: pg.screenshot(path='wx_%s_end.png'%m)
            pg.click('[data-a="back"]');pg.wait_for_timeout(100)
        print(m,'ok')
    # screenshot a question
    pg.click('[data-m="wxm"]');pg.wait_for_timeout(200);pg.screenshot(path='wx_q.png')
    pg.locator('[data-a="ropt"]').nth(0).click();pg.wait_for_timeout(100);pg.screenshot(path='wx_fb.png')
    print(pg.inner_text('body')[:700].replace('\n',' | '))
    print(errs[:10]);b.close()
