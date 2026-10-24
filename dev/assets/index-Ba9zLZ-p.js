const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qa-BCQd2LNy.js","./qa-DWlVkWAo.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Fd="modulepreload",Od=function(n,t){return new URL(n,t).href},lh={},Bd=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(h=>{if(h=Od(h,i),h in lh)return;lh[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(i)for(let x=o.length-1;x>=0;x--){const p=o[x];if(p.href===h&&(!u||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":Fd,u||(d.as="script"),d.crossOrigin="",d.href=h,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((x,p)=>{d.addEventListener("load",x),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};function kd(n,t,e){if(!(e>0)||!Number.isFinite(e))return;const i=t.heading??Math.PI/2,s=Math.atan2(Math.sin(i-n.rotation.y),Math.cos(i-n.rotation.y)),r=t.type==="cow"?Math.PI/1.5:Math.PI,o=Math.max(-r*e,Math.min(r*e,s));n.rotation.y+=o,n.userData.turnSpeed=Math.abs(o)/e}function Gd(n,t=0){return Math.max(Math.hypot(n.vx,n.vz),Math.min(2,t))}const uc=Object.freeze([1,13/12,7/6,1.25]);function Ns(n){return n?.type!=="cow"||!Number.isFinite(n.scale)?1:uc.reduce((t,e)=>Math.abs(e-n.scale)<Math.abs(t-n.scale)?e:t,1)}const ve=n=>n?.type==="cow"?.78*Ns(n):.55,ur=(n,t,e)=>Math.max(t,Math.min(e,n)),_e=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),Ho=(n,t)=>{const e=Math.hypot(n,t);return e>1e-8?{x:n/e,z:t/e}:{x:0,z:0}};function ui(n){let t=n>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function gl(n,t,e){const i=e.x-t.x,s=e.z-t.z,r=ur(((n.x-t.x)*i+(n.z-t.z)*s)/(i*i+s*s||1),0,1);return{x:t.x+i*r,z:t.z+s*r,t:r}}function hn(n,t,e){return _e(n,gl(n,t,e))}const fn=n=>({x:Math.sin(n),z:Math.cos(n)});function Vo(n,t){const e=fn(n.heading),i=t.x-n.x,s=t.z-n.z;return{forward:i*e.x+s*e.z,lateral:i*e.z-s*e.x}}function wi(n,t,e){const i=fn(n.heading);return{x:n.x+i.x*t+i.z*e,z:n.z+i.z*t-i.x*e}}function tn(n){const t=n.radius+1.4,e=t,i=fn(n.heading),s={x:i.z,z:-i.x};return{x:n.x,z:n.z,heading:n.heading,halfLength:t,halfWidth:e,openingWidth:7,forward:i,side:s,corners:[[-t,-e],[t,-e],[t,e],[-t,e]].map(([r,o])=>wi(n,r,o)),entrance:wi(n,-t,0)}}function Fs(n,t,e=0){const i=tn(n),s=Vo(n,t),r=Math.max(0,e);return Math.abs(s.forward)<=i.halfLength-r&&Math.abs(s.lateral)<=i.halfWidth-r}function xl(n,t,e){const i=fn(n.heading),s=t.x-n.x,r=t.z-n.z;return Math.abs(s*i.x+r*i.z)<=n.length/2+e&&Math.abs(s*i.z-r*i.x)<=n.width/2-e}const hh=new WeakMap;function Qu(n){let t=hh.get(n);if(t)return t;const e=fn(n.heading),i={x:e.z,z:-e.x},s=(c,l)=>({x:n.x+e.x*c+i.x*l,z:n.z+e.z*c+i.z*l}),r=[-1,1].map(c=>({a:s(-n.length/2-.1,c*n.width/2),b:s(n.length/2+.1,c*n.width/2),radius:.05,posts:Array.from({length:4},(l,h)=>s(-n.length/2+h*n.length/3,c*n.width/2))})),o=r.flatMap(c=>[c.a,c.b]),a={minX:Math.min(...o.map(c=>c.x)),maxX:Math.max(...o.map(c=>c.x)),minZ:Math.min(...o.map(c=>c.z)),maxZ:Math.max(...o.map(c=>c.z))};return t={rails:r,bounds:a},hh.set(n,t),t}function Hd(n,t,e){const{rails:i,bounds:s}=Qu(n),r=e+.065;return t.x<s.minX-r||t.x>s.maxX+r||t.z<s.minZ-r||t.z>s.maxZ+r?!1:i.some(o=>hn(t,o.a,o.b)<e+o.radius||o.posts.some(a=>_e(t,a)<e+.065))}function tf(n,t,e,i){const{rails:s,bounds:r}=Qu(n),o=i+.065;return Math.max(t.x,e.x)<r.minX-o||Math.min(t.x,e.x)>r.maxX+o||Math.max(t.z,e.z)<r.minZ-o||Math.min(t.z,e.z)>r.maxZ+o?!1:s.some(a=>nf(t,e,a.a,a.b,i+a.radius)||a.posts.some(c=>hn(c,t,e)<i+.065))}function Vd(n,t,e=4){const i=n.points,s=i[0],r=i.at(-1),o=Math.abs(r.x-s.x)>Math.abs(r.z-s.z)?"x":"z",a=i[1][o]-s[o],c=Math.floor((t[o]-s[o])/a),l=Math.ceil(e/Math.abs(a))+2,h=[];for(let u=Math.max(0,c-l);u<Math.min(i.length-1,c+l+1);u++)h.push([i[u],i[u+1]]);return h}const uh=new WeakMap;function ef(n){let t=uh.get(n);return t||(t={minX:Math.min(...n.points.map(e=>e.x)),maxX:Math.max(...n.points.map(e=>e.x)),minZ:Math.min(...n.points.map(e=>e.z)),maxZ:Math.max(...n.points.map(e=>e.z))},uh.set(n,t)),t}function _l(n,t,e){const i=ef(n),s=n.width/2+e;return t.x<i.minX-s||t.x>i.maxX+s||t.z<i.minZ-s||t.z>i.maxZ+s?!1:Vd(n,t,s).some(([r,o])=>hn(t,r,o)<s)}function Wd(n,t,e,i){const s=ef(n),r=n.width/2+i;return Math.max(t.x,e.x)>=s.minX-r&&Math.min(t.x,e.x)<=s.maxX+r&&Math.max(t.z,e.z)>=s.minZ-r&&Math.min(t.z,e.z)<=s.maxZ+r}function nf(n,t,e,i,s){if(Math.max(n.x,t.x)<Math.min(e.x,i.x)-s||Math.min(n.x,t.x)>Math.max(e.x,i.x)+s||Math.max(n.z,t.z)<Math.min(e.z,i.z)-s||Math.min(n.z,t.z)>Math.max(e.z,i.z)+s)return!1;const r=(h,u,f)=>(u.x-h.x)*(f.z-h.z)-(u.z-h.z)*(f.x-h.x),o=r(n,t,e),a=r(n,t,i),c=r(e,i,n),l=r(e,i,t);return o*a<0&&c*l<0?!0:Math.min(hn(n,e,i),hn(t,e,i),hn(e,n,t),hn(i,n,t))<s}function Ml(n){const t=fn(n.heading),e=n.width/2;return{a:{x:n.x-t.z*e,z:n.z+t.x*e},b:{x:n.x+t.z*e,z:n.z-t.x*e},kind:"gate",material:n.material||"wood"}}const sf=n=>n.material==="stone"?.3:.18;function rf(n){return[...n.fenceSegments||[],...(n.gates||[]).filter(t=>t.operable&&!t.open).map(Ml)]}function fc(n,t){const e=n.boundary;if(!e)return!0;let i=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const o=e[s],a=e[r];o.z>t.z!=a.z>t.z&&t.x<(a.x-o.x)*(t.z-o.z)/(a.z-o.z)+o.x&&(i=!i)}return i}function ae(n,t,e,i=.55){const s={x:t,z:e},r=n.bounds;if(t<r.minX+i+.18||t>r.maxX-i-.18||e<r.minZ+i+.18||e>r.maxZ-i-.18||!fc(n,s))return!1;for(const o of rf(n))if(hn(s,o.a,o.b)<i+sf(o))return!1;for(const o of n.rivers||[])if(o.bridges.some(c=>Hd(c,s,i))||_l(o,s,i)&&!o.bridges.some(c=>xl(c,s,i)))return!1;for(const o of n.obstacles||[])if(_e(s,o)<i+o.radius)return!1;return!0}function fr(n,t,e,i,s=.55){const r=Math.max(1,Math.ceil(Math.hypot(e,i)/.25)),o=e/r,a=i/r;let c=!1,l=!1;for(let h=0;h<r;h++)ae(n,t.x+o,t.z+a,s)?(t.x+=o,t.z+=a):(ae(n,t.x+o,t.z,s)?t.x+=o:Math.abs(o)>1e-8&&(c=!0),ae(n,t.x,t.z+a,s)?t.z+=a:Math.abs(a)>1e-8&&(l=!0));return{blockedX:c,blockedZ:l}}function of(n,t,e,i,s,r=!1){const o=n.bounds;for(const a of[t,e])if(a.x<o.minX+i+.18||a.x>o.maxX-i-.18||a.z<o.minZ+i+.18||a.z>o.maxZ-i-.18)return!1;if(!fc(n,t)||!fc(n,e))return!1;for(const a of rf(n))if(!(r&&a.kind!=="boundary"&&a.kind!=="gate"&&a.material!=="stone"&&(a.kind!=="target"||n.target?.type!=="barn"))&&nf(t,e,a.a,a.b,i+sf(a)))return!1;for(const a of n.obstacles||[]){const c=i+a.radius;if(!(a.x<Math.min(t.x,e.x)-c||a.x>Math.max(t.x,e.x)+c||a.z<Math.min(t.z,e.z)-c||a.z>Math.max(t.z,e.z)+c)&&hn(a,t,e)<c)return!1}for(const a of n.rivers||[]){if(s&&a.bridges.some(l=>tf(l,t,e,i)))return!1;if(!Wd(a,t,e,i))continue;const c=Math.max(1,Math.ceil(_e(t,e)/.45));for(let l=0;l<=c;l++){const h={x:t.x+(e.x-t.x)*l/c,z:t.z+(e.z-t.z)*l/c};if(_l(a,h,i)&&!a.bridges.some(u=>xl(u,h,i)))return!1}}return!0}function oe(n,t,e,i=.55){return of(n,t,e,i,!0)}function Xd(n,t,e){return of(n,t,e,.15,!1,!0)}function Pn(n,t,e){for(const i of n?.rivers||[])for(const s of i.bridges)if(xl(s,{x:t,z:e},0)){const r=fn(s.heading),o=(t-s.x)*r.x+(e-s.z)*r.z;return .18+.12*Math.sin(Math.PI*(o/s.length+.5))}return 0}function qd(n,t,e){const i=[n[0]];for(let s=1;s<n.length;s++){const r=n[s-1],o=n[s],a=_e(r,o),c=Math.max(1,Math.ceil(a/1.2)),l=Ho(o.x-r.x,o.z-r.z),h=t()*Math.PI*2,u=r.kind==="bridge"||o.kind==="bridge"||r.kind==="gate"||o.kind==="gate"||o.kind==="target"?0:Math.min(1.8,a*.045),f=[];for(let x=1;x<=c;x++){const p=x/c,m=Math.sin(Math.PI*p)*Math.sin(Math.PI*2*p+h)*u;f.push({x:r.x+(o.x-r.x)*p-l.z*m,z:r.z+(o.z-r.z)*p+l.x*m,...x===c&&o.kind?{kind:o.kind}:{}})}const d=!e||f.every((x,p)=>oe(e,p?f[p-1]:r,x,.85));for(let x=1;x<=c;x++){const p=x/c;i.push(d?f[x-1]:{x:r.x+(o.x-r.x)*p,z:r.z+(o.z-r.z)*p,...x===c&&o.kind?{kind:o.kind}:{}})}}return i}function Zd(n){const t=[...new Set(n.flatMap(h=>[h.minX,h.maxX]))].sort((h,u)=>h-u),e=[...new Set(n.flatMap(h=>[h.minZ,h.maxZ]))].sort((h,u)=>h-u),i=new Set,s=(h,u)=>`${h},${u}`;for(let h=0;h<t.length-1;h++)for(let u=0;u<e.length-1;u++){const f=(t[h]+t[h+1])/2,d=(e[u]+e[u+1])/2;n.some(x=>f>x.minX&&f<x.maxX&&d>x.minZ&&d<x.maxZ)&&i.add(s(h,u))}const r=new Map,o=(h,u)=>r.set(s(h.x,h.z),u);for(let h=0;h<t.length-1;h++)for(let u=0;u<e.length-1;u++)if(i.has(s(h,u))){const f={x:t[h],z:e[u]},d={x:t[h+1],z:e[u]},x={x:t[h+1],z:e[u+1]},p={x:t[h],z:e[u+1]};i.has(s(h,u-1))||o(f,d),i.has(s(h+1,u))||o(d,x),i.has(s(h,u+1))||o(x,p),i.has(s(h-1,u))||o(p,f)}const a=r.keys().next().value,c=[];let l=a;do{const[h,u]=l.split(",").map(Number);c.push({x:h,z:u});const f=r.get(l);l=s(f.x,f.z)}while(l!==a&&c.length<=r.size);return c.filter((h,u)=>{const f=c[(u+c.length-1)%c.length],d=c[(u+1)%c.length];return Math.abs((h.x-f.x)*(d.z-h.z)-(h.z-f.z)*(d.x-h.x))>1e-8})}function Yd(n,t,e,i,s){const r=ui(t^1095912787),o=["L","U","Z","step"][Math.floor(r()*4)],a=r()<.5?-1:1,c=28+Math.min((n-39)*.12,6),l=i+18,h=s+105+(n-39)*.55,u=[{x:l,z:0},{x:l,z:a*h}];o==="U"&&u.push({x:e+65,z:a*h}),o==="Z"&&u.push({x:l+110+(n-39)*.4,z:a*h}),o==="step"&&u.push({x:l-100,z:a*h},{x:l-100,z:a*(h+105)});const f=[{minX:e,maxX:l+c,minZ:-s,maxZ:s}];for(let m=1;m<u.length;m++){const g=u[m-1],v=u[m];f.push({minX:Math.min(g.x,v.x)-c,maxX:Math.max(g.x,v.x)+c,minZ:Math.min(g.z,v.z)-c,maxZ:Math.max(g.z,v.z)+c})}const d=u.at(-2),x=u.at(-1),p=Ho(x.x-d.x,x.z-d.z);return{kind:o,side:a,corners:u,boundary:Zd(f),heading:Math.atan2(p.x,p.z),target:x,width:c}}function vl(n=0,t=n*7919+42){n=ur(Math.floor(Number(n)||0),0,99),t=Number(t)>>>0;const e=ui(t^1129273171),i=ui(t^1296126035),s=ui(t),r=n<5,o=Math.min(5+n*3,65),a=n===1?9.4:r?4.1:4.8,c=r?0:18+ur((o-30)*.4,0,14)+(o>30?.1:0),l=Math.max(0,n-19),h=r?15+n*3:n>=39?150+Math.min(n-39,40)*.3:48+n*3+c+l*.45,u=r?-32:-40,f=h+15,d=r?24:n>=39?84+Math.min(l*.1,8):84+Math.floor(n/15)*14+l*.3,x=n<19?0:(i()-.5)*Math.min(d*.7,24+l*.7),m=(r?n===0?0:t%2*2:t%4)*Math.PI/2,g=tt=>({x:Number((tt.x*Math.cos(m)-tt.z*Math.sin(m)).toFixed(6)),z:Number((tt.x*Math.sin(m)+tt.z*Math.cos(m)).toFixed(6)),...tt.kind?{kind:tt.kind}:{}}),v=Math.PI/2-m,M=[{x:u,z:-d},{x:f,z:d},{x:u,z:d},{x:f,z:-d}].map(g),_={minX:Math.min(...M.map(tt=>tt.x)),maxX:Math.max(...M.map(tt=>tt.x)),minZ:Math.min(...M.map(tt=>tt.z)),maxZ:Math.max(...M.map(tt=>tt.z))};r||(_.minZ=Math.min(_.minZ,-d),_.maxZ=Math.max(_.maxZ,d));const S={...g({x:h,z:x}),radius:4.7+Math.sqrt(o)*.2,type:n%3===2?"barn":n%3===1?"field":"pen",heading:v},w=g({x:r?-20:-26,z:0}),A=g({x:r?-26:-33,z:0}),P=r?1:n<15?n%2===1?2:1:n%3===0?3:2,y=r?h-21:h-32,b=n===0?[]:r?[n===1?-10:-12]:n>=15?[y-c-48,y-c-23]:[y-c-23],D=n>=19&&ui(t^1296384334)()<.55;D&&b.length>1&&(b[0]-=15);const U=b.map(tt=>{const st=s()*Math.PI*2;return{width:r?3.1:3.7+Math.min(n*.025,1.8),at:ot=>tt+Math.sin(ot/(D?32:21)+st)*(D?6:2.4)+Math.sin(ot/(D?12:8)+st)*(D?1:.65)}}),B=U.map(tt=>({width:tt.width,points:Array.from({length:Math.ceil((d*2+64)/2)+1},(st,ot)=>{const Ot=-d-32+ot*2;return{x:tt.at(Ot),z:Ot}}),bridges:[]})),G=[],Z=[],F=s()>.5?1:-1;for(let tt=0;tt<P;tt++){const st=n>=39?32:32+Math.min(l*.32,24),ot=P===1?0:(tt-(P-1)/2)*(r?12:st),Ot=[{x:w.x*Math.cos(m)+w.z*Math.sin(m),z:0}];if(n===0)Ot.push({x:-8,z:2.8},{x:2,z:-2.2},{x:h-S.radius-3,z:0},{x:h,z:0,kind:"target"});else{if(U.forEach((C,E)=>{const V=r?n===1?0:F*5:ot+F*(E%2?-1:1)*(14+Math.min(l*(n>=39?.07:.22),n>=39?5:16)+s()*5),J=B[E].points,rt=ur(Math.floor((V-J[0].z)/2),0,J.length-2),Q=J[rt],zt=J[rt+1],mt=(V-Q.z)/(zt.z-Q.z),At=Q.x+(zt.x-Q.x)*mt,bt=Ho(zt.z-Q.z,Q.x-zt.x),ut={x:At,z:V,width:a*1.25,length:C.width+1.5,heading:Math.atan2(bt.x,bt.z)-m};B[E].bridges.push(ut);const et=C.width/2+2.5+(r?3:D?10:6),xt=r?et:(At-b[E]+et)/bt.x,_t=r?et:(b[E]+et-At)/bt.x,at={x:At-bt.x*xt,z:V-bt.z*xt},Ut={x:At+bt.x*_t,z:V+bt.z*_t};Ot.push({x:at.x-4,z:at.z-F*(r?3:8)},at,{x:At,z:V,kind:"bridge"},Ut)}),n>=2){const C=r?F*-4:ot-F*(13+s()*4),E={x:y,z:C,width:r?8:10,heading:v};G.push(E),Ot.push({x:y-5,z:C},{x:y,z:C,kind:"gate"},{x:y+5,z:C})}const Yt=h-S.radius-4;Ot.push({x:Yt-7,z:r?F*3:x+ot*.3},{x:Yt,z:x},{x:h,z:x,kind:"target"})}Z.push(Ot)}const T=n>=39?Yd(n,t,u,h,d):null;T&&(Object.assign(S,g(T.target),{heading:T.heading-m}),Z.forEach((tt,st)=>{const ot=tt.findIndex(E=>E.kind==="gate"),Ot=ot>=0?tt.slice(0,ot+2):tt.slice(0,-3);Ot.push({x:T.corners[0].x-10,z:0},...T.corners.slice(0,-1));const Yt=T.target,C=fn(T.heading);Ot.push({x:Yt.x-C.x*(S.radius+4),z:Yt.z-C.z*(S.radius+4)},{...Yt,kind:"target"}),Z[st]=Ot}));const z=B.map(tt=>({width:tt.width,points:tt.points.map(g),bridges:tt.bridges.map(st=>({...st,...g(st)}))})),k=ui(t^1398034254)()<.15,H=ui(t^1195463749),N=n>=19&&H()<.65,Y=N&&G.length>1&&H()<.5?Math.floor(H()*G.length):-1,nt=G.map((tt,st)=>({...tt,...g(tt),id:`gate-${st}`,operable:n>=19,open:n<19,material:k?"stone":"wood"})).filter((tt,st)=>n<19||N&&st!==Y);let ht=[{x:_.minX,z:_.minZ},{x:_.maxX,z:_.minZ},{x:_.maxX,z:_.maxZ},{x:_.minX,z:_.maxZ}],Et=-d,q=d;T&&(ht=T.boundary.map(g),_.minX=Math.min(...ht.map(tt=>tt.x)),_.maxX=Math.max(...ht.map(tt=>tt.x)),_.minZ=Math.min(...ht.map(tt=>tt.z)),_.maxZ=Math.max(...ht.map(tt=>tt.z)));const $=ht.map((tt,st)=>({a:tt,b:ht[(st+1)%ht.length],kind:"boundary"}));if(nt.length){const tt=[...G].sort((ot,Ot)=>ot.z-Ot.z);let st=Et;for(const ot of tt)$.push({a:g({x:y,z:st}),b:g({x:y,z:ot.z-ot.width/2}),kind:"interior"}),st=ot.z+ot.width/2;$.push({a:g({x:y,z:st}),b:g({x:y,z:q}),kind:"interior"})}const ct=tn(S),vt=ct.halfLength,dt=ct.halfWidth,Zt=ct.openingWidth/2,Qt=[[[-vt,-dt],[vt,-dt]],[[vt,-dt],[vt,dt]],[[vt,dt],[-vt,dt]],[[-vt,dt],[-vt,Zt]],[[-vt,-Zt],[-vt,-dt]]];for(const[tt,st]of Qt)$.push({a:wi(S,...tt),b:wi(S,...st),kind:"target"});for(const tt of $)tt.material=k&&tt.kind!=="target"?"stone":"wood";const I={bounds:_,boundary:ht,rivers:z,fenceSegments:$,obstacles:[]},Lt=Z.map((tt,st)=>{const ot=qd(tt.map(g),s,I);return{id:`route-${st}`,points:ot,length:ot.slice(1).reduce((Ot,Yt,C)=>Ot+_e(Yt,ot[C]),0)}}),Ft=Lt.map(tt=>({routeId:tt.id,points:tt.points,width:a})),yt={index:n,seed:t,title:["First day on the farm","Over the babbling brook","Through the garden gate","A mixed-up meadow","The long way home"][n]||`Pasture patrol ${n+1}`,description:n===0?"Move behind the sheep and gently guide all five into the sunny pen.":`Bring ${o} robots to the ${S.type}. ${P>1?"Choose a crossing and lead your flock through the meadow.":"Follow the winding trail and use the crossings."}`,bounds:_,boundary:ht,spawn:w,dog:A,target:S,startHeading:v,layoutKind:T?.kind||"field",riverStyle:D?"meandering":"gentle",animals:[],rivers:z,gates:nt,fences:[],fenceSegments:$,obstacles:[],routes:Lt,roads:Ft,reward:80+n*25,sceneryHills:[]};for(let tt=0;tt<o;tt++){const st=g({x:(r?-20:-26)+Math.floor(tt/7)*1.65+(s()-.5)*.2,z:(tt%7-3)*1.65+(s()-.5)*.2}),ot=n>=3&&tt%4===0?"cow":"sheep";yt.animals.push({id:tt,type:ot,...ot==="cow"?{scale:uc[Math.floor(e()*uc.length)]}:{},...st,vx:0,vz:0,saved:!1})}if(yt.animals.some(tt=>!ae(yt,tt.x,tt.z,ve(tt)))){const tt=fn(v),st=yt.animals.map(ot=>({x:ot.x,z:ot.z}));for(let ot=1;ot<=7;ot++){const Ot=ot*.5,Yt=st.map(C=>({x:C.x-tt.x*Ot,z:C.z-tt.z*Ot}));if(Yt.every((C,E)=>ae(yt,C.x,C.z,ve(yt.animals[E])))){Yt.forEach((C,E)=>Object.assign(yt.animals[E],C));break}}}for(const tt of yt.animals){if(tt.type!=="cow")continue;const st=ve(tt),ot={x:tt.x,z:tt.z},Ot=C=>ae(yt,C.x,C.z,st)&&yt.animals.every(E=>E===tt||_e(C,E)>=st+ve(E)+.01);if(Ot(ot))continue;let Yt=!1;for(let C=1;C<=40&&!Yt;C++)for(let E=0;E<24;E++){const V=E*Math.PI/12,J={x:ot.x+Math.cos(V)*C*.1,z:ot.z+Math.sin(V)*C*.1};if(Ot(J)){Object.assign(tt,J),Yt=!0;break}}}const Tt=(tt,st,ot)=>_e(tt,w)<14||_e(tt,S)<S.radius+10||!ae(yt,tt.x,tt.z,st+1)||Lt.some(Ot=>Ot.points.slice(1).some((Yt,C)=>hn(tt,Ot.points[C],Yt)<7+st))?!1:(yt.obstacles.push({...tt,radius:st,...ot===void 0?{}:{grove:ot}}),!0);for(let tt=0;tt<Math.min(10+n*2,130);tt++){const st=T?{x:_.minX+5+s()*(_.maxX-_.minX-10),z:_.minZ+5+s()*(_.maxZ-_.minZ-10)}:g({x:u+5+s()*(f-u-10),z:-d+5+s()*(d*2-10)}),ot=.7+s()*.7;Tt(st,ot)}if(n>=59){const tt=ui(t^1196576598),st=260;yt.groves=[];for(let ot=0;ot<18&&yt.obstacles.length<st;ot++){const Ot=ot<12,Yt=Ot?g({x:-15+tt()*Math.min(145,y+5),z:(ot%2?1:-1)*(24+tt()*(d-38))}):{x:_.minX+10+tt()*(_.maxX-_.minX-20),z:_.minZ+10+tt()*(_.maxZ-_.minZ-20)};let C=0;for(let E=0;E<50&&C<10&&yt.obstacles.length<st;E++){const V=tt()*Math.PI*2,J=Math.sqrt(tt())*10,rt={x:Yt.x+Math.cos(V)*J,z:Yt.z+Math.sin(V)*J};Tt(rt,.7+tt()*.7,ot)&&C++}C&&yt.groves.push({...Yt,id:ot,trees:C})}}for(let tt=0;tt<14;tt++){const st=7+s()*8,ot=3+s()*5,Ot=tt%4,Yt=Ot===0?{x:_.minX-st-3,z:_.minZ+s()*(_.maxZ-_.minZ)}:Ot===1?{x:_.maxX+st+3,z:_.minZ+s()*(_.maxZ-_.minZ)}:Ot===2?{x:_.minX+s()*(_.maxX-_.minX),z:_.minZ-st-3}:{x:_.minX+s()*(_.maxX-_.minX),z:_.maxZ+st+3};yt.sceneryHills.push({...Yt,radius:st,height:ot})}return yt}function fh(n,t,e){let i=null;for(const s of n.routes||[]){if(e&&s.id!==e)continue;let r=0;for(let o=1;o<s.points.length;o++){const a=s.points[o-1],c=s.points[o],l=gl(t,a,c),h=_e(t,l),u=_e(a,c);(!i||h<i.distance)&&(i={route:s,routeId:s.id,index:o-1,point:l,distance:h,progress:r+u*l.t,length:s.length}),r+=u}}return i}function af(n,t){const e=n.target,i=tn(e).halfLength,{forward:s,lateral:r}=Vo(e,t),o=(a,c)=>wi(e,a,c);return s>i+.4?o(i+2,Math.sign(r||1)*(i+2)):Math.abs(r)>i-.4&&s>-i-.8?o(-i-2,Math.sign(r||1)*(i+2)):s<-i+.7?o(-i+2,0):e}function $d(n,t,e,i){if(oe(n,t,e,i))return e;const s=fh(n,t),r=fh(n,e,s?.routeId);if(!s||!r)return e;const o=r.progress>=s.progress,a=s.route.points;if(s.distance>3&&oe(n,t,s.point,i))return s.point;const c=o?Math.min(a.length-1,s.index+5):Math.max(0,s.index-4);for(let l=c;o?l>s.index:l<=s.index;l+=o?-1:1)if(oe(n,t,a[l],i))return a[l];return s.point}function yl(n,t,e,i=.62){if(oe(n,t,e,i))return e;const s=$d(n,t,e,i),r=(n.rivers||[]).flatMap(x=>x.bridges).filter(x=>_e(t,x)<x.length+x.width+8||tf(x,t,e,i)).sort((x,p)=>Math.min(_e(t,x),_e(e,x))-Math.min(_e(t,p),_e(e,p))).slice(0,2),o=n.target,a=o&&tn(o),c=a&&(_e(t,o)<a.halfLength*2+6||_e(e,o)<a.halfLength*2+6);if(!r.length&&!c)return s;const l=[t,e,s];for(const x of r){const p=fn(x.heading),m=x.length/2+i+.4,g=x.width/2+i+.4;for(const[v,M]of[[-m,-g],[-m,g],[m,-g],[m,g],[-m,0],[m,0],[0,0]])l.push({x:x.x+p.x*v+p.z*M,z:x.z+p.z*v-p.x*M})}if(c){const x=a.halfLength+i+.5;for(const[p,m]of[[-x,-x],[-x,x],[x,-x],[x,x],[-x,0],[-a.halfLength+i+.5,0]])l.push(wi(o,p,m))}const h=l.map(()=>1/0),u=[],f=new Set;h[0]=0;for(let x=0;x<l.length;x++){let p=-1;for(let m=0;m<l.length;m++)!f.has(m)&&(p<0||h[m]<h[p])&&(p=m);if(p<0||!Number.isFinite(h[p]))break;f.add(p);for(let m=1;m<l.length;m++){if(f.has(m)||!oe(n,l[p],l[m],i))continue;const g=h[p]+_e(l[p],l[m]);g<h[m]&&(h[m]=g,u[m]=p)}}let d=Number.isFinite(h[1])?1:Number.isFinite(h[2])?2:-1;if(d<0)return s;for(;u[d]!==0&&u[d]!==void 0;)d=u[d];return l[d]}function Kd(n,t,e,i,s=.78){const r=Math.hypot(e,i);if(r<.01)return{x:0,z:0};const o={x:t.x+e/r*2,z:t.z+i/r*2};if(oe(n,t,o,s))return{x:0,z:0};let a=null,c=1/0;for(const x of n.rivers||[])if(_l(x,t,3))for(const p of x.bridges){const m=_e(t,p);m<c&&(c=m,a=p)}const l=n.target,h=tn(l),u={...h.entrance,width:h.openingWidth,heading:l.heading,enclosure:!0};for(const x of[...(n.gates||[]).filter(p=>!p.operable||p.open),u]){const p=fn(x.heading),m=t.x-x.x,g=t.z-x.z;Math.abs(m*p.x+g*p.z)<3&&_e(t,x)<c&&(c=_e(t,x),a=x)}if((n.fenceSegments||[]).some(x=>x.kind==="target"&&hn(t,x.a,x.b)<s+2)&&(a=u),!a)return{x:0,z:0};if(a.length||a.enclosure){let x=a;if(a.length){const g=fn(a.heading),v=(t.x-a.x)*g.x+(t.z-a.z)*g.z,M=(t.x-a.x)*g.z-(t.z-a.z)*g.x,_=Math.max(0,a.width/2-s-.35),S=ur(M,-_,_),w=(Math.sign(v)||1)*a.length/2;x={x:a.x+g.x*w+g.z*S,z:a.z+g.z*w-g.x*S}}const p=yl(n,t,x,s),m=Ho(p.x-t.x,p.z-t.z);return{x:m.x*Math.min(2.4,r*.8+.5),z:m.z*Math.min(2.4,r*.8+.5)}}const f=fn(a.heading),d=(a.x-t.x)*f.z-(a.z-t.z)*f.x;return Math.abs(d)<a.width/2-1?{x:0,z:0}:{x:f.z*Math.sign(d)*Math.min(2.4,r*.8+.5),z:-f.x*Math.sign(d)*Math.min(2.4,r*.8+.5)}}const Ur=(n,t,e)=>Math.max(t,Math.min(e,n)),Nr=(n,t,e,i)=>{const s=((n+i*t)%t+t)%t;return s<e?Math.sin(Math.PI*s/e):0};function jd(n,t,e,i){if(!(e>0)||!Number.isFinite(e))return;const s=(Math.imul((t.id||0)+1,1597334677)>>>0)/4294967296,r=n.herdPoseTime=(n.herdPoseTime||0)+e,o=Math.hypot(t.vx||0,t.vz||0),a=(t.alert||0)>=.03||!!t.wander?.bolting,c=a?0:Ur(t.ordinaryAnticipation||0,0,1),l=a||c>0||o>.45||(n.turnSpeed||0)>.1,h=n.herdPose||{},u=c>0?t.ordinaryAttentionHeading:(a||(t.relaxation??1)<1)&&Number.isFinite(t.attentionHeading)?t.attentionHeading:t.heading??i,f=Math.atan2(Math.sin(u-i),Math.cos(u-i)),d=Ur(f,-.38,.38)*(1-(n.graze||0)),x=a?1:Ur(1-(t.relaxation??1),0,1),p=a&&!h.threat?.32:Math.max(0,(h.anticipation||0)-e),m=l?0:Ur(t.relaxation??1,0,1);n.herdPose={threat:a,anticipation:c>0?c*.32:p,headYaw:(h.headYaw||0)+(d-(h.headYaw||0))*(1-Math.exp(-e*12)),headLift:Math.max(x*.055,c*.055),weightShift:c>0?Math.sin(Math.PI*c)*.035:p>0?Math.sin(Math.PI*p/.32)*.035:0,ear:Nr(r,6.2+s*3,.42,s)*.23*m,tail:Nr(r,9.5+s*4,1.4,s*1.7)*Math.sin(r*10+s*17)*(t.type==="cow"?.32:.22)*m,blink:Nr(r,4+s*3,.18,s*2.3)*.94*m,chew:(n.graze||0)*Nr(r,3+s,1.7,s*1.3)*Math.sin(r*7+s*13)*.014*m}}const dh=new WeakMap,ss=8;function Jd(n,t){const e=n.roads||[];let i=dh.get(n);if(!i||i.roads!==e){const s=new Map;for(const r of e)for(let o=1;o<r.points.length;o++){const a=r.points[o-1],c=r.points[o],l=r.width/2+.5;for(let h=Math.floor((Math.min(a.x,c.x)-l)/ss);h<=Math.floor((Math.max(a.x,c.x)+l)/ss);h++)for(let u=Math.floor((Math.min(a.z,c.z)-l)/ss);u<=Math.floor((Math.max(a.z,c.z)+l)/ss);u++){const f=`${h},${u}`,d=s.get(f)||[];d.push({a,b:c,radius:l}),s.set(f,d)}}i={roads:e,cells:s},dh.set(n,i)}return i.cells.get(`${Math.floor(t.x/ss)},${Math.floor(t.z/ss)}`)||[]}function cf(n,t){if(n.target?.type==="barn"&&Fs(n.target,t))return!1;for(const e of n.rivers||[])for(const i of e.bridges||[]){const s=t.x-i.x,r=t.z-i.z,o=Math.sin(i.heading),a=Math.cos(i.heading);if(Math.abs(s*o+r*a)<=i.length/2+.2&&Math.abs(s*a-r*o)<=i.width/2+.2)return!1}for(const{a:e,b:i,radius:s}of Jd(n,t))if(hn(t,e,i)<=s)return!1;return ae(n,t.x,t.z,0)}function Qd(n,t,e,i){if(!(i>0)||!Number.isFinite(i))return;const s=n.userData;jd(s,t,i,n.rotation.y);const r=Math.hypot(t.vx,t.vz)<.45&&(t.alert||0)<.03&&(s.turnSpeed||0)<.05&&!t.wander&&!t.bridgeCrossing&&!t.ordinaryAnticipation,o=s.grazeAnchor,a=o&&Math.hypot(t.x-o.x,t.z-o.z)<=.75;if((!r||!a)&&(s.grazeAnchor={x:t.x,z:t.z},s.grazeWait=0),!r&&!(s.graze>0)){s.grazeWait=0,s.graze=0,s.grazeTime=(s.grazeTime||0)+i;return}const c=(t.type==="cow"?1.05:.65)*Ns(t),l={x:t.x+Math.sin(n.rotation.y)*c,z:t.z+Math.cos(n.rotation.y)*c},h=Math.sin(n.rotation.y),u=Math.cos(n.rotation.y),f=Ns(t),d=t.type==="cow",x=(d?.45:.3)*f,p=(d?.56:.36)*f,m=(d?-.59:-.36)*f,g=[-x,x].flatMap(S=>[m,p].map(w=>({x:t.x+u*S+h*w,z:t.z-h*S+u*w}))),v=[t,l,...g].every(S=>cf(e,S));s.grazeWait=v&&r?(s.grazeWait||0)+i:0;const M=7+((t.temperament?.confidence??1)-1)*4,_=s.grazeWait+1e-9>=M&&(t.relaxation??1)>.85&&Math.hypot(t.vx,t.vz)<.1?1:0;s.graze=v?(s.graze||0)+Math.max(-i*4,Math.min(i*2,_-(s.graze||0))):0,s.grazeTime=(s.grazeTime||0)+i}function tp(n,t){return(n.graze||0)*(1.05+Math.sin((n.grazeTime||0)*3+t*1.7)*.02)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sl="180",ep=0,ph=1,np=2,lf=1,hf=2,$n=3,bi=0,Qe=1,ze=2,gi=0,Ps=1,dc=2,mh=3,gh=4,ip=5,Bi=100,sp=101,rp=102,op=103,ap=104,cp=200,lp=201,hp=202,up=203,pc=204,mc=205,fp=206,dp=207,pp=208,mp=209,gp=210,xp=211,_p=212,Mp=213,vp=214,gc=0,xc=1,_c=2,Os=3,Mc=4,vc=5,yc=6,Sc=7,uf=0,yp=1,Sp=2,xi=0,wp=1,bp=2,Ep=3,ff=4,Tp=5,Ap=6,Rp=7,df=300,Bs=301,ks=302,wc=303,bc=304,Wo=306,ni=1e3,Hi=1001,Ec=1002,dn=1003,Cp=1004,Fr=1005,xn=1006,ca=1007,Vi=1008,Bn=1009,pf=1010,mf=1011,_r=1012,wl=1013,Zi=1014,Ln=1015,Cr=1016,bl=1017,El=1018,Mr=1020,gf=35902,xf=35899,_f=1021,Mf=1022,Tn=1023,vr=1026,yr=1027,Tl=1028,Al=1029,vf=1030,Rl=1031,Cl=1033,yo=33776,So=33777,wo=33778,bo=33779,Tc=35840,Ac=35841,Rc=35842,Cc=35843,Pc=36196,zc=37492,Dc=37496,Ic=37808,Lc=37809,Uc=37810,Nc=37811,Fc=37812,Oc=37813,Bc=37814,kc=37815,Gc=37816,Hc=37817,Vc=37818,Wc=37819,Xc=37820,qc=37821,Zc=36492,Yc=36494,$c=36495,Kc=36283,jc=36284,Jc=36285,Qc=36286,Pp=3200,zp=3201,yf=0,Dp=1,di="",Le="srgb",Gs="srgb-linear",Ro="linear",de="srgb",rs=7680,xh=519,Ip=512,Lp=513,Up=514,Sf=515,Np=516,Fp=517,Op=518,Bp=519,tl=35044,Wi=35048,_h="300 es",Un=2e3,Co=2001;class qs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],la=Math.PI/180,el=180/Math.PI;function Qn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]).toLowerCase()}function jt(n,t,e){return Math.max(t,Math.min(e,n))}function kp(n,t){return(n%t+t)%t}function ha(n,t,e){return(1-e)*n+e*t}function zn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function pe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Rt{constructor(t=0,e=0){Rt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ii{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const f=r[o+0],d=r[o+1],x=r[o+2],p=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=x,t[e+3]=p;return}if(u!==p||c!==f||l!==d||h!==x){let m=1-a;const g=c*f+l*d+h*x+u*p,v=g>=0?1:-1,M=1-g*g;if(M>Number.EPSILON){const S=Math.sqrt(M),w=Math.atan2(S,g*v);m=Math.sin(m*w)/S,a=Math.sin(a*w)/S}const _=a*v;if(c=c*m+f*_,l=l*m+d*_,h=h*m+x*_,u=u*m+p*_,m===1-a){const S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],d=r[o+2],x=r[o+3];return t[e]=a*x+h*u+c*d-l*f,t[e+1]=c*x+h*f+l*u-a*d,t[e+2]=l*x+h*d+a*f-c*u,t[e+3]=h*x-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*x,this._y=l*d*u-f*h*x,this._z=l*h*x+f*d*u,this._w=l*h*u-f*d*x;break;case"YXZ":this._x=f*h*u+l*d*x,this._y=l*d*u-f*h*x,this._z=l*h*x-f*d*u,this._w=l*h*u+f*d*x;break;case"ZXY":this._x=f*h*u-l*d*x,this._y=l*d*u+f*h*x,this._z=l*h*x+f*d*u,this._w=l*h*u-f*d*x;break;case"ZYX":this._x=f*h*u-l*d*x,this._y=l*d*u+f*h*x,this._z=l*h*x-f*d*u,this._w=l*h*u+f*d*x;break;case"YZX":this._x=f*h*u+l*d*x,this._y=l*d*u+f*h*x,this._z=l*h*x-f*d*u,this._w=l*h*u-f*d*x;break;case"XZY":this._x=f*h*u-l*d*x,this._y=l*d*u-f*h*x,this._z=l*h*x+f*d*u,this._w=l*h*u+f*d*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,i=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Mh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Mh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ua.copy(this).projectOnVector(t),this.sub(ua)}reflect(t){return this.sub(ua.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ua=new L,Mh=new ii;class Jt{constructor(t,e,i,s,r,o,a,c,l){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],x=i[8],p=s[0],m=s[3],g=s[6],v=s[1],M=s[4],_=s[7],S=s[2],w=s[5],A=s[8];return r[0]=o*p+a*v+c*S,r[3]=o*m+a*M+c*w,r[6]=o*g+a*_+c*A,r[1]=l*p+h*v+u*S,r[4]=l*m+h*M+u*w,r[7]=l*g+h*_+u*A,r[2]=f*p+d*v+x*S,r[5]=f*m+d*M+x*w,r[8]=f*g+d*_+x*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,x=e*u+i*f+s*d;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/x;return t[0]=u*p,t[1]=(s*l-h*i)*p,t[2]=(a*i-s*o)*p,t[3]=f*p,t[4]=(h*e-s*c)*p,t[5]=(s*r-a*e)*p,t[6]=d*p,t[7]=(i*c-l*e)*p,t[8]=(o*e-i*r)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(fa.makeScale(t,e)),this}rotate(t){return this.premultiply(fa.makeRotation(-t)),this}translate(t,e){return this.premultiply(fa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new Jt;function wf(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Po(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Gp(){const n=Po("canvas");return n.style.display="block",n}const vh={};function Sr(n){n in vh||(vh[n]=!0,console.warn(n))}function Hp(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const yh=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sh=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vp(){const n={enabled:!0,workingColorSpace:Gs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===de&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===de&&(s.r=zs(s.r),s.g=zs(s.g),s.b=zs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===di?Ro:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Sr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Sr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Gs]:{primaries:t,whitePoint:i,transfer:Ro,toXYZ:yh,fromXYZ:Sh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:i,transfer:de,toXYZ:yh,fromXYZ:Sh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),n}const he=Vp();function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let os;class Wp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{os===void 0&&(os=Po("canvas")),os.width=t.width,os.height=t.height;const s=os.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=os}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Po("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ti(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(ti(e[i]/255)*255):e[i]=ti(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Xp=0;class Pl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Qn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(da(s[o].image)):r.push(da(s[o]))}else r=da(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function da(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Wp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qp=0;const pa=new L;class Xe extends qs{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,i=Hi,s=Hi,r=xn,o=Vi,a=Tn,c=Bn,l=Xe.DEFAULT_ANISOTROPY,h=di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=Qn(),this.name="",this.source=new Pl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(pa).x}get height(){return this.source.getSize(pa).y}get depth(){return this.source.getSize(pa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==df)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ni:t.x=t.x-Math.floor(t.x);break;case Hi:t.x=t.x<0?0:1;break;case Ec:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ni:t.y=t.y-Math.floor(t.y);break;case Hi:t.y=t.y<0?0:1;break;case Ec:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=df;Xe.DEFAULT_ANISOTROPY=1;class Ae{constructor(t=0,e=0,i=0,s=1){Ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],x=c[9],p=c[2],m=c[6],g=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-p)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+p)<.1&&Math.abs(x+m)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,_=(d+1)/2,S=(g+1)/2,w=(h+f)/4,A=(u+p)/4,P=(x+m)/4;return M>_&&M>S?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=w/i,r=A/i):_>S?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=w/s,r=P/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=A/r,s=P/r),this.set(i,s,r,e),this}let v=Math.sqrt((m-x)*(m-x)+(u-p)*(u-p)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(m-x)/v,this.y=(u-p)/v,this.z=(f-h)/v,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zp extends qs{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ae(0,0,t,e),this.scissorTest=!1,this.viewport=new Ae(0,0,t,e);const s={width:t,height:e,depth:i.depth},r=new Xe(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:xn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Pl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Zp{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class bf extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yp extends Xe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=dn,this.minFilter=dn,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qi{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Mn):Mn.fromBufferAttribute(r,o),Mn.applyMatrix4(t.matrixWorld),this.expandByPoint(Mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Or.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Or.copy(i.boundingBox)),Or.applyMatrix4(t.matrixWorld),this.union(Or)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Mn),Mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ks),Br.subVectors(this.max,Ks),as.subVectors(t.a,Ks),cs.subVectors(t.b,Ks),ls.subVectors(t.c,Ks),ri.subVectors(cs,as),oi.subVectors(ls,cs),zi.subVectors(as,ls);let e=[0,-ri.z,ri.y,0,-oi.z,oi.y,0,-zi.z,zi.y,ri.z,0,-ri.x,oi.z,0,-oi.x,zi.z,0,-zi.x,-ri.y,ri.x,0,-oi.y,oi.x,0,-zi.y,zi.x,0];return!ma(e,as,cs,ls,Br)||(e=[1,0,0,0,1,0,0,0,1],!ma(e,as,cs,ls,Br))?!1:(kr.crossVectors(ri,oi),e=[kr.x,kr.y,kr.z],ma(e,as,cs,ls,Br))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Vn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Vn=[new L,new L,new L,new L,new L,new L,new L,new L],Mn=new L,Or=new Qi,as=new L,cs=new L,ls=new L,ri=new L,oi=new L,zi=new L,Ks=new L,Br=new L,kr=new L,Di=new L;function ma(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Di.fromArray(n,r);const a=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),c=t.dot(Di),l=e.dot(Di),h=i.dot(Di);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const $p=new Qi,js=new L,ga=new L;class Ai{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):$p.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;js.subVectors(t,this.center);const e=js.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(js,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ga.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(js.copy(t.center).add(ga)),this.expandByPoint(js.copy(t.center).sub(ga))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Wn=new L,xa=new L,Gr=new L,ai=new L,_a=new L,Hr=new L,Ma=new L;class Ef{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Wn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Wn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Wn.copy(this.origin).addScaledVector(this.direction,e),Wn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){xa.copy(t).add(e).multiplyScalar(.5),Gr.copy(e).sub(t).normalize(),ai.copy(this.origin).sub(xa);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Gr),a=ai.dot(this.direction),c=-ai.dot(Gr),l=ai.lengthSq(),h=Math.abs(1-o*o);let u,f,d,x;if(h>0)if(u=o*c-a,f=o*a-c,x=r*h,u>=0)if(f>=-x)if(f<=x){const p=1/h;u*=p,f*=p,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-x?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=x?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(xa).addScaledVector(Gr,f),d}intersectSphere(t,e){Wn.subVectors(t.center,this.origin);const i=Wn.dot(this.direction),s=Wn.dot(Wn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Wn)!==null}intersectTriangle(t,e,i,s,r){_a.subVectors(e,t),Hr.subVectors(i,t),Ma.crossVectors(_a,Hr);let o=this.direction.dot(Ma),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ai.subVectors(this.origin,t);const c=a*this.direction.dot(Hr.crossVectors(ai,Hr));if(c<0)return null;const l=a*this.direction.dot(_a.cross(ai));if(l<0||c+l>o)return null;const h=-a*ai.dot(Ma);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,i,s,r,o,a,c,l,h,u,f,d,x,p,m){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,h,u,f,d,x,p,m)}set(t,e,i,s,r,o,a,c,l,h,u,f,d,x,p,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=x,g[11]=p,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/hs.setFromMatrixColumn(t,0).length(),r=1/hs.setFromMatrixColumn(t,1).length(),o=1/hs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,x=a*h,p=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+x*l,e[5]=f-p*l,e[9]=-a*c,e[2]=p-f*l,e[6]=x+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,x=l*h,p=l*u;e[0]=f+p*a,e[4]=x*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-x,e[6]=p+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,x=l*h,p=l*u;e[0]=f-p*a,e[4]=-o*u,e[8]=x+d*a,e[1]=d+x*a,e[5]=o*h,e[9]=p-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,x=a*h,p=a*u;e[0]=c*h,e[4]=x*l-d,e[8]=f*l+p,e[1]=c*u,e[5]=p*l+f,e[9]=d*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,x=a*c,p=a*l;e[0]=c*h,e[4]=p-f*u,e[8]=x*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+x,e[10]=f-p*u}else if(t.order==="XZY"){const f=o*c,d=o*l,x=a*c,p=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+p,e[5]=o*h,e[9]=d*u-x,e[2]=x*u-d,e[6]=a*h,e[10]=p*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Kp,t,jp)}lookAt(t,e,i){const s=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),ci.crossVectors(i,sn),ci.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),ci.crossVectors(i,sn)),ci.normalize(),Vr.crossVectors(sn,ci),s[0]=ci.x,s[4]=Vr.x,s[8]=sn.x,s[1]=ci.y,s[5]=Vr.y,s[9]=sn.y,s[2]=ci.z,s[6]=Vr.z,s[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],x=i[2],p=i[6],m=i[10],g=i[14],v=i[3],M=i[7],_=i[11],S=i[15],w=s[0],A=s[4],P=s[8],y=s[12],b=s[1],D=s[5],U=s[9],B=s[13],G=s[2],Z=s[6],F=s[10],T=s[14],z=s[3],k=s[7],H=s[11],N=s[15];return r[0]=o*w+a*b+c*G+l*z,r[4]=o*A+a*D+c*Z+l*k,r[8]=o*P+a*U+c*F+l*H,r[12]=o*y+a*B+c*T+l*N,r[1]=h*w+u*b+f*G+d*z,r[5]=h*A+u*D+f*Z+d*k,r[9]=h*P+u*U+f*F+d*H,r[13]=h*y+u*B+f*T+d*N,r[2]=x*w+p*b+m*G+g*z,r[6]=x*A+p*D+m*Z+g*k,r[10]=x*P+p*U+m*F+g*H,r[14]=x*y+p*B+m*T+g*N,r[3]=v*w+M*b+_*G+S*z,r[7]=v*A+M*D+_*Z+S*k,r[11]=v*P+M*U+_*F+S*H,r[15]=v*y+M*B+_*T+S*N,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],x=t[3],p=t[7],m=t[11],g=t[15];return x*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*d-i*c*d)+p*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+i*o*d+r*a*h-i*l*h)+g*(-s*a*h-e*c*u+e*a*f+s*o*u-i*o*f+i*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],x=t[12],p=t[13],m=t[14],g=t[15],v=u*m*l-p*f*l+p*c*d-a*m*d-u*c*g+a*f*g,M=x*f*l-h*m*l-x*c*d+o*m*d+h*c*g-o*f*g,_=h*p*l-x*u*l+x*a*d-o*p*d-h*a*g+o*u*g,S=x*u*c-h*p*c-x*a*f+o*p*f+h*a*m-o*u*m,w=e*v+i*M+s*_+r*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=v*A,t[1]=(p*f*r-u*m*r-p*s*d+i*m*d+u*s*g-i*f*g)*A,t[2]=(a*m*r-p*c*r+p*s*l-i*m*l-a*s*g+i*c*g)*A,t[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*d-i*c*d)*A,t[4]=M*A,t[5]=(h*m*r-x*f*r+x*s*d-e*m*d-h*s*g+e*f*g)*A,t[6]=(x*c*r-o*m*r-x*s*l+e*m*l+o*s*g-e*c*g)*A,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*A,t[8]=_*A,t[9]=(x*u*r-h*p*r-x*i*d+e*p*d+h*i*g-e*u*g)*A,t[10]=(o*p*r-x*a*r+x*i*l-e*p*l-o*i*g+e*a*g)*A,t[11]=(h*a*r-o*u*r-h*i*l+e*u*l+o*i*d-e*a*d)*A,t[12]=S*A,t[13]=(h*p*s-x*u*s+x*i*f-e*p*f-h*i*m+e*u*m)*A,t[14]=(x*a*s-o*p*s-x*i*c+e*p*c+o*i*m-e*a*m)*A,t[15]=(o*u*s-h*a*s+h*i*c-e*u*c-o*i*f+e*a*f)*A,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,x=r*u,p=o*h,m=o*u,g=a*u,v=c*l,M=c*h,_=c*u,S=i.x,w=i.y,A=i.z;return s[0]=(1-(p+g))*S,s[1]=(d+_)*S,s[2]=(x-M)*S,s[3]=0,s[4]=(d-_)*w,s[5]=(1-(f+g))*w,s[6]=(m+v)*w,s[7]=0,s[8]=(x+M)*A,s[9]=(m-v)*A,s[10]=(1-(f+p))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=hs.set(s[0],s[1],s[2]).length();const o=hs.set(s[4],s[5],s[6]).length(),a=hs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],vn.copy(this);const l=1/r,h=1/o,u=1/a;return vn.elements[0]*=l,vn.elements[1]*=l,vn.elements[2]*=l,vn.elements[4]*=h,vn.elements[5]*=h,vn.elements[6]*=h,vn.elements[8]*=u,vn.elements[9]*=u,vn.elements[10]*=u,e.setFromRotationMatrix(vn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Un,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(i-s),f=(e+t)/(e-t),d=(i+s)/(i-s);let x,p;if(c)x=r/(o-r),p=o*r/(o-r);else if(a===Un)x=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===Co)x=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Un,c=!1){const l=this.elements,h=2/(e-t),u=2/(i-s),f=-(e+t)/(e-t),d=-(i+s)/(i-s);let x,p;if(c)x=1/(o-r),p=o/(o-r);else if(a===Un)x=-2/(o-r),p=-(o+r)/(o-r);else if(a===Co)x=-1/(o-r),p=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=x,l[14]=p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const hs=new L,vn=new ie,Kp=new L(0,0,0),jp=new L(1,1,1),ci=new L,Vr=new L,sn=new L,wh=new ie,bh=new ii;class An{constructor(t=0,e=0,i=0,s=An.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return wh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(wh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bh.setFromEuler(this),this.setFromQuaternion(bh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class Tf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Jp=0;const Eh=new L,us=new ii,Xn=new ie,Wr=new L,Js=new L,Qp=new L,tm=new ii,Th=new L(1,0,0),Ah=new L(0,1,0),Rh=new L(0,0,1),Ch={type:"added"},em={type:"removed"},fs={type:"childadded",child:null},va={type:"childremoved",child:null};class be extends qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=be.DEFAULT_UP.clone();const t=new L,e=new An,i=new ii,s=new L(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Jt}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return us.setFromAxisAngle(t,e),this.quaternion.multiply(us),this}rotateOnWorldAxis(t,e){return us.setFromAxisAngle(t,e),this.quaternion.premultiply(us),this}rotateX(t){return this.rotateOnAxis(Th,t)}rotateY(t){return this.rotateOnAxis(Ah,t)}rotateZ(t){return this.rotateOnAxis(Rh,t)}translateOnAxis(t,e){return Eh.copy(t).applyQuaternion(this.quaternion),this.position.add(Eh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Th,t)}translateY(t){return this.translateOnAxis(Ah,t)}translateZ(t){return this.translateOnAxis(Rh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Wr.copy(t):Wr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Js.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Js,Wr,this.up):Xn.lookAt(Wr,Js,this.up),this.quaternion.setFromRotationMatrix(Xn),s&&(Xn.extractRotation(s.matrixWorld),us.setFromRotationMatrix(Xn),this.quaternion.premultiply(us.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ch),fs.child=t,this.dispatchEvent(fs),fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(em),va.child=t,this.dispatchEvent(va),va.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ch),fs.child=t,this.dispatchEvent(fs),fs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,t,Qp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Js,tm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),x=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}be.DEFAULT_UP=new L(0,1,0);be.DEFAULT_MATRIX_AUTO_UPDATE=!0;be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const yn=new L,qn=new L,ya=new L,Zn=new L,ds=new L,ps=new L,Ph=new L,Sa=new L,wa=new L,ba=new L,Ea=new Ae,Ta=new Ae,Aa=new Ae;class ln{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),yn.subVectors(t,e),s.cross(yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){yn.subVectors(s,e),qn.subVectors(i,e),ya.subVectors(t,e);const o=yn.dot(yn),a=yn.dot(qn),c=yn.dot(ya),l=qn.dot(qn),h=qn.dot(ya),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,x=(o*h-a*c)*f;return r.set(1-d-x,x,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Zn.x),c.addScaledVector(o,Zn.y),c.addScaledVector(a,Zn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return Ea.setScalar(0),Ta.setScalar(0),Aa.setScalar(0),Ea.fromBufferAttribute(t,e),Ta.fromBufferAttribute(t,i),Aa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ea,r.x),o.addScaledVector(Ta,r.y),o.addScaledVector(Aa,r.z),o}static isFrontFacing(t,e,i,s){return yn.subVectors(i,e),qn.subVectors(t,e),yn.cross(qn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return yn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),yn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return ln.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;ds.subVectors(s,i),ps.subVectors(r,i),Sa.subVectors(t,i);const c=ds.dot(Sa),l=ps.dot(Sa);if(c<=0&&l<=0)return e.copy(i);wa.subVectors(t,s);const h=ds.dot(wa),u=ps.dot(wa);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(ds,o);ba.subVectors(t,r);const d=ds.dot(ba),x=ps.dot(ba);if(x>=0&&d<=x)return e.copy(r);const p=d*l-c*x;if(p<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(i).addScaledVector(ps,a);const m=h*x-d*u;if(m<=0&&u-h>=0&&d-x>=0)return Ph.subVectors(r,s),a=(u-h)/(u-h+(d-x)),e.copy(s).addScaledVector(Ph,a);const g=1/(m+p+f);return o=p*g,a=f*g,e.copy(i).addScaledVector(ds,o).addScaledVector(ps,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Af={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Xr={h:0,s:0,l:0};function Ra(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Xt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,he.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=he.workingColorSpace){return this.r=t,this.g=e,this.b=i,he.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=he.workingColorSpace){if(t=kp(t,1),e=jt(e,0,1),i=jt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Ra(o,r,t+1/3),this.g=Ra(o,r,t),this.b=Ra(o,r,t-1/3)}return he.colorSpaceToWorking(this,s),this}setStyle(t,e=Le){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){const i=Af[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=zs(t.r),this.g=zs(t.g),this.b=zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return he.workingToColorSpace(Ge.copy(this),t),Math.round(jt(Ge.r*255,0,255))*65536+Math.round(jt(Ge.g*255,0,255))*256+Math.round(jt(Ge.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=he.workingColorSpace){he.workingToColorSpace(Ge.copy(this),e);const i=Ge.r,s=Ge.g,r=Ge.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=he.workingColorSpace){return he.workingToColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=Le){he.workingToColorSpace(Ge.copy(this),t);const e=Ge.r,i=Ge.g,s=Ge.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(li),this.setHSL(li.h+t,li.s+e,li.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(li),t.getHSL(Xr);const i=ha(li.h,Xr.h,e),s=ha(li.s,Xr.s,e),r=ha(li.l,Xr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new Xt;Xt.NAMES=Af;let nm=0;class ts extends qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=Qn(),this.name="",this.type="Material",this.blending=Ps,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pc,this.blendDst=mc,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xt(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rs,this.stencilZFail=rs,this.stencilZPass=rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(i.blending=this.blending),this.side!==bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==pc&&(i.blendSrc=this.blendSrc),this.blendDst!==mc&&(i.blendDst=this.blendDst),this.blendEquation!==Bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Os&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==rs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==rs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ve extends ts{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=uf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Pe=new L,qr=new Rt;let im=0;class Oe{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:im++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=tl,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)qr.fromBufferAttribute(this,e),qr.applyMatrix3(t),this.setXY(e,qr.x,qr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix3(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=zn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=pe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=zn(e,this.array)),e}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=zn(e,this.array)),e}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=zn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=zn(e,this.array)),e}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==tl&&(t.usage=this.usage),t}}class Rf extends Oe{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Cf extends Oe{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class qt extends Oe{constructor(t,e,i){super(new Float32Array(t),e,i)}}let sm=0;const gn=new ie,Ca=new be,ms=new L,rn=new Qi,Qs=new Qi,Fe=new L;class me extends qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wf(t)?Cf:Rf)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Jt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,i){return gn.makeTranslation(t,e,i),this.applyMatrix4(gn),this}scale(t,e,i){return gn.makeScale(t,e,i),this.applyMatrix4(gn),this}lookAt(t){return Ca.lookAt(t),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ms).negate(),this.translate(ms.x,ms.y,ms.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new qt(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Fe.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(Fe),Fe.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(Fe)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ai);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const i=this.boundingSphere.center;if(rn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Qs.setFromBufferAttribute(a),this.morphTargetsRelative?(Fe.addVectors(rn.min,Qs.min),rn.expandByPoint(Fe),Fe.addVectors(rn.max,Qs.max),rn.expandByPoint(Fe)):(rn.expandByPoint(Qs.min),rn.expandByPoint(Qs.max))}rn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Fe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Fe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Fe.fromBufferAttribute(a,l),c&&(ms.fromBufferAttribute(t,l),Fe.add(ms)),s=Math.max(s,i.distanceToSquared(Fe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<i.count;P++)a[P]=new L,c[P]=new L;const l=new L,h=new L,u=new L,f=new Rt,d=new Rt,x=new Rt,p=new L,m=new L;function g(P,y,b){l.fromBufferAttribute(i,P),h.fromBufferAttribute(i,y),u.fromBufferAttribute(i,b),f.fromBufferAttribute(r,P),d.fromBufferAttribute(r,y),x.fromBufferAttribute(r,b),h.sub(l),u.sub(l),d.sub(f),x.sub(f);const D=1/(d.x*x.y-x.x*d.y);isFinite(D)&&(p.copy(h).multiplyScalar(x.y).addScaledVector(u,-d.y).multiplyScalar(D),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-x.x).multiplyScalar(D),a[P].add(p),a[y].add(p),a[b].add(p),c[P].add(m),c[y].add(m),c[b].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let P=0,y=v.length;P<y;++P){const b=v[P],D=b.start,U=b.count;for(let B=D,G=D+U;B<G;B+=3)g(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const M=new L,_=new L,S=new L,w=new L;function A(P){S.fromBufferAttribute(s,P),w.copy(S);const y=a[P];M.copy(y),M.sub(S.multiplyScalar(S.dot(y))).normalize(),_.crossVectors(w,y);const D=_.dot(c[P])<0?-1:1;o.setXYZW(P,M.x,M.y,M.z,D)}for(let P=0,y=v.length;P<y;++P){const b=v[P],D=b.start,U=b.count;for(let B=D,G=D+U;B<G;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){const x=t.getX(f+0),p=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,p),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,x),c.fromBufferAttribute(i,p),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(p,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Fe.fromBufferAttribute(t,e),Fe.normalize(),t.setXYZ(e,Fe.x,Fe.y,Fe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,x=0;for(let p=0,m=c.length;p<m;p++){a.isInterleavedBufferAttribute?d=c[p]*a.data.stride+a.offset:d=c[p]*h;for(let g=0;g<h;g++)f[x++]=l[d++]}return new Oe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new me,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zh=new ie,Ii=new Ef,Zr=new Ai,Dh=new L,Yr=new L,$r=new L,Kr=new L,Pa=new L,jr=new L,Ih=new L,Jr=new L;class ne extends be{constructor(t=new me,e=new Ve){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){jr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Pa.fromBufferAttribute(u,t),o?jr.addScaledVector(Pa,h):jr.addScaledVector(Pa.sub(e),h))}e.add(jr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(r),Ii.copy(t.ray).recast(t.near),!(Zr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Zr,Dh)===null||Ii.origin.distanceToSquared(Dh)>(t.far-t.near)**2))&&(zh.copy(r).invert(),Ii.copy(t.ray).applyMatrix4(zh),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ii)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,p=f.length;x<p;x++){const m=f[x],g=o[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,S=M;_<S;_+=3){const w=a.getX(_),A=a.getX(_+1),P=a.getX(_+2);s=Qr(this,g,t,i,l,h,u,w,A,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,d.start),p=Math.min(a.count,d.start+d.count);for(let m=x,g=p;m<g;m+=3){const v=a.getX(m),M=a.getX(m+1),_=a.getX(m+2);s=Qr(this,o,t,i,l,h,u,v,M,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,p=f.length;x<p;x++){const m=f[x],g=o[m.materialIndex],v=Math.max(m.start,d.start),M=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let _=v,S=M;_<S;_+=3){const w=_,A=_+1,P=_+2;s=Qr(this,g,t,i,l,h,u,w,A,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,d.start),p=Math.min(c.count,d.start+d.count);for(let m=x,g=p;m<g;m+=3){const v=m,M=m+1,_=m+2;s=Qr(this,o,t,i,l,h,u,v,M,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function rm(n,t,e,i,s,r,o,a){let c;if(t.side===Qe?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===bi,a),c===null)return null;Jr.copy(a),Jr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Jr);return l<e.near||l>e.far?null:{distance:l,point:Jr.clone(),object:n}}function Qr(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Yr),n.getVertexPosition(c,$r),n.getVertexPosition(l,Kr);const h=rm(n,t,e,i,Yr,$r,Kr,Ih);if(h){const u=new L;ln.getBarycoord(Ih,Yr,$r,Kr,u),s&&(h.uv=ln.getInterpolatedAttribute(s,a,c,l,u,new Rt)),r&&(h.uv1=ln.getInterpolatedAttribute(r,a,c,l,u,new Rt)),o&&(h.normal=ln.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};ln.getNormal(Yr,$r,Kr,f.normal),h.face=f,h.barycoord=u}return h}class Fn extends me{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;x("z","y","x",-1,-1,i,e,t,o,r,0),x("z","y","x",1,-1,i,e,-t,o,r,1),x("x","z","y",1,1,t,i,e,s,o,2),x("x","z","y",1,-1,t,i,-e,s,o,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function x(p,m,g,v,M,_,S,w,A,P,y){const b=_/A,D=S/P,U=_/2,B=S/2,G=w/2,Z=A+1,F=P+1;let T=0,z=0;const k=new L;for(let H=0;H<F;H++){const N=H*D-B;for(let Y=0;Y<Z;Y++){const nt=Y*b-U;k[p]=nt*v,k[m]=N*M,k[g]=G,l.push(k.x,k.y,k.z),k[p]=0,k[m]=0,k[g]=w>0?1:-1,h.push(k.x,k.y,k.z),u.push(Y/A),u.push(1-H/P),T+=1}}for(let H=0;H<P;H++)for(let N=0;N<A;N++){const Y=f+N+Z*H,nt=f+N+Z*(H+1),ht=f+(N+1)+Z*(H+1),Et=f+(N+1)+Z*H;c.push(Y,nt,Et),c.push(nt,ht,Et),z+=6}a.addGroup(d,z,y),d+=z,f+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Hs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ye(n){const t={};for(let e=0;e<n.length;e++){const i=Hs(n[e]);for(const s in i)t[s]=i[s]}return t}function om(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Pf(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:he.workingColorSpace}const am={clone:Hs,merge:Ye};var cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ei extends ts{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cm,this.fragmentShader=lm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Hs(t.uniforms),this.uniformsGroups=om(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class zf extends be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hi=new L,Lh=new Rt,Uh=new Rt;class En extends zf{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=el*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(la*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return el*2*Math.atan(Math.tan(la*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(hi.x,hi.y).multiplyScalar(-t/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(hi.x,hi.y).multiplyScalar(-t/hi.z)}getViewSize(t,e){return this.getViewBounds(t,Lh,Uh),e.subVectors(Uh,Lh)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(la*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const gs=-90,xs=1;class hm extends be{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new En(gs,xs,t,e);s.layers=this.layers,this.add(s);const r=new En(gs,xs,t,e);r.layers=this.layers,this.add(r);const o=new En(gs,xs,t,e);o.layers=this.layers,this.add(o);const a=new En(gs,xs,t,e);a.layers=this.layers,this.add(a);const c=new En(gs,xs,t,e);c.layers=this.layers,this.add(c);const l=new En(gs,xs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Un)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Co)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const p=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=p,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Df extends Xe{constructor(t=[],e=Bs,i,s,r,o,a,c,l,h){super(t,e,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class um extends Yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Df(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Fn(5,5,5),r=new Ei({name:"CubemapFromEquirect",uniforms:Hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qe,blending:gi});r.uniforms.tEquirect.value=e;const o=new ne(s,r),a=e.minFilter;return e.minFilter===Vi&&(e.minFilter=xn),new hm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}class ee extends be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fm={type:"move"};class za{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const p of t.hand.values()){const m=e.getJointPose(p,i),g=this._getHandJoint(l,p);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,x=.005;l.inputState.pinching&&f>d+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ee;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class zl{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Xt(t),this.near=e,this.far=i}clone(){return new zl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class dm extends be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class pm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=tl,this.updateRanges=[],this.version=0,this.uuid=Qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ze=new L;class zo{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.applyMatrix4(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.applyNormalMatrix(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ze.fromBufferAttribute(this,e),Ze.transformDirection(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=zn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=pe(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=zn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=zn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=zn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=zn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new zo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Dl extends ts{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Xt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let _s;const tr=new L,Ms=new L,vs=new L,ys=new Rt,er=new Rt,If=new ie,to=new L,nr=new L,eo=new L,Nh=new Rt,Da=new Rt,Fh=new Rt;class Lf extends be{constructor(t=new Dl){if(super(),this.isSprite=!0,this.type="Sprite",_s===void 0){_s=new me;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new pm(e,5);_s.setIndex([0,1,2,0,2,3]),_s.setAttribute("position",new zo(i,3,0,!1)),_s.setAttribute("uv",new zo(i,2,3,!1))}this.geometry=_s,this.material=t,this.center=new Rt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ms.setFromMatrixScale(this.matrixWorld),If.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),vs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ms.multiplyScalar(-vs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;no(to.set(-.5,-.5,0),vs,o,Ms,s,r),no(nr.set(.5,-.5,0),vs,o,Ms,s,r),no(eo.set(.5,.5,0),vs,o,Ms,s,r),Nh.set(0,0),Da.set(1,0),Fh.set(1,1);let a=t.ray.intersectTriangle(to,nr,eo,!1,tr);if(a===null&&(no(nr.set(-.5,.5,0),vs,o,Ms,s,r),Da.set(0,1),a=t.ray.intersectTriangle(to,eo,nr,!1,tr),a===null))return;const c=t.ray.origin.distanceTo(tr);c<t.near||c>t.far||e.push({distance:c,point:tr.clone(),uv:ln.getInterpolation(tr,to,nr,eo,Nh,Da,Fh,new Rt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function no(n,t,e,i,s,r){ys.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(er.x=r*ys.x-s*ys.y,er.y=s*ys.x+r*ys.y):er.copy(ys),n.copy(t),n.x+=er.x,n.y+=er.y,n.applyMatrix4(If)}class Il extends Xe{constructor(t=null,e=1,i=1,s,r,o,a,c,l=dn,h=dn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Do extends Oe{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ss=new ie,Oh=new ie,io=[],Bh=new Qi,mm=new ie,ir=new ne,sr=new Ai;class pi extends ne{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Do(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,mm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Qi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ss),Bh.copy(t.boundingBox).applyMatrix4(Ss),this.boundingBox.union(Bh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ai),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ss),sr.copy(t.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(sr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(ir.geometry=this.geometry,ir.material=this.material,ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sr.copy(this.boundingSphere),sr.applyMatrix4(i),t.ray.intersectsSphere(sr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ss),Oh.multiplyMatrices(i,Ss),ir.matrixWorld=Oh,ir.raycast(t,io);for(let o=0,a=io.length;o<a;o++){const c=io[o];c.instanceId=r,c.object=this,e.push(c)}io.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Do(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Il(new Float32Array(s*this.count),s,this.count,Tl,Ln));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ia=new L,gm=new L,xm=new Jt;class fi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ia.subVectors(i,e).cross(gm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ia),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||xm.getNormalMatrix(t),s=this.coplanarPoint(Ia).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Li=new Ai,_m=new Rt(.5,.5),so=new L;class Xo{constructor(t=new fi,e=new fi,i=new fi,s=new fi,r=new fi,o=new fi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Un,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],x=r[8],p=r[9],m=r[10],g=r[11],v=r[12],M=r[13],_=r[14],S=r[15];if(s[0].setComponents(l-o,d-h,g-x,S-v).normalize(),s[1].setComponents(l+o,d+h,g+x,S+v).normalize(),s[2].setComponents(l+a,d+u,g+p,S+M).normalize(),s[3].setComponents(l-a,d-u,g-p,S-M).normalize(),i)s[4].setComponents(c,f,m,_).normalize(),s[5].setComponents(l-c,d-f,g-m,S-_).normalize();else if(s[4].setComponents(l-c,d-f,g-m,S-_).normalize(),e===Un)s[5].setComponents(l+c,d+f,g+m,S+_).normalize();else if(e===Co)s[5].setComponents(c,f,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(t){Li.center.set(0,0,0);const e=_m.distanceTo(t.center);return Li.radius=.7071067811865476+e,Li.applyMatrix4(t.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(so.x=s.normal.x>0?t.max.x:t.min.x,so.y=s.normal.y>0?t.max.y:t.min.y,so.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(so)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Uf extends ts{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Xt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Io=new L,Lo=new L,kh=new ie,rr=new Ef,ro=new Ai,La=new L,Gh=new L;class Mm extends be{constructor(t=new me,e=new Uf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Io.fromBufferAttribute(e,s-1),Lo.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Io.distanceTo(Lo);t.setAttribute("lineDistance",new qt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ro.copy(i.boundingSphere),ro.applyMatrix4(s),ro.radius+=r,t.ray.intersectsSphere(ro)===!1)return;kh.copy(s).invert(),rr.copy(t.ray).applyMatrix4(kh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const d=Math.max(0,o.start),x=Math.min(h.count,o.start+o.count);for(let p=d,m=x-1;p<m;p+=l){const g=h.getX(p),v=h.getX(p+1),M=oo(this,t,rr,c,g,v,p);M&&e.push(M)}if(this.isLineLoop){const p=h.getX(x-1),m=h.getX(d),g=oo(this,t,rr,c,p,m,x-1);g&&e.push(g)}}else{const d=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let p=d,m=x-1;p<m;p+=l){const g=oo(this,t,rr,c,p,p+1,p);g&&e.push(g)}if(this.isLineLoop){const p=oo(this,t,rr,c,x-1,d,x-1);p&&e.push(p)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function oo(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Io.fromBufferAttribute(a,s),Lo.fromBufferAttribute(a,r),e.distanceSqToSegment(Io,Lo,La,Gh)>i)return;La.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(La);if(!(l<t.near||l>t.far))return{distance:l,point:Gh.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const Hh=new L,Vh=new L;class vm extends Mm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Hh.fromBufferAttribute(e,s),Vh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Hh.distanceTo(Vh);t.setAttribute("lineDistance",new qt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class es extends Xe{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nf extends Xe{constructor(t,e,i=Zi,s,r,o,a=dn,c=dn,l,h=vr,u=1){if(h!==vr&&h!==yr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Pl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ff extends Xe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ll extends me{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new L,h=new Rt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=i+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(a,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ll(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ns extends me{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let x=0;const p=[],m=i/2;let g=0;v(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(d,2));function v(){const _=new L,S=new L;let w=0;const A=(e-t)/i;for(let P=0;P<=r;P++){const y=[],b=P/r,D=b*(e-t)+t;for(let U=0;U<=s;U++){const B=U/s,G=B*c+a,Z=Math.sin(G),F=Math.cos(G);S.x=D*Z,S.y=-b*i+m,S.z=D*F,u.push(S.x,S.y,S.z),_.set(Z,A,F).normalize(),f.push(_.x,_.y,_.z),d.push(B,1-b),y.push(x++)}p.push(y)}for(let P=0;P<s;P++)for(let y=0;y<r;y++){const b=p[y][P],D=p[y+1][P],U=p[y+1][P+1],B=p[y][P+1];(t>0||y!==0)&&(h.push(b,D,B),w+=3),(e>0||y!==r-1)&&(h.push(D,U,B),w+=3)}l.addGroup(g,w,0),g+=w}function M(_){const S=x,w=new Rt,A=new L;let P=0;const y=_===!0?t:e,b=_===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,m*b,0),f.push(0,b,0),d.push(.5,.5),x++;const D=x;for(let U=0;U<=s;U++){const G=U/s*c+a,Z=Math.cos(G),F=Math.sin(G);A.x=y*F,A.y=m*b,A.z=y*Z,u.push(A.x,A.y,A.z),f.push(0,b,0),w.x=Z*.5+.5,w.y=F*.5*b+.5,d.push(w.x,w.y),x++}for(let U=0;U<s;U++){const B=S+U,G=D+U;_===!0?h.push(G,G+1,B):h.push(G+1,G,B),P+=3}l.addGroup(g,P,_===!0?1:2),g+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ns(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class wr extends ns{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new wr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const h=i[s],f=i[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Rt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new L,s=[],r=[],o=[],a=new L,c=new ie;for(let d=0;d<=t;d++){const x=d/t;s[d]=this.getTangentAt(x,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(jt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,x))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(jt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let x=1;x<=t;x++)r[x].applyMatrix4(c.makeRotationAxis(s[x],d*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ul extends Gn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Rt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ym extends Ul{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Nl(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const ao=new L,Ua=new Nl,Na=new Nl,Fa=new Nl;class Sm extends Gn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new L){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(ao.subVectors(s[0],s[1]).add(s[0]),l=ao);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ao.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ao),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(u),d),p=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);p<1e-4&&(p=1),x<1e-4&&(x=p),m<1e-4&&(m=p),Ua.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,x,p,m),Na.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,x,p,m),Fa.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,x,p,m)}else this.curveType==="catmullrom"&&(Ua.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Na.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Fa.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(Ua.calc(c),Na.calc(c),Fa.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Wh(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function wm(n,t){const e=1-n;return e*e*t}function bm(n,t){return 2*(1-n)*n*t}function Em(n,t){return n*n*t}function dr(n,t,e,i){return wm(n,t)+bm(n,e)+Em(n,i)}function Tm(n,t){const e=1-n;return e*e*e*t}function Am(n,t){const e=1-n;return 3*e*e*n*t}function Rm(n,t){return 3*(1-n)*n*n*t}function Cm(n,t){return n*n*n*t}function pr(n,t,e,i,s){return Tm(n,t)+Am(n,e)+Rm(n,i)+Cm(n,s)}class Of extends Gn{constructor(t=new Rt,e=new Rt,i=new Rt,s=new Rt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Rt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(pr(t,s.x,r.x,o.x,a.x),pr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Pm extends Gn{constructor(t=new L,e=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new L){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(pr(t,s.x,r.x,o.x,a.x),pr(t,s.y,r.y,o.y,a.y),pr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Bf extends Gn{constructor(t=new Rt,e=new Rt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Rt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Rt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zm extends Gn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kf extends Gn{constructor(t=new Rt,e=new Rt,i=new Rt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Rt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(dr(t,s.x,r.x,o.x),dr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dm extends Gn{constructor(t=new L,e=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new L){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(dr(t,s.x,r.x,o.x),dr(t,s.y,r.y,o.y),dr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gf extends Gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Rt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Wh(a,c.x,l.x,h.x,u.x),Wh(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Rt().fromArray(s))}return this}}var Xh=Object.freeze({__proto__:null,ArcCurve:ym,CatmullRomCurve3:Sm,CubicBezierCurve:Of,CubicBezierCurve3:Pm,EllipseCurve:Ul,LineCurve:Bf,LineCurve3:zm,QuadraticBezierCurve:kf,QuadraticBezierCurve3:Dm,SplineCurve:Gf});class Im extends Gn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xh[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Xh[s.type]().fromJSON(s))}return this}}class qh extends Im{constructor(t){super(),this.type="Path",this.currentPoint=new Rt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Bf(this.currentPoint.clone(),new Rt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new kf(this.currentPoint.clone(),new Rt(t,e),new Rt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new Of(this.currentPoint.clone(),new Rt(t,e),new Rt(i,s),new Rt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Gf(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new Ul(t,e,i,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class nl extends qh{constructor(t){super(t),this.uuid=Qn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new qh().fromJSON(s))}return this}}function Lm(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=Hf(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(i&&(r=Bm(n,t,r,e)),n.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){const d=n[f],x=n[f+1];d<a&&(a=d),x<c&&(c=x),d>h&&(h=d),x>u&&(u=x)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return br(r,o,e,a,c,l,0),o}function Hf(n,t,e,i,s){let r;if(s===Km(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=Zh(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=Zh(o/i|0,n[o],n[o+1],r);return r&&Vs(r,r.next)&&(Tr(r),r=r.next),r}function $i(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Vs(e,e.next)||we(e.prev,e,e.next)===0)){if(Tr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function br(n,t,e,i,s,r,o){if(!n)return;!o&&r&&Wm(n,i,s,r);let a=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?Nm(n,i,s,r):Um(n)){t.push(c.i,n.i,l.i),Tr(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=Fm($i(n),t),br(n,t,e,i,s,r,2)):o===2&&Om(n,t,e,i,s,r):br($i(n),t,e,i,s,r,1);break}}}function Um(n){const t=n.prev,e=n,i=n.next;if(we(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l);let x=i.next;for(;x!==t;){if(x.x>=h&&x.x<=f&&x.y>=u&&x.y<=d&&cr(s,a,r,c,o,l,x.x,x.y)&&we(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function Nm(n,t,e,i){const s=n.prev,r=n,o=n.next;if(we(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),x=Math.min(h,u,f),p=Math.max(a,c,l),m=Math.max(h,u,f),g=il(d,x,t,e,i),v=il(p,m,t,e,i);let M=n.prevZ,_=n.nextZ;for(;M&&M.z>=g&&_&&_.z<=v;){if(M.x>=d&&M.x<=p&&M.y>=x&&M.y<=m&&M!==s&&M!==o&&cr(a,h,c,u,l,f,M.x,M.y)&&we(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=d&&_.x<=p&&_.y>=x&&_.y<=m&&_!==s&&_!==o&&cr(a,h,c,u,l,f,_.x,_.y)&&we(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=g;){if(M.x>=d&&M.x<=p&&M.y>=x&&M.y<=m&&M!==s&&M!==o&&cr(a,h,c,u,l,f,M.x,M.y)&&we(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=p&&_.y>=x&&_.y<=m&&_!==s&&_!==o&&cr(a,h,c,u,l,f,_.x,_.y)&&we(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Fm(n,t){let e=n;do{const i=e.prev,s=e.next.next;!Vs(i,s)&&Wf(i,e,e.next,s)&&Er(i,s)&&Er(s,i)&&(t.push(i.i,e.i,s.i),Tr(e),Tr(e.next),e=n=s),e=e.next}while(e!==n);return $i(e)}function Om(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zm(o,a)){let c=Xf(o,a);o=$i(o,o.next),c=$i(c,c.next),br(o,t,e,i,s,r,0),br(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function Bm(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=Hf(n,a,c,i,!1);l===l.next&&(l.steiner=!0),s.push(qm(l))}s.sort(km);for(let r=0;r<s.length;r++)e=Gm(s[r],e);return e}function km(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function Gm(n,t){const e=Hm(n,t);if(!e)return t;const i=Xf(e,n);return $i(i,i.next),$i(e,e.next)}function Hm(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(Vs(n,e))return e;do{if(Vs(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=i&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(i>=e.x&&e.x>=c&&i!==e.x&&Vf(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){const u=Math.abs(s-e.y)/(i-e.x);Er(e,n)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&Vm(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function Vm(n,t){return we(n.prev,n,t.prev)<0&&we(t.next,n,n.next)<0}function Wm(n,t,e,i){let s=n;do s.z===0&&(s.z=il(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Xm(s)}function Xm(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function il(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function qm(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Vf(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function cr(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&Vf(n,t,e,i,s,r,o,a)}function Zm(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Ym(n,t)&&(Er(n,t)&&Er(t,n)&&$m(n,t)&&(we(n.prev,n,t.prev)||we(n,t.prev,t))||Vs(n,t)&&we(n.prev,n,n.next)>0&&we(t.prev,t,t.next)>0)}function we(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Vs(n,t){return n.x===t.x&&n.y===t.y}function Wf(n,t,e,i){const s=lo(we(n,t,e)),r=lo(we(n,t,i)),o=lo(we(e,i,n)),a=lo(we(e,i,t));return!!(s!==r&&o!==a||s===0&&co(n,e,t)||r===0&&co(n,i,t)||o===0&&co(e,n,i)||a===0&&co(e,t,i))}function co(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function lo(n){return n>0?1:n<0?-1:0}function Ym(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Wf(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Er(n,t){return we(n.prev,n,n.next)<0?we(n,t,n.next)>=0&&we(n,n.prev,t)>=0:we(n,t,n.prev)<0||we(n,n.next,t)<0}function $m(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Xf(n,t){const e=sl(n.i,n.x,n.y),i=sl(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Zh(n,t,e,i){const s=sl(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Tr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function sl(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Km(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class jm{static triangulate(t,e,i=2){return Lm(t,e,i)}}class mr{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return mr.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Yh(t),$h(i,t);let o=t.length;e.forEach(Yh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,$h(i,e[c]);const a=jm.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Yh(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function $h(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class Pr extends me{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],x=[],p=[],m=[];for(let g=0;g<h;g++){const v=g*f-o;for(let M=0;M<l;M++){const _=M*u-r;x.push(_,-v,0),p.push(0,0,1),m.push(M/a),m.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<a;v++){const M=v+l*g,_=v+l*(g+1),S=v+1+l*(g+1),w=v+1+l*g;d.push(M,_,w),d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new qt(x,3)),this.setAttribute("normal",new qt(p,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pr(t.width,t.height,t.widthSegments,t.heightSegments)}}class Fl extends me{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,d=new L,x=new Rt;for(let p=0;p<=s;p++){for(let m=0;m<=i;m++){const g=r+m/i*o;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),l.push(0,0,1),x.x=(d.x/e+1)/2,x.y=(d.y/e+1)/2,h.push(x.x,x.y)}u+=f}for(let p=0;p<s;p++){const m=p*(i+1);for(let g=0;g<i;g++){const v=g+m,M=v,_=v+i+1,S=v+i+2,w=v+1;a.push(M,_,w),a.push(_,S,w)}}this.setIndex(a),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Uo extends me{constructor(t=new nl([new Rt(0,.5),new Rt(-.5,-.5),new Rt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(r,3)),this.setAttribute("uv",new qt(o,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const x=f.holes;mr.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,g=x.length;m<g;m++){const v=x[m];mr.isClockWise(v)===!0&&(x[m]=v.reverse())}const p=mr.triangulateShape(d,x);for(let m=0,g=x.length;m<g;m++){const v=x[m];d=d.concat(v)}for(let m=0,g=d.length;m<g;m++){const v=d[m];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let m=0,g=p.length;m<g;m++){const v=p[m],M=v[0]+u,_=v[1]+u,S=v[2]+u;i.push(M,_,S),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Jm(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new Uo(i,t.curveSegments)}}function Jm(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Ti extends me{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new L,f=new L,d=[],x=[],p=[],m=[];for(let g=0;g<=i;g++){const v=[],M=g/i;let _=0;g===0&&o===0?_=.5/e:g===i&&c===Math.PI&&(_=-.5/e);for(let S=0;S<=e;S++){const w=S/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+M*a),x.push(u.x,u.y,u.z),f.copy(u).normalize(),p.push(f.x,f.y,f.z),m.push(w+_,1-M),v.push(l++)}h.push(v)}for(let g=0;g<i;g++)for(let v=0;v<e;v++){const M=h[g][v+1],_=h[g][v],S=h[g+1][v],w=h[g+1][v+1];(g!==0||o>0)&&d.push(M,_,w),(g!==i-1||c<Math.PI)&&d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new qt(x,3)),this.setAttribute("normal",new qt(p,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ti(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class qo extends me{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new L,u=new L,f=new L;for(let d=0;d<=i;d++)for(let x=0;x<=s;x++){const p=x/s*r,m=d/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(p),u.y=(t+e*Math.cos(m))*Math.sin(p),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(p),h.y=t*Math.sin(p),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(x/s),l.push(d/i)}for(let d=1;d<=i;d++)for(let x=1;x<=s;x++){const p=(s+1)*d+x-1,m=(s+1)*(d-1)+x-1,g=(s+1)*(d-1)+x,v=(s+1)*d+x;o.push(p,m,v),o.push(m,g,v)}this.setIndex(o),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ce extends ts{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Xt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yf,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Qm extends ts{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class tg extends ts{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class qf extends be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Xt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class eg extends qf{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Xt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Oa=new ie,Kh=new L,jh=new L;class ng{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.mapType=Bn,this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Xo,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new Ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Kh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kh),jh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(jh),e.updateMatrixWorld(),Oa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Oa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Zo extends zf{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class ig extends ng{constructor(){super(new Zo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sg extends qf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(be.DEFAULT_UP),this.updateMatrix(),this.target=new be,this.shadow=new ig}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rg extends En{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Jh=new L,ho=new L,ws=new L,bs=new L,Ba=new L,og=new L,ag=new L;class cg{constructor(t=new L,e=new L){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Jh.subVectors(t,this.start),ho.subVectors(this.end,this.start);const i=ho.dot(ho);let r=ho.dot(Jh)/i;return e&&(r=jt(r,0,1)),r}closestPointToPoint(t,e,i){const s=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=og,i=ag){const s=10000000000000001e-32;let r,o;const a=this.start,c=t.start,l=this.end,h=t.end;ws.subVectors(l,a),bs.subVectors(h,c),Ba.subVectors(a,c);const u=ws.dot(ws),f=bs.dot(bs),d=bs.dot(Ba);if(u<=s&&f<=s)return e.copy(a),i.copy(c),e.sub(i),e.dot(e);if(u<=s)r=0,o=d/f,o=jt(o,0,1);else{const x=ws.dot(Ba);if(f<=s)o=0,r=jt(-x/u,0,1);else{const p=ws.dot(bs),m=u*f-p*p;m!==0?r=jt((p*d-x*f)/m,0,1):r=0,o=(p*r+d)/f,o<0?(o=0,r=jt(-x/u,0,1)):o>1&&(o=1,r=jt((p-x)/u,0,1))}}return e.copy(a).add(ws.multiplyScalar(r)),i.copy(c).add(bs.multiplyScalar(o)),e.sub(i),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Qh(n,t,e,i){const s=lg(i);switch(e){case _f:return n*t;case Tl:return n*t/s.components*s.byteLength;case Al:return n*t/s.components*s.byteLength;case vf:return n*t*2/s.components*s.byteLength;case Rl:return n*t*2/s.components*s.byteLength;case Mf:return n*t*3/s.components*s.byteLength;case Tn:return n*t*4/s.components*s.byteLength;case Cl:return n*t*4/s.components*s.byteLength;case yo:case So:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case wo:case bo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ac:case Cc:return Math.max(n,16)*Math.max(t,8)/4;case Tc:case Rc:return Math.max(n,8)*Math.max(t,8)/2;case Pc:case zc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Dc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ic:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Lc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Uc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Nc:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Fc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Oc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Bc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case kc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Gc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Hc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Vc:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Xc:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case qc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Zc:case Yc:case $c:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Kc:case jc:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Jc:case Qc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function lg(n){switch(n){case Bn:case pf:return{byteLength:1,components:1};case _r:case mf:case Cr:return{byteLength:2,components:1};case bl:case El:return{byteLength:2,components:4};case Zi:case wl:case Ln:return{byteLength:4,components:1};case gf:case xf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Zf(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function hg(n){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((d,x)=>d.start-x.start);let f=0;for(let d=1;d<u.length;d++){const x=u[f],p=u[d];p.start<=x.start+x.count+1?x.count=Math.max(x.count,p.start+p.count-x.start):(++f,u[f]=p)}u.length=f+1;for(let d=0,x=u.length;d<x;d++){const p=u[d];n.bufferSubData(l,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var ug=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_g=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Eg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,zg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ig=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Lg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ug=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ng=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Wg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$g=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,t0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,e0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,n0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,i0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,s0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,r0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,o0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,c0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,l0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,h0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,u0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,f0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,d0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,g0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,x0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,v0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,S0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,b0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,E0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,T0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,A0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,C0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,P0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,I0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,L0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,U0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,N0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,F0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,O0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,B0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,k0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,G0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,H0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,V0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,W0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,X0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,q0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Z0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,K0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,j0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,J0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,tx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ex=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ix=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,sx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,rx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ux=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,xx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_x=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ex=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ax=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Cx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Px=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Dx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ix=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ux=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ox=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Bx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,te={alphahash_fragment:ug,alphahash_pars_fragment:fg,alphamap_fragment:dg,alphamap_pars_fragment:pg,alphatest_fragment:mg,alphatest_pars_fragment:gg,aomap_fragment:xg,aomap_pars_fragment:_g,batching_pars_vertex:Mg,batching_vertex:vg,begin_vertex:yg,beginnormal_vertex:Sg,bsdfs:wg,iridescence_fragment:bg,bumpmap_pars_fragment:Eg,clipping_planes_fragment:Tg,clipping_planes_pars_fragment:Ag,clipping_planes_pars_vertex:Rg,clipping_planes_vertex:Cg,color_fragment:Pg,color_pars_fragment:zg,color_pars_vertex:Dg,color_vertex:Ig,common:Lg,cube_uv_reflection_fragment:Ug,defaultnormal_vertex:Ng,displacementmap_pars_vertex:Fg,displacementmap_vertex:Og,emissivemap_fragment:Bg,emissivemap_pars_fragment:kg,colorspace_fragment:Gg,colorspace_pars_fragment:Hg,envmap_fragment:Vg,envmap_common_pars_fragment:Wg,envmap_pars_fragment:Xg,envmap_pars_vertex:qg,envmap_physical_pars_fragment:i0,envmap_vertex:Zg,fog_vertex:Yg,fog_pars_vertex:$g,fog_fragment:Kg,fog_pars_fragment:jg,gradientmap_pars_fragment:Jg,lightmap_pars_fragment:Qg,lights_lambert_fragment:t0,lights_lambert_pars_fragment:e0,lights_pars_begin:n0,lights_toon_fragment:s0,lights_toon_pars_fragment:r0,lights_phong_fragment:o0,lights_phong_pars_fragment:a0,lights_physical_fragment:c0,lights_physical_pars_fragment:l0,lights_fragment_begin:h0,lights_fragment_maps:u0,lights_fragment_end:f0,logdepthbuf_fragment:d0,logdepthbuf_pars_fragment:p0,logdepthbuf_pars_vertex:m0,logdepthbuf_vertex:g0,map_fragment:x0,map_pars_fragment:_0,map_particle_fragment:M0,map_particle_pars_fragment:v0,metalnessmap_fragment:y0,metalnessmap_pars_fragment:S0,morphinstance_vertex:w0,morphcolor_vertex:b0,morphnormal_vertex:E0,morphtarget_pars_vertex:T0,morphtarget_vertex:A0,normal_fragment_begin:R0,normal_fragment_maps:C0,normal_pars_fragment:P0,normal_pars_vertex:z0,normal_vertex:D0,normalmap_pars_fragment:I0,clearcoat_normal_fragment_begin:L0,clearcoat_normal_fragment_maps:U0,clearcoat_pars_fragment:N0,iridescence_pars_fragment:F0,opaque_fragment:O0,packing:B0,premultiplied_alpha_fragment:k0,project_vertex:G0,dithering_fragment:H0,dithering_pars_fragment:V0,roughnessmap_fragment:W0,roughnessmap_pars_fragment:X0,shadowmap_pars_fragment:q0,shadowmap_pars_vertex:Z0,shadowmap_vertex:Y0,shadowmask_pars_fragment:$0,skinbase_vertex:K0,skinning_pars_vertex:j0,skinning_vertex:J0,skinnormal_vertex:Q0,specularmap_fragment:tx,specularmap_pars_fragment:ex,tonemapping_fragment:nx,tonemapping_pars_fragment:ix,transmission_fragment:sx,transmission_pars_fragment:rx,uv_pars_fragment:ox,uv_pars_vertex:ax,uv_vertex:cx,worldpos_vertex:lx,background_vert:hx,background_frag:ux,backgroundCube_vert:fx,backgroundCube_frag:dx,cube_vert:px,cube_frag:mx,depth_vert:gx,depth_frag:xx,distanceRGBA_vert:_x,distanceRGBA_frag:Mx,equirect_vert:vx,equirect_frag:yx,linedashed_vert:Sx,linedashed_frag:wx,meshbasic_vert:bx,meshbasic_frag:Ex,meshlambert_vert:Tx,meshlambert_frag:Ax,meshmatcap_vert:Rx,meshmatcap_frag:Cx,meshnormal_vert:Px,meshnormal_frag:zx,meshphong_vert:Dx,meshphong_frag:Ix,meshphysical_vert:Lx,meshphysical_frag:Ux,meshtoon_vert:Nx,meshtoon_frag:Fx,points_vert:Ox,points_frag:Bx,shadow_vert:kx,shadow_frag:Gx,sprite_vert:Hx,sprite_frag:Vx},St={common:{diffuse:{value:new Xt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Xt(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Cn={basic:{uniforms:Ye([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:Ye([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Xt(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:Ye([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Xt(0)},specular:{value:new Xt(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:Ye([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new Xt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:Ye([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new Xt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:Ye([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:Ye([St.points,St.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:Ye([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:Ye([St.common,St.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:Ye([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:Ye([St.sprite,St.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:Ye([St.common,St.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:Ye([St.lights,St.fog,{color:{value:new Xt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Cn.physical={uniforms:Ye([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Xt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Xt(0)},specularColor:{value:new Xt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const uo={r:0,b:0,g:0},Ui=new An,Wx=new ie;function Xx(n,t,e,i,s,r,o){const a=new Xt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function x(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?e:t).get(_)),_}function p(M){let _=!1;const S=x(M);S===null?g(a,c):S&&S.isColor&&(g(S,1),_=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,_){const S=x(_);S&&(S.isCubeTexture||S.mapping===Wo)?(h===void 0&&(h=new ne(new Fn(1,1,1),new Ei({name:"BackgroundCubeMaterial",uniforms:Hs(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ui.copy(_.backgroundRotation),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Wx.makeRotationFromEuler(Ui)),h.material.toneMapped=he.getTransfer(S.colorSpace)!==de,(u!==S||f!==S.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ne(new Pr(2,2),new Ei({name:"BackgroundMaterial",uniforms:Hs(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=he.getTransfer(S.colorSpace)!==de,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,_){M.getRGB(uo,Pf(n)),i.buffers.color.setClear(uo.r,uo.g,uo.b,_,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),c=_,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,g(a,c)},render:p,addToRenderList:m,dispose:v}}function qx(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(b,D,U,B,G){let Z=!1;const F=u(B,U,D);r!==F&&(r=F,l(r.object)),Z=d(b,B,U,G),Z&&x(b,B,U,G),G!==null&&t.update(G,n.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,_(b,D,U,B),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function c(){return n.createVertexArray()}function l(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function u(b,D,U){const B=U.wireframe===!0;let G=i[b.id];G===void 0&&(G={},i[b.id]=G);let Z=G[D.id];Z===void 0&&(Z={},G[D.id]=Z);let F=Z[B];return F===void 0&&(F=f(c()),Z[B]=F),F}function f(b){const D=[],U=[],B=[];for(let G=0;G<e;G++)D[G]=0,U[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:B,object:b,attributes:{},index:null}}function d(b,D,U,B){const G=r.attributes,Z=D.attributes;let F=0;const T=U.getAttributes();for(const z in T)if(T[z].location>=0){const H=G[z];let N=Z[z];if(N===void 0&&(z==="instanceMatrix"&&b.instanceMatrix&&(N=b.instanceMatrix),z==="instanceColor"&&b.instanceColor&&(N=b.instanceColor)),H===void 0||H.attribute!==N||N&&H.data!==N.data)return!0;F++}return r.attributesNum!==F||r.index!==B}function x(b,D,U,B){const G={},Z=D.attributes;let F=0;const T=U.getAttributes();for(const z in T)if(T[z].location>=0){let H=Z[z];H===void 0&&(z==="instanceMatrix"&&b.instanceMatrix&&(H=b.instanceMatrix),z==="instanceColor"&&b.instanceColor&&(H=b.instanceColor));const N={};N.attribute=H,H&&H.data&&(N.data=H.data),G[z]=N,F++}r.attributes=G,r.attributesNum=F,r.index=B}function p(){const b=r.newAttributes;for(let D=0,U=b.length;D<U;D++)b[D]=0}function m(b){g(b,0)}function g(b,D){const U=r.newAttributes,B=r.enabledAttributes,G=r.attributeDivisors;U[b]=1,B[b]===0&&(n.enableVertexAttribArray(b),B[b]=1),G[b]!==D&&(n.vertexAttribDivisor(b,D),G[b]=D)}function v(){const b=r.newAttributes,D=r.enabledAttributes;for(let U=0,B=D.length;U<B;U++)D[U]!==b[U]&&(n.disableVertexAttribArray(U),D[U]=0)}function M(b,D,U,B,G,Z,F){F===!0?n.vertexAttribIPointer(b,D,U,G,Z):n.vertexAttribPointer(b,D,U,B,G,Z)}function _(b,D,U,B){p();const G=B.attributes,Z=U.getAttributes(),F=D.defaultAttributeValues;for(const T in Z){const z=Z[T];if(z.location>=0){let k=G[T];if(k===void 0&&(T==="instanceMatrix"&&b.instanceMatrix&&(k=b.instanceMatrix),T==="instanceColor"&&b.instanceColor&&(k=b.instanceColor)),k!==void 0){const H=k.normalized,N=k.itemSize,Y=t.get(k);if(Y===void 0)continue;const nt=Y.buffer,ht=Y.type,Et=Y.bytesPerElement,q=ht===n.INT||ht===n.UNSIGNED_INT||k.gpuType===wl;if(k.isInterleavedBufferAttribute){const $=k.data,ct=$.stride,vt=k.offset;if($.isInstancedInterleavedBuffer){for(let dt=0;dt<z.locationSize;dt++)g(z.location+dt,$.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let dt=0;dt<z.locationSize;dt++)m(z.location+dt);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let dt=0;dt<z.locationSize;dt++)M(z.location+dt,N/z.locationSize,ht,H,ct*Et,(vt+N/z.locationSize*dt)*Et,q)}else{if(k.isInstancedBufferAttribute){for(let $=0;$<z.locationSize;$++)g(z.location+$,k.meshPerAttribute);b.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let $=0;$<z.locationSize;$++)m(z.location+$);n.bindBuffer(n.ARRAY_BUFFER,nt);for(let $=0;$<z.locationSize;$++)M(z.location+$,N/z.locationSize,ht,H,N*Et,N/z.locationSize*$*Et,q)}}else if(F!==void 0){const H=F[T];if(H!==void 0)switch(H.length){case 2:n.vertexAttrib2fv(z.location,H);break;case 3:n.vertexAttrib3fv(z.location,H);break;case 4:n.vertexAttrib4fv(z.location,H);break;default:n.vertexAttrib1fv(z.location,H)}}}}v()}function S(){P();for(const b in i){const D=i[b];for(const U in D){const B=D[U];for(const G in B)h(B[G].object),delete B[G];delete D[U]}delete i[b]}}function w(b){if(i[b.id]===void 0)return;const D=i[b.id];for(const U in D){const B=D[U];for(const G in B)h(B[G].object),delete B[G];delete D[U]}delete i[b.id]}function A(b){for(const D in i){const U=i[D];if(U[b.id]===void 0)continue;const B=U[b.id];for(const G in B)h(B[G].object),delete B[G];delete U[b.id]}}function P(){y(),o=!0,r!==s&&(r=s,l(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:y,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:p,enableAttribute:m,disableUnusedAttributes:v}}function Zx(n,t,e){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let d=0;for(let x=0;x<u;x++)d+=h[x];e.update(d,i,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let x=0;x<l.length;x++)o(l[x],h[x],f[x]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let x=0;for(let p=0;p<u;p++)x+=h[p]*f[p];e.update(x,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Yx(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==Tn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===Cr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Bn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Ln&&!P)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=x>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:x,maxTextureSize:p,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:S,maxSamples:w}}function $x(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new fi,a=new Jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const x=u.clippingPlanes,p=u.clipIntersection,m=u.clipShadows,g=n.get(u);if(!s||x===null||x.length===0||r&&!m)r?h(null):l();else{const v=r?0:i,M=v*4;let _=g.clippingState||null;c.value=_,_=h(x,f,M,d);for(let S=0;S!==M;++S)_[S]=e[S];g.clippingState=_,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,x){const p=u!==null?u.length:0;let m=null;if(p!==0){if(m=c.value,x!==!0||m===null){const g=d+p*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,_=d;M!==p;++M,_+=4)o.copy(u[M]).applyMatrix4(v,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=p,t.numIntersection=0,m}}function Kx(n){let t=new WeakMap;function e(o,a){return a===wc?o.mapping=Bs:a===bc&&(o.mapping=ks),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===wc||a===bc)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new um(c.height);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const As=4,tu=[.125,.215,.35,.446,.526,.582],ki=20,ka=new Zo,eu=new Xt;let Ga=null,Ha=0,Va=0,Wa=!1;const Fi=(1+Math.sqrt(5))/2,Es=1/Fi,nu=[new L(-Fi,Es,0),new L(Fi,Es,0),new L(-Es,0,Fi),new L(Es,0,Fi),new L(0,Fi,-Es),new L(0,Fi,Es),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],jx=new L;class iu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=jx}=r;Ga=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Va=this._renderer.getActiveMipmapLevel(),Wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ou(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ru(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ga,Ha,Va),this._renderer.xr.enabled=Wa,t.scissorTest=!1,fo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Bs||t.mapping===ks?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ga=this._renderer.getRenderTarget(),Ha=this._renderer.getActiveCubeFace(),Va=this._renderer.getActiveMipmapLevel(),Wa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Cr,format:Tn,colorSpace:Gs,depthBuffer:!1},s=su(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=su(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Jx(r)),this._blurMaterial=Qx(r,t,e)}return s}_compileMaterial(t){const e=new ne(this._lodPlanes[0],t);this._renderer.compile(e,ka)}_sceneToCubeUV(t,e,i,s,r){const c=new En(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(eu),u.toneMapping=xi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const p=new Ve({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1}),m=new ne(new Fn,p);let g=!1;const v=t.background;v?v.isColor&&(p.color.copy(v),t.background=null,g=!0):(p.color.copy(eu),g=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[M],r.y,r.z)):_===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[M]));const S=this._cubeSize;fo(s,_*S,M>2?S:0,S,S),u.setRenderTarget(s),g&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Bs||t.mapping===ks;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ou()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ru());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;fo(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,ka)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=nu[(s-r-1)%nu.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ne(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*ki-1),p=r/x,m=isFinite(r)?1+Math.floor(h*p):ki;m>ki&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ki}`);const g=[];let v=0;for(let A=0;A<ki;++A){const P=A/p,y=Math.exp(-P*P/2);g.push(y),A===0?v+=y:A<m&&(v+=2*y)}for(let A=0;A<g.length;A++)g[A]=g[A]/v;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=g,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=x,f.mipInt.value=M-i;const _=this._sizeLods[s],S=3*_*(s>M-As?s-M+As:0),w=4*(this._cubeSize-_);fo(e,S,w,3*_,2*_),c.setRenderTarget(e),c.render(u,ka)}}function Jx(n){const t=[],e=[],i=[];let s=n;const r=n-As+1+tu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>n-As?c=tu[o-n+As-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,x=6,p=3,m=2,g=1,v=new Float32Array(p*x*d),M=new Float32Array(m*x*d),_=new Float32Array(g*x*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,P=w>2?0:-1,y=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];v.set(y,p*x*w),M.set(f,m*x*w);const b=[w,w,w,w,w,w];_.set(b,g*x*w)}const S=new me;S.setAttribute("position",new Oe(v,p)),S.setAttribute("uv",new Oe(M,m)),S.setAttribute("faceIndex",new Oe(_,g)),t.push(S),s>As&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function su(n,t,e){const i=new Yi(n,t,e);return i.texture.mapping=Wo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fo(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Qx(n,t,e){const i=new Float32Array(ki),s=new L(0,1,0);return new Ei({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function ru(){return new Ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function ou(){return new Ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ol(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function t_(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===wc||c===bc,h=c===Bs||c===ks;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new iu(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new iu(n)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function e_(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Sr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function n_(n,t,e,i){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const x in f.attributes)t.remove(f.attributes[x]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,x=u.attributes.position;let p=0;if(d!==null){const v=d.array;p=d.version;for(let M=0,_=v.length;M<_;M+=3){const S=v[M+0],w=v[M+1],A=v[M+2];f.push(S,w,w,A,A,S)}}else if(x!==void 0){const v=x.array;p=x.version;for(let M=0,_=v.length/3-1;M<_;M+=3){const S=M+0,w=M+1,A=M+2;f.push(S,w,w,A,A,S)}}else return;const m=new(wf(f)?Cf:Rf)(f,1);m.version=p;const g=r.get(u);g&&t.remove(g),r.set(u,m)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function i_(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,x){x!==0&&(n.drawElementsInstanced(i,d,r,f*o,x),e.update(d,i,x))}function h(f,d,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,x);let m=0;for(let g=0;g<x;g++)m+=d[g];e.update(m,i,1)}function u(f,d,x,p){if(x===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f.length;g++)l(f[g]/o,d[g],p[g]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,p,0,x);let g=0;for(let v=0;v<x;v++)g+=d[v]*p[v];e.update(g,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function s_(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function r_(n,t,e){const i=new WeakMap,s=new Ae;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let y=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),x===!0&&(M=2),p===!0&&(M=3);let _=a.attributes.position.count*M,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const w=new Float32Array(_*S*4*u),A=new bf(w,_,S,u);A.type=Ln,A.needsUpdate=!0;const P=M*4;for(let b=0;b<u;b++){const D=m[b],U=g[b],B=v[b],G=_*S*4*b;for(let Z=0;Z<D.count;Z++){const F=Z*P;d===!0&&(s.fromBufferAttribute(D,Z),w[G+F+0]=s.x,w[G+F+1]=s.y,w[G+F+2]=s.z,w[G+F+3]=0),x===!0&&(s.fromBufferAttribute(U,Z),w[G+F+4]=s.x,w[G+F+5]=s.y,w[G+F+6]=s.z,w[G+F+7]=0),p===!0&&(s.fromBufferAttribute(B,Z),w[G+F+8]=s.x,w[G+F+9]=s.y,w[G+F+10]=s.z,w[G+F+11]=B.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Rt(_,S)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let p=0;p<l.length;p++)d+=l[p];const x=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function o_(n,t,e,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const Yf=new Xe,au=new Nf(1,1),$f=new bf,Kf=new Yp,jf=new Df,cu=[],lu=[],hu=new Float32Array(16),uu=new Float32Array(9),fu=new Float32Array(4);function Zs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=cu[s];if(r===void 0&&(r=new Float32Array(s),cu[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ue(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ne(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Yo(n,t){let e=lu[t];e===void 0&&(e=new Int32Array(t),lu[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function a_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function c_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2fv(this.addr,t),Ne(e,t)}}function l_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;n.uniform3fv(this.addr,t),Ne(e,t)}}function h_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4fv(this.addr,t),Ne(e,t)}}function u_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;fu.set(i),n.uniformMatrix2fv(this.addr,!1,fu),Ne(e,i)}}function f_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;uu.set(i),n.uniformMatrix3fv(this.addr,!1,uu),Ne(e,i)}}function d_(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ue(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ne(e,t)}else{if(Ue(e,i))return;hu.set(i),n.uniformMatrix4fv(this.addr,!1,hu),Ne(e,i)}}function p_(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function m_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2iv(this.addr,t),Ne(e,t)}}function g_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3iv(this.addr,t),Ne(e,t)}}function x_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4iv(this.addr,t),Ne(e,t)}}function __(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function M_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;n.uniform2uiv(this.addr,t),Ne(e,t)}}function v_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;n.uniform3uiv(this.addr,t),Ne(e,t)}}function y_(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;n.uniform4uiv(this.addr,t),Ne(e,t)}}function S_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(au.compareFunction=Sf,r=au):r=Yf,e.setTexture2D(t||r,s)}function w_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Kf,s)}function b_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||jf,s)}function E_(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||$f,s)}function T_(n){switch(n){case 5126:return a_;case 35664:return c_;case 35665:return l_;case 35666:return h_;case 35674:return u_;case 35675:return f_;case 35676:return d_;case 5124:case 35670:return p_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return x_;case 5125:return __;case 36294:return M_;case 36295:return v_;case 36296:return y_;case 35678:case 36198:case 36298:case 36306:case 35682:return S_;case 35679:case 36299:case 36307:return w_;case 35680:case 36300:case 36308:case 36293:return b_;case 36289:case 36303:case 36311:case 36292:return E_}}function A_(n,t){n.uniform1fv(this.addr,t)}function R_(n,t){const e=Zs(t,this.size,2);n.uniform2fv(this.addr,e)}function C_(n,t){const e=Zs(t,this.size,3);n.uniform3fv(this.addr,e)}function P_(n,t){const e=Zs(t,this.size,4);n.uniform4fv(this.addr,e)}function z_(n,t){const e=Zs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function D_(n,t){const e=Zs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function I_(n,t){const e=Zs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function L_(n,t){n.uniform1iv(this.addr,t)}function U_(n,t){n.uniform2iv(this.addr,t)}function N_(n,t){n.uniform3iv(this.addr,t)}function F_(n,t){n.uniform4iv(this.addr,t)}function O_(n,t){n.uniform1uiv(this.addr,t)}function B_(n,t){n.uniform2uiv(this.addr,t)}function k_(n,t){n.uniform3uiv(this.addr,t)}function G_(n,t){n.uniform4uiv(this.addr,t)}function H_(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Yf,r[o])}function V_(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Kf,r[o])}function W_(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||jf,r[o])}function X_(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ue(i,r)||(n.uniform1iv(this.addr,r),Ne(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||$f,r[o])}function q_(n){switch(n){case 5126:return A_;case 35664:return R_;case 35665:return C_;case 35666:return P_;case 35674:return z_;case 35675:return D_;case 35676:return I_;case 5124:case 35670:return L_;case 35667:case 35671:return U_;case 35668:case 35672:return N_;case 35669:case 35673:return F_;case 5125:return O_;case 36294:return B_;case 36295:return k_;case 36296:return G_;case 35678:case 36198:case 36298:case 36306:case 35682:return H_;case 35679:case 36299:case 36307:return V_;case 35680:case 36300:case 36308:case 36293:return W_;case 36289:case 36303:case 36311:case 36292:return X_}}class Z_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=T_(e.type)}}class Y_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=q_(e.type)}}class $_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Xa=/(\w+)(\])?(\[|\.)?/g;function du(n,t){n.seq.push(t),n.map[t.id]=t}function K_(n,t,e){const i=n.name,s=i.length;for(Xa.lastIndex=0;;){const r=Xa.exec(i),o=Xa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){du(e,l===void 0?new Z_(a,n,t):new Y_(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new $_(a),du(e,u)),e=u}}}class Eo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);K_(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function pu(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const j_=37297;let J_=0;function Q_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const mu=new Jt;function tM(n){he._getMatrix(mu,he.workingColorSpace,n);const t=`mat3( ${mu.elements.map(e=>e.toFixed(4))} )`;switch(he.getTransfer(n)){case Ro:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function gu(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Q_(n.getShaderSource(t),a)}else return r}function eM(n,t){const e=tM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function nM(n,t){let e;switch(t){case wp:e="Linear";break;case bp:e="Reinhard";break;case Ep:e="Cineon";break;case ff:e="ACESFilmic";break;case Ap:e="AgX";break;case Rp:e="Neutral";break;case Tp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const po=new L;function iM(){he.getLuminanceCoefficients(po);const n=po.x.toFixed(4),t=po.y.toFixed(4),e=po.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lr).join(`
`)}function rM(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function oM(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function lr(n){return n!==""}function xu(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function _u(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const aM=/^[ \t]*#include +<([\w\d./]+)>/gm;function rl(n){return n.replace(aM,lM)}const cM=new Map;function lM(n,t){let e=te[t];if(e===void 0){const i=cM.get(t);if(i!==void 0)e=te[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return rl(e)}const hM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mu(n){return n.replace(hM,uM)}function uM(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function vu(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function fM(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===lf?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===hf?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$n&&(t="SHADOWMAP_TYPE_VSM"),t}function dM(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Bs:case ks:t="ENVMAP_TYPE_CUBE";break;case Wo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function pM(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ks:t="ENVMAP_MODE_REFRACTION";break}return t}function mM(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case uf:t="ENVMAP_BLENDING_MULTIPLY";break;case yp:t="ENVMAP_BLENDING_MIX";break;case Sp:t="ENVMAP_BLENDING_ADD";break}return t}function gM(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function xM(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=fM(e),l=dM(e),h=pM(e),u=mM(e),f=gM(e),d=sM(e),x=rM(r),p=s.createProgram();let m,g,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(lr).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(lr).join(`
`),g.length>0&&(g+=`
`)):(m=[vu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lr).join(`
`),g=[vu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?te.tonemapping_pars_fragment:"",e.toneMapping!==xi?nM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,eM("linearToOutputTexel",e.outputColorSpace),iM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(lr).join(`
`)),o=rl(o),o=xu(o,e),o=_u(o,e),a=rl(a),a=xu(a,e),a=_u(a,e),o=Mu(o),a=Mu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===_h?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_h?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const M=v+m+o,_=v+g+a,S=pu(s,s.VERTEX_SHADER,M),w=pu(s,s.FRAGMENT_SHADER,_);s.attachShader(p,S),s.attachShader(p,w),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function A(D){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(p)||"",B=s.getShaderInfoLog(S)||"",G=s.getShaderInfoLog(w)||"",Z=U.trim(),F=B.trim(),T=G.trim();let z=!0,k=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,S,w);else{const H=gu(s,S,"vertex"),N=gu(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Z+`
`+H+`
`+N)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(F===""||T==="")&&(k=!1);k&&(D.diagnostics={runnable:z,programLog:Z,vertexShader:{log:F,prefix:m},fragmentShader:{log:T,prefix:g}})}s.deleteShader(S),s.deleteShader(w),P=new Eo(s,p),y=oM(s,p)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(p,j_)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=J_++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=w,this}let _M=0;class MM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new vM(t),e.set(t,i)),i}}class vM{constructor(t){this.id=_M++,this.code=t,this.usedTimes=0}}function yM(n,t,e,i,s,r,o){const a=new Tf,c=new MM,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,b,D,U,B){const G=U.fog,Z=B.geometry,F=y.isMeshStandardMaterial?U.environment:null,T=(y.isMeshStandardMaterial?e:t).get(y.envMap||F),z=T&&T.mapping===Wo?T.image.height:null,k=x[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const H=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,N=H!==void 0?H.length:0;let Y=0;Z.morphAttributes.position!==void 0&&(Y=1),Z.morphAttributes.normal!==void 0&&(Y=2),Z.morphAttributes.color!==void 0&&(Y=3);let nt,ht,Et,q;if(k){const ue=Cn[k];nt=ue.vertexShader,ht=ue.fragmentShader}else nt=y.vertexShader,ht=y.fragmentShader,c.update(y),Et=c.getVertexShaderID(y),q=c.getFragmentShaderID(y);const $=n.getRenderTarget(),ct=n.state.buffers.depth.getReversed(),vt=B.isInstancedMesh===!0,dt=B.isBatchedMesh===!0,Zt=!!y.map,Qt=!!y.matcap,I=!!T,Lt=!!y.aoMap,Ft=!!y.lightMap,yt=!!y.bumpMap,Tt=!!y.normalMap,tt=!!y.displacementMap,st=!!y.emissiveMap,ot=!!y.metalnessMap,Ot=!!y.roughnessMap,Yt=y.anisotropy>0,C=y.clearcoat>0,E=y.dispersion>0,V=y.iridescence>0,J=y.sheen>0,rt=y.transmission>0,Q=Yt&&!!y.anisotropyMap,zt=C&&!!y.clearcoatMap,mt=C&&!!y.clearcoatNormalMap,At=C&&!!y.clearcoatRoughnessMap,bt=V&&!!y.iridescenceMap,ut=V&&!!y.iridescenceThicknessMap,et=J&&!!y.sheenColorMap,xt=J&&!!y.sheenRoughnessMap,_t=!!y.specularMap,at=!!y.specularColorMap,Ut=!!y.specularIntensityMap,O=rt&&!!y.transmissionMap,ft=rt&&!!y.thicknessMap,gt=!!y.gradientMap,Ct=!!y.alphaMap,lt=y.alphaTest>0,it=!!y.alphaHash,Dt=!!y.extensions;let Kt=xi;y.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Kt=n.toneMapping);const xe={shaderID:k,shaderType:y.type,shaderName:y.name,vertexShader:nt,fragmentShader:ht,defines:y.defines,customVertexShaderID:Et,customFragmentShaderID:q,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:dt,batchingColor:dt&&B._colorsTexture!==null,instancing:vt,instancingColor:vt&&B.instanceColor!==null,instancingMorph:vt&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:$===null?n.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Gs,alphaToCoverage:!!y.alphaToCoverage,map:Zt,matcap:Qt,envMap:I,envMapMode:I&&T.mapping,envMapCubeUVHeight:z,aoMap:Lt,lightMap:Ft,bumpMap:yt,normalMap:Tt,displacementMap:f&&tt,emissiveMap:st,normalMapObjectSpace:Tt&&y.normalMapType===Dp,normalMapTangentSpace:Tt&&y.normalMapType===yf,metalnessMap:ot,roughnessMap:Ot,anisotropy:Yt,anisotropyMap:Q,clearcoat:C,clearcoatMap:zt,clearcoatNormalMap:mt,clearcoatRoughnessMap:At,dispersion:E,iridescence:V,iridescenceMap:bt,iridescenceThicknessMap:ut,sheen:J,sheenColorMap:et,sheenRoughnessMap:xt,specularMap:_t,specularColorMap:at,specularIntensityMap:Ut,transmission:rt,transmissionMap:O,thicknessMap:ft,gradientMap:gt,opaque:y.transparent===!1&&y.blending===Ps&&y.alphaToCoverage===!1,alphaMap:Ct,alphaTest:lt,alphaHash:it,combine:y.combine,mapUv:Zt&&p(y.map.channel),aoMapUv:Lt&&p(y.aoMap.channel),lightMapUv:Ft&&p(y.lightMap.channel),bumpMapUv:yt&&p(y.bumpMap.channel),normalMapUv:Tt&&p(y.normalMap.channel),displacementMapUv:tt&&p(y.displacementMap.channel),emissiveMapUv:st&&p(y.emissiveMap.channel),metalnessMapUv:ot&&p(y.metalnessMap.channel),roughnessMapUv:Ot&&p(y.roughnessMap.channel),anisotropyMapUv:Q&&p(y.anisotropyMap.channel),clearcoatMapUv:zt&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:mt&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:et&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:xt&&p(y.sheenRoughnessMap.channel),specularMapUv:_t&&p(y.specularMap.channel),specularColorMapUv:at&&p(y.specularColorMap.channel),specularIntensityMapUv:Ut&&p(y.specularIntensityMap.channel),transmissionMapUv:O&&p(y.transmissionMap.channel),thicknessMapUv:ft&&p(y.thicknessMap.channel),alphaMapUv:Ct&&p(y.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Tt||Yt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(Zt||Ct),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ct,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:Y,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Kt,decodeVideoTexture:Zt&&y.map.isVideoTexture===!0&&he.getTransfer(y.map.colorSpace)===de,decodeVideoTextureEmissive:st&&y.emissiveMap.isVideoTexture===!0&&he.getTransfer(y.emissiveMap.colorSpace)===de,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ze,flipSided:y.side===Qe,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Dt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&y.extensions.multiDraw===!0||dt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return xe.vertexUv1s=l.has(1),xe.vertexUv2s=l.has(2),xe.vertexUv3s=l.has(3),l.clear(),xe}function g(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)b.push(D),b.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(v(b,y),M(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function v(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function M(y,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),y.push(a.mask)}function _(y){const b=x[y.type];let D;if(b){const U=Cn[b];D=am.clone(U.uniforms)}else D=y.uniforms;return D}function S(y,b){let D;for(let U=0,B=h.length;U<B;U++){const G=h[U];if(G.cacheKey===b){D=G,++D.usedTimes;break}}return D===void 0&&(D=new xM(n,b,y,r),h.push(D)),D}function w(y){if(--y.usedTimes===0){const b=h.indexOf(y);h[b]=h[h.length-1],h.pop(),y.destroy()}}function A(y){c.remove(y)}function P(){c.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:_,acquireProgram:S,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:P}}function SM(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function wM(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function yu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Su(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,d,x,p,m){let g=n[t];return g===void 0?(g={id:u.id,object:u,geometry:f,material:d,groupOrder:x,renderOrder:u.renderOrder,z:p,group:m},n[t]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=d,g.groupOrder=x,g.renderOrder=u.renderOrder,g.z=p,g.group=m),t++,g}function a(u,f,d,x,p,m){const g=o(u,f,d,x,p,m);d.transmission>0?i.push(g):d.transparent===!0?s.push(g):e.push(g)}function c(u,f,d,x,p,m){const g=o(u,f,d,x,p,m);d.transmission>0?i.unshift(g):d.transparent===!0?s.unshift(g):e.unshift(g)}function l(u,f){e.length>1&&e.sort(u||wM),i.length>1&&i.sort(f||yu),s.length>1&&s.sort(f||yu)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function bM(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Su,n.set(i,[o])):s>=r.length?(o=new Su,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function EM(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Xt};break;case"SpotLight":e={position:new L,direction:new L,color:new Xt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Xt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Xt,groundColor:new Xt};break;case"RectAreaLight":e={color:new Xt,position:new L,halfWidth:new L,halfHeight:new L};break}return n[t.id]=e,e}}}function TM(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let AM=0;function RM(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function CM(n){const t=new EM,e=TM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new L);const s=new L,r=new ie,o=new ie;function a(l){let h=0,u=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let d=0,x=0,p=0,m=0,g=0,v=0,M=0,_=0,S=0,w=0,A=0;l.sort(RM);for(let y=0,b=l.length;y<b;y++){const D=l[y],U=D.color,B=D.intensity,G=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=U.r*B,u+=U.g*B,f+=U.b*B;else if(D.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(D.sh.coefficients[F],B);A++}else if(D.isDirectionalLight){const F=t.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const T=D.shadow,z=e.get(D);z.shadowIntensity=T.intensity,z.shadowBias=T.bias,z.shadowNormalBias=T.normalBias,z.shadowRadius=T.radius,z.shadowMapSize=T.mapSize,i.directionalShadow[d]=z,i.directionalShadowMap[d]=Z,i.directionalShadowMatrix[d]=D.shadow.matrix,v++}i.directional[d]=F,d++}else if(D.isSpotLight){const F=t.get(D);F.position.setFromMatrixPosition(D.matrixWorld),F.color.copy(U).multiplyScalar(B),F.distance=G,F.coneCos=Math.cos(D.angle),F.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),F.decay=D.decay,i.spot[p]=F;const T=D.shadow;if(D.map&&(i.spotLightMap[S]=D.map,S++,T.updateMatrices(D),D.castShadow&&w++),i.spotLightMatrix[p]=T.matrix,D.castShadow){const z=e.get(D);z.shadowIntensity=T.intensity,z.shadowBias=T.bias,z.shadowNormalBias=T.normalBias,z.shadowRadius=T.radius,z.shadowMapSize=T.mapSize,i.spotShadow[p]=z,i.spotShadowMap[p]=Z,_++}p++}else if(D.isRectAreaLight){const F=t.get(D);F.color.copy(U).multiplyScalar(B),F.halfWidth.set(D.width*.5,0,0),F.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=F,m++}else if(D.isPointLight){const F=t.get(D);if(F.color.copy(D.color).multiplyScalar(D.intensity),F.distance=D.distance,F.decay=D.decay,D.castShadow){const T=D.shadow,z=e.get(D);z.shadowIntensity=T.intensity,z.shadowBias=T.bias,z.shadowNormalBias=T.normalBias,z.shadowRadius=T.radius,z.shadowMapSize=T.mapSize,z.shadowCameraNear=T.camera.near,z.shadowCameraFar=T.camera.far,i.pointShadow[x]=z,i.pointShadowMap[x]=Z,i.pointShadowMatrix[x]=D.shadow.matrix,M++}i.point[x]=F,x++}else if(D.isHemisphereLight){const F=t.get(D);F.skyColor.copy(D.color).multiplyScalar(B),F.groundColor.copy(D.groundColor).multiplyScalar(B),i.hemi[g]=F,g++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=St.LTC_FLOAT_1,i.rectAreaLTC2=St.LTC_FLOAT_2):(i.rectAreaLTC1=St.LTC_HALF_1,i.rectAreaLTC2=St.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==d||P.pointLength!==x||P.spotLength!==p||P.rectAreaLength!==m||P.hemiLength!==g||P.numDirectionalShadows!==v||P.numPointShadows!==M||P.numSpotShadows!==_||P.numSpotMaps!==S||P.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=p,i.rectArea.length=m,i.point.length=x,i.hemi.length=g,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=_+S-w,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,P.directionalLength=d,P.pointLength=x,P.spotLength=p,P.rectAreaLength=m,P.hemiLength=g,P.numDirectionalShadows=v,P.numPointShadows=M,P.numSpotShadows=_,P.numSpotMaps=S,P.numLightProbes=A,i.version=AM++)}function c(l,h){let u=0,f=0,d=0,x=0,p=0;const m=h.matrixWorldInverse;for(let g=0,v=l.length;g<v;g++){const M=l[g];if(M.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(M.isSpotLight){const _=i.spot[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const _=i.rectArea[x];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){const _=i.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const _=i.hemi[p];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(m),p++}}}return{setup:a,setupView:c,state:i}}function wu(n){const t=new CM(n),e=[],i=[];function s(h){l.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function PM(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new wu(n),t.set(s,[a])):r>=o.length?(a=new wu(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const zM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,DM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function IM(n,t,e){let i=new Xo;const s=new Rt,r=new Rt,o=new Ae,a=new Qm({depthPacking:zp}),c=new tg,l={},h=e.maxTextureSize,u={[bi]:Qe,[Qe]:bi,[ze]:ze},f=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:zM,fragmentShader:DM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const x=new me;x.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new ne(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lf;let g=this.type;this.render=function(w,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=n.getRenderTarget(),b=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),U=n.state;U.setBlending(gi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const B=g!==$n&&this.type===$n,G=g===$n&&this.type!==$n;for(let Z=0,F=w.length;Z<F;Z++){const T=w[Z],z=T.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",T,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const k=z.getFrameExtents();if(s.multiply(k),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/k.x),s.x=r.x*k.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/k.y),s.y=r.y*k.y,z.mapSize.y=r.y)),z.map===null||B===!0||G===!0){const N=this.type!==$n?{minFilter:dn,magFilter:dn}:{};z.map!==null&&z.map.dispose(),z.map=new Yi(s.x,s.y,N),z.map.texture.name=T.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const H=z.getViewportCount();for(let N=0;N<H;N++){const Y=z.getViewport(N);o.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),U.viewport(o),z.updateMatrices(T,N),i=z.getFrustum(),_(A,P,z.camera,T,this.type)}z.isPointLightShadow!==!0&&this.type===$n&&v(z,P),z.needsUpdate=!1}g=this.type,m.needsUpdate=!1,n.setRenderTarget(y,b,D)};function v(w,A){const P=t.update(p);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Yi(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,P,f,p,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,P,d,p,null)}function M(w,A,P,y){let b=null;const D=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)b=D;else if(b=P.isPointLight===!0?c:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=b.uuid,B=A.uuid;let G=l[U];G===void 0&&(G={},l[U]=G);let Z=G[B];Z===void 0&&(Z=b.clone(),G[B]=Z,A.addEventListener("dispose",S)),b=Z}if(b.visible=A.visible,b.wireframe=A.wireframe,y===$n?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const U=n.properties.get(b);U.light=P}return b}function _(w,A,P,y,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===$n)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const B=t.update(w),G=w.material;if(Array.isArray(G)){const Z=B.groups;for(let F=0,T=Z.length;F<T;F++){const z=Z[F],k=G[z.materialIndex];if(k&&k.visible){const H=M(w,k,y,b);w.onBeforeShadow(n,w,A,P,B,H,z),n.renderBufferDirect(P,null,B,H,w,z),w.onAfterShadow(n,w,A,P,B,H,z)}}}else if(G.visible){const Z=M(w,G,y,b);w.onBeforeShadow(n,w,A,P,B,Z,null),n.renderBufferDirect(P,null,B,Z,w,null),w.onAfterShadow(n,w,A,P,B,Z,null)}}const U=w.children;for(let B=0,G=U.length;B<G;B++)_(U[B],A,P,y,b)}function S(w){w.target.removeEventListener("dispose",S);for(const P in l){const y=l[P],b=w.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const LM={[gc]:xc,[_c]:yc,[Mc]:Sc,[Os]:vc,[xc]:gc,[yc]:_c,[Sc]:Mc,[vc]:Os};function UM(n,t){function e(){let O=!1;const ft=new Ae;let gt=null;const Ct=new Ae(0,0,0,0);return{setMask:function(lt){gt!==lt&&!O&&(n.colorMask(lt,lt,lt,lt),gt=lt)},setLocked:function(lt){O=lt},setClear:function(lt,it,Dt,Kt,xe){xe===!0&&(lt*=Kt,it*=Kt,Dt*=Kt),ft.set(lt,it,Dt,Kt),Ct.equals(ft)===!1&&(n.clearColor(lt,it,Dt,Kt),Ct.copy(ft))},reset:function(){O=!1,gt=null,Ct.set(-1,0,0,0)}}}function i(){let O=!1,ft=!1,gt=null,Ct=null,lt=null;return{setReversed:function(it){if(ft!==it){const Dt=t.get("EXT_clip_control");it?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),ft=it;const Kt=lt;lt=null,this.setClear(Kt)}},getReversed:function(){return ft},setTest:function(it){it?$(n.DEPTH_TEST):ct(n.DEPTH_TEST)},setMask:function(it){gt!==it&&!O&&(n.depthMask(it),gt=it)},setFunc:function(it){if(ft&&(it=LM[it]),Ct!==it){switch(it){case gc:n.depthFunc(n.NEVER);break;case xc:n.depthFunc(n.ALWAYS);break;case _c:n.depthFunc(n.LESS);break;case Os:n.depthFunc(n.LEQUAL);break;case Mc:n.depthFunc(n.EQUAL);break;case vc:n.depthFunc(n.GEQUAL);break;case yc:n.depthFunc(n.GREATER);break;case Sc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ct=it}},setLocked:function(it){O=it},setClear:function(it){lt!==it&&(ft&&(it=1-it),n.clearDepth(it),lt=it)},reset:function(){O=!1,gt=null,Ct=null,lt=null,ft=!1}}}function s(){let O=!1,ft=null,gt=null,Ct=null,lt=null,it=null,Dt=null,Kt=null,xe=null;return{setTest:function(ue){O||(ue?$(n.STENCIL_TEST):ct(n.STENCIL_TEST))},setMask:function(ue){ft!==ue&&!O&&(n.stencilMask(ue),ft=ue)},setFunc:function(ue,Hn,Rn){(gt!==ue||Ct!==Hn||lt!==Rn)&&(n.stencilFunc(ue,Hn,Rn),gt=ue,Ct=Hn,lt=Rn)},setOp:function(ue,Hn,Rn){(it!==ue||Dt!==Hn||Kt!==Rn)&&(n.stencilOp(ue,Hn,Rn),it=ue,Dt=Hn,Kt=Rn)},setLocked:function(ue){O=ue},setClear:function(ue){xe!==ue&&(n.clearStencil(ue),xe=ue)},reset:function(){O=!1,ft=null,gt=null,Ct=null,lt=null,it=null,Dt=null,Kt=null,xe=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],x=null,p=!1,m=null,g=null,v=null,M=null,_=null,S=null,w=null,A=new Xt(0,0,0),P=0,y=!1,b=null,D=null,U=null,B=null,G=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,T=0;const z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(T=parseFloat(/^WebGL (\d)/.exec(z)[1]),F=T>=1):z.indexOf("OpenGL ES")!==-1&&(T=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),F=T>=2);let k=null,H={};const N=n.getParameter(n.SCISSOR_BOX),Y=n.getParameter(n.VIEWPORT),nt=new Ae().fromArray(N),ht=new Ae().fromArray(Y);function Et(O,ft,gt,Ct){const lt=new Uint8Array(4),it=n.createTexture();n.bindTexture(O,it),n.texParameteri(O,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(O,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Dt=0;Dt<gt;Dt++)O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,Ct,0,n.RGBA,n.UNSIGNED_BYTE,lt):n.texImage2D(ft+Dt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,lt);return it}const q={};q[n.TEXTURE_2D]=Et(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=Et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=Et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=Et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),$(n.DEPTH_TEST),o.setFunc(Os),yt(!1),Tt(ph),$(n.CULL_FACE),Lt(gi);function $(O){h[O]!==!0&&(n.enable(O),h[O]=!0)}function ct(O){h[O]!==!1&&(n.disable(O),h[O]=!1)}function vt(O,ft){return u[O]!==ft?(n.bindFramebuffer(O,ft),u[O]=ft,O===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ft),O===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function dt(O,ft){let gt=d,Ct=!1;if(O){gt=f.get(ft),gt===void 0&&(gt=[],f.set(ft,gt));const lt=O.textures;if(gt.length!==lt.length||gt[0]!==n.COLOR_ATTACHMENT0){for(let it=0,Dt=lt.length;it<Dt;it++)gt[it]=n.COLOR_ATTACHMENT0+it;gt.length=lt.length,Ct=!0}}else gt[0]!==n.BACK&&(gt[0]=n.BACK,Ct=!0);Ct&&n.drawBuffers(gt)}function Zt(O){return x!==O?(n.useProgram(O),x=O,!0):!1}const Qt={[Bi]:n.FUNC_ADD,[sp]:n.FUNC_SUBTRACT,[rp]:n.FUNC_REVERSE_SUBTRACT};Qt[op]=n.MIN,Qt[ap]=n.MAX;const I={[cp]:n.ZERO,[lp]:n.ONE,[hp]:n.SRC_COLOR,[pc]:n.SRC_ALPHA,[gp]:n.SRC_ALPHA_SATURATE,[pp]:n.DST_COLOR,[fp]:n.DST_ALPHA,[up]:n.ONE_MINUS_SRC_COLOR,[mc]:n.ONE_MINUS_SRC_ALPHA,[mp]:n.ONE_MINUS_DST_COLOR,[dp]:n.ONE_MINUS_DST_ALPHA,[xp]:n.CONSTANT_COLOR,[_p]:n.ONE_MINUS_CONSTANT_COLOR,[Mp]:n.CONSTANT_ALPHA,[vp]:n.ONE_MINUS_CONSTANT_ALPHA};function Lt(O,ft,gt,Ct,lt,it,Dt,Kt,xe,ue){if(O===gi){p===!0&&(ct(n.BLEND),p=!1);return}if(p===!1&&($(n.BLEND),p=!0),O!==ip){if(O!==m||ue!==y){if((g!==Bi||_!==Bi)&&(n.blendEquation(n.FUNC_ADD),g=Bi,_=Bi),ue)switch(O){case Ps:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dc:n.blendFunc(n.ONE,n.ONE);break;case mh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case gh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ps:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case dc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case mh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}v=null,M=null,S=null,w=null,A.set(0,0,0),P=0,m=O,y=ue}return}lt=lt||ft,it=it||gt,Dt=Dt||Ct,(ft!==g||lt!==_)&&(n.blendEquationSeparate(Qt[ft],Qt[lt]),g=ft,_=lt),(gt!==v||Ct!==M||it!==S||Dt!==w)&&(n.blendFuncSeparate(I[gt],I[Ct],I[it],I[Dt]),v=gt,M=Ct,S=it,w=Dt),(Kt.equals(A)===!1||xe!==P)&&(n.blendColor(Kt.r,Kt.g,Kt.b,xe),A.copy(Kt),P=xe),m=O,y=!1}function Ft(O,ft){O.side===ze?ct(n.CULL_FACE):$(n.CULL_FACE);let gt=O.side===Qe;ft&&(gt=!gt),yt(gt),O.blending===Ps&&O.transparent===!1?Lt(gi):Lt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const Ct=O.stencilWrite;a.setTest(Ct),Ct&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),st(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?$(n.SAMPLE_ALPHA_TO_COVERAGE):ct(n.SAMPLE_ALPHA_TO_COVERAGE)}function yt(O){b!==O&&(O?n.frontFace(n.CW):n.frontFace(n.CCW),b=O)}function Tt(O){O!==ep?($(n.CULL_FACE),O!==D&&(O===ph?n.cullFace(n.BACK):O===np?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ct(n.CULL_FACE),D=O}function tt(O){O!==U&&(F&&n.lineWidth(O),U=O)}function st(O,ft,gt){O?($(n.POLYGON_OFFSET_FILL),(B!==ft||G!==gt)&&(n.polygonOffset(ft,gt),B=ft,G=gt)):ct(n.POLYGON_OFFSET_FILL)}function ot(O){O?$(n.SCISSOR_TEST):ct(n.SCISSOR_TEST)}function Ot(O){O===void 0&&(O=n.TEXTURE0+Z-1),k!==O&&(n.activeTexture(O),k=O)}function Yt(O,ft,gt){gt===void 0&&(k===null?gt=n.TEXTURE0+Z-1:gt=k);let Ct=H[gt];Ct===void 0&&(Ct={type:void 0,texture:void 0},H[gt]=Ct),(Ct.type!==O||Ct.texture!==ft)&&(k!==gt&&(n.activeTexture(gt),k=gt),n.bindTexture(O,ft||q[O]),Ct.type=O,Ct.texture=ft)}function C(){const O=H[k];O!==void 0&&O.type!==void 0&&(n.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function E(){try{n.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function V(){try{n.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function J(){try{n.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function rt(){try{n.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Q(){try{n.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function zt(){try{n.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(){try{n.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function At(){try{n.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function bt(){try{n.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ut(){try{n.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(O){nt.equals(O)===!1&&(n.scissor(O.x,O.y,O.z,O.w),nt.copy(O))}function xt(O){ht.equals(O)===!1&&(n.viewport(O.x,O.y,O.z,O.w),ht.copy(O))}function _t(O,ft){let gt=l.get(ft);gt===void 0&&(gt=new WeakMap,l.set(ft,gt));let Ct=gt.get(O);Ct===void 0&&(Ct=n.getUniformBlockIndex(ft,O.name),gt.set(O,Ct))}function at(O,ft){const Ct=l.get(ft).get(O);c.get(ft)!==Ct&&(n.uniformBlockBinding(ft,Ct,O.__bindingPointIndex),c.set(ft,Ct))}function Ut(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},k=null,H={},u={},f=new WeakMap,d=[],x=null,p=!1,m=null,g=null,v=null,M=null,_=null,S=null,w=null,A=new Xt(0,0,0),P=0,y=!1,b=null,D=null,U=null,B=null,G=null,nt.set(0,0,n.canvas.width,n.canvas.height),ht.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:$,disable:ct,bindFramebuffer:vt,drawBuffers:dt,useProgram:Zt,setBlending:Lt,setMaterial:Ft,setFlipSided:yt,setCullFace:Tt,setLineWidth:tt,setPolygonOffset:st,setScissorTest:ot,activeTexture:Ot,bindTexture:Yt,unbindTexture:C,compressedTexImage2D:E,compressedTexImage3D:V,texImage2D:bt,texImage3D:ut,updateUBOMapping:_t,uniformBlockBinding:at,texStorage2D:mt,texStorage3D:At,texSubImage2D:J,texSubImage3D:rt,compressedTexSubImage2D:Q,compressedTexSubImage3D:zt,scissor:et,viewport:xt,reset:Ut}}function NM(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Rt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,E){return d?new OffscreenCanvas(C,E):Po("canvas")}function p(C,E,V){let J=1;const rt=Yt(C);if((rt.width>V||rt.height>V)&&(J=V/Math.max(rt.width,rt.height)),J<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Q=Math.floor(J*rt.width),zt=Math.floor(J*rt.height);u===void 0&&(u=x(Q,zt));const mt=E?x(Q,zt):u;return mt.width=Q,mt.height=zt,mt.getContext("2d").drawImage(C,0,0,Q,zt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+Q+"x"+zt+")."),mt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),C;return C}function m(C){return C.generateMipmaps}function g(C){n.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(C,E,V,J,rt=!1){if(C!==null){if(n[C]!==void 0)return n[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Q=E;if(E===n.RED&&(V===n.FLOAT&&(Q=n.R32F),V===n.HALF_FLOAT&&(Q=n.R16F),V===n.UNSIGNED_BYTE&&(Q=n.R8)),E===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.R8UI),V===n.UNSIGNED_SHORT&&(Q=n.R16UI),V===n.UNSIGNED_INT&&(Q=n.R32UI),V===n.BYTE&&(Q=n.R8I),V===n.SHORT&&(Q=n.R16I),V===n.INT&&(Q=n.R32I)),E===n.RG&&(V===n.FLOAT&&(Q=n.RG32F),V===n.HALF_FLOAT&&(Q=n.RG16F),V===n.UNSIGNED_BYTE&&(Q=n.RG8)),E===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RG8UI),V===n.UNSIGNED_SHORT&&(Q=n.RG16UI),V===n.UNSIGNED_INT&&(Q=n.RG32UI),V===n.BYTE&&(Q=n.RG8I),V===n.SHORT&&(Q=n.RG16I),V===n.INT&&(Q=n.RG32I)),E===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),V===n.UNSIGNED_INT&&(Q=n.RGB32UI),V===n.BYTE&&(Q=n.RGB8I),V===n.SHORT&&(Q=n.RGB16I),V===n.INT&&(Q=n.RGB32I)),E===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),V===n.UNSIGNED_INT&&(Q=n.RGBA32UI),V===n.BYTE&&(Q=n.RGBA8I),V===n.SHORT&&(Q=n.RGBA16I),V===n.INT&&(Q=n.RGBA32I)),E===n.RGB&&(V===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),E===n.RGBA){const zt=rt?Ro:he.getTransfer(J);V===n.FLOAT&&(Q=n.RGBA32F),V===n.HALF_FLOAT&&(Q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Q=zt===de?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(C,E){let V;return C?E===null||E===Zi||E===Mr?V=n.DEPTH24_STENCIL8:E===Ln?V=n.DEPTH32F_STENCIL8:E===_r&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Zi||E===Mr?V=n.DEPTH_COMPONENT24:E===Ln?V=n.DEPTH_COMPONENT32F:E===_r&&(V=n.DEPTH_COMPONENT16),V}function S(C,E){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==dn&&C.minFilter!==xn?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function w(C){const E=C.target;E.removeEventListener("dispose",w),P(E),E.isVideoTexture&&h.delete(E)}function A(C){const E=C.target;E.removeEventListener("dispose",A),b(E)}function P(C){const E=i.get(C);if(E.__webglInit===void 0)return;const V=C.source,J=f.get(V);if(J){const rt=J[E.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&y(C),Object.keys(J).length===0&&f.delete(V)}i.remove(C)}function y(C){const E=i.get(C);n.deleteTexture(E.__webglTexture);const V=C.source,J=f.get(V);delete J[E.__cacheKey],o.memory.textures--}function b(C){const E=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let rt=0;rt<E.__webglFramebuffer[J].length;rt++)n.deleteFramebuffer(E.__webglFramebuffer[J][rt]);else n.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)n.deleteFramebuffer(E.__webglFramebuffer[J]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const V=C.textures;for(let J=0,rt=V.length;J<rt;J++){const Q=i.get(V[J]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(V[J])}i.remove(C)}let D=0;function U(){D=0}function B(){const C=D;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function G(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function Z(C,E){const V=i.get(C);if(C.isVideoTexture&&ot(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&V.__version!==C.version){const J=C.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(V,C,E);return}}else C.isExternalTexture&&(V.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+E)}function F(C,E){const V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){q(V,C,E);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+E)}function T(C,E){const V=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){q(V,C,E);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+E)}function z(C,E){const V=i.get(C);if(C.version>0&&V.__version!==C.version){$(V,C,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+E)}const k={[ni]:n.REPEAT,[Hi]:n.CLAMP_TO_EDGE,[Ec]:n.MIRRORED_REPEAT},H={[dn]:n.NEAREST,[Cp]:n.NEAREST_MIPMAP_NEAREST,[Fr]:n.NEAREST_MIPMAP_LINEAR,[xn]:n.LINEAR,[ca]:n.LINEAR_MIPMAP_NEAREST,[Vi]:n.LINEAR_MIPMAP_LINEAR},N={[Ip]:n.NEVER,[Bp]:n.ALWAYS,[Lp]:n.LESS,[Sf]:n.LEQUAL,[Up]:n.EQUAL,[Op]:n.GEQUAL,[Np]:n.GREATER,[Fp]:n.NOTEQUAL};function Y(C,E){if(E.type===Ln&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===xn||E.magFilter===ca||E.magFilter===Fr||E.magFilter===Vi||E.minFilter===xn||E.minFilter===ca||E.minFilter===Fr||E.minFilter===Vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,k[E.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,k[E.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,k[E.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,H[E.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,H[E.minFilter]),E.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,N[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===dn||E.minFilter!==Fr&&E.minFilter!==Vi||E.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(C,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function nt(C,E){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",w));const J=E.source;let rt=f.get(J);rt===void 0&&(rt={},f.set(J,rt));const Q=G(E);if(Q!==C.__cacheKey){rt[Q]===void 0&&(rt[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),rt[Q].usedTimes++;const zt=rt[C.__cacheKey];zt!==void 0&&(rt[C.__cacheKey].usedTimes--,zt.usedTimes===0&&y(E)),C.__cacheKey=Q,C.__webglTexture=rt[Q].texture}return V}function ht(C,E,V){return Math.floor(Math.floor(C/V)/E)}function Et(C,E,V,J){const Q=C.updateRanges;if(Q.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,E.width,E.height,V,J,E.data);else{Q.sort((ut,et)=>ut.start-et.start);let zt=0;for(let ut=1;ut<Q.length;ut++){const et=Q[zt],xt=Q[ut],_t=et.start+et.count,at=ht(xt.start,E.width,4),Ut=ht(et.start,E.width,4);xt.start<=_t+1&&at===Ut&&ht(xt.start+xt.count-1,E.width,4)===at?et.count=Math.max(et.count,xt.start+xt.count-et.start):(++zt,Q[zt]=xt)}Q.length=zt+1;const mt=n.getParameter(n.UNPACK_ROW_LENGTH),At=n.getParameter(n.UNPACK_SKIP_PIXELS),bt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,E.width);for(let ut=0,et=Q.length;ut<et;ut++){const xt=Q[ut],_t=Math.floor(xt.start/4),at=Math.ceil(xt.count/4),Ut=_t%E.width,O=Math.floor(_t/E.width),ft=at,gt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ut),n.pixelStorei(n.UNPACK_SKIP_ROWS,O),e.texSubImage2D(n.TEXTURE_2D,0,Ut,O,ft,gt,V,J,E.data)}C.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,mt),n.pixelStorei(n.UNPACK_SKIP_PIXELS,At),n.pixelStorei(n.UNPACK_SKIP_ROWS,bt)}}function q(C,E,V){let J=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=n.TEXTURE_3D);const rt=nt(C,E),Q=E.source;e.bindTexture(J,C.__webglTexture,n.TEXTURE0+V);const zt=i.get(Q);if(Q.version!==zt.__version||rt===!0){e.activeTexture(n.TEXTURE0+V);const mt=he.getPrimaries(he.workingColorSpace),At=E.colorSpace===di?null:he.getPrimaries(E.colorSpace),bt=E.colorSpace===di||mt===At?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let ut=p(E.image,!1,s.maxTextureSize);ut=Ot(E,ut);const et=r.convert(E.format,E.colorSpace),xt=r.convert(E.type);let _t=M(E.internalFormat,et,xt,E.colorSpace,E.isVideoTexture);Y(J,E);let at;const Ut=E.mipmaps,O=E.isVideoTexture!==!0,ft=zt.__version===void 0||rt===!0,gt=Q.dataReady,Ct=S(E,ut);if(E.isDepthTexture)_t=_(E.format===yr,E.type),ft&&(O?e.texStorage2D(n.TEXTURE_2D,1,_t,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,_t,ut.width,ut.height,0,et,xt,null));else if(E.isDataTexture)if(Ut.length>0){O&&ft&&e.texStorage2D(n.TEXTURE_2D,Ct,_t,Ut[0].width,Ut[0].height);for(let lt=0,it=Ut.length;lt<it;lt++)at=Ut[lt],O?gt&&e.texSubImage2D(n.TEXTURE_2D,lt,0,0,at.width,at.height,et,xt,at.data):e.texImage2D(n.TEXTURE_2D,lt,_t,at.width,at.height,0,et,xt,at.data);E.generateMipmaps=!1}else O?(ft&&e.texStorage2D(n.TEXTURE_2D,Ct,_t,ut.width,ut.height),gt&&Et(E,ut,et,xt)):e.texImage2D(n.TEXTURE_2D,0,_t,ut.width,ut.height,0,et,xt,ut.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){O&&ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,_t,Ut[0].width,Ut[0].height,ut.depth);for(let lt=0,it=Ut.length;lt<it;lt++)if(at=Ut[lt],E.format!==Tn)if(et!==null)if(O){if(gt)if(E.layerUpdates.size>0){const Dt=Qh(at.width,at.height,E.format,E.type);for(const Kt of E.layerUpdates){const xe=at.data.subarray(Kt*Dt/at.data.BYTES_PER_ELEMENT,(Kt+1)*Dt/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,lt,0,0,Kt,at.width,at.height,1,et,xe)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,lt,0,0,0,at.width,at.height,ut.depth,et,at.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,lt,_t,at.width,at.height,ut.depth,0,at.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?gt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,lt,0,0,0,at.width,at.height,ut.depth,et,xt,at.data):e.texImage3D(n.TEXTURE_2D_ARRAY,lt,_t,at.width,at.height,ut.depth,0,et,xt,at.data)}else{O&&ft&&e.texStorage2D(n.TEXTURE_2D,Ct,_t,Ut[0].width,Ut[0].height);for(let lt=0,it=Ut.length;lt<it;lt++)at=Ut[lt],E.format!==Tn?et!==null?O?gt&&e.compressedTexSubImage2D(n.TEXTURE_2D,lt,0,0,at.width,at.height,et,at.data):e.compressedTexImage2D(n.TEXTURE_2D,lt,_t,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?gt&&e.texSubImage2D(n.TEXTURE_2D,lt,0,0,at.width,at.height,et,xt,at.data):e.texImage2D(n.TEXTURE_2D,lt,_t,at.width,at.height,0,et,xt,at.data)}else if(E.isDataArrayTexture)if(O){if(ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Ct,_t,ut.width,ut.height,ut.depth),gt)if(E.layerUpdates.size>0){const lt=Qh(ut.width,ut.height,E.format,E.type);for(const it of E.layerUpdates){const Dt=ut.data.subarray(it*lt/ut.data.BYTES_PER_ELEMENT,(it+1)*lt/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,it,ut.width,ut.height,1,et,xt,Dt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,et,xt,ut.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,_t,ut.width,ut.height,ut.depth,0,et,xt,ut.data);else if(E.isData3DTexture)O?(ft&&e.texStorage3D(n.TEXTURE_3D,Ct,_t,ut.width,ut.height,ut.depth),gt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,et,xt,ut.data)):e.texImage3D(n.TEXTURE_3D,0,_t,ut.width,ut.height,ut.depth,0,et,xt,ut.data);else if(E.isFramebufferTexture){if(ft)if(O)e.texStorage2D(n.TEXTURE_2D,Ct,_t,ut.width,ut.height);else{let lt=ut.width,it=ut.height;for(let Dt=0;Dt<Ct;Dt++)e.texImage2D(n.TEXTURE_2D,Dt,_t,lt,it,0,et,xt,null),lt>>=1,it>>=1}}else if(Ut.length>0){if(O&&ft){const lt=Yt(Ut[0]);e.texStorage2D(n.TEXTURE_2D,Ct,_t,lt.width,lt.height)}for(let lt=0,it=Ut.length;lt<it;lt++)at=Ut[lt],O?gt&&e.texSubImage2D(n.TEXTURE_2D,lt,0,0,et,xt,at):e.texImage2D(n.TEXTURE_2D,lt,_t,et,xt,at);E.generateMipmaps=!1}else if(O){if(ft){const lt=Yt(ut);e.texStorage2D(n.TEXTURE_2D,Ct,_t,lt.width,lt.height)}gt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,et,xt,ut)}else e.texImage2D(n.TEXTURE_2D,0,_t,et,xt,ut);m(E)&&g(J),zt.__version=Q.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function $(C,E,V){if(E.image.length!==6)return;const J=nt(C,E),rt=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+V);const Q=i.get(rt);if(rt.version!==Q.__version||J===!0){e.activeTexture(n.TEXTURE0+V);const zt=he.getPrimaries(he.workingColorSpace),mt=E.colorSpace===di?null:he.getPrimaries(E.colorSpace),At=E.colorSpace===di||zt===mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);const bt=E.isCompressedTexture||E.image[0].isCompressedTexture,ut=E.image[0]&&E.image[0].isDataTexture,et=[];for(let it=0;it<6;it++)!bt&&!ut?et[it]=p(E.image[it],!0,s.maxCubemapSize):et[it]=ut?E.image[it].image:E.image[it],et[it]=Ot(E,et[it]);const xt=et[0],_t=r.convert(E.format,E.colorSpace),at=r.convert(E.type),Ut=M(E.internalFormat,_t,at,E.colorSpace),O=E.isVideoTexture!==!0,ft=Q.__version===void 0||J===!0,gt=rt.dataReady;let Ct=S(E,xt);Y(n.TEXTURE_CUBE_MAP,E);let lt;if(bt){O&&ft&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,Ut,xt.width,xt.height);for(let it=0;it<6;it++){lt=et[it].mipmaps;for(let Dt=0;Dt<lt.length;Dt++){const Kt=lt[Dt];E.format!==Tn?_t!==null?O?gt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,0,0,Kt.width,Kt.height,_t,Kt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,Ut,Kt.width,Kt.height,0,Kt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,0,0,Kt.width,Kt.height,_t,at,Kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,Ut,Kt.width,Kt.height,0,_t,at,Kt.data)}}}else{if(lt=E.mipmaps,O&&ft){lt.length>0&&Ct++;const it=Yt(et[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Ct,Ut,it.width,it.height)}for(let it=0;it<6;it++)if(ut){O?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,et[it].width,et[it].height,_t,at,et[it].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Ut,et[it].width,et[it].height,0,_t,at,et[it].data);for(let Dt=0;Dt<lt.length;Dt++){const xe=lt[Dt].image[it].image;O?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,0,0,xe.width,xe.height,_t,at,xe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,Ut,xe.width,xe.height,0,_t,at,xe.data)}}else{O?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,_t,at,et[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Ut,_t,at,et[it]);for(let Dt=0;Dt<lt.length;Dt++){const Kt=lt[Dt];O?gt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,0,0,_t,at,Kt.image[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,Ut,_t,at,Kt.image[it])}}}m(E)&&g(n.TEXTURE_CUBE_MAP),Q.__version=rt.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function ct(C,E,V,J,rt,Q){const zt=r.convert(V.format,V.colorSpace),mt=r.convert(V.type),At=M(V.internalFormat,zt,mt,V.colorSpace),bt=i.get(E),ut=i.get(V);if(ut.__renderTarget=E,!bt.__hasExternalTextures){const et=Math.max(1,E.width>>Q),xt=Math.max(1,E.height>>Q);rt===n.TEXTURE_3D||rt===n.TEXTURE_2D_ARRAY?e.texImage3D(rt,Q,At,et,xt,E.depth,0,zt,mt,null):e.texImage2D(rt,Q,At,et,xt,0,zt,mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,C),st(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,rt,ut.__webglTexture,0,tt(E)):(rt===n.TEXTURE_2D||rt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,rt,ut.__webglTexture,Q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function vt(C,E,V){if(n.bindRenderbuffer(n.RENDERBUFFER,C),E.depthBuffer){const J=E.depthTexture,rt=J&&J.isDepthTexture?J.type:null,Q=_(E.stencilBuffer,rt),zt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,mt=tt(E);st(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,mt,Q,E.width,E.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,mt,Q,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Q,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,zt,n.RENDERBUFFER,C)}else{const J=E.textures;for(let rt=0;rt<J.length;rt++){const Q=J[rt],zt=r.convert(Q.format,Q.colorSpace),mt=r.convert(Q.type),At=M(Q.internalFormat,zt,mt,Q.colorSpace),bt=tt(E);V&&st(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,bt,At,E.width,E.height):st(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,bt,At,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,At,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function dt(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(E.depthTexture);J.__renderTarget=E,(!J.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),Z(E.depthTexture,0);const rt=J.__webglTexture,Q=tt(E);if(E.depthTexture.format===vr)st(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0);else if(E.depthTexture.format===yr)st(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function Zt(C){const E=i.get(C),V=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const J=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){const rt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",rt)};J.addEventListener("dispose",rt),E.__depthDisposeCallback=rt}E.__boundDepthTexture=J}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const J=C.texture.mipmaps;J&&J.length>0?dt(E.__webglFramebuffer[0],C):dt(E.__webglFramebuffer,C)}else if(V){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=n.createRenderbuffer(),vt(E.__webglDepthbuffer[J],C,!1);else{const rt=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=E.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,Q)}}else{const J=C.texture.mipmaps;if(J&&J.length>0?e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),vt(E.__webglDepthbuffer,C,!1);else{const rt=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,Q)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Qt(C,E,V){const J=i.get(C);E!==void 0&&ct(J.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Zt(C)}function I(C){const E=C.texture,V=i.get(C),J=i.get(E);C.addEventListener("dispose",A);const rt=C.textures,Q=C.isWebGLCubeRenderTarget===!0,zt=rt.length>1;if(zt||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=E.version,o.memory.textures++),Q){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let At=0;At<E.mipmaps.length;At++)V.__webglFramebuffer[mt][At]=n.createFramebuffer()}else V.__webglFramebuffer[mt]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<E.mipmaps.length;mt++)V.__webglFramebuffer[mt]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(zt)for(let mt=0,At=rt.length;mt<At;mt++){const bt=i.get(rt[mt]);bt.__webglTexture===void 0&&(bt.__webglTexture=n.createTexture(),o.memory.textures++)}if(C.samples>0&&st(C)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let mt=0;mt<rt.length;mt++){const At=rt[mt];V.__webglColorRenderbuffer[mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[mt]);const bt=r.convert(At.format,At.colorSpace),ut=r.convert(At.type),et=M(At.internalFormat,bt,ut,At.colorSpace,C.isXRRenderTarget===!0),xt=tt(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,et,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+mt,n.RENDERBUFFER,V.__webglColorRenderbuffer[mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),vt(V.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Y(n.TEXTURE_CUBE_MAP,E);for(let mt=0;mt<6;mt++)if(E.mipmaps&&E.mipmaps.length>0)for(let At=0;At<E.mipmaps.length;At++)ct(V.__webglFramebuffer[mt][At],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,At);else ct(V.__webglFramebuffer[mt],C,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);m(E)&&g(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(zt){for(let mt=0,At=rt.length;mt<At;mt++){const bt=rt[mt],ut=i.get(bt);let et=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(et=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(et,ut.__webglTexture),Y(et,bt),ct(V.__webglFramebuffer,C,bt,n.COLOR_ATTACHMENT0+mt,et,0),m(bt)&&g(et)}e.unbindTexture()}else{let mt=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(mt=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(mt,J.__webglTexture),Y(mt,E),E.mipmaps&&E.mipmaps.length>0)for(let At=0;At<E.mipmaps.length;At++)ct(V.__webglFramebuffer[At],C,E,n.COLOR_ATTACHMENT0,mt,At);else ct(V.__webglFramebuffer,C,E,n.COLOR_ATTACHMENT0,mt,0);m(E)&&g(mt),e.unbindTexture()}C.depthBuffer&&Zt(C)}function Lt(C){const E=C.textures;for(let V=0,J=E.length;V<J;V++){const rt=E[V];if(m(rt)){const Q=v(C),zt=i.get(rt).__webglTexture;e.bindTexture(Q,zt),g(Q),e.unbindTexture()}}}const Ft=[],yt=[];function Tt(C){if(C.samples>0){if(st(C)===!1){const E=C.textures,V=C.width,J=C.height;let rt=n.COLOR_BUFFER_BIT;const Q=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,zt=i.get(C),mt=E.length>1;if(mt)for(let bt=0;bt<E.length;bt++)e.bindFramebuffer(n.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,zt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,zt.__webglMultisampledFramebuffer);const At=C.texture.mipmaps;At&&At.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,zt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,zt.__webglFramebuffer);for(let bt=0;bt<E.length;bt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(rt|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(rt|=n.STENCIL_BUFFER_BIT)),mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,zt.__webglColorRenderbuffer[bt]);const ut=i.get(E[bt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ut,0)}n.blitFramebuffer(0,0,V,J,0,0,V,J,rt,n.NEAREST),c===!0&&(Ft.length=0,yt.length=0,Ft.push(n.COLOR_ATTACHMENT0+bt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Ft.push(Q),yt.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,yt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ft))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),mt)for(let bt=0;bt<E.length;bt++){e.bindFramebuffer(n.FRAMEBUFFER,zt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.RENDERBUFFER,zt.__webglColorRenderbuffer[bt]);const ut=i.get(E[bt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,zt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+bt,n.TEXTURE_2D,ut,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,zt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const E=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function tt(C){return Math.min(s.maxSamples,C.samples)}function st(C){const E=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ot(C){const E=o.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function Ot(C,E){const V=C.colorSpace,J=C.format,rt=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||V!==Gs&&V!==di&&(he.getTransfer(V)===de?(J!==Tn||rt!==Bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),E}function Yt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=Z,this.setTexture2DArray=F,this.setTexture3D=T,this.setTextureCube=z,this.rebindTextures=Qt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Lt,this.updateMultisampleRenderTarget=Tt,this.setupDepthRenderbuffer=Zt,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=st}function FM(n,t){function e(i,s=di){let r;const o=he.getTransfer(s);if(i===Bn)return n.UNSIGNED_BYTE;if(i===bl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===El)return n.UNSIGNED_SHORT_5_5_5_1;if(i===gf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===xf)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===pf)return n.BYTE;if(i===mf)return n.SHORT;if(i===_r)return n.UNSIGNED_SHORT;if(i===wl)return n.INT;if(i===Zi)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===Cr)return n.HALF_FLOAT;if(i===_f)return n.ALPHA;if(i===Mf)return n.RGB;if(i===Tn)return n.RGBA;if(i===vr)return n.DEPTH_COMPONENT;if(i===yr)return n.DEPTH_STENCIL;if(i===Tl)return n.RED;if(i===Al)return n.RED_INTEGER;if(i===vf)return n.RG;if(i===Rl)return n.RG_INTEGER;if(i===Cl)return n.RGBA_INTEGER;if(i===yo||i===So||i===wo||i===bo)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===yo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===So)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===wo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===bo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===yo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===So)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===wo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===bo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Tc||i===Ac||i===Rc||i===Cc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Tc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ac)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pc||i===zc||i===Dc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Pc||i===zc)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Dc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ic||i===Lc||i===Uc||i===Nc||i===Fc||i===Oc||i===Bc||i===kc||i===Gc||i===Hc||i===Vc||i===Wc||i===Xc||i===qc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ic)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Lc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Uc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Nc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Fc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Oc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===kc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Vc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Zc||i===Yc||i===$c)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Zc)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===$c)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Kc||i===jc||i===Jc||i===Qc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Kc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===jc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Qc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Mr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const OM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,BM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class kM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Ff(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ei({vertexShader:OM,fragmentShader:BM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new Pr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class GM extends qs{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,x=null;const p=typeof XRWebGLBinding<"u",m=new kM,g={},v=e.getContextAttributes();let M=null,_=null;const S=[],w=[],A=new Rt;let P=null;const y=new En;y.viewport=new Ae;const b=new En;b.viewport=new Ae;const D=[y,b],U=new rg;let B=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let $=S[q];return $===void 0&&($=new za,S[q]=$),$.getTargetRaySpace()},this.getControllerGrip=function(q){let $=S[q];return $===void 0&&($=new za,S[q]=$),$.getGripSpace()},this.getHand=function(q){let $=S[q];return $===void 0&&($=new za,S[q]=$),$.getHandSpace()};function Z(q){const $=w.indexOf(q.inputSource);if($===-1)return;const ct=S[$];ct!==void 0&&(ct.update(q.inputSource,q.frame,l||o),ct.dispatchEvent({type:q.type,data:q.inputSource}))}function F(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",T);for(let q=0;q<S.length;q++){const $=w[q];$!==null&&(w[q]=null,S[q].disconnect($))}B=null,G=null,m.reset();for(const q in g)delete g[q];t.setRenderTarget(M),d=null,f=null,u=null,s=null,_=null,Et.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&p&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",F),s.addEventListener("inputsourceschange",T),v.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(A),p&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,vt=null,dt=null;v.depth&&(dt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=v.stencil?yr:vr,vt=v.stencil?Mr:Zi);const Zt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Zt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Yi(f.textureWidth,f.textureHeight,{format:Tn,type:Bn,depthTexture:new Nf(f.textureWidth,f.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ct={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Yi(d.framebufferWidth,d.framebufferHeight,{format:Tn,type:Bn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function T(q){for(let $=0;$<q.removed.length;$++){const ct=q.removed[$],vt=w.indexOf(ct);vt>=0&&(w[vt]=null,S[vt].disconnect(ct))}for(let $=0;$<q.added.length;$++){const ct=q.added[$];let vt=w.indexOf(ct);if(vt===-1){for(let Zt=0;Zt<S.length;Zt++)if(Zt>=w.length){w.push(ct),vt=Zt;break}else if(w[Zt]===null){w[Zt]=ct,vt=Zt;break}if(vt===-1)break}const dt=S[vt];dt&&dt.connect(ct)}}const z=new L,k=new L;function H(q,$,ct){z.setFromMatrixPosition($.matrixWorld),k.setFromMatrixPosition(ct.matrixWorld);const vt=z.distanceTo(k),dt=$.projectionMatrix.elements,Zt=ct.projectionMatrix.elements,Qt=dt[14]/(dt[10]-1),I=dt[14]/(dt[10]+1),Lt=(dt[9]+1)/dt[5],Ft=(dt[9]-1)/dt[5],yt=(dt[8]-1)/dt[0],Tt=(Zt[8]+1)/Zt[0],tt=Qt*yt,st=Qt*Tt,ot=vt/(-yt+Tt),Ot=ot*-yt;if($.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Ot),q.translateZ(ot),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),dt[10]===-1)q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const Yt=Qt+ot,C=I+ot,E=tt-Ot,V=st+(vt-Ot),J=Lt*I/C*Yt,rt=Ft*I/C*Yt;q.projectionMatrix.makePerspective(E,V,J,rt,Yt,C),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function N(q,$){$===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices($.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let $=q.near,ct=q.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(ct=m.depthFar)),U.near=b.near=y.near=$,U.far=b.far=y.far=ct,(B!==U.near||G!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),B=U.near,G=U.far),U.layers.mask=q.layers.mask|6,y.layers.mask=U.layers.mask&3,b.layers.mask=U.layers.mask&5;const vt=q.parent,dt=U.cameras;N(U,vt);for(let Zt=0;Zt<dt.length;Zt++)N(dt[Zt],vt);dt.length===2?H(U,y,b):U.projectionMatrix.copy(y.projectionMatrix),Y(q,U,vt)};function Y(q,$,ct){ct===null?q.matrix.copy($.matrixWorld):(q.matrix.copy(ct.matrixWorld),q.matrix.invert(),q.matrix.multiply($.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=el*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(q){return g[q]};let nt=null;function ht(q,$){if(h=$.getViewerPose(l||o),x=$,h!==null){const ct=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let vt=!1;ct.length!==U.cameras.length&&(U.cameras.length=0,vt=!0);for(let I=0;I<ct.length;I++){const Lt=ct[I];let Ft=null;if(d!==null)Ft=d.getViewport(Lt);else{const Tt=u.getViewSubImage(f,Lt);Ft=Tt.viewport,I===0&&(t.setRenderTargetTextures(_,Tt.colorTexture,Tt.depthStencilTexture),t.setRenderTarget(_))}let yt=D[I];yt===void 0&&(yt=new En,yt.layers.enable(I),yt.viewport=new Ae,D[I]=yt),yt.matrix.fromArray(Lt.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(Lt.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),I===0&&(U.matrix.copy(yt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),vt===!0&&U.cameras.push(yt)}const dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&p){u=i.getBinding();const I=u.getDepthInformation(ct[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(dt&&dt.includes("camera-access")&&p){t.state.unbindTexture(),u=i.getBinding();for(let I=0;I<ct.length;I++){const Lt=ct[I].camera;if(Lt){let Ft=g[Lt];Ft||(Ft=new Ff,g[Lt]=Ft);const yt=u.getCameraImage(Lt);Ft.sourceTexture=yt}}}}for(let ct=0;ct<S.length;ct++){const vt=w[ct],dt=S[ct];vt!==null&&dt!==void 0&&dt.update(vt,$,l||o)}nt&&nt(q,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),x=null}const Et=new Zf;Et.setAnimationLoop(ht),this.setAnimationLoop=function(q){nt=q},this.dispose=function(){}}}const Ni=new An,HM=new ie;function VM(n,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function i(m,g){g.color.getRGB(m.fogColor.value,Pf(n)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,v,M,_){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(m,g):g.isMeshToonMaterial?(r(m,g),u(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g)):g.isMeshStandardMaterial?(r(m,g),f(m,g),g.isMeshPhysicalMaterial&&d(m,g,_)):g.isMeshMatcapMaterial?(r(m,g),x(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),p(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?c(m,g,v,M):g.isSpriteMaterial?l(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Qe&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Qe&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const v=t.get(g),M=v.envMap,_=v.envMapRotation;M&&(m.envMap.value=M,Ni.copy(_),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),m.envMapRotation.value.setFromMatrix4(HM.makeRotationFromEuler(Ni)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function c(m,g,v,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=M*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function l(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function u(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function f(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function d(m,g,v){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Qe&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,g){g.matcap&&(m.matcap.value=g.matcap)}function p(m,g){const v=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function WM(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const _=M.program;i.uniformBlockBinding(v,_)}function l(v,M){let _=s[v.id];_===void 0&&(x(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",m));const S=M.program;i.updateUBOMapping(v,S);const w=t.render.frame;r[v.id]!==w&&(f(v),r[v.id]=w)}function h(v){const M=u();v.__bindingPointIndex=M;const _=n.createBuffer(),S=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,S,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const M=s[v.id],_=v.uniforms,S=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let w=0,A=_.length;w<A;w++){const P=Array.isArray(_[w])?_[w]:[_[w]];for(let y=0,b=P.length;y<b;y++){const D=P[y];if(d(D,w,y,S)===!0){const U=D.__offset,B=Array.isArray(D.value)?D.value:[D.value];let G=0;for(let Z=0;Z<B.length;Z++){const F=B[Z],T=p(F);typeof F=="number"||typeof F=="boolean"?(D.__data[0]=F,n.bufferSubData(n.UNIFORM_BUFFER,U+G,D.__data)):F.isMatrix3?(D.__data[0]=F.elements[0],D.__data[1]=F.elements[1],D.__data[2]=F.elements[2],D.__data[3]=0,D.__data[4]=F.elements[3],D.__data[5]=F.elements[4],D.__data[6]=F.elements[5],D.__data[7]=0,D.__data[8]=F.elements[6],D.__data[9]=F.elements[7],D.__data[10]=F.elements[8],D.__data[11]=0):(F.toArray(D.__data,G),G+=T.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,M,_,S){const w=v.value,A=M+"_"+_;if(S[A]===void 0)return typeof w=="number"||typeof w=="boolean"?S[A]=w:S[A]=w.clone(),!0;{const P=S[A];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return S[A]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function x(v){const M=v.uniforms;let _=0;const S=16;for(let A=0,P=M.length;A<P;A++){const y=Array.isArray(M[A])?M[A]:[M[A]];for(let b=0,D=y.length;b<D;b++){const U=y[b],B=Array.isArray(U.value)?U.value:[U.value];for(let G=0,Z=B.length;G<Z;G++){const F=B[G],T=p(F),z=_%S,k=z%T.boundary,H=z+k;_+=k,H!==0&&S-H<T.storage&&(_+=S-H),U.__data=new Float32Array(T.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=_,_+=T.storage}}}const w=_%S;return w>0&&(_+=S-w),v.__size=_,v.__cache={},this}function p(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function m(v){const M=v.target;M.removeEventListener("dispose",m);const _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function g(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:g}}class XM{constructor(t={}){const{canvas:e=Gp(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const x=new Uint32Array(4),p=new Int32Array(4);let m=null,g=null;const v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let S=!1;this._outputColorSpace=Le;let w=0,A=0,P=null,y=-1,b=null;const D=new Ae,U=new Ae;let B=null;const G=new Xt(0);let Z=0,F=e.width,T=e.height,z=1,k=null,H=null;const N=new Ae(0,0,F,T),Y=new Ae(0,0,F,T);let nt=!1;const ht=new Xo;let Et=!1,q=!1;const $=new ie,ct=new L,vt=new Ae,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Zt=!1;function Qt(){return P===null?z:1}let I=i;function Lt(R,W){return e.getContext(R,W)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sl}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",lt,!1),I===null){const W="webgl2";if(I=Lt(W,R),I===null)throw Lt(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Ft,yt,Tt,tt,st,ot,Ot,Yt,C,E,V,J,rt,Q,zt,mt,At,bt,ut,et,xt,_t,at,Ut;function O(){Ft=new e_(I),Ft.init(),_t=new FM(I,Ft),yt=new Yx(I,Ft,t,_t),Tt=new UM(I,Ft),yt.reversedDepthBuffer&&f&&Tt.buffers.depth.setReversed(!0),tt=new s_(I),st=new SM,ot=new NM(I,Ft,Tt,st,yt,_t,tt),Ot=new Kx(_),Yt=new t_(_),C=new hg(I),at=new qx(I,C),E=new n_(I,C,tt,at),V=new o_(I,E,C,tt),ut=new r_(I,yt,ot),mt=new $x(st),J=new yM(_,Ot,Yt,Ft,yt,at,mt),rt=new VM(_,st),Q=new bM,zt=new PM(Ft),bt=new Xx(_,Ot,Yt,Tt,V,d,c),At=new IM(_,V,yt),Ut=new WM(I,tt,yt,Tt),et=new Zx(I,Ft,tt),xt=new i_(I,Ft,tt),tt.programs=J.programs,_.capabilities=yt,_.extensions=Ft,_.properties=st,_.renderLists=Q,_.shadowMap=At,_.state=Tt,_.info=tt}O();const ft=new GM(_,I);this.xr=ft,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Ft.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Ft.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(R){R!==void 0&&(z=R,this.setSize(F,T,!1))},this.getSize=function(R){return R.set(F,T)},this.setSize=function(R,W,K=!0){if(ft.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=R,T=W,e.width=Math.floor(R*z),e.height=Math.floor(W*z),K===!0&&(e.style.width=R+"px",e.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(F*z,T*z).floor()},this.setDrawingBufferSize=function(R,W,K){F=R,T=W,z=K,e.width=Math.floor(R*K),e.height=Math.floor(W*K),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(D)},this.getViewport=function(R){return R.copy(N)},this.setViewport=function(R,W,K,j){R.isVector4?N.set(R.x,R.y,R.z,R.w):N.set(R,W,K,j),Tt.viewport(D.copy(N).multiplyScalar(z).round())},this.getScissor=function(R){return R.copy(Y)},this.setScissor=function(R,W,K,j){R.isVector4?Y.set(R.x,R.y,R.z,R.w):Y.set(R,W,K,j),Tt.scissor(U.copy(Y).multiplyScalar(z).round())},this.getScissorTest=function(){return nt},this.setScissorTest=function(R){Tt.setScissorTest(nt=R)},this.setOpaqueSort=function(R){k=R},this.setTransparentSort=function(R){H=R},this.getClearColor=function(R){return R.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor(...arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,K=!0){let j=0;if(R){let X=!1;if(P!==null){const pt=P.texture.format;X=pt===Cl||pt===Rl||pt===Al}if(X){const pt=P.texture.type,wt=pt===Bn||pt===Zi||pt===_r||pt===Mr||pt===bl||pt===El,It=bt.getClearColor(),Pt=bt.getClearAlpha(),Vt=It.r,$t=It.g,Bt=It.b;wt?(x[0]=Vt,x[1]=$t,x[2]=Bt,x[3]=Pt,I.clearBufferuiv(I.COLOR,0,x)):(p[0]=Vt,p[1]=$t,p[2]=Bt,p[3]=Pt,I.clearBufferiv(I.COLOR,0,p))}else j|=I.COLOR_BUFFER_BIT}W&&(j|=I.DEPTH_BUFFER_BIT),K&&(j|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),bt.dispose(),Q.dispose(),zt.dispose(),st.dispose(),Ot.dispose(),Yt.dispose(),V.dispose(),at.dispose(),Ut.dispose(),J.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",Rn),ft.removeEventListener("sessionend",ih),Ci.stop()};function gt(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const R=tt.autoReset,W=At.enabled,K=At.autoUpdate,j=At.needsUpdate,X=At.type;O(),tt.autoReset=R,At.enabled=W,At.autoUpdate=K,At.needsUpdate=j,At.type=X}function lt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function it(R){const W=R.target;W.removeEventListener("dispose",it),Dt(W)}function Dt(R){Kt(R),st.remove(R)}function Kt(R){const W=st.get(R).programs;W!==void 0&&(W.forEach(function(K){J.releaseProgram(K)}),R.isShaderMaterial&&J.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,K,j,X,pt){W===null&&(W=dt);const wt=X.isMesh&&X.matrixWorld.determinant()<0,It=zd(R,W,K,j,X);Tt.setMaterial(j,wt);let Pt=K.index,Vt=1;if(j.wireframe===!0){if(Pt=E.getWireframeAttribute(K),Pt===void 0)return;Vt=2}const $t=K.drawRange,Bt=K.attributes.position;let se=$t.start*Vt,fe=($t.start+$t.count)*Vt;pt!==null&&(se=Math.max(se,pt.start*Vt),fe=Math.min(fe,(pt.start+pt.count)*Vt)),Pt!==null?(se=Math.max(se,0),fe=Math.min(fe,Pt.count)):Bt!=null&&(se=Math.max(se,0),fe=Math.min(fe,Bt.count));const Ee=fe-se;if(Ee<0||Ee===1/0)return;at.setup(X,j,It,K,Pt);let Me,ge=et;if(Pt!==null&&(Me=C.get(Pt),ge=xt,ge.setIndex(Me)),X.isMesh)j.wireframe===!0?(Tt.setLineWidth(j.wireframeLinewidth*Qt()),ge.setMode(I.LINES)):ge.setMode(I.TRIANGLES);else if(X.isLine){let Gt=j.linewidth;Gt===void 0&&(Gt=1),Tt.setLineWidth(Gt*Qt()),X.isLineSegments?ge.setMode(I.LINES):X.isLineLoop?ge.setMode(I.LINE_LOOP):ge.setMode(I.LINE_STRIP)}else X.isPoints?ge.setMode(I.POINTS):X.isSprite&&ge.setMode(I.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)Sr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ge.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))ge.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Gt=X._multiDrawStarts,ye=X._multiDrawCounts,le=X._multiDrawCount,en=Pt?C.get(Pt).bytesPerElement:1,is=st.get(j).currentProgram.getUniforms();for(let nn=0;nn<le;nn++)is.setValue(I,"_gl_DrawID",nn),ge.render(Gt[nn]/en,ye[nn])}else if(X.isInstancedMesh)ge.renderInstances(se,Ee,X.count);else if(K.isInstancedBufferGeometry){const Gt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ye=Math.min(K.instanceCount,Gt);ge.renderInstances(se,Ee,ye)}else ge.render(se,Ee)};function xe(R,W,K){R.transparent===!0&&R.side===ze&&R.forceSinglePass===!1?(R.side=Qe,R.needsUpdate=!0,Lr(R,W,K),R.side=bi,R.needsUpdate=!0,Lr(R,W,K),R.side=ze):Lr(R,W,K)}this.compile=function(R,W,K=null){K===null&&(K=R),g=zt.get(K),g.init(W),M.push(g),K.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),R!==K&&R.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),g.setupLights();const j=new Set;return R.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const pt=X.material;if(pt)if(Array.isArray(pt))for(let wt=0;wt<pt.length;wt++){const It=pt[wt];xe(It,K,X),j.add(It)}else xe(pt,K,X),j.add(pt)}),g=M.pop(),j},this.compileAsync=function(R,W,K=null){const j=this.compile(R,W,K);return new Promise(X=>{function pt(){if(j.forEach(function(wt){st.get(wt).currentProgram.isReady()&&j.delete(wt)}),j.size===0){X(R);return}setTimeout(pt,10)}Ft.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let ue=null;function Hn(R){ue&&ue(R)}function Rn(){Ci.stop()}function ih(){Ci.start()}const Ci=new Zf;Ci.setAnimationLoop(Hn),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(R){ue=R,ft.setAnimationLoop(R),R===null?Ci.stop():Ci.start()},ft.addEventListener("sessionstart",Rn),ft.addEventListener("sessionend",ih),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(W),W=ft.getCamera()),R.isScene===!0&&R.onBeforeRender(_,R,W,P),g=zt.get(R,M.length),g.init(W),M.push(g),$.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ht.setFromProjectionMatrix($,Un,W.reversedDepth),q=this.localClippingEnabled,Et=mt.init(this.clippingPlanes,q),m=Q.get(R,v.length),m.init(),v.push(m),ft.enabled===!0&&ft.isPresenting===!0){const pt=_.xr.getDepthSensingMesh();pt!==null&&oa(pt,W,-1/0,_.sortObjects)}oa(R,W,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(k,H),Zt=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,Zt&&bt.addToRenderList(m,R),this.info.render.frame++,Et===!0&&mt.beginShadows();const K=g.state.shadowsArray;At.render(K,R,W),Et===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,X=m.transmissive;if(g.setupLights(),W.isArrayCamera){const pt=W.cameras;if(X.length>0)for(let wt=0,It=pt.length;wt<It;wt++){const Pt=pt[wt];rh(j,X,R,Pt)}Zt&&bt.render(R);for(let wt=0,It=pt.length;wt<It;wt++){const Pt=pt[wt];sh(m,R,Pt,Pt.viewport)}}else X.length>0&&rh(j,X,R,W),Zt&&bt.render(R),sh(m,R,W);P!==null&&A===0&&(ot.updateMultisampleRenderTarget(P),ot.updateRenderTargetMipmap(P)),R.isScene===!0&&R.onAfterRender(_,R,W),at.resetDefaultState(),y=-1,b=null,M.pop(),M.length>0?(g=M[M.length-1],Et===!0&&mt.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function oa(R,W,K,j){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)g.pushLight(R),R.castShadow&&g.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ht.intersectsSprite(R)){j&&vt.setFromMatrixPosition(R.matrixWorld).applyMatrix4($);const wt=V.update(R),It=R.material;It.visible&&m.push(R,wt,It,K,vt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ht.intersectsObject(R))){const wt=V.update(R),It=R.material;if(j&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),vt.copy(R.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),vt.copy(wt.boundingSphere.center)),vt.applyMatrix4(R.matrixWorld).applyMatrix4($)),Array.isArray(It)){const Pt=wt.groups;for(let Vt=0,$t=Pt.length;Vt<$t;Vt++){const Bt=Pt[Vt],se=It[Bt.materialIndex];se&&se.visible&&m.push(R,wt,se,K,vt.z,Bt)}}else It.visible&&m.push(R,wt,It,K,vt.z,null)}}const pt=R.children;for(let wt=0,It=pt.length;wt<It;wt++)oa(pt[wt],W,K,j)}function sh(R,W,K,j){const X=R.opaque,pt=R.transmissive,wt=R.transparent;g.setupLightsView(K),Et===!0&&mt.setGlobalState(_.clippingPlanes,K),j&&Tt.viewport(D.copy(j)),X.length>0&&Ir(X,W,K),pt.length>0&&Ir(pt,W,K),wt.length>0&&Ir(wt,W,K),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function rh(R,W,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[j.id]===void 0&&(g.state.transmissionRenderTarget[j.id]=new Yi(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?Cr:Bn,minFilter:Vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:he.workingColorSpace}));const pt=g.state.transmissionRenderTarget[j.id],wt=j.viewport||D;pt.setSize(wt.z*_.transmissionResolutionScale,wt.w*_.transmissionResolutionScale);const It=_.getRenderTarget(),Pt=_.getActiveCubeFace(),Vt=_.getActiveMipmapLevel();_.setRenderTarget(pt),_.getClearColor(G),Z=_.getClearAlpha(),Z<1&&_.setClearColor(16777215,.5),_.clear(),Zt&&bt.render(K);const $t=_.toneMapping;_.toneMapping=xi;const Bt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),g.setupLightsView(j),Et===!0&&mt.setGlobalState(_.clippingPlanes,j),Ir(R,K,j),ot.updateMultisampleRenderTarget(pt),ot.updateRenderTargetMipmap(pt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let se=!1;for(let fe=0,Ee=W.length;fe<Ee;fe++){const Me=W[fe],ge=Me.object,Gt=Me.geometry,ye=Me.material,le=Me.group;if(ye.side===ze&&ge.layers.test(j.layers)){const en=ye.side;ye.side=Qe,ye.needsUpdate=!0,oh(ge,K,j,Gt,ye,le),ye.side=en,ye.needsUpdate=!0,se=!0}}se===!0&&(ot.updateMultisampleRenderTarget(pt),ot.updateRenderTargetMipmap(pt))}_.setRenderTarget(It,Pt,Vt),_.setClearColor(G,Z),Bt!==void 0&&(j.viewport=Bt),_.toneMapping=$t}function Ir(R,W,K){const j=W.isScene===!0?W.overrideMaterial:null;for(let X=0,pt=R.length;X<pt;X++){const wt=R[X],It=wt.object,Pt=wt.geometry,Vt=wt.group;let $t=wt.material;$t.allowOverride===!0&&j!==null&&($t=j),It.layers.test(K.layers)&&oh(It,W,K,Pt,$t,Vt)}}function oh(R,W,K,j,X,pt){R.onBeforeRender(_,W,K,j,X,pt),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),X.onBeforeRender(_,W,K,j,R,pt),X.transparent===!0&&X.side===ze&&X.forceSinglePass===!1?(X.side=Qe,X.needsUpdate=!0,_.renderBufferDirect(K,W,j,X,R,pt),X.side=bi,X.needsUpdate=!0,_.renderBufferDirect(K,W,j,X,R,pt),X.side=ze):_.renderBufferDirect(K,W,j,X,R,pt),R.onAfterRender(_,W,K,j,X,pt)}function Lr(R,W,K){W.isScene!==!0&&(W=dt);const j=st.get(R),X=g.state.lights,pt=g.state.shadowsArray,wt=X.state.version,It=J.getParameters(R,X.state,pt,W,K),Pt=J.getProgramCacheKey(It);let Vt=j.programs;j.environment=R.isMeshStandardMaterial?W.environment:null,j.fog=W.fog,j.envMap=(R.isMeshStandardMaterial?Yt:Ot).get(R.envMap||j.environment),j.envMapRotation=j.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,Vt===void 0&&(R.addEventListener("dispose",it),Vt=new Map,j.programs=Vt);let $t=Vt.get(Pt);if($t!==void 0){if(j.currentProgram===$t&&j.lightsStateVersion===wt)return ch(R,It),$t}else It.uniforms=J.getUniforms(R),R.onBeforeCompile(It,_),$t=J.acquireProgram(It,Pt),Vt.set(Pt,$t),j.uniforms=It.uniforms;const Bt=j.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Bt.clippingPlanes=mt.uniform),ch(R,It),j.needsLights=Id(R),j.lightsStateVersion=wt,j.needsLights&&(Bt.ambientLightColor.value=X.state.ambient,Bt.lightProbe.value=X.state.probe,Bt.directionalLights.value=X.state.directional,Bt.directionalLightShadows.value=X.state.directionalShadow,Bt.spotLights.value=X.state.spot,Bt.spotLightShadows.value=X.state.spotShadow,Bt.rectAreaLights.value=X.state.rectArea,Bt.ltc_1.value=X.state.rectAreaLTC1,Bt.ltc_2.value=X.state.rectAreaLTC2,Bt.pointLights.value=X.state.point,Bt.pointLightShadows.value=X.state.pointShadow,Bt.hemisphereLights.value=X.state.hemi,Bt.directionalShadowMap.value=X.state.directionalShadowMap,Bt.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Bt.spotShadowMap.value=X.state.spotShadowMap,Bt.spotLightMatrix.value=X.state.spotLightMatrix,Bt.spotLightMap.value=X.state.spotLightMap,Bt.pointShadowMap.value=X.state.pointShadowMap,Bt.pointShadowMatrix.value=X.state.pointShadowMatrix),j.currentProgram=$t,j.uniformsList=null,$t}function ah(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=Eo.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function ch(R,W){const K=st.get(R);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.batchingColor=W.batchingColor,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.instancingMorph=W.instancingMorph,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function zd(R,W,K,j,X){W.isScene!==!0&&(W=dt),ot.resetTextureUnits();const pt=W.fog,wt=j.isMeshStandardMaterial?W.environment:null,It=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Gs,Pt=(j.isMeshStandardMaterial?Yt:Ot).get(j.envMap||wt),Vt=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,$t=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Bt=!!K.morphAttributes.position,se=!!K.morphAttributes.normal,fe=!!K.morphAttributes.color;let Ee=xi;j.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Ee=_.toneMapping);const Me=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ge=Me!==void 0?Me.length:0,Gt=st.get(j),ye=g.state.lights;if(Et===!0&&(q===!0||R!==b)){const qe=R===b&&j.id===y;mt.setState(j,R,qe)}let le=!1;j.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==ye.state.version||Gt.outputColorSpace!==It||X.isBatchedMesh&&Gt.batching===!1||!X.isBatchedMesh&&Gt.batching===!0||X.isBatchedMesh&&Gt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Gt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Gt.instancing===!1||!X.isInstancedMesh&&Gt.instancing===!0||X.isSkinnedMesh&&Gt.skinning===!1||!X.isSkinnedMesh&&Gt.skinning===!0||X.isInstancedMesh&&Gt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Gt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Gt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Gt.instancingMorph===!1&&X.morphTexture!==null||Gt.envMap!==Pt||j.fog===!0&&Gt.fog!==pt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==mt.numPlanes||Gt.numIntersection!==mt.numIntersection)||Gt.vertexAlphas!==Vt||Gt.vertexTangents!==$t||Gt.morphTargets!==Bt||Gt.morphNormals!==se||Gt.morphColors!==fe||Gt.toneMapping!==Ee||Gt.morphTargetsCount!==ge)&&(le=!0):(le=!0,Gt.__version=j.version);let en=Gt.currentProgram;le===!0&&(en=Lr(j,W,X));let is=!1,nn=!1,$s=!1;const Se=en.getUniforms(),pn=Gt.uniforms;if(Tt.useProgram(en.program)&&(is=!0,nn=!0,$s=!0),j.id!==y&&(y=j.id,nn=!0),is||b!==R){Tt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Se.setValue(I,"projectionMatrix",R.projectionMatrix),Se.setValue(I,"viewMatrix",R.matrixWorldInverse);const Ke=Se.map.cameraPosition;Ke!==void 0&&Ke.setValue(I,ct.setFromMatrixPosition(R.matrixWorld)),yt.logarithmicDepthBuffer&&Se.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Se.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,nn=!0,$s=!0)}if(X.isSkinnedMesh){Se.setOptional(I,X,"bindMatrix"),Se.setOptional(I,X,"bindMatrixInverse");const qe=X.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),Se.setValue(I,"boneTexture",qe.boneTexture,ot))}X.isBatchedMesh&&(Se.setOptional(I,X,"batchingTexture"),Se.setValue(I,"batchingTexture",X._matricesTexture,ot),Se.setOptional(I,X,"batchingIdTexture"),Se.setValue(I,"batchingIdTexture",X._indirectTexture,ot),Se.setOptional(I,X,"batchingColorTexture"),X._colorsTexture!==null&&Se.setValue(I,"batchingColorTexture",X._colorsTexture,ot));const mn=K.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&ut.update(X,K,en),(nn||Gt.receiveShadow!==X.receiveShadow)&&(Gt.receiveShadow=X.receiveShadow,Se.setValue(I,"receiveShadow",X.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(pn.envMap.value=Pt,pn.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&W.environment!==null&&(pn.envMapIntensity.value=W.environmentIntensity),nn&&(Se.setValue(I,"toneMappingExposure",_.toneMappingExposure),Gt.needsLights&&Dd(pn,$s),pt&&j.fog===!0&&rt.refreshFogUniforms(pn,pt),rt.refreshMaterialUniforms(pn,j,z,T,g.state.transmissionRenderTarget[R.id]),Eo.upload(I,ah(Gt),pn,ot)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Eo.upload(I,ah(Gt),pn,ot),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Se.setValue(I,"center",X.center),Se.setValue(I,"modelViewMatrix",X.modelViewMatrix),Se.setValue(I,"normalMatrix",X.normalMatrix),Se.setValue(I,"modelMatrix",X.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const qe=j.uniformsGroups;for(let Ke=0,aa=qe.length;Ke<aa;Ke++){const Pi=qe[Ke];Ut.update(Pi,en),Ut.bind(Pi,en)}}return en}function Dd(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Id(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(R,W,K){const j=st.get(R);j.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),st.get(R.texture).__webglTexture=W,st.get(R.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:K,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,W){const K=st.get(R);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0};const Ld=I.createFramebuffer();this.setRenderTarget=function(R,W=0,K=0){P=R,w=W,A=K;let j=!0,X=null,pt=!1,wt=!1;if(R){const Pt=st.get(R);if(Pt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(I.FRAMEBUFFER,null),j=!1;else if(Pt.__webglFramebuffer===void 0)ot.setupRenderTarget(R);else if(Pt.__hasExternalTextures)ot.rebindTextures(R,st.get(R.texture).__webglTexture,st.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Bt=R.depthTexture;if(Pt.__boundDepthTexture!==Bt){if(Bt!==null&&st.has(Bt)&&(R.width!==Bt.image.width||R.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ot.setupDepthRenderbuffer(R)}}const Vt=R.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(wt=!0);const $t=st.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray($t[W])?X=$t[W][K]:X=$t[W],pt=!0):R.samples>0&&ot.useMultisampledRTT(R)===!1?X=st.get(R).__webglMultisampledFramebuffer:Array.isArray($t)?X=$t[K]:X=$t,D.copy(R.viewport),U.copy(R.scissor),B=R.scissorTest}else D.copy(N).multiplyScalar(z).floor(),U.copy(Y).multiplyScalar(z).floor(),B=nt;if(K!==0&&(X=Ld),Tt.bindFramebuffer(I.FRAMEBUFFER,X)&&j&&Tt.drawBuffers(R,X),Tt.viewport(D),Tt.scissor(U),Tt.setScissorTest(B),pt){const Pt=st.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+W,Pt.__webglTexture,K)}else if(wt){const Pt=W;for(let Vt=0;Vt<R.textures.length;Vt++){const $t=st.get(R.textures[Vt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Vt,$t.__webglTexture,K,Pt)}}else if(R!==null&&K!==0){const Pt=st.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Pt.__webglTexture,K)}y=-1},this.readRenderTargetPixels=function(R,W,K,j,X,pt,wt,It=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=st.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&wt!==void 0&&(Pt=Pt[wt]),Pt){Tt.bindFramebuffer(I.FRAMEBUFFER,Pt);try{const Vt=R.textures[It],$t=Vt.format,Bt=Vt.type;if(!yt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!yt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-j&&K>=0&&K<=R.height-X&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+It),I.readPixels(W,K,j,X,_t.convert($t),_t.convert(Bt),pt))}finally{const Vt=P!==null?st.get(P).__webglFramebuffer:null;Tt.bindFramebuffer(I.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(R,W,K,j,X,pt,wt,It=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=st.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&wt!==void 0&&(Pt=Pt[wt]),Pt)if(W>=0&&W<=R.width-j&&K>=0&&K<=R.height-X){Tt.bindFramebuffer(I.FRAMEBUFFER,Pt);const Vt=R.textures[It],$t=Vt.format,Bt=Vt.type;if(!yt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!yt.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const se=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,se),I.bufferData(I.PIXEL_PACK_BUFFER,pt.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+It),I.readPixels(W,K,j,X,_t.convert($t),_t.convert(Bt),0);const fe=P!==null?st.get(P).__webglFramebuffer:null;Tt.bindFramebuffer(I.FRAMEBUFFER,fe);const Ee=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Hp(I,Ee,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,se),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,pt),I.deleteBuffer(se),I.deleteSync(Ee),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,W=null,K=0){const j=Math.pow(2,-K),X=Math.floor(R.image.width*j),pt=Math.floor(R.image.height*j),wt=W!==null?W.x:0,It=W!==null?W.y:0;ot.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,K,0,0,wt,It,X,pt),Tt.unbindTexture()};const Ud=I.createFramebuffer(),Nd=I.createFramebuffer();this.copyTextureToTexture=function(R,W,K=null,j=null,X=0,pt=null){pt===null&&(X!==0?(Sr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pt=X,X=0):pt=0);let wt,It,Pt,Vt,$t,Bt,se,fe,Ee;const Me=R.isCompressedTexture?R.mipmaps[pt]:R.image;if(K!==null)wt=K.max.x-K.min.x,It=K.max.y-K.min.y,Pt=K.isBox3?K.max.z-K.min.z:1,Vt=K.min.x,$t=K.min.y,Bt=K.isBox3?K.min.z:0;else{const mn=Math.pow(2,-X);wt=Math.floor(Me.width*mn),It=Math.floor(Me.height*mn),R.isDataArrayTexture?Pt=Me.depth:R.isData3DTexture?Pt=Math.floor(Me.depth*mn):Pt=1,Vt=0,$t=0,Bt=0}j!==null?(se=j.x,fe=j.y,Ee=j.z):(se=0,fe=0,Ee=0);const ge=_t.convert(W.format),Gt=_t.convert(W.type);let ye;W.isData3DTexture?(ot.setTexture3D(W,0),ye=I.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ot.setTexture2DArray(W,0),ye=I.TEXTURE_2D_ARRAY):(ot.setTexture2D(W,0),ye=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,W.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,W.unpackAlignment);const le=I.getParameter(I.UNPACK_ROW_LENGTH),en=I.getParameter(I.UNPACK_IMAGE_HEIGHT),is=I.getParameter(I.UNPACK_SKIP_PIXELS),nn=I.getParameter(I.UNPACK_SKIP_ROWS),$s=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Me.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Me.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Vt),I.pixelStorei(I.UNPACK_SKIP_ROWS,$t),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Bt);const Se=R.isDataArrayTexture||R.isData3DTexture,pn=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const mn=st.get(R),qe=st.get(W),Ke=st.get(mn.__renderTarget),aa=st.get(qe.__renderTarget);Tt.bindFramebuffer(I.READ_FRAMEBUFFER,Ke.__webglFramebuffer),Tt.bindFramebuffer(I.DRAW_FRAMEBUFFER,aa.__webglFramebuffer);for(let Pi=0;Pi<Pt;Pi++)Se&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,st.get(R).__webglTexture,X,Bt+Pi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,st.get(W).__webglTexture,pt,Ee+Pi)),I.blitFramebuffer(Vt,$t,wt,It,se,fe,wt,It,I.DEPTH_BUFFER_BIT,I.NEAREST);Tt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(X!==0||R.isRenderTargetTexture||st.has(R)){const mn=st.get(R),qe=st.get(W);Tt.bindFramebuffer(I.READ_FRAMEBUFFER,Ud),Tt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Nd);for(let Ke=0;Ke<Pt;Ke++)Se?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,mn.__webglTexture,X,Bt+Ke):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,mn.__webglTexture,X),pn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,qe.__webglTexture,pt,Ee+Ke):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,qe.__webglTexture,pt),X!==0?I.blitFramebuffer(Vt,$t,wt,It,se,fe,wt,It,I.COLOR_BUFFER_BIT,I.NEAREST):pn?I.copyTexSubImage3D(ye,pt,se,fe,Ee+Ke,Vt,$t,wt,It):I.copyTexSubImage2D(ye,pt,se,fe,Vt,$t,wt,It);Tt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else pn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(ye,pt,se,fe,Ee,wt,It,Pt,ge,Gt,Me.data):W.isCompressedArrayTexture?I.compressedTexSubImage3D(ye,pt,se,fe,Ee,wt,It,Pt,ge,Me.data):I.texSubImage3D(ye,pt,se,fe,Ee,wt,It,Pt,ge,Gt,Me):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,pt,se,fe,wt,It,ge,Gt,Me.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,pt,se,fe,Me.width,Me.height,ge,Me.data):I.texSubImage2D(I.TEXTURE_2D,pt,se,fe,wt,It,ge,Gt,Me);I.pixelStorei(I.UNPACK_ROW_LENGTH,le),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,en),I.pixelStorei(I.UNPACK_SKIP_PIXELS,is),I.pixelStorei(I.UNPACK_SKIP_ROWS,nn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,$s),pt===0&&W.generateMipmaps&&I.generateMipmap(ye),Tt.unbindTexture()},this.initRenderTarget=function(R){st.get(R).__webglFramebuffer===void 0&&ot.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ot.setTextureCube(R,0):R.isData3DTexture?ot.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ot.setTexture2DArray(R,0):ot.setTexture2D(R,0),Tt.unbindTexture()},this.resetState=function(){w=0,A=0,P=null,Tt.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=he._getDrawingBufferColorSpace(t),e.unpackColorSpace=he._getUnpackColorSpace()}}function qM(n){let t=n>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}function To(n,t){return Math.hypot(n.x-t.x,n.z-t.z)}function Jf(n,t,e){const i=e.x-t.x,s=e.z-t.z,r=Math.max(0,Math.min(1,((n.x-t.x)*i+(n.z-t.z)*s)/(i*i+s*s||1)));return Math.hypot(n.x-t.x-i*r,n.z-t.z-s*r)}function bu(n,t){let e=1/0;for(let i=1;i<(t||[]).length;i++)e=Math.min(e,Jf(n,t[i-1],t[i]));return e}function Eu(n,t,e=.8){const i=n.bounds,s=n.target,r=n.spawn;return!(t.x<i.minX+2||t.x>i.maxX-2||t.z<i.minZ+2||t.z>i.maxZ-2||!ae(n,t.x,t.z,e)||r&&To(t,r)<14||s&&To(t,s)<(s.radius||5)+11||(n.roads||[]).some(o=>bu(t,o.points)<(o.width||4)/2+2.8)||(n.rivers||[]).some(o=>bu(t,o.points)<o.width/2+1.4)||(n.obstacles||[]).some(o=>To(t,o)<(o.radius||1)+2.1)||(n.fenceSegments||[]).some(o=>Jf(t,o.a,o.b)<2.8))}function ZM(n,{seed:t=(n.seed||42)+93371,maxClusters:e}={}){const i=n.bounds,s=(i.maxX-i.minX)*(i.maxZ-i.minZ),r=Math.max(3,Math.min(24,Math.ceil(s/1600))),o=Math.max(0,Math.min(32,Math.floor(e??r))),a=qM(t),c=[],l=[];for(let h=0;h<o*90&&l.length<o;h++){const u={x:i.minX+2+a()*(i.maxX-i.minX-4),z:i.minZ+2+a()*(i.maxZ-i.minZ-4)};if(!Eu(n,u,.85)||l.some(p=>To(u,p)<5.5))continue;const f=3+Math.floor(a()*3),d=l.length,x=[];for(let p=0;p<f;p++){const m=a()*Math.PI*2,g=p===0?0:.55+a()*1.25,v={x:u.x+Math.cos(m)*g,z:u.z+Math.sin(m)*g};Eu(n,v,.55)&&x.push({x:v.x,z:v.z,variant:Math.floor(a()*3),scale:.66+a()*.48,cluster:d})}x.length<2||(l.push(u),c.push(...x))}return c}const YM="#9ceeff",$M="#39bfe8",KM="#ff7062",jM="#ff241b";function qa(n,t){const i=(n?.userData?.parts||n)?.tailLight?.material;if(!i)return!1;const s=t?KM:YM,r=t?jM:$M;return i.color?.set&&i.color.set(s),i.emissive?.set&&i.emissive.set(r),i.emissiveIntensity=t?1.9:1.25,!0}const Qf=(n,t,e)=>Math.max(t,Math.min(e,n));function _i(n,t,e){let i=(n^Math.imul(t+1,2654435761)^e)>>>0;return i^=i>>>16,i=Math.imul(i,2146121005),i^=i>>>15,i=Math.imul(i,2221713035),((i^i>>>16)>>>0)/4294967296}function td(n,t){return t.temperament||={confidence:.94+.12*_i(n.seed,t.id,49169),curiosity:.9+.2*_i(n.seed,t.id,49170),follow:.94+.06*_i(n.seed,t.id,49171)}}function JM(n,t,e){const i=Math.min(t.id,e.id),s=Math.max(t.id,e.id);return _i(n.seed,i,Math.imul(s+1,2246822507))<.18}function ed(n,t,e,i,s,r=n.time){if(e>.03)t.relaxation=0,t.quietSince=r,t.attentionHeading=s??t.heading;else{t.quietSince??=r;const o=1.5+_i(n.seed,t.id,386929)*2,a=Qf((r-t.quietSince-o)/4,0,1);t.relaxation=Math.max(t.relaxation||0,a)}}function Za(n,t,e){const i=tn(n.target),s=Vo(n.target,t);return Math.abs(s.forward)>i.halfLength+e||Math.abs(s.lateral)>i.halfWidth+e}function QM(n,t,e,i){const s=n.unattendedBrowse||=new Map;if(e)return s.delete(t.id),null;let r=s.get(t.id);if(r||(r={since:n.time,cycle:0},s.set(t.id,r)),n.time-r.since<8)return null;const o=ve(t),a=td(n,t);if(!r.next||n.time>=r.next){const d=r.cycle++,x=Math.imul(d+1,7919);r.next=n.time+24+_i(n.seed,t.id,x^2817)*10,r.departAt=n.time+.35,r.walkUntil=r.departAt+10,r.target=null;for(let p=0;p<8;p++){let m=_i(n.seed,t.id,x^Math.imul(p+1,521288629))*Math.PI*2;const g=n.spawn||{x:(n.bounds.minX+n.bounds.maxX)/2,z:(n.bounds.minZ+n.bounds.maxZ)/2},v={x:t.x-g.x,z:t.z-g.z};Math.hypot(v.x,v.z)>.5&&Math.sin(m)*v.x+Math.cos(m)*v.z<0&&(m+=Math.PI);const M=(4+_i(n.seed,t.id,x^3073)*5)*a.curiosity,_={x:t.x+Math.sin(m)*M,z:t.z+Math.cos(m)*M};if(Za(n,_,o+2)&&Za(n,t,o+2)&&ae(n,_.x,_.z,o)&&oe(n,t,_,o)){r.target=_;break}}}if(!r.target||n.time>=r.walkUntil)return{x:0,z:0,resting:!0};const c=r.target.x-t.x,l=r.target.z-t.z,h=Math.hypot(c,l);if(h<.18)return{x:0,z:0,resting:!0};if(n.time<r.departAt-1e-9)return{x:0,z:0,resting:!1,preparing:!0,heading:Math.atan2(c,l),anticipation:Qf(1-(r.departAt-n.time)/.35,.01,1)};const u=Math.min(.55,h*.6)*a.curiosity,f={x:t.x+c/h*u*i,z:t.z+l/h*u*i};return Za(n,f,o+1.8)?{x:c/h*u,z:l/h*u,resting:!1}:{x:0,z:0,resting:!0}}const tv=[{id:"speed",name:"Turbo paws",icon:"paw",costs:[80,120,200],unlockLevels:[2,6,11],description:"Circle a roaming flock faster with upgraded paw motors.",tierNames:["Quick paws","Trail runner","Meadow racer"],tierDescriptions:["+1.8 m/s running speed","+2.7 m/s running speed","+3.5 m/s running speed"]},{id:"flock",name:"Friendly signal",icon:"signal",costs:[120,180,260],unlockLevels:[7,10,15],description:"Reach more robots with a wider herding signal.",tierNames:["Clear signal","Pasture beacon","Far-field beacon"],tierDescriptions:["+2 m herding range","+3 m herding range","+4 m herding range"]},{id:"drone",name:"Scout drone",icon:"drone",costs:[200,360,540],unlockLevels:[10,14,18],description:"A hovering helper keeps the main herd together while you lead the way.",tierNames:["Scout","Shepherd scout","Flock captain"],tierDescriptions:["Keeps the main herd together; holds when you leave","33% stronger drone support","67% stronger drone support"]},{id:"helper",name:"Buddy dog",icon:"dog",costs:[600,850,1200],unlockLevels:[20,24,28],description:"Herds from the rear, supports split flocks, and learns to retrieve strays.",tierNames:["Farm friend","Trail partner","Senior shepherd"],tierDescriptions:["Herds from behind in the flock’s direction of travel","Guides the smaller flock and passages; barks autonomously","Also retrieves wanderers and bolters to the nearest flock"]},{id:"bark",name:"Happy bark",icon:"bark",costs:[100,160,240],unlockLevels:[4,8,13],description:"A stronger bark gives wandering robots a cheerful nudge.",tierNames:["Bright bark","Resonant bark","Meadow chorus"],tierDescriptions:["Stronger bark · one bark before cooldown","+33% strength versus level 1 · one bark before cooldown","+33% strength versus level 1 · two barks before cooldown"]},{id:"cohesion",name:"Flock harmony",icon:"harmony",costs:[160,220,320],unlockLevels:[12,14,15],description:"Robots regroup more readily when the flock stretches across a meadow.",tierNames:["Stay together","Close companions","Perfect formation"],tierDescriptions:["12% stronger regrouping","23% stronger regrouping","35% stronger regrouping"]}],$o=Object.freeze(tv.map(n=>Object.freeze({...n,cost:n.costs[0],maxLevel:n.costs.length,costs:Object.freeze(n.costs),unlockLevels:Object.freeze(n.unlockLevels),tierNames:Object.freeze(n.tierNames),tierDescriptions:Object.freeze(n.tierDescriptions)}))),zr=n=>$o.find(t=>t.id===n);function si(n,t){const e=zr(t);if(!e||!n||typeof n!="object")return 0;const i=Object.hasOwn(n,t)?n[t]:void 0;return i===!0?1:Number.isInteger(i)&&i>0?Math.min(i,e.maxLevel):0}function Bl(n,t){const e=zr(t);return e?e.costs[si(n,t)]??null:null}function nd(n){const t={};for(const e of $o){const i=si(n,e.id);i&&(t[e.id]=i)}return t}function id(n,t){return zr(t)?.unlockLevels[si(n,t)]??null}function kl(n){if(typeof n=="number")return Number.isInteger(n)?Math.max(1,Math.min(100,n)):1;const t=n;if(!t||typeof t!="object")return 1;const e=Number.isInteger(t.highestLevel)&&t.highestLevel>=0?Math.min(99,t.highestLevel):0,s=(Array.isArray(t.completedLevels)?t.completedLevels:[]).reduce((r,o)=>Number.isInteger(o)&&o>=0&&o<=99?Math.max(r,Math.min(100,o+2)):r,1);return Math.max(e+1,s)}function ev(n,t,e=n){const i=typeof n=="object"?n:null,s=zr(t),r=kl(e),o=si(i?.upgrades,t),a=Bl(i?.upgrades,t),c=id(i?.upgrades,t),l=s?a===null?"owned":r<c?"locked":i&&(!Number.isFinite(i.points)||i.points<a)?"points":null:"unknown";return{available:l===null,reason:l,level:o,nextLevel:a===null?null:o+1,cost:a,unlockLevel:c,currentLevelNumber:r}}function sd(n,t=1){const e=kl(t),i={};for(const s of $o){const r=si(n,s.id),o=s.unlockLevels.filter(c=>c<=e).length,a=Math.min(r,o);a&&(i[s.id]=a)}return i}function nv(n,t,e=n){const i=zr(t);if(!i)return{ok:!1,reason:"unknown"};if(!n||typeof n!="object")return{ok:!1,reason:"points"};const s=si(n.upgrades,t),r=Bl(n.upgrades,t);if(r===null)return{ok:!1,reason:"owned"};const o=id(n.upgrades,t);return kl(e)<o?{ok:!1,reason:"locked",unlockLevel:o}:!Number.isFinite(n.points)||n.points<r?{ok:!1,reason:"points"}:(n.points-=r,n.upgrades={...nd(n.upgrades),[t]:s+1},{ok:!0,upgrade:i,level:s+1,cost:r})}function Ko(n,t=1){const e=sd(n,t),i=r=>si(e,r);return{speedBoost:[0,1.8,2.7,3.5][i("speed")],signalBoost:[0,2,3,4][i("flock")],barkBoost:[0,.25,1.9*1.33-1.65,1.9*1.33-1.65][i("bark")],barkMultiplier:[1.65,1.9,1.9*1.33,1.9*1.33][i("bark")],barkCharges:i("bark")>=3?2:1,cohesionBoost:[0,.12,.23,.35][i("cohesion")],droneStrength:[0,.7,.93,1.17][i("drone")],helperStrength:[0,1,1.3,1.58][i("helper")],drone:i("drone")>0,helper:i("helper")>0,helperTier:i("helper")}}const Ie=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z);function rd(n,t,e,i=.6){if(!ae(n,e.x,e.z,i)){let s=null,r=1/0;for(const o of[.6,1.2,1.8,2.4,3.2,4.5,6]){for(let a=0;a<24;a++){const c=a*Math.PI/12,l={x:e.x+Math.cos(c)*o,z:e.z+Math.sin(c)*o},h=o+Ie(t,l)*.015;h<r&&ae(n,l.x,l.z,i+.08)&&(s=l,r=h)}if(s)break}if(!s)return null;e=s}return e}function Mi(n,t,e,i=.6){if(e=rd(n,t,e,i),!e)return{x:t.x,z:t.z};let s=yl(n,t,e,i);oe({...n,obstacles:[]},t,e,i)&&(s=e);const r=t.buddyNavigation;if(r&&Ie(r.goal,s)<3&&n.time<r.until){for(;r.path.length&&Ie(t,r.path[0])<.45;)r.path.shift();if(r.path.length&&oe(n,t,r.path[0],i))return r.path[0]}if(oe(n,t,s,i))return delete t.buddyNavigation,s;const o=(n.obstacles||[]).filter(f=>Ie(t,f)<Math.min(24,Ie(t,s)+6)&&hn(f,t,s)<f.radius+i+4).sort((f,d)=>Ie(t,f)-Ie(t,d)).slice(0,6);if(!o.length)return s;const a=[t,s];for(const f of o){const d=(f.radius+i+.16)/Math.cos(Math.PI/12);for(let x=0;x<12;x++){const p=x*Math.PI/6,m={x:f.x+Math.cos(p)*d,z:f.z+Math.sin(p)*d};ae(n,m.x,m.z,i)&&a.push(m)}}const c=a.map(()=>1/0),l=[],h=new Set;c[0]=0;for(let f=0;f<a.length;f++){let d=-1;for(let x=0;x<a.length;x++)!h.has(x)&&(d<0||c[x]<c[d])&&(d=x);if(d<0||!Number.isFinite(c[d])||d===1)break;h.add(d);for(let x=1;x<a.length;x++){if(h.has(x))continue;const p=c[d]+Ie(a[d],a[x]);p>=c[x]||!oe(n,a[d],a[x],i)||(c[x]=p,l[x]=d)}}if(!Number.isFinite(c[1]))return s;const u=[];for(let f=1;f!==0;f=l[f])u.unshift({x:a[f].x,z:a[f].z});return t.buddyNavigation={goal:{x:s.x,z:s.z},path:u,until:n.time+2},u[0]}const ol=new WeakMap;function gr(n){delete n.buddyRecovery,ol.delete(n),delete n.buddyNavigation,delete n.navigationBlocked}function al(n,t,e,i,{taskKey:s,active:r=!0,yielding:o=!1}={}){if(!(i>0)||!Number.isFinite(i))return{x:t.x,z:t.z};if(e=rd(n,t,e),!e)return gr(t),{x:t.x,z:t.z};if(!r||o||Ie(t,e)<.55)return gr(t),Mi(n,t,e);let a=t.buddyRecovery;if((!a||ol.get(t)!==n||a.lastTime>n.time||a.taskKey!==s||Ie(a.goal,e)>6)&&(gr(t),a=t.buddyRecovery={lastTime:n.time,taskKey:s,bestDistance:Ie(t,e),goal:{...e},progressGoal:{...e},progressDistance:Ie(t,e),progressElapsed:0,anchor:{x:t.x,z:t.z},blocked:0,attempts:0,elapsed:0}),ol.set(t,n),a.lastTime=n.time,a.elapsed+=i,Ie(a.progressGoal,e)>.5||Ie(t,e)<a.progressDistance-1e-5?(a.progressGoal={...e},a.progressDistance=Ie(t,e),a.progressElapsed=0):a.progressElapsed+=i,a.waitUntil){if(a.elapsed<a.waitUntil)return{x:t.x,z:t.z};delete a.waitUntil,a.attempts=0,a.blocked=0,delete t.buddyNavigation}if(a.escape)if(Ie(t,a.escape)<.3||a.elapsed>=a.escapeUntil||!oe(n,t,a.escape,.6))delete a.escape,delete t.buddyNavigation,a.blocked=0,a.progressElapsed=0,a.anchor={x:t.x,z:t.z};else return a.escape;if(Ie(t,a.anchor)>.3&&(a.anchor={x:t.x,z:t.z},a.blocked=0,Ie(t,e)<a.bestDistance-.5&&(a.attempts=0,a.bestDistance=Ie(t,e))),a.blocked=t.navigationBlocked?a.blocked+i:Math.max(0,a.blocked-i),a.blocked<1.5&&a.progressElapsed<6)return Mi(n,t,e);if(delete t.buddyNavigation,a.attempts>=3)return a.waitUntil=a.elapsed+2,a.blocked=0,{x:t.x,z:t.z};const c=Math.atan2(e.x-t.x,e.z-t.z),l=a.attempts%2?-1:1;a.attempts++,a.blocked=0,a.progressElapsed=0;for(const h of[c+l*Math.PI*.65,c-l*Math.PI*.65,c+Math.PI,c+l*Math.PI/2]){const u={x:t.x+Math.sin(h)*1.8,z:t.z+Math.cos(h)*1.8};if(ae(n,u.x,u.z,.68)&&oe(n,t,u,.6))return a.escape=u,a.escapeUntil=a.elapsed+2,u}return a.waitUntil=a.elapsed+2,{x:t.x,z:t.z}}const od=(n,t)=>Math.atan2(Math.sin(n-t),Math.cos(n-t));function jo(n,t,e,i){const s=od(t,n),r=e*i;return n+Math.max(-r,Math.min(r,s))}function Rs(n,t,e,i,s){if(!(i>0)||!Number.isFinite(i))return;const r=e.x-t.x,o=e.z-t.z,a=Math.hypot(r,o),c={x:t.x,z:t.z};if(t.navigationBlocked=!1,a>1e-4){const l=Math.atan2(r,o);t.heading=jo(t.heading??l,l,2.8,i);const h=Math.max(0,Math.cos(od(l,t.heading))),u=5,f=10,d=Math.min(Math.max(0,s),a*u)*h,x=Math.max(0,t.moveSpeed??Math.hypot(t.vx||0,t.vz||0)),p=x+Math.max(-f*i,Math.min(f*i,d-x)),m=Math.min(a,i*p),g=fr(n,t,Math.sin(t.heading)*m,Math.cos(t.heading)*m,.6);t.navigationBlocked=g.blockedX||g.blockedZ;const v=Math.hypot(t.x-c.x,t.z-c.z);t.moveSpeed=g.blockedX||g.blockedZ?v/i:p}else t.moveSpeed=Math.max(0,(t.moveSpeed||0)-10*i);t.vx=(t.x-c.x)/i,t.vz=(t.z-c.z)/i}const kt=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),Xi=(n,t)=>{const e=Math.hypot(n,t);return e>1e-6?{x:n/e,z:t/e}:{x:0,z:0}},mi=n=>n.reduce((t,e)=>({x:t.x+e.x/n.length,z:t.z+e.z/n.length}),{x:0,z:0});function Gl(n,t,e=(i,s)=>oe(n,i,s,.15)){const i=new Set(t),s=[];for(;i.size;){const r=i.values().next().value,o=[r];i.delete(r);for(let a=0;a<o.length;a++)for(const c of i)kt(o[a],c)<=6.5&&e(o[a],c)&&(o.push(c),i.delete(c));s.push(o)}return s}const Ds=(n,t=[])=>n.filter(e=>t.includes(e.id)).length,Ya=(n,t,e)=>Ds(t,e)-Ds(n,e)||Math.min(...n.map(i=>i.id))-Math.min(...t.map(i=>i.id)),No=n=>ve(n),Is=(n,t,e)=>((n.x-t.x)*Math.sin(t.heading)+(n.z-t.z)*Math.cos(t.heading))*e;function ad(n,t,e){return!e.length||(t.kind==="goal"?e.every(i=>Fs(n.target,i,No(i))):e.every(i=>Is(i,t.bridge,t.sign)>t.bridge.length/2+3))}function iv(n,t){return kt(t,n.target)<tn(n.target).halfLength+12||(n.rivers||[]).some(e=>e.bridges.some(i=>kt(t,i)<i.length/2+12))}function sv(n,t,e,i){if(t.passage){const l=t.passage,h=l.kind==="goal"?n.target:l.bridge;if(!ad(n,l,e)&&kt(mi(e),h)<(h.length||h.radius||5)+22)return l;delete t.passage}const s=mi(e),r=tn(n.target),o=kt(n.dog,n.target)<n.target.radius+12||e.some(l=>kt(l,n.dog)<14&&oe(n,l,n.dog,.15));if(o&&kt(s,n.target)<r.halfLength+12&&!e.every(l=>Fs(n.target,l,No(l))))return t.passage={kind:"goal",ids:e.map(l=>l.id)};const a=(n.rivers||[]).flatMap(l=>l.bridges).sort((l,h)=>kt(l,s)-kt(h,s));let c=t.forward&&i;if(!c&&o&&(c=Xi(s.x-n.dog.x,s.z-n.dog.z)),!c)return null;for(const l of a){if(kt(s,l)>l.length/2+12)continue;const h=c.x*Math.sin(l.heading)+c.z*Math.cos(l.heading);if(Math.abs(h)<.25)continue;const u=Math.sign(h);if(!(Is(s,l,u)>l.length/2+1))return t.passage={kind:"bridge",bridge:l,sign:u,ids:e.map(d=>d.id)}}return null}function Tu(n,t,e){if(t.kind==="goal")return af(n,e);const i=t.bridge,s=i.length/2+4;return{x:i.x+Math.sin(i.heading)*t.sign*s,z:i.z+Math.cos(i.heading)*t.sign*s}}const $a=3;function Au(n,t){let e=0;for(const s of n.rivers||[])for(const r of s.bridges)Math.abs((t.x-r.x)*Math.cos(r.heading)-(t.z-r.z)*Math.sin(r.heading))<r.width/2+1&&Math.abs(Is(t,r,1))<r.length/2+2&&(e+=15);for(const s of n.gates||[])kt(t,s)<4&&(e+=15);const i=af(n,n.dog);return kt(t,i)<4&&(e+=15),e}function rv(n,t,e,i){if(!e.standby||kt(e.standby,n.dog)>7||kt(e.standby,n.dog)<2||!ae(n,e.standby.x,e.standby.z,.6)){const s=[];kt(t,n.dog)>=2&&kt(t,n.dog)<=7&&s.push({x:t.x,z:t.z});for(const o of[3.5,5.5])for(let a=0;a<12;a++){const c=a*Math.PI/6;s.push({x:n.dog.x+Math.sin(c)*o,z:n.dog.z+Math.cos(c)*o})}const r=s.filter(o=>{if(!ae(n,o.x,o.z,.68)||!oe(n,n.dog,o,.6))return!1;if(oe(n,t,o,.6))return!0;const a={x:t.x,z:t.z},c=[];for(let l=0;l<16;l++){if(oe(n,a,o,.6))return!0;const h=Mi(n,a,o,.6);if(kt(a,h)<.05||!ae(n,h.x,h.z,.6)||!oe(n,a,h,.6)||c.some(u=>kt(u,h)<.1))return!1;c.push({x:a.x,z:a.z}),a.x=h.x,a.z=h.z}return!1});r.sort((o,a)=>Au(n,o)-Au(n,a)||kt(t,o)-kt(t,a)),e.standby=r[0]||{x:t.x,z:t.z}}if(t.desired={...e.standby},kt(t,e.standby)<.08){t.moveSpeed=0,t.vx=0,t.vz=0;return}Rs(n,t,Mi(n,t,e.standby,.6),i,4)}function ov(n,t,e,i,s,r){const o=n.dog,a=kt(o,i)<$a||kt(o,t)<2.2;if(!a&&(!e.yield||kt(o,i)>$a+1)&&delete e.yield,!a&&!e.yield)return i;const c=e.yield?.side||Math.sign((t.x-o.x)*-s.z+(t.z-o.z)*s.x)||1;e.yield={side:c,since:e.yield?.since??n.time};const l=[];for(const h of[3.5,5,2])for(const u of[c,-c]){const f={x:i.x-s.z*h*u,z:i.z+s.x*h*u};ae(n,f.x,f.z,.68)&&oe(n,i,f,.6)&&l.push({p:f,side:u,cost:Math.max(0,$a-kt(f,o))*10+h+(u!==c?2:0)})}return l.sort((h,u)=>h.cost-u.cost),l.length?(e.yield.side=l[0].side,l[0].p):r||kt(o,i)>=1.6||n.time-e.yield.since>1.2?i:{x:t.x,z:t.z}}function av(n,t,e,i){const s=t.map(l=>l.id),r=(n.flows||[]).sort((l,h)=>Ds(t,h.ids)-Ds(t,l.ids))[0],o=r&&Ds(t,r.ids)>0?r:{ids:s,forward:null};o.ids=s,o.at=i;const a=t.reduce((l,h)=>({x:l.x+(h.vx||0)/t.length,z:l.z+(h.vz||0)/t.length}),{x:0,z:0}),c=Math.hypot(a.x,a.z)>.28;if(c){const l=Xi(a.x,a.z),h=o.forward?jo(Math.atan2(o.forward.x,o.forward.z),Math.atan2(l.x,l.z),1.8,e):Math.atan2(l.x,l.z);o.forward={x:Math.sin(h),z:Math.cos(h)}}return n.flows=[...(n.flows||[]).filter(l=>l!==o&&i-l.at<5),o],{moving:c,forward:o.forward||{x:0,z:1},measured:o.forward}}const cv=18,lv=14;function hv(n,t,e){const i=mi(e),s={...n,obstacles:[]},r=e.some(u=>oe(s,n.dog,u,.6)),o=Math.min(...e.map(u=>kt(n.dog,u))),a=t.containment,c=a&&Ds(e,a.ids)>0;if(!(!r||o>(c?lv:cv)))return delete t.containment,null;const h=c?a:{anchor:{...i},positions:{},acquired:!1,angle:null};h.ids=e.map(u=>u.id);for(const u of e)h.positions[u.id]||={x:u.x,z:u.z};return t.containment=h,h}function uv(n,t,e,i,s,r,o){if(t.mode="contain",t.barking=!1,delete t.forward,!i.acquired){delete i.check,delete i.watchUntil;const f=[...s].sort((m,g)=>kt(t,m)-kt(t,g))[0],d=Xi(t.x-f.x,t.z-f.z),x={x:f.x+d.x*4,z:f.z+d.z*4};t.desired=x,t.containmentActivity="approach";const p=al(n,t,x,r,{taskKey:o,active:!0});Rs(n,t,p,r,7);return}const a=i.anchor,c=Math.max(3,...s.map(f=>kt(f,a)+ve(f))),l=c+3.5;if(i.angle??=Math.atan2(t.x-a.x,t.z-a.z),i.watchUntil>n.time){t.desired={x:t.x,z:t.z},Rs(n,t,t.desired,r,0),t.heading=jo(t.heading??0,Math.atan2(a.x-t.x,a.z-t.z),1.4,r),t.containmentActivity="watch";return}if(i.check&&kt(t,i.check)<.4){i.watchUntil=n.time+4+(i.checkIndex||0)%4,delete i.check,t.containmentActivity="watch",Rs(n,t,{x:t.x,z:t.z},r,0);return}if(!i.check){i.checkIndex=(i.checkIndex||0)+1;const d=s.filter(p=>i.positions[p.id]&&kt(p,i.positions[p.id])>1.2).sort((p,m)=>kt(m,i.positions[m.id])-kt(p,i.positions[p.id]))[0],x=d?Math.atan2(d.x-a.x,d.z-a.z):i.angle+(i.checkIndex%2?1:-1)*Math.PI/3;for(let p=0;p<24;p++){const m=x+(p%2?1:-1)*Math.ceil(p/2)*Math.PI/12,g={x:a.x+Math.sin(m)*l,z:a.z+Math.cos(m)*l};if(!ae(n,g.x,g.z,.68))continue;const v=Mi(n,t,g,.6),M=v.x-t.x,_=v.z-t.z,S=M*M+_*_,w=S?Math.max(0,Math.min(1,((a.x-t.x)*M+(a.z-t.z)*_)/S)):0,A={x:t.x+M*w,z:t.z+_*w};if(!(kt(t,a)>c+1&&kt(A,a)<c+1)){i.check=g,i.angle=m,i.checkStarted=n.time;break}}}const h=i.check||{x:t.x,z:t.z};t.containmentActivity="check",t.desired=h;const u=al(n,t,h,r,{taskKey:o,active:kt(t,h)>.5});Rs(n,t,u,r,2.6),i.check&&n.time-i.checkStarted>15&&(delete i.check,i.watchUntil=n.time+4)}function fv(n,t,e,i,s){if(!(i>0)||!e.helper)return{forces:new Map,memberIds:new Set};let r=n.helpers.find(N=>N.type==="helper");r||(r={type:"helper",x:n.dog.x,z:n.dog.z},n.helpers.push(r));const o=n.buddyHerd||={},a=e.helperTier;r.barking=n.time<(r.barkUntil||0);let c=a>=3&&t.find(N=>N.id===o.retrieveId);const l=t.filter(N=>N.id!==c?.id&&!N.wander&&!N.wanderHome),h=l.map(N=>N.id).join(",");(!o.groups||h!==o.signature||n.time-o.checkedAt>=.25)&&(o.allGroups=Gl(n,l),o.groups=o.allGroups.filter(N=>N.length>=2),o.signature=h,o.checkedAt=n.time);let u=o.groups;if(!u.length&&a>=2){const N=(o.allGroups||[]).filter(Y=>iv(n,Y[0])).sort((Y,nt)=>kt(r,Y[0])-kt(r,nt[0]))[0];N&&(u=[N])}u.sort((N,Y)=>Y.length-N.length||Ya(N,Y,o.travelIds));const f=u[0];if(!f)return r.mode="standby",r.clusterIds=[],r.targetId=null,r.barking=!1,o.task!=="standby"&&(r.moveSpeed=0,r.vx=0,r.vz=0,delete r.buddyNavigation,gr(r),delete o.passage,delete o.workHeading,delete o.orbitSide,delete o.yield,delete r.forward),o.task="standby",delete o.containment,delete o.retrieveId,rv(n,r,o,i),{forces:new Map,memberIds:new Set};o.travelIds=f.map(N=>N.id);const d=N=>[...u].sort((Y,nt)=>kt(N,mi(Y))-kt(N,mi(nt))||Ya(Y,nt))[0];c&&d(c).some(Y=>kt(Y,c)<=4.5&&oe(n,Y,c,.15))&&(delete o.retrieveId,c=null),a>=3&&!c&&u.some(N=>N.length>=2)&&(c=t.filter(N=>(N.wander||N.wanderHome)&&!u.some(Y=>Y.some(nt=>nt.id===N.id))).sort((N,Y)=>+!!Y.wander?.bolting-+!!N.wander?.bolting||kt(r,N)-kt(r,Y)||N.id-Y.id)[0],c&&(o.retrieveId=c.id)),c||delete o.retrieveId;let x=a>=2?[...u].sort((N,Y)=>N.length-Y.length||Ya(N,Y,r.clusterIds))[0]:f;if(a>=2&&o.passage){const N=t.filter(Y=>o.passage.ids.includes(Y.id)&&!Y.wander&&!Y.wanderHome);N.length&&!ad(n,o.passage,N)&&(x=N)}const p=c?d(c):x,{moving:m,forward:g,measured:v}=av(o,p,i,n.time);o.forward=v;const M=hv(n,o,p),_=!M&&!c&&a>=2?sv(n,o,p,g):null;M&&delete o.passage;const S=`${c?"retrieve":M?"contain":_?.kind||"flock"}:${c?.id??p.map(N=>N.id).join(",")}`;o.task!==S&&(delete r.buddyNavigation,gr(r),delete o.standby,delete o.yield,delete o.orbitSide,delete o.workHeading),o.task=S;const w=mi(p);r.clusterIds=p.map(N=>N.id),r.anchor=w,r.targetId=c?.id??null;const A=new Map;if(M){const N=p.some(q=>kt(r,q)<12&&oe(n,r,q,.15)),Y=mi(p),nt=Math.max(3,...p.map(q=>kt(q,Y)+ve(q))),ht={...n,obstacles:[]},Et=kt(r,Y)<=nt+8&&p.some(q=>oe(ht,r,q,.6));if(M.acquired&&!Et&&(M.acquired=!1),M.acquired||(M.anchor=Y),!M.acquired&&N&&(M.acquired=!0,M.anchor=mi(p),M.positions=Object.fromEntries(p.map(q=>[q.id,{x:q.x,z:q.z}]))),M.acquired)for(const q of p)A.set(q.id,M.positions[q.id])}if(M&&!c)return uv(n,r,o,M,p,i,S),{forces:new Map,memberIds:new Set,holds:A};let P=w,y=g;if(c){P=c;const N=ve(c),Y=Mi(n,c,w,N);y=Xi(Y.x-c.x,Y.z-c.z)}if(_){P=[...p].sort((Y,nt)=>_.kind==="bridge"?Is(Y,_.bridge,_.sign)-Is(nt,_.bridge,_.sign):kt(nt,n.target)-kt(Y,n.target))[0];const N=Mi(n,P,Tu(n,_,P),No(P));y=Xi(N.x-P.x,N.z-P.z)}if(c||_){const N=Math.atan2(y.x,y.z);o.workHeading=jo(o.workHeading??N,N,1.8,i),y={x:Math.sin(o.workHeading),z:Math.cos(o.workHeading)}}else delete o.workHeading;r.mode=c?"retrieve":_?_.kind:m?"herd":"hold";const b=c||_?0:Math.min(...p.map(N=>(N.x-w.x)*y.x+(N.z-w.z)*y.z)),D=c?{x:(c.vx||0)*.4,z:(c.vz||0)*.4}:{x:0,z:0};let U={x:P.x+y.x*(b-3.2)+D.x,z:P.z+y.z*(b-3.2)+D.z};r.desired=U,r.forward={...y};const B={x:r.x-P.x,z:r.z-P.z};let G=U;if(B.x*y.x+B.z*y.z>-2.5&&kt(r,P)<8){const N=o.orbitSide||=Math.sign(B.x*-y.z+B.z*y.x)||1;G={x:P.x-y.x*4.5-y.z*N*5+D.x,z:P.z-y.z*4.5+y.x*N*5+D.z}}B.x*y.x+B.z*y.z<-3&&delete o.orbitSide,G=ov(n,r,o,G,y,_),r.desired=G;const Z=al(n,r,G,i,{taskKey:S,active:kt(r,G)>.5,yielding:!!o.yield&&kt(r,n.dog)<2.2});Rs(n,r,Z,i,c?9:7);const F=c?[c]:p,T=new Map,z=new Set;if(!m&&!c&&!_)return{forces:T,memberIds:z,holds:A};const k=N=>{if(!_)return y;const Y=Mi(n,N,Tu(n,_,N),No(N));return Xi(Y.x-N.x,Y.z-N.z)},H=N=>{if(_?.kind==="bridge"&&Is(N,_.bridge,_.sign)>_.bridge.length/2+3)return!1;const Y=k(N),nt=Xi(N.x-r.x,N.z-r.z);return nt.x*Y.x+nt.z*Y.z>.6&&kt(r,N)<8&&oe(n,r,N,.15)};a>=2&&n.time>=(r.nextBarkAt||0)&&F.some(H)&&(r.barkUntil=n.time+.65,r.nextBarkAt=n.time+3.2,r.barking=!0,s.push({type:"buddyBark",x:r.x,z:r.z}));for(const N of F){if(!H(N))continue;const Y=ve(N),nt=(c?3.7:_?2.4:1.15)*e.helperStrength*(r.barking?1.45:1),ht=k(N),Et=c||_?0:(w.x-N.x)*-y.z+(w.z-N.z)*y.x,q=Math.max(-.6,Math.min(.6,Et*.12)),$={x:ht.x*nt-ht.z*q,z:ht.z*nt+ht.x*q},ct={x:N.x+ht.x*.7,z:N.z+ht.z*.7};!ae(n,ct.x,ct.z,Y)||!oe(n,N,ct,Y)||(T.set(N.id,$),z.add(N.id))}return{forces:T,memberIds:z,holds:A}}const dv=n=>ve(n),pv=3,Ka=n=>({x:Math.sin(n.heading),z:Math.cos(n.heading)}),Ru=(n,t,e)=>(n.x-t.x)*e.x+(n.z-t.z)*e.z;function mv(n,t,e){let i=t.bridgeCrossing;const s=dv(t);if(i){const f=Ka(i.bridge);if(Ru(e,i.bridge,f)*i.sign>i.bridge.length/2+s+.7&&ae(n,e.x,e.z,s))return t.lastBridge={bridge:i.bridge,sign:i.sign},delete t.bridgeCrossing,{finished:!0}}else t:for(const f of n.rivers||[])for(const d of f.bridges){const x=Ka(d),p=Ru(e,d,x),m=(e.x-d.x)*x.z-(e.z-d.z)*x.x,g=(e.vx||0)*x.x+(e.vz||0)*x.z,v=t.lastBridge?.bridge===d&&Math.sign(g)!==t.lastBridge.sign,M=Math.abs(p)<=d.length/2+.15,_=!M&&!v&&e.pushed&&Math.abs(p)<=d.length/2+pv&&g*p<0;if(!(!M&&!_||Math.abs(m)>d.width/2-s-(_?.1:0)||!ae(n,e.x,e.z,s))&&!(Math.abs(g)<.12)){i=t.bridgeCrossing={bridge:d,sign:Math.sign(g),lane:Math.max(-d.width/2+s+.35,Math.min(d.width/2-s-.35,m))};break t}}if(!i)return null;const r=i.bridge,o=Ka(r);let a;for(const f of[s+1.2,s+2,s+3.2,s+5]){const d=i.sign*(r.length/2+f),x={x:r.x+o.x*d+o.z*i.lane,z:r.z+o.z*d-o.x*i.lane};if(ae(n,x.x,x.z,s)){a=x;break}}if(!a)return null;const c=yl(n,e,a,s),l=c.x-e.x,h=c.z-e.z,u=Math.hypot(l,h);return u<.02||!oe(n,e,c,s)?{x:0,z:0,forward:o}:{x:l/u,z:h/u,forward:o}}const gv=8,xv=3,_v=2,Mv=9,cd=n=>({x:Math.sin(n),z:Math.cos(n)}),Cu=new WeakMap;function vv(n){const t=`${n.geometryRevision||0}:${(n.gates||[]).map(s=>s.open?1:0).join("")}`,e=Cu.get(n);if(e?.key===t)return e.list;const i=yv(n);return Cu.set(n,{key:t,list:i}),i}function yv(n){const t=(n.rivers||[]).flatMap(r=>r.bridges).map(r=>({bridge:r,x:r.x,z:r.z,heading:r.heading,width:r.width,half:r.length/2})),e=(n.gates||[]).filter(r=>!r.operable||r.open).map(r=>({x:r.x,z:r.z,heading:r.heading,width:r.width,half:0})),i=n.target&&tn(n.target),s=i?[{x:i.entrance.x,z:i.entrance.z,heading:n.target.heading,width:i.openingWidth,half:0,inwardOnly:!0}]:[];return[...t,...e,...s].filter(r=>r.width<Mv)}function Sv(n,t,e=ve(t)){let i=null;for(const s of vv(n)){const r=cd(s.heading),o=(t.x-s.x)*r.x+(t.z-s.z)*r.z,a=(t.x-s.x)*r.z-(t.z-s.z)*r.x,c=Math.abs(o)-s.half;if(c<-.01&&Math.abs(a)<=s.width/2||c<-1.5||c>gv||Math.abs(a)>s.width/2+3||s.inwardOnly&&o>0||i&&c>=i.outside)continue;const l=Math.sign(o)||1,h=Math.max(0,s.width/2-e-.35),u=Math.max(-h,Math.min(h,a)),f={x:-r.x*l,z:-r.z*l};i={opening:s,outside:c,inward:f,side:l,lateral:a,lane:u,mouth:{x:s.x+r.x*l*s.half+r.z*u,z:s.z+r.z*l*s.half-r.x*u}}}return i}function wv(n,t,e,i,s,r,o){const a=ve(t),c=Sv(n,e,a);if(!c||r.x*c.inward.x+r.z*c.inward.z<=.05)return delete t.chokeYield,s;const l=t.lastBridge;if(l&&l.bridge===c.opening.bridge&&-c.side!==l.sign)return delete t.chokeYield,s;const h=c.inward;let{x:u,z:f}=s;const d=o.x*h.x+o.z*h.z;d<0&&(u-=h.x*d,f-=h.z*d);const x=u*h.x+f*h.z;x<0&&Math.abs(c.lane-c.lateral)<.3&&(u-=h.x*x,f-=h.z*x);const p=cd(c.opening.heading),m=c.lane-c.lateral;if(Math.abs(m)>.3&&c.outside<a+1.5){const M=Math.abs(c.lateral)>c.opening.width/2-a-.05&&c.outside<a+.45?-.5:Math.min(u*h.x+f*h.z,.3),_=Math.max(-1.5,Math.min(1.5,m*1.5));u=h.x*M+p.z*_,f=h.z*M-p.x*_}else{const v=Math.max(-1,Math.min(1,m*.8));u+=p.z*v,f-=p.x*v}if(t.chokeYield?.escapeUntil<=n.time&&delete t.chokeYield,!(t.chokeYield?.escapeUntil>n.time)){let v=null;for(const _ of i){if(_.id===t.id)continue;const S=_.x-e.x,w=_.z-e.z,A=S*h.x+w*h.z,P=Math.abs(S*h.z-w*h.x),y=a+ve(_)+.25;A>0&&A<y+.3&&P<y&&(!v||A<v.front)&&(v={other:_,front:A,room:y})}const M=u*h.x+f*h.z;if(v){const _=t.chokeYield||={since:n.time};if(n.time-_.since>xv)t.chokeYield={since:n.time,escapeUntil:n.time+_v};else{const S=Math.max(0,(v.other.vx||0)*h.x+(v.other.vz||0)*h.z)+Math.max(0,v.front-v.room)*1.5;M>S&&(u-=h.x*(M-S),f-=h.z*(M-S))}}else delete t.chokeYield}return{x:u,z:f}}function bv(n){let t=n>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,(t>>>0)/4294967296}function Cs(n,t,e,i=0){return bv((n^Math.imul(t+1,2654435761)^Math.imul(e+1,2246822507)^i)>>>0)}const Ev=n=>Math.floor(Math.max(0,n)*.2);function Tv(n){const t=n+1;return{wanderChance:t>70?.25:t>40?.2:.33,boltChance:t>40?.2:.1,duration:t>=70?[5,10]:t>=40?[4,6]:[3,5]}}function cl(n){const t=n.animals.filter(s=>!s.saved),e=t.map(s=>s.id).join(",");if(n.wanderCohort&&n.wanderCohortSignature===e)return n.wanderCohort;const i=new Set(t.map(s=>({id:s.id,rank:Cs(n.seed^Math.imul(n.index+1,7919),s.id,0,5370206)})).sort((s,r)=>s.rank-r.rank||s.id-r.id).slice(0,Ev(t.length)).map(s=>s.id));return n.wanderCohort=i,n.wanderCohortSignature=e,n.wanderCohort}function Av(n,t,e,i,s=!1){if(n.index<7||t.saved||s||t.wander||t.wanderHome)return null;const r=Tv(n.index);if(!cl(n).has(t.id)||Cs(n.seed,t.id,e,96785)>=r.wanderChance)return null;const o=t.x-i.x,a=t.z-i.z,c=Math.hypot(o,a),l=c>.01?{x:o/c,z:a/c}:{x:0,z:1},h=n.index>=16&&Cs(n.seed,t.id,e,45079)<r.boltChance,u=h?r.duration[0]+Cs(n.seed,t.id,e,1004)*(r.duration[1]-r.duration[0]):2.5,f=h?6*u+1:4+Cs(n.seed,t.id,e,4292)*3;return{x:t.x+l.x*f,z:t.z+l.z*f,until:n.time+u,bolting:h}}function ja(n,t,e){return 5+3*Cs(n.seed^Math.imul(n.index+1,7919),t.id,e,49420)}function Rv(n,t,e){if(!(e>0)||n.index<7||t.saved||(Number.isFinite(t.nextWanderCheck)||(t.wanderOpportunity=0,t.nextWanderCheck=n.time-e+ja(n,t,0)),n.time+1e-8<t.nextWanderCheck))return null;const i=t.wanderOpportunity++;return t.nextWanderCheck+=ja(n,t,t.wanderOpportunity),t.nextWanderCheck<=n.time&&(t.nextWanderCheck=n.time+ja(n,t,t.wanderOpportunity)),i}const Ja=.65;function ld(n){const t={x:Math.sin(n.heading),z:Math.cos(n.heading)},e=n.width/2+.65,i=n.material==="stone"?.3:.18,s=(r,o)=>({x:n.x+t.x*r*o+t.z*e,z:n.z+t.z*r*o-t.x*e});return[-1,1].map(r=>({...s(r,i+.08),y:1.05,sign:r,heading:n.heading+(r<0?Math.PI:0),approach:s(r,i+.62+.12)}))}function Cv(n){n.geometryRevision=(n.geometryRevision||0)+1,n.flockVisibility?.clear()}function Pv(n,t,e){const{a:i,b:s}=Ml(t),r=t.material==="stone"?.3:.18;return[{body:e,radius:.62},...(n.animals||[]).map(a=>({body:a,radius:ve(a)})),...(n.helpers||[]).filter(a=>a.type==="helper").map(a=>({body:a,radius:.62}))].some(({body:a,radius:c})=>a&&_e(a,gl(a,i,s))<c+r+.02)}function zv(n,t){const e=[],i=[t,...(n.helpers||[]).filter(s=>s.type==="helper")].filter(Boolean);for(const s of n.gates||[]){if(!s.operable)continue;const r=ld(s),o={x:Math.sin(s.heading),z:Math.cos(s.heading)},a=(u,f)=>((u.x-s.x)*o.x+(u.z-s.z)*o.z)*f.sign>0,c=i.some(u=>r.some(f=>a(u,f)&&_e(u,f)<=Ja+.62)),l=!!s.buttonContact;if(!c){i.every(u=>r.every(f=>!a(u,f)||_e(u,f)>Ja+.62+.2))&&(s.buttonContact=!1);continue}if(s.buttonContact=!0,!(l||!i.find(u=>ae(n,u.x,u.z,.62)&&r.some(f=>a(u,f)&&_e(u,f)<=Ja+.62&&oe(n,u,f.approach,.62))))){if(s.open&&Pv(n,s,t)){e.push({type:"gateBlocked",id:s.id});continue}s.open=!s.open,Cv(n),e.push({type:"gateToggled",id:s.id,open:s.open})}}return e}const cn=(n,t,e)=>Math.max(t,Math.min(e,n)),ei=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),Kn=(n,t)=>{const e=Math.hypot(n,t);return e>1e-4?{x:n/e,z:t/e}:{x:0,z:0}},ll=n=>n.reduce((t,e)=>({x:t.x+e.x/n.length,z:t.z+e.z/n.length}),{x:0,z:0});function Dv(n,t,e){const i=t.buddyRest;(!i||i.home!==e)&&(t.buddyRest={home:e,cycle:0,next:n.time+20+t.id*7%17});const s=t.buddyRest;if(n.time>=s.next&&(s.cycle++,s.next=n.time+24+(t.id*11+s.cycle*5)%19,delete s.target),!s.target){const r=t.id*2.399963+s.cycle*1.618,o=s.cycle===0?.45:.6,a={x:e.x+Math.sin(r)*o,z:e.z+Math.cos(r)*o},c=cf(n,a)&&ae(n,a.x,a.z,ve(t))&&oe(n,t,a,ve(t));s.target=c?a:{x:t.x,z:t.z},s.facing=c?void 0:r}return s.target}function hd(n){const t=Math.max(0,(n.animals?.length||0)-5),e=Math.max(1,n.routes?.length||1),i=n.spawn&&n.target?ei(n.spawn,n.target):0;return cn(30+Math.ceil(t/5)+(e-1)*4+Math.floor(i/40)*2,30,60)}function Hl(n,t=n.animals.filter(e=>e.saved).length){const e=n.animals.length;return e?Math.floor(Math.max(0,n.reward)*cn(t,0,e)/e):0}function hl(n,t=[],e=!1,i={blockedX:!1,blockedZ:!1}){const s=n.result?.saved??n.animals.filter(a=>a.saved).length,r=n.result?.total??n.animals.length,o=n.result?.score??Hl(n,s);return{saved:s,total:r,score:o,possibleScore:n.reward,completed:!!n.completed,justCompleted:e,reward:e?o:0,remaining:n.delivery?.remaining??null,countdownStarted:!!n.delivery?.started,events:t,helpers:n.helpers||[],dogCollision:i}}function Pu(n,t,e=[],i){n.completed=!0;const s=n.animals.filter(r=>r.saved).length;return n.result={saved:s,total:n.animals.length,score:Hl(n,s),possibleScore:n.reward,reason:t},e.push({type:"levelCompleted",index:n.index,reward:n.result.score,reason:t}),hl(n,e,!0,i)}function Fo(n,t,e,i=.15){return oe(n,t,e,i)}function Iv(n,t,e=[]){const i=Gl(n,t);return i.sort((s,r)=>r.length-s.length||r.filter(o=>e.includes(o.id)).length-s.filter(o=>e.includes(o.id)).length||Math.min(...s.map(o=>o.id))-Math.min(...r.map(o=>o.id))),i[0]||[]}function Lv(n,t,e,i){const s=[e.drone&&"drone"].filter(Boolean);if(n.helpers||=[],n.helpers=n.helpers.filter(p=>s.includes(p.type)||e.helper&&p.type==="helper"),!s.length||!t.length)return{helpers:[],group:[],memberIds:new Set,hold:!1};const r=n.companionHerd||={},o=t.map(p=>p.id).join(",");(!r.group||r.activeSignature!==o||n.time-r.clusterTime>.25)&&(r.group=Iv(n,t,r.clusterIds),r.activeSignature=o,r.clusterTime=n.time);const a=r.group;if(a.length<2){r.mode="standby",r.clusterIds=[],r.positions={};for(const p of s){let m=n.helpers.find(g=>g.type===p);m||(m={type:p,x:n.dog.x,z:n.dog.z},n.helpers.push(m)),m.mode="standby",m.clusterIds=[],m.anchor={x:m.x,z:m.z}}return{helpers:n.helpers,group:[],memberIds:new Set,hold:!1,state:r}}const c=ll(a),l=a.map(p=>p.id),h=new Set(l);let u=1/0;for(const p of a){const m=ei(n.dog,p);m<=18&&m<u&&Fo(n,n.dog,p)&&(u=m)}const f=r.mode&&r.mode!=="standby"?r.mode==="hold"?u>=12:u>18:u>14,d=(r.clusterIds||[]).filter(p=>h.has(p)).length,x=!r.clusterIds||d<Math.min(r.clusterIds.length,l.length)/2;if(f&&(r.mode!=="hold"||x)&&(r.anchor={...c},r.positions=Object.fromEntries(a.map(p=>[p.id,{x:p.x,z:p.z}]))),f||(r.anchor={...c},r.positions={}),f)for(const p of a)r.positions[p.id]||={x:p.x,z:p.z};r.mode=f?"hold":"assist",r.clusterIds=l;for(const p of s){let m=n.helpers.find(M=>M.type===p);m||(m={type:p,x:p==="drone"?c.x:n.dog.x,z:p==="drone"?c.z:n.dog.z},n.helpers.push(m)),m.mode=r.mode,m.clusterIds=[...l],m.anchor={...r.anchor};const g=Kn(c.x-m.x,c.z-m.z),v=Math.min(ei(m,c),i*6);m.x+=g.x*v,m.z+=g.z*v}return{helpers:n.helpers,group:a,centroid:c,memberIds:h,hold:f,state:r}}function Uv(n,t,e,i){const s=new Map;if(!t.group.length||t.hold)return s;const{group:r,centroid:o}=t,a=Kn(o.x-e.x,o.z-e.z),c={x:-a.z,z:a.x},l=Math.min(1.2,i.droneStrength*.35),h=Math.max(2.1,Math.sqrt(r.length)*.66);for(const f of r){const d=(o.x-f.x)*c.x+(o.z-f.z)*c.z,x=cn(Math.sign(d)*Math.max(0,Math.abs(d)-h)*l,-.75,.75),p={x:c.x*x,z:c.z*x},m=ve(f);x&&!Fo(n,f,{x:f.x+p.x,z:f.z+p.z},m)||ae(n,f.x+p.x*.7,f.z+p.z*.7,m)&&s.set(f.id,p)}const u=[...s.values()].reduce((f,d)=>({x:f.x+d.x,z:f.z+d.z}),{x:0,z:0});for(const f of s.values())f.x-=u.x/s.size,f.z-=u.z/s.size;return s}function ud(n,t,e){if(t<=0)return;const i=tn(n.target);for(const s of n.animals){if(!s.saved)continue;const r=ve(s),o=Vo(n.target,s),a=s.roamPhase??s.id*2.399963229728653;s.roamPhase=a;const c=i.halfLength-r-.48,l=i.halfWidth-r-.24,h=Math.floor((e+s.id*7%19)/32);if(!s.arrivalRest||s.arrivalRest.epoch!==h){let P=null,y=-1/0;const b=2.3,D=-c*.25;for(let U=D;U<=c;U+=b)for(let B=-l;B<=l;B+=b){const G=wi(n.target,U,B);if(!ae(n,G.x,G.z,r)||!oe(n,s,G,r))continue;let Z=1/0;for(const T of n.animals){if(T===s||!T.saved)continue;const z=T.arrivalRest?.point||T;Z=Math.min(Z,ei(G,z)-r-ve(T))}const F=Math.min(3,Z)+U*.025-ei(G,s)*.025+Math.sin(a+U+B+h)*.04;F>y&&(y=F,P={point:G,forward:U,lateral:B,epoch:h})}s.arrivalRest=P||{point:{x:s.x,z:s.z},forward:o.forward,lateral:o.lateral,epoch:h}}const u=s.arrivalRest,f=Math.hypot(u.forward-o.forward,u.lateral-o.lateral)<.12;let d=f?0:(u.forward-o.forward)*.65,x=f?0:(u.lateral-o.lateral)*.65;for(const P of n.animals){if(P===s||!P.saved)continue;const y=s.x-P.x,b=s.z-P.z,D=Math.hypot(y,b),U=r+ve(P)+.35;if(D>1e-4&&D<U){const B=(U-D)/D*2.5;d+=(y*i.forward.x+b*i.forward.z)*B,x+=(y*i.side.x+b*i.side.z)*B}}const p=-i.halfLength+r;o.forward<p+.45&&(d+=(p+.45-o.forward)*1.2);const m=i.forward,g=i.side;let v=m.x*d+g.x*x,M=m.z*d+g.z*x;const _=Math.hypot(v,M);_>.65&&(v*=.65/_,M*=.65/_);const S={x:s.x,z:s.z};fr(n,s,v*t,M*t,r);const w=P=>n.animals.reduce((y,b)=>b===s||!b.saved?y:y+Math.max(0,r+ve(b)+.04-ei(P,b))**2,0),A=w(S);if((w(s)>A+1e-10||!(ae(n,s.x,s.z,r)&&Fs(n.target,s,r)))&&(s.x=S.x,s.z=S.z,A>1e-8)){let P=S,y=A;for(let b=0;b<16;b++){const D=b*Math.PI/8,U={x:S.x+Math.sin(D)*.45*t,z:S.z+Math.cos(D)*.45*t};if(!ae(n,U.x,U.z,r)||!Fs(n.target,U,r)||!oe(n,S,U,r))continue;const B=w(U);B<y-1e-10&&(P=U,y=B)}s.x=P.x,s.z=P.z}s.vx=(s.x-S.x)/t,s.vz=(s.z-S.z)/t,s.alert=0,ed(n,s,0,t,void 0,e),s.heading=Math.hypot(s.vx,s.vz)>.03?Math.atan2(s.vx,s.vz):s.heading||0}}function Nv(n,t=1/60){t=cn(Number(t)||0,0,.1),n.completed&&t>0&&(n.savedRoamTime=(n.savedRoamTime??(n.time||0))+t,ud(n,t,n.savedRoamTime))}function Fv(n,t,e={},i=1/60,s={}){const r=Ko(s,n.index+1);if(i=cn(Number(i)||0,0,.1),n.completed||i<=0)return hl(n);if(i>0&&n.delivery?.started&&(n.delivery.remaining=Math.max(0,n.delivery.remaining-i),n.delivery.remaining<=1e-8))return n.delivery.remaining=0,Pu(n,"timeout");n.time=(n.time||0)+i;const o=cl(n);ud(n,i,n.time);const a=[],c=Number(e.x)||0,l=Number(e.z??e.y)||0,h=Math.min(1,Math.hypot(c,l)),u=Kn(c,l),f=7.8+r.speedBoost,d={x:t.x,z:t.z},x=fr(n,t,u.x*h*f*i,u.z*h*f*i,.62);t.vx=i?(t.x-d.x)/i:0,t.vz=i?(t.z-d.z)/i:0,t.heading=h>.03?Math.atan2(u.x,u.z):t.heading||0,n.dog=t;const p=n.animals.filter(F=>!F.saved),m=Lv(n,p,r,i),g=Uv(n,m,t,r),v=fv(n,p,r,i,a);a.push(...zv(n,t));const M=7.6+r.signalBoost+(e.bark?3.3:0),_=p.map(F=>({...F})),S=n.flockVisibility||=new Map,w=new Map(_.map(F=>[F.id,`${Math.floor(F.x*5)},${Math.floor(F.z*5)}`])),A=(F,T)=>{const z=F.id<T.id?F:T,k=F.id<T.id?T:F,H=`${z.id}:${k.id}`,N=`${w.get(z.id)}:${w.get(k.id)}`,Y=S.get(H);if(Y?.position===N)return Y.clear;const nt=oe(n,F,T,.15);return S.set(H,{position:N,clear:nt}),nt},P=new Map(_.map(F=>{const T=ei(F,t),z=T<M&&Xd(n,F,t),k=z?Math.pow(1-T/M,.65)*(e.bark?1.65+r.barkBoost:1):0,H=T>.01?Kn(F.x-t.x,F.z-t.z):Kn(Math.sin(t.heading||0),Math.cos(t.heading||0));return[F.id,{active:z,urgency:k,x:H.x*k*5.2,z:H.z*k*5.2}]})),y=new Map,b=new Map,D=n.flockTravel||[],U=[];Gl(n,_,A).forEach((F,T)=>{const z=F.filter(I=>!I.wander&&!I.wanderHome),k=z.length?z:F,H=ll(k);let N=0,Y=0,nt=0,ht=0;for(const I of k){N+=(I.vx||0)/k.length,Y+=(I.vz||0)/k.length;const Lt=P.get(I.id),Ft=v.forces.get(I.id);nt+=(Lt.x+(Ft?.x||0))/k.length,ht+=(Lt.z+(Ft?.z||0))/k.length}const Et=F.map(I=>I.id),q=new Set(Et),$=D.map(I=>({v:I,count:I.ids.filter(Lt=>q.has(Lt)).length})).sort((I,Lt)=>Lt.count-I.count)[0],ct=Math.hypot(N,Y),vt=Math.hypot(nt,ht),dt=ct>.28?Kn(N,Y):vt>.03?Kn(nt,ht):$?.count?$.v.forward:null,Zt=dt?Math.max(ct>.28?N*dt.x+Y*dt.z:0,vt>.03?(nt*dt.x+ht*dt.z)*.65:0,0):0,Qt={center:H,forward:dt,drive:Zt,pressure:vt};U.push({ids:Et,forward:dt}),b.set(T,Qt);for(const I of F)y.set(I.id,T)}),n.flockTravel=U;const B={...n,obstacles:[]};for(let F=0;F<p.length;F++){const T=p[F],z=_[F],k=ve(T),H=td(n,T),N=mv(n,T,z),Y=N?.finished?null:N;N?.finished&&m.hold&&m.memberIds.has(T.id)&&(m.state.positions[T.id]={x:z.x,z:z.z});let nt=0,ht=0,Et=0,q=0,$=0,ct=0,vt=0,dt=0,Zt=0,Qt=0;for(const et of _){if(et.id===T.id)continue;const xt=z.x-et.x,_t=z.z-et.z,at=Math.hypot(xt,_t),Ut=Math.max(T.type==="cow"?2.15:2,k+ve(et)+.35);if(at<Ut&&at>.01){const O=(Ut-at)/at;nt+=xt*O,ht+=_t*O}if(at<18&&y.get(z.id)===y.get(et.id)&&A(z,et)){const O=at<6&&Zt<2&&JM(n,T,et)?(Zt++,1.12):1;Et+=et.x*O,q+=et.z*O,dt+=O,$+=et.vx,ct+=et.vz,vt++}}let I=nt*2.5,Lt=ht*2.5;const Ft=P.get(T.id),yt=Ft.active,Tt=v.memberIds.has(T.id),tt=!m.hold&&m.memberIds.has(T.id)||Tt;if((yt||tt||Y)&&(delete T.wander,delete T.wanderHome),yt&&(I+=Ft.x*H.confidence,Lt+=Ft.z*H.confidence,Qt=Ft.urgency,T.lastPlayerPressure=n.time),Tt){const et=v.forces.get(T.id);I+=et.x,Lt+=et.z,Qt=Math.max(Qt,.45)}const st=v.holds?.get(T.id);N?.finished&&n.buddyHerd?.containment?.positions[T.id]&&(Object.assign(n.buddyHerd.containment.positions[T.id],{x:z.x,z:z.z}),n.buddyHerd?.containment&&(n.buddyHerd.containment.anchor={x:z.x,z:z.z}));const ot=!Y&&!yt&&Qt<.03&&(!!st||m.hold&&m.memberIds.has(T.id)),Ot=()=>{T.wanderHome={x:z.x,z:z.z},delete T.wander};T.wander&&(n.time>=T.wander.until||!o.has(T.id))&&Ot();const Yt=Rv(n,T,i);if(Yt!==null&&Qt<.03){const et=m.centroid||ll(_),xt=Av(n,T,Yt,et,yt||tt||ot||!!Y);xt&&(xt.bolting||(xt.departAt=n.time+.35,xt.until+=.35),T.wander=xt)}let C=T.wander;if(ot){const et=st||m.state.positions[T.id];if(st){const xt=Dv(n,T,et),_t=xt.x-z.x,at=xt.z-z.z,Ut=Math.hypot(_t,at);I=(Ut>.055?_t*.9:0)+nt*.35,Lt=(Ut>.055?at*.9:0)+ht*.35;const O=Math.hypot(I,Lt);O>.38&&(I*=.38/O,Lt*=.38/O)}else delete T.buddyRest,I=cn((et.x-z.x)*2.6+nt*.35,-1.1,1.1),Lt=cn((et.z-z.z)*2.6+ht*.35,-1.1,1.1)}else{if(delete T.buddyRest,vt&&!C&&!T.wanderHome&&!(Tt&&n.buddyHerd?.retrieveId===T.id)){const xt=Et/dt-z.x,_t=q/dt-z.z,at=Math.hypot(xt,_t),Ut=b.get(y.get(T.id)),O=Ut.forward,ft=O&&(z.x-Ut.center.x)*O.x+(z.z-Ut.center.z)*O.z>.6;if(at>2.6){const gt=Kn(xt,_t),Ct=Math.min(2.6,(at-2.6)*.36)*.7*(1+r.cohesionBoost)*H.follow*(T.type==="cow"?.96:1);let lt=gt.x*Ct,it=gt.z*Ct;const Dt=ft?Math.min(0,lt*O.x+it*O.z):0;Dt&&(lt-=O.x*Dt,it-=O.z*Dt),I+=lt,Lt+=it}if(I+=$/vt*.45,Lt+=ct/vt*.45,ft&&Ut.drive>.03&&!yt&&!Tt){const gt=Math.max(0,Ut.drive-I*O.x-Lt*O.z);I+=O.x*gt,Lt+=O.z*gt,Ut.pressure>.03&&(Qt=Math.max(Qt,Math.min(.35,Ut.pressure/5.2)))}}const et=g.get(T.id);if(et&&ae(n,z.x+et.x*.7,z.z+et.z*.7,k)&&Fo(n,z,{x:z.x+et.x,z:z.z+et.z},k)&&(I+=et.x,Lt+=et.z),Qt<.03&&(I+=Math.sin(n.time*.6+T.id*2.1)*.12,Lt+=Math.cos(n.time*.5+T.id*1.7)*.12),C&&!(C.departAt>n.time+1e-9)){const xt=C.x-z.x,_t=C.z-z.z,at=Math.hypot(xt,_t);at>.35?(I+=xt/at*(C.bolting?5.8:2.1),Lt+=_t/at*(C.bolting?5.8:2.1)):(Ot(),C=null)}if(T.wanderHome&&!yt&&!tt){const xt=T.wanderHome,_t=T.id*2.39996;I=(xt.x+Math.sin(n.time*.24+_t)*1.4-z.x)*.35+nt*.2,Lt=(xt.z+Math.cos(n.time*.19+_t)*1.4-z.z)*.35+ht*.2}}const E=n.helpers.some(et=>et.type==="helper"&&et.mode!=="standby"&&et.clusterIds?.includes(T.id)&&ei(et,T)<12&&oe(B,et,T,.15)),V=QM(n,T,yt||tt||E||ot||!!Y||!!C||!!T.wanderHome||Qt>.03,i);V&&(I=V.x+nt*.3,Lt=V.z+ht*.3);const J=V?.preparing?V:C&&!C.bolting&&C.departAt>n.time+1e-9?{heading:Math.atan2(C.x-z.x,C.z-z.z),anticipation:cn(1-(C.departAt-n.time)/.35,.01,1)}:null;if(J?(I=nt*.3,Lt=ht*.3,T.ordinaryAnticipation=J.anticipation,T.ordinaryAttentionHeading=J.heading):(delete T.ordinaryAnticipation,delete T.ordinaryAttentionHeading),ed(n,T,Qt,i,yt?Math.atan2(t.x-T.x,t.z-T.z):T.heading),Qt>.03&&!Y&&!ot&&!T.wanderHome&&!C?.bolting){const et=Tt?v.forces.get(T.id):null,xt={x:(yt?Ft.x:0)+(et?.x||0),z:(yt?Ft.z:0)+(et?.z||0)};({x:I,z:Lt}=wv(n,T,z,_,{x:I,z:Lt},xt,{x:nt*2.5,z:ht*2.5}))}else delete T.chokeYield;if(Y){const et=cn(nt*Y.forward.z-ht*Y.forward.x,-.7,.7),xt=T.type==="cow"?2.7:3.2;I=Y.x*xt+Y.forward.z*et*.5,Lt=Y.z*xt-Y.forward.x*et*.5,Qt=Math.max(Qt,.4)}if(Qt>.03&&!Y){const et=Kd(n,T,I,Lt,k);I+=et.x,Lt+=et.z}const rt=T.wanderHome&&!ot?.75:C?.bolting?6:T.type==="cow"?3.3:4.2,Q=Math.hypot(I,Lt);Q>rt&&(I*=rt/Q,Lt*=rt/Q);const zt=1-Math.exp(-i*(ot?12:T.type==="cow"?3.5:5.5));T.vx+=(I-T.vx)*zt,T.vz+=(Lt-T.vz)*zt;const mt=!ot&&T.wanderHome,At=mt&&Math.hypot(T.x+T.vx*i-mt.x,T.z+T.vz*i-mt.z)>3,bt=fr(n,T,At?0:T.vx*i,At?0:T.vz*i,k);if((bt.blockedX||bt.blockedZ)&&Qt>.03){const et=Kn(T.vx,T.vz),xt=Math.min(.24,Math.hypot(T.vx,T.vz)*i);for(const _t of[Math.PI/6,-Math.PI/6,Math.PI/3,-Math.PI/3,Math.PI/2,-Math.PI/2]){const at=(et.x*Math.cos(_t)-et.z*Math.sin(_t))*xt,Ut=(et.x*Math.sin(_t)+et.z*Math.cos(_t))*xt;if(ae(n,T.x+at,T.z+Ut,k)){fr(n,T,at,Ut,k);break}}}if(bt.blockedX&&(T.vx*=.45),bt.blockedZ&&(T.vz*=.45),J)T.heading=J.heading;else if(Math.hypot(T.vx,T.vz)>.1)T.heading=Math.atan2(T.vx,T.vz);else if(ot&&T.buddyRest?.facing!==void 0){const et=T.heading||0,xt=T.buddyRest.facing,_t=Math.atan2(Math.sin(xt-et),Math.cos(xt-et)),at=T.type==="cow"?Math.PI/1.5:Math.PI;T.heading=et+cn(_t,-at*i,at*i)}else T.heading||=0;T.alert=Qt,T.pushed=yt||Tt;const ut=ei(t,n.target)<n.target.radius+12;i>0&&ut&&!ot&&Fs(n.target,T,k)&&Fo(n,t,T)&&(T.saved=!0,T.vx=0,T.vz=0,delete T.wander,delete T.wanderHome,delete T.nextWanderCheck,delete T.wanderOpportunity,delete T.buddyNavigation,delete T.bridgeCrossing,delete T.chokeYield,delete T.lastBridge,delete T.pushed,a.push({type:"animalSaved",id:T.id,animalType:T.type}))}const G=cl(n);for(const F of n.animals)!F.saved&&F.wander&&!G.has(F.id)&&(F.wanderHome={x:F.x,z:F.z},delete F.wander);const Z=n.animals.filter(F=>F.saved).length;if(a.some(F=>F.type==="animalSaved")&&!n.delivery?.started){const F=hd(n);n.delivery={started:!0,duration:F,remaining:F},a.push({type:"countdownStarted",duration:F})}return Z===n.animals.length&&Z>0?Pu(n,"all-arrived",a,x):hl(n,a,!1,x)}function Ar(){return{version:2,points:0,upgrades:{},completedLevels:[],bestScores:{},bestEarnedBolts:{},highestLevel:0,music:!0}}const Vl=n=>80+n*25;function Ov(n){const t={};if(!n||typeof n!="object"||Array.isArray(n))return t;for(const[e,i]of Object.entries(n)){const s=Number(e);String(s)!==e||!Number.isInteger(s)||s<0||s>99||!Number.isFinite(i)||i<=0||(t[s]=cn(Math.floor(i),0,Vl(s)),t[s]||delete t[s])}return t}function Wl(n){const t=Ar();if(!n||typeof n!="object")return t;t.points=Number.isFinite(n.points)?cn(Math.floor(n.points),0,1e9):0,t.upgrades=nd(n.upgrades);const e=[...new Set((Array.isArray(n.completedLevels)?n.completedLevels:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<=99))];if(t.bestEarnedBolts=Ov(n.bestEarnedBolts),n.version===void 0||n.version===1)for(const i of e)t.bestEarnedBolts[i]=Vl(i);return t.bestScores={...t.bestEarnedBolts},t.completedLevels=Object.keys(t.bestEarnedBolts).map(Number).sort((i,s)=>i-s),t.highestLevel=cn(Math.max(Number.isInteger(n.highestLevel)?n.highestLevel:0,...t.completedLevels.map(i=>i+1)),0,99),t.music=n.music!==!1,t}function Bv(n,t){if(!t.completed||!Number.isInteger(t.index)||t.index<0||t.index>99)return 0;const e=t.result?.saved??t.animals.filter(o=>o.saved).length;if(e<=0||!t.animals.length)return 0;Object.assign(n,Wl(n));const i=Math.min(Vl(t.index),Hl(t,e)),s=n.bestEarnedBolts[t.index]||0,r=Math.max(0,i-s);return n.bestScores[t.index]=Math.max(n.bestScores[t.index]||0,i),n.bestEarnedBolts[t.index]=Math.max(s,i),n.completedLevels.includes(t.index)||n.completedLevels.push(t.index),n.completedLevels.sort((o,a)=>o-a),n.highestLevel=Math.min(99,Math.max(n.highestLevel,t.index+1)),n.points+=r,r}function kv(n,t="flock-foundry-v1"){try{return n||=globalThis.localStorage,Wl(JSON.parse(n.getItem(t)))}catch{return Ar()}}function Gv(n,t,e="flock-foundry-v1"){try{return t||=globalThis.localStorage,t.setItem(e,JSON.stringify(Wl(n))),!0}catch{return!1}}const je=(n,t=0,e=1)=>Math.max(t,Math.min(e,n));function Hv(n){const t=Math.max(0,...(n.routes||[]).map(e=>Number.isFinite(e.length)?e.length:0));return je(t/2+hd(n),45,240)}function or(n,t){let e=((n||0)^Math.imul(t,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),((e^e>>>15)>>>0)/4294967296}const zu=n=>n?.position?{x:n.position.x,z:n.position.z}:n,Vv=new Xt(4350794),Wv=new Xt(5784367),Xv=new Xt(7714243);function qv(n,t,e){const i=e.x-t.x,s=e.z-t.z,r=je(((n.x-t.x)*i+(n.z-t.z)*s)/(i*i+s*s||1));return Math.hypot(n.x-t.x-i*r,n.z-t.z-s*r)}function Qa(n,t){if(!ae(n,t.x,t.z,.4))return!1;for(const e of n.rivers||[]){if(e.points.some((i,s)=>s&&qv(t,e.points[s-1],i)<e.width/2+.8))return!1;for(const i of e.bridges||[]){const s=t.x-i.x,r=t.z-i.z,o=s*Math.sin(i.heading)+r*Math.cos(i.heading),a=s*Math.cos(i.heading)-r*Math.sin(i.heading);if(Math.abs(o)<i.length/2+.45&&Math.abs(a)<i.width/2+.45)return!1}}return!0}function Zv(){const t=new Uint8Array(65536);for(let i=0;i<128;i++)for(let s=0;s<128;s++){const r=(i*128+s)*4,o=s/127,a=i/127,c=Math.PI*2,l=.15*Math.sin(o*c)+.07*Math.sin((o+a)*c*2),h=Math.sin(c*(a*3+l)),u=Math.sin(c*(a*5-o*2+.08*Math.sin(a*c))),f=.48+.52*(.5+.5*Math.sin(c*(o*2+a))),d=je((Math.pow(Math.max(0,h),5)*f+Math.pow(Math.max(0,u),9)*.25)*(.7+.3*Math.cos(o*c*3))),x=Math.abs(o<=.5?o:o-1),p=1-je((x-.36)/.14);t[r]=185,t[r+1]=218,t[r+2]=224,t[r+3]=Math.round(255*d*p)}const e=new Il(t,128,128);return e.wrapS=e.wrapT=ni,e.repeat.set(1,5),e.magFilter=e.minFilter=xn,e.needsUpdate=!0,e}function Yv(n,t){const e=n.points.filter((u,f,d)=>!f||Math.hypot(u.x-d[f-1].x,u.z-d[f-1].z)>1e-6);if(e.length<2)return t.clone();const i=[],s=[],r=[],o=(n.width||4)/2,a=t.attributes.position.getY(0),c=[];for(let u=1;u<e.length;u++){const f=e[u].x-e[u-1].x,d=e[u].z-e[u-1].z,x=Math.hypot(f,d);c.push({x:-d/x,z:f/x})}let l=0;for(let u=0;u<e.length;u++){const f=e[u],d=c[Math.max(0,u-1)],x=c[Math.min(c.length-1,u)];u&&(l+=Math.hypot(f.x-e[u-1].x,f.z-e[u-1].z));const p=(d.x+x.x)*.5,m=(d.z+x.z)*.5;for(const g of[-1,0,1])i.push(f.x+p*o*g,a,f.z+m*o*g),s.push(g*.5,l/4);if(u){const g=(u-1)*3,v=u*3;r.push(g,g+1,v+1,g,v+1,v,g+1,g+2,v+2,g+1,v+2,v+1)}}const h=new me;return h.setAttribute("position",new qt(i,3)),h.setAttribute("uv",new qt(s,2)),h.setIndex(r),h}class $v{constructor(t,{maxSplashes:e=12,maxPuddles:i=8}={}){this.scene=t,this.root=new ee,this.root.name="Water and wetness effects",t.add(this.root),this.maxSplashes=Math.max(0,e|0),this.maxPuddles=Math.max(0,i|0),this.elapsed=0,this.wetness=0,this.level=null,this.flowMap=Zv(),this.flowMaterial=new Ve({map:this.flowMap,color:16777215,transparent:!0,opacity:.2,depthWrite:!1,toneMapped:!1,side:ze}),this.splashGeometry=new qo(.2,.025,4,12),this.splashes=[],this.puddles=[],this.materialSnapshots=[],this.riverSnapshots=[],this.lastMoverPositions=new Map,this.lastSplashAt=new Map}setLevel(t,{grassMaterials:e=[],pathMaterials:i=[],waterMaterial:s=null,terrain:r=null,rivers:o=[],weather:a=null}={}){this.restoreMaterials(),this.clearEffects(),this.level=t,this.terrain=r,this.rivers=o,this.wetness=0,this.elapsed=0,this.puddleGrowthDuration=Hv(t),this.rainElapsed=0,this.lastMoverPositions.clear(),this.lastSplashAt.clear();for(const[u,f]of[["grass",e],["path",i]])for(const d of Array.isArray(f)?f:[f])d?.color&&this.materialSnapshots.push({material:d,kind:u,color:d.color.clone(),roughness:d.roughness});this.waterSnapshot=s?{material:s,color:s.color?.clone(),roughness:s.roughness}:null;for(const u of o){if(!u?.mesh)continue;const f=u.mesh,d=this.flowMap.clone();d.repeat.set(1,1);const x=this.flowMaterial.clone();x.map=d,x.userData.ownedFlowMap=d;const p=u.points,m=p?.length>1?Yv(u,f.geometry):f.geometry.clone(),g=new ne(m,x);g.name="River flow",g.position.copy(f.position),g.position.y+=.003,g.rotation.copy(f.rotation),g.scale.copy(f.scale),g.frustumCulled=f.frustumCulled,g.userData.flow={heading:u.heading||0,speed:u.flowSpeed??.12,localUV:p?.length>1},this.root.add(g)}for(let u=0;u<this.maxSplashes;u++){const f=new Ve({color:13233904,transparent:!0,opacity:.78,depthWrite:!1}),d=new ne(this.splashGeometry,f);d.visible=!1,d.rotation.x=-Math.PI/2,this.root.add(d),this.splashes.push({mesh:d,material:f,age:1})}const c=new Ll(1,20);this.puddleResources={geometry:c};const l=t.seed??t.index??0,h=or(l,71)<.5?0:1+Math.floor(or(l,72)*3);for(const u of this.findPuddleSites()){const f=new Ve({color:4549225,transparent:!0,opacity:.2,depthWrite:!1,side:ze}),d=new ne(c,f);d.rotation.x=-Math.PI/2,d.visible=!1,d.position.set(u.x,Pn(t,u.x,u.z)+.024,u.z),d.scale.set(u.radius,u.radius*.62,1),this.root.add(d),this.puddles.push({mesh:d,material:f,depth:0,site:u,initialDepth:this.puddles.length<h?.1+or(l,80+this.puddles.length)*.1:0})}if(a){this.wetness=a.kind==="storm"?.6:a.kind==="heavy-rain"?.35:a.type==="rain"?.03:0;for(const u of this.puddles)u.depth=a.type==="rain"?u.initialDepth:0,this.applyPuddleAppearance(u);this.applySurfaceWeather(a)}}findPuddleSites(){const t=this.level,e=t.bounds,i=[],s=e.maxX-e.minX,r=e.maxZ-e.minZ,o=t.seed??t.index??0,a=(l,h)=>{const{x:u,z:f}=l,d=Array.from({length:48},(x,p)=>{const m=1+Math.floor(p/16),g=p%16*Math.PI/8;return{x:u+Math.cos(g)*h*m/3,z:f+Math.sin(g)*h*.62*m/3}});return!Qa(t,l)||d.some(x=>!Qa(t,x))||i.some(x=>Math.hypot(x.x-u,x.z-f)<x.radius+h+.3)?!1:(i.push({...l,radius:h}),!0)},c=(t.routes||[]).filter(l=>l.points?.length>1);for(let l=0;l<this.maxPuddles&&c.length;l++){const h=c[l%c.length],u=h.points,f=u.slice(1).map((m,g)=>Math.hypot(m.x-u[g].x,m.z-u[g].z)),d=f.reduce((m,g)=>m+g,0),x=1.35+or(o,150+l)*.69,p=l/Math.max(1,this.maxPuddles-1);for(let m=0;m<35;m++){let g=je(p+(m<7?0:(Math.ceil((m-6)/7)%2?1:-1)*.035))*d,v=0;for(;v<f.length-1&&g>f[v];)g-=f[v++];const M=u[v],_=u[v+1],S=f[v]||1,w=je(g/S),A=[0,2.5,-2.5,4,-4,6,-6][m%7]*(or(o,200+l)<.5?-1:1),P={x:M.x+(_.x-M.x)*w-(_.z-M.z)/S*A,z:M.z+(_.z-M.z)*w+(_.x-M.x)/S*A};if(a(P,x))break}}for(let l=1;l<Math.max(100,this.maxPuddles*80)&&i.length<this.maxPuddles;l++){const h=e.minX+2+l*.61803398875%1*Math.max(1,s-4),u=e.minZ+2+l*.75487766625%1*Math.max(1,r-4);a({x:h,z:u},1.35+l*37%70/100)}return i}applyPuddleAppearance(t){const e=Math.sqrt(t.depth);t.mesh.scale.set(t.site.radius*e,t.site.radius*.62*e,1),t.mesh.visible=t.depth>.008,t.material.opacity=t.mesh.visible?.18+t.depth*.24:0}restoreMaterials(){for(const t of this.materialSnapshots)t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color.dispose?.();if(this.materialSnapshots=[],this.waterSnapshot){const t=this.waterSnapshot;t.color&&t.material.color&&t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color?.dispose?.(),this.waterSnapshot=null}}clearEffects(){for(const t of this.splashes)this.root.remove(t.mesh),t.material.dispose();for(const t of this.puddles)this.root.remove(t.mesh),t.material.dispose();this.splashes=[],this.puddles=[],this.puddleResources&&(this.puddleResources.geometry.dispose(),this.puddleResources=null);for(const t of[...this.root.children])t.name==="River flow"&&(this.root.remove(t),t.material.userData.ownedFlowMap?.dispose(),t.material.dispose(),t.geometry.dispose())}applySurfaceWeather(t={}){const e=t.type==="rain"?je(t.rainIntensity??t.intensity??0):0;for(const i of this.materialSnapshots){const s=this.wetness*(i.kind==="grass"?.62:.85);i.material.color.copy(i.color).lerp(i.kind==="grass"?Vv:Wv,s),i.roughness!==void 0&&(i.material.roughness=Math.max(.28,i.roughness-this.wetness*.22))}if(this.waterSnapshot){const i=this.waterSnapshot,s=je(t.cloudCoverage??0);i.material.color&&i.color&&i.material.color.copy(i.color).lerp(Xv,je((t.rainIntensity??e)*.11+s*.035+(t.severity||0)*.025+(t.lightningFlash||0)*.09)),i.roughness!==void 0&&(i.material.roughness=je(i.roughness-(t.rainIntensity??e)*.16,.12,1))}}update(t,{weather:e={},movers:i=[],paused:s=!1}={}){if(!this.level||s||!(t>0))return;t=Math.min(t,.1),this.elapsed+=t;const r=e.type==="rain"?je(e.rainIntensity??e.intensity??0):0;this.wetness=je(this.wetness+r*t*.012-t*(e.type==="sun"?.004:.0012)),this.applySurfaceWeather(e);for(const o of this.root.children)if(o.userData.flow){const a=o.userData.flow,c=o.material.map,l=t*(a.speed+(e.windIntensity||0)*.025);c.offset.x=(c.offset.x+(a.localUV?0:Math.sin(a.heading))*l)%1,c.offset.y=(c.offset.y+(a.localUV?1:Math.cos(a.heading))*l)%1,o.material.opacity=.18+r*.06+(e.daylight??.7)*.015+(e.lightningFlash||0)*.04}r>0&&(this.rainElapsed+=t);for(const o of this.puddles)o.depth=r>0?je(o.initialDepth+(1-o.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):je(o.depth-t*(e.type==="sun"?.006:8e-4)),this.applyPuddleAppearance(o);for(const o of i){const a=zu(o);if(!a||!Number.isFinite(a.x)||!Number.isFinite(a.z))continue;const c=o.id??o.kind??"mover",l=zu(o.previousPosition)||(Number.isFinite(o.previousX)?{x:o.previousX,z:o.previousZ}:this.lastMoverPositions.get(c)),h=l&&Math.hypot(a.x-l.x,a.z-l.z)>.008,u=this.puddles.find(f=>f.mesh.visible&&(a.x-f.site.x)**2/f.site.radius**2+(a.z-f.site.z)**2/(f.site.radius*.62)**2<f.depth);h&&u&&Qa(this.level,a)&&this.elapsed-(this.lastSplashAt.get(c)||-10)>.22&&(this.spawnSplash(a),this.lastSplashAt.set(c,this.elapsed)),this.lastMoverPositions.set(c,{x:a.x,z:a.z})}for(const o of this.splashes)o.age>=1||(o.age=Math.min(1,o.age+t*2.4),o.mesh.scale.setScalar(.4+o.age*2.3),o.mesh.position.y=.06+Pn(this.level,o.mesh.position.x,o.mesh.position.z)+o.age*.06,o.material.opacity=.78*(1-o.age),o.age>=1&&(o.mesh.visible=!1))}spawnSplash(t){const e=this.splashes.find(i=>i.age>=1);e&&(e.age=0,e.mesh.position.set(t.x,Pn(this.level,t.x,t.z)+.08,t.z),e.mesh.scale.setScalar(.35),e.mesh.visible=!0)}dispose(){this.restoreMaterials(),this.clearEffects(),this.root.removeFromParent(),this.flowMap.dispose(),this.flowMaterial.dispose(),this.splashGeometry.dispose(),this.level=null,this.scene=null}}const fd={sun:{rainIntensity:0,windIntensity:.12,severity:0,cloudCoverage:.22,daylight:1},wind:{rainIntensity:0,windIntensity:.6,severity:.3,cloudCoverage:.4,daylight:.96},rain:{rainIntensity:.3,windIntensity:.3,severity:.28,cloudCoverage:.5,daylight:.94},"heavy-rain":{rainIntensity:.65,windIntensity:.55,severity:.6,cloudCoverage:.7,daylight:.82},storm:{rainIntensity:.9,windIntensity:.85,severity:.88,cloudCoverage:.85,daylight:.7}};function Xl(n,t){let e=(n^Math.imul(t+1,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),(e^e>>>15)>>>0}function Kv(n,t,e){const i=e+1;if(i<=5)return"sun";const s=typeof n.weather=="string"?n.weather:n.weather?.kind||n.weather?.type,r=s==="light-rain"||s==="snow"?"rain":s;if(r&&fd[r])return r==="sun"||r==="wind"?r:i<9?"sun":r==="storm"&&i>=24?"storm":(r==="storm"||r==="heavy-rain")&&i>=16?"heavy-rain":"rain";if(i===9)return"rain";if(i===16)return"heavy-rain";if(i===24)return"storm";const o=Xl(t,e)/4294967296;return i<9?o<.65?"sun":"wind":i<16?o<.35?"sun":o<.5?"wind":"rain":i<24?o<.25?"sun":o<.35?"wind":o<.65?"rain":"heavy-rain":o<.2?"sun":o<.3?"wind":o<.5?"rain":o<.75?"heavy-rain":"storm"}function dd(n={}){const t=Number.isFinite(n.index)?Math.max(0,Math.floor(n.index)):0,e=Number.isFinite(n.seed)?n.seed>>>0:42,i=Kv(n,e,t),s=fd[i];return{...s,kind:i,type:i==="heavy-rain"||i==="storm"?"rain":i,snowIntensity:0,storm:i==="storm",elapsed:0,seed:e,levelIndex:t,intensity:Math.max(s.rainIntensity,i==="wind"?s.windIntensity:0),wind:.2+s.windIntensity*1.6,particles:s.rainIntensity>0?128:0,lightningId:null,lightningAge:1/0,thunderDelay:.8,lightningFlash:0,clouds:0,butterflies:i==="storm"?0:s.rainIntensity>0?4:8,birds:i==="storm"?0:5,squirrels:i==="storm"?0:3,lightningStart:8+Xl(e,t+1e3)%401/100,lightningInterval:24}}function jv(n,t){if(Number.isFinite(t)&&t>0&&(n.elapsed+=t),!n.storm)return n;const e=Math.floor((n.elapsed-n.lightningStart)/n.lightningInterval);return e<0||(n.lightningId=`${n.seed}:${n.levelIndex}:${e}`,n.lightningAge=Math.max(0,n.elapsed-(n.lightningStart+e*n.lightningInterval)),n.thunderDelay=.8+Xl(n.seed,n.levelIndex+e+2e3)%9/10,n.lightningFlash=n.lightningAge<.22?.9*(1-n.lightningAge/.22):0),n}const He=(n,t,e)=>Math.max(t,Math.min(e,n)),Ki=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),ql=n=>()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296);function Jv(n,t=dd(n)){if(t.kind==="storm"||t.storm)return{squirrel:0,rabbit:0,bird:0,butterfly:0};const e=(n.bounds.maxX-n.bounds.minX)*(n.bounds.maxZ-n.bounds.minZ),i=ql((n.seed||42)^1464421444),s=He(e/3600,.55,2.4),r=(o,a)=>Math.min(a,Math.max(1,Math.round(o*s*(.78+i()*.44))));return{squirrel:r(2,7),rabbit:r(2,8),bird:Math.min(6,Math.max(2,Math.round(3*s))),butterfly:Math.min(8,Math.max(0,Math.round(5*s)))}}function Qv(n,t){let e=1/0;for(const i of n.roads||[]){const s=i.points||[i.from,i.to];for(let r=1;r<s.length;r++){const o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,h=He(((t.x-o.x)*c+(t.z-o.z)*l)/(c*c+l*l||1),0,1);e=Math.min(e,Math.hypot(t.x-o.x-c*h,t.z-o.z-l*h))}}return e}const Du=new WeakMap;function ty(n,t){let e=Du.get(n);e||(e=new Map,Du.set(n,e));let i=e.get(t);if(!i||i.sourceRivers!==n.rivers||i.sourceObstacles!==n.obstacles||i.sourceFenceSegments!==n.fenceSegments||i.targetType!==n.target?.type){const s=n.bounds,r=(n.fenceSegments||[]).filter(o=>o.kind==="wall"||o.kind==="stone"||o.material==="stone"||o.kind==="target"&&n.target?.type==="barn");i={...n,sourceRivers:n.rivers,sourceObstacles:n.obstacles,sourceFenceSegments:n.fenceSegments,targetType:n.target?.type,fenceSegments:r,bounds:{minX:s.minX-t-1,maxX:s.maxX+t+1,minZ:s.minZ-t-1,maxZ:s.maxZ+t+1}},e.set(t,i)}return i}function Jo(n,t,e=.45){const i=n.bounds;return t.x>=i.minX-e&&t.x<=i.maxX+e&&t.z>=i.minZ-e&&t.z<=i.maxZ+e&&ae(ty(n,e),t.x,t.z,.4)}function ey(n,t,e=[],i=.45){return Qv(n,t)>5.5&&Jo(n,t,i)&&e.every(s=>Ki(t,s)>8)}function xr(n,t,e=[],i=Jo){if(!i(n,t,0)||e.some(s=>Ki(t,s)<12))return!1;for(const s of n.rivers||[])for(let r=1;r<s.points.length;r++){const o=s.points[r-1],a=s.points[r],c=a.x-o.x,l=a.z-o.z,h=He(((t.x-o.x)*c+(t.z-o.z)*l)/(c*c+l*l||1),0,1);if(Math.hypot(t.x-o.x-c*h,t.z-o.z-l*h)<s.width/2+.5)return!1}return!0}const Iu=n=>n*n*(3-2*n);function an(n,t){return t.birdSeed=Math.imul(t.birdSeed??(n.seed||42)^1112101444^Math.imul((t.slot||0)+1,1013904223),1664525)+1013904223>>>0,t.birdSeed/4294967296}function mo(n,t){t.birdState="takeoff",t.birdStateTime=0,t.altitude=Math.max(t.altitude||0,t.hopHeight||0),t.takeoffAltitude=t.altitude,t.cruiseAltitude=Math.max(t.altitude,2.6+an(n,t)*.8),t.flightRemaining=3.5+an(n,t)*3,t.landingX=t.landingZ=void 0,t.hopElapsed=void 0,t.hopHeight=0,t.peckElapsed=void 0,t.peck=0}function Lu(n,t){t.birdState="forage",t.birdStateTime=0,t.altitude=0,t.forageRemaining=5+an(n,t)*7,t.gestureWait=.3+an(n,t)*1.2,t.hopHeight=0,t.peck=0,t.hopElapsed=t.peckElapsed=void 0,t.landingX=t.landingZ=void 0}function Uu(n,t,e,i,s,r){const o=n.bounds;(t.x<o.minX+2||t.x>o.maxX-2||t.z<o.minZ+2||t.z>o.maxZ-2)&&(i+=((o.minX+o.maxX)/2-t.x)*.5,s+=((o.minZ+o.maxZ)/2-t.z)*.5),Math.hypot(i,s)<.01&&(i=Math.sin(t.heading||0),s=Math.cos(t.heading||0));const a=Math.atan2(i,s),c=t.heading||0,l=Math.atan2(Math.sin(a-c),Math.cos(a-c));t.heading=c+He(l,-e*4.5,e*4.5),t.x=He(t.x+Math.sin(t.heading)*r*e,o.minX+.6,o.maxX-.6),t.z=He(t.z+Math.cos(t.heading)*r*e,o.minZ+.6,o.maxZ-.6)}function ny(n,t,e,i){for(let s=0;s<24;s++){const r=(t.heading||0)+(an(n,t)-.5)*1.8,o=2.5+an(n,t)*6,a={x:t.x+Math.sin(r)*o,z:t.z+Math.cos(r)*o};let c=xr(n,a,e,i);const l=Math.ceil(o/.5);for(let h=1;h<l&&c;h++)c=xr(n,{x:t.x+(a.x-t.x)*h/l,z:t.z+(a.z-t.z)*h/l},e,i);if(c)return a}return null}function iy(n,t,e,i,s,r){t.birdState||Lu(n,t),t.altitude??=t.birdState==="forage"?0:3,t.birdStateTime=(t.birdStateTime||0)+e;const o=t.x,a=t.z,c=He(Number(s?.severity)||0,0,1);c>=.64?t.sheltering=!0:c<.52&&(t.sheltering=!1);let l=0,h=0,u=!1;for(const f of i){const d=Ki(t,f);d>=10||(u=!0,l+=(t.x-f.x)/Math.max(.1,d)*(10-d),h+=(t.z-f.z)/Math.max(.1,d)*(10-d))}if(u)t.alertTimer=1.15,t.clearTime=0,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,(t.birdState==="forage"||t.birdState==="landing")&&mo(n,t);else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.clearTime=(t.clearTime||0)+e,t.shelter=He((t.shelter||0)+e*(t.sheltering?.32:-.48),0,1),t.sheltering){const f=pd(n,t);l=f.x-t.x,h=f.z-t.z,(t.birdState==="forage"||t.birdState==="landing")&&mo(n,t)}if(t.fleeing=u,t.alert=u||t.alertTimer>0,t.hidden=t.shelter>=.995&&!u,t.birdState==="forage"){if(!xr(n,t,[],r)||(t.forageRemaining-=e)<=0)mo(n,t);else if(t.hopElapsed!==void 0){t.hopElapsed+=e;const f=He(t.hopElapsed/.34,0,1);t.x=t.hopStartX+(t.hopX-t.hopStartX)*f,t.z=t.hopStartZ+(t.hopZ-t.hopStartZ)*f,t.hopHeight=Math.sin(f*Math.PI)*.17,f===1&&(t.hopElapsed=void 0,t.hopHeight=0,t.gestureWait=.3+an(n,t)*.9)}else if(t.peckElapsed!==void 0){t.peckElapsed+=e;const f=He(t.peckElapsed/.48,0,1);t.peck=Math.sin(f*Math.PI)**2,f===1&&(t.peckElapsed=void 0,t.peck=0,t.gestureWait=.35+an(n,t)*1.2)}else if((t.gestureWait-=e)<=0)if(an(n,t)<.4){const f=(t.heading||0)+(an(n,t)-.5)*2,d=.45+an(n,t)*.55,x={x:t.x+Math.sin(f)*d,z:t.z+Math.cos(f)*d};let p=!0;for(let m=1;m<=5&&p;m++)p=xr(n,{x:t.x+(x.x-t.x)*m/5,z:t.z+(x.z-t.z)*m/5},i,r);p?(t.hopStartX=t.x,t.hopStartZ=t.z,t.hopX=x.x,t.hopZ=x.z,t.hopElapsed=0,t.heading=f):t.gestureWait=.6}else t.peckElapsed=0}if(t.birdState==="takeoff"){const f=He(t.birdStateTime/.75,0,1);t.altitude=t.takeoffAltitude+(t.cruiseAltitude-t.takeoffAltitude)*Iu(f),Uu(n,t,e,l,h,2.8+f*2.4),f===1&&(t.birdState="flight",t.birdStateTime=0)}else if(t.birdState==="flight"){if(t.altitude+=((t.cruiseAltitude||3)-t.altitude)*Math.min(1,e*3),t.courseRemaining=(t.courseRemaining||0)-e,t.courseRemaining<=0&&(t.course=(t.heading||0)+(an(n,t)-.5)*1.8,t.courseRemaining=1+an(n,t)*2),!u&&!t.sheltering&&(l=Math.sin(t.course),h=Math.cos(t.course)),Uu(n,t,e,l,h,u?5.2:3.2),t.flightRemaining=(t.flightRemaining??4)-e,t.landingRetry=Math.max(0,(t.landingRetry||0)-e),!u&&!t.sheltering&&t.clearTime>=2.5&&t.flightRemaining<=0&&t.landingRetry===0){const f=ny(n,t,i,r);t.landingRetry=1.5,f&&(t.birdState="landing",t.birdStateTime=0,t.landingX=f.x,t.landingZ=f.z,t.landingStartX=t.x,t.landingStartZ=t.z,t.landingAltitude=t.altitude,t.landingDuration=Math.max(1.5,Ki(t,f)*2/3.2))}}else if(t.birdState==="landing")if(!xr(n,{x:t.landingX,z:t.landingZ},i,r))mo(n,t);else{const f=He(t.birdStateTime/t.landingDuration,0,1),d=1-(1-f)**2,x=Math.atan2(t.landingX-t.landingStartX,t.landingZ-t.landingStartZ),p=Math.atan2(Math.sin(x-t.heading),Math.cos(x-t.heading));t.heading+=He(p,-e*4.5,e*4.5),t.x=t.landingStartX+(t.landingX-t.landingStartX)*d,t.z=t.landingStartZ+(t.landingZ-t.landingStartZ)*d,t.altitude=t.landingAltitude*(1-Iu(f)),f===1&&Lu(n,t)}return t.moving=Math.hypot(t.x-o,t.z-a)>.001,t}const sy={butterfly:.54,squirrel:.58,bird:.64,rabbit:.76};function pd(n,t){let e=null,i=18;for(const s of n.obstacles||[]){const r=Ki(t,s);if(r>=i||r<.01)continue;const o=s.radius+.85,a=(t.x-s.x)/r,c=(t.z-s.z)/r,l={x:s.x+a*o,z:s.z+c*o};Jo(n,l,.2)&&(e=l,i=r)}return e||{x:t.homeX,z:t.homeZ}}function ry(n){const t=ql(n.randomSeed||(Math.floor((n.phase||0)*1e6)^n.slot||1)>>>0);n.randomSeed=Math.floor(t()*4294967295)||1;const e=t()*Math.PI*2,i=3+t()*8;n.waypointX=n.homeX+Math.cos(e)*i,n.waypointZ=n.homeZ+Math.sin(e)*i,n.waitTimer=0}function oy(n,t,e,i=[],s=0,r=n.weather,o=Jo){const a=typeof r=="function";if(a&&(o=r,r=n.weather),!(e>0))return t;if(t.kind==="bird")return iy(n,t,e,i,r,a?(w,A)=>o(w,A.x,A.z,.4):o);const c=t.x,l=t.z,h=He(Number(r?.severity)||0,0,1),u=sy[t.kind]??.64;h>=u?t.sheltering=!0:h<u-.12&&(t.sheltering=!1);const f=t.kind==="bird"?10:t.kind==="butterfly"?6:7.5;let d=!1,x=0,p=0;for(const w of i){const A=Ki(t,w);A<f&&(d=!0,x+=(t.x-w.x)/Math.max(.1,A)*(f-A),p+=(t.z-w.z)/Math.max(.1,A)*(f-A))}if(d)t.fleeing||(t.homeX=t.x,t.homeZ=t.z),t.waypointX=void 0,t.waypointZ=void 0,t.alertTimer=1.15,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,t.shelterX=void 0;else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.sheltering){if(t.shelterX===void 0){const w=pd(n,t);t.shelterX=w.x,t.shelterZ=w.z}t.shelter=Math.min(1,(t.shelter||0)+e*.32),x=t.shelterX-t.x,p=t.shelterZ-t.z}else if(t.shelter=Math.max(0,(t.shelter||0)-e*.48),t.hidden=t.shelter>=.995,t.shelterX!==void 0&&t.shelter===0&&(t.shelterX=void 0,t.shelterZ=void 0,t.waypointX=void 0),t.alertTimer>0)x=p=0;else if((t.waitTimer||0)>0)t.waitTimer=Math.max(0,t.waitTimer-e),x=p=0;else if(t.waypointX!==void 0&&Ki(t,{x:t.waypointX,z:t.waypointZ})<.45){const w=ql(t.randomSeed||1);t.randomSeed=Math.floor(w()*4294967295)||1,t.waypointX=void 0,t.waypointZ=void 0,t.waitTimer=.55+w()*2.1,x=p=0}else t.waypointX===void 0&&ry(t),x=t.waypointX-t.x,p=t.waypointZ-t.z;let m=Math.hypot(x,p);if(d&&m<.01){const w=Number.isFinite(t.heading)?t.heading:t.phase||0;x=Math.sin(w),p=Math.cos(w),m=1}const g=t.kind==="rabbit",v=((t.gait||0)%1+1)%1,M=!g||v<.54;let _=d?t.kind==="bird"?5.2:g?4.2:3.5:t.kind==="squirrel"?.9:g?3.5:t.kind==="bird"?1.4:.8;t.sheltering&&!d&&(_=.95);const S=m>.01&&M?Math.min(m,e*_):0;if(S){const w=t.x+x/m*S,A=t.z+p/m*S,P=y=>a?o(n,y.x,y.z,.4):o(n,y,.45);t.kind==="bird"||P({x:w,z:A})?(t.x=w,t.z=A):P({x:w,z:t.z})?t.x=w:P({x:t.x,z:A})&&(t.z=A)}if(t.moving=Math.hypot(t.x-c,t.z-l)>.001,t.moving)t.heading=Math.atan2(t.x-c,t.z-l),t.stuckTimer=0;else if(S>.001&&(t.stuckTimer=(t.stuckTimer||0)+e,t.stuckTimer>=1)){const w=n.bounds;t.waypointX=t.x>w.maxX-.2?w.maxX-1.2:t.x<w.minX+.2?w.minX+1.2:He(t.homeX,w.minX+1.2,w.maxX-1.2),t.waypointZ=t.z>w.maxZ-.2?w.maxZ-1.2:t.z<w.minZ+.2?w.minZ+1.2:He(t.homeZ,w.minZ+1.2,w.maxZ-1.2),t.shelterX=void 0,t.shelterZ=void 0,t.stuckTimer=0,t.waitTimer=.2}return t.fleeing=d,t.alert=d||t.alertTimer>0,t.gait=(t.gait||0)+e*(d?1.8:g?1.35:t.kind==="squirrel"?1.7:1.2),t.hidden=t.shelter>=.995&&!d,t}const Oi={bird:[{part:"body",at:[0,.23,-.015],scale:[.115,.14,.21],color:"#667f82"},{part:"breast",at:[0,.235,.11],scale:[.1,.115,.115],color:"#c1c5b5"},{part:"head",at:[0,.36,.155],scale:[.105,.11,.11],color:"#728e8e"},{part:"beak",at:[0,.345,.285],scale:[.034,.025,.075],color:"#c49b56"},{part:"tail",at:[0,.205,-.25],scale:[.082,.035,.16],color:"#4b656b",tilt:-.12},{part:"eye",at:[-.089,.392,.211],scale:[.017,.019,.017],color:"#151d21"},{part:"eye",at:[.089,.392,.211],scale:[.017,.019,.017],color:"#151d21"},{part:"leg",at:[-.062,.072,.025],scale:[.014,.065,.014],color:"#8c694d"},{part:"leg",at:[.062,.072,.025],scale:[.014,.065,.014],color:"#8c694d"},{part:"foot",at:[-.062,.02,.06],scale:[.032,.02,.072],color:"#8c694d"},{part:"foot",at:[.062,.02,.06],scale:[.032,.02,.072],color:"#8c694d"}],squirrel:[{part:"body",at:[0,.31,0],scale:[.2,.23,.32],color:"#a97552"},{part:"head",at:[0,.47,.2],scale:[.17,.17,.17],color:"#bd8960"},{part:"tail",at:[0,.48,-.34],scale:[.2,.31,.19],color:"#8e5b3e",tilt:-.48},{part:"ear",at:[-.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"ear",at:[.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"paw",at:[-.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[-.19,.12,-.22],scale:[.085,.11,.13],color:"#74503b"},{part:"paw",at:[.19,.12,-.22],scale:[.085,.11,.13],color:"#74503b"},{part:"eye",at:[-.105,.5,.33],scale:[.025,.03,.018],color:"#171819"},{part:"eye",at:[.105,.5,.33],scale:[.025,.03,.018],color:"#171819"}],rabbit:[{part:"body",at:[0,.31,-.02],scale:[.25,.27,.34],color:"#d6c7aa"},{part:"haunch",at:[0,.25,-.23],scale:[.23,.23,.22],color:"#c4b08f"},{part:"head",at:[0,.48,.25],scale:[.17,.17,.17],color:"#e4d6bd"},{part:"ear",at:[-.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"ear",at:[.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"tail",at:[0,.34,-.4],scale:[.095,.1,.095],color:"#f0e9dc"},{part:"paw",at:[-.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[-.23,.1,-.27],scale:[.095,.1,.18],color:"#b09b7c"},{part:"paw",at:[.23,.1,-.27],scale:[.095,.1,.18],color:"#b09b7c"},{part:"eye",at:[-.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"},{part:"eye",at:[.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"}]};function md(n){const t=[],e=[],i=[],s=new Ti(1,10,8).toNonIndexed(),r=s.getAttribute("position"),o=s.getAttribute("normal"),a=new Xt,c=new Jt;for(const h of n){if(h.part==="paw")continue;const u=new An(h.tilt||0,0,0),f=new ie().compose(new L(...h.at),new ii().setFromEuler(u),new L(...h.scale));c.getNormalMatrix(f),a.set(h.color);for(let d=0;d<r.count;d++){const x=new L().fromBufferAttribute(r,d).applyMatrix4(f),p=new L().fromBufferAttribute(o,d).applyMatrix3(c).normalize();t.push(x.x,x.y,x.z),e.push(p.x,p.y,p.z),i.push(a.r,a.g,a.b)}}s.dispose();const l=new me;return l.setAttribute("position",new qt(t,3)),l.setAttribute("normal",new qt(e,3)),l.setAttribute("color",new qt(i,3)),l.computeBoundingSphere(),l}function ay(n){return md(Oi[n])}function cy(){return md([{at:[.17,0,-.025],scale:[.18,.035,.13],color:"#809b9b"},{at:[.27,-.004,-.09],scale:[.155,.026,.065],color:"#66878b",tilt:.12},{at:[.24,-.005,-.15],scale:[.15,.024,.048],color:"#58777e",tilt:.14},{at:[.2,-.006,-.195],scale:[.125,.022,.038],color:"#4e6c75",tilt:.16}])}const ly={light:96,heavy:176,storm:256},hy={light:16,heavy:23,storm:30},Yn=1.25;class uy{constructor(t){this.root=new ee,this.root.name="Visible rain",t.add(this.root),this.geometry=new me,this.material=new Uf({color:"#e5f2f4",transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1}),this.lines=new vm(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=20,this.root.add(this.lines),this.randomState=8029,this.positions=new Float32Array(0),this.drops=[],this.active=0,this.fallbackCamera=new Zo(-30,30,20,-20,.1,180),this.fallbackCamera.position.set(0,36,29),this.fallbackCamera.lookAt(0,0,-2)}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}resize(t){t!==this.active&&(this.active=t,this.positions=new Float32Array(t*6),this.drops=Array.from({length:t},()=>({x:(this.random()*2-1)*Yn,y:(this.random()*2-1)*Yn})),this.geometry.setAttribute("position",new Oe(this.positions,3)),this.geometry.setDrawRange(0,t*2))}update(t,{weather:e={},camera:i=this.fallbackCamera,paused:s=!1}={}){const r=e.kind||e.type,o=Math.max(0,Math.min(1,e.rainIntensity??e.intensity??0)),a=r==="storm"||e.severity>=.78?"storm":r==="heavy-rain"||o>=.68?"heavy":r==="rain"&&o>.02?"light":null;if(this.resize(a?ly[a]:0),!this.active)return;this.material.opacity=a==="light"?.48:a==="heavy"?.6:.7;const c=s?0:Math.min(.1,Math.max(0,Number(t)||0)),l=Math.max(-8,Math.min(8,e.windIntensity??e.wind??0)),h=hy[a],u=a==="storm"?(l<0?-1:1)*Math.max(10,Math.abs(l)*16):l*3,f=new L(u,-h,0),d=a==="light"?.8:a==="heavy"?1.3:1.8;i.updateMatrixWorld(!0);const p=new L(0,0,0).unproject(i).clone().add(f).project(i);for(let m=0;m<this.active;m++){const g=this.drops[m];g.x+=p.x*c,g.y+=p.y*c,g.y<-Yn&&(g.y+=Yn*2,g.x=(this.random()*2-1)*Yn),g.x>Yn&&(g.x-=Yn*2),g.x<-Yn&&(g.x+=Yn*2);const v=new L(g.x,g.y,0).unproject(i),M=v.clone().addScaledVector(f,d/h);v.toArray(this.positions,m*6),M.toArray(this.positions,m*6+3)}this.geometry.attributes.position.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose(),this.root.removeFromParent()}}const go=(n,t,e)=>Math.max(t,Math.min(e,n));function fy(n){let t=n>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}class dy{constructor(t){this.scene=t,this.root=new ee,this.root.name="Meadow nature",t.add(this.root),this.resources=new Set,this.time=0,this.wildlife=[],this.batches={},this.transform=new be,this.birdRoot=new ie,this.birdFeetRoot=new ie,this.partMatrix=new ie}own(t){return this.resources.add(t),t}clear(){this.root.traverse(t=>{t.isInstancedMesh&&t.dispose()}),this.root.clear(),this.resources.forEach(t=>t.dispose()),this.resources.clear(),this.rainView?.dispose(),this.rainView=null,this.wildlife=[],this.batches={},this.precipitation=null}batch(t,e,i,s){const r=new pi(e,i,s);return r.instanceMatrix.setUsage(Wi),r.frustumCulled=!1,this.root.add(r),this.batches[t]=r,r}setLevel(t){this.clear(),this.level=t,this.time=0,this.weather=dd(t);const e=fy((t.seed||42)+71053),i=t.bounds,s=i.maxX-i.minX,r=i.maxZ-i.minZ,o=[t.dog||t.spawn,...t.animals||[]].filter(Boolean),a=this.own(new Ti(1,10,8)),c=Jv(t),l=["butterfly","bird","squirrel","rabbit"];for(const h of l){const u=c[h]||0;if(u)for(let f=0;f<u;f++){let d=null;for(let x=0;x<240;x++){const p=(t.roads||[]).flatMap(_=>_.points||[_.from,_.to]).filter(Boolean),m=x<120&&p.length?p[Math.floor(e()*p.length)]:null,g=e()*Math.PI*2,v=8+e()*13,M=m?{x:m.x+Math.cos(g)*v,z:m.z+Math.sin(g)*v}:{x:i.minX+2+e()*(s-4),z:i.minZ+2+e()*(r-4)};if(ey(t,M,o,.5)){d=M;break}}this.wildlife.push({kind:h,slot:f,x:d?.x??0,z:d?.z??0,homeX:d?.x??0,homeZ:d?.z??0,phase:e()*Math.PI*2,heading:e()*Math.PI*2,visible:!!d,gait:0,hidden:!1,hideTimer:0})}}if(c.bird){const h=Oi.bird,u=this.batch("birdBody",a,this.own(new ce({roughness:.94})),c.bird*h.length);for(let f=0;f<c.bird;f++)for(let d=0;d<h.length;d++)u.setColorAt(f*h.length+d,new Xt(h[d].color));this.batch("birdWing",this.own(cy()),this.own(new ce({vertexColors:!0,roughness:.94})),c.bird*2)}c.butterfly&&(this.batch("butterflyBody",a,this.own(new ce({color:"#65523f",roughness:1})),c.butterfly),this.batch("butterflyWing",a,this.own(new ce({color:"#f2ac75",roughness:1})),c.butterfly*2));for(const h of["squirrel","rabbit"]){const u=c[h]||0;if(!u)continue;this.batch(`${h}Body`,this.own(ay(h)),this.own(new ce({vertexColors:!0,roughness:.94})),u);const f=h==="squirrel"?"#74503b":"#b09b7c";this.batch(`${h}Paw`,a,this.own(new ce({color:f,roughness:.94})),u*Oi[h].filter(d=>d.part==="paw").length)}this.rainView=new uy(this.root),this.update(0,{dog:t.dog||t.spawn,animals:t.animals})}pose(t,e,i,s,r,o,a,c,l=0,h=0,u=0){const f=this.transform;f.position.set(i,s,r),f.rotation.set(u,l,h),f.scale.set(o,a,c),f.updateMatrix(),t.setMatrixAt(e,f.matrix)}hideParts(t){if(t.kind==="bird"||t.kind==="butterfly"){const e=t.kind==="bird"?Oi.bird.length:1;for(let i=0;i<e;i++)this.pose(this.batches[`${t.kind}Body`],t.slot*e+i,0,-100,0,0,0,0);for(let i=0;i<2;i++)this.pose(this.batches[`${t.kind}Wing`],t.slot*2+i,0,-100,0,0,0,0)}else{this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);const e=Oi[t.kind].filter(i=>i.part==="paw").length;for(let i=0;i<e;i++)this.pose(this.batches[`${t.kind}Paw`],t.slot*e+i,0,-100,0,0,0,0)}}poseBird(t,e){const i=t.birdState||"forage",s=Math.max(.06,1-(t.shelter||0)*.94),r=i==="landing"?go((t.birdStateTime||0)/t.landingDuration,0,1):0,o=i==="forage"?0:i==="takeoff"?go((t.birdStateTime||0)/.18,0,1):i==="landing"?go((1-r)*4,0,1):1,a=Pn(this.level,t.x,t.z)+(t.altitude||0)+(t.hopHeight||0),c=i==="forage"?(t.peck||0)*.76:i==="takeoff"?-.18*o:i==="landing"?-.12*o:-.035,l=this.transform;l.position.set(t.x,a,t.z),l.rotation.set(0,t.heading||0,0),l.scale.setScalar(s),l.updateMatrix(),this.birdFeetRoot.copy(l.matrix),l.position.set(0,0,0),l.rotation.set(c,0,0),l.scale.setScalar(1),l.updateMatrix(),this.birdRoot.multiplyMatrices(this.birdFeetRoot,l.matrix);const h=Oi.bird;for(let u=0;u<h.length;u++){const f=h[u];l.position.set(...f.at),l.rotation.set(f.tilt||0,0,0),l.scale.set(...f.scale),l.updateMatrix(),this.partMatrix.multiplyMatrices(f.part==="foot"||f.part==="leg"?this.birdFeetRoot:this.birdRoot,l.matrix),this.batches.birdBody.setMatrixAt(t.slot*h.length+u,this.partMatrix)}for(let u=0;u<2;u++){const f=u?1:-1,d=.18+Math.sin(e*13+t.phase)*.7;l.position.set(f*.105,.28,0),l.rotation.set(0,f*(1-o)*1.35,(u?0:Math.PI)+f*((1-o)*-.11+o*d)),l.scale.setScalar(1),l.updateMatrix(),this.partMatrix.multiplyMatrices(this.birdRoot,l.matrix),this.batches.birdWing.setMatrixAt(t.slot*2+u,this.partMatrix)}}update(t,{dog:e,animals:i=[],camera:s,paused:r=!1}={}){if(!this.level)return;t=r?0:go(Number(t)||0,0,.1),this.time+=t,jv(this.weather,t);const o=this.time,a=[e,...i,...this.level.helpers||[]].filter(Boolean);for(const c of this.wildlife){if(oy(this.level,c,t,a,o,this.weather),!c.visible||c.hidden){this.hideParts(c);continue}if(c.kind==="bird"){this.poseBird(c,o);continue}const l=c.kind==="butterfly",h=c.kind==="squirrel",u=c.kind==="rabbit",f=((c.gait||0)%1+1)%1,d=f<.54,x=u&&c.moving&&d?Math.sin(f/.54*Math.PI)*.24:h&&c.moving?Math.abs(Math.sin(f*Math.PI*2))*.1:0,p=Math.max(.06,1-(c.shelter||0)*.94),m=(h?.12:u?.04:l?3.2:1)+Pn(this.level,c.x,c.z)+(l?Math.sin(o*2+c.phase)*.28:x)+(c.alert?.08:0);if(h||u){const g=u&&!d?.9:1,v=u&&d?-.14*Math.sin(f/.54*Math.PI):0,M=h&&c.moving?Math.sin(f*Math.PI*2)*.06:0;this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,p,p*g,p,c.heading,M,v);const _=Oi[c.kind].filter(S=>S.part==="paw");for(let S=0;S<_.length;S++){const w=_[S],A=c.moving?u&&d?Math.sin(f/.54*Math.PI)*.08:Math.sin(f*Math.PI*2+[0,Math.PI,Math.PI,0][S])*.07:0,P=w.at[0]*p,y=w.at[2]*p,b=c.x+Math.cos(c.heading)*P+Math.sin(c.heading)*y,D=c.z-Math.sin(c.heading)*P+Math.cos(c.heading)*y;this.pose(this.batches[`${c.kind}Paw`],c.slot*_.length+S,b,m+w.at[1]*p+A,D,w.scale[0]*p,w.scale[1]*p,w.scale[2]*p,c.heading)}}else{this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,.075*p,.06*p,.12*p,c.heading);for(let g=0;g<2;g++){const v=Math.sin(o*18+c.phase)*.85;this.pose(this.batches[`${c.kind}Wing`],c.slot*2+g,c.x+(g?1:-1)*.15,m+.04,c.z,.22*p,.025*p,.16*p,c.heading,(g?1:-1)*v)}}}for(const c of Object.values(this.batches))c.instanceMatrix.needsUpdate=!0;this.rainView?.update(t,{weather:this.weather,camera:s,paused:r})}dispose(){this.clear(),this.scene.remove(this.root),this.level=null}}const Ao=0,py=1,my=new L,Nu=new cg,tc=new fi,Fu=new L,xo=new ln;class gy{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Ou,this.unassigned=new Ou,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.vertices.push(new xy(t[e]));this._compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(i){const s=i.geometry;if(s!==void 0){const r=s.attributes.position;if(r!==void 0)for(let o=0,a=r.count;o<a;o++){const c=new L;c.fromBufferAttribute(r,o).applyMatrix4(i.matrixWorld),e.push(c)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let i=0,s=e.length;i<s;i++)if(e[i].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const i=this.faces;let s=-1/0,r=1/0;for(let o=0,a=i.length;o<a;o++){const c=i[o],l=c.distanceToPoint(t.origin),h=c.normal.dot(t.direction);if(l>0&&h>=0)return null;const u=h!==0?-l/h:0;if(!(u<=0)&&(h>0?r=Math.min(u,r):s=Math.max(u,s),s>r))return null}return s!==-1/0?t.at(s,e):t.at(r,e),e}intersectsRay(t){return this.intersectRay(t,my)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}_removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}_removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let i=t.outside;for(;i.next!==null&&i.next.face===t;)i=i.next;return this.assigned.removeSubList(e,i),e.prev=i.next=null,t.outside=null,e}}_deleteFaceVertices(t,e){const i=this._removeAllVerticesFromFace(t);if(i!==void 0)if(e===void 0)this.unassigned.appendChain(i);else{let s=i;do{const r=s.next;e.distanceToPoint(s.point)>this.tolerance?this._addVertexToFace(s,e):this.unassigned.append(s),s=r}while(s!==null)}return this}_resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const i=e.next;let s=this.tolerance,r=null;for(let o=0;o<t.length;o++){const a=t[o];if(a.mark===Ao){const c=a.distanceToPoint(e.point);if(c>s&&(s=c,r=a),s>1e3*this.tolerance)break}}r!==null&&this._addVertexToFace(e,r),e=i}while(e!==null)}return this}_computeExtremes(){const t=new L,e=new L,i=[],s=[];for(let r=0;r<3;r++)i[r]=s[r]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let r=0,o=this.vertices.length;r<o;r++){const a=this.vertices[r],c=a.point;for(let l=0;l<3;l++)c.getComponent(l)<t.getComponent(l)&&(t.setComponent(l,c.getComponent(l)),i[l]=a);for(let l=0;l<3;l++)c.getComponent(l)>e.getComponent(l)&&(e.setComponent(l,c.getComponent(l)),s[l]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:i,max:s}}_computeInitialHull(){const t=this.vertices,e=this._computeExtremes(),i=e.min,s=e.max;let r=0,o=0;for(let f=0;f<3;f++){const d=s[f].point.getComponent(f)-i[f].point.getComponent(f);d>r&&(r=d,o=f)}const a=i[o],c=s[o];let l,h;r=0,Nu.set(a.point,c.point);for(let f=0,d=this.vertices.length;f<d;f++){const x=t[f];if(x!==a&&x!==c){Nu.closestPointToPoint(x.point,!0,Fu);const p=Fu.distanceToSquared(x.point);p>r&&(r=p,l=x)}}r=-1,tc.setFromCoplanarPoints(a.point,c.point,l.point);for(let f=0,d=this.vertices.length;f<d;f++){const x=t[f];if(x!==a&&x!==c&&x!==l){const p=Math.abs(tc.distanceToPoint(x.point));p>r&&(r=p,h=x)}}const u=[];if(tc.distanceToPoint(h.point)<0){u.push(Sn.create(a,c,l),Sn.create(h,c,a),Sn.create(h,l,c),Sn.create(h,a,l));for(let f=0;f<3;f++){const d=(f+1)%3;u[f+1].getEdge(2).setTwin(u[0].getEdge(d)),u[f+1].getEdge(1).setTwin(u[d+1].getEdge(0))}}else{u.push(Sn.create(a,l,c),Sn.create(h,a,c),Sn.create(h,c,l),Sn.create(h,l,a));for(let f=0;f<3;f++){const d=(f+1)%3;u[f+1].getEdge(2).setTwin(u[0].getEdge((3-f)%3)),u[f+1].getEdge(0).setTwin(u[d+1].getEdge(1))}}for(let f=0;f<4;f++)this.faces.push(u[f]);for(let f=0,d=t.length;f<d;f++){const x=t[f];if(x!==a&&x!==c&&x!==l&&x!==h){r=this.tolerance;let p=null;for(let m=0;m<4;m++){const g=this.faces[m].distanceToPoint(x.point);g>r&&(r=g,p=this.faces[m])}p!==null&&this._addVertexToFace(x,p)}}return this}_reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const i=this.faces[e];i.mark===Ao&&t.push(i)}return this.faces=t,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const i=this.assigned.first().face;let s=i.outside;do{const r=i.distanceToPoint(s.point);r>e&&(e=r,t=s),s=s.next}while(s!==null&&s.face===i);return t}}_computeHorizon(t,e,i,s){this._deleteFaceVertices(i),i.mark=py;let r;e===null?r=e=i.getEdge(0):r=e.next;do{const o=r.twin,a=o.face;a.mark===Ao&&(a.distanceToPoint(t)>this.tolerance?this._computeHorizon(t,o,a,s):s.push(r)),r=r.next}while(r!==e);return this}_addAdjoiningFace(t,e){const i=Sn.create(t,e.tail(),e.head());return this.faces.push(i),i.getEdge(-1).setTwin(e.twin),i.getEdge(0)}_addNewFaces(t,e){this.newFaces=[];let i=null,s=null;for(let r=0;r<e.length;r++){const o=e[r],a=this._addAdjoiningFace(t,o);i===null?i=a:a.next.setTwin(s),this.newFaces.push(a.face),s=a}return i.next.setTwin(s),this}_addVertexToHull(t){const e=[];return this.unassigned.clear(),this._removeVertexFromFace(t,t.face),this._computeHorizon(t.point,null,t.face,e),this._addNewFaces(t,e),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let t;for(this._computeInitialHull();(t=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(t);return this._reindexFaces(),this._cleanup(),this}}class Sn{constructor(){this.normal=new L,this.midpoint=new L,this.area=0,this.constant=0,this.outside=null,this.mark=Ao,this.edge=null}static create(t,e,i){const s=new Sn,r=new ec(t,s),o=new ec(e,s),a=new ec(i,s);return r.next=a.prev=o,o.next=r.prev=a,a.next=o.prev=r,s.edge=r,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),i=this.edge.next.head();return xo.set(t.point,e.point,i.point),xo.getNormal(this.normal),xo.getMidpoint(this.midpoint),this.area=xo.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class ec{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class xy{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class Ou{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class _y extends me{constructor(t=[]){super();const e=[],i=[],r=new gy().setFromPoints(t).faces;for(let o=0;o<r.length;o++){const a=r[o];let c=a.edge;do{const l=c.head().point;e.push(l.x,l.y,l.z),i.push(a.normal.x,a.normal.y,a.normal.z),c=c.next}while(c!==a.edge)}this.setAttribute("position",new qt(e,3)),this.setAttribute("normal",new qt(i,3))}}function My(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new me;let l=0;for(let h=0;h<n.length;++h){const u=n[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let x=0;x<d.count;++x)u.push(d.getX(x)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=Bu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let p=0;p<o[h].length;++p)d.push(o[h][p][f]);const x=Bu(d);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}return c}function Bu(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const h=n[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Oe(o,e,i);let c=0;for(let l=0;l<n.length;++l){const h=n[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,d=h.count;f<d;f++)for(let x=0;x<e;x++){const p=h.getComponent(f,x);a.setComponent(f+u,x,p)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function vy(n,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},i=n.getIndex(),s=n.getAttribute("position"),r=i?i.count:s.count;let o=0;const a=Object.keys(n.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let v=0,M=a.length;v<M;v++){const _=a[v],S=n.attributes[_];c[_]=new S.constructor(new S.array.constructor(S.count*S.itemSize),S.itemSize,S.normalized);const w=n.morphAttributes[_];w&&(l[_]||(l[_]=[]),w.forEach((A,P)=>{const y=new A.array.constructor(A.count*A.itemSize);l[_][P]=new A.constructor(y,A.itemSize,A.normalized)}))}const d=t*.5,x=Math.log10(1/t),p=Math.pow(10,x),m=d*p;for(let v=0;v<r;v++){const M=i?i.getX(v):v;let _="";for(let S=0,w=a.length;S<w;S++){const A=a[S],P=n.getAttribute(A),y=P.itemSize;for(let b=0;b<y;b++)_+=`${~~(P[u[b]](M)*p+m)},`}if(_ in e)h.push(e[_]);else{for(let S=0,w=a.length;S<w;S++){const A=a[S],P=n.getAttribute(A),y=n.morphAttributes[A],b=P.itemSize,D=c[A],U=l[A];for(let B=0;B<b;B++){const G=u[B],Z=f[B];if(D[Z](o,P[G](M)),y)for(let F=0,T=y.length;F<T;F++)U[F][Z](o,y[F][G](M))}}e[_]=o,h.push(o),o++}}const g=n.clone();for(const v in n.attributes){const M=c[v];if(g.setAttribute(v,new M.constructor(M.array.slice(0,o*M.itemSize),M.itemSize,M.normalized)),v in l)for(let _=0;_<l[v].length;_++){const S=l[v][_];g.morphAttributes[v][_]=new S.constructor(S.array.slice(0,o*S.itemSize),S.itemSize,S.normalized)}}return g.setIndex(h),g}function gd(){const n=new ee,t=new Set,e=new Set,i=new Set;return n.ownGeometry=s=>(t.add(s),s),n.ownMaterial=s=>(e.add(s),s),n.ownTexture=s=>(i.add(s),s),n.dispose=()=>{n.traverse(s=>{s.isInstancedMesh&&s.dispose()}),t.forEach(s=>s.dispose()),e.forEach(s=>s.dispose()),i.forEach(s=>s.dispose())},n}function yy(n=[]){const t=gd(),e=t.ownMaterial(new ce({color:"#a97640",roughness:.9})),i=t.ownMaterial(new ce({color:"#4e594b",roughness:.7})),s=t.ownGeometry(new Fn(1,1,1)),r=[],o=t.ownGeometry(new ns(.21,.21,.09,16)),a=t.ownGeometry(new Ti(.25,16,10)),c=t.ownMaterial(new Ve({color:"#ff382b",toneMapped:!1})),l=t.ownMaterial(new Ve({color:"#32f56a",toneMapped:!1})),h=t.ownMaterial(new Ve({color:"#fff5cf",toneMapped:!1})),u=new Uint8Array(1024*4);for(let _=0;_<32;_++)for(let S=0;S<32;S++){const w=(_*32+S)*4,A=Math.hypot((S-15.5)/15.5,(_-15.5)/15.5);u[w]=u[w+1]=u[w+2]=255,u[w+3]=Math.round(255*Math.max(0,1-A)**2)}const f=t.ownTexture(new Il(u,32,32));f.magFilter=f.minFilter=xn,f.needsUpdate=!0;const d=_=>t.ownMaterial(new Dl({map:f,color:_,transparent:!0,opacity:.45,blending:dc,depthTest:!0,depthWrite:!1,toneMapped:!1})),x=d("#ff382b"),p=d("#32f56a"),m=t.ownMaterial(new ce({color:"#d1d5bd",metalness:.3,roughness:.6})),g=new Map,v=(_,S,w,A,P,y,b)=>{let D=g.get(_);D||g.set(_,D=new Map);let U=D.get(b);U||D.set(b,U=[]),U.push({x:S,y:w,w:A,h:P,d:y})};for(const _ of n.filter(S=>S.operable)){const S=new ee;S.position.set(_.x,0,_.z),S.rotation.y=_.heading,t.add(S);for(const P of[-_.width/2,_.width/2])v(S,P,.85,.22,1.7,.3,i);const w=new ee;w.name="gate-panel",S.add(w);for(const P of[.45,1.2])v(w,0,P,_.width,.15,.22,e);for(let P=0;P<=Math.ceil(_.width/1.2);P++)v(w,-_.width/2+_.width*P/Math.ceil(_.width/1.2),.82,.14,1.05,.19,e);v(w,_.width/2-.35,.85,.24,.28,.3,i);const A=ld(_).map(P=>{const y=new ee;y.name="gate-switch-panel",y.position.set(P.x,P.y,P.z),y.rotation.y=P.heading,t.add(y);const b=new ne(s,i);b.scale.set(.64,.78,.14),b.castShadow=b.receiveShadow=!0,y.add(b);const D=new ne(o,m);D.rotation.x=Math.PI/2,D.scale.set(1.34,1,1.34),D.position.set(0,.12,.1),y.add(D);const U=new ne(a,c);U.name="gate-button",U.userData.dynamicScenery=!0,U.scale.set(1,1,.8),U.position.set(0,.12,.2),y.add(U);const B=new ne(a,h);B.name="gate-light-core",B.scale.set(.3,.3,.3),B.position.set(-.055,.27,.31),y.add(B);const G=new Lf(x);return G.name="gate-light-halo",G.position.copy(U.position),G.scale.set(.95,.95,1),y.add(G),{button:U,halo:G}});r.push({gate:_,panel:w,buttons:A})}const M=new ie;for(const[_,S]of g)for(const[w,A]of S){const P=new pi(s,w,A.length);A.forEach((y,b)=>{M.makeScale(y.w,y.h,y.d),M.setPosition(y.x,y.y,0),P.setMatrixAt(b,M)}),P.castShadow=P.receiveShadow=!0,_.add(P)}return t.update=()=>{for(const{gate:_,panel:S,buttons:w}of r){S.position.x=_.open?-_.width:0;for(const{button:A,halo:P}of w)A.material=_.open?l:c,P.material=_.open?p:x}},t.update(),t}function Sy(n){let t=n>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function wy(n){const t=[];for(let d=0;d<3;d++)for(const x of[-1,1])for(const p of[-.34,.34])for(const m of[-.34,.34]){const g=new L;g.setComponent(d,x*.5),g.setComponent((d+1)%3,p),g.setComponent((d+2)%3,m);const v=1+.13*Math.sin(g.x*11+g.y*7+g.z*9+n*2.7);g.multiplyScalar(v),g.x+=g.y*(n-1)*.16,t.push(g)}const e=new _y(t),i=e.attributes.position;for(let d=0;d<i.count;d++){const x=i.getX(d),p=i.getY(d),m=i.getZ(d),g=1+.06*Math.sin(x*8+p*5+m*7+n*2.3);i.setXYZ(d,x*g,p*g,m*g)}e.deleteAttribute("normal");const s=vy(e);e.dispose(),s.computeBoundingBox();const r=new L,o=new L;s.boundingBox.getSize(r),s.boundingBox.getCenter(o),s.translate(-o.x,-o.y,-o.z),s.scale(1/r.x,1/r.y,1/r.z),s.computeVertexNormals(),s.computeBoundingBox();const a=[],c=s.attributes.position,l=new Xt("#eee7d5"),h=new Xt("#68785a"),u=new Xt("#ffffff"),f=new Xt;for(let d=0;d<c.count;d++){const x=c.getX(d),p=c.getY(d),m=c.getZ(d),g=Math.sin(x*15+m*13+n*3)*Math.sin(p*11-m*9);f.copy(u).multiplyScalar(.91+.09*Math.sin(x*8+p*12+m*6+n)),g>.24&&f.lerp(l,(g-.24)*.42),p<-.05&&g<.3&&f.lerp(h,Math.min(.34,(-p+.05)*.55)),a.push(f.r,f.g,f.b)}return s.setAttribute("color",new qt(a,3)),s}function by(n=[]){const t=gd(),e=t.ownMaterial(new ce({color:"#ffffff",roughness:1,vertexColors:!0})),i=[[],[],[]],s=["#aba595","#c2b59d","#8b9189","#c5bfac","#969d97","#aaa99b","#858c7d","#b4a28d"];for(const d of n.filter(x=>x.material==="stone")){const{a:x,b:p}=d,m=Math.hypot(p.x-x.x,p.z-x.z);if(m<.001)continue;const g=Sy(Math.round(x.x*997+x.z*7919+p.x*104729+p.z*1543)),v=-Math.atan2(p.z-x.z,p.x-x.x);for(let M=0;M<4;M++){const _=M===3,w=Math.max(1,Math.ceil(m/(_?.48:M===0?1.24:.98))),A=Array.from({length:w},()=>.45+g()*1.2),P=A.reduce((b,D)=>b+D,0);let y=0;for(const b of A){const D=m*b/P,U=y+D,B=(y+U)/2,G=Math.max(1e-4,D-Math.min(.018,D*.08)),Z=_?.19+g()*.2:.29+g()*.105,F=(g()-.5)*2*Math.min(.065,G/(Z*2)),T=Math.abs(Math.sin(F)),z=Math.cos(F),k=Math.max(1e-5,(G-Z*T)/z),H=(k*T+Z*z)/2,N=Math.sin(B*.79+x.x*.13+x.z*.17)*.035;i[Math.floor(g()*3)].push({x:x.x+(p.x-x.x)*B/m,z:x.z+(p.z-x.z)*B/m,yaw:v+(g()<.5?Math.PI:0),tilt:F,y:M===0?H+.005:_?1.1+N+(g()-.5)*.055:.175+M*.325+N+(g()-.5)*.04,width:k,height:Z,depth:(_?.43:.59-M*.055)*(.94+g()*.06),color:s[Math.floor(g()*s.length)]}),y=U}}}const r=new ie,o=new ii,a=new ii,c=new L(0,1,0),l=new L(0,0,1),h=new L,u=new L,f=new Xt;for(const[d,x]of i.entries()){if(!x.length)continue;const p=new pi(t.ownGeometry(wy(d)),e,x.length);p.name="clay-drystone",x.forEach((m,g)=>{u.set(m.x,m.y,m.z),o.setFromAxisAngle(c,m.yaw).multiply(a.setFromAxisAngle(l,m.tilt)),h.set(m.width,m.height,m.depth),r.compose(u,o,h),p.setMatrixAt(g,r),p.setColorAt(g,f.set(m.color))}),p.castShadow=p.receiveShadow=!0,t.add(p)}return t}class Ey{constructor(t,e,{halfExtent:i=t.radius+1.4,opacity:s=.7}={}){this.target=t,this.halfExtent=i,this.opacity=s,this.covered=new Set,this.disposed=!1,this.parts=e.map(r=>{const o=r.material,a=o.clone();return r.material=a,r.geometry.computeBoundingBox(),{mesh:r,original:o,material:a,shadow:r.castShadow,alpha:1}}),this.cameraLocal=new L,this.cameraDirection=new L,this.up=new L(0,1,0)}update(t,e,i){if(this.disposed||!Number.isFinite(i)||i<=0)return;t.updateMatrixWorld(!0),t.getWorldDirection(this.cameraDirection).negate(),this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));const s=new Set;Math.abs(this.cameraLocal.x)>.02&&s.add(this.cameraLocal.x>=0?"+x":"-x"),Math.abs(this.cameraLocal.z)>.02&&s.add(this.cameraLocal.z>=0?"+z":"-z");const r=this.target.heading||0,o=Math.cos(r),a=Math.sin(r),c=[],l=new Set(e);for(const u of this.covered)l.has(u)||this.covered.delete(u);for(const u of e){const f=u.x-this.target.x,d=u.z-this.target.z,x=f*o-d*a,p=f*a+d*o,m=u.type==="cow"?.65*Ns(u):.4,g=this.halfExtent+m+(this.covered.has(u)?.18:0);Math.abs(x)<=g&&Math.abs(p)<=g?(this.covered.add(u),c.push({actor:u,radius:m})):this.covered.delete(u)}const h=-Math.expm1(-12*Math.min(i,.25));for(const u of this.parts){const{mesh:f,material:d}=u,p=c.length>0&&(f.userData.coverKind==="roof"||s.has(f.userData.coverSide))?this.opacity:1;u.alpha+=(p-u.alpha)*h,Math.abs(u.alpha-p)<.001&&(u.alpha=p),d.opacity=u.original.opacity*u.alpha;const m=u.alpha<1;d.transparent!==(m||u.original.transparent)&&(d.transparent=m||u.original.transparent,d.needsUpdate=!0),d.depthWrite=m?!1:u.original.depthWrite,f.castShadow=m?!1:u.shadow}}dispose(){if(!this.disposed){this.disposed=!0;for(const{mesh:t,original:e,material:i,shadow:s}of this.parts)t.material=e,t.castShadow=s,i.dispose();this.parts=[],this.covered.clear()}}}class Ty{constructor(){this.centers={value:Array.from({length:4},()=>new L(0,-1e3,0))},this.buddyCenters={value:Array.from({length:4},()=>new L(0,-1e3,0))},this.buddyRadius={value:.4},this.radius={value:.54},this.strength={value:.85*.7},this.tint={value:new Xt("#39bfff")}}install(t){const e=t.onBeforeCompile,s=t.customProgramCacheKey.bind(t)();return t.onBeforeCompile=(r,o)=>{e.call(t,r,o),Object.assign(r.uniforms,{pipGlowCenters:this.centers,pipGlowRadius:this.radius,pipGlowTint:this.tint,pipGlowStrength:this.strength}),Object.assign(r.uniforms,{buddyGlowCenters:this.buddyCenters,buddyGlowRadius:this.buddyRadius}),r.vertexShader=`varying vec3 pipSurfaceWorld;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
        vec4 pipSurfacePosition=vec4(transformed,1.0);
        #ifdef USE_BATCHING
          pipSurfacePosition=batchingMatrix*pipSurfacePosition;
        #endif
        #ifdef USE_INSTANCING
          pipSurfacePosition=instanceMatrix*pipSurfacePosition;
        #endif
        pipSurfaceWorld=(modelMatrix*pipSurfacePosition).xyz;`),r.fragmentShader=`varying vec3 pipSurfaceWorld;
        uniform vec3 pipGlowCenters[4];
        uniform vec3 buddyGlowCenters[4];
        uniform float buddyGlowRadius;
        uniform float pipGlowRadius;
        uniform float pipGlowStrength;
        uniform vec3 pipGlowTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        float pipGlowAmount=0.0;
        for(int pipPod=0;pipPod<4;pipPod++){
          vec3 pipOffset=pipSurfaceWorld-pipGlowCenters[pipPod];
          float pipFalloff=1.0-smoothstep(0.0,pipGlowRadius,length(pipOffset.xz));
          pipGlowAmount+=pipFalloff*pipFalloff*(1.0-smoothstep(0.07,0.12,abs(pipOffset.y)));
        }
        for(int buddyPod=0;buddyPod<4;buddyPod++){
          vec3 buddyOffset=pipSurfaceWorld-buddyGlowCenters[buddyPod];
          float buddyFalloff=1.0-smoothstep(0.0,buddyGlowRadius,length(buddyOffset.xz));
          pipGlowAmount+=buddyFalloff*buddyFalloff*(1.0-smoothstep(0.07,0.12,abs(buddyOffset.y)));
        }
        vec3 pipWorldNormal=inverseTransformDirection(normal,viewMatrix);
        totalEmissiveRadiance+=pipGlowTint*min(pipGlowAmount,1.0)*pipGlowStrength*smoothstep(0.45,0.9,pipWorldNormal.y);`)},t.customProgramCacheKey=()=>s+"|pip-ground-glow-v3",t.needsUpdate=!0,t}update(t,e,i=null){this.radius.value=.54*t.scale.x,t.userData.parts.pods.forEach((s,r)=>{const o=this.centers.value[r];o.copy(s),t.localToWorld(o),o.y=e(o.x,o.z)}),this.buddyRadius.value=.54*(i?.scale.x||.75),this.buddyCenters.value.forEach((s,r)=>{if(!i){s.set(0,-1e3,0);return}s.copy(i.userData.parts.pods[r]),i.localToWorld(s),s.y=e(s.x,s.z)})}}function ku(n,t=.033){const e=new me,i=tn(n).corners;return e.setAttribute("position",new qt(i.flatMap(s=>[s.x,t,s.z]),3)),e.setAttribute("uv",new qt([0,0,1,0,1,1,0,1],2)),e.setIndex([0,1,2,0,2,3]),e.computeVertexNormals(),e}function Ay(n,t=.26,e=.04){const i=tn(n),s=Math.max(0,i.halfLength-t),r=Math.max(0,i.halfWidth-t),o=[[-s,-r],[s,-r],[s,r],[-s,r]].map(([l,h])=>wi(n,l,h)),a=new me,c=[];a.setAttribute("position",new qt([...i.corners,...o].flatMap(l=>[l.x,e,l.z]),3));for(let l=0;l<4;l++){const h=(l+1)%4;c.push(l,h,h+4,l,h+4,l+4)}return a.setIndex(c),a.computeVertexNormals(),a}function Ry(n,t,e){const i=tn(t).corners;n.fillStyle="#f9e7a2",n.strokeStyle="#fff0b5",n.lineWidth=1,n.beginPath(),i.forEach((s,r)=>{const o=e(s);r?n.lineTo(o.x,o.y):n.moveTo(o.x,o.y)}),n.closePath(),n.fill(),n.stroke()}const Ce=1e-9,hr=(n,t)=>n.x*t.z-n.z*t.x,Gi=(n,t)=>({x:n.x-t.x,z:n.z-t.z});function xd(n,t=0){const e=[],i=[],s=[];for(const x of n){const p=[];p.minX=Math.min(...x.map(m=>m.x)),p.maxX=Math.max(...x.map(m=>m.x)),s.push(p);for(let m=0;m<x.length;m++){const g=x[m],v=x[(m+1)%x.length];if(i.push(g.x),Math.abs(g.x-v.x)>Ce){const M={a:g,b:v,min:Math.min(g.x,v.x),max:Math.max(g.x,v.x),id:e.length};e.push(M),p.push(M)}}}const r=[...e].sort((x,p)=>x.min-p.min);for(let x=0;x<r.length;x++)for(let p=x+1;p<r.length&&r[p].min<r[x].max;p++){const m=r[x],g=r[p];if(g.max<=m.min)continue;const v=Gi(m.b,m.a),M=Gi(g.b,g.a),_=hr(v,M);if(Math.abs(_)<Ce)continue;const S=Gi(g.a,m.a),w=hr(S,M)/_,A=hr(S,v)/_;w>Ce&&w<1-Ce&&A>Ce&&A<1-Ce&&i.push(m.a.x+w*v.x)}i.sort((x,p)=>x-p);const o=i.filter((x,p)=>!p||x-i[p-1]>Ce),a=[],c=[],l=(x,p)=>x.a.z+(p-x.a.x)*(x.b.z-x.a.z)/(x.b.x-x.a.x),h=(x,p,m)=>{[x,p,m]=[x,p,m].map(v=>({x:Math.fround(v.x),z:Math.fround(v.z)}));const g=hr(Gi(p,x),Gi(m,x));if(!(Math.abs(g)<Ce)){g>0&&([p,m]=[m,p]);for(const v of[x,p,m])a.push(v.x,t,v.z),c.push(v.x/4,v.z/4)}};let u=new Map;const f=[];for(let x=1;x<o.length;x++){const p=o[x-1],m=o[x],g=(p+m)/2,v=[];for(const S of s){if(g<=S.minX||g>=S.maxX)continue;let w=null,A=null,P=1/0,y=-1/0,b=0;for(const D of S)if(g>D.min&&g<D.max){const U=l(D,g);b++,U<P&&(w=D,P=U),U>y&&(A=D,y=U)}b>=2&&v.push({low:w,high:A})}v.sort((S,w)=>l(S.low,g)-l(w.low,g));const M=[];for(const S of v){const w=M[M.length-1];w&&l(S.low,g)<=l(w.high,g)+Ce?l(S.high,g)>l(w.high,g)&&(w.high=S.high):M.push({...S})}const _=new Map;for(const{low:S,high:w}of M){const A=`${S.id}:${w.id}`,P=u.get(A);P?(P.right=m,_.set(A,P),u.delete(A)):_.set(A,{low:S,high:w,left:p,right:m})}f.push(...u.values()),u=_}f.push(...u.values());for(const{low:x,high:p,left:m,right:g}of f){const v={x:m,z:l(x,m)},M={x:g,z:l(x,g)},_={x:g,z:l(p,g)},S={x:m,z:l(p,m)};h(v,M,_),h(v,_,S)}const d=new me;return d.setAttribute("position",new qt(a,3)),d.setAttribute("uv",new qt(c,2)),d.computeVertexNormals(),d}function Gu(n,t,{ragged:e=!1,y:i=.008,seed:s=1,roundCaps:r=!1}={}){let o=s,a=0;const c=n.map((u,f)=>(f&&(a+=Math.hypot(u.x-n[f-1].x,u.z-n[f-1].z)),o=o*1664525+1013904223>>>0,e?Math.sin(a*.72)*.11+(o/4294967296-.5)*.17:0)),l=[],h=[];for(let u=1;u<n.length;u++){const f=n[u-1],d=n[u],x=Math.hypot(d.x-f.x,d.z-f.z);if(x<Ce)continue;const p=-(d.z-f.z)/x,m=(d.x-f.x)/x,g=(_,S,w)=>({x:_.x+p*(t/2*w+S),z:_.z+m*(t/2*w+S)}),v=[g(f,c[u-1],-1),g(f,c[u-1],1)],M=[g(d,c[u],-1),g(d,c[u],1)];l.push([v[0],M[0],M[1],v[1]]),h[u-1]&&l.push([f,h[u-1][0],v[0]],[f,h[u-1][1],v[1]]),h[u]=M}if(r&&l.length)for(const u of[n[0],n[n.length-1]])l.push(Array.from({length:20},(f,d)=>({x:u.x+Math.cos(d*Math.PI/10)*t/2,z:u.z+Math.sin(d*Math.PI/10)*t/2})));return xd(l,i)}const _o=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)};function Cy(n){const t=new Set([0,n.length-1]),e=(i,s)=>{if(s-i<2)return;const r=n[i],o=n[s],a=o.x-r.x,c=o.z-r.z,l=a*a+c*c;let h=0,u=i+1;for(let f=i+1;f<s;f++){const d=n[f],x=Math.max(0,Math.min(1,((d.x-r.x)*a+(d.z-r.z)*c)/(l||1))),p=(d.x-r.x-x*a)**2+(d.z-r.z-x*c)**2;p>h&&(h=p,u=f)}(h>.025**2||l>2.5**2)&&(h<=.025**2&&(u=Math.floor((i+s)/2)),t.add(u),e(i,u),e(u,s))};return n.length>1&&e(0,n.length-1),[...t].filter(i=>i>=0&&i<n.length).sort((i,s)=>i-s)}function Py(n,t,{ragged:e=!1,seed:i=1}={}){let s=i,r=0;const o=n.map((f,d)=>(d&&(r+=Math.hypot(f.x-n[d-1].x,f.z-n[d-1].z)),s=s*1664525+1013904223>>>0,e?Math.sin(r*.72)*.11+(s/4294967296-.5)*.17:0)),a=Cy(n),c=[],l=t/2;let h=null;const u=(f,d,x,p)=>Array.from({length:24},(m,g)=>({x:f.x+x*d+Math.cos(g*Math.PI/12)*l,z:f.z+p*d+Math.sin(g*Math.PI/12)*l}));for(let f=1;f<a.length;f++){const d=a[f-1],x=a[f],p=n[d],m=n[x],g=Math.hypot(m.x-p.x,m.z-p.z);if(g<Ce)continue;const v=(m.x-p.x)/g,M=(m.z-p.z)/g,_=-M,S=v,w=(y,b,D)=>({x:y.x+_*(l*D+b),z:y.z+S*(l*D+b)}),A=[w(p,o[d],-1),w(p,o[d],1)],P=[w(m,o[x],-1),w(m,o[x],1)];if(c.push([A[0],P[0],P[1],A[1]]),h){c.push([p,h.end[0],A[0]],[p,h.end[1],A[1]]);const y=Math.atan2(h.dx*M-h.dz*v,h.dx*v+h.dz*M);if(Math.abs(y)>2.8)c.push(u(p,0,0,0));else if(Math.abs(y)>.16){const b=y>0?-1:1,D=h.end[b>0?1:0],U=A[b>0?1:0],B=Math.atan2(D.z-p.z,D.x-p.x),G=y,Z=Math.ceil(Math.abs(G)/(Math.PI/12)),F=Math.hypot(D.x-p.x,D.z-p.z),T=Math.hypot(U.x-p.x,U.z-p.z),z=[p];for(let k=0;k<=Z;k++){const H=k/Z,N=F+(T-F)*H;z.push({x:p.x+Math.cos(B+G*H)*N,z:p.z+Math.sin(B+G*H)*N})}for(let k=1;k<z.length-1;k++)c.push([p,z[k],z[k+1]])}}else c.push(u(p,o[d],_,S));h={dx:v,dz:M,end:P,b:m,offset:o[x],nx:_,nz:S}}return h&&c.push(u(h.b,h.offset,h.nx,h.nz)),c}function Hu(n,{widthExtra:t=0,ragged:e=!1,y:i=.008,seed:s=1,fadeLength:r=2.4}={}){const o=[],a=[],c=[],l=[];for(const[w,A]of n.entries()){const{points:P}=A,y=A.width+t,b=y/2;let D=0;const U=a.length;o.push(...Py(P,y,{ragged:e,seed:s}));for(let G=1;G<P.length;G++){const Z=P[G-1],F=P[G],T=Math.hypot(F.x-Z.x,F.z-Z.z);T>Ce&&(a.push({a:Z,b:F,length:T,start:D,radius:b,dx:(F.x-Z.x)/T,dz:(F.z-Z.z)/T}),D+=T)}if(U===a.length)continue;const B=Math.max(.01,Math.min(r,D*.3));for(let G=U;G<a.length;G++)Object.assign(a[G],{total:D,fade:B,first:G===U,last:G===a.length-1});for(const G of[a[U].a,a.at(-1).b]){const Z=b+B+.25;c.some(T=>T.x===G.x&&T.z===G.z&&T.reach===Z)||c.push({...G,reach:Z});let F=l.find(T=>Math.hypot(T.x-G.x,T.z-G.z)<.025);F||(F={...G,radius:b,roads:new Set},l.push(F)),F.radius=Math.max(F.radius,b),F.roads.add(w)}}const h=xd(o,i),u=h.getAttribute("position");if(!a.length)return h.setAttribute("roadOpacity",new qt([],1)),h;const f=l.filter(w=>w.roads.size>1),d=Math.max(2,...c.map(w=>w.reach)),x=new Map,p=new Map;a.forEach((w,A)=>{const{a:P,b:y,radius:b}=w,D=b+.25;for(let U=Math.floor((Math.min(P.x,y.x)-D)/d);U<=Math.floor((Math.max(P.x,y.x)+D)/d);U++)for(let B=Math.floor((Math.min(P.z,y.z)-D)/d);B<=Math.floor((Math.max(P.z,y.z)+D)/d);B++){const G=U+","+B;x.has(G)||x.set(G,[]),x.get(G).push(A)}});let m=[];for(let w=0;w<u.count;w+=3)m.push([0,1,2].map(A=>({x:u.getX(w+A),z:u.getZ(w+A)})));for(const w of c){const{reach:A}=w,P=[b=>b.x-w.x-A,b=>b.x-w.x+A,b=>b.z-w.z-A,b=>b.z-w.z+A];for(const b of P)m=m.flatMap(D=>ul(D,b));const y=[];for(const b of m){const D=b.reduce((B,G)=>({x:B.x+G.x/b.length,z:B.z+G.z/b.length}),{x:0,z:0});if(Math.abs(D.x-w.x)>A+Ce||Math.abs(D.z-w.z)>A+Ce){y.push(b);continue}let U=[b];for(let B=-A+.5;B<A;B+=.5)for(const G of["x","z"])U=U.flatMap(Z=>ul(Z,F=>F[G]-w[G]-B));y.push(...U)}m=y}const g=w=>{const A=w.x+","+w.z;if(p.has(A))return p.get(A);let P=0;for(const y of f)P=Math.max(P,1-_o(Math.max(0,y.radius-.25),y.radius,Math.hypot(w.x-y.x,w.z-y.z)));for(const y of x.get(Math.floor(w.x/d)+","+Math.floor(w.z/d))||[]){const{a:b,length:D,start:U,total:B,radius:G,fade:Z,dx:F,dz:T,first:z,last:k}=a[y],H=(w.x-b.x)*F+(w.z-b.z)*T,N=Math.max(0,Math.min(D,H)),Y=Math.hypot(w.x-b.x-F*N,w.z-b.z-T*N);if(Y>G+.25)continue;const nt=U+N,ht=z?H:nt,Et=k?B-U-H:B-nt,q=Math.min(ht,Et),$=_o(-G,Z,q),ct=.45*(1-_o(0,Z,q)),vt=ct>Ce?1-_o(G-ct,G,Y):1;if(P=Math.max(P,$*vt),P>=1)break}return p.set(A,P),P},v=[],M=[],_=[];for(const w of m)for(let A=1;A<w.length-1;A++){let[P,y,b]=[w[0],w[A],w[A+1]].map(U=>({x:Math.fround(U.x),z:Math.fround(U.z)}));const D=hr(Gi(y,P),Gi(b,P));if(!(Math.abs(D)<Ce)){D>0&&([y,b]=[b,y]);for(const U of[P,y,b])v.push(U.x,i,U.z),M.push(U.x/4,U.z/4),_.push(g(U))}}h.dispose();const S=new me;return S.setAttribute("position",new qt(v,3)),S.setAttribute("uv",new qt(M,2)),S.setAttribute("roadOpacity",new qt(_,1)),S.computeVertexNormals(),S}function Vu(n){const t=n.clone(),e=n.onBeforeCompile,i=n.customProgramCacheKey();return t.transparent=!1,t.alphaHash=!0,t.depthWrite=!0,t.onBeforeCompile=(s,r)=>{e.call(t,s,r),s.vertexShader=`attribute float roadOpacity;
varying float vRoadOpacity;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vRoadOpacity = roadOpacity;`),s.fragmentShader=`varying float vRoadOpacity;
`+s.fragmentShader.replace("#include <alphahash_fragment>",`diffuseColor.a *= clamp(vRoadOpacity, 0.0, 1.0);
#include <alphahash_fragment>`)},t.customProgramCacheKey=()=>i+"|road-terminal-fade-v1",t}function ul(n,t){const e=[],i=[];for(let s=0;s<n.length;s++){const r=n[s],o=n[(s+1)%n.length],a=t(r),c=t(o);if(a>=-Ce&&e.push(r),a<=Ce&&i.push(r),a*c<-Ce*Ce){const l=a/(a-c),h={x:r.x+(o.x-r.x)*l,z:r.z+(o.z-r.z)*l};e.push(h),i.push(h)}}return[e,i].filter(s=>s.length>=3)}function Wu(n,t,e=1,i=new me){const r=(n.rivers||[]).flatMap(l=>l.bridges).filter(l=>Math.hypot(l.x-t.x,l.z-t.z)<l.length/2+l.width/2+1.1*e).map(l=>({...l,s:Math.sin(l.heading),c:Math.cos(l.heading),planks:Math.ceil(l.length/.3)})),o=(l,h)=>({x:(l.x-h.x)*h.c-(l.z-h.z)*h.s,z:(l.x-h.x)*h.s+(l.z-h.z)*h.c}),a=[];for(let l=0;l<64;l++){const h=(f,d)=>({x:t.x+Math.cos(f/64*Math.PI*2)*d*e,z:t.z+Math.sin(f/64*Math.PI*2)*d*e});let u=[[h(l,.9),h(l+1,.9),h(l+1,1.1),h(l,1.1)]];for(const f of r){const d=[x=>o(x,f).x-f.width/2,x=>o(x,f).x+f.width/2];for(let x=0;x<=f.planks;x++)d.push(p=>o(p,f).z-(-f.length/2+x*f.length/f.planks));for(const x of d)u=u.flatMap(p=>ul(p,x))}for(const f of u){const d=f.reduce((p,m)=>({x:p.x+m.x/f.length,z:p.z+m.z/f.length}),{x:0,z:0});let x=.055;for(const p of r){const m=o(d,p);if(Math.abs(m.x)<=p.width/2+Ce&&Math.abs(m.z)<p.length/2){const g=Math.min(p.planks-1,Math.floor((m.z/p.length+.5)*p.planks));x=Math.max(x,.18+.12*Math.sin((g+.5)/p.planks*Math.PI)+.04)}}for(let p=1;p<f.length-1;p++)for(const m of[f[0],f[p],f[p+1]])a.push(m.x,x,m.z)}}let c=i.getAttribute("position");return(!c||c.array.length<a.length)&&(c&&i.dispose(),c=new Oe(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(a.length/3,1)))),3),c.setUsage(Wi),i.setAttribute("position",c)),c.array.set(a),c.needsUpdate=!0,i.setDrawRange(0,a.length/3),i.boundingSphere=new Ai(new L(t.x,.2,t.z),1.1*e+.4),i}const nc=new Map,on=10,Xu=n=>new L(...n),Ts=n=>[.07*Math.sin(n*1.8),n,.055*Math.sin(n*2.1)];function zy(n){const t=n.attributes.position,e=n.attributes.treeCenter,i=[0,1,2].map(()=>new Float32Array(t.count*3)),s=new L,r=new L,o=new L,a=new L,c=(h,u)=>new L().fromBufferAttribute(h,u),l=n.index.array;for(let h=0;h<l.length;h+=3){const[u,f,d]=l.slice(h,h+3),x=c(e,u),p=c(t,u).sub(x);s.copy(c(e,f)).sub(x),r.copy(c(e,d)).sub(x),o.copy(c(t,f)).sub(c(e,f)).sub(p),a.copy(c(t,d)).sub(c(e,d)).sub(p);const m=[s.clone().cross(r),s.clone().cross(a).add(o.clone().cross(r)),o.clone().cross(a)];for(let g=0;g<3;g++)for(const v of[u,f,d])i[g][v*3]+=m[g].x,i[g][v*3+1]+=m[g].y,i[g][v*3+2]+=m[g].z}i.forEach((h,u)=>n.setAttribute(`treeNormal${u}`,new Oe(h,3)))}function Dy(n=0){if(n=Math.abs(Math.floor(n))%3,nc.has(n))return nc.get(n);const t=[],e=[],i=[],s=[],r=[],o=[],a=(p,m)=>{const g=t.length/3;return t.push(...p),e.push(...m),g},c=(p,m,g)=>i.push(p,m,g),l=[{y:-.06,r:.62},{y:.16,r:.57},{y:.6,r:.49},{y:1.08,r:.4}];let h=.34;for(let p=0;p<4;p++){const m=1.56+.35*p,g=h*.6,v=h*.8,M=l.length;l.push({y:m-.12,r:h},{y:m+.12,r:v});const _=(p*4+n)%on;r.push({point:Ts(m),parentRadius:h,childRadii:[v,g],lower:M,sector:_}),h=v*.89}l.push({y:2.94,r:.075},{y:3.12,r:.025});for(const{y:p,r:m}of l){const g=Ts(p),v=[];for(let M=0;M<on;M++){const _=M*2*Math.PI/on,S=m+Math.max(0,1-(p+.06)/.3)*.14*Math.pow(Math.cos(_*2+n*.2),4);v.push(a([g[0]+S*Math.cos(_),p,g[2]+S*Math.sin(_)],g))}s.push(v)}for(let p=0;p<s.length-1;p++)for(let m=0;m<on;m++){const g=r.find(A=>A.lower===p);if(g&&(m-g.sector+on)%on<3)continue;const v=(m+1)%on,M=s[p][m],_=s[p][v],S=s[p+1][m],w=s[p+1][v];c(M,S,_),c(_,S,w)}const u=a(Ts(l[0].y),Ts(l[0].y)),f=a(Ts(3.15),Ts(3.15));for(let p=0;p<on;p++)c(s[0][p],s[0][(p+1)%on],u),c(s.at(-1)[(p+1)%on],s.at(-1)[p],f);for(const p of r){const{lower:m,sector:g,point:v,childRadii:M}=p,_=[];for(let B=0;B<=3;B++)_.push(s[m][(g+B)%on]);for(let B=3;B>=0;B--)_.push(s[m+1][(g+B)%on]);const S=(g+1.5)*2*Math.PI/on,w=new L(Math.cos(S),0,Math.sin(S)),A=new L(-Math.sin(S),0,Math.cos(S)),P=2.48+(v[1]-1.56)*.48,y=Xu(v).addScaledVector(w,.54);y.y+=.08;const b=Xu(v).addScaledVector(w,1.08);b.y=P;let D=_;p.branchRings=[],p.parentRing=s[m],p.continuingRing=s[m+1];for(let B=0;B<4;B++){const G=B/3,Z=y.clone().lerp(b,G).addScaledVector(A,.065*Math.sin(G*Math.PI));Z.y-=.09*Math.sin(G*Math.PI);const F=b.clone().sub(y).addScaledVector(A,.065*Math.PI*Math.cos(G*Math.PI));F.y-=.09*Math.PI*Math.cos(G*Math.PI),F.normalize();const T=A.clone(),z=T.clone().cross(F).normalize(),k=M[1]*(1-.78*G),H=[];for(let N=0;N<8;N++){const Y=-Math.PI*.625-N*Math.PI/4;H.push(a(Z.clone().addScaledVector(T,Math.sin(Y)*k).addScaledVector(z,Math.cos(Y)*k).toArray(),Z.toArray()))}for(let N=0;N<8;N++){const Y=(N+1)%8;c(D[Y],D[N],H[N]),c(D[Y],H[N],H[Y])}p.branchRings.push({indices:H,center:Z.toArray(),radius:k}),D=H}const U=a(b.clone().addScaledVector(b.clone().sub(y).normalize(),.025).toArray(),b.toArray());for(let B=0;B<8;B++)c(D[(B+1)%8],D[B],U);o.push(b.toArray())}const d=new me;d.setAttribute("position",new qt(t,3)),d.setAttribute("treeCenter",new qt(e,3));const x=t.map((p,m)=>{const g=t[m-m%3],v=t[m-m%3+1],M=t[m-m%3+2];return .94+.035*Math.sin(g*16+Math.sin(v*2)+M*11)});return d.setAttribute("color",new qt(x,3)),d.setIndex(i),d.computeVertexNormals(),zy(d),d.computeBoundingBox(),d.computeBoundingSphere(),d.userData={forks:r,tips:o,trunkRings:s,trunkProfile:l},nc.set(n,d),d}function _d(n){const t={value:1};n.userData.treeWidth=t,n.onBeforeCompile=e=>{e.uniforms.treeWidth=t,e.vertexShader=`attribute vec3 treeCenter;
attribute vec3 treeNormal0;
attribute vec3 treeNormal1;
attribute vec3 treeNormal2;
uniform float treeWidth;
#ifdef USE_INSTANCING
attribute float treeInstanceWidth;
#endif
${e.vertexShader}`,e.vertexShader=e.vertexShader.replace("#include <beginnormal_vertex>",`float woodWidth = treeWidth;
#ifdef USE_INSTANCING
woodWidth = treeInstanceWidth;
#endif
vec3 objectNormal = normalize(treeNormal0 + woodWidth * treeNormal1 + woodWidth * woodWidth * treeNormal2);`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","vec3 transformed = treeCenter + woodWidth * (position - treeCenter);")},n.customProgramCacheKey=()=>"continuous-tree-v1"}const ic=(n,t)=>Math.max(-t,Math.min(t,n)),sc=Math.PI/180,ar=(n,t,e,i)=>n+(t-n)*-Math.expm1(-e/i),Md=n=>.05+Math.sin(n*Math.PI*2/2.4)*.04;function vd(){return{time:0,hover:Md(0),headYaw:0,roll:0,pitch:0,turnRate:0,filteredSpeed:0,previous:null}}function Iy(n,t,e){const i={x:t.x,z:t.z,heading:t.heading??Math.PI/2},s=Math.hypot(t.vx||0,t.vz||0);if(n.previous||(n.previous=i,n.filteredSpeed=s),!(e>0)||!Number.isFinite(e))return n;if(n.time+=e,n.hover=Md(n.time),Math.hypot(i.x-n.previous.x,i.z-n.previous.z)>3)return n.headYaw=n.roll=n.pitch=n.turnRate=0,n.filteredSpeed=s,n.previous=i,n;const r=i.heading-n.previous.heading,o=Math.atan2(Math.sin(r),Math.cos(r))/e;n.turnRate=ar(n.turnRate,o,e,.12);const a=-ic(n.turnRate/Math.max(1,s)*Math.min(1,s)*.28,20*sc);n.roll=ar(n.roll,a,e,.2),n.headYaw=ar(n.headYaw,ic(n.turnRate*.2,30*sc),e,.09);const c=ar(n.filteredSpeed,s,e,.18),l=(c-n.filteredSpeed)/e;return n.filteredSpeed=c,n.pitch=ar(n.pitch,-ic(l/6,1)*10*sc,e,.22),n.previous=i,n}const Ls=new Map,Ly={TorusGeometry:qo,SphereGeometry:Ti,BoxGeometry:Fn,CylinderGeometry:ns,ConeGeometry:wr},_n=new Map;let Te;function Uy(n){return .7+.2*Math.max(0,Math.min(1,(n-1.015)/(3.1-1.015)))}function On(n){n.updateMatrixWorld(!0);const t=new Map;n.traverse(i=>{if(!i.isMesh)return;t.has(i.material)||t.set(i.material,[]);const s=i.geometry.clone().applyMatrix4(i.matrixWorld);if(n.userData.animalRig){const r=s.attributes.position.count,o=i.userData.gestureKind||0,a=new L(...i.userData.gesturePivot||[0,0,0]).applyMatrix4(n.matrixWorld),c=new Float32Array(r*2),l=new Float32Array(r*3);for(let h=0;h<r;h++)c[h*2]=o,c[h*2+1]=i.userData.gestureSide||1,l.set(a.toArray(),h*3);s.setAttribute("animalGesturePart",new Oe(c,2)),s.setAttribute("animalGesturePivot",new Oe(l,3))}t.get(i.material).push(s)});const e=new ee;e.name=n.name,e.userData.parts={};for(const[i,s]of t){const r=My(s,!1);s.forEach(a=>a.dispose()),n.userData.animalRig&&(r.userData.animalRig=!0);const o=new ne(r,n.userData.animalRig?qy(i):i);o.castShadow=o.receiveShadow=!0,e.add(o)}return e}function yd(n,t){const e=On(t);return _n.set(n,e),e.clone()}function Qo(n,t){const e=`${n}:${t.join(",")}`;return Ls.has(e)||Ls.set(e,new Ly[n](...t)),Ls.get(e)}function Ny(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){const r=224+(s*13+(s>>>5)*7)%27;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);const i=new es(n);return i.wrapS=i.wrapT=ni,i.repeat.set(2,2),i.colorSpace=Le,i}function Fy(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.38+Math.sin(s*.051)*1.7),a=Math.sin(Math.hypot(r-78,(s-45)*.4)*.38),c=Math.round(227+o*12+a*4+(r*7+s*11)%7),l=(s*128+r)*4;e.data[l]=e.data[l+1]=e.data[l+2]=c,e.data[l+3]=255}t.putImageData(e,0,0);const i=new es(n);return i.wrapS=i.wrapT=ni,i.colorSpace=Le,i}function Oy(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.31+Math.sin(s*.045)*1.65)*8+Math.sin(r*.11+Math.sin(s*.021)*2.6)*5,a=Math.sin(Math.hypot(r-35,(s-74)*.15)*.46)*4,c=(r*17+s*31+r*s%29)%9-4,l=Math.max(0,Math.min(255,Math.round(132+o+a+c))),h=(s*128+r)*4;e.data[h]=l,e.data[h+1]=l,e.data[h+2]=l,e.data[h+3]=255}t.putImageData(e,0,0);const i=new es(n);return i.wrapS=i.wrapT=ni,i.repeat.set(1.2,1.7),i}function By(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128),i=[[188,203,148],[210,207,153],[164,191,137],[223,207,155],[154,184,133]];for(let r=0;r<128;r++)for(let o=0;o<128;o++){const a=Math.sin(o*.17+Math.sin(r*.11)*1.4)+Math.cos(r*.19-o*.07),c=(o*17+r*31+o*r%29)%13-6,l=i[(Math.floor((a+2)*1.25)+Math.floor(o/19)+Math.floor(r/23))%i.length],h=(r*128+o)*4;e.data[h]=Math.max(0,Math.min(255,l[0]+c)),e.data[h+1]=Math.max(0,Math.min(255,l[1]+c)),e.data[h+2]=Math.max(0,Math.min(255,l[2]+c)),e.data[h+3]=255}t.putImageData(e,0,0);const s=new es(n);return s.wrapS=s.wrapT=ni,s.colorSpace=Le,s}function kn(){if(Te)return Te;const n=Ny(),t=o=>new ce({color:o,roughness:.9,map:n}),e=o=>new ce({color:o,roughness:.55,metalness:.18,map:n});Te={cream:e("#f5ead3"),white:e("#fff8e7"),dark:e("#354b55"),brass:new ce({color:"#ddb469",roughness:.48,metalness:.62}),orange:e("#e6a04e"),dogCream:e("#ffe5ac"),rust:e("#c7704d"),cyan:new ce({color:"#b6fbff",emissive:"#69dfe9",emissiveIntensity:.8,roughness:.32}),mint:e("#84cbb7"),black:e("#20343e"),wood:t("#ba9167"),paleWood:t("#e1bb87"),bark:t("#8b7758"),leaves:t("#8cbd8b"),leavesLight:t("#b8d28f"),leavesDark:t("#619b84"),roof:t("#bf755f"),barn:t("#d9977e"),barnTrim:t("#fae7c2"),flowerPink:t("#f2a6a6"),flowerYellow:t("#ffe28a"),flowerWhite:t("#fff7e5"),flowerCenter:t("#daa661"),stem:t("#7fab72"),stone:t("#abb7a4")},Te.eye=Te.white,Te.pupil=Te.black;const i=Fy();for(const o of["wood","paleWood"])Te[o].map=i;const s=Oy();Te.bark.map=Te.bark.bumpMap=s,Te.bark.bumpScale=.055,Te.treeWood=Te.bark.clone(),Te.treeWood.map=Te.treeWood.bumpMap=null,Te.treeWood.vertexColors=!0,_d(Te.treeWood);const r=By();for(const o of["leaves","leavesLight","leavesDark"])Te[o].map=r;return Te.leaves.needsUpdate=Te.leavesLight.needsUpdate=Te.leavesDark.needsUpdate=!0,Te}function Ws(n,t,e,i,s=[0,0,0],r=[1,1,1]){const o=new ne(Qo(t,e),i);return o.position.set(...s),o.scale.set(...r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function Wt(n,t,e,i,s=10){return Ws(n,"SphereGeometry",[1,s,6],t,e,i)}function $e(n,t,e,i,s=.025,r=10){const o=`sculpted-sphere:${s}:${r}`;if(!Ls.has(o)){const c=Qo("SphereGeometry",[1,r,Math.max(3,Math.round(r*.6))]).clone(),l=c.attributes.position;for(let h=0;h<l.count;h++){const u=l.getX(h),f=l.getY(h),d=l.getZ(h),x=1+s*Math.sin(u*4.1+d*2.8)*Math.cos(f*3.7-d*1.3);l.setXYZ(h,u*x,f*x,d*x)}c.computeVertexNormals(),Ls.set(o,c)}const a=new ne(Ls.get(o),t);return a.position.set(...e),a.scale.set(...i),a.castShadow=a.receiveShadow=!0,n.add(a),a}function Be(n,t,e,i){return Ws(n,"BoxGeometry",[1,1,1],t,e,i)}function We(n,t,e,i,s,r){const o=Ws(n,"CylinderGeometry",[i,i,s,10],t,e);return r&&o.rotation.set(...r),o}function Rr(n,t,e,i,s,r=.105){Wt(n,t.eye,[e,i,s],[r,r*1.08,r*.55]),Wt(n,t.pupil,[e,i-r*.05,s+r*.45],[r*.43,r*.58,r*.23]),Wt(n,t.white,[e-r*.14,i+r*.2,s+r*.67],[r*.15,r*.15,r*.12],8)}function ky(n,t,e,i,s=t.brass){return Wt(n,s,e,i)}function Mo(n,t,e,i,s,r=t.dark){const o=new ee;return o.position.set(e,s+.1,i),n.add(o),Wt(o,t.brass,[0,0,0],[.105,.105,.105]),We(o,t.dark,[0,-s*.45,0],.065,s*.85),Wt(o,t.brass,[0,-s*.72,0],[.078,.078,.078]),Wt(o,r,[0,-s+.025,.055],[.115,.1,.17]),o}function Gy(){const n=kn(),t=new ee,e=new ee,i=new ce({color:"#dce4e5",metalness:.45,roughness:.55}),s=new ce({color:"#9caaae",metalness:.55,roughness:.45});Be(t,i,[0,.83,-.06],[.62,.51,.92]),Be(t,s,[0,1.095,-.08],[.64,.035,.8]);for(const p of[-1,1]){Be(t,s,[p*.315,.84,-.08],[.016,.018,.84]),Be(t,s,[p*.316,.84,-.13],[.018,.48,.018]);for(const m of[-.43,.28])for(const g of[.64,1.03])Wt(t,n.brass,[p*.327,g,m],[.025,.025,.025])}We(t,n.dark,[0,1.03,.38],.21,.18,[Math.PI/2,0,0]),Be(e,i,[0,1.32,.47],[.57,.45,.43]),Be(e,n.dark,[0,1.35,.696],[.49,.25,.025]);const r=Be(e,i,[0,1.15,.79],[.49,.25,.45]);r.rotation.x=-.18,Be(e,s,[0,.99,.8],[.46,.04,.42]),Wt(e,n.black,[0,1.2,1.025],[.1,.095,.085]),Rr(e,n,-.135,1.36,.72,.109),Rr(e,n,.135,1.36,.72,.109);for(const p of[-1,1]){const m=Be(e,i,[p*.28,1.69,.43],[.22,.4,.12]);m.rotation.z=p*-.42,Be(m,n.dark,[0,0,.52],[.68,.75,.12])}const o=[];for(const p of[-.3,.3])for(const m of[-.35,.29])Be(t,i,[p,.64,m],[.23,.43,.27]),We(t,s,[p*1.35,.78,m],.105,.06,[0,0,Math.PI/2]),We(t,n.dark,[p,.39,m],.12,.09),We(t,s,[p,.335,m],.13,.05),o.push(new L(p,.3,m));const a=new ee,c=new ee;a.name="Pip the hovering robot sheepdog",c.name="Pip floating body rig",a.add(c);const l=On(t),h=On(e);l.position.y=-.83,h.position.set(0,1.03-.83,.38);for(const p of h.children)p.geometry.translate(0,-1.03,-.38);c.position.y=.83,c.add(l,h),c.traverse(p=>{p.isMesh&&(p.userData.ownedGeometry=!0,(p.material===i||p.material===s)&&(p.userData.ownedMaterial=!0))});const u=new ee;u.position.set(0,.94-.83,-.52),c.add(u);for(let p=0;p<7;p++)We(u,p%2?n.dark:s,[0,.04+p*.05,-p*.035],.035,.055,[-.6,0,0]);const f=new ce({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),d=Wt(u,f,[0,.41,-.27],[.075,.075,.075]);d.userData.ownedMaterial=!0;const x=o.map(p=>Array.from({length:3},(m,g)=>{const v=new Ve({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),M=new ne(Qo("TorusGeometry",[.135,.014,6,24]),v);return M.name=`Pip thruster ring ${g+1}`,M.rotation.x=Math.PI/2,M.userData.ownedMaterial=!0,a.add(M),M}));return a.userData.parts={body:l,rig:c,head:h,legs:[],tail:u,tailLight:d,basePods:o.map(p=>p.clone().add(new L(0,-.83,0))),pods:o,rings:x},a.userData.motion=vd(),Oo(a,{x:0,z:0,heading:0,vx:0,vz:0},0),a.userData.motion.previous=null,a.userData.hover={time:0,previous:null,trails:[]},a}function Hy(){const n=kn(),t=new ee,e=new ee,i=[],s=new ce({color:"#d4dfe0",metalness:.28,roughness:.68}),r=new ce({color:"#eee5d5",metalness:.12,roughness:.82}),o=new ce({color:"#b8b1a7",metalness:.24,roughness:.72}),a=new ce({color:"#4a4a43",metalness:.08,roughness:.6});$e(t,s,[0,.83,-.08],[.3,.27,.42],.012,12),Be(t,r,[0,.78,.27],[.39,.27,.28]),Be(t,o,[0,.61,.31],[.3,.045,.19]);for(const M of[-1,1]){const _=Wt(t,o,[M*.275,.84,-.02],[.055,.16,.19]);_.rotation.z=M*-.12;for(const S of[-.31,.25])Wt(t,a,[M*.25,.81,S],[.025,.025,.025],8)}We(t,n.dark,[0,1,.31],.15,.15,[Math.PI/2,0,0]),$e(e,s,[0,1.31,.43],[.3,.31,.28],.01,14);for(const M of[-1,1])We(e,a,[M*.135,1.36,.676],.117,.032,[Math.PI/2,0,0]),Wt(e,n.white,[M*.135,1.36,.704],[.088,.098,.043],12),Wt(e,n.black,[M*.135,1.35,.744],[.047,.058,.024],10),Wt(e,n.white,[M*.115,1.381,.764],[.018,.019,.012],8);$e(e,r,[0,1.145,.68],[.235,.135,.18],.006,12),Wt(e,n.black,[0,1.188,.835],[.078,.067,.055],10);const c=Ws(e,"ConeGeometry",[1,1,3],s,[-.255,1.68,.4],[.14,.25,.065]);c.rotation.z=-.16,Ws(e,"ConeGeometry",[1,1,3],o,[.27,1.57,.4],[.21,.14,.07]).rotation.set(0,0,Math.PI/2+.22),Be(e,n.dark,[.28,1.53,.459],[.13,.075,.018]);const h=[];for(const M of[-.29,.29])for(const _ of[-.3,.25]){$e(t,s,[M,.59,_],[.14,.24,.16],.006,10),We(t,o,[M,.72,_],.084,.055,[0,0,Math.PI/2]),We(t,n.dark,[M,.37,_],.105,.075);const S=new ce({color:"#7cecff",emissive:"#27c8ff",emissiveIntensity:1.1,roughness:.35});i.push(S);const w=Wt(t,S,[M,.325,_],[.112,.052,.112],10);w.userData.ownedMaterial=!0,h.push(new L(M,.3,_))}const u=new ee,f=new ee;u.name="Buddy the hovering robot puppy",f.name="Buddy floating body rig",u.add(f);const d=On(t),x=On(e);d.position.y=-.83,x.position.set(0,1.03-.83,.38);for(const M of x.children)M.geometry.translate(0,-1.03,-.38);f.position.y=.83,f.add(d,x),f.traverse(M=>{M.isMesh&&(M.userData.ownedGeometry=!0,[s,r,o,a,...i].includes(M.material)&&(M.userData.ownedMaterial=!0))});const p=new ee;p.name="Buddy spring tail",p.position.set(0,.89-.83,-.47),f.add(p);for(let M=0;M<6;M++){const _=We(p,M%2?n.dark:o,[0,.035+M*.047,-M*.032],.034,.052,[-.62,0,0]);_.name=`Buddy tail spring segment ${M+1}`}const m=new ce({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.45,roughness:.28}),g=Wt(p,m,[0,.32,-.205],[.071,.071,.071]);g.name="Buddy blue tail light",g.userData.ownedMaterial=!0;const v=h.map(M=>Array.from({length:3},(_,S)=>{const w=new Ve({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),A=new ne(Qo("TorusGeometry",[.125,.013,6,24]),w);return A.name=`Buddy hover ring ${S+1}`,A.rotation.x=Math.PI/2,A.userData.ownedMaterial=!0,u.add(A),A}));return u.userData.parts={body:d,rig:f,head:x,legs:[],tail:p,tailLight:g,basePods:h.map(M=>M.clone().add(new L(0,-.83,0))),pods:h,rings:v},u.userData.motion=vd(),Oo(u,{x:0,z:0,heading:0,vx:0,vz:0},0),u.userData.motion.previous=null,u.userData.hover={time:0,previous:null,trails:[]},u.userData.suggestedScale=.82,u.userData.modelContract="pip-pose-hover-v1",u}function Oo(n,t,e){const i=Iy(n.userData.motion,t,e),s=n.userData.parts;s.rig.position.y=.83+i.hover,s.rig.rotation.set(i.pitch,0,i.roll),s.head.rotation.y=i.headYaw,s.rig.updateMatrix(),s.pods.forEach((r,o)=>r.copy(s.basePods[o]).applyMatrix4(s.rig.matrix))}function qu(n,t){const e=n.userData.hover;if(!e)return;n.updateMatrixWorld(!0);const i=n.userData.parts.pods.map(r=>n.localToWorld(r.clone()));(!e.previous||n.position.distanceTo(e.previous)>3)&&(e.trails=i.map(r=>r.clone())),t>0&&(e.time+=t);for(let r=0;r<i.length;r++){t>0&&e.trails[r].lerp(i[r],1-Math.exp(-t/.13));const o=e.time/.55%1;for(let a=0;a<3;a++){const c=n.userData.parts.rings[r][a],l=i[r].clone().lerp(e.trails[r],a===0?0:(a-1+o)/2),h=n.worldToLocal(l);h.y=n.userData.parts.pods[r].y-.055-(a===0?0:(a-1+o)*.1+.055),c.position.copy(h),c.material.opacity=a===0?.95:a===1?.85*Math.min(1,o/.15):.85*(1-o),c.scale.setScalar(1+(a===0?0:(a-1+o)*.15))}}e.previous=n.position.clone()}const Vy=[[[.11,.47,.105,.25],[.38,.42,.14,.31],[.65,.52,.12,.28],[.87,.43,.13,.3],[.52,.88,.09,.14]],[[.06,.36,.13,.22],[.29,.6,.095,.33],[.56,.36,.17,.27],[.85,.65,.1,.25],[.68,.87,.08,.12]],[[.15,.65,.16,.25],[.43,.34,.11,.24],[.68,.62,.18,.32],[.94,.3,.08,.18],[.35,.86,.07,.12]],[[.02,.58,.1,.31],[.25,.34,.16,.23],[.51,.65,.12,.28],[.78,.38,.15,.32],[.91,.84,.06,.11]]],rc=[];function Wy(n,t){let e=0;for(const s of String(t))e=Math.imul(e^s.charCodeAt(0),16777619);let i=(n^e^1129267540)>>>0;return i=Math.imul(i^i>>>16,2246822507),i=Math.imul(i^i>>>13,3266489909),(i^i>>>16)>>>30}function Sd(n=0){if(!Number.isInteger(n)||n<0||n>3)throw new RangeError("Unknown cow coat variant");if(rc[n])return rc[n];const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d"),i=e.createImageData(256,128),s=Vy[n];for(let a=0;a<128;a++)for(let c=0;c<256;c++){const l=c/256,h=a/128,f=s.some(([p,m,g,v])=>{const M=Math.min(Math.abs(l-p),1-Math.abs(l-p))/g,_=(h-m)/v,S=Math.atan2(_,M);return M*M+_*_<1+.19*Math.sin(S*3+p*30)+.1*Math.cos(S*5+m*12)})?[49,48,46]:[238,228,204],d=(c*13+a*7)%9-4,x=(a*256+c)*4;for(let p=0;p<3;p++)i.data[x+p]=f[p]+d;i.data[x+3]=255}e.putImageData(i,0,0);const r=new es(t);r.colorSpace=Le;const o=new ce({color:"#ffffff",map:r,roughness:.94});return o.userData.cowCoatVariant=n,rc[n]=o,o}function Xy(n){const t=new ee;t.name="Clay Holstein cow";const e=h=>new ce({color:h,roughness:.94,map:n.cream.map}),i=e("#d99f91"),s=e("#704c49"),r=e("#e4d1ae"),o=Sd();$e(t,o,[0,.54,0],[.32,.34,.4875],.025,20);const a=new ee;a.position.set(0,.73,.4175),t.add(a),$e(a,n.cream,[0,-.015,.065],[.215,.225,.215],.018,16),$e(a,n.dark,[0,.065,.055],[.205,.205,.18],.018,16),Wt(a,n.cream,[0,-.055,.21],[.095,.15,.065],16),Wt(a,i,[0,-.115,.255],[.224,.115,.125],16),Wt(a,s,[0,-.203,.245],[.145,.012,.06],12),Dn(Wt(a,i,[0,-.215,.237],[.157,.026,.065],12),4,[0,-.215,.237]);for(const h of[-1,1]){fl(a,n,h*.087,.075,.207,.068),Wt(a,n.dark,[h*.086,.133,.2],[.078,.026,.043],12);const u=Wt(a,n.dark,[h*.255,.09,.005],[.139,.065,.08],14);u.rotation.z=h*.28,Dn(u,1,[h*.16,.09,.005],h);const f=Wt(a,s,[h*.265,.096,.055],[.09,.037,.023],12);f.rotation.z=h*.28,Dn(f,1,[h*.16,.09,.005],h);const d=Wt(a,s,[h*.115,-.089,.359],[.037,.045,.014],12);d.rotation.z=h*-.22,Wt(a,i,[h*.115,-.074,.36],[.028,.014,.015],10);const x=new ns(.008,.045,.16,10,4),p=x.attributes.position;for(let g=0;g<p.count;g++){const v=(p.getY(g)+.08)/.16;p.setXYZ(g,p.getX(g)+h*(.055*v-.04*v*v),p.getY(g),p.getZ(g)-.025*v*v)}x.computeVertexNormals(),x.userData.temporaryCowHorn=!0;const m=new ne(x,r);m.position.set(h*.145,.25,.015),a.add(m)}const c=[];for(const[h,u]of[[-.215,.275],[.215,.275],[-.215,-.29375],[.215,-.29375]]){const f=new ee;f.position.set(h,.36,u),t.add(f),Wt(f,n.cream,[0,-.105,0],[.073,.19,.075],12);for(const d of[-1,1])Wt(f,n.dark,[d*.035,-.272,.029],[.034,.063,.091],10);c.push(f)}Wt(t,i,[0,.295,-.23125],[.105,.067,.12],12);for(const h of[-.052,.052])for(const u of[-.2875,-.1875])Wt(t,i,[h,.24,u],[.019,.038,.02],8);const l=Wt(t,n.cream,[.035,.48,-.4835],[.027,.18,.027],10);return l.rotation.x=.2,Dn(l,2,[.035,.66,-.4835]),Dn(Wt(t,n.dark,[.035,.312,-.5175],[.048,.069,.043],10),2,[.035,.66,-.4835]),{animal:t,legs:c,head:a}}function Dn(n,t,e,i=1){return Object.assign(n.userData,{gestureKind:t,gesturePivot:e,gestureSide:i}),n}function fl(n,t,e,i,s,r){const o=n.children.length;Rr(n,t,e,i,s,r);for(const a of n.children.slice(o))Dn(a,3,[e,i,s])}const oc=new WeakMap;function qy(n){if(oc.has(n))return oc.get(n);const t=n.clone(),e=n.onBeforeCompile;return t.onBeforeCompile=i=>{e?.call(t,i),i.vertexShader=`attribute vec2 animalGesturePart;
attribute vec3 animalGesturePivot;
attribute vec4 animalGesture;
`+i.vertexShader,i.vertexShader=i.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      vec3 gestureOffset=transformed-animalGesturePivot;
      float gestureAngle=0.0;
      if(animalGesturePart.x>0.5&&animalGesturePart.x<1.5)gestureAngle=animalGesture.x*animalGesturePart.y;
      if(animalGesturePart.x>1.5&&animalGesturePart.x<2.5)gestureAngle=animalGesture.y;
      if(animalGesturePart.x>0.5&&animalGesturePart.x<2.5){
        float gc=cos(gestureAngle),gs=sin(gestureAngle);
        transformed=animalGesturePivot+vec3(gc*gestureOffset.x-gs*gestureOffset.y,gs*gestureOffset.x+gc*gestureOffset.y,gestureOffset.z);
      }
      if(animalGesturePart.x>2.5&&animalGesturePart.x<3.5)transformed.y=animalGesturePivot.y+gestureOffset.y*(1.0-animalGesture.z);
      if(animalGesturePart.x>3.5)transformed.y+=animalGesture.w;
    `),i.vertexShader=i.vertexShader.replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
      float normalAngle=animalGesturePart.x>0.5&&animalGesturePart.x<1.5?animalGesture.x*animalGesturePart.y:animalGesturePart.x>1.5&&animalGesturePart.x<2.5?animalGesture.y:0.0;
      float nc=cos(normalAngle),ns=sin(normalAngle);
      objectNormal.xy=mat2(nc,ns,-ns,nc)*objectNormal.xy;
    `)},t.customProgramCacheKey=()=>n.customProgramCacheKey()+"|animal-gestures-v1",t.defaultAttributeValues={animalGesture:[0,0,0,0]},oc.set(n,t),t}function Zy(n,t){const e=new me;e.index=n.index;for(const[i,s]of Object.entries(n.attributes))e.setAttribute(i,s);return e.boundingBox=n.boundingBox,e.boundingSphere=n.boundingSphere,e.setAttribute("animalGesture",new Do(new Float32Array(t*4),4).setUsage(Wi)),e.userData.animalGestureWrapper=!0,e}function Zu(n,t,e,i){n.userData.animalRig=!0,e.userData.animalRig=!0;for(const o of t)o.userData.animalRig=!0;n.scale.setScalar(i);for(const o of t)n.remove(o);n.remove(e);const s=On(n),r=e.position.clone().multiplyScalar(i);e.position.set(0,0,0),e.scale.setScalar(i);for(const o of[...On(e).children])o.name="head",o.position.copy(r),o.userData={headPart:!0,pivot:r.toArray(),grazeDrop:.3*i},s.add(o);for(let o=0;o<t.length;o++){const a=t[o],c=a.position.clone().multiplyScalar(i);a.position.set(0,0,0),a.scale.setScalar(i);for(const l of[...On(a).children])l.name=`leg-${o}`,l.position.copy(c),l.userData={limbIndex:o,pivot:c.toArray()},s.add(l)}return s.userData.articulated=!0,s}function Yy(n="sheep"){const t=`animal:${n}`;if(_n.has(t))return _n.get(t).clone();const e=kn();if(n==="cow"){const{animal:l,legs:h,head:u}=Xy(e),f=Zu(l,h,u,1.5);return u.traverse(d=>{d.geometry?.userData.temporaryCowHorn&&d.geometry.dispose()}),_n.set(t,f),f.clone()}const i=new ee;i.name="Robot sheep",$e(i,e.cream,[0,.54,0],[.32,.34,.39]);{for(let l=0;l<3;l++)$e(i,e.white,[0,.625,-.23+l*.22],[.335,.3,.145]);[-1,1].forEach(l=>{for(let h=0;h<3;h++)Wt(i,e.brass,[l*.312,.56,-.21+h*.21],[.029,.033,.033],8)})}ky(i,e,[0,.87,-.11],[.1,.024,.105],e.mint);const s=new ee;s.position.set(0,.7,.34),i.add(s),Wt(s,e.dark,[0,0,.06],[.22,.235,.205]),Dn(Wt(s,e.black,[0,-.08,.225],[.185,.12,.09]),4,[0,-.08,.225]),fl(s,e,-.096,.055,.221,.075),fl(s,e,.096,.055,.221,.075),[-1,1].forEach(l=>{const h=Wt(s,e.cream,[l*.235,.075,.025],[.135,.048,.082]);h.rotation.z=l*.25,Dn(h,1,[l*.16,.075,.025],l),Dn(Wt(s,e.brass,[l*.193,.075,.025],[.045,.045,.045]),1,[l*.16,.075,.025],l)}),Wt(s,e.cyan,[0,.22,.008],[.033,.033,.033],8),We(i,e.dark,[0,.64,.31],.13,.11,[Math.PI/2,0,0]);const r=[Mo(i,e,-.22,.22,.25),Mo(i,e,.22,.22,.25),Mo(i,e,-.22,-.24,.25),Mo(i,e,.22,-.24,.25)],o=Wt(i,e.dark,[0,.6,-.39],[.061,.065,.07]);Dn(o,2,[0,.65,-.36]);const c=Zu(i,r,s,1);return _n.set(t,c),c.clone()}function $y(){const n=kn(),t=new ee;t.name="Autonomous meadow drone",Wt(t,n.mint,[0,0,0],[.3,.14,.25]),Wt(t,n.cream,[0,.09,0],[.2,.085,.17]),Rr(t,n,-.1,-.005,.238,.068),Rr(t,n,.1,-.005,.238,.068);const e=[];return[-1,1].forEach(i=>[-1,1].forEach(s=>{const r=We(t,n.brass,[i*.24,0,s*.2],.035,.32,[0,0,i*Math.PI/2]);r.rotation.y=s*-.5;const o=new ee;o.position.set(i*.39,.09,s*.29),t.add(o),Wt(o,n.dark,[0,-.045,0],[.071,.08,.071]),Wt(o,n.cream,[0,0,0],[.23,.017,.04]),Wt(o,n.cream,[0,0,0],[.04,.017,.23]),Wt(o,n.cyan,[0,.014,0],[.036,.027,.036]),e.push(o)})),t.userData.parts={propellers:e},t}function Yu(n=0,t=0){n=Math.abs(Math.floor(n))%3;const e=Math.max(0,Math.min(2,Math.round(t))),i=`tree:${n}:${e}`;if(_n.has(i))return $u(_n.get(i));const s=kn(),r=new ee;r.name="clay tree";const o=new ne(Dy(n),s.treeWood);o.name="tree-wood",o.userData.treeWidth=1,o.castShadow=!1,o.receiveShadow=!0,r.add(o),r.userData.forks=o.geometry.userData.forks;const a=o.geometry.userData.tips,c=new L(0,1,0),l=[s.leaves,s.leavesDark,s.leavesLight][n],u=[[.14,3.12,.02],[-.26,2.85,-.13],[.32,2.83,.27],...a,[-.52,2.64,.47],[.52,2.75,-.47],[-.48,3.19,.27],[.44,3.21,-.3]].slice(0,7+e*2).map((x,p)=>{const m=Math.hypot(x[0],x[2]),g=1+.12*Math.sin(p*4.71+n*1.93),v=(.59-.21*Math.min(1,m/1.2))*g;return[x,[v,v*(1.02+.1*Math.sin(p+n)),v*(.94+.08*Math.cos(p*2))]]}),f=new ee;for(const[x,p]of u)$e(f,l,x,p,.075,8);for(let x=0;x<u.length*2;x++){const[p,m]=u[x%u.length],g=x*2.399963+n*.27,v=x%2?.3:-.25,M=Math.sqrt(1-v*v),_=Math.cos(g)*M,S=Math.sin(g)*M,w=1+.075*Math.sin(_*4.1+S*2.8)*Math.cos(v*3.7-S*1.3),A=new L(_/m[0],v/m[1],S/m[2]).normalize();Ws(f,"SphereGeometry",[1,6,3],l,[p[0]+_*m[0]*w*.92,p[1]+v*m[1]*w*.92,p[2]+S*m[2]*w*.92],[.14,.07,.11]).quaternion.setFromUnitVectors(c,A)}const d=On(f).children[0];return d.name="tree-foliage",d.userData.crownProfile=u.map(([x,p])=>({position:x,radial:Math.hypot(x[0],x[2]),size:p[0]})),r.add(d),_n.set(i,r),$u(r)}function $u(n){const t=n.clone(),e=t.getObjectByName("tree-wood");return e.material=e.material.clone(),_d(e.material),e.userData.ownedMaterial=!0,t}function Ky(n=2.2,t=4.5){const e=kn(),i=new ee,s=Math.ceil(t/.3);for(let r=0;r<s;r++){const o=-t/2+(r+.5)*t/s,a=Math.sin((r+.5)/s*Math.PI)*.12;Be(i,r%3?e.paleWood:e.wood,[0,a+.09,o],[n,.18,t/s-.025]),[-1,1].forEach(c=>Wt(i,e.brass,[c*(n/2-.16),a+.184,o],[.025,.01,.025],6))}return[-1,1].forEach(r=>{for(let o=0;o<4;o++)We(i,e.wood,[r*n/2,.56,-t/2+o*t/3],.065,.96);Be(i,e.paleWood,[r*n/2,.86,0],[.1,.1,t+.2]),Be(i,e.wood,[r*n/2,.46,0],[.08,.075,t+.2])}),On(i)}function jy(n=0,t=5){n=Number.isFinite(n)?Math.abs(Math.floor(n))%6:0,t=Number.isFinite(t)?Math.max(1,Math.min(12,Math.floor(t))):5;const e=`flowers:${n}:${t}`;if(_n.has(e))return _n.get(e).clone();const i=kn(),s=new ee;for(let r=0;r<t;r++){const o=r*2.39996+n,a=Math.sqrt(r/t)*.65,c=new ee;c.position.set(Math.cos(o)*a,0,Math.sin(o)*a),s.add(c);const l=.18+(r*7+n)%4*.03;We(c,i.stem,[0,l/2,0],.014,l);const h=[i.flowerYellow,i.flowerPink,i.flowerWhite][(r+n)%3];for(let u=0;u<5;u++){const f=u*Math.PI*2/5;Wt(c,h,[Math.cos(f)*.05,l,Math.sin(f)*.05],[.045,.022,.045],6)}Wt(c,i.flowerCenter,[0,l+.015,0],[.027,.023,.027],6)}return yd(e,s)}function ac(n=0){n=Math.abs(Math.floor(n))%3;const t=`bush:${n}`;if(_n.has(t))return _n.get(t).clone();const e=kn(),i=new ee,s=[e.leaves,e.leavesDark,e.leavesLight][n%3];We(i,e.bark,[0,.16,0],.08,.3),$e(i,s,[0,.42,0],[.62,.46,.48],.075),$e(i,s,[-.42,.28,.12],[.38,.34,.35],.075),$e(i,s,[.42,.34,-.1],[.4,.37,.36],.075),$e(i,s,[.1,.65,-.13],[.38,.34,.37],.075);for(let r=0;r<4;r++){const o=r*Math.PI/2+n*.29,a=$e(i,s,[Math.cos(o)*.52,.46+r%2*.1,Math.sin(o)*.42],[.25,.16,.33],.04);a.rotation.y=o}return yd(t,i)}function dl(n){let t=n;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function vo(n,t=!1){const e=document.createElement("canvas");e.width=e.height=512;const i=e.getContext("2d"),s=dl(n==="grass"?83:193);i.fillStyle=t?"#909090":n==="grass"?"#779c4d":"#b79763",i.fillRect(0,0,512,512);for(let o=0;o<90;o++){const a=s()*512,c=s()*512,l=12+s()*57;i.fillStyle=t?["#858585","#999999","#aaaaaa"][o%3]:n==="grass"?["#92ad56","#4f854a","#bdba67","#6a964d"][o%4]:["#c9ad78","#9c8055","#ddc18e"][o%3],i.globalAlpha=.08;for(const h of[-512,0,512])for(const u of[-512,0,512])i.beginPath(),i.ellipse(a+h,c+u,l,l*.6,0,0,Math.PI*2),i.fill()}for(let o=0;o<7200;o++){const a=s()*512,c=s()*512;i.fillStyle=t?["#777777","#bbbbbb","#dddddd"][o%3]:n==="grass"?["#496f39","#9eb568","#d0c480","#789b4b"][o%4]:["#826b48","#e4c995","#b99a6a"][o%3],i.globalAlpha=.14+s()*.25,i.beginPath(),i.ellipse(a,c,.35+s()*.85,n==="grass"?1.2+s()*3.8:.3+s()*1.4,s()*Math.PI,0,Math.PI*2),i.fill()}i.globalAlpha=1;const r=new es(e);return t||(r.colorSpace=Le),r.wrapS=r.wrapT=ni,r}function wd(n,t,e,i){const s=i.x-e.x,r=i.z-e.z,o=Math.max(0,Math.min(1,((n-e.x)*s+(t-e.z)*r)/(s*s+r*r||1))),a=n-e.x-o*s,c=t-e.z-o*r;return a*a+c*c}function Jy(n,t,e,i){return Math.sqrt(wd(n,t,e,i))}function cc(n,t,e){let i=1/0;for(let s=1;s<e.length;s++)i=Math.min(i,wd(n,t,e[s-1],e[s]));return Math.sqrt(i)}function Qy(n,t="#45684d"){const e=document.createElement("canvas");e.width=512,e.height=128;const i=e.getContext("2d");i.fillStyle="#faf6e9",i.beginPath(),i.roundRect(8,12,496,98,35),i.fill(),i.fillStyle=t,i.font="bold 34px sans-serif",i.textAlign="center",i.fillText(n,256,76);const s=new es(e);s.colorSpace=Le;const r=new Lf(new Dl({map:s,depthTest:!1}));return r.scale.set(6,1.5,1),r}class t1{constructor(t){this.renderer=new XM({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=hf,this.renderer.outputColorSpace=Le,this.renderer.toneMapping=ff,this.renderer.toneMappingExposure=1.05,this.scene=new dm,this.scene.background=new Xt("#bdd6df"),this.scene.fog=new zl("#bdd6df",95,195),this.hemisphere=new eg("#eaf7ff","#536747",1.65),this.scene.add(this.hemisphere),this.skyDay=new Xt("#bdd6df"),this.skyStorm=new Xt("#899da7"),this.sun=new sg("#fff4dc",2.05),this.sun.position.set(-18,35,20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100}),this.sun.shadow.camera.updateProjectionMatrix(),this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.camera=new Zo(-30,30,20,-20,.1,180),this.center=new L(-7,0,0),this.targetCenter=this.center.clone(),this.terrain=new ee,this.actors=new ee,this.scene.add(this.terrain,this.actors),this.materials=kn(),this.grass=new ce({color:"#ffffff",roughness:.96,map:vo("grass"),bumpMap:vo("grass",!0),bumpScale:.12}),this.path=new ce({color:"#fff1d3",roughness:.95,map:vo("path"),bumpMap:vo("path",!0),bumpScale:.08,side:ze}),this.pathShoulder=new ce({color:"#a99261",roughness:1,transparent:!0,opacity:.36,depthWrite:!1,side:ze}),this.thrusterGlow=new Ty;for(const e of[this.grass,this.path,this.pathShoulder])this.thrusterGlow.install(e);this.water=new ce({color:"#4b9fae",roughness:.29,metalness:.08,side:ze}),this.targetMat=new Ve({color:"#ffe8a0",transparent:!0,opacity:.56,depthWrite:!1,side:ze}),this.fenceParts=[new ne(new ns(.075,.075,.92,10),this.materials.paleWood),new ne(new Ti(1,8,6),this.materials.paleWood),new ne(new Fn(1,.105,.085),this.materials.wood)],this.sceneryBatches=[],this.sceneryFrustum=new Xo,this.viewMatrix=new ie,this.animalMeshes=[],this.animalBatches=[],this.helperMeshes=new Map,this.resize(),this.preview=!0,this.particles=[],this.nature=new dy(this.scene),this.waterEffects=new $v(this.scene)}resize(){this.width=innerWidth,this.height=innerHeight,this.renderer.setSize(this.width,this.height,!1),this.aspect=this.width/this.height}place(t,e,i,s=1,r=!1){return t.position.set(e,0,i),t.scale.multiplyScalar(s),t.traverse(o=>{o.userData.treeWidth!==void 0&&(o.userData.treeWidth=Uy(s),o.material.userData.treeWidth.value=o.userData.treeWidth)}),r&&t.traverse(o=>{o.isMesh&&(o.userData.ownedGeometry=!0)}),this.terrain.add(t),t}flat(t,e,i,s,r=.02){const o=new ne(t,e);return o.rotation.x=-Math.PI/2,o.position.set(i,r,s),o.receiveShadow=!0,this.terrain.add(o),o}setLevel(t){this.level=t,this.barkEffects=[],this.waterEffects.restoreMaterials(),this.cutaway?.dispose(),this.cutaway=null,this.gateView?.dispose(),this.gateView?.removeFromParent(),this.stoneView?.dispose(),this.stoneView?.removeFromParent(),this.gateView=this.stoneView=null;const e=new Set,i=new Set;for(const T of[this.terrain,this.actors])T.traverse(z=>{z.userData.ownedGeometry&&e.add(z.geometry),z.userData.ownedMaterial&&i.add(z.material),z.userData.ownedLabel&&(z.material.map.dispose(),i.add(z.material)),z.isInstancedMesh&&z.dispose()});e.forEach(T=>T?.dispose()),i.forEach(T=>T?.dispose()),this.terrain.clear(),this.actors.clear(),this.sceneryBatches=[],this.helperMeshes.clear(),this.animalMeshes=[],this.animalBatches=[],this.particles=[];const s=t.bounds,r=s.maxX-s.minX,o=s.maxZ-s.minZ,a=dl(t.seed),c=dl(t.seed^7628133),l=(s.maxX+s.minX)/2,h=(s.maxZ+s.minZ)/2,u=this.flat(new Pr(r+90,o+90,1,1),this.grass,l,h,-.035);if(u.userData.ownedGeometry=!0,this.grass.map.repeat.set((r+90)/15,(o+90)/15),this.grass.bumpMap.repeat.copy(this.grass.map.repeat),t.boundary?.length>4){const T=new nl;t.boundary.forEach((Y,nt)=>nt?T.lineTo(Y.x,-Y.z):T.moveTo(Y.x,-Y.z)),T.closePath();const z=new Uo(T);z.rotateX(-Math.PI/2);const k=z.attributes.position,H=z.attributes.uv;for(let Y=0;Y<k.count;Y++)H.setXY(Y,(k.getX(Y)-l)/(r+90)+.5,.5-(k.getZ(Y)-h)/(o+90));const N=new ne(z,this.grass);N.name="playable-meadow",N.position.y=-.025,N.receiveShadow=!0,N.userData.ownedGeometry=!0,this.terrain.add(N)}for(const T of t.sceneryHills||[]){const z=new ne(new Ti(1,20,12),new ce({color:["#799552","#6f914e","#93a75d"][Math.floor(a()*3)],roughness:1}));z.position.set(T.x,-.3,T.z),z.scale.set(T.radius,T.height,T.radius),z.userData.ownedGeometry=z.userData.ownedMaterial=!0,this.terrain.add(z)}const f=(T,z)=>{const k=new ne(T,z);return k.receiveShadow=!0,k.userData.ownedGeometry=!0,this.terrain.add(k),k},d=t.roads.length?Vu(this.path):null,x=t.roads.length?Vu(this.pathShoulder):null;t.roads.length&&(f(Hu(t.roads,{widthExtra:.65,ragged:!0,y:.003,seed:t.seed+5}),x).userData.ownedMaterial=!0,f(Hu(t.roads,{ragged:!0,y:.007,seed:t.seed}),d).userData.ownedMaterial=!0);const p=[];for(const T of t.rivers){const z=new ce({color:"#6c8960",roughness:1,side:ze});this.thrusterGlow.install(z);const k=f(Gu(T.points,T.width+.8,{y:.002}),z);k.userData.ownedMaterial=!0;const H=f(Gu(T.points,T.width,{y:.018}),this.water),N=T.points[0],Y=T.points.at(-1);p.push({mesh:H,points:T.points,width:T.width,heading:Math.atan2(Y.x-N.x,Y.z-N.z)});for(const nt of T.bridges){const ht=Ky(nt.width,nt.length),Et=new Map;ht.traverse(q=>{if(!q.isMesh)return;const $=q.material;Et.has($)||Et.set($,this.thrusterGlow.install($.clone())),q.material=Et.get($),q.userData.ownedMaterial=!0}),ht.rotation.y=nt.heading,this.place(ht,nt.x,nt.z,1,!0)}}const m=t.target,g=tn(m),v=g.halfLength,M=[];this.goal=f(ku(m),this.targetMat),this.goalOutline=f(Ay(m),new Ve({color:"#fff0b5",side:ze})),this.goalOutline.userData.ownedMaterial=!0,this.goalFloor=null;const _=(T,z,k,H,N,Y)=>{const nt=Math.hypot(z.x-T.x,z.z-T.z),ht=new ne(new Fn(nt,k,H),N);return ht.position.set((T.x+z.x)/2,k/2,(T.z+z.z)/2),ht.rotation.y=-Math.atan2(z.z-T.z,z.x-T.x),ht.castShadow=ht.receiveShadow=!0,ht.userData.ownedGeometry=!0,ht.userData.coverSide=Y,this.terrain.add(ht),ht};for(const T of t.fenceSegments||[]){if(T.material==="stone")continue;const{a:z,b:k,kind:H}=T,N=Math.hypot(k.x-z.x,k.z-z.z);if(H==="target"&&m.type==="barn"){const Y=Math.ceil(N/3);for(let nt=0;nt<Y;nt++){const ht={x:z.x+(k.x-z.x)*nt/Y,z:z.z+(k.z-z.z)*nt/Y},Et={x:z.x+(k.x-z.x)*(nt+1)/Y,z:z.z+(k.z-z.z)*(nt+1)/Y},q=(ht.x+Et.x)/2-m.x,$=(ht.z+Et.z)/2-m.z,ct=Math.cos(m.heading||0),vt=Math.sin(m.heading||0),dt=q*ct-$*vt,Zt=q*vt+$*ct,Qt=Math.abs(Math.abs(dt)-v)<Math.abs(Math.abs(Zt)-v)?dt>=0?"+x":"-x":Zt>=0?"+z":"-z";M.push(_(ht,Et,2.4,.22,this.materials.barn,Qt));const I=_(ht,Et,.14,.25,this.materials.barnTrim,Qt);I.position.y=2.35,M.push(I)}}else if(H==="target"&&m.type==="field"){this.placeFence(z,k);const Y=Math.ceil(N/1.4);for(let nt=0;nt<Y;nt++)this.place(ac(nt),z.x+(k.x-z.x)*(nt+.5)/Y,z.z+(k.z-z.z)*(nt+.5)/Y,.75)}else this.placeFence(z,k)}if(this.gateView=yy(t.gates),this.stoneView=by(t.fenceSegments),this.terrain.add(this.gateView,this.stoneView),m.type==="barn"){this.goalFloor=f(ku(m,.013),this.path);const T=v+.3,z=Math.ceil(v*2/2.4),k=T*2/z,H=[-T];for(let $=1;$<z;$++){const ct=-T+$*k;H.push(ct-.045,ct,ct+.045)}H.push(T);const N=[],Y=[],nt=[],ht=3.29+v*.5*Math.tan(.21);for(let $=0;$<H.length;$++)for(const ct of[-T,0,T]){const vt=$>0&&$<H.length-1&&($-2)%3===0?.025:0;N.push(ct,ht-Math.abs(ct)*Math.tan(.21)-vt,H[$]),Y.push((ct+T)/2.4,(H[$]+T)/2.4)}for(let $=0;$<H.length-1;$++)for(let ct=0;ct<2;ct++){const vt=$*3+ct,dt=vt+3;nt.push(vt,dt,vt+1,vt+1,dt,dt+1)}const Et=new me;Et.setAttribute("position",new qt(N,3)),Et.setAttribute("uv",new qt(Y,2)),Et.setIndex(nt),Et.computeVertexNormals();const q=new ne(Et,this.materials.roof);q.name="barn-roof",q.castShadow=!0,q.userData.ownedGeometry=!0,q.userData.coverKind="roof",q.position.set(m.x,0,m.z),q.rotation.y=m.heading||0,this.terrain.add(q),M.push(q),this.cutaway=new Ey(m,M,{halfExtent:v+.3})}const S=Qy(m.type==="pen"?"SUNNY PEN":m.type==="barn"?"HOME BARN":"CLOVER FIELD");S.scale.set(4.5,1.125,1),S.position.set(m.x-Math.sin(m.heading||0)*(v+1),3,m.z-Math.cos(m.heading||0)*(v+1)),S.name="Destination introduction",S.userData.ownedLabel=!0,this.destinationSign=S,this.terrain.add(S);for(const T of t.obstacles){const z=T.radius*1.45,k=Yu(Math.floor(a()*3),z<1.7?0:z<2.4?1:2);k.rotation.y=c()*Math.PI*2,this.place(k,T.x,T.z,z);for(let H=0;H<4;H++){const N=H*Math.PI/2;this.place(ac(H),T.x+Math.cos(N)*T.radius*.48,T.z+Math.sin(N)*T.radius*.48,T.radius*.7)}}const w=(T,z,k=0)=>T>s.minX+k&&T<s.maxX-k&&z>s.minZ+k&&z<s.maxZ-k&&(!(t.boundary?.length>4)||ae(t,T,z,k))&&!t.rivers.some(H=>cc(T,z,H.points)<H.width/2+k+.5)&&!t.roads.some(H=>cc(T,z,H.points)<H.width/2+k+.35)&&Math.hypot(T-m.x,z-m.z)>m.radius+k+2&&!t.obstacles.some(H=>Math.hypot(T-H.x,z-H.z)<H.radius+k)&&!(t.fenceSegments||[]).some(H=>Jy(T,z,H.a,H.b)<k+.7),A=[];let P=0;for(const T of t.roads)for(let z=1;z<T.points.length;z++){const k=T.points[z-1],H=T.points[z],N=Math.hypot(H.x-k.x,H.z-k.z);N&&(P+=N,A.push({a:k,b:H,length:N,end:P,width:T.width}))}const y=(T,z)=>{if(T<z*.7&&P){const k=(T/(z*.7)+a()/(z*.7))*P,H=A.find(Et=>Et.end>=k)||A[A.length-1],N=(k-H.end+H.length)/H.length,Y=(H.b.x-H.a.x)/H.length,nt=(H.b.z-H.a.z)/H.length,ht=(H.width/2+1.1+a()*2.8)*(T%2?1:-1);return{x:H.a.x+Y*N*H.length-nt*ht,z:H.a.z+nt*N*H.length+Y*ht}}return{x:s.minX+2+a()*(r-4),z:s.minZ+2+a()*(o-4)}};this.meadowDetails=[];const b=Math.min(190,Math.ceil(r*o/130));for(let T=0;T<b;T++){const{x:z,z:k}=y(T,b);w(z,k,1)&&(this.place(jy(T,3),z,k,.85+a()*.6),this.meadowDetails.push({x:z,z:k,kind:"flower"}))}const D=[],U=Math.min(650,Math.ceil(r*o/35));for(let T=0;T<U;T++){const{x:z,z:k}=y(T,U);w(z,k,.4)&&(D.push({x:z,z:k}),this.meadowDetails.push({x:z,z:k,kind:"tuft"}))}if(D.length){const T=new wr(.12,.55,3),z=new ce({color:"#648844",roughness:1,transparent:!0,opacity:1,depthWrite:!1}),k=new pi(T,z,D.length),H=new be;D.forEach((N,Y)=>{H.position.set(N.x,.18,N.z),H.scale.set(.7+a()*.6,.55+a()*.8,.7+a()*.6),H.rotation.y=a()*Math.PI,H.updateMatrix(),k.setMatrixAt(Y,H.matrix)}),k.receiveShadow=!0,k.userData.decorativeGrass=!0,k.userData.ownedGeometry=k.userData.ownedMaterial=!0,this.terrain.add(k),this.trackScenery(k)}const B=[];for(const T of t.rivers)for(let z=2;z<T.points.length-2;z+=5){const k=T.points[z],H=T.points[z+1],N=H.x-k.x,Y=H.z-k.z,nt=Math.hypot(N,Y)||1;for(const ht of[-1,1]){const Et=k.x-Y/nt*(T.width/2+.65)*ht,q=k.z+N/nt*(T.width/2+.65)*ht;Et>s.minX&&Et<s.maxX&&q>s.minZ&&q<s.maxZ&&!T.bridges.some($=>Math.hypot(Et-$.x,q-$.z)<$.length/2+$.width)&&B.push({x:Et,z:q})}}if(B.length){const T=new wr(.18,.95,4),z=new ce({color:"#5b7951",roughness:1}),k=new pi(T,z,B.length),H=new be;B.forEach((N,Y)=>{H.position.set(N.x,.4,N.z),H.rotation.z=(a()-.5)*.25,H.updateMatrix(),k.setMatrixAt(Y,H.matrix)}),k.userData.ownedGeometry=k.userData.ownedMaterial=!0,this.terrain.add(k),this.trackScenery(k)}const G=Math.min(62,28+Math.floor(t.index/3));for(let T=0;T<G;T++){let z,k;const H=T%4;if(H<2?(z=s.minX-12+a()*(r+24),k=H===0?s.minZ-4-a()*17:s.maxZ+4+a()*17):(z=H===2?s.minX-5-a()*18:s.maxX+5+a()*18,k=s.minZ+a()*o),t.rivers.some(nt=>cc(z,k,nt.points)<nt.width/2+3))continue;const N=1.3+a()*1.8,Y=Yu(T%3,N<1.7?0:N<2.4?1:2);Y.rotation.y=c()*Math.PI*2,this.place(Y,z,k,N)}this.bushPlacements=ZM(t);for(const T of this.bushPlacements)this.place(ac(T.variant),T.x,T.z,T.scale);this.nature.setLevel(t),this.waterEffects.setLevel(t,{grassMaterials:[this.grass],pathMaterials:[this.path,d],waterMaterial:this.water,terrain:this.terrain,rivers:p,weather:this.nature.weather}),this.batchScenery(),this.dog=Gy(),this.dog.scale.setScalar(1.35*.75),this.actors.add(this.dog);const Z=new ne(new Fl(.82,.95,40),new Ve({color:"#fff0bb",transparent:!0,opacity:.9,side:ze,depthWrite:!1}));Z.scale.setScalar(1/.75),Z.rotation.x=-Math.PI/2,Z.position.y=.03/.75,Z.userData.ownedGeometry=Z.userData.ownedMaterial=!0,this.dog.add(Z);const F=new nl;F.moveTo(0,1.45),F.lineTo(-.19,1.05),F.lineTo(.19,1.05),F.closePath(),this.goalPointer=new ne(new Uo(F),new Ve({color:"#be8652",side:ze,depthWrite:!1})),this.goalPointer.scale.setScalar(1/.75),this.goalPointer.rotation.x=Math.PI/2,this.goalPointer.userData.ownedGeometry=this.goalPointer.userData.ownedMaterial=!0,this.dog.add(this.goalPointer);for(const T of t.animals){const z=new be;z.position.set(T.x,0,T.z),z.rotation.y=T.heading??Math.PI/2,z.scale.setScalar(Ns(T)),this.animalMeshes.push(z)}for(const T of["sheep","cow"]){const z=t.animals.flatMap((nt,ht)=>nt.type===T?[ht]:[]);if(!z.length)continue;const k=Yy(T),H=[];let N=0;const Y=[];for(const nt of k.children){nt.geometry.boundingSphere||nt.geometry.computeBoundingSphere();const ht=nt.geometry.boundingSphere,Et=nt.userData.pivot;if(N=Math.max(N,ht.center.length()+ht.radius+(Et?Math.hypot(...Et):0)),nt.material.userData.cowCoatVariant!==void 0){for(let ct=0;ct<4;ct++){const vt=z.filter(Zt=>Wy(t.seed,t.animals[Zt].id??Zt)===ct);if(!vt.length)continue;const dt=new pi(nt.geometry,Sd(ct),vt.length);dt.instanceMatrix.setUsage(Wi),dt.castShadow=dt.receiveShadow=!0,dt.frustumCulled=!1,this.actors.add(dt),Y.push({indices:vt,meshes:[dt],visibleIndices:[],coatVariant:ct})}continue}const q=nt.geometry.userData.animalRig?Zy(nt.geometry,z.length):nt.geometry,$=new pi(q,nt.material,z.length);$.instanceMatrix.setUsage(Wi),$.castShadow=$.receiveShadow=!0,$.frustumCulled=!1,$.userData={...nt.userData,ownedGeometry:!!q.userData.animalGestureWrapper},this.actors.add($),H.push($)}this.animalBatches.push({indices:z,meshes:H,radius:N,visibleIndices:[]},...Y.map(nt=>({...nt,radius:N})))}this.center.set(t.spawn.x+(this.aspect<.8?2:10),0,t.spawn.z+1),this.time=0,this.update(t,t.dog,0,!0)}placeFence(t,e){const i=Math.hypot(e.x-t.x,e.z-t.z),s=Math.max(1,Math.ceil(i/1.8)),r=new ee;r.position.set((t.x+e.x)/2,0,(t.z+e.z)/2),r.rotation.y=-Math.atan2(e.z-t.z,e.x-t.x);const o=(a,c,l,h=1,u=1,f=1)=>{const d=this.fenceParts[a].clone();d.position.set(c,l,0),d.scale.set(h,u,f),d.userData.fencePart=!0,r.add(d)};for(let a=0;a<=s;a++){const c=-i/2+a*i/s;o(0,c,.46),o(1,c,.94,.083,.065,.083)}for(let a=0;a<s;a++)for(const c of[.34,.69])o(2,-i/2+(a+.5)*i/s,c,i/s+.03);this.terrain.add(r)}trackScenery(t){const e=t.instanceMatrix.array.slice(),i=new Float32Array(t.count*4),s=new ie,r=new Ai;t.geometry.boundingSphere||t.geometry.computeBoundingSphere();for(let a=0;a<t.count;a++)s.fromArray(e,a*16),r.copy(t.geometry.boundingSphere).applyMatrix4(s),i.set([r.center.x,r.center.y,r.center.z,r.radius],a*4);t.instanceMatrix.setUsage(Wi),t.frustumCulled=!1;const o=t.geometry.attributes.treeInstanceWidth?.array.slice();this.sceneryBatches.push({batch:t,matrices:e,bounds:i,widths:o})}batchScenery(){this.terrain.updateMatrixWorld(!0);const t=new Map;this.terrain.traverse(i=>{if(!i.isMesh||i.isInstancedMesh||i.userData.dynamicScenery||i.userData.ownedGeometry||i.material.transparent)return;const s=`${i.geometry.id}:${i.userData.treeWidth!==void 0?"treeWood":i.material.id}`;t.has(s)||t.set(s,[]),t.get(s).push(i)});for(const i of t.values()){if(i.length<2&&i[0].userData.treeWidth===void 0)continue;const s=i[0],r=s.userData.treeWidth!==void 0,o=r?s.geometry.clone():s.geometry;r&&o.setAttribute("treeInstanceWidth",new Do(new Float32Array(i.map(c=>c.userData.treeWidth)),1).setUsage(Wi));const a=new pi(o,r?kn().treeWood:s.material,i.length);r&&(a.userData.ownedGeometry=!0,a.userData.treeWood=!0),i.forEach((c,l)=>{a.setMatrixAt(l,c.matrixWorld),r&&c.userData.ownedMaterial&&c.material.dispose(),c.parent.remove(c)}),a.castShadow=!!s.userData.fencePart,a.receiveShadow=!0,this.terrain.add(a),this.trackScenery(a)}const e=[];this.terrain.traverse(i=>{i.isGroup&&!i.children.length&&e.push(i)}),e.forEach(i=>i.parent.remove(i))}cullScenery(){this.camera.updateMatrixWorld(!0),this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);const t=this.sceneryFrustum.planes;for(const{batch:e,matrices:i,bounds:s,widths:r}of this.sceneryBatches){let o=0;for(let a=0;a<s.length;a+=4){const c=s[a+3]+2;t.some(l=>l.normal.x*s[a]+l.normal.y*s[a+1]+l.normal.z*s[a+2]+l.constant<-c)||(e.instanceMatrix.array.set(i.subarray(a*4,a*4+16),o*16),r&&(e.geometry.attributes.treeInstanceWidth.array[o]=r[a/4]),o++)}if(e.count=o,e.visible=o>0,e.instanceMatrix.needsUpdate=!0,e.instanceMatrix.clearUpdateRanges(),o&&e.instanceMatrix.addUpdateRange(0,o*16),r){const a=e.geometry.attributes.treeInstanceWidth;a.needsUpdate=!0,a.clearUpdateRanges(),o&&a.addUpdateRange(0,o)}}}updateAnimalBatches(t,e){const i=this.sceneryFrustum.planes,s=new ie,r=new ie,o=new ie;for(const a of this.animalBatches){const c=a.visibleIndices;c.length=0;for(const l of a.indices){const h=this.animalMeshes[l],u=h.position,f=a.radius*Math.max(Math.abs(h.scale.x),Math.abs(h.scale.y),Math.abs(h.scale.z))+3;i.some(d=>d.normal.x*u.x+d.normal.y*u.y+d.normal.z*u.z+d.constant<-f)||c.push(l)}c.forEach((l,h)=>a.meshes.forEach(u=>{const f=u.geometry.attributes.animalGesture,d=this.animalMeshes[l].userData,x=d.herdPose||{};if(f&&f.setXYZW(h,x.ear||0,x.tail||0,x.blink||0,x.chew||0),u.userData.headPart){const M=this.animalMeshes[l].userData,_=u.userData.pivot;s.makeTranslation(_[0],_[1]-(M.graze||0)*u.userData.grazeDrop+(x.headLift||0),_[2]),r.makeRotationY(x.headYaw||0),s.multiply(r),r.makeRotationX(tp(M,l)),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o);return}if(u.userData.limbIndex===void 0){u.setMatrixAt(h,this.animalMeshes[l].matrix);return}const p=t.animals[l],m=u.userData.limbIndex,g=m===0||m===3?0:Math.PI,v=Math.sin(e*12+l*.8+g)*Math.min(.5,Gd(p,this.animalMeshes[l].userData.turnSpeed)*.15);s.makeTranslation(...u.userData.pivot),r.makeRotationX(v),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o)}));for(const l of a.meshes)l.geometry.attributes.animalGesture&&(l.geometry.attributes.animalGesture.needsUpdate=!0,l.geometry.attributes.animalGesture.clearUpdateRanges(),c.length&&l.geometry.attributes.animalGesture.addUpdateRange(0,c.length*4)),l.count=c.length,l.visible=c.length>0,l.instanceMatrix.needsUpdate=!0,l.instanceMatrix.clearUpdateRanges(),c.length&&l.instanceMatrix.addUpdateRange(0,c.length*16)}}update(t,e,i,s=!1){this.time+=i,this.preview=s,this.destinationSign.material.opacity=s?1:Math.max(0,Math.min(1,1-((t.time||0)-4)/1.2)),this.destinationSign.visible=this.destinationSign.material.opacity>0;const o=(s?this.aspect<.8?50:44:this.aspect<.8?39:36)/2,a=o*this.aspect,c=s?t.spawn.x+(this.aspect<.8?2:10):e.x,l=s?t.spawn.z+1:e.z+2,h=s?Math.min(1,i*.8):Math.min(1,i*3.5);if(this.center.x+=(c-this.center.x)*h,this.center.z+=(l-this.center.z)*h,!s){const p=a*.12,m=o*.12;this.center.x=Math.max(c-p,Math.min(c+p,this.center.x)),this.center.z=Math.max(l-m,Math.min(l+m,this.center.z))}this.camera.left=-a,this.camera.right=a,this.camera.top=o,this.camera.bottom=-o,this.camera.updateProjectionMatrix(),this.camera.position.set(this.center.x,36,this.center.z+29),this.camera.lookAt(this.center.x,0,this.center.z-2),this.sun.position.set(this.center.x-18,35,this.center.z+20),this.sun.target.position.set(this.center.x,0,this.center.z),this.sun.target.updateMatrixWorld(),this.dog.position.set(e.x,Pn(t,e.x,e.z),e.z),this.dog.rotation.y=e.heading??Math.PI/2,this.goalPointer.rotation.set(Math.PI/2,0,0),this.goalPointer.quaternion.premultiply(new ii().setFromAxisAngle(new L(0,1,0),Math.atan2(t.target.x-e.x,t.target.z-e.z)-this.dog.rotation.y)),this.goalPointer.position.y=.04/.75,this.goalPointer.visible=!s;const u=this.dog.userData.parts,f=Math.floor(this.time*12)/12;Oo(this.dog,e,i),qu(this.dog,i),u.tail.rotation.z=Math.sin(f*7)*.3,this.thrusterGlow.update(this.dog,(p,m)=>Pn(t,p,m)),t.animals.forEach((p,m)=>{const g=this.animalMeshes[m];g.scale.setScalar(Ns(p)),g.position.set(p.x,Pn(t,p.x,p.z)+Math.sin(f*12+m)*Math.min(.07,Math.hypot(p.vx,p.vz)*.025),p.z),kd(g,p,i),Qd(g,p,t,i),g.rotation.z=Math.sin(f*9+m)*Math.min(.055,Math.hypot(p.vx,p.vz)*.02),g.rotation.x=g.userData.herdPose?.weightShift||0,g.updateMatrix()}),this.updateBarks(i);for(const p of this.helperMeshes.values())p.visible=!1;for(const p of t.helpers||[]){let m=this.helperMeshes.get(p.type);m||(m=p.type==="drone"?$y():Hy(),p.type==="helper"&&m.scale.setScalar(this.dog.scale.x*(m.userData.suggestedScale??.82)),this.helperMeshes.set(p.type,m),this.actors.add(m)),m.visible=!0,m.position.set(p.x,p.type==="drone"?2+Math.sin(this.time*4)*.18:Pn(t,p.x,p.z),p.z),p.type==="drone"?m.userData.parts.propellers.forEach(g=>g.rotation.y=this.time*35):(Number.isFinite(p.heading)&&(m.rotation.y=p.heading),Oo(m,{...p,heading:m.rotation.y},i),qu(m,i),m.userData.parts.tail.rotation.z=Math.sin(f*7)*.3,qa(m,(this.barkEffects||[]).some(g=>g.buddy)))}const d=(t.helpers||[]).some(p=>p.type==="helper")?this.helperMeshes.get("helper"):null;this.thrusterGlow.update(this.dog,(p,m)=>Pn(t,p,m),d),qa(this.dog,(this.barkEffects||[]).some(p=>!p.buddy)),this.gateView?.update(),this.goal.material.opacity=.38+Math.sin(this.time*2)*.09,this.cutaway?.update(this.camera,[e,...t.animals,...(t.helpers||[]).filter(p=>p.type!=="drone")],i),this.nature.update(i,{dog:e,animals:t.animals,camera:this.camera,time:this.time,paused:i<=0});const x=this.nature.weather;this.waterEffects.update(i,{weather:x,movers:[{...e,id:"pip"},...t.animals.map(p=>({...p,id:`flock-${p.id}`})),...(t.helpers||[]).filter(p=>p.type!=="drone").map(p=>({...p,id:`helper-${p.type}`}))],paused:i<=0}),this.sun.intensity=2.05*x.daylight+x.lightningFlash,this.hemisphere.intensity=1.65*x.daylight+x.lightningFlash*.6,this.scene.background.copy(this.skyDay).lerp(this.skyStorm,x.cloudCoverage*.5),this.scene.fog.color.copy(this.scene.background);for(const p of this.particles)p.life-=i,p.mesh.position.addScaledVector(p.velocity,i),p.velocity.y-=i*6,p.mesh.rotation.x+=i*2,p.mesh.scale.setScalar(Math.max(0,p.life)),p.life<=0&&(this.actors.remove(p.mesh),p.mesh.geometry.dispose(),p.mesh.material.dispose());this.particles=this.particles.filter(p=>p.life>0),this.cullScenery(),this.updateAnimalBatches(t,f),this.renderer.render(this.scene,this.camera)}celebrate(t,e){for(let i=0;i<36;i++){const s=new ne(new Fn(.12,.12,.05),new Ve({color:["#f0b65c","#f8e8ad","#e99585","#80b398"][i%4]}));s.userData.ownedGeometry=s.userData.ownedMaterial=!0,s.position.set(t,1.5,e),this.actors.add(s),this.particles.push({mesh:s,velocity:new L(Math.sin(i*2.4)*3,2+i%5,Math.cos(i*2.4)*3),life:1.8})}}bark(t){t||qa(this.dog,!0);const e=t?{x:t.x,z:t.z}:{x:this.dog.position.x,z:this.dog.position.z},i=new ne(Wu(this.level,e),new Ve({color:"#fff6d8",side:ze,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1}));for(i.renderOrder=1,i.userData.ownedGeometry=i.userData.ownedMaterial=!0,this.actors.add(i),this.barkEffects??=[],this.barkEffects.push({mesh:i,origin:e,age:0,buddy:!!t});this.barkEffects.length>4;){const s=this.barkEffects.shift();this.actors.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose()}}updateBarks(t){for(const e of this.barkEffects||[])if(!(t<=0)){if(e.age+=t,e.age>=.6){this.actors.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();continue}Wu(this.level,e.origin,1+e.age/.6*6,e.mesh.geometry),e.mesh.material.opacity=.8*(1-e.age/.6)}this.barkEffects=(this.barkEffects||[]).filter(e=>e.age<.6)}drawMap(t,e,i){const s=t.getContext("2d"),r=t.width,o=t.height,a=e.bounds,c=Math.min(a.maxX-a.minX,120*(r-16)/(o-16)),l=Math.min(a.maxZ-a.minZ,120),h=c<a.maxX-a.minX||l<a.maxZ-a.minZ,u=(S,w,A,P)=>Math.max(w,Math.min(A-P,S-P/2)),f=u(i.x,a.minX,a.maxX,c),d=u(i.z,a.minZ,a.maxZ,l),x={minX:f,maxX:f+c,minZ:d,maxZ:d+l},p=S=>8+(S-x.minX)/(x.maxX-x.minX)*(r-16),m=S=>8+(S-x.minZ)/(x.maxZ-x.minZ)*(o-16),g=e.boundary?.length>4;s.fillStyle=g?"#172e25":"#29483a",s.fillRect(0,0,r,o),h&&(s.save(),s.beginPath(),s.rect(8,8,r-16,o-16),s.clip()),g&&(s.save(),s.beginPath(),e.boundary.forEach((S,w)=>w?s.lineTo(p(S.x),m(S.z)):s.moveTo(p(S.x),m(S.z))),s.closePath(),s.fillStyle="#29483a",s.fill(),s.clip());const v=(S,w,A)=>{s.lineWidth=w,s.strokeStyle=A,s.lineCap="round",s.lineJoin="round",s.beginPath(),S.forEach((P,y)=>y?s.lineTo(p(P.x),m(P.z)):s.moveTo(p(P.x),m(P.z))),s.stroke()},M=Math.min((r-16)/(x.maxX-x.minX),(o-16)/(x.maxZ-x.minZ));for(const S of e.rivers){v(S.points,S.width*M,"#35b9ed");for(const w of S.bridges){const A=Math.sin(w.heading)*w.length/2,P=Math.cos(w.heading)*w.length/2;v([{x:w.x-A,z:w.z-P},{x:w.x+A,z:w.z+P}],Math.max(3,w.width*M),"#dfbd8c")}}for(const S of e.roads)v(S.points,Math.max(1.5,S.width*M),"#f0c777");Ry(s,e.target,S=>({x:p(S.x),y:m(S.z)}));for(const S of e.fenceSegments||[])v([S.a,S.b],S.material==="stone"?2:S.kind==="boundary"?1:1.5,S.material==="stone"?"#d5d9c9":"#c0a67b");for(const S of e.gates||[])if(S.operable&&!S.open){const w=Ml(S);v([w.a,w.b],2.5,"#ffad45")}const _=(S,w,A,P,y="#183027")=>{s.fillStyle=P,s.strokeStyle=y,s.lineWidth=1.5,s.beginPath(),s.arc(p(S),m(w),A,0,Math.PI*2),s.fill(),s.stroke()};for(const S of e.animals)_(S.x,S.z,S.type==="cow"?3:2.3,S.saved?"#8be0b4":"#fff8e7");_(i.x,i.z,4.8,"#ffd166"),s.strokeStyle="#ffe6a3",s.lineWidth=2,s.beginPath(),s.arc(p(i.x),m(i.z),7,0,Math.PI*2),s.stroke();for(const S of e.helpers||[])_(S.x,S.z,3,"#45d9ef","#102c39");g&&s.restore(),h&&s.restore()}}const lc=n=>{let t=n>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,(t>>>0)/4294967296};class e1{constructor(){this.context=null,this.master=null,this.music=null,this.effects=null,this.ambience=null,this.ambientSources=new Set,this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1,this.noiseBuffer=null,this.thunderSource=null,this.thunderEvent=null,this.weatherState=null,this.birdCountdown=4+Math.random()*6,this.muted=!1,this.paused=!1,this.timer=null,this.step=0,this.nextNoteTime=0,this.active=new Set,this.disposed=!1,this.activationGeneration=0,this.tempo=106,this.voiceBuffers=new Map,this.recordedVoices=new Map,this.voiceLoad=null,this.voiceGeneration=0,this.livestockSchedules=new Map,this.livestockSources=new Set,this.livestockLevel=null}async start(){if(this.disposed)return!1;const t=++this.activationGeneration;try{if(!this.context){const i=globalThis.AudioContext||globalThis.webkitAudioContext;if(!i)return!1;this.context=new i,this.master=this.context.createGain(),this.music=this.context.createGain(),this.effects=this.context.createGain(),this.ambience=this.context.createGain(),this.master.gain.value=this.muted?0:.975,this.music.gain.value=.42,this.effects.gain.value=.6,this.ambience.gain.value=.38,this.music.connect(this.master),this.effects.connect(this.master),this.ambience.connect(this.master),this.master.connect(this.context.destination)}const e=this.context;return await e.resume(),this.disposed||t!==this.activationGeneration||this.context!==e?!1:(this.paused=!1,this.music.gain.cancelScheduledValues(this.context.currentTime),this.music.gain.setTargetAtTime(.42,this.context.currentTime,.025),this._begin(),this._loadVoices(),!0)}catch{return!1}}setMuted(t){if(this.muted=!!t,this.muted&&this._stopAmbience(),!this.context||!this.master)return;const e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(this.muted?0:.975,e,.025)}pause(){this.activationGeneration++,this.paused=!0,this._stopScheduler(),this._stopAmbience(),this.context&&this.context.state!=="closed"&&this.music.gain.setTargetAtTime(1e-4,this.context.currentTime,.025)}async resume(){return this.start()}_begin(){this.timer||this.paused||this.disposed||(this.nextNoteTime=this.context.currentTime+.06,this._schedule(),this.timer=globalThis.setInterval(()=>this._schedule(),100))}_stopScheduler(){this.timer!==null&&globalThis.clearInterval(this.timer),this.timer=null}_schedule(){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;const t=60/this.tempo/2;if(!Number.isFinite(t)||t<=0)return;const e=this.context.currentTime;if(this.nextNoteTime<e){const i=Math.ceil((e-this.nextNoteTime)/t);this.step=(this.step+i)%128,this.nextNoteTime=Math.max(e,this.nextNoteTime+i*t)}for(let i=0;i<8&&this.nextNoteTime<e+.25;i++)this._musicStep(this.step,this.nextNoteTime,t),this.step=(this.step+1)%128,this.nextNoteTime+=t}_musicStep(t,e,i){const s=[48,53,48,55,57,53,55,48],r=[[72,76,79,null,76,74,72,null],[77,81,79,null,77,76,74,null],[72,76,79,81,79,null,76,null],[74,79,83,null,81,79,74,null],[76,81,84,null,83,81,79,null],[77,null,81,79,77,76,74,null],[74,77,79,null,83,81,79,74],[76,74,72,null,79,null,72,null]],o=Math.floor(t/16),a=t%16,c=s[o],l=o===4;if(a%4===0&&this._note(c+(a===8?7:0),e,.32,.15,"bass",this.music),a%4===2&&(this._note(c+12,e,.22,.048,"pluck",this.music),this._note(c+(l?15:16),e+.018,.22,.042,"pluck",this.music),this._note(c+19,e+.035,.22,.036,"pluck",this.music)),a%2===0){const h=r[o][a/2];h!==null&&this._note(h,e,i*1.5,.12,o%2?"flute":"marimba",this.music)}}updateAmbience(t,e={}){const i=e.weather||"sun",s=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed;if(this._updateThunder(typeof i=="object"?i:null,s),!s)return;const r=typeof i=="string"?i:i.type||"sun",o=typeof i=="object"&&Number.isFinite(i.intensity)?Math.max(0,Math.min(1,i.intensity)):.3,a=["rain","light-rain","heavy-rain","storm"].includes(r)?"rain":r==="wind"?"wind":"sun",c=typeof i=="object"?i.storm?"storm":i.kind||r:r,l=c==="storm"?1:c==="heavy-rain"?.85:.5;this._weather(a,o,l),this.birdCountdown-=Number.isFinite(t)?Math.max(0,Math.min(t,.25)):0,!(this.birdCountdown>0)&&(this.birdCountdown=a==="rain"?10+Math.random()*10:4+Math.random()*6,!(typeof i=="object"&&(i.storm||i.kind==="storm")||r==="storm"||a==="rain"&&o>=.7)&&this._chirp(a==="rain"?.018:.03))}_noise(){if(!this.noiseBuffer){const t=this.context;this.noiseBuffer=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const e=this.noiseBuffer.getChannelData(0);for(let i=0;i<e.length;i++)e[i]=Math.random()*2-1}return this.noiseBuffer}resetLivestock(t=null){for(const e of[...this.livestockSources])this._releaseAmbience(e);this.livestockSources.clear(),this.livestockSchedules.clear(),this.livestockLevel=t}updateLivestock(t,{animals:e=[],listener:i,level:s=null}={}){s!==this.livestockLevel&&this.resetLivestock(s);const r=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed,o=Number.isFinite(t)?Math.max(0,Math.min(.1,t)):0;if(!o||this.paused||this.disposed)return;const a=new Set(e);for(const l of this.livestockSchedules.keys())a.has(l)||this.livestockSchedules.delete(l);let c=0;for(const l of e){if(l.type!=="sheep"&&l.type!=="cow")continue;const h=!!l.wander?.bolting,u=h||!!l.pushed||l.alert>.03;let f=this.livestockSchedules.get(l);f||(f={remaining:4+lc((s?.seed||0)^Math.imul(l.id+1,137))*16,sequence:0,bolting:!1},this.livestockSchedules.set(l,f));const d=h&&!f.bolting;if(f.bolting=h,f.remaining-=o,!d&&f.remaining>0)continue;const x=lc((s?.seed||0)^Math.imul(l.id+1,137)^Math.imul(++f.sequence,7919));if(f.remaining=u?30+x*30:13+x*12,!r||!d&&(c>=2||this.livestockSources.size>=6))continue;const p=i?Math.hypot(l.x-i.x,l.z-i.z):0;if(!Number.isFinite(p)||p>38)continue;d&&this.livestockSources.size>=6&&this._releaseAmbience(this.livestockSources.values().next().value);const m=1/(1+(p/12)**2);this._voice(l.type,.077*(u?1.25:1)*m,0,l.type==="cow"?1.1+x*.04:.94+x*.025,!0),c++}}_loadVoices(){if(this.voiceLoad||!this.context?.decodeAudioData||typeof document>"u"||!document.baseURI||typeof fetch!="function")return this.voiceLoad;const t=this.context,e=this.voiceGeneration;return this.voiceLoad=Promise.allSettled(["bark","sheep","cow"].map(async i=>{const s=await fetch(new URL(`audio/${i}.mp3`,document.baseURI),{signal:AbortSignal.timeout(1e4)});if(!s.ok)throw Error("Animal recording unavailable");const r=await t.decodeAudioData(await s.arrayBuffer());!this.disposed&&this.context===t&&this.voiceGeneration===e&&this.recordedVoices.set(i,r)})),this.voiceLoad}_voiceBuffer(t){if(this.voiceBuffers.has(t))return this.voiceBuffers.get(t);const e=this.context.sampleRate,i=t==="bark"?.28:t==="cow"?1.25:.85,s=this.context.createBuffer(1,Math.ceil(e*i),e),r=s.getChannelData(0);let o=0,a=.001;for(let c=0;c<r.length;c++){const l=c/e,h=l/i,u=t==="bark"?155-55*h:t==="cow"?112+10*Math.sin(h*Math.PI):205+14*Math.sin(l*2*Math.PI*8);o+=2*Math.PI*u/e;let f=0;const d=t==="bark"?[650,1250]:t==="cow"?[340+100*Math.sin(h*Math.PI),780]:[750,1450];for(let g=1;g<=18;g++){const v=u*g,M=d.reduce((_,S)=>_+Math.exp(-(((v-S)/(t==="bark"?360:190))**2)),0);f+=Math.sin(o*g)*(.1+M)/g}const x=(lc(c*131+17)*2-1)*(t==="bark"?.32*(1-h):.015),p=Math.min(1,l/(t==="bark"?.009:.065))*(1-h)**(t==="bark"?1.8:.7)*Math.min(1,(i-l)/.05),m=t==="sheep"?.7+.3*Math.sin(l*2*Math.PI*9):1;r[c]=(f+x)*p*m,a=Math.max(a,Math.abs(r[c]))}for(let c=0;c<r.length;c++)r[c]=r[c]/a*.85;return this.voiceBuffers.set(t,s),s}_voice(t,e,i=0,s=1,r=!1){const o=this.context.createBufferSource(),a=this.context.createGain();o.buffer=this.recordedVoices.get(t)||this._voiceBuffer(t),o.playbackRate&&(o.playbackRate.value=s),a.gain.value=e,o.connect(a),a.connect(this.effects),this._trackAmbience(o,[a]),r&&this.livestockSources.add(o);const c=o.onended;o.onended=()=>{c(),this.livestockSources.delete(o)};const l=this.context.currentTime+.01+i;return o.start(l),o.stop(l+(o.buffer.duration||(t==="bark"?.28:t==="cow"?1.25:.85))/s+.02),o}_updateThunder(t,e){t!==this.weatherState&&(this.thunderSource&&this._releaseAmbience(this.thunderSource),this.thunderSource=null,this.thunderEvent=null,this.weatherState=t,this._restoreMusicMix());const i=t?.lightningId;if(!i||i===this.thunderEvent)return;this.thunderEvent=i;const s=t.lightningAge,r=t.thunderDelay;if(!e||!Number.isFinite(s)||!Number.isFinite(r)||s<0||r<0||s>r+.2)return;this.thunderSource&&this._releaseAmbience(this.thunderSource);const o=this.context,a=o.createBufferSource(),c=o.createBiquadFilter(),l=o.createGain(),h=o.currentTime+Math.max(.01,r-s),u=3+Math.random()*2;a.buffer=this._noise(),a.loop=!0,c.type="lowpass",c.Q.value=.35,c.frequency.setValueAtTime(400,h),c.frequency.exponentialRampToValueAtTime(85,h+u*.65),l.gain.setValueAtTime(1e-4,h),l.gain.exponentialRampToValueAtTime(.65,h+.12),l.gain.exponentialRampToValueAtTime(.32,h+u*.23),l.gain.exponentialRampToValueAtTime(.035,h+u*.56),l.gain.exponentialRampToValueAtTime(1e-4,h+u*.76),a.connect(c),c.connect(l),l.connect(this.effects);const f=[];for(const[x,p]of[[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]){const m=o.createDelay(1.2),g=o.createGain();m.delayTime.value=u*x,g.gain.value=p,l.connect(m),m.connect(g),g.connect(this.effects),f.push(m,g)}this.music.gain.cancelScheduledValues(o.currentTime),this.music.gain.setValueAtTime(.42,o.currentTime),this.music.gain.setTargetAtTime(.16,h,.04),this.music.gain.setTargetAtTime(.42,h+u*.72,.35),this._trackAmbience(a,[c,l,...f]),this.thunderSource=a;const d=a.onended;a.onended=()=>{d(),this.thunderSource===a&&(this.thunderSource=null)},a.start(h),a.stop(h+u)}_chirp(t){const e=this.context.currentTime+.015,i=1600+Math.random()*1100,s=2+Math.floor(Math.random()*2);for(let r=0;r<s;r++){const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r*(.14+Math.random()*.035);o.type="sine",o.frequency.setValueAtTime(i*(1+r*.1),c),o.frequency.exponentialRampToValueAtTime(i*(r%2?.9:1.28),c+.07),o.frequency.exponentialRampToValueAtTime(i*.95,c+.13),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(t,c+.025),a.gain.exponentialRampToValueAtTime(1e-4,c+.15),o.connect(a),a.connect(this.ambience),this._trackAmbience(o,[a]),o.start(c),o.stop(c+.17)}}_trackAmbience(t,e){this.active.add(t),this.ambientSources.add(t),t.onended=()=>{t.disconnect();for(const i of e)i.disconnect();this.active.delete(t),this.ambientSources.delete(t)}}_weather(t,e,i=1){if(this.weatherKind!==t&&(this._stopWeather(),this.weatherKind=t,t!=="sun")){const s=this.context;this._noise();const r=s.createBufferSource(),o=s.createBiquadFilter(),a=s.createGain();r.buffer=this.noiseBuffer,r.loop=!0,o.type="lowpass",o.frequency.value=t==="rain"?2200:500,o.Q.value=.3,a.gain.value=1e-4,r.connect(o),o.connect(a),a.connect(this.ambience),this._trackAmbience(r,[o,a]),this.weatherSource={source:r,gain:a,filter:o},r.start()}if(this.weatherSource){const s=(t==="rain"?.032*i:.024)*e;Math.abs(s-this.weatherVolume)>.001&&(this.weatherSource.gain.gain.setTargetAtTime(s,this.context.currentTime,.8),this.weatherVolume=s)}}_stopWeather(){this.weatherSource&&this._releaseAmbience(this.weatherSource.source),this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1}_releaseAmbience(t){try{t.stop()}catch{}t.onended?.(),t.onended=null}_restoreMusicMix(){if(!this.context||!this.music||this.context.state==="closed")return;const t=this.context.currentTime;this.music.gain.cancelScheduledValues(t),this.music.gain.setTargetAtTime(this.paused?1e-4:.42,t,.025)}_stopAmbience(){this._restoreMusicMix(),this._stopWeather(),this.thunderSource=null;for(const t of[...this.ambientSources])this._releaseAmbience(t);this.birdCountdown=4+Math.random()*6,this.livestockSources.clear()}_note(t,e,i,s,r="marimba",o=this.effects){if(!this.context||!o||this.disposed)return;const a=this.context,c=a.createOscillator(),l=a.createGain(),h=440*2**((t-69)/12);c.type=r==="pluck"?"triangle":"sine",c.frequency.setValueAtTime(h,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(.001,s),e+(r==="flute"?.035:.009)),l.gain.exponentialRampToValueAtTime(1e-4,e+i),c.connect(l),l.connect(o),this.active.add(c),c.onended=()=>{c.disconnect(),l.disconnect(),this.active.delete(c)},c.start(e),c.stop(e+i+.03),r==="marimba"&&this._note(t+19,e,i*.35,s*.12,"partial",o)}play(t){if(!this.context||this.context.state!=="running"||this.muted||this.disposed)return;const e=this.context.currentTime+.01;if(t==="bark"){this._voice("bark",.2);return}const s={saved:[79,84],animal:[79,84],rescue:[79,84],purchase:[72,76,79,84],unlock:[72,76,79,84],completed:[72,76,79,84,79,84],complete:[72,76,79,84,79,84],win:[72,76,79,84,79,84],click:[79]}[t];s&&s.forEach((r,o)=>this._note(r,e+o*.115,.28,.16,"marimba"))}dispose(){if(!this.disposed){this.activationGeneration++,this.disposed=!0,this._stopScheduler(),this._stopAmbience();for(const t of this.active){try{t.stop()}catch{}t.disconnect()}this.active.clear(),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{}),this.context=null,this.master=this.music=this.effects=this.ambience=null,this.noiseBuffer=null,this.voiceGeneration++,this.recordedVoices.clear(),this.voiceLoad=null,this.voiceBuffers.clear(),this.livestockSchedules.clear(),this.livestockLevel=null}}}const bd=2.1,n1=.65,pl=n=>n===2?2:1;function Zl(n=1){return{capacity:pl(n),charges:pl(n),remaining:0,burstRemaining:0}}function Ed(n,t,e=n.capacity){const i=pl(e);i!==n.capacity&&(n.charges=Math.min(i,n.charges+Math.max(0,i-n.capacity)),n.capacity=i);const s=Number.isFinite(t)?Math.max(0,t):0;return n.burstRemaining=Math.max(0,n.burstRemaining-s),n.remaining>0&&(n.remaining=Math.max(0,n.remaining-s),n.remaining<=1e-8&&(n.remaining=0,n.charges=i)),n}function i1(n,t=n.capacity){return Ed(n,0,t),n.remaining>0||n.charges<=0?!1:(n.charges--,n.burstRemaining=n1,n.charges||(n.remaining=bd),!0)}const Mt=n=>document.getElementById(n);let Je,Nt,Jn,re=kv(),Ht="intro",vi="playing",Ku=performance.now(),un=0,In=Zl(),ta=-1/0,bn=0,Dr=!1,Yl=0,Xs=!1,ju,$l=null;const De=new e1,Nn={x:0,z:0},wn=new Set,Re=(n,t)=>Mt(n).classList.toggle("hidden",!t);let Bo=!1;const ea=()=>{Bo||Gv(re)||ko("Progress is kept for this session; browser storage is unavailable.")},Ju=n=>String(n).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function ko(n){Mt("toast").textContent=n,Re("toast",!0),clearTimeout(ju),ju=setTimeout(()=>Re("toast",!1),2800)}function Ri(){Mt("points").textContent=re.points,Mt("sound").textContent=re.music?"♫":"♪",Mt("sound").setAttribute("aria-label",re.music?"Mute sound":"Enable sound"),Mt("sound").style.opacity=re.music?"1":".55",Mt("menu-sound")&&(Mt("menu-sound").textContent=`Sound: ${re.music?"On":"Off"}`,Mt("menu-sound").setAttribute("aria-pressed",String(re.music)))}async function Td(){re.music=!re.music,De.setMuted(!re.music),ea(),Ri(),re.music&&(await De.start(),(Ht!=="playing"||!re.music)&&De.pause())}function Kl(){const n=In.remaining>0;Mt("bark").classList.toggle("cooldown",n),Mt("bark").disabled=n,Mt("bark").style.setProperty("--bark-progress",String(Math.max(0,Math.min(1,1-In.remaining/bd)))),Mt("bark").setAttribute("aria-label",n?"Woof recharging":`Woof · ${In.charges} ${In.charges===1?"bark":"barks"} ready`),Mt("bark").dataset.charges=String(In.charges)}function Ad(n=!1,t=0){Re("countdown",n),Mt("countdown").textContent=n?`${Math.ceil(t)}s`:"",Mt("countdown").setAttribute("aria-label",n?`${Math.ceil(t)} seconds remaining to deliver the flock`:"Delivery countdown has not started"),Mt("countdown").classList.toggle("running",n),Mt("countdown").classList.toggle("urgent",n&&t<=10)}function ji(){Nn.x=Nn.z=0,Si=null,wn.clear(),qi=-1/0,jn=null,Mt("stick").style.transform="translate(0,0)"}function na(){const n=Math.max(0,Math.min(1,un/3)),t=Math.max(0,Math.min(1,un/.65,(3-un)/1.2));Mt("level-introduction").style.opacity=String(t),Mt("level-introduction").style.setProperty("--level-scale",String(.72+.48*(1-(1-n)**2))),Re("level-introduction",Ht==="playing"&&un<3)}async function Ji(n=re.highestLevel){n=Math.max(0,Math.min(99,Math.floor(Number(n)||0))),yi(!1),Nt=vl(n),Jn={...Nt.dog,heading:Nt.dog.heading??Math.atan2(Nt.spawn.x-Nt.dog.x,Nt.spawn.z-Nt.dog.z)},un=0,bn=0,Dr=!1,In=Zl(Ko(re.upgrades,n+1).barkCharges),ta=-1/0,De.resetLivestock?.(Nt),ji(),Je.setLevel(Nt),Ht="playing",document.body.classList.toggle("in-game",!0),Kl(performance.now());for(const t of["intro","scene-tag"])Re(t,!1);for(const t of["mission","controls","map-box"])Re(t,!0);Mt("level-number").textContent=`Level ${n+1}`,na(),Mt("mission").setAttribute("aria-label",`Level ${n+1} · Livestock delivery status`),Mt("total").textContent=Nt.animals.length,Mt("saved").textContent=0,Ad(),Xs=!1,Re("toggle-tip",!1),Mt("toggle-tip").setAttribute("aria-expanded","false"),Re("tip",!0),Go(jl(n)[0]),De.setMuted(!re.music),await De.start(),(Ht!=="playing"||!re.music)&&De.pause(),Ri()}const s1=14;function jl(n){return n===0?["Drag to move Pip.","Move behind the flock to guide it.","Double-tap to woof."]:[Nt.routes.length>1?"Choose a trail on the map.":"Gather stragglers before crossing."]}function Jl(){Dr=!0,Xs=!1,Re("tip",!1),Re("toggle-tip",!0),Mt("toggle-tip").setAttribute("aria-expanded","false"),Mt("toggle-tip").setAttribute("aria-label","Show tips")}function Go(n){Yl=un,Mt("tip-text").textContent=n,Mt("tip").querySelector(".tip-number").textContent=`0${bn+1}`}function ia(){Ht!=="playing"||!i1(In,Ko(re.upgrades,Nt.index+1).barkCharges)||(Kl(),De.play("bark"),Je.bark(),navigator.vibrate&&navigator.vibrate(20))}function sa(n,t="paused"){vi=Ht==="playing"?"playing":Ht==="complete"?"complete":"intro",Ht=t,na(),ji(),De.pause(),Mt("modal").classList.contains("hidden")&&($l=document.activeElement),Mt("modal-card").innerHTML=n,Re("modal",!0),Re("controls",!1),setTimeout(()=>Mt("modal-card").querySelector("button")?.focus(),30)}function yi(n=!0){Re("modal",!1),n&&(Ht=vi,Re("controls",Ht==="playing"),Ht==="playing"&&De.resume(),$l?.focus()),na(),ji()}function Ys(){if(Ht==="reset-confirm"){Mt("cancel-reset").onclick();return}if(Ht==="shop"){Mt("shop-back").onclick();return}if(Ht==="paused"){yi();return}Ht!=="complete"&&(sa(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${Ht==="intro"?"Hello, shepherd.":"Paws for a moment."}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${Ht==="intro"?"Back to the meadow":"Keep herding"} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${re.points} bolts</button>${Ht==="playing"?'<button class="secondary" id="restart">Restart this meadow</button><button class="secondary" id="quit">Quit to landing page</button>':""}<button class="secondary" id="menu-sound" aria-pressed="${re.music}">Sound: ${re.music?"On":"Off"}</button><button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,re.highestLevel+1)},(n,t)=>`<button class="${t===Nt.index?"current":""}" data-level="${t}" aria-label="Play level ${t+1}">${t+1}</button>`).join("")}</div>`),Mt("close").onclick=()=>yi(),Mt("resume").onclick=()=>yi(),Mt("menu-sound").onclick=Td,Mt("upgrades-menu").onclick=ra,Mt("restart-game-menu").onclick=Rd,Mt("restart")&&(Mt("restart").onclick=()=>Ji(Nt.index)),Mt("quit")&&(Mt("quit").onclick=r1),Mt("modal-card").querySelectorAll("[data-level]").forEach(n=>n.onclick=()=>Ji(Number(n.dataset.level))))}function r1(){yi(!1),Ht=vi="intro",ji(),qi=-1/0,jn=null,In=Zl(),ta=-1/0,De.resetLivestock?.(null),un=0,bn=0,Dr=!1,Xs=!1,Us=0,De.pause(),Nt=vl(0),Jn={...Nt.dog,heading:Math.PI/2},Je.setLevel(Nt),document.body.classList.toggle("in-game",!1);for(const n of["mission","controls","map-box","tip","toggle-tip","countdown","level-introduction"])Re(n,!1);for(const n of["intro","scene-tag"])Re(n,!0);Ri(),Mt("play").focus()}function Rd(){const n=Ht,t=vi,e=()=>{Ht=n,vi=t,n==="paused"?(Ht=t,Ys(),Mt("restart-game-menu").focus()):(yi(!1),$l?.focus())};sa('<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>',"reset-confirm"),Mt("close").onclick=e,Mt("cancel-reset").onclick=e,Mt("confirm-reset").onclick=async()=>{re={...Ar(),music:re.music},Us=0,qi=-1/0,jn=null,ea(),Ri(),await Ji(0),Ht==="playing"&&Mt("pause").focus()}}function ra(){const n=Ht==="complete"?"complete":Ht==="paused"||Ht==="shop"?vi:Ht,t=Bo?Nt.index+1:void 0,e=sd(re.upgrades,Nt.index+1);sa(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${re.points} bolts</strong> to spend.</p><div class="upgrade-grid">${$o.filter(s=>s.id!=="drone").map(s=>{const r=si(re.upgrades,s.id),o=si(e,s.id),a=ev(re,s.id,t),c=Bl(re.upgrades,s.id),l=a.reason==="locked",h=l?`Next tier unlocks at level ${a.unlockLevel}`:c===null?"All tiers owned":s.tierDescriptions[r],u=r>o?`<small class="inactive-upgrade">${o?"Next owned tier activates":"Equipped"} from level ${s.unlockLevels[o]}</small>`:"";return`<article class="upgrade ${l?"locked":""}"><div class="upgrade-icon">${{speed:"ϟ",flock:"⌁",drone:"✥",helper:"♧",bark:"♪",cohesion:"❋"}[s.id]}</div><div><h3>${Ju(s.name)} <small style="font-size:9px;color:#839277">${r}/3</small></h3><p>${Ju(h)}</p>${u}</div><button data-buy="${s.id}" ${a.available?"":"disabled"}>${c===null?"Max tier":l?`Level ${a.unlockLevel}`:`${c} ✦`}</button></article>`}).join("")}</div><button class="primary" id="shop-back">${n==="complete"?"Back to your reward":"Back to the meadow"} <span>➜</span></button>`,"shop"),vi=n;const i=()=>{n==="complete"?Ql(!1):yi()};Mt("close").onclick=i,Mt("shop-back").onclick=i,Mt("modal-card").querySelectorAll("[data-buy]").forEach(s=>s.onclick=()=>{const r=nv(re,s.dataset.buy,t);r.ok&&(De.play("purchase"),ea(),Ri(),ra(),vi=n,ko(`${r.upgrade.tierNames[r.level-1]} equipped!`))})}let Us=0;function Ql(n=!0){n&&(Us=Bv(re,Nt),ea(),Ri(),De.play("completed"),Je.celebrate(Nt.target.x,Nt.target.z)),Ht="complete";const t=Nt.result?.saved??Nt.animals.filter(s=>s.saved).length,e=Nt.animals.length,i=Nt.result?.score??0;sa(`<div class="complete-seal">✦</div><div class="eyebrow">${t===e?"A GOOD DAY’S HERDING":"DELIVERY TIME IS UP"}</div><h2>${t===e?"Everyone’s home.":t>0?"A flock brought home.":"Try this meadow again."}</h2><p>${t} / ${e} robots delivered.<br>Score ${i} / ${Nt.reward} · Best ${re.bestScores[Nt.index]||0} / ${Nt.reward}<br>${Math.floor(un/60)}m ${Math.floor(un%60)}s in the countryside.</p><div class="reward">+${Us}<span style="font-size:20px"> ✦</span></div><p>${Us?"Bolts earned from your improved delivery score.":"No extra bolts this time. Deliver more robots to improve your best score."}${t>0&&t<e?" The next meadow is open.":""}</p><button class="primary" id="next">${t===0?"Try again":Nt.index>=99?"Return to the first meadow":"Next meadow"} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,"complete"),Mt("next").onclick=()=>Ji(t===0?Nt.index:Nt.index>=99?0:Nt.index+1),Mt("reward-shop").onclick=ra,Mt("replay").onclick=()=>Ji(Nt.index)}let Si=null,ml={x:0,y:0},qi=-1/0,jn=null,th=!1;function o1(n){Ht!=="playing"||Si!==null||n.isPrimary===!1||n.target.closest("button,header,.map-box,.tip")||n.target!==Mt("world")&&!n.target.closest("#joystick")||(n.preventDefault(),Si=n.pointerId,ml={x:n.clientX,y:n.clientY},th=!1,n.target.setPointerCapture?.(Si))}function a1(n){if(n.pointerId!==Si)return;const t=n.clientX-ml.x,e=n.clientY-ml.y,i=Math.hypot(t,e),s=42;th||=i>9,Nn.x=t/Math.max(s,i),Nn.z=e/Math.max(s,i),Mt("stick").style.transform=`translate(${Nn.x*s}px,${Nn.z*s}px)`}function eh(n){if(n.pointerId===Si){if(n.preventDefault(),n.type==="pointerup"&&!th){const t=performance.now();jn&&Math.hypot(n.clientX-jn.x,n.clientY-jn.y)<42&&t-qi<330?(ia(),qi=-1/0,jn=null):(qi=t,jn={x:n.clientX,y:n.clientY})}else qi=-1/0,jn=null;Si=null,Nn.x=Nn.z=0,Mt("stick").style.transform="translate(0,0)"}}document.addEventListener("pointerdown",o1,{passive:!1});document.addEventListener("pointermove",a1,{passive:!1});document.addEventListener("pointerup",eh,{passive:!1});document.addEventListener("pointercancel",eh,{passive:!1});document.addEventListener("lostpointercapture",eh,{passive:!1});const nh=n=>n===Mt("world")||!!n.closest("#controls");document.addEventListener("touchstart",n=>{Ht==="playing"&&nh(n.target)&&n.preventDefault()},{passive:!1});document.addEventListener("touchend",n=>{Ht==="playing"&&nh(n.target)&&(n.preventDefault(),n.target.closest("#bark")&&(ta=performance.now(),ia()))},{passive:!1});document.addEventListener("gesturestart",n=>{Ht==="playing"&&n.preventDefault()},{passive:!1});document.addEventListener("gesturechange",n=>{Ht==="playing"&&n.preventDefault()},{passive:!1});document.addEventListener("dblclick",n=>{Ht==="playing"&&nh(n.target)&&n.preventDefault()},{passive:!1});document.addEventListener("keydown",n=>{if(Ht==="playing"&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","w","a","s","d","W","A","S","D"].includes(n.key)&&!n.target.closest('input,textarea,[contenteditable="true"]')&&!(n.key===" "&&n.target.closest("button"))&&(n.preventDefault(),wn.add(n.key.toLowerCase()),n.key===" "&&!n.repeat&&ia()),n.key==="Escape"&&(n.preventDefault(),Ys()),n.key==="Tab"&&!Mt("modal").classList.contains("hidden")){const t=[...Mt("modal-card").querySelectorAll("button:not([disabled])")],e=t[0],i=t.at(-1);n.shiftKey&&document.activeElement===e?(n.preventDefault(),i.focus()):!n.shiftKey&&document.activeElement===i&&(n.preventDefault(),e.focus())}});document.addEventListener("keyup",n=>wn.delete(n.key.toLowerCase()));window.addEventListener("blur",()=>{ji(),Si=null,Ht==="playing"&&Ys()});document.addEventListener("visibilitychange",()=>{document.hidden&&Ht==="playing"&&Ys()});window.addEventListener("resize",()=>Je?.resize());Mt("play").onclick=()=>Ji();Mt("restart-game-main").onclick=Rd;Mt("bark").onclick=()=>{performance.now()-ta>500&&ia()};Mt("pause").onclick=Ys;Mt("home").onclick=n=>{n.preventDefault(),Ys()};Mt("wallet").onclick=ra;Mt("sound").onclick=Td;Mt("dismiss-tip").onclick=Jl;Mt("toggle-tip").onclick=()=>{if(Ht==="playing"){if(!Mt("tip").classList.contains("hidden")){Jl();return}Dr=!1,Xs=!0,bn=0,Yl=un,Go(jl(Nt.index)[0]),Re("tip",!0),Mt("toggle-tip").setAttribute("aria-expanded","true"),Mt("toggle-tip").setAttribute("aria-label","Hide tips")}};let hc=0,Cd;function Pd(n){requestAnimationFrame(Pd);const t=Math.min((n-Ku)/1e3,.05);if(Ku=n,!Je||!Nt)return;if(Ht==="playing"){un+=t,Ed(In,t,Ko(re.upgrades,Nt.index+1).barkCharges);const i=wn.has("arrowright")||wn.has("d")?1:wn.has("arrowleft")||wn.has("a")?-1:Nn.x,s=wn.has("arrowdown")||wn.has("s")?1:wn.has("arrowup")||wn.has("w")?-1:Nn.z,r=Fv(Nt,Jn,{x:i,z:s,bark:In.burstRemaining>0},t,re.upgrades);Mt("saved").textContent=r.saved,Ad(r.countdownStarted,r.remaining);for(const o of r.events)o.type==="animalSaved"?De.play("saved"):o.type==="buddyBark"?(De.play("bark"),Je.bark(o)):o.type==="gateToggled"?ko(o.open?"Gate open — guide the flock through.":"Gate closed."):o.type==="gateBlocked"&&ko("Gate is occupied — let everyone clear it first.");if(Kl(),!Dr){const o=Xs||Nt.index!==0||bn>0?s1:5;if(un-Yl>=o){const a=jl(Nt.index);Xs?(bn=(bn+1)%a.length,Go(a[bn])):bn+1<a.length?(bn++,Go(a[bn])):Jl()}}r.justCompleted&&Ql()}else Ht==="complete"&&!document.hidden&&Nv(Nt,t);na(),Je.update(Nt,Jn,!document.hidden&&(Ht==="playing"||Ht==="intro"||Ht==="complete")?t:0,Ht==="intro"),Cd?.();const e=Je.nature?.weather||Nt.weather;if(e){const[i,s]={sun:["☀","Clear skies"],wind:["↝","Breezy"],rain:["☂","Light rain"],"heavy-rain":["☂","Heavy rain"],storm:["ϟ","Thunderstorm"]}[e.kind||e.type||e]||["☀","Clear skies"];Mt("weather-status").textContent=i,Mt("weather-status").setAttribute("title",s),Mt("weather-status").setAttribute("aria-label",s)}Ht==="playing"&&De.updateLivestock?.(t,{animals:Nt.animals,listener:Jn,level:Nt}),Ht==="playing"&&De.updateAmbience?.(t,{weather:Je.nature?.weather||Nt.weather||"sun",level:Nt.index+1,time:Nt.time,dog:Jn,animals:Nt.animals}),hc+=t,hc>.1&&(hc=0,Je.drawMap(Mt("map"),Nt,Jn))}try{Je=new t1(Mt("world")),Nt=vl(0),Jn={...Nt.dog,heading:Math.PI/2},Je.setLevel(Nt),Ri(),Re("loading",!1),requestAnimationFrame(Pd)}catch(n){Re("loading",!1),Re("error",!0),Mt("error-message").textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${n.message}`,console.error(n)}Bd(async()=>{const{installQA:n}=await import("./qa-BCQd2LNy.js");return{installQA:n}},__vite__mapDeps([0,1]),import.meta.url).then(({installQA:n})=>{const t=()=>{Ht="qa",ji(),De.pause(),yi(!1),Re("controls",!1)},e=async s=>{const r=Ji(s);t(),await r,t()},i=n({getRenderer:()=>Je,getMode:()=>Ht,getState:()=>({level:Nt,dog:Jn,profile:re,elapsed:un}),enterSession:async()=>{Bo||(Bo=!0,re=Ar(),await e(0))},pause:t,isPaused:()=>Ht==="qa",resume:()=>{if(Nt.completed){Ql(!1);return}Ht="playing",ji(),Re("controls",!0),De.resume()},jump:e,resetSession:async()=>{re=Ar(),Us=0,await e(0)},canOccupy:ae,updateWallet:Ri});Cd=()=>i.update()});export{ve as a};
