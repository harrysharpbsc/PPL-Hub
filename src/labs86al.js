/* ===== Air Law chapters 08-16 (Harry's notes, Nov 2026): style B diagrams =====
   Library: labs80b.js; how-to: .claude/skills/ppl-diagram. Builds after labs84*.js and labs85sky.js so it can
   reuse their figures by title (ref). Each entry: [title, w, h, drawing, caption, section prefix]. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,n=dbN;
function box(x,y,w,h,stroke,fill){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="7" fill="'+(fill||'var(--surface)')+'" stroke="'+(stroke||'var(--line-2)')+'" stroke-width="1.2"/>'}
function lines(x,y,a,c,an){return a.map(function(t,i){return T(x,y+i*14,t,c||'t2',an)}).join('')}
function badge(x,y,k,c){return'<circle cx="'+x+'" cy="'+y+'" r="11" class="f'+(c||'r')+'"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle" style="font:700 12px var(--f-body);fill:var(--surface)">'+k+'</text>'}
/* vertical dimension with heads at both ends */
function vdim(x,y1,y2,c){return L('M'+x+' '+y1+'V'+y2,'s'+c,1.4)+head(x,y1+10,x,y1,c)+head(x,y2-10,x,y2,c)}
function hdim(x1,x2,y){return L('M'+x1+' '+y+'H'+x2+'M'+x1+' '+(y-5)+'V'+(y+5)+'M'+x2+' '+(y-5)+'V'+(y+5),'sk',1.1)}
function ceil(y){return'<rect x="0" y="'+y+'" width="320" height="16" fill="#c7ced6" opacity=".9"/><rect x="0" y="'+(y+16)+'" width="320" height="8" fill="#e7ebee" opacity=".5"/>'}
function mast(x,top,base){return'<rect x="'+(x-3)+'" y="'+top+'" width="6" height="'+(base-top)+'" class="bld"/><circle cx="'+x+'" cy="'+(top-2)+'" r="3" class="fr"/>'}
/* an existing figure, found by its title in another topic */
function ref(topic,title){var all=[];Object.keys(DSEC).forEach(function(k){all=all.concat(DSEC[k])});var r=(DSEC[topic]||[]).concat(all).filter(function(x){return x[1].indexOf('aria-label="'+esc(title+'.'))>=0})[0];return r?{h:r[1]}:null}
function add(t,list){DSEC[t]=list.filter(function(f){return f&&(f[0]&&f[0].h!==undefined?f[0].h:true)}).map(function(f){return[f[5],f[0]&&f[0].h!==undefined?f[0].h:dbFig(f[0],f[1],f[2],f[3],f[4])]})}
function R(topic,title,sec){var r=ref(topic,title);return r?[r,0,0,'','',sec]:null}

/* ---- 08 Visual Flight Rules ---- */
add('Visual Flight Rules',[
 R('VFR flight planning and VMC minima (SS05)','UK VMC minima at a glance','VMC minima by airspace class'),
 R('VFR, IFR and Special VFR (Skyway Code)','When VFR is not enough in a CTR','VFR into a control zone'),
 ['Night VFR minima',320,240,
  ceil(16)+T(8,58,'Cloud ceiling at least 1,500 ft','t1')+T(8,72,'measured above the ground','t2')
  +'<rect x="0" y="196" width="320" height="8" class="gnd"/>'+mast(150,150,196)
  +side(150,96,.8,'a')+vdim(174,102,146,'g')+L('M150 148H178','s2',1,'2 3')
  +T(182,118,'1,000 ft above','t1 tg')+T(182,132,'highest obstacle','t2')+T(182,146,'(2,000 ft high terrain)','t2')
  +box(4,84,116,82,'var(--ink-3)')+lines(12,102,['Ground visibility'],'t1')+T(12,116,'5 km or more','t2')+T(12,138,'Surface in sight','t1')+T(12,152,'at or below 3,000 ft','t2')
  +hdim(30,270,214)+T(90,230,'8 km','t2','middle')+T(210,230,'8 km','t2','middle'),
  'At night VFR needs a cloud ceiling of at least 1,500 ft above the ground, 5 km ground visibility, the surface in sight at or below 3,000 ft amsl, and (except taking off or landing) 1,000 ft above the highest obstacle within 8 km, or 2,000 ft over high or mountainous terrain. Leaving the aerodrome vicinity needs a flight plan; booking out will do.','Night VFR']
]);

/* ---- 09 Instrument Flight Rules ---- */
add('Instrument Flight Rules',[
 ['IFR minimum height',320,214,
  L('M160 8V196','s2',1,'2 3')
  +T(80,22,'Elsewhere','t1','middle')+T(240,22,'High or mountainous','t1','middle')
  +'<rect x="4" y="184" width="152" height="8" class="gnd"/>'+mast(110,150,184)+side(110,106,.7,'a')
  +L('M36 150H107','s2',1,'2 3')+L('M36 110H88','s2',1,'2 3')+vdim(40,110,150,'g')+T(46,134,'1,000 ft','t1 tg')
  +'<path d="M166 192L240 134L314 192Z" class="gnd"/>'+side(240,50,.7,'a')
  +L('M196 134H238','s2',1,'2 3')+L('M196 54H218','s2',1,'2 3')+vdim(200,54,134,'g')+T(206,98,'2,000 ft','t1 tg')
  +T(160,208,'above the highest obstacle within 8 km','t2','middle'),
  'Except taking off or landing, an IFR flight stays at least 1,000 ft above the highest obstacle within 8 km of its estimated position, or 2,000 ft over high or mountainous terrain, unless the State sets a minimum flight altitude.','The minimum height rule'],
 ['Semicircular cruising levels',320,224,
  T(160,18,'Above 3,000 ft amsl or the transition altitude','t1','middle')
  +'<path d="M100 46A62 62 0 0 1 100 170Z" class="fa" opacity=".14"/><path d="M100 46A62 62 0 0 0 100 170Z" class="fm" opacity=".16"/>'
  +'<circle cx="100" cy="108" r="62" fill="none" class="sk" stroke-width="1.3"/>'+L('M100 46V170','sk',1.2)
  +T(100,40,'000°','t2','middle')+T(100,184,'180°','t2','middle')
  +T(132,104,'odd','t1 ta','middle')+T(132,118,'000°-179°','t2','middle')+T(68,104,'even','t1 tm','middle')+T(68,118,'180°-359°','t2','middle')
  +box(180,40,134,62,'var(--accent)')+T(188,58,'Track 000° to 179°','t1 ta')+T(188,74,'IFR FL30, 50, 70','t2')+T(188,90,'VFR FL35, 55, 75','t2')
  +box(180,112,134,62,'var(--mid)')+T(188,130,'Track 180° to 359°','t1 tm')+T(188,146,'IFR FL40, 60, 80','t2')+T(188,162,'VFR FL45, 65, 85','t2')
  +'<rect x="8" y="194" width="304" height="24" rx="6" class="fa" opacity=".08"/>'+T(160,210,'Magnetic track. East is odd, west is even','t2 ta','middle'),
  'In level flight above 3,000 ft amsl, or the transition altitude if higher, choose the level by magnetic track: 000° to 179° odd thousands, 180° to 359° even thousands. VFR flights are advised to add 500 ft. ATC instructions and holding procedures override it.','Cruising levels'],
 ['An IFR position report',320,164,
  [['callsign','G-ABCD'],['position','Wicken'],['time','47'],['level','FL40'],['next position and estimate','Marlow 57']].map(function(r,i){var y=8+i*27;
   return'<rect x="30" y="'+y+'" width="260" height="22" rx="11" fill="var(--surface)" stroke="var(--ink-3)"/>'+T(44,y+15,(i+1)+'. '+r[0],'t2')+T(278,y+15,r[1],'t1 ta','end')}).join('')
  +T(160,156,'times are minutes past the hour','t2','middle'),
  'In or entering controlled airspace an IFR flight reports at notified points or when ATC asks: callsign, position, time, level, then the next position and its estimate.','Position reports']
]);

/* ---- 10 Registration and Airworthiness ---- */
var MK='style="font:700 15px var(--f-body);fill:var(--surface);letter-spacing:1px"';
add('Registration and Airworthiness',[
 ['Where the registration marks go',320,248,
  T(160,16,'Seen from below','t1','middle')
  +'<rect x="152" y="24" width="16" height="104" rx="7" class="fa"/><rect x="24" y="44" width="272" height="30" rx="5" class="fa"/><rect x="118" y="112" width="84" height="12" rx="4" class="fa"/>'
  +'<text x="232" y="65" text-anchor="middle" '+MK+'>G-ABCD</text>'+T(88,63,'right wing','t2','middle').replace('class="t2"','class="t2" style="fill:var(--surface);stroke:none"')
  +T(232,90,'left wing only, 50 cm','t2 ta','middle')+T(232,104,'tops to leading edge','t2','middle')
  +L('M8 140H312','s2',1,'2 3')+T(160,160,'Both sides of the fuselage (or the fin)','t1','middle')
  +'<g transform="translate(160 206) scale(-3.4 3.4)"><path d="'+DB_SIDE+'" class="fa"/></g>'
  +'<text x="100" y="204" text-anchor="middle" '+MK+'>G-ABCD</text>'+T(100,236,'at least 30 cm','t2 ta','middle'),
  'Marks go once under the left wing (at least 50 cm high, tops of the letters towards the leading edge) and on both sides of the fuselage between wing and tail, or on the fin (at least 30 cm). Plain capitals, each two-thirds as wide as it is high, in a contrasting colour.','Where the marks go'],
 ['The general classification of aircraft',320,196,
  T(160,20,'Aircraft','t1','middle')+L('M160 26V34M88 34H236M88 34V44M236 34V44','s2',1.2)
  +T(88,58,'Lighter than air','t1','middle')+T(236,58,'Heavier than air','t1','middle')
  +L('M88 64V72M50 72H128M50 72V80M128 72V80M236 64V72M200 72H274M200 72V80M274 72V80','s2',1.2)
  +T(50,96,'not powered','t2 tm','middle')+T(128,96,'powered','t2 ta','middle')+T(200,96,'not powered','t2 tm','middle')+T(274,96,'powered','t2 ta','middle')
  +L('M50 102V110M128 102V110M200 102V110M274 102V110','s2',1.2)
  +lines(50,126,['free balloon','captive','balloon'],'t2','middle')+lines(128,126,['airship'],'t2','middle')+lines(200,126,['glider','kite'],'t2','middle')
  +lines(274,126,['aeroplane','helicopter','gyroplane','powered lift'],'t2','middle')
  +T(160,188,'aeroplanes include SLMGs and microlights','t2','middle'),
  'ANO Schedule 4 classifies aircraft as lighter or heavier than air, then powered or not. Powered heavier-than-air aircraft are flying machines: aeroplanes (land, sea, amphibian, self-launching motor gliders, microlights), powered lift and rotorcraft. Hang-gliders count as gliders.','General classification'],
 ['The paperwork that keeps an aircraft legal',320,214,
  [['CofA','a',['Airworthiness certificate','Part-21: no expiry','void if work not approved']],['ARC','a',['Airworthiness Review','every 12 months','keeps the CofA in force']],
   ['CRS','g',['Release to Service','after any repair,','modification or service']],['Tech log','m',['hours, defects, work','enter a defect before','the next flight']]].map(function(c,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*102;
   return box(x,y,148,94,'var(--line-2)')+'<rect x="'+x+'" y="'+(y+10)+'" width="4" height="74" rx="2" class="f'+c[1]+'"/>'+T(x+14,y+24,c[0],'t1')+lines(x+14,y+44,c[2])}).join(''),
  'A Part-21 aircraft has a non-expiring Certificate of Airworthiness, kept in force by an Airworthiness Review Certificate each year. Any overhaul, repair, modification or maintenance needs a Certificate of Release to Service. Defects go in the technical log before the next flight or by the end of the day, whichever is earlier.','Maintenance']
]);

/* ---- 11 Pilots' Licences ---- */
function ax(a){return n(60+(a-30)*8)}
add("Pilots' Licences",[
 ['Class 2 medical: how long it lasts',320,206,
  L('M140 26V176M220 26V176','s2',1,'2 3')
  +T(100,20,'under 40','t2','middle')+T(180,20,'40 to 49','t2','middle')+T(260,20,'50 and over','t2','middle')
  +[[35,40,0,'60 months'],[39,42,44,'stops at 42'],[45,47,0,'24 months'],[49.5,51,51.5,'stops at 51'],[55,56,0,'12 months']].map(function(r,i){var y=40+i*26,x1=ax(r[0]),x2=ax(r[1]);
   return T(52,y+11,'at '+(r[0]===49.5?'49½':r[0]),'t1','end')+'<rect x="'+x1+'" y="'+y+'" width="'+(x2-x1)+'" height="14" rx="3" class="fa" opacity=".75"/>'
    +(r[2]?L('M'+x2+' '+(y+7)+'H'+ax(r[2]),'sr',1.4,'3 2')+L('M'+x2+' '+(y-2)+'V'+(y+16),'sr',2):'')
    +(i===4?T(x1-6,y+11,r[3],'t2','end'):T((r[2]?ax(r[2]):x2)+6,y+11,r[3],r[2]?'t2 tr':'t2'))}).join('')
  +L('M60 176H300','sk',1.2)+[30,40,50,60].map(function(a){return L('M'+ax(a)+' 176V182','sk',1.2)+T(ax(a),196,''+a,'t2','middle')}).join('')+T(8,196,'age','t2'),
  'A Class 2 medical lasts 60 months under 40, 24 months from 40 and 12 months from 50, but one issued before 40 stops at 42, and one issued before 50 stops at 51. Renew up to 45 days early without losing time.','Class 2 validity'],
 ['Revalidating the SEP class rating',320,214,
  T(160,18,'The rating lasts 24 months. Either:','t1','middle')
  +'<rect x="264" y="34" width="38" height="40" rx="4" class="fa" opacity=".45"/>'+T(20,50,'1. Proficiency check','t1 ta')+T(20,64,'with an examiner, last 3 months','t2')
  +'<rect x="160" y="88" width="142" height="80" rx="6" class="fa" opacity=".12"/>'+T(20,104,'or 2. Experience','t1 ta')+lines(20,120,['in the last','12 months:'])
  +lines(168,106,['12 h in the class','6 h as PIC','12 take-offs, 12 landings','1 h with an FI or CRI'])
  +L('M20 184H302','sk',1.2)+L('M20 178V190M160 178V190M264 178V190M302 178V190','sk',1.2)
  +T(20,204,'issue','t2')+T(160,204,'12 months to go','t2','middle')+T(302,204,'expiry','t2','end'),
  'Revalidate the SEP rating either with a proficiency check in the 3 months before it expires, or with 12 hours in the class in the 12 months before expiry, including 6 hours PIC, 12 take-offs and 12 landings, and a 1-hour refresher with an instructor.','Revalidating the SEP'],
 ['Passenger recency: 3 in 90 days',320,160,
  T(160,22,'3 take-offs, approaches and landings','t1','middle')+T(160,38,'same type or class, at the controls','t2','middle')
  +L('M20 84H300','sk',1.2)+L('M20 78V90M300 78V90','sk',1.2)+T(20,106,'90 days ago','t2')+T(300,106,'today','t2','end')
  +badge(90,84,1,'a')+badge(170,84,2,'a')+'<circle cx="240" cy="84" r="11" fill="#1b2433" stroke="var(--ink)" stroke-width="1"/><text x="240" y="88" text-anchor="middle" style="font:700 12px var(--f-body);fill:#ffd66b">3</text>'+T(240,66,'at night','t2','middle')
  +'<rect x="8" y="122" width="304" height="30" rx="6" class="fa" opacity=".08"/>'+T(160,141,'Night passengers: one of the three at night','t2 ta','middle'),
  'To carry passengers you need 3 take-offs, approaches and landings in the preceding 90 days in the same type or class. For passengers at night, one of them must be at night, unless you hold an instrument rating.','Passenger recency'],
 ['PPL(A): at least 45 hours',320,168,
  T(160,20,'Minimum flight training','t1','middle')
  +'<rect x="24" y="44" width="150" height="26" rx="3" class="fa" opacity=".75"/><rect x="174" y="44" width="30" height="26" class="fg" opacity=".7"/><rect x="204" y="44" width="30" height="26" class="fg"/><rect x="234" y="44" width="60" height="26" rx="3" class="fk" opacity=".2"/>'
  +T(99,38,'25 h dual','t1 ta','middle')+T(204,38,'10 h solo','t1 tg','middle')+T(264,38,'10 h more','t1','middle')
  +L('M219 72V92','sg',1.2)+T(219,106,'5 h solo cross-country','t2','middle')+T(219,120,'incl. 150 nm, 2 landings away','t2','middle')
  +L('M24 84H174','s2',1)+T(24,140,'Nine exams in 18 months, then','t2')+T(24,154,'a skill test. Licence at 17.','t2'),
  'The PPL(A) needs at least 45 hours of flight training, with 25 hours dual and 10 hours supervised solo, including 5 hours solo cross-country with one flight of at least 150 nm (270 km) and two full-stop landings away from base.','The PPL(A)']
]);

/* ---- 12 Operation of Aircraft ---- */
add('Operation of Aircraft',[
 ['Take-off distance: rules of thumb',320,206,
  [['Standard day',100,'k'],['10% heavier',120,'r'],['Tailwind about 5 kt',120,'r'],['10°C warmer',110,'r'],['1,000 ft higher',110,'r']].map(function(r,i){var y=18+i*34,w=r[1]*1.2;
   return T(132,y+15,r[0],'t2','end')+'<rect x="140" y="'+y+'" width="'+w+'" height="20" rx="3" class="f'+r[2]+'" opacity="'+(i?'.55':'.25')+'"/>'+T(146+w,y+15,i?'+'+(r[1]-100)+'%':'100%','t1'+(i?' tr':''))}).join('')
  +T(160,198,'factors multiply; use the aircraft charts','t2','middle'),
  'Very roughly: 10% more weight or a tailwind of 10% of lift-off speed adds about 20% to the take-off distance; 10°C warmer or 1,000 ft higher adds about 10%. The factors multiply, so check the aircraft\'s performance charts before every flight.','Pre-flight actions'],
 R('GA radiotelephony practice (SS22)','Squawk codes to know','SSR transponders'),
 ['Flying over water (single-engine)',320,206,
  '<path d="M8 150V112Q30 104 52 112L66 150Z" class="gnd"/><rect x="66" y="132" width="246" height="18" class="fa" opacity=".15"/>'+T(30,168,'land','t2','middle')+T(190,168,'sea','t2','middle')
  +side(46,86,.6,'a')+L('M100 44V150','sm',1.4,'4 3')+L('M200 44V150','sr',1.4,'4 3')
  +T(100,24,'gliding distance','t2','middle')+T(100,38,'from land','t2','middle')+T(200,24,'30 min or 50 nm','t2','middle')+T(200,38,'whichever is less','t2','middle')
  +lines(108,80,['life jacket','for everyone'],'t2')+T(108,66,'Beyond:','t1 tm')+T(208,66,'Beyond:','t1 tr')+lines(208,80,['PIC decides on','life rafts and','distress signals'],'t2')
  +T(160,196,'In a single, wear the life jacket (not inflated)','t2 ta','middle'),
  'Under Part-NCO a single-engine aeroplane carries a life jacket for each person beyond gliding distance from land (or where take-off or approach is over water). Beyond 30 minutes at cruise or 50 nm from land, whichever is less, the PIC assesses the survival risk and decides on life rafts and distress signals. ICAO Annex 6 sets rafts at 100 nm for single-engine aeroplanes.','Over water'],
 ['Oxygen in an unpressurised aircraft',320,180,
  '<rect x="8" y="16" width="304" height="44" class="fr" opacity=".08"/><rect x="8" y="60" width="304" height="52" class="fm" opacity=".12"/>'
  +L('M8 60H312','sr',1.2,'5 3')+L('M8 112H312','sm',1.2,'5 3')+T(306,56,'13,000 ft','t2','end')+T(306,108,'10,000 ft','t2','end')
  +T(16,34,'Above 13,000 ft','t1 tr')+T(16,50,'crew all the time; passengers too','t2')
  +T(16,80,'10,000 to 13,000 ft','t1 tm')+T(16,96,'crew, after 30 minutes','t2')
  +T(16,132,'Below 10,000 ft','t1')+T(16,148,'not required','t2')+'<rect x="8" y="164" width="304" height="8" class="gnd"/>',
  'In an unpressurised aircraft the crew use oxygen whenever above 10,000 ft for more than 30 minutes, and at all times above 13,000 ft. Passengers use it above 13,000 ft.','Oxygen']
]);

/* ---- 13 Distress, Urgency, Safety and Warning Signals ---- */
var DU=[['Radio','MAYDAY ×3','PAN PAN ×3'],['Means','immediate help needed','no immediate help'],['Light','SOS in Morse','XXX in Morse'],['Flares','red, or red parachute','white'],['Lights','','flashing landing/nav'],['Sound','SOS or continuous','XXX in Morse'],['Squawk','7700','7700']];
add('Distress, Urgency, Safety and Warning Signals',[
 ['Distress or urgency?',320,236,
  '<rect x="84" y="8" width="114" height="24" rx="4" class="fr" opacity=".85"/><rect x="202" y="8" width="114" height="24" rx="4" class="fm" opacity=".85"/>'
  +'<text x="141" y="25" text-anchor="middle" style="font:700 12px var(--f-body);fill:var(--surface)">Distress</text><text x="259" y="25" text-anchor="middle" style="font:700 12px var(--f-body);fill:var(--surface)">Urgency</text>'
  +DU.map(function(r,i){var y=36+i*25;return(i%2?'':'<rect x="4" y="'+y+'" width="312" height="25" fill="var(--surface-2)"/>')+T(10,y+17,r[0],'t1')+T(141,y+17,r[1]||'-','t2','middle')+T(259,y+17,r[2],'t2','middle')}).join('')
  +T(160,228,'Call on the frequency in use first, then 121.5','t2','middle'),
  'Distress (MAYDAY) is grave and imminent danger needing immediate help: SOS, red flares or a red parachute flare. Flashing landing or navigation lights and white flares mean the aircraft must land but needs no immediate help; XXX or PAN PAN is an urgent message about the safety of a ship, aircraft, vehicle or person.','Urgency signals'],
 R('GA radiotelephony practice (SS22)','The distress or urgency message','Distress signals')
]);

/* ---- 14 Search and Rescue ---- */
var GS=[['V','M12 10L28 46L44 10',['need','assistance']],['X','M12 10L44 46M44 10L12 46',['need medical','assistance']],['↑','M28 46V12M16 24L28 10L40 24',['going this','way']],['Y','M12 10L28 28L44 10M28 28V46',['yes']],['N','M14 46V10L42 46V10',['no']]];
add('Search and Rescue',[
 ['Ground-to-air signals',320,226,
  GS.map(function(g,i){var x=6+i*62;return'<rect x="'+x+'" y="14" width="56" height="56" rx="6" fill="#5f7f4c"/><path d="'+g[1]+'" transform="translate('+x+' 14)" fill="none" stroke="#f6f3ea" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'+lines(x+28,88,g[2],'t2','middle')}).join('')
  +L('M8 118H312','s2',1,'2 3')+T(160,138,'The aircraft replies: understood','t1','middle')
  +plane(46,184,0,'a',1.2)+AR('M20 166Q14 176 20 186',18,180,20,188,'a',1.4)+AR('M72 202Q78 192 72 182',74,188,72,180,'a',1.4)
  +T(92,174,'By day','t1')+T(92,190,'rocks its wings','t2')
  +plane(196,184,0,'a',1.2)+'<circle cx="196" cy="160" r="4" fill="#ffd66b" stroke="var(--ink)" stroke-width=".6"/>'+L('M188 152L184 146M196 150V143M204 152L208 146','sm',1.4)
  +T(222,174,'By night','t1')+T(222,190,'flashes landing','t2')+T(222,204,'lights twice','t2'),
  'Survivors lay out symbols at least 2 to 3 m long in a contrasting colour: V require assistance, X require medical assistance, arrow proceeding this way, Y yes, N no. The aircraft shows it has understood by rocking its wings by day, or flashing its landing (or navigation) lights twice at night. No reply means not understood.','Signals from survivors'],
 ['The three emergency phases',320,200,
  [['1','Uncertainty','doubt about safety',['RCC checks reports','with ATS units'],'m'],['2','Alert','concern for safety',['RCC alerts','SAR units'],'m'],['3','Distress','grave, imminent danger',['SAR action,','position, search area'],'r']].map(function(r,i){var y=10+i*64;
   return box(36,y,276,54,'var(--line-2)')+badge(18,y+27,r[0],r[4])+T(46,y+22,r[1],'t1 t'+r[4])+T(46,y+38,r[2],'t2')+lines(196,y+22,r[3])+(i<2?AR('M18 '+(y+40)+'V'+(y+76),18,y+66,18,y+76,'k',1.2).replace('M18 '+(y+40),'M18 '+(y+40)):'')}).join(''),
  'The rescue coordination centre escalates through three phases: uncertainty (doubt: evaluate reports with ATS), alert (concern: alert SAR units) and distress (reasonably certain of grave and imminent danger: launch SAR, fix the position and search area, notify the operator, the State of Registry and the investigators).','Emergency phases'],
 ['When search action starts',320,170,
  L('M20 70H300','sk',1.4)+L('M30 64V76M190 62V78M270 62V78','sk',1.4)
  +T(30,54,'depart','t2','middle')+T(190,54,'ETA','t1','middle')+T(270,54,'ETA + 30 min','t1 tr','middle')
  +'<rect x="190" y="64" width="80" height="12" class="fm" opacity=".3"/>'+plane(110,70,90,'a',1.1)
  +T(270,96,'overdue action,','t2 tr','middle')+T(270,110,'SAR begins','t2 tr','middle')
  +T(20,140,'Diverting, or 30 min late or more?','t1')+T(20,156,'Tell the destination before ETA + 30 min','t2'),
  'If you have filed a flight plan and haven\'t arrived within 30 minutes of your ETA, overdue action and search and rescue begin. If you divert, or expect to be 30 minutes or more late, tell the original destination before then.','SAR watch']
]);

/* ---- 15 Accident Investigation Regulations ---- */
add('Accident Investigation Regulations',[
 ['Is it an accident?',320,244,
  T(20,18,'someone boards to fly','t2')+T(300,18,'all have left','t2','end')+L('M20 30H300','sk',1.2)+head(290,30,300,30,'k')+L('M20 24V36','sk',1.2)
  +T(8,58,'An accident if any of:','t1')
  +[['death or serious injury'],['damage needing major repair'],['the aircraft is missing']].map(function(r,i){var y=66+i*28;return'<rect x="8" y="'+y+'" width="188" height="22" rx="5" class="fr" opacity=".12"/>'+T(16,y+15,r[0],'t2')}).join('')
  +box(204,46,108,108,'var(--good)')+T(212,64,'Not counted','t1 tg')+lines(212,82,['engine only','propeller','wingtips, aerials','tyres, brakes','small dents'])
  +T(8,180,'Tell, by the quickest means:','t1')
  +box(8,190,148,46,'var(--accent)')+T(16,208,'AAIB','t1 ta')+T(16,224,'Chief Inspector','t2')+box(164,190,148,46,'var(--accent)')+T(172,208,'Police','t1 ta')+T(172,224,'if in or over the UK','t2'),
  'Between someone boarding with the intention of flight and everyone leaving, it is an accident if someone is killed or seriously injured by the aircraft (including parts that fall off, and jet blast), the aircraft suffers damage needing major repair, or it goes missing. Damage limited to the engine, propeller, wingtips, aerials, tyres, brakes or small dents does not count. The commander tells the AAIB and the police.','What counts as an accident']
]);

/* ---- 16 ICAO Annex Terminology ---- */
add('ICAO Annex Terminology',[
 ['Manoeuvring area and movement area',320,212,
  T(160,28,'runway','t2','middle')+'<rect x="20" y="36" width="280" height="18" rx="2" class="fa" opacity=".4"/>'
  +'<rect x="74" y="54" width="12" height="60" class="fa" opacity=".4"/><rect x="74" y="104" width="132" height="12" class="fa" opacity=".4"/>'+T(140,134,'taxiway','t2','middle')
  +'<rect x="206" y="80" width="100" height="62" rx="4" class="fm" opacity=".3"/>'+plane(234,104,180,'k',.9)+plane(278,104,180,'k',.9)+T(256,134,'apron','t1 tm','middle')
  +'<rect x="20" y="156" width="14" height="10" class="fa" opacity=".4"/>'+T(40,165,'manoeuvring area: runways, taxiways','t2')
  +'<rect x="20" y="174" width="14" height="10" class="fm" opacity=".3"/>'+T(40,183,'apron','t2')
  +T(160,204,'movement area = both together','t1','middle'),
  'The manoeuvring area is the part used for taxiing, take-off and landing, excluding aprons. The movement area is the manoeuvring area plus the aprons.','Aerodromes'],
 R('Aerodromes','TORA, TODA and clearway','Declared distances'),
 R('Aerodromes','ASDA with and without a stopway','Declared distances'),
 R('Aerodromes','Landing distance available (LDA)','Declared distances'),
 ['Altitude, height and elevation',320,226,
  T(160,18,'Flight level: like altitude, but from 1013 hPa','t2','middle')
  +'<path d="M124 200L150 160H312V200Z" class="gnd"/><rect x="214" y="155" width="86" height="5" fill="var(--ink-3)"/>'+'<rect x="8" y="200" width="304" height="6" class="fa" opacity=".2"/>'+L('M8 200H312','s2',1,'5 3')
  +side(200,52,.7,'a')+L('M16 56H178','s2',1,'2 3')+vdim(16,56,200,'a')+T(22,120,'altitude','t1 ta')+T(22,134,'from MSL','t2')
  +vdim(250,56,160,'g')+T(244,110,'height','t1 tg','end')+T(244,124,'from a datum','t2','end')
  +L('M100 160H148','s2',1,'2 3')+vdim(100,160,200,'m')+T(94,184,'elevation','t1 tm','end')
  +T(160,220,'mean sea level','t2','middle'),
  'Altitude is the vertical distance from mean sea level; height is from a specified datum such as the aerodrome; elevation is the height above mean sea level of a point on the ground (aerodrome elevation is the highest point of the landing area). A flight level is a pressure altitude based on 1013.2 hPa.','Heights and levels'],
 R('VFR, IFR and Special VFR (Skyway Code)','Control zone and control area','ATS and airspace')
]);
})();
