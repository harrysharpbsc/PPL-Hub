/* ===== Skyway Code topics, diagrams in style B (library: labs80b.js; how-to: .claude/skills/ppl-diagram)
   Each entry: [title, width, height, drawing, caption, note-section prefix]. Pictures of real lights, signs and
   displays keep their real colours on a fixed dark or green ground. Builds after labs84ss.js, whose UK VMC minima
   figure is reused here. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
function box(x,y,w,h,fill,stroke,sw){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+(fill||'none')+'" stroke="'+(stroke||'var(--line-2)')+'" stroke-width="'+(sw||1.2)+'"/>'}
function steps(list,x,y0,dy,c){return list.map(function(r,i){var y=y0+i*dy;return'<circle cx="'+x+'" cy="'+(y+10)+'" r="12" class="f'+(c||'a')+'"/><text x="'+x+'" y="'+(y+15)+'" text-anchor="middle" style="font:700 12px var(--f-body);fill:var(--surface)">'+(i+1)+'</text>'+T(x+20,y+8,r[0],'t1')+(r[1]?T(x+20,y+22,r[1],'t2'):'')}).join('')}
function cloudB(x,y,w,h){return'<path d="M'+x+' '+(y+h)+'q-'+n(h*.6)+' 0 -'+n(h*.4)+' -'+n(h*.5)+'q0 -'+n(h*.6)+' '+n(h*.6)+' -'+n(h*.5)+'q'+n(w*.15)+' -'+n(h*.7)+' '+n(w*.4)+' -'+n(h*.3)+'q'+n(w*.3)+' -'+n(h*.4)+' '+n(w*.45)+' '+n(h*.25)+'q'+n(h*.6)+' '+n(h*.1)+' '+n(h*.4)+' '+n(h*.55)+'q0 '+n(h*.5)+' -'+n(h*.5)+' '+n(h*.5)+'Z" fill="var(--surface-2)" stroke="var(--ink-3)" stroke-width=".9"/>'}
function gnd(y,h){return'<path d="M0 '+y+'H320V'+(y+(h||24))+'H0Z" class="gnd"/>'}
function rwy(x,y,w,h){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" fill="var(--ink-3)"/>'}
/* light text on a fixed dark picture */
function wt(x,y,s,a,b){return'<text x="'+x+'" y="'+y+'"'+(a?' text-anchor="'+a+'"':'')+' style="font:'+(b?'600 12px':'500 11px')+' var(--f-body);fill:#E8EDF6">'+s+'</text>'}
function add(t,list){DSEC[t]=list.map(function(f){return[f[5],f[0]&&f[0].h!==undefined?f[0].h:dbFig(f[0],f[1],f[2],f[3],f[4])]})}
var VMC=(DSEC['VFR flight planning and VMC minima (SS05)']||[])[0];

add('VFR, IFR and Special VFR (Skyway Code)',[
 [{h:VMC?VMC[1]:''},0,0,'','','VMC minima'],
 ['Special VFR in a control zone',320,212,
  '<circle cx="90" cy="104" r="76" class="fa" opacity=".08"/><circle cx="90" cy="104" r="76" fill="none" class="sa" stroke-width="1.8" stroke-dasharray="7 3"/>'+T(90,44,'CTR','t1 ta','middle')
  +cloudB(46,64,90,26)+side(92,128,.6,'a')
  +box(180,8,132,94,'var(--surface)','var(--accent)')+T(190,26,'To accept SVFR','t1')+T(190,42,'clear of cloud','t2')+T(190,56,'surface in sight','t2')+T(190,70,'visibility 1,500 m+','t2')+T(190,84,'140 kt or less','t2')
  +box(180,110,132,94,'var(--surface)','var(--mid)')+T(190,128,'Take-off or landing','t1 tm')+T(190,144,'not if ground','t2')+T(190,158,'visibility is below','t2')+T(190,172,'1,500 m or the','t2')+T(190,186,'ceiling below 600 ft','t2'),
  'Special VFR lets you fly in a control zone below VMC without IFR, with ATC separating you from IFR and other SVFR traffic.','Special VFR'],
 ['When VFR is not enough in a CTR',320,206,
  gnd(176,30)+rwy(120,170,80,6)+'<rect x="0" y="80" width="320" height="24" fill="var(--ink-3)" opacity=".45"/>'+L('M0 104H320','sr',1.2,'4 3')+T(8,98,'ceiling below 1,500 ft','t1 tr')
  +'<rect x="0" y="104" width="320" height="66" fill="var(--ink-3)" opacity=".14"/>'+T(160,138,'or ground visibility under 5 km','t1 tr','middle')
  +T(160,28,'Ask for Special VFR instead','t1 tg','middle')+T(160,44,'VFR is never allowed in Class A','t2','middle')+T(160,196,'no VFR take-off, landing, ATZ or circuit','t2','middle'),
  'In a control zone, VFR stops below a 1,500 ft ceiling or 5 km ground visibility: no VFR take-off, landing, ATZ entry or circuit. Ask ATC for Special VFR.','Other VFR requirements']
]);

add('Weather charts and forecasts (Skyway Code)',[
 ['Reading a METAR group by group',320,168,
  '<rect x="8" y="10" width="304" height="34" rx="6" fill="#15181d" stroke="#666"/><text x="14" y="32" style="font:500 11px var(--f-mono);fill:#eee">EGXX 261150Z 34008KT 9999 SCT025 12/07 Q1019</text>'
  +[[53,'place, time','11:50 UTC',0],[122,'wind','340° 8 kt',1],[165,'visibility','10 km or more',0],[205,'cloud','3–4 oktas, 2,500 ft',1],[248,'temp / dew','12 / 7°C',0],[287,'QNH','1019 hPa',1]].map(function(r){var y=r[3]?122:76;
   return L('M'+r[0]+' 46V'+(y-14),'sa',1)+T(r[0],y,r[1],'t1','middle')+T(r[0],y+14,r[2],'t2','middle')}).join('')
  +T(160,162,'cloud heights are above the aerodrome','t2 ta','middle'),
  'A made-up example. Cloud heights are above the aerodrome, so compare them with the terrain on your route; cloud type is only given for CB and TCU. TAFs are forecasts, METARs are reports, usually every half hour.','Reading TAFs'],
 ['Cloud amounts and the ceiling',320,186,
  [['FEW','1–2 oktas',2],['SCT','3–4 oktas',4],['BKN','5–7 oktas',6],['OVC','8 oktas',8]].map(function(r,i){var x=40+i*80;return dzPie(x,40,24,r[2],'var(--ink-3)')+T(x,86,r[0],'t1','middle')+T(x,102,r[1],'t2','middle')}).join('')
  +'<rect x="4" y="118" width="154" height="26" rx="4" class="fa" opacity=".14"/>'+T(81,136,'cloud base: any cloud','t1','middle')
  +'<rect x="162" y="118" width="154" height="26" rx="4" class="fr" opacity=".14"/>'+T(239,136,'ceiling: BKN or OVC','t1 tr','middle')
  +T(160,174,'ceiling: lowest layer over half the sky','t2','middle'),
  'An okta is an eighth of the sky. FEW and SCT count for the cloud base but not the ceiling, which is the lowest layer covering more than half the sky.','Making the weather decision'],
 ['What the F215 shows',320,206,
  '<path d="M90 20Q130 30 150 70Q120 110 160 150Q190 180 150 198H30Q10 120 40 60Q60 20 90 20Z" class="gnd" stroke="var(--ink-3)"/>'
  +'<path d="M120 10L140 80L170 130" class="sr" stroke-width="2"/><path d="M190 40L170 130L150 198" class="sa" stroke-width="2"/>'
  +'<path d="M60 40Q100 80 70 130" class="s2" stroke-dasharray="3 3"/>'+T(56,92,'A','t1','middle')+T(118,112,'B','t1','middle')+T(178,82,'C','t1','middle')
  +box(196,8,116,190,'var(--surface)')+T(206,26,'Each zone lists','t1')+['cloud, type','base and top (amsl)','visibility, weather','icing, turbulence','freezing level'].map(function(t,i){return T(206,44+i*14,t,'t2')}).join('')
  +T(206,128,'valid 9 hours','t2 ta')+T(206,142,'below 10,000 ft','t2 ta')+T(206,160,'XXX: tops above','t2')+T(206,174,'the chart limit','t2'),
  'The low-level forecast for the British Isles, divided into zones by fronts and boundaries. Use it with METARs and TAFs to build the whole picture.','F215']
]);

add('Route planning and altitude selection (Skyway Code)',[
 ['Maximum Elevation Figure',320,196,
  '<rect x="8" y="16" width="170" height="170" class="gnd" stroke="var(--ink-3)"/><path d="M28 150Q68 90 98 120T168 110V186H28Z" class="bld" opacity=".7"/>'
  +'<path d="M112 112l4 10h-8z" class="fk"/>'+T(118,108,'mast 1,840','t2')+'<path d="M62 120l3 6h-6z" class="fk"/>'+T(68,140,'1,480','t2')
  +'<text x="50" y="80" style="font:700 32px var(--f-display);fill:var(--accent)">1</text><text x="70" y="68" style="font:700 19px var(--f-display);fill:var(--accent)">9</text>'
  +box(186,16,126,170,'var(--surface)','var(--accent)')+T(196,34,'MEF 1,900 ft','t1')+T(196,52,'the higher of','t2')+T(196,66,'highest obstacle,','t2')+T(196,80,'or terrain + 300 ft,','t2')+T(196,94,'rounded up','t2')
  +T(196,120,'No safety margin','t1 tr')+T(196,138,'add 500 to 1,000 ft','t2')+T(196,152,'for your safety','t2')+T(196,166,'altitude','t2'),
  'A made-up quadrangle. The big figure is in thousands and hundreds of feet. Study 5 NM either side of your track.','Maximum Elevation Figure'],
 ['Planning the descent',320,196,
  gnd(176,20)+rwy(250,170,50,6)+L('M24 34L250 170','sa',2.4)+side(36,30,.6,'a')
  +[[24,34,'4,000 ft'],[99,79,'3,000 ft'],[175,125,'2,000 ft']].map(function(r,i){return'<circle cx="'+r[0]+'" cy="'+r[1]+'" r="3.5" class="fa"/>'+(i?T(r[0]-8,r[1]+18,r[2],'t2','end'):T(8,62,r[2],'t2'))}).join('')
  +T(208,40,'3 NM per 1,000 ft','t1','middle')+T(208,56,'rate: groundspeed × 5','t2','middle')+T(208,70,'100 kt: about 500 ft/min','t2','middle'),
  'From 4,000 ft to land, start about 12 NM out. A 3° path is about 300 ft per NM.','Choosing a cruising altitude'],
 ['Take 2 around airspace',320,190,
  '<rect x="150" y="20" width="162" height="80" class="fa" opacity=".1"/><rect x="150" y="20" width="162" height="80" fill="none" class="sa" stroke-width="1.8" stroke-dasharray="7 3"/>'+T(231,44,'CTA base 2,500 ft','t1 ta','middle')
  +L('M150 112H312','sg',1.4,'4 3')+AR('M290 100V110',290,104,290,112,'g',1)+T(231,130,'200 ft below the base','t1 tg','middle')
  +side(222,160,.6,'a')+L('M136 20V100','sg',1.4,'4 3')+AR('M100 64H134',126,64,136,64,'g',1)+T(94,68,'2 NM','t1 tg','end')
  +T(8,154,'use the QNH for','t2')+T(8,168,'the airspace above','t2'),
  'Stay 2 NM from the edges and 200 ft below the bases of controlled airspace, danger areas and ATZs, more in turbulence.','Avoiding infringements']
]);

add('Altimeter settings (Skyway Code)',[
 ['QFE, QNH and 1013',320,206,
  '<path d="M0 188H320V206H0Z" fill="var(--ch-wt)"/>'+T(312,202,'mean sea level','t2','end')+'<path d="M0 150Q60 140 120 150V188H0Z" class="gnd"/>'+rwy(40,144,60,6)+T(70,136,'aerodrome 300 ft','t2','middle')
  +side(206,62,.6,'a')+AR('M202 70V148',202,140,202,150,'g',1.4)+AR('M216 70V186',216,178,216,188,'a',1.4)+AR('M230 64V30',230,38,230,28,'m',1.4)
  +L('M0 150H320','s2',.7,'2 3')+L('M0 26H320','sm',.8,'2 3')+T(312,20,'1013.25 hPa level','t2 tm','end')
  +T(196,108,'QFE: height','t1 tg','end')+T(196,122,'above aerodrome','t2','end')+T(222,108,'QNH: altitude','t1 ta')+T(222,122,'above sea level','t2')+T(312,48,'1013: flight level','t1 tm','end'),
  'On the ground QFE reads zero and QNH reads the aerodrome elevation. Above the transition altitude, set 1013 for flight levels.','Four pressure settings'],
 ['Transition altitude and level',320,196,
  L('M0 150H320','sk',1)+T(316,166,'transition altitude (often 3,000 ft)','t2','end')+L('M0 110H320','sk',1)+T(316,104,'transition level','t2','end')
  +'<rect x="0" y="110" width="320" height="40" class="fm" opacity=".15"/>'+T(160,134,'transition layer','t1','middle')
  +T(80,58,'Climbing: set 1013','t1','middle')+AR('M80 146V72',80,80,80,68,'a',1.4)+T(240,58,'Descending: set QNH','t1','middle')+AR('M240 70V144',240,136,240,148,'a',1.4)
  +T(80,186,'altitudes on QNH','t2','middle')+T(240,30,'flight levels on 1013','t2','middle'),
  'In the UK outside controlled airspace the transition altitude is usually 3,000 ft. Climbing, set 1013 at the transition altitude; descending, set QNH at the transition level. Changing to flight levels is optional for VFR.','Transition altitude'],
 ['Worked example: 27 ft per hPa',320,196,
  box(20,14,280,44,'var(--surface)')+T(160,32,'QNH 1000, at 3,000 ft. Now set 1013.','t1','middle')+T(160,48,'1013 − 1000 = 13 hPa','t2','middle')
  +AR('M160 60V84',160,76,160,86,'k',1.2)+box(60,88,200,44,'var(--surface)','var(--accent)')+T(160,106,'13 × 27 ft ≈ 351 ft','t1','middle')+T(160,122,'the reading goes up','t2','middle')
  +AR('M160 134V152',160,144,160,154,'k',1.2)+'<text x="160" y="180" text-anchor="middle" style="font:700 20px var(--f-mono);fill:var(--accent)">3,351 ft</text>',
  'Pressure lower than standard means the altimeter on 1013 reads higher than your true altitude. "High to low, look out below."','Transition altitude']
]);

add('Fuel, flight plans and aerodrome planning (Skyway Code)',[
 ['Fuel by volume and by mass',320,206,
  [['AVGAS','0.72 kg per litre','a'],['Jet A-1','about 0.8 kg per litre','m']].map(function(r,i){var x=20+i*150;return'<path d="M'+(x+20)+' 40h60l10 14v90a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-90z" fill="var(--surface)" stroke="var(--ink-3)"/><rect x="'+(x+16)+'" y="90" width="68" height="58" class="f'+r[2]+'" opacity=".45"/>'+T(x+50,74,r[0],'t1','middle')+T(x+50,172,r[1],'t2','middle')}).join('')
  +T(160,24,'1 US gal = 3.785 L, 1 Imp gal = 4.546 L','t1','middle')+T(160,196,'W&B: assume fuel high; planning: low','t2 ta','middle'),
  'Mixed units have caused accidents. Match the density to the volume unit and check every figure. For weight and balance assume the fuel is at the high end; for planning, the low end.','Fuel management'],
 ['When you need a flight plan',320,192,
  [['crossing an international border',1],['flying under an ATC service',1],['leaving the vicinity at night',1],['over water, 10 NM+ from the coast',0],['to the Scottish Highlands, Islands',0],['over sparsely populated areas',0]].map(function(r,i){var y=8+i*30;
   return box(8,y,304,24,'var(--surface)')+'<rect x="8" y="'+y+'" width="5" height="24" class="f'+(r[1]?'a':'m')+'"/>'+T(20,y+16,r[0],'t2')+T(304,y+16,r[1]?'required':'recommended',r[1]?'t2 ta':'t2 tm','end')}).join(''),
  'Required when crossing a border, under an ATC service (into controlled airspace or from a controlled aerodrome) and leaving the aerodrome vicinity at night. Booking out can count as the abbreviated plan at night if the unit can receive it; abbreviated plans are not passed on to other units.','Flight plans'],
 ['Questions for an unfamiliar aerodrome',320,184,
  ['PPR?','Usable length','Surface, grass state','Obstacles','Local procedures','Wind effects','Noise abatement','And for the alternate'].map(function(t,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*44;
   return box(x,y,148,36,'var(--surface)',i===7?'var(--bad)':'var(--line-2)')+'<circle cx="'+(x+16)+'" cy="'+(y+18)+'" r="7" fill="none" class="'+(i===7?'sr':'sa')+'" stroke-width="1.4"/><path d="M'+(x+12)+' '+(y+18)+'l3 3 5-6" fill="none" class="'+(i===7?'sr':'sa')+'" stroke-width="1.6"/>'+T(x+30,y+22,t,i===7?'t2 tr':'t2')}).join(''),
  'The AIP only covers licensed aerodromes. Phone ahead, and treat information about unlicensed strips as unverified.','Unfamiliar aerodromes']
]);

add('Rules of the Air essentials (Skyway Code)',[
 ['Right of way on the ground',320,196,
  box(4,8,100,180)+T(54,28,'Head-on','t1','middle')+plane(40,148,0,'a',1.1)+plane(68,60,180,'k',1.1)+AR('M40 132Q40 112 54 100',50,104,56,98,'a',1.2)+AR('M68 76Q68 96 54 108',58,104,52,110,'k',1.2)+T(54,164,'both stop or','t2','middle')+T(54,178,'turn right','t2','middle')
  +box(110,8,100,180)+T(160,28,'Converging','t1','middle')+plane(140,148,0,'a',1.1)+plane(190,90,270,'k',1.1)+T(160,164,'other on right:','t2 ta','middle')+T(160,178,'you give way','t2 ta','middle')
  +box(216,8,100,180)+T(266,28,'Overtaking','t1','middle')+plane(266,64,0,'k',1.1)+plane(266,148,0,'a',1.1)+AR('M260 132L242 92',246,100,242,90,'a',1.2)+AR('M272 132L290 92',286,100,290,90,'a',1.2)+T(266,164,'keep well clear,','t2 ta','middle')+T(266,178,'either side','t2 ta','middle'),
  'On the ground the rules match the air, except an overtaker may pass on either side, keeping well clear. Give way to aircraft taking off or landing, and to emergency vehicles.','Right of way on the ground'],
 ['The pilot in command',320,196,
  '<circle cx="72" cy="98" r="56" fill="var(--accent-soft)" stroke="var(--accent)"/>'+T(72,94,'Final','t1','middle')+T(72,110,'authority','t1','middle')
  +[['responsible, even','off the controls'],['departs from rules','only for safety'],['studies weather, fuel','and alternatives'],['never flies under a','psychoactive substance']].map(function(t,i){var y=26+i*46;
   return AR('M128 98L162 '+y,154,y+2,164,y,'k',1)+box(166,y-18,146,36,'var(--surface)')+T(176,y-3,t[0],'t2')+T(176,y+11,t[1],'t2')}).join(''),
  'The pilot in command carries the final responsibility for the flight, whoever is handling the controls.','Pilot in command']
]);

add('Airspace, ATZ, MATZ and transponders (Skyway Code)',[
 ['An ATZ is a cylinder',320,212,
  gnd(170,16)+'<ellipse cx="150" cy="168" rx="104" ry="16" class="gnd" stroke="var(--bad)" stroke-width="1.4"/><path d="M46 168V66M254 168V66" class="sr" stroke-width="1.4"/><ellipse cx="150" cy="66" rx="104" ry="16" class="fr" opacity=".07"/><ellipse cx="150" cy="66" rx="104" ry="16" fill="none" class="sr" stroke-width="1.4"/>'
  +rwy(120,164,60,6)+AR('M260 166V68',260,76,260,66,'k',1)+T(264,108,'2,000 ft','t1')+T(264,122,'above the','t2')+T(264,136,'aerodrome','t2')
  +AR('M150 190H252',244,190,254,190,'k',1)+T(26,206,'radius 2 NM (2.5 NM, runway over 1,850 m)','t2')
  +T(160,22,'ATC: permission to enter','t2','middle')+T(160,36,'AFIS or A/G: information first','t2','middle'),
  'The radius depends on the longest runway. Many busy aerodromes have no ATZ, so watch for traffic anyway.','ATZ and aerodromes'],
 ['A typical MATZ',320,212,
  '<circle cx="110" cy="110" r="66" class="fa" opacity=".08"/><circle cx="110" cy="110" r="66" fill="none" class="sa" stroke-width="1.6" stroke-dasharray="4 2"/><rect x="176" y="90" width="56" height="40" class="fa" opacity=".08"/><rect x="176" y="90" width="56" height="40" fill="none" class="sa" stroke-width="1.6" stroke-dasharray="4 2"/>'
  +'<circle cx="110" cy="110" r="26" class="fr" opacity=".1"/><circle cx="110" cy="110" r="26" fill="none" class="sr" stroke-width="1.4"/>'+rwy(94,108,32,4)+T(110,78,'ATZ','t1 tr','middle')
  +T(204,84,'stub','t2','middle')+T(110,24,'MATZ: 5 NM radius,','t1 ta','middle')+T(110,38,'3,000 ft aal','t2','middle')
  +box(240,8,72,196,'var(--surface)')+T(248,26,'Call','t1')+T(248,40,'10 min','t2')+T(248,54,'ahead','t2')+T(248,80,'Not CAS','t1')+T(248,94,'for civil','t2')+T(248,108,'aircraft','t2')+T(248,134,'Never','t1 tr')+T(248,148,'enter the','t2')+T(248,162,'ATZ without','t2')+T(248,176,'clearance','t2'),
  'Ask for a MATZ penetration service about 10 minutes ahead. Two calls with no reply: you may enter with caution, but never enter the ATZ inside without clearance.','MATZ'],
 ['Control zone and control area',320,196,
  gnd(176,20)+'<rect x="110" y="96" width="100" height="80" class="fa" opacity=".12"/><rect x="110" y="96" width="100" height="80" fill="none" class="sa" stroke-width="1.6"/><rect x="40" y="40" width="240" height="56" class="fa" opacity=".07"/><rect x="40" y="40" width="240" height="56" fill="none" class="sa" stroke-width="1.6" stroke-dasharray="6 3"/>'
  +rwy(150,170,20,6)+T(160,138,'CTR','t1 ta','middle')+T(160,154,'from the surface','t2','middle')+T(160,66,'CTA','t1 ta','middle')+T(160,82,'base about 1,500 ft','t2','middle')
  +side(68,156,.6,'a')+T(66,118,'under the CTA','t2','middle')+T(66,132,'without clearance','t2','middle')+T(312,28,'Class D: clearance needed','t1 ta','end'),
  'A CTR starts at the surface around the airport. CTAs sit above and around it with higher bases you can fly beneath without a clearance.','Airspace structure']
]);

function circ(){return rwy(100,96,120,8)+L('M220 100H70V160H250V100H220','sa',1.8,'6 3')}
add('Aerodrome operations and circuits (Skyway Code)',[
 ['Live side and dead side',320,200,
  '<rect x="0" y="0" width="320" height="100" class="fm" opacity=".08"/><rect x="0" y="100" width="320" height="100" class="fa" opacity=".06"/>'+circ()
  +T(160,40,'DEAD SIDE','t1','middle')+T(160,56,'no circuit traffic: descend here','t2','middle')+T(160,190,'LIVE SIDE (circuit traffic)','t1 ta','middle')
  +T(160,90,'runway 27','t2','middle')+T(160,176,'downwind','t2','middle')+T(64,134,'crosswind','t2','end')+T(256,134,'base','t2')+T(240,90,'final','t2','middle')+T(64,90,'upwind','t2','middle')+plane(118,160,90,'a',1.1),
  'Left-hand circuit shown. Calls on downwind and final, plus base or late downwind if it helps others picture you. Descend on the dead side after an overhead join.','The circuit'],
 ['The overhead join',320,296,
  '<g transform="translate(-18 -30) scale(.92)">'+circ()+'<path d="M316 20L160 100" class="sr" stroke-width="2.4"/><path d="M160 100Q130 60 100 50H60Q40 50 50 80L70 100" class="sr" stroke-width="2.4" stroke-dasharray="5 3"/></g>'
  +T(160,138,'left-hand circuit, runway 27','t2','middle')
  +steps([['Overhead, 2,000 ft QFE','1,000 ft above the circuit'],['Descend on the dead side',''],['Cross the upwind end','at circuit height'],['Join crosswind','then fly the circuit']],22,150,36,'r'),
  'A joining aircraft gives way to traffic already in the circuit. Report overhead, then descending dead side.','The circuit'],
 ['At the holding point',320,206,
  T(8,18,'solid lines on your side,','t2')+T(8,32,'dashed on the runway side','t2')
  +'<rect x="0" y="40" width="320" height="40" fill="var(--ink-3)"/>'+L('M0 60H320','sk',1.5,'10 8').replace('class="sk"','stroke="#fff"')+'<rect x="120" y="80" width="60" height="126" fill="var(--ink-3)" opacity=".8"/>'
  +L('M120 98H180M120 104H180','sk',2).replace('class="sk"','stroke="#f2c94c"')+L('M120 88H180M120 92H180','sk',2,'5 4').replace('class="sk"','stroke="#f2c94c"')+'<rect x="186" y="94" width="34" height="18" fill="#d22"/><text x="203" y="108" text-anchor="middle" style="font:700 12px var(--f-body);fill:#fff">A1</text>'
  +plane(150,150,315,'a',1.4)+T(114,172,'stop at an angle','t2','end')+T(114,186,'to see the approach','t2','end')+T(194,140,'checks complete,','t2')+T(194,154,'then "ready for','t2')+T(194,168,'departure"','t2'),
  'At an ATC aerodrome never cross onto the runway without a clearance. At A/G or AFIS aerodromes, check yourself that the approach is clear.','Departure procedures']
]);

add('Emergencies (Skyway Code)',[
 ['Choosing a field: the six S',320,196,
  [['Wind','into wind'],['Size','bigger is better'],['Surroundings','wires, trees'],['Shape','not too narrow'],['Surface','grass over crops'],['Slope','avoid it']].map(function(r,i){var x=8+(i%3)*104,y=8+Math.floor(i/3)*92,cx=x+49,cy=y+30,ic;
   ic=i===0?AR('M'+(x+20)+' '+cy+'H'+(x+78),x+70,cy,x+80,cy,'a',2):i===1?'<rect x="'+(cx-26)+'" y="'+(cy-18)+'" width="52" height="36" class="gnd" stroke="var(--good)"/>':i===2?L('M'+(x+14)+' '+(cy-10)+'Q'+cx+' '+(cy+6)+' '+(x+84)+' '+(cy-10),'sk',1)+'<path d="M'+(x+14)+' '+(cy-16)+'v36M'+(x+84)+' '+(cy-16)+'v36" class="sk" stroke-width="2"/>'
    :i===3?'<rect x="'+(cx-20)+'" y="'+(cy-18)+'" width="40" height="36" class="gnd" stroke="var(--good)"/>':i===4?'<rect x="'+(cx-30)+'" y="'+(cy-16)+'" width="30" height="32" class="gnd" stroke="var(--good)"/><rect x="'+cx+'" y="'+(cy-16)+'" width="30" height="32" class="bld"/>':L('M'+(x+18)+' '+(cy+14)+'L'+(x+80)+' '+(cy-14),'sg',3);
   return box(x,y,98,84,'var(--surface)')+ic+T(cx,y+64,r[0],'t1','middle')+T(cx,y+78,r[1],'t2','middle')}).join(''),
  'Wind, size, surroundings, shape, surface and slope. Shortly after take-off, land ahead rather than turning back.','Engine failure'],
 ['The constant aspect approach',320,196,
  '<rect x="150" y="112" width="70" height="44" class="gnd" stroke="var(--good)" stroke-width="1.6"/>'+T(185,138,'field','t1','middle')
  +'<path d="M60 40Q30 120 90 170Q160 196 200 160" class="sr" stroke-width="2" stroke-dasharray="6 3"/>'+plane(60,40,190,'a',1.3)
  +L('M60 40L160 120','s2',1,'3 3')+T(116,70,'about 45°','t1')+T(250,24,'Keep the angle','t1','middle')+T(250,38,'to the field','t2','middle')+T(250,52,'constant','t2','middle')
  +T(250,78,'too high: widen,','t2','middle')+T(250,92,'sideslip or S-turn','t2','middle')+T(250,106,'too low: tighten','t2','middle'),
  'Watch the field\'s angle below you and adjust the turn to keep it steady. Aim further in if you will use full flap.','Engine failure'],
 ['Before you change anything',320,190,
  steps([['Fly the aircraft','keep a safe flying speed'],['Assess before acting','do not jump to conclusions'],['Declare early','easier to cancel than start late'],['Squawk 7700','121.5 MHz if not with a unit']],20,10,44,'r')
  +box(228,14,84,134,'var(--surface)')+T(236,32,'Lost?','t1')+T(236,46,'squawk 0030','t2')+T(236,60,'D&amp;D 121.5','t2')+T(236,86,'Radio dead?','t1')+T(236,100,'squawk 7600','t2')+T(236,114,'stay VMC,','t2')+T(236,128,'light signals','t2'),
  'Many accidents start when a survivable problem distracts the pilot from flying.','Key principles']
]);

add('Decision making and threat and error management (Skyway Code)',[
 ['PAVE before you go',320,196,
  [['P','Pilot','recency, fitness,','I AM SAFE','a'],['A','Aircraft','airworthiness,','limits','g'],['V','EnVironment','weather, aerodrome,','terrain','m'],['E','External pressures','time, delays,','passengers','r']].map(function(r,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*92,c={a:'accent',g:'good',m:'mid',r:'bad'}[r[4]];
   return box(x,y,148,84,'var(--surface)','var(--'+c+')',1.6)+'<text x="'+(x+16)+'" y="'+(y+34)+'" text-anchor="middle" style="font:700 22px var(--f-display);fill:var(--'+c+')">'+r[0]+'</text>'+T(x+32,y+22,r[1],'t1')+T(x+32,y+44,r[2],'t2')+T(x+32,y+58,r[3],'t2')}).join(''),
  'The decision to start the flight is often the most important one. Think about the combined effect of the risks.','Pre-flight decisions'],
 ['Threat and error management',320,196,
  box(8,24,92,124,'var(--surface)','var(--mid)')+T(54,44,'Threats','t1 tm','middle')+['weather','traffic','short runway','fatigue'].map(function(t,i){return T(54,66+i*16,t,'t2','middle')}).join('')
  +AR('M102 86H116',108,86,118,86,'k',1.4)+box(120,24,88,124,'var(--surface)','var(--bad)')+T(164,44,'Errors','t1 tr','middle')+['handling','procedural','communication'].map(function(t,i){return T(164,66+i*16,t,'t2','middle')}).join('')
  +AR('M210 86H224',216,86,226,86,'k',1.4)+box(228,24,84,124,'var(--surface)','var(--ink)')+T(270,44,'Undesired','t1','middle')+T(270,58,'state','t1','middle')+['attitude','configuration','location'].map(function(t,i){return T(270,80+i*16,t,'t2','middle')}).join('')
  +T(160,172,'at each stage: plan, anticipate, prioritise','t2','middle')+T(160,186,'and remove distractions','t2','middle'),
  'Threat and error management is defensive flying: spot the threats, trap the errors, and recover before an undesired aircraft state becomes an accident.','Threat and error management']
]);

add('Aerodrome signals, markings and lighting (Skyway Code)',[
 ['The signals square',320,206,
  '<rect x="0" y="0" width="320" height="206" rx="8" fill="#2f6b3a"/>'
  +[[function(x,y){return'<path d="M'+(x-14)+' '+(y-12)+'H'+(x+14)+'M'+x+' '+(y-12)+'V'+(y+14)+'" stroke="#fff" stroke-width="5"/>'},'T: land','towards arm'],
    [function(x,y){return'<path d="M'+(x-16)+' '+y+'H'+(x+12)+'M'+(x+4)+' '+(y-8)+'L'+(x+12)+' '+y+'L'+(x+4)+' '+(y+8)+'" stroke="#f4d03f" stroke-width="5" fill="none"/>'},'right-hand','circuit'],
    [function(x,y){return'<rect x="'+(x-14)+'" y="'+(y-12)+'" width="28" height="24" fill="#d22"/><path d="M'+(x-14)+' '+(y+12)+'L'+(x+14)+' '+(y-12)+'" stroke="#f4d03f" stroke-width="4"/>'},'special','precautions'],
    [function(x,y){return'<rect x="'+(x-14)+'" y="'+(y-12)+'" width="28" height="24" fill="#d22"/><path d="M'+(x-14)+' '+(y+12)+'L'+(x+14)+' '+(y-12)+'M'+(x-14)+' '+(y-12)+'L'+(x+14)+' '+(y+12)+'" stroke="#f4d03f" stroke-width="4"/>'},'landing','prohibited'],
    [function(x,y){return'<circle cx="'+(x-12)+'" cy="'+y+'" r="7" fill="#fff"/><circle cx="'+(x+12)+'" cy="'+y+'" r="7" fill="#fff"/><path d="M'+(x-12)+' '+y+'H'+(x+12)+'" stroke="#fff" stroke-width="5"/>'},'hard surfaces','only'],
    [function(x,y){return'<circle cx="'+(x-12)+'" cy="'+y+'" r="7" fill="#fff"/><circle cx="'+(x+12)+'" cy="'+y+'" r="7" fill="#fff"/><path d="M'+(x-12)+' '+y+'H'+(x+12)+'" stroke="#fff" stroke-width="5"/><path d="M'+(x-12)+' '+(y-7)+'V'+(y+7)+'M'+(x+12)+' '+(y-7)+'V'+(y+7)+'" stroke="#111" stroke-width="2.5"/>'},'runways for','take-off, landing'],
    [function(x,y){return'<path d="M'+(x-16)+' '+(y-6)+'H'+(x+16)+'M'+(x-16)+' '+(y+6)+'H'+(x+16)+'M'+(x-6)+' '+(y-14)+'V'+(y+14)+'M'+(x+6)+' '+(y-14)+'V'+(y+14)+'" stroke="#fff" stroke-width="4"/>'},'gliding','in progress'],
    [function(x,y){return'<rect x="'+(x-13)+'" y="'+(y-13)+'" width="26" height="26" fill="#f4d03f"/><text x="'+x+'" y="'+(y+7)+'" text-anchor="middle" style="font:700 18px var(--f-body);fill:#111">C</text>'},'report','here']].map(function(r,i){var x=40+(i%4)*80,y=40+Math.floor(i/4)*100;
   return r[0](x,y)+wt(x,y+36,r[1],'middle')+wt(x,y+50,r[2],'middle')}).join(''),
  'Seen from the air in the signals square. With no signal shown, circuits are left-hand.','Signal square'],
 ['Runway lights and PAPI',320,206,
  '<rect x="0" y="0" width="320" height="206" rx="8" fill="#1a2233"/><path d="M130 194L156 22H176L202 194Z" fill="#2b3446"/>'
  +[0,1,2,3,4,5,6,7].map(function(i){var t=i/7,y=194-172*t,xl=130+26*t,xr=202-26*t;return'<circle cx="'+n(xl)+'" cy="'+n(y)+'" r="2.4" fill="#fff"/><circle cx="'+n(xr)+'" cy="'+n(y)+'" r="2.4" fill="#fff"/>'}).join('')
  +[0,1,2,3,4].map(function(i){return'<circle cx="'+(142+i*12)+'" cy="190" r="3" fill="#2fd05a"/><circle cx="'+(160+i*3)+'" cy="24" r="2.4" fill="#e0262b"/>'}).join('')
  +wt(212,194,'green threshold')+wt(212,108,'white edge lights')+wt(190,18,'red end')
  +[['4 white: too high',4],['3 white, 1 red',3],['2 and 2: on slope',2],['1 white, 3 red',1],['4 red: too low',0]].map(function(r,i){var y=22+i*36;return[0,1,2,3].map(function(k){return'<circle cx="'+(16+k*12)+'" cy="'+y+'" r="4.6" fill="'+(k<r[1]?'#fff':'#e0262b')+'"/>'}).join('')+wt(10,y+19,r[0])}).join(''),
  'A four-light PAPI is shown, normally set for a 3° to 4° approach. A two-light APAPI shows one white and one red when on slope.','Runway lighting'],
 ['Signs and stop bars',320,206,
  '<rect x="0" y="0" width="320" height="206" rx="8" fill="#4a505c"/>'
  +[['#d22','#fff','27-09','Mandatory:','need clearance'],['#f4d03f','#111','B →','Direction:','B to the right'],['#111','#f4d03f','A','Location:','you are on A']].map(function(r,i){var x=12+i*102;
   return'<rect x="'+x+'" y="16" width="92" height="34" rx="3" fill="'+r[0]+'" stroke="#222"/><text x="'+(x+46)+'" y="40" text-anchor="middle" style="font:700 17px var(--f-body);fill:'+r[1]+'">'+r[2]+'</text>'+wt(x+46,68,r[3],'middle',1)+wt(x+46,82,r[4],'middle')}).join('')
  +'<rect x="0" y="100" width="320" height="34" fill="#353a44"/>'+[0,1,2,3,4,5,6,7,8,9].map(function(i){return'<circle cx="'+(66+i*20)+'" cy="146" r="3.4" fill="#e0262b"/>'}).join('')+'<circle cx="46" cy="146" r="5" fill="#f4d03f"/><circle cx="274" cy="146" r="5" fill="#f4d03f" opacity=".4"/>'
  +wt(160,122,'runway','middle')+wt(160,174,'Red stop bar: never cross it','middle',1)+wt(160,192,'flashing yellow guard lights at the hold','middle'),
  'Red with white is mandatory. Yellow with black gives directions. Black with yellow tells you where you are. Flashing yellow guard lights mark the holding point.','Taxiway signs']
]);

add('Avoiding collisions (Skyway Code)',[
 ['Constant bearing means collision',320,196,
  [0,1,2,3].map(function(i){var ax=40+i*40,ay=172-i*10,bx=280-i*28,by=46+i*28;return'<g opacity="'+(.35+i*.2)+'">'+plane(ax,ay,70,'a',1)+plane(bx,by,225,'k',1)+L('M'+ax+' '+ay+'L'+bx+' '+by,'sr',.8,'3 3')+'</g>'}).join('')
  +'<circle cx="188" cy="128" r="10" fill="none" class="sr" stroke-width="2"/>'+T(200,152,'collision point','t2 tr')
  +box(8,8,156,56,'var(--surface)','var(--bad)')+T(18,26,'Same spot on your','t1')+T(18,40,'windscreen, growing?','t1')+T(18,56,'Act now','t1 tr'),
  'A threat that does not move across your windscreen is the one on a collision course. It hardly seems to move until late.','The risk'],
 ['Two ways to scan',320,196,
  '<path d="M20 150Q160 40 300 150" fill="none" class="s2"/>'+[0,1,2,3,4,5,6,7,8].map(function(i){var a=(-80+i*20)*Math.PI/180,x=160+Math.sin(a)*120,y=150-Math.cos(a)*90;return'<circle cx="'+n(x)+'" cy="'+n(y)+'" r="10" fill="var(--accent-soft)" stroke="var(--accent)"/><text x="'+n(x)+'" y="'+n(y+4)+'" text-anchor="middle" style="font:600 11px var(--f-body);fill:var(--ink)">'+(i+1)+'</text>'}).join('')
  +T(160,22,'side to side, in blocks of about 10°','t2','middle')+T(160,176,'pause 1 second in each, then check inside','t2','middle')+T(160,190,'or: centre, left, centre, right','t2','middle'),
  'Your eyes only spot movement when they are still: start far left and step right in blocks of about 10°, or go centre, left, back to centre, then right. Spend no more than 25% of your time looking inside.','The visual scan']
]);

add('Airspace infringements and FMCs (Skyway Code)',[
 ['Using a Frequency Monitoring Code',320,196,
  steps([['Select the frequency','check volume, reception'],['Set the FMC with ALT','(Mode C)'],['Listen','for your callsign'],['Stay within range','of the unit'],['Back to 7000','when you stop']],20,6,37,'a')
  +'<rect x="226" y="40" width="86" height="104" rx="6" fill="#15181d" stroke="#666"/><text x="269" y="78" text-anchor="middle" style="font:500 20px var(--f-mono);fill:#7cf29a">FMC</text>'+wt(269,102,'ATC may','middle')+wt(269,116,'warn you; not','middle')+wt(269,130,'guaranteed','middle'),
  'A Frequency Monitoring Code shows ATC you are listening without having called. Each code has a published frequency and area.','Frequency Monitoring Codes'],
 ['Where the base changes',320,200,
  gnd(180,20)+'<path d="M0 60H120V100H200V130H320V20H0Z" class="fa" opacity=".1"/><path d="M0 60H120V100H200V130H320V20H0Z" fill="none" class="sa" stroke-width="1.6" stroke-dasharray="6 3"/>'
  +T(60,82,'base FL55','t1 ta','middle')+T(160,122,'base 3,500 ft','t1 ta','middle')+T(260,152,'base 2,500 ft','t1 ta','middle')
  +L('M0 70H120M120 110H200M200 140H320','sg',1.4,'4 3')+side(80,154,.6,'a')+T(160,196,'altitude bases: QNH; FL bases: think 1013','t2','middle'),
  'Bases can step down quickly and switch between altitudes and flight levels. Stay 200 ft below and 2 NM clear.','Prevention']
]);

add('Crosswind component (Skyway Code)',[
 ['Splitting the wind',320,200,
  rwy(148,44,24,150)+L('M160 54V184','sk',1,'6 5').replace('class="sk"','stroke="#fff"')
  +AR('M258 10L168 66',178,60,166,67,'a',2.6)+T(312,46,'20 kt, 60° off','t1 ta','end')
  +AR('M166 10V60',166,52,166,62,'g',2)+T(150,28,'headwind','t2','end')+T(150,42,'20 × cos 60 = 10 kt','t1 tg','end')
  +AR('M258 68H176',184,68,174,68,'r',2)+T(234,92,'crosswind','t2','middle')+T(234,106,'20 × sin 60 ≈ 17 kt','t1 tr','middle')
  +L('M166 40a26 26 0 0 1 22 12','sk',1)+T(190,36,'60°','t2'),
  'Crosswind = wind speed × sin(angle). Headwind = wind speed × cos(angle). Past 90°, the headwind becomes a tailwind.','Finding the components'],
 ['Clock code rule of thumb',320,196,
  '<circle cx="92" cy="122" r="70" fill="var(--surface)" stroke="var(--ink-3)"/>'+[30,45,60,90].map(function(d){var a=d*Math.PI/180,x=92+Math.sin(a)*70,y=122-Math.cos(a)*70;return L('M92 122L'+n(x)+' '+n(y),'sa',1.6)+'<circle cx="'+n(x)+'" cy="'+n(y)+'" r="4" class="fa"/>'+T({30:136,45:152,60:162,90:168}[d],{30:58,45:76,60:96,90:136}[d],d+'°','t2')}).join('')
  +L('M92 122V52','sk',2)+T(92,44,'runway heading','t2','middle')
  +box(196,40,116,124,'var(--surface)','var(--accent)')+T(206,60,'Crosswind share','t1')+[['30°','half'],['45°','70%'],['60°','85%'],['90°','all of it']].map(function(r,i){return T(206,86+i*20,r[0],'t1')+T(242,86+i*20,r[1],'t2')}).join(''),
  'Quick mental maths: 30° off the runway gives half the wind as crosswind; 60° or more gives nearly all of it.','Finding the components']
]);
})();
