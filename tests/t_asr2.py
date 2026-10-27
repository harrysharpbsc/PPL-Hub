import os,re,time
from playwright.sync_api import sync_playwright
TF=os.environ.get('TF_DIST','tf/package/dist')
def h(route):
    u=route.request.url;print('route',u[:100])
    if u.startswith('https://huggingface.co'): return route.fulfill(status=404,body='no')
    f=TF+'/'+u.split('/')[-1].split('?')[0]
    if not os.path.exists(f): print('missing',u);return route.abort()
    route.fulfill(status=200,body=open(f,'rb').read(),headers={'content-type':'application/wasm' if f.endswith('.wasm') else 'application/javascript','access-control-allow-origin':'*'})
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context(viewport={'width':1280,'height':1000})
    ctx.route(re.compile(r'https://(cdn\.jsdelivr\.net/npm/@huggingface/transformers|huggingface\.co).*'),h)
    pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8768/hub_test.html');pg.wait_for_timeout(300)
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="circ"]').click()
    pg.locator('.vtog button:has-text("Speaking")').first.click()
    for i in range(40):
        st=pg.evaluate("__T.ASR.st+' | '+__T.ASR.err")
        if not st.startswith('loading') and not st.startswith('off'):break
        pg.wait_for_timeout(250)
    print('state:',st[:160]);print('settings rows:',pg.evaluate("document.querySelectorAll('[data-f=asr]').length"),'| status:',pg.evaluate("(document.getElementById('asr-st')||{}).textContent"))
    print('errors',[e for e in errs if 'importScripts' not in e])
