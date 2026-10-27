import os,re,time
from playwright.sync_api import sync_playwright
V='/tmp/claude-0/-home-claude/558a3edc-86fe-5e9d-8495-aab074e535e7/scratchpad/vw'
def ctype(p):return 'application/javascript' if p.endswith('.js') else 'application/wasm' if p.endswith('.wasm') else 'application/json' if p.endswith('.json') else 'application/octet-stream'
def handler(route):
    u=route.request.url
    if 'onnxruntime-web' in u: f=V+'/mock/package/dist/'+u.split('/')[-1]
    elif 'piper-wasm' in u: f=V+'/pw/package/build/'+u.split('/')[-1]
    elif u.endswith('.onnx.json'): f=V+'/mock/fake.onnx.json'
    elif u.endswith('.onnx'): f=V+'/mock/fake.onnx'
    else: return route.abort()
    b=open(f,'rb').read();route.fulfill(status=200,body=b,headers={'content-type':ctype(f),'content-length':str(len(b)),'access-control-allow-origin':'*'})
with sync_playwright() as p:
    br=p.chromium.launch();ctx=br.new_context();ctx.route(re.compile(r'https://(cdn\.jsdelivr\.net|huggingface\.co)/.*'),handler)
    pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8766/hub_test.html');pg.wait_for_timeout(400)
    pg.evaluate("nttsLoad()") if False else None
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.wait_for_timeout(200)
    ids=pg.evaluate("[].map.call(document.querySelectorAll('[data-a=lab]'),function(b){return b.dataset.id})");print('labs',ids)
    pg.locator('[data-id="xc"]').click();pg.wait_for_timeout(300)
    t0=time.time()
    for i in range(60):
        st=pg.evaluate("window.__T.NTTS.st+' '+window.__T.NTTS.prog+' '+window.__T.NTTS.eng+' '+window.__T.NTTS.err")
        if st.startswith('ready') or st.startswith('error'):break
        pg.wait_for_timeout(250)
    print('state',st,round(time.time()-t0,1),'s')
    print('msg',pg.evaluate("document.getElementById('ntts-st')&&document.getElementById('ntts-st').textContent"))
    pg.wait_for_timeout(1500)
    r=pg.evaluate("""(async()=>{const N=window.__T.NTTS;const ks=Object.keys(N.cache);const out=[];for(const k of ks.slice(0,3)){const a=await N.cache[k];out.push([k.slice(0,40),a.audio.length,a.sampling_rate])}return {n:ks.length,pend:N.pend,out,vmap:N.vmap}})()""")
    print(r)
    # reload: should come from cache
    pg.reload();pg.wait_for_timeout(300);pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="xc"]').click()
    for i in range(40):
        st=pg.evaluate("window.__T.NTTS.st+' fromCache='+window.__T.NTTS.fromCache")
        if st.startswith('ready'):break
        pg.wait_for_timeout(250)
    print('after reload',st)
    print('errors',errs)
