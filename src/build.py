import sys,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
h=open('hub.html').read()
files=['data.js','radio.js','caa.js','caa2.js','caa3.js']
d='\n'.join(open(f).read() for f in files)
import os
from packdata import pack
labs='\n'.join((pack(open(f).read()) if f=='labs50data.js' else open(f).read()) for f in sorted(os.listdir('.')) if f.startswith('labs') and f.endswith('.js'))
o=h.replace('/*DATA*/',d).replace('/*LABS*/',labs)
open('hub_built.html','w').write(o)
import subprocess
subprocess.run(['node','mini.js','hub_built.html','hub_built.html'],check=True)
m=open('hub_built.html').read()
open('hub_download.html','w').write('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'+m+'</body></html>')
t=o.replace("'use strict';","'use strict';window.__T={get ses(){return ses},get S(){return S},get KB(){return KB},get NTTS(){return NTTS},get ASR(){return ASR},speak:function(t,w){speakAtc(t,w)},render:function(){render()}};",1)
open('hub_test.html','w').write('<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+t+'</body></html>')
print(len(o),len(m))
# GitHub Pages site (installable, works offline)
HEAD=('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
 '<meta name="theme-color" content="#0f2a44"><link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon-192.png">'
 '<link rel="apple-touch-icon" href="apple-touch-icon.png"><meta name="mobile-web-app-capable" content="yes"></head><body>')
SW='<script>if("serviceWorker"in navigator&&location.protocol==="https:")addEventListener("load",function(){navigator.serviceWorker.register("sw.js")})</script>'
if os.path.isdir('../docs'):
    open('../docs/index.html','w').write(HEAD+m+SW+'</body></html>')
