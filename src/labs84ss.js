/* ===== Safety Sense leaflet topics, diagrams in style B (library: labs80b.js; how-to: .claude/skills/ppl-diagram)
   SS14, SS03, SS09, SS24, SS30, SS33, SS22, SS05. Each entry: [title, width, height, drawing, caption].
   The UK VMC minima figure is also used by the Skyway Code topic in labs85sky.js (it reads it back from DSEC). */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
function box(x,y,w,h,fill,stroke,sw){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+(fill||'none')+'" stroke="'+(stroke||'var(--line-2)')+'" stroke-width="'+(sw||1.2)+'"/>'}
function cloudB(x,y,w,h){return'<path d="M'+x+' '+(y+h)+'q-'+n(h*.6)+' 0 -'+n(h*.4)+' -'+n(h*.5)+'q0 -'+n(h*.6)+' '+n(h*.6)+' -'+n(h*.5)+'q'+n(w*.15)+' -'+n(h*.7)+' '+n(w*.4)+' -'+n(h*.3)+'q'+n(w*.3)+' -'+n(h*.4)+' '+n(w*.45)+' '+n(h*.25)+'q'+n(h*.6)+' '+n(h*.1)+' '+n(h*.4)+' '+n(h*.55)+'q0 '+n(h*.5)+' -'+n(h*.5)+' '+n(h*.5)+'Z" fill="var(--surface-2)" stroke="var(--ink-3)" stroke-width=".9"/>'}
function axes(x0,y0,x1,y1){return L('M'+x0+' '+y0+'H'+x1+'M'+x0+' '+y0+'V'+y1,'sk',1.2)}
function vlab(x,y,s){return'<g transform="translate('+x+' '+y+') rotate(-90)">'+T(0,0,s,'t2','middle')+'</g>'}
function S(t,list){DSEC[t]=list.map(function(f){return[f[5],dbFig(f[0],f[1],f[2],f[3],f[4])]})}

/* ---- Piston engine icing (SS14) ---- */
S('Piston engine icing (SS14)',[
 ['Where carburettor ice forms',320,206,
  '<path d="M60 22H130V62C112 72 112 102 130 112V182H60V112C78 102 78 72 60 62Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>'
  +AR('M95 6V40',95,32,95,42,'a',1.6)+T(104,18,'air in','t2 ta')+'<path d="M95 88V114" class="sk" stroke-width="1.4"/><path d="M95 88l-6 6h12z" class="fk"/>'+T(140,108,'fuel nozzle','t2')
  +'<path d="M70 134L120 126" class="sk" stroke-width="3"/><circle cx="95" cy="130" r="2.6" class="fk"/>'+T(140,134,'throttle valve','t2')
  +'<g fill="var(--accent-soft)" stroke="var(--accent)"><path d="M72 72q6 4 4 10t4 8l-4 2q-8-8-4-20Z"/><path d="M118 72q-6 4-4 10t-4 8l4 2q8-8 4-20Z"/><path d="M70 128q6-6 10-3l-2 5q-4 0-8-2Z"/><path d="M120 122q-6-2-9 2l3 4q3-2 6-6Z"/></g>'
  +T(140,70,'ice in the venturi','t1 ta')+T(140,84,'up to 35°C colder','t2')+AR('M95 182V198',95,192,95,200,'k',1.4)+T(104,198,'to engine','t2')
  +box(196,148,116,52,'var(--surface-2)')+T(206,166,'Carb heat','t1')+T(206,180,'hot air from round','t2')+T(206,194,'the exhaust','t2'),
  'Fuel evaporating in the venturi chills the air by up to 35°C, so water vapour freezes on the venturi and throttle valve. Carb heat draws hot air from a heat exchanger round the exhaust.','Three types'],
 ['When to expect carb ice',320,206,
  axes(44,170,304,20)+T(174,200,'air temperature °C','t2','middle')+vlab(18,95,'relative humidity')
  +[-10,0,10,20,30].map(function(t,i){var x=44+i*65;return L('M'+x+' 170v4','sk',1)+T(x,186,t,'t2','middle')}).join('')
  +'<path d="M109 30H174V170H109Z" class="fr" opacity=".2"/><path d="M74 70Q164 40 284 80V170H74Z" class="fm" opacity=".18"/>'
  +T(141,48,'Worst band','t1 tr','middle')+T(141,62,'0 to 10°C,','t2','middle')+T(141,76,'high humidity','t2','middle')
  +'<circle cx="252" cy="140" r="4" class="fr"/>'+T(244,112,'serious ice at','t2','end')+T(244,126,'descent power:','t2','end')+T(244,140,'25°C, 30% RH','t2','end')
  +T(302,30,'Highest risk at','t1','end')+T(302,44,'low power','t2','end'),
  'Schematic only, not the CAA chart. Carb ice is a warm-weather risk too, and worst at low (descent) power. Temperature and dew point close together, rain, fog or low cloud all point to high humidity.','When it happens'],
 ['The carb heat check',320,200,
  axes(32,160,304,20)+T(168,186,'time','t2','middle')+vlab(18,92,'RPM')
  +L('M32 60H90L96 96H170L176 48H304','sa',2.4)+L('M90 60H304','s2',1,'4 3')
  +AR('M120 62V94',120,86,120,96,'r',1.2)+T(128,82,'normal drop 75–100 RPM','t2')+T(128,112,'heat on, at least 15 s','t2')
  +T(184,24,'RPM rises above the','t1 tg')+T(184,38,'start: there was ice','t2')+T(36,52,'cold','t2')+T(214,144,'repeat until no rise','t2'),
  'With carb heat on, power drops a little. If the RPM comes back higher than before when heat goes off, there was ice: repeat until there is no rise.','Using carb heat']
]);

/* ---- Winter weather and icing (SS03) ---- */
S('Winter weather and icing (SS03)',[
 ['How radiation fog forms',320,210,
  '<path d="M0 152H320V200H0Z" class="gnd"/><circle cx="40" cy="30" r="10" fill="var(--ink-3)" opacity=".5"/>'+[60,110,170].map(function(x,i){return'<path d="M'+x+' '+(18+i%2*10)+'l2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" class="fm"/>'}).join('')
  +AR('M150 60V128',150,120,150,132,'a',1.2,'3 3')+T(158,96,'heat radiates','t2 ta')+T(158,110,'away','t2 ta')
  +'<path d="M0 152C40 132 80 140 120 134S220 130 320 138V152H0Z" fill="var(--ink-3)" opacity=".35"/>'+T(56,148,'fog','t1')
  +box(206,10,106,72,'var(--surface)')+T(216,28,'Needs','t1')+T(216,44,'clear sky','t2')+T(216,58,'light wind','t2')+T(216,72,'moist air','t2')
  +L('M16 178H140','sr',1.8)+L('M16 194C60 190 100 184 140 180','sa',1.8)+T(148,182,'temperature falls','t2 tr')+T(148,198,'to the dew point','t2 ta'),
  'On a clear night with light wind the ground loses heat, the air next to it cools to its dew point, and fog forms. It clears slowly the next morning.','Radiation fog'],
 ['A depression passing over you',320,214,
  '<path d="M0 170H320V204H0Z" class="gnd"/>'
  +'<path d="M70 170L40 66" class="sa" stroke-width="2.2"/>'+[[64,149],[55,116],[47,88]].map(function(p){return'<path d="M'+p[0]+' '+p[1]+'l8 3-6 6z" class="fa"/>'}).join('')
  +'<path d="M200 170L306 62" class="sr" stroke-width="2.2"/>'+[[222,147],[250,118],[278,90]].map(function(p){return'<path d="M'+p[0]+' '+p[1]+'a6 6 0 0 1 9 -2" class="fr"/>'}).join('')
  +'<path d="M40 170V100Q44 54 66 60Q92 50 98 86Q104 124 96 170Z" fill="var(--ink-3)" opacity=".55"/>'+T(70,112,'Cb','t1','middle')
  +'<path d="M206 162L298 70H312V86L220 170Z" fill="var(--ink-3)" opacity=".35"/>'+T(272,136,'Ns','t1','middle')
  +[214,224,234,244].map(function(x){return L('M'+x+' 154l-5 14','sa',1.2)}).join('')+[56,66,76,86].map(function(x){return L('M'+x+' 144l-5 18','sa',1.6)}).join('')
  +T(150,122,'warm sector','t2','middle')+T(150,136,'low cloud, drizzle','t2','middle')
  +T(312,24,'Warm front: first','t1 tr','end')+T(312,38,'cloud lowers, rain','t2','end')+T(8,24,'Cold front: second','t1 ta')+T(8,38,'showers, gusts','t2')
  +AR('M110 190H230',220,190,232,190,'k',1.2)+T(170,208,'moving this way','t2','middle'),
  'You meet the warm front first: lowering cloud, rain and falling pressure. Then the warm sector, then the cold front with showers and gusts, often followed by good flying in clear air.','Fronts and depressions'],
 ['Frost on the wing',320,196,
  '<path d="M30 92C60 52 170 42 290 86L292 90L290 94C200 108 80 116 30 92Z" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>'
  +'<path d="M40 78C80 54 170 48 270 78" class="sa" stroke-width="6" fill="none" stroke-dasharray="2 2" opacity=".6"/>'+T(160,40,'rough frost on top','t2 ta','middle')
  +T(8,134,'Even light frost can cost up to','t1')
  +T(8,162,'lift','t1')+'<rect x="60" y="150" width="200" height="16" rx="3" fill="none" stroke="var(--ink-3)"/><rect x="60" y="150" width="140" height="16" rx="3" class="fa" opacity=".55"/><rect x="200" y="150" width="60" height="16" class="fr" opacity=".28"/>'+T(268,163,'−30%','t1 tr')
  +T(8,188,'drag','t1')+'<rect x="60" y="176" width="200" height="16" rx="3" class="fk" opacity=".22"/><rect x="190" y="176" width="70" height="16" class="fr" opacity=".55"/>'+L('M190 174V194','sk',1.2)+T(268,189,'+40%','t1 tr'),
  'A thin layer of frost roughens the upper surface: up to 30% less lift and 40% more drag. Remove all frost, ice and snow before flight: brush it off without scratching, or use Type I fluid.','Frost, snow'],
 ['Airframe ice: where and when',320,196,
  L('M64 20V180','sk',1)+[[30,'+5°C'],[60,'0°C'],[100,'−5°C'],[140,'−10°C'],[175,'−15°C']].map(function(r){return L('M60 '+r[0]+'h8','sk',1)+T(54,r[0]+4,r[1],'t2','end')}).join('')
  +'<rect x="68" y="60" width="244" height="80" class="fa" opacity=".12"/>'+T(190,78,'Most airframe ice: 0 to −10°C','t1','middle')
  +'<path d="M84 96h84v34h-84z" fill="var(--accent-soft)" stroke="var(--accent)"/>'+T(126,111,'Clear ice','t1','middle')+T(126,125,'large drops','t2','middle')
  +'<path d="M186 96h112v34h-112z" fill="var(--surface)" stroke="var(--ink-3)"/>'+T(242,111,'Rime ice','t1','middle')+T(242,125,'milky, stable cloud','t2','middle')
  +T(190,160,'Freezing rain: extremely severe','t1 tr','middle')+T(190,176,'needs visible moisture at 0°C or below','t2','middle'),
  'Ice needs visible moisture and temperatures at or below 0°C. Clear ice builds fast from large drops in towering cloud, rime from small drops in stable cloud. Freezing rain can be extremely severe.','Carb ice and airframe ice']
]);

/* ---- Weight, balance and performance (SS09) ---- */
var ITEMS=[[2.05,'Front seats','160 kg'],[2.22,'Empty aircraft','700 kg'],[2.41,'Fuel','100 kg'],[2.98,'Rear seats','70 kg'],[3.63,'Baggage','15 kg']];
S('Weight, balance and performance (SS09)',[
 ['Datum, arm and moment',320,224,
  side(176,66,3.4,'a',true).replace('class="fa"','fill="var(--accent-soft)"')+L('M28 104H312','sk',1.2)+L('M28 24V110','sr',1.6,'4 3')+T(34,24,'datum','t1 tr')
  +ITEMS.map(function(r,i){var x=n(28+(r[0]-1.5)*125);return'<circle cx="'+x+'" cy="104" r="8" class="fa"/><text x="'+x+'" y="108" text-anchor="middle" style="font:700 11px var(--f-body);fill:var(--surface)">'+(i+1)+'</text>'}).join('')
  +ITEMS.map(function(r,i){var y=134+i*17;return T(16,y,(i+1)+'. '+r[1],'t2')+T(200,y,r[2]+' × '+r[0].toFixed(2)+' m','t2','end')}).join('')
  +box(224,128,88,46,'var(--surface)','var(--accent)')+T(268,146,'Moment =','t2','middle')+T(268,162,'weight × arm','t1','middle'),
  'Each item sits at an arm measured from the datum. Moments add up, and CG = total moment ÷ total weight. This is the worked example from the leaflet.','Balance and the centre'],
 ['Worked CG check',320,214,
  axes(54,170,304,20)+[2.1,2.2,2.3,2.4,2.5].map(function(c,i){var x=64+i*55;return L('M'+x+' 170v4','sk',1)+T(x,186,c+' m','t2','middle')}).join('')+[800,900,1000,1100].map(function(w,i){var y=150-i*38;return L('M50 '+y+'h4','sk',1)+T(46,y+4,w.toLocaleString('en-GB'),'t2','end')}).join('')
  +'<path d="M90 150L84 74L164 36H244L266 150Z" class="fg" opacity=".16"/><path d="M90 150L84 74L164 36H244L266 150Z" class="sg" stroke-width="1.4"/>'+T(214,160,'envelope','t2 tg','middle')
  +'<circle cx="163" cy="67" r="5" class="fa" stroke="var(--surface)" stroke-width="1.5"/>'+L('M163 67V170M54 67H163','sa',.8,'3 3')+T(172,58,'1,045 kg, 2.28 m','t1 ta')+T(172,72,'inside the envelope','t2 tg')
  +box(176,94,128,46,'var(--surface)')+T(240,112,'2,386.05 ÷ 1,045','t2','middle')+T(240,130,'= 2.28 m aft','t1','middle')+T(179,206,'CG (m aft of datum)','t2','middle'),
  'Plot weight against CG and make sure the point sits inside your own aircraft\'s envelope, for take-off and for landing.','Worked CG example'],
 ['Declared distances',320,190,
  '<path d="M0 156H320V190H0Z" class="gnd"/><rect x="30" y="140" width="200" height="12" fill="var(--ink-3)"/><rect x="230" y="140" width="36" height="12" class="fm" opacity=".6"/>'+T(248,174,'stopway','t2 tm','middle')+T(292,138,'clearway','t2 ta','middle')
  +[[30,230,'TORA',122,'k'],[30,310,'TODA',96,'a'],[30,266,'ASDA',70,'m'],[30,230,'LDA',44,'g']].map(function(r){var c={k:'sk',a:'sa',m:'sm',g:'sg'}[r[4]];return L('M'+r[0]+' '+r[3]+'H'+r[1]+'M'+r[0]+' '+(r[3]-5)+'V'+(r[3]+5)+'M'+r[1]+' '+(r[3]-5)+'V'+(r[3]+5),c,1.4)+T(r[0]+6,r[3]-6,r[2],'t1 t'+r[4])}).join('')
  +T(312,22,'TODA = TORA + clearway','t2','end')+T(312,36,'ASDA = TORA + stopway','t2','end'),
  'Take-off run, take-off distance, accelerate-stop distance and landing distance available. Unlicensed strips may only quote a total length.','Performance principles'],
 ['Rule-of-thumb take-off factors',320,206,
  [['+10% weight',1.2],['+1,000 ft elevation',1.1],['+10°C',1.1],['tailwind 10% Vlof',1.2],['2% uphill',1.1],['dry grass',1.2],['wet grass',1.3],['soft ground, snow',1.25],['general factor',1.33]].map(function(r,i){var y=10+i*19,w=(r[1]-1)*400;
   return T(128,y+11,r[0],'t2','end')+'<rect x="134" y="'+y+'" width="'+n(w)+'" height="13" rx="2" class="'+(i===8?'fr':i>4?'fm':'fa')+'" opacity=".8"/>'+T(140+w,y+11,'×'+r[1],'t1')}).join('')
  +T(160,196,'multiply all that apply, then the general factor','t2 ta','middle'),
  'Each condition stretches the take-off distance: a tailwind of 10% of the lift-off speed adds 20%. Multiply the factors that apply together, then apply the general safety factor last.','Rule-of-thumb multipliers']
]);

/* ---- Pilot health and performance (SS24) ---- */
S('Pilot health and performance (SS24)',[
 ['I AM SAFE',320,184,
  [['I','Illness','fit to fly?'],['A','Attitude','pressure to go?'],['M','Medication','side effects?'],['S','Stress','distracted?'],['A','Alcohol','none in 8 hours'],['F','Fatigue','slept 8 hours?'],['E','Eating','eaten and drunk?']].map(function(r,i){var x=8+Math.floor(i/4)*160,y=8+(i%4)*42;
   return'<circle cx="'+(x+16)+'" cy="'+(y+16)+'" r="14" class="fa"/><text x="'+(x+16)+'" y="'+(y+21)+'" text-anchor="middle" style="font:700 13px var(--f-body);fill:var(--surface)">'+r[0]+'</text>'+T(x+38,y+14,r[1],'t1')+T(x+38,y+28,r[2],'t2')}).join(''),
  'Run it before every flight, like a weather or NOTAM check: 8 hours\' sleep, no alcohol for 8 hours (24 after a lot), and eat.','I AM SAFE'],
 ['Altitude and your body',320,200,
  L('M66 190V14','sk',1.2)+[[0,'0'],[4000,'4,000'],[8000,'8,000'],[10000,'10,000'],[12000,'12,000 ft']].map(function(r){var y=186-r[0]/12000*170;return L('M62 '+n(y)+'h8','sk',1)+T(58,n(y+4),r[1],'t2','end')}).join('')
  +'<rect x="70" y="16" width="242" height="44" class="fr" opacity=".14"/>'+T(78,34,'Above 10,000 ft: use oxygen','t1 tr')+T(78,50,'confusion, clumsiness, drowsiness','t2')
  +'<rect x="70" y="60" width="242" height="29" class="fm" opacity=".16"/>'+T(78,79,'Above 8,000 ft: night vision falls','t2')
  +T(78,120,'Trapped gas expands','t1')+T(78,134,'ears, sinuses: not with a cold','t2')+T(78,162,'Carbon monoxide','t1')+T(78,176,'mimics hypoxia: heater leak','t2'),
  'Stay below 10,000 ft without oxygen (NCO.OP.190); if you suspect hypoxia, descend. Above 8,000 ft vision in low light suffers first.','Altitude and gas'],
 ['Alcohol before flying',320,190,
  L('M30 150H300','sk',1.2)+[0,4,8,12,16,20,24].map(function(h){var x=30+h*11.25;return L('M'+x+' 150v5','sk',1)+T(x,170,h+'h','t2','middle')}).join('')
  +'<rect x="30" y="98" width="90" height="44" class="fr" opacity=".25"/>'+T(75,116,'No flying','t1 tr','middle')+T(75,132,'within 8 hours','t2','middle')
  +'<rect x="120" y="98" width="180" height="44" class="fm" opacity=".2"/>'+T(210,116,'After a lot: up to 24 h','t1','middle')+T(210,132,'can still test positive','t2','middle')
  +box(60,26,200,44,'var(--surface)','var(--accent)')+T(160,44,'UK flying limit','t2','middle')+T(160,60,'20 mg per 100 ml of blood','t1','middle')+T(165,186,'hours since your last drink','t2','middle'),
  'The legal limit for flying is stricter than for driving. Allow at least 8 hours, and much longer after heavy drinking.','Factors that reduce performance']
]);

/* ---- Stalls, spins and loss of control (SS30) ---- */
S('Stalls, spins and loss of control (SS30)',[
 ['Lift and angle of attack',320,206,
  axes(44,170,304,20)+T(174,194,'angle of attack','t2','middle')+vlab(18,95,'lift coefficient')
  +L('M44 160L204 46Q224 36 236 52Q254 80 294 120','sa',2.4)+L('M230 40V170','sr',1,'4 3')+T(224,24,'critical angle','t1 tr','end')+T(224,38,'about 15°','t2','end')
  +T(112,96,'more angle, more lift','t2','middle')+T(268,100,'stalled:','t1','middle')+T(268,114,'lift falls away','t2','middle')
  +'<g transform="translate(154 148) rotate(-10)"><path d="M-30 0C-20-10 20-10 34-2L36 0L34 2C10 6-20 6-30 0Z" fill="var(--surface)" stroke="var(--ink)"/></g>'+AR('M98 150H118',110,150,120,150,'a',1.2)+T(80,154,'airflow','t2 ta','end'),
  'A wing stalls at its critical angle of attack, whatever the speed or attitude. Speed only matters because it changes the angle needed.','What a stall is'],
 ['Stall speed in a level turn',320,206,
  axes(44,170,304,20)+[0,15,30,45,60,75].map(function(b){var x=44+b*3.4;return L('M'+x+' 170v4','sk',1)+T(x,186,b+'°','t2','middle')}).join('')
  +[50,60,70,80,90,100].map(function(k){var y=170-(k-45)*2.6;return L('M40 '+n(y)+'h4','sk',1)+T(36,n(y+4),k,'t2','end')}).join('')
  +'<path d="'+(function(){var d='';for(var b=0;b<=75;b+=3){var v=50*Math.sqrt(1/Math.cos(b*Math.PI/180)),x=44+b*3.4,y=170-(v-45)*2.6;d+=(b?'L':'M')+n(x)+' '+n(Math.max(20,y))}return d})()+'" class="sr" stroke-width="2.4"/>'
  +'<circle cx="248" cy="'+n(170-(70.7-45)*2.6)+'" r="4" class="fr"/>'+L('M248 '+n(170-(70.7-45)*2.6)+'V170','sr',.8,'3 3')+T(240,94,'60° bank = 2 g','t1','end')+T(240,108,'50 kt becomes 70 kt','t2','end')+T(174,202,'bank angle','t2','middle'),
  'Stall speed rises with the square root of load factor. At 60° of bank you pull 2 g and stall about 1.4 times faster: 50 kt becomes about 70 kt.','Load factor'],
 ['Stall recovery, in order',320,224,
  [['Control column forward','reduce the angle of attack'],['Level wings with aileron','only once AoA is reduced'],['Full power if available','counter any pitch-up'],['Accelerate, retract flap','and gear as needed'],['Balance with rudder','']].map(function(r,i){var y=8+i*36;
   return'<circle cx="22" cy="'+(y+14)+'" r="13" class="fa"/><text x="22" y="'+(y+19)+'" text-anchor="middle" style="font:700 13px var(--f-body);fill:var(--surface)">'+(i+1)+'</text>'+T(44,y+12,r[0],'t1')+(r[1]?T(44,y+27,r[1],'t2'):'')}).join('')
  +box(8,188,304,30,'none','var(--bad)')+T(160,208,'Follow your AFM; act at the first warning','t2 tr','middle'),
  'Unload first. Rolling with aileron while the wing is still stalled can drop a wing further or start a spin. Act at the first warning and you lose little height.','Recovery']
]);

/* ---- VFR flight into IMC (SS33) ---- */
S('VFR flight into IMC (SS33)',[
 ['The 180° turn out of cloud',320,206,
  '<path d="M150 172V112A50 50 0 0 1 250 112V172" fill="none" class="sa" stroke-width="2.4" stroke-dasharray="6 4"/>'+head(250,160,250,182,'a')
  +plane(150,168,0,'a',1.3)+dbCloud(24,14,124,66)+T(85,66,'cloud ahead','t1','middle')
  +box(196,10,116,78,'var(--surface)','var(--accent)')+T(206,28,'Rate 1 turn','t1 ta')+T(206,44,'bank 20° or less','t2')+T(206,58,'180° in 1 minute','t2')+T(206,72,'hold height','t2')
  +T(136,140,'note the','t2','end')+T(136,154,'heading first','t2','end')+T(250,200,'roll out, hold it','t2 ta','middle'),
  'Trust the instruments and keep the wings level, then make a gentle rate 1 turn. Without a heading indicator, time it: 1 minute for 180°.','The 180'],
 ['Tricks your balance can play',320,296,
  [['The leans','you feel level,','but are banked'],['Somatogravic','speeding up feels','like pitching up'],['Coriolis','head moved in a turn:','false rotation'],['Inversion','abrupt level-off','feels like tumbling'],['False horizon','sloping cloud tops','look level'],['If you enter cloud','aviate, navigate,','communicate']].map(function(r,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*96,cx=x+74,cy=y+44,ic='';
   function rear(a,c,dash){return'<g transform="translate('+cx+' '+cy+') rotate('+a+')"'+(dash?' opacity=".55"':'')+'><path d="M-34 0H34" stroke="var(--'+c+')" stroke-width="3"'+(dash?' stroke-dasharray="4 3"':'')+'/><circle r="6" fill="'+(dash?'none':'var(--'+c+')')+'" stroke="var(--'+c+')" stroke-width="1.6"/><path d="M0-6V-14" stroke="var(--'+c+')" stroke-width="2.4"/></g>'}
   if(i===0)ic=rear(0,'ink-3',1)+rear(-18,'accent')+T(x+142,y+40,'real','t2 ta','end')+T(x+142,y+54,'felt','t2','end');
   if(i===1)ic='<g opacity=".5">'+dbSide(cx,cy-2,.62,'k').replace('scale(-0.62 0.62)','scale(-0.62 0.62) rotate(-16)')+'</g>'+dbSide(cx,cy+6,.62,'a')+AR('M'+(cx-46)+' '+(cy+22)+'H'+(cx+40),cx+30,cy+22,cx+42,cy+22,'r',1.4)+T(x+142,y+40,'felt','t2','end');
   if(i===2)ic='<circle cx="'+cx+'" cy="'+cy+'" r="11" fill="none" stroke="var(--accent)" stroke-width="2"/><path d="M'+(cx-4)+' '+(cy-2)+'h2M'+(cx+3)+' '+(cy-2)+'h2" stroke="var(--accent)" stroke-width="2"/>'+AR('M'+(cx-30)+' '+(cy+6)+'A30 12 0 0 0 '+(cx+30)+' '+(cy+6),cx+22,cy+12,cx+31,cy+5,'a',1.4)+AR('M'+(cx+20)+' '+(cy-22)+'Q'+(cx+30)+' '+cy+' '+(cx+18)+' '+(cy+16),cx+22,cy+8,cx+17,cy+18,'r',1.4);
   if(i===3)ic=dbSide(cx-6,cy+8,.62,'a')+AR('M'+(cx+22)+' '+(cy-8)+'A22 22 0 1 0 '+(cx-30)+' '+(cy-16),cx-24,cy-20,cx-31,cy-14,'r',1.4)+T(x+142,y+40,'felt','t2 tr','end');
   if(i===4)ic=dbCloud(x+14,cy-10,70,24).replace('<g opacity="1">','<g opacity="1" transform="rotate(-10 '+cx+' '+cy+')">')+L('M'+(x+12)+' '+(cy+16)+'H'+(x+136),'s2',1,'4 3')+T(x+136,cy+10,'true horizon','t2','end');
   return'<rect x="'+x+'" y="'+y+'" width="148" height="88" rx="8" fill="none" stroke="var('+(i===5?'--bad':'--line-2')+')" stroke-width="1.2"/>'+T(x+10,y+18,r[0],i===5?'t1 tr':'t1')+ic+T(x+10,y+68,r[1],'t2')+T(x+10,y+82,r[2],'t2')}).join(''),
  'Spatial disorientation is the killer in VFR flight into IMC. Your inner ear is wrong; the attitude indicator is right. Each picture shows what really happens (solid) against what you feel (faint).','Spatial disorientation types'],
 ['VFR on top and the 3,000 ft rule',320,196,
  '<path d="M0 170H320V196H0Z" class="gnd"/><path d="M0 170L40 160L80 166L120 150L160 162L200 156L240 166L280 154L320 164V170Z" class="bld" opacity=".7"/>'
  +'<path d="M0 110Q60 98 120 110T240 108T320 106V130H0Z" fill="var(--surface-2)" stroke="var(--ink-3)"/>'
  +L('M0 94H320','sr',1.2,'5 3')+T(316,88,'3,000 ft amsl','t1 tr','end')+side(80,64,.9,'a')+T(8,24,'Above 3,000 ft: 5 km,','t2')+T(8,38,'1,500 m and 1,000 ft','t2')+T(8,52,'from cloud','t2')
  +T(240,40,'No hole at the','t1','middle')+T(240,56,'destination?','t1','middle')+T(160,150,'below 3,000 ft in Class G: surface in sight','t2','middle'),
  'Flying above cloud is legal above 3,000 ft with the right cloud separation, but you may have no way down at the other end. Below 3,000 ft in Class G you must stay in sight of the surface.','VFR on top']
]);

/* ---- GA radiotelephony practice (SS22) ---- */
S('GA radiotelephony practice (SS22)',[
 ['Squawk codes to know',320,226,
  [['7000','VFR conspicuity','g'],['2000','IFR conspicuity','g'],['0030','lost (UK)','m'],['7600','radio failure','m'],['7700','emergency','r'],['7500','unlawful interference','r']].map(function(r,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*66;
   return'<rect x="'+x+'" y="'+y+'" width="148" height="58" rx="6" fill="#15181d" stroke="#666"/><rect x="'+(x+140)+'" y="'+(y+8)+'" width="4" height="42" rx="2" class="f'+r[2]+'"/>'
    +'<text x="'+(x+12)+'" y="'+(y+29)+'" style="font:500 22px var(--f-mono);fill:#7dff9a">'+r[0]+'</text><text x="'+(x+12)+'" y="'+(y+48)+'" style="font:500 11px var(--f-body);fill:#E8EDF6">'+r[1]+'</text>'}).join('')
  +T(160,218,'select ALT (Mode C); IDENT only when asked','t2','middle'),
  'The three 7s are for trouble. 0030 is the UK lost code, used while you call for help. Select ALT (Mode C) and press IDENT only when asked.','Squawk codes'],
 ['Where to make your aerodrome calls',320,206,
  T(160,22,'Circuit calls: downwind and final','t1','middle')+T(160,38,'overhead join: overhead, then deadside','t2','middle')
  +L('M8 120H312','s2',1,'2 3')+'<rect x="20" y="114" width="60" height="12" fill="var(--ink-3)"/>'+T(50,144,'runway','t2','middle')
  +[[80,'threshold'],[150,'4 NM'],[220,'8 NM']].map(function(r){return L('M'+r[0]+' 104V136','sk',1)+T(r[0],98,r[1],'t2','middle')}).join('')
  +'<rect x="80" y="112" width="70" height="16" class="fg" opacity=".2"/>'+T(115,124,'final','t1','middle')+'<rect x="150" y="112" width="70" height="16" class="fm" opacity=".2"/>'+T(185,124,'long final','t1','middle')
  +plane(296,120,270,'a',1.2)+T(160,66,'no "short final": give the distance','t2 tr','middle')
  +box(8,158,304,40,'var(--surface)','var(--accent)')+T(160,175,'ATC aerodromes: 15 NM or 5 minutes','t1','middle')+T(160,190,'from the ATZ, whichever is greater','t2','middle'),
  'Final runs from 4 NM to the threshold, long final from 8 to 4 NM. At an aerodrome with ATC, make the first call at 15 NM or 5 minutes from the ATZ, whichever is greater.','Circuit and aerodrome calls'],
 ['The distress or urgency message',320,232,
  [['MAYDAY ×3 or PAN PAN ×3',''],['station called',''],['your callsign and type',''],['nature of the problem',''],['intentions',''],['position, height, heading',''],['pilot qualification','helps UK units'],['persons on board, endurance','']].map(function(r,i){var y=6+i*25;
   return'<rect x="30" y="'+y+'" width="260" height="21" rx="10" fill="'+(i===0?'var(--bad)':'var(--surface)')+'" stroke="'+(i===0?'var(--bad)':'var(--ink-3)')+'"/>'
    +(i===0?'<text x="160" y="'+(y+15)+'" text-anchor="middle" style="font:600 12px var(--f-body);fill:var(--surface)">'+r[0]+'</text>':T(44,y+15,(i+1)+'. '+r[0],'t2')+(r[1]?T(282,y+15,r[1],'t2 ta','end'):''))}).join('')
  +T(160,222,'then squawk 7700; 121.5 MHz if not with a unit','t2 tr','middle'),
  'MAYDAY is grave and imminent danger; PAN PAN is a concern without immediate danger, and is worth making early. Give as much of the message as you can, in this order.','MAYDAY and PAN PAN']
]);

/* ---- VFR flight planning and VMC minima (SS05) ---- */
S('VFR flight planning and VMC minima (SS05)',[
 ['UK VMC minima at a glance',320,200,
  '<path d="M0 188H320V200H0Z" class="gnd"/>'+T(160,18,'FL100 and above: 8 km, same distances','t2','middle')
  +L('M0 30H320','sk',1,'5 3')+T(6,46,'FL100','t1')+L('M0 112H320','sk',1,'5 3')+T(6,94,'3,000 ft amsl, or','t2')+T(6,108,'1,000 ft agl if higher','t2')
  +box(130,38,182,68,'var(--surface)','var(--accent)')+T(140,56,'FL100 to 3,000 ft','t1')+T(140,72,'5 km visibility','t2')+T(140,86,'1,500 m horizontal and','t2')+T(140,100,'1,000 ft vertical from cloud','t2')
  +box(8,120,146,62,'var(--surface)','var(--ink-3)')+T(18,138,'Classes A to E','t1')+T(18,154,'5 km, 1,500 m and','t2')+T(18,168,'1,000 ft from cloud','t2')
  +box(164,120,148,62,'var(--surface)','var(--good)')+T(174,138,'Classes F and G','t1 tg')+T(174,154,'5 km, clear of cloud,','t2')+T(174,168,'surface in sight','t2'),
  'Visibility and distance from cloud depend on height, class and speed. In F and G at or below 3,000 ft, visibility may be 1,500 m by day at 140 kt or less. A UK exemption in Class D (day, 140 kt or less, 3,000 ft or below) allows clear of cloud with the surface in sight. These are legal minima, not targets.','VMC minima in the UK'],
 ['Final fuel reserve minima (Part-21 aeroplanes)',320,186,
  [['Day, staying in sight of the aerodrome',10,'m'],['Day, any other flight',30,'a'],['Night',45,'k']].map(function(r,i){var y=30+i*48,w=r[1]*5;return T(16,y-6,r[0],'t1')+'<rect x="16" y="'+y+'" width="'+w+'" height="22" rx="4" class="f'+r[2]+'" opacity=".7"/>'+T(24+w,y+16,r[1]+' min','t1')}).join('')
  +T(160,180,'minima: plan to land with more','t2 ta','middle'),
  'Helicopters need 20 minutes. Measure fuel with a dipstick and plan for the worst case.','Fuel reserves'],
 ['FREDA every 10 minutes',320,196,
  [['F','Fuel','quantity,','selector'],['R','Radio','frequency,','squawk'],['E','Engine','Ts and Ps,','carb heat'],['D','Direction','compass,','DI aligned'],['A','Altimeter','setting,','height']].map(function(r,i){var x=4+i*63,cx=x+30;
   return box(x,36,60,120,'none','var(--accent)')+T(cx,66,r[0],'t1 ta','middle').replace('class="t1 ta"','class="t1 ta" style="font-size:20px"')+T(cx,92,r[1],'t1','middle')+T(cx,114,r[2],'t2','middle')+T(cx,128,r[3],'t2','middle')}).join('')
  +T(160,22,'Look outside about 80% of the time','t1','middle')+T(160,180,'Take 2: stay 2 NM or 200 ft clear of CAS','t2','middle'),
  'A short routine check that catches fuel, radio and navigation slips before they grow.','In-flight monitoring']
]);
})();
