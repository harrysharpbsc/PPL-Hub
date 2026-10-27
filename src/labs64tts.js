/* ===== Natural UK ATC voices, generated on the device in a background worker =====
   Two engines:
   - fast (default): Piper with the VCTK British English model, one ~75 MB download, many regional UK voices, quick on tablets
   - rich: Kokoro 82M, ~330 MB, smoother voices but slower without WebGPU
   Model files are cached in IndexedDB, so they only download once per device. */
var NTTS={st:'off',err:'',prog:0,cache:{},keys:[],ctx:null,src:null,vmap:{},vn:0,queue:[],busy:0,fromCache:false,eng:''};
var NTTS_KOKORO='https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js',NTTS_KMODEL='onnx-community/Kokoro-82M-v1.0-ONNX';
var NTTS_ORT='https://cdn.jsdelivr.net/npm/onnxruntime-web@1.18.0/dist/';
var NTTS_PH='https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/';
var NTTS_PMODEL='https://huggingface.co/diffusionstudio/piper-voices/resolve/main/en/en_GB/vctk/medium/en_GB-vctk-medium.onnx';
/* station voices in order, alternating female and male, mostly neutral southern English with some regional variety */
var NV={
  piper:[['p225',1],['p226',1],['p228',1],['p232',1],['p276',1],['p254',1],['p231',1.05],['p258',1],['p262',1],['p237',1]],
  kokoro:[['bf_emma',1],['bm_george',1],['bf_isabella',1],['bm_fable',1],['bf_emma',.92],['bm_george',1.08],['bf_isabella',1.08],['bm_fable',.92]]};
function nttsEng(){return (typeof FS!=='undefined'&&FS.eng==='rich')?'kokoro':'piper'}
function nttsMsg(){var big=NTTS.eng==='kokoro'?'about 330 MB':'about 95 MB';
  return NTTS.st==='loading'?(NTTS.fromCache?'Loading UK voices from this device… ':'Downloading UK voices (first time only, '+big+'): ')+NTTS.prog+'%':
  NTTS.st==='ready'?'UK voices ready'+(NTTS.dev==='webgpu'?' (using the graphics chip)':'')+(NTTS.pend?' · preparing calls ('+NTTS.pend+' to go)':'.'):
  NTTS.st==='error'?'UK voices could not load here, so a tablet UK voice is used for now. ('+NTTS.err.slice(0,80)+')':'UK voices will load when you open a flight.'}
function nttsUi(){var e=document.getElementById('ntts-st');if(e)e.textContent=nttsMsg()}
function nttsUnlock(){try{if(!NTTS.ctx){var AC=window.AudioContext||window.webkitAudioContext;if(AC)NTTS.ctx=new AC()}if(NTTS.ctx&&NTTS.ctx.state==='suspended')NTTS.ctx.resume()}catch(e){}}
/* IndexedDB store so models only download once */
function nttsDb(){if(NTTS.dbp)return NTTS.dbp;NTTS.dbp=new Promise(function(res,rej){try{var r=indexedDB.open('ppl-tts',1);r.onupgradeneeded=function(){r.result.createObjectStore('f')};r.onsuccess=function(){res(r.result)};r.onerror=function(){rej(r.error)}}catch(e){rej(e)}});return NTTS.dbp}
function nttsGet(key){return nttsDb().then(function(db){return new Promise(function(res){try{var q=db.transaction('f').objectStore('f').get(key);q.onsuccess=function(){res(q.result||null)};q.onerror=function(){res(null)}}catch(e){res(null)}})}).catch(function(){return null})}
function nttsPut(key,buf){return nttsDb().then(function(db){return new Promise(function(res){try{var t=db.transaction('f','readwrite');t.objectStore('f').put(buf,key);t.oncomplete=function(){res(true)};t.onerror=function(){res(false)}}catch(e){res(false)}})}).catch(function(){return false})}
/* shared worker helpers: ask the page for cached files, download with progress */
var NTTS_WCOMMON=[
"let rq=0;const pend={};",
"function ask(type,key,data){return new Promise(r=>{const id=++rq;pend[id]=r;self.postMessage({type,id,key,data},data?[data]:[])})}",
"async function dl(url,onp){const res=await fetch(url);if(!res.ok)throw new Error('download failed ('+res.status+')');const len=+res.headers.get('content-length')||0;",
" if(!res.body||!len||!onp)return await res.arrayBuffer();const rd=res.body.getReader();const parts=[];let off=0;for(;;){const {done,value}=await rd.read();if(done)break;parts.push(value);off+=value.length;onp(off,len)}",
" const out=new Uint8Array(off);let o=0;for(const c of parts){out.set(c,o);o+=c.length}return out.buffer}",
"async function cached(url,onp){const hit=await ask('cget',url);if(hit){self.postMessage({type:'cached'});return hit}const buf=await dl(url,onp);ask('cput',url,buf.slice(0));return buf}"
].join('\n');
var NTTS_WPIPER=NTTS_WCOMMON+'\n'+[
"importScripts('ORT'+'ort.wasm.min.js','PH'+'piper_phonemize.js');",
"let sess=null,ph=null,cfg=null,last=null;",
"self.onmessage=async(e)=>{const m=e.data;if(m.type==='cres'){const r=pend[m.id];delete pend[m.id];if(r)r(m.data||null);return}",
" if(m.type==='load'){try{",
"  ort.env.wasm.wasmPaths='ORT';ort.env.wasm.numThreads=self.crossOriginIsolated?Math.min(4,navigator.hardwareConcurrency||1):1;",
"  const sizes={m:0,d:0},got={m:0,d:0};let lastp=-1;const tick=()=>{const t=(sizes.m||76e6)+(sizes.d||18e6);const p=Math.min(99,Math.round((got.m+got.d)/t*100));if(p!==lastp){lastp=p;self.postMessage({type:'prog',v:p})}};",
"  const [js,model,wasm,data]=await Promise.all([cached('MODEL.json'),cached('MODEL',(o,l)=>{got.m=o;sizes.m=l;tick()}),cached('PH'+'piper_phonemize.wasm'),cached('PH'+'piper_phonemize.data',(o,l)=>{got.d=o;sizes.d=l;tick()})]);",
"  cfg=JSON.parse(new TextDecoder().decode(js));",
"  ph=await createPiperPhonemize({print:l=>{last=l},printErr:()=>{},wasmBinary:wasm,getPreloadedPackage:()=>data,locateFile:f=>'PH'+f});",
"  sess=await ort.InferenceSession.create(new Uint8Array(model),{executionProviders:['wasm'],graphOptimizationLevel:'all'});",
"  self.postMessage({type:'ready',dev:'wasm'})}catch(err){self.postMessage({type:'error',msg:String(err&&err.message||err)})}}",
" else if(m.type==='gen'){try{last=null;ph.callMain(['-l',(cfg.espeak&&cfg.espeak.voice)||'en-gb-x-rp','--input',JSON.stringify([{text:m.text}]),'--espeak_data','/espeak-ng-data']);",
"  const ids=JSON.parse(last).phoneme_ids;const inf=cfg.inference||{};const map=cfg.speaker_id_map||{};const n=Object.keys(map).length;",
"  const feeds={input:new ort.Tensor('int64',BigInt64Array.from(ids.map(BigInt)),[1,ids.length]),input_lengths:new ort.Tensor('int64',BigInt64Array.from([BigInt(ids.length)]),[1]),",
"   scales:new ort.Tensor('float32',Float32Array.from([inf.noise_scale??0.667,(inf.length_scale??1)/(m.speed||1),inf.noise_w??0.8]),[3])};",
"  if(n){const sid=(m.voice in map)?map[m.voice]:((m.alt||0)%n);feeds.sid=new ort.Tensor('int64',BigInt64Array.from([BigInt(sid)]),[1])}",
"  const out=await sess.run(feeds);const d=new Float32Array(out.output.data);self.postMessage({type:'audio',id:m.id,data:d,sr:(cfg.audio&&cfg.audio.sample_rate)||22050},[d.buffer])}",
"  catch(err){self.postMessage({type:'gerr',id:m.id,msg:String(err&&err.message||err)})}}};"
].join('\n').split('ORT').join(NTTS_ORT).split('PH').join(NTTS_PH).split('MODEL').join(NTTS_PMODEL);
var NTTS_WKOKORO=[
"const realFetch=self.fetch.bind(self);let rq=0;const pend={};let KokoroTTS=null,tts=null;",
"function ask(type,key,data){return new Promise(r=>{const id=++rq;pend[id]=r;self.postMessage({type,id,key,data},data?[data]:[])})}",
"self.fetch=async(input,init)=>{const url=typeof input==='string'?input:(input&&input.url)||String(input);if(!/huggingface\\.co|hf\\.co/.test(url))return realFetch(input,init);",
" const hit=await ask('cget',url);if(hit){if(/\\.onnx/.test(url))self.postMessage({type:'prog',v:100,cached:true});return new Response(hit,{status:200,headers:{'content-length':String(hit.byteLength)}})}",
" const res=await realFetch(input,init);if(!res.ok)return res;const len=+res.headers.get('content-length')||0;let buf;",
" if(res.body&&len&&/\\.onnx/.test(url)){const rd=res.body.getReader();const parts=[];let off=0,last=0;for(;;){const {done,value}=await rd.read();if(done)break;parts.push(value);off+=value.length;const p=Math.min(99,Math.round(off/len*100));if(p!==last){last=p;self.postMessage({type:'prog',v:p})}}const out=new Uint8Array(off);let o2=0;for(const c of parts){out.set(c,o2);o2+=c.length}buf=out.buffer}else buf=await res.arrayBuffer();",
" ask('cput',url,buf.slice(0));return new Response(buf,{status:200,headers:{'content-length':String(buf.byteLength),'content-type':res.headers.get('content-type')||''}})};",
"self.onmessage=async(e)=>{const m=e.data;if(m.type==='cres'){const r=pend[m.id];delete pend[m.id];if(r)r(m.data||null);return}",
" if(m.type==='load'){try{KokoroTTS=(await import('KURL')).KokoroTTS;const dev=(self.navigator&&self.navigator.gpu&&await self.navigator.gpu.requestAdapter().catch(()=>null))?'webgpu':'wasm';tts=await KokoroTTS.from_pretrained('KMODEL',{dtype:'fp32',device:dev});self.postMessage({type:'ready',dev})}catch(err){self.postMessage({type:'error',msg:String(err&&err.message||err)})}}",
" else if(m.type==='gen'){try{const a=await tts.generate(m.text,{voice:m.voice,speed:m.speed||1});const d=new Float32Array(a.audio);self.postMessage({type:'audio',id:m.id,data:d,sr:a.sampling_rate},[d.buffer])}catch(err){self.postMessage({type:'gerr',id:m.id,msg:String(err&&err.message||err)})}}};"
].join('\n').replace('KURL',NTTS_KOKORO).replace('KMODEL',NTTS_KMODEL);
function nttsLoad(){var eng=nttsEng();if(NTTS.eng&&NTTS.eng!==eng)nttsReset();if(NTTS.st==='loading'||NTTS.st==='ready')return;
  NTTS.eng=eng;NTTS.st='loading';NTTS.prog=0;NTTS.err='';NTTS.wait={};NTTS.seq=0;NTTS.fromCache=false;nttsUi();
  var timer=setTimeout(function(){if(NTTS.st==='loading'&&NTTS.prog===0&&!NTTS.fromCache){NTTS.st='error';NTTS.err='no response from the download';nttsUi()}},90000);
  try{var w=new Worker(URL.createObjectURL(new Blob([eng==='kokoro'?NTTS_WKOKORO:NTTS_WPIPER],{type:'text/javascript'})));NTTS.w=w;
    w.onmessage=function(ev){var m=ev.data;if(w!==NTTS.w)return;
      if(m.type==='cget'){nttsGet(m.key).then(function(b){w.postMessage({type:'cres',id:m.id,data:b},b?[b]:[])});return}
      if(m.type==='cput'){nttsPut(m.key,m.data).then(function(){w.postMessage({type:'cres',id:m.id,data:null})});return}
      if(m.type==='cached'){NTTS.fromCache=true;nttsUi();return}
      if(m.type==='prog'){NTTS.prog=m.v;if(m.cached)NTTS.fromCache=true;nttsUi();return}
      if(m.type==='ready'){clearTimeout(timer);NTTS.st='ready';NTTS.prog=100;NTTS.dev=m.dev;nttsUi();if(NTTS.planned)nttsPrepare(NTTS.planned);nttsPump();return}
      if(m.type==='error'){clearTimeout(timer);NTTS.st='error';NTTS.err=m.msg;nttsUi();return}
      if(m.type==='audio'||m.type==='gerr'){NTTS.busy=0;var p=NTTS.wait[m.id];delete NTTS.wait[m.id];if(p){if(m.type==='audio')p.res({audio:m.data,sampling_rate:m.sr});else p.rej(new Error(m.msg))}nttsPump()}};
    w.onerror=function(ev){if(w!==NTTS.w)return;clearTimeout(timer);NTTS.st='error';NTTS.err=(ev&&ev.message)||'background voice worker failed';nttsUi()};
    w.postMessage({type:'load'})}
  catch(e){clearTimeout(timer);NTTS.st='error';NTTS.err=String(e&&e.message||e);nttsUi()}}
/* one job at a time; urgent jobs (the call being heard now) jump the queue */
function nttsPump(){if(NTTS.busy||NTTS.st!=='ready'||!NTTS.queue.length){NTTS.pend=NTTS.queue.length+(NTTS.busy?1:0);nttsUi();return}var j=NTTS.queue.shift();NTTS.busy=1;var id=++NTTS.seq;NTTS.wait[id]={res:j.res,rej:j.rej};NTTS.w.postMessage({type:'gen',id:id,text:j.text,voice:j.voice,speed:j.speed,alt:j.alt});NTTS.pend=NTTS.queue.length+1;nttsUi()}
function nttsNewFlight(){NTTS.vmap={};NTTS.vn=0;NTTS.queue.length=0}
function nttsVoice(who){var k=String(who||'ATC'),L=NV[NTTS.eng||nttsEng()];if(!NTTS.vmap[k]){NTTS.vmap[k]=L[NTTS.vn%L.length].concat([NTTS.vn]);NTTS.vn++}return NTTS.vmap[k]}
function nttsText(t){return String(t).replace(/\bniner\b/gi,'nine')}
function nttsGen(text,who,urgent){if(NTTS.st!=='ready')return null;var v=nttsVoice(who),t=nttsText(text),k=NTTS.eng+v[0]+v[1]+'|'+t;
  if(!NTTS.cache[k]){var job={text:t,voice:v[0],speed:v[1],alt:v[2]};NTTS.cache[k]=new Promise(function(res,rej){job.res=res;job.rej=rej});job.key=k;if(urgent)NTTS.queue.unshift(job);else NTTS.queue.push(job);NTTS.keys.push(k);if(NTTS.keys.length>80)delete NTTS.cache[NTTS.keys.shift()];nttsPump()}
  else if(urgent){for(var i=0;i<NTTS.queue.length;i++)if(NTTS.queue[i].key===k){NTTS.queue.unshift(NTTS.queue.splice(i,1)[0]);break}}
  return NTTS.cache[k]}
function nttsStop(){try{if(NTTS.src){NTTS.src.onended=null;NTTS.src.stop()}}catch(e){}NTTS.src=null;NTTS.tok=(NTTS.tok||0)+1}
function nttsSpeak(text,who,fallback){var p=nttsGen(text,who,true);if(!p){fallback();return}nttsStop();var tok=NTTS.tok;nttsUnlock();
  p.then(function(a){if(tok!==NTTS.tok)return;var ctx=NTTS.ctx;if(!ctx){fallback();return}var data=a.audio,buf=ctx.createBuffer(1,data.length,a.sampling_rate||24000);buf.getChannelData(0).set(data);var src=ctx.createBufferSource();src.buffer=buf;src.connect(ctx.destination);NTTS.src=src;src.start()}).catch(function(){fallback()})}
function nttsPrefetch(text,who){try{if(NTTS.st==='ready'&&text)nttsGen(text,who,false)}catch(e){}}
/* prepare every ATC message of a flight in order, so the radio never waits */
function nttsPlan(events){nttsNewFlight();NTTS.planned=events;if(NTTS.st==='ready'&&NTTS.eng===nttsEng())nttsPrepare(events);else nttsLoad()}
function nttsPrepare(events){if(!events)return;events.forEach(function(e){if(e&&e.atc)nttsPrefetch(e.atc,e.who)})}
function nttsReset(){try{NTTS.w&&NTTS.w.terminate()}catch(e){}NTTS.w=null;NTTS.st='off';NTTS.eng='';NTTS.cache={};NTTS.keys=[];NTTS.queue=[];NTTS.busy=0;NTTS.prog=0;NTTS.vmap={};NTTS.vn=0}
