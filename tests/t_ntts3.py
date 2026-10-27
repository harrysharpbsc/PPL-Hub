import os
from playwright.sync_api import sync_playwright
MOCK="export const KokoroTTS={from_pretrained:async(id,o)=>{const r=await fetch('https://huggingface.co/onnx-community/Kokoro/resolve/main/onnx/model.onnx');const b=await r.arrayBuffer();self.__mb=b.byteLength;return{generate:async(t,o)=>{const t0=Date.now();while(Date.now()-t0<800){};return{audio:new Float32Array(24000),sampling_rate:24000}}}}};"
hits={'hf':0}
def hf(r):
    hits['hf']+=1;r.fulfill(status=200,body=b'x'*500000,headers={'Access-Control-Allow-Origin':'*','content-length':'500000'})
with sync_playwright() as p:
    b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);ctx=b.new_context();pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    ctx.route('**cdn.jsdelivr.net/**',lambda r:r.fulfill(status=200,content_type='text/javascript',body=MOCK,headers={'Access-Control-Allow-Origin':'*'}))
    ctx.route('**huggingface.co/**',hf)
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    for run in range(2):
        pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="xc"]').click();pg.wait_for_timeout(4000)
        st=pg.locator('#ntts-st').inner_text() if pg.locator('#ntts-st').count() else None
        print('run',run,'status:',st,'| hf fetches so far:',hits['hf'],'| vmap:',pg.evaluate("JSON.stringify(__T.NTTS.vmap)")[:200])
        pg.reload()
    print(errs)
