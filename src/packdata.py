import re
A='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef'  # terminal (5 bits)
B='ghijklmnopqrstuvwxyz0123456789_$'  # continuation
def enc(nums):
    out=[];prev=[0,0]
    for i,v in enumerate(nums):
        d=v-prev[i%2];prev[i%2]=v
        u=(d<<1)^(d>>63) if False else (d*2 if d>=0 else -d*2-1)
        s=[]
        while u>=32: s.append(B[u&31]);u>>=5
        s.append(A[u]);out.append(''.join(s))
    return ''.join(out)
DEC=r'''function D(s){var o=[],p=[0,0],u=0,sh=0,k=0;for(var i=0;i<s.length;i++){var c=s.charCodeAt(i),t=c<91&&c>64?c-65:c>96&&c<103?c-71:-1;if(t<0){var q='ghijklmnopqrstuvwxyz0123456789_$'.indexOf(s[i]);u+=q*Math.pow(32,sh);sh++;continue}u+=t*Math.pow(32,sh);var d=u%2?-(u+1)/2:u/2;p[k]+=d;o.push(p[k]);k^=1;u=0;sh=0}return o}
'''
def pack(src):
    def r(m):
        nums=[int(x) for x in m.group(1).split(',')]
        if len(nums)%2: return m.group(0)
        return 'D("'+enc(nums)+'")'
    return DEC+re.sub(r'\[(-?\d+(?:,-?\d+){7,})\]',r,src)
if __name__=='__main__':
    s=open('labs50data.js').read();p=pack(s);print(len(s),len(p))
    open('_pk.js','w').write(p)
