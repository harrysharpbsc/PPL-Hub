# Diagram text must stay inside its box, inside the diagram, and off other labels.
# Uses tests/fonts by default; or pass a folder holding figtree-latin-{400,500,600,700}-normal.woff2 and
# source-serif-4-latin-{600,700}-normal.woff2 to measure with the real fonts (Google Fonts is blocked here).
import os,sys,base64
from playwright.sync_api import sync_playwright
fdir=sys.argv[1] if len(sys.argv)>1 else os.path.join(os.path.dirname(os.path.abspath(__file__)),'fonts')
css=''
if fdir:
    for fam,fn,w in [('Figtree','figtree-latin-%d-normal.woff2',[400,500,600,700]),('Source Serif 4','source-serif-4-latin-%d-normal.woff2',[600,700])]:
        for x in w:
            b=base64.b64encode(open(os.path.join(fdir,fn%x),'rb').read()).decode()
            css+="@font-face{font-family:'%s';font-weight:%d;src:url(data:font/woff2;base64,%s) format('woff2')}"%(fam,x,b)
JS=r"""(function(){
var T=__T,host=document.createElement('div');host.id='dgall';host.style.cssText='position:absolute;left:0;top:0;width:420px;background:var(--bg);z-index:99';
var figs=[];Object.keys(T.DSEC).forEach(function(t){T.DSEC[t].forEach(function(e){figs.push([t,e[1]])})});
Object.keys(T.DIAG).forEach(function(t){(T.DIAG[t].match(/<figure[\s\S]*?<\/figure>/g)||[]).forEach(function(f){figs.push([t,f])})});
host.innerHTML=figs.map(function(f){return'<div class="dgs">'+f[1]+'</div>'}).join('');document.body.appendChild(host);return figs.length})()"""
CHECK=r"""(function(){
var out=[];[].forEach.call(document.querySelectorAll('#dgall figure'),function(fig){
 var svg=fig.querySelector('svg'),sb=svg.getBoundingClientRect(),title=fig.querySelector('figcaption b').textContent;
 var rects=[].filter.call(svg.querySelectorAll('rect'),function(r){var b=r.getBoundingClientRect();return b.width<sb.width-2&&b.height>8&&b.width>8&&r.getAttribute('fill')!=='transparent'}).map(function(r){return r.getBoundingClientRect()});
 var texts=[].filter.call(svg.querySelectorAll('text'),function(t){return t.textContent.trim()}).map(function(t){return{s:t.textContent,b:t.getBoundingClientRect()}});
 var k=sb.width/(+svg.getAttribute('viewBox').split(' ')[2]),tol=0.6*k;
 texts.forEach(function(t,i){var b=t.b,cx=b.left+b.width/2,cy=b.top+b.height/2;
  if(b.left<sb.left-tol||b.right>sb.right+tol||b.top<sb.top-tol||b.bottom>sb.bottom+tol)out.push([title,t.s,'off the diagram']);
  var box=null;rects.forEach(function(r){if(cx>r.left&&cx<r.right&&cy>r.top&&cy<r.bottom&&(!box||r.width*r.height<box.width*box.height))box=r});
  var pad=1.5*k;
  if(box&&(b.left<box.left+pad-tol||b.right>box.right-pad+tol))out.push([title,t.s,'wider than its box by '+(Math.max(box.left+pad-b.left,b.right-box.right+pad)/k).toFixed(1)]);
  for(var j=i+1;j<texts.length;j++){var c=texts[j].b,ox=Math.min(b.right,c.right)-Math.max(b.left,c.left),oy=Math.min(b.bottom,c.bottom)-Math.max(b.top,c.top);
   if(ox>1.2*k&&oy>2.2*k)out.push([title,t.s+' / '+texts[j].s,'labels overlap'])}
 })});return out})()"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for theme in ['light']:
        pg=b.new_page(viewport={'width':440,'height':900});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        pg.goto('file://'+os.getcwd()+'/hub_test.html');pg.wait_for_timeout(300)
        if css: pg.add_style_tag(content=css);pg.evaluate("document.fonts.ready");pg.wait_for_timeout(300)
        n=pg.evaluate(JS);pg.wait_for_timeout(300)
        if css: print('fonts:',pg.evaluate("[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight).join(', ')"))
        bad=pg.evaluate(CHECK)
        for x in bad: print(' ','|'.join(x))
        print(n,'diagrams,',len(bad),'text problems; errors:',errs)
        assert not bad and not errs
