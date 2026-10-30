/* ===== LABS: Chicago Convention articles, learnt in themed blocks ===== */
(function(){
var B=[
 {n:'Airspace and entry',hook:'In order as you arrive in another state: obey its laws (11), fly its rules of the air (12), then clear entry when you land (13).',a:[
  [1,'Sovereignty','Every state has complete and exclusive sovereignty over the airspace above its territory.','The number one rule: my sky.'],
  [2,'Territory','A state’s territory is its land areas and the territorial waters next to them.','Two parts: land and sea.'],
  [5,'Non-scheduled flights','Aircraft not on scheduled services may fly into or across a state, and stop for non-traffic purposes, without prior permission. The state may still require a landing.','Five: free to fly through.'],
  [11,'Obey local regulations','Aircraft must obey the laws and regulations of the state they are in, whatever their nationality.','11: their laws.'],
  [12,'Rules of the air','Each state keeps its rules of the air as close as possible to ICAO’s. Over the high seas, ICAO’s rules apply.','12: the rules in the air.'],
  [13,'Entry and clearance','Passengers, crew and cargo must comply with the state’s entry, clearance, immigration, passport, customs and quarantine rules.','13: clearing in when you land.']]},
 {n:'Aircraft identity',hook:'17 and 18 are a pair: you take your nationality from registration (17), and you can only belong to one state (18). Then show it: 20.',a:[
  [17,'Nationality','An aircraft has the nationality of the state in which it is registered.','17: registered means nationality.'],
  [18,'No dual registration','An aircraft cannot be validly registered in more than one state, although it can change its registration.','18: only one state at a time.'],
  [20,'Display of marks','Every aircraft on international flights must carry its nationality and registration marks.','20: show your marks.']]},
 {n:'Arriving and accidents',hook:'24 is the duty-free fuel stop; 26 is who investigates when it goes wrong.',a:[
  [24,'Customs duty','Fuel, lubricating oil, spare parts and regular equipment on board are exempt from customs duty on arrival.','24-hour fuel stop, duty free.'],
  [26,'Accident investigation','The state where an accident happens investigates it. The state of registry may appoint observers.','26: investigation.']]},
 {n:'Paperwork',hook:'29 to 34 is the paperwork block: 29 is the full list of documents, then certificates (31), licences (32), recognition (33) and the journey log (34).',a:[
  [29,'Documents carried','Aircraft on international flights carry: certificate of registration, certificate of airworthiness, crew licences, journey log book, radio station licence, passenger list and cargo manifest.','29: the whole document bag.'],
  [31,'Certificate of airworthiness','Every aircraft on international flights has a certificate of airworthiness issued or validated by its state of registry.','31: is it airworthy?'],
  [32,'Licences of personnel','Pilots and crew on international flights hold licences issued or validated by the state of registry.','32: who is flying it?'],
  [33,'Recognition','Other states recognise certificates and licences issued by the state of registry, provided they meet ICAO’s minimum standards.','33: everyone accepts them.'],
  [34,'Journey log book','A journey log book is kept for every aircraft on international flights.','34: write the trip down.']]},
 {n:'ICAO',hook:'The two ICAO numbers at the end: 37 sets the standards, 44 says what ICAO is for.',a:[
  [37,'International standards','States work towards the highest possible uniformity in regulations. ICAO adopts Standards and Recommended Practices (SARPs).','37: standards.'],
  [44,'ICAO objectives','ICAO’s aims are to develop the principles and techniques of international air navigation and to foster safe, orderly growth of international air transport.','44: ICAO’s aims.']]}
];
var ALL=[];B.forEach(function(b,bi){b.a.forEach(function(x){ALL.push({no:x[0],t:x[1],d:x[2],h:x[3],b:bi})})});
var DOCS=['Certificate of registration','Certificate of airworthiness','Crew licences','Journey log book','Radio station licence','Passenger list','Cargo manifest'];
var NOTDOCS=['Pilot’s personal logbook','Insurance certificate','Maintenance records','Weight and balance schedule','Pilot’s medical certificate','Flight plan'];
function pool(s){return s.bi==='all'?ALL:ALL.filter(function(x){return x.b===s.bi})}
function mkQuiz(s){var P=pool(s),qs=[];
  shuffle(P).forEach(function(x,i){
   var both=s.bi!=='all';
   if(both||i%2===0){var wr=shuffle(ALL.filter(function(y){return y.no!==x.no})).slice(0,3).map(function(y){return'Article '+y.no});var o=shuffle(wr.concat('Article '+x.no));qs.push({q:'Which article: '+x.d.charAt(0).toLowerCase()+x.d.slice(1),o:o,a:o.indexOf('Article '+x.no),why:'Article '+x.no+', '+x.t.toLowerCase()+'. '+x.h})}
   if(both||i%2===1){var wr2=shuffle(ALL.filter(function(y){return y.no!==x.no})).slice(0,3).map(function(y){return y.t});var o2=shuffle(wr2.concat(x.t));qs.push({q:'What does Article '+x.no+' cover?',o:o2,a:o2.indexOf(x.t),why:x.d+' '+x.h})}});
  var trap=null;if(s.bi==='all'||s.bi===3){var nd=pick(NOTDOCS),o3=shuffle(shuffle(DOCS).slice(0,3).concat(nd));trap=({q:'Article 29: which of these is NOT one of the documents an aircraft must carry on an international flight?',o:o3,a:o3.indexOf(nd),why:'Article 29 lists: '+DOCS.join(', ').toLowerCase()+'. A favourite trick: the journey log book is required, the pilot’s personal logbook is not.'})}
  return shuffle(qs).slice(0,s.bi==='all'?12:10)}
function mkMatch(s){var P=shuffle(pool(s)).slice(0,6);if(P.length<4)P=shuffle(ALL.filter(function(x){return x.b===s.bi}).concat(shuffle(ALL.filter(function(x){return x.b!==s.bi})).slice(0,6-P.length)));
  return{l:shuffle(P.map(function(x,i){return{i:i,t:'Article '+x.no}})),r:shuffle(P.map(function(x,i){return{i:i,t:x.t}})),n:P.length}}
function best(bi){var m=S.art&&S.art[bi];return m||0}
function keep(bi,pct){S.art=S.art||{};if(pct>(S.art[bi]||0))S.art[bi]=pct;save()}
addLab({id:'articles',name:'Chicago Convention articles',sub:'Learn the articles in five themed blocks, then test yourself',grp:'game',
 init:function(s){s.v='menu';s.bi=null},
 on:function(s,k,v){
  if(k==='menu'){s.v='menu';render();return}
  if(k==='learn'){s.bi=v==='all'?'all':+v;s.v='learn';s.hide=false;s.shown={};render();window.scrollTo(0,0);return}
  if(k==='hide'){s.hide=!s.hide;s.shown={};render();return}
  if(k==='reveal'){s.shown[v]=!s.shown[v];render();return}
  if(k==='quiz'){s.qs=mkQuiz(s);s.qi=0;s.sel=null;s.ok=0;s.v='quiz';render();window.scrollTo(0,0);return}
  if(k==='ans'){if(s.sel!==null)return;s.sel=+v;if(s.sel===s.qs[s.qi].a)s.ok++;render();return}
  if(k==='qn'){if(s.qi<s.qs.length-1){s.qi++;s.sel=null}else{s.v='qdone';var pct=Math.round(100*s.ok/s.qs.length);labLog('articles',pct);keep(s.bi,pct)}render();window.scrollTo(0,0);return}
  if(k==='match'){s.it=mkMatch(s);s.done={};s.selL=null;s.wrong=0;s.flash=null;s.v='match';render();window.scrollTo(0,0);return}
  if(k==='L'){if(s.done[v])return;s.selL=+v;s.flash=null;render();return}
  if(k==='R'){if(s.selL===null||s.done[v])return;if(+v===s.selL){s.done[v]=1;s.selL=null;s.flash=null;if(Object.keys(s.done).length===s.it.n){s.v='mdone';labLog('articles',Math.round(100*s.it.n/(s.it.n+s.wrong)))}}else{s.wrong++;s.flash=+v}render();return}
 },
 view:function(s){
  var H=labHead('Chicago Convention articles',s.bi===null||s.v==='menu'?'':(s.bi==='all'?'All blocks':B[s.bi].n));
  var bname=s.bi==='all'?'all blocks':'this block';
  var tools='<div class="acts"><button class="btn" data-a="lx" data-k="quiz">Quiz '+bname+'</button><button class="btn alt" data-a="lx" data-k="match">Match numbers</button><button class="btn alt" data-a="lx" data-k="menu">All blocks</button></div>';
  if(s.v==='menu')return H+'<div class="card"><p>Learn one block at a time: read it, cover the answers and test yourself, then quiz or match. When every block is solid, mix them all together.</p></div>'
   +B.map(function(b,i){var m=best(i);return'<button class="pick art-pick" data-a="lx" data-k="learn" data-v="'+i+'"><b>'+(i+1)+' · '+esc(b.n)+'</b><span class="m">Articles '+b.a.map(function(x){return x[0]}).join(', ')+(m?' · best '+m+'%':'')+'</span></button>'}).join('')
   +'<button class="pick art-pick" data-a="lx" data-k="learn" data-v="all"><b>All blocks mixed</b><span class="m">'+ALL.length+' articles · the exam-style test'+(best('all')?' · best '+best('all')+'%':'')+'</span></button>';
  if(s.v==='learn'){var P=pool(s);
    return H+(s.bi!=='all'?'<div class="card art-hook"><p class="m">How to remember this block</p><p>'+esc(B[s.bi].hook)+'</p></div>':'')
     +'<div class="art-bar"><button class="btn sm '+(s.hide?'':'alt')+'" data-a="lx" data-k="hide">'+(s.hide?'Show all answers':'Cover the answers')+'</button>'+(s.hide?'<span class="m">Say what each article covers, then tap it to check.</span>':'')+'</div>'
     +'<div class="art-grid">'+P.map(function(x){var cov=s.hide&&!s.shown[x.no];
       return'<button class="art'+(cov?' cov':'')+'" data-a="lx" data-k="reveal" data-v="'+x.no+'"'+(s.hide?'':' tabindex="-1"')+'><span class="art-no">'+x.no+'</span><span class="art-b">'+(cov?'<span class="m">Tap to reveal</span>':'<b>'+esc(x.t)+'</b><span>'+esc(x.d)+'</span><span class="art-h">'+esc(x.h)+'</span>')+'</span></button>'}).join('')+'</div>'
     +((s.bi===3||s.bi==='all')&&(!s.hide||s.shown[29])?'<div class="card" style="margin-top:14px"><p class="m">Article 29: the seven documents</p><ol class="art-docs">'+DOCS.map(function(d){return'<li>'+d+'</li>'}).join('')+'</ol><p class="m">Exam trap: the journey log book is required, the pilot’s personal logbook is not.</p></div>':'')
     +tools}
  if(s.v==='quiz'){var q=s.qs[s.qi];
    return H+'<p class="lcap">Question '+(s.qi+1)+' of '+s.qs.length+'</p><div class="card"><p class="q">'+esc(q.q)+'</p>'
     +q.o.map(function(o,i){var c=s.sel===null?'':(i===q.a?' ok':i===s.sel?' bad':'');return'<button class="opt'+c+'" data-a="lx" data-k="ans" data-v="'+i+'"'+(s.sel!==null?' disabled':'')+'><span class="k">'+'ABCD'.charAt(i)+'</span><span>'+esc(o)+'</span></button>'}).join('')
     +(s.sel!==null?'<div class="fb '+(s.sel===q.a?'ok':'no')+'" style="margin-top:12px"><b>'+(s.sel===q.a?'Correct.':'Not quite.')+'</b><p>'+esc(q.why)+'</p></div><div class="mnav" style="grid-template-columns:1fr"><button class="btn" data-a="lx" data-k="qn">'+(s.qi<s.qs.length-1?'Next':'See score')+'</button></div>':'')+'</div>'}
  if(s.v==='qdone'){var pct=Math.round(100*s.ok/s.qs.length);
    return H+'<div class="card sum"><p class="m">Quiz finished</p><p class="score">'+pct+'%</p><p>'+s.ok+' of '+s.qs.length+' correct. '+(pct>=85?(s.bi==='all'?'That is exam-ready.':'Solid. Move on to the next block.'):'Read the block again with the answers covered, then try once more.')+'</p><div class="acts"><button class="btn" data-a="lx" data-k="quiz">Quiz again</button><button class="btn alt" data-a="lx" data-k="learn" data-v="'+s.bi+'">Back to the block</button><button class="btn alt" data-a="lx" data-k="menu">All blocks</button></div></div>'}
  if(s.v==='match'){
    var colL=s.it.l.map(function(x){var st=s.done[x.i]?' ok':(s.selL===x.i?' sel':'');return'<button class="opt'+st+'" data-a="lx" data-k="L" data-v="'+x.i+'"'+(s.done[x.i]?' disabled':'')+'><span class="k">'+(s.done[x.i]?'&#10003;':'&bull;')+'</span><span>'+esc(x.t)+'</span></button>'}).join('');
    var colR=s.it.r.map(function(x){var st=s.done[x.i]?' ok':(s.flash===x.i?' bad':'');return'<button class="opt'+st+'" data-a="lx" data-k="R" data-v="'+x.i+'"'+(s.done[x.i]?' disabled':'')+'><span class="k">&rarr;</span><span>'+esc(x.t)+'</span></button>'}).join('');
    return H+'<p class="lcap">'+(s.selL===null?'Tap an article number on the left.':'Now tap what it covers on the right.')+' Wrong taps: '+s.wrong+'</p><div class="mgrid"><div>'+colL+'</div><div>'+colR+'</div></div>'}
  if(s.v==='mdone')return H+'<div class="card sum"><p class="m">All matched</p><p class="score">'+s.wrong+'</p><p>wrong tap'+(s.wrong===1?'':'s')+' across '+s.it.n+' pairs.</p><div class="acts"><button class="btn" data-a="lx" data-k="match">Another round</button><button class="btn alt" data-a="lx" data-k="quiz">Quiz '+bname+'</button><button class="btn alt" data-a="lx" data-k="learn" data-v="'+s.bi+'">Back to the block</button></div></div>';
  return H}
});
})();
