const fs=require('fs'),{minify}=require('terser'),csso=require('csso');
(async()=>{let h=fs.readFileSync(process.argv[2],'utf8');
const s1=h.indexOf('<script>')+8,s2=h.lastIndexOf('</script>');
const js=h.slice(s1,s2);
const r=await minify(js,{compress:{passes:1},mangle:true,format:{ascii_only:false}});
const c1=h.indexOf('<style>')+7,c2=h.indexOf('</style>');
const css=csso.minify(h.slice(c1,c2),{restructure:false}).css;
h=h.slice(0,c1)+css+h.slice(c2,s1)+r.code+h.slice(s2);
fs.writeFileSync(process.argv[3],h);console.log(h.length);})().catch(e=>{console.error(e);process.exit(1)});
