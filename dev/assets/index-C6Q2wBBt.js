const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qa-Dca3HaRw.js","./qa-DWlVkWAo.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const hd="modulepreload",ud=function(n,t){return new URL(n,t).href},Wl={},fd=function(t,e,i){let s=Promise.resolve();if(e&&e.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(h=>{if(h=ud(h,i),h in Wl)return;Wl[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(i)for(let x=o.length-1;x>=0;x--){const m=o[x];if(m.href===h&&(!u||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":hd,u||(d.as="script"),d.crossOrigin="",d.href=h,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((x,m)=>{d.addEventListener("load",x),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};function dd(n,t,e){if(!(e>0)||!Number.isFinite(e))return;const i=t.heading??Math.PI/2,s=Math.atan2(Math.sin(i-n.rotation.y),Math.cos(i-n.rotation.y)),r=t.type==="cow"?Math.PI/1.5:Math.PI,o=Math.max(-r*e,Math.min(r*e,s));n.rotation.y+=o,n.userData.turnSpeed=Math.abs(o)/e}function pd(n,t=0){return Math.max(Math.hypot(n.vx,n.vz),Math.min(2,t))}const Ya=Object.freeze([1,13/12,7/6,1.25]);function Ts(n){return n?.type!=="cow"||!Number.isFinite(n.scale)?1:Ya.reduce((t,e)=>Math.abs(e-n.scale)<Math.abs(t-n.scale)?e:t,1)}const Ae=n=>n?.type==="cow"?.78*Ts(n):.55,er=(n,t,e)=>Math.max(t,Math.min(e,n)),xe=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),Po=(n,t)=>{const e=Math.hypot(n,t);return e>1e-8?{x:n/e,z:t/e}:{x:0,z:0}};function si(n){let t=n>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function jc(n,t,e){const i=e.x-t.x,s=e.z-t.z,r=er(((n.x-t.x)*i+(n.z-t.z)*s)/(i*i+s*s||1),0,1);return{x:t.x+i*r,z:t.z+s*r,t:r}}function on(n,t,e){return xe(n,jc(n,t,e))}const an=n=>({x:Math.sin(n),z:Math.cos(n)});function Qc(n,t){const e=an(n.heading),i=t.x-n.x,s=t.z-n.z;return{forward:i*e.x+s*e.z,lateral:i*e.z-s*e.x}}function Ui(n,t,e){const i=an(n.heading);return{x:n.x+i.x*t+i.z*e,z:n.z+i.z*t-i.x*e}}function ln(n){const t=n.radius+1.4,e=t,i=an(n.heading),s={x:i.z,z:-i.x};return{x:n.x,z:n.z,heading:n.heading,halfLength:t,halfWidth:e,openingWidth:7,forward:i,side:s,corners:[[-t,-e],[t,-e],[t,e],[-t,e]].map(([r,o])=>Ui(n,r,o)),entrance:Ui(n,-t,0)}}function Sr(n,t,e=0){const i=ln(n),s=Qc(n,t),r=Math.max(0,e);return Math.abs(s.forward)<=i.halfLength-r&&Math.abs(s.lateral)<=i.halfWidth-r}function tl(n,t,e){const i=an(n.heading),s=t.x-n.x,r=t.z-n.z;return Math.abs(s*i.x+r*i.z)<=n.length/2+e&&Math.abs(s*i.z-r*i.x)<=n.width/2-e}const Xl=new WeakMap;function zu(n){let t=Xl.get(n);if(t)return t;const e=an(n.heading),i={x:e.z,z:-e.x},s=(c,l)=>({x:n.x+e.x*c+i.x*l,z:n.z+e.z*c+i.z*l}),r=[-1,1].map(c=>({a:s(-n.length/2-.1,c*n.width/2),b:s(n.length/2+.1,c*n.width/2),radius:.05,posts:Array.from({length:4},(l,h)=>s(-n.length/2+h*n.length/3,c*n.width/2))})),o=r.flatMap(c=>[c.a,c.b]),a={minX:Math.min(...o.map(c=>c.x)),maxX:Math.max(...o.map(c=>c.x)),minZ:Math.min(...o.map(c=>c.z)),maxZ:Math.max(...o.map(c=>c.z))};return t={rails:r,bounds:a},Xl.set(n,t),t}function md(n,t,e){const{rails:i,bounds:s}=zu(n),r=e+.065;return t.x<s.minX-r||t.x>s.maxX+r||t.z<s.minZ-r||t.z>s.maxZ+r?!1:i.some(o=>on(t,o.a,o.b)<e+o.radius||o.posts.some(a=>xe(t,a)<e+.065))}function Du(n,t,e,i){const{rails:s,bounds:r}=zu(n),o=i+.065;return Math.max(t.x,e.x)<r.minX-o||Math.min(t.x,e.x)>r.maxX+o||Math.max(t.z,e.z)<r.minZ-o||Math.min(t.z,e.z)>r.maxZ+o?!1:s.some(a=>Lu(t,e,a.a,a.b,i+a.radius)||a.posts.some(c=>on(c,t,e)<i+.065))}function gd(n,t,e=4){const i=n.points,s=i[0],r=i.at(-1),o=Math.abs(r.x-s.x)>Math.abs(r.z-s.z)?"x":"z",a=i[1][o]-s[o],c=Math.floor((t[o]-s[o])/a),l=Math.ceil(e/Math.abs(a))+2,h=[];for(let u=Math.max(0,c-l);u<Math.min(i.length-1,c+l+1);u++)h.push([i[u],i[u+1]]);return h}const ql=new WeakMap;function Iu(n){let t=ql.get(n);return t||(t={minX:Math.min(...n.points.map(e=>e.x)),maxX:Math.max(...n.points.map(e=>e.x)),minZ:Math.min(...n.points.map(e=>e.z)),maxZ:Math.max(...n.points.map(e=>e.z))},ql.set(n,t)),t}function el(n,t,e){const i=Iu(n),s=n.width/2+e;return t.x<i.minX-s||t.x>i.maxX+s||t.z<i.minZ-s||t.z>i.maxZ+s?!1:gd(n,t,s).some(([r,o])=>on(t,r,o)<s)}function xd(n,t,e,i){const s=Iu(n),r=n.width/2+i;return Math.max(t.x,e.x)>=s.minX-r&&Math.min(t.x,e.x)<=s.maxX+r&&Math.max(t.z,e.z)>=s.minZ-r&&Math.min(t.z,e.z)<=s.maxZ+r}function Lu(n,t,e,i,s){if(Math.max(n.x,t.x)<Math.min(e.x,i.x)-s||Math.min(n.x,t.x)>Math.max(e.x,i.x)+s||Math.max(n.z,t.z)<Math.min(e.z,i.z)-s||Math.min(n.z,t.z)>Math.max(e.z,i.z)+s)return!1;const r=(h,u,f)=>(u.x-h.x)*(f.z-h.z)-(u.z-h.z)*(f.x-h.x),o=r(n,t,e),a=r(n,t,i),c=r(e,i,n),l=r(e,i,t);return o*a<0&&c*l<0?!0:Math.min(on(n,e,i),on(t,e,i),on(e,n,t),on(i,n,t))<s}function nl(n){const t=an(n.heading),e=n.width/2;return{a:{x:n.x-t.z*e,z:n.z+t.x*e},b:{x:n.x+t.z*e,z:n.z-t.x*e},kind:"gate",material:n.material||"wood"}}const Uu=n=>n.material==="stone"?.3:.18;function Nu(n){return[...n.fenceSegments||[],...(n.gates||[]).filter(t=>t.operable&&!t.open).map(nl)]}function $a(n,t){const e=n.boundary;if(!e)return!0;let i=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const o=e[s],a=e[r];o.z>t.z!=a.z>t.z&&t.x<(a.x-o.x)*(t.z-o.z)/(a.z-o.z)+o.x&&(i=!i)}return i}function le(n,t,e,i=.55){const s={x:t,z:e},r=n.bounds;if(t<r.minX+i+.18||t>r.maxX-i-.18||e<r.minZ+i+.18||e>r.maxZ-i-.18||!$a(n,s))return!1;for(const o of Nu(n))if(on(s,o.a,o.b)<i+Uu(o))return!1;for(const o of n.rivers||[])if(o.bridges.some(c=>md(c,s,i))||el(o,s,i)&&!o.bridges.some(c=>tl(c,s,i)))return!1;for(const o of n.obstacles||[])if(xe(s,o)<i+o.radius)return!1;return!0}function nr(n,t,e,i,s=.55){const r=Math.max(1,Math.ceil(Math.hypot(e,i)/.25)),o=e/r,a=i/r;let c=!1,l=!1;for(let h=0;h<r;h++)le(n,t.x+o,t.z+a,s)?(t.x+=o,t.z+=a):(le(n,t.x+o,t.z,s)?t.x+=o:Math.abs(o)>1e-8&&(c=!0),le(n,t.x,t.z+a,s)?t.z+=a:Math.abs(a)>1e-8&&(l=!0));return{blockedX:c,blockedZ:l}}function Fu(n,t,e,i,s,r=!1){const o=n.bounds;for(const a of[t,e])if(a.x<o.minX+i+.18||a.x>o.maxX-i-.18||a.z<o.minZ+i+.18||a.z>o.maxZ-i-.18)return!1;if(!$a(n,t)||!$a(n,e))return!1;for(const a of Nu(n))if(!(r&&a.kind!=="boundary"&&a.kind!=="gate"&&a.material!=="stone"&&(a.kind!=="target"||n.target?.type!=="barn"))&&Lu(t,e,a.a,a.b,i+Uu(a)))return!1;for(const a of n.obstacles||[]){const c=i+a.radius;if(!(a.x<Math.min(t.x,e.x)-c||a.x>Math.max(t.x,e.x)+c||a.z<Math.min(t.z,e.z)-c||a.z>Math.max(t.z,e.z)+c)&&on(a,t,e)<c)return!1}for(const a of n.rivers||[]){if(s&&a.bridges.some(l=>Du(l,t,e,i)))return!1;if(!xd(a,t,e,i))continue;const c=Math.max(1,Math.ceil(xe(t,e)/.45));for(let l=0;l<=c;l++){const h={x:t.x+(e.x-t.x)*l/c,z:t.z+(e.z-t.z)*l/c};if(el(a,h,i)&&!a.bridges.some(u=>tl(u,h,i)))return!1}}return!0}function he(n,t,e,i=.55){return Fu(n,t,e,i,!0)}function _d(n,t,e){return Fu(n,t,e,.15,!1,!0)}function qn(n,t,e){for(const i of n?.rivers||[])for(const s of i.bridges)if(tl(s,{x:t,z:e},0)){const r=an(s.heading),o=(t-s.x)*r.x+(e-s.z)*r.z;return .18+.12*Math.sin(Math.PI*(o/s.length+.5))}return 0}function Md(n,t,e){const i=[n[0]];for(let s=1;s<n.length;s++){const r=n[s-1],o=n[s],a=xe(r,o),c=Math.max(1,Math.ceil(a/1.2)),l=Po(o.x-r.x,o.z-r.z),h=t()*Math.PI*2,u=r.kind==="bridge"||o.kind==="bridge"||r.kind==="gate"||o.kind==="gate"||o.kind==="target"?0:Math.min(1.8,a*.045),f=[];for(let x=1;x<=c;x++){const m=x/c,p=Math.sin(Math.PI*m)*Math.sin(Math.PI*2*m+h)*u;f.push({x:r.x+(o.x-r.x)*m-l.z*p,z:r.z+(o.z-r.z)*m+l.x*p,...x===c&&o.kind?{kind:o.kind}:{}})}const d=!e||f.every((x,m)=>he(e,m?f[m-1]:r,x,.85));for(let x=1;x<=c;x++){const m=x/c;i.push(d?f[x-1]:{x:r.x+(o.x-r.x)*m,z:r.z+(o.z-r.z)*m,...x===c&&o.kind?{kind:o.kind}:{}})}}return i}function vd(n){const t=[...new Set(n.flatMap(h=>[h.minX,h.maxX]))].sort((h,u)=>h-u),e=[...new Set(n.flatMap(h=>[h.minZ,h.maxZ]))].sort((h,u)=>h-u),i=new Set,s=(h,u)=>`${h},${u}`;for(let h=0;h<t.length-1;h++)for(let u=0;u<e.length-1;u++){const f=(t[h]+t[h+1])/2,d=(e[u]+e[u+1])/2;n.some(x=>f>x.minX&&f<x.maxX&&d>x.minZ&&d<x.maxZ)&&i.add(s(h,u))}const r=new Map,o=(h,u)=>r.set(s(h.x,h.z),u);for(let h=0;h<t.length-1;h++)for(let u=0;u<e.length-1;u++)if(i.has(s(h,u))){const f={x:t[h],z:e[u]},d={x:t[h+1],z:e[u]},x={x:t[h+1],z:e[u+1]},m={x:t[h],z:e[u+1]};i.has(s(h,u-1))||o(f,d),i.has(s(h+1,u))||o(d,x),i.has(s(h,u+1))||o(x,m),i.has(s(h-1,u))||o(m,f)}const a=r.keys().next().value,c=[];let l=a;do{const[h,u]=l.split(",").map(Number);c.push({x:h,z:u});const f=r.get(l);l=s(f.x,f.z)}while(l!==a&&c.length<=r.size);return c.filter((h,u)=>{const f=c[(u+c.length-1)%c.length],d=c[(u+1)%c.length];return Math.abs((h.x-f.x)*(d.z-h.z)-(h.z-f.z)*(d.x-h.x))>1e-8})}function yd(n,t,e,i,s){const r=si(t^1095912787),o=["L","U","Z","step"][Math.floor(r()*4)],a=r()<.5?-1:1,c=28+Math.min((n-39)*.12,6),l=i+18,h=s+105+(n-39)*.55,u=[{x:l,z:0},{x:l,z:a*h}];o==="U"&&u.push({x:e+65,z:a*h}),o==="Z"&&u.push({x:l+110+(n-39)*.4,z:a*h}),o==="step"&&u.push({x:l-100,z:a*h},{x:l-100,z:a*(h+105)});const f=[{minX:e,maxX:l+c,minZ:-s,maxZ:s}];for(let p=1;p<u.length;p++){const g=u[p-1],v=u[p];f.push({minX:Math.min(g.x,v.x)-c,maxX:Math.max(g.x,v.x)+c,minZ:Math.min(g.z,v.z)-c,maxZ:Math.max(g.z,v.z)+c})}const d=u.at(-2),x=u.at(-1),m=Po(x.x-d.x,x.z-d.z);return{kind:o,side:a,corners:u,boundary:vd(f),heading:Math.atan2(m.x,m.z),target:x,width:c}}function Ou(n=0,t=n*7919+42){n=er(Math.floor(Number(n)||0),0,99),t=Number(t)>>>0;const e=si(t^1129273171),i=si(t^1296126035),s=si(t),r=n<5,o=Math.min(5+n*3,65),a=n===1?9.4:r?4.1:4.8,c=r?0:18+er((o-30)*.4,0,14)+(o>30?.1:0),l=Math.max(0,n-19),h=r?15+n*3:n>=39?150+Math.min(n-39,40)*.3:48+n*3+c+l*.45,u=r?-32:-40,f=h+15,d=r?24:n>=39?84+Math.min(l*.1,8):84+Math.floor(n/15)*14+l*.3,x=n<19?0:(i()-.5)*Math.min(d*.7,24+l*.7),p=(r?n===0?0:t%2*2:t%4)*Math.PI/2,g=et=>({x:Number((et.x*Math.cos(p)-et.z*Math.sin(p)).toFixed(6)),z:Number((et.x*Math.sin(p)+et.z*Math.cos(p)).toFixed(6)),...et.kind?{kind:et.kind}:{}}),v=Math.PI/2-p,M=[{x:u,z:-d},{x:f,z:d},{x:u,z:d},{x:f,z:-d}].map(g),_={minX:Math.min(...M.map(et=>et.x)),maxX:Math.max(...M.map(et=>et.x)),minZ:Math.min(...M.map(et=>et.z)),maxZ:Math.max(...M.map(et=>et.z))};r||(_.minZ=Math.min(_.minZ,-d),_.maxZ=Math.max(_.maxZ,d));const S={...g({x:h,z:x}),radius:4.7+Math.sqrt(o)*.2,type:n%3===2?"barn":n%3===1?"field":"pen",heading:v},w=g({x:r?-20:-26,z:0}),A=g({x:r?-26:-33,z:0}),D=r?1:n<15?n%2===1?2:1:n%3===0?3:2,y=r?h-21:h-32,E=n===0?[]:r?[n===1?-10:-12]:n>=15?[y-c-48,y-c-23]:[y-c-23],I=n>=19&&si(t^1296384334)()<.55;I&&E.length>1&&(E[0]-=15);const F=E.map(et=>{const nt=s()*Math.PI*2;return{width:r?3.1:3.7+Math.min(n*.025,1.8),at:lt=>et+Math.sin(lt/(I?32:21)+nt)*(I?6:2.4)+Math.sin(lt/(I?12:8)+nt)*(I?1:.65)}}),k=F.map(et=>({width:et.width,points:Array.from({length:Math.ceil((d*2+64)/2)+1},(nt,lt)=>{const It=-d-32+lt*2;return{x:et.at(It),z:It}}),bridges:[]})),Z=[],O=[],z=s()>.5?1:-1;for(let et=0;et<D;et++){const nt=n>=39?32:32+Math.min(l*.32,24),lt=D===1?0:(et-(D-1)/2)*(r?12:nt),It=[{x:w.x*Math.cos(p)+w.z*Math.sin(p),z:0}];if(n===0)It.push({x:-8,z:2.8},{x:2,z:-2.2},{x:h-S.radius-3,z:0},{x:h,z:0,kind:"target"});else{if(F.forEach((R,b)=>{const V=r?n===1?0:z*5:lt+z*(b%2?-1:1)*(14+Math.min(l*(n>=39?.07:.22),n>=39?5:16)+s()*5),tt=k[b].points,J=er(Math.floor((V-tt[0].z)/2),0,tt.length-2),Y=tt[J],gt=tt[J+1],ot=(V-Y.z)/(gt.z-Y.z),xt=Y.x+(gt.x-Y.x)*ot,pt=Po(gt.z-Y.z,Y.x-gt.x),ht={x:xt,z:V,width:a*1.25,length:R.width+1.5,heading:Math.atan2(pt.x,pt.z)-p};k[b].bridges.push(ht);const _t=R.width/2+2.5+(r?3:I?10:6),Lt=r?_t:(xt-E[b]+_t)/pt.x,Ct=r?_t:(E[b]+_t-xt)/pt.x,Mt={x:xt-pt.x*Lt,z:V-pt.z*Lt},qt={x:xt+pt.x*Ct,z:V+pt.z*Ct};It.push({x:Mt.x-4,z:Mt.z-z*(r?3:8)},Mt,{x:xt,z:V,kind:"bridge"},qt)}),n>=2){const R=r?z*-4:lt-z*(13+s()*4),b={x:y,z:R,width:r?8:10,heading:v};Z.push(b),It.push({x:y-5,z:R},{x:y,z:R,kind:"gate"},{x:y+5,z:R})}const Xt=h-S.radius-4;It.push({x:Xt-7,z:r?z*3:x+lt*.3},{x:Xt,z:x},{x:h,z:x,kind:"target"})}O.push(It)}const C=n>=39?yd(n,t,u,h,d):null;C&&(Object.assign(S,g(C.target),{heading:C.heading-p}),O.forEach((et,nt)=>{const lt=et.findIndex(b=>b.kind==="gate"),It=lt>=0?et.slice(0,lt+2):et.slice(0,-3);It.push({x:C.corners[0].x-10,z:0},...C.corners.slice(0,-1));const Xt=C.target,R=an(C.heading);It.push({x:Xt.x-R.x*(S.radius+4),z:Xt.z-R.z*(S.radius+4)},{...Xt,kind:"target"}),O[nt]=It}));const P=k.map(et=>({width:et.width,points:et.points.map(g),bridges:et.bridges.map(nt=>({...nt,...g(nt)}))})),G=si(t^1398034254)()<.15,H=si(t^1195463749),N=n>=19&&H()<.65,$=N&&Z.length>1&&H()<.5?Math.floor(H()*Z.length):-1,rt=Z.map((et,nt)=>({...et,...g(et),id:`gate-${nt}`,operable:n>=19,open:n<19,material:G?"stone":"wood"})).filter((et,nt)=>n<19||N&&nt!==$);let mt=[{x:_.minX,z:_.minZ},{x:_.maxX,z:_.minZ},{x:_.maxX,z:_.maxZ},{x:_.minX,z:_.maxZ}],Et=-d,q=d;C&&(mt=C.boundary.map(g),_.minX=Math.min(...mt.map(et=>et.x)),_.maxX=Math.max(...mt.map(et=>et.x)),_.minZ=Math.min(...mt.map(et=>et.z)),_.maxZ=Math.max(...mt.map(et=>et.z)));const K=mt.map((et,nt)=>({a:et,b:mt[(nt+1)%mt.length],kind:"boundary"}));if(rt.length){const et=[...Z].sort((lt,It)=>lt.z-It.z);let nt=Et;for(const lt of et)K.push({a:g({x:y,z:nt}),b:g({x:y,z:lt.z-lt.width/2}),kind:"interior"}),nt=lt.z+lt.width/2;K.push({a:g({x:y,z:nt}),b:g({x:y,z:q}),kind:"interior"})}const st=ln(S),at=st.halfLength,ct=st.halfWidth,Ot=st.openingWidth/2,Gt=[[[-at,-ct],[at,-ct]],[[at,-ct],[at,ct]],[[at,ct],[-at,ct]],[[-at,ct],[-at,Ot]],[[-at,-Ot],[-at,-ct]]];for(const[et,nt]of Gt)K.push({a:Ui(S,...et),b:Ui(S,...nt),kind:"target"});for(const et of K)et.material=G&&et.kind!=="target"?"stone":"wood";const U={bounds:_,boundary:mt,rivers:P,fenceSegments:K,obstacles:[]},ie=O.map((et,nt)=>{const lt=Md(et.map(g),s,U);return{id:`route-${nt}`,points:lt,length:lt.slice(1).reduce((It,Xt,R)=>It+xe(Xt,lt[R]),0)}}),Ht=ie.map(et=>({routeId:et.id,points:et.points,width:a})),St={index:n,seed:t,title:["First day on the farm","Over the babbling brook","Through the garden gate","A mixed-up meadow","The long way home"][n]||`Pasture patrol ${n+1}`,description:n===0?"Move behind the sheep and gently guide all five into the sunny pen.":`Bring ${o} robots to the ${S.type}. ${D>1?"Choose a crossing and lead your flock through the meadow.":"Follow the winding trail and use the crossings."}`,bounds:_,boundary:mt,spawn:w,dog:A,target:S,startHeading:v,layoutKind:C?.kind||"field",riverStyle:I?"meandering":"gentle",animals:[],rivers:P,gates:rt,fences:[],fenceSegments:K,obstacles:[],routes:ie,roads:Ht,reward:80+n*25,sceneryHills:[]};for(let et=0;et<o;et++){const nt=g({x:(r?-20:-26)+Math.floor(et/7)*1.65+(s()-.5)*.2,z:(et%7-3)*1.65+(s()-.5)*.2}),lt=n>=3&&et%4===0?"cow":"sheep";St.animals.push({id:et,type:lt,...lt==="cow"?{scale:Ya[Math.floor(e()*Ya.length)]}:{},...nt,vx:0,vz:0,saved:!1})}if(St.animals.some(et=>!le(St,et.x,et.z,Ae(et)))){const et=an(v),nt=St.animals.map(lt=>({x:lt.x,z:lt.z}));for(let lt=1;lt<=7;lt++){const It=lt*.5,Xt=nt.map(R=>({x:R.x-et.x*It,z:R.z-et.z*It}));if(Xt.every((R,b)=>le(St,R.x,R.z,Ae(St.animals[b])))){Xt.forEach((R,b)=>Object.assign(St.animals[b],R));break}}}for(const et of St.animals){if(et.type!=="cow")continue;const nt=Ae(et),lt={x:et.x,z:et.z},It=R=>le(St,R.x,R.z,nt)&&St.animals.every(b=>b===et||xe(R,b)>=nt+Ae(b)+.01);if(It(lt))continue;let Xt=!1;for(let R=1;R<=40&&!Xt;R++)for(let b=0;b<24;b++){const V=b*Math.PI/12,tt={x:lt.x+Math.cos(V)*R*.1,z:lt.z+Math.sin(V)*R*.1};if(It(tt)){Object.assign(et,tt),Xt=!0;break}}}const At=(et,nt,lt)=>xe(et,w)<14||xe(et,S)<S.radius+10||!le(St,et.x,et.z,nt+1)||ie.some(It=>It.points.slice(1).some((Xt,R)=>on(et,It.points[R],Xt)<7+nt))?!1:(St.obstacles.push({...et,radius:nt,...lt===void 0?{}:{grove:lt}}),!0);for(let et=0;et<Math.min(10+n*2,130);et++){const nt=C?{x:_.minX+5+s()*(_.maxX-_.minX-10),z:_.minZ+5+s()*(_.maxZ-_.minZ-10)}:g({x:u+5+s()*(f-u-10),z:-d+5+s()*(d*2-10)}),lt=.7+s()*.7;At(nt,lt)}if(n>=59){const et=si(t^1196576598),nt=260;St.groves=[];for(let lt=0;lt<18&&St.obstacles.length<nt;lt++){const It=lt<12,Xt=It?g({x:-15+et()*Math.min(145,y+5),z:(lt%2?1:-1)*(24+et()*(d-38))}):{x:_.minX+10+et()*(_.maxX-_.minX-20),z:_.minZ+10+et()*(_.maxZ-_.minZ-20)};let R=0;for(let b=0;b<50&&R<10&&St.obstacles.length<nt;b++){const V=et()*Math.PI*2,tt=Math.sqrt(et())*10,J={x:Xt.x+Math.cos(V)*tt,z:Xt.z+Math.sin(V)*tt};At(J,.7+et()*.7,lt)&&R++}R&&St.groves.push({...Xt,id:lt,trees:R})}}for(let et=0;et<14;et++){const nt=7+s()*8,lt=3+s()*5,It=et%4,Xt=It===0?{x:_.minX-nt-3,z:_.minZ+s()*(_.maxZ-_.minZ)}:It===1?{x:_.maxX+nt+3,z:_.minZ+s()*(_.maxZ-_.minZ)}:It===2?{x:_.minX+s()*(_.maxX-_.minX),z:_.minZ-nt-3}:{x:_.minX+s()*(_.maxX-_.minX),z:_.maxZ+nt+3};St.sceneryHills.push({...Xt,radius:nt,height:lt})}return St}function Zl(n,t,e){let i=null;for(const s of n.routes||[]){if(e&&s.id!==e)continue;let r=0;for(let o=1;o<s.points.length;o++){const a=s.points[o-1],c=s.points[o],l=jc(t,a,c),h=xe(t,l),u=xe(a,c);(!i||h<i.distance)&&(i={route:s,routeId:s.id,index:o-1,point:l,distance:h,progress:r+u*l.t,length:s.length}),r+=u}}return i}function Bu(n,t){const e=n.target,i=ln(e).halfLength,{forward:s,lateral:r}=Qc(e,t),o=(a,c)=>Ui(e,a,c);return s>i+.4?o(i+2,Math.sign(r||1)*(i+2)):Math.abs(r)>i-.4&&s>-i-.8?o(-i-2,Math.sign(r||1)*(i+2)):s<-i+.7?o(-i+2,0):e}function Sd(n,t,e,i){if(he(n,t,e,i))return e;const s=Zl(n,t),r=Zl(n,e,s?.routeId);if(!s||!r)return e;const o=r.progress>=s.progress,a=s.route.points;if(s.distance>3&&he(n,t,s.point,i))return s.point;const c=o?Math.min(a.length-1,s.index+5):Math.max(0,s.index-4);for(let l=c;o?l>s.index:l<=s.index;l+=o?-1:1)if(he(n,t,a[l],i))return a[l];return s.point}function il(n,t,e,i=.62){if(he(n,t,e,i))return e;const s=Sd(n,t,e,i),r=(n.rivers||[]).flatMap(x=>x.bridges).filter(x=>xe(t,x)<x.length+x.width+8||Du(x,t,e,i)).sort((x,m)=>Math.min(xe(t,x),xe(e,x))-Math.min(xe(t,m),xe(e,m))).slice(0,2),o=n.target,a=o&&ln(o),c=a&&(xe(t,o)<a.halfLength*2+6||xe(e,o)<a.halfLength*2+6);if(!r.length&&!c)return s;const l=[t,e,s];for(const x of r){const m=an(x.heading),p=x.length/2+i+.4,g=x.width/2+i+.4;for(const[v,M]of[[-p,-g],[-p,g],[p,-g],[p,g],[-p,0],[p,0],[0,0]])l.push({x:x.x+m.x*v+m.z*M,z:x.z+m.z*v-m.x*M})}if(c){const x=a.halfLength+i+.5;for(const[m,p]of[[-x,-x],[-x,x],[x,-x],[x,x],[-x,0],[-a.halfLength+i+.5,0]])l.push(Ui(o,m,p))}const h=l.map(()=>1/0),u=[],f=new Set;h[0]=0;for(let x=0;x<l.length;x++){let m=-1;for(let p=0;p<l.length;p++)!f.has(p)&&(m<0||h[p]<h[m])&&(m=p);if(m<0||!Number.isFinite(h[m]))break;f.add(m);for(let p=1;p<l.length;p++){if(f.has(p)||!he(n,l[m],l[p],i))continue;const g=h[m]+xe(l[m],l[p]);g<h[p]&&(h[p]=g,u[p]=m)}}let d=Number.isFinite(h[1])?1:Number.isFinite(h[2])?2:-1;if(d<0)return s;for(;u[d]!==0&&u[d]!==void 0;)d=u[d];return l[d]}function wd(n,t,e,i,s=.78){const r=Math.hypot(e,i);if(r<.01)return{x:0,z:0};const o={x:t.x+e/r*2,z:t.z+i/r*2};if(he(n,t,o,s))return{x:0,z:0};let a=null,c=1/0;for(const x of n.rivers||[])if(el(x,t,3))for(const m of x.bridges){const p=xe(t,m);p<c&&(c=p,a=m)}const l=n.target,h=ln(l),u={...h.entrance,width:h.openingWidth,heading:l.heading,enclosure:!0};for(const x of[...(n.gates||[]).filter(m=>!m.operable||m.open),u]){const m=an(x.heading),p=t.x-x.x,g=t.z-x.z;Math.abs(p*m.x+g*m.z)<3&&xe(t,x)<c&&(c=xe(t,x),a=x)}if((n.fenceSegments||[]).some(x=>x.kind==="target"&&on(t,x.a,x.b)<s+2)&&(a=u),!a)return{x:0,z:0};if(a.length||a.enclosure){let x=a;if(a.length){const g=an(a.heading),v=(t.x-a.x)*g.x+(t.z-a.z)*g.z,M=(t.x-a.x)*g.z-(t.z-a.z)*g.x,_=Math.max(0,a.width/2-s-.35),S=er(M,-_,_),w=(Math.sign(v)||1)*a.length/2;x={x:a.x+g.x*w+g.z*S,z:a.z+g.z*w-g.x*S}}const m=il(n,t,x,s),p=Po(m.x-t.x,m.z-t.z);return{x:p.x*Math.min(2.4,r*.8+.5),z:p.z*Math.min(2.4,r*.8+.5)}}const f=an(a.heading),d=(a.x-t.x)*f.z-(a.z-t.z)*f.x;return Math.abs(d)<a.width/2-1?{x:0,z:0}:{x:f.z*Math.sign(d)*Math.min(2.4,r*.8+.5),z:-f.x*Math.sign(d)*Math.min(2.4,r*.8+.5)}}const Yl=new WeakMap,Yi=8;function bd(n,t){const e=n.roads||[];let i=Yl.get(n);if(!i||i.roads!==e){const s=new Map;for(const r of e)for(let o=1;o<r.points.length;o++){const a=r.points[o-1],c=r.points[o],l=r.width/2+.5;for(let h=Math.floor((Math.min(a.x,c.x)-l)/Yi);h<=Math.floor((Math.max(a.x,c.x)+l)/Yi);h++)for(let u=Math.floor((Math.min(a.z,c.z)-l)/Yi);u<=Math.floor((Math.max(a.z,c.z)+l)/Yi);u++){const f=`${h},${u}`,d=s.get(f)||[];d.push({a,b:c,radius:l}),s.set(f,d)}}i={roads:e,cells:s},Yl.set(n,i)}return i.cells.get(`${Math.floor(t.x/Yi)},${Math.floor(t.z/Yi)}`)||[]}function ku(n,t){if(n.target?.type==="barn"&&Sr(n.target,t))return!1;for(const e of n.rivers||[])for(const i of e.bridges||[]){const s=t.x-i.x,r=t.z-i.z,o=Math.sin(i.heading),a=Math.cos(i.heading);if(Math.abs(s*o+r*a)<=i.length/2+.2&&Math.abs(s*a-r*o)<=i.width/2+.2)return!1}for(const{a:e,b:i,radius:s}of bd(n,t))if(on(t,e,i)<=s)return!1;return le(n,t.x,t.z,0)}function Ed(n,t,e,i){if(!(i>0)||!Number.isFinite(i))return;const s=n.userData,r=Math.hypot(t.vx,t.vz)<.45&&(t.alert||0)<.03&&(s.turnSpeed||0)<.05&&!t.wander&&!t.bridgeCrossing,o=s.grazeAnchor,a=o&&Math.hypot(t.x-o.x,t.z-o.z)<=.75;if((!r||!a)&&(s.grazeAnchor={x:t.x,z:t.z},s.grazeWait=0),!r&&!(s.graze>0)){s.grazeWait=0,s.graze=0,s.grazeTime=(s.grazeTime||0)+i;return}const c=(t.type==="cow"?1.05:.65)*Ts(t),l={x:t.x+Math.sin(n.rotation.y)*c,z:t.z+Math.cos(n.rotation.y)*c},h=Math.sin(n.rotation.y),u=Math.cos(n.rotation.y),f=Ts(t),d=t.type==="cow",x=(d?.45:.3)*f,m=(d?.56:.36)*f,p=(d?-.59:-.36)*f,g=[-x,x].flatMap(_=>[p,m].map(S=>({x:t.x+u*_+h*S,z:t.z-h*_+u*S}))),v=[t,l,...g].every(_=>ku(e,_));s.grazeWait=v&&r?(s.grazeWait||0)+i:0;const M=s.grazeWait+1e-9>=7&&Math.hypot(t.vx,t.vz)<.1?1:0;s.graze=v?(s.graze||0)+Math.max(-i*4,Math.min(i*2,M-(s.graze||0))):0,s.grazeTime=(s.grazeTime||0)+i}function Td(n,t){return(n.graze||0)*(1.05+Math.sin((n.grazeTime||0)*3+t*1.7)*.02)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sl="180",Ad=0,$l=1,Rd=2,Gu=1,Hu=2,Wn=3,di=0,$e=1,Ce=2,li=0,ys=1,Kl=2,Jl=3,jl=4,Cd=5,Ti=100,Pd=101,zd=102,Dd=103,Id=104,Ld=200,Ud=201,Nd=202,Fd=203,Ka=204,Ja=205,Od=206,Bd=207,kd=208,Gd=209,Hd=210,Vd=211,Wd=212,Xd=213,qd=214,ja=0,Qa=1,tc=2,As=3,ec=4,nc=5,ic=6,sc=7,Vu=0,Zd=1,Yd=2,hi=0,$d=1,Kd=2,Jd=3,Wu=4,jd=5,Qd=6,tp=7,Xu=300,Rs=301,Cs=302,rc=303,oc=304,zo=306,$n=1e3,Ci=1001,ac=1002,cn=1003,ep=1004,Rr=1005,Sn=1006,Zo=1007,Pi=1008,Ln=1009,qu=1010,Zu=1011,lr=1012,rl=1013,Ni=1014,Cn=1015,wr=1016,ol=1017,al=1018,hr=1020,Yu=35902,$u=35899,Ku=1021,Ju=1022,wn=1023,ur=1026,fr=1027,cl=1028,ll=1029,ju=1030,hl=1031,ul=1033,co=33776,lo=33777,ho=33778,uo=33779,cc=35840,lc=35841,hc=35842,uc=35843,fc=36196,dc=37492,pc=37496,mc=37808,gc=37809,xc=37810,_c=37811,Mc=37812,vc=37813,yc=37814,Sc=37815,wc=37816,bc=37817,Ec=37818,Tc=37819,Ac=37820,Rc=37821,Cc=36492,Pc=36494,zc=36495,Dc=36283,Ic=36284,Lc=36285,Uc=36286,np=3200,ip=3201,Qu=0,sp=1,oi="",Ie="srgb",Ps="srgb-linear",go="linear",de="srgb",$i=7680,Ql=519,rp=512,op=513,ap=514,tf=515,cp=516,lp=517,hp=518,up=519,Nc=35044,xs=35048,th="300 es",Pn=2e3,xo=2001;class Us{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Oe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yo=Math.PI/180,Fc=180/Math.PI;function Zn(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Oe[n&255]+Oe[n>>8&255]+Oe[n>>16&255]+Oe[n>>24&255]+"-"+Oe[t&255]+Oe[t>>8&255]+"-"+Oe[t>>16&15|64]+Oe[t>>24&255]+"-"+Oe[e&63|128]+Oe[e>>8&255]+"-"+Oe[e>>16&255]+Oe[e>>24&255]+Oe[i&255]+Oe[i>>8&255]+Oe[i>>16&255]+Oe[i>>24&255]).toLowerCase()}function Jt(n,t,e){return Math.max(t,Math.min(e,n))}function fp(n,t){return(n%t+t)%t}function $o(n,t,e){return(1-e)*n+e*t}function Rn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function pe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Tt{constructor(t=0,e=0){Tt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const f=r[o+0],d=r[o+1],x=r[o+2],m=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=x,t[e+3]=m;return}if(u!==m||c!==f||l!==d||h!==x){let p=1-a;const g=c*f+l*d+h*x+u*m,v=g>=0?1:-1,M=1-g*g;if(M>Number.EPSILON){const S=Math.sqrt(M),w=Math.atan2(S,g*v);p=Math.sin(p*w)/S,a=Math.sin(a*w)/S}const _=a*v;if(c=c*p+f*_,l=l*p+d*_,h=h*p+x*_,u=u*p+m*_,p===1-a){const S=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=S,l*=S,h*=S,u*=S}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],d=r[o+2],x=r[o+3];return t[e]=a*x+h*u+c*d-l*f,t[e+1]=c*x+h*f+l*u-a*d,t[e+2]=l*x+h*d+a*f-c*u,t[e+3]=h*x-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),d=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*x,this._y=l*d*u-f*h*x,this._z=l*h*x+f*d*u,this._w=l*h*u-f*d*x;break;case"YXZ":this._x=f*h*u+l*d*x,this._y=l*d*u-f*h*x,this._z=l*h*x-f*d*u,this._w=l*h*u+f*d*x;break;case"ZXY":this._x=f*h*u-l*d*x,this._y=l*d*u+f*h*x,this._z=l*h*x+f*d*u,this._w=l*h*u-f*d*x;break;case"ZYX":this._x=f*h*u-l*d*x,this._y=l*d*u+f*h*x,this._z=l*h*x-f*d*u,this._w=l*h*u+f*d*x;break;case"YZX":this._x=f*h*u+l*d*x,this._y=l*d*u+f*h*x,this._z=l*h*x-f*d*u,this._w=l*h*u-f*d*x;break;case"XZY":this._x=f*h*u-l*d*x,this._y=l*d*u-f*h*x,this._z=l*h*x+f*d*u,this._w=l*h*u+f*d*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(i>a&&i>u){const d=2*Math.sqrt(1+i-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-i-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-i-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*i+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,i=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(eh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(eh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ko.copy(this).projectOnVector(t),this.sub(Ko)}reflect(t){return this.sub(Ko.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ko=new L,eh=new Kn;class jt{constructor(t,e,i,s,r,o,a,c,l){jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],d=i[5],x=i[8],m=s[0],p=s[3],g=s[6],v=s[1],M=s[4],_=s[7],S=s[2],w=s[5],A=s[8];return r[0]=o*m+a*v+c*S,r[3]=o*p+a*M+c*w,r[6]=o*g+a*_+c*A,r[1]=l*m+h*v+u*S,r[4]=l*p+h*M+u*w,r[7]=l*g+h*_+u*A,r[2]=f*m+d*v+x*S,r[5]=f*p+d*M+x*w,r[8]=f*g+d*_+x*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,x=e*u+i*f+s*d;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/x;return t[0]=u*m,t[1]=(s*l-h*i)*m,t[2]=(a*i-s*o)*m,t[3]=f*m,t[4]=(h*e-s*c)*m,t[5]=(s*r-a*e)*m,t[6]=d*m,t[7]=(i*c-l*e)*m,t[8]=(o*e-i*r)*m,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Jo.makeScale(t,e)),this}rotate(t){return this.premultiply(Jo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Jo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Jo=new jt;function ef(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function _o(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function dp(){const n=_o("canvas");return n.style.display="block",n}const nh={};function dr(n){n in nh||(nh[n]=!0,console.warn(n))}function pp(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const ih=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sh=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mp(){const n={enabled:!0,workingColorSpace:Ps,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===de&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===de&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===oi?go:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return dr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return dr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ps]:{primaries:t,whitePoint:i,transfer:go,toXYZ:ih,fromXYZ:sh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:i,transfer:de,toXYZ:ih,fromXYZ:sh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),n}const ce=mp();function Yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ki;class gp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Ki===void 0&&(Ki=_o("canvas")),Ki.width=t.width,Ki.height=t.height;const s=Ki.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Ki}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=_o("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Yn(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Yn(e[i]/255)*255):e[i]=Yn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xp=0;class fl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Zn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(jo(s[o].image)):r.push(jo(s[o]))}else r=jo(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function jo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?gp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _p=0;const Qo=new L;class Ge extends Us{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,i=Ci,s=Ci,r=Sn,o=Pi,a=wn,c=Ln,l=Ge.DEFAULT_ANISOTROPY,h=oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=Zn(),this.name="",this.source=new fl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qo).x}get height(){return this.source.getSize(Qo).y}get depth(){return this.source.getSize(Qo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $n:t.x=t.x-Math.floor(t.x);break;case Ci:t.x=t.x<0?0:1;break;case ac:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $n:t.y=t.y-Math.floor(t.y);break;case Ci:t.y=t.y<0?0:1;break;case ac:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=Xu;Ge.DEFAULT_ANISOTROPY=1;class Te{constructor(t=0,e=0,i=0,s=1){Te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],x=c[9],m=c[2],p=c[6],g=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-m)<.01&&Math.abs(x-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+m)<.1&&Math.abs(x+p)<.1&&Math.abs(l+d+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,_=(d+1)/2,S=(g+1)/2,w=(h+f)/4,A=(u+m)/4,D=(x+p)/4;return M>_&&M>S?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=w/i,r=A/i):_>S?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=w/s,r=D/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=A/r,s=D/r),this.set(i,s,r,e),this}let v=Math.sqrt((p-x)*(p-x)+(u-m)*(u-m)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(p-x)/v,this.y=(u-m)/v,this.z=(f-h)/v,this.w=Math.acos((l+d+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Jt(this.x,t.x,e.x),this.y=Jt(this.y,t.y,e.y),this.z=Jt(this.z,t.z,e.z),this.w=Jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Jt(this.x,t,e),this.y=Jt(this.y,t,e),this.z=Jt(this.z,t,e),this.w=Jt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mp extends Us{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);const s={width:t,height:e,depth:i.depth},r=new Ge(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new fl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fi extends Mp{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class nf extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vp extends Ge{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hi{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Cr.copy(i.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bs),Pr.subVectors(this.max,Bs),Ji.subVectors(t.a,Bs),ji.subVectors(t.b,Bs),Qi.subVectors(t.c,Bs),jn.subVectors(ji,Ji),Qn.subVectors(Qi,ji),_i.subVectors(Ji,Qi);let e=[0,-jn.z,jn.y,0,-Qn.z,Qn.y,0,-_i.z,_i.y,jn.z,0,-jn.x,Qn.z,0,-Qn.x,_i.z,0,-_i.x,-jn.y,jn.x,0,-Qn.y,Qn.x,0,-_i.y,_i.x,0];return!ta(e,Ji,ji,Qi,Pr)||(e=[1,0,0,0,1,0,0,0,1],!ta(e,Ji,ji,Qi,Pr))?!1:(zr.crossVectors(jn,Qn),e=[zr.x,zr.y,zr.z],ta(e,Ji,ji,Qi,Pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const On=[new L,new L,new L,new L,new L,new L,new L,new L],gn=new L,Cr=new Hi,Ji=new L,ji=new L,Qi=new L,jn=new L,Qn=new L,_i=new L,Bs=new L,Pr=new L,zr=new L,Mi=new L;function ta(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Mi.fromArray(n,r);const a=s.x*Math.abs(Mi.x)+s.y*Math.abs(Mi.y)+s.z*Math.abs(Mi.z),c=t.dot(Mi),l=e.dot(Mi),h=i.dot(Mi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const yp=new Hi,ks=new L,ea=new L;class mi{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):yp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ks.subVectors(t,this.center);const e=ks.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ks,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ea.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ks.copy(t.center).add(ea)),this.expandByPoint(ks.copy(t.center).sub(ea))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Bn=new L,na=new L,Dr=new L,ti=new L,ia=new L,Ir=new L,sa=new L;class sf{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){na.copy(t).add(e).multiplyScalar(.5),Dr.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(na);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Dr),a=ti.dot(this.direction),c=-ti.dot(Dr),l=ti.lengthSq(),h=Math.abs(1-o*o);let u,f,d,x;if(h>0)if(u=o*c-a,f=o*a-c,x=r*h,u>=0)if(f>=-x)if(f<=x){const m=1/h;u*=m,f*=m,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-x?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=x?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(na).addScaledVector(Dr,f),d}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const i=Bn.dot(this.direction),s=Bn.dot(Bn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,i,s,r){ia.subVectors(e,t),Ir.subVectors(i,t),sa.crossVectors(ia,Ir);let o=this.direction.dot(sa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,t);const c=a*this.direction.dot(Ir.crossVectors(ti,Ir));if(c<0)return null;const l=a*this.direction.dot(ia.cross(ti));if(l<0||c+l>o)return null;const h=-a*ti.dot(sa);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,i,s,r,o,a,c,l,h,u,f,d,x,m,p){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,h,u,f,d,x,m,p)}set(t,e,i,s,r,o,a,c,l,h,u,f,d,x,m,p){const g=this.elements;return g[0]=t,g[4]=e,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=c,g[2]=l,g[6]=h,g[10]=u,g[14]=f,g[3]=d,g[7]=x,g[11]=m,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/ts.setFromMatrixColumn(t,0).length(),r=1/ts.setFromMatrixColumn(t,1).length(),o=1/ts.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,x=a*h,m=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+x*l,e[5]=f-m*l,e[9]=-a*c,e[2]=m-f*l,e[6]=x+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,x=l*h,m=l*u;e[0]=f+m*a,e[4]=x*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-x,e[6]=m+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,x=l*h,m=l*u;e[0]=f-m*a,e[4]=-o*u,e[8]=x+d*a,e[1]=d+x*a,e[5]=o*h,e[9]=m-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,x=a*h,m=a*u;e[0]=c*h,e[4]=x*l-d,e[8]=f*l+m,e[1]=c*u,e[5]=m*l+f,e[9]=d*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,x=a*c,m=a*l;e[0]=c*h,e[4]=m-f*u,e[8]=x*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+x,e[10]=f-m*u}else if(t.order==="XZY"){const f=o*c,d=o*l,x=a*c,m=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+m,e[5]=o*h,e[9]=d*u-x,e[2]=x*u-d,e[6]=a*h,e[10]=m*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sp,t,wp)}lookAt(t,e,i){const s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),ei.crossVectors(i,je),ei.lengthSq()===0&&(Math.abs(i.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),ei.crossVectors(i,je)),ei.normalize(),Lr.crossVectors(je,ei),s[0]=ei.x,s[4]=Lr.x,s[8]=je.x,s[1]=ei.y,s[5]=Lr.y,s[9]=je.y,s[2]=ei.z,s[6]=Lr.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],d=i[13],x=i[2],m=i[6],p=i[10],g=i[14],v=i[3],M=i[7],_=i[11],S=i[15],w=s[0],A=s[4],D=s[8],y=s[12],E=s[1],I=s[5],F=s[9],k=s[13],Z=s[2],O=s[6],z=s[10],C=s[14],P=s[3],G=s[7],H=s[11],N=s[15];return r[0]=o*w+a*E+c*Z+l*P,r[4]=o*A+a*I+c*O+l*G,r[8]=o*D+a*F+c*z+l*H,r[12]=o*y+a*k+c*C+l*N,r[1]=h*w+u*E+f*Z+d*P,r[5]=h*A+u*I+f*O+d*G,r[9]=h*D+u*F+f*z+d*H,r[13]=h*y+u*k+f*C+d*N,r[2]=x*w+m*E+p*Z+g*P,r[6]=x*A+m*I+p*O+g*G,r[10]=x*D+m*F+p*z+g*H,r[14]=x*y+m*k+p*C+g*N,r[3]=v*w+M*E+_*Z+S*P,r[7]=v*A+M*I+_*O+S*G,r[11]=v*D+M*F+_*z+S*H,r[15]=v*y+M*k+_*C+S*N,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],x=t[3],m=t[7],p=t[11],g=t[15];return x*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*d-i*c*d)+m*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+p*(+e*l*u-e*a*d-r*o*u+i*o*d+r*a*h-i*l*h)+g*(-s*a*h-e*c*u+e*a*f+s*o*u-i*o*f+i*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],x=t[12],m=t[13],p=t[14],g=t[15],v=u*p*l-m*f*l+m*c*d-a*p*d-u*c*g+a*f*g,M=x*f*l-h*p*l-x*c*d+o*p*d+h*c*g-o*f*g,_=h*m*l-x*u*l+x*a*d-o*m*d-h*a*g+o*u*g,S=x*u*c-h*m*c-x*a*f+o*m*f+h*a*p-o*u*p,w=e*v+i*M+s*_+r*S;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return t[0]=v*A,t[1]=(m*f*r-u*p*r-m*s*d+i*p*d+u*s*g-i*f*g)*A,t[2]=(a*p*r-m*c*r+m*s*l-i*p*l-a*s*g+i*c*g)*A,t[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*d-i*c*d)*A,t[4]=M*A,t[5]=(h*p*r-x*f*r+x*s*d-e*p*d-h*s*g+e*f*g)*A,t[6]=(x*c*r-o*p*r-x*s*l+e*p*l+o*s*g-e*c*g)*A,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*A,t[8]=_*A,t[9]=(x*u*r-h*m*r-x*i*d+e*m*d+h*i*g-e*u*g)*A,t[10]=(o*m*r-x*a*r+x*i*l-e*m*l-o*i*g+e*a*g)*A,t[11]=(h*a*r-o*u*r-h*i*l+e*u*l+o*i*d-e*a*d)*A,t[12]=S*A,t[13]=(h*m*s-x*u*s+x*i*f-e*m*f-h*i*p+e*u*p)*A,t[14]=(x*a*s-o*m*s-x*i*c+e*m*c+o*i*p-e*a*p)*A,t[15]=(o*u*s-h*a*s+h*i*c-e*u*c-o*i*f+e*a*f)*A,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,x=r*u,m=o*h,p=o*u,g=a*u,v=c*l,M=c*h,_=c*u,S=i.x,w=i.y,A=i.z;return s[0]=(1-(m+g))*S,s[1]=(d+_)*S,s[2]=(x-M)*S,s[3]=0,s[4]=(d-_)*w,s[5]=(1-(f+g))*w,s[6]=(p+v)*w,s[7]=0,s[8]=(x+M)*A,s[9]=(p-v)*A,s[10]=(1-(f+m))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=ts.set(s[0],s[1],s[2]).length();const o=ts.set(s[4],s[5],s[6]).length(),a=ts.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],xn.copy(this);const l=1/r,h=1/o,u=1/a;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,e.setFromRotationMatrix(xn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Pn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(i-s),f=(e+t)/(e-t),d=(i+s)/(i-s);let x,m;if(c)x=r/(o-r),m=o*r/(o-r);else if(a===Pn)x=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===xo)x=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Pn,c=!1){const l=this.elements,h=2/(e-t),u=2/(i-s),f=-(e+t)/(e-t),d=-(i+s)/(i-s);let x,m;if(c)x=1/(o-r),m=o/(o-r);else if(a===Pn)x=-2/(o-r),m=-(o+r)/(o-r);else if(a===xo)x=-1/(o-r),m=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=x,l[14]=m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ts=new L,xn=new se,Sp=new L(0,0,0),wp=new L(1,1,1),ei=new L,Lr=new L,je=new L,rh=new se,oh=new Kn;class bn{constructor(t=0,e=0,i=0,s=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Jt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Jt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return rh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rh,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oh.setFromEuler(this),this.setFromQuaternion(oh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class rf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bp=0;const ah=new L,es=new Kn,kn=new se,Ur=new L,Gs=new L,Ep=new L,Tp=new Kn,ch=new L(1,0,0),lh=new L(0,1,0),hh=new L(0,0,1),uh={type:"added"},Ap={type:"removed"},ns={type:"childadded",child:null},ra={type:"childremoved",child:null};class we extends Us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Zn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new L,e=new bn,i=new Kn,s=new L(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new jt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.multiply(es),this}rotateOnWorldAxis(t,e){return es.setFromAxisAngle(t,e),this.quaternion.premultiply(es),this}rotateX(t){return this.rotateOnAxis(ch,t)}rotateY(t){return this.rotateOnAxis(lh,t)}rotateZ(t){return this.rotateOnAxis(hh,t)}translateOnAxis(t,e){return ah.copy(t).applyQuaternion(this.quaternion),this.position.add(ah.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ch,t)}translateY(t){return this.translateOnAxis(lh,t)}translateZ(t){return this.translateOnAxis(hh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ur.copy(t):Ur.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Gs,Ur,this.up):kn.lookAt(Ur,Gs,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),es.setFromRotationMatrix(kn),this.quaternion.premultiply(es.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(uh),ns.child=t,this.dispatchEvent(ns),ns.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ap),ra.child=t,this.dispatchEvent(ra),ra.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(uh),ns.child=t,this.dispatchEvent(ns),ns.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,t,Ep),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,Tp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),x=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}we.DEFAULT_UP=new L(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new L,Gn=new L,oa=new L,Hn=new L,is=new L,ss=new L,fh=new L,aa=new L,ca=new L,la=new L,ha=new Te,ua=new Te,fa=new Te;class rn{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),_n.subVectors(t,e),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){_n.subVectors(s,e),Gn.subVectors(i,e),oa.subVectors(t,e);const o=_n.dot(_n),a=_n.dot(Gn),c=_n.dot(oa),l=Gn.dot(Gn),h=Gn.dot(oa),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,x=(o*h-a*c)*f;return r.set(1-d-x,x,d)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Hn.x),c.addScaledVector(o,Hn.y),c.addScaledVector(a,Hn.z),c)}static getInterpolatedAttribute(t,e,i,s,r,o){return ha.setScalar(0),ua.setScalar(0),fa.setScalar(0),ha.fromBufferAttribute(t,e),ua.fromBufferAttribute(t,i),fa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ha,r.x),o.addScaledVector(ua,r.y),o.addScaledVector(fa,r.z),o}static isFrontFacing(t,e,i,s){return _n.subVectors(i,e),Gn.subVectors(t,e),_n.cross(Gn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),_n.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;is.subVectors(s,i),ss.subVectors(r,i),aa.subVectors(t,i);const c=is.dot(aa),l=ss.dot(aa);if(c<=0&&l<=0)return e.copy(i);ca.subVectors(t,s);const h=is.dot(ca),u=ss.dot(ca);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(is,o);la.subVectors(t,r);const d=is.dot(la),x=ss.dot(la);if(x>=0&&d<=x)return e.copy(r);const m=d*l-c*x;if(m<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(i).addScaledVector(ss,a);const p=h*x-d*u;if(p<=0&&u-h>=0&&d-x>=0)return fh.subVectors(r,s),a=(u-h)/(u-h+(d-x)),e.copy(s).addScaledVector(fh,a);const g=1/(p+m+f);return o=m*g,a=f*g,e.copy(i).addScaledVector(is,o).addScaledVector(ss,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function da(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Wt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=ce.workingColorSpace){return this.r=t,this.g=e,this.b=i,ce.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=ce.workingColorSpace){if(t=fp(t,1),e=Jt(e,0,1),i=Jt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=da(o,r,t+1/3),this.g=da(o,r,t),this.b=da(o,r,t-1/3)}return ce.colorSpaceToWorking(this,s),this}setStyle(t,e=Ie){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){const i=of[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this}copyLinearToSRGB(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return ce.workingToColorSpace(Be.copy(this),t),Math.round(Jt(Be.r*255,0,255))*65536+Math.round(Jt(Be.g*255,0,255))*256+Math.round(Jt(Be.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.workingToColorSpace(Be.copy(this),e);const i=Be.r,s=Be.g,r=Be.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.workingToColorSpace(Be.copy(this),e),t.r=Be.r,t.g=Be.g,t.b=Be.b,t}getStyle(t=Ie){ce.workingToColorSpace(Be.copy(this),t);const e=Be.r,i=Be.g,s=Be.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(Nr);const i=$o(ni.h,Nr.h,e),s=$o(ni.s,Nr.s,e),r=$o(ni.l,Nr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Be=new Wt;Wt.NAMES=of;let Rp=0;class Vi extends Us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=Zn(),this.name="",this.type="Material",this.blending=ys,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ka,this.blendDst=Ja,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=As,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ys&&(i.blending=this.blending),this.side!==di&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ka&&(i.blendSrc=this.blendSrc),this.blendDst!==Ja&&(i.blendDst=this.blendDst),this.blendEquation!==Ti&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==As&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ql&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class nn extends Vi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Vu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Re=new L,Fr=new Tt;let Cp=0;class He{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Cp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Nc,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Fr.fromBufferAttribute(this,e),Fr.applyMatrix3(t),this.setXY(e,Fr.x,Fr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Rn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=pe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Nc&&(t.usage=this.usage),t}}class af extends He{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class cf extends He{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class $t extends He{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Pp=0;const fn=new se,pa=new we,rs=new L,Qe=new Hi,Hs=new Hi,Ne=new L;class _e extends Us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=Zn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ef(t)?cf:af)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new jt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return fn.makeRotationFromQuaternion(t),this.applyMatrix4(fn),this}rotateX(t){return fn.makeRotationX(t),this.applyMatrix4(fn),this}rotateY(t){return fn.makeRotationY(t),this.applyMatrix4(fn),this}rotateZ(t){return fn.makeRotationZ(t),this.applyMatrix4(fn),this}translate(t,e,i){return fn.makeTranslation(t,e,i),this.applyMatrix4(fn),this}scale(t,e,i){return fn.makeScale(t,e,i),this.applyMatrix4(fn),this}lookAt(t){return pa.lookAt(t),pa.updateMatrix(),this.applyMatrix4(pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(rs).negate(),this.translate(rs.x,rs.y,rs.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const i=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Hs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(Qe.min,Hs.min),Qe.expandByPoint(Ne),Ne.addVectors(Qe.max,Hs.max),Qe.expandByPoint(Ne)):(Qe.expandByPoint(Hs.min),Qe.expandByPoint(Hs.max))}Qe.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ne.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ne));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ne.fromBufferAttribute(a,l),c&&(rs.fromBufferAttribute(t,l),Ne.add(rs)),s=Math.max(s,i.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new He(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<i.count;D++)a[D]=new L,c[D]=new L;const l=new L,h=new L,u=new L,f=new Tt,d=new Tt,x=new Tt,m=new L,p=new L;function g(D,y,E){l.fromBufferAttribute(i,D),h.fromBufferAttribute(i,y),u.fromBufferAttribute(i,E),f.fromBufferAttribute(r,D),d.fromBufferAttribute(r,y),x.fromBufferAttribute(r,E),h.sub(l),u.sub(l),d.sub(f),x.sub(f);const I=1/(d.x*x.y-x.x*d.y);isFinite(I)&&(m.copy(h).multiplyScalar(x.y).addScaledVector(u,-d.y).multiplyScalar(I),p.copy(u).multiplyScalar(d.x).addScaledVector(h,-x.x).multiplyScalar(I),a[D].add(m),a[y].add(m),a[E].add(m),c[D].add(p),c[y].add(p),c[E].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let D=0,y=v.length;D<y;++D){const E=v[D],I=E.start,F=E.count;for(let k=I,Z=I+F;k<Z;k+=3)g(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const M=new L,_=new L,S=new L,w=new L;function A(D){S.fromBufferAttribute(s,D),w.copy(S);const y=a[D];M.copy(y),M.sub(S.multiplyScalar(S.dot(y))).normalize(),_.crossVectors(w,y);const I=_.dot(c[D])<0?-1:1;o.setXYZW(D,M.x,M.y,M.z,I)}for(let D=0,y=v.length;D<y;++D){const E=v[D],I=E.start,F=E.count;for(let k=I,Z=I+F;k<Z;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){const x=t.getX(f+0),m=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,m),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),l.fromBufferAttribute(i,p),a.add(h),c.add(h),l.add(h),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(m,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,x=0;for(let m=0,p=c.length;m<p;m++){a.isInterleavedBufferAttribute?d=c[m]*a.data.stride+a.offset:d=c[m]*h;for(let g=0;g<h;g++)f[x++]=l[d++]}return new He(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,i);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,i);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dh=new se,vi=new sf,Or=new mi,ph=new L,Br=new L,kr=new L,Gr=new L,ma=new L,Hr=new L,mh=new L,Vr=new L;class ee extends we{constructor(t=new _e,e=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Hr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(ma.fromBufferAttribute(u,t),o?Hr.addScaledVector(ma,h):Hr.addScaledVector(ma.sub(e),h))}e.add(Hr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Or.copy(i.boundingSphere),Or.applyMatrix4(r),vi.copy(t.ray).recast(t.near),!(Or.containsPoint(vi.origin)===!1&&(vi.intersectSphere(Or,ph)===null||vi.origin.distanceToSquared(ph)>(t.far-t.near)**2))&&(dh.copy(r).invert(),vi.copy(t.ray).applyMatrix4(dh),!(i.boundingBox!==null&&vi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,vi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,m=f.length;x<m;x++){const p=f[x],g=o[p.materialIndex],v=Math.max(p.start,d.start),M=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let _=v,S=M;_<S;_+=3){const w=a.getX(_),A=a.getX(_+1),D=a.getX(_+2);s=Wr(this,g,t,i,l,h,u,w,A,D),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const x=Math.max(0,d.start),m=Math.min(a.count,d.start+d.count);for(let p=x,g=m;p<g;p+=3){const v=a.getX(p),M=a.getX(p+1),_=a.getX(p+2);s=Wr(this,o,t,i,l,h,u,v,M,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,m=f.length;x<m;x++){const p=f[x],g=o[p.materialIndex],v=Math.max(p.start,d.start),M=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let _=v,S=M;_<S;_+=3){const w=_,A=_+1,D=_+2;s=Wr(this,g,t,i,l,h,u,w,A,D),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const x=Math.max(0,d.start),m=Math.min(c.count,d.start+d.count);for(let p=x,g=m;p<g;p+=3){const v=p,M=p+1,_=p+2;s=Wr(this,o,t,i,l,h,u,v,M,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function zp(n,t,e,i,s,r,o,a){let c;if(t.side===$e?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===di,a),c===null)return null;Vr.copy(a),Vr.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Vr);return l<e.near||l>e.far?null:{distance:l,point:Vr.clone(),object:n}}function Wr(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Br),n.getVertexPosition(c,kr),n.getVertexPosition(l,Gr);const h=zp(n,t,e,i,Br,kr,Gr,mh);if(h){const u=new L;rn.getBarycoord(mh,Br,kr,Gr,u),s&&(h.uv=rn.getInterpolatedAttribute(s,a,c,l,u,new Tt)),r&&(h.uv1=rn.getInterpolatedAttribute(r,a,c,l,u,new Tt)),o&&(h.normal=rn.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new L,materialIndex:0};rn.getNormal(Br,kr,Gr,f.normal),h.face=f,h.barycoord=u}return h}class Dn extends _e{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;x("z","y","x",-1,-1,i,e,t,o,r,0),x("z","y","x",1,-1,i,e,-t,o,r,1),x("x","z","y",1,1,t,i,e,s,o,2),x("x","z","y",1,-1,t,i,-e,s,o,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(u,2));function x(m,p,g,v,M,_,S,w,A,D,y){const E=_/A,I=S/D,F=_/2,k=S/2,Z=w/2,O=A+1,z=D+1;let C=0,P=0;const G=new L;for(let H=0;H<z;H++){const N=H*I-k;for(let $=0;$<O;$++){const rt=$*E-F;G[m]=rt*v,G[p]=N*M,G[g]=Z,l.push(G.x,G.y,G.z),G[m]=0,G[p]=0,G[g]=w>0?1:-1,h.push(G.x,G.y,G.z),u.push($/A),u.push(1-H/D),C+=1}}for(let H=0;H<D;H++)for(let N=0;N<A;N++){const $=f+N+O*H,rt=f+N+O*(H+1),mt=f+(N+1)+O*(H+1),Et=f+(N+1)+O*H;c.push($,rt,Et),c.push(rt,mt,Et),P+=6}a.addGroup(d,P,y),d+=P,f+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function zs(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function qe(n){const t={};for(let e=0;e<n.length;e++){const i=zs(n[e]);for(const s in i)t[s]=i[s]}return t}function Dp(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function lf(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}const Ip={clone:zs,merge:qe};var Lp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Up=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends Vi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lp,this.fragmentShader=Up,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zs(t.uniforms),this.uniformsGroups=Dp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class hf extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new L,gh=new Tt,xh=new Tt;class yn extends hf{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Fc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Yo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fc*2*Math.atan(Math.tan(Yo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,gh,xh),e.subVectors(xh,gh)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Yo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const os=-90,as=1;class Np extends we{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yn(os,as,t,e);s.layers=this.layers,this.add(s);const r=new yn(os,as,t,e);r.layers=this.layers,this.add(r);const o=new yn(os,as,t,e);o.layers=this.layers,this.add(o);const a=new yn(os,as,t,e);a.layers=this.layers,this.add(a);const c=new yn(os,as,t,e);c.layers=this.layers,this.add(c);const l=new yn(os,as,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Pn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===xo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const m=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=m,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class uf extends Ge{constructor(t=[],e=Rs,i,s,r,o,a,c,l,h){super(t,e,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fp extends Fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new uf(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Dn(5,5,5),r=new pi({name:"CubemapFromEquirect",uniforms:zs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:$e,blending:li});r.uniforms.tEquirect.value=e;const o=new ee(s,r),a=e.minFilter;return e.minFilter===Pi&&(e.minFilter=Sn),new Np(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}class te extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Op={type:"move"};class ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const m of t.hand.values()){const p=e.getJointPose(m,i),g=this._getHandJoint(l,m);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,x=.005;l.inputState.pinching&&f>d+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Op)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new te;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class dl{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=i}clone(){return new dl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Bp extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class kp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Nc,this.updateRanges=[],this.version=0,this.uuid=Zn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xe=new L;class Mo{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=Rn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=pe(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Rn(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),i=pe(i,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new He(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Mo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ff extends Vi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let cs;const Vs=new L,ls=new L,hs=new L,us=new Tt,Ws=new Tt,df=new se,Xr=new L,Xs=new L,qr=new L,_h=new Tt,xa=new Tt,Mh=new Tt;class Gp extends we{constructor(t=new ff){if(super(),this.isSprite=!0,this.type="Sprite",cs===void 0){cs=new _e;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new kp(e,5);cs.setIndex([0,1,2,0,2,3]),cs.setAttribute("position",new Mo(i,3,0,!1)),cs.setAttribute("uv",new Mo(i,2,3,!1))}this.geometry=cs,this.material=t,this.center=new Tt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ls.setFromMatrixScale(this.matrixWorld),df.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),hs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ls.multiplyScalar(-hs.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Zr(Xr.set(-.5,-.5,0),hs,o,ls,s,r),Zr(Xs.set(.5,-.5,0),hs,o,ls,s,r),Zr(qr.set(.5,.5,0),hs,o,ls,s,r),_h.set(0,0),xa.set(1,0),Mh.set(1,1);let a=t.ray.intersectTriangle(Xr,Xs,qr,!1,Vs);if(a===null&&(Zr(Xs.set(-.5,.5,0),hs,o,ls,s,r),xa.set(0,1),a=t.ray.intersectTriangle(Xr,qr,Xs,!1,Vs),a===null))return;const c=t.ray.origin.distanceTo(Vs);c<t.near||c>t.far||e.push({distance:c,point:Vs.clone(),uv:rn.getInterpolation(Vs,Xr,Xs,qr,_h,xa,Mh,new Tt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Zr(n,t,e,i,s,r){us.subVectors(n,e).addScalar(.5).multiply(i),s!==void 0?(Ws.x=r*us.x-s*us.y,Ws.y=s*us.x+r*us.y):Ws.copy(us),n.copy(t),n.x+=Ws.x,n.y+=Ws.y,n.applyMatrix4(df)}class pf extends Ge{constructor(t=null,e=1,i=1,s,r,o,a,c,l=cn,h=cn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oc extends He{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const fs=new se,vh=new se,Yr=[],yh=new Hi,Hp=new se,qs=new ee,Zs=new mi;class ai extends ee{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Oc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Hp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Hi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,fs),yh.copy(t.boundingBox).applyMatrix4(fs),this.boundingBox.union(yh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,fs),Zs.copy(t.boundingSphere).applyMatrix4(fs),this.boundingSphere.union(Zs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=t*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(qs.geometry=this.geometry,qs.material=this.material,qs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zs.copy(this.boundingSphere),Zs.applyMatrix4(i),t.ray.intersectsSphere(Zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,fs),vh.multiplyMatrices(i,fs),qs.matrixWorld=vh,qs.raycast(t,Yr);for(let o=0,a=Yr.length;o<a;o++){const c=Yr[o];c.instanceId=r,c.object=this,e.push(c)}Yr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Oc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new pf(new Float32Array(s*this.count),s,this.count,cl,Cn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<i.length;l++)o+=i[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const _a=new L,Vp=new L,Wp=new jt;class ri{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=_a.subVectors(i,e).cross(Vp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(_a),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Wp.getNormalMatrix(t),s=this.coplanarPoint(_a).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new mi,Xp=new Tt(.5,.5),$r=new L;class Do{constructor(t=new ri,e=new ri,i=new ri,s=new ri,r=new ri,o=new ri){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Pn,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],x=r[8],m=r[9],p=r[10],g=r[11],v=r[12],M=r[13],_=r[14],S=r[15];if(s[0].setComponents(l-o,d-h,g-x,S-v).normalize(),s[1].setComponents(l+o,d+h,g+x,S+v).normalize(),s[2].setComponents(l+a,d+u,g+m,S+M).normalize(),s[3].setComponents(l-a,d-u,g-m,S-M).normalize(),i)s[4].setComponents(c,f,p,_).normalize(),s[5].setComponents(l-c,d-f,g-p,S-_).normalize();else if(s[4].setComponents(l-c,d-f,g-p,S-_).normalize(),e===Pn)s[5].setComponents(l+c,d+f,g+p,S+_).normalize();else if(e===xo)s[5].setComponents(c,f,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){yi.center.set(0,0,0);const e=Xp.distanceTo(t.center);return yi.radius=.7071067811865476+e,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if($r.x=s.normal.x>0?t.max.x:t.min.x,$r.y=s.normal.y>0?t.max.y:t.min.y,$r.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class mf extends Vi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Wt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const vo=new L,yo=new L,Sh=new se,Ys=new sf,Kr=new mi,Ma=new L,wh=new L;class qp extends we{constructor(t=new _e,e=new mf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)vo.fromBufferAttribute(e,s-1),yo.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=vo.distanceTo(yo);t.setAttribute("lineDistance",new $t(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Kr.copy(i.boundingSphere),Kr.applyMatrix4(s),Kr.radius+=r,t.ray.intersectsSphere(Kr)===!1)return;Sh.copy(s).invert(),Ys.copy(t.ray).applyMatrix4(Sh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const d=Math.max(0,o.start),x=Math.min(h.count,o.start+o.count);for(let m=d,p=x-1;m<p;m+=l){const g=h.getX(m),v=h.getX(m+1),M=Jr(this,t,Ys,c,g,v,m);M&&e.push(M)}if(this.isLineLoop){const m=h.getX(x-1),p=h.getX(d),g=Jr(this,t,Ys,c,m,p,x-1);g&&e.push(g)}}else{const d=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let m=d,p=x-1;m<p;m+=l){const g=Jr(this,t,Ys,c,m,m+1,m);g&&e.push(g)}if(this.isLineLoop){const m=Jr(this,t,Ys,c,x-1,d,x-1);m&&e.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Jr(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(vo.fromBufferAttribute(a,s),yo.fromBufferAttribute(a,r),e.distanceSqToSegment(vo,yo,Ma,wh)>i)return;Ma.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Ma);if(!(l<t.near||l>t.far))return{distance:l,point:wh.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const bh=new L,Eh=new L;class Zp extends qp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)bh.fromBufferAttribute(e,s),Eh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+bh.distanceTo(Eh);t.setAttribute("lineDistance",new $t(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wi extends Ge{constructor(t,e,i,s,r,o,a,c,l){super(t,e,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gf extends Ge{constructor(t,e,i=Ni,s,r,o,a=cn,c=cn,l,h=ur,u=1){if(h!==ur&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new fl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class xf extends Ge{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class pl extends _e{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new L,h=new Tt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=i+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new $t(o,3)),this.setAttribute("normal",new $t(a,3)),this.setAttribute("uv",new $t(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Xi extends _e{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let x=0;const m=[],p=i/2;let g=0;v(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new $t(u,3)),this.setAttribute("normal",new $t(f,3)),this.setAttribute("uv",new $t(d,2));function v(){const _=new L,S=new L;let w=0;const A=(e-t)/i;for(let D=0;D<=r;D++){const y=[],E=D/r,I=E*(e-t)+t;for(let F=0;F<=s;F++){const k=F/s,Z=k*c+a,O=Math.sin(Z),z=Math.cos(Z);S.x=I*O,S.y=-E*i+p,S.z=I*z,u.push(S.x,S.y,S.z),_.set(O,A,z).normalize(),f.push(_.x,_.y,_.z),d.push(k,1-E),y.push(x++)}m.push(y)}for(let D=0;D<s;D++)for(let y=0;y<r;y++){const E=m[y][D],I=m[y+1][D],F=m[y+1][D+1],k=m[y][D+1];(t>0||y!==0)&&(h.push(E,I,k),w+=3),(e>0||y!==r-1)&&(h.push(I,F,k),w+=3)}l.addGroup(g,w,0),g+=w}function M(_){const S=x,w=new Tt,A=new L;let D=0;const y=_===!0?t:e,E=_===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,p*E,0),f.push(0,E,0),d.push(.5,.5),x++;const I=x;for(let F=0;F<=s;F++){const Z=F/s*c+a,O=Math.cos(Z),z=Math.sin(Z);A.x=y*z,A.y=p*E,A.z=y*O,u.push(A.x,A.y,A.z),f.push(0,E,0),w.x=O*.5+.5,w.y=z*.5*E+.5,d.push(w.x,w.y),x++}for(let F=0;F<s;F++){const k=S+F,Z=I+F;_===!0?h.push(Z,Z+1,k):h.push(Z+1,Z,k),D+=3}l.addGroup(g,D,_===!0?1:2),g+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pr extends Xi{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new pr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);const h=i[s],f=i[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Tt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new L,s=[],r=[],o=[],a=new L,c=new se;for(let d=0;d<=t;d++){const x=d/t;s[d]=this.getTangentAt(x,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(Jt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,x))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Jt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let x=1;x<=t;x++)r[x].applyMatrix4(c.makeRotationAxis(s[x],d*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ml extends Nn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Tt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Yp extends ml{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function gl(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const jr=new L,va=new gl,ya=new gl,Sa=new gl;class $p extends Nn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new L){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(jr.subVectors(s[0],s[1]).add(s[0]),l=jr);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(jr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=jr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(u),d),m=Math.pow(u.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(h),d);m<1e-4&&(m=1),x<1e-4&&(x=m),p<1e-4&&(p=m),va.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,x,m,p),ya.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,x,m,p),Sa.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,x,m,p)}else this.curveType==="catmullrom"&&(va.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),ya.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Sa.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(va.calc(c),ya.calc(c),Sa.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Th(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function Kp(n,t){const e=1-n;return e*e*t}function Jp(n,t){return 2*(1-n)*n*t}function jp(n,t){return n*n*t}function ir(n,t,e,i){return Kp(n,t)+Jp(n,e)+jp(n,i)}function Qp(n,t){const e=1-n;return e*e*e*t}function tm(n,t){const e=1-n;return 3*e*e*n*t}function em(n,t){return 3*(1-n)*n*n*t}function nm(n,t){return n*n*n*t}function sr(n,t,e,i,s){return Qp(n,t)+tm(n,e)+em(n,i)+nm(n,s)}class _f extends Nn{constructor(t=new Tt,e=new Tt,i=new Tt,s=new Tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Tt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(sr(t,s.x,r.x,o.x,a.x),sr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class im extends Nn{constructor(t=new L,e=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new L){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(sr(t,s.x,r.x,o.x,a.x),sr(t,s.y,r.y,o.y,a.y),sr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Mf extends Nn{constructor(t=new Tt,e=new Tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Tt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sm extends Nn{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class vf extends Nn{constructor(t=new Tt,e=new Tt,i=new Tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Tt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ir(t,s.x,r.x,o.x),ir(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rm extends Nn{constructor(t=new L,e=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new L){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ir(t,s.x,r.x,o.x),ir(t,s.y,r.y,o.y),ir(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yf extends Nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Tt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Th(a,c.x,l.x,h.x,u.x),Th(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new Tt().fromArray(s))}return this}}var Ah=Object.freeze({__proto__:null,ArcCurve:Yp,CatmullRomCurve3:$p,CubicBezierCurve:_f,CubicBezierCurve3:im,EllipseCurve:ml,LineCurve:Mf,LineCurve3:sm,QuadraticBezierCurve:vf,QuadraticBezierCurve3:rm,SplineCurve:yf});class om extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ah[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Ah[s.type]().fromJSON(s))}return this}}class Rh extends om{constructor(t){super(),this.type="Path",this.currentPoint=new Tt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Mf(this.currentPoint.clone(),new Tt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new vf(this.currentPoint.clone(),new Tt(t,e),new Tt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new _f(this.currentPoint.clone(),new Tt(t,e),new Tt(i,s),new Tt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new yf(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){const l=new ml(t,e,i,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Bc extends Rh{constructor(t){super(t),this.uuid=Zn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Rh().fromJSON(s))}return this}}function am(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=Sf(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(i&&(r=fm(n,t,r,e)),n.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){const d=n[f],x=n[f+1];d<a&&(a=d),x<c&&(c=x),d>h&&(h=d),x>u&&(u=x)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return mr(r,o,e,a,c,l,0),o}function Sf(n,t,e,i,s){let r;if(s===wm(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=Ch(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=Ch(o/i|0,n[o],n[o+1],r);return r&&Ds(r,r.next)&&(xr(r),r=r.next),r}function Oi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Ds(e,e.next)||Se(e.prev,e,e.next)===0)){if(xr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function mr(n,t,e,i,s,r,o){if(!n)return;!o&&r&&xm(n,i,s,r);let a=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(r?lm(n,i,s,r):cm(n)){t.push(c.i,n.i,l.i),xr(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=hm(Oi(n),t),mr(n,t,e,i,s,r,2)):o===2&&um(n,t,e,i,s,r):mr(Oi(n),t,e,i,s,r,1);break}}}function cm(n){const t=n.prev,e=n,i=n.next;if(Se(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l);let x=i.next;for(;x!==t;){if(x.x>=h&&x.x<=f&&x.y>=u&&x.y<=d&&Js(s,a,r,c,o,l,x.x,x.y)&&Se(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function lm(n,t,e,i){const s=n.prev,r=n,o=n.next;if(Se(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),x=Math.min(h,u,f),m=Math.max(a,c,l),p=Math.max(h,u,f),g=kc(d,x,t,e,i),v=kc(m,p,t,e,i);let M=n.prevZ,_=n.nextZ;for(;M&&M.z>=g&&_&&_.z<=v;){if(M.x>=d&&M.x<=m&&M.y>=x&&M.y<=p&&M!==s&&M!==o&&Js(a,h,c,u,l,f,M.x,M.y)&&Se(M.prev,M,M.next)>=0||(M=M.prevZ,_.x>=d&&_.x<=m&&_.y>=x&&_.y<=p&&_!==s&&_!==o&&Js(a,h,c,u,l,f,_.x,_.y)&&Se(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;M&&M.z>=g;){if(M.x>=d&&M.x<=m&&M.y>=x&&M.y<=p&&M!==s&&M!==o&&Js(a,h,c,u,l,f,M.x,M.y)&&Se(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;_&&_.z<=v;){if(_.x>=d&&_.x<=m&&_.y>=x&&_.y<=p&&_!==s&&_!==o&&Js(a,h,c,u,l,f,_.x,_.y)&&Se(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function hm(n,t){let e=n;do{const i=e.prev,s=e.next.next;!Ds(i,s)&&bf(i,e,e.next,s)&&gr(i,s)&&gr(s,i)&&(t.push(i.i,e.i,s.i),xr(e),xr(e.next),e=n=s),e=e.next}while(e!==n);return Oi(e)}function um(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&vm(o,a)){let c=Ef(o,a);o=Oi(o,o.next),c=Oi(c,c.next),mr(o,t,e,i,s,r,0),mr(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function fm(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=Sf(n,a,c,i,!1);l===l.next&&(l.steiner=!0),s.push(Mm(l))}s.sort(dm);for(let r=0;r<s.length;r++)e=pm(s[r],e);return e}function dm(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function pm(n,t){const e=mm(n,t);if(!e)return t;const i=Ef(e,n);return Oi(i,i.next),Oi(e,e.next)}function mm(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(Ds(n,e))return e;do{if(Ds(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=i&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(i>=e.x&&e.x>=c&&i!==e.x&&wf(s<l?i:r,s,c,l,s<l?r:i,s,e.x,e.y)){const u=Math.abs(s-e.y)/(i-e.x);gr(e,n)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&gm(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function gm(n,t){return Se(n.prev,n,t.prev)<0&&Se(t.next,n,n.next)<0}function xm(n,t,e,i){let s=n;do s.z===0&&(s.z=kc(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,_m(s)}function _m(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function kc(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Mm(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function wf(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function Js(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&wf(n,t,e,i,s,r,o,a)}function vm(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!ym(n,t)&&(gr(n,t)&&gr(t,n)&&Sm(n,t)&&(Se(n.prev,n,t.prev)||Se(n,t.prev,t))||Ds(n,t)&&Se(n.prev,n,n.next)>0&&Se(t.prev,t,t.next)>0)}function Se(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Ds(n,t){return n.x===t.x&&n.y===t.y}function bf(n,t,e,i){const s=to(Se(n,t,e)),r=to(Se(n,t,i)),o=to(Se(e,i,n)),a=to(Se(e,i,t));return!!(s!==r&&o!==a||s===0&&Qr(n,e,t)||r===0&&Qr(n,i,t)||o===0&&Qr(e,n,i)||a===0&&Qr(e,t,i))}function Qr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function to(n){return n>0?1:n<0?-1:0}function ym(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&bf(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function gr(n,t){return Se(n.prev,n,n.next)<0?Se(n,t,n.next)>=0&&Se(n,n.prev,t)>=0:Se(n,t,n.prev)<0||Se(n,n.next,t)<0}function Sm(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Ef(n,t){const e=Gc(n.i,n.x,n.y),i=Gc(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Ch(n,t,e,i){const s=Gc(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function xr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Gc(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function wm(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class bm{static triangulate(t,e,i=2){return am(t,e,i)}}class rr{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return rr.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Ph(t),zh(i,t);let o=t.length;e.forEach(Ph);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,zh(i,e[c]);const a=bm.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Ph(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function zh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class br extends _e{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],x=[],m=[],p=[];for(let g=0;g<h;g++){const v=g*f-o;for(let M=0;M<l;M++){const _=M*u-r;x.push(_,-v,0),m.push(0,0,1),p.push(M/a),p.push(1-g/c)}}for(let g=0;g<c;g++)for(let v=0;v<a;v++){const M=v+l*g,_=v+l*(g+1),S=v+1+l*(g+1),w=v+1+l*g;d.push(M,_,w),d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new $t(x,3)),this.setAttribute("normal",new $t(m,3)),this.setAttribute("uv",new $t(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new br(t.width,t.height,t.widthSegments,t.heightSegments)}}class xl extends _e{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,d=new L,x=new Tt;for(let m=0;m<=s;m++){for(let p=0;p<=i;p++){const g=r+p/i*o;d.x=u*Math.cos(g),d.y=u*Math.sin(g),c.push(d.x,d.y,d.z),l.push(0,0,1),x.x=(d.x/e+1)/2,x.y=(d.y/e+1)/2,h.push(x.x,x.y)}u+=f}for(let m=0;m<s;m++){const p=m*(i+1);for(let g=0;g<i;g++){const v=g+p,M=v,_=v+i+1,S=v+i+2,w=v+1;a.push(M,_,w),a.push(_,S,w)}}this.setIndex(a),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(l,3)),this.setAttribute("uv",new $t(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xl(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class So extends _e{constructor(t=new Bc([new Tt(0,.5),new Tt(-.5,-.5),new Tt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new $t(s,3)),this.setAttribute("normal",new $t(r,3)),this.setAttribute("uv",new $t(o,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let d=f.shape;const x=f.holes;rr.isClockWise(d)===!1&&(d=d.reverse());for(let p=0,g=x.length;p<g;p++){const v=x[p];rr.isClockWise(v)===!0&&(x[p]=v.reverse())}const m=rr.triangulateShape(d,x);for(let p=0,g=x.length;p<g;p++){const v=x[p];d=d.concat(v)}for(let p=0,g=d.length;p<g;p++){const v=d[p];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let p=0,g=m.length;p<g;p++){const v=m[p],M=v[0]+u,_=v[1]+u,S=v[2]+u;i.push(M,_,S),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Em(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new So(i,t.curveSegments)}}function Em(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Bi extends _e{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new L,f=new L,d=[],x=[],m=[],p=[];for(let g=0;g<=i;g++){const v=[],M=g/i;let _=0;g===0&&o===0?_=.5/e:g===i&&c===Math.PI&&(_=-.5/e);for(let S=0;S<=e;S++){const w=S/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+M*a),x.push(u.x,u.y,u.z),f.copy(u).normalize(),m.push(f.x,f.y,f.z),p.push(w+_,1-M),v.push(l++)}h.push(v)}for(let g=0;g<i;g++)for(let v=0;v<e;v++){const M=h[g][v+1],_=h[g][v],S=h[g+1][v],w=h[g+1][v+1];(g!==0||o>0)&&d.push(M,_,w),(g!==i-1||c<Math.PI)&&d.push(_,S,w)}this.setIndex(d),this.setAttribute("position",new $t(x,3)),this.setAttribute("normal",new $t(m,3)),this.setAttribute("uv",new $t(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Io extends _e{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new L,u=new L,f=new L;for(let d=0;d<=i;d++)for(let x=0;x<=s;x++){const m=x/s*r,p=d/i*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(m),u.y=(t+e*Math.cos(p))*Math.sin(m),u.z=e*Math.sin(p),a.push(u.x,u.y,u.z),h.x=t*Math.cos(m),h.y=t*Math.sin(m),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(x/s),l.push(d/i)}for(let d=1;d<=i;d++)for(let x=1;x<=s;x++){const m=(s+1)*d+x-1,p=(s+1)*(d-1)+x-1,g=(s+1)*(d-1)+x,v=(s+1)*d+x;o.push(m,p,v),o.push(p,g,v)}this.setIndex(o),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Io(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class re extends Vi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Wt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qu,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Tm extends Vi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Am extends Vi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Tf extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Rm extends Tf{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const wa=new se,Dh=new L,Ih=new L;class Cm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Do,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Dh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dh),Ih.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ih),e.updateMatrixWorld(),wa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Lo extends hf{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Pm extends Cm{constructor(){super(new Lo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zm extends Tf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new Pm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Dm extends yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Lh=new L,eo=new L,ds=new L,ps=new L,ba=new L,Im=new L,Lm=new L;class Um{constructor(t=new L,e=new L){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Lh.subVectors(t,this.start),eo.subVectors(this.end,this.start);const i=eo.dot(eo);let r=eo.dot(Lh)/i;return e&&(r=Jt(r,0,1)),r}closestPointToPoint(t,e,i){const s=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=Im,i=Lm){const s=10000000000000001e-32;let r,o;const a=this.start,c=t.start,l=this.end,h=t.end;ds.subVectors(l,a),ps.subVectors(h,c),ba.subVectors(a,c);const u=ds.dot(ds),f=ps.dot(ps),d=ps.dot(ba);if(u<=s&&f<=s)return e.copy(a),i.copy(c),e.sub(i),e.dot(e);if(u<=s)r=0,o=d/f,o=Jt(o,0,1);else{const x=ds.dot(ba);if(f<=s)o=0,r=Jt(-x/u,0,1);else{const m=ds.dot(ps),p=u*f-m*m;p!==0?r=Jt((m*d-x*f)/p,0,1):r=0,o=(m*r+d)/f,o<0?(o=0,r=Jt(-x/u,0,1)):o>1&&(o=1,r=Jt((m-x)/u,0,1))}}return e.copy(a).add(ds.multiplyScalar(r)),i.copy(c).add(ps.multiplyScalar(o)),e.sub(i),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Uh(n,t,e,i){const s=Nm(i);switch(e){case Ku:return n*t;case cl:return n*t/s.components*s.byteLength;case ll:return n*t/s.components*s.byteLength;case ju:return n*t*2/s.components*s.byteLength;case hl:return n*t*2/s.components*s.byteLength;case Ju:return n*t*3/s.components*s.byteLength;case wn:return n*t*4/s.components*s.byteLength;case ul:return n*t*4/s.components*s.byteLength;case co:case lo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ho:case uo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case lc:case uc:return Math.max(n,16)*Math.max(t,8)/4;case cc:case hc:return Math.max(n,8)*Math.max(t,8)/2;case fc:case dc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case pc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case mc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case gc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case xc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case _c:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case vc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case yc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Sc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case wc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case bc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ec:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Tc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ac:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Rc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Cc:case Pc:case zc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Dc:case Ic:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Lc:case Uc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Nm(n){switch(n){case Ln:case qu:return{byteLength:1,components:1};case lr:case Zu:case wr:return{byteLength:2,components:1};case ol:case al:return{byteLength:2,components:4};case Ni:case rl:case Cn:return{byteLength:4,components:1};case Yu:case $u:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Af(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Fm(n){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=n.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=n.SHORT;else if(l instanceof Uint32Array)d=n.UNSIGNED_INT;else if(l instanceof Int32Array)d=n.INT;else if(l instanceof Int8Array)d=n.BYTE;else if(l instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((d,x)=>d.start-x.start);let f=0;for(let d=1;d<u.length;d++){const x=u[f],m=u[d];m.start<=x.start+x.count+1?x.count=Math.max(x.count,m.start+m.count-x.start):(++f,u[f]=m)}u.length=f+1;for(let d=0,x=u.length;d<x;d++){const m=u[d];n.bufferSubData(l,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(n.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Om=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bm=`#ifdef USE_ALPHAHASH
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
#endif`,km=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wm=`#ifdef USE_AOMAP
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
#endif`,Xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qm=`#ifdef USE_BATCHING
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
#endif`,Zm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ym=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$m=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Km=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Jm=`#ifdef USE_IRIDESCENCE
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
#endif`,jm=`#ifdef USE_BUMPMAP
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
#endif`,Qm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ig=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,og=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ag=`#define PI 3.141592653589793
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
} // validated`,cg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lg=`vec3 transformedNormal = objectNormal;
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
#endif`,hg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ug=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pg="gl_FragColor = linearToOutputTexel( gl_FragColor );",mg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gg=`#ifdef USE_ENVMAP
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
#endif`,xg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_g=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,wg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Eg=`#ifdef USE_GRADIENTMAP
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
}`,Tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ag=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cg=`uniform bool receiveShadow;
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
#endif`,Pg=`#ifdef USE_ENVMAP
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
#endif`,zg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ig=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ug=`PhysicalMaterial material;
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
#endif`,Ng=`struct PhysicalMaterial {
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
}`,Fg=`
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
#endif`,Og=`#if defined( RE_IndirectDiffuse )
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
#endif`,Bg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zg=`#if defined( USE_POINTS_UV )
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
#endif`,Yg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$g=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qg=`#ifdef USE_MORPHTARGETS
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
#endif`,t0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,e0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,n0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,i0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,s0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,r0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,o0=`#ifdef USE_NORMALMAP
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
#endif`,a0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,c0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,l0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,h0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,u0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,f0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,d0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,p0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,m0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,g0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,x0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,M0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,v0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,y0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,S0=`float getShadowMask() {
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
}`,w0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,b0=`#ifdef USE_SKINNING
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
#endif`,E0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,T0=`#ifdef USE_SKINNING
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
#endif`,A0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,R0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,C0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,P0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,z0=`#ifdef USE_TRANSMISSION
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
#endif`,D0=`#ifdef USE_TRANSMISSION
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
#endif`,I0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,U0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,N0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const F0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,O0=`uniform sampler2D t2D;
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
}`,B0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,k0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,H0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`#include <common>
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
}`,W0=`#if DEPTH_PACKING == 3200
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
}`,X0=`#define DISTANCE
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
}`,q0=`#define DISTANCE
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Y0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`uniform float scale;
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
}`,K0=`uniform vec3 diffuse;
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
}`,J0=`#include <common>
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
}`,j0=`uniform vec3 diffuse;
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
}`,Q0=`#define LAMBERT
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
}`,tx=`#define LAMBERT
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
}`,ex=`#define MATCAP
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
}`,nx=`#define MATCAP
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
}`,ix=`#define NORMAL
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
}`,sx=`#define NORMAL
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
}`,rx=`#define PHONG
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
}`,ox=`#define PHONG
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
}`,ax=`#define STANDARD
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
}`,cx=`#define STANDARD
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
}`,lx=`#define TOON
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
}`,hx=`#define TOON
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
}`,ux=`uniform float size;
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
}`,fx=`uniform vec3 diffuse;
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
}`,dx=`#include <common>
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
}`,px=`uniform vec3 color;
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
}`,mx=`uniform float rotation;
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
}`,gx=`uniform vec3 diffuse;
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
}`,Qt={alphahash_fragment:Om,alphahash_pars_fragment:Bm,alphamap_fragment:km,alphamap_pars_fragment:Gm,alphatest_fragment:Hm,alphatest_pars_fragment:Vm,aomap_fragment:Wm,aomap_pars_fragment:Xm,batching_pars_vertex:qm,batching_vertex:Zm,begin_vertex:Ym,beginnormal_vertex:$m,bsdfs:Km,iridescence_fragment:Jm,bumpmap_pars_fragment:jm,clipping_planes_fragment:Qm,clipping_planes_pars_fragment:tg,clipping_planes_pars_vertex:eg,clipping_planes_vertex:ng,color_fragment:ig,color_pars_fragment:sg,color_pars_vertex:rg,color_vertex:og,common:ag,cube_uv_reflection_fragment:cg,defaultnormal_vertex:lg,displacementmap_pars_vertex:hg,displacementmap_vertex:ug,emissivemap_fragment:fg,emissivemap_pars_fragment:dg,colorspace_fragment:pg,colorspace_pars_fragment:mg,envmap_fragment:gg,envmap_common_pars_fragment:xg,envmap_pars_fragment:_g,envmap_pars_vertex:Mg,envmap_physical_pars_fragment:Pg,envmap_vertex:vg,fog_vertex:yg,fog_pars_vertex:Sg,fog_fragment:wg,fog_pars_fragment:bg,gradientmap_pars_fragment:Eg,lightmap_pars_fragment:Tg,lights_lambert_fragment:Ag,lights_lambert_pars_fragment:Rg,lights_pars_begin:Cg,lights_toon_fragment:zg,lights_toon_pars_fragment:Dg,lights_phong_fragment:Ig,lights_phong_pars_fragment:Lg,lights_physical_fragment:Ug,lights_physical_pars_fragment:Ng,lights_fragment_begin:Fg,lights_fragment_maps:Og,lights_fragment_end:Bg,logdepthbuf_fragment:kg,logdepthbuf_pars_fragment:Gg,logdepthbuf_pars_vertex:Hg,logdepthbuf_vertex:Vg,map_fragment:Wg,map_pars_fragment:Xg,map_particle_fragment:qg,map_particle_pars_fragment:Zg,metalnessmap_fragment:Yg,metalnessmap_pars_fragment:$g,morphinstance_vertex:Kg,morphcolor_vertex:Jg,morphnormal_vertex:jg,morphtarget_pars_vertex:Qg,morphtarget_vertex:t0,normal_fragment_begin:e0,normal_fragment_maps:n0,normal_pars_fragment:i0,normal_pars_vertex:s0,normal_vertex:r0,normalmap_pars_fragment:o0,clearcoat_normal_fragment_begin:a0,clearcoat_normal_fragment_maps:c0,clearcoat_pars_fragment:l0,iridescence_pars_fragment:h0,opaque_fragment:u0,packing:f0,premultiplied_alpha_fragment:d0,project_vertex:p0,dithering_fragment:m0,dithering_pars_fragment:g0,roughnessmap_fragment:x0,roughnessmap_pars_fragment:_0,shadowmap_pars_fragment:M0,shadowmap_pars_vertex:v0,shadowmap_vertex:y0,shadowmask_pars_fragment:S0,skinbase_vertex:w0,skinning_pars_vertex:b0,skinning_vertex:E0,skinnormal_vertex:T0,specularmap_fragment:A0,specularmap_pars_fragment:R0,tonemapping_fragment:C0,tonemapping_pars_fragment:P0,transmission_fragment:z0,transmission_pars_fragment:D0,uv_pars_fragment:I0,uv_pars_vertex:L0,uv_vertex:U0,worldpos_vertex:N0,background_vert:F0,background_frag:O0,backgroundCube_vert:B0,backgroundCube_frag:k0,cube_vert:G0,cube_frag:H0,depth_vert:V0,depth_frag:W0,distanceRGBA_vert:X0,distanceRGBA_frag:q0,equirect_vert:Z0,equirect_frag:Y0,linedashed_vert:$0,linedashed_frag:K0,meshbasic_vert:J0,meshbasic_frag:j0,meshlambert_vert:Q0,meshlambert_frag:tx,meshmatcap_vert:ex,meshmatcap_frag:nx,meshnormal_vert:ix,meshnormal_frag:sx,meshphong_vert:rx,meshphong_frag:ox,meshphysical_vert:ax,meshphysical_frag:cx,meshtoon_vert:lx,meshtoon_frag:hx,points_vert:ux,points_frag:fx,shadow_vert:dx,shadow_frag:px,sprite_vert:mx,sprite_frag:gx},wt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},An={basic:{uniforms:qe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:qe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:qe([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:qe([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:qe([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:qe([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:qe([wt.points,wt.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:qe([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:qe([wt.common,wt.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:qe([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:qe([wt.sprite,wt.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:qe([wt.common,wt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:qe([wt.lights,wt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};An.physical={uniforms:qe([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const no={r:0,b:0,g:0},Si=new bn,xx=new se;function _x(n,t,e,i,s,r,o){const a=new Wt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function x(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?e:t).get(_)),_}function m(M){let _=!1;const S=x(M);S===null?g(a,c):S&&S.isColor&&(g(S,1),_=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(M,_){const S=x(_);S&&(S.isCubeTexture||S.mapping===zo)?(h===void 0&&(h=new ee(new Dn(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:zs(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Si.copy(_.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(xx.makeRotationFromEuler(Si)),h.material.toneMapped=ce.getTransfer(S.colorSpace)!==de,(u!==S||f!==S.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ee(new br(2,2),new pi({name:"BackgroundMaterial",uniforms:zs(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=ce.getTransfer(S.colorSpace)!==de,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function g(M,_){M.getRGB(no,lf(n)),i.buffers.color.setClear(no.r,no.g,no.b,_,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),c=_,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,g(a,c)},render:m,addToRenderList:p,dispose:v}}function Mx(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(E,I,F,k,Z){let O=!1;const z=u(k,F,I);r!==z&&(r=z,l(r.object)),O=d(E,k,F,Z),O&&x(E,k,F,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,_(E,I,F,k),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function c(){return n.createVertexArray()}function l(E){return n.bindVertexArray(E)}function h(E){return n.deleteVertexArray(E)}function u(E,I,F){const k=F.wireframe===!0;let Z=i[E.id];Z===void 0&&(Z={},i[E.id]=Z);let O=Z[I.id];O===void 0&&(O={},Z[I.id]=O);let z=O[k];return z===void 0&&(z=f(c()),O[k]=z),z}function f(E){const I=[],F=[],k=[];for(let Z=0;Z<e;Z++)I[Z]=0,F[Z]=0,k[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:k,object:E,attributes:{},index:null}}function d(E,I,F,k){const Z=r.attributes,O=I.attributes;let z=0;const C=F.getAttributes();for(const P in C)if(C[P].location>=0){const H=Z[P];let N=O[P];if(N===void 0&&(P==="instanceMatrix"&&E.instanceMatrix&&(N=E.instanceMatrix),P==="instanceColor"&&E.instanceColor&&(N=E.instanceColor)),H===void 0||H.attribute!==N||N&&H.data!==N.data)return!0;z++}return r.attributesNum!==z||r.index!==k}function x(E,I,F,k){const Z={},O=I.attributes;let z=0;const C=F.getAttributes();for(const P in C)if(C[P].location>=0){let H=O[P];H===void 0&&(P==="instanceMatrix"&&E.instanceMatrix&&(H=E.instanceMatrix),P==="instanceColor"&&E.instanceColor&&(H=E.instanceColor));const N={};N.attribute=H,H&&H.data&&(N.data=H.data),Z[P]=N,z++}r.attributes=Z,r.attributesNum=z,r.index=k}function m(){const E=r.newAttributes;for(let I=0,F=E.length;I<F;I++)E[I]=0}function p(E){g(E,0)}function g(E,I){const F=r.newAttributes,k=r.enabledAttributes,Z=r.attributeDivisors;F[E]=1,k[E]===0&&(n.enableVertexAttribArray(E),k[E]=1),Z[E]!==I&&(n.vertexAttribDivisor(E,I),Z[E]=I)}function v(){const E=r.newAttributes,I=r.enabledAttributes;for(let F=0,k=I.length;F<k;F++)I[F]!==E[F]&&(n.disableVertexAttribArray(F),I[F]=0)}function M(E,I,F,k,Z,O,z){z===!0?n.vertexAttribIPointer(E,I,F,Z,O):n.vertexAttribPointer(E,I,F,k,Z,O)}function _(E,I,F,k){m();const Z=k.attributes,O=F.getAttributes(),z=I.defaultAttributeValues;for(const C in O){const P=O[C];if(P.location>=0){let G=Z[C];if(G===void 0&&(C==="instanceMatrix"&&E.instanceMatrix&&(G=E.instanceMatrix),C==="instanceColor"&&E.instanceColor&&(G=E.instanceColor)),G!==void 0){const H=G.normalized,N=G.itemSize,$=t.get(G);if($===void 0)continue;const rt=$.buffer,mt=$.type,Et=$.bytesPerElement,q=mt===n.INT||mt===n.UNSIGNED_INT||G.gpuType===rl;if(G.isInterleavedBufferAttribute){const K=G.data,st=K.stride,at=G.offset;if(K.isInstancedInterleavedBuffer){for(let ct=0;ct<P.locationSize;ct++)g(P.location+ct,K.meshPerAttribute);E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ct=0;ct<P.locationSize;ct++)p(P.location+ct);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let ct=0;ct<P.locationSize;ct++)M(P.location+ct,N/P.locationSize,mt,H,st*Et,(at+N/P.locationSize*ct)*Et,q)}else{if(G.isInstancedBufferAttribute){for(let K=0;K<P.locationSize;K++)g(P.location+K,G.meshPerAttribute);E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let K=0;K<P.locationSize;K++)p(P.location+K);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let K=0;K<P.locationSize;K++)M(P.location+K,N/P.locationSize,mt,H,N*Et,N/P.locationSize*K*Et,q)}}else if(z!==void 0){const H=z[C];if(H!==void 0)switch(H.length){case 2:n.vertexAttrib2fv(P.location,H);break;case 3:n.vertexAttrib3fv(P.location,H);break;case 4:n.vertexAttrib4fv(P.location,H);break;default:n.vertexAttrib1fv(P.location,H)}}}}v()}function S(){D();for(const E in i){const I=i[E];for(const F in I){const k=I[F];for(const Z in k)h(k[Z].object),delete k[Z];delete I[F]}delete i[E]}}function w(E){if(i[E.id]===void 0)return;const I=i[E.id];for(const F in I){const k=I[F];for(const Z in k)h(k[Z].object),delete k[Z];delete I[F]}delete i[E.id]}function A(E){for(const I in i){const F=i[I];if(F[E.id]===void 0)continue;const k=F[E.id];for(const Z in k)h(k[Z].object),delete k[Z];delete F[E.id]}}function D(){y(),o=!0,r!==s&&(r=s,l(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:y,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:m,enableAttribute:p,disableUnusedAttributes:v}}function vx(n,t,e){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let d=0;for(let x=0;x<u;x++)d+=h[x];e.update(d,i,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let x=0;x<l.length;x++)o(l[x],h[x],f[x]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let x=0;for(let m=0;m<u;m++)x+=h[m]*f[m];e.update(x,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function yx(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==wn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const D=A===wr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Ln&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Cn&&!D)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),S=x>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:x,maxTextureSize:m,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:S,maxSamples:w}}function Sx(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ri,a=new jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||i!==0||s;return s=f,i=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const x=u.clippingPlanes,m=u.clipIntersection,p=u.clipShadows,g=n.get(u);if(!s||x===null||x.length===0||r&&!p)r?h(null):l();else{const v=r?0:i,M=v*4;let _=g.clippingState||null;c.value=_,_=h(x,f,M,d);for(let S=0;S!==M;++S)_[S]=e[S];g.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,d,x){const m=u!==null?u.length:0;let p=null;if(m!==0){if(p=c.value,x!==!0||p===null){const g=d+m*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let M=0,_=d;M!==m;++M,_+=4)o.copy(u[M]).applyMatrix4(v,a),o.normal.toArray(p,_),p[_+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,p}}function wx(n){let t=new WeakMap;function e(o,a){return a===rc?o.mapping=Rs:a===oc&&(o.mapping=Cs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===rc||a===oc)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Fp(c.height);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const _s=4,Nh=[.125,.215,.35,.446,.526,.582],Ai=20,Ea=new Lo,Fh=new Wt;let Ta=null,Aa=0,Ra=0,Ca=!1;const bi=(1+Math.sqrt(5))/2,ms=1/bi,Oh=[new L(-bi,ms,0),new L(bi,ms,0),new L(-ms,0,bi),new L(ms,0,bi),new L(0,bi,-ms),new L(0,bi,ms),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],bx=new L;class Bh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=bx}=r;Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ta,Aa,Ra),this._renderer.xr.enabled=Ca,t.scissorTest=!1,io(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rs||t.mapping===Cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ta=this._renderer.getRenderTarget(),Aa=this._renderer.getActiveCubeFace(),Ra=this._renderer.getActiveMipmapLevel(),Ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:wr,format:wn,colorSpace:Ps,depthBuffer:!1},s=kh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ex(r)),this._blurMaterial=Tx(r,t,e)}return s}_compileMaterial(t){const e=new ee(this._lodPlanes[0],t);this._renderer.compile(e,Ea)}_sceneToCubeUV(t,e,i,s,r){const c=new yn(90,1,e,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Fh),u.toneMapping=hi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const m=new nn({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),p=new ee(new Dn,m);let g=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,g=!0):(m.color.copy(Fh),g=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[M],r.y,r.z)):_===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[M]));const S=this._cubeSize;io(s,_*S,M>2?S:0,S,S),u.setRenderTarget(s),g&&u.render(p,c),u.render(t,c)}p.geometry.dispose(),p.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=v}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Rs||t.mapping===Cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ee(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;io(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,Ea)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Oh[(s-r-1)%Oh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ee(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ai-1),m=r/x,p=isFinite(r)?1+Math.floor(h*m):Ai;p>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ai}`);const g=[];let v=0;for(let A=0;A<Ai;++A){const D=A/m,y=Math.exp(-D*D/2);g.push(y),A===0?v+=y:A<p&&(v+=2*y)}for(let A=0;A<g.length;A++)g[A]=g[A]/v;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=g,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=x,f.mipInt.value=M-i;const _=this._sizeLods[s],S=3*_*(s>M-_s?s-M+_s:0),w=4*(this._cubeSize-_);io(e,S,w,3*_,2*_),c.setRenderTarget(e),c.render(u,Ea)}}function Ex(n){const t=[],e=[],i=[];let s=n;const r=n-_s+1+Nh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>n-_s?c=Nh[o-n+_s-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,x=6,m=3,p=2,g=1,v=new Float32Array(m*x*d),M=new Float32Array(p*x*d),_=new Float32Array(g*x*d);for(let w=0;w<d;w++){const A=w%3*2/3-1,D=w>2?0:-1,y=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];v.set(y,m*x*w),M.set(f,p*x*w);const E=[w,w,w,w,w,w];_.set(E,g*x*w)}const S=new _e;S.setAttribute("position",new He(v,m)),S.setAttribute("uv",new He(M,p)),S.setAttribute("faceIndex",new He(_,g)),t.push(S),s>_s&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function kh(n,t,e){const i=new Fi(n,t,e);return i.texture.mapping=zo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function io(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Tx(n,t,e){const i=new Float32Array(Ai),s=new L(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_l(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Gh(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_l(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Hh(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_l(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function _l(){return`

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
	`}function Ax(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===rc||c===oc,h=c===Rs||c===Cs;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Bh(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Bh(n)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Rx(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&dr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Cx(n,t,e,i){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const x in f.attributes)t.remove(f.attributes[x]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],n.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,x=u.attributes.position;let m=0;if(d!==null){const v=d.array;m=d.version;for(let M=0,_=v.length;M<_;M+=3){const S=v[M+0],w=v[M+1],A=v[M+2];f.push(S,w,w,A,A,S)}}else if(x!==void 0){const v=x.array;m=x.version;for(let M=0,_=v.length/3-1;M<_;M+=3){const S=M+0,w=M+1,A=M+2;f.push(S,w,w,A,A,S)}}else return;const p=new(ef(f)?cf:af)(f,1);p.version=m;const g=r.get(u);g&&t.remove(g),r.set(u,p)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Px(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,r,f*o),e.update(d,i,1)}function l(f,d,x){x!==0&&(n.drawElementsInstanced(i,d,r,f*o,x),e.update(d,i,x))}function h(f,d,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,x);let p=0;for(let g=0;g<x;g++)p+=d[g];e.update(p,i,1)}function u(f,d,x,m){if(x===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f.length;g++)l(f[g]/o,d[g],m[g]);else{p.multiDrawElementsInstancedWEBGL(i,d,0,r,f,0,m,0,x);let g=0;for(let v=0;v<x;v++)g+=d[v]*m[v];e.update(g,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function zx(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Dx(n,t,e){const i=new WeakMap,s=new Te;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let y=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let M=0;d===!0&&(M=1),x===!0&&(M=2),m===!0&&(M=3);let _=a.attributes.position.count*M,S=1;_>t.maxTextureSize&&(S=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const w=new Float32Array(_*S*4*u),A=new nf(w,_,S,u);A.type=Cn,A.needsUpdate=!0;const D=M*4;for(let E=0;E<u;E++){const I=p[E],F=g[E],k=v[E],Z=_*S*4*E;for(let O=0;O<I.count;O++){const z=O*D;d===!0&&(s.fromBufferAttribute(I,O),w[Z+z+0]=s.x,w[Z+z+1]=s.y,w[Z+z+2]=s.z,w[Z+z+3]=0),x===!0&&(s.fromBufferAttribute(F,O),w[Z+z+4]=s.x,w[Z+z+5]=s.y,w[Z+z+6]=s.z,w[Z+z+7]=0),m===!0&&(s.fromBufferAttribute(k,O),w[Z+z+8]=s.x,w[Z+z+9]=s.y,w[Z+z+10]=s.z,w[Z+z+11]=k.itemSize===4?s.w:1)}}f={count:u,texture:A,size:new Tt(_,S)},i.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let d=0;for(let m=0;m<l.length;m++)d+=l[m];const x=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Ix(n,t,e,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const Rf=new Ge,Vh=new gf(1,1),Cf=new nf,Pf=new vp,zf=new uf,Wh=[],Xh=[],qh=new Float32Array(16),Zh=new Float32Array(9),Yh=new Float32Array(4);function Ns(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Wh[s];if(r===void 0&&(r=new Float32Array(s),Wh[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Le(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ue(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Uo(n,t){let e=Xh[t];e===void 0&&(e=new Int32Array(t),Xh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Lx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Ux(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2fv(this.addr,t),Ue(e,t)}}function Nx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Le(e,t))return;n.uniform3fv(this.addr,t),Ue(e,t)}}function Fx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4fv(this.addr,t),Ue(e,t)}}function Ox(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Le(e,i))return;Yh.set(i),n.uniformMatrix2fv(this.addr,!1,Yh),Ue(e,i)}}function Bx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Le(e,i))return;Zh.set(i),n.uniformMatrix3fv(this.addr,!1,Zh),Ue(e,i)}}function kx(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Le(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Le(e,i))return;qh.set(i),n.uniformMatrix4fv(this.addr,!1,qh),Ue(e,i)}}function Gx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Hx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2iv(this.addr,t),Ue(e,t)}}function Vx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3iv(this.addr,t),Ue(e,t)}}function Wx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4iv(this.addr,t),Ue(e,t)}}function Xx(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function qx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Le(e,t))return;n.uniform2uiv(this.addr,t),Ue(e,t)}}function Zx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Le(e,t))return;n.uniform3uiv(this.addr,t),Ue(e,t)}}function Yx(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Le(e,t))return;n.uniform4uiv(this.addr,t),Ue(e,t)}}function $x(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Vh.compareFunction=tf,r=Vh):r=Rf,e.setTexture2D(t||r,s)}function Kx(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Pf,s)}function Jx(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||zf,s)}function jx(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Cf,s)}function Qx(n){switch(n){case 5126:return Lx;case 35664:return Ux;case 35665:return Nx;case 35666:return Fx;case 35674:return Ox;case 35675:return Bx;case 35676:return kx;case 5124:case 35670:return Gx;case 35667:case 35671:return Hx;case 35668:case 35672:return Vx;case 35669:case 35673:return Wx;case 5125:return Xx;case 36294:return qx;case 36295:return Zx;case 36296:return Yx;case 35678:case 36198:case 36298:case 36306:case 35682:return $x;case 35679:case 36299:case 36307:return Kx;case 35680:case 36300:case 36308:case 36293:return Jx;case 36289:case 36303:case 36311:case 36292:return jx}}function t_(n,t){n.uniform1fv(this.addr,t)}function e_(n,t){const e=Ns(t,this.size,2);n.uniform2fv(this.addr,e)}function n_(n,t){const e=Ns(t,this.size,3);n.uniform3fv(this.addr,e)}function i_(n,t){const e=Ns(t,this.size,4);n.uniform4fv(this.addr,e)}function s_(n,t){const e=Ns(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function r_(n,t){const e=Ns(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function o_(n,t){const e=Ns(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function a_(n,t){n.uniform1iv(this.addr,t)}function c_(n,t){n.uniform2iv(this.addr,t)}function l_(n,t){n.uniform3iv(this.addr,t)}function h_(n,t){n.uniform4iv(this.addr,t)}function u_(n,t){n.uniform1uiv(this.addr,t)}function f_(n,t){n.uniform2uiv(this.addr,t)}function d_(n,t){n.uniform3uiv(this.addr,t)}function p_(n,t){n.uniform4uiv(this.addr,t)}function m_(n,t,e){const i=this.cache,s=t.length,r=Uo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Rf,r[o])}function g_(n,t,e){const i=this.cache,s=t.length,r=Uo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Pf,r[o])}function x_(n,t,e){const i=this.cache,s=t.length,r=Uo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||zf,r[o])}function __(n,t,e){const i=this.cache,s=t.length,r=Uo(e,s);Le(i,r)||(n.uniform1iv(this.addr,r),Ue(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Cf,r[o])}function M_(n){switch(n){case 5126:return t_;case 35664:return e_;case 35665:return n_;case 35666:return i_;case 35674:return s_;case 35675:return r_;case 35676:return o_;case 5124:case 35670:return a_;case 35667:case 35671:return c_;case 35668:case 35672:return l_;case 35669:case 35673:return h_;case 5125:return u_;case 36294:return f_;case 36295:return d_;case 36296:return p_;case 35678:case 36198:case 36298:case 36306:case 35682:return m_;case 35679:case 36299:case 36307:return g_;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return __}}class v_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Qx(e.type)}}class y_{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=M_(e.type)}}class S_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const Pa=/(\w+)(\])?(\[|\.)?/g;function $h(n,t){n.seq.push(t),n.map[t.id]=t}function w_(n,t,e){const i=n.name,s=i.length;for(Pa.lastIndex=0;;){const r=Pa.exec(i),o=Pa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){$h(e,l===void 0?new v_(a,n,t):new y_(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new S_(a),$h(e,u)),e=u}}}class fo{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);w_(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function Kh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const b_=37297;let E_=0;function T_(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Jh=new jt;function A_(n){ce._getMatrix(Jh,ce.workingColorSpace,n);const t=`mat3( ${Jh.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(n)){case go:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function jh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+T_(n.getShaderSource(t),a)}else return r}function R_(n,t){const e=A_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function C_(n,t){let e;switch(t){case $d:e="Linear";break;case Kd:e="Reinhard";break;case Jd:e="Cineon";break;case Wu:e="ACESFilmic";break;case Qd:e="AgX";break;case tp:e="Neutral";break;case jd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const so=new L;function P_(){ce.getLuminanceCoefficients(so);const n=so.x.toFixed(4),t=so.y.toFixed(4),e=so.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function z_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function D_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function I_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function js(n){return n!==""}function Qh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tu(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const L_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hc(n){return n.replace(L_,N_)}const U_=new Map;function N_(n,t){let e=Qt[t];if(e===void 0){const i=U_.get(t);if(i!==void 0)e=Qt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Hc(e)}const F_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eu(n){return n.replace(F_,O_)}function O_(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nu(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function B_(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Gu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Hu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function k_(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Rs:case Cs:t="ENVMAP_TYPE_CUBE";break;case zo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function G_(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Cs:t="ENVMAP_MODE_REFRACTION";break}return t}function H_(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Vu:t="ENVMAP_BLENDING_MULTIPLY";break;case Zd:t="ENVMAP_BLENDING_MIX";break;case Yd:t="ENVMAP_BLENDING_ADD";break}return t}function V_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function W_(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=B_(e),l=k_(e),h=G_(e),u=H_(e),f=V_(e),d=z_(e),x=D_(r),m=s.createProgram();let p,g,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(js).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(js).join(`
`),g.length>0&&(g+=`
`)):(p=[nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),g=[nu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hi?"#define TONE_MAPPING":"",e.toneMapping!==hi?Qt.tonemapping_pars_fragment:"",e.toneMapping!==hi?C_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,R_("linearToOutputTexel",e.outputColorSpace),P_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(js).join(`
`)),o=Hc(o),o=Qh(o,e),o=tu(o,e),a=Hc(a),a=Qh(a,e),a=tu(a,e),o=eu(o),a=eu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",e.glslVersion===th?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===th?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const M=v+p+o,_=v+g+a,S=Kh(s,s.VERTEX_SHADER,M),w=Kh(s,s.FRAGMENT_SHADER,_);s.attachShader(m,S),s.attachShader(m,w),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function A(I){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(m)||"",k=s.getShaderInfoLog(S)||"",Z=s.getShaderInfoLog(w)||"",O=F.trim(),z=k.trim(),C=Z.trim();let P=!0,G=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(P=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,S,w);else{const H=jh(s,S,"vertex"),N=jh(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+O+`
`+H+`
`+N)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(z===""||C==="")&&(G=!1);G&&(I.diagnostics={runnable:P,programLog:O,vertexShader:{log:z,prefix:p},fragmentShader:{log:C,prefix:g}})}s.deleteShader(S),s.deleteShader(w),D=new fo(s,m),y=I_(s,m)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let y;this.getAttributes=function(){return y===void 0&&A(this),y};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(m,b_)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=E_++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=w,this}let X_=0;class q_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Z_(t),e.set(t,i)),i}}class Z_{constructor(t){this.id=X_++,this.code=t,this.usedTimes=0}}function Y_(n,t,e,i,s,r,o){const a=new rf,c=new q_,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return l.add(y),y===0?"uv":`uv${y}`}function p(y,E,I,F,k){const Z=F.fog,O=k.geometry,z=y.isMeshStandardMaterial?F.environment:null,C=(y.isMeshStandardMaterial?e:t).get(y.envMap||z),P=C&&C.mapping===zo?C.image.height:null,G=x[y.type];y.precision!==null&&(d=s.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const H=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,N=H!==void 0?H.length:0;let $=0;O.morphAttributes.position!==void 0&&($=1),O.morphAttributes.normal!==void 0&&($=2),O.morphAttributes.color!==void 0&&($=3);let rt,mt,Et,q;if(G){const ue=An[G];rt=ue.vertexShader,mt=ue.fragmentShader}else rt=y.vertexShader,mt=y.fragmentShader,c.update(y),Et=c.getVertexShaderID(y),q=c.getFragmentShaderID(y);const K=n.getRenderTarget(),st=n.state.buffers.depth.getReversed(),at=k.isInstancedMesh===!0,ct=k.isBatchedMesh===!0,Ot=!!y.map,Gt=!!y.matcap,U=!!C,ie=!!y.aoMap,Ht=!!y.lightMap,St=!!y.bumpMap,At=!!y.normalMap,et=!!y.displacementMap,nt=!!y.emissiveMap,lt=!!y.metalnessMap,It=!!y.roughnessMap,Xt=y.anisotropy>0,R=y.clearcoat>0,b=y.dispersion>0,V=y.iridescence>0,tt=y.sheen>0,J=y.transmission>0,Y=Xt&&!!y.anisotropyMap,gt=R&&!!y.clearcoatMap,ot=R&&!!y.clearcoatNormalMap,xt=R&&!!y.clearcoatRoughnessMap,pt=V&&!!y.iridescenceMap,ht=V&&!!y.iridescenceThicknessMap,_t=tt&&!!y.sheenColorMap,Lt=tt&&!!y.sheenRoughnessMap,Ct=!!y.specularMap,Mt=!!y.specularColorMap,qt=!!y.specularIntensityMap,B=J&&!!y.transmissionMap,dt=J&&!!y.thicknessMap,vt=!!y.gradientMap,Pt=!!y.alphaMap,ut=y.alphaTest>0,it=!!y.alphaHash,Dt=!!y.extensions;let Kt=hi;y.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Kt=n.toneMapping);const ge={shaderID:G,shaderType:y.type,shaderName:y.name,vertexShader:rt,fragmentShader:mt,defines:y.defines,customVertexShaderID:Et,customFragmentShaderID:q,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:ct,batchingColor:ct&&k._colorsTexture!==null,instancing:at,instancingColor:at&&k.instanceColor!==null,instancingMorph:at&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ps,alphaToCoverage:!!y.alphaToCoverage,map:Ot,matcap:Gt,envMap:U,envMapMode:U&&C.mapping,envMapCubeUVHeight:P,aoMap:ie,lightMap:Ht,bumpMap:St,normalMap:At,displacementMap:f&&et,emissiveMap:nt,normalMapObjectSpace:At&&y.normalMapType===sp,normalMapTangentSpace:At&&y.normalMapType===Qu,metalnessMap:lt,roughnessMap:It,anisotropy:Xt,anisotropyMap:Y,clearcoat:R,clearcoatMap:gt,clearcoatNormalMap:ot,clearcoatRoughnessMap:xt,dispersion:b,iridescence:V,iridescenceMap:pt,iridescenceThicknessMap:ht,sheen:tt,sheenColorMap:_t,sheenRoughnessMap:Lt,specularMap:Ct,specularColorMap:Mt,specularIntensityMap:qt,transmission:J,transmissionMap:B,thicknessMap:dt,gradientMap:vt,opaque:y.transparent===!1&&y.blending===ys&&y.alphaToCoverage===!1,alphaMap:Pt,alphaTest:ut,alphaHash:it,combine:y.combine,mapUv:Ot&&m(y.map.channel),aoMapUv:ie&&m(y.aoMap.channel),lightMapUv:Ht&&m(y.lightMap.channel),bumpMapUv:St&&m(y.bumpMap.channel),normalMapUv:At&&m(y.normalMap.channel),displacementMapUv:et&&m(y.displacementMap.channel),emissiveMapUv:nt&&m(y.emissiveMap.channel),metalnessMapUv:lt&&m(y.metalnessMap.channel),roughnessMapUv:It&&m(y.roughnessMap.channel),anisotropyMapUv:Y&&m(y.anisotropyMap.channel),clearcoatMapUv:gt&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:ot&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:_t&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&m(y.sheenRoughnessMap.channel),specularMapUv:Ct&&m(y.specularMap.channel),specularColorMapUv:Mt&&m(y.specularColorMap.channel),specularIntensityMapUv:qt&&m(y.specularIntensityMap.channel),transmissionMapUv:B&&m(y.transmissionMap.channel),thicknessMapUv:dt&&m(y.thicknessMap.channel),alphaMapUv:Pt&&m(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(At||Xt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!O.attributes.uv&&(Ot||Pt),fog:!!Z,useFog:y.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:st,skinning:k.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:$,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Kt,decodeVideoTexture:Ot&&y.map.isVideoTexture===!0&&ce.getTransfer(y.map.colorSpace)===de,decodeVideoTextureEmissive:nt&&y.emissiveMap.isVideoTexture===!0&&ce.getTransfer(y.emissiveMap.colorSpace)===de,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ce,flipSided:y.side===$e,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Dt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&y.extensions.multiDraw===!0||ct)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ge.vertexUv1s=l.has(1),ge.vertexUv2s=l.has(2),ge.vertexUv3s=l.has(3),l.clear(),ge}function g(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)E.push(I),E.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(v(E,y),M(E,y),E.push(n.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function v(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function M(y,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),E.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),y.push(a.mask)}function _(y){const E=x[y.type];let I;if(E){const F=An[E];I=Ip.clone(F.uniforms)}else I=y.uniforms;return I}function S(y,E){let I;for(let F=0,k=h.length;F<k;F++){const Z=h[F];if(Z.cacheKey===E){I=Z,++I.usedTimes;break}}return I===void 0&&(I=new W_(n,E,y,r),h.push(I)),I}function w(y){if(--y.usedTimes===0){const E=h.indexOf(y);h[E]=h[h.length-1],h.pop(),y.destroy()}}function A(y){c.remove(y)}function D(){c.dispose()}return{getParameters:p,getProgramCacheKey:g,getUniforms:_,acquireProgram:S,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:D}}function $_(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function K_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function iu(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function su(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,d,x,m,p){let g=n[t];return g===void 0?(g={id:u.id,object:u,geometry:f,material:d,groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},n[t]=g):(g.id=u.id,g.object=u,g.geometry=f,g.material=d,g.groupOrder=x,g.renderOrder=u.renderOrder,g.z=m,g.group=p),t++,g}function a(u,f,d,x,m,p){const g=o(u,f,d,x,m,p);d.transmission>0?i.push(g):d.transparent===!0?s.push(g):e.push(g)}function c(u,f,d,x,m,p){const g=o(u,f,d,x,m,p);d.transmission>0?i.unshift(g):d.transparent===!0?s.unshift(g):e.unshift(g)}function l(u,f){e.length>1&&e.sort(u||K_),i.length>1&&i.sort(f||iu),s.length>1&&s.sort(f||iu)}function h(){for(let u=t,f=n.length;u<f;u++){const d=n[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function J_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new su,n.set(i,[o])):s>=r.length?(o=new su,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function j_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Wt};break;case"SpotLight":e={position:new L,direction:new L,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new L,halfWidth:new L,halfHeight:new L};break}return n[t.id]=e,e}}}function Q_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let tM=0;function eM(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function nM(n){const t=new j_,e=Q_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new L);const s=new L,r=new se,o=new se;function a(l){let h=0,u=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let d=0,x=0,m=0,p=0,g=0,v=0,M=0,_=0,S=0,w=0,A=0;l.sort(eM);for(let y=0,E=l.length;y<E;y++){const I=l[y],F=I.color,k=I.intensity,Z=I.distance,O=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=F.r*k,u+=F.g*k,f+=F.b*k;else if(I.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(I.sh.coefficients[z],k);A++}else if(I.isDirectionalLight){const z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const C=I.shadow,P=e.get(I);P.shadowIntensity=C.intensity,P.shadowBias=C.bias,P.shadowNormalBias=C.normalBias,P.shadowRadius=C.radius,P.shadowMapSize=C.mapSize,i.directionalShadow[d]=P,i.directionalShadowMap[d]=O,i.directionalShadowMatrix[d]=I.shadow.matrix,v++}i.directional[d]=z,d++}else if(I.isSpotLight){const z=t.get(I);z.position.setFromMatrixPosition(I.matrixWorld),z.color.copy(F).multiplyScalar(k),z.distance=Z,z.coneCos=Math.cos(I.angle),z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),z.decay=I.decay,i.spot[m]=z;const C=I.shadow;if(I.map&&(i.spotLightMap[S]=I.map,S++,C.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[m]=C.matrix,I.castShadow){const P=e.get(I);P.shadowIntensity=C.intensity,P.shadowBias=C.bias,P.shadowNormalBias=C.normalBias,P.shadowRadius=C.radius,P.shadowMapSize=C.mapSize,i.spotShadow[m]=P,i.spotShadowMap[m]=O,_++}m++}else if(I.isRectAreaLight){const z=t.get(I);z.color.copy(F).multiplyScalar(k),z.halfWidth.set(I.width*.5,0,0),z.halfHeight.set(0,I.height*.5,0),i.rectArea[p]=z,p++}else if(I.isPointLight){const z=t.get(I);if(z.color.copy(I.color).multiplyScalar(I.intensity),z.distance=I.distance,z.decay=I.decay,I.castShadow){const C=I.shadow,P=e.get(I);P.shadowIntensity=C.intensity,P.shadowBias=C.bias,P.shadowNormalBias=C.normalBias,P.shadowRadius=C.radius,P.shadowMapSize=C.mapSize,P.shadowCameraNear=C.camera.near,P.shadowCameraFar=C.camera.far,i.pointShadow[x]=P,i.pointShadowMap[x]=O,i.pointShadowMatrix[x]=I.shadow.matrix,M++}i.point[x]=z,x++}else if(I.isHemisphereLight){const z=t.get(I);z.skyColor.copy(I.color).multiplyScalar(k),z.groundColor.copy(I.groundColor).multiplyScalar(k),i.hemi[g]=z,g++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const D=i.hash;(D.directionalLength!==d||D.pointLength!==x||D.spotLength!==m||D.rectAreaLength!==p||D.hemiLength!==g||D.numDirectionalShadows!==v||D.numPointShadows!==M||D.numSpotShadows!==_||D.numSpotMaps!==S||D.numLightProbes!==A)&&(i.directional.length=d,i.spot.length=m,i.rectArea.length=p,i.point.length=x,i.hemi.length=g,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=_+S-w,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,D.directionalLength=d,D.pointLength=x,D.spotLength=m,D.rectAreaLength=p,D.hemiLength=g,D.numDirectionalShadows=v,D.numPointShadows=M,D.numSpotShadows=_,D.numSpotMaps=S,D.numLightProbes=A,i.version=tM++)}function c(l,h){let u=0,f=0,d=0,x=0,m=0;const p=h.matrixWorldInverse;for(let g=0,v=l.length;g<v;g++){const M=l[g];if(M.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),u++}else if(M.isSpotLight){const _=i.spot[d];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),d++}else if(M.isRectAreaLight){const _=i.rectArea[x];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),o.identity(),r.copy(M.matrixWorld),r.premultiply(p),o.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){const _=i.point[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){const _=i.hemi[m];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(p),m++}}}return{setup:a,setupView:c,state:i}}function ru(n){const t=new nM(n),e=[],i=[];function s(h){l.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function iM(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ru(n),t.set(s,[a])):r>=o.length?(a=new ru(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const sM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rM=`uniform sampler2D shadow_pass;
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
}`;function oM(n,t,e){let i=new Do;const s=new Tt,r=new Tt,o=new Te,a=new Tm({depthPacking:ip}),c=new Am,l={},h=e.maxTextureSize,u={[di]:$e,[$e]:di,[Ce]:Ce},f=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:sM,fragmentShader:rM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const x=new _e;x.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new ee(x,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gu;let g=this.type;this.render=function(w,A,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const y=n.getRenderTarget(),E=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),F=n.state;F.setBlending(li),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const k=g!==Wn&&this.type===Wn,Z=g===Wn&&this.type!==Wn;for(let O=0,z=w.length;O<z;O++){const C=w[O],P=C.shadow;if(P===void 0){console.warn("THREE.WebGLShadowMap:",C,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;s.copy(P.mapSize);const G=P.getFrameExtents();if(s.multiply(G),r.copy(P.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/G.x),s.x=r.x*G.x,P.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/G.y),s.y=r.y*G.y,P.mapSize.y=r.y)),P.map===null||k===!0||Z===!0){const N=this.type!==Wn?{minFilter:cn,magFilter:cn}:{};P.map!==null&&P.map.dispose(),P.map=new Fi(s.x,s.y,N),P.map.texture.name=C.name+".shadowMap",P.camera.updateProjectionMatrix()}n.setRenderTarget(P.map),n.clear();const H=P.getViewportCount();for(let N=0;N<H;N++){const $=P.getViewport(N);o.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),F.viewport(o),P.updateMatrices(C,N),i=P.getFrustum(),_(A,D,P.camera,C,this.type)}P.isPointLightShadow!==!0&&this.type===Wn&&v(P,D),P.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(y,E,I)};function v(w,A){const D=t.update(m);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Fi(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,D,f,m,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,D,d,m,null)}function M(w,A,D,y){let E=null;const I=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)E=I;else if(E=D.isPointLight===!0?c:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=E.uuid,k=A.uuid;let Z=l[F];Z===void 0&&(Z={},l[F]=Z);let O=Z[k];O===void 0&&(O=E.clone(),Z[k]=O,A.addEventListener("dispose",S)),E=O}if(E.visible=A.visible,E.wireframe=A.wireframe,y===Wn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:u[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,D.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const F=n.properties.get(E);F.light=D}return E}function _(w,A,D,y,E){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===Wn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const k=t.update(w),Z=w.material;if(Array.isArray(Z)){const O=k.groups;for(let z=0,C=O.length;z<C;z++){const P=O[z],G=Z[P.materialIndex];if(G&&G.visible){const H=M(w,G,y,E);w.onBeforeShadow(n,w,A,D,k,H,P),n.renderBufferDirect(D,null,k,H,w,P),w.onAfterShadow(n,w,A,D,k,H,P)}}}else if(Z.visible){const O=M(w,Z,y,E);w.onBeforeShadow(n,w,A,D,k,O,null),n.renderBufferDirect(D,null,k,O,w,null),w.onAfterShadow(n,w,A,D,k,O,null)}}const F=w.children;for(let k=0,Z=F.length;k<Z;k++)_(F[k],A,D,y,E)}function S(w){w.target.removeEventListener("dispose",S);for(const D in l){const y=l[D],E=w.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}const aM={[ja]:Qa,[tc]:ic,[ec]:sc,[As]:nc,[Qa]:ja,[ic]:tc,[sc]:ec,[nc]:As};function cM(n,t){function e(){let B=!1;const dt=new Te;let vt=null;const Pt=new Te(0,0,0,0);return{setMask:function(ut){vt!==ut&&!B&&(n.colorMask(ut,ut,ut,ut),vt=ut)},setLocked:function(ut){B=ut},setClear:function(ut,it,Dt,Kt,ge){ge===!0&&(ut*=Kt,it*=Kt,Dt*=Kt),dt.set(ut,it,Dt,Kt),Pt.equals(dt)===!1&&(n.clearColor(ut,it,Dt,Kt),Pt.copy(dt))},reset:function(){B=!1,vt=null,Pt.set(-1,0,0,0)}}}function i(){let B=!1,dt=!1,vt=null,Pt=null,ut=null;return{setReversed:function(it){if(dt!==it){const Dt=t.get("EXT_clip_control");it?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),dt=it;const Kt=ut;ut=null,this.setClear(Kt)}},getReversed:function(){return dt},setTest:function(it){it?K(n.DEPTH_TEST):st(n.DEPTH_TEST)},setMask:function(it){vt!==it&&!B&&(n.depthMask(it),vt=it)},setFunc:function(it){if(dt&&(it=aM[it]),Pt!==it){switch(it){case ja:n.depthFunc(n.NEVER);break;case Qa:n.depthFunc(n.ALWAYS);break;case tc:n.depthFunc(n.LESS);break;case As:n.depthFunc(n.LEQUAL);break;case ec:n.depthFunc(n.EQUAL);break;case nc:n.depthFunc(n.GEQUAL);break;case ic:n.depthFunc(n.GREATER);break;case sc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Pt=it}},setLocked:function(it){B=it},setClear:function(it){ut!==it&&(dt&&(it=1-it),n.clearDepth(it),ut=it)},reset:function(){B=!1,vt=null,Pt=null,ut=null,dt=!1}}}function s(){let B=!1,dt=null,vt=null,Pt=null,ut=null,it=null,Dt=null,Kt=null,ge=null;return{setTest:function(ue){B||(ue?K(n.STENCIL_TEST):st(n.STENCIL_TEST))},setMask:function(ue){dt!==ue&&!B&&(n.stencilMask(ue),dt=ue)},setFunc:function(ue,Fn,En){(vt!==ue||Pt!==Fn||ut!==En)&&(n.stencilFunc(ue,Fn,En),vt=ue,Pt=Fn,ut=En)},setOp:function(ue,Fn,En){(it!==ue||Dt!==Fn||Kt!==En)&&(n.stencilOp(ue,Fn,En),it=ue,Dt=Fn,Kt=En)},setLocked:function(ue){B=ue},setClear:function(ue){ge!==ue&&(n.clearStencil(ue),ge=ue)},reset:function(){B=!1,dt=null,vt=null,Pt=null,ut=null,it=null,Dt=null,Kt=null,ge=null}}}const r=new e,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],x=null,m=!1,p=null,g=null,v=null,M=null,_=null,S=null,w=null,A=new Wt(0,0,0),D=0,y=!1,E=null,I=null,F=null,k=null,Z=null;const O=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,C=0;const P=n.getParameter(n.VERSION);P.indexOf("WebGL")!==-1?(C=parseFloat(/^WebGL (\d)/.exec(P)[1]),z=C>=1):P.indexOf("OpenGL ES")!==-1&&(C=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),z=C>=2);let G=null,H={};const N=n.getParameter(n.SCISSOR_BOX),$=n.getParameter(n.VIEWPORT),rt=new Te().fromArray(N),mt=new Te().fromArray($);function Et(B,dt,vt,Pt){const ut=new Uint8Array(4),it=n.createTexture();n.bindTexture(B,it),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Dt=0;Dt<vt;Dt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(dt,0,n.RGBA,1,1,Pt,0,n.RGBA,n.UNSIGNED_BYTE,ut):n.texImage2D(dt+Dt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ut);return it}const q={};q[n.TEXTURE_2D]=Et(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=Et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=Et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=Et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(n.DEPTH_TEST),o.setFunc(As),St(!1),At($l),K(n.CULL_FACE),ie(li);function K(B){h[B]!==!0&&(n.enable(B),h[B]=!0)}function st(B){h[B]!==!1&&(n.disable(B),h[B]=!1)}function at(B,dt){return u[B]!==dt?(n.bindFramebuffer(B,dt),u[B]=dt,B===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=dt),B===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=dt),!0):!1}function ct(B,dt){let vt=d,Pt=!1;if(B){vt=f.get(dt),vt===void 0&&(vt=[],f.set(dt,vt));const ut=B.textures;if(vt.length!==ut.length||vt[0]!==n.COLOR_ATTACHMENT0){for(let it=0,Dt=ut.length;it<Dt;it++)vt[it]=n.COLOR_ATTACHMENT0+it;vt.length=ut.length,Pt=!0}}else vt[0]!==n.BACK&&(vt[0]=n.BACK,Pt=!0);Pt&&n.drawBuffers(vt)}function Ot(B){return x!==B?(n.useProgram(B),x=B,!0):!1}const Gt={[Ti]:n.FUNC_ADD,[Pd]:n.FUNC_SUBTRACT,[zd]:n.FUNC_REVERSE_SUBTRACT};Gt[Dd]=n.MIN,Gt[Id]=n.MAX;const U={[Ld]:n.ZERO,[Ud]:n.ONE,[Nd]:n.SRC_COLOR,[Ka]:n.SRC_ALPHA,[Hd]:n.SRC_ALPHA_SATURATE,[kd]:n.DST_COLOR,[Od]:n.DST_ALPHA,[Fd]:n.ONE_MINUS_SRC_COLOR,[Ja]:n.ONE_MINUS_SRC_ALPHA,[Gd]:n.ONE_MINUS_DST_COLOR,[Bd]:n.ONE_MINUS_DST_ALPHA,[Vd]:n.CONSTANT_COLOR,[Wd]:n.ONE_MINUS_CONSTANT_COLOR,[Xd]:n.CONSTANT_ALPHA,[qd]:n.ONE_MINUS_CONSTANT_ALPHA};function ie(B,dt,vt,Pt,ut,it,Dt,Kt,ge,ue){if(B===li){m===!0&&(st(n.BLEND),m=!1);return}if(m===!1&&(K(n.BLEND),m=!0),B!==Cd){if(B!==p||ue!==y){if((g!==Ti||_!==Ti)&&(n.blendEquation(n.FUNC_ADD),g=Ti,_=Ti),ue)switch(B){case ys:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kl:n.blendFunc(n.ONE,n.ONE);break;case Jl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case jl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ys:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Jl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case jl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}v=null,M=null,S=null,w=null,A.set(0,0,0),D=0,p=B,y=ue}return}ut=ut||dt,it=it||vt,Dt=Dt||Pt,(dt!==g||ut!==_)&&(n.blendEquationSeparate(Gt[dt],Gt[ut]),g=dt,_=ut),(vt!==v||Pt!==M||it!==S||Dt!==w)&&(n.blendFuncSeparate(U[vt],U[Pt],U[it],U[Dt]),v=vt,M=Pt,S=it,w=Dt),(Kt.equals(A)===!1||ge!==D)&&(n.blendColor(Kt.r,Kt.g,Kt.b,ge),A.copy(Kt),D=ge),p=B,y=!1}function Ht(B,dt){B.side===Ce?st(n.CULL_FACE):K(n.CULL_FACE);let vt=B.side===$e;dt&&(vt=!vt),St(vt),B.blending===ys&&B.transparent===!1?ie(li):ie(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const Pt=B.stencilWrite;a.setTest(Pt),Pt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),nt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):st(n.SAMPLE_ALPHA_TO_COVERAGE)}function St(B){E!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),E=B)}function At(B){B!==Ad?(K(n.CULL_FACE),B!==I&&(B===$l?n.cullFace(n.BACK):B===Rd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):st(n.CULL_FACE),I=B}function et(B){B!==F&&(z&&n.lineWidth(B),F=B)}function nt(B,dt,vt){B?(K(n.POLYGON_OFFSET_FILL),(k!==dt||Z!==vt)&&(n.polygonOffset(dt,vt),k=dt,Z=vt)):st(n.POLYGON_OFFSET_FILL)}function lt(B){B?K(n.SCISSOR_TEST):st(n.SCISSOR_TEST)}function It(B){B===void 0&&(B=n.TEXTURE0+O-1),G!==B&&(n.activeTexture(B),G=B)}function Xt(B,dt,vt){vt===void 0&&(G===null?vt=n.TEXTURE0+O-1:vt=G);let Pt=H[vt];Pt===void 0&&(Pt={type:void 0,texture:void 0},H[vt]=Pt),(Pt.type!==B||Pt.texture!==dt)&&(G!==vt&&(n.activeTexture(vt),G=vt),n.bindTexture(B,dt||q[B]),Pt.type=B,Pt.texture=dt)}function R(){const B=H[G];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function b(){try{n.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function V(){try{n.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function tt(){try{n.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function J(){try{n.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function gt(){try{n.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ot(){try{n.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xt(){try{n.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function pt(){try{n.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ht(){try{n.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _t(B){rt.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),rt.copy(B))}function Lt(B){mt.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),mt.copy(B))}function Ct(B,dt){let vt=l.get(dt);vt===void 0&&(vt=new WeakMap,l.set(dt,vt));let Pt=vt.get(B);Pt===void 0&&(Pt=n.getUniformBlockIndex(dt,B.name),vt.set(B,Pt))}function Mt(B,dt){const Pt=l.get(dt).get(B);c.get(dt)!==Pt&&(n.uniformBlockBinding(dt,Pt,B.__bindingPointIndex),c.set(dt,Pt))}function qt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},G=null,H={},u={},f=new WeakMap,d=[],x=null,m=!1,p=null,g=null,v=null,M=null,_=null,S=null,w=null,A=new Wt(0,0,0),D=0,y=!1,E=null,I=null,F=null,k=null,Z=null,rt.set(0,0,n.canvas.width,n.canvas.height),mt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:st,bindFramebuffer:at,drawBuffers:ct,useProgram:Ot,setBlending:ie,setMaterial:Ht,setFlipSided:St,setCullFace:At,setLineWidth:et,setPolygonOffset:nt,setScissorTest:lt,activeTexture:It,bindTexture:Xt,unbindTexture:R,compressedTexImage2D:b,compressedTexImage3D:V,texImage2D:pt,texImage3D:ht,updateUBOMapping:Ct,uniformBlockBinding:Mt,texStorage2D:ot,texStorage3D:xt,texSubImage2D:tt,texSubImage3D:J,compressedTexSubImage2D:Y,compressedTexSubImage3D:gt,scissor:_t,viewport:Lt,reset:qt}}function lM(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Tt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,b){return d?new OffscreenCanvas(R,b):_o("canvas")}function m(R,b,V){let tt=1;const J=Xt(R);if((J.width>V||J.height>V)&&(tt=V/Math.max(J.width,J.height)),tt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Y=Math.floor(tt*J.width),gt=Math.floor(tt*J.height);u===void 0&&(u=x(Y,gt));const ot=b?x(Y,gt):u;return ot.width=Y,ot.height=gt,ot.getContext("2d").drawImage(R,0,0,Y,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+gt+")."),ot}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),R;return R}function p(R){return R.generateMipmaps}function g(R){n.generateMipmap(R)}function v(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(R,b,V,tt,J=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Y=b;if(b===n.RED&&(V===n.FLOAT&&(Y=n.R32F),V===n.HALF_FLOAT&&(Y=n.R16F),V===n.UNSIGNED_BYTE&&(Y=n.R8)),b===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.R8UI),V===n.UNSIGNED_SHORT&&(Y=n.R16UI),V===n.UNSIGNED_INT&&(Y=n.R32UI),V===n.BYTE&&(Y=n.R8I),V===n.SHORT&&(Y=n.R16I),V===n.INT&&(Y=n.R32I)),b===n.RG&&(V===n.FLOAT&&(Y=n.RG32F),V===n.HALF_FLOAT&&(Y=n.RG16F),V===n.UNSIGNED_BYTE&&(Y=n.RG8)),b===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.RG8UI),V===n.UNSIGNED_SHORT&&(Y=n.RG16UI),V===n.UNSIGNED_INT&&(Y=n.RG32UI),V===n.BYTE&&(Y=n.RG8I),V===n.SHORT&&(Y=n.RG16I),V===n.INT&&(Y=n.RG32I)),b===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),V===n.UNSIGNED_INT&&(Y=n.RGB32UI),V===n.BYTE&&(Y=n.RGB8I),V===n.SHORT&&(Y=n.RGB16I),V===n.INT&&(Y=n.RGB32I)),b===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),V===n.UNSIGNED_INT&&(Y=n.RGBA32UI),V===n.BYTE&&(Y=n.RGBA8I),V===n.SHORT&&(Y=n.RGBA16I),V===n.INT&&(Y=n.RGBA32I)),b===n.RGB&&(V===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),V===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),b===n.RGBA){const gt=J?go:ce.getTransfer(tt);V===n.FLOAT&&(Y=n.RGBA32F),V===n.HALF_FLOAT&&(Y=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Y=gt===de?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function _(R,b){let V;return R?b===null||b===Ni||b===hr?V=n.DEPTH24_STENCIL8:b===Cn?V=n.DEPTH32F_STENCIL8:b===lr&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Ni||b===hr?V=n.DEPTH_COMPONENT24:b===Cn?V=n.DEPTH_COMPONENT32F:b===lr&&(V=n.DEPTH_COMPONENT16),V}function S(R,b){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==cn&&R.minFilter!==Sn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function w(R){const b=R.target;b.removeEventListener("dispose",w),D(b),b.isVideoTexture&&h.delete(b)}function A(R){const b=R.target;b.removeEventListener("dispose",A),E(b)}function D(R){const b=i.get(R);if(b.__webglInit===void 0)return;const V=R.source,tt=f.get(V);if(tt){const J=tt[b.__cacheKey];J.usedTimes--,J.usedTimes===0&&y(R),Object.keys(tt).length===0&&f.delete(V)}i.remove(R)}function y(R){const b=i.get(R);n.deleteTexture(b.__webglTexture);const V=R.source,tt=f.get(V);delete tt[b.__cacheKey],o.memory.textures--}function E(R){const b=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(b.__webglFramebuffer[tt]))for(let J=0;J<b.__webglFramebuffer[tt].length;J++)n.deleteFramebuffer(b.__webglFramebuffer[tt][J]);else n.deleteFramebuffer(b.__webglFramebuffer[tt]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[tt])}else{if(Array.isArray(b.__webglFramebuffer))for(let tt=0;tt<b.__webglFramebuffer.length;tt++)n.deleteFramebuffer(b.__webglFramebuffer[tt]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let tt=0;tt<b.__webglColorRenderbuffer.length;tt++)b.__webglColorRenderbuffer[tt]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[tt]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const V=R.textures;for(let tt=0,J=V.length;tt<J;tt++){const Y=i.get(V[tt]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(V[tt])}i.remove(R)}let I=0;function F(){I=0}function k(){const R=I;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),I+=1,R}function Z(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function O(R,b){const V=i.get(R);if(R.isVideoTexture&&lt(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&V.__version!==R.version){const tt=R.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(V,R,b);return}}else R.isExternalTexture&&(V.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+b)}function z(R,b){const V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){q(V,R,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+b)}function C(R,b){const V=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&V.__version!==R.version){q(V,R,b);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+b)}function P(R,b){const V=i.get(R);if(R.version>0&&V.__version!==R.version){K(V,R,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+b)}const G={[$n]:n.REPEAT,[Ci]:n.CLAMP_TO_EDGE,[ac]:n.MIRRORED_REPEAT},H={[cn]:n.NEAREST,[ep]:n.NEAREST_MIPMAP_NEAREST,[Rr]:n.NEAREST_MIPMAP_LINEAR,[Sn]:n.LINEAR,[Zo]:n.LINEAR_MIPMAP_NEAREST,[Pi]:n.LINEAR_MIPMAP_LINEAR},N={[rp]:n.NEVER,[up]:n.ALWAYS,[op]:n.LESS,[tf]:n.LEQUAL,[ap]:n.EQUAL,[hp]:n.GEQUAL,[cp]:n.GREATER,[lp]:n.NOTEQUAL};function $(R,b){if(b.type===Cn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Sn||b.magFilter===Zo||b.magFilter===Rr||b.magFilter===Pi||b.minFilter===Sn||b.minFilter===Zo||b.minFilter===Rr||b.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,G[b.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,G[b.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,G[b.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,H[b.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,H[b.minFilter]),b.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,N[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===cn||b.minFilter!==Rr&&b.minFilter!==Pi||b.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function rt(R,b){let V=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",w));const tt=b.source;let J=f.get(tt);J===void 0&&(J={},f.set(tt,J));const Y=Z(b);if(Y!==R.__cacheKey){J[Y]===void 0&&(J[Y]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),J[Y].usedTimes++;const gt=J[R.__cacheKey];gt!==void 0&&(J[R.__cacheKey].usedTimes--,gt.usedTimes===0&&y(b)),R.__cacheKey=Y,R.__webglTexture=J[Y].texture}return V}function mt(R,b,V){return Math.floor(Math.floor(R/V)/b)}function Et(R,b,V,tt){const Y=R.updateRanges;if(Y.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,V,tt,b.data);else{Y.sort((ht,_t)=>ht.start-_t.start);let gt=0;for(let ht=1;ht<Y.length;ht++){const _t=Y[gt],Lt=Y[ht],Ct=_t.start+_t.count,Mt=mt(Lt.start,b.width,4),qt=mt(_t.start,b.width,4);Lt.start<=Ct+1&&Mt===qt&&mt(Lt.start+Lt.count-1,b.width,4)===Mt?_t.count=Math.max(_t.count,Lt.start+Lt.count-_t.start):(++gt,Y[gt]=Lt)}Y.length=gt+1;const ot=n.getParameter(n.UNPACK_ROW_LENGTH),xt=n.getParameter(n.UNPACK_SKIP_PIXELS),pt=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let ht=0,_t=Y.length;ht<_t;ht++){const Lt=Y[ht],Ct=Math.floor(Lt.start/4),Mt=Math.ceil(Lt.count/4),qt=Ct%b.width,B=Math.floor(Ct/b.width),dt=Mt,vt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,qt),n.pixelStorei(n.UNPACK_SKIP_ROWS,B),e.texSubImage2D(n.TEXTURE_2D,0,qt,B,dt,vt,V,tt,b.data)}R.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ot),n.pixelStorei(n.UNPACK_SKIP_PIXELS,xt),n.pixelStorei(n.UNPACK_SKIP_ROWS,pt)}}function q(R,b,V){let tt=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(tt=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(tt=n.TEXTURE_3D);const J=rt(R,b),Y=b.source;e.bindTexture(tt,R.__webglTexture,n.TEXTURE0+V);const gt=i.get(Y);if(Y.version!==gt.__version||J===!0){e.activeTexture(n.TEXTURE0+V);const ot=ce.getPrimaries(ce.workingColorSpace),xt=b.colorSpace===oi?null:ce.getPrimaries(b.colorSpace),pt=b.colorSpace===oi||ot===xt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);let ht=m(b.image,!1,s.maxTextureSize);ht=It(b,ht);const _t=r.convert(b.format,b.colorSpace),Lt=r.convert(b.type);let Ct=M(b.internalFormat,_t,Lt,b.colorSpace,b.isVideoTexture);$(tt,b);let Mt;const qt=b.mipmaps,B=b.isVideoTexture!==!0,dt=gt.__version===void 0||J===!0,vt=Y.dataReady,Pt=S(b,ht);if(b.isDepthTexture)Ct=_(b.format===fr,b.type),dt&&(B?e.texStorage2D(n.TEXTURE_2D,1,Ct,ht.width,ht.height):e.texImage2D(n.TEXTURE_2D,0,Ct,ht.width,ht.height,0,_t,Lt,null));else if(b.isDataTexture)if(qt.length>0){B&&dt&&e.texStorage2D(n.TEXTURE_2D,Pt,Ct,qt[0].width,qt[0].height);for(let ut=0,it=qt.length;ut<it;ut++)Mt=qt[ut],B?vt&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,_t,Lt,Mt.data):e.texImage2D(n.TEXTURE_2D,ut,Ct,Mt.width,Mt.height,0,_t,Lt,Mt.data);b.generateMipmaps=!1}else B?(dt&&e.texStorage2D(n.TEXTURE_2D,Pt,Ct,ht.width,ht.height),vt&&Et(b,ht,_t,Lt)):e.texImage2D(n.TEXTURE_2D,0,Ct,ht.width,ht.height,0,_t,Lt,ht.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){B&&dt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Pt,Ct,qt[0].width,qt[0].height,ht.depth);for(let ut=0,it=qt.length;ut<it;ut++)if(Mt=qt[ut],b.format!==wn)if(_t!==null)if(B){if(vt)if(b.layerUpdates.size>0){const Dt=Uh(Mt.width,Mt.height,b.format,b.type);for(const Kt of b.layerUpdates){const ge=Mt.data.subarray(Kt*Dt/Mt.data.BYTES_PER_ELEMENT,(Kt+1)*Dt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,Kt,Mt.width,Mt.height,1,_t,ge)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,Mt.width,Mt.height,ht.depth,_t,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ut,Ct,Mt.width,Mt.height,ht.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?vt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,Mt.width,Mt.height,ht.depth,_t,Lt,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ut,Ct,Mt.width,Mt.height,ht.depth,0,_t,Lt,Mt.data)}else{B&&dt&&e.texStorage2D(n.TEXTURE_2D,Pt,Ct,qt[0].width,qt[0].height);for(let ut=0,it=qt.length;ut<it;ut++)Mt=qt[ut],b.format!==wn?_t!==null?B?vt&&e.compressedTexSubImage2D(n.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,_t,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,ut,Ct,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?vt&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,_t,Lt,Mt.data):e.texImage2D(n.TEXTURE_2D,ut,Ct,Mt.width,Mt.height,0,_t,Lt,Mt.data)}else if(b.isDataArrayTexture)if(B){if(dt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Pt,Ct,ht.width,ht.height,ht.depth),vt)if(b.layerUpdates.size>0){const ut=Uh(ht.width,ht.height,b.format,b.type);for(const it of b.layerUpdates){const Dt=ht.data.subarray(it*ut/ht.data.BYTES_PER_ELEMENT,(it+1)*ut/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,it,ht.width,ht.height,1,_t,Lt,Dt)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,_t,Lt,ht.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ct,ht.width,ht.height,ht.depth,0,_t,Lt,ht.data);else if(b.isData3DTexture)B?(dt&&e.texStorage3D(n.TEXTURE_3D,Pt,Ct,ht.width,ht.height,ht.depth),vt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,_t,Lt,ht.data)):e.texImage3D(n.TEXTURE_3D,0,Ct,ht.width,ht.height,ht.depth,0,_t,Lt,ht.data);else if(b.isFramebufferTexture){if(dt)if(B)e.texStorage2D(n.TEXTURE_2D,Pt,Ct,ht.width,ht.height);else{let ut=ht.width,it=ht.height;for(let Dt=0;Dt<Pt;Dt++)e.texImage2D(n.TEXTURE_2D,Dt,Ct,ut,it,0,_t,Lt,null),ut>>=1,it>>=1}}else if(qt.length>0){if(B&&dt){const ut=Xt(qt[0]);e.texStorage2D(n.TEXTURE_2D,Pt,Ct,ut.width,ut.height)}for(let ut=0,it=qt.length;ut<it;ut++)Mt=qt[ut],B?vt&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,_t,Lt,Mt):e.texImage2D(n.TEXTURE_2D,ut,Ct,_t,Lt,Mt);b.generateMipmaps=!1}else if(B){if(dt){const ut=Xt(ht);e.texStorage2D(n.TEXTURE_2D,Pt,Ct,ut.width,ut.height)}vt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,_t,Lt,ht)}else e.texImage2D(n.TEXTURE_2D,0,Ct,_t,Lt,ht);p(b)&&g(tt),gt.__version=Y.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function K(R,b,V){if(b.image.length!==6)return;const tt=rt(R,b),J=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+V);const Y=i.get(J);if(J.version!==Y.__version||tt===!0){e.activeTexture(n.TEXTURE0+V);const gt=ce.getPrimaries(ce.workingColorSpace),ot=b.colorSpace===oi?null:ce.getPrimaries(b.colorSpace),xt=b.colorSpace===oi||gt===ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const pt=b.isCompressedTexture||b.image[0].isCompressedTexture,ht=b.image[0]&&b.image[0].isDataTexture,_t=[];for(let it=0;it<6;it++)!pt&&!ht?_t[it]=m(b.image[it],!0,s.maxCubemapSize):_t[it]=ht?b.image[it].image:b.image[it],_t[it]=It(b,_t[it]);const Lt=_t[0],Ct=r.convert(b.format,b.colorSpace),Mt=r.convert(b.type),qt=M(b.internalFormat,Ct,Mt,b.colorSpace),B=b.isVideoTexture!==!0,dt=Y.__version===void 0||tt===!0,vt=J.dataReady;let Pt=S(b,Lt);$(n.TEXTURE_CUBE_MAP,b);let ut;if(pt){B&&dt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Pt,qt,Lt.width,Lt.height);for(let it=0;it<6;it++){ut=_t[it].mipmaps;for(let Dt=0;Dt<ut.length;Dt++){const Kt=ut[Dt];b.format!==wn?Ct!==null?B?vt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,0,0,Kt.width,Kt.height,Ct,Kt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,qt,Kt.width,Kt.height,0,Kt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,0,0,Kt.width,Kt.height,Ct,Mt,Kt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt,qt,Kt.width,Kt.height,0,Ct,Mt,Kt.data)}}}else{if(ut=b.mipmaps,B&&dt){ut.length>0&&Pt++;const it=Xt(_t[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Pt,qt,it.width,it.height)}for(let it=0;it<6;it++)if(ht){B?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,_t[it].width,_t[it].height,Ct,Mt,_t[it].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,qt,_t[it].width,_t[it].height,0,Ct,Mt,_t[it].data);for(let Dt=0;Dt<ut.length;Dt++){const ge=ut[Dt].image[it].image;B?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,0,0,ge.width,ge.height,Ct,Mt,ge.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,qt,ge.width,ge.height,0,Ct,Mt,ge.data)}}else{B?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Ct,Mt,_t[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,qt,Ct,Mt,_t[it]);for(let Dt=0;Dt<ut.length;Dt++){const Kt=ut[Dt];B?vt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,0,0,Ct,Mt,Kt.image[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,Dt+1,qt,Ct,Mt,Kt.image[it])}}}p(b)&&g(n.TEXTURE_CUBE_MAP),Y.__version=J.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function st(R,b,V,tt,J,Y){const gt=r.convert(V.format,V.colorSpace),ot=r.convert(V.type),xt=M(V.internalFormat,gt,ot,V.colorSpace),pt=i.get(b),ht=i.get(V);if(ht.__renderTarget=b,!pt.__hasExternalTextures){const _t=Math.max(1,b.width>>Y),Lt=Math.max(1,b.height>>Y);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?e.texImage3D(J,Y,xt,_t,Lt,b.depth,0,gt,ot,null):e.texImage2D(J,Y,xt,_t,Lt,0,gt,ot,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),nt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,J,ht.__webglTexture,0,et(b)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,tt,J,ht.__webglTexture,Y),e.bindFramebuffer(n.FRAMEBUFFER,null)}function at(R,b,V){if(n.bindRenderbuffer(n.RENDERBUFFER,R),b.depthBuffer){const tt=b.depthTexture,J=tt&&tt.isDepthTexture?tt.type:null,Y=_(b.stencilBuffer,J),gt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ot=et(b);nt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ot,Y,b.width,b.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,Y,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Y,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,R)}else{const tt=b.textures;for(let J=0;J<tt.length;J++){const Y=tt[J],gt=r.convert(Y.format,Y.colorSpace),ot=r.convert(Y.type),xt=M(Y.internalFormat,gt,ot,Y.colorSpace),pt=et(b);V&&nt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,xt,b.width,b.height):nt(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,xt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,xt,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ct(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=i.get(b.depthTexture);tt.__renderTarget=b,(!tt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),O(b.depthTexture,0);const J=tt.__webglTexture,Y=et(b);if(b.depthTexture.format===ur)nt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(b.depthTexture.format===fr)nt(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ot(R){const b=i.get(R),V=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const tt=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),tt){const J=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,tt.removeEventListener("dispose",J)};tt.addEventListener("dispose",J),b.__depthDisposeCallback=J}b.__boundDepthTexture=tt}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const tt=R.texture.mipmaps;tt&&tt.length>0?ct(b.__webglFramebuffer[0],R):ct(b.__webglFramebuffer,R)}else if(V){b.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[tt]),b.__webglDepthbuffer[tt]===void 0)b.__webglDepthbuffer[tt]=n.createRenderbuffer(),at(b.__webglDepthbuffer[tt],R,!1);else{const J=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=b.__webglDepthbuffer[tt];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Y)}}else{const tt=R.texture.mipmaps;if(tt&&tt.length>0?e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),at(b.__webglDepthbuffer,R,!1);else{const J=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,Y)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(R,b,V){const tt=i.get(R);b!==void 0&&st(tt.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&Ot(R)}function U(R){const b=R.texture,V=i.get(R),tt=i.get(b);R.addEventListener("dispose",A);const J=R.textures,Y=R.isWebGLCubeRenderTarget===!0,gt=J.length>1;if(gt||(tt.__webglTexture===void 0&&(tt.__webglTexture=n.createTexture()),tt.__version=b.version,o.memory.textures++),Y){V.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer[ot]=[];for(let xt=0;xt<b.mipmaps.length;xt++)V.__webglFramebuffer[ot][xt]=n.createFramebuffer()}else V.__webglFramebuffer[ot]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){V.__webglFramebuffer=[];for(let ot=0;ot<b.mipmaps.length;ot++)V.__webglFramebuffer[ot]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(gt)for(let ot=0,xt=J.length;ot<xt;ot++){const pt=i.get(J[ot]);pt.__webglTexture===void 0&&(pt.__webglTexture=n.createTexture(),o.memory.textures++)}if(R.samples>0&&nt(R)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let ot=0;ot<J.length;ot++){const xt=J[ot];V.__webglColorRenderbuffer[ot]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[ot]);const pt=r.convert(xt.format,xt.colorSpace),ht=r.convert(xt.type),_t=M(xt.internalFormat,pt,ht,xt.colorSpace,R.isXRRenderTarget===!0),Lt=et(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Lt,_t,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ot,n.RENDERBUFFER,V.__webglColorRenderbuffer[ot])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),at(V.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){e.bindTexture(n.TEXTURE_CUBE_MAP,tt.__webglTexture),$(n.TEXTURE_CUBE_MAP,b);for(let ot=0;ot<6;ot++)if(b.mipmaps&&b.mipmaps.length>0)for(let xt=0;xt<b.mipmaps.length;xt++)st(V.__webglFramebuffer[ot][xt],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,xt);else st(V.__webglFramebuffer[ot],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);p(b)&&g(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let ot=0,xt=J.length;ot<xt;ot++){const pt=J[ot],ht=i.get(pt);let _t=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(_t=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(_t,ht.__webglTexture),$(_t,pt),st(V.__webglFramebuffer,R,pt,n.COLOR_ATTACHMENT0+ot,_t,0),p(pt)&&g(_t)}e.unbindTexture()}else{let ot=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ot=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ot,tt.__webglTexture),$(ot,b),b.mipmaps&&b.mipmaps.length>0)for(let xt=0;xt<b.mipmaps.length;xt++)st(V.__webglFramebuffer[xt],R,b,n.COLOR_ATTACHMENT0,ot,xt);else st(V.__webglFramebuffer,R,b,n.COLOR_ATTACHMENT0,ot,0);p(b)&&g(ot),e.unbindTexture()}R.depthBuffer&&Ot(R)}function ie(R){const b=R.textures;for(let V=0,tt=b.length;V<tt;V++){const J=b[V];if(p(J)){const Y=v(R),gt=i.get(J).__webglTexture;e.bindTexture(Y,gt),g(Y),e.unbindTexture()}}}const Ht=[],St=[];function At(R){if(R.samples>0){if(nt(R)===!1){const b=R.textures,V=R.width,tt=R.height;let J=n.COLOR_BUFFER_BIT;const Y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(R),ot=b.length>1;if(ot)for(let pt=0;pt<b.length;pt++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const xt=R.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let pt=0;pt<b.length;pt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),ot){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[pt]);const ht=i.get(b[pt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ht,0)}n.blitFramebuffer(0,0,V,tt,0,0,V,tt,J,n.NEAREST),c===!0&&(Ht.length=0,St.length=0,Ht.push(n.COLOR_ATTACHMENT0+pt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ht.push(Y),St.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,St)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ht))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ot)for(let pt=0;pt<b.length;pt++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,gt.__webglColorRenderbuffer[pt]);const ht=i.get(b[pt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,ht,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const b=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function et(R){return Math.min(s.maxSamples,R.samples)}function nt(R){const b=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function lt(R){const b=o.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function It(R,b){const V=R.colorSpace,tt=R.format,J=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||V!==Ps&&V!==oi&&(ce.getTransfer(V)===de?(tt!==wn||J!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),b}function Xt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=F,this.setTexture2D=O,this.setTexture2DArray=z,this.setTexture3D=C,this.setTextureCube=P,this.rebindTextures=Gt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=st,this.useMultisampledRTT=nt}function hM(n,t){function e(i,s=oi){let r;const o=ce.getTransfer(s);if(i===Ln)return n.UNSIGNED_BYTE;if(i===ol)return n.UNSIGNED_SHORT_4_4_4_4;if(i===al)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$u)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===qu)return n.BYTE;if(i===Zu)return n.SHORT;if(i===lr)return n.UNSIGNED_SHORT;if(i===rl)return n.INT;if(i===Ni)return n.UNSIGNED_INT;if(i===Cn)return n.FLOAT;if(i===wr)return n.HALF_FLOAT;if(i===Ku)return n.ALPHA;if(i===Ju)return n.RGB;if(i===wn)return n.RGBA;if(i===ur)return n.DEPTH_COMPONENT;if(i===fr)return n.DEPTH_STENCIL;if(i===cl)return n.RED;if(i===ll)return n.RED_INTEGER;if(i===ju)return n.RG;if(i===hl)return n.RG_INTEGER;if(i===ul)return n.RGBA_INTEGER;if(i===co||i===lo||i===ho||i===uo)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===co)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===co)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===lo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===uo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===cc||i===lc||i===hc||i===uc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===cc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===lc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===hc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===uc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===fc||i===dc||i===pc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===fc||i===dc)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===pc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===mc||i===gc||i===xc||i===_c||i===Mc||i===vc||i===yc||i===Sc||i===wc||i===bc||i===Ec||i===Tc||i===Ac||i===Rc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===mc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_c)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===wc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ec)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ac)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Rc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cc||i===Pc||i===zc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Cc)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Pc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===zc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dc||i===Ic||i===Lc||i===Uc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Dc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Lc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Uc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const uM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fM=`
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

}`;class dM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new xf(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new pi({vertexShader:uM,fragmentShader:fM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new br(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class pM extends Us{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,x=null;const m=typeof XRWebGLBinding<"u",p=new dM,g={},v=e.getContextAttributes();let M=null,_=null;const S=[],w=[],A=new Tt;let D=null;const y=new yn;y.viewport=new Te;const E=new yn;E.viewport=new Te;const I=[y,E],F=new Dm;let k=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let K=S[q];return K===void 0&&(K=new ga,S[q]=K),K.getTargetRaySpace()},this.getControllerGrip=function(q){let K=S[q];return K===void 0&&(K=new ga,S[q]=K),K.getGripSpace()},this.getHand=function(q){let K=S[q];return K===void 0&&(K=new ga,S[q]=K),K.getHandSpace()};function O(q){const K=w.indexOf(q.inputSource);if(K===-1)return;const st=S[K];st!==void 0&&(st.update(q.inputSource,q.frame,l||o),st.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",C);for(let q=0;q<S.length;q++){const K=w[q];K!==null&&(w[q]=null,S[q].disconnect(K))}k=null,Z=null,p.reset();for(const q in g)delete g[q];t.setRenderTarget(M),d=null,f=null,u=null,s=null,_=null,Et.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",z),s.addEventListener("inputsourceschange",C),v.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(A),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let st=null,at=null,ct=null;v.depth&&(ct=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=v.stencil?fr:ur,at=v.stencil?hr:Ni);const Ot={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ot),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Fi(f.textureWidth,f.textureHeight,{format:wn,type:Ln,depthTexture:new gf(f.textureWidth,f.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const st={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Fi(d.framebufferWidth,d.framebufferHeight,{format:wn,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function C(q){for(let K=0;K<q.removed.length;K++){const st=q.removed[K],at=w.indexOf(st);at>=0&&(w[at]=null,S[at].disconnect(st))}for(let K=0;K<q.added.length;K++){const st=q.added[K];let at=w.indexOf(st);if(at===-1){for(let Ot=0;Ot<S.length;Ot++)if(Ot>=w.length){w.push(st),at=Ot;break}else if(w[Ot]===null){w[Ot]=st,at=Ot;break}if(at===-1)break}const ct=S[at];ct&&ct.connect(st)}}const P=new L,G=new L;function H(q,K,st){P.setFromMatrixPosition(K.matrixWorld),G.setFromMatrixPosition(st.matrixWorld);const at=P.distanceTo(G),ct=K.projectionMatrix.elements,Ot=st.projectionMatrix.elements,Gt=ct[14]/(ct[10]-1),U=ct[14]/(ct[10]+1),ie=(ct[9]+1)/ct[5],Ht=(ct[9]-1)/ct[5],St=(ct[8]-1)/ct[0],At=(Ot[8]+1)/Ot[0],et=Gt*St,nt=Gt*At,lt=at/(-St+At),It=lt*-St;if(K.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(It),q.translateZ(lt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ct[10]===-1)q.projectionMatrix.copy(K.projectionMatrix),q.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Xt=Gt+lt,R=U+lt,b=et-It,V=nt+(at-It),tt=ie*U/R*Xt,J=Ht*U/R*Xt;q.projectionMatrix.makePerspective(b,V,tt,J,Xt,R),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function N(q,K){K===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(K.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let K=q.near,st=q.far;p.texture!==null&&(p.depthNear>0&&(K=p.depthNear),p.depthFar>0&&(st=p.depthFar)),F.near=E.near=y.near=K,F.far=E.far=y.far=st,(k!==F.near||Z!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),k=F.near,Z=F.far),F.layers.mask=q.layers.mask|6,y.layers.mask=F.layers.mask&3,E.layers.mask=F.layers.mask&5;const at=q.parent,ct=F.cameras;N(F,at);for(let Ot=0;Ot<ct.length;Ot++)N(ct[Ot],at);ct.length===2?H(F,y,E):F.projectionMatrix.copy(y.projectionMatrix),$(q,F,at)};function $(q,K,st){st===null?q.matrix.copy(K.matrixWorld):(q.matrix.copy(st.matrixWorld),q.matrix.invert(),q.matrix.multiply(K.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(K.projectionMatrix),q.projectionMatrixInverse.copy(K.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Fc*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(q){return g[q]};let rt=null;function mt(q,K){if(h=K.getViewerPose(l||o),x=K,h!==null){const st=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let at=!1;st.length!==F.cameras.length&&(F.cameras.length=0,at=!0);for(let U=0;U<st.length;U++){const ie=st[U];let Ht=null;if(d!==null)Ht=d.getViewport(ie);else{const At=u.getViewSubImage(f,ie);Ht=At.viewport,U===0&&(t.setRenderTargetTextures(_,At.colorTexture,At.depthStencilTexture),t.setRenderTarget(_))}let St=I[U];St===void 0&&(St=new yn,St.layers.enable(U),St.viewport=new Te,I[U]=St),St.matrix.fromArray(ie.transform.matrix),St.matrix.decompose(St.position,St.quaternion,St.scale),St.projectionMatrix.fromArray(ie.projectionMatrix),St.projectionMatrixInverse.copy(St.projectionMatrix).invert(),St.viewport.set(Ht.x,Ht.y,Ht.width,Ht.height),U===0&&(F.matrix.copy(St.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),at===!0&&F.cameras.push(St)}const ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&m){u=i.getBinding();const U=u.getDepthInformation(st[0]);U&&U.isValid&&U.texture&&p.init(U,s.renderState)}if(ct&&ct.includes("camera-access")&&m){t.state.unbindTexture(),u=i.getBinding();for(let U=0;U<st.length;U++){const ie=st[U].camera;if(ie){let Ht=g[ie];Ht||(Ht=new xf,g[ie]=Ht);const St=u.getCameraImage(ie);Ht.sourceTexture=St}}}}for(let st=0;st<S.length;st++){const at=w[st],ct=S[st];at!==null&&ct!==void 0&&ct.update(at,K,l||o)}rt&&rt(q,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),x=null}const Et=new Af;Et.setAnimationLoop(mt),this.setAnimationLoop=function(q){rt=q},this.dispose=function(){}}}const wi=new bn,mM=new se;function gM(n,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,lf(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,v,M,_){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(p,g):g.isMeshToonMaterial?(r(p,g),u(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g)):g.isMeshStandardMaterial?(r(p,g),f(p,g),g.isMeshPhysicalMaterial&&d(p,g,_)):g.isMeshMatcapMaterial?(r(p,g),x(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),m(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?c(p,g,v,M):g.isSpriteMaterial?l(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===$e&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===$e&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);const v=t.get(g),M=v.envMap,_=v.envMapRotation;M&&(p.envMap.value=M,wi.copy(_),wi.x*=-1,wi.y*=-1,wi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),p.envMapRotation.value.setFromMatrix4(mM.makeRotationFromEuler(wi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function c(p,g,v,M){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=M*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function l(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function d(p,g,v){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===$e&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,g){g.matcap&&(p.matcap.value=g.matcap)}function m(p,g){const v=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function xM(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,M){const _=M.program;i.uniformBlockBinding(v,_)}function l(v,M){let _=s[v.id];_===void 0&&(x(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",p));const S=M.program;i.updateUBOMapping(v,S);const w=t.render.frame;r[v.id]!==w&&(f(v),r[v.id]=w)}function h(v){const M=u();v.__bindingPointIndex=M;const _=n.createBuffer(),S=v.__size,w=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,S,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const M=s[v.id],_=v.uniforms,S=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let w=0,A=_.length;w<A;w++){const D=Array.isArray(_[w])?_[w]:[_[w]];for(let y=0,E=D.length;y<E;y++){const I=D[y];if(d(I,w,y,S)===!0){const F=I.__offset,k=Array.isArray(I.value)?I.value:[I.value];let Z=0;for(let O=0;O<k.length;O++){const z=k[O],C=m(z);typeof z=="number"||typeof z=="boolean"?(I.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,F+Z,I.__data)):z.isMatrix3?(I.__data[0]=z.elements[0],I.__data[1]=z.elements[1],I.__data[2]=z.elements[2],I.__data[3]=0,I.__data[4]=z.elements[3],I.__data[5]=z.elements[4],I.__data[6]=z.elements[5],I.__data[7]=0,I.__data[8]=z.elements[6],I.__data[9]=z.elements[7],I.__data[10]=z.elements[8],I.__data[11]=0):(z.toArray(I.__data,Z),Z+=C.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(v,M,_,S){const w=v.value,A=M+"_"+_;if(S[A]===void 0)return typeof w=="number"||typeof w=="boolean"?S[A]=w:S[A]=w.clone(),!0;{const D=S[A];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return S[A]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function x(v){const M=v.uniforms;let _=0;const S=16;for(let A=0,D=M.length;A<D;A++){const y=Array.isArray(M[A])?M[A]:[M[A]];for(let E=0,I=y.length;E<I;E++){const F=y[E],k=Array.isArray(F.value)?F.value:[F.value];for(let Z=0,O=k.length;Z<O;Z++){const z=k[Z],C=m(z),P=_%S,G=P%C.boundary,H=P+G;_+=G,H!==0&&S-H<C.storage&&(_+=S-H),F.__data=new Float32Array(C.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=_,_+=C.storage}}}const w=_%S;return w>0&&(_+=S-w),v.__size=_,v.__cache={},this}function m(v){const M={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(M.boundary=4,M.storage=4):v.isVector2?(M.boundary=8,M.storage=8):v.isVector3||v.isColor?(M.boundary=16,M.storage=12):v.isVector4?(M.boundary=16,M.storage=16):v.isMatrix3?(M.boundary=48,M.storage=48):v.isMatrix4?(M.boundary=64,M.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),M}function p(v){const M=v.target;M.removeEventListener("dispose",p);const _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function g(){for(const v in s)n.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:g}}class _M{constructor(t={}){const{canvas:e=dp(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const x=new Uint32Array(4),m=new Int32Array(4);let p=null,g=null;const v=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let S=!1;this._outputColorSpace=Ie;let w=0,A=0,D=null,y=-1,E=null;const I=new Te,F=new Te;let k=null;const Z=new Wt(0);let O=0,z=e.width,C=e.height,P=1,G=null,H=null;const N=new Te(0,0,z,C),$=new Te(0,0,z,C);let rt=!1;const mt=new Do;let Et=!1,q=!1;const K=new se,st=new L,at=new Te,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ot=!1;function Gt(){return D===null?P:1}let U=i;function ie(T,W){return e.getContext(T,W)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sl}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",Pt,!1),e.addEventListener("webglcontextcreationerror",ut,!1),U===null){const W="webgl2";if(U=ie(W,T),U===null)throw ie(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ht,St,At,et,nt,lt,It,Xt,R,b,V,tt,J,Y,gt,ot,xt,pt,ht,_t,Lt,Ct,Mt,qt;function B(){Ht=new Rx(U),Ht.init(),Ct=new hM(U,Ht),St=new yx(U,Ht,t,Ct),At=new cM(U,Ht),St.reversedDepthBuffer&&f&&At.buffers.depth.setReversed(!0),et=new zx(U),nt=new $_,lt=new lM(U,Ht,At,nt,St,Ct,et),It=new wx(_),Xt=new Ax(_),R=new Fm(U),Mt=new Mx(U,R),b=new Cx(U,R,et,Mt),V=new Ix(U,b,R,et),ht=new Dx(U,St,lt),ot=new Sx(nt),tt=new Y_(_,It,Xt,Ht,St,Mt,ot),J=new gM(_,nt),Y=new J_,gt=new iM(Ht),pt=new _x(_,It,Xt,At,V,d,c),xt=new oM(_,V,St),qt=new xM(U,et,St,At),_t=new vx(U,Ht,et),Lt=new Px(U,Ht,et),et.programs=tt.programs,_.capabilities=St,_.extensions=Ht,_.properties=nt,_.renderLists=Y,_.shadowMap=xt,_.state=At,_.info=et}B();const dt=new pM(_,U);this.xr=dt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=Ht.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ht.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(T){T!==void 0&&(P=T,this.setSize(z,C,!1))},this.getSize=function(T){return T.set(z,C)},this.setSize=function(T,W,j=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=T,C=W,e.width=Math.floor(T*P),e.height=Math.floor(W*P),j===!0&&(e.style.width=T+"px",e.style.height=W+"px"),this.setViewport(0,0,T,W)},this.getDrawingBufferSize=function(T){return T.set(z*P,C*P).floor()},this.setDrawingBufferSize=function(T,W,j){z=T,C=W,P=j,e.width=Math.floor(T*j),e.height=Math.floor(W*j),this.setViewport(0,0,T,W)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(N)},this.setViewport=function(T,W,j,Q){T.isVector4?N.set(T.x,T.y,T.z,T.w):N.set(T,W,j,Q),At.viewport(I.copy(N).multiplyScalar(P).round())},this.getScissor=function(T){return T.copy($)},this.setScissor=function(T,W,j,Q){T.isVector4?$.set(T.x,T.y,T.z,T.w):$.set(T,W,j,Q),At.scissor(F.copy($).multiplyScalar(P).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(T){At.setScissorTest(rt=T)},this.setOpaqueSort=function(T){G=T},this.setTransparentSort=function(T){H=T},this.getClearColor=function(T){return T.copy(pt.getClearColor())},this.setClearColor=function(){pt.setClearColor(...arguments)},this.getClearAlpha=function(){return pt.getClearAlpha()},this.setClearAlpha=function(){pt.setClearAlpha(...arguments)},this.clear=function(T=!0,W=!0,j=!0){let Q=0;if(T){let X=!1;if(D!==null){const ft=D.texture.format;X=ft===ul||ft===hl||ft===ll}if(X){const ft=D.texture.type,bt=ft===Ln||ft===Ni||ft===lr||ft===hr||ft===ol||ft===al,zt=pt.getClearColor(),Rt=pt.getClearAlpha(),Bt=zt.r,Zt=zt.g,Ut=zt.b;bt?(x[0]=Bt,x[1]=Zt,x[2]=Ut,x[3]=Rt,U.clearBufferuiv(U.COLOR,0,x)):(m[0]=Bt,m[1]=Zt,m[2]=Ut,m[3]=Rt,U.clearBufferiv(U.COLOR,0,m))}else Q|=U.COLOR_BUFFER_BIT}W&&(Q|=U.DEPTH_BUFFER_BIT),j&&(Q|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",Pt,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),pt.dispose(),Y.dispose(),gt.dispose(),nt.dispose(),It.dispose(),Xt.dispose(),V.dispose(),Mt.dispose(),qt.dispose(),tt.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",En),dt.removeEventListener("sessionend",Ol),gi.stop()};function vt(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Pt(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const T=et.autoReset,W=xt.enabled,j=xt.autoUpdate,Q=xt.needsUpdate,X=xt.type;B(),et.autoReset=T,xt.enabled=W,xt.autoUpdate=j,xt.needsUpdate=Q,xt.type=X}function ut(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function it(T){const W=T.target;W.removeEventListener("dispose",it),Dt(W)}function Dt(T){Kt(T),nt.remove(T)}function Kt(T){const W=nt.get(T).programs;W!==void 0&&(W.forEach(function(j){tt.releaseProgram(j)}),T.isShaderMaterial&&tt.releaseShaderCache(T))}this.renderBufferDirect=function(T,W,j,Q,X,ft){W===null&&(W=ct);const bt=X.isMesh&&X.matrixWorld.determinant()<0,zt=sd(T,W,j,Q,X);At.setMaterial(Q,bt);let Rt=j.index,Bt=1;if(Q.wireframe===!0){if(Rt=b.getWireframeAttribute(j),Rt===void 0)return;Bt=2}const Zt=j.drawRange,Ut=j.attributes.position;let ne=Zt.start*Bt,fe=(Zt.start+Zt.count)*Bt;ft!==null&&(ne=Math.max(ne,ft.start*Bt),fe=Math.min(fe,(ft.start+ft.count)*Bt)),Rt!==null?(ne=Math.max(ne,0),fe=Math.min(fe,Rt.count)):Ut!=null&&(ne=Math.max(ne,0),fe=Math.min(fe,Ut.count));const be=fe-ne;if(be<0||be===1/0)return;Mt.setup(X,Q,zt,j,Rt);let Me,me=_t;if(Rt!==null&&(Me=R.get(Rt),me=Lt,me.setIndex(Me)),X.isMesh)Q.wireframe===!0?(At.setLineWidth(Q.wireframeLinewidth*Gt()),me.setMode(U.LINES)):me.setMode(U.TRIANGLES);else if(X.isLine){let Ft=Q.linewidth;Ft===void 0&&(Ft=1),At.setLineWidth(Ft*Gt()),X.isLineSegments?me.setMode(U.LINES):X.isLineLoop?me.setMode(U.LINE_LOOP):me.setMode(U.LINE_STRIP)}else X.isPoints?me.setMode(U.POINTS):X.isSprite&&me.setMode(U.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)dr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),me.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))me.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Ft=X._multiDrawStarts,ve=X._multiDrawCounts,ae=X._multiDrawCount,Ke=Rt?R.get(Rt).bytesPerElement:1,Zi=nt.get(Q).currentProgram.getUniforms();for(let Je=0;Je<ae;Je++)Zi.setValue(U,"_gl_DrawID",Je),me.render(Ft[Je]/Ke,ve[Je])}else if(X.isInstancedMesh)me.renderInstances(ne,be,X.count);else if(j.isInstancedBufferGeometry){const Ft=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,ve=Math.min(j.instanceCount,Ft);me.renderInstances(ne,be,ve)}else me.render(ne,be)};function ge(T,W,j){T.transparent===!0&&T.side===Ce&&T.forceSinglePass===!1?(T.side=$e,T.needsUpdate=!0,Ar(T,W,j),T.side=di,T.needsUpdate=!0,Ar(T,W,j),T.side=Ce):Ar(T,W,j)}this.compile=function(T,W,j=null){j===null&&(j=T),g=gt.get(j),g.init(W),M.push(g),j.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),T!==j&&T.traverseVisible(function(X){X.isLight&&X.layers.test(W.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),g.setupLights();const Q=new Set;return T.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ft=X.material;if(ft)if(Array.isArray(ft))for(let bt=0;bt<ft.length;bt++){const zt=ft[bt];ge(zt,j,X),Q.add(zt)}else ge(ft,j,X),Q.add(ft)}),g=M.pop(),Q},this.compileAsync=function(T,W,j=null){const Q=this.compile(T,W,j);return new Promise(X=>{function ft(){if(Q.forEach(function(bt){nt.get(bt).currentProgram.isReady()&&Q.delete(bt)}),Q.size===0){X(T);return}setTimeout(ft,10)}Ht.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let ue=null;function Fn(T){ue&&ue(T)}function En(){gi.stop()}function Ol(){gi.start()}const gi=new Af;gi.setAnimationLoop(Fn),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(T){ue=T,dt.setAnimationLoop(T),T===null?gi.stop():gi.start()},dt.addEventListener("sessionstart",En),dt.addEventListener("sessionend",Ol),this.render=function(T,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(W),W=dt.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,W,D),g=gt.get(T,M.length),g.init(W),M.push(g),K.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),mt.setFromProjectionMatrix(K,Pn,W.reversedDepth),q=this.localClippingEnabled,Et=ot.init(this.clippingPlanes,q),p=Y.get(T,v.length),p.init(),v.push(p),dt.enabled===!0&&dt.isPresenting===!0){const ft=_.xr.getDepthSensingMesh();ft!==null&&Xo(ft,W,-1/0,_.sortObjects)}Xo(T,W,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(G,H),Ot=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Ot&&pt.addToRenderList(p,T),this.info.render.frame++,Et===!0&&ot.beginShadows();const j=g.state.shadowsArray;xt.render(j,T,W),Et===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const Q=p.opaque,X=p.transmissive;if(g.setupLights(),W.isArrayCamera){const ft=W.cameras;if(X.length>0)for(let bt=0,zt=ft.length;bt<zt;bt++){const Rt=ft[bt];kl(Q,X,T,Rt)}Ot&&pt.render(T);for(let bt=0,zt=ft.length;bt<zt;bt++){const Rt=ft[bt];Bl(p,T,Rt,Rt.viewport)}}else X.length>0&&kl(Q,X,T,W),Ot&&pt.render(T),Bl(p,T,W);D!==null&&A===0&&(lt.updateMultisampleRenderTarget(D),lt.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(_,T,W),Mt.resetDefaultState(),y=-1,E=null,M.pop(),M.length>0?(g=M[M.length-1],Et===!0&&ot.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,v.pop(),v.length>0?p=v[v.length-1]:p=null};function Xo(T,W,j,Q){if(T.visible===!1)return;if(T.layers.test(W.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(W);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||mt.intersectsSprite(T)){Q&&at.setFromMatrixPosition(T.matrixWorld).applyMatrix4(K);const bt=V.update(T),zt=T.material;zt.visible&&p.push(T,bt,zt,j,at.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||mt.intersectsObject(T))){const bt=V.update(T),zt=T.material;if(Q&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),at.copy(T.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),at.copy(bt.boundingSphere.center)),at.applyMatrix4(T.matrixWorld).applyMatrix4(K)),Array.isArray(zt)){const Rt=bt.groups;for(let Bt=0,Zt=Rt.length;Bt<Zt;Bt++){const Ut=Rt[Bt],ne=zt[Ut.materialIndex];ne&&ne.visible&&p.push(T,bt,ne,j,at.z,Ut)}}else zt.visible&&p.push(T,bt,zt,j,at.z,null)}}const ft=T.children;for(let bt=0,zt=ft.length;bt<zt;bt++)Xo(ft[bt],W,j,Q)}function Bl(T,W,j,Q){const X=T.opaque,ft=T.transmissive,bt=T.transparent;g.setupLightsView(j),Et===!0&&ot.setGlobalState(_.clippingPlanes,j),Q&&At.viewport(I.copy(Q)),X.length>0&&Tr(X,W,j),ft.length>0&&Tr(ft,W,j),bt.length>0&&Tr(bt,W,j),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function kl(T,W,j,Q){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[Q.id]===void 0&&(g.state.transmissionRenderTarget[Q.id]=new Fi(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?wr:Ln,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ce.workingColorSpace}));const ft=g.state.transmissionRenderTarget[Q.id],bt=Q.viewport||I;ft.setSize(bt.z*_.transmissionResolutionScale,bt.w*_.transmissionResolutionScale);const zt=_.getRenderTarget(),Rt=_.getActiveCubeFace(),Bt=_.getActiveMipmapLevel();_.setRenderTarget(ft),_.getClearColor(Z),O=_.getClearAlpha(),O<1&&_.setClearColor(16777215,.5),_.clear(),Ot&&pt.render(j);const Zt=_.toneMapping;_.toneMapping=hi;const Ut=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),g.setupLightsView(Q),Et===!0&&ot.setGlobalState(_.clippingPlanes,Q),Tr(T,j,Q),lt.updateMultisampleRenderTarget(ft),lt.updateRenderTargetMipmap(ft),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let fe=0,be=W.length;fe<be;fe++){const Me=W[fe],me=Me.object,Ft=Me.geometry,ve=Me.material,ae=Me.group;if(ve.side===Ce&&me.layers.test(Q.layers)){const Ke=ve.side;ve.side=$e,ve.needsUpdate=!0,Gl(me,j,Q,Ft,ve,ae),ve.side=Ke,ve.needsUpdate=!0,ne=!0}}ne===!0&&(lt.updateMultisampleRenderTarget(ft),lt.updateRenderTargetMipmap(ft))}_.setRenderTarget(zt,Rt,Bt),_.setClearColor(Z,O),Ut!==void 0&&(Q.viewport=Ut),_.toneMapping=Zt}function Tr(T,W,j){const Q=W.isScene===!0?W.overrideMaterial:null;for(let X=0,ft=T.length;X<ft;X++){const bt=T[X],zt=bt.object,Rt=bt.geometry,Bt=bt.group;let Zt=bt.material;Zt.allowOverride===!0&&Q!==null&&(Zt=Q),zt.layers.test(j.layers)&&Gl(zt,W,j,Rt,Zt,Bt)}}function Gl(T,W,j,Q,X,ft){T.onBeforeRender(_,W,j,Q,X,ft),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),X.onBeforeRender(_,W,j,Q,T,ft),X.transparent===!0&&X.side===Ce&&X.forceSinglePass===!1?(X.side=$e,X.needsUpdate=!0,_.renderBufferDirect(j,W,Q,X,T,ft),X.side=di,X.needsUpdate=!0,_.renderBufferDirect(j,W,Q,X,T,ft),X.side=Ce):_.renderBufferDirect(j,W,Q,X,T,ft),T.onAfterRender(_,W,j,Q,X,ft)}function Ar(T,W,j){W.isScene!==!0&&(W=ct);const Q=nt.get(T),X=g.state.lights,ft=g.state.shadowsArray,bt=X.state.version,zt=tt.getParameters(T,X.state,ft,W,j),Rt=tt.getProgramCacheKey(zt);let Bt=Q.programs;Q.environment=T.isMeshStandardMaterial?W.environment:null,Q.fog=W.fog,Q.envMap=(T.isMeshStandardMaterial?Xt:It).get(T.envMap||Q.environment),Q.envMapRotation=Q.environment!==null&&T.envMap===null?W.environmentRotation:T.envMapRotation,Bt===void 0&&(T.addEventListener("dispose",it),Bt=new Map,Q.programs=Bt);let Zt=Bt.get(Rt);if(Zt!==void 0){if(Q.currentProgram===Zt&&Q.lightsStateVersion===bt)return Vl(T,zt),Zt}else zt.uniforms=tt.getUniforms(T),T.onBeforeCompile(zt,_),Zt=tt.acquireProgram(zt,Rt),Bt.set(Rt,Zt),Q.uniforms=zt.uniforms;const Ut=Q.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ut.clippingPlanes=ot.uniform),Vl(T,zt),Q.needsLights=od(T),Q.lightsStateVersion=bt,Q.needsLights&&(Ut.ambientLightColor.value=X.state.ambient,Ut.lightProbe.value=X.state.probe,Ut.directionalLights.value=X.state.directional,Ut.directionalLightShadows.value=X.state.directionalShadow,Ut.spotLights.value=X.state.spot,Ut.spotLightShadows.value=X.state.spotShadow,Ut.rectAreaLights.value=X.state.rectArea,Ut.ltc_1.value=X.state.rectAreaLTC1,Ut.ltc_2.value=X.state.rectAreaLTC2,Ut.pointLights.value=X.state.point,Ut.pointLightShadows.value=X.state.pointShadow,Ut.hemisphereLights.value=X.state.hemi,Ut.directionalShadowMap.value=X.state.directionalShadowMap,Ut.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ut.spotShadowMap.value=X.state.spotShadowMap,Ut.spotLightMatrix.value=X.state.spotLightMatrix,Ut.spotLightMap.value=X.state.spotLightMap,Ut.pointShadowMap.value=X.state.pointShadowMap,Ut.pointShadowMatrix.value=X.state.pointShadowMatrix),Q.currentProgram=Zt,Q.uniformsList=null,Zt}function Hl(T){if(T.uniformsList===null){const W=T.currentProgram.getUniforms();T.uniformsList=fo.seqWithValue(W.seq,T.uniforms)}return T.uniformsList}function Vl(T,W){const j=nt.get(T);j.outputColorSpace=W.outputColorSpace,j.batching=W.batching,j.batchingColor=W.batchingColor,j.instancing=W.instancing,j.instancingColor=W.instancingColor,j.instancingMorph=W.instancingMorph,j.skinning=W.skinning,j.morphTargets=W.morphTargets,j.morphNormals=W.morphNormals,j.morphColors=W.morphColors,j.morphTargetsCount=W.morphTargetsCount,j.numClippingPlanes=W.numClippingPlanes,j.numIntersection=W.numClipIntersection,j.vertexAlphas=W.vertexAlphas,j.vertexTangents=W.vertexTangents,j.toneMapping=W.toneMapping}function sd(T,W,j,Q,X){W.isScene!==!0&&(W=ct),lt.resetTextureUnits();const ft=W.fog,bt=Q.isMeshStandardMaterial?W.environment:null,zt=D===null?_.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ps,Rt=(Q.isMeshStandardMaterial?Xt:It).get(Q.envMap||bt),Bt=Q.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Zt=!!j.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ut=!!j.morphAttributes.position,ne=!!j.morphAttributes.normal,fe=!!j.morphAttributes.color;let be=hi;Q.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(be=_.toneMapping);const Me=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,me=Me!==void 0?Me.length:0,Ft=nt.get(Q),ve=g.state.lights;if(Et===!0&&(q===!0||T!==E)){const We=T===E&&Q.id===y;ot.setState(Q,T,We)}let ae=!1;Q.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==ve.state.version||Ft.outputColorSpace!==zt||X.isBatchedMesh&&Ft.batching===!1||!X.isBatchedMesh&&Ft.batching===!0||X.isBatchedMesh&&Ft.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ft.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ft.instancing===!1||!X.isInstancedMesh&&Ft.instancing===!0||X.isSkinnedMesh&&Ft.skinning===!1||!X.isSkinnedMesh&&Ft.skinning===!0||X.isInstancedMesh&&Ft.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ft.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ft.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ft.instancingMorph===!1&&X.morphTexture!==null||Ft.envMap!==Rt||Q.fog===!0&&Ft.fog!==ft||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==ot.numPlanes||Ft.numIntersection!==ot.numIntersection)||Ft.vertexAlphas!==Bt||Ft.vertexTangents!==Zt||Ft.morphTargets!==Ut||Ft.morphNormals!==ne||Ft.morphColors!==fe||Ft.toneMapping!==be||Ft.morphTargetsCount!==me)&&(ae=!0):(ae=!0,Ft.__version=Q.version);let Ke=Ft.currentProgram;ae===!0&&(Ke=Ar(Q,W,X));let Zi=!1,Je=!1,Os=!1;const ye=Ke.getUniforms(),hn=Ft.uniforms;if(At.useProgram(Ke.program)&&(Zi=!0,Je=!0,Os=!0),Q.id!==y&&(y=Q.id,Je=!0),Zi||E!==T){At.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ye.setValue(U,"projectionMatrix",T.projectionMatrix),ye.setValue(U,"viewMatrix",T.matrixWorldInverse);const Ye=ye.map.cameraPosition;Ye!==void 0&&Ye.setValue(U,st.setFromMatrixPosition(T.matrixWorld)),St.logarithmicDepthBuffer&&ye.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&ye.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,Je=!0,Os=!0)}if(X.isSkinnedMesh){ye.setOptional(U,X,"bindMatrix"),ye.setOptional(U,X,"bindMatrixInverse");const We=X.skeleton;We&&(We.boneTexture===null&&We.computeBoneTexture(),ye.setValue(U,"boneTexture",We.boneTexture,lt))}X.isBatchedMesh&&(ye.setOptional(U,X,"batchingTexture"),ye.setValue(U,"batchingTexture",X._matricesTexture,lt),ye.setOptional(U,X,"batchingIdTexture"),ye.setValue(U,"batchingIdTexture",X._indirectTexture,lt),ye.setOptional(U,X,"batchingColorTexture"),X._colorsTexture!==null&&ye.setValue(U,"batchingColorTexture",X._colorsTexture,lt));const un=j.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&ht.update(X,j,Ke),(Je||Ft.receiveShadow!==X.receiveShadow)&&(Ft.receiveShadow=X.receiveShadow,ye.setValue(U,"receiveShadow",X.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(hn.envMap.value=Rt,hn.flipEnvMap.value=Rt.isCubeTexture&&Rt.isRenderTargetTexture===!1?-1:1),Q.isMeshStandardMaterial&&Q.envMap===null&&W.environment!==null&&(hn.envMapIntensity.value=W.environmentIntensity),Je&&(ye.setValue(U,"toneMappingExposure",_.toneMappingExposure),Ft.needsLights&&rd(hn,Os),ft&&Q.fog===!0&&J.refreshFogUniforms(hn,ft),J.refreshMaterialUniforms(hn,Q,P,C,g.state.transmissionRenderTarget[T.id]),fo.upload(U,Hl(Ft),hn,lt)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(fo.upload(U,Hl(Ft),hn,lt),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&ye.setValue(U,"center",X.center),ye.setValue(U,"modelViewMatrix",X.modelViewMatrix),ye.setValue(U,"normalMatrix",X.normalMatrix),ye.setValue(U,"modelMatrix",X.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const We=Q.uniformsGroups;for(let Ye=0,qo=We.length;Ye<qo;Ye++){const xi=We[Ye];qt.update(xi,Ke),qt.bind(xi,Ke)}}return Ke}function rd(T,W){T.ambientLightColor.needsUpdate=W,T.lightProbe.needsUpdate=W,T.directionalLights.needsUpdate=W,T.directionalLightShadows.needsUpdate=W,T.pointLights.needsUpdate=W,T.pointLightShadows.needsUpdate=W,T.spotLights.needsUpdate=W,T.spotLightShadows.needsUpdate=W,T.rectAreaLights.needsUpdate=W,T.hemisphereLights.needsUpdate=W}function od(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,W,j){const Q=nt.get(T);Q.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),nt.get(T.texture).__webglTexture=W,nt.get(T.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:j,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,W){const j=nt.get(T);j.__webglFramebuffer=W,j.__useDefaultFramebuffer=W===void 0};const ad=U.createFramebuffer();this.setRenderTarget=function(T,W=0,j=0){D=T,w=W,A=j;let Q=!0,X=null,ft=!1,bt=!1;if(T){const Rt=nt.get(T);if(Rt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(U.FRAMEBUFFER,null),Q=!1;else if(Rt.__webglFramebuffer===void 0)lt.setupRenderTarget(T);else if(Rt.__hasExternalTextures)lt.rebindTextures(T,nt.get(T.texture).__webglTexture,nt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ut=T.depthTexture;if(Rt.__boundDepthTexture!==Ut){if(Ut!==null&&nt.has(Ut)&&(T.width!==Ut.image.width||T.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");lt.setupDepthRenderbuffer(T)}}const Bt=T.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(bt=!0);const Zt=nt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Zt[W])?X=Zt[W][j]:X=Zt[W],ft=!0):T.samples>0&&lt.useMultisampledRTT(T)===!1?X=nt.get(T).__webglMultisampledFramebuffer:Array.isArray(Zt)?X=Zt[j]:X=Zt,I.copy(T.viewport),F.copy(T.scissor),k=T.scissorTest}else I.copy(N).multiplyScalar(P).floor(),F.copy($).multiplyScalar(P).floor(),k=rt;if(j!==0&&(X=ad),At.bindFramebuffer(U.FRAMEBUFFER,X)&&Q&&At.drawBuffers(T,X),At.viewport(I),At.scissor(F),At.setScissorTest(k),ft){const Rt=nt.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+W,Rt.__webglTexture,j)}else if(bt){const Rt=W;for(let Bt=0;Bt<T.textures.length;Bt++){const Zt=nt.get(T.textures[Bt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Bt,Zt.__webglTexture,j,Rt)}}else if(T!==null&&j!==0){const Rt=nt.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Rt.__webglTexture,j)}y=-1},this.readRenderTargetPixels=function(T,W,j,Q,X,ft,bt,zt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=nt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(Rt=Rt[bt]),Rt){At.bindFramebuffer(U.FRAMEBUFFER,Rt);try{const Bt=T.textures[zt],Zt=Bt.format,Ut=Bt.type;if(!St.textureFormatReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=T.width-Q&&j>=0&&j<=T.height-X&&(T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+zt),U.readPixels(W,j,Q,X,Ct.convert(Zt),Ct.convert(Ut),ft))}finally{const Bt=D!==null?nt.get(D).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(T,W,j,Q,X,ft,bt,zt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=nt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&bt!==void 0&&(Rt=Rt[bt]),Rt)if(W>=0&&W<=T.width-Q&&j>=0&&j<=T.height-X){At.bindFramebuffer(U.FRAMEBUFFER,Rt);const Bt=T.textures[zt],Zt=Bt.format,Ut=Bt.type;if(!St.textureFormatReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ne=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ne),U.bufferData(U.PIXEL_PACK_BUFFER,ft.byteLength,U.STREAM_READ),T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+zt),U.readPixels(W,j,Q,X,Ct.convert(Zt),Ct.convert(Ut),0);const fe=D!==null?nt.get(D).__webglFramebuffer:null;At.bindFramebuffer(U.FRAMEBUFFER,fe);const be=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await pp(U,be,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ne),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ft),U.deleteBuffer(ne),U.deleteSync(be),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,W=null,j=0){const Q=Math.pow(2,-j),X=Math.floor(T.image.width*Q),ft=Math.floor(T.image.height*Q),bt=W!==null?W.x:0,zt=W!==null?W.y:0;lt.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,j,0,0,bt,zt,X,ft),At.unbindTexture()};const cd=U.createFramebuffer(),ld=U.createFramebuffer();this.copyTextureToTexture=function(T,W,j=null,Q=null,X=0,ft=null){ft===null&&(X!==0?(dr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=X,X=0):ft=0);let bt,zt,Rt,Bt,Zt,Ut,ne,fe,be;const Me=T.isCompressedTexture?T.mipmaps[ft]:T.image;if(j!==null)bt=j.max.x-j.min.x,zt=j.max.y-j.min.y,Rt=j.isBox3?j.max.z-j.min.z:1,Bt=j.min.x,Zt=j.min.y,Ut=j.isBox3?j.min.z:0;else{const un=Math.pow(2,-X);bt=Math.floor(Me.width*un),zt=Math.floor(Me.height*un),T.isDataArrayTexture?Rt=Me.depth:T.isData3DTexture?Rt=Math.floor(Me.depth*un):Rt=1,Bt=0,Zt=0,Ut=0}Q!==null?(ne=Q.x,fe=Q.y,be=Q.z):(ne=0,fe=0,be=0);const me=Ct.convert(W.format),Ft=Ct.convert(W.type);let ve;W.isData3DTexture?(lt.setTexture3D(W,0),ve=U.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(lt.setTexture2DArray(W,0),ve=U.TEXTURE_2D_ARRAY):(lt.setTexture2D(W,0),ve=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,W.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,W.unpackAlignment);const ae=U.getParameter(U.UNPACK_ROW_LENGTH),Ke=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Zi=U.getParameter(U.UNPACK_SKIP_PIXELS),Je=U.getParameter(U.UNPACK_SKIP_ROWS),Os=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Me.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Me.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Bt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Zt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ut);const ye=T.isDataArrayTexture||T.isData3DTexture,hn=W.isDataArrayTexture||W.isData3DTexture;if(T.isDepthTexture){const un=nt.get(T),We=nt.get(W),Ye=nt.get(un.__renderTarget),qo=nt.get(We.__renderTarget);At.bindFramebuffer(U.READ_FRAMEBUFFER,Ye.__webglFramebuffer),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,qo.__webglFramebuffer);for(let xi=0;xi<Rt;xi++)ye&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,nt.get(T).__webglTexture,X,Ut+xi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,nt.get(W).__webglTexture,ft,be+xi)),U.blitFramebuffer(Bt,Zt,bt,zt,ne,fe,bt,zt,U.DEPTH_BUFFER_BIT,U.NEAREST);At.bindFramebuffer(U.READ_FRAMEBUFFER,null),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(X!==0||T.isRenderTargetTexture||nt.has(T)){const un=nt.get(T),We=nt.get(W);At.bindFramebuffer(U.READ_FRAMEBUFFER,cd),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,ld);for(let Ye=0;Ye<Rt;Ye++)ye?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,un.__webglTexture,X,Ut+Ye):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,un.__webglTexture,X),hn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,We.__webglTexture,ft,be+Ye):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,We.__webglTexture,ft),X!==0?U.blitFramebuffer(Bt,Zt,bt,zt,ne,fe,bt,zt,U.COLOR_BUFFER_BIT,U.NEAREST):hn?U.copyTexSubImage3D(ve,ft,ne,fe,be+Ye,Bt,Zt,bt,zt):U.copyTexSubImage2D(ve,ft,ne,fe,Bt,Zt,bt,zt);At.bindFramebuffer(U.READ_FRAMEBUFFER,null),At.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else hn?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(ve,ft,ne,fe,be,bt,zt,Rt,me,Ft,Me.data):W.isCompressedArrayTexture?U.compressedTexSubImage3D(ve,ft,ne,fe,be,bt,zt,Rt,me,Me.data):U.texSubImage3D(ve,ft,ne,fe,be,bt,zt,Rt,me,Ft,Me):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ft,ne,fe,bt,zt,me,Ft,Me.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ft,ne,fe,Me.width,Me.height,me,Me.data):U.texSubImage2D(U.TEXTURE_2D,ft,ne,fe,bt,zt,me,Ft,Me);U.pixelStorei(U.UNPACK_ROW_LENGTH,ae),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ke),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Zi),U.pixelStorei(U.UNPACK_SKIP_ROWS,Je),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Os),ft===0&&W.generateMipmaps&&U.generateMipmap(ve),At.unbindTexture()},this.initRenderTarget=function(T){nt.get(T).__webglFramebuffer===void 0&&lt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?lt.setTextureCube(T,0):T.isData3DTexture?lt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?lt.setTexture2DArray(T,0):lt.setTexture2D(T,0),At.unbindTexture()},this.resetState=function(){w=0,A=0,D=null,At.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(t),e.unpackColorSpace=ce._getUnpackColorSpace()}}function MM(n){let t=n>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}function po(n,t){return Math.hypot(n.x-t.x,n.z-t.z)}function Df(n,t,e){const i=e.x-t.x,s=e.z-t.z,r=Math.max(0,Math.min(1,((n.x-t.x)*i+(n.z-t.z)*s)/(i*i+s*s||1)));return Math.hypot(n.x-t.x-i*r,n.z-t.z-s*r)}function ou(n,t){let e=1/0;for(let i=1;i<(t||[]).length;i++)e=Math.min(e,Df(n,t[i-1],t[i]));return e}function au(n,t,e=.8){const i=n.bounds,s=n.target,r=n.spawn;return!(t.x<i.minX+2||t.x>i.maxX-2||t.z<i.minZ+2||t.z>i.maxZ-2||!le(n,t.x,t.z,e)||r&&po(t,r)<14||s&&po(t,s)<(s.radius||5)+11||(n.roads||[]).some(o=>ou(t,o.points)<(o.width||4)/2+2.8)||(n.rivers||[]).some(o=>ou(t,o.points)<o.width/2+1.4)||(n.obstacles||[]).some(o=>po(t,o)<(o.radius||1)+2.1)||(n.fenceSegments||[]).some(o=>Df(t,o.a,o.b)<2.8))}function vM(n,{seed:t=(n.seed||42)+93371,maxClusters:e}={}){const i=n.bounds,s=(i.maxX-i.minX)*(i.maxZ-i.minZ),r=Math.max(3,Math.min(24,Math.ceil(s/1600))),o=Math.max(0,Math.min(32,Math.floor(e??r))),a=MM(t),c=[],l=[];for(let h=0;h<o*90&&l.length<o;h++){const u={x:i.minX+2+a()*(i.maxX-i.minX-4),z:i.minZ+2+a()*(i.maxZ-i.minZ-4)};if(!au(n,u,.85)||l.some(m=>po(u,m)<5.5))continue;const f=3+Math.floor(a()*3),d=l.length,x=[];for(let m=0;m<f;m++){const p=a()*Math.PI*2,g=m===0?0:.55+a()*1.25,v={x:u.x+Math.cos(p)*g,z:u.z+Math.sin(p)*g};au(n,v,.55)&&x.push({x:v.x,z:v.z,variant:Math.floor(a()*3),scale:.66+a()*.48,cluster:d})}x.length<2||(l.push(u),c.push(...x))}return c}const yM="#9ceeff",SM="#39bfe8",wM="#ff7062",bM="#ff241b";function za(n,t){const i=(n?.userData?.parts||n)?.tailLight?.material;if(!i)return!1;const s=t?wM:yM,r=t?bM:SM;return i.color?.set&&i.color.set(s),i.emissive?.set&&i.emissive.set(r),i.emissiveIntensity=t?1.9:1.25,!0}const EM=[{id:"speed",name:"Turbo paws",icon:"paw",costs:[80,120,200],unlockLevels:[2,6,11],description:"Circle a roaming flock faster with upgraded paw motors.",tierNames:["Quick paws","Trail runner","Meadow racer"],tierDescriptions:["+1.8 m/s running speed","+2.7 m/s running speed","+3.5 m/s running speed"]},{id:"flock",name:"Friendly signal",icon:"signal",costs:[120,180,260],unlockLevels:[7,10,15],description:"Reach more robots with a wider herding signal.",tierNames:["Clear signal","Pasture beacon","Far-field beacon"],tierDescriptions:["+2 m herding range","+3 m herding range","+4 m herding range"]},{id:"drone",name:"Scout drone",icon:"drone",costs:[200,360,540],unlockLevels:[10,14,18],description:"A hovering helper keeps the main herd together while you lead the way.",tierNames:["Scout","Shepherd scout","Flock captain"],tierDescriptions:["Keeps the main herd together; holds when you leave","33% stronger drone support","67% stronger drone support"]},{id:"helper",name:"Buddy dog",icon:"dog",costs:[600,850,1200],unlockLevels:[20,24,28],description:"Herds from the rear, supports split flocks, and learns to retrieve strays.",tierNames:["Farm friend","Trail partner","Senior shepherd"],tierDescriptions:["Herds from behind in the flock’s direction of travel","Guides the smaller flock and passages; barks autonomously","Also retrieves wanderers and bolters to the nearest flock"]},{id:"bark",name:"Happy bark",icon:"bark",costs:[100,160,240],unlockLevels:[4,8,13],description:"A stronger bark gives wandering robots a cheerful nudge.",tierNames:["Bright bark","Resonant bark","Meadow chorus"],tierDescriptions:["+0.25 bark strength","+0.45 bark strength","+0.65 bark strength"]},{id:"cohesion",name:"Flock harmony",icon:"harmony",costs:[160,220,320],unlockLevels:[12,14,15],description:"Robots regroup more readily when the flock stretches across a meadow.",tierNames:["Stay together","Close companions","Perfect formation"],tierDescriptions:["12% stronger regrouping","23% stronger regrouping","35% stronger regrouping"]}],No=Object.freeze(EM.map(n=>Object.freeze({...n,cost:n.costs[0],maxLevel:n.costs.length,costs:Object.freeze(n.costs),unlockLevels:Object.freeze(n.unlockLevels),tierNames:Object.freeze(n.tierNames),tierDescriptions:Object.freeze(n.tierDescriptions)}))),Er=n=>No.find(t=>t.id===n);function Jn(n,t){const e=Er(t);if(!e||!n||typeof n!="object")return 0;const i=Object.hasOwn(n,t)?n[t]:void 0;return i===!0?1:Number.isInteger(i)&&i>0?Math.min(i,e.maxLevel):0}function Ml(n,t){const e=Er(t);return e?e.costs[Jn(n,t)]??null:null}function If(n){const t={};for(const e of No){const i=Jn(n,e.id);i&&(t[e.id]=i)}return t}function Lf(n,t){return Er(t)?.unlockLevels[Jn(n,t)]??null}function vl(n){if(typeof n=="number")return Number.isInteger(n)?Math.max(1,Math.min(100,n)):1;const t=n;if(!t||typeof t!="object")return 1;const e=Number.isInteger(t.highestLevel)&&t.highestLevel>=0?Math.min(99,t.highestLevel):0,s=(Array.isArray(t.completedLevels)?t.completedLevels:[]).reduce((r,o)=>Number.isInteger(o)&&o>=0&&o<=99?Math.max(r,Math.min(100,o+2)):r,1);return Math.max(e+1,s)}function TM(n,t,e=n){const i=typeof n=="object"?n:null,s=Er(t),r=vl(e),o=Jn(i?.upgrades,t),a=Ml(i?.upgrades,t),c=Lf(i?.upgrades,t),l=s?a===null?"owned":r<c?"locked":i&&(!Number.isFinite(i.points)||i.points<a)?"points":null:"unknown";return{available:l===null,reason:l,level:o,nextLevel:a===null?null:o+1,cost:a,unlockLevel:c,currentLevelNumber:r}}function Uf(n,t=1){const e=vl(t),i={};for(const s of No){const r=Jn(n,s.id),o=s.unlockLevels.filter(c=>c<=e).length,a=Math.min(r,o);a&&(i[s.id]=a)}return i}function AM(n,t,e=n){const i=Er(t);if(!i)return{ok:!1,reason:"unknown"};if(!n||typeof n!="object")return{ok:!1,reason:"points"};const s=Jn(n.upgrades,t),r=Ml(n.upgrades,t);if(r===null)return{ok:!1,reason:"owned"};const o=Lf(n.upgrades,t);return vl(e)<o?{ok:!1,reason:"locked",unlockLevel:o}:!Number.isFinite(n.points)||n.points<r?{ok:!1,reason:"points"}:(n.points-=r,n.upgrades={...If(n.upgrades),[t]:s+1},{ok:!0,upgrade:i,level:s+1,cost:r})}function RM(n,t=1){const e=Uf(n,t),i=r=>Jn(e,r);return{speedBoost:[0,1.8,2.7,3.5][i("speed")],signalBoost:[0,2,3,4][i("flock")],barkBoost:[0,.25,.45,.65][i("bark")],cohesionBoost:[0,.12,.23,.35][i("cohesion")],droneStrength:[0,.7,.93,1.17][i("drone")],helperStrength:[0,1,1.3,1.58][i("helper")],drone:i("drone")>0,helper:i("helper")>0,helperTier:i("helper")}}const De=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z);function Nf(n,t,e,i=.6){if(!le(n,e.x,e.z,i)){let s=null,r=1/0;for(const o of[.6,1.2,1.8,2.4,3.2,4.5,6]){for(let a=0;a<24;a++){const c=a*Math.PI/12,l={x:e.x+Math.cos(c)*o,z:e.z+Math.sin(c)*o},h=o+De(t,l)*.015;h<r&&le(n,l.x,l.z,i+.08)&&(s=l,r=h)}if(s)break}if(!s)return null;e=s}return e}function ui(n,t,e,i=.6){if(e=Nf(n,t,e,i),!e)return{x:t.x,z:t.z};let s=il(n,t,e,i);he({...n,obstacles:[]},t,e,i)&&(s=e);const r=t.buddyNavigation;if(r&&De(r.goal,s)<3&&n.time<r.until){for(;r.path.length&&De(t,r.path[0])<.45;)r.path.shift();if(r.path.length&&he(n,t,r.path[0],i))return r.path[0]}if(he(n,t,s,i))return delete t.buddyNavigation,s;const o=(n.obstacles||[]).filter(f=>De(t,f)<Math.min(24,De(t,s)+6)&&on(f,t,s)<f.radius+i+4).sort((f,d)=>De(t,f)-De(t,d)).slice(0,6);if(!o.length)return s;const a=[t,s];for(const f of o){const d=(f.radius+i+.16)/Math.cos(Math.PI/12);for(let x=0;x<12;x++){const m=x*Math.PI/6,p={x:f.x+Math.cos(m)*d,z:f.z+Math.sin(m)*d};le(n,p.x,p.z,i)&&a.push(p)}}const c=a.map(()=>1/0),l=[],h=new Set;c[0]=0;for(let f=0;f<a.length;f++){let d=-1;for(let x=0;x<a.length;x++)!h.has(x)&&(d<0||c[x]<c[d])&&(d=x);if(d<0||!Number.isFinite(c[d])||d===1)break;h.add(d);for(let x=1;x<a.length;x++){if(h.has(x))continue;const m=c[d]+De(a[d],a[x]);m>=c[x]||!he(n,a[d],a[x],i)||(c[x]=m,l[x]=d)}}if(!Number.isFinite(c[1]))return s;const u=[];for(let f=1;f!==0;f=l[f])u.unshift({x:a[f].x,z:a[f].z});return t.buddyNavigation={goal:{x:s.x,z:s.z},path:u,until:n.time+2},u[0]}const Vc=new WeakMap;function or(n){delete n.buddyRecovery,Vc.delete(n),delete n.buddyNavigation,delete n.navigationBlocked}function Wc(n,t,e,i,{taskKey:s,active:r=!0,yielding:o=!1}={}){if(!(i>0)||!Number.isFinite(i))return{x:t.x,z:t.z};if(e=Nf(n,t,e),!e)return or(t),{x:t.x,z:t.z};if(!r||o||De(t,e)<.55)return or(t),ui(n,t,e);let a=t.buddyRecovery;if((!a||Vc.get(t)!==n||a.lastTime>n.time||a.taskKey!==s||De(a.goal,e)>6)&&(or(t),a=t.buddyRecovery={lastTime:n.time,taskKey:s,bestDistance:De(t,e),goal:{...e},progressGoal:{...e},progressDistance:De(t,e),progressElapsed:0,anchor:{x:t.x,z:t.z},blocked:0,attempts:0,elapsed:0}),Vc.set(t,n),a.lastTime=n.time,a.elapsed+=i,De(a.progressGoal,e)>.5||De(t,e)<a.progressDistance-1e-5?(a.progressGoal={...e},a.progressDistance=De(t,e),a.progressElapsed=0):a.progressElapsed+=i,a.waitUntil){if(a.elapsed<a.waitUntil)return{x:t.x,z:t.z};delete a.waitUntil,a.attempts=0,a.blocked=0,delete t.buddyNavigation}if(a.escape)if(De(t,a.escape)<.3||a.elapsed>=a.escapeUntil||!he(n,t,a.escape,.6))delete a.escape,delete t.buddyNavigation,a.blocked=0,a.progressElapsed=0,a.anchor={x:t.x,z:t.z};else return a.escape;if(De(t,a.anchor)>.3&&(a.anchor={x:t.x,z:t.z},a.blocked=0,De(t,e)<a.bestDistance-.5&&(a.attempts=0,a.bestDistance=De(t,e))),a.blocked=t.navigationBlocked?a.blocked+i:Math.max(0,a.blocked-i),a.blocked<1.5&&a.progressElapsed<6)return ui(n,t,e);if(delete t.buddyNavigation,a.attempts>=3)return a.waitUntil=a.elapsed+2,a.blocked=0,{x:t.x,z:t.z};const c=Math.atan2(e.x-t.x,e.z-t.z),l=a.attempts%2?-1:1;a.attempts++,a.blocked=0,a.progressElapsed=0;for(const h of[c+l*Math.PI*.65,c-l*Math.PI*.65,c+Math.PI,c+l*Math.PI/2]){const u={x:t.x+Math.sin(h)*1.8,z:t.z+Math.cos(h)*1.8};if(le(n,u.x,u.z,.68)&&he(n,t,u,.6))return a.escape=u,a.escapeUntil=a.elapsed+2,u}return a.waitUntil=a.elapsed+2,{x:t.x,z:t.z}}const Ff=(n,t)=>Math.atan2(Math.sin(n-t),Math.cos(n-t));function Fo(n,t,e,i){const s=Ff(t,n),r=e*i;return n+Math.max(-r,Math.min(r,s))}function Ms(n,t,e,i,s){if(!(i>0)||!Number.isFinite(i))return;const r=e.x-t.x,o=e.z-t.z,a=Math.hypot(r,o),c={x:t.x,z:t.z};if(t.navigationBlocked=!1,a>1e-4){const l=Math.atan2(r,o);t.heading=Fo(t.heading??l,l,2.8,i);const h=Math.max(0,Math.cos(Ff(l,t.heading))),u=5,f=10,d=Math.min(Math.max(0,s),a*u)*h,x=Math.max(0,t.moveSpeed??Math.hypot(t.vx||0,t.vz||0)),m=x+Math.max(-f*i,Math.min(f*i,d-x)),p=Math.min(a,i*m),g=nr(n,t,Math.sin(t.heading)*p,Math.cos(t.heading)*p,.6);t.navigationBlocked=g.blockedX||g.blockedZ;const v=Math.hypot(t.x-c.x,t.z-c.z);t.moveSpeed=g.blockedX||g.blockedZ?v/i:m}else t.moveSpeed=Math.max(0,(t.moveSpeed||0)-10*i);t.vx=(t.x-c.x)/i,t.vz=(t.z-c.z)/i}const Nt=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),zi=(n,t)=>{const e=Math.hypot(n,t);return e>1e-6?{x:n/e,z:t/e}:{x:0,z:0}},ci=n=>n.reduce((t,e)=>({x:t.x+e.x/n.length,z:t.z+e.z/n.length}),{x:0,z:0});function yl(n,t,e=(i,s)=>he(n,i,s,.15)){const i=new Set(t),s=[];for(;i.size;){const r=i.values().next().value,o=[r];i.delete(r);for(let a=0;a<o.length;a++)for(const c of i)Nt(o[a],c)<=6.5&&e(o[a],c)&&(o.push(c),i.delete(c));s.push(o)}return s}const ws=(n,t=[])=>n.filter(e=>t.includes(e.id)).length,Da=(n,t,e)=>ws(t,e)-ws(n,e)||Math.min(...n.map(i=>i.id))-Math.min(...t.map(i=>i.id)),wo=n=>Ae(n),bs=(n,t,e)=>((n.x-t.x)*Math.sin(t.heading)+(n.z-t.z)*Math.cos(t.heading))*e;function Of(n,t,e){return!e.length||(t.kind==="goal"?e.every(i=>Sr(n.target,i,wo(i))):e.every(i=>bs(i,t.bridge,t.sign)>t.bridge.length/2+3))}function CM(n,t){return Nt(t,n.target)<ln(n.target).halfLength+12||(n.rivers||[]).some(e=>e.bridges.some(i=>Nt(t,i)<i.length/2+12))}function PM(n,t,e,i){if(t.passage){const l=t.passage,h=l.kind==="goal"?n.target:l.bridge;if(!Of(n,l,e)&&Nt(ci(e),h)<(h.length||h.radius||5)+22)return l;delete t.passage}const s=ci(e),r=ln(n.target),o=Nt(n.dog,n.target)<n.target.radius+12||e.some(l=>Nt(l,n.dog)<14&&he(n,l,n.dog,.15));if(o&&Nt(s,n.target)<r.halfLength+12&&!e.every(l=>Sr(n.target,l,wo(l))))return t.passage={kind:"goal",ids:e.map(l=>l.id)};const a=(n.rivers||[]).flatMap(l=>l.bridges).sort((l,h)=>Nt(l,s)-Nt(h,s));let c=t.forward&&i;if(!c&&o&&(c=zi(s.x-n.dog.x,s.z-n.dog.z)),!c)return null;for(const l of a){if(Nt(s,l)>l.length/2+12)continue;const h=c.x*Math.sin(l.heading)+c.z*Math.cos(l.heading);if(Math.abs(h)<.25)continue;const u=Math.sign(h);if(!(bs(s,l,u)>l.length/2+1))return t.passage={kind:"bridge",bridge:l,sign:u,ids:e.map(d=>d.id)}}return null}function cu(n,t,e){if(t.kind==="goal")return Bu(n,e);const i=t.bridge,s=i.length/2+4;return{x:i.x+Math.sin(i.heading)*t.sign*s,z:i.z+Math.cos(i.heading)*t.sign*s}}const Ia=3;function lu(n,t){let e=0;for(const s of n.rivers||[])for(const r of s.bridges)Math.abs((t.x-r.x)*Math.cos(r.heading)-(t.z-r.z)*Math.sin(r.heading))<r.width/2+1&&Math.abs(bs(t,r,1))<r.length/2+2&&(e+=15);for(const s of n.gates||[])Nt(t,s)<4&&(e+=15);const i=Bu(n,n.dog);return Nt(t,i)<4&&(e+=15),e}function zM(n,t,e,i){if(!e.standby||Nt(e.standby,n.dog)>7||Nt(e.standby,n.dog)<2||!le(n,e.standby.x,e.standby.z,.6)){const s=[];Nt(t,n.dog)>=2&&Nt(t,n.dog)<=7&&s.push({x:t.x,z:t.z});for(const o of[3.5,5.5])for(let a=0;a<12;a++){const c=a*Math.PI/6;s.push({x:n.dog.x+Math.sin(c)*o,z:n.dog.z+Math.cos(c)*o})}const r=s.filter(o=>{if(!le(n,o.x,o.z,.68)||!he(n,n.dog,o,.6))return!1;if(he(n,t,o,.6))return!0;const a={x:t.x,z:t.z},c=[];for(let l=0;l<16;l++){if(he(n,a,o,.6))return!0;const h=ui(n,a,o,.6);if(Nt(a,h)<.05||!le(n,h.x,h.z,.6)||!he(n,a,h,.6)||c.some(u=>Nt(u,h)<.1))return!1;c.push({x:a.x,z:a.z}),a.x=h.x,a.z=h.z}return!1});r.sort((o,a)=>lu(n,o)-lu(n,a)||Nt(t,o)-Nt(t,a)),e.standby=r[0]||{x:t.x,z:t.z}}if(t.desired={...e.standby},Nt(t,e.standby)<.08){t.moveSpeed=0,t.vx=0,t.vz=0;return}Ms(n,t,ui(n,t,e.standby,.6),i,4)}function DM(n,t,e,i,s,r){const o=n.dog,a=Nt(o,i)<Ia||Nt(o,t)<2.2;if(!a&&(!e.yield||Nt(o,i)>Ia+1)&&delete e.yield,!a&&!e.yield)return i;const c=e.yield?.side||Math.sign((t.x-o.x)*-s.z+(t.z-o.z)*s.x)||1;e.yield={side:c,since:e.yield?.since??n.time};const l=[];for(const h of[3.5,5,2])for(const u of[c,-c]){const f={x:i.x-s.z*h*u,z:i.z+s.x*h*u};le(n,f.x,f.z,.68)&&he(n,i,f,.6)&&l.push({p:f,side:u,cost:Math.max(0,Ia-Nt(f,o))*10+h+(u!==c?2:0)})}return l.sort((h,u)=>h.cost-u.cost),l.length?(e.yield.side=l[0].side,l[0].p):r||Nt(o,i)>=1.6||n.time-e.yield.since>1.2?i:{x:t.x,z:t.z}}function IM(n,t,e,i){const s=t.map(l=>l.id),r=(n.flows||[]).sort((l,h)=>ws(t,h.ids)-ws(t,l.ids))[0],o=r&&ws(t,r.ids)>0?r:{ids:s,forward:null};o.ids=s,o.at=i;const a=t.reduce((l,h)=>({x:l.x+(h.vx||0)/t.length,z:l.z+(h.vz||0)/t.length}),{x:0,z:0}),c=Math.hypot(a.x,a.z)>.28;if(c){const l=zi(a.x,a.z),h=o.forward?Fo(Math.atan2(o.forward.x,o.forward.z),Math.atan2(l.x,l.z),1.8,e):Math.atan2(l.x,l.z);o.forward={x:Math.sin(h),z:Math.cos(h)}}return n.flows=[...(n.flows||[]).filter(l=>l!==o&&i-l.at<5),o],{moving:c,forward:o.forward||{x:0,z:1},measured:o.forward}}const LM=18,UM=14;function NM(n,t,e){const i=ci(e),s={...n,obstacles:[]},r=e.some(u=>he(s,n.dog,u,.6)),o=Math.min(...e.map(u=>Nt(n.dog,u))),a=t.containment,c=a&&ws(e,a.ids)>0;if(!(!r||o>(c?UM:LM)))return delete t.containment,null;const h=c?a:{anchor:{...i},positions:{},acquired:!1,angle:null};h.ids=e.map(u=>u.id);for(const u of e)h.positions[u.id]||={x:u.x,z:u.z};return t.containment=h,h}function FM(n,t,e,i,s,r,o){if(t.mode="contain",t.barking=!1,delete t.forward,!i.acquired){delete i.check,delete i.watchUntil;const f=[...s].sort((p,g)=>Nt(t,p)-Nt(t,g))[0],d=zi(t.x-f.x,t.z-f.z),x={x:f.x+d.x*4,z:f.z+d.z*4};t.desired=x,t.containmentActivity="approach";const m=Wc(n,t,x,r,{taskKey:o,active:!0});Ms(n,t,m,r,7);return}const a=i.anchor,c=Math.max(3,...s.map(f=>Nt(f,a)+Ae(f))),l=c+3.5;if(i.angle??=Math.atan2(t.x-a.x,t.z-a.z),i.watchUntil>n.time){t.desired={x:t.x,z:t.z},Ms(n,t,t.desired,r,0),t.heading=Fo(t.heading??0,Math.atan2(a.x-t.x,a.z-t.z),1.4,r),t.containmentActivity="watch";return}if(i.check&&Nt(t,i.check)<.4){i.watchUntil=n.time+4+(i.checkIndex||0)%4,delete i.check,t.containmentActivity="watch",Ms(n,t,{x:t.x,z:t.z},r,0);return}if(!i.check){i.checkIndex=(i.checkIndex||0)+1;const d=s.filter(m=>i.positions[m.id]&&Nt(m,i.positions[m.id])>1.2).sort((m,p)=>Nt(p,i.positions[p.id])-Nt(m,i.positions[m.id]))[0],x=d?Math.atan2(d.x-a.x,d.z-a.z):i.angle+(i.checkIndex%2?1:-1)*Math.PI/3;for(let m=0;m<24;m++){const p=x+(m%2?1:-1)*Math.ceil(m/2)*Math.PI/12,g={x:a.x+Math.sin(p)*l,z:a.z+Math.cos(p)*l};if(!le(n,g.x,g.z,.68))continue;const v=ui(n,t,g,.6),M=v.x-t.x,_=v.z-t.z,S=M*M+_*_,w=S?Math.max(0,Math.min(1,((a.x-t.x)*M+(a.z-t.z)*_)/S)):0,A={x:t.x+M*w,z:t.z+_*w};if(!(Nt(t,a)>c+1&&Nt(A,a)<c+1)){i.check=g,i.angle=p,i.checkStarted=n.time;break}}}const h=i.check||{x:t.x,z:t.z};t.containmentActivity="check",t.desired=h;const u=Wc(n,t,h,r,{taskKey:o,active:Nt(t,h)>.5});Ms(n,t,u,r,2.6),i.check&&n.time-i.checkStarted>15&&(delete i.check,i.watchUntil=n.time+4)}function OM(n,t,e,i,s){if(!(i>0)||!e.helper)return{forces:new Map,memberIds:new Set};let r=n.helpers.find(N=>N.type==="helper");r||(r={type:"helper",x:n.dog.x,z:n.dog.z},n.helpers.push(r));const o=n.buddyHerd||={},a=e.helperTier;r.barking=n.time<(r.barkUntil||0);let c=a>=3&&t.find(N=>N.id===o.retrieveId);const l=t.filter(N=>N.id!==c?.id&&!N.wander&&!N.wanderHome),h=l.map(N=>N.id).join(",");(!o.groups||h!==o.signature||n.time-o.checkedAt>=.25)&&(o.allGroups=yl(n,l),o.groups=o.allGroups.filter(N=>N.length>=2),o.signature=h,o.checkedAt=n.time);let u=o.groups;if(!u.length&&a>=2){const N=(o.allGroups||[]).filter($=>CM(n,$[0])).sort(($,rt)=>Nt(r,$[0])-Nt(r,rt[0]))[0];N&&(u=[N])}u.sort((N,$)=>$.length-N.length||Da(N,$,o.travelIds));const f=u[0];if(!f)return r.mode="standby",r.clusterIds=[],r.targetId=null,r.barking=!1,o.task!=="standby"&&(r.moveSpeed=0,r.vx=0,r.vz=0,delete r.buddyNavigation,or(r),delete o.passage,delete o.workHeading,delete o.orbitSide,delete o.yield,delete r.forward),o.task="standby",delete o.containment,delete o.retrieveId,zM(n,r,o,i),{forces:new Map,memberIds:new Set};o.travelIds=f.map(N=>N.id);const d=N=>[...u].sort(($,rt)=>Nt(N,ci($))-Nt(N,ci(rt))||Da($,rt))[0];c&&d(c).some($=>Nt($,c)<=4.5&&he(n,$,c,.15))&&(delete o.retrieveId,c=null),a>=3&&!c&&u.some(N=>N.length>=2)&&(c=t.filter(N=>(N.wander||N.wanderHome)&&!u.some($=>$.some(rt=>rt.id===N.id))).sort((N,$)=>+!!$.wander?.bolting-+!!N.wander?.bolting||Nt(r,N)-Nt(r,$)||N.id-$.id)[0],c&&(o.retrieveId=c.id)),c||delete o.retrieveId;let x=a>=2?[...u].sort((N,$)=>N.length-$.length||Da(N,$,r.clusterIds))[0]:f;if(a>=2&&o.passage){const N=t.filter($=>o.passage.ids.includes($.id)&&!$.wander&&!$.wanderHome);N.length&&!Of(n,o.passage,N)&&(x=N)}const m=c?d(c):x,{moving:p,forward:g,measured:v}=IM(o,m,i,n.time);o.forward=v;const M=NM(n,o,m),_=!M&&!c&&a>=2?PM(n,o,m,g):null;M&&delete o.passage;const S=`${c?"retrieve":M?"contain":_?.kind||"flock"}:${c?.id??m.map(N=>N.id).join(",")}`;o.task!==S&&(delete r.buddyNavigation,or(r),delete o.standby,delete o.yield,delete o.orbitSide,delete o.workHeading),o.task=S;const w=ci(m);r.clusterIds=m.map(N=>N.id),r.anchor=w,r.targetId=c?.id??null;const A=new Map;if(M){const N=m.some(q=>Nt(r,q)<12&&he(n,r,q,.15)),$=ci(m),rt=Math.max(3,...m.map(q=>Nt(q,$)+Ae(q))),mt={...n,obstacles:[]},Et=Nt(r,$)<=rt+8&&m.some(q=>he(mt,r,q,.6));if(M.acquired&&!Et&&(M.acquired=!1),M.acquired||(M.anchor=$),!M.acquired&&N&&(M.acquired=!0,M.anchor=ci(m),M.positions=Object.fromEntries(m.map(q=>[q.id,{x:q.x,z:q.z}]))),M.acquired)for(const q of m)A.set(q.id,M.positions[q.id])}if(M&&!c)return FM(n,r,o,M,m,i,S),{forces:new Map,memberIds:new Set,holds:A};let D=w,y=g;if(c){D=c;const N=Ae(c),$=ui(n,c,w,N);y=zi($.x-c.x,$.z-c.z)}if(_){D=[...m].sort(($,rt)=>_.kind==="bridge"?bs($,_.bridge,_.sign)-bs(rt,_.bridge,_.sign):Nt(rt,n.target)-Nt($,n.target))[0];const N=ui(n,D,cu(n,_,D),wo(D));y=zi(N.x-D.x,N.z-D.z)}if(c||_){const N=Math.atan2(y.x,y.z);o.workHeading=Fo(o.workHeading??N,N,1.8,i),y={x:Math.sin(o.workHeading),z:Math.cos(o.workHeading)}}else delete o.workHeading;r.mode=c?"retrieve":_?_.kind:p?"herd":"hold";const E=c||_?0:Math.min(...m.map(N=>(N.x-w.x)*y.x+(N.z-w.z)*y.z)),I=c?{x:(c.vx||0)*.4,z:(c.vz||0)*.4}:{x:0,z:0};let F={x:D.x+y.x*(E-3.2)+I.x,z:D.z+y.z*(E-3.2)+I.z};r.desired=F,r.forward={...y};const k={x:r.x-D.x,z:r.z-D.z};let Z=F;if(k.x*y.x+k.z*y.z>-2.5&&Nt(r,D)<8){const N=o.orbitSide||=Math.sign(k.x*-y.z+k.z*y.x)||1;Z={x:D.x-y.x*4.5-y.z*N*5+I.x,z:D.z-y.z*4.5+y.x*N*5+I.z}}k.x*y.x+k.z*y.z<-3&&delete o.orbitSide,Z=DM(n,r,o,Z,y,_),r.desired=Z;const O=Wc(n,r,Z,i,{taskKey:S,active:Nt(r,Z)>.5,yielding:!!o.yield&&Nt(r,n.dog)<2.2});Ms(n,r,O,i,c?9:7);const z=c?[c]:m,C=new Map,P=new Set;if(!p&&!c&&!_)return{forces:C,memberIds:P,holds:A};const G=N=>{if(!_)return y;const $=ui(n,N,cu(n,_,N),wo(N));return zi($.x-N.x,$.z-N.z)},H=N=>{if(_?.kind==="bridge"&&bs(N,_.bridge,_.sign)>_.bridge.length/2+3)return!1;const $=G(N),rt=zi(N.x-r.x,N.z-r.z);return rt.x*$.x+rt.z*$.z>.6&&Nt(r,N)<8&&he(n,r,N,.15)};a>=2&&n.time>=(r.nextBarkAt||0)&&z.some(H)&&(r.barkUntil=n.time+.65,r.nextBarkAt=n.time+3.2,r.barking=!0,s.push({type:"buddyBark",x:r.x,z:r.z}));for(const N of z){if(!H(N))continue;const $=Ae(N),rt=(c?3.7:_?2.4:1.15)*e.helperStrength*(r.barking?1.45:1),mt=G(N),Et=c||_?0:(w.x-N.x)*-y.z+(w.z-N.z)*y.x,q=Math.max(-.6,Math.min(.6,Et*.12)),K={x:mt.x*rt-mt.z*q,z:mt.z*rt+mt.x*q},st={x:N.x+mt.x*.7,z:N.z+mt.z*.7};!le(n,st.x,st.z,$)||!he(n,N,st,$)||(C.set(N.id,K),P.add(N.id))}return{forces:C,memberIds:P,holds:A}}const BM=n=>Ae(n),kM=3,La=n=>({x:Math.sin(n.heading),z:Math.cos(n.heading)}),hu=(n,t,e)=>(n.x-t.x)*e.x+(n.z-t.z)*e.z;function GM(n,t,e){let i=t.bridgeCrossing;const s=BM(t);if(i){const f=La(i.bridge);if(hu(e,i.bridge,f)*i.sign>i.bridge.length/2+s+.7&&le(n,e.x,e.z,s))return t.lastBridge={bridge:i.bridge,sign:i.sign},delete t.bridgeCrossing,{finished:!0}}else t:for(const f of n.rivers||[])for(const d of f.bridges){const x=La(d),m=hu(e,d,x),p=(e.x-d.x)*x.z-(e.z-d.z)*x.x,g=(e.vx||0)*x.x+(e.vz||0)*x.z,v=t.lastBridge?.bridge===d&&Math.sign(g)!==t.lastBridge.sign,M=Math.abs(m)<=d.length/2+.15,_=!M&&!v&&e.pushed&&Math.abs(m)<=d.length/2+kM&&g*m<0;if(!(!M&&!_||Math.abs(p)>d.width/2-s-(_?.1:0)||!le(n,e.x,e.z,s))&&!(Math.abs(g)<.12)){i=t.bridgeCrossing={bridge:d,sign:Math.sign(g),lane:Math.max(-d.width/2+s+.35,Math.min(d.width/2-s-.35,p))};break t}}if(!i)return null;const r=i.bridge,o=La(r);let a;for(const f of[s+1.2,s+2,s+3.2,s+5]){const d=i.sign*(r.length/2+f),x={x:r.x+o.x*d+o.z*i.lane,z:r.z+o.z*d-o.x*i.lane};if(le(n,x.x,x.z,s)){a=x;break}}if(!a)return null;const c=il(n,e,a,s),l=c.x-e.x,h=c.z-e.z,u=Math.hypot(l,h);return u<.02||!he(n,e,c,s)?{x:0,z:0,forward:o}:{x:l/u,z:h/u,forward:o}}const HM=8,VM=3,WM=2,XM=9,Bf=n=>({x:Math.sin(n),z:Math.cos(n)}),uu=new WeakMap;function qM(n){const t=`${n.geometryRevision||0}:${(n.gates||[]).map(s=>s.open?1:0).join("")}`,e=uu.get(n);if(e?.key===t)return e.list;const i=ZM(n);return uu.set(n,{key:t,list:i}),i}function ZM(n){const t=(n.rivers||[]).flatMap(r=>r.bridges).map(r=>({bridge:r,x:r.x,z:r.z,heading:r.heading,width:r.width,half:r.length/2})),e=(n.gates||[]).filter(r=>!r.operable||r.open).map(r=>({x:r.x,z:r.z,heading:r.heading,width:r.width,half:0})),i=n.target&&ln(n.target),s=i?[{x:i.entrance.x,z:i.entrance.z,heading:n.target.heading,width:i.openingWidth,half:0,inwardOnly:!0}]:[];return[...t,...e,...s].filter(r=>r.width<XM)}function YM(n,t,e=Ae(t)){let i=null;for(const s of qM(n)){const r=Bf(s.heading),o=(t.x-s.x)*r.x+(t.z-s.z)*r.z,a=(t.x-s.x)*r.z-(t.z-s.z)*r.x,c=Math.abs(o)-s.half;if(c<-.01&&Math.abs(a)<=s.width/2||c<-1.5||c>HM||Math.abs(a)>s.width/2+3||s.inwardOnly&&o>0||i&&c>=i.outside)continue;const l=Math.sign(o)||1,h=Math.max(0,s.width/2-e-.35),u=Math.max(-h,Math.min(h,a)),f={x:-r.x*l,z:-r.z*l};i={opening:s,outside:c,inward:f,side:l,lateral:a,lane:u,mouth:{x:s.x+r.x*l*s.half+r.z*u,z:s.z+r.z*l*s.half-r.x*u}}}return i}function $M(n,t,e,i,s,r,o){const a=Ae(t),c=YM(n,e,a);if(!c||r.x*c.inward.x+r.z*c.inward.z<=.05)return delete t.chokeYield,s;const l=t.lastBridge;if(l&&l.bridge===c.opening.bridge&&-c.side!==l.sign)return delete t.chokeYield,s;const h=c.inward;let{x:u,z:f}=s;const d=o.x*h.x+o.z*h.z;d<0&&(u-=h.x*d,f-=h.z*d);const x=u*h.x+f*h.z;x<0&&Math.abs(c.lane-c.lateral)<.3&&(u-=h.x*x,f-=h.z*x);const m=Bf(c.opening.heading),p=c.lane-c.lateral;if(Math.abs(p)>.3&&c.outside<a+1.5){const M=Math.abs(c.lateral)>c.opening.width/2-a-.05&&c.outside<a+.45?-.5:Math.min(u*h.x+f*h.z,.3),_=Math.max(-1.5,Math.min(1.5,p*1.5));u=h.x*M+m.z*_,f=h.z*M-m.x*_}else{const v=Math.max(-1,Math.min(1,p*.8));u+=m.z*v,f-=m.x*v}if(t.chokeYield?.escapeUntil<=n.time&&delete t.chokeYield,!(t.chokeYield?.escapeUntil>n.time)){let v=null;for(const _ of i){if(_.id===t.id)continue;const S=_.x-e.x,w=_.z-e.z,A=S*h.x+w*h.z,D=Math.abs(S*h.z-w*h.x),y=a+Ae(_)+.25;A>0&&A<y+.3&&D<y&&(!v||A<v.front)&&(v={other:_,front:A,room:y})}const M=u*h.x+f*h.z;if(v){const _=t.chokeYield||={since:n.time};if(n.time-_.since>VM)t.chokeYield={since:n.time,escapeUntil:n.time+WM};else{const S=Math.max(0,(v.other.vx||0)*h.x+(v.other.vz||0)*h.z)+Math.max(0,v.front-v.room)*1.5;M>S&&(u-=h.x*(M-S),f-=h.z*(M-S))}}else delete t.chokeYield}return{x:u,z:f}}function KM(n){let t=n>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,(t>>>0)/4294967296}function vs(n,t,e,i=0){return KM((n^Math.imul(t+1,2654435761)^Math.imul(e+1,2246822507)^i)>>>0)}const JM=n=>Math.floor(Math.max(0,n)*.2);function jM(n){const t=n+1;return{wanderChance:t>70?.25:t>40?.2:.33,boltChance:t>40?.2:.1,duration:t>=70?[5,10]:t>=40?[4,6]:[3,5]}}function Xc(n){const t=n.animals.filter(s=>!s.saved),e=t.map(s=>s.id).join(",");if(n.wanderCohort&&n.wanderCohortSignature===e)return n.wanderCohort;const i=new Set(t.map(s=>({id:s.id,rank:vs(n.seed^Math.imul(n.index+1,7919),s.id,0,5370206)})).sort((s,r)=>s.rank-r.rank||s.id-r.id).slice(0,JM(t.length)).map(s=>s.id));return n.wanderCohort=i,n.wanderCohortSignature=e,n.wanderCohort}function QM(n,t,e,i,s=!1){if(n.index<7||t.saved||s||t.wander||t.wanderHome)return null;const r=jM(n.index);if(!Xc(n).has(t.id)||vs(n.seed,t.id,e,96785)>=r.wanderChance)return null;const o=t.x-i.x,a=t.z-i.z,c=Math.hypot(o,a),l=c>.01?{x:o/c,z:a/c}:{x:0,z:1},h=n.index>=16&&vs(n.seed,t.id,e,45079)<r.boltChance,u=h?r.duration[0]+vs(n.seed,t.id,e,1004)*(r.duration[1]-r.duration[0]):2.5,f=h?6*u+1:4+vs(n.seed,t.id,e,4292)*3;return{x:t.x+l.x*f,z:t.z+l.z*f,until:n.time+u,bolting:h}}function Ua(n,t,e){return 5+3*vs(n.seed^Math.imul(n.index+1,7919),t.id,e,49420)}function tv(n,t,e){if(!(e>0)||n.index<7||t.saved||(Number.isFinite(t.nextWanderCheck)||(t.wanderOpportunity=0,t.nextWanderCheck=n.time-e+Ua(n,t,0)),n.time+1e-8<t.nextWanderCheck))return null;const i=t.wanderOpportunity++;return t.nextWanderCheck+=Ua(n,t,t.wanderOpportunity),t.nextWanderCheck<=n.time&&(t.nextWanderCheck=n.time+Ua(n,t,t.wanderOpportunity)),i}const Na=.65;function kf(n){const t={x:Math.sin(n.heading),z:Math.cos(n.heading)},e=n.width/2+.65,i=n.material==="stone"?.3:.18,s=(r,o)=>({x:n.x+t.x*r*o+t.z*e,z:n.z+t.z*r*o-t.x*e});return[-1,1].map(r=>({...s(r,i+.08),y:1.05,sign:r,heading:n.heading+(r<0?Math.PI:0),approach:s(r,i+.62+.12)}))}function ev(n){n.geometryRevision=(n.geometryRevision||0)+1,n.flockVisibility?.clear()}function nv(n,t,e){const{a:i,b:s}=nl(t),r=t.material==="stone"?.3:.18;return[{body:e,radius:.62},...(n.animals||[]).map(a=>({body:a,radius:Ae(a)})),...(n.helpers||[]).filter(a=>a.type==="helper").map(a=>({body:a,radius:.62}))].some(({body:a,radius:c})=>a&&xe(a,jc(a,i,s))<c+r+.02)}function iv(n,t){const e=[],i=[t,...(n.helpers||[]).filter(s=>s.type==="helper")].filter(Boolean);for(const s of n.gates||[]){if(!s.operable)continue;const r=kf(s),o={x:Math.sin(s.heading),z:Math.cos(s.heading)},a=(u,f)=>((u.x-s.x)*o.x+(u.z-s.z)*o.z)*f.sign>0,c=i.some(u=>r.some(f=>a(u,f)&&xe(u,f)<=Na+.62)),l=!!s.buttonContact;if(!c){i.every(u=>r.every(f=>!a(u,f)||xe(u,f)>Na+.62+.2))&&(s.buttonContact=!1);continue}if(s.buttonContact=!0,!(l||!i.find(u=>le(n,u.x,u.z,.62)&&r.some(f=>a(u,f)&&xe(u,f)<=Na+.62&&he(n,u,f.approach,.62))))){if(s.open&&nv(n,s,t)){e.push({type:"gateBlocked",id:s.id});continue}s.open=!s.open,ev(n),e.push({type:"gateToggled",id:s.id,open:s.open})}}return e}const dn=(n,t,e)=>Math.max(t,Math.min(e,n)),_r=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),Xn=(n,t)=>{const e=Math.hypot(n,t);return e>1e-4?{x:n/e,z:t/e}:{x:0,z:0}},qc=n=>n.reduce((t,e)=>({x:t.x+e.x/n.length,z:t.z+e.z/n.length}),{x:0,z:0});function sv(n,t,e){const i=t.buddyRest;(!i||i.home!==e)&&(t.buddyRest={home:e,cycle:0,next:n.time+20+t.id*7%17});const s=t.buddyRest;if(n.time>=s.next&&(s.cycle++,s.next=n.time+24+(t.id*11+s.cycle*5)%19,delete s.target),!s.target){const r=t.id*2.399963+s.cycle*1.618,o=s.cycle===0?.45:.6,a={x:e.x+Math.sin(r)*o,z:e.z+Math.cos(r)*o},c=ku(n,a)&&le(n,a.x,a.z,Ae(t))&&he(n,t,a,Ae(t));s.target=c?a:{x:t.x,z:t.z},s.facing=c?void 0:r}return s.target}function Gf(n){const t=Math.max(0,(n.animals?.length||0)-5),e=Math.max(1,n.routes?.length||1),i=n.spawn&&n.target?_r(n.spawn,n.target):0;return dn(30+Math.ceil(t/5)+(e-1)*4+Math.floor(i/40)*2,30,60)}function Sl(n,t=n.animals.filter(e=>e.saved).length){const e=n.animals.length;return e?Math.floor(Math.max(0,n.reward)*dn(t,0,e)/e):0}function Zc(n,t=[],e=!1,i={blockedX:!1,blockedZ:!1}){const s=n.result?.saved??n.animals.filter(a=>a.saved).length,r=n.result?.total??n.animals.length,o=n.result?.score??Sl(n,s);return{saved:s,total:r,score:o,possibleScore:n.reward,completed:!!n.completed,justCompleted:e,reward:e?o:0,remaining:n.delivery?.remaining??null,countdownStarted:!!n.delivery?.started,events:t,helpers:n.helpers||[],dogCollision:i}}function fu(n,t,e=[],i){n.completed=!0;const s=n.animals.filter(r=>r.saved).length;return n.result={saved:s,total:n.animals.length,score:Sl(n,s),possibleScore:n.reward,reason:t},e.push({type:"levelCompleted",index:n.index,reward:n.result.score,reason:t}),Zc(n,e,!0,i)}function bo(n,t,e,i=.15){return he(n,t,e,i)}function rv(n,t,e=[]){const i=yl(n,t);return i.sort((s,r)=>r.length-s.length||r.filter(o=>e.includes(o.id)).length-s.filter(o=>e.includes(o.id)).length||Math.min(...s.map(o=>o.id))-Math.min(...r.map(o=>o.id))),i[0]||[]}function ov(n,t,e,i){const s=[e.drone&&"drone"].filter(Boolean);if(n.helpers||=[],n.helpers=n.helpers.filter(m=>s.includes(m.type)||e.helper&&m.type==="helper"),!s.length||!t.length)return{helpers:[],group:[],memberIds:new Set,hold:!1};const r=n.companionHerd||={},o=t.map(m=>m.id).join(",");(!r.group||r.activeSignature!==o||n.time-r.clusterTime>.25)&&(r.group=rv(n,t,r.clusterIds),r.activeSignature=o,r.clusterTime=n.time);const a=r.group;if(a.length<2){r.mode="standby",r.clusterIds=[],r.positions={};for(const m of s){let p=n.helpers.find(g=>g.type===m);p||(p={type:m,x:n.dog.x,z:n.dog.z},n.helpers.push(p)),p.mode="standby",p.clusterIds=[],p.anchor={x:p.x,z:p.z}}return{helpers:n.helpers,group:[],memberIds:new Set,hold:!1,state:r}}const c=qc(a),l=a.map(m=>m.id),h=new Set(l);let u=1/0;for(const m of a){const p=_r(n.dog,m);p<=18&&p<u&&bo(n,n.dog,m)&&(u=p)}const f=r.mode&&r.mode!=="standby"?r.mode==="hold"?u>=12:u>18:u>14,d=(r.clusterIds||[]).filter(m=>h.has(m)).length,x=!r.clusterIds||d<Math.min(r.clusterIds.length,l.length)/2;if(f&&(r.mode!=="hold"||x)&&(r.anchor={...c},r.positions=Object.fromEntries(a.map(m=>[m.id,{x:m.x,z:m.z}]))),f||(r.anchor={...c},r.positions={}),f)for(const m of a)r.positions[m.id]||={x:m.x,z:m.z};r.mode=f?"hold":"assist",r.clusterIds=l;for(const m of s){let p=n.helpers.find(M=>M.type===m);p||(p={type:m,x:m==="drone"?c.x:n.dog.x,z:m==="drone"?c.z:n.dog.z},n.helpers.push(p)),p.mode=r.mode,p.clusterIds=[...l],p.anchor={...r.anchor};const g=Xn(c.x-p.x,c.z-p.z),v=Math.min(_r(p,c),i*6);p.x+=g.x*v,p.z+=g.z*v}return{helpers:n.helpers,group:a,centroid:c,memberIds:h,hold:f,state:r}}function av(n,t,e,i){const s=new Map;if(!t.group.length||t.hold)return s;const{group:r,centroid:o}=t,a=Xn(o.x-e.x,o.z-e.z),c={x:-a.z,z:a.x},l=Math.min(1.2,i.droneStrength*.35),h=Math.max(2.1,Math.sqrt(r.length)*.66);for(const f of r){const d=(o.x-f.x)*c.x+(o.z-f.z)*c.z,x=dn(Math.sign(d)*Math.max(0,Math.abs(d)-h)*l,-.75,.75),m={x:c.x*x,z:c.z*x},p=Ae(f);x&&!bo(n,f,{x:f.x+m.x,z:f.z+m.z},p)||le(n,f.x+m.x*.7,f.z+m.z*.7,p)&&s.set(f.id,m)}const u=[...s.values()].reduce((f,d)=>({x:f.x+d.x,z:f.z+d.z}),{x:0,z:0});for(const f of s.values())f.x-=u.x/s.size,f.z-=u.z/s.size;return s}function Hf(n,t,e){if(t<=0)return;const i=ln(n.target);for(const s of n.animals){if(!s.saved)continue;const r=Ae(s),o=Qc(n.target,s),a=s.roamPhase??s.id*2.399963229728653;s.roamPhase=a;const c=i.halfLength-r-.48,l=i.halfWidth-r-.24,h={forward:Math.sin(e*.22+a)*c*.72,lateral:Math.cos(e*.19+a*1.7)*l*.72};let u=(h.forward-o.forward)*.32,f=(h.lateral-o.lateral)*.32;for(const _ of n.animals){if(_===s||!_.saved)continue;const S=s.x-_.x,w=s.z-_.z,A=Math.hypot(S,w),D=r+Ae(_)+.35;if(A>1e-4&&A<D){const y=(D-A)/A*.6;u+=(S*i.forward.x+w*i.forward.z)*y,f+=(S*i.side.x+w*i.side.z)*y}}const d=-i.halfLength+r;o.forward<d+.45&&(u+=(d+.45-o.forward)*1.2);const x=i.forward,m=i.side;let p=x.x*u+m.x*f,g=x.z*u+m.z*f;const v=Math.hypot(p,g);v>.65&&(p*=.65/v,g*=.65/v);const M={x:s.x,z:s.z};nr(n,s,p*t,g*t,r),le(n,s.x,s.z,r)&&Sr(n.target,s,r)||(s.x=M.x,s.z=M.z),s.vx=(s.x-M.x)/t,s.vz=(s.z-M.z)/t,s.heading=Math.hypot(s.vx,s.vz)>.03?Math.atan2(s.vx,s.vz):s.heading||0}}function cv(n,t=1/60){t=dn(Number(t)||0,0,.1),n.completed&&t>0&&(n.savedRoamTime=(n.savedRoamTime??(n.time||0))+t,Hf(n,t,n.savedRoamTime))}function lv(n,t,e={},i=1/60,s={}){const r=RM(s,n.index+1);if(i=dn(Number(i)||0,0,.1),n.completed||i<=0)return Zc(n);if(i>0&&n.delivery?.started&&(n.delivery.remaining=Math.max(0,n.delivery.remaining-i),n.delivery.remaining<=1e-8))return n.delivery.remaining=0,fu(n,"timeout");n.time=(n.time||0)+i;const o=Xc(n);Hf(n,i,n.time);const a=[],c=Number(e.x)||0,l=Number(e.z??e.y)||0,h=Math.min(1,Math.hypot(c,l)),u=Xn(c,l),f=7.8+r.speedBoost,d={x:t.x,z:t.z},x=nr(n,t,u.x*h*f*i,u.z*h*f*i,.62);t.vx=i?(t.x-d.x)/i:0,t.vz=i?(t.z-d.z)/i:0,t.heading=h>.03?Math.atan2(u.x,u.z):t.heading||0,n.dog=t;const m=n.animals.filter(O=>!O.saved),p=ov(n,m,r,i),g=av(n,p,t,r),v=OM(n,m,r,i,a);a.push(...iv(n,t));const M=7.6+r.signalBoost+(e.bark?3.3:0),_=m.map(O=>({...O})),S=n.flockVisibility||=new Map,w=new Map(_.map(O=>[O.id,`${Math.floor(O.x*5)},${Math.floor(O.z*5)}`])),A=(O,z)=>{const C=O.id<z.id?O:z,P=O.id<z.id?z:O,G=`${C.id}:${P.id}`,H=`${w.get(C.id)}:${w.get(P.id)}`,N=S.get(G);if(N?.position===H)return N.clear;const $=he(n,O,z,.15);return S.set(G,{position:H,clear:$}),$},D=new Map(_.map(O=>{const z=_r(O,t),C=z<M&&_d(n,O,t),P=C?Math.pow(1-z/M,.65)*(e.bark?1.65+r.barkBoost:1):0,G=z>.01?Xn(O.x-t.x,O.z-t.z):Xn(Math.sin(t.heading||0),Math.cos(t.heading||0));return[O.id,{active:C,urgency:P,x:G.x*P*5.2,z:G.z*P*5.2}]})),y=new Map,E=new Map,I=n.flockTravel||[],F=[];yl(n,_,A).forEach((O,z)=>{const C=O.filter(Gt=>!Gt.wander&&!Gt.wanderHome),P=C.length?C:O,G=qc(P);let H=0,N=0,$=0,rt=0;for(const Gt of P){H+=(Gt.vx||0)/P.length,N+=(Gt.vz||0)/P.length;const U=D.get(Gt.id),ie=v.forces.get(Gt.id);$+=(U.x+(ie?.x||0))/P.length,rt+=(U.z+(ie?.z||0))/P.length}const mt=O.map(Gt=>Gt.id),Et=new Set(mt),q=I.map(Gt=>({v:Gt,count:Gt.ids.filter(U=>Et.has(U)).length})).sort((Gt,U)=>U.count-Gt.count)[0],K=Math.hypot(H,N),st=Math.hypot($,rt),at=K>.28?Xn(H,N):st>.03?Xn($,rt):q?.count?q.v.forward:null,ct=at?Math.max(K>.28?H*at.x+N*at.z:0,st>.03?($*at.x+rt*at.z)*.65:0,0):0,Ot={center:G,forward:at,drive:ct,pressure:st};F.push({ids:mt,forward:at}),E.set(z,Ot);for(const Gt of O)y.set(Gt.id,z)}),n.flockTravel=F;for(let O=0;O<m.length;O++){const z=m[O],C=_[O],P=Ae(z),G=GM(n,z,C),H=G?.finished?null:G;G?.finished&&p.hold&&p.memberIds.has(z.id)&&(p.state.positions[z.id]={x:C.x,z:C.z});let N=0,$=0,rt=0,mt=0,Et=0,q=0,K=0,st=0;for(const J of _){if(J.id===z.id)continue;const Y=C.x-J.x,gt=C.z-J.z,ot=Math.hypot(Y,gt),xt=Math.max(2,P+Ae(J)+.35);if(ot<xt&&ot>.01){const pt=(xt-ot)/ot;N+=Y*pt,$+=gt*pt}ot<18&&y.get(C.id)===y.get(J.id)&&A(C,J)&&(rt+=J.x,mt+=J.z,Et+=J.vx,q+=J.vz,K++)}let at=N*2.5,ct=$*2.5;const Ot=D.get(z.id),Gt=Ot.active,U=v.memberIds.has(z.id),ie=!p.hold&&p.memberIds.has(z.id)||U;if((Gt||ie||H)&&(delete z.wander,delete z.wanderHome),Gt&&(at+=Ot.x,ct+=Ot.z,st=Ot.urgency,z.lastPlayerPressure=n.time),U){const J=v.forces.get(z.id);at+=J.x,ct+=J.z,st=Math.max(st,.45)}const Ht=v.holds?.get(z.id);G?.finished&&n.buddyHerd?.containment?.positions[z.id]&&(Object.assign(n.buddyHerd.containment.positions[z.id],{x:C.x,z:C.z}),n.buddyHerd?.containment&&(n.buddyHerd.containment.anchor={x:C.x,z:C.z}));const St=!H&&!Gt&&st<.03&&(!!Ht||p.hold&&p.memberIds.has(z.id)),At=()=>{z.wanderHome={x:C.x,z:C.z},delete z.wander};z.wander&&(n.time>=z.wander.until||!o.has(z.id))&&At();const et=tv(n,z,i);if(et!==null&&st<.03){const J=p.centroid||qc(_),Y=QM(n,z,et,J,Gt||ie||St||!!H);Y&&(z.wander=Y)}let nt=z.wander;if(St){const J=Ht||p.state.positions[z.id];if(Ht){const Y=sv(n,z,J),gt=Y.x-C.x,ot=Y.z-C.z,xt=Math.hypot(gt,ot);at=(xt>.055?gt*.9:0)+N*.35,ct=(xt>.055?ot*.9:0)+$*.35;const pt=Math.hypot(at,ct);pt>.38&&(at*=.38/pt,ct*=.38/pt)}else delete z.buddyRest,at=dn((J.x-C.x)*2.6+N*.35,-1.1,1.1),ct=dn((J.z-C.z)*2.6+$*.35,-1.1,1.1)}else{if(delete z.buddyRest,K&&!nt&&!z.wanderHome&&!(U&&n.buddyHerd?.retrieveId===z.id)){const Y=rt/K-C.x,gt=mt/K-C.z,ot=Math.hypot(Y,gt),xt=E.get(y.get(z.id)),pt=xt.forward,ht=pt&&(C.x-xt.center.x)*pt.x+(C.z-xt.center.z)*pt.z>.6;if(ot>2.6){const _t=Xn(Y,gt),Lt=Math.min(2.6,(ot-2.6)*.36)*.7*(1+r.cohesionBoost);let Ct=_t.x*Lt,Mt=_t.z*Lt;const qt=ht?Math.min(0,Ct*pt.x+Mt*pt.z):0;qt&&(Ct-=pt.x*qt,Mt-=pt.z*qt),at+=Ct,ct+=Mt}if(at+=Et/K*.45,ct+=q/K*.45,ht&&xt.drive>.03&&!Gt&&!U){const _t=Math.max(0,xt.drive-at*pt.x-ct*pt.z);at+=pt.x*_t,ct+=pt.z*_t,xt.pressure>.03&&(st=Math.max(st,Math.min(.35,xt.pressure/5.2)))}}const J=g.get(z.id);if(J&&le(n,C.x+J.x*.7,C.z+J.z*.7,P)&&bo(n,C,{x:C.x+J.x,z:C.z+J.z},P)&&(at+=J.x,ct+=J.z),st<.03&&(at+=Math.sin(n.time*.6+z.id*2.1)*.12,ct+=Math.cos(n.time*.5+z.id*1.7)*.12),nt){const Y=nt.x-C.x,gt=nt.z-C.z,ot=Math.hypot(Y,gt);ot>.35?(at+=Y/ot*(nt.bolting?5.8:2.1),ct+=gt/ot*(nt.bolting?5.8:2.1)):(At(),nt=null)}if(z.wanderHome&&!Gt&&!ie){const Y=z.wanderHome,gt=z.id*2.39996;at=(Y.x+Math.sin(n.time*.24+gt)*1.4-C.x)*.35+N*.2,ct=(Y.z+Math.cos(n.time*.19+gt)*1.4-C.z)*.35+$*.2}}if(st>.03&&!H&&!St&&!z.wanderHome&&!nt?.bolting){const J=U?v.forces.get(z.id):null,Y={x:(Gt?Ot.x:0)+(J?.x||0),z:(Gt?Ot.z:0)+(J?.z||0)};({x:at,z:ct}=$M(n,z,C,_,{x:at,z:ct},Y,{x:N*2.5,z:$*2.5}))}else delete z.chokeYield;if(H){const J=dn(N*H.forward.z-$*H.forward.x,-.7,.7),Y=z.type==="cow"?2.7:3.2;at=H.x*Y+H.forward.z*J*.5,ct=H.z*Y-H.forward.x*J*.5,st=Math.max(st,.4)}if(st>.03&&!H){const J=wd(n,z,at,ct,P);at+=J.x,ct+=J.z}const lt=z.wanderHome&&!St?.75:nt?.bolting?6:z.type==="cow"?3.3:4.2,It=Math.hypot(at,ct);It>lt&&(at*=lt/It,ct*=lt/It);const Xt=1-Math.exp(-i*(St?12:z.type==="cow"?3.5:5.5));z.vx+=(at-z.vx)*Xt,z.vz+=(ct-z.vz)*Xt;const R=!St&&z.wanderHome,b=R&&Math.hypot(z.x+z.vx*i-R.x,z.z+z.vz*i-R.z)>3,V=nr(n,z,b?0:z.vx*i,b?0:z.vz*i,P);if((V.blockedX||V.blockedZ)&&st>.03){const J=Xn(z.vx,z.vz),Y=Math.min(.24,Math.hypot(z.vx,z.vz)*i);for(const gt of[Math.PI/6,-Math.PI/6,Math.PI/3,-Math.PI/3,Math.PI/2,-Math.PI/2]){const ot=(J.x*Math.cos(gt)-J.z*Math.sin(gt))*Y,xt=(J.x*Math.sin(gt)+J.z*Math.cos(gt))*Y;if(le(n,z.x+ot,z.z+xt,P)){nr(n,z,ot,xt,P);break}}}if(V.blockedX&&(z.vx*=.45),V.blockedZ&&(z.vz*=.45),Math.hypot(z.vx,z.vz)>.1)z.heading=Math.atan2(z.vx,z.vz);else if(St&&z.buddyRest?.facing!==void 0){const J=z.heading||0,Y=z.buddyRest.facing,gt=Math.atan2(Math.sin(Y-J),Math.cos(Y-J)),ot=z.type==="cow"?Math.PI/1.5:Math.PI;z.heading=J+dn(gt,-ot*i,ot*i)}else z.heading||=0;z.alert=st,z.pushed=Gt||U;const tt=_r(t,n.target)<n.target.radius+12;i>0&&tt&&!St&&Sr(n.target,z,P)&&bo(n,t,z)&&(z.saved=!0,z.vx=0,z.vz=0,delete z.wander,delete z.wanderHome,delete z.nextWanderCheck,delete z.wanderOpportunity,delete z.buddyNavigation,delete z.bridgeCrossing,delete z.chokeYield,delete z.lastBridge,delete z.pushed,a.push({type:"animalSaved",id:z.id,animalType:z.type}))}const k=Xc(n);for(const O of n.animals)!O.saved&&O.wander&&!k.has(O.id)&&(O.wanderHome={x:O.x,z:O.z},delete O.wander);const Z=n.animals.filter(O=>O.saved).length;if(a.some(O=>O.type==="animalSaved")&&!n.delivery?.started){const O=Gf(n);n.delivery={started:!0,duration:O,remaining:O},a.push({type:"countdownStarted",duration:O})}return Z===n.animals.length&&Z>0?fu(n,"all-arrived",a,x):Zc(n,a,!1,x)}function Mr(){return{version:2,points:0,upgrades:{},completedLevels:[],bestScores:{},bestEarnedBolts:{},highestLevel:0,music:!0}}const wl=n=>80+n*25;function hv(n){const t={};if(!n||typeof n!="object"||Array.isArray(n))return t;for(const[e,i]of Object.entries(n)){const s=Number(e);String(s)!==e||!Number.isInteger(s)||s<0||s>99||!Number.isFinite(i)||i<=0||(t[s]=dn(Math.floor(i),0,wl(s)),t[s]||delete t[s])}return t}function bl(n){const t=Mr();if(!n||typeof n!="object")return t;t.points=Number.isFinite(n.points)?dn(Math.floor(n.points),0,1e9):0,t.upgrades=If(n.upgrades);const e=[...new Set((Array.isArray(n.completedLevels)?n.completedLevels:[]).filter(i=>Number.isInteger(i)&&i>=0&&i<=99))];if(t.bestEarnedBolts=hv(n.bestEarnedBolts),n.version===void 0||n.version===1)for(const i of e)t.bestEarnedBolts[i]=wl(i);return t.bestScores={...t.bestEarnedBolts},t.completedLevels=Object.keys(t.bestEarnedBolts).map(Number).sort((i,s)=>i-s),t.highestLevel=dn(Math.max(Number.isInteger(n.highestLevel)?n.highestLevel:0,...t.completedLevels.map(i=>i+1)),0,99),t.music=n.music!==!1,t}function uv(n,t){if(!t.completed||!Number.isInteger(t.index)||t.index<0||t.index>99)return 0;const e=t.result?.saved??t.animals.filter(o=>o.saved).length;if(e<=0||!t.animals.length)return 0;Object.assign(n,bl(n));const i=Math.min(wl(t.index),Sl(t,e)),s=n.bestEarnedBolts[t.index]||0,r=Math.max(0,i-s);return n.bestScores[t.index]=Math.max(n.bestScores[t.index]||0,i),n.bestEarnedBolts[t.index]=Math.max(s,i),n.completedLevels.includes(t.index)||n.completedLevels.push(t.index),n.completedLevels.sort((o,a)=>o-a),n.highestLevel=Math.min(99,Math.max(n.highestLevel,t.index+1)),n.points+=r,r}function fv(n,t="flock-foundry-v1"){try{return n||=globalThis.localStorage,bl(JSON.parse(n.getItem(t)))}catch{return Mr()}}function dv(n,t,e="flock-foundry-v1"){try{return t||=globalThis.localStorage,t.setItem(e,JSON.stringify(bl(n))),!0}catch{return!1}}const en=(n,t=0,e=1)=>Math.max(t,Math.min(e,n));function pv(n){const t=Math.max(0,...(n.routes||[]).map(e=>Number.isFinite(e.length)?e.length:0));return en(t/2+Gf(n),45,240)}function $s(n,t){let e=((n||0)^Math.imul(t,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),((e^e>>>15)>>>0)/4294967296}const du=n=>n?.position?{x:n.position.x,z:n.position.z}:n,mv=new Wt(4350794),gv=new Wt(5784367),xv=new Wt(7714243);function _v(n,t,e){const i=e.x-t.x,s=e.z-t.z,r=en(((n.x-t.x)*i+(n.z-t.z)*s)/(i*i+s*s||1));return Math.hypot(n.x-t.x-i*r,n.z-t.z-s*r)}function Fa(n,t){if(!le(n,t.x,t.z,.4))return!1;for(const e of n.rivers||[]){if(e.points.some((i,s)=>s&&_v(t,e.points[s-1],i)<e.width/2+.8))return!1;for(const i of e.bridges||[]){const s=t.x-i.x,r=t.z-i.z,o=s*Math.sin(i.heading)+r*Math.cos(i.heading),a=s*Math.cos(i.heading)-r*Math.sin(i.heading);if(Math.abs(o)<i.length/2+.45&&Math.abs(a)<i.width/2+.45)return!1}}return!0}function Mv(){const t=new Uint8Array(16384);for(let i=0;i<64;i++)for(let s=0;s<64;s++){const r=(i*64+s)*4,o=(Math.sin(i*.72+Math.sin(s*.31)*1.5)+Math.sin(i*1.37+s*.18))*.5,a=Math.round(145+o*28);t[r]=Math.round(a*.65),t[r+1]=a,t[r+2]=Math.min(255,a+24),t[r+3]=255}const e=new pf(t,64,64);return e.wrapS=e.wrapT=$n,e.repeat.set(1,5),e.magFilter=e.minFilter=Sn,e.needsUpdate=!0,e}class vv{constructor(t,{maxSplashes:e=12,maxPuddles:i=8}={}){this.scene=t,this.root=new te,this.root.name="Water and wetness effects",t.add(this.root),this.maxSplashes=Math.max(0,e|0),this.maxPuddles=Math.max(0,i|0),this.elapsed=0,this.wetness=0,this.level=null,this.flowMap=Mv(),this.flowMaterial=new nn({map:this.flowMap,color:9096146,transparent:!0,opacity:.16,depthWrite:!1,side:Ce}),this.splashGeometry=new Io(.2,.025,4,12),this.splashes=[],this.puddles=[],this.materialSnapshots=[],this.riverSnapshots=[],this.lastMoverPositions=new Map,this.lastSplashAt=new Map}setLevel(t,{grassMaterials:e=[],pathMaterials:i=[],waterMaterial:s=null,terrain:r=null,rivers:o=[],weather:a=null}={}){this.restoreMaterials(),this.clearEffects(),this.level=t,this.terrain=r,this.rivers=o,this.wetness=0,this.elapsed=0,this.puddleGrowthDuration=pv(t),this.rainElapsed=0,this.lastMoverPositions.clear(),this.lastSplashAt.clear();for(const[u,f]of[["grass",e],["path",i]])for(const d of Array.isArray(f)?f:[f])d?.color&&this.materialSnapshots.push({material:d,kind:u,color:d.color.clone(),roughness:d.roughness});this.waterSnapshot=s?{material:s,color:s.color?.clone(),roughness:s.roughness}:null;for(const u of o){if(!u?.mesh)continue;const f=u.mesh,d=this.flowMap.clone();d.repeat.set(1,1);const x=this.flowMaterial.clone();x.map=d,x.userData.ownedFlowMap=d;const m=f.geometry.clone(),p=m.attributes.position,g=m.attributes.uv,v=u.points;if(v?.length>1){for(let _=0;_<p.count;_++){const S=p.getX(_),w=p.getZ(_);let A=1/0,D=0,y=0,E=0;for(let I=1;I<v.length;I++){const F=v[I-1],k=v[I],Z=k.x-F.x,O=k.z-F.z,z=Math.hypot(Z,O);if(!z)continue;const C=en(((S-F.x)*Z+(w-F.z)*O)/(z*z)),P=S-F.x-C*Z,G=w-F.z-C*O,H=P*P+G*G;H<A&&(A=H,D=E+C*z,y=(-O*P+Z*G)/z),E+=z}g.setXY(_,y/Math.max(1,u.width||4),D/4)}g.needsUpdate=!0}const M=new ee(m,x);M.name="River flow",M.position.copy(f.position),M.position.y+=.003,M.rotation.copy(f.rotation),M.scale.copy(f.scale),M.frustumCulled=f.frustumCulled,M.userData.flow={heading:u.heading||0,speed:u.flowSpeed??.12,localUV:v?.length>1},this.root.add(M)}for(let u=0;u<this.maxSplashes;u++){const f=new nn({color:13233904,transparent:!0,opacity:.78,depthWrite:!1}),d=new ee(this.splashGeometry,f);d.visible=!1,d.rotation.x=-Math.PI/2,this.root.add(d),this.splashes.push({mesh:d,material:f,age:1})}const c=new pl(1,20);this.puddleResources={geometry:c};const l=t.seed??t.index??0,h=$s(l,71)<.5?0:1+Math.floor($s(l,72)*3);for(const u of this.findPuddleSites()){const f=new nn({color:4549225,transparent:!0,opacity:.2,depthWrite:!1,side:Ce}),d=new ee(c,f);d.rotation.x=-Math.PI/2,d.visible=!1,d.position.set(u.x,qn(t,u.x,u.z)+.024,u.z),d.scale.set(u.radius,u.radius*.62,1),this.root.add(d),this.puddles.push({mesh:d,material:f,depth:0,site:u,initialDepth:this.puddles.length<h?.1+$s(l,80+this.puddles.length)*.1:0})}if(a){this.wetness=a.kind==="storm"?.6:a.kind==="heavy-rain"?.35:a.type==="rain"?.03:0;for(const u of this.puddles)u.depth=a.type==="rain"?u.initialDepth:0,this.applyPuddleAppearance(u);this.applySurfaceWeather(a)}}findPuddleSites(){const t=this.level,e=t.bounds,i=[],s=e.maxX-e.minX,r=e.maxZ-e.minZ,o=t.seed??t.index??0,a=(l,h)=>{const{x:u,z:f}=l,d=Array.from({length:48},(x,m)=>{const p=1+Math.floor(m/16),g=m%16*Math.PI/8;return{x:u+Math.cos(g)*h*p/3,z:f+Math.sin(g)*h*.62*p/3}});return!Fa(t,l)||d.some(x=>!Fa(t,x))||i.some(x=>Math.hypot(x.x-u,x.z-f)<x.radius+h+.3)?!1:(i.push({...l,radius:h}),!0)},c=(t.routes||[]).filter(l=>l.points?.length>1);for(let l=0;l<this.maxPuddles&&c.length;l++){const h=c[l%c.length],u=h.points,f=u.slice(1).map((p,g)=>Math.hypot(p.x-u[g].x,p.z-u[g].z)),d=f.reduce((p,g)=>p+g,0),x=1.35+$s(o,150+l)*.69,m=l/Math.max(1,this.maxPuddles-1);for(let p=0;p<35;p++){let g=en(m+(p<7?0:(Math.ceil((p-6)/7)%2?1:-1)*.035))*d,v=0;for(;v<f.length-1&&g>f[v];)g-=f[v++];const M=u[v],_=u[v+1],S=f[v]||1,w=en(g/S),A=[0,2.5,-2.5,4,-4,6,-6][p%7]*($s(o,200+l)<.5?-1:1),D={x:M.x+(_.x-M.x)*w-(_.z-M.z)/S*A,z:M.z+(_.z-M.z)*w+(_.x-M.x)/S*A};if(a(D,x))break}}for(let l=1;l<Math.max(100,this.maxPuddles*80)&&i.length<this.maxPuddles;l++){const h=e.minX+2+l*.61803398875%1*Math.max(1,s-4),u=e.minZ+2+l*.75487766625%1*Math.max(1,r-4);a({x:h,z:u},1.35+l*37%70/100)}return i}applyPuddleAppearance(t){const e=Math.sqrt(t.depth);t.mesh.scale.set(t.site.radius*e,t.site.radius*.62*e,1),t.mesh.visible=t.depth>.008,t.material.opacity=t.mesh.visible?.18+t.depth*.24:0}restoreMaterials(){for(const t of this.materialSnapshots)t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color.dispose?.();if(this.materialSnapshots=[],this.waterSnapshot){const t=this.waterSnapshot;t.color&&t.material.color&&t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color?.dispose?.(),this.waterSnapshot=null}}clearEffects(){for(const t of this.splashes)this.root.remove(t.mesh),t.material.dispose();for(const t of this.puddles)this.root.remove(t.mesh),t.material.dispose();this.splashes=[],this.puddles=[],this.puddleResources&&(this.puddleResources.geometry.dispose(),this.puddleResources=null);for(const t of[...this.root.children])t.name==="River flow"&&(this.root.remove(t),t.material.userData.ownedFlowMap?.dispose(),t.material.dispose(),t.geometry.dispose())}applySurfaceWeather(t={}){const e=t.type==="rain"?en(t.rainIntensity??t.intensity??0):0;for(const i of this.materialSnapshots){const s=this.wetness*(i.kind==="grass"?.62:.85);i.material.color.copy(i.color).lerp(i.kind==="grass"?mv:gv,s),i.roughness!==void 0&&(i.material.roughness=Math.max(.28,i.roughness-this.wetness*.22))}if(this.waterSnapshot){const i=this.waterSnapshot,s=en(t.cloudCoverage??0);i.material.color&&i.color&&i.material.color.copy(i.color).lerp(xv,en((t.rainIntensity??e)*.11+s*.035+(t.severity||0)*.025+(t.lightningFlash||0)*.09)),i.roughness!==void 0&&(i.material.roughness=en(i.roughness-(t.rainIntensity??e)*.16,.12,1))}}update(t,{weather:e={},movers:i=[],paused:s=!1}={}){if(!this.level||s||!(t>0))return;t=Math.min(t,.1),this.elapsed+=t;const r=e.type==="rain"?en(e.rainIntensity??e.intensity??0):0;this.wetness=en(this.wetness+r*t*.012-t*(e.type==="sun"?.004:.0012)),this.applySurfaceWeather(e);for(const o of this.root.children)if(o.userData.flow){const a=o.userData.flow,c=o.material.map,l=t*(a.speed+(e.windIntensity||0)*.025);c.offset.x=(c.offset.x+(a.localUV?0:Math.sin(a.heading))*l)%1,c.offset.y=(c.offset.y+(a.localUV?1:Math.cos(a.heading))*l)%1,o.material.opacity=.08+r*.18+(e.daylight??.7)*.025+(e.lightningFlash||0)*.2}r>0&&(this.rainElapsed+=t);for(const o of this.puddles)o.depth=r>0?en(o.initialDepth+(1-o.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):en(o.depth-t*(e.type==="sun"?.006:8e-4)),this.applyPuddleAppearance(o);for(const o of i){const a=du(o);if(!a||!Number.isFinite(a.x)||!Number.isFinite(a.z))continue;const c=o.id??o.kind??"mover",l=du(o.previousPosition)||(Number.isFinite(o.previousX)?{x:o.previousX,z:o.previousZ}:this.lastMoverPositions.get(c)),h=l&&Math.hypot(a.x-l.x,a.z-l.z)>.008,u=this.puddles.find(f=>f.mesh.visible&&(a.x-f.site.x)**2/f.site.radius**2+(a.z-f.site.z)**2/(f.site.radius*.62)**2<f.depth);h&&u&&Fa(this.level,a)&&this.elapsed-(this.lastSplashAt.get(c)||-10)>.22&&(this.spawnSplash(a),this.lastSplashAt.set(c,this.elapsed)),this.lastMoverPositions.set(c,{x:a.x,z:a.z})}for(const o of this.splashes)o.age>=1||(o.age=Math.min(1,o.age+t*2.4),o.mesh.scale.setScalar(.4+o.age*2.3),o.mesh.position.y=.06+qn(this.level,o.mesh.position.x,o.mesh.position.z)+o.age*.06,o.material.opacity=.78*(1-o.age),o.age>=1&&(o.mesh.visible=!1))}spawnSplash(t){const e=this.splashes.find(i=>i.age>=1);e&&(e.age=0,e.mesh.position.set(t.x,qn(this.level,t.x,t.z)+.08,t.z),e.mesh.scale.setScalar(.35),e.mesh.visible=!0)}dispose(){this.restoreMaterials(),this.clearEffects(),this.root.removeFromParent(),this.flowMap.dispose(),this.flowMaterial.dispose(),this.splashGeometry.dispose(),this.level=null,this.scene=null}}const Vf={sun:{rainIntensity:0,windIntensity:.12,severity:0,cloudCoverage:.22,daylight:1},wind:{rainIntensity:0,windIntensity:.6,severity:.3,cloudCoverage:.4,daylight:.96},rain:{rainIntensity:.3,windIntensity:.3,severity:.28,cloudCoverage:.5,daylight:.94},"heavy-rain":{rainIntensity:.65,windIntensity:.55,severity:.6,cloudCoverage:.7,daylight:.82},storm:{rainIntensity:.9,windIntensity:.85,severity:.88,cloudCoverage:.85,daylight:.7}};function El(n,t){let e=(n^Math.imul(t+1,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),(e^e>>>15)>>>0}function yv(n,t,e){const i=e+1;if(i<=5)return"sun";const s=typeof n.weather=="string"?n.weather:n.weather?.kind||n.weather?.type,r=s==="light-rain"||s==="snow"?"rain":s;if(r&&Vf[r])return r==="sun"||r==="wind"?r:i<9?"sun":r==="storm"&&i>=24?"storm":(r==="storm"||r==="heavy-rain")&&i>=16?"heavy-rain":"rain";if(i===9)return"rain";if(i===16)return"heavy-rain";if(i===24)return"storm";const o=El(t,e)/4294967296;return i<9?o<.65?"sun":"wind":i<16?o<.35?"sun":o<.5?"wind":"rain":i<24?o<.25?"sun":o<.35?"wind":o<.65?"rain":"heavy-rain":o<.2?"sun":o<.3?"wind":o<.5?"rain":o<.75?"heavy-rain":"storm"}function Wf(n={}){const t=Number.isFinite(n.index)?Math.max(0,Math.floor(n.index)):0,e=Number.isFinite(n.seed)?n.seed>>>0:42,i=yv(n,e,t),s=Vf[i];return{...s,kind:i,type:i==="heavy-rain"||i==="storm"?"rain":i,snowIntensity:0,storm:i==="storm",elapsed:0,seed:e,levelIndex:t,intensity:Math.max(s.rainIntensity,i==="wind"?s.windIntensity:0),wind:.2+s.windIntensity*1.6,particles:s.rainIntensity>0?128:0,lightningId:null,lightningAge:1/0,thunderDelay:.8,lightningFlash:0,clouds:0,butterflies:i==="storm"?0:s.rainIntensity>0?4:8,birds:i==="storm"?0:5,squirrels:i==="storm"?0:3,lightningStart:8+El(e,t+1e3)%401/100,lightningInterval:24}}function Sv(n,t){if(Number.isFinite(t)&&t>0&&(n.elapsed+=t),!n.storm)return n;const e=Math.floor((n.elapsed-n.lightningStart)/n.lightningInterval);return e<0||(n.lightningId=`${n.seed}:${n.levelIndex}:${e}`,n.lightningAge=Math.max(0,n.elapsed-(n.lightningStart+e*n.lightningInterval)),n.thunderDelay=.8+El(n.seed,n.levelIndex+e+2e3)%9/10,n.lightningFlash=n.lightningAge<.22?.9*(1-n.lightningAge/.22):0),n}const ar=(n,t,e)=>Math.max(t,Math.min(e,n)),Eo=(n,t)=>Math.hypot(n.x-t.x,n.z-t.z),Tl=n=>()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296);function wv(n,t=Wf(n)){if(t.kind==="storm"||t.storm)return{squirrel:0,rabbit:0,bird:0,butterfly:0};const e=(n.bounds.maxX-n.bounds.minX)*(n.bounds.maxZ-n.bounds.minZ),i=Tl((n.seed||42)^1464421444),s=ar(e/3600,.55,2.4),r=(o,a)=>Math.min(a,Math.max(1,Math.round(o*s*(.78+i()*.44))));return{squirrel:r(2,7),rabbit:r(2,8),bird:Math.min(6,Math.max(2,Math.round(3*s))),butterfly:Math.min(8,Math.max(0,Math.round(5*s)))}}function bv(n,t){let e=1/0;for(const i of n.roads||[]){const s=i.points||[i.from,i.to];for(let r=1;r<s.length;r++){const o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,h=ar(((t.x-o.x)*c+(t.z-o.z)*l)/(c*c+l*l||1),0,1);e=Math.min(e,Math.hypot(t.x-o.x-c*h,t.z-o.z-l*h))}}return e}const pu=new WeakMap;function Ev(n,t){let e=pu.get(n);e||(e=new Map,pu.set(n,e));let i=e.get(t);if(!i||i.sourceRivers!==n.rivers||i.sourceObstacles!==n.obstacles||i.sourceFenceSegments!==n.fenceSegments||i.targetType!==n.target?.type){const s=n.bounds,r=(n.fenceSegments||[]).filter(o=>o.kind==="wall"||o.kind==="stone"||o.material==="stone"||o.kind==="target"&&n.target?.type==="barn");i={...n,sourceRivers:n.rivers,sourceObstacles:n.obstacles,sourceFenceSegments:n.fenceSegments,targetType:n.target?.type,fenceSegments:r,bounds:{minX:s.minX-t-1,maxX:s.maxX+t+1,minZ:s.minZ-t-1,maxZ:s.maxZ+t+1}},e.set(t,i)}return i}function Al(n,t,e=.45){const i=n.bounds;return t.x>=i.minX-e&&t.x<=i.maxX+e&&t.z>=i.minZ-e&&t.z<=i.maxZ+e&&le(Ev(n,e),t.x,t.z,.4)}function Tv(n,t,e=[],i=.45){return bv(n,t)>5.5&&Al(n,t,i)&&e.every(s=>Eo(t,s)>8)}const Av={butterfly:.54,squirrel:.58,bird:.64,rabbit:.76};function Rv(n,t){let e=null,i=18;for(const s of n.obstacles||[]){const r=Eo(t,s);if(r>=i||r<.01)continue;const o=s.radius+.85,a=(t.x-s.x)/r,c=(t.z-s.z)/r,l={x:s.x+a*o,z:s.z+c*o};Al(n,l,.2)&&(e=l,i=r)}return e||{x:t.homeX,z:t.homeZ}}function Cv(n){const t=Tl(n.randomSeed||(Math.floor((n.phase||0)*1e6)^n.slot||1)>>>0);n.randomSeed=Math.floor(t()*4294967295)||1;const e=t()*Math.PI*2,i=3+t()*8;n.waypointX=n.homeX+Math.cos(e)*i,n.waypointZ=n.homeZ+Math.sin(e)*i,n.waitTimer=0}function Pv(n,t,e,i=[],s=0,r=n.weather,o=Al){const a=typeof r=="function";if(a&&(o=r,r=n.weather),!(e>0))return t;const c=t.x,l=t.z,h=ar(Number(r?.severity)||0,0,1),u=Av[t.kind]??.64;h>=u?t.sheltering=!0:h<u-.12&&(t.sheltering=!1);const f=t.kind==="bird"?10:t.kind==="butterfly"?6:7.5;let d=!1,x=0,m=0;for(const w of i){const A=Eo(t,w);A<f&&(d=!0,x+=(t.x-w.x)/Math.max(.1,A)*(f-A),m+=(t.z-w.z)/Math.max(.1,A)*(f-A))}if(d)t.fleeing||(t.homeX=t.x,t.homeZ=t.z),t.waypointX=void 0,t.waypointZ=void 0,t.alertTimer=1.15,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,t.shelterX=void 0;else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.sheltering){if(t.shelterX===void 0){const w=Rv(n,t);t.shelterX=w.x,t.shelterZ=w.z}t.shelter=Math.min(1,(t.shelter||0)+e*.32),x=t.shelterX-t.x,m=t.shelterZ-t.z}else if(t.shelter=Math.max(0,(t.shelter||0)-e*.48),t.hidden=t.shelter>=.995,t.shelterX!==void 0&&t.shelter===0&&(t.shelterX=void 0,t.shelterZ=void 0,t.waypointX=void 0),t.alertTimer>0)x=m=0;else if((t.waitTimer||0)>0)t.waitTimer=Math.max(0,t.waitTimer-e),x=m=0;else if(t.waypointX!==void 0&&Eo(t,{x:t.waypointX,z:t.waypointZ})<.45){const w=Tl(t.randomSeed||1);t.randomSeed=Math.floor(w()*4294967295)||1,t.waypointX=void 0,t.waypointZ=void 0,t.waitTimer=.55+w()*2.1,x=m=0}else t.waypointX===void 0&&Cv(t),x=t.waypointX-t.x,m=t.waypointZ-t.z;let p=Math.hypot(x,m);if(d&&p<.01){const w=Number.isFinite(t.heading)?t.heading:t.phase||0;x=Math.sin(w),m=Math.cos(w),p=1}const g=t.kind==="rabbit",v=((t.gait||0)%1+1)%1,M=!g||v<.54;let _=d?t.kind==="bird"?5.2:g?4.2:3.5:t.kind==="squirrel"?.9:g?3.5:t.kind==="bird"?1.4:.8;t.sheltering&&!d&&(_=.95);const S=p>.01&&M?Math.min(p,e*_):0;if(S){const w=t.x+x/p*S,A=t.z+m/p*S,D=y=>a?o(n,y.x,y.z,.4):o(n,y,.45);t.kind==="bird"||D({x:w,z:A})?(t.x=w,t.z=A):D({x:w,z:t.z})?t.x=w:D({x:t.x,z:A})&&(t.z=A)}if(t.moving=Math.hypot(t.x-c,t.z-l)>.001,t.moving)t.heading=Math.atan2(t.x-c,t.z-l),t.stuckTimer=0;else if(S>.001&&(t.stuckTimer=(t.stuckTimer||0)+e,t.stuckTimer>=1)){const w=n.bounds;t.waypointX=t.x>w.maxX-.2?w.maxX-1.2:t.x<w.minX+.2?w.minX+1.2:ar(t.homeX,w.minX+1.2,w.maxX-1.2),t.waypointZ=t.z>w.maxZ-.2?w.maxZ-1.2:t.z<w.minZ+.2?w.minZ+1.2:ar(t.homeZ,w.minZ+1.2,w.maxZ-1.2),t.shelterX=void 0,t.shelterZ=void 0,t.stuckTimer=0,t.waitTimer=.2}return t.fleeing=d,t.alert=d||t.alertTimer>0,t.gait=(t.gait||0)+e*(d?1.8:g?1.35:t.kind==="squirrel"?1.7:1.2),t.hidden=t.shelter>=.995&&!d,t}const Xf={squirrel:[{part:"body",at:[0,.31,0],scale:[.2,.23,.32],color:"#a97552"},{part:"head",at:[0,.47,.2],scale:[.17,.17,.17],color:"#bd8960"},{part:"tail",at:[0,.48,-.34],scale:[.2,.31,.19],color:"#8e5b3e",tilt:-.48},{part:"ear",at:[-.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"ear",at:[.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"paw",at:[-.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"eye",at:[-.105,.5,.33],scale:[.025,.03,.018],color:"#171819"},{part:"eye",at:[.105,.5,.33],scale:[.025,.03,.018],color:"#171819"}],rabbit:[{part:"body",at:[0,.31,-.02],scale:[.25,.27,.34],color:"#d6c7aa"},{part:"haunch",at:[0,.25,-.23],scale:[.23,.23,.22],color:"#c4b08f"},{part:"head",at:[0,.48,.25],scale:[.17,.17,.17],color:"#e4d6bd"},{part:"ear",at:[-.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"ear",at:[.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"tail",at:[0,.34,-.4],scale:[.095,.1,.095],color:"#f0e9dc"},{part:"paw",at:[-.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"eye",at:[-.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"},{part:"eye",at:[.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"}]};function zv(n){const t=[],e=[],i=[],s=new Bi(1,10,8).toNonIndexed(),r=s.getAttribute("position"),o=s.getAttribute("normal"),a=new Wt,c=new jt;for(const h of Xf[n]){if(h.part==="paw")continue;const u=new bn(h.tilt||0,0,0),f=new se().compose(new L(...h.at),new Kn().setFromEuler(u),new L(...h.scale));c.getNormalMatrix(f),a.set(h.color);for(let d=0;d<r.count;d++){const x=new L().fromBufferAttribute(r,d).applyMatrix4(f),m=new L().fromBufferAttribute(o,d).applyMatrix3(c).normalize();t.push(x.x,x.y,x.z),e.push(m.x,m.y,m.z),i.push(a.r,a.g,a.b)}}s.dispose();const l=new _e;return l.setAttribute("position",new $t(t,3)),l.setAttribute("normal",new $t(e,3)),l.setAttribute("color",new $t(i,3)),l.computeBoundingSphere(),l}const Dv={light:96,heavy:176,storm:256},Iv={light:16,heavy:23,storm:30},Vn=1.25;class Lv{constructor(t){this.root=new te,this.root.name="Visible rain",t.add(this.root),this.geometry=new _e,this.material=new mf({color:"#e5f2f4",transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1}),this.lines=new Zp(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=20,this.root.add(this.lines),this.randomState=8029,this.positions=new Float32Array(0),this.drops=[],this.active=0,this.fallbackCamera=new Lo(-30,30,20,-20,.1,180),this.fallbackCamera.position.set(0,36,29),this.fallbackCamera.lookAt(0,0,-2)}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}resize(t){t!==this.active&&(this.active=t,this.positions=new Float32Array(t*6),this.drops=Array.from({length:t},()=>({x:(this.random()*2-1)*Vn,y:(this.random()*2-1)*Vn})),this.geometry.setAttribute("position",new He(this.positions,3)),this.geometry.setDrawRange(0,t*2))}update(t,{weather:e={},camera:i=this.fallbackCamera,paused:s=!1}={}){const r=e.kind||e.type,o=Math.max(0,Math.min(1,e.rainIntensity??e.intensity??0)),a=r==="storm"||e.severity>=.78?"storm":r==="heavy-rain"||o>=.68?"heavy":r==="rain"&&o>.02?"light":null;if(this.resize(a?Dv[a]:0),!this.active)return;this.material.opacity=a==="light"?.48:a==="heavy"?.6:.7;const c=s?0:Math.min(.1,Math.max(0,Number(t)||0)),l=Math.max(-8,Math.min(8,e.windIntensity??e.wind??0)),h=Iv[a],u=a==="storm"?(l<0?-1:1)*Math.max(10,Math.abs(l)*16):l*3,f=new L(u,-h,0),d=a==="light"?.8:a==="heavy"?1.3:1.8;i.updateMatrixWorld(!0);const m=new L(0,0,0).unproject(i).clone().add(f).project(i);for(let p=0;p<this.active;p++){const g=this.drops[p];g.x+=m.x*c,g.y+=m.y*c,g.y<-Vn&&(g.y+=Vn*2,g.x=(this.random()*2-1)*Vn),g.x>Vn&&(g.x-=Vn*2),g.x<-Vn&&(g.x+=Vn*2);const v=new L(g.x,g.y,0).unproject(i),M=v.clone().addScaledVector(f,d/h);v.toArray(this.positions,p*6),M.toArray(this.positions,p*6+3)}this.geometry.attributes.position.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose(),this.root.removeFromParent()}}const Uv=(n,t,e)=>Math.max(t,Math.min(e,n));function Nv(n){let t=n>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}class Fv{constructor(t){this.scene=t,this.root=new te,this.root.name="Meadow nature",t.add(this.root),this.resources=new Set,this.time=0,this.wildlife=[],this.batches={},this.transform=new we}own(t){return this.resources.add(t),t}clear(){this.root.traverse(t=>{t.isInstancedMesh&&t.dispose()}),this.root.clear(),this.resources.forEach(t=>t.dispose()),this.resources.clear(),this.rainView?.dispose(),this.rainView=null,this.wildlife=[],this.batches={},this.precipitation=null}batch(t,e,i,s){const r=new ai(e,i,s);return r.instanceMatrix.setUsage(xs),r.frustumCulled=!1,this.root.add(r),this.batches[t]=r,r}setLevel(t){this.clear(),this.level=t,this.time=0,this.weather=Wf(t);const e=Nv((t.seed||42)+71053),i=t.bounds,s=i.maxX-i.minX,r=i.maxZ-i.minZ,o=[t.dog||t.spawn,...t.animals||[]].filter(Boolean),a=this.own(new Bi(1,10,8)),c=wv(t),l=["butterfly","bird","squirrel","rabbit"];for(const u of l){const f=c[u]||0;if(f)for(let d=0;d<f;d++){let x=null;for(let m=0;m<240;m++){const p=(t.roads||[]).flatMap(S=>S.points||[S.from,S.to]).filter(Boolean),g=m<120&&p.length?p[Math.floor(e()*p.length)]:null,v=e()*Math.PI*2,M=8+e()*13,_=g?{x:g.x+Math.cos(v)*M,z:g.z+Math.sin(v)*M}:{x:i.minX+2+e()*(s-4),z:i.minZ+2+e()*(r-4)};if(Tv(t,_,o,.5)){x=_;break}}this.wildlife.push({kind:u,slot:d,x:x?.x??0,z:x?.z??0,homeX:x?.x??0,homeZ:x?.z??0,phase:e()*Math.PI*2,heading:e()*Math.PI*2,visible:!!x,gait:0,hidden:!1,hideTimer:0})}}const h={bird:["#54777b","#91adb0"],butterfly:["#65523f","#f2ac75"]};for(const u of["bird","butterfly"]){const f=c[u]||0;if(!f)continue;const[d,x]=h[u];this.batch(`${u}Body`,a,this.own(new re({color:d,roughness:1})),f),this.batch(`${u}Wing`,a,this.own(new re({color:x,roughness:1})),f*2)}for(const u of["squirrel","rabbit"]){const f=c[u]||0;if(!f)continue;this.batch(`${u}Body`,this.own(zv(u)),this.own(new re({vertexColors:!0,roughness:.94})),f);const d=u==="squirrel"?"#74503b":"#b09b7c";this.batch(`${u}Paw`,a,this.own(new re({color:d,roughness:.94})),f*2)}this.rainView=new Lv(this.root),this.update(0,{dog:t.dog||t.spawn,animals:t.animals})}pose(t,e,i,s,r,o,a,c,l=0,h=0,u=0){const f=this.transform;f.position.set(i,s,r),f.rotation.set(u,l,h),f.scale.set(o,a,c),f.updateMatrix(),t.setMatrixAt(e,f.matrix)}hideParts(t){if(t.kind==="bird"||t.kind==="butterfly"){this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Wing`],t.slot*2+e,0,-100,0,0,0,0)}else{this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Paw`],t.slot*2+e,0,-100,0,0,0,0)}}update(t,{dog:e,animals:i=[],camera:s,paused:r=!1}={}){if(!this.level)return;t=r?0:Uv(Number(t)||0,0,.1),this.time+=t,Sv(this.weather,t);const o=this.time,a=[e,...i,...this.level.helpers||[]].filter(Boolean);for(const c of this.wildlife){if(Pv(this.level,c,t,a,o,this.weather),!c.visible||c.hidden){this.hideParts(c);continue}const l=c.kind==="bird"||c.kind==="butterfly",h=c.kind==="squirrel",u=c.kind==="rabbit",f=((c.gait||0)%1+1)%1,d=f<.54,x=u&&c.moving&&d?Math.sin(f/.54*Math.PI)*.24:h&&c.moving?Math.abs(Math.sin(f*Math.PI*2))*.1:0,m=Math.max(.06,1-(c.shelter||0)*.94),p=(h?.12:u?.04:l?3.2:1)+qn(this.level,c.x,c.z)+(l?Math.sin(o*(c.kind==="bird"?1.5:2)+c.phase)*.28:x)+(c.alert?.08:0);if(h||u){const g=u&&!d?.9:1,v=u&&d?-.14*Math.sin(f/.54*Math.PI):0,M=h&&c.moving?Math.sin(f*Math.PI*2)*.06:0;this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,p,c.z,m,m*g,m,c.heading,M,v);const _=Xf[c.kind].filter(S=>S.part==="paw");for(let S=0;S<_.length;S++){const w=_[S],A=c.moving?u&&d?Math.sin(f/.54*Math.PI)*.08:Math.sin(f*Math.PI*2+S*Math.PI)*.07:0,D=w.at[0],y=w.at[2],E=c.x+Math.cos(c.heading)*D+Math.sin(c.heading)*y,I=c.z-Math.sin(c.heading)*D+Math.cos(c.heading)*y;this.pose(this.batches[`${c.kind}Paw`],c.slot*2+S,E,p+w.at[1]*m+A,I,w.scale[0]*m,w.scale[1]*m,w.scale[2]*m,c.heading)}}else{this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,p,c.z,(c.kind==="bird"?.09:.075)*m,(c.kind==="bird"?.08:.06)*m,(c.kind==="bird"?.28:.12)*m,c.heading);for(let g=0;g<2;g++){const v=Math.sin(o*(c.kind==="bird"?11:18)+c.phase)*(c.kind==="bird"?.5:.85);this.pose(this.batches[`${c.kind}Wing`],c.slot*2+g,c.x+(g?1:-1)*.15,p+.04,c.z,.22*m,.025*m,.16*m,c.heading,(g?1:-1)*v)}}}for(const c of Object.values(this.batches))c.instanceMatrix.needsUpdate=!0;this.rainView?.update(t,{weather:this.weather,camera:s,paused:r})}dispose(){this.clear(),this.scene.remove(this.root),this.level=null}}const mo=0,Ov=1,Bv=new L,mu=new Um,Oa=new ri,gu=new L,ro=new rn;class kv{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new xu,this.unassigned=new xu,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.vertices.push(new Gv(t[e]));this._compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(i){const s=i.geometry;if(s!==void 0){const r=s.attributes.position;if(r!==void 0)for(let o=0,a=r.count;o<a;o++){const c=new L;c.fromBufferAttribute(r,o).applyMatrix4(i.matrixWorld),e.push(c)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let i=0,s=e.length;i<s;i++)if(e[i].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const i=this.faces;let s=-1/0,r=1/0;for(let o=0,a=i.length;o<a;o++){const c=i[o],l=c.distanceToPoint(t.origin),h=c.normal.dot(t.direction);if(l>0&&h>=0)return null;const u=h!==0?-l/h:0;if(!(u<=0)&&(h>0?r=Math.min(u,r):s=Math.max(u,s),s>r))return null}return s!==-1/0?t.at(s,e):t.at(r,e),e}intersectsRay(t){return this.intersectRay(t,Bv)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}_removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}_removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let i=t.outside;for(;i.next!==null&&i.next.face===t;)i=i.next;return this.assigned.removeSubList(e,i),e.prev=i.next=null,t.outside=null,e}}_deleteFaceVertices(t,e){const i=this._removeAllVerticesFromFace(t);if(i!==void 0)if(e===void 0)this.unassigned.appendChain(i);else{let s=i;do{const r=s.next;e.distanceToPoint(s.point)>this.tolerance?this._addVertexToFace(s,e):this.unassigned.append(s),s=r}while(s!==null)}return this}_resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const i=e.next;let s=this.tolerance,r=null;for(let o=0;o<t.length;o++){const a=t[o];if(a.mark===mo){const c=a.distanceToPoint(e.point);if(c>s&&(s=c,r=a),s>1e3*this.tolerance)break}}r!==null&&this._addVertexToFace(e,r),e=i}while(e!==null)}return this}_computeExtremes(){const t=new L,e=new L,i=[],s=[];for(let r=0;r<3;r++)i[r]=s[r]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let r=0,o=this.vertices.length;r<o;r++){const a=this.vertices[r],c=a.point;for(let l=0;l<3;l++)c.getComponent(l)<t.getComponent(l)&&(t.setComponent(l,c.getComponent(l)),i[l]=a);for(let l=0;l<3;l++)c.getComponent(l)>e.getComponent(l)&&(e.setComponent(l,c.getComponent(l)),s[l]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:i,max:s}}_computeInitialHull(){const t=this.vertices,e=this._computeExtremes(),i=e.min,s=e.max;let r=0,o=0;for(let f=0;f<3;f++){const d=s[f].point.getComponent(f)-i[f].point.getComponent(f);d>r&&(r=d,o=f)}const a=i[o],c=s[o];let l,h;r=0,mu.set(a.point,c.point);for(let f=0,d=this.vertices.length;f<d;f++){const x=t[f];if(x!==a&&x!==c){mu.closestPointToPoint(x.point,!0,gu);const m=gu.distanceToSquared(x.point);m>r&&(r=m,l=x)}}r=-1,Oa.setFromCoplanarPoints(a.point,c.point,l.point);for(let f=0,d=this.vertices.length;f<d;f++){const x=t[f];if(x!==a&&x!==c&&x!==l){const m=Math.abs(Oa.distanceToPoint(x.point));m>r&&(r=m,h=x)}}const u=[];if(Oa.distanceToPoint(h.point)<0){u.push(Mn.create(a,c,l),Mn.create(h,c,a),Mn.create(h,l,c),Mn.create(h,a,l));for(let f=0;f<3;f++){const d=(f+1)%3;u[f+1].getEdge(2).setTwin(u[0].getEdge(d)),u[f+1].getEdge(1).setTwin(u[d+1].getEdge(0))}}else{u.push(Mn.create(a,l,c),Mn.create(h,a,c),Mn.create(h,c,l),Mn.create(h,l,a));for(let f=0;f<3;f++){const d=(f+1)%3;u[f+1].getEdge(2).setTwin(u[0].getEdge((3-f)%3)),u[f+1].getEdge(0).setTwin(u[d+1].getEdge(1))}}for(let f=0;f<4;f++)this.faces.push(u[f]);for(let f=0,d=t.length;f<d;f++){const x=t[f];if(x!==a&&x!==c&&x!==l&&x!==h){r=this.tolerance;let m=null;for(let p=0;p<4;p++){const g=this.faces[p].distanceToPoint(x.point);g>r&&(r=g,m=this.faces[p])}m!==null&&this._addVertexToFace(x,m)}}return this}_reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const i=this.faces[e];i.mark===mo&&t.push(i)}return this.faces=t,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const i=this.assigned.first().face;let s=i.outside;do{const r=i.distanceToPoint(s.point);r>e&&(e=r,t=s),s=s.next}while(s!==null&&s.face===i);return t}}_computeHorizon(t,e,i,s){this._deleteFaceVertices(i),i.mark=Ov;let r;e===null?r=e=i.getEdge(0):r=e.next;do{const o=r.twin,a=o.face;a.mark===mo&&(a.distanceToPoint(t)>this.tolerance?this._computeHorizon(t,o,a,s):s.push(r)),r=r.next}while(r!==e);return this}_addAdjoiningFace(t,e){const i=Mn.create(t,e.tail(),e.head());return this.faces.push(i),i.getEdge(-1).setTwin(e.twin),i.getEdge(0)}_addNewFaces(t,e){this.newFaces=[];let i=null,s=null;for(let r=0;r<e.length;r++){const o=e[r],a=this._addAdjoiningFace(t,o);i===null?i=a:a.next.setTwin(s),this.newFaces.push(a.face),s=a}return i.next.setTwin(s),this}_addVertexToHull(t){const e=[];return this.unassigned.clear(),this._removeVertexFromFace(t,t.face),this._computeHorizon(t.point,null,t.face,e),this._addNewFaces(t,e),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let t;for(this._computeInitialHull();(t=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(t);return this._reindexFaces(),this._cleanup(),this}}class Mn{constructor(){this.normal=new L,this.midpoint=new L,this.area=0,this.constant=0,this.outside=null,this.mark=mo,this.edge=null}static create(t,e,i){const s=new Mn,r=new Ba(t,s),o=new Ba(e,s),a=new Ba(i,s);return r.next=a.prev=o,o.next=r.prev=a,a.next=o.prev=r,s.edge=r,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),i=this.edge.next.head();return ro.set(t.point,e.point,i.point),ro.getNormal(this.normal),ro.getMidpoint(this.midpoint),this.area=ro.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class Ba{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class Gv{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class xu{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class Hv extends _e{constructor(t=[]){super();const e=[],i=[],r=new kv().setFromPoints(t).faces;for(let o=0;o<r.length;o++){const a=r[o];let c=a.edge;do{const l=c.head().point;e.push(l.x,l.y,l.z),i.push(a.normal.x,a.normal.y,a.normal.z),c=c.next}while(c!==a.edge)}this.setAttribute("position",new $t(e,3)),this.setAttribute("normal",new $t(i,3))}}function Vv(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new _e;let l=0;for(let h=0;h<n.length;++h){const u=n[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let f=0;f<n.length;++f){const d=n[f].index;for(let x=0;x<d.count;++x)u.push(d.getX(x)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=_u(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let m=0;m<o[h].length;++m)d.push(o[h][m][f]);const x=_u(d);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}return c}function _u(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){const h=n[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new He(o,e,i);let c=0;for(let l=0;l<n.length;++l){const h=n[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,d=h.count;f<d;f++)for(let x=0;x<e;x++){const m=h.getComponent(f,x);a.setComponent(f+u,x,m)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function Wv(n,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},i=n.getIndex(),s=n.getAttribute("position"),r=i?i.count:s.count;let o=0;const a=Object.keys(n.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let v=0,M=a.length;v<M;v++){const _=a[v],S=n.attributes[_];c[_]=new S.constructor(new S.array.constructor(S.count*S.itemSize),S.itemSize,S.normalized);const w=n.morphAttributes[_];w&&(l[_]||(l[_]=[]),w.forEach((A,D)=>{const y=new A.array.constructor(A.count*A.itemSize);l[_][D]=new A.constructor(y,A.itemSize,A.normalized)}))}const d=t*.5,x=Math.log10(1/t),m=Math.pow(10,x),p=d*m;for(let v=0;v<r;v++){const M=i?i.getX(v):v;let _="";for(let S=0,w=a.length;S<w;S++){const A=a[S],D=n.getAttribute(A),y=D.itemSize;for(let E=0;E<y;E++)_+=`${~~(D[u[E]](M)*m+p)},`}if(_ in e)h.push(e[_]);else{for(let S=0,w=a.length;S<w;S++){const A=a[S],D=n.getAttribute(A),y=n.morphAttributes[A],E=D.itemSize,I=c[A],F=l[A];for(let k=0;k<E;k++){const Z=u[k],O=f[k];if(I[O](o,D[Z](M)),y)for(let z=0,C=y.length;z<C;z++)F[z][O](o,y[z][Z](M))}}e[_]=o,h.push(o),o++}}const g=n.clone();for(const v in n.attributes){const M=c[v];if(g.setAttribute(v,new M.constructor(M.array.slice(0,o*M.itemSize),M.itemSize,M.normalized)),v in l)for(let _=0;_<l[v].length;_++){const S=l[v][_];g.morphAttributes[v][_]=new S.constructor(S.array.slice(0,o*S.itemSize),S.itemSize,S.normalized)}}return g.setIndex(h),g}function qf(){const n=new te,t=new Set,e=new Set;return n.ownGeometry=i=>(t.add(i),i),n.ownMaterial=i=>(e.add(i),i),n.dispose=()=>{n.traverse(i=>{i.isInstancedMesh&&i.dispose()}),t.forEach(i=>i.dispose()),e.forEach(i=>i.dispose())},n}function Xv(n=[]){const t=qf(),e=t.ownMaterial(new re({color:"#a97640",roughness:.9})),i=t.ownMaterial(new re({color:"#4e594b",roughness:.7})),s=t.ownGeometry(new Dn(1,1,1)),r=[],o=t.ownGeometry(new Xi(.21,.21,.09,16)),a=t.ownMaterial(new re({color:"#d54b45",emissive:"#d54b45",emissiveIntensity:.65,roughness:.3})),c=t.ownMaterial(new re({color:"#55b76b",emissive:"#55b76b",emissiveIntensity:.65,roughness:.3})),l=t.ownMaterial(new re({color:"#d1d5bd",metalness:.3,roughness:.6})),h=new Map,u=(d,x,m,p,g,v,M)=>{let _=h.get(d);_||h.set(d,_=new Map);let S=_.get(M);S||_.set(M,S=[]),S.push({x,y:m,w:p,h:g,d:v})};for(const d of n.filter(x=>x.operable)){const x=new te;x.position.set(d.x,0,d.z),x.rotation.y=d.heading,t.add(x);for(const g of[-d.width/2,d.width/2])u(x,g,.85,.22,1.7,.3,i);const m=new te;m.name="gate-panel",x.add(m);for(const g of[.45,1.2])u(m,0,g,d.width,.15,.22,e);for(let g=0;g<=Math.ceil(d.width/1.2);g++)u(m,-d.width/2+d.width*g/Math.ceil(d.width/1.2),.82,.14,1.05,.19,e);u(m,d.width/2-.35,.85,.24,.28,.3,i);const p=kf(d).map(g=>{const v=new te;v.name="gate-switch-panel",v.position.set(g.x,g.y,g.z),v.rotation.y=g.heading,t.add(v);const M=new ee(s,i);M.scale.set(.64,.78,.14),M.castShadow=M.receiveShadow=!0,v.add(M);const _=new ee(o,l);_.rotation.x=Math.PI/2,_.scale.set(1.24,1,1.24),_.position.z=.1,v.add(_);const S=new ee(o,a);return S.name="gate-button",S.rotation.x=Math.PI/2,S.position.z=.15,v.add(S),S});r.push({gate:d,panel:m,buttons:p})}const f=new se;for(const[d,x]of h)for(const[m,p]of x){const g=new ai(s,m,p.length);p.forEach((v,M)=>{f.makeScale(v.w,v.h,v.d),f.setPosition(v.x,v.y,0),g.setMatrixAt(M,f)}),g.castShadow=g.receiveShadow=!0,d.add(g)}return t.update=()=>{for(const{gate:d,panel:x,buttons:m}of r){x.position.x=d.open?-d.width:0;for(const p of m)p.material=d.open?c:a}},t.update(),t}function qv(n){let t=n>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function Zv(n){const t=[];for(let d=0;d<3;d++)for(const x of[-1,1])for(const m of[-.34,.34])for(const p of[-.34,.34]){const g=new L;g.setComponent(d,x*.5),g.setComponent((d+1)%3,m),g.setComponent((d+2)%3,p);const v=1+.13*Math.sin(g.x*11+g.y*7+g.z*9+n*2.7);g.multiplyScalar(v),g.x+=g.y*(n-1)*.16,t.push(g)}const e=new Hv(t),i=e.attributes.position;for(let d=0;d<i.count;d++){const x=i.getX(d),m=i.getY(d),p=i.getZ(d),g=1+.06*Math.sin(x*8+m*5+p*7+n*2.3);i.setXYZ(d,x*g,m*g,p*g)}e.deleteAttribute("normal");const s=Wv(e);e.dispose(),s.computeBoundingBox();const r=new L,o=new L;s.boundingBox.getSize(r),s.boundingBox.getCenter(o),s.translate(-o.x,-o.y,-o.z),s.scale(1/r.x,1/r.y,1/r.z),s.computeVertexNormals(),s.computeBoundingBox();const a=[],c=s.attributes.position,l=new Wt("#eee7d5"),h=new Wt("#68785a"),u=new Wt("#ffffff"),f=new Wt;for(let d=0;d<c.count;d++){const x=c.getX(d),m=c.getY(d),p=c.getZ(d),g=Math.sin(x*15+p*13+n*3)*Math.sin(m*11-p*9);f.copy(u).multiplyScalar(.91+.09*Math.sin(x*8+m*12+p*6+n)),g>.24&&f.lerp(l,(g-.24)*.42),m<-.05&&g<.3&&f.lerp(h,Math.min(.34,(-m+.05)*.55)),a.push(f.r,f.g,f.b)}return s.setAttribute("color",new $t(a,3)),s}function Yv(n=[]){const t=qf(),e=t.ownMaterial(new re({color:"#ffffff",roughness:1,vertexColors:!0})),i=[[],[],[]],s=["#aba595","#c2b59d","#8b9189","#c5bfac","#969d97","#aaa99b","#858c7d","#b4a28d"];for(const d of n.filter(x=>x.material==="stone")){const{a:x,b:m}=d,p=Math.hypot(m.x-x.x,m.z-x.z);if(p<.001)continue;const g=qv(Math.round(x.x*997+x.z*7919+m.x*104729+m.z*1543)),v=-Math.atan2(m.z-x.z,m.x-x.x);for(let M=0;M<4;M++){const _=M===3,w=Math.max(1,Math.ceil(p/(_?.48:M===0?1.24:.98))),A=Array.from({length:w},()=>.45+g()*1.2),D=A.reduce((E,I)=>E+I,0);let y=0;for(const E of A){const I=p*E/D,F=y+I,k=(y+F)/2,Z=Math.max(1e-4,I-Math.min(.018,I*.08)),O=_?.19+g()*.2:.29+g()*.105,z=(g()-.5)*2*Math.min(.065,Z/(O*2)),C=Math.abs(Math.sin(z)),P=Math.cos(z),G=Math.max(1e-5,(Z-O*C)/P),H=(G*C+O*P)/2,N=Math.sin(k*.79+x.x*.13+x.z*.17)*.035;i[Math.floor(g()*3)].push({x:x.x+(m.x-x.x)*k/p,z:x.z+(m.z-x.z)*k/p,yaw:v+(g()<.5?Math.PI:0),tilt:z,y:M===0?H+.005:_?1.1+N+(g()-.5)*.055:.175+M*.325+N+(g()-.5)*.04,width:G,height:O,depth:(_?.43:.59-M*.055)*(.94+g()*.06),color:s[Math.floor(g()*s.length)]}),y=F}}}const r=new se,o=new Kn,a=new Kn,c=new L(0,1,0),l=new L(0,0,1),h=new L,u=new L,f=new Wt;for(const[d,x]of i.entries()){if(!x.length)continue;const m=new ai(t.ownGeometry(Zv(d)),e,x.length);m.name="clay-drystone",x.forEach((p,g)=>{u.set(p.x,p.y,p.z),o.setFromAxisAngle(c,p.yaw).multiply(a.setFromAxisAngle(l,p.tilt)),h.set(p.width,p.height,p.depth),r.compose(u,o,h),m.setMatrixAt(g,r),m.setColorAt(g,f.set(p.color))}),m.castShadow=m.receiveShadow=!0,t.add(m)}return t}class $v{constructor(t,e,{halfExtent:i=t.radius+1.4,opacity:s=.7}={}){this.target=t,this.halfExtent=i,this.opacity=s,this.covered=new Set,this.disposed=!1,this.parts=e.map(r=>{const o=r.material,a=o.clone();return r.material=a,r.geometry.computeBoundingBox(),{mesh:r,original:o,material:a,shadow:r.castShadow,alpha:1}}),this.cameraLocal=new L,this.cameraDirection=new L,this.up=new L(0,1,0)}update(t,e,i){if(this.disposed||!Number.isFinite(i)||i<=0)return;t.updateMatrixWorld(!0),t.getWorldDirection(this.cameraDirection).negate(),this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));const s=new Set;Math.abs(this.cameraLocal.x)>.02&&s.add(this.cameraLocal.x>=0?"+x":"-x"),Math.abs(this.cameraLocal.z)>.02&&s.add(this.cameraLocal.z>=0?"+z":"-z");const r=this.target.heading||0,o=Math.cos(r),a=Math.sin(r),c=[],l=new Set(e);for(const u of this.covered)l.has(u)||this.covered.delete(u);for(const u of e){const f=u.x-this.target.x,d=u.z-this.target.z,x=f*o-d*a,m=f*a+d*o,p=u.type==="cow"?.65*Ts(u):.4,g=this.halfExtent+p+(this.covered.has(u)?.18:0);Math.abs(x)<=g&&Math.abs(m)<=g?(this.covered.add(u),c.push({actor:u,radius:p})):this.covered.delete(u)}const h=-Math.expm1(-12*Math.min(i,.25));for(const u of this.parts){const{mesh:f,material:d}=u,m=c.length>0&&(f.userData.coverKind==="roof"||s.has(f.userData.coverSide))?this.opacity:1;u.alpha+=(m-u.alpha)*h,Math.abs(u.alpha-m)<.001&&(u.alpha=m),d.opacity=u.original.opacity*u.alpha;const p=u.alpha<1;d.transparent!==(p||u.original.transparent)&&(d.transparent=p||u.original.transparent,d.needsUpdate=!0),d.depthWrite=p?!1:u.original.depthWrite,f.castShadow=p?!1:u.shadow}}dispose(){if(!this.disposed){this.disposed=!0;for(const{mesh:t,original:e,material:i,shadow:s}of this.parts)t.material=e,t.castShadow=s,i.dispose();this.parts=[],this.covered.clear()}}}class Kv{constructor(){this.centers={value:Array.from({length:4},()=>new L(0,-1e3,0))},this.buddyCenters={value:Array.from({length:4},()=>new L(0,-1e3,0))},this.buddyRadius={value:.4},this.radius={value:.54},this.strength={value:.85*.7},this.tint={value:new Wt("#39bfff")}}install(t){const e=t.onBeforeCompile,s=t.customProgramCacheKey.bind(t)();return t.onBeforeCompile=(r,o)=>{e.call(t,r,o),Object.assign(r.uniforms,{pipGlowCenters:this.centers,pipGlowRadius:this.radius,pipGlowTint:this.tint,pipGlowStrength:this.strength}),Object.assign(r.uniforms,{buddyGlowCenters:this.buddyCenters,buddyGlowRadius:this.buddyRadius}),r.vertexShader=`varying vec3 pipSurfaceWorld;
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
        totalEmissiveRadiance+=pipGlowTint*min(pipGlowAmount,1.0)*pipGlowStrength*smoothstep(0.45,0.9,pipWorldNormal.y);`)},t.customProgramCacheKey=()=>s+"|pip-ground-glow-v3",t.needsUpdate=!0,t}update(t,e,i=null){this.radius.value=.54*t.scale.x,t.userData.parts.pods.forEach((s,r)=>{const o=this.centers.value[r];o.copy(s),t.localToWorld(o),o.y=e(o.x,o.z)}),this.buddyRadius.value=.54*(i?.scale.x||.75),this.buddyCenters.value.forEach((s,r)=>{if(!i){s.set(0,-1e3,0);return}s.copy(i.userData.parts.pods[r]),i.localToWorld(s),s.y=e(s.x,s.z)})}}function Mu(n,t=.033){const e=new _e,i=ln(n).corners;return e.setAttribute("position",new $t(i.flatMap(s=>[s.x,t,s.z]),3)),e.setAttribute("uv",new $t([0,0,1,0,1,1,0,1],2)),e.setIndex([0,1,2,0,2,3]),e.computeVertexNormals(),e}function Jv(n,t=.26,e=.04){const i=ln(n),s=Math.max(0,i.halfLength-t),r=Math.max(0,i.halfWidth-t),o=[[-s,-r],[s,-r],[s,r],[-s,r]].map(([l,h])=>Ui(n,l,h)),a=new _e,c=[];a.setAttribute("position",new $t([...i.corners,...o].flatMap(l=>[l.x,e,l.z]),3));for(let l=0;l<4;l++){const h=(l+1)%4;c.push(l,h,h+4,l,h+4,l+4)}return a.setIndex(c),a.computeVertexNormals(),a}function jv(n,t,e){const i=ln(t).corners;n.fillStyle="#f9e7a2",n.strokeStyle="#fff0b5",n.lineWidth=1,n.beginPath(),i.forEach((s,r)=>{const o=e(s);r?n.lineTo(o.x,o.y):n.moveTo(o.x,o.y)}),n.closePath(),n.fill(),n.stroke()}const Pe=1e-9,Qs=(n,t)=>n.x*t.z-n.z*t.x,Ri=(n,t)=>({x:n.x-t.x,z:n.z-t.z});function Qv(n,t=0){const e=[],i=[],s=[];for(const d of n){const x=[];s.push(x);for(let m=0;m<d.length;m++){const p=d[m],g=d[(m+1)%d.length];if(i.push(p.x),Math.abs(p.x-g.x)>Pe){const v={a:p,b:g,min:Math.min(p.x,g.x),max:Math.max(p.x,g.x),id:e.length};e.push(v),x.push(v)}}}for(let d=0;d<e.length;d++)for(let x=d+1;x<e.length;x++){const m=e[d],p=e[x];if(m.max<=p.min||p.max<=m.min)continue;const g=Ri(m.b,m.a),v=Ri(p.b,p.a),M=Qs(g,v);if(Math.abs(M)<Pe)continue;const _=Ri(p.a,m.a),S=Qs(_,v)/M,w=Qs(_,g)/M;S>Pe&&S<1-Pe&&w>Pe&&w<1-Pe&&i.push(m.a.x+S*g.x)}i.sort((d,x)=>d-x);const r=i.filter((d,x)=>!x||d-i[x-1]>Pe),o=[],a=[],c=(d,x)=>d.a.z+(x-d.a.x)*(d.b.z-d.a.z)/(d.b.x-d.a.x),l=(d,x,m)=>{[d,x,m]=[d,x,m].map(g=>({x:Math.fround(g.x),z:Math.fround(g.z)}));const p=Qs(Ri(x,d),Ri(m,d));if(!(Math.abs(p)<Pe)){p>0&&([x,m]=[m,x]);for(const g of[d,x,m])o.push(g.x,t,g.z),a.push(g.x/4,g.z/4)}};let h=new Map;const u=[];for(let d=1;d<r.length;d++){const x=r[d-1],m=r[d],p=(x+m)/2,g=[];for(const _ of s){const S=_.filter(w=>p>w.min&&p<w.max).sort((w,A)=>c(w,p)-c(A,p));S.length>=2&&g.push({low:S[0],high:S[S.length-1]})}g.sort((_,S)=>c(_.low,p)-c(S.low,p));const v=[];for(const _ of g){const S=v[v.length-1];S&&c(_.low,p)<=c(S.high,p)+Pe?c(_.high,p)>c(S.high,p)&&(S.high=_.high):v.push({..._})}const M=new Map;for(const{low:_,high:S}of v){const w=`${_.id}:${S.id}`,A=h.get(w);A?(A.right=m,M.set(w,A),h.delete(w)):M.set(w,{low:_,high:S,left:x,right:m})}u.push(...h.values()),h=M}u.push(...h.values());for(const{low:d,high:x,left:m,right:p}of u){const g={x:m,z:c(d,m)},v={x:p,z:c(d,p)},M={x:p,z:c(x,p)},_={x:m,z:c(x,m)};l(g,v,M),l(g,M,_)}const f=new _e;return f.setAttribute("position",new $t(o,3)),f.setAttribute("uv",new $t(a,2)),f.computeVertexNormals(),f}function Yc(n,t,{ragged:e=!1,y:i=.008,seed:s=1,roundCaps:r=!1}={}){let o=s,a=0;const c=n.map((u,f)=>(f&&(a+=Math.hypot(u.x-n[f-1].x,u.z-n[f-1].z)),o=o*1664525+1013904223>>>0,e?Math.sin(a*.72)*.11+(o/4294967296-.5)*.17:0)),l=[],h=[];for(let u=1;u<n.length;u++){const f=n[u-1],d=n[u],x=Math.hypot(d.x-f.x,d.z-f.z);if(x<Pe)continue;const m=-(d.z-f.z)/x,p=(d.x-f.x)/x,g=(_,S,w)=>({x:_.x+m*(t/2*w+S),z:_.z+p*(t/2*w+S)}),v=[g(f,c[u-1],-1),g(f,c[u-1],1)],M=[g(d,c[u],-1),g(d,c[u],1)];l.push([v[0],M[0],M[1],v[1]]),h[u-1]&&l.push([f,h[u-1][0],v[0]],[f,h[u-1][1],v[1]]),h[u]=M}if(r&&l.length)for(const u of[n[0],n[n.length-1]])l.push(Array.from({length:20},(f,d)=>({x:u.x+Math.cos(d*Math.PI/10)*t/2,z:u.z+Math.sin(d*Math.PI/10)*t/2})));return Qv(l,i)}const ka=(n,t,e)=>{const i=Math.max(0,Math.min(1,(e-n)/(t-n)));return i*i*(3-2*i)};function vu(n,t,{fadeLength:e=2.4,...i}={}){const s=Yc(n,t,{...i,roundCaps:!0}),r=s.getAttribute("position"),o=[];let a=0;for(let w=1;w<n.length;w++){const A=n[w-1],D=n[w],y=Math.hypot(D.x-A.x,D.z-A.z);y>Pe&&(o.push({a:A,b:D,length:y,start:a}),a+=y)}if(!o.length)return s.setAttribute("roadOpacity",new $t([],1)),s;const c=t/2,l=Math.max(.01,Math.min(e,a*.3)),h=c+l+.25,u=Math.max(2,h),f=new Map,d=new Map;o.forEach((w,A)=>{const{a:D,b:y}=w,E=c+.25;for(let I=Math.floor((Math.min(D.x,y.x)-E)/u);I<=Math.floor((Math.max(D.x,y.x)+E)/u);I++)for(let F=Math.floor((Math.min(D.z,y.z)-E)/u);F<=Math.floor((Math.max(D.z,y.z)+E)/u);F++){const k=I+","+F;f.has(k)||f.set(k,[]),f.get(k).push(A)}});const x=[o[0].a,o[o.length-1].b];let m=[];for(let w=0;w<r.count;w+=3)m.push([0,1,2].map(A=>({x:r.getX(w+A),z:r.getZ(w+A)})));for(const w of x){const A=[y=>y.x-w.x-h,y=>y.x-w.x+h,y=>y.z-w.z-h,y=>y.z-w.z+h];for(const y of A)m=m.flatMap(E=>$c(E,y));const D=[];for(const y of m){const E=y.reduce((F,k)=>({x:F.x+k.x/y.length,z:F.z+k.z/y.length}),{x:0,z:0});if(Math.abs(E.x-w.x)>h+Pe||Math.abs(E.z-w.z)>h+Pe){D.push(y);continue}let I=[y];for(let F=-h+.5;F<h;F+=.5)for(const k of["x","z"])I=I.flatMap(Z=>$c(Z,O=>O[k]-w[k]-F));D.push(...I)}m=D}const p=w=>{const A=w.x+","+w.z;if(d.has(A))return d.get(A);let D=0;for(const y of f.get(Math.floor(w.x/u)+","+Math.floor(w.z/u))||[]){const{a:E,b:I,length:F,start:k}=o[y],Z=(I.x-E.x)/F,O=(I.z-E.z)/F,z=(w.x-E.x)*Z+(w.z-E.z)*O,C=Math.max(0,Math.min(F,z)),P=Math.hypot(w.x-E.x-Z*C,w.z-E.z-O*C);if(P>c+.25)continue;const G=k+C,H=y===0?z:G,N=y===o.length-1?a-k-z:a-G,$=Math.min(H,N),rt=ka(-c,l,$),mt=.45*(1-ka(0,l,$)),Et=mt>Pe?1-ka(c-mt,c,P):1;if(D=Math.max(D,rt*Et),D>=1)break}return d.set(A,D),D},g=[],v=[],M=[],_=i.y??.008;for(const w of m)for(let A=1;A<w.length-1;A++){let[D,y,E]=[w[0],w[A],w[A+1]].map(F=>({x:Math.fround(F.x),z:Math.fround(F.z)}));const I=Qs(Ri(y,D),Ri(E,D));if(!(Math.abs(I)<Pe)){I>0&&([y,E]=[E,y]);for(const F of[D,y,E])g.push(F.x,_,F.z),v.push(F.x/4,F.z/4),M.push(p(F))}}s.dispose();const S=new _e;return S.setAttribute("position",new $t(g,3)),S.setAttribute("uv",new $t(v,2)),S.setAttribute("roadOpacity",new $t(M,1)),S.computeVertexNormals(),S}function yu(n){const t=n.clone(),e=n.onBeforeCompile,i=n.customProgramCacheKey();return t.transparent=!1,t.alphaHash=!0,t.depthWrite=!0,t.onBeforeCompile=(s,r)=>{e.call(t,s,r),s.vertexShader=`attribute float roadOpacity;
varying float vRoadOpacity;
`+s.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
vRoadOpacity = roadOpacity;`),s.fragmentShader=`varying float vRoadOpacity;
`+s.fragmentShader.replace("#include <alphahash_fragment>",`diffuseColor.a *= clamp(vRoadOpacity, 0.0, 1.0);
#include <alphahash_fragment>`)},t.customProgramCacheKey=()=>i+"|road-terminal-fade-v1",t}function $c(n,t){const e=[],i=[];for(let s=0;s<n.length;s++){const r=n[s],o=n[(s+1)%n.length],a=t(r),c=t(o);if(a>=-Pe&&e.push(r),a<=Pe&&i.push(r),a*c<-Pe*Pe){const l=a/(a-c),h={x:r.x+(o.x-r.x)*l,z:r.z+(o.z-r.z)*l};e.push(h),i.push(h)}}return[e,i].filter(s=>s.length>=3)}function Su(n,t,e=1,i=new _e){const r=(n.rivers||[]).flatMap(l=>l.bridges).filter(l=>Math.hypot(l.x-t.x,l.z-t.z)<l.length/2+l.width/2+1.1*e).map(l=>({...l,s:Math.sin(l.heading),c:Math.cos(l.heading),planks:Math.ceil(l.length/.3)})),o=(l,h)=>({x:(l.x-h.x)*h.c-(l.z-h.z)*h.s,z:(l.x-h.x)*h.s+(l.z-h.z)*h.c}),a=[];for(let l=0;l<64;l++){const h=(f,d)=>({x:t.x+Math.cos(f/64*Math.PI*2)*d*e,z:t.z+Math.sin(f/64*Math.PI*2)*d*e});let u=[[h(l,.9),h(l+1,.9),h(l+1,1.1),h(l,1.1)]];for(const f of r){const d=[x=>o(x,f).x-f.width/2,x=>o(x,f).x+f.width/2];for(let x=0;x<=f.planks;x++)d.push(m=>o(m,f).z-(-f.length/2+x*f.length/f.planks));for(const x of d)u=u.flatMap(m=>$c(m,x))}for(const f of u){const d=f.reduce((m,p)=>({x:m.x+p.x/f.length,z:m.z+p.z/f.length}),{x:0,z:0});let x=.055;for(const m of r){const p=o(d,m);if(Math.abs(p.x)<=m.width/2+Pe&&Math.abs(p.z)<m.length/2){const g=Math.min(m.planks-1,Math.floor((p.z/m.length+.5)*m.planks));x=Math.max(x,.18+.12*Math.sin((g+.5)/m.planks*Math.PI)+.04)}}for(let m=1;m<f.length-1;m++)for(const p of[f[0],f[m],f[m+1]])a.push(p.x,x,p.z)}}let c=i.getAttribute("position");return(!c||c.array.length<a.length)&&(c&&i.dispose(),c=new He(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(a.length/3,1)))),3),c.setUsage(xs),i.setAttribute("position",c)),c.array.set(a),c.needsUpdate=!0,i.setDrawRange(0,a.length/3),i.boundingSphere=new mi(new L(t.x,.2,t.z),1.1*e+.4),i}const Ga=new Map,tn=10,wu=n=>new L(...n),gs=n=>[.07*Math.sin(n*1.8),n,.055*Math.sin(n*2.1)];function ty(n){const t=n.attributes.position,e=n.attributes.treeCenter,i=[0,1,2].map(()=>new Float32Array(t.count*3)),s=new L,r=new L,o=new L,a=new L,c=(h,u)=>new L().fromBufferAttribute(h,u),l=n.index.array;for(let h=0;h<l.length;h+=3){const[u,f,d]=l.slice(h,h+3),x=c(e,u),m=c(t,u).sub(x);s.copy(c(e,f)).sub(x),r.copy(c(e,d)).sub(x),o.copy(c(t,f)).sub(c(e,f)).sub(m),a.copy(c(t,d)).sub(c(e,d)).sub(m);const p=[s.clone().cross(r),s.clone().cross(a).add(o.clone().cross(r)),o.clone().cross(a)];for(let g=0;g<3;g++)for(const v of[u,f,d])i[g][v*3]+=p[g].x,i[g][v*3+1]+=p[g].y,i[g][v*3+2]+=p[g].z}i.forEach((h,u)=>n.setAttribute(`treeNormal${u}`,new He(h,3)))}function ey(n=0){if(n=Math.abs(Math.floor(n))%3,Ga.has(n))return Ga.get(n);const t=[],e=[],i=[],s=[],r=[],o=[],a=(m,p)=>{const g=t.length/3;return t.push(...m),e.push(...p),g},c=(m,p,g)=>i.push(m,p,g),l=[{y:-.06,r:.62},{y:.16,r:.57},{y:.6,r:.49},{y:1.08,r:.4}];let h=.34;for(let m=0;m<4;m++){const p=1.56+.35*m,g=h*.6,v=h*.8,M=l.length;l.push({y:p-.12,r:h},{y:p+.12,r:v});const _=(m*4+n)%tn;r.push({point:gs(p),parentRadius:h,childRadii:[v,g],lower:M,sector:_}),h=v*.89}l.push({y:2.94,r:.075},{y:3.12,r:.025});for(const{y:m,r:p}of l){const g=gs(m),v=[];for(let M=0;M<tn;M++){const _=M*2*Math.PI/tn,S=p+Math.max(0,1-(m+.06)/.3)*.14*Math.pow(Math.cos(_*2+n*.2),4);v.push(a([g[0]+S*Math.cos(_),m,g[2]+S*Math.sin(_)],g))}s.push(v)}for(let m=0;m<s.length-1;m++)for(let p=0;p<tn;p++){const g=r.find(A=>A.lower===m);if(g&&(p-g.sector+tn)%tn<3)continue;const v=(p+1)%tn,M=s[m][p],_=s[m][v],S=s[m+1][p],w=s[m+1][v];c(M,S,_),c(_,S,w)}const u=a(gs(l[0].y),gs(l[0].y)),f=a(gs(3.15),gs(3.15));for(let m=0;m<tn;m++)c(s[0][m],s[0][(m+1)%tn],u),c(s.at(-1)[(m+1)%tn],s.at(-1)[m],f);for(const m of r){const{lower:p,sector:g,point:v,childRadii:M}=m,_=[];for(let k=0;k<=3;k++)_.push(s[p][(g+k)%tn]);for(let k=3;k>=0;k--)_.push(s[p+1][(g+k)%tn]);const S=(g+1.5)*2*Math.PI/tn,w=new L(Math.cos(S),0,Math.sin(S)),A=new L(-Math.sin(S),0,Math.cos(S)),D=2.48+(v[1]-1.56)*.48,y=wu(v).addScaledVector(w,.54);y.y+=.08;const E=wu(v).addScaledVector(w,1.08);E.y=D;let I=_;m.branchRings=[],m.parentRing=s[p],m.continuingRing=s[p+1];for(let k=0;k<4;k++){const Z=k/3,O=y.clone().lerp(E,Z).addScaledVector(A,.065*Math.sin(Z*Math.PI));O.y-=.09*Math.sin(Z*Math.PI);const z=E.clone().sub(y).addScaledVector(A,.065*Math.PI*Math.cos(Z*Math.PI));z.y-=.09*Math.PI*Math.cos(Z*Math.PI),z.normalize();const C=A.clone(),P=C.clone().cross(z).normalize(),G=M[1]*(1-.78*Z),H=[];for(let N=0;N<8;N++){const $=-Math.PI*.625-N*Math.PI/4;H.push(a(O.clone().addScaledVector(C,Math.sin($)*G).addScaledVector(P,Math.cos($)*G).toArray(),O.toArray()))}for(let N=0;N<8;N++){const $=(N+1)%8;c(I[$],I[N],H[N]),c(I[$],H[N],H[$])}m.branchRings.push({indices:H,center:O.toArray(),radius:G}),I=H}const F=a(E.clone().addScaledVector(E.clone().sub(y).normalize(),.025).toArray(),E.toArray());for(let k=0;k<8;k++)c(I[(k+1)%8],I[k],F);o.push(E.toArray())}const d=new _e;d.setAttribute("position",new $t(t,3)),d.setAttribute("treeCenter",new $t(e,3));const x=t.map((m,p)=>{const g=t[p-p%3],v=t[p-p%3+1],M=t[p-p%3+2];return .94+.035*Math.sin(g*16+Math.sin(v*2)+M*11)});return d.setAttribute("color",new $t(x,3)),d.setIndex(i),d.computeVertexNormals(),ty(d),d.computeBoundingBox(),d.computeBoundingSphere(),d.userData={forks:r,tips:o,trunkRings:s,trunkProfile:l},Ga.set(n,d),d}function Zf(n){const t={value:1};n.userData.treeWidth=t,n.onBeforeCompile=e=>{e.uniforms.treeWidth=t,e.vertexShader=`attribute vec3 treeCenter;
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
vec3 objectNormal = normalize(treeNormal0 + woodWidth * treeNormal1 + woodWidth * woodWidth * treeNormal2);`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","vec3 transformed = treeCenter + woodWidth * (position - treeCenter);")},n.customProgramCacheKey=()=>"continuous-tree-v1"}const Ha=(n,t)=>Math.max(-t,Math.min(t,n)),Va=Math.PI/180,Ks=(n,t,e,i)=>n+(t-n)*-Math.expm1(-e/i),Yf=n=>.05+Math.sin(n*Math.PI*2/2.4)*.04;function $f(){return{time:0,hover:Yf(0),headYaw:0,roll:0,pitch:0,turnRate:0,filteredSpeed:0,previous:null}}function ny(n,t,e){const i={x:t.x,z:t.z,heading:t.heading??Math.PI/2},s=Math.hypot(t.vx||0,t.vz||0);if(n.previous||(n.previous=i,n.filteredSpeed=s),!(e>0)||!Number.isFinite(e))return n;if(n.time+=e,n.hover=Yf(n.time),Math.hypot(i.x-n.previous.x,i.z-n.previous.z)>3)return n.headYaw=n.roll=n.pitch=n.turnRate=0,n.filteredSpeed=s,n.previous=i,n;const r=i.heading-n.previous.heading,o=Math.atan2(Math.sin(r),Math.cos(r))/e;n.turnRate=Ks(n.turnRate,o,e,.12);const a=-Ha(n.turnRate/Math.max(1,s)*Math.min(1,s)*.28,20*Va);n.roll=Ks(n.roll,a,e,.2),n.headYaw=Ks(n.headYaw,Ha(n.turnRate*.2,30*Va),e,.09);const c=Ks(n.filteredSpeed,s,e,.18),l=(c-n.filteredSpeed)/e;return n.filteredSpeed=c,n.pitch=Ks(n.pitch,-Ha(l/6,1)*10*Va,e,.22),n.previous=i,n}const Es=new Map,iy={TorusGeometry:Io,SphereGeometry:Bi,BoxGeometry:Dn,CylinderGeometry:Xi,ConeGeometry:pr},pn=new Map;let Ee;function sy(n){return .7+.2*Math.max(0,Math.min(1,(n-1.015)/(3.1-1.015)))}function In(n){n.updateMatrixWorld(!0);const t=new Map;n.traverse(i=>{i.isMesh&&(t.has(i.material)||t.set(i.material,[]),t.get(i.material).push(i.geometry.clone().applyMatrix4(i.matrixWorld)))});const e=new te;e.name=n.name,e.userData.parts={};for(const[i,s]of t){const r=Vv(s,!1);s.forEach(a=>a.dispose());const o=new ee(r,i);o.castShadow=o.receiveShadow=!0,e.add(o)}return e}function Kf(n,t){const e=In(t);return pn.set(n,e),e.clone()}function Oo(n,t){const e=`${n}:${t.join(",")}`;return Es.has(e)||Es.set(e,new iy[n](...t)),Es.get(e)}function ry(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){const r=224+(s*13+(s>>>5)*7)%27;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);const i=new Wi(n);return i.wrapS=i.wrapT=$n,i.repeat.set(2,2),i.colorSpace=Ie,i}function oy(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.38+Math.sin(s*.051)*1.7),a=Math.sin(Math.hypot(r-78,(s-45)*.4)*.38),c=Math.round(227+o*12+a*4+(r*7+s*11)%7),l=(s*128+r)*4;e.data[l]=e.data[l+1]=e.data[l+2]=c,e.data[l+3]=255}t.putImageData(e,0,0);const i=new Wi(n);return i.wrapS=i.wrapT=$n,i.colorSpace=Ie,i}function ay(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.31+Math.sin(s*.045)*1.65)*8+Math.sin(r*.11+Math.sin(s*.021)*2.6)*5,a=Math.sin(Math.hypot(r-35,(s-74)*.15)*.46)*4,c=(r*17+s*31+r*s%29)%9-4,l=Math.max(0,Math.min(255,Math.round(132+o+a+c))),h=(s*128+r)*4;e.data[h]=l,e.data[h+1]=l,e.data[h+2]=l,e.data[h+3]=255}t.putImageData(e,0,0);const i=new Wi(n);return i.wrapS=i.wrapT=$n,i.repeat.set(1.2,1.7),i}function cy(){const n=document.createElement("canvas");n.width=n.height=128;const t=n.getContext("2d"),e=t.createImageData(128,128),i=[[188,203,148],[210,207,153],[164,191,137],[223,207,155],[154,184,133]];for(let r=0;r<128;r++)for(let o=0;o<128;o++){const a=Math.sin(o*.17+Math.sin(r*.11)*1.4)+Math.cos(r*.19-o*.07),c=(o*17+r*31+o*r%29)%13-6,l=i[(Math.floor((a+2)*1.25)+Math.floor(o/19)+Math.floor(r/23))%i.length],h=(r*128+o)*4;e.data[h]=Math.max(0,Math.min(255,l[0]+c)),e.data[h+1]=Math.max(0,Math.min(255,l[1]+c)),e.data[h+2]=Math.max(0,Math.min(255,l[2]+c)),e.data[h+3]=255}t.putImageData(e,0,0);const s=new Wi(n);return s.wrapS=s.wrapT=$n,s.colorSpace=Ie,s}function Un(){if(Ee)return Ee;const n=ry(),t=o=>new re({color:o,roughness:.9,map:n}),e=o=>new re({color:o,roughness:.55,metalness:.18,map:n});Ee={cream:e("#f5ead3"),white:e("#fff8e7"),dark:e("#354b55"),brass:new re({color:"#ddb469",roughness:.48,metalness:.62}),orange:e("#e6a04e"),dogCream:e("#ffe5ac"),rust:e("#c7704d"),cyan:new re({color:"#b6fbff",emissive:"#69dfe9",emissiveIntensity:.8,roughness:.32}),mint:e("#84cbb7"),black:e("#20343e"),wood:t("#ba9167"),paleWood:t("#e1bb87"),bark:t("#8b7758"),leaves:t("#8cbd8b"),leavesLight:t("#b8d28f"),leavesDark:t("#619b84"),roof:t("#bf755f"),barn:t("#d9977e"),barnTrim:t("#fae7c2"),flowerPink:t("#f2a6a6"),flowerYellow:t("#ffe28a"),flowerWhite:t("#fff7e5"),flowerCenter:t("#daa661"),stem:t("#7fab72"),stone:t("#abb7a4")},Ee.eye=Ee.white,Ee.pupil=Ee.black;const i=oy();for(const o of["wood","paleWood"])Ee[o].map=i;const s=ay();Ee.bark.map=Ee.bark.bumpMap=s,Ee.bark.bumpScale=.055,Ee.treeWood=Ee.bark.clone(),Ee.treeWood.map=Ee.treeWood.bumpMap=null,Ee.treeWood.vertexColors=!0,Zf(Ee.treeWood);const r=cy();for(const o of["leaves","leavesLight","leavesDark"])Ee[o].map=r;return Ee.leaves.needsUpdate=Ee.leavesLight.needsUpdate=Ee.leavesDark.needsUpdate=!0,Ee}function Is(n,t,e,i,s=[0,0,0],r=[1,1,1]){const o=new ee(Oo(t,e),i);return o.position.set(...s),o.scale.set(...r),o.castShadow=!0,o.receiveShadow=!0,n.add(o),o}function kt(n,t,e,i,s=10){return Is(n,"SphereGeometry",[1,s,6],t,e,i)}function Ze(n,t,e,i,s=.025,r=10){const o=`sculpted-sphere:${s}:${r}`;if(!Es.has(o)){const c=Oo("SphereGeometry",[1,r,Math.max(3,Math.round(r*.6))]).clone(),l=c.attributes.position;for(let h=0;h<l.count;h++){const u=l.getX(h),f=l.getY(h),d=l.getZ(h),x=1+s*Math.sin(u*4.1+d*2.8)*Math.cos(f*3.7-d*1.3);l.setXYZ(h,u*x,f*x,d*x)}c.computeVertexNormals(),Es.set(o,c)}const a=new ee(Es.get(o),t);return a.position.set(...e),a.scale.set(...i),a.castShadow=a.receiveShadow=!0,n.add(a),a}function Fe(n,t,e,i){return Is(n,"BoxGeometry",[1,1,1],t,e,i)}function ke(n,t,e,i,s,r){const o=Is(n,"CylinderGeometry",[i,i,s,10],t,e);return r&&o.rotation.set(...r),o}function ki(n,t,e,i,s,r=.105){kt(n,t.eye,[e,i,s],[r,r*1.08,r*.55]),kt(n,t.pupil,[e,i-r*.05,s+r*.45],[r*.43,r*.58,r*.23]),kt(n,t.white,[e-r*.14,i+r*.2,s+r*.67],[r*.15,r*.15,r*.12],8)}function ly(n,t,e,i,s=t.brass){return kt(n,s,e,i)}function oo(n,t,e,i,s,r=t.dark){const o=new te;return o.position.set(e,s+.1,i),n.add(o),kt(o,t.brass,[0,0,0],[.105,.105,.105]),ke(o,t.dark,[0,-s*.45,0],.065,s*.85),kt(o,t.brass,[0,-s*.72,0],[.078,.078,.078]),kt(o,r,[0,-s+.025,.055],[.115,.1,.17]),o}function hy(){const n=Un(),t=new te,e=new te,i=new re({color:"#dce4e5",metalness:.45,roughness:.55}),s=new re({color:"#9caaae",metalness:.55,roughness:.45});Fe(t,i,[0,.83,-.06],[.62,.51,.92]),Fe(t,s,[0,1.095,-.08],[.64,.035,.8]);for(const m of[-1,1]){Fe(t,s,[m*.315,.84,-.08],[.016,.018,.84]),Fe(t,s,[m*.316,.84,-.13],[.018,.48,.018]);for(const p of[-.43,.28])for(const g of[.64,1.03])kt(t,n.brass,[m*.327,g,p],[.025,.025,.025])}ke(t,n.dark,[0,1.03,.38],.21,.18,[Math.PI/2,0,0]),Fe(e,i,[0,1.32,.47],[.57,.45,.43]),Fe(e,n.dark,[0,1.35,.696],[.49,.25,.025]);const r=Fe(e,i,[0,1.15,.79],[.49,.25,.45]);r.rotation.x=-.18,Fe(e,s,[0,.99,.8],[.46,.04,.42]),kt(e,n.black,[0,1.2,1.025],[.1,.095,.085]),ki(e,n,-.135,1.36,.72,.109),ki(e,n,.135,1.36,.72,.109);for(const m of[-1,1]){const p=Fe(e,i,[m*.28,1.69,.43],[.22,.4,.12]);p.rotation.z=m*-.42,Fe(p,n.dark,[0,0,.52],[.68,.75,.12])}const o=[];for(const m of[-.3,.3])for(const p of[-.35,.29])Fe(t,i,[m,.64,p],[.23,.43,.27]),ke(t,s,[m*1.35,.78,p],.105,.06,[0,0,Math.PI/2]),ke(t,n.dark,[m,.39,p],.12,.09),ke(t,s,[m,.335,p],.13,.05),o.push(new L(m,.3,p));const a=new te,c=new te;a.name="Pip the hovering robot sheepdog",c.name="Pip floating body rig",a.add(c);const l=In(t),h=In(e);l.position.y=-.83,h.position.set(0,1.03-.83,.38);for(const m of h.children)m.geometry.translate(0,-1.03,-.38);c.position.y=.83,c.add(l,h),c.traverse(m=>{m.isMesh&&(m.userData.ownedGeometry=!0,(m.material===i||m.material===s)&&(m.userData.ownedMaterial=!0))});const u=new te;u.position.set(0,.94-.83,-.52),c.add(u);for(let m=0;m<7;m++)ke(u,m%2?n.dark:s,[0,.04+m*.05,-m*.035],.035,.055,[-.6,0,0]);const f=new re({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),d=kt(u,f,[0,.41,-.27],[.075,.075,.075]);d.userData.ownedMaterial=!0;const x=o.map(m=>Array.from({length:3},(p,g)=>{const v=new nn({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),M=new ee(Oo("TorusGeometry",[.135,.014,6,24]),v);return M.name=`Pip thruster ring ${g+1}`,M.rotation.x=Math.PI/2,M.userData.ownedMaterial=!0,a.add(M),M}));return a.userData.parts={body:l,rig:c,head:h,legs:[],tail:u,tailLight:d,basePods:o.map(m=>m.clone().add(new L(0,-.83,0))),pods:o,rings:x},a.userData.motion=$f(),To(a,{x:0,z:0,heading:0,vx:0,vz:0},0),a.userData.motion.previous=null,a.userData.hover={time:0,previous:null,trails:[]},a}function uy(){const n=Un(),t=new te,e=new te,i=[],s=new re({color:"#d4dfe0",metalness:.28,roughness:.68}),r=new re({color:"#eee5d5",metalness:.12,roughness:.82}),o=new re({color:"#b8b1a7",metalness:.24,roughness:.72}),a=new re({color:"#4a4a43",metalness:.08,roughness:.6});Ze(t,s,[0,.83,-.08],[.3,.27,.42],.012,12),Fe(t,r,[0,.78,.27],[.39,.27,.28]),Fe(t,o,[0,.61,.31],[.3,.045,.19]);for(const M of[-1,1]){const _=kt(t,o,[M*.275,.84,-.02],[.055,.16,.19]);_.rotation.z=M*-.12;for(const S of[-.31,.25])kt(t,a,[M*.25,.81,S],[.025,.025,.025],8)}ke(t,n.dark,[0,1,.31],.15,.15,[Math.PI/2,0,0]),Ze(e,s,[0,1.31,.43],[.3,.31,.28],.01,14);for(const M of[-1,1])ke(e,a,[M*.135,1.36,.676],.117,.032,[Math.PI/2,0,0]),kt(e,n.white,[M*.135,1.36,.704],[.088,.098,.043],12),kt(e,n.black,[M*.135,1.35,.744],[.047,.058,.024],10),kt(e,n.white,[M*.115,1.381,.764],[.018,.019,.012],8);Ze(e,r,[0,1.145,.68],[.235,.135,.18],.006,12),kt(e,n.black,[0,1.188,.835],[.078,.067,.055],10);const c=Is(e,"ConeGeometry",[1,1,3],s,[-.255,1.68,.4],[.14,.25,.065]);c.rotation.z=-.16,Is(e,"ConeGeometry",[1,1,3],o,[.27,1.57,.4],[.21,.14,.07]).rotation.set(0,0,Math.PI/2+.22),Fe(e,n.dark,[.28,1.53,.459],[.13,.075,.018]);const h=[];for(const M of[-.29,.29])for(const _ of[-.3,.25]){Ze(t,s,[M,.59,_],[.14,.24,.16],.006,10),ke(t,o,[M,.72,_],.084,.055,[0,0,Math.PI/2]),ke(t,n.dark,[M,.37,_],.105,.075);const S=new re({color:"#7cecff",emissive:"#27c8ff",emissiveIntensity:1.1,roughness:.35});i.push(S);const w=kt(t,S,[M,.325,_],[.112,.052,.112],10);w.userData.ownedMaterial=!0,h.push(new L(M,.3,_))}const u=new te,f=new te;u.name="Buddy the hovering robot puppy",f.name="Buddy floating body rig",u.add(f);const d=In(t),x=In(e);d.position.y=-.83,x.position.set(0,1.03-.83,.38);for(const M of x.children)M.geometry.translate(0,-1.03,-.38);f.position.y=.83,f.add(d,x),f.traverse(M=>{M.isMesh&&(M.userData.ownedGeometry=!0,[s,r,o,a,...i].includes(M.material)&&(M.userData.ownedMaterial=!0))});const m=new te;m.name="Buddy spring tail",m.position.set(0,.89-.83,-.47),f.add(m);for(let M=0;M<6;M++){const _=ke(m,M%2?n.dark:o,[0,.035+M*.047,-M*.032],.034,.052,[-.62,0,0]);_.name=`Buddy tail spring segment ${M+1}`}const p=new re({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.45,roughness:.28}),g=kt(m,p,[0,.32,-.205],[.071,.071,.071]);g.name="Buddy blue tail light",g.userData.ownedMaterial=!0;const v=h.map(M=>Array.from({length:3},(_,S)=>{const w=new nn({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),A=new ee(Oo("TorusGeometry",[.125,.013,6,24]),w);return A.name=`Buddy hover ring ${S+1}`,A.rotation.x=Math.PI/2,A.userData.ownedMaterial=!0,u.add(A),A}));return u.userData.parts={body:d,rig:f,head:x,legs:[],tail:m,tailLight:g,basePods:h.map(M=>M.clone().add(new L(0,-.83,0))),pods:h,rings:v},u.userData.motion=$f(),To(u,{x:0,z:0,heading:0,vx:0,vz:0},0),u.userData.motion.previous=null,u.userData.hover={time:0,previous:null,trails:[]},u.userData.suggestedScale=.82,u.userData.modelContract="pip-pose-hover-v1",u}function To(n,t,e){const i=ny(n.userData.motion,t,e),s=n.userData.parts;s.rig.position.y=.83+i.hover,s.rig.rotation.set(i.pitch,0,i.roll),s.head.rotation.y=i.headYaw,s.rig.updateMatrix(),s.pods.forEach((r,o)=>r.copy(s.basePods[o]).applyMatrix4(s.rig.matrix))}function bu(n,t){const e=n.userData.hover;if(!e)return;n.updateMatrixWorld(!0);const i=n.userData.parts.pods.map(r=>n.localToWorld(r.clone()));(!e.previous||n.position.distanceTo(e.previous)>3)&&(e.trails=i.map(r=>r.clone())),t>0&&(e.time+=t);for(let r=0;r<i.length;r++){t>0&&e.trails[r].lerp(i[r],1-Math.exp(-t/.13));const o=e.time/.55%1;for(let a=0;a<3;a++){const c=n.userData.parts.rings[r][a],l=i[r].clone().lerp(e.trails[r],a===0?0:(a-1+o)/2),h=n.worldToLocal(l);h.y=n.userData.parts.pods[r].y-.055-(a===0?0:(a-1+o)*.1+.055),c.position.copy(h),c.material.opacity=a===0?.95:a===1?.85*Math.min(1,o/.15):.85*(1-o),c.scale.setScalar(1+(a===0?0:(a-1+o)*.15))}}e.previous=n.position.clone()}const fy=[[[.11,.47,.105,.25],[.38,.42,.14,.31],[.65,.52,.12,.28],[.87,.43,.13,.3],[.52,.88,.09,.14]],[[.06,.36,.13,.22],[.29,.6,.095,.33],[.56,.36,.17,.27],[.85,.65,.1,.25],[.68,.87,.08,.12]],[[.15,.65,.16,.25],[.43,.34,.11,.24],[.68,.62,.18,.32],[.94,.3,.08,.18],[.35,.86,.07,.12]],[[.02,.58,.1,.31],[.25,.34,.16,.23],[.51,.65,.12,.28],[.78,.38,.15,.32],[.91,.84,.06,.11]]],Wa=[];function dy(n,t){let e=0;for(const s of String(t))e=Math.imul(e^s.charCodeAt(0),16777619);let i=(n^e^1129267540)>>>0;return i=Math.imul(i^i>>>16,2246822507),i=Math.imul(i^i>>>13,3266489909),(i^i>>>16)>>>30}function Jf(n=0){if(!Number.isInteger(n)||n<0||n>3)throw new RangeError("Unknown cow coat variant");if(Wa[n])return Wa[n];const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d"),i=e.createImageData(256,128),s=fy[n];for(let a=0;a<128;a++)for(let c=0;c<256;c++){const l=c/256,h=a/128,f=s.some(([m,p,g,v])=>{const M=Math.min(Math.abs(l-m),1-Math.abs(l-m))/g,_=(h-p)/v,S=Math.atan2(_,M);return M*M+_*_<1+.19*Math.sin(S*3+m*30)+.1*Math.cos(S*5+p*12)})?[49,48,46]:[238,228,204],d=(c*13+a*7)%9-4,x=(a*256+c)*4;for(let m=0;m<3;m++)i.data[x+m]=f[m]+d;i.data[x+3]=255}e.putImageData(i,0,0);const r=new Wi(t);r.colorSpace=Ie;const o=new re({color:"#ffffff",map:r,roughness:.94});return o.userData.cowCoatVariant=n,Wa[n]=o,o}function py(n){const t=new te;t.name="Clay Holstein cow";const e=h=>new re({color:h,roughness:.94,map:n.cream.map}),i=e("#d99f91"),s=e("#704c49"),r=e("#e4d1ae"),o=Jf();Ze(t,o,[0,.54,0],[.32,.34,.4875],.025,20);const a=new te;a.position.set(0,.73,.4175),t.add(a),Ze(a,n.cream,[0,-.015,.065],[.215,.225,.215],.018,16),Ze(a,n.dark,[0,.065,.055],[.205,.205,.18],.018,16),kt(a,n.cream,[0,-.055,.21],[.095,.15,.065],16),kt(a,i,[0,-.115,.255],[.224,.115,.125],16),kt(a,s,[0,-.203,.245],[.145,.012,.06],12),kt(a,i,[0,-.215,.237],[.157,.026,.065],12);for(const h of[-1,1]){ki(a,n,h*.087,.075,.207,.068),kt(a,n.dark,[h*.086,.133,.2],[.078,.026,.043],12);const u=kt(a,n.dark,[h*.255,.09,.005],[.139,.065,.08],14);u.rotation.z=h*.28;const f=kt(a,s,[h*.265,.096,.055],[.09,.037,.023],12);f.rotation.z=h*.28;const d=kt(a,s,[h*.115,-.089,.359],[.037,.045,.014],12);d.rotation.z=h*-.22,kt(a,i,[h*.115,-.074,.36],[.028,.014,.015],10);const x=new Xi(.008,.045,.16,10,4),m=x.attributes.position;for(let g=0;g<m.count;g++){const v=(m.getY(g)+.08)/.16;m.setXYZ(g,m.getX(g)+h*(.055*v-.04*v*v),m.getY(g),m.getZ(g)-.025*v*v)}x.computeVertexNormals(),x.userData.temporaryCowHorn=!0;const p=new ee(x,r);p.position.set(h*.145,.25,.015),a.add(p)}const c=[];for(const[h,u]of[[-.215,.275],[.215,.275],[-.215,-.29375],[.215,-.29375]]){const f=new te;f.position.set(h,.36,u),t.add(f),kt(f,n.cream,[0,-.105,0],[.073,.19,.075],12);for(const d of[-1,1])kt(f,n.dark,[d*.035,-.272,.029],[.034,.063,.091],10);c.push(f)}kt(t,i,[0,.295,-.23125],[.105,.067,.12],12);for(const h of[-.052,.052])for(const u of[-.2875,-.1875])kt(t,i,[h,.24,u],[.019,.038,.02],8);const l=kt(t,n.cream,[.035,.48,-.4835],[.027,.18,.027],10);return l.rotation.x=.2,kt(t,n.dark,[.035,.312,-.5175],[.048,.069,.043],10),{animal:t,legs:c,head:a}}function Eu(n,t,e,i){n.scale.setScalar(i);for(const o of t)n.remove(o);n.remove(e);const s=In(n),r=e.position.clone().multiplyScalar(i);e.position.set(0,0,0),e.scale.setScalar(i);for(const o of[...In(e).children])o.name="head",o.position.copy(r),o.userData={headPart:!0,pivot:r.toArray(),grazeDrop:.3*i},s.add(o);for(let o=0;o<t.length;o++){const a=t[o],c=a.position.clone().multiplyScalar(i);a.position.set(0,0,0),a.scale.setScalar(i);for(const l of[...In(a).children])l.name=`leg-${o}`,l.position.copy(c),l.userData={limbIndex:o,pivot:c.toArray()},s.add(l)}return s.userData.articulated=!0,s}function my(n="sheep"){const t=`animal:${n}`;if(pn.has(t))return pn.get(t).clone();const e=Un();if(n==="cow"){const{animal:c,legs:l,head:h}=py(e),u=Eu(c,l,h,1.5);return h.traverse(f=>{f.geometry?.userData.temporaryCowHorn&&f.geometry.dispose()}),pn.set(t,u),u.clone()}const i=new te;i.name="Robot sheep",Ze(i,e.cream,[0,.54,0],[.32,.34,.39]);{for(let c=0;c<3;c++)Ze(i,e.white,[0,.625,-.23+c*.22],[.335,.3,.145]);[-1,1].forEach(c=>{for(let l=0;l<3;l++)kt(i,e.brass,[c*.312,.56,-.21+l*.21],[.029,.033,.033],8)})}ly(i,e,[0,.87,-.11],[.1,.024,.105],e.mint);const s=new te;s.position.set(0,.7,.34),i.add(s),kt(s,e.dark,[0,0,.06],[.22,.235,.205]),kt(s,e.black,[0,-.08,.225],[.185,.12,.09]),ki(s,e,-.096,.055,.221,.075),ki(s,e,.096,.055,.221,.075),[-1,1].forEach(c=>{const l=kt(s,e.cream,[c*.235,.075,.025],[.135,.048,.082]);l.rotation.z=c*.25,kt(s,e.brass,[c*.193,.075,.025],[.045,.045,.045])}),kt(s,e.cyan,[0,.22,.008],[.033,.033,.033],8),ke(i,e.dark,[0,.64,.31],.13,.11,[Math.PI/2,0,0]);const r=[oo(i,e,-.22,.22,.25),oo(i,e,.22,.22,.25),oo(i,e,-.22,-.24,.25),oo(i,e,.22,-.24,.25)];kt(i,e.dark,[0,.6,-.39],[.061,.065,.07]);const a=Eu(i,r,s,1);return pn.set(t,a),a.clone()}function gy(){const n=Un(),t=new te;t.name="Autonomous meadow drone",kt(t,n.mint,[0,0,0],[.3,.14,.25]),kt(t,n.cream,[0,.09,0],[.2,.085,.17]),ki(t,n,-.1,-.005,.238,.068),ki(t,n,.1,-.005,.238,.068);const e=[];return[-1,1].forEach(i=>[-1,1].forEach(s=>{const r=ke(t,n.brass,[i*.24,0,s*.2],.035,.32,[0,0,i*Math.PI/2]);r.rotation.y=s*-.5;const o=new te;o.position.set(i*.39,.09,s*.29),t.add(o),kt(o,n.dark,[0,-.045,0],[.071,.08,.071]),kt(o,n.cream,[0,0,0],[.23,.017,.04]),kt(o,n.cream,[0,0,0],[.04,.017,.23]),kt(o,n.cyan,[0,.014,0],[.036,.027,.036]),e.push(o)})),t.userData.parts={propellers:e},t}function Tu(n=0,t=0){n=Math.abs(Math.floor(n))%3;const e=Math.max(0,Math.min(2,Math.round(t))),i=`tree:${n}:${e}`;if(pn.has(i))return Au(pn.get(i));const s=Un(),r=new te;r.name="clay tree";const o=new ee(ey(n),s.treeWood);o.name="tree-wood",o.userData.treeWidth=1,o.castShadow=!1,o.receiveShadow=!0,r.add(o),r.userData.forks=o.geometry.userData.forks;const a=o.geometry.userData.tips,c=new L(0,1,0),l=[s.leaves,s.leavesDark,s.leavesLight][n],u=[[.14,3.12,.02],[-.26,2.85,-.13],[.32,2.83,.27],...a,[-.52,2.64,.47],[.52,2.75,-.47],[-.48,3.19,.27],[.44,3.21,-.3]].slice(0,7+e*2).map((x,m)=>{const p=Math.hypot(x[0],x[2]),g=1+.12*Math.sin(m*4.71+n*1.93),v=(.59-.21*Math.min(1,p/1.2))*g;return[x,[v,v*(1.02+.1*Math.sin(m+n)),v*(.94+.08*Math.cos(m*2))]]}),f=new te;for(const[x,m]of u)Ze(f,l,x,m,.075,8);for(let x=0;x<u.length*2;x++){const[m,p]=u[x%u.length],g=x*2.399963+n*.27,v=x%2?.3:-.25,M=Math.sqrt(1-v*v),_=Math.cos(g)*M,S=Math.sin(g)*M,w=1+.075*Math.sin(_*4.1+S*2.8)*Math.cos(v*3.7-S*1.3),A=new L(_/p[0],v/p[1],S/p[2]).normalize();Is(f,"SphereGeometry",[1,6,3],l,[m[0]+_*p[0]*w*.92,m[1]+v*p[1]*w*.92,m[2]+S*p[2]*w*.92],[.14,.07,.11]).quaternion.setFromUnitVectors(c,A)}const d=In(f).children[0];return d.name="tree-foliage",d.userData.crownProfile=u.map(([x,m])=>({position:x,radial:Math.hypot(x[0],x[2]),size:m[0]})),r.add(d),pn.set(i,r),Au(r)}function Au(n){const t=n.clone(),e=t.getObjectByName("tree-wood");return e.material=e.material.clone(),Zf(e.material),e.userData.ownedMaterial=!0,t}function xy(n=2.2,t=4.5){const e=Un(),i=new te,s=Math.ceil(t/.3);for(let r=0;r<s;r++){const o=-t/2+(r+.5)*t/s,a=Math.sin((r+.5)/s*Math.PI)*.12;Fe(i,r%3?e.paleWood:e.wood,[0,a+.09,o],[n,.18,t/s-.025]),[-1,1].forEach(c=>kt(i,e.brass,[c*(n/2-.16),a+.184,o],[.025,.01,.025],6))}return[-1,1].forEach(r=>{for(let o=0;o<4;o++)ke(i,e.wood,[r*n/2,.56,-t/2+o*t/3],.065,.96);Fe(i,e.paleWood,[r*n/2,.86,0],[.1,.1,t+.2]),Fe(i,e.wood,[r*n/2,.46,0],[.08,.075,t+.2])}),In(i)}function _y(n=0,t=5){n=Number.isFinite(n)?Math.abs(Math.floor(n))%6:0,t=Number.isFinite(t)?Math.max(1,Math.min(12,Math.floor(t))):5;const e=`flowers:${n}:${t}`;if(pn.has(e))return pn.get(e).clone();const i=Un(),s=new te;for(let r=0;r<t;r++){const o=r*2.39996+n,a=Math.sqrt(r/t)*.65,c=new te;c.position.set(Math.cos(o)*a,0,Math.sin(o)*a),s.add(c);const l=.18+(r*7+n)%4*.03;ke(c,i.stem,[0,l/2,0],.014,l);const h=[i.flowerYellow,i.flowerPink,i.flowerWhite][(r+n)%3];for(let u=0;u<5;u++){const f=u*Math.PI*2/5;kt(c,h,[Math.cos(f)*.05,l,Math.sin(f)*.05],[.045,.022,.045],6)}kt(c,i.flowerCenter,[0,l+.015,0],[.027,.023,.027],6)}return Kf(e,s)}function Xa(n=0){n=Math.abs(Math.floor(n))%3;const t=`bush:${n}`;if(pn.has(t))return pn.get(t).clone();const e=Un(),i=new te,s=[e.leaves,e.leavesDark,e.leavesLight][n%3];ke(i,e.bark,[0,.16,0],.08,.3),Ze(i,s,[0,.42,0],[.62,.46,.48],.075),Ze(i,s,[-.42,.28,.12],[.38,.34,.35],.075),Ze(i,s,[.42,.34,-.1],[.4,.37,.36],.075),Ze(i,s,[.1,.65,-.13],[.38,.34,.37],.075);for(let r=0;r<4;r++){const o=r*Math.PI/2+n*.29,a=Ze(i,s,[Math.cos(o)*.52,.46+r%2*.1,Math.sin(o)*.42],[.25,.16,.33],.04);a.rotation.y=o}return Kf(t,i)}function Kc(n){let t=n;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function ao(n,t=!1){const e=document.createElement("canvas");e.width=e.height=512;const i=e.getContext("2d"),s=Kc(n==="grass"?83:193);i.fillStyle=t?"#909090":n==="grass"?"#779c4d":"#b79763",i.fillRect(0,0,512,512);for(let o=0;o<90;o++){const a=s()*512,c=s()*512,l=12+s()*57;i.fillStyle=t?["#858585","#999999","#aaaaaa"][o%3]:n==="grass"?["#92ad56","#4f854a","#bdba67","#6a964d"][o%4]:["#c9ad78","#9c8055","#ddc18e"][o%3],i.globalAlpha=.08;for(const h of[-512,0,512])for(const u of[-512,0,512])i.beginPath(),i.ellipse(a+h,c+u,l,l*.6,0,0,Math.PI*2),i.fill()}for(let o=0;o<7200;o++){const a=s()*512,c=s()*512;i.fillStyle=t?["#777777","#bbbbbb","#dddddd"][o%3]:n==="grass"?["#496f39","#9eb568","#d0c480","#789b4b"][o%4]:["#826b48","#e4c995","#b99a6a"][o%3],i.globalAlpha=.14+s()*.25,i.beginPath(),i.ellipse(a,c,.35+s()*.85,n==="grass"?1.2+s()*3.8:.3+s()*1.4,s()*Math.PI,0,Math.PI*2),i.fill()}i.globalAlpha=1;const r=new Wi(e);return t||(r.colorSpace=Ie),r.wrapS=r.wrapT=$n,r}function jf(n,t,e,i){const s=i.x-e.x,r=i.z-e.z,o=Math.max(0,Math.min(1,((n-e.x)*s+(t-e.z)*r)/(s*s+r*r||1))),a=n-e.x-o*s,c=t-e.z-o*r;return a*a+c*c}function My(n,t,e,i){return Math.sqrt(jf(n,t,e,i))}function qa(n,t,e){let i=1/0;for(let s=1;s<e.length;s++)i=Math.min(i,jf(n,t,e[s-1],e[s]));return Math.sqrt(i)}function vy(n,t="#45684d"){const e=document.createElement("canvas");e.width=512,e.height=128;const i=e.getContext("2d");i.fillStyle="#faf6e9",i.beginPath(),i.roundRect(8,12,496,98,35),i.fill(),i.fillStyle=t,i.font="bold 34px sans-serif",i.textAlign="center",i.fillText(n,256,76);const s=new Wi(e);s.colorSpace=Ie;const r=new Gp(new ff({map:s,depthTest:!1}));return r.scale.set(6,1.5,1),r}class yy{constructor(t){this.renderer=new _M({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Hu,this.renderer.outputColorSpace=Ie,this.renderer.toneMapping=Wu,this.renderer.toneMappingExposure=1.05,this.scene=new Bp,this.scene.background=new Wt("#bdd6df"),this.scene.fog=new dl("#bdd6df",95,195),this.hemisphere=new Rm("#eaf7ff","#536747",1.65),this.scene.add(this.hemisphere),this.skyDay=new Wt("#bdd6df"),this.skyStorm=new Wt("#899da7"),this.sun=new zm("#fff4dc",2.05),this.sun.position.set(-18,35,20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100}),this.sun.shadow.camera.updateProjectionMatrix(),this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.camera=new Lo(-30,30,20,-20,.1,180),this.center=new L(-7,0,0),this.targetCenter=this.center.clone(),this.terrain=new te,this.actors=new te,this.scene.add(this.terrain,this.actors),this.materials=Un(),this.grass=new re({color:"#ffffff",roughness:.96,map:ao("grass"),bumpMap:ao("grass",!0),bumpScale:.12}),this.path=new re({color:"#fff1d3",roughness:.95,map:ao("path"),bumpMap:ao("path",!0),bumpScale:.08,side:Ce}),this.pathShoulder=new re({color:"#a99261",roughness:1,transparent:!0,opacity:.36,depthWrite:!1,side:Ce}),this.thrusterGlow=new Kv;for(const e of[this.grass,this.path,this.pathShoulder])this.thrusterGlow.install(e);this.water=new re({color:"#4b9fae",roughness:.29,metalness:.08,side:Ce}),this.targetMat=new nn({color:"#ffe8a0",transparent:!0,opacity:.56,depthWrite:!1,side:Ce}),this.fenceParts=[new ee(new Xi(.075,.075,.92,10),this.materials.paleWood),new ee(new Bi(1,8,6),this.materials.paleWood),new ee(new Dn(1,.105,.085),this.materials.wood)],this.sceneryBatches=[],this.sceneryFrustum=new Do,this.viewMatrix=new se,this.animalMeshes=[],this.animalBatches=[],this.helperMeshes=new Map,this.resize(),this.preview=!0,this.particles=[],this.nature=new Fv(this.scene),this.waterEffects=new vv(this.scene)}resize(){this.width=innerWidth,this.height=innerHeight,this.renderer.setSize(this.width,this.height,!1),this.aspect=this.width/this.height}place(t,e,i,s=1,r=!1){return t.position.set(e,0,i),t.scale.multiplyScalar(s),t.traverse(o=>{o.userData.treeWidth!==void 0&&(o.userData.treeWidth=sy(s),o.material.userData.treeWidth.value=o.userData.treeWidth)}),r&&t.traverse(o=>{o.isMesh&&(o.userData.ownedGeometry=!0)}),this.terrain.add(t),t}flat(t,e,i,s,r=.02){const o=new ee(t,e);return o.rotation.x=-Math.PI/2,o.position.set(i,r,s),o.receiveShadow=!0,this.terrain.add(o),o}setLevel(t){this.level=t,this.barkEffects=[],this.waterEffects.restoreMaterials(),this.cutaway?.dispose(),this.cutaway=null,this.gateView?.dispose(),this.gateView?.removeFromParent(),this.stoneView?.dispose(),this.stoneView?.removeFromParent(),this.gateView=this.stoneView=null;const e=new Set,i=new Set;for(const C of[this.terrain,this.actors])C.traverse(P=>{P.userData.ownedGeometry&&e.add(P.geometry),P.userData.ownedMaterial&&i.add(P.material),P.userData.ownedLabel&&(P.material.map.dispose(),i.add(P.material)),P.isInstancedMesh&&P.dispose()});e.forEach(C=>C?.dispose()),i.forEach(C=>C?.dispose()),this.terrain.clear(),this.actors.clear(),this.sceneryBatches=[],this.helperMeshes.clear(),this.animalMeshes=[],this.animalBatches=[],this.particles=[];const s=t.bounds,r=s.maxX-s.minX,o=s.maxZ-s.minZ,a=Kc(t.seed),c=Kc(t.seed^7628133),l=(s.maxX+s.minX)/2,h=(s.maxZ+s.minZ)/2,u=this.flat(new br(r+90,o+90,1,1),this.grass,l,h,-.035);if(u.userData.ownedGeometry=!0,this.grass.map.repeat.set((r+90)/15,(o+90)/15),this.grass.bumpMap.repeat.copy(this.grass.map.repeat),t.boundary?.length>4){u.material=this.grass.clone(),u.material.color.multiplyScalar(.72),u.userData.ownedMaterial=!0;const C=new Bc;t.boundary.forEach(($,rt)=>rt?C.lineTo($.x,-$.z):C.moveTo($.x,-$.z)),C.closePath();const P=new So(C);P.rotateX(-Math.PI/2);const G=P.attributes.position,H=P.attributes.uv;for(let $=0;$<G.count;$++)H.setXY($,(G.getX($)-l)/(r+90)+.5,(G.getZ($)-h)/(o+90)+.5);const N=new ee(P,this.grass);N.name="playable-meadow",N.position.y=-.025,N.receiveShadow=!0,N.userData.ownedGeometry=!0,this.terrain.add(N)}for(const C of t.sceneryHills||[]){const P=new ee(new Bi(1,20,12),new re({color:["#799552","#6f914e","#93a75d"][Math.floor(a()*3)],roughness:1}));P.position.set(C.x,-.3,C.z),P.scale.set(C.radius,C.height,C.radius),P.userData.ownedGeometry=P.userData.ownedMaterial=!0,this.terrain.add(P)}const f=(C,P)=>{const G=new ee(C,P);return G.receiveShadow=!0,G.userData.ownedGeometry=!0,this.terrain.add(G),G},d=t.roads.length?yu(this.path):null,x=t.roads.length?yu(this.pathShoulder):null;for(const C of t.roads)f(vu(C.points,C.width+.65,{ragged:!0,y:.003,seed:t.seed+5}),x).userData.ownedMaterial=!0,f(vu(C.points,C.width,{ragged:!0,y:.007,seed:t.seed}),d).userData.ownedMaterial=!0;const m=[];for(const C of t.rivers){const P=new re({color:"#6c8960",roughness:1,side:Ce});this.thrusterGlow.install(P);const G=f(Yc(C.points,C.width+.8,{y:.002}),P);G.userData.ownedMaterial=!0;const H=f(Yc(C.points,C.width,{y:.018}),this.water),N=C.points[0],$=C.points.at(-1);m.push({mesh:H,points:C.points,width:C.width,heading:Math.atan2($.x-N.x,$.z-N.z)});for(const rt of C.bridges){const mt=xy(rt.width,rt.length),Et=new Map;mt.traverse(q=>{if(!q.isMesh)return;const K=q.material;Et.has(K)||Et.set(K,this.thrusterGlow.install(K.clone())),q.material=Et.get(K),q.userData.ownedMaterial=!0}),mt.rotation.y=rt.heading,this.place(mt,rt.x,rt.z,1,!0)}}const p=t.target,g=ln(p),v=g.halfLength,M=[];this.goal=f(Mu(p),this.targetMat),this.goalOutline=f(Jv(p),new nn({color:"#fff0b5",side:Ce})),this.goalOutline.userData.ownedMaterial=!0,this.goalFloor=null;const _=(C,P,G,H,N,$)=>{const rt=Math.hypot(P.x-C.x,P.z-C.z),mt=new ee(new Dn(rt,G,H),N);return mt.position.set((C.x+P.x)/2,G/2,(C.z+P.z)/2),mt.rotation.y=-Math.atan2(P.z-C.z,P.x-C.x),mt.castShadow=mt.receiveShadow=!0,mt.userData.ownedGeometry=!0,mt.userData.coverSide=$,this.terrain.add(mt),mt};for(const C of t.fenceSegments||[]){if(C.material==="stone")continue;const{a:P,b:G,kind:H}=C,N=Math.hypot(G.x-P.x,G.z-P.z);if(H==="target"&&p.type==="barn"){const $=Math.ceil(N/3);for(let rt=0;rt<$;rt++){const mt={x:P.x+(G.x-P.x)*rt/$,z:P.z+(G.z-P.z)*rt/$},Et={x:P.x+(G.x-P.x)*(rt+1)/$,z:P.z+(G.z-P.z)*(rt+1)/$},q=(mt.x+Et.x)/2-p.x,K=(mt.z+Et.z)/2-p.z,st=Math.cos(p.heading||0),at=Math.sin(p.heading||0),ct=q*st-K*at,Ot=q*at+K*st,Gt=Math.abs(Math.abs(ct)-v)<Math.abs(Math.abs(Ot)-v)?ct>=0?"+x":"-x":Ot>=0?"+z":"-z";M.push(_(mt,Et,2.4,.22,this.materials.barn,Gt));const U=_(mt,Et,.14,.25,this.materials.barnTrim,Gt);U.position.y=2.35,M.push(U)}}else if(H==="target"&&p.type==="field"){this.placeFence(P,G);const $=Math.ceil(N/1.4);for(let rt=0;rt<$;rt++)this.place(Xa(rt),P.x+(G.x-P.x)*(rt+.5)/$,P.z+(G.z-P.z)*(rt+.5)/$,.75)}else this.placeFence(P,G)}if(this.gateView=Xv(t.gates),this.stoneView=Yv(t.fenceSegments),this.terrain.add(this.gateView,this.stoneView),p.type==="barn"){this.goalFloor=f(Mu(p,.013),this.path);const C=v+.3,P=Math.ceil(v*2/2.4),G=C*2/P,H=[-C];for(let K=1;K<P;K++){const st=-C+K*G;H.push(st-.045,st,st+.045)}H.push(C);const N=[],$=[],rt=[],mt=3.29+v*.5*Math.tan(.21);for(let K=0;K<H.length;K++)for(const st of[-C,0,C]){const at=K>0&&K<H.length-1&&(K-2)%3===0?.025:0;N.push(st,mt-Math.abs(st)*Math.tan(.21)-at,H[K]),$.push((st+C)/2.4,(H[K]+C)/2.4)}for(let K=0;K<H.length-1;K++)for(let st=0;st<2;st++){const at=K*3+st,ct=at+3;rt.push(at,ct,at+1,at+1,ct,ct+1)}const Et=new _e;Et.setAttribute("position",new $t(N,3)),Et.setAttribute("uv",new $t($,2)),Et.setIndex(rt),Et.computeVertexNormals();const q=new ee(Et,this.materials.roof);q.name="barn-roof",q.castShadow=!0,q.userData.ownedGeometry=!0,q.userData.coverKind="roof",q.position.set(p.x,0,p.z),q.rotation.y=p.heading||0,this.terrain.add(q),M.push(q),this.cutaway=new $v(p,M,{halfExtent:v+.3})}const S=vy(p.type==="pen"?"SUNNY PEN":p.type==="barn"?"HOME BARN":"CLOVER FIELD");S.scale.set(4.5,1.125,1),S.position.set(p.x-Math.sin(p.heading||0)*(v+1),3,p.z-Math.cos(p.heading||0)*(v+1)),S.name="Destination introduction",S.userData.ownedLabel=!0,this.destinationSign=S,this.terrain.add(S);for(const C of t.obstacles){const P=C.radius*1.45,G=Tu(Math.floor(a()*3),P<1.7?0:P<2.4?1:2);G.rotation.y=c()*Math.PI*2,this.place(G,C.x,C.z,P);for(let H=0;H<4;H++){const N=H*Math.PI/2;this.place(Xa(H),C.x+Math.cos(N)*C.radius*.48,C.z+Math.sin(N)*C.radius*.48,C.radius*.7)}}const w=(C,P,G=0)=>C>s.minX+G&&C<s.maxX-G&&P>s.minZ+G&&P<s.maxZ-G&&(!(t.boundary?.length>4)||le(t,C,P,G))&&!t.rivers.some(H=>qa(C,P,H.points)<H.width/2+G+.5)&&!t.roads.some(H=>qa(C,P,H.points)<H.width/2+G+.35)&&Math.hypot(C-p.x,P-p.z)>p.radius+G+2&&!t.obstacles.some(H=>Math.hypot(C-H.x,P-H.z)<H.radius+G)&&!(t.fenceSegments||[]).some(H=>My(C,P,H.a,H.b)<G+.7),A=[];let D=0;for(const C of t.roads)for(let P=1;P<C.points.length;P++){const G=C.points[P-1],H=C.points[P],N=Math.hypot(H.x-G.x,H.z-G.z);N&&(D+=N,A.push({a:G,b:H,length:N,end:D,width:C.width}))}const y=(C,P)=>{if(C<P*.7&&D){const G=(C/(P*.7)+a()/(P*.7))*D,H=A.find(Et=>Et.end>=G)||A[A.length-1],N=(G-H.end+H.length)/H.length,$=(H.b.x-H.a.x)/H.length,rt=(H.b.z-H.a.z)/H.length,mt=(H.width/2+1.1+a()*2.8)*(C%2?1:-1);return{x:H.a.x+$*N*H.length-rt*mt,z:H.a.z+rt*N*H.length+$*mt}}return{x:s.minX+2+a()*(r-4),z:s.minZ+2+a()*(o-4)}};this.meadowDetails=[];const E=Math.min(190,Math.ceil(r*o/130));for(let C=0;C<E;C++){const{x:P,z:G}=y(C,E);w(P,G,1)&&(this.place(_y(C,3),P,G,.85+a()*.6),this.meadowDetails.push({x:P,z:G,kind:"flower"}))}const I=[],F=Math.min(650,Math.ceil(r*o/35));for(let C=0;C<F;C++){const{x:P,z:G}=y(C,F);w(P,G,.4)&&(I.push({x:P,z:G}),this.meadowDetails.push({x:P,z:G,kind:"tuft"}))}if(I.length){const C=new pr(.12,.55,3),P=new re({color:"#648844",roughness:1,transparent:!0,opacity:1,depthWrite:!1}),G=new ai(C,P,I.length),H=new we;I.forEach((N,$)=>{H.position.set(N.x,.18,N.z),H.scale.set(.7+a()*.6,.55+a()*.8,.7+a()*.6),H.rotation.y=a()*Math.PI,H.updateMatrix(),G.setMatrixAt($,H.matrix)}),G.receiveShadow=!0,G.userData.decorativeGrass=!0,G.userData.ownedGeometry=G.userData.ownedMaterial=!0,this.terrain.add(G),this.trackScenery(G)}const k=[];for(const C of t.rivers)for(let P=2;P<C.points.length-2;P+=5){const G=C.points[P],H=C.points[P+1],N=H.x-G.x,$=H.z-G.z,rt=Math.hypot(N,$)||1;for(const mt of[-1,1]){const Et=G.x-$/rt*(C.width/2+.65)*mt,q=G.z+N/rt*(C.width/2+.65)*mt;Et>s.minX&&Et<s.maxX&&q>s.minZ&&q<s.maxZ&&!C.bridges.some(K=>Math.hypot(Et-K.x,q-K.z)<K.length/2+K.width)&&k.push({x:Et,z:q})}}if(k.length){const C=new pr(.18,.95,4),P=new re({color:"#5b7951",roughness:1}),G=new ai(C,P,k.length),H=new we;k.forEach((N,$)=>{H.position.set(N.x,.4,N.z),H.rotation.z=(a()-.5)*.25,H.updateMatrix(),G.setMatrixAt($,H.matrix)}),G.userData.ownedGeometry=G.userData.ownedMaterial=!0,this.terrain.add(G),this.trackScenery(G)}const Z=Math.min(62,28+Math.floor(t.index/3));for(let C=0;C<Z;C++){let P,G;const H=C%4;if(H<2?(P=s.minX-12+a()*(r+24),G=H===0?s.minZ-4-a()*17:s.maxZ+4+a()*17):(P=H===2?s.minX-5-a()*18:s.maxX+5+a()*18,G=s.minZ+a()*o),t.rivers.some(rt=>qa(P,G,rt.points)<rt.width/2+3))continue;const N=1.3+a()*1.8,$=Tu(C%3,N<1.7?0:N<2.4?1:2);$.rotation.y=c()*Math.PI*2,this.place($,P,G,N)}this.bushPlacements=vM(t);for(const C of this.bushPlacements)this.place(Xa(C.variant),C.x,C.z,C.scale);this.nature.setLevel(t),this.waterEffects.setLevel(t,{grassMaterials:[this.grass],pathMaterials:[this.path,d],waterMaterial:this.water,terrain:this.terrain,rivers:m,weather:this.nature.weather}),this.batchScenery(),this.dog=hy(),this.dog.scale.setScalar(1.35*.75),this.actors.add(this.dog);const O=new ee(new xl(.82,.95,40),new nn({color:"#fff0bb",transparent:!0,opacity:.9,side:Ce,depthWrite:!1}));O.scale.setScalar(1/.75),O.rotation.x=-Math.PI/2,O.position.y=.03/.75,O.userData.ownedGeometry=O.userData.ownedMaterial=!0,this.dog.add(O);const z=new Bc;z.moveTo(0,1.45),z.lineTo(-.19,1.05),z.lineTo(.19,1.05),z.closePath(),this.goalPointer=new ee(new So(z),new nn({color:"#be8652",side:Ce,depthWrite:!1})),this.goalPointer.scale.setScalar(1/.75),this.goalPointer.rotation.x=Math.PI/2,this.goalPointer.userData.ownedGeometry=this.goalPointer.userData.ownedMaterial=!0,this.dog.add(this.goalPointer);for(const C of t.animals){const P=new we;P.position.set(C.x,0,C.z),P.rotation.y=C.heading??Math.PI/2,P.scale.setScalar(Ts(C)),this.animalMeshes.push(P)}for(const C of["sheep","cow"]){const P=t.animals.flatMap((rt,mt)=>rt.type===C?[mt]:[]);if(!P.length)continue;const G=my(C),H=[];let N=0;const $=[];for(const rt of G.children){rt.geometry.boundingSphere||rt.geometry.computeBoundingSphere();const mt=rt.geometry.boundingSphere,Et=rt.userData.pivot;if(N=Math.max(N,mt.center.length()+mt.radius+(Et?Math.hypot(...Et):0)),rt.material.userData.cowCoatVariant!==void 0){for(let K=0;K<4;K++){const st=P.filter(ct=>dy(t.seed,t.animals[ct].id??ct)===K);if(!st.length)continue;const at=new ai(rt.geometry,Jf(K),st.length);at.instanceMatrix.setUsage(xs),at.castShadow=at.receiveShadow=!0,at.frustumCulled=!1,this.actors.add(at),$.push({indices:st,meshes:[at],visibleIndices:[],coatVariant:K})}continue}const q=new ai(rt.geometry,rt.material,P.length);q.instanceMatrix.setUsage(xs),q.castShadow=q.receiveShadow=!0,q.frustumCulled=!1,q.userData={...rt.userData},this.actors.add(q),H.push(q)}this.animalBatches.push({indices:P,meshes:H,radius:N,visibleIndices:[]},...$.map(rt=>({...rt,radius:N})))}this.center.set(t.spawn.x+(this.aspect<.8?2:10),0,t.spawn.z+1),this.time=0,this.update(t,t.dog,0,!0)}placeFence(t,e){const i=Math.hypot(e.x-t.x,e.z-t.z),s=Math.max(1,Math.ceil(i/1.8)),r=new te;r.position.set((t.x+e.x)/2,0,(t.z+e.z)/2),r.rotation.y=-Math.atan2(e.z-t.z,e.x-t.x);const o=(a,c,l,h=1,u=1,f=1)=>{const d=this.fenceParts[a].clone();d.position.set(c,l,0),d.scale.set(h,u,f),d.userData.fencePart=!0,r.add(d)};for(let a=0;a<=s;a++){const c=-i/2+a*i/s;o(0,c,.46),o(1,c,.94,.083,.065,.083)}for(let a=0;a<s;a++)for(const c of[.34,.69])o(2,-i/2+(a+.5)*i/s,c,i/s+.03);this.terrain.add(r)}trackScenery(t){const e=t.instanceMatrix.array.slice(),i=new Float32Array(t.count*4),s=new se,r=new mi;t.geometry.boundingSphere||t.geometry.computeBoundingSphere();for(let a=0;a<t.count;a++)s.fromArray(e,a*16),r.copy(t.geometry.boundingSphere).applyMatrix4(s),i.set([r.center.x,r.center.y,r.center.z,r.radius],a*4);t.instanceMatrix.setUsage(xs),t.frustumCulled=!1;const o=t.geometry.attributes.treeInstanceWidth?.array.slice();this.sceneryBatches.push({batch:t,matrices:e,bounds:i,widths:o})}batchScenery(){this.terrain.updateMatrixWorld(!0);const t=new Map;this.terrain.traverse(i=>{if(!i.isMesh||i.isInstancedMesh||i.userData.ownedGeometry||i.material.transparent)return;const s=`${i.geometry.id}:${i.userData.treeWidth!==void 0?"treeWood":i.material.id}`;t.has(s)||t.set(s,[]),t.get(s).push(i)});for(const i of t.values()){if(i.length<2&&i[0].userData.treeWidth===void 0)continue;const s=i[0],r=s.userData.treeWidth!==void 0,o=r?s.geometry.clone():s.geometry;r&&o.setAttribute("treeInstanceWidth",new Oc(new Float32Array(i.map(c=>c.userData.treeWidth)),1).setUsage(xs));const a=new ai(o,r?Un().treeWood:s.material,i.length);r&&(a.userData.ownedGeometry=!0,a.userData.treeWood=!0),i.forEach((c,l)=>{a.setMatrixAt(l,c.matrixWorld),r&&c.userData.ownedMaterial&&c.material.dispose(),c.parent.remove(c)}),a.castShadow=!!s.userData.fencePart,a.receiveShadow=!0,this.terrain.add(a),this.trackScenery(a)}const e=[];this.terrain.traverse(i=>{i.isGroup&&!i.children.length&&e.push(i)}),e.forEach(i=>i.parent.remove(i))}cullScenery(){this.camera.updateMatrixWorld(!0),this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);const t=this.sceneryFrustum.planes;for(const{batch:e,matrices:i,bounds:s,widths:r}of this.sceneryBatches){let o=0;for(let a=0;a<s.length;a+=4){const c=s[a+3]+2;t.some(l=>l.normal.x*s[a]+l.normal.y*s[a+1]+l.normal.z*s[a+2]+l.constant<-c)||(e.instanceMatrix.array.set(i.subarray(a*4,a*4+16),o*16),r&&(e.geometry.attributes.treeInstanceWidth.array[o]=r[a/4]),o++)}if(e.count=o,e.visible=o>0,e.instanceMatrix.needsUpdate=!0,e.instanceMatrix.clearUpdateRanges(),o&&e.instanceMatrix.addUpdateRange(0,o*16),r){const a=e.geometry.attributes.treeInstanceWidth;a.needsUpdate=!0,a.clearUpdateRanges(),o&&a.addUpdateRange(0,o)}}}updateAnimalBatches(t,e){const i=this.sceneryFrustum.planes,s=new se,r=new se,o=new se;for(const a of this.animalBatches){const c=a.visibleIndices;c.length=0;for(const l of a.indices){const h=this.animalMeshes[l],u=h.position,f=a.radius*Math.max(Math.abs(h.scale.x),Math.abs(h.scale.y),Math.abs(h.scale.z))+3;i.some(d=>d.normal.x*u.x+d.normal.y*u.y+d.normal.z*u.z+d.constant<-f)||c.push(l)}c.forEach((l,h)=>a.meshes.forEach(u=>{if(u.userData.headPart){const p=this.animalMeshes[l].userData,g=u.userData.pivot;s.makeTranslation(g[0],g[1]-(p.graze||0)*u.userData.grazeDrop,g[2]),r.makeRotationX(Td(p,l)),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o);return}if(u.userData.limbIndex===void 0){u.setMatrixAt(h,this.animalMeshes[l].matrix);return}const f=t.animals[l],d=u.userData.limbIndex,x=d===0||d===3?0:Math.PI,m=Math.sin(e*12+l*.8+x)*Math.min(.5,pd(f,this.animalMeshes[l].userData.turnSpeed)*.15);s.makeTranslation(...u.userData.pivot),r.makeRotationX(m),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o)}));for(const l of a.meshes)l.count=c.length,l.visible=c.length>0,l.instanceMatrix.needsUpdate=!0,l.instanceMatrix.clearUpdateRanges(),c.length&&l.instanceMatrix.addUpdateRange(0,c.length*16)}}update(t,e,i,s=!1){this.time+=i,this.preview=s,this.destinationSign.material.opacity=s?1:Math.max(0,Math.min(1,1-((t.time||0)-4)/1.2)),this.destinationSign.visible=this.destinationSign.material.opacity>0;const o=(s?this.aspect<.8?50:44:this.aspect<.8?39:36)/2,a=o*this.aspect,c=s?t.spawn.x+(this.aspect<.8?2:10):e.x,l=s?t.spawn.z+1:e.z+2,h=s?Math.min(1,i*.8):Math.min(1,i*3.5);if(this.center.x+=(c-this.center.x)*h,this.center.z+=(l-this.center.z)*h,!s){const m=a*.12,p=o*.12;this.center.x=Math.max(c-m,Math.min(c+m,this.center.x)),this.center.z=Math.max(l-p,Math.min(l+p,this.center.z))}this.camera.left=-a,this.camera.right=a,this.camera.top=o,this.camera.bottom=-o,this.camera.updateProjectionMatrix(),this.camera.position.set(this.center.x,36,this.center.z+29),this.camera.lookAt(this.center.x,0,this.center.z-2),this.sun.position.set(this.center.x-18,35,this.center.z+20),this.sun.target.position.set(this.center.x,0,this.center.z),this.sun.target.updateMatrixWorld(),this.dog.position.set(e.x,qn(t,e.x,e.z),e.z),this.dog.rotation.y=e.heading??Math.PI/2,this.goalPointer.rotation.set(Math.PI/2,0,0),this.goalPointer.quaternion.premultiply(new Kn().setFromAxisAngle(new L(0,1,0),Math.atan2(t.target.x-e.x,t.target.z-e.z)-this.dog.rotation.y)),this.goalPointer.position.y=.04/.75,this.goalPointer.visible=!s;const u=this.dog.userData.parts,f=Math.floor(this.time*12)/12;To(this.dog,e,i),bu(this.dog,i),u.tail.rotation.z=Math.sin(f*7)*.3,this.thrusterGlow.update(this.dog,(m,p)=>qn(t,m,p)),t.animals.forEach((m,p)=>{const g=this.animalMeshes[p];g.scale.setScalar(Ts(m)),g.position.set(m.x,qn(t,m.x,m.z)+Math.sin(f*12+p)*Math.min(.07,Math.hypot(m.vx,m.vz)*.025),m.z),dd(g,m,i),Ed(g,m,t,i),g.rotation.z=Math.sin(f*9+p)*Math.min(.055,Math.hypot(m.vx,m.vz)*.02),g.updateMatrix()}),this.updateBarks(i);for(const m of this.helperMeshes.values())m.visible=!1;for(const m of t.helpers||[]){let p=this.helperMeshes.get(m.type);p||(p=m.type==="drone"?gy():uy(),m.type==="helper"&&p.scale.setScalar(this.dog.scale.x*(p.userData.suggestedScale??.82)),this.helperMeshes.set(m.type,p),this.actors.add(p)),p.visible=!0,p.position.set(m.x,m.type==="drone"?2+Math.sin(this.time*4)*.18:qn(t,m.x,m.z),m.z),m.type==="drone"?p.userData.parts.propellers.forEach(g=>g.rotation.y=this.time*35):(Number.isFinite(m.heading)&&(p.rotation.y=m.heading),To(p,{...m,heading:p.rotation.y},i),bu(p,i),p.userData.parts.tail.rotation.z=Math.sin(f*7)*.3,za(p,(this.barkEffects||[]).some(g=>g.buddy)))}const d=(t.helpers||[]).some(m=>m.type==="helper")?this.helperMeshes.get("helper"):null;this.thrusterGlow.update(this.dog,(m,p)=>qn(t,m,p),d),za(this.dog,(this.barkEffects||[]).some(m=>!m.buddy)),this.gateView?.update(),this.goal.material.opacity=.38+Math.sin(this.time*2)*.09,this.cutaway?.update(this.camera,[e,...t.animals,...(t.helpers||[]).filter(m=>m.type!=="drone")],i),this.nature.update(i,{dog:e,animals:t.animals,camera:this.camera,time:this.time,paused:i<=0});const x=this.nature.weather;this.waterEffects.update(i,{weather:x,movers:[{...e,id:"pip"},...t.animals.map(m=>({...m,id:`flock-${m.id}`})),...(t.helpers||[]).filter(m=>m.type!=="drone").map(m=>({...m,id:`helper-${m.type}`}))],paused:i<=0}),this.sun.intensity=2.05*x.daylight+x.lightningFlash,this.hemisphere.intensity=1.65*x.daylight+x.lightningFlash*.6,this.scene.background.copy(this.skyDay).lerp(this.skyStorm,x.cloudCoverage*.5),this.scene.fog.color.copy(this.scene.background);for(const m of this.particles)m.life-=i,m.mesh.position.addScaledVector(m.velocity,i),m.velocity.y-=i*6,m.mesh.rotation.x+=i*2,m.mesh.scale.setScalar(Math.max(0,m.life)),m.life<=0&&(this.actors.remove(m.mesh),m.mesh.geometry.dispose(),m.mesh.material.dispose());this.particles=this.particles.filter(m=>m.life>0),this.cullScenery(),this.updateAnimalBatches(t,f),this.renderer.render(this.scene,this.camera)}celebrate(t,e){for(let i=0;i<36;i++){const s=new ee(new Dn(.12,.12,.05),new nn({color:["#f0b65c","#f8e8ad","#e99585","#80b398"][i%4]}));s.userData.ownedGeometry=s.userData.ownedMaterial=!0,s.position.set(t,1.5,e),this.actors.add(s),this.particles.push({mesh:s,velocity:new L(Math.sin(i*2.4)*3,2+i%5,Math.cos(i*2.4)*3),life:1.8})}}bark(t){t||za(this.dog,!0);const e=t?{x:t.x,z:t.z}:{x:this.dog.position.x,z:this.dog.position.z},i=new ee(Su(this.level,e),new nn({color:"#fff6d8",side:Ce,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1}));for(i.renderOrder=1,i.userData.ownedGeometry=i.userData.ownedMaterial=!0,this.actors.add(i),this.barkEffects??=[],this.barkEffects.push({mesh:i,origin:e,age:0,buddy:!!t});this.barkEffects.length>4;){const s=this.barkEffects.shift();this.actors.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose()}}updateBarks(t){for(const e of this.barkEffects||[])if(!(t<=0)){if(e.age+=t,e.age>=.6){this.actors.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();continue}Su(this.level,e.origin,1+e.age/.6*6,e.mesh.geometry),e.mesh.material.opacity=.8*(1-e.age/.6)}this.barkEffects=(this.barkEffects||[]).filter(e=>e.age<.6)}drawMap(t,e,i){const s=t.getContext("2d"),r=t.width,o=t.height,a=e.bounds,c=Math.min(a.maxX-a.minX,120*(r-16)/(o-16)),l=Math.min(a.maxZ-a.minZ,120),h=c<a.maxX-a.minX||l<a.maxZ-a.minZ,u=(S,w,A,D)=>Math.max(w,Math.min(A-D,S-D/2)),f=u(i.x,a.minX,a.maxX,c),d=u(i.z,a.minZ,a.maxZ,l),x={minX:f,maxX:f+c,minZ:d,maxZ:d+l},m=S=>8+(S-x.minX)/(x.maxX-x.minX)*(r-16),p=S=>8+(S-x.minZ)/(x.maxZ-x.minZ)*(o-16),g=e.boundary?.length>4;s.fillStyle=g?"#172e25":"#29483a",s.fillRect(0,0,r,o),h&&(s.save(),s.beginPath(),s.rect(8,8,r-16,o-16),s.clip()),g&&(s.save(),s.beginPath(),e.boundary.forEach((S,w)=>w?s.lineTo(m(S.x),p(S.z)):s.moveTo(m(S.x),p(S.z))),s.closePath(),s.fillStyle="#29483a",s.fill(),s.clip());const v=(S,w,A)=>{s.lineWidth=w,s.strokeStyle=A,s.lineCap="round",s.lineJoin="round",s.beginPath(),S.forEach((D,y)=>y?s.lineTo(m(D.x),p(D.z)):s.moveTo(m(D.x),p(D.z))),s.stroke()},M=Math.min((r-16)/(x.maxX-x.minX),(o-16)/(x.maxZ-x.minZ));for(const S of e.rivers){v(S.points,S.width*M,"#35b9ed");for(const w of S.bridges){const A=Math.sin(w.heading)*w.length/2,D=Math.cos(w.heading)*w.length/2;v([{x:w.x-A,z:w.z-D},{x:w.x+A,z:w.z+D}],Math.max(3,w.width*M),"#dfbd8c")}}for(const S of e.roads)v(S.points,Math.max(1.5,S.width*M),"#f0c777");jv(s,e.target,S=>({x:m(S.x),y:p(S.z)}));for(const S of e.fenceSegments||[])v([S.a,S.b],S.material==="stone"?2:S.kind==="boundary"?1:1.5,S.material==="stone"?"#d5d9c9":"#c0a67b");for(const S of e.gates||[])if(S.operable&&!S.open){const w=nl(S);v([w.a,w.b],2.5,"#ffad45")}const _=(S,w,A,D,y="#183027")=>{s.fillStyle=D,s.strokeStyle=y,s.lineWidth=1.5,s.beginPath(),s.arc(m(S),p(w),A,0,Math.PI*2),s.fill(),s.stroke()};for(const S of e.animals)_(S.x,S.z,S.type==="cow"?3:2.3,S.saved?"#8be0b4":"#fff8e7");_(i.x,i.z,4.8,"#ffd166"),s.strokeStyle="#ffe6a3",s.lineWidth=2,s.beginPath(),s.arc(m(i.x),p(i.z),7,0,Math.PI*2),s.stroke();for(const S of e.helpers||[])_(S.x,S.z,3,"#45d9ef","#102c39");g&&s.restore(),h&&s.restore()}}class Sy{constructor(){this.context=null,this.master=null,this.music=null,this.effects=null,this.ambience=null,this.ambientSources=new Set,this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1,this.noiseBuffer=null,this.thunderSource=null,this.thunderEvent=null,this.weatherState=null,this.birdCountdown=4+Math.random()*6,this.muted=!1,this.paused=!1,this.timer=null,this.step=0,this.nextNoteTime=0,this.active=new Set,this.disposed=!1,this.activationGeneration=0,this.tempo=106}async start(){if(this.disposed)return!1;const t=++this.activationGeneration;try{if(!this.context){const i=globalThis.AudioContext||globalThis.webkitAudioContext;if(!i)return!1;this.context=new i,this.master=this.context.createGain(),this.music=this.context.createGain(),this.effects=this.context.createGain(),this.ambience=this.context.createGain(),this.master.gain.value=this.muted?0:.975,this.music.gain.value=.42,this.effects.gain.value=.6,this.ambience.gain.value=.38,this.music.connect(this.master),this.effects.connect(this.master),this.ambience.connect(this.master),this.master.connect(this.context.destination)}const e=this.context;return await e.resume(),this.disposed||t!==this.activationGeneration||this.context!==e?!1:(this.paused=!1,this.music.gain.cancelScheduledValues(this.context.currentTime),this.music.gain.setTargetAtTime(.42,this.context.currentTime,.025),this._begin(),!0)}catch{return!1}}setMuted(t){if(this.muted=!!t,this.muted&&this._stopAmbience(),!this.context||!this.master)return;const e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(this.muted?0:.975,e,.025)}pause(){this.activationGeneration++,this.paused=!0,this._stopScheduler(),this._stopAmbience(),this.context&&this.context.state!=="closed"&&this.music.gain.setTargetAtTime(1e-4,this.context.currentTime,.025)}async resume(){return this.start()}_begin(){this.timer||this.paused||this.disposed||(this.nextNoteTime=this.context.currentTime+.06,this._schedule(),this.timer=globalThis.setInterval(()=>this._schedule(),100))}_stopScheduler(){this.timer!==null&&globalThis.clearInterval(this.timer),this.timer=null}_schedule(){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;const t=60/this.tempo/2;if(!Number.isFinite(t)||t<=0)return;const e=this.context.currentTime;if(this.nextNoteTime<e){const i=Math.ceil((e-this.nextNoteTime)/t);this.step=(this.step+i)%128,this.nextNoteTime=Math.max(e,this.nextNoteTime+i*t)}for(let i=0;i<8&&this.nextNoteTime<e+.25;i++)this._musicStep(this.step,this.nextNoteTime,t),this.step=(this.step+1)%128,this.nextNoteTime+=t}_musicStep(t,e,i){const s=[48,53,48,55,57,53,55,48],r=[[72,76,79,null,76,74,72,null],[77,81,79,null,77,76,74,null],[72,76,79,81,79,null,76,null],[74,79,83,null,81,79,74,null],[76,81,84,null,83,81,79,null],[77,null,81,79,77,76,74,null],[74,77,79,null,83,81,79,74],[76,74,72,null,79,null,72,null]],o=Math.floor(t/16),a=t%16,c=s[o],l=o===4;if(a%4===0&&this._note(c+(a===8?7:0),e,.32,.15,"bass",this.music),a%4===2&&(this._note(c+12,e,.22,.048,"pluck",this.music),this._note(c+(l?15:16),e+.018,.22,.042,"pluck",this.music),this._note(c+19,e+.035,.22,.036,"pluck",this.music)),a%2===0){const h=r[o][a/2];h!==null&&this._note(h,e,i*1.5,.12,o%2?"flute":"marimba",this.music)}}updateAmbience(t,e={}){const i=e.weather||"sun",s=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed;if(this._updateThunder(typeof i=="object"?i:null,s),!s)return;const r=typeof i=="string"?i:i.type||"sun",o=typeof i=="object"&&Number.isFinite(i.intensity)?Math.max(0,Math.min(1,i.intensity)):.3,a=["rain","light-rain","heavy-rain","storm"].includes(r)?"rain":r==="wind"?"wind":"sun",c=typeof i=="object"?i.storm?"storm":i.kind||r:r,l=c==="storm"?1:c==="heavy-rain"?.85:.5;this._weather(a,o,l),this.birdCountdown-=Number.isFinite(t)?Math.max(0,Math.min(t,.25)):0,!(this.birdCountdown>0)&&(this.birdCountdown=a==="rain"?10+Math.random()*10:4+Math.random()*6,!(typeof i=="object"&&(i.storm||i.kind==="storm")||r==="storm"||a==="rain"&&o>=.7)&&this._chirp(a==="rain"?.018:.03))}_noise(){if(!this.noiseBuffer){const t=this.context;this.noiseBuffer=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const e=this.noiseBuffer.getChannelData(0);for(let i=0;i<e.length;i++)e[i]=Math.random()*2-1}return this.noiseBuffer}_updateThunder(t,e){t!==this.weatherState&&(this.thunderSource&&this._releaseAmbience(this.thunderSource),this.thunderSource=null,this.thunderEvent=null,this.weatherState=t,this._restoreMusicMix());const i=t?.lightningId;if(!i||i===this.thunderEvent)return;this.thunderEvent=i;const s=t.lightningAge,r=t.thunderDelay;if(!e||!Number.isFinite(s)||!Number.isFinite(r)||s<0||r<0||s>r+.2)return;this.thunderSource&&this._releaseAmbience(this.thunderSource);const o=this.context,a=o.createBufferSource(),c=o.createBiquadFilter(),l=o.createGain(),h=o.currentTime+Math.max(.01,r-s),u=3+Math.random()*2;a.buffer=this._noise(),a.loop=!0,c.type="lowpass",c.Q.value=.35,c.frequency.setValueAtTime(400,h),c.frequency.exponentialRampToValueAtTime(85,h+u*.65),l.gain.setValueAtTime(1e-4,h),l.gain.exponentialRampToValueAtTime(.65,h+.12),l.gain.exponentialRampToValueAtTime(.32,h+u*.23),l.gain.exponentialRampToValueAtTime(.035,h+u*.56),l.gain.exponentialRampToValueAtTime(1e-4,h+u*.76),a.connect(c),c.connect(l),l.connect(this.effects);const f=[];for(const[x,m]of[[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]){const p=o.createDelay(1.2),g=o.createGain();p.delayTime.value=u*x,g.gain.value=m,l.connect(p),p.connect(g),g.connect(this.effects),f.push(p,g)}this.music.gain.cancelScheduledValues(o.currentTime),this.music.gain.setValueAtTime(.42,o.currentTime),this.music.gain.setTargetAtTime(.16,h,.04),this.music.gain.setTargetAtTime(.42,h+u*.72,.35),this._trackAmbience(a,[c,l,...f]),this.thunderSource=a;const d=a.onended;a.onended=()=>{d(),this.thunderSource===a&&(this.thunderSource=null)},a.start(h),a.stop(h+u)}_chirp(t){const e=this.context.currentTime+.015,i=1600+Math.random()*1100,s=2+Math.floor(Math.random()*2);for(let r=0;r<s;r++){const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r*(.14+Math.random()*.035);o.type="sine",o.frequency.setValueAtTime(i*(1+r*.1),c),o.frequency.exponentialRampToValueAtTime(i*(r%2?.9:1.28),c+.07),o.frequency.exponentialRampToValueAtTime(i*.95,c+.13),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(t,c+.025),a.gain.exponentialRampToValueAtTime(1e-4,c+.15),o.connect(a),a.connect(this.ambience),this._trackAmbience(o,[a]),o.start(c),o.stop(c+.17)}}_trackAmbience(t,e){this.active.add(t),this.ambientSources.add(t),t.onended=()=>{t.disconnect();for(const i of e)i.disconnect();this.active.delete(t),this.ambientSources.delete(t)}}_weather(t,e,i=1){if(this.weatherKind!==t&&(this._stopWeather(),this.weatherKind=t,t!=="sun")){const s=this.context;this._noise();const r=s.createBufferSource(),o=s.createBiquadFilter(),a=s.createGain();r.buffer=this.noiseBuffer,r.loop=!0,o.type="lowpass",o.frequency.value=t==="rain"?2200:500,o.Q.value=.3,a.gain.value=1e-4,r.connect(o),o.connect(a),a.connect(this.ambience),this._trackAmbience(r,[o,a]),this.weatherSource={source:r,gain:a,filter:o},r.start()}if(this.weatherSource){const s=(t==="rain"?.032*i:.024)*e;Math.abs(s-this.weatherVolume)>.001&&(this.weatherSource.gain.gain.setTargetAtTime(s,this.context.currentTime,.8),this.weatherVolume=s)}}_stopWeather(){this.weatherSource&&this._releaseAmbience(this.weatherSource.source),this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1}_releaseAmbience(t){try{t.stop()}catch{}t.onended?.(),t.onended=null}_restoreMusicMix(){if(!this.context||!this.music||this.context.state==="closed")return;const t=this.context.currentTime;this.music.gain.cancelScheduledValues(t),this.music.gain.setTargetAtTime(this.paused?1e-4:.42,t,.025)}_stopAmbience(){this._restoreMusicMix(),this._stopWeather(),this.thunderSource=null;for(const t of[...this.ambientSources])this._releaseAmbience(t);this.birdCountdown=4+Math.random()*6}_note(t,e,i,s,r="marimba",o=this.effects){if(!this.context||!o||this.disposed)return;const a=this.context,c=a.createOscillator(),l=a.createGain(),h=440*2**((t-69)/12);c.type=r==="pluck"?"triangle":"sine",c.frequency.setValueAtTime(h,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(.001,s),e+(r==="flute"?.035:.009)),l.gain.exponentialRampToValueAtTime(1e-4,e+i),c.connect(l),l.connect(o),this.active.add(c),c.onended=()=>{c.disconnect(),l.disconnect(),this.active.delete(c)},c.start(e),c.stop(e+i+.03),r==="marimba"&&this._note(t+19,e,i*.35,s*.12,"partial",o)}play(t){if(!this.context||this.context.state!=="running"||this.muted||this.disposed)return;const e=this.context.currentTime+.01;if(t==="bark"){[0,.14].forEach(r=>{const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r;o.type="triangle",o.frequency.setValueAtTime(330,c),o.frequency.exponentialRampToValueAtTime(110,c+.095),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(.11,c+.012),a.gain.exponentialRampToValueAtTime(1e-4,c+.1),o.connect(a),a.connect(this.effects),this.active.add(o),o.onended=()=>{o.disconnect(),a.disconnect(),this.active.delete(o)},o.start(c),o.stop(c+.12)});return}const s={saved:[79,84],animal:[79,84],rescue:[79,84],purchase:[72,76,79,84],unlock:[72,76,79,84],completed:[72,76,79,84,79,84],complete:[72,76,79,84,79,84],win:[72,76,79,84,79,84],click:[79]}[t];s&&s.forEach((r,o)=>this._note(r,e+o*.115,.28,.16,"marimba"))}dispose(){if(!this.disposed){this.activationGeneration++,this.disposed=!0,this._stopScheduler(),this._stopAmbience();for(const t of this.active){try{t.stop()}catch{}t.disconnect()}this.active.clear(),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{}),this.context=null,this.master=this.music=this.effects=this.ambience=null,this.noiseBuffer=null}}}const yt=n=>document.getElementById(n);let sn,Yt,Di,oe=fv(),Vt="intro",Ii="playing",Ru=performance.now(),mn=0,Rl=0,vr=0,Tn=0,Bo=!1,Cl=0,yr=!1,Cu,Pl=null;const Ve=new Sy,zn={x:0,z:0},vn=new Set,ze=(n,t)=>yt(n).classList.toggle("hidden",!t);let Ao=!1;const ko=()=>{Ao||dv(oe)||Ro("Progress is kept for this session; browser storage is unavailable.")},Pu=n=>String(n).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Ro(n){yt("toast").textContent=n,ze("toast",!0),clearTimeout(Cu),Cu=setTimeout(()=>ze("toast",!1),2800)}function qi(){yt("points").textContent=oe.points,yt("sound").textContent=oe.music?"♫":"♪",yt("sound").setAttribute("aria-label",oe.music?"Mute sound":"Enable sound"),yt("sound").style.opacity=oe.music?"1":".55",yt("menu-sound")&&(yt("menu-sound").textContent=`Sound: ${oe.music?"On":"Off"}`,yt("menu-sound").setAttribute("aria-pressed",String(oe.music)))}async function Qf(){oe.music=!oe.music,Ve.setMuted(!oe.music),ko(),qi(),oe.music&&(await Ve.start(),(Vt!=="playing"||!oe.music)&&Ve.pause())}function zl(n){const t=n<vr;yt("bark").classList.toggle("cooldown",t),yt("bark").disabled=t,yt("bark").style.setProperty("--bark-progress",String(Math.max(0,Math.min(1,1-(vr-n)/2100))))}function td(n=!1,t=0){ze("countdown",n),yt("countdown").textContent=n?`${Math.ceil(t)}s`:"",yt("countdown").setAttribute("aria-label",n?`${Math.ceil(t)} seconds remaining to deliver the flock`:"Delivery countdown has not started"),yt("countdown").classList.toggle("running",n),yt("countdown").classList.toggle("urgent",n&&t<=10)}function Ls(){zn.x=zn.z=0,fi=null,vn.clear(),yt("stick").style.transform="translate(0,0)"}function Go(){const n=Math.max(0,Math.min(1,mn/3)),t=Math.max(0,Math.min(1,mn/.65,(3-mn)/1.2));yt("level-introduction").style.opacity=String(t),yt("level-introduction").style.setProperty("--level-scale",String(.72+.48*(1-(1-n)**2))),ze("level-introduction",Vt==="playing"&&mn<3)}async function Gi(n=oe.highestLevel){n=Math.max(0,Math.min(99,Math.floor(Number(n)||0))),Li(!1),Yt=Ou(n),Di={...Yt.dog,heading:Yt.dog.heading??Math.atan2(Yt.spawn.x-Yt.dog.x,Yt.spawn.z-Yt.dog.z)},mn=0,Tn=0,Bo=!1,Rl=vr=0,Ls(),sn.setLevel(Yt),Vt="playing",document.body.classList.toggle("in-game",!0),zl(performance.now());for(const t of["intro","scene-tag"])ze(t,!1);for(const t of["mission","controls","map-box"])ze(t,!0);yt("level-number").textContent=`Level ${n+1}`,Go(),yt("mission").setAttribute("aria-label",`Level ${n+1} · Livestock delivery status`),yt("total").textContent=Yt.animals.length,yt("saved").textContent=0,td(),yr=!1,ze("toggle-tip",!1),yt("toggle-tip").setAttribute("aria-expanded","false"),ze("tip",!0),Co(Dl(n)[0]),Ve.setMuted(!oe.music),await Ve.start(),(Vt!=="playing"||!oe.music)&&Ve.pause(),qi()}const wy=14;function Dl(n){return n===0?["Drag to move Pip.","Move behind the flock to guide it.","Double-tap to woof."]:[Yt.routes.length>1?"Choose a trail on the map.":"Gather stragglers before crossing."]}function Il(){Bo=!0,yr=!1,ze("tip",!1),ze("toggle-tip",!0),yt("toggle-tip").setAttribute("aria-expanded","false"),yt("toggle-tip").setAttribute("aria-label","Show tips")}function Co(n){Cl=mn,yt("tip-text").textContent=n,yt("tip").querySelector(".tip-number").textContent=`0${Tn+1}`}function Ho(){Vt!=="playing"||performance.now()<vr||(Rl=performance.now()+650,vr=performance.now()+2100,zl(performance.now()),Ve.play("bark"),sn.bark(),navigator.vibrate&&navigator.vibrate(20))}function Vo(n,t="paused"){Ii=Vt==="playing"?"playing":Vt==="complete"?"complete":"intro",Vt=t,Go(),Ls(),Ve.pause(),yt("modal").classList.contains("hidden")&&(Pl=document.activeElement),yt("modal-card").innerHTML=n,ze("modal",!0),ze("controls",!1),setTimeout(()=>yt("modal-card").querySelector("button")?.focus(),30)}function Li(n=!0){ze("modal",!1),n&&(Vt=Ii,ze("controls",Vt==="playing"),Vt==="playing"&&Ve.resume(),Pl?.focus()),Go(),Ls()}function Fs(){if(Vt==="reset-confirm"){yt("cancel-reset").onclick();return}if(Vt==="shop"){yt("shop-back").onclick();return}if(Vt==="paused"){Li();return}Vt!=="complete"&&(Vo(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${Vt==="intro"?"Hello, shepherd.":"Paws for a moment."}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${Vt==="intro"?"Back to the meadow":"Keep herding"} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${oe.points} bolts</button>${Vt==="playing"?'<button class="secondary" id="restart">Restart this meadow</button>':""}<button class="secondary" id="menu-sound" aria-pressed="${oe.music}">Sound: ${oe.music?"On":"Off"}</button><button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,oe.highestLevel+1)},(n,t)=>`<button class="${t===Yt.index?"current":""}" data-level="${t}" aria-label="Play level ${t+1}">${t+1}</button>`).join("")}</div>`),yt("close").onclick=()=>Li(),yt("resume").onclick=()=>Li(),yt("menu-sound").onclick=Qf,yt("upgrades-menu").onclick=Wo,yt("restart-game-menu").onclick=ed,yt("restart")&&(yt("restart").onclick=()=>Gi(Yt.index)),yt("modal-card").querySelectorAll("[data-level]").forEach(n=>n.onclick=()=>Gi(Number(n.dataset.level))))}function ed(){const n=Vt,t=Ii,e=()=>{Vt=n,Ii=t,n==="paused"?(Vt=t,Fs(),yt("restart-game-menu").focus()):(Li(!1),Pl?.focus())};Vo('<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>',"reset-confirm"),yt("close").onclick=e,yt("cancel-reset").onclick=e,yt("confirm-reset").onclick=async()=>{oe={...Mr(),music:oe.music},cr=0,tr=-1/0,Ei=null,ko(),qi(),await Gi(0),Vt==="playing"&&yt("pause").focus()}}function Wo(){const n=Vt==="complete"?"complete":Vt==="paused"||Vt==="shop"?Ii:Vt,t=Ao?Yt.index+1:void 0,e=Uf(oe.upgrades,Yt.index+1);Vo(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${oe.points} bolts</strong> to spend.</p><div class="upgrade-grid">${No.filter(s=>s.id!=="drone").map(s=>{const r=Jn(oe.upgrades,s.id),o=Jn(e,s.id),a=TM(oe,s.id,t),c=Ml(oe.upgrades,s.id),l=a.reason==="locked",h=l?`Next tier unlocks at level ${a.unlockLevel}`:c===null?"All tiers owned":s.tierDescriptions[r],u=r>o?`<small class="inactive-upgrade">${o?"Next owned tier activates":"Equipped"} from level ${s.unlockLevels[o]}</small>`:"";return`<article class="upgrade ${l?"locked":""}"><div class="upgrade-icon">${{speed:"ϟ",flock:"⌁",drone:"✥",helper:"♧",bark:"♪",cohesion:"❋"}[s.id]}</div><div><h3>${Pu(s.name)} <small style="font-size:9px;color:#839277">${r}/3</small></h3><p>${Pu(h)}</p>${u}</div><button data-buy="${s.id}" ${a.available?"":"disabled"}>${c===null?"Max tier":l?`Level ${a.unlockLevel}`:`${c} ✦`}</button></article>`}).join("")}</div><button class="primary" id="shop-back">${n==="complete"?"Back to your reward":"Back to the meadow"} <span>➜</span></button>`,"shop"),Ii=n;const i=()=>{n==="complete"?Ll(!1):Li()};yt("close").onclick=i,yt("shop-back").onclick=i,yt("modal-card").querySelectorAll("[data-buy]").forEach(s=>s.onclick=()=>{const r=AM(oe,s.dataset.buy,t);r.ok&&(Ve.play("purchase"),ko(),qi(),Wo(),Ii=n,Ro(`${r.upgrade.tierNames[r.level-1]} equipped!`))})}let cr=0;function Ll(n=!0){n&&(cr=uv(oe,Yt),ko(),qi(),Ve.play("completed"),sn.celebrate(Yt.target.x,Yt.target.z)),Vt="complete";const t=Yt.result?.saved??Yt.animals.filter(s=>s.saved).length,e=Yt.animals.length,i=Yt.result?.score??0;Vo(`<div class="complete-seal">✦</div><div class="eyebrow">${t===e?"A GOOD DAY’S HERDING":"DELIVERY TIME IS UP"}</div><h2>${t===e?"Everyone’s home.":t>0?"A flock brought home.":"Try this meadow again."}</h2><p>${t} / ${e} robots delivered.<br>Score ${i} / ${Yt.reward} · Best ${oe.bestScores[Yt.index]||0} / ${Yt.reward}<br>${Math.floor(mn/60)}m ${Math.floor(mn%60)}s in the countryside.</p><div class="reward">+${cr}<span style="font-size:20px"> ✦</span></div><p>${cr?"Bolts earned from your improved delivery score.":"No extra bolts this time. Deliver more robots to improve your best score."}${t>0&&t<e?" The next meadow is open.":""}</p><button class="primary" id="next">${t===0?"Try again":Yt.index>=99?"Return to the first meadow":"Next meadow"} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,"complete"),yt("next").onclick=()=>Gi(t===0?Yt.index:Yt.index>=99?0:Yt.index+1),yt("reward-shop").onclick=Wo,yt("replay").onclick=()=>Gi(Yt.index)}let fi=null,Jc={x:0,y:0},tr=-1/0,Ei=null,Ul=!1;function by(n){Vt!=="playing"||fi!==null||n.isPrimary===!1||n.target.closest("button,header,.map-box,.tip")||n.target!==yt("world")&&!n.target.closest("#joystick")||(n.preventDefault(),fi=n.pointerId,Jc={x:n.clientX,y:n.clientY},Ul=!1,n.target.setPointerCapture?.(fi))}function Ey(n){if(n.pointerId!==fi)return;const t=n.clientX-Jc.x,e=n.clientY-Jc.y,i=Math.hypot(t,e),s=42;Ul||=i>9,zn.x=t/Math.max(s,i),zn.z=e/Math.max(s,i),yt("stick").style.transform=`translate(${zn.x*s}px,${zn.z*s}px)`}function Nl(n){if(n.pointerId===fi){if(n.preventDefault(),n.type==="pointerup"&&!Ul){const t=performance.now();Ei&&Math.hypot(n.clientX-Ei.x,n.clientY-Ei.y)<42&&t-tr<330?(Ho(),tr=-1/0,Ei=null):(tr=t,Ei={x:n.clientX,y:n.clientY})}else tr=-1/0,Ei=null;fi=null,zn.x=zn.z=0,yt("stick").style.transform="translate(0,0)"}}document.addEventListener("pointerdown",by,{passive:!1});document.addEventListener("pointermove",Ey,{passive:!1});document.addEventListener("pointerup",Nl,{passive:!1});document.addEventListener("pointercancel",Nl,{passive:!1});document.addEventListener("lostpointercapture",Nl,{passive:!1});const Fl=n=>n===yt("world")||!!n.closest("#controls");document.addEventListener("touchstart",n=>{Vt==="playing"&&Fl(n.target)&&n.preventDefault()},{passive:!1});document.addEventListener("touchend",n=>{Vt==="playing"&&Fl(n.target)&&(n.preventDefault(),n.target.closest("#bark")&&Ho())},{passive:!1});document.addEventListener("gesturestart",n=>{Vt==="playing"&&n.preventDefault()},{passive:!1});document.addEventListener("gesturechange",n=>{Vt==="playing"&&n.preventDefault()},{passive:!1});document.addEventListener("dblclick",n=>{Vt==="playing"&&Fl(n.target)&&n.preventDefault()},{passive:!1});document.addEventListener("keydown",n=>{if(Vt==="playing"&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","w","a","s","d","W","A","S","D"].includes(n.key)&&!n.target.closest('input,textarea,[contenteditable="true"]')&&!(n.key===" "&&n.target.closest("button"))&&(n.preventDefault(),vn.add(n.key.toLowerCase()),n.key===" "&&Ho()),n.key==="Escape"&&(n.preventDefault(),Fs()),n.key==="Tab"&&!yt("modal").classList.contains("hidden")){const t=[...yt("modal-card").querySelectorAll("button:not([disabled])")],e=t[0],i=t.at(-1);n.shiftKey&&document.activeElement===e?(n.preventDefault(),i.focus()):!n.shiftKey&&document.activeElement===i&&(n.preventDefault(),e.focus())}});document.addEventListener("keyup",n=>vn.delete(n.key.toLowerCase()));window.addEventListener("blur",()=>{Ls(),fi=null,Vt==="playing"&&Fs()});document.addEventListener("visibilitychange",()=>{document.hidden&&Vt==="playing"&&Fs()});window.addEventListener("resize",()=>sn?.resize());yt("play").onclick=()=>Gi();yt("restart-game-main").onclick=ed;yt("bark").onclick=Ho;yt("pause").onclick=Fs;yt("home").onclick=n=>{n.preventDefault(),Fs()};yt("wallet").onclick=Wo;yt("sound").onclick=Qf;yt("dismiss-tip").onclick=Il;yt("toggle-tip").onclick=()=>{if(Vt==="playing"){if(!yt("tip").classList.contains("hidden")){Il();return}Bo=!1,yr=!0,Tn=0,Cl=mn,Co(Dl(Yt.index)[0]),ze("tip",!0),yt("toggle-tip").setAttribute("aria-expanded","true"),yt("toggle-tip").setAttribute("aria-label","Hide tips")}};let Za=0,nd;function id(n){requestAnimationFrame(id);const t=Math.min((n-Ru)/1e3,.05);if(Ru=n,!sn||!Yt)return;if(Vt==="playing"){mn+=t;const i=vn.has("arrowright")||vn.has("d")?1:vn.has("arrowleft")||vn.has("a")?-1:zn.x,s=vn.has("arrowdown")||vn.has("s")?1:vn.has("arrowup")||vn.has("w")?-1:zn.z,r=lv(Yt,Di,{x:i,z:s,bark:n<Rl},t,oe.upgrades);yt("saved").textContent=r.saved,td(r.countdownStarted,r.remaining);for(const o of r.events)o.type==="animalSaved"?Ve.play("saved"):o.type==="buddyBark"?(Ve.play("bark"),sn.bark(o)):o.type==="gateToggled"?Ro(o.open?"Gate open — guide the flock through.":"Gate closed."):o.type==="gateBlocked"&&Ro("Gate is occupied — let everyone clear it first.");if(zl(n),!Bo){const o=yr||Yt.index!==0||Tn>0?wy:5;if(mn-Cl>=o){const a=Dl(Yt.index);yr?(Tn=(Tn+1)%a.length,Co(a[Tn])):Tn+1<a.length?(Tn++,Co(a[Tn])):Il()}}r.justCompleted&&Ll()}else Vt==="complete"&&!document.hidden&&cv(Yt,t);Go(),sn.update(Yt,Di,!document.hidden&&(Vt==="playing"||Vt==="intro"||Vt==="complete")?t:0,Vt==="intro"),nd?.();const e=sn.nature?.weather||Yt.weather;if(e){const[i,s]={sun:["☀","Clear skies"],wind:["↝","Breezy"],rain:["☂","Light rain"],"heavy-rain":["☂","Heavy rain"],storm:["ϟ","Thunderstorm"]}[e.kind||e.type||e]||["☀","Clear skies"];yt("weather-status").textContent=i,yt("weather-status").setAttribute("title",s),yt("weather-status").setAttribute("aria-label",s)}Vt==="playing"&&Ve.updateAmbience?.(t,{weather:sn.nature?.weather||Yt.weather||"sun",level:Yt.index+1,time:Yt.time,dog:Di,animals:Yt.animals}),Za+=t,Za>.1&&(Za=0,sn.drawMap(yt("map"),Yt,Di))}try{sn=new yy(yt("world")),Yt=Ou(0),Di={...Yt.dog,heading:Math.PI/2},sn.setLevel(Yt),qi(),ze("loading",!1),requestAnimationFrame(id)}catch(n){ze("loading",!1),ze("error",!0),yt("error-message").textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${n.message}`,console.error(n)}fd(async()=>{const{installQA:n}=await import("./qa-Dca3HaRw.js");return{installQA:n}},__vite__mapDeps([0,1]),import.meta.url).then(({installQA:n})=>{const t=()=>{Vt="qa",Ls(),Ve.pause(),Li(!1),ze("controls",!1)},e=async s=>{const r=Gi(s);t(),await r,t()},i=n({getRenderer:()=>sn,getMode:()=>Vt,getState:()=>({level:Yt,dog:Di,profile:oe,elapsed:mn}),enterSession:async()=>{Ao||(Ao=!0,oe=Mr(),await e(0))},pause:t,isPaused:()=>Vt==="qa",resume:()=>{if(Yt.completed){Ll(!1);return}Vt="playing",Ls(),ze("controls",!0),Ve.resume()},jump:e,resetSession:async()=>{oe=Mr(),cr=0,await e(0)},canOccupy:le,updateWallet:qi});nd=()=>i.update()});export{Ae as a};
