const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qa-Cbc0RiwU.js","./qa-DWlVkWAo.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const nd="modulepreload",id=function(i,t){return new URL(i,t).href},Ol={},sd=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(h=>{if(h=id(h,n),h in Ol)return;Ol[h]=!0;const u=h.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(n)for(let g=o.length-1;g>=0;g--){const x=o[g];if(x.href===h&&(!u||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":nd,u||(f.as="script"),f.crossOrigin="",f.href=h,c&&f.setAttribute("nonce",c),document.head.appendChild(f),u)return new Promise((g,x)=>{f.addEventListener("load",g),f.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},Va=Object.freeze([1,13/12,7/6,1.25]);function ws(i){return i?.type!=="cow"||!Number.isFinite(i.scale)?1:Va.reduce((t,e)=>Math.abs(e-i.scale)<Math.abs(t-i.scale)?e:t,1)}const Ne=i=>i?.type==="cow"?.78*ws(i):.55,Ha=(i,t,e)=>Math.max(t,Math.min(e,i)),ye=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Hc=(i,t)=>{const e=Math.hypot(i,t);return e>1e-8?{x:i/e,z:t/e}:{x:0,z:0}};function Bl(i){let t=i>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function Wc(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Ha(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return{x:t.x+n*r,z:t.z+s*r,t:r}}function on(i,t,e){return ye(i,Wc(i,t,e))}const bn=i=>({x:Math.sin(i),z:Math.cos(i)});function Xc(i,t){const e=bn(i.heading),n=t.x-i.x,s=t.z-i.z;return{forward:n*e.x+s*e.z,lateral:n*e.z-s*e.x}}function zi(i,t,e){const n=bn(i.heading);return{x:i.x+n.x*t+n.z*e,z:i.z+n.z*t-n.x*e}}function pn(i){const t=i.radius+1.4,e=t,n=bn(i.heading),s={x:n.z,z:-n.x};return{x:i.x,z:i.z,heading:i.heading,halfLength:t,halfWidth:e,openingWidth:7,forward:n,side:s,corners:[[-t,-e],[t,-e],[t,e],[-t,e]].map(([r,o])=>zi(i,r,o)),entrance:zi(i,-t,0)}}function vr(i,t,e=0){const n=pn(i),s=Xc(i,t),r=Math.max(0,e);return Math.abs(s.forward)<=n.halfLength-r&&Math.abs(s.lateral)<=n.halfWidth-r}function qc(i,t,e){const n=bn(i.heading),s=t.x-i.x,r=t.z-i.z;return Math.abs(s*n.x+r*n.z)<=i.length/2+e&&Math.abs(s*n.z-r*n.x)<=i.width/2-e}const kl=new WeakMap;function wu(i){let t=kl.get(i);if(t)return t;const e=bn(i.heading),n={x:e.z,z:-e.x},s=(c,l)=>({x:i.x+e.x*c+n.x*l,z:i.z+e.z*c+n.z*l}),r=[-1,1].map(c=>({a:s(-i.length/2-.1,c*i.width/2),b:s(i.length/2+.1,c*i.width/2),radius:.05,posts:Array.from({length:4},(l,h)=>s(-i.length/2+h*i.length/3,c*i.width/2))})),o=r.flatMap(c=>[c.a,c.b]),a={minX:Math.min(...o.map(c=>c.x)),maxX:Math.max(...o.map(c=>c.x)),minZ:Math.min(...o.map(c=>c.z)),maxZ:Math.max(...o.map(c=>c.z))};return t={rails:r,bounds:a},kl.set(i,t),t}function rd(i,t,e){const{rails:n,bounds:s}=wu(i),r=e+.065;return t.x<s.minX-r||t.x>s.maxX+r||t.z<s.minZ-r||t.z>s.maxZ+r?!1:n.some(o=>on(t,o.a,o.b)<e+o.radius||o.posts.some(a=>ye(t,a)<e+.065))}function bu(i,t,e,n){const{rails:s,bounds:r}=wu(i),o=n+.065;return Math.max(t.x,e.x)<r.minX-o||Math.min(t.x,e.x)>r.maxX+o||Math.max(t.z,e.z)<r.minZ-o||Math.min(t.z,e.z)>r.maxZ+o?!1:s.some(a=>Tu(t,e,a.a,a.b,n+a.radius)||a.posts.some(c=>on(c,t,e)<n+.065))}function od(i,t,e=4){const n=i.points,s=n[0],r=n.at(-1),o=Math.abs(r.x-s.x)>Math.abs(r.z-s.z)?"x":"z",a=n[1][o]-s[o],c=Math.floor((t[o]-s[o])/a),l=Math.ceil(e/Math.abs(a))+2,h=[];for(let u=Math.max(0,c-l);u<Math.min(n.length-1,c+l+1);u++)h.push([n[u],n[u+1]]);return h}const Gl=new WeakMap;function Eu(i){let t=Gl.get(i);return t||(t={minX:Math.min(...i.points.map(e=>e.x)),maxX:Math.max(...i.points.map(e=>e.x)),minZ:Math.min(...i.points.map(e=>e.z)),maxZ:Math.max(...i.points.map(e=>e.z))},Gl.set(i,t)),t}function Yc(i,t,e){const n=Eu(i),s=i.width/2+e;return t.x<n.minX-s||t.x>n.maxX+s||t.z<n.minZ-s||t.z>n.maxZ+s?!1:od(i,t,s).some(([r,o])=>on(t,r,o)<s)}function ad(i,t,e,n){const s=Eu(i),r=i.width/2+n;return Math.max(t.x,e.x)>=s.minX-r&&Math.min(t.x,e.x)<=s.maxX+r&&Math.max(t.z,e.z)>=s.minZ-r&&Math.min(t.z,e.z)<=s.maxZ+r}function Tu(i,t,e,n,s){if(Math.max(i.x,t.x)<Math.min(e.x,n.x)-s||Math.min(i.x,t.x)>Math.max(e.x,n.x)+s||Math.max(i.z,t.z)<Math.min(e.z,n.z)-s||Math.min(i.z,t.z)>Math.max(e.z,n.z)+s)return!1;const r=(h,u,d)=>(u.x-h.x)*(d.z-h.z)-(u.z-h.z)*(d.x-h.x),o=r(i,t,e),a=r(i,t,n),c=r(e,n,i),l=r(e,n,t);return o*a<0&&c*l<0?!0:Math.min(on(i,e,n),on(t,e,n),on(e,i,t),on(n,i,t))<s}function Zc(i){const t=bn(i.heading),e=i.width/2;return{a:{x:i.x-t.z*e,z:i.z+t.x*e},b:{x:i.x+t.z*e,z:i.z-t.x*e},kind:"gate",material:i.material||"wood"}}const Au=i=>i.material==="stone"?.3:.18;function Ru(i){return[...i.fenceSegments||[],...(i.gates||[]).filter(t=>t.operable&&!t.open).map(Zc)]}function ae(i,t,e,n=.55){const s={x:t,z:e},r=i.bounds;if(t<r.minX+n+.18||t>r.maxX-n-.18||e<r.minZ+n+.18||e>r.maxZ-n-.18)return!1;for(const o of Ru(i))if(on(s,o.a,o.b)<n+Au(o))return!1;for(const o of i.rivers||[])if(o.bridges.some(c=>rd(c,s,n))||Yc(o,s,n)&&!o.bridges.some(c=>qc(c,s,n)))return!1;for(const o of i.obstacles||[])if(ye(s,o)<n+o.radius)return!1;return!0}function Qs(i,t,e,n,s=.55){const r=Math.max(1,Math.ceil(Math.hypot(e,n)/.25)),o=e/r,a=n/r;let c=!1,l=!1;for(let h=0;h<r;h++)ae(i,t.x+o,t.z+a,s)?(t.x+=o,t.z+=a):(ae(i,t.x+o,t.z,s)?t.x+=o:Math.abs(o)>1e-8&&(c=!0),ae(i,t.x,t.z+a,s)?t.z+=a:Math.abs(a)>1e-8&&(l=!0));return{blockedX:c,blockedZ:l}}function Cu(i,t,e,n,s,r=!1){const o=i.bounds;for(const a of[t,e])if(a.x<o.minX+n+.18||a.x>o.maxX-n-.18||a.z<o.minZ+n+.18||a.z>o.maxZ-n-.18)return!1;for(const a of Ru(i))if(!(r&&a.kind!=="gate"&&a.material!=="stone"&&(a.kind!=="target"||i.target?.type!=="barn"))&&Tu(t,e,a.a,a.b,n+Au(a)))return!1;for(const a of i.obstacles||[]){const c=n+a.radius;if(!(a.x<Math.min(t.x,e.x)-c||a.x>Math.max(t.x,e.x)+c||a.z<Math.min(t.z,e.z)-c||a.z>Math.max(t.z,e.z)+c)&&on(a,t,e)<c)return!1}for(const a of i.rivers||[]){if(s&&a.bridges.some(l=>bu(l,t,e,n)))return!1;if(!ad(a,t,e,n))continue;const c=Math.max(1,Math.ceil(ye(t,e)/.45));for(let l=0;l<=c;l++){const h={x:t.x+(e.x-t.x)*l/c,z:t.z+(e.z-t.z)*l/c};if(Yc(a,h,n)&&!a.bridges.some(u=>qc(u,h,n)))return!1}}return!0}function oe(i,t,e,n=.55){return Cu(i,t,e,n,!0)}function cd(i,t,e){return Cu(i,t,e,.15,!1,!0)}function qn(i,t,e){for(const n of i?.rivers||[])for(const s of n.bridges)if(qc(s,{x:t,z:e},0)){const r=bn(s.heading),o=(t-s.x)*r.x+(e-s.z)*r.z;return .18+.12*Math.sin(Math.PI*(o/s.length+.5))}return 0}function ld(i){const t={x:i.minX,z:i.minZ},e={x:i.maxX,z:i.minZ},n={x:i.maxX,z:i.maxZ},s={x:i.minX,z:i.maxZ};return[[t,e],[e,n],[n,s],[s,t]].map(([r,o])=>({a:r,b:o,kind:"boundary"}))}function hd(i,t,e){const n=[i[0]];for(let s=1;s<i.length;s++){const r=i[s-1],o=i[s],a=ye(r,o),c=Math.max(1,Math.ceil(a/1.2)),l=Hc(o.x-r.x,o.z-r.z),h=t()*Math.PI*2,u=r.kind==="bridge"||o.kind==="bridge"||r.kind==="gate"||o.kind==="gate"||o.kind==="target"?0:Math.min(1.8,a*.045),d=[];for(let g=1;g<=c;g++){const x=g/c,m=Math.sin(Math.PI*x)*Math.sin(Math.PI*2*x+h)*u;d.push({x:r.x+(o.x-r.x)*x-l.z*m,z:r.z+(o.z-r.z)*x+l.x*m,...g===c&&o.kind?{kind:o.kind}:{}})}const f=!e||d.every((g,x)=>oe(e,x?d[x-1]:r,g,.85));for(let g=1;g<=c;g++){const x=g/c;n.push(f?d[g-1]:{x:r.x+(o.x-r.x)*x,z:r.z+(o.z-r.z)*x,...g===c&&o.kind?{kind:o.kind}:{}})}}return n}function Pu(i=0,t=i*7919+42){i=Ha(Math.floor(Number(i)||0),0,99),t=Number(t)>>>0;const e=Bl(t^1129273171),n=Bl(t),s=i<5,r=Math.min(5+i*3,65),o=i===1?9.4:s?4.1:4.8,a=s?15+i*3:48+i*3,c=s?-32:-40,l=a+15,h=s?24:84+Math.floor(i/15)*14,d=(s?i===0?0:t%2*2:t%4)*Math.PI/2,f=tt=>({x:Number((tt.x*Math.cos(d)-tt.z*Math.sin(d)).toFixed(6)),z:Number((tt.x*Math.sin(d)+tt.z*Math.cos(d)).toFixed(6)),...tt.kind?{kind:tt.kind}:{}}),g=Math.PI/2-d,x=[{x:c,z:-h},{x:l,z:h},{x:c,z:h},{x:l,z:-h}].map(f),m={minX:Math.min(...x.map(tt=>tt.x)),maxX:Math.max(...x.map(tt=>tt.x)),minZ:Math.min(...x.map(tt=>tt.z)),maxZ:Math.max(...x.map(tt=>tt.z))};s||(m.minZ=Math.min(m.minZ,-h),m.maxZ=Math.max(m.maxZ,h));const p={...f({x:a,z:0}),radius:4.7+Math.sqrt(r)*.2,type:i%3===2?"barn":i%3===1?"field":"pen",heading:g},M=f({x:s?-20:-26,z:0}),v=f({x:s?-26:-33,z:0}),_=s?1:i<15?i%2===1?2:1:i%3===0?3:2,b=s?a-21:a-32,A=i===0?[]:s?[i===1?-10:-12]:i>=15?[b-48,b-23]:[b-23],P=A.map(tt=>{const B=n()*Math.PI*2;return{width:s?3.1:3.7+Math.min(i*.025,1.8),at:W=>tt+Math.sin(W/21+B)*2.4+Math.sin(W/8+B)*.65}}),F=P.map(tt=>({width:tt.width,points:Array.from({length:Math.ceil((h*2+64)/2)+1},(B,W)=>{const nt=-h-32+W*2;return{x:tt.at(nt),z:nt}}),bridges:[]})),S=[],E=[],L=n()>.5?1:-1;for(let tt=0;tt<_;tt++){const B=_===1?0:(tt-(_-1)/2)*(s?12:32),W=[{x:M.x*Math.cos(d)+M.z*Math.sin(d),z:0}];if(i===0)W.push({x:-8,z:2.8},{x:2,z:-2.2},{x:a-p.radius-3,z:0},{x:a,z:0,kind:"target"});else{if(P.forEach((ot,it)=>{const Tt=s?i===1?0:L*5:B+L*(it%2?-1:1)*(14+n()*5),Gt=F[it].points,z=Ha(Math.floor((Tt-Gt[0].z)/2),0,Gt.length-2),jt=Gt[z],Lt=Gt[z+1],Dt=(Tt-jt.z)/(Lt.z-jt.z),wt=jt.x+(Lt.x-jt.x)*Dt,Qt=Hc(Lt.z-jt.z,jt.x-Lt.x),St={x:wt,z:Tt,width:o*1.25,length:ot.width+1.5,heading:Math.atan2(Qt.x,Qt.z)-d};F[it].bridges.push(St);const Ft=ot.width/2+2.5+(s?3:6),ge=s?Ft:(wt-A[it]+Ft)/Qt.x,de=s?Ft:(A[it]+Ft-wt)/Qt.x,C={x:wt-Qt.x*ge,z:Tt-Qt.z*ge},y={x:wt+Qt.x*de,z:Tt+Qt.z*de};W.push({x:C.x-4,z:C.z-L*(s?3:8)},C,{x:wt,z:Tt,kind:"bridge"},y)}),i>=2){const ot=s?L*-4:B-L*(13+n()*4),it={x:b,z:ot,width:s?8:10,heading:g};S.push(it),W.push({x:b-5,z:ot},{x:b,z:ot,kind:"gate"},{x:b+5,z:ot})}const nt=a-p.radius-4;W.push({x:nt-7,z:s?L*3:B*.3},{x:nt,z:0},{x:a,z:0,kind:"target"})}E.push(W)}const G=F.map(tt=>({width:tt.width,points:tt.points.map(f),bridges:tt.bridges.map(B=>({...B,...f(B)}))})),k=i>=7&&i%4===3,q=S.map((tt,B)=>({...tt,...f(tt),id:`gate-${B}`,operable:i>=19,open:i<19,material:k?"stone":"wood"})),R=ld(m);if(q.length){const tt=[...S].sort((W,nt)=>W.z-nt.z);let B=-h;for(const W of tt)R.push({a:f({x:b,z:B}),b:f({x:b,z:W.z-W.width/2}),kind:"interior"}),B=W.z+W.width/2;R.push({a:f({x:b,z:B}),b:f({x:b,z:h}),kind:"interior"})}const w=pn(p),U=w.halfLength,D=w.halfWidth,Z=w.openingWidth/2,J=[[[-U,-D],[U,-D]],[[U,-D],[U,D]],[[U,D],[-U,D]],[[-U,D],[-U,Z]],[[-U,-Z],[-U,-D]]];for(const[tt,B]of J)R.push({a:zi(p,...tt),b:zi(p,...B),kind:"target"});for(const tt of R)tt.material=k&&tt.kind!=="target"?"stone":"wood";const N={bounds:m,rivers:G,fenceSegments:R,obstacles:[]},Q=E.map((tt,B)=>{const W=hd(tt.map(f),n,N);return{id:`route-${B}`,points:W,length:W.slice(1).reduce((nt,ot,it)=>nt+ye(ot,W[it]),0)}}),Mt=Q.map(tt=>({routeId:tt.id,points:tt.points,width:o})),xt={index:i,seed:t,title:["First day on the farm","Over the babbling brook","Through the garden gate","A mixed-up meadow","The long way home"][i]||`Pasture patrol ${i+1}`,description:i===0?"Move behind the sheep and gently guide all five into the sunny pen.":`Bring ${r} robots to the ${p.type}. ${_>1?"Choose a crossing and lead your flock through the meadow.":"Follow the winding trail and use the crossings."}`,bounds:m,spawn:M,dog:v,target:p,animals:[],rivers:G,gates:q,fences:[],fenceSegments:R,obstacles:[],routes:Q,roads:Mt,reward:80+i*25,sceneryHills:[]};for(let tt=0;tt<r;tt++){const B=f({x:(s?-20:-26)+Math.floor(tt/7)*1.65+(n()-.5)*.2,z:(tt%7-3)*1.65+(n()-.5)*.2}),W=i>=3&&tt%4===0?"cow":"sheep";xt.animals.push({id:tt,type:W,...W==="cow"?{scale:Va[Math.floor(e()*Va.length)]}:{},...B,vx:0,vz:0,saved:!1})}if(xt.animals.some(tt=>!ae(xt,tt.x,tt.z,Ne(tt)))){const tt=bn(g),B=xt.animals.map(W=>({x:W.x,z:W.z}));for(let W=1;W<=7;W++){const nt=W*.5,ot=B.map(it=>({x:it.x-tt.x*nt,z:it.z-tt.z*nt}));if(ot.every((it,Tt)=>ae(xt,it.x,it.z,Ne(xt.animals[Tt])))){ot.forEach((it,Tt)=>Object.assign(xt.animals[Tt],it));break}}}for(const tt of xt.animals){if(tt.type!=="cow")continue;const B=Ne(tt),W={x:tt.x,z:tt.z},nt=it=>ae(xt,it.x,it.z,B)&&xt.animals.every(Tt=>Tt===tt||ye(it,Tt)>=B+Ne(Tt)+.01);if(nt(W))continue;let ot=!1;for(let it=1;it<=40&&!ot;it++)for(let Tt=0;Tt<24;Tt++){const Gt=Tt*Math.PI/12,z={x:W.x+Math.cos(Gt)*it*.1,z:W.z+Math.sin(Gt)*it*.1};if(nt(z)){Object.assign(tt,z),ot=!0;break}}}for(let tt=0;tt<Math.min(10+i*2,130);tt++){const B=f({x:c+5+n()*(l-c-10),z:-h+5+n()*(h*2-10)}),W=.7+n()*.7;ye(B,M)<14||ye(B,p)<p.radius+10||!ae(xt,B.x,B.z,W+1)||Q.some(nt=>nt.points.slice(1).some((ot,it)=>on(B,nt.points[it],ot)<7+W))||xt.obstacles.push({...B,radius:W})}for(let tt=0;tt<14;tt++){const B=7+n()*8,W=3+n()*5,nt=tt%4,ot=nt===0?{x:m.minX-B-3,z:m.minZ+n()*(m.maxZ-m.minZ)}:nt===1?{x:m.maxX+B+3,z:m.minZ+n()*(m.maxZ-m.minZ)}:nt===2?{x:m.minX+n()*(m.maxX-m.minX),z:m.minZ-B-3}:{x:m.minX+n()*(m.maxX-m.minX),z:m.maxZ+B+3};xt.sceneryHills.push({...ot,radius:B,height:W})}return xt}function Vl(i,t,e){let n=null;for(const s of i.routes||[]){if(e&&s.id!==e)continue;let r=0;for(let o=1;o<s.points.length;o++){const a=s.points[o-1],c=s.points[o],l=Wc(t,a,c),h=ye(t,l),u=ye(a,c);(!n||h<n.distance)&&(n={route:s,routeId:s.id,index:o-1,point:l,distance:h,progress:r+u*l.t,length:s.length}),r+=u}}return n}function Du(i,t){const e=i.target,n=pn(e).halfLength,{forward:s,lateral:r}=Xc(e,t),o=(a,c)=>zi(e,a,c);return s>n+.4?o(n+2,Math.sign(r||1)*(n+2)):Math.abs(r)>n-.4&&s>-n-.8?o(-n-2,Math.sign(r||1)*(n+2)):s<-n+.7?o(-n+2,0):e}function ud(i,t,e,n){if(oe(i,t,e,n))return e;const s=Vl(i,t),r=Vl(i,e,s?.routeId);if(!s||!r)return e;const o=r.progress>=s.progress,a=s.route.points;if(s.distance>3&&oe(i,t,s.point,n))return s.point;const c=o?Math.min(a.length-1,s.index+5):Math.max(0,s.index-4);for(let l=c;o?l>s.index:l<=s.index;l+=o?-1:1)if(oe(i,t,a[l],n))return a[l];return s.point}function $c(i,t,e,n=.62){if(oe(i,t,e,n))return e;const s=ud(i,t,e,n),r=(i.rivers||[]).flatMap(g=>g.bridges).filter(g=>ye(t,g)<g.length+g.width+8||bu(g,t,e,n)).sort((g,x)=>Math.min(ye(t,g),ye(e,g))-Math.min(ye(t,x),ye(e,x))).slice(0,2),o=i.target,a=o&&pn(o),c=a&&(ye(t,o)<a.halfLength*2+6||ye(e,o)<a.halfLength*2+6);if(!r.length&&!c)return s;const l=[t,e,s];for(const g of r){const x=bn(g.heading),m=g.length/2+n+.4,p=g.width/2+n+.4;for(const[M,v]of[[-m,-p],[-m,p],[m,-p],[m,p],[-m,0],[m,0],[0,0]])l.push({x:g.x+x.x*M+x.z*v,z:g.z+x.z*M-x.x*v})}if(c){const g=a.halfLength+n+.5;for(const[x,m]of[[-g,-g],[-g,g],[g,-g],[g,g],[-g,0],[-a.halfLength+n+.5,0]])l.push(zi(o,x,m))}const h=l.map(()=>1/0),u=[],d=new Set;h[0]=0;for(let g=0;g<l.length;g++){let x=-1;for(let m=0;m<l.length;m++)!d.has(m)&&(x<0||h[m]<h[x])&&(x=m);if(x<0||!Number.isFinite(h[x]))break;d.add(x);for(let m=1;m<l.length;m++){if(d.has(m)||!oe(i,l[x],l[m],n))continue;const p=h[x]+ye(l[x],l[m]);p<h[m]&&(h[m]=p,u[m]=x)}}let f=Number.isFinite(h[1])?1:Number.isFinite(h[2])?2:-1;if(f<0)return s;for(;u[f]!==0&&u[f]!==void 0;)f=u[f];return l[f]}function fd(i,t,e,n,s=.78){const r=Math.hypot(e,n);if(r<.01)return{x:0,z:0};const o={x:t.x+e/r*2,z:t.z+n/r*2};if(oe(i,t,o,s))return{x:0,z:0};let a=null,c=1/0;for(const g of i.rivers||[])if(Yc(g,t,3))for(const x of g.bridges){const m=ye(t,x);m<c&&(c=m,a=x)}const l=i.target,h=pn(l),u={...h.entrance,width:h.openingWidth,heading:l.heading,enclosure:!0};for(const g of[...(i.gates||[]).filter(x=>!x.operable||x.open),u]){const x=bn(g.heading),m=t.x-g.x,p=t.z-g.z;Math.abs(m*x.x+p*x.z)<3&&ye(t,g)<c&&(c=ye(t,g),a=g)}if((i.fenceSegments||[]).some(g=>g.kind==="target"&&on(t,g.a,g.b)<s+2)&&(a=u),!a)return{x:0,z:0};if(a.length||a.enclosure){const g=$c(i,t,a,s),x=Hc(g.x-t.x,g.z-t.z);return{x:x.x*Math.min(2.4,r*.8+.5),z:x.z*Math.min(2.4,r*.8+.5)}}const d=bn(a.heading),f=(a.x-t.x)*d.z-(a.z-t.z)*d.x;return Math.abs(f)<a.width/2-1?{x:0,z:0}:{x:d.z*Math.sign(f)*Math.min(2.4,r*.8+.5),z:-d.x*Math.sign(f)*Math.min(2.4,r*.8+.5)}}const dd=3.2;function Iu(i,t){return!i||!t?null:(i.gates||[]).filter(e=>e.operable&&!e.open).map(e=>{const n=Zc(e),s=Wc(t,n.a,n.b),r=ye(t,s);if(r>dd||r<.001||!ae(i,t.x,t.z,.62))return null;const o=.62+(e.material==="stone"?.3:.18)+.08,a={x:s.x+(t.x-s.x)/r*o,z:s.z+(t.z-s.z)/r*o};return oe(i,t,a,.62)?{gate:e,d:r}:null}).filter(Boolean).sort((e,n)=>e.d-n.d||e.gate.id.localeCompare(n.gate.id))[0]?.gate||null}function pd(i,t,e){const n=Iu(i,t);return!n||n.id!==e?!1:(n.open=!0,i.geometryRevision=(i.geometryRevision||0)+1,i.flockVisibility?.clear(),!0)}function md({document:i,getState:t,onOpen:e=()=>{}}){const n=i.createElement("button");n.id="open-gate",n.type="button",n.className="gate-action hidden",n.textContent="Open gate",n.setAttribute("aria-label","Open nearby gate"),i.getElementById("controls").appendChild(n);let s=null;const r=()=>{const{level:a,dog:c,playing:l}=t();return s=l?Iu(a,c):null,n.classList.toggle("hidden",!s),n.disabled=!s,s},o=()=>{const{level:a,dog:c,playing:l}=t();return!l||!s||!pd(a,c,s.id)?!1:(e(s),r(),!0)};return n.onclick=o,n.addEventListener("touchend",a=>{a.preventDefault(),a.stopPropagation(),o()},{passive:!1}),{button:n,update:r,activate:o}}function gd(i,t,e){if(!(e>0)||!Number.isFinite(e))return;const n=t.heading??Math.PI/2,s=Math.atan2(Math.sin(n-i.rotation.y),Math.cos(n-i.rotation.y)),r=t.type==="cow"?Math.PI/1.5:Math.PI,o=Math.max(-r*e,Math.min(r*e,s));i.rotation.y+=o,i.userData.turnSpeed=Math.abs(o)/e}function xd(i,t=0){return Math.max(Math.hypot(i.vx,i.vz),Math.min(2,t))}const Hl=new WeakMap,Xi=8;function _d(i,t){const e=i.roads||[];let n=Hl.get(i);if(!n||n.roads!==e){const s=new Map;for(const r of e)for(let o=1;o<r.points.length;o++){const a=r.points[o-1],c=r.points[o],l=r.width/2+.5;for(let h=Math.floor((Math.min(a.x,c.x)-l)/Xi);h<=Math.floor((Math.max(a.x,c.x)+l)/Xi);h++)for(let u=Math.floor((Math.min(a.z,c.z)-l)/Xi);u<=Math.floor((Math.max(a.z,c.z)+l)/Xi);u++){const d=`${h},${u}`,f=s.get(d)||[];f.push({a,b:c,radius:l}),s.set(d,f)}}n={roads:e,cells:s},Hl.set(i,n)}return n.cells.get(`${Math.floor(t.x/Xi)},${Math.floor(t.z/Xi)}`)||[]}function zu(i,t){if(i.target?.type==="barn"&&vr(i.target,t))return!1;for(const e of i.rivers||[])for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,o=Math.sin(n.heading),a=Math.cos(n.heading);if(Math.abs(s*o+r*a)<=n.length/2+.2&&Math.abs(s*a-r*o)<=n.width/2+.2)return!1}for(const{a:e,b:n,radius:s}of _d(i,t))if(on(t,e,n)<=s)return!1;return ae(i,t.x,t.z,0)}function vd(i,t,e,n){if(!(n>0)||!Number.isFinite(n))return;const s=i.userData,r=Math.hypot(t.vx,t.vz)<.45&&(t.alert||0)<.03&&(s.turnSpeed||0)<.05&&!t.wander&&!t.bridgeCrossing,o=s.grazeAnchor,a=o&&Math.hypot(t.x-o.x,t.z-o.z)<=.75;if((!r||!a)&&(s.grazeAnchor={x:t.x,z:t.z},s.grazeWait=0),!r&&!(s.graze>0)){s.grazeWait=0,s.graze=0,s.grazeTime=(s.grazeTime||0)+n;return}const c=(t.type==="cow"?1.05:.65)*ws(t),l={x:t.x+Math.sin(i.rotation.y)*c,z:t.z+Math.cos(i.rotation.y)*c},h=Math.sin(i.rotation.y),u=Math.cos(i.rotation.y),d=ws(t),f=t.type==="cow",g=(f?.45:.3)*d,x=(f?.56:.36)*d,m=(f?-.59:-.36)*d,p=[-g,g].flatMap(_=>[m,x].map(b=>({x:t.x+u*_+h*b,z:t.z-h*_+u*b}))),M=[t,l,...p].every(_=>zu(e,_));s.grazeWait=M&&r?(s.grazeWait||0)+n:0;const v=s.grazeWait+1e-9>=7&&Math.hypot(t.vx,t.vz)<.1?1:0;s.graze=M?(s.graze||0)+Math.max(-n*4,Math.min(n*2,v-(s.graze||0))):0,s.grazeTime=(s.grazeTime||0)+n}function Md(i,t){return(i.graze||0)*(1.05+Math.sin((i.grazeTime||0)*3+t*1.7)*.02)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Kc="180",yd=0,Wl=1,Sd=2,Lu=1,Uu=2,Wn=3,di=0,$e=1,Re=2,li=0,_s=1,Xl=2,ql=3,Yl=4,wd=5,Ti=100,bd=101,Ed=102,Td=103,Ad=104,Rd=200,Cd=201,Pd=202,Dd=203,Wa=204,Xa=205,Id=206,zd=207,Ld=208,Ud=209,Nd=210,Fd=211,Od=212,Bd=213,kd=214,qa=0,Ya=1,Za=2,bs=3,$a=4,Ka=5,Ja=6,ja=7,Nu=0,Gd=1,Vd=2,hi=0,Hd=1,Wd=2,Xd=3,Fu=4,qd=5,Yd=6,Zd=7,Ou=300,Es=301,Ts=302,Qa=303,tc=304,Ao=306,$n=1e3,Ri=1001,ec=1002,an=1003,$d=1004,Er=1005,yn=1006,Ho=1007,Ci=1008,Ln=1009,Bu=1010,ku=1011,or=1012,Jc=1013,Li=1014,Pn=1015,Mr=1016,jc=1017,Qc=1018,ar=1020,Gu=35902,Vu=35899,Hu=1021,Wu=1022,Sn=1023,cr=1026,lr=1027,tl=1028,el=1029,Xu=1030,nl=1031,il=1033,ao=33776,co=33777,lo=33778,ho=33779,nc=35840,ic=35841,sc=35842,rc=35843,oc=36196,ac=37492,cc=37496,lc=37808,hc=37809,uc=37810,fc=37811,dc=37812,pc=37813,mc=37814,gc=37815,xc=37816,_c=37817,vc=37818,Mc=37819,yc=37820,Sc=37821,wc=36492,bc=36494,Ec=36495,Tc=36283,Ac=36284,Rc=36285,Cc=36286,Kd=3200,Jd=3201,qu=0,jd=1,ri="",De="srgb",As="srgb-linear",mo="linear",ue="srgb",qi=7680,Zl=519,Qd=512,tp=513,ep=514,Yu=515,np=516,ip=517,sp=518,rp=519,Pc=35044,ps=35048,$l="300 es",Dn=2e3,go=2001;class Is{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Wo=Math.PI/180,Dc=180/Math.PI;function Yn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function op(i,t){return(i%t+t)%t}function Xo(i,t,e){return(1-e)*i+e*t}function Cn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function fe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class bt{constructor(t=0,e=0){bt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*x,M=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const b=Math.sqrt(v),A=Math.atan2(b,p*M);m=Math.sin(m*A)/b,a=Math.sin(a*A)/b}const _=a*M;if(c=c*m+d*_,l=l*m+f*_,h=h*m+g*_,u=u*m+x*_,m===1-a){const b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return qo.copy(this).projectOnVector(t),this.sub(qo)}reflect(t){return this.sub(qo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qo=new I,Kl=new Kn;class Zt{constructor(t,e,n,s,r,o,a,c,l){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],M=s[1],v=s[4],_=s[7],b=s[2],A=s[5],P=s[8];return r[0]=o*x+a*M+c*b,r[3]=o*m+a*v+c*A,r[6]=o*p+a*_+c*P,r[1]=l*x+h*M+u*b,r[4]=l*m+h*v+u*A,r[7]=l*p+h*_+u*P,r[2]=d*x+f*M+g*b,r[5]=d*m+f*v+g*A,r[8]=d*p+f*_+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Yo.makeScale(t,e)),this}rotate(t){return this.premultiply(Yo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yo=new Zt;function Zu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function xo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ap(){const i=xo("canvas");return i.style.display="block",i}const Jl={};function hr(i){i in Jl||(Jl[i]=!0,console.warn(i))}function cp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const jl=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ql=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lp(){const i={enabled:!0,workingColorSpace:As,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ue&&(s.r=Zn(s.r),s.g=Zn(s.g),s.b=Zn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(s.r=vs(s.r),s.g=vs(s.g),s.b=vs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?mo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return hr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return hr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[As]:{primaries:t,whitePoint:n,transfer:mo,toXYZ:jl,fromXYZ:Ql,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:jl,fromXYZ:Ql,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:De}}}),i}const re=lp();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yi;class hp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Yi===void 0&&(Yi=xo("canvas")),Yi.width=t.width,Yi.height=t.height;const s=Yi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Yi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=xo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Zn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Zn(e[n]/255)*255):e[n]=Zn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let up=0;class sl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Yn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Zo(s[o].image)):r.push(Zo(s[o]))}else r=Zo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Zo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?hp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fp=0;const $o=new I;class ke extends Is{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,n=Ri,s=Ri,r=yn,o=Ci,a=Sn,c=Ln,l=ke.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Yn(),this.name="",this.source=new sl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize($o).x}get height(){return this.source.getSize($o).y}get depth(){return this.source.getSize($o).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ou)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $n:t.x=t.x-Math.floor(t.x);break;case Ri:t.x=t.x<0?0:1;break;case ec:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $n:t.y=t.y-Math.floor(t.y);break;case Ri:t.y=t.y<0?0:1;break;case ec:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=Ou;ke.DEFAULT_ANISOTROPY=1;class Te{constructor(t=0,e=0,n=0,s=1){Te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,_=(f+1)/2,b=(p+1)/2,A=(h+d)/4,P=(u+x)/4,F=(g+m)/4;return v>_&&v>b?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=P/n):_>b?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=F/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=P/r,s=F/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(d-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dp extends Is{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new ke(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:yn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new sl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends dp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class $u extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class pp extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ki{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,mn):mn.fromBufferAttribute(r,o),mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tr.copy(n.boundingBox)),Tr.applyMatrix4(t.matrixWorld),this.union(Tr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fs),Ar.subVectors(this.max,Fs),Zi.subVectors(t.a,Fs),$i.subVectors(t.b,Fs),Ki.subVectors(t.c,Fs),jn.subVectors($i,Zi),Qn.subVectors(Ki,$i),_i.subVectors(Zi,Ki);let e=[0,-jn.z,jn.y,0,-Qn.z,Qn.y,0,-_i.z,_i.y,jn.z,0,-jn.x,Qn.z,0,-Qn.x,_i.z,0,-_i.x,-jn.y,jn.x,0,-Qn.y,Qn.x,0,-_i.y,_i.x,0];return!Ko(e,Zi,$i,Ki,Ar)||(e=[1,0,0,0,1,0,0,0,1],!Ko(e,Zi,$i,Ki,Ar))?!1:(Rr.crossVectors(jn,Qn),e=[Rr.x,Rr.y,Rr.z],Ko(e,Zi,$i,Ki,Ar))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const On=[new I,new I,new I,new I,new I,new I,new I,new I],mn=new I,Tr=new ki,Zi=new I,$i=new I,Ki=new I,jn=new I,Qn=new I,_i=new I,Fs=new I,Ar=new I,Rr=new I,vi=new I;function Ko(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){vi.fromArray(i,r);const a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),c=t.dot(vi),l=e.dot(vi),h=n.dot(vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const mp=new ki,Os=new I,Jo=new I;class mi{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):mp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Os.subVectors(t,this.center);const e=Os.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Os,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Os.copy(t.center).add(Jo)),this.expandByPoint(Os.copy(t.center).sub(Jo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Bn=new I,jo=new I,Cr=new I,ti=new I,Qo=new I,Pr=new I,ta=new I;class Ku{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){jo.copy(t).add(e).multiplyScalar(.5),Cr.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(jo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Cr),a=ti.dot(this.direction),c=-ti.dot(Cr),l=ti.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(jo).addScaledVector(Cr,d),f}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,s,r){Qo.subVectors(e,t),Pr.subVectors(n,t),ta.crossVectors(Qo,Pr);let o=this.direction.dot(ta),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,t);const c=a*this.direction.dot(Pr.crossVectors(ti,Pr));if(c<0)return null;const l=a*this.direction.dot(Qo.cross(ti));if(l<0||c+l>o)return null;const h=-a*ti.dot(ta);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ee{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,g,x,m){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,x,m)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,g,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ji.setFromMatrixColumn(t,0).length(),r=1/Ji.setFromMatrixColumn(t,1).length(),o=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-x*l,e[9]=-a*c,e[2]=x-d*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,x=l*u;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,x=l*u;e[0]=d-x*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+x,e[1]=c*u,e[5]=x*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-x*u}else if(t.order==="XZY"){const d=o*c,f=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+x,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gp,t,xp)}lookAt(t,e,n){const s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),ei.crossVectors(n,je),ei.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),ei.crossVectors(n,je)),ei.normalize(),Dr.crossVectors(je,ei),s[0]=ei.x,s[4]=Dr.x,s[8]=je.x,s[1]=ei.y,s[5]=Dr.y,s[9]=je.y,s[2]=ei.z,s[6]=Dr.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],M=n[3],v=n[7],_=n[11],b=n[15],A=s[0],P=s[4],F=s[8],S=s[12],E=s[1],L=s[5],G=s[9],k=s[13],q=s[2],R=s[6],w=s[10],U=s[14],D=s[3],Z=s[7],J=s[11],N=s[15];return r[0]=o*A+a*E+c*q+l*D,r[4]=o*P+a*L+c*R+l*Z,r[8]=o*F+a*G+c*w+l*J,r[12]=o*S+a*k+c*U+l*N,r[1]=h*A+u*E+d*q+f*D,r[5]=h*P+u*L+d*R+f*Z,r[9]=h*F+u*G+d*w+f*J,r[13]=h*S+u*k+d*U+f*N,r[2]=g*A+x*E+m*q+p*D,r[6]=g*P+x*L+m*R+p*Z,r[10]=g*F+x*G+m*w+p*J,r[14]=g*S+x*k+m*U+p*N,r[3]=M*A+v*E+_*q+b*D,r[7]=M*P+v*L+_*R+b*Z,r[11]=M*F+v*G+_*w+b*J,r[15]=M*S+v*k+_*U+b*N,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+x*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+m*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],M=u*m*l-x*d*l+x*c*f-a*m*f-u*c*p+a*d*p,v=g*d*l-h*m*l-g*c*f+o*m*f+h*c*p-o*d*p,_=h*x*l-g*u*l+g*a*f-o*x*f-h*a*p+o*u*p,b=g*u*c-h*x*c-g*a*d+o*x*d+h*a*m-o*u*m,A=e*M+n*v+s*_+r*b;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return t[0]=M*P,t[1]=(x*d*r-u*m*r-x*s*f+n*m*f+u*s*p-n*d*p)*P,t[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*p+n*c*p)*P,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*P,t[4]=v*P,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*P,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*p-e*c*p)*P,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*P,t[8]=_*P,t[9]=(g*u*r-h*x*r-g*n*f+e*x*f+h*n*p-e*u*p)*P,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*p+e*a*p)*P,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*P,t[12]=b*P,t[13]=(h*x*s-g*u*s+g*n*d-e*x*d-h*n*m+e*u*m)*P,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*m-e*a*m)*P,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,x=o*h,m=o*u,p=a*u,M=c*l,v=c*h,_=c*u,b=n.x,A=n.y,P=n.z;return s[0]=(1-(x+p))*b,s[1]=(f+_)*b,s[2]=(g-v)*b,s[3]=0,s[4]=(f-_)*A,s[5]=(1-(d+p))*A,s[6]=(m+M)*A,s[7]=0,s[8]=(g+v)*P,s[9]=(m-M)*P,s[10]=(1-(d+x))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],gn.copy(this);const l=1/r,h=1/o,u=1/a;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=h,gn.elements[5]*=h,gn.elements[6]*=h,gn.elements[8]*=u,gn.elements[9]*=u,gn.elements[10]*=u,e.setFromRotationMatrix(gn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Dn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===Dn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===go)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Dn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===Dn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===go)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ji=new I,gn=new ee,gp=new I(0,0,0),xp=new I(1,1,1),ei=new I,Dr=new I,je=new I,th=new ee,eh=new Kn;class En{constructor(t=0,e=0,n=0,s=En.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return th.makeRotationFromQuaternion(t),this.setFromRotationMatrix(th,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return eh.setFromEuler(this),this.setFromQuaternion(eh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}En.DEFAULT_ORDER="XYZ";class Ju{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let _p=0;const nh=new I,ji=new Kn,kn=new ee,Ir=new I,Bs=new I,vp=new I,Mp=new Kn,ih=new I(1,0,0),sh=new I(0,1,0),rh=new I(0,0,1),oh={type:"added"},yp={type:"removed"},Qi={type:"childadded",child:null},ea={type:"childremoved",child:null};class we extends Is{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=Yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new I,e=new En,n=new Kn,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ee},normalMatrix:{value:new Zt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ju,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ji.setFromAxisAngle(t,e),this.quaternion.multiply(ji),this}rotateOnWorldAxis(t,e){return ji.setFromAxisAngle(t,e),this.quaternion.premultiply(ji),this}rotateX(t){return this.rotateOnAxis(ih,t)}rotateY(t){return this.rotateOnAxis(sh,t)}rotateZ(t){return this.rotateOnAxis(rh,t)}translateOnAxis(t,e){return nh.copy(t).applyQuaternion(this.quaternion),this.position.add(nh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ih,t)}translateY(t){return this.translateOnAxis(sh,t)}translateZ(t){return this.translateOnAxis(rh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ir.copy(t):Ir.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(Bs,Ir,this.up):kn.lookAt(Ir,Bs,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),ji.setFromRotationMatrix(kn),this.quaternion.premultiply(ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(oh),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yp),ea.child=t,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(oh),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,t,vp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,Mp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}we.DEFAULT_UP=new I(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new I,Gn=new I,na=new I,Vn=new I,ts=new I,es=new I,ah=new I,ia=new I,sa=new I,ra=new I,oa=new Te,aa=new Te,ca=new Te;class rn{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),xn.subVectors(t,e),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){xn.subVectors(s,e),Gn.subVectors(n,e),na.subVectors(t,e);const o=xn.dot(xn),a=xn.dot(Gn),c=xn.dot(na),l=Gn.dot(Gn),h=Gn.dot(na),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Vn.x),c.addScaledVector(o,Vn.y),c.addScaledVector(a,Vn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return oa.setScalar(0),aa.setScalar(0),ca.setScalar(0),oa.fromBufferAttribute(t,e),aa.fromBufferAttribute(t,n),ca.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(oa,r.x),o.addScaledVector(aa,r.y),o.addScaledVector(ca,r.z),o}static isFrontFacing(t,e,n,s){return xn.subVectors(n,e),Gn.subVectors(t,e),xn.cross(Gn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),xn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ts.subVectors(s,n),es.subVectors(r,n),ia.subVectors(t,n);const c=ts.dot(ia),l=es.dot(ia);if(c<=0&&l<=0)return e.copy(n);sa.subVectors(t,s);const h=ts.dot(sa),u=es.dot(sa);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ts,o);ra.subVectors(t,r);const f=ts.dot(ra),g=es.dot(ra);if(g>=0&&f<=g)return e.copy(r);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(es,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ah.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(ah,a);const p=1/(m+x+d);return o=x*p,a=d*p,e.copy(n).addScaledVector(ts,o).addScaledVector(es,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ju={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},zr={h:0,s:0,l:0};function la(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=op(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=la(o,r,t+1/3),this.g=la(o,r,t),this.b=la(o,r,t-1/3)}return re.colorSpaceToWorking(this,s),this}setStyle(t,e=De){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=ju[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return re.workingToColorSpace(Oe.copy(this),t),Math.round(Yt(Oe.r*255,0,255))*65536+Math.round(Yt(Oe.g*255,0,255))*256+Math.round(Yt(Oe.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(Oe.copy(this),e);const n=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=De){re.workingToColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,s=Oe.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(zr);const n=Xo(ni.h,zr.h,e),s=Xo(ni.s,zr.s,e),r=Xo(ni.l,zr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Ht;Ht.NAMES=ju;let Sp=0;class Gi extends Is{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=Yn(),this.name="",this.type="Material",this.blending=_s,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wa,this.blendDst=Xa,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qi,this.stencilZFail=qi,this.stencilZPass=qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_s&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wa&&(n.blendSrc=this.blendSrc),this.blendDst!==Xa&&(n.blendDst=this.blendDst),this.blendEquation!==Ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class nn extends Gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ae=new I,Lr=new bt;let wp=0;class Ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Pc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Lr.fromBufferAttribute(this,e),Lr.applyMatrix3(t),this.setXY(e,Lr.x,Lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Cn(e,this.array)),e}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Cn(e,this.array)),e}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Cn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Cn(e,this.array)),e}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array),r=fe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Pc&&(t.usage=this.usage),t}}class Qu extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class tf extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class $t extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let bp=0;const hn=new ee,ha=new we,ns=new I,Qe=new ki,ks=new ki,Le=new I;class _e extends Is{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Zu(t)?tf:Qu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return ha.lookAt(t),ha.updateMatrix(),this.applyMatrix4(ha.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ki);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(Qe.min,ks.min),Qe.expandByPoint(Le),Le.addVectors(Qe.max,ks.max),Qe.expandByPoint(Le)):(Qe.expandByPoint(ks.min),Qe.expandByPoint(ks.max))}Qe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Le.fromBufferAttribute(a,l),c&&(ns.fromBufferAttribute(t,l),Le.add(ns)),s=Math.max(s,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let F=0;F<n.count;F++)a[F]=new I,c[F]=new I;const l=new I,h=new I,u=new I,d=new bt,f=new bt,g=new bt,x=new I,m=new I;function p(F,S,E){l.fromBufferAttribute(n,F),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,E),d.fromBufferAttribute(r,F),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,E),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),a[F].add(x),a[S].add(x),a[E].add(x),c[F].add(m),c[S].add(m),c[E].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let F=0,S=M.length;F<S;++F){const E=M[F],L=E.start,G=E.count;for(let k=L,q=L+G;k<q;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const v=new I,_=new I,b=new I,A=new I;function P(F){b.fromBufferAttribute(s,F),A.copy(b);const S=a[F];v.copy(S),v.sub(b.multiplyScalar(b.dot(S))).normalize(),_.crossVectors(A,S);const L=_.dot(c[F])<0?-1:1;o.setXYZW(F,v.x,v.y,v.z,L)}for(let F=0,S=M.length;F<S;++F){const E=M[F],L=E.start,G=E.count;for(let k=L,q=L+G;k<q;k+=3)P(t.getX(k+0)),P(t.getX(k+1)),P(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,o=new I,a=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ge(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ch=new ee,Mi=new Ku,Ur=new mi,lh=new I,Nr=new I,Fr=new I,Or=new I,ua=new I,Br=new I,hh=new I,kr=new I;class ne extends we{constructor(t=new _e,e=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Br.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(ua.fromBufferAttribute(u,t),o?Br.addScaledVector(ua,h):Br.addScaledVector(ua.sub(e),h))}e.add(Br)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(r),Mi.copy(t.ray).recast(t.near),!(Ur.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(Ur,lh)===null||Mi.origin.distanceToSquared(lh)>(t.far-t.near)**2))&&(ch.copy(r).invert(),Mi.copy(t.ray).applyMatrix4(ch),!(n.boundingBox!==null&&Mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,b=v;_<b;_+=3){const A=a.getX(_),P=a.getX(_+1),F=a.getX(_+2);s=Gr(this,p,t,n,l,h,u,A,P,F),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const M=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);s=Gr(this,o,t,n,l,h,u,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=o[m.materialIndex],M=Math.max(m.start,f.start),v=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,b=v;_<b;_+=3){const A=_,P=_+1,F=_+2;s=Gr(this,p,t,n,l,h,u,A,P,F),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const M=m,v=m+1,_=m+2;s=Gr(this,o,t,n,l,h,u,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Ep(i,t,e,n,s,r,o,a){let c;if(t.side===$e?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===di,a),c===null)return null;kr.copy(a),kr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(kr);return l<e.near||l>e.far?null:{distance:l,point:kr.clone(),object:i}}function Gr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Nr),i.getVertexPosition(c,Fr),i.getVertexPosition(l,Or);const h=Ep(i,t,e,n,Nr,Fr,Or,hh);if(h){const u=new I;rn.getBarycoord(hh,Nr,Fr,Or,u),s&&(h.uv=rn.getInterpolatedAttribute(s,a,c,l,u,new bt)),r&&(h.uv1=rn.getInterpolatedAttribute(r,a,c,l,u,new bt)),o&&(h.normal=rn.getInterpolatedAttribute(o,a,c,l,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new I,materialIndex:0};rn.getNormal(Nr,Fr,Or,d.normal),h.face=d,h.barycoord=u}return h}class wn extends _e{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(u,2));function g(x,m,p,M,v,_,b,A,P,F,S){const E=_/P,L=b/F,G=_/2,k=b/2,q=A/2,R=P+1,w=F+1;let U=0,D=0;const Z=new I;for(let J=0;J<w;J++){const N=J*L-k;for(let Q=0;Q<R;Q++){const Mt=Q*E-G;Z[x]=Mt*M,Z[m]=N*v,Z[p]=q,l.push(Z.x,Z.y,Z.z),Z[x]=0,Z[m]=0,Z[p]=A>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Q/P),u.push(1-J/F),U+=1}}for(let J=0;J<F;J++)for(let N=0;N<P;N++){const Q=d+N+R*J,Mt=d+N+R*(J+1),xt=d+(N+1)+R*(J+1),tt=d+(N+1)+R*J;c.push(Q,Mt,tt),c.push(Mt,xt,tt),D+=6}a.addGroup(f,D,S),f+=D,d+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Rs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Xe(i){const t={};for(let e=0;e<i.length;e++){const n=Rs(i[e]);for(const s in n)t[s]=n[s]}return t}function Tp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ef(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const Ap={clone:Rs,merge:Xe};var Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends Gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rs(t.uniforms),this.uniformsGroups=Tp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class nf extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new I,uh=new bt,fh=new bt;class Mn extends nf{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Dc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Wo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Dc*2*Math.atan(Math.tan(Wo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,uh,fh),e.subVectors(fh,uh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Wo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const is=-90,ss=1;class Pp extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(is,ss,t,e);s.layers=this.layers,this.add(s);const r=new Mn(is,ss,t,e);r.layers=this.layers,this.add(r);const o=new Mn(is,ss,t,e);o.layers=this.layers,this.add(o);const a=new Mn(is,ss,t,e);a.layers=this.layers,this.add(a);const c=new Mn(is,ss,t,e);c.layers=this.layers,this.add(c);const l=new Mn(is,ss,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===go)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class sf extends ke{constructor(t=[],e=Es,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Dp extends Ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new sf(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new wn(5,5,5),r=new pi({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:li});r.uniforms.tEquirect.value=e;const o=new ne(s,r),a=e.minFilter;return e.minFilter===Ci&&(e.minFilter=yn),new Pp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class Jt extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ip={type:"move"};class fa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ip)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Jt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class rl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=n}clone(){return new rl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class zp extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Pc,this.updateRanges=[],this.version=0,this.uuid=Yn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const We=new I;class _o{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=fe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Cn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Cn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Cn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Cn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=fe(e,this.array),n=fe(n,this.array),s=fe(s,this.array),r=fe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new _o(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class rf extends Gi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let rs;const Gs=new I,os=new I,as=new I,cs=new bt,Vs=new bt,of=new ee,Vr=new I,Hs=new I,Hr=new I,dh=new bt,da=new bt,ph=new bt;class Up extends we{constructor(t=new rf){if(super(),this.isSprite=!0,this.type="Sprite",rs===void 0){rs=new _e;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lp(e,5);rs.setIndex([0,1,2,0,2,3]),rs.setAttribute("position",new _o(n,3,0,!1)),rs.setAttribute("uv",new _o(n,2,3,!1))}this.geometry=rs,this.material=t,this.center=new bt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),os.setFromMatrixScale(this.matrixWorld),of.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&os.multiplyScalar(-as.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Wr(Vr.set(-.5,-.5,0),as,o,os,s,r),Wr(Hs.set(.5,-.5,0),as,o,os,s,r),Wr(Hr.set(.5,.5,0),as,o,os,s,r),dh.set(0,0),da.set(1,0),ph.set(1,1);let a=t.ray.intersectTriangle(Vr,Hs,Hr,!1,Gs);if(a===null&&(Wr(Hs.set(-.5,.5,0),as,o,os,s,r),da.set(0,1),a=t.ray.intersectTriangle(Vr,Hr,Hs,!1,Gs),a===null))return;const c=t.ray.origin.distanceTo(Gs);c<t.near||c>t.far||e.push({distance:c,point:Gs.clone(),uv:rn.getInterpolation(Gs,Vr,Hs,Hr,dh,da,ph,new bt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Wr(i,t,e,n,s,r){cs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Vs.x=r*cs.x-s*cs.y,Vs.y=s*cs.x+r*cs.y):Vs.copy(cs),i.copy(t),i.x+=Vs.x,i.y+=Vs.y,i.applyMatrix4(of)}class af extends ke{constructor(t=null,e=1,n=1,s,r,o,a,c,l=an,h=an,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ic extends Ge{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ls=new ee,mh=new ee,Xr=[],gh=new ki,Np=new ee,Ws=new ne,Xs=new mi;class oi extends ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ic(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Np)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ki),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ls),gh.copy(t.boundingBox).applyMatrix4(ls),this.boundingBox.union(gh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ls),Xs.copy(t.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(Xs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ws.geometry=this.geometry,Ws.material=this.material,Ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xs.copy(this.boundingSphere),Xs.applyMatrix4(n),t.ray.intersectsSphere(Xs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ls),mh.multiplyMatrices(n,ls),Ws.matrixWorld=mh,Ws.raycast(t,Xr);for(let o=0,a=Xr.length;o<a;o++){const c=Xr[o];c.instanceId=r,c.object=this,e.push(c)}Xr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ic(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new af(new Float32Array(s*this.count),s,this.count,tl,Pn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const pa=new I,Fp=new I,Op=new Zt;class si{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=pa.subVectors(n,e).cross(Fp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(pa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Op.getNormalMatrix(t),s=this.coplanarPoint(pa).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new mi,Bp=new bt(.5,.5),qr=new I;class Ro{constructor(t=new si,e=new si,n=new si,s=new si,r=new si,o=new si){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Dn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],M=r[12],v=r[13],_=r[14],b=r[15];if(s[0].setComponents(l-o,f-h,p-g,b-M).normalize(),s[1].setComponents(l+o,f+h,p+g,b+M).normalize(),s[2].setComponents(l+a,f+u,p+x,b+v).normalize(),s[3].setComponents(l-a,f-u,p-x,b-v).normalize(),n)s[4].setComponents(c,d,m,_).normalize(),s[5].setComponents(l-c,f-d,p-m,b-_).normalize();else if(s[4].setComponents(l-c,f-d,p-m,b-_).normalize(),e===Dn)s[5].setComponents(l+c,f+d,p+m,b+_).normalize();else if(e===go)s[5].setComponents(c,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){yi.center.set(0,0,0);const e=Bp.distanceTo(t.center);return yi.radius=.7071067811865476+e,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(qr.x=s.normal.x>0?t.max.x:t.min.x,qr.y=s.normal.y>0?t.max.y:t.min.y,qr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(qr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cf extends Gi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const vo=new I,Mo=new I,xh=new ee,qs=new Ku,Yr=new mi,ma=new I,_h=new I;class kp extends we{constructor(t=new _e,e=new cf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)vo.fromBufferAttribute(e,s-1),Mo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=vo.distanceTo(Mo);t.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(s),Yr.radius+=r,t.ray.intersectsSphere(Yr)===!1)return;xh.copy(s).invert(),qs.copy(t.ray).applyMatrix4(xh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){const p=h.getX(x),M=h.getX(x+1),v=Zr(this,t,qs,c,p,M,x);v&&e.push(v)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(f),p=Zr(this,t,qs,c,x,m,g-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){const p=Zr(this,t,qs,c,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=Zr(this,t,qs,c,g-1,f,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Zr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(vo.fromBufferAttribute(a,s),Mo.fromBufferAttribute(a,r),e.distanceSqToSegment(vo,Mo,ma,_h)>n)return;ma.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ma);if(!(l<t.near||l>t.far))return{distance:l,point:_h.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const vh=new I,Mh=new I;class Gp extends kp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)vh.fromBufferAttribute(e,s),Mh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vh.distanceTo(Mh);t.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Vi extends ke{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class lf extends ke{constructor(t,e,n=Li,s,r,o,a=an,c=an,l,h=cr,u=1){if(h!==cr&&h!==lr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new sl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class hf extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ol extends _e{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new I,h=new bt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new $t(o,3)),this.setAttribute("normal",new $t(a,3)),this.setAttribute("uv",new $t(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ol(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class zs extends _e{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const x=[],m=n/2;let p=0;M(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new $t(u,3)),this.setAttribute("normal",new $t(d,3)),this.setAttribute("uv",new $t(f,2));function M(){const _=new I,b=new I;let A=0;const P=(e-t)/n;for(let F=0;F<=r;F++){const S=[],E=F/r,L=E*(e-t)+t;for(let G=0;G<=s;G++){const k=G/s,q=k*c+a,R=Math.sin(q),w=Math.cos(q);b.x=L*R,b.y=-E*n+m,b.z=L*w,u.push(b.x,b.y,b.z),_.set(R,P,w).normalize(),d.push(_.x,_.y,_.z),f.push(k,1-E),S.push(g++)}x.push(S)}for(let F=0;F<s;F++)for(let S=0;S<r;S++){const E=x[S][F],L=x[S+1][F],G=x[S+1][F+1],k=x[S][F+1];(t>0||S!==0)&&(h.push(E,L,k),A+=3),(e>0||S!==r-1)&&(h.push(L,G,k),A+=3)}l.addGroup(p,A,0),p+=A}function v(_){const b=g,A=new bt,P=new I;let F=0;const S=_===!0?t:e,E=_===!0?1:-1;for(let G=1;G<=s;G++)u.push(0,m*E,0),d.push(0,E,0),f.push(.5,.5),g++;const L=g;for(let G=0;G<=s;G++){const q=G/s*c+a,R=Math.cos(q),w=Math.sin(q);P.x=S*w,P.y=m*E,P.z=S*R,u.push(P.x,P.y,P.z),d.push(0,E,0),A.x=R*.5+.5,A.y=w*.5*E+.5,f.push(A.x,A.y),g++}for(let G=0;G<s;G++){const k=b+G,q=L+G;_===!0?h.push(q,q+1,k):h.push(q+1,q,k),F+=3}l.addGroup(p,F,_===!0?1:2),p+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ur extends zs{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ur(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new bt:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new I,s=[],r=[],o=[],a=new I,c=new ee;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new I)}r[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Yt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Yt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class al extends Nn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new bt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Vp extends al{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function cl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const $r=new I,ga=new cl,xa=new cl,_a=new cl;class Hp extends Nn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:($r.subVectors(s[0],s[1]).add(s[0]),l=$r);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:($r.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=$r),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),ga.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,x,m),xa.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,x,m),_a.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(ga.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),xa.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),_a.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(ga.calc(c),xa.calc(c),_a.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function yh(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Wp(i,t){const e=1-i;return e*e*t}function Xp(i,t){return 2*(1-i)*i*t}function qp(i,t){return i*i*t}function tr(i,t,e,n){return Wp(i,t)+Xp(i,e)+qp(i,n)}function Yp(i,t){const e=1-i;return e*e*e*t}function Zp(i,t){const e=1-i;return 3*e*e*i*t}function $p(i,t){return 3*(1-i)*i*i*t}function Kp(i,t){return i*i*i*t}function er(i,t,e,n,s){return Yp(i,t)+Zp(i,e)+$p(i,n)+Kp(i,s)}class uf extends Nn{constructor(t=new bt,e=new bt,n=new bt,s=new bt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new bt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(er(t,s.x,r.x,o.x,a.x),er(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Jp extends Nn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(er(t,s.x,r.x,o.x,a.x),er(t,s.y,r.y,o.y,a.y),er(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ff extends Nn{constructor(t=new bt,e=new bt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new bt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new bt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jp extends Nn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class df extends Nn{constructor(t=new bt,e=new bt,n=new bt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new bt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(tr(t,s.x,r.x,o.x),tr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qp extends Nn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(tr(t,s.x,r.x,o.x),tr(t,s.y,r.y,o.y),tr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pf extends Nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new bt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(yh(a,c.x,l.x,h.x,u.x),yh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new bt().fromArray(s))}return this}}var Sh=Object.freeze({__proto__:null,ArcCurve:Vp,CatmullRomCurve3:Hp,CubicBezierCurve:uf,CubicBezierCurve3:Jp,EllipseCurve:al,LineCurve:ff,LineCurve3:jp,QuadraticBezierCurve:df,QuadraticBezierCurve3:Qp,SplineCurve:pf});class tm extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Sh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Sh[s.type]().fromJSON(s))}return this}}class wh extends tm{constructor(t){super(),this.type="Path",this.currentPoint=new bt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new ff(this.currentPoint.clone(),new bt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new df(this.currentPoint.clone(),new bt(t,e),new bt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new uf(this.currentPoint.clone(),new bt(t,e),new bt(n,s),new bt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new pf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new al(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class mf extends wh{constructor(t){super(t),this.uuid=Yn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new wh().fromJSON(s))}return this}}function em(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=gf(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=om(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=e;d<s;d+=e){const f=i[d],g=i[d+1];f<a&&(a=f),g<c&&(c=g),f>h&&(h=f),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return fr(r,o,e,a,c,l,0),o}function gf(i,t,e,n,s){let r;if(s===xm(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=bh(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=bh(o/n|0,i[o],i[o+1],r);return r&&Cs(r,r.next)&&(pr(r),r=r.next),r}function Ni(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Cs(e,e.next)||Se(e.prev,e,e.next)===0)){if(pr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&um(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?im(i,n,s,r):nm(i)){t.push(c.i,i.i,l.i),pr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=sm(Ni(i),t),fr(i,t,e,n,s,r,2)):o===2&&rm(i,t,e,n,s,r):fr(Ni(i),t,e,n,s,r,1);break}}}function nm(i){const t=i.prev,e=i,n=i.next;if(Se(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),d=Math.max(s,r,o),f=Math.max(a,c,l);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Ks(s,a,r,c,o,l,g.x,g.y)&&Se(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function im(i,t,e,n){const s=i.prev,r=i,o=i.next;if(Se(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=Math.min(a,c,l),g=Math.min(h,u,d),x=Math.max(a,c,l),m=Math.max(h,u,d),p=zc(f,g,t,e,n),M=zc(x,m,t,e,n);let v=i.prevZ,_=i.nextZ;for(;v&&v.z>=p&&_&&_.z<=M;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Ks(a,h,c,u,l,d,v.x,v.y)&&Se(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Ks(a,h,c,u,l,d,_.x,_.y)&&Se(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Ks(a,h,c,u,l,d,v.x,v.y)&&Se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=M;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Ks(a,h,c,u,l,d,_.x,_.y)&&Se(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function sm(i,t){let e=i;do{const n=e.prev,s=e.next.next;!Cs(n,s)&&_f(n,e,e.next,s)&&dr(n,s)&&dr(s,n)&&(t.push(n.i,e.i,s.i),pr(e),pr(e.next),e=i=s),e=e.next}while(e!==i);return Ni(e)}function rm(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&pm(o,a)){let c=vf(o,a);o=Ni(o,o.next),c=Ni(c,c.next),fr(o,t,e,n,s,r,0),fr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function om(i,t,e,n){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=gf(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(dm(l))}s.sort(am);for(let r=0;r<s.length;r++)e=cm(s[r],e);return e}function am(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function cm(i,t){const e=lm(i,t);if(!e)return t;const n=vf(e,i);return Ni(n,n.next),Ni(e,e.next)}function lm(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,o;if(Cs(i,e))return e;do{if(Cs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&xf(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);dr(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&hm(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function hm(i,t){return Se(i.prev,i,t.prev)<0&&Se(t.next,i,i.next)<0}function um(i,t,e,n){let s=i;do s.z===0&&(s.z=zc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,fm(s)}function fm(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function zc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function dm(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function xf(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Ks(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&xf(i,t,e,n,s,r,o,a)}function pm(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!mm(i,t)&&(dr(i,t)&&dr(t,i)&&gm(i,t)&&(Se(i.prev,i,t.prev)||Se(i,t.prev,t))||Cs(i,t)&&Se(i.prev,i,i.next)>0&&Se(t.prev,t,t.next)>0)}function Se(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Cs(i,t){return i.x===t.x&&i.y===t.y}function _f(i,t,e,n){const s=Jr(Se(i,t,e)),r=Jr(Se(i,t,n)),o=Jr(Se(e,n,i)),a=Jr(Se(e,n,t));return!!(s!==r&&o!==a||s===0&&Kr(i,e,t)||r===0&&Kr(i,n,t)||o===0&&Kr(e,i,n)||a===0&&Kr(e,t,n))}function Kr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Jr(i){return i>0?1:i<0?-1:0}function mm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&_f(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function dr(i,t){return Se(i.prev,i,i.next)<0?Se(i,t,i.next)>=0&&Se(i,i.prev,t)>=0:Se(i,t,i.prev)<0||Se(i,i.next,t)<0}function gm(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function vf(i,t){const e=Lc(i.i,i.x,i.y),n=Lc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function bh(i,t,e,n){const s=Lc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function pr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Lc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function xm(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class _m{static triangulate(t,e,n=2){return em(t,e,n)}}class nr{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return nr.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Eh(t),Th(n,t);let o=t.length;e.forEach(Eh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Th(n,e[c]);const a=_m.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Eh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Th(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class yr extends _e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const M=p*d-o;for(let v=0;v<l;v++){const _=v*u-r;g.push(_,-M,0),x.push(0,0,1),m.push(v/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const v=M+l*p,_=M+l*(p+1),b=M+1+l*(p+1),A=M+1+l*p;f.push(v,_,A),f.push(_,b,A)}this.setIndex(f),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yr(t.width,t.height,t.widthSegments,t.heightSegments)}}class ll extends _e{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new I,g=new bt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const M=p+m,v=M,_=M+n+1,b=M+n+2,A=M+1;a.push(v,_,A),a.push(_,b,A)}}this.setIndex(a),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(l,3)),this.setAttribute("uv",new $t(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ll(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class hl extends _e{constructor(t=new mf([new bt(0,.5),new bt(-.5,-.5),new bt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new $t(s,3)),this.setAttribute("normal",new $t(r,3)),this.setAttribute("uv",new $t(o,2));function l(h){const u=s.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;nr.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const M=g[m];nr.isClockWise(M)===!0&&(g[m]=M.reverse())}const x=nr.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const M=g[m];f=f.concat(M)}for(let m=0,p=f.length;m<p;m++){const M=f[m];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,p=x.length;m<p;m++){const M=x[m],v=M[0]+u,_=M[1]+u,b=M[2]+u;n.push(v,_,b),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return vm(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new hl(n,t.curveSegments)}}function vm(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Fi extends _e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new I,d=new I,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const M=[],v=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let b=0;b<=e;b++){const A=b/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(A+_,1-v),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const v=h[p][M+1],_=h[p][M],b=h[p+1][M],A=h[p+1][M+1];(p!==0||o>0)&&f.push(v,_,A),(p!==n-1||c<Math.PI)&&f.push(_,b,A)}this.setIndex(f),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Co extends _e{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new I,u=new I,d=new I;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const x=g/s*r,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;o.push(x,m,M),o.push(m,p,M)}this.setIndex(o),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class le extends Gi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qu,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Mm extends Gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Kd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ym extends Gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Mf extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Sm extends Mf{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const va=new ee,Ah=new I,Rh=new I;class wm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ro,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ah),Rh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rh),e.updateMatrixWorld(),va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Po extends nf{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class bm extends wm{constructor(){super(new Po(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Em extends Mf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new bm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Tm extends Mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Ch=new I,jr=new I,hs=new I,us=new I,Ma=new I,Am=new I,Rm=new I;class Cm{constructor(t=new I,e=new I){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Ch.subVectors(t,this.start),jr.subVectors(this.end,this.start);const n=jr.dot(jr);let r=jr.dot(Ch)/n;return e&&(r=Yt(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=Am,n=Rm){const s=10000000000000001e-32;let r,o;const a=this.start,c=t.start,l=this.end,h=t.end;hs.subVectors(l,a),us.subVectors(h,c),Ma.subVectors(a,c);const u=hs.dot(hs),d=us.dot(us),f=us.dot(Ma);if(u<=s&&d<=s)return e.copy(a),n.copy(c),e.sub(n),e.dot(e);if(u<=s)r=0,o=f/d,o=Yt(o,0,1);else{const g=hs.dot(Ma);if(d<=s)o=0,r=Yt(-g/u,0,1);else{const x=hs.dot(us),m=u*d-x*x;m!==0?r=Yt((x*f-g*d)/m,0,1):r=0,o=(x*r+f)/d,o<0?(o=0,r=Yt(-g/u,0,1)):o>1&&(o=1,r=Yt((x-g)/u,0,1))}}return e.copy(a).add(hs.multiplyScalar(r)),n.copy(c).add(us.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Ph(i,t,e,n){const s=Pm(n);switch(e){case Hu:return i*t;case tl:return i*t/s.components*s.byteLength;case el:return i*t/s.components*s.byteLength;case Xu:return i*t*2/s.components*s.byteLength;case nl:return i*t*2/s.components*s.byteLength;case Wu:return i*t*3/s.components*s.byteLength;case Sn:return i*t*4/s.components*s.byteLength;case il:return i*t*4/s.components*s.byteLength;case ao:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case lo:case ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ic:case rc:return Math.max(i,16)*Math.max(t,8)/4;case nc:case sc:return Math.max(i,8)*Math.max(t,8)/2;case oc:case ac:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case cc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case hc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case uc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case fc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case dc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case pc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case mc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case gc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case xc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case _c:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case vc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Mc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case yc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Sc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case wc:case bc:case Ec:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Tc:case Ac:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Rc:case Cc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pm(i){switch(i){case Ln:case Bu:return{byteLength:1,components:1};case or:case ku:case Mr:return{byteLength:2,components:1};case jc:case Qc:return{byteLength:2,components:4};case Li:case Jc:case Pn:return{byteLength:4,components:1};case Gu:case Vu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function yf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Dm(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const x=u[f];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Im=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zm=`#ifdef USE_ALPHAHASH
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
#endif`,Lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Um=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Om=`#ifdef USE_AOMAP
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
#endif`,Bm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,km=`#ifdef USE_BATCHING
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
#endif`,Gm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Wm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xm=`#ifdef USE_IRIDESCENCE
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
#endif`,qm=`#ifdef USE_BUMPMAP
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
#endif`,Ym=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$m=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Km=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,eg=`#define PI 3.141592653589793
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
} // validated`,ng=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ig=`vec3 transformedNormal = objectNormal;
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
#endif`,sg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,og=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ag=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cg="gl_FragColor = linearToOutputTexel( gl_FragColor );",lg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hg=`#ifdef USE_ENVMAP
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
#endif`,ug=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,fg=`#ifdef USE_ENVMAP
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
#endif`,dg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
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
#endif`,mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,gg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_g=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vg=`#ifdef USE_GRADIENTMAP
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
}`,Mg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wg=`uniform bool receiveShadow;
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
#endif`,bg=`#ifdef USE_ENVMAP
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
#endif`,Eg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ag=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cg=`PhysicalMaterial material;
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
#endif`,Pg=`struct PhysicalMaterial {
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
}`,Dg=`
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
#endif`,Ig=`#if defined( RE_IndirectDiffuse )
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
#endif`,zg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ug=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ng=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Og=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Gg=`#if defined( USE_POINTS_UV )
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
#endif`,Vg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,qg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yg=`#ifdef USE_MORPHTARGETS
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
#endif`,Zg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$g=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,t0=`#ifdef USE_NORMALMAP
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
#endif`,e0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,n0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,i0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,s0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,r0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,o0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,a0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,c0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,l0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,u0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,f0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,p0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,m0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,g0=`float getShadowMask() {
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
}`,x0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_0=`#ifdef USE_SKINNING
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
#endif`,v0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,M0=`#ifdef USE_SKINNING
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
#endif`,y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,S0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,w0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,b0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,E0=`#ifdef USE_TRANSMISSION
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
#endif`,T0=`#ifdef USE_TRANSMISSION
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
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const D0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,I0=`uniform sampler2D t2D;
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
}`,z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,L0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F0=`#include <common>
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
}`,O0=`#if DEPTH_PACKING == 3200
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
}`,B0=`#define DISTANCE
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
}`,k0=`#define DISTANCE
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
}`,G0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,V0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H0=`uniform float scale;
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
}`,W0=`uniform vec3 diffuse;
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
}`,X0=`#include <common>
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
}`,q0=`uniform vec3 diffuse;
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
}`,Y0=`#define LAMBERT
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
}`,Z0=`#define LAMBERT
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
}`,$0=`#define MATCAP
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
}`,K0=`#define MATCAP
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
}`,J0=`#define NORMAL
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
}`,j0=`#define NORMAL
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
}`,Q0=`#define PHONG
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
}`,tx=`#define PHONG
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
}`,ex=`#define STANDARD
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
}`,nx=`#define STANDARD
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
}`,ix=`#define TOON
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
}`,sx=`#define TOON
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
}`,rx=`uniform float size;
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
}`,ox=`uniform vec3 diffuse;
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
}`,ax=`#include <common>
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
}`,cx=`uniform vec3 color;
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
}`,lx=`uniform float rotation;
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
}`,hx=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:Im,alphahash_pars_fragment:zm,alphamap_fragment:Lm,alphamap_pars_fragment:Um,alphatest_fragment:Nm,alphatest_pars_fragment:Fm,aomap_fragment:Om,aomap_pars_fragment:Bm,batching_pars_vertex:km,batching_vertex:Gm,begin_vertex:Vm,beginnormal_vertex:Hm,bsdfs:Wm,iridescence_fragment:Xm,bumpmap_pars_fragment:qm,clipping_planes_fragment:Ym,clipping_planes_pars_fragment:Zm,clipping_planes_pars_vertex:$m,clipping_planes_vertex:Km,color_fragment:Jm,color_pars_fragment:jm,color_pars_vertex:Qm,color_vertex:tg,common:eg,cube_uv_reflection_fragment:ng,defaultnormal_vertex:ig,displacementmap_pars_vertex:sg,displacementmap_vertex:rg,emissivemap_fragment:og,emissivemap_pars_fragment:ag,colorspace_fragment:cg,colorspace_pars_fragment:lg,envmap_fragment:hg,envmap_common_pars_fragment:ug,envmap_pars_fragment:fg,envmap_pars_vertex:dg,envmap_physical_pars_fragment:bg,envmap_vertex:pg,fog_vertex:mg,fog_pars_vertex:gg,fog_fragment:xg,fog_pars_fragment:_g,gradientmap_pars_fragment:vg,lightmap_pars_fragment:Mg,lights_lambert_fragment:yg,lights_lambert_pars_fragment:Sg,lights_pars_begin:wg,lights_toon_fragment:Eg,lights_toon_pars_fragment:Tg,lights_phong_fragment:Ag,lights_phong_pars_fragment:Rg,lights_physical_fragment:Cg,lights_physical_pars_fragment:Pg,lights_fragment_begin:Dg,lights_fragment_maps:Ig,lights_fragment_end:zg,logdepthbuf_fragment:Lg,logdepthbuf_pars_fragment:Ug,logdepthbuf_pars_vertex:Ng,logdepthbuf_vertex:Fg,map_fragment:Og,map_pars_fragment:Bg,map_particle_fragment:kg,map_particle_pars_fragment:Gg,metalnessmap_fragment:Vg,metalnessmap_pars_fragment:Hg,morphinstance_vertex:Wg,morphcolor_vertex:Xg,morphnormal_vertex:qg,morphtarget_pars_vertex:Yg,morphtarget_vertex:Zg,normal_fragment_begin:$g,normal_fragment_maps:Kg,normal_pars_fragment:Jg,normal_pars_vertex:jg,normal_vertex:Qg,normalmap_pars_fragment:t0,clearcoat_normal_fragment_begin:e0,clearcoat_normal_fragment_maps:n0,clearcoat_pars_fragment:i0,iridescence_pars_fragment:s0,opaque_fragment:r0,packing:o0,premultiplied_alpha_fragment:a0,project_vertex:c0,dithering_fragment:l0,dithering_pars_fragment:h0,roughnessmap_fragment:u0,roughnessmap_pars_fragment:f0,shadowmap_pars_fragment:d0,shadowmap_pars_vertex:p0,shadowmap_vertex:m0,shadowmask_pars_fragment:g0,skinbase_vertex:x0,skinning_pars_vertex:_0,skinning_vertex:v0,skinnormal_vertex:M0,specularmap_fragment:y0,specularmap_pars_fragment:S0,tonemapping_fragment:w0,tonemapping_pars_fragment:b0,transmission_fragment:E0,transmission_pars_fragment:T0,uv_pars_fragment:A0,uv_pars_vertex:R0,uv_vertex:C0,worldpos_vertex:P0,background_vert:D0,background_frag:I0,backgroundCube_vert:z0,backgroundCube_frag:L0,cube_vert:U0,cube_frag:N0,depth_vert:F0,depth_frag:O0,distanceRGBA_vert:B0,distanceRGBA_frag:k0,equirect_vert:G0,equirect_frag:V0,linedashed_vert:H0,linedashed_frag:W0,meshbasic_vert:X0,meshbasic_frag:q0,meshlambert_vert:Y0,meshlambert_frag:Z0,meshmatcap_vert:$0,meshmatcap_frag:K0,meshnormal_vert:J0,meshnormal_frag:j0,meshphong_vert:Q0,meshphong_frag:tx,meshphysical_vert:ex,meshphysical_frag:nx,meshtoon_vert:ix,meshtoon_frag:sx,points_vert:rx,points_frag:ox,shadow_vert:ax,shadow_frag:cx,sprite_vert:lx,sprite_frag:hx},vt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Rn={basic:{uniforms:Xe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:Xe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:Xe([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:Xe([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:Xe([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:Xe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:Xe([vt.points,vt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:Xe([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:Xe([vt.common,vt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:Xe([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:Xe([vt.sprite,vt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:Xe([vt.common,vt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:Xe([vt.lights,vt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};Rn.physical={uniforms:Xe([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const Qr={r:0,b:0,g:0},Si=new En,ux=new ee;function fx(i,t,e,n,s,r,o){const a=new Ht(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?e:t).get(_)),_}function x(v){let _=!1;const b=g(v);b===null?p(a,c):b&&b.isColor&&(p(b,1),_=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,_){const b=g(_);b&&(b.isCubeTexture||b.mapping===Ao)?(h===void 0&&(h=new ne(new wn(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:Rs(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,P,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Si.copy(_.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ux.makeRotationFromEuler(Si)),h.material.toneMapped=re.getTransfer(b.colorSpace)!==ue,(u!==b||d!==b.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=b,d=b.version,f=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new ne(new yr(2,2),new pi({name:"BackgroundMaterial",uniforms:Rs(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=re.getTransfer(b.colorSpace)!==ue,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||d!==b.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,d=b.version,f=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,_){v.getRGB(Qr,ef(i)),n.buffers.color.setClear(Qr.r,Qr.g,Qr.b,_,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:x,addToRenderList:m,dispose:M}}function dx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(E,L,G,k,q){let R=!1;const w=u(k,G,L);r!==w&&(r=w,l(r.object)),R=f(E,k,G,q),R&&g(E,k,G,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(R||o)&&(o=!1,_(E,L,G,k),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function c(){return i.createVertexArray()}function l(E){return i.bindVertexArray(E)}function h(E){return i.deleteVertexArray(E)}function u(E,L,G){const k=G.wireframe===!0;let q=n[E.id];q===void 0&&(q={},n[E.id]=q);let R=q[L.id];R===void 0&&(R={},q[L.id]=R);let w=R[k];return w===void 0&&(w=d(c()),R[k]=w),w}function d(E){const L=[],G=[],k=[];for(let q=0;q<e;q++)L[q]=0,G[q]=0,k[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:G,attributeDivisors:k,object:E,attributes:{},index:null}}function f(E,L,G,k){const q=r.attributes,R=L.attributes;let w=0;const U=G.getAttributes();for(const D in U)if(U[D].location>=0){const J=q[D];let N=R[D];if(N===void 0&&(D==="instanceMatrix"&&E.instanceMatrix&&(N=E.instanceMatrix),D==="instanceColor"&&E.instanceColor&&(N=E.instanceColor)),J===void 0||J.attribute!==N||N&&J.data!==N.data)return!0;w++}return r.attributesNum!==w||r.index!==k}function g(E,L,G,k){const q={},R=L.attributes;let w=0;const U=G.getAttributes();for(const D in U)if(U[D].location>=0){let J=R[D];J===void 0&&(D==="instanceMatrix"&&E.instanceMatrix&&(J=E.instanceMatrix),D==="instanceColor"&&E.instanceColor&&(J=E.instanceColor));const N={};N.attribute=J,J&&J.data&&(N.data=J.data),q[D]=N,w++}r.attributes=q,r.attributesNum=w,r.index=k}function x(){const E=r.newAttributes;for(let L=0,G=E.length;L<G;L++)E[L]=0}function m(E){p(E,0)}function p(E,L){const G=r.newAttributes,k=r.enabledAttributes,q=r.attributeDivisors;G[E]=1,k[E]===0&&(i.enableVertexAttribArray(E),k[E]=1),q[E]!==L&&(i.vertexAttribDivisor(E,L),q[E]=L)}function M(){const E=r.newAttributes,L=r.enabledAttributes;for(let G=0,k=L.length;G<k;G++)L[G]!==E[G]&&(i.disableVertexAttribArray(G),L[G]=0)}function v(E,L,G,k,q,R,w){w===!0?i.vertexAttribIPointer(E,L,G,q,R):i.vertexAttribPointer(E,L,G,k,q,R)}function _(E,L,G,k){x();const q=k.attributes,R=G.getAttributes(),w=L.defaultAttributeValues;for(const U in R){const D=R[U];if(D.location>=0){let Z=q[U];if(Z===void 0&&(U==="instanceMatrix"&&E.instanceMatrix&&(Z=E.instanceMatrix),U==="instanceColor"&&E.instanceColor&&(Z=E.instanceColor)),Z!==void 0){const J=Z.normalized,N=Z.itemSize,Q=t.get(Z);if(Q===void 0)continue;const Mt=Q.buffer,xt=Q.type,tt=Q.bytesPerElement,B=xt===i.INT||xt===i.UNSIGNED_INT||Z.gpuType===Jc;if(Z.isInterleavedBufferAttribute){const W=Z.data,nt=W.stride,ot=Z.offset;if(W.isInstancedInterleavedBuffer){for(let it=0;it<D.locationSize;it++)p(D.location+it,W.meshPerAttribute);E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let it=0;it<D.locationSize;it++)m(D.location+it);i.bindBuffer(i.ARRAY_BUFFER,Mt);for(let it=0;it<D.locationSize;it++)v(D.location+it,N/D.locationSize,xt,J,nt*tt,(ot+N/D.locationSize*it)*tt,B)}else{if(Z.isInstancedBufferAttribute){for(let W=0;W<D.locationSize;W++)p(D.location+W,Z.meshPerAttribute);E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let W=0;W<D.locationSize;W++)m(D.location+W);i.bindBuffer(i.ARRAY_BUFFER,Mt);for(let W=0;W<D.locationSize;W++)v(D.location+W,N/D.locationSize,xt,J,N*tt,N/D.locationSize*W*tt,B)}}else if(w!==void 0){const J=w[U];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(D.location,J);break;case 3:i.vertexAttrib3fv(D.location,J);break;case 4:i.vertexAttrib4fv(D.location,J);break;default:i.vertexAttrib1fv(D.location,J)}}}}M()}function b(){F();for(const E in n){const L=n[E];for(const G in L){const k=L[G];for(const q in k)h(k[q].object),delete k[q];delete L[G]}delete n[E]}}function A(E){if(n[E.id]===void 0)return;const L=n[E.id];for(const G in L){const k=L[G];for(const q in k)h(k[q].object),delete k[q];delete L[G]}delete n[E.id]}function P(E){for(const L in n){const G=n[L];if(G[E.id]===void 0)continue;const k=G[E.id];for(const q in k)h(k[q].object),delete k[q];delete G[E.id]}}function F(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:F,resetDefaultState:S,dispose:b,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function px(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)o(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function mx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==Sn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const F=P===Mr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Ln&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Pn&&!F)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:b,maxSamples:A}}function gx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new si,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,v=M*4;let _=p.clippingState||null;c.value=_,_=h(g,d,v,f);for(let b=0;b!==v;++b)_[b]=e[b];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,_=f;v!==x;++v,_+=4)o.copy(u[v]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function xx(i){let t=new WeakMap;function e(o,a){return a===Qa?o.mapping=Es:a===tc&&(o.mapping=Ts),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Qa||a===tc)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Dp(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ms=4,Dh=[.125,.215,.35,.446,.526,.582],Ai=20,ya=new Po,Ih=new Ht;let Sa=null,wa=0,ba=0,Ea=!1;const bi=(1+Math.sqrt(5))/2,fs=1/bi,zh=[new I(-bi,fs,0),new I(bi,fs,0),new I(-fs,0,bi),new I(fs,0,bi),new I(0,bi,-fs),new I(0,bi,fs),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)],_x=new I;class Lh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=_x}=r;Sa=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Sa,wa,ba),this._renderer.xr.enabled=Ea,t.scissorTest=!1,to(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Es||t.mapping===Ts?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sa=this._renderer.getRenderTarget(),wa=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:Mr,format:Sn,colorSpace:As,depthBuffer:!1},s=Uh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vx(r)),this._blurMaterial=Mx(r,t,e)}return s}_compileMaterial(t){const e=new ne(this._lodPlanes[0],t);this._renderer.compile(e,ya)}_sceneToCubeUV(t,e,n,s,r){const c=new Mn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ih),u.toneMapping=hi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const x=new nn({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),m=new ne(new wn,x);let p=!1;const M=t.background;M?M.isColor&&(x.color.copy(M),t.background=null,p=!0):(x.color.copy(Ih),p=!0);for(let v=0;v<6;v++){const _=v%3;_===0?(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[v],r.y,r.z)):_===1?(c.up.set(0,0,l[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[v],r.z)):(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[v]));const b=this._cubeSize;to(s,_*b,v>2?b:0,b,b),u.setRenderTarget(s),p&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Es||t.mapping===Ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;to(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,ya)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zh[(s-r-1)%zh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ne(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ai-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ai;m>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ai}`);const p=[];let M=0;for(let P=0;P<Ai;++P){const F=P/x,S=Math.exp(-F*F/2);p.push(S),P===0?M+=S:P<m&&(M+=2*S)}for(let P=0;P<p.length;P++)p[P]=p[P]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const _=this._sizeLods[s],b=3*_*(s>v-ms?s-v+ms:0),A=4*(this._cubeSize-_);to(e,b,A,3*_,2*_),c.setRenderTarget(e),c.render(u,ya)}}function vx(i){const t=[],e=[],n=[];let s=i;const r=i-ms+1+Dh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ms?c=Dh[o-i+ms-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,M=new Float32Array(x*g*f),v=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let A=0;A<f;A++){const P=A%3*2/3-1,F=A>2?0:-1,S=[P,F,0,P+2/3,F,0,P+2/3,F+1,0,P,F,0,P+2/3,F+1,0,P,F+1,0];M.set(S,x*g*A),v.set(d,m*g*A);const E=[A,A,A,A,A,A];_.set(E,p*g*A)}const b=new _e;b.setAttribute("position",new Ge(M,x)),b.setAttribute("uv",new Ge(v,m)),b.setAttribute("faceIndex",new Ge(_,p)),t.push(b),s>ms&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Uh(i,t,e){const n=new Ui(i,t,e);return n.texture.mapping=Ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function to(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Mx(i,t,e){const n=new Float32Array(Ai),s=new I(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ul(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Nh(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ul(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function Fh(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function ul(){return`

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
	`}function yx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Qa||c===tc,h=c===Es||c===Ts;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Lh(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Lh(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Sx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&hr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function wx(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function l(u){const d=[],f=u.index,g=u.attributes.position;let x=0;if(f!==null){const M=f.array;x=f.version;for(let v=0,_=M.length;v<_;v+=3){const b=M[v+0],A=M[v+1],P=M[v+2];d.push(b,A,A,P,P,b)}}else if(g!==void 0){const M=g.array;x=g.version;for(let v=0,_=M.length/3-1;v<_;v+=3){const b=v+0,A=v+1,P=v+2;d.push(b,A,A,P,P,b)}}else return;const m=new(Zu(d)?tf:Qu)(d,1);m.version=x;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function bx(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}function u(d,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*x[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Ex(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tx(i,t,e){const n=new WeakMap,s=new Te;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;f===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let _=a.attributes.position.count*v,b=1;_>t.maxTextureSize&&(b=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const A=new Float32Array(_*b*4*u),P=new $u(A,_,b,u);P.type=Pn,P.needsUpdate=!0;const F=v*4;for(let E=0;E<u;E++){const L=m[E],G=p[E],k=M[E],q=_*b*4*E;for(let R=0;R<L.count;R++){const w=R*F;f===!0&&(s.fromBufferAttribute(L,R),A[q+w+0]=s.x,A[q+w+1]=s.y,A[q+w+2]=s.z,A[q+w+3]=0),g===!0&&(s.fromBufferAttribute(G,R),A[q+w+4]=s.x,A[q+w+5]=s.y,A[q+w+6]=s.z,A[q+w+7]=0),x===!0&&(s.fromBufferAttribute(k,R),A[q+w+8]=s.x,A[q+w+9]=s.y,A[q+w+10]=s.z,A[q+w+11]=k.itemSize===4?s.w:1)}}d={count:u,texture:P,size:new bt(_,b)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];const g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Ax(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const Sf=new ke,Oh=new lf(1,1),wf=new $u,bf=new pp,Ef=new sf,Bh=[],kh=[],Gh=new Float32Array(16),Vh=new Float32Array(9),Hh=new Float32Array(4);function Ls(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Bh[s];if(r===void 0&&(r=new Float32Array(s),Bh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ie(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ze(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Do(i,t){let e=kh[t];e===void 0&&(e=new Int32Array(t),kh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Rx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Cx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2fv(this.addr,t),ze(e,t)}}function Px(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;i.uniform3fv(this.addr,t),ze(e,t)}}function Dx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4fv(this.addr,t),ze(e,t)}}function Ix(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Ie(e,n))return;Hh.set(n),i.uniformMatrix2fv(this.addr,!1,Hh),ze(e,n)}}function zx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Ie(e,n))return;Vh.set(n),i.uniformMatrix3fv(this.addr,!1,Vh),ze(e,n)}}function Lx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Ie(e,n))return;Gh.set(n),i.uniformMatrix4fv(this.addr,!1,Gh),ze(e,n)}}function Ux(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Nx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2iv(this.addr,t),ze(e,t)}}function Fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3iv(this.addr,t),ze(e,t)}}function Ox(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4iv(this.addr,t),ze(e,t)}}function Bx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2uiv(this.addr,t),ze(e,t)}}function Gx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3uiv(this.addr,t),ze(e,t)}}function Vx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4uiv(this.addr,t),ze(e,t)}}function Hx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Oh.compareFunction=Yu,r=Oh):r=Sf,e.setTexture2D(t||r,s)}function Wx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||bf,s)}function Xx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ef,s)}function qx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wf,s)}function Yx(i){switch(i){case 5126:return Rx;case 35664:return Cx;case 35665:return Px;case 35666:return Dx;case 35674:return Ix;case 35675:return zx;case 35676:return Lx;case 5124:case 35670:return Ux;case 35667:case 35671:return Nx;case 35668:case 35672:return Fx;case 35669:case 35673:return Ox;case 5125:return Bx;case 36294:return kx;case 36295:return Gx;case 36296:return Vx;case 35678:case 36198:case 36298:case 36306:case 35682:return Hx;case 35679:case 36299:case 36307:return Wx;case 35680:case 36300:case 36308:case 36293:return Xx;case 36289:case 36303:case 36311:case 36292:return qx}}function Zx(i,t){i.uniform1fv(this.addr,t)}function $x(i,t){const e=Ls(t,this.size,2);i.uniform2fv(this.addr,e)}function Kx(i,t){const e=Ls(t,this.size,3);i.uniform3fv(this.addr,e)}function Jx(i,t){const e=Ls(t,this.size,4);i.uniform4fv(this.addr,e)}function jx(i,t){const e=Ls(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Qx(i,t){const e=Ls(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function t_(i,t){const e=Ls(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function e_(i,t){i.uniform1iv(this.addr,t)}function n_(i,t){i.uniform2iv(this.addr,t)}function i_(i,t){i.uniform3iv(this.addr,t)}function s_(i,t){i.uniform4iv(this.addr,t)}function r_(i,t){i.uniform1uiv(this.addr,t)}function o_(i,t){i.uniform2uiv(this.addr,t)}function a_(i,t){i.uniform3uiv(this.addr,t)}function c_(i,t){i.uniform4uiv(this.addr,t)}function l_(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Sf,r[o])}function h_(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||bf,r[o])}function u_(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ef,r[o])}function f_(i,t,e){const n=this.cache,s=t.length,r=Do(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),ze(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||wf,r[o])}function d_(i){switch(i){case 5126:return Zx;case 35664:return $x;case 35665:return Kx;case 35666:return Jx;case 35674:return jx;case 35675:return Qx;case 35676:return t_;case 5124:case 35670:return e_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return s_;case 5125:return r_;case 36294:return o_;case 36295:return a_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return h_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return f_}}class p_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Yx(e.type)}}class m_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=d_(e.type)}}class g_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ta=/(\w+)(\])?(\[|\.)?/g;function Wh(i,t){i.seq.push(t),i.map[t.id]=t}function x_(i,t,e){const n=i.name,s=n.length;for(Ta.lastIndex=0;;){const r=Ta.exec(n),o=Ta.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Wh(e,l===void 0?new p_(a,i,t):new m_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new g_(a),Wh(e,u)),e=u}}}class uo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);x_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Xh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const __=37297;let v_=0;function M_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const qh=new Zt;function y_(i){re._getMatrix(qh,re.workingColorSpace,i);const t=`mat3( ${qh.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case mo:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Yh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+M_(i.getShaderSource(t),a)}else return r}function S_(i,t){const e=y_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function w_(i,t){let e;switch(t){case Hd:e="Linear";break;case Wd:e="Reinhard";break;case Xd:e="Cineon";break;case Fu:e="ACESFilmic";break;case Yd:e="AgX";break;case Zd:e="Neutral";break;case qd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const eo=new I;function b_(){re.getLuminanceCoefficients(eo);const i=eo.x.toFixed(4),t=eo.y.toFixed(4),e=eo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Js).join(`
`)}function T_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function A_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Js(i){return i!==""}function Zh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $h(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const R_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uc(i){return i.replace(R_,P_)}const C_=new Map;function P_(i,t){let e=Kt[t];if(e===void 0){const n=C_.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Uc(e)}const D_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kh(i){return i.replace(D_,I_)}function I_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Jh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function z_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Uu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function L_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Es:case Ts:t="ENVMAP_TYPE_CUBE";break;case Ao:t="ENVMAP_TYPE_CUBE_UV";break}return t}function U_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ts:t="ENVMAP_MODE_REFRACTION";break}return t}function N_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Nu:t="ENVMAP_BLENDING_MULTIPLY";break;case Gd:t="ENVMAP_BLENDING_MIX";break;case Vd:t="ENVMAP_BLENDING_ADD";break}return t}function F_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function O_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=z_(e),l=L_(e),h=U_(e),u=N_(e),d=F_(e),f=E_(e),g=T_(r),x=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Js).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Js).join(`
`),p.length>0&&(p+=`
`)):(m=[Jh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Js).join(`
`),p=[Jh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hi?"#define TONE_MAPPING":"",e.toneMapping!==hi?Kt.tonemapping_pars_fragment:"",e.toneMapping!==hi?w_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,S_("linearToOutputTexel",e.outputColorSpace),b_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Js).join(`
`)),o=Uc(o),o=Zh(o,e),o=$h(o,e),a=Uc(a),a=Zh(a,e),a=$h(a,e),o=Kh(o),a=Kh(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===$l?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===$l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=M+m+o,_=M+p+a,b=Xh(s,s.VERTEX_SHADER,v),A=Xh(s,s.FRAGMENT_SHADER,_);s.attachShader(x,b),s.attachShader(x,A),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(L){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(x)||"",k=s.getShaderInfoLog(b)||"",q=s.getShaderInfoLog(A)||"",R=G.trim(),w=k.trim(),U=q.trim();let D=!0,Z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(D=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,b,A);else{const J=Yh(s,b,"vertex"),N=Yh(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+R+`
`+J+`
`+N)}else R!==""?console.warn("THREE.WebGLProgram: Program Info Log:",R):(w===""||U==="")&&(Z=!1);Z&&(L.diagnostics={runnable:D,programLog:R,vertexShader:{log:w,prefix:m},fragmentShader:{log:U,prefix:p}})}s.deleteShader(b),s.deleteShader(A),F=new uo(s,x),S=A_(s,x)}let F;this.getUniforms=function(){return F===void 0&&P(this),F};let S;this.getAttributes=function(){return S===void 0&&P(this),S};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(x,__)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=A,this}let B_=0;class k_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new G_(t),e.set(t,n)),n}}class G_{constructor(t){this.id=B_++,this.code=t,this.usedTimes=0}}function V_(i,t,e,n,s,r,o){const a=new Ju,c=new k_,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,E,L,G,k){const q=G.fog,R=k.geometry,w=S.isMeshStandardMaterial?G.environment:null,U=(S.isMeshStandardMaterial?e:t).get(S.envMap||w),D=U&&U.mapping===Ao?U.image.height:null,Z=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const J=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,N=J!==void 0?J.length:0;let Q=0;R.morphAttributes.position!==void 0&&(Q=1),R.morphAttributes.normal!==void 0&&(Q=2),R.morphAttributes.color!==void 0&&(Q=3);let Mt,xt,tt,B;if(Z){const ce=Rn[Z];Mt=ce.vertexShader,xt=ce.fragmentShader}else Mt=S.vertexShader,xt=S.fragmentShader,c.update(S),tt=c.getVertexShaderID(S),B=c.getFragmentShaderID(S);const W=i.getRenderTarget(),nt=i.state.buffers.depth.getReversed(),ot=k.isInstancedMesh===!0,it=k.isBatchedMesh===!0,Tt=!!S.map,Gt=!!S.matcap,z=!!U,jt=!!S.aoMap,Lt=!!S.lightMap,Dt=!!S.bumpMap,wt=!!S.normalMap,Qt=!!S.displacementMap,St=!!S.emissiveMap,Ft=!!S.metalnessMap,ge=!!S.roughnessMap,de=S.anisotropy>0,C=S.clearcoat>0,y=S.dispersion>0,X=S.iridescence>0,et=S.sheen>0,$=S.transmission>0,Y=de&&!!S.anisotropyMap,ft=C&&!!S.clearcoatMap,rt=C&&!!S.clearcoatNormalMap,_t=C&&!!S.clearcoatRoughnessMap,gt=X&&!!S.iridescenceMap,at=X&&!!S.iridescenceThicknessMap,dt=et&&!!S.sheenColorMap,Ut=et&&!!S.sheenRoughnessMap,Rt=!!S.specularMap,pt=!!S.specularColorMap,Xt=!!S.specularIntensityMap,O=$&&!!S.transmissionMap,ht=$&&!!S.thicknessMap,ut=!!S.gradientMap,At=!!S.alphaMap,ct=S.alphaTest>0,st=!!S.alphaHash,Pt=!!S.extensions;let qt=hi;S.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(qt=i.toneMapping);const me={shaderID:Z,shaderType:S.type,shaderName:S.name,vertexShader:Mt,fragmentShader:xt,defines:S.defines,customVertexShaderID:tt,customFragmentShaderID:B,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:it,batchingColor:it&&k._colorsTexture!==null,instancing:ot,instancingColor:ot&&k.instanceColor!==null,instancingMorph:ot&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:W===null?i.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:As,alphaToCoverage:!!S.alphaToCoverage,map:Tt,matcap:Gt,envMap:z,envMapMode:z&&U.mapping,envMapCubeUVHeight:D,aoMap:jt,lightMap:Lt,bumpMap:Dt,normalMap:wt,displacementMap:d&&Qt,emissiveMap:St,normalMapObjectSpace:wt&&S.normalMapType===jd,normalMapTangentSpace:wt&&S.normalMapType===qu,metalnessMap:Ft,roughnessMap:ge,anisotropy:de,anisotropyMap:Y,clearcoat:C,clearcoatMap:ft,clearcoatNormalMap:rt,clearcoatRoughnessMap:_t,dispersion:y,iridescence:X,iridescenceMap:gt,iridescenceThicknessMap:at,sheen:et,sheenColorMap:dt,sheenRoughnessMap:Ut,specularMap:Rt,specularColorMap:pt,specularIntensityMap:Xt,transmission:$,transmissionMap:O,thicknessMap:ht,gradientMap:ut,opaque:S.transparent===!1&&S.blending===_s&&S.alphaToCoverage===!1,alphaMap:At,alphaTest:ct,alphaHash:st,combine:S.combine,mapUv:Tt&&x(S.map.channel),aoMapUv:jt&&x(S.aoMap.channel),lightMapUv:Lt&&x(S.lightMap.channel),bumpMapUv:Dt&&x(S.bumpMap.channel),normalMapUv:wt&&x(S.normalMap.channel),displacementMapUv:Qt&&x(S.displacementMap.channel),emissiveMapUv:St&&x(S.emissiveMap.channel),metalnessMapUv:Ft&&x(S.metalnessMap.channel),roughnessMapUv:ge&&x(S.roughnessMap.channel),anisotropyMapUv:Y&&x(S.anisotropyMap.channel),clearcoatMapUv:ft&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:rt&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:gt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:at&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&x(S.sheenRoughnessMap.channel),specularMapUv:Rt&&x(S.specularMap.channel),specularColorMapUv:pt&&x(S.specularColorMap.channel),specularIntensityMapUv:Xt&&x(S.specularIntensityMap.channel),transmissionMapUv:O&&x(S.transmissionMap.channel),thicknessMapUv:ht&&x(S.thicknessMap.channel),alphaMapUv:At&&x(S.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(wt||de),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!R.attributes.uv&&(Tt||At),fog:!!q,useFog:S.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:nt,skinning:k.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:Q,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:qt,decodeVideoTexture:Tt&&S.map.isVideoTexture===!0&&re.getTransfer(S.map.colorSpace)===ue,decodeVideoTextureEmissive:St&&S.emissiveMap.isVideoTexture===!0&&re.getTransfer(S.emissiveMap.colorSpace)===ue,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Re,flipSided:S.side===$e,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Pt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&S.extensions.multiDraw===!0||it)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return me.vertexUv1s=l.has(1),me.vertexUv2s=l.has(2),me.vertexUv3s=l.has(3),l.clear(),me}function p(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)E.push(L),E.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(M(E,S),v(E,S),E.push(i.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function M(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function v(S,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),E.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const E=g[S.type];let L;if(E){const G=Rn[E];L=Ap.clone(G.uniforms)}else L=S.uniforms;return L}function b(S,E){let L;for(let G=0,k=h.length;G<k;G++){const q=h[G];if(q.cacheKey===E){L=q,++L.usedTimes;break}}return L===void 0&&(L=new O_(i,E,S,r),h.push(L)),L}function A(S){if(--S.usedTimes===0){const E=h.indexOf(S);h[E]=h[h.length-1],h.pop(),S.destroy()}}function P(S){c.remove(S)}function F(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:b,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:F}}function H_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function W_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function jh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Qh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,x,m){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),t++,p}function a(u,d,f,g,x,m){const p=o(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,g,x,m){const p=o(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||W_),n.length>1&&n.sort(d||jh),s.length>1&&s.sort(d||jh)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function X_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Qh,i.set(n,[o])):s>=r.length?(o=new Qh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function q_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Ht};break;case"SpotLight":e={position:new I,direction:new I,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function Y_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Z_=0;function $_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function K_(i){const t=new q_,e=Y_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const s=new I,r=new ee,o=new ee;function a(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,M=0,v=0,_=0,b=0,A=0,P=0;l.sort($_);for(let S=0,E=l.length;S<E;S++){const L=l[S],G=L.color,k=L.intensity,q=L.distance,R=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=G.r*k,u+=G.g*k,d+=G.b*k;else if(L.isLightProbe){for(let w=0;w<9;w++)n.probe[w].addScaledVector(L.sh.coefficients[w],k);P++}else if(L.isDirectionalLight){const w=t.get(L);if(w.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const U=L.shadow,D=e.get(L);D.shadowIntensity=U.intensity,D.shadowBias=U.bias,D.shadowNormalBias=U.normalBias,D.shadowRadius=U.radius,D.shadowMapSize=U.mapSize,n.directionalShadow[f]=D,n.directionalShadowMap[f]=R,n.directionalShadowMatrix[f]=L.shadow.matrix,M++}n.directional[f]=w,f++}else if(L.isSpotLight){const w=t.get(L);w.position.setFromMatrixPosition(L.matrixWorld),w.color.copy(G).multiplyScalar(k),w.distance=q,w.coneCos=Math.cos(L.angle),w.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),w.decay=L.decay,n.spot[x]=w;const U=L.shadow;if(L.map&&(n.spotLightMap[b]=L.map,b++,U.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[x]=U.matrix,L.castShadow){const D=e.get(L);D.shadowIntensity=U.intensity,D.shadowBias=U.bias,D.shadowNormalBias=U.normalBias,D.shadowRadius=U.radius,D.shadowMapSize=U.mapSize,n.spotShadow[x]=D,n.spotShadowMap[x]=R,_++}x++}else if(L.isRectAreaLight){const w=t.get(L);w.color.copy(G).multiplyScalar(k),w.halfWidth.set(L.width*.5,0,0),w.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=w,m++}else if(L.isPointLight){const w=t.get(L);if(w.color.copy(L.color).multiplyScalar(L.intensity),w.distance=L.distance,w.decay=L.decay,L.castShadow){const U=L.shadow,D=e.get(L);D.shadowIntensity=U.intensity,D.shadowBias=U.bias,D.shadowNormalBias=U.normalBias,D.shadowRadius=U.radius,D.shadowMapSize=U.mapSize,D.shadowCameraNear=U.camera.near,D.shadowCameraFar=U.camera.far,n.pointShadow[g]=D,n.pointShadowMap[g]=R,n.pointShadowMatrix[g]=L.shadow.matrix,v++}n.point[g]=w,g++}else if(L.isHemisphereLight){const w=t.get(L);w.skyColor.copy(L.color).multiplyScalar(k),w.groundColor.copy(L.groundColor).multiplyScalar(k),n.hemi[p]=w,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=vt.LTC_FLOAT_1,n.rectAreaLTC2=vt.LTC_FLOAT_2):(n.rectAreaLTC1=vt.LTC_HALF_1,n.rectAreaLTC2=vt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const F=n.hash;(F.directionalLength!==f||F.pointLength!==g||F.spotLength!==x||F.rectAreaLength!==m||F.hemiLength!==p||F.numDirectionalShadows!==M||F.numPointShadows!==v||F.numSpotShadows!==_||F.numSpotMaps!==b||F.numLightProbes!==P)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+b-A,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=P,F.directionalLength=f,F.pointLength=g,F.spotLength=x,F.rectAreaLength=m,F.hemiLength=p,F.numDirectionalShadows=M,F.numPointShadows=v,F.numSpotShadows=_,F.numSpotMaps=b,F.numLightProbes=P,n.version=Z_++)}function c(l,h){let u=0,d=0,f=0,g=0,x=0;const m=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const v=l[p];if(v.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(v.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(v.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function tu(i){const t=new K_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function J_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new tu(i),t.set(s,[a])):r>=o.length?(a=new tu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const j_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Q_=`uniform sampler2D shadow_pass;
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
}`;function tv(i,t,e){let n=new Ro;const s=new bt,r=new bt,o=new Te,a=new Mm({depthPacking:Jd}),c=new ym,l={},h=e.maxTextureSize,u={[di]:$e,[$e]:di,[Re]:Re},d=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:j_,fragmentShader:Q_}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new _e;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ne(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lu;let p=this.type;this.render=function(A,P,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),E=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),G=i.state;G.setBlending(li),G.buffers.depth.getReversed()===!0?G.buffers.color.setClear(0,0,0,0):G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const k=p!==Wn&&this.type===Wn,q=p===Wn&&this.type!==Wn;for(let R=0,w=A.length;R<w;R++){const U=A[R],D=U.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const Z=D.getFrameExtents();if(s.multiply(Z),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Z.x),s.x=r.x*Z.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Z.y),s.y=r.y*Z.y,D.mapSize.y=r.y)),D.map===null||k===!0||q===!0){const N=this.type!==Wn?{minFilter:an,magFilter:an}:{};D.map!==null&&D.map.dispose(),D.map=new Ui(s.x,s.y,N),D.map.texture.name=U.name+".shadowMap",D.camera.updateProjectionMatrix()}i.setRenderTarget(D.map),i.clear();const J=D.getViewportCount();for(let N=0;N<J;N++){const Q=D.getViewport(N);o.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),G.viewport(o),D.updateMatrices(U,N),n=D.getFrustum(),_(P,F,D.camera,U,this.type)}D.isPointLightShadow!==!0&&this.type===Wn&&M(D,F),D.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,E,L)};function M(A,P){const F=t.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ui(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,F,d,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,F,f,x,null)}function v(A,P,F,S){let E=null;const L=F.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)E=L;else if(E=F.isPointLight===!0?c:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const G=E.uuid,k=P.uuid;let q=l[G];q===void 0&&(q={},l[G]=q);let R=q[k];R===void 0&&(R=E.clone(),q[k]=R,P.addEventListener("dispose",b)),E=R}if(E.visible=P.visible,E.wireframe=P.wireframe,S===Wn?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:u[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,F.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const G=i.properties.get(E);G.light=F}return E}function _(A,P,F,S,E){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&E===Wn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,A.matrixWorld);const k=t.update(A),q=A.material;if(Array.isArray(q)){const R=k.groups;for(let w=0,U=R.length;w<U;w++){const D=R[w],Z=q[D.materialIndex];if(Z&&Z.visible){const J=v(A,Z,S,E);A.onBeforeShadow(i,A,P,F,k,J,D),i.renderBufferDirect(F,null,k,J,A,D),A.onAfterShadow(i,A,P,F,k,J,D)}}}else if(q.visible){const R=v(A,q,S,E);A.onBeforeShadow(i,A,P,F,k,R,null),i.renderBufferDirect(F,null,k,R,A,null),A.onAfterShadow(i,A,P,F,k,R,null)}}const G=A.children;for(let k=0,q=G.length;k<q;k++)_(G[k],P,F,S,E)}function b(A){A.target.removeEventListener("dispose",b);for(const F in l){const S=l[F],E=A.target.uuid;E in S&&(S[E].dispose(),delete S[E])}}}const ev={[qa]:Ya,[Za]:Ja,[$a]:ja,[bs]:Ka,[Ya]:qa,[Ja]:Za,[ja]:$a,[Ka]:bs};function nv(i,t){function e(){let O=!1;const ht=new Te;let ut=null;const At=new Te(0,0,0,0);return{setMask:function(ct){ut!==ct&&!O&&(i.colorMask(ct,ct,ct,ct),ut=ct)},setLocked:function(ct){O=ct},setClear:function(ct,st,Pt,qt,me){me===!0&&(ct*=qt,st*=qt,Pt*=qt),ht.set(ct,st,Pt,qt),At.equals(ht)===!1&&(i.clearColor(ct,st,Pt,qt),At.copy(ht))},reset:function(){O=!1,ut=null,At.set(-1,0,0,0)}}}function n(){let O=!1,ht=!1,ut=null,At=null,ct=null;return{setReversed:function(st){if(ht!==st){const Pt=t.get("EXT_clip_control");st?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),ht=st;const qt=ct;ct=null,this.setClear(qt)}},getReversed:function(){return ht},setTest:function(st){st?W(i.DEPTH_TEST):nt(i.DEPTH_TEST)},setMask:function(st){ut!==st&&!O&&(i.depthMask(st),ut=st)},setFunc:function(st){if(ht&&(st=ev[st]),At!==st){switch(st){case qa:i.depthFunc(i.NEVER);break;case Ya:i.depthFunc(i.ALWAYS);break;case Za:i.depthFunc(i.LESS);break;case bs:i.depthFunc(i.LEQUAL);break;case $a:i.depthFunc(i.EQUAL);break;case Ka:i.depthFunc(i.GEQUAL);break;case Ja:i.depthFunc(i.GREATER);break;case ja:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}At=st}},setLocked:function(st){O=st},setClear:function(st){ct!==st&&(ht&&(st=1-st),i.clearDepth(st),ct=st)},reset:function(){O=!1,ut=null,At=null,ct=null,ht=!1}}}function s(){let O=!1,ht=null,ut=null,At=null,ct=null,st=null,Pt=null,qt=null,me=null;return{setTest:function(ce){O||(ce?W(i.STENCIL_TEST):nt(i.STENCIL_TEST))},setMask:function(ce){ht!==ce&&!O&&(i.stencilMask(ce),ht=ce)},setFunc:function(ce,Fn,Tn){(ut!==ce||At!==Fn||ct!==Tn)&&(i.stencilFunc(ce,Fn,Tn),ut=ce,At=Fn,ct=Tn)},setOp:function(ce,Fn,Tn){(st!==ce||Pt!==Fn||qt!==Tn)&&(i.stencilOp(ce,Fn,Tn),st=ce,Pt=Fn,qt=Tn)},setLocked:function(ce){O=ce},setClear:function(ce){me!==ce&&(i.clearStencil(ce),me=ce)},reset:function(){O=!1,ht=null,ut=null,At=null,ct=null,st=null,Pt=null,qt=null,me=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,v=null,_=null,b=null,A=null,P=new Ht(0,0,0),F=0,S=!1,E=null,L=null,G=null,k=null,q=null;const R=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let w=!1,U=0;const D=i.getParameter(i.VERSION);D.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(D)[1]),w=U>=1):D.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),w=U>=2);let Z=null,J={};const N=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),Mt=new Te().fromArray(N),xt=new Te().fromArray(Q);function tt(O,ht,ut,At){const ct=new Uint8Array(4),st=i.createTexture();i.bindTexture(O,st),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<ut;Pt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,At,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(ht+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return st}const B={};B[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),B[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),B[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),B[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),W(i.DEPTH_TEST),o.setFunc(bs),Dt(!1),wt(Wl),W(i.CULL_FACE),jt(li);function W(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function nt(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function ot(O,ht){return u[O]!==ht?(i.bindFramebuffer(O,ht),u[O]=ht,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ht),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function it(O,ht){let ut=f,At=!1;if(O){ut=d.get(ht),ut===void 0&&(ut=[],d.set(ht,ut));const ct=O.textures;if(ut.length!==ct.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let st=0,Pt=ct.length;st<Pt;st++)ut[st]=i.COLOR_ATTACHMENT0+st;ut.length=ct.length,At=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,At=!0);At&&i.drawBuffers(ut)}function Tt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}const Gt={[Ti]:i.FUNC_ADD,[bd]:i.FUNC_SUBTRACT,[Ed]:i.FUNC_REVERSE_SUBTRACT};Gt[Td]=i.MIN,Gt[Ad]=i.MAX;const z={[Rd]:i.ZERO,[Cd]:i.ONE,[Pd]:i.SRC_COLOR,[Wa]:i.SRC_ALPHA,[Nd]:i.SRC_ALPHA_SATURATE,[Ld]:i.DST_COLOR,[Id]:i.DST_ALPHA,[Dd]:i.ONE_MINUS_SRC_COLOR,[Xa]:i.ONE_MINUS_SRC_ALPHA,[Ud]:i.ONE_MINUS_DST_COLOR,[zd]:i.ONE_MINUS_DST_ALPHA,[Fd]:i.CONSTANT_COLOR,[Od]:i.ONE_MINUS_CONSTANT_COLOR,[Bd]:i.CONSTANT_ALPHA,[kd]:i.ONE_MINUS_CONSTANT_ALPHA};function jt(O,ht,ut,At,ct,st,Pt,qt,me,ce){if(O===li){x===!0&&(nt(i.BLEND),x=!1);return}if(x===!1&&(W(i.BLEND),x=!0),O!==wd){if(O!==m||ce!==S){if((p!==Ti||_!==Ti)&&(i.blendEquation(i.FUNC_ADD),p=Ti,_=Ti),ce)switch(O){case _s:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xl:i.blendFunc(i.ONE,i.ONE);break;case ql:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case _s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case ql:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,v=null,b=null,A=null,P.set(0,0,0),F=0,m=O,S=ce}return}ct=ct||ht,st=st||ut,Pt=Pt||At,(ht!==p||ct!==_)&&(i.blendEquationSeparate(Gt[ht],Gt[ct]),p=ht,_=ct),(ut!==M||At!==v||st!==b||Pt!==A)&&(i.blendFuncSeparate(z[ut],z[At],z[st],z[Pt]),M=ut,v=At,b=st,A=Pt),(qt.equals(P)===!1||me!==F)&&(i.blendColor(qt.r,qt.g,qt.b,me),P.copy(qt),F=me),m=O,S=!1}function Lt(O,ht){O.side===Re?nt(i.CULL_FACE):W(i.CULL_FACE);let ut=O.side===$e;ht&&(ut=!ut),Dt(ut),O.blending===_s&&O.transparent===!1?jt(li):jt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const At=O.stencilWrite;a.setTest(At),At&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),St(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?W(i.SAMPLE_ALPHA_TO_COVERAGE):nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(O){E!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),E=O)}function wt(O){O!==yd?(W(i.CULL_FACE),O!==L&&(O===Wl?i.cullFace(i.BACK):O===Sd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):nt(i.CULL_FACE),L=O}function Qt(O){O!==G&&(w&&i.lineWidth(O),G=O)}function St(O,ht,ut){O?(W(i.POLYGON_OFFSET_FILL),(k!==ht||q!==ut)&&(i.polygonOffset(ht,ut),k=ht,q=ut)):nt(i.POLYGON_OFFSET_FILL)}function Ft(O){O?W(i.SCISSOR_TEST):nt(i.SCISSOR_TEST)}function ge(O){O===void 0&&(O=i.TEXTURE0+R-1),Z!==O&&(i.activeTexture(O),Z=O)}function de(O,ht,ut){ut===void 0&&(Z===null?ut=i.TEXTURE0+R-1:ut=Z);let At=J[ut];At===void 0&&(At={type:void 0,texture:void 0},J[ut]=At),(At.type!==O||At.texture!==ht)&&(Z!==ut&&(i.activeTexture(ut),Z=ut),i.bindTexture(O,ht||B[O]),At.type=O,At.texture=ht)}function C(){const O=J[Z];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function X(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Y(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function rt(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _t(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function gt(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function dt(O){Mt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Mt.copy(O))}function Ut(O){xt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),xt.copy(O))}function Rt(O,ht){let ut=l.get(ht);ut===void 0&&(ut=new WeakMap,l.set(ht,ut));let At=ut.get(O);At===void 0&&(At=i.getUniformBlockIndex(ht,O.name),ut.set(O,At))}function pt(O,ht){const At=l.get(ht).get(O);c.get(ht)!==At&&(i.uniformBlockBinding(ht,At,O.__bindingPointIndex),c.set(ht,At))}function Xt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Z=null,J={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,M=null,v=null,_=null,b=null,A=null,P=new Ht(0,0,0),F=0,S=!1,E=null,L=null,G=null,k=null,q=null,Mt.set(0,0,i.canvas.width,i.canvas.height),xt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:W,disable:nt,bindFramebuffer:ot,drawBuffers:it,useProgram:Tt,setBlending:jt,setMaterial:Lt,setFlipSided:Dt,setCullFace:wt,setLineWidth:Qt,setPolygonOffset:St,setScissorTest:Ft,activeTexture:ge,bindTexture:de,unbindTexture:C,compressedTexImage2D:y,compressedTexImage3D:X,texImage2D:gt,texImage3D:at,updateUBOMapping:Rt,uniformBlockBinding:pt,texStorage2D:rt,texStorage3D:_t,texSubImage2D:et,texSubImage3D:$,compressedTexSubImage2D:Y,compressedTexSubImage3D:ft,scissor:dt,viewport:Ut,reset:Xt}}function iv(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new bt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,y){return f?new OffscreenCanvas(C,y):xo("canvas")}function x(C,y,X){let et=1;const $=de(C);if(($.width>X||$.height>X)&&(et=X/Math.max($.width,$.height)),et<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(et*$.width),ft=Math.floor(et*$.height);u===void 0&&(u=g(Y,ft));const rt=y?g(Y,ft):u;return rt.width=Y,rt.height=ft,rt.getContext("2d").drawImage(C,0,0,Y,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Y+"x"+ft+")."),rt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),C;return C}function m(C){return C.generateMipmaps}function p(C){i.generateMipmap(C)}function M(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(C,y,X,et,$=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=y;if(y===i.RED&&(X===i.FLOAT&&(Y=i.R32F),X===i.HALF_FLOAT&&(Y=i.R16F),X===i.UNSIGNED_BYTE&&(Y=i.R8)),y===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.R8UI),X===i.UNSIGNED_SHORT&&(Y=i.R16UI),X===i.UNSIGNED_INT&&(Y=i.R32UI),X===i.BYTE&&(Y=i.R8I),X===i.SHORT&&(Y=i.R16I),X===i.INT&&(Y=i.R32I)),y===i.RG&&(X===i.FLOAT&&(Y=i.RG32F),X===i.HALF_FLOAT&&(Y=i.RG16F),X===i.UNSIGNED_BYTE&&(Y=i.RG8)),y===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RG8UI),X===i.UNSIGNED_SHORT&&(Y=i.RG16UI),X===i.UNSIGNED_INT&&(Y=i.RG32UI),X===i.BYTE&&(Y=i.RG8I),X===i.SHORT&&(Y=i.RG16I),X===i.INT&&(Y=i.RG32I)),y===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),X===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),X===i.UNSIGNED_INT&&(Y=i.RGB32UI),X===i.BYTE&&(Y=i.RGB8I),X===i.SHORT&&(Y=i.RGB16I),X===i.INT&&(Y=i.RGB32I)),y===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),X===i.UNSIGNED_INT&&(Y=i.RGBA32UI),X===i.BYTE&&(Y=i.RGBA8I),X===i.SHORT&&(Y=i.RGBA16I),X===i.INT&&(Y=i.RGBA32I)),y===i.RGB&&(X===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),y===i.RGBA){const ft=$?mo:re.getTransfer(et);X===i.FLOAT&&(Y=i.RGBA32F),X===i.HALF_FLOAT&&(Y=i.RGBA16F),X===i.UNSIGNED_BYTE&&(Y=ft===ue?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function _(C,y){let X;return C?y===null||y===Li||y===ar?X=i.DEPTH24_STENCIL8:y===Pn?X=i.DEPTH32F_STENCIL8:y===or&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Li||y===ar?X=i.DEPTH_COMPONENT24:y===Pn?X=i.DEPTH_COMPONENT32F:y===or&&(X=i.DEPTH_COMPONENT16),X}function b(C,y){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==an&&C.minFilter!==yn?Math.log2(Math.max(y.width,y.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?y.mipmaps.length:1}function A(C){const y=C.target;y.removeEventListener("dispose",A),F(y),y.isVideoTexture&&h.delete(y)}function P(C){const y=C.target;y.removeEventListener("dispose",P),E(y)}function F(C){const y=n.get(C);if(y.__webglInit===void 0)return;const X=C.source,et=d.get(X);if(et){const $=et[y.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(C),Object.keys(et).length===0&&d.delete(X)}n.remove(C)}function S(C){const y=n.get(C);i.deleteTexture(y.__webglTexture);const X=C.source,et=d.get(X);delete et[y.__cacheKey],o.memory.textures--}function E(C){const y=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(y.__webglFramebuffer[et]))for(let $=0;$<y.__webglFramebuffer[et].length;$++)i.deleteFramebuffer(y.__webglFramebuffer[et][$]);else i.deleteFramebuffer(y.__webglFramebuffer[et]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[et])}else{if(Array.isArray(y.__webglFramebuffer))for(let et=0;et<y.__webglFramebuffer.length;et++)i.deleteFramebuffer(y.__webglFramebuffer[et]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let et=0;et<y.__webglColorRenderbuffer.length;et++)y.__webglColorRenderbuffer[et]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[et]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const X=C.textures;for(let et=0,$=X.length;et<$;et++){const Y=n.get(X[et]);Y.__webglTexture&&(i.deleteTexture(Y.__webglTexture),o.memory.textures--),n.remove(X[et])}n.remove(C)}let L=0;function G(){L=0}function k(){const C=L;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),L+=1,C}function q(C){const y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function R(C,y){const X=n.get(C);if(C.isVideoTexture&&Ft(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&X.__version!==C.version){const et=C.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{B(X,C,y);return}}else C.isExternalTexture&&(X.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+y)}function w(C,y){const X=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){B(X,C,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+y)}function U(C,y){const X=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&X.__version!==C.version){B(X,C,y);return}e.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+y)}function D(C,y){const X=n.get(C);if(C.version>0&&X.__version!==C.version){W(X,C,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+y)}const Z={[$n]:i.REPEAT,[Ri]:i.CLAMP_TO_EDGE,[ec]:i.MIRRORED_REPEAT},J={[an]:i.NEAREST,[$d]:i.NEAREST_MIPMAP_NEAREST,[Er]:i.NEAREST_MIPMAP_LINEAR,[yn]:i.LINEAR,[Ho]:i.LINEAR_MIPMAP_NEAREST,[Ci]:i.LINEAR_MIPMAP_LINEAR},N={[Qd]:i.NEVER,[rp]:i.ALWAYS,[tp]:i.LESS,[Yu]:i.LEQUAL,[ep]:i.EQUAL,[sp]:i.GEQUAL,[np]:i.GREATER,[ip]:i.NOTEQUAL};function Q(C,y){if(y.type===Pn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===yn||y.magFilter===Ho||y.magFilter===Er||y.magFilter===Ci||y.minFilter===yn||y.minFilter===Ho||y.minFilter===Er||y.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,Z[y.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Z[y.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Z[y.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,J[y.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,J[y.minFilter]),y.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,N[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===an||y.minFilter!==Er&&y.minFilter!==Ci||y.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const X=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Mt(C,y){let X=!1;C.__webglInit===void 0&&(C.__webglInit=!0,y.addEventListener("dispose",A));const et=y.source;let $=d.get(et);$===void 0&&($={},d.set(et,$));const Y=q(y);if(Y!==C.__cacheKey){$[Y]===void 0&&($[Y]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),$[Y].usedTimes++;const ft=$[C.__cacheKey];ft!==void 0&&($[C.__cacheKey].usedTimes--,ft.usedTimes===0&&S(y)),C.__cacheKey=Y,C.__webglTexture=$[Y].texture}return X}function xt(C,y,X){return Math.floor(Math.floor(C/X)/y)}function tt(C,y,X,et){const Y=C.updateRanges;if(Y.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,X,et,y.data);else{Y.sort((at,dt)=>at.start-dt.start);let ft=0;for(let at=1;at<Y.length;at++){const dt=Y[ft],Ut=Y[at],Rt=dt.start+dt.count,pt=xt(Ut.start,y.width,4),Xt=xt(dt.start,y.width,4);Ut.start<=Rt+1&&pt===Xt&&xt(Ut.start+Ut.count-1,y.width,4)===pt?dt.count=Math.max(dt.count,Ut.start+Ut.count-dt.start):(++ft,Y[ft]=Ut)}Y.length=ft+1;const rt=i.getParameter(i.UNPACK_ROW_LENGTH),_t=i.getParameter(i.UNPACK_SKIP_PIXELS),gt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let at=0,dt=Y.length;at<dt;at++){const Ut=Y[at],Rt=Math.floor(Ut.start/4),pt=Math.ceil(Ut.count/4),Xt=Rt%y.width,O=Math.floor(Rt/y.width),ht=pt,ut=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Xt),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,Xt,O,ht,ut,X,et,y.data)}C.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,rt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,_t),i.pixelStorei(i.UNPACK_SKIP_ROWS,gt)}}function B(C,y,X){let et=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(et=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(et=i.TEXTURE_3D);const $=Mt(C,y),Y=y.source;e.bindTexture(et,C.__webglTexture,i.TEXTURE0+X);const ft=n.get(Y);if(Y.version!==ft.__version||$===!0){e.activeTexture(i.TEXTURE0+X);const rt=re.getPrimaries(re.workingColorSpace),_t=y.colorSpace===ri?null:re.getPrimaries(y.colorSpace),gt=y.colorSpace===ri||rt===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);let at=x(y.image,!1,s.maxTextureSize);at=ge(y,at);const dt=r.convert(y.format,y.colorSpace),Ut=r.convert(y.type);let Rt=v(y.internalFormat,dt,Ut,y.colorSpace,y.isVideoTexture);Q(et,y);let pt;const Xt=y.mipmaps,O=y.isVideoTexture!==!0,ht=ft.__version===void 0||$===!0,ut=Y.dataReady,At=b(y,at);if(y.isDepthTexture)Rt=_(y.format===lr,y.type),ht&&(O?e.texStorage2D(i.TEXTURE_2D,1,Rt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,Rt,at.width,at.height,0,dt,Ut,null));else if(y.isDataTexture)if(Xt.length>0){O&&ht&&e.texStorage2D(i.TEXTURE_2D,At,Rt,Xt[0].width,Xt[0].height);for(let ct=0,st=Xt.length;ct<st;ct++)pt=Xt[ct],O?ut&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,pt.width,pt.height,dt,Ut,pt.data):e.texImage2D(i.TEXTURE_2D,ct,Rt,pt.width,pt.height,0,dt,Ut,pt.data);y.generateMipmaps=!1}else O?(ht&&e.texStorage2D(i.TEXTURE_2D,At,Rt,at.width,at.height),ut&&tt(y,at,dt,Ut)):e.texImage2D(i.TEXTURE_2D,0,Rt,at.width,at.height,0,dt,Ut,at.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){O&&ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Rt,Xt[0].width,Xt[0].height,at.depth);for(let ct=0,st=Xt.length;ct<st;ct++)if(pt=Xt[ct],y.format!==Sn)if(dt!==null)if(O){if(ut)if(y.layerUpdates.size>0){const Pt=Ph(pt.width,pt.height,y.format,y.type);for(const qt of y.layerUpdates){const me=pt.data.subarray(qt*Pt/pt.data.BYTES_PER_ELEMENT,(qt+1)*Pt/pt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,qt,pt.width,pt.height,1,dt,me)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,pt.width,pt.height,at.depth,dt,pt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,Rt,pt.width,pt.height,at.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,pt.width,pt.height,at.depth,dt,Ut,pt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,Rt,pt.width,pt.height,at.depth,0,dt,Ut,pt.data)}else{O&&ht&&e.texStorage2D(i.TEXTURE_2D,At,Rt,Xt[0].width,Xt[0].height);for(let ct=0,st=Xt.length;ct<st;ct++)pt=Xt[ct],y.format!==Sn?dt!==null?O?ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,pt.width,pt.height,dt,pt.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,Rt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ut&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,pt.width,pt.height,dt,Ut,pt.data):e.texImage2D(i.TEXTURE_2D,ct,Rt,pt.width,pt.height,0,dt,Ut,pt.data)}else if(y.isDataArrayTexture)if(O){if(ht&&e.texStorage3D(i.TEXTURE_2D_ARRAY,At,Rt,at.width,at.height,at.depth),ut)if(y.layerUpdates.size>0){const ct=Ph(at.width,at.height,y.format,y.type);for(const st of y.layerUpdates){const Pt=at.data.subarray(st*ct/at.data.BYTES_PER_ELEMENT,(st+1)*ct/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,st,at.width,at.height,1,dt,Ut,Pt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,dt,Ut,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Rt,at.width,at.height,at.depth,0,dt,Ut,at.data);else if(y.isData3DTexture)O?(ht&&e.texStorage3D(i.TEXTURE_3D,At,Rt,at.width,at.height,at.depth),ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,dt,Ut,at.data)):e.texImage3D(i.TEXTURE_3D,0,Rt,at.width,at.height,at.depth,0,dt,Ut,at.data);else if(y.isFramebufferTexture){if(ht)if(O)e.texStorage2D(i.TEXTURE_2D,At,Rt,at.width,at.height);else{let ct=at.width,st=at.height;for(let Pt=0;Pt<At;Pt++)e.texImage2D(i.TEXTURE_2D,Pt,Rt,ct,st,0,dt,Ut,null),ct>>=1,st>>=1}}else if(Xt.length>0){if(O&&ht){const ct=de(Xt[0]);e.texStorage2D(i.TEXTURE_2D,At,Rt,ct.width,ct.height)}for(let ct=0,st=Xt.length;ct<st;ct++)pt=Xt[ct],O?ut&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,dt,Ut,pt):e.texImage2D(i.TEXTURE_2D,ct,Rt,dt,Ut,pt);y.generateMipmaps=!1}else if(O){if(ht){const ct=de(at);e.texStorage2D(i.TEXTURE_2D,At,Rt,ct.width,ct.height)}ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt,Ut,at)}else e.texImage2D(i.TEXTURE_2D,0,Rt,dt,Ut,at);m(y)&&p(et),ft.__version=Y.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function W(C,y,X){if(y.image.length!==6)return;const et=Mt(C,y),$=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+X);const Y=n.get($);if($.version!==Y.__version||et===!0){e.activeTexture(i.TEXTURE0+X);const ft=re.getPrimaries(re.workingColorSpace),rt=y.colorSpace===ri?null:re.getPrimaries(y.colorSpace),_t=y.colorSpace===ri||ft===rt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const gt=y.isCompressedTexture||y.image[0].isCompressedTexture,at=y.image[0]&&y.image[0].isDataTexture,dt=[];for(let st=0;st<6;st++)!gt&&!at?dt[st]=x(y.image[st],!0,s.maxCubemapSize):dt[st]=at?y.image[st].image:y.image[st],dt[st]=ge(y,dt[st]);const Ut=dt[0],Rt=r.convert(y.format,y.colorSpace),pt=r.convert(y.type),Xt=v(y.internalFormat,Rt,pt,y.colorSpace),O=y.isVideoTexture!==!0,ht=Y.__version===void 0||et===!0,ut=$.dataReady;let At=b(y,Ut);Q(i.TEXTURE_CUBE_MAP,y);let ct;if(gt){O&&ht&&e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Xt,Ut.width,Ut.height);for(let st=0;st<6;st++){ct=dt[st].mipmaps;for(let Pt=0;Pt<ct.length;Pt++){const qt=ct[Pt];y.format!==Sn?Rt!==null?O?ut&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,0,0,qt.width,qt.height,Rt,qt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,Xt,qt.width,qt.height,0,qt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,0,0,qt.width,qt.height,Rt,pt,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt,Xt,qt.width,qt.height,0,Rt,pt,qt.data)}}}else{if(ct=y.mipmaps,O&&ht){ct.length>0&&At++;const st=de(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,At,Xt,st.width,st.height)}for(let st=0;st<6;st++)if(at){O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,dt[st].width,dt[st].height,Rt,pt,dt[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Xt,dt[st].width,dt[st].height,0,Rt,pt,dt[st].data);for(let Pt=0;Pt<ct.length;Pt++){const me=ct[Pt].image[st].image;O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,0,0,me.width,me.height,Rt,pt,me.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,Xt,me.width,me.height,0,Rt,pt,me.data)}}else{O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Rt,pt,dt[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Xt,Rt,pt,dt[st]);for(let Pt=0;Pt<ct.length;Pt++){const qt=ct[Pt];O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,0,0,Rt,pt,qt.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,Pt+1,Xt,Rt,pt,qt.image[st])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),Y.__version=$.version,y.onUpdate&&y.onUpdate(y)}C.__version=y.version}function nt(C,y,X,et,$,Y){const ft=r.convert(X.format,X.colorSpace),rt=r.convert(X.type),_t=v(X.internalFormat,ft,rt,X.colorSpace),gt=n.get(y),at=n.get(X);if(at.__renderTarget=y,!gt.__hasExternalTextures){const dt=Math.max(1,y.width>>Y),Ut=Math.max(1,y.height>>Y);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,Y,_t,dt,Ut,y.depth,0,ft,rt,null):e.texImage2D($,Y,_t,dt,Ut,0,ft,rt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),St(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,$,at.__webglTexture,0,Qt(y)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,et,$,at.__webglTexture,Y),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(C,y,X){if(i.bindRenderbuffer(i.RENDERBUFFER,C),y.depthBuffer){const et=y.depthTexture,$=et&&et.isDepthTexture?et.type:null,Y=_(y.stencilBuffer,$),ft=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=Qt(y);St(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,rt,Y,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,rt,Y,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Y,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,C)}else{const et=y.textures;for(let $=0;$<et.length;$++){const Y=et[$],ft=r.convert(Y.format,Y.colorSpace),rt=r.convert(Y.type),_t=v(Y.internalFormat,ft,rt,Y.colorSpace),gt=Qt(y);X&&St(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,gt,_t,y.width,y.height):St(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,gt,_t,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,_t,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function it(C,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const et=n.get(y.depthTexture);et.__renderTarget=y,(!et.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),R(y.depthTexture,0);const $=et.__webglTexture,Y=Qt(y);if(y.depthTexture.format===cr)St(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(y.depthTexture.format===lr)St(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Tt(C){const y=n.get(C),X=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){const et=C.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),et){const $=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,et.removeEventListener("dispose",$)};et.addEventListener("dispose",$),y.__depthDisposeCallback=$}y.__boundDepthTexture=et}if(C.depthTexture&&!y.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const et=C.texture.mipmaps;et&&et.length>0?it(y.__webglFramebuffer[0],C):it(y.__webglFramebuffer,C)}else if(X){y.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[et]),y.__webglDepthbuffer[et]===void 0)y.__webglDepthbuffer[et]=i.createRenderbuffer(),ot(y.__webglDepthbuffer[et],C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer[et];i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}else{const et=C.texture.mipmaps;if(et&&et.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),ot(y.__webglDepthbuffer,C,!1);else{const $=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,Y)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(C,y,X){const et=n.get(C);y!==void 0&&nt(et.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Tt(C)}function z(C){const y=C.texture,X=n.get(C),et=n.get(y);C.addEventListener("dispose",P);const $=C.textures,Y=C.isWebGLCubeRenderTarget===!0,ft=$.length>1;if(ft||(et.__webglTexture===void 0&&(et.__webglTexture=i.createTexture()),et.__version=y.version,o.memory.textures++),Y){X.__webglFramebuffer=[];for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer[rt]=[];for(let _t=0;_t<y.mipmaps.length;_t++)X.__webglFramebuffer[rt][_t]=i.createFramebuffer()}else X.__webglFramebuffer[rt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer=[];for(let rt=0;rt<y.mipmaps.length;rt++)X.__webglFramebuffer[rt]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(ft)for(let rt=0,_t=$.length;rt<_t;rt++){const gt=n.get($[rt]);gt.__webglTexture===void 0&&(gt.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&St(C)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let rt=0;rt<$.length;rt++){const _t=$[rt];X.__webglColorRenderbuffer[rt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[rt]);const gt=r.convert(_t.format,_t.colorSpace),at=r.convert(_t.type),dt=v(_t.internalFormat,gt,at,_t.colorSpace,C.isXRRenderTarget===!0),Ut=Qt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,dt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,X.__webglColorRenderbuffer[rt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(X.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Y){e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),Q(i.TEXTURE_CUBE_MAP,y);for(let rt=0;rt<6;rt++)if(y.mipmaps&&y.mipmaps.length>0)for(let _t=0;_t<y.mipmaps.length;_t++)nt(X.__webglFramebuffer[rt][_t],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,_t);else nt(X.__webglFramebuffer[rt],C,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let rt=0,_t=$.length;rt<_t;rt++){const gt=$[rt],at=n.get(gt);let dt=i.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(dt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,at.__webglTexture),Q(dt,gt),nt(X.__webglFramebuffer,C,gt,i.COLOR_ATTACHMENT0+rt,dt,0),m(gt)&&p(dt)}e.unbindTexture()}else{let rt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(rt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(rt,et.__webglTexture),Q(rt,y),y.mipmaps&&y.mipmaps.length>0)for(let _t=0;_t<y.mipmaps.length;_t++)nt(X.__webglFramebuffer[_t],C,y,i.COLOR_ATTACHMENT0,rt,_t);else nt(X.__webglFramebuffer,C,y,i.COLOR_ATTACHMENT0,rt,0);m(y)&&p(rt),e.unbindTexture()}C.depthBuffer&&Tt(C)}function jt(C){const y=C.textures;for(let X=0,et=y.length;X<et;X++){const $=y[X];if(m($)){const Y=M(C),ft=n.get($).__webglTexture;e.bindTexture(Y,ft),p(Y),e.unbindTexture()}}}const Lt=[],Dt=[];function wt(C){if(C.samples>0){if(St(C)===!1){const y=C.textures,X=C.width,et=C.height;let $=i.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=n.get(C),rt=y.length>1;if(rt)for(let gt=0;gt<y.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer);const _t=C.texture.mipmaps;_t&&_t.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let gt=0;gt<y.length;gt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),rt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ft.__webglColorRenderbuffer[gt]);const at=n.get(y[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,at,0)}i.blitFramebuffer(0,0,X,et,0,0,X,et,$,i.NEAREST),c===!0&&(Lt.length=0,Dt.length=0,Lt.push(i.COLOR_ATTACHMENT0+gt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Lt.push(Y),Dt.push(Y),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Lt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),rt)for(let gt=0;gt<y.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,ft.__webglColorRenderbuffer[gt]);const at=n.get(y[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,at,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const y=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Qt(C){return Math.min(s.maxSamples,C.samples)}function St(C){const y=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ft(C){const y=o.render.frame;h.get(C)!==y&&(h.set(C,y),C.update())}function ge(C,y){const X=C.colorSpace,et=C.format,$=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||X!==As&&X!==ri&&(re.getTransfer(X)===ue?(et!==Sn||$!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),y}function de(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=G,this.setTexture2D=R,this.setTexture2DArray=w,this.setTexture3D=U,this.setTextureCube=D,this.rebindTextures=Gt,this.setupRenderTarget=z,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Tt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=St}function sv(i,t){function e(n,s=ri){let r;const o=re.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===jc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Vu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Bu)return i.BYTE;if(n===ku)return i.SHORT;if(n===or)return i.UNSIGNED_SHORT;if(n===Jc)return i.INT;if(n===Li)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===Mr)return i.HALF_FLOAT;if(n===Hu)return i.ALPHA;if(n===Wu)return i.RGB;if(n===Sn)return i.RGBA;if(n===cr)return i.DEPTH_COMPONENT;if(n===lr)return i.DEPTH_STENCIL;if(n===tl)return i.RED;if(n===el)return i.RED_INTEGER;if(n===Xu)return i.RG;if(n===nl)return i.RG_INTEGER;if(n===il)return i.RGBA_INTEGER;if(n===ao||n===co||n===lo||n===ho)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===lo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ho)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nc||n===ic||n===sc||n===rc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===nc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ic)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oc||n===ac||n===cc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oc||n===ac)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===cc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===lc||n===hc||n===uc||n===fc||n===dc||n===pc||n===mc||n===gc||n===xc||n===_c||n===vc||n===Mc||n===yc||n===Sc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===lc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_c)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wc||n===bc||n===Ec)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===wc)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tc||n===Ac||n===Rc||n===Cc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Tc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ac)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Rc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Cc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ar?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const rv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ov=`
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

}`;class av{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new hf(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new pi({vertexShader:rv,fragmentShader:ov,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new yr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cv extends Is{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new av,p={},M=e.getContextAttributes();let v=null,_=null;const b=[],A=[],P=new bt;let F=null;const S=new Mn;S.viewport=new Te;const E=new Mn;E.viewport=new Te;const L=[S,E],G=new Tm;let k=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let W=b[B];return W===void 0&&(W=new fa,b[B]=W),W.getTargetRaySpace()},this.getControllerGrip=function(B){let W=b[B];return W===void 0&&(W=new fa,b[B]=W),W.getGripSpace()},this.getHand=function(B){let W=b[B];return W===void 0&&(W=new fa,b[B]=W),W.getHandSpace()};function R(B){const W=A.indexOf(B.inputSource);if(W===-1)return;const nt=b[W];nt!==void 0&&(nt.update(B.inputSource,B.frame,l||o),nt.dispatchEvent({type:B.type,data:B.inputSource}))}function w(){s.removeEventListener("select",R),s.removeEventListener("selectstart",R),s.removeEventListener("selectend",R),s.removeEventListener("squeeze",R),s.removeEventListener("squeezestart",R),s.removeEventListener("squeezeend",R),s.removeEventListener("end",w),s.removeEventListener("inputsourceschange",U);for(let B=0;B<b.length;B++){const W=A[B];W!==null&&(A[B]=null,b[B].disconnect(W))}k=null,q=null,m.reset();for(const B in p)delete p[B];t.setRenderTarget(v),f=null,d=null,u=null,s=null,_=null,tt.stop(),n.isPresenting=!1,t.setPixelRatio(F),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){a=B,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(B){l=B},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",R),s.addEventListener("selectstart",R),s.addEventListener("selectend",R),s.addEventListener("squeeze",R),s.addEventListener("squeezestart",R),s.addEventListener("squeezeend",R),s.addEventListener("end",w),s.addEventListener("inputsourceschange",U),M.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,ot=null,it=null;M.depth&&(it=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=M.stencil?lr:cr,ot=M.stencil?ar:Li);const Tt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Tt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new Ui(d.textureWidth,d.textureHeight,{format:Sn,type:Ln,depthTexture:new lf(d.textureWidth,d.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const nt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Ui(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),tt.setContext(s),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(B){for(let W=0;W<B.removed.length;W++){const nt=B.removed[W],ot=A.indexOf(nt);ot>=0&&(A[ot]=null,b[ot].disconnect(nt))}for(let W=0;W<B.added.length;W++){const nt=B.added[W];let ot=A.indexOf(nt);if(ot===-1){for(let Tt=0;Tt<b.length;Tt++)if(Tt>=A.length){A.push(nt),ot=Tt;break}else if(A[Tt]===null){A[Tt]=nt,ot=Tt;break}if(ot===-1)break}const it=b[ot];it&&it.connect(nt)}}const D=new I,Z=new I;function J(B,W,nt){D.setFromMatrixPosition(W.matrixWorld),Z.setFromMatrixPosition(nt.matrixWorld);const ot=D.distanceTo(Z),it=W.projectionMatrix.elements,Tt=nt.projectionMatrix.elements,Gt=it[14]/(it[10]-1),z=it[14]/(it[10]+1),jt=(it[9]+1)/it[5],Lt=(it[9]-1)/it[5],Dt=(it[8]-1)/it[0],wt=(Tt[8]+1)/Tt[0],Qt=Gt*Dt,St=Gt*wt,Ft=ot/(-Dt+wt),ge=Ft*-Dt;if(W.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(ge),B.translateZ(Ft),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert(),it[10]===-1)B.projectionMatrix.copy(W.projectionMatrix),B.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{const de=Gt+Ft,C=z+Ft,y=Qt-ge,X=St+(ot-ge),et=jt*z/C*de,$=Lt*z/C*de;B.projectionMatrix.makePerspective(y,X,et,$,de,C),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}}function N(B,W){W===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(W.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;let W=B.near,nt=B.far;m.texture!==null&&(m.depthNear>0&&(W=m.depthNear),m.depthFar>0&&(nt=m.depthFar)),G.near=E.near=S.near=W,G.far=E.far=S.far=nt,(k!==G.near||q!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),k=G.near,q=G.far),G.layers.mask=B.layers.mask|6,S.layers.mask=G.layers.mask&3,E.layers.mask=G.layers.mask&5;const ot=B.parent,it=G.cameras;N(G,ot);for(let Tt=0;Tt<it.length;Tt++)N(it[Tt],ot);it.length===2?J(G,S,E):G.projectionMatrix.copy(S.projectionMatrix),Q(B,G,ot)};function Q(B,W,nt){nt===null?B.matrix.copy(W.matrixWorld):(B.matrix.copy(nt.matrixWorld),B.matrix.invert(),B.matrix.multiply(W.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(W.projectionMatrix),B.projectionMatrixInverse.copy(W.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Dc*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(B){c=B,d!==null&&(d.fixedFoveation=B),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=B)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(G)},this.getCameraTexture=function(B){return p[B]};let Mt=null;function xt(B,W){if(h=W.getViewerPose(l||o),g=W,h!==null){const nt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let ot=!1;nt.length!==G.cameras.length&&(G.cameras.length=0,ot=!0);for(let z=0;z<nt.length;z++){const jt=nt[z];let Lt=null;if(f!==null)Lt=f.getViewport(jt);else{const wt=u.getViewSubImage(d,jt);Lt=wt.viewport,z===0&&(t.setRenderTargetTextures(_,wt.colorTexture,wt.depthStencilTexture),t.setRenderTarget(_))}let Dt=L[z];Dt===void 0&&(Dt=new Mn,Dt.layers.enable(z),Dt.viewport=new Te,L[z]=Dt),Dt.matrix.fromArray(jt.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(jt.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Lt.x,Lt.y,Lt.width,Lt.height),z===0&&(G.matrix.copy(Dt.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),ot===!0&&G.cameras.push(Dt)}const it=s.enabledFeatures;if(it&&it.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const z=u.getDepthInformation(nt[0]);z&&z.isValid&&z.texture&&m.init(z,s.renderState)}if(it&&it.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let z=0;z<nt.length;z++){const jt=nt[z].camera;if(jt){let Lt=p[jt];Lt||(Lt=new hf,p[jt]=Lt);const Dt=u.getCameraImage(jt);Lt.sourceTexture=Dt}}}}for(let nt=0;nt<b.length;nt++){const ot=A[nt],it=b[nt];ot!==null&&it!==void 0&&it.update(ot,W,l||o)}Mt&&Mt(B,W),W.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:W}),g=null}const tt=new yf;tt.setAnimationLoop(xt),this.setAnimationLoop=function(B){Mt=B},this.dispose=function(){}}}const wi=new En,lv=new ee;function hv(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,ef(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,v,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,M,v):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$e&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$e&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),v=M.envMap,_=M.envMapRotation;v&&(m.envMap.value=v,wi.copy(_),wi.x*=-1,wi.y*=-1,wi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),m.envMapRotation.value.setFromMatrix4(lv.makeRotationFromEuler(wi)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=v*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$e&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function uv(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){const _=v.program;n.uniformBlockBinding(M,_)}function l(M,v){let _=s[M.id];_===void 0&&(g(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",m));const b=v.program;n.updateUBOMapping(M,b);const A=t.render.frame;r[M.id]!==A&&(d(M),r[M.id]=A)}function h(M){const v=u();M.__bindingPointIndex=v;const _=i.createBuffer(),b=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,b,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const v=s[M.id],_=M.uniforms,b=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,P=_.length;A<P;A++){const F=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,E=F.length;S<E;S++){const L=F[S];if(f(L,A,S,b)===!0){const G=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let R=0;R<k.length;R++){const w=k[R],U=x(w);typeof w=="number"||typeof w=="boolean"?(L.__data[0]=w,i.bufferSubData(i.UNIFORM_BUFFER,G+q,L.__data)):w.isMatrix3?(L.__data[0]=w.elements[0],L.__data[1]=w.elements[1],L.__data[2]=w.elements[2],L.__data[3]=0,L.__data[4]=w.elements[3],L.__data[5]=w.elements[4],L.__data[6]=w.elements[5],L.__data[7]=0,L.__data[8]=w.elements[6],L.__data[9]=w.elements[7],L.__data[10]=w.elements[8],L.__data[11]=0):(w.toArray(L.__data,q),q+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,v,_,b){const A=M.value,P=v+"_"+_;if(b[P]===void 0)return typeof A=="number"||typeof A=="boolean"?b[P]=A:b[P]=A.clone(),!0;{const F=b[P];if(typeof A=="number"||typeof A=="boolean"){if(F!==A)return b[P]=A,!0}else if(F.equals(A)===!1)return F.copy(A),!0}return!1}function g(M){const v=M.uniforms;let _=0;const b=16;for(let P=0,F=v.length;P<F;P++){const S=Array.isArray(v[P])?v[P]:[v[P]];for(let E=0,L=S.length;E<L;E++){const G=S[E],k=Array.isArray(G.value)?G.value:[G.value];for(let q=0,R=k.length;q<R;q++){const w=k[q],U=x(w),D=_%b,Z=D%U.boundary,J=D+Z;_+=Z,J!==0&&b-J<U.storage&&(_+=b-J),G.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=_,_+=U.storage}}}const A=_%b;return A>0&&(_+=b-A),M.__size=_,M.__cache={},this}function x(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){const v=M.target;v.removeEventListener("dispose",m);const _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class fv{constructor(t={}){const{canvas:e=ap(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,p=null;const M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let b=!1;this._outputColorSpace=De;let A=0,P=0,F=null,S=-1,E=null;const L=new Te,G=new Te;let k=null;const q=new Ht(0);let R=0,w=e.width,U=e.height,D=1,Z=null,J=null;const N=new Te(0,0,w,U),Q=new Te(0,0,w,U);let Mt=!1;const xt=new Ro;let tt=!1,B=!1;const W=new ee,nt=new I,ot=new Te,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Tt=!1;function Gt(){return F===null?D:1}let z=n;function jt(T,V){return e.getContext(T,V)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Kc}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",At,!1),e.addEventListener("webglcontextcreationerror",ct,!1),z===null){const V="webgl2";if(z=jt(V,T),z===null)throw jt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Lt,Dt,wt,Qt,St,Ft,ge,de,C,y,X,et,$,Y,ft,rt,_t,gt,at,dt,Ut,Rt,pt,Xt;function O(){Lt=new Sx(z),Lt.init(),Rt=new sv(z,Lt),Dt=new mx(z,Lt,t,Rt),wt=new nv(z,Lt),Dt.reversedDepthBuffer&&d&&wt.buffers.depth.setReversed(!0),Qt=new Ex(z),St=new H_,Ft=new iv(z,Lt,wt,St,Dt,Rt,Qt),ge=new xx(_),de=new yx(_),C=new Dm(z),pt=new dx(z,C),y=new wx(z,C,Qt,pt),X=new Ax(z,y,C,Qt),at=new Tx(z,Dt,Ft),rt=new gx(St),et=new V_(_,ge,de,Lt,Dt,pt,rt),$=new hv(_,St),Y=new X_,ft=new J_(Lt),gt=new fx(_,ge,de,wt,X,f,c),_t=new tv(_,X,Dt),Xt=new uv(z,Qt,Dt,wt),dt=new px(z,Lt,Qt),Ut=new bx(z,Lt,Qt),Qt.programs=et.programs,_.capabilities=Dt,_.extensions=Lt,_.properties=St,_.renderLists=Y,_.shadowMap=_t,_.state=wt,_.info=Qt}O();const ht=new cv(_,z);this.xr=ht,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const T=Lt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Lt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(T){T!==void 0&&(D=T,this.setSize(w,U,!1))},this.getSize=function(T){return T.set(w,U)},this.setSize=function(T,V,K=!0){if(ht.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}w=T,U=V,e.width=Math.floor(T*D),e.height=Math.floor(V*D),K===!0&&(e.style.width=T+"px",e.style.height=V+"px"),this.setViewport(0,0,T,V)},this.getDrawingBufferSize=function(T){return T.set(w*D,U*D).floor()},this.setDrawingBufferSize=function(T,V,K){w=T,U=V,D=K,e.width=Math.floor(T*K),e.height=Math.floor(V*K),this.setViewport(0,0,T,V)},this.getCurrentViewport=function(T){return T.copy(L)},this.getViewport=function(T){return T.copy(N)},this.setViewport=function(T,V,K,j){T.isVector4?N.set(T.x,T.y,T.z,T.w):N.set(T,V,K,j),wt.viewport(L.copy(N).multiplyScalar(D).round())},this.getScissor=function(T){return T.copy(Q)},this.setScissor=function(T,V,K,j){T.isVector4?Q.set(T.x,T.y,T.z,T.w):Q.set(T,V,K,j),wt.scissor(G.copy(Q).multiplyScalar(D).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(T){wt.setScissorTest(Mt=T)},this.setOpaqueSort=function(T){Z=T},this.setTransparentSort=function(T){J=T},this.getClearColor=function(T){return T.copy(gt.getClearColor())},this.setClearColor=function(){gt.setClearColor(...arguments)},this.getClearAlpha=function(){return gt.getClearAlpha()},this.setClearAlpha=function(){gt.setClearAlpha(...arguments)},this.clear=function(T=!0,V=!0,K=!0){let j=0;if(T){let H=!1;if(F!==null){const lt=F.texture.format;H=lt===il||lt===nl||lt===el}if(H){const lt=F.texture.type,yt=lt===Ln||lt===Li||lt===or||lt===ar||lt===jc||lt===Qc,Ct=gt.getClearColor(),Et=gt.getClearAlpha(),Ot=Ct.r,Wt=Ct.g,It=Ct.b;yt?(g[0]=Ot,g[1]=Wt,g[2]=It,g[3]=Et,z.clearBufferuiv(z.COLOR,0,g)):(x[0]=Ot,x[1]=Wt,x[2]=It,x[3]=Et,z.clearBufferiv(z.COLOR,0,x))}else j|=z.COLOR_BUFFER_BIT}V&&(j|=z.DEPTH_BUFFER_BIT),K&&(j|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",At,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),gt.dispose(),Y.dispose(),ft.dispose(),St.dispose(),ge.dispose(),de.dispose(),X.dispose(),pt.dispose(),Xt.dispose(),et.dispose(),ht.dispose(),ht.removeEventListener("sessionstart",Tn),ht.removeEventListener("sessionend",Il),gi.stop()};function ut(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function At(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const T=Qt.autoReset,V=_t.enabled,K=_t.autoUpdate,j=_t.needsUpdate,H=_t.type;O(),Qt.autoReset=T,_t.enabled=V,_t.autoUpdate=K,_t.needsUpdate=j,_t.type=H}function ct(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function st(T){const V=T.target;V.removeEventListener("dispose",st),Pt(V)}function Pt(T){qt(T),St.remove(T)}function qt(T){const V=St.get(T).programs;V!==void 0&&(V.forEach(function(K){et.releaseProgram(K)}),T.isShaderMaterial&&et.releaseShaderCache(T))}this.renderBufferDirect=function(T,V,K,j,H,lt){V===null&&(V=it);const yt=H.isMesh&&H.matrixWorld.determinant()<0,Ct=Kf(T,V,K,j,H);wt.setMaterial(j,yt);let Et=K.index,Ot=1;if(j.wireframe===!0){if(Et=y.getWireframeAttribute(K),Et===void 0)return;Ot=2}const Wt=K.drawRange,It=K.attributes.position;let te=Wt.start*Ot,he=(Wt.start+Wt.count)*Ot;lt!==null&&(te=Math.max(te,lt.start*Ot),he=Math.min(he,(lt.start+lt.count)*Ot)),Et!==null?(te=Math.max(te,0),he=Math.min(he,Et.count)):It!=null&&(te=Math.max(te,0),he=Math.min(he,It.count));const be=he-te;if(be<0||be===1/0)return;pt.setup(H,j,Ct,K,Et);let xe,pe=dt;if(Et!==null&&(xe=C.get(Et),pe=Ut,pe.setIndex(xe)),H.isMesh)j.wireframe===!0?(wt.setLineWidth(j.wireframeLinewidth*Gt()),pe.setMode(z.LINES)):pe.setMode(z.TRIANGLES);else if(H.isLine){let Nt=j.linewidth;Nt===void 0&&(Nt=1),wt.setLineWidth(Nt*Gt()),H.isLineSegments?pe.setMode(z.LINES):H.isLineLoop?pe.setMode(z.LINE_LOOP):pe.setMode(z.LINE_STRIP)}else H.isPoints?pe.setMode(z.POINTS):H.isSprite&&pe.setMode(z.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)hr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pe.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Lt.get("WEBGL_multi_draw"))pe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Nt=H._multiDrawStarts,ve=H._multiDrawCounts,se=H._multiDrawCount,Ke=Et?C.get(Et).bytesPerElement:1,Wi=St.get(j).currentProgram.getUniforms();for(let Je=0;Je<se;Je++)Wi.setValue(z,"_gl_DrawID",Je),pe.render(Nt[Je]/Ke,ve[Je])}else if(H.isInstancedMesh)pe.renderInstances(te,be,H.count);else if(K.isInstancedBufferGeometry){const Nt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ve=Math.min(K.instanceCount,Nt);pe.renderInstances(te,be,ve)}else pe.render(te,be)};function me(T,V,K){T.transparent===!0&&T.side===Re&&T.forceSinglePass===!1?(T.side=$e,T.needsUpdate=!0,br(T,V,K),T.side=di,T.needsUpdate=!0,br(T,V,K),T.side=Re):br(T,V,K)}this.compile=function(T,V,K=null){K===null&&(K=T),p=ft.get(K),p.init(V),v.push(p),K.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),T!==K&&T.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const j=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const lt=H.material;if(lt)if(Array.isArray(lt))for(let yt=0;yt<lt.length;yt++){const Ct=lt[yt];me(Ct,K,H),j.add(Ct)}else me(lt,K,H),j.add(lt)}),p=v.pop(),j},this.compileAsync=function(T,V,K=null){const j=this.compile(T,V,K);return new Promise(H=>{function lt(){if(j.forEach(function(yt){St.get(yt).currentProgram.isReady()&&j.delete(yt)}),j.size===0){H(T);return}setTimeout(lt,10)}Lt.get("KHR_parallel_shader_compile")!==null?lt():setTimeout(lt,10)})};let ce=null;function Fn(T){ce&&ce(T)}function Tn(){gi.stop()}function Il(){gi.start()}const gi=new yf;gi.setAnimationLoop(Fn),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(T){ce=T,ht.setAnimationLoop(T),T===null?gi.stop():gi.start()},ht.addEventListener("sessionstart",Tn),ht.addEventListener("sessionend",Il),this.render=function(T,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ht.enabled===!0&&ht.isPresenting===!0&&(ht.cameraAutoUpdate===!0&&ht.updateCamera(V),V=ht.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,V,F),p=ft.get(T,v.length),p.init(V),v.push(p),W.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),xt.setFromProjectionMatrix(W,Dn,V.reversedDepth),B=this.localClippingEnabled,tt=rt.init(this.clippingPlanes,B),m=Y.get(T,M.length),m.init(),M.push(m),ht.enabled===!0&&ht.isPresenting===!0){const lt=_.xr.getDepthSensingMesh();lt!==null&&Go(lt,V,-1/0,_.sortObjects)}Go(T,V,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(Z,J),Tt=ht.enabled===!1||ht.isPresenting===!1||ht.hasDepthSensing()===!1,Tt&&gt.addToRenderList(m,T),this.info.render.frame++,tt===!0&&rt.beginShadows();const K=p.state.shadowsArray;_t.render(K,T,V),tt===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,H=m.transmissive;if(p.setupLights(),V.isArrayCamera){const lt=V.cameras;if(H.length>0)for(let yt=0,Ct=lt.length;yt<Ct;yt++){const Et=lt[yt];Ll(j,H,T,Et)}Tt&&gt.render(T);for(let yt=0,Ct=lt.length;yt<Ct;yt++){const Et=lt[yt];zl(m,T,Et,Et.viewport)}}else H.length>0&&Ll(j,H,T,V),Tt&&gt.render(T),zl(m,T,V);F!==null&&P===0&&(Ft.updateMultisampleRenderTarget(F),Ft.updateRenderTargetMipmap(F)),T.isScene===!0&&T.onAfterRender(_,T,V),pt.resetDefaultState(),S=-1,E=null,v.pop(),v.length>0?(p=v[v.length-1],tt===!0&&rt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Go(T,V,K,j){if(T.visible===!1)return;if(T.layers.test(V.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(V);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||xt.intersectsSprite(T)){j&&ot.setFromMatrixPosition(T.matrixWorld).applyMatrix4(W);const yt=X.update(T),Ct=T.material;Ct.visible&&m.push(T,yt,Ct,K,ot.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||xt.intersectsObject(T))){const yt=X.update(T),Ct=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ot.copy(T.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),ot.copy(yt.boundingSphere.center)),ot.applyMatrix4(T.matrixWorld).applyMatrix4(W)),Array.isArray(Ct)){const Et=yt.groups;for(let Ot=0,Wt=Et.length;Ot<Wt;Ot++){const It=Et[Ot],te=Ct[It.materialIndex];te&&te.visible&&m.push(T,yt,te,K,ot.z,It)}}else Ct.visible&&m.push(T,yt,Ct,K,ot.z,null)}}const lt=T.children;for(let yt=0,Ct=lt.length;yt<Ct;yt++)Go(lt[yt],V,K,j)}function zl(T,V,K,j){const H=T.opaque,lt=T.transmissive,yt=T.transparent;p.setupLightsView(K),tt===!0&&rt.setGlobalState(_.clippingPlanes,K),j&&wt.viewport(L.copy(j)),H.length>0&&wr(H,V,K),lt.length>0&&wr(lt,V,K),yt.length>0&&wr(yt,V,K),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Ll(T,V,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Ui(1,1,{generateMipmaps:!0,type:Lt.has("EXT_color_buffer_half_float")||Lt.has("EXT_color_buffer_float")?Mr:Ln,minFilter:Ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const lt=p.state.transmissionRenderTarget[j.id],yt=j.viewport||L;lt.setSize(yt.z*_.transmissionResolutionScale,yt.w*_.transmissionResolutionScale);const Ct=_.getRenderTarget(),Et=_.getActiveCubeFace(),Ot=_.getActiveMipmapLevel();_.setRenderTarget(lt),_.getClearColor(q),R=_.getClearAlpha(),R<1&&_.setClearColor(16777215,.5),_.clear(),Tt&&gt.render(K);const Wt=_.toneMapping;_.toneMapping=hi;const It=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),tt===!0&&rt.setGlobalState(_.clippingPlanes,j),wr(T,K,j),Ft.updateMultisampleRenderTarget(lt),Ft.updateRenderTargetMipmap(lt),Lt.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let he=0,be=V.length;he<be;he++){const xe=V[he],pe=xe.object,Nt=xe.geometry,ve=xe.material,se=xe.group;if(ve.side===Re&&pe.layers.test(j.layers)){const Ke=ve.side;ve.side=$e,ve.needsUpdate=!0,Ul(pe,K,j,Nt,ve,se),ve.side=Ke,ve.needsUpdate=!0,te=!0}}te===!0&&(Ft.updateMultisampleRenderTarget(lt),Ft.updateRenderTargetMipmap(lt))}_.setRenderTarget(Ct,Et,Ot),_.setClearColor(q,R),It!==void 0&&(j.viewport=It),_.toneMapping=Wt}function wr(T,V,K){const j=V.isScene===!0?V.overrideMaterial:null;for(let H=0,lt=T.length;H<lt;H++){const yt=T[H],Ct=yt.object,Et=yt.geometry,Ot=yt.group;let Wt=yt.material;Wt.allowOverride===!0&&j!==null&&(Wt=j),Ct.layers.test(K.layers)&&Ul(Ct,V,K,Et,Wt,Ot)}}function Ul(T,V,K,j,H,lt){T.onBeforeRender(_,V,K,j,H,lt),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(_,V,K,j,T,lt),H.transparent===!0&&H.side===Re&&H.forceSinglePass===!1?(H.side=$e,H.needsUpdate=!0,_.renderBufferDirect(K,V,j,H,T,lt),H.side=di,H.needsUpdate=!0,_.renderBufferDirect(K,V,j,H,T,lt),H.side=Re):_.renderBufferDirect(K,V,j,H,T,lt),T.onAfterRender(_,V,K,j,H,lt)}function br(T,V,K){V.isScene!==!0&&(V=it);const j=St.get(T),H=p.state.lights,lt=p.state.shadowsArray,yt=H.state.version,Ct=et.getParameters(T,H.state,lt,V,K),Et=et.getProgramCacheKey(Ct);let Ot=j.programs;j.environment=T.isMeshStandardMaterial?V.environment:null,j.fog=V.fog,j.envMap=(T.isMeshStandardMaterial?de:ge).get(T.envMap||j.environment),j.envMapRotation=j.environment!==null&&T.envMap===null?V.environmentRotation:T.envMapRotation,Ot===void 0&&(T.addEventListener("dispose",st),Ot=new Map,j.programs=Ot);let Wt=Ot.get(Et);if(Wt!==void 0){if(j.currentProgram===Wt&&j.lightsStateVersion===yt)return Fl(T,Ct),Wt}else Ct.uniforms=et.getUniforms(T),T.onBeforeCompile(Ct,_),Wt=et.acquireProgram(Ct,Et),Ot.set(Et,Wt),j.uniforms=Ct.uniforms;const It=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(It.clippingPlanes=rt.uniform),Fl(T,Ct),j.needsLights=jf(T),j.lightsStateVersion=yt,j.needsLights&&(It.ambientLightColor.value=H.state.ambient,It.lightProbe.value=H.state.probe,It.directionalLights.value=H.state.directional,It.directionalLightShadows.value=H.state.directionalShadow,It.spotLights.value=H.state.spot,It.spotLightShadows.value=H.state.spotShadow,It.rectAreaLights.value=H.state.rectArea,It.ltc_1.value=H.state.rectAreaLTC1,It.ltc_2.value=H.state.rectAreaLTC2,It.pointLights.value=H.state.point,It.pointLightShadows.value=H.state.pointShadow,It.hemisphereLights.value=H.state.hemi,It.directionalShadowMap.value=H.state.directionalShadowMap,It.directionalShadowMatrix.value=H.state.directionalShadowMatrix,It.spotShadowMap.value=H.state.spotShadowMap,It.spotLightMatrix.value=H.state.spotLightMatrix,It.spotLightMap.value=H.state.spotLightMap,It.pointShadowMap.value=H.state.pointShadowMap,It.pointShadowMatrix.value=H.state.pointShadowMatrix),j.currentProgram=Wt,j.uniformsList=null,Wt}function Nl(T){if(T.uniformsList===null){const V=T.currentProgram.getUniforms();T.uniformsList=uo.seqWithValue(V.seq,T.uniforms)}return T.uniformsList}function Fl(T,V){const K=St.get(T);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.batchingColor=V.batchingColor,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.instancingMorph=V.instancingMorph,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}function Kf(T,V,K,j,H){V.isScene!==!0&&(V=it),Ft.resetTextureUnits();const lt=V.fog,yt=j.isMeshStandardMaterial?V.environment:null,Ct=F===null?_.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:As,Et=(j.isMeshStandardMaterial?de:ge).get(j.envMap||yt),Ot=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Wt=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),It=!!K.morphAttributes.position,te=!!K.morphAttributes.normal,he=!!K.morphAttributes.color;let be=hi;j.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(be=_.toneMapping);const xe=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pe=xe!==void 0?xe.length:0,Nt=St.get(j),ve=p.state.lights;if(tt===!0&&(B===!0||T!==E)){const He=T===E&&j.id===S;rt.setState(j,T,He)}let se=!1;j.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==ve.state.version||Nt.outputColorSpace!==Ct||H.isBatchedMesh&&Nt.batching===!1||!H.isBatchedMesh&&Nt.batching===!0||H.isBatchedMesh&&Nt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Nt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Nt.instancing===!1||!H.isInstancedMesh&&Nt.instancing===!0||H.isSkinnedMesh&&Nt.skinning===!1||!H.isSkinnedMesh&&Nt.skinning===!0||H.isInstancedMesh&&Nt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Nt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Nt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Nt.instancingMorph===!1&&H.morphTexture!==null||Nt.envMap!==Et||j.fog===!0&&Nt.fog!==lt||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==rt.numPlanes||Nt.numIntersection!==rt.numIntersection)||Nt.vertexAlphas!==Ot||Nt.vertexTangents!==Wt||Nt.morphTargets!==It||Nt.morphNormals!==te||Nt.morphColors!==he||Nt.toneMapping!==be||Nt.morphTargetsCount!==pe)&&(se=!0):(se=!0,Nt.__version=j.version);let Ke=Nt.currentProgram;se===!0&&(Ke=br(j,V,H));let Wi=!1,Je=!1,Ns=!1;const Me=Ke.getUniforms(),cn=Nt.uniforms;if(wt.useProgram(Ke.program)&&(Wi=!0,Je=!0,Ns=!0),j.id!==S&&(S=j.id,Je=!0),Wi||E!==T){wt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Me.setValue(z,"projectionMatrix",T.projectionMatrix),Me.setValue(z,"viewMatrix",T.matrixWorldInverse);const Ze=Me.map.cameraPosition;Ze!==void 0&&Ze.setValue(z,nt.setFromMatrixPosition(T.matrixWorld)),Dt.logarithmicDepthBuffer&&Me.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Me.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,Je=!0,Ns=!0)}if(H.isSkinnedMesh){Me.setOptional(z,H,"bindMatrix"),Me.setOptional(z,H,"bindMatrixInverse");const He=H.skeleton;He&&(He.boneTexture===null&&He.computeBoneTexture(),Me.setValue(z,"boneTexture",He.boneTexture,Ft))}H.isBatchedMesh&&(Me.setOptional(z,H,"batchingTexture"),Me.setValue(z,"batchingTexture",H._matricesTexture,Ft),Me.setOptional(z,H,"batchingIdTexture"),Me.setValue(z,"batchingIdTexture",H._indirectTexture,Ft),Me.setOptional(z,H,"batchingColorTexture"),H._colorsTexture!==null&&Me.setValue(z,"batchingColorTexture",H._colorsTexture,Ft));const ln=K.morphAttributes;if((ln.position!==void 0||ln.normal!==void 0||ln.color!==void 0)&&at.update(H,K,Ke),(Je||Nt.receiveShadow!==H.receiveShadow)&&(Nt.receiveShadow=H.receiveShadow,Me.setValue(z,"receiveShadow",H.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(cn.envMap.value=Et,cn.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&V.environment!==null&&(cn.envMapIntensity.value=V.environmentIntensity),Je&&(Me.setValue(z,"toneMappingExposure",_.toneMappingExposure),Nt.needsLights&&Jf(cn,Ns),lt&&j.fog===!0&&$.refreshFogUniforms(cn,lt),$.refreshMaterialUniforms(cn,j,D,U,p.state.transmissionRenderTarget[T.id]),uo.upload(z,Nl(Nt),cn,Ft)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(uo.upload(z,Nl(Nt),cn,Ft),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Me.setValue(z,"center",H.center),Me.setValue(z,"modelViewMatrix",H.modelViewMatrix),Me.setValue(z,"normalMatrix",H.normalMatrix),Me.setValue(z,"modelMatrix",H.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const He=j.uniformsGroups;for(let Ze=0,Vo=He.length;Ze<Vo;Ze++){const xi=He[Ze];Xt.update(xi,Ke),Xt.bind(xi,Ke)}}return Ke}function Jf(T,V){T.ambientLightColor.needsUpdate=V,T.lightProbe.needsUpdate=V,T.directionalLights.needsUpdate=V,T.directionalLightShadows.needsUpdate=V,T.pointLights.needsUpdate=V,T.pointLightShadows.needsUpdate=V,T.spotLights.needsUpdate=V,T.spotLightShadows.needsUpdate=V,T.rectAreaLights.needsUpdate=V,T.hemisphereLights.needsUpdate=V}function jf(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(T,V,K){const j=St.get(T);j.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),St.get(T.texture).__webglTexture=V,St.get(T.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:K,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,V){const K=St.get(T);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0};const Qf=z.createFramebuffer();this.setRenderTarget=function(T,V=0,K=0){F=T,A=V,P=K;let j=!0,H=null,lt=!1,yt=!1;if(T){const Et=St.get(T);if(Et.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(z.FRAMEBUFFER,null),j=!1;else if(Et.__webglFramebuffer===void 0)Ft.setupRenderTarget(T);else if(Et.__hasExternalTextures)Ft.rebindTextures(T,St.get(T.texture).__webglTexture,St.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const It=T.depthTexture;if(Et.__boundDepthTexture!==It){if(It!==null&&St.has(It)&&(T.width!==It.image.width||T.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(T)}}const Ot=T.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(yt=!0);const Wt=St.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Wt[V])?H=Wt[V][K]:H=Wt[V],lt=!0):T.samples>0&&Ft.useMultisampledRTT(T)===!1?H=St.get(T).__webglMultisampledFramebuffer:Array.isArray(Wt)?H=Wt[K]:H=Wt,L.copy(T.viewport),G.copy(T.scissor),k=T.scissorTest}else L.copy(N).multiplyScalar(D).floor(),G.copy(Q).multiplyScalar(D).floor(),k=Mt;if(K!==0&&(H=Qf),wt.bindFramebuffer(z.FRAMEBUFFER,H)&&j&&wt.drawBuffers(T,H),wt.viewport(L),wt.scissor(G),wt.setScissorTest(k),lt){const Et=St.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+V,Et.__webglTexture,K)}else if(yt){const Et=V;for(let Ot=0;Ot<T.textures.length;Ot++){const Wt=St.get(T.textures[Ot]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ot,Wt.__webglTexture,K,Et)}}else if(T!==null&&K!==0){const Et=St.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Et.__webglTexture,K)}S=-1},this.readRenderTargetPixels=function(T,V,K,j,H,lt,yt,Ct=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=St.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et){wt.bindFramebuffer(z.FRAMEBUFFER,Et);try{const Ot=T.textures[Ct],Wt=Ot.format,It=Ot.type;if(!Dt.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=T.width-j&&K>=0&&K<=T.height-H&&(T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ct),z.readPixels(V,K,j,H,Rt.convert(Wt),Rt.convert(It),lt))}finally{const Ot=F!==null?St.get(F).__webglFramebuffer:null;wt.bindFramebuffer(z.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(T,V,K,j,H,lt,yt,Ct=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=St.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&yt!==void 0&&(Et=Et[yt]),Et)if(V>=0&&V<=T.width-j&&K>=0&&K<=T.height-H){wt.bindFramebuffer(z.FRAMEBUFFER,Et);const Ot=T.textures[Ct],Wt=Ot.format,It=Ot.type;if(!Dt.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(It))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const te=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,te),z.bufferData(z.PIXEL_PACK_BUFFER,lt.byteLength,z.STREAM_READ),T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ct),z.readPixels(V,K,j,H,Rt.convert(Wt),Rt.convert(It),0);const he=F!==null?St.get(F).__webglFramebuffer:null;wt.bindFramebuffer(z.FRAMEBUFFER,he);const be=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await cp(z,be,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,te),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,lt),z.deleteBuffer(te),z.deleteSync(be),lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,V=null,K=0){const j=Math.pow(2,-K),H=Math.floor(T.image.width*j),lt=Math.floor(T.image.height*j),yt=V!==null?V.x:0,Ct=V!==null?V.y:0;Ft.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,K,0,0,yt,Ct,H,lt),wt.unbindTexture()};const td=z.createFramebuffer(),ed=z.createFramebuffer();this.copyTextureToTexture=function(T,V,K=null,j=null,H=0,lt=null){lt===null&&(H!==0?(hr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),lt=H,H=0):lt=0);let yt,Ct,Et,Ot,Wt,It,te,he,be;const xe=T.isCompressedTexture?T.mipmaps[lt]:T.image;if(K!==null)yt=K.max.x-K.min.x,Ct=K.max.y-K.min.y,Et=K.isBox3?K.max.z-K.min.z:1,Ot=K.min.x,Wt=K.min.y,It=K.isBox3?K.min.z:0;else{const ln=Math.pow(2,-H);yt=Math.floor(xe.width*ln),Ct=Math.floor(xe.height*ln),T.isDataArrayTexture?Et=xe.depth:T.isData3DTexture?Et=Math.floor(xe.depth*ln):Et=1,Ot=0,Wt=0,It=0}j!==null?(te=j.x,he=j.y,be=j.z):(te=0,he=0,be=0);const pe=Rt.convert(V.format),Nt=Rt.convert(V.type);let ve;V.isData3DTexture?(Ft.setTexture3D(V,0),ve=z.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Ft.setTexture2DArray(V,0),ve=z.TEXTURE_2D_ARRAY):(Ft.setTexture2D(V,0),ve=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,V.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,V.unpackAlignment);const se=z.getParameter(z.UNPACK_ROW_LENGTH),Ke=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Wi=z.getParameter(z.UNPACK_SKIP_PIXELS),Je=z.getParameter(z.UNPACK_SKIP_ROWS),Ns=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,xe.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,xe.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ot),z.pixelStorei(z.UNPACK_SKIP_ROWS,Wt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,It);const Me=T.isDataArrayTexture||T.isData3DTexture,cn=V.isDataArrayTexture||V.isData3DTexture;if(T.isDepthTexture){const ln=St.get(T),He=St.get(V),Ze=St.get(ln.__renderTarget),Vo=St.get(He.__renderTarget);wt.bindFramebuffer(z.READ_FRAMEBUFFER,Ze.__webglFramebuffer),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Vo.__webglFramebuffer);for(let xi=0;xi<Et;xi++)Me&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,St.get(T).__webglTexture,H,It+xi),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,St.get(V).__webglTexture,lt,be+xi)),z.blitFramebuffer(Ot,Wt,yt,Ct,te,he,yt,Ct,z.DEPTH_BUFFER_BIT,z.NEAREST);wt.bindFramebuffer(z.READ_FRAMEBUFFER,null),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(H!==0||T.isRenderTargetTexture||St.has(T)){const ln=St.get(T),He=St.get(V);wt.bindFramebuffer(z.READ_FRAMEBUFFER,td),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,ed);for(let Ze=0;Ze<Et;Ze++)Me?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ln.__webglTexture,H,It+Ze):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ln.__webglTexture,H),cn?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,He.__webglTexture,lt,be+Ze):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,He.__webglTexture,lt),H!==0?z.blitFramebuffer(Ot,Wt,yt,Ct,te,he,yt,Ct,z.COLOR_BUFFER_BIT,z.NEAREST):cn?z.copyTexSubImage3D(ve,lt,te,he,be+Ze,Ot,Wt,yt,Ct):z.copyTexSubImage2D(ve,lt,te,he,Ot,Wt,yt,Ct);wt.bindFramebuffer(z.READ_FRAMEBUFFER,null),wt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else cn?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(ve,lt,te,he,be,yt,Ct,Et,pe,Nt,xe.data):V.isCompressedArrayTexture?z.compressedTexSubImage3D(ve,lt,te,he,be,yt,Ct,Et,pe,xe.data):z.texSubImage3D(ve,lt,te,he,be,yt,Ct,Et,pe,Nt,xe):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,lt,te,he,yt,Ct,pe,Nt,xe.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,lt,te,he,xe.width,xe.height,pe,xe.data):z.texSubImage2D(z.TEXTURE_2D,lt,te,he,yt,Ct,pe,Nt,xe);z.pixelStorei(z.UNPACK_ROW_LENGTH,se),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ke),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Wi),z.pixelStorei(z.UNPACK_SKIP_ROWS,Je),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Ns),lt===0&&V.generateMipmaps&&z.generateMipmap(ve),wt.unbindTexture()},this.initRenderTarget=function(T){St.get(T).__webglFramebuffer===void 0&&Ft.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ft.setTextureCube(T,0):T.isData3DTexture?Ft.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ft.setTexture2DArray(T,0):Ft.setTexture2D(T,0),wt.unbindTexture()},this.resetState=function(){A=0,P=0,F=null,wt.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}function dv(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}function fo(i,t){return Math.hypot(i.x-t.x,i.z-t.z)}function Tf(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Math.max(0,Math.min(1,((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1)));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function eu(i,t){let e=1/0;for(let n=1;n<(t||[]).length;n++)e=Math.min(e,Tf(i,t[n-1],t[n]));return e}function nu(i,t,e=.8){const n=i.bounds,s=i.target,r=i.spawn;return!(t.x<n.minX+2||t.x>n.maxX-2||t.z<n.minZ+2||t.z>n.maxZ-2||!ae(i,t.x,t.z,e)||r&&fo(t,r)<14||s&&fo(t,s)<(s.radius||5)+11||(i.roads||[]).some(o=>eu(t,o.points)<(o.width||4)/2+2.8)||(i.rivers||[]).some(o=>eu(t,o.points)<o.width/2+1.4)||(i.obstacles||[]).some(o=>fo(t,o)<(o.radius||1)+2.1)||(i.fenceSegments||[]).some(o=>Tf(t,o.a,o.b)<2.8))}function pv(i,{seed:t=(i.seed||42)+93371,maxClusters:e}={}){const n=i.bounds,s=(n.maxX-n.minX)*(n.maxZ-n.minZ),r=Math.max(3,Math.min(24,Math.ceil(s/1600))),o=Math.max(0,Math.min(32,Math.floor(e??r))),a=dv(t),c=[],l=[];for(let h=0;h<o*90&&l.length<o;h++){const u={x:n.minX+2+a()*(n.maxX-n.minX-4),z:n.minZ+2+a()*(n.maxZ-n.minZ-4)};if(!nu(i,u,.85)||l.some(x=>fo(u,x)<5.5))continue;const d=3+Math.floor(a()*3),f=l.length,g=[];for(let x=0;x<d;x++){const m=a()*Math.PI*2,p=x===0?0:.55+a()*1.25,M={x:u.x+Math.cos(m)*p,z:u.z+Math.sin(m)*p};nu(i,M,.55)&&g.push({x:M.x,z:M.z,variant:Math.floor(a()*3),scale:.66+a()*.48,cluster:f})}g.length<2||(l.push(u),c.push(...g))}return c}const mv="#9ceeff",gv="#39bfe8",xv="#ff7062",_v="#ff241b";function Aa(i,t){const n=(i?.userData?.parts||i)?.tailLight?.material;if(!n)return!1;const s=t?xv:mv,r=t?_v:gv;return n.color?.set&&n.color.set(s),n.emissive?.set&&n.emissive.set(r),n.emissiveIntensity=t?1.9:1.25,!0}const vv=[{id:"speed",name:"Turbo paws",icon:"paw",costs:[80,120,200],unlockLevels:[2,6,11],description:"Circle a roaming flock faster with upgraded paw motors.",tierNames:["Quick paws","Trail runner","Meadow racer"],tierDescriptions:["+1.8 m/s running speed","+2.7 m/s running speed","+3.5 m/s running speed"]},{id:"flock",name:"Friendly signal",icon:"signal",costs:[120,180,260],unlockLevels:[7,10,15],description:"Reach more robots with a wider herding signal.",tierNames:["Clear signal","Pasture beacon","Far-field beacon"],tierDescriptions:["+2 m herding range","+3 m herding range","+4 m herding range"]},{id:"drone",name:"Scout drone",icon:"drone",costs:[200,360,540],unlockLevels:[10,14,18],description:"A hovering helper keeps the main herd together while you lead the way.",tierNames:["Scout","Shepherd scout","Flock captain"],tierDescriptions:["Keeps the main herd together; holds when you leave","33% stronger drone support","67% stronger drone support"]},{id:"helper",name:"Buddy dog",icon:"dog",costs:[600,850,1200],unlockLevels:[20,24,28],description:"Herds from the rear, supports split flocks, and learns to retrieve strays.",tierNames:["Farm friend","Trail partner","Senior shepherd"],tierDescriptions:["Herds from behind in the flock’s direction of travel","Guides the smaller flock and passages; barks autonomously","Also retrieves wanderers and bolters to the nearest flock"]},{id:"bark",name:"Happy bark",icon:"bark",costs:[100,160,240],unlockLevels:[4,8,13],description:"A stronger bark gives wandering robots a cheerful nudge.",tierNames:["Bright bark","Resonant bark","Meadow chorus"],tierDescriptions:["+0.25 bark strength","+0.45 bark strength","+0.65 bark strength"]},{id:"cohesion",name:"Flock harmony",icon:"harmony",costs:[160,220,320],unlockLevels:[12,14,15],description:"Robots regroup more readily when the flock stretches across a meadow.",tierNames:["Stay together","Close companions","Perfect formation"],tierDescriptions:["12% stronger regrouping","23% stronger regrouping","35% stronger regrouping"]}],Io=Object.freeze(vv.map(i=>Object.freeze({...i,cost:i.costs[0],maxLevel:i.costs.length,costs:Object.freeze(i.costs),unlockLevels:Object.freeze(i.unlockLevels),tierNames:Object.freeze(i.tierNames),tierDescriptions:Object.freeze(i.tierDescriptions)}))),Sr=i=>Io.find(t=>t.id===i);function Jn(i,t){const e=Sr(t);if(!e||!i||typeof i!="object")return 0;const n=Object.hasOwn(i,t)?i[t]:void 0;return n===!0?1:Number.isInteger(n)&&n>0?Math.min(n,e.maxLevel):0}function fl(i,t){const e=Sr(t);return e?e.costs[Jn(i,t)]??null:null}function Af(i){const t={};for(const e of Io){const n=Jn(i,e.id);n&&(t[e.id]=n)}return t}function Rf(i,t){return Sr(t)?.unlockLevels[Jn(i,t)]??null}function dl(i){if(typeof i=="number")return Number.isInteger(i)?Math.max(1,Math.min(100,i)):1;const t=i;if(!t||typeof t!="object")return 1;const e=Number.isInteger(t.highestLevel)&&t.highestLevel>=0?Math.min(99,t.highestLevel):0,s=(Array.isArray(t.completedLevels)?t.completedLevels:[]).reduce((r,o)=>Number.isInteger(o)&&o>=0&&o<=99?Math.max(r,Math.min(100,o+2)):r,1);return Math.max(e+1,s)}function Mv(i,t,e=i){const n=typeof i=="object"?i:null,s=Sr(t),r=dl(e),o=Jn(n?.upgrades,t),a=fl(n?.upgrades,t),c=Rf(n?.upgrades,t),l=s?a===null?"owned":r<c?"locked":n&&(!Number.isFinite(n.points)||n.points<a)?"points":null:"unknown";return{available:l===null,reason:l,level:o,nextLevel:a===null?null:o+1,cost:a,unlockLevel:c,currentLevelNumber:r}}function Cf(i,t=1){const e=dl(t),n={};for(const s of Io){const r=Jn(i,s.id),o=s.unlockLevels.filter(c=>c<=e).length,a=Math.min(r,o);a&&(n[s.id]=a)}return n}function yv(i,t,e=i){const n=Sr(t);if(!n)return{ok:!1,reason:"unknown"};if(!i||typeof i!="object")return{ok:!1,reason:"points"};const s=Jn(i.upgrades,t),r=fl(i.upgrades,t);if(r===null)return{ok:!1,reason:"owned"};const o=Rf(i.upgrades,t);return dl(e)<o?{ok:!1,reason:"locked",unlockLevel:o}:!Number.isFinite(i.points)||i.points<r?{ok:!1,reason:"points"}:(i.points-=r,i.upgrades={...Af(i.upgrades),[t]:s+1},{ok:!0,upgrade:n,level:s+1,cost:r})}function Sv(i,t=1){const e=Cf(i,t),n=r=>Jn(e,r);return{speedBoost:[0,1.8,2.7,3.5][n("speed")],signalBoost:[0,2,3,4][n("flock")],barkBoost:[0,.25,.45,.65][n("bark")],cohesionBoost:[0,.12,.23,.35][n("cohesion")],droneStrength:[0,.7,.93,1.17][n("drone")],helperStrength:[0,1,1.3,1.58][n("helper")],drone:n("drone")>0,helper:n("helper")>0,helperTier:n("helper")}}const Pe=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z);function Pf(i,t,e,n=.6){if(!ae(i,e.x,e.z,n)){let s=null,r=1/0;for(const o of[.6,1.2,1.8,2.4,3.2,4.5,6]){for(let a=0;a<24;a++){const c=a*Math.PI/12,l={x:e.x+Math.cos(c)*o,z:e.z+Math.sin(c)*o},h=o+Pe(t,l)*.015;h<r&&ae(i,l.x,l.z,n+.08)&&(s=l,r=h)}if(s)break}if(!s)return null;e=s}return e}function ui(i,t,e,n=.6){if(e=Pf(i,t,e,n),!e)return{x:t.x,z:t.z};let s=$c(i,t,e,n);oe({...i,obstacles:[]},t,e,n)&&(s=e);const r=t.buddyNavigation;if(r&&Pe(r.goal,s)<3&&i.time<r.until){for(;r.path.length&&Pe(t,r.path[0])<.45;)r.path.shift();if(r.path.length&&oe(i,t,r.path[0],n))return r.path[0]}if(oe(i,t,s,n))return delete t.buddyNavigation,s;const o=(i.obstacles||[]).filter(d=>Pe(t,d)<Math.min(24,Pe(t,s)+6)&&on(d,t,s)<d.radius+n+4).sort((d,f)=>Pe(t,d)-Pe(t,f)).slice(0,6);if(!o.length)return s;const a=[t,s];for(const d of o){const f=(d.radius+n+.16)/Math.cos(Math.PI/12);for(let g=0;g<12;g++){const x=g*Math.PI/6,m={x:d.x+Math.cos(x)*f,z:d.z+Math.sin(x)*f};ae(i,m.x,m.z,n)&&a.push(m)}}const c=a.map(()=>1/0),l=[],h=new Set;c[0]=0;for(let d=0;d<a.length;d++){let f=-1;for(let g=0;g<a.length;g++)!h.has(g)&&(f<0||c[g]<c[f])&&(f=g);if(f<0||!Number.isFinite(c[f])||f===1)break;h.add(f);for(let g=1;g<a.length;g++){if(h.has(g))continue;const x=c[f]+Pe(a[f],a[g]);x>=c[g]||!oe(i,a[f],a[g],n)||(c[g]=x,l[g]=f)}}if(!Number.isFinite(c[1]))return s;const u=[];for(let d=1;d!==0;d=l[d])u.unshift({x:a[d].x,z:a[d].z});return t.buddyNavigation={goal:{x:s.x,z:s.z},path:u,until:i.time+2},u[0]}const Nc=new WeakMap;function ir(i){delete i.buddyRecovery,Nc.delete(i),delete i.buddyNavigation,delete i.navigationBlocked}function Fc(i,t,e,n,{taskKey:s,active:r=!0,yielding:o=!1}={}){if(!(n>0)||!Number.isFinite(n))return{x:t.x,z:t.z};if(e=Pf(i,t,e),!e)return ir(t),{x:t.x,z:t.z};if(!r||o||Pe(t,e)<.55)return ir(t),ui(i,t,e);let a=t.buddyRecovery;if((!a||Nc.get(t)!==i||a.lastTime>i.time||a.taskKey!==s||Pe(a.goal,e)>6)&&(ir(t),a=t.buddyRecovery={lastTime:i.time,taskKey:s,bestDistance:Pe(t,e),goal:{...e},progressGoal:{...e},progressDistance:Pe(t,e),progressElapsed:0,anchor:{x:t.x,z:t.z},blocked:0,attempts:0,elapsed:0}),Nc.set(t,i),a.lastTime=i.time,a.elapsed+=n,Pe(a.progressGoal,e)>.5||Pe(t,e)<a.progressDistance-1e-5?(a.progressGoal={...e},a.progressDistance=Pe(t,e),a.progressElapsed=0):a.progressElapsed+=n,a.waitUntil){if(a.elapsed<a.waitUntil)return{x:t.x,z:t.z};delete a.waitUntil,a.attempts=0,a.blocked=0,delete t.buddyNavigation}if(a.escape)if(Pe(t,a.escape)<.3||a.elapsed>=a.escapeUntil||!oe(i,t,a.escape,.6))delete a.escape,delete t.buddyNavigation,a.blocked=0,a.progressElapsed=0,a.anchor={x:t.x,z:t.z};else return a.escape;if(Pe(t,a.anchor)>.3&&(a.anchor={x:t.x,z:t.z},a.blocked=0,Pe(t,e)<a.bestDistance-.5&&(a.attempts=0,a.bestDistance=Pe(t,e))),a.blocked=t.navigationBlocked?a.blocked+n:Math.max(0,a.blocked-n),a.blocked<1.5&&a.progressElapsed<6)return ui(i,t,e);if(delete t.buddyNavigation,a.attempts>=3)return a.waitUntil=a.elapsed+2,a.blocked=0,{x:t.x,z:t.z};const c=Math.atan2(e.x-t.x,e.z-t.z),l=a.attempts%2?-1:1;a.attempts++,a.blocked=0,a.progressElapsed=0;for(const h of[c+l*Math.PI*.65,c-l*Math.PI*.65,c+Math.PI,c+l*Math.PI/2]){const u={x:t.x+Math.sin(h)*1.8,z:t.z+Math.cos(h)*1.8};if(ae(i,u.x,u.z,.68)&&oe(i,t,u,.6))return a.escape=u,a.escapeUntil=a.elapsed+2,u}return a.waitUntil=a.elapsed+2,{x:t.x,z:t.z}}const Df=(i,t)=>Math.atan2(Math.sin(i-t),Math.cos(i-t));function zo(i,t,e,n){const s=Df(t,i),r=e*n;return i+Math.max(-r,Math.min(r,s))}function gs(i,t,e,n,s){if(!(n>0)||!Number.isFinite(n))return;const r=e.x-t.x,o=e.z-t.z,a=Math.hypot(r,o),c={x:t.x,z:t.z};if(t.navigationBlocked=!1,a>1e-4){const l=Math.atan2(r,o);t.heading=zo(t.heading??l,l,2.8,n);const h=Math.max(0,Math.cos(Df(l,t.heading))),u=5,d=10,f=Math.min(Math.max(0,s),a*u)*h,g=Math.max(0,t.moveSpeed??Math.hypot(t.vx||0,t.vz||0)),x=g+Math.max(-d*n,Math.min(d*n,f-g)),m=Math.min(a,n*x),p=Qs(i,t,Math.sin(t.heading)*m,Math.cos(t.heading)*m,.6);t.navigationBlocked=p.blockedX||p.blockedZ;const M=Math.hypot(t.x-c.x,t.z-c.z);t.moveSpeed=p.blockedX||p.blockedZ?M/n:x}else t.moveSpeed=Math.max(0,(t.moveSpeed||0)-10*n);t.vx=(t.x-c.x)/n,t.vz=(t.z-c.z)/n}const zt=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Pi=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:0}},ai=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function pl(i,t,e=(n,s)=>oe(i,n,s,.15)){const n=new Set(t),s=[];for(;n.size;){const r=n.values().next().value,o=[r];n.delete(r);for(let a=0;a<o.length;a++)for(const c of n)zt(o[a],c)<=6.5&&e(o[a],c)&&(o.push(c),n.delete(c));s.push(o)}return s}const Ms=(i,t=[])=>i.filter(e=>t.includes(e.id)).length,Ra=(i,t,e)=>Ms(t,e)-Ms(i,e)||Math.min(...i.map(n=>n.id))-Math.min(...t.map(n=>n.id)),yo=i=>Ne(i),ys=(i,t,e)=>((i.x-t.x)*Math.sin(t.heading)+(i.z-t.z)*Math.cos(t.heading))*e;function If(i,t,e){return!e.length||(t.kind==="goal"?e.every(n=>vr(i.target,n,yo(n))):e.every(n=>ys(n,t.bridge,t.sign)>t.bridge.length/2+3))}function wv(i,t){return zt(t,i.target)<pn(i.target).halfLength+12||(i.rivers||[]).some(e=>e.bridges.some(n=>zt(t,n)<n.length/2+12))}function bv(i,t,e,n){if(t.passage){const l=t.passage,h=l.kind==="goal"?i.target:l.bridge;if(!If(i,l,e)&&zt(ai(e),h)<(h.length||h.radius||5)+22)return l;delete t.passage}const s=ai(e),r=pn(i.target),o=zt(i.dog,i.target)<i.target.radius+12||e.some(l=>zt(l,i.dog)<14&&oe(i,l,i.dog,.15));if(o&&zt(s,i.target)<r.halfLength+12&&!e.every(l=>vr(i.target,l,yo(l))))return t.passage={kind:"goal",ids:e.map(l=>l.id)};const a=(i.rivers||[]).flatMap(l=>l.bridges).sort((l,h)=>zt(l,s)-zt(h,s));let c=t.forward&&n;if(!c&&o&&(c=Pi(s.x-i.dog.x,s.z-i.dog.z)),!c)return null;for(const l of a){if(zt(s,l)>l.length/2+12)continue;const h=c.x*Math.sin(l.heading)+c.z*Math.cos(l.heading);if(Math.abs(h)<.25)continue;const u=Math.sign(h);if(!(ys(s,l,u)>l.length/2+1))return t.passage={kind:"bridge",bridge:l,sign:u,ids:e.map(f=>f.id)}}return null}function iu(i,t,e){if(t.kind==="goal")return Du(i,e);const n=t.bridge,s=n.length/2+4;return{x:n.x+Math.sin(n.heading)*t.sign*s,z:n.z+Math.cos(n.heading)*t.sign*s}}const Ca=3;function su(i,t){let e=0;for(const s of i.rivers||[])for(const r of s.bridges)Math.abs((t.x-r.x)*Math.cos(r.heading)-(t.z-r.z)*Math.sin(r.heading))<r.width/2+1&&Math.abs(ys(t,r,1))<r.length/2+2&&(e+=15);for(const s of i.gates||[])zt(t,s)<4&&(e+=15);const n=Du(i,i.dog);return zt(t,n)<4&&(e+=15),e}function Ev(i,t,e,n){if(!e.standby||zt(e.standby,i.dog)>7||zt(e.standby,i.dog)<2||!ae(i,e.standby.x,e.standby.z,.6)){const s=[];zt(t,i.dog)>=2&&zt(t,i.dog)<=7&&s.push({x:t.x,z:t.z});for(const o of[3.5,5.5])for(let a=0;a<12;a++){const c=a*Math.PI/6;s.push({x:i.dog.x+Math.sin(c)*o,z:i.dog.z+Math.cos(c)*o})}const r=s.filter(o=>{if(!ae(i,o.x,o.z,.68)||!oe(i,i.dog,o,.6))return!1;if(oe(i,t,o,.6))return!0;const a={x:t.x,z:t.z},c=[];for(let l=0;l<16;l++){if(oe(i,a,o,.6))return!0;const h=ui(i,a,o,.6);if(zt(a,h)<.05||!ae(i,h.x,h.z,.6)||!oe(i,a,h,.6)||c.some(u=>zt(u,h)<.1))return!1;c.push({x:a.x,z:a.z}),a.x=h.x,a.z=h.z}return!1});r.sort((o,a)=>su(i,o)-su(i,a)||zt(t,o)-zt(t,a)),e.standby=r[0]||{x:t.x,z:t.z}}if(t.desired={...e.standby},zt(t,e.standby)<.08){t.moveSpeed=0,t.vx=0,t.vz=0;return}gs(i,t,ui(i,t,e.standby,.6),n,4)}function Tv(i,t,e,n,s,r){const o=i.dog,a=zt(o,n)<Ca||zt(o,t)<2.2;if(!a&&(!e.yield||zt(o,n)>Ca+1)&&delete e.yield,!a&&!e.yield)return n;const c=e.yield?.side||Math.sign((t.x-o.x)*-s.z+(t.z-o.z)*s.x)||1;e.yield={side:c,since:e.yield?.since??i.time};const l=[];for(const h of[3.5,5,2])for(const u of[c,-c]){const d={x:n.x-s.z*h*u,z:n.z+s.x*h*u};ae(i,d.x,d.z,.68)&&oe(i,n,d,.6)&&l.push({p:d,side:u,cost:Math.max(0,Ca-zt(d,o))*10+h+(u!==c?2:0)})}return l.sort((h,u)=>h.cost-u.cost),l.length?(e.yield.side=l[0].side,l[0].p):r||zt(o,n)>=1.6||i.time-e.yield.since>1.2?n:{x:t.x,z:t.z}}function Av(i,t,e,n){const s=t.map(l=>l.id),r=(i.flows||[]).sort((l,h)=>Ms(t,h.ids)-Ms(t,l.ids))[0],o=r&&Ms(t,r.ids)>0?r:{ids:s,forward:null};o.ids=s,o.at=n;const a=t.reduce((l,h)=>({x:l.x+(h.vx||0)/t.length,z:l.z+(h.vz||0)/t.length}),{x:0,z:0}),c=Math.hypot(a.x,a.z)>.28;if(c){const l=Pi(a.x,a.z),h=o.forward?zo(Math.atan2(o.forward.x,o.forward.z),Math.atan2(l.x,l.z),1.8,e):Math.atan2(l.x,l.z);o.forward={x:Math.sin(h),z:Math.cos(h)}}return i.flows=[...(i.flows||[]).filter(l=>l!==o&&n-l.at<5),o],{moving:c,forward:o.forward||{x:0,z:1},measured:o.forward}}const Rv=18,Cv=14;function Pv(i,t,e){const n=ai(e),s={...i,obstacles:[]},r=e.some(u=>oe(s,i.dog,u,.6)),o=Math.min(...e.map(u=>zt(i.dog,u))),a=t.containment,c=a&&Ms(e,a.ids)>0;if(!(!r||o>(c?Cv:Rv)))return delete t.containment,null;const h=c?a:{anchor:{...n},positions:{},acquired:!1,angle:null};h.ids=e.map(u=>u.id);for(const u of e)h.positions[u.id]||={x:u.x,z:u.z};return t.containment=h,h}function Dv(i,t,e,n,s,r,o){if(t.mode="contain",t.barking=!1,delete t.forward,!n.acquired){delete n.check,delete n.watchUntil;const d=[...s].sort((m,p)=>zt(t,m)-zt(t,p))[0],f=Pi(t.x-d.x,t.z-d.z),g={x:d.x+f.x*4,z:d.z+f.z*4};t.desired=g,t.containmentActivity="approach";const x=Fc(i,t,g,r,{taskKey:o,active:!0});gs(i,t,x,r,7);return}const a=n.anchor,c=Math.max(3,...s.map(d=>zt(d,a)+Ne(d))),l=c+3.5;if(n.angle??=Math.atan2(t.x-a.x,t.z-a.z),n.watchUntil>i.time){t.desired={x:t.x,z:t.z},gs(i,t,t.desired,r,0),t.heading=zo(t.heading??0,Math.atan2(a.x-t.x,a.z-t.z),1.4,r),t.containmentActivity="watch";return}if(n.check&&zt(t,n.check)<.4){n.watchUntil=i.time+4+(n.checkIndex||0)%4,delete n.check,t.containmentActivity="watch",gs(i,t,{x:t.x,z:t.z},r,0);return}if(!n.check){n.checkIndex=(n.checkIndex||0)+1;const f=s.filter(x=>n.positions[x.id]&&zt(x,n.positions[x.id])>1.2).sort((x,m)=>zt(m,n.positions[m.id])-zt(x,n.positions[x.id]))[0],g=f?Math.atan2(f.x-a.x,f.z-a.z):n.angle+(n.checkIndex%2?1:-1)*Math.PI/3;for(let x=0;x<24;x++){const m=g+(x%2?1:-1)*Math.ceil(x/2)*Math.PI/12,p={x:a.x+Math.sin(m)*l,z:a.z+Math.cos(m)*l};if(!ae(i,p.x,p.z,.68))continue;const M=ui(i,t,p,.6),v=M.x-t.x,_=M.z-t.z,b=v*v+_*_,A=b?Math.max(0,Math.min(1,((a.x-t.x)*v+(a.z-t.z)*_)/b)):0,P={x:t.x+v*A,z:t.z+_*A};if(!(zt(t,a)>c+1&&zt(P,a)<c+1)){n.check=p,n.angle=m,n.checkStarted=i.time;break}}}const h=n.check||{x:t.x,z:t.z};t.containmentActivity="check",t.desired=h;const u=Fc(i,t,h,r,{taskKey:o,active:zt(t,h)>.5});gs(i,t,u,r,2.6),n.check&&i.time-n.checkStarted>15&&(delete n.check,n.watchUntil=i.time+4)}function Iv(i,t,e,n,s){if(!(n>0)||!e.helper)return{forces:new Map,memberIds:new Set};let r=i.helpers.find(N=>N.type==="helper");r||(r={type:"helper",x:i.dog.x,z:i.dog.z},i.helpers.push(r));const o=i.buddyHerd||={},a=e.helperTier;r.barking=i.time<(r.barkUntil||0);let c=a>=3&&t.find(N=>N.id===o.retrieveId);const l=t.filter(N=>N.id!==c?.id&&!N.wander&&!N.wanderHome),h=l.map(N=>N.id).join(",");(!o.groups||h!==o.signature||i.time-o.checkedAt>=.25)&&(o.allGroups=pl(i,l),o.groups=o.allGroups.filter(N=>N.length>=2),o.signature=h,o.checkedAt=i.time);let u=o.groups;if(!u.length&&a>=2){const N=(o.allGroups||[]).filter(Q=>wv(i,Q[0])).sort((Q,Mt)=>zt(r,Q[0])-zt(r,Mt[0]))[0];N&&(u=[N])}u.sort((N,Q)=>Q.length-N.length||Ra(N,Q,o.travelIds));const d=u[0];if(!d)return r.mode="standby",r.clusterIds=[],r.targetId=null,r.barking=!1,o.task!=="standby"&&(r.moveSpeed=0,r.vx=0,r.vz=0,delete r.buddyNavigation,ir(r),delete o.passage,delete o.workHeading,delete o.orbitSide,delete o.yield,delete r.forward),o.task="standby",delete o.containment,delete o.retrieveId,Ev(i,r,o,n),{forces:new Map,memberIds:new Set};o.travelIds=d.map(N=>N.id);const f=N=>[...u].sort((Q,Mt)=>zt(N,ai(Q))-zt(N,ai(Mt))||Ra(Q,Mt))[0];c&&f(c).some(Q=>zt(Q,c)<=4.5&&oe(i,Q,c,.15))&&(delete o.retrieveId,c=null),a>=3&&!c&&u.some(N=>N.length>=2)&&(c=t.filter(N=>(N.wander||N.wanderHome)&&!u.some(Q=>Q.some(Mt=>Mt.id===N.id))).sort((N,Q)=>+!!Q.wander?.bolting-+!!N.wander?.bolting||zt(r,N)-zt(r,Q)||N.id-Q.id)[0],c&&(o.retrieveId=c.id)),c||delete o.retrieveId;let g=a>=2?[...u].sort((N,Q)=>N.length-Q.length||Ra(N,Q,r.clusterIds))[0]:d;if(a>=2&&o.passage){const N=t.filter(Q=>o.passage.ids.includes(Q.id)&&!Q.wander&&!Q.wanderHome);N.length&&!If(i,o.passage,N)&&(g=N)}const x=c?f(c):g,{moving:m,forward:p,measured:M}=Av(o,x,n,i.time);o.forward=M;const v=Pv(i,o,x),_=!v&&!c&&a>=2?bv(i,o,x,p):null;v&&delete o.passage;const b=`${c?"retrieve":v?"contain":_?.kind||"flock"}:${c?.id??x.map(N=>N.id).join(",")}`;o.task!==b&&(delete r.buddyNavigation,ir(r),delete o.standby,delete o.yield,delete o.orbitSide,delete o.workHeading),o.task=b;const A=ai(x);r.clusterIds=x.map(N=>N.id),r.anchor=A,r.targetId=c?.id??null;const P=new Map;if(v){const N=x.some(B=>zt(r,B)<12&&oe(i,r,B,.15)),Q=ai(x),Mt=Math.max(3,...x.map(B=>zt(B,Q)+Ne(B))),xt={...i,obstacles:[]},tt=zt(r,Q)<=Mt+8&&x.some(B=>oe(xt,r,B,.6));if(v.acquired&&!tt&&(v.acquired=!1),v.acquired||(v.anchor=Q),!v.acquired&&N&&(v.acquired=!0,v.anchor=ai(x),v.positions=Object.fromEntries(x.map(B=>[B.id,{x:B.x,z:B.z}]))),v.acquired)for(const B of x)P.set(B.id,v.positions[B.id])}if(v&&!c)return Dv(i,r,o,v,x,n,b),{forces:new Map,memberIds:new Set,holds:P};let F=A,S=p;if(c){F=c;const N=Ne(c),Q=ui(i,c,A,N);S=Pi(Q.x-c.x,Q.z-c.z)}if(_){F=[...x].sort((Q,Mt)=>_.kind==="bridge"?ys(Q,_.bridge,_.sign)-ys(Mt,_.bridge,_.sign):zt(Mt,i.target)-zt(Q,i.target))[0];const N=ui(i,F,iu(i,_,F),yo(F));S=Pi(N.x-F.x,N.z-F.z)}if(c||_){const N=Math.atan2(S.x,S.z);o.workHeading=zo(o.workHeading??N,N,1.8,n),S={x:Math.sin(o.workHeading),z:Math.cos(o.workHeading)}}else delete o.workHeading;r.mode=c?"retrieve":_?_.kind:m?"herd":"hold";const E=c||_?0:Math.min(...x.map(N=>(N.x-A.x)*S.x+(N.z-A.z)*S.z)),L=c?{x:(c.vx||0)*.4,z:(c.vz||0)*.4}:{x:0,z:0};let G={x:F.x+S.x*(E-3.2)+L.x,z:F.z+S.z*(E-3.2)+L.z};r.desired=G,r.forward={...S};const k={x:r.x-F.x,z:r.z-F.z};let q=G;if(k.x*S.x+k.z*S.z>-2.5&&zt(r,F)<8){const N=o.orbitSide||=Math.sign(k.x*-S.z+k.z*S.x)||1;q={x:F.x-S.x*4.5-S.z*N*5+L.x,z:F.z-S.z*4.5+S.x*N*5+L.z}}k.x*S.x+k.z*S.z<-3&&delete o.orbitSide,q=Tv(i,r,o,q,S,_),r.desired=q;const R=Fc(i,r,q,n,{taskKey:b,active:zt(r,q)>.5,yielding:!!o.yield&&zt(r,i.dog)<2.2});gs(i,r,R,n,c?9:7);const w=c?[c]:x,U=new Map,D=new Set;if(!m&&!c&&!_)return{forces:U,memberIds:D,holds:P};const Z=N=>{if(!_)return S;const Q=ui(i,N,iu(i,_,N),yo(N));return Pi(Q.x-N.x,Q.z-N.z)},J=N=>{if(_?.kind==="bridge"&&ys(N,_.bridge,_.sign)>_.bridge.length/2+3)return!1;const Q=Z(N),Mt=Pi(N.x-r.x,N.z-r.z);return Mt.x*Q.x+Mt.z*Q.z>.6&&zt(r,N)<8&&oe(i,r,N,.15)};a>=2&&i.time>=(r.nextBarkAt||0)&&w.some(J)&&(r.barkUntil=i.time+.65,r.nextBarkAt=i.time+3.2,r.barking=!0,s.push({type:"buddyBark",x:r.x,z:r.z}));for(const N of w){if(!J(N))continue;const Q=Ne(N),Mt=(c?3.7:_?2.4:1.15)*e.helperStrength*(r.barking?1.45:1),xt=Z(N),tt=c||_?0:(A.x-N.x)*-S.z+(A.z-N.z)*S.x,B=Math.max(-.6,Math.min(.6,tt*.12)),W={x:xt.x*Mt-xt.z*B,z:xt.z*Mt+xt.x*B},nt={x:N.x+xt.x*.7,z:N.z+xt.z*.7};!ae(i,nt.x,nt.z,Q)||!oe(i,N,nt,Q)||(U.set(N.id,W),D.add(N.id))}return{forces:U,memberIds:D,holds:P}}const zv=i=>Ne(i),Pa=i=>({x:Math.sin(i.heading),z:Math.cos(i.heading)}),ru=(i,t,e)=>(i.x-t.x)*e.x+(i.z-t.z)*e.z;function Lv(i,t,e){let n=t.bridgeCrossing;const s=zv(t);if(n){const d=Pa(n.bridge);if(ru(e,n.bridge,d)*n.sign>n.bridge.length/2+s+.7&&ae(i,e.x,e.z,s))return delete t.bridgeCrossing,{finished:!0}}else t:for(const d of i.rivers||[])for(const f of d.bridges){const g=Pa(f),x=ru(e,f,g),m=(e.x-f.x)*g.z-(e.z-f.z)*g.x;if(Math.abs(x)>f.length/2+.15||Math.abs(m)>f.width/2-s||!ae(i,e.x,e.z,s))continue;const p=(e.vx||0)*g.x+(e.vz||0)*g.z;if(!(Math.abs(p)<.12)){n=t.bridgeCrossing={bridge:f,sign:Math.sign(p),lane:Math.max(-f.width/2+s+.35,Math.min(f.width/2-s-.35,m))};break t}}if(!n)return null;const r=n.bridge,o=Pa(r);let a;for(const d of[s+1.2,s+2,s+3.2,s+5]){const f=n.sign*(r.length/2+d),g={x:r.x+o.x*f+o.z*n.lane,z:r.z+o.z*f-o.x*n.lane};if(ae(i,g.x,g.z,s)){a=g;break}}if(!a)return null;const c=$c(i,e,a,s),l=c.x-e.x,h=c.z-e.z,u=Math.hypot(l,h);return u<.02||!oe(i,e,c,s)?{x:0,z:0,forward:o}:{x:l/u,z:h/u,forward:o}}function Uv(i){let t=i>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,(t>>>0)/4294967296}function xs(i,t,e,n=0){return Uv((i^Math.imul(t+1,2654435761)^Math.imul(e+1,2246822507)^n)>>>0)}const Nv=i=>Math.floor(Math.max(0,i)*.2);function Fv(i){const t=i+1;return{wanderChance:t>70?.25:t>40?.2:.33,boltChance:t>40?.2:.1,duration:t>=70?[5,10]:t>=40?[4,6]:[3,5]}}function Oc(i){const t=i.animals.filter(s=>!s.saved),e=t.map(s=>s.id).join(",");if(i.wanderCohort&&i.wanderCohortSignature===e)return i.wanderCohort;const n=new Set(t.map(s=>({id:s.id,rank:xs(i.seed^Math.imul(i.index+1,7919),s.id,0,5370206)})).sort((s,r)=>s.rank-r.rank||s.id-r.id).slice(0,Nv(t.length)).map(s=>s.id));return i.wanderCohort=n,i.wanderCohortSignature=e,i.wanderCohort}function Ov(i,t,e,n,s=!1){if(i.index<7||t.saved||s||t.wander||t.wanderHome)return null;const r=Fv(i.index);if(!Oc(i).has(t.id)||xs(i.seed,t.id,e,96785)>=r.wanderChance)return null;const o=t.x-n.x,a=t.z-n.z,c=Math.hypot(o,a),l=c>.01?{x:o/c,z:a/c}:{x:0,z:1},h=i.index>=16&&xs(i.seed,t.id,e,45079)<r.boltChance,u=h?r.duration[0]+xs(i.seed,t.id,e,1004)*(r.duration[1]-r.duration[0]):2.5,d=h?6*u+1:4+xs(i.seed,t.id,e,4292)*3;return{x:t.x+l.x*d,z:t.z+l.z*d,until:i.time+u,bolting:h}}function Da(i,t,e){return 5+3*xs(i.seed^Math.imul(i.index+1,7919),t.id,e,49420)}function Bv(i,t,e){if(!(e>0)||i.index<7||t.saved||(Number.isFinite(t.nextWanderCheck)||(t.wanderOpportunity=0,t.nextWanderCheck=i.time-e+Da(i,t,0)),i.time+1e-8<t.nextWanderCheck))return null;const n=t.wanderOpportunity++;return t.nextWanderCheck+=Da(i,t,t.wanderOpportunity),t.nextWanderCheck<=i.time&&(t.nextWanderCheck=i.time+Da(i,t,t.wanderOpportunity)),n}const un=(i,t,e)=>Math.max(t,Math.min(e,i)),mr=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Xn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-4?{x:i/e,z:t/e}:{x:0,z:0}},Bc=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function kv(i,t,e){const n=t.buddyRest;(!n||n.home!==e)&&(t.buddyRest={home:e,cycle:0,next:i.time+20+t.id*7%17});const s=t.buddyRest;if(i.time>=s.next&&(s.cycle++,s.next=i.time+24+(t.id*11+s.cycle*5)%19,delete s.target),!s.target){const r=t.id*2.399963+s.cycle*1.618,o=s.cycle===0?.45:.6,a={x:e.x+Math.sin(r)*o,z:e.z+Math.cos(r)*o},c=zu(i,a)&&ae(i,a.x,a.z,Ne(t))&&oe(i,t,a,Ne(t));s.target=c?a:{x:t.x,z:t.z},s.facing=c?void 0:r}return s.target}function zf(i){const t=Math.max(0,(i.animals?.length||0)-5),e=Math.max(1,i.routes?.length||1),n=i.spawn&&i.target?mr(i.spawn,i.target):0;return un(30+Math.ceil(t/5)+(e-1)*4+Math.floor(n/40)*2,30,60)}function ml(i,t=i.animals.filter(e=>e.saved).length){const e=i.animals.length;return e?Math.floor(Math.max(0,i.reward)*un(t,0,e)/e):0}function kc(i,t=[],e=!1,n={blockedX:!1,blockedZ:!1}){const s=i.result?.saved??i.animals.filter(a=>a.saved).length,r=i.result?.total??i.animals.length,o=i.result?.score??ml(i,s);return{saved:s,total:r,score:o,possibleScore:i.reward,completed:!!i.completed,justCompleted:e,reward:e?o:0,remaining:i.delivery?.remaining??null,countdownStarted:!!i.delivery?.started,events:t,helpers:i.helpers||[],dogCollision:n}}function ou(i,t,e=[],n){i.completed=!0;const s=i.animals.filter(r=>r.saved).length;return i.result={saved:s,total:i.animals.length,score:ml(i,s),possibleScore:i.reward,reason:t},e.push({type:"levelCompleted",index:i.index,reward:i.result.score,reason:t}),kc(i,e,!0,n)}function So(i,t,e,n=.15){return oe(i,t,e,n)}function Gv(i,t,e=[]){const n=pl(i,t);return n.sort((s,r)=>r.length-s.length||r.filter(o=>e.includes(o.id)).length-s.filter(o=>e.includes(o.id)).length||Math.min(...s.map(o=>o.id))-Math.min(...r.map(o=>o.id))),n[0]||[]}function Vv(i,t,e,n){const s=[e.drone&&"drone"].filter(Boolean);if(i.helpers||=[],i.helpers=i.helpers.filter(x=>s.includes(x.type)||e.helper&&x.type==="helper"),!s.length||!t.length)return{helpers:[],group:[],memberIds:new Set,hold:!1};const r=i.companionHerd||={},o=t.map(x=>x.id).join(",");(!r.group||r.activeSignature!==o||i.time-r.clusterTime>.25)&&(r.group=Gv(i,t,r.clusterIds),r.activeSignature=o,r.clusterTime=i.time);const a=r.group;if(a.length<2){r.mode="standby",r.clusterIds=[],r.positions={};for(const x of s){let m=i.helpers.find(p=>p.type===x);m||(m={type:x,x:i.dog.x,z:i.dog.z},i.helpers.push(m)),m.mode="standby",m.clusterIds=[],m.anchor={x:m.x,z:m.z}}return{helpers:i.helpers,group:[],memberIds:new Set,hold:!1,state:r}}const c=Bc(a),l=a.map(x=>x.id),h=new Set(l);let u=1/0;for(const x of a){const m=mr(i.dog,x);m<=18&&m<u&&So(i,i.dog,x)&&(u=m)}const d=r.mode&&r.mode!=="standby"?r.mode==="hold"?u>=12:u>18:u>14,f=(r.clusterIds||[]).filter(x=>h.has(x)).length,g=!r.clusterIds||f<Math.min(r.clusterIds.length,l.length)/2;if(d&&(r.mode!=="hold"||g)&&(r.anchor={...c},r.positions=Object.fromEntries(a.map(x=>[x.id,{x:x.x,z:x.z}]))),d||(r.anchor={...c},r.positions={}),d)for(const x of a)r.positions[x.id]||={x:x.x,z:x.z};r.mode=d?"hold":"assist",r.clusterIds=l;for(const x of s){let m=i.helpers.find(v=>v.type===x);m||(m={type:x,x:x==="drone"?c.x:i.dog.x,z:x==="drone"?c.z:i.dog.z},i.helpers.push(m)),m.mode=r.mode,m.clusterIds=[...l],m.anchor={...r.anchor};const p=Xn(c.x-m.x,c.z-m.z),M=Math.min(mr(m,c),n*6);m.x+=p.x*M,m.z+=p.z*M}return{helpers:i.helpers,group:a,centroid:c,memberIds:h,hold:d,state:r}}function Hv(i,t,e,n){const s=new Map;if(!t.group.length||t.hold)return s;const{group:r,centroid:o}=t,a=Xn(o.x-e.x,o.z-e.z),c={x:-a.z,z:a.x},l=Math.min(1.2,n.droneStrength*.35),h=Math.max(2.1,Math.sqrt(r.length)*.66);for(const d of r){const f=(o.x-d.x)*c.x+(o.z-d.z)*c.z,g=un(Math.sign(f)*Math.max(0,Math.abs(f)-h)*l,-.75,.75),x={x:c.x*g,z:c.z*g},m=Ne(d);g&&!So(i,d,{x:d.x+x.x,z:d.z+x.z},m)||ae(i,d.x+x.x*.7,d.z+x.z*.7,m)&&s.set(d.id,x)}const u=[...s.values()].reduce((d,f)=>({x:d.x+f.x,z:d.z+f.z}),{x:0,z:0});for(const d of s.values())d.x-=u.x/s.size,d.z-=u.z/s.size;return s}function Lf(i,t,e){if(t<=0)return;const n=pn(i.target);for(const s of i.animals){if(!s.saved)continue;const r=Ne(s),o=Xc(i.target,s),a=s.roamPhase??s.id*2.399963229728653;s.roamPhase=a;const c=n.halfLength-r-.48,l=n.halfWidth-r-.24,h={forward:Math.sin(e*.22+a)*c*.72,lateral:Math.cos(e*.19+a*1.7)*l*.72};let u=(h.forward-o.forward)*.32,d=(h.lateral-o.lateral)*.32;for(const _ of i.animals){if(_===s||!_.saved)continue;const b=s.x-_.x,A=s.z-_.z,P=Math.hypot(b,A),F=r+Ne(_)+.35;if(P>1e-4&&P<F){const S=(F-P)/P*.6;u+=(b*n.forward.x+A*n.forward.z)*S,d+=(b*n.side.x+A*n.side.z)*S}}const f=-n.halfLength+r;o.forward<f+.45&&(u+=(f+.45-o.forward)*1.2);const g=n.forward,x=n.side;let m=g.x*u+x.x*d,p=g.z*u+x.z*d;const M=Math.hypot(m,p);M>.65&&(m*=.65/M,p*=.65/M);const v={x:s.x,z:s.z};Qs(i,s,m*t,p*t,r),ae(i,s.x,s.z,r)&&vr(i.target,s,r)||(s.x=v.x,s.z=v.z),s.vx=(s.x-v.x)/t,s.vz=(s.z-v.z)/t,s.heading=Math.hypot(s.vx,s.vz)>.03?Math.atan2(s.vx,s.vz):s.heading||0}}function Wv(i,t=1/60){t=un(Number(t)||0,0,.1),i.completed&&t>0&&(i.savedRoamTime=(i.savedRoamTime??(i.time||0))+t,Lf(i,t,i.savedRoamTime))}function Xv(i,t,e={},n=1/60,s={}){const r=Sv(s,i.index+1);if(n=un(Number(n)||0,0,.1),i.completed||n<=0)return kc(i);if(n>0&&i.delivery?.started&&(i.delivery.remaining=Math.max(0,i.delivery.remaining-n),i.delivery.remaining<=1e-8))return i.delivery.remaining=0,ou(i,"timeout");i.time=(i.time||0)+n;const o=Oc(i);Lf(i,n,i.time);const a=[],c=Number(e.x)||0,l=Number(e.z??e.y)||0,h=Math.min(1,Math.hypot(c,l)),u=Xn(c,l),d=7.8+r.speedBoost,f={x:t.x,z:t.z},g=Qs(i,t,u.x*h*d*n,u.z*h*d*n,.62);t.vx=n?(t.x-f.x)/n:0,t.vz=n?(t.z-f.z)/n:0,t.heading=h>.03?Math.atan2(u.x,u.z):t.heading||0,i.dog=t;const x=i.animals.filter(R=>!R.saved),m=Vv(i,x,r,n),p=Hv(i,m,t,r),M=Iv(i,x,r,n,a),v=7.6+r.signalBoost+(e.bark?3.3:0),_=x.map(R=>({...R})),b=i.flockVisibility||=new Map,A=new Map(_.map(R=>[R.id,`${Math.floor(R.x*5)},${Math.floor(R.z*5)}`])),P=(R,w)=>{const U=R.id<w.id?R:w,D=R.id<w.id?w:R,Z=`${U.id}:${D.id}`,J=`${A.get(U.id)}:${A.get(D.id)}`,N=b.get(Z);if(N?.position===J)return N.clear;const Q=oe(i,R,w,.15);return b.set(Z,{position:J,clear:Q}),Q},F=new Map(_.map(R=>{const w=mr(R,t),U=w<v&&cd(i,R,t),D=U?Math.pow(1-w/v,.65)*(e.bark?1.65+r.barkBoost:1):0,Z=w>.01?Xn(R.x-t.x,R.z-t.z):Xn(Math.sin(t.heading||0),Math.cos(t.heading||0));return[R.id,{active:U,urgency:D,x:Z.x*D*5.2,z:Z.z*D*5.2}]})),S=new Map,E=new Map,L=i.flockTravel||[],G=[];pl(i,_,P).forEach((R,w)=>{const U=R.filter(Gt=>!Gt.wander&&!Gt.wanderHome),D=U.length?U:R,Z=Bc(D);let J=0,N=0,Q=0,Mt=0;for(const Gt of D){J+=(Gt.vx||0)/D.length,N+=(Gt.vz||0)/D.length;const z=F.get(Gt.id),jt=M.forces.get(Gt.id);Q+=(z.x+(jt?.x||0))/D.length,Mt+=(z.z+(jt?.z||0))/D.length}const xt=R.map(Gt=>Gt.id),tt=new Set(xt),B=L.map(Gt=>({v:Gt,count:Gt.ids.filter(z=>tt.has(z)).length})).sort((Gt,z)=>z.count-Gt.count)[0],W=Math.hypot(J,N),nt=Math.hypot(Q,Mt),ot=W>.28?Xn(J,N):nt>.03?Xn(Q,Mt):B?.count?B.v.forward:null,it=ot?Math.max(W>.28?J*ot.x+N*ot.z:0,nt>.03?(Q*ot.x+Mt*ot.z)*.65:0,0):0,Tt={center:Z,forward:ot,drive:it,pressure:nt};G.push({ids:xt,forward:ot}),E.set(w,Tt);for(const Gt of R)S.set(Gt.id,w)}),i.flockTravel=G;for(let R=0;R<x.length;R++){const w=x[R],U=_[R],D=Ne(w),Z=Lv(i,w,U),J=Z?.finished?null:Z;Z?.finished&&m.hold&&m.memberIds.has(w.id)&&(m.state.positions[w.id]={x:U.x,z:U.z});let N=0,Q=0,Mt=0,xt=0,tt=0,B=0,W=0,nt=0;for(const $ of _){if($.id===w.id)continue;const Y=U.x-$.x,ft=U.z-$.z,rt=Math.hypot(Y,ft),_t=Math.max(2,D+Ne($)+.35);if(rt<_t&&rt>.01){const gt=(_t-rt)/rt;N+=Y*gt,Q+=ft*gt}rt<18&&S.get(U.id)===S.get($.id)&&P(U,$)&&(Mt+=$.x,xt+=$.z,tt+=$.vx,B+=$.vz,W++)}let ot=N*2.5,it=Q*2.5;const Tt=F.get(w.id),Gt=Tt.active,z=M.memberIds.has(w.id),jt=!m.hold&&m.memberIds.has(w.id)||z;if((Gt||jt||J)&&(delete w.wander,delete w.wanderHome),Gt&&(ot+=Tt.x,it+=Tt.z,nt=Tt.urgency,w.lastPlayerPressure=i.time),z){const $=M.forces.get(w.id);ot+=$.x,it+=$.z,nt=Math.max(nt,.45)}const Lt=M.holds?.get(w.id);Z?.finished&&i.buddyHerd?.containment?.positions[w.id]&&(Object.assign(i.buddyHerd.containment.positions[w.id],{x:U.x,z:U.z}),i.buddyHerd?.containment&&(i.buddyHerd.containment.anchor={x:U.x,z:U.z}));const Dt=!J&&!Gt&&nt<.03&&(!!Lt||m.hold&&m.memberIds.has(w.id)),wt=()=>{w.wanderHome={x:U.x,z:U.z},delete w.wander};w.wander&&(i.time>=w.wander.until||!o.has(w.id))&&wt();const Qt=Bv(i,w,n);if(Qt!==null&&nt<.03){const $=m.centroid||Bc(_),Y=Ov(i,w,Qt,$,Gt||jt||Dt||!!J);Y&&(w.wander=Y)}let St=w.wander;if(Dt){const $=Lt||m.state.positions[w.id];if(Lt){const Y=kv(i,w,$),ft=Y.x-U.x,rt=Y.z-U.z,_t=Math.hypot(ft,rt);ot=(_t>.055?ft*.9:0)+N*.35,it=(_t>.055?rt*.9:0)+Q*.35;const gt=Math.hypot(ot,it);gt>.38&&(ot*=.38/gt,it*=.38/gt)}else delete w.buddyRest,ot=un(($.x-U.x)*2.6+N*.35,-1.1,1.1),it=un(($.z-U.z)*2.6+Q*.35,-1.1,1.1)}else{if(delete w.buddyRest,W&&!St&&!w.wanderHome&&!(z&&i.buddyHerd?.retrieveId===w.id)){const Y=Mt/W-U.x,ft=xt/W-U.z,rt=Math.hypot(Y,ft),_t=E.get(S.get(w.id)),gt=_t.forward,at=gt&&(U.x-_t.center.x)*gt.x+(U.z-_t.center.z)*gt.z>.6;if(rt>2.6){const dt=Xn(Y,ft),Ut=Math.min(2.6,(rt-2.6)*.36)*.7*(1+r.cohesionBoost);let Rt=dt.x*Ut,pt=dt.z*Ut;const Xt=at?Math.min(0,Rt*gt.x+pt*gt.z):0;Xt&&(Rt-=gt.x*Xt,pt-=gt.z*Xt),ot+=Rt,it+=pt}if(ot+=tt/W*.45,it+=B/W*.45,at&&_t.drive>.03&&!Gt&&!z){const dt=Math.max(0,_t.drive-ot*gt.x-it*gt.z);ot+=gt.x*dt,it+=gt.z*dt,_t.pressure>.03&&(nt=Math.max(nt,Math.min(.35,_t.pressure/5.2)))}}const $=p.get(w.id);if($&&ae(i,U.x+$.x*.7,U.z+$.z*.7,D)&&So(i,U,{x:U.x+$.x,z:U.z+$.z},D)&&(ot+=$.x,it+=$.z),nt<.03&&(ot+=Math.sin(i.time*.6+w.id*2.1)*.12,it+=Math.cos(i.time*.5+w.id*1.7)*.12),St){const Y=St.x-U.x,ft=St.z-U.z,rt=Math.hypot(Y,ft);rt>.35?(ot+=Y/rt*(St.bolting?5.8:2.1),it+=ft/rt*(St.bolting?5.8:2.1)):(wt(),St=null)}if(w.wanderHome&&!Gt&&!jt){const Y=w.wanderHome,ft=w.id*2.39996;ot=(Y.x+Math.sin(i.time*.24+ft)*1.4-U.x)*.35+N*.2,it=(Y.z+Math.cos(i.time*.19+ft)*1.4-U.z)*.35+Q*.2}}if(J){const $=un(N*J.forward.z-Q*J.forward.x,-.7,.7),Y=w.type==="cow"?2.7:3.2;ot=J.x*Y+J.forward.z*$*.5,it=J.z*Y-J.forward.x*$*.5,nt=Math.max(nt,.4)}if(nt>.03&&!J){const $=fd(i,w,ot,it,D);ot+=$.x,it+=$.z}const Ft=w.wanderHome&&!Dt?.75:St?.bolting?6:w.type==="cow"?3.3:4.2,ge=Math.hypot(ot,it);ge>Ft&&(ot*=Ft/ge,it*=Ft/ge);const de=1-Math.exp(-n*(Dt?12:w.type==="cow"?3.5:5.5));w.vx+=(ot-w.vx)*de,w.vz+=(it-w.vz)*de;const C=!Dt&&w.wanderHome,y=C&&Math.hypot(w.x+w.vx*n-C.x,w.z+w.vz*n-C.z)>3,X=Qs(i,w,y?0:w.vx*n,y?0:w.vz*n,D);if((X.blockedX||X.blockedZ)&&nt>.03){const $=Xn(w.vx,w.vz),Y=Math.min(.24,Math.hypot(w.vx,w.vz)*n);for(const ft of[Math.PI/6,-Math.PI/6,Math.PI/3,-Math.PI/3,Math.PI/2,-Math.PI/2]){const rt=($.x*Math.cos(ft)-$.z*Math.sin(ft))*Y,_t=($.x*Math.sin(ft)+$.z*Math.cos(ft))*Y;if(ae(i,w.x+rt,w.z+_t,D)){Qs(i,w,rt,_t,D);break}}}if(X.blockedX&&(w.vx*=.45),X.blockedZ&&(w.vz*=.45),Math.hypot(w.vx,w.vz)>.1)w.heading=Math.atan2(w.vx,w.vz);else if(Dt&&w.buddyRest?.facing!==void 0){const $=w.heading||0,Y=w.buddyRest.facing,ft=Math.atan2(Math.sin(Y-$),Math.cos(Y-$)),rt=w.type==="cow"?Math.PI/1.5:Math.PI;w.heading=$+un(ft,-rt*n,rt*n)}else w.heading||=0;w.alert=nt;const et=mr(t,i.target)<i.target.radius+12;n>0&&et&&!Dt&&vr(i.target,w,D)&&So(i,t,w)&&(w.saved=!0,w.vx=0,w.vz=0,delete w.wander,delete w.wanderHome,delete w.nextWanderCheck,delete w.wanderOpportunity,delete w.buddyNavigation,delete w.bridgeCrossing,a.push({type:"animalSaved",id:w.id,animalType:w.type}))}const k=Oc(i);for(const R of i.animals)!R.saved&&R.wander&&!k.has(R.id)&&(R.wanderHome={x:R.x,z:R.z},delete R.wander);const q=i.animals.filter(R=>R.saved).length;if(a.some(R=>R.type==="animalSaved")&&!i.delivery?.started){const R=zf(i);i.delivery={started:!0,duration:R,remaining:R},a.push({type:"countdownStarted",duration:R})}return q===i.animals.length&&q>0?ou(i,"all-arrived",a,g):kc(i,a,!1,g)}function gr(){return{version:2,points:0,upgrades:{},completedLevels:[],bestScores:{},bestEarnedBolts:{},highestLevel:0,music:!0}}const gl=i=>80+i*25;function qv(i){const t={};if(!i||typeof i!="object"||Array.isArray(i))return t;for(const[e,n]of Object.entries(i)){const s=Number(e);String(s)!==e||!Number.isInteger(s)||s<0||s>99||!Number.isFinite(n)||n<=0||(t[s]=un(Math.floor(n),0,gl(s)),t[s]||delete t[s])}return t}function xl(i){const t=gr();if(!i||typeof i!="object")return t;t.points=Number.isFinite(i.points)?un(Math.floor(i.points),0,1e9):0,t.upgrades=Af(i.upgrades);const e=[...new Set((Array.isArray(i.completedLevels)?i.completedLevels:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<=99))];if(t.bestEarnedBolts=qv(i.bestEarnedBolts),i.version===void 0||i.version===1)for(const n of e)t.bestEarnedBolts[n]=gl(n);return t.bestScores={...t.bestEarnedBolts},t.completedLevels=Object.keys(t.bestEarnedBolts).map(Number).sort((n,s)=>n-s),t.highestLevel=un(Math.max(Number.isInteger(i.highestLevel)?i.highestLevel:0,...t.completedLevels.map(n=>n+1)),0,99),t.music=i.music!==!1,t}function Yv(i,t){if(!t.completed||!Number.isInteger(t.index)||t.index<0||t.index>99)return 0;const e=t.result?.saved??t.animals.filter(o=>o.saved).length;if(e<=0||!t.animals.length)return 0;Object.assign(i,xl(i));const n=Math.min(gl(t.index),ml(t,e)),s=i.bestEarnedBolts[t.index]||0,r=Math.max(0,n-s);return i.bestScores[t.index]=Math.max(i.bestScores[t.index]||0,n),i.bestEarnedBolts[t.index]=Math.max(s,n),i.completedLevels.includes(t.index)||i.completedLevels.push(t.index),i.completedLevels.sort((o,a)=>o-a),i.highestLevel=Math.min(99,Math.max(i.highestLevel,t.index+1)),i.points+=r,r}function Zv(i,t="flock-foundry-v1"){try{return i||=globalThis.localStorage,xl(JSON.parse(i.getItem(t)))}catch{return gr()}}function $v(i,t,e="flock-foundry-v1"){try{return t||=globalThis.localStorage,t.setItem(e,JSON.stringify(xl(i))),!0}catch{return!1}}const en=(i,t=0,e=1)=>Math.max(t,Math.min(e,i));function Kv(i){const t=Math.max(0,...(i.routes||[]).map(e=>Number.isFinite(e.length)?e.length:0));return en(t/2+zf(i),45,240)}function Ys(i,t){let e=((i||0)^Math.imul(t,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),((e^e>>>15)>>>0)/4294967296}const au=i=>i?.position?{x:i.position.x,z:i.position.z}:i,Jv=new Ht(4350794),jv=new Ht(5784367),Qv=new Ht(7714243);function tM(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=en(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function Ia(i,t){if(!ae(i,t.x,t.z,.4))return!1;for(const e of i.rivers||[]){if(e.points.some((n,s)=>s&&tM(t,e.points[s-1],n)<e.width/2+.8))return!1;for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,o=s*Math.sin(n.heading)+r*Math.cos(n.heading),a=s*Math.cos(n.heading)-r*Math.sin(n.heading);if(Math.abs(o)<n.length/2+.45&&Math.abs(a)<n.width/2+.45)return!1}}return!0}function eM(){const t=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=(n*64+s)*4,o=(Math.sin(n*.72+Math.sin(s*.31)*1.5)+Math.sin(n*1.37+s*.18))*.5,a=Math.round(145+o*28);t[r]=Math.round(a*.65),t[r+1]=a,t[r+2]=Math.min(255,a+24),t[r+3]=255}const e=new af(t,64,64);return e.wrapS=e.wrapT=$n,e.repeat.set(1,5),e.magFilter=e.minFilter=yn,e.needsUpdate=!0,e}class nM{constructor(t,{maxSplashes:e=12,maxPuddles:n=8}={}){this.scene=t,this.root=new Jt,this.root.name="Water and wetness effects",t.add(this.root),this.maxSplashes=Math.max(0,e|0),this.maxPuddles=Math.max(0,n|0),this.elapsed=0,this.wetness=0,this.level=null,this.flowMap=eM(),this.flowMaterial=new nn({map:this.flowMap,color:9096146,transparent:!0,opacity:.16,depthWrite:!1,side:Re}),this.splashGeometry=new Co(.2,.025,4,12),this.splashes=[],this.puddles=[],this.materialSnapshots=[],this.riverSnapshots=[],this.lastMoverPositions=new Map,this.lastSplashAt=new Map}setLevel(t,{grassMaterials:e=[],pathMaterials:n=[],waterMaterial:s=null,terrain:r=null,rivers:o=[],weather:a=null}={}){this.restoreMaterials(),this.clearEffects(),this.level=t,this.terrain=r,this.rivers=o,this.wetness=0,this.elapsed=0,this.puddleGrowthDuration=Kv(t),this.rainElapsed=0,this.lastMoverPositions.clear(),this.lastSplashAt.clear();for(const[u,d]of[["grass",e],["path",n]])for(const f of Array.isArray(d)?d:[d])f?.color&&this.materialSnapshots.push({material:f,kind:u,color:f.color.clone(),roughness:f.roughness});this.waterSnapshot=s?{material:s,color:s.color?.clone(),roughness:s.roughness}:null;for(const u of o){if(!u?.mesh)continue;const d=u.mesh,f=this.flowMap.clone();f.repeat.set(1,1);const g=this.flowMaterial.clone();g.map=f,g.userData.ownedFlowMap=f;const x=d.geometry.clone(),m=x.attributes.position,p=x.attributes.uv,M=u.points;if(M?.length>1){for(let _=0;_<m.count;_++){const b=m.getX(_),A=m.getZ(_);let P=1/0,F=0,S=0,E=0;for(let L=1;L<M.length;L++){const G=M[L-1],k=M[L],q=k.x-G.x,R=k.z-G.z,w=Math.hypot(q,R);if(!w)continue;const U=en(((b-G.x)*q+(A-G.z)*R)/(w*w)),D=b-G.x-U*q,Z=A-G.z-U*R,J=D*D+Z*Z;J<P&&(P=J,F=E+U*w,S=(-R*D+q*Z)/w),E+=w}p.setXY(_,S/Math.max(1,u.width||4),F/4)}p.needsUpdate=!0}const v=new ne(x,g);v.name="River flow",v.position.copy(d.position),v.position.y+=.003,v.rotation.copy(d.rotation),v.scale.copy(d.scale),v.frustumCulled=d.frustumCulled,v.userData.flow={heading:u.heading||0,speed:u.flowSpeed??.12,localUV:M?.length>1},this.root.add(v)}for(let u=0;u<this.maxSplashes;u++){const d=new nn({color:13233904,transparent:!0,opacity:.78,depthWrite:!1}),f=new ne(this.splashGeometry,d);f.visible=!1,f.rotation.x=-Math.PI/2,this.root.add(f),this.splashes.push({mesh:f,material:d,age:1})}const c=new ol(1,20);this.puddleResources={geometry:c};const l=t.seed??t.index??0,h=Ys(l,71)<.5?0:1+Math.floor(Ys(l,72)*3);for(const u of this.findPuddleSites()){const d=new nn({color:4549225,transparent:!0,opacity:.2,depthWrite:!1,side:Re}),f=new ne(c,d);f.rotation.x=-Math.PI/2,f.visible=!1,f.position.set(u.x,qn(t,u.x,u.z)+.024,u.z),f.scale.set(u.radius,u.radius*.62,1),this.root.add(f),this.puddles.push({mesh:f,material:d,depth:0,site:u,initialDepth:this.puddles.length<h?.1+Ys(l,80+this.puddles.length)*.1:0})}if(a){this.wetness=a.kind==="storm"?.6:a.kind==="heavy-rain"?.35:a.type==="rain"?.03:0;for(const u of this.puddles)u.depth=a.type==="rain"?u.initialDepth:0,this.applyPuddleAppearance(u);this.applySurfaceWeather(a)}}findPuddleSites(){const t=this.level,e=t.bounds,n=[],s=e.maxX-e.minX,r=e.maxZ-e.minZ,o=t.seed??t.index??0,a=(l,h)=>{const{x:u,z:d}=l,f=Array.from({length:48},(g,x)=>{const m=1+Math.floor(x/16),p=x%16*Math.PI/8;return{x:u+Math.cos(p)*h*m/3,z:d+Math.sin(p)*h*.62*m/3}});return!Ia(t,l)||f.some(g=>!Ia(t,g))||n.some(g=>Math.hypot(g.x-u,g.z-d)<g.radius+h+.3)?!1:(n.push({...l,radius:h}),!0)},c=(t.routes||[]).filter(l=>l.points?.length>1);for(let l=0;l<this.maxPuddles&&c.length;l++){const h=c[l%c.length],u=h.points,d=u.slice(1).map((m,p)=>Math.hypot(m.x-u[p].x,m.z-u[p].z)),f=d.reduce((m,p)=>m+p,0),g=1.35+Ys(o,150+l)*.69,x=l/Math.max(1,this.maxPuddles-1);for(let m=0;m<35;m++){let p=en(x+(m<7?0:(Math.ceil((m-6)/7)%2?1:-1)*.035))*f,M=0;for(;M<d.length-1&&p>d[M];)p-=d[M++];const v=u[M],_=u[M+1],b=d[M]||1,A=en(p/b),P=[0,2.5,-2.5,4,-4,6,-6][m%7]*(Ys(o,200+l)<.5?-1:1),F={x:v.x+(_.x-v.x)*A-(_.z-v.z)/b*P,z:v.z+(_.z-v.z)*A+(_.x-v.x)/b*P};if(a(F,g))break}}for(let l=1;l<Math.max(100,this.maxPuddles*80)&&n.length<this.maxPuddles;l++){const h=e.minX+2+l*.61803398875%1*Math.max(1,s-4),u=e.minZ+2+l*.75487766625%1*Math.max(1,r-4);a({x:h,z:u},1.35+l*37%70/100)}return n}applyPuddleAppearance(t){const e=Math.sqrt(t.depth);t.mesh.scale.set(t.site.radius*e,t.site.radius*.62*e,1),t.mesh.visible=t.depth>.008,t.material.opacity=t.mesh.visible?.18+t.depth*.24:0}restoreMaterials(){for(const t of this.materialSnapshots)t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color.dispose?.();if(this.materialSnapshots=[],this.waterSnapshot){const t=this.waterSnapshot;t.color&&t.material.color&&t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color?.dispose?.(),this.waterSnapshot=null}}clearEffects(){for(const t of this.splashes)this.root.remove(t.mesh),t.material.dispose();for(const t of this.puddles)this.root.remove(t.mesh),t.material.dispose();this.splashes=[],this.puddles=[],this.puddleResources&&(this.puddleResources.geometry.dispose(),this.puddleResources=null);for(const t of[...this.root.children])t.name==="River flow"&&(this.root.remove(t),t.material.userData.ownedFlowMap?.dispose(),t.material.dispose(),t.geometry.dispose())}applySurfaceWeather(t={}){const e=t.type==="rain"?en(t.rainIntensity??t.intensity??0):0;for(const n of this.materialSnapshots){const s=this.wetness*(n.kind==="grass"?.62:.85);n.material.color.copy(n.color).lerp(n.kind==="grass"?Jv:jv,s),n.roughness!==void 0&&(n.material.roughness=Math.max(.28,n.roughness-this.wetness*.22))}if(this.waterSnapshot){const n=this.waterSnapshot,s=en(t.cloudCoverage??0);n.material.color&&n.color&&n.material.color.copy(n.color).lerp(Qv,en((t.rainIntensity??e)*.11+s*.035+(t.severity||0)*.025+(t.lightningFlash||0)*.09)),n.roughness!==void 0&&(n.material.roughness=en(n.roughness-(t.rainIntensity??e)*.16,.12,1))}}update(t,{weather:e={},movers:n=[],paused:s=!1}={}){if(!this.level||s||!(t>0))return;t=Math.min(t,.1),this.elapsed+=t;const r=e.type==="rain"?en(e.rainIntensity??e.intensity??0):0;this.wetness=en(this.wetness+r*t*.012-t*(e.type==="sun"?.004:.0012)),this.applySurfaceWeather(e);for(const o of this.root.children)if(o.userData.flow){const a=o.userData.flow,c=o.material.map,l=t*(a.speed+(e.windIntensity||0)*.025);c.offset.x=(c.offset.x+(a.localUV?0:Math.sin(a.heading))*l)%1,c.offset.y=(c.offset.y+(a.localUV?1:Math.cos(a.heading))*l)%1,o.material.opacity=.08+r*.18+(e.daylight??.7)*.025+(e.lightningFlash||0)*.2}r>0&&(this.rainElapsed+=t);for(const o of this.puddles)o.depth=r>0?en(o.initialDepth+(1-o.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):en(o.depth-t*(e.type==="sun"?.006:8e-4)),this.applyPuddleAppearance(o);for(const o of n){const a=au(o);if(!a||!Number.isFinite(a.x)||!Number.isFinite(a.z))continue;const c=o.id??o.kind??"mover",l=au(o.previousPosition)||(Number.isFinite(o.previousX)?{x:o.previousX,z:o.previousZ}:this.lastMoverPositions.get(c)),h=l&&Math.hypot(a.x-l.x,a.z-l.z)>.008,u=this.puddles.find(d=>d.mesh.visible&&(a.x-d.site.x)**2/d.site.radius**2+(a.z-d.site.z)**2/(d.site.radius*.62)**2<d.depth);h&&u&&Ia(this.level,a)&&this.elapsed-(this.lastSplashAt.get(c)||-10)>.22&&(this.spawnSplash(a),this.lastSplashAt.set(c,this.elapsed)),this.lastMoverPositions.set(c,{x:a.x,z:a.z})}for(const o of this.splashes)o.age>=1||(o.age=Math.min(1,o.age+t*2.4),o.mesh.scale.setScalar(.4+o.age*2.3),o.mesh.position.y=.06+qn(this.level,o.mesh.position.x,o.mesh.position.z)+o.age*.06,o.material.opacity=.78*(1-o.age),o.age>=1&&(o.mesh.visible=!1))}spawnSplash(t){const e=this.splashes.find(n=>n.age>=1);e&&(e.age=0,e.mesh.position.set(t.x,qn(this.level,t.x,t.z)+.08,t.z),e.mesh.scale.setScalar(.35),e.mesh.visible=!0)}dispose(){this.restoreMaterials(),this.clearEffects(),this.root.removeFromParent(),this.flowMap.dispose(),this.flowMaterial.dispose(),this.splashGeometry.dispose(),this.level=null,this.scene=null}}const Uf={sun:{rainIntensity:0,windIntensity:.12,severity:0,cloudCoverage:.22,daylight:1},wind:{rainIntensity:0,windIntensity:.6,severity:.3,cloudCoverage:.4,daylight:.96},rain:{rainIntensity:.3,windIntensity:.3,severity:.28,cloudCoverage:.5,daylight:.94},"heavy-rain":{rainIntensity:.65,windIntensity:.55,severity:.6,cloudCoverage:.7,daylight:.82},storm:{rainIntensity:.9,windIntensity:.85,severity:.88,cloudCoverage:.85,daylight:.7}};function _l(i,t){let e=(i^Math.imul(t+1,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),(e^e>>>15)>>>0}function iM(i,t,e){const n=e+1;if(n<=5)return"sun";const s=typeof i.weather=="string"?i.weather:i.weather?.kind||i.weather?.type,r=s==="light-rain"||s==="snow"?"rain":s;if(r&&Uf[r])return r==="sun"||r==="wind"?r:n<9?"sun":r==="storm"&&n>=24?"storm":(r==="storm"||r==="heavy-rain")&&n>=16?"heavy-rain":"rain";if(n===9)return"rain";if(n===16)return"heavy-rain";if(n===24)return"storm";const o=_l(t,e)/4294967296;return n<9?o<.65?"sun":"wind":n<16?o<.35?"sun":o<.5?"wind":"rain":n<24?o<.25?"sun":o<.35?"wind":o<.65?"rain":"heavy-rain":o<.2?"sun":o<.3?"wind":o<.5?"rain":o<.75?"heavy-rain":"storm"}function Nf(i={}){const t=Number.isFinite(i.index)?Math.max(0,Math.floor(i.index)):0,e=Number.isFinite(i.seed)?i.seed>>>0:42,n=iM(i,e,t),s=Uf[n];return{...s,kind:n,type:n==="heavy-rain"||n==="storm"?"rain":n,snowIntensity:0,storm:n==="storm",elapsed:0,seed:e,levelIndex:t,intensity:Math.max(s.rainIntensity,n==="wind"?s.windIntensity:0),wind:.2+s.windIntensity*1.6,particles:s.rainIntensity>0?128:0,lightningId:null,lightningAge:1/0,thunderDelay:.8,lightningFlash:0,clouds:0,butterflies:n==="storm"?0:s.rainIntensity>0?4:8,birds:n==="storm"?0:5,squirrels:n==="storm"?0:3,lightningStart:8+_l(e,t+1e3)%401/100,lightningInterval:24}}function sM(i,t){if(Number.isFinite(t)&&t>0&&(i.elapsed+=t),!i.storm)return i;const e=Math.floor((i.elapsed-i.lightningStart)/i.lightningInterval);return e<0||(i.lightningId=`${i.seed}:${i.levelIndex}:${e}`,i.lightningAge=Math.max(0,i.elapsed-(i.lightningStart+e*i.lightningInterval)),i.thunderDelay=.8+_l(i.seed,i.levelIndex+e+2e3)%9/10,i.lightningFlash=i.lightningAge<.22?.9*(1-i.lightningAge/.22):0),i}const sr=(i,t,e)=>Math.max(t,Math.min(e,i)),wo=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),vl=i=>()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);function rM(i,t=Nf(i)){if(t.kind==="storm"||t.storm)return{squirrel:0,rabbit:0,bird:0,butterfly:0};const e=(i.bounds.maxX-i.bounds.minX)*(i.bounds.maxZ-i.bounds.minZ),n=vl((i.seed||42)^1464421444),s=sr(e/3600,.55,2.4),r=(o,a)=>Math.min(a,Math.max(1,Math.round(o*s*(.78+n()*.44))));return{squirrel:r(2,7),rabbit:r(2,8),bird:Math.min(6,Math.max(2,Math.round(3*s))),butterfly:Math.min(8,Math.max(0,Math.round(5*s)))}}function oM(i,t){let e=1/0;for(const n of i.roads||[]){const s=n.points||[n.from,n.to];for(let r=1;r<s.length;r++){const o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,h=sr(((t.x-o.x)*c+(t.z-o.z)*l)/(c*c+l*l||1),0,1);e=Math.min(e,Math.hypot(t.x-o.x-c*h,t.z-o.z-l*h))}}return e}const cu=new WeakMap;function aM(i,t){let e=cu.get(i);e||(e=new Map,cu.set(i,e));let n=e.get(t);if(!n||n.sourceRivers!==i.rivers||n.sourceObstacles!==i.obstacles||n.sourceFenceSegments!==i.fenceSegments||n.targetType!==i.target?.type){const s=i.bounds,r=(i.fenceSegments||[]).filter(o=>o.kind==="wall"||o.kind==="stone"||o.material==="stone"||o.kind==="target"&&i.target?.type==="barn");n={...i,sourceRivers:i.rivers,sourceObstacles:i.obstacles,sourceFenceSegments:i.fenceSegments,targetType:i.target?.type,fenceSegments:r,bounds:{minX:s.minX-t-1,maxX:s.maxX+t+1,minZ:s.minZ-t-1,maxZ:s.maxZ+t+1}},e.set(t,n)}return n}function Ml(i,t,e=.45){const n=i.bounds;return t.x>=n.minX-e&&t.x<=n.maxX+e&&t.z>=n.minZ-e&&t.z<=n.maxZ+e&&ae(aM(i,e),t.x,t.z,.4)}function cM(i,t,e=[],n=.45){return oM(i,t)>5.5&&Ml(i,t,n)&&e.every(s=>wo(t,s)>8)}const lM={butterfly:.54,squirrel:.58,bird:.64,rabbit:.76};function hM(i,t){let e=null,n=18;for(const s of i.obstacles||[]){const r=wo(t,s);if(r>=n||r<.01)continue;const o=s.radius+.85,a=(t.x-s.x)/r,c=(t.z-s.z)/r,l={x:s.x+a*o,z:s.z+c*o};Ml(i,l,.2)&&(e=l,n=r)}return e||{x:t.homeX,z:t.homeZ}}function uM(i){const t=vl(i.randomSeed||(Math.floor((i.phase||0)*1e6)^i.slot||1)>>>0);i.randomSeed=Math.floor(t()*4294967295)||1;const e=t()*Math.PI*2,n=3+t()*8;i.waypointX=i.homeX+Math.cos(e)*n,i.waypointZ=i.homeZ+Math.sin(e)*n,i.waitTimer=0}function fM(i,t,e,n=[],s=0,r=i.weather,o=Ml){const a=typeof r=="function";if(a&&(o=r,r=i.weather),!(e>0))return t;const c=t.x,l=t.z,h=sr(Number(r?.severity)||0,0,1),u=lM[t.kind]??.64;h>=u?t.sheltering=!0:h<u-.12&&(t.sheltering=!1);const d=t.kind==="bird"?10:t.kind==="butterfly"?6:7.5;let f=!1,g=0,x=0;for(const A of n){const P=wo(t,A);P<d&&(f=!0,g+=(t.x-A.x)/Math.max(.1,P)*(d-P),x+=(t.z-A.z)/Math.max(.1,P)*(d-P))}if(f)t.fleeing||(t.homeX=t.x,t.homeZ=t.z),t.waypointX=void 0,t.waypointZ=void 0,t.alertTimer=1.15,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,t.shelterX=void 0;else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.sheltering){if(t.shelterX===void 0){const A=hM(i,t);t.shelterX=A.x,t.shelterZ=A.z}t.shelter=Math.min(1,(t.shelter||0)+e*.32),g=t.shelterX-t.x,x=t.shelterZ-t.z}else if(t.shelter=Math.max(0,(t.shelter||0)-e*.48),t.hidden=t.shelter>=.995,t.shelterX!==void 0&&t.shelter===0&&(t.shelterX=void 0,t.shelterZ=void 0,t.waypointX=void 0),t.alertTimer>0)g=x=0;else if((t.waitTimer||0)>0)t.waitTimer=Math.max(0,t.waitTimer-e),g=x=0;else if(t.waypointX!==void 0&&wo(t,{x:t.waypointX,z:t.waypointZ})<.45){const A=vl(t.randomSeed||1);t.randomSeed=Math.floor(A()*4294967295)||1,t.waypointX=void 0,t.waypointZ=void 0,t.waitTimer=.55+A()*2.1,g=x=0}else t.waypointX===void 0&&uM(t),g=t.waypointX-t.x,x=t.waypointZ-t.z;let m=Math.hypot(g,x);if(f&&m<.01){const A=Number.isFinite(t.heading)?t.heading:t.phase||0;g=Math.sin(A),x=Math.cos(A),m=1}const p=t.kind==="rabbit",M=((t.gait||0)%1+1)%1,v=!p||M<.54;let _=f?t.kind==="bird"?5.2:p?4.2:3.5:t.kind==="squirrel"?.9:p?3.5:t.kind==="bird"?1.4:.8;t.sheltering&&!f&&(_=.95);const b=m>.01&&v?Math.min(m,e*_):0;if(b){const A=t.x+g/m*b,P=t.z+x/m*b,F=S=>a?o(i,S.x,S.z,.4):o(i,S,.45);t.kind==="bird"||F({x:A,z:P})?(t.x=A,t.z=P):F({x:A,z:t.z})?t.x=A:F({x:t.x,z:P})&&(t.z=P)}if(t.moving=Math.hypot(t.x-c,t.z-l)>.001,t.moving)t.heading=Math.atan2(t.x-c,t.z-l),t.stuckTimer=0;else if(b>.001&&(t.stuckTimer=(t.stuckTimer||0)+e,t.stuckTimer>=1)){const A=i.bounds;t.waypointX=t.x>A.maxX-.2?A.maxX-1.2:t.x<A.minX+.2?A.minX+1.2:sr(t.homeX,A.minX+1.2,A.maxX-1.2),t.waypointZ=t.z>A.maxZ-.2?A.maxZ-1.2:t.z<A.minZ+.2?A.minZ+1.2:sr(t.homeZ,A.minZ+1.2,A.maxZ-1.2),t.shelterX=void 0,t.shelterZ=void 0,t.stuckTimer=0,t.waitTimer=.2}return t.fleeing=f,t.alert=f||t.alertTimer>0,t.gait=(t.gait||0)+e*(f?1.8:p?1.35:t.kind==="squirrel"?1.7:1.2),t.hidden=t.shelter>=.995&&!f,t}const Ff={squirrel:[{part:"body",at:[0,.31,0],scale:[.2,.23,.32],color:"#a97552"},{part:"head",at:[0,.47,.2],scale:[.17,.17,.17],color:"#bd8960"},{part:"tail",at:[0,.48,-.34],scale:[.2,.31,.19],color:"#8e5b3e",tilt:-.48},{part:"ear",at:[-.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"ear",at:[.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"paw",at:[-.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"eye",at:[-.105,.5,.33],scale:[.025,.03,.018],color:"#171819"},{part:"eye",at:[.105,.5,.33],scale:[.025,.03,.018],color:"#171819"}],rabbit:[{part:"body",at:[0,.31,-.02],scale:[.25,.27,.34],color:"#d6c7aa"},{part:"haunch",at:[0,.25,-.23],scale:[.23,.23,.22],color:"#c4b08f"},{part:"head",at:[0,.48,.25],scale:[.17,.17,.17],color:"#e4d6bd"},{part:"ear",at:[-.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"ear",at:[.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"tail",at:[0,.34,-.4],scale:[.095,.1,.095],color:"#f0e9dc"},{part:"paw",at:[-.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"eye",at:[-.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"},{part:"eye",at:[.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"}]};function dM(i){const t=[],e=[],n=[],s=new Fi(1,10,8).toNonIndexed(),r=s.getAttribute("position"),o=s.getAttribute("normal"),a=new Ht,c=new Zt;for(const h of Ff[i]){if(h.part==="paw")continue;const u=new En(h.tilt||0,0,0),d=new ee().compose(new I(...h.at),new Kn().setFromEuler(u),new I(...h.scale));c.getNormalMatrix(d),a.set(h.color);for(let f=0;f<r.count;f++){const g=new I().fromBufferAttribute(r,f).applyMatrix4(d),x=new I().fromBufferAttribute(o,f).applyMatrix3(c).normalize();t.push(g.x,g.y,g.z),e.push(x.x,x.y,x.z),n.push(a.r,a.g,a.b)}}s.dispose();const l=new _e;return l.setAttribute("position",new $t(t,3)),l.setAttribute("normal",new $t(e,3)),l.setAttribute("color",new $t(n,3)),l.computeBoundingSphere(),l}const pM={light:96,heavy:176,storm:256},mM={light:16,heavy:23,storm:30},Hn=1.25;class gM{constructor(t){this.root=new Jt,this.root.name="Visible rain",t.add(this.root),this.geometry=new _e,this.material=new cf({color:"#e5f2f4",transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1}),this.lines=new Gp(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=20,this.root.add(this.lines),this.randomState=8029,this.positions=new Float32Array(0),this.drops=[],this.active=0,this.fallbackCamera=new Po(-30,30,20,-20,.1,180),this.fallbackCamera.position.set(0,36,29),this.fallbackCamera.lookAt(0,0,-2)}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}resize(t){t!==this.active&&(this.active=t,this.positions=new Float32Array(t*6),this.drops=Array.from({length:t},()=>({x:(this.random()*2-1)*Hn,y:(this.random()*2-1)*Hn})),this.geometry.setAttribute("position",new Ge(this.positions,3)),this.geometry.setDrawRange(0,t*2))}update(t,{weather:e={},camera:n=this.fallbackCamera,paused:s=!1}={}){const r=e.kind||e.type,o=Math.max(0,Math.min(1,e.rainIntensity??e.intensity??0)),a=r==="storm"||e.severity>=.78?"storm":r==="heavy-rain"||o>=.68?"heavy":r==="rain"&&o>.02?"light":null;if(this.resize(a?pM[a]:0),!this.active)return;this.material.opacity=a==="light"?.48:a==="heavy"?.6:.7;const c=s?0:Math.min(.1,Math.max(0,Number(t)||0)),l=Math.max(-8,Math.min(8,e.windIntensity??e.wind??0)),h=mM[a],u=a==="storm"?(l<0?-1:1)*Math.max(10,Math.abs(l)*16):l*3,d=new I(u,-h,0),f=a==="light"?.8:a==="heavy"?1.3:1.8;n.updateMatrixWorld(!0);const x=new I(0,0,0).unproject(n).clone().add(d).project(n);for(let m=0;m<this.active;m++){const p=this.drops[m];p.x+=x.x*c,p.y+=x.y*c,p.y<-Hn&&(p.y+=Hn*2,p.x=(this.random()*2-1)*Hn),p.x>Hn&&(p.x-=Hn*2),p.x<-Hn&&(p.x+=Hn*2);const M=new I(p.x,p.y,0).unproject(n),v=M.clone().addScaledVector(d,f/h);M.toArray(this.positions,m*6),v.toArray(this.positions,m*6+3)}this.geometry.attributes.position.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose(),this.root.removeFromParent()}}const xM=(i,t,e)=>Math.max(t,Math.min(e,i));function _M(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}class vM{constructor(t){this.scene=t,this.root=new Jt,this.root.name="Meadow nature",t.add(this.root),this.resources=new Set,this.time=0,this.wildlife=[],this.batches={},this.transform=new we}own(t){return this.resources.add(t),t}clear(){this.root.traverse(t=>{t.isInstancedMesh&&t.dispose()}),this.root.clear(),this.resources.forEach(t=>t.dispose()),this.resources.clear(),this.rainView?.dispose(),this.rainView=null,this.wildlife=[],this.batches={},this.precipitation=null}batch(t,e,n,s){const r=new oi(e,n,s);return r.instanceMatrix.setUsage(ps),r.frustumCulled=!1,this.root.add(r),this.batches[t]=r,r}setLevel(t){this.clear(),this.level=t,this.time=0,this.weather=Nf(t);const e=_M((t.seed||42)+71053),n=t.bounds,s=n.maxX-n.minX,r=n.maxZ-n.minZ,o=[t.dog||t.spawn,...t.animals||[]].filter(Boolean),a=this.own(new Fi(1,10,8)),c=rM(t),l=["butterfly","bird","squirrel","rabbit"];for(const u of l){const d=c[u]||0;if(d)for(let f=0;f<d;f++){let g=null;for(let x=0;x<240;x++){const m=(t.roads||[]).flatMap(b=>b.points||[b.from,b.to]).filter(Boolean),p=x<120&&m.length?m[Math.floor(e()*m.length)]:null,M=e()*Math.PI*2,v=8+e()*13,_=p?{x:p.x+Math.cos(M)*v,z:p.z+Math.sin(M)*v}:{x:n.minX+2+e()*(s-4),z:n.minZ+2+e()*(r-4)};if(cM(t,_,o,.5)){g=_;break}}this.wildlife.push({kind:u,slot:f,x:g?.x??0,z:g?.z??0,homeX:g?.x??0,homeZ:g?.z??0,phase:e()*Math.PI*2,heading:e()*Math.PI*2,visible:!!g,gait:0,hidden:!1,hideTimer:0})}}const h={bird:["#54777b","#91adb0"],butterfly:["#65523f","#f2ac75"]};for(const u of["bird","butterfly"]){const d=c[u]||0;if(!d)continue;const[f,g]=h[u];this.batch(`${u}Body`,a,this.own(new le({color:f,roughness:1})),d),this.batch(`${u}Wing`,a,this.own(new le({color:g,roughness:1})),d*2)}for(const u of["squirrel","rabbit"]){const d=c[u]||0;if(!d)continue;this.batch(`${u}Body`,this.own(dM(u)),this.own(new le({vertexColors:!0,roughness:.94})),d);const f=u==="squirrel"?"#74503b":"#b09b7c";this.batch(`${u}Paw`,a,this.own(new le({color:f,roughness:.94})),d*2)}this.rainView=new gM(this.root),this.update(0,{dog:t.dog||t.spawn,animals:t.animals})}pose(t,e,n,s,r,o,a,c,l=0,h=0,u=0){const d=this.transform;d.position.set(n,s,r),d.rotation.set(u,l,h),d.scale.set(o,a,c),d.updateMatrix(),t.setMatrixAt(e,d.matrix)}hideParts(t){if(t.kind==="bird"||t.kind==="butterfly"){this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Wing`],t.slot*2+e,0,-100,0,0,0,0)}else{this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Paw`],t.slot*2+e,0,-100,0,0,0,0)}}update(t,{dog:e,animals:n=[],camera:s,paused:r=!1}={}){if(!this.level)return;t=r?0:xM(Number(t)||0,0,.1),this.time+=t,sM(this.weather,t);const o=this.time,a=[e,...n,...this.level.helpers||[]].filter(Boolean);for(const c of this.wildlife){if(fM(this.level,c,t,a,o,this.weather),!c.visible||c.hidden){this.hideParts(c);continue}const l=c.kind==="bird"||c.kind==="butterfly",h=c.kind==="squirrel",u=c.kind==="rabbit",d=((c.gait||0)%1+1)%1,f=d<.54,g=u&&c.moving&&f?Math.sin(d/.54*Math.PI)*.24:h&&c.moving?Math.abs(Math.sin(d*Math.PI*2))*.1:0,x=Math.max(.06,1-(c.shelter||0)*.94),m=(h?.12:u?.04:l?3.2:1)+qn(this.level,c.x,c.z)+(l?Math.sin(o*(c.kind==="bird"?1.5:2)+c.phase)*.28:g)+(c.alert?.08:0);if(h||u){const p=u&&!f?.9:1,M=u&&f?-.14*Math.sin(d/.54*Math.PI):0,v=h&&c.moving?Math.sin(d*Math.PI*2)*.06:0;this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,x,x*p,x,c.heading,v,M);const _=Ff[c.kind].filter(b=>b.part==="paw");for(let b=0;b<_.length;b++){const A=_[b],P=c.moving?u&&f?Math.sin(d/.54*Math.PI)*.08:Math.sin(d*Math.PI*2+b*Math.PI)*.07:0,F=A.at[0],S=A.at[2],E=c.x+Math.cos(c.heading)*F+Math.sin(c.heading)*S,L=c.z-Math.sin(c.heading)*F+Math.cos(c.heading)*S;this.pose(this.batches[`${c.kind}Paw`],c.slot*2+b,E,m+A.at[1]*x+P,L,A.scale[0]*x,A.scale[1]*x,A.scale[2]*x,c.heading)}}else{this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,(c.kind==="bird"?.09:.075)*x,(c.kind==="bird"?.08:.06)*x,(c.kind==="bird"?.28:.12)*x,c.heading);for(let p=0;p<2;p++){const M=Math.sin(o*(c.kind==="bird"?11:18)+c.phase)*(c.kind==="bird"?.5:.85);this.pose(this.batches[`${c.kind}Wing`],c.slot*2+p,c.x+(p?1:-1)*.15,m+.04,c.z,.22*x,.025*x,.16*x,c.heading,(p?1:-1)*M)}}}for(const c of Object.values(this.batches))c.instanceMatrix.needsUpdate=!0;this.rainView?.update(t,{weather:this.weather,camera:s,paused:r})}dispose(){this.clear(),this.scene.remove(this.root),this.level=null}}const po=0,MM=1,yM=new I,lu=new Cm,za=new si,hu=new I,no=new rn;class SM{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new uu,this.unassigned=new uu,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new wM(t[e]));this._compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){const s=n.geometry;if(s!==void 0){const r=s.attributes.position;if(r!==void 0)for(let o=0,a=r.count;o<a;o++){const c=new I;c.fromBufferAttribute(r,o).applyMatrix4(n.matrixWorld),e.push(c)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,s=e.length;n<s;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let s=-1/0,r=1/0;for(let o=0,a=n.length;o<a;o++){const c=n[o],l=c.distanceToPoint(t.origin),h=c.normal.dot(t.direction);if(l>0&&h>=0)return null;const u=h!==0?-l/h:0;if(!(u<=0)&&(h>0?r=Math.min(u,r):s=Math.max(u,s),s>r))return null}return s!==-1/0?t.at(s,e):t.at(r,e),e}intersectsRay(t){return this.intersectRay(t,yM)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}_removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}_removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}_deleteFaceVertices(t,e){const n=this._removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let s=n;do{const r=s.next;e.distanceToPoint(s.point)>this.tolerance?this._addVertexToFace(s,e):this.unassigned.append(s),s=r}while(s!==null)}return this}_resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const n=e.next;let s=this.tolerance,r=null;for(let o=0;o<t.length;o++){const a=t[o];if(a.mark===po){const c=a.distanceToPoint(e.point);if(c>s&&(s=c,r=a),s>1e3*this.tolerance)break}}r!==null&&this._addVertexToFace(e,r),e=n}while(e!==null)}return this}_computeExtremes(){const t=new I,e=new I,n=[],s=[];for(let r=0;r<3;r++)n[r]=s[r]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let r=0,o=this.vertices.length;r<o;r++){const a=this.vertices[r],c=a.point;for(let l=0;l<3;l++)c.getComponent(l)<t.getComponent(l)&&(t.setComponent(l,c.getComponent(l)),n[l]=a);for(let l=0;l<3;l++)c.getComponent(l)>e.getComponent(l)&&(e.setComponent(l,c.getComponent(l)),s[l]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:s}}_computeInitialHull(){const t=this.vertices,e=this._computeExtremes(),n=e.min,s=e.max;let r=0,o=0;for(let d=0;d<3;d++){const f=s[d].point.getComponent(d)-n[d].point.getComponent(d);f>r&&(r=f,o=d)}const a=n[o],c=s[o];let l,h;r=0,lu.set(a.point,c.point);for(let d=0,f=this.vertices.length;d<f;d++){const g=t[d];if(g!==a&&g!==c){lu.closestPointToPoint(g.point,!0,hu);const x=hu.distanceToSquared(g.point);x>r&&(r=x,l=g)}}r=-1,za.setFromCoplanarPoints(a.point,c.point,l.point);for(let d=0,f=this.vertices.length;d<f;d++){const g=t[d];if(g!==a&&g!==c&&g!==l){const x=Math.abs(za.distanceToPoint(g.point));x>r&&(r=x,h=g)}}const u=[];if(za.distanceToPoint(h.point)<0){u.push(_n.create(a,c,l),_n.create(h,c,a),_n.create(h,l,c),_n.create(h,a,l));for(let d=0;d<3;d++){const f=(d+1)%3;u[d+1].getEdge(2).setTwin(u[0].getEdge(f)),u[d+1].getEdge(1).setTwin(u[f+1].getEdge(0))}}else{u.push(_n.create(a,l,c),_n.create(h,a,c),_n.create(h,c,l),_n.create(h,l,a));for(let d=0;d<3;d++){const f=(d+1)%3;u[d+1].getEdge(2).setTwin(u[0].getEdge((3-d)%3)),u[d+1].getEdge(0).setTwin(u[f+1].getEdge(1))}}for(let d=0;d<4;d++)this.faces.push(u[d]);for(let d=0,f=t.length;d<f;d++){const g=t[d];if(g!==a&&g!==c&&g!==l&&g!==h){r=this.tolerance;let x=null;for(let m=0;m<4;m++){const p=this.faces[m].distanceToPoint(g.point);p>r&&(r=p,x=this.faces[m])}x!==null&&this._addVertexToFace(g,x)}}return this}_reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];n.mark===po&&t.push(n)}return this.faces=t,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const n=this.assigned.first().face;let s=n.outside;do{const r=n.distanceToPoint(s.point);r>e&&(e=r,t=s),s=s.next}while(s!==null&&s.face===n);return t}}_computeHorizon(t,e,n,s){this._deleteFaceVertices(n),n.mark=MM;let r;e===null?r=e=n.getEdge(0):r=e.next;do{const o=r.twin,a=o.face;a.mark===po&&(a.distanceToPoint(t)>this.tolerance?this._computeHorizon(t,o,a,s):s.push(r)),r=r.next}while(r!==e);return this}_addAdjoiningFace(t,e){const n=_n.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}_addNewFaces(t,e){this.newFaces=[];let n=null,s=null;for(let r=0;r<e.length;r++){const o=e[r],a=this._addAdjoiningFace(t,o);n===null?n=a:a.next.setTwin(s),this.newFaces.push(a.face),s=a}return n.next.setTwin(s),this}_addVertexToHull(t){const e=[];return this.unassigned.clear(),this._removeVertexFromFace(t,t.face),this._computeHorizon(t.point,null,t.face,e),this._addNewFaces(t,e),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let t;for(this._computeInitialHull();(t=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(t);return this._reindexFaces(),this._cleanup(),this}}class _n{constructor(){this.normal=new I,this.midpoint=new I,this.area=0,this.constant=0,this.outside=null,this.mark=po,this.edge=null}static create(t,e,n){const s=new _n,r=new La(t,s),o=new La(e,s),a=new La(n,s);return r.next=a.prev=o,o.next=r.prev=a,a.next=o.prev=r,s.edge=r,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return no.set(t.point,e.point,n.point),no.getNormal(this.normal),no.getMidpoint(this.midpoint),this.area=no.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class La{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class wM{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class uu{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class bM extends _e{constructor(t=[]){super();const e=[],n=[],r=new SM().setFromPoints(t).faces;for(let o=0;o<r.length;o++){const a=r[o];let c=a.edge;do{const l=c.head().point;e.push(l.x,l.y,l.z),n.push(a.normal.x,a.normal.y,a.normal.z),c=c.next}while(c!==a.edge)}this.setAttribute("position",new $t(e,3)),this.setAttribute("normal",new $t(n,3))}}function EM(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new _e;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}c.setIndex(u)}for(const h in r){const u=fu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let x=0;x<o[h].length;++x)f.push(o[h][x][d]);const g=fu(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function fu(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Ge(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const x=h.getComponent(d,g);a.setComponent(d+u,g,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function TM(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let M=0,v=a.length;M<v;M++){const _=a[M],b=i.attributes[_];c[_]=new b.constructor(new b.array.constructor(b.count*b.itemSize),b.itemSize,b.normalized);const A=i.morphAttributes[_];A&&(l[_]||(l[_]=[]),A.forEach((P,F)=>{const S=new P.array.constructor(P.count*P.itemSize);l[_][F]=new P.constructor(S,P.itemSize,P.normalized)}))}const f=t*.5,g=Math.log10(1/t),x=Math.pow(10,g),m=f*x;for(let M=0;M<r;M++){const v=n?n.getX(M):M;let _="";for(let b=0,A=a.length;b<A;b++){const P=a[b],F=i.getAttribute(P),S=F.itemSize;for(let E=0;E<S;E++)_+=`${~~(F[u[E]](v)*x+m)},`}if(_ in e)h.push(e[_]);else{for(let b=0,A=a.length;b<A;b++){const P=a[b],F=i.getAttribute(P),S=i.morphAttributes[P],E=F.itemSize,L=c[P],G=l[P];for(let k=0;k<E;k++){const q=u[k],R=d[k];if(L[R](o,F[q](v)),S)for(let w=0,U=S.length;w<U;w++)G[w][R](o,S[w][q](v))}}e[_]=o,h.push(o),o++}}const p=i.clone();for(const M in i.attributes){const v=c[M];if(p.setAttribute(M,new v.constructor(v.array.slice(0,o*v.itemSize),v.itemSize,v.normalized)),M in l)for(let _=0;_<l[M].length;_++){const b=l[M][_];p.morphAttributes[M][_]=new b.constructor(b.array.slice(0,o*b.itemSize),b.itemSize,b.normalized)}}return p.setIndex(h),p}function Of(){const i=new Jt,t=new Set,e=new Set;return i.ownGeometry=n=>(t.add(n),n),i.ownMaterial=n=>(e.add(n),n),i.dispose=()=>{i.traverse(n=>{n.isInstancedMesh&&n.dispose()}),t.forEach(n=>n.dispose()),e.forEach(n=>n.dispose())},i}function AM(i=[]){const t=Of(),e=t.ownMaterial(new le({color:"#a97640",roughness:.9})),n=t.ownMaterial(new le({color:"#4e594b",roughness:.7})),s=t.ownGeometry(new wn(1,1,1)),r=[],o=new Map,a=(l,h,u,d,f,g,x)=>{let m=o.get(l);m||o.set(l,m=new Map);let p=m.get(x);p||m.set(x,p=[]),p.push({x:h,y:u,w:d,h:f,d:g})};for(const l of i.filter(h=>h.operable)){const h=new Jt;h.position.set(l.x,0,l.z),h.rotation.y=l.heading,t.add(h);for(const d of[-l.width/2,l.width/2])a(h,d,.85,.22,1.7,.3,n);const u=new Jt;u.name="gate-panel",h.add(u);for(const d of[.45,1.2])a(u,0,d,l.width,.15,.22,e);for(let d=0;d<=Math.ceil(l.width/1.2);d++)a(u,-l.width/2+l.width*d/Math.ceil(l.width/1.2),.82,.14,1.05,.19,e);a(u,l.width/2-.35,.85,.24,.28,.3,n),r.push({gate:l,panel:u})}const c=new ee;for(const[l,h]of o)for(const[u,d]of h){const f=new oi(s,u,d.length);d.forEach((g,x)=>{c.makeScale(g.w,g.h,g.d),c.setPosition(g.x,g.y,0),f.setMatrixAt(x,c)}),f.castShadow=f.receiveShadow=!0,l.add(f)}return t.update=()=>{for(const{gate:l,panel:h}of r)h.position.x=l.open?-l.width:0},t.update(),t}function RM(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function CM(i){const t=[];for(let f=0;f<3;f++)for(const g of[-1,1])for(const x of[-.34,.34])for(const m of[-.34,.34]){const p=new I;p.setComponent(f,g*.5),p.setComponent((f+1)%3,x),p.setComponent((f+2)%3,m);const M=1+.13*Math.sin(p.x*11+p.y*7+p.z*9+i*2.7);p.multiplyScalar(M),p.x+=p.y*(i-1)*.16,t.push(p)}const e=new bM(t),n=e.attributes.position;for(let f=0;f<n.count;f++){const g=n.getX(f),x=n.getY(f),m=n.getZ(f),p=1+.06*Math.sin(g*8+x*5+m*7+i*2.3);n.setXYZ(f,g*p,x*p,m*p)}e.deleteAttribute("normal");const s=TM(e);e.dispose(),s.computeBoundingBox();const r=new I,o=new I;s.boundingBox.getSize(r),s.boundingBox.getCenter(o),s.translate(-o.x,-o.y,-o.z),s.scale(1/r.x,1/r.y,1/r.z),s.computeVertexNormals(),s.computeBoundingBox();const a=[],c=s.attributes.position,l=new Ht("#eee7d5"),h=new Ht("#68785a"),u=new Ht("#ffffff"),d=new Ht;for(let f=0;f<c.count;f++){const g=c.getX(f),x=c.getY(f),m=c.getZ(f),p=Math.sin(g*15+m*13+i*3)*Math.sin(x*11-m*9);d.copy(u).multiplyScalar(.91+.09*Math.sin(g*8+x*12+m*6+i)),p>.24&&d.lerp(l,(p-.24)*.42),x<-.05&&p<.3&&d.lerp(h,Math.min(.34,(-x+.05)*.55)),a.push(d.r,d.g,d.b)}return s.setAttribute("color",new $t(a,3)),s}function PM(i=[]){const t=Of(),e=t.ownMaterial(new le({color:"#ffffff",roughness:1,vertexColors:!0})),n=[[],[],[]],s=["#aba595","#c2b59d","#8b9189","#c5bfac","#969d97","#aaa99b","#858c7d","#b4a28d"];for(const f of i.filter(g=>g.material==="stone")){const{a:g,b:x}=f,m=Math.hypot(x.x-g.x,x.z-g.z);if(m<.001)continue;const p=RM(Math.round(g.x*997+g.z*7919+x.x*104729+x.z*1543)),M=-Math.atan2(x.z-g.z,x.x-g.x);for(let v=0;v<4;v++){const _=v===3,A=Math.max(1,Math.ceil(m/(_?.48:v===0?1.24:.98))),P=Array.from({length:A},()=>.45+p()*1.2),F=P.reduce((E,L)=>E+L,0);let S=0;for(const E of P){const L=m*E/F,G=S+L,k=(S+G)/2,q=Math.max(1e-4,L-Math.min(.018,L*.08)),R=_?.19+p()*.2:.29+p()*.105,w=(p()-.5)*2*Math.min(.065,q/(R*2)),U=Math.abs(Math.sin(w)),D=Math.cos(w),Z=Math.max(1e-5,(q-R*U)/D),J=(Z*U+R*D)/2,N=Math.sin(k*.79+g.x*.13+g.z*.17)*.035;n[Math.floor(p()*3)].push({x:g.x+(x.x-g.x)*k/m,z:g.z+(x.z-g.z)*k/m,yaw:M+(p()<.5?Math.PI:0),tilt:w,y:v===0?J+.005:_?1.1+N+(p()-.5)*.055:.175+v*.325+N+(p()-.5)*.04,width:Z,height:R,depth:(_?.43:.59-v*.055)*(.94+p()*.06),color:s[Math.floor(p()*s.length)]}),S=G}}}const r=new ee,o=new Kn,a=new Kn,c=new I(0,1,0),l=new I(0,0,1),h=new I,u=new I,d=new Ht;for(const[f,g]of n.entries()){if(!g.length)continue;const x=new oi(t.ownGeometry(CM(f)),e,g.length);x.name="clay-drystone",g.forEach((m,p)=>{u.set(m.x,m.y,m.z),o.setFromAxisAngle(c,m.yaw).multiply(a.setFromAxisAngle(l,m.tilt)),h.set(m.width,m.height,m.depth),r.compose(u,o,h),x.setMatrixAt(p,r),x.setColorAt(p,d.set(m.color))}),x.castShadow=x.receiveShadow=!0,t.add(x)}return t}class DM{constructor(t,e,{halfExtent:n=t.radius+1.4,opacity:s=.7}={}){this.target=t,this.halfExtent=n,this.opacity=s,this.covered=new Set,this.disposed=!1,this.parts=e.map(r=>{const o=r.material,a=o.clone();return r.material=a,r.geometry.computeBoundingBox(),{mesh:r,original:o,material:a,shadow:r.castShadow,alpha:1}}),this.cameraLocal=new I,this.cameraDirection=new I,this.up=new I(0,1,0)}update(t,e,n){if(this.disposed||!Number.isFinite(n)||n<=0)return;t.updateMatrixWorld(!0),t.getWorldDirection(this.cameraDirection).negate(),this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));const s=new Set;Math.abs(this.cameraLocal.x)>.02&&s.add(this.cameraLocal.x>=0?"+x":"-x"),Math.abs(this.cameraLocal.z)>.02&&s.add(this.cameraLocal.z>=0?"+z":"-z");const r=this.target.heading||0,o=Math.cos(r),a=Math.sin(r),c=[],l=new Set(e);for(const u of this.covered)l.has(u)||this.covered.delete(u);for(const u of e){const d=u.x-this.target.x,f=u.z-this.target.z,g=d*o-f*a,x=d*a+f*o,m=u.type==="cow"?.65*ws(u):.4,p=this.halfExtent+m+(this.covered.has(u)?.18:0);Math.abs(g)<=p&&Math.abs(x)<=p?(this.covered.add(u),c.push({actor:u,radius:m})):this.covered.delete(u)}const h=-Math.expm1(-12*Math.min(n,.25));for(const u of this.parts){const{mesh:d,material:f}=u,x=c.length>0&&(d.userData.coverKind==="roof"||s.has(d.userData.coverSide))?this.opacity:1;u.alpha+=(x-u.alpha)*h,Math.abs(u.alpha-x)<.001&&(u.alpha=x),f.opacity=u.original.opacity*u.alpha;const m=u.alpha<1;f.transparent!==(m||u.original.transparent)&&(f.transparent=m||u.original.transparent,f.needsUpdate=!0),f.depthWrite=m?!1:u.original.depthWrite,d.castShadow=m?!1:u.shadow}}dispose(){if(!this.disposed){this.disposed=!0;for(const{mesh:t,original:e,material:n,shadow:s}of this.parts)t.material=e,t.castShadow=s,n.dispose();this.parts=[],this.covered.clear()}}}class IM{constructor(){this.centers={value:Array.from({length:4},()=>new I(0,-1e3,0))},this.buddyCenters={value:Array.from({length:4},()=>new I(0,-1e3,0))},this.buddyRadius={value:.4},this.radius={value:.54},this.strength={value:.85*.7},this.tint={value:new Ht("#39bfff")}}install(t){const e=t.onBeforeCompile,s=t.customProgramCacheKey.bind(t)();return t.onBeforeCompile=(r,o)=>{e.call(t,r,o),Object.assign(r.uniforms,{pipGlowCenters:this.centers,pipGlowRadius:this.radius,pipGlowTint:this.tint,pipGlowStrength:this.strength}),Object.assign(r.uniforms,{buddyGlowCenters:this.buddyCenters,buddyGlowRadius:this.buddyRadius}),r.vertexShader=`varying vec3 pipSurfaceWorld;
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
        totalEmissiveRadiance+=pipGlowTint*min(pipGlowAmount,1.0)*pipGlowStrength*smoothstep(0.45,0.9,pipWorldNormal.y);`)},t.customProgramCacheKey=()=>s+"|pip-ground-glow-v3",t.needsUpdate=!0,t}update(t,e,n=null){this.radius.value=.54*t.scale.x,t.userData.parts.pods.forEach((s,r)=>{const o=this.centers.value[r];o.copy(s),t.localToWorld(o),o.y=e(o.x,o.z)}),this.buddyRadius.value=.54*(n?.scale.x||.75),this.buddyCenters.value.forEach((s,r)=>{if(!n){s.set(0,-1e3,0);return}s.copy(n.userData.parts.pods[r]),n.localToWorld(s),s.y=e(s.x,s.z)})}}function du(i,t=.033){const e=new _e,n=pn(i).corners;return e.setAttribute("position",new $t(n.flatMap(s=>[s.x,t,s.z]),3)),e.setAttribute("uv",new $t([0,0,1,0,1,1,0,1],2)),e.setIndex([0,1,2,0,2,3]),e.computeVertexNormals(),e}function zM(i,t=.26,e=.04){const n=pn(i),s=Math.max(0,n.halfLength-t),r=Math.max(0,n.halfWidth-t),o=[[-s,-r],[s,-r],[s,r],[-s,r]].map(([l,h])=>zi(i,l,h)),a=new _e,c=[];a.setAttribute("position",new $t([...n.corners,...o].flatMap(l=>[l.x,e,l.z]),3));for(let l=0;l<4;l++){const h=(l+1)%4;c.push(l,h,h+4,l,h+4,l+4)}return a.setIndex(c),a.computeVertexNormals(),a}function LM(i,t,e){const n=pn(t).corners;i.fillStyle="#f9e7a2",i.strokeStyle="#fff0b5",i.lineWidth=1,i.beginPath(),n.forEach((s,r)=>{const o=e(s);r?i.lineTo(o.x,o.y):i.moveTo(o.x,o.y)}),i.closePath(),i.fill(),i.stroke()}const qe=1e-9,io=(i,t)=>i.x*t.z-i.z*t.x,Zs=(i,t)=>({x:i.x-t.x,z:i.z-t.z});function UM(i,t=0){const e=[],n=[],s=[];for(const f of i){const g=[];s.push(g);for(let x=0;x<f.length;x++){const m=f[x],p=f[(x+1)%f.length];if(n.push(m.x),Math.abs(m.x-p.x)>qe){const M={a:m,b:p,min:Math.min(m.x,p.x),max:Math.max(m.x,p.x),id:e.length};e.push(M),g.push(M)}}}for(let f=0;f<e.length;f++)for(let g=f+1;g<e.length;g++){const x=e[f],m=e[g];if(x.max<=m.min||m.max<=x.min)continue;const p=Zs(x.b,x.a),M=Zs(m.b,m.a),v=io(p,M);if(Math.abs(v)<qe)continue;const _=Zs(m.a,x.a),b=io(_,M)/v,A=io(_,p)/v;b>qe&&b<1-qe&&A>qe&&A<1-qe&&n.push(x.a.x+b*p.x)}n.sort((f,g)=>f-g);const r=n.filter((f,g)=>!g||f-n[g-1]>qe),o=[],a=[],c=(f,g)=>f.a.z+(g-f.a.x)*(f.b.z-f.a.z)/(f.b.x-f.a.x),l=(f,g,x)=>{[f,g,x]=[f,g,x].map(p=>({x:Math.fround(p.x),z:Math.fround(p.z)}));const m=io(Zs(g,f),Zs(x,f));if(!(Math.abs(m)<qe)){m>0&&([g,x]=[x,g]);for(const p of[f,g,x])o.push(p.x,t,p.z),a.push(p.x/4,p.z/4)}};let h=new Map;const u=[];for(let f=1;f<r.length;f++){const g=r[f-1],x=r[f],m=(g+x)/2,p=[];for(const _ of s){const b=_.filter(A=>m>A.min&&m<A.max).sort((A,P)=>c(A,m)-c(P,m));b.length>=2&&p.push({low:b[0],high:b[b.length-1]})}p.sort((_,b)=>c(_.low,m)-c(b.low,m));const M=[];for(const _ of p){const b=M[M.length-1];b&&c(_.low,m)<=c(b.high,m)+qe?c(_.high,m)>c(b.high,m)&&(b.high=_.high):M.push({..._})}const v=new Map;for(const{low:_,high:b}of M){const A=`${_.id}:${b.id}`,P=h.get(A);P?(P.right=x,v.set(A,P),h.delete(A)):v.set(A,{low:_,high:b,left:g,right:x})}u.push(...h.values()),h=v}u.push(...h.values());for(const{low:f,high:g,left:x,right:m}of u){const p={x,z:c(f,x)},M={x:m,z:c(f,m)},v={x:m,z:c(g,m)},_={x,z:c(g,x)};l(p,M,v),l(p,v,_)}const d=new _e;return d.setAttribute("position",new $t(o,3)),d.setAttribute("uv",new $t(a,2)),d.computeVertexNormals(),d}function so(i,t,{ragged:e=!1,y:n=.008,seed:s=1}={}){let r=s,o=0;const a=i.map((h,u)=>(u&&(o+=Math.hypot(h.x-i[u-1].x,h.z-i[u-1].z)),r=r*1664525+1013904223>>>0,e?Math.sin(o*.72)*.11+(r/4294967296-.5)*.17:0)),c=[],l=[];for(let h=1;h<i.length;h++){const u=i[h-1],d=i[h],f=Math.hypot(d.x-u.x,d.z-u.z);if(f<qe)continue;const g=-(d.z-u.z)/f,x=(d.x-u.x)/f,m=(v,_,b)=>({x:v.x+g*(t/2*b+_),z:v.z+x*(t/2*b+_)}),p=[m(u,a[h-1],-1),m(u,a[h-1],1)],M=[m(d,a[h],-1),m(d,a[h],1)];c.push([p[0],M[0],M[1],p[1]]),l[h-1]&&c.push([u,l[h-1][0],p[0]],[u,l[h-1][1],p[1]]),l[h]=M}return UM(c,n)}function NM(i,t){const e=[],n=[];for(let s=0;s<i.length;s++){const r=i[s],o=i[(s+1)%i.length],a=t(r),c=t(o);if(a>=-qe&&e.push(r),a<=qe&&n.push(r),a*c<-qe*qe){const l=a/(a-c),h={x:r.x+(o.x-r.x)*l,z:r.z+(o.z-r.z)*l};e.push(h),n.push(h)}}return[e,n].filter(s=>s.length>=3)}function pu(i,t,e=1,n=new _e){const r=(i.rivers||[]).flatMap(l=>l.bridges).filter(l=>Math.hypot(l.x-t.x,l.z-t.z)<l.length/2+l.width/2+1.1*e).map(l=>({...l,s:Math.sin(l.heading),c:Math.cos(l.heading),planks:Math.ceil(l.length/.3)})),o=(l,h)=>({x:(l.x-h.x)*h.c-(l.z-h.z)*h.s,z:(l.x-h.x)*h.s+(l.z-h.z)*h.c}),a=[];for(let l=0;l<64;l++){const h=(d,f)=>({x:t.x+Math.cos(d/64*Math.PI*2)*f*e,z:t.z+Math.sin(d/64*Math.PI*2)*f*e});let u=[[h(l,.9),h(l+1,.9),h(l+1,1.1),h(l,1.1)]];for(const d of r){const f=[g=>o(g,d).x-d.width/2,g=>o(g,d).x+d.width/2];for(let g=0;g<=d.planks;g++)f.push(x=>o(x,d).z-(-d.length/2+g*d.length/d.planks));for(const g of f)u=u.flatMap(x=>NM(x,g))}for(const d of u){const f=d.reduce((x,m)=>({x:x.x+m.x/d.length,z:x.z+m.z/d.length}),{x:0,z:0});let g=.055;for(const x of r){const m=o(f,x);if(Math.abs(m.x)<=x.width/2+qe&&Math.abs(m.z)<x.length/2){const p=Math.min(x.planks-1,Math.floor((m.z/x.length+.5)*x.planks));g=Math.max(g,.18+.12*Math.sin((p+.5)/x.planks*Math.PI)+.04)}}for(let x=1;x<d.length-1;x++)for(const m of[d[0],d[x],d[x+1]])a.push(m.x,g,m.z)}}let c=n.getAttribute("position");return(!c||c.array.length<a.length)&&(c&&n.dispose(),c=new Ge(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(a.length/3,1)))),3),c.setUsage(ps),n.setAttribute("position",c)),c.array.set(a),c.needsUpdate=!0,n.setDrawRange(0,a.length/3),n.boundingSphere=new mi(new I(t.x,.2,t.z),1.1*e+.4),n}const Ua=new Map,tn=10,mu=i=>new I(...i),ds=i=>[.07*Math.sin(i*1.8),i,.055*Math.sin(i*2.1)];function FM(i){const t=i.attributes.position,e=i.attributes.treeCenter,n=[0,1,2].map(()=>new Float32Array(t.count*3)),s=new I,r=new I,o=new I,a=new I,c=(h,u)=>new I().fromBufferAttribute(h,u),l=i.index.array;for(let h=0;h<l.length;h+=3){const[u,d,f]=l.slice(h,h+3),g=c(e,u),x=c(t,u).sub(g);s.copy(c(e,d)).sub(g),r.copy(c(e,f)).sub(g),o.copy(c(t,d)).sub(c(e,d)).sub(x),a.copy(c(t,f)).sub(c(e,f)).sub(x);const m=[s.clone().cross(r),s.clone().cross(a).add(o.clone().cross(r)),o.clone().cross(a)];for(let p=0;p<3;p++)for(const M of[u,d,f])n[p][M*3]+=m[p].x,n[p][M*3+1]+=m[p].y,n[p][M*3+2]+=m[p].z}n.forEach((h,u)=>i.setAttribute(`treeNormal${u}`,new Ge(h,3)))}function OM(i=0){if(i=Math.abs(Math.floor(i))%3,Ua.has(i))return Ua.get(i);const t=[],e=[],n=[],s=[],r=[],o=[],a=(x,m)=>{const p=t.length/3;return t.push(...x),e.push(...m),p},c=(x,m,p)=>n.push(x,m,p),l=[{y:-.06,r:.62},{y:.16,r:.57},{y:.6,r:.49},{y:1.08,r:.4}];let h=.34;for(let x=0;x<4;x++){const m=1.56+.35*x,p=h*.6,M=h*.8,v=l.length;l.push({y:m-.12,r:h},{y:m+.12,r:M});const _=(x*4+i)%tn;r.push({point:ds(m),parentRadius:h,childRadii:[M,p],lower:v,sector:_}),h=M*.89}l.push({y:2.94,r:.075},{y:3.12,r:.025});for(const{y:x,r:m}of l){const p=ds(x),M=[];for(let v=0;v<tn;v++){const _=v*2*Math.PI/tn,b=m+Math.max(0,1-(x+.06)/.3)*.14*Math.pow(Math.cos(_*2+i*.2),4);M.push(a([p[0]+b*Math.cos(_),x,p[2]+b*Math.sin(_)],p))}s.push(M)}for(let x=0;x<s.length-1;x++)for(let m=0;m<tn;m++){const p=r.find(P=>P.lower===x);if(p&&(m-p.sector+tn)%tn<3)continue;const M=(m+1)%tn,v=s[x][m],_=s[x][M],b=s[x+1][m],A=s[x+1][M];c(v,b,_),c(_,b,A)}const u=a(ds(l[0].y),ds(l[0].y)),d=a(ds(3.15),ds(3.15));for(let x=0;x<tn;x++)c(s[0][x],s[0][(x+1)%tn],u),c(s.at(-1)[(x+1)%tn],s.at(-1)[x],d);for(const x of r){const{lower:m,sector:p,point:M,childRadii:v}=x,_=[];for(let k=0;k<=3;k++)_.push(s[m][(p+k)%tn]);for(let k=3;k>=0;k--)_.push(s[m+1][(p+k)%tn]);const b=(p+1.5)*2*Math.PI/tn,A=new I(Math.cos(b),0,Math.sin(b)),P=new I(-Math.sin(b),0,Math.cos(b)),F=2.48+(M[1]-1.56)*.48,S=mu(M).addScaledVector(A,.54);S.y+=.08;const E=mu(M).addScaledVector(A,1.08);E.y=F;let L=_;x.branchRings=[],x.parentRing=s[m],x.continuingRing=s[m+1];for(let k=0;k<4;k++){const q=k/3,R=S.clone().lerp(E,q).addScaledVector(P,.065*Math.sin(q*Math.PI));R.y-=.09*Math.sin(q*Math.PI);const w=E.clone().sub(S).addScaledVector(P,.065*Math.PI*Math.cos(q*Math.PI));w.y-=.09*Math.PI*Math.cos(q*Math.PI),w.normalize();const U=P.clone(),D=U.clone().cross(w).normalize(),Z=v[1]*(1-.78*q),J=[];for(let N=0;N<8;N++){const Q=-Math.PI*.625-N*Math.PI/4;J.push(a(R.clone().addScaledVector(U,Math.sin(Q)*Z).addScaledVector(D,Math.cos(Q)*Z).toArray(),R.toArray()))}for(let N=0;N<8;N++){const Q=(N+1)%8;c(L[Q],L[N],J[N]),c(L[Q],J[N],J[Q])}x.branchRings.push({indices:J,center:R.toArray(),radius:Z}),L=J}const G=a(E.clone().addScaledVector(E.clone().sub(S).normalize(),.025).toArray(),E.toArray());for(let k=0;k<8;k++)c(L[(k+1)%8],L[k],G);o.push(E.toArray())}const f=new _e;f.setAttribute("position",new $t(t,3)),f.setAttribute("treeCenter",new $t(e,3));const g=t.map((x,m)=>{const p=t[m-m%3],M=t[m-m%3+1],v=t[m-m%3+2];return .94+.035*Math.sin(p*16+Math.sin(M*2)+v*11)});return f.setAttribute("color",new $t(g,3)),f.setIndex(n),f.computeVertexNormals(),FM(f),f.computeBoundingBox(),f.computeBoundingSphere(),f.userData={forks:r,tips:o,trunkRings:s,trunkProfile:l},Ua.set(i,f),f}function Bf(i){const t={value:1};i.userData.treeWidth=t,i.onBeforeCompile=e=>{e.uniforms.treeWidth=t,e.vertexShader=`attribute vec3 treeCenter;
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
vec3 objectNormal = normalize(treeNormal0 + woodWidth * treeNormal1 + woodWidth * woodWidth * treeNormal2);`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","vec3 transformed = treeCenter + woodWidth * (position - treeCenter);")},i.customProgramCacheKey=()=>"continuous-tree-v1"}const Na=(i,t)=>Math.max(-t,Math.min(t,i)),Fa=Math.PI/180,$s=(i,t,e,n)=>i+(t-i)*-Math.expm1(-e/n),kf=i=>.05+Math.sin(i*Math.PI*2/2.4)*.04;function Gf(){return{time:0,hover:kf(0),headYaw:0,roll:0,pitch:0,turnRate:0,filteredSpeed:0,previous:null}}function BM(i,t,e){const n={x:t.x,z:t.z,heading:t.heading??Math.PI/2},s=Math.hypot(t.vx||0,t.vz||0);if(i.previous||(i.previous=n,i.filteredSpeed=s),!(e>0)||!Number.isFinite(e))return i;if(i.time+=e,i.hover=kf(i.time),Math.hypot(n.x-i.previous.x,n.z-i.previous.z)>3)return i.headYaw=i.roll=i.pitch=i.turnRate=0,i.filteredSpeed=s,i.previous=n,i;const r=n.heading-i.previous.heading,o=Math.atan2(Math.sin(r),Math.cos(r))/e;i.turnRate=$s(i.turnRate,o,e,.12);const a=-Na(i.turnRate/Math.max(1,s)*Math.min(1,s)*.28,20*Fa);i.roll=$s(i.roll,a,e,.2),i.headYaw=$s(i.headYaw,Na(i.turnRate*.2,30*Fa),e,.09);const c=$s(i.filteredSpeed,s,e,.18),l=(c-i.filteredSpeed)/e;return i.filteredSpeed=c,i.pitch=$s(i.pitch,-Na(l/6,1)*10*Fa,e,.22),i.previous=n,i}const Ss=new Map,kM={TorusGeometry:Co,SphereGeometry:Fi,BoxGeometry:wn,CylinderGeometry:zs,ConeGeometry:ur},fn=new Map;let Ee;function GM(i){return .7+.2*Math.max(0,Math.min(1,(i-1.015)/(3.1-1.015)))}function zn(i){i.updateMatrixWorld(!0);const t=new Map;i.traverse(n=>{n.isMesh&&(t.has(n.material)||t.set(n.material,[]),t.get(n.material).push(n.geometry.clone().applyMatrix4(n.matrixWorld)))});const e=new Jt;e.name=i.name,e.userData.parts={};for(const[n,s]of t){const r=EM(s,!1);s.forEach(a=>a.dispose());const o=new ne(r,n);o.castShadow=o.receiveShadow=!0,e.add(o)}return e}function Vf(i,t){const e=zn(t);return fn.set(i,e),e.clone()}function Lo(i,t){const e=`${i}:${t.join(",")}`;return Ss.has(e)||Ss.set(e,new kM[i](...t)),Ss.get(e)}function VM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){const r=224+(s*13+(s>>>5)*7)%27;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);const n=new Vi(i);return n.wrapS=n.wrapT=$n,n.repeat.set(2,2),n.colorSpace=De,n}function HM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.38+Math.sin(s*.051)*1.7),a=Math.sin(Math.hypot(r-78,(s-45)*.4)*.38),c=Math.round(227+o*12+a*4+(r*7+s*11)%7),l=(s*128+r)*4;e.data[l]=e.data[l+1]=e.data[l+2]=c,e.data[l+3]=255}t.putImageData(e,0,0);const n=new Vi(i);return n.wrapS=n.wrapT=$n,n.colorSpace=De,n}function WM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.31+Math.sin(s*.045)*1.65)*8+Math.sin(r*.11+Math.sin(s*.021)*2.6)*5,a=Math.sin(Math.hypot(r-35,(s-74)*.15)*.46)*4,c=(r*17+s*31+r*s%29)%9-4,l=Math.max(0,Math.min(255,Math.round(132+o+a+c))),h=(s*128+r)*4;e.data[h]=l,e.data[h+1]=l,e.data[h+2]=l,e.data[h+3]=255}t.putImageData(e,0,0);const n=new Vi(i);return n.wrapS=n.wrapT=$n,n.repeat.set(1.2,1.7),n}function XM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128),n=[[188,203,148],[210,207,153],[164,191,137],[223,207,155],[154,184,133]];for(let r=0;r<128;r++)for(let o=0;o<128;o++){const a=Math.sin(o*.17+Math.sin(r*.11)*1.4)+Math.cos(r*.19-o*.07),c=(o*17+r*31+o*r%29)%13-6,l=n[(Math.floor((a+2)*1.25)+Math.floor(o/19)+Math.floor(r/23))%n.length],h=(r*128+o)*4;e.data[h]=Math.max(0,Math.min(255,l[0]+c)),e.data[h+1]=Math.max(0,Math.min(255,l[1]+c)),e.data[h+2]=Math.max(0,Math.min(255,l[2]+c)),e.data[h+3]=255}t.putImageData(e,0,0);const s=new Vi(i);return s.wrapS=s.wrapT=$n,s.colorSpace=De,s}function Un(){if(Ee)return Ee;const i=VM(),t=o=>new le({color:o,roughness:.9,map:i}),e=o=>new le({color:o,roughness:.55,metalness:.18,map:i});Ee={cream:e("#f5ead3"),white:e("#fff8e7"),dark:e("#354b55"),brass:new le({color:"#ddb469",roughness:.48,metalness:.62}),orange:e("#e6a04e"),dogCream:e("#ffe5ac"),rust:e("#c7704d"),cyan:new le({color:"#b6fbff",emissive:"#69dfe9",emissiveIntensity:.8,roughness:.32}),mint:e("#84cbb7"),black:e("#20343e"),wood:t("#ba9167"),paleWood:t("#e1bb87"),bark:t("#8b7758"),leaves:t("#8cbd8b"),leavesLight:t("#b8d28f"),leavesDark:t("#619b84"),roof:t("#bf755f"),barn:t("#d9977e"),barnTrim:t("#fae7c2"),flowerPink:t("#f2a6a6"),flowerYellow:t("#ffe28a"),flowerWhite:t("#fff7e5"),flowerCenter:t("#daa661"),stem:t("#7fab72"),stone:t("#abb7a4")},Ee.eye=Ee.white,Ee.pupil=Ee.black;const n=HM();for(const o of["wood","paleWood"])Ee[o].map=n;const s=WM();Ee.bark.map=Ee.bark.bumpMap=s,Ee.bark.bumpScale=.055,Ee.treeWood=Ee.bark.clone(),Ee.treeWood.map=Ee.treeWood.bumpMap=null,Ee.treeWood.vertexColors=!0,Bf(Ee.treeWood);const r=XM();for(const o of["leaves","leavesLight","leavesDark"])Ee[o].map=r;return Ee.leaves.needsUpdate=Ee.leavesLight.needsUpdate=Ee.leavesDark.needsUpdate=!0,Ee}function Ps(i,t,e,n,s=[0,0,0],r=[1,1,1]){const o=new ne(Lo(t,e),n);return o.position.set(...s),o.scale.set(...r),o.castShadow=!0,o.receiveShadow=!0,i.add(o),o}function Bt(i,t,e,n,s=10){return Ps(i,"SphereGeometry",[1,s,6],t,e,n)}function Ye(i,t,e,n,s=.025,r=10){const o=`sculpted-sphere:${s}:${r}`;if(!Ss.has(o)){const c=Lo("SphereGeometry",[1,r,Math.max(3,Math.round(r*.6))]).clone(),l=c.attributes.position;for(let h=0;h<l.count;h++){const u=l.getX(h),d=l.getY(h),f=l.getZ(h),g=1+s*Math.sin(u*4.1+f*2.8)*Math.cos(d*3.7-f*1.3);l.setXYZ(h,u*g,d*g,f*g)}c.computeVertexNormals(),Ss.set(o,c)}const a=new ne(Ss.get(o),t);return a.position.set(...e),a.scale.set(...n),a.castShadow=a.receiveShadow=!0,i.add(a),a}function Ue(i,t,e,n){return Ps(i,"BoxGeometry",[1,1,1],t,e,n)}function Be(i,t,e,n,s,r){const o=Ps(i,"CylinderGeometry",[n,n,s,10],t,e);return r&&o.rotation.set(...r),o}function Oi(i,t,e,n,s,r=.105){Bt(i,t.eye,[e,n,s],[r,r*1.08,r*.55]),Bt(i,t.pupil,[e,n-r*.05,s+r*.45],[r*.43,r*.58,r*.23]),Bt(i,t.white,[e-r*.14,n+r*.2,s+r*.67],[r*.15,r*.15,r*.12],8)}function qM(i,t,e,n,s=t.brass){return Bt(i,s,e,n)}function ro(i,t,e,n,s,r=t.dark){const o=new Jt;return o.position.set(e,s+.1,n),i.add(o),Bt(o,t.brass,[0,0,0],[.105,.105,.105]),Be(o,t.dark,[0,-s*.45,0],.065,s*.85),Bt(o,t.brass,[0,-s*.72,0],[.078,.078,.078]),Bt(o,r,[0,-s+.025,.055],[.115,.1,.17]),o}function YM(){const i=Un(),t=new Jt,e=new Jt,n=new le({color:"#dce4e5",metalness:.45,roughness:.55}),s=new le({color:"#9caaae",metalness:.55,roughness:.45});Ue(t,n,[0,.83,-.06],[.62,.51,.92]),Ue(t,s,[0,1.095,-.08],[.64,.035,.8]);for(const x of[-1,1]){Ue(t,s,[x*.315,.84,-.08],[.016,.018,.84]),Ue(t,s,[x*.316,.84,-.13],[.018,.48,.018]);for(const m of[-.43,.28])for(const p of[.64,1.03])Bt(t,i.brass,[x*.327,p,m],[.025,.025,.025])}Be(t,i.dark,[0,1.03,.38],.21,.18,[Math.PI/2,0,0]),Ue(e,n,[0,1.32,.47],[.57,.45,.43]),Ue(e,i.dark,[0,1.35,.696],[.49,.25,.025]);const r=Ue(e,n,[0,1.15,.79],[.49,.25,.45]);r.rotation.x=-.18,Ue(e,s,[0,.99,.8],[.46,.04,.42]),Bt(e,i.black,[0,1.2,1.025],[.1,.095,.085]),Oi(e,i,-.135,1.36,.72,.109),Oi(e,i,.135,1.36,.72,.109);for(const x of[-1,1]){const m=Ue(e,n,[x*.28,1.69,.43],[.22,.4,.12]);m.rotation.z=x*-.42,Ue(m,i.dark,[0,0,.52],[.68,.75,.12])}const o=[];for(const x of[-.3,.3])for(const m of[-.35,.29])Ue(t,n,[x,.64,m],[.23,.43,.27]),Be(t,s,[x*1.35,.78,m],.105,.06,[0,0,Math.PI/2]),Be(t,i.dark,[x,.39,m],.12,.09),Be(t,s,[x,.335,m],.13,.05),o.push(new I(x,.3,m));const a=new Jt,c=new Jt;a.name="Pip the hovering robot sheepdog",c.name="Pip floating body rig",a.add(c);const l=zn(t),h=zn(e);l.position.y=-.83,h.position.set(0,1.03-.83,.38);for(const x of h.children)x.geometry.translate(0,-1.03,-.38);c.position.y=.83,c.add(l,h),c.traverse(x=>{x.isMesh&&(x.userData.ownedGeometry=!0,(x.material===n||x.material===s)&&(x.userData.ownedMaterial=!0))});const u=new Jt;u.position.set(0,.94-.83,-.52),c.add(u);for(let x=0;x<7;x++)Be(u,x%2?i.dark:s,[0,.04+x*.05,-x*.035],.035,.055,[-.6,0,0]);const d=new le({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),f=Bt(u,d,[0,.41,-.27],[.075,.075,.075]);f.userData.ownedMaterial=!0;const g=o.map(x=>Array.from({length:3},(m,p)=>{const M=new nn({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),v=new ne(Lo("TorusGeometry",[.135,.014,6,24]),M);return v.name=`Pip thruster ring ${p+1}`,v.rotation.x=Math.PI/2,v.userData.ownedMaterial=!0,a.add(v),v}));return a.userData.parts={body:l,rig:c,head:h,legs:[],tail:u,tailLight:f,basePods:o.map(x=>x.clone().add(new I(0,-.83,0))),pods:o,rings:g},a.userData.motion=Gf(),bo(a,{x:0,z:0,heading:0,vx:0,vz:0},0),a.userData.motion.previous=null,a.userData.hover={time:0,previous:null,trails:[]},a}function ZM(){const i=Un(),t=new Jt,e=new Jt,n=[],s=new le({color:"#d4dfe0",metalness:.28,roughness:.68}),r=new le({color:"#eee5d5",metalness:.12,roughness:.82}),o=new le({color:"#b8b1a7",metalness:.24,roughness:.72}),a=new le({color:"#4a4a43",metalness:.08,roughness:.6});Ye(t,s,[0,.83,-.08],[.3,.27,.42],.012,12),Ue(t,r,[0,.78,.27],[.39,.27,.28]),Ue(t,o,[0,.61,.31],[.3,.045,.19]);for(const v of[-1,1]){const _=Bt(t,o,[v*.275,.84,-.02],[.055,.16,.19]);_.rotation.z=v*-.12;for(const b of[-.31,.25])Bt(t,a,[v*.25,.81,b],[.025,.025,.025],8)}Be(t,i.dark,[0,1,.31],.15,.15,[Math.PI/2,0,0]),Ye(e,s,[0,1.31,.43],[.3,.31,.28],.01,14);for(const v of[-1,1])Be(e,a,[v*.135,1.36,.676],.117,.032,[Math.PI/2,0,0]),Bt(e,i.white,[v*.135,1.36,.704],[.088,.098,.043],12),Bt(e,i.black,[v*.135,1.35,.744],[.047,.058,.024],10),Bt(e,i.white,[v*.115,1.381,.764],[.018,.019,.012],8);Ye(e,r,[0,1.145,.68],[.235,.135,.18],.006,12),Bt(e,i.black,[0,1.188,.835],[.078,.067,.055],10);const c=Ps(e,"ConeGeometry",[1,1,3],s,[-.255,1.68,.4],[.14,.25,.065]);c.rotation.z=-.16,Ps(e,"ConeGeometry",[1,1,3],o,[.27,1.57,.4],[.21,.14,.07]).rotation.set(0,0,Math.PI/2+.22),Ue(e,i.dark,[.28,1.53,.459],[.13,.075,.018]);const h=[];for(const v of[-.29,.29])for(const _ of[-.3,.25]){Ye(t,s,[v,.59,_],[.14,.24,.16],.006,10),Be(t,o,[v,.72,_],.084,.055,[0,0,Math.PI/2]),Be(t,i.dark,[v,.37,_],.105,.075);const b=new le({color:"#7cecff",emissive:"#27c8ff",emissiveIntensity:1.1,roughness:.35});n.push(b);const A=Bt(t,b,[v,.325,_],[.112,.052,.112],10);A.userData.ownedMaterial=!0,h.push(new I(v,.3,_))}const u=new Jt,d=new Jt;u.name="Buddy the hovering robot puppy",d.name="Buddy floating body rig",u.add(d);const f=zn(t),g=zn(e);f.position.y=-.83,g.position.set(0,1.03-.83,.38);for(const v of g.children)v.geometry.translate(0,-1.03,-.38);d.position.y=.83,d.add(f,g),d.traverse(v=>{v.isMesh&&(v.userData.ownedGeometry=!0,[s,r,o,a,...n].includes(v.material)&&(v.userData.ownedMaterial=!0))});const x=new Jt;x.name="Buddy spring tail",x.position.set(0,.89-.83,-.47),d.add(x);for(let v=0;v<6;v++){const _=Be(x,v%2?i.dark:o,[0,.035+v*.047,-v*.032],.034,.052,[-.62,0,0]);_.name=`Buddy tail spring segment ${v+1}`}const m=new le({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.45,roughness:.28}),p=Bt(x,m,[0,.32,-.205],[.071,.071,.071]);p.name="Buddy blue tail light",p.userData.ownedMaterial=!0;const M=h.map(v=>Array.from({length:3},(_,b)=>{const A=new nn({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),P=new ne(Lo("TorusGeometry",[.125,.013,6,24]),A);return P.name=`Buddy hover ring ${b+1}`,P.rotation.x=Math.PI/2,P.userData.ownedMaterial=!0,u.add(P),P}));return u.userData.parts={body:f,rig:d,head:g,legs:[],tail:x,tailLight:p,basePods:h.map(v=>v.clone().add(new I(0,-.83,0))),pods:h,rings:M},u.userData.motion=Gf(),bo(u,{x:0,z:0,heading:0,vx:0,vz:0},0),u.userData.motion.previous=null,u.userData.hover={time:0,previous:null,trails:[]},u.userData.suggestedScale=.82,u.userData.modelContract="pip-pose-hover-v1",u}function bo(i,t,e){const n=BM(i.userData.motion,t,e),s=i.userData.parts;s.rig.position.y=.83+n.hover,s.rig.rotation.set(n.pitch,0,n.roll),s.head.rotation.y=n.headYaw,s.rig.updateMatrix(),s.pods.forEach((r,o)=>r.copy(s.basePods[o]).applyMatrix4(s.rig.matrix))}function gu(i,t){const e=i.userData.hover;if(!e)return;i.updateMatrixWorld(!0);const n=i.userData.parts.pods.map(r=>i.localToWorld(r.clone()));(!e.previous||i.position.distanceTo(e.previous)>3)&&(e.trails=n.map(r=>r.clone())),t>0&&(e.time+=t);for(let r=0;r<n.length;r++){t>0&&e.trails[r].lerp(n[r],1-Math.exp(-t/.13));const o=e.time/.55%1;for(let a=0;a<3;a++){const c=i.userData.parts.rings[r][a],l=n[r].clone().lerp(e.trails[r],a===0?0:(a-1+o)/2),h=i.worldToLocal(l);h.y=i.userData.parts.pods[r].y-.055-(a===0?0:(a-1+o)*.1+.055),c.position.copy(h),c.material.opacity=a===0?.95:a===1?.85*Math.min(1,o/.15):.85*(1-o),c.scale.setScalar(1+(a===0?0:(a-1+o)*.15))}}e.previous=i.position.clone()}const $M=[[[.11,.47,.105,.25],[.38,.42,.14,.31],[.65,.52,.12,.28],[.87,.43,.13,.3],[.52,.88,.09,.14]],[[.06,.36,.13,.22],[.29,.6,.095,.33],[.56,.36,.17,.27],[.85,.65,.1,.25],[.68,.87,.08,.12]],[[.15,.65,.16,.25],[.43,.34,.11,.24],[.68,.62,.18,.32],[.94,.3,.08,.18],[.35,.86,.07,.12]],[[.02,.58,.1,.31],[.25,.34,.16,.23],[.51,.65,.12,.28],[.78,.38,.15,.32],[.91,.84,.06,.11]]],Oa=[];function KM(i,t){let e=0;for(const s of String(t))e=Math.imul(e^s.charCodeAt(0),16777619);let n=(i^e^1129267540)>>>0;return n=Math.imul(n^n>>>16,2246822507),n=Math.imul(n^n>>>13,3266489909),(n^n>>>16)>>>30}function Hf(i=0){if(!Number.isInteger(i)||i<0||i>3)throw new RangeError("Unknown cow coat variant");if(Oa[i])return Oa[i];const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d"),n=e.createImageData(256,128),s=$M[i];for(let a=0;a<128;a++)for(let c=0;c<256;c++){const l=c/256,h=a/128,d=s.some(([x,m,p,M])=>{const v=Math.min(Math.abs(l-x),1-Math.abs(l-x))/p,_=(h-m)/M,b=Math.atan2(_,v);return v*v+_*_<1+.19*Math.sin(b*3+x*30)+.1*Math.cos(b*5+m*12)})?[49,48,46]:[238,228,204],f=(c*13+a*7)%9-4,g=(a*256+c)*4;for(let x=0;x<3;x++)n.data[g+x]=d[x]+f;n.data[g+3]=255}e.putImageData(n,0,0);const r=new Vi(t);r.colorSpace=De;const o=new le({color:"#ffffff",map:r,roughness:.94});return o.userData.cowCoatVariant=i,Oa[i]=o,o}function JM(i){const t=new Jt;t.name="Clay Holstein cow";const e=h=>new le({color:h,roughness:.94,map:i.cream.map}),n=e("#d99f91"),s=e("#704c49"),r=e("#e4d1ae"),o=Hf();Ye(t,o,[0,.54,0],[.32,.34,.4875],.025,20);const a=new Jt;a.position.set(0,.73,.4175),t.add(a),Ye(a,i.cream,[0,-.015,.065],[.215,.225,.215],.018,16),Ye(a,i.dark,[0,.065,.055],[.205,.205,.18],.018,16),Bt(a,i.cream,[0,-.055,.21],[.095,.15,.065],16),Bt(a,n,[0,-.115,.255],[.224,.115,.125],16),Bt(a,s,[0,-.203,.245],[.145,.012,.06],12),Bt(a,n,[0,-.215,.237],[.157,.026,.065],12);for(const h of[-1,1]){Oi(a,i,h*.087,.075,.207,.068),Bt(a,i.dark,[h*.086,.133,.2],[.078,.026,.043],12);const u=Bt(a,i.dark,[h*.255,.09,.005],[.139,.065,.08],14);u.rotation.z=h*.28;const d=Bt(a,s,[h*.265,.096,.055],[.09,.037,.023],12);d.rotation.z=h*.28;const f=Bt(a,s,[h*.115,-.089,.359],[.037,.045,.014],12);f.rotation.z=h*-.22,Bt(a,n,[h*.115,-.074,.36],[.028,.014,.015],10);const g=new zs(.008,.045,.16,10,4),x=g.attributes.position;for(let p=0;p<x.count;p++){const M=(x.getY(p)+.08)/.16;x.setXYZ(p,x.getX(p)+h*(.055*M-.04*M*M),x.getY(p),x.getZ(p)-.025*M*M)}g.computeVertexNormals(),g.userData.temporaryCowHorn=!0;const m=new ne(g,r);m.position.set(h*.145,.25,.015),a.add(m)}const c=[];for(const[h,u]of[[-.215,.275],[.215,.275],[-.215,-.29375],[.215,-.29375]]){const d=new Jt;d.position.set(h,.36,u),t.add(d),Bt(d,i.cream,[0,-.105,0],[.073,.19,.075],12);for(const f of[-1,1])Bt(d,i.dark,[f*.035,-.272,.029],[.034,.063,.091],10);c.push(d)}Bt(t,n,[0,.295,-.23125],[.105,.067,.12],12);for(const h of[-.052,.052])for(const u of[-.2875,-.1875])Bt(t,n,[h,.24,u],[.019,.038,.02],8);const l=Bt(t,i.cream,[.035,.48,-.4835],[.027,.18,.027],10);return l.rotation.x=.2,Bt(t,i.dark,[.035,.312,-.5175],[.048,.069,.043],10),{animal:t,legs:c,head:a}}function xu(i,t,e,n){i.scale.setScalar(n);for(const o of t)i.remove(o);i.remove(e);const s=zn(i),r=e.position.clone().multiplyScalar(n);e.position.set(0,0,0),e.scale.setScalar(n);for(const o of[...zn(e).children])o.name="head",o.position.copy(r),o.userData={headPart:!0,pivot:r.toArray(),grazeDrop:.3*n},s.add(o);for(let o=0;o<t.length;o++){const a=t[o],c=a.position.clone().multiplyScalar(n);a.position.set(0,0,0),a.scale.setScalar(n);for(const l of[...zn(a).children])l.name=`leg-${o}`,l.position.copy(c),l.userData={limbIndex:o,pivot:c.toArray()},s.add(l)}return s.userData.articulated=!0,s}function jM(i="sheep"){const t=`animal:${i}`;if(fn.has(t))return fn.get(t).clone();const e=Un();if(i==="cow"){const{animal:c,legs:l,head:h}=JM(e),u=xu(c,l,h,1.5);return h.traverse(d=>{d.geometry?.userData.temporaryCowHorn&&d.geometry.dispose()}),fn.set(t,u),u.clone()}const n=new Jt;n.name="Robot sheep",Ye(n,e.cream,[0,.54,0],[.32,.34,.39]);{for(let c=0;c<3;c++)Ye(n,e.white,[0,.625,-.23+c*.22],[.335,.3,.145]);[-1,1].forEach(c=>{for(let l=0;l<3;l++)Bt(n,e.brass,[c*.312,.56,-.21+l*.21],[.029,.033,.033],8)})}qM(n,e,[0,.87,-.11],[.1,.024,.105],e.mint);const s=new Jt;s.position.set(0,.7,.34),n.add(s),Bt(s,e.dark,[0,0,.06],[.22,.235,.205]),Bt(s,e.black,[0,-.08,.225],[.185,.12,.09]),Oi(s,e,-.096,.055,.221,.075),Oi(s,e,.096,.055,.221,.075),[-1,1].forEach(c=>{const l=Bt(s,e.cream,[c*.235,.075,.025],[.135,.048,.082]);l.rotation.z=c*.25,Bt(s,e.brass,[c*.193,.075,.025],[.045,.045,.045])}),Bt(s,e.cyan,[0,.22,.008],[.033,.033,.033],8),Be(n,e.dark,[0,.64,.31],.13,.11,[Math.PI/2,0,0]);const r=[ro(n,e,-.22,.22,.25),ro(n,e,.22,.22,.25),ro(n,e,-.22,-.24,.25),ro(n,e,.22,-.24,.25)];Bt(n,e.dark,[0,.6,-.39],[.061,.065,.07]);const a=xu(n,r,s,1);return fn.set(t,a),a.clone()}function QM(){const i=Un(),t=new Jt;t.name="Autonomous meadow drone",Bt(t,i.mint,[0,0,0],[.3,.14,.25]),Bt(t,i.cream,[0,.09,0],[.2,.085,.17]),Oi(t,i,-.1,-.005,.238,.068),Oi(t,i,.1,-.005,.238,.068);const e=[];return[-1,1].forEach(n=>[-1,1].forEach(s=>{const r=Be(t,i.brass,[n*.24,0,s*.2],.035,.32,[0,0,n*Math.PI/2]);r.rotation.y=s*-.5;const o=new Jt;o.position.set(n*.39,.09,s*.29),t.add(o),Bt(o,i.dark,[0,-.045,0],[.071,.08,.071]),Bt(o,i.cream,[0,0,0],[.23,.017,.04]),Bt(o,i.cream,[0,0,0],[.04,.017,.23]),Bt(o,i.cyan,[0,.014,0],[.036,.027,.036]),e.push(o)})),t.userData.parts={propellers:e},t}function _u(i=0,t=0){i=Math.abs(Math.floor(i))%3;const e=Math.max(0,Math.min(2,Math.round(t))),n=`tree:${i}:${e}`;if(fn.has(n))return vu(fn.get(n));const s=Un(),r=new Jt;r.name="clay tree";const o=new ne(OM(i),s.treeWood);o.name="tree-wood",o.userData.treeWidth=1,o.castShadow=!1,o.receiveShadow=!0,r.add(o),r.userData.forks=o.geometry.userData.forks;const a=o.geometry.userData.tips,c=new I(0,1,0),l=[s.leaves,s.leavesDark,s.leavesLight][i],u=[[.14,3.12,.02],[-.26,2.85,-.13],[.32,2.83,.27],...a,[-.52,2.64,.47],[.52,2.75,-.47],[-.48,3.19,.27],[.44,3.21,-.3]].slice(0,7+e*2).map((g,x)=>{const m=Math.hypot(g[0],g[2]),p=1+.12*Math.sin(x*4.71+i*1.93),M=(.59-.21*Math.min(1,m/1.2))*p;return[g,[M,M*(1.02+.1*Math.sin(x+i)),M*(.94+.08*Math.cos(x*2))]]}),d=new Jt;for(const[g,x]of u)Ye(d,l,g,x,.075,8);for(let g=0;g<u.length*2;g++){const[x,m]=u[g%u.length],p=g*2.399963+i*.27,M=g%2?.3:-.25,v=Math.sqrt(1-M*M),_=Math.cos(p)*v,b=Math.sin(p)*v,A=1+.075*Math.sin(_*4.1+b*2.8)*Math.cos(M*3.7-b*1.3),P=new I(_/m[0],M/m[1],b/m[2]).normalize();Ps(d,"SphereGeometry",[1,6,3],l,[x[0]+_*m[0]*A*.92,x[1]+M*m[1]*A*.92,x[2]+b*m[2]*A*.92],[.14,.07,.11]).quaternion.setFromUnitVectors(c,P)}const f=zn(d).children[0];return f.name="tree-foliage",f.userData.crownProfile=u.map(([g,x])=>({position:g,radial:Math.hypot(g[0],g[2]),size:x[0]})),r.add(f),fn.set(n,r),vu(r)}function vu(i){const t=i.clone(),e=t.getObjectByName("tree-wood");return e.material=e.material.clone(),Bf(e.material),e.userData.ownedMaterial=!0,t}function ty(i=2.2,t=4.5){const e=Un(),n=new Jt,s=Math.ceil(t/.3);for(let r=0;r<s;r++){const o=-t/2+(r+.5)*t/s,a=Math.sin((r+.5)/s*Math.PI)*.12;Ue(n,r%3?e.paleWood:e.wood,[0,a+.09,o],[i,.18,t/s-.025]),[-1,1].forEach(c=>Bt(n,e.brass,[c*(i/2-.16),a+.184,o],[.025,.01,.025],6))}return[-1,1].forEach(r=>{for(let o=0;o<4;o++)Be(n,e.wood,[r*i/2,.56,-t/2+o*t/3],.065,.96);Ue(n,e.paleWood,[r*i/2,.86,0],[.1,.1,t+.2]),Ue(n,e.wood,[r*i/2,.46,0],[.08,.075,t+.2])}),zn(n)}function ey(i=0,t=5){i=Number.isFinite(i)?Math.abs(Math.floor(i))%6:0,t=Number.isFinite(t)?Math.max(1,Math.min(12,Math.floor(t))):5;const e=`flowers:${i}:${t}`;if(fn.has(e))return fn.get(e).clone();const n=Un(),s=new Jt;for(let r=0;r<t;r++){const o=r*2.39996+i,a=Math.sqrt(r/t)*.65,c=new Jt;c.position.set(Math.cos(o)*a,0,Math.sin(o)*a),s.add(c);const l=.18+(r*7+i)%4*.03;Be(c,n.stem,[0,l/2,0],.014,l);const h=[n.flowerYellow,n.flowerPink,n.flowerWhite][(r+i)%3];for(let u=0;u<5;u++){const d=u*Math.PI*2/5;Bt(c,h,[Math.cos(d)*.05,l,Math.sin(d)*.05],[.045,.022,.045],6)}Bt(c,n.flowerCenter,[0,l+.015,0],[.027,.023,.027],6)}return Vf(e,s)}function Ba(i=0){i=Math.abs(Math.floor(i))%3;const t=`bush:${i}`;if(fn.has(t))return fn.get(t).clone();const e=Un(),n=new Jt,s=[e.leaves,e.leavesDark,e.leavesLight][i%3];Be(n,e.bark,[0,.16,0],.08,.3),Ye(n,s,[0,.42,0],[.62,.46,.48],.075),Ye(n,s,[-.42,.28,.12],[.38,.34,.35],.075),Ye(n,s,[.42,.34,-.1],[.4,.37,.36],.075),Ye(n,s,[.1,.65,-.13],[.38,.34,.37],.075);for(let r=0;r<4;r++){const o=r*Math.PI/2+i*.29,a=Ye(n,s,[Math.cos(o)*.52,.46+r%2*.1,Math.sin(o)*.42],[.25,.16,.33],.04);a.rotation.y=o}return Vf(t,n)}function Gc(i){let t=i;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function oo(i,t=!1){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d"),s=Gc(i==="grass"?83:193);n.fillStyle=t?"#909090":i==="grass"?"#779c4d":"#b79763",n.fillRect(0,0,512,512);for(let o=0;o<90;o++){const a=s()*512,c=s()*512,l=12+s()*57;n.fillStyle=t?["#858585","#999999","#aaaaaa"][o%3]:i==="grass"?["#92ad56","#4f854a","#bdba67","#6a964d"][o%4]:["#c9ad78","#9c8055","#ddc18e"][o%3],n.globalAlpha=.08;for(const h of[-512,0,512])for(const u of[-512,0,512])n.beginPath(),n.ellipse(a+h,c+u,l,l*.6,0,0,Math.PI*2),n.fill()}for(let o=0;o<7200;o++){const a=s()*512,c=s()*512;n.fillStyle=t?["#777777","#bbbbbb","#dddddd"][o%3]:i==="grass"?["#496f39","#9eb568","#d0c480","#789b4b"][o%4]:["#826b48","#e4c995","#b99a6a"][o%3],n.globalAlpha=.14+s()*.25,n.beginPath(),n.ellipse(a,c,.35+s()*.85,i==="grass"?1.2+s()*3.8:.3+s()*1.4,s()*Math.PI,0,Math.PI*2),n.fill()}n.globalAlpha=1;const r=new Vi(e);return t||(r.colorSpace=De),r.wrapS=r.wrapT=$n,r}function Wf(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.max(0,Math.min(1,((i-e.x)*s+(t-e.z)*r)/(s*s+r*r||1))),a=i-e.x-o*s,c=t-e.z-o*r;return a*a+c*c}function ny(i,t,e,n){return Math.sqrt(Wf(i,t,e,n))}function ka(i,t,e){let n=1/0;for(let s=1;s<e.length;s++)n=Math.min(n,Wf(i,t,e[s-1],e[s]));return Math.sqrt(n)}function iy(i,t="#45684d"){const e=document.createElement("canvas");e.width=512,e.height=128;const n=e.getContext("2d");n.fillStyle="#faf6e9",n.beginPath(),n.roundRect(8,12,496,98,35),n.fill(),n.fillStyle=t,n.font="bold 34px sans-serif",n.textAlign="center",n.fillText(i,256,76);const s=new Vi(e);s.colorSpace=De;const r=new Up(new rf({map:s,depthTest:!1}));return r.scale.set(6,1.5,1),r}class sy{constructor(t){this.renderer=new fv({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Uu,this.renderer.outputColorSpace=De,this.renderer.toneMapping=Fu,this.renderer.toneMappingExposure=1.05,this.scene=new zp,this.scene.background=new Ht("#bdd6df"),this.scene.fog=new rl("#bdd6df",95,195),this.hemisphere=new Sm("#eaf7ff","#536747",1.65),this.scene.add(this.hemisphere),this.skyDay=new Ht("#bdd6df"),this.skyStorm=new Ht("#899da7"),this.sun=new Em("#fff4dc",2.05),this.sun.position.set(-18,35,20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100}),this.sun.shadow.camera.updateProjectionMatrix(),this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.camera=new Po(-30,30,20,-20,.1,180),this.center=new I(-7,0,0),this.targetCenter=this.center.clone(),this.terrain=new Jt,this.actors=new Jt,this.scene.add(this.terrain,this.actors),this.materials=Un(),this.grass=new le({color:"#ffffff",roughness:.96,map:oo("grass"),bumpMap:oo("grass",!0),bumpScale:.12}),this.path=new le({color:"#fff1d3",roughness:.95,map:oo("path"),bumpMap:oo("path",!0),bumpScale:.08,side:Re}),this.pathShoulder=new le({color:"#a99261",roughness:1,transparent:!0,opacity:.36,depthWrite:!1,side:Re}),this.thrusterGlow=new IM;for(const e of[this.grass,this.path,this.pathShoulder])this.thrusterGlow.install(e);this.water=new le({color:"#4b9fae",roughness:.29,metalness:.08,side:Re}),this.targetMat=new nn({color:"#ffe8a0",transparent:!0,opacity:.56,depthWrite:!1,side:Re}),this.fenceParts=[new ne(new zs(.075,.075,.92,10),this.materials.paleWood),new ne(new Fi(1,8,6),this.materials.paleWood),new ne(new wn(1,.105,.085),this.materials.wood)],this.sceneryBatches=[],this.sceneryFrustum=new Ro,this.viewMatrix=new ee,this.animalMeshes=[],this.animalBatches=[],this.helperMeshes=new Map,this.resize(),this.preview=!0,this.particles=[],this.nature=new vM(this.scene),this.waterEffects=new nM(this.scene)}resize(){this.width=innerWidth,this.height=innerHeight,this.renderer.setSize(this.width,this.height,!1),this.aspect=this.width/this.height}place(t,e,n,s=1,r=!1){return t.position.set(e,0,n),t.scale.multiplyScalar(s),t.traverse(o=>{o.userData.treeWidth!==void 0&&(o.userData.treeWidth=GM(s),o.material.userData.treeWidth.value=o.userData.treeWidth)}),r&&t.traverse(o=>{o.isMesh&&(o.userData.ownedGeometry=!0)}),this.terrain.add(t),t}flat(t,e,n,s,r=.02){const o=new ne(t,e);return o.rotation.x=-Math.PI/2,o.position.set(n,r,s),o.receiveShadow=!0,this.terrain.add(o),o}setLevel(t){this.level=t,this.barkEffects=[],this.cutaway?.dispose(),this.cutaway=null,this.gateView?.dispose(),this.gateView?.removeFromParent(),this.stoneView?.dispose(),this.stoneView?.removeFromParent(),this.gateView=this.stoneView=null;const e=new Set,n=new Set;for(const R of[this.terrain,this.actors])R.traverse(w=>{w.userData.ownedGeometry&&e.add(w.geometry),w.userData.ownedMaterial&&n.add(w.material),w.userData.ownedLabel&&(w.material.map.dispose(),n.add(w.material)),w.isInstancedMesh&&w.dispose()});e.forEach(R=>R?.dispose()),n.forEach(R=>R?.dispose()),this.terrain.clear(),this.actors.clear(),this.sceneryBatches=[],this.helperMeshes.clear(),this.animalMeshes=[],this.animalBatches=[],this.particles=[];const s=t.bounds,r=s.maxX-s.minX,o=s.maxZ-s.minZ,a=Gc(t.seed),c=Gc(t.seed^7628133),l=(s.maxX+s.minX)/2,h=(s.maxZ+s.minZ)/2,u=this.flat(new yr(r+90,o+90,1,1),this.grass,l,h,-.035);u.userData.ownedGeometry=!0,this.grass.map.repeat.set((r+90)/15,(o+90)/15),this.grass.bumpMap.repeat.copy(this.grass.map.repeat);for(const R of t.sceneryHills||[]){const w=new ne(new Fi(1,20,12),new le({color:["#799552","#6f914e","#93a75d"][Math.floor(a()*3)],roughness:1}));w.position.set(R.x,-.3,R.z),w.scale.set(R.radius,R.height,R.radius),w.userData.ownedGeometry=w.userData.ownedMaterial=!0,this.terrain.add(w)}const d=(R,w)=>{const U=new ne(R,w);return U.receiveShadow=!0,U.userData.ownedGeometry=!0,this.terrain.add(U),U};for(const R of t.roads)d(so(R.points,R.width+.65,{ragged:!0,y:.003,seed:t.seed+5}),this.pathShoulder),d(so(R.points,R.width,{ragged:!0,y:.007,seed:t.seed}),this.path);const f=[];for(const R of t.rivers){const w=new le({color:"#6c8960",roughness:1,side:Re});this.thrusterGlow.install(w);const U=d(so(R.points,R.width+.8,{y:.002}),w);U.userData.ownedMaterial=!0;const D=d(so(R.points,R.width,{y:.018}),this.water),Z=R.points[0],J=R.points.at(-1);f.push({mesh:D,points:R.points,width:R.width,heading:Math.atan2(J.x-Z.x,J.z-Z.z)});for(const N of R.bridges){const Q=ty(N.width,N.length),Mt=new Map;Q.traverse(xt=>{if(!xt.isMesh)return;const tt=xt.material;Mt.has(tt)||Mt.set(tt,this.thrusterGlow.install(tt.clone())),xt.material=Mt.get(tt),xt.userData.ownedMaterial=!0}),Q.rotation.y=N.heading,this.place(Q,N.x,N.z,1,!0)}}const g=t.target,x=pn(g),m=x.halfLength,p=[];this.goal=d(du(g),this.targetMat),this.goalOutline=d(zM(g),new nn({color:"#fff0b5",side:Re})),this.goalOutline.userData.ownedMaterial=!0,this.goalFloor=null;const M=(R,w,U,D,Z,J)=>{const N=Math.hypot(w.x-R.x,w.z-R.z),Q=new ne(new wn(N,U,D),Z);return Q.position.set((R.x+w.x)/2,U/2,(R.z+w.z)/2),Q.rotation.y=-Math.atan2(w.z-R.z,w.x-R.x),Q.castShadow=Q.receiveShadow=!0,Q.userData.ownedGeometry=!0,Q.userData.coverSide=J,this.terrain.add(Q),Q};for(const R of t.fenceSegments||[]){if(R.material==="stone")continue;const{a:w,b:U,kind:D}=R,Z=Math.hypot(U.x-w.x,U.z-w.z);if(D==="target"&&g.type==="barn"){const J=Math.ceil(Z/3);for(let N=0;N<J;N++){const Q={x:w.x+(U.x-w.x)*N/J,z:w.z+(U.z-w.z)*N/J},Mt={x:w.x+(U.x-w.x)*(N+1)/J,z:w.z+(U.z-w.z)*(N+1)/J},xt=(Q.x+Mt.x)/2-g.x,tt=(Q.z+Mt.z)/2-g.z,B=Math.cos(g.heading||0),W=Math.sin(g.heading||0),nt=xt*B-tt*W,ot=xt*W+tt*B,it=Math.abs(Math.abs(nt)-m)<Math.abs(Math.abs(ot)-m)?nt>=0?"+x":"-x":ot>=0?"+z":"-z";p.push(M(Q,Mt,2.4,.22,this.materials.barn,it));const Tt=M(Q,Mt,.14,.25,this.materials.barnTrim,it);Tt.position.y=2.35,p.push(Tt)}}else if(D==="target"&&g.type==="field"){this.placeFence(w,U);const J=Math.ceil(Z/1.4);for(let N=0;N<J;N++)this.place(Ba(N),w.x+(U.x-w.x)*(N+.5)/J,w.z+(U.z-w.z)*(N+.5)/J,.75)}else this.placeFence(w,U)}if(this.gateView=AM(t.gates),this.stoneView=PM(t.fenceSegments),this.terrain.add(this.gateView,this.stoneView),g.type==="barn"){this.goalFloor=d(du(g,.013),this.path);const R=new Jt,w=g.heading||0,U=Math.ceil(m*2/2.4),D=(m*2+.6)/U;for(const Z of[-1,1])for(let J=0;J<U;J++){const N=new ne(new wn(m+.6,.18,D),this.materials.roof);N.position.set(Z*m/2,3.2,-m-.3+(J+.5)*D),N.rotation.z=-Z*.21,N.castShadow=!0,N.userData.ownedGeometry=!0,N.userData.coverKind="roof",R.add(N),p.push(N)}R.position.set(g.x,0,g.z),R.rotation.y=w,this.terrain.add(R),this.cutaway=new DM(g,p,{halfExtent:m+.3})}const v=iy(g.type==="pen"?"SUNNY PEN":g.type==="barn"?"HOME BARN":"CLOVER FIELD");v.scale.set(4.5,1.125,1),v.position.set(g.x-Math.sin(g.heading||0)*(m+1),3,g.z-Math.cos(g.heading||0)*(m+1)),v.name="Destination introduction",v.userData.ownedLabel=!0,this.destinationSign=v,this.terrain.add(v);for(const R of t.obstacles){const w=R.radius*1.45,U=_u(Math.floor(a()*3),w<1.7?0:w<2.4?1:2);U.rotation.y=c()*Math.PI*2,this.place(U,R.x,R.z,w);for(let D=0;D<4;D++){const Z=D*Math.PI/2;this.place(Ba(D),R.x+Math.cos(Z)*R.radius*.48,R.z+Math.sin(Z)*R.radius*.48,R.radius*.7)}}const _=(R,w,U=0)=>R>s.minX+U&&R<s.maxX-U&&w>s.minZ+U&&w<s.maxZ-U&&!t.rivers.some(D=>ka(R,w,D.points)<D.width/2+U+.5)&&!t.roads.some(D=>ka(R,w,D.points)<D.width/2+U+.35)&&Math.hypot(R-g.x,w-g.z)>g.radius+U+2&&!t.obstacles.some(D=>Math.hypot(R-D.x,w-D.z)<D.radius+U)&&!(t.fenceSegments||[]).some(D=>ny(R,w,D.a,D.b)<U+.7),b=[];let A=0;for(const R of t.roads)for(let w=1;w<R.points.length;w++){const U=R.points[w-1],D=R.points[w],Z=Math.hypot(D.x-U.x,D.z-U.z);Z&&(A+=Z,b.push({a:U,b:D,length:Z,end:A,width:R.width}))}const P=(R,w)=>{if(R<w*.7&&A){const U=(R/(w*.7)+a()/(w*.7))*A,D=b.find(Mt=>Mt.end>=U)||b[b.length-1],Z=(U-D.end+D.length)/D.length,J=(D.b.x-D.a.x)/D.length,N=(D.b.z-D.a.z)/D.length,Q=(D.width/2+1.1+a()*2.8)*(R%2?1:-1);return{x:D.a.x+J*Z*D.length-N*Q,z:D.a.z+N*Z*D.length+J*Q}}return{x:s.minX+2+a()*(r-4),z:s.minZ+2+a()*(o-4)}};this.meadowDetails=[];const F=Math.min(190,Math.ceil(r*o/130));for(let R=0;R<F;R++){const{x:w,z:U}=P(R,F);_(w,U,1)&&(this.place(ey(R,3),w,U,.85+a()*.6),this.meadowDetails.push({x:w,z:U,kind:"flower"}))}const S=[],E=Math.min(650,Math.ceil(r*o/35));for(let R=0;R<E;R++){const{x:w,z:U}=P(R,E);_(w,U,.4)&&(S.push({x:w,z:U}),this.meadowDetails.push({x:w,z:U,kind:"tuft"}))}if(S.length){const R=new ur(.12,.55,3),w=new le({color:"#648844",roughness:1,transparent:!0,opacity:1,depthWrite:!1}),U=new oi(R,w,S.length),D=new we;S.forEach((Z,J)=>{D.position.set(Z.x,.18,Z.z),D.scale.set(.7+a()*.6,.55+a()*.8,.7+a()*.6),D.rotation.y=a()*Math.PI,D.updateMatrix(),U.setMatrixAt(J,D.matrix)}),U.receiveShadow=!0,U.userData.decorativeGrass=!0,U.userData.ownedGeometry=U.userData.ownedMaterial=!0,this.terrain.add(U),this.trackScenery(U)}const L=[];for(const R of t.rivers)for(let w=2;w<R.points.length-2;w+=5){const U=R.points[w],D=R.points[w+1],Z=D.x-U.x,J=D.z-U.z,N=Math.hypot(Z,J)||1;for(const Q of[-1,1]){const Mt=U.x-J/N*(R.width/2+.65)*Q,xt=U.z+Z/N*(R.width/2+.65)*Q;Mt>s.minX&&Mt<s.maxX&&xt>s.minZ&&xt<s.maxZ&&!R.bridges.some(tt=>Math.hypot(Mt-tt.x,xt-tt.z)<tt.length/2+tt.width)&&L.push({x:Mt,z:xt})}}if(L.length){const R=new ur(.18,.95,4),w=new le({color:"#5b7951",roughness:1}),U=new oi(R,w,L.length),D=new we;L.forEach((Z,J)=>{D.position.set(Z.x,.4,Z.z),D.rotation.z=(a()-.5)*.25,D.updateMatrix(),U.setMatrixAt(J,D.matrix)}),U.userData.ownedGeometry=U.userData.ownedMaterial=!0,this.terrain.add(U),this.trackScenery(U)}const G=Math.min(62,28+Math.floor(t.index/3));for(let R=0;R<G;R++){let w,U;const D=R%4;if(D<2?(w=s.minX-12+a()*(r+24),U=D===0?s.minZ-4-a()*17:s.maxZ+4+a()*17):(w=D===2?s.minX-5-a()*18:s.maxX+5+a()*18,U=s.minZ+a()*o),t.rivers.some(N=>ka(w,U,N.points)<N.width/2+3))continue;const Z=1.3+a()*1.8,J=_u(R%3,Z<1.7?0:Z<2.4?1:2);J.rotation.y=c()*Math.PI*2,this.place(J,w,U,Z)}this.bushPlacements=pv(t);for(const R of this.bushPlacements)this.place(Ba(R.variant),R.x,R.z,R.scale);this.nature.setLevel(t),this.waterEffects.setLevel(t,{grassMaterials:[this.grass],pathMaterials:[this.path],waterMaterial:this.water,terrain:this.terrain,rivers:f,weather:this.nature.weather}),this.batchScenery(),this.dog=YM(),this.dog.scale.setScalar(1.35*.75),this.actors.add(this.dog);const k=new ne(new ll(.82,.95,40),new nn({color:"#fff0bb",transparent:!0,opacity:.9,side:Re,depthWrite:!1}));k.scale.setScalar(1/.75),k.rotation.x=-Math.PI/2,k.position.y=.03/.75,k.userData.ownedGeometry=k.userData.ownedMaterial=!0,this.dog.add(k);const q=new mf;q.moveTo(0,1.45),q.lineTo(-.19,1.05),q.lineTo(.19,1.05),q.closePath(),this.goalPointer=new ne(new hl(q),new nn({color:"#be8652",side:Re,depthWrite:!1})),this.goalPointer.scale.setScalar(1/.75),this.goalPointer.rotation.x=Math.PI/2,this.goalPointer.userData.ownedGeometry=this.goalPointer.userData.ownedMaterial=!0,this.dog.add(this.goalPointer);for(const R of t.animals){const w=new we;w.position.set(R.x,0,R.z),w.rotation.y=R.heading??Math.PI/2,w.scale.setScalar(ws(R)),this.animalMeshes.push(w)}for(const R of["sheep","cow"]){const w=t.animals.flatMap((N,Q)=>N.type===R?[Q]:[]);if(!w.length)continue;const U=jM(R),D=[];let Z=0;const J=[];for(const N of U.children){N.geometry.boundingSphere||N.geometry.computeBoundingSphere();const Q=N.geometry.boundingSphere,Mt=N.userData.pivot;if(Z=Math.max(Z,Q.center.length()+Q.radius+(Mt?Math.hypot(...Mt):0)),N.material.userData.cowCoatVariant!==void 0){for(let tt=0;tt<4;tt++){const B=w.filter(nt=>KM(t.seed,t.animals[nt].id??nt)===tt);if(!B.length)continue;const W=new oi(N.geometry,Hf(tt),B.length);W.instanceMatrix.setUsage(ps),W.castShadow=W.receiveShadow=!0,W.frustumCulled=!1,this.actors.add(W),J.push({indices:B,meshes:[W],visibleIndices:[],coatVariant:tt})}continue}const xt=new oi(N.geometry,N.material,w.length);xt.instanceMatrix.setUsage(ps),xt.castShadow=xt.receiveShadow=!0,xt.frustumCulled=!1,xt.userData={...N.userData},this.actors.add(xt),D.push(xt)}this.animalBatches.push({indices:w,meshes:D,radius:Z,visibleIndices:[]},...J.map(N=>({...N,radius:Z})))}this.center.set(t.spawn.x+(this.aspect<.8?2:10),0,t.spawn.z+1),this.time=0,this.update(t,t.dog,0,!0)}placeFence(t,e){const n=Math.hypot(e.x-t.x,e.z-t.z),s=Math.max(1,Math.ceil(n/1.8)),r=new Jt;r.position.set((t.x+e.x)/2,0,(t.z+e.z)/2),r.rotation.y=-Math.atan2(e.z-t.z,e.x-t.x);const o=(a,c,l,h=1,u=1,d=1)=>{const f=this.fenceParts[a].clone();f.position.set(c,l,0),f.scale.set(h,u,d),f.userData.fencePart=!0,r.add(f)};for(let a=0;a<=s;a++){const c=-n/2+a*n/s;o(0,c,.46),o(1,c,.94,.083,.065,.083)}for(let a=0;a<s;a++)for(const c of[.34,.69])o(2,-n/2+(a+.5)*n/s,c,n/s+.03);this.terrain.add(r)}trackScenery(t){const e=t.instanceMatrix.array.slice(),n=new Float32Array(t.count*4),s=new ee,r=new mi;t.geometry.boundingSphere||t.geometry.computeBoundingSphere();for(let a=0;a<t.count;a++)s.fromArray(e,a*16),r.copy(t.geometry.boundingSphere).applyMatrix4(s),n.set([r.center.x,r.center.y,r.center.z,r.radius],a*4);t.instanceMatrix.setUsage(ps),t.frustumCulled=!1;const o=t.geometry.attributes.treeInstanceWidth?.array.slice();this.sceneryBatches.push({batch:t,matrices:e,bounds:n,widths:o})}batchScenery(){this.terrain.updateMatrixWorld(!0);const t=new Map;this.terrain.traverse(n=>{if(!n.isMesh||n.isInstancedMesh||n.userData.ownedGeometry||n.material.transparent)return;const s=`${n.geometry.id}:${n.userData.treeWidth!==void 0?"treeWood":n.material.id}`;t.has(s)||t.set(s,[]),t.get(s).push(n)});for(const n of t.values()){if(n.length<2&&n[0].userData.treeWidth===void 0)continue;const s=n[0],r=s.userData.treeWidth!==void 0,o=r?s.geometry.clone():s.geometry;r&&o.setAttribute("treeInstanceWidth",new Ic(new Float32Array(n.map(c=>c.userData.treeWidth)),1).setUsage(ps));const a=new oi(o,r?Un().treeWood:s.material,n.length);r&&(a.userData.ownedGeometry=!0,a.userData.treeWood=!0),n.forEach((c,l)=>{a.setMatrixAt(l,c.matrixWorld),r&&c.userData.ownedMaterial&&c.material.dispose(),c.parent.remove(c)}),a.castShadow=!!s.userData.fencePart,a.receiveShadow=!0,this.terrain.add(a),this.trackScenery(a)}const e=[];this.terrain.traverse(n=>{n.isGroup&&!n.children.length&&e.push(n)}),e.forEach(n=>n.parent.remove(n))}cullScenery(){this.camera.updateMatrixWorld(!0),this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);const t=this.sceneryFrustum.planes;for(const{batch:e,matrices:n,bounds:s,widths:r}of this.sceneryBatches){let o=0;for(let a=0;a<s.length;a+=4){const c=s[a+3]+2;t.some(l=>l.normal.x*s[a]+l.normal.y*s[a+1]+l.normal.z*s[a+2]+l.constant<-c)||(e.instanceMatrix.array.set(n.subarray(a*4,a*4+16),o*16),r&&(e.geometry.attributes.treeInstanceWidth.array[o]=r[a/4]),o++)}if(e.count=o,e.visible=o>0,e.instanceMatrix.needsUpdate=!0,e.instanceMatrix.clearUpdateRanges(),o&&e.instanceMatrix.addUpdateRange(0,o*16),r){const a=e.geometry.attributes.treeInstanceWidth;a.needsUpdate=!0,a.clearUpdateRanges(),o&&a.addUpdateRange(0,o)}}}updateAnimalBatches(t,e){const n=this.sceneryFrustum.planes,s=new ee,r=new ee,o=new ee;for(const a of this.animalBatches){const c=a.visibleIndices;c.length=0;for(const l of a.indices){const h=this.animalMeshes[l],u=h.position,d=a.radius*Math.max(Math.abs(h.scale.x),Math.abs(h.scale.y),Math.abs(h.scale.z))+3;n.some(f=>f.normal.x*u.x+f.normal.y*u.y+f.normal.z*u.z+f.constant<-d)||c.push(l)}c.forEach((l,h)=>a.meshes.forEach(u=>{if(u.userData.headPart){const m=this.animalMeshes[l].userData,p=u.userData.pivot;s.makeTranslation(p[0],p[1]-(m.graze||0)*u.userData.grazeDrop,p[2]),r.makeRotationX(Md(m,l)),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o);return}if(u.userData.limbIndex===void 0){u.setMatrixAt(h,this.animalMeshes[l].matrix);return}const d=t.animals[l],f=u.userData.limbIndex,g=f===0||f===3?0:Math.PI,x=Math.sin(e*12+l*.8+g)*Math.min(.5,xd(d,this.animalMeshes[l].userData.turnSpeed)*.15);s.makeTranslation(...u.userData.pivot),r.makeRotationX(x),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o)}));for(const l of a.meshes)l.count=c.length,l.visible=c.length>0,l.instanceMatrix.needsUpdate=!0,l.instanceMatrix.clearUpdateRanges(),c.length&&l.instanceMatrix.addUpdateRange(0,c.length*16)}}update(t,e,n,s=!1){this.time+=n,this.preview=s;const r=t.animals.filter(p=>!p.saved);this.destinationSign.material.opacity=s?1:Math.max(0,Math.min(1,1-((t.time||0)-4)/1.2)),this.destinationSign.visible=this.destinationSign.material.opacity>0;const o=r.reduce((p,M)=>({x:p.x+M.x/r.length,z:p.z+M.z/r.length}),{x:0,z:0}),c=(s?this.aspect<.8?50:44:this.aspect<.8?39:36)/2,l=c*this.aspect;let h=s?t.spawn.x+(this.aspect<.8?2:10):e.x*.68+(r.length?o.x:t.target.x)*.32+2,u=s?t.spawn.z+1:e.z*.75+(r.length?o.z:t.target.z)*.25+1;s||(h=Math.max(e.x-l*.45,Math.min(e.x+l*.45,h)),u=Math.max(e.z-4,Math.min(e.z+4,u)));const d=s?Math.min(1,n*.8):Math.min(1,n*3.5);if(this.center.x+=(h-this.center.x)*d,this.center.z+=(u-this.center.z)*d,!s){const p=Math.max(1,l-2.5);this.center.x=Math.max(e.x-p,Math.min(e.x+p,this.center.x))}this.camera.left=-l,this.camera.right=l,this.camera.top=c,this.camera.bottom=-c,this.camera.updateProjectionMatrix(),this.camera.position.set(this.center.x,36,this.center.z+29),this.camera.lookAt(this.center.x,0,this.center.z-2),this.sun.position.set(this.center.x-18,35,this.center.z+20),this.sun.target.position.set(this.center.x,0,this.center.z),this.sun.target.updateMatrixWorld(),this.dog.position.set(e.x,qn(t,e.x,e.z),e.z),this.dog.rotation.y=e.heading??Math.PI/2,this.goalPointer.rotation.set(Math.PI/2,0,0),this.goalPointer.quaternion.premultiply(new Kn().setFromAxisAngle(new I(0,1,0),Math.atan2(t.target.x-e.x,t.target.z-e.z)-this.dog.rotation.y)),this.goalPointer.position.y=.04/.75,this.goalPointer.visible=!s;const f=this.dog.userData.parts,g=Math.floor(this.time*12)/12;bo(this.dog,e,n),gu(this.dog,n),f.tail.rotation.z=Math.sin(g*7)*.3,this.thrusterGlow.update(this.dog,(p,M)=>qn(t,p,M)),t.animals.forEach((p,M)=>{const v=this.animalMeshes[M];v.scale.setScalar(ws(p)),v.position.set(p.x,qn(t,p.x,p.z)+Math.sin(g*12+M)*Math.min(.07,Math.hypot(p.vx,p.vz)*.025),p.z),gd(v,p,n),vd(v,p,t,n),v.rotation.z=Math.sin(g*9+M)*Math.min(.055,Math.hypot(p.vx,p.vz)*.02),v.updateMatrix()}),this.updateBarks(n);for(const p of this.helperMeshes.values())p.visible=!1;for(const p of t.helpers||[]){let M=this.helperMeshes.get(p.type);M||(M=p.type==="drone"?QM():ZM(),p.type==="helper"&&M.scale.setScalar(this.dog.scale.x*(M.userData.suggestedScale??.82)),this.helperMeshes.set(p.type,M),this.actors.add(M)),M.visible=!0,M.position.set(p.x,p.type==="drone"?2+Math.sin(this.time*4)*.18:qn(t,p.x,p.z),p.z),p.type==="drone"?M.userData.parts.propellers.forEach(v=>v.rotation.y=this.time*35):(Number.isFinite(p.heading)&&(M.rotation.y=p.heading),bo(M,{...p,heading:M.rotation.y},n),gu(M,n),M.userData.parts.tail.rotation.z=Math.sin(g*7)*.3,Aa(M,(this.barkEffects||[]).some(v=>v.buddy)))}const x=(t.helpers||[]).some(p=>p.type==="helper")?this.helperMeshes.get("helper"):null;this.thrusterGlow.update(this.dog,(p,M)=>qn(t,p,M),x),Aa(this.dog,(this.barkEffects||[]).some(p=>!p.buddy)),this.gateView?.update(),this.goal.material.opacity=.38+Math.sin(this.time*2)*.09,this.cutaway?.update(this.camera,[e,...t.animals,...(t.helpers||[]).filter(p=>p.type!=="drone")],n),this.nature.update(n,{dog:e,animals:t.animals,camera:this.camera,time:this.time,paused:n<=0});const m=this.nature.weather;this.waterEffects.update(n,{weather:m,movers:[{...e,id:"pip"},...t.animals.map(p=>({...p,id:`flock-${p.id}`})),...(t.helpers||[]).filter(p=>p.type!=="drone").map(p=>({...p,id:`helper-${p.type}`}))],paused:n<=0}),this.sun.intensity=2.05*m.daylight+m.lightningFlash,this.hemisphere.intensity=1.65*m.daylight+m.lightningFlash*.6,this.scene.background.copy(this.skyDay).lerp(this.skyStorm,m.cloudCoverage*.5),this.scene.fog.color.copy(this.scene.background);for(const p of this.particles)p.life-=n,p.mesh.position.addScaledVector(p.velocity,n),p.velocity.y-=n*6,p.mesh.rotation.x+=n*2,p.mesh.scale.setScalar(Math.max(0,p.life)),p.life<=0&&(this.actors.remove(p.mesh),p.mesh.geometry.dispose(),p.mesh.material.dispose());this.particles=this.particles.filter(p=>p.life>0),this.cullScenery(),this.updateAnimalBatches(t,g),this.renderer.render(this.scene,this.camera)}celebrate(t,e){for(let n=0;n<36;n++){const s=new ne(new wn(.12,.12,.05),new nn({color:["#f0b65c","#f8e8ad","#e99585","#80b398"][n%4]}));s.userData.ownedGeometry=s.userData.ownedMaterial=!0,s.position.set(t,1.5,e),this.actors.add(s),this.particles.push({mesh:s,velocity:new I(Math.sin(n*2.4)*3,2+n%5,Math.cos(n*2.4)*3),life:1.8})}}bark(t){t||Aa(this.dog,!0);const e=t?{x:t.x,z:t.z}:{x:this.dog.position.x,z:this.dog.position.z},n=new ne(pu(this.level,e),new nn({color:"#fff6d8",side:Re,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1}));for(n.renderOrder=1,n.userData.ownedGeometry=n.userData.ownedMaterial=!0,this.actors.add(n),this.barkEffects??=[],this.barkEffects.push({mesh:n,origin:e,age:0,buddy:!!t});this.barkEffects.length>4;){const s=this.barkEffects.shift();this.actors.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose()}}updateBarks(t){for(const e of this.barkEffects||[])if(!(t<=0)){if(e.age+=t,e.age>=.6){this.actors.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();continue}pu(this.level,e.origin,1+e.age/.6*6,e.mesh.geometry),e.mesh.material.opacity=.8*(1-e.age/.6)}this.barkEffects=(this.barkEffects||[]).filter(e=>e.age<.6)}drawMap(t,e,n){const s=t.getContext("2d"),r=t.width,o=t.height,a=e.bounds,c=f=>8+(f-a.minX)/(a.maxX-a.minX)*(r-16),l=f=>8+(f-a.minZ)/(a.maxZ-a.minZ)*(o-16);s.fillStyle="#29483a",s.fillRect(0,0,r,o);const h=(f,g,x)=>{s.lineWidth=g,s.strokeStyle=x,s.lineCap="round",s.lineJoin="round",s.beginPath(),f.forEach((m,p)=>p?s.lineTo(c(m.x),l(m.z)):s.moveTo(c(m.x),l(m.z))),s.stroke()},u=Math.min((r-16)/(a.maxX-a.minX),(o-16)/(a.maxZ-a.minZ));for(const f of e.rivers){h(f.points,f.width*u,"#35b9ed");for(const g of f.bridges){const x=Math.sin(g.heading)*g.length/2,m=Math.cos(g.heading)*g.length/2;h([{x:g.x-x,z:g.z-m},{x:g.x+x,z:g.z+m}],Math.max(3,g.width*u),"#dfbd8c")}}for(const f of e.roads)h(f.points,Math.max(1.5,f.width*u),"#f0c777");LM(s,e.target,f=>({x:c(f.x),y:l(f.z)}));for(const f of e.fenceSegments||[])h([f.a,f.b],f.material==="stone"?2:f.kind==="boundary"?1:1.5,f.material==="stone"?"#d5d9c9":"#c0a67b");for(const f of e.gates||[])if(f.operable&&!f.open){const g=Zc(f);h([g.a,g.b],2.5,"#ffad45")}const d=(f,g,x,m,p="#183027")=>{s.fillStyle=m,s.strokeStyle=p,s.lineWidth=1.5,s.beginPath(),s.arc(c(f),l(g),x,0,Math.PI*2),s.fill(),s.stroke()};for(const f of e.animals)d(f.x,f.z,f.type==="cow"?3:2.3,f.saved?"#8be0b4":"#fff8e7");d(n.x,n.z,4.8,"#ffd166"),s.strokeStyle="#ffe6a3",s.lineWidth=2,s.beginPath(),s.arc(c(n.x),l(n.z),7,0,Math.PI*2),s.stroke();for(const f of e.helpers||[])d(f.x,f.z,3,"#45d9ef","#102c39")}}class ry{constructor(){this.context=null,this.master=null,this.music=null,this.effects=null,this.ambience=null,this.ambientSources=new Set,this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1,this.noiseBuffer=null,this.thunderSource=null,this.thunderEvent=null,this.weatherState=null,this.birdCountdown=4+Math.random()*6,this.muted=!1,this.paused=!1,this.timer=null,this.step=0,this.nextNoteTime=0,this.active=new Set,this.disposed=!1,this.activationGeneration=0,this.tempo=106}async start(){if(this.disposed)return!1;const t=++this.activationGeneration;try{if(!this.context){const n=globalThis.AudioContext||globalThis.webkitAudioContext;if(!n)return!1;this.context=new n,this.master=this.context.createGain(),this.music=this.context.createGain(),this.effects=this.context.createGain(),this.ambience=this.context.createGain(),this.master.gain.value=this.muted?0:.975,this.music.gain.value=.42,this.effects.gain.value=.6,this.ambience.gain.value=.38,this.music.connect(this.master),this.effects.connect(this.master),this.ambience.connect(this.master),this.master.connect(this.context.destination)}const e=this.context;return await e.resume(),this.disposed||t!==this.activationGeneration||this.context!==e?!1:(this.paused=!1,this.music.gain.cancelScheduledValues(this.context.currentTime),this.music.gain.setTargetAtTime(.42,this.context.currentTime,.025),this._begin(),!0)}catch{return!1}}setMuted(t){if(this.muted=!!t,this.muted&&this._stopAmbience(),!this.context||!this.master)return;const e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(this.muted?0:.975,e,.025)}pause(){this.activationGeneration++,this.paused=!0,this._stopScheduler(),this._stopAmbience(),this.context&&this.context.state!=="closed"&&this.music.gain.setTargetAtTime(1e-4,this.context.currentTime,.025)}async resume(){return this.start()}_begin(){this.timer||this.paused||this.disposed||(this.nextNoteTime=this.context.currentTime+.06,this._schedule(),this.timer=globalThis.setInterval(()=>this._schedule(),100))}_stopScheduler(){this.timer!==null&&globalThis.clearInterval(this.timer),this.timer=null}_schedule(){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;const t=60/this.tempo/2;if(!Number.isFinite(t)||t<=0)return;const e=this.context.currentTime;if(this.nextNoteTime<e){const n=Math.ceil((e-this.nextNoteTime)/t);this.step=(this.step+n)%128,this.nextNoteTime=Math.max(e,this.nextNoteTime+n*t)}for(let n=0;n<8&&this.nextNoteTime<e+.25;n++)this._musicStep(this.step,this.nextNoteTime,t),this.step=(this.step+1)%128,this.nextNoteTime+=t}_musicStep(t,e,n){const s=[48,53,48,55,57,53,55,48],r=[[72,76,79,null,76,74,72,null],[77,81,79,null,77,76,74,null],[72,76,79,81,79,null,76,null],[74,79,83,null,81,79,74,null],[76,81,84,null,83,81,79,null],[77,null,81,79,77,76,74,null],[74,77,79,null,83,81,79,74],[76,74,72,null,79,null,72,null]],o=Math.floor(t/16),a=t%16,c=s[o],l=o===4;if(a%4===0&&this._note(c+(a===8?7:0),e,.32,.15,"bass",this.music),a%4===2&&(this._note(c+12,e,.22,.048,"pluck",this.music),this._note(c+(l?15:16),e+.018,.22,.042,"pluck",this.music),this._note(c+19,e+.035,.22,.036,"pluck",this.music)),a%2===0){const h=r[o][a/2];h!==null&&this._note(h,e,n*1.5,.12,o%2?"flute":"marimba",this.music)}}updateAmbience(t,e={}){const n=e.weather||"sun",s=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed;if(this._updateThunder(typeof n=="object"?n:null,s),!s)return;const r=typeof n=="string"?n:n.type||"sun",o=typeof n=="object"&&Number.isFinite(n.intensity)?Math.max(0,Math.min(1,n.intensity)):.3,a=["rain","light-rain","heavy-rain","storm"].includes(r)?"rain":r==="wind"?"wind":"sun",c=typeof n=="object"?n.storm?"storm":n.kind||r:r,l=c==="storm"?1:c==="heavy-rain"?.85:.5;this._weather(a,o,l),this.birdCountdown-=Number.isFinite(t)?Math.max(0,Math.min(t,.25)):0,!(this.birdCountdown>0)&&(this.birdCountdown=a==="rain"?10+Math.random()*10:4+Math.random()*6,!(typeof n=="object"&&(n.storm||n.kind==="storm")||r==="storm"||a==="rain"&&o>=.7)&&this._chirp(a==="rain"?.018:.03))}_noise(){if(!this.noiseBuffer){const t=this.context;this.noiseBuffer=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const e=this.noiseBuffer.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1}return this.noiseBuffer}_updateThunder(t,e){t!==this.weatherState&&(this.thunderSource&&this._releaseAmbience(this.thunderSource),this.thunderSource=null,this.thunderEvent=null,this.weatherState=t,this._restoreMusicMix());const n=t?.lightningId;if(!n||n===this.thunderEvent)return;this.thunderEvent=n;const s=t.lightningAge,r=t.thunderDelay;if(!e||!Number.isFinite(s)||!Number.isFinite(r)||s<0||r<0||s>r+.2)return;this.thunderSource&&this._releaseAmbience(this.thunderSource);const o=this.context,a=o.createBufferSource(),c=o.createBiquadFilter(),l=o.createGain(),h=o.currentTime+Math.max(.01,r-s),u=3+Math.random()*2;a.buffer=this._noise(),a.loop=!0,c.type="lowpass",c.Q.value=.35,c.frequency.setValueAtTime(400,h),c.frequency.exponentialRampToValueAtTime(85,h+u*.65),l.gain.setValueAtTime(1e-4,h),l.gain.exponentialRampToValueAtTime(.65,h+.12),l.gain.exponentialRampToValueAtTime(.32,h+u*.23),l.gain.exponentialRampToValueAtTime(.035,h+u*.56),l.gain.exponentialRampToValueAtTime(1e-4,h+u*.76),a.connect(c),c.connect(l),l.connect(this.effects);const d=[];for(const[g,x]of[[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]){const m=o.createDelay(1.2),p=o.createGain();m.delayTime.value=u*g,p.gain.value=x,l.connect(m),m.connect(p),p.connect(this.effects),d.push(m,p)}this.music.gain.cancelScheduledValues(o.currentTime),this.music.gain.setValueAtTime(.42,o.currentTime),this.music.gain.setTargetAtTime(.16,h,.04),this.music.gain.setTargetAtTime(.42,h+u*.72,.35),this._trackAmbience(a,[c,l,...d]),this.thunderSource=a;const f=a.onended;a.onended=()=>{f(),this.thunderSource===a&&(this.thunderSource=null)},a.start(h),a.stop(h+u)}_chirp(t){const e=this.context.currentTime+.015,n=1600+Math.random()*1100,s=2+Math.floor(Math.random()*2);for(let r=0;r<s;r++){const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r*(.14+Math.random()*.035);o.type="sine",o.frequency.setValueAtTime(n*(1+r*.1),c),o.frequency.exponentialRampToValueAtTime(n*(r%2?.9:1.28),c+.07),o.frequency.exponentialRampToValueAtTime(n*.95,c+.13),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(t,c+.025),a.gain.exponentialRampToValueAtTime(1e-4,c+.15),o.connect(a),a.connect(this.ambience),this._trackAmbience(o,[a]),o.start(c),o.stop(c+.17)}}_trackAmbience(t,e){this.active.add(t),this.ambientSources.add(t),t.onended=()=>{t.disconnect();for(const n of e)n.disconnect();this.active.delete(t),this.ambientSources.delete(t)}}_weather(t,e,n=1){if(this.weatherKind!==t&&(this._stopWeather(),this.weatherKind=t,t!=="sun")){const s=this.context;this._noise();const r=s.createBufferSource(),o=s.createBiquadFilter(),a=s.createGain();r.buffer=this.noiseBuffer,r.loop=!0,o.type="lowpass",o.frequency.value=t==="rain"?2200:500,o.Q.value=.3,a.gain.value=1e-4,r.connect(o),o.connect(a),a.connect(this.ambience),this._trackAmbience(r,[o,a]),this.weatherSource={source:r,gain:a,filter:o},r.start()}if(this.weatherSource){const s=(t==="rain"?.032*n:.024)*e;Math.abs(s-this.weatherVolume)>.001&&(this.weatherSource.gain.gain.setTargetAtTime(s,this.context.currentTime,.8),this.weatherVolume=s)}}_stopWeather(){this.weatherSource&&this._releaseAmbience(this.weatherSource.source),this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1}_releaseAmbience(t){try{t.stop()}catch{}t.onended?.(),t.onended=null}_restoreMusicMix(){if(!this.context||!this.music||this.context.state==="closed")return;const t=this.context.currentTime;this.music.gain.cancelScheduledValues(t),this.music.gain.setTargetAtTime(this.paused?1e-4:.42,t,.025)}_stopAmbience(){this._restoreMusicMix(),this._stopWeather(),this.thunderSource=null;for(const t of[...this.ambientSources])this._releaseAmbience(t);this.birdCountdown=4+Math.random()*6}_note(t,e,n,s,r="marimba",o=this.effects){if(!this.context||!o||this.disposed)return;const a=this.context,c=a.createOscillator(),l=a.createGain(),h=440*2**((t-69)/12);c.type=r==="pluck"?"triangle":"sine",c.frequency.setValueAtTime(h,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(.001,s),e+(r==="flute"?.035:.009)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l),l.connect(o),this.active.add(c),c.onended=()=>{c.disconnect(),l.disconnect(),this.active.delete(c)},c.start(e),c.stop(e+n+.03),r==="marimba"&&this._note(t+19,e,n*.35,s*.12,"partial",o)}play(t){if(!this.context||this.context.state!=="running"||this.muted||this.disposed)return;const e=this.context.currentTime+.01;if(t==="bark"){[0,.14].forEach(r=>{const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r;o.type="triangle",o.frequency.setValueAtTime(330,c),o.frequency.exponentialRampToValueAtTime(110,c+.095),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(.11,c+.012),a.gain.exponentialRampToValueAtTime(1e-4,c+.1),o.connect(a),a.connect(this.effects),this.active.add(o),o.onended=()=>{o.disconnect(),a.disconnect(),this.active.delete(o)},o.start(c),o.stop(c+.12)});return}const s={saved:[79,84],animal:[79,84],rescue:[79,84],purchase:[72,76,79,84],unlock:[72,76,79,84],completed:[72,76,79,84,79,84],complete:[72,76,79,84,79,84],win:[72,76,79,84,79,84],click:[79]}[t];s&&s.forEach((r,o)=>this._note(r,e+o*.115,.28,.16,"marimba"))}dispose(){if(!this.disposed){this.activationGeneration++,this.disposed=!0,this._stopScheduler(),this._stopAmbience();for(const t of this.active){try{t.stop()}catch{}t.disconnect()}this.active.clear(),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{}),this.context=null,this.master=this.music=this.effects=this.ambience=null,this.noiseBuffer=null}}}const mt=i=>document.getElementById(i);let sn,Vt,ci,ie=Zv(),kt="intro",Di="playing",Mu=performance.now(),dn=0,yl=0,xr=0,An=0,Uo=!1,Sl=0,_r=!1,yu,wl=null;const Ve=new ry,In={x:0,z:0},vn=new Set,oy=md({document,getState:()=>({level:Vt,dog:ci,playing:kt==="playing"}),onOpen:()=>bl("Gate open — guide the flock through.")}),Ce=(i,t)=>mt(i).classList.toggle("hidden",!t);let Eo=!1;const No=()=>{Eo||$v(ie)||bl("Progress is kept for this session; browser storage is unavailable.")},Su=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function bl(i){mt("toast").textContent=i,Ce("toast",!0),clearTimeout(yu),yu=setTimeout(()=>Ce("toast",!1),2800)}function Hi(){mt("points").textContent=ie.points,mt("sound").textContent=ie.music?"♫":"♪",mt("sound").setAttribute("aria-label",ie.music?"Mute sound":"Enable sound"),mt("sound").style.opacity=ie.music?"1":".55",mt("menu-sound")&&(mt("menu-sound").textContent=`Sound: ${ie.music?"On":"Off"}`,mt("menu-sound").setAttribute("aria-pressed",String(ie.music)))}async function Xf(){ie.music=!ie.music,Ve.setMuted(!ie.music),No(),Hi(),ie.music&&(await Ve.start(),(kt!=="playing"||!ie.music)&&Ve.pause())}function El(i){const t=i<xr;mt("bark").classList.toggle("cooldown",t),mt("bark").disabled=t,mt("bark").style.setProperty("--bark-progress",String(Math.max(0,Math.min(1,1-(xr-i)/2100))))}function qf(i=!1,t=0){Ce("countdown",i),mt("countdown").textContent=i?`${Math.ceil(t)}s`:"",mt("countdown").setAttribute("aria-label",i?`${Math.ceil(t)} seconds remaining to deliver the flock`:"Delivery countdown has not started"),mt("countdown").classList.toggle("running",i),mt("countdown").classList.toggle("urgent",i&&t<=10)}function Ds(){In.x=In.z=0,fi=null,vn.clear(),mt("stick").style.transform="translate(0,0)"}function Fo(){const i=Math.max(0,Math.min(1,dn/3)),t=Math.max(0,Math.min(1,dn/.65,(3-dn)/1.2));mt("level-introduction").style.opacity=String(t),mt("level-introduction").style.setProperty("--level-scale",String(.72+.48*(1-(1-i)**2))),Ce("level-introduction",kt==="playing"&&dn<3)}async function Bi(i=ie.highestLevel){i=Math.max(0,Math.min(99,Math.floor(Number(i)||0))),Ii(!1),Vt=Pu(i),ci={...Vt.dog,heading:Vt.dog.heading??Math.atan2(Vt.spawn.x-Vt.dog.x,Vt.spawn.z-Vt.dog.z)},dn=0,An=0,Uo=!1,yl=xr=0,Ds(),sn.setLevel(Vt),kt="playing",document.body.classList.toggle("in-game",!0),El(performance.now());for(const t of["intro","scene-tag"])Ce(t,!1);for(const t of["mission","controls","map-box"])Ce(t,!0);mt("level-number").textContent=`Level ${i+1}`,Fo(),mt("mission").setAttribute("aria-label",`Level ${i+1} · Livestock delivery status`),mt("total").textContent=Vt.animals.length,mt("saved").textContent=0,qf(),_r=!1,Ce("toggle-tip",!1),mt("toggle-tip").setAttribute("aria-expanded","false"),Ce("tip",!0),To(Tl(i)[0]),Ve.setMuted(!ie.music),await Ve.start(),(kt!=="playing"||!ie.music)&&Ve.pause(),Hi()}const ay=14;function Tl(i){return i===0?["Drag to move Pip.","Move behind the flock to guide it.","Double-tap to woof."]:[Vt.routes.length>1?"Choose a trail on the map.":"Gather stragglers before crossing."]}function Al(){Uo=!0,_r=!1,Ce("tip",!1),Ce("toggle-tip",!0),mt("toggle-tip").setAttribute("aria-expanded","false"),mt("toggle-tip").setAttribute("aria-label","Show tips")}function To(i){Sl=dn,mt("tip-text").textContent=i,mt("tip").querySelector(".tip-number").textContent=`0${An+1}`}function Oo(){kt!=="playing"||performance.now()<xr||(yl=performance.now()+650,xr=performance.now()+2100,El(performance.now()),Ve.play("bark"),sn.bark(),navigator.vibrate&&navigator.vibrate(20))}function Bo(i,t="paused"){Di=kt==="playing"?"playing":kt==="complete"?"complete":"intro",kt=t,Fo(),Ds(),Ve.pause(),mt("modal").classList.contains("hidden")&&(wl=document.activeElement),mt("modal-card").innerHTML=i,Ce("modal",!0),Ce("controls",!1),setTimeout(()=>mt("modal-card").querySelector("button")?.focus(),30)}function Ii(i=!0){Ce("modal",!1),i&&(kt=Di,Ce("controls",kt==="playing"),kt==="playing"&&Ve.resume(),wl?.focus()),Fo(),Ds()}function Us(){if(kt==="reset-confirm"){mt("cancel-reset").onclick();return}if(kt==="shop"){mt("shop-back").onclick();return}if(kt==="paused"){Ii();return}kt!=="complete"&&(Bo(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${kt==="intro"?"Hello, shepherd.":"Paws for a moment."}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${kt==="intro"?"Back to the meadow":"Keep herding"} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${ie.points} bolts</button>${kt==="playing"?'<button class="secondary" id="restart">Restart this meadow</button>':""}<button class="secondary" id="menu-sound" aria-pressed="${ie.music}">Sound: ${ie.music?"On":"Off"}</button><button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,ie.highestLevel+1)},(i,t)=>`<button class="${t===Vt.index?"current":""}" data-level="${t}" aria-label="Play level ${t+1}">${t+1}</button>`).join("")}</div>`),mt("close").onclick=()=>Ii(),mt("resume").onclick=()=>Ii(),mt("menu-sound").onclick=Xf,mt("upgrades-menu").onclick=ko,mt("restart-game-menu").onclick=Yf,mt("restart")&&(mt("restart").onclick=()=>Bi(Vt.index)),mt("modal-card").querySelectorAll("[data-level]").forEach(i=>i.onclick=()=>Bi(Number(i.dataset.level))))}function Yf(){const i=kt,t=Di,e=()=>{kt=i,Di=t,i==="paused"?(kt=t,Us(),mt("restart-game-menu").focus()):(Ii(!1),wl?.focus())};Bo('<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>',"reset-confirm"),mt("close").onclick=e,mt("cancel-reset").onclick=e,mt("confirm-reset").onclick=async()=>{ie={...gr(),music:ie.music},rr=0,js=-1/0,Ei=null,No(),Hi(),await Bi(0),kt==="playing"&&mt("pause").focus()}}function ko(){const i=kt==="complete"?"complete":kt==="paused"||kt==="shop"?Di:kt,t=Eo?Vt.index+1:void 0,e=Cf(ie.upgrades,Vt.index+1);Bo(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${ie.points} bolts</strong> to spend.</p><div class="upgrade-grid">${Io.filter(s=>s.id!=="drone").map(s=>{const r=Jn(ie.upgrades,s.id),o=Jn(e,s.id),a=Mv(ie,s.id,t),c=fl(ie.upgrades,s.id),l=a.reason==="locked",h=l?`Next tier unlocks at level ${a.unlockLevel}`:c===null?"All tiers owned":s.tierDescriptions[r],u=r>o?`<small class="inactive-upgrade">${o?"Next owned tier activates":"Equipped"} from level ${s.unlockLevels[o]}</small>`:"";return`<article class="upgrade ${l?"locked":""}"><div class="upgrade-icon">${{speed:"ϟ",flock:"⌁",drone:"✥",helper:"♧",bark:"♪",cohesion:"❋"}[s.id]}</div><div><h3>${Su(s.name)} <small style="font-size:9px;color:#839277">${r}/3</small></h3><p>${Su(h)}</p>${u}</div><button data-buy="${s.id}" ${a.available?"":"disabled"}>${c===null?"Max tier":l?`Level ${a.unlockLevel}`:`${c} ✦`}</button></article>`}).join("")}</div><button class="primary" id="shop-back">${i==="complete"?"Back to your reward":"Back to the meadow"} <span>➜</span></button>`,"shop"),Di=i;const n=()=>{i==="complete"?Rl(!1):Ii()};mt("close").onclick=n,mt("shop-back").onclick=n,mt("modal-card").querySelectorAll("[data-buy]").forEach(s=>s.onclick=()=>{const r=yv(ie,s.dataset.buy,t);r.ok&&(Ve.play("purchase"),No(),Hi(),ko(),Di=i,bl(`${r.upgrade.tierNames[r.level-1]} equipped!`))})}let rr=0;function Rl(i=!0){i&&(rr=Yv(ie,Vt),No(),Hi(),Ve.play("completed"),sn.celebrate(Vt.target.x,Vt.target.z)),kt="complete";const t=Vt.result?.saved??Vt.animals.filter(s=>s.saved).length,e=Vt.animals.length,n=Vt.result?.score??0;Bo(`<div class="complete-seal">✦</div><div class="eyebrow">${t===e?"A GOOD DAY’S HERDING":"DELIVERY TIME IS UP"}</div><h2>${t===e?"Everyone’s home.":t>0?"A flock brought home.":"Try this meadow again."}</h2><p>${t} / ${e} robots delivered.<br>Score ${n} / ${Vt.reward} · Best ${ie.bestScores[Vt.index]||0} / ${Vt.reward}<br>${Math.floor(dn/60)}m ${Math.floor(dn%60)}s in the countryside.</p><div class="reward">+${rr}<span style="font-size:20px"> ✦</span></div><p>${rr?"Bolts earned from your improved delivery score.":"No extra bolts this time. Deliver more robots to improve your best score."}${t>0&&t<e?" The next meadow is open.":""}</p><button class="primary" id="next">${t===0?"Try again":Vt.index>=99?"Return to the first meadow":"Next meadow"} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,"complete"),mt("next").onclick=()=>Bi(t===0?Vt.index:Vt.index>=99?0:Vt.index+1),mt("reward-shop").onclick=ko,mt("replay").onclick=()=>Bi(Vt.index)}let fi=null,Vc={x:0,y:0},js=-1/0,Ei=null,Cl=!1;function cy(i){kt!=="playing"||fi!==null||i.isPrimary===!1||i.target.closest("button,header,.map-box,.tip")||i.target!==mt("world")&&!i.target.closest("#joystick")||(i.preventDefault(),fi=i.pointerId,Vc={x:i.clientX,y:i.clientY},Cl=!1,i.target.setPointerCapture?.(fi))}function ly(i){if(i.pointerId!==fi)return;const t=i.clientX-Vc.x,e=i.clientY-Vc.y,n=Math.hypot(t,e),s=42;Cl||=n>9,In.x=t/Math.max(s,n),In.z=e/Math.max(s,n),mt("stick").style.transform=`translate(${In.x*s}px,${In.z*s}px)`}function Pl(i){if(i.pointerId===fi){if(i.preventDefault(),i.type==="pointerup"&&!Cl){const t=performance.now();Ei&&Math.hypot(i.clientX-Ei.x,i.clientY-Ei.y)<42&&t-js<330?(Oo(),js=-1/0,Ei=null):(js=t,Ei={x:i.clientX,y:i.clientY})}else js=-1/0,Ei=null;fi=null,In.x=In.z=0,mt("stick").style.transform="translate(0,0)"}}document.addEventListener("pointerdown",cy,{passive:!1});document.addEventListener("pointermove",ly,{passive:!1});document.addEventListener("pointerup",Pl,{passive:!1});document.addEventListener("pointercancel",Pl,{passive:!1});document.addEventListener("lostpointercapture",Pl,{passive:!1});const Dl=i=>i===mt("world")||!!i.closest("#controls");document.addEventListener("touchstart",i=>{kt==="playing"&&Dl(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("touchend",i=>{kt==="playing"&&Dl(i.target)&&(i.preventDefault(),i.target.closest("#bark")&&Oo())},{passive:!1});document.addEventListener("gesturestart",i=>{kt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("gesturechange",i=>{kt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("dblclick",i=>{kt==="playing"&&Dl(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("keydown",i=>{if(kt==="playing"&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","w","a","s","d","W","A","S","D"].includes(i.key)&&!i.target.closest('input,textarea,[contenteditable="true"]')&&!(i.key===" "&&i.target.closest("button"))&&(i.preventDefault(),vn.add(i.key.toLowerCase()),i.key===" "&&Oo()),i.key==="Escape"&&(i.preventDefault(),Us()),i.key==="Tab"&&!mt("modal").classList.contains("hidden")){const t=[...mt("modal-card").querySelectorAll("button:not([disabled])")],e=t[0],n=t.at(-1);i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())}});document.addEventListener("keyup",i=>vn.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{Ds(),fi=null,kt==="playing"&&Us()});document.addEventListener("visibilitychange",()=>{document.hidden&&kt==="playing"&&Us()});window.addEventListener("resize",()=>sn?.resize());mt("play").onclick=()=>Bi();mt("restart-game-main").onclick=Yf;mt("bark").onclick=Oo;mt("pause").onclick=Us;mt("home").onclick=i=>{i.preventDefault(),Us()};mt("wallet").onclick=ko;mt("sound").onclick=Xf;mt("dismiss-tip").onclick=Al;mt("toggle-tip").onclick=()=>{if(kt==="playing"){if(!mt("tip").classList.contains("hidden")){Al();return}Uo=!1,_r=!0,An=0,Sl=dn,To(Tl(Vt.index)[0]),Ce("tip",!0),mt("toggle-tip").setAttribute("aria-expanded","true"),mt("toggle-tip").setAttribute("aria-label","Hide tips")}};let Ga=0,Zf;function $f(i){requestAnimationFrame($f);const t=Math.min((i-Mu)/1e3,.05);if(Mu=i,!sn||!Vt)return;if(kt==="playing"){dn+=t;const n=vn.has("arrowright")||vn.has("d")?1:vn.has("arrowleft")||vn.has("a")?-1:In.x,s=vn.has("arrowdown")||vn.has("s")?1:vn.has("arrowup")||vn.has("w")?-1:In.z,r=Xv(Vt,ci,{x:n,z:s,bark:i<yl},t,ie.upgrades);mt("saved").textContent=r.saved,qf(r.countdownStarted,r.remaining);for(const o of r.events)o.type==="animalSaved"?Ve.play("saved"):o.type==="buddyBark"&&(Ve.play("bark"),sn.bark(o));if(El(i),!Uo){const o=_r||Vt.index!==0||An>0?ay:5;if(dn-Sl>=o){const a=Tl(Vt.index);_r?(An=(An+1)%a.length,To(a[An])):An+1<a.length?(An++,To(a[An])):Al()}}r.justCompleted&&Rl()}else kt==="complete"&&!document.hidden&&Wv(Vt,t);Fo(),oy.update(),sn.update(Vt,ci,!document.hidden&&(kt==="playing"||kt==="intro"||kt==="complete")?t:0,kt==="intro"),Zf?.();const e=sn.nature?.weather||Vt.weather;if(e){const[n,s]={sun:["☀","Clear skies"],wind:["↝","Breezy"],rain:["☂","Light rain"],"heavy-rain":["☂","Heavy rain"],storm:["ϟ","Thunderstorm"]}[e.kind||e.type||e]||["☀","Clear skies"];mt("weather-status").textContent=n,mt("weather-status").setAttribute("title",s),mt("weather-status").setAttribute("aria-label",s)}kt==="playing"&&Ve.updateAmbience?.(t,{weather:sn.nature?.weather||Vt.weather||"sun",level:Vt.index+1,time:Vt.time,dog:ci,animals:Vt.animals}),Ga+=t,Ga>.1&&(Ga=0,sn.drawMap(mt("map"),Vt,ci))}try{sn=new sy(mt("world")),Vt=Pu(0),ci={...Vt.dog,heading:Math.PI/2},sn.setLevel(Vt),Hi(),Ce("loading",!1),requestAnimationFrame($f)}catch(i){Ce("loading",!1),Ce("error",!0),mt("error-message").textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${i.message}`,console.error(i)}sd(async()=>{const{installQA:i}=await import("./qa-Cbc0RiwU.js");return{installQA:i}},__vite__mapDeps([0,1]),import.meta.url).then(({installQA:i})=>{const t=()=>{kt="qa",Ds(),Ve.pause(),Ii(!1),Ce("controls",!1)},e=async s=>{const r=Bi(s);t(),await r,t()},n=i({getRenderer:()=>sn,getMode:()=>kt,getState:()=>({level:Vt,dog:ci,profile:ie,elapsed:dn}),enterSession:async()=>{Eo||(Eo=!0,ie=gr(),await e(0))},pause:t,isPaused:()=>kt==="qa",resume:()=>{if(Vt.completed){Rl(!1);return}kt="playing",Ds(),Ce("controls",!0),Ve.resume()},jump:e,resetSession:async()=>{ie=gr(),rr=0,await e(0)},canOccupy:ae,updateWallet:Hi});Zf=()=>n.update()});export{Ne as a};
