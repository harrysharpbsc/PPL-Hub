import os,json
from playwright.sync_api import sync_playwright
JS="""(function(){var bs=[].slice.call(document.querySelectorAll('button,select,.opt,a.btn')).filter(function(b){var r=b.getBoundingClientRect();return r.width>0&&r.height>0&&!b.closest('.seg,.kb-seg,.tabbar,.navl,.rail')});var out=[];
for(var i=0;i<bs.length;i++)for(var j=i+1;j<bs.length;j++){var a=bs[i].getBoundingClientRect(),c=bs[j].getBoundingClientRect();if(bs[i].contains(bs[j])||bs[j].contains(bs[i]))continue;
var ov=Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top),oh=Math.min(a.right,c.right)-Math.max(a.left,c.left);var g=null;
if(ov>4){g=Math.max(c.left-a.right,a.left-c.right)}else if(oh>4){g=Math.max(c.top-a.bottom,a.top-c.bottom)}
if(g!==null&&g<8&&g>-30)out.push([bs[i].textContent.trim().slice(0,18),bs[j].textContent.trim().slice(0,18),Math.round(g)])}return out})()"""
with sync_playwright() as p:
    b=p.chromium.launch()
    for w,h in [(1280,900),(430,900)]:
        pg=b.new_page(viewport={'width':w,'height':h})
        pg.goto('file://'+os.getcwd()+'/hub_test.html')
        res={}
        def nav(t):
            l=pg.locator('button.nv:visible:has-text("%s")'%t)
            if l.count(): l.first.click();pg.wait_for_timeout(150)
        def scan(name):
            r=pg.evaluate(JS)
            if r: res[name]=r[:6]
        def end():
            l=pg.locator('button:has-text("End")')
            if l.count(): l.first.click();pg.wait_for_timeout(150)
        for t in ['Today','Practice','Radio','Labs','Progress','Subjects']: nav(t);scan(t)
        nav('Subjects');pg.locator('button.sc[data-a="sub"]').first.click();scan('subject')
        pg.locator('button.sc[data-a="topic"]').first.click();scan('topic')
        pg.locator('[data-a="step"]').first.click();pg.wait_for_timeout(200);scan('pretest')
        if pg.locator('.opt').count(): pg.locator('.opt').first.click();pg.wait_for_timeout(100);scan('pretest-answered')
        end()
        nav('Labs')
        ids=pg.evaluate("[].map.call(document.querySelectorAll('[data-a=lab]'),function(b){return b.dataset.id})")
        for lid in ids:
            nav('Labs');pg.locator('[data-id="%s"]'%lid).click();pg.wait_for_timeout(200);scan('lab:'+lid)
            g=pg.locator('[data-k="go"]')
            if g.count():
                g.first.click();pg.wait_for_timeout(900);scan('lab-run:'+lid)
                if pg.locator('.lev .opt').count(): pg.locator('.lev .opt').first.click();pg.wait_for_timeout(100);scan('lab-ans:'+lid)
            end()
        nav('Practice')
        btns=pg.evaluate("[].map.call(document.querySelectorAll('#main button'),function(b){return b.textContent.trim().slice(0,30)})")
        print(w,'practice buttons',len(btns))
        for k,v in res.items(): print(w,k,v)
