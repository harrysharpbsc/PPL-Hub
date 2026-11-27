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

/* ---------- 06 Airspace ---------- */
function wave(x1,x2,y){var d='M'+x1+' '+y;for(var x=x1;x<x2;x+=8)d+='q2 -2 4 0t4 0';return'<path d="M'+x1+' '+y+'H'+x2+'V'+(y+8)+'H'+x1+'Z" fill="var(--ch-wt)"/>'+'<path d="'+d+'" stroke="var(--ch-rv)" stroke-width="1" fill="none"/>'}
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
