/* ===== Airspace and Air Traffic Services diagrams, style B (library: labs80b.js; how-to: .claude/skills/ppl-diagram) =====
   Each F entry: [title, viewBox width, height, drawing, caption]; SEC gives the note section it sits in. */
(function(){
var T=dbT,L=dbL,AR=dbAR,head=dbHead,plane=dbPlane,side=dbSide,arc=dbArc,sector=dbSector,n=dbN;
function sea(x1,x2,y,h){return'<path d="M'+x1+' '+y+'H'+x2+'V'+(y+(h||8))+'H'+x1+'Z" fill="var(--ch-wt)"/>'}
function box(x,y,w,h,fill,stroke,dash){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+(fill||'none')+'" stroke="'+(stroke||'var(--line-2)')+'" stroke-width="1.3"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'}
/* two-headed dimension */
function dimH(x1,x2,y,c){return AR('M'+((x1+x2)/2)+' '+y+'H'+(x1+1),x1+8,y,x1,y,c,1.1)+AR('M'+((x1+x2)/2)+' '+y+'H'+(x2-1),x2-8,y,x2,y,c,1.1)}
function dimV(x,y1,y2,c){return AR('M'+x+' '+((y1+y2)/2)+'V'+(y1+1),x,y1+8,x,y1,c,1.1)+AR('M'+x+' '+((y1+y2)/2)+'V'+(y2-1),x,y2-8,x,y2,c,1.1)}
/* table: cols [[width,'Head'],...], rows of cells ('text' or ['text','colour class']) */
function tbl(x,y,cols,rows,rh){var s='',cx=x,W=cols.reduce(function(a,c){return a+c[0]},0);
 s+='<rect x="'+x+'" y="'+y+'" width="'+W+'" height="'+rh+'" fill="var(--surface-2)"/>';
 cols.forEach(function(c){s+=T(cx+4,y+rh-7,c[1],'t1');cx+=c[0]});
 rows.forEach(function(r,i){var yy=y+rh*(i+1);if(i%2)s+='<rect x="'+x+'" y="'+yy+'" width="'+W+'" height="'+rh+'" fill="var(--surface-2)" opacity=".5"/>';cx=x;
  r.forEach(function(v,j){var c=j?'t2':'t1';if(typeof v==='object'){c+=' '+v[1];v=v[0]}s+=T(cx+4,yy+rh-7,v,c);cx+=cols[j][0]})});
 return s+L('M'+x+' '+(y+rh)+'H'+(x+W),'s2',1)}

var A=[
/* 1 */['FIRs and UIRs (not to scale)',320,210,
  '<path d="M60 150H312V196H60Z" fill="var(--accent-soft)"/><path d="M60 40H312V150H60Z" fill="var(--surface-2)"/>'
  +L('M60 150H312','sa',1.4)+L('M60 40H312','sk',1.4)+sea(60,312,196,8)
  +T(186,170,'London and Scottish FIRs','t1','middle')+T(186,186,'surface to FL245','t2','middle')
  +T(186,90,'London and Scottish UIRs','t1','middle')+T(186,104,'FL245 to FL660','t2','middle')
  +T(54,154,'FL245','t1','end')+T(54,44,'FL660','t1','end')+T(54,200,'SFC','t1','end'),
  'Two UK Flight Information Regions, London and Scottish, run from the surface to FL245. The upper airspace above them forms the London and Scottish Upper Information Regions, FL245 to FL660.'],
/* 2 */['CTR, TMA, airway and ATZ (side view, not to scale)',320,200,
  sea(8,312,188,8)+'<path d="M8 188V182H312V188Z" class="gnd"/>'
  +'<path d="M108 182V98H212V182Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>'+T(160,118,'CTR','t1','middle')+T(160,132,'from the surface','t2','middle')
  +'<path d="M64 98V62H256V98Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.4"/>'+T(160,78,'TMA (a CTA)','t1','middle')+T(160,92,'from a base altitude','t2','middle')
  +'<path d="M8 62V24H312V62H262V48H58V62Z" fill="var(--surface-2)" stroke="var(--ink-3)" stroke-width="1.2"/>'+T(160,40,'airway: 5 nm either side','t2','middle')
  +'<path d="M138 182V150H182V182" fill="none" class="sr" stroke-width="1.3" stroke-dasharray="3 2"/>'+T(160,168,'ATZ','t2 tr','middle')+'<path d="M152 182H168V178H152Z" fill="var(--ink-3)"/>',
  'A Control Zone starts at the surface; a Control Area (including a TMA) and an airway start at a base, and an airway base often steps down near aerodromes. An ATZ can sit inside a CTR.'],
/* 3 */['Special VFR minima (inside a Control Zone)',320,214,
  box(8,8,304,150,'var(--accent-soft)','var(--accent)')+T(16,26,'Control Zone only','t1 ta')
  +'<path d="M150 30Q164 18 180 26Q196 14 214 26Q236 22 236 38Q236 50 214 48H160Q144 48 150 30Z" fill="var(--surface)" stroke="var(--ink-3)"/>'+T(244,42,'clear of cloud','t2')
  +side(116,80,.55,'a')+T(150,78,'140 kt or less','t1')+T(150,92,'visibility 1,500 m+','t2')
  +'<path d="M8 150V140Q60 130 120 140T312 136V150Z" class="gnd"/>'+T(16,128,'in sight of the surface','t2')
  +T(8,180,'Aerodrome limits','t1 tr')+T(8,194,'no take-off, landing or ATZ entry if it reports','t2')+T(8,208,'visibility below 1,500 m or ceiling below 600 ft','t2'),
  'Special VFR is an ATC authorisation: no flight plan, but ATC approval is needed, and ATC separate SVFR flights from other SVFR and IFR traffic.'],
/* 4 */['Crossing the base of an airway',320,212,
  T(8,16,'Plan view','t1')+'<path d="M8 40H312V100H8Z" fill="var(--surface-2)" stroke="var(--ink-3)"/>'+L('M8 70H312','s2',1,'8 5')+T(306,64,'B1: Class A, FL75+','t2','end')
  +AR('M160 118V26',160,34,160,22,'g',1.6)+T(166,118,'at right angles','t2 tg')
  +dimV(30,40,70,'k')+dimV(30,70,100,'k')+T(36,58,'5 nm','t2')+T(36,90,'5 nm','t2')
  +T(8,140,'Side view','t1')+'<path d="M8 148H312V172H8Z" fill="var(--surface-2)" stroke="var(--ink-3)"/>'+T(160,164,'airway: do not enter','t2','middle')
  +L('M8 172H312','sr',1.4)+T(306,188,'base FL75','t2 tr','end')+side(140,196,.5,'a')+T(172,204,'below, in VMC','t2 ta'),
  'Without an instrument rating you may pass under an airway whose base is a flight level, at right angles, in VMC, but never inside it. To cross through it you need an IR, a flight plan and a crossing clearance requested 10 minutes ahead.'],
/* 5 */['ATZ dimensions (plan to scale)',320,214,
  (function(){var k=28,s='';[[84,98,2,'runway 1,850 m or less','2 nm'],[236,98,2.5,'runway over 1,850 m','2.5 nm']].forEach(function(z,i){var r=z[2]*k,cx=z[0],cy=z[1],len=(i?2400:1600)/1852*k;
   s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.2"/>'
   +'<path d="M'+n(cx-len/2*.94)+' '+n(cy+len/2*.34)+'L'+n(cx+len/2*.94)+' '+n(cy-len/2*.34)+'" stroke="var(--ink-3)" stroke-width="4"/><circle cx="'+cx+'" cy="'+cy+'" r="2" class="fr"/>'
   +AR('M'+cx+' '+cy+'V'+(cy+r-1),cx,cy+r-8,cx,cy+r,'k',1.1)+T(cx+5,cy+r/2+10,z[4],'t1')+T(cx,i?cy-r-6:cy-r-8,z[3],'t2','middle')});return s})()
  +T(160,192,'surface to 2,000 ft aal','t1','middle')+T(160,206,'centred on the longest runway','t2','middle'),
  'Radius 2 nm if the longest runway is 1,850 m or less, 2.5 nm if longer (some 2 nm ATZs are enlarged to give 1.5 nm beyond every runway end). Runways drawn to the same scale: 1,600 m and 2,400 m.'],
/* 6 */['MATZ dimensions (to scale)',320,266,
  (function(){var k=12,cx=80,cy=86,r=5*k,s=T(8,16,'Plan','t1'),sx=cx+r*Math.cos(Math.asin(2/5));
   s+='<path d="M'+n(sx)+' '+(cy-2*k)+'H'+(cx+r+5*k)+'V'+(cy+2*k)+'H'+n(sx)+'" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.2"/>';
   s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.2"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(2.5*k)+'" fill="none" class="sr" stroke-dasharray="3 2"/>';
   s+='<path d="M'+(cx-14)+' '+cy+'H'+(cx+14)+'" stroke="var(--ink-3)" stroke-width="4"/>'+dimH(cx-r,cx,cy+12,'k')+T(cx-r/2,cy+26,'5 nm','t2','middle');
   s+=dimH(cx+r,cx+r+5*k,cy+2*k+10,'k')+T(cx+r+2.5*k,cy+2*k+24,'5 nm','t2','middle');
   s+=dimV(cx+r+5*k+8,cy-2*k,cy+2*k,'k')+T(cx+r+5*k+14,cy+4,'4 nm wide','t2');
   s+=T(cx,cy+r+16,'ATZ inside (dashed)','t2 tr','middle');
   var y0=252,h=22;s+=T(8,176,'Side','t1')+'<path d="M'+(cx-r)+' '+y0+'V'+(y0-3*h)+'H'+(cx+r+5*k)+'V'+(y0-h)+'H'+(cx+r)+'V'+y0+'Z" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.2"/>'
    +L('M8 '+y0+'H312','sk',1.2)+'<path d="M'+(cx-2.5*k)+' '+y0+'V'+(y0-2*h)+'H'+(cx+2.5*k)+'V'+y0+'" fill="none" class="sr" stroke-dasharray="3 2"/>'
    +T(cx+r+5*k+6,y0-h+4,'1,000 ft','t2')+T(cx+r+5*k+6,y0-3*h+4,'3,000 ft aal','t2');
   return s})(),
  'MATZ: surface to 3,000 ft aal, radius 5 nm. Stubs along the final approach: 4 nm wide, 5 nm beyond the circle, from 1,000 to 3,000 ft aal. The ATZ inside always applies. Distances to scale; heights to their own scale.'],
/* 7 */['UK airspace classes at a glance',320,192,
  tbl(8,8,[[44,'Class'],[72,'VFR?'],[188,'UK use']],[
   [['A','tr'],'no','airways, London/Manchester TMA'],['B','-','not used in the UK'],[['C','ta'],'clearance','above FL195; some CTAs'],
   [['D','ta'],'clearance','most CTRs and CTAs'],['E','yes','some CTAs, Scottish TMA parts'],['F','-','not used in the UK'],[['G','tg'],'yes','open FIR, incl. MATZs']],22),
  'Controlled airspace is A to E; uncontrolled is F and G. VFR in C and D needs flight notification and an ATC clearance. Class A covers most airways and the London and Manchester TMAs.'],
/* 8 */['Reading a Danger Area',320,222,
  '<circle cx="62" cy="58" r="40" fill="none" stroke="#d8312c" stroke-width="2.4"/>'+T(62,62,'D129/1.75','t1','middle')+T(62,118,'solid red:','t2','middle')+T(62,132,'active as published','t2','middle')
  +'<circle cx="190" cy="58" r="40" fill="none" stroke="#d8312c" stroke-width="2.4" stroke-dasharray="7 5"/>'+T(190,62,'D044/3.2','t1','middle')+T(190,118,'pecked red:','t2','middle')+T(190,132,'only if NOTAMed','t2','middle')
  +T(282,46,'*D141','t1','middle')+T(282,62,'* = by-laws:','t2','middle')+T(282,76,'no entry','t2','middle')+T(282,90,'when active','t2','middle')
  +box(8,148,304,66,'var(--surface-2)')+T(16,170,'D 1 29 / 1.75','t1')+T(124,166,'D: Danger (P, R)','t2')+T(124,180,'1: band 51° to 52°N','t2')+T(124,194,'29: area number','t2')+T(124,208,'1.75: top 1,750 ft','t2'),
  'P is Prohibited, R Restricted, D Danger. The top is in thousands of feet amsl; "1-2.5" after the slash would mean 1,000 to 2,500 ft amsl. Check the chart legend: other charts may draw areas differently.'],
/* 9 */['Low-level hazards (heights agl, to scale)',320,216,
  (function(){var y0=200,k=.085,s='';function y(ft){return y0-ft*k}
   s+=L('M44 '+y0+'H312','sk',1.2)+[0,500,1000,1500,2000].map(function(f){return L('M44 '+n(y(f))+'H312','s2',.6)+T(40,n(y(f)+4),f?f.toLocaleString('en-GB'):'0','t2','end')}).join('');
   s+='<rect x="50" y="'+n(y(500))+'" width="44" height="'+n(250*k)+'" class="fr" opacity=".55"/><rect x="50" y="'+n(y(2000))+'" width="44" height="'+n(1500*k)+'" class="fr" opacity=".15"/>'+T(72,n(y(2000)-5),'military','t2','middle')+T(72,n(y(250)+13),'low flying','t2','middle');
   s+='<path d="M118 '+y0+'V'+n(y(2000))+'" class="sk" stroke-width="1.4" stroke-dasharray="2 2"/>'+T(122,n(y(2000)+12),'winch cable','t2')+T(122,n(y(2000)+26),'2,000 ft','t2');
   s+='<path d="M186 '+y0+'V'+n(y(1000))+'" class="s2"/><circle cx="186" cy="'+n(y(1000))+'" r="6" class="fm"/>'+T(196,n(y(1000)+4),'balloon','t2')+T(196,n(y(1000)+18),'1,000 ft','t2');
   s+=L('M250 '+n(y(1500))+'H312','sa',1.4)+T(310,n(y(1500)-5),'birds 1,500 ft','t2 ta','end');
   s+='<rect x="250" y="'+n(y(500))+'" width="62" height="'+n(500*k)+'" class="fm" opacity=".25"/>'+T(281,n(y(500)+14),'small arms','t2','middle')+T(281,n(y(500)+28),'500 ft','t2','middle');
   return s})(),
  'Military low flying is busiest at 250 to 500 ft agl (dark band). Higher up: parachuting to FL150 within 1.5 nm of a drop zone, and target towing to 10,000 ft.']
];
var ASEC=['Flight Information Regions','Control Zones, TMAs','Special VFR','Crossing an airway','Aerodrome Traffic Zones','Military Aerodrome','UK airspace classes','Prohibited, Restricted and Danger','Other hazards'];
DSEC['Airspace']=A.map(function(f,i){return[ASEC[i],dbFig(f[0],f[1],f[2],f[3],f[4])]});

var S=[
/* 1 */['What each class gives you',320,192,
  tbl(8,8,[[44,'Class'],[66,'Clearance'],[94,'IFR sep. from'],[100,'VFR get']],[
   ['A','all','all (IFR only)','(no VFR)'],['B','all','all','sep. from all'],['C','all','IFR and VFR','IFR sep., VFR TI'],
   ['D','all','IFR','TI on all'],['E','IFR only','IFR','TI if practical'],['F','none','(advisory)','on request'],['G','none','-','on request']],22),
  'TI = traffic information. In Class C, VFR flights are separated from IFR and get traffic information on other VFR. In Class D, VFR flights are not separated from anyone: look out. Avoidance advice is available on request in C and D.'],
/* 2 */['Who you are talking to',320,240,
  [['Tower, Approach, Ground','ATC',['clearances,','instructions'],'a'],['… Information','AFIS',['information in the air,','instructions on ground'],'g'],['… Radio','A/G radio',['basic information,','not ATC'],'m']].map(function(r,i){var y=8+i*46;
   return box(8,y,304,40,'var(--surface-2)')+'<rect x="8" y="'+y+'" width="6" height="40" class="f'+r[3]+'"/>'+T(22,y+17,r[0],'t1')+T(22,y+32,r[1],'t2')+T(176,y+17,r[2][0],'t2')+T(176,y+32,r[2][1],'t2')}).join('')
  +'<path d="M60 224V160H220V224" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.2"/>'+L('M8 224H312','sk',1.2)+'<path d="M132 224H148V220H132Z" fill="var(--ink-3)"/>'
  +T(140,178,'Safetycom 135.480','t1','middle')+T(140,192,'below 2,000 ft aal','t2','middle')+T(140,206,'within 10 nm','t2','middle')+T(230,196,'unattended','t2')+T(230,210,'airfields','t2'),
  'The callsign suffix tells you the service. Safetycom is for airfields without their own frequency, below 2,000 ft aal and within 10 nm; keep calls short.'],
/* 3 */['The four UK FIS outside controlled airspace',320,250,
  [['Basic','a',['no radar needed','ATCO or FISO','IFR and VFR','no traffic info expected']],['Traffic','a',['radar, identified','IFR and VFR','radar traffic info','headings to sequence']],
   ['Deconfliction','a',['radar, identified','IFR only','traffic info + avoidance','headings to deconflict']],['Procedural','a',['no radar','IFR','limited traffic info','radials, times, levels']]].map(function(c,i){var x=8+(i%2)*156,y=8+Math.floor(i/2)*106;
   return box(x,y,148,98,'none','var(--line-2)')+T(x+10,y+20,c[0],'t1 ta')+c[2].map(function(t,k){return T(x+10,y+38+k*14,t,'t2')}).join('')}).join('')
  +T(160,236,'In every one, you avoid collisions','t1 tr','middle'),
  'Whatever the service, in Class G the pilot is ultimately responsible for collision avoidance and terrain clearance. An alerting service comes with all four.'],
/* 4 */['Deconfliction minima',320,204,
  T(80,18,'Unknown traffic','t1','middle')+'<circle cx="80" cy="96" r="60" fill="var(--accent-soft)" stroke="var(--accent)" stroke-dasharray="5 3"/>'+plane(80,96,0,'a',1.2)+AR('M80 96H139',131,96,139,96,'k',1)+T(112,88,'5 nm','t2','middle')
  +T(80,178,'5 nm laterally','t1','middle')+T(80,194,'or 3,000 ft vertically','t2','middle')
  +T(240,18,'Co-ordinated traffic','t1','middle')+'<circle cx="240" cy="96" r="36" class="fg" opacity=".15"/><circle cx="240" cy="96" r="36" class="sg" fill="none" stroke-dasharray="5 3"/>'+plane(240,96,0,'a',1.2)+AR('M240 96H275',267,96,275,96,'k',1)+T(258,88,'3 nm','t2','middle')
  +T(240,178,'3 nm or 1,000 ft','t1','middle')+T(240,194,'(some military: 500 ft)','t2','middle'),
  'Plan view, circles to scale with each other. Against unknown traffic the aim is 5 nm or 3,000 ft; against traffic co-ordinated with the controller, 3 nm or 1,000 ft. The minima are aimed at, not guaranteed, and only given at or above the unit\'s terrain safe level.'],
/* 5 */['Flight plan timings',320,222,
  T(8,18,'Departure delayed','t1')+L('M20 66H300','sk',1.4)+[[40,'planned ETD'],[130,'+30 min'],[220,'+60 min']].map(function(p){return L('M'+p[0]+' 58V74','sk',1.4)+T(p[0],50,p[1],'t2','middle')}).join('')
  +T(20,94,'+30 min: re-file if any of it is in CAS','t2')+T(20,108,'+60 min: re-file otherwise','t2')
  +T(8,142,'Overdue','t1')+L('M20 180H300','sk',1.4)+L('M80 172V188','sk',1.4)+T(80,166,'ETA','t2','middle')+L('M200 172V188','sr',1.6)+T(200,166,'ETA + 30 min','t2 tr','middle')+T(200,206,'search and rescue','t2 tr','middle'),
  'Close your flight plan on arrival, and tell your original destination if you land elsewhere. With no ATSU there, leave a responsible person who knows your ETA. If no arrival report arrives within 30 minutes of the ETA, alerting action starts.']
];
var SSEC=['Services in each airspace class','AFIS, A/G radio','UK Flight Information Services','Deconfliction Service','Flight plans'];
DSEC['Air Traffic Services']=S.map(function(f,i){return[SSEC[i],dbFig(f[0],f[1],f[2],f[3],f[4])]});
})();
