import os
from playwright.sync_api import sync_playwright
MOCK="export const X=42;"
with sync_playwright() as p:
    b=p.chromium.launch();ctx=b.new_context();pg=ctx.new_page()
    ctx.route('**cdn.jsdelivr.net/**',lambda r:r.fulfill(status=200,content_type='text/javascript',body=MOCK,headers={'Access-Control-Allow-Origin':'*'}))
    pg.goto('file://'+os.getcwd()+'/hub_test.html')
    for code in ["self.postMessage('plain')","import {X} from 'https://cdn.jsdelivr.net/npm/x/y.js';self.postMessage('imp'+X)"]:
        r=pg.evaluate("""(code)=>new Promise(res=>{try{var w=new Worker(URL.createObjectURL(new Blob([code],{type:'text/javascript'})),{type:'module'});w.onmessage=e=>res('ok:'+e.data);w.onerror=e=>res('err:'+(e.message||'?'));setTimeout(()=>res('timeout'),4000)}catch(x){res('throw:'+x.message)}})""",code)
        print(r)
    r=pg.evaluate("""()=>import('https://cdn.jsdelivr.net/npm/x/y.js').then(m=>'main import ok '+m.X).catch(e=>'main import err '+e.message)""");print(r)
