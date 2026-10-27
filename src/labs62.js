/* ===== LABS: randomised fly-and-talk flights ===== */
(function(){
var NATO={A:'Alpha',B:'Bravo',C:'Charlie',D:'Delta',E:'Echo',F:'Foxtrot',G:'Golf',H:'Hotel',I:'India',J:'Juliet',K:'Kilo',L:'Lima',M:'Mike',N:'November',O:'Oscar',P:'Papa',Q:'Quebec',R:'Romeo',S:'Sierra',T:'Tango',U:'Uniform',V:'Victor',W:'Whiskey',X:'X-ray',Y:'Yankee',Z:'Zulu'};
var DG=['zero','one','two','three','four','five','six','seven','eight','nine'];
function sd(n,w){var t=String(n);while(w&&t.length<w)t='0'+t;return t.split('').map(function(c){return c==='.'?'decimal':DG[+c]}).join(' ')}
function thou(n){var t=Math.floor(n/1000),h=Math.round((n%1000)/100);return DG[t]+' thousand'+(h?' '+DG[h]+' hundred':'')+' feet'}
var AIRF=['Kelham','Dunmere','Thornby','Wexley','Corvale','Peldon','Stanmoor','Larkfield','Ollerby','Hexworth','Redmere','Tarnby','Fenmouth','Ashgrove','Ravensby','Quarley','Brindle','Eastcombe','Halworth','Mortlake Vale'];
var FISN=['Scatterby','Northfold','Westmoor','Marlby','Cranwick','Holloway Down'];
function tyShort(t){return t.replace('Cessna one seven two','Cessna 172').replace('Cessna one five two','Cessna 152').replace('Robin D R four hundred','Robin DR400')}
function mkBrief(rows){return rows}
var TYPES=['Piper Warrior','Piper Archer','Cessna one seven two','Cessna one five two','Robin D R four hundred','Grumman Tiger'];
var ACX=['Cessna','Piper','Robin','Tecnam','Grob'];
var PTS=[[[40,255],[355,45]],[[355,255],[45,50]],[[45,55],[355,250]],[[355,50],[45,255]],[[40,160],[360,140]],[[360,150],[40,150]],[[200,265],[200,35]],[[200,35],[200,265]]];
function csign(){var L=shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')).slice(0,4);return{reg:'G-'+L.join(''),full:'Golf '+L.map(function(c){return NATO[c]}).join(' '),sh:'Golf '+NATO[L[2]]+' '+NATO[L[3]],ab:'G-'+L[2]+L[3]}}
function qnhv(){return ri(996,1028)}
function freq(){var f=ri(118,135)+'.'+ri(0,9)+pick(['05','10','15','30','35','40','55','60','65','80','85','90']);return{n:f,s:sd(f)}}
function sqk(){var c;do{c=''+ri(0,7)+ri(0,7)+ri(0,7)+ri(0,7)}while(['7500','7600','7700','7000','0000','1200'].indexOf(c)>=0);return c}
function bearing(x1,y1,x2,y2){return(Math.atan2(x2-x1,-(y2-y1))*180/Math.PI+360)%360}
function compass(b){return['north','north-east','east','south-east','south','south-west','west','north-west'][Math.round(b/45)%8]}
function nmw(n){var w=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty'];return w[Math.min(20,n)]||String(n)}
function mcq(at,o){o.at=at;o.kind='mcq';o.a=0;return o}
function bld(at,o){o.at=at;o.kind='build';return o}
function wrongQ(q){var w;do{w=qnhv()}while(Math.abs(w-q)<3);return w}
function wrongSq(s){var w;do{w=sqk()}while(w===s);return w}
function altSay(a){return thou(a).replace(' feet','')+' feet'}

/* ---------- random cross-country ---------- */
function makeXC(){
 var L=pick(PTS),A=pick(AIRF),B,Z,FIS=pick(FISN),cs=csign(),ty=pick(TYPES),mir=Math.random()<.5;
 do{B=pick(AIRF)}while(B===A);do{Z=pick(AIRF)}while(Z===A||Z===B);
 var s=L[0],e=L[1],P=mkPath([s,e]),len=P.len,fr=.42+Math.random()*.16,m=P.at(len*fr),perp=[-(e[1]-s[1])/len,(e[0]-s[0])/len],off=(Math.random()*2-1)*22,zx=Math.round(m.x+perp[0]*off),zy=Math.round(m.y+perp[1]*off),zr=ri(48,62);
 var din=0,dout=len,k,inside=false;for(k=0;k<=len;k+=1){var pp=P.at(k);var ins=Math.hypot(pp.x-zx,pp.y-zy)<zr;if(ins&&!inside){din=k;inside=true}if(!ins&&inside){dout=k;break}}
 if(!inside||din<130||len-dout<120){return makeXC()}
 var alt=pick([2000,2500,3000]),lvl=Math.max(1500,alt-500),q1=qnhv(),q2=wrongQ(q1),f1=freq(),f2=freq(),sq=sqk(),qfe=ri(990,1024),rw=ri(1,36),rws=rw<10?'0'+rw:''+rw,wd=rw*10,ws=ri(4,15),C=cs.sh,CF=cs.full,rwSay=sd(rws,2);
 function rel(px,py,cx,cy){var b=bearing(cx,cy,px,py),n=Math.max(2,Math.round(Math.hypot(px-cx,py-cy)/10));return{n:n,w:nmw(n),d:compass(b)}}
 var t1=Math.round(len*.07),t2=t1+34,tt=Math.round(len*.2),e3at=Math.max(t2+30,din-42),e3p=P.at(e3at),r3=rel(e3p.x,e3p.y,zx,zy),e5at=dout+6;
 var em=pick(['eng','lost','may']),e8at=len-12,e6at=Math.min(Math.max(dout+32,Math.round(len*.8)),e8at-34),e6p=P.at(e6at),r6=rel(e6p.x,e6p.y,e[0],e[1]);
 var ev=[];
 ev.push(bld(t1,{cap:'Just airborne from '+A+', climbing to '+alt.toLocaleString('en-GB')+' ft',q:'Make your first call to '+FIS+' Information for a Basic Service.',ans:[FIS+' Information',CF,ty,'VFR from '+A+' to '+B,altSay(alt)+', QNH '+sd(q1),'request Basic Service'],bank:['Over','Roger','Mayday'],why:'Who you call, who you are, what you are, where you are going, your level, then what you want. "Over" is not needed in UK practice.'}));
 ev.push(mcq(t2,{cap:'Reply from '+FIS+' Information',who:FIS+' Information',atc:C+', '+FIS+' Information, Basic Service, QNH '+sd(q1)+'.',q:'What is your reply?',opts:['Basic Service, QNH '+sd(q1)+', '+C,'Roger','Basic Service, QNH '+sd(wrongQ(q1))+', '+C,'Wilco, '+C],why:'Read back the service and the altimeter setting. A plain "Roger" does not prove you set the right QNH. ATC shortened your callsign, so you may now do the same.'}));
 if(Math.random()<.6&&tt>t2+20&&tt<e3at-40){var clk=ri(10,13)%12||12,dm=ri(2,5),acx=pick(ACX),ac=ri(4,9)*500;ev.push(mcq(tt,{cap:'Under a Basic Service, still outside controlled airspace',who:FIS+' Information',atc:C+', traffic information, '+nmw(clk)+' o\'clock, '+nmw(dm)+' miles, crossing left to right, a '+acx+', altitude '+altSay(ac).replace(' feet','')+'.',q:'You cannot see it yet. What is your reply?',opts:['Looking out, '+C,'Traffic in sight, '+C,'Roger, '+C+', I will turn left now','Say again the wind, '+C],why:'Say "looking out" until you actually see it, then report "traffic in sight". On a Basic Service the controller does not separate you, so avoiding it is your job.'}))}
 ev.push(bld(e3at,{cap:'About '+r3.n+' NM '+r3.d+' of '+Z+', '+alt.toLocaleString('en-GB')+' ft. Your route crosses the zone.',q:'Ask '+Z+' Approach for a zone transit.',ans:[Z+' Approach',C,ty,r3.w+' miles '+r3.d+' of '+Z,altSay(alt)+', QNH '+sd(q1),'request zone transit, VFR, to '+B],bank:['Mayday','Basic Service','Wilco'],why:'Ask early, well before the boundary, and give position and level. You must not enter Class D until you are cleared.'}));
 ev.push(mcq(e3at+13,{cap:Z+' clears you',who:Z+' Approach',atc:C+', '+Z+' Approach, transit approved, not above '+altSay(lvl)+', '+Z+' QNH '+sd(q2)+', squawk '+sd(sq)+'.',q:'What is the correct readback?',opts:['Transit approved, not above '+altSay(lvl)+', QNH '+sd(q2)+', squawk '+sd(sq)+', '+C,'Roger, '+C,'Not above '+altSay(alt)+', QNH '+sd(q1)+', squawk '+sd(sq)+', '+C,'Squawk '+sd(wrongSq(sq))+', '+C],why:'Read back the clearance, the level restriction, the new QNH and the squawk. You must descend to '+lvl.toLocaleString('en-GB')+' ft, set '+q2+', and set the code '+sq+' before the boundary.'}));
 ev.push(mcq(e5at,{cap:'Leaving the zone',who:Z+' Approach',atc:C+', you are leaving the zone, free to change to '+FIS+' Information '+f1.s+'.',q:'What is your reply?',opts:[FIS+' Information '+f1.s+', '+C,'Roger, bye',Z+' Approach, '+C+', still inside the zone','Squawk seven seven zero zero'],why:'Read back the new frequency and callsign. Once clear you also stop using the zone squawk and set the code the next unit tells you.'}));
 var etxt={
  eng:{cap:'Engine starts running rough, '+(alt-500).toLocaleString('en-GB')+' ft, '+B+' about '+r6.n+' NM ahead. You are not yet in immediate danger.',q:'Transmit an urgency message to '+FIS+' Information.',ans:['Pan-pan, pan-pan, pan-pan',FIS+' Information',CF,ty,'engine running rough','intend to land at '+B,r6.w+' miles '+r6.d+' of '+B+', '+altSay(alt-500)],bank:['Mayday, mayday, mayday','Over','Roger'],why:'PAN PAN is for urgency without immediate danger. Three PANs, station, callsign, type, the problem, your intentions, then position and level.'},
  lost:{cap:'You cannot match the ground to your chart and you are unsure of your position. Fuel and weather are fine.',q:'Transmit an urgency message to '+FIS+' Information.',ans:['Pan-pan, pan-pan, pan-pan',FIS+' Information',CF,ty,'uncertain of position','request position fix','last known position leaving the '+Z+' zone, '+altSay(alt)],bank:['Mayday, mayday, mayday','Over','Wilco'],why:'Being uncertain of position is urgency, not distress. Ask for help early with PAN PAN, say what you know, and ask for a fix. Fly the aircraft, hold a heading and do not descend into the unknown.'},
  may:{cap:'The engine stops at '+(alt-500).toLocaleString('en-GB')+' ft and will not restart. '+B+' is out of glide range. You are in immediate danger.',q:'Transmit a distress message to '+FIS+' Information.',ans:['Mayday, mayday, mayday',FIS+' Information',CF,ty,'engine failure','forced landing ahead',r6.w+' miles '+r6.d+' of '+B+', '+altSay(alt-500)],bank:['Pan-pan, pan-pan, pan-pan','Over','Roger'],why:'MAYDAY is for grave and imminent danger. Fly the aircraft first (best glide, pick a field), then transmit: three MAYDAYs, station, callsign, type, the problem, your intentions, position and level.'}}[em];
 etxt.at=e6at;etxt.kind='build';ev.push(etxt);
 ev.push(mcq(e6at+20,{cap:'While you call, set the transponder',q:'Which squawk shows ATC you have an emergency?',opts:['7700','7600','7500',sq],why:'7700 is general emergency (use it for PAN as well as MAYDAY). 7600 is radio failure, 7500 is unlawful interference. The code from the zone controller is no longer yours to use.'}));
 ev.push(mcq(e8at,{cap:B+' Radio is an air/ground station',who:B+' Radio',atc:C+', '+B+' Radio, runway '+sd(rws,2)+', surface wind '+sd(wd,3)+' degrees '+nmw(ws)+' knots, QFE '+sd(qfe)+', no reported traffic.',q:'What is your reply?',opts:['Runway '+sd(rws,2)+', QFE '+sd(qfe)+', '+C,'Roger',  'Wind '+sd(wd,3)+', '+C,'Cleared to land, '+C],why:'Read back the runway in use and the QFE. A/G radio gives information, not clearances, so you decide for yourself when it is safe to land.'}));
 ev.sort(function(a,b){return a.at-b.at});
 var bgs='<circle cx="'+zx+'" cy="'+zy+'" r="'+zr+'" class="as as-D"/><text x="'+zx+'" y="'+(zy-4)+'" text-anchor="middle" class="lm-t">'+Z+' CTR</text><text x="'+zx+'" y="'+(zy+9)+'" text-anchor="middle" class="lm-t2">Class D, 3500 ft</text><circle cx="'+zx+'" cy="'+zy+'" r="3" class="lm-ap"/>'
  +'<circle cx="'+s[0]+'" cy="'+s[1]+'" r="4" class="lm-ap"/><text x="'+(s[0]+(s[0]>200?-8:8))+'" y="'+(s[1]+(s[1]>150?16:-8))+'" text-anchor="'+(s[0]>200?'end':'start')+'" class="lm-t">'+A+'</text><circle cx="'+e[0]+'" cy="'+e[1]+'" r="4" class="lm-ap"/><text x="'+(e[0]+(e[0]>200?-8:8))+'" y="'+(e[1]+(e[1]>150?16:-8))+'" text-anchor="'+(e[0]>200?'end':'start')+'" class="lm-t">'+B+' (A/G radio)</text>'
  +'<text x="'+(zx>200?30:370)+'" y="'+(zy>150?30:285)+'" text-anchor="'+(zx>200?'start':'end')+'" class="lm-t2">'+FIS+' Information '+f1.n+'</text>';
 var inone=len;
 return{route:[s,e],bg:bgs,alt:'Map of a fictional route from '+A+' to '+B+' crossing the '+Z+' Class D zone',speed:26,
  intro:'You are '+cs.reg+', a '+ty.replace('D R','DR')+', flying VFR from '+A+' grass strip to '+B+'. On the way you cross the '+Z+' Class D zone. Everything here is invented and changes every flight: names, frequencies, settings and the problem you have to deal with. The call structure follows CAP 413 style.',
  cap:function(d){return d<din?'Outside controlled airspace':d<dout?'Inside the '+Z+' zone':'Clear of the zone'},events:ev}}

/* ---------- geometry helpers for runway based flights ---------- */
function tf(hdg,mir){var th=(hdg-270)*Math.PI/180,c=Math.cos(th),s=Math.sin(th);return function(p){var dx=p[0]-200,dy=(mir?300-p[1]:p[1])-150;return[Math.round(200+dx*c-dy*s),Math.round(150+dx*s+dy*c)]}}
function poly(T,pts,cl){return'<path class="'+cl+'" d="'+pts.map(function(p,i){var q=T(p);return(i?'L':'M')+q[0]+' '+q[1]}).join('')+'"/>'}
function rwyEl(T,txt){var a=T([140,150]),b=T([260,150]),m=T([200,150]);return'<path d="M'+a[0]+' '+a[1]+'L'+b[0]+' '+b[1]+'" stroke="var(--ink)" stroke-width="8" fill="none"/>'}
function lab(T,p,t,cls,anc){var q=T(p);return'<text x="'+q[0]+'" y="'+q[1]+'" text-anchor="'+(anc||'middle')+'" class="'+cls+'">'+t+'</text>'}
function rwyPick(){var r=pick([9,27,18,36,4,22,13,31,6,24]);return r}
function rwStr(r){return r<10?'0'+r:''+r}
function rwHdg(r){return r*10}
function wind(r){var d=((r*10+ri(-3,3)*10)+360)%360||360;return{d:d,s:ri(4,14)}}

/* ---------- random circuit ---------- */
function makeCirc(){
 var A=pick(AIRF),cs=csign(),ty=pick(TYPES),r=rwyPick(),hdg=rwHdg(r),right=Math.random()<.5,T=tf(hdg,right),rs=rwStr(r),rsay=sd(rs,2),w=wind(r),qfe=ri(990,1024),C=cs.sh,CF=cs.full,st=A+' Radio',ot=csign(),hazard=pick([0,1]);
 var hand=right?'right':'left',turn=right?'Right':'Left',other=right?'Left':'Right';
 var route=[[260,150],[90,150],[90,210],[320,210],[320,150],[140,150]].map(T);
 var bgs=rwyEl(T)+'<text x="8" y="290" class="lm-t">Runway '+rs+'</text>'+poly(T,[[260,150],[90,150],[90,210],[320,210],[320,150],[260,150]],'lm-ghost')+lab(T,[200,228],'downwind','lm-t2')+lab(T,[76,182],'crosswind','lm-t2','end')+lab(T,[336,184],'base','lm-t2','start')+lab(T,[300,168],'final','lm-t2');
 var ev=[
  bld(0,{cap:'Holding point, ready to line up for circuits',q:'Make your call to '+st+'.',ans:[st,CF,ty,'lining up runway '+rsay,'for circuits'],bank:['Over','Mayday','downwind'],why:'Say who you call, who you are, and what you are about to do. At an A/G station you are not given a clearance, you report intentions.'}),
  mcq(150,{cap:'Upwind, climbing past the end of the runway',q:'This is a '+hand+'-hand circuit. Which way do you turn onto crosswind?',opts:[turn,other,'Continue straight ahead until 2,000 ft','Either, whichever is closer to the village'],why:turn+'-hand means every turn in the circuit is to the '+hand+'. The circuit is flown on the '+hand+' side of the runway as you take off.'}),
  bld(238,{cap:'Turning downwind at 1,000 ft',q:'Make your downwind call.',opt:[st],ans:[st,CF,'downwind runway '+rsay,'touch and go'],bank:['final','base','Roger'],why:'Callsign, position in the circuit, runway and intentions. Once you are in contact you may leave out the station name, though adding it is fine.'}),
  mcq(330,{cap:'Downwind at circuit height with QFE set',q:'Your altimeter is set to QFE. What does it read at circuit height?',opts:['About 1,000 ft','About 1,000 ft plus the airfield elevation','Zero','About 1,013 ft'],why:'QFE makes the altimeter read height above the aerodrome. On QNH it would read elevation plus 1,000 ft.'}),
  mcq(395,{cap:'Abeam the threshold',who:'Another aircraft',atc:ot.sh+', base leg, runway '+rsay+', to land.',q:'You are abeam the threshold and that aircraft is ahead of you. What do you do?',opts:['Look for it, acknowledge, and extend or adjust so you follow it','Turn base now, you were there first','Climb and overfly the other aircraft','Say nothing and continue'],why:'The aircraft ahead in the circuit is the one to follow. Find it by sight, fit in behind and make sure you do not cut across its path.'}),
  bld(525,{cap:'Established on final',q:'Make your final call.',opt:[st],ans:[st,CF,'final runway '+rsay,'touch and go'],bank:['downwind','base','Wilco'],why:'Report final with the runway number. Pilots behind you then know your position and intentions.'}),
  mcq(530,{cap:'Surface wind check',who:st,atc:C+', surface wind '+sd(w.d,3)+' degrees '+nmw(w.s)+' knots, runway '+rsay+', QFE '+sd(qfe)+'.',q:'What is your reply?',opts:['Runway '+rsay+', QFE '+sd(qfe)+', '+C,'Roger','Wind '+sd(w.d,3)+', '+C,'Cleared to land, '+C],why:'Read back the runway and QFE. An A/G station does not give landing clearance.'}),
  mcq(640,{cap:'Short final, about 200 ft',who:st,atc:C+', caution, '+(hazard?'a vehicle is crossing the runway ahead.':'a '+pick(ACX)+' is backtracking on the runway.'),q:'What do you do?',opts:['Go around','Continue and land long','Continue and land short','Select flap up and glide in'],why:'A runway occupied at 200 ft means a go-around. Power on, positive climb, then tell the station what you are doing.'}),
  bld(665,{cap:'Climbing away',q:'Tell '+st+'.',opt:[st],ans:[st,C,'going around'],bank:['Mayday','landing','Roger'],why:'Keep it short. Fly the aircraft first, then transmit.'})];
 var brief=[['Callsign',cs.reg,cs.full],['Aircraft',tyShort(ty),tyShort(ty)!==ty?'say "'+ty+'"':''],['Aerodrome',A+' (air/ground radio)',st],['Runway',rs+', '+hand+'-hand circuit',''],['Circuit','1,000 ft on QFE','']];
 return{brief:brief,route:route,bg:bgs,alt:'Plan view of a '+hand+'-hand circuit for runway '+rs+' at '+A,speed:70,
  intro:'You are '+cs.reg+' at '+A+' (air/ground radio). Runway '+rs+', '+hand+'-hand circuit, circuit height 1,000 ft on QFE. The airfield, runway, circuit side and hazard are different on every flight. You will fly one circuit and end with a go-around.',
  cap:function(d){return d<170?'Upwind':d<230?'Crosswind':d<460?'Downwind':d<520?'Base':'Final'},events:ev}}

/* ---------- random Class D visit (arrival or departure) ---------- */
function makeCtl(mode){
 var arr=mode==='arr',A=pick(AIRF),B=pick(AIRF.filter(function(x){return x!==A})),cs=csign(),ty=pick(TYPES),r=rwyPick(),hdg=rwHdg(r),mir=Math.random()<.5,T=tf(hdg,mir),rs=rwStr(r),rsay=sd(rs,2),w=wind(r),q=qnhv(),C=cs.sh,CF=cs.full,fT=freq(),fG=freq(),side=mir?'right':'left',vd=pick(['left','right']),vp=pick(['Alpha','Bravo','Charlie']);
 var zone='<text x="8" y="290" class="lm-t">Runway '+rs+'</text>'+rwyEl(T)+'<circle cx="200" cy="150" r="110" class="as as-D" style="fill:none"/><text x="200" y="26" text-anchor="middle" class="lm-t2">'+A+' Class D zone</text>';
 if(arr){
  var s0=[316,236],tfName=pick(ACX),route=[s0,[316,150],[250,150],[178,150]].map(T),sp=route[0],b=bearing(200,150,sp[0],sp[1]),nm=Math.max(4,Math.round(Math.hypot(sp[0]-200,sp[1]-150)/10)),dir=compass(b),L=mkPath(route).len,fT2=freq();
  var ev=[
   bld(2,{cap:nm+' NM '+dir+', 2,000 ft QNH '+q,q:'Make your first call to '+A+' Approach.',ans:[A+' Approach',CF,ty,'VFR from '+B,nmw(nm)+' miles '+dir+' of the airfield','two thousand feet QNH '+sd(q),'request joining instructions'],bank:['Mayday','Over','Roger'],why:'Station, callsign, type, route, position, level and what you want. In Class D you must not enter until cleared, so ask well before the boundary.'}),
   mcq(14,{who:A+' Approach',atc:C+', '+A+' Approach, join '+side+' base runway '+rsay+', QNH '+sd(q)+', report field in sight.',q:'What is your reply?',opts:['Join '+side+' base runway '+rsay+', QNH '+sd(q)+', wilco, '+C,'Roger','Base, '+C,'Field in sight, '+C],why:'Read back the join, runway and QNH, and say wilco for the instruction to report. The readback shows you got it right.'}),
   bld(26,{cap:'Field in sight',q:'Make your next call.',ans:[A+' Approach',C,'field in sight'],opt:[A+' Approach'],bank:['final','Mayday','Roger'],why:'Report what you were asked to report. After initial contact the station name may be left out.'}),
   mcq(36,{who:A+' Approach',atc:C+', contact '+A+' Tower '+fT.s+'.',q:'What is your reply?',opts:[A+' Tower '+fT.s+', '+C,'Roger','Wilco, '+A+' Approach','Changing frequency'],why:'Read back the new frequency and callsign. Always read back frequency changes.'}),
   bld(44,{cap:'Now on '+A+' Tower, still on '+side+' base',q:'Make your first call to the Tower.',ans:[A+' Tower',C,side+' base runway '+rsay,'to land'],bank:['downwind','Over','Mayday'],why:'Station, callsign, position and intention. The Tower knows you from Approach, so keep it short.'}),
   mcq(56,{cap:'On '+side+' base. The '+tfName+' ahead is on short final',who:A+' Tower',atc:C+', number two, following the '+tfName+' on short final, surface wind '+sd(w.d,3)+' degrees '+nmw(w.s)+' knots.',q:'What is your reply?',opts:['Number two, following the traffic, '+C,'Cleared to land, '+C,'Wind '+sd(w.d,3)+', '+C,'Roger, number one'],why:'Say that you are number two and following, so that both of you know the sequence. You still have not been cleared to land.'}),
   mcq(100,{cap:'Final. The '+tfName+' has vacated',who:A+' Tower',atc:C+', runway '+rsay+', cleared to land, surface wind '+sd(w.d,3)+' degrees '+nmw(w.s)+' knots.',q:'What is your reply?',opts:['Cleared to land runway '+rsay+', '+C,'Roger, '+C,'Wilco, '+C,'Landing, '+C],why:'Always read back a landing clearance with the runway. "Roger" is not enough for any clearance on or near the runway.'}),
   mcq(L-6,{cap:'Landed and decelerating',who:A+' Tower',atc:C+', vacate '+vd+' at '+vp+', then contact Ground '+fG.s+'.',q:'What is your reply?',opts:['Vacate '+vd+' at '+vp+', Ground '+fG.s+', '+C,'Roger','Wilco','Vacating, '+C],why:'Read back the instruction and the frequency. Do not change frequency until you are clear of the runway.'})];
  var bgz=zone+poly(T,[[316,236],[316,150]],'lm-ghost')+lab(T,[336,196],'base','lm-t2','start')+poly(T,[[190,150],[190,176]],'lm-ghost');
  var brief=[['Callsign',cs.reg,cs.full],['Aircraft',tyShort(ty),tyShort(ty)!==ty?'say "'+ty+'"':''],['Route','VFR '+B+' to '+A,''],['Altitude','2,000 ft',''],['QNH',String(q),''],['Approach',A+' Approach','']];
  return{brief:brief,route:route,bg:bgz,alt:'Plan view of an approach to runway '+rs+' at '+A,speed:42,
   intro:'You are '+cs.reg+' inbound to '+A+', a Class D aerodrome with Approach and Tower. You will call Approach, join '+side+' base, change to Tower and be cleared to land. The aerodrome, runway and frequencies change every time you fly.',
   cap:function(d){return d<86?side.charAt(0).toUpperCase()+side.slice(1)+' base':d<152?'Final':'Landing roll'},traffic:mkTraffic(T,aheadOnFinal(),tfName),events:ev}}
 var route=[[200,235],[200,190],[262,190],[262,150],[40,150]].map(T),Lx=mkPath(route).len,dpt=pick(['Alpha','Bravo','Charlie']),fT3=freq();
 var ev2=[
  bld(2,{cap:'At the apron, engine running, QNH noted',q:'Ask '+A+' Ground for taxi.',ans:[A+' Ground',CF,ty,'at the apron','VFR to '+B+', request taxi'],bank:['Mayday','Over','Wilco'],why:'Station, callsign, type, location and request. Include the destination and the rules (VFR).'}),
  mcq(Math.round(Lx*.08),{who:A+' Ground',atc:C+', taxi to holding point '+dpt+', runway '+rsay+', QNH '+sd(q)+'.',q:'What is your reply?',opts:['Taxi to holding point '+dpt+', runway '+rsay+', QNH '+sd(q)+', '+C,'Roger','Taxiing, '+C,'Wilco, '+C],why:'Read back the holding point, runway and QNH.'}),
  mcq(Math.round(Lx*.4),{cap:'At holding point '+dpt,who:A+' Ground',atc:C+', hold position, then contact '+A+' Tower '+fT.s+' when ready.',q:'What is your reply?',opts:['Hold position, '+A+' Tower '+fT.s+', '+C,'Roger','Wilco','Ready'],why:'Read back both the hold instruction and the new frequency. You stay where you are until the Tower instructs you.'}),
  bld(Math.round(Lx*.42),{cap:'Now on '+A+' Tower',q:'Tell the Tower you are ready.',ans:[A+' Tower',C,'holding point '+dpt,'ready for departure'],bank:['final','Mayday','Over'],why:'Station, callsign, where you are and what you want. Do not say you are lining up until you are told to.'}),
  mcq(Math.round(Lx*.46),{who:A+' Tower',atc:C+', line up and wait runway '+rsay+'.',q:'What is your reply?',opts:['Line up and wait runway '+rsay+', '+C,'Cleared for take-off, '+C,'Roger','Taking off'],why:'Read back the runway-related instruction. Line up and wait does not allow you to take off.'}),
  mcq(Math.round(Lx*.6),{cap:'Lined up on the runway',who:A+' Tower',atc:C+', surface wind '+sd(w.d,3)+' degrees '+nmw(w.s)+' knots, runway '+rsay+', cleared for take-off.',q:'What is your reply?',opts:['Cleared for take-off runway '+rsay+', '+C,'Roger, '+C,'Wilco','Rolling'],why:'Read back the take-off clearance with the runway. Never take off on a clearance you have not read back.'}),
  mcq(Lx-8,{cap:'Climbing out, 1,000 ft',who:A+' Tower',atc:C+', report leaving the zone to the '+compass(bearing(200,150,route[route.length-1][0],route[route.length-1][1]))+'.',q:'What is your reply?',opts:['Wilco, '+C,'Roger, '+C,'Affirm','Leaving the zone'],why:'Use "wilco" when you will comply with an instruction later. "Roger" only says you have received it.'})];
 var tx=poly(T,[[200,250],[200,190],[262,190],[262,154]],'lm-ghost');
 var bgd=zone+tx+lab(T,[208,228],'apron','lm-t2','start')+lab(T,[272,200],'holding point '+dpt,'lm-t2','start');
 var brief=[['Callsign',cs.reg,cs.full],['Aircraft',tyShort(ty),tyShort(ty)!==ty?'say "'+ty+'"':''],['Route','VFR '+A+' to '+B,''],['Position','at the apron',''],['Ground',A+' Ground','']];
 return{brief:brief,route:route,bg:bgd,alt:'Plan view of the apron, taxiway and runway '+rs+' at '+A,speed:48,
  intro:'You are '+cs.reg+' at the apron at '+A+', ready for a VFR departure to '+B+'. You will call Ground, taxi to the holding point, change to Tower, line up and take off. The aerodrome, runway and frequencies change every time you fly.',
  cap:function(d){return d<Lx*.1?'On the apron':d<Lx*.45?'Taxiing to holding point '+dpt:d<Lx*.52?'Lining up':'Take-off roll and climb-out'},events:ev2}}

function mkTraffic(T,fn,name){return function(d){var p=fn(d);if(!p)return[];var q=fn(d+2)||fn(d-2)||p,a=T(p),b=T(q);var h=(p===q)?0:bearing(a[0],a[1],b[0],b[1]);if(fn(d+2)===null&&fn(d-2)){h=bearing(T(fn(d-2))[0],T(fn(d-2))[1],a[0],a[1])}return[[a[0],a[1],h,name]]}}
/* traffic ahead on final: lands, vacates, gone before you are cleared */
function aheadOnFinal(){return function(d){if(d<0)return null;if(d<56)return[310-d,150];if(d<76)return[254-(d-56)*3.2,150];if(d<89)return[190,150+(d-76)*2];return null}}
/* ---------- granular cross-country: several airspaces, then join, land and taxi ---------- */
var ROUTES=[[[35,260],[200,250],[355,150],[330,40]],[[365,260],[200,240],[60,140],[85,40]],[[40,45],[190,60],[330,160],[360,260]],[[360,40],[200,45],[120,170],[45,270]],[[40,150],[150,60],[260,230],[360,120]],[[360,150],[250,50],[150,240],[40,130]]];
function cumv(r){var c=[0];for(var i=1;i<r.length;i++)c.push(c[i-1]+Math.hypot(r[i][0]-r[i-1][0],r[i][1]-r[i-1][1]));return c}
function relp(px,py,cx,cy){var b=bearing(cx,cy,px,py),n=Math.max(2,Math.round(Math.hypot(px-cx,py-cy)/10));return{n:n,w:nmw(n),d:compass(b)}}
function makeXC2(){
 var R=pick(ROUTES),P=mkPath(R),len=P.len,A=pick(AIRF),B,FIS=pick(FISN),cs=csign(),ty=pick(TYPES),C=cs.sh,CF=cs.full;
 do{B=pick(AIRF)}while(B===A);
 var used=[A,B];function nm(){var x;do{x=pick(AIRF)}while(used.indexOf(x)>=0);used.push(x);return x}
 var alt=pick([2000,2500,3000]),lvl=Math.max(1500,alt-500),q1=qnhv(),f1=freq(),qfeD=ri(990,1024),rw=rwyPick(),rs=rwStr(rw),rsay=sd(rs,2),w=wind(rw),mir=Math.random()<.5,hand=mir?'right':'left',dest=Math.random()<.5?'ag':'atc',qd=wrongQ(q1);
 var kf=len>=450?3:2,fr=kf===3?[.25,.46,.66]:[.3,.6],types=shuffle(['ctr','atz','matz','da']).slice(0,kf);
 var ev=[],rng=[],bg='',intros=[],tTr=Math.round(len*.06),t2=tTr+34,pe=t2,Bp=R[R.length-1],Ap=R[0];
 ev.push(bld(tTr,{cap:'Just airborne from '+A+', climbing to '+alt.toLocaleString('en-GB')+' ft, QNH '+q1,q:'Make your first call to '+FIS+' Information for a Basic Service.',ans:[FIS+' Information',CF,ty,'VFR from '+A+' to '+B,altSay(alt)+', QNH '+sd(q1),'request Basic Service'],bank:['Over','Roger','Mayday'],why:'Who you call, who you are, what you are, where you are going, your level, then what you want. "Over" is not needed in UK practice.'}));
 ev.push(mcq(t2,{cap:'Reply from '+FIS+' Information',who:FIS+' Information',atc:C+', '+FIS+' Information, Basic Service, QNH '+sd(q1)+'.',q:'What is your reply?',opts:['Basic Service, QNH '+sd(q1)+', '+C,'Roger','Basic Service, QNH '+sd(wrongQ(q1))+', '+C,'Wilco, '+C],why:'Read back the service and the altimeter setting. A plain "Roger" does not prove you set the right QNH. ATC shortened your callsign, so you may now do the same.'}));
 var firstReq=null;
 var snaps=[];
 types.forEach(function(ty2,i){snaps.push({e:ev.length,bg:bg,r:rng.length,n:intros.length,pe:pe});
  var d0=len*fr[i],pt=P.at(d0),hh=pt.h*Math.PI/180,pxv=Math.cos(hh),pyv=Math.sin(hh),Z=nm(),r,off,cx,cy;
  r={ctr:ri(32,38),atz:ri(20,24),matz:ri(30,36),da:ri(24,30)}[ty2];
  off=ty2==='da'?(Math.random()<.5?-1:1)*(r+14):(Math.random()*2-1)*8;
  cx=Math.round(pt.x+pxv*off);cy=Math.round(pt.y+pyv*off);
  var din=d0-r,dout=d0+r,k2,ins=false;
  if(ty2!=='da'){din=0;dout=len;for(k2=0;k2<=len;k2++){var pp=P.at(k2),inn=Math.hypot(pp.x-cx,pp.y-cy)<r;if(inn&&!ins){din=k2;ins=true}if(!inn&&ins){dout=k2;break}}}
  var rq=Math.max(pe+14,din-38);if(ty2!=='da'&&rq>din-14)rq=din-14;
  var rp=P.at(rq),rl=relp(rp.x,rp.y,cx,cy);if(firstReq===null)firstReq=rq;
  if(ty2==='ctr'){
   var q2=wrongQ(q1),sq=sqk(),ZA=Z+' Approach';
   ev.push(bld(rq,{cap:'About '+rl.n+' NM '+rl.d+' of '+Z+', '+alt.toLocaleString('en-GB')+' ft. Your route crosses the Class D zone.',q:'Ask '+ZA+' for a zone transit.',ans:[ZA,C,ty,rl.w+' miles '+rl.d+' of '+Z,altSay(alt)+', QNH '+sd(q1),'request zone transit, VFR, to '+B],bank:['Mayday','Basic Service','Wilco'],why:'Ask early, well before the boundary, and give position and level. You must not enter Class D until you are cleared.'}));
   ev.push(mcq(rq+13,{cap:Z+' clears you',who:ZA,atc:C+', '+ZA+', transit approved, not above '+altSay(lvl)+', '+Z+' QNH '+sd(q2)+', squawk '+sd(sq)+'.',q:'What is the correct readback?',opts:['Transit approved, not above '+altSay(lvl)+', QNH '+sd(q2)+', squawk '+sd(sq)+', '+C,'Roger, '+C,'Not above '+altSay(alt)+', QNH '+sd(q1)+', squawk '+sd(sq)+', '+C,'Squawk '+sd(wrongSq(sq))+', '+C],why:'Read back the clearance, the level restriction, the new QNH and the squawk. You must descend to '+lvl.toLocaleString('en-GB')+' ft, set '+q2+', and set the code '+sq+' before the boundary.'}));
   ev.push(mcq(dout+6,{cap:'Leaving the '+Z+' zone',who:ZA,atc:C+', you are leaving the zone, free to change to '+FIS+' Information '+f1.s+'.',q:'What is your reply?',opts:[FIS+' Information '+f1.s+', '+C,'Roger, bye',ZA+', '+C+', still inside the zone','Squawk seven seven zero zero'],why:'Read back the new frequency and callsign. Once clear you also stop using the zone squawk and set the code the next unit tells you.'}));pe=dout+6;
   bg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" class="as as-D"/><text x="'+cx+'" y="'+(cy-3)+'" text-anchor="middle" class="lm-t">'+Z+' CTR</text><text x="'+cx+'" y="'+(cy+9)+'" text-anchor="middle" class="lm-t2">Class D</text>';
   rng.push([din,dout,'Inside the '+Z+' Class D zone']);intros.push('a Class D zone');
  }else if(ty2==='atz'){
   var ZT=Z+' Tower',qf=ri(990,1024);
   ev.push(bld(rq,{cap:'About '+rl.n+' NM '+rl.d+' of '+Z+' aerodrome, '+alt.toLocaleString('en-GB')+' ft. Its ATZ is on your track and the aerodrome has a Tower.',q:'Ask '+ZT+' for an ATZ transit.',ans:[ZT,C,ty,rl.w+' miles '+rl.d+' of the aerodrome',altSay(alt)+', QNH '+sd(q1),'request ATZ transit, VFR, to '+B],bank:['Mayday','Basic Service','Wilco'],why:'An ATZ with an ATC unit needs permission before you enter. Ask early with position, level and routing. Do not enter until you have it.'}));
   ev.push(mcq(rq+13,{cap:ZT+' replies',who:ZT,atc:C+', '+ZT+', ATZ transit approved, not above '+altSay(lvl)+', '+Z+' QFE '+sd(qf)+', report leaving the zone.',q:'What is the correct readback?',opts:['ATZ transit approved, not above '+altSay(lvl)+', QFE '+sd(qf)+', wilco, '+C,'Roger, '+C,'Not above '+altSay(alt)+', QNH '+sd(q1)+', '+C,'QFE '+sd(wrongQ(qf))+', wilco, '+C],why:'Read back the permission, the level limit and the pressure setting, and say wilco to the request to report leaving. The ATZ uses QFE, so your altimeter will read height above the aerodrome, which changes what you see on the dial.'}));
   ev.push(bld(dout+4,{cap:'Leaving the ATZ',q:'Report leaving the zone and say what you do next.',ans:[ZT,C,'leaving the zone','changing to '+FIS+' Information'],bank:['final','Mayday','Roger'],why:'You were told to report leaving. Keep it short: station, callsign, the report, then where you are going next.'}));pe=dout+4;
   bg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" class="as as-G"/><circle cx="'+cx+'" cy="'+cy+'" r="3" class="lm-ap"/><text x="'+cx+'" y="'+(cy+r+12)+'" text-anchor="middle" class="lm-t">'+Z+' ATZ</text>';
   rng.push([din,dout,'Inside the '+Z+' ATZ']);intros.push('an ATZ');
  }else if(ty2==='matz'){
   var U=Z+' Zone',sq3=sqk(),rps=ri(996,1026);
   ev.push(bld(rq,{cap:'About '+rl.n+' NM '+rl.d+' of the '+Z+' military aerodrome, '+alt.toLocaleString('en-GB')+' ft. Your track crosses its MATZ.',q:'Call '+U+' for a MATZ penetration.',ans:[U,C,ty,rl.w+' miles '+rl.d+' of '+Z,altSay(alt)+', QNH '+sd(q1),'request MATZ penetration, VFR, to '+B],bank:['Mayday','Basic Service','Wilco'],why:'Crossing a MATZ is not compulsory, but military aircraft fly fast and low here, so contact the unit before the boundary and ask for penetration.'}));
   ev.push(mcq(rq+13,{cap:U+' replies',who:U,atc:C+', '+U+', MATZ penetration approved, not above '+altSay(lvl)+', regional pressure setting '+sd(rps)+', squawk '+sd(sq3)+', report leaving the zone.',q:'What is the correct readback?',opts:['MATZ penetration approved, not above '+altSay(lvl)+', regional pressure setting '+sd(rps)+', squawk '+sd(sq3)+', wilco, '+C,'Roger, '+C,'Penetration approved, QNH '+sd(q1)+', squawk '+sd(sq3)+', '+C,'Squawk '+sd(wrongSq(sq3))+', '+C],why:'Read back the approval, the level, the pressure setting and the squawk, and say wilco for the report. The unit gives a regional pressure setting rather than your QNH.'}));
   ev.push(mcq(dout+4,{cap:'Leaving the '+Z+' MATZ',who:U,atc:C+', you are leaving the MATZ, squawk seven thousand, free to change to '+FIS+' Information '+f1.s+'.',q:'What is your reply?',opts:['Squawk seven thousand, '+FIS+' Information '+f1.s+', '+C,'Roger, bye',U+', '+C+', still inside the zone','Squawk seven seven zero zero'],why:'Read back the squawk and the frequency. Seven thousand is the UK conspicuity code for when you are not working a unit that gives you a code.'}));pe=dout+4;
   bg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" class="as as-A"/><circle cx="'+cx+'" cy="'+cy+'" r="3" class="lm-ap"/><text x="'+cx+'" y="'+(cy-r-5)+'" text-anchor="middle" class="lm-t">'+Z+' MATZ</text>';
   rng.push([din,dout,'Inside the '+Z+' MATZ']);intros.push('a MATZ');
  }else{
   var dn='D'+ri(100,899);
   var a1=Math.max(pe+12,d0-80);
   ev.push(mcq(a1,{cap:'Pre-flight brief: Danger area '+dn+' is notified active from the surface to 5,000 ft. Your direct track passes right beside it.',q:'What do you do?',opts:['Keep clear of it, or enter only with permission from the controlling authority','Fly through it, you are VFR','Fly through at '+alt.toLocaleString('en-GB')+' ft, below the top','Fly through and switch off the transponder'],why:'A danger area can contain activity hazardous to aircraft, such as firing or missile launches. Never enter an active one without permission. Check the status before and during the flight.'}));
   ev.push(mcq(a1+38,{cap:'Passing the danger area',who:FIS+' Information',atc:C+', '+FIS+' Information, danger area '+dn+' is active, remain clear.',q:'What is your reply?',opts:['Remaining clear of '+dn+', '+C,'Roger, continuing direct',  'Wilco, passing through quickly, '+C,'Request squawk seven thousand'],why:'Read back that you will remain clear. A Basic Service does not give separation, so the responsibility for staying out is yours.'}));pe=a1+38;
   bg+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" class="as as-DA"/><text x="'+cx+'" y="'+(cy+3)+'" text-anchor="middle" class="lm-t">'+dn+'</text>';
   rng.push([d0-r,d0+r,'Passing the danger area '+dn]);intros.push('a danger area');
  }
 });
 var arrAt0=len-100;while(snaps.length>1&&pe>arrAt0-12){var sn=snaps.pop();ev.length=sn.e;bg=sn.bg;rng.length=sn.r;intros.length=sn.n;pe=sn.pe}
 var arrAt=len-100,Rb=relp(P.at(arrAt).x,P.at(arrAt).y,Bp[0],Bp[1]);
 var emAt=Math.min(pe+30,arrAt-34);
 if(emAt>=pe+14&&Math.random()<.6){
  var em=pick(['eng','lost','fuel']),ep=P.at(emAt),rE=relp(ep.x,ep.y,Bp[0],Bp[1]);
  var T={
   eng:{cap:'Engine starts running rough, '+(alt-500).toLocaleString('en-GB')+' ft, about '+rE.n+' NM '+rE.d+' of '+B+'. You are not yet in immediate danger.',ans:['Pan-pan, pan-pan, pan-pan',FIS+' Information',CF,ty,'engine running rough','intend to land at '+B,rE.w+' miles '+rE.d+' of '+B+', '+altSay(alt-500)]},
   lost:{cap:'You cannot match the ground to your chart and you are unsure of your position. Your last fix was about '+rE.n+' NM '+rE.d+' of '+B+'. Fuel and weather are fine.',ans:['Pan-pan, pan-pan, pan-pan',FIS+' Information',CF,ty,'uncertain of position','request position fix','last known position '+rE.w+' miles '+rE.d+' of '+B+', '+altSay(alt)]},
   fuel:{cap:'You have used more fuel than planned and now have little margin. You are about '+rE.n+' NM '+rE.d+' of '+B+' at '+alt.toLocaleString('en-GB')+' ft. You are not yet in immediate danger.',ans:['Pan-pan, pan-pan, pan-pan',FIS+' Information',CF,ty,'low on fuel','intend to land at '+B,rE.w+' miles '+rE.d+' of '+B+', '+altSay(alt)]}}[em];
  ev.push(bld(emAt,{cap:T.cap,q:'Transmit an urgency message to '+FIS+' Information.',ans:T.ans,bank:['Mayday, mayday, mayday','Over','Roger'],why:'PAN PAN is for urgency without immediate danger. Three PANs, station, callsign, type, the problem, your intentions, then position and level. Fly the aircraft first.'}));
  ev.push(mcq(emAt+20,{cap:'While you call, set the transponder',q:'Which squawk shows ATC you have an emergency?',opts:['7700','7600','7500','7000'],why:'7700 is general emergency (use it for PAN as well as MAYDAY). 7600 is radio failure, 7500 is unlawful interference, 7000 is the UK conspicuity code.'}));
 }
 var sw={},ev2=[],circ=null,hdg=rw*10,T2=tf(hdg,mir),rwyL='<text x="8" y="290" class="lm-t">Runway '+rs+', '+hand+'-hand circuit</text>',apron,swapRoute,swapCap;
 var side=mir?'right':'left',vd=pick(['left','right']),vp=pick(['Alpha','Bravo','Charlie']),tx=pick(['Alpha','Bravo','Charlie']),fT=freq(),fG=freq(),Bn=B;
 if(dest==='ag'){
  var st=B+' Radio',rl2=Rb;
  ev.push(bld(arrAt,{cap:'About '+Rb.n+' NM '+Rb.d+' of '+B+', '+alt.toLocaleString('en-GB')+' ft. '+B+' is an air/ground radio station.',q:'Make your inbound call to '+st+'.',ans:[st,CF,ty,Rb.w+' miles '+Rb.d+' of the airfield',altSay(alt)+', QNH '+sd(q1),'inbound to join','request airfield information'],bank:['Mayday','Over','Basic Service'],why:'Station, callsign, type, position, level, altimeter setting, and what you want. An A/G station gives information, not clearances.'}));
  var swp={route:[[330,50],[200,150],[245,98],[90,98],[90,210],[320,210],[320,150],[212,150],[172,150],[172,128],[112,128],[112,108]].map(T2)};
  var cu=cumv(swp.route);
  swp.bg=rwyEl(T2)+rwyL+poly(T2,[[260,150],[90,150],[90,210],[320,210],[320,150],[260,150]],'lm-ghost')+lab(T2,[200,228],'downwind','lm-t2')+lab(T2,[76,182],'crosswind','lm-t2','end')+lab(T2,[336,184],'base','lm-t2','start')+lab(T2,[300,168],'final','lm-t2')+lab(T2,[200,84],'dead side','lm-t2')+poly(T2,[[172,150],[172,128],[112,128],[112,108]],'lm-ghost')+lab(T2,[112,98],'apron','lm-t2');
  swp.cap=function(d){return d<cu[1]?'Approaching the airfield':d<cu[2]?'Overhead, turning onto the dead side':d<cu[3]?'Descending on the dead side':d<cu[4]?'Crosswind':d<cu[5]?'Downwind':d<cu[6]?'Base':d<cu[7]?'Final':d<cu[8]?'Landing roll':'Taxiing to the apron'};
  swp.alt='Plan view of the airfield with its circuit, runway '+rs+' and the apron';
  ev.push(mcq(len-70,{cap:st+' replies',who:st,atc:C+', '+st+', runway '+rsay+', '+hand+'-hand circuit, QFE '+sd(qfeD)+', surface wind '+sd(w.d,3)+' degrees '+nmw(w.s)+' knots.',q:'What is your reply?',opts:['Runway '+rsay+', '+hand+'-hand, QFE '+sd(qfeD)+', '+C,'Roger','Runway '+rsay+', QNH '+sd(q1)+', '+C,'Cleared to land, '+C],why:'Read back the runway, circuit direction and QFE. The aerodrome does not give you a landing clearance.',swap:swp}));
  var cj=ri(0,0);
  ev2=[mcq(3,{cap:'Approaching the airfield at '+alt.toLocaleString('en-GB')+' ft, no circuit traffic reported',q:'You have the runway and circuit direction. How do you join?',opts:['Overhead join at 2,000 ft QFE, descending on the dead side','Straight in on final at 500 ft','Join downwind at 2,000 ft','Join base leg without calling'],why:'With no instruction to do otherwise, the overhead join lets you see the windsock, signals and traffic from above before descending on the dead side.'}),
   bld(cu[1],{cap:'Overhead at 2,000 ft QFE',q:'Make your overhead call.',opt:[st],ans:[st,CF,'overhead','descending on the dead side','runway '+rsay,'QFE '+sd(qfeD)],bank:['final','Mayday','Roger'],why:'Station, callsign, position, what you are doing, the runway and the pressure setting, so everyone in the circuit knows where you are.'}),
   mcq(cu[2]+24,{cap:'Descending on the dead side',q:'You have reached circuit height on the dead side. What happens next?',opts:['Cross the upwind end of the runway at circuit height and turn onto crosswind','Turn straight onto downwind','Join final immediately','Descend further on the live side'],why:'Descend on the dead side so you never go down through the live circuit. Cross the end of the runway at circuit height and join on crosswind.'}),
   bld(cu[4]+110,{cap:'Downwind at circuit height',q:'Make your downwind call.',opt:[st],ans:[st,CF,'downwind runway '+rsay,'full stop'],bank:['final','base','Roger'],why:'Callsign, position, runway and intentions. This time you are landing, so say full stop.'}),
   bld(cu[6]+15,{cap:'Established on final',q:'Make your final call.',opt:[st],ans:[st,CF,'final runway '+rsay,'full stop'],bank:['downwind','base','Wilco'],why:'Report final with the runway number and your intention. Pilots behind you then know where you are.'}),
   bld(cu[9]+2,{cap:'Vacated the runway',q:'Tell '+st+' you are clear of the runway.',opt:[st],ans:[st,C,'runway vacated','taxiing to the apron'],bank:['final','Mayday','airborne'],why:'Tell the station as soon as you are clear so that other pilots know the runway is free. Keep it short.'})];
 }else{
  var AP=B+' Approach',TW=B+' Tower',GR=B+' Ground',fT2=freq();
  ev.push(bld(arrAt,{cap:'About '+Rb.n+' NM '+Rb.d+' of '+B+', '+alt.toLocaleString('en-GB')+' ft. '+B+' is a Class D aerodrome with Approach, Tower and Ground.',q:'Make your first call to '+AP+'.',ans:[AP,CF,ty,'VFR from '+A,Rb.w+' miles '+Rb.d+' of the airfield',altSay(alt)+', QNH '+sd(q1),'request joining instructions'],bank:['Mayday','Over','Roger'],why:'Station, callsign, type, route, position, level and what you want. In Class D you must not enter until cleared, so ask well before the boundary.'}));
  var swp2={route:[[316,236],[316,150],[250,150],[190,150],[190,176],[120,176],[120,200]].map(T2)};var tfName=pick(ACX);swp2.traffic=mkTraffic(T2,aheadOnFinal(),tfName);
  var cu2=cumv(swp2.route);
  swp2.bg=rwyEl(T2)+rwyL+'<circle cx="200" cy="150" r="110" class="as as-D" style="fill:none"/><text x="200" y="26" text-anchor="middle" class="lm-t2">'+B+' Class D zone</text>'+poly(T2,[[316,236],[316,150]],'lm-ghost')+lab(T2,[336,190],'base','lm-t2','start')+poly(T2,[[190,150],[190,176],[120,176],[120,200]],'lm-ghost')+lab(T2,[112,212],'apron','lm-t2');
  swp2.cap=function(d){return d<cu2[1]?(side[0].toUpperCase()+side.slice(1)+' base'):d<cu2[2]?'Final':d<cu2[3]?'Landing roll':'Taxiing to the apron'};
  swp2.alt='Plan view of the approach to runway '+rs+' at '+B+' and the taxiway to the apron';
  ev.push(mcq(len-70,{cap:AP+' replies',who:AP,atc:C+', '+AP+', join '+side+' base runway '+rsay+', QNH '+sd(qd)+', report field in sight.',q:'What is your reply?',opts:['Join '+side+' base runway '+rsay+', QNH '+sd(qd)+', wilco, '+C,'Roger','Base, '+C,'Field in sight, '+C],why:'Read back the join, runway and QNH, and say wilco for the instruction to report. Note the QNH here is different from the one you set before.',swap:swp2}));
  ev2=[bld(8,{cap:'Field in sight',q:'Make your next call.',ans:[AP,C,'field in sight'],opt:[AP],bank:['final','Mayday','Roger'],why:'Report what you were asked to report. After initial contact the station name may be left out.'}),
   mcq(26,{who:AP,atc:C+', contact '+TW+' '+fT.s+'.',q:'What is your reply?',opts:[TW+' '+fT.s+', '+C,'Roger','Wilco, '+AP,'Changing frequency'],why:'Read back the new frequency and callsign. Always read back frequency changes.'}),
   bld(44,{cap:'Now on '+TW+', still on '+side+' base',q:'Make your first call to the Tower.',ans:[TW,C,side+' base runway '+rsay,'to land'],bank:['downwind','Over','Mayday'],why:'Station, callsign, position and intention. The Tower knows you from Approach, so keep it short.'}),
   mcq(56,{cap:'On '+side+' base. The '+tfName+' ahead is on short final',who:TW,atc:C+', number two, following the '+tfName+' on short final, surface wind '+sd(w.d,3)+' degrees '+nmw(w.s)+' knots.',q:'What is your reply?',opts:['Number two, following the traffic, '+C,'Cleared to land, '+C,'Wind '+sd(w.d,3)+', '+C,'Roger, number one'],why:'Say that you are number two and following, so that both of you know the sequence. You still have not been cleared to land.'}),
   mcq(100,{cap:'Final. The '+tfName+' has vacated',who:TW,atc:C+', runway '+rsay+', cleared to land, surface wind '+sd(w.d,3)+' degrees '+nmw(w.s)+' knots.',q:'What is your reply?',opts:['Cleared to land runway '+rsay+', '+C,'Roger, '+C,'Wilco, '+C,'Landing, '+C],why:'Always read back a landing clearance with the runway. "Roger" is not enough for any clearance on or near the runway.'}),
   mcq(cu2[3]-16,{cap:'Landed and decelerating',who:TW,atc:C+', vacate '+vd+' at '+vp+', then contact Ground '+fG.s+'.',q:'What is your reply?',opts:['Vacate '+vd+' at '+vp+', Ground '+fG.s+', '+C,'Roger','Wilco','Vacating, '+C],why:'Read back the instruction and the frequency. Do not change frequency until you are clear of the runway.'}),
   bld(cu2[4]-4,{cap:'Clear of the runway, now on '+GR,q:'Call Ground.',ans:[GR,C,'runway vacated','request taxi to the apron'],bank:['final','Mayday','Over'],why:'Station, callsign, where you are and what you want.'}),
   mcq(cu2[4]+14,{who:GR,atc:C+', '+GR+', taxi to the apron via '+tx+'.',q:'What is your reply?',opts:['Taxi to the apron via '+tx+', '+C,'Roger','Taxiing, '+C,'Taxi to holding point '+tx+', '+C],why:'Read back the taxi route. Taxi instructions are easy to mishear, and mistakes on the ground can put you on a runway.'})];
 }
 ev.sort(function(a,b){return a.at-b.at});
 var all=ev.concat(ev2);
 var ab=function(p,t,x,y){return'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" class="lm-ap"/><text x="'+(p[0]+(p[0]>200?-8:8))+'" y="'+(p[1]+(p[1]>150?16:-8))+'" text-anchor="'+(p[0]>200?'end':'start')+'" class="lm-t">'+t+'</text>'};
 bg+=ab(Ap,A)+ab(Bp,B+(dest==='ag'?' (A/G radio)':' (Class D)'));
 var fy=11;bg+='<text x="200" y="'+fy+'" text-anchor="middle" class="lm-t2">'+FIS+' Information '+f1.n+'</text>';
 var evAll=ev.concat(ev2);
 var brief=[['Callsign',cs.reg,cs.full],['Aircraft',tyShort(ty),tyShort(ty)!==ty?'say "'+ty+'"':''],['Route','VFR '+A+' to '+B,''],['Cruise',alt.toLocaleString('en-GB')+' ft',''],['QNH',String(q1),'departure, from the ATIS'],['FIS',FIS+' Information '+f1.n,'']];
 return{brief:brief,route:R,bg:bg,alt:'Map of a fictional route from '+A+' to '+B+' through '+intros.join(', ')+', ending with a circuit join, landing and taxi',speed:30,
  intro:'You are '+cs.reg+', a '+ty.replace('D R','DR')+', flying VFR from '+A+' to '+B+'. You will meet '+intros.join(', ').replace(/, ([^,]*)$/,' and $1')+' on the way, then join at '+B+' ('+(dest==='ag'?'air/ground radio':'Class D with Approach, Tower and Ground')+'), fly the circuit join, land and taxi to the apron. Everything is invented and changes every flight. The call structure follows CAP 413 style.',
  cap:function(d){for(var i=0;i<rng.length;i++)if(d>=rng[i][0]&&d<=rng[i][1])return rng[i][2];return d<len-100?'En route, outside controlled airspace':'Approaching '+B},events:evAll}}

RND.xc=makeXC2;RND.circ=makeCirc;RND.ctlarr=function(){return makeCtl('arr')};RND.ctldep=function(){return makeCtl('dep')};
})();
