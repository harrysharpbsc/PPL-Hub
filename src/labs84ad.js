/* ===== Aerodromes diagrams, style B (library: labs80b.js; how-to: .claude/skills/ppl-diagram) =====
   Sign, mast, marshalling and cockpit drawings are the real-world signals, so they keep their real colours.
   Each F entry: [title, viewBox width, height, drawing, caption]; SEC gives the note section it sits in. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN,A=dzA;
var W='#ffffff',G='#3ccf63',Rd='#ff4a4a';
function morse(code,col){var p=[];code.split('').forEach(function(c){if(c===' ')p.push([10,'transparent']);else p.push([c==='-'?11:4,col])});return p}

/* declared distances, runway state, lights, signals, markings (04 Aerodromes, part 2): mocked up from the textbook figures */
var Wh='#f4f1e6',Ye='#f2c14a',Re='#d8312c',Or='#e8742c',Nv='#1d2b45',Pn='#2b2f36';
/* black signal panels and masts */
function sT(disc){return function(cx,cy){return'<path d="M'+(cx-20)+' '+(cy-17)+'H'+(cx-13)+'V'+(cy+17)+'H'+(cx-20)+'Z" fill="'+Wh+'"/><path d="M'+(cx-13)+' '+(cy-3)+'H'+(cx+28)+'V'+(cy+3)+'H'+(cx-13)+'Z" fill="'+Wh+'"/>'+(disc?'<circle cx="'+(cx-29)+'" cy="'+cy+'" r="4.5" fill="'+Wh+'"/>':'')}}
function sDb(strips,redL,whiteL){return function(cx,cy){var y=whiteL?cy+10:cy;return(whiteL?'<path d="M'+(cx-3)+' '+(cy-20)+'V'+(cy-2)+'H'+(cx+7)+'" stroke="'+Wh+'" stroke-width="3.5" fill="none"/>':'')+'<circle cx="'+(cx-24)+'" cy="'+y+'" r="'+(whiteL?8:11)+'" fill="'+Wh+'"/><circle cx="'+(cx+24)+'" cy="'+y+'" r="'+(whiteL?8:11)+'" fill="'+Wh+'"/><path d="M'+(cx-24)+' '+(y-3)+'H'+(cx+24)+'V'+(y+3)+'H'+(cx-24)+'Z" fill="'+Wh+'"/>'+(strips?'<path d="M'+(cx-24)+' '+(y-11)+'V'+(y+11)+'M'+(cx+24)+' '+(y-11)+'V'+(y+11)+'" stroke="'+Pn+'" stroke-width="3.5"/>':'')+(redL?'<path d="M'+(cx-4)+' '+(y-9)+'V'+(y+7)+'H'+(cx+7)+'" stroke="'+Re+'" stroke-width="3.5" fill="none"/>':'')}}
function sL(cx,cy){return'<path d="M'+(cx-7)+' '+(cy-16)+'V'+(cy+14)+'H'+(cx+11)+'" stroke="'+Wh+'" stroke-width="6" fill="none"/>'}
function sArrow(cx,cy){var d='M'+(cx-26)+' '+(cy+20)+'V'+(cy-14)+'H'+(cx+18);return'<path d="'+d+'" stroke="'+Re+'" stroke-width="8" fill="none"/><path d="'+d+'" stroke="'+Ye+'" stroke-width="8" stroke-dasharray="5 5" fill="none"/><path d="M'+(cx+16)+' '+(cy-24)+'L'+(cx+30)+' '+(cy-14)+'L'+(cx+16)+' '+(cy-4)+'Z" fill="'+Re+'"/>'}
function sSq(cross){return function(cx,cy){return'<rect x="'+(cx-20)+'" y="'+(cy-20)+'" width="40" height="40" fill="'+Re+'"/><path d="M'+(cx-18)+' '+(cy+18)+'L'+(cx+18)+' '+(cy-18)+(cross?'M'+(cx-18)+' '+(cy-18)+'L'+(cx+18)+' '+(cy+18):'')+'" stroke="'+Ye+'" stroke-width="5"/>'}}
function sH(cx,cy){return'<path d="M'+(cx-11)+' '+(cy-16)+'V'+(cy+16)+'M'+(cx+11)+' '+(cy-16)+'V'+(cy+16)+'M'+(cx-11)+' '+cy+'H'+(cx+11)+'" stroke="'+Wh+'" stroke-width="5"/>'}
function sDx(cx,cy){return'<path d="M'+(cx-32)+' '+cy+'H'+(cx+32)+'M'+(cx-16)+' '+(cy-13)+'V'+(cy+13)+'M'+(cx+16)+' '+(cy-13)+'V'+(cy+13)+'" stroke="'+Wh+'" stroke-width="5"/>'}
function sYp(cx,cy){return'<path d="M'+cx+' '+(cy-18)+'V'+(cy+18)+'M'+(cx-18)+' '+(cy-4)+'H'+(cx+18)+'" stroke="'+Ye+'" stroke-width="6"/>'}
function sX(col,n){return function(cx,cy){var s='';for(var k=0;k<n;k++){var x=cx+(k-(n-1)/2)*30;s+='<path d="M'+(x-11)+' '+(cy-11)+'L'+(x+11)+' '+(cy+11)+'M'+(x+11)+' '+(cy-11)+'L'+(x-11)+' '+(cy+11)+'" stroke="'+col+'" stroke-width="4.5"/>'}return s}}
function mast(cx,cy,extra){return'<path d="M'+(cx-12)+' '+(cy+21)+'H'+(cx+12)+'" stroke="#4F5D7A" stroke-width="2"/><path d="M'+(cx-7)+' '+(cy+21)+'L'+cx+' '+(cy-22)+'L'+(cx+7)+' '+(cy+21)+'" stroke="#4F5D7A" stroke-width=".8" fill="none"/><path d="M'+cx+' '+(cy+21)+'V'+(cy-22)+'" stroke="var(--ink)" stroke-width="1.8"/>'+(extra||'')}
function mBall(n,col){return function(cx,cy){var s='';for(var k=0;k<n;k++)s+='<circle cx="'+(cx-6)+'" cy="'+(cy-12+k*10)+'" r="5" fill="'+col+'"/>';return mast(cx,cy,s)}}
function mFlag(col,cheq){return function(cx,cy){var f='';if(cheq){for(var r=0;r<3;r++)for(var c=0;c<4;c++)f+='<path d="M'+(cx+1+c*6)+' '+(cy-20+r*6)+'h6v6h-6Z" fill="'+((r+c)%2?Ye:Re)+'"/>'}else f='<path d="M'+(cx+1)+' '+(cy-20)+'h20v14h-20Z" fill="'+col+'"/>';return mast(cx,cy,f)}}
function sC(cx,cy){return'<rect x="'+(cx-18)+'" y="'+(cy-18)+'" width="36" height="36" fill="'+Ye+'"/><path d="M'+(cx+9)+' '+(cy-8)+'A11 11 0 1 0 '+(cx+9)+' '+(cy+8)+'" stroke="#111" stroke-width="5.5" fill="none"/>'}
function sRwyT(cx,cy){return'<path d="M'+(cx-30)+' '+(cy+4)+'H'+(cx+34)+'V'+(cy+22)+'H'+(cx-30)+'Z" fill="#555b66"/><path d="M'+(cx+12)+' '+(cy-18)+'H'+(cx+17)+'V'+(cy-2)+'H'+(cx+12)+'Z" fill="'+Wh+'"/><path d="M'+(cx-13)+' '+(cy-12)+'H'+(cx+12)+'V'+(cy-8)+'H'+(cx-13)+'Z" fill="'+Wh+'"/>'+A(cx-24,cy+13,cx+26,cy+13,Wh,1.2)}
function n09(x,y){return'<text x="'+x+'" y="'+y+'" transform="rotate(90 '+x+' '+y+')" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="'+Wh+'" style="stroke:none">09</text>'}
function sDanger(bar){return function(cx,cy){return(bar?'<path d="M'+(cx-26)+' '+(cy-14)+'V'+(cy+14)+'" stroke="'+Wh+'" stroke-width="4"/>':'')+'<path d="M'+(cx-16)+' '+(cy-12)+'L'+(cx+6)+' '+(cy+12)+'M'+(cx+6)+' '+(cy-12)+'L'+(cx-16)+' '+(cy+12)+'" stroke="'+Wh+'" stroke-width="4.5"/>'+n09(cx+24,cy)}}
function sWedge(cx,cy){var s='<path d="M'+(cx-34)+' '+(cy+10)+'L'+(cx+18)+' '+(cy-18)+'L'+(cx+30)+' '+(cy-2)+'L'+(cx-22)+' '+(cy+18)+'Z" fill="#fff" stroke="#4F5D7A" stroke-width=".8"/>';[[-34,10,-22,18,-14,0],[-8,-4,4,4,0,0],[14,-14,26,-6,0,0]].forEach(function(b){});
 var pts=[[cx-34,cy+10],[cx+18,cy-18]],q=[[cx-22,cy+18],[cx+30,cy-2]];[0.08,0.42,0.76].forEach(function(t){var t2=t+0.17,P1=[pts[0][0]+(pts[1][0]-pts[0][0])*t,pts[0][1]+(pts[1][1]-pts[0][1])*t],P2=[pts[0][0]+(pts[1][0]-pts[0][0])*t2,pts[0][1]+(pts[1][1]-pts[0][1])*t2],Q1=[q[0][0]+(q[1][0]-q[0][0])*t,q[0][1]+(q[1][1]-q[0][1])*t],Q2=[q[0][0]+(q[1][0]-q[0][0])*t2,q[0][1]+(q[1][1]-q[0][1])*t2];s+='<path d="M'+P1.join(' ')+'L'+P2.join(' ')+'L'+Q2.join(' ')+'L'+Q1.join(' ')+'Z" fill="'+Or+'"/>'});return s}
function sOWflag(cx,cy){return'<path d="M'+(cx+14)+' '+(cy+22)+'V'+(cy-22)+'" stroke="#4F5D7A" stroke-width="2"/><path d="M'+(cx-18)+' '+(cy-18)+'H'+(cx+13)+'V'+(cy+6)+'H'+(cx-18)+'Z" fill="#fff" stroke="#4F5D7A" stroke-width=".8"/><path d="M'+(cx-18)+' '+(cy+6)+'L'+(cx+13)+' '+(cy-18)+'V'+(cy+6)+'Z" fill="'+Or+'"/>'}
function sBoard(cx,cy){var s='<path d="M'+(cx-36)+' '+(cy+12)+'L'+(cx-26)+' '+(cy+4)+'H'+(cx+36)+'L'+(cx+26)+' '+(cy+18)+'H'+(cx-36)+'Z" fill="'+Or+'"/><path d="M'+(cx-10)+' '+(cy+4)+'H'+(cx+12)+'L'+(cx+4)+' '+(cy+18)+'H'+(cx-18)+'Z" fill="#fff"/>';
 s+='<path d="M'+(cx-30)+' '+(cy-20)+'H'+(cx+32)+'V'+(cy+6)+'H'+(cx-30)+'Z" fill="'+Or+'"/><path d="M'+(cx-10)+' '+(cy-20)+'H'+(cx+12)+'V'+(cy+6)+'H'+(cx-10)+'Z" fill="#fff"/>';for(var k=0;k<7;k++)s+='<path d="M'+(cx-24+k*8)+' '+(cy-14)+'V'+(cy+2)+'" stroke="#4F5D7A" stroke-width="1.2"/>';return s}
function strip(y,kind,l1,l2,l3){var x0=118,x1=312,s='<path d="M'+x0+' '+y+'H'+x1+'V'+(y+34)+'H'+x0+'Z" fill="'+Pn+'"/>',cy=y+17;
 function keys(x){var t='';for(var k=0;k<6;k++)t+='<path d="M'+x+' '+(y+4+k*5.2)+'H'+(x+30)+'" stroke="'+Wh+'" stroke-width="2.6"/>';return t}
 function arrows(a,b){return A(a,cy,a+36,cy,Wh,1.6)+A(b,cy,b+36,cy,Wh,1.6)}
 function xs(a,b){return[a,b].map(function(x){return'<path d="M'+(x-8)+' '+(cy-9)+'L'+(x+8)+' '+(cy+9)+'M'+(x+8)+' '+(cy-9)+'L'+(x-8)+' '+(cy+9)+'" stroke="'+Wh+'" stroke-width="2.6"/>'}).join('')}
 function chev(x){var t='';for(var k=0;k<4;k++)t+='<path d="M'+x+' '+(y+3+k*7.4)+'L'+(x+6)+' '+(y+6.5+k*7.4)+'L'+x+' '+(y+10+k*7.4)+'" stroke="'+Wh+'" stroke-width="1.4" fill="none"/>';return t+'<path d="M'+(x+10)+' '+(y+3)+'V'+(y+31)+'" stroke="'+Wh+'" stroke-width="1.6"/>'}
 if(kind==='n')s+=keys(122)+n09(166,cy)+'<path d="M184 '+cy+'H220M236 '+cy+'H272M288 '+cy+'H312" stroke="'+Wh+'" stroke-width="2"/>';
 if(kind==='pa')s+=arrows(128,186)+'<path d="M240 '+(y+2)+'V'+(y+32)+'" stroke="'+Wh+'" stroke-width="2.4"/>'+keys(246)+n09(296,cy);
 if(kind==='px')s+=xs(150,206)+'<path d="M240 '+(y+2)+'V'+(y+32)+'" stroke="'+Wh+'" stroke-width="2.4"/>'+keys(246)+n09(296,cy);
 if(kind==='ta')s+=n09(134,cy)+arrows(158,224)+chev(290);
 if(kind==='tx')s+=n09(134,cy)+xs(184,246)+chev(290);
 return s+T(8,y+15,l1,'t1')+T(8,y+29,l2,'t2')}
/* marshalling: a marshaller facing you. Their right arm is on your left. Arms: points from the shoulder [dx,dy]. */
var SK='#f0a53a',SKd='#d9822b';
function man(cx,by,aR,aL,o){o=o||{};var col=o.col||SK,sh=by-54,s='<path d="M'+(cx-30)+' '+(by+1)+'H'+(cx+30)+'" stroke="var(--ink-2)" stroke-width="2.5"/>';
 s+='<path d="M'+(cx-4)+' '+(by-30)+'L'+(cx-10)+' '+by+'M'+(cx+4)+' '+(by-30)+'L'+(cx+10)+' '+by+'" stroke="'+(o.leg||SKd)+'" stroke-width="5" stroke-linecap="round"/>';
 s+='<path d="M'+(cx-10)+' '+(sh-2)+'H'+(cx+10)+'L'+(cx+8)+' '+(by-28)+'H'+(cx-8)+'Z" fill="'+col+'"/>'+(o.band?'<path d="M'+(cx-9)+' '+(by-44)+'H'+(cx+9)+'M'+(cx-8)+' '+(by-34)+'H'+(cx+8)+'" stroke="'+Ye+'" stroke-width="2.4"/>':'');
 s+='<circle cx="'+cx+'" cy="'+(by-64)+'" r="7" fill="'+(o.head||SK)+'"/>'+(o.helmet?'<path d="M'+(cx-8)+' '+(by-65)+'A8 8 0 0 1 '+(cx+8)+' '+(by-65)+'Z" fill="#eee" stroke="#999" stroke-width=".6"/>':'');
 function arm(x0,a,bat){if(!a)return'';var d='M'+x0+' '+sh,px=x0,py=sh;a.forEach(function(p){px=x0+p[0];py=sh+p[1];d+='L'+px+' '+py});return'<path d="'+d+'" stroke="'+col+'" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'+(bat?'<circle cx="'+px+'" cy="'+py+'" r="4.2" fill="'+Nv+'" stroke="#fff" stroke-width=".8"/>':'<circle cx="'+px+'" cy="'+py+'" r="2.6" fill="'+(o.hand||col)+'"/>')}
 return s+arm(cx-9,aR,o.bats!==false)+arm(cx+9,aL,o.bats!==false)+(o.extra||'')}
function mv(d,c){return'<path d="'+d+'" stroke="'+(c||'var(--bad)')+'" stroke-width="1.3" stroke-dasharray="3 2" fill="none"/>'}
function arr(x1,y1,x2,y2){return A(x1,y1,x2,y2,'var(--bad)',1.2)}
var DN_R=[[-5,13],[-7,27]],DN_L=[[5,13],[7,27]],OUT_R=[[-10,10],[-18,22]],OUT_L=[[10,10],[18,22]],UP_R=[[-3,-14],[-3,-28]],UP_L=[[3,-14],[3,-28]],HZ_R=[[-14,0],[-29,0]],HZ_L=[[14,0],[29,0]];
var M1=[
 [function(cx,by){return man(cx,by,null,null,{extra:man(cx,by,DN_R,[[-6,6],[-30,4]],{bats:true})})+'<circle cx="'+(cx-40)+'" cy="'+(by-52)+'" r="5" fill="none" stroke="var(--ink-2)" stroke-dasharray="2 2"/>'+arr(cx-22,by-60,cx-34,by-60)},'Proceed to the','next marshaller'],
 [function(cx,by){return man(cx,by,OUT_R,OUT_L)+mv('M'+(cx-27)+' '+(by-34)+'Q'+(cx-34)+' '+(by-86)+' '+(cx-6)+' '+(by-84))+arr(cx-10,by-85,cx-4,by-84)+mv('M'+(cx+27)+' '+(by-34)+'Q'+(cx+34)+' '+(by-86)+' '+(cx+6)+' '+(by-84))+arr(cx+10,by-85,cx+4,by-84)},'Move ahead','(beckon up and back)'],
 [function(cx,by){return man(cx,by,DN_R,OUT_L)+mv('M'+(cx+27)+' '+(by-34)+'Q'+(cx+30)+' '+(by-86)+' '+(cx+6)+' '+(by-84))+arr(cx+10,by-85,cx+4,by-84)},'Turn to port','(right arm down)'],
 [function(cx,by){return man(cx,by,OUT_R,DN_L)+mv('M'+(cx-27)+' '+(by-34)+'Q'+(cx-30)+' '+(by-86)+' '+(cx-6)+' '+(by-84))+arr(cx-10,by-85,cx-4,by-84)},'Turn to starboard','(left arm down)'],
 [function(cx,by){return man(cx,by,[[-8,-12],[6,-28]],[[8,-12],[-6,-28]])+mv('M'+(cx-14)+' '+(by-86)+'Q'+cx+' '+(by-78)+' '+(cx+14)+' '+(by-86))},'Stop (arms crossed','above the head)'],
 [function(cx,by){return man(cx,by,[[-13,4],[-14,-10]],HZ_L)+'<circle cx="'+(cx-23)+'" cy="'+(by-64)+'" r="8" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/>'+arr(cx-31,by-60,cx-30,by-56)},'Start engine (circle;','other arm points)'],
 [function(cx,by){return man(cx,by,[[-12,8],[-24,16]],[[12,8],[24,16]])+arr(cx-26,by-24,cx-14,by-28)+arr(cx+26,by-24,cx+14,by-28)},'Chocks inserted','(swing inwards)'],
 [function(cx,by){return man(cx,by,[[-4,13],[-10,25]],[[4,13],[10,25]])+arr(cx-14,by-20,cx-28,by-24)+arr(cx+14,by-20,cx+28,by-24)},'Chocks away','(swing outwards)'],
 [function(cx,by){return man(cx,by,DN_R,[[12,4],[-4,-4]])+arr(cx-6,by-62,cx+22,by-62)},'Cut engines (hand','across the chest)']
];
var M2=[
 [function(cx,by){return man(cx,by,OUT_R,OUT_L)+arr(cx-27,by-31,cx-27,by-46)+arr(cx-27,by-31,cx-27,by-18)+arr(cx+27,by-31,cx+27,by-46)+arr(cx+27,by-31,cx+27,by-18)},'Slow down','(arms move up, down)'],
 [function(cx,by){return man(cx,by,OUT_R,DN_L)+arr(cx-27,by-31,cx-27,by-46)+arr(cx-27,by-31,cx-27,by-18)},'Slow engines on','the indicated side'],
 [function(cx,by){return man(cx,by,[[-5,-14],[-7,-28]],[[5,-14],[7,-28]])},'This bay','(arms vertical)'],
 [function(cx,by){return man(cx,by,[[-4,14],[10,10]],DN_L,{bats:false,extra:'<path d="M'+(cx+3)+' '+(by-50)+'h6M'+(cx+3)+' '+(by-47)+'h6M'+(cx+3)+' '+(by-44)+'h6" stroke="var(--ink)" stroke-width="1"/>'})},'Release brakes','(fist, then open)'],
 [function(cx,by){return man(cx,by,[[-4,14],[10,10]],DN_L,{bats:false,extra:'<circle cx="'+(cx+1)+'" cy="'+(by-44)+'" r="3.4" fill="'+SKd+'"/>'})},'Engage brakes','(open, then fist)'],
 [function(cx,by){return man(cx,by,[[-15,0],[-15,-15]],DN_L)},'All clear: marshalling','finished'],
 [function(cx,by){return man(cx,by,[[-13,4],[-14,-10]],[[4,-14],[4,-28]],{extra:'<text x="'+(cx+16)+'" y="'+(by-80)+'" class="t1">2</text>'})+'<circle cx="'+(cx-23)+'" cy="'+(by-64)+'" r="8" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/>'},'Start engine no. 2','(fingers overhead)'],
 [function(cx,by){return man(cx,by,UP_R,[[6,13],[12,27]])+arr(cx-20,by-80,cx-20,by-58)+arr(cx-20,by-62,cx-20,by-84)},'Back tail to','starboard'],
 [function(cx,by){return man(cx,by,[[-6,13],[-12,27]],UP_L)+arr(cx+20,by-80,cx+20,by-58)+arr(cx+20,by-62,cx+20,by-84)},'Back tail to','port']
];
var MH=[
 [function(cx,by){return man(cx,by,HZ_R,HZ_L)},'Hover','(arms out sideways)'],
 [function(cx,by){return man(cx,by,[[-2,14],[12,22]],[[2,14],[-12,22]])},'Land (arms crossed','low in front)'],
 [function(cx,by){return man(cx,by,HZ_R,HZ_L)+arr(cx-30,by-58,cx-30,by-76)+arr(cx+30,by-58,cx+30,by-76)},'Move upwards','(palms up, beckon)'],
 [function(cx,by){return man(cx,by,HZ_R,HZ_L)+arr(cx-30,by-50,cx-30,by-32)+arr(cx+30,by-50,cx+30,by-32)},'Move downwards','(palms down)'],
 [function(cx,by){return man(cx,by,HZ_R,[[10,8],[-14,10]])+mv('M'+(cx+14)+' '+(by-36)+'Q'+cx+' '+(by-26)+' '+(cx-22)+' '+(by-38))+arr(cx-16,by-34,cx-24,by-40)},'Move horizontally','(sweep across body)'],
 [function(cx,by){return man(cx,by,OUT_R,OUT_L)+arr(cx-30,by-34,cx-30,by-54)+arr(cx+30,by-34,cx+30,by-54)},'Move back (sweep','up to shoulders)'],
 [function(cx,by){return man(cx,by,[[-4,12],[-6,22]],[[4,4],[2,10]],{bats:false})+'<circle cx="'+cx+'" cy="'+(by-46)+'" r="3" fill="'+SKd+'"/>'+arr(cx,by-36,cx-24,by-36)+arr(cx,by-36,cx+24,by-36)},'Release load (slice','under the left arm)']
];
function cockpit(cx,by,extra){return'<path d="M'+(cx-40)+' '+by+'L'+(cx-36)+' '+(by-70)+'Q'+cx+' '+(by-78)+' '+(cx+36)+' '+(by-70)+'L'+(cx+40)+' '+by+'" stroke="var(--ink-2)" stroke-width="2" fill="none"/>'
 +'<path d="M'+(cx-17)+' '+(by-14)+'Q'+cx+' '+(by-34)+' '+(cx+17)+' '+(by-14)+'Z" fill="'+SKd+'"/><circle cx="'+cx+'" cy="'+(by-40)+'" r="9" fill="'+SKd+'"/>'+(extra||'')+'<path d="M'+(cx-42)+' '+by+'Q'+cx+' '+(by-22)+' '+(cx+42)+' '+by+'Z" fill="var(--accent)"/>'}
function hand(x,y,open){return open?'<path d="M'+(x-4)+' '+(y+4)+'V'+(y-6)+'M'+(x-1.3)+' '+(y+4)+'V'+(y-8)+'M'+(x+1.4)+' '+(y+4)+'V'+(y-8)+'M'+(x+4)+' '+(y+4)+'V'+(y-6)+'" stroke="'+SK+'" stroke-width="2.2" stroke-linecap="round"/>':'<circle cx="'+x+'" cy="'+y+'" r="4" fill="'+SK+'" stroke="'+SKd+'" stroke-width=".8"/>'}
var MP=[
 [function(cx,by){return cockpit(cx,by,'<path d="M'+(cx+12)+' '+(by-22)+'L'+(cx-14)+' '+(by-40)+'" stroke="'+SK+'" stroke-width="4" stroke-linecap="round"/>'+hand(cx-16,by-44,false))},'Brakes engaged','(fingers, then fist)'],
 [function(cx,by){return cockpit(cx,by,'<path d="M'+(cx+12)+' '+(by-22)+'L'+(cx-14)+' '+(by-40)+'" stroke="'+SK+'" stroke-width="4" stroke-linecap="round"/>'+hand(cx-16,by-44,false))},'Brakes released','(fist, then fingers)'],
 [function(cx,by){return cockpit(cx,by,hand(cx-26,by-44,true)+hand(cx+26,by-44,true)+arr(cx-22,by-56,cx-10,by-56)+arr(cx+22,by-56,cx+10,by-56))},'Insert chocks','(hands in, cross)'],
 [function(cx,by){return cockpit(cx,by,hand(cx-6,by-44,true)+hand(cx+6,by-44,true)+arr(cx-10,by-56,cx-26,by-56)+arr(cx+10,by-56,cx+26,by-56))},'Remove chocks','(hands out)'],
 [function(cx,by){return cockpit(cx,by,hand(cx-22,by-46,true)+T(cx-22,by-56,'no. 2','t2','middle'))},'Ready to start','(fingers = engine)'],
 [function(cx,by){return'<path d="M'+(cx-44)+' '+(by-50)+'H'+(cx+44)+'" stroke="var(--ink-2)" stroke-width="3"/><circle cx="'+cx+'" cy="'+(by-50)+'" r="7" fill="var(--ink-2)"/>'+[[-34,'4'],[-18,'3'],[18,'2'],[34,'1']].map(function(e){return'<circle cx="'+(cx+e[0])+'" cy="'+(by-44)+'" r="4.5" fill="var(--surface)" stroke="var(--ink)"/>'+T(cx+e[0],by-28,e[1],'d1','middle')}).join('')+T(cx,by-64,'front view','t2','middle')+T(cx-30,by-6,'stbd','t2','middle')+T(cx+30,by-6,'port','t2','middle')},'Engine numbers, from','marshaller\'s right']
];
var FF='#8a5530',ffo={col:FF,leg:'#6d4224',head:'#e0b48a',band:true,helmet:true,bats:false,hand:'#333'};
var ME=[
 [function(cx,by){return man(cx,by,[[-5,13],[-6,26]],[[14,0],[14,-14]],ffo)+mv('M'+(cx+28)+' '+(by-68)+'Q'+(cx+34)+' '+(by-58)+' '+(cx+30)+' '+(by-48))},'Recommend','evacuation'],
 [function(cx,by){return man(cx,by,[[-10,-10],[4,-22]],[[10,-10],[-4,-22]],ffo)},'Recommend stop','(crossed at wrists)'],
 [function(cx,by){return man(cx,by,[[-14,12],[-24,22]],[[14,12],[24,22]],ffo)+arr(cx-24,by-22,cx-10,by-16)+arr(cx+24,by-22,cx+10,by-16)},'Emergency contained','(in below the waist)'],
 [function(cx,by){return man(cx,by,[[-8,10],[-14,22]],[[14,-8],[26,-20]],ffo)+mv('M'+(cx-20)+' '+(by-56)+'Q'+(cx-30)+' '+(by-36)+' '+(cx-18)+' '+(by-16))+T(cx+26,by-80,'fire','t2','middle')},'Fire (fan; point','at the fire)']
];

/* ---------- style B layouts ---------- */
var SKY='#E8EEF4';
/* white-on-dark label for signs drawn on a black signals area */
function wt(x,y,s,a){return'<text x="'+x+'" y="'+y+'" class="t2"'+(a?' text-anchor="'+a+'"':'')+' style="fill:#E8EDF6;stroke:none">'+s+'</text>'}
/* dimension line with end ticks and a label above (or below) */
function dimB(x1,x2,y,lab,c,below){var k={k:'sk',a:'sa',m:'sm',g:'sg',r:'sr'}[c],t={k:'t1',a:'t1 ta',m:'t1 tm',g:'t1 tg',r:'t1 tr'}[c];
 return L('M'+x1+' '+y+'H'+x2+'M'+x1+' '+(y-5)+'V'+(y+5)+'M'+x2+' '+(y-5)+'V'+(y+5),k,1.4)+T((x1+x2)/2,below?y+15:y-6,lab,t,'middle')}
function guide(x,y1,y2){return L('M'+x+' '+y1+'V'+y2,'s2',1,'3 3')}
function treeB(x,y,s){s=s||1;return'<path d="M'+x+' '+y+'V'+(y-10*s)+'" class="sk" stroke-width="'+(2*s)+'"/><circle cx="'+x+'" cy="'+(y-16*s)+'" r="'+(8*s)+'" class="fg" opacity=".75"/>'}
/* gallery of signs, two per row: [draw(cx,cy), headline, 'meaning|second line', lightTile] */
function gal(items,lines){lines=lines||2;var th=86+lines*14,s='';items.forEach(function(it,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*(th+8),cx=x+74,cy=y+38,l=(it[2]||'').split('|');
  s+='<rect x="'+x+'" y="'+y+'" width="148" height="'+th+'" rx="8" class="panel"/><rect x="'+(x+10)+'" y="'+(y+8)+'" width="128" height="62" rx="4" fill="'+(it[3]?SKY:Pn)+'"/>'
   +'<g transform="translate('+cx+' '+cy+') scale(1.15) translate('+(-cx)+' '+(-cy)+')">'+it[0](cx,cy)+'</g>'+T(cx,y+88,it[1],'t1','middle');
  l.forEach(function(t,k){s+=T(cx,y+102+k*14,t,'t2','middle')})});return s}
function galH(n,lines){lines=lines||2;return 8+Math.ceil(n/2)*(86+lines*14+8)}
/* marshalling-style tiles, three per row: drawing(cx,baseY), headline, qualifier */
function mgal(list,lab){return list.map(function(t,i){var x=8+(i%3)*104,y=8+Math.floor(i/3)*138;return'<rect x="'+x+'" y="'+y+'" width="96" height="130" rx="8" class="panel"/><rect x="'+(x+4)+'" y="'+(y+4)+'" width="88" height="92" rx="5" fill="'+SKY+'"/>'
  +t[0](x+48,y+92)+T(x+48,y+112,lab[i][0],'t1','middle')+T(x+48,y+125,lab[i][1],'t2','middle')}).join('')}
function mgH(n){return 8+Math.ceil(n/3)*138}
/* a light-signal row: picture (tower, aircraft in flight above, on the ground below), then the two meanings */
var NAVY='#16284A';
function towerB(x,y){return'<path d="M'+x+' '+y+'V'+(y-30)+'" stroke="#4F5D7A" stroke-width="4"/><path d="M'+(x-10)+' '+(y-30)+'H'+(x+10)+'L'+(x+7)+' '+(y-38)+'H'+(x-7)+'Z" fill="#4F5D7A"/><path d="M'+(x-12)+' '+(y-40)+'H'+(x+12)+'L'+x+' '+(y-46)+'Z" fill="#4F5D7A"/>'}
function beamB(x1,y1,x2,y2,c,fl){return'<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" stroke="'+c+'" stroke-width="'+(c==='#ffffff'?3:4)+'"'+(fl?' stroke-dasharray="6 4"':'')+(c==='#ffffff'?' style="filter:drop-shadow(0 0 .8px #333)"':'')+'/>'}
function lrow(y,name,col,kind,air,gnd){var s='<rect x="8" y="'+(y+18)+'" width="140" height="86" rx="5" fill="'+SKY+'"/><path d="M8 '+(y+98)+'H148V'+(y+104)+'H8Z" fill="#4F5D7A"/>'+towerB(26,y+98)+T(8,y+12,name,'t1')
  +dbSide(122,y+42,.5,'k').replace('class="fk"','fill="'+NAVY+'"')+(gnd?dbSide(122,y+92,.5,'k').replace('class="fk"','fill="'+NAVY+'"'):'');
 if(kind==='flare')s+='<path d="M34 '+(y+52)+'Q54 '+(y+30)+' 72 '+(y+48)+'" stroke="'+col+'" stroke-width="1.4" fill="none"/><circle cx="74" cy="'+(y+56)+'" r="8" fill="'+col+'"/>';
 else s+=beamB(36,y+58,96,y+44,col,kind==='flash')+(gnd?beamB(36,y+62,96,y+90,col,kind==='flash'):'');
 s+=T(158,y+34,'In the air','t2 ta');air.forEach(function(t,k){s+=T(158,y+48+k*13,t,'t2')});
 if(gnd){s+=T(158,y+82,'On the ground','t2 ta');gnd.forEach(function(t,k){s+=T(158,y+96+k*13,t,'t2')})}
 return s}

var M1L=[['Next marshaller','point to them'],['Move ahead','beckon up, back'],['Turn to port','right arm down'],['Turn starboard','left arm down'],['Stop','crossed overhead'],['Start engine','circle, point'],['Chocks in','swing inwards'],['Chocks away','swing outwards'],['Cut engine','hand at throat']];
var M2L=[['Slow down','patting down'],['Slow one side','pat that side'],['This bay','arms vertical'],['Release brakes','fist, then open'],['Engage brakes','open, then fist'],['All clear','arm up, palm out'],['Start engine 2','circle, 2 up'],['Back tail','to starboard'],['Back tail','to port']];
var MHL=[['Hover','arms out'],['Land','crossed low'],['Move up','palms up'],['Move down','palms down'],['Move sideways','sweep across'],['Move back','sweep up'],['Release load','slice under arm']];
var MPL=[['Brakes on','fingers, then fist'],['Brakes off','fist, then fingers'],['Insert chocks','hands in, cross'],['Remove chocks','hands out'],['Ready to start','fingers = engine'],['Engine numbers','no. 1 port outer']];
var MEL=[['Evacuate','beckon backwards'],['Stop','wrists crossed'],['Contained','sweep in, low'],['Fire','fan, point at it']];

var F=[
/* 1 */['Aeronautical light beacons',320,232,
  [['Aerodrome beacon','white, white',[[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W]]],['Aerodrome beacon','white, green',[[10,W],[10,G],[10,W],[10,G],[10,W],[10,G],[10,W],[10,G],[10,W],[10,G]]],
   ['Identification','green Morse: civil',morse('-.. .-   -.. .-',G)],['Identification','red Morse: military',morse('-.. .-   -.. .-',Rd)]].map(function(r,i){var y=10+i*56,x=146,tot=r[2].reduce(function(a,p){return a+p[0]+4},0),k=Math.min(1,158/tot),s='<rect x="140" y="'+y+'" width="172" height="40" rx="6" fill="'+NAVY+'"/>';
   r[2].forEach(function(p){if(p[1]!=='transparent')s+='<rect x="'+n(x)+'" y="'+(y+16)+'" width="'+n(p[0]*k)+'" height="8" rx="2" fill="'+p[1]+'"/>';x+=(p[0]+4)*k});
   return s+T(8,y+17,r[0],'t1')+T(8,y+32,r[1],'t2')}).join('')
  +T(226,234-4,'flashes over a few seconds','t2','middle'),
  'Aerodrome beacons flash alternately white and white (or white and green). Identification beacons flash a two-letter Morse group about every 12 s: green at civil aerodromes, red at military ones.'],
/* 2 */['Taxiing: who gives way (1 and 2)',320,206,
  '<rect x="8" y="8" width="148" height="190" rx="8" class="panel"/><rect x="164" y="8" width="148" height="190" rx="8" class="panel"/>'
  +T(82,28,'Landing traffic','t1','middle')+T(82,42,'goes first','t2','middle')
  +'<path d="M14 64H150V84H14Z" fill="var(--ink-3)"/><path d="M20 74H144" stroke="var(--surface)" stroke-dasharray="6 5"/><path d="M96 84H116V190H96Z" fill="var(--ink-3)" opacity=".6"/><path d="M96 100H116" stroke="#f2c14a" stroke-width="2.5" stroke-dasharray="4 2"/>'
  +plane(36,74,90,'k',.9)+AR('M52 74H86',78,74,88,74,'k',1.4)+T(60,60,'landing','t2')+plane(106,140,0,'a',.9)+T(90,132,'you stop','t2 ta','end')+T(90,146,'and give way','t2 ta','end')
  +T(238,28,'Head-on','t1','middle')+T(238,42,'both stop or turn right','t2','middle')
  +plane(190,130,90,'a',.9)+plane(286,110,-90,'k',.9)+AR('M202 130Q226 132 232 162',230,154,232,166,'a',1.4)+AR('M274 110Q250 108 244 78',246,86,244,74,'k',1.4)
  +T(232,182,'turns right','t2 ta','middle')+T(250,64,'turns right','t2','middle'),
  'Whatever ATC says, avoiding a collision on the ground is up to you. Aircraft taxiing give way to aircraft taking off or landing. Head-on, or nearly so, both stop or, where practicable, turn right.'],
/* 3 */['Taxiing: who gives way (3 and 4)',320,206,
  '<rect x="8" y="8" width="148" height="190" rx="8" class="panel"/><rect x="164" y="8" width="148" height="190" rx="8" class="panel"/>'
  +T(82,28,'Converging','t1','middle')+plane(124,78,-90,'k',.9)+AR('M110 78H48',58,78,46,78,'k',1.4)+T(82,64,'right of way','t2','middle')
  +plane(44,170,0,'a',.9)+AR('M44 156V132',44,140,44,128,'a',1.4,'4 3')+T(62,150,'other on','t2 ta')+T(62,164,'your right:','t2 ta')+T(62,178,'you give way','t2 ta')
  +T(238,28,'Overtaking','t1','middle')+plane(232,78,-90,'k',.9)+AR('M218 78H184',194,78,182,78,'k',1.4)+T(240,60,'right of way','t2','middle')
  +plane(296,150,-90,'a',.9)+AR('M282 150Q252 150 244 120Q238 102 206 100',214,100,202,100,'a',1.4,'4 3')+T(238,174,'you overtake:','t2 ta','middle')+T(238,188,'keep well clear','t2 ta','middle'),
  'Converging: the one that has the other on its right gives way and must not cross ahead unless well clear. The aircraft being overtaken has right of way; the overtaker keeps well clear.'],
/* 4 */['TORA, TODA and clearway',320,186,
  '<path d="M8 128H312V170H8Z" class="gnd"/><path d="M14 124H206V130H14Z" fill="var(--ink-3)"/>'+treeB(288,128,1.1)+treeB(302,128,.9)
  +dbSide(40,118,.5,'a')+L('M60 116Q160 112 206 104Q232 99 250 94','s2',1.2,'4 3')
  +guide(14,52,150)+guide(206,52,150)+guide(270,30,150)
  +dimB(14,206,64,'TORA','k')+dimB(206,270,42,'clearway','a')+dimB(14,270,150,'TODA = TORA + clearway','a',true)
  +T(312,80,'first','t2','end')+T(312,94,'obstruction','t2','end'),
  'TORA, take-off run available, is the runway length declared for the take-off run. The clearway is the area beyond it, up to the first significant obstruction, that you can climb over. TODA = TORA + clearway.'],
/* 5 */['ASDA with and without a stopway',320,224,
  T(8,18,'No stopway','t1')+T(86,18,'ASDA = TORA','t2')
  +'<path d="M8 66H312V90H8Z" class="gnd"/><path d="M14 62H206V68H14Z" fill="var(--ink-3)"/>'+dbSide(40,56,.5,'a')
  +guide(14,28,96)+guide(206,28,96)+dimB(14,206,40,'TORA','k')+dimB(14,206,86,'ASDA','m',true)
  +L('M8 116H312','s2',1,'2 3')+T(8,138,'With a stopway','t1')
  +'<path d="M8 184H312V212H8Z" class="gnd"/><path d="M14 180H200V186H14Z" fill="var(--ink-3)"/><path d="M200 180H262V186H200Z" class="fm" opacity=".6"/>'+treeB(292,184,1)+treeB(306,184,.8)+dbSide(40,174,.5,'a')
  +guide(14,146,212)+guide(200,146,212)+guide(262,146,212)+dimB(14,200,160,'TORA','k')+dimB(200,262,160,'stopway','m')+dimB(14,262,204,'ASDA = TORA + stopway','m',true),
  'ASDA, accelerate-stop distance available, is where you can stop after abandoning a take-off. A stopway is prepared ground beyond the runway for this; with none, ASDA is the same as TORA.'],
/* 6 */['Landing distance available (LDA)',320,160,
  '<path d="M8 112H312V140H8Z" class="gnd"/><path d="M70 108H290V114H70Z" fill="var(--ink-3)"/>'
  +AR('M14 32Q50 74 70 88',62,82,70,89,'a',1.6,'5 3')+dbSide(276,102,.5,'a')
  +L('M70 64H14','s2',1,'3 3')+AR('M40 80V68',40,72,40,66,'k',1.2)+AR('M40 92V104',40,100,40,106,'k',1.2)+T(34,90,'50 ft','t1','end')
  +guide(70,60,140)+guide(290,60,140)+dimB(70,290,132,'LDA','g',true)+T(76,58,'threshold','t2'),
  'LDA is the runway length declared suitable for the landing ground run, measured from the threshold. Landing performance figures assume you cross the threshold at 50 ft.'],
/* 7 */['Reading a SNOWTAM, third by third',320,196,
  T(160,18,'EGGP 03150045 09 2/5/5','t2','middle')+T(160,32,'50/75/75 04/NR/NR SLUSH/WET/WET','t2','middle')
  +T(160,54,'Each third reported separately','t1','middle')
  +[[22,'code 2','50%, 4 mm','slush','first third'],[114,'code 5','75%, depth NR','wet','second third'],[206,'code 5','75%, depth NR','wet','last third']].map(function(r){var x=r[0];
   return'<rect x="'+x+'" y="66" width="92" height="64" rx="6" fill="var(--surface-2)" stroke="var(--line-2)"/>'+T(x+46,86,r[1],'t1','middle')+T(x+46,101,r[2],'t2','middle')+T(x+46,116,r[3],'t2','middle')+T(x+46,148,r[4],'t2','middle')}).join('')
  +T(12,102,'09','t1','middle')+T(308,102,'27','t1','middle')+AR('M22 164H130',120,164,132,164,'a',1.4)+T(140,168,'counted from 09','t2 ta')
  +T(160,188,'codes: 0 worst, 6 best','t2','middle'),
  'Assessed 15 March at 00:45. Each third gets its own runway condition code, coverage, depth and description, counted from the end with the lower runway number. NR means not reported. A third counts as contaminated when more than 25% of it is covered.'],
/* 8 */['Threshold, edge and end lights',320,186,
  '<path d="M64 60H272V110H64Z" fill="var(--ink-3)"/><path d="M74 85H262" stroke="var(--surface)" stroke-dasharray="8 6"/>'
  +[0,1,2,3,4,5].map(function(k){var y=64+k*8.4;return'<circle cx="68" cy="'+y+'" r="3" fill="#2FA84F"/><circle cx="268" cy="'+y+'" r="3" fill="#E0262B"/>'}).join('')
  +[0,1,2,3,4,5,6,7].map(function(k){var x=84+k*25;return'<circle cx="'+x+'" cy="56" r="2.6" fill="#fff" stroke="var(--ink)" stroke-width=".6"/><circle cx="'+x+'" cy="114" r="2.6" fill="#fff" stroke="var(--ink)" stroke-width=".6"/>'}).join('')
  +plane(24,85,90,'a',1.1)+T(168,44,'edge lights: white','t2','middle')
  +AR('M60 136H34',42,136,32,136,'g',1.6)+T(66,140,'threshold: green','t1 tg')+T(66,154,'seen from the approach','t2')
  +AR('M276 166H250',258,166,248,166,'r',1.6)+T(244,170,'end: red','t1 tr','end'),
  'Threshold lights are steady green, seen from the approach: the runway starts here. Runway end lights are steady red, seen along the runway: it ends here. White edge lights line both sides. Arrows show which way each set shines.'],
/* 9 */['Obstacle lighting',320,214,
  '<path d="M8 178H312V206H8Z" class="gnd"/>'+L('M8 104H312','sr',1,'4 3')+T(312,98,'45 m','t1 tr','end')
  +'<path d="M28 178V140H74V178Z" class="bld"/><circle cx="51" cy="140" r="4" fill="#E0262B"/>'+T(51,124,'one red','t2','middle')+T(51,196,'under 45 m','t2','middle')
  +'<path d="M104 178V56H170V178Z" class="bld"/>'+[[104,56],[137,56],[170,56],[104,104],[170,104],[104,150],[170,150]].map(function(p){return'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" fill="#E0262B"/>'}).join('')
  +T(137,28,'red lights','t2','middle')+T(137,42,'outline it','t2','middle')+T(137,196,'over 45 m','t2','middle')
  +[0,1,2,3,4,5,6,7].map(function(k){return'<path d="M'+(236-k*.8)+' '+(50+k*16)+'H'+(252+k*.8)+'V'+(66+k*16)+'H'+(236-k*.8)+'Z" fill="'+(k%2?'#ffffff':'#E0262B')+'" stroke="#4F5D7A" stroke-width=".6"/>'}).join('')
  +T(244,196,'mast by day:','t2','middle')+T(286,40,'red and','t2','middle')+T(286,54,'white bands','t2','middle'),
  'At night an obstacle up to 45 m tall has a single steady red light on top; anything taller has extra red lights outlining it. By day tall obstacles may be painted in red (or orange) and white bands. Obstacles within 15 km of an aerodrome are normally lit.'],
/* 10 */['Direction of take-off and landing',320,galH(4),
  gal([[sT(false),'Landing T','land towards cross-arm'],[sT(true),'T with a disc','directions may differ'],[mBall(1,'#111'),'Black ball (mast)','directions may differ',true],
       [function(cx,cy){return sT(false)(cx+4,cy)+'<path d="M'+(cx+52)+' '+(cy-26)+'H'+(cx-34)+'" stroke="#E8EDF6" stroke-width="1.6"/><path d="M'+(cx-40)+' '+(cy-26)+'l8-4v8z" fill="#E8EDF6"/>'},'Reading the T','land this way: ←']]),
  'Land and take off parallel with the shaft of the T, towards the cross-arm, unless ATC say otherwise. A disc at the head of the T, or a black ball on the mast, means landing and take-off may be in different directions.'],
/* 11 */['Use hard surfaces only',320,galH(2),
  gal([[sDb(false),'Dumb-bell','land, take off, taxi|on hard surfaces only'],[sDb(true),'Black strips on discs','land, take off on runway|taxiing may use grass']],3),
  'Plain dumb-bell: keep to paved, metalled or similar hard surfaces on the ground. Black strips across the discs: take off and land on a runway, but taxiing need not be on hard surfaces.'],
/* 12 */['Light aircraft areas',320,galH(2,3),
  gal([[sL,'White L','light aircraft area|only'],[sDb(false,true,true),'Red L on dumb-bell','light aircraft: runway|or white-L area']],3),
  'A white L marks part of the manoeuvring area for light aircraft only. A red L on the dumb-bell lets light aircraft use a runway or the white-L area.'],
/* 13 */['A signals area (example)',320,196,
  '<path d="M20 10H300V186H20Z" fill="'+Pn+'"/><path d="M30 20H290V176H30Z" fill="none" stroke="'+Wh+'" stroke-width="3"/>'
  +'<path d="M54 52H118M70 40V64M102 40V64" stroke="'+Wh+'" stroke-width="5"/>'+'<path d="M140 44H200" stroke="'+Wh+'" stroke-width="5"/>'
  +'<path d="M216 40H270V134" stroke="'+Re+'" stroke-width="8" fill="none"/><path d="M216 40H270V134" stroke="'+Ye+'" stroke-width="8" stroke-dasharray="6 6" fill="none"/><path d="M260 132L270 148L280 132Z" fill="'+Re+'"/>'
  +'<circle cx="160" cy="112" r="34" fill="#454b55" stroke="'+Wh+'" stroke-width="2"/><path d="M134 108H178V116H134Z" fill="'+Wh+'"/><path d="M178 92H186V132H178Z" fill="'+Wh+'"/>'
  +'<rect x="44" y="118" width="44" height="40" fill="'+Re+'"/><path d="M46 156L86 120" stroke="'+Ye+'" stroke-width="5"/>'
  +wt(86,82,'gliding','middle')+wt(170,32,'dumb-bell','middle')+wt(262,100,'right-hand','end')+wt(262,114,'circuit','end')+wt(160,166,'land towards cross-arm','middle')+wt(66,110,'special care','middle'),
  'A real signals area combines several signals: here special precautions, gliding in progress, a right-hand circuit, and a T showing the landing direction. The dumb-bell is not in use.'],
/* 14 */['Right-hand circuit',320,galH(3),
  gal([[sArrow,'Striped arrow','right-hand circuit'],[mFlag('#2f9d4c'),'Green flag (mast)','right-hand circuit',true],[mFlag(Re),'Red flag (mast)','left-hand circuit',true]]),
  'Turns before landing and after take-off are to the right. Where the circuit direction changes, the flag shows which: the colours match the nav lights (red port, green starboard).'],
/* 15 */['Special precautions and landing prohibited',320,galH(2),
  gal([[sSq(false),'Yellow diagonal','take special care'],[sSq(true),'Yellow cross','landing prohibited']]),
  'One diagonal on a red square: the manoeuvring area is in poor condition, so take special care on approach and landing. A diagonal cross: landing is prohibited, probably for some time.'],
/* 16 */['Helicopter operations markers',320,164,
  '<rect x="8" y="8" width="148" height="148" rx="8" class="panel"/><rect x="164" y="8" width="148" height="148" rx="8" class="panel"/>'
  +'<path d="M66 30H76V102H66ZM96 30H106V102H96ZM76 61H96V71H76Z" fill="#fff" stroke="var(--ink)" stroke-width="1"/>'
  +L('M44 30V102M39 30H49M39 102H49','sk',1.2)+T(36,70,'2 m','t1','end')+L('M66 116H106M66 111V121M96 111V121','sk',1.2)+T(86,134,'1 m','t2','middle')
  +T(82,150,'signals area','t2','middle')+T(120,26,'20 cm','t2')
  +'<path d="M218 26H232V104H218ZM244 26H258V104H244ZM232 58H244V72H232Z" fill="#fff" stroke="var(--ink)" stroke-width="1"/>'
  +L('M198 26V104M193 26H203M193 104H213','sk',1.2)+T(190,70,'6 m','t1','end')+L('M218 116H258M218 111V121M258 111V121','sk',1.2)+T(238,134,'3 m','t2','middle')
  +T(238,150,'helicopter area','t2','middle')+T(266,22,'1 m','t2'),
  'A white H in the signals area means helicopters take off and land only in the designated helicopter area, which is marked by a much larger white H.'],
/* 17 */['Gliding in progress',320,galH(3),
  gal([[sDx,'Double white cross','gliding in progress'],[mBall(2,Re),'Two red balls (mast)','gliding in progress',true],[sYp,'Yellow cross','tow-rope dropping area']]),
  'A double white cross and/or two red balls on the mast mean glider flying is taking place. The yellow cross marks where tow-ropes are dropped.'],
/* 18 */['Unfit sections of runway or taxiway',320,galH(3),
  gal([[sX(Wh,2),'White crosses','runway section unfit'],[sX(Ye,2),'Yellow crosses','taxiway section unfit'],[sBoard,'Orange/white boards','edge of unfit area',true]]),
  'Crosses with arms at 45° to the centreline, no more than 300 m apart, close a section. Orange-white-orange boards no more than 15 m apart edge an unfit paved area.'],
/* 19 */['Holding point and holding position sign',320,212,
  '<path d="M8 20H312V56H8Z" fill="var(--ink-3)"/>'+T(160,42,'RUNWAY','t1','middle').replace('class="t1"','class="t1" style="fill:var(--surface);stroke:none"')+'<path d="M134 56H170V206H134Z" fill="var(--ink-3)"/>'
  +'<path d="M134 82H170M134 88H170" stroke="#f2c14a" stroke-width="2.4" stroke-dasharray="5 4"/><path d="M134 96H170M134 102H170" stroke="#f2c14a" stroke-width="2.4"/>'
  +'<path d="M152 56V206" stroke="#f2c14a" stroke-width="1.4"/>'+plane(152,170,0,'a',1.1)+AR('M152 154V128',152,136,152,124,'a',1.4)
  +'<path d="M64 112V128M118 112V128" stroke="var(--ink-2)" stroke-width="2"/><rect x="44" y="88" width="24" height="24" fill="#111"/><rect x="68" y="88" width="58" height="24" fill="#d8312c"/>'
  +'<text x="56" y="105" text-anchor="middle" style="font:700 13px var(--f-body);fill:#f2c14a;stroke:none">A</text><text x="97" y="105" text-anchor="middle" style="font:700 13px var(--f-body);fill:#fff;stroke:none">09-27</text>'
  +T(85,146,'holding position','t2','middle')+T(85,160,'sign','t2','middle')
  +T(180,78,'Broken lines','t1')+T(180,92,'runway side','t2')+T(180,112,'Continuous lines','t1')+T(180,126,'stop unless cleared','t2')
  +T(124,190,'taxiing out','t2 ta','end'),
  'Taxiing out you meet the continuous lines first: stop there unless cleared. Leaving the runway you meet the broken lines first and need no clearance to cross them. The sign shows taxiway A (yellow on black) and runway 09-27 (white on red, mandatory).'],
/* 20 */['Boundary and runway markers',320,galH(5),
  gal([[sWedge,'Orange/white wedges','aerodrome boundary',true],[sOWflag,'Flags with wedges','unserviceable ground',true],[sRwyT,'White T','left of runway in use'],
       [sDanger(false),'Cross at each end','landing dangerous'],[sDanger(true),'Cross and bar','emergency use only']]),
  'Wedges no more than 45 m apart mark the aerodrome boundary; alternating with flags they mark unserviceable ground. A white cross at each end of a runway means landing there is dangerous; a cross and bar at a disused aerodrome means emergency use only.'],
/* 21 */['Normal and displaced threshold markings',320,250,
  strip(8,'n','Normal','09 = 090°')+strip(54,'pa','Permanent','arrows')+strip(100,'px','Permanent','crosses')+strip(146,'ta','Temporary','arrows')+strip(192,'tx','Temporary','crosses')
  +AR('M10 240H58',50,240,62,240,'a',1.4)+T(68,244,'landing','t2 ta')+T(176,244,'pre-threshold','t2','middle')+T(276,244,'new threshold','t2','middle'),
  'Landing direction is left to right; 09 is the runway designator (090°). Permanent displacement: a threshold bar and piano keys further up the runway. Temporary: chevrons mark the new threshold. Arrows: taxi and take off in the pre-threshold area but do not land there. Crosses: unfit for aircraft, no more than 300 m apart.'],
/* 22 */['Signals seen only on the ground',320,galH(6),
  gal([[mBall(1,'#111'),'Black ball','directions may differ',true],[mBall(2,Re),'Two red balls','gliding in progress',true],[mFlag(null,true),'Chequered flag','move only with ATC OK',true],
       [mFlag(Re),'Red flag','left-hand circuit',true],[mFlag('#2f9d4c'),'Green flag','right-hand circuit',true],[sC,'Black C on yellow','report to ATC here',true]]),
  'Mast signals are hoisted for aircraft on the ground. The C board stands away from the signals area, where you report to ATC or the aerodrome authority.'],
/* 23 */['From ATC to aircraft: red signals',320,350,
  lrow(6,'Steady red','#E0262B','steady',['Give way to others','and keep circling'],['Stop'])
  +lrow(120,'Flashing red','#E0262B','flash',['Aerodrome unsafe:','do not land'],['Taxi clear of the','landing area'])
  +lrow(234,'Red flare','#E0262B','flare',['Do not land for','the time being'],null),
  'Each signal has one meaning for an aircraft in the air and, for most, another on the ground. A red flare overrides any earlier instruction: do not land for the time being.'],
/* 24 */['From ATC to aircraft: green and white signals',320,350,
  lrow(6,'Flashing green','#2FA84F','flash',['Come back and wait','for permission to land'],['Cleared to taxi','if no collision risk'])
  +lrow(120,'Steady green','#2FA84F','steady',['Cleared to land','if no collision risk'],['Cleared to take off','if no collision risk'])
  +lrow(234,'Flashing white','#ffffff','flash',['Land after steady green,','then wait for taxi signal'],['Return to your','starting point']),
  'Flashing green means "come back" in the air but "taxi" on the ground; steady green means land, or take off. Flashing white: land here after a steady green, then go to the apron on flashing green.'],
/* 25 */['From aircraft to ATC',320,350,
  [[6,'Lights on and off',['I am compelled','to land'],0],[120,'Red flare',['I need immediate','assistance'],1],[234,'Green flare',['Night: may I land?','Day: may I land in a','different direction?'],2]].map(function(r){var y=r[0],i=r[3],s='<rect x="8" y="'+(y+18)+'" width="140" height="86" rx="5" fill="'+SKY+'"/><path d="M8 '+(y+98)+'H148V'+(y+104)+'H8Z" fill="#4F5D7A"/>'+towerB(26,y+98)+T(8,y+12,r[1],'t1');
   if(i===0)s+='<g transform="translate(100 '+(y+56)+') scale(1.5)"><path d="'+DB_PL+'" fill="'+NAVY+'"/></g><circle cx="82" cy="'+(y+54)+'" r="4.5" fill="#E0262B"/><circle cx="118" cy="'+(y+54)+'" r="4.5" fill="#2FA84F"/><circle cx="100" cy="'+(y+40)+'" r="3.5" fill="#fff59a" stroke="#888" stroke-width=".5"/>';
   else s+=dbSide(122,y+56,.5,'k').replace('class="fk"','fill="'+NAVY+'"')+'<path d="M104 '+(y+52)+'Q86 '+(y+30)+' 66 '+(y+46)+'" stroke="'+(i===1?'#E0262B':'#2FA84F')+'" stroke-width="1.4" fill="none"/><circle cx="64" cy="'+(y+48)+'" r="9" fill="'+(i===1?'#E0262B':'#2FA84F')+'"/>';
   s+=T(158,y+34,'Meaning','t2 ta');r[2].forEach(function(t,k){s+=T(158,y+48+k*13,t,'t2')});return s}).join(''),
  'Few light aircraft carry flares, but you can always switch the landing or navigation lights on and off to say you are compelled to land. Green flare by day: may I land in a direction different from the one shown?'],
/* 26 */['Marshaller to pilot (1)',320,mgH(9),mgal(M1,M1L),
  'The marshaller faces you, so their right arm is on your left. Bats by day, lit wands at night. Dashed lines and arrows show the movement. Cut engine: hand drawn across the throat.'],
/* 27 */['Marshaller to pilot (2)',320,mgH(9),mgal(M2,M2L),
  'Brakes: fist then fingers is release, fingers then fist is engage. All clear is the right arm raised at the elbow, palm forward. Slow down is a patting movement.'],
/* 28 */['Helicopter marshalling signals',320,mgH(7),mgal(MH,MHL),
  'Only used for helicopters. Hover: arms out sideways. Land: arms crossed low in front. The speed of the arm movement shows the rate of climb or descent.'],
/* 29 */['Pilot to marshaller',320,mgH(6),mgal(MP,MPL),
  'Made from the cockpit so the marshaller can see. For a multi-engine aircraft, number 1 is the port outer engine, counted from the marshaller\'s right.'],
/* 30 */['Standard emergency hand signals',320,mgH(4),mgal(ME,MEL),
  'Given by the fire and rescue crew to the flight crew: recommend evacuation, recommend stop, emergency contained, and fire. At night the same signals are made with wands.']
];
var SEC=['Aeronautical light beacons','Right of way on the ground','Right of way on the ground','Declared distances','Declared distances','Declared distances','Runway surface condition','Runway lights','Obstacle lights',
 'Signals area: direction','Signals area: direction','Signals area: direction','Signals area: direction','Signals area: circuit','Signals area: circuit','Signals area: circuit','Signals area: circuit',
 'Signals on paved','Signals on paved','Markers on unpaved','Displaced thresholds','Signals seen only on the ground','Light signals from ATC','Light signals from ATC','Light signals from aircraft',
 'Marshalling signals: marshaller','Marshalling signals: marshaller','Marshalling signals: helicopters','Signals from pilot','Emergency hand signals'];
DSEC['Aerodromes']=F.map(function(f,i){return[SEC[i],dbFig(f[0],f[1],f[2],f[3],f[4])]});
})();
