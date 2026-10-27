import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(1280,900),(430,900)]:
        pg=b.new_page(viewport={'width':w,'height':h});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        def nav(t): pg.locator('button.nv:visible:has-text("%s")'%t).first.click();pg.wait_for_timeout(150)
        shots=[]
        for t in ['Today','Practice','Radio','Labs','Progress']:
            nav(t);f='sp_%s_%d.png'%(t,w);pg.screenshot(path=f,full_page=True);shots.append(f)
        nav('Subjects');pg.locator('button.sc[data-a="sub"]').first.click();pg.locator('button.sc[data-a="topic"]').first.click();pg.screenshot(path='sp_topic_%d.png'%w,full_page=True)
        nav('Labs');pg.locator('[data-id="xc"]').click();pg.locator('[data-k="go"]').click();pg.wait_for_timeout(1500);pg.screenshot(path='sp_xc_%d.png'%w,full_page=True)
        # find adjacent buttons with small gaps
        gaps=pg.evaluate("""(function(){var out=[];document.querySelectorAll('#main button').forEach(function(a){var r=a.getBoundingClientRect();if(!r.width)return;var n=a.nextElementSibling;if(n&&n.tagName==='BUTTON'){var q=n.getBoundingClientRect();if(Math.abs(q.top-r.top)<4){var g=q.left-r.right;if(g<8)out.push([a.textContent.trim().slice(0,20),n.textContent.trim().slice(0,20),Math.round(g)])}}});return out})()""")
        print(w,'tight in flight:',gaps[:10],errs)
        # check other screens
        for t in ['Today','Practice','Radio','Progress','Labs']:
            nav(t) if pg.locator('button.nv:visible:has-text("%s")'%t).count() else None
