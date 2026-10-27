/* ===== LABS: framework ===== */
var RND={};var LABS={},LABLIST=[],QGEN={};
function addLab(o){LABS[o.id]=o;LABLIST.push(o)}
function labStat(id){var x=S.lab&&S.lab[id];return x&&x.n?x.n+' run'+(x.n>1?'s':'')+' · best '+x.best+'%'+(x.d===today()?' · done today':''):'Not tried'}
function labLog(id,pct){S.lab=S.lab||{};var x=S.lab[id]||(S.lab[id]={n:0,best:0,last:0});x.n++;x.last=pct;x.d=today();if(pct>x.best)x.best=pct;S.days[today()]=(S.days[today()]||0)+1;save()}
function labHead(t,sub){return'<div class="fhead"><button class="xb" data-a="end">'+IC.x+'<span>End</span></button><div class="ltitle"><b>'+esc(t)+'</b>'+(sub?'<span class="m">'+esc(sub)+'</span>':'')+'</div></div>'}
function startLab(id){var L=LABS[id];if(!L)return;stopTimer();ses={type:'lab',id:id,topic:null};L.init(ses);render();try{window.scrollTo(0,0)}catch(e){}}
function labOn(d){if(!ses||ses.type!=='lab')return;var L=LABS[ses.id];L.on(ses,d.k,d.v,d)}
function acG(id,x,y,h,col){return'<g id="'+id+'" transform="translate('+x.toFixed(1)+' '+y.toFixed(1)+') rotate('+h.toFixed(0)+')"><path d="M0 -10.2L1.15 -9.9L1.7 -8.2L1.75 -5.6L10.1 -5.1L10.4 -4.3L10.3 -2.3L1.7 -1.9L1.45 5.2L1 7.1L4.7 7.4L4.9 8L4.8 9.4L0.6 9.6L0 10.4L-0.6 9.6L-4.8 9.4L-4.9 8L-4.7 7.4L-1 7.1L-1.45 5.2L-1.7 -1.9L-10.3 -2.3L-10.4 -4.3L-10.1 -5.1L-1.75 -5.6L-1.7 -8.2L-1.15 -9.9ZM-3.4 -10.9H3.4V-10.4H-3.4Z" fill="'+(col||'var(--accent)')+'" stroke="var(--surface)" stroke-width="1"/></g>'}
var MSEED=7,MCACHE={};
function rngf(seed){var a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function smoothPts(P,closed){var d='',n=P.length,m=function(a,b){return[(a[0]+b[0])/2,(a[1]+b[1])/2]};if(closed){var s0=m(P[0],P[1]);d='M'+s0[0].toFixed(1)+' '+s0[1].toFixed(1);for(var i=1;i<=n;i++){var c=P[i%n],e=m(P[i%n],P[(i+1)%n]);d+='Q'+c[0].toFixed(1)+' '+c[1].toFixed(1)+' '+e[0].toFixed(1)+' '+e[1].toFixed(1)}return d+'Z'}
  d='M'+P[0][0].toFixed(1)+' '+P[0][1].toFixed(1);for(var k=1;k<n-1;k++){var e2=m(P[k],P[k+1]);d+='Q'+P[k][0].toFixed(1)+' '+P[k][1].toFixed(1)+' '+e2[0].toFixed(1)+' '+e2[1].toFixed(1)}return d+'L'+P[n-1][0].toFixed(1)+' '+P[n-1][1].toFixed(1)}
function blobP(r,cx,cy,rx,ry,n,j){var P=[];for(var i=0;i<n;i++){var a=Math.PI*2*i/n,k=1+(r()-.5)*j;P.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k])}return P}
function wigP(r,x1,y1,x2,y2,n,amp){var P=[[x1,y1]],dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,px=-dy/L,py=dx/L,i;for(i=1;i<n;i++){var t=i/n,o=(r()-.5)*2*amp;P.push([x1+dx*t+px*o,y1+dy*t+py*o])}P.push([x2,y2]);return P}
function edgePt(r,side){return side===0?[r()*400,0]:side===1?[400,r()*300]:side===2?[r()*400,300]:[0,r()*300]}
var TOWNN=['Aldby','Brixton Green','Coldham','Eastwick','Hartlow','Marsden','Netherby','Oakham Cross','Pellham','Stowe End','Thaxby','Wendover Vale'];
var TCACHE={};function chartTerrain(sd){if(TCACHE[sd])return TCACHE[sd];var r=rngf(sd*7919+13),h='',i,P,e;
 h+='<rect width="400" height="300" class="ch-land"/>';
 h+='<path class="ch-l1" d="'+smoothPts(blobP(r,200,150,300,210,12,.45),1)+'"/>';
 var hills=[];for(i=0;i<2+Math.floor(r()*2);i++){var hx=30+r()*340,hy=30+r()*240;hills.push([hx,hy]);h+='<path class="ch-l2" d="'+smoothPts(blobP(r,hx,hy,60+r()*60,40+r()*40,9,.6),1)+'"/>';h+='<path class="ch-l3" d="'+smoothPts(blobP(r,hx+(r()-.5)*20,hy+(r()-.5)*14,26+r()*24,18+r()*18,8,.6),1)+'"/>';h+='<path class="ch-ct" d="'+smoothPts(blobP(r,hx,hy,44+r()*30,30+r()*20,9,.5),1)+'"/>'}
 for(i=0;i<4;i++)h+='<path class="ch-wd" d="'+smoothPts(blobP(r,20+r()*360,20+r()*260,14+r()*22,9+r()*14,8,.7),1)+'"/>';
 var lx=40+r()*320,ly=40+r()*220;h+='<path class="ch-wt" d="'+smoothPts(blobP(r,lx,ly,12+r()*14,7+r()*8,8,.5),1)+'"/>';
 var s1=Math.floor(r()*4),a1=edgePt(r,s1),b1=edgePt(r,(s1+2)%4);h+='<path class="ch-rv" d="'+smoothPts(wigP(r,a1[0],a1[1],b1[0],b1[1],7,30),0)+'"/>';
 var mid=[(a1[0]+b1[0])/2+(r()-.5)*60,(a1[1]+b1[1])/2+(r()-.5)*60],t1=edgePt(r,(s1+1)%4);h+='<path class="ch-rv" d="'+smoothPts(wigP(r,t1[0],t1[1],mid[0],mid[1],5,18),0)+'"/>';
 var towns=[],tn=shuffle(TOWNN.slice());for(i=0;i<4;i++){var tx=30+r()*340,ty=30+r()*240;towns.push([tx,ty]);}
 var sr=Math.floor(r()*4),ra=edgePt(r,sr),rb=edgePt(r,(sr+2)%4);
 h+='<path class="ch-rd" d="'+smoothPts([ra].concat(wigP(r,ra[0],ra[1],towns[0][0],towns[0][1],4,16).slice(1)).concat(wigP(r,towns[0][0],towns[0][1],towns[1][0],towns[1][1],4,16).slice(1)).concat(wigP(r,towns[1][0],towns[1][1],rb[0],rb[1],4,16).slice(1)),0)+'"/>';
 var ma=edgePt(r,(sr+1)%4),mb=edgePt(r,(sr+3)%4);h+='<path class="ch-mw" d="'+smoothPts(wigP(r,ma[0],ma[1],mb[0],mb[1],6,22),0)+'"/>';
 var ka=edgePt(r,sr),kb=edgePt(r,(sr+2)%4);h+='<path class="ch-rl" d="'+smoothPts(wigP(r,ka[0],ka[1],towns[2][0],towns[2][1],4,14).concat(wigP(r,towns[2][0],towns[2][1],kb[0],kb[1],4,14).slice(1)),0)+'"/>';
 towns.forEach(function(t,k){h+='<path class="ch-tn" d="'+smoothPts(blobP(r,t[0],t[1],7+r()*7,5+r()*5,7,.7),1)+'"/><text x="'+(t[0]).toFixed(0)+'" y="'+(t[1]+16).toFixed(0)+'" text-anchor="middle" class="ch-tl">'+tn[k]+'</text>'});
 hills.forEach(function(p){h+='<path class="ch-sp" d="M'+p[0].toFixed(0)+' '+(p[1]-3).toFixed(0)+'l3 6h-6z"/><text x="'+(p[0]+5).toFixed(0)+'" y="'+(p[1]+4).toFixed(0)+'" class="ch-tl">'+(Math.round((600+r()*900)/10)*10)+'</text>'});
 for(i=0;i<4;i++){var ox=20+r()*360,oy=20+r()*260;h+='<path class="ch-ob" d="M'+ox.toFixed(0)+' '+(oy-5).toFixed(0)+'l3 8h-6zM'+ox.toFixed(0)+' '+(oy+3).toFixed(0)+'v3"/><text x="'+(ox+5).toFixed(0)+'" y="'+(oy+3).toFixed(0)+'" class="ch-tl" font-style="italic">'+Math.round((300+r()*700)/10)*10+'</text>'}
 var ks=Object.keys(TCACHE);if(ks.length>40)TCACHE={};TCACHE[sd]=h;return h}
function chartFill(w,h,sd){var k=Math.max(w/400,h/300);return'<g transform="scale('+k.toFixed(4)+')">'+chartTerrain(sd||1+Math.floor(Math.random()*99999))+'</g>'}
function chartPaper(w,h){var g='',t='',i;for(i=20;i<w;i+=20)g+='M'+i+' 0V'+h;for(i=20;i<h;i+=20)g+='M0 '+i+'H'+w;for(i=0;i<=w;i+=10){var L=i%50===0?6:3;t+='M'+i+' 0v'+L+'M'+i+' '+h+'v-'+L}for(i=0;i<=h;i+=10){var L2=i%50===0?6:3;t+='M0 '+i+'h'+L2+'M'+w+' '+i+'h-'+L2}return'<path class="ch-pg" d="'+g+'"/><path class="ch-tk" d="'+t+'"/>'}
function chartSide(w,h,gy){var r=rngf(Math.floor(Math.random()*99999)),P=[[0,gy]],x;for(x=0;x<=w;x+=w/8)P.push([x,gy-4-r()*14]);P.push([w,gy]);var d=smoothPts(P,0)+'L'+w+' '+h+'L0 '+h+'Z',P2=[[0,gy+6]];for(x=0;x<=w;x+=w/6)P2.push([x,gy+2-r()*8]);P2.push([w,gy+6]);var d2=smoothPts(P2,0)+'L'+w+' '+h+'L0 '+h+'Z';
 return'<defs><linearGradient id="ch-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="ch-sk1"/><stop offset="1" class="ch-sk2"/></linearGradient></defs><rect width="'+w+'" height="'+h+'" fill="url(#ch-sky)"/><path d="'+d+'" class="ch-l2"/><path d="'+d2+'" class="ch-l1"/><path d="'+smoothPts(P,0)+'" class="ch-ct"/>'}
function mapBase(){var sd=MSEED;if(MCACHE.s===sd)return MCACHE.h;var h='<defs><pattern id="ch-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V6" class="ch-ht"/></pattern></defs>'+chartTerrain(sd),i,j;
 var g='';for(i=50;i<400;i+=50)g+='<path d="M'+i+' 0V300"/>';for(var j=50;j<300;j+=50)g+='<path d="M0 '+j+'H400"/>';
 var tk='';for(i=0;i<=400;i+=10){var L=i%50===0?7:3;tk+='M'+i+' 0v'+L+'M'+i+' 300v-'+L}for(j=0;j<=300;j+=10){var L2=j%50===0?7:3;tk+='M0 '+j+'h'+L2+'M400 '+j+'h-'+L2}
 h+='<g class="lm-grid">'+g+'</g><path class="ch-tk" d="'+tk+'"/><rect x=".5" y=".5" width="399" height="299" class="ch-fr"/>';
 h+='<g transform="translate(296 276)"><path class="ch-sb" d="M0 0H50M0 -3V3M50 -3V3M25 -2V2"/><text x="0" y="-6" class="ch-tl">0</text><text x="50" y="-6" text-anchor="end" class="ch-tl">5 NM</text></g>';
 h+='<text x="394" y="294" text-anchor="end" class="lm-sc">grid squares = 5 NM</text><g class="lm-n" transform="translate(22 28)"><path d="M0-14L5 6L0 2L-5 6Z"/><text y="22" text-anchor="middle">N</text></g>';
 MCACHE={s:sd,h:h};return h}
function airShape(a){return a.t==='c'?'<circle cx="'+a.x+'" cy="'+a.y+'" r="'+a.r+'" class="as as-'+a.k+'"/>':'<rect x="'+a.x+'" y="'+a.y+'" width="'+a.w+'" height="'+a.h+'" class="as as-'+a.k+'"/>'}
function airLabel(a){var cx=a.t==='c'?a.x:a.x+a.w/2,cy=a.t==='c'?a.y:a.y+a.h/2,r=(a.fl?a.fl+(a.ce<99999?' to '+a.ce:'+'):'SFC to '+a.ce)+' ft';return'<text x="'+cx+'" y="'+(cy-3)+'" text-anchor="middle" class="lm-t">'+esc(a.n)+'</text><text x="'+cx+'" y="'+(cy+10)+'" text-anchor="middle" class="lm-t2">'+r+'</text>'}
function inAir(a,x,y){return a.t==='c'?Math.hypot(x-a.x,y-a.y)<a.r:(x>a.x&&x<a.x+a.w&&y>a.y&&y<a.y+a.h)}
function mkPath(p){var c=[0],i;for(i=1;i<p.length;i++)c.push(c[i-1]+Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]));
  return{len:c[c.length-1],at:function(d){d=Math.max(0,Math.min(d,c[c.length-1]));for(var k=1;k<p.length;k++)if(d<=c[k]||k===p.length-1){var t=(d-c[k-1])/((c[k]-c[k-1])||1),dx=p[k][0]-p[k-1][0],dy=p[k][1]-p[k-1][1];return{x:p[k-1][0]+dx*t,y:p[k-1][1]+dy*t,h:(Math.atan2(dx,-dy)*180/Math.PI+360)%360,seg:k-1}}}}}
function vLabs(){
  var G={fly:'Fly and talk',look:'Look and decide',calc:'Plan and calculate',game:'Games and challenges'};
  var out='<div class="head"><div><h1 class="h1">Labs</h1><p class="lede">Hands-on practice. Maps and aircraft here are fictional but realistic, so nothing replaces a current chart, but the skills transfer.</p></div></div>';
  ['fly','look','calc','game'].forEach(function(g){var L=LABLIST.filter(function(x){return x.grp===g});if(!L.length)return;
    out+='<h2 class="sec-t">'+G[g]+'</h2><div class="card">'+L.map(function(x){return'<button class="pick" data-a="lab" data-id="'+x.id+'"><span><b>'+esc(x.name)+'</b><br><span class="m" style="font-family:var(--f-body);font-size:.84rem">'+esc(x.sub)+'</span></span><span class="m">'+labStat(x.id)+'</span></button>'}).join('')+'</div>'});
  return out}
function labSummary(s,title,items,pct,again){
  return labHead(title)+'<div class="card sum"><p class="m">Finished</p><p class="score">'+pct+'%</p><ul>'+items.map(function(r){return'<li>'+(r.ok?'<span class="chip ok">Right</span> ':'<span class="chip no">Review</span> ')+esc(r.t)+(r.n?'<br><span class="m">'+r.n+'</span>':'')+'</li>'}).join('')+'</ul><div class="acts"><button class="btn" data-a="lx" data-k="again">Fly again</button><button class="btn alt" data-a="end">Done</button></div></div>'}

/* ===== voice answer mode for fly-and-talk labs ===== */
var VOICE={on:false,kb:false};try{VOICE.on=localStorage.getItem('ppl-voice')==='1';VOICE.kb=localStorage.getItem('ppl-voice-kb')==='1'}catch(e){}
function vKb(){return VOICE.kb||!srOk()}
document.addEventListener('keydown',function(e){var t=e.target;if(t&&t.id==='vx-txt'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();labOn({k:'r',v:t.value,f:'vt'});labOn({k:'vchk'})}});
var FS={pace:'fast',auto:'on',hide:'off',voices:'varied',kbAuto:'on',nq:'best',eng:'fast',hold:'normal'};try{var fs0=JSON.parse(localStorage.getItem('ppl-fs')||'null');if(fs0)for(var fk in fs0)FS[fk]=fs0[fk]}catch(e){}
FS.voices='natural';
function fsSave(){try{localStorage.setItem('ppl-fs',JSON.stringify(FS))}catch(e){}}
try{if(window.speechSynthesis){speechSynthesis.getVoices();speechSynthesis.onvoiceschanged=function(){}}}catch(e){}
function atcVoices(){try{var v=window.speechSynthesis.getVoices()||[];return v.filter(function(x){return/^en[-_]GB/i.test(x.lang)||/United Kingdom|UK English|British/i.test(x.name)})}catch(e){return[]}}
function hashS(t){var h=7;for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))|0;return Math.abs(h)}
function vGender(x){var n=(x.name||'')+' '+(x.voiceURI||'');if(/female|woman|gba|gbc|-f\b|#female/i.test(n))return'f';if(/\bmale|\bman\b|gbb|gbd|-m\b|#male/i.test(n))return'm';return''}
function speakAtc(t,who,noNat){if(!noNat&&FS.voices==='natural'&&typeof NTTS!=='undefined'&&NTTS.st==='ready'){try{window.speechSynthesis.cancel()}catch(e){}nttsSpeak(t,who,function(){speakAtc(t,who,true)});return}try{if(typeof nttsStop==='function')nttsStop()}catch(e){}try{if(!ttsOk())return;window.speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(speakable(t)),gb=atcVoices(),key=String(who||'ATC'),h=hashS(key),varied=FS.voices!=='single',g=varied?(h%2?'m':'f'):'f',v=null;
  if(gb.length){if(varied){var same=gb.filter(function(x){return vGender(x)===g});var pool=same.length?same:gb;v=pool[Math.floor(h/2)%pool.length]}else v=gb[0]}
  if(v){u.voice=v;u.lang=v.lang}else u.lang='en-GB';
  var known=v&&vGender(v);u.pitch=!varied?1:(known?(.95+(h%4)*.04):(g==='m'?.78+(h%3)*.04:1.12+(h%3)*.05));u.rate=varied?.97+(h%4)*.03:1.02;window.speechSynthesis.speak(u)}catch(e){}}
function vCall(e){return e.kind==='build'||/reply|readback/i.test(e.q||'')}
function srOk(){try{return!!(window.SpeechRecognition||window.webkitSpeechRecognition)}catch(e){return false}}
var VNUM=['zero','one','two','three','four','five','six','seven','eight','nine'];
var VSTOP={from:1,the:1,of:1,a:1,an:1,to:1,and:1,is:1,at:1,on:1,with:1,this:1,uh:1,um:1,er:1};
var VSYN={niner:'nine',tree:'three',fife:'five',fower:'four',wilko:'wilco',willco:'wilco',alfa:'alpha',xray:'x',juliett:'juliet',decimel:'decimal',point:'decimal',dot:'decimal',foot:'feet',ft:'feet',kt:'knots',kts:'knots',knot:'knots',nm:'miles',mile:'miles',hpa:'',hectopascals:'',okay:'roger',southeast:'south east',southwest:'south west',northeast:'north east',northwest:'north west',panpan:'pan pan',maydaymayday:'mayday mayday',transiting:'transit',going:'go',qna:'qnh',qnhs:'qnh',kunh:'qnh',vfrs:'vfr',vfa:'vfr',fr:'fr',requested:'request',requests:'request',information:'information',info:'information',feets:'feet',victor:'victor',requesting:'request',thousands:'thousand',hundreds:'hundred',sqawk:'squawk',squark:'squawk',kew:'q',queue:'q'};
var VACRO={vfr:1,ifr:1,svfr:1,qnh:1,qfe:1,atz:1,matz:1,cta:1,ctr:1,atis:1,dr:1,pa:1,fis:1,afis:1,lars:1,rps:1};
var VLET={a:'alpha',b:'bravo',c:'charlie',d:'delta',e:'echo',f:'foxtrot',g:'golf',h:'hotel',i:'india',j:'juliet',k:'kilo',l:'lima',m:'mike',n:'november',o:'oscar',p:'papa',q:'quebec',r:'romeo',s:'sierra',t:'tango',u:'uniform',v:'victor',w:'whiskey',x:'xray',y:'yankee',z:'zulu'};
function vDigits(s){return s.split('').map(function(c){return VNUM[+c]}).join(' ')}
function vThou(n){var t=Math.floor(n/1000),h=Math.floor((n%1000)/100),o='';if(t)o+=(t<10?VNUM[t]:vDigits(String(t)))+' thousand';if(h)o+=' '+VNUM[h]+' hundred';return o}
function vnorm(t,said){t=String(t||'').toLowerCase().replace(/&[a-z]+;/g,' ').replace(/['’]/g,'');
  t=t.replace(/(\d),(\d{3})/g,'$1$2').replace(/(\d+)\.(\d+)/g,function(m,a,b){return' '+vDigits(a)+' decimal '+vDigits(b)+' '});
  t=t.replace(/\d+/g,function(m){var n=+m,w=vDigits(m);if(said&&m.length>=3&&n>0&&n%100===0)w+=' '+vThou(n);return' '+w+' '});
  t=t.replace(/\bg-([a-z]{2,4})\b/g,function(m,a){return'golf '+a.split('').join(' ')}).replace(/x-ray/g,'xray').replace(/[-\/]/g,' ').replace(/[^a-z ]/g,' ');
  var raw=[];t.split(/\s+/).forEach(function(w){if(!w)return;var m=VSYN[w];if(m!==undefined)w=m;if(!w)return;w.split(' ').forEach(function(x){if(x)raw.push(x)})});
  var out=[],i=0;while(i<raw.length){if(raw[i].length===1){var j=i,acc='';while(j<raw.length&&raw[j].length===1){acc+=raw[j];j++}var hit=null;for(var e=j;e>i+1;e--){var jn=raw.slice(i,e).join('');if(VACRO[jn]||jn==='qh'||jn==='qn'){hit=e;break}}if(hit){var jw=raw.slice(i,hit).join('');out.push(jw==='qh'||jw==='qn'?'qnh':jw);i=hit;continue}var x=raw[i];if(VLET[x])x=VLET[x];if(x==='x')x='xray';if(!VSTOP[x])out.push(x);i++;continue}var y=raw[i];if(!VSTOP[y])out.push(y);i++}return out}
function vLev(a,b){if(Math.abs(a.length-b.length)>2)return 9;var d=[],i,j;for(i=0;i<=a.length;i++){d[i]=[i]}for(j=0;j<=b.length;j++)d[0][j]=j;for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
function vKey(w){w=w.replace(/ph/g,'f').replace(/ck/g,'k').replace(/[cq]/g,'k').replace(/x/g,'ks').replace(/z/g,'s').replace(/([^aeiou])h/g,'$1').replace(/y$/,'i');var f=/[aeiouy]/.test(w[0])?'a':w[0];return f+w.slice(1).replace(/[aeiouyhw]/g,'').replace(/(.)\1+/g,'$1')}
function vEq(a,b){if(a===b)return true;if(VDIG[a]||VDIG[b])return false;if(a.length>=4&&b.length>=4){var ka=vKey(a),kb=vKey(b);if(ka===kb)return true;if(ka.length>=3&&kb.length>=3&&ka.slice(0,2)===kb.slice(0,2)&&vLev(ka,kb)<=1)return true}var L=Math.min(a.length,b.length);if(L>=5&&vLev(a,b)<=1)return true;if(L>=7&&vLev(a,b)<=2)return true;if(L>=6&&a.slice(0,6)===b.slice(0,6))return true;return false}
function vLcs(a,b){var m=a.length,n=b.length,prev=new Array(n+1).fill(0),cur;for(var i=1;i<=m;i++){cur=[0];for(var j=1;j<=n;j++)cur[j]=vEq(a[i-1],b[j-1])?prev[j-1]+1:Math.max(prev[j],cur[j-1]);prev=cur}return prev[n]}
var VDIG={zero:1,one:1,two:1,three:1,four:1,five:1,six:1,seven:1,eight:1,nine:1,decimal:1};
function vRuns(p){var runs=[],r=[];p.forEach(function(w,i){if(VDIG[w]&&!(p[i+1]==='thousand'||p[i+1]==='hundred'||p[i-1]==='thousand'))r.push(w);else{if(r.length>=3)runs.push(r);r=[]}});if(r.length>=3)runs.push(r);return runs}
function vHasRun(toks,run){outer:for(var i=0;i+run.length<=toks.length;i++){for(var j=0;j<run.length;j++)if(toks[i+j]!==run[j])continue outer;return true}return false}
function vCov(piece,bag,toks){var p=vnorm(piece);if(!p.length)return 1;var c=toks?vLcs(p,toks)/p.length:p.filter(function(w){return bag[w]}).length/p.length;if(toks&&vRuns(p).some(function(r){return!vHasRun(toks,r)}))c=Math.min(c,.5);return c}
function vBag(toks){var b={};toks.forEach(function(w){b[w]=1});return b}
function vGradeBuild(e,text){var toks=vnorm(text,1),bag=vBag(toks),opt=e.opt||[],req=e.ans.filter(function(t){return opt.indexOf(t)<0});
  var SVC={approach:1,radio:1,information:1,tower:1,ground:1,zone:1},cur=0,inv=0,MAKERS={piper:1,cessna:1,robin:1,grumman:1,tecnam:1,grob:1};var parts=req.map(function(p){var fr=/\bVFR\b/.test(p),p2=fr?p.replace(/\bVFR\b/,''):p,warn=fr&&toks.indexOf('vfr')<0;var c=vCov(p2,bag,toks),pt0=vnorm(p);if(pt0.length&&MAKERS[pt0[0]]&&toks.some(function(w){return vEq(w,pt0[0])}))c=Math.max(c,.8);if(pt0.length===2&&SVC[pt0[1]]){var si=toks.indexOf(pt0[1]);if(si>0&&vKey(toks[si-1]).slice(0,2)===vKey(pt0[0]).slice(0,2))c=Math.max(c,1)}var pt=vnorm(p),f=-1,i;if(pt.length){var hitw=function(w){return pt.some(function(x){return vEq(w,x)})};for(i=cur;i<toks.length;i++)if(hitw(toks[i])){f=i;break}if(f<0){for(i=0;i<cur;i++)if(hitw(toks[i])){f=i;break}if(f>=0&&c>=.75)inv++}}if(f>=0&&f>=cur)cur=f+1;return{t:p,c:c,ok:c>=.75,pos:f,warn:warn&&c>=.75}});
  var reqBag=vBag(vnorm(req.join(' '))),bad=(e.bank||[]).filter(function(b){var bt=vnorm(b);return bt.length&&bt.every(function(w){return bag[w]&&!reqBag[w]})});
  var ok=toks.length>0&&parts.every(function(p){return p.ok})&&inv<=1&&!bad.length;
  return{ok:ok,parts:parts,inv:inv,bad:bad,heard:text}}
function vGradeMcq(e,text){var toks=vnorm(text,1),bag=vBag(toks),best=-1,bs=-1;e.opts.forEach(function(o,i){var ot=vnorm(o);if(!ot.length)return;var c=vCov(o,bag,toks),sc=c+vLcs(ot,toks)*.01;if(sc>bs){bs=sc;best=i}});var cov=best>=0?vCov(e.opts[best],bag,toks):0;return{pick:cov>=.6?best:-1,cov:cov,heard:text}}

/* ===== LABS: generic flight with radio events ===== */
function flightLab(o){
  function applyMake(){if(o.make){MSEED=1+Math.floor(Math.random()*99999);o.traffic=null;o.brief=null;var m=o.make();if(m)for(var k in m)o[k]=m[k]}PATH=mkPath(o.route);N=o.events.length}
  var PATH,N;applyMake();
  function ev(s){return o.events[s.ei]}
  function setPos(s){var p=PATH.at(s.d),a=$('lab-ac');if(a)a.setAttribute('transform','translate('+p.x.toFixed(1)+' '+p.y.toFixed(1)+') rotate('+p.h.toFixed(0)+')');var t=$('lab-trail');if(t)t.setAttribute('points',s.trail.join(' '));var c=$('lab-cap');if(c)c.textContent=o.cap?o.cap(s.d,p):'';var tf=$('lab-tf');if(tf)tf.innerHTML=tfSvg(s)}
  function tfSvg(s){var a=o.traffic?o.traffic(s.d):[];return a.map(function(q){return acG('',q[0],q[1],q[2],'var(--ink-2)')+(q[3]?'<text x="'+(q[0]+9).toFixed(0)+'" y="'+(q[1]-7).toFixed(0)+'" class="lm-t2">'+esc(q[3])+'</text>':'')}).join('')}
  function begin(s){if(typeof kbReset==='function')kbReset();s.log=[];s.go=true;s.fin=false;s.d=0;s.ei=0;s.cur=null;s.res=[];s.trail=[];s.paused=false;s.tm=setInterval(function(){tick(s)},50);s.stop=function(){clearInterval(s.tm);vStop(s)};if(ev(s).at<=0)open(s);render()}
  function open(s){var e=ev(s);s.cur=e;s.ans=null;s.built=[];s.chk=false;s.vtext='';s.vres=null;s.vmsg='';s.tries=0;s.atcShow=false;clearTimeout(s.autoT);if(FS.kbAuto==='on'&&typeof kbAutoPage==='function')kbAutoPage(e,s.ei);if(FS.voices==='natural'&&typeof nttsPrefetch==='function'){if(e.atc)nttsPrefetch(e.atc,e.who);var nx=o.events[s.ei+1];if(nx&&nx.atc)nttsPrefetch(nx.atc,nx.who)}if((VOICE.on||FS.hide==='on')&&e.atc&&ttsOk())setTimeout(function(){if(s.cur===e)speakAtc(e.atc,e.who)},250);if(e.kind==='mcq'){s.ord=shuffle(e.opts.map(function(_,i){return i}))}else{s.bank=shuffle(e.ans.concat(e.bank||[]).map(function(t,i){return{t:t,i:i}}));s.used={}}}
  function tick(s){if(!ses||ses!==s||!s.go||s.fin||s.cur)return;var e=ev(s);var pm=FS.pace==='skip'?40:FS.pace==='fast'?3:1,nd=Math.min(s.d+o.speed*.05*pm,e?e.at:PATH.len);s.d=nd;var p=PATH.at(s.d);s.trail.push(p.x.toFixed(0)+','+p.y.toFixed(0));if(s.trail.length>400)s.trail.shift();
    if(e&&s.d>=e.at-.01){s.d=e.at;open(s);render();return}
    if(!e&&s.d>=PATH.len-.01){finish(s);return}
    setPos(s)}
  function finish(s){clearInterval(s.tm);s.fin=true;if(typeof kbReset==='function')kbReset();var ok=s.res.filter(function(r){return r.ok}).length,pct=Math.round(100*ok/N);labLog(o.id,pct);render()}
  function opt(s,e,i,k){var st='';if(s.ans!==null){if(i===e.a)st=' ok';else if(i===s.ans)st=' bad'}
    return'<button class="opt'+st+'" data-a="lx" data-k="o" data-v="'+i+'"'+(s.ans!==null?' disabled':'')+'><span class="k">'+'ABCD'[k]+'</span><span>'+esc(e.opts[i])+'</span></button>'}
  function panel(s){var e=s.cur,h='<div class="card lev">';
    if(e.cap)h+='<p class="tag">'+esc(e.cap)+'</p>';
    if(e.atc){var hid=FS.hide==='on'&&!s.atcShow&&!s.chk&&s.ans===null;h+='<div class="rx"><span class="who">'+esc(e.who||'Controller')+'</span>'+(hid?'<p class="m">Listen to the call. Write down what you need on your kneeboard.</p>':'<p>&ldquo;'+esc(e.atc)+'&rdquo;</p>')+'<div class="acts" style="margin-top:8px">'+(ttsOk()?'<button class="btn sm alt" data-a="lx" data-k="say">'+(hid?'Say again':'Hear it')+'</button>':'')+(hid?'<button class="btn sm alt" data-a="lx" data-k="atcshow">Show text</button>':'')+'</div></div>'}
    h+='<p class="lq">'+esc(e.q)+'</p>';
    if(VOICE.on&&vCall(e))return h+vPanel(s,e)+'</div>';
    if(VOICE.on&&!VOICE.tmp)h+='<p class="m vx-dec">A decision, not a radio call: tap your answer.</p>';
    if(e.kind==='mcq'){h+=s.ord.map(function(i,k){return opt(s,e,i,k)}).join('');if(s.ans!==null)h+=fb(s,e,s.ans===e.a)}
    else{h+='<div class="built">'+(s.built.length?s.built.map(function(i){return'<span class="pc">'+esc(e.ans.concat(e.bank||[])[i])+'</span>'}).join(' '):'<span class="m">Tap the pieces in the order you would say them</span>')+'</div><div class="chips">'+s.bank.map(function(b){return'<button class="chipb" data-a="lx" data-k="c" data-v="'+b.i+'"'+(s.used[b.i]||s.chk?' disabled':'')+'>'+esc(b.t)+'</button>'}).join('')+'</div>';
      if(!s.chk)h+='<div class="acts"><button class="btn alt sm" data-a="lx" data-k="u"'+(s.built.length?'':' disabled')+'>Undo</button><button class="btn sm" data-a="lx" data-k="chk"'+(s.built.length?'':' disabled')+'>Transmit</button></div>';
      else{var okb=s.ans===1;h+=fb(s,e,okb,e.ans.filter(function(t){return (e.opt||[]).indexOf(t)<0}).join(', ')+((e.opt||[]).length?' (adding the station name first is also fine)':''))}}
    return h+'</div>'}
  function vPanel(s,e){var h='';
    if(!s.chk&&s.ans===null){var kb=vKb();h+='<div class="vx">'+(kb?'<p class="vx-kb">Tap the box, then the <b>microphone on your keyboard</b>, and say your call. Press Enter or Check when done.</p>':'')+'<textarea id="vx-txt" class="vx-txt" rows="3" data-a="lxr" data-f="vt" inputmode="text" autocomplete="off" enterkeyhint="send" autocapitalize="sentences" placeholder="'+(kb?'Your call appears here':'Tap Speak and say your call, or type it here')+'">'+esc(s.vtext||'')+'</textarea><p class="m vx-msg" id="vx-msg">'+esc(s.vmsg||'')+'</p><div class="acts">'+(!kb?'<button class="btn" id="vx-rec" data-a="lx" data-k="vrec">'+(s.rec?'Done':'Speak')+'</button>':'')+'<button class="btn '+(!kb?'alt':'')+'" data-a="lx" data-k="vchk">Check</button><button class="btn alt sm" data-a="lx" data-k="vshow">Show options instead</button></div>'+(kb&&srOk()?'<p class="m" style="margin-top:6px"><button class="lnk" data-a="lx" data-k="vkb">Try the Speak button instead</button></p>':!kb?'<p class="m" style="margin-top:6px"><button class="lnk" data-a="lx" data-k="vkb">Use my keyboard microphone instead</button></p>':'')+'</div>';return h}
    var r=s.vres;h+='<div class="vx-heard"><span class="m">You said</span><p>&ldquo;'+esc(r&&r.heard||'(nothing)')+'&rdquo;</p></div>';
    if(e.kind==='mcq'){var ok=s.ans===e.a;h+='<div class="vx-parts">'+e.opts.map(function(o,i){return'<div class="vx-p '+(i===e.a?'ok':i===s.ans?'no':'')+'">'+(i===e.a?'✓ ':i===s.ans?'✗ ':'')+esc(o)+'</div>'}).join('')+'</div>';return h+fb(s,e,ok,ok?'':e.opts[e.a])}
    h+='<div class="vx-parts">'+r.parts.map(function(p){return'<div class="vx-p '+(p.ok?'ok':'no')+'">'+(p.ok?'✓ ':'✗ ')+esc(p.t)+(p.warn?'<span class="m"> (VFR was not picked up: say it clearly, it matters)</span>':'')+'</div>'}).join('')+'</div>';
    if(r.inv>1)h+='<p class="m">The right pieces, but in an unusual order. Station, callsign, then the message.</p>';
    if(r.bad.length)h+='<p class="m">Leave out: '+esc(r.bad.join(', '))+'</p>';
    return h+fb(s,e,r.ok,e.ans.filter(function(t){return (e.opt||[]).indexOf(t)<0}).join(', ')+((e.opt||[]).length?' (adding the station name first is also fine)':''))}
  function briefFull(){if(!o.brief)return'';return'<div class="brief"><b>Flight brief</b><dl>'+o.brief.map(function(r){return'<dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+(r[2]?'<span class="m"> '+esc(r[2])+'</span>':'')+'</dd>'}).join('')+'</dl><p class="m">Note these on your kneeboard. You will need them for your calls.</p></div>'}
  function briefLine(){if(!o.brief)return'';return'<div class="bline">'+o.brief.map(function(r){return'<span><i>'+esc(r[0])+'</i> '+esc(r[1])+'</span>'}).join('')+'</div>'}
  function fsRow(l,f,opts){return'<div class="fsrow"><span class="m">'+l+'</span><div class="seg">'+opts.map(function(x){return'<button class="'+(FS[f]===x[0]?'on':'')+'" data-a="lx" data-k="fs" data-f="'+f+'" data-v="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div></div>'}
  function fsPanel(){return'<div class="fspanel">'+fsRow('Flying between calls','pace',[['normal','Normal'],['fast','Fast'],['skip','Skip']])+fsRow('After a correct answer','auto',[['on','Carry on'],['off','Wait for me']])+fsRow('ATC message text','hide',[['off','Show'],['on','Hide (listen)']])+fsRow('When I stop talking','hold',[['normal','Wait 3.5s'],['short','Wait 2s'],['tap','Wait for Done']])+fsRow('ATC voices','eng',[['fast','Quick (UK)'],['rich','Richer (bigger download)']])+'<p class="m" id="ntts-st">'+(typeof nttsMsg==='function'?nttsMsg():'')+'</p>'+fsRow('Kneeboard pages','kbAuto',[['on','Follow the flight'],['off','I choose']])+'</div>'}
  function vToggle(sm,s){return'<div class="vtog'+(sm?' sm':'')+'">'+(sm?'<button class="btn alt sm kb-inline" data-kbopen="1">Kneeboard</button>':'')+'<span class="m">Answer by</span><div class="seg"><button class="'+(!VOICE.on?'on':'')+'" data-a="lx" data-k="vmode"'+(!VOICE.on?' disabled':'')+'>Tapping</button><button class="'+(VOICE.on?'on':'')+'" data-a="lx" data-k="vmode"'+(VOICE.on?' disabled':'')+'>Speaking</button></div>'+(sm?'<button class="btn alt sm" data-a="lx" data-k="fsset">'+(s&&s.fsOpen?'Hide settings':'Settings')+'</button>':'')+(!sm||(s&&s.fsOpen)?fsPanel():'')+(!sm&&VOICE.on?'<p class="m" style="margin-top:6px">'+(vKb()?'You will hear ATC, then tap the answer box and use the microphone on your keyboard to say your call.':'You will hear ATC, then press Speak and say your call. If the page cannot use the microphone, you can use your keyboard microphone instead.')+'</p>':'')+'</div>'}
  function vStop(s){if(typeof nttsStop==='function')nttsStop();if(s&&s.rec){var L=s.rec;L.done=true;clearTimeout(L.timer);if(L.r){L.r.onend=null;try{L.r.abort()}catch(x){}}s.rec=null}}
  /* Listening keeps going through natural pauses: the recogniser is restarted when the browser stops it early,
     and the call only ends after a set quiet time (or when Done is tapped). */
  function vHold(){return FS.hold==='short'?2000:FS.hold==='tap'?0:3500}
  function vRec(s){if(s.rec){vRecEnd(s,true);return}var SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return;try{window.speechSynthesis&&window.speechSynthesis.cancel()}catch(x){}
    var L={base:'',run:'',user:false,done:false,t0:Date.now(),last:0,timer:null,r:null};s.rec=L;s.vtext='';
    function show(){var t=(L.base+' '+L.run).replace(/\s+/g,' ').trim();s.vtext=t;var ta=$('vx-txt');if(ta)ta.value=t;return t}
    function msg(t){var m=$('vx-msg');if(m)m.textContent=t}
    function tick(){if(L.done)return;var now=Date.now(),said=!!show(),h=vHold();
      if(said&&h&&L.last&&now-L.last>=h){vRecEnd(s,false);return}
      if(!said&&now-L.t0>12000){s.vmsg='No speech heard. Tap Speak and try again closer to the microphone.';msg(s.vmsg);vRecEnd(s,false);return}
      if(now-L.t0>90000){vRecEnd(s,false);return}
      if(said&&h&&L.last){var left=Math.max(0,Math.ceil((h-(now-L.last))/1000));msg(now-L.last>900?'Paused… finishing in '+left+'s. Keep talking to carry on.':'Listening… pause or tap Done when you have finished.')}
      L.timer=setTimeout(tick,250)}
    function start(){var r;try{r=new SR()}catch(x){s.vmsg='Speech recognition is not available here. Type your call instead.';s.rec=null;render();return}
      L.r=r;L.run='';r.lang='en-GB';r.interimResults=true;r.continuous=false;/* one phrase per run avoids Android repeating words; runs are chained */r.maxAlternatives=1;
      r.onresult=function(ev){var t='';for(var i=0;i<ev.results.length;i++)t+=ev.results[i][0].transcript+' ';L.run=t.trim();L.last=Date.now();show()};
      r.onerror=function(ev){var c=ev&&ev.error;if(c==='no-speech'||c==='aborted')return;
        if(c==='not-allowed'||c==='service-not-allowed'){L.done=true;clearTimeout(L.timer);VOICE.kb=true;try{localStorage.setItem('ppl-voice-kb','1')}catch(x){}s.vmsg='The microphone is blocked on this page, so use the microphone on your keyboard instead.';s.rec=null;render();return}
        L.fatal=true;s.vmsg=c==='network'?'Speech recognition needs an internet connection. Type your call instead.':'Speech recognition stopped ('+(c||'error')+'). You can type instead.';msg(s.vmsg)};
      r.onend=function(){L.base=(L.base+' '+L.run).trim();L.run='';if(L.done)return;
        if(L.fatal){vRecEnd(s,false);return}
        /* the browser stopped on its own during a pause: carry on listening */
        setTimeout(function(){if(!L.done&&s.rec===L){try{start()}catch(x){vRecEnd(s,false)}}},60)};
      try{r.start()}catch(x){vRecEnd(s,false)}}
    var btn=$('vx-rec');if(btn)btn.textContent=vHold()?'Done':'Done – check my call';msg(vHold()?'Speak now. Take your time; pause for '+(vHold()/1000)+'s or tap Done when you have finished.':'Speak now. Tap Done when you have finished.');
    start();L.timer=setTimeout(tick,250)}
  function vRecEnd(s,user){var L=s.rec;if(!L||L.done)return;L.done=true;L.user=user;clearTimeout(L.timer);
    var r=L.r;if(r){r.onend=null;r.onresult=(function(prev){return function(ev){prev(ev)}})(r.onresult);try{r.stop()}catch(x){}}
    /* give the last words a moment to arrive before marking */
    setTimeout(function(){if(r){try{r.abort()}catch(x){}}var t=(L.base+' '+L.run).replace(/\s+/g,' ').trim();s.vtext=t;s.rec=null;var b=$('vx-rec');if(b)b.textContent='Speak';
      if(t&&ses===s&&s.cur&&!s.chk&&s.ans===null)check(s);else if(!t)render()},user?450:250)}
  function check(s){var e=s.cur;if(!e)return;var text=(s.vtext||'').trim();if(!text){s.vmsg='Say or type your call first.';var mm=$('vx-msg');if(mm)mm.textContent=s.vmsg;return}
    var okg,lg={n:s.ei+1,cap:e.cap||'',q:e.q||'',who:e.who||'',atc:e.atc||'',heard:text,attempt:(s.tries||0)+1};(s.log=s.log||[]).push(lg);if(e.kind==='mcq'){var g=vGradeMcq(e,text);lg.expected=e.opts[e.a];lg.matched=g.pick>=0?e.opts[g.pick]:'(no option matched)';s.vres=g;s.ans=g.pick;var ok=g.pick===e.a;okg=ok;s.chk=true;if(s.ans===null||s.ans<0)s.ans=-1;pushRes(s,e,ok,ok?'':'Answer: '+e.opts[e.a])}
    else{var b=vGradeBuild(e,text);lg.expected=e.ans.filter(function(t){return (e.opt||[]).indexOf(t)<0}).join(', ');lg.missing=b.parts.filter(function(p){return!p.ok}).map(function(p){return p.t});if(b.bad.length)lg.extra=b.bad;if(b.inv>1)lg.order=true;s.vres=b;s.chk=true;s.ans=b.ok?1:0;okg=b.ok;pushRes(s,e,b.ok,b.ok?'':'Model call: '+e.ans.filter(function(t){return (e.opt||[]).indexOf(t)<0}).join(', '))}
    lg.ok=okg;render();afterGrade(s,okg)}
  function fb(s,e,ok,model){var auto=ok&&FS.auto==='on';return'<div class="fb '+(ok?'ok':'no')+'"><b>'+(ok?(s.tries?'Right that time.':'Good call.'):'Not quite.')+'</b>'+(model&&!ok?'<p>Model call: <i>'+esc(model)+'</i></p>':'')+'<p>'+esc(e.why)+'</p><div class="acts">'+(!ok?'<button class="btn" data-a="lx" data-k="retry">Try again</button>':'')+'<button class="btn'+(!ok?' alt':'')+'" data-a="lx" data-k="n">'+(s.ei>=N-1?'Finish flight':'Continue flight')+'</button>'+(auto?'<span class="m">Continuing automatically…</span>':'')+'</div></div>'}
  function tsText(s){var L=s.log||[];var out=['PPL Study Hub radio transcript','Lab: '+o.name+(o.brief?' | '+o.brief.map(function(r){return r[0]+': '+r[1]}).join(' | '):''),'Date: '+new Date().toLocaleString('en-GB'),'Voice input: '+(vKb()?'keyboard microphone':'browser speech recognition'),''];
    L.forEach(function(x){out.push('#'+x.n+(x.attempt>1?' (attempt '+x.attempt+')':'')+' '+(x.ok?'OK':'NOT OK'));if(x.cap)out.push('Situation: '+x.cap);out.push('Task: '+x.q);if(x.atc)out.push('ATC ('+x.who+'): '+x.atc);out.push('Expected: '+x.expected);out.push('Heard: '+x.heard);if(x.matched&&!x.ok)out.push('Matched option: '+x.matched);if(x.missing&&x.missing.length)out.push('Marked missing: '+x.missing.join(' | '));if(x.extra)out.push('Extra words flagged: '+x.extra.join(', '));if(x.order)out.push('Order flagged');out.push('')});return out.join('\n')}
  function tsHtml(s){var L=s.log||[];if(!L.length)return'';return'<div class="card" style="margin-top:16px"><h3>Radio transcript</h3><p class="m" style="margin-top:4px">Every spoken call: the task, what was expected, and exactly what the speech recognition heard. Copy it and paste it to Claude to improve the recognition.</p><div class="ts">'+L.map(function(x){return'<div class="ts-i '+(x.ok?'ok':'no')+'"><div class="ts-h"><b>#'+x.n+'</b> '+esc(x.q)+(x.attempt>1?' <span class="m">(attempt '+x.attempt+')</span>':'')+'<span class="ts-r">'+(x.ok?'✓':'✗')+'</span></div>'+(x.atc?'<p class="m">ATC: '+esc(x.atc)+'</p>':'')+'<p><span class="m">Expected</span> '+esc(x.expected)+'</p><p><span class="m">Heard</span> <i>'+esc(x.heard)+'</i></p>'+(x.missing&&x.missing.length?'<p class="m">Marked missing: '+esc(x.missing.join(' | '))+'</p>':'')+'</div>'}).join('')+'</div><div class="acts"><button class="btn" data-a="lx" data-k="tscopy">Copy transcript</button></div><textarea id="ts-txt" class="ts-txt" readonly rows="6">'+esc(tsText(s))+'</textarea></div>'}
  function pushRes(s,e,ok,n){if(s.tries)s.res.push({t:e.q,ok:false,n:ok?'Right on attempt '+(s.tries+1):(n||'')});else s.res.push({t:e.q,ok:ok,n:n})}
  function afterGrade(s,ok){clearTimeout(s.autoT);if(ok&&FS.auto==='on'){var e=s.cur;s.autoT=setTimeout(function(){if(ses===s&&s.cur===e&&s.go&&!s.fin)labOn({k:'n'})},1800)}}
  function mapSvg(s){var p=PATH.at(s.d);return'<svg viewBox="0 0 400 300" class="lmap" role="img" aria-label="'+esc(o.alt)+'">'+mapBase()+o.bg+'<polyline id="lab-trail" class="lm-trail" points="'+s.trail.join(' ')+'"/><g id="lab-tf">'+tfSvg(s)+'</g>'+acG('lab-ac',p.x,p.y,p.h)+'</svg>'}
  addLab({id:o.id,name:o.name,sub:o.sub,grp:'fly',
    init:function(s){s.go=false;s.fin=false;if(o.make)applyMake();if(typeof nttsPlan==='function')nttsPlan(o.events)},
    on:function(s,k,v,d){
      if(k==='fs'){var fv=d&&d.f;if(fv){FS[fv]=v;fsSave()}if(fv==='voices'&&v==='natural'&&typeof nttsLoad==='function'){nttsUnlock();nttsLoad()}if((fv==='nq'||fv==='eng')&&typeof nttsReset==='function'){nttsReset();nttsUnlock();nttsLoad()}if(fv==='voices'&&s.cur&&s.cur.atc)speakAtc(s.cur.atc,s.cur.who);render();return}
      if(k==='fsset'){s.fsOpen=!s.fsOpen;render();return}
      if(k==='vmode'){VOICE.on=!VOICE.on;try{localStorage.setItem('ppl-voice',VOICE.on?'1':'0')}catch(x){}vStop(s);render();return}
      if(k==='r'){if(d&&d.f==='vt')s.vtext=v;return}
      if(k==='go'){if(typeof nttsUnlock==='function'){nttsUnlock();if(FS.voices==='natural')nttsLoad()}begin(s);return}
      if(k==='again'){s.stop&&s.stop();if(o.make)applyMake();if(typeof nttsPlan==='function')nttsPlan(o.events);begin(s);return}
      if(k==='skip'){var e=ev(s);if(e){s.d=Math.max(s.d,e.at-1);}return}
      if(k==='say'){speakAtc(s.cur.atc,s.cur.who);return}
      var e=s.cur;if(!e)return;
      if(k==='vrec'){vRec(s);return}
      if(k==='tscopy'){var tx=$('ts-txt'),txt=tsText(s),done=function(){toast('Transcript copied')};try{if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(txt).then(done,function(){fb2()})}else fb2()}catch(x){fb2()}function fb2(){try{tx.focus();tx.select();tx.setSelectionRange(0,txt.length);var okc=document.execCommand('copy');if(okc)done();else toast('Select the text below and copy it')}catch(y){toast('Select the text below and copy it')}}return}
      if(k==='atcshow'){s.atcShow=true;render();return}
      if(k==='retry'){clearTimeout(s.autoT);s.tries=(s.tries||0)+1;s.res.pop();s.ans=null;s.chk=false;s.built=[];s.used={};s.vtext='';s.vres=null;s.vmsg='';if(e.kind==='mcq')s.ord=shuffle(e.opts.map(function(_,i){return i}));render();return}
      if(k==='vkb'){vStop(s);VOICE.kb=!VOICE.kb;try{localStorage.setItem('ppl-voice-kb',VOICE.kb?'1':'0')}catch(x){}s.vmsg='';render();return}
      if(k==='vchk'){vStop(s);check(s);return}
      if(k==='vshow'){vStop(s);s.vshow=true;VOICE.tmp=true;VOICE.on=false;render();return}
      if(k==='o'&&s.ans===null){s.ans=+v;var oko=s.ans===e.a;pushRes(s,e,oko,oko?'':'Answer: '+e.opts[e.a]);render();afterGrade(s,oko);return}
      if(k==='c'&&!s.chk){s.built.push(+v);s.used[v]=true;render();return}
      if(k==='u'&&!s.chk){var l=s.built.pop();delete s.used[l];render();return}
      if(k==='chk'&&!s.chk){s.chk=true;var opt=e.opt||[],all=e.ans.concat(e.bank||[]),bt=s.built.map(function(i){return all[i]}).filter(function(t){return opt.indexOf(t)<0}),mt=e.ans.filter(function(t){return opt.indexOf(t)<0});var okb=bt.length===mt.length&&bt.every(function(t,j){return t===mt[j]});s.ans=okb?1:0;pushRes(s,e,okb,okb?'':'Model call: '+e.ans.filter(function(t){return (e.opt||[]).indexOf(t)<0}).join(', '));render();afterGrade(s,okb);return}
      if(k==='n'){clearTimeout(s.autoT);vStop(s);if(VOICE.tmp){VOICE.on=true;VOICE.tmp=false}var ce=s.cur;if(ce&&ce.swap){o.bg=ce.swap.bg;o.cap=ce.swap.cap;o.traffic=ce.swap.traffic||null;o.alt=ce.swap.alt||o.alt;PATH=mkPath(ce.swap.route);s.d=0;s.trail=[]}s.cur=null;s.ei++;if(s.ei>=N){s.d=Math.min(PATH.len,Math.max(s.d,PATH.len-.5));finish(s);return}render();return}
    },
    view:function(s){
      if(!s.go)return labHead(o.name)+'<div class="card"><h3>'+esc(o.name)+'</h3><p style="margin-top:8px">'+o.intro+'</p>'+briefFull()+'<p class="m" style="margin-top:8px">'+N+' radio moments. The aircraft flies itself and stops whenever you need to speak or decide.</p>'+vToggle()+'<div class="acts"><button class="btn" data-a="lx" data-k="go">Start flight</button></div></div><svg viewBox="0 0 400 300" class="lmap" style="margin-top:14px" role="img" aria-label="'+esc(o.alt)+'">'+mapBase()+o.bg+'</svg>';
      if(s.fin){var ok=s.res.filter(function(r){return r.ok}).length;return labSummary(s,o.name,s.res,Math.round(100*ok/N))+tsHtml(s)}
      return labHead(o.name,'Call '+Math.min(s.ei+1,N)+' of '+N)+vToggle(true,s)+mapSvg(s)+'<p class="lcap" id="lab-cap">'+esc(o.cap?o.cap(s.d,PATH.at(s.d)):'')+'</p>'+briefLine()+(s.cur?panel(s):'<div class="card"><p class="m">Flying&hellip; the next radio moment is coming up.</p><div class="acts"><button class="btn alt sm" data-a="lx" data-k="skip">Skip ahead</button></div></div>')}
  })}

flightLab({id:'xc',name:'Cross-country radio flight',sub:'A new route, units, numbers and problem every time',speed:26,alt:'',intro:'',route:[[0,0],[1,1]],bg:'',events:[{at:1,kind:'mcq',q:'',opts:[''],a:0,why:''}],make:function(){return RND.xc&&RND.xc()}});

flightLab({id:'circ',name:'Circuit and radio calls',sub:'Any runway and circuit side at a different airfield each time',speed:70,alt:'',intro:'',route:[[0,0],[1,1]],bg:'',events:[{at:1,kind:'mcq',q:'',opts:[''],a:0,why:''}],make:function(){return RND.circ&&RND.circ()}});

/* ===== LABS: airspace infringement trainer ===== */
var INF=[
 {t:'The zone in the way',tip:'Controlled airspace is a 3D shape. You can go around it, or go over it if the floor of the next airspace is higher than the top of the zone. Here the zone is surrounded by nothing at 4,000 ft, so over the top is legal, but check what is above the zone.',start:[40,260],h:45,alt:2500,goal:[350,50],sp:[
  {n:'Thornby CTR',k:'D',t:'c',x:200,y:140,r:60,fl:0,ce:3500},{n:'Airway CTA (Class A)',k:'A',t:'r',x:120,y:0,w:280,h:60,fl:4500,ce:99999}]},
 {t:'Danger area and a high floor',tip:'Danger areas have a top as well as a lateral shape. Class D to the north starts at 2,500 ft, so below that you can pass beneath. Check the active times and the QNH.',start:[40,250],h:60,alt:3000,goal:[360,60],sp:[
  {n:'Danger area D412',k:'DA',t:'r',x:130,y:130,w:90,h:110,fl:0,ce:5000},{n:'Ashby CTA (Class D)',k:'D',t:'r',x:140,y:0,w:260,h:110,fl:2500,ce:6000}]},
 {t:'The gap between two zones',tip:'A gap on a chart is only a gap if your heading and wind let you stay in it. Line up early and use the wider part.',start:[30,150],h:60,alt:2000,goal:[370,150],sp:[
  {n:'Brandon CTR',k:'D',t:'c',x:170,y:80,r:50,fl:0,ce:3500},{n:'Corley CTR',k:'D',t:'c',x:230,y:220,r:55,fl:0,ce:3500}]},
 {t:'Stepped controlled airspace',tip:'CTA floors step down towards the airport. The safe plan is a level below the lowest floor on your track, set on the correct QNH, reached before you get there.',start:[40,160],h:90,alt:3000,goal:[360,150],sp:[
  {n:'Harlow CTA 1',k:'D',t:'r',x:110,y:60,w:90,h:180,fl:3500,ce:6000},{n:'Harlow CTA 2',k:'D',t:'r',x:200,y:60,w:130,h:180,fl:2500,ce:6000}]}
];
(function(){
var SPD=4;
function sc(s){return INF[s.ix]}
function ctrl(s){return sc(s).sp.filter(function(a){return !a.hide||true})}
function hit(s,x,y,alt){var L=sc(s).sp;for(var i=0;i<L.length;i++){var a=L[i];if(inAir(a,x,y)&&alt>=a.fl&&alt<=a.ce)return a}return null}
function ahead(s){var x=s.x,y=s.y,h=s.h*Math.PI/180,L=sc(s).sp;for(var r=3;r<=90;r+=3){var px=x+Math.sin(h)*r,py=y-Math.cos(h)*r,a=hit(s,px,py,s.alt);if(a)return{a:a,nm:Math.round(r/10*10)/10}}
  for(var r2=3;r2<=90;r2+=3){var qx=x+Math.sin(h)*r2,qy=y-Math.cos(h)*r2;for(var i=0;i<L.length;i++)if(inAir(L[i],qx,qy)&&s.altT>=L[i].fl&&s.altT<=L[i].ce)return{a:L[i],nm:Math.round(r2/10*10)/10,future:true}}
  return null}
function load(s){var c=sc(s);s.x=c.start[0];s.y=c.start[1];s.h=c.h;s.hT=c.h;s.alt=c.alt;s.altT=c.alt;s.trail=[];s.run=false;s.over=null;s.t=0}
function hud(s){var e=$('inf-hud');if(e)e.textContent='HDG '+('00'+Math.round(s.h)%360).slice(-3)+'°   ALT '+Math.round(s.alt/50)*50+' ft  (target '+s.altT+')';var w=$('inf-warn'),a=s.assist?ahead(s):null;if(w){w.className='inf-warn'+(a?' on':'');w.textContent=a?(a.future?'Climb/descent in progress: ':'')+'Ahead in '+a.nm+' NM: '+a.a.n+' ('+(a.a.fl?a.a.fl:'SFC')+(a.a.ce<99999?' to '+a.a.ce:'+')+' ft). You are at '+Math.round(s.alt/50)*50+' ft.':''}}
function step(s,dt){if(!s.run)return;
  var dh=((s.hT-s.h+540)%360)-180,mx=45*dt;s.h=(s.h+Math.max(-mx,Math.min(mx,dh))+360)%360;
  var da=s.altT-s.alt,ma=100*dt;s.alt+=Math.max(-ma,Math.min(ma,da));
  var r=s.h*Math.PI/180;s.x+=Math.sin(r)*SPD*dt;s.y-=Math.cos(r)*SPD*dt;s.t+=dt;
  s.trail.push(s.x.toFixed(0)+','+s.y.toFixed(0));if(s.trail.length>500)s.trail.shift();
  var g=sc(s).goal;
  if(Math.hypot(s.x-g[0],s.y-g[1])<14){s.run=false;s.res.push({t:sc(s).t,ok:true});s.over={win:1};render();return}
  var a=hit(s,s.x,s.y,s.alt);
  if(a){s.run=false;s.res.push({t:sc(s).t,ok:false,n:'Entered '+a.n+' at '+Math.round(s.alt/50)*50+' ft'});s.over={a:a,alt:Math.round(s.alt/50)*50};render();return}
  if(s.x<-5||s.x>405||s.y<-5||s.y>305){s.run=false;s.res.push({t:sc(s).t,ok:false,n:'Left the chart area (lost)'});s.over={lost:1};render();return}
  var ac=$('inf-ac');if(ac)ac.setAttribute('transform','translate('+s.x.toFixed(1)+' '+s.y.toFixed(1)+') rotate('+s.h.toFixed(0)+')');var tr=$('inf-trail');if(tr)tr.setAttribute('points',s.trail.join(' '));
  var proj=$('inf-proj');if(proj){proj.setAttribute('x1',s.x);proj.setAttribute('y1',s.y);proj.setAttribute('x2',(s.x+Math.sin(r)*90).toFixed(1));proj.setAttribute('y2',(s.y-Math.cos(r)*90).toFixed(1))}
  hud(s)}
function mapS(s){var c=sc(s),r=s.h*Math.PI/180;return'<svg viewBox="0 0 400 300" class="lmap" role="img" aria-label="Map with controlled airspace and your aircraft">'+mapBase()+c.sp.map(function(a){return airShape(a)}).join('')+c.sp.map(function(a){return airLabel(a)}).join('')
  +'<circle cx="'+c.goal[0]+'" cy="'+c.goal[1]+'" r="14" class="lm-goal"/><text x="'+c.goal[0]+'" y="'+(c.goal[1]+3)+'" text-anchor="middle" class="lm-t">GOAL</text><line id="inf-proj" class="lm-proj" x1="'+s.x+'" y1="'+s.y+'" x2="'+(s.x+Math.sin(r)*90)+'" y2="'+(s.y-Math.cos(r)*90)+'"/><polyline id="inf-trail" class="lm-trail" points="'+s.trail.join(' ')+'"/>'+acG('inf-ac',s.x,s.y,s.h)+'</svg>'}
addLab({id:'inf',name:'Airspace infringement trainer',sub:'Steer and change level to reach the goal without entering controlled airspace',grp:'fly',
 init:function(s){s.ix=0;s.res=[];s.assist=true;s.fin=false;load(s);s.tm=setInterval(function(){step(s,.05)},50);s.stop=function(){clearInterval(s.tm)};s.step=function(dt){step(s,dt)}},
 on:function(s,k,v){
  if(k==='go'){s.run=true;render();return}
  if(k==='h'){s.hT=(s.hT+ +v+360)%360;hud(s);return}
  if(k==='a'){s.altT=Math.max(500,Math.min(6000,s.altT+ +v));hud(s);return}
  if(k==='as'){s.assist=!s.assist;render();return}
  if(k==='retry'){load(s);s.res.pop();render();return}
  if(k==='next'){s.ix++;if(s.ix>=INF.length){s.fin=true;var ok=s.res.filter(function(r){return r.ok}).length;labLog('inf',Math.round(100*ok/INF.length))}else load(s);render();return}
  if(k==='again'){s.ix=0;s.res=[];s.fin=false;load(s);render();return}
 },
 view:function(s){
  if(s.fin){var ok=s.res.filter(function(r){return r.ok}).length;return labSummary(s,'Infringement trainer',s.res,Math.round(100*ok/INF.length))}
  var c=sc(s),o=s.over,h=labHead('Infringement trainer','Scenario '+(s.ix+1)+' of '+INF.length+': '+c.t);
  if(!s.run&&!o)return h+'<div class="card"><p>You are at <b>'+s.alt+' ft</b> on QNH, heading <b>'+s.h+'°</b>. Reach the green GOAL circle without entering controlled airspace or the danger area. The dashed line shows where you are heading.</p><p class="m" style="margin-top:8px">Turn with the heading buttons and set a new level with Climb and Descend. Check each block: the floor and ceiling matter as much as its outline. Airspace here is fictional.</p><div class="acts"><button class="btn" data-a="lx" data-k="go">Start</button><button class="btn alt" data-a="lx" data-k="as">Warnings: '+(s.assist?'on':'off')+'</button></div></div>'+mapS(s);
  if(o){var body=o.win?'<div class="fb ok"><b>Reached the goal clear of controlled airspace.</b><p>'+esc(c.tip)+'</p></div>':o.lost?'<div class="fb no"><b>You left the chart area.</b><p>Keep track of where you are. If you were unsure of position in real life, you would call for help early (PAN PAN or a Basic Service request).</p></div>':'<div class="fb no"><b>Infringement: you entered '+esc(o.a.n)+' at '+o.alt+' ft.</b><p>'+esc(c.tip)+'</p><p><b>What to do in real life:</b> leave the airspace by the quickest safe route, call the unit or the emergency frequency 121.500 MHz with your callsign, position, level and intentions, follow instructions, then file the report your authority asks for.</p></div>';
   return h+body+'<div class="acts" style="margin:12px 0">'+(o.win?'':'<button class="btn" data-a="lx" data-k="retry">Try this one again</button>')+'<button class="btn '+(o.win?'':'alt')+'" data-a="lx" data-k="next">'+(s.ix>=INF.length-1?'Finish':'Next scenario')+'</button></div>'+mapS(s)}
  return h+mapS(s)+'<div class="inf-hud" id="inf-hud"></div><div class="inf-warn" id="inf-warn"></div><div class="ctl"><div><span class="m">Heading</span><div class="seg"><button data-a="lx" data-k="h" data-v="-30">L 30</button><button data-a="lx" data-k="h" data-v="-10">L 10</button><button data-a="lx" data-k="h" data-v="10">R 10</button><button data-a="lx" data-k="h" data-v="30">R 30</button></div></div><div><span class="m">Level</span><div class="seg"><button data-a="lx" data-k="a" data-v="-500">Descend 500</button><button data-a="lx" data-k="a" data-v="500">Climb 500</button></div></div></div>'}
});
})();
