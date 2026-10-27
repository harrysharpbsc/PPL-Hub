/* ===== Topic diagrams set 3 ===== */
(function(){
var F=dzF,T=dzT,A=dzA,B=dzB,L=dzL,P=dzP;
function steps(list,x,y0,dy,col,fs){return list.map(function(r,i){var y=y0+i*dy;return'<circle cx="'+x+'" cy="'+(y+10)+'" r="11" fill="'+(col||'var(--accent)')+'"/>'+T(x,y+14,i+1,'d1','middle',null,'#fff')+T(x+18,y+8,r[0],'d1',null,fs)+(r[1]?T(x+18,y+19,r[1],'d2',null,fs?fs-1:null):'')}).join('')}
function cloud(x,y,w,h,col){return'<path d="M'+x+' '+(y+h)+'q-'+(h*.6)+' 0 -'+(h*.4)+' -'+(h*.5)+'q0 -'+(h*.6)+' '+(h*.6)+' -'+(h*.5)+'q'+(w*.15)+' -'+(h*.7)+' '+(w*.4)+' -'+(h*.3)+'q'+(w*.3)+' -'+(h*.4)+' '+(w*.45)+' '+(h*.25)+'q'+(h*.6)+' '+(h*.1)+' '+(h*.4)+' '+(h*.55)+'q0 '+(h*.5)+' -'+(h*.5)+' '+(h*.5)+'Z" fill="'+(col||'#d7dde3')+'" stroke="#9aa6b3" stroke-width=".8"/>'}
function ground(y){return'<path d="M0 '+y+'H320V200H0Z" fill="var(--ch-l1)"/>'}

/* VFR flight into IMC */
dzAdd('VFR flight into IMC (SS33)',[
 F('The 180° turn out of cloud',
  '<path d="M160 170V110A50 50 0 0 1 260 110V170" fill="none" stroke="var(--accent)" stroke-width="2.4" stroke-dasharray="6 4"/>'+A(260,140,260,176,'var(--accent)',2.4)
  +P(160,160,0,'var(--ink)',1.5)+cloud(30,20,110,60,'#c7ced6')+T(85,62,'cloud ahead','d1','middle')
  +B(210,14,104,74,'var(--surface)','var(--accent)')+T(262,30,'Rate 1 turn','d1','middle')+T(262,43,'bank no more than 20°','d2','middle',7.4)+T(262,56,'180° takes 1 minute','d2','middle',7.4)+T(262,69,'back pressure to','d2','middle',7.4)+T(262,80,'hold height','d2','middle',7.4)
  +T(110,140,'note the target','d2','end')+T(110,151,'heading first','d2','end')+T(272,190,'roll out, hold it','d2','middle'),
  'Trust the instruments, keep the wings level, then make a gentle rate 1 turn. Without a heading indicator, time it: 1 minute for 180°.'),
 F('Tricks your balance can play',
  [['The leans','you feel level','but are banked'],['Somatogravic','speeding up feels','like pitching up'],['Coriolis','head moves in a turn:','false rotation'],['Inversion','abrupt level-off','feels like tumbling'],['False horizon','sloping cloud tops','look level']].map(function(r,i){var x=8+(i%3)*104,y=i<3?10:104;return B(x,y,98,84,'var(--surface)','var(--ink-2)',6)+T(x+49,y+18,r[0],'d1','middle')+T(x+49,y+58,r[1],'d2','middle',7)+T(x+49,y+69,r[2],'d2','middle',7)
   +(i===0?'<g transform="translate('+(x+49)+' '+(y+36)+') rotate(-15)"><path d="M-22 0H22M-3 0V-6" stroke="var(--accent)" stroke-width="3"/></g>':i===1?'<g transform="translate('+(x+49)+' '+(y+36)+') rotate(-12)"><path d="M-20 0H18L22-4" stroke="var(--accent)" stroke-width="3" fill="none"/></g>'+A(x+20,y+44,x+76,y+44,'var(--bad)',1):i===2?'<path d="M'+(x+30)+' '+(y+36)+'a18 10 0 1 0 36 0" stroke="var(--accent)" stroke-width="2" fill="none"/>':i===3?'<path d="M'+(x+34)+' '+(y+32)+'h30M'+(x+49)+' '+(y+24)+'v18" stroke="var(--accent)" stroke-width="2.4"/>':'<path d="M'+(x+18)+' '+(y+46)+'L'+(x+80)+' '+(y+30)+'" stroke="#9aa6b3" stroke-width="6"/>')}).join('')
  +B(216,104,98,84,'var(--bad)','var(--bad)',6).replace('fill="var(--bad)"','fill="var(--bad)" fill-opacity=".1"')+T(265,130,'If you enter cloud:','d1','middle',null,'var(--bad)')+T(265,148,'aviate, navigate,','d2','middle',7.4)+T(265,160,'communicate','d2','middle',7.4),
  'Spatial disorientation is the killer in VFR into IMC. Your inner ear is wrong; the attitude indicator is right.'),
 F('VFR on top and the 3,000 ft rule',
  ground(170)+'<path d="M0 170L40 160L80 166L120 150L160 162L200 156L240 166L280 154L320 164V170Z" fill="var(--ch-l2)"/>'+'<path d="M0 108Q60 96 120 108T240 106T320 104V128H0Z" fill="#d7dde3" stroke="#9aa6b3"/>'
  +L('M0 92H320','var(--bad)',1.2,'5 3')+T(316,88,'3,000 ft AMSL','d1','end',null,'var(--bad)')+dzSide(90,60,1.1,'var(--accent)')+T(90,24,'Above 3,000 ft: 5 km,','d2','middle',7.4)+T(90,35,'1,500 m and 1,000 ft from cloud','d2','middle',7.4)
  +T(230,60,'No hole at the','d1','middle')+T(230,72,'destination?','d1','middle')+T(230,142,'Below 3,000 ft in Class G:','d2','middle',7.4)+T(230,152,'stay in sight of the surface','d2','middle',7.4),
  'Flying above cloud is legal above 3,000 ft with the right cloud separation, but you may have no way down at the other end.')
]);

/* GA radiotelephony practice */
dzAdd('GA radiotelephony practice (SS22)',[
 F('Squawk codes to know',
  [['7000','VFR conspicuity','var(--good)'],['2000','IFR conspicuity','var(--good)'],['0030','Lost (UK)','var(--mid)'],['7600','Radio failure','var(--mid)'],['7700','Emergency','var(--bad)'],['7500','Unlawful interference','var(--bad)']].map(function(r,i){var x=10+(i%2)*154,y=12+Math.floor(i/2)*60;return B(x,y,146,50,'#15181d','#666',6)+'<text x="'+(x+12)+'" y="'+(y+33)+'" font-family="var(--f-mono)" font-size="22" fill="#7cf29a">'+r[0]+'</text>'+T(x+82,y+22,r[1].split(' ')[0],'d1',null,8.6,'#eee')+T(x+82,y+35,r[1].split(' ').slice(1).join(' '),'d2',null,7.6,'#bbb')+'<rect x="'+(x+136)+'" y="'+(y+8)+'" width="4" height="34" rx="2" fill="'+r[2]+'"/>'}).join('')
  +T(160,196,'Select ALT (Mode C). Press IDENT only when asked.','d2','middle'),
  'The three 7s are for trouble. 0030 is the UK lost code, used while you call for help.'),
 F('Where to make your aerodrome calls',
  L('M10 120H310','var(--ink-2)',1,'2 3')+'<rect x="20" y="114" width="60" height="12" fill="#555c6b"/>'+T(50,142,'runway','d2','middle')
  +[[80,'threshold'],[150,'4 NM'],[220,'8 NM']].map(function(r){return L('M'+r[0]+' 104V136','var(--ink)',1)+T(r[0],100,r[1],'d2','middle')}).join('')
  +'<rect x="80" y="112" width="70" height="16" fill="var(--good)" opacity=".2"/>'+T(115,124,'final','d1','middle')+'<rect x="150" y="112" width="70" height="16" fill="var(--mid)" opacity=".2"/>'+T(185,124,'long final','d1','middle')
  +P(300,120,270,'var(--accent)',1.2)+T(160,60,'No such call as "short final": give the distance','d2','middle')
  +B(20,154,280,36,'var(--surface)','var(--accent)')+T(160,168,'At ATC aerodromes call 15 NM or 5 minutes','d1','middle')+T(160,181,'from the ATZ, whichever is greater','d2','middle')
  +T(160,24,'Circuit calls: downwind and final.','d1','middle')+T(160,36,'Overhead join: overhead, then descending deadside','d2','middle'),
  'Final runs from 4 NM to the threshold, long final from 4 to 8 NM.'),
 F('The distress or urgency message',
  [['MAYDAY ×3 or PAN PAN ×3',''],['Station called',''],['Your callsign and type',''],['Nature of the problem',''],['Intentions',''],['Position, height, heading',''],['Pilot qualification','(helps UK controllers)'],['Other: persons on board, endurance','']].map(function(r,i){var y=6+i*22;return'<rect x="40" y="'+y+'" width="240" height="18" rx="9" fill="'+(i===0?'var(--bad)':'var(--surface)')+'" stroke="var(--ink-2)"/>'+T(54,y+13,(i+1)+'. '+r[0],'d1',null,8.4,i===0?'#fff':null)+(r[1]?T(272,y+13,r[1],'d2','end',7):'')}).join('')
  +T(160,196,'Then squawk 7700. Use 121.5 MHz if not with a unit.','d2','middle'),
  'MAYDAY is grave and imminent danger. PAN PAN is a concern without immediate danger, and is worth making early.')
]);

/* VFR flight planning and VMC minima */
var vmc=F('UK VMC minima at a glance',
  ground(182)+L('M0 34H320','var(--ink)',1,'5 3')+T(4,30,'FL100','d1')+L('M0 108H320','var(--ink)',1,'5 3')+T(4,104,'3,000 ft AMSL','d2',null,7.6)+T(4,124,'or 1,000 ft','d2',null,6.6)
  +B(126,40,188,62,'var(--surface)','var(--accent)')+T(220,56,'Below FL100 and above 3,000 ft','d1','middle',8.2)+T(220,70,'5 km visibility','d2','middle')+T(220,82,'1,500 m horizontal and','d2','middle')+T(220,94,'1,000 ft vertical from cloud','d2','middle')
  +T(220,24,'FL100 and above: 8 km, same cloud distances','d2','middle',7)
  +B(8,116,146,58,'var(--surface)','var(--ink-2)')+T(81,130,'Classes A to E','d1','middle')+T(81,143,'5 km, 1,500 m and','d2','middle')+T(81,155,'1,000 ft from cloud','d2','middle')
  +B(164,116,148,58,'var(--surface)','var(--good)')+T(238,130,'Class F and G','d1','middle')+T(238,143,'5 km, clear of cloud,','d2','middle')+T(238,155,'surface in sight','d2','middle')+T(238,167,'(1,500 m at 140 kt or less, day)','d2','middle',6.8)
  +T(160,190,'UK Class D exemption (day, 140 kt or less, 3,000 ft or below):','d2','middle',6.6)+T(160,198,'clear of cloud with the surface in sight','d2','middle',6.6),
  'Visibility and distance from cloud depend on height, class and speed. These are legal minima, not targets.');
dzAdd('VFR flight planning and VMC minima (SS05)',[vmc,
 F('Final fuel reserve minima (Part-21 aeroplanes)',
  [['Day, staying in sight of the aerodrome',10,'var(--mid)'],['Day, any other flight',30,'var(--accent)'],['Night',45,'var(--ink)']].map(function(r,i){var y=30+i*48,w=r[1]*5;return T(20,y-4,r[0],'d1')+'<rect x="20" y="'+y+'" width="'+w+'" height="22" rx="4" fill="'+r[2]+'" opacity=".75"/>'+T(28+w,y+15,r[1]+' min','d3')}).join('')+T(160,190,'These are minima: plan to land with more','d2','middle'),
  'Helicopters need 20 minutes. Measure fuel with a dipstick and plan for the worst case.'),
 F('FREDA every 10 minutes',
  [['F','Fuel','quantity, selector'],['R','Radio','frequency, squawk'],['E','Engine','Ts and Ps, carb heat'],['D','Direction','compass, DI aligned'],['A','Altimeter','setting, height']].map(function(r,i){var x=10+i*61;return B(x,40,56,110,'var(--surface)','var(--accent)',6)+T(x+28,74,r[0],'d3','middle',null,'var(--accent)')+T(x+28,98,r[1],'d1','middle',8.4)+T(x+28,118,r[2].split(', ')[0],'d2','middle',6.8)+T(x+28,129,r[2].split(', ')[1]||'','d2','middle',6.8)}).join('')
  +T(160,24,'Look outside about 80% of the time','d1','middle')+T(160,176,'Take 2: keep 2 NM or 200 ft clear of controlled airspace','d2','middle'),
  'A short routine check that catches fuel, radio and navigation slips before they grow.')
]);
dzAdd('VFR, IFR and Special VFR (Skyway Code)',[vmc,
 F('Special VFR in a control zone',
  '<circle cx="110" cy="100" r="80" fill="color-mix(in srgb,#2457c5 8%,transparent)" stroke="#2457c5" stroke-width="1.8" stroke-dasharray="7 3"/>'+T(110,32,'CTR','d1','middle',null,'#2457c5')
  +cloud(60,62,100,26,'#c7ced6')+dzSide(110,120,1.1,'var(--accent)')
  +B(204,14,110,90,'var(--surface)','var(--accent)')+T(259,30,'To accept SVFR','d1','middle')+T(259,44,'clear of cloud','d2','middle')+T(259,56,'surface in sight','d2','middle')+T(259,68,'flight visibility','d2','middle')+T(259,79,'1,500 m or more','d2','middle')+T(259,91,'140 kt or less','d2','middle')
  +B(204,112,110,76,'var(--surface)','var(--mid)')+T(259,128,'Take-off or landing','d1','middle')+T(259,142,'ground visibility','d2','middle')+T(259,153,'1,500 m, or a','d2','middle')+T(259,164,'cloud ceiling','d2','middle')+T(259,175,'of 600 ft','d2','middle'),
  'SVFR lets you fly in a control zone below VMC without IFR, with ATC separating you from IFR and other SVFR traffic.'),
 F('When VFR is not enough in a CTR',
  ground(170)+'<rect x="0" y="80" width="320" height="22" fill="#c7ced6" opacity=".9"/>'+L('M0 102H320','var(--bad)',1.2,'4 3')+T(8,96,'ceiling below 1,500 ft','d1',null,null,'var(--bad)')
  +'<rect x="0" y="102" width="320" height="68" fill="#e7ebee" opacity=".5"/>'+T(160,130,'or ground visibility under 5 km','d1','middle',null,'var(--bad)')
  +'<rect x="120" y="164" width="80" height="6" fill="#555c6b"/>'+T(160,186,'No VFR take-off, landing, ATZ or circuit','d2','middle')+T(160,30,'Ask for Special VFR instead','d1','middle',null,'var(--good)')+T(160,46,'VFR is never allowed in Class A','d2','middle'),
  'In a control zone, VFR stops below a 1,500 ft ceiling or 5 km ground visibility. Ask ATC for Special VFR.')
]);

/* Weather charts and forecasts */
dzAdd('Weather charts and forecasts (Skyway Code)',[
 F('Reading a METAR group by group',
  B(8,20,304,34,'#15181d','#666')+'<text x="16" y="42" font-family="var(--f-mono)" font-size="10.4" fill="#eee">EGXX 261150Z 34008KT 9999 SCT025 12/07 Q1019</text>'
  +[[69,'place and','time (UTC)'],[119,'340° at','8 knots'],[160,'10 km','or more'],[197,'3 to 4 oktas','at 2,500 ft AAL'],[237,'temp','dew point'],[275,'QNH','hPa']].map(function(r,i){var y=74+(i%2)*46;return L('M'+r[0]+' 56V'+(y-10),'var(--accent)',1)+T(r[0],y,r[1],'d1','middle',7.6)+T(r[0],y+11,r[2],'d2','middle',7)}).join('')
  +T(160,176,'Cloud heights are above the aerodrome, so compare them with the','d2','middle',7.4)+T(160,188,'terrain on your route. Type is only given for CB and TCU.','d2','middle',7.4),
  'A made-up example. TAFs are forecasts, METARs are reports, usually every half hour.'),
 F('Cloud amounts and the ceiling',
  [['FEW','1 to 2',2],['SCT','3 to 4',4],['BKN','5 to 7',6],['OVC','8',8]].map(function(r,i){var x=40+i*80;return dzPie(x,70,24,r[2],'var(--ink-2)')+T(x,114,r[0],'d3','middle')+T(x,128,r[1]+' oktas','d2','middle')}).join('')
  +'<rect x="160" y="140" width="156" height="22" rx="4" fill="var(--bad)" opacity=".15"/>'+T(238,155,'ceiling: BKN or OVC','d1','middle',null,'var(--bad)')+'<rect x="4" y="140" width="156" height="22" rx="4" fill="var(--accent)" opacity=".12"/>'+T(82,155,'cloud base: any cloud','d1','middle')
  +T(160,186,'Ceiling is the lowest layer covering more than half the sky','d2','middle'),
  'An okta is an eighth of the sky. FEW and SCT count for the cloud base but not the ceiling.'),
 F('What the F215 shows',
  '<path d="M90 20Q130 30 150 70Q120 110 160 150Q190 180 150 196H30Q10 120 40 60Q60 20 90 20Z" fill="var(--ch-l1)" stroke="var(--ch-rv)"/>'
  +'<path d="M120 10L140 80L170 130" stroke="#d33" stroke-width="2" fill="none"/><path d="M200 40L170 130L150 196" stroke="#2457c5" stroke-width="2" fill="none"/>'
  +'<path d="M60 40Q100 80 70 130" stroke="var(--ink-2)" stroke-width="1" fill="none" stroke-dasharray="3 3"/>'+T(60,90,'A','d3','middle')+T(118,110,'B','d3','middle')+T(180,80,'C','d3','middle')
  +B(208,18,106,170,'var(--surface)','var(--ink-2)')+T(261,34,'Each zone lists','d1','middle')+['cloud amount, type','base and top (AMSL)','visibility, weather','icing, turbulence','freezing level (0°C)','','Valid 9 hours,','below 10,000 ft','XXX: tops above','the chart limit'].map(function(t,i){return T(261,50+i*13,t,'d2','middle',7.2)}).join(''),
  'The low-level forecast for the British Isles. Use it with METARs and TAFs to build the whole picture.')
]);

/* Route planning and altitude selection */
dzAdd('Route planning and altitude selection (Skyway Code)',[
 F('Maximum Elevation Figure',
  '<rect x="20" y="20" width="160" height="160" fill="var(--ch-l1)" stroke="var(--ink-2)"/>'+'<path d="M40 150Q80 90 110 120T170 110V180H40Z" fill="var(--ch-l3)" opacity=".7"/>'
  +'<path d="M120 112l4 10h-8z" fill="var(--ink)"/>'+T(128,110,'mast 1,840','d2',null,7.4)+'<path d="M70 120l3 6h-6z" fill="var(--ink)"/>'+T(76,118,'1,480','d2',null,7.4)
  +'<text x="60" y="80" font-family="var(--f-display)" font-weight="700" font-size="30" fill="var(--accent)">1</text><text x="80" y="70" font-family="var(--f-display)" font-weight="700" font-size="18" fill="var(--accent)">9</text>'
  +B(192,20,122,160,'var(--surface)','var(--accent)')+T(253,38,'MEF 1,900 ft means:','d1','middle')+T(253,56,'higher of','d2','middle')+T(253,68,'highest obstacle, or','d2','middle')+T(253,80,'highest terrain + 300 ft,','d2','middle')+T(253,92,'rounded up','d2','middle')+T(253,118,'It has no margin.','d1','middle',null,'var(--bad)')+T(253,134,'Add 500 or 1,000 ft','d2','middle')+T(253,146,'for your safety altitude','d2','middle'),
  'A made-up quadrangle. The big figure is in thousands and hundreds of feet. Study 5 NM either side of your track.'),
 F('Planning the descent',
  ground(176)+'<rect x="250" y="170" width="50" height="6" fill="#555c6b"/>'+L('M20 30L250 170','var(--accent)',2.4)+dzSide(30,34,.9,'var(--accent)')
  +[[20,30,'4,000 ft'],[97,77,'3,000 ft'],[173,123,'2,000 ft']].map(function(r){return'<circle cx="'+r[0]+'" cy="'+r[1]+'" r="3" fill="var(--accent)"/>'+T(r[0]+8,r[1]+14,r[2],'d2')}).join('')
  +T(200,40,'3 NM per 1,000 ft','d1','middle')+T(200,54,'Rate: ground speed × 5','d2','middle')+T(200,66,'100 kt ≈ 500 ft/min (3°)','d2','middle'),
  'From 4,000 ft to land, start about 12 NM out. 3° is about 300 ft per NM.'),
 F('Take 2 around airspace',
  '<rect x="150" y="20" width="160" height="80" fill="color-mix(in srgb,#2457c5 10%,transparent)" stroke="#2457c5" stroke-width="1.8" stroke-dasharray="7 3"/>'+T(230,40,'CTA base 2,500 ft','d1','middle',null,'#2457c5')
  +L('M150 112H310','var(--good)',1.4,'4 3')+A(290,102,290,112,'var(--good)',1)+T(230,126,'200 ft below the base','d1','middle',null,'var(--good)')
  +dzSide(220,150,1,'var(--accent)')+L('M138 20V100','var(--good)',1.4,'4 3')+T(100,60,'2 NM','d1','middle',null,'var(--good)')+A(110,64,136,64,'var(--good)',1)
  +T(70,150,'Use the QNH for','d2','middle')+T(70,162,'the airspace above','d2','middle'),
  'Stay 2 NM from edges and 200 ft below bases of controlled airspace, danger areas and ATZs, more in turbulence.')
]);

/* Altimeter settings */
dzAdd('Altimeter settings (Skyway Code)',[
 F('QFE, QNH and 1013',
  '<path d="M0 186H320V200H0Z" fill="#a9cfe6"/>'+T(300,196,'mean sea level','d2','end',7)+'<path d="M0 150Q60 140 120 150V186H0Z" fill="var(--ch-l2)"/>'+'<rect x="40" y="144" width="60" height="6" fill="#555c6b"/>'+T(70,140,'aerodrome 300 ft','d2','middle',7.4)
  +dzSide(200,60,1.1,'var(--accent)')+A(200,66,200,148,'var(--good)',1.4)+A(214,66,214,184,'var(--accent)',1.4)+A(228,66,228,30,'var(--mid)',1.4)
  +L('M0 150H320','var(--ink-2)',.7,'2 3')+L('M0 26H320','var(--mid)',.8,'2 3')+T(316,22,'1013.25 hPa pressure level','d2','end',7)
  +T(194,110,'QFE: height','d1','end',null,'var(--good)')+T(194,121,'above aerodrome','d2','end',7.4)+T(220,110,'QNH: altitude','d1',null,null,'var(--accent)')+T(220,121,'above sea level','d2',null,7.4)+T(234,48,'1013: flight level','d1',null,null,'var(--mid)'),
  'On the ground QFE reads zero and QNH reads the aerodrome elevation. Above the transition altitude, set 1013 for flight levels.'),
 F('Transition altitude and level',
  L('M0 150H320','var(--ink)',1)+T(316,146,'transition altitude (often 3,000 ft)','d2','end',7.4)+L('M0 110H320','var(--ink)',1)+T(316,106,'transition level, at least 1,000 ft above','d2','end',7.4)
  +'<rect x="0" y="110" width="320" height="40" fill="var(--mid)" opacity=".15"/>'+T(160,134,'transition layer','d1','middle')
  +T(80,60,'Climbing: set 1013','d1','middle')+A(80,140,80,70,'var(--accent)',1.4)+T(240,60,'Descending: set QNH','d1','middle')+A(240,70,240,140,'var(--accent)',1.4)+T(80,176,'Altitudes on QNH','d2','middle')+T(240,30,'Flight levels on 1013','d2','middle'),
  'In the UK outside controlled airspace the transition altitude is usually 3,000 ft. Changing to flight levels is optional for VFR.'),
 F('Worked example: 27 ft per hPa',
  B(20,30,280,40,'var(--surface)','var(--ink-2)')+T(160,47,'QNH 1000, flying at 3,000 ft. Now set 1013.','d1','middle')+T(160,61,'1013 − 1000 = 13 hPa','d2','middle')
  +A(160,74,160,96,'var(--ink-2)',1.2)+B(60,100,200,40,'var(--surface)','var(--accent)')+T(160,117,'13 × 27 ft ≈ 351 ft','d1','middle')+T(160,131,'reading goes up','d2','middle')
  +A(160,144,160,160,'var(--ink-2)',1.2)+'<text x="160" y="186" text-anchor="middle" font-family="var(--f-mono)" font-size="20" font-weight="700" fill="var(--accent)">3,351 ft</text>',
  'Lower pressure than standard means the altimeter on 1013 reads higher than your true altitude. "High to low, look out below."')
]);

/* Fuel, flight plans and aerodrome planning */
dzAdd('Fuel, flight plans and aerodrome planning (Skyway Code)',[
 F('Fuel by volume and by mass',
  [['AVGAS','0.72 kg per litre','#5aa0d8'],['Jet A-1','about 0.8 kg per litre','#c9a46a']].map(function(r,i){var x=20+i*150;return'<path d="M'+(x+20)+' 40h60l10 14v90a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8v-90z" fill="var(--surface)" stroke="var(--ink-2)"/><rect x="'+(x+16)+'" y="90" width="68" height="58" fill="'+r[2]+'" opacity=".55"/>'+T(x+50,72,r[0],'d1','middle')+T(x+50,172,r[1],'d2','middle')}).join('')
  +T(160,24,'1 US gal = 3.785 L    1 Imp gal = 4.546 L','d1','middle')+T(160,192,'For W&B assume fuel high, for planning assume low','d2','middle'),
  'Mixed units have caused accidents. Match the density to the volume unit and check every figure.'),
 F('When you need a flight plan',
  [['Crossing an international border',1],['Under an ATC service (into CAS, or from a controlled aerodrome)',1],['Leaving the aerodrome vicinity at night',1],['Over water more than 10 NM from the UK coast',0],['To the Scottish Highlands and Islands',0],['Over sparsely populated areas',0]].map(function(r,i){var y=14+i*29;return B(14,y,292,24,'var(--surface)',r[1]?'var(--accent)':'var(--ink-2)')+'<rect x="14" y="'+y+'" width="8" height="24" rx="2" fill="'+(r[1]?'var(--accent)':'var(--mid)')+'"/>'+T(30,y+16,r[0],'d2',null,7.6)+T(298,y+16,r[1]?'required':'recommended','d1','end',7.4,r[1]?'var(--accent)':'var(--mid)')}).join(''),
  'Booking out can count as the abbreviated plan at night if the unit can receive it. Abbreviated plans are not passed on to other units.'),
 F('Questions for an unfamiliar aerodrome',
  ['PPR?','Usable length','Surface: long, wet, soft grass','Obstacles','Local procedures','Wind effects','Noise abatement','And for the alternate too'].map(function(t,i){var x=12+(i%2)*154,y=16+Math.floor(i/2)*44;return B(x,y,146,36,'var(--surface)',i===7?'var(--bad)':'var(--ink-2)',8)+'<circle cx="'+(x+16)+'" cy="'+(y+18)+'" r="7" fill="none" stroke="var(--accent)" stroke-width="1.6"/><path d="M'+(x+12)+' '+(y+18)+'l3 3 5-6" stroke="var(--accent)" stroke-width="1.6" fill="none"/>'+T(x+30,y+22,t,'d1',null,7.8)}).join(''),
  'The AIP only covers licensed aerodromes. Phone ahead, and treat information about unlicensed strips as unverified.')
]);

/* Rules of the Air essentials */
dzAdd('Rules of the Air essentials (Skyway Code)',[
 F('Right of way on the ground',
  B(4,8,100,170,'var(--surface)','var(--ink-2)',6)+T(54,24,'Head-on','d1','middle')+P(40,140,0,'var(--accent)',1.2)+P(68,56,180,'var(--ink)',1.2)+A(40,124,52,96,'var(--accent)',1)+A(68,72,56,104,'var(--ink)',1)+T(54,170,'both stop, turn right','d2','middle',7)
  +B(110,8,100,170,'var(--surface)','var(--ink-2)',6)+T(160,24,'Converging','d1','middle')+P(140,140,0,'var(--accent)',1.2)+P(190,90,270,'var(--ink)',1.2)+T(160,170,'other on your right:','d2','middle',7)+T(160,180,'you give way','d2','middle',7)
  +B(216,8,100,170,'var(--surface)','var(--ink-2)',6)+T(266,24,'Overtaking','d1','middle')+P(266,60,0,'var(--ink)',1.2)+P(266,140,0,'var(--accent)',1.2)+A(260,124,240,84,'var(--accent)',1)+A(272,124,292,84,'var(--accent)',1)+T(266,170,'pass left or right','d2','middle',7)
  +T(160,193,'Give way to aircraft taking off. Emergency vehicles first.','d2','middle',7),
  'On the ground the rules match the air, except an overtaker may pass on either side.'),
 F('The pilot in command',
  '<circle cx="80" cy="96" r="56" fill="var(--accent-soft)" stroke="var(--accent)"/>'+T(80,90,'Final','d3','middle')+T(80,108,'authority','d3','middle')
  +[['Responsible for compliance,','even off the controls'],['Departs from the rules only','if needed for safety'],['Studies weather, fuel','and alternatives'],['Never flies under a','psychoactive substance']].map(function(t,i){var y=36+i*38;return A(140,96,166,y,'var(--ink-2)',1)+B(168,y-14,144,28,'var(--surface)','var(--ink-2)')+T(240,y-2,t[0],'d2','middle',7.4)+T(240,y+9,t[1],'d2','middle',7.4)}).join(''),
  'The PIC carries the final responsibility for the flight, whoever is handling the controls.')
]);

/* Airspace, ATZ, MATZ and transponders */
dzAdd('Airspace, ATZ, MATZ and transponders (Skyway Code)',[
 F('An ATZ is a cylinder',
  ground(170)+'<ellipse cx="160" cy="168" rx="110" ry="16" fill="var(--ch-l2)" stroke="#c0243a" stroke-width="1.4"/>'+'<path d="M50 168V60M270 168V60" stroke="#c0243a" stroke-width="1.4"/>'+'<ellipse cx="160" cy="60" rx="110" ry="16" fill="color-mix(in srgb,#c0243a 8%,transparent)" stroke="#c0243a" stroke-width="1.4"/>'
  +'<rect x="130" y="164" width="60" height="6" fill="#555c6b"/>'+A(276,166,276,62,'var(--ink)',1)+T(280,112,'2,000 ft','d1',null,8)+T(280,123,'above the','d2',null,7)+T(280,133,'aerodrome','d2',null,7)
  +A(160,186,270,186,'var(--ink)',1)+T(214,197,'2 NM (2.5 NM if runway over 1,850 m)','d2','middle',7)+T(160,30,'Permission (ATC) or information (AFIS, A/G) before entering','d1','middle',7.6),
  'Radius depends on the longest runway. Many busy aerodromes have no ATZ, so watch for them anyway.'),
 F('A typical MATZ',
  '<circle cx="120" cy="100" r="66" fill="color-mix(in srgb,#b0237a 7%,transparent)" stroke="#b0237a" stroke-width="1.6" stroke-dasharray="4 2"/><rect x="186" y="80" width="64" height="40" fill="color-mix(in srgb,#b0237a 7%,transparent)" stroke="#b0237a" stroke-width="1.6" stroke-dasharray="4 2"/><rect x="-10" y="80" width="64" height="40" fill="none"/>'
  +'<circle cx="120" cy="100" r="26" fill="color-mix(in srgb,#c0243a 10%,transparent)" stroke="#c0243a" stroke-width="1.4"/>'+'<rect x="104" y="98" width="32" height="4" fill="#555c6b"/>'+T(120,82,'ATZ','d1','middle',null,'#c0243a')
  +T(218,74,'stub','d2','middle')+T(120,24,'MATZ: 5 NM radius,','d1','middle',null,'#b0237a')+T(120,36,'3,000 ft above the airfield','d2','middle')
  +B(254,20,62,160,'var(--surface)','var(--ink-2)')+T(285,38,'Call','d1','middle')+T(285,50,'10 min','d2','middle')+T(285,61,'ahead','d2','middle')+T(285,84,'Not CAS','d1','middle')+T(285,96,'for civil','d2','middle')+T(285,108,'aircraft','d2','middle')+T(285,132,'Never','d1','middle',null,'var(--bad)')+T(285,144,'enter the','d2','middle')+T(285,156,'ATZ without','d2','middle')+T(285,168,'clearance','d2','middle'),
  'Ask for a MATZ penetration service about 10 minutes ahead. Two calls with no reply: you may enter with caution.'),
 F('Control zone and control area',
  ground(176)+'<rect x="120" y="96" width="80" height="80" fill="color-mix(in srgb,#2457c5 12%,transparent)" stroke="#2457c5" stroke-width="1.6"/>'+'<rect x="40" y="40" width="240" height="56" fill="color-mix(in srgb,#2457c5 7%,transparent)" stroke="#2457c5" stroke-width="1.6" stroke-dasharray="6 3"/>'
  +'<rect x="150" y="170" width="20" height="6" fill="#555c6b"/>'+T(160,140,'CTR','d3','middle',null,'#2457c5')+T(160,154,'from the surface','d2','middle')+T(160,70,'CTA','d3','middle',null,'#2457c5')+T(160,84,'base about 1,500 ft','d2','middle')
  +dzSide(70,152,.9,'var(--accent)')+T(70,112,'under the CTA','d2','middle')+T(70,124,'without clearance','d2','middle')+T(290,30,'Class D: clearance needed','d1','end',null,'#2457c5'),
  'A CTR starts at the surface around the airport. CTAs sit above and around it with higher bases you can fly beneath.')
]);

/* Aerodrome operations and circuits */
var circ=function(){return'<rect x="100" y="96" width="120" height="8" fill="#555c6b"/>'+L('M220 100H70V160H250V100H220','var(--accent)',1.8,'6 3')}
dzAdd('Aerodrome operations and circuits (Skyway Code)',[
 F('Live side and dead side',
  '<rect x="0" y="0" width="320" height="100" fill="var(--ch-l2)" opacity=".35"/>'+'<rect x="0" y="100" width="320" height="100" fill="var(--accent)" opacity=".06"/>'+circ()
  +T(160,40,'DEAD SIDE','d3','middle',null,'var(--ink-2)')+T(160,56,'no circuit traffic: descend here after the overhead','d2','middle',7.4)+T(160,186,'LIVE SIDE (circuit traffic)','d1','middle')
  +T(160,92,'Runway 27','d2','middle')+T(160,174,'downwind','d2','middle')+T(56,134,'crosswind','d2','end')+T(264,134,'base','d2')+T(240,90,'final','d2','middle')+T(60,90,'upwind','d2','middle')
  +P(118,160,90,'var(--accent)',1.1),
  'Left-hand circuit shown. Calls on downwind and final, plus base or late downwind if it helps others picture you.'),
 F('The overhead join',
  '<g transform="translate(-34 26) scale(.72)">'+circ()+'<path d="M300 20L160 100" stroke="var(--bad)" stroke-width="2.6" fill="none"/><path d="M160 100Q130 60 100 50H60Q40 50 50 80L70 100" stroke="var(--bad)" stroke-width="2.6" fill="none" stroke-dasharray="5 3"/></g>'+T(80,180,'left-hand circuit, runway 27','d2','middle',7.4)
  +steps([['Overhead, 2,000 ft QFE','1,000 ft above circuit'],['Descend on dead side',''],['Cross the upwind end','at circuit height'],['Join crosswind','then fly the circuit']],190,14,44,'var(--bad)',8.4),
  'A joining aircraft gives way to traffic already in the circuit. Report overhead, then descending dead side.'),
 F('At the holding point',
  '<rect x="0" y="40" width="320" height="40" fill="#555c6b"/>'+L('M0 60H320','#fff',1.5,'10 8')+'<rect x="120" y="80" width="60" height="120" fill="#6a7180"/>'
  +L('M120 98H180M120 104H180','#f2c94c',2)+L('M120 88H180M120 92H180','#f2c94c',2,'5 4')+'<rect x="186" y="96" width="34" height="16" fill="#d22"/>'+T(203,108,'A1','d1','middle',null,'#fff')
  +P(140,150,315,'var(--accent)',1.6)+T(150,186,'stop at an angle to see the approach','d2','middle')+T(230,140,'Checks complete,','d2')+T(230,151,'then "ready for','d2')+T(230,162,'departure"','d2')
  +T(10,24,'Holding position: two solid lines on your side, two dashed on the runway side','d2',null,7.2),
  'At an ATC aerodrome never cross onto the runway without a clearance. At A/G or AFIS aerodromes check the approach is clear yourself.')
]);

/* Emergencies */
dzAdd('Emergencies (Skyway Code)',[
 F('Choosing a field: the six S',
  [['Wind','into wind'],['Size','bigger is better'],['Surroundings','power lines, trees'],['Shape','square beats narrow'],['Surface','grass over crops'],['Slope','avoid it']].map(function(r,i){var x=8+(i%3)*104,y=10+Math.floor(i/3)*92;return B(x,y,98,84,'var(--surface)','var(--ink-2)',6)+T(x+49,y+66,r[0],'d1','middle')+T(x+49,y+78,r[1],'d2','middle',7.2)
   +(i===0?A(x+20,y+36,x+78,y+36,'#5aa0d8',2):i===1?'<rect x="'+(x+24)+'" y="'+(y+14)+'" width="50" height="40" fill="var(--ch-l1)" stroke="var(--good)"/>':i===2?L('M'+(x+12)+' '+(y+20)+'Q'+(x+49)+' '+(y+36)+' '+(x+86)+' '+(y+20),'var(--ink)',1)+'<path d="M'+(x+12)+' '+(y+14)+'v40M'+(x+86)+' '+(y+14)+'v40" stroke="var(--ink)" stroke-width="2"/>':i===3?'<rect x="'+(x+30)+'" y="'+(y+14)+'" width="38" height="38" fill="var(--ch-l1)" stroke="var(--good)"/>':i===4?'<rect x="'+(x+18)+'" y="'+(y+18)+'" width="30" height="30" fill="var(--ch-l1)"/><rect x="'+(x+50)+'" y="'+(y+18)+'" width="30" height="30" fill="#c9a46a"/>'+L('M'+(x+52)+' '+(y+24)+'h26M'+(x+52)+' '+(y+32)+'h26M'+(x+52)+' '+(y+40)+'h26','#8a6a3a',1):L('M'+(x+14)+' '+(y+50)+'L'+(x+84)+' '+(y+22),'var(--good)',3))}).join(''),
  'Wind, size, surroundings, shape, surface and slope. Shortly after take-off, land ahead rather than turning back.'),
 F('The constant aspect approach',
  '<rect x="150" y="110" width="70" height="44" fill="var(--ch-l1)" stroke="var(--good)" stroke-width="1.6"/>'+T(185,136,'field','d1','middle')
  +'<path d="M60 40Q30 120 90 170Q160 196 200 160" stroke="var(--bad)" stroke-width="2" fill="none" stroke-dasharray="6 3"/>'+P(60,40,190,'var(--accent)',1.3)
  +L('M60 40L160 120','var(--ink-2)',1,'3 3')+T(118,70,'about 45°','d1')+T(250,40,'Keep the angle','d1','middle')+T(250,52,'to the field constant','d2','middle')+T(250,74,'too high: widen or','d2','middle')+T(250,85,'sideslip, S-turn','d2','middle')+T(250,100,'too low: tighten','d2','middle'),
  'Watch the field\'s angle below you and adjust the turn to keep it steady. Aim further in if you will use full flap.'),
 F('Before you change anything',
  steps([['Fly the aircraft','keep a safe flying speed'],['Assess before acting','do not jump to conclusions'],['Declare early','easier to cancel than to start late'],['Squawk 7700','121.5 MHz if not with a unit']],22,14,44,'var(--bad)')
  +B(232,30,82,120,'var(--surface)','var(--ink-2)')+T(273,48,'Lost?','d1','middle')+T(273,62,'squawk 0030','d2','middle')+T(273,74,'call D&amp;D 121.5','d2','middle')+T(273,98,'Radio dead?','d1','middle')+T(273,112,'squawk 7600','d2','middle')+T(273,124,'stay VMC, watch','d2','middle')+T(273,136,'for light signals','d2','middle'),
  'Many accidents start when a survivable problem distracts the pilot from flying.')
]);

/* Decision making and TEM */
dzAdd('Decision making and threat and error management (Skyway Code)',[
 F('PAVE before you go',
  [['P','Pilot','recency, fitness, I AM SAFE','var(--accent)'],['A','Aircraft','airworthiness, limits','var(--good)'],['V','EnVironment','weather, aerodrome, terrain','var(--mid)'],['E','External pressures','time, delays, passengers','var(--bad)']].map(function(r,i){var x=8+(i%2)*154,y=10+Math.floor(i/2)*92;return B(x,y,148,84,'var(--surface)',r[3],8,1.6)+T(x+24,y+40,r[0],'d3','middle',22,r[3])+T(x+44,y+30,r[1],'d1')+T(x+44,y+46,r[2].split(', ').slice(0,2).join(', '),'d2',null,7)+T(x+44,y+58,r[2].split(', ').slice(2).join(', '),'d2',null,7)}).join(''),
  'The decision to start the flight is often the most important one. Think about the combined effect of the risks.'),
 F('Threat and error management',
  B(8,30,90,120,'var(--surface)','var(--mid)',8)+T(53,50,'Threats','d1','middle')+['weather','traffic','short runway','fatigue'].map(function(t,i){return T(53,70+i*14,t,'d2','middle')}).join('')
  +A(100,90,116,90,'var(--ink)',1.4)+B(118,30,90,120,'var(--surface)','var(--bad)',8)+T(163,50,'Errors','d1','middle')+['handling','procedural','communication'].map(function(t,i){return T(163,70+i*14,t,'d2','middle')}).join('')
  +A(210,90,226,90,'var(--ink)',1.4)+B(228,30,86,120,'var(--surface)','var(--ink)',8)+T(271,50,'Undesired','d1','middle')+T(271,62,'aircraft state','d1','middle')+['attitude','configuration','location'].map(function(t,i){return T(271,82+i*14,t,'d2','middle')}).join('')
  +T(160,172,'Manage at each stage: plan, anticipate, prioritise,','d2','middle')+T(160,184,'remove distractions','d2','middle'),
  'TEM is defensive flying: spot the threats, trap the errors, and recover before an undesired state becomes an accident.')
]);

/* Aerodrome signals, markings and lighting */
dzAdd('Aerodrome signals, markings and lighting (Skyway Code)',[
 F('The signals square',
  '<rect x="0" y="0" width="320" height="200" fill="#2f6b3a" opacity=".85"/>'
  +[['<path d="M-14-12H14M0-12V14" stroke="#fff" stroke-width="5"/>','T: land towards','the cross arm'],['<path d="M-16 0H12M4-8L12 0L4 8" stroke="#f4d03f" stroke-width="5" fill="none"/>','Right-hand','circuit'],['<rect x="-14" y="-12" width="28" height="24" fill="#d22"/><path d="M-14-12L14 12" stroke="#f4d03f" stroke-width="4"/>','Special','precautions'],['<rect x="-14" y="-12" width="28" height="24" fill="#d22"/><path d="M-14-12L14 12M14-12L-14 12" stroke="#f4d03f" stroke-width="4"/>','Landing','prohibited'],['<circle cx="-11" r="7" fill="#fff"/><circle cx="11" r="7" fill="#fff"/><rect x="-11" y="-3" width="22" height="6" fill="#fff"/>','Paved surfaces','only'],['<circle cx="-11" r="7" fill="#fff"/><circle cx="11" r="7" fill="#fff"/><rect x="-11" y="-3" width="22" height="6" fill="#fff"/><path d="M-13-7v14M13-7v14" stroke="#111" stroke-width="2.4"/>','Runways only for','take-off, landing'],['<path d="M-6-14V14M6-14V14M-14-5H14M-14 5H14" stroke="#fff" stroke-width="3"/>','Gliding','in progress'],['<rect x="-14" y="-12" width="28" height="24" fill="#f4d03f"/><text y="7" text-anchor="middle" font-size="18" font-weight="700" fill="#111">C</text>','Report','here']].map(function(r,i){var x=40+(i%4)*80,y=40+Math.floor(i/4)*96;return'<g transform="translate('+x+' '+y+')">'+r[0]+'</g>'+T(x,y+32,r[1],'d2','middle',7.2,'#fff')+T(x,y+42,r[2],'d2','middle',7.2,'#fff')}).join(''),
  'Seen from the air in the signals square. With no signal, circuits are left-hand.'),
 F('Runway lights and PAPI',
  '<rect x="0" y="0" width="320" height="200" fill="#1a2233"/>'+'<path d="M120 190L150 20H170L200 190Z" fill="#2b3446"/>'
  +[0,1,2,3,4,5,6,7].map(function(i){var t=i/7,y=190-170*t,xl=120+30*t,xr=200-30*t;return'<circle cx="'+xl.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="2.4" fill="#fff"/><circle cx="'+xr.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="2.4" fill="#fff"/>'}).join('')
  +[0,1,2,3,4].map(function(i){return'<circle cx="'+(132+i*14)+'" cy="186" r="3" fill="#2fd05a"/><circle cx="'+(153+i*3.5)+'" cy="22" r="2.4" fill="#e0262b"/>'}).join('')
  +T(214,186,'green threshold','d2',null,7.4,'#cfe')+T(214,100,'white edge lights','d2',null,7.4,'#eee')+T(184,18,'red end','d2',null,7.4,'#fcc')
  +[['4 white: too high',4],['3 white 1 red',3],['2 and 2: on slope',2],['1 white 3 red',1],['4 red: too low',0]].map(function(r,i){var y=30+i*30;return[0,1,2,3].map(function(k){return'<circle cx="'+(14+k*11)+'" cy="'+y+'" r="4.4" fill="'+(k<r[1]?'#fff':'#e0262b')+'"/>'}).join('')+T(14,y+14,r[0],'d2',null,7,'#ddd')}).join(''),
  'Four-light PAPI shown, normally a 3° to 4° approach. A two-light APAPI shows one white and one red when on slope.'),
 F('Signs and stop bars',
  '<rect x="0" y="0" width="320" height="200" fill="#4a505c"/>'
  +[['#d22','#fff','27-09','Mandatory:','do not pass without'],['#f4d03f','#111','B →','Direction:','taxiway B to the right'],['#111','#f4d03f','A','Location:','you are on A']].map(function(r,i){var x=14+i*102;return'<rect x="'+x+'" y="20" width="90" height="34" rx="3" fill="'+r[0]+'" stroke="#222"/><text x="'+(x+45)+'" y="44" text-anchor="middle" font-family="var(--f-mono)" font-weight="700" font-size="17" fill="'+r[1]+'">'+r[2]+'</text>'+T(x+45,72,r[3],'d1','middle',8,'#fff')+T(x+45,84,r[4],'d2','middle',6.8,'#ddd')}).join('')
  +'<rect x="0" y="104" width="320" height="34" fill="#353a44"/>'+[0,1,2,3,4,5,6,7,8,9].map(function(i){return'<circle cx="'+(66+i*20)+'" cy="146" r="3.4" fill="#e0262b"/>'}).join('')+'<circle cx="46" cy="146" r="5" fill="#f4d03f"/><circle cx="274" cy="146" r="5" fill="#f4d03f" opacity=".4"/>'
  +T(160,124,'runway','d2','middle',null,'#ddd')+T(160,170,'Red stop bar: never cross it','d1','middle',null,'#fff')+T(160,182,'Flashing yellow guard lights mark the holding point','d2','middle',7.2,'#ddd'),
  'Red with white is mandatory. Yellow with black gives directions. Black with yellow tells you where you are.')
]);

/* Avoiding collisions */
dzAdd('Avoiding collisions (Skyway Code)',[
 F('Constant bearing means collision',
  [0,1,2,3].map(function(i){var ax=40+i*40,ay=170-i*10,bx=280-i*28,by=40+i*28;return'<g opacity="'+(.35+i*.2)+'">'+P(ax,ay,70,'var(--accent)',1)+P(bx,by,225,'var(--ink)',1)+L('M'+ax+' '+ay+'L'+bx+' '+by,'var(--bad)',.8,'3 3')+'</g>'}).join('')
  +'<circle cx="188" cy="128" r="10" fill="none" stroke="var(--bad)" stroke-width="2"/>'+T(196,150,'collision point','d2')
  +B(10,10,150,52,'var(--surface)','var(--bad)')+T(85,28,'Same spot on your','d1','middle')+T(85,40,'windscreen and getting','d1','middle')+T(85,52,'bigger? Act now','d1','middle',null,'var(--bad)'),
  'A threat that does not move across your windscreen is the one on a collision course. It hardly seems to move until late.'),
 F('Two ways to scan',
  '<path d="M20 150Q160 40 300 150" fill="none" stroke="var(--ink-2)" stroke-width="1"/>'+[0,1,2,3,4,5,6,7,8].map(function(i){var a=(-80+i*20)*Math.PI/180,x=160+Math.sin(a)*120,y=150-Math.cos(a)*90;return'<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="9" fill="var(--accent-soft)" stroke="var(--accent)"/>'+T(x.toFixed(0),(y+3).toFixed(0),i+1,'d2','middle',7)}).join('')
  +T(160,24,'Side to side: far left, step right in blocks of about 10°','d2','middle',7.4)+T(160,176,'Pause at least 1 second in each block, then check inside','d2','middle',7.4)+T(160,190,'Front to side: centre, left, back to centre, then right','d2','middle',7.4),
  'Your eyes only spot movement when they are still. Spend no more than 25% of your time looking inside.')
]);

/* Airspace infringements and FMCs */
dzAdd('Airspace infringements and FMCs (Skyway Code)',[
 F('Using a Frequency Monitoring Code',
  steps([['Select the frequency','check volume and reception'],['Set the FMC with ALT','(Mode C)'],['Listen','for your callsign or position'],['Stay within range','of the unit'],['Back to 7000','when you stop monitoring']],22,8,37,'var(--accent)')
  +B(232,40,82,100,'#15181d','#666',6)+'<text x="273" y="80" text-anchor="middle" font-family="var(--f-mono)" font-size="20" fill="#7cf29a">FMC</text>'+T(273,104,'ATC may warn','d2','middle',7.4,'#ddd')+T(273,116,'you, but it is','d2','middle',7.4,'#ddd')+T(273,128,'not guaranteed','d2','middle',7.4,'#ddd'),
  'An FMC shows ATC you are listening without having called. Each code has a published frequency and area.'),
 F('Where the base changes',
  ground(180)+'<path d="M0 60H120V100H200V130H320V20H0Z" fill="color-mix(in srgb,#2457c5 10%,transparent)" stroke="#2457c5" stroke-width="1.6" stroke-dasharray="6 3"/>'
  +T(60,80,'base FL55','d1','middle',null,'#2457c5')+T(160,120,'base 3,500 ft','d1','middle',null,'#2457c5')+T(260,150,'base 2,500 ft','d1','middle',null,'#2457c5')
  +L('M0 70H120M120 110H200M200 140H320','var(--good)',1.4,'4 3')+dzSide(80,150,.9,'var(--accent)')
  +T(160,194,'Below altitude bases use the QNH. Below a flight level, think in 1013.','d2','middle',7.2),
  'Bases can step down quickly and switch between altitudes and flight levels. Stay 200 ft below and 2 NM clear.')
]);

/* Crosswind component */
dzAdd('Crosswind component (Skyway Code)',[
 F('Splitting the wind',
  '<rect x="148" y="40" width="24" height="150" fill="#555c6b"/>'+T(160,186,'RWY','d2','middle',7,'#fff')+L('M160 50V180','#fff',1,'6 5')
  +A(258,6,166,64,'var(--accent)',2.6)+T(316,22,'20 kt, 60° off','d1','end',null,'var(--accent)')
  +A(166,6,166,58,'var(--good)',2)+T(150,24,'headwind','d2','end')+T(150,36,'20 × cos 60 = 10 kt','d1','end',null,'var(--good)')
  +A(258,64,174,64,'var(--bad)',2)+T(230,84,'crosswind','d2','middle')+T(230,96,'20 × sin 60 ≈ 17 kt','d1','middle',null,'var(--bad)')
  +L('M166 64m0-24a24 24 0 0 1 21 12','var(--ink)',1)+T(186,46,'60°','d2'),
  'Crosswind = wind speed × sin(angle). Headwind = wind speed × cos(angle). Past 90°, the headwind becomes a tailwind.'),
 F('Clock code rule of thumb',
  '<circle cx="96" cy="116" r="70" fill="var(--surface)" stroke="var(--ink-2)"/>'+[[30,'½'],[45,'about 0.7'],[60,'about 0.85'],[90,'all']].map(function(r,i){var a=r[0]*Math.PI/180,x=96+Math.sin(a)*70,y=116-Math.cos(a)*70;return L('M96 116L'+x.toFixed(0)+' '+y.toFixed(0),'var(--accent)',1.6)+'<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="4" fill="var(--accent)"/>'+T((x+8).toFixed(0),(y+4).toFixed(0),r[0]+'°','d1')}).join('')
  +L('M96 116V46','var(--ink)',2)+T(96,40,'runway heading','d2','middle')
  +B(210,40,104,120,'var(--surface)','var(--accent)')+T(262,58,'Crosswind share','d1','middle')+[['30°','half'],['45°','70%'],['60°','85%'],['90°','all of it']].map(function(r,i){return T(226,82+i*20,r[0],'d1')+T(256,82+i*20,r[1],'d2')}).join(''),
  'Quick mental maths: 30° off the runway gives half the wind as crosswind, 60° or more gives nearly all of it.')
]);
})();
