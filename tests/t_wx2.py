
from playwright.sync_api import sync_playwright
URL='file:///tmp/claude-0/-home-claude/558a3edc-86fe-5e9d-8495-aab074e535e7/scratchpad/hub_test.html'
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':900,'height':900})
    pg.goto(URL);pg.wait_for_timeout(500)
    pg.locator('button:has-text("Practice")').locator('visible=true').first.click();pg.wait_for_timeout(200)
    for m,runs in [('wxm',3),('wxt',2),('wxc',2)]:
        for r in range(runs):
            pg.click('[data-m="%s"]'%m);pg.wait_for_timeout(100)
            for i in range(8):
                q=pg.inner_text('.q').replace('\n',' || ')
                pg.locator('[data-a="ropt"]').nth(0).click();pg.wait_for_timeout(40)
                fb=pg.inner_text('.fb').replace('\n',' ')
                opts=[o.inner_text().replace('\n',' ') for o in pg.locator('[data-a="ropt"]').all()]
                print(m,'|',q,'|',opts,'|',fb[:260]);print()
                pg.click('[data-a="rnext"]');pg.wait_for_timeout(30)
            pg.click('[data-a="back"]');pg.wait_for_timeout(100)
    b.close()
