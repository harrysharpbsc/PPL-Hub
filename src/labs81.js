/* ===== Topic diagrams set 2 ===== */
(function(){
var F=dzF,T=dzT,A=dzA,B=dzB,L=dzL,P=dzP;
function sector(cx,cy,r,a0,a1,col,op){var p=function(a){var q=(a-90)*Math.PI/180;return[(cx+Math.cos(q)*r).toFixed(1),(cy+Math.sin(q)*r).toFixed(1)]},s=p(a0),e=p(a1);return'<path d="M'+cx+' '+cy+'L'+s[0]+' '+s[1]+'A'+r+' '+r+' 0 '+((a1-a0+360)%360>180?1:0)+' 1 '+e[0]+' '+e[1]+'Z" fill="'+col+'" opacity="'+(op||.35)+'"/>'}

/* Rules of the Air: extra diagrams */
dzAdd('Rules of the Air',[
 F('Overtaking: the 70° rule',
  sector(160,80,95,110,250,'var(--mid)',.3)+L('M160 80L'+(160+Math.sin(110*Math.PI/180)*95).toFixed(0)+' '+(80-Math.cos(110*Math.PI/180)*95).toFixed(0)+'M160 80L'+(160+Math.sin(250*Math.PI/180)*95).toFixed(0)+' '+(80-Math.cos(250*Math.PI/180)*95).toFixed(0),'var(--mid)',1.2,'4 3')
  +P(160,80,0,'var(--ink)',1.8)+P(160,160,0,'var(--accent)',1.5)+A(160,146,196,108,'var(--accent)',1.6)
  +T(204,170,'Overtaker:','d1')+T(204,182,'keep out of the way','d2')+T(204,193,'by turning right','d2')+T(60,60,'Being overtaken:','d1','middle')+T(60,72,'has right of way,','d2','middle')+T(60,83,'holds course and speed','d2','middle')
  +T(118,140,'70°','d1','middle',null,'var(--mid)')+T(202,140,'70°','d1','middle',null,'var(--mid)'),
  'Approaching from inside 70° either side of the other aircraft\'s tail counts as overtaking, climbing, level or descending.'),
 F('Who gives way when converging',
  [['Balloons','give way to nobody','var(--good)',300],['Sailplanes','give way to balloons','var(--good)',260],['Airships','give way to sailplanes and balloons','var(--mid)',220],['Aircraft towing','powered aircraft give way to them','var(--mid)',180],['Powered aircraft','give way to all of the above','var(--bad)',140]].map(function(r,i){var w=r[3],x=160-w/2,y=16+i*34;return'<path d="M'+x+' '+y+'h'+w+'l-6 28h-'+(w-12)+'Z" fill="'+r[2]+'" opacity="'+(.22+i*.05)+'" stroke="'+r[2]+'"/>'+T(160,y+13,r[0],'d1','middle')+T(160,y+24,r[1],'d2','middle',7.5)}).join('')
  +A(306,180,306,24,'var(--ink-2)',1.2)+T(300,192,'more priority','d2','end',7),
  'Less manoeuvrable aircraft have priority. Between two of the same kind, the one with the other on its right gives way.'),
 F('Navigation light sectors (seen from above)',
  sector(160,104,82,0,110,'#2fa84f',.4)+sector(160,104,82,250,360,'#e0262b',.4)+sector(160,104,82,110,250,'#cfcfcf',.55)
  +P(160,104,0,'var(--ink)',2.6)+'<circle cx="187" cy="94" r="3.6" fill="#2fa84f" stroke="var(--surface)"/><circle cx="133" cy="94" r="3.6" fill="#e0262b" stroke="var(--surface)"/><circle cx="160" cy="132" r="3.4" fill="#fff" stroke="var(--ink)"/>'
  +T(248,64,'Green, right wing','d1','middle')+T(248,76,'110° from dead ahead','d2','middle')+T(72,64,'Red, left wing','d1','middle')+T(72,76,'110° from dead ahead','d2','middle')+T(160,196,'White tail: 70° each side of dead astern','d1','middle')
  +T(274,150,'Red to green:','d1','middle',null,'var(--bad)')+T(274,161,'collision risk','d2','middle')+T(46,150,'Red to red:','d1','middle',null,'var(--good)')+T(46,161,'paths will not cross','d2','middle'),
  'Red left, green right, white behind. Seeing both red and green means the other aircraft is coming straight at you.'),
 F('Low flying minima (UK, day)',
  '<path d="M0 170H320V200H0Z" fill="var(--ch-l1)"/>'+'<path d="M10 170V150h12v20M28 170V140h10v30M44 170V156h16v14" fill="var(--ch-tn)" stroke="var(--ch-tnl)"/>'
  +'<g fill="var(--ch-tn)" stroke="var(--ch-tnl)"><path d="M180 170V146h14v24M200 170V132h10v38M214 170V150h20v20M240 170V138h12v32M258 170V152h18v18M282 170V128h8v42"/></g>'
  +dzSide(60,96,1.2,'var(--accent)')+'<circle cx="60" cy="96" r="58" fill="none" stroke="var(--accent)" stroke-dasharray="4 3"/>'+A(60,96,60,154,'var(--accent)',1)+T(66,132,'500 ft','d1')
  +T(60,22,'Anywhere:','d1','middle')+T(60,33,'500 ft from any person,','d2','middle',7.5)+T(60,43,'vehicle, vessel or structure','d2','middle',7.5)
  +dzSide(236,52,1.2,'var(--accent)')+L('M150 128H300','var(--bad)',1,'3 3')+A(240,62,240,126,'var(--bad)',1.2)+T(246,96,'1,000 ft','d1',null,null,'var(--bad)')+L('M168 186H306','var(--ink-2)',1)+T(236,196,'highest obstacle within 600 m','d2','middle',7.5)
  +T(236,20,'Congested area:','d1','middle')+T(236,31,'1,000 ft above the highest obstacle','d2','middle',7.5)+T(236,41,'and able to land clear','d2','middle',7.5),
  'Except for take-off and landing, keep 500 ft from people and things. Over towns and assemblies, 1,000 ft above the highest obstacle within 600 m.')
]);

/* Piston engine icing */
dzAdd('Piston engine icing (SS14)',[
 F('Where carburettor ice forms',
  '<path d="M60 20H130V60C112 70 112 100 130 110V180H60V110C78 100 78 70 60 60Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>'
  +A(95,8,95,40,'#5aa0d8',1.6)+T(102,18,'air in','d2')+'<path d="M95 86V112" stroke="var(--ink)" stroke-width="1.4"/><path d="M95 86l-6 6h12z" fill="var(--ink)"/>'+T(140,104,'fuel nozzle','d2')
  +'<path d="M70 132L120 124" stroke="var(--ink)" stroke-width="3"/><circle cx="95" cy="128" r="2.6" fill="var(--ink)"/>'+T(140,130,'throttle valve','d2')
  +'<g fill="#bfe3ff" stroke="#5aa0d8"><path d="M72 70q6 4 4 10t4 8l-4 2q-8-8-4-20Z"/><path d="M118 70q-6 4-4 10t-4 8l4 2q8-8 4-20Z"/><path d="M70 126q6-6 10-3l-2 5q-4 0-8-2Z"/><path d="M120 120q-6-2-9 2l3 4q3-2 6-6Z"/></g>'
  +T(140,72,'ice in the venturi','d1',null,null,'#3a86c5')+T(140,82,'up to 35°C colder','d2')+A(95,180,95,196,'var(--ink-2)',1.4)+T(102,194,'to engine','d2')
  +B(204,140,112,46,'var(--surface-2)','var(--ink-2)')+T(260,158,'Carb heat:','d1','middle')+T(260,170,'warm air from the','d2','middle',7.2)+T(260,180,'exhaust heat exchanger','d2','middle',7.2),
  'Fuel evaporating in the venturi chills the air by up to 35°C, so water vapour freezes on the venturi and throttle valve.'),
 F('When to expect carb ice',
  L('M40 170H300M40 170V20','var(--ink)',1.2)+T(170,192,'Air temperature °C','d2','middle')+'<g transform="translate(14 95) rotate(-90)">'+T(0,0,'Relative humidity','d2','middle')+'</g>'
  +[-10,0,10,20,30].map(function(t,i){var x=40+i*65;return L('M'+x+' 170v4','var(--ink)',1)+T(x,183,t,'d2','middle')}).join('')
  +'<path d="M105 30H170V170H105Z" fill="var(--bad)" opacity=".26"/>'+'<path d="M70 70Q160 40 280 80V170H70Z" fill="var(--mid)" opacity=".2"/>'
  +T(137,46,'Worst band','d1','middle',null,'var(--bad)')+T(137,58,'0 to 10°C,','d2','middle')+T(137,69,'high humidity','d2','middle')
  +'<circle cx="248" cy="132" r="4" fill="var(--bad)"/>'+T(244,118,'Serious ice seen at','d2','end',7.2)+T(244,128,'descent power: 25°C,','d2','end',7.2)+T(244,138,'30% humidity','d2','end',7.2)
  +T(296,30,'Highest risk at','d1','end')+T(296,41,'low (descent) power','d2','end'),
  'Schematic only, not the CAA chart. Carb ice is a warm-weather risk too. Temperature and dew point close together, rain, fog or low cloud all point to high humidity.'),
 F('The carb heat check',
  L('M30 160H300M30 160V20','var(--ink)',1.1)+T(165,192,'time','d2','middle')+'<g transform="translate(16 92) rotate(-90)">'+T(0,0,'RPM','d2','middle')+'</g>'
  +L('M30 60H90L96 96H170L176 50H300','var(--accent)',2.4)+L('M90 60H300','var(--ink-2)',1,'4 3')
  +A(120,62,120,94,'var(--bad)',1.2)+T(126,82,'normal drop 75 to 100 RPM','d2')+T(126,108,'heat on for at least 15 s','d2')
  +T(184,26,'RPM rises above the','d1',null,null,'var(--good)')+T(184,37,'earlier figure: ice was there','d2')+T(32,56,'heat cold','d2')+T(214,140,'repeat until no rise','d2'),
  'With heat on, power drops a little. If RPM comes back higher than before when heat goes off, there was ice: repeat until clear.')
]);

/* Winter weather and icing */
dzAdd('Winter weather and icing (SS03)',[
 F('How radiation fog forms',
  '<path d="M0 150H320V200H0Z" fill="var(--ch-l1)"/>'+'<circle cx="40" cy="30" r="10" fill="#d9d9d9"/>'+[60,110,170,230,280].map(function(x,i){return'<path d="M'+x+' '+(18+i%2*10)+'l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#f2d16b"/>'}).join('')
  +A(160,60,160,130,'var(--accent)',1.2,'3 3')+T(166,96,'heat radiates away','d2')+T(166,107,'on a clear night','d2')
  +'<path d="M0 150C40 130 80 138 120 132S220 128 320 136V150H0Z" fill="#cfd6dc" opacity=".85"/>'+T(60,145,'fog','d1')
  +B(208,14,104,60,'var(--surface)','var(--ink-2)')+T(260,30,'Needs','d1','middle')+T(260,42,'clear sky','d2','middle')+T(260,53,'light wind','d2','middle')+T(260,64,'moist air','d2','middle')
  +L('M20 186H140','var(--bad)',1.6)+L('M20 196C60 192 100 188 140 186','#5aa0d8',1.6)+T(146,186,'temperature','d2',null,7.5)+T(146,197,'dew point: they meet','d2',null,7.5),
  'Fog forms when the ground cools under clear skies and the air cools to its dew point. It clears slowly the next morning.'),
 F('A depression passing over you',
  '<path d="M0 166H320V200H0Z" fill="var(--ch-l1)"/>'
  +'<path d="M70 166L40 60" stroke="#2457c5" stroke-width="2.2"/>'+[[64,145],[55,112],[47,84]].map(function(p){return'<path d="M'+p[0]+' '+p[1]+'l8 3-6 6z" fill="#2457c5"/>'}).join('')
  +'<path d="M200 166L310 52" stroke="#d33" stroke-width="2.2"/>'+[[222,143],[250,114],[278,85]].map(function(p){return'<path d="M'+p[0]+' '+p[1]+'a6 6 0 0 1 9 -2" fill="#d33"/>'}).join('')
  +'<path d="M40 166V96Q44 50 66 56Q92 46 98 82Q104 120 96 166Z" fill="#8f9aa8" opacity=".75"/>'+T(70,100,'Cb','d1','middle',null,'#fff')
  +'<path d="M206 158L300 64H316V80L220 166Z" fill="#b7c0ca" opacity=".7"/><path d="M250 112L316 44V36L240 114Z" fill="#d7dde3" opacity=".8"/>'+T(276,128,'Ns','d1','middle')+T(298,60,'As','d2','middle')
  +[214,224,234,244].map(function(x){return L('M'+x+' 150l-5 14','#5aa0d8',1.2)}).join('')+[56,66,76,86].map(function(x){return L('M'+x+' 140l-5 18','#5aa0d8',1.6)}).join('')
  +T(150,120,'warm sector','d2','middle')+T(150,132,'low cloud, drizzle','d2','middle',7.4)
  +T(250,24,'Warm front: comes first','d1','middle',null,'#d33')+T(250,36,'cloud lowers, rain, falling pressure','d2','middle',7.2)+T(70,24,'Cold front: second','d1','middle',null,'#2457c5')+T(70,36,'showers, gusts, then clearer','d2','middle',7.2)
  +A(110,186,230,186,'var(--ink-2)',1.2)+T(170,197,'the system moves this way','d2','middle',7.2),
  'You meet the warm front first: lowering cloud and rain. Then the warm sector, then the cold front with showers and gusts, often followed by good flying in clear air.'),
 F('Frost on the wing',
  '<path d="M30 110C60 70 170 60 290 104L292 108L290 112C200 126 80 134 30 110Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>'
  +'<path d="M40 96C80 72 170 66 270 96" stroke="#bfe3ff" stroke-width="6" fill="none" stroke-dasharray="2 2"/>'
  +B(50,146,100,22,'var(--surface)','var(--bad)')+'<rect x="50" y="146" width="30" height="22" fill="var(--bad)" opacity=".3"/>'+T(100,161,'lift -30%','d1','middle',null,'var(--bad)')
  +B(170,146,100,22,'var(--surface)','var(--bad)')+'<rect x="170" y="146" width="40" height="22" fill="var(--bad)" opacity=".3"/>'+T(220,161,'drag +40%','d1','middle',null,'var(--bad)')
  +T(160,138,'Even light frost can cost up to:','d1','middle')+T(160,186,'Remove all frost, ice and snow before flight. Use Type I fluid.','d2','middle',7.5),
  'A thin layer of frost roughens the upper surface. Brush it off without scratching, or use Type I fluid.'),
 F('Airframe ice: where and when',
  L('M60 20V180','var(--ink)',1)+[[30,'+5°C'],[60,'0°C'],[100,'-5°C'],[140,'-10°C'],[175,'-15°C']].map(function(r){return L('M56 '+r[0]+'h8','var(--ink)',1)+T(50,r[0]+3,r[1],'d2','end')}).join('')
  +'<rect x="64" y="60" width="240" height="80" fill="#5aa0d8" opacity=".18"/>'+T(184,74,'Most airframe ice: 0 to -10°C','d1','middle')
  +'<path d="M90 100h70v30h-70z" fill="#bfe3ff" stroke="#5aa0d8"/>'+T(125,112,'Clear ice','d1','middle')+T(125,124,'large drops','d2','middle',7.5)
  +'<path d="M190 100h80v30h-80z" fill="#eef4f8" stroke="#9aa6b3"/>'+T(230,112,'Rime ice','d1','middle')+T(230,124,'milky, stable cloud','d2','middle',7.5)
  +T(184,160,'Freezing rain: can be extremely severe','d1','middle',null,'var(--bad)')+T(184,172,'Needs visible moisture at or below 0°C','d2','middle'),
  'Ice needs visible moisture and temperatures at or below 0°C. Clear ice builds fast in towering cloud, rime in stable cloud.')
]);

/* Weight, balance and performance */
dzAdd('Weight, balance and performance (SS09)',[
 F('Datum, arm and moment',
  dzSide(170,70,3.6,'var(--accent-soft)')+L('M30 112H310','var(--ink)',1)+L('M30 30V118','var(--bad)',1.6,'4 3')+T(34,28,'datum','d1',null,null,'var(--bad)')
  +[[2.05,'Front seats','160 kg'],[2.22,'Empty aircraft','700 kg'],[2.41,'Fuel','100 kg'],[2.98,'Rear seats','70 kg'],[3.63,'Baggage','15 kg']].map(function(r,i){var x=30+(r[0]-1.5)*125,ly=132+(i%3)*22;return'<circle cx="'+x.toFixed(0)+'" cy="112" r="3.4" fill="var(--accent)"/>'+L('M'+x.toFixed(0)+' 112V'+(ly-8),'var(--accent)',.9)+T((i===4?x+10:x).toFixed(0),ly,r[1]+', '+r[2],'d1',i===4?'end':'middle',7.4)+T((i===4?x+10:x).toFixed(0),ly+9,'arm '+r[0]+' m','d2',i===4?'end':'middle',6.8)}).join('')
  +B(232,14,82,36,'var(--surface)','var(--accent)')+T(273,29,'Moment =','d2','middle')+T(273,42,'weight × arm','d1','middle'),
  'Each item sits at an arm measured from the datum. Moments add up, and CG = total moment ÷ total weight. This is the worked example from the leaflet.'),
 F('Worked CG check',
  L('M50 170H300M50 170V20','var(--ink)',1)+[2.1,2.2,2.3,2.4,2.5].map(function(c,i){var x=60+i*55;return L('M'+x+' 170v4','var(--ink)',1)+T(x,183,c+' m','d2','middle')}).join('')+[800,900,1000,1100].map(function(w,i){var y=150-i*38;return L('M46 '+y+'h4','var(--ink)',1)+T(42,y+3,w,'d2','end')}).join('')
  +'<path d="M86 150L80 74L160 36H240L262 150Z" fill="var(--good)" opacity=".16" stroke="var(--good)" stroke-width="1.4"/>'+T(212,142,'example envelope','d2','middle',7)
  +'<circle cx="159" cy="67" r="5" fill="var(--accent)" stroke="var(--surface)" stroke-width="1.5"/>'+L('M159 67V170M50 67H159','var(--accent)',.8,'3 3')+T(166,64,'1,045 kg at 2.28 m: inside','d1')
  +B(176,98,128,46,'var(--surface)','var(--ink-2)')+T(240,114,'2,386.05 ÷ 1,045','d2','middle')+T(240,128,'= 2.28 m aft of datum','d1','middle')+T(175,196,'CG (m aft of datum)','d2','middle'),
  'Plot weight against CG and make sure the point sits inside your own aircraft\'s envelope, for take-off and for landing.'),
 F('Declared distances',
  '<path d="M0 150H320V200H0Z" fill="var(--ch-l1)"/><rect x="40" y="128" width="190" height="20" fill="#555c6b"/><rect x="230" y="128" width="30" height="20" fill="#7a8190"/><rect x="260" y="122" width="50" height="32" fill="var(--ch-l2)" opacity=".7"/>'
  +T(245,141,'stop','d2','middle',7,'#fff')+T(285,170,'clearway','d2','middle',7)
  +[[40,230,'TORA',106,'var(--accent)'],[40,310,'TODA',88,'var(--good)'],[40,260,'ASDA',70,'var(--mid)'],[40,230,'LDA',52,'var(--warm)']].map(function(r){return A(r[0],r[3],r[1],r[3],r[4],1.4)+L('M'+r[0]+' '+(r[3]-5)+'v10',r[4],1.4)+T(r[0]+6,r[3]-4,r[2],'d1',null,null,r[4])}).join('')
  +T(160,24,'TODA = TORA + clearway','d2','middle')+T(160,36,'ASDA = TORA + stopway','d2','middle'),
  'Take-off run, take-off distance, accelerate-stop distance and landing distance available. Unlicensed strips may only quote total length.'),
 F('Rule-of-thumb take-off factors',
  [['+10% weight',1.2],['+1,000 ft elevation',1.1],['+10°C',1.1],['Tailwind 10% of lift-off speed',1.2],['2% uphill',1.1],['Dry grass',1.2],['Wet grass',1.3],['Soft ground or snow',1.25],['General factor (last)',1.33]].map(function(r,i){var y=18+i*19,w=(r[1]-1)*400;return T(132,y+10,r[0],'d2','end',7.6)+'<rect x="138" y="'+y+'" width="'+w.toFixed(0)+'" height="13" rx="2" fill="'+(i===8?'var(--bad)':i>4?'var(--mid)':'var(--accent)')+'" opacity=".75"/>'+T(144+w,y+10,'×'+r[1],'d1')}).join('')
  +T(160,196,'Multiply all the factors that apply together','d2','middle'),
  'Each condition stretches the take-off distance. Multiply the factors together, then apply the general safety factor.')
]);

/* Pilot health and performance */
dzAdd('Pilot health and performance (SS24)',[
 F('I AM SAFE',
  [['I','Illness'],['A','Attitude'],['M','Medication'],['S','Stress'],['A','Alcohol'],['F','Fatigue'],['E','Eating']].map(function(r,i){var a=i/7*Math.PI*2-Math.PI/2,x=160+Math.cos(a)*72,y=100+Math.sin(a)*72;return'<circle cx="'+x.toFixed(0)+'" cy="'+y.toFixed(0)+'" r="21" fill="var(--accent-soft)" stroke="var(--accent)"/>'+T(x.toFixed(0),(y+2).toFixed(0),r[0],'d3','middle',null,'var(--accent)')+T(x.toFixed(0),(y+12).toFixed(0),r[1],'d2','middle',6.6)}).join('')
  +T(160,96,'Check','d1','middle')+T(160,108,'yourself','d1','middle'),
  'Run it before every flight, like a weather or NOTAM check. 8 hours sleep, no alcohol for 8 hours (24 after a lot), and eat.'),
 F('Altitude and your body',
  L('M70 190V14','var(--ink)',1.2)+[[0,'0'],[2000,'2,000'],[4000,'4,000'],[6000,'6,000'],[8000,'8,000'],[10000,'10,000'],[12000,'12,000 ft']].map(function(r){var y=186-r[0]/12000*170;return L('M66 '+y.toFixed(0)+'h8','var(--ink)',1)+T(62,(y+3).toFixed(0),r[1],'d2','end',7.2)}).join('')
  +'<rect x="74" y="16" width="236" height="44" fill="var(--bad)" opacity=".15"/>'+T(82,32,'Above 10,000 ft: confusion, clumsiness, drowsiness','d2',null,7.6)+T(82,44,'Use supplementary oxygen (NCO.OP.190)','d1',null,7.6)+T(82,55,'If hypoxia is suspected, descend','d2',null,7.6)
  +'<rect x="74" y="60" width="236" height="29" fill="var(--mid)" opacity=".16"/>'+T(82,78,'Above 8,000 ft: contrast sensitivity falls','d2',null,7.6)
  +T(82,120,'Trapped gas expands as you climb:','d1',null,7.6)+T(82,132,'ears, sinuses, gut. Do not fly with a cold','d2',null,7.6)+T(82,160,'Carbon monoxide mimics hypoxia','d1',null,7.6)+T(82,172,'(cabin heater, exhaust)','d2',null,7.6),
  'Stay below 10,000 ft without oxygen. Above 8,000 ft vision in low light suffers first.'),
 F('Alcohol before flying',
  L('M30 150H300','var(--ink)',1.2)+[0,4,8,12,16,20,24].map(function(h,i){var x=30+h*11.25;return L('M'+x+' 150v5','var(--ink)',1)+T(x,166,h+'h','d2','middle')}).join('')
  +'<rect x="30" y="100" width="90" height="40" fill="var(--bad)" opacity=".3"/>'+T(75,118,'No flying','d1','middle',null,'var(--bad)')+T(75,130,'within 8 hours','d2','middle')
  +'<rect x="120" y="100" width="180" height="40" fill="var(--mid)" opacity=".2"/>'+T(210,118,'After a lot: up to 24 hours','d1','middle')+T(210,130,'can still test positive','d2','middle')
  +B(60,30,200,40,'var(--surface)','var(--accent)')+T(160,46,'UK flying limit','d2','middle')+T(160,61,'20 mg per 100 ml of blood','d1','middle')+T(165,186,'hours since your last drink','d2','middle'),
  'The legal limit is stricter than for driving. Allow at least 8 hours, and much longer after heavy drinking.')
]);

/* Stalls, spins and loss of control */
dzAdd('Stalls, spins and loss of control (SS30)',[
 F('Lift and angle of attack',
  L('M40 170H300M40 170V20','var(--ink)',1.2)+T(170,192,'Angle of attack','d2','middle')+'<g transform="translate(16 95) rotate(-90)">'+T(0,0,'Lift coefficient','d2','middle')+'</g>'
  +L('M40 160L200 46Q220 36 232 52Q250 80 290 120','var(--accent)',2.4)+L('M226 40V170','var(--bad)',1,'4 3')+T(222,22,'critical angle','d1','end',null,'var(--bad)')+T(222,33,'typically about 15°','d2','end',7.4)
  +T(110,96,'more angle, more lift','d2','middle')+T(268,96,'stalled:','d1','middle')+T(268,108,'lift falls away','d2','middle')
  +'<g transform="translate(150 148) rotate(-10)"><path d="M-30 0C-20-10 20-10 34-2L36 0L34 2C10 6-20 6-30 0Z" fill="var(--surface)" stroke="var(--ink)"/></g>'+A(96,150,116,150,'#5aa0d8',1.2),
  'A wing stalls at its critical angle of attack, whatever the speed or attitude. Speed only matters because it changes the angle needed.'),
 F('Stall speed in a level turn',
  L('M40 170H300M40 170V20','var(--ink)',1.2)+[0,15,30,45,60,75].map(function(b){var x=40+b*3.4;return L('M'+x+' 170v4','var(--ink)',1)+T(x,183,b+'°','d2','middle')}).join('')
  +[50,60,70,80,90,100].map(function(k){var y=170-(k-45)*2.6;return L('M36 '+y.toFixed(0)+'h4','var(--ink)',1)+T(32,(y+3).toFixed(0),k,'d2','end')}).join('')
  +'<path d="'+(function(){var d='';for(var b=0;b<=75;b+=3){var v=50*Math.sqrt(1/Math.cos(b*Math.PI/180)),x=40+b*3.4,y=170-(v-45)*2.6;d+=(b?'L':'M')+x.toFixed(1)+' '+Math.max(20,y).toFixed(1)}return d})()+'" stroke="var(--bad)" stroke-width="2.4" fill="none"/>'
  +'<circle cx="244" cy="'+(170-(70.7-45)*2.6).toFixed(0)+'" r="4" fill="var(--bad)"/>'+L('M244 '+(170-(70.7-45)*2.6).toFixed(0)+'V170','var(--bad)',.8,'3 3')+T(236,96,'60° bank = 2 g','d1','end')+T(236,108,'50 kt becomes about 70 kt','d2','end')+T(170,196,'Bank angle','d2','middle'),
  'Stall speed rises with the square root of load factor. At 60° of bank you pull 2 g and stall about 1.4 times faster.'),
 F('Stall recovery, in order',
  [['1','Control column centrally forward','reduce the angle of attack'],['2','Level the wings with aileron','only once AoA is reduced'],['3','Full power if available','and counter any pitch-up'],['4','Accelerate, retract flap','and gear as needed'],['5','Balance with rudder','']].map(function(r,i){var y=14+i*36;return'<circle cx="34" cy="'+(y+14)+'" r="13" fill="var(--accent)"/>'+T(34,y+19,r[0],'d3','middle',null,'#fff')+T(56,y+12,r[1],'d1')+T(56,y+24,r[2],'d2')+(i<4?A(34,y+28,34,y+36,'var(--ink-2)',1):'')}).join('')
  +B(226,40,86,100,'var(--surface)','var(--bad)')+T(269,60,'Always follow','d1','middle')+T(269,72,'your AFM','d1','middle')+T(269,96,'Act at the first','d2','middle')+T(269,108,'warning and you','d2','middle')+T(269,120,'lose little height','d2','middle'),
  'Unload first. Rolling with aileron while the wing is still stalled can drop a wing further or start a spin.')
]);
})();
