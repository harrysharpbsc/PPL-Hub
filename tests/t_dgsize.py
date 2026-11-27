# Style B diagrams (class dgb, library labs80b.js, skill .claude/skills/ppl-diagram) keep every label at 11px
# or more on screen, at phone and tablet widths. Topics listed in DONE must be fully converted to style B.
import os
from playwright.sync_api import sync_playwright
DONE=['Rules of the Air','Aerodromes','Altimeter Setting Procedures','Airspace','Air Traffic Services']
MIN=11
with sync_playwright() as p:
    b=p.chromium.launch()
    for w in (430,800,1100):
        pg=b.new_page(viewport={'width':w,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html');pg.wait_for_timeout(300)
        for t in DONE:
            found=False
            for si in range(10):
                pg.locator('button.nv:visible:has-text("Subjects")').first.click()
                bs=pg.locator('button.sc[data-a="sub"]')
                if si>=bs.count(): break
                bs.nth(si).click();tb=pg.locator('button.sc[data-a="topic"]',has_text=t)
                if tb.count(): tb.first.click();found=True;break
            assert found,t
            rd=pg.locator('[data-a="step"][data-k="read"]')
            if rd.count(): rd.first.click()
            pg.locator('[data-a="xa"]').first.click();pg.wait_for_timeout(200)
            bad=pg.evaluate("""(function(min){var out=[];[].forEach.call(document.querySelectorAll('.acc-fig figure'),function(f){
              var s=f.querySelector('svg'),k=s.getBoundingClientRect().width/s.viewBox.baseVal.width,name=f.querySelector('figcaption b').textContent;
              [].forEach.call(s.querySelectorAll('text'),function(x){var px=parseFloat(getComputedStyle(x).fontSize)*k;if(px<min-0.05)out.push(name+': "'+x.textContent+'" '+px.toFixed(1)+'px')})});return out})(%d)"""%MIN)
            assert not bad,(w,t,bad)
            n=pg.evaluate("document.querySelectorAll('.acc-fig figure').length")
            notb=pg.evaluate("[].filter.call(document.querySelectorAll('.acc-fig figure'),function(f){return !f.classList.contains('dgb')}).map(function(f){return f.querySelector('figcaption b').textContent})")
            assert n and not notb,(t,'not style B:',notb)
            print(w,t,n,'figures, all labels >=%dpx'%MIN)
        assert not errs,errs
    print('PASS')
