/* ===== Style B diagram library (see .claude/skills/ppl-diagram/SKILL.md) =====
   Plain card, no chart paper. Every label is a <text> with class t1 (12px, bold, ink) or t2 (11px, ink-2),
   plus an optional colour class: ta accent, tr bad, tg good, tm mid. Shapes use fill classes fk/fa/fr/fg/fm and
   stroke classes sk/sa/sr/sg/sm/s2 (s2 = quiet guide line). Colour = role: accent = you / the aircraft that acts,
   ink = the other aircraft, bad = limit or danger, good = safe outcome, mid = zones and angles.
   Colour letters for dbAR/dbHead/dbPlane/dbSide: 'k' ink, 'a' accent, 'r' bad, 'g' good, 'm' mid. */
var DB_PL='M0-13L1.7-10L1.8-4L13-2.2L13 .6L1.8 .2L1.3 7.5L5 9.2L5 11L0 10.4L-5 11L-5 9.2L-1.3 7.5L-1.8 .2L-13 .6L-13-2.2L-1.8-4L-1.7-10Z';
var DB_SIDE='M-26 0C-26-3-24-4.5-20-5L-8-6L-3-10.5C-1-11.2 4-11.2 6-10L10-6L26-4.2L30-12.5H33.5L33-2L26 1.2L-18 1.6C-23 1.6-26 1-26 0Z';
function dbN(v){return Math.round(v*10)/10}
/* text: c = 't1' (default) or 't2', plus colour class, e.g. 't2 ta'; a = text-anchor */
function dbT(x,y,s,c,a){return'<text x="'+x+'" y="'+y+'" class="'+(c||'t1')+'"'+(a?' text-anchor="'+a+'"':'')+'>'+s+'</text>'}
/* line or path: c = stroke class ('sk' default) */
function dbL(d,c,w,dash){return'<path d="'+d+'" class="'+(c||'sk')+'" stroke-width="'+(w||1.4)+'"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'}
/* arrowhead at (x2,y2), pointing along the direction from (xp,yp) */
function dbHead(xp,yp,x2,y2,c){var a=Math.atan2(y2-yp,x2-xp),l=8,w=4,bx=x2-Math.cos(a)*l,by=y2-Math.sin(a)*l;return'<path d="M'+dbN(x2)+' '+dbN(y2)+'L'+dbN(bx+Math.sin(a)*w)+' '+dbN(by-Math.cos(a)*w)+'L'+dbN(bx-Math.sin(a)*w)+' '+dbN(by+Math.cos(a)*w)+'Z" class="f'+c+'"/>'}
/* arrow: path d, then the last direction (xp,yp)->(x2,y2) for its head; c colour letter */
function dbAR(d,xp,yp,x2,y2,c,w,dash){return dbL(d,'s'+c,w||1.8,dash)+dbHead(xp,yp,x2,y2,c)}
/* plan-view aircraft, nose up at heading 0; lights = any of 'r','g','w' (left red, right green, tail white) */
function dbPlane(x,y,h,c,s,lights){var g='<g transform="translate('+x+' '+y+') rotate('+(h||0)+') scale('+(s||1.3)+')"><path d="'+DB_PL+'" class="plane f'+(c||'k')+'"/>';
  (lights||'').split('').forEach(function(k){if(k==='r')g+='<circle cx="-12" cy="-.8" r="2.4" fill="#E0262B" stroke="var(--surface)" stroke-width=".6"/>';if(k==='g')g+='<circle cx="12" cy="-.8" r="2.4" fill="#2FA84F" stroke="var(--surface)" stroke-width=".6"/>';if(k==='w')g+='<circle cx="0" cy="10.6" r="2.3" fill="#fff" stroke="var(--ink)" stroke-width=".6"/>'});return g+'</g>'}
/* side-view aircraft facing right (flip = facing left) */
function dbSide(x,y,s,c,flip){return'<g transform="translate('+x+' '+y+') scale('+(flip?-s:s)+' '+s+')"><path d="'+DB_SIDE+'" class="f'+(c||'a')+'"/><path d="M-6-2.5H12" stroke="var(--surface)" stroke-width="1.6"/></g>'}
/* arc path on a circle, angles in degrees clockwise from north */
function dbArc(cx,cy,r,a0,a1){function p(a){var q=(a-90)*Math.PI/180;return[dbN(cx+Math.cos(q)*r),dbN(cy+Math.sin(q)*r)]}var s=p(a0),e=p(a1);return'M'+s[0]+' '+s[1]+'A'+r+' '+r+' 0 '+((a1-a0+360)%360>180?1:0)+' 1 '+e[0]+' '+e[1]}
function dbSector(cx,cy,r,a0,a1,fill,op){return'<path d="M'+cx+' '+cy+'L'+dbArc(cx,cy,r,a0,a1).slice(1)+'Z" fill="'+fill+'" opacity="'+op+'"/>'}
/* the figure: viewBox w x h (width 320 so 11px labels stay >= 11px on a phone card), caption carries the full sentence */
function dbFig(title,w,h,inner,cap){return'<figure class="dg dgb"><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(title+'. '+cap)+'"><rect width="'+w+'" height="'+h+'" rx="8" fill="var(--surface)"/>'+inner+'</svg><figcaption><b>'+title+'</b>'+cap+'</figcaption></figure>'}
