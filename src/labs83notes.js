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
