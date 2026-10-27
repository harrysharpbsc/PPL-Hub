/* ===== On-device speech recognition (Moonshine) =====
   Records the whole radio call, ends it after a quiet spell (or Done), then transcribes it in a background worker.
   Model: onnx-community/moonshine-base-ONNX through transformers.js, cached by the browser after the first download. */
var ASR={st:'off',err:'',prog:0,w:null,seq:0,wait:{},dev:''};
var ASR_LIB='https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js',ASR_MODEL='onnx-community/moonshine-base-ONNX';
function asrOn(){try{return (typeof FS==='undefined'||FS.asr!=='chrome')&&window.isSecureContext&&!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia)&&typeof Worker!=='undefined'&&ASR.st!=='error'&&!ASR.blocked}catch(e){return false}}
function asrMsg(){return ASR.st==='loading'?'Downloading the speech recogniser (first time only, about 60–110 MB): '+ASR.prog+'%':ASR.st==='ready'?'Speech recogniser ready on this device'+(ASR.dev==='webgpu'?' (using the graphics chip)':'')+'.':ASR.st==='error'?'The on-device recogniser could not load, so Chrome’s recogniser is used. ('+ASR.err.slice(0,80)+')':'The speech recogniser loads when you answer by speaking.'}
function asrUi(){var e=document.getElementById('asr-st');if(e)e.textContent=asrMsg()}
var ASR_WORKER=[
"let T=null,tr=null;",
"self.onmessage=async(e)=>{const m=e.data;",
" if(m.type==='load'){try{T=await import('LIB');T.env.allowLocalModels=false;",
"  let dev='wasm';try{if(self.navigator&&self.navigator.gpu&&await self.navigator.gpu.requestAdapter())dev='webgpu'}catch(x){}",
"  const files={};let last=-1;",
"  const pc=(p)=>{if(p&&p.status==='progress'&&p.file){files[p.file]=[p.loaded||0,p.total||0];let a=0,b=0;for(const k in files){a+=files[k][0];b+=files[k][1]}const v=b?Math.min(99,Math.round(a/b*100)):0;if(v!==last){last=v;self.postMessage({type:'prog',v})}}};",
"  const dtype=dev==='webgpu'?{encoder_model:'fp32',decoder_model_merged:'q4'}:{encoder_model:'q8',decoder_model_merged:'q8'};",
"  tr=await T.pipeline('automatic-speech-recognition','MODEL',{device:dev,dtype,progress_callback:pc});",
"  try{await tr(new Float32Array(16000))}catch(x){}",
"  self.postMessage({type:'ready',dev})}catch(err){self.postMessage({type:'error',msg:String(err&&err.message||err)})}}",
" else if(m.type==='asr'){try{const secs=m.audio.length/16000;const out=await tr(m.audio,{max_new_tokens:Math.ceil(secs*8)+16});",
"  self.postMessage({type:'text',id:m.id,text:String((out&&out.text)||'').trim()})}catch(err){self.postMessage({type:'aerr',id:m.id,msg:String(err&&err.message||err)})}}};"
].join('\n').replace('LIB',ASR_LIB).replace('MODEL',ASR_MODEL);
function asrLoad(){if(ASR.st==='loading'||ASR.st==='ready'||!asrOn())return;ASR.st='loading';ASR.prog=0;asrUi();
  try{var w=new Worker(URL.createObjectURL(new Blob([ASR_WORKER],{type:'text/javascript'})));ASR.w=w;
    w.onmessage=function(ev){var m=ev.data;
      if(m.type==='prog'){ASR.prog=m.v;asrUi();return}
      if(m.type==='ready'){ASR.st='ready';ASR.dev=m.dev;asrUi();return}
      if(m.type==='error'){ASR.st='error';ASR.err=m.msg;asrUi();asrFailAll(m.msg);return}
      var p=ASR.wait[m.id];delete ASR.wait[m.id];if(p){if(m.type==='text')p.res(m.text);else p.rej(new Error(m.msg))}};
    w.onerror=function(ev){ASR.st='error';ASR.err=(ev&&ev.message)||'recogniser worker failed';asrUi();asrFailAll(ASR.err)};
    w.postMessage({type:'load'})}catch(e){ASR.st='error';ASR.err=String(e&&e.message||e);asrUi()}}
function asrFailAll(msg){for(var k in ASR.wait){ASR.wait[k].rej(new Error(msg));delete ASR.wait[k]}}
/* waits for the model if it is still downloading */
function asrRun(audio){return new Promise(function(res,rej){function go(){if(ASR.st==='ready'){var id=++ASR.seq;ASR.wait[id]={res:res,rej:rej};ASR.w.postMessage({type:'asr',id:id,audio:audio},[audio.buffer])}else if(ASR.st==='error')rej(new Error(ASR.err));else setTimeout(go,300)}asrLoad();go()})}
/* record one call: speech detection by level, a quiet spell (vHold) ends it */
function asrRec(s,o){var L={kind:'asr',done:false,chunks:[],len:0,t0:Date.now(),last:0,said:false,floor:0,fl:[],timer:null};s.rec=L;s.vtext='';
  function msg(t){var m=$('vx-msg');if(m)m.textContent=t}
  var btn=$('vx-rec');if(btn)btn.textContent='Done';
  msg(o.hold?'Speak now. Take your time; pause for '+(o.hold/1000)+'s or tap Done when you have finished.':'Speak now. Tap Done when you have finished.');
  L.cancel=function(){if(L.done)return;L.done=true;clean()};
  L.finish=function(user){if(L.done)return;L.done=true;clean();var sr=L.sr||16000;
    if(!L.said&&!user){s.rec=null;s.vmsg='No speech heard. Tap Speak and try again closer to the microphone.';msg(s.vmsg);var b0=$('vx-rec');if(b0)b0.textContent='Speak';return}
    var all=new Float32Array(L.len),off=0;L.chunks.forEach(function(c){all.set(c,off);off+=c.length});
    /* trim leading quiet, keeping a short lead-in */
    var st=Math.max(0,(L.first||0)-Math.round(sr*.35)),en=Math.min(all.length,(L.end||all.length)+Math.round(sr*.6)),pcm=all.subarray(st,Math.max(en,st+1));
    var a16=sr===16000?new Float32Array(pcm):asrResample(pcm,sr,16000);
    var b=$('vx-rec');if(b){b.textContent='Working…';b.disabled=true}
    msg(ASR.st==='ready'?'Working out what you said…':'Working out what you said (the recogniser is still loading)…');
    asrRun(a16).then(function(t){s.rec=null;s.vtext=t;var ta=$('vx-txt');if(ta)ta.value=t;
      if(!t){s.vmsg='Nothing recognised. Try again, or type your call.';render();return}
      if(ses===s&&s.cur&&!s.chk&&s.ans===null)o.done(t);else render()},
     function(err){s.rec=null;s.vmsg='The on-device recogniser failed ('+String(err&&err.message||err).slice(0,60)+'). Tap Speak to use Chrome’s recogniser.';ASR.blocked=true;render()})};
  function clean(){clearTimeout(L.timer);try{L.proc&&(L.proc.onaudioprocess=null);L.proc&&L.proc.disconnect();L.src&&L.src.disconnect()}catch(x){}try{L.stream&&L.stream.getTracks().forEach(function(t){t.stop()})}catch(x){}try{L.ctx&&L.ctx.close()}catch(x){}}
  function tick(){if(L.done)return;var now=Date.now();
    if(L.said&&o.hold&&now-L.last>=o.hold){L.finish(false);return}
    if(!L.said&&now-L.t0>12000){L.finish(false);return}
    if(now-L.t0>60000){L.finish(false);return}
    if(L.said)msg(o.hold&&now-L.last>900?'Paused… finishing in '+Math.max(0,Math.ceil((o.hold-(now-L.last))/1000))+'s. Keep talking to carry on.':'Listening… pause or tap Done when you have finished.');
    L.timer=setTimeout(tick,200)}
  navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true,noiseSuppression:true,autoGainControl:true}}).then(function(stream){
    if(L.done){stream.getTracks().forEach(function(t){t.stop()});return}
    L.stream=stream;var AC=window.AudioContext||window.webkitAudioContext,ctx;try{ctx=new AC({sampleRate:16000})}catch(x){ctx=new AC()}
    L.ctx=ctx;L.sr=ctx.sampleRate;var src=ctx.createMediaStreamSource(stream),proc=ctx.createScriptProcessor(4096,1,1);L.src=src;L.proc=proc;
    proc.onaudioprocess=function(ev){if(L.done)return;var d=ev.inputBuffer.getChannelData(0),c=new Float32Array(d);L.chunks.push(c);L.len+=c.length;
      var sum=0;for(var i=0;i<c.length;i++)sum+=c[i]*c[i];var rms=Math.sqrt(sum/c.length),now=Date.now();
      if(now-L.t0<350){L.fl.push(rms);L.floor=L.fl.reduce(function(a,b){return a+b},0)/L.fl.length;return}
      var thr=Math.max(.012,L.floor*3);
      if(rms>thr){if(!L.said){L.said=true;L.first=L.len-c.length}L.last=now;L.end=L.len}
      else if(!L.said)L.floor=L.floor*.95+rms*.05};
    src.connect(proc);proc.connect(ctx.destination);L.timer=setTimeout(tick,200)
  }).catch(function(err){L.done=true;s.rec=null;var n=err&&err.name;
    if(n==='NotAllowedError'||n==='SecurityError'){s.vmsg='The microphone is blocked for this page. Allow it in Chrome’s site settings, or use the microphone on your keyboard.';VOICE.kb=true;try{localStorage.setItem('ppl-voice-kb','1')}catch(x){}}
    else s.vmsg='Could not start the microphone ('+(n||'error')+'). Type your call instead.';render()})}
function asrResample(x,from,to){var r=from/to,n=Math.floor(x.length/r),y=new Float32Array(n);for(var i=0;i<n;i++){var p=i*r,j=Math.floor(p),f=p-j;y[i]=(x[j]||0)*(1-f)+(x[j+1]||0)*f}return y}
