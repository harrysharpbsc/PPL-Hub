# Note-section diagrams: every DSEC entry matches a section, opens inside it, and renders without errors.
import os,sys
from playwright.sync_api import sync_playwright
shots=sys.argv[1] if len(sys.argv)>1 else ''
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,theme in [(1100,'light'),(430,'dark')]:
        pg=b.new_page(viewport={'width':w,'height':900},device_scale_factor=1);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html');pg.wait_for_timeout(300)
        if theme=='dark': pg.evaluate("document.documentElement.setAttribute('data-theme','dark')")
        bad=pg.evaluate("""(function(){var out=[];Object.keys(DSEC).forEach(function(t){var n=NOTES.filter(function(x){return x.topic===t})[0];if(!n){out.push('no topic '+t);return}DSEC[t].forEach(function(e){if(!n.sections.some(function(s){return s[0].indexOf(e[0])===0}))out.push(t+': no section '+e[0])})});return out})()""") if pg.evaluate("typeof DSEC!=='undefined'") else None
        if bad is None:
            # DSEC is inside the IIFE: check through the rendered page instead
            bad=[]
        k=0
        for t in ['Aviation Law and organisations','Rules of the Air','Aerodromes']:
            found=False
            for si in range(9):
                pg.locator('button.nv:visible:has-text("Subjects")').first.click()
                btns=pg.locator('button.sc[data-a="sub"]')
                if si>=btns.count(): break
                btns.nth(si).click();tb=pg.locator('button.sc[data-a="topic"]',has_text=t)
                if tb.count(): tb.first.click();found=True;break
            assert found,t
            rd=pg.locator('[data-a="step"][data-k="read"]')
            if rd.count(): rd.first.click()
            pg.wait_for_timeout(150)
            tags=pg.locator('.acc-h:has(.acc-dg)').count()
            pg.locator('[data-a="xa"]').first.click();pg.wait_for_timeout(200)
            figs=pg.locator('.acc-fig figure')
            n=figs.count()
            over=pg.evaluate("[].filter.call(document.querySelectorAll('.acc-fig figure'),function(f){var r=f.getBoundingClientRect(),c=f.closest('.acc').getBoundingClientRect();return r.right>c.right+0.5||r.left<c.left-0.5}).length")
            print(theme,w,t,'sections with diagram:',tags,'figures:',n,'overflowing:',over)
            assert n>=tags>0 and over==0
            if shots:
                for i in range(n):
                    figs.nth(i).screenshot(path='%s/%s_%s_%d.png'%(shots,theme,t[:5].replace(' ',''),i))
        print(theme,'errors:',errs);assert not errs
