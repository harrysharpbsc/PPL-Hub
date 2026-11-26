/* ===== Diagrams redrawn from the figures in Harry's own notes =====
   Each sits inside the note section it belongs to (DSEC), matched by the start of the section title. */
(function(){
var F=dzF,T=dzT,A=dzA,B=dzB,L=dzL,P=dzP;
function sec(topic,head,figs){DSEC[topic]=(DSEC[topic]||[]).concat(figs.map(function(f){return[head,f]}))}
/* plan-view aircraft with nav lights that rotate with it */
function acL(x,y,h,sc,col,lights){sc=sc||1.4;return'<g transform="translate('+x+' '+y+') rotate('+h+') scale('+sc+')"><path d="'+ACPATH+'" fill="'+(col||'var(--ink)')+'" stroke="var(--surface)" stroke-width=".6" stroke-linejoin="round"/>'+(lights===false?'':'<circle cx="-10.3" cy="-3.3" r="1.9" fill="#e0262b" stroke="var(--surface)" stroke-width=".5"/><circle cx="10.3" cy="-3.3" r="1.9" fill="#2fa84f" stroke="var(--surface)" stroke-width=".5"/><circle cx="0" cy="10.6" r="1.6" fill="#fff" stroke="var(--ink)" stroke-width=".4"/>')+'</g>'}
function grass(x,y,w,h){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="var(--ch-l1)" stroke="var(--ch-tx)" stroke-width=".8"/>'}
function sock(x,y,a){return'<g transform="translate('+x+' '+y+') rotate('+a+')"><path d="M0 0V16" stroke="var(--ink-2)" stroke-width="1.2"/><path d="M0 0L18 2.5V5.5L0 8Z" fill="#e8742c"/><path d="M6 1V7M12 2V6" stroke="#fff" stroke-width="1.6"/></g>'}
function skyline(x0,y0,bl){var d='M'+x0+' '+y0;bl.forEach(function(b){d+='H'+b[0]+'V'+(y0-b[1])+'H'+(b[0]+b[2])+'V'+y0});return'<path d="'+d+'Z" fill="var(--ch-tn)" stroke="var(--ch-tnl)" stroke-width=".8"/>'}

/* ---------- 05 Altimeter Setting Procedures ---------- */
var D5='Altimeter Setting Procedures';
function hline(y,lab,c,dash,x1,x2,anc){x1=x1||10;x2=x2||310;return L('M'+x1+' '+y+'H'+x2,c,1.3,dash)+(lab?T(anc==='start'?x1+2:x2-2,y-4,lab,'d2',anc==='start'?null:'end',null,c):'')}
function vdim(x,y1,y2,lab,c,side,ly){var m=ly||(y1+y2)/2;return A(x,m,x,y1+1,c,1.3)+A(x,m,x,y2-1,c,1.3)+'<rect x="'+(side==='l'?x-64:x+4)+'" y="'+(m-8)+'" width="60" height="14" rx="3" fill="var(--surface)" opacity=".85"/>'+T(side==='l'?x-6:x+6,m+3,lab,'d2',side==='l'?'end':null,null,c)}
function sea(y){return'<path d="M10 '+y+'H120V'+(y+16)+'H10Z" fill="var(--ch-wt)"/>'}
sec(D5,'How the altimeter works',[
 F('The altimeter is a pressure gauge',
  (function(){var cx=78,cy=96,r=62,s='<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+6)+'" fill="#3a4250"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#151a22"/>';
   for(var k=0;k<50;k++){var a=k/50*Math.PI*2,l=k%5?5:9;s+='<path d="M'+(cx+Math.sin(a)*r).toFixed(1)+' '+(cy-Math.cos(a)*r).toFixed(1)+'L'+(cx+Math.sin(a)*(r-l)).toFixed(1)+' '+(cy-Math.cos(a)*(r-l)).toFixed(1)+'" stroke="#fff" stroke-width="'+(k%5?.8:1.6)+'"/>'}
   for(k=0;k<10;k++){var a2=k/10*Math.PI*2;s+='<text x="'+(cx+Math.sin(a2)*(r-17)).toFixed(1)+'" y="'+(cy-Math.cos(a2)*(r-17)+4).toFixed(1)+'" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="11" fill="#fff">'+k+'</text>'}
   s+='<rect x="'+(cx+16)+'" y="'+(cy-7)+'" width="28" height="14" rx="2" fill="#000" stroke="#777"/><text x="'+(cx+30)+'" y="'+(cy+4)+'" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#fff">1013</text>';
   s+='<path d="M'+(cx-6)+' '+(cy-36)+'h12v8h-12Z" fill="#fff"/><path d="M'+(cx-6)+' '+(cy-36)+'l4 8M'+(cx-2)+' '+(cy-36)+'l4 8M'+(cx+2)+' '+(cy-36)+'l4 8" stroke="#111" stroke-width="1.4"/>';
   function ptr(f,len,w){var a=f*Math.PI*2;return'<path d="M'+cx+' '+cy+'L'+(cx+Math.sin(a)*len).toFixed(1)+' '+(cy-Math.cos(a)*len).toFixed(1)+'" stroke="#fff" stroke-width="'+w+'" stroke-linecap="round"/>'}
   /* reading 1,400 ft: 10,000 ft pointer 0.014 rev, 1,000 ft pointer 0.14 rev, 100 ft pointer 0.4 rev */
   function wedge(f,len,w){var a=f*Math.PI*2,sx=Math.sin(a),cy2=-Math.cos(a),px=Math.cos(a),py=Math.sin(a);return'<path d="M'+(cx-px*w).toFixed(1)+' '+(cy-py*w).toFixed(1)+'L'+(cx+sx*len).toFixed(1)+' '+(cy+cy2*len).toFixed(1)+'L'+(cx+px*w).toFixed(1)+' '+(cy+py*w).toFixed(1)+'Z" fill="#fff"/>'}
   var a10=.014*Math.PI*2,tx=cx+Math.sin(a10)*(r-1),ty=cy-Math.cos(a10)*(r-1),nx=-Math.sin(a10),ny=Math.cos(a10),qx=Math.cos(a10),qy=Math.sin(a10);
   s+='<path d="M'+tx.toFixed(1)+' '+ty.toFixed(1)+'L'+(tx+nx*10+qx*4).toFixed(1)+' '+(ty+ny*10+qy*4).toFixed(1)+'L'+(tx+nx*10-qx*4).toFixed(1)+' '+(ty+ny*10-qy*4).toFixed(1)+'Z" fill="#fff"/>'+ptr(.014,r-10,1)
   +wedge(.14,34,4)+ptr(.4,54,2)+'<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#888"/>';
   s+='<circle cx="'+(cx-52)+'" cy="'+(cy+54)+'" r="9" fill="#555" stroke="#222"/>';
   return s})()
  +T(150,22,'10,000 ft pointer (triangle)','d2')+L('M148 20L85 38','var(--ink-2)',.8)
  +T(150,40,'striped sector: below 10,000 ft','d2')+L('M148 38L86 62','var(--ink-2)',.8)
  +T(150,58,'1,000 ft pointer (short, wide)','d2')+L('M148 56L95 82','var(--ink-2)',.8)
  +T(150,76,'pressure window (subscale)','d2')+L('M148 74L123 91','var(--ink-2)',.8)
  +T(150,100,'100 ft pointer (long, thin)','d2')+L('M148 98L104 131','var(--ink-2)',.8)
  +T(150,126,'Reads 1,400 ft above the','d1')+T(150,138,'pressure level set in the','d1')+T(150,150,'window (here 1013 hPa)','d1')+T(150,174,'subscale-setting knob','d2')+L('M148 172L36 154','var(--ink-2)',.8),
  'Static pressure from the static vent surrounds a sealed capsule. As you climb it expands, and gearing turns the pointers. The subscale sets the datum the reading is measured from.',320,184),
 F('Inside the altimeter',
  dzB(20,14,284,160,'var(--surface-2)','var(--ink-2)',12,1.6)+T(32,32,'sealed instrument case, filled with static air','d1')
  +'<path d="M60 174V196" stroke="var(--accent)" stroke-width="6"/>'+A(60,196,60,178,'var(--accent)',1.4)+T(70,194,'from the static vent on the outside of the aircraft','d2',null,null,'var(--accent)')
  +'<path d="M66 108L74 100L82 108L90 100L98 108L106 100L114 108L122 100L130 108L138 100L146 108V116L138 124L130 116L122 124L114 116L106 124L98 116L90 124L82 116L74 124L66 116Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.4" stroke-linejoin="round"/>'
  +T(106,115,'near vacuum','d2','middle')+'<path d="M106 124V174" stroke="var(--ink-2)" stroke-width="4"/>'
  +A(152,104,152,90,'var(--bad)',1.2)+A(152,120,152,134,'var(--bad)',1.2)+T(158,96,'expands as','d2',null,null,'var(--bad)')+T(158,106,'you climb','d2',null,null,'var(--bad)')
  +T(32,146,'aneroid capsule: sealed,','d2')+T(32,156,'air removed, spring-held','d2')
  +'<path d="M106 100V64H170" stroke="var(--ink)" stroke-width="1.6" fill="none"/><circle cx="178" cy="64" r="9" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="2.4 1.6"/><circle cx="198" cy="64" r="6" fill="none" stroke="var(--ink)" stroke-width="2" stroke-dasharray="2 1.4"/>'
  +T(188,50,'linkage and gearing','d2','middle')+'<path d="M204 64H236" stroke="var(--ink)" stroke-width="1.6"/>'
  +'<circle cx="262" cy="96" r="30" fill="#151a22"/><path d="M262 96L280 76" stroke="#fff" stroke-width="2"/><circle cx="262" cy="96" r="3" fill="#888"/><path d="M236 64Q262 64 262 93" stroke="var(--ink)" stroke-width="1.2" fill="none" stroke-dasharray="3 2"/>'
  +T(262,142,'pointers','d2','middle'),
  'The capsule is sealed with most of the air removed, and a spring stops it collapsing. Static air fills the case around it. As you climb, static pressure falls, the capsule expands, and the gearing turns the pointers. (The textbook simplifies this as "a fixed amount of air in the capsule".)',320,204)
]);
function dial(cx,cy,r,set,f100,f1000){function pt(f,l,w){var a=f*Math.PI*2;return'<path d="M'+cx+' '+cy+'L'+(cx+Math.sin(a)*l).toFixed(1)+' '+(cy-Math.cos(a)*l).toFixed(1)+'" stroke="#fff" stroke-width="'+w+'" stroke-linecap="round"/>'}
 return'<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+2)+'" fill="#3a4250"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#151a22"/>'+'<text x="'+(cx-r+3)+'" y="'+(cy-r*.35)+'" font-family="sans-serif" font-size="6" font-weight="700" fill="#fff">ALT</text>'
 +'<rect x="'+(cx)+'" y="'+(cy-r*.62)+'" width="19" height="8" fill="#000" stroke="#888" stroke-width=".5"/><text x="'+(cx+9.5)+'" y="'+(cy-r*.62+6.3)+'" text-anchor="middle" font-family="sans-serif" font-size="6" fill="#fff">'+set+'</text>'
 +pt(f100,r-3,1.3)+pt(f1000,r*.55,2.8)+'<circle cx="'+cx+'" cy="'+cy+'" r="1.8" fill="#888"/>'}
function tower2(x,y){return'<path d="M'+x+' '+y+'V'+(y-22)+'" stroke="var(--ink-2)" stroke-width="3"/><path d="M'+(x-8)+' '+(y-22)+'H'+(x+8)+'L'+(x+5)+' '+(y-28)+'H'+(x-5)+'Z" fill="var(--ink-2)"/><path d="M'+(x-10)+' '+(y-29)+'H'+(x+10)+'L'+x+' '+(y-34)+'Z" fill="var(--ink)"/>'}
function wave(x1,x2,y){var d='M'+x1+' '+y;for(var x=x1;x<x2;x+=8)d+='q2 -2 4 0t4 0';return'<path d="M'+x1+' '+y+'H'+x2+'V'+(y+8)+'H'+x1+'Z" fill="var(--ch-wt)"/>'+'<path d="'+d+'" stroke="var(--ch-rv)" stroke-width="1" fill="none"/>'}
sec(D5,'QNH, QFE and standard pressure',[
 F('Altitude is measured from mean sea level',
  wave(10,310,112)+'<path d="M10 112V86Q40 80 60 90Q80 96 96 112Z" fill="var(--ch-l1)" stroke="var(--ch-tx)" stroke-width=".6"/>'+tower2(26,88)
  +dzSide(150,24,.42,'var(--accent)',true)+A(150,70,150,30,'var(--ink)',1.3)+A(150,70,150,110,'var(--ink)',1.3)+T(156,74,'altitude','d1')
  +T(104,106,'mean sea level','d2')+T(308,94,'QNH: the actual MSL pressure','d2','end')+T(308,104,'at any one place','d2','end'),
  'With QNH set, the altimeter reads altitude: the vertical distance above mean sea level, the same datum as the elevations on your chart.',320,128),
 F('Typical settings on a day of high pressure',
  wave(10,310,196)+'<path d="M196 196Q206 160 226 151H310V196Z" fill="var(--ch-l1)" stroke="var(--ch-tx)" stroke-width=".6"/>'
  +L('M10 181H200','var(--mid)',1.2,'5 3')+T(12,177,'standard pressure 1013 hPa','d2',null,null,'var(--mid)')
  +L('M10 76H310','var(--ink-2)',.9,'6 4')+T(104,72,'constant level','d2','middle')+dzSide(206,74,.42,'var(--accent)',true)
  +dial(50,44,19,'1030',0,.4)+dial(150,44,19,'1013',.5,.35)+dial(260,44,19,'980',.5,.25)
  +T(50,14,'reads 4,000 ft','d2','middle')+T(150,14,'reads 3,500 ft','d2','middle')+T(260,14,'reads 2,500 ft','d2','middle')
  +A(50,136,50,78,'var(--accent)',1.4)+L('M50 136V194','var(--accent)',1.4)+T(56,124,'altitude','d2',null,null,'var(--accent)')+T(56,134,'4,000 ft amsl','d2',null,null,'var(--accent)')
  +A(150,130,150,78,'var(--mid)',1.4)+L('M150 130V180','var(--mid)',1.4)+T(156,118,'pressure altitude','d2',null,null,'var(--mid)')+T(156,128,'3,500 ft (FL35)','d2',null,null,'var(--mid)')
  +A(260,114,260,78,'var(--good)',1.4)+L('M260 114V150','var(--good)',1.4)+T(254,94,'height','d2','end',null,'var(--good)')+T(254,104,'2,500 ft aal','d2','end',null,'var(--good)')
  +'<path d="M276 151V140" stroke="var(--ink)"/><path d="M276 140l9 3-9 3" fill="var(--bad)"/>'+T(308,166,'QFE 980 hPa','d2','end')+T(308,177,'aerodrome elev. 1,500 ft','d2','end')
  +T(14,192,'QNH 1030 hPa: mean sea level','d2'),
  'Drawn to scale. One aircraft at a constant level reads 4,000 ft on QNH 1030 (altitude), 3,500 ft on 1013 (FL35: the 1013 level is about 500 ft above sea level today) and 2,500 ft on QFE 980 (height above the 1,500 ft aerodrome, often used in the circuit).',320,212)
]);
/* UK Altimeter Setting Regions: real coastline (Natural Earth), region names at approximate positions */
(function(){var k=39.2,c=Math.cos(56*Math.PI/180);function X(lon){return((lon+10.6)*k*c).toFixed(1)}function Y(lat){return((63-lat)*k).toFixed(1)}
 var d=UKC.map(function(p){var s='M';for(var t=0;t<p.length;t+=2)s+=(t?'L':'')+X(p[t]/1000)+' '+Y(p[t+1]/1000);return s+'Z'}).join('');
 var N=[['PUFFIN',62.2,0.2],['SHETLAND',60.7,-3.4],['MARLIN',60.8,2.1],['SKERRY',59.4,-6.8],['PETREL',59.1,0.6],['ORKNEY',58.0,-1.6],['PORTREE',57.5,-7.2],['RATTRAY',57.4,1.6],
  ['BELFAST',55.9,-6.9],['TYNE',55.7,-0.6],['SKUA',55.7,2.3],['HUMBER',54.3,1.6],['HOLYHEAD',53.6,-4.2],['BARNSLEY',53.3,-1.6],['YARMOUTH',52.9,2.2],['WESSEX',51.65,-3.6],['COTSWOLD',51.95,-1.6],['CHATHAM',51.3,0.9],['PORTLAND',50.45,-1.5],['SCILLIES',50.2,-5.6]];
 sec(D5,'Altimeter Setting Regions',[
  F('UK Altimeter Setting Regions (names only)',
   '<rect x="0" y="0" width="320" height="530" fill="var(--ch-wt)" opacity=".35"/><path d="'+d+'" fill="var(--ch-land)" stroke="var(--ch-tx)" stroke-width=".7"/>'
   +N.map(function(n){return T(X(n[2]),Y(n[1]),n[0],'d1','middle',8.5,'var(--accent)')}).join('')
   +dzB(8,8,132,52,'var(--surface)','var(--line)')+T(14,22,'20 regions. Names are at','d2')+T(14,33,'approximate positions;','d2')+T(14,44,'for the boundaries see','d2')+T(14,55,'the UK AIP, ENR 6','d2'),
   'Each region has its own Regional Pressure Setting, the lowest forecast QNH for the hour. Ask for it by name ("Chatham regional pressure setting") and change it as you cross into the next region.',320,530)
 ]);
})();
sec(D5,'Transition altitude',[
 F('Transition from altitudes to flight levels',
  '<path d="M10 66H310V94H10Z" fill="var(--accent-soft)"/>'+hline(66,'','var(--accent)','6 4')+T(12,62,'transition level','d1')+T(14,84,'transition layer','d1')+hline(94,'','var(--ink)','6 4')+T(12,106,'transition altitude 3,000 ft amsl','d1')
  +'<path d="M10 186Q60 180 90 160Q130 140 200 150Q250 156 290 186Z" fill="var(--ch-l1)" stroke="var(--ch-tx)" stroke-width=".6"/>'+wave(10,310,186)+T(14,182,'QNH','d2')
  +L('M10 206H310','var(--mid)',1.2,'6 4')+T(12,202,'1013 hPa on a day of low pressure','d2',null,null,'var(--mid)')
  +dzSide(170,128,.42,'var(--accent)',true)+A(170,186,170,134,'var(--ink)',1.3)+T(140,122,'cruise on QNH','d2','end')+T(140,132,'(altitudes)','d2','end')+T(176,164,'altitude (amsl)','d2')
  +dzSide(272,22,.42,'var(--accent)',true)+A(272,205,272,28,'var(--ink)',1.3)+T(246,18,'cruise on 1013 hPa','d2','end')+T(246,28,'(flight levels)','d2','end')+T(266,46,'flight level','d2','end'),
  'Not to scale. Below the transition altitude, QNH and altitudes measured from mean sea level. Above the transition level, 1013 and flight levels measured from the 1013 hPa level, which on a low-pressure day is below sea level. Climbing, report flight levels from the TA; descending, altitudes from the TL.',320,214)
]);
sec(D5,'A typical cross-country',[
 F('A typical cross-country flight',
  wave(10,310,158)+'<path d="M10 158V150Q30 146 40 144Q160 126 310 120V158Z" fill="var(--ch-l1)" stroke="var(--ch-tx)" stroke-width=".6"/>'
  +L('M40 144L92 50H232L290 120','var(--bad)',1.4)+'<circle cx="40" cy="144" r="3" fill="var(--bad)"/><circle cx="290" cy="120" r="3" fill="var(--bad)"/>'
  +dzSide(66,97,.36,'var(--accent)',true)+dzSide(150,48,.36,'var(--accent)',true)+dzSide(262,84,.36,'var(--accent)',true)
  +T(160,26,'set Regional Pressure Setting','d1','middle')+T(36,134,'QNH','d1','end')+T(296,112,'QFE','d1')
  +T(160,150,'Regional Pressure Setting en route','d2','middle')
  +T(12,182,'In each circuit: aerodrome QFE (height aal) or','d2')+T(12,193,'aerodrome QNH (altitude), whichever you prefer.','d2'),
  'Outside controlled airspace and below 3,000 ft amsl: aerodrome QNH or QFE around the circuit, the RPS en route (a new one if you cross into another region), then QFE or QNH again at the destination.',320,200)
]);
sec(D5,'En route: high to low',[
 F('High to low, beware below',
  T(10,16,'(a) into lower pressure with 1020 still set','d1')
  +'<path d="M10 92H310V114H10Z" fill="var(--ch-wt)"/>'+hline(92,'','var(--ink-2)')+T(160,110,'mean sea level','d2','middle')
  +L('M10 92L310 104','var(--mid)',1.3,'5 3')+T(306,126,'1020 hPa level','d2','end',null,'var(--mid)')
  +L('M30 52.8L290 63.2','var(--bad)',1.6)+P(30,52.8,95,'var(--accent)',1.1)+P(290,63.2,95,'var(--accent)',1.1)
  +T(10,38,'QNH 1020','d1')+T(310,38,'QNH 1010','d1','end')+vdim(60,54,93,'1,000 ft','var(--accent)')+vdim(250,62,92,'700 ft','var(--bad)','l')+vdim(280,92,103,'300 ft','var(--mid)')
  +T(10,146,'(b) into colder air','d1')+'<path d="M10 150H160V214H10Z" fill="#f4d3b5" opacity=".6"/><path d="M160 150H310V214H160Z" fill="#c7def0" opacity=".7"/>'
  +T(20,162,'warm: less dense','d2')+T(300,162,'cold: more dense','d2','end')+L('M10 172Q160 172 310 196','var(--mid)',1.3,'5 3')+T(160,170,'pressure level','d2','middle',null,'var(--mid)')
  +L('M30 182Q160 182 290 202','var(--bad)',1.6)+'<path d="M10 214H310" stroke="var(--ink-2)" stroke-width="1.2"/>'+T(240,212,'beware!','d1',null,null,'var(--bad)'),
  '(a) is to scale: 10 hPa × 30 ft puts the 1020 hPa level 300 ft below sea level, so the aircraft still reading 1,000 ft is really at 700 ft. (b) Cold air lowers the pressure levels in the same way, by up to about 10% in very cold air.',320,222)
]);
sec(D5,'Choosing a flight level',[
 F('A flight level on a low-QNH day',
  wave(10,310,196)+'<path d="M140 196Q150 150 172 143.5H310V196Z" fill="var(--ch-l1)" stroke="var(--ch-tx)" stroke-width=".6"/><path d="M228 143.5L262 98L292 143.5Z" fill="var(--ch-l2)" stroke="var(--ch-tx)" stroke-width=".7"/>'
  +L('M10 213.5H180','var(--mid)',1.2,'6 4')+T(12,226,'standard pressure 1013 hPa','d2',null,null,'var(--mid)')+T(64,192,'QNH 996 hPa','d2')
  +L('M10 73.5H310','var(--accent)',1,'6 4')+T(306,69,'FL40','d1','end',null,'var(--accent)')+dzSide(54,72,.42,'var(--accent)',true)+dzSide(140,89,.36,'var(--ink)',true)
  +A(16,140,16,75,'var(--mid)',1.3)+L('M16 140V212','var(--mid)',1.3)+T(20,120,'pressure','d2')+T(20,130,'alt. 4,000 ft','d2')+T(20,140,'(FL40)','d2')
  +A(90,150,90,75,'var(--accent)',1.3)+L('M90 150V195','var(--accent)',1.3)+T(94,160,'altitude only','d2')+T(94,170,'3,500 ft','d2')
  +A(140,150,140,94,'var(--ink)',1.3)+L('M140 150V195','var(--ink)',1.3)+T(148,114,'other aircraft at','d2')+T(148,124,'altitude 3,000 ft','d2')
  +A(116,82,116,75,'var(--bad)',1.2)+A(116,82,116,90,'var(--bad)',1.2)+T(112,64,'separation only 500 ft','d2','middle',null,'var(--bad)')
  +A(262,86,262,75,'var(--bad)',1.2)+A(262,86,262,97,'var(--bad)',1.2)+T(256,86,'terrain clearance','d2','end',null,'var(--bad)')+T(256,96,'only 700 ft','d2','end',null,'var(--bad)')
  +T(262,126,'spot height','d2','middle')+T(262,136,'2,800 ft','d2','middle')+T(180,156,'QFE 946 hPa','d2'),
  'To scale. QNH 996 is 17 hPa below 1013, so the 1013 level is about 500 ft below sea level and FL40 is only about 3,500 ft amsl: 500 ft above traffic at 3,000 ft and 700 ft above a 2,800 ft spot height. FL45 (about 4,000 ft) is the lowest level 1,000 ft clear that day.',320,232)
]);
sec(D5,'Outside controlled airspace',[
 F('Aerodrome QNH (not RPS) may be needed en route',
  dzB(8,8,148,192,'var(--surface)','var(--line)',4)+dzB(164,8,148,192,'var(--surface)','var(--line)',4)
  +'<path d="M8 20H112V76H8Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1"/>'+T(14,34,'TMA','d1')+T(14,46,'base 2,500 ft alt.','d2')+T(14,57,'(up to FL245)','d2')
  +wave(8,156,186)+'<path d="M8 186V176H156V186Z" fill="var(--ch-l1)"/>'+'<path d="M24 172H54V176H24Z" fill="var(--ink-2)"/>'
  +L('M14 96H150','var(--ink)',1.3)+A(140,96,152,96,'var(--ink)',1.3)+dzSide(86,94,.34,'var(--accent)',true)
  +A(30,170,30,100,'var(--bad)',1.3)+T(36,118,'set aerodrome','d2')+T(36,128,'QNH 1003','d2')+A(134,170,134,100,'var(--bad)',1.3)+T(128,140,'reset RPS','d2','end')+T(128,150,'(1001)','d2','end')
  +wave(164,312,186)+'<path d="M164 186V176H312V186Z" fill="var(--ch-l1)"/>'
  +'<path d="M226 176V56H296V176" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/>'+T(261,130,'MATZ','d1','middle')+T(261,142,'surface to','d2','middle')+T(261,152,'3,000 ft aal','d2','middle')+'<path d="M256 172H266V176H256Z" fill="var(--ink-2)"/>'
  +L('M168 96H310','var(--ink)',1.3)+A(298,96,310,96,'var(--ink)',1.3)+dzSide(262,94,.34,'var(--accent)',true)
  +A(204,170,204,100,'var(--bad)',1.3)+T(198,124,'set','d2','end')+T(198,134,'MATZ','d2','end')+T(198,144,'QFE','d2','end')+A(304,170,304,100,'var(--bad)',1.3)+T(306,48,'reset RPS','d2','end'),
  'Heights to scale. Under a TMA, set the QNH of an aerodrome beneath it (what the traffic above uses), then go back to the RPS once clear. Set the MATZ QFE (the clutch QFE in a combined MATZ) before entering and reset the RPS after leaving. The book shows the aerodrome QNH below the RPS; that cannot happen, so the numbers here are consistent.',320,206)
]);
sec(D5,'The semicircular rule',[
 F('Table of cruising levels (to FL200)',
  (function(){var s='<rect x="8" y="8" width="304" height="44" fill="var(--surface-2)"/>'+T(84,20,'track 000° to 179°','d1','middle')+T(236,20,'track 180° to 359°','d1','middle')
   +T(46,33,'IFR','d1','middle')+T(122,33,'VFR','d1','middle')+T(198,33,'IFR','d1','middle')+T(274,33,'VFR','d1','middle')
   +[27,65,103,141,179,217,255,293].map(function(x,i){return T(x,46,i%2?'feet':'FL','d2','middle')}).join('');
   function f(n){return n<100?'0'+n:''+n}
   for(var i=0;i<10;i++){var y=64+i*13,e=10+20*i,w=20+20*i,row=[f(e),e*100,i?f(e+5):'-',i?(e+5)*100:'-',f(w),w*100,i?f(w+5):'-',i?(w+5)*100:'-'];
    if(i%2)s+='<rect x="8" y="'+(y-9)+'" width="304" height="13" fill="var(--surface-2)" opacity=".6"/>';
    row.forEach(function(v,j){s+=T([27,65,103,141,179,217,255,293][j],y,typeof v==='number'?v.toLocaleString('en-GB'):v,'d2','middle')})}
   return s+L('M160 8V188','var(--ink-2)',1)+L('M84 26V188M236 26V188','var(--line)',.8)+T(160,200,'… continues: VFR to FL285, IFR to FL410 and beyond','d2','middle')})(),
  'By magnetic track. IFR uses whole thousands (odd eastbound, even westbound); VFR adds 500 ft. The full table (UK AIP ENR 1.7) also gives metres.',320,208),
 F('Semicircular cruising levels (by magnetic track)',
  '<circle cx="160" cy="104" r="80" fill="var(--surface)" stroke="var(--ink-2)" stroke-width="1.2"/>'
  +'<path d="M160 24A80 80 0 0 1 160 184Z" fill="var(--accent-soft)"/><path d="M160 24A80 80 0 0 0 160 184Z" fill="var(--surface-2)"/>'+L('M160 18V190','var(--ink)',1.4)
  +T(160,14,'360 / 000°M','d2','middle')+T(160,202,'180°M','d2','middle')
  +T(170,62,'000°–179°','d1')+T(170,82,'IFR: odd','d1')+T(170,94,'FL30, 50, 70','d2')+T(170,116,'VFR: odd + 500','d1')+T(170,128,'FL35, 55, 75','d2')
  +T(150,62,'180°–359°','d1','end')+T(150,82,'IFR: even','d1','end')+T(150,94,'FL40, 60, 80','d2','end')+T(150,116,'VFR: even + 500','d1','end')+T(150,128,'FL45, 65, 85','d2','end')
  +A(250,104,296,104,'var(--accent)',1.6)+T(300,96,'east','d2','end')+A(70,104,24,104,'var(--ink-2)',1.6)+T(20,96,'west','d2'),
  'East is odd, west is even; VFR adds 500 ft. The rule goes by magnetic track, not heading. Required for IFR; recommended for VFR, which must then set 1013.',320,210)
]);


/* ---------- 06 Airspace ---------- */
var D6='Airspace';
function tbl(x,y,cols,rows,rh,head){var s='',cx=x;var W=cols.reduce(function(a,c){return a+c[0]},0);
 s+='<rect x="'+x+'" y="'+y+'" width="'+W+'" height="'+rh+'" fill="var(--surface-2)"/>';
 cols.forEach(function(c){s+=T(cx+4,y+rh-6,c[1],'d1');cx+=c[0]});
 rows.forEach(function(r,i){var yy=y+rh*(i+1);if(i%2)s+='<rect x="'+x+'" y="'+yy+'" width="'+W+'" height="'+rh+'" fill="var(--surface-2)" opacity=".5"/>';cx=x;
  r.forEach(function(v,j){var col=null;if(typeof v==='object'){col=v[1];v=v[0]}s+=T(cx+4,yy+rh-6,v,j?'d2':'d1',null,null,col);cx+=cols[j][0]})});
 return s+L('M'+x+' '+(y+rh)+'H'+(x+W),'var(--line)',1)}
sec(D6,'Flight Information Regions',[
 F('FIRs and UIRs (not to scale)',
  '<path d="M60 150H300V196H60Z" fill="var(--accent-soft)"/><path d="M60 40H300V150H60Z" fill="var(--surface-2)"/>'
  +L('M60 150H300','var(--accent)',1.4)+L('M60 40H300','var(--ink)',1.4)+wave(60,300,196)
  +T(180,178,'London FIR / Scottish FIR','d1','middle')+T(180,190,'surface to FL245','d2','middle')
  +T(180,96,'London UIR / Scottish UIR','d1','middle')+T(180,108,'FL245 to FL660 (upper airspace)','d2','middle')
  +T(54,154,'FL245','d1','end')+T(54,44,'FL660','d1','end')+T(54,196,'SFC','d1','end')
  +L('M60 124H300','var(--mid)',1,'5 3')+T(296,120,'in Europe the UIR starts at FL195','d2','end',null,'var(--mid)'),
  'Two UK FIRs, London and Scottish, from the surface to FL245. Upper airspace above them forms the London and Scottish UIRs, FL245 to FL660.',320,206)
]);
sec(D6,'Control Zones, TMAs',[
 F('CTR, TMA, airway and ATZ (side view, not to scale)',
  wave(10,310,186)+'<path d="M10 186V180H310V186Z" fill="var(--ch-l1)"/>'
  +'<path d="M120 180V96H200V180Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>'+T(160,122,'CTR','d1','middle')+T(160,134,'from the surface','d2','middle')
  +'<path d="M70 96V60H250V96Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>'+T(160,74,'TMA (a CTA)','d1','middle')+T(160,86,'from a base altitude','d2','middle')
  +'<path d="M10 60V30H310V60H260V48H60V60Z" fill="var(--surface-2)" stroke="var(--ink-2)" stroke-width="1.2"/>'+T(160,42,'airway: 5 nm each side of centreline','d2','middle')+T(14,74,'airway base','d2')+T(14,84,'stepped down','d2')+T(14,94,'near aerodromes','d2')
  +'<path d="M140 180V146H180V180" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/>'+T(160,164,'ATZ','d2','middle',null,'var(--bad)')
  +'<path d="M152 180H168V176H152Z" fill="var(--ink-2)"/>',
  'A Control Zone starts at the surface; a Control Area (including a TMA) and an airway start at a base. An ATZ sits inside the CTR.',320,196)
]);
sec(D6,'Special VFR',[
 F('Special VFR minima (inside a Control Zone)',
  dzB(8,8,304,150,'var(--accent-soft)','var(--accent)',6,1.4)+T(16,24,'Control Zone only','d1',null,null,'var(--accent)')
  +'<path d="M150 30Q164 18 180 26Q196 14 214 26Q236 22 236 38Q236 50 214 48H160Q144 48 150 30Z" fill="#fff" stroke="var(--ink-2)"/>'+T(250,36,'clear of cloud','d2')
  +dzSide(120,72,.42,'var(--accent)',true)+T(150,72,'≤ 140 kt','d1')+T(150,84,'flight visibility ≥ 1,500 m','d2')
  +'<path d="M8 150H312" stroke="var(--ch-tx)" stroke-width="1"/><path d="M8 150V140Q60 130 120 140T312 136V150Z" fill="var(--ch-l1)"/>'+T(16,132,'in sight of the surface','d2')
  +T(16,176,'No take-off, landing or ATZ entry if the aerodrome reports:','d2')+T(16,188,'ground visibility below 1,500 m, or cloud ceiling below 600 ft.','d1'),
  'An ATC authorisation: no flight plan needed but ATC approval is. ATC separate SVFR from other SVFR and IFR traffic.',320,196)
]);
sec(D6,'Crossing an airway',[
 F('Crossing the base of an airway',
  T(8,14,'plan view','d1')+'<path d="M8 40H312V100H8Z" fill="var(--surface-2)" stroke="var(--ink-2)"/>'+L('M8 70H312','var(--ink-2)',1,'8 5')+T(306,64,'B1: Class A, FL75+','d2','end')
  +L('M160 20V120','var(--good)',1.6)+A(160,110,160,24,'var(--good)',1.6)+T(166,118,'at right angles','d2',null,null,'var(--good)')
  +A(30,40,30,70,'var(--ink)',1)+A(30,100,30,70,'var(--ink)',1)+T(36,56,'5 nm','d2')+T(36,92,'5 nm','d2')
  +T(8,140,'side view','d1')+'<path d="M8 150H312V172H8Z" fill="var(--surface-2)" stroke="var(--ink-2)"/>'+T(160,165,'airway (do not enter)','d2','middle')
  +L('M8 172H312','var(--bad)',1.4)+T(306,186,'base FL75','d2','end',null,'var(--bad)')+dzSide(150,194,.38,'var(--accent)',true)+T(176,198,'below FL75, in VMC','d2'),
  'Without an instrument rating you may pass under an airway whose base is a flight level, at right angles, in VMC, but never inside it. To cross through it you need an IR, a flight plan and a crossing clearance requested 10 minutes ahead.',320,210)
]);
sec(D6,'Aerodrome Traffic Zones',[
 F('ATZ dimensions (plan to scale)',
  (function(){var k=28,s='';[[84,96,2,'longest runway 1,850 m or less','2 nm'],[236,96,2.5,'longest runway over 1,850 m','2.5 nm']].forEach(function(z,i){var r=z[2]*k,cx=z[0],cy=z[1],len=(i?2400:1600)/1852*k;
   s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/>'
   +'<path d="M'+(cx-len/2*.94)+' '+(cy+len/2*.34)+'L'+(cx+len/2*.94)+' '+(cy-len/2*.34)+'" stroke="var(--ink-2)" stroke-width="4"/>'+'<circle cx="'+cx+'" cy="'+cy+'" r="2" fill="var(--bad)"/>'
   +A(cx,cy,cx,cy+r-1,'var(--ink)',1.1)+T(cx+4,cy+r/2+8,z[4],'d1')+T(cx,cy-r-8,z[3],'d2','middle')});return s})()
  +T(160,186,'surface to 2,000 ft aal, centred on the mid-point of the longest runway','d2','middle'),
  'Radius 2 nm if the longest runway is 1,850 m or less, 2.5 nm if longer (some 2 nm ATZs are enlarged to give 1.5 nm beyond every runway end). Runways drawn to the same scale: 1,600 m and 2,400 m.',320,196)
]);
sec(D6,'Military Aerodrome',[
 F('MATZ dimensions (to scale)',
  (function(){var k=12,cx=86,cy=84,r=5*k,s=T(8,16,'plan','d1');
   s+='<path d="M'+(cx+r*Math.cos(Math.asin(2/5)))+' '+(cy-2*k)+'H'+(cx+r+5*k)+'V'+(cy+2*k)+'H'+(cx+r*Math.cos(Math.asin(2/5)))+'" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/>';
   s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(2.5*k)+'" fill="none" stroke="var(--bad)" stroke-dasharray="3 2"/>';
   s+='<path d="M'+(cx-14)+' '+cy+'H'+(cx+14)+'" stroke="var(--ink-2)" stroke-width="4"/>'+A(cx,cy,cx-r+1,cy,'var(--ink)',1)+T(cx-r/2,cy-4,'5 nm','d2','middle');
   s+=A(cx+r+2.5*k,cy+2*k+10,cx+r,cy+2*k+10,'var(--ink)',1)+A(cx+r+2.5*k,cy+2*k+10,cx+r+5*k,cy+2*k+10,'var(--ink)',1)+T(cx+r+2.5*k,cy+2*k+22,'5 nm','d2','middle');
   s+=A(cx+r+5*k+8,cy,cx+r+5*k+8,cy-2*k,'var(--ink)',1)+A(cx+r+5*k+8,cy,cx+r+5*k+8,cy+2*k,'var(--ink)',1)+T(cx+r+5*k+12,cy+4,'4 nm wide','d2');
   s+=T(cx,cy+r+14,'ATZ inside (dashed)','d2','middle',null,'var(--bad)');
   var y0=246,h=22;s+=T(8,172,'side','d1')+'<path d="M'+(cx-r)+' '+y0+'V'+(y0-3*h)+'H'+(cx+r+5*k)+'V'+(y0-h)+'H'+(cx+r)+'V'+y0+'Z" fill="var(--warm-soft)" stroke="var(--warm)" stroke-width="1.2"/>'
   +L('M10 '+y0+'H312','var(--ink-2)',1.2)+'<path d="M'+(cx-2.5*k)+' '+y0+'V'+(y0-2*h)+'H'+(cx+2.5*k)+'V'+y0+'" fill="none" stroke="var(--bad)" stroke-dasharray="3 2"/>'
   +T(cx-r+4,y0-3*h-4,'3,000 ft aal','d2')+T(cx+r+5*k+4,y0-h+4,'1,000','d2')+T(cx+r+5*k+4,y0-3*h+4,'3,000','d2');
   return s})(),
  'MATZ: surface to 3,000 ft aal, radius 5 nm. Stubs along the final approach: 4 nm wide, 5 nm beyond the circle, from 1,000 to 3,000 ft aal. The ATZ inside always applies. Distances to scale; heights to their own scale.',320,254)
]);
sec(D6,'UK airspace classes',[
 F('UK airspace classes at a glance',
  tbl(8,8,[[36,'Class'],[60,'VFR?'],[208,'UK use']],[
   [['A','var(--bad)'],'no','airways, London and Manchester TMAs, some CTAs'],
   ['B','-','not allocated in the UK'],
   [['C','var(--accent)'],'clearance','everything above FL195, some CTAs below'],
   [['D','var(--accent)'],'clearance','most CTRs and CTAs, Scottish TMA'],
   ['E','yes','parts of Scottish TMA, some CTAs and airways'],
   ['F','-','not allocated in the UK'],
   [['G','var(--good)'],'yes','the Open-FIR: everything else, incl. MATZs']],22),
  'Controlled airspace is A to E; uncontrolled is F and G. VFR in C and D needs flight notification and an ATC clearance.',320,184)
]);
sec(D6,'Prohibited, Restricted and Danger',[
 F('Reading a Danger Area',
  '<circle cx="62" cy="62" r="40" fill="none" stroke="#d8312c" stroke-width="2.4"/>'+T(62,58,'D129/1.75','d1','middle')+T(62,118,'solid red:','d2','middle')+T(62,129,'active in published hours','d2','middle')
  +'<circle cx="190" cy="62" r="40" fill="none" stroke="#d8312c" stroke-width="2.4" stroke-dasharray="7 5"/>'+T(190,58,'D044/3.2','d1','middle')+T(190,118,'pecked red: inactive','d2','middle')+T(190,129,'unless notified by NOTAM','d2','middle')
  +T(286,46,'*D141','d1','middle')+T(286,62,'* = by-laws:','d2','middle')+T(286,74,'no entry','d2','middle')+T(286,86,'when active','d2','middle')
  +dzB(8,146,304,60,'var(--surface-2)','var(--line)')+T(16,162,'D 1 29 / 1.75','d3')+T(130,160,'D: Danger (P Prohibited, R Restricted)','d2')+T(130,172,'1: latitude band 51°N to 52°N','d2')+T(130,184,'29: area number','d2')+T(130,196,'1.75: top 1,750 ft amsl','d2'),
  '"1-2.5" after the slash would mean 1,000 to 2,500 ft amsl. Check the chart legend: other charts may draw areas differently.',320,212)
]);
sec(D6,'Other hazards',[
 F('Low-level hazards (heights agl, to scale)',
  (function(){var y0=196,k=.085,s='';function y(ft){return y0-ft*k}
   s+=L('M40 '+y0+'H312','var(--ink-2)',1.2)+[0,500,1000,1500,2000].map(function(f){return L('M40 '+y(f)+'H312','var(--line)',.6)+T(36,y(f)+3,f?f.toLocaleString('en-GB'):'0','d2','end')}).join('');
   s+='<rect x="46" y="'+y(500)+'" width="44" height="'+(250*k)+'" fill="var(--bad)" opacity=".55"/><rect x="46" y="'+y(2000)+'" width="44" height="'+(1500*k)+'" fill="var(--bad)" opacity=".15"/>'+T(68,y(2000)-4,'military','d2','middle')+T(68,y(250)+12,'low flying','d2','middle');
   s+='<path d="M114 '+y0+'V'+y(2000)+'" stroke="var(--ink)" stroke-width="1.4" stroke-dasharray="2 2"/>'+T(118,y(2000)+10,'winch cable','d2')+T(118,y(2000)+20,'2,000 ft','d2');
   s+='<path d="M180 '+y0+'V'+y(1000)+'" stroke="var(--ink-2)"/><circle cx="180" cy="'+y(1000)+'" r="6" fill="var(--mid)"/>'+T(190,y(1000)+4,'para balloon','d2')+T(190,y(1000)+14,'1,000 ft','d2');
   s+=L('M250 '+y(1500)+'H312','var(--accent)',1.4)+T(310,y(1500)-4,'birds: 1,500 ft','d2','end',null,'var(--accent)');
   s+='<rect x="250" y="'+y(500)+'" width="60" height="'+(500*k)+'" fill="var(--mid)" opacity=".25"/>'+T(280,y(500)+12,'small arms','d2','middle')+T(280,y(500)+22,'500 ft','d2','middle');
   return s})(),
  'Military low flying is busiest at 250 to 500 ft agl (dark band). Higher up: parachuting to FL150 within 1.5 nm of a drop zone, and target towing to 10,000 ft.',320,206)
]);

/* ---------- 07 Air Traffic Services ---------- */
var D7='Air Traffic Services';
sec(D7,'Services in each airspace class',[
 F('What each class gives you',
  tbl(8,8,[[32,'Class'],[52,'Clearance'],[110,'IFR separated from'],[110,'VFR get']],[
   ['A','all','all (IFR only)','(no VFR)'],
   ['B','all','all','separation from all'],
   ['C','all','IFR and VFR','sep. from IFR; TI on VFR'],
   ['D','all','IFR','TI on all; no separation'],
   ['E','IFR only','IFR','TI as far as practical'],
   ['F','none','(advisory)','service on request'],
   ['G','none','-','service on request']],22),
  'TI = traffic information. In Class D, VFR flights are not separated from anyone: look out. Avoidance advice is available on request in C and D.',320,184)
]);
sec(D7,'AFIS, A/G radio',[
 F('Who you are talking to',
  [['Tower / Approach / Ground','ATC','clearances and instructions','var(--accent)'],['… Information','AFIS','information only in the air;','var(--good)'],['… Radio','A/G','basic information; no ATC','var(--mid)']].map(function(r,i){var y=8+i*42;
   return dzB(8,y,304,36,'var(--surface-2)','var(--line)')+'<rect x="8" y="'+y+'" width="6" height="36" fill="'+r[3]+'"/>'+T(22,y+15,r[0],'d1')+T(22,y+28,r[1],'d2')+T(170,y+15,r[2],'d2')+(i===1?T(170,y+28,'instructions on the ground','d2'):'')}).join('')
  +'<path d="M60 216V160H220V216" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.2"/>'+L('M10 216H312','var(--ink-2)',1.2)+'<path d="M132 216H148V212H132Z" fill="var(--ink-2)"/>'
  +T(140,176,'Safetycom 135.480','d1','middle')+T(140,188,'below 2,000 ft aal','d2','middle')+T(140,200,'within 10 nm','d2','middle')+A(140,226,220,226,'var(--ink)',1)+T(232,229,'10 nm','d2'),
  'The callsign suffix tells you the service. Safetycom is for airfields without their own frequency; keep calls short.',320,236)
]);
sec(D7,'UK Flight Information Services',[
 F('The four UK FIS outside controlled airspace',
  tbl(8,8,[[62,''],[66,'Basic'],[54,'Traffic'],[62,'Deconfl.'],[60,'Procedural']],[
   ['radar?','no','yes','yes','no'],
   ['who','ctrl or FISO','controller','controller','controller'],
   ['flights','IFR, VFR','IFR, VFR','IFR','IFR'],
   ['identified','maybe','yes','yes','not needed'],
   ['traffic info','not expected','radar TI','TI + avoid','limited'],
   ['headings','-','sequencing','to deconflict','radials, times'],
   [['avoidance',null],['pilot','var(--bad)'],['pilot','var(--bad)'],['pilot','var(--bad)'],['pilot','var(--bad)']]],22),
  'Whatever the service, in Class G the pilot is ultimately responsible for collision avoidance and terrain clearance. An alerting service comes with all four.',320,184)
]);
sec(D7,'Deconfliction Service',[
 F('Deconfliction minima',
  T(8,16,'unknown traffic','d1')+'<circle cx="80" cy="96" r="60" fill="var(--accent-soft)" stroke="var(--accent)" stroke-dasharray="5 3"/>'+P(80,96,0,'var(--accent)',1.2)+A(80,96,139,96,'var(--ink)',1)+T(110,90,'5 nm','d2','middle')
  +T(80,172,'5 nm laterally','d1','middle')+T(80,184,'OR 3,000 ft vertically','d1','middle')
  +T(170,16,'same controller','d1')+'<circle cx="240" cy="96" r="36" fill="var(--good)" opacity=".15" stroke="var(--good)" stroke-dasharray="5 3"/>'+P(240,96,0,'var(--accent)',1.2)+A(240,96,275,96,'var(--ink)',1)+T(258,90,'3 nm','d2','middle')
  +T(240,172,'3 nm and 1,000 ft','d1','middle')+T(240,184,'(some military: 500 ft)','d2','middle'),
  'Plan view, circles to scale with each other. The minima are aimed at, not guaranteed, and only given at or above the unit\'s terrain safe level.',320,196)
]);
sec(D7,'Flight plans',[
 F('Flight plan timings',
  L('M20 70H300','var(--ink-2)',1.4)+[[40,'planned ETD'],[190,'+60 min'],[100,'+30 min']].map(function(p){return L('M'+p[0]+' 62V78','var(--ink)',1.4)+T(p[0],56,p[1],'d2','middle')}).join('')
  +T(100,96,'re-file if any of','d2','middle')+T(100,106,'the flight is in CAS','d2','middle')+T(190,96,'re-file','d2','middle')+T(190,106,'otherwise','d2','middle')+T(8,20,'departure delayed','d1')
  +L('M20 170H300','var(--ink-2)',1.4)+L('M80 162V178','var(--ink)',1.4)+T(80,156,'ETA','d2','middle')+L('M200 162V178','var(--bad)',1.6)+T(200,156,'ETA + 30 min','d2','middle',null,'var(--bad)')+T(200,194,'overdue action:','d2','middle',null,'var(--bad)')+T(200,205,'search and rescue','d2','middle',null,'var(--bad)')+T(8,130,'not arrived','d1'),
  'Close your flight plan on arrival, and tell your original destination if you land elsewhere. With no ATSU there, leave a responsible person who knows your ETA.',320,214)
]);

/* ---------- 02 Aviation Law and organisations ---------- */
var LW='Aviation Law and organisations';
function col(x,head,items,c){var s=dzB(x,96,96,30,'var(--accent-soft)',c,4,1.4)+T(x+48,108,head[0],'d1','middle')+T(x+48,120,head[1],'d2','middle')+L('M'+(x+48)+' 82V96','var(--ink-2)',1);items.forEach(function(it,i){var y=134+i*28;s+=L('M'+(x+48)+' '+(y-(i?4:8))+'V'+y,'var(--ink-2)',1)+dzB(x,y,96,24,'var(--surface)','var(--ink-2)',3)+T(x+6,y+10,it[0],'d1')+T(x+6,y+20,it[1],'d2',null,7.5)});return s}
sec(LW,'Aeronautical Information Publication',[
 F('How the UK Aeronautical Information Service fits together',
  dzB(70,8,180,22,'var(--accent)','var(--accent)')+T(160,23,'Aeronautical Information Service','d1','middle',null,'#ffffff')
  +L('M160 30V40','var(--ink-2)',1)+dzB(96,40,128,34,'var(--surface)','var(--accent)',4,1.6)+T(160,54,'AIP','d3','middle')+T(160,68,'with amendments, supplements','d2','middle',7)
  +L('M96 57H84M224 57H236','var(--ink-2)',1)+dzB(14,44,70,26,'var(--surface)','var(--mid)')+T(49,61,'NOTAM','d1','middle')+dzB(236,44,70,26,'var(--surface)','var(--mid)')+T(271,61,'AIC','d1','middle')
  +L('M58 82H262','var(--ink-2)',1)+L('M160 74V82','var(--ink-2)',1)
  +col(10,['Part 1: GEN','general'],[['GEN 1','national rules'],['GEN 2','tables and codes'],['GEN 3','services'],['GEN 4','charges']],'var(--accent)')
  +col(112,['Part 2: ENR','en route'],[['ENR 1','rules (1.12 interception)'],['ENR 2','ATS airspace'],['ENR 3','ATS routes'],['ENR 4','radio nav aids'],['ENR 5','nav warnings'],['ENR 6','en-route charts']],'var(--good)')
  +col(214,['Part 3: AD','aerodromes'],[['AD 1','introduction'],['AD 2','aerodromes'],['AD 3','heliports']],'var(--mid)')
  +T(262,236,'Each part starts','d2','middle')+T(262,246,'with a section 0:','d2','middle')+T(262,256,'preface and contents','d2','middle'),
  'The AIP holds lasting information and changes every 28 days (AIRAC). NOTAMs carry short-notice changes, AICs carry advice and administrative notices.',320,302)
]);
})();
