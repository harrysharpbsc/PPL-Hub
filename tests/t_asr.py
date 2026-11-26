import os,re,time,sys
from playwright.sync_api import sync_playwright
import os as _o,sys as _s;_s.path.insert(0,_o.path.dirname(_o.path.abspath(__file__)));from _srv import serve;serve(8768)
WAV=os.environ.get('TALK_WAV','')
if not WAV or not os.path.exists(WAV):
    # No recording supplied: make one. 1 s quiet (the recorder measures the room first), 3 s of a voice-like warble,
    # then 4 s quiet, 16 kHz mono: a "call" for the recogniser to capture and a quiet gap to end on.
    import wave,math,random,tempfile
    WAV=os.path.join(tempfile.gettempdir(),'ppl_talk2.wav');w=wave.open(WAV,'wb');w.setnchannels(1);w.setsampwidth(2);w.setframerate(16000);fr=bytearray()
    for i in range(16000*8):
        t=i/16000;a=(0.35*(1+math.sin(2*math.pi*3*t))*math.sin(2*math.pi*(160+40*math.sin(2*math.pi*5*t))*t)) if 1<=t<4 else random.uniform(-.002,.002)
        fr+=int(max(-1,min(1,a))*32767).to_bytes(2,'little',signed=True)
    w.writeframes(bytes(fr));w.close()
FAKE_TF="""export const env={};export async function pipeline(task,model,opts){self.__opts=opts;if(opts.progress_callback){opts.progress_callback({status:'progress',file:'a',loaded:5,total:10})}
return async function(audio,o){if(audio.length<20000)return{text:''};return{text:'Golf Victor Oscar ready for departure secs '+(audio.length/16000).toFixed(1)+' tok '+(o&&o.max_new_tokens)}}}"""
with sync_playwright() as p:
    b=p.chromium.launch(args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream','--use-file-for-fake-audio-capture='+WAV])
    ctx=b.new_context(viewport={'width':430,'height':1000});ctx.grant_permissions(['microphone'])
    ctx.route(re.compile(r'https://cdn\.jsdelivr\.net/npm/@huggingface/transformers.*'),lambda r:r.fulfill(status=200,body=FAKE_TF,headers={'content-type':'application/javascript','access-control-allow-origin':'*'}))
    pg=ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('http://localhost:8768/hub_test.html');pg.wait_for_timeout(300)
    pg.locator('button.nv:visible:has-text("Labs")').first.click();pg.locator('[data-id="circ"]').click()
    pg.locator('.vtog button:has-text("Speaking")').first.click();pg.wait_for_timeout(500)
    print('asr state',pg.evaluate("__T.ASR.st+' '+__T.ASR.dev"),'| kb mode',pg.evaluate("document.querySelector('.vx-kb')!=null"))
    pg.locator('[data-k="go"]').click();pg.wait_for_timeout(500)
    t0=time.time();pg.locator('#vx-rec').click();msgs=set()
    for i in range(100):
        pg.wait_for_timeout(200);m=pg.locator('#vx-msg').text_content() if pg.locator('#vx-msg').count() else ''
        msgs.add(re.sub(r'\d+s','Ns',m))
        if pg.locator('.fb').count():break
    heard=pg.evaluate("(function(l){return l&&l.length?l[l.length-1].heard:null})(__T.ses&&__T.ses.log)")
    print('marked after',round(time.time()-t0,1),'s; heard:',heard)
    print('messages:',[m for m in msgs if m])
    assert heard and 'ready for departure' in heard, 'nothing was heard from the fake microphone'
    print('settings has recogniser row:',pg.evaluate("document.querySelectorAll('[data-f=asr]').length"))
    bad=[e for e in errs if 'importScripts' not in e];print('errors',bad);assert not bad
    print('PASS')
