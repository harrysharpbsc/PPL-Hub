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

/* ---------- 03 Rules of the Air ---------- */
var R='Rules of the Air';
sec(R,'Collision avoidance',[
 F('Constant bearing means a collision course',
  L('M250 200V40','var(--accent)',1.2,'3 3')+L('M70 40H250','var(--ink-2)',1.2,'3 3')+'<circle cx="250" cy="40" r="6" fill="var(--bad)" opacity=".85"/>'+T(262,36,'collision','d1',null,null,'var(--bad)')
  +[[190,100],[140,150],[90,200]].map(function(p,i){return L('M'+(250)+' '+(p[0]-12)+'L'+(p[1]+10)+' 50','var(--good)',1.3)+P(250,p[0],0,'var(--accent)',1.3)+P(p[1],40,90,'var(--ink)',1.3)+T(p[1],24,'t'+(i+1),'d2','middle')+T(266,p[0]+4,'t'+(i+1),'d2')
   +'<path d="M250 '+(p[0]-30)+'A18 18 0 0 0 '+(250-12.7).toFixed(1)+' '+(p[0]-12-12.7).toFixed(1)+'" fill="none" stroke="var(--mid)" stroke-width="1.4"/>'}).join('')
  +T(206,128,'same angle','d1','end',null,'var(--mid)')+T(206,139,'every time','d2','end')
  +'<g transform="translate(14 118)"><path d="M0 6Q60-6 120 6L114 74H6Z" fill="#bfe0f5" stroke="#1d2b45" stroke-width="1.6"/><path d="M3 50H117" stroke="#6a8f4e" stroke-width="2"/><path d="M6 52H114L114 74H6Z" fill="#9cc27e"/><path d="M60 2V74" stroke="#1d2b45" stroke-width="2.4"/>'
  +'<g transform="translate(34 36)"><path d="M-9 0H7L10-3L12-1L9 2H-9Z" fill="#1d2b45"/><path d="M-4 0L-1-6H2L1 0Z" fill="#1d2b45"/></g>'+'<circle cx="34" cy="36" r="13" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/></g>'
  +T(74,206,'It stays still in your windscreen','d1','middle',8.6)+T(74,106,'Your view at t1, t2 and t3','d2','middle'),
  'If another aircraft keeps the same relative bearing while its range closes, you will collide. In the windscreen it does not move, it just grows. Change heading or height to break it.',320,215)
]);
sec(R,'Flights near an aerodrome',[
 F('Join the pattern: all turns to the left',
  '<path d="M70 150H250" stroke="var(--ink-2)" stroke-width="16"/>'+'<path d="M76 150H244" stroke="#fff" stroke-width="1" stroke-dasharray="8 6"/>'+T(84,154,'09','d1','middle',8,'#fff')+T(236,154,'27','d1','middle',8,'#fff')
  +L('M250 150H282Q296 150 296 136V62Q296 48 282 48H38Q24 48 24 62V136Q24 150 38 150H70','var(--accent)',1.8)
  +A(256,150,280,150,'var(--accent)',1.8)+A(296,120,296,90,'var(--accent)',1.8)+A(200,48,150,48,'var(--accent)',1.8)+A(24,80,24,112,'var(--accent)',1.8)+A(30,150,56,150,'var(--accent)',1.8)
  +P(160,150,90,'var(--accent)',1.3)
  +T(268,170,'Upwind','d1','middle')+T(304,100,'Crosswind','d1','end')+T(160,40,'Downwind','d1','middle')+T(32,100,'Base','d1')+T(40,170,'Final','d1','middle')
  +T(160,196,'Straight in: long final 8 to 4 nm, final within 4 nm','d2','middle')
  +sock(150,82,180)+T(138,104,'windsock','d2','middle')+A(236,92,196,92,'var(--ink-2)',1.6)+T(216,84,'wind','d2','middle')
  +T(160,128,'Left-hand unless signals say otherwise','d2','middle'),
  'Conform to the circuit other traffic is flying, or keep clear of it. Take off and land into wind. On a straight-in approach report long final at 8 nm and final at 4 nm.',320,205)
]);
sec(R,'Order of landing',[
 F('No runway: keep earlier traffic on your left',
  grass(30,26,260,142)+T(40,40,'grass landing area','d2')+sock(262,8,0)+T(256,18,'wind from the west','d2','end')
  +L('M300 72H200','var(--accent)',1.2)+A(196,72,150,72,'var(--accent)',1.6,'5 3')+acL(186,72,-90,1.3,'var(--accent)',false)
  +T(196,58,'Landing: leaves it on its left','d1','middle',null,'var(--accent)')
  +L('M300 128H130','var(--ink-2)',1.2)+'<path d="M108 128Q84 128 84 152" fill="none" stroke="var(--ink-2)" stroke-width="1.6" stroke-dasharray="5 3"/>'+A(84,150,84,162,'var(--ink-2)',1.6)+acL(118,128,-90,1.3,'var(--ink)',false)
  +T(196,118,'Already landed: turns left','d1','middle')+T(196,146,'once sure it will not get in the way','d2','middle')
  
  +T(160,188,'Taking off: leave earlier departures on your left too','d1','middle')+T(160,200,'After landing, clear the landing area as soon as possible','d2','middle'),
  'Where take-offs and landings are not confined to a runway, newer traffic stays to the right of older traffic, and turns on the landing area are to the left.',320,208)
]);
sec(R,'Radio in the ATZ',[
 F('Following a line feature: keep it on your left',
  L('M10 112L310 88','var(--ink-2)',3)+(function(){var s='';for(var i=0;i<=30;i++){var x=12+i*10,y=112-i*0.8;s+='M'+x+' '+(y-4)+'V'+(y+4)}return L(s,'var(--ink-2)',1.2)})()+T(16,128,'railway, road, canal or coast','d2')
  +L('M20 152H96','var(--accent)',1.2,'4 3')+acL(110,150,90,1.4,'var(--accent)',false)+A(124,150,170,148,'var(--accent)',1.6)
  +L('M300 52H222','var(--accent)',1.2,'4 3')+acL(208,52,-90,1.4,'var(--accent)',false)+A(194,52,150,54,'var(--accent)',1.6)
  +T(60,176,'Heading east: line on the left','d1')+T(260,30,'Heading west: line on the left','d1','end')
  +T(160,196,'Both keep to the right, so they pass apart','d2','middle'),
  'No longer a legal requirement under SERA, but the CAA strongly recommends it. In controlled airspace follow ATC instead.',320,205)
]);
sec(R,'Lights on aircraft',[
 F('Reading another aircraft\'s lights at night',
  L('M170 206L170 44M170 206L62 132M170 206L278 132M170 206L74 48M170 206L266 48','var(--line)',1,'2 3')
  +acL(170,214,0,1.5,'var(--accent)')+T(146,230,'You','d1','end')
  +acL(170,34,180,1.4)+T(170,62,'Red and green: head-on','d1','middle',null,'var(--bad)')+T(170,73,'both turn right','d2','middle')
  +acL(62,128,90,1.4)+T(62,104,'Green on your left','d1','middle',null,'var(--mid)')+T(62,154,'it gives way to you;','d2','middle')+T(62,164,'hold heading and speed','d2','middle')
  +acL(278,128,-90,1.4)+T(278,104,'Red on your right','d1','middle',null,'var(--bad)')+T(278,154,'it is on your right:','d2','middle')+T(278,164,'you give way','d2','middle')
  +acL(56,40,200,1.3)+T(56,16,'Red to red: safe','d1','middle',null,'var(--good)')
  +acL(284,40,160,1.3)+T(284,16,'Green to green: safe','d1','middle',null,'var(--good)')
  +T(276,210,'White only: it is','d2','middle')+T(276,220,'flying away from you','d2','middle'),
  'Your red is on your left, your green on your right. Matching colours on the same side mean the paths will not cross; red facing green means risk. Check the bearing as well.',340,245)
]);
sec(R,'Low flying prohibitions',[
 F('Congested area: 1,000 ft and able to land clear',
  '<path d="M0 182H320V210H0Z" fill="var(--ch-l1)"/>'+skyline(70,182,[[74,6,30],[106,14,14],[122,22,20],[146,40,18],[166,58,16],[184,34,22],[208,20,18],[228,12,26],[256,6,20]])+L('M173 124V108','var(--ch-tnl)',1.6)
  +T(20,198,'open fields','d2')+T(296,198,'fields','d2','end')
  +dzSide(174,30,1,'var(--accent)')+L('M150 108H200','var(--bad)',1,'3 3')+A(174,40,174,106,'var(--bad)',1.4)+T(180,78,'1,000 ft','d1',null,null,'var(--bad)')
  +L('M174 40L100 182M174 40L248 182','var(--accent)',1)+L('M100 192H248','var(--accent)',1)+L('M100 188V196M248 188V196','var(--accent)',1)+T(174,206,'highest obstacle within 600 m','d2','middle')
  +L('M168 40L36 180','var(--good)',1.4,'6 4')+T(30,150,'glide range','d1',null,null,'var(--good)')+T(30,161,'reaches open ground','d2'),
  'Over a city, town or settlement fly at least 1,000 ft above the highest obstacle within 600 m, and high enough to glide clear if the engine stops. Landing clear is the pilot\'s job, not ATC\'s.',320,212),
 F('The 500 ft rule: EASA and UK compared',
  '<path d="M0 172H320V200H0Z" fill="var(--ch-l1)"/>'+L('M160 14V196','var(--line)',1)
  +T(80,22,'EASA, and UK at night','d1','middle')+T(80,34,'500 ft above the ground or','d2','middle',8)+T(80,44,'the highest obstacle within 150 m','d2','middle',8)
  +'<path d="M116 172V140h8v32Z" fill="var(--ch-tn)" stroke="var(--ch-tnl)"/>'+L('M30 82H150','var(--bad)',1,'3 3')+dzSide(70,70,.9,'var(--accent)')+A(120,84,120,138,'var(--bad)',1.2)+T(126,114,'500 ft','d1',null,null,'var(--bad)')
  +L('M70 156H114M70 152V160M114 152V160','var(--ink-2)',1)+L('M70 78V150','var(--ink-2)',.8,'2 3')+T(92,150,'150 m','d2','middle')
  +T(240,22,'UK by day','d1','middle')+T(240,34,'500 ft from any person,','d2','middle',8)+T(240,44,'vehicle, vessel or structure','d2','middle',8)
  +'<path d="M250 168l14 0l-3 4h-10Z" fill="var(--ink)"/><path d="M257 166V146l8 18Z" fill="var(--ink)"/>'+'<path d="M200 172A57 57 0 0 1 314 172" fill="var(--bad)" opacity=".12" stroke="var(--bad)" stroke-dasharray="4 3"/>'
  +dzSide(200,104,.9,'var(--accent)')+A(214,110,240,128,'var(--bad)',1.2)+T(268,104,'500 ft bubble','d1','middle',null,'var(--bad)')
  +T(240,188,'lower over open ground is allowed','d2','middle'),
  'EASA sets a height above the surface. The UK day rule is a 500 ft bubble around people and things instead. Take-off and landing are exempt from both.',320,200)
]);
sec(R,'Open-air assemblies',[
 F('Open-air assemblies of more than 1,000 people',
  '<ellipse cx="110" cy="160" rx="96" ry="30" fill="none" stroke="var(--mid)" stroke-dasharray="5 4"/>'
  +'<ellipse cx="110" cy="158" rx="40" ry="13" fill="var(--surface-2)" stroke="var(--ink)" stroke-width="1.4"/><ellipse cx="110" cy="156" rx="26" ry="7" fill="var(--ch-l1)" stroke="var(--ink-2)"/><path d="M70 158V164A40 13 0 0 0 150 164V158" fill="none" stroke="var(--ink)" stroke-width="1.4"/>'
  +T(110,186,'over 1,000 people','d2','middle')
  +dzSide(110,28,.9,'var(--accent)')+A(110,38,110,140,'var(--bad)',1.4)+T(116,80,'1,000 ft above the','d1',null,null,'var(--bad)')+T(116,91,'highest obstacle','d2')+T(116,101,'within 600 m, or','d2')+T(116,111,'enough to land clear','d2')+T(116,121,'if that is higher','d2')
  +dzSide(282,100,.8,'var(--accent)',true)+A(262,110,208,152,'var(--mid)',1.4,'5 3')+T(272,140,'No take-off or','d1','middle',null,'var(--mid)')+T(272,151,'landing within','d1','middle',null,'var(--mid)')+T(272,162,'1,000 m','d1','middle',null,'var(--mid)')
  +T(262,180,'unless at an aerodrome','d2','middle')+T(262,190,'or with permission','d2','middle'),
  'UK: written CAA permission is needed to fly lower. The 1,000 m take-off and landing ban has exceptions at aerodromes (CAA procedures) and at other sites with the organiser\'s permission.',320,200)
]);

/* ---------- 04 Aerodromes ---------- */
var D='Aerodromes';
function beacon(y,name,where,pat){var s='<rect x="10" y="'+y+'" width="300" height="46" rx="6" fill="#16284A"/>'+'<path d="M26 '+(y+42)+'V'+(y+22)+'" stroke="#9aa6bd" stroke-width="3"/><path d="M18 '+(y+22)+'H34L31 '+(y+16)+'H21Z" fill="#9aa6bd"/>'+'<circle cx="26" cy="'+(y+13)+'" r="5" fill="'+pat[0][1]+'"/>';var x=44;pat.forEach(function(p){s+='<rect x="'+x+'" y="'+(y+11)+'" width="'+p[0]+'" height="5" rx="1.5" fill="'+p[1]+'"/>';x+=p[0]+4});return s+T(44,y+32,name,'d1',null,null,'#ffffff')+T(44,y+42,where,'d2',null,7.5,'#c9d3e6')}
var W='#ffffff',G='#3ccf63',Rd='#ff4a4a';
function morse(code,col){var p=[];code.split('').forEach(function(c){if(c===' ')p.push([10,'transparent']);else p.push([c==='-'?11:4,col])});return p}
sec(D,'Aeronautical light beacons',[
 F('Aeronautical light beacons',
  beacon(8,'Aerodrome beacon: white / white','civil aerodrome, alternating flashes',[[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W],[10,W]])
  +beacon(60,'Aerodrome beacon: white / green','less common, civil aerodrome',[[10,W],[10,G],[10,W],[10,G],[10,W],[10,G],[10,W],[10,G],[10,W],[10,G]])
  +beacon(112,'Identification beacon: green Morse','civil, two-letter group every 12 s',morse('-.. .-   -.. .-',G))
  +beacon(164,'Identification beacon: red Morse','military, two-letter group every 12 s',morse('-.. .-   -.. .-',Rd)),
  'Aerodrome beacons alternate white/white (or white/green). Identification beacons flash a two-letter Morse code: green at civil aerodromes, red at military ones. Usually only one or the other.',320,218)
]);
function panel(x,y,w,h,n,title){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="var(--surface-2)" stroke="var(--line)"/>'+T(x+8,y+14,n+'. '+title,'d1')}
function taxi(d,c){return L(d,c||'var(--bad)',1.6,'5 3')}
sec(D,'Right of way on the ground',[
 F('Taxiing: who gives way (1 and 2)',
  dzB(10,8,300,24,'var(--accent-soft)','var(--accent)')+T(160,24,'1. Whatever ATC says, avoiding a collision is up to you','d1','middle')
  +panel(10,40,145,150,2,'Landing traffic first')+'<path d="M18 74H148V96H18Z" fill="var(--ink-2)"/><path d="M24 85H142" stroke="#fff" stroke-dasharray="6 5"/>'+'<path d="M80 96H100V176H80Z" fill="var(--ink-2)" opacity=".7"/>'
  +'<path d="M76 110H104" stroke="#f2c14a" stroke-width="2.5" stroke-dasharray="4 2"/>'+acL(42,85,90,1.1,'var(--accent)',false)+A(58,85,128,85,'var(--accent)',1.4)+acL(90,130,0,1.1,'var(--ink)',false)
  +T(82,66,'landing or taking off','d2','middle')+T(108,128,'stop and','d2')+T(108,138,'give way','d2')
  +panel(165,40,145,150,3,'Head-on: both turn right')+acL(200,120,90,1.1,'var(--ink)',false)+acL(276,110,-90,1.1,'var(--ink)',false)
  +taxi('M212 120Q236 122 248 150')+A(246,146,250,158,'var(--bad)',1.4)+taxi('M264 110Q240 108 228 80')+A(230,84,226,72,'var(--bad)',1.4),
  'Aircraft on the ground give way to aircraft taking off or landing. Head-on, or nearly so, each turns right.',320,198),
 F('Taxiing: who gives way (3 and 4)',
  panel(10,8,145,180,4,'Converging')+acL(116,64,-90,1.1,'var(--ink)',false)+A(102,64,30,64,'var(--ink-2)',1.2,'4 3')+T(66,52,'has right of way','d2','middle')
  +acL(40,160,0,1.1,'var(--accent)',false)+taxi('M40 146Q42 98 100 98Q140 98 142 50')+A(142,54,142,40,'var(--bad)',1.4)+T(54,166,'has it on its right:','d2')+T(54,176,'stop or pass behind','d2')
  +panel(165,8,145,180,5,'Overtaking')+acL(240,70,-90,1.1,'var(--ink)',false)+A(226,70,180,70,'var(--ink-2)',1.2,'4 3')+T(240,50,'being overtaken:','d2','middle')+T(240,60,'has right of way','d2','middle')
  +acL(292,150,-90,1.1,'var(--accent)',false)+taxi('M278 150Q250 150 240 120Q232 104 200 100')+A(204,100,186,100,'var(--bad)',1.4)+T(238,172,'overtaker keeps','d2','middle')+T(238,182,'well clear until past','d2','middle'),
  'The one with the other on its right gives way and must not cross ahead unless well clear. The aircraft being overtaken has right of way.',320,196)
]);

/* declared distances, runway state, lights, signals, markings (04 Aerodromes, part 2): mocked up from the textbook figures */
var Wh='#f4f1e6',Ye='#f2c14a',Re='#d8312c',Or='#e8742c',Nv='#1d2b45',Pn='#2b2f36';
function dim(x1,x2,y,lab,c,up){return L('M'+x1+' '+(y-5)+'V'+(y+5)+'M'+x2+' '+(y-5)+'V'+(y+5),c,1.4)+A((x1+x2)/2,y,x1+1,y,c,1.4)+A((x1+x2)/2,y,x2-1,y,c,1.4)+T((x1+x2)/2,up===false?y+13:y-6,lab,'d1','middle',null,c)}
function tree(x,y,s){s=s||1;return'<path d="M'+x+' '+y+'V'+(y-10*s)+'" stroke="#6b4a2b" stroke-width="'+(2*s)+'"/><circle cx="'+x+'" cy="'+(y-16*s)+'" r="'+(8*s)+'" fill="#3f6b3a"/><circle cx="'+(x+6*s)+'" cy="'+(y-11*s)+'" r="'+(6*s)+'" fill="#4d7c44"/>'}
function vtick(x,y1,y2){return L('M'+x+' '+y1+'V'+y2,'var(--ink-2)',1,'3 3')}
sec(D,'Declared distances',[
 F('TORA, TODA and clearway',
  '<path d="M10 120H210Q260 120 270 108Q286 96 312 98V140H10Z" fill="var(--ch-l1)"/>'+'<path d="M14 116H210V122H14Z" fill="var(--ink-2)"/>'
  +tree(286,100,1.1)+tree(300,99,.9)+'<path d="M30 112Q170 110 212 104Q256 96 300 62" stroke="var(--bad)" stroke-width="1.4" fill="none"/>'+dzSide(34,112,.42,'var(--accent)',true)
  +dzSide(300,60,.36,'var(--accent)',true)+vtick(14,38,150)+vtick(210,38,150)+vtick(268,38,150)
  +dim(14,210,72,'take-off run available (TORA)','var(--ink)')+dim(210,268,48,'clearway','var(--accent)')
  +T(262,90,'first significant','d2','end')+T(262,100,'obstruction','d2','end')+dim(14,268,146,'take-off distance available (TODA)','var(--accent)',false),
  'The clearway is airspace beyond the runway, up to the first significant obstruction, that you can climb over. TODA = TORA + clearway.',320,166),
 F('ASDA with and without a stopway',
  T(10,14,'(a) no stopway: ASDA equals TORA','d1')
  +'<path d="M10 62H210Q226 64 236 76Q260 82 312 80V96H10Z" fill="var(--ch-l1)"/><path d="M14 58H210V64H14Z" fill="var(--ink-2)"/>'+dzSide(40,54,.42,'var(--accent)',true)
  +vtick(14,24,94)+vtick(210,24,94)+dim(14,210,36,'TORA','var(--ink)')+dim(14,210,84,'ASDA','var(--mid)',false)
  +T(10,122,'(b) with a stopway','d1')
  +'<path d="M10 170H312V200H10Z" fill="var(--ch-l1)"/><path d="M14 166H200V172H14Z" fill="var(--ink-2)"/><path d="M200 166H262V172H200Z" fill="var(--mid)" opacity=".6"/>'
  +tree(290,170,1)+tree(304,170,.8)+dzSide(40,162,.42,'var(--accent)',true)
  +vtick(14,132,202)+vtick(200,132,202)+vtick(262,132,202)+dim(14,200,144,'TORA','var(--ink)')+dim(200,262,144,'stopway','var(--mid)')+dim(14,262,190,'ASDA = TORA + stopway','var(--mid)',false),
  'A stopway is prepared ground beyond the runway where you can stop after an abandoned take-off. With none, ASDA is the same as TORA.',320,214),
 F('Landing distance available (LDA)',
  '<path d="M10 108H312V130H10Z" fill="var(--ch-l1)"/><path d="M60 104H290V110H60Z" fill="var(--ink-2)"/>'
  +'<path d="M12 28Q50 70 90 92Q130 106 200 104" stroke="var(--bad)" stroke-width="1.4" fill="none"/>'+dzSide(270,100,.42,'var(--accent)',true)
  +L('M60 70H10','var(--ink-2)',1,'4 3')+A(44,94,44,72,'var(--ink)',1.2)+A(44,82,44,104,'var(--ink)',1.2)+T(38,88,'50 ft','d1','end')
  +vtick(60,64,130)+vtick(290,64,130)+dim(60,290,120,'landing distance available (LDA)','var(--good)',false),
  'LDA is the runway declared suitable for the landing ground run, measured from the threshold. The performance figures assume you cross it at 50 ft.',320,142)
]);
function third(x,code,cov,dep,desc){return dzB(x,64,92,56,Pn,'var(--ink-2)',2)+T(x+46,80,'code '+code,'d1','middle',null,'#ffffff')+T(x+46,94,cov+'%, '+dep,'d2','middle',null,'#dfe5f0')+T(x+46,108,desc,'d2','middle',null,'#dfe5f0')}
sec(D,'Runway surface condition',[
 F('Reading a SNOWTAM, third by third',
  T(160,20,'EGGP 03150045 09 2/5/5 50/75/75 04/NR/NR SLUSH/WET/WET','d2','middle')
  +T(160,40,'Each third gets its own code, coverage, depth and description','d1','middle')
  +third(22,2,50,'4 mm','slush')+third(114,5,75,'depth NR','wet')+third(206,5,75,'depth NR','wet')
  +T(12,96,'09','d1','middle')+T(308,96,'27','d1','middle')
  +T(68,136,'first third','d2','middle')+T(160,136,'second third','d2','middle')+T(252,136,'last third','d2','middle')
  +T(160,156,'Codes: 0 worst, 6 best. Contaminated if over 25% of a third is covered.','d2','middle'),
  'Assessed 15 March at 00:45. Thirds are counted from the end with the lower runway number. NR means not reported.',320,166)
]);
function dots(x,y,n,dx,dy,c,r){var s='';for(var k=0;k<n;k++)s+='<circle cx="'+(x+k*dx)+'" cy="'+(y+k*dy)+'" r="'+(r||2.4)+'" fill="'+c+'"/>';return s}
sec(D,'Runway lights',[
 F('Threshold, edge and end lights',
  '<path d="M60 60H270V110H60Z" fill="var(--ink-2)"/>'+'<path d="M70 85H260" stroke="#fff" stroke-dasharray="8 6"/>'
  +dots(64,64,6,0,8.4,'#3ccf63',2.8)+dots(266,64,6,0,8.4,'#ff4a4a',2.8)+dots(80,56,8,25,0,'#ffffff').replace(/\/>/g,' stroke="#555" stroke-width=".6"/>')+dots(80,114,8,25,0,'#ffffff').replace(/\/>/g,' stroke="#555" stroke-width=".6"/>')
  +P(22,85,90,'var(--accent)',1.2)+A(56,138,34,138,'#2f9d4c',1.6)+A(262,138,240,138,'var(--bad)',1.6)
  +T(64,152,'threshold: fixed green','d1','middle')+T(64,164,'seen from the approach','d2','middle')
  +T(256,152,'end: fixed red','d1','middle')+T(256,164,'seen along the runway','d2','middle')
  +T(165,40,'edge lights along both sides','d2','middle')+T(256,182,'at least 6, within 3 m of the end','d2','middle'),
  'Both sets face the landing aircraft: green says "runway starts here", red says "runway ends here". Arrows show which way each light shines.',320,192)
]);
sec(D,'Obstacle lights',[
 F('Obstacle lighting',
  '<path d="M8 14H196V150H8Z" fill="'+Pn+'"/>'
  +'<path d="M24 104L48 92L74 100V124L50 136L24 124Z" fill="#f4f1e6" stroke="#9aa6bd"/><path d="M24 104L50 112L74 100M50 112V136" stroke="#9aa6bd" fill="none"/><circle cx="50" cy="92" r="3.4" fill="'+Re+'"/>'
  +'<path d="M90 80L118 60L182 74V112L152 128L90 112Z" fill="#f4f1e6" stroke="#9aa6bd"/><path d="M90 80L152 94L182 74M152 94V128" stroke="#9aa6bd" fill="none"/>'
  +[[90,80],[104,70],[118,60],[150,67],[182,74],[152,94],[121,87],[90,112],[152,128],[182,112],[182,93]].map(function(p){return'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.4" fill="'+Re+'"/>'}).join('')
  +T(50,146,'under 45 m overall','d2','middle',null,'#dfe5f0')+T(136,146,'over 45 m overall','d2','middle',null,'#dfe5f0')
  +'<path d="M196 150H312" stroke="var(--ink-2)" stroke-width="1.4"/>'+[0,1,2,3,4,5,6].map(function(k){return'<path d="M'+(214-k*.6)+' '+(42+k*15)+'H'+(234+k*.6)+'V'+(57+k*15)+'H'+(214-k*.6)+'Z" fill="'+(k%2?'#fff':Re)+'" stroke="var(--ink-2)" stroke-width=".5"/>'}).join('')
  +'<path d="M262 150L270 80M300 150L292 80M262 150L292 80M300 150L270 80" stroke="'+Re+'" stroke-width="2"/>'
  +[0,1,2,3].map(function(r){return[0,1,2,3].map(function(c){return'<path d="M'+(264+c*9)+' '+(30+r*11)+'h9v11h-9Z" fill="'+((r+c)%2?'#fff':Re)+'" stroke="var(--ink-2)" stroke-width=".4"/>'}).join('')}).join('')
  +'<path d="M262 30L281 18L300 30Z" fill="'+Re+'"/>'+T(254,166,'by day: red or orange','d2','middle')+T(254,177,'and white bands','d2','middle'),
  'At night: a single steady red light on the top of an obstacle up to 45 m, extra red lights outlining anything bigger. Obstacles within 15 km of an aerodrome are normally lit.',320,186)
]);
/* black signal panels and masts */
function tile(x,y,sym,l1,l2,light){return dzB(x,y,96,84,'var(--surface-2)','var(--line)',6)+'<rect x="'+(x+8)+'" y="'+(y+6)+'" width="80" height="50" rx="3" fill="'+(light?'var(--surface)':Pn)+'"/>'+sym(x+48,y+31)+T(x+48,y+67,l1,'d2','middle')+T(x+48,y+78,l2,'d2','middle')}
function grid(items,light){return items.map(function(it,i){return tile(8+(i%3)*104,8+Math.floor(i/3)*92,it[0],it[1],it[2],it[3])}).join('')}
function rows(n){return 8+n*92}
function sT(disc){return function(cx,cy){return'<path d="M'+(cx-20)+' '+(cy-17)+'H'+(cx-13)+'V'+(cy+17)+'H'+(cx-20)+'Z" fill="'+Wh+'"/><path d="M'+(cx-13)+' '+(cy-3)+'H'+(cx+28)+'V'+(cy+3)+'H'+(cx-13)+'Z" fill="'+Wh+'"/>'+(disc?'<circle cx="'+(cx-29)+'" cy="'+cy+'" r="4.5" fill="'+Wh+'"/>':'')}}
function sDb(strips,redL,whiteL){return function(cx,cy){var y=whiteL?cy+10:cy;return(whiteL?'<path d="M'+(cx-3)+' '+(cy-20)+'V'+(cy-2)+'H'+(cx+7)+'" stroke="'+Wh+'" stroke-width="3.5" fill="none"/>':'')+'<circle cx="'+(cx-24)+'" cy="'+y+'" r="'+(whiteL?8:11)+'" fill="'+Wh+'"/><circle cx="'+(cx+24)+'" cy="'+y+'" r="'+(whiteL?8:11)+'" fill="'+Wh+'"/><path d="M'+(cx-24)+' '+(y-3)+'H'+(cx+24)+'V'+(y+3)+'H'+(cx-24)+'Z" fill="'+Wh+'"/>'+(strips?'<path d="M'+(cx-24)+' '+(y-11)+'V'+(y+11)+'M'+(cx+24)+' '+(y-11)+'V'+(y+11)+'" stroke="'+Pn+'" stroke-width="3.5"/>':'')+(redL?'<path d="M'+(cx-4)+' '+(y-9)+'V'+(y+7)+'H'+(cx+7)+'" stroke="'+Re+'" stroke-width="3.5" fill="none"/>':'')}}
function sL(cx,cy){return'<path d="M'+(cx-7)+' '+(cy-16)+'V'+(cy+14)+'H'+(cx+11)+'" stroke="'+Wh+'" stroke-width="6" fill="none"/>'}
function sArrow(cx,cy){var d='M'+(cx-26)+' '+(cy+20)+'V'+(cy-14)+'H'+(cx+18);return'<path d="'+d+'" stroke="'+Re+'" stroke-width="8" fill="none"/><path d="'+d+'" stroke="'+Ye+'" stroke-width="8" stroke-dasharray="5 5" fill="none"/><path d="M'+(cx+16)+' '+(cy-24)+'L'+(cx+30)+' '+(cy-14)+'L'+(cx+16)+' '+(cy-4)+'Z" fill="'+Re+'"/>'}
function sSq(cross){return function(cx,cy){return'<rect x="'+(cx-20)+'" y="'+(cy-20)+'" width="40" height="40" fill="'+Re+'"/><path d="M'+(cx-18)+' '+(cy+18)+'L'+(cx+18)+' '+(cy-18)+(cross?'M'+(cx-18)+' '+(cy-18)+'L'+(cx+18)+' '+(cy+18):'')+'" stroke="'+Ye+'" stroke-width="5"/>'}}
function sH(cx,cy){return'<path d="M'+(cx-11)+' '+(cy-16)+'V'+(cy+16)+'M'+(cx+11)+' '+(cy-16)+'V'+(cy+16)+'M'+(cx-11)+' '+cy+'H'+(cx+11)+'" stroke="'+Wh+'" stroke-width="5"/>'}
function sDx(cx,cy){return'<path d="M'+(cx-32)+' '+cy+'H'+(cx+32)+'M'+(cx-16)+' '+(cy-13)+'V'+(cy+13)+'M'+(cx+16)+' '+(cy-13)+'V'+(cy+13)+'" stroke="'+Wh+'" stroke-width="5"/>'}
function sYp(cx,cy){return'<path d="M'+cx+' '+(cy-18)+'V'+(cy+18)+'M'+(cx-18)+' '+(cy-4)+'H'+(cx+18)+'" stroke="'+Ye+'" stroke-width="6"/>'}
function sX(col,n){return function(cx,cy){var s='';for(var k=0;k<n;k++){var x=cx+(k-(n-1)/2)*30;s+='<path d="M'+(x-11)+' '+(cy-11)+'L'+(x+11)+' '+(cy+11)+'M'+(x+11)+' '+(cy-11)+'L'+(x-11)+' '+(cy+11)+'" stroke="'+col+'" stroke-width="4.5"/>'}return s}}
function mast(cx,cy,extra){return'<path d="M'+(cx-12)+' '+(cy+21)+'H'+(cx+12)+'" stroke="var(--ink-2)" stroke-width="2"/><path d="M'+(cx-7)+' '+(cy+21)+'L'+cx+' '+(cy-22)+'L'+(cx+7)+' '+(cy+21)+'" stroke="var(--ink-2)" stroke-width=".8" fill="none"/><path d="M'+cx+' '+(cy+21)+'V'+(cy-22)+'" stroke="var(--ink)" stroke-width="1.8"/>'+(extra||'')}
function mBall(n,col){return function(cx,cy){var s='';for(var k=0;k<n;k++)s+='<circle cx="'+(cx-6)+'" cy="'+(cy-12+k*10)+'" r="5" fill="'+col+'"/>';return mast(cx,cy,s)}}
function mFlag(col,cheq){return function(cx,cy){var f='';if(cheq){for(var r=0;r<3;r++)for(var c=0;c<4;c++)f+='<path d="M'+(cx+1+c*6)+' '+(cy-20+r*6)+'h6v6h-6Z" fill="'+((r+c)%2?Ye:Re)+'"/>'}else f='<path d="M'+(cx+1)+' '+(cy-20)+'h20v14h-20Z" fill="'+col+'"/>';return mast(cx,cy,f)}}
function sC(cx,cy){return'<rect x="'+(cx-18)+'" y="'+(cy-18)+'" width="36" height="36" fill="'+Ye+'"/><path d="M'+(cx+9)+' '+(cy-8)+'A11 11 0 1 0 '+(cx+9)+' '+(cy+8)+'" stroke="#111" stroke-width="5.5" fill="none"/>'}
function sRwyT(cx,cy){return'<path d="M'+(cx-30)+' '+(cy+4)+'H'+(cx+34)+'V'+(cy+22)+'H'+(cx-30)+'Z" fill="#555b66"/><path d="M'+(cx+12)+' '+(cy-18)+'H'+(cx+17)+'V'+(cy-2)+'H'+(cx+12)+'Z" fill="'+Wh+'"/><path d="M'+(cx-13)+' '+(cy-12)+'H'+(cx+12)+'V'+(cy-8)+'H'+(cx-13)+'Z" fill="'+Wh+'"/>'+A(cx-24,cy+13,cx+26,cy+13,Wh,1.2)}
function n09(x,y){return'<text x="'+x+'" y="'+y+'" transform="rotate(90 '+x+' '+y+')" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="'+Wh+'">09</text>'}
function sDanger(bar){return function(cx,cy){return(bar?'<path d="M'+(cx-26)+' '+(cy-14)+'V'+(cy+14)+'" stroke="'+Wh+'" stroke-width="4"/>':'')+'<path d="M'+(cx-16)+' '+(cy-12)+'L'+(cx+6)+' '+(cy+12)+'M'+(cx+6)+' '+(cy-12)+'L'+(cx-16)+' '+(cy+12)+'" stroke="'+Wh+'" stroke-width="4.5"/>'+n09(cx+24,cy)}}
function sWedge(cx,cy){var s='<path d="M'+(cx-34)+' '+(cy+10)+'L'+(cx+18)+' '+(cy-18)+'L'+(cx+30)+' '+(cy-2)+'L'+(cx-22)+' '+(cy+18)+'Z" fill="#fff" stroke="var(--ink-2)" stroke-width=".8"/>';[[-34,10,-22,18,-14,0],[-8,-4,4,4,0,0],[14,-14,26,-6,0,0]].forEach(function(b){});
 var pts=[[cx-34,cy+10],[cx+18,cy-18]],q=[[cx-22,cy+18],[cx+30,cy-2]];[0.08,0.42,0.76].forEach(function(t){var t2=t+0.17,P1=[pts[0][0]+(pts[1][0]-pts[0][0])*t,pts[0][1]+(pts[1][1]-pts[0][1])*t],P2=[pts[0][0]+(pts[1][0]-pts[0][0])*t2,pts[0][1]+(pts[1][1]-pts[0][1])*t2],Q1=[q[0][0]+(q[1][0]-q[0][0])*t,q[0][1]+(q[1][1]-q[0][1])*t],Q2=[q[0][0]+(q[1][0]-q[0][0])*t2,q[0][1]+(q[1][1]-q[0][1])*t2];s+='<path d="M'+P1.join(' ')+'L'+P2.join(' ')+'L'+Q2.join(' ')+'L'+Q1.join(' ')+'Z" fill="'+Or+'"/>'});return s}
function sOWflag(cx,cy){return'<path d="M'+(cx+14)+' '+(cy+22)+'V'+(cy-22)+'" stroke="var(--ink-2)" stroke-width="2"/><path d="M'+(cx-18)+' '+(cy-18)+'H'+(cx+13)+'V'+(cy+6)+'H'+(cx-18)+'Z" fill="#fff" stroke="var(--ink-2)" stroke-width=".8"/><path d="M'+(cx-18)+' '+(cy+6)+'L'+(cx+13)+' '+(cy-18)+'V'+(cy+6)+'Z" fill="'+Or+'"/>'}
function sBoard(cx,cy){var s='<path d="M'+(cx-36)+' '+(cy+12)+'L'+(cx-26)+' '+(cy+4)+'H'+(cx+36)+'L'+(cx+26)+' '+(cy+18)+'H'+(cx-36)+'Z" fill="'+Or+'"/><path d="M'+(cx-10)+' '+(cy+4)+'H'+(cx+12)+'L'+(cx+4)+' '+(cy+18)+'H'+(cx-18)+'Z" fill="#fff"/>';
 s+='<path d="M'+(cx-30)+' '+(cy-20)+'H'+(cx+32)+'V'+(cy+6)+'H'+(cx-30)+'Z" fill="'+Or+'"/><path d="M'+(cx-10)+' '+(cy-20)+'H'+(cx+12)+'V'+(cy+6)+'H'+(cx-10)+'Z" fill="#fff"/>';for(var k=0;k<7;k++)s+='<path d="M'+(cx-24+k*8)+' '+(cy-14)+'V'+(cy+2)+'" stroke="var(--ink-2)" stroke-width="1.2"/>';return s}
sec(D,'Signals area: direction',[
 F('Direction of take-off and landing',
  grid([[sT(false),'Land and take off','towards the cross-arm'],[sT(true),'Disc: directions','may not coincide'],[mBall(1,'#111'),'Black ball on the','mast: the same',true]])
  +A(60,104,22,104,'var(--accent)',1.6)+T(64,108,'landing direction for the T','d2'),
  'Land and take off parallel with the shaft of the T, towards the cross-arm, unless ATC say otherwise. A disc at the head of the T, or a black ball on the mast, means landing and take-off may be in different directions.',320,116),
 F('Use hard surfaces only',
  grid([[sDb(false),'Dumb-bell: taxi on','hard surfaces only'],[sDb(true),'Black strips: take off','and land on a runway']]),
  'Plain dumb-bell: keep to paved, metalled or similar hard surfaces on the ground. Black strips across the discs: runway for take-off and landing, but taxiing need not be on hard surfaces.',320,rows(1)),
 F('Light aircraft areas',
  grid([[sL,'White L: light','aircraft area only'],[sDb(false,true,true),'Red L on dumb-bell:','runway or L area']]),
  'A white L marks part of the manoeuvring area for light aircraft only. A red L on the dumb-bell lets light aircraft use a runway or the white-L area.',320,rows(1)),
 F('A signals area (example)',
  '<path d="M20 10H300V170H20Z" fill="'+Pn+'"/><path d="M30 20H290V160H30Z" fill="none" stroke="'+Wh+'" stroke-width="3"/>'
  +'<path d="M54 46H118M70 34V58M102 34V58" stroke="'+Wh+'" stroke-width="5"/>'
  +'<path d="M140 40H200" stroke="'+Wh+'" stroke-width="5"/>'
  +'<path d="M212 34H270V128" stroke="'+Re+'" stroke-width="8" fill="none"/><path d="M212 34H270V128" stroke="'+Ye+'" stroke-width="8" stroke-dasharray="6 6" fill="none"/><path d="M260 126L270 142L280 126Z" fill="'+Re+'"/>'
  +'<circle cx="160" cy="100" r="34" fill="#454b55" stroke="'+Wh+'" stroke-width="2"/><path d="M134 96H178V104H134Z" fill="'+Wh+'"/><path d="M178 80H186V120H178Z" fill="'+Wh+'"/>'
  +'<rect x="44" y="110" width="44" height="40" fill="'+Re+'"/><path d="M46 148L86 112" stroke="'+Ye+'" stroke-width="5"/>'
  +T(86,74,'gliding','d2','middle',null,'#dfe5f0')+T(170,30,'dumb-bell (not in use)','d2','middle',null,'#dfe5f0')+T(262,84,'right-hand','d2','end',null,'#dfe5f0')+T(262,95,'circuit','d2','end',null,'#dfe5f0')
  +T(160,148,'land towards the cross-arm','d2','middle',null,'#dfe5f0')+T(66,104,'special care','d2','middle',null,'#dfe5f0'),
  'A real signals area combines several signals: here special precautions, gliding in progress, a right-hand circuit, and a T showing the landing direction.',320,180)
]);
sec(D,'Signals area: circuit',[
 F('Right-hand circuit',
  grid([[sArrow,'Striped arrow round','the edge, clockwise'],[mFlag('#2f9d4c'),'Green flag:','right-hand circuit',true],[mFlag(Re),'Red flag:','left-hand circuit',true]]),
  'Turns before landing and after take-off are to the right. Where the circuit changes, the flag shows which: the colours match the nav lights (red port, green starboard).',320,rows(1)),
 F('Special precautions and landing prohibited',
  grid([[sSq(false),'One yellow diagonal:','take special care'],[sSq(true),'Yellow cross:','landing prohibited']]),
  'One diagonal: the manoeuvring area is in poor condition, so take care on approach and landing. A diagonal cross: landing is prohibited, probably for a long time.',320,rows(1)),
 F('Helicopter operations markers',
  dzB(8,8,148,130,'var(--surface-2)','var(--line)',6)+dzB(164,8,148,130,'var(--surface-2)','var(--line)',6)
  +'<path d="M66 26H74V96H66ZM96 26H104V96H96ZM74 57H96V65H74Z" fill="'+Wh+'" stroke="var(--ink-2)" stroke-width=".8"/>'
  +A(50,62,50,28,'var(--ink)',1)+A(50,62,50,94,'var(--ink)',1)+T(44,66,'2 m','d1','end')+A(85,108,67,108,'var(--ink)',1)+A(85,108,103,108,'var(--ink)',1)+T(85,104,'1 m','d2','middle')
  +A(118,22,105,22,'var(--ink)',1)+T(120,26,'20 cm','d2')+T(82,122,'(a) in the signals area','d2','middle')
  +'<path d="M218 24H231V100H218ZM243 24H256V100H243ZM231 56H243V68H231Z" fill="'+Wh+'" stroke="var(--ink-2)" stroke-width=".8"/>'
  +A(192,62,192,26,'var(--ink)',1)+A(192,62,192,98,'var(--ink)',1)+T(186,66,'6 m','d1','end')+A(237,110,219,110,'var(--ink)',1)+A(237,110,255,110,'var(--ink)',1)+T(237,106,'3 m','d2','middle')
  +A(276,20,257,20,'var(--ink)',1)+T(278,24,'1 m','d2')+T(238,124,'(b) the helicopter area','d2','middle'),
  'A white H in the signals area means helicopters take off and land only in the designated area, which is marked by a much larger white H.',320,146),
 F('Gliding in progress',
  grid([[sDx,'Double white cross:','gliding'],[mBall(2,Re),'Two red balls:','gliding',true],[sYp,'Yellow cross: tow-rope','dropping area']]),
  'A double white cross and/or two red balls on the mast mean glider flying is taking place. The yellow cross marks where tow-ropes are dropped.',320,rows(1))
]);
sec(D,'Signals on paved',[
 F('Unfit sections of runway or taxiway',
  grid([[sX(Wh,2),'White crosses:','runway section unfit'],[sX(Ye,2),'Yellow crosses:','taxiway section unfit'],[sBoard,'Orange/white boards','15 m apart: boundary',true]]),
  'Crosses with arms at 45° to the centreline, no more than 300 m apart, close a section. Orange-white-orange boards no more than 15 m apart edge an unfit paved area.',320,rows(1)),
 F('Holding point and holding position sign',
  '<path d="M10 22H310V58H10Z" fill="var(--ink-2)"/>'+T(160,44,'RUNWAY','d1','middle',null,'#ffffff')+'<path d="M200 58H240V196H200Z" fill="var(--ink-2)"/>'
  +'<path d="M200 92H240M200 97H240" stroke="'+Ye+'" stroke-width="2.4" stroke-dasharray="5 4"/><path d="M200 104H240M200 109H240" stroke="'+Ye+'" stroke-width="2.4"/>'
  +'<path d="M220 58V196" stroke="'+Ye+'" stroke-width="1.4"/>'+P(220,164,0,'var(--accent)',1.2)
  +'<path d="M150 118V136M184 118V136" stroke="var(--ink-2)" stroke-width="2"/><rect x="134" y="98" width="20" height="20" fill="#111"/>'+T(144,112,'A','d1','middle',null,'#f2c14a')
  +'<rect x="154" y="98" width="44" height="20" fill="'+Re+'"/>'+T(176,112,'09-27','d1','middle',null,'#ffffff')
  +T(126,90,'holding position sign','d2','end')
  +T(248,92,'broken lines:','d1')+T(248,103,'runway side','d2')+T(248,120,'continuous:','d1')+T(248,131,'hold here for','d2')+T(248,142,'ATC permission','d2')
  +T(192,170,'yellow centreline','d2','end')+T(192,181,'taxiing out','d2','end'),
  'Taxiing out you meet the continuous lines first: stop unless cleared. Leaving the runway you meet the broken lines first and need no clearance. The sign shows taxiway A (yellow on black) and runway 09-27 (white on red, mandatory).',320,204)
]);
sec(D,'Markers on unpaved',[
 F('Boundary and runway markers',
  grid([[sWedge,'Orange/white wedge:','boundary, 45 m apart',true],[sOWflag,'Flag: with wedges,','unserviceable area',true],[sRwyT,'White T left of runway:','runway in use'],
        [sDanger(false),'White cross each end:','landing dangerous'],[sDanger(true),'Cross and bar:','emergency use only']]),
  'Wedges no more than 45 m apart mark the aerodrome boundary; alternating with flags they mark unserviceable ground. A cross at each end of a runway means storage only; a cross and bar at a disused aerodrome means emergency use only.',320,rows(2))
]);
function strip(y,kind,l1,l2,l3){var x0=118,x1=312,s='<path d="M'+x0+' '+y+'H'+x1+'V'+(y+34)+'H'+x0+'Z" fill="'+Pn+'"/>',cy=y+17;
 function keys(x){var t='';for(var k=0;k<6;k++)t+='<path d="M'+x+' '+(y+4+k*5.2)+'H'+(x+30)+'" stroke="'+Wh+'" stroke-width="2.6"/>';return t}
 function arrows(a,b){return A(a,cy,a+36,cy,Wh,1.6)+A(b,cy,b+36,cy,Wh,1.6)}
 function xs(a,b){return[a,b].map(function(x){return'<path d="M'+(x-8)+' '+(cy-9)+'L'+(x+8)+' '+(cy+9)+'M'+(x+8)+' '+(cy-9)+'L'+(x-8)+' '+(cy+9)+'" stroke="'+Wh+'" stroke-width="2.6"/>'}).join('')}
 function chev(x){var t='';for(var k=0;k<4;k++)t+='<path d="M'+x+' '+(y+3+k*7.4)+'L'+(x+6)+' '+(y+6.5+k*7.4)+'L'+x+' '+(y+10+k*7.4)+'" stroke="'+Wh+'" stroke-width="1.4" fill="none"/>';return t+'<path d="M'+(x+10)+' '+(y+3)+'V'+(y+31)+'" stroke="'+Wh+'" stroke-width="1.6"/>'}
 if(kind==='n')s+=keys(122)+n09(166,cy)+'<path d="M184 '+cy+'H220M236 '+cy+'H272M288 '+cy+'H312" stroke="'+Wh+'" stroke-width="2"/>';
 if(kind==='pa')s+=arrows(128,186)+'<path d="M240 '+(y+2)+'V'+(y+32)+'" stroke="'+Wh+'" stroke-width="2.4"/>'+keys(246)+n09(296,cy);
 if(kind==='px')s+=xs(150,206)+'<path d="M240 '+(y+2)+'V'+(y+32)+'" stroke="'+Wh+'" stroke-width="2.4"/>'+keys(246)+n09(296,cy);
 if(kind==='ta')s+=n09(134,cy)+arrows(158,224)+chev(290);
 if(kind==='tx')s+=n09(134,cy)+xs(184,246)+chev(290);
 return s+T(8,y+9,l1,'d1')+T(8,y+20,l2,'d2')+T(8,y+30,l3||'','d2')}
sec(D,'Displaced thresholds',[
 F('Normal and displaced threshold markings',
  strip(10,'n','Normal threshold','piano keys; 09 =','runway 090°')
  +strip(54,'pa','Permanent, arrows','taxi and take-off,','no landing')
  +strip(98,'px','Permanent, crosses','unfit; not usable','as a stopway')
  +strip(142,'ta','Temporary, arrows','taxi and take-off,','no landing')
  +strip(186,'tx','Temporary, crosses','unfit for aircraft','')
  +T(176,236,'pre-threshold area','d2','middle')+T(276,236,'new threshold','d2','middle'),
  'Landing direction is left to right. Permanent displacement: a threshold bar and piano keys further up the runway. Temporary: chevrons mark the new threshold. Crosses are no more than 300 m apart, arms at 45° to the centreline.',320,244)
]);
sec(D,'Signals seen only on the ground',[
 F('Signals seen only on the ground',
  grid([[mBall(1,'#111'),'Black ball: take-off','and landing may differ',true],[mBall(2,Re),'Two red balls:','gliding',true],[mFlag(null,true),'Chequered flag: move','only with ATC OK',true],
        [mFlag(Re),'Red flag:','left-hand circuit',true],[mFlag('#2f9d4c'),'Green flag:','right-hand circuit',true],[sC,'Black C on yellow:','report to ATC here',true]]),
  'Mast signals are hoisted for aircraft on the ground. The C board stands away from the signals area, where you report to ATC or the aerodrome authority.',320,rows(2))
]);
/* light signals, drawn like the book: tower on the left, an aircraft in flight and one on the ground */
function tower(x,y){return'<path d="M'+x+' '+y+'V'+(y-34)+'" stroke="var(--ink-2)" stroke-width="4"/><path d="M'+(x-10)+' '+(y-34)+'H'+(x+10)+'L'+(x+7)+' '+(y-42)+'H'+(x-7)+'Z" fill="var(--ink-2)"/><path d="M'+(x-12)+' '+(y-44)+'H'+(x+12)+'L'+x+' '+(y-50)+'Z" fill="var(--ink)"/>'}
function beam(x1,y1,x2,y2,c,fl){return'<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" stroke="'+c+'" stroke-width="'+(c==='#f4f1e6'?3:4)+'"'+(fl?' stroke-dasharray="6 4"':'')+(c==='#f4f1e6'?' style="filter:drop-shadow(0 0 .6px #555)"':'')+'/>'}
function lpanel(y,name,c,fl,air,gnd,flare){var s=dzB(8,y,150,72,'#cfe3f2','var(--line)',4)+'<path d="M8 '+(y+66)+'H158V'+(y+72)+'H8Z" fill="#3a4250"/>'+tower(28,y+66)+T(14,y+12,name,'d1',null,null,'#1d2b45')
 +dzSide(130,y+22,.4,'#1d2b45',false)+dzSide(130,y+60,.4,'#1d2b45',false);
 if(flare)s+='<path d="M32 '+(y+16)+'Q50 '+(y+8)+'70 '+(y+24)+'" stroke="'+c+'" stroke-width="1.2" fill="none"/><circle cx="72" cy="'+(y+30)+'" r="8" fill="'+c+'"/>';
 else s+=beam(38,y+22,108,y+21,c,fl)+beam(38,y+26,108,y+58,c,fl);
 return s+T(166,y+16,air[0],'d2')+T(166,y+26,air[1]||'','d2')+T(166,y+54,gnd[0],'d2')+T(166,y+64,gnd[1]||'','d2')}
sec(D,'Light signals from ATC',[
 F('From ATC to aircraft: red signals',
  lpanel(8,'Steady red',Re,false,['Do not land. Give way to','others and keep circling'],['Stop'])
  +lpanel(88,'Flashing red',Re,true,['Do not land: aerodrome','closed, go elsewhere'],['Move clear of the','landing area'])
  +lpanel(168,'Red flare',Re,false,['Do not land; wait','for permission'],['(no ground meaning)'],true),
  'Each panel: the upper text is for an aircraft in flight, the lower one for an aircraft on the ground.',320,248),
 F('From ATC to aircraft: green and white signals',
  lpanel(8,'Flashing green','#2f9d4c',true,['Return to this aerodrome and','wait for permission to land'],['Cleared to taxi, if no','risk of collision'])
  +lpanel(88,'Steady green','#2f9d4c',false,['Cleared to land, if no','risk of collision'],['Cleared to take off, if no','risk of collision'])
  +lpanel(168,'Flashing white','#f4f1e6',true,['Land here after a steady','green, then await instructions'],['Return to your starting','point on the aerodrome']),
  'Flashing green means "come back" in the air but "taxi" on the ground; steady green is land or take off.',320,248)
]);
sec(D,'Light signals from aircraft',[
 F('From aircraft to ATC',
  [[8,'Flashing lights','I am compelled to land',''],[88,'Red flare','Immediate assistance','required'],[168,'Green flare','Night: may I land? Day: may I','land in another direction?']].map(function(r,i){var y=r[0];
   return dzB(8,y,150,72,'#cfe3f2','var(--line)',4)+'<path d="M8 '+(y+66)+'H158V'+(y+72)+'H8Z" fill="#3a4250"/>'+tower(28,y+66)+T(14,y+12,r[1],'d1',null,null,'#1d2b45')
    +(i===0?P(100,y+34,0,'#1d2b45',1.6)+'<circle cx="84" cy="'+(y+30)+'" r="4.5" fill="'+Re+'"/><circle cx="116" cy="'+(y+30)+'" r="4.5" fill="#2f9d4c"/><circle cx="100" cy="'+(y+19)+'" r="3.5" fill="#fff59a" stroke="#888" stroke-width=".5"/>'
      :dzSide(128,y+40,.4,'#1d2b45',false)+'<path d="M112 '+(y+36)+'Q92 '+(y+12)+'72 '+(y+30)+'" stroke="'+(i===1?Re:'#2f9d4c')+'" stroke-width="1.2" fill="none"/><circle cx="70" cy="'+(y+38)+'" r="9" fill="'+(i===1?Re:'#2f9d4c')+'"/>')
    +T(166,y+34,r[2],'d2')+T(166,y+45,r[3],'d2')}).join(''),
  'Few aircraft carry flares, but you can always flash the landing or navigation lights on and off (seen mainly at night) to say you are compelled to land.',320,248)
]);
/* marshalling: a marshaller facing you. Their right arm is on your left. Arms: points from the shoulder [dx,dy]. */
var SK='#f0a53a',SKd='#d9822b';
function man(cx,by,aR,aL,o){o=o||{};var col=o.col||SK,sh=by-54,s='<path d="M'+(cx-30)+' '+(by+1)+'H'+(cx+30)+'" stroke="var(--ink-2)" stroke-width="2.5"/>';
 s+='<path d="M'+(cx-4)+' '+(by-30)+'L'+(cx-10)+' '+by+'M'+(cx+4)+' '+(by-30)+'L'+(cx+10)+' '+by+'" stroke="'+(o.leg||SKd)+'" stroke-width="5" stroke-linecap="round"/>';
 s+='<path d="M'+(cx-10)+' '+(sh-2)+'H'+(cx+10)+'L'+(cx+8)+' '+(by-28)+'H'+(cx-8)+'Z" fill="'+col+'"/>'+(o.band?'<path d="M'+(cx-9)+' '+(by-44)+'H'+(cx+9)+'M'+(cx-8)+' '+(by-34)+'H'+(cx+8)+'" stroke="'+Ye+'" stroke-width="2.4"/>':'');
 s+='<circle cx="'+cx+'" cy="'+(by-64)+'" r="7" fill="'+(o.head||SK)+'"/>'+(o.helmet?'<path d="M'+(cx-8)+' '+(by-65)+'A8 8 0 0 1 '+(cx+8)+' '+(by-65)+'Z" fill="#eee" stroke="#999" stroke-width=".6"/>':'');
 function arm(x0,a,bat){if(!a)return'';var d='M'+x0+' '+sh,px=x0,py=sh;a.forEach(function(p){px=x0+p[0];py=sh+p[1];d+='L'+px+' '+py});return'<path d="'+d+'" stroke="'+col+'" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'+(bat?'<circle cx="'+px+'" cy="'+py+'" r="4.2" fill="'+Nv+'" stroke="#fff" stroke-width=".8"/>':'<circle cx="'+px+'" cy="'+py+'" r="2.6" fill="'+(o.hand||col)+'"/>')}
 return s+arm(cx-9,aR,o.bats!==false)+arm(cx+9,aL,o.bats!==false)+(o.extra||'')}
function mv(d,c){return'<path d="'+d+'" stroke="'+(c||'var(--bad)')+'" stroke-width="1.3" stroke-dasharray="3 2" fill="none"/>'}
function arr(x1,y1,x2,y2){return A(x1,y1,x2,y2,'var(--bad)',1.2)}
var DN_R=[[-5,13],[-7,27]],DN_L=[[5,13],[7,27]],OUT_R=[[-10,10],[-18,22]],OUT_L=[[10,10],[18,22]],UP_R=[[-3,-14],[-3,-28]],UP_L=[[3,-14],[3,-28]],HZ_R=[[-14,0],[-29,0]],HZ_L=[[14,0],[29,0]];
function mtile(i,draw,l1,l2){var x=8+(i%3)*104,y=8+Math.floor(i/3)*130;return dzB(x,y,96,122,'var(--surface-2)','var(--line)',6)+draw(x+48,y+92)+T(x+48,y+106,l1,'d2','middle')+T(x+48,y+116,l2,'d2','middle')}
function mgrid(list){return list.map(function(t,i){return mtile(i,t[0],t[1],t[2])}).join('')}
function mh(n){return 8+Math.ceil(n/3)*130}
var M1=[
 [function(cx,by){return man(cx,by,null,null,{extra:man(cx,by,DN_R,[[-6,6],[-30,4]],{bats:true})})+'<circle cx="'+(cx-40)+'" cy="'+(by-52)+'" r="5" fill="none" stroke="var(--ink-2)" stroke-dasharray="2 2"/>'+arr(cx-22,by-60,cx-34,by-60)},'Proceed to the','next marshaller'],
 [function(cx,by){return man(cx,by,OUT_R,OUT_L)+mv('M'+(cx-27)+' '+(by-34)+'Q'+(cx-34)+' '+(by-86)+' '+(cx-6)+' '+(by-84))+arr(cx-10,by-85,cx-4,by-84)+mv('M'+(cx+27)+' '+(by-34)+'Q'+(cx+34)+' '+(by-86)+' '+(cx+6)+' '+(by-84))+arr(cx+10,by-85,cx+4,by-84)},'Move ahead','(beckon up and back)'],
 [function(cx,by){return man(cx,by,DN_R,OUT_L)+mv('M'+(cx+27)+' '+(by-34)+'Q'+(cx+30)+' '+(by-86)+' '+(cx+6)+' '+(by-84))+arr(cx+10,by-85,cx+4,by-84)},'Turn to port','(right arm down)'],
 [function(cx,by){return man(cx,by,OUT_R,DN_L)+mv('M'+(cx-27)+' '+(by-34)+'Q'+(cx-30)+' '+(by-86)+' '+(cx-6)+' '+(by-84))+arr(cx-10,by-85,cx-4,by-84)},'Turn to starboard','(left arm down)'],
 [function(cx,by){return man(cx,by,[[-8,-12],[6,-28]],[[8,-12],[-6,-28]])+mv('M'+(cx-14)+' '+(by-86)+'Q'+cx+' '+(by-78)+' '+(cx+14)+' '+(by-86))},'Stop (arms crossed','above the head)'],
 [function(cx,by){return man(cx,by,[[-13,4],[-14,-10]],HZ_L)+'<circle cx="'+(cx-23)+'" cy="'+(by-64)+'" r="8" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/>'+arr(cx-31,by-60,cx-30,by-56)},'Start engine (circle;','other arm points)'],
 [function(cx,by){return man(cx,by,[[-12,8],[-24,16]],[[12,8],[24,16]])+arr(cx-26,by-24,cx-14,by-28)+arr(cx+26,by-24,cx+14,by-28)},'Chocks inserted','(swing inwards)'],
 [function(cx,by){return man(cx,by,[[-4,13],[-10,25]],[[4,13],[10,25]])+arr(cx-14,by-20,cx-28,by-24)+arr(cx+14,by-20,cx+28,by-24)},'Chocks away','(swing outwards)'],
 [function(cx,by){return man(cx,by,DN_R,[[12,4],[-4,-4]])+arr(cx-6,by-62,cx+22,by-62)},'Cut engines (hand','across the chest)']
];
var M2=[
 [function(cx,by){return man(cx,by,OUT_R,OUT_L)+arr(cx-27,by-31,cx-27,by-46)+arr(cx-27,by-31,cx-27,by-18)+arr(cx+27,by-31,cx+27,by-46)+arr(cx+27,by-31,cx+27,by-18)},'Slow down','(arms move up, down)'],
 [function(cx,by){return man(cx,by,OUT_R,DN_L)+arr(cx-27,by-31,cx-27,by-46)+arr(cx-27,by-31,cx-27,by-18)},'Slow engines on','the indicated side'],
 [function(cx,by){return man(cx,by,[[-5,-14],[-7,-28]],[[5,-14],[7,-28]])},'This bay','(arms vertical)'],
 [function(cx,by){return man(cx,by,[[-4,14],[10,10]],DN_L,{bats:false,extra:'<path d="M'+(cx+3)+' '+(by-50)+'h6M'+(cx+3)+' '+(by-47)+'h6M'+(cx+3)+' '+(by-44)+'h6" stroke="var(--ink)" stroke-width="1"/>'})},'Release brakes','(fist, then open)'],
 [function(cx,by){return man(cx,by,[[-4,14],[10,10]],DN_L,{bats:false,extra:'<circle cx="'+(cx+1)+'" cy="'+(by-44)+'" r="3.4" fill="'+SKd+'"/>'})},'Engage brakes','(open, then fist)'],
 [function(cx,by){return man(cx,by,[[-15,0],[-15,-15]],DN_L)},'All clear: marshalling','finished'],
 [function(cx,by){return man(cx,by,[[-13,4],[-14,-10]],[[4,-14],[4,-28]],{extra:'<text x="'+(cx+16)+'" y="'+(by-80)+'" class="d1">2</text>'})+'<circle cx="'+(cx-23)+'" cy="'+(by-64)+'" r="8" fill="none" stroke="var(--bad)" stroke-width="1.2" stroke-dasharray="3 2"/>'},'Start engine no. 2','(fingers overhead)'],
 [function(cx,by){return man(cx,by,UP_R,[[6,13],[12,27]])+arr(cx-20,by-80,cx-20,by-58)+arr(cx-20,by-62,cx-20,by-84)},'Back tail to','starboard'],
 [function(cx,by){return man(cx,by,[[-6,13],[-12,27]],UP_L)+arr(cx+20,by-80,cx+20,by-58)+arr(cx+20,by-62,cx+20,by-84)},'Back tail to','port']
];
var MH=[
 [function(cx,by){return man(cx,by,HZ_R,HZ_L)},'Hover','(arms out sideways)'],
 [function(cx,by){return man(cx,by,[[-2,14],[12,22]],[[2,14],[-12,22]])},'Land (arms crossed','low in front)'],
 [function(cx,by){return man(cx,by,HZ_R,HZ_L)+arr(cx-30,by-58,cx-30,by-76)+arr(cx+30,by-58,cx+30,by-76)},'Move upwards','(palms up, beckon)'],
 [function(cx,by){return man(cx,by,HZ_R,HZ_L)+arr(cx-30,by-50,cx-30,by-32)+arr(cx+30,by-50,cx+30,by-32)},'Move downwards','(palms down)'],
 [function(cx,by){return man(cx,by,HZ_R,[[10,8],[-14,10]])+mv('M'+(cx+14)+' '+(by-36)+'Q'+cx+' '+(by-26)+' '+(cx-22)+' '+(by-38))+arr(cx-16,by-34,cx-24,by-40)},'Move horizontally','(sweep across body)'],
 [function(cx,by){return man(cx,by,OUT_R,OUT_L)+arr(cx-30,by-34,cx-30,by-54)+arr(cx+30,by-34,cx+30,by-54)},'Move back (sweep','up to shoulders)'],
 [function(cx,by){return man(cx,by,[[-4,12],[-6,22]],[[4,4],[2,10]],{bats:false})+'<circle cx="'+cx+'" cy="'+(by-46)+'" r="3" fill="'+SKd+'"/>'+arr(cx,by-36,cx-24,by-36)+arr(cx,by-36,cx+24,by-36)},'Release load (slice','under the left arm)']
];
function cockpit(cx,by,extra){return'<path d="M'+(cx-40)+' '+by+'L'+(cx-36)+' '+(by-70)+'Q'+cx+' '+(by-78)+' '+(cx+36)+' '+(by-70)+'L'+(cx+40)+' '+by+'" stroke="var(--ink-2)" stroke-width="2" fill="none"/>'
 +'<path d="M'+(cx-17)+' '+(by-14)+'Q'+cx+' '+(by-34)+' '+(cx+17)+' '+(by-14)+'Z" fill="'+SKd+'"/><circle cx="'+cx+'" cy="'+(by-40)+'" r="9" fill="'+SKd+'"/>'+(extra||'')+'<path d="M'+(cx-42)+' '+by+'Q'+cx+' '+(by-22)+' '+(cx+42)+' '+by+'Z" fill="var(--accent)"/>'}
function hand(x,y,open){return open?'<path d="M'+(x-4)+' '+(y+4)+'V'+(y-6)+'M'+(x-1.3)+' '+(y+4)+'V'+(y-8)+'M'+(x+1.4)+' '+(y+4)+'V'+(y-8)+'M'+(x+4)+' '+(y+4)+'V'+(y-6)+'" stroke="'+SK+'" stroke-width="2.2" stroke-linecap="round"/>':'<circle cx="'+x+'" cy="'+y+'" r="4" fill="'+SK+'" stroke="'+SKd+'" stroke-width=".8"/>'}
var MP=[
 [function(cx,by){return cockpit(cx,by,'<path d="M'+(cx+12)+' '+(by-22)+'L'+(cx-14)+' '+(by-40)+'" stroke="'+SK+'" stroke-width="4" stroke-linecap="round"/>'+hand(cx-16,by-44,false)+T(cx-24,by-62,'open, fist','d2','middle'))},'Brakes engaged','(fingers, then fist)'],
 [function(cx,by){return cockpit(cx,by,'<path d="M'+(cx+12)+' '+(by-22)+'L'+(cx-14)+' '+(by-40)+'" stroke="'+SK+'" stroke-width="4" stroke-linecap="round"/>'+hand(cx-16,by-44,false)+T(cx-24,by-62,'fist, open','d2','middle'))},'Brakes released','(fist, then fingers)'],
 [function(cx,by){return cockpit(cx,by,hand(cx-26,by-44,true)+hand(cx+26,by-44,true)+arr(cx-22,by-56,cx-10,by-56)+arr(cx+22,by-56,cx+10,by-56))},'Insert chocks','(hands in, cross)'],
 [function(cx,by){return cockpit(cx,by,hand(cx-6,by-44,true)+hand(cx+6,by-44,true)+arr(cx-10,by-56,cx-26,by-56)+arr(cx+10,by-56,cx+26,by-56))},'Remove chocks','(hands out)'],
 [function(cx,by){return cockpit(cx,by,hand(cx-22,by-46,true)+T(cx-22,by-56,'no. 2','d2','middle'))},'Ready to start','(fingers = engine)'],
 [function(cx,by){return'<path d="M'+(cx-44)+' '+(by-50)+'H'+(cx+44)+'" stroke="var(--ink-2)" stroke-width="3"/><circle cx="'+cx+'" cy="'+(by-50)+'" r="7" fill="var(--ink-2)"/>'+[[-34,'4'],[-18,'3'],[18,'2'],[34,'1']].map(function(e){return'<circle cx="'+(cx+e[0])+'" cy="'+(by-44)+'" r="4.5" fill="var(--surface)" stroke="var(--ink)"/>'+T(cx+e[0],by-28,e[1],'d1','middle')}).join('')+T(cx,by-64,'seen from the front','d2','middle')+T(cx-30,by-6,'stbd','d2','middle')+T(cx+30,by-6,'port','d2','middle')},'Engine numbers, from','marshaller\'s right']
];
var FF='#8a5530',ffo={col:FF,leg:'#6d4224',head:'#e0b48a',band:true,helmet:true,bats:false,hand:'#333'};
var ME=[
 [function(cx,by){return man(cx,by,[[-5,13],[-6,26]],[[14,0],[14,-14]],ffo)+mv('M'+(cx+28)+' '+(by-68)+'Q'+(cx+34)+' '+(by-58)+' '+(cx+30)+' '+(by-48))},'Recommend','evacuation'],
 [function(cx,by){return man(cx,by,[[-10,-10],[4,-22]],[[10,-10],[-4,-22]],ffo)},'Recommend stop','(crossed at wrists)'],
 [function(cx,by){return man(cx,by,[[-14,12],[-24,22]],[[14,12],[24,22]],ffo)+arr(cx-24,by-22,cx-10,by-16)+arr(cx+24,by-22,cx+10,by-16)},'Emergency contained','(in below the waist)'],
 [function(cx,by){return man(cx,by,[[-8,10],[-14,22]],[[14,-8],[26,-20]],ffo)+mv('M'+(cx-20)+' '+(by-56)+'Q'+(cx-30)+' '+(by-36)+' '+(cx-18)+' '+(by-16))+T(cx+26,by-80,'fire','d2','middle')},'Fire (fan; point','at the fire)']
];
sec(D,'Marshalling signals: marshaller',[
 F('Marshaller to pilot (1)',mgrid(M1),'The marshaller faces you, so their right arm is on your left. Bats by day, lit wands at night. Dashed lines and arrows show the movement.',320,mh(9)),
 F('Marshaller to pilot (2)',mgrid(M2),'Brakes: fist then fingers is release, fingers then fist is engage. All clear is the right arm raised at the elbow, palm forward.',320,mh(9))
]);
sec(D,'Marshalling signals: helicopters',[F('Helicopter marshalling signals',mgrid(MH),'Only used for helicopters. The speed of the arm movement shows the rate of climb or descent.',320,mh(7))]);
sec(D,'Signals from pilot',[F('Pilot to marshaller',mgrid(MP),'Made from the cockpit so the marshaller can see. For a multi-engine aircraft, number 1 is the port outer engine, counted from the marshaller\'s right.',320,mh(6))]);
sec(D,'Emergency hand signals',[F('Standard emergency hand signals',mgrid(ME),'Given by the fire and rescue crew to the flight crew. At night the same signals are made with wands.',320,mh(4))]);

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
