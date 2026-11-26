import os,re,time
from playwright.sync_api import sync_playwright
import os as _o,sys as _s;_s.path.insert(0,_o.path.dirname(_o.path.abspath(__file__)));from _srv import serve;serve(8766)
# Stand-ins for onnxruntime-web, piper-wasm and the VCTK voice, so the plumbing (download, cache, worker,
# speaker map, audio back to the page) can be tested without the real 95 MB model, which the sandbox cannot fetch.
ORT=b"""self.ort={env:{wasm:{}},Tensor:function(t,d,s){this.type=t;this.data=d;this.dims=s},
InferenceSession:{create:async function(m){if(!m||!m.length)throw new Error('empty model');return{run:async function(f){
var n=Number(f.input_lengths.data[0]),sid=f.sid?Number(f.sid.data[0]):0,a=new Float32Array(n*256);for(var i=0;i<a.length;i++)a[i]=Math.sin(i*(0.05+sid*0.001))*0.3;return{output:{data:a}}}}}}};"""
PH=b"""self.createPiperPhonemize=async function(o){if(!o.wasmBinary||!o.getPreloadedPackage())throw new Error('phonemizer files missing');
return{callMain:function(args){var t=JSON.parse(args[args.indexOf('--input')+1])[0].text;o.print(JSON.stringify({phoneme_ids:Array.from(t).map(function(c){return c.charCodeAt(0)%60})}))}}};"""
CFG=b'{"audio":{"sample_rate":22050},"espeak":{"voice":"en-gb-x-rp"},"inference":{"noise_scale":0.667,"length_scale":1,"noise_w":0.8},"speaker_id_map":{"p225":0,"p226":1,"p228":2,"p232":3,"p276":4,"p254":5,"p231":6,"p258":7,"p262":8,"p237":9}}'
def handler(route):
    u=route.request.url.split('?')[0]
    if u.endswith('ort.wasm.min.js'): b,t=ORT,'application/javascript'
    elif u.endswith('piper_phonemize.js'): b,t=PH,'application/javascript'
    elif u.endswith('piper_phonemize.wasm'): b,t=b'\0asm'+bytes(2000),'application/wasm'
    elif u.endswith('piper_phonemize.data'): b,t=bytes(50000),'application/octet-stream'
    elif u.endswith('.onnx.json'): b,t=CFG,'application/json'
    elif u.endswith('.onnx'): b,t=bytes(200000),'application/octet-stream'
    else: return route.abort()
    route.fulfill(status=200,body=b,headers={'content-type':t,'content-length':str(len(b)),'access-control-allow-origin':'*'})
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
    bad=[e for e in errs if 'importScripts' not in e];print('errors',bad)
    assert r['n']>0 and all(x[1]>0 for x in r['out']),'no audio generated'
    assert st.startswith('ready') and 'fromCache=true' in st,'second load should come from the cache: '+st
    assert not bad
    print('PASS')
