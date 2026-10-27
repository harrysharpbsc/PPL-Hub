/* ===== Topic diagrams: shared helpers ===== */
function dzF(title,inner,cap,w,h){w=w||320;h=h||200;return'<figure class="dg dgx"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(title)+'"><rect width="'+w+'" height="'+h+'" class="ch-paper" rx="6"/>'+chartPaper(w,h)+inner+'</svg><figcaption><b>'+title+'</b>'+cap+'</figcaption></figure>'}
function dzT(x,y,s,c,a,fs,fill){var dk=fill&&/^#([9a-f7][0-9a-f]{2}|[9a-f7][0-9a-f]{5})$/i.test(fill);return'<text x="'+x+'" y="'+y+'"'+(a?' text-anchor="'+a+'"':'')+' class="'+(c||'d1')+(dk?' dk':'')+'"'+((fs||fill)?' style="'+(fs?'font-size:'+fs+'px;':'')+(fill?'fill:'+fill:'')+'"':'')+'>'+s+'</text>'}
function dzA(x1,y1,x2,y2,c,w,dash){c=c||'var(--ink)';w=w||1.6;var a=Math.atan2(y2-y1,x2-x1),L=6+w*1.5,hx=x2-Math.cos(a)*L,hy=y2-Math.sin(a)*L,px=Math.sin(a)*L*.45,py=-Math.cos(a)*L*.45;return'<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+'L'+hx.toFixed(1)+' '+hy.toFixed(1)+'" stroke="'+c+'" stroke-width="'+w+'" fill="none"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/><path d="M'+x2.toFixed(1)+' '+y2.toFixed(1)+'L'+(hx+px).toFixed(1)+' '+(hy+py).toFixed(1)+'L'+(hx-px).toFixed(1)+' '+(hy-py).toFixed(1)+'Z" fill="'+c+'"/>'}
function dzB(x,y,w,h,fill,stroke,r,sw){return'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(r===undefined?4:r)+'" fill="'+(fill||'var(--surface)')+'" stroke="'+(stroke||'var(--ink-2)')+'" stroke-width="'+(sw||1)+'"/>'}
function dzL(d,c,w,dash,f){return'<path d="'+d+'" stroke="'+(c||'var(--ink)')+'" stroke-width="'+(w||1.4)+'" fill="'+(f||'none')+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'}
function dzP(x,y,h,col,sc){return'<g transform="translate('+x+' '+y+') rotate('+(h||0)+') scale('+(sc||1.4)+')"><path d="'+ACPATH+'" fill="'+(col||'var(--accent)')+'" stroke="var(--surface)" stroke-width=".6" stroke-linejoin="round"/></g>'}
function dzSide(x,y,sc,col,flip){col=col||'var(--accent)';return'<g transform="translate('+x+' '+y+') scale('+(flip?-sc:sc)+' '+sc+')"><path d="M-30 0C-30-5-24-7-16-7H10L22-4L27-14H31L30 0L22 2H-16C-24 2-30 2-30 0Z" fill="'+col+'"/><path d="M-12-7L-6-13H6L10-7Z" fill="'+col+'" opacity=".75"/><path d="M-14-13H18" stroke="'+col+'" stroke-width="2.4"/><path d="M-4-12L-10-1" stroke="var(--ink-2)" stroke-width=".8"/><path d="M-32-7V7" stroke="var(--ink-2)" stroke-width="1.2"/><circle cx="-12" cy="6" r="2.4" fill="var(--ink)"/><circle cx="-24" cy="5" r="2" fill="var(--ink)"/><path d="M-12 2V4M-24 2V3" stroke="var(--ink)"/></g>'}
function dzAdd(topic,figs){var cur=DIAG[topic]||'';if(cur)cur=cur.replace(/<\/div>\s*$/,'');else cur='<div class="dgs">';DIAG[topic]=cur+figs.join('')+'</div>'}
function dzPie(cx,cy,r,okt,col){var a=okt/8*Math.PI*2,x=cx+Math.sin(a)*r,y=cy-Math.cos(a)*r;var p=okt>=8?'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+col+'"/>':okt<=0?'':'<path d="M'+cx+' '+cy+'V'+(cy-r)+'A'+r+' '+r+' 0 '+(okt>4?1:0)+' 1 '+x.toFixed(1)+' '+y.toFixed(1)+'Z" fill="'+col+'"/>';return'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="var(--surface)" stroke="var(--ink)" stroke-width="1"/>'+p}
var ACPATH='M0 -10.2L1.15 -9.9L1.7 -8.2L1.75 -5.6L10.1 -5.1L10.4 -4.3L10.3 -2.3L1.7 -1.9L1.45 5.2L1 7.1L4.7 7.4L4.9 8L4.8 9.4L0.6 9.6L0 10.4L-0.6 9.6L-4.8 9.4L-4.9 8L-4.7 7.4L-1 7.1L-1.45 5.2L-1.7 -1.9L-10.3 -2.3L-10.4 -4.3L-10.1 -5.1L-1.75 -5.6L-1.7 -8.2L-1.15 -9.9ZM-3.4 -10.9H3.4V-10.4H-3.4Z';

/* ===== Air Law: Operations of Aircraft ===== */
dzAdd('Operations of Aircraft',[
 dzF('Three ways EASA classifies an operation',
  dzB(110,10,100,26,'var(--accent-soft)','var(--accent)')+dzT(160,27,'Civil aviation activity','d1','middle')
  +[['Remuneration?','Commercial','Non-commercial',8],['Activity?','Air transport','Specialised op',112],['Aircraft?','Complex','Other than complex',216]].map(function(r){var x=r[3];return dzA(160,36,x+48,62,'var(--ink-2)',1.2)+dzB(x,64,96,24)+dzT(x+48,80,r[0],'d1','middle')+dzA(x+48,88,x+22,118,'var(--ink-2)',1)+dzA(x+48,88,x+74,118,'var(--ink-2)',1)+dzB(x,120,46,40,'var(--surface-2)')+dzB(x+50,120,46,40,'var(--surface-2)')+dzT(x+23,136,r[1].split(' ')[0],'d2','middle',7)+dzT(x+23,147,r[1].split(' ').slice(1).join(' '),'d2','middle',7)+dzT(x+73,136,r[2].split(' ')[0],'d2','middle',7)+dzT(x+73,147,r[2].split(' ').slice(1).join(' '),'d2','middle',7)}).join('')
  +dzT(160,185,'Every operation is classified all three ways at once','d2','middle'),
  'Commercial or not depends on payment, air transport or specialised on the activity, complex or not on the aircraft.'),
 dzF('What makes an aeroplane complex',
  [['MTOM over','5,700 kg','M30 60h40v-14l-8-10h-24l-8 10Z'],['Passenger seats','more than 19',''],['Minimum crew','2 pilots',''],['Engines','1+ turbojet or 2+ turboprop','']].map(function(r,i){var x=10+i*76;return dzB(x,30,70,110,'var(--surface)','var(--accent)',6)+dzT(x+35,52,r[0],'d2','middle')+(r[1].length>14?dzT(x+35,124,r[1].split(' or ')[0],'d1','middle',7.5)+dzT(x+35,135,'or '+r[1].split(' or ')[1],'d1','middle',7.5):dzT(x+35,128,r[1],'d1','middle'))}).join('')
  +'<g transform="translate(45 92)"><path d="M-18 10H18L14-6H-14Z" fill="var(--ink-2)"/><text y="6" text-anchor="middle" class="d1" style="fill:var(--surface)">kg</text></g>'
  +'<g transform="translate(121 92)">'+[0,1,2,3].map(function(r){return[0,1,2,3,4].map(function(c){return'<rect x="'+(-17+c*7)+'" y="'+(-14+r*7)+'" width="5" height="5" rx="1" fill="var(--ink-2)"/>'}).join('')}).join('')+'</g>'
  +'<g transform="translate(197 92)"><circle cx="-8" cy="-6" r="5" fill="var(--ink-2)"/><circle cx="8" cy="-6" r="5" fill="var(--ink-2)"/><path d="M-16 12C-16 2-12 0-8 0S0 2 0 12ZM0 12C0 2 4 0 8 0S16 2 16 12Z" fill="var(--ink-2)"/></g>'
  +'<g transform="translate(273 92)"><path d="M-18-6H10L18 0L10 6H-18Z" fill="var(--ink-2)"/><path d="M-18-8V8" stroke="var(--ink)" stroke-width="2"/></g>'
  +dzT(160,172,'Any one of these makes it complex','d1','middle',null,'var(--bad)')+dzT(160,188,'A typical PPL single meets none of them','d2','middle'),
  'MTOM over 5,700 kg, more than 19 passenger seats, at least 2 pilots, or at least one turbojet or more than one turboprop.'),
 dzF('Which rules for a G-registered aeroplane?',
  dzB(10,10,300,24,'var(--accent-soft)','var(--accent)')+dzT(160,26,'UK SERA rules of the air: every aircraft in UK airspace','d1','middle')
  +dzB(10,46,145,26,'var(--surface)','var(--good)')+dzT(82,63,'Part-21 aircraft','d1','middle')+dzB(165,46,145,26,'var(--surface)','var(--mid)')+dzT(237,63,'Non-Part-21 aircraft','d1','middle')
  +dzT(82,86,'modern factory-built','d2','middle')+dzT(237,86,'vintage, ex-military, amateur-built,','d2','middle')+dzT(237,97,'microlights, gyroplanes','d2','middle')
  +dzB(10,108,68,44,'var(--surface-2)')+dzT(44,126,'Licensing','d2','middle')+dzT(44,141,'Part-FCL','d1','middle')+dzB(87,108,68,44,'var(--surface-2)')+dzT(121,126,'Operations','d2','middle')+dzT(121,141,'Part-NCO','d1','middle')
  +dzB(165,108,68,44,'var(--surface-2)')+dzT(199,126,'Licensing','d2','middle')+dzT(199,141,'ANO Pt 6, Sch 8','d1','middle',7.2)+dzB(242,108,68,44,'var(--surface-2)')+dzT(276,126,'Operations','d2','middle')+dzT(276,141,'ANO Pt 5, Sch 5','d1','middle',7.2)
  +dzB(10,164,300,26,'var(--surface)','var(--ink-2)')+dzT(160,181,'ANO 2016: safety rules for all aircraft and people in UK airspace','d2','middle'),
  'The rules of the air apply to everyone. Licensing and operating rules depend on whether the aircraft is Part-21 or not.')
]);

/* ===== Air Law: Aviation Law and organisations ===== */
dzAdd('Aviation Law and organisations',[
 dzF('From Paris to the UK on its own',
  dzL('M20 100H300','var(--ink)',2)+[[36,'1919','Paris','Convention'],[98,'1944','Chicago','Convention'],[160,'1947','ICAO formed','in Montreal'],[222,'2021','UK leaves','EASA'],[278,'Now','CAA, ANO and','assimilated law']].map(function(r,i){var up=i%2===0;return'<circle cx="'+r[0]+'" cy="100" r="6" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/>'+dzL('M'+r[0]+' '+(up?94:106)+'V'+(up?70:130),'var(--ink-2)',1)+dzT(r[0],up?62:142,r[1],'d3','middle')+dzT(r[0],up?40:158,r[2],'d2','middle',7.5)+dzT(r[0],up?50:168,r[3],'d2','middle',7.5)}).join(''),
  'Paris 1919 set the first principles. Chicago 1944 created the obligations and ICAO followed in 1947. Since 2021 the UK regulates itself.'),
 dzF('The AIP and the 28-day AIRAC cycle',
  [['GEN','National rules,','services, charges','var(--accent)'],['ENR','En route rules,','ATS, warnings','var(--good)'],['AD','Licensed UK','aerodromes','var(--mid)']].map(function(r,i){var x=14+i*62;return'<path d="M'+x+' 30h52l6 6v104h-58Z" fill="var(--surface)" stroke="'+r[3]+'" stroke-width="1.6"/><path d="M'+(x+52)+' 30v6h6" fill="none" stroke="'+r[3]+'"/>'+dzT(x+29,60,r[0],'d3','middle',null,r[3])+dzT(x+29,90,r[1],'d2','middle',6.6)+dzT(x+29,101,r[2],'d2','middle',6.6)}).join('')
  +'<g transform="translate(252 84)"><circle r="44" fill="none" stroke="var(--ink-2)" stroke-width="6" stroke-dasharray="17.5 5.5"/>'+dzT(0,-4,'AIRAC','d3','middle')+dzT(0,12,'every 28 days','d2','middle')+'</g>'
  +dzT(160,175,'Temporary changes: NOTAMs and AIP Supplements','d2','middle'),
  'GEN for the national framework, ENR for flying between places, AD for aerodromes. Lasting changes come in on fixed AIRAC dates.'),
 dzF('AIC colours',
  [['Pink','Air safety','#f2a9c4'],['White','Administrative','#ffffff'],['Yellow','Operational and ATS','#f6e27a'],['Mauve','UK restrictions chart','#c9a3e0'],['Green','Maps and charts','#a9d8a0']].map(function(r,i){var y=18+i*34;return dzB(20,y,46,26,r[2],'var(--ink-2)',3)+dzT(80,y+12,r[0],'d1')+dzT(80,y+23,r[1],'d2')}).join('')
  +dzB(196,40,108,110,'var(--surface)','var(--bad)',6)+dzT(250,62,'Read the pink ones','d1','middle',null,'var(--bad)')+dzT(250,84,'Take-off, climb and','d2','middle')+dzT(250,96,'landing performance','d2','middle')+dzT(250,114,'Wake turbulence','d2','middle')+dzT(250,132,'Degraded visual','d2','middle')+dzT(250,144,'(helicopters)','d2','middle'),
  'Aeronautical Information Circulars are colour coded. Pink ones carry safety advice and can come up in the exam.'),
 dzF('NOTAM types',
  [['NOTAMN','New','var(--good)','M0 0h40v26h-40Z'],['NOTAMR','Replaces an earlier one','var(--mid)',''],['NOTAMC','Cancels an earlier one','var(--bad)','']].map(function(r,i){var y=24+i*50;return dzB(20,y,90,34,'var(--surface)',r[2],5,1.8)+dzT(65,y+22,r[0],'d3','middle',null,r[2])+dzA(116,y+17,150,y+17,'var(--ink-2)',1.2)+dzT(158,y+21,r[1],'d1')}).join('')
  +dzT(160,186,'Check NOTAMs every day before you fly','d2','middle'),
  'Restrictions, closures, temporary obstacles and displays come by NOTAM. Larger temporary changes come as AIP Supplements.')
]);
