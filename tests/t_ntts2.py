import os
from playwright.sync_api import sync_playwright
MOCK="export const KokoroTTS={from_pretrained:async(id,o)=>{if(o.progress_callback)o.progress_callback({status:'progress',file:'model.onnx',progress:50});return{generate:async(t,o)=>{const t0=Date.now();while(Date.now()-t0<1500){};return{audio:new Float32Array(24000),sampling_rate:24000}}}}};"
with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);ctx=b.new_context();pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    ctx.route('**cdn.jsdelivr.net/**',lambda r:r.fulfill(status=200,content_type='text/javascript',body=MOCK,headers={'Access-Control-Allow-Origin':'*'}))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    pg.evaluate("(function(){localStorage.setItem('ppl-fs',JSON.stringify({voices:'natural'}));return 1})()");pg.reload()
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="xc"]').click()
    pg.locator('[data-k="fs"][data-f="voices"][data-v="natural"]').click();pg.wait_for_timeout(2500)
    print('status:',pg.locator('#ntts-st').inner_text() if pg.locator('#ntts-st').count() else None)
    r=pg.evaluate("""(async function(){var t0=performance.now(),ticks=0;var iv=setInterval(function(){ticks++},50);__T.speak('Golf Charlie Delta, Thornby Approach, QNH one zero one one.','Thornby Approach');await new Promise(function(r){setTimeout(r,2200)});clearInterval(iv);return{ticks:ticks,src:!!__T.NTTS.src,st:__T.NTTS.st}})()""")
    print(r,errs)
