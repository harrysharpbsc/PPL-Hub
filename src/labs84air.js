/* ===== Rules of the Air diagrams, style B (library: labs80b.js; how-to: .claude/skills/ppl-diagram) =====
   Each entry: [title, viewBox width, height, drawing, caption]. SEC gives the note section (heading prefix) it sits in. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
/* windsock on a pole, streaming towards angle a (0 = right) */
function sock(x,y,a){return'<path d="M'+x+' '+y+'V'+(y+22)+'" class="s2" stroke-width="1.4"/><g transform="translate('+x+' '+(y+2)+') rotate('+a+')"><path d="M0 0L20 3V7L0 10Z" fill="#e8742c"/><path d="M7 1V9M14 2V8" stroke="#fff" stroke-width="2"/></g>'}
function badge(x,y,k,c){return'<circle cx="'+x+'" cy="'+y+'" r="11" class="f'+(c||'r')+'"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle" style="font:700 12px var(--f-body);fill:var(--surface)">'+k+'</text>'}
function box(x,y,w,h,stroke,fill){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="7" fill="'+(fill||'var(--surface)')+'" stroke="'+(stroke||'var(--line-2)')+'" stroke-width="1.2"/>'}
function lines(x,y,a,c){return a.map(function(t,i){return T(x,y+i*14,t,c||'t2')}).join('')}
/* light pulses along a time line: [[on,off],...] */
function pulses(x0,y,oo){var s='',x=x0;oo.forEach(function(p){s+='<rect x="'+x+'" y="'+(y-12)+'" width="'+p[0]+'" height="12" rx="1.5" class="fm"/>';x+=p[0]+p[1]});return s+L('M'+(x0-4)+' '+(y+1)+'H'+(x0+150),'s2',.9)+head(x0+140,y+1,x0+154,y+1,'k')}
/* red/green star burst (pyrotechnic) */
function burst(cx,cy){var s='';for(var k=0;k<8;k++){var a=k*Math.PI/4;s+='<circle cx="'+n(cx+7*Math.cos(a))+'" cy="'+n(cy+7*Math.sin(a))+'" r="2.3" fill="'+(k%2?'#2FA84F':'#E0262B')+'"/>'}return s}
var F=[
/* 1 */['Constant bearing means a collision course',320,232,
  L('M240 214V40','sa',1.2,'4 3')+L('M40 40H240','sk',1.2,'4 3')
  +[[200,90],[150,137],[100,184]].map(function(p,i){return L('M240 '+p[0]+'L'+p[1]+' 40','sg',1.3)+plane(240,p[0],0,'a',1.15)+plane(p[1],40,90,'k',1.15)+T(p[1],22,'t'+(i+1),'t2','middle')+T(258,p[0]+4,'t'+(i+1),'t2')+L(arc(240,p[0],22,317,360),'sm',1.6)}).join('')
  +'<circle cx="240" cy="40" r="6" class="fr"/>'+T(256,30,'collision','t1 tr')
  +T(214,118,'same angle','t1 tm','end')+T(214,132,'every time','t2','end')
  +T(250,226,'your track','t2 ta')+T(36,30,'its track','t2')
  +'<path d="M14 148Q80 136 146 148L140 212H20Z" fill="var(--accent-soft)"/><path d="M17 190H143L140 212H20Z" class="gnd"/><path d="M14 148Q80 136 146 148L140 212H20Z" fill="none" stroke="var(--ink)" stroke-width="1.8"/><path d="M80 141V212" stroke="var(--ink)" stroke-width="2.4"/>'
  +[[.3,.35],[.55,.6],[.85,1]].map(function(z){return'<g transform="translate(48 172) scale('+(-z[0])+' '+z[0]+')" opacity="'+z[1]+'"><path d="M-22 0H16L22-6L26-3L20 3H-22Z M-8 0L-2-12H4L2 0Z" class="fk"/></g>'}).join('')+'<circle cx="48" cy="170" r="15" fill="none" class="sr" stroke-width="1.3" stroke-dasharray="3 2"/>'
  +T(80,132,'Your windscreen','t1','middle')+T(112,162,'same spot,','t2','middle')+T(112,176,'just bigger','t2','middle'),
  'If another aircraft keeps the same relative bearing while the range closes, you will collide. In the windscreen it does not move, it just grows. Change heading or height to break it.'],
/* 2 */['Head-on',320,170,
  L('M74 72H246','s2',1,'3 4')+plane(56,72,90,'a',1.4)+plane(264,72,-90,'k',1.4)
  +AR('M78 72Q118 72 128 108',124,99,128,110,'a')+AR('M242 72Q202 72 192 36',196,45,192,34,'k')
  +T(140,112,'turns right','t2 ta')+T(180,40,'turns right','t2','end')
  +T(160,150,'They pass left side to left side','t1 tg','middle'),
  'Each pilot alters heading to the right, so the two pass with the other on their left.'],
/* 3 */['Converging',320,214,
  L('M96 178V40','s2',1,'3 4')+L('M250 70H40','s2',1,'3 4')+T(32,64,'B\'s track','t2')
  +plane(96,190,0,'a',1.4)+plane(262,70,-90,'k',1.4)+T(118,204,'A','t1 ta')+T(262,44,'B','t1','middle')
  +'<circle cx="96" cy="70" r="7" fill="none" class="sr" stroke-width="1.4"/>'+T(104,58,'collision point','t2 tr')
  +AR('M96 172Q96 144 138 138',128,140,140,138,'a')+T(146,136,'A: B is on its right,','t1 ta')+T(146,150,'so A gives way: turn right','t2')+T(146,164,'and pass behind B','t2')
  +AR('M244 70H200',212,70,198,70,'k',1.6)+T(204,98,'B: holds its','t1')+T(204,112,'heading and speed','t2'),
  'Same category at about the same height: the aircraft that has the other on its right gives way and avoids passing ahead of it.'],
/* 4 */['Overtaking: the 70° rule',320,214,
  sector(160,66,104,110,250,'var(--mid)',.25)+L('M160 66L'+n(160+Math.sin(110*Math.PI/180)*104)+' '+n(66-Math.cos(110*Math.PI/180)*104)+'M160 66L'+n(160+Math.sin(250*Math.PI/180)*104)+' '+n(66-Math.cos(250*Math.PI/180)*104),'sm',1.2,'4 3')
  +plane(160,66,0,'k',1.6)+T(186,30,'Being overtaken:','t1')+T(186,44,'right of way, holds','t2')+T(186,58,'heading and speed','t2')
  +T(98,118,'70°','t1 tm','middle')+T(222,118,'70°','t1 tm','middle')
  +plane(160,166,0,'a',1.4)+AR('M164 150Q214 128 214 84',214,94,214,82,'a')+T(222,142,'Overtaker:','t1 ta')+T(222,156,'keeps clear by','t2')+T(222,169,'turning right','t2')
  +T(160,206,'inside 70° of the tail = overtaking','t1 tm','middle'),
  'Approaching from inside 70° either side of the other aircraft\'s tail counts as overtaking, climbing, level or descending. In the air, the overtaker alters heading to the right.'],
/* 5 */['Who gives way when converging',320,236,
  [['Balloons','give way to nobody','g'],['Sailplanes','give way to balloons','g'],['Airships','give way to sailplanes, balloons','m'],['Powered aircraft','give way to all of these','r']].map(function(r,k){var y=8+k*46;
   return'<rect x="8" y="'+y+'" width="214" height="40" rx="7" class="f'+r[2]+'" opacity=".16"/>'+badge(26,y+20,k+1,r[2])+T(46,y+17,r[0],'t1')+T(46,y+32,r[1],'t2')}).join('')
  +'<rect x="234" y="100" width="78" height="80" rx="7" class="fm" opacity=".16"/>'+T(244,120,'Aircraft','t1')+T(244,134,'towing','t1')+T(244,152,'powered give','t2')+T(244,166,'way to it','t2')
  +AR('M222 166H232',228,166,234,166,'r',1.4)
  +T(8,212,'Same kind? The one with the other','t2')+T(8,226,'on its right gives way.','t2'),
  'Less manoeuvrable aircraft have priority: balloons first, powered aircraft last. Powered aircraft also give way to an aircraft seen towing; SERA does not rank towing against the others. Between two of the same kind, the one with the other on its right gives way.'],
/* 6 */['Join the pattern: all turns to the left',320,234,
  '<path d="M80 140H240" stroke="var(--ink-3)" stroke-width="16"/>'+'<path d="M106 140H214" stroke="var(--surface)" stroke-width="1" stroke-dasharray="7 6"/>'
  +'<text x="92" y="144" class="t2" text-anchor="middle" style="fill:var(--surface);stroke:none">09</text><text x="228" y="144" class="t2" text-anchor="middle" style="fill:var(--surface);stroke:none">27</text>'
  +L('M240 140H276Q292 140 292 124V60Q292 44 276 44H44Q28 44 28 60V124Q28 140 44 140H80','sa',1.8)
  +head(240,140,272,140,'a')+head(292,112,292,92,'a')+head(190,44,166,44,'a')+head(28,74,28,96,'a')+head(30,140,62,140,'a')
  +plane(160,140,90,'a',1.1)+T(258,160,'Upwind','t1','middle')+T(284,96,'Crosswind','t1','end')+T(160,34,'Downwind','t1','middle')+T(36,96,'Base','t1')+T(54,160,'Final','t1','middle')
  +sock(110,68,180)+T(96,104,'windsock','t2','middle')+AR('M228 84H178',190,84,176,84,'k',1.6)+T(204,76,'wind','t2','middle')+T(160,122,'every turn is to the left','t2 ta','middle')
  +L('M20 206H250','s2',1,'4 3')+'<rect x="250" y="201" width="56" height="10" fill="var(--ink-3)"/>'+T(278,226,'runway 09','t2','middle')
  +L('M40 200V212M150 200V212','sk',1.2)+T(40,226,'8 NM','t2','middle')+T(150,226,'4 NM','t2','middle')
  +T(95,198,'long final','t1 tm','middle')+T(200,198,'final','t1 tg','middle')+T(8,186,'Straight in:','t2'),
  'Conform to the circuit other traffic is flying, or keep clear of it. Turns are to the left unless signals say otherwise; take off and land into wind. On a straight-in approach report long final between 8 and 4 NM and final from 4 NM.'],
/* 7 */['No runway: keep earlier traffic on your left',320,184,
  '<rect x="24" y="28" width="272" height="128" rx="8" class="gnd" stroke="var(--line-2)"/>'+T(36,48,'grass landing area','t2')
  +sock(36,2,0)+T(62,14,'wind from the west','t2')+AR('M296 18H256',266,18,254,18,'k',1.6)+T(250,22,'landing direction','t2','end')
  +L('M300 72H200','sa',1.2)+plane(186,72,-90,'a',1.3)+AR('M172 72H120',132,72,118,72,'a',1.6,'5 3')+T(186,58,'Landing now','t1 ta','middle')
  +L('M300 124H140','s2',1.2)+plane(126,124,-90,'k',1.3)+AR('M112 124Q84 124 84 146',84,138,84,148,'k',1.4,'4 3')+T(150,144,'Landed earlier: turns left','t1')
  +L('M240 80V116','sg',1.2,'2 3')+T(234,102,'kept on its left','t2 tg','end'),
  'Where take-offs and landings are not confined to a runway, newer traffic stays to the right of older traffic and turns on the landing area are to the left. Taking off, leave earlier departures on your left too. After landing, clear the landing area as soon as possible.'],
/* 8 */['Following a line feature: keep it on your left',320,200,
  L('M10 104L310 92','sk',3)+(function(){var s='';for(var i=0;i<=30;i++){var x=12+i*10,y=104-i*0.4;s+='M'+x+' '+n(y-4)+'V'+n(y+4)}return L(s,'sk',1.1)})()
  +T(16,88,'railway, road, canal or coast','t2')
  +plane(210,52,-90,'a',1.3)+L('M300 52H226','sa',1.2,'4 3')+AR('M194 52H140',152,52,138,52,'a')+T(298,36,'Westbound','t1','end')
  +plane(110,156,90,'a',1.3)+L('M20 156H94','sa',1.2,'4 3')+AR('M126 156H180',168,156,182,156,'a')+T(24,180,'Eastbound','t1')
  +L('M262 60V94','sg',1.2,'2 3')+L('M62 110V148','sg',1.2,'2 3')+T(256,82,'line on its left','t2 tg','end')+T(68,136,'line on its left','t2 tg')
  +T(300,190,'both keep right of the line','t2','end'),
  'No longer a legal requirement under SERA, but the CAA strongly recommends it. Opposite-direction traffic following the same feature then passes apart. In controlled airspace follow ATC instead.'],
/* 9 */['Navigation light sectors (seen from above)',320,236,
  sector(160,118,74,0,110,'#2FA84F',.45)+sector(160,118,74,250,360,'#E0262B',.45)+sector(160,118,74,110,250,'var(--ink-3)',.22)
  +L('M160 118V36','s2',1,'3 3')+T(160,26,'dead ahead','t2','middle')+plane(160,118,0,'k',2,'rgw')
  +L(arc(160,118,86,0,110),'sg',1.4)+L(arc(160,118,86,250,360),'sr',1.4)+L(arc(160,118,86,110,250),'s2',1.4,'3 3')
  +T(8,18,'Red: left wing','t1 tr')+T(8,32,'110° from dead ahead','t2')+T(312,18,'Green: right wing','t1 tg','end')+T(312,32,'110° from dead ahead','t2','end')
  +T(160,218,'White: tail','t1','middle')+T(160,232,'70° each side of dead astern','t2','middle'),
  'Red on the left wing and green on the right each shine from dead ahead to 110° round. The white tail light covers 70° each side of dead astern. Seeing red and green together means the other aircraft is heading straight at you.'],
/* 10 */['Reading another aircraft\'s lights at night',320,370,
  (function(){var P=[[0,0,'Red and green','head-on:','both turn right','tr',[80,48,180,'rg']],[160,0,'Green on your left','it gives way:','hold heading, speed','tg',[44,62,90,'g']],[0,166,'Red on your right','you give way','(it is on your right)','tr',[116,62,-90,'r']],[160,166,'White only','ahead, going away;','catching up? keep clear','t2',[80,52,0,'w']]],s='';
   s+='<rect x="3" y="329" width="314" height="38" rx="8" fill="var(--accent-soft)"/>'+T(14,345,'Memory aid: red to red, green to green: safe;','t2')+T(14,359,'red to green: risk. Check the bearing too.','t2');P.forEach(function(p){var x=p[0],y=p[1],o=p[6];s+='<rect x="'+(x+3)+'" y="'+(y+3)+'" width="154" height="156" rx="8" class="panel"/>'+T(x+80,y+20,p[2],'t1 '+p[5],'middle')+plane(x+o[0],y+o[1]+8,o[2],'k',1.2,o[3])+L('M'+(x+80)+' '+(y+112)+'L'+(x+o[0])+' '+(y+o[1]+20),'s2',1,'1 3')+plane(x+80,y+112,0,'a',1.1,'rgw')+T(x+80,y+136,p[3],'t2','middle')+T(x+80,y+150,p[4],'t2','middle')});return s})(),
  'Your red is on your left and your green on your right. Matching colours on the same side mean the paths will not cross; red facing green means risk. Check whether the bearing is changing as well.'],
/* 11 */['Low flying minima (UK, day)',320,214,
  '<path d="M0 176H320V214H0Z" class="gnd"/>'+L('M160 8V206','s2',1,'2 3')
  +'<path d="M30 176A50 50 0 0 1 130 176Z" fill="var(--bad)" opacity=".12"/>'+L('M30 176A50 50 0 0 1 130 176','sr',1.2,'4 3')
  +'<path d="M70 176V160h20v16Z" class="bld"/><path d="M76 160l4-6 4 6Z" class="fk"/>'+AR('M80 162V128',80,134,80,126,'r',1.2)+T(86,144,'500 ft','t1 tr')
  +side(70,96,.9,'a')+T(80,24,'Anywhere','t1','middle')+T(80,38,'500 ft from any','t2','middle')+T(80,51,'person or structure','t2','middle')
  +'<path d="M178 176V150h12v26ZM194 176V132h12v44ZM210 176V158h18v18ZM232 176V140h10v36ZM246 176V154h16v22ZM266 176V136h10v40ZM280 176V160h22v16Z" class="bld"/>'
  +L('M176 96H304','sr',1.2,'4 3')+AR('M272 134V100',272,106,272,98,'r',1.2)+T(278,124,'1,000 ft','t1 tr')+side(222,84,.9,'a')
  +L('M178 196H302M178 191V201M302 191V201','sk',1)+T(240,208,'within 600 m','t2','middle')
  +T(240,24,'Congested area','t1','middle')+T(240,38,'above the highest','t2','middle')+T(240,51,'obstacle','t2','middle'),
  'Except for take-off and landing, keep 500 ft from any person, vehicle, vessel or structure. Over a city, town or settlement, fly 1,000 ft above the highest obstacle within 600 m, and high enough to land clear if the engine stops.'],
/* 12 */['Congested area: 1,000 ft and able to land clear',320,220,
  '<path d="M0 182H320V220H0Z" class="gnd"/>'
  +'<path d="M96 182V170h20v12ZM118 182V156h14v26ZM134 182V146h18v36ZM154 182V122h16v60ZM172 182V138h20v44ZM194 182V158h18v24ZM214 182V170h22v12Z" class="bld"/>'
  +L('M162 120V122','sk',1)+side(162,38,1,'a')+L('M120 60H204','sr',1.2,'4 3')
  +AR('M196 120V64',196,72,196,62,'r',1.3)+T(202,96,'1,000 ft','t1 tr')+L('M150 122H210','sk',.8,'2 2')+T(214,126,'highest','t2')+T(214,139,'obstacle','t2')
  +L('M80 196H244M80 191V201M244 191V201','sk',1)+T(162,212,'600 m either side','t2','middle')
  +AR('M146 44Q70 80 34 176',38,164,34,178,'g',1.6,'6 4')+T(18,104,'glide clear','t1 tg')+T(18,118,'to open','t2')+T(18,131,'ground','t2')
  +T(250,190,'fields','t2')+T(14,198,'fields','t2'),
  'Over a city, town or settlement fly at least 1,000 ft above the highest obstacle within 600 m, and high enough to glide clear if the engine stops. Landing clear is the pilot\'s job, not ATC\'s.'],
/* 13 */['The 500 ft rule: EASA and UK compared',320,232,
  (function(){function scene(x0,uk){var s='<path d="M'+x0+' 176H'+(x0+150)+'V214H'+x0+'Z" class="gnd"/>';
    s+=uk?'<path d="M'+(x0+70)+' 176A40 40 0 0 1 '+(x0+150)+' 176Z" fill="var(--bad)" opacity=".14"/>'+L('M'+(x0+70)+' 176A40 40 0 0 1 '+(x0+150)+' 176','sr',1.2,'4 3')
           :'<path d="M'+x0+' 176V130H'+(x0+150)+'V176Z" fill="var(--bad)" opacity=".14"/>'+L('M'+x0+' 130H'+(x0+150),'sr',1.2,'4 3');
    s+='<path d="M'+(x0+104)+' 176V160h12v16Z" class="bld"/>';
    s+=uk?side(x0+36,160,.7,'a')+T(x0+36,198,'low over open','t2 tg','middle')+T(x0+36,211,'ground is legal','t2 tg','middle')
         :side(x0+36,118,.7,'a')+T(x0+36,198,'500 ft above','t2','middle')+T(x0+36,211,'the surface','t2','middle');
    return s}
   return scene(8,false)+scene(162,true)+L('M160 8V222','s2',1,'2 3')
   +T(83,24,'EASA; UK at night','t1','middle')+T(83,38,'height above surface or','t2','middle')+T(83,51,'obstacle within 150 m','t2','middle')
   +T(237,24,'UK by day','t1','middle')+T(237,38,'a 500 ft bubble around','t2','middle')+T(237,51,'people and things','t2','middle')
   +T(83,124,'too low','t2 tr','middle')+T(272,132,'too close','t2 tr','middle')})(),
  'EASA sets a height above the surface everywhere. The UK day rule is a 500 ft bubble around people, vehicles, vessels and structures instead, so lower flight over open ground is allowed. Take-off and landing are exempt from both.'],
/* 14 */['Open-air assemblies of more than 1,000 people',320,224,
  '<ellipse cx="110" cy="166" rx="96" ry="30" fill="none" class="sm" stroke-width="1.3" stroke-dasharray="5 4"/>'
  +'<ellipse cx="110" cy="164" rx="40" ry="13" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.4"/><ellipse cx="110" cy="162" rx="26" ry="7" class="gnd" stroke="var(--ink-3)"/>'
  +T(110,214,'over 1,000 people','t2','middle')+T(20,128,'1,000 m ring','t2 tm')
  +side(110,26,.9,'a')+AR('M110 36V146',110,138,110,150,'r',1.4)+T(118,70,'1,000 ft above','t1 tr')+T(118,84,'highest obstacle','t2')+T(118,97,'within 600 m,','t2')+T(118,110,'or enough to land','t2')+T(118,123,'clear if higher','t2')
  +side(282,92,.8,'a',true)+AR('M262 104Q236 126 210 150',219,143,208,152,'m',1.4,'5 3')+T(262,64,'No take-off','t1 tm','middle')+T(262,78,'or landing','t1 tm','middle')
  +T(266,172,'unless at an','t2','middle')+T(266,185,'aerodrome or','t2','middle')+T(266,198,'with permission','t2','middle'),
  'UK: written CAA permission is needed to fly lower. The 1,000 m take-off and landing ban has exceptions at aerodromes (CAA procedures) and at other sites with the organiser\'s permission.']
,
/* 15 */['If you are intercepted',320,232,
  [['Follow the interceptor\'s signals','precisely, and stay calm'],['Tell the ATS unit you are working','if you can'],['Call on 121.50 MHz','your callsign and the nature of your flight'],['Squawk 7700','unless the ATS unit tells you otherwise']].map(function(r,k){var y=8+k*44;return badge(20,y+16,k+1)+T(42,y+13,r[0],'t1')+T(42,y+28,r[1],'t2')}).join('')
  +box(8,186,304,40,'var(--bad)')+T(160,203,'Conflicting ATC instructions? Ask at once,','t2','middle')+T(160,218,'but obey the interceptor\'s visual signals.','t2 tr','middle'),
  'Do all four straight away. Avoid hand signals: they are easily misread. Report any interception abroad to the CAA. (UK AIP ENR 1.12)'],
/* 16 */['The interceptor\'s signals to you',320,398,
  (function(){var s='',R=130;
   [1,2].forEach(function(k){s+=L('M8 '+(4+k*R)+'H312','s2',.8)});
   var y=8;s+=L('M14 '+(y+66)+'H48','sa',1,'3 2')+plane(62,y+66,90,'a',1)+plane(96,y+44,90,'r',1)+L('M86 '+(y+30)+'q10-6 20 0','sr',1)+AR('M108 '+(y+44)+'Q130 '+(y+44)+' 130 '+(y+20),130,y+28,130,y+16,'r',1.4,'4 2')+T(62,y+92,'you','t2 ta','middle')+T(96,y+22,'interceptor','t2 tr','middle');
   s+=T(150,y+14,'"Follow me"','t1')+lines(150,y+30,['Interceptor: rocks its wings','from slightly above, ahead','(normally on your left), then','a slow level turn, usually left.','You: rock wings and follow;','at night flash your nav lights.']);
   y=8+R;s+=L('M14 '+(y+70)+'H140','sa',1,'3 2')+plane(48,y+70,90,'a',1)+T(76,y+92,'your line of flight','t2 ta','middle')+plane(84,y+40,90,'r',1)+AR('M96 '+(y+40)+'Q122 '+(y+40)+' 124 '+(y+12),124,y+20,124,y+8,'r',1.6);
   s+=T(150,y+14,'"You may proceed"','t1')+lines(150,y+30,['Interceptor: breaks away in a','climbing turn of 90° or more,','not crossing your line of flight.','You: rock your wings.']);
   y=8+2*R;s+='<rect x="30" y="'+(y+52)+'" width="80" height="9" fill="var(--ink-3)"/>'+L('M120 '+(y+56)+'Q128 '+(y+20)+' 72 '+(y+20)+'Q18 '+(y+20)+' 18 '+(y+56)+'Q18 '+(y+84)+' 56 '+(y+84)+'H88','sr',1.4,'4 2')+head(80,y+84,94,y+84,'r')+plane(84,y+56,90,'r',1);
   s+=T(150,y+14,'"Land at this aerodrome"','t1')+lines(150,y+30,['Interceptor: circles, lowers its','gear, overflies the runway in','the landing direction (steady','landing lights at night).','You: lower gear, follow, and','land if it looks safe.']);
   return s})(),
  'Too slow to keep up? The interceptor flies racetracks and rocks its wings each time it passes you. (UK AIP ENR 1.12)'],
/* 17 */['Your signals to the interceptor',320,268,
  '<rect x="8" y="30" width="170" height="40" class="fm" opacity=".12"/>'+L('M8 30H178M8 70H178','sm',.9,'4 3')+T(12,24,'2,000 ft aal','t2')+T(12,86,'1,000 ft aal','t2')
  +'<rect x="40" y="104" width="110" height="5" fill="var(--ink-3)"/>'+L('M8 109H178','s2',1)+side(96,52,.9,'a')+AR('M130 50H158',150,50,160,50,'a',1.2)
  +T(190,18,'"Aerodrome inadequate"','t1')+lines(190,34,['raise gear if possible,','pass over the runway','1,000 to 2,000 ft aal,','and keep circling.'])
  +L('M8 124H312','s2',.8)
  +T(8,146,'"I cannot comply"','t1')+T(8,160,'all lights on and off,','t2')+T(8,174,'regular intervals','t2')+pulses(150,166,[[10,10],[10,10],[10,10],[10,10],[10,10],[10,10],[10,10]])
  +T(8,196,'"I am in distress"','t1')+T(8,210,'all lights on and off,','t2')+T(8,224,'irregular intervals','t2')+pulses(150,216,[[4,6],[14,4],[4,16],[8,5],[3,4],[16,10],[5,8],[9,0]])+T(150,232,'time','t2')
  +box(8,240,304,24)+T(160,256,'They answer both with a break-away climbing turn.','t2','middle'),
  '"Cannot comply" must look different from ordinary flashing lights, so switch every light fully on and off. The interceptor\'s break-away climbing turn means "understood". (UK AIP ENR 1.12)'],
/* 18 */['Warning signal from the ground',320,160,
  '<rect x="214" y="10" width="98" height="130" class="fr" opacity=".1"/>'+L('M214 10V140','sr',1.6,'6 3')+T(263,30,'Restricted,','t2 tr','middle')+T(263,44,'prohibited or','t2 tr','middle')+T(263,58,'danger area','t2 tr','middle')
  +L('M8 140H312','sk',1.2)+'<rect x="180" y="132" width="14" height="8" fill="var(--ink-3)"/>'
  +[[158,34],[182,52],[203,28]].map(function(p){return L('M187 132L'+p[0]+' '+(p[1]+8),'s2',.7,'1.5 2')+burst(p[0],p[1])}).join('')
  +side(62,62,.8,'a')+AR('M92 58Q116 56 120 36Q122 22 106 20',112,20,102,20,'a',1.3,'4 2')+T(96,16,'turn away','t2 ta','end')
  +T(8,96,'Red and green stars,','t1')+T(8,110,'every 10 s, day or night','t2')+T(8,124,'take remedial action','t2'),
  'You are in, or about to enter, a restricted, prohibited or danger area: turn away.'],
/* 19 */['Simulated instrument flight',320,214,
  L('M70 46L36 8M102 46L136 8','sg',.8,'3 2')+'<path d="M102 46L136 8H86Z" class="fg" opacity=".12"/>'
  +'<path d="M86 12C104 12 118 32 122 54L130 200H42L50 54C54 32 68 12 86 12Z" fill="var(--surface)" stroke="var(--ink-3)" stroke-width="1.4"/>'
  +L('M54 56H118','s2',2.4)+L('M56 62H82','sr',3)+[58,92].map(function(x){return L('M'+(x+4)+' 72h14M'+(x+11)+' 72v8','sk',1.6)+'<rect x="'+x+'" y="86" width="22" height="30" rx="5" fill="var(--surface-2)" stroke="var(--ink-3)"/>'}).join('')
  +'<rect x="58" y="138" width="22" height="30" rx="5" fill="var(--surface-2)" stroke="var(--ink-3)" stroke-dasharray="3 2"/><rect x="92" y="138" width="22" height="30" rx="5" fill="var(--surface-2)" stroke="var(--ink-3)"/>'
  +T(69,106,'H','t1','middle')+T(103,106,'S','t1','middle')+T(69,158,'O','t1','middle')+T(86,212-4,'plan view','t2','middle')
  +T(148,20,'H  Handling pilot','t1')+T(166,34,'view limited by screens','t2')+T(148,56,'S  Safety pilot','t1')+T(166,70,'qualified, in the other','t2')+T(166,84,'control seat; not a student','t2')
  +T(148,106,'O  Observer, if needed','t1')+T(166,120,'for an adequate lookout','t2')+L('M148 138h14M155 138v8','sk',1.6)+T(166,142,'dual controls, working','t2')
  +box(146,156,166,44,'var(--accent)')+T(156,174,'Approaches in VMC:','t1 ta')+T(156,190,'tell ATC, carry an observer','t2'),
  'SERA.3220. The green wedge is the safety pilot\'s lookout through the windscreen; screens or a hood limit only the handling pilot\'s view.']];
var SEC=['Collision avoidance','Right of way','Right of way','Right of way','Right of way','Flights near an aerodrome','Order of landing','Radio in the ATZ','Lights on aircraft','Lights on aircraft','Low flying prohibitions','Low flying prohibitions','Low flying prohibitions','Open-air assemblies','Interception: what to do','Interception signals','Interception signals','Interception radio phrases','Other rules: hazards'];
DSEC['Rules of the Air']=F.map(function(f,i){return[SEC[i],dbFig(f[0],f[1],f[2],f[3],f[4])]});
})();
