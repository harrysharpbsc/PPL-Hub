"""Inline the Barlow fonts into the mock-up: python3 mockups/route/build.py"""
import base64,os
d=os.path.dirname(os.path.abspath(__file__))
faces=[('Barlow',400),('Barlow',500),('Barlow',600),('Barlow Semi Condensed',500),('Barlow Semi Condensed',600),('Barlow Semi Condensed',700)]
css=''
for fam,w in faces:
    fn=os.path.join(d,'fonts','%s-latin-%d-normal.woff2'%(fam.lower().replace(' ','-'),w))
    b=base64.b64encode(open(fn,'rb').read()).decode()
    css+='@font-face{font-family:"%s";font-weight:%d;font-style:normal;font-display:swap;src:url(data:font/woff2;base64,%s) format("woff2")}\n'%(fam,w,b)
s=open(os.path.join(d,'src.html')).read().replace('/*FONTS*/',css)
open(os.path.join(d,'index.html'),'w').write(s)
print('mockups/route/index.html',len(s),'bytes')
