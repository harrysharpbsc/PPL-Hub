/* ===== Put every topic diagram inside the read section it illustrates =====
   Runs after all diagram files. Each entry: [figure title starts with, section title starts with].
   A section prefix of null drops the figure (an older duplicate of a richer one).
   Anything not listed stays in the Diagrams panel at the top of the topic (t_secdg.py flags it). */
(function(){
var PLACE={
'Weather charts and forecasts (Skyway Code)':[['Reading a METAR','Reading TAFs'],['Cloud amounts and the ceiling','Making the weather decision'],['What the F215','F215']],
'Route planning and altitude selection (Skyway Code)':[['Maximum Elevation Figure','Maximum Elevation Figure'],['Planning the descent','Choosing a cruising altitude'],['Take 2 around airspace','Avoiding infringements']],
'Altimeter settings (Skyway Code)':[['QFE, QNH and 1013','Four pressure settings'],['Transition altitude and level','Transition altitude'],['Worked example: 27 ft','Transition altitude']],
'Fuel, flight plans and aerodrome planning (Skyway Code)':[['Fuel by volume','Fuel management'],['When you need a flight plan','Flight plans'],['Questions for an unfamiliar','Unfamiliar aerodromes']],
'Rules of the Air essentials (Skyway Code)':[['Right of way on the ground','Right of way on the ground'],['The pilot in command','Pilot in command']],
'VFR, IFR and Special VFR (Skyway Code)':[['UK VMC minima','VMC minima'],['Special VFR in a control zone','Special VFR'],['When VFR is not enough','Other VFR requirements']],
'Airspace, ATZ, MATZ and transponders (Skyway Code)':[['An ATZ is a cylinder','ATZ and aerodromes'],['A typical MATZ','MATZ'],['Control zone and control area','Airspace structure']],
'Aerodrome operations and circuits (Skyway Code)':[['Live side and dead side','The circuit'],['The overhead join','The circuit'],['At the holding point','Departure procedures']],
'Emergencies (Skyway Code)':[['Choosing a field','Engine failure'],['The constant aspect','Engine failure'],['Before you change anything','Key principles']],
'Decision making and threat and error management (Skyway Code)':[['PAVE before you go','Pre-flight decisions'],['Threat and error management','Threat and error management']],
'Aerodrome signals, markings and lighting (Skyway Code)':[['The signals square','Signal square'],['Runway lights and PAPI','Runway lighting'],['Signs and stop bars','Taxiway signs']],
'Avoiding collisions (Skyway Code)':[['Constant bearing means collision','The risk'],['Two ways to scan','The visual scan']],
'Airspace infringements and FMCs (Skyway Code)':[['Using a Frequency Monitoring Code','Frequency Monitoring Codes'],['Where the base changes','Prevention']],
'Crosswind component (Skyway Code)':[['Splitting the wind','Finding the components'],['Clock code rule of thumb','Finding the components']]
};
Object.keys(PLACE).forEach(function(t){
  var figs=(DIAG[t]||'').match(/<figure[\s\S]*?<\/figure>/g)||[],keep=[],moved=[];
  figs.forEach(function(f){
    var m=f.match(/<figcaption><b>([\s\S]*?)<\/b>/),title=m?m[1]:'',hit=null;
    PLACE[t].some(function(p){if(title.indexOf(p[0])===0){hit=p;return true}return false});
    if(!hit)keep.push(f);else if(hit[1])moved.push([hit[1],f]);
  });
  DSEC[t]=moved.concat(DSEC[t]||[]);
  if(keep.length)DIAG[t]='<div class="dgs">'+keep.join('')+'</div>';else delete DIAG[t];
});
})();
