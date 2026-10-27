/* ===== Kneeboard: notes panel for the fly-and-talk labs ===== */
var KB={s:[],t:'',bg:'contact',open:false,tab:'draw',col:'ink',er:false,built:false,cur:null};
try{var kbs=JSON.parse(localStorage.getItem('ppl-kb')||'null');if(kbs){KB.bg=(kbs.bg&&kbs.bg!=='craft')?kbs.bg:'contact';KB.open=!!kbs.open;KB.tab=kbs.tab||'draw'}}catch(e){}
function kbPage(){KB.pages=KB.pages||{};return KB.pages[KB.bg]||(KB.pages[KB.bg]=[])}
function kbSave(){clearTimeout(KB.sv);KB.sv=setTimeout(function(){try{localStorage.setItem('ppl-kb',JSON.stringify({s:[],t:'',bg:KB.bg,open:KB.open,tab:KB.tab}))}catch(e){}},300)}
function kbVar(n,f){try{var v=getComputedStyle(document.documentElement).getPropertyValue(n).trim();return v||f}catch(e){return f}}
function kbCol(c){return c==='red'?'#d33a3a':c==='blue'?'#2a6fd6':kbVar('--ink','#17254a')}
var KBT={
 contact:{n:'Initial contact',rows:[['Who','station called'],['Who','your callsign'],['What','aircraft type'],['Route','from / to'],['Where','position now'],['Level','altitude, QNH'],['Want','request']]},
 transit:{n:'Zone transit',rows:[['Unit','name, freq'],['Clear','route'],['Level','limit'],['QNH',''],['Squawk',''],['Report','next freq']]},
 atis:{n:'ATIS / weather',rows:[['Info','letter'],['Rwy','in use'],['Wind',''],['Vis',''],['Cloud',''],['T / Dp',''],['QNH',''],['QFE','']]},
 lined:{n:'Lined',rows:null},
 grid:{n:'Grid',rows:null},
 blank:{n:'Blank',rows:null}};
document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('[data-kbopen]');if(t){KB.open=!KB.open;kbSave();kbSync()}});
function kbBuild(){if(KB.built)return;KB.built=true;KB.s=kbPage();
 var fab=document.createElement('button');fab.id='kb-fab';fab.className='kb-fab';fab.hidden=true;fab.setAttribute('aria-label','Open kneeboard');fab.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v3h6V3M8 11h8M8 15h6"/></svg><span>Kneeboard</span>';
 var p=document.createElement('aside');p.id='kb';p.className='kb';p.hidden=true;p.setAttribute('aria-label','Kneeboard notes');
 p.innerHTML='<div class="kb-h"><b>Kneeboard</b><div class="kb-seg" role="tablist"><button data-kbt="draw">Draw</button><button data-kbt="type">Type</button></div><button class="kb-x" data-kbx="1" aria-label="Close kneeboard">&times;</button></div>'
  +'<div class="kb-tools" id="kb-tools"><button data-kbc="ink" aria-label="Dark pen"><i style="background:var(--ink)"></i></button><button data-kbc="blue" aria-label="Blue pen"><i style="background:#2a6fd6"></i></button><button data-kbc="red" aria-label="Red pen"><i style="background:#d33a3a"></i></button><button data-kbe="1" aria-label="Eraser">Eraser</button><button data-kbu="1">Undo</button><button data-kbclr="1">Clear page</button><select id="kb-bgsel" aria-label="Template">'+Object.keys(KBT).map(function(k){return'<option value="'+k+'">'+KBT[k].n+'</option>'}).join('')+'</select></div>'
  +'<div class="kb-body"><div class="kb-wrap" id="kb-wrap"><canvas id="kb-bg"></canvas><canvas id="kb-cv"></canvas></div><textarea id="kb-txt" class="kb-txt" placeholder="Type notes: clearances, QNH, squawk, frequencies…" hidden></textarea></div>';
 document.body.appendChild(fab);document.body.appendChild(p);
 fab.addEventListener('click',function(){KB.open=true;kbSave();kbSync()});
 p.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
  if(b.dataset.kbx){KB.open=false;kbSave();kbSync();return}
  if(b.dataset.kbt){KB.tab=b.dataset.kbt;kbSave();kbUi();return}
  if(b.dataset.kbc){KB.col=b.dataset.kbc;KB.er=false;kbUi();return}
  if(b.dataset.kbe){KB.er=!KB.er;kbUi();return}
  if(b.dataset.kbu){KB.s.pop();kbSave();kbDraw();return}
  if(b.dataset.kbclr){if(KB.arm){KB.s.length=0;KB.arm=false;kbSave();kbDraw();b.textContent='Clear page'}else{KB.arm=true;b.textContent='Tap again';setTimeout(function(){KB.arm=false;b.textContent='Clear page'},2500)}return}});
 $('kb-bgsel').addEventListener('change',function(e){KB.cur=null;KB.bg=e.target.value;KB.s=kbPage();kbSave();kbBg();kbDraw()});
 try{window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(){kbBg();kbDraw()})}catch(x){}
 var ta=$('kb-txt');ta.value=KB.t;ta.addEventListener('input',function(){KB.t=ta.value;kbSave()});
 var cv=$('kb-cv');
 function pt(e){var r=cv.getBoundingClientRect();return[(e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height]}
 cv.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){}KB.cur={c:KB.col,e:KB.er,w:e.pointerType==='pen'?2.2:2.6,p:[pt(e)]};KB.s.push(KB.cur);kbDraw()});
 cv.addEventListener('pointermove',function(e){if(!KB.cur)return;e.preventDefault();var evs=e.getCoalescedEvents?e.getCoalescedEvents():[e];evs.forEach(function(x){KB.cur.p.push(pt(x))});kbSeg(KB.cur)});
 function end(){if(KB.cur){KB.cur.p=KB.cur.p.map(function(q){return[Math.round(q[0]*1000)/1000,Math.round(q[1]*1000)/1000]});KB.cur=null;kbSave()}}
 cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);cv.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse')end()});
 try{new ResizeObserver(function(){kbSize()}).observe($('kb-wrap'))}catch(x){window.addEventListener('resize',kbSize)}}
function kbSize(force){var w=$('kb-wrap');if(!w||!w.clientWidth)return;if(!force&&KB.sz===w.clientWidth+'x'+w.clientHeight)return;KB.sz=w.clientWidth+'x'+w.clientHeight;var d=window.devicePixelRatio||1;['kb-bg','kb-cv'].forEach(function(id){var c=$(id);c.width=Math.round(w.clientWidth*d);c.height=Math.round(w.clientHeight*d);c.style.width=w.clientWidth+'px';c.style.height=w.clientHeight+'px'});kbBg();kbDraw()}
function kbStroke(x,s,W,H,from){var d=window.devicePixelRatio||1;x.globalCompositeOperation=s.e?'destination-out':'source-over';x.strokeStyle=kbCol(s.c);x.lineWidth=(s.e?18:s.w)*d;x.lineCap='round';x.lineJoin='round';x.beginPath();var p=s.p,i=Math.max(0,(from||0)-1);x.moveTo(p[i][0]*W,p[i][1]*H);if(p.length===1)x.lineTo(p[0][0]*W+.1,p[0][1]*H);for(var k=i+1;k<p.length;k++)x.lineTo(p[k][0]*W,p[k][1]*H);x.stroke();x.globalCompositeOperation='source-over'}
function kbDraw(){var c=$('kb-cv');if(!c)return;var x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);KB.s.forEach(function(s){kbStroke(x,s,c.width,c.height)});KB.drawn=KB.cur?KB.cur.p.length:0}
function kbSeg(s){var c=$('kb-cv');if(!c)return;var x=c.getContext('2d');kbStroke(x,s,c.width,c.height,KB.drawn||0);KB.drawn=s.p.length}
function kbBg(){var c=$('kb-bg');if(!c)return;var x=c.getContext('2d'),W=c.width,H=c.height,d=window.devicePixelRatio||1,ln=kbVar('--line','#d9d4bf'),tx=kbVar('--ink-2','#5a6690'),t=KBT[KB.bg]||KBT.blank;
 x.clearRect(0,0,W,H);x.fillStyle=kbVar('--surface','#fff');x.fillRect(0,0,W,H);x.strokeStyle=ln;x.lineWidth=1*d;x.fillStyle=tx;x.font=(11*d)+'px system-ui,sans-serif';
 if(t.rows){var rh=H/t.rows.length;t.rows.forEach(function(r,i){var y=i*rh;if(i){x.beginPath();x.moveTo(0,y);x.lineTo(W,y);x.stroke()}x.font='700 '+(13*d)+'px system-ui,sans-serif';x.fillText(r[0],8*d,y+18*d);x.font=(10*d)+'px system-ui,sans-serif';if(r[1])x.fillText(r[1],8*d,y+32*d);for(var ly=y+rh/2;ly<y+rh-6*d;ly+=26*d){x.globalAlpha=.45;x.beginPath();x.moveTo(80*d,ly+12*d);x.lineTo(W-8*d,ly+12*d);x.stroke();x.globalAlpha=1}});x.beginPath();x.moveTo(74*d,0);x.lineTo(74*d,H);x.stroke()}
 else if(KB.bg==='lined'){for(var y=30*d;y<H;y+=28*d){x.beginPath();x.moveTo(8*d,y);x.lineTo(W-8*d,y);x.stroke()}}
 else if(KB.bg==='grid'){x.globalAlpha=.6;for(var gx=20*d;gx<W;gx+=20*d){x.beginPath();x.moveTo(gx,0);x.lineTo(gx,H);x.stroke()}for(var gy=20*d;gy<H;gy+=20*d){x.beginPath();x.moveTo(0,gy);x.lineTo(W,gy);x.stroke()}x.globalAlpha=1}}
function kbUi(){var p=$('kb');if(!p)return;p.querySelectorAll('[data-kbt]').forEach(function(b){b.classList.toggle('on',b.dataset.kbt===KB.tab)});p.querySelectorAll('[data-kbc]').forEach(function(b){b.classList.toggle('on',!KB.er&&b.dataset.kbc===KB.col)});var e=p.querySelector('[data-kbe]');if(e)e.classList.toggle('on',KB.er);
 var draw=KB.tab==='draw';$('kb-tools').hidden=!draw;$('kb-wrap').hidden=!draw;$('kb-txt').hidden=draw;$('kb-bgsel').value=KB.bg;if(draw)setTimeout(kbSize,0)}
function kbSetPage(n){if(!KBT[n]||KB.bg===n)return;KB.cur=null;KB.bg=n;KB.s=kbPage();kbSave();var sel=$('kb-bgsel');if(sel)sel.value=n;kbBg();kbDraw()}
function kbAutoPage(e,i){var q=(e.q||'')+' '+(e.cap||''),n=null;if(/transit|penetration/i.test(e.q||''))n='transit';else if(/inbound call|joining instructions|first call to .*(Approach)/i.test(e.q||'')&&i>0)n='atis';else if(i===0||/first call|Make your call to/i.test(e.q||''))n='contact';if(n)kbSetPage(n)}
function kbReset(){KB.pages={};KB.s=kbPage();KB.t='';KB.cur=null;var ta=$('kb-txt');if(ta)ta.value='';kbDraw();kbSave()}
function kbSync(){var fly=!!(ses&&ses.type==='lab'&&LABS[ses.id]&&LABS[ses.id].grp==='fly');if(KB.inFly&&!fly)kbReset();KB.inFly=fly;if(!fly&&!KB.built)return;kbBuild();var show=fly&&KB.open;$('kb-fab').hidden=!fly||KB.open;$('kb').hidden=!show;document.body.classList.toggle('kb-open',show);if(show){kbUi();setTimeout(kbSize,0)}}
