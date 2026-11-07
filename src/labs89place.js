/* ===== Put every topic diagram inside the read section it illustrates =====
   Runs after all diagram files. Each entry: [figure title starts with, section title starts with].
   A section prefix of null drops the figure (an older duplicate of a richer one).
   Anything not listed stays in the Diagrams panel at the top of the topic (t_secdg.py flags it). */
(function(){
var PLACE={
'Operations of Aircraft':[['Three ways EASA','EASA classifies'],['What makes an aeroplane complex','Definition of complex'],['Which rules for a G-registered','Documents for a UK pilot']],
'Aviation Law and organisations':[['From Paris','International Civil Aviation'],['The AIP and the 28-day','Aeronautical Information Publication'],['AIC colours','Aeronautical Information Circulars'],['NOTAM types','NOTAMs and Air Supplements']],
'Rules of the Air':[['Head-on','Right of way'],['Overtaking: the 70','Right of way'],['Overtaking',null],['Converging','Right of way'],['Who gives way when converging','Right of way'],['Navigation light sectors','Lights on aircraft'],['Navigation lights',null],['Low flying minima','Low flying prohibitions']],
'Piston engine icing (SS14)':[['Where carburettor ice','Three types'],['When to expect carb ice','When it happens'],['The carb heat check','Using carb heat']],
'Winter weather and icing (SS03)':[['How radiation fog','Radiation fog'],['A depression passing','Fronts and depressions'],['Frost on the wing','Frost, snow'],['Airframe ice','Carb ice and airframe ice']],
'Weight, balance and performance (SS09)':[['Datum, arm and moment','Balance and the centre'],['Worked CG check','Worked CG example'],['Declared distances','Performance principles'],['Rule-of-thumb take-off','Rule-of-thumb multipliers']],
'Pilot health and performance (SS24)':[['I AM SAFE','I AM SAFE'],['Altitude and your body','Altitude and gas'],['Alcohol before flying','Factors that reduce performance']],
'Stalls, spins and loss of control (SS30)':[['Lift and angle of attack','What a stall is'],['Stall speed in a level turn','Load factor'],['Stall recovery','Recovery']],
'VFR flight into IMC (SS33)':[['The 180','The 180'],['Tricks your balance','Spatial disorientation types'],['VFR on top','VFR on top']],
'GA radiotelephony practice (SS22)':[['Squawk codes','Squawk codes'],['Where to make your aerodrome calls','Circuit and aerodrome calls'],['The distress or urgency','MAYDAY and PAN PAN']],
'VFR flight planning and VMC minima (SS05)':[['UK VMC minima','VMC minima in the UK'],['Final fuel reserve','Fuel reserves'],['FREDA','In-flight monitoring']],
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
