const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qa-DVLjLgB8.js","./qa-CukBW1sj.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const ru="modulepreload",au=function(i,t){return new URL(i,t).href},vc={},ou=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");s=l(e.map(h=>{if(h=au(h,n),h in vc)return;vc[h]=!0;const u=h.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(n)for(let x=a.length-1;x>=0;x--){const g=a[x];if(g.href===h&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${p}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":ru,u||(d.as="script"),d.crossOrigin="",d.href=h,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((x,g)=>{d.addEventListener("load",x),d.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})},za=(i,t,e)=>Math.max(t,Math.min(e,i)),me=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Io=(i,t)=>{const e=Math.hypot(i,t);return e>1e-8?{x:i/e,z:t/e}:{x:0,z:0}};function cu(i){let t=i>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function Uo(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=za(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return{x:t.x+n*r,z:t.z+s*r,t:r}}function cn(i,t,e){return me(i,Uo(i,t,e))}const dn=i=>({x:Math.sin(i),z:Math.cos(i)});function Vl(i,t){const e=dn(i.heading),n=t.x-i.x,s=t.z-i.z;return{forward:n*e.x+s*e.z,lateral:n*e.z-s*e.x}}function Qi(i,t,e){const n=dn(i.heading);return{x:i.x+n.x*t+n.z*e,z:i.z+n.z*t-n.x*e}}function zn(i){const t=i.radius+1.4,e=t,n=dn(i.heading),s={x:n.z,z:-n.x};return{x:i.x,z:i.z,heading:i.heading,halfLength:t,halfWidth:e,openingWidth:7,forward:n,side:s,corners:[[-t,-e],[t,-e],[t,e],[-t,e]].map(([r,a])=>Qi(i,r,a)),entrance:Qi(i,-t,0)}}function Hl(i,t,e=0){const n=zn(i),s=Vl(i,t),r=Math.max(0,e);return Math.abs(s.forward)<=n.halfLength-r&&Math.abs(s.lateral)<=n.halfWidth-r}function No(i,t,e){const n=dn(i.heading),s=t.x-i.x,r=t.z-i.z;return Math.abs(s*n.x+r*n.z)<=i.length/2+e&&Math.abs(s*n.z-r*n.x)<=i.width/2-e}const yc=new WeakMap;function Wl(i){let t=yc.get(i);if(t)return t;const e=dn(i.heading),n={x:e.z,z:-e.x},s=(c,l)=>({x:i.x+e.x*c+n.x*l,z:i.z+e.z*c+n.z*l}),r=[-1,1].map(c=>({a:s(-i.length/2-.1,c*i.width/2),b:s(i.length/2+.1,c*i.width/2),radius:.05,posts:Array.from({length:4},(l,h)=>s(-i.length/2+h*i.length/3,c*i.width/2))})),a=r.flatMap(c=>[c.a,c.b]),o={minX:Math.min(...a.map(c=>c.x)),maxX:Math.max(...a.map(c=>c.x)),minZ:Math.min(...a.map(c=>c.z)),maxZ:Math.max(...a.map(c=>c.z))};return t={rails:r,bounds:o},yc.set(i,t),t}function lu(i,t,e){const{rails:n,bounds:s}=Wl(i),r=e+.065;return t.x<s.minX-r||t.x>s.maxX+r||t.z<s.minZ-r||t.z>s.maxZ+r?!1:n.some(a=>cn(t,a.a,a.b)<e+a.radius||a.posts.some(o=>me(t,o)<e+.065))}function Xl(i,t,e,n){const{rails:s,bounds:r}=Wl(i),a=n+.065;return Math.max(t.x,e.x)<r.minX-a||Math.min(t.x,e.x)>r.maxX+a||Math.max(t.z,e.z)<r.minZ-a||Math.min(t.z,e.z)>r.maxZ+a?!1:s.some(o=>Yl(t,e,o.a,o.b,n+o.radius)||o.posts.some(c=>cn(c,t,e)<n+.065))}function hu(i,t,e=4){const n=i.points,s=n[0],r=n.at(-1),a=Math.abs(r.x-s.x)>Math.abs(r.z-s.z)?"x":"z",o=n[1][a]-s[a],c=Math.floor((t[a]-s[a])/o),l=Math.ceil(e/Math.abs(o))+2,h=[];for(let u=Math.max(0,c-l);u<Math.min(n.length-1,c+l+1);u++)h.push([n[u],n[u+1]]);return h}const Sc=new WeakMap;function ql(i){let t=Sc.get(i);return t||(t={minX:Math.min(...i.points.map(e=>e.x)),maxX:Math.max(...i.points.map(e=>e.x)),minZ:Math.min(...i.points.map(e=>e.z)),maxZ:Math.max(...i.points.map(e=>e.z))},Sc.set(i,t)),t}function zo(i,t,e){const n=ql(i),s=i.width/2+e;return t.x<n.minX-s||t.x>n.maxX+s||t.z<n.minZ-s||t.z>n.maxZ+s?!1:hu(i,t,s).some(([r,a])=>cn(t,r,a)<s)}function uu(i,t,e,n){const s=ql(i),r=i.width/2+n;return Math.max(t.x,e.x)>=s.minX-r&&Math.min(t.x,e.x)<=s.maxX+r&&Math.max(t.z,e.z)>=s.minZ-r&&Math.min(t.z,e.z)<=s.maxZ+r}function Yl(i,t,e,n,s){if(Math.max(i.x,t.x)<Math.min(e.x,n.x)-s||Math.min(i.x,t.x)>Math.max(e.x,n.x)+s||Math.max(i.z,t.z)<Math.min(e.z,n.z)-s||Math.min(i.z,t.z)>Math.max(e.z,n.z)+s)return!1;const r=(h,u,p)=>(u.x-h.x)*(p.z-h.z)-(u.z-h.z)*(p.x-h.x),a=r(i,t,e),o=r(i,t,n),c=r(e,n,i),l=r(e,n,t);return a*o<0&&c*l<0?!0:Math.min(cn(i,e,n),cn(t,e,n),cn(e,i,t),cn(n,i,t))<s}function Fo(i){const t=dn(i.heading),e=i.width/2;return{a:{x:i.x-t.z*e,z:i.z+t.x*e},b:{x:i.x+t.z*e,z:i.z-t.x*e},kind:"gate",material:i.material||"wood"}}const $l=i=>i.material==="stone"?.3:.18;function Zl(i){return[...i.fenceSegments||[],...(i.gates||[]).filter(t=>t.operable&&!t.open).map(Fo)]}function Fe(i,t,e,n=.55){const s={x:t,z:e},r=i.bounds;if(t<r.minX+n+.18||t>r.maxX-n-.18||e<r.minZ+n+.18||e>r.maxZ-n-.18)return!1;for(const a of Zl(i))if(cn(s,a.a,a.b)<n+$l(a))return!1;for(const a of i.rivers||[])if(a.bridges.some(c=>lu(c,s,n))||zo(a,s,n)&&!a.bridges.some(c=>No(c,s,n)))return!1;for(const a of i.obstacles||[])if(me(s,a)<n+a.radius)return!1;return!0}function Rs(i,t,e,n,s=.55){const r=Math.max(1,Math.ceil(Math.hypot(e,n)/.25)),a=e/r,o=n/r;let c=!1,l=!1;for(let h=0;h<r;h++)Fe(i,t.x+a,t.z+o,s)?(t.x+=a,t.z+=o):(Fe(i,t.x+a,t.z,s)?t.x+=a:Math.abs(a)>1e-8&&(c=!0),Fe(i,t.x,t.z+o,s)?t.z+=o:Math.abs(o)>1e-8&&(l=!0));return{blockedX:c,blockedZ:l}}function Kl(i,t,e,n,s,r=!1){const a=i.bounds;for(const o of[t,e])if(o.x<a.minX+n+.18||o.x>a.maxX-n-.18||o.z<a.minZ+n+.18||o.z>a.maxZ-n-.18)return!1;for(const o of Zl(i))if(!(r&&o.kind!=="gate"&&o.material!=="stone"&&(o.kind!=="target"||i.target?.type!=="barn"))&&Yl(t,e,o.a,o.b,n+$l(o)))return!1;for(const o of i.obstacles||[]){const c=n+o.radius;if(!(o.x<Math.min(t.x,e.x)-c||o.x>Math.max(t.x,e.x)+c||o.z<Math.min(t.z,e.z)-c||o.z>Math.max(t.z,e.z)+c)&&cn(o,t,e)<c)return!1}for(const o of i.rivers||[]){if(s&&o.bridges.some(l=>Xl(l,t,e,n)))return!1;if(!uu(o,t,e,n))continue;const c=Math.max(1,Math.ceil(me(t,e)/.45));for(let l=0;l<=c;l++){const h={x:t.x+(e.x-t.x)*l/c,z:t.z+(e.z-t.z)*l/c};if(zo(o,h,n)&&!o.bridges.some(u=>No(u,h,n)))return!1}}return!0}function yn(i,t,e,n=.55){return Kl(i,t,e,n,!0)}function du(i,t,e){return Kl(i,t,e,.15,!1,!0)}function gi(i,t,e){for(const n of i?.rivers||[])for(const s of n.bridges)if(No(s,{x:t,z:e},0)){const r=dn(s.heading),a=(t-s.x)*r.x+(e-s.z)*r.z;return .18+.12*Math.sin(Math.PI*(a/s.length+.5))}return 0}function fu(i){const t={x:i.minX,z:i.minZ},e={x:i.maxX,z:i.minZ},n={x:i.maxX,z:i.maxZ},s={x:i.minX,z:i.maxZ};return[[t,e],[e,n],[n,s],[s,t]].map(([r,a])=>({a:r,b:a,kind:"boundary"}))}function pu(i,t,e){const n=[i[0]];for(let s=1;s<i.length;s++){const r=i[s-1],a=i[s],o=me(r,a),c=Math.max(1,Math.ceil(o/1.2)),l=Io(a.x-r.x,a.z-r.z),h=t()*Math.PI*2,u=r.kind==="bridge"||a.kind==="bridge"||r.kind==="gate"||a.kind==="gate"||a.kind==="target"?0:Math.min(1.8,o*.045),p=[];for(let x=1;x<=c;x++){const g=x/c,m=Math.sin(Math.PI*g)*Math.sin(Math.PI*2*g+h)*u;p.push({x:r.x+(a.x-r.x)*g-l.z*m,z:r.z+(a.z-r.z)*g+l.x*m,...x===c&&a.kind?{kind:a.kind}:{}})}const d=!e||p.every((x,g)=>yn(e,g?p[g-1]:r,x,.85));for(let x=1;x<=c;x++){const g=x/c;n.push(d?p[x-1]:{x:r.x+(a.x-r.x)*g,z:r.z+(a.z-r.z)*g,...x===c&&a.kind?{kind:a.kind}:{}})}}return n}function jl(i=0,t=i*7919+42){i=za(Math.floor(Number(i)||0),0,99),t=Number(t)>>>0;const e=cu(t),n=i<5,s=Math.min(5+i*3,65),r=i===1?9.4:n?4.1:4.8,a=n?15+i*3:48+i*3,o=n?-32:-40,c=a+15,l=n?24:84+Math.floor(i/15)*14,u=(n?i===0?0:t%2*2:t%4)*Math.PI/2,p=tt=>({x:Number((tt.x*Math.cos(u)-tt.z*Math.sin(u)).toFixed(6)),z:Number((tt.x*Math.sin(u)+tt.z*Math.cos(u)).toFixed(6)),...tt.kind?{kind:tt.kind}:{}}),d=Math.PI/2-u,x=[{x:o,z:-l},{x:c,z:l},{x:o,z:l},{x:c,z:-l}].map(p),g={minX:Math.min(...x.map(tt=>tt.x)),maxX:Math.max(...x.map(tt=>tt.x)),minZ:Math.min(...x.map(tt=>tt.z)),maxZ:Math.max(...x.map(tt=>tt.z))};n||(g.minZ=Math.min(g.minZ,-l),g.maxZ=Math.max(g.maxZ,l));const m={...p({x:a,z:0}),radius:4.7+Math.sqrt(s)*.2,type:i%3===2?"barn":i%3===1?"field":"pen",heading:d},f=p({x:n?-20:-26,z:0}),b=p({x:n?-26:-33,z:0}),E=n?1:i<15?i%2===1?2:1:i%3===0?3:2,v=n?a-21:a-32,T=i===0?[]:n?[i===1?-10:-12]:i>=15?[v-48,v-23]:[v-23],w=T.map(tt=>{const lt=e()*Math.PI*2;return{width:n?3.1:3.7+Math.min(i*.025,1.8),at:V=>tt+Math.sin(V/21+lt)*2.4+Math.sin(V/8+lt)*.65}}),D=w.map(tt=>({width:tt.width,points:Array.from({length:Math.ceil((l*2+64)/2)+1},(lt,V)=>{const $=-l-32+V*2;return{x:tt.at($),z:$}}),bridges:[]})),L=[],_=[],y=e()>.5?1:-1;for(let tt=0;tt<E;tt++){const lt=E===1?0:(tt-(E-1)/2)*(n?12:32),V=[{x:f.x*Math.cos(u)+f.z*Math.sin(u),z:0}];if(i===0)V.push({x:-8,z:2.8},{x:2,z:-2.2},{x:a-m.radius-3,z:0},{x:a,z:0,kind:"target"});else{if(w.forEach((at,ft)=>{const pt=n?i===1?0:y*5:lt+y*(ft%2?-1:1)*(14+e()*5),Wt=D[ft].points,Pt=za(Math.floor((pt-Wt[0].z)/2),0,Wt.length-2),C=Wt[Pt],Ot=Wt[Pt+1],bt=(pt-C.z)/(Ot.z-C.z),vt=C.x+(Ot.x-C.x)*bt,mt=Io(Ot.z-C.z,C.x-Ot.x),le={x:vt,z:pt,width:r*1.25,length:at.width+1.5,heading:Math.atan2(mt.x,mt.z)-u};D[ft].bridges.push(le);const Mt=at.width/2+2.5+(n?3:6),kt=n?Mt:(vt-T[ft]+Mt)/mt.x,Me=n?Mt:(T[ft]+Mt-vt)/mt.x,ue={x:vt-mt.x*kt,z:pt-mt.z*kt},A={x:vt+mt.x*Me,z:pt+mt.z*Me};V.push({x:ue.x-4,z:ue.z-y*(n?3:8)},ue,{x:vt,z:pt,kind:"bridge"},A)}),i>=2){const at=n?y*-4:lt-y*(13+e()*4),ft={x:v,z:at,width:n?8:10,heading:d};L.push(ft),V.push({x:v-5,z:at},{x:v,z:at,kind:"gate"},{x:v+5,z:at})}const $=a-m.radius-4;V.push({x:$-7,z:n?y*3:lt*.3},{x:$,z:0},{x:a,z:0,kind:"target"})}_.push(V)}const I=D.map(tt=>({width:tt.width,points:tt.points.map(p),bridges:tt.bridges.map(lt=>({...lt,...p(lt)}))})),B=i>=7&&i%4===3,R=L.map((tt,lt)=>({...tt,...p(tt),id:`gate-${lt}`,operable:i>=19,open:i<19,material:B?"stone":"wood"})),P=fu(g);if(R.length){const tt=[...L].sort((V,$)=>V.z-$.z);let lt=-l;for(const V of tt)P.push({a:p({x:v,z:lt}),b:p({x:v,z:V.z-V.width/2}),kind:"interior"}),lt=V.z+V.width/2;P.push({a:p({x:v,z:lt}),b:p({x:v,z:l}),kind:"interior"})}const U=zn(m),N=U.halfLength,q=U.halfWidth,O=U.openingWidth/2,Y=[[[-N,-q],[N,-q]],[[N,-q],[N,q]],[[N,q],[-N,q]],[[-N,q],[-N,O]],[[-N,-O],[-N,-q]]];for(const[tt,lt]of Y)P.push({a:Qi(m,...tt),b:Qi(m,...lt),kind:"target"});for(const tt of P)tt.material=B&&tt.kind!=="target"?"stone":"wood";const j={bounds:g,rivers:I,fenceSegments:P,obstacles:[]},et=_.map((tt,lt)=>{const V=pu(tt.map(p),e,j);return{id:`route-${lt}`,points:V,length:V.slice(1).reduce(($,at,ft)=>$+me(at,V[ft]),0)}}),Lt=et.map(tt=>({routeId:tt.id,points:tt.points,width:r})),Ut={index:i,seed:t,title:["First day on the farm","Over the babbling brook","Through the garden gate","A mixed-up meadow","The long way home"][i]||`Pasture patrol ${i+1}`,description:i===0?"Move behind the sheep and gently guide all five into the sunny pen.":`Bring ${s} robots to the ${m.type}. ${E>1?"Choose a crossing and lead your flock through the meadow.":"Follow the winding trail and use the crossings."}`,bounds:g,spawn:f,dog:b,target:m,animals:[],rivers:I,gates:R,fences:[],fenceSegments:P,obstacles:[],routes:et,roads:Lt,reward:80+i*25,sceneryHills:[]};for(let tt=0;tt<s;tt++){const lt=p({x:(n?-20:-26)+Math.floor(tt/7)*1.65+(e()-.5)*.2,z:(tt%7-3)*1.65+(e()-.5)*.2});Ut.animals.push({id:tt,type:i>=3&&tt%4===0?"cow":"sheep",...lt,vx:0,vz:0,saved:!1})}if(Ut.animals.some(tt=>!Fe(Ut,tt.x,tt.z,tt.type==="cow"?.78:.55))){const tt=dn(d),lt=Ut.animals.map(V=>({x:V.x,z:V.z}));for(let V=1;V<=7;V++){const $=V*.5,at=lt.map(ft=>({x:ft.x-tt.x*$,z:ft.z-tt.z*$}));if(at.every((ft,pt)=>Fe(Ut,ft.x,ft.z,Ut.animals[pt].type==="cow"?.78:.55))){at.forEach((ft,pt)=>Object.assign(Ut.animals[pt],ft));break}}}for(let tt=0;tt<Math.min(10+i*2,130);tt++){const lt=p({x:o+5+e()*(c-o-10),z:-l+5+e()*(l*2-10)}),V=.7+e()*.7;me(lt,f)<14||me(lt,m)<m.radius+10||!Fe(Ut,lt.x,lt.z,V+1)||et.some($=>$.points.slice(1).some((at,ft)=>cn(lt,$.points[ft],at)<7+V))||Ut.obstacles.push({...lt,radius:V})}for(let tt=0;tt<14;tt++){const lt=7+e()*8,V=3+e()*5,$=tt%4,at=$===0?{x:g.minX-lt-3,z:g.minZ+e()*(g.maxZ-g.minZ)}:$===1?{x:g.maxX+lt+3,z:g.minZ+e()*(g.maxZ-g.minZ)}:$===2?{x:g.minX+e()*(g.maxX-g.minX),z:g.minZ-lt-3}:{x:g.minX+e()*(g.maxX-g.minX),z:g.maxZ+lt+3};Ut.sceneryHills.push({...at,radius:lt,height:V})}return Ut}function Fa(i,t,e){let n=null;for(const s of i.routes||[]){if(e&&s.id!==e)continue;let r=0;for(let a=1;a<s.points.length;a++){const o=s.points[a-1],c=s.points[a],l=Uo(t,o,c),h=me(t,l),u=me(o,c);(!n||h<n.distance)&&(n={route:s,routeId:s.id,index:a-1,point:l,distance:h,progress:r+u*l.t,length:s.length}),r+=u}}return n}function mu(i,t,e){const n=Fa(i,t,e);if(!n)return i.target;const s=n.progress+7;let r=0;for(let a=1;a<n.route.points.length;a++)if(r+=me(n.route.points[a-1],n.route.points[a]),r>=s)return n.route.points[a];return i.target}function gu(i,t,e,n){if(yn(i,t,e,n))return e;const s=Fa(i,t),r=Fa(i,e,s?.routeId);if(!s||!r)return e;const a=r.progress>=s.progress,o=s.route.points;if(s.distance>3&&yn(i,t,s.point,n))return s.point;const c=a?Math.min(o.length-1,s.index+5):Math.max(0,s.index-4);for(let l=c;a?l>s.index:l<=s.index;l+=a?-1:1)if(yn(i,t,o[l],n))return o[l];return s.point}function Jl(i,t,e,n=.62){if(yn(i,t,e,n))return e;const s=gu(i,t,e,n),r=(i.rivers||[]).flatMap(x=>x.bridges).filter(x=>me(t,x)<x.length+x.width+8||Xl(x,t,e,n)).sort((x,g)=>Math.min(me(t,x),me(e,x))-Math.min(me(t,g),me(e,g))).slice(0,2),a=i.target,o=a&&zn(a),c=o&&(me(t,a)<o.halfLength*2+6||me(e,a)<o.halfLength*2+6);if(!r.length&&!c)return s;const l=[t,e,s];for(const x of r){const g=dn(x.heading),m=x.length/2+n+.4,f=x.width/2+n+.4;for(const[b,E]of[[-m,-f],[-m,f],[m,-f],[m,f],[-m,0],[m,0],[0,0]])l.push({x:x.x+g.x*b+g.z*E,z:x.z+g.z*b-g.x*E})}if(c){const x=o.halfLength+n+.5;for(const[g,m]of[[-x,-x],[-x,x],[x,-x],[x,x],[-x,0],[-o.halfLength+n+.5,0]])l.push(Qi(a,g,m))}const h=l.map(()=>1/0),u=[],p=new Set;h[0]=0;for(let x=0;x<l.length;x++){let g=-1;for(let m=0;m<l.length;m++)!p.has(m)&&(g<0||h[m]<h[g])&&(g=m);if(g<0||!Number.isFinite(h[g]))break;p.add(g);for(let m=1;m<l.length;m++){if(p.has(m)||!yn(i,l[g],l[m],n))continue;const f=h[g]+me(l[g],l[m]);f<h[m]&&(h[m]=f,u[m]=g)}}let d=Number.isFinite(h[1])?1:Number.isFinite(h[2])?2:-1;if(d<0)return s;for(;u[d]!==0&&u[d]!==void 0;)d=u[d];return l[d]}function xu(i,t,e,n,s=.78){const r=Math.hypot(e,n);if(r<.01)return{x:0,z:0};const a={x:t.x+e/r*2,z:t.z+n/r*2};if(yn(i,t,a,s))return{x:0,z:0};let o=null,c=1/0;for(const x of i.rivers||[])if(zo(x,t,3))for(const g of x.bridges){const m=me(t,g);m<c&&(c=m,o=g)}const l=i.target,h=zn(l),u={...h.entrance,width:h.openingWidth,heading:l.heading,enclosure:!0};for(const x of[...(i.gates||[]).filter(g=>!g.operable||g.open),u]){const g=dn(x.heading),m=t.x-x.x,f=t.z-x.z;Math.abs(m*g.x+f*g.z)<3&&me(t,x)<c&&(c=me(t,x),o=x)}if((i.fenceSegments||[]).some(x=>x.kind==="target"&&cn(t,x.a,x.b)<s+2)&&(o=u),!o)return{x:0,z:0};if(o.length||o.enclosure){const x=Jl(i,t,o,s),g=Io(x.x-t.x,x.z-t.z);return{x:g.x*Math.min(2.4,r*.8+.5),z:g.z*Math.min(2.4,r*.8+.5)}}const p=dn(o.heading),d=(o.x-t.x)*p.z-(o.z-t.z)*p.x;return Math.abs(d)<o.width/2-1?{x:0,z:0}:{x:p.z*Math.sign(d)*Math.min(2.4,r*.8+.5),z:-p.x*Math.sign(d)*Math.min(2.4,r*.8+.5)}}const _u=3.2;function Ql(i,t){return!i||!t?null:(i.gates||[]).filter(e=>e.operable&&!e.open).map(e=>{const n=Fo(e),s=Uo(t,n.a,n.b),r=me(t,s);if(r>_u||r<.001||!Fe(i,t.x,t.z,.62))return null;const a=.62+(e.material==="stone"?.3:.18)+.08,o={x:s.x+(t.x-s.x)/r*a,z:s.z+(t.z-s.z)/r*a};return yn(i,t,o,.62)?{gate:e,d:r}:null}).filter(Boolean).sort((e,n)=>e.d-n.d||e.gate.id.localeCompare(n.gate.id))[0]?.gate||null}function Mu(i,t,e){const n=Ql(i,t);return!n||n.id!==e?!1:(n.open=!0,i.geometryRevision=(i.geometryRevision||0)+1,i.flockVisibility?.clear(),!0)}function vu({document:i,getState:t,onOpen:e=()=>{}}){const n=i.createElement("button");n.id="open-gate",n.type="button",n.className="gate-action hidden",n.textContent="Open gate",n.setAttribute("aria-label","Open nearby gate"),i.getElementById("controls").appendChild(n);let s=null;const r=()=>{const{level:o,dog:c,playing:l}=t();return s=l?Ql(o,c):null,n.classList.toggle("hidden",!s),n.disabled=!s,s},a=()=>{const{level:o,dog:c,playing:l}=t();return!l||!s||!Mu(o,c,s.id)?!1:(e(s),r(),!0)};return n.onclick=a,n.addEventListener("touchend",o=>{o.preventDefault(),o.stopPropagation(),a()},{passive:!1}),{button:n,update:r,activate:a}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Oo="180",yu=0,bc=1,Su=2,th=1,eh=2,Ln=3,Kn=0,Ge=1,be=2,qn=0,Ki=1,Ec=2,wc=3,Tc=4,bu=5,ui=100,Eu=101,wu=102,Tu=103,Au=104,Ru=200,Cu=201,Pu=202,Du=203,Oa=204,Ba=205,Lu=206,Iu=207,Uu=208,Nu=209,zu=210,Fu=211,Ou=212,Bu=213,ku=214,ka=0,Ga=1,Va=2,ts=3,Ha=4,Wa=5,Xa=6,qa=7,nh=0,Gu=1,Vu=2,Yn=0,Hu=1,Wu=2,Xu=3,ih=4,qu=5,Yu=6,$u=7,sh=300,es=301,ns=302,Ya=303,$a=304,Or=306,Un=1e3,fi=1001,Za=1002,Ye=1003,Zu=1004,qs=1005,ln=1006,Kr=1007,pi=1008,En=1009,rh=1010,ah=1011,Ds=1012,Bo=1013,vi=1014,_n=1015,Bs=1016,ko=1017,Go=1018,Ls=1020,oh=35902,ch=35899,lh=1021,hh=1022,hn=1023,Is=1026,Us=1027,Vo=1028,Ho=1029,uh=1030,Wo=1031,Xo=1033,Sr=33776,br=33777,Er=33778,wr=33779,Ka=35840,ja=35841,Ja=35842,Qa=35843,to=36196,eo=37492,no=37496,io=37808,so=37809,ro=37810,ao=37811,oo=37812,co=37813,lo=37814,ho=37815,uo=37816,fo=37817,po=37818,mo=37819,go=37820,xo=37821,_o=36492,Mo=36494,vo=36495,yo=36283,So=36284,bo=36285,Eo=36286,Ku=3200,ju=3201,dh=0,Ju=1,Hn="",Ae="srgb",is="srgb-linear",Rr="linear",ie="srgb",Ci=7680,Ac=519,Qu=512,td=513,ed=514,fh=515,nd=516,id=517,sd=518,rd=519,wo=35044,Cr=35048,Rc="300 es",Mn=2e3,Pr=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jr=Math.PI/180,To=180/Math.PI;function $n(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Zt(i,t,e){return Math.max(t,Math.min(e,i))}function ad(i,t){return(i%t+t)%t}function Jr(i,t,e){return(1-e)*i+e*t}function gn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function se(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class qt{constructor(t=0,e=0){qt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ei{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const p=r[a+0],d=r[a+1],x=r[a+2],g=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=p,t[e+1]=d,t[e+2]=x,t[e+3]=g;return}if(u!==g||c!==p||l!==d||h!==x){let m=1-o;const f=c*p+l*d+h*x+u*g,b=f>=0?1:-1,E=1-f*f;if(E>Number.EPSILON){const T=Math.sqrt(E),w=Math.atan2(T,f*b);m=Math.sin(m*w)/T,o=Math.sin(o*w)/T}const v=o*b;if(c=c*m+p*v,l=l*m+d*v,h=h*m+x*v,u=u*m+g*v,m===1-o){const T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],p=r[a+1],d=r[a+2],x=r[a+3];return t[e]=o*x+h*u+c*d-l*p,t[e+1]=c*x+h*p+l*u-o*d,t[e+2]=l*x+h*d+o*p-c*u,t[e+3]=h*x-o*u-c*p-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),p=c(n/2),d=c(s/2),x=c(r/2);switch(a){case"XYZ":this._x=p*h*u+l*d*x,this._y=l*d*u-p*h*x,this._z=l*h*x+p*d*u,this._w=l*h*u-p*d*x;break;case"YXZ":this._x=p*h*u+l*d*x,this._y=l*d*u-p*h*x,this._z=l*h*x-p*d*u,this._w=l*h*u+p*d*x;break;case"ZXY":this._x=p*h*u-l*d*x,this._y=l*d*u+p*h*x,this._z=l*h*x+p*d*u,this._w=l*h*u-p*d*x;break;case"ZYX":this._x=p*h*u-l*d*x,this._y=l*d*u+p*h*x,this._z=l*h*x-p*d*u,this._w=l*h*u+p*d*x;break;case"YZX":this._x=p*h*u+l*d*x,this._y=l*d*u+p*h*x,this._z=l*h*x-p*d*u,this._w=l*h*u-p*d*x;break;case"XZY":this._x=p*h*u-l*d*x,this._y=l*d*u-p*h*x,this._z=l*h*x+p*d*u,this._w=l*h*u+p*d*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],p=n+o+u;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(a-s)*d}else if(n>o&&n>u){const d=2*Math.sqrt(1+n-o-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+l)/d}else if(o>u){const d=2*Math.sqrt(1+o-n-u);this._w=(r-l)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-o);this._w=(a-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Zt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const d=1-e;return this._w=d*a+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,p=Math.sin(e*h)/l;return this._w=a*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Cc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qr.copy(this).projectOnVector(t),this.sub(Qr)}reflect(t){return this.sub(Qr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Zt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new F,Cc=new Ei;class Vt{constructor(t,e,n,s,r,a,o,c,l){Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],p=n[2],d=n[5],x=n[8],g=s[0],m=s[3],f=s[6],b=s[1],E=s[4],v=s[7],T=s[2],w=s[5],D=s[8];return r[0]=a*g+o*b+c*T,r[3]=a*m+o*E+c*w,r[6]=a*f+o*v+c*D,r[1]=l*g+h*b+u*T,r[4]=l*m+h*E+u*w,r[7]=l*f+h*v+u*D,r[2]=p*g+d*b+x*T,r[5]=p*m+d*E+x*w,r[8]=p*f+d*v+x*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,p=o*c-h*r,d=l*r-a*c,x=e*u+n*p+s*d;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/x;return t[0]=u*g,t[1]=(s*l-h*n)*g,t[2]=(o*n-s*a)*g,t[3]=p*g,t[4]=(h*e-s*c)*g,t[5]=(s*r-o*e)*g,t[6]=d*g,t[7]=(n*c-l*e)*g,t[8]=(a*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ta.makeScale(t,e)),this}rotate(t){return this.premultiply(ta.makeRotation(-t)),this}translate(t,e){return this.premultiply(ta.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ta=new Vt;function ph(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function od(){const i=Dr("canvas");return i.style.display="block",i}const Pc={};function Ns(i){i in Pc||(Pc[i]=!0,console.warn(i))}function cd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Dc=new Vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lc=new Vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ld(){const i={enabled:!0,workingColorSpace:is,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ie&&(s.r=In(s.r),s.g=In(s.g),s.b=In(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ie&&(s.r=ji(s.r),s.g=ji(s.g),s.b=ji(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hn?Rr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ns("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ns("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[is]:{primaries:t,whitePoint:n,transfer:Rr,toXYZ:Dc,fromXYZ:Lc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:t,whitePoint:n,transfer:ie,toXYZ:Dc,fromXYZ:Lc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}}),i}const Qt=ld();function In(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Pi;class hd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Pi===void 0&&(Pi=Dr("canvas")),Pi.width=t.width,Pi.height=t.height;const s=Pi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Pi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Dr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=In(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(In(e[n]/255)*255):e[n]=In(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ud=0;class qo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=$n(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ea(s[a].image)):r.push(ea(s[a]))}else r=ea(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ea(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?hd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dd=0;const na=new F;class De extends cs{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,n=fi,s=fi,r=ln,a=pi,o=hn,c=En,l=De.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=$n(),this.name="",this.source=new qo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(na).x}get height(){return this.source.getSize(na).y}get depth(){return this.source.getSize(na).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Un:t.x=t.x-Math.floor(t.x);break;case fi:t.x=t.x<0?0:1;break;case Za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Un:t.y=t.y-Math.floor(t.y);break;case fi:t.y=t.y<0?0:1;break;case Za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=sh;De.DEFAULT_ANISOTROPY=1;class _e{constructor(t=0,e=0,n=0,s=1){_e.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],p=c[1],d=c[5],x=c[9],g=c[2],m=c[6],f=c[10];if(Math.abs(h-p)<.01&&Math.abs(u-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+g)<.1&&Math.abs(x+m)<.1&&Math.abs(l+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,v=(d+1)/2,T=(f+1)/2,w=(h+p)/4,D=(u+g)/4,L=(x+m)/4;return E>v&&E>T?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=D/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=L/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=D/r,s=L/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-x)*(m-x)+(u-g)*(u-g)+(p-h)*(p-h));return Math.abs(b)<.001&&(b=1),this.x=(m-x)/b,this.y=(u-g)/b,this.z=(p-h)/b,this.w=Math.acos((l+d+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Zt(this.x,t.x,e.x),this.y=Zt(this.y,t.y,e.y),this.z=Zt(this.z,t.z,e.z),this.w=Zt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Zt(this.x,t,e),this.y=Zt(this.y,t,e),this.z=Zt(this.z,t,e),this.w=Zt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Zt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class fd extends cs{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new De(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:ln,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new qo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends fd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class mh extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class pd extends De{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class wi{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Qe):Qe.fromBufferAttribute(r,a),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ys.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ys.copy(n.boundingBox)),Ys.applyMatrix4(t.matrixWorld),this.union(Ys)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),$s.subVectors(this.max,fs),Di.subVectors(t.a,fs),Li.subVectors(t.b,fs),Ii.subVectors(t.c,fs),Fn.subVectors(Li,Di),On.subVectors(Ii,Li),ni.subVectors(Di,Ii);let e=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-ni.z,ni.y,Fn.z,0,-Fn.x,On.z,0,-On.x,ni.z,0,-ni.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-ni.y,ni.x,0];return!ia(e,Di,Li,Ii,$s)||(e=[1,0,0,0,1,0,0,0,1],!ia(e,Di,Li,Ii,$s))?!1:(Zs.crossVectors(Fn,On),e=[Zs.x,Zs.y,Zs.z],ia(e,Di,Li,Ii,$s))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Tn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Tn=[new F,new F,new F,new F,new F,new F,new F,new F],Qe=new F,Ys=new wi,Di=new F,Li=new F,Ii=new F,Fn=new F,On=new F,ni=new F,fs=new F,$s=new F,Zs=new F,ii=new F;function ia(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ii.fromArray(i,r);const o=s.x*Math.abs(ii.x)+s.y*Math.abs(ii.y)+s.z*Math.abs(ii.z),c=t.dot(ii),l=e.dot(ii),h=n.dot(ii);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const md=new wi,ps=new F,sa=new F;class Jn{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):md.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ps,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(sa)),this.expandByPoint(ps.copy(t.center).sub(sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const An=new F,ra=new F,Ks=new F,Bn=new F,aa=new F,js=new F,oa=new F;class gh{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,An)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=An.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(An.copy(this.origin).addScaledVector(this.direction,e),An.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ra.copy(t).add(e).multiplyScalar(.5),Ks.copy(e).sub(t).normalize(),Bn.copy(this.origin).sub(ra);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ks),o=Bn.dot(this.direction),c=-Bn.dot(Ks),l=Bn.lengthSq(),h=Math.abs(1-a*a);let u,p,d,x;if(h>0)if(u=a*c-o,p=a*o-c,x=r*h,u>=0)if(p>=-x)if(p<=x){const g=1/h;u*=g,p*=g,d=u*(u+a*p+2*o)+p*(a*u+p+2*c)+l}else p=r,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*c)+l;else p=-r,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*c)+l;else p<=-x?(u=Math.max(0,-(-a*r+o)),p=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+p*(p+2*c)+l):p<=x?(u=0,p=Math.min(Math.max(-r,-c),r),d=p*(p+2*c)+l):(u=Math.max(0,-(a*r+o)),p=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+p*(p+2*c)+l);else p=a>0?-r:r,u=Math.max(0,-(a*p+o)),d=-u*u+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ra).addScaledVector(Ks,p),d}intersectSphere(t,e){An.subVectors(t.center,this.origin);const n=An.dot(this.direction),s=An.dot(An)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),h>=0?(r=(t.min.y-p.y)*h,a=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,a=(t.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-p.z)*u,c=(t.max.z-p.z)*u):(o=(t.max.z-p.z)*u,c=(t.min.z-p.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,An)!==null}intersectTriangle(t,e,n,s,r){aa.subVectors(e,t),js.subVectors(n,t),oa.crossVectors(aa,js);let a=this.direction.dot(oa),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Bn.subVectors(this.origin,t);const c=o*this.direction.dot(js.crossVectors(Bn,js));if(c<0)return null;const l=o*this.direction.dot(aa.cross(Bn));if(l<0||c+l>a)return null;const h=-o*Bn.dot(oa);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,n,s,r,a,o,c,l,h,u,p,d,x,g,m){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,p,d,x,g,m)}set(t,e,n,s,r,a,o,c,l,h,u,p,d,x,g,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=p,f[3]=d,f[7]=x,f[11]=g,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ui.setFromMatrixColumn(t,0).length(),r=1/Ui.setFromMatrixColumn(t,1).length(),a=1/Ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const p=a*h,d=a*u,x=o*h,g=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+x*l,e[5]=p-g*l,e[9]=-o*c,e[2]=g-p*l,e[6]=x+d*l,e[10]=a*c}else if(t.order==="YXZ"){const p=c*h,d=c*u,x=l*h,g=l*u;e[0]=p+g*o,e[4]=x*o-d,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=d*o-x,e[6]=g+p*o,e[10]=a*c}else if(t.order==="ZXY"){const p=c*h,d=c*u,x=l*h,g=l*u;e[0]=p-g*o,e[4]=-a*u,e[8]=x+d*o,e[1]=d+x*o,e[5]=a*h,e[9]=g-p*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const p=a*h,d=a*u,x=o*h,g=o*u;e[0]=c*h,e[4]=x*l-d,e[8]=p*l+g,e[1]=c*u,e[5]=g*l+p,e[9]=d*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const p=a*c,d=a*l,x=o*c,g=o*l;e[0]=c*h,e[4]=g-p*u,e[8]=x*u+d,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=d*u+x,e[10]=p-g*u}else if(t.order==="XZY"){const p=a*c,d=a*l,x=o*c,g=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=p*u+g,e[5]=a*h,e[9]=d*u-x,e[2]=x*u-d,e[6]=o*h,e[10]=g*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gd,t,xd)}lookAt(t,e,n){const s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),kn.crossVectors(n,We),kn.lengthSq()===0&&(Math.abs(n.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),kn.crossVectors(n,We)),kn.normalize(),Js.crossVectors(We,kn),s[0]=kn.x,s[4]=Js.x,s[8]=We.x,s[1]=kn.y,s[5]=Js.y,s[9]=We.y,s[2]=kn.z,s[6]=Js.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],p=n[9],d=n[13],x=n[2],g=n[6],m=n[10],f=n[14],b=n[3],E=n[7],v=n[11],T=n[15],w=s[0],D=s[4],L=s[8],_=s[12],y=s[1],I=s[5],B=s[9],R=s[13],P=s[2],U=s[6],N=s[10],q=s[14],O=s[3],Y=s[7],j=s[11],et=s[15];return r[0]=a*w+o*y+c*P+l*O,r[4]=a*D+o*I+c*U+l*Y,r[8]=a*L+o*B+c*N+l*j,r[12]=a*_+o*R+c*q+l*et,r[1]=h*w+u*y+p*P+d*O,r[5]=h*D+u*I+p*U+d*Y,r[9]=h*L+u*B+p*N+d*j,r[13]=h*_+u*R+p*q+d*et,r[2]=x*w+g*y+m*P+f*O,r[6]=x*D+g*I+m*U+f*Y,r[10]=x*L+g*B+m*N+f*j,r[14]=x*_+g*R+m*q+f*et,r[3]=b*w+E*y+v*P+T*O,r[7]=b*D+E*I+v*U+T*Y,r[11]=b*L+E*B+v*N+T*j,r[15]=b*_+E*R+v*q+T*et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],p=t[10],d=t[14],x=t[3],g=t[7],m=t[11],f=t[15];return x*(+r*c*u-s*l*u-r*o*p+n*l*p+s*o*d-n*c*d)+g*(+e*c*d-e*l*p+r*a*p-s*a*d+s*l*h-r*c*h)+m*(+e*l*u-e*o*d-r*a*u+n*a*d+r*o*h-n*l*h)+f*(-s*o*h-e*c*u+e*o*p+s*a*u-n*a*p+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],p=t[10],d=t[11],x=t[12],g=t[13],m=t[14],f=t[15],b=u*m*l-g*p*l+g*c*d-o*m*d-u*c*f+o*p*f,E=x*p*l-h*m*l-x*c*d+a*m*d+h*c*f-a*p*f,v=h*g*l-x*u*l+x*o*d-a*g*d-h*o*f+a*u*f,T=x*u*c-h*g*c-x*o*p+a*g*p+h*o*m-a*u*m,w=e*b+n*E+s*v+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/w;return t[0]=b*D,t[1]=(g*p*r-u*m*r-g*s*d+n*m*d+u*s*f-n*p*f)*D,t[2]=(o*m*r-g*c*r+g*s*l-n*m*l-o*s*f+n*c*f)*D,t[3]=(u*c*r-o*p*r-u*s*l+n*p*l+o*s*d-n*c*d)*D,t[4]=E*D,t[5]=(h*m*r-x*p*r+x*s*d-e*m*d-h*s*f+e*p*f)*D,t[6]=(x*c*r-a*m*r-x*s*l+e*m*l+a*s*f-e*c*f)*D,t[7]=(a*p*r-h*c*r+h*s*l-e*p*l-a*s*d+e*c*d)*D,t[8]=v*D,t[9]=(x*u*r-h*g*r-x*n*d+e*g*d+h*n*f-e*u*f)*D,t[10]=(a*g*r-x*o*r+x*n*l-e*g*l-a*n*f+e*o*f)*D,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*d-e*o*d)*D,t[12]=T*D,t[13]=(h*g*s-x*u*s+x*n*p-e*g*p-h*n*m+e*u*m)*D,t[14]=(x*o*s-a*g*s-x*n*c+e*g*c+a*n*m-e*o*m)*D,t[15]=(a*u*s-h*o*s+h*n*c-e*u*c-a*n*p+e*o*p)*D,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,p=r*l,d=r*h,x=r*u,g=a*h,m=a*u,f=o*u,b=c*l,E=c*h,v=c*u,T=n.x,w=n.y,D=n.z;return s[0]=(1-(g+f))*T,s[1]=(d+v)*T,s[2]=(x-E)*T,s[3]=0,s[4]=(d-v)*w,s[5]=(1-(p+f))*w,s[6]=(m+b)*w,s[7]=0,s[8]=(x+E)*D,s[9]=(m-b)*D,s[10]=(1-(p+g))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ui.set(s[0],s[1],s[2]).length();const a=Ui.set(s[4],s[5],s[6]).length(),o=Ui.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],tn.copy(this);const l=1/r,h=1/a,u=1/o;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,e.setFromRotationMatrix(tn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Mn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),d=(n+s)/(n-s);let x,g;if(c)x=r/(a-r),g=a*r/(a-r);else if(o===Mn)x=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Pr)x=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Mn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),p=-(e+t)/(e-t),d=-(n+s)/(n-s);let x,g;if(c)x=1/(a-r),g=a/(a-r);else if(o===Mn)x=-2/(a-r),g=-(a+r)/(a-r);else if(o===Pr)x=-1/(a-r),g=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=x,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ui=new F,tn=new Kt,gd=new F(0,0,0),xd=new F(1,1,1),kn=new F,Js=new F,We=new F,Ic=new Kt,Uc=new Ei;class fn{constructor(t=0,e=0,n=0,s=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],p=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Zt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Zt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Zt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Zt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Zt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Zt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ic.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ic,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Uc.setFromEuler(this),this.setFromQuaternion(Uc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class xh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let _d=0;const Nc=new F,Ni=new Ei,Rn=new Kt,Qs=new F,ms=new F,Md=new F,vd=new Ei,zc=new F(1,0,0),Fc=new F(0,1,0),Oc=new F(0,0,1),Bc={type:"added"},yd={type:"removed"},zi={type:"childadded",child:null},ca={type:"childremoved",child:null};class ge extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new F,e=new fn,n=new Ei,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Vt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(t,e){return Ni.setFromAxisAngle(t,e),this.quaternion.premultiply(Ni),this}rotateX(t){return this.rotateOnAxis(zc,t)}rotateY(t){return this.rotateOnAxis(Fc,t)}rotateZ(t){return this.rotateOnAxis(Oc,t)}translateOnAxis(t,e){return Nc.copy(t).applyQuaternion(this.quaternion),this.position.add(Nc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zc,t)}translateY(t){return this.translateOnAxis(Fc,t)}translateZ(t){return this.translateOnAxis(Oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Qs.copy(t):Qs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ms,Qs,this.up):Rn.lookAt(Qs,ms,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),Ni.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ni.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bc),zi.child=t,this.dispatchEvent(zi),zi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yd),ca.child=t,this.dispatchEvent(ca),ca.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bc),zi.child=t,this.dispatchEvent(zi),zi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,vd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),p=a(t.skeletons),d=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ge.DEFAULT_UP=new F(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new F,Cn=new F,la=new F,Pn=new F,Fi=new F,Oi=new F,kc=new F,ha=new F,ua=new F,da=new F,fa=new _e,pa=new _e,ma=new _e;class je{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),en.subVectors(t,e),s.cross(en);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){en.subVectors(s,e),Cn.subVectors(n,e),la.subVectors(t,e);const a=en.dot(en),o=en.dot(Cn),c=en.dot(la),l=Cn.dot(Cn),h=Cn.dot(la),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const p=1/u,d=(l*c-o*h)*p,x=(a*h-o*c)*p;return r.set(1-d-x,x,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Pn.x),c.addScaledVector(a,Pn.y),c.addScaledVector(o,Pn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return fa.setScalar(0),pa.setScalar(0),ma.setScalar(0),fa.fromBufferAttribute(t,e),pa.fromBufferAttribute(t,n),ma.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(fa,r.x),a.addScaledVector(pa,r.y),a.addScaledVector(ma,r.z),a}static isFrontFacing(t,e,n,s){return en.subVectors(n,e),Cn.subVectors(t,e),en.cross(Cn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),en.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return je.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Fi.subVectors(s,n),Oi.subVectors(r,n),ha.subVectors(t,n);const c=Fi.dot(ha),l=Oi.dot(ha);if(c<=0&&l<=0)return e.copy(n);ua.subVectors(t,s);const h=Fi.dot(ua),u=Oi.dot(ua);if(h>=0&&u<=h)return e.copy(s);const p=c*u-h*l;if(p<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Fi,a);da.subVectors(t,r);const d=Fi.dot(da),x=Oi.dot(da);if(x>=0&&d<=x)return e.copy(r);const g=d*l-c*x;if(g<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(n).addScaledVector(Oi,o);const m=h*x-d*u;if(m<=0&&u-h>=0&&d-x>=0)return kc.subVectors(r,s),o=(u-h)/(u-h+(d-x)),e.copy(s).addScaledVector(kc,o);const f=1/(m+g+p);return a=g*f,o=p*f,e.copy(n).addScaledVector(Fi,a).addScaledVector(Oi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _h={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},tr={h:0,s:0,l:0};function ga(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Qt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Qt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Qt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Qt.workingColorSpace){if(t=ad(t,1),e=Zt(e,0,1),n=Zt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ga(a,r,t+1/3),this.g=ga(a,r,t),this.b=ga(a,r,t-1/3)}return Qt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ae){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){const n=_h[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=In(t.r),this.g=In(t.g),this.b=In(t.b),this}copyLinearToSRGB(t){return this.r=ji(t.r),this.g=ji(t.g),this.b=ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return Qt.workingToColorSpace(Pe.copy(this),t),Math.round(Zt(Pe.r*255,0,255))*65536+Math.round(Zt(Pe.g*255,0,255))*256+Math.round(Zt(Pe.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Qt.workingColorSpace){Qt.workingToColorSpace(Pe.copy(this),e);const n=Pe.r,s=Pe.g,r=Pe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Qt.workingColorSpace){return Qt.workingToColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Ae){Qt.workingToColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,s=Pe.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Gn),this.setHSL(Gn.h+t,Gn.s+e,Gn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gn),t.getHSL(tr);const n=Jr(Gn.h,tr.h,e),s=Jr(Gn.s,tr.s,e),r=Jr(Gn.l,tr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new Ht;Ht.NAMES=_h;let Sd=0;class Ti extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=$n(),this.name="",this.type="Material",this.blending=Ki,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oa,this.blendDst=Ba,this.blendEquation=ui,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ac,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ci,this.stencilZFail=Ci,this.stencilZPass=Ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oa&&(n.blendSrc=this.blendSrc),this.blendDst!==Ba&&(n.blendDst=this.blendDst),this.blendEquation!==ui&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ac&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class xn extends Ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=nh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new F,er=new qt;let bd=0;class Oe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bd++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=wo,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)er.fromBufferAttribute(this,e),er.applyMatrix3(t),this.setXY(e,er.x,er.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wo&&(t.usage=this.usage),t}}class Mh extends Oe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class vh extends Oe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class te extends Oe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ed=0;const Ke=new Kt,xa=new ge,Bi=new F,Xe=new wi,gs=new wi,Te=new F;class ve extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ph(t)?vh:Mh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Vt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,n){return Ke.makeTranslation(t,e,n),this.applyMatrix4(Ke),this}scale(t,e,n){return Ke.makeScale(t,e,n),this.applyMatrix4(Ke),this}lookAt(t){return xa.lookAt(t),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new te(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Xe.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Xe.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Xe.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Xe.min),this.boundingBox.expandByPoint(Xe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(Xe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];gs.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Xe.min,gs.min),Xe.expandByPoint(Te),Te.addVectors(Xe.max,gs.max),Xe.expandByPoint(Te)):(Xe.expandByPoint(gs.min),Xe.expandByPoint(gs.max))}Xe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Te.fromBufferAttribute(o,l),c&&(Bi.fromBufferAttribute(t,l),Te.add(Bi)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let L=0;L<n.count;L++)o[L]=new F,c[L]=new F;const l=new F,h=new F,u=new F,p=new qt,d=new qt,x=new qt,g=new F,m=new F;function f(L,_,y){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,_),u.fromBufferAttribute(n,y),p.fromBufferAttribute(r,L),d.fromBufferAttribute(r,_),x.fromBufferAttribute(r,y),h.sub(l),u.sub(l),d.sub(p),x.sub(p);const I=1/(d.x*x.y-x.x*d.y);isFinite(I)&&(g.copy(h).multiplyScalar(x.y).addScaledVector(u,-d.y).multiplyScalar(I),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-x.x).multiplyScalar(I),o[L].add(g),o[_].add(g),o[y].add(g),c[L].add(m),c[_].add(m),c[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let L=0,_=b.length;L<_;++L){const y=b[L],I=y.start,B=y.count;for(let R=I,P=I+B;R<P;R+=3)f(t.getX(R+0),t.getX(R+1),t.getX(R+2))}const E=new F,v=new F,T=new F,w=new F;function D(L){T.fromBufferAttribute(s,L),w.copy(T);const _=o[L];E.copy(_),E.sub(T.multiplyScalar(T.dot(_))).normalize(),v.crossVectors(w,_);const I=v.dot(c[L])<0?-1:1;a.setXYZW(L,E.x,E.y,E.z,I)}for(let L=0,_=b.length;L<_;++L){const y=b[L],I=y.start,B=y.count;for(let R=I,P=I+B;R<P;R+=3)D(t.getX(R+0)),D(t.getX(R+1)),D(t.getX(R+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Oe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);const s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,h=new F,u=new F;if(t)for(let p=0,d=t.count;p<d;p+=3){const x=t.getX(p+0),g=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,d=e.count;p<d;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,p=new l.constructor(c.length*h);let d=0,x=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?d=c[g]*o.data.stride+o.offset:d=c[g]*h;for(let f=0;f<h;f++)p[x++]=l[d++]}return new Oe(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ve,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const p=l[h],d=t(p,n);c.push(d)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,p=l.length;u<p;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Gc=new Kt,si=new gh,nr=new Jn,Vc=new F,ir=new F,sr=new F,rr=new F,_a=new F,ar=new F,Hc=new F,or=new F;class re extends ge{constructor(t=new ve,e=new xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){ar.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(_a.fromBufferAttribute(u,t),a?ar.addScaledVector(_a,h):ar.addScaledVector(_a.sub(e),h))}e.add(ar)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(r),si.copy(t.ray).recast(t.near),!(nr.containsPoint(si.origin)===!1&&(si.intersectSphere(nr,Vc)===null||si.origin.distanceToSquared(Vc)>(t.far-t.near)**2))&&(Gc.copy(r).invert(),si.copy(t.ray).applyMatrix4(Gc),!(n.boundingBox!==null&&si.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,si)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,g=p.length;x<g;x++){const m=p[x],f=a[m.materialIndex],b=Math.max(m.start,d.start),E=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,T=E;v<T;v+=3){const w=o.getX(v),D=o.getX(v+1),L=o.getX(v+2);s=cr(this,f,t,n,l,h,u,w,D,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let m=x,f=g;m<f;m+=3){const b=o.getX(m),E=o.getX(m+1),v=o.getX(m+2);s=cr(this,a,t,n,l,h,u,b,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,g=p.length;x<g;x++){const m=p[x],f=a[m.materialIndex],b=Math.max(m.start,d.start),E=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=b,T=E;v<T;v+=3){const w=v,D=v+1,L=v+2;s=cr(this,f,t,n,l,h,u,w,D,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const x=Math.max(0,d.start),g=Math.min(c.count,d.start+d.count);for(let m=x,f=g;m<f;m+=3){const b=m,E=m+1,v=m+2;s=cr(this,a,t,n,l,h,u,b,E,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function wd(i,t,e,n,s,r,a,o){let c;if(t.side===Ge?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Kn,o),c===null)return null;or.copy(o),or.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(or);return l<e.near||l>e.far?null:{distance:l,point:or.clone(),object:i}}function cr(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,ir),i.getVertexPosition(c,sr),i.getVertexPosition(l,rr);const h=wd(i,t,e,n,ir,sr,rr,Hc);if(h){const u=new F;je.getBarycoord(Hc,ir,sr,rr,u),s&&(h.uv=je.getInterpolatedAttribute(s,o,c,l,u,new qt)),r&&(h.uv1=je.getInterpolatedAttribute(r,o,c,l,u,new qt)),a&&(h.normal=je.getInterpolatedAttribute(a,o,c,l,u,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a:o,b:c,c:l,normal:new F,materialIndex:0};je.getNormal(ir,sr,rr,p.normal),h.face=p,h.barycoord=u}return h}class Je extends ve{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let p=0,d=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(h,3)),this.setAttribute("uv",new te(u,2));function x(g,m,f,b,E,v,T,w,D,L,_){const y=v/D,I=T/L,B=v/2,R=T/2,P=w/2,U=D+1,N=L+1;let q=0,O=0;const Y=new F;for(let j=0;j<N;j++){const et=j*I-R;for(let Lt=0;Lt<U;Lt++){const Ut=Lt*y-B;Y[g]=Ut*b,Y[m]=et*E,Y[f]=P,l.push(Y.x,Y.y,Y.z),Y[g]=0,Y[m]=0,Y[f]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(Lt/D),u.push(1-j/L),q+=1}}for(let j=0;j<L;j++)for(let et=0;et<D;et++){const Lt=p+et+U*j,Ut=p+et+U*(j+1),tt=p+(et+1)+U*(j+1),lt=p+(et+1)+U*j;c.push(Lt,Ut,lt),c.push(Ut,tt,lt),O+=6}o.addGroup(d,O,_),d+=O,p+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ss(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ne(i){const t={};for(let e=0;e<i.length;e++){const n=ss(i[e]);for(const s in n)t[s]=n[s]}return t}function Td(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function yh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Qt.workingColorSpace}const Ad={clone:ss,merge:Ne};var Rd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends Ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rd,this.fragmentShader=Cd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=Td(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sh extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vn=new F,Wc=new qt,Xc=new qt;class rn extends Sh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=To*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return To*2*Math.atan(Math.tan(jr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Vn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z),Vn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Vn.x,Vn.y).multiplyScalar(-t/Vn.z)}getViewSize(t,e){return this.getViewBounds(t,Wc,Xc),e.subVectors(Xc,Wc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(jr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ki=-90,Gi=1;class Pd extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(ki,Gi,t,e);s.layers=this.layers,this.add(s);const r=new rn(ki,Gi,t,e);r.layers=this.layers,this.add(r);const a=new rn(ki,Gi,t,e);a.layers=this.layers,this.add(a);const o=new rn(ki,Gi,t,e);o.layers=this.layers,this.add(o);const c=new rn(ki,Gi,t,e);c.layers=this.layers,this.add(c);const l=new rn(ki,Gi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,p,d),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class bh extends De{constructor(t=[],e=es,n,s,r,a,o,c,l,h){super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Dd extends yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new bh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Je(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:qn});r.uniforms.tEquirect.value=e;const a=new re(s,r),o=e.minFilter;return e.minFilter===pi&&(e.minFilter=ln),new Pd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class oe extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ld={type:"move"};class Ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const g of t.hand.values()){const m=e.getJointPose(g,n),f=this._getHandJoint(l,g);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,x=.005;l.inputState.pinching&&p>d+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=d-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ld)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Yo{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=n}clone(){return new Yo(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Id extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ud{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=wo,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ue=new F;class Lr{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),s=se(s,this.array),r=se(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Oe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Lr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Eh extends Ti{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Vi;const xs=new F,Hi=new F,Wi=new F,Xi=new qt,_s=new qt,wh=new Kt,lr=new F,Ms=new F,hr=new F,qc=new qt,va=new qt,Yc=new qt;class Nd extends ge{constructor(t=new Eh){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new ve;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ud(e,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new Lr(n,3,0,!1)),Vi.setAttribute("uv",new Lr(n,2,3,!1))}this.geometry=Vi,this.material=t,this.center=new qt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Hi.setFromMatrixScale(this.matrixWorld),wh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hi.multiplyScalar(-Wi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ur(lr.set(-.5,-.5,0),Wi,a,Hi,s,r),ur(Ms.set(.5,-.5,0),Wi,a,Hi,s,r),ur(hr.set(.5,.5,0),Wi,a,Hi,s,r),qc.set(0,0),va.set(1,0),Yc.set(1,1);let o=t.ray.intersectTriangle(lr,Ms,hr,!1,xs);if(o===null&&(ur(Ms.set(-.5,.5,0),Wi,a,Hi,s,r),va.set(0,1),o=t.ray.intersectTriangle(lr,hr,Ms,!1,xs),o===null))return;const c=t.ray.origin.distanceTo(xs);c<t.near||c>t.far||e.push({distance:c,point:xs.clone(),uv:je.getInterpolation(xs,lr,Ms,hr,qc,va,Yc,new qt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ur(i,t,e,n,s,r){Xi.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(_s.x=r*Xi.x-s*Xi.y,_s.y=s*Xi.x+r*Xi.y):_s.copy(Xi),i.copy(t),i.x+=_s.x,i.y+=_s.y,i.applyMatrix4(wh)}class Th extends De{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Ye,h=Ye,u,p){super(null,a,o,c,l,h,s,r,u,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $c extends Oe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const qi=new Kt,Zc=new Kt,dr=[],Kc=new wi,zd=new Kt,vs=new re,ys=new Jn;class mi extends re{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new $c(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,zd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new wi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qi),Kc.copy(t.boundingBox).applyMatrix4(qi),this.boundingBox.union(Kc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Jn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qi),ys.copy(t.boundingSphere).applyMatrix4(qi),this.boundingSphere.union(ys)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(vs.geometry=this.geometry,vs.material=this.material,vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ys.copy(this.boundingSphere),ys.applyMatrix4(n),t.ray.intersectsSphere(ys)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,qi),Zc.multiplyMatrices(n,qi),vs.matrixWorld=Zc,vs.raycast(t,dr);for(let a=0,o=dr.length;a<o;a++){const c=dr[a];c.instanceId=r,c.object=this,e.push(c)}dr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new $c(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Th(new Float32Array(s*this.count),s,this.count,Vo,_n));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ya=new F,Fd=new F,Od=new Vt;class ci{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ya.subVectors(n,e).cross(Fd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ya),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Od.getNormalMatrix(t),s=this.coplanarPoint(ya).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ri=new Jn,Bd=new qt(.5,.5),fr=new F;class Br{constructor(t=new ci,e=new ci,n=new ci,s=new ci,r=new ci,a=new ci){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],p=r[6],d=r[7],x=r[8],g=r[9],m=r[10],f=r[11],b=r[12],E=r[13],v=r[14],T=r[15];if(s[0].setComponents(l-a,d-h,f-x,T-b).normalize(),s[1].setComponents(l+a,d+h,f+x,T+b).normalize(),s[2].setComponents(l+o,d+u,f+g,T+E).normalize(),s[3].setComponents(l-o,d-u,f-g,T-E).normalize(),n)s[4].setComponents(c,p,m,v).normalize(),s[5].setComponents(l-c,d-p,f-m,T-v).normalize();else if(s[4].setComponents(l-c,d-p,f-m,T-v).normalize(),e===Mn)s[5].setComponents(l+c,d+p,f+m,T+v).normalize();else if(e===Pr)s[5].setComponents(c,p,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ri)}intersectsSprite(t){ri.center.set(0,0,0);const e=Bd.distanceTo(t.center);return ri.radius=.7071067811865476+e,ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(fr.x=s.normal.x>0?t.max.x:t.min.x,fr.y=s.normal.y>0?t.max.y:t.min.y,fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ah extends Ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ir=new F,Ur=new F,jc=new Kt,Ss=new gh,pr=new Jn,Sa=new F,Jc=new F;class kd extends ge{constructor(t=new ve,e=new Ah){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ir.fromBufferAttribute(e,s-1),Ur.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ir.distanceTo(Ur);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(s),pr.radius+=r,t.ray.intersectsSphere(pr)===!1)return;jc.copy(s).invert(),Ss.copy(t.ray).applyMatrix4(jc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){const d=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let g=d,m=x-1;g<m;g+=l){const f=h.getX(g),b=h.getX(g+1),E=mr(this,t,Ss,c,f,b,g);E&&e.push(E)}if(this.isLineLoop){const g=h.getX(x-1),m=h.getX(d),f=mr(this,t,Ss,c,g,m,x-1);f&&e.push(f)}}else{const d=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let g=d,m=x-1;g<m;g+=l){const f=mr(this,t,Ss,c,g,g+1,g);f&&e.push(f)}if(this.isLineLoop){const g=mr(this,t,Ss,c,x-1,d,x-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mr(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Ir.fromBufferAttribute(o,s),Ur.fromBufferAttribute(o,r),e.distanceSqToSegment(Ir,Ur,Sa,Jc)>n)return;Sa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Sa);if(!(l<t.near||l>t.far))return{distance:l,point:Jc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Qc=new F,tl=new F;class Gd extends kd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Qc.fromBufferAttribute(e,s),tl.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Qc.distanceTo(tl);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ls extends De{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Rh extends De{constructor(t,e,n=vi,s,r,a,o=Ye,c=Ye,l,h=Is,u=1){if(h!==Is&&h!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:u};super(p,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new qo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ch extends De{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class $o extends ve{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new F,h=new qt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,p=3;u<=e;u++,p+=3){const d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[p]/t+1)/2,h.y=(a[p+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new te(a,3)),this.setAttribute("normal",new te(o,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $o(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ks extends ve{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],p=[],d=[];let x=0;const g=[],m=n/2;let f=0;b(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new te(u,3)),this.setAttribute("normal",new te(p,3)),this.setAttribute("uv",new te(d,2));function b(){const v=new F,T=new F;let w=0;const D=(e-t)/n;for(let L=0;L<=r;L++){const _=[],y=L/r,I=y*(e-t)+t;for(let B=0;B<=s;B++){const R=B/s,P=R*c+o,U=Math.sin(P),N=Math.cos(P);T.x=I*U,T.y=-y*n+m,T.z=I*N,u.push(T.x,T.y,T.z),v.set(U,D,N).normalize(),p.push(v.x,v.y,v.z),d.push(R,1-y),_.push(x++)}g.push(_)}for(let L=0;L<s;L++)for(let _=0;_<r;_++){const y=g[_][L],I=g[_+1][L],B=g[_+1][L+1],R=g[_][L+1];(t>0||_!==0)&&(h.push(y,I,R),w+=3),(e>0||_!==r-1)&&(h.push(I,B,R),w+=3)}l.addGroup(f,w,0),f+=w}function E(v){const T=x,w=new qt,D=new F;let L=0;const _=v===!0?t:e,y=v===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,m*y,0),p.push(0,y,0),d.push(.5,.5),x++;const I=x;for(let B=0;B<=s;B++){const P=B/s*c+o,U=Math.cos(P),N=Math.sin(P);D.x=_*N,D.y=m*y,D.z=_*U,u.push(D.x,D.y,D.z),p.push(0,y,0),w.x=U*.5+.5,w.y=N*.5*y+.5,d.push(w.x,w.y),x++}for(let B=0;B<s;B++){const R=T+B,P=I+B;v===!0?h.push(P,P+1,R):h.push(P+1,P,R),L+=3}l.addGroup(f,L,v===!0?1:2),f+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ks(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class zs extends ks{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new zs(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Gs extends ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,p=e/c,d=[],x=[],g=[],m=[];for(let f=0;f<h;f++){const b=f*p-a;for(let E=0;E<l;E++){const v=E*u-r;x.push(v,-b,0),g.push(0,0,1),m.push(E/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let b=0;b<o;b++){const E=b+l*f,v=b+l*(f+1),T=b+1+l*(f+1),w=b+1+l*f;d.push(E,v,w),d.push(v,T,w)}this.setIndex(d),this.setAttribute("position",new te(x,3)),this.setAttribute("normal",new te(g,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.width,t.height,t.widthSegments,t.heightSegments)}}class Zo extends ve{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let u=t;const p=(e-t)/s,d=new F,x=new qt;for(let g=0;g<=s;g++){for(let m=0;m<=n;m++){const f=r+m/n*a;d.x=u*Math.cos(f),d.y=u*Math.sin(f),c.push(d.x,d.y,d.z),l.push(0,0,1),x.x=(d.x/e+1)/2,x.y=(d.y/e+1)/2,h.push(x.x,x.y)}u+=p}for(let g=0;g<s;g++){const m=g*(n+1);for(let f=0;f<n;f++){const b=f+m,E=b,v=b+n+1,T=b+n+2,w=b+1;o.push(E,v,w),o.push(v,T,w)}}this.setIndex(o),this.setAttribute("position",new te(c,3)),this.setAttribute("normal",new te(l,3)),this.setAttribute("uv",new te(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zo(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Si extends ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new F,p=new F,d=[],x=[],g=[],m=[];for(let f=0;f<=n;f++){const b=[],E=f/n;let v=0;f===0&&a===0?v=.5/e:f===n&&c===Math.PI&&(v=-.5/e);for(let T=0;T<=e;T++){const w=T/e;u.x=-t*Math.cos(s+w*r)*Math.sin(a+E*o),u.y=t*Math.cos(a+E*o),u.z=t*Math.sin(s+w*r)*Math.sin(a+E*o),x.push(u.x,u.y,u.z),p.copy(u).normalize(),g.push(p.x,p.y,p.z),m.push(w+v,1-E),b.push(l++)}h.push(b)}for(let f=0;f<n;f++)for(let b=0;b<e;b++){const E=h[f][b+1],v=h[f][b],T=h[f+1][b],w=h[f+1][b+1];(f!==0||a>0)&&d.push(E,v,w),(f!==n-1||c<Math.PI)&&d.push(v,T,w)}this.setIndex(d),this.setAttribute("position",new te(x,3)),this.setAttribute("normal",new te(g,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Si(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ko extends ve{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],c=[],l=[],h=new F,u=new F,p=new F;for(let d=0;d<=n;d++)for(let x=0;x<=s;x++){const g=x/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(g),u.y=(t+e*Math.cos(m))*Math.sin(g),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),p.subVectors(u,h).normalize(),c.push(p.x,p.y,p.z),l.push(x/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let x=1;x<=s;x++){const g=(s+1)*d+x-1,m=(s+1)*(d-1)+x-1,f=(s+1)*(d-1)+x,b=(s+1)*d+x;a.push(g,m,b),a.push(m,f,b)}this.setIndex(a),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(c,3)),this.setAttribute("uv",new te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ko(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Se extends Ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dh,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Vd extends Ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Hd extends Ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ph extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Wd extends Ph{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ba=new Kt,el=new F,nl=new F;class Xd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.mapType=En,this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Br,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;el.setFromMatrixPosition(t.matrixWorld),e.position.copy(el),nl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nl),e.updateMatrixWorld(),ba.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ba,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ba)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class kr extends Sh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class qd extends Xd{constructor(){super(new kr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yd extends Ph{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new qd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class $d extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function il(i,t,e,n){const s=Zd(n);switch(e){case lh:return i*t;case Vo:return i*t/s.components*s.byteLength;case Ho:return i*t/s.components*s.byteLength;case uh:return i*t*2/s.components*s.byteLength;case Wo:return i*t*2/s.components*s.byteLength;case hh:return i*t*3/s.components*s.byteLength;case hn:return i*t*4/s.components*s.byteLength;case Xo:return i*t*4/s.components*s.byteLength;case Sr:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Er:case wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ja:case Qa:return Math.max(i,16)*Math.max(t,8)/4;case Ka:case Ja:return Math.max(i,8)*Math.max(t,8)/2;case to:case eo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case no:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case io:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case so:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ro:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ao:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case oo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case co:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case lo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case uo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case po:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case mo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case go:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case _o:case Mo:case vo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case yo:case So:return Math.ceil(i/4)*Math.ceil(t/4)*8;case bo:case Eo:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zd(i){switch(i){case En:case rh:return{byteLength:1,components:1};case Ds:case ah:case Bs:return{byteLength:2,components:1};case ko:case Go:return{byteLength:2,components:4};case vi:case Bo:case _n:return{byteLength:4,components:1};case oh:case ch:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oo);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Dh(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Kd(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,u=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),o.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,x)=>d.start-x.start);let p=0;for(let d=1;d<u.length;d++){const x=u[p],g=u[d];g.start<=x.start+x.count+1?x.count=Math.max(x.count,g.start+g.count-x.start):(++p,u[p]=g)}u.length=p+1;for(let d=0,x=u.length;d<x;d++){const g=u[d];i.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var jd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jd=`#ifdef USE_ALPHAHASH
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
#endif`,Qd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,nf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sf=`#ifdef USE_AOMAP
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
#endif`,rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,af=`#ifdef USE_BATCHING
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
#endif`,of=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uf=`#ifdef USE_IRIDESCENCE
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
#endif`,df=`#ifdef USE_BUMPMAP
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
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_f=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,yf=`#define PI 3.141592653589793
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
} // validated`,Sf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bf=`vec3 transformedNormal = objectNormal;
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
#endif`,Ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Af=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pf=`#ifdef USE_ENVMAP
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
#endif`,Df=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lf=`#ifdef USE_ENVMAP
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
#endif`,If=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ff=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Of=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bf=`#ifdef USE_GRADIENTMAP
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
}`,kf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hf=`uniform bool receiveShadow;
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
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zf=`PhysicalMaterial material;
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
#endif`,Kf=`struct PhysicalMaterial {
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
}`,jf=`
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
#endif`,Jf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ip=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ap=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,op=`#if defined( USE_POINTS_UV )
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
#endif`,cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,up=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fp=`#ifdef USE_MORPHTARGETS
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
#endif`,pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vp=`#ifdef USE_NORMALMAP
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
#endif`,yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Tp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ap=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zp=`float getShadowMask() {
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
}`,Fp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Op=`#ifdef USE_SKINNING
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
#endif`,Bp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kp=`#ifdef USE_SKINNING
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
#endif`,Gp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Wp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xp=`#ifdef USE_TRANSMISSION
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
#endif`,qp=`#ifdef USE_TRANSMISSION
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
#endif`,Yp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jp=`uniform sampler2D t2D;
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
}`,Qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,im=`#include <common>
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
}`,sm=`#if DEPTH_PACKING == 3200
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
}`,rm=`#define DISTANCE
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
}`,am=`#define DISTANCE
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lm=`uniform float scale;
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
}`,hm=`uniform vec3 diffuse;
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
}`,um=`#include <common>
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
}`,dm=`uniform vec3 diffuse;
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
}`,fm=`#define LAMBERT
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
}`,pm=`#define LAMBERT
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
}`,mm=`#define MATCAP
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
}`,gm=`#define MATCAP
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
}`,xm=`#define NORMAL
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
}`,_m=`#define NORMAL
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
}`,Mm=`#define PHONG
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
}`,vm=`#define PHONG
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
}`,ym=`#define STANDARD
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
}`,Sm=`#define STANDARD
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
}`,bm=`#define TOON
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
}`,Em=`#define TOON
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
}`,wm=`uniform float size;
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
}`,Tm=`uniform vec3 diffuse;
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
}`,Am=`#include <common>
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
}`,Rm=`uniform vec3 color;
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
}`,Cm=`uniform float rotation;
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
}`,Pm=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:jd,alphahash_pars_fragment:Jd,alphamap_fragment:Qd,alphamap_pars_fragment:tf,alphatest_fragment:ef,alphatest_pars_fragment:nf,aomap_fragment:sf,aomap_pars_fragment:rf,batching_pars_vertex:af,batching_vertex:of,begin_vertex:cf,beginnormal_vertex:lf,bsdfs:hf,iridescence_fragment:uf,bumpmap_pars_fragment:df,clipping_planes_fragment:ff,clipping_planes_pars_fragment:pf,clipping_planes_pars_vertex:mf,clipping_planes_vertex:gf,color_fragment:xf,color_pars_fragment:_f,color_pars_vertex:Mf,color_vertex:vf,common:yf,cube_uv_reflection_fragment:Sf,defaultnormal_vertex:bf,displacementmap_pars_vertex:Ef,displacementmap_vertex:wf,emissivemap_fragment:Tf,emissivemap_pars_fragment:Af,colorspace_fragment:Rf,colorspace_pars_fragment:Cf,envmap_fragment:Pf,envmap_common_pars_fragment:Df,envmap_pars_fragment:Lf,envmap_pars_vertex:If,envmap_physical_pars_fragment:Wf,envmap_vertex:Uf,fog_vertex:Nf,fog_pars_vertex:zf,fog_fragment:Ff,fog_pars_fragment:Of,gradientmap_pars_fragment:Bf,lightmap_pars_fragment:kf,lights_lambert_fragment:Gf,lights_lambert_pars_fragment:Vf,lights_pars_begin:Hf,lights_toon_fragment:Xf,lights_toon_pars_fragment:qf,lights_phong_fragment:Yf,lights_phong_pars_fragment:$f,lights_physical_fragment:Zf,lights_physical_pars_fragment:Kf,lights_fragment_begin:jf,lights_fragment_maps:Jf,lights_fragment_end:Qf,logdepthbuf_fragment:tp,logdepthbuf_pars_fragment:ep,logdepthbuf_pars_vertex:np,logdepthbuf_vertex:ip,map_fragment:sp,map_pars_fragment:rp,map_particle_fragment:ap,map_particle_pars_fragment:op,metalnessmap_fragment:cp,metalnessmap_pars_fragment:lp,morphinstance_vertex:hp,morphcolor_vertex:up,morphnormal_vertex:dp,morphtarget_pars_vertex:fp,morphtarget_vertex:pp,normal_fragment_begin:mp,normal_fragment_maps:gp,normal_pars_fragment:xp,normal_pars_vertex:_p,normal_vertex:Mp,normalmap_pars_fragment:vp,clearcoat_normal_fragment_begin:yp,clearcoat_normal_fragment_maps:Sp,clearcoat_pars_fragment:bp,iridescence_pars_fragment:Ep,opaque_fragment:wp,packing:Tp,premultiplied_alpha_fragment:Ap,project_vertex:Rp,dithering_fragment:Cp,dithering_pars_fragment:Pp,roughnessmap_fragment:Dp,roughnessmap_pars_fragment:Lp,shadowmap_pars_fragment:Ip,shadowmap_pars_vertex:Up,shadowmap_vertex:Np,shadowmask_pars_fragment:zp,skinbase_vertex:Fp,skinning_pars_vertex:Op,skinning_vertex:Bp,skinnormal_vertex:kp,specularmap_fragment:Gp,specularmap_pars_fragment:Vp,tonemapping_fragment:Hp,tonemapping_pars_fragment:Wp,transmission_fragment:Xp,transmission_pars_fragment:qp,uv_pars_fragment:Yp,uv_pars_vertex:$p,uv_vertex:Zp,worldpos_vertex:Kp,background_vert:jp,background_frag:Jp,backgroundCube_vert:Qp,backgroundCube_frag:tm,cube_vert:em,cube_frag:nm,depth_vert:im,depth_frag:sm,distanceRGBA_vert:rm,distanceRGBA_frag:am,equirect_vert:om,equirect_frag:cm,linedashed_vert:lm,linedashed_frag:hm,meshbasic_vert:um,meshbasic_frag:dm,meshlambert_vert:fm,meshlambert_frag:pm,meshmatcap_vert:mm,meshmatcap_frag:gm,meshnormal_vert:xm,meshnormal_frag:_m,meshphong_vert:Mm,meshphong_frag:vm,meshphysical_vert:ym,meshphysical_frag:Sm,meshtoon_vert:bm,meshtoon_frag:Em,points_vert:wm,points_frag:Tm,shadow_vert:Am,shadow_frag:Rm,sprite_vert:Cm,sprite_frag:Pm},ht={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},mn={basic:{uniforms:Ne([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ne([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ne([ht.common,ht.specularmap,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,ht.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ne([ht.common,ht.envmap,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.roughnessmap,ht.metalnessmap,ht.fog,ht.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ne([ht.common,ht.aomap,ht.lightmap,ht.emissivemap,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.gradientmap,ht.fog,ht.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ne([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,ht.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ne([ht.points,ht.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ne([ht.common,ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ne([ht.common,ht.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ne([ht.common,ht.bumpmap,ht.normalmap,ht.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ne([ht.sprite,ht.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ne([ht.common,ht.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ne([ht.lights,ht.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};mn.physical={uniforms:Ne([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const gr={r:0,b:0,g:0},ai=new fn,Dm=new Kt;function Lm(i,t,e,n,s,r,a){const o=new Ht(0);let c=r===!0?0:1,l,h,u=null,p=0,d=null;function x(E){let v=E.isScene===!0?E.background:null;return v&&v.isTexture&&(v=(E.backgroundBlurriness>0?e:t).get(v)),v}function g(E){let v=!1;const T=x(E);T===null?f(o,c):T&&T.isColor&&(f(T,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,v){const T=x(v);T&&(T.isCubeTexture||T.mapping===Or)?(h===void 0&&(h=new re(new Je(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:ss(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,D,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ai.copy(v.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Dm.makeRotationFromEuler(ai)),h.material.toneMapped=Qt.getTransfer(T.colorSpace)!==ie,(u!==T||p!==T.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,p=T.version,d=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new re(new Gs(2,2),new jn({name:"BackgroundMaterial",uniforms:ss(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Qt.getTransfer(T.colorSpace)!==ie,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||p!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,p=T.version,d=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function f(E,v){E.getRGB(gr,yh(i)),n.buffers.color.setClear(gr.r,gr.g,gr.b,v,a)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,v=1){o.set(E),c=v,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,f(o,c)},render:g,addToRenderList:m,dispose:b}}function Im(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,a=!1;function o(y,I,B,R,P){let U=!1;const N=u(R,B,I);r!==N&&(r=N,l(r.object)),U=d(y,R,B,P),U&&x(y,R,B,P),P!==null&&t.update(P,i.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,v(y,I,B,R),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(P).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,I,B){const R=B.wireframe===!0;let P=n[y.id];P===void 0&&(P={},n[y.id]=P);let U=P[I.id];U===void 0&&(U={},P[I.id]=U);let N=U[R];return N===void 0&&(N=p(c()),U[R]=N),N}function p(y){const I=[],B=[],R=[];for(let P=0;P<e;P++)I[P]=0,B[P]=0,R[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:R,object:y,attributes:{},index:null}}function d(y,I,B,R){const P=r.attributes,U=I.attributes;let N=0;const q=B.getAttributes();for(const O in q)if(q[O].location>=0){const j=P[O];let et=U[O];if(et===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(et=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(et=y.instanceColor)),j===void 0||j.attribute!==et||et&&j.data!==et.data)return!0;N++}return r.attributesNum!==N||r.index!==R}function x(y,I,B,R){const P={},U=I.attributes;let N=0;const q=B.getAttributes();for(const O in q)if(q[O].location>=0){let j=U[O];j===void 0&&(O==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),O==="instanceColor"&&y.instanceColor&&(j=y.instanceColor));const et={};et.attribute=j,j&&j.data&&(et.data=j.data),P[O]=et,N++}r.attributes=P,r.attributesNum=N,r.index=R}function g(){const y=r.newAttributes;for(let I=0,B=y.length;I<B;I++)y[I]=0}function m(y){f(y,0)}function f(y,I){const B=r.newAttributes,R=r.enabledAttributes,P=r.attributeDivisors;B[y]=1,R[y]===0&&(i.enableVertexAttribArray(y),R[y]=1),P[y]!==I&&(i.vertexAttribDivisor(y,I),P[y]=I)}function b(){const y=r.newAttributes,I=r.enabledAttributes;for(let B=0,R=I.length;B<R;B++)I[B]!==y[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function E(y,I,B,R,P,U,N){N===!0?i.vertexAttribIPointer(y,I,B,P,U):i.vertexAttribPointer(y,I,B,R,P,U)}function v(y,I,B,R){g();const P=R.attributes,U=B.getAttributes(),N=I.defaultAttributeValues;for(const q in U){const O=U[q];if(O.location>=0){let Y=P[q];if(Y===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(Y=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(Y=y.instanceColor)),Y!==void 0){const j=Y.normalized,et=Y.itemSize,Lt=t.get(Y);if(Lt===void 0)continue;const Ut=Lt.buffer,tt=Lt.type,lt=Lt.bytesPerElement,V=tt===i.INT||tt===i.UNSIGNED_INT||Y.gpuType===Bo;if(Y.isInterleavedBufferAttribute){const $=Y.data,at=$.stride,ft=Y.offset;if($.isInstancedInterleavedBuffer){for(let pt=0;pt<O.locationSize;pt++)f(O.location+pt,$.meshPerAttribute);y.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let pt=0;pt<O.locationSize;pt++)m(O.location+pt);i.bindBuffer(i.ARRAY_BUFFER,Ut);for(let pt=0;pt<O.locationSize;pt++)E(O.location+pt,et/O.locationSize,tt,j,at*lt,(ft+et/O.locationSize*pt)*lt,V)}else{if(Y.isInstancedBufferAttribute){for(let $=0;$<O.locationSize;$++)f(O.location+$,Y.meshPerAttribute);y.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let $=0;$<O.locationSize;$++)m(O.location+$);i.bindBuffer(i.ARRAY_BUFFER,Ut);for(let $=0;$<O.locationSize;$++)E(O.location+$,et/O.locationSize,tt,j,et*lt,et/O.locationSize*$*lt,V)}}else if(N!==void 0){const j=N[q];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(O.location,j);break;case 3:i.vertexAttrib3fv(O.location,j);break;case 4:i.vertexAttrib4fv(O.location,j);break;default:i.vertexAttrib1fv(O.location,j)}}}}b()}function T(){L();for(const y in n){const I=n[y];for(const B in I){const R=I[B];for(const P in R)h(R[P].object),delete R[P];delete I[B]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const I=n[y.id];for(const B in I){const R=I[B];for(const P in R)h(R[P].object),delete R[P];delete I[B]}delete n[y.id]}function D(y){for(const I in n){const B=n[I];if(B[y.id]===void 0)continue;const R=B[y.id];for(const P in R)h(R[P].object),delete R[P];delete B[y.id]}}function L(){_(),a=!0,r!==s&&(r=s,l(r.object))}function _(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:_,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:D,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function Um(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function o(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let x=0;x<u;x++)d+=h[x];e.update(d,n,1)}function c(l,h,u,p){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let x=0;x<l.length;x++)a(l[x],h[x],p[x]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,u);let x=0;for(let g=0;g<u;g++)x+=h[g]*p[g];e.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Nm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(D){return!(D!==hn&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const L=D===Bs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==En&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==_n&&!L)}function c(D){if(D==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=x>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:d,maxVertexTextures:x,maxTextureSize:g,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:T,maxSamples:w}}function zm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new ci,o=new Vt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const d=u.length!==0||p||n!==0||s;return s=p,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=h(u,p,0)},this.setState=function(u,p,d){const x=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||x===null||x.length===0||r&&!m)r?h(null):l();else{const b=r?0:n,E=b*4;let v=f.clippingState||null;c.value=v,v=h(x,p,E,d);for(let T=0;T!==E;++T)v[T]=e[T];f.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,p,d,x){const g=u!==null?u.length:0;let m=null;if(g!==0){if(m=c.value,x!==!0||m===null){const f=d+g*4,b=p.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,v=d;E!==g;++E,v+=4)a.copy(u[E]).applyMatrix4(b,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function Fm(i){let t=new WeakMap;function e(a,o){return o===Ya?a.mapping=es:o===$a&&(a.mapping=ns),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ya||o===$a)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Dd(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const $i=4,sl=[.125,.215,.35,.446,.526,.582],di=20,Ea=new kr,rl=new Ht;let wa=null,Ta=0,Aa=0,Ra=!1;const li=(1+Math.sqrt(5))/2,Yi=1/li,al=[new F(-li,Yi,0),new F(li,Yi,0),new F(-Yi,0,li),new F(Yi,0,li),new F(0,li,-Yi),new F(0,li,Yi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],Om=new F;class ol{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Om}=r;wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wa,Ta,Aa),this._renderer.xr.enabled=Ra,t.scissorTest=!1,xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wa=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Aa=this._renderer.getActiveMipmapLevel(),Ra=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Bs,format:hn,colorSpace:is,depthBuffer:!1},s=cl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Bm(r)),this._blurMaterial=km(r,t,e)}return s}_compileMaterial(t){const e=new re(this._lodPlanes[0],t);this._renderer.compile(e,Ea)}_sceneToCubeUV(t,e,n,s,r){const c=new rn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,d=u.toneMapping;u.getClearColor(rl),u.toneMapping=Yn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const g=new xn({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),m=new re(new Je,g);let f=!1;const b=t.background;b?b.isColor&&(g.color.copy(b),t.background=null,f=!0):(g.color.copy(rl),f=!0);for(let E=0;E<6;E++){const v=E%3;v===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):v===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));const T=this._cubeSize;xr(s,v*T,E>2?T:0,T,T),u.setRenderTarget(s),f&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=p,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===es||t.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ll());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new re(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;xr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Ea)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=al[(s-r-1)%al.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new re(this._lodPlanes[s],l),p=l.uniforms,d=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*di-1),g=r/x,m=isFinite(r)?1+Math.floor(h*g):di;m>di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const f=[];let b=0;for(let D=0;D<di;++D){const L=D/g,_=Math.exp(-L*L/2);f.push(_),D===0?b+=_:D<m&&(b+=2*_)}for(let D=0;D<f.length;D++)f[D]=f[D]/b;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);const{_lodMax:E}=this;p.dTheta.value=x,p.mipInt.value=E-n;const v=this._sizeLods[s],T=3*v*(s>E-$i?s-E+$i:0),w=4*(this._cubeSize-v);xr(e,T,w,3*v,2*v),c.setRenderTarget(e),c.render(u,Ea)}}function Bm(i){const t=[],e=[],n=[];let s=i;const r=i-$i+1+sl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-$i?c=sl[a-i+$i-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,p=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,x=6,g=3,m=2,f=1,b=new Float32Array(g*x*d),E=new Float32Array(m*x*d),v=new Float32Array(f*x*d);for(let w=0;w<d;w++){const D=w%3*2/3-1,L=w>2?0:-1,_=[D,L,0,D+2/3,L,0,D+2/3,L+1,0,D,L,0,D+2/3,L+1,0,D,L+1,0];b.set(_,g*x*w),E.set(p,m*x*w);const y=[w,w,w,w,w,w];v.set(y,f*x*w)}const T=new ve;T.setAttribute("position",new Oe(b,g)),T.setAttribute("uv",new Oe(E,m)),T.setAttribute("faceIndex",new Oe(v,f)),t.push(T),s>$i&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function cl(i,t,e){const n=new yi(i,t,e);return n.texture.mapping=Or,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function km(i,t,e){const n=new Float32Array(di),s=new F(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:jo(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function ll(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jo(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function hl(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function jo(){return`

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
	`}function Gm(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Ya||c===$a,h=c===es||c===ns;if(l||h){let u=t.get(o);const p=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new ol(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const d=o.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new ol(i)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Vm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ns("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Hm(i,t,e,n){const s={},r=new WeakMap;function a(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const x in p.attributes)t.remove(p.attributes[x]);p.removeEventListener("dispose",a),delete s[p.id];const d=r.get(p);d&&(t.remove(d),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(u,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function c(u){const p=u.attributes;for(const d in p)t.update(p[d],i.ARRAY_BUFFER)}function l(u){const p=[],d=u.index,x=u.attributes.position;let g=0;if(d!==null){const b=d.array;g=d.version;for(let E=0,v=b.length;E<v;E+=3){const T=b[E+0],w=b[E+1],D=b[E+2];p.push(T,w,w,D,D,T)}}else if(x!==void 0){const b=x.array;g=x.version;for(let E=0,v=b.length/3-1;E<v;E+=3){const T=E+0,w=E+1,D=E+2;p.push(T,w,w,D,D,T)}}else return;const m=new(ph(p)?vh:Mh)(p,1);m.version=g;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){const p=r.get(u);if(p){const d=u.index;d!==null&&p.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function Wm(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function c(p,d){i.drawElements(n,d,r,p*a),e.update(d,n,1)}function l(p,d,x){x!==0&&(i.drawElementsInstanced(n,d,r,p*a,x),e.update(d,n,x))}function h(p,d,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,p,0,x);let m=0;for(let f=0;f<x;f++)m+=d[f];e.update(m,n,1)}function u(p,d,x,g){if(x===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<p.length;f++)l(p[f]/a,d[f],g[f]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,p,0,g,0,x);let f=0;for(let b=0;b<x;b++)f+=d[b]*g[b];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Xm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function qm(i,t,e){const n=new WeakMap,s=new _e;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let p=n.get(o);if(p===void 0||p.count!==u){let _=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",_)};p!==void 0&&p.texture.dispose();const d=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let E=0;d===!0&&(E=1),x===!0&&(E=2),g===!0&&(E=3);let v=o.attributes.position.count*E,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const w=new Float32Array(v*T*4*u),D=new mh(w,v,T,u);D.type=_n,D.needsUpdate=!0;const L=E*4;for(let y=0;y<u;y++){const I=m[y],B=f[y],R=b[y],P=v*T*4*y;for(let U=0;U<I.count;U++){const N=U*L;d===!0&&(s.fromBufferAttribute(I,U),w[P+N+0]=s.x,w[P+N+1]=s.y,w[P+N+2]=s.z,w[P+N+3]=0),x===!0&&(s.fromBufferAttribute(B,U),w[P+N+4]=s.x,w[P+N+5]=s.y,w[P+N+6]=s.z,w[P+N+7]=0),g===!0&&(s.fromBufferAttribute(R,U),w[P+N+8]=s.x,w[P+N+9]=s.y,w[P+N+10]=s.z,w[P+N+11]=R.itemSize===4?s.w:1)}}p={count:u,texture:D,size:new qt(v,T)},n.set(o,p),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let g=0;g<l.length;g++)d+=l[g];const x=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Ym(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const Lh=new De,ul=new Rh(1,1),Ih=new mh,Uh=new pd,Nh=new bh,dl=[],fl=[],pl=new Float32Array(16),ml=new Float32Array(9),gl=new Float32Array(4);function hs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dl[s];if(r===void 0&&(r=new Float32Array(s),dl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function we(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Gr(i,t){let e=fl[t];e===void 0&&(e=new Int32Array(t),fl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function $m(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),we(e,t)}}function Km(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),we(e,t)}}function jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),we(e,t)}}function Jm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,n))return;gl.set(n),i.uniformMatrix2fv(this.addr,!1,gl),we(e,n)}}function Qm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,n))return;ml.set(n),i.uniformMatrix3fv(this.addr,!1,ml),we(e,n)}}function tg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,n))return;pl.set(n),i.uniformMatrix4fv(this.addr,!1,pl),we(e,n)}}function eg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),we(e,t)}}function ig(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),we(e,t)}}function sg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),we(e,t)}}function rg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),we(e,t)}}function og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),we(e,t)}}function cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),we(e,t)}}function lg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(ul.compareFunction=fh,r=ul):r=Lh,e.setTexture2D(t||r,s)}function hg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Uh,s)}function ug(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Nh,s)}function dg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ih,s)}function fg(i){switch(i){case 5126:return $m;case 35664:return Zm;case 35665:return Km;case 35666:return jm;case 35674:return Jm;case 35675:return Qm;case 35676:return tg;case 5124:case 35670:return eg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return sg;case 5125:return rg;case 36294:return ag;case 36295:return og;case 36296:return cg;case 35678:case 36198:case 36298:case 36306:case 35682:return lg;case 35679:case 36299:case 36307:return hg;case 35680:case 36300:case 36308:case 36293:return ug;case 36289:case 36303:case 36311:case 36292:return dg}}function pg(i,t){i.uniform1fv(this.addr,t)}function mg(i,t){const e=hs(t,this.size,2);i.uniform2fv(this.addr,e)}function gg(i,t){const e=hs(t,this.size,3);i.uniform3fv(this.addr,e)}function xg(i,t){const e=hs(t,this.size,4);i.uniform4fv(this.addr,e)}function _g(i,t){const e=hs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Mg(i,t){const e=hs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function vg(i,t){const e=hs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function yg(i,t){i.uniform1iv(this.addr,t)}function Sg(i,t){i.uniform2iv(this.addr,t)}function bg(i,t){i.uniform3iv(this.addr,t)}function Eg(i,t){i.uniform4iv(this.addr,t)}function wg(i,t){i.uniform1uiv(this.addr,t)}function Tg(i,t){i.uniform2uiv(this.addr,t)}function Ag(i,t){i.uniform3uiv(this.addr,t)}function Rg(i,t){i.uniform4uiv(this.addr,t)}function Cg(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Lh,r[a])}function Pg(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Uh,r[a])}function Dg(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Nh,r[a])}function Lg(i,t,e){const n=this.cache,s=t.length,r=Gr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Ih,r[a])}function Ig(i){switch(i){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return xg;case 35674:return _g;case 35675:return Mg;case 35676:return vg;case 5124:case 35670:return yg;case 35667:case 35671:return Sg;case 35668:case 35672:return bg;case 35669:case 35673:return Eg;case 5125:return wg;case 36294:return Tg;case 36295:return Ag;case 36296:return Rg;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Pg;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Lg}}class Ug{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=fg(e.type)}}class Ng{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ig(e.type)}}class zg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Ca=/(\w+)(\])?(\[|\.)?/g;function xl(i,t){i.seq.push(t),i.map[t.id]=t}function Fg(i,t,e){const n=i.name,s=n.length;for(Ca.lastIndex=0;;){const r=Ca.exec(n),a=Ca.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){xl(e,l===void 0?new Ug(o,i,t):new Ng(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new zg(o),xl(e,u)),e=u}}}class Tr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Fg(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function _l(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Og=37297;let Bg=0;function kg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ml=new Vt;function Gg(i){Qt._getMatrix(Ml,Qt.workingColorSpace,i);const t=`mat3( ${Ml.elements.map(e=>e.toFixed(4))} )`;switch(Qt.getTransfer(i)){case Rr:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function vl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+kg(i.getShaderSource(t),o)}else return r}function Vg(i,t){const e=Gg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Hg(i,t){let e;switch(t){case Hu:e="Linear";break;case Wu:e="Reinhard";break;case Xu:e="Cineon";break;case ih:e="ACESFilmic";break;case Yu:e="AgX";break;case $u:e="Neutral";break;case qu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _r=new F;function Wg(){Qt.getLuminanceCoefficients(_r);const i=_r.x.toFixed(4),t=_r.y.toFixed(4),e=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function qg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Yg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ws(i){return i!==""}function yl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const $g=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ao(i){return i.replace($g,Kg)}const Zg=new Map;function Kg(i,t){let e=Yt[t];if(e===void 0){const n=Zg.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ao(e)}const jg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(i){return i.replace(jg,Jg)}function Jg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function El(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Qg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===th?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===eh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ln&&(t="SHADOWMAP_TYPE_VSM"),t}function t0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case es:case ns:t="ENVMAP_TYPE_CUBE";break;case Or:t="ENVMAP_TYPE_CUBE_UV";break}return t}function e0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ns:t="ENVMAP_MODE_REFRACTION";break}return t}function n0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case nh:t="ENVMAP_BLENDING_MULTIPLY";break;case Gu:t="ENVMAP_BLENDING_MIX";break;case Vu:t="ENVMAP_BLENDING_ADD";break}return t}function i0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function s0(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Qg(e),l=t0(e),h=e0(e),u=n0(e),p=i0(e),d=Xg(e),x=qg(r),g=s.createProgram();let m,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(ws).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(ws).join(`
`),f.length>0&&(f+=`
`)):(m=[El(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),f=[El(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yn?"#define TONE_MAPPING":"",e.toneMapping!==Yn?Yt.tonemapping_pars_fragment:"",e.toneMapping!==Yn?Hg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,Vg("linearToOutputTexel",e.outputColorSpace),Wg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),a=Ao(a),a=yl(a,e),a=Sl(a,e),o=Ao(o),o=yl(o,e),o=Sl(o,e),a=bl(a),o=bl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Rc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Rc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=b+m+a,v=b+f+o,T=_l(s,s.VERTEX_SHADER,E),w=_l(s,s.FRAGMENT_SHADER,v);s.attachShader(g,T),s.attachShader(g,w),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function D(I){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(g)||"",R=s.getShaderInfoLog(T)||"",P=s.getShaderInfoLog(w)||"",U=B.trim(),N=R.trim(),q=P.trim();let O=!0,Y=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,T,w);else{const j=vl(s,T,"vertex"),et=vl(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+j+`
`+et)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(N===""||q==="")&&(Y=!1);Y&&(I.diagnostics={runnable:O,programLog:U,vertexShader:{log:N,prefix:m},fragmentShader:{log:q,prefix:f}})}s.deleteShader(T),s.deleteShader(w),L=new Tr(s,g),_=Yg(s,g)}let L;this.getUniforms=function(){return L===void 0&&D(this),L};let _;this.getAttributes=function(){return _===void 0&&D(this),_};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(g,Og)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Bg++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=w,this}let r0=0;class a0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new o0(t),e.set(t,n)),n}}class o0{constructor(t){this.id=r0++,this.code=t,this.usedTimes=0}}function c0(i,t,e,n,s,r,a){const o=new xh,c=new a0,l=new Set,h=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let d=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function m(_,y,I,B,R){const P=B.fog,U=R.geometry,N=_.isMeshStandardMaterial?B.environment:null,q=(_.isMeshStandardMaterial?e:t).get(_.envMap||N),O=q&&q.mapping===Or?q.image.height:null,Y=x[_.type];_.precision!==null&&(d=s.getMaxPrecision(_.precision),d!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const j=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,et=j!==void 0?j.length:0;let Lt=0;U.morphAttributes.position!==void 0&&(Lt=1),U.morphAttributes.normal!==void 0&&(Lt=2),U.morphAttributes.color!==void 0&&(Lt=3);let Ut,tt,lt,V;if(Y){const ee=mn[Y];Ut=ee.vertexShader,tt=ee.fragmentShader}else Ut=_.vertexShader,tt=_.fragmentShader,c.update(_),lt=c.getVertexShaderID(_),V=c.getFragmentShaderID(_);const $=i.getRenderTarget(),at=i.state.buffers.depth.getReversed(),ft=R.isInstancedMesh===!0,pt=R.isBatchedMesh===!0,Wt=!!_.map,Pt=!!_.matcap,C=!!q,Ot=!!_.aoMap,bt=!!_.lightMap,vt=!!_.bumpMap,mt=!!_.normalMap,le=!!_.displacementMap,Mt=!!_.emissiveMap,kt=!!_.metalnessMap,Me=!!_.roughnessMap,ue=_.anisotropy>0,A=_.clearcoat>0,M=_.dispersion>0,H=_.iridescence>0,K=_.sheen>0,Q=_.transmission>0,Z=ue&&!!_.anisotropyMap,Rt=A&&!!_.clearcoatMap,ot=A&&!!_.clearcoatNormalMap,wt=A&&!!_.clearcoatRoughnessMap,Tt=H&&!!_.iridescenceMap,st=H&&!!_.iridescenceThicknessMap,gt=K&&!!_.sheenColorMap,zt=K&&!!_.sheenRoughnessMap,At=!!_.specularMap,ut=!!_.specularColorMap,Xt=!!_.specularIntensityMap,z=Q&&!!_.transmissionMap,rt=Q&&!!_.thicknessMap,ct=!!_.gradientMap,yt=!!_.alphaMap,nt=_.alphaTest>0,J=!!_.alphaHash,Et=!!_.extensions;let Gt=Yn;_.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Gt=i.toneMapping);const he={shaderID:Y,shaderType:_.type,shaderName:_.name,vertexShader:Ut,fragmentShader:tt,defines:_.defines,customVertexShaderID:lt,customFragmentShaderID:V,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:pt,batchingColor:pt&&R._colorsTexture!==null,instancing:ft,instancingColor:ft&&R.instanceColor!==null,instancingMorph:ft&&R.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:$===null?i.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:is,alphaToCoverage:!!_.alphaToCoverage,map:Wt,matcap:Pt,envMap:C,envMapMode:C&&q.mapping,envMapCubeUVHeight:O,aoMap:Ot,lightMap:bt,bumpMap:vt,normalMap:mt,displacementMap:p&&le,emissiveMap:Mt,normalMapObjectSpace:mt&&_.normalMapType===Ju,normalMapTangentSpace:mt&&_.normalMapType===dh,metalnessMap:kt,roughnessMap:Me,anisotropy:ue,anisotropyMap:Z,clearcoat:A,clearcoatMap:Rt,clearcoatNormalMap:ot,clearcoatRoughnessMap:wt,dispersion:M,iridescence:H,iridescenceMap:Tt,iridescenceThicknessMap:st,sheen:K,sheenColorMap:gt,sheenRoughnessMap:zt,specularMap:At,specularColorMap:ut,specularIntensityMap:Xt,transmission:Q,transmissionMap:z,thicknessMap:rt,gradientMap:ct,opaque:_.transparent===!1&&_.blending===Ki&&_.alphaToCoverage===!1,alphaMap:yt,alphaTest:nt,alphaHash:J,combine:_.combine,mapUv:Wt&&g(_.map.channel),aoMapUv:Ot&&g(_.aoMap.channel),lightMapUv:bt&&g(_.lightMap.channel),bumpMapUv:vt&&g(_.bumpMap.channel),normalMapUv:mt&&g(_.normalMap.channel),displacementMapUv:le&&g(_.displacementMap.channel),emissiveMapUv:Mt&&g(_.emissiveMap.channel),metalnessMapUv:kt&&g(_.metalnessMap.channel),roughnessMapUv:Me&&g(_.roughnessMap.channel),anisotropyMapUv:Z&&g(_.anisotropyMap.channel),clearcoatMapUv:Rt&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:ot&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:st&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:zt&&g(_.sheenRoughnessMap.channel),specularMapUv:At&&g(_.specularMap.channel),specularColorMapUv:ut&&g(_.specularColorMap.channel),specularIntensityMapUv:Xt&&g(_.specularIntensityMap.channel),transmissionMapUv:z&&g(_.transmissionMap.channel),thicknessMapUv:rt&&g(_.thicknessMap.channel),alphaMapUv:yt&&g(_.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(mt||ue),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!U.attributes.uv&&(Wt||yt),fog:!!P,useFog:_.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:_.flatShading===!0&&_.wireframe===!1,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:at,skinning:R.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:et,morphTextureStride:Lt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:Gt,decodeVideoTexture:Wt&&_.map.isVideoTexture===!0&&Qt.getTransfer(_.map.colorSpace)===ie,decodeVideoTextureEmissive:Mt&&_.emissiveMap.isVideoTexture===!0&&Qt.getTransfer(_.emissiveMap.colorSpace)===ie,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===be,flipSided:_.side===Ge,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Et&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&_.extensions.multiDraw===!0||pt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return he.vertexUv1s=l.has(1),he.vertexUv2s=l.has(2),he.vertexUv3s=l.has(3),l.clear(),he}function f(_){const y=[];if(_.shaderID?y.push(_.shaderID):(y.push(_.customVertexShaderID),y.push(_.customFragmentShaderID)),_.defines!==void 0)for(const I in _.defines)y.push(I),y.push(_.defines[I]);return _.isRawShaderMaterial===!1&&(b(y,_),E(y,_),y.push(i.outputColorSpace)),y.push(_.customProgramCacheKey),y.join()}function b(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}function E(_,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),_.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),_.push(o.mask)}function v(_){const y=x[_.type];let I;if(y){const B=mn[y];I=Ad.clone(B.uniforms)}else I=_.uniforms;return I}function T(_,y){let I;for(let B=0,R=h.length;B<R;B++){const P=h[B];if(P.cacheKey===y){I=P,++I.usedTimes;break}}return I===void 0&&(I=new s0(i,y,_,r),h.push(I)),I}function w(_){if(--_.usedTimes===0){const y=h.indexOf(_);h[y]=h[h.length-1],h.pop(),_.destroy()}}function D(_){c.remove(_)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:T,releaseProgram:w,releaseShaderCache:D,programs:h,dispose:L}}function l0(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function h0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function wl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Tl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,p,d,x,g,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:p,material:d,groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=p,f.material=d,f.groupOrder=x,f.renderOrder=u.renderOrder,f.z=g,f.group=m),t++,f}function o(u,p,d,x,g,m){const f=a(u,p,d,x,g,m);d.transmission>0?n.push(f):d.transparent===!0?s.push(f):e.push(f)}function c(u,p,d,x,g,m){const f=a(u,p,d,x,g,m);d.transmission>0?n.unshift(f):d.transparent===!0?s.unshift(f):e.unshift(f)}function l(u,p){e.length>1&&e.sort(u||h0),n.length>1&&n.sort(p||wl),s.length>1&&s.sort(p||wl)}function h(){for(let u=t,p=i.length;u<p;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function u0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Tl,i.set(n,[a])):s>=r.length?(a=new Tl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function d0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Ht};break;case"SpotLight":e={position:new F,direction:new F,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function f0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let p0=0;function m0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function g0(i){const t=new d0,e=f0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new Kt,a=new Kt;function o(l){let h=0,u=0,p=0;for(let _=0;_<9;_++)n.probe[_].set(0,0,0);let d=0,x=0,g=0,m=0,f=0,b=0,E=0,v=0,T=0,w=0,D=0;l.sort(m0);for(let _=0,y=l.length;_<y;_++){const I=l[_],B=I.color,R=I.intensity,P=I.distance,U=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=B.r*R,u+=B.g*R,p+=B.b*R;else if(I.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(I.sh.coefficients[N],R);D++}else if(I.isDirectionalLight){const N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const q=I.shadow,O=e.get(I);O.shadowIntensity=q.intensity,O.shadowBias=q.bias,O.shadowNormalBias=q.normalBias,O.shadowRadius=q.radius,O.shadowMapSize=q.mapSize,n.directionalShadow[d]=O,n.directionalShadowMap[d]=U,n.directionalShadowMatrix[d]=I.shadow.matrix,b++}n.directional[d]=N,d++}else if(I.isSpotLight){const N=t.get(I);N.position.setFromMatrixPosition(I.matrixWorld),N.color.copy(B).multiplyScalar(R),N.distance=P,N.coneCos=Math.cos(I.angle),N.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),N.decay=I.decay,n.spot[g]=N;const q=I.shadow;if(I.map&&(n.spotLightMap[T]=I.map,T++,q.updateMatrices(I),I.castShadow&&w++),n.spotLightMatrix[g]=q.matrix,I.castShadow){const O=e.get(I);O.shadowIntensity=q.intensity,O.shadowBias=q.bias,O.shadowNormalBias=q.normalBias,O.shadowRadius=q.radius,O.shadowMapSize=q.mapSize,n.spotShadow[g]=O,n.spotShadowMap[g]=U,v++}g++}else if(I.isRectAreaLight){const N=t.get(I);N.color.copy(B).multiplyScalar(R),N.halfWidth.set(I.width*.5,0,0),N.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=N,m++}else if(I.isPointLight){const N=t.get(I);if(N.color.copy(I.color).multiplyScalar(I.intensity),N.distance=I.distance,N.decay=I.decay,I.castShadow){const q=I.shadow,O=e.get(I);O.shadowIntensity=q.intensity,O.shadowBias=q.bias,O.shadowNormalBias=q.normalBias,O.shadowRadius=q.radius,O.shadowMapSize=q.mapSize,O.shadowCameraNear=q.camera.near,O.shadowCameraFar=q.camera.far,n.pointShadow[x]=O,n.pointShadowMap[x]=U,n.pointShadowMatrix[x]=I.shadow.matrix,E++}n.point[x]=N,x++}else if(I.isHemisphereLight){const N=t.get(I);N.skyColor.copy(I.color).multiplyScalar(R),N.groundColor.copy(I.groundColor).multiplyScalar(R),n.hemi[f]=N,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ht.LTC_FLOAT_1,n.rectAreaLTC2=ht.LTC_FLOAT_2):(n.rectAreaLTC1=ht.LTC_HALF_1,n.rectAreaLTC2=ht.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=p;const L=n.hash;(L.directionalLength!==d||L.pointLength!==x||L.spotLength!==g||L.rectAreaLength!==m||L.hemiLength!==f||L.numDirectionalShadows!==b||L.numPointShadows!==E||L.numSpotShadows!==v||L.numSpotMaps!==T||L.numLightProbes!==D)&&(n.directional.length=d,n.spot.length=g,n.rectArea.length=m,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=D,L.directionalLength=d,L.pointLength=x,L.spotLength=g,L.rectAreaLength=m,L.hemiLength=f,L.numDirectionalShadows=b,L.numPointShadows=E,L.numSpotShadows=v,L.numSpotMaps=T,L.numLightProbes=D,n.version=p0++)}function c(l,h){let u=0,p=0,d=0,x=0,g=0;const m=h.matrixWorldInverse;for(let f=0,b=l.length;f<b;f++){const E=l[f];if(E.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(E.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(E.isRectAreaLight){const v=n.rectArea[x];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(E.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),x++}else if(E.isPointLight){const v=n.point[p];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),p++}else if(E.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:o,setupView:c,state:n}}function Al(i){const t=new g0(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function x0(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Al(i),t.set(s,[o])):r>=a.length?(o=new Al(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const _0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,M0=`uniform sampler2D shadow_pass;
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
}`;function v0(i,t,e){let n=new Br;const s=new qt,r=new qt,a=new _e,o=new Vd({depthPacking:ju}),c=new Hd,l={},h=e.maxTextureSize,u={[Kn]:Ge,[Ge]:Kn,[be]:be},p=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:_0,fragmentShader:M0}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const x=new ve;x.setAttribute("position",new Oe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new re(x,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=th;let f=this.type;this.render=function(w,D,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const _=i.getRenderTarget(),y=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),B=i.state;B.setBlending(qn),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const R=f!==Ln&&this.type===Ln,P=f===Ln&&this.type!==Ln;for(let U=0,N=w.length;U<N;U++){const q=w[U],O=q.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const Y=O.getFrameExtents();if(s.multiply(Y),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,O.mapSize.y=r.y)),O.map===null||R===!0||P===!0){const et=this.type!==Ln?{minFilter:Ye,magFilter:Ye}:{};O.map!==null&&O.map.dispose(),O.map=new yi(s.x,s.y,et),O.map.texture.name=q.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const j=O.getViewportCount();for(let et=0;et<j;et++){const Lt=O.getViewport(et);a.set(r.x*Lt.x,r.y*Lt.y,r.x*Lt.z,r.y*Lt.w),B.viewport(a),O.updateMatrices(q,et),n=O.getFrustum(),v(D,L,O.camera,q,this.type)}O.isPointLightShadow!==!0&&this.type===Ln&&b(O,L),O.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(_,y,I)};function b(w,D){const L=t.update(g);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new yi(s.x,s.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(D,null,L,p,g,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(D,null,L,d,g,null)}function E(w,D,L,_){let y=null;const I=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)y=I;else if(y=L.isPointLight===!0?c:o,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const B=y.uuid,R=D.uuid;let P=l[B];P===void 0&&(P={},l[B]=P);let U=P[R];U===void 0&&(U=y.clone(),P[R]=U,D.addEventListener("dispose",T)),y=U}if(y.visible=D.visible,y.wireframe=D.wireframe,_===Ln?y.side=D.shadowSide!==null?D.shadowSide:D.side:y.side=D.shadowSide!==null?D.shadowSide:u[D.side],y.alphaMap=D.alphaMap,y.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,y.map=D.map,y.clipShadows=D.clipShadows,y.clippingPlanes=D.clippingPlanes,y.clipIntersection=D.clipIntersection,y.displacementMap=D.displacementMap,y.displacementScale=D.displacementScale,y.displacementBias=D.displacementBias,y.wireframeLinewidth=D.wireframeLinewidth,y.linewidth=D.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=i.properties.get(y);B.light=L}return y}function v(w,D,L,_,y){if(w.visible===!1)return;if(w.layers.test(D.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Ln)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const R=t.update(w),P=w.material;if(Array.isArray(P)){const U=R.groups;for(let N=0,q=U.length;N<q;N++){const O=U[N],Y=P[O.materialIndex];if(Y&&Y.visible){const j=E(w,Y,_,y);w.onBeforeShadow(i,w,D,L,R,j,O),i.renderBufferDirect(L,null,R,j,w,O),w.onAfterShadow(i,w,D,L,R,j,O)}}}else if(P.visible){const U=E(w,P,_,y);w.onBeforeShadow(i,w,D,L,R,U,null),i.renderBufferDirect(L,null,R,U,w,null),w.onAfterShadow(i,w,D,L,R,U,null)}}const B=w.children;for(let R=0,P=B.length;R<P;R++)v(B[R],D,L,_,y)}function T(w){w.target.removeEventListener("dispose",T);for(const L in l){const _=l[L],y=w.target.uuid;y in _&&(_[y].dispose(),delete _[y])}}}const y0={[ka]:Ga,[Va]:Xa,[Ha]:qa,[ts]:Wa,[Ga]:ka,[Xa]:Va,[qa]:Ha,[Wa]:ts};function S0(i,t){function e(){let z=!1;const rt=new _e;let ct=null;const yt=new _e(0,0,0,0);return{setMask:function(nt){ct!==nt&&!z&&(i.colorMask(nt,nt,nt,nt),ct=nt)},setLocked:function(nt){z=nt},setClear:function(nt,J,Et,Gt,he){he===!0&&(nt*=Gt,J*=Gt,Et*=Gt),rt.set(nt,J,Et,Gt),yt.equals(rt)===!1&&(i.clearColor(nt,J,Et,Gt),yt.copy(rt))},reset:function(){z=!1,ct=null,yt.set(-1,0,0,0)}}}function n(){let z=!1,rt=!1,ct=null,yt=null,nt=null;return{setReversed:function(J){if(rt!==J){const Et=t.get("EXT_clip_control");J?Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.ZERO_TO_ONE_EXT):Et.clipControlEXT(Et.LOWER_LEFT_EXT,Et.NEGATIVE_ONE_TO_ONE_EXT),rt=J;const Gt=nt;nt=null,this.setClear(Gt)}},getReversed:function(){return rt},setTest:function(J){J?$(i.DEPTH_TEST):at(i.DEPTH_TEST)},setMask:function(J){ct!==J&&!z&&(i.depthMask(J),ct=J)},setFunc:function(J){if(rt&&(J=y0[J]),yt!==J){switch(J){case ka:i.depthFunc(i.NEVER);break;case Ga:i.depthFunc(i.ALWAYS);break;case Va:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case Ha:i.depthFunc(i.EQUAL);break;case Wa:i.depthFunc(i.GEQUAL);break;case Xa:i.depthFunc(i.GREATER);break;case qa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}yt=J}},setLocked:function(J){z=J},setClear:function(J){nt!==J&&(rt&&(J=1-J),i.clearDepth(J),nt=J)},reset:function(){z=!1,ct=null,yt=null,nt=null,rt=!1}}}function s(){let z=!1,rt=null,ct=null,yt=null,nt=null,J=null,Et=null,Gt=null,he=null;return{setTest:function(ee){z||(ee?$(i.STENCIL_TEST):at(i.STENCIL_TEST))},setMask:function(ee){rt!==ee&&!z&&(i.stencilMask(ee),rt=ee)},setFunc:function(ee,wn,pn){(ct!==ee||yt!==wn||nt!==pn)&&(i.stencilFunc(ee,wn,pn),ct=ee,yt=wn,nt=pn)},setOp:function(ee,wn,pn){(J!==ee||Et!==wn||Gt!==pn)&&(i.stencilOp(ee,wn,pn),J=ee,Et=wn,Gt=pn)},setLocked:function(ee){z=ee},setClear:function(ee){he!==ee&&(i.clearStencil(ee),he=ee)},reset:function(){z=!1,rt=null,ct=null,yt=null,nt=null,J=null,Et=null,Gt=null,he=null}}}const r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap;let h={},u={},p=new WeakMap,d=[],x=null,g=!1,m=null,f=null,b=null,E=null,v=null,T=null,w=null,D=new Ht(0,0,0),L=0,_=!1,y=null,I=null,B=null,R=null,P=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,q=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(O)[1]),N=q>=1):O.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),N=q>=2);let Y=null,j={};const et=i.getParameter(i.SCISSOR_BOX),Lt=i.getParameter(i.VIEWPORT),Ut=new _e().fromArray(et),tt=new _e().fromArray(Lt);function lt(z,rt,ct,yt){const nt=new Uint8Array(4),J=i.createTexture();i.bindTexture(z,J),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Et=0;Et<ct;Et++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,yt,0,i.RGBA,i.UNSIGNED_BYTE,nt):i.texImage2D(rt+Et,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,nt);return J}const V={};V[i.TEXTURE_2D]=lt(i.TEXTURE_2D,i.TEXTURE_2D,1),V[i.TEXTURE_CUBE_MAP]=lt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[i.TEXTURE_2D_ARRAY]=lt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),V[i.TEXTURE_3D]=lt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(i.DEPTH_TEST),a.setFunc(ts),vt(!1),mt(bc),$(i.CULL_FACE),Ot(qn);function $(z){h[z]!==!0&&(i.enable(z),h[z]=!0)}function at(z){h[z]!==!1&&(i.disable(z),h[z]=!1)}function ft(z,rt){return u[z]!==rt?(i.bindFramebuffer(z,rt),u[z]=rt,z===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=rt),z===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function pt(z,rt){let ct=d,yt=!1;if(z){ct=p.get(rt),ct===void 0&&(ct=[],p.set(rt,ct));const nt=z.textures;if(ct.length!==nt.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let J=0,Et=nt.length;J<Et;J++)ct[J]=i.COLOR_ATTACHMENT0+J;ct.length=nt.length,yt=!0}}else ct[0]!==i.BACK&&(ct[0]=i.BACK,yt=!0);yt&&i.drawBuffers(ct)}function Wt(z){return x!==z?(i.useProgram(z),x=z,!0):!1}const Pt={[ui]:i.FUNC_ADD,[Eu]:i.FUNC_SUBTRACT,[wu]:i.FUNC_REVERSE_SUBTRACT};Pt[Tu]=i.MIN,Pt[Au]=i.MAX;const C={[Ru]:i.ZERO,[Cu]:i.ONE,[Pu]:i.SRC_COLOR,[Oa]:i.SRC_ALPHA,[zu]:i.SRC_ALPHA_SATURATE,[Uu]:i.DST_COLOR,[Lu]:i.DST_ALPHA,[Du]:i.ONE_MINUS_SRC_COLOR,[Ba]:i.ONE_MINUS_SRC_ALPHA,[Nu]:i.ONE_MINUS_DST_COLOR,[Iu]:i.ONE_MINUS_DST_ALPHA,[Fu]:i.CONSTANT_COLOR,[Ou]:i.ONE_MINUS_CONSTANT_COLOR,[Bu]:i.CONSTANT_ALPHA,[ku]:i.ONE_MINUS_CONSTANT_ALPHA};function Ot(z,rt,ct,yt,nt,J,Et,Gt,he,ee){if(z===qn){g===!0&&(at(i.BLEND),g=!1);return}if(g===!1&&($(i.BLEND),g=!0),z!==bu){if(z!==m||ee!==_){if((f!==ui||v!==ui)&&(i.blendEquation(i.FUNC_ADD),f=ui,v=ui),ee)switch(z){case Ki:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ec:i.blendFunc(i.ONE,i.ONE);break;case wc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Tc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ec:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Tc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}b=null,E=null,T=null,w=null,D.set(0,0,0),L=0,m=z,_=ee}return}nt=nt||rt,J=J||ct,Et=Et||yt,(rt!==f||nt!==v)&&(i.blendEquationSeparate(Pt[rt],Pt[nt]),f=rt,v=nt),(ct!==b||yt!==E||J!==T||Et!==w)&&(i.blendFuncSeparate(C[ct],C[yt],C[J],C[Et]),b=ct,E=yt,T=J,w=Et),(Gt.equals(D)===!1||he!==L)&&(i.blendColor(Gt.r,Gt.g,Gt.b,he),D.copy(Gt),L=he),m=z,_=!1}function bt(z,rt){z.side===be?at(i.CULL_FACE):$(i.CULL_FACE);let ct=z.side===Ge;rt&&(ct=!ct),vt(ct),z.blending===Ki&&z.transparent===!1?Ot(qn):Ot(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);const yt=z.stencilWrite;o.setTest(yt),yt&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Mt(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):at(i.SAMPLE_ALPHA_TO_COVERAGE)}function vt(z){y!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),y=z)}function mt(z){z!==yu?($(i.CULL_FACE),z!==I&&(z===bc?i.cullFace(i.BACK):z===Su?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):at(i.CULL_FACE),I=z}function le(z){z!==B&&(N&&i.lineWidth(z),B=z)}function Mt(z,rt,ct){z?($(i.POLYGON_OFFSET_FILL),(R!==rt||P!==ct)&&(i.polygonOffset(rt,ct),R=rt,P=ct)):at(i.POLYGON_OFFSET_FILL)}function kt(z){z?$(i.SCISSOR_TEST):at(i.SCISSOR_TEST)}function Me(z){z===void 0&&(z=i.TEXTURE0+U-1),Y!==z&&(i.activeTexture(z),Y=z)}function ue(z,rt,ct){ct===void 0&&(Y===null?ct=i.TEXTURE0+U-1:ct=Y);let yt=j[ct];yt===void 0&&(yt={type:void 0,texture:void 0},j[ct]=yt),(yt.type!==z||yt.texture!==rt)&&(Y!==ct&&(i.activeTexture(ct),Y=ct),i.bindTexture(z,rt||V[z]),yt.type=z,yt.texture=rt)}function A(){const z=j[Y];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function H(){try{i.compressedTexImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function K(){try{i.texSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Q(){try{i.texSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Rt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ot(){try{i.texStorage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function wt(){try{i.texStorage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Tt(){try{i.texImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function st(){try{i.texImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function gt(z){Ut.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),Ut.copy(z))}function zt(z){tt.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),tt.copy(z))}function At(z,rt){let ct=l.get(rt);ct===void 0&&(ct=new WeakMap,l.set(rt,ct));let yt=ct.get(z);yt===void 0&&(yt=i.getUniformBlockIndex(rt,z.name),ct.set(z,yt))}function ut(z,rt){const yt=l.get(rt).get(z);c.get(rt)!==yt&&(i.uniformBlockBinding(rt,yt,z.__bindingPointIndex),c.set(rt,yt))}function Xt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Y=null,j={},u={},p=new WeakMap,d=[],x=null,g=!1,m=null,f=null,b=null,E=null,v=null,T=null,w=null,D=new Ht(0,0,0),L=0,_=!1,y=null,I=null,B=null,R=null,P=null,Ut.set(0,0,i.canvas.width,i.canvas.height),tt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:$,disable:at,bindFramebuffer:ft,drawBuffers:pt,useProgram:Wt,setBlending:Ot,setMaterial:bt,setFlipSided:vt,setCullFace:mt,setLineWidth:le,setPolygonOffset:Mt,setScissorTest:kt,activeTexture:Me,bindTexture:ue,unbindTexture:A,compressedTexImage2D:M,compressedTexImage3D:H,texImage2D:Tt,texImage3D:st,updateUBOMapping:At,uniformBlockBinding:ut,texStorage2D:ot,texStorage3D:wt,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:Z,compressedTexSubImage3D:Rt,scissor:gt,viewport:zt,reset:Xt}}function b0(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new qt,h=new WeakMap;let u;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,M){return d?new OffscreenCanvas(A,M):Dr("canvas")}function g(A,M,H){let K=1;const Q=ue(A);if((Q.width>H||Q.height>H)&&(K=H/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(K*Q.width),Rt=Math.floor(K*Q.height);u===void 0&&(u=x(Z,Rt));const ot=M?x(Z,Rt):u;return ot.width=Z,ot.height=Rt,ot.getContext("2d").drawImage(A,0,0,Z,Rt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Z+"x"+Rt+")."),ot}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){i.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(A,M,H,K,Q=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=M;if(M===i.RED&&(H===i.FLOAT&&(Z=i.R32F),H===i.HALF_FLOAT&&(Z=i.R16F),H===i.UNSIGNED_BYTE&&(Z=i.R8)),M===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.R8UI),H===i.UNSIGNED_SHORT&&(Z=i.R16UI),H===i.UNSIGNED_INT&&(Z=i.R32UI),H===i.BYTE&&(Z=i.R8I),H===i.SHORT&&(Z=i.R16I),H===i.INT&&(Z=i.R32I)),M===i.RG&&(H===i.FLOAT&&(Z=i.RG32F),H===i.HALF_FLOAT&&(Z=i.RG16F),H===i.UNSIGNED_BYTE&&(Z=i.RG8)),M===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RG8UI),H===i.UNSIGNED_SHORT&&(Z=i.RG16UI),H===i.UNSIGNED_INT&&(Z=i.RG32UI),H===i.BYTE&&(Z=i.RG8I),H===i.SHORT&&(Z=i.RG16I),H===i.INT&&(Z=i.RG32I)),M===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),H===i.UNSIGNED_INT&&(Z=i.RGB32UI),H===i.BYTE&&(Z=i.RGB8I),H===i.SHORT&&(Z=i.RGB16I),H===i.INT&&(Z=i.RGB32I)),M===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),H===i.UNSIGNED_INT&&(Z=i.RGBA32UI),H===i.BYTE&&(Z=i.RGBA8I),H===i.SHORT&&(Z=i.RGBA16I),H===i.INT&&(Z=i.RGBA32I)),M===i.RGB&&(H===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),M===i.RGBA){const Rt=Q?Rr:Qt.getTransfer(K);H===i.FLOAT&&(Z=i.RGBA32F),H===i.HALF_FLOAT&&(Z=i.RGBA16F),H===i.UNSIGNED_BYTE&&(Z=Rt===ie?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function v(A,M){let H;return A?M===null||M===vi||M===Ls?H=i.DEPTH24_STENCIL8:M===_n?H=i.DEPTH32F_STENCIL8:M===Ds&&(H=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===vi||M===Ls?H=i.DEPTH_COMPONENT24:M===_n?H=i.DEPTH_COMPONENT32F:M===Ds&&(H=i.DEPTH_COMPONENT16),H}function T(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ye&&A.minFilter!==ln?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function w(A){const M=A.target;M.removeEventListener("dispose",w),L(M),M.isVideoTexture&&h.delete(M)}function D(A){const M=A.target;M.removeEventListener("dispose",D),y(M)}function L(A){const M=n.get(A);if(M.__webglInit===void 0)return;const H=A.source,K=p.get(H);if(K){const Q=K[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&_(A),Object.keys(K).length===0&&p.delete(H)}n.remove(A)}function _(A){const M=n.get(A);i.deleteTexture(M.__webglTexture);const H=A.source,K=p.get(H);delete K[M.__cacheKey],a.memory.textures--}function y(A){const M=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(M.__webglFramebuffer[K]))for(let Q=0;Q<M.__webglFramebuffer[K].length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[K][Q]);else i.deleteFramebuffer(M.__webglFramebuffer[K]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[K])}else{if(Array.isArray(M.__webglFramebuffer))for(let K=0;K<M.__webglFramebuffer.length;K++)i.deleteFramebuffer(M.__webglFramebuffer[K]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let K=0;K<M.__webglColorRenderbuffer.length;K++)M.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[K]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=A.textures;for(let K=0,Q=H.length;K<Q;K++){const Z=n.get(H[K]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(H[K])}n.remove(A)}let I=0;function B(){I=0}function R(){const A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function P(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function U(A,M){const H=n.get(A);if(A.isVideoTexture&&kt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&H.__version!==A.version){const K=A.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(H,A,M);return}}else A.isExternalTexture&&(H.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+M)}function N(A,M){const H=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){V(H,A,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+M)}function q(A,M){const H=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&H.__version!==A.version){V(H,A,M);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+M)}function O(A,M){const H=n.get(A);if(A.version>0&&H.__version!==A.version){$(H,A,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+M)}const Y={[Un]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[Za]:i.MIRRORED_REPEAT},j={[Ye]:i.NEAREST,[Zu]:i.NEAREST_MIPMAP_NEAREST,[qs]:i.NEAREST_MIPMAP_LINEAR,[ln]:i.LINEAR,[Kr]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},et={[Qu]:i.NEVER,[rd]:i.ALWAYS,[td]:i.LESS,[fh]:i.LEQUAL,[ed]:i.EQUAL,[sd]:i.GEQUAL,[nd]:i.GREATER,[id]:i.NOTEQUAL};function Lt(A,M){if(M.type===_n&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===ln||M.magFilter===Kr||M.magFilter===qs||M.magFilter===pi||M.minFilter===ln||M.minFilter===Kr||M.minFilter===qs||M.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Y[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Y[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Y[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,j[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,j[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,et[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ye||M.minFilter!==qs&&M.minFilter!==pi||M.type===_n&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ut(A,M){let H=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",w));const K=M.source;let Q=p.get(K);Q===void 0&&(Q={},p.set(K,Q));const Z=P(M);if(Z!==A.__cacheKey){Q[Z]===void 0&&(Q[Z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,H=!0),Q[Z].usedTimes++;const Rt=Q[A.__cacheKey];Rt!==void 0&&(Q[A.__cacheKey].usedTimes--,Rt.usedTimes===0&&_(M)),A.__cacheKey=Z,A.__webglTexture=Q[Z].texture}return H}function tt(A,M,H){return Math.floor(Math.floor(A/H)/M)}function lt(A,M,H,K){const Z=A.updateRanges;if(Z.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,H,K,M.data);else{Z.sort((st,gt)=>st.start-gt.start);let Rt=0;for(let st=1;st<Z.length;st++){const gt=Z[Rt],zt=Z[st],At=gt.start+gt.count,ut=tt(zt.start,M.width,4),Xt=tt(gt.start,M.width,4);zt.start<=At+1&&ut===Xt&&tt(zt.start+zt.count-1,M.width,4)===ut?gt.count=Math.max(gt.count,zt.start+zt.count-gt.start):(++Rt,Z[Rt]=zt)}Z.length=Rt+1;const ot=i.getParameter(i.UNPACK_ROW_LENGTH),wt=i.getParameter(i.UNPACK_SKIP_PIXELS),Tt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let st=0,gt=Z.length;st<gt;st++){const zt=Z[st],At=Math.floor(zt.start/4),ut=Math.ceil(zt.count/4),Xt=At%M.width,z=Math.floor(At/M.width),rt=ut,ct=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Xt),i.pixelStorei(i.UNPACK_SKIP_ROWS,z),e.texSubImage2D(i.TEXTURE_2D,0,Xt,z,rt,ct,H,K,M.data)}A.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ot),i.pixelStorei(i.UNPACK_SKIP_PIXELS,wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Tt)}}function V(A,M,H){let K=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(K=i.TEXTURE_3D);const Q=Ut(A,M),Z=M.source;e.bindTexture(K,A.__webglTexture,i.TEXTURE0+H);const Rt=n.get(Z);if(Z.version!==Rt.__version||Q===!0){e.activeTexture(i.TEXTURE0+H);const ot=Qt.getPrimaries(Qt.workingColorSpace),wt=M.colorSpace===Hn?null:Qt.getPrimaries(M.colorSpace),Tt=M.colorSpace===Hn||ot===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let st=g(M.image,!1,s.maxTextureSize);st=Me(M,st);const gt=r.convert(M.format,M.colorSpace),zt=r.convert(M.type);let At=E(M.internalFormat,gt,zt,M.colorSpace,M.isVideoTexture);Lt(K,M);let ut;const Xt=M.mipmaps,z=M.isVideoTexture!==!0,rt=Rt.__version===void 0||Q===!0,ct=Z.dataReady,yt=T(M,st);if(M.isDepthTexture)At=v(M.format===Us,M.type),rt&&(z?e.texStorage2D(i.TEXTURE_2D,1,At,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,At,st.width,st.height,0,gt,zt,null));else if(M.isDataTexture)if(Xt.length>0){z&&rt&&e.texStorage2D(i.TEXTURE_2D,yt,At,Xt[0].width,Xt[0].height);for(let nt=0,J=Xt.length;nt<J;nt++)ut=Xt[nt],z?ct&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,ut.width,ut.height,gt,zt,ut.data):e.texImage2D(i.TEXTURE_2D,nt,At,ut.width,ut.height,0,gt,zt,ut.data);M.generateMipmaps=!1}else z?(rt&&e.texStorage2D(i.TEXTURE_2D,yt,At,st.width,st.height),ct&&lt(M,st,gt,zt)):e.texImage2D(i.TEXTURE_2D,0,At,st.width,st.height,0,gt,zt,st.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){z&&rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,At,Xt[0].width,Xt[0].height,st.depth);for(let nt=0,J=Xt.length;nt<J;nt++)if(ut=Xt[nt],M.format!==hn)if(gt!==null)if(z){if(ct)if(M.layerUpdates.size>0){const Et=il(ut.width,ut.height,M.format,M.type);for(const Gt of M.layerUpdates){const he=ut.data.subarray(Gt*Et/ut.data.BYTES_PER_ELEMENT,(Gt+1)*Et/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,Gt,ut.width,ut.height,1,gt,he)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,ut.width,ut.height,st.depth,gt,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,nt,At,ut.width,ut.height,st.depth,0,ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?ct&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,ut.width,ut.height,st.depth,gt,zt,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,nt,At,ut.width,ut.height,st.depth,0,gt,zt,ut.data)}else{z&&rt&&e.texStorage2D(i.TEXTURE_2D,yt,At,Xt[0].width,Xt[0].height);for(let nt=0,J=Xt.length;nt<J;nt++)ut=Xt[nt],M.format!==hn?gt!==null?z?ct&&e.compressedTexSubImage2D(i.TEXTURE_2D,nt,0,0,ut.width,ut.height,gt,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,nt,At,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?ct&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,ut.width,ut.height,gt,zt,ut.data):e.texImage2D(i.TEXTURE_2D,nt,At,ut.width,ut.height,0,gt,zt,ut.data)}else if(M.isDataArrayTexture)if(z){if(rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,At,st.width,st.height,st.depth),ct)if(M.layerUpdates.size>0){const nt=il(st.width,st.height,M.format,M.type);for(const J of M.layerUpdates){const Et=st.data.subarray(J*nt/st.data.BYTES_PER_ELEMENT,(J+1)*nt/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,st.width,st.height,1,gt,zt,Et)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,gt,zt,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,At,st.width,st.height,st.depth,0,gt,zt,st.data);else if(M.isData3DTexture)z?(rt&&e.texStorage3D(i.TEXTURE_3D,yt,At,st.width,st.height,st.depth),ct&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,gt,zt,st.data)):e.texImage3D(i.TEXTURE_3D,0,At,st.width,st.height,st.depth,0,gt,zt,st.data);else if(M.isFramebufferTexture){if(rt)if(z)e.texStorage2D(i.TEXTURE_2D,yt,At,st.width,st.height);else{let nt=st.width,J=st.height;for(let Et=0;Et<yt;Et++)e.texImage2D(i.TEXTURE_2D,Et,At,nt,J,0,gt,zt,null),nt>>=1,J>>=1}}else if(Xt.length>0){if(z&&rt){const nt=ue(Xt[0]);e.texStorage2D(i.TEXTURE_2D,yt,At,nt.width,nt.height)}for(let nt=0,J=Xt.length;nt<J;nt++)ut=Xt[nt],z?ct&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,gt,zt,ut):e.texImage2D(i.TEXTURE_2D,nt,At,gt,zt,ut);M.generateMipmaps=!1}else if(z){if(rt){const nt=ue(st);e.texStorage2D(i.TEXTURE_2D,yt,At,nt.width,nt.height)}ct&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,zt,st)}else e.texImage2D(i.TEXTURE_2D,0,At,gt,zt,st);m(M)&&f(K),Rt.__version=Z.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function $(A,M,H){if(M.image.length!==6)return;const K=Ut(A,M),Q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+H);const Z=n.get(Q);if(Q.version!==Z.__version||K===!0){e.activeTexture(i.TEXTURE0+H);const Rt=Qt.getPrimaries(Qt.workingColorSpace),ot=M.colorSpace===Hn?null:Qt.getPrimaries(M.colorSpace),wt=M.colorSpace===Hn||Rt===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Tt=M.isCompressedTexture||M.image[0].isCompressedTexture,st=M.image[0]&&M.image[0].isDataTexture,gt=[];for(let J=0;J<6;J++)!Tt&&!st?gt[J]=g(M.image[J],!0,s.maxCubemapSize):gt[J]=st?M.image[J].image:M.image[J],gt[J]=Me(M,gt[J]);const zt=gt[0],At=r.convert(M.format,M.colorSpace),ut=r.convert(M.type),Xt=E(M.internalFormat,At,ut,M.colorSpace),z=M.isVideoTexture!==!0,rt=Z.__version===void 0||K===!0,ct=Q.dataReady;let yt=T(M,zt);Lt(i.TEXTURE_CUBE_MAP,M);let nt;if(Tt){z&&rt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,Xt,zt.width,zt.height);for(let J=0;J<6;J++){nt=gt[J].mipmaps;for(let Et=0;Et<nt.length;Et++){const Gt=nt[Et];M.format!==hn?At!==null?z?ct&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,0,0,Gt.width,Gt.height,At,Gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,Xt,Gt.width,Gt.height,0,Gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,0,0,Gt.width,Gt.height,At,ut,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et,Xt,Gt.width,Gt.height,0,At,ut,Gt.data)}}}else{if(nt=M.mipmaps,z&&rt){nt.length>0&&yt++;const J=ue(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,yt,Xt,J.width,J.height)}for(let J=0;J<6;J++)if(st){z?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,gt[J].width,gt[J].height,At,ut,gt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,gt[J].width,gt[J].height,0,At,ut,gt[J].data);for(let Et=0;Et<nt.length;Et++){const he=nt[Et].image[J].image;z?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,0,0,he.width,he.height,At,ut,he.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,Xt,he.width,he.height,0,At,ut,he.data)}}else{z?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,At,ut,gt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Xt,At,ut,gt[J]);for(let Et=0;Et<nt.length;Et++){const Gt=nt[Et];z?ct&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,0,0,At,ut,Gt.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,Et+1,Xt,At,ut,Gt.image[J])}}}m(M)&&f(i.TEXTURE_CUBE_MAP),Z.__version=Q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function at(A,M,H,K,Q,Z){const Rt=r.convert(H.format,H.colorSpace),ot=r.convert(H.type),wt=E(H.internalFormat,Rt,ot,H.colorSpace),Tt=n.get(M),st=n.get(H);if(st.__renderTarget=M,!Tt.__hasExternalTextures){const gt=Math.max(1,M.width>>Z),zt=Math.max(1,M.height>>Z);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,Z,wt,gt,zt,M.depth,0,Rt,ot,null):e.texImage2D(Q,Z,wt,gt,zt,0,Rt,ot,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),Mt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Q,st.__webglTexture,0,le(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,Q,st.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(A,M,H){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){const K=M.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Z=v(M.stencilBuffer,Q),Rt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=le(M);Mt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ot,Z,M.width,M.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,ot,Z,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Z,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Rt,i.RENDERBUFFER,A)}else{const K=M.textures;for(let Q=0;Q<K.length;Q++){const Z=K[Q],Rt=r.convert(Z.format,Z.colorSpace),ot=r.convert(Z.type),wt=E(Z.internalFormat,Rt,ot,Z.colorSpace),Tt=le(M);H&&Mt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,wt,M.width,M.height):Mt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt,wt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,wt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(M.depthTexture);K.__renderTarget=M,(!K.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),U(M.depthTexture,0);const Q=K.__webglTexture,Z=le(M);if(M.depthTexture.format===Is)Mt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(M.depthTexture.format===Us)Mt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Wt(A){const M=n.get(A),H=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const K=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),K){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=K}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const K=A.texture.mipmaps;K&&K.length>0?pt(M.__webglFramebuffer[0],A):pt(M.__webglFramebuffer,A)}else if(H){M.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[K]),M.__webglDepthbuffer[K]===void 0)M.__webglDepthbuffer[K]=i.createRenderbuffer(),ft(M.__webglDepthbuffer[K],A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Z)}}else{const K=A.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ft(M.__webglDepthbuffer,A,!1);else{const Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,Z)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(A,M,H){const K=n.get(A);M!==void 0&&at(K.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&Wt(A)}function C(A){const M=A.texture,H=n.get(A),K=n.get(M);A.addEventListener("dispose",D);const Q=A.textures,Z=A.isWebGLCubeRenderTarget===!0,Rt=Q.length>1;if(Rt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=M.version,a.memory.textures++),Z){H.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[ot]=[];for(let wt=0;wt<M.mipmaps.length;wt++)H.__webglFramebuffer[ot][wt]=i.createFramebuffer()}else H.__webglFramebuffer[ot]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let ot=0;ot<M.mipmaps.length;ot++)H.__webglFramebuffer[ot]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(Rt)for(let ot=0,wt=Q.length;ot<wt;ot++){const Tt=n.get(Q[ot]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&Mt(A)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let ot=0;ot<Q.length;ot++){const wt=Q[ot];H.__webglColorRenderbuffer[ot]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[ot]);const Tt=r.convert(wt.format,wt.colorSpace),st=r.convert(wt.type),gt=E(wt.internalFormat,Tt,st,wt.colorSpace,A.isXRRenderTarget===!0),zt=le(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,gt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,H.__webglColorRenderbuffer[ot])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(H.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Lt(i.TEXTURE_CUBE_MAP,M);for(let ot=0;ot<6;ot++)if(M.mipmaps&&M.mipmaps.length>0)for(let wt=0;wt<M.mipmaps.length;wt++)at(H.__webglFramebuffer[ot][wt],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,wt);else at(H.__webglFramebuffer[ot],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(M)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Rt){for(let ot=0,wt=Q.length;ot<wt;ot++){const Tt=Q[ot],st=n.get(Tt);let gt=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(gt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(gt,st.__webglTexture),Lt(gt,Tt),at(H.__webglFramebuffer,A,Tt,i.COLOR_ATTACHMENT0+ot,gt,0),m(Tt)&&f(gt)}e.unbindTexture()}else{let ot=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ot=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ot,K.__webglTexture),Lt(ot,M),M.mipmaps&&M.mipmaps.length>0)for(let wt=0;wt<M.mipmaps.length;wt++)at(H.__webglFramebuffer[wt],A,M,i.COLOR_ATTACHMENT0,ot,wt);else at(H.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,ot,0);m(M)&&f(ot),e.unbindTexture()}A.depthBuffer&&Wt(A)}function Ot(A){const M=A.textures;for(let H=0,K=M.length;H<K;H++){const Q=M[H];if(m(Q)){const Z=b(A),Rt=n.get(Q).__webglTexture;e.bindTexture(Z,Rt),f(Z),e.unbindTexture()}}}const bt=[],vt=[];function mt(A){if(A.samples>0){if(Mt(A)===!1){const M=A.textures,H=A.width,K=A.height;let Q=i.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Rt=n.get(A),ot=M.length>1;if(ot)for(let Tt=0;Tt<M.length;Tt++)e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer);const wt=A.texture.mipmaps;wt&&wt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglFramebuffer);for(let Tt=0;Tt<M.length;Tt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),ot){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);const st=n.get(M[Tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,st,0)}i.blitFramebuffer(0,0,H,K,0,0,H,K,Q,i.NEAREST),c===!0&&(bt.length=0,vt.length=0,bt.push(i.COLOR_ATTACHMENT0+Tt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(bt.push(Z),vt.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,vt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,bt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ot)for(let Tt=0;Tt<M.length;Tt++){e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,Rt.__webglColorRenderbuffer[Tt]);const st=n.get(M[Tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Rt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,st,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Rt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function le(A){return Math.min(s.maxSamples,A.samples)}function Mt(A){const M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function kt(A){const M=a.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function Me(A,M){const H=A.colorSpace,K=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||H!==is&&H!==Hn&&(Qt.getTransfer(H)===ie?(K!==hn||Q!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function ue(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=R,this.resetTextureUnits=B,this.setTexture2D=U,this.setTexture2DArray=N,this.setTexture3D=q,this.setTextureCube=O,this.rebindTextures=Pt,this.setupRenderTarget=C,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=mt,this.setupDepthRenderbuffer=Wt,this.setupFrameBufferTexture=at,this.useMultisampledRTT=Mt}function E0(i,t){function e(n,s=Hn){let r;const a=Qt.getTransfer(s);if(n===En)return i.UNSIGNED_BYTE;if(n===ko)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Go)return i.UNSIGNED_SHORT_5_5_5_1;if(n===oh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ch)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===rh)return i.BYTE;if(n===ah)return i.SHORT;if(n===Ds)return i.UNSIGNED_SHORT;if(n===Bo)return i.INT;if(n===vi)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Bs)return i.HALF_FLOAT;if(n===lh)return i.ALPHA;if(n===hh)return i.RGB;if(n===hn)return i.RGBA;if(n===Is)return i.DEPTH_COMPONENT;if(n===Us)return i.DEPTH_STENCIL;if(n===Vo)return i.RED;if(n===Ho)return i.RED_INTEGER;if(n===uh)return i.RG;if(n===Wo)return i.RG_INTEGER;if(n===Xo)return i.RGBA_INTEGER;if(n===Sr||n===br||n===Er||n===wr)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ka||n===ja||n===Ja||n===Qa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ja)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===to||n===eo||n===no)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===to||n===eo)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===no)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===io||n===so||n===ro||n===ao||n===oo||n===co||n===lo||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===xo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===io)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===so)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ro)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ao)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===co)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ho)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===uo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===po)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===go)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_o||n===Mo||n===vo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===_o)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yo||n===So||n===bo||n===Eo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===yo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===So)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Eo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ls?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const w0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T0=`
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

}`;class A0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Ch(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new jn({vertexShader:w0,fragmentShader:T0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new re(new Gs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class R0 extends cs{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,p=null,d=null,x=null;const g=typeof XRWebGLBinding<"u",m=new A0,f={},b=e.getContextAttributes();let E=null,v=null;const T=[],w=[],D=new qt;let L=null;const _=new rn;_.viewport=new _e;const y=new rn;y.viewport=new _e;const I=[_,y],B=new $d;let R=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let $=T[V];return $===void 0&&($=new Ma,T[V]=$),$.getTargetRaySpace()},this.getControllerGrip=function(V){let $=T[V];return $===void 0&&($=new Ma,T[V]=$),$.getGripSpace()},this.getHand=function(V){let $=T[V];return $===void 0&&($=new Ma,T[V]=$),$.getHandSpace()};function U(V){const $=w.indexOf(V.inputSource);if($===-1)return;const at=T[$];at!==void 0&&(at.update(V.inputSource,V.frame,l||a),at.dispatchEvent({type:V.type,data:V.inputSource}))}function N(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",q);for(let V=0;V<T.length;V++){const $=w[V];$!==null&&(w[V]=null,T[V].disconnect($))}R=null,P=null,m.reset();for(const V in f)delete f[V];t.setRenderTarget(E),d=null,p=null,u=null,s=null,v=null,lt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",N),s.addEventListener("inputsourceschange",q),b.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(D),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let at=null,ft=null,pt=null;b.depth&&(pt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,at=b.stencil?Us:Is,ft=b.stencil?Ls:vi);const Wt={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(Wt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),v=new yi(p.textureWidth,p.textureHeight,{format:hn,type:En,depthTexture:new Rh(p.textureWidth,p.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,at),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const at={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,at),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new yi(d.framebufferWidth,d.framebufferHeight,{format:hn,type:En,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),lt.setContext(s),lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(V){for(let $=0;$<V.removed.length;$++){const at=V.removed[$],ft=w.indexOf(at);ft>=0&&(w[ft]=null,T[ft].disconnect(at))}for(let $=0;$<V.added.length;$++){const at=V.added[$];let ft=w.indexOf(at);if(ft===-1){for(let Wt=0;Wt<T.length;Wt++)if(Wt>=w.length){w.push(at),ft=Wt;break}else if(w[Wt]===null){w[Wt]=at,ft=Wt;break}if(ft===-1)break}const pt=T[ft];pt&&pt.connect(at)}}const O=new F,Y=new F;function j(V,$,at){O.setFromMatrixPosition($.matrixWorld),Y.setFromMatrixPosition(at.matrixWorld);const ft=O.distanceTo(Y),pt=$.projectionMatrix.elements,Wt=at.projectionMatrix.elements,Pt=pt[14]/(pt[10]-1),C=pt[14]/(pt[10]+1),Ot=(pt[9]+1)/pt[5],bt=(pt[9]-1)/pt[5],vt=(pt[8]-1)/pt[0],mt=(Wt[8]+1)/Wt[0],le=Pt*vt,Mt=Pt*mt,kt=ft/(-vt+mt),Me=kt*-vt;if($.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Me),V.translateZ(kt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),pt[10]===-1)V.projectionMatrix.copy($.projectionMatrix),V.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const ue=Pt+kt,A=C+kt,M=le-Me,H=Mt+(ft-Me),K=Ot*C/A*ue,Q=bt*C/A*ue;V.projectionMatrix.makePerspective(M,H,K,Q,ue,A),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function et(V,$){$===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices($.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let $=V.near,at=V.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(at=m.depthFar)),B.near=y.near=_.near=$,B.far=y.far=_.far=at,(R!==B.near||P!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),R=B.near,P=B.far),B.layers.mask=V.layers.mask|6,_.layers.mask=B.layers.mask&3,y.layers.mask=B.layers.mask&5;const ft=V.parent,pt=B.cameras;et(B,ft);for(let Wt=0;Wt<pt.length;Wt++)et(pt[Wt],ft);pt.length===2?j(B,_,y):B.projectionMatrix.copy(_.projectionMatrix),Lt(V,B,ft)};function Lt(V,$,at){at===null?V.matrix.copy($.matrixWorld):(V.matrix.copy(at.matrixWorld),V.matrix.invert(),V.matrix.multiply($.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy($.projectionMatrix),V.projectionMatrixInverse.copy($.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=To*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(p===null&&d===null))return c},this.setFoveation=function(V){c=V,p!==null&&(p.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(V){return f[V]};let Ut=null;function tt(V,$){if(h=$.getViewerPose(l||a),x=$,h!==null){const at=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let ft=!1;at.length!==B.cameras.length&&(B.cameras.length=0,ft=!0);for(let C=0;C<at.length;C++){const Ot=at[C];let bt=null;if(d!==null)bt=d.getViewport(Ot);else{const mt=u.getViewSubImage(p,Ot);bt=mt.viewport,C===0&&(t.setRenderTargetTextures(v,mt.colorTexture,mt.depthStencilTexture),t.setRenderTarget(v))}let vt=I[C];vt===void 0&&(vt=new rn,vt.layers.enable(C),vt.viewport=new _e,I[C]=vt),vt.matrix.fromArray(Ot.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(Ot.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set(bt.x,bt.y,bt.width,bt.height),C===0&&(B.matrix.copy(vt.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ft===!0&&B.cameras.push(vt)}const pt=s.enabledFeatures;if(pt&&pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const C=u.getDepthInformation(at[0]);C&&C.isValid&&C.texture&&m.init(C,s.renderState)}if(pt&&pt.includes("camera-access")&&g){t.state.unbindTexture(),u=n.getBinding();for(let C=0;C<at.length;C++){const Ot=at[C].camera;if(Ot){let bt=f[Ot];bt||(bt=new Ch,f[Ot]=bt);const vt=u.getCameraImage(Ot);bt.sourceTexture=vt}}}}for(let at=0;at<T.length;at++){const ft=w[at],pt=T[at];ft!==null&&pt!==void 0&&pt.update(ft,$,l||a)}Ut&&Ut(V,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),x=null}const lt=new Dh;lt.setAnimationLoop(tt),this.setAnimationLoop=function(V){Ut=V},this.dispose=function(){}}}const oi=new fn,C0=new Kt;function P0(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,yh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,b,E,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),p(m,f),f.isMeshPhysicalMaterial&&d(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),x(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),g(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,b,E):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ge&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ge&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const b=t.get(f),E=b.envMap,v=b.envMapRotation;E&&(m.envMap.value=E,oi.copy(v),oi.x*=-1,oi.y*=-1,oi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),m.envMapRotation.value.setFromMatrix4(C0.makeRotationFromEuler(oi)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,b,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*b,m.scale.value=E*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,b){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ge&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){const b=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function D0(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,E){const v=E.program;n.uniformBlockBinding(b,v)}function l(b,E){let v=s[b.id];v===void 0&&(x(b),v=h(b),s[b.id]=v,b.addEventListener("dispose",m));const T=E.program;n.updateUBOMapping(b,T);const w=t.render.frame;r[b.id]!==w&&(p(b),r[b.id]=w)}function h(b){const E=u();b.__bindingPointIndex=E;const v=i.createBuffer(),T=b.__size,w=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const E=s[b.id],v=b.uniforms,T=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,D=v.length;w<D;w++){const L=Array.isArray(v[w])?v[w]:[v[w]];for(let _=0,y=L.length;_<y;_++){const I=L[_];if(d(I,w,_,T)===!0){const B=I.__offset,R=Array.isArray(I.value)?I.value:[I.value];let P=0;for(let U=0;U<R.length;U++){const N=R[U],q=g(N);typeof N=="number"||typeof N=="boolean"?(I.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,B+P,I.__data)):N.isMatrix3?(I.__data[0]=N.elements[0],I.__data[1]=N.elements[1],I.__data[2]=N.elements[2],I.__data[3]=0,I.__data[4]=N.elements[3],I.__data[5]=N.elements[4],I.__data[6]=N.elements[5],I.__data[7]=0,I.__data[8]=N.elements[6],I.__data[9]=N.elements[7],I.__data[10]=N.elements[8],I.__data[11]=0):(N.toArray(I.__data,P),P+=q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(b,E,v,T){const w=b.value,D=E+"_"+v;if(T[D]===void 0)return typeof w=="number"||typeof w=="boolean"?T[D]=w:T[D]=w.clone(),!0;{const L=T[D];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return T[D]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function x(b){const E=b.uniforms;let v=0;const T=16;for(let D=0,L=E.length;D<L;D++){const _=Array.isArray(E[D])?E[D]:[E[D]];for(let y=0,I=_.length;y<I;y++){const B=_[y],R=Array.isArray(B.value)?B.value:[B.value];for(let P=0,U=R.length;P<U;P++){const N=R[P],q=g(N),O=v%T,Y=O%q.boundary,j=O+Y;v+=Y,j!==0&&T-j<q.storage&&(v+=T-j),B.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=q.storage}}}const w=v%T;return w>0&&(v+=T-w),b.__size=v,b.__cache={},this}function g(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function m(b){const E=b.target;E.removeEventListener("dispose",m);const v=a.indexOf(E.__bindingPointIndex);a.splice(v,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(const b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}class L0{constructor(t={}){const{canvas:e=od(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const x=new Uint32Array(4),g=new Int32Array(4);let m=null,f=null;const b=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let T=!1;this._outputColorSpace=Ae;let w=0,D=0,L=null,_=-1,y=null;const I=new _e,B=new _e;let R=null;const P=new Ht(0);let U=0,N=e.width,q=e.height,O=1,Y=null,j=null;const et=new _e(0,0,N,q),Lt=new _e(0,0,N,q);let Ut=!1;const tt=new Br;let lt=!1,V=!1;const $=new Kt,at=new F,ft=new _e,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function Pt(){return L===null?O:1}let C=n;function Ot(S,k){return e.getContext(S,k)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oo}`),e.addEventListener("webglcontextlost",ct,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",nt,!1),C===null){const k="webgl2";if(C=Ot(k,S),C===null)throw Ot(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let bt,vt,mt,le,Mt,kt,Me,ue,A,M,H,K,Q,Z,Rt,ot,wt,Tt,st,gt,zt,At,ut,Xt;function z(){bt=new Vm(C),bt.init(),At=new E0(C,bt),vt=new Nm(C,bt,t,At),mt=new S0(C,bt),vt.reversedDepthBuffer&&p&&mt.buffers.depth.setReversed(!0),le=new Xm(C),Mt=new l0,kt=new b0(C,bt,mt,Mt,vt,At,le),Me=new Fm(v),ue=new Gm(v),A=new Kd(C),ut=new Im(C,A),M=new Hm(C,A,le,ut),H=new Ym(C,M,A,le),st=new qm(C,vt,kt),ot=new zm(Mt),K=new c0(v,Me,ue,bt,vt,ut,ot),Q=new P0(v,Mt),Z=new u0,Rt=new x0(bt),Tt=new Lm(v,Me,ue,mt,H,d,c),wt=new v0(v,H,vt),Xt=new D0(C,le,vt,mt),gt=new Um(C,bt,le),zt=new Wm(C,bt,le),le.programs=K.programs,v.capabilities=vt,v.extensions=bt,v.properties=Mt,v.renderLists=Z,v.shadowMap=wt,v.state=mt,v.info=le}z();const rt=new R0(v,C);this.xr=rt,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=bt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=bt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(S){S!==void 0&&(O=S,this.setSize(N,q,!1))},this.getSize=function(S){return S.set(N,q)},this.setSize=function(S,k,W=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=S,q=k,e.width=Math.floor(S*O),e.height=Math.floor(k*O),W===!0&&(e.style.width=S+"px",e.style.height=k+"px"),this.setViewport(0,0,S,k)},this.getDrawingBufferSize=function(S){return S.set(N*O,q*O).floor()},this.setDrawingBufferSize=function(S,k,W){N=S,q=k,O=W,e.width=Math.floor(S*W),e.height=Math.floor(k*W),this.setViewport(0,0,S,k)},this.getCurrentViewport=function(S){return S.copy(I)},this.getViewport=function(S){return S.copy(et)},this.setViewport=function(S,k,W,X){S.isVector4?et.set(S.x,S.y,S.z,S.w):et.set(S,k,W,X),mt.viewport(I.copy(et).multiplyScalar(O).round())},this.getScissor=function(S){return S.copy(Lt)},this.setScissor=function(S,k,W,X){S.isVector4?Lt.set(S.x,S.y,S.z,S.w):Lt.set(S,k,W,X),mt.scissor(B.copy(Lt).multiplyScalar(O).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(S){mt.setScissorTest(Ut=S)},this.setOpaqueSort=function(S){Y=S},this.setTransparentSort=function(S){j=S},this.getClearColor=function(S){return S.copy(Tt.getClearColor())},this.setClearColor=function(){Tt.setClearColor(...arguments)},this.getClearAlpha=function(){return Tt.getClearAlpha()},this.setClearAlpha=function(){Tt.setClearAlpha(...arguments)},this.clear=function(S=!0,k=!0,W=!0){let X=0;if(S){let G=!1;if(L!==null){const it=L.texture.format;G=it===Xo||it===Wo||it===Ho}if(G){const it=L.texture.type,dt=it===En||it===vi||it===Ds||it===Ls||it===ko||it===Go,St=Tt.getClearColor(),_t=Tt.getClearAlpha(),Nt=St.r,Ft=St.g,Dt=St.b;dt?(x[0]=Nt,x[1]=Ft,x[2]=Dt,x[3]=_t,C.clearBufferuiv(C.COLOR,0,x)):(g[0]=Nt,g[1]=Ft,g[2]=Dt,g[3]=_t,C.clearBufferiv(C.COLOR,0,g))}else X|=C.COLOR_BUFFER_BIT}k&&(X|=C.DEPTH_BUFFER_BIT),W&&(X|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ct,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",nt,!1),Tt.dispose(),Z.dispose(),Rt.dispose(),Mt.dispose(),Me.dispose(),ue.dispose(),H.dispose(),ut.dispose(),Xt.dispose(),K.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",pn),rt.removeEventListener("sessionend",pc),ti.stop()};function ct(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=le.autoReset,k=wt.enabled,W=wt.autoUpdate,X=wt.needsUpdate,G=wt.type;z(),le.autoReset=S,wt.enabled=k,wt.autoUpdate=W,wt.needsUpdate=X,wt.type=G}function nt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function J(S){const k=S.target;k.removeEventListener("dispose",J),Et(k)}function Et(S){Gt(S),Mt.remove(S)}function Gt(S){const k=Mt.get(S).programs;k!==void 0&&(k.forEach(function(W){K.releaseProgram(W)}),S.isShaderMaterial&&K.releaseShaderCache(S))}this.renderBufferDirect=function(S,k,W,X,G,it){k===null&&(k=pt);const dt=G.isMesh&&G.matrixWorld.determinant()<0,St=Qh(S,k,W,X,G);mt.setMaterial(X,dt);let _t=W.index,Nt=1;if(X.wireframe===!0){if(_t=M.getWireframeAttribute(W),_t===void 0)return;Nt=2}const Ft=W.drawRange,Dt=W.attributes.position;let $t=Ft.start*Nt,ne=(Ft.start+Ft.count)*Nt;it!==null&&($t=Math.max($t,it.start*Nt),ne=Math.min(ne,(it.start+it.count)*Nt)),_t!==null?($t=Math.max($t,0),ne=Math.min(ne,_t.count)):Dt!=null&&($t=Math.max($t,0),ne=Math.min(ne,Dt.count));const xe=ne-$t;if(xe<0||xe===1/0)return;ut.setup(G,X,St,W,_t);let de,ce=gt;if(_t!==null&&(de=A.get(_t),ce=zt,ce.setIndex(de)),G.isMesh)X.wireframe===!0?(mt.setLineWidth(X.wireframeLinewidth*Pt()),ce.setMode(C.LINES)):ce.setMode(C.TRIANGLES);else if(G.isLine){let It=X.linewidth;It===void 0&&(It=1),mt.setLineWidth(It*Pt()),G.isLineSegments?ce.setMode(C.LINES):G.isLineLoop?ce.setMode(C.LINE_LOOP):ce.setMode(C.LINE_STRIP)}else G.isPoints?ce.setMode(C.POINTS):G.isSprite&&ce.setMode(C.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Ns("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(bt.get("WEBGL_multi_draw"))ce.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const It=G._multiDrawStarts,fe=G._multiDrawCounts,Jt=G._multiDrawCount,Ve=_t?A.get(_t).bytesPerElement:1,Ri=Mt.get(X).currentProgram.getUniforms();for(let He=0;He<Jt;He++)Ri.setValue(C,"_gl_DrawID",He),ce.render(It[He]/Ve,fe[He])}else if(G.isInstancedMesh)ce.renderInstances($t,xe,G.count);else if(W.isInstancedBufferGeometry){const It=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,fe=Math.min(W.instanceCount,It);ce.renderInstances($t,xe,fe)}else ce.render($t,xe)};function he(S,k,W){S.transparent===!0&&S.side===be&&S.forceSinglePass===!1?(S.side=Ge,S.needsUpdate=!0,Xs(S,k,W),S.side=Kn,S.needsUpdate=!0,Xs(S,k,W),S.side=be):Xs(S,k,W)}this.compile=function(S,k,W=null){W===null&&(W=S),f=Rt.get(W),f.init(k),E.push(f),W.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),S!==W&&S.traverseVisible(function(G){G.isLight&&G.layers.test(k.layers)&&(f.pushLight(G),G.castShadow&&f.pushShadow(G))}),f.setupLights();const X=new Set;return S.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const it=G.material;if(it)if(Array.isArray(it))for(let dt=0;dt<it.length;dt++){const St=it[dt];he(St,W,G),X.add(St)}else he(it,W,G),X.add(it)}),f=E.pop(),X},this.compileAsync=function(S,k,W=null){const X=this.compile(S,k,W);return new Promise(G=>{function it(){if(X.forEach(function(dt){Mt.get(dt).currentProgram.isReady()&&X.delete(dt)}),X.size===0){G(S);return}setTimeout(it,10)}bt.get("KHR_parallel_shader_compile")!==null?it():setTimeout(it,10)})};let ee=null;function wn(S){ee&&ee(S)}function pn(){ti.stop()}function pc(){ti.start()}const ti=new Dh;ti.setAnimationLoop(wn),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(S){ee=S,rt.setAnimationLoop(S),S===null?ti.stop():ti.start()},rt.addEventListener("sessionstart",pn),rt.addEventListener("sessionend",pc),this.render=function(S,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(k),k=rt.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,k,L),f=Rt.get(S,E.length),f.init(k),E.push(f),$.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),tt.setFromProjectionMatrix($,Mn,k.reversedDepth),V=this.localClippingEnabled,lt=ot.init(this.clippingPlanes,V),m=Z.get(S,b.length),m.init(),b.push(m),rt.enabled===!0&&rt.isPresenting===!0){const it=v.xr.getDepthSensingMesh();it!==null&&$r(it,k,-1/0,v.sortObjects)}$r(S,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Y,j),Wt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Wt&&Tt.addToRenderList(m,S),this.info.render.frame++,lt===!0&&ot.beginShadows();const W=f.state.shadowsArray;wt.render(W,S,k),lt===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const X=m.opaque,G=m.transmissive;if(f.setupLights(),k.isArrayCamera){const it=k.cameras;if(G.length>0)for(let dt=0,St=it.length;dt<St;dt++){const _t=it[dt];gc(X,G,S,_t)}Wt&&Tt.render(S);for(let dt=0,St=it.length;dt<St;dt++){const _t=it[dt];mc(m,S,_t,_t.viewport)}}else G.length>0&&gc(X,G,S,k),Wt&&Tt.render(S),mc(m,S,k);L!==null&&D===0&&(kt.updateMultisampleRenderTarget(L),kt.updateRenderTargetMipmap(L)),S.isScene===!0&&S.onAfterRender(v,S,k),ut.resetDefaultState(),_=-1,y=null,E.pop(),E.length>0?(f=E[E.length-1],lt===!0&&ot.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function $r(S,k,W,X){if(S.visible===!1)return;if(S.layers.test(k.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(k);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||tt.intersectsSprite(S)){X&&ft.setFromMatrixPosition(S.matrixWorld).applyMatrix4($);const dt=H.update(S),St=S.material;St.visible&&m.push(S,dt,St,W,ft.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||tt.intersectsObject(S))){const dt=H.update(S),St=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ft.copy(S.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),ft.copy(dt.boundingSphere.center)),ft.applyMatrix4(S.matrixWorld).applyMatrix4($)),Array.isArray(St)){const _t=dt.groups;for(let Nt=0,Ft=_t.length;Nt<Ft;Nt++){const Dt=_t[Nt],$t=St[Dt.materialIndex];$t&&$t.visible&&m.push(S,dt,$t,W,ft.z,Dt)}}else St.visible&&m.push(S,dt,St,W,ft.z,null)}}const it=S.children;for(let dt=0,St=it.length;dt<St;dt++)$r(it[dt],k,W,X)}function mc(S,k,W,X){const G=S.opaque,it=S.transmissive,dt=S.transparent;f.setupLightsView(W),lt===!0&&ot.setGlobalState(v.clippingPlanes,W),X&&mt.viewport(I.copy(X)),G.length>0&&Ws(G,k,W),it.length>0&&Ws(it,k,W),dt.length>0&&Ws(dt,k,W),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function gc(S,k,W,X){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[X.id]===void 0&&(f.state.transmissionRenderTarget[X.id]=new yi(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?Bs:En,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qt.workingColorSpace}));const it=f.state.transmissionRenderTarget[X.id],dt=X.viewport||I;it.setSize(dt.z*v.transmissionResolutionScale,dt.w*v.transmissionResolutionScale);const St=v.getRenderTarget(),_t=v.getActiveCubeFace(),Nt=v.getActiveMipmapLevel();v.setRenderTarget(it),v.getClearColor(P),U=v.getClearAlpha(),U<1&&v.setClearColor(16777215,.5),v.clear(),Wt&&Tt.render(W);const Ft=v.toneMapping;v.toneMapping=Yn;const Dt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),f.setupLightsView(X),lt===!0&&ot.setGlobalState(v.clippingPlanes,X),Ws(S,W,X),kt.updateMultisampleRenderTarget(it),kt.updateRenderTargetMipmap(it),bt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let ne=0,xe=k.length;ne<xe;ne++){const de=k[ne],ce=de.object,It=de.geometry,fe=de.material,Jt=de.group;if(fe.side===be&&ce.layers.test(X.layers)){const Ve=fe.side;fe.side=Ge,fe.needsUpdate=!0,xc(ce,W,X,It,fe,Jt),fe.side=Ve,fe.needsUpdate=!0,$t=!0}}$t===!0&&(kt.updateMultisampleRenderTarget(it),kt.updateRenderTargetMipmap(it))}v.setRenderTarget(St,_t,Nt),v.setClearColor(P,U),Dt!==void 0&&(X.viewport=Dt),v.toneMapping=Ft}function Ws(S,k,W){const X=k.isScene===!0?k.overrideMaterial:null;for(let G=0,it=S.length;G<it;G++){const dt=S[G],St=dt.object,_t=dt.geometry,Nt=dt.group;let Ft=dt.material;Ft.allowOverride===!0&&X!==null&&(Ft=X),St.layers.test(W.layers)&&xc(St,k,W,_t,Ft,Nt)}}function xc(S,k,W,X,G,it){S.onBeforeRender(v,k,W,X,G,it),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),G.onBeforeRender(v,k,W,X,S,it),G.transparent===!0&&G.side===be&&G.forceSinglePass===!1?(G.side=Ge,G.needsUpdate=!0,v.renderBufferDirect(W,k,X,G,S,it),G.side=Kn,G.needsUpdate=!0,v.renderBufferDirect(W,k,X,G,S,it),G.side=be):v.renderBufferDirect(W,k,X,G,S,it),S.onAfterRender(v,k,W,X,G,it)}function Xs(S,k,W){k.isScene!==!0&&(k=pt);const X=Mt.get(S),G=f.state.lights,it=f.state.shadowsArray,dt=G.state.version,St=K.getParameters(S,G.state,it,k,W),_t=K.getProgramCacheKey(St);let Nt=X.programs;X.environment=S.isMeshStandardMaterial?k.environment:null,X.fog=k.fog,X.envMap=(S.isMeshStandardMaterial?ue:Me).get(S.envMap||X.environment),X.envMapRotation=X.environment!==null&&S.envMap===null?k.environmentRotation:S.envMapRotation,Nt===void 0&&(S.addEventListener("dispose",J),Nt=new Map,X.programs=Nt);let Ft=Nt.get(_t);if(Ft!==void 0){if(X.currentProgram===Ft&&X.lightsStateVersion===dt)return Mc(S,St),Ft}else St.uniforms=K.getUniforms(S),S.onBeforeCompile(St,v),Ft=K.acquireProgram(St,_t),Nt.set(_t,Ft),X.uniforms=St.uniforms;const Dt=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Dt.clippingPlanes=ot.uniform),Mc(S,St),X.needsLights=eu(S),X.lightsStateVersion=dt,X.needsLights&&(Dt.ambientLightColor.value=G.state.ambient,Dt.lightProbe.value=G.state.probe,Dt.directionalLights.value=G.state.directional,Dt.directionalLightShadows.value=G.state.directionalShadow,Dt.spotLights.value=G.state.spot,Dt.spotLightShadows.value=G.state.spotShadow,Dt.rectAreaLights.value=G.state.rectArea,Dt.ltc_1.value=G.state.rectAreaLTC1,Dt.ltc_2.value=G.state.rectAreaLTC2,Dt.pointLights.value=G.state.point,Dt.pointLightShadows.value=G.state.pointShadow,Dt.hemisphereLights.value=G.state.hemi,Dt.directionalShadowMap.value=G.state.directionalShadowMap,Dt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Dt.spotShadowMap.value=G.state.spotShadowMap,Dt.spotLightMatrix.value=G.state.spotLightMatrix,Dt.spotLightMap.value=G.state.spotLightMap,Dt.pointShadowMap.value=G.state.pointShadowMap,Dt.pointShadowMatrix.value=G.state.pointShadowMatrix),X.currentProgram=Ft,X.uniformsList=null,Ft}function _c(S){if(S.uniformsList===null){const k=S.currentProgram.getUniforms();S.uniformsList=Tr.seqWithValue(k.seq,S.uniforms)}return S.uniformsList}function Mc(S,k){const W=Mt.get(S);W.outputColorSpace=k.outputColorSpace,W.batching=k.batching,W.batchingColor=k.batchingColor,W.instancing=k.instancing,W.instancingColor=k.instancingColor,W.instancingMorph=k.instancingMorph,W.skinning=k.skinning,W.morphTargets=k.morphTargets,W.morphNormals=k.morphNormals,W.morphColors=k.morphColors,W.morphTargetsCount=k.morphTargetsCount,W.numClippingPlanes=k.numClippingPlanes,W.numIntersection=k.numClipIntersection,W.vertexAlphas=k.vertexAlphas,W.vertexTangents=k.vertexTangents,W.toneMapping=k.toneMapping}function Qh(S,k,W,X,G){k.isScene!==!0&&(k=pt),kt.resetTextureUnits();const it=k.fog,dt=X.isMeshStandardMaterial?k.environment:null,St=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:is,_t=(X.isMeshStandardMaterial?ue:Me).get(X.envMap||dt),Nt=X.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ft=!!W.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Dt=!!W.morphAttributes.position,$t=!!W.morphAttributes.normal,ne=!!W.morphAttributes.color;let xe=Yn;X.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(xe=v.toneMapping);const de=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ce=de!==void 0?de.length:0,It=Mt.get(X),fe=f.state.lights;if(lt===!0&&(V===!0||S!==y)){const Ie=S===y&&X.id===_;ot.setState(X,S,Ie)}let Jt=!1;X.version===It.__version?(It.needsLights&&It.lightsStateVersion!==fe.state.version||It.outputColorSpace!==St||G.isBatchedMesh&&It.batching===!1||!G.isBatchedMesh&&It.batching===!0||G.isBatchedMesh&&It.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&It.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&It.instancing===!1||!G.isInstancedMesh&&It.instancing===!0||G.isSkinnedMesh&&It.skinning===!1||!G.isSkinnedMesh&&It.skinning===!0||G.isInstancedMesh&&It.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&It.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&It.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&It.instancingMorph===!1&&G.morphTexture!==null||It.envMap!==_t||X.fog===!0&&It.fog!==it||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==ot.numPlanes||It.numIntersection!==ot.numIntersection)||It.vertexAlphas!==Nt||It.vertexTangents!==Ft||It.morphTargets!==Dt||It.morphNormals!==$t||It.morphColors!==ne||It.toneMapping!==xe||It.morphTargetsCount!==ce)&&(Jt=!0):(Jt=!0,It.__version=X.version);let Ve=It.currentProgram;Jt===!0&&(Ve=Xs(X,k,G));let Ri=!1,He=!1,ds=!1;const pe=Ve.getUniforms(),$e=It.uniforms;if(mt.useProgram(Ve.program)&&(Ri=!0,He=!0,ds=!0),X.id!==_&&(_=X.id,He=!0),Ri||y!==S){mt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),pe.setValue(C,"projectionMatrix",S.projectionMatrix),pe.setValue(C,"viewMatrix",S.matrixWorldInverse);const ke=pe.map.cameraPosition;ke!==void 0&&ke.setValue(C,at.setFromMatrixPosition(S.matrixWorld)),vt.logarithmicDepthBuffer&&pe.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&pe.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),y!==S&&(y=S,He=!0,ds=!0)}if(G.isSkinnedMesh){pe.setOptional(C,G,"bindMatrix"),pe.setOptional(C,G,"bindMatrixInverse");const Ie=G.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),pe.setValue(C,"boneTexture",Ie.boneTexture,kt))}G.isBatchedMesh&&(pe.setOptional(C,G,"batchingTexture"),pe.setValue(C,"batchingTexture",G._matricesTexture,kt),pe.setOptional(C,G,"batchingIdTexture"),pe.setValue(C,"batchingIdTexture",G._indirectTexture,kt),pe.setOptional(C,G,"batchingColorTexture"),G._colorsTexture!==null&&pe.setValue(C,"batchingColorTexture",G._colorsTexture,kt));const Ze=W.morphAttributes;if((Ze.position!==void 0||Ze.normal!==void 0||Ze.color!==void 0)&&st.update(G,W,Ve),(He||It.receiveShadow!==G.receiveShadow)&&(It.receiveShadow=G.receiveShadow,pe.setValue(C,"receiveShadow",G.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&($e.envMap.value=_t,$e.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),X.isMeshStandardMaterial&&X.envMap===null&&k.environment!==null&&($e.envMapIntensity.value=k.environmentIntensity),He&&(pe.setValue(C,"toneMappingExposure",v.toneMappingExposure),It.needsLights&&tu($e,ds),it&&X.fog===!0&&Q.refreshFogUniforms($e,it),Q.refreshMaterialUniforms($e,X,O,q,f.state.transmissionRenderTarget[S.id]),Tr.upload(C,_c(It),$e,kt)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Tr.upload(C,_c(It),$e,kt),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&pe.setValue(C,"center",G.center),pe.setValue(C,"modelViewMatrix",G.modelViewMatrix),pe.setValue(C,"normalMatrix",G.normalMatrix),pe.setValue(C,"modelMatrix",G.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Ie=X.uniformsGroups;for(let ke=0,Zr=Ie.length;ke<Zr;ke++){const ei=Ie[ke];Xt.update(ei,Ve),Xt.bind(ei,Ve)}}return Ve}function tu(S,k){S.ambientLightColor.needsUpdate=k,S.lightProbe.needsUpdate=k,S.directionalLights.needsUpdate=k,S.directionalLightShadows.needsUpdate=k,S.pointLights.needsUpdate=k,S.pointLightShadows.needsUpdate=k,S.spotLights.needsUpdate=k,S.spotLightShadows.needsUpdate=k,S.rectAreaLights.needsUpdate=k,S.hemisphereLights.needsUpdate=k}function eu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(S,k,W){const X=Mt.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Mt.get(S.texture).__webglTexture=k,Mt.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:W,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,k){const W=Mt.get(S);W.__webglFramebuffer=k,W.__useDefaultFramebuffer=k===void 0};const nu=C.createFramebuffer();this.setRenderTarget=function(S,k=0,W=0){L=S,w=k,D=W;let X=!0,G=null,it=!1,dt=!1;if(S){const _t=Mt.get(S);if(_t.__useDefaultFramebuffer!==void 0)mt.bindFramebuffer(C.FRAMEBUFFER,null),X=!1;else if(_t.__webglFramebuffer===void 0)kt.setupRenderTarget(S);else if(_t.__hasExternalTextures)kt.rebindTextures(S,Mt.get(S.texture).__webglTexture,Mt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Dt=S.depthTexture;if(_t.__boundDepthTexture!==Dt){if(Dt!==null&&Mt.has(Dt)&&(S.width!==Dt.image.width||S.height!==Dt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(S)}}const Nt=S.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(dt=!0);const Ft=Mt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ft[k])?G=Ft[k][W]:G=Ft[k],it=!0):S.samples>0&&kt.useMultisampledRTT(S)===!1?G=Mt.get(S).__webglMultisampledFramebuffer:Array.isArray(Ft)?G=Ft[W]:G=Ft,I.copy(S.viewport),B.copy(S.scissor),R=S.scissorTest}else I.copy(et).multiplyScalar(O).floor(),B.copy(Lt).multiplyScalar(O).floor(),R=Ut;if(W!==0&&(G=nu),mt.bindFramebuffer(C.FRAMEBUFFER,G)&&X&&mt.drawBuffers(S,G),mt.viewport(I),mt.scissor(B),mt.setScissorTest(R),it){const _t=Mt.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+k,_t.__webglTexture,W)}else if(dt){const _t=k;for(let Nt=0;Nt<S.textures.length;Nt++){const Ft=Mt.get(S.textures[Nt]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Nt,Ft.__webglTexture,W,_t)}}else if(S!==null&&W!==0){const _t=Mt.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,_t.__webglTexture,W)}_=-1},this.readRenderTargetPixels=function(S,k,W,X,G,it,dt,St=0){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(_t=_t[dt]),_t){mt.bindFramebuffer(C.FRAMEBUFFER,_t);try{const Nt=S.textures[St],Ft=Nt.format,Dt=Nt.type;if(!vt.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!vt.textureTypeReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=S.width-X&&W>=0&&W<=S.height-G&&(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+St),C.readPixels(k,W,X,G,At.convert(Ft),At.convert(Dt),it))}finally{const Nt=L!==null?Mt.get(L).__webglFramebuffer:null;mt.bindFramebuffer(C.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(S,k,W,X,G,it,dt,St=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=Mt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(_t=_t[dt]),_t)if(k>=0&&k<=S.width-X&&W>=0&&W<=S.height-G){mt.bindFramebuffer(C.FRAMEBUFFER,_t);const Nt=S.textures[St],Ft=Nt.format,Dt=Nt.type;if(!vt.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!vt.textureTypeReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $t=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,$t),C.bufferData(C.PIXEL_PACK_BUFFER,it.byteLength,C.STREAM_READ),S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+St),C.readPixels(k,W,X,G,At.convert(Ft),At.convert(Dt),0);const ne=L!==null?Mt.get(L).__webglFramebuffer:null;mt.bindFramebuffer(C.FRAMEBUFFER,ne);const xe=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await cd(C,xe,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,$t),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,it),C.deleteBuffer($t),C.deleteSync(xe),it}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,k=null,W=0){const X=Math.pow(2,-W),G=Math.floor(S.image.width*X),it=Math.floor(S.image.height*X),dt=k!==null?k.x:0,St=k!==null?k.y:0;kt.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,W,0,0,dt,St,G,it),mt.unbindTexture()};const iu=C.createFramebuffer(),su=C.createFramebuffer();this.copyTextureToTexture=function(S,k,W=null,X=null,G=0,it=null){it===null&&(G!==0?(Ns("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),it=G,G=0):it=0);let dt,St,_t,Nt,Ft,Dt,$t,ne,xe;const de=S.isCompressedTexture?S.mipmaps[it]:S.image;if(W!==null)dt=W.max.x-W.min.x,St=W.max.y-W.min.y,_t=W.isBox3?W.max.z-W.min.z:1,Nt=W.min.x,Ft=W.min.y,Dt=W.isBox3?W.min.z:0;else{const Ze=Math.pow(2,-G);dt=Math.floor(de.width*Ze),St=Math.floor(de.height*Ze),S.isDataArrayTexture?_t=de.depth:S.isData3DTexture?_t=Math.floor(de.depth*Ze):_t=1,Nt=0,Ft=0,Dt=0}X!==null?($t=X.x,ne=X.y,xe=X.z):($t=0,ne=0,xe=0);const ce=At.convert(k.format),It=At.convert(k.type);let fe;k.isData3DTexture?(kt.setTexture3D(k,0),fe=C.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(kt.setTexture2DArray(k,0),fe=C.TEXTURE_2D_ARRAY):(kt.setTexture2D(k,0),fe=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,k.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,k.unpackAlignment);const Jt=C.getParameter(C.UNPACK_ROW_LENGTH),Ve=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ri=C.getParameter(C.UNPACK_SKIP_PIXELS),He=C.getParameter(C.UNPACK_SKIP_ROWS),ds=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,de.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,de.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Nt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ft),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Dt);const pe=S.isDataArrayTexture||S.isData3DTexture,$e=k.isDataArrayTexture||k.isData3DTexture;if(S.isDepthTexture){const Ze=Mt.get(S),Ie=Mt.get(k),ke=Mt.get(Ze.__renderTarget),Zr=Mt.get(Ie.__renderTarget);mt.bindFramebuffer(C.READ_FRAMEBUFFER,ke.__webglFramebuffer),mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,Zr.__webglFramebuffer);for(let ei=0;ei<_t;ei++)pe&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Mt.get(S).__webglTexture,G,Dt+ei),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Mt.get(k).__webglTexture,it,xe+ei)),C.blitFramebuffer(Nt,Ft,dt,St,$t,ne,dt,St,C.DEPTH_BUFFER_BIT,C.NEAREST);mt.bindFramebuffer(C.READ_FRAMEBUFFER,null),mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(G!==0||S.isRenderTargetTexture||Mt.has(S)){const Ze=Mt.get(S),Ie=Mt.get(k);mt.bindFramebuffer(C.READ_FRAMEBUFFER,iu),mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,su);for(let ke=0;ke<_t;ke++)pe?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ze.__webglTexture,G,Dt+ke):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ze.__webglTexture,G),$e?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ie.__webglTexture,it,xe+ke):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ie.__webglTexture,it),G!==0?C.blitFramebuffer(Nt,Ft,dt,St,$t,ne,dt,St,C.COLOR_BUFFER_BIT,C.NEAREST):$e?C.copyTexSubImage3D(fe,it,$t,ne,xe+ke,Nt,Ft,dt,St):C.copyTexSubImage2D(fe,it,$t,ne,Nt,Ft,dt,St);mt.bindFramebuffer(C.READ_FRAMEBUFFER,null),mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else $e?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(fe,it,$t,ne,xe,dt,St,_t,ce,It,de.data):k.isCompressedArrayTexture?C.compressedTexSubImage3D(fe,it,$t,ne,xe,dt,St,_t,ce,de.data):C.texSubImage3D(fe,it,$t,ne,xe,dt,St,_t,ce,It,de):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,it,$t,ne,dt,St,ce,It,de.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,it,$t,ne,de.width,de.height,ce,de.data):C.texSubImage2D(C.TEXTURE_2D,it,$t,ne,dt,St,ce,It,de);C.pixelStorei(C.UNPACK_ROW_LENGTH,Jt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ve),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ri),C.pixelStorei(C.UNPACK_SKIP_ROWS,He),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ds),it===0&&k.generateMipmaps&&C.generateMipmap(fe),mt.unbindTexture()},this.initRenderTarget=function(S){Mt.get(S).__webglFramebuffer===void 0&&kt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?kt.setTextureCube(S,0):S.isData3DTexture?kt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?kt.setTexture2DArray(S,0):kt.setTexture2D(S,0),mt.unbindTexture()},this.resetState=function(){w=0,D=0,L=null,mt.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Qt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Qt._getUnpackColorSpace()}}function I0(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}function Ar(i,t){return Math.hypot(i.x-t.x,i.z-t.z)}function zh(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Math.max(0,Math.min(1,((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1)));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function Rl(i,t){let e=1/0;for(let n=1;n<(t||[]).length;n++)e=Math.min(e,zh(i,t[n-1],t[n]));return e}function Cl(i,t,e=.8){const n=i.bounds,s=i.target,r=i.spawn;return!(t.x<n.minX+2||t.x>n.maxX-2||t.z<n.minZ+2||t.z>n.maxZ-2||!Fe(i,t.x,t.z,e)||r&&Ar(t,r)<14||s&&Ar(t,s)<(s.radius||5)+11||(i.roads||[]).some(a=>Rl(t,a.points)<(a.width||4)/2+2.8)||(i.rivers||[]).some(a=>Rl(t,a.points)<a.width/2+1.4)||(i.obstacles||[]).some(a=>Ar(t,a)<(a.radius||1)+2.1)||(i.fenceSegments||[]).some(a=>zh(t,a.a,a.b)<2.8))}function U0(i,{seed:t=(i.seed||42)+93371,maxClusters:e}={}){const n=i.bounds,s=(n.maxX-n.minX)*(n.maxZ-n.minZ),r=Math.max(3,Math.min(24,Math.ceil(s/1600))),a=Math.max(0,Math.min(32,Math.floor(e??r))),o=I0(t),c=[],l=[];for(let h=0;h<a*90&&l.length<a;h++){const u={x:n.minX+2+o()*(n.maxX-n.minX-4),z:n.minZ+2+o()*(n.maxZ-n.minZ-4)};if(!Cl(i,u,.85)||l.some(g=>Ar(u,g)<5.5))continue;const p=3+Math.floor(o()*3),d=l.length,x=[];for(let g=0;g<p;g++){const m=o()*Math.PI*2,f=g===0?0:.55+o()*1.25,b={x:u.x+Math.cos(m)*f,z:u.z+Math.sin(m)*f};Cl(i,b,.55)&&x.push({x:b.x,z:b.z,variant:Math.floor(o()*3),scale:.66+o()*.48,cluster:d})}x.length<2||(l.push(u),c.push(...x))}return c}const N0="#9ceeff",z0="#39bfe8",F0="#ff7062",O0="#ff241b";function Pa(i,t){const n=(i?.userData?.parts||i)?.tailLight?.material;if(!n)return!1;const s=t?F0:N0,r=t?O0:z0;return n.color?.set&&n.color.set(s),n.emissive?.set&&n.emissive.set(r),n.emissiveIntensity=t?1.9:1.25,!0}const B0=[{id:"speed",name:"Turbo paws",icon:"paw",costs:[80,120,200],unlockLevels:[2,6,11],description:"Circle a roaming flock faster with upgraded paw motors.",tierNames:["Quick paws","Trail runner","Meadow racer"],tierDescriptions:["+1.8 m/s running speed","+2.7 m/s running speed","+3.5 m/s running speed"]},{id:"flock",name:"Friendly signal",icon:"signal",costs:[120,180,260],unlockLevels:[7,10,15],description:"Reach more robots with a wider herding signal.",tierNames:["Clear signal","Pasture beacon","Far-field beacon"],tierDescriptions:["+2 m herding range","+3 m herding range","+4 m herding range"]},{id:"drone",name:"Scout drone",icon:"drone",costs:[200,360,540],unlockLevels:[10,14,18],description:"A hovering helper keeps the main herd together while you lead the way.",tierNames:["Scout","Shepherd scout","Flock captain"],tierDescriptions:["Keeps the main herd together; holds when you leave","33% stronger drone support","67% stronger drone support"]},{id:"helper",name:"Buddy dog",icon:"dog",costs:[600,850,1200],unlockLevels:[20,24,28],description:"A companion supports the main herd while you lead through crossings.",tierNames:["Farm friend","Trail partner","Senior shepherd"],tierDescriptions:["A friend at your flank; watches the herd while you roam","30% stronger buddy support","58% stronger buddy support"]},{id:"bark",name:"Happy bark",icon:"bark",costs:[100,160,240],unlockLevels:[4,8,13],description:"A stronger bark gives wandering robots a cheerful nudge.",tierNames:["Bright bark","Resonant bark","Meadow chorus"],tierDescriptions:["+0.25 bark strength","+0.45 bark strength","+0.65 bark strength"]},{id:"cohesion",name:"Flock harmony",icon:"harmony",costs:[160,220,320],unlockLevels:[12,14,15],description:"Robots regroup more readily when the flock stretches across a meadow.",tierNames:["Stay together","Close companions","Perfect formation"],tierDescriptions:["12% stronger regrouping","23% stronger regrouping","35% stronger regrouping"]}],Vr=Object.freeze(B0.map(i=>Object.freeze({...i,cost:i.costs[0],maxLevel:i.costs.length,costs:Object.freeze(i.costs),unlockLevels:Object.freeze(i.unlockLevels),tierNames:Object.freeze(i.tierNames),tierDescriptions:Object.freeze(i.tierDescriptions)}))),Vs=i=>Vr.find(t=>t.id===i);function Nn(i,t){const e=Vs(t);if(!e||!i||typeof i!="object")return 0;const n=Object.hasOwn(i,t)?i[t]:void 0;return n===!0?1:Number.isInteger(n)&&n>0?Math.min(n,e.maxLevel):0}function Jo(i,t){const e=Vs(t);return e?e.costs[Nn(i,t)]??null:null}function Fh(i){const t={};for(const e of Vr){const n=Nn(i,e.id);n&&(t[e.id]=n)}return t}function Oh(i,t){return Vs(t)?.unlockLevels[Nn(i,t)]??null}function Qo(i){if(typeof i=="number")return Number.isInteger(i)?Math.max(1,Math.min(100,i)):1;const t=i;if(!t||typeof t!="object")return 1;const e=Number.isInteger(t.highestLevel)&&t.highestLevel>=0?Math.min(99,t.highestLevel):0,s=(Array.isArray(t.completedLevels)?t.completedLevels:[]).reduce((r,a)=>Number.isInteger(a)&&a>=0&&a<=99?Math.max(r,Math.min(100,a+2)):r,1);return Math.max(e+1,s)}function k0(i,t){const e=typeof i=="object"?i:null,n=Vs(t),s=Qo(i),r=Nn(e?.upgrades,t),a=Jo(e?.upgrades,t),o=Oh(e?.upgrades,t),c=n?a===null?"owned":s<o?"locked":e&&(!Number.isFinite(e.points)||e.points<a)?"points":null:"unknown";return{available:c===null,reason:c,level:r,nextLevel:a===null?null:r+1,cost:a,unlockLevel:o,currentLevelNumber:s}}function Bh(i,t=1){const e=Qo(t),n={};for(const s of Vr){const r=Nn(i,s.id),a=s.unlockLevels.filter(c=>c<=e).length,o=Math.min(r,a);o&&(n[s.id]=o)}return n}function G0(i,t){const e=Vs(t);if(!e)return{ok:!1,reason:"unknown"};if(!i||typeof i!="object")return{ok:!1,reason:"points"};const n=Nn(i.upgrades,t),s=Jo(i.upgrades,t);if(s===null)return{ok:!1,reason:"owned"};const r=Oh(i.upgrades,t);return Qo(i)<r?{ok:!1,reason:"locked",unlockLevel:r}:!Number.isFinite(i.points)||i.points<s?{ok:!1,reason:"points"}:(i.points-=s,i.upgrades={...Fh(i.upgrades),[t]:n+1},{ok:!0,upgrade:e,level:n+1,cost:s})}function V0(i,t=1){const e=Bh(i,t),n=r=>Nn(e,r);return{speedBoost:[0,1.8,2.7,3.5][n("speed")],signalBoost:[0,2,3,4][n("flock")],barkBoost:[0,.25,.45,.65][n("bark")],cohesionBoost:[0,.12,.23,.35][n("cohesion")],droneStrength:[0,.7,.93,1.17][n("drone")],helperStrength:[0,1,1.3,1.58][n("helper")],drone:n("drone")>0,helper:n("helper")>0}}function H0(i){let t=i>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,(t>>>0)/4294967296}function Ts(i,t,e,n=0){return H0((i^Math.imul(t+1,2654435761)^Math.imul(e+1,2246822507)^n)>>>0)}const Pl=5,kh=i=>Math.floor(Math.max(0,i)*.15);function W0(i){if(i.wanderCohort)return i.wanderCohort;const t=new Set(i.animals.map(e=>({id:e.id,rank:Ts(i.seed,e.id,0,5370206)})).sort((e,n)=>e.rank-n.rank||e.id-n.id).slice(0,kh(i.animals.length)).map(e=>e.id));return i.wanderCohort=t,i.wanderCohort}function X0(i,t,e,n,s=!1){const r=kh(i.animals.length);if(i.index<7||t.saved||s||r===0||!W0(i).has(t.id)||Ts(i.seed,t.id,e,96785)>=.33)return null;const a=t.x-n.x,o=t.z-n.z,c=Math.hypot(a,o),l=c>.01?{x:a/c,z:o/c}:{x:0,z:1},h=i.index>=16&&Ts(i.seed,t.id,e,45079)<.1,u=h?1+Ts(i.seed,t.id,e,1004)*2:2.5,p=h?6*u+1:4+Ts(i.seed,t.id,e,4292)*3;return{x:t.x+l.x*p,z:t.z+l.z*p,until:i.time+u,bolting:h}}function q0(i,t){const e=Math.floor(((i.wanderClock??0)+1e-8)/Pl);return i.wanderClock=(i.wanderClock??0)+t,{before:e,after:Math.floor((i.wanderClock+1e-8)/Pl)}}const Sn=(i,t,e)=>Math.max(t,Math.min(e,i)),rs=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Wn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-4?{x:i/e,z:t/e}:{x:0,z:0}},Gh=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function Hr(i){const t=Math.max(0,(i.animals?.length||0)-5),e=Math.max(1,i.routes?.length||1),n=i.spawn&&i.target?rs(i.spawn,i.target):0;return Sn(30+Math.ceil(t/5)+(e-1)*4+Math.floor(n/40)*2,30,60)}function tc(i,t=i.animals.filter(e=>e.saved).length){const e=i.animals.length;return e?Math.floor(Math.max(0,i.reward)*Sn(t,0,e)/e):0}function Ro(i,t=[],e=!1,n={blockedX:!1,blockedZ:!1}){const s=i.result?.saved??i.animals.filter(o=>o.saved).length,r=i.result?.total??i.animals.length,a=i.result?.score??tc(i,s);return{saved:s,total:r,score:a,possibleScore:i.reward,completed:!!i.completed,justCompleted:e,reward:e?a:0,remaining:i.delivery?.remaining??null,countdownStarted:!!i.delivery?.started,events:t,helpers:i.helpers||[],dogCollision:n}}function Dl(i,t,e=[],n){i.completed=!0;const s=i.animals.filter(r=>r.saved).length;return i.result={saved:s,total:i.animals.length,score:tc(i,s),possibleScore:i.reward,reason:t},e.push({type:"levelCompleted",index:i.index,reward:i.result.score,reason:t}),Ro(i,e,!0,n)}function Fs(i,t,e,n=.15){return yn(i,t,e,n)}function Y0(i,t,e=[]){const n=new Set(t),s=[];for(;n.size;){const r=n.values().next().value,a=[r];n.delete(r);for(let o=0;o<a.length;o++)for(const c of n)rs(a[o],c)<=6.5&&Fs(i,a[o],c)&&(a.push(c),n.delete(c));s.push(a)}return s.sort((r,a)=>a.length-r.length||a.filter(o=>e.includes(o.id)).length-r.filter(o=>e.includes(o.id)).length||Math.min(...r.map(o=>o.id))-Math.min(...a.map(o=>o.id))),s[0]||[]}function $0(i,t,e,n){const s=[e.drone&&"drone",e.helper&&"helper"].filter(Boolean);if(i.helpers||=[],i.helpers=i.helpers.filter(g=>s.includes(g.type)),!s.length||!t.length)return{helpers:[],group:[],memberIds:new Set,hold:!1};const r=i.companionHerd||={},a=t.map(g=>g.id).join(",");(!r.group||r.activeSignature!==a||i.time-r.clusterTime>.25)&&(r.group=Y0(i,t,r.clusterIds),r.activeSignature=a,r.clusterTime=i.time);const o=r.group;if(o.length<2){r.mode="standby",r.clusterIds=[],r.positions={};for(const g of s){let m=i.helpers.find(f=>f.type===g);m||(m={type:g,x:i.dog.x,z:i.dog.z},i.helpers.push(m)),m.mode="standby",m.clusterIds=[],m.anchor={x:m.x,z:m.z}}return{helpers:i.helpers,group:[],memberIds:new Set,hold:!1,state:r}}const c=Gh(o),l=o.map(g=>g.id),h=new Set(l);let u=1/0;for(const g of o){const m=rs(i.dog,g);m<=18&&m<u&&Fs(i,i.dog,g)&&(u=m)}const p=r.mode&&r.mode!=="standby"?r.mode==="hold"?u>=12:u>18:u>14,d=(r.clusterIds||[]).filter(g=>h.has(g)).length,x=!r.clusterIds||d<Math.min(r.clusterIds.length,l.length)/2;if(p&&(r.mode!=="hold"||x)&&(r.anchor={...c},r.positions=Object.fromEntries(o.map(g=>[g.id,{x:g.x,z:g.z}]))),p||(r.anchor={...c},r.positions={}),p)for(const g of o)r.positions[g.id]||={x:g.x,z:g.z};r.mode=p?"hold":"assist",r.clusterIds=l;for(const g of s){let m=i.helpers.find(w=>w.type===g);m||(m={type:g,x:g==="drone"?c.x:i.dog.x,z:g==="drone"?c.z:i.dog.z},i.helpers.push(m)),m.mode=r.mode,m.clusterIds=[...l],m.anchor={...r.anchor};const f=Wn(c.x-i.dog.x,c.z-i.dog.z),b=g==="drone"?c:p?{x:c.x-f.z*Math.max(2.8,Math.sqrt(o.length)*.6),z:c.z+f.x*Math.max(2.8,Math.sqrt(o.length)*.6)}:{x:i.dog.x-f.z*2.1,z:i.dog.z+f.x*2.1},E=g==="drone"?b:Jl(i,m,b),v=Wn(E.x-m.x,E.z-m.z),T=Math.min(rs(m,E),n*(g==="drone"?6:7));g==="drone"?(m.x+=v.x*T,m.z+=v.z*T):Rs(i,m,v.x*T,v.z*T,.6)}return{helpers:i.helpers,group:o,centroid:c,memberIds:h,hold:p,state:r}}function Z0(i,t,e,n){const s=new Map;if(!t.group.length||t.hold)return s;const{group:r,centroid:a}=t,o=Wn(a.x-e.x,a.z-e.z),c={x:-o.z,z:o.x},l=Math.min(1.2,n.droneStrength*.35+n.helperStrength*.25),h=Math.max(2.1,Math.sqrt(r.length)*.66);for(const p of r){const d=(a.x-p.x)*c.x+(a.z-p.z)*c.z,x=Sn(Math.sign(d)*Math.max(0,Math.abs(d)-h)*l,-.75,.75),g={x:c.x*x,z:c.z*x},m=p.type==="cow"?.78:.55;x&&!Fs(i,p,{x:p.x+g.x,z:p.z+g.z},m)||Fe(i,p.x+g.x*.7,p.z+g.z*.7,m)&&s.set(p.id,g)}const u=[...s.values()].reduce((p,d)=>({x:p.x+d.x,z:p.z+d.z}),{x:0,z:0});for(const p of s.values())p.x-=u.x/s.size,p.z-=u.z/s.size;return s}function Vh(i,t,e){if(t<=0)return;const n=zn(i.target);for(const s of i.animals){if(!s.saved)continue;const r=s.type==="cow"?.78:.55,a=Vl(i.target,s),o=s.roamPhase??s.id*2.399963229728653;s.roamPhase=o;const c=n.halfLength-r-.48,l=n.halfWidth-r-.24,h={forward:Math.sin(e*.22+o)*c*.72,lateral:Math.cos(e*.19+o*1.7)*l*.72};let u=(h.forward-a.forward)*.32,p=(h.lateral-a.lateral)*.32;for(const v of i.animals){if(v===s||!v.saved)continue;const T=s.x-v.x,w=s.z-v.z,D=Math.hypot(T,w),L=r+(v.type==="cow"?.78:.55)+.35;if(D>1e-4&&D<L){const _=(L-D)/D*.6;u+=(T*n.forward.x+w*n.forward.z)*_,p+=(T*n.side.x+w*n.side.z)*_}}const d=-n.halfLength+r;a.forward<d+.45&&(u+=(d+.45-a.forward)*1.2);const x=n.forward,g=n.side;let m=x.x*u+g.x*p,f=x.z*u+g.z*p;const b=Math.hypot(m,f);b>.65&&(m*=.65/b,f*=.65/b);const E={x:s.x,z:s.z};Rs(i,s,m*t,f*t,r),Fe(i,s.x,s.z,r)&&Hl(i.target,s,r)||(s.x=E.x,s.z=E.z),s.vx=(s.x-E.x)/t,s.vz=(s.z-E.z)/t,s.heading=Math.hypot(s.vx,s.vz)>.03?Math.atan2(s.vx,s.vz):s.heading||0}}function K0(i,t=1/60){t=Sn(Number(t)||0,0,.1),i.completed&&t>0&&(i.savedRoamTime=(i.savedRoamTime??(i.time||0))+t,Vh(i,t,i.savedRoamTime))}function j0(i,t,e={},n=1/60,s={}){const r=V0(s,i.index+1);if(n=Sn(Number(n)||0,0,.1),i.completed)return Ro(i);if(n>0&&i.delivery?.started&&(i.delivery.remaining=Math.max(0,i.delivery.remaining-n),i.delivery.remaining<=1e-8))return i.delivery.remaining=0,Dl(i,"timeout");i.time=(i.time||0)+n;const a=n>0?q0(i,n):null;Vh(i,n,i.time);const o=[],c=Number(e.x)||0,l=Number(e.z??e.y)||0,h=Math.min(1,Math.hypot(c,l)),u=Wn(c,l),p=7.8+r.speedBoost,d={x:t.x,z:t.z},x=Rs(i,t,u.x*h*p*n,u.z*h*p*n,.62);t.vx=n?(t.x-d.x)/n:0,t.vz=n?(t.z-d.z)/n:0,t.heading=h>.03?Math.atan2(u.x,u.z):t.heading||0,i.dog=t;const g=i.animals.filter(L=>!L.saved),m=$0(i,g,r,n),f=Z0(i,m,t,r),b=7.6+r.signalBoost+(e.bark?3.3:0),E=g.map(L=>({...L})),v=i.flockVisibility||=new Map,T=new Map(E.map(L=>[L.id,`${Math.floor(L.x*5)},${Math.floor(L.z*5)}`])),w=(L,_)=>{const y=L.id<_.id?L:_,I=L.id<_.id?_:L,B=`${y.id}:${I.id}`,R=`${T.get(y.id)}:${T.get(I.id)}`,P=v.get(B);if(P?.position===R)return P.clear;const U=yn(i,L,_,.15);return v.set(B,{position:R,clear:U}),U};for(let L=0;L<g.length;L++){const _=g[L],y=E[L],I=_.type==="cow"?.78:.55;let B=0,R=0,P=0,U=0,N=0,q=0,O=0,Y=0;for(const Pt of E){if(Pt.id===_.id)continue;const C=y.x-Pt.x,Ot=y.z-Pt.z,bt=Math.hypot(C,Ot);if(bt<2&&bt>.01){const vt=(2-bt)/bt;B+=C*vt,R+=Ot*vt}bt<18&&w(y,Pt)&&(P+=Pt.x,U+=Pt.z,N+=Pt.vx,q+=Pt.vz,O++)}let j=B*2.5,et=R*2.5;const Lt=rs(y,t),Ut=Lt<b&&du(i,y,t),tt=!m.hold&&m.memberIds.has(_.id);if((Ut||tt)&&delete _.wander,Ut){const Pt=Math.pow(1-Lt/b,.65)*(e.bark?1.65+r.barkBoost:1),C=Lt>.01?Wn(y.x-t.x,y.z-t.z):Wn(Math.sin(t.heading||0),Math.cos(t.heading||0));j+=C.x*Pt*5.2,et+=C.z*Pt*5.2,Y=Pt,_.lastPlayerPressure=i.time}const lt=m.hold&&m.memberIds.has(_.id)&&Y<.03;if(a&&Y<.03){const Pt=m.centroid||Gh(E);for(let C=a.before+1;C<=a.after;C++){const Ot=X0(i,_,C,Pt,Ut||tt);if(Ot){_.wander=Ot;break}}}let V=_.wander;if(V&&i.time>=V.until&&(delete _.wander,V=null),lt){const Pt=m.state.positions[_.id];j=Sn((Pt.x-y.x)*2.6+B*.35,-1.1,1.1),et=Sn((Pt.z-y.z)*2.6+R*.35,-1.1,1.1)}else{if(O){const C=P/O-y.x,Ot=U/O-y.z,bt=Math.hypot(C,Ot);if(bt>2.6){const vt=Wn(C,Ot),mt=Math.min(2.6,(bt-2.6)*.36)*(1+r.cohesionBoost);j+=vt.x*mt,et+=vt.z*mt}j+=N/O*.45,et+=q/O*.45}const Pt=f.get(_.id);if(Pt&&Fe(i,y.x+Pt.x*.7,y.z+Pt.z*.7,I)&&Fs(i,y,{x:y.x+Pt.x,z:y.z+Pt.z},I)&&(j+=Pt.x,et+=Pt.z),Y<.03&&(j+=Math.sin(i.time*.6+_.id*2.1)*.12,et+=Math.cos(i.time*.5+_.id*1.7)*.12),V){const C=V.x-y.x,Ot=V.z-y.z,bt=Math.hypot(C,Ot);bt>.35?(j+=C/bt*(V.bolting?5.8:2.1),et+=Ot/bt*(V.bolting?5.8:2.1)):(delete _.wander,V=null)}}if(Y>.03){const Pt=xu(i,_,j,et,I);j+=Pt.x,et+=Pt.z}const $=V?.bolting?6:_.type==="cow"?3.3:4.2,at=Math.hypot(j,et);at>$&&(j*=$/at,et*=$/at);const ft=1-Math.exp(-n*(lt?12:_.type==="cow"?3.5:5.5));_.vx+=(j-_.vx)*ft,_.vz+=(et-_.vz)*ft;const pt=Rs(i,_,_.vx*n,_.vz*n,I);if((pt.blockedX||pt.blockedZ)&&Y>.03){const Pt=Wn(_.vx,_.vz),C=Math.min(.24,Math.hypot(_.vx,_.vz)*n);for(const Ot of[Math.PI/6,-Math.PI/6,Math.PI/3,-Math.PI/3,Math.PI/2,-Math.PI/2]){const bt=(Pt.x*Math.cos(Ot)-Pt.z*Math.sin(Ot))*C,vt=(Pt.x*Math.sin(Ot)+Pt.z*Math.cos(Ot))*C;if(Fe(i,_.x+bt,_.z+vt,I)){Rs(i,_,bt,vt,I);break}}}pt.blockedX&&(_.vx*=.45),pt.blockedZ&&(_.vz*=.45),_.heading=Math.hypot(_.vx,_.vz)>.1?Math.atan2(_.vx,_.vz):_.heading||0,_.alert=Y;const Wt=rs(t,i.target)<i.target.radius+12;n>0&&Wt&&!lt&&Hl(i.target,_,I)&&Fs(i,t,_)&&(_.saved=!0,_.vx=0,_.vz=0,delete _.wander,o.push({type:"animalSaved",id:_.id,animalType:_.type}))}const D=i.animals.filter(L=>L.saved).length;if(o.some(L=>L.type==="animalSaved")&&!i.delivery?.started){const L=Hr(i);i.delivery={started:!0,duration:L,remaining:L},o.push({type:"countdownStarted",duration:L})}return D===i.animals.length&&D>0?Dl(i,"all-arrived",o,x):Ro(i,o,!1,x)}function Os(){return{version:2,points:0,upgrades:{},completedLevels:[],bestScores:{},bestEarnedBolts:{},highestLevel:0,music:!0}}const ec=i=>80+i*25;function J0(i){const t={};if(!i||typeof i!="object"||Array.isArray(i))return t;for(const[e,n]of Object.entries(i)){const s=Number(e);String(s)!==e||!Number.isInteger(s)||s<0||s>99||!Number.isFinite(n)||n<=0||(t[s]=Sn(Math.floor(n),0,ec(s)),t[s]||delete t[s])}return t}function nc(i){const t=Os();if(!i||typeof i!="object")return t;t.points=Number.isFinite(i.points)?Sn(Math.floor(i.points),0,1e9):0,t.upgrades=Fh(i.upgrades);const e=[...new Set((Array.isArray(i.completedLevels)?i.completedLevels:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<=99))];if(t.bestEarnedBolts=J0(i.bestEarnedBolts),i.version===void 0||i.version===1)for(const n of e)t.bestEarnedBolts[n]=ec(n);return t.bestScores={...t.bestEarnedBolts},t.completedLevels=Object.keys(t.bestEarnedBolts).map(Number).sort((n,s)=>n-s),t.highestLevel=Sn(Math.max(Number.isInteger(i.highestLevel)?i.highestLevel:0,...t.completedLevels.map(n=>n+1)),0,99),t.music=i.music!==!1,t}function Q0(i,t){if(!t.completed||!Number.isInteger(t.index)||t.index<0||t.index>99)return 0;const e=t.result?.saved??t.animals.filter(a=>a.saved).length;if(e<=0||!t.animals.length)return 0;Object.assign(i,nc(i));const n=Math.min(ec(t.index),tc(t,e)),s=i.bestEarnedBolts[t.index]||0,r=Math.max(0,n-s);return i.bestScores[t.index]=Math.max(i.bestScores[t.index]||0,n),i.bestEarnedBolts[t.index]=Math.max(s,n),i.completedLevels.includes(t.index)||i.completedLevels.push(t.index),i.completedLevels.sort((a,o)=>a-o),i.highestLevel=Math.min(99,Math.max(i.highestLevel,t.index+1)),i.points+=r,r}function tx(i,t="flock-foundry-v1"){try{return i||=globalThis.localStorage,nc(JSON.parse(i.getItem(t)))}catch{return Os()}}function ex(i,t,e="flock-foundry-v1"){try{return t||=globalThis.localStorage,t.setItem(e,JSON.stringify(nc(i))),!0}catch{return!1}}const qe=(i,t=0,e=1)=>Math.max(t,Math.min(e,i));function nx(i){const t=Math.max(0,...(i.routes||[]).map(e=>Number.isFinite(e.length)?e.length:0));return qe(t/2+Hr(i),45,240)}function bs(i,t){let e=((i||0)^Math.imul(t,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),((e^e>>>15)>>>0)/4294967296}const Ll=i=>i?.position?{x:i.position.x,z:i.position.z}:i,ix=new Ht(4350794),sx=new Ht(5784367),rx=new Ht(7714243);function ax(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=qe(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function Da(i,t){if(!Fe(i,t.x,t.z,.4))return!1;for(const e of i.rivers||[]){if(e.points.some((n,s)=>s&&ax(t,e.points[s-1],n)<e.width/2+.8))return!1;for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,a=s*Math.sin(n.heading)+r*Math.cos(n.heading),o=s*Math.cos(n.heading)-r*Math.sin(n.heading);if(Math.abs(a)<n.length/2+.45&&Math.abs(o)<n.width/2+.45)return!1}}return!0}function ox(){const t=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=(n*64+s)*4,a=(Math.sin(n*.72+Math.sin(s*.31)*1.5)+Math.sin(n*1.37+s*.18))*.5,o=Math.round(145+a*28);t[r]=Math.round(o*.65),t[r+1]=o,t[r+2]=Math.min(255,o+24),t[r+3]=255}const e=new Th(t,64,64);return e.wrapS=e.wrapT=Un,e.repeat.set(1,5),e.magFilter=e.minFilter=ln,e.needsUpdate=!0,e}class cx{constructor(t,{maxSplashes:e=12,maxPuddles:n=8}={}){this.scene=t,this.root=new oe,this.root.name="Water and wetness effects",t.add(this.root),this.maxSplashes=Math.max(0,e|0),this.maxPuddles=Math.max(0,n|0),this.elapsed=0,this.wetness=0,this.level=null,this.flowMap=ox(),this.flowMaterial=new xn({map:this.flowMap,color:9096146,transparent:!0,opacity:.16,depthWrite:!1,side:be}),this.splashGeometry=new Ko(.2,.025,4,12),this.splashes=[],this.puddles=[],this.materialSnapshots=[],this.riverSnapshots=[],this.lastMoverPositions=new Map,this.lastSplashAt=new Map}setLevel(t,{grassMaterials:e=[],pathMaterials:n=[],waterMaterial:s=null,terrain:r=null,rivers:a=[],weather:o=null}={}){this.restoreMaterials(),this.clearEffects(),this.level=t,this.terrain=r,this.rivers=a,this.wetness=0,this.elapsed=0,this.puddleGrowthDuration=nx(t),this.rainElapsed=0,this.lastMoverPositions.clear(),this.lastSplashAt.clear();for(const[u,p]of[["grass",e],["path",n]])for(const d of Array.isArray(p)?p:[p])d?.color&&this.materialSnapshots.push({material:d,kind:u,color:d.color.clone(),roughness:d.roughness});this.waterSnapshot=s?{material:s,color:s.color?.clone(),roughness:s.roughness}:null;for(const u of a){if(!u?.mesh)continue;const p=u.mesh,d=this.flowMap.clone();d.repeat.set(1,1);const x=this.flowMaterial.clone();x.map=d,x.userData.ownedFlowMap=d;const g=p.geometry.clone(),m=g.attributes.position,f=g.attributes.uv,b=u.points;if(b?.length>1){for(let v=0;v<m.count;v++){const T=m.getX(v),w=m.getZ(v);let D=1/0,L=0,_=0,y=0;for(let I=1;I<b.length;I++){const B=b[I-1],R=b[I],P=R.x-B.x,U=R.z-B.z,N=Math.hypot(P,U);if(!N)continue;const q=qe(((T-B.x)*P+(w-B.z)*U)/(N*N)),O=T-B.x-q*P,Y=w-B.z-q*U,j=O*O+Y*Y;j<D&&(D=j,L=y+q*N,_=(-U*O+P*Y)/N),y+=N}f.setXY(v,_/Math.max(1,u.width||4),L/4)}f.needsUpdate=!0}const E=new re(g,x);E.name="River flow",E.position.copy(p.position),E.position.y+=.003,E.rotation.copy(p.rotation),E.scale.copy(p.scale),E.frustumCulled=p.frustumCulled,E.userData.flow={heading:u.heading||0,speed:u.flowSpeed??.12,localUV:b?.length>1},this.root.add(E)}for(let u=0;u<this.maxSplashes;u++){const p=new xn({color:13233904,transparent:!0,opacity:.78,depthWrite:!1}),d=new re(this.splashGeometry,p);d.visible=!1,d.rotation.x=-Math.PI/2,this.root.add(d),this.splashes.push({mesh:d,material:p,age:1})}const c=new $o(1,20);this.puddleResources={geometry:c};const l=t.seed??t.index??0,h=bs(l,71)<.5?0:1+Math.floor(bs(l,72)*3);for(const u of this.findPuddleSites()){const p=new xn({color:4549225,transparent:!0,opacity:.2,depthWrite:!1,side:be}),d=new re(c,p);d.rotation.x=-Math.PI/2,d.visible=!1,d.position.set(u.x,gi(t,u.x,u.z)+.024,u.z),d.scale.set(u.radius,u.radius*.62,1),this.root.add(d),this.puddles.push({mesh:d,material:p,depth:0,site:u,initialDepth:this.puddles.length<h?.1+bs(l,80+this.puddles.length)*.1:0})}if(o){this.wetness=o.kind==="storm"?.6:o.kind==="heavy-rain"?.35:o.type==="rain"?.03:0;for(const u of this.puddles)u.depth=o.type==="rain"?u.initialDepth:0,this.applyPuddleAppearance(u);this.applySurfaceWeather(o)}}findPuddleSites(){const t=this.level,e=t.bounds,n=[],s=e.maxX-e.minX,r=e.maxZ-e.minZ,a=t.seed??t.index??0,o=(l,h)=>{const{x:u,z:p}=l,d=Array.from({length:48},(x,g)=>{const m=1+Math.floor(g/16),f=g%16*Math.PI/8;return{x:u+Math.cos(f)*h*m/3,z:p+Math.sin(f)*h*.62*m/3}});return!Da(t,l)||d.some(x=>!Da(t,x))||n.some(x=>Math.hypot(x.x-u,x.z-p)<x.radius+h+.3)?!1:(n.push({...l,radius:h}),!0)},c=(t.routes||[]).filter(l=>l.points?.length>1);for(let l=0;l<this.maxPuddles&&c.length;l++){const h=c[l%c.length],u=h.points,p=u.slice(1).map((m,f)=>Math.hypot(m.x-u[f].x,m.z-u[f].z)),d=p.reduce((m,f)=>m+f,0),x=1.35+bs(a,150+l)*.69,g=l/Math.max(1,this.maxPuddles-1);for(let m=0;m<35;m++){let f=qe(g+(m<7?0:(Math.ceil((m-6)/7)%2?1:-1)*.035))*d,b=0;for(;b<p.length-1&&f>p[b];)f-=p[b++];const E=u[b],v=u[b+1],T=p[b]||1,w=qe(f/T),D=[0,2.5,-2.5,4,-4,6,-6][m%7]*(bs(a,200+l)<.5?-1:1),L={x:E.x+(v.x-E.x)*w-(v.z-E.z)/T*D,z:E.z+(v.z-E.z)*w+(v.x-E.x)/T*D};if(o(L,x))break}}for(let l=1;l<Math.max(100,this.maxPuddles*80)&&n.length<this.maxPuddles;l++){const h=e.minX+2+l*.61803398875%1*Math.max(1,s-4),u=e.minZ+2+l*.75487766625%1*Math.max(1,r-4);o({x:h,z:u},1.35+l*37%70/100)}return n}applyPuddleAppearance(t){const e=Math.sqrt(t.depth);t.mesh.scale.set(t.site.radius*e,t.site.radius*.62*e,1),t.mesh.visible=t.depth>.008,t.material.opacity=t.mesh.visible?.18+t.depth*.24:0}restoreMaterials(){for(const t of this.materialSnapshots)t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color.dispose?.();if(this.materialSnapshots=[],this.waterSnapshot){const t=this.waterSnapshot;t.color&&t.material.color&&t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color?.dispose?.(),this.waterSnapshot=null}}clearEffects(){for(const t of this.splashes)this.root.remove(t.mesh),t.material.dispose();for(const t of this.puddles)this.root.remove(t.mesh),t.material.dispose();this.splashes=[],this.puddles=[],this.puddleResources&&(this.puddleResources.geometry.dispose(),this.puddleResources=null);for(const t of[...this.root.children])t.name==="River flow"&&(this.root.remove(t),t.material.userData.ownedFlowMap?.dispose(),t.material.dispose(),t.geometry.dispose())}applySurfaceWeather(t={}){const e=t.type==="rain"?qe(t.rainIntensity??t.intensity??0):0;for(const n of this.materialSnapshots){const s=this.wetness*(n.kind==="grass"?.62:.85);n.material.color.copy(n.color).lerp(n.kind==="grass"?ix:sx,s),n.roughness!==void 0&&(n.material.roughness=Math.max(.28,n.roughness-this.wetness*.22))}if(this.waterSnapshot){const n=this.waterSnapshot,s=qe(t.cloudCoverage??0);n.material.color&&n.color&&n.material.color.copy(n.color).lerp(rx,qe((t.rainIntensity??e)*.11+s*.035+(t.severity||0)*.025+(t.lightningFlash||0)*.09)),n.roughness!==void 0&&(n.material.roughness=qe(n.roughness-(t.rainIntensity??e)*.16,.12,1))}}update(t,{weather:e={},movers:n=[],paused:s=!1}={}){if(!this.level||s||!(t>0))return;t=Math.min(t,.1),this.elapsed+=t;const r=e.type==="rain"?qe(e.rainIntensity??e.intensity??0):0;this.wetness=qe(this.wetness+r*t*.012-t*(e.type==="sun"?.004:.0012)),this.applySurfaceWeather(e);for(const a of this.root.children)if(a.userData.flow){const o=a.userData.flow,c=a.material.map,l=t*(o.speed+(e.windIntensity||0)*.025);c.offset.x=(c.offset.x+(o.localUV?0:Math.sin(o.heading))*l)%1,c.offset.y=(c.offset.y+(o.localUV?1:Math.cos(o.heading))*l)%1,a.material.opacity=.08+r*.18+(e.daylight??.7)*.025+(e.lightningFlash||0)*.2}r>0&&(this.rainElapsed+=t);for(const a of this.puddles)a.depth=r>0?qe(a.initialDepth+(1-a.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):qe(a.depth-t*(e.type==="sun"?.006:8e-4)),this.applyPuddleAppearance(a);for(const a of n){const o=Ll(a);if(!o||!Number.isFinite(o.x)||!Number.isFinite(o.z))continue;const c=a.id??a.kind??"mover",l=Ll(a.previousPosition)||(Number.isFinite(a.previousX)?{x:a.previousX,z:a.previousZ}:this.lastMoverPositions.get(c)),h=l&&Math.hypot(o.x-l.x,o.z-l.z)>.008,u=this.puddles.find(p=>p.mesh.visible&&(o.x-p.site.x)**2/p.site.radius**2+(o.z-p.site.z)**2/(p.site.radius*.62)**2<p.depth);h&&u&&Da(this.level,o)&&this.elapsed-(this.lastSplashAt.get(c)||-10)>.22&&(this.spawnSplash(o),this.lastSplashAt.set(c,this.elapsed)),this.lastMoverPositions.set(c,{x:o.x,z:o.z})}for(const a of this.splashes)a.age>=1||(a.age=Math.min(1,a.age+t*2.4),a.mesh.scale.setScalar(.4+a.age*2.3),a.mesh.position.y=.06+gi(this.level,a.mesh.position.x,a.mesh.position.z)+a.age*.06,a.material.opacity=.78*(1-a.age),a.age>=1&&(a.mesh.visible=!1))}spawnSplash(t){const e=this.splashes.find(n=>n.age>=1);e&&(e.age=0,e.mesh.position.set(t.x,gi(this.level,t.x,t.z)+.08,t.z),e.mesh.scale.setScalar(.35),e.mesh.visible=!0)}dispose(){this.restoreMaterials(),this.clearEffects(),this.root.removeFromParent(),this.flowMap.dispose(),this.flowMaterial.dispose(),this.splashGeometry.dispose(),this.level=null,this.scene=null}}const Hh={sun:{rainIntensity:0,windIntensity:.12,severity:0,cloudCoverage:.22,daylight:1},wind:{rainIntensity:0,windIntensity:.6,severity:.3,cloudCoverage:.4,daylight:.96},rain:{rainIntensity:.3,windIntensity:.3,severity:.28,cloudCoverage:.5,daylight:.94},"heavy-rain":{rainIntensity:.65,windIntensity:.55,severity:.6,cloudCoverage:.7,daylight:.82},storm:{rainIntensity:.9,windIntensity:.85,severity:.88,cloudCoverage:.85,daylight:.7}};function ic(i,t){let e=(i^Math.imul(t+1,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),(e^e>>>15)>>>0}function lx(i,t,e){const n=e+1;if(n<=5)return"sun";const s=typeof i.weather=="string"?i.weather:i.weather?.kind||i.weather?.type,r=s==="light-rain"||s==="snow"?"rain":s;if(r&&Hh[r])return r==="sun"||r==="wind"?r:n<9?"sun":r==="storm"&&n>=24?"storm":(r==="storm"||r==="heavy-rain")&&n>=16?"heavy-rain":"rain";if(n===9)return"rain";if(n===16)return"heavy-rain";if(n===24)return"storm";const a=ic(t,e)/4294967296;return n<9?a<.65?"sun":"wind":n<16?a<.35?"sun":a<.5?"wind":"rain":n<24?a<.25?"sun":a<.35?"wind":a<.65?"rain":"heavy-rain":a<.2?"sun":a<.3?"wind":a<.5?"rain":a<.75?"heavy-rain":"storm"}function Wh(i={}){const t=Number.isFinite(i.index)?Math.max(0,Math.floor(i.index)):0,e=Number.isFinite(i.seed)?i.seed>>>0:42,n=lx(i,e,t),s=Hh[n];return{...s,kind:n,type:n==="heavy-rain"||n==="storm"?"rain":n,snowIntensity:0,storm:n==="storm",elapsed:0,seed:e,levelIndex:t,intensity:Math.max(s.rainIntensity,n==="wind"?s.windIntensity:0),wind:.2+s.windIntensity*1.6,particles:s.rainIntensity>0?128:0,lightningId:null,lightningAge:1/0,thunderDelay:.8,lightningFlash:0,clouds:0,butterflies:n==="storm"?0:s.rainIntensity>0?4:8,birds:n==="storm"?0:5,squirrels:n==="storm"?0:3,lightningStart:8+ic(e,t+1e3)%401/100,lightningInterval:24}}function hx(i,t){if(Number.isFinite(t)&&t>0&&(i.elapsed+=t),!i.storm)return i;const e=Math.floor((i.elapsed-i.lightningStart)/i.lightningInterval);return e<0||(i.lightningId=`${i.seed}:${i.levelIndex}:${e}`,i.lightningAge=Math.max(0,i.elapsed-(i.lightningStart+e*i.lightningInterval)),i.thunderDelay=.8+ic(i.seed,i.levelIndex+e+2e3)%9/10,i.lightningFlash=i.lightningAge<.22?.9*(1-i.lightningAge/.22):0),i}const Cs=(i,t,e)=>Math.max(t,Math.min(e,i)),Nr=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),sc=i=>()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);function ux(i,t=Wh(i)){if(t.kind==="storm"||t.storm)return{squirrel:0,rabbit:0,bird:0,butterfly:0};const e=(i.bounds.maxX-i.bounds.minX)*(i.bounds.maxZ-i.bounds.minZ),n=sc((i.seed||42)^1464421444),s=Cs(e/3600,.55,2.4),r=(a,o)=>Math.min(o,Math.max(1,Math.round(a*s*(.78+n()*.44))));return{squirrel:r(2,7),rabbit:r(2,8),bird:Math.min(6,Math.max(2,Math.round(3*s))),butterfly:Math.min(8,Math.max(0,Math.round(5*s)))}}function dx(i,t){let e=1/0;for(const n of i.roads||[]){const s=n.points||[n.from,n.to];for(let r=1;r<s.length;r++){const a=s[r-1],o=s[r],c=o.x-a.x,l=o.z-a.z,h=Cs(((t.x-a.x)*c+(t.z-a.z)*l)/(c*c+l*l||1),0,1);e=Math.min(e,Math.hypot(t.x-a.x-c*h,t.z-a.z-l*h))}}return e}const Il=new WeakMap;function fx(i,t){let e=Il.get(i);e||(e=new Map,Il.set(i,e));let n=e.get(t);if(!n||n.sourceRivers!==i.rivers||n.sourceObstacles!==i.obstacles||n.sourceFenceSegments!==i.fenceSegments||n.targetType!==i.target?.type){const s=i.bounds,r=(i.fenceSegments||[]).filter(a=>a.kind==="wall"||a.kind==="stone"||a.material==="stone"||a.kind==="target"&&i.target?.type==="barn");n={...i,sourceRivers:i.rivers,sourceObstacles:i.obstacles,sourceFenceSegments:i.fenceSegments,targetType:i.target?.type,fenceSegments:r,bounds:{minX:s.minX-t-1,maxX:s.maxX+t+1,minZ:s.minZ-t-1,maxZ:s.maxZ+t+1}},e.set(t,n)}return n}function rc(i,t,e=.45){const n=i.bounds;return t.x>=n.minX-e&&t.x<=n.maxX+e&&t.z>=n.minZ-e&&t.z<=n.maxZ+e&&Fe(fx(i,e),t.x,t.z,.4)}function px(i,t,e=[],n=.45){return dx(i,t)>5.5&&rc(i,t,n)&&e.every(s=>Nr(t,s)>8)}const mx={butterfly:.54,squirrel:.58,bird:.64,rabbit:.76};function gx(i,t){let e=null,n=18;for(const s of i.obstacles||[]){const r=Nr(t,s);if(r>=n||r<.01)continue;const a=s.radius+.85,o=(t.x-s.x)/r,c=(t.z-s.z)/r,l={x:s.x+o*a,z:s.z+c*a};rc(i,l,.2)&&(e=l,n=r)}return e||{x:t.homeX,z:t.homeZ}}function xx(i){const t=sc(i.randomSeed||(Math.floor((i.phase||0)*1e6)^i.slot||1)>>>0);i.randomSeed=Math.floor(t()*4294967295)||1;const e=t()*Math.PI*2,n=3+t()*8;i.waypointX=i.homeX+Math.cos(e)*n,i.waypointZ=i.homeZ+Math.sin(e)*n,i.waitTimer=0}function _x(i,t,e,n=[],s=0,r=i.weather,a=rc){const o=typeof r=="function";if(o&&(a=r,r=i.weather),!(e>0))return t;const c=t.x,l=t.z,h=Cs(Number(r?.severity)||0,0,1),u=mx[t.kind]??.64;h>=u?t.sheltering=!0:h<u-.12&&(t.sheltering=!1);const p=t.kind==="bird"?10:t.kind==="butterfly"?6:7.5;let d=!1,x=0,g=0;for(const w of n){const D=Nr(t,w);D<p&&(d=!0,x+=(t.x-w.x)/Math.max(.1,D)*(p-D),g+=(t.z-w.z)/Math.max(.1,D)*(p-D))}if(d)t.fleeing||(t.homeX=t.x,t.homeZ=t.z),t.waypointX=void 0,t.waypointZ=void 0,t.alertTimer=1.15,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,t.shelterX=void 0;else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.sheltering){if(t.shelterX===void 0){const w=gx(i,t);t.shelterX=w.x,t.shelterZ=w.z}t.shelter=Math.min(1,(t.shelter||0)+e*.32),x=t.shelterX-t.x,g=t.shelterZ-t.z}else if(t.shelter=Math.max(0,(t.shelter||0)-e*.48),t.hidden=t.shelter>=.995,t.shelterX!==void 0&&t.shelter===0&&(t.shelterX=void 0,t.shelterZ=void 0,t.waypointX=void 0),t.alertTimer>0)x=g=0;else if((t.waitTimer||0)>0)t.waitTimer=Math.max(0,t.waitTimer-e),x=g=0;else if(t.waypointX!==void 0&&Nr(t,{x:t.waypointX,z:t.waypointZ})<.45){const w=sc(t.randomSeed||1);t.randomSeed=Math.floor(w()*4294967295)||1,t.waypointX=void 0,t.waypointZ=void 0,t.waitTimer=.55+w()*2.1,x=g=0}else t.waypointX===void 0&&xx(t),x=t.waypointX-t.x,g=t.waypointZ-t.z;let m=Math.hypot(x,g);if(d&&m<.01){const w=Number.isFinite(t.heading)?t.heading:t.phase||0;x=Math.sin(w),g=Math.cos(w),m=1}const f=t.kind==="rabbit",b=((t.gait||0)%1+1)%1,E=!f||b<.54;let v=d?t.kind==="bird"?5.2:f?4.2:3.5:t.kind==="squirrel"?.9:f?3.5:t.kind==="bird"?1.4:.8;t.sheltering&&!d&&(v=.95);const T=m>.01&&E?Math.min(m,e*v):0;if(T){const w=t.x+x/m*T,D=t.z+g/m*T,L=_=>o?a(i,_.x,_.z,.4):a(i,_,.45);t.kind==="bird"||L({x:w,z:D})?(t.x=w,t.z=D):L({x:w,z:t.z})?t.x=w:L({x:t.x,z:D})&&(t.z=D)}if(t.moving=Math.hypot(t.x-c,t.z-l)>.001,t.moving)t.heading=Math.atan2(t.x-c,t.z-l),t.stuckTimer=0;else if(T>.001&&(t.stuckTimer=(t.stuckTimer||0)+e,t.stuckTimer>=1)){const w=i.bounds;t.waypointX=t.x>w.maxX-.2?w.maxX-1.2:t.x<w.minX+.2?w.minX+1.2:Cs(t.homeX,w.minX+1.2,w.maxX-1.2),t.waypointZ=t.z>w.maxZ-.2?w.maxZ-1.2:t.z<w.minZ+.2?w.minZ+1.2:Cs(t.homeZ,w.minZ+1.2,w.maxZ-1.2),t.shelterX=void 0,t.shelterZ=void 0,t.stuckTimer=0,t.waitTimer=.2}return t.fleeing=d,t.alert=d||t.alertTimer>0,t.gait=(t.gait||0)+e*(d?1.8:f?1.35:t.kind==="squirrel"?1.7:1.2),t.hidden=t.shelter>=.995&&!d,t}const Xh={squirrel:[{part:"body",at:[0,.31,0],scale:[.2,.23,.32],color:"#a97552"},{part:"head",at:[0,.47,.2],scale:[.17,.17,.17],color:"#bd8960"},{part:"tail",at:[0,.48,-.34],scale:[.2,.31,.19],color:"#8e5b3e",tilt:-.48},{part:"ear",at:[-.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"ear",at:[.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"paw",at:[-.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"eye",at:[-.105,.5,.33],scale:[.025,.03,.018],color:"#171819"},{part:"eye",at:[.105,.5,.33],scale:[.025,.03,.018],color:"#171819"}],rabbit:[{part:"body",at:[0,.31,-.02],scale:[.25,.27,.34],color:"#d6c7aa"},{part:"haunch",at:[0,.25,-.23],scale:[.23,.23,.22],color:"#c4b08f"},{part:"head",at:[0,.48,.25],scale:[.17,.17,.17],color:"#e4d6bd"},{part:"ear",at:[-.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"ear",at:[.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"tail",at:[0,.34,-.4],scale:[.095,.1,.095],color:"#f0e9dc"},{part:"paw",at:[-.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"eye",at:[-.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"},{part:"eye",at:[.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"}]};function Mx(i){const t=[],e=[],n=[],s=new Si(1,10,8).toNonIndexed(),r=s.getAttribute("position"),a=s.getAttribute("normal"),o=new Ht,c=new Vt;for(const h of Xh[i]){if(h.part==="paw")continue;const u=new fn(h.tilt||0,0,0),p=new Kt().compose(new F(...h.at),new Ei().setFromEuler(u),new F(...h.scale));c.getNormalMatrix(p),o.set(h.color);for(let d=0;d<r.count;d++){const x=new F().fromBufferAttribute(r,d).applyMatrix4(p),g=new F().fromBufferAttribute(a,d).applyMatrix3(c).normalize();t.push(x.x,x.y,x.z),e.push(g.x,g.y,g.z),n.push(o.r,o.g,o.b)}}s.dispose();const l=new ve;return l.setAttribute("position",new te(t,3)),l.setAttribute("normal",new te(e,3)),l.setAttribute("color",new te(n,3)),l.computeBoundingSphere(),l}const vx={light:96,heavy:176,storm:256},yx={light:16,heavy:23,storm:30},Dn=1.25;class Sx{constructor(t){this.root=new oe,this.root.name="Visible rain",t.add(this.root),this.geometry=new ve,this.material=new Ah({color:"#e5f2f4",transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1}),this.lines=new Gd(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=20,this.root.add(this.lines),this.randomState=8029,this.positions=new Float32Array(0),this.drops=[],this.active=0,this.fallbackCamera=new kr(-30,30,20,-20,.1,180),this.fallbackCamera.position.set(0,36,29),this.fallbackCamera.lookAt(0,0,-2)}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}resize(t){t!==this.active&&(this.active=t,this.positions=new Float32Array(t*6),this.drops=Array.from({length:t},()=>({x:(this.random()*2-1)*Dn,y:(this.random()*2-1)*Dn})),this.geometry.setAttribute("position",new Oe(this.positions,3)),this.geometry.setDrawRange(0,t*2))}update(t,{weather:e={},camera:n=this.fallbackCamera,paused:s=!1}={}){const r=e.kind||e.type,a=Math.max(0,Math.min(1,e.rainIntensity??e.intensity??0)),o=r==="storm"||e.severity>=.78?"storm":r==="heavy-rain"||a>=.68?"heavy":r==="rain"&&a>.02?"light":null;if(this.resize(o?vx[o]:0),!this.active)return;this.material.opacity=o==="light"?.48:o==="heavy"?.6:.7;const c=s?0:Math.min(.1,Math.max(0,Number(t)||0)),l=Math.max(-8,Math.min(8,e.windIntensity??e.wind??0)),h=yx[o],u=o==="storm"?(l<0?-1:1)*Math.max(10,Math.abs(l)*16):l*3,p=new F(u,-h,0),d=o==="light"?.8:o==="heavy"?1.3:1.8;n.updateMatrixWorld(!0);const g=new F(0,0,0).unproject(n).clone().add(p).project(n);for(let m=0;m<this.active;m++){const f=this.drops[m];f.x+=g.x*c,f.y+=g.y*c,f.y<-Dn&&(f.y+=Dn*2,f.x=(this.random()*2-1)*Dn),f.x>Dn&&(f.x-=Dn*2),f.x<-Dn&&(f.x+=Dn*2);const b=new F(f.x,f.y,0).unproject(n),E=b.clone().addScaledVector(p,d/h);b.toArray(this.positions,m*6),E.toArray(this.positions,m*6+3)}this.geometry.attributes.position.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose(),this.root.removeFromParent()}}const bx=(i,t,e)=>Math.max(t,Math.min(e,i));function Ex(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}class wx{constructor(t){this.scene=t,this.root=new oe,this.root.name="Meadow nature",t.add(this.root),this.resources=new Set,this.time=0,this.wildlife=[],this.batches={},this.transform=new ge}own(t){return this.resources.add(t),t}clear(){this.root.traverse(t=>{t.isInstancedMesh&&t.dispose()}),this.root.clear(),this.resources.forEach(t=>t.dispose()),this.resources.clear(),this.rainView?.dispose(),this.rainView=null,this.wildlife=[],this.batches={},this.precipitation=null}batch(t,e,n,s){const r=new mi(e,n,s);return r.instanceMatrix.setUsage(Cr),r.frustumCulled=!1,this.root.add(r),this.batches[t]=r,r}setLevel(t){this.clear(),this.level=t,this.time=0,this.weather=Wh(t);const e=Ex((t.seed||42)+71053),n=t.bounds,s=n.maxX-n.minX,r=n.maxZ-n.minZ,a=[t.dog||t.spawn,...t.animals||[]].filter(Boolean),o=this.own(new Si(1,10,8)),c=ux(t),l=["butterfly","bird","squirrel","rabbit"];for(const u of l){const p=c[u]||0;if(p)for(let d=0;d<p;d++){let x=null;for(let g=0;g<240;g++){const m=(t.roads||[]).flatMap(T=>T.points||[T.from,T.to]).filter(Boolean),f=g<120&&m.length?m[Math.floor(e()*m.length)]:null,b=e()*Math.PI*2,E=8+e()*13,v=f?{x:f.x+Math.cos(b)*E,z:f.z+Math.sin(b)*E}:{x:n.minX+2+e()*(s-4),z:n.minZ+2+e()*(r-4)};if(px(t,v,a,.5)){x=v;break}}this.wildlife.push({kind:u,slot:d,x:x?.x??0,z:x?.z??0,homeX:x?.x??0,homeZ:x?.z??0,phase:e()*Math.PI*2,heading:e()*Math.PI*2,visible:!!x,gait:0,hidden:!1,hideTimer:0})}}const h={bird:["#54777b","#91adb0"],butterfly:["#65523f","#f2ac75"]};for(const u of["bird","butterfly"]){const p=c[u]||0;if(!p)continue;const[d,x]=h[u];this.batch(`${u}Body`,o,this.own(new Se({color:d,roughness:1})),p),this.batch(`${u}Wing`,o,this.own(new Se({color:x,roughness:1})),p*2)}for(const u of["squirrel","rabbit"]){const p=c[u]||0;if(!p)continue;this.batch(`${u}Body`,this.own(Mx(u)),this.own(new Se({vertexColors:!0,roughness:.94})),p);const d=u==="squirrel"?"#74503b":"#b09b7c";this.batch(`${u}Paw`,o,this.own(new Se({color:d,roughness:.94})),p*2)}this.rainView=new Sx(this.root),this.update(0,{dog:t.dog||t.spawn,animals:t.animals})}pose(t,e,n,s,r,a,o,c,l=0,h=0,u=0){const p=this.transform;p.position.set(n,s,r),p.rotation.set(u,l,h),p.scale.set(a,o,c),p.updateMatrix(),t.setMatrixAt(e,p.matrix)}hideParts(t){if(t.kind==="bird"||t.kind==="butterfly"){this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Wing`],t.slot*2+e,0,-100,0,0,0,0)}else{this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Paw`],t.slot*2+e,0,-100,0,0,0,0)}}update(t,{dog:e,animals:n=[],camera:s,paused:r=!1}={}){if(!this.level)return;t=r?0:bx(Number(t)||0,0,.1),this.time+=t,hx(this.weather,t);const a=this.time,o=[e,...n,...this.level.helpers||[]].filter(Boolean);for(const c of this.wildlife){if(_x(this.level,c,t,o,a,this.weather),!c.visible||c.hidden){this.hideParts(c);continue}const l=c.kind==="bird"||c.kind==="butterfly",h=c.kind==="squirrel",u=c.kind==="rabbit",p=((c.gait||0)%1+1)%1,d=p<.54,x=u&&c.moving&&d?Math.sin(p/.54*Math.PI)*.24:h&&c.moving?Math.abs(Math.sin(p*Math.PI*2))*.1:0,g=Math.max(.06,1-(c.shelter||0)*.94),m=(h?.12:u?.04:l?3.2:1)+gi(this.level,c.x,c.z)+(l?Math.sin(a*(c.kind==="bird"?1.5:2)+c.phase)*.28:x)+(c.alert?.08:0);if(h||u){const f=u&&!d?.9:1,b=u&&d?-.14*Math.sin(p/.54*Math.PI):0,E=h&&c.moving?Math.sin(p*Math.PI*2)*.06:0;this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,g,g*f,g,c.heading,E,b);const v=Xh[c.kind].filter(T=>T.part==="paw");for(let T=0;T<v.length;T++){const w=v[T],D=c.moving?u&&d?Math.sin(p/.54*Math.PI)*.08:Math.sin(p*Math.PI*2+T*Math.PI)*.07:0,L=w.at[0],_=w.at[2],y=c.x+Math.cos(c.heading)*L+Math.sin(c.heading)*_,I=c.z-Math.sin(c.heading)*L+Math.cos(c.heading)*_;this.pose(this.batches[`${c.kind}Paw`],c.slot*2+T,y,m+w.at[1]*g+D,I,w.scale[0]*g,w.scale[1]*g,w.scale[2]*g,c.heading)}}else{this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,(c.kind==="bird"?.09:.075)*g,(c.kind==="bird"?.08:.06)*g,(c.kind==="bird"?.28:.12)*g,c.heading);for(let f=0;f<2;f++){const b=Math.sin(a*(c.kind==="bird"?11:18)+c.phase)*(c.kind==="bird"?.5:.85);this.pose(this.batches[`${c.kind}Wing`],c.slot*2+f,c.x+(f?1:-1)*.15,m+.04,c.z,.22*g,.025*g,.16*g,c.heading,(f?1:-1)*b)}}}for(const c of Object.values(this.batches))c.instanceMatrix.needsUpdate=!0;this.rainView?.update(t,{weather:this.weather,camera:s,paused:r})}dispose(){this.clear(),this.scene.remove(this.root),this.level=null}}function qh(){const i=new oe,t=new Set,e=new Set;return i.ownGeometry=n=>(t.add(n),n),i.ownMaterial=n=>(e.add(n),n),i.dispose=()=>{i.traverse(n=>{n.isInstancedMesh&&n.dispose()}),t.forEach(n=>n.dispose()),e.forEach(n=>n.dispose())},i}function Tx(i=[]){const t=qh(),e=t.ownMaterial(new Se({color:"#a97640",roughness:.9})),n=t.ownMaterial(new Se({color:"#4e594b",roughness:.7})),s=t.ownGeometry(new Je(1,1,1)),r=[],a=new Map,o=(l,h,u,p,d,x,g)=>{let m=a.get(l);m||a.set(l,m=new Map);let f=m.get(g);f||m.set(g,f=[]),f.push({x:h,y:u,w:p,h:d,d:x})};for(const l of i.filter(h=>h.operable)){const h=new oe;h.position.set(l.x,0,l.z),h.rotation.y=l.heading,t.add(h);for(const p of[-l.width/2,l.width/2])o(h,p,.85,.22,1.7,.3,n);const u=new oe;u.name="gate-panel",h.add(u);for(const p of[.45,1.2])o(u,0,p,l.width,.15,.22,e);for(let p=0;p<=Math.ceil(l.width/1.2);p++)o(u,-l.width/2+l.width*p/Math.ceil(l.width/1.2),.82,.14,1.05,.19,e);o(u,l.width/2-.35,.85,.24,.28,.3,n),r.push({gate:l,panel:u})}const c=new Kt;for(const[l,h]of a)for(const[u,p]of h){const d=new mi(s,u,p.length);p.forEach((x,g)=>{c.makeScale(x.w,x.h,x.d),c.setPosition(x.x,x.y,0),d.setMatrixAt(g,c)}),d.castShadow=d.receiveShadow=!0,l.add(d)}return t.update=()=>{for(const{gate:l,panel:h}of r)h.position.x=l.open?-l.width:0},t.update(),t}function Ax(i=[]){const t=qh(),e=t.ownGeometry(new Je(1,1,1)),n=t.ownMaterial(new Se({color:"#8a8d7b",roughness:1})),s=[];for(const h of i.filter(u=>u.material==="stone")){const{a:u,b:p}=h,d=Math.hypot(p.x-u.x,p.z-u.z);if(d<.001)continue;const x=Math.max(1,Math.ceil(d/1.7)),g=-Math.atan2(p.z-u.z,p.x-u.x);for(let m=0;m<3;m++)for(let f=0;f<x;f++){const b=Math.max(0,(f-m%2*.35)/x),E=Math.min(1,(f+1-m%2*.35)/x);E<=b||(s.push({x:u.x+(p.x-u.x)*(b+E)/2,z:u.z+(p.z-u.z)*(b+E)/2,y:.22+m*.44,width:d*(E-b)-.025,yaw:g}),m%2&&f===x-1&&s.push({x:p.x-(p.x-u.x)*.175/x,z:p.z-(p.z-u.z)*.175/x,y:.22+m*.44,width:d*.35/x-.025,yaw:g}))}}const r=new mi(e,n,s.length),a=new Kt,o=new Ei,c=new F,l=new F;return s.forEach((h,u)=>{l.set(h.x,h.y,h.z),o.setFromAxisAngle(new F(0,1,0),h.yaw),c.set(Math.max(.01,h.width),.42,.6),a.compose(l,o,c),r.setMatrixAt(u,a)}),r.castShadow=r.receiveShadow=!0,t.add(r),t}class Rx{constructor(t,e,{halfExtent:n=t.radius+1.4,opacity:s=.7}={}){this.target=t,this.halfExtent=n,this.opacity=s,this.covered=new Set,this.disposed=!1,this.parts=e.map(r=>{const a=r.material,o=a.clone();return r.material=o,r.geometry.computeBoundingBox(),{mesh:r,original:a,material:o,shadow:r.castShadow,alpha:1}}),this.cameraLocal=new F,this.cameraDirection=new F,this.up=new F(0,1,0)}update(t,e,n){if(this.disposed||!Number.isFinite(n)||n<=0)return;t.updateMatrixWorld(!0),t.getWorldDirection(this.cameraDirection).negate(),this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));const s=new Set;Math.abs(this.cameraLocal.x)>.02&&s.add(this.cameraLocal.x>=0?"+x":"-x"),Math.abs(this.cameraLocal.z)>.02&&s.add(this.cameraLocal.z>=0?"+z":"-z");const r=this.target.heading||0,a=Math.cos(r),o=Math.sin(r),c=[],l=new Set(e);for(const u of this.covered)l.has(u)||this.covered.delete(u);for(const u of e){const p=u.x-this.target.x,d=u.z-this.target.z,x=p*a-d*o,g=p*o+d*a,m=u.type==="cow"?.65:.4,f=this.halfExtent+m+(this.covered.has(u)?.18:0);Math.abs(x)<=f&&Math.abs(g)<=f?(this.covered.add(u),c.push({actor:u,radius:m})):this.covered.delete(u)}const h=-Math.expm1(-12*Math.min(n,.25));for(const u of this.parts){const{mesh:p,material:d}=u,g=c.length>0&&(p.userData.coverKind==="roof"||s.has(p.userData.coverSide))?this.opacity:1;u.alpha+=(g-u.alpha)*h,Math.abs(u.alpha-g)<.001&&(u.alpha=g),d.opacity=u.original.opacity*u.alpha;const m=u.alpha<1;d.transparent!==(m||u.original.transparent)&&(d.transparent=m||u.original.transparent,d.needsUpdate=!0),d.depthWrite=m?!1:u.original.depthWrite,p.castShadow=m?!1:u.shadow}}dispose(){if(!this.disposed){this.disposed=!0;for(const{mesh:t,original:e,material:n,shadow:s}of this.parts)t.material=e,t.castShadow=s,n.dispose();this.parts=[],this.covered.clear()}}}function Ul(i,t=.033){const e=new ve,n=zn(i).corners;return e.setAttribute("position",new te(n.flatMap(s=>[s.x,t,s.z]),3)),e.setAttribute("uv",new te([0,0,1,0,1,1,0,1],2)),e.setIndex([0,1,2,0,2,3]),e.computeVertexNormals(),e}function Cx(i,t=.26,e=.04){const n=zn(i),s=Math.max(0,n.halfLength-t),r=Math.max(0,n.halfWidth-t),a=[[-s,-r],[s,-r],[s,r],[-s,r]].map(([l,h])=>Qi(i,l,h)),o=new ve,c=[];o.setAttribute("position",new te([...n.corners,...a].flatMap(l=>[l.x,e,l.z]),3));for(let l=0;l<4;l++){const h=(l+1)%4;c.push(l,h,h+4,l,h+4,l+4)}return o.setIndex(c),o.computeVertexNormals(),o}function Px(i,t,e){const n=zn(t).corners;i.fillStyle="#f9e7a2",i.strokeStyle="#fff0b5",i.lineWidth=1,i.beginPath(),n.forEach((s,r)=>{const a=e(s);r?i.lineTo(a.x,a.y):i.moveTo(a.x,a.y)}),i.closePath(),i.fill(),i.stroke()}const ze=1e-9,Mr=(i,t)=>i.x*t.z-i.z*t.x,Es=(i,t)=>({x:i.x-t.x,z:i.z-t.z});function Dx(i,t=0){const e=[],n=[],s=[];for(const d of i){const x=[];s.push(x);for(let g=0;g<d.length;g++){const m=d[g],f=d[(g+1)%d.length];if(n.push(m.x),Math.abs(m.x-f.x)>ze){const b={a:m,b:f,min:Math.min(m.x,f.x),max:Math.max(m.x,f.x),id:e.length};e.push(b),x.push(b)}}}for(let d=0;d<e.length;d++)for(let x=d+1;x<e.length;x++){const g=e[d],m=e[x];if(g.max<=m.min||m.max<=g.min)continue;const f=Es(g.b,g.a),b=Es(m.b,m.a),E=Mr(f,b);if(Math.abs(E)<ze)continue;const v=Es(m.a,g.a),T=Mr(v,b)/E,w=Mr(v,f)/E;T>ze&&T<1-ze&&w>ze&&w<1-ze&&n.push(g.a.x+T*f.x)}n.sort((d,x)=>d-x);const r=n.filter((d,x)=>!x||d-n[x-1]>ze),a=[],o=[],c=(d,x)=>d.a.z+(x-d.a.x)*(d.b.z-d.a.z)/(d.b.x-d.a.x),l=(d,x,g)=>{[d,x,g]=[d,x,g].map(f=>({x:Math.fround(f.x),z:Math.fround(f.z)}));const m=Mr(Es(x,d),Es(g,d));if(!(Math.abs(m)<ze)){m>0&&([x,g]=[g,x]);for(const f of[d,x,g])a.push(f.x,t,f.z),o.push(f.x/4,f.z/4)}};let h=new Map;const u=[];for(let d=1;d<r.length;d++){const x=r[d-1],g=r[d],m=(x+g)/2,f=[];for(const v of s){const T=v.filter(w=>m>w.min&&m<w.max).sort((w,D)=>c(w,m)-c(D,m));T.length>=2&&f.push({low:T[0],high:T[T.length-1]})}f.sort((v,T)=>c(v.low,m)-c(T.low,m));const b=[];for(const v of f){const T=b[b.length-1];T&&c(v.low,m)<=c(T.high,m)+ze?c(v.high,m)>c(T.high,m)&&(T.high=v.high):b.push({...v})}const E=new Map;for(const{low:v,high:T}of b){const w=`${v.id}:${T.id}`,D=h.get(w);D?(D.right=g,E.set(w,D),h.delete(w)):E.set(w,{low:v,high:T,left:x,right:g})}u.push(...h.values()),h=E}u.push(...h.values());for(const{low:d,high:x,left:g,right:m}of u){const f={x:g,z:c(d,g)},b={x:m,z:c(d,m)},E={x:m,z:c(x,m)},v={x:g,z:c(x,g)};l(f,b,E),l(f,E,v)}const p=new ve;return p.setAttribute("position",new te(a,3)),p.setAttribute("uv",new te(o,2)),p.computeVertexNormals(),p}function vr(i,t,{ragged:e=!1,y:n=.008,seed:s=1}={}){let r=s,a=0;const o=i.map((h,u)=>(u&&(a+=Math.hypot(h.x-i[u-1].x,h.z-i[u-1].z)),r=r*1664525+1013904223>>>0,e?Math.sin(a*.72)*.11+(r/4294967296-.5)*.17:0)),c=[],l=[];for(let h=1;h<i.length;h++){const u=i[h-1],p=i[h],d=Math.hypot(p.x-u.x,p.z-u.z);if(d<ze)continue;const x=-(p.z-u.z)/d,g=(p.x-u.x)/d,m=(E,v,T)=>({x:E.x+x*(t/2*T+v),z:E.z+g*(t/2*T+v)}),f=[m(u,o[h-1],-1),m(u,o[h-1],1)],b=[m(p,o[h],-1),m(p,o[h],1)];c.push([f[0],b[0],b[1],f[1]]),l[h-1]&&c.push([u,l[h-1][0],f[0]],[u,l[h-1][1],f[1]]),l[h]=b}return Dx(c,n)}function Lx(i,t){const e=[],n=[];for(let s=0;s<i.length;s++){const r=i[s],a=i[(s+1)%i.length],o=t(r),c=t(a);if(o>=-ze&&e.push(r),o<=ze&&n.push(r),o*c<-ze*ze){const l=o/(o-c),h={x:r.x+(a.x-r.x)*l,z:r.z+(a.z-r.z)*l};e.push(h),n.push(h)}}return[e,n].filter(s=>s.length>=3)}function Nl(i,t,e=1,n=new ve){const r=(i.rivers||[]).flatMap(l=>l.bridges).filter(l=>Math.hypot(l.x-t.x,l.z-t.z)<l.length/2+l.width/2+1.1*e).map(l=>({...l,s:Math.sin(l.heading),c:Math.cos(l.heading),planks:Math.ceil(l.length/.3)})),a=(l,h)=>({x:(l.x-h.x)*h.c-(l.z-h.z)*h.s,z:(l.x-h.x)*h.s+(l.z-h.z)*h.c}),o=[];for(let l=0;l<64;l++){const h=(p,d)=>({x:t.x+Math.cos(p/64*Math.PI*2)*d*e,z:t.z+Math.sin(p/64*Math.PI*2)*d*e});let u=[[h(l,.9),h(l+1,.9),h(l+1,1.1),h(l,1.1)]];for(const p of r){const d=[x=>a(x,p).x-p.width/2,x=>a(x,p).x+p.width/2];for(let x=0;x<=p.planks;x++)d.push(g=>a(g,p).z-(-p.length/2+x*p.length/p.planks));for(const x of d)u=u.flatMap(g=>Lx(g,x))}for(const p of u){const d=p.reduce((g,m)=>({x:g.x+m.x/p.length,z:g.z+m.z/p.length}),{x:0,z:0});let x=.055;for(const g of r){const m=a(d,g);if(Math.abs(m.x)<=g.width/2+ze&&Math.abs(m.z)<g.length/2){const f=Math.min(g.planks-1,Math.floor((m.z/g.length+.5)*g.planks));x=Math.max(x,.18+.12*Math.sin((f+.5)/g.planks*Math.PI)+.04)}}for(let g=1;g<p.length-1;g++)for(const m of[p[0],p[g],p[g+1]])o.push(m.x,x,m.z)}}let c=n.getAttribute("position");return(!c||c.array.length<o.length)&&(c&&n.dispose(),c=new Oe(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(o.length/3,1)))),3),c.setUsage(Cr),n.setAttribute("position",c)),c.array.set(o),c.needsUpdate=!0,n.setDrawRange(0,o.length/3),n.boundingSphere=new Jn(new F(t.x,.2,t.z),1.1*e+.4),n}function Ix(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,c=new ve;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let p=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[d]===void 0&&(a[d]=[]),a[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let p=0;p<i.length;++p){const d=i[p].index;for(let x=0;x<d.count;++x)u.push(d.getX(x)+h);h+=i[p].attributes.position.count}c.setIndex(u)}for(const h in r){const u=zl(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let p=0;p<u;++p){const d=[];for(let g=0;g<a[h].length;++g)d.push(a[h][g][p]);const x=zl(d);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}return c}function zl(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Oe(a,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let p=0,d=h.count;p<d;p++)for(let x=0;x<e;x++){const g=h.getComponent(p,x);o.setComponent(p+u,x,g)}}else a.set(h.array,c);c+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const Ji=new Map,Ux={SphereGeometry:Si,BoxGeometry:Je,CylinderGeometry:ks,ConeGeometry:zs},bn=new Map;let Re;function zr(i){i.updateMatrixWorld(!0);const t=new Map;i.traverse(n=>{n.isMesh&&(t.has(n.material)||t.set(n.material,[]),t.get(n.material).push(n.geometry.clone().applyMatrix4(n.matrixWorld)))});const e=new oe;e.name=i.name,e.userData.parts={};for(const[n,s]of t){const r=Ix(s,!1);s.forEach(o=>o.dispose());const a=new re(r,n);a.castShadow=a.receiveShadow=!0,e.add(a)}return e}function ac(i,t){const e=zr(t);return bn.set(i,e),e.clone()}function Yh(i,t){const e=`${i}:${t.join(",")}`;return Ji.has(e)||Ji.set(e,new Ux[i](...t)),Ji.get(e)}function Nx(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){const r=224+(s*13+(s>>>5)*7)%27;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);const n=new ls(i);return n.wrapS=n.wrapT=Un,n.repeat.set(2,2),n.colorSpace=Ae,n}function zx(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const a=Math.sin(r*.38+Math.sin(s*.051)*1.7),o=Math.sin(Math.hypot(r-78,(s-45)*.4)*.38),c=Math.round(227+a*12+o*4+(r*7+s*11)%7),l=(s*128+r)*4;e.data[l]=e.data[l+1]=e.data[l+2]=c,e.data[l+3]=255}t.putImageData(e,0,0);const n=new ls(i);return n.wrapS=n.wrapT=Un,n.colorSpace=Ae,n}function Fx(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const a=Math.sin(r*.31+Math.sin(s*.045)*1.65)*8+Math.sin(r*.11+Math.sin(s*.021)*2.6)*5,o=Math.sin(Math.hypot(r-35,(s-74)*.15)*.46)*4,c=(r*17+s*31+r*s%29)%9-4,l=Math.max(0,Math.min(255,Math.round(132+a+o+c))),h=(s*128+r)*4;e.data[h]=l,e.data[h+1]=l,e.data[h+2]=l,e.data[h+3]=255}t.putImageData(e,0,0);const n=new ls(i);return n.wrapS=n.wrapT=Un,n.repeat.set(1.2,1.7),n}function Ox(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128),n=[[188,203,148],[210,207,153],[164,191,137],[223,207,155],[154,184,133]];for(let r=0;r<128;r++)for(let a=0;a<128;a++){const o=Math.sin(a*.17+Math.sin(r*.11)*1.4)+Math.cos(r*.19-a*.07),c=(a*17+r*31+a*r%29)%13-6,l=n[(Math.floor((o+2)*1.25)+Math.floor(a/19)+Math.floor(r/23))%n.length],h=(r*128+a)*4;e.data[h]=Math.max(0,Math.min(255,l[0]+c)),e.data[h+1]=Math.max(0,Math.min(255,l[1]+c)),e.data[h+2]=Math.max(0,Math.min(255,l[2]+c)),e.data[h+3]=255}t.putImageData(e,0,0);const s=new ls(i);return s.wrapS=s.wrapT=Un,s.colorSpace=Ae,s}function Qn(){if(Re)return Re;const i=Nx(),t=a=>new Se({color:a,roughness:.9,map:i}),e=a=>new Se({color:a,roughness:.55,metalness:.18,map:i});Re={cream:e("#f5ead3"),white:e("#fff8e7"),dark:e("#354b55"),brass:new Se({color:"#ddb469",roughness:.48,metalness:.62}),orange:e("#e6a04e"),dogCream:e("#ffe5ac"),rust:e("#c7704d"),cyan:new Se({color:"#b6fbff",emissive:"#69dfe9",emissiveIntensity:.8,roughness:.32}),mint:e("#84cbb7"),black:e("#20343e"),wood:t("#ba9167"),paleWood:t("#e1bb87"),bark:t("#8b7758"),leaves:t("#8cbd8b"),leavesLight:t("#b8d28f"),leavesDark:t("#619b84"),roof:t("#bf755f"),barn:t("#d9977e"),barnTrim:t("#fae7c2"),flowerPink:t("#f2a6a6"),flowerYellow:t("#ffe28a"),flowerWhite:t("#fff7e5"),flowerCenter:t("#daa661"),stem:t("#7fab72"),stone:t("#abb7a4")},Re.eye=Re.white,Re.pupil=Re.black;const n=zx();for(const a of["wood","paleWood"])Re[a].map=n;const s=Fx();Re.bark.map=s,Re.bark.bumpMap=s,Re.bark.bumpScale=.055,Re.bark.needsUpdate=!0;const r=Ox();for(const a of["leaves","leavesLight","leavesDark"])Re[a].map=r;return Re.leaves.needsUpdate=Re.leavesLight.needsUpdate=Re.leavesDark.needsUpdate=!0,Re}function Hs(i,t,e,n,s=[0,0,0],r=[1,1,1]){const a=new re(Yh(t,e),n);return a.position.set(...s),a.scale.set(...r),a.castShadow=!0,a.receiveShadow=!0,i.add(a),a}function jt(i,t,e,n,s=10){return Hs(i,"SphereGeometry",[1,s,6],t,e,n)}function an(i,t,e,n,s=.025){const r=`sculpted-sphere:${s}`;if(!Ji.has(r)){const o=Yh("SphereGeometry",[1,10,6]).clone(),c=o.attributes.position;for(let l=0;l<c.count;l++){const h=c.getX(l),u=c.getY(l),p=c.getZ(l),d=1+s*Math.sin(h*4.1+p*2.8)*Math.cos(u*3.7-p*1.3);c.setXYZ(l,h*d,u*d,p*d)}o.computeVertexNormals(),Ji.set(r,o)}const a=new re(Ji.get(r),t);return a.position.set(...e),a.scale.set(...n),a.castShadow=a.receiveShadow=!0,i.add(a),a}function La(i,t,e,n){return Hs(i,"BoxGeometry",[1,1,1],t,e,n)}function un(i,t,e,n,s,r){const a=Hs(i,"CylinderGeometry",[n,n,s,10],t,e);return r&&a.rotation.set(...r),a}function as(i,t,e,n,s,r=.105){jt(i,t.eye,[e,n,s],[r,r*1.08,r*.55]),jt(i,t.pupil,[e,n-r*.05,s+r*.45],[r*.43,r*.58,r*.23]),jt(i,t.white,[e-r*.14,n+r*.2,s+r*.67],[r*.15,r*.15,r*.12],8)}function Co(i,t,e,n,s=t.brass){return jt(i,s,e,n)}function Xn(i,t,e,n,s,r=t.dark){const a=new oe;return a.position.set(e,s+.1,n),i.add(a),jt(a,t.brass,[0,0,0],[.105,.105,.105]),un(a,t.dark,[0,-s*.45,0],.065,s*.85),jt(a,t.brass,[0,-s*.72,0],[.078,.078,.078]),jt(a,r,[0,-s+.025,.055],[.115,.1,.17]),a}function Fl(){const i=Qn(),t=new oe;t.name="Pip the robot sheepdog";const e=an(t,i.orange,[0,.55,0],[.29,.3,.49]);jt(t,i.dogCream,[0,.47,.25],[.23,.24,.25]),Co(t,i,[0,.837,-.07],[.16,.04,.22],i.rust),[-1,1].forEach(c=>{Co(t,i,[c*.277,.56,-.03],[.03,.13,.16]);for(let l=0;l<3;l++)un(t,i.dark,[c*.311,.57,-.1+l*.07],.017,.12,[0,0,Math.PI/2])});const n=new oe;n.position.set(0,.89,.38),t.add(n),an(n,i.orange,[0,0,0],[.28,.27,.28]),jt(n,i.dogCream,[0,-.085,.23],[.235,.145,.17]),jt(n,i.dark,[0,-.025,.365],[.1,.067,.058]),jt(n,i.rust,[0,-.2,.265],[.057,.072,.05]),as(n,i,-.115,.06,.231,.099),as(n,i,.115,.06,.231,.099),[-1,1].forEach(c=>{const l=jt(n,i.dark,[c*.26,.05,-.025],[.11,.23,.13]);l.rotation.z=c*.38,jt(n,i.brass,[c*.23,.14,-.025],[.07,.07,.07])}),un(t,i.dark,[0,.76,.37],.18,.085);const s=new Se({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),r=[Xn(t,i,-.22,.28,.34),Xn(t,i,.22,.28,.34),Xn(t,i,-.22,-.3,.34),Xn(t,i,.22,-.3,.34)],a=new oe;a.position.set(0,.64,-.44),t.add(a),un(a,i.brass,[0,.16,-.08],.047,.32,[-.42,0,0]);const o=jt(a,s,[0,.32,-.15],[.077,.077,.077]);return o.name="Pip tail light",o.userData.ownedMaterial=!0,t.userData.parts={body:e,head:n,legs:r,tail:a,tailLight:o},t}function Bx(i="sheep"){const t=`animal:${i}`;if(bn.has(t))return bn.get(t).clone();const e=Qn(),n=i==="cow",s=new oe;if(s.name=n?"Robot cow":"Robot sheep",an(s,e.cream,[0,.54,0],[.32,.34,n?.5:.39]),n)[-1,1].forEach(l=>{jt(s,e.dark,[l*.295,.57,-.13],[.047,.16,.2]),jt(s,e.dark,[l*.282,.67,.19],[.045,.11,.11])});else{for(let l=0;l<3;l++)an(s,e.white,[0,.625,-.23+l*.22],[.335,.3,.145]);[-1,1].forEach(l=>{for(let h=0;h<3;h++)jt(s,e.brass,[l*.312,.56,-.21+h*.21],[.029,.033,.033],8)})}Co(s,e,[0,.87,-.11],[.1,.024,.105],e.mint);const r=new oe;r.position.set(0,.7,n?.46:.34),s.add(r),jt(r,n?e.cream:e.dark,[0,0,.06],[.22,.235,.205]),jt(r,n?e.rust:e.black,[0,-.08,.225],[.185,.12,.09]),as(r,e,-.096,.055,.221,.075),as(r,e,.096,.055,.221,.075),[-1,1].forEach(l=>{const h=jt(r,n?e.rust:e.cream,[l*.235,.075,.025],[.135,.048,.082]);if(h.rotation.z=l*.25,jt(r,e.brass,[l*.193,.075,.025],[.045,.045,.045]),n){const u=Hs(r,"ConeGeometry",[.047,.2,8],e.brass,[l*.15,.255,-.018]);u.rotation.z=l*-.32,jt(r,e.dark,[l*.077,-.082,.305],[.025,.021,.016],8)}}),jt(r,e.cyan,[0,.22,.008],[.033,.033,.033],8),un(s,e.dark,[0,.64,.31],.13,.11,[Math.PI/2,0,0]);const a=[Xn(s,e,-.22,.22,.25),Xn(s,e,.22,.22,.25),Xn(s,e,-.22,-.24,.25),Xn(s,e,.22,-.24,.25)];jt(s,e.dark,[0,.6,n?-.53:-.39],[.061,n?.15:.065,.07]);const o=n?1.23:1;s.scale.setScalar(o);for(const l of a)s.remove(l);const c=zr(s);for(let l=0;l<a.length;l++){const h=a[l],u=h.position.clone().multiplyScalar(o);h.position.set(0,0,0),h.scale.setScalar(o);const p=zr(h);for(const d of[...p.children])d.name=`leg-${l}`,d.position.copy(u),d.userData={limbIndex:l,pivot:u.toArray()},c.add(d)}return c.userData.articulated=!0,bn.set(t,c),c.clone()}function kx(){const i=Qn(),t=new oe;t.name="Autonomous meadow drone",jt(t,i.mint,[0,0,0],[.3,.14,.25]),jt(t,i.cream,[0,.09,0],[.2,.085,.17]),as(t,i,-.1,-.005,.238,.068),as(t,i,.1,-.005,.238,.068);const e=[];return[-1,1].forEach(n=>[-1,1].forEach(s=>{const r=un(t,i.brass,[n*.24,0,s*.2],.035,.32,[0,0,n*Math.PI/2]);r.rotation.y=s*-.5;const a=new oe;a.position.set(n*.39,.09,s*.29),t.add(a),jt(a,i.dark,[0,-.045,0],[.071,.08,.071]),jt(a,i.cream,[0,0,0],[.23,.017,.04]),jt(a,i.cream,[0,0,0],[.04,.017,.23]),jt(a,i.cyan,[0,.014,0],[.036,.027,.036]),e.push(a)})),t.userData.parts={propellers:e},t}function Ol(i=0){i=Math.abs(Math.floor(i))%3;const t=`tree:${i}`;if(bn.has(t))return bn.get(t).clone();const e=Qn(),n=new oe;Hs(n,"CylinderGeometry",[.46,.62,2.25,12],e.bark,[0,1.125,0]);for(let o=0;o<4;o++){const c=o*Math.PI/2+i*.17,l=un(n,e.bark,[Math.cos(c)*.31,.13,Math.sin(c)*.31],.16,.92,[0,0,-Math.cos(c)*.8]);l.rotation.z=Math.sin(c)*.8}const s=un(n,e.bark,[.36,1.67,0],.22,1.1,[0,0,-.72]);s.rotation.x=.2;const r=[e.leaves,e.leavesDark,e.leavesLight][i],a=[[[0,2.37,0],[1.08,.92,.94]],[[-.63,2.05,.22],[.78,.69,.76]],[[.68,2.22,-.12],[.79,.73,.77]],[[.08,2.91,.08],[.68,.67,.7]],[[-.2,2.63,-.58],[.72,.61,.69]],[[.62,2.62,.54],[.7,.62,.66]]];for(const[o,c]of a)an(n,r,o,c,.075);for(let o=0;o<6;o++){const c=o*Math.PI*2/6+i*.21,l=an(n,r,[Math.cos(c)*.85,2.45+o%2*.22,Math.sin(c)*.75],[.34,.2,.4],.045);l.rotation.y=c,l.rotation.z=(o%2?1:-1)*.22}return ac(t,n)}function Gx(i=2.2,t=4.5){const e=Qn(),n=new oe,s=Math.ceil(t/.3);for(let r=0;r<s;r++){const a=-t/2+(r+.5)*t/s,o=Math.sin((r+.5)/s*Math.PI)*.12;La(n,r%3?e.paleWood:e.wood,[0,o+.09,a],[i,.18,t/s-.025]),[-1,1].forEach(c=>jt(n,e.brass,[c*(i/2-.16),o+.184,a],[.025,.01,.025],6))}return[-1,1].forEach(r=>{for(let a=0;a<4;a++)un(n,e.wood,[r*i/2,.56,-t/2+a*t/3],.065,.96);La(n,e.paleWood,[r*i/2,.86,0],[.1,.1,t+.2]),La(n,e.wood,[r*i/2,.46,0],[.08,.075,t+.2])}),zr(n)}function Vx(i=0,t=5){i=Number.isFinite(i)?Math.abs(Math.floor(i))%6:0,t=Number.isFinite(t)?Math.max(1,Math.min(12,Math.floor(t))):5;const e=`flowers:${i}:${t}`;if(bn.has(e))return bn.get(e).clone();const n=Qn(),s=new oe;for(let r=0;r<t;r++){const a=r*2.39996+i,o=Math.sqrt(r/t)*.65,c=new oe;c.position.set(Math.cos(a)*o,0,Math.sin(a)*o),s.add(c);const l=.18+(r*7+i)%4*.03;un(c,n.stem,[0,l/2,0],.014,l);const h=[n.flowerYellow,n.flowerPink,n.flowerWhite][(r+i)%3];for(let u=0;u<5;u++){const p=u*Math.PI*2/5;jt(c,h,[Math.cos(p)*.05,l,Math.sin(p)*.05],[.045,.022,.045],6)}jt(c,n.flowerCenter,[0,l+.015,0],[.027,.023,.027],6)}return ac(e,s)}function Ia(i=0){i=Math.abs(Math.floor(i))%3;const t=`bush:${i}`;if(bn.has(t))return bn.get(t).clone();const e=Qn(),n=new oe,s=[e.leaves,e.leavesDark,e.leavesLight][i%3];un(n,e.bark,[0,.16,0],.08,.3),an(n,s,[0,.42,0],[.62,.46,.48],.075),an(n,s,[-.42,.28,.12],[.38,.34,.35],.075),an(n,s,[.42,.34,-.1],[.4,.37,.36],.075),an(n,s,[.1,.65,-.13],[.38,.34,.37],.075);for(let r=0;r<4;r++){const a=r*Math.PI/2+i*.29,o=an(n,s,[Math.cos(a)*.52,.46+r%2*.1,Math.sin(a)*.42],[.25,.16,.33],.04);o.rotation.y=a}return ac(t,n)}function $h(i){let t=i;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function yr(i,t=!1){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d"),s=$h(i==="grass"?83:193);n.fillStyle=t?"#909090":i==="grass"?"#779c4d":"#b79763",n.fillRect(0,0,512,512);for(let a=0;a<90;a++){const o=s()*512,c=s()*512,l=12+s()*57;n.fillStyle=t?["#858585","#999999","#aaaaaa"][a%3]:i==="grass"?["#92ad56","#4f854a","#bdba67","#6a964d"][a%4]:["#c9ad78","#9c8055","#ddc18e"][a%3],n.globalAlpha=.08;for(const h of[-512,0,512])for(const u of[-512,0,512])n.beginPath(),n.ellipse(o+h,c+u,l,l*.6,0,0,Math.PI*2),n.fill()}for(let a=0;a<7200;a++){const o=s()*512,c=s()*512;n.fillStyle=t?["#777777","#bbbbbb","#dddddd"][a%3]:i==="grass"?["#496f39","#9eb568","#d0c480","#789b4b"][a%4]:["#826b48","#e4c995","#b99a6a"][a%3],n.globalAlpha=.14+s()*.25,n.beginPath(),n.ellipse(o,c,.35+s()*.85,i==="grass"?1.2+s()*3.8:.3+s()*1.4,s()*Math.PI,0,Math.PI*2),n.fill()}n.globalAlpha=1;const r=new ls(e);return t||(r.colorSpace=Ae),r.wrapS=r.wrapT=Un,r}function Zh(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,a=Math.max(0,Math.min(1,((i-e.x)*s+(t-e.z)*r)/(s*s+r*r||1))),o=i-e.x-a*s,c=t-e.z-a*r;return o*o+c*c}function Hx(i,t,e,n){return Math.sqrt(Zh(i,t,e,n))}function Ua(i,t,e){let n=1/0;for(let s=1;s<e.length;s++)n=Math.min(n,Zh(i,t,e[s-1],e[s]));return Math.sqrt(n)}function Wx(i,t="#45684d"){const e=document.createElement("canvas");e.width=512,e.height=128;const n=e.getContext("2d");n.fillStyle="#faf6e9",n.beginPath(),n.roundRect(8,12,496,98,35),n.fill(),n.fillStyle=t,n.font="bold 34px sans-serif",n.textAlign="center",n.fillText(i,256,76);const s=new ls(e);s.colorSpace=Ae;const r=new Nd(new Eh({map:s,depthTest:!1}));return r.scale.set(6,1.5,1),r}class Xx{constructor(t){this.renderer=new L0({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=eh,this.renderer.outputColorSpace=Ae,this.renderer.toneMapping=ih,this.renderer.toneMappingExposure=1.05,this.scene=new Id,this.scene.background=new Ht("#bdd6df"),this.scene.fog=new Yo("#bdd6df",95,195),this.hemisphere=new Wd("#eaf7ff","#536747",1.65),this.scene.add(this.hemisphere),this.skyDay=new Ht("#bdd6df"),this.skyStorm=new Ht("#899da7"),this.sun=new Yd("#fff4dc",2.05),this.sun.position.set(-18,35,20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100}),this.sun.shadow.camera.updateProjectionMatrix(),this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.camera=new kr(-30,30,20,-20,.1,180),this.center=new F(-7,0,0),this.targetCenter=this.center.clone(),this.terrain=new oe,this.actors=new oe,this.scene.add(this.terrain,this.actors),this.materials=Qn(),this.grass=new Se({color:"#ffffff",roughness:.96,map:yr("grass"),bumpMap:yr("grass",!0),bumpScale:.12}),this.path=new Se({color:"#fff1d3",roughness:.95,map:yr("path"),bumpMap:yr("path",!0),bumpScale:.08,side:be}),this.pathShoulder=new Se({color:"#a99261",roughness:1,transparent:!0,opacity:.36,depthWrite:!1,side:be}),this.water=new Se({color:"#4b9fae",roughness:.29,metalness:.08,side:be}),this.targetMat=new xn({color:"#ffe8a0",transparent:!0,opacity:.56,depthWrite:!1,side:be}),this.fenceParts=[new re(new ks(.075,.075,.92,10),this.materials.paleWood),new re(new Si(1,8,6),this.materials.paleWood),new re(new Je(1,.105,.085),this.materials.wood)],this.sceneryBatches=[],this.sceneryFrustum=new Br,this.viewMatrix=new Kt,this.animalMeshes=[],this.animalBatches=[],this.helperMeshes=new Map,this.resize(),this.preview=!0,this.particles=[],this.nature=new wx(this.scene),this.waterEffects=new cx(this.scene)}resize(){this.width=innerWidth,this.height=innerHeight,this.renderer.setSize(this.width,this.height,!1),this.aspect=this.width/this.height}place(t,e,n,s=1,r=!1){return t.position.set(e,0,n),t.scale.multiplyScalar(s),r&&t.traverse(a=>{a.isMesh&&(a.userData.ownedGeometry=!0)}),this.terrain.add(t),t}flat(t,e,n,s,r=.02){const a=new re(t,e);return a.rotation.x=-Math.PI/2,a.position.set(n,r,s),a.receiveShadow=!0,this.terrain.add(a),a}setLevel(t){this.level=t,this.barkEffects=[],this.cutaway?.dispose(),this.cutaway=null,this.gateView?.dispose(),this.gateView?.removeFromParent(),this.stoneView?.dispose(),this.stoneView?.removeFromParent(),this.gateView=this.stoneView=null;const e=new Set,n=new Set;for(const R of[this.terrain,this.actors])R.traverse(P=>{P.userData.ownedGeometry&&e.add(P.geometry),P.userData.ownedMaterial&&n.add(P.material),P.userData.ownedLabel&&(P.material.map.dispose(),n.add(P.material)),P.isInstancedMesh&&P.dispose()});e.forEach(R=>R?.dispose()),n.forEach(R=>R?.dispose()),this.terrain.clear(),this.actors.clear(),this.sceneryBatches=[],this.helperMeshes.clear(),this.animalMeshes=[],this.animalBatches=[],this.particles=[];const s=t.bounds,r=s.maxX-s.minX,a=s.maxZ-s.minZ,o=$h(t.seed),c=(s.maxX+s.minX)/2,l=(s.maxZ+s.minZ)/2,h=this.flat(new Gs(r+90,a+90,1,1),this.grass,c,l,-.035);h.userData.ownedGeometry=!0,this.grass.map.repeat.set((r+90)/15,(a+90)/15),this.grass.bumpMap.repeat.copy(this.grass.map.repeat);for(const R of t.sceneryHills||[]){const P=new re(new Si(1,20,12),new Se({color:["#799552","#6f914e","#93a75d"][Math.floor(o()*3)],roughness:1}));P.position.set(R.x,-.3,R.z),P.scale.set(R.radius,R.height,R.radius),P.userData.ownedGeometry=P.userData.ownedMaterial=!0,this.terrain.add(P)}const u=(R,P)=>{const U=new re(R,P);return U.receiveShadow=!0,U.userData.ownedGeometry=!0,this.terrain.add(U),U};for(const R of t.roads)u(vr(R.points,R.width+.65,{ragged:!0,y:.003,seed:t.seed+5}),this.pathShoulder),u(vr(R.points,R.width,{ragged:!0,y:.007,seed:t.seed}),this.path);const p=[];for(const R of t.rivers){const P=new Se({color:"#6c8960",roughness:1,side:be}),U=u(vr(R.points,R.width+.8,{y:.002}),P);U.userData.ownedMaterial=!0;const N=u(vr(R.points,R.width,{y:.018}),this.water),q=R.points[0],O=R.points.at(-1);p.push({mesh:N,points:R.points,width:R.width,heading:Math.atan2(O.x-q.x,O.z-q.z)});for(const Y of R.bridges){const j=Gx(Y.width,Y.length);j.rotation.y=Y.heading,this.place(j,Y.x,Y.z,1,!0)}}const d=t.target,x=zn(d),g=x.halfLength,m=[];this.goal=u(Ul(d),this.targetMat),this.goalOutline=u(Cx(d),new xn({color:"#fff0b5",side:be})),this.goalOutline.userData.ownedMaterial=!0,this.goalFloor=null;const f=(R,P,U,N,q,O)=>{const Y=Math.hypot(P.x-R.x,P.z-R.z),j=new re(new Je(Y,U,N),q);return j.position.set((R.x+P.x)/2,U/2,(R.z+P.z)/2),j.rotation.y=-Math.atan2(P.z-R.z,P.x-R.x),j.castShadow=j.receiveShadow=!0,j.userData.ownedGeometry=!0,j.userData.coverSide=O,this.terrain.add(j),j};for(const R of t.fenceSegments||[]){if(R.material==="stone")continue;const{a:P,b:U,kind:N}=R,q=Math.hypot(U.x-P.x,U.z-P.z);if(N==="target"&&d.type==="barn"){const O=Math.ceil(q/3);for(let Y=0;Y<O;Y++){const j={x:P.x+(U.x-P.x)*Y/O,z:P.z+(U.z-P.z)*Y/O},et={x:P.x+(U.x-P.x)*(Y+1)/O,z:P.z+(U.z-P.z)*(Y+1)/O},Lt=(j.x+et.x)/2-d.x,Ut=(j.z+et.z)/2-d.z,tt=Math.cos(d.heading||0),lt=Math.sin(d.heading||0),V=Lt*tt-Ut*lt,$=Lt*lt+Ut*tt,at=Math.abs(Math.abs(V)-g)<Math.abs(Math.abs($)-g)?V>=0?"+x":"-x":$>=0?"+z":"-z";m.push(f(j,et,2.4,.22,this.materials.barn,at));const ft=f(j,et,.14,.25,this.materials.barnTrim,at);ft.position.y=2.35,m.push(ft)}}else if(N==="target"&&d.type==="field"){this.placeFence(P,U);const O=Math.ceil(q/1.4);for(let Y=0;Y<O;Y++)this.place(Ia(Y),P.x+(U.x-P.x)*(Y+.5)/O,P.z+(U.z-P.z)*(Y+.5)/O,.75)}else this.placeFence(P,U)}if(this.gateView=Tx(t.gates),this.stoneView=Ax(t.fenceSegments),this.terrain.add(this.gateView,this.stoneView),d.type==="barn"){this.goalFloor=u(Ul(d,.013),this.path);const R=new oe,P=d.heading||0,U=Math.ceil(g*2/2.4),N=(g*2+.6)/U;for(const q of[-1,1])for(let O=0;O<U;O++){const Y=new re(new Je(g+.6,.18,N),this.materials.roof);Y.position.set(q*g/2,3.2,-g-.3+(O+.5)*N),Y.rotation.z=-q*.21,Y.castShadow=!0,Y.userData.ownedGeometry=!0,Y.userData.coverKind="roof",R.add(Y),m.push(Y)}R.position.set(d.x,0,d.z),R.rotation.y=P,this.terrain.add(R),this.cutaway=new Rx(d,m,{halfExtent:g+.3})}const b=Wx(d.type==="pen"?"SUNNY PEN":d.type==="barn"?"HOME BARN":"CLOVER FIELD");b.position.set(d.x-Math.sin(d.heading||0)*(g+1),3,d.z-Math.cos(d.heading||0)*(g+1)),b.userData.ownedLabel=!0,this.terrain.add(b);for(const R of t.obstacles){this.place(Ol(Math.floor(o()*3)),R.x,R.z,R.radius*1.45);for(let P=0;P<4;P++){const U=P*Math.PI/2;this.place(Ia(P),R.x+Math.cos(U)*R.radius*.48,R.z+Math.sin(U)*R.radius*.48,R.radius*.7)}}const E=(R,P,U=0)=>R>s.minX+U&&R<s.maxX-U&&P>s.minZ+U&&P<s.maxZ-U&&!t.rivers.some(N=>Ua(R,P,N.points)<N.width/2+U+.5)&&!t.roads.some(N=>Ua(R,P,N.points)<N.width/2+U+.35)&&Math.hypot(R-d.x,P-d.z)>d.radius+U+2&&!t.obstacles.some(N=>Math.hypot(R-N.x,P-N.z)<N.radius+U)&&!(t.fenceSegments||[]).some(N=>Hx(R,P,N.a,N.b)<U+.7),v=[];let T=0;for(const R of t.roads)for(let P=1;P<R.points.length;P++){const U=R.points[P-1],N=R.points[P],q=Math.hypot(N.x-U.x,N.z-U.z);q&&(T+=q,v.push({a:U,b:N,length:q,end:T,width:R.width}))}const w=(R,P)=>{if(R<P*.7&&T){const U=(R/(P*.7)+o()/(P*.7))*T,N=v.find(et=>et.end>=U)||v[v.length-1],q=(U-N.end+N.length)/N.length,O=(N.b.x-N.a.x)/N.length,Y=(N.b.z-N.a.z)/N.length,j=(N.width/2+1.1+o()*2.8)*(R%2?1:-1);return{x:N.a.x+O*q*N.length-Y*j,z:N.a.z+Y*q*N.length+O*j}}return{x:s.minX+2+o()*(r-4),z:s.minZ+2+o()*(a-4)}};this.meadowDetails=[];const D=Math.min(190,Math.ceil(r*a/130));for(let R=0;R<D;R++){const{x:P,z:U}=w(R,D);E(P,U,1)&&(this.place(Vx(R,3),P,U,.85+o()*.6),this.meadowDetails.push({x:P,z:U,kind:"flower"}))}const L=[],_=Math.min(650,Math.ceil(r*a/35));for(let R=0;R<_;R++){const{x:P,z:U}=w(R,_);E(P,U,.4)&&(L.push({x:P,z:U}),this.meadowDetails.push({x:P,z:U,kind:"tuft"}))}if(L.length){const R=new zs(.12,.55,3),P=new Se({color:"#648844",roughness:1,transparent:!0,opacity:1,depthWrite:!1}),U=new mi(R,P,L.length),N=new ge;L.forEach((q,O)=>{N.position.set(q.x,.18,q.z),N.scale.set(.7+o()*.6,.55+o()*.8,.7+o()*.6),N.rotation.y=o()*Math.PI,N.updateMatrix(),U.setMatrixAt(O,N.matrix)}),U.receiveShadow=!0,U.userData.decorativeGrass=!0,U.userData.ownedGeometry=U.userData.ownedMaterial=!0,this.terrain.add(U),this.trackScenery(U)}const y=[];for(const R of t.rivers)for(let P=2;P<R.points.length-2;P+=5){const U=R.points[P],N=R.points[P+1],q=N.x-U.x,O=N.z-U.z,Y=Math.hypot(q,O)||1;for(const j of[-1,1]){const et=U.x-O/Y*(R.width/2+.65)*j,Lt=U.z+q/Y*(R.width/2+.65)*j;et>s.minX&&et<s.maxX&&Lt>s.minZ&&Lt<s.maxZ&&!R.bridges.some(Ut=>Math.hypot(et-Ut.x,Lt-Ut.z)<Ut.length/2+Ut.width)&&y.push({x:et,z:Lt})}}if(y.length){const R=new zs(.18,.95,4),P=new Se({color:"#5b7951",roughness:1}),U=new mi(R,P,y.length),N=new ge;y.forEach((q,O)=>{N.position.set(q.x,.4,q.z),N.rotation.z=(o()-.5)*.25,N.updateMatrix(),U.setMatrixAt(O,N.matrix)}),U.userData.ownedGeometry=U.userData.ownedMaterial=!0,this.terrain.add(U),this.trackScenery(U)}const I=Math.min(62,28+Math.floor(t.index/3));for(let R=0;R<I;R++){let P,U;const N=R%4;N<2?(P=s.minX-12+o()*(r+24),U=N===0?s.minZ-4-o()*17:s.maxZ+4+o()*17):(P=N===2?s.minX-5-o()*18:s.maxX+5+o()*18,U=s.minZ+o()*a),!t.rivers.some(q=>Ua(P,U,q.points)<q.width/2+3)&&this.place(Ol(R%3),P,U,1.3+o()*1.8)}this.bushPlacements=U0(t);for(const R of this.bushPlacements)this.place(Ia(R.variant),R.x,R.z,R.scale);this.nature.setLevel(t),this.waterEffects.setLevel(t,{grassMaterials:[this.grass],pathMaterials:[this.path],waterMaterial:this.water,terrain:this.terrain,rivers:p,weather:this.nature.weather}),this.batchScenery(),this.dog=Fl(),this.dog.scale.setScalar(1.35),this.actors.add(this.dog);const B=new re(new Zo(.82,.95,40),new xn({color:"#fff0bb",transparent:!0,opacity:.9,side:be,depthWrite:!1}));B.rotation.x=-Math.PI/2,B.position.y=.03,B.userData.ownedGeometry=B.userData.ownedMaterial=!0,this.dog.add(B);for(const R of t.animals){const P=new ge;P.position.set(R.x,0,R.z),P.rotation.y=Math.PI/2,this.animalMeshes.push(P)}for(const R of["sheep","cow"]){const P=t.animals.flatMap((O,Y)=>O.type===R?[Y]:[]);if(!P.length)continue;const U=Bx(R),N=[];let q=0;for(const O of U.children){O.geometry.boundingSphere||O.geometry.computeBoundingSphere();const Y=O.geometry.boundingSphere,j=O.userData.pivot;q=Math.max(q,Y.center.length()+Y.radius+(j?Math.hypot(...j):0));const et=new mi(O.geometry,O.material,P.length);et.instanceMatrix.setUsage(Cr),et.castShadow=et.receiveShadow=!0,et.frustumCulled=!1,et.userData.limbIndex=O.userData.limbIndex,et.userData.pivot=j,this.actors.add(et),N.push(et)}this.animalBatches.push({indices:P,meshes:N,radius:q,visibleIndices:[]})}this.center.set(t.spawn.x+(this.aspect<.8?2:10),0,t.spawn.z+1),this.time=0,this.update(t,t.dog,0,!0)}placeFence(t,e){const n=Math.hypot(e.x-t.x,e.z-t.z),s=Math.max(1,Math.ceil(n/1.8)),r=new oe;r.position.set((t.x+e.x)/2,0,(t.z+e.z)/2),r.rotation.y=-Math.atan2(e.z-t.z,e.x-t.x);const a=(o,c,l,h=1,u=1,p=1)=>{const d=this.fenceParts[o].clone();d.position.set(c,l,0),d.scale.set(h,u,p),d.userData.fencePart=!0,r.add(d)};for(let o=0;o<=s;o++){const c=-n/2+o*n/s;a(0,c,.46),a(1,c,.94,.083,.065,.083)}for(let o=0;o<s;o++)for(const c of[.34,.69])a(2,-n/2+(o+.5)*n/s,c,n/s+.03);this.terrain.add(r)}trackScenery(t){const e=t.instanceMatrix.array.slice(),n=new Float32Array(t.count*4),s=new Kt,r=new Jn;t.geometry.boundingSphere||t.geometry.computeBoundingSphere();for(let a=0;a<t.count;a++)s.fromArray(e,a*16),r.copy(t.geometry.boundingSphere).applyMatrix4(s),n.set([r.center.x,r.center.y,r.center.z,r.radius],a*4);t.instanceMatrix.setUsage(Cr),t.frustumCulled=!1,this.sceneryBatches.push({batch:t,matrices:e,bounds:n})}batchScenery(){this.terrain.updateMatrixWorld(!0);const t=new Map;this.terrain.traverse(n=>{if(!n.isMesh||n.isInstancedMesh||n.userData.ownedGeometry||n.material.transparent)return;const s=`${n.geometry.id}:${n.material.id}`;t.has(s)||t.set(s,[]),t.get(s).push(n)});for(const n of t.values()){if(n.length<2)continue;const s=n[0],r=new mi(s.geometry,s.material,n.length);n.forEach((a,o)=>{r.setMatrixAt(o,a.matrixWorld),a.parent.remove(a)}),r.castShadow=!!s.userData.fencePart,r.receiveShadow=!0,this.terrain.add(r),this.trackScenery(r)}const e=[];this.terrain.traverse(n=>{n.isGroup&&!n.children.length&&e.push(n)}),e.forEach(n=>n.parent.remove(n))}cullScenery(){this.camera.updateMatrixWorld(!0),this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);const t=this.sceneryFrustum.planes;for(const{batch:e,matrices:n,bounds:s}of this.sceneryBatches){let r=0;for(let a=0;a<s.length;a+=4){const o=s[a+3]+2;t.some(c=>c.normal.x*s[a]+c.normal.y*s[a+1]+c.normal.z*s[a+2]+c.constant<-o)||e.instanceMatrix.array.set(n.subarray(a*4,a*4+16),r++*16)}e.count=r,e.visible=r>0,e.instanceMatrix.needsUpdate=!0,e.instanceMatrix.clearUpdateRanges(),r&&e.instanceMatrix.addUpdateRange(0,r*16)}}updateAnimalBatches(t,e){const n=this.sceneryFrustum.planes,s=new Kt,r=new Kt,a=new Kt;for(const o of this.animalBatches){const c=o.visibleIndices;c.length=0;for(const l of o.indices){const h=this.animalMeshes[l],u=h.position,p=o.radius*Math.max(Math.abs(h.scale.x),Math.abs(h.scale.y),Math.abs(h.scale.z))+3;n.some(d=>d.normal.x*u.x+d.normal.y*u.y+d.normal.z*u.z+d.constant<-p)||c.push(l)}c.forEach((l,h)=>o.meshes.forEach(u=>{if(u.userData.limbIndex===void 0){u.setMatrixAt(h,this.animalMeshes[l].matrix);return}const p=t.animals[l],d=u.userData.limbIndex,x=d===0||d===3?0:Math.PI,g=Math.sin(e*12+l*.8+x)*Math.min(.5,Math.hypot(p.vx,p.vz)*.15);s.makeTranslation(...u.userData.pivot),r.makeRotationX(g),s.multiply(r),a.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,a)}));for(const l of o.meshes)l.count=c.length,l.visible=c.length>0,l.instanceMatrix.needsUpdate=!0,l.instanceMatrix.clearUpdateRanges(),c.length&&l.instanceMatrix.addUpdateRange(0,c.length*16)}}update(t,e,n,s=!1){this.time+=n,this.preview=s;const r=t.animals.filter(f=>!f.saved),a=r.reduce((f,b)=>({x:f.x+b.x/r.length,z:f.z+b.z/r.length}),{x:0,z:0}),c=(s?this.aspect<.8?50:44:this.aspect<.8?39:36)/2,l=c*this.aspect;let h=s?t.spawn.x+(this.aspect<.8?2:10):e.x*.68+(r.length?a.x:t.target.x)*.32+2,u=s?t.spawn.z+1:e.z*.75+(r.length?a.z:t.target.z)*.25+1;s||(h=Math.max(e.x-l*.45,Math.min(e.x+l*.45,h)),u=Math.max(e.z-4,Math.min(e.z+4,u)));const p=s?Math.min(1,n*.8):Math.min(1,n*3.5);if(this.center.x+=(h-this.center.x)*p,this.center.z+=(u-this.center.z)*p,!s){const f=Math.max(1,l-2.5);this.center.x=Math.max(e.x-f,Math.min(e.x+f,this.center.x))}this.camera.left=-l,this.camera.right=l,this.camera.top=c,this.camera.bottom=-c,this.camera.updateProjectionMatrix(),this.camera.position.set(this.center.x,36,this.center.z+29),this.camera.lookAt(this.center.x,0,this.center.z-2),this.sun.position.set(this.center.x-18,35,this.center.z+20),this.sun.target.position.set(this.center.x,0,this.center.z),this.sun.target.updateMatrixWorld(),this.dog.position.set(e.x,gi(t,e.x,e.z)+Math.sin(this.time*16)*Math.min(.06,Math.hypot(e.vx||0,e.vz||0)*.008),e.z),this.dog.rotation.y=e.heading??Math.PI/2;const d=Math.hypot(e.vx||0,e.vz||0),x=this.dog.userData.parts,g=Math.floor(this.time*12)/12;x.legs.forEach((f,b)=>f.rotation.x=Math.sin(g*14+(b%3===0?0:Math.PI))*Math.min(.5,d*.07)),x.tail.rotation.z=Math.sin(g*7)*.3,t.animals.forEach((f,b)=>{const E=this.animalMeshes[b];E.position.set(f.x,gi(t,f.x,f.z)+Math.sin(g*12+b)*Math.min(.07,Math.hypot(f.vx,f.vz)*.025),f.z),E.rotation.y=f.heading??Math.PI/2,E.rotation.z=Math.sin(g*9+b)*Math.min(.055,Math.hypot(f.vx,f.vz)*.02),E.updateMatrix()});for(const f of t.helpers||[]){let b=this.helperMeshes.get(f.type);b||(b=f.type==="drone"?kx():Fl(),f.type==="helper"&&b.scale.setScalar(1.1),this.helperMeshes.set(f.type,b),this.actors.add(b));const E=f.x-b.position.x,v=f.z-b.position.z;b.position.set(f.x,f.type==="drone"?2+Math.sin(this.time*4)*.18:gi(t,f.x,f.z),f.z),f.type==="drone"?b.userData.parts.propellers.forEach(T=>T.rotation.y=this.time*35):(Math.hypot(E,v)>.001&&(b.rotation.y=Math.atan2(E,v)),b.userData.parts.legs.forEach((T,w)=>T.rotation.x=Math.sin(g*14+(w===0||w===3?0:Math.PI))*Math.min(.5,Math.hypot(E,v)*15)),b.userData.parts.tail.rotation.z=Math.sin(g*7)*.3,Pa(b,!1))}this.updateBarks(n),Pa(this.dog,(this.barkEffects||[]).length>0),this.gateView?.update(),this.goal.material.opacity=.38+Math.sin(this.time*2)*.09,this.cutaway?.update(this.camera,[e,...t.animals,...(t.helpers||[]).filter(f=>f.type!=="drone")],n),this.nature.update(n,{dog:e,animals:t.animals,camera:this.camera,time:this.time,paused:n<=0});const m=this.nature.weather;this.waterEffects.update(n,{weather:m,movers:[{...e,id:"pip"},...t.animals.map(f=>({...f,id:`flock-${f.id}`})),...(t.helpers||[]).filter(f=>f.type!=="drone").map(f=>({...f,id:`helper-${f.type}`}))],paused:n<=0}),this.sun.intensity=2.05*m.daylight+m.lightningFlash,this.hemisphere.intensity=1.65*m.daylight+m.lightningFlash*.6,this.scene.background.copy(this.skyDay).lerp(this.skyStorm,m.cloudCoverage*.5),this.scene.fog.color.copy(this.scene.background);for(const f of this.particles)f.life-=n,f.mesh.position.addScaledVector(f.velocity,n),f.velocity.y-=n*6,f.mesh.rotation.x+=n*2,f.mesh.scale.setScalar(Math.max(0,f.life)),f.life<=0&&(this.actors.remove(f.mesh),f.mesh.geometry.dispose(),f.mesh.material.dispose());this.particles=this.particles.filter(f=>f.life>0),this.cullScenery(),this.updateAnimalBatches(t,g),this.renderer.render(this.scene,this.camera)}celebrate(t,e){for(let n=0;n<36;n++){const s=new re(new Je(.12,.12,.05),new xn({color:["#f0b65c","#f8e8ad","#e99585","#80b398"][n%4]}));s.userData.ownedGeometry=s.userData.ownedMaterial=!0,s.position.set(t,1.5,e),this.actors.add(s),this.particles.push({mesh:s,velocity:new F(Math.sin(n*2.4)*3,2+n%5,Math.cos(n*2.4)*3),life:1.8})}}bark(){Pa(this.dog,!0);const t={x:this.dog.position.x,z:this.dog.position.z},e=new re(Nl(this.level,t),new xn({color:"#fff6d8",side:be,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1}));for(e.renderOrder=1,e.userData.ownedGeometry=e.userData.ownedMaterial=!0,this.actors.add(e),this.barkEffects??=[],this.barkEffects.push({mesh:e,origin:t,age:0});this.barkEffects.length>4;){const n=this.barkEffects.shift();this.actors.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose()}}updateBarks(t){for(const e of this.barkEffects||[])if(!(t<=0)){if(e.age+=t,e.age>=.6){this.actors.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();continue}Nl(this.level,e.origin,1+e.age/.6*6,e.mesh.geometry),e.mesh.material.opacity=.8*(1-e.age/.6)}this.barkEffects=(this.barkEffects||[]).filter(e=>e.age<.6)}drawMap(t,e,n){const s=t.getContext("2d"),r=t.width,a=t.height,o=e.bounds,c=d=>8+(d-o.minX)/(o.maxX-o.minX)*(r-16),l=d=>8+(d-o.minZ)/(o.maxZ-o.minZ)*(a-16);s.fillStyle="#c9d8b7",s.fillRect(0,0,r,a);const h=(d,x,g)=>{s.lineWidth=x,s.strokeStyle=g,s.lineCap="round",s.lineJoin="round",s.beginPath(),d.forEach((m,f)=>f?s.lineTo(c(m.x),l(m.z)):s.moveTo(c(m.x),l(m.z))),s.stroke()},u=Math.min((r-16)/(o.maxX-o.minX),(a-16)/(o.maxZ-o.minZ));for(const d of e.rivers){h(d.points,d.width*u,"#5dabb7");for(const x of d.bridges){const g=Math.sin(x.heading)*x.length/2,m=Math.cos(x.heading)*x.length/2;h([{x:x.x-g,z:x.z-m},{x:x.x+g,z:x.z+m}],Math.max(3,x.width*u),"#dfbd8c")}}for(const d of e.roads)h(d.points,Math.max(1.5,d.width*u),"#d4b784");Px(s,e.target,d=>({x:c(d.x),y:l(d.z)}));for(const d of e.fenceSegments||[])h([d.a,d.b],d.material==="stone"?2:d.kind==="boundary"?1:1.5,d.material==="stone"?"#777d70":"#8f7758");for(const d of e.gates||[])if(d.operable&&!d.open){const x=Fo(d);h([x.a,x.b],2.5,"#b46c35")}const p=(d,x,g,m)=>{s.fillStyle=m,s.beginPath(),s.arc(c(d),l(x),g,0,Math.PI*2),s.fill()};for(const d of e.animals)p(d.x,d.z,d.type==="cow"?3:2.3,d.saved?"#80a777":"#fff8e7");p(n.x,n.z,4.8,"#c9843b"),s.strokeStyle="#fff2d0",s.lineWidth=2,s.beginPath(),s.arc(c(n.x),l(n.z),6,0,Math.PI*2),s.stroke();for(const d of e.helpers||[])p(d.x,d.z,3,"#4a9c9b")}}class qx{constructor(){this.context=null,this.master=null,this.music=null,this.effects=null,this.ambience=null,this.ambientSources=new Set,this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1,this.noiseBuffer=null,this.thunderSource=null,this.thunderEvent=null,this.weatherState=null,this.birdCountdown=4+Math.random()*6,this.muted=!1,this.paused=!1,this.timer=null,this.step=0,this.nextNoteTime=0,this.active=new Set,this.disposed=!1,this.activationGeneration=0,this.tempo=106}async start(){if(this.disposed)return!1;const t=++this.activationGeneration;try{if(!this.context){const n=globalThis.AudioContext||globalThis.webkitAudioContext;if(!n)return!1;this.context=new n,this.master=this.context.createGain(),this.music=this.context.createGain(),this.effects=this.context.createGain(),this.ambience=this.context.createGain(),this.master.gain.value=this.muted?0:.975,this.music.gain.value=.42,this.effects.gain.value=.6,this.ambience.gain.value=.38,this.music.connect(this.master),this.effects.connect(this.master),this.ambience.connect(this.master),this.master.connect(this.context.destination)}const e=this.context;return await e.resume(),this.disposed||t!==this.activationGeneration||this.context!==e?!1:(this.paused=!1,this.music.gain.cancelScheduledValues(this.context.currentTime),this.music.gain.setTargetAtTime(.42,this.context.currentTime,.025),this._begin(),!0)}catch{return!1}}setMuted(t){if(this.muted=!!t,this.muted&&this._stopAmbience(),!this.context||!this.master)return;const e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(this.muted?0:.975,e,.025)}pause(){this.activationGeneration++,this.paused=!0,this._stopScheduler(),this._stopAmbience(),this.context&&this.context.state!=="closed"&&this.music.gain.setTargetAtTime(1e-4,this.context.currentTime,.025)}async resume(){return this.start()}_begin(){this.timer||this.paused||this.disposed||(this.nextNoteTime=this.context.currentTime+.06,this._schedule(),this.timer=globalThis.setInterval(()=>this._schedule(),100))}_stopScheduler(){this.timer!==null&&globalThis.clearInterval(this.timer),this.timer=null}_schedule(){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;const t=60/this.tempo/2;if(!Number.isFinite(t)||t<=0)return;const e=this.context.currentTime;if(this.nextNoteTime<e){const n=Math.ceil((e-this.nextNoteTime)/t);this.step=(this.step+n)%128,this.nextNoteTime=Math.max(e,this.nextNoteTime+n*t)}for(let n=0;n<8&&this.nextNoteTime<e+.25;n++)this._musicStep(this.step,this.nextNoteTime,t),this.step=(this.step+1)%128,this.nextNoteTime+=t}_musicStep(t,e,n){const s=[48,53,48,55,57,53,55,48],r=[[72,76,79,null,76,74,72,null],[77,81,79,null,77,76,74,null],[72,76,79,81,79,null,76,null],[74,79,83,null,81,79,74,null],[76,81,84,null,83,81,79,null],[77,null,81,79,77,76,74,null],[74,77,79,null,83,81,79,74],[76,74,72,null,79,null,72,null]],a=Math.floor(t/16),o=t%16,c=s[a],l=a===4;if(o%4===0&&this._note(c+(o===8?7:0),e,.32,.15,"bass",this.music),o%4===2&&(this._note(c+12,e,.22,.048,"pluck",this.music),this._note(c+(l?15:16),e+.018,.22,.042,"pluck",this.music),this._note(c+19,e+.035,.22,.036,"pluck",this.music)),o%2===0){const h=r[a][o/2];h!==null&&this._note(h,e,n*1.5,.12,a%2?"flute":"marimba",this.music)}}updateAmbience(t,e={}){const n=e.weather||"sun",s=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed;if(this._updateThunder(typeof n=="object"?n:null,s),!s)return;const r=typeof n=="string"?n:n.type||"sun",a=typeof n=="object"&&Number.isFinite(n.intensity)?Math.max(0,Math.min(1,n.intensity)):.3,o=["rain","light-rain","heavy-rain","storm"].includes(r)?"rain":r==="wind"?"wind":"sun",c=typeof n=="object"?n.storm?"storm":n.kind||r:r,l=c==="storm"?1:c==="heavy-rain"?.85:.5;this._weather(o,a,l),this.birdCountdown-=Number.isFinite(t)?Math.max(0,Math.min(t,.25)):0,!(this.birdCountdown>0)&&(this.birdCountdown=o==="rain"?10+Math.random()*10:4+Math.random()*6,!(typeof n=="object"&&(n.storm||n.kind==="storm")||r==="storm"||o==="rain"&&a>=.7)&&this._chirp(o==="rain"?.018:.03))}_noise(){if(!this.noiseBuffer){const t=this.context;this.noiseBuffer=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const e=this.noiseBuffer.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1}return this.noiseBuffer}_updateThunder(t,e){t!==this.weatherState&&(this.thunderSource&&this._releaseAmbience(this.thunderSource),this.thunderSource=null,this.thunderEvent=null,this.weatherState=t,this._restoreMusicMix());const n=t?.lightningId;if(!n||n===this.thunderEvent)return;this.thunderEvent=n;const s=t.lightningAge,r=t.thunderDelay;if(!e||!Number.isFinite(s)||!Number.isFinite(r)||s<0||r<0||s>r+.2)return;this.thunderSource&&this._releaseAmbience(this.thunderSource);const a=this.context,o=a.createBufferSource(),c=a.createBiquadFilter(),l=a.createGain(),h=a.currentTime+Math.max(.01,r-s),u=3+Math.random()*2;o.buffer=this._noise(),o.loop=!0,c.type="lowpass",c.Q.value=.35,c.frequency.setValueAtTime(400,h),c.frequency.exponentialRampToValueAtTime(85,h+u*.65),l.gain.setValueAtTime(1e-4,h),l.gain.exponentialRampToValueAtTime(.65,h+.12),l.gain.exponentialRampToValueAtTime(.32,h+u*.23),l.gain.exponentialRampToValueAtTime(.035,h+u*.56),l.gain.exponentialRampToValueAtTime(1e-4,h+u*.76),o.connect(c),c.connect(l),l.connect(this.effects);const p=[];for(const[x,g]of[[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]){const m=a.createDelay(1.2),f=a.createGain();m.delayTime.value=u*x,f.gain.value=g,l.connect(m),m.connect(f),f.connect(this.effects),p.push(m,f)}this.music.gain.cancelScheduledValues(a.currentTime),this.music.gain.setValueAtTime(.42,a.currentTime),this.music.gain.setTargetAtTime(.16,h,.04),this.music.gain.setTargetAtTime(.42,h+u*.72,.35),this._trackAmbience(o,[c,l,...p]),this.thunderSource=o;const d=o.onended;o.onended=()=>{d(),this.thunderSource===o&&(this.thunderSource=null)},o.start(h),o.stop(h+u)}_chirp(t){const e=this.context.currentTime+.015,n=1600+Math.random()*1100,s=2+Math.floor(Math.random()*2);for(let r=0;r<s;r++){const a=this.context.createOscillator(),o=this.context.createGain(),c=e+r*(.14+Math.random()*.035);a.type="sine",a.frequency.setValueAtTime(n*(1+r*.1),c),a.frequency.exponentialRampToValueAtTime(n*(r%2?.9:1.28),c+.07),a.frequency.exponentialRampToValueAtTime(n*.95,c+.13),o.gain.setValueAtTime(1e-4,c),o.gain.exponentialRampToValueAtTime(t,c+.025),o.gain.exponentialRampToValueAtTime(1e-4,c+.15),a.connect(o),o.connect(this.ambience),this._trackAmbience(a,[o]),a.start(c),a.stop(c+.17)}}_trackAmbience(t,e){this.active.add(t),this.ambientSources.add(t),t.onended=()=>{t.disconnect();for(const n of e)n.disconnect();this.active.delete(t),this.ambientSources.delete(t)}}_weather(t,e,n=1){if(this.weatherKind!==t&&(this._stopWeather(),this.weatherKind=t,t!=="sun")){const s=this.context;this._noise();const r=s.createBufferSource(),a=s.createBiquadFilter(),o=s.createGain();r.buffer=this.noiseBuffer,r.loop=!0,a.type="lowpass",a.frequency.value=t==="rain"?2200:500,a.Q.value=.3,o.gain.value=1e-4,r.connect(a),a.connect(o),o.connect(this.ambience),this._trackAmbience(r,[a,o]),this.weatherSource={source:r,gain:o,filter:a},r.start()}if(this.weatherSource){const s=(t==="rain"?.032*n:.024)*e;Math.abs(s-this.weatherVolume)>.001&&(this.weatherSource.gain.gain.setTargetAtTime(s,this.context.currentTime,.8),this.weatherVolume=s)}}_stopWeather(){this.weatherSource&&this._releaseAmbience(this.weatherSource.source),this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1}_releaseAmbience(t){try{t.stop()}catch{}t.onended?.(),t.onended=null}_restoreMusicMix(){if(!this.context||!this.music||this.context.state==="closed")return;const t=this.context.currentTime;this.music.gain.cancelScheduledValues(t),this.music.gain.setTargetAtTime(this.paused?1e-4:.42,t,.025)}_stopAmbience(){this._restoreMusicMix(),this._stopWeather(),this.thunderSource=null;for(const t of[...this.ambientSources])this._releaseAmbience(t);this.birdCountdown=4+Math.random()*6}_note(t,e,n,s,r="marimba",a=this.effects){if(!this.context||!a||this.disposed)return;const o=this.context,c=o.createOscillator(),l=o.createGain(),h=440*2**((t-69)/12);c.type=r==="pluck"?"triangle":"sine",c.frequency.setValueAtTime(h,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(.001,s),e+(r==="flute"?.035:.009)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l),l.connect(a),this.active.add(c),c.onended=()=>{c.disconnect(),l.disconnect(),this.active.delete(c)},c.start(e),c.stop(e+n+.03),r==="marimba"&&this._note(t+19,e,n*.35,s*.12,"partial",a)}play(t){if(!this.context||this.context.state!=="running"||this.muted||this.disposed)return;const e=this.context.currentTime+.01;if(t==="bark"){[0,.14].forEach(r=>{const a=this.context.createOscillator(),o=this.context.createGain(),c=e+r;a.type="triangle",a.frequency.setValueAtTime(330,c),a.frequency.exponentialRampToValueAtTime(110,c+.095),o.gain.setValueAtTime(1e-4,c),o.gain.exponentialRampToValueAtTime(.11,c+.012),o.gain.exponentialRampToValueAtTime(1e-4,c+.1),a.connect(o),o.connect(this.effects),this.active.add(a),a.onended=()=>{a.disconnect(),o.disconnect(),this.active.delete(a)},a.start(c),a.stop(c+.12)});return}const s={saved:[79,84],animal:[79,84],rescue:[79,84],purchase:[72,76,79,84],unlock:[72,76,79,84],completed:[72,76,79,84,79,84],complete:[72,76,79,84,79,84],win:[72,76,79,84,79,84],click:[79]}[t];s&&s.forEach((r,a)=>this._note(r,e+a*.115,.28,.16,"marimba"))}dispose(){if(!this.disposed){this.activationGeneration++,this.disposed=!0,this._stopScheduler(),this._stopAmbience();for(const t of this.active){try{t.stop()}catch{}t.disconnect()}this.active.clear(),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{}),this.context=null,this.master=this.music=this.effects=this.ambience=null,this.noiseBuffer=null}}}const xt=i=>document.getElementById(i);let on,Ct,sn,ae=tx(),Bt="intro",xi="playing",Bl=performance.now(),_i=0,oc=0,Fr=0,Zi=0,cc=!1,kl,lc=null;const Be=new qx,vn={x:0,z:0},nn=new Set,Yx=vu({document,getState:()=>({level:Ct,dog:sn,playing:Bt==="playing"}),onOpen:()=>hc("Gate open — guide the flock through.")}),Le=(i,t)=>xt(i).classList.toggle("hidden",!t);let Po=!1;const Wr=()=>{Po||ex(ae)||hc("Progress is kept for this session; browser storage is unavailable.")},Gl=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function hc(i){xt("toast").textContent=i,Le("toast",!0),clearTimeout(kl),kl=setTimeout(()=>Le("toast",!1),2800)}function Ai(){xt("points").textContent=ae.points,xt("sound").textContent=ae.music?"♫":"♪",xt("sound").setAttribute("aria-label",ae.music?"Mute sound":"Enable sound"),xt("sound").style.opacity=ae.music?"1":".55"}function os(){vn.x=vn.z=0,Zn=null,nn.clear(),xt("stick").style.transform="translate(0,0)"}async function bi(i=ae.highestLevel){i=Math.max(0,Math.min(99,Math.floor(Number(i)||0))),Mi(!1),Ct=jl(i),sn={...Ct.dog,heading:Ct.dog.heading??Math.atan2(Ct.spawn.x-Ct.dog.x,Ct.spawn.z-Ct.dog.z)},_i=0,Zi=0,cc=!1,oc=Fr=0,os(),on.setLevel(Ct),Bt="playing";for(const t of["intro","scene-tag"])Le(t,!1);for(const t of["mission","controls","map-box","destination"])Le(t,!0);xt("level-name").textContent=`LEVEL ${i+1} · ${Ct.title}`,xt("objective").textContent=Ct.target.type==="pen"?"Everyone into the pen":Ct.target.type==="barn"?"Bring the flock home":"Over to Clover Field",xt("total").textContent=`/ ${Ct.animals.length}`,xt("saved").textContent=0,xt("progress").style.width="0%",xt("countdown").textContent=`First arrival starts ${Hr(Ct)}s`,xt("countdown").classList.toggle("running",!1),xt("mission-score").textContent=`Score 0 / ${Ct.reward}`,Le("tip",!0),Do(i===0?"Drag with your thumb to move Pip. Try circling behind the sheep.":Ct.routes.length>1?"Choose a winding trail on the map. Each trail reaches home.":"Follow the winding trail. Gather stragglers before crossing."),Be.setMuted(!ae.music),await Be.start(),Bt!=="playing"&&Be.pause(),Ai()}function Do(i){xt("tip-text").textContent=i,xt("tip").querySelector(".tip-number").textContent=`0${Zi+1}`}function Xr(){Bt!=="playing"||performance.now()<Fr||(oc=performance.now()+650,Fr=performance.now()+2100,Be.play("bark"),on.bark(),navigator.vibrate&&navigator.vibrate(20))}function qr(i,t="paused"){xi=Bt==="playing"?"playing":Bt==="complete"?"complete":"intro",Bt=t,os(),Be.pause(),xt("modal").classList.contains("hidden")&&(lc=document.activeElement),xt("modal-card").innerHTML=i,Le("modal",!0),Le("controls",!1),setTimeout(()=>xt("modal-card").querySelector("button")?.focus(),30)}function Mi(i=!0){Le("modal",!1),i&&(Bt=xi,Le("controls",Bt==="playing"),Bt==="playing"&&Be.resume(),lc?.focus()),os()}function us(){if(Bt==="reset-confirm"){xt("cancel-reset").onclick();return}if(Bt==="shop"){xt("shop-back").onclick();return}if(Bt==="paused"){Mi();return}Bt!=="complete"&&(qr(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${Bt==="intro"?"Hello, shepherd.":"Paws for a moment."}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${Bt==="intro"?"Back to the meadow":"Keep herding"} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${ae.points} bolts</button>${Bt==="playing"?'<button class="secondary" id="restart">Restart this meadow</button>':""}<button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,ae.highestLevel+1)},(i,t)=>`<button class="${t===Ct.index?"current":""}" data-level="${t}" aria-label="Play level ${t+1}">${t+1}</button>`).join("")}</div>`),xt("close").onclick=()=>Mi(),xt("resume").onclick=()=>Mi(),xt("upgrades-menu").onclick=Yr,xt("restart-game-menu").onclick=Kh,xt("restart")&&(xt("restart").onclick=()=>bi(Ct.index)),xt("modal-card").querySelectorAll("[data-level]").forEach(i=>i.onclick=()=>bi(Number(i.dataset.level))))}function Kh(){const i=Bt,t=xi,e=()=>{Bt=i,xi=t,i==="paused"?(Bt=t,us(),xt("restart-game-menu").focus()):(Mi(!1),lc?.focus())};qr('<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>',"reset-confirm"),xt("close").onclick=e,xt("cancel-reset").onclick=e,xt("confirm-reset").onclick=async()=>{ae={...Os(),music:ae.music},Ps=0,As=-1/0,hi=null,Wr(),Ai(),await bi(0),Bt==="playing"&&xt("pause").focus()}}function Yr(){const i=Bt==="complete"?"complete":Bt==="paused"||Bt==="shop"?xi:Bt,t=Bh(ae.upgrades,Ct.index+1);qr(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${ae.points} bolts</strong> to spend.</p><div class="upgrade-grid">${Vr.map(n=>{const s=Nn(ae.upgrades,n.id),r=Nn(t,n.id),a=k0(ae,n.id),o=Jo(ae.upgrades,n.id),c=a.reason==="locked",l=c?`Next tier unlocks at level ${a.unlockLevel}`:o===null?"All tiers owned":n.tierDescriptions[s],h=s>r?`<small class="inactive-upgrade">${r?"Next owned tier activates":"Equipped"} from level ${n.unlockLevels[r]}</small>`:"";return`<article class="upgrade ${c?"locked":""}"><div class="upgrade-icon">${{speed:"ϟ",flock:"⌁",drone:"✥",helper:"♧",bark:"♪",cohesion:"❋"}[n.id]}</div><div><h3>${Gl(n.name)} <small style="font-size:9px;color:#839277">${s}/3</small></h3><p>${Gl(l)}</p>${h}</div><button data-buy="${n.id}" ${a.available?"":"disabled"}>${o===null?"Max tier":c?`Level ${a.unlockLevel}`:`${o} ✦`}</button></article>`}).join("")}</div><button class="primary" id="shop-back">${i==="complete"?"Back to your reward":"Back to the meadow"} <span>➜</span></button>`,"shop"),xi=i;const e=()=>{i==="complete"?uc(!1):Mi()};xt("close").onclick=e,xt("shop-back").onclick=e,xt("modal-card").querySelectorAll("[data-buy]").forEach(n=>n.onclick=()=>{const s=G0(ae,n.dataset.buy);s.ok&&(Be.play("purchase"),Wr(),Ai(),Yr(),xi=i,hc(`${s.upgrade.tierNames[s.level-1]} equipped!`))})}let Ps=0;function uc(i=!0){i&&(Ps=Q0(ae,Ct),Wr(),Ai(),Be.play("completed"),on.celebrate(Ct.target.x,Ct.target.z)),Bt="complete";const t=Ct.result?.saved??Ct.animals.filter(s=>s.saved).length,e=Ct.animals.length,n=Ct.result?.score??0;qr(`<div class="complete-seal">✦</div><div class="eyebrow">${t===e?"A GOOD DAY’S HERDING":"DELIVERY TIME IS UP"}</div><h2>${t===e?"Everyone’s home.":t>0?"A flock brought home.":"Try this meadow again."}</h2><p>${t} / ${e} robots delivered.<br>Score ${n} / ${Ct.reward} · Best ${ae.bestScores[Ct.index]||0} / ${Ct.reward}<br>${Math.floor(_i/60)}m ${Math.floor(_i%60)}s in the countryside.</p><div class="reward">+${Ps}<span style="font-size:20px"> ✦</span></div><p>${Ps?"Bolts earned from your improved delivery score.":"No extra bolts this time. Deliver more robots to improve your best score."}${t>0&&t<e?" The next meadow is open.":""}</p><button class="primary" id="next">${t===0?"Try again":Ct.index>=99?"Return to the first meadow":"Next meadow"} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,"complete"),xt("next").onclick=()=>bi(t===0?Ct.index:Ct.index>=99?0:Ct.index+1),xt("reward-shop").onclick=Yr,xt("replay").onclick=()=>bi(Ct.index)}let Zn=null,Lo={x:0,y:0},As=-1/0,hi=null,dc=!1;function $x(i){Bt!=="playing"||Zn!==null||i.isPrimary===!1||i.target.closest("button,header,.map-box,.tip")||i.target!==xt("world")&&!i.target.closest("#joystick")||(i.preventDefault(),Zn=i.pointerId,Lo={x:i.clientX,y:i.clientY},dc=!1,i.target.setPointerCapture?.(Zn))}function Zx(i){if(i.pointerId!==Zn)return;const t=i.clientX-Lo.x,e=i.clientY-Lo.y,n=Math.hypot(t,e),s=42;dc||=n>9,vn.x=t/Math.max(s,n),vn.z=e/Math.max(s,n),xt("stick").style.transform=`translate(${vn.x*s}px,${vn.z*s}px)`}function jh(i){if(i.pointerId===Zn){if(i.preventDefault(),i.type!=="pointercancel"&&!dc){const t=performance.now();hi&&Math.hypot(i.clientX-hi.x,i.clientY-hi.y)<42&&t-As<330?(Xr(),As=-1/0,hi=null):(As=t,hi={x:i.clientX,y:i.clientY})}else As=-1/0,hi=null;Zn=null,vn.x=vn.z=0,xt("stick").style.transform="translate(0,0)"}}document.addEventListener("pointerdown",$x,{passive:!1});document.addEventListener("pointermove",Zx,{passive:!1});document.addEventListener("pointerup",jh,{passive:!1});document.addEventListener("pointercancel",jh,{passive:!1});const fc=i=>i===xt("world")||!!i.closest("#controls");document.addEventListener("touchstart",i=>{Bt==="playing"&&fc(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("touchend",i=>{Bt==="playing"&&fc(i.target)&&(i.preventDefault(),i.target.closest("#bark")&&Xr())},{passive:!1});document.addEventListener("gesturestart",i=>{Bt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("gesturechange",i=>{Bt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("dblclick",i=>{Bt==="playing"&&fc(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("keydown",i=>{if(Bt==="playing"&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","w","a","s","d","W","A","S","D"].includes(i.key)&&!i.target.closest('input,textarea,[contenteditable="true"]')&&!(i.key===" "&&i.target.closest("button"))&&(i.preventDefault(),nn.add(i.key.toLowerCase()),i.key===" "&&Xr()),i.key==="Escape"&&(i.preventDefault(),us()),i.key==="Tab"&&!xt("modal").classList.contains("hidden")){const t=[...xt("modal-card").querySelectorAll("button:not([disabled])")],e=t[0],n=t.at(-1);i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())}});document.addEventListener("keyup",i=>nn.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{os(),Zn=null,Bt==="playing"&&us()});document.addEventListener("visibilitychange",()=>{document.hidden&&Bt==="playing"&&us()});window.addEventListener("resize",()=>on?.resize());xt("play").onclick=()=>bi();xt("restart-game-main").onclick=Kh;xt("bark").onclick=Xr;xt("pause").onclick=us;xt("home").onclick=i=>{i.preventDefault(),us()};xt("wallet").onclick=Yr;xt("sound").onclick=async()=>{ae.music=!ae.music,Be.setMuted(!ae.music),ae.music&&(await Be.start(),(Bt!=="playing"||!ae.music)&&Be.pause()),Wr(),Ai()};xt("dismiss-tip").onclick=()=>{cc=!0,Le("tip",!1)};let Na=0;function Jh(i){requestAnimationFrame(Jh);const t=Math.min((i-Bl)/1e3,.05);if(Bl=i,!on||!Ct)return;if(Bt==="playing"){_i+=t;const n=nn.has("arrowright")||nn.has("d")?1:nn.has("arrowleft")||nn.has("a")?-1:vn.x,s=nn.has("arrowdown")||nn.has("s")?1:nn.has("arrowup")||nn.has("w")?-1:vn.z,r=j0(Ct,sn,{x:n,z:s,bark:i<oc},t,ae.upgrades);xt("saved").textContent=r.saved,xt("progress").style.width=`${r.total?r.saved/r.total*100:0}%`,xt("countdown").textContent=r.countdownStarted?`${Math.ceil(r.remaining)}s to gather the rest`:`First arrival starts ${Hr(Ct)}s`,xt("countdown").classList.toggle("running",r.countdownStarted),xt("mission-score").textContent=`Score ${r.score} / ${r.possibleScore}`;for(const o of r.events)o.type==="animalSaved"&&Be.play("saved");const a=i<Fr;xt("bark").classList.toggle("cooldown",a),xt("bark").disabled=a,cc||(Ct.index===0?(_i>5&&Zi===0&&(Zi=1,Do("Sheep move away from Pip. Stay behind them to guide them to the golden pen.")),r.saved>0&&Zi<2&&(Zi=2,Do("Lovely! Circle behind the stragglers. Double-tap anywhere to woof."))):_i>14&&Le("tip",!1)),r.justCompleted&&uc()}else Bt==="complete"&&!document.hidden&&K0(Ct,t);Yx.update(),on.update(Ct,sn,!document.hidden&&(Bt==="playing"||Bt==="intro"||Bt==="complete")?t:0,Bt==="intro");const e=on.nature?.weather;if(e&&(xt("weather-status").textContent={sun:"☀ Clear skies",wind:"↝ Breezy",rain:"☂ Light rain","heavy-rain":"☂ Heavy rain",storm:"ϟ Thunderstorm"}[e.kind||e.type]||"Clear skies"),Bt==="playing"&&Be.updateAmbience?.(t,{weather:on.nature?.weather||Ct.weather||"sun",level:Ct.index+1,time:Ct.time,dog:sn,animals:Ct.animals}),Na+=t,Na>.1){Na=0,on.drawMap(xt("map"),Ct,sn);const n=mu(Ct,sn),s=n.x-sn.x,r=n.z-sn.z;xt("direction").style.transform=`rotate(${Math.atan2(r,s)*180/Math.PI}deg)`,xt("distance").textContent=`${Math.round(Math.hypot(s,r))} m`,xt("destination-text").textContent=n.kind==="bridge"?"Wooden bridge":n.kind==="gate"?Ct.gates.some(a=>a.operable&&!a.open&&Math.hypot(a.x-n.x,a.z-n.z)<1)?"Closed gate · approach to open":"Open gate":n.kind==="target"||n===Ct.target?Ct.target.type==="pen"?"Sunny pen":Ct.target.type==="barn"?"Home barn":"Clover Field":"Winding trail"}}try{on=new Xx(xt("world")),Ct=jl(0),sn={...Ct.dog,heading:Math.PI/2},on.setLevel(Ct),Ai(),Le("loading",!1),requestAnimationFrame(Jh)}catch(i){Le("loading",!1),Le("error",!0),xt("error-message").textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${i.message}`,console.error(i)}ou(async()=>{const{installQA:i}=await import("./qa-DVLjLgB8.js");return{installQA:i}},__vite__mapDeps([0,1]),import.meta.url).then(({installQA:i})=>{const t=()=>{Bt="qa",os(),Be.pause(),Mi(!1),Le("controls",!1)},e=async n=>{const s=bi(n);t(),await s,t()};i({getState:()=>({level:Ct,dog:sn,profile:ae,elapsed:_i}),enterSession:async()=>{Po||(Po=!0,ae=Os(),await e(0))},pause:t,isPaused:()=>Bt==="qa",resume:()=>{if(Ct.completed){uc(!1);return}Bt="playing",os(),Le("controls",!0),Be.resume()},jump:e,resetSession:async()=>{ae=Os(),Ps=0,await e(0)},canOccupy:Fe,updateWallet:Ai})});
