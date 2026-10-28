import os,json
from playwright.sync_api import sync_playwright
CF='Golf Golf Uniform Alpha November';C='Golf Alpha November';st='Larkfield Radio'
ovh={'opt':[st,'runway two seven'],'ans':[st,C,'overhead','descending','dead side','runway two seven'],'bank':['final','Mayday','Roger']}
dw={'opt':[st],'ans':[st,C,'downwind','full stop'],'bank':['final','base','Roger']}
init={'ans':[st,CF,'Cessna 172','inbound to join'],'bank':['Mayday']}
cases=[(ovh,'G-AN overhead, dead side descending',True,True),(ovh,'Golf Alpha November overhead deadside descending runway 27',True,True),
 (ovh,'Larkfield Radio Golf Golf Uniform Alpha November overhead descending dead side runway two seven QFE one zero one six',True,True),
 (ovh,'Golf Alpha November overhead',True,False),(dw,'G-AN downwind full stop',True,True),(dw,'Golf Golf Uniform Alpha November downwind runway two seven full stop',True,True),
 (dw,'Golf Alpha November final full stop',True,False),(init,'Larkfield Radio Golf Alpha November Cessna 172 inbound to join',False,False),
 (init,'Larkfield Radio Golf Alpha November Cessna 172 inbound to join',True,True),(init,'Larkfield Radio Golf Golf Uniform Alpha November Cessna 172 inbound to join',False,True)]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page();pg.goto('file://'+os.getcwd()+'/hub_test.html')
    for e,t,ab,exp in cases:
        e=dict(e);e['abOk']=ab;r=pg.evaluate("a=>{const g=__T.grade(a[0],a[1]);return [g.ok,g.parts.filter(p=>!p.ok).map(p=>p.t),g.bad]}",[e,t])
        print('PASS' if r[0]==exp else 'FAIL',exp,'|',t,'| missing',r[1],'| extra',r[2])
