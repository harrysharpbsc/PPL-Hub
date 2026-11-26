/* ===== Rules of the Air diagrams, style B (library: labs80b.js; how-to: .claude/skills/ppl-diagram) =====
   Each entry: [title, viewBox width, height, drawing, caption]. SEC gives the note section (heading prefix) it sits in. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
var F=[
/* 1 */['Constant bearing means a collision course',320,232,
  L('M240 214V40','sa',1.2,'4 3')+L('M40 40H240','sk',1.2,'4 3')
  +[[200,90],[150,137],[100,184]].map(function(p,i){return L('M240 '+p[0]+'L'+p[1]+' 40','sg',1.3)+plane(240,p[0],0,'a',1.15)+plane(p[1],40,90,'k',1.15)+T(p[1],22,'t'+(i+1),'t2','middle')+T(258,p[0]+4,'t'+(i+1),'t2')+L(arc(240,p[0],22,317,360),'sm',1.6)}).join('')
  +'<circle cx="240" cy="40" r="6" class="fr"/>'+T(256,30,'collision','t1 tr')
  +T(214,118,'same angle','t1 tm','end')+T(214,132,'every time','t2','end')
  +T(250,226,'your track','t2 ta')+T(36,30,'its track','t2')
  +'<rect x="16" y="140" width="128" height="72" rx="8" fill="var(--accent-soft)" stroke="var(--ink)" stroke-width="1.4"/><path d="M16 186H144V204Q144 212 136 212H24Q16 212 16 204Z" class="gnd"/>'
  +[[.28,.35],[.5,.6],[.8,.95]].map(function(z){return'<g transform="translate(50 170) scale('+z[0]+')" opacity="'+z[1]+'"><path d="M-22 0H16L22-6L26-3L20 3H-22Z M-8 0L-2-12H4L2 0Z" class="fk"/></g>'}).join('')
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
  +L('M104 176L248 82','s2',1,'1 3')+T(116,152,'B is on A\'s right','t2')
  +AR('M96 172Q96 132 142 124',132,126,144,124,'a')+T(150,134,'A gives way: turns right','t2 ta')
  +AR('M244 70H200',212,70,198,70,'k',1.6)+T(204,104,'B holds heading','t2')+T(204,117,'and speed','t2'),
  'Same category at about the same height: the aircraft that has the other on its right gives way and avoids passing ahead of it.'],
/* 4 */['Overtaking: the 70° rule',320,214,
  sector(160,66,104,110,250,'var(--mid)',.25)+L('M160 66L'+n(160+Math.sin(110*Math.PI/180)*104)+' '+n(66-Math.cos(110*Math.PI/180)*104)+'M160 66L'+n(160+Math.sin(250*Math.PI/180)*104)+' '+n(66-Math.cos(250*Math.PI/180)*104),'sm',1.2,'4 3')
  +plane(160,66,0,'k',1.6)+T(186,40,'Being overtaken:','t1')+T(186,54,'right of way','t2')
  +T(98,118,'70°','t1 tm','middle')+T(222,118,'70°','t1 tm','middle')
  +plane(160,166,0,'a',1.4)+AR('M164 150Q214 128 214 84',214,94,214,82,'a')+T(222,140,'alters heading','t2 ta')+T(222,153,'right to pass','t2 ta')
  +T(160,206,'Overtaking zone: within 70° of its tail','t1 tm','middle'),
  'Approaching from inside 70° either side of the other aircraft\'s tail counts as overtaking, climbing, level or descending. In the air, the overtaker alters heading to the right.'],
/* 5 */['Who gives way when converging',320,236,
  [['Balloons',12],['Sailplanes',66],['Airships',120],['Powered aircraft',174]].map(function(r,i){return'<rect x="20" y="'+r[1]+'" width="150" height="34" rx="7" fill="var(--surface-2)" stroke="'+(i===3?'var(--accent)':'var(--line-2)')+'"/>'+T(95,r[1]+22,r[0],'t1','middle')
   +(i?AR('M95 '+(r[1]-2)+'V'+(r[1]-18),95,r[1]-10,95,r[1]-19,'k',1.4)+T(104,r[1]-6,'gives way to','t2'):'')}).join('')
  +'<rect x="208" y="120" width="98" height="48" rx="7" fill="var(--surface-2)" stroke="var(--line-2)"/>'+T(257,140,'Aircraft','t1','middle')+T(257,155,'towing','t1','middle')
  +AR('M170 186Q236 186 252 170',246,177,253,169,'a',1.4)+T(184,206,'gives way to','t2 ta')
  +T(180,33,'most priority','t2 tg'),
  'Less manoeuvrable aircraft have priority. Powered aircraft also give way to an aircraft seen towing. Between two of the same kind, the one with the other on its right gives way.'],
/* 6 */['Join the pattern: all turns to the left',320,192,
  '<path d="M80 140H240" stroke="var(--ink-3)" stroke-width="16"/>'+'<path d="M106 140H214" stroke="var(--surface)" stroke-width="1" stroke-dasharray="7 6"/>'
  +'<text x="92" y="144" class="t2" text-anchor="middle" style="fill:var(--surface);stroke:none">09</text><text x="228" y="144" class="t2" text-anchor="middle" style="fill:var(--surface);stroke:none">27</text>'
  +L('M240 140H276Q292 140 292 124V60Q292 44 276 44H44Q28 44 28 60V124Q28 140 44 140H80','sa',1.8)
  +head(240,140,272,140,'a')+head(292,112,292,92,'a')+head(190,44,166,44,'a')+head(28,74,28,96,'a')+head(30,140,62,140,'a')
  +plane(160,140,90,'a',1.1)+T(258,160,'Upwind','t1','middle')+T(284,96,'Crosswind','t1','end')+T(160,34,'Downwind','t1','middle')+T(36,96,'Base','t1')+T(54,160,'Final','t1','middle')
  +AR('M220 84H170',182,84,168,84,'k',1.6)+T(196,76,'wind','t2','middle')+T(160,112,'every turn is to the left','t2 ta','middle')
  +T(160,182,'take off and land into wind','t2','middle'),
  'Conform to the circuit other traffic is flying, or keep clear of it. Turns are to the left unless signals say otherwise. On a straight-in approach report long final between 8 and 4 nm and final at 4 nm.'],
/* 7 */['No runway: keep earlier traffic on your left',320,184,
  '<rect x="24" y="28" width="272" height="128" rx="8" class="gnd" stroke="var(--line-2)"/>'+T(36,48,'grass landing area','t2')
  +AR('M296 18H256',266,18,254,18,'k',1.6)+T(250,22,'landing direction, into wind','t2','end')
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
/* 9 */['Navigation light sectors (seen from above)',320,224,
  sector(160,108,86,0,110,'#2FA84F',.45)+sector(160,108,86,250,360,'#E0262B',.45)+sector(160,108,86,110,250,'var(--ink-3)',.22)
  +L('M160 108V18','s2',1,'3 3')+T(160,12,'dead ahead','t2','middle')+plane(160,108,0,'k',2.3,'rgw')
  +L(arc(160,108,100,0,110),'sg',1.4)+L(arc(160,108,100,250,360),'sr',1.4)
  +T(214,24,'Green 110°','t1 tg')+T(214,38,'right wing','t2')+T(106,24,'Red 110°','t1 tr','end')+T(106,38,'left wing','t2','end')
  +T(160,214,'White 140°: tail','t1','middle'),
  'Red on the left wing and green on the right each shine from dead ahead to 110° round. The white tail light covers the 140° behind. Seeing red and green together means the other aircraft is heading straight at you.'],
/* 10 */['Reading another aircraft\'s lights at night',320,326,
  (function(){var P=[[0,0,'Red and green','head-on:','both turn right','tr',[80,48,180,'rg']],[160,0,'Green on your left','it gives way:','hold heading, speed','tg',[44,62,90,'g']],[0,166,'Red on your right','you give way','(it is on your right)','tr',[116,62,-90,'r']],[160,166,'White only','ahead, going away;','catching up? keep clear','t2',[80,52,0,'w']]],s='';
   P.forEach(function(p){var x=p[0],y=p[1],o=p[6];s+='<rect x="'+(x+3)+'" y="'+(y+3)+'" width="154" height="156" rx="8" class="panel"/>'+T(x+80,y+20,p[2],'t1 '+p[5],'middle')+plane(x+o[0],y+o[1]+8,o[2],'k',1.2,o[3])+L('M'+(x+80)+' '+(y+112)+'L'+(x+o[0])+' '+(y+o[1]+20),'s2',1,'1 3')+plane(x+80,y+112,0,'a',1.1)+T(x+80,y+136,p[3],'t2','middle')+T(x+80,y+150,p[4],'t2','middle')});return s})(),
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
];
var SEC=['Collision avoidance','Right of way','Right of way','Right of way','Right of way','Flights near an aerodrome','Order of landing','Radio in the ATZ','Lights on aircraft','Lights on aircraft','Low flying prohibitions','Low flying prohibitions','Low flying prohibitions','Open-air assemblies'];
DSEC['Rules of the Air']=F.map(function(f,i){return[SEC[i],dbFig(f[0],f[1],f[2],f[3],f[4])]});
})();
