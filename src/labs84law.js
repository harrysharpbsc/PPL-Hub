/* ===== Aviation Law and organisations + Operations of Aircraft diagrams, style B
   (library: labs80b.js; how-to: .claude/skills/ppl-diagram). Each entry: [title, width, height, drawing, caption]. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
function box(x,y,w,h,fill,stroke,sw){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="'+(fill||'none')+'" stroke="'+(stroke||'var(--line-2)')+'" stroke-width="'+(sw||1.2)+'"/>'}
function down(x,y1,y2){return AR('M'+x+' '+y1+'V'+(y2-2),x,y2-8,x,y2,'k',1.1)}

var OPS=[
/* 1 */['Three ways EASA classifies an operation',320,214,
  box(80,8,160,30,'var(--accent-soft)','var(--accent)')+T(160,28,'Civil aviation activity','t1','middle')
  +[['Remuneration?','Commercial',['Non-commercial']],['Activity?','Air transport',['Specialised','operation']],['Aircraft?','Complex',['Other than','complex']]].map(function(r,i){var y=56+i*50;
   return T(8,y+22,r[0],'t1')+box(108,y,90,36,'var(--surface-2)')+T(153,y+22,r[1],'t2','middle')+T(203,y+22,'or','t2 tm')+box(220,y,92,36,'var(--surface-2)')
    +(r[2].length>1?T(266,y+16,r[2][0],'t2','middle')+T(266,y+30,r[2][1],'t2','middle'):T(266,y+22,r[2][0],'t2','middle'))}).join('')
  +T(160,208,'every operation gets all three labels','t2 ta','middle'),
  'Commercial or not depends on payment; air transport or specialised on the activity; complex or not on the aircraft. Every operation is classified all three ways at once.'],
/* 2 */['What makes an aeroplane complex',320,232,
  [['MTOM over','5,700 kg'],['Passenger seats','more than 19'],['Minimum crew','2 pilots'],['Engines','turbojet, or 2+ turboprop']].map(function(r,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*84;
   return box(x,y,148,76,'none','var(--accent)')+T(x+56,y+28,r[0],'t2')+T(x+56,y+44,r[1].split(', ')[0]+(r[1].indexOf(', ')>0?',':''),'t1')+(r[1].indexOf(', ')>0?T(x+56,y+60,r[1].split(', ')[1],'t1'):'')}).join('')
  +'<g transform="translate(36 46)"><path d="M-18 10H18L14-6H-14Z" fill="var(--ink-3)"/><text y="6" text-anchor="middle" style="font:600 11px var(--f-body);fill:var(--surface)">kg</text></g>'
  +'<g transform="translate(192 46)">'+[0,1,2,3].map(function(r){return[0,1,2,3,4].map(function(c){return'<rect x="'+(-17+c*7)+'" y="'+(-14+r*7)+'" width="5" height="5" rx="1" fill="var(--ink-3)"/>'}).join('')}).join('')+'</g>'
  +'<g transform="translate(36 130)"><circle cx="-8" cy="-6" r="5" fill="var(--ink-3)"/><circle cx="8" cy="-6" r="5" fill="var(--ink-3)"/><path d="M-16 12C-16 2-12 0-8 0S0 2 0 12ZM0 12C0 2 4 0 8 0S16 2 16 12Z" fill="var(--ink-3)"/></g>'
  +'<g transform="translate(190 114) scale(.62)"><path d="M-22-7.5H8L18-4.5H22V4.5H18L8 7.5H-22Z" fill="var(--ink-3)"/><path d="M-12-7.5V7.5M0-7.5V7.5" stroke="var(--surface)" stroke-width=".8" opacity=".6"/><ellipse cx="-22" cy="0" rx="3.2" ry="8" fill="var(--ink)"/><ellipse cx="-22.4" cy="0" rx="1.8" ry="6" fill="var(--surface-2)"/><path d="M22-3L28 0L22 3Z" fill="var(--ink)"/><path d="M30-2.5q3-2 6 0t6 0M30 2.5q3 2 6 0t6 0" fill="none" stroke="var(--mid)" stroke-width="1.4"/></g>'
  +'<text x="190" y="134" text-anchor="middle" style="font:500 11px var(--f-body);fill:var(--ink-2)">or</text>'
  +[178,204].map(function(cx){return'<g transform="translate('+cx+' 150) scale(.95)"><path d="M-7-3.5H8L13-2V2L8 3.5H-7Z" fill="var(--ink-3)"/><path d="M-7-3Q-11.5 0-7 3Z" fill="var(--ink)"/><path d="M-9.5-1L-10.6-10.5Q-9.5-11.5-8.4-10.5ZM-9.5 1L-10.6 10.5Q-9.5 11.5-8.4 10.5Z" fill="var(--ink)"/></g>'}).join('')
  +T(160,198,'Any one of these makes it complex','t1 tr','middle')+T(160,214,'a typical PPL single meets none','t2','middle'),
  'An aeroplane is complex if it has an MTOM over 5,700 kg, more than 19 passenger seats, a minimum crew of 2 pilots, or at least one turbojet or more than one turboprop.'],
/* 3 */['Which rules for a G-registered aeroplane?',320,248,
  box(8,8,304,30,'var(--accent-soft)','var(--accent)')+T(160,28,'UK SERA: everyone in UK airspace','t1','middle')
  +down(82,38,52)+down(238,38,52)
  +box(8,52,148,30,'none','var(--good)',1.6)+T(82,72,'Part-21 aircraft','t1 tg','middle')+box(164,52,148,30,'none','var(--mid)',1.6)+T(238,72,'Non-Part-21','t1 tm','middle')
  +T(82,98,'modern factory-built','t2','middle')+T(238,98,'vintage, ex-military,','t2','middle')+T(238,112,'amateur-built, microlights','t2','middle')
  +[[8,'Licensing','Part-FCL',''],[84,'Operations','Part-NCO',''],[164,'Licensing','ANO Part 6','Schedule 8'],[240,'Operations','ANO Part 5','Schedule 5']].map(function(b){
   return box(b[0],124,72,64,'var(--surface-2)')+T(b[0]+36,142,b[1],'t2','middle')+T(b[0]+36,158,b[2],'t1','middle')+(b[3]?T(b[0]+36,174,b[3],'t2','middle'):'')}).join('')
  +box(8,204,304,34,'none','var(--ink-3)')+T(160,226,'ANO 2016: safety rules for all','t2','middle'),
  'The rules of the air apply to everyone in UK airspace. Licensing and operating rules depend on whether the aircraft is a Part-21 type or not. The Air Navigation Order 2016 adds safety rules for all aircraft and people.']
];
DSEC['Operations of Aircraft']=OPS.map(function(f,i){return[['EASA classifies','Definition of complex','Documents for a UK pilot'][i],dbFig(f[0],f[1],f[2],f[3],f[4])]});

function col(x,head,items,c){var s=box(x,96,96,36,'var(--accent-soft)','var(--'+c+')',1.4)+T(x+48,111,head[0],'t1','middle')+T(x+48,125,head[1],'t2','middle')+L('M'+(x+48)+' 84V96','s2',1);
 items.forEach(function(it,i){var y=142+i*36;s+=L('M'+(x+48)+' '+(y-10)+'V'+y,'s2',1)+box(x,y,96,30,'var(--surface)','var(--ink-3)')+T(x+6,y+13,it[0],'t1')+T(x+6,y+26,it[1],'t2')});return s}
var LAW=[
/* 1 */['From Paris to the UK on its own',320,200,
  L('M14 100H306','sk',2)+[[34,'1919','Paris','Convention'],[94,'1944','Chicago','Convention'],[154,'1947','ICAO formed','in Montreal'],[214,'2021','UK leaves','EASA'],[268,'Now','CAA, ANO,','assimilated law']].map(function(r,i){var up=i%2===0;
   return'<circle cx="'+r[0]+'" cy="100" r="6" class="fa" stroke="var(--surface)" stroke-width="2"/>'+L('M'+r[0]+' '+(up?94:106)+'V'+(up?72:128),'s2',1)+T(r[0],up?64:144,r[1],'t1','middle')+T(r[0],up?32:162,r[2],'t2','middle')+T(r[0],up?46:176,r[3],'t2','middle')}).join(''),
  'Paris 1919 set the first principles. Chicago 1944 created the obligations, and ICAO followed in 1947. Since 2021 the UK regulates itself, through the CAA, the ANO and assimilated law.'],
/* 2 */['The AIP and the 28-day AIRAC cycle',320,200,
  [['GEN','national rules,','services, charges','a'],['ENR','en-route rules,','airspace, warnings','g'],['AD','licensed','aerodromes','m']].map(function(r,i){var y=10+i*52;
   return box(8,y,50,42,'none','var(--'+{a:'accent',g:'good',m:'mid'}[r[3]]+')',1.6)+T(33,y+26,r[0],'t1 t'+r[3],'middle')+T(68,y+18,r[1],'t2')+T(68,y+32,r[2],'t2')}).join('')
  +'<g transform="translate(262 84)"><circle r="44" fill="none" stroke="var(--ink-3)" stroke-width="6" stroke-dasharray="17.5 5.5"/>'+T(0,-2,'AIRAC','t1','middle')+T(0,14,'every 28 days','t2','middle')+'</g>'
  +T(160,186,'temporary: NOTAMs and AIP Supplements','t2','middle'),
  'GEN covers the national framework, ENR flying between places, AD the aerodromes. Lasting changes come in on fixed AIRAC dates every 28 days; temporary ones come by NOTAM or AIP Supplement.'],
/* 3 */['AIC colours',320,190,
  [['Pink','air safety','#f2a9c4'],['White','administrative','#ffffff'],['Yellow','operational, ATS','#f6e27a'],['Mauve','UK restrictions','#c9a3e0'],['Green','maps and charts','#a9d8a0']].map(function(r,i){var y=10+i*35;
   return'<rect x="8" y="'+y+'" width="40" height="27" rx="3" fill="'+r[2]+'" stroke="var(--ink-3)"/>'+T(58,y+12,r[0],'t1')+T(58,y+26,r[1],'t2')}).join('')
  +box(186,30,126,124,'none','var(--bad)',1.4)+T(249,52,'Read the pink','t1 tr','middle')+T(249,66,'ones: safety','t1 tr','middle')+T(249,90,'take-off, climb and','t2','middle')+T(249,104,'landing performance','t2','middle')+T(249,122,'wake turbulence','t2','middle')+T(249,140,'and more','t2','middle'),
  'Aeronautical Information Circulars are colour coded. Pink ones carry safety advice (performance, wake turbulence and more) and can come up in the exam.'],
/* 4 */['NOTAM types',320,180,
  [['NOTAMN','new','g'],['NOTAMR','replaces an earlier one','m'],['NOTAMC','cancels an earlier one','r']].map(function(r,i){var y=10+i*50;
   return box(8,y,96,36,'none','var(--'+{g:'good',m:'mid',r:'bad'}[r[2]]+')',1.8)+T(56,y+23,r[0],'t1 t'+r[2],'middle')+AR('M110 '+(y+18)+'H146',138,y+18,148,y+18,'k',1.2)+T(156,y+23,r[1],'t1')}).join('')
  +T(160,172,'check NOTAMs on the day you fly','t2 ta','middle'),
  'Restrictions, closures, temporary obstacles and displays come by NOTAM. Larger temporary changes come as AIP Supplements.'],
/* 5 */['How the UK Aeronautical Information Service fits together',320,362,
  box(70,8,180,26,'var(--accent-soft)','var(--accent)')+T(160,26,'Aeronautical Information Service','t1 ta','middle')
  +L('M160 34V42','s2',1)+box(86,42,148,36,'none','var(--accent)',1.6)+T(160,58,'AIP','t1','middle')+T(160,72,'amendments, supplements','t2','middle')
  +L('M86 60H80M234 60H240','s2',1)+box(8,46,72,28)+T(44,65,'NOTAM','t1','middle')+box(240,46,72,28)+T(276,65,'AIC','t1','middle')
  +L('M58 84H262','s2',1)+L('M160 78V84','s2',1)
  +col(10,['Part 1: GEN','general'],[['GEN 1','national rules'],['GEN 2','tables, codes'],['GEN 3','services'],['GEN 4','charges']],'accent')
  +col(112,['Part 2: ENR','en route'],[['ENR 1','rules'],['ENR 2','ATS airspace'],['ENR 3','ATS routes'],['ENR 4','radio nav aids'],['ENR 5','nav warnings'],['ENR 6','charts']],'good')
  +col(214,['Part 3: AD','aerodromes'],[['AD 1','introduction'],['AD 2','aerodromes'],['AD 3','heliports']],'mid'),
  'The AIP holds lasting information and changes every 28 days (AIRAC); each part starts with a section 0, the preface and contents. Interception procedures are in ENR 1.12. NOTAMs carry short-notice changes, AICs carry advice and administrative notices.']
];
DSEC['Aviation Law and organisations']=LAW.map(function(f,i){return[['International Civil Aviation','Aeronautical Information Publication','Aeronautical Information Circulars','NOTAMs and Air Supplements','Aeronautical Information Publication'][i],dbFig(f[0],f[1],f[2],f[3],f[4])]});
})();
