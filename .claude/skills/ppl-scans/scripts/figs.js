// Run from src/ after build.py. node figs.js OUTDIR "Topic 1" "Topic 2" ...
// Writes OUTDIR/NNN.png (430 px, light), OUTDIR/sheetN.png contact sheets, OUTDIR/dark_NNN.png, and OUTDIR/figs.json
// ([{t:topic, f:[{sec, h:figureHtml, from:'other topic if reused'}]}]) for review.py.
const {chromium}=require('playwright');const fs=require('fs');const [out,...topics]=process.argv.slice(2);
(async()=>{fs.mkdirSync(out,{recursive:true});const b=await chromium.launch();
const shoot=async(dark)=>{const pg=await b.newPage({viewport:{width:430,height:900},colorScheme:dark?'dark':'light'});
 await pg.goto('file://'+process.cwd()+'/hub_test.html');await pg.waitForTimeout(300);let i=0;
 for(const t of topics){const n=await pg.evaluate(([t,dark])=>{if(dark)document.documentElement.setAttribute('data-theme','dark');var h='';(__T.DSEC[t]||[]).forEach(function(e,i){h+='<div class="dgs acc-fig" style="padding:8px" id="F'+i+'">'+e[1]+'</div>'});
  var m=document.querySelector('main')||document.body;m.innerHTML='<div style="width:414px">'+h+'</div>';return (__T.DSEC[t]||[]).length},[t,dark]);
  if(!n)console.log('no figures for',t);await pg.waitForTimeout(150);for(let k=0;k<n;k++)await pg.locator('#F'+k+' figure').screenshot({path:`${out}/${dark?'dark_':''}${String(i++).padStart(3,'0')}.png`})}
 await pg.close();return i};
const n=await shoot(false);await shoot(true);
const fl=fs.readdirSync(out).filter(f=>/^\d{3}\.png$/.test(f)).sort();const p2=await b.newPage({viewport:{width:1600,height:800}});
fs.writeFileSync(out+'/m.html','<body style="margin:0;display:grid;grid-template-columns:repeat(5,1fr);gap:4px;background:#888">'+fl.map(f=>'<img style="width:100%" src="'+f+'">').join(''));
await p2.goto('file://'+out+'/m.html');await p2.waitForTimeout(300);const H=await p2.evaluate(()=>document.body.scrollHeight);
for(let y=0,j=0;y<H;y+=1900,j++)await p2.screenshot({path:`${out}/sheet${j}.png`,clip:{x:0,y,width:1600,height:Math.min(1900,H-y)},fullPage:true});
const pg=await b.newPage();await pg.goto('file://'+process.cwd()+'/hub_test.html');await pg.waitForTimeout(300);
const r=await pg.evaluate(T=>{var D=__T.DSEC,src={};Object.keys(D).forEach(function(k){if(T.indexOf(k)<0)D[k].forEach(function(e){src[e[1]]=k})});
 return T.map(function(t){return{t:t,f:(D[t]||[]).map(function(e){return{sec:e[0],h:e[1],from:src[e[1]]||''}})}})},topics);
fs.writeFileSync(out+'/figs.json',JSON.stringify(r));console.log(n,'figures');await b.close()})();
