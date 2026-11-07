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
  +T(74,206,'It stays still in your windscreen','d1','middle')+T(74,106,'Your view at t1, t2 and t3','d2','middle'),
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
  +dzSide(282,100,.8,'var(--accent)',true)+A(270,108,212,150,'var(--mid)',1.4,'5 3')+T(258,140,'No take-off or','d1','middle',null,'var(--mid)')+T(258,151,'landing within','d1','middle',null,'var(--mid)')+T(258,162,'1,000 m','d1','middle',null,'var(--mid)')
  +T(258,180,'unless at an aerodrome','d2','middle')+T(258,190,'or with permission','d2','middle'),
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
  panel(10,8,145,180,4,'Converging')+acL(116,64,-90,1.1,'var(--ink)',false)+A(102,64,30,64,'var(--ink-2)',1.2,'4 3')+T(116,44,'has right of way','d2','middle')
  +acL(40,160,0,1.1,'var(--accent)',false)+taxi('M40 146Q42 98 100 98Q140 98 142 50')+A(142,54,142,40,'var(--bad)',1.4)+T(54,166,'has it on its right:','d2')+T(54,176,'stop or pass behind','d2')
  +panel(165,8,145,180,5,'Overtaking')+acL(240,70,-90,1.1,'var(--ink)',false)+A(226,70,180,70,'var(--ink-2)',1.2,'4 3')+T(240,50,'being overtaken:','d2','middle')+T(240,60,'has right of way','d2','middle')
  +acL(292,150,-90,1.1,'var(--accent)',false)+taxi('M278 150Q250 150 240 120Q232 104 200 100')+A(204,100,186,100,'var(--bad)',1.4)+T(238,172,'overtaker keeps','d2','middle')+T(238,182,'well clear until past','d2','middle'),
  'The one with the other on its right gives way and must not cross ahead unless well clear. The aircraft being overtaken has right of way.',320,196)
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
