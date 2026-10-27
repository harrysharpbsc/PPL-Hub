/* ===== LABS: weight and balance ===== */
(function(){
var AC={ew:1580,ea:86.5,mtow:2440,minw:1500,lb:6,bagMax:200,fmax:48};
function fwd(w){return w<=1950?84:84+(w-1950)/490*4}
function calc(v){var w=AC.ew+v.f+v.r+v.b+v.fu*AC.lb,m=AC.ew*AC.ea+v.f*80.5+v.r*118.1+v.b*142.8+v.fu*AC.lb*95;return{w:w,cg:m/w}}
function issues(v){var c=calc(v),o=[];if(c.w>AC.mtow)o.push('Over maximum take-off weight by '+Math.round(c.w-AC.mtow)+' lb');if(v.b>AC.bagMax)o.push('Baggage over the 200 lb limit');if(c.cg<fwd(c.w))o.push('CG too far forward ('+c.cg.toFixed(1)+' in, limit '+fwd(c.w).toFixed(1)+')');if(c.cg>95)o.push('CG too far aft ('+c.cg.toFixed(1)+' in, limit 95.0)');return o}
function X(a){return 36+(a-80)/20*270}function Y(w){return 176-(w-1400)/1100*150}
function chart(v){var c=calc(v),bad=issues(v).length>0,env=[[84,1500],[84,1950],[88,2440],[95,2440],[95,1500]].map(function(p){return X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)}).join(' ');var ax='';for(var a=80;a<=100;a+=5)ax+='<text x="'+X(a)+'" y="196" text-anchor="middle" class="lm-t2">'+a+'</text>';for(var w=1500;w<=2500;w+=250)ax+='<text x="30" y="'+(Y(w)+3)+'" text-anchor="end" class="lm-t2">'+w+'</text><path d="M36 '+Y(w)+'H306" class="lm-gl"/>';
  return'<svg viewBox="0 0 330 205" class="lsv" role="img" aria-label="Centre of gravity envelope with your loading plotted"><rect width="330" height="205" class="lm-bg ch-paper" rx="10"/>'+chartPaper(330,205)+''+ax+'<polygon points="'+env+'" fill="color-mix(in srgb,var(--good) 14%,transparent)" stroke="var(--good)" stroke-width="1.8"/><circle cx="'+X(Math.max(80,Math.min(100,c.cg))).toFixed(1)+'" cy="'+Y(Math.max(1400,Math.min(2500,c.w))).toFixed(1)+'" r="7" fill="'+(bad?'var(--bad)':'var(--accent)')+'" stroke="var(--surface)" stroke-width="2"/><text x="171" y="203" text-anchor="middle" class="lm-t2" style="display:none">CG arm (in)</text></svg><p class="m" style="text-align:center">Horizontal: CG arm in inches aft of datum. Vertical: weight in lb.</p>'}
function out(v,t){var c=calc(v),is=issues(v);return'<b>Weight '+Math.round(c.w)+' lb</b> of '+AC.mtow+' · <b>CG '+c.cg.toFixed(1)+' in</b><br>'+(is.length?'<span class="bad-t">'+is.join('<br>')+'</span>':'<span class="good-t">Within weight and CG limits</span>')+'<br><span class="m">Fuel '+v.fu+' USG = '+v.fu*AC.lb+' lb, usable endurance about '+(v.fu/9).toFixed(1)+' h at 9 USG/h</span>'}
function slider(f,l,max,step,s,unit){return'<label class="sl"><span>'+l+': <b id="wbv-'+f+'">'+s.v[f]+'</b> '+unit+'</span><input type="range" min="0" max="'+max+'" step="'+step+'" value="'+s.v[f]+'" data-a="lxr" data-f="'+f+'"'+(s.fixed&&s.fixed[f]?' disabled':'')+'></label>'}
var TASKS=[
 {t:'Four on board',txt:'Two adults in front (340 lb) and two in the back (300 lb). You need at least 30 USG of fuel and 40 lb of baggage.',fixed:{f:340,r:300},need:{fu:30,b:40},poss:true,why:'This is exactly at the weight limit, so any more fuel or bags would be too much. Always check the maths before you refuel.'},
 {t:'The bag-heavy day',txt:'One pilot (120 lb) alone, with 200 lb of luggage in the baggage area. You want at least 20 USG.',fixed:{f:120,r:0},need:{fu:20,b:200},poss:true,why:'Baggage sits far aft, so a light pilot and heavy bags push the CG back. This one stays inside the limit, but notice how far aft the CG moves. That is why the CG matters as much as the weight.'},
 {t:'Too much for the day',txt:'Two heavy adults in front (330 lb) and two in the back (320 lb). You need 32 USG of fuel and 20 lb of baggage.',fixed:{f:330,r:320},need:{fu:32,b:20},poss:false,why:'This loading is 2 lb over the limit even with everything minimised. You would have to reduce fuel, baggage, or people, so the correct decision is that it cannot be done as planned.'},
 {t:'Aft CG trap',txt:'One light pilot (110 lb) and two heavy rear passengers (360 lb). You want 180 lb of baggage and at least 12 USG.',fixed:{f:110,r:360},need:{fu:12,b:180},poss:false,why:'The weight is fine at about 2,300 lb, but the CG is behind the aft limit. Leave baggage behind or move a heavier person to the front.'}
];
function set(s,f,v){s.v[f]=+v}
addLab({id:'wb',name:'Weight and balance loader',sub:'Load a four-seat aeroplane and keep the CG inside the envelope',grp:'calc',
 init:function(s){s.mode='x';s.v={f:340,r:120,b:30,fu:30};s.ti=0;s.fin=false;s.res=[];s.ck=null},
 on:function(s,k,v,d){
  if(k==='r'){set(s,d.f,v);var e=$('wbv-'+d.f);if(e)e.textContent=v;var o=$('wb-out');if(o)o.innerHTML=out(s.v);var c=$('wb-chart');if(c)c.innerHTML=chart(s.v);return}
  if(k==='x'){s.mode='x';s.fixed=null;render();return}
  if(k==='t'||k==='again'){s.mode='t';s.ti=0;s.res=[];s.fin=false;s.ck=null;lt(s);render();return}
  if(k==='chk'||k==='no'){var t=TASKS[s.ti],is=issues(s.v),meets=is.length===0&&s.v.fu>=t.need.fu&&s.v.b>=t.need.b;var ok=k==='no'?!t.poss:(t.poss&&meets);var msg=k==='no'?(t.poss?'This one could be done: it can be met by choosing the right fuel and baggage.':'Right, it cannot be done as planned.'):(meets?'Within limits and meets the plan.':(is.length?is.join('. ')+'.':'Limits are fine but you have not met the plan: need '+t.need.fu+' USG fuel and '+t.need.b+' lb baggage.'));s.ck={ok:ok,msg:msg};s.res.push({t:t.t,ok:ok,n:ok?'':msg});render();return}
  if(k==='n'){s.ti++;s.ck=null;if(s.ti>=TASKS.length){s.fin=true;var okn=s.res.filter(function(r){return r.ok}).length;labLog('wb',Math.round(100*okn/TASKS.length))}else lt(s);render();return}
 },
 view:function(s){
  var tabs='<div class="seg" style="margin-bottom:12px"><button data-a="lx" data-k="x"'+(s.mode==='x'?' class="on"':'')+'>Explore</button><button data-a="lx" data-k="t"'+(s.mode==='t'?' class="on"':'')+'>Tasks</button></div>',h=labHead('Weight and balance loader')+tabs;
  if(s.mode==='t'&&s.fin){var okn=s.res.filter(function(r){return r.ok}).length;return labSummary(s,'Weight and balance',s.res,Math.round(100*okn/TASKS.length))}
  var t=s.mode==='t'?TASKS[s.ti]:null;
  var body='<div class="card">'+(t?'<p class="m">Task '+(s.ti+1)+' of '+TASKS.length+': '+esc(t.t)+'</p><p class="lq">'+esc(t.txt)+'</p><p class="m">Adjust the baggage and fuel sliders. Decide whether the plan works, or whether it cannot be done as planned.</p>':'<p class="m">Fictional four-seat aeroplane: empty weight 1,580 lb, maximum weight 2,440 lb, fuel 6 lb per US gallon. Use the sliders and watch the dot move.</p>')+slider('f','Front seats',450,10,s,'lb')+slider('r','Rear seats',450,10,s,'lb')+slider('b','Baggage (max 200)',250,5,s,'lb')+slider('fu','Fuel',48,1,s,'USG')+'</div><div class="card lev"><div id="wb-out" class="wres">'+out(s.v)+'</div><div id="wb-chart">'+chart(s.v)+'</div>'+(t&&!s.ck?'<div class="acts"><button class="btn" data-a="lx" data-k="chk">Check my loading</button><button class="btn alt" data-a="lx" data-k="no">It cannot be done</button></div>':'')+(s.ck?'<div class="fb '+(s.ck.ok?'ok':'no')+'"><b>'+(s.ck.ok?'Correct.':'Not quite.')+'</b><p>'+esc(s.ck.msg)+'</p><p>'+esc(t.why)+'</p><div class="acts"><button class="btn" data-a="lx" data-k="n">'+(s.ti>=TASKS.length-1?'Finish':'Next task')+'</button></div></div>':'')+'<p class="m" style="margin-top:10px">Practice data only. Always use the figures from your own aircraft\'s flight manual and the weighing schedule.</p></div>';
  return h+body}
});
function lt(s){var t=TASKS[s.ti];s.fixed={f:1,r:1};s.v={f:t.fixed.f,r:t.fixed.r,b:Math.min(AC.bagMax,t.need.b+30),fu:Math.min(AC.fmax,t.need.fu+6)}}
})();

/* ===== LABS: load factor and stall speed ===== */
(function(){
function n(b){return 1/Math.cos(b*Math.PI/180)}
function curve(b){var p=[];for(var a=0;a<=75;a+=3)p.push((30+a/75*270).toFixed(1)+','+(170-Math.min(n(a),4)/4*150).toFixed(1));var cx=30+b/75*270,cy=170-Math.min(n(b),4)/4*150;var g='';[1,2,3,4].forEach(function(v){g+='<path d="M30 '+(170-v/4*150).toFixed(1)+'H300" class="lm-gl"/><text x="26" y="'+(173-v/4*150).toFixed(1)+'" text-anchor="end" class="lm-t2">'+v+'g</text>'});for(var a=0;a<=75;a+=15)g+='<text x="'+(30+a/75*270)+'" y="190" text-anchor="middle" class="lm-t2">'+a+'°</text>';
  return'<svg viewBox="0 0 330 198" class="lsv" role="img" aria-label="Load factor against bank angle"><rect width="330" height="198" class="lm-bg ch-paper" rx="10"/>'+chartPaper(330,198)+''+g+'<polyline points="'+p.join(' ')+'" fill="none" stroke="var(--accent)" stroke-width="2.4"/><circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="6" fill="var(--bad)" stroke="var(--surface)" stroke-width="2"/></svg>'}
function plane(b){return'<svg viewBox="0 0 330 110" class="lsv" role="img" aria-label="Aeroplane seen from ahead, banked"><rect width="330" height="110" class="lm-bg ch-paper" rx="10"/>'+chartPaper(330,110)+'<g transform="translate(165 55) rotate('+b+') scale(.5)"><path d="M-40 -16H40V-12H-40Z" fill="var(--accent)" opacity=".8"/><path d="M-3 -24L0 -60L4 -58L3 -24Z" fill="var(--accent)"/><path d="M-118 -10L-22 -20H22L118 -10V-4L22 -12H-22L-118 -4Z" fill="var(--accent)" stroke="var(--surface)" stroke-width="1.5"/><path d="M-22 -18L-40 -14M22 -18L40 -14" stroke="var(--ink-2)" stroke-width="1"/><ellipse cx="0" cy="-2" rx="20" ry="22" fill="var(--accent)" stroke="var(--surface)" stroke-width="2"/><path d="M-12 -14Q0 -22 12 -14V-6H-12Z" fill="var(--surface)" opacity=".55"/><circle cx="0" cy="2" r="34" fill="none" stroke="var(--ink-2)" stroke-width="1.2" stroke-dasharray="3 3"/><circle cx="0" cy="2" r="5" fill="var(--ink)"/><path d="M-14 16L-30 34M14 16L30 34M0 20V36" stroke="var(--ink)" stroke-width="3"/><circle cx="-30" cy="38" r="6" fill="var(--ink)"/><circle cx="30" cy="38" r="6" fill="var(--ink)"/><circle cx="0" cy="40" r="5" fill="var(--ink)"/></g><text x="12" y="104" class="lm-t2">'+b+'° bank</text><path d="M20 58H310" class="lm-ghost"/></svg>'}
function out(s){var g=n(s.b),v=s.vs*Math.sqrt(g);return'<b>Bank '+s.b+'°</b><br>Load factor <b>'+g.toFixed(2)+' g</b> (the wings carry '+Math.round(g*100)+'% of the weight)<br>Stall speed <b>'+Math.round(v)+' kt</b> (level flight '+s.vs+' kt, +'+Math.round((Math.sqrt(g)-1)*100)+'%)'}
function qz(){var b=pick([30,45,60,70]),vs=pick([45,48,50,55,60]),t=pick(['g','v']);var g=n(b),v=Math.round(vs*Math.sqrt(g));var ans,opts,txt;if(t==='g'){ans=g.toFixed(1)+' g';opts=[ans,(Math.sin(b*Math.PI/180)+1).toFixed(1)+' g',(g*g).toFixed(1)+' g',(1/g).toFixed(1)+' g'];txt='In a steady level turn at '+b+'° of bank, what is the load factor?'}else{ans=v+' kt';opts=[ans,Math.round(vs*g)+' kt',Math.round(vs*1.1)+' kt',vs+' kt'];txt='The level-flight stall speed is '+vs+' kt. What is it in a steady level turn at '+b+'° of bank?'}
  var u=[];opts.forEach(function(o){if(u.indexOf(o)<0)u.push(o)});var k=1;while(u.length<4){var alt=t==='g'?(g+0.5*k).toFixed(1)+' g':(v+5*k)+' kt';if(u.indexOf(alt)<0)u.push(alt);k++}
  return{q:txt,opts:u,ans:ans,why:'Load factor in a level turn is 1 ÷ cos(bank). At '+b+'° that is '+g.toFixed(2)+' g. The stall speed rises by the square root of the load factor, so '+vs+' × √'+g.toFixed(2)+' = about '+v+' kt.'}}
addLab({id:'ls',name:'Load factor and stall speed',sub:'See how bank angle drives load factor and stalling speed',grp:'calc',
 init:function(s){s.mode='x';s.b=0;s.vs=50;s.fin=false;s.cq=[];s.ci=0;s.res=[]},
 on:function(s,k,v,d){
  if(k==='r'){s[d.f]=+v;var e=$('lsv-'+d.f);if(e)e.textContent=v;var o=$('ls-out');if(o)o.innerHTML=out(s);var c=$('ls-chart');if(c)c.innerHTML=curve(s.b);var p=$('ls-plane');if(p)p.innerHTML=plane(s.b);return}
  if(k==='x'){s.mode='x';render();return}
  if(k==='c'||k==='again'){s.mode='c';s.cq=[qz(),qz(),qz(),qz(),qz()];s.ci=0;s.res=[];s.fin=false;s.ans=null;render();return}
  if(k==='o'&&s.ans===null){var q=s.cq[s.ci];s.ans=v;s.res.push({t:q.q,ok:v===q.ans,n:v===q.ans?'':'Answer: '+q.ans});render();return}
  if(k==='n'){s.ci++;s.ans=null;if(s.ci>=s.cq.length){s.fin=true;var ok=s.res.filter(function(r){return r.ok}).length;labLog('ls',Math.round(100*ok/s.cq.length))}render();return}
 },
 view:function(s){
  var tabs='<div class="seg" style="margin-bottom:12px"><button data-a="lx" data-k="x"'+(s.mode==='x'?' class="on"':'')+'>Explore</button><button data-a="lx" data-k="c"'+(s.mode==='c'?' class="on"':'')+'>Challenge</button></div>',h=labHead('Load factor and stall speed')+tabs;
  if(s.mode==='x')return h+'<div class="card"><label class="sl"><span>Bank angle: <b id="lsv-b">'+s.b+'</b>°</span><input type="range" min="0" max="75" step="1" value="'+s.b+'" data-a="lxr" data-f="b"></label><label class="sl"><span>Level stall speed: <b id="lsv-vs">'+s.vs+'</b> kt</span><input type="range" min="35" max="70" step="1" value="'+s.vs+'" data-a="lxr" data-f="vs"></label></div><div class="card lev"><div id="ls-out" class="wres">'+out(s)+'</div><div id="ls-plane">'+plane(s.b)+'</div><div id="ls-chart">'+curve(s.b)+'</div><p class="m">Rule of thumb: 60° of bank doubles the load factor (2 g) and raises the stall speed by about 41%. A stall in a steep turn comes with little warning.</p></div>';
  if(s.fin){var ok=s.res.filter(function(r){return r.ok}).length;return labSummary(s,'Load factor',s.res,Math.round(100*ok/s.cq.length))}
  var q=s.cq[s.ci];return h+'<div class="card lev"><p class="m">Question '+(s.ci+1)+' of '+s.cq.length+'</p><p class="lq">'+esc(q.q)+'</p>'+q.opts.map(function(o){var st=s.ans!==null?(o===q.ans?' ok':(o===s.ans?' bad':'')):'';return'<button class="opt'+st+'" data-a="lx" data-k="o" data-v="'+esc(o)+'"'+(s.ans!==null?' disabled':'')+'><span class="k">?</span><span>'+esc(o)+'</span></button>'}).join('')+(s.ans!==null?'<div class="fb '+(s.ans===q.ans?'ok':'no')+'"><b>'+(s.ans===q.ans?'Correct.':'Not quite.')+'</b><p>'+esc(q.why)+'</p><div class="acts"><button class="btn" data-a="lx" data-k="n">'+(s.ci>=s.cq.length-1?'Finish':'Next')+'</button></div></div>':'')+'</div>'}
});
})();

/* ===== LABS: branching decision scenarios ===== */
(function(){
var SC=[
 {id:'wx',t:'The marginal weather day',intro:'You are planning a Saturday flight of about 90 minutes with a friend. The evening before, the forecast shows a front crossing the area around midday.',start:'a',nodes:{
  a:{t:'You are planning at home. What is your first move?',o:[
    {t:'Study the TAFs, METARs and charts, note the timing of the front, and plan an early departure with a diversion airfield.',p:2,to:'b',f:'You gather the information, find the threat (front timing) and build a buffer.'},
    {t:'Glance at the departure METAR in the morning and see how it looks.',p:0,to:'b',f:'You have no plan for what happens en route.'},
    {t:'Cancel straight away without looking, because it might be bad.',p:1,to:'z1',f:'Safe, but you did not learn how the weather would really develop.'}]},
  b:{t:'You depart at 0900 in good VMC. En route the cloud base is lowering and showers appear ahead of the forecast time. You have about 20 minutes to run.',o:[
    {t:'Make an early decision. Turn back or divert to your planned alternate while you still have good visibility.',p:2,to:'c',f:'Making the decision early, while the weather is still fine, is the safest option.'},
    {t:'Descend below the cloud so you can keep the ground in sight.',p:0,to:'d',f:'Descending to stay below the cloud reduces your safety margin and pushes you towards terrain.'},
    {t:'Carry on and see whether the gap holds.',p:0,to:'d',f:'Hoping is not a plan. The weather is already worse than forecast.'}]},
  c:{t:'You land at the alternate. The passenger is disappointed to miss lunch.',o:[
    {t:'Explain the decision calmly and offer to rebook on a better day.',p:2,to:'z2',f:'Good communication keeps trust and a culture of safe decisions.'},
    {t:'Apologise and say that you were just being over-cautious.',p:1,to:'z2',f:'You made the right decision, but you should not apologise for it.'}]},
  d:{t:'Visibility is now 3 km, the cloud base is about 800 ft and the ground is rising ahead. You are on a Basic Service.',o:[
    {t:'Turn through 180 degrees now to fly back to better weather, and call a PAN PAN if you are unsure of position.',p:2,to:'z3',f:'A 180-degree turn early is the standard recommended action. Ask for help.'},
    {t:'Climb into the cloud to get above the hills.',p:0,to:'z4',f:'Flying into cloud without instrument training is the classic route to loss of control.'},
    {t:'Continue low and hope the terrain drops.',p:0,to:'z4',f:'Low level, poor visibility and rising ground is a deadly combination.'}]},
  z1:{end:1,t:'You did not fly. Later you see the weather was fine until midday. Next time, use the forecast to plan, not just to cancel.'},
  z2:{end:1,t:'Safe on the ground, with a good plan and a good decision. The threat was seen early and managed.'},
  z3:{end:1,t:'You reach better visibility and land safely at an alternate. The turn-back was a good call that cost minutes.'},
  z4:{end:1,t:'Ending: loss of visual references and a high workload. This is the kind of accident that early decision-making avoids.'}}},
 {id:'fl',t:'Fuel and daylight',intro:'It is early October. You landed at a distant airfield at 1600 for lunch and a meeting. You plan to fly home, 55 minutes, before dark. Sunset is at about 1800 local.',start:'a',nodes:{
  a:{t:'The meeting overruns. It is 1620. The airfield fuel office closes at 1630. Your tanks show about a quarter each.',o:[
    {t:'Refuel quickly, check sunset and the flight time, and decide whether you can arrive before dark with a margin.',p:2,to:'b',f:'You act early and set a clear decision point.'},
    {t:'Skip the fuel. The gauge looks fine and the flight is short.',p:0,to:'z1',f:'Gauges are not accurate enough to plan fuel. You need a fuel plan with reserves.'},
    {t:'Stay overnight and fly in the morning.',p:2,to:'z2',f:'A completely safe option that avoids the time pressure.'}]},
  b:{t:'Refuelled. You take off at 1645, arrival planned 1740. A headwind adds 10 minutes. Cloud on the route is low and the sun will be low in your eyes.',o:[
    {t:'Plan to arrive no later than 30 minutes before sunset, tell your destination, and divert to a closer airfield if it slips.',p:2,to:'z3',f:'You protect a buffer and plan an alternative before time pressure builds.'},
    {t:'Press on at the same plan. You will probably make it.',p:0,to:'z4',f:'Time pressure and a shrinking buffer. Late arrival is a risk factor.'},
    {t:'Cancel the flight now and stay over.',p:1,to:'z2',f:'Safe, but the decision came late and wasted the fuel planning.'}]},
  z1:{end:1,t:'Fuel is a limiting factor that you cannot see directly. A good pilot calculates and checks, not guesses.'},
  z2:{end:1,t:'You stay overnight and fly the next morning. Inconvenient but entirely safe.'},
  z3:{end:1,t:'You land with margin before sunset. A clear plan and early decisions kept you in control.'},
  z4:{end:1,t:'You arrive in fading light, low on margin. You got away with it, but the plan had no slack.'}}},
 {id:'pp',t:'Passenger pressure',intro:'A friend has a wedding at 1400 and has asked you to fly them there. You have not flown for three weeks.',start:'a',nodes:{
  a:{t:'The morning forecast shows marginal visibility and a crosswind near your limit. Your friend says: "You can do it, I trust you."',o:[
    {t:'Review the weather against your own written limits, check the aircraft, and tell your friend that you will decide at departure time.',p:2,to:'b',f:'You make decisions against your own limits, not social pressure.'},
    {t:'Agree to go. You do not want to let them down.',p:0,to:'z1',f:'Commitment and pressure are classic traps.'},
    {t:'Tell them it is too risky without looking at the forecast.',p:1,to:'z2',f:'Safe, but you did not use the data to decide.'}]},
  b:{t:'At the airfield the crosswind is above your personal limit and the visibility is 6 km. Your friend says "just try it".',o:[
    {t:'Say no, and offer an alternative (train, taxi or a later flight).',p:2,to:'z3',f:'Your limits exist for moments like this. Offer a practical alternative.'},
    {t:'Take off and see how it goes. You can always come back.',p:0,to:'z4',f:'Taking off to find out is a risk you decided in advance not to take.'}]},
  z1:{end:1,t:'You fly with unpractised skills and marginal conditions because of social pressure. The main risk is not the weather, it is the decision.'},
  z2:{end:1,t:'You stay on the ground. Next time, check the weather first so you can explain your reasoning.'},
  z3:{end:1,t:'Your friend is disappointed but gets there by another route. You kept your limits and your friend.'},
  z4:{end:1,t:'You are now flying in conditions outside your limits with a passenger. A good outcome is possible, but you have removed your safety margin.'}}}
];
function best(sc,id){var n=sc.nodes[id];return n.o?Math.max.apply(null,n.o.map(function(x){return x.p})):0}
addLab({id:'scen',name:'Branching scenarios',sub:'Make decisions in a short story and see the consequences',grp:'look',
 init:function(s){s.si=null;s.fin=false},
 on:function(s,k,v){
  if(k==='pick'){s.si=+v;var sc=SC[s.si];s.node=sc.start;s.pts=0;s.max=0;s.log=[];s.fb=null;s.fin=false;render();return}
  if(k==='menu'){s.si=null;render();return}
  if(k==='o'&&!s.fb){var sc2=SC[s.si],n=sc2.nodes[s.node],op=n.o[+v];s.pts+=op.p;s.max+=best(sc2,s.node);s.log.push({t:n.t,ch:op.t,f:op.f,p:op.p});s.fb={f:op.f,to:op.to,p:op.p};render();return}
  if(k==='n'){s.node=s.fb.to;s.fb=null;if(SC[s.si].nodes[s.node].end){s.fin=true;var pct=s.max?Math.round(100*s.pts/s.max):0;labLog('scen',pct)}render();return}
 },
 view:function(s){
  if(s.si===null)return labHead('Branching scenarios')+'<div class="card"><p class="m">Pick a story. Your choices lead to different outcomes. The score reflects how safely you decided, not how the story ends.</p>'+SC.map(function(c,i){return'<button class="pick" data-a="lx" data-k="pick" data-v="'+i+'"><span><b>'+esc(c.t)+'</b><br><span class="m" style="font-family:var(--f-body);font-size:.84rem">'+esc(c.intro)+'</span></span></button>'}).join('')+'</div>';
  var sc=SC[s.si],n=sc.nodes[s.node];
  if(s.fin){var pct=s.max?Math.round(100*s.pts/s.max):0;return labHead(sc.t)+'<div class="card sum"><p class="m">Outcome</p><p>'+esc(n.t)+'</p><p class="score">'+pct+'%</p><p class="m">of the safest possible decisions</p><ul>'+s.log.map(function(l){return'<li><span class="chip '+(l.p>=2?'ok':l.p===1?'':'no')+'">'+(l.p>=2?'Strong':l.p===1?'Okay':'Weak')+'</span> '+esc(l.ch)+'<br><span class="m">'+esc(l.f)+'</span></li>'}).join('')+'</ul><div class="acts"><button class="btn" data-a="lx" data-k="menu">Another scenario</button><button class="btn alt" data-a="end">Done</button></div></div>'}
  return labHead(sc.t)+(s.log.length===0?'<div class="card"><p>'+esc(sc.intro)+'</p></div>':'')+'<div class="card lev"><p class="lq">'+esc(n.t)+'</p>'+n.o.map(function(o,i){var st=s.fb?(s.log[s.log.length-1].ch===o.t?' sel':''):'';return'<button class="opt'+st+'" data-a="lx" data-k="o" data-v="'+i+'"'+(s.fb?' disabled':'')+'><span class="k">'+'ABC'[i]+'</span><span>'+esc(o.t)+'</span></button>'}).join('')+(s.fb?'<div class="fb '+(s.fb.p>=2?'ok':'no')+'"><b>'+(s.fb.p>=2?'Strong choice.':s.fb.p===1?'Okay.':'Weak choice.')+'</b><p>'+esc(s.fb.f)+'</p><div class="acts"><button class="btn" data-a="lx" data-k="n">Continue</button></div></div>':'')+'</div>'}
});
})();

/* ===== LABS: weather go / no-go ===== */
(function(){
var MIN={base:1500,vis:8,xw:12};
function p2(n){return('0'+n).slice(-2)}
function tdp(){var t=ri(9,16),d=ri(3,t-1);return p2(t)+'/'+p2(d)}
function gen(){
  var wd=ri(18,36)*10,ws=pick([6,8,10,12,14,16,18,22]),vis=pick([3000,5000,6000,8000,9999,9999,9999]),base=pick([800,1000,1200,1500,1800,2500,3000,4000]),cl=pick(['SCT','BKN']);var rwy=270,xw=Math.round(ws*Math.abs(Math.sin((wd-rwy)*Math.PI/180)));var sh=Math.random()<.4;
  var tmp=Math.random()<.5?{from:ri(11,13),vis:pick([3000,4000,5000,9999]),base:pick([800,1000,1500,2500])}:null;var fl={from:ri(10,12),to:0};fl.to=fl.from+2;
  var tvis=tmp?(tmp.vis===9999?10:tmp.vis/1000):null,tover=tmp&&tmp.from<fl.to&&tmp.from+3>fl.from;
  var v=vis===9999?10:vis/1000;var worst={base:base,vis:v,xw:xw};if(tover){worst.base=Math.min(base,tmp.base);worst.vis=Math.min(v,tvis)}
  var below=[],near=[];[['base','cloud base',worst.base,MIN.base,1.3,function(a,b){return a<b}],['vis','visibility',worst.vis,MIN.vis,1.25,function(a,b){return a<b}],['xw','crosswind',worst.xw,MIN.xw,0.75,function(a,b){return a>b}]].forEach(function(c){var val=c[2],lim=c[3];if(c[0]==='xw'){if(val>lim)below.push(c[1]+' '+val+' kt over your limit of '+lim);else if(val>lim*c[4])near.push(c[1]+' '+val+' kt close to your limit of '+lim)}else{if(val<lim)below.push(c[1]+' '+(c[0]==='base'?val+' ft':val+' km')+' below your minimum of '+lim+(c[0]==='base'?' ft':' km'));else if(val<lim*c[4])near.push(c[1]+' '+(c[0]==='base'?val+' ft':val+' km')+' only just above your minimum of '+lim+(c[0]==='base'?' ft':' km'))}});
  var dec=below.length?2:(near.length?1:0);
  var ms='EGXX 260950Z '+('00'+wd).slice(-3)+p2(ws)+'KT '+(vis===9999?'9999':('0000'+vis).slice(-4))+(sh&&vis<9999?' -SHRA':'')+' '+cl+('000'+Math.round(base/100)).slice(-3)+' '+tdp()+' Q'+ri(1003,1020);
  var taf='TAF EGXX 260800Z 2609/2618 '+('00'+wd).slice(-3)+p2(ws)+'KT '+(vis===9999?'9999':('0000'+vis).slice(-4))+' '+cl+('000'+Math.round(base/100)).slice(-3)+(tmp?' TEMPO 26'+p2(tmp.from)+'/26'+p2(tmp.from+3)+' '+(tmp.vis===9999?'9999':('0000'+tmp.vis).slice(-4))+' BKN'+('000'+Math.round(tmp.base/100)).slice(-3):'');
  var why='Your personal minima: cloud base '+MIN.base+' ft, visibility '+MIN.vis+' km, crosswind '+MIN.xw+' kt (runway 27). '+(tover?'The TEMPO group overlaps your flight window, so use the worse values. ':'')+'Worst case: base '+worst.base+' ft, visibility '+worst.vis+' km, crosswind '+worst.xw+' kt. '+(below.length?'Below minima: '+below.join('; ')+'.':near.length?'Marginal: '+near.join('; ')+'.':'All comfortably inside your minima.');
  return{kind:'mcq',fixed:1,q:'<p class="m">Planning a VFR flight from runway 27, window <b>'+p2(fl.from)+'00 to '+p2(fl.to)+'00 UTC</b>. Your personal minima: cloud base '+MIN.base+' ft, visibility '+MIN.vis+' km, crosswind '+MIN.xw+' kt.</p><pre class="wxm">'+ms+'\n'+taf+'</pre><p class="lq">Go, go with changes, or no-go?</p>',opts:['Go','Go with changes: delay, shorten, or add a plan B','No-go'],a:dec,why:why}}
quizLab({id:'goNo',name:'Weather go or no-go',sub:'Read the METAR and TAF, apply personal minima, make the call',grp:'look',intro:'Each question gives a METAR, a TAF and your personal minima. Work out the crosswind for runway 27, check any TEMPO against your flight window, and decide.',n:8,gen:function(n){var o=[];for(var i=0;i<n;i++)o.push(gen());return o}});
})();

/* ===== LABS: emergency checklist ordering ===== */
(function(){
var CK=[
 {t:'Engine failure in the cruise',cx:'The engine stops at 3,000 ft over open country.',ans:['Pitch for best glide speed and trim','Choose a field and plan the approach','Try to restart: fuel, carb heat, magnetos, primer','Call MAYDAY on the frequency and squawk 7700','Secure the aircraft before landing: fuel off, master off, doors unlatched','Land into wind in the chosen field'],why:'Aviate, navigate, communicate. Fly the glide first, plan the field, try the restart drill, then call. Always follow the checklist for your own aircraft.'},
 {t:'Uncertain of position',cx:'You have lost your position in good VMC.',ans:['Maintain control and keep out of cloud','Note time, heading and your last known position','Use all aids: map, GPS, visible features','Call for help on the working frequency or 121.500 and say PAN PAN','Squawk 7700 if advised or if worried','Follow the advice and fly to the nearest suitable airfield'],why:'Stay calm and in control, collect information, then ask for help early. 121.500 is the distress and diversion frequency.'},
 {t:'Radio failure',cx:'You cannot receive or transmit.',ans:['Check the headset, volume, squelch and frequency','Try another radio, headset or frequency','Check the circuit breaker and master switch','Squawk 7600','Transmit blind and continue to destination in VMC','Join, then watch for light signals when you land'],why:'Check the simple causes first, then follow the radio failure procedure. In the UK squawk 7600 and fly in VMC to land.'},
 {t:'VFR into IMC',cx:'Cloud closes in and you lose visual references.',ans:['Look at the instruments and fly straight and level','Make a 180-degree turn using the attitude indicator and the turn coordinator','Call PAN PAN or MAYDAY and ask for assistance','Squawk 7700','Climb to a safe altitude above terrain if advised','Follow vectors and the instructions'],why:'This is the best chance of surviving a loss of visual references: instruments first, turn back to the better weather, then ask for help.'},
 {t:'Carburettor icing',cx:'The engine runs roughly and the RPM is falling in humid cloud.',ans:['Apply full carburettor heat','Expect a short drop in RPM and roughness','Wait for the RPM and smoothness to improve','Leave carb heat on until the ice has cleared','Reset the carb heat for the conditions and monitor','Plan to land if it does not clear'],why:'Use full carb heat for as long as needed. Roughness will first get worse as the ice melts, then improve. Check against your POH.'},
 {t:'Engine failure after take-off',cx:'The engine fails at 300 ft after take-off.',ans:['Lower the nose to keep flying speed','Choose a landing area straight ahead and 30 degrees either side','Do not turn back unless you are sure you are high enough','Make a MAYDAY call if time allows','Fuel off, master off, doors unlatched','Land under control, flaps as needed'],why:'The first job is airspeed. Land ahead within the available arc. Trying to turn back at low height often ends in a stall.'}
];
addLab({id:'chk',name:'Emergency checklist order',sub:'Tap the steps in the right order for six common emergencies',grp:'look',
 init:function(s){s.go=false;s.fin=false},
 on:function(s,k,v){
  if(k==='go'||k==='again'){s.go=true;s.fin=false;s.items=shuffle(CK).slice(0,6);s.i=0;s.res=[];op(s);render();return}
  var it=s.items&&s.items[s.i];if(!it)return;
  if(k==='c'&&!s.chk){s.built.push(+v);s.used[v]=true;render();return}
  if(k==='u'&&!s.chk){var l=s.built.pop();delete s.used[l];render();return}
  if(k==='chk'&&!s.chk){s.chk=true;var okb=s.built.length===it.ans.length&&s.built.every(function(x,j){return x===j});s.ok=okb;s.res.push({t:it.t,ok:okb});render();return}
  if(k==='n'){s.i++;if(s.i>=s.items.length){s.fin=true;var ok=s.res.filter(function(r){return r.ok}).length;labLog('chk',Math.round(100*ok/s.items.length))}else op(s);render();return}
 },
 view:function(s){
  if(!s.go)return labHead('Emergency checklist order')+'<div class="card"><h3>Emergency checklist order</h3><p style="margin-top:8px">Put the steps in the right order for six emergencies. These are typical sequences from training, so your own aircraft manual always takes priority.</p><div class="acts"><button class="btn" data-a="lx" data-k="go">Start</button></div></div>';
  if(s.fin){var ok=s.res.filter(function(r){return r.ok}).length;return labSummary(s,'Emergency checklists',s.res,Math.round(100*ok/s.items.length))}
  var it=s.items[s.i];return labHead('Emergency checklist order','Question '+(s.i+1)+' of '+s.items.length)+'<div class="card lev"><p class="tag">'+esc(it.t)+'</p><p class="lq">'+esc(it.cx)+' Put the steps in order.</p><ol class="built" style="list-style:none">'+(s.built.length?s.built.map(function(i,j){return'<li class="pc">'+(j+1)+'. '+esc(it.ans[i])+'</li>'}).join(''):'<span class="m">Tap the steps in order</span>')+'</ol><div class="chips">'+s.bank.map(function(b){return'<button class="chipb" data-a="lx" data-k="c" data-v="'+b.i+'"'+(s.used[b.i]||s.chk?' disabled':'')+'>'+esc(it.ans[b.i])+'</button>'}).join('')+'</div>'+(!s.chk?'<div class="acts"><button class="btn alt sm" data-a="lx" data-k="u"'+(s.built.length?'':' disabled')+'>Undo</button><button class="btn sm" data-a="lx" data-k="chk"'+(s.built.length===it.ans.length?'':' disabled')+'>Check</button></div>':'<div class="fb '+(s.ok?'ok':'no')+'"><b>'+(s.ok?'Correct order.':'Not quite.')+'</b>'+(s.ok?'':'<ol style="margin:6px 0 0 18px">'+it.ans.map(function(a){return'<li>'+esc(a)+'</li>'}).join('')+'</ol>')+'<p>'+esc(it.why)+'</p><div class="acts"><button class="btn" data-a="lx" data-k="n">'+(s.i>=s.items.length-1?'Finish':'Next')+'</button></div></div>')+'</div>'}
});
function op(s){var it=s.items[s.i];s.built=[];s.used={};s.chk=false;s.bank=shuffle(it.ans.map(function(_,i){return{i:i}}))}
})();
