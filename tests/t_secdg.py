# Topic diagrams live inside the read sections: every placement finds its section, no topic keeps a
# top-of-page Diagrams panel, and each figure fits its card. Pass a folder to save screenshots.
import os,sys
from playwright.sync_api import sync_playwright
shots=sys.argv[1] if len(sys.argv)>1 else ''
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,theme in [(1100,'light'),(430,'dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},device_scale_factor=1);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html');pg.wait_for_timeout(300)
        if theme=='dark': pg.evaluate("document.documentElement.setAttribute('data-theme','dark')")
        bad=pg.evaluate("""(function(){var T=__T,out=[];Object.keys(T.DIAG).forEach(function(t){out.push('still in top panel: '+t)});
          Object.keys(T.DSEC).forEach(function(t){var n=T.NOTES.filter(function(x){return x.topic===t})[0];if(!n){out.push('no topic '+t);return}
          T.DSEC[t].forEach(function(e){if(!n.sections.some(function(s){return s[0].indexOf(e[0])===0}))out.push(t+': no section '+e[0])})});return out})()""")
        assert not bad,bad
        topics=pg.evaluate("Object.keys(__T.DSEC)")
        total=0
        for t in topics:
            found=False
            for si in range(10):
                pg.locator('button.nv:visible:has-text("Subjects")').first.click()
                btns=pg.locator('button.sc[data-a="sub"]')
                if si>=btns.count(): break
                btns.nth(si).click();tb=pg.locator('button.sc[data-a="topic"]',has_text=t)
                if tb.count(): tb.first.click();found=True;break
            assert found,t
            rd=pg.locator('[data-a="step"][data-k="read"]')
            if rd.count(): rd.first.click()
            pg.wait_for_timeout(100)
            assert pg.locator('h2.sec-t:has-text("Diagrams")').count()==0,t
            want=pg.evaluate("__T.DSEC[%r].length"%t)
            pg.locator('[data-a="xa"]').first.click();pg.wait_for_timeout(150)
            figs=pg.locator('.acc-fig figure');n=figs.count();total+=n
            over=pg.evaluate("[].filter.call(document.querySelectorAll('.acc-fig figure'),function(f){var r=f.getBoundingClientRect(),c=f.closest('.acc').getBoundingClientRect();return r.right>c.right+0.5||r.left<c.left-0.5}).length")
            assert n==want and over==0,(t,n,want,over)
            if shots:
                for i in range(n): figs.nth(i).screenshot(path='%s/%s_%02d_%s_%d.png'%(shots,theme,topics.index(t),t[:6].replace(' ',''),i))
            pg.locator('[data-a="xa"]').first.click()
        print(theme,w,len(topics),'topics,',total,'diagrams in sections; errors:',errs);assert not errs
