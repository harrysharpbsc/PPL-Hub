import os,time
from playwright.sync_api import sync_playwright
FAKE="""(function(){window.__runs=0;window.__phr=[];window.__gap=1500;
function R(){this.lang='';}R.prototype.start=function(){var me=this,i=window.__runs++;var ph=window.__phr[i];
  setTimeout(function(){if(me._dead)return;if(ph){var r=[{0:{transcript:ph.slice(0,Math.ceil(ph.length/2))},isFinal:false,length:1}];me.onresult&&me.onresult({results:r});
   setTimeout(function(){if(me._dead)return;me.onresult&&me.onresult({results:[{0:{transcript:ph},isFinal:true,length:1}]});setTimeout(function(){if(!me._dead)me.onend&&me.onend()},700)},400)}
   else{setTimeout(function(){if(!me._dead){me.onerror&&me.onerror({error:'no-speech'});me.onend&&me.onend()}},3000)}},i?window.__gap:200)};
R.prototype.stop=function(){var me=this;setTimeout(function(){if(!me._dead){me._dead=1;me.onend&&me.onend()}},50)};R.prototype.abort=function(){this._dead=1};
window.SpeechRecognition=window.webkitSpeechRecognition=R})()"""
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':430,'height':1000});ctx.add_init_script(FAKE);pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="circ"]').click()
    pg.locator('.vtog button:has-text("Speaking")').first.click();pg.locator('[data-k="go"]').click();pg.wait_for_timeout(400)
    for case,gap,hold,phr in [('3 phrases, 1.5s gaps',1500,'normal',['Wycombe Information','Golf Victor Oscar','Cessna 172 at the hold runway two four ready for departure']),
                             ('tap mode, 6s gap',6000,'tap',['Wycombe Information','Golf Victor Oscar ready for departure'])]:
        pg.evaluate("(a)=>{window.__runs=0;window.__phr=a[0];window.__gap=a[1];__T.render()}",[phr,gap])
        pg.evaluate("h=>{var f=JSON.parse(localStorage.getItem('ppl-fs')||'{}');}",hold)
        if hold=='tap':
            pg.locator('.vtog [data-k="fsset"]').first.click() if pg.locator('.vtog [data-k="fsset"]').count() else None
            pg.locator('[data-f="hold"][data-v="tap"]').first.click();pg.wait_for_timeout(100)
            if pg.locator('[data-k="retry"]').count(): pg.locator('[data-k="retry"]').click()
        t0=time.time();pg.locator('#vx-rec').click()
        for i in range(120):
            pg.wait_for_timeout(250)
            if pg.locator('.fb').count(): break
            if hold=='tap' and time.time()-t0>gap/1000+5 and pg.locator('#vx-rec').count():
                print('  still listening at',round(time.time()-t0,1),'s:',pg.locator('#vx-msg').text_content()[:70]);pg.locator('#vx-rec').click();hold='tapped'
        heard=pg.evaluate("__T.ses.log&&__T.ses.log[__T.ses.log.length-1].heard")
        print(case,'| marked after',round(time.time()-t0,1),'s | heard:',heard)
        if pg.locator('[data-k="retry"]').count(): pg.locator('[data-k="retry"]').click();pg.wait_for_timeout(200)
    print('errors',errs)
