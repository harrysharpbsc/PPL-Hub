/* ===== Altimeter Setting Procedures diagrams, style B (library: labs80b.js; how-to: .claude/skills/ppl-diagram) =====
   Vertical profiles keep water (--ch-wt) and land (class gnd) fills because the datums are the point.
   Each F entry: [title, viewBox width, height, drawing, caption]; SEC gives the note section it sits in. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
function sea(x1,x2,y,h){return'<path d="M'+x1+' '+y+'H'+x2+'V'+(y+(h||8))+'H'+x1+'Z" fill="var(--ch-wt)"/>'}
/* two-headed vertical dimension with a label beside it */
function vdim(x,y1,y2,lab,c,left,ly){var m=ly||(y1+y2)/2;return AR('M'+x+' '+m+'V'+(y1+1),x,y1+8,x,y1,c,1.3)+AR('M'+x+' '+m+'V'+(y2-1),x,y2-8,x,y2,c,1.3)+T(left?x-6:x+6,m+4,lab,'t2 t'+c,left?'end':null)}
function up(x,y1,y2,c){return L('M'+x+' '+y1+'V'+(y2+6),'s'+c,1.3)+head(x,y1,x,y2,c)}
/* altimeter face without text, for small dials */
function dial(cx,cy,r,f100,f1000){function pt(f,l,w){var a=f*Math.PI*2;return'<path d="M'+cx+' '+cy+'L'+n(cx+Math.sin(a)*l)+' '+n(cy-Math.cos(a)*l)+'" stroke="#fff" stroke-width="'+w+'" stroke-linecap="round"/>'}
 var t='';for(var k=0;k<10;k++){var a=k/10*Math.PI*2;t+='<path d="M'+n(cx+Math.sin(a)*r)+' '+n(cy-Math.cos(a)*r)+'L'+n(cx+Math.sin(a)*(r-4))+' '+n(cy-Math.cos(a)*(r-4))+'" stroke="#fff" stroke-width="1"/>'}
 return'<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+3)+'" fill="#3a4250"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#151a22"/>'+t+pt(f100,r-3,1.4)+pt(f1000,r*.55,3)+'<circle cx="'+cx+'" cy="'+cy+'" r="2" fill="#888"/>'}

var F=[
/* 1 */['The altimeter is a pressure gauge',320,192,
  (function(){var cx=78,cy=96,r=62,s='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+6)+'" fill="#3a4250"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#151a22"/>';
   for(var k=0;k<50;k++){var a=k/50*Math.PI*2,l=k%5?5:9;s+='<path d="M'+n(cx+Math.sin(a)*r)+' '+n(cy-Math.cos(a)*r)+'L'+n(cx+Math.sin(a)*(r-l))+' '+n(cy-Math.cos(a)*(r-l))+'" stroke="#fff" stroke-width="'+(k%5?.8:1.6)+'"/>'}
   for(k=0;k<10;k++){var a2=k/10*Math.PI*2;s+='<text x="'+n(cx+Math.sin(a2)*(r-17))+'" y="'+n(cy-Math.cos(a2)*(r-17)+4)+'" text-anchor="middle" style="font:700 11px var(--f-body);fill:#fff">'+k+'</text>'}
   s+='<rect x="'+(cx+12)+'" y="'+(cy-9)+'" width="36" height="18" rx="2" fill="#000" stroke="#777"/><text x="'+(cx+30)+'" y="'+(cy+5)+'" text-anchor="middle" style="font:500 11px var(--f-body);fill:#fff">1013</text>';
   s+='<path d="M'+(cx-6)+' '+(cy-36)+'h12v8h-12Z" fill="#fff"/><path d="M'+(cx-6)+' '+(cy-36)+'l4 8M'+(cx-2)+' '+(cy-36)+'l4 8M'+(cx+2)+' '+(cy-36)+'l4 8" stroke="#111" stroke-width="1.4"/>';
   function ptr(f,len,w){var a=f*Math.PI*2;return'<path d="M'+cx+' '+cy+'L'+n(cx+Math.sin(a)*len)+' '+n(cy-Math.cos(a)*len)+'" stroke="#fff" stroke-width="'+w+'" stroke-linecap="round"/>'}
   function wedge(f,len,w){var a=f*Math.PI*2,sx=Math.sin(a),cy2=-Math.cos(a),px=Math.cos(a),py=Math.sin(a);return'<path d="M'+n(cx-px*w)+' '+n(cy-py*w)+'L'+n(cx+sx*len)+' '+n(cy+cy2*len)+'L'+n(cx+px*w)+' '+n(cy+py*w)+'Z" fill="#fff"/>'}
   var a10=.014*Math.PI*2,tx=cx+Math.sin(a10)*(r-1),ty=cy-Math.cos(a10)*(r-1),nx=-Math.sin(a10),ny=Math.cos(a10),qx=Math.cos(a10),qy=Math.sin(a10);
   s+='<path d="M'+n(tx)+' '+n(ty)+'L'+n(tx+nx*10+qx*4)+' '+n(ty+ny*10+qy*4)+'L'+n(tx+nx*10-qx*4)+' '+n(ty+ny*10-qy*4)+'Z" fill="#fff"/>'+ptr(.014,r-10,1)+wedge(.14,34,4)+ptr(.4,54,2)+'<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#888"/>';
   return s+'<circle cx="'+(cx-52)+'" cy="'+(cy+54)+'" r="9" fill="#555" stroke="#222"/>'})()
  +T(156,22,'10,000 ft pointer','t2')+L('M154 18L85 38','s2',.8)+T(156,38,'stripes: below 10,000 ft','t2')+L('M154 34L86 62','s2',.8)
  +T(156,54,'1,000 ft pointer','t2')+L('M154 50L95 82','s2',.8)+T(156,70,'pressure window','t2')+L('M154 66L126 88','s2',.8)
  +T(156,86,'100 ft pointer','t2')+L('M154 82L108 134','s2',.8)
  +T(156,118,'Reads 1,400 ft','t1 ta')+T(156,132,'above the 1013 hPa','t2')+T(156,146,'pressure level','t2')+T(156,180,'setting knob','t2')+L('M154 176L36 154','s2',.8),
  'Static pressure from the static vent surrounds a sealed capsule. As you climb it expands, and gearing turns the pointers. The subscale in the window sets the pressure level the reading is measured from.'],
/* 2 */['Inside the altimeter',320,206,
  '<rect x="20" y="14" width="284" height="160" rx="12" fill="var(--surface-2)" stroke="var(--ink-2)" stroke-width="1.6"/>'+T(32,34,'Case: filled with static air','t1')
  +'<path d="M60 174V198" class="sa" stroke-width="6"/>'+AR('M60 200V184',60,186,60,178,'a',1.4)+T(70,198,'from the static vent','t2 ta')
  +'<path d="M66 108L74 100L82 108L90 100L98 108L106 100L114 108L122 100L130 108L138 100L146 108V116L138 124L130 116L122 124L114 116L106 124L98 116L90 124L82 116L74 124L66 116Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round"/>'
  +'<path d="M106 124V174" class="s2" stroke-width="4"/>'+T(106,90,'capsule','t1','middle')
  +AR('M152 108V92',152,98,152,90,'r',1.2)+AR('M152 116V132',152,126,152,134,'r',1.2)+T(160,108,'expands as','t2 tr')+T(160,122,'you climb','t2 tr')
  +T(32,146,'sealed, near vacuum,','t2')+T(32,160,'held open by a spring','t2')
  +'<path d="M106 100V64H170" class="sk" stroke-width="1.6"/><circle cx="178" cy="64" r="9" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="2.4 1.6"/><circle cx="198" cy="64" r="6" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="2 1.4"/>'
  +T(188,52,'gearing','t2','middle')+'<path d="M204 64H236" class="sk" stroke-width="1.6"/>'
  +'<circle cx="262" cy="96" r="30" fill="#151a22"/><path d="M262 96L280 76" stroke="#fff" stroke-width="2"/><circle cx="262" cy="96" r="3" fill="#888"/><path d="M236 64Q262 64 262 93" class="sk" stroke-width="1.2" stroke-dasharray="3 2"/>'
  +T(262,144,'pointers','t2','middle'),
  'The capsule is sealed with most of the air removed, and a spring stops it collapsing. Static air fills the case around it. As you climb, static pressure falls, the capsule expands, and the gearing turns the pointers. (The textbook simplifies this as "a fixed amount of air in the capsule".)'],
/* 3 */['Altitude is measured from mean sea level',320,140,
  sea(8,312,112,14)+'<path d="M8 112V86Q40 80 60 90Q80 96 96 112Z" class="gnd"/>'
  +side(150,26,.6,'a')+vdim(150,34,111,'altitude','a')
  +T(160,134,'mean sea level','t2','middle')+T(312,70,'QNH set: reads','t2','end')+T(312,84,'altitude above MSL','t2','end'),
  'With QNH set, the altimeter reads altitude: the vertical distance above mean sea level, the same datum as the elevations on your chart.'],
/* 4 */['Typical settings on a day of high pressure',320,238,
  sea(8,312,206,10)+'<path d="M196 206Q206 172 226 165H312V206Z" class="gnd"/><path d="M276 165V152" class="sk"/><path d="M276 152l9 3-9 3" class="fr"/>'
  +L('M8 192H196','sm',1.2,'5 3')+T(60,188,'1013 hPa level','t2 tm')
  +L('M8 96H312','s2',1,'6 4')+side(206,94,.55,'a')
  +dial(50,46,20,0,.4)+dial(150,46,20,.5,.35)+dial(260,46,20,.5,.25)
  +T(50,16,'set QNH 1030','t2 ta','middle')+T(150,16,'set 1013','t2 tm','middle')+T(260,16,'set QFE 980','t2 tg','middle')
  +T(50,84,'4,000','t1 ta','middle')+T(150,84,'3,500','t1 tm','middle')+T(260,84,'2,500','t1 tg','middle')
  +up(50,205,97,'a')+T(56,140,'altitude','t2 ta')+T(56,154,'4,000 ft amsl','t2 ta')
  +up(150,191,97,'m')+T(156,140,'pressure alt.','t2 tm')+T(156,154,'3,500 ft (FL35)','t2 tm')
  +up(260,164,97,'g')+T(254,114,'height','t2 tg','end')+T(254,128,'2,500 ft aal','t2 tg','end')
  +T(312,182,'aerodrome 1,500 ft','t2','end')+T(312,196,'QFE 980 hPa','t2','end')+T(14,230,'sea level: QNH 1030 hPa','t2'),
  'Drawn to scale. One aircraft at a constant level reads 4,000 ft on QNH 1030 (altitude), 3,500 ft on 1013 (FL35: the 1013 level is about 500 ft above sea level today) and 2,500 ft on QFE 980 (height above the 1,500 ft aerodrome, often used in the circuit).'],
/* 5 */['UK Altimeter Setting Regions (names only)',320,530,
  (function(){var k=39.2,c=Math.cos(56*Math.PI/180);function X(lon){return n((lon+10.6)*k*c)}function Y(lat){return n((63-lat)*k)}
   var d=UKC.map(function(p){var s='M';for(var t=0;t<p.length;t+=2)s+=(t?'L':'')+X(p[t]/1000)+' '+Y(p[t+1]/1000);return s+'Z'}).join('');
   var N=[['PUFFIN',62.2,0.2],['SHETLAND',60.7,-3.4],['MARLIN',60.8,2.1],['SKERRY',59.4,-6.8],['PETREL',59.1,0.6],['ORKNEY',58.0,-1.6],['PORTREE',57.5,-7.2],['RATTRAY',57.4,1.6],
    ['BELFAST',55.9,-6.9],['TYNE',55.7,-0.6],['SKUA',55.7,2.3],['HUMBER',54.3,1.6],['HOLYHEAD',53.6,-4.2],['BARNSLEY',53.3,-1.6],['YARMOUTH',52.9,2.2],['WESSEX',51.65,-3.6],['COTSWOLD',51.95,-1.6],['CHATHAM',51.3,0.9],['PORTLAND',50.45,-1.5],['SCILLIES',50.2,-5.6]];
   return'<rect x="0" y="0" width="320" height="530" fill="var(--ch-wt)" opacity=".35"/><path d="'+d+'" class="gnd" stroke="var(--ink-3)" stroke-width=".7"/>'
    +N.map(function(q){return T(X(q[2]),Y(q[1]),q[0],'t2 ta','middle')}).join('')
    +'<rect x="8" y="8" width="132" height="66" rx="6" fill="var(--surface)" stroke="var(--line-2)"/>'+T(16,26,'20 regions; names','t2')+T(16,40,'at rough positions.','t2')+T(16,54,'Boundaries: UK AIP','t2')+T(16,68,'ENR 6','t2')})(),
  'Each region has its own Regional Pressure Setting, the lowest forecast QNH for the hour. Ask for it by name ("Chatham regional pressure setting") and change it as you cross into the next region.'],
/* 6 */['Transition from altitudes to flight levels',320,222,
  '<path d="M8 66H312V94H8Z" fill="var(--accent-soft)"/>'+L('M8 66H312','sa',1.3,'6 4')+T(12,60,'transition level','t1 ta')+T(14,84,'transition layer','t2 ta')+L('M8 94H312','sk',1.3,'6 4')+T(12,110,'transition altitude','t1')+T(12,124,'3,000 ft amsl','t2')
  +'<path d="M8 186Q60 180 90 160Q130 140 200 150Q250 156 290 186Z" class="gnd"/>'+sea(8,312,186,8)
  +L('M8 206H312','sm',1.2,'6 4')+T(12,218,'1013 hPa level (low-pressure day)','t2 tm')
  +side(170,128,.55,'a')+up(170,186,134,'k')+T(144,146,'cruise on QNH','t2','end')+T(144,160,'(altitudes)','t2','end')
  +side(272,22,.55,'a')+up(272,205,28,'k')+T(246,18,'cruise on 1013','t2','end')+T(246,32,'(flight levels)','t2','end'),
  'Not to scale. Below the transition altitude, set QNH: altitudes from mean sea level. Above the transition level, set 1013: flight levels from the 1013 hPa level, which on a low-pressure day is below sea level. Climbing, report flight levels from the TA; descending, altitudes from the TL.'],
/* 7 */['A typical cross-country flight',320,176,
  sea(8,312,158,8)+'<path d="M8 158V150Q30 146 40 144Q160 126 312 120V158Z" class="gnd"/>'
  +L('M40 144L92 50H232L290 120','sr',1.4)+'<circle cx="40" cy="144" r="3" class="fr"/><circle cx="290" cy="120" r="3" class="fr"/>'
  +side(66,97,.45,'a')+side(160,48,.45,'a')+side(262,84,.45,'a')
  +T(160,26,'set Regional Pressure Setting','t1','middle')+T(34,134,'QNH','t1','end')+T(298,112,'QFE','t1')
  +T(160,146,'RPS en route','t2','middle'),
  'Outside controlled airspace and below 3,000 ft amsl: aerodrome QNH or QFE around the circuit, the Regional Pressure Setting en route (a new one if you cross into another region), then QFE or QNH again at the destination.'],
/* 8 */['High to low, beware below',320,230,
  T(8,16,'Into lower pressure, 1020 still set','t1')
  +sea(8,312,92,22)+L('M8 92H312','s2',.9)+T(160,110,'mean sea level','t2','middle')
  +L('M8 92L312 104','sm',1.3,'5 3')+T(14,130,'1020 hPa level','t2 tm')
  +L('M30 52.8L290 63.2','sr',1.6)+plane(30,52.8,95,'a',1)+plane(290,63.2,95,'a',1)
  +T(8,38,'QNH 1020','t1')+T(312,38,'QNH 1010','t1','end')+vdim(60,54,92,'1,000 ft','a')+vdim(244,62,92,'700 ft','r',true)+vdim(274,92,103,'300 ft','m')
  +L('M8 142H312','s2',1,'2 3')+T(8,160,'Into colder air','t1')+'<path d="M8 166H160V222H8Z" class="fm" opacity=".14"/><path d="M160 166H312V222H160Z" class="fa" opacity=".14"/>'
  +T(16,180,'warm: less dense','t2')+T(304,180,'cold: denser','t2','end')+L('M8 188Q160 188 312 210','sm',1.3,'5 3')+T(160,186,'pressure level','t2 tm','middle')
  +L('M30 198Q160 198 290 216','sr',1.6)+'<path d="M8 222H312" class="sk" stroke-width="1.2"/>'+T(246,214,'beware!','t1 tr'),
  '(a) is to scale: 10 hPa × 30 ft puts the 1020 hPa level 300 ft below sea level, so the aircraft still reading 1,000 ft is really at 700 ft. (b) Cold air lowers the pressure levels in the same way, by up to about 10% in very cold air.'],
/* 9 */['A flight level on a low-QNH day',320,240,
  sea(8,312,196,10)+'<path d="M140 196Q150 150 172 143.5H312V196Z" class="gnd"/><path d="M228 143.5L262 98L292 143.5Z" class="bld"/>'
  +L('M8 213.5H180','sm',1.2,'6 4')+T(12,230,'1013 hPa level','t2 tm')+T(56,192,'QNH 996 hPa','t2')
  +L('M8 73.5H312','sa',1,'6 4')+T(306,66,'FL40','t1 ta','end')+side(54,72,.5,'a')+side(140,89,.42,'k')
  +up(16,212,76,'m')+T(22,112,'pressure alt.','t2 tm')+T(22,126,'4,000 ft (FL40)','t2 tm')
  +up(96,195,76,'a')+T(102,160,'altitude','t2 ta')+T(102,174,'3,500 ft','t2 ta')
  +up(140,195,95,'k')+T(148,112,'other aircraft','t2')+T(148,126,'at 3,000 ft','t2')
  +vdim(116,75,90,'','r')+T(112,58,'only 500 ft apart','t2 tr','middle')
  +vdim(262,75,97,'','r')+T(256,84,'only 700 ft','t2 tr','end')+T(262,158,'hill 2,800 ft','t2','middle'),
  'To scale. QNH 996 is 17 hPa below 1013, so the 1013 level is about 500 ft below sea level and FL40 is only about 3,500 ft amsl: 500 ft above traffic at 3,000 ft and 700 ft above a 2,800 ft hill. FL45 (about 4,000 ft) is the lowest level 1,000 ft clear that day.'],
/* 10 */['Aerodrome QNH (not RPS) may be needed en route',320,210,
  '<rect x="8" y="8" width="148" height="194" rx="6" class="panel"/><rect x="164" y="8" width="148" height="194" rx="6" class="panel"/>'
  +'<path d="M8 20H120V80H8Z" fill="var(--accent-soft)" stroke="var(--accent)"/>'+T(14,36,'TMA','t1')+T(14,50,'base 2,500 ft','t2')+T(14,64,'altitude','t2')
  +sea(8,156,190,8)+'<path d="M8 190V180H156V190Z" class="gnd"/><path d="M24 176H54V180H24Z" fill="var(--ink-3)"/>'
  +AR('M14 98H150',140,98,152,98,'k',1.3)+side(86,96,.42,'a')
  +up(30,174,102,'r')+T(36,120,'set aerodrome','t2 tr')+T(36,134,'QNH 1003','t2 tr')+up(136,174,102,'r')+T(130,154,'reset RPS','t2 tr','end')+T(130,168,'(1001)','t2 tr','end')
  +sea(164,312,190,8)+'<path d="M164 190V180H312V190Z" class="gnd"/>'
  +'<path d="M228 180V56H298V180" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/>'+T(263,128,'MATZ','t1','middle')+T(263,142,'up to 3,000','t2','middle')+T(263,156,'ft aal','t2','middle')+'<path d="M258 176H268V180H258Z" fill="var(--ink-3)"/>'
  +AR('M168 98H310',298,98,310,98,'k',1.3)+side(262,96,.42,'a')
  +up(206,174,102,'r')+T(200,124,'set','t2 tr','end')+T(200,138,'MATZ','t2 tr','end')+T(200,152,'QFE','t2 tr','end')+up(306,174,102,'r')+T(306,48,'reset RPS','t2 tr','end'),
  'Heights to scale. Under a TMA, set the QNH of an aerodrome beneath it (what the traffic above uses), then go back to the RPS once clear. Set the MATZ QFE (the clutch QFE in a combined MATZ) before entering and reset the RPS after leaving. An aerodrome QNH can never be below the RPS, which is the lowest forecast in the region.'],
/* 11 */['Table of cruising levels (to FL200)',320,236,
  (function(){var X=[27,65,103,141,179,217,255,293],s='<rect x="8" y="8" width="304" height="52" fill="var(--surface-2)"/>'+T(84,24,'track 000°–179°','t1','middle')+T(236,24,'track 180°–359°','t1','middle')
   +T(46,40,'IFR','t1','middle')+T(122,40,'VFR','t1','middle')+T(198,40,'IFR','t1','middle')+T(274,40,'VFR','t1','middle')
   +X.map(function(x,i){return T(x,54,i%2?'feet':'FL','t2','middle')}).join('');
   function f(v){return v<100?'0'+v:''+v}
   for(var i=0;i<10;i++){var y=74+i*15,e=10+20*i,w=20+20*i,row=[f(e),e*100,i?f(e+5):'-',i?(e+5)*100:'-',f(w),w*100,i?f(w+5):'-',i?(w+5)*100:'-'];
    if(i%2)s+='<rect x="8" y="'+(y-11)+'" width="304" height="15" fill="var(--surface-2)" opacity=".6"/>';
    row.forEach(function(v,j){s+=T(X[j],y,typeof v==='number'?v.toLocaleString('en-GB'):v,'t2','middle')})}
   return s+L('M160 8V214','s2',1)+L('M84 30V214M236 30V214','s2',.6)+T(160,230,'continues: VFR to FL285, IFR higher','t2','middle')})(),
  'By magnetic track. IFR uses whole thousands (odd eastbound, even westbound); VFR adds 500 ft. The full table (UK AIP ENR 1.7) also gives metres.'],
/* 12 */['Semicircular cruising levels (by magnetic track)',320,236,
  '<path d="M160 22A90 90 0 0 1 160 202Z" fill="var(--accent-soft)"/><path d="M160 22A90 90 0 0 0 160 202Z" fill="var(--surface-2)"/><circle cx="160" cy="112" r="90" fill="none" stroke="var(--ink-3)" stroke-width="1.2"/>'+L('M160 16V208','sk',1.4)
  +T(160,12,'000°M','t2','middle')+T(160,226,'180°M','t2','middle')
  +T(170,62,'000°–179°','t1')+T(170,86,'IFR: odd','t1 ta')+T(170,100,'FL30, 50, 70','t2')+T(170,128,'VFR: +500','t1 ta')+T(170,142,'FL35, 55, 75','t2')
  +T(150,62,'180°–359°','t1','end')+T(150,86,'IFR: even','t1','end')+T(150,100,'FL40, 60, 80','t2','end')+T(150,128,'VFR: +500','t1','end')+T(150,142,'FL45, 65, 85','t2','end')
  +AR('M232 220H296',286,220,298,220,'a',1.6)+T(232,212,'eastbound','t2 ta')+AR('M88 220H24',34,220,22,220,'k',1.6)+T(88,212,'westbound','t2','end'),
  'East is odd, west is even; VFR adds 500 ft. The rule goes by magnetic track, not heading. It is required for IFR and recommended for VFR, which must then set 1013.']
];
var SEC=['How the altimeter works','How the altimeter works','QNH, QFE and standard pressure','QNH, QFE and standard pressure','Altimeter Setting Regions','Transition altitude','A typical cross-country',
 'En route: high to low','Choosing a flight level','Outside controlled airspace','The semicircular rule','The semicircular rule'];
DSEC['Altimeter Setting Procedures']=F.map(function(f,i){return[SEC[i],dbFig(f[0],f[1],f[2],f[3],f[4])]});
})();
