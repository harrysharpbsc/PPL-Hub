import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':430,'height':1000});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click()
    print('SR in chromium:',pg.evaluate("!!(window.SpeechRecognition||window.webkitSpeechRecognition)"))
    for lid,reps in [('xc',6),('circ',2),('ctlarr',2),('ctldep',2)]:
        for rep in range(reps):
            pg.locator('[data-id="%s"]'%lid).click()
            if rep==0 and lid=='xc':
                pg.locator('.vtog button:has-text("Speaking")').first.click();pg.screenshot(path='v_start.png')
            pg.locator('[data-k="go"]').click();n=0;bad=0;loops=0
            while n<60:
                pg.wait_for_timeout(60);loops+=1
                assert loops<2500,'%s did not finish (stuck at: %s)'%(lid,pg.evaluate("(function(c){return c?(c.kind||'')+' '+(c.q||c.cap||''):'none'})(__T.ses.cur)"))
                if pg.locator('.score').count(): break
                if pg.locator('.lev .opt').count() and not pg.locator('.fb').count():  # tile decisions, not radio calls
                    pg.locator('.lev .opt').nth(pg.evaluate("__T.ses.ord.indexOf(__T.ses.cur.a)")).click();pg.wait_for_timeout(60)
                    pg.locator('[data-k="n"]').click();continue
                if pg.locator('#vx-txt').count():
                    kind=pg.evaluate("__T.ses.cur.kind")
                    if kind=='mcq': txt=pg.evaluate("__T.ses.cur.opts[__T.ses.cur.a]")
                    else: txt=pg.evaluate("(function(){var e=__T.ses.cur,o=e.opt||[];return e.ans.filter(function(t){return o.indexOf(t)<0}).join(', ')})()")
                    txt=pg.evaluate('''(function(t){var D={zero:0,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9};t=t.replace(/,/g,'');return t.replace(/\\b((?:zero|one|two|three|four|five|six|seven|eight|nine|decimal)(?:\\s+(?:zero|one|two|three|four|five|six|seven|eight|nine|decimal))+)\\b/gi,function(m){return m.toLowerCase().split(/\\s+/).map(function(w){return w==='decimal'?'.':D[w]}).join('')}).replace(/two thousand five hundred/gi,'2500').replace(/two thousand/gi,'2000').replace(/three thousand/gi,'3000')})''',txt)
                    pg.locator('#vx-txt').fill(txt)
                    pg.locator('[data-k="vchk"]').click()
                    if n==1 and rep==0 and lid=='xc': pg.screenshot(path='v_fb.png',full_page=True)
                    if pg.locator('.fb.no').count(): print('WRONG',lid,txt[:80]);bad+=1
                    pg.locator('[data-k="n"]').click();n+=1
            sc=pg.locator('.score').inner_text();print(lid,rep,sc,n);assert sc.strip()=='100%',lid+' should score 100% with every call right'
            pg.locator('button:has-text("Done")').click()
    # wrong answer check
    pg.locator('[data-id="circ"]').click();pg.locator('[data-k="go"]').click();pg.wait_for_timeout(300)
    pg.locator('#vx-txt').fill('Mayday mayday, over');pg.locator('[data-k="vchk"]').click();pg.screenshot(path='v_wrong.png',full_page=True)
    wm=pg.locator('.fb.no').count();print('wrong marked:',wm)
    errs=[e for e in errs if 'importScripts' not in e];print(errs)
    assert wm==1 and not errs
    print('PASS')
