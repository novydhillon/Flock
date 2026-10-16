const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qa-BRO7Tstr.js","./qa-DWlVkWAo.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const yd="modulepreload",Sd=function(i,t){return new URL(i,t).href},_l={},bd=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let l=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(u=>{if(u=Sd(u,n),u in _l)return;_l[u]=!0;const h=u.endsWith(".css"),f=h?'[rel="stylesheet"]':"";if(n)for(let g=o.length-1;g>=0;g--){const x=o[g];if(x.href===u&&(!h||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${f}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":yd,h||(d.as="script"),d.crossOrigin="",d.href=u,c&&d.setAttribute("nonce",c),document.head.appendChild(d),h)return new Promise((g,x)=>{d.addEventListener("load",g),d.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},Ea=(i,t,e)=>Math.max(t,Math.min(e,i)),ye=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),bc=(i,t)=>{const e=Math.hypot(i,t);return e>1e-8?{x:i/e,z:t/e}:{x:0,z:0}};function wd(i){let t=i>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function wc(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Ea(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return{x:t.x+n*r,z:t.z+s*r,t:r}}function on(i,t,e){return ye(i,wc(i,t,e))}const vn=i=>({x:Math.sin(i),z:Math.cos(i)});function Ec(i,t){const e=vn(i.heading),n=t.x-i.x,s=t.z-i.z;return{forward:n*e.x+s*e.z,lateral:n*e.z-s*e.x}}function Ci(i,t,e){const n=vn(i.heading);return{x:i.x+n.x*t+n.z*e,z:i.z+n.z*t-n.x*e}}function an(i){const t=i.radius+1.4,e=t,n=vn(i.heading),s={x:n.z,z:-n.x};return{x:i.x,z:i.z,heading:i.heading,halfLength:t,halfWidth:e,openingWidth:7,forward:n,side:s,corners:[[-t,-e],[t,-e],[t,e],[-t,e]].map(([r,o])=>Ci(i,r,o)),entrance:Ci(i,-t,0)}}function go(i,t,e=0){const n=an(i),s=Ec(i,t),r=Math.max(0,e);return Math.abs(s.forward)<=n.halfLength-r&&Math.abs(s.lateral)<=n.halfWidth-r}function Tc(i,t,e){const n=vn(i.heading),s=t.x-i.x,r=t.z-i.z;return Math.abs(s*n.x+r*n.z)<=i.length/2+e&&Math.abs(s*n.z-r*n.x)<=i.width/2-e}const vl=new WeakMap;function jh(i){let t=vl.get(i);if(t)return t;const e=vn(i.heading),n={x:e.z,z:-e.x},s=(c,l)=>({x:i.x+e.x*c+n.x*l,z:i.z+e.z*c+n.z*l}),r=[-1,1].map(c=>({a:s(-i.length/2-.1,c*i.width/2),b:s(i.length/2+.1,c*i.width/2),radius:.05,posts:Array.from({length:4},(l,u)=>s(-i.length/2+u*i.length/3,c*i.width/2))})),o=r.flatMap(c=>[c.a,c.b]),a={minX:Math.min(...o.map(c=>c.x)),maxX:Math.max(...o.map(c=>c.x)),minZ:Math.min(...o.map(c=>c.z)),maxZ:Math.max(...o.map(c=>c.z))};return t={rails:r,bounds:a},vl.set(i,t),t}function Ed(i,t,e){const{rails:n,bounds:s}=jh(i),r=e+.065;return t.x<s.minX-r||t.x>s.maxX+r||t.z<s.minZ-r||t.z>s.maxZ+r?!1:n.some(o=>on(t,o.a,o.b)<e+o.radius||o.posts.some(a=>ye(t,a)<e+.065))}function Qh(i,t,e,n){const{rails:s,bounds:r}=jh(i),o=n+.065;return Math.max(t.x,e.x)<r.minX-o||Math.min(t.x,e.x)>r.maxX+o||Math.max(t.z,e.z)<r.minZ-o||Math.min(t.z,e.z)>r.maxZ+o?!1:s.some(a=>eu(t,e,a.a,a.b,n+a.radius)||a.posts.some(c=>on(c,t,e)<n+.065))}function Td(i,t,e=4){const n=i.points,s=n[0],r=n.at(-1),o=Math.abs(r.x-s.x)>Math.abs(r.z-s.z)?"x":"z",a=n[1][o]-s[o],c=Math.floor((t[o]-s[o])/a),l=Math.ceil(e/Math.abs(a))+2,u=[];for(let h=Math.max(0,c-l);h<Math.min(n.length-1,c+l+1);h++)u.push([n[h],n[h+1]]);return u}const Ml=new WeakMap;function tu(i){let t=Ml.get(i);return t||(t={minX:Math.min(...i.points.map(e=>e.x)),maxX:Math.max(...i.points.map(e=>e.x)),minZ:Math.min(...i.points.map(e=>e.z)),maxZ:Math.max(...i.points.map(e=>e.z))},Ml.set(i,t)),t}function Ac(i,t,e){const n=tu(i),s=i.width/2+e;return t.x<n.minX-s||t.x>n.maxX+s||t.z<n.minZ-s||t.z>n.maxZ+s?!1:Td(i,t,s).some(([r,o])=>on(t,r,o)<s)}function Ad(i,t,e,n){const s=tu(i),r=i.width/2+n;return Math.max(t.x,e.x)>=s.minX-r&&Math.min(t.x,e.x)<=s.maxX+r&&Math.max(t.z,e.z)>=s.minZ-r&&Math.min(t.z,e.z)<=s.maxZ+r}function eu(i,t,e,n,s){if(Math.max(i.x,t.x)<Math.min(e.x,n.x)-s||Math.min(i.x,t.x)>Math.max(e.x,n.x)+s||Math.max(i.z,t.z)<Math.min(e.z,n.z)-s||Math.min(i.z,t.z)>Math.max(e.z,n.z)+s)return!1;const r=(u,h,f)=>(h.x-u.x)*(f.z-u.z)-(h.z-u.z)*(f.x-u.x),o=r(i,t,e),a=r(i,t,n),c=r(e,n,i),l=r(e,n,t);return o*a<0&&c*l<0?!0:Math.min(on(i,e,n),on(t,e,n),on(e,i,t),on(n,i,t))<s}function Rc(i){const t=vn(i.heading),e=i.width/2;return{a:{x:i.x-t.z*e,z:i.z+t.x*e},b:{x:i.x+t.z*e,z:i.z-t.x*e},kind:"gate",material:i.material||"wood"}}const nu=i=>i.material==="stone"?.3:.18;function iu(i){return[...i.fenceSegments||[],...(i.gates||[]).filter(t=>t.operable&&!t.open).map(Rc)]}function be(i,t,e,n=.55){const s={x:t,z:e},r=i.bounds;if(t<r.minX+n+.18||t>r.maxX-n-.18||e<r.minZ+n+.18||e>r.maxZ-n-.18)return!1;for(const o of iu(i))if(on(s,o.a,o.b)<n+nu(o))return!1;for(const o of i.rivers||[])if(o.bridges.some(c=>Ed(c,s,n))||Ac(o,s,n)&&!o.bridges.some(c=>Tc(c,s,n)))return!1;for(const o of i.obstacles||[])if(ye(s,o)<n+o.radius)return!1;return!0}function Bs(i,t,e,n,s=.55){const r=Math.max(1,Math.ceil(Math.hypot(e,n)/.25)),o=e/r,a=n/r;let c=!1,l=!1;for(let u=0;u<r;u++)be(i,t.x+o,t.z+a,s)?(t.x+=o,t.z+=a):(be(i,t.x+o,t.z,s)?t.x+=o:Math.abs(o)>1e-8&&(c=!0),be(i,t.x,t.z+a,s)?t.z+=a:Math.abs(a)>1e-8&&(l=!0));return{blockedX:c,blockedZ:l}}function su(i,t,e,n,s,r=!1){const o=i.bounds;for(const a of[t,e])if(a.x<o.minX+n+.18||a.x>o.maxX-n-.18||a.z<o.minZ+n+.18||a.z>o.maxZ-n-.18)return!1;for(const a of iu(i))if(!(r&&a.kind!=="gate"&&a.material!=="stone"&&(a.kind!=="target"||i.target?.type!=="barn"))&&eu(t,e,a.a,a.b,n+nu(a)))return!1;for(const a of i.obstacles||[]){const c=n+a.radius;if(!(a.x<Math.min(t.x,e.x)-c||a.x>Math.max(t.x,e.x)+c||a.z<Math.min(t.z,e.z)-c||a.z>Math.max(t.z,e.z)+c)&&on(a,t,e)<c)return!1}for(const a of i.rivers||[]){if(s&&a.bridges.some(l=>Qh(l,t,e,n)))return!1;if(!Ad(a,t,e,n))continue;const c=Math.max(1,Math.ceil(ye(t,e)/.45));for(let l=0;l<=c;l++){const u={x:t.x+(e.x-t.x)*l/c,z:t.z+(e.z-t.z)*l/c};if(Ac(a,u,n)&&!a.bridges.some(h=>Tc(h,u,n)))return!1}}return!0}function Ae(i,t,e,n=.55){return su(i,t,e,n,!0)}function Rd(i,t,e){return su(i,t,e,.15,!1,!0)}function Ti(i,t,e){for(const n of i?.rivers||[])for(const s of n.bridges)if(Tc(s,{x:t,z:e},0)){const r=vn(s.heading),o=(t-s.x)*r.x+(e-s.z)*r.z;return .18+.12*Math.sin(Math.PI*(o/s.length+.5))}return 0}function Cd(i){const t={x:i.minX,z:i.minZ},e={x:i.maxX,z:i.minZ},n={x:i.maxX,z:i.maxZ},s={x:i.minX,z:i.maxZ};return[[t,e],[e,n],[n,s],[s,t]].map(([r,o])=>({a:r,b:o,kind:"boundary"}))}function Pd(i,t,e){const n=[i[0]];for(let s=1;s<i.length;s++){const r=i[s-1],o=i[s],a=ye(r,o),c=Math.max(1,Math.ceil(a/1.2)),l=bc(o.x-r.x,o.z-r.z),u=t()*Math.PI*2,h=r.kind==="bridge"||o.kind==="bridge"||r.kind==="gate"||o.kind==="gate"||o.kind==="target"?0:Math.min(1.8,a*.045),f=[];for(let g=1;g<=c;g++){const x=g/c,p=Math.sin(Math.PI*x)*Math.sin(Math.PI*2*x+u)*h;f.push({x:r.x+(o.x-r.x)*x-l.z*p,z:r.z+(o.z-r.z)*x+l.x*p,...g===c&&o.kind?{kind:o.kind}:{}})}const d=!e||f.every((g,x)=>Ae(e,x?f[x-1]:r,g,.85));for(let g=1;g<=c;g++){const x=g/c;n.push(d?f[g-1]:{x:r.x+(o.x-r.x)*x,z:r.z+(o.z-r.z)*x,...g===c&&o.kind?{kind:o.kind}:{}})}}return n}function ru(i=0,t=i*7919+42){i=Ea(Math.floor(Number(i)||0),0,99),t=Number(t)>>>0;const e=wd(t),n=i<5,s=Math.min(5+i*3,65),r=i===1?9.4:n?4.1:4.8,o=n?15+i*3:48+i*3,a=n?-32:-40,c=o+15,l=n?24:84+Math.floor(i/15)*14,h=(n?i===0?0:t%2*2:t%4)*Math.PI/2,f=et=>({x:Number((et.x*Math.cos(h)-et.z*Math.sin(h)).toFixed(6)),z:Number((et.x*Math.sin(h)+et.z*Math.cos(h)).toFixed(6)),...et.kind?{kind:et.kind}:{}}),d=Math.PI/2-h,g=[{x:a,z:-l},{x:c,z:l},{x:a,z:l},{x:c,z:-l}].map(f),x={minX:Math.min(...g.map(et=>et.x)),maxX:Math.max(...g.map(et=>et.x)),minZ:Math.min(...g.map(et=>et.z)),maxZ:Math.max(...g.map(et=>et.z))};n||(x.minZ=Math.min(x.minZ,-l),x.maxZ=Math.max(x.maxZ,l));const p={...f({x:o,z:0}),radius:4.7+Math.sqrt(s)*.2,type:i%3===2?"barn":i%3===1?"field":"pen",heading:d},m=f({x:n?-20:-26,z:0}),y=f({x:n?-26:-33,z:0}),v=n?1:i<15?i%2===1?2:1:i%3===0?3:2,_=n?o-21:o-32,A=i===0?[]:n?[i===1?-10:-12]:i>=15?[_-48,_-23]:[_-23],T=A.map(et=>{const ht=e()*Math.PI*2;return{width:n?3.1:3.7+Math.min(i*.025,1.8),at:X=>et+Math.sin(X/21+ht)*2.4+Math.sin(X/8+ht)*.65}}),D=T.map(et=>({width:et.width,points:Array.from({length:Math.ceil((l*2+64)/2)+1},(ht,X)=>{const K=-l-32+X*2;return{x:et.at(K),z:K}}),bridges:[]})),N=[],b=[],S=e()>.5?1:-1;for(let et=0;et<v;et++){const ht=v===1?0:(et-(v-1)/2)*(n?12:32),X=[{x:m.x*Math.cos(h)+m.z*Math.sin(h),z:0}];if(i===0)X.push({x:-8,z:2.8},{x:2,z:-2.2},{x:o-p.radius-3,z:0},{x:o,z:0,kind:"target"});else{if(T.forEach((nt,st)=>{const ct=n?i===1?0:S*5:ht+S*(st%2?-1:1)*(14+e()*5),Vt=D[st].points,Wt=Ea(Math.floor((ct-Vt[0].z)/2),0,Vt.length-2),I=Vt[Wt],$t=Vt[Wt+1],zt=(ct-I.z)/($t.z-I.z),Pt=I.x+($t.x-I.x)*zt,vt=bc($t.z-I.z,I.x-$t.x),jt={x:Pt,z:ct,width:r*1.25,length:nt.width+1.5,heading:Math.atan2(vt.x,vt.z)-h};D[st].bridges.push(jt);const yt=nt.width/2+2.5+(n?3:6),Ot=n?yt:(Pt-A[st]+yt)/vt.x,fe=n?yt:(A[st]+yt-Pt)/vt.x,re={x:Pt-vt.x*Ot,z:ct-vt.z*Ot},P={x:Pt+vt.x*fe,z:ct+vt.z*fe};X.push({x:re.x-4,z:re.z-S*(n?3:8)},re,{x:Pt,z:ct,kind:"bridge"},P)}),i>=2){const nt=n?S*-4:ht-S*(13+e()*4),st={x:_,z:nt,width:n?8:10,heading:d};N.push(st),X.push({x:_-5,z:nt},{x:_,z:nt,kind:"gate"},{x:_+5,z:nt})}const K=o-p.radius-4;X.push({x:K-7,z:n?S*3:ht*.3},{x:K,z:0},{x:o,z:0,kind:"target"})}b.push(X)}const U=D.map(et=>({width:et.width,points:et.points.map(f),bridges:et.bridges.map(ht=>({...ht,...f(ht)}))})),k=i>=7&&i%4===3,W=N.map((et,ht)=>({...et,...f(et),id:`gate-${ht}`,operable:i>=19,open:i<19,material:k?"stone":"wood"})),L=Cd(x);if(W.length){const et=[...N].sort((X,K)=>X.z-K.z);let ht=-l;for(const X of et)L.push({a:f({x:_,z:ht}),b:f({x:_,z:X.z-X.width/2}),kind:"interior"}),ht=X.z+X.width/2;L.push({a:f({x:_,z:ht}),b:f({x:_,z:l}),kind:"interior"})}const C=an(p),E=C.halfLength,F=C.halfWidth,R=C.openingWidth/2,B=[[[-E,-F],[E,-F]],[[E,-F],[E,F]],[[E,F],[-E,F]],[[-E,F],[-E,R]],[[-E,-R],[-E,-F]]];for(const[et,ht]of B)L.push({a:Ci(p,...et),b:Ci(p,...ht),kind:"target"});for(const et of L)et.material=k&&et.kind!=="target"?"stone":"wood";const Y={bounds:x,rivers:U,fenceSegments:L,obstacles:[]},Q=b.map((et,ht)=>{const X=Pd(et.map(f),e,Y);return{id:`route-${ht}`,points:X,length:X.slice(1).reduce((K,nt,st)=>K+ye(nt,X[st]),0)}}),ft=Q.map(et=>({routeId:et.id,points:et.points,width:r})),Ct={index:i,seed:t,title:["First day on the farm","Over the babbling brook","Through the garden gate","A mixed-up meadow","The long way home"][i]||`Pasture patrol ${i+1}`,description:i===0?"Move behind the sheep and gently guide all five into the sunny pen.":`Bring ${s} robots to the ${p.type}. ${v>1?"Choose a crossing and lead your flock through the meadow.":"Follow the winding trail and use the crossings."}`,bounds:x,spawn:m,dog:y,target:p,animals:[],rivers:U,gates:W,fences:[],fenceSegments:L,obstacles:[],routes:Q,roads:ft,reward:80+i*25,sceneryHills:[]};for(let et=0;et<s;et++){const ht=f({x:(n?-20:-26)+Math.floor(et/7)*1.65+(e()-.5)*.2,z:(et%7-3)*1.65+(e()-.5)*.2});Ct.animals.push({id:et,type:i>=3&&et%4===0?"cow":"sheep",...ht,vx:0,vz:0,saved:!1})}if(Ct.animals.some(et=>!be(Ct,et.x,et.z,et.type==="cow"?.78:.55))){const et=vn(d),ht=Ct.animals.map(X=>({x:X.x,z:X.z}));for(let X=1;X<=7;X++){const K=X*.5,nt=ht.map(st=>({x:st.x-et.x*K,z:st.z-et.z*K}));if(nt.every((st,ct)=>be(Ct,st.x,st.z,Ct.animals[ct].type==="cow"?.78:.55))){nt.forEach((st,ct)=>Object.assign(Ct.animals[ct],st));break}}}for(let et=0;et<Math.min(10+i*2,130);et++){const ht=f({x:a+5+e()*(c-a-10),z:-l+5+e()*(l*2-10)}),X=.7+e()*.7;ye(ht,m)<14||ye(ht,p)<p.radius+10||!be(Ct,ht.x,ht.z,X+1)||Q.some(K=>K.points.slice(1).some((nt,st)=>on(ht,K.points[st],nt)<7+X))||Ct.obstacles.push({...ht,radius:X})}for(let et=0;et<14;et++){const ht=7+e()*8,X=3+e()*5,K=et%4,nt=K===0?{x:x.minX-ht-3,z:x.minZ+e()*(x.maxZ-x.minZ)}:K===1?{x:x.maxX+ht+3,z:x.minZ+e()*(x.maxZ-x.minZ)}:K===2?{x:x.minX+e()*(x.maxX-x.minX),z:x.minZ-ht-3}:{x:x.minX+e()*(x.maxX-x.minX),z:x.maxZ+ht+3};Ct.sceneryHills.push({...nt,radius:ht,height:X})}return Ct}function yl(i,t,e){let n=null;for(const s of i.routes||[]){if(e&&s.id!==e)continue;let r=0;for(let o=1;o<s.points.length;o++){const a=s.points[o-1],c=s.points[o],l=wc(t,a,c),u=ye(t,l),h=ye(a,c);(!n||u<n.distance)&&(n={route:s,routeId:s.id,index:o-1,point:l,distance:u,progress:r+h*l.t,length:s.length}),r+=h}}return n}function Ld(i,t){const e=i.target,n=an(e).halfLength,{forward:s,lateral:r}=Ec(e,t),o=(a,c)=>Ci(e,a,c);return s>n+.4?o(n+2,Math.sign(r||1)*(n+2)):Math.abs(r)>n-.4&&s>-n-.8?o(-n-2,Math.sign(r||1)*(n+2)):s<-n+.7?o(-n+2,0):e}function Dd(i,t,e,n){if(Ae(i,t,e,n))return e;const s=yl(i,t),r=yl(i,e,s?.routeId);if(!s||!r)return e;const o=r.progress>=s.progress,a=s.route.points;if(s.distance>3&&Ae(i,t,s.point,n))return s.point;const c=o?Math.min(a.length-1,s.index+5):Math.max(0,s.index-4);for(let l=c;o?l>s.index:l<=s.index;l+=o?-1:1)if(Ae(i,t,a[l],n))return a[l];return s.point}function Cc(i,t,e,n=.62){if(Ae(i,t,e,n))return e;const s=Dd(i,t,e,n),r=(i.rivers||[]).flatMap(g=>g.bridges).filter(g=>ye(t,g)<g.length+g.width+8||Qh(g,t,e,n)).sort((g,x)=>Math.min(ye(t,g),ye(e,g))-Math.min(ye(t,x),ye(e,x))).slice(0,2),o=i.target,a=o&&an(o),c=a&&(ye(t,o)<a.halfLength*2+6||ye(e,o)<a.halfLength*2+6);if(!r.length&&!c)return s;const l=[t,e,s];for(const g of r){const x=vn(g.heading),p=g.length/2+n+.4,m=g.width/2+n+.4;for(const[y,v]of[[-p,-m],[-p,m],[p,-m],[p,m],[-p,0],[p,0],[0,0]])l.push({x:g.x+x.x*y+x.z*v,z:g.z+x.z*y-x.x*v})}if(c){const g=a.halfLength+n+.5;for(const[x,p]of[[-g,-g],[-g,g],[g,-g],[g,g],[-g,0],[-a.halfLength+n+.5,0]])l.push(Ci(o,x,p))}const u=l.map(()=>1/0),h=[],f=new Set;u[0]=0;for(let g=0;g<l.length;g++){let x=-1;for(let p=0;p<l.length;p++)!f.has(p)&&(x<0||u[p]<u[x])&&(x=p);if(x<0||!Number.isFinite(u[x]))break;f.add(x);for(let p=1;p<l.length;p++){if(f.has(p)||!Ae(i,l[x],l[p],n))continue;const m=u[x]+ye(l[x],l[p]);m<u[p]&&(u[p]=m,h[p]=x)}}let d=Number.isFinite(u[1])?1:Number.isFinite(u[2])?2:-1;if(d<0)return s;for(;h[d]!==0&&h[d]!==void 0;)d=h[d];return l[d]}function Id(i,t,e,n,s=.78){const r=Math.hypot(e,n);if(r<.01)return{x:0,z:0};const o={x:t.x+e/r*2,z:t.z+n/r*2};if(Ae(i,t,o,s))return{x:0,z:0};let a=null,c=1/0;for(const g of i.rivers||[])if(Ac(g,t,3))for(const x of g.bridges){const p=ye(t,x);p<c&&(c=p,a=x)}const l=i.target,u=an(l),h={...u.entrance,width:u.openingWidth,heading:l.heading,enclosure:!0};for(const g of[...(i.gates||[]).filter(x=>!x.operable||x.open),h]){const x=vn(g.heading),p=t.x-g.x,m=t.z-g.z;Math.abs(p*x.x+m*x.z)<3&&ye(t,g)<c&&(c=ye(t,g),a=g)}if((i.fenceSegments||[]).some(g=>g.kind==="target"&&on(t,g.a,g.b)<s+2)&&(a=h),!a)return{x:0,z:0};if(a.length||a.enclosure){const g=Cc(i,t,a,s),x=bc(g.x-t.x,g.z-t.z);return{x:x.x*Math.min(2.4,r*.8+.5),z:x.z*Math.min(2.4,r*.8+.5)}}const f=vn(a.heading),d=(a.x-t.x)*f.z-(a.z-t.z)*f.x;return Math.abs(d)<a.width/2-1?{x:0,z:0}:{x:f.z*Math.sign(d)*Math.min(2.4,r*.8+.5),z:-f.x*Math.sign(d)*Math.min(2.4,r*.8+.5)}}const zd=3.2;function ou(i,t){return!i||!t?null:(i.gates||[]).filter(e=>e.operable&&!e.open).map(e=>{const n=Rc(e),s=wc(t,n.a,n.b),r=ye(t,s);if(r>zd||r<.001||!be(i,t.x,t.z,.62))return null;const o=.62+(e.material==="stone"?.3:.18)+.08,a={x:s.x+(t.x-s.x)/r*o,z:s.z+(t.z-s.z)/r*o};return Ae(i,t,a,.62)?{gate:e,d:r}:null}).filter(Boolean).sort((e,n)=>e.d-n.d||e.gate.id.localeCompare(n.gate.id))[0]?.gate||null}function Ud(i,t,e){const n=ou(i,t);return!n||n.id!==e?!1:(n.open=!0,i.geometryRevision=(i.geometryRevision||0)+1,i.flockVisibility?.clear(),!0)}function Nd({document:i,getState:t,onOpen:e=()=>{}}){const n=i.createElement("button");n.id="open-gate",n.type="button",n.className="gate-action hidden",n.textContent="Open gate",n.setAttribute("aria-label","Open nearby gate"),i.getElementById("controls").appendChild(n);let s=null;const r=()=>{const{level:a,dog:c,playing:l}=t();return s=l?ou(a,c):null,n.classList.toggle("hidden",!s),n.disabled=!s,s},o=()=>{const{level:a,dog:c,playing:l}=t();return!l||!s||!Ud(a,c,s.id)?!1:(e(s),r(),!0)};return n.onclick=o,n.addEventListener("touchend",a=>{a.preventDefault(),a.stopPropagation(),o()},{passive:!1}),{button:n,update:r,activate:o}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pc="180",Fd=0,Sl=1,Od=2,au=1,cu=2,On=3,oi=0,qe=1,Te=2,ii=0,ls=1,bl=2,wl=3,El=4,Bd=5,yi=100,kd=101,Vd=102,Hd=103,Gd=104,Wd=200,Xd=201,qd=202,Yd=203,Ta=204,Aa=205,Zd=206,$d=207,Jd=208,Kd=209,jd=210,Qd=211,tf=212,ef=213,nf=214,Ra=0,Ca=1,Pa=2,ds=3,La=4,Da=5,Ia=6,za=7,lu=0,sf=1,rf=2,si=0,of=1,af=2,cf=3,hu=4,lf=5,hf=6,uf=7,uu=300,fs=301,ps=302,Ua=303,Na=304,xo=306,Hn=1e3,bi=1001,Fa=1002,tn=1003,df=1004,fr=1005,mn=1006,Lo=1007,wi=1008,Cn=1009,du=1010,fu=1011,Ys=1012,Lc=1013,Pi=1014,En=1015,or=1016,Dc=1017,Ic=1018,Zs=1020,pu=35902,mu=35899,gu=1021,xu=1022,gn=1023,$s=1026,Js=1027,zc=1028,Uc=1029,_u=1030,Nc=1031,Fc=1033,$r=33776,Jr=33777,Kr=33778,jr=33779,Oa=35840,Ba=35841,ka=35842,Va=35843,Ha=36196,Ga=37492,Wa=37496,Xa=37808,qa=37809,Ya=37810,Za=37811,$a=37812,Ja=37813,Ka=37814,ja=37815,Qa=37816,tc=37817,ec=37818,nc=37819,ic=37820,sc=37821,rc=36492,oc=36494,ac=36495,cc=36283,lc=36284,hc=36285,uc=36286,ff=3200,pf=3201,vu=0,mf=1,ti="",Le="srgb",ms="srgb-linear",no="linear",ae="srgb",Bi=7680,Tl=519,gf=512,xf=513,_f=514,Mu=515,vf=516,Mf=517,yf=518,Sf=519,dc=35044,io=35048,Al="300 es",Tn=2e3,so=2001;class vs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Do=Math.PI/180,fc=180/Math.PI;function kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[i&255]+ze[i>>8&255]+ze[i>>16&255]+ze[i>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function Gt(i,t,e){return Math.max(t,Math.min(e,i))}function bf(i,t){return(i%t+t)%t}function Io(i,t,e){return(1-e)*i+e*t}function wn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ce(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class St{constructor(t=0,e=0){St.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(h!==x||c!==f||l!==d||u!==g){let p=1-a;const m=c*f+l*d+u*g+h*x,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const A=Math.sqrt(v),T=Math.atan2(A,m*y);p=Math.sin(p*T)/A,a=Math.sin(a*T)/A}const _=a*y;if(c=c*p+f*_,l=l*p+d*_,u=u*p+g*_,h=h*p+x*_,p===1-a){const A=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=A,l*=A,u*=A,h*=A}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+u*h+c*d-l*f,t[e+1]=c*g+u*f+l*h-a*d,t[e+2]=l*g+u*d+a*f-c*h,t[e+3]=u*g-a*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),u=a(s/2),h=a(r/2),f=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Gt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+o*a+s*l-r*c,this._y=s*u+o*c+r*a-n*l,this._z=r*u+o*l+n*c-s*a,this._w=o*u-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Rl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Rl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),u=2*(a*e-r*s),h=2*(r*n-o*e);return this.x=e+c*l+o*h-a*u,this.y=n+c*u+a*l-r*h,this.z=s+c*h+r*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zo.copy(this).projectOnVector(t),this.sub(zo)}reflect(t){return this.sub(zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Gt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zo=new z,Rl=new Gn;class Xt{constructor(t,e,n,s,r,o,a,c,l){Xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],x=s[0],p=s[3],m=s[6],y=s[1],v=s[4],_=s[7],A=s[2],T=s[5],D=s[8];return r[0]=o*x+a*y+c*A,r[3]=o*p+a*v+c*T,r[6]=o*m+a*_+c*D,r[1]=l*x+u*y+h*A,r[4]=l*p+u*v+h*T,r[7]=l*m+u*_+h*D,r[2]=f*x+d*y+g*A,r[5]=f*p+d*v+g*T,r[8]=f*m+d*_+g*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return e*o*u-e*a*l-n*r*u+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*r,d=l*r-o*c,g=e*h+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=h*x,t[1]=(s*l-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(u*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Uo.makeScale(t,e)),this}rotate(t){return this.premultiply(Uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new Xt;function yu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wf(){const i=ro("canvas");return i.style.display="block",i}const Cl={};function Ks(i){i in Cl||(Cl[i]=!0,console.warn(i))}function Ef(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Pl=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ll=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Tf(){const i={enabled:!0,workingColorSpace:ms,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ae&&(s.r=Vn(s.r),s.g=Vn(s.g),s.b=Vn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ae&&(s.r=hs(s.r),s.g=hs(s.g),s.b=hs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ti?no:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ks("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ks("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ms]:{primaries:t,whitePoint:n,transfer:no,toXYZ:Pl,fromXYZ:Ll,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Le},outputColorSpaceConfig:{drawingBufferColorSpace:Le}},[Le]:{primaries:t,whitePoint:n,transfer:ae,toXYZ:Pl,fromXYZ:Ll,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Le}}}),i}const ee=Tf();function Vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ki;class Af{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ki===void 0&&(ki=ro("canvas")),ki.width=t.width,ki.height=t.height;const s=ki.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ki}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ro("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Vn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Rf=0;class Oc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Rf++}),this.uuid=kn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(No(s[o].image)):r.push(No(s[o]))}else r=No(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function No(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Af.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Cf=0;const Fo=new z;class Fe extends vs{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,n=bi,s=bi,r=mn,o=wi,a=gn,c=Cn,l=Fe.DEFAULT_ANISOTROPY,u=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Cf++}),this.uuid=kn(),this.name="",this.source=new Oc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fo).x}get height(){return this.source.getSize(Fo).y}get depth(){return this.source.getSize(Fo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==uu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Hn:t.x=t.x-Math.floor(t.x);break;case bi:t.x=t.x<0?0:1;break;case Fa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Hn:t.y=t.y-Math.floor(t.y);break;case bi:t.y=t.y<0?0:1;break;case Fa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=uu;Fe.DEFAULT_ANISOTROPY=1;class Se{constructor(t=0,e=0,n=0,s=1){Se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],x=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,_=(d+1)/2,A=(m+1)/2,T=(u+f)/4,D=(h+x)/4,N=(g+p)/4;return v>_&&v>A?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=D/n):_>A?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=N/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=D/r,s=N/r),this.set(n,s,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(h-x)/y,this.z=(f-u)/y,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Gt(this.x,t.x,e.x),this.y=Gt(this.y,t.y,e.y),this.z=Gt(this.z,t.z,e.z),this.w=Gt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Gt(this.x,t,e),this.y=Gt(this.y,t,e),this.z=Gt(this.z,t,e),this.w=Gt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Gt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pf extends vs{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Se(0,0,t,e),this.scissorTest=!1,this.viewport=new Se(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Fe(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Oc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Li extends Pf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Su extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lf extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ui{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),pr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),pr.copy(n.boundingBox)),pr.applyMatrix4(t.matrixWorld),this.union(pr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ws),mr.subVectors(this.max,ws),Vi.subVectors(t.a,ws),Hi.subVectors(t.b,ws),Gi.subVectors(t.c,ws),qn.subVectors(Hi,Vi),Yn.subVectors(Gi,Hi),fi.subVectors(Vi,Gi);let e=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-fi.z,fi.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,fi.z,0,-fi.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-fi.y,fi.x,0];return!Oo(e,Vi,Hi,Gi,mr)||(e=[1,0,0,0,1,0,0,0,1],!Oo(e,Vi,Hi,Gi,mr))?!1:(gr.crossVectors(qn,Yn),e=[gr.x,gr.y,gr.z],Oo(e,Vi,Hi,Gi,mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Dn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Dn=[new z,new z,new z,new z,new z,new z,new z,new z],cn=new z,pr=new Ui,Vi=new z,Hi=new z,Gi=new z,qn=new z,Yn=new z,fi=new z,ws=new z,mr=new z,gr=new z,pi=new z;function Oo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){pi.fromArray(i,r);const a=s.x*Math.abs(pi.x)+s.y*Math.abs(pi.y)+s.z*Math.abs(pi.z),c=t.dot(pi),l=e.dot(pi),u=n.dot(pi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Df=new Ui,Es=new z,Bo=new z;class hi{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Df.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Es.subVectors(t,this.center);const e=Es.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Es,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Bo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Es.copy(t.center).add(Bo)),this.expandByPoint(Es.copy(t.center).sub(Bo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const In=new z,ko=new z,xr=new z,Zn=new z,Vo=new z,_r=new z,Ho=new z;class bu{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ko.copy(t).add(e).multiplyScalar(.5),xr.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(ko);const r=t.distanceTo(e)*.5,o=-this.direction.dot(xr),a=Zn.dot(this.direction),c=-Zn.dot(xr),l=Zn.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const x=1/u;h*=x,f*=x,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-c),r),d=-h*h+f*(f+2*c)+l);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ko).addScaledVector(xr,f),d}intersectSphere(t,e){In.subVectors(t.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,s,r){Vo.subVectors(e,t),_r.subVectors(n,t),Ho.crossVectors(Vo,_r);let o=this.direction.dot(Ho),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zn.subVectors(this.origin,t);const c=a*this.direction.dot(_r.crossVectors(Zn,_r));if(c<0)return null;const l=a*this.direction.dot(Vo.cross(Zn));if(l<0||c+l>o)return null;const u=-a*Zn.dot(Ho);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,s,r,o,a,c,l,u,h,f,d,g,x,p){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,u,h,f,d,g,x,p)}set(t,e,n,s,r,o,a,c,l,u,h,f,d,g,x,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Wi.setFromMatrixColumn(t,0).length(),r=1/Wi.setFromMatrixColumn(t,1).length(),o=1/Wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,x=a*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=d+g*l,e[5]=f-x*l,e[9]=-a*c,e[2]=x-f*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,g=l*u,x=l*h;e[0]=f+x*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=x+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,g=l*u,x=l*h;e[0]=f-x*a,e[4]=-o*h,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=x-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,x=a*h;e[0]=c*u,e[4]=g*l-d,e[8]=f*l+x,e[1]=c*h,e[5]=x*l+f,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,x=a*l;e[0]=c*u,e[4]=x-f*h,e[8]=g*h+d,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-l*u,e[6]=d*h+g,e[10]=f-x*h}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,x=a*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+x,e[5]=o*u,e[9]=d*h-g,e[2]=g*h-d,e[6]=a*u,e[10]=x*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(If,t,zf)}lookAt(t,e,n){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),$n.crossVectors(n,$e),$n.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),$n.crossVectors(n,$e)),$n.normalize(),vr.crossVectors($e,$n),s[0]=$n.x,s[4]=vr.x,s[8]=$e.x,s[1]=$n.y,s[5]=vr.y,s[9]=$e.y,s[2]=$n.z,s[6]=vr.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],x=n[6],p=n[10],m=n[14],y=n[3],v=n[7],_=n[11],A=n[15],T=s[0],D=s[4],N=s[8],b=s[12],S=s[1],U=s[5],k=s[9],W=s[13],L=s[2],C=s[6],E=s[10],F=s[14],R=s[3],B=s[7],Y=s[11],Q=s[15];return r[0]=o*T+a*S+c*L+l*R,r[4]=o*D+a*U+c*C+l*B,r[8]=o*N+a*k+c*E+l*Y,r[12]=o*b+a*W+c*F+l*Q,r[1]=u*T+h*S+f*L+d*R,r[5]=u*D+h*U+f*C+d*B,r[9]=u*N+h*k+f*E+d*Y,r[13]=u*b+h*W+f*F+d*Q,r[2]=g*T+x*S+p*L+m*R,r[6]=g*D+x*U+p*C+m*B,r[10]=g*N+x*k+p*E+m*Y,r[14]=g*b+x*W+p*F+m*Q,r[3]=y*T+v*S+_*L+A*R,r[7]=y*D+v*U+_*C+A*B,r[11]=y*N+v*k+_*E+A*Y,r[15]=y*b+v*W+_*F+A*Q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],x=t[7],p=t[11],m=t[15];return g*(+r*c*h-s*l*h-r*a*f+n*l*f+s*a*d-n*c*d)+x*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*u-r*c*u)+p*(+e*l*h-e*a*d-r*o*h+n*o*d+r*a*u-n*l*u)+m*(-s*a*u-e*c*h+e*a*f+s*o*h-n*o*f+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],x=t[13],p=t[14],m=t[15],y=h*p*l-x*f*l+x*c*d-a*p*d-h*c*m+a*f*m,v=g*f*l-u*p*l-g*c*d+o*p*d+u*c*m-o*f*m,_=u*x*l-g*h*l+g*a*d-o*x*d-u*a*m+o*h*m,A=g*h*c-u*x*c-g*a*f+o*x*f+u*a*p-o*h*p,T=e*y+n*v+s*_+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/T;return t[0]=y*D,t[1]=(x*f*r-h*p*r-x*s*d+n*p*d+h*s*m-n*f*m)*D,t[2]=(a*p*r-x*c*r+x*s*l-n*p*l-a*s*m+n*c*m)*D,t[3]=(h*c*r-a*f*r-h*s*l+n*f*l+a*s*d-n*c*d)*D,t[4]=v*D,t[5]=(u*p*r-g*f*r+g*s*d-e*p*d-u*s*m+e*f*m)*D,t[6]=(g*c*r-o*p*r-g*s*l+e*p*l+o*s*m-e*c*m)*D,t[7]=(o*f*r-u*c*r+u*s*l-e*f*l-o*s*d+e*c*d)*D,t[8]=_*D,t[9]=(g*h*r-u*x*r-g*n*d+e*x*d+u*n*m-e*h*m)*D,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*m+e*a*m)*D,t[11]=(u*a*r-o*h*r-u*n*l+e*h*l+o*n*d-e*a*d)*D,t[12]=A*D,t[13]=(u*x*s-g*h*s+g*n*f-e*x*f-u*n*p+e*h*p)*D,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*p-e*a*p)*D,t[15]=(o*h*s-u*a*s+u*n*c-e*h*c-o*n*f+e*a*f)*D,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,u=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,u*a+n,u*c-s*o,0,l*c-s*a,u*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,u=o+o,h=a+a,f=r*l,d=r*u,g=r*h,x=o*u,p=o*h,m=a*h,y=c*l,v=c*u,_=c*h,A=n.x,T=n.y,D=n.z;return s[0]=(1-(x+m))*A,s[1]=(d+_)*A,s[2]=(g-v)*A,s[3]=0,s[4]=(d-_)*T,s[5]=(1-(f+m))*T,s[6]=(p+y)*T,s[7]=0,s[8]=(g+v)*D,s[9]=(p-y)*D,s[10]=(1-(f+x))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Wi.set(s[0],s[1],s[2]).length();const o=Wi.set(s[4],s[5],s[6]).length(),a=Wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ln.copy(this);const l=1/r,u=1/o,h=1/a;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=h,ln.elements[9]*=h,ln.elements[10]*=h,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Tn,c=!1){const l=this.elements,u=2*r/(e-t),h=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===Tn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===so)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Tn,c=!1){const l=this.elements,u=2/(e-t),h=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===Tn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===so)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Wi=new z,ln=new Qt,If=new z(0,0,0),zf=new z(1,1,1),$n=new z,vr=new z,$e=new z,Dl=new Qt,Il=new Gn;class Mn{constructor(t=0,e=0,n=0,s=Mn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],u=s[9],h=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Gt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Gt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Gt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Gt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Dl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Dl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Il.setFromEuler(this),this.setFromQuaternion(Il,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mn.DEFAULT_ORDER="XYZ";class wu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Uf=0;const zl=new z,Xi=new Gn,zn=new Qt,Mr=new z,Ts=new z,Nf=new z,Ff=new Gn,Ul=new z(1,0,0),Nl=new z(0,1,0),Fl=new z(0,0,1),Ol={type:"added"},Of={type:"removed"},qi={type:"childadded",child:null},Go={type:"childremoved",child:null};class _e extends vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uf++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new z,e=new Mn,n=new Gn,s=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Xt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(t,e){return Xi.setFromAxisAngle(t,e),this.quaternion.premultiply(Xi),this}rotateX(t){return this.rotateOnAxis(Ul,t)}rotateY(t){return this.rotateOnAxis(Nl,t)}rotateZ(t){return this.rotateOnAxis(Fl,t)}translateOnAxis(t,e){return zl.copy(t).applyQuaternion(this.quaternion),this.position.add(zl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ul,t)}translateY(t){return this.translateOnAxis(Nl,t)}translateZ(t){return this.translateOnAxis(Fl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Mr.copy(t):Mr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Ts,Mr,this.up):zn.lookAt(Mr,Ts,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(zn),this.quaternion.premultiply(Xi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ol),qi.child=t,this.dispatchEvent(qi),qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Of),Go.child=t,this.dispatchEvent(Go),Go.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),zn.multiply(t.parent.matrixWorld)),t.applyMatrix4(zn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ol),qi.child=t,this.dispatchEvent(qi),qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,t,Nf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,Ff,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}_e.DEFAULT_UP=new z(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new z,Un=new z,Wo=new z,Nn=new z,Yi=new z,Zi=new z,Bl=new z,Xo=new z,qo=new z,Yo=new z,Zo=new Se,$o=new Se,Jo=new Se;class Qe{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),hn.subVectors(t,e),s.cross(hn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){hn.subVectors(s,e),Un.subVectors(n,e),Wo.subVectors(t,e);const o=hn.dot(hn),a=hn.dot(Un),c=hn.dot(Wo),l=Un.dot(Un),u=Un.dot(Wo),h=o*l-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Nn.x),c.addScaledVector(o,Nn.y),c.addScaledVector(a,Nn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Zo.setScalar(0),$o.setScalar(0),Jo.setScalar(0),Zo.fromBufferAttribute(t,e),$o.fromBufferAttribute(t,n),Jo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Zo,r.x),o.addScaledVector($o,r.y),o.addScaledVector(Jo,r.z),o}static isFrontFacing(t,e,n,s){return hn.subVectors(n,e),Un.subVectors(t,e),hn.cross(Un).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),hn.cross(Un).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Qe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Yi.subVectors(s,n),Zi.subVectors(r,n),Xo.subVectors(t,n);const c=Yi.dot(Xo),l=Zi.dot(Xo);if(c<=0&&l<=0)return e.copy(n);qo.subVectors(t,s);const u=Yi.dot(qo),h=Zi.dot(qo);if(u>=0&&h<=u)return e.copy(s);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),e.copy(n).addScaledVector(Yi,o);Yo.subVectors(t,r);const d=Yi.dot(Yo),g=Zi.dot(Yo);if(g>=0&&d<=g)return e.copy(r);const x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Zi,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return Bl.subVectors(r,s),a=(h-u)/(h-u+(d-g)),e.copy(s).addScaledVector(Bl,a);const m=1/(p+x+f);return o=x*m,a=f*m,e.copy(n).addScaledVector(Yi,o).addScaledVector(Zi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},yr={h:0,s:0,l:0};function Ko(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Le){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=bf(t,1),e=Gt(e,0,1),n=Gt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ko(o,r,t+1/3),this.g=Ko(o,r,t),this.b=Ko(o,r,t-1/3)}return ee.colorSpaceToWorking(this,s),this}setStyle(t,e=Le){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Le){const n=Eu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=hs(t.r),this.g=hs(t.g),this.b=hs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Le){return ee.workingToColorSpace(Ue.copy(this),t),Math.round(Gt(Ue.r*255,0,255))*65536+Math.round(Gt(Ue.g*255,0,255))*256+Math.round(Gt(Ue.b*255,0,255))}getHexString(t=Le){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.workingToColorSpace(Ue.copy(this),e);const n=Ue.r,s=Ue.g,r=Ue.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=ee.workingColorSpace){return ee.workingToColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Le){ee.workingToColorSpace(Ue.copy(this),t);const e=Ue.r,n=Ue.g,s=Ue.b;return t!==Le?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(yr);const n=Io(Jn.h,yr.h,e),s=Io(Jn.s,yr.s,e),r=Io(Jn.l,yr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new kt;kt.NAMES=Eu;let Bf=0;class Ni extends vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=ls,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ta,this.blendDst=Aa,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bi,this.stencilZFail=Bi,this.stencilZPass=Bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(n.blending=this.blending),this.side!==oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ta&&(n.blendSrc=this.blendSrc),this.blendDst!==Aa&&(n.blendDst=this.blendDst),this.blendEquation!==yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class rn extends Ni{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.combine=lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ee=new z,Sr=new St;let kf=0;class Ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dc,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Sr.fromBufferAttribute(this,e),Sr.applyMatrix3(t),this.setXY(e,Sr.x,Sr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array),r=ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==dc&&(t.usage=this.usage),t}}class Tu extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Au extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Vf=0;const sn=new Qt,jo=new _e,$i=new z,Je=new Ui,As=new Ui,Pe=new z;class ve extends vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yu(t)?Au:Tu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return jo.lookAt(t),jo.updateMatrix(),this.applyMatrix4(jo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ui);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];As.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(Je.min,As.min),Je.expandByPoint(Pe),Pe.addVectors(Je.max,As.max),Je.expandByPoint(Pe)):(Je.expandByPoint(As.min),Je.expandByPoint(As.max))}Je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)Pe.fromBufferAttribute(a,l),c&&($i.fromBufferAttribute(t,l),Pe.add($i)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new z,c[N]=new z;const l=new z,u=new z,h=new z,f=new St,d=new St,g=new St,x=new z,p=new z;function m(N,b,S){l.fromBufferAttribute(n,N),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,S),f.fromBufferAttribute(r,N),d.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const U=1/(d.x*g.y-g.x*d.y);isFinite(U)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(U),p.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(U),a[N].add(x),a[b].add(x),a[S].add(x),c[N].add(p),c[b].add(p),c[S].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let N=0,b=y.length;N<b;++N){const S=y[N],U=S.start,k=S.count;for(let W=U,L=U+k;W<L;W+=3)m(t.getX(W+0),t.getX(W+1),t.getX(W+2))}const v=new z,_=new z,A=new z,T=new z;function D(N){A.fromBufferAttribute(s,N),T.copy(A);const b=a[N];v.copy(b),v.sub(A.multiplyScalar(A.dot(b))).normalize(),_.crossVectors(T,b);const U=_.dot(c[N])<0?-1:1;o.setXYZW(N,v.x,v.y,v.z,U)}for(let N=0,b=y.length;N<b;++N){const S=y[N],U=S.start,k=S.count;for(let W=U,L=U+k;W<L;W+=3)D(t.getX(W+0)),D(t.getX(W+1)),D(t.getX(W+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new z,r=new z,o=new z,a=new z,c=new z,l=new z,u=new z,h=new z;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),x=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,p),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,p),a.add(u),c.add(u),l.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let x=0,p=c.length;x<p;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*u;for(let m=0;m<u;m++)f[g++]=l[d++]}return new Ge(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ve,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const kl=new Qt,mi=new bu,br=new hi,Vl=new z,wr=new z,Er=new z,Tr=new z,Qo=new z,Ar=new z,Hl=new z,Rr=new z;class ie extends _e{constructor(t=new ve,e=new rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ar.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=a[c],h=r[c];u!==0&&(Qo.fromBufferAttribute(h,t),o?Ar.addScaledVector(Qo,u):Ar.addScaledVector(Qo.sub(e),u))}e.add(Ar)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(r),mi.copy(t.ray).recast(t.near),!(br.containsPoint(mi.origin)===!1&&(mi.intersectSphere(br,Vl)===null||mi.origin.distanceToSquared(Vl)>(t.far-t.near)**2))&&(kl.copy(r).invert(),mi.copy(t.ray).applyMatrix4(kl),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let _=y,A=v;_<A;_+=3){const T=a.getX(_),D=a.getX(_+1),N=a.getX(_+2);s=Cr(this,m,t,n,l,u,h,T,D,N),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let p=g,m=x;p<m;p+=3){const y=a.getX(p),v=a.getX(p+1),_=a.getX(p+2);s=Cr(this,o,t,n,l,u,h,y,v,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const p=f[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let _=y,A=v;_<A;_+=3){const T=_,D=_+1,N=_+2;s=Cr(this,m,t,n,l,u,h,T,D,N),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let p=g,m=x;p<m;p+=3){const y=p,v=p+1,_=p+2;s=Cr(this,o,t,n,l,u,h,y,v,_),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Hf(i,t,e,n,s,r,o,a){let c;if(t.side===qe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===oi,a),c===null)return null;Rr.copy(a),Rr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Rr);return l<e.near||l>e.far?null:{distance:l,point:Rr.clone(),object:i}}function Cr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,wr),i.getVertexPosition(c,Er),i.getVertexPosition(l,Tr);const u=Hf(i,t,e,n,wr,Er,Tr,Hl);if(u){const h=new z;Qe.getBarycoord(Hl,wr,Er,Tr,h),s&&(u.uv=Qe.getInterpolatedAttribute(s,a,c,l,h,new St)),r&&(u.uv1=Qe.getInterpolatedAttribute(r,a,c,l,h,new St)),o&&(u.normal=Qe.getInterpolatedAttribute(o,a,c,l,h,new z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new z,materialIndex:0};Qe.getNormal(wr,Er,Tr,f.normal),u.face=f,u.barycoord=h}return u}class xn extends ve{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(h,2));function g(x,p,m,y,v,_,A,T,D,N,b){const S=_/D,U=A/N,k=_/2,W=A/2,L=T/2,C=D+1,E=N+1;let F=0,R=0;const B=new z;for(let Y=0;Y<E;Y++){const Q=Y*U-W;for(let ft=0;ft<C;ft++){const Ct=ft*S-k;B[x]=Ct*y,B[p]=Q*v,B[m]=L,l.push(B.x,B.y,B.z),B[x]=0,B[p]=0,B[m]=T>0?1:-1,u.push(B.x,B.y,B.z),h.push(ft/D),h.push(1-Y/N),F+=1}}for(let Y=0;Y<N;Y++)for(let Q=0;Q<D;Q++){const ft=f+Q+C*Y,Ct=f+Q+C*(Y+1),et=f+(Q+1)+C*(Y+1),ht=f+(Q+1)+C*Y;c.push(ft,Ct,ht),c.push(Ct,et,ht),R+=6}a.addGroup(d,R,b),d+=R,f+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ve(i){const t={};for(let e=0;e<i.length;e++){const n=gs(i[e]);for(const s in n)t[s]=n[s]}return t}function Gf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ru(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Wf={clone:gs,merge:Ve};var Xf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ai extends Ni{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xf,this.fragmentShader=qf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gs(t.uniforms),this.uniformsGroups=Gf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Cu extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new z,Gl=new St,Wl=new St;class fn extends Cu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Do*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fc*2*Math.atan(Math.tan(Do*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Kn.x,Kn.y).multiplyScalar(-t/Kn.z)}getViewSize(t,e){return this.getViewBounds(t,Gl,Wl),e.subVectors(Wl,Gl)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Do*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ji=-90,Ki=1;class Yf extends _e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new fn(Ji,Ki,t,e);s.layers=this.layers,this.add(s);const r=new fn(Ji,Ki,t,e);r.layers=this.layers,this.add(r);const o=new fn(Ji,Ki,t,e);o.layers=this.layers,this.add(o);const a=new fn(Ji,Ki,t,e);a.layers=this.layers,this.add(a);const c=new fn(Ji,Ki,t,e);c.layers=this.layers,this.add(c);const l=new fn(Ji,Ki,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===so)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Pu extends Fe{constructor(t=[],e=fs,n,s,r,o,a,c,l,u){super(t,e,n,s,r,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Zf extends Li{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Pu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new xn(5,5,5),r=new ai({name:"CubemapFromEquirect",uniforms:gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:ii});r.uniforms.tEquirect.value=e;const o=new ie(s,r),a=e.minFilter;return e.minFilter===wi&&(e.minFilter=mn),new Yf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class se extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $f={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,n),m=this._getHandJoint(l,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($f)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Bc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new kt(t),this.near=e,this.far=n}clone(){return new Bc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Jf extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mn,this.environmentIntensity=1,this.environmentRotation=new Mn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Kf{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=dc,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ke=new z;class oo{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),s=ce(s,this.array),r=ce(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new oo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Lu extends Ni{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ji;const Rs=new z,Qi=new z,ts=new z,es=new St,Cs=new St,Du=new Qt,Pr=new z,Ps=new z,Lr=new z,Xl=new St,ea=new St,ql=new St;class jf extends _e{constructor(t=new Lu){if(super(),this.isSprite=!0,this.type="Sprite",ji===void 0){ji=new ve;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Kf(e,5);ji.setIndex([0,1,2,0,2,3]),ji.setAttribute("position",new oo(n,3,0,!1)),ji.setAttribute("uv",new oo(n,2,3,!1))}this.geometry=ji,this.material=t,this.center=new St(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Qi.setFromMatrixScale(this.matrixWorld),Du.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ts.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Qi.multiplyScalar(-ts.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Dr(Pr.set(-.5,-.5,0),ts,o,Qi,s,r),Dr(Ps.set(.5,-.5,0),ts,o,Qi,s,r),Dr(Lr.set(.5,.5,0),ts,o,Qi,s,r),Xl.set(0,0),ea.set(1,0),ql.set(1,1);let a=t.ray.intersectTriangle(Pr,Ps,Lr,!1,Rs);if(a===null&&(Dr(Ps.set(-.5,.5,0),ts,o,Qi,s,r),ea.set(0,1),a=t.ray.intersectTriangle(Pr,Lr,Ps,!1,Rs),a===null))return;const c=t.ray.origin.distanceTo(Rs);c<t.near||c>t.far||e.push({distance:c,point:Rs.clone(),uv:Qe.getInterpolation(Rs,Pr,Ps,Lr,Xl,ea,ql,new St),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Dr(i,t,e,n,s,r){es.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Cs.x=r*es.x-s*es.y,Cs.y=s*es.x+r*es.y):Cs.copy(es),i.copy(t),i.x+=Cs.x,i.y+=Cs.y,i.applyMatrix4(Du)}class Iu extends Fe{constructor(t=null,e=1,n=1,s,r,o,a,c,l=tn,u=tn,h,f){super(null,o,a,c,l,u,s,r,h,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yl extends Ge{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ns=new Qt,Zl=new Qt,Ir=[],$l=new Ui,Qf=new Qt,Ls=new ie,Ds=new hi;class Ei extends ie{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Yl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Qf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ui),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),$l.copy(t.boundingBox).applyMatrix4(ns),this.boundingBox.union($l)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),Ds.copy(t.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Ds)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ls.geometry=this.geometry,Ls.material=this.material,Ls.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ds.copy(this.boundingSphere),Ds.applyMatrix4(n),t.ray.intersectsSphere(Ds)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ns),Zl.multiplyMatrices(n,ns),Ls.matrixWorld=Zl,Ls.raycast(t,Ir);for(let o=0,a=Ir.length;o<a;o++){const c=Ir[o];c.instanceId=r,c.object=this,e.push(c)}Ir.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Yl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Iu(new Float32Array(s*this.count),s,this.count,zc,En));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const na=new z,tp=new z,ep=new Xt;class Qn{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=na.subVectors(n,e).cross(tp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(na),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ep.getNormalMatrix(t),s=this.coplanarPoint(na).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gi=new hi,np=new St(.5,.5),zr=new z;class _o{constructor(t=new Qn,e=new Qn,n=new Qn,s=new Qn,r=new Qn,o=new Qn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Tn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],u=r[4],h=r[5],f=r[6],d=r[7],g=r[8],x=r[9],p=r[10],m=r[11],y=r[12],v=r[13],_=r[14],A=r[15];if(s[0].setComponents(l-o,d-u,m-g,A-y).normalize(),s[1].setComponents(l+o,d+u,m+g,A+y).normalize(),s[2].setComponents(l+a,d+h,m+x,A+v).normalize(),s[3].setComponents(l-a,d-h,m-x,A-v).normalize(),n)s[4].setComponents(c,f,p,_).normalize(),s[5].setComponents(l-c,d-f,m-p,A-_).normalize();else if(s[4].setComponents(l-c,d-f,m-p,A-_).normalize(),e===Tn)s[5].setComponents(l+c,d+f,m+p,A+_).normalize();else if(e===so)s[5].setComponents(c,f,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){gi.center.set(0,0,0);const e=np.distanceTo(t.center);return gi.radius=.7071067811865476+e,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(zr.x=s.normal.x>0?t.max.x:t.min.x,zr.y=s.normal.y>0?t.max.y:t.min.y,zr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zu extends Ni{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ao=new z,co=new z,Jl=new Qt,Is=new bu,Ur=new hi,ia=new z,Kl=new z;class ip extends _e{constructor(t=new ve,e=new zu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ao.fromBufferAttribute(e,s-1),co.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ao.distanceTo(co);t.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ur.copy(n.boundingSphere),Ur.applyMatrix4(s),Ur.radius+=r,t.ray.intersectsSphere(Ur)===!1)return;Jl.copy(s).invert(),Is.copy(t.ray).applyMatrix4(Jl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=d,p=g-1;x<p;x+=l){const m=u.getX(x),y=u.getX(x+1),v=Nr(this,t,Is,c,m,y,x);v&&e.push(v)}if(this.isLineLoop){const x=u.getX(g-1),p=u.getX(d),m=Nr(this,t,Is,c,x,p,g-1);m&&e.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,p=g-1;x<p;x+=l){const m=Nr(this,t,Is,c,x,x+1,x);m&&e.push(m)}if(this.isLineLoop){const x=Nr(this,t,Is,c,g-1,d,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Nr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(ao.fromBufferAttribute(a,s),co.fromBufferAttribute(a,r),e.distanceSqToSegment(ao,co,ia,Kl)>n)return;ia.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ia);if(!(l<t.near||l>t.far))return{distance:l,point:Kl.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const jl=new z,Ql=new z;class sp extends ip{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)jl.fromBufferAttribute(e,s),Ql.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+jl.distanceTo(Ql);t.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ms extends Fe{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Uu extends Fe{constructor(t,e,n=Pi,s,r,o,a=tn,c=tn,l,u=$s,h=1){if(u!==$s&&u!==Js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,s,r,o,a,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Oc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Nu extends Fe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class kc extends ve{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new z,u=new St;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=e;h++,f+=3){const d=n+h/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=e;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(a,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ar extends ve{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],f=[],d=[];let g=0;const x=[],p=n/2;let m=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(u),this.setAttribute("position",new Zt(h,3)),this.setAttribute("normal",new Zt(f,3)),this.setAttribute("uv",new Zt(d,2));function y(){const _=new z,A=new z;let T=0;const D=(e-t)/n;for(let N=0;N<=r;N++){const b=[],S=N/r,U=S*(e-t)+t;for(let k=0;k<=s;k++){const W=k/s,L=W*c+a,C=Math.sin(L),E=Math.cos(L);A.x=U*C,A.y=-S*n+p,A.z=U*E,h.push(A.x,A.y,A.z),_.set(C,D,E).normalize(),f.push(_.x,_.y,_.z),d.push(W,1-S),b.push(g++)}x.push(b)}for(let N=0;N<s;N++)for(let b=0;b<r;b++){const S=x[b][N],U=x[b+1][N],k=x[b+1][N+1],W=x[b][N+1];(t>0||b!==0)&&(u.push(S,U,W),T+=3),(e>0||b!==r-1)&&(u.push(U,k,W),T+=3)}l.addGroup(m,T,0),m+=T}function v(_){const A=g,T=new St,D=new z;let N=0;const b=_===!0?t:e,S=_===!0?1:-1;for(let k=1;k<=s;k++)h.push(0,p*S,0),f.push(0,S,0),d.push(.5,.5),g++;const U=g;for(let k=0;k<=s;k++){const L=k/s*c+a,C=Math.cos(L),E=Math.sin(L);D.x=b*E,D.y=p*S,D.z=b*C,h.push(D.x,D.y,D.z),f.push(0,S,0),T.x=C*.5+.5,T.y=E*.5*S+.5,d.push(T.x,T.y),g++}for(let k=0;k<s;k++){const W=A+k,L=U+k;_===!0?u.push(L,L+1,W):u.push(L+1,L,W),N+=3}l.addGroup(m,N,_===!0?1:2),m+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ar(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class js extends ar{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new js(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Pn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const u=n[s],f=n[s+1]-u,d=(o-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new St:new z);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new z,s=[],r=[],o=[],a=new z,c=new Qt;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new z)}r[0]=new z,o[0]=new z;let l=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),h<=l&&(l=h,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Gt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Gt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Vc extends Pn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new St){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class rp extends Vc{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Hc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,u,h){let f=(o-r)/l-(a-r)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Fr=new z,sa=new Hc,ra=new Hc,oa=new Hc;class op extends Pn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new z){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,u;this.closed||a>0?l=s[(a-1)%r]:(Fr.subVectors(s[0],s[1]).add(s[0]),l=Fr);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(Fr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Fr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),x=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),sa.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,x,p),ra.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,x,p),oa.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,x,p)}else this.curveType==="catmullrom"&&(sa.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),ra.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),oa.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return n.set(sa.calc(c),ra.calc(c),oa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new z().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function th(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function ap(i,t){const e=1-i;return e*e*t}function cp(i,t){return 2*(1-i)*i*t}function lp(i,t){return i*i*t}function ks(i,t,e,n){return ap(i,t)+cp(i,e)+lp(i,n)}function hp(i,t){const e=1-i;return e*e*e*t}function up(i,t){const e=1-i;return 3*e*e*i*t}function dp(i,t){return 3*(1-i)*i*i*t}function fp(i,t){return i*i*i*t}function Vs(i,t,e,n,s){return hp(i,t)+up(i,e)+dp(i,n)+fp(i,s)}class Fu extends Pn{constructor(t=new St,e=new St,n=new St,s=new St){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new St){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Vs(t,s.x,r.x,o.x,a.x),Vs(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class pp extends Pn{constructor(t=new z,e=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new z){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Vs(t,s.x,r.x,o.x,a.x),Vs(t,s.y,r.y,o.y,a.y),Vs(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ou extends Pn{constructor(t=new St,e=new St){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new St){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new St){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mp extends Pn{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bu extends Pn{constructor(t=new St,e=new St,n=new St){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new St){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gp extends Pn{constructor(t=new z,e=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new z){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y),ks(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ku extends Pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new St){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return n.set(th(a,c.x,l.x,u.x,h.x),th(a,c.y,l.y,u.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new St().fromArray(s))}return this}}var eh=Object.freeze({__proto__:null,ArcCurve:rp,CatmullRomCurve3:op,CubicBezierCurve:Fu,CubicBezierCurve3:pp,EllipseCurve:Vc,LineCurve:Ou,LineCurve3:mp,QuadraticBezierCurve:Bu,QuadraticBezierCurve3:gp,SplineCurve:ku});class xp extends Pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new eh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new eh[s.type]().fromJSON(s))}return this}}class nh extends xp{constructor(t){super(),this.type="Path",this.currentPoint=new St,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ou(this.currentPoint.clone(),new St(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Bu(this.currentPoint.clone(),new St(t,e),new St(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new Fu(this.currentPoint.clone(),new St(t,e),new St(n,s),new St(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new ku(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Vc(t,e,n,s,r,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Vu extends nh{constructor(t){super(t),this.uuid=kn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new nh().fromJSON(s))}return this}}function _p(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=Hu(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=bp(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let u=-1/0,h=-1/0;for(let f=e;f<s;f+=e){const d=i[f],g=i[f+1];d<a&&(a=d),g<c&&(c=g),d>u&&(u=d),g>h&&(h=g)}l=Math.max(u-a,h-c),l=l!==0?32767/l:0}return Qs(r,o,e,a,c,l,0),o}function Hu(i,t,e,n,s){let r;if(s===zp(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=ih(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=ih(o/n|0,i[o],i[o+1],r);return r&&xs(r,r.next)&&(er(r),r=r.next),r}function Di(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(xs(e,e.next)||xe(e.prev,e,e.next)===0)){if(er(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Qs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Rp(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?Mp(i,n,s,r):vp(i)){t.push(c.i,i.i,l.i),er(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=yp(Di(i),t),Qs(i,t,e,n,s,r,2)):o===2&&Sp(i,t,e,n,s,r):Qs(Di(i),t,e,n,s,r,1);break}}}function vp(i){const t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,u=Math.min(s,r,o),h=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l);let g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&Ns(s,a,r,c,o,l,g.x,g.y)&&xe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Mp(i,t,e,n){const s=i.prev,r=i,o=i.next;if(xe(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,u=s.y,h=r.y,f=o.y,d=Math.min(a,c,l),g=Math.min(u,h,f),x=Math.max(a,c,l),p=Math.max(u,h,f),m=pc(d,g,t,e,n),y=pc(x,p,t,e,n);let v=i.prevZ,_=i.nextZ;for(;v&&v.z>=m&&_&&_.z<=y;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&Ns(a,u,c,h,l,f,v.x,v.y)&&xe(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=d&&_.x<=x&&_.y>=g&&_.y<=p&&_!==s&&_!==o&&Ns(a,u,c,h,l,f,_.x,_.y)&&xe(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=m;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&Ns(a,u,c,h,l,f,v.x,v.y)&&xe(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=y;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=p&&_!==s&&_!==o&&Ns(a,u,c,h,l,f,_.x,_.y)&&xe(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function yp(i,t){let e=i;do{const n=e.prev,s=e.next.next;!xs(n,s)&&Wu(n,e,e.next,s)&&tr(n,s)&&tr(s,n)&&(t.push(n.i,e.i,s.i),er(e),er(e.next),e=i=s),e=e.next}while(e!==i);return Di(e)}function Sp(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Lp(o,a)){let c=Xu(o,a);o=Di(o,o.next),c=Di(c,c.next),Qs(o,t,e,n,s,r,0),Qs(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function bp(i,t,e,n){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=Hu(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Pp(l))}s.sort(wp);for(let r=0;r<s.length;r++)e=Ep(s[r],e);return e}function wp(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Ep(i,t){const e=Tp(i,t);if(!e)return t;const n=Xu(e,i);return Di(n,n.next),Di(e,e.next)}function Tp(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,o;if(xs(i,e))return e;do{if(xs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=n&&h>r&&(r=h,o=e.x<e.next.x?e:e.next,h===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let u=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&Gu(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){const h=Math.abs(s-e.y)/(n-e.x);tr(e,i)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&Ap(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function Ap(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function Rp(i,t,e,n){let s=i;do s.z===0&&(s.z=pc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Cp(s)}function Cp(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function pc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Pp(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Gu(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Ns(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&Gu(i,t,e,n,s,r,o,a)}function Lp(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Dp(i,t)&&(tr(i,t)&&tr(t,i)&&Ip(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||xs(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function xs(i,t){return i.x===t.x&&i.y===t.y}function Wu(i,t,e,n){const s=Br(xe(i,t,e)),r=Br(xe(i,t,n)),o=Br(xe(e,n,i)),a=Br(xe(e,n,t));return!!(s!==r&&o!==a||s===0&&Or(i,e,t)||r===0&&Or(i,n,t)||o===0&&Or(e,i,n)||a===0&&Or(e,t,n))}function Or(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Br(i){return i>0?1:i<0?-1:0}function Dp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Wu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function tr(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function Ip(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Xu(i,t){const e=mc(i.i,i.x,i.y),n=mc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function ih(i,t,e,n){const s=mc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function er(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function mc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zp(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class Up{static triangulate(t,e,n=2){return _p(t,e,n)}}class Hs{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Hs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];sh(t),rh(n,t);let o=t.length;e.forEach(sh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,rh(n,e[c]);const a=Up.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function sh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function rh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class cr extends ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,u=c+1,h=t/a,f=e/c,d=[],g=[],x=[],p=[];for(let m=0;m<u;m++){const y=m*f-o;for(let v=0;v<l;v++){const _=v*h-r;g.push(_,-y,0),x.push(0,0,1),p.push(v/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<a;y++){const v=y+l*m,_=y+l*(m+1),A=y+1+l*(m+1),T=y+1+l*m;d.push(v,_,T),d.push(_,A,T)}this.setIndex(d),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cr(t.width,t.height,t.widthSegments,t.heightSegments)}}class Gc extends ve{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],u=[];let h=t;const f=(e-t)/s,d=new z,g=new St;for(let x=0;x<=s;x++){for(let p=0;p<=n;p++){const m=r+p/n*o;d.x=h*Math.cos(m),d.y=h*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,u.push(g.x,g.y)}h+=f}for(let x=0;x<s;x++){const p=x*(n+1);for(let m=0;m<n;m++){const y=m+p,v=y,_=y+n+1,A=y+n+2,T=y+1;a.push(v,_,T),a.push(_,A,T)}}this.setIndex(a),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Wc extends ve{constructor(t=new Vu([new St(0,.5),new St(-.5,-.5),new St(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Zt(s,3)),this.setAttribute("normal",new Zt(r,3)),this.setAttribute("uv",new Zt(o,2));function l(u){const h=s.length/3,f=u.extractPoints(e);let d=f.shape;const g=f.holes;Hs.isClockWise(d)===!1&&(d=d.reverse());for(let p=0,m=g.length;p<m;p++){const y=g[p];Hs.isClockWise(y)===!0&&(g[p]=y.reverse())}const x=Hs.triangulateShape(d,g);for(let p=0,m=g.length;p<m;p++){const y=g[p];d=d.concat(y)}for(let p=0,m=d.length;p<m;p++){const y=d[p];s.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let p=0,m=x.length;p<m;p++){const y=x[p],v=y[0]+h,_=y[1]+h,A=y[2]+h;n.push(v,_,A),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Np(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new Wc(n,t.curveSegments)}}function Np(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Ii extends ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const u=[],h=new z,f=new z,d=[],g=[],x=[],p=[];for(let m=0;m<=n;m++){const y=[],v=m/n;let _=0;m===0&&o===0?_=.5/e:m===n&&c===Math.PI&&(_=-.5/e);for(let A=0;A<=e;A++){const T=A/e;h.x=-t*Math.cos(s+T*r)*Math.sin(o+v*a),h.y=t*Math.cos(o+v*a),h.z=t*Math.sin(s+T*r)*Math.sin(o+v*a),g.push(h.x,h.y,h.z),f.copy(h).normalize(),x.push(f.x,f.y,f.z),p.push(T+_,1-v),y.push(l++)}u.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const v=u[m][y+1],_=u[m][y],A=u[m+1][y],T=u[m+1][y+1];(m!==0||o>0)&&d.push(v,_,T),(m!==n-1||c<Math.PI)&&d.push(_,A,T)}this.setIndex(d),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(x,3)),this.setAttribute("uv",new Zt(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ii(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class vo extends ve{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],u=new z,h=new z,f=new z;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const x=g/s*r,p=d/n*Math.PI*2;h.x=(t+e*Math.cos(p))*Math.cos(x),h.y=(t+e*Math.cos(p))*Math.sin(x),h.z=e*Math.sin(p),a.push(h.x,h.y,h.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),f.subVectors(h,u).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const x=(s+1)*d+g-1,p=(s+1)*(d-1)+g-1,m=(s+1)*(d-1)+g,y=(s+1)*d+g;o.push(x,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ge extends Ni{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vu,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fp extends Ni{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ff,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Op extends Ni{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class qu extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Bp extends qu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const aa=new Qt,oh=new z,ah=new z;class kp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _o,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new Se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;oh.setFromMatrixPosition(t.matrixWorld),e.position.copy(oh),ah.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ah),e.updateMatrixWorld(),aa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(aa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(aa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Mo extends Cu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Vp extends kp{constructor(){super(new Mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hp extends qu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new Vp}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Gp extends fn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const ch=new z,kr=new z,is=new z,ss=new z,ca=new z,Wp=new z,Xp=new z;class qp{constructor(t=new z,e=new z){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){ch.subVectors(t,this.start),kr.subVectors(this.end,this.start);const n=kr.dot(kr);let r=kr.dot(ch)/n;return e&&(r=Gt(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=Wp,n=Xp){const s=10000000000000001e-32;let r,o;const a=this.start,c=t.start,l=this.end,u=t.end;is.subVectors(l,a),ss.subVectors(u,c),ca.subVectors(a,c);const h=is.dot(is),f=ss.dot(ss),d=ss.dot(ca);if(h<=s&&f<=s)return e.copy(a),n.copy(c),e.sub(n),e.dot(e);if(h<=s)r=0,o=d/f,o=Gt(o,0,1);else{const g=is.dot(ca);if(f<=s)o=0,r=Gt(-g/h,0,1);else{const x=is.dot(ss),p=h*f-x*x;p!==0?r=Gt((x*d-g*f)/p,0,1):r=0,o=(x*r+d)/f,o<0?(o=0,r=Gt(-g/h,0,1)):o>1&&(o=1,r=Gt((x-g)/h,0,1))}}return e.copy(a).add(is.multiplyScalar(r)),n.copy(c).add(ss.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function lh(i,t,e,n){const s=Yp(n);switch(e){case gu:return i*t;case zc:return i*t/s.components*s.byteLength;case Uc:return i*t/s.components*s.byteLength;case _u:return i*t*2/s.components*s.byteLength;case Nc:return i*t*2/s.components*s.byteLength;case xu:return i*t*3/s.components*s.byteLength;case gn:return i*t*4/s.components*s.byteLength;case Fc:return i*t*4/s.components*s.byteLength;case $r:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Kr:case jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ba:case Va:return Math.max(i,16)*Math.max(t,8)/4;case Oa:case ka:return Math.max(i,8)*Math.max(t,8)/2;case Ha:case Ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case qa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case $a:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ja:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case tc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ec:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case nc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ic:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case sc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case rc:case oc:case ac:return Math.ceil(i/4)*Math.ceil(t/4)*16;case cc:case lc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case hc:case uc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Yp(i){switch(i){case Cn:case du:return{byteLength:1,components:1};case Ys:case fu:case or:return{byteLength:2,components:1};case Dc:case Ic:return{byteLength:2,components:4};case Pi:case Lc:case En:return{byteLength:4,components:1};case pu:case mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Zp(i){const t=new WeakMap;function e(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,c,l){const u=c.array,h=c.updateRanges;if(i.bindBuffer(l,a),h.length===0)i.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],x=h[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,h[f]=x)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const x=h[d];i.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var $p=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jp=`#ifdef USE_ALPHAHASH
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
#endif`,Kp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,tm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,em=`#ifdef USE_AOMAP
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
#endif`,nm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,im=`#ifdef USE_BATCHING
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
#endif`,sm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,am=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cm=`#ifdef USE_IRIDESCENCE
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
#endif`,lm=`#ifdef USE_BUMPMAP
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
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,_m=`#define PI 3.141592653589793
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
} // validated`,vm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mm=`vec3 transformedNormal = objectNormal;
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
#endif`,ym=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Em="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Am=`#ifdef USE_ENVMAP
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
#endif`,Rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Pm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lm=`#ifdef USE_ENVMAP
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
#endif`,Dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Im=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Um=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nm=`#ifdef USE_GRADIENTMAP
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
}`,Fm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,km=`uniform bool receiveShadow;
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
#endif`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Hm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qm=`PhysicalMaterial material;
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
#endif`,Ym=`struct PhysicalMaterial {
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
}`,Zm=`
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
#endif`,$m=`#if defined( RE_IndirectDiffuse )
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
#endif`,Jm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Km=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ng=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ig=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sg=`#if defined( USE_POINTS_UV )
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
#endif`,rg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ag=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hg=`#ifdef USE_MORPHTARGETS
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
#endif`,ug=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xg=`#ifdef USE_NORMALMAP
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
#endif`,_g=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ag=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ig=`float getShadowMask() {
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
}`,zg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ug=`#ifdef USE_SKINNING
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
#endif`,Ng=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fg=`#ifdef USE_SKINNING
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
#endif`,Og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hg=`#ifdef USE_TRANSMISSION
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
#endif`,Gg=`#ifdef USE_TRANSMISSION
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
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$g=`uniform sampler2D t2D;
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
}`,Jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,jg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`#include <common>
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
}`,e0=`#if DEPTH_PACKING == 3200
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
}`,n0=`#define DISTANCE
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
}`,i0=`#define DISTANCE
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
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,r0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`uniform float scale;
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
}`,a0=`uniform vec3 diffuse;
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
}`,c0=`#include <common>
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
}`,l0=`uniform vec3 diffuse;
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
}`,h0=`#define LAMBERT
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
}`,u0=`#define LAMBERT
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
}`,d0=`#define MATCAP
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
}`,f0=`#define MATCAP
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
}`,p0=`#define NORMAL
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
}`,m0=`#define NORMAL
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
}`,g0=`#define PHONG
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
}`,x0=`#define PHONG
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
}`,_0=`#define STANDARD
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
}`,v0=`#define STANDARD
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
}`,M0=`#define TOON
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
}`,y0=`#define TOON
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
}`,S0=`uniform float size;
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
}`,b0=`uniform vec3 diffuse;
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
}`,w0=`#include <common>
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
}`,E0=`uniform vec3 color;
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
}`,T0=`uniform float rotation;
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
}`,A0=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:$p,alphahash_pars_fragment:Jp,alphamap_fragment:Kp,alphamap_pars_fragment:jp,alphatest_fragment:Qp,alphatest_pars_fragment:tm,aomap_fragment:em,aomap_pars_fragment:nm,batching_pars_vertex:im,batching_vertex:sm,begin_vertex:rm,beginnormal_vertex:om,bsdfs:am,iridescence_fragment:cm,bumpmap_pars_fragment:lm,clipping_planes_fragment:hm,clipping_planes_pars_fragment:um,clipping_planes_pars_vertex:dm,clipping_planes_vertex:fm,color_fragment:pm,color_pars_fragment:mm,color_pars_vertex:gm,color_vertex:xm,common:_m,cube_uv_reflection_fragment:vm,defaultnormal_vertex:Mm,displacementmap_pars_vertex:ym,displacementmap_vertex:Sm,emissivemap_fragment:bm,emissivemap_pars_fragment:wm,colorspace_fragment:Em,colorspace_pars_fragment:Tm,envmap_fragment:Am,envmap_common_pars_fragment:Rm,envmap_pars_fragment:Cm,envmap_pars_vertex:Pm,envmap_physical_pars_fragment:Vm,envmap_vertex:Lm,fog_vertex:Dm,fog_pars_vertex:Im,fog_fragment:zm,fog_pars_fragment:Um,gradientmap_pars_fragment:Nm,lightmap_pars_fragment:Fm,lights_lambert_fragment:Om,lights_lambert_pars_fragment:Bm,lights_pars_begin:km,lights_toon_fragment:Hm,lights_toon_pars_fragment:Gm,lights_phong_fragment:Wm,lights_phong_pars_fragment:Xm,lights_physical_fragment:qm,lights_physical_pars_fragment:Ym,lights_fragment_begin:Zm,lights_fragment_maps:$m,lights_fragment_end:Jm,logdepthbuf_fragment:Km,logdepthbuf_pars_fragment:jm,logdepthbuf_pars_vertex:Qm,logdepthbuf_vertex:tg,map_fragment:eg,map_pars_fragment:ng,map_particle_fragment:ig,map_particle_pars_fragment:sg,metalnessmap_fragment:rg,metalnessmap_pars_fragment:og,morphinstance_vertex:ag,morphcolor_vertex:cg,morphnormal_vertex:lg,morphtarget_pars_vertex:hg,morphtarget_vertex:ug,normal_fragment_begin:dg,normal_fragment_maps:fg,normal_pars_fragment:pg,normal_pars_vertex:mg,normal_vertex:gg,normalmap_pars_fragment:xg,clearcoat_normal_fragment_begin:_g,clearcoat_normal_fragment_maps:vg,clearcoat_pars_fragment:Mg,iridescence_pars_fragment:yg,opaque_fragment:Sg,packing:bg,premultiplied_alpha_fragment:wg,project_vertex:Eg,dithering_fragment:Tg,dithering_pars_fragment:Ag,roughnessmap_fragment:Rg,roughnessmap_pars_fragment:Cg,shadowmap_pars_fragment:Pg,shadowmap_pars_vertex:Lg,shadowmap_vertex:Dg,shadowmask_pars_fragment:Ig,skinbase_vertex:zg,skinning_pars_vertex:Ug,skinning_vertex:Ng,skinnormal_vertex:Fg,specularmap_fragment:Og,specularmap_pars_fragment:Bg,tonemapping_fragment:kg,tonemapping_pars_fragment:Vg,transmission_fragment:Hg,transmission_pars_fragment:Gg,uv_pars_fragment:Wg,uv_pars_vertex:Xg,uv_vertex:qg,worldpos_vertex:Yg,background_vert:Zg,background_frag:$g,backgroundCube_vert:Jg,backgroundCube_frag:Kg,cube_vert:jg,cube_frag:Qg,depth_vert:t0,depth_frag:e0,distanceRGBA_vert:n0,distanceRGBA_frag:i0,equirect_vert:s0,equirect_frag:r0,linedashed_vert:o0,linedashed_frag:a0,meshbasic_vert:c0,meshbasic_frag:l0,meshlambert_vert:h0,meshlambert_frag:u0,meshmatcap_vert:d0,meshmatcap_frag:f0,meshnormal_vert:p0,meshnormal_frag:m0,meshphong_vert:g0,meshphong_frag:x0,meshphysical_vert:_0,meshphysical_frag:v0,meshtoon_vert:M0,meshtoon_frag:y0,points_vert:S0,points_frag:b0,shadow_vert:w0,shadow_frag:E0,sprite_vert:T0,sprite_frag:A0},pt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},bn={basic:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Ve([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Ve([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Ve([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Ve([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Ve([pt.points,pt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Ve([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Ve([pt.common,pt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Ve([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Ve([pt.sprite,pt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Ve([pt.common,pt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Ve([pt.lights,pt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};bn.physical={uniforms:Ve([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const Vr={r:0,b:0,g:0},xi=new Mn,R0=new Qt;function C0(i,t,e,n,s,r,o){const a=new kt(0);let c=r===!0?0:1,l,u,h=null,f=0,d=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?e:t).get(_)),_}function x(v){let _=!1;const A=g(v);A===null?m(a,c):A&&A.isColor&&(m(A,1),_=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(v,_){const A=g(_);A&&(A.isCubeTexture||A.mapping===xo)?(u===void 0&&(u=new ie(new xn(1,1,1),new ai({name:"BackgroundCubeMaterial",uniforms:gs(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,D,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),xi.copy(_.backgroundRotation),xi.x*=-1,xi.y*=-1,xi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(R0.makeRotationFromEuler(xi)),u.material.toneMapped=ee.getTransfer(A.colorSpace)!==ae,(h!==A||f!==A.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,h=A,f=A.version,d=i.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new ie(new cr(2,2),new ai({name:"BackgroundMaterial",uniforms:gs(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=ee.getTransfer(A.colorSpace)!==ae,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||f!==A.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=A,f=A.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,_){v.getRGB(Vr,Ru(i)),n.buffers.color.setClear(Vr.r,Vr.g,Vr.b,_,o)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),c=_,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,m(a,c)},render:x,addToRenderList:p,dispose:y}}function P0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,U,k,W,L){let C=!1;const E=h(W,k,U);r!==E&&(r=E,l(r.object)),C=d(S,W,k,L),C&&g(S,W,k,L),L!==null&&t.update(L,i.ELEMENT_ARRAY_BUFFER),(C||o)&&(o=!1,_(S,U,k,W),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(L).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function h(S,U,k){const W=k.wireframe===!0;let L=n[S.id];L===void 0&&(L={},n[S.id]=L);let C=L[U.id];C===void 0&&(C={},L[U.id]=C);let E=C[W];return E===void 0&&(E=f(c()),C[W]=E),E}function f(S){const U=[],k=[],W=[];for(let L=0;L<e;L++)U[L]=0,k[L]=0,W[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:W,object:S,attributes:{},index:null}}function d(S,U,k,W){const L=r.attributes,C=U.attributes;let E=0;const F=k.getAttributes();for(const R in F)if(F[R].location>=0){const Y=L[R];let Q=C[R];if(Q===void 0&&(R==="instanceMatrix"&&S.instanceMatrix&&(Q=S.instanceMatrix),R==="instanceColor"&&S.instanceColor&&(Q=S.instanceColor)),Y===void 0||Y.attribute!==Q||Q&&Y.data!==Q.data)return!0;E++}return r.attributesNum!==E||r.index!==W}function g(S,U,k,W){const L={},C=U.attributes;let E=0;const F=k.getAttributes();for(const R in F)if(F[R].location>=0){let Y=C[R];Y===void 0&&(R==="instanceMatrix"&&S.instanceMatrix&&(Y=S.instanceMatrix),R==="instanceColor"&&S.instanceColor&&(Y=S.instanceColor));const Q={};Q.attribute=Y,Y&&Y.data&&(Q.data=Y.data),L[R]=Q,E++}r.attributes=L,r.attributesNum=E,r.index=W}function x(){const S=r.newAttributes;for(let U=0,k=S.length;U<k;U++)S[U]=0}function p(S){m(S,0)}function m(S,U){const k=r.newAttributes,W=r.enabledAttributes,L=r.attributeDivisors;k[S]=1,W[S]===0&&(i.enableVertexAttribArray(S),W[S]=1),L[S]!==U&&(i.vertexAttribDivisor(S,U),L[S]=U)}function y(){const S=r.newAttributes,U=r.enabledAttributes;for(let k=0,W=U.length;k<W;k++)U[k]!==S[k]&&(i.disableVertexAttribArray(k),U[k]=0)}function v(S,U,k,W,L,C,E){E===!0?i.vertexAttribIPointer(S,U,k,L,C):i.vertexAttribPointer(S,U,k,W,L,C)}function _(S,U,k,W){x();const L=W.attributes,C=k.getAttributes(),E=U.defaultAttributeValues;for(const F in C){const R=C[F];if(R.location>=0){let B=L[F];if(B===void 0&&(F==="instanceMatrix"&&S.instanceMatrix&&(B=S.instanceMatrix),F==="instanceColor"&&S.instanceColor&&(B=S.instanceColor)),B!==void 0){const Y=B.normalized,Q=B.itemSize,ft=t.get(B);if(ft===void 0)continue;const Ct=ft.buffer,et=ft.type,ht=ft.bytesPerElement,X=et===i.INT||et===i.UNSIGNED_INT||B.gpuType===Lc;if(B.isInterleavedBufferAttribute){const K=B.data,nt=K.stride,st=B.offset;if(K.isInstancedInterleavedBuffer){for(let ct=0;ct<R.locationSize;ct++)m(R.location+ct,K.meshPerAttribute);S.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ct=0;ct<R.locationSize;ct++)p(R.location+ct);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let ct=0;ct<R.locationSize;ct++)v(R.location+ct,Q/R.locationSize,et,Y,nt*ht,(st+Q/R.locationSize*ct)*ht,X)}else{if(B.isInstancedBufferAttribute){for(let K=0;K<R.locationSize;K++)m(R.location+K,B.meshPerAttribute);S.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let K=0;K<R.locationSize;K++)p(R.location+K);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let K=0;K<R.locationSize;K++)v(R.location+K,Q/R.locationSize,et,Y,Q*ht,Q/R.locationSize*K*ht,X)}}else if(E!==void 0){const Y=E[F];if(Y!==void 0)switch(Y.length){case 2:i.vertexAttrib2fv(R.location,Y);break;case 3:i.vertexAttrib3fv(R.location,Y);break;case 4:i.vertexAttrib4fv(R.location,Y);break;default:i.vertexAttrib1fv(R.location,Y)}}}}y()}function A(){N();for(const S in n){const U=n[S];for(const k in U){const W=U[k];for(const L in W)u(W[L].object),delete W[L];delete U[k]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const U=n[S.id];for(const k in U){const W=U[k];for(const L in W)u(W[L].object),delete W[L];delete U[k]}delete n[S.id]}function D(S){for(const U in n){const k=n[U];if(k[S.id]===void 0)continue;const W=k[S.id];for(const L in W)u(W[L].object),delete W[L];delete k[S.id]}}function N(){b(),o=!0,r!==s&&(r=s,l(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:b,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:p,disableUnusedAttributes:y}}function L0(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function o(l,u,h){h!==0&&(i.drawArraysInstanced(n,l,u,h),e.update(u,n,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];e.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*f[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function D0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==gn&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const N=D===or&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==Cn&&n.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==En&&!N)}function c(D){if(D==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:A,maxSamples:T}}function I0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Qn,a=new Xt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||s;return s=f,n=h.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,m=i.get(h);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{const y=r?0:n,v=y*4;let _=m.clippingState||null;c.value=_,_=u(g,f,v,d);for(let A=0;A!==v;++A)_[A]=e[A];m.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,d,g){const x=h!==null?h.length:0;let p=null;if(x!==0){if(p=c.value,g!==!0||p===null){const m=d+x*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,_=d;v!==x;++v,_+=4)o.copy(h[v]).applyMatrix4(y,a),o.normal.toArray(p,_),p[_+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function z0(i){let t=new WeakMap;function e(o,a){return a===Ua?o.mapping=fs:a===Na&&(o.mapping=ps),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ua||a===Na)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Zf(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const as=4,hh=[.125,.215,.35,.446,.526,.582],Si=20,la=new Mo,uh=new kt;let ha=null,ua=0,da=0,fa=!1;const vi=(1+Math.sqrt(5))/2,rs=1/vi,dh=[new z(-vi,rs,0),new z(vi,rs,0),new z(-rs,0,vi),new z(rs,0,vi),new z(0,vi,-rs),new z(0,vi,rs),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],U0=new z;class fh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=U0}=r;ha=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ha,ua,da),this._renderer.xr.enabled=fa,t.scissorTest=!1,Hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fs||t.mapping===ps?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ha=this._renderer.getRenderTarget(),ua=this._renderer.getActiveCubeFace(),da=this._renderer.getActiveMipmapLevel(),fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:or,format:gn,colorSpace:ms,depthBuffer:!1},s=ph(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ph(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=N0(r)),this._blurMaterial=F0(r,t,e)}return s}_compileMaterial(t){const e=new ie(this._lodPlanes[0],t);this._renderer.compile(e,la)}_sceneToCubeUV(t,e,n,s,r){const c=new fn(90,1,e,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(uh),h.toneMapping=si,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const x=new rn({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),p=new ie(new xn,x);let m=!1;const y=t.background;y?y.isColor&&(x.color.copy(y),t.background=null,m=!0):(x.color.copy(uh),m=!0);for(let v=0;v<6;v++){const _=v%3;_===0?(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[v],r.y,r.z)):_===1?(c.up.set(0,0,l[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[v],r.z)):(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[v]));const A=this._cubeSize;Hr(s,_*A,v>2?A:0,A,A),h.setRenderTarget(s),m&&h.render(p,c),h.render(t,c)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=f,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===fs||t.mapping===ps;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Hr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,la)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=dh[(s-r-1)%dh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ie(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Si-1),x=r/g,p=isFinite(r)?1+Math.floor(u*x):Si;p>Si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Si}`);const m=[];let y=0;for(let D=0;D<Si;++D){const N=D/x,b=Math.exp(-N*N/2);m.push(b),D===0?y+=b:D<p&&(y+=2*b)}for(let D=0;D<m.length;D++)m[D]=m[D]/y;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const _=this._sizeLods[s],A=3*_*(s>v-as?s-v+as:0),T=4*(this._cubeSize-_);Hr(e,A,T,3*_,2*_),c.setRenderTarget(e),c.render(h,la)}}function N0(i){const t=[],e=[],n=[];let s=i;const r=i-as+1+hh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-as?c=hh[o-i+as-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,x=3,p=2,m=1,y=new Float32Array(x*g*d),v=new Float32Array(p*g*d),_=new Float32Array(m*g*d);for(let T=0;T<d;T++){const D=T%3*2/3-1,N=T>2?0:-1,b=[D,N,0,D+2/3,N,0,D+2/3,N+1,0,D,N,0,D+2/3,N+1,0,D,N+1,0];y.set(b,x*g*T),v.set(f,p*g*T);const S=[T,T,T,T,T,T];_.set(S,m*g*T)}const A=new ve;A.setAttribute("position",new Ge(y,x)),A.setAttribute("uv",new Ge(v,p)),A.setAttribute("faceIndex",new Ge(_,m)),t.push(A),s>as&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ph(i,t,e){const n=new Li(i,t,e);return n.texture.mapping=xo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function F0(i,t,e){const n=new Float32Array(Si),s=new z(0,1,0);return new ai({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Xc(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function mh(){return new ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xc(),fragmentShader:`

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
		`,blending:ii,depthTest:!1,depthWrite:!1})}function gh(){return new ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Xc(){return`

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
	`}function O0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ua||c===Na,u=c===fs||c===ps;if(l||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new fh(i)),h=l?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&s(d)?(e===null&&(e=new fh(i)),h=l?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function B0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ks("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function k0(i,t,e,n){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(h){const f=[],d=h.index,g=h.attributes.position;let x=0;if(d!==null){const y=d.array;x=d.version;for(let v=0,_=y.length;v<_;v+=3){const A=y[v+0],T=y[v+1],D=y[v+2];f.push(A,T,T,D,D,A)}}else if(g!==void 0){const y=g.array;x=g.version;for(let v=0,_=y.length/3-1;v<_;v+=3){const A=v+0,T=v+1,D=v+2;f.push(A,T,T,D,D,A)}}else return;const p=new(yu(f)?Au:Tu)(f,1);p.version=x;const m=r.get(h);m&&t.remove(m),r.set(h,p)}function u(h){const f=r.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return r.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function V0(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,f*o,g),e.update(d,n,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];e.update(p,n,1)}function h(f,d,g,x){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,d[m],x[m]);else{p.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,g);let m=0;for(let y=0;y<g;y++)m+=d[y]*x[y];e.update(m,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function H0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function G0(i,t,e){const n=new WeakMap,s=new Se;function r(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let b=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",b)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;d===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let _=a.attributes.position.count*v,A=1;_>t.maxTextureSize&&(A=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const T=new Float32Array(_*A*4*h),D=new Su(T,_,A,h);D.type=En,D.needsUpdate=!0;const N=v*4;for(let S=0;S<h;S++){const U=p[S],k=m[S],W=y[S],L=_*A*4*S;for(let C=0;C<U.count;C++){const E=C*N;d===!0&&(s.fromBufferAttribute(U,C),T[L+E+0]=s.x,T[L+E+1]=s.y,T[L+E+2]=s.z,T[L+E+3]=0),g===!0&&(s.fromBufferAttribute(k,C),T[L+E+4]=s.x,T[L+E+5]=s.y,T[L+E+6]=s.z,T[L+E+7]=0),x===!0&&(s.fromBufferAttribute(W,C),T[L+E+8]=s.x,T[L+E+9]=s.y,T[L+E+10]=s.z,T[L+E+11]=W.itemSize===4?s.w:1)}}f={count:h,texture:D,size:new St(_,A)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function W0(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);if(s.get(h)!==l&&(t.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return h}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const Zu=new Fe,xh=new Uu(1,1),$u=new Su,Ju=new Lf,Ku=new Pu,_h=[],vh=[],Mh=new Float32Array(16),yh=new Float32Array(9),Sh=new Float32Array(4);function ys(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=_h[s];if(r===void 0&&(r=new Float32Array(s),_h[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function yo(i,t){let e=vh[t];e===void 0&&(e=new Int32Array(t),vh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function X0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function q0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function Y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function Z0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function $0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Sh.set(n),i.uniformMatrix2fv(this.addr,!1,Sh),Ce(e,n)}}function J0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;yh.set(n),i.uniformMatrix3fv(this.addr,!1,yh),Ce(e,n)}}function K0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Mh.set(n),i.uniformMatrix4fv(this.addr,!1,Mh),Ce(e,n)}}function j0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Q0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function ex(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function nx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function ix(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function sx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function rx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function ox(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(xh.compareFunction=Mu,r=xh):r=Zu,e.setTexture2D(t||r,s)}function ax(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ju,s)}function cx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ku,s)}function lx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||$u,s)}function hx(i){switch(i){case 5126:return X0;case 35664:return q0;case 35665:return Y0;case 35666:return Z0;case 35674:return $0;case 35675:return J0;case 35676:return K0;case 5124:case 35670:return j0;case 35667:case 35671:return Q0;case 35668:case 35672:return tx;case 35669:case 35673:return ex;case 5125:return nx;case 36294:return ix;case 36295:return sx;case 36296:return rx;case 35678:case 36198:case 36298:case 36306:case 35682:return ox;case 35679:case 36299:case 36307:return ax;case 35680:case 36300:case 36308:case 36293:return cx;case 36289:case 36303:case 36311:case 36292:return lx}}function ux(i,t){i.uniform1fv(this.addr,t)}function dx(i,t){const e=ys(t,this.size,2);i.uniform2fv(this.addr,e)}function fx(i,t){const e=ys(t,this.size,3);i.uniform3fv(this.addr,e)}function px(i,t){const e=ys(t,this.size,4);i.uniform4fv(this.addr,e)}function mx(i,t){const e=ys(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function gx(i,t){const e=ys(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function xx(i,t){const e=ys(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function _x(i,t){i.uniform1iv(this.addr,t)}function vx(i,t){i.uniform2iv(this.addr,t)}function Mx(i,t){i.uniform3iv(this.addr,t)}function yx(i,t){i.uniform4iv(this.addr,t)}function Sx(i,t){i.uniform1uiv(this.addr,t)}function bx(i,t){i.uniform2uiv(this.addr,t)}function wx(i,t){i.uniform3uiv(this.addr,t)}function Ex(i,t){i.uniform4uiv(this.addr,t)}function Tx(i,t,e){const n=this.cache,s=t.length,r=yo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Zu,r[o])}function Ax(i,t,e){const n=this.cache,s=t.length,r=yo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ju,r[o])}function Rx(i,t,e){const n=this.cache,s=t.length,r=yo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Ku,r[o])}function Cx(i,t,e){const n=this.cache,s=t.length,r=yo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||$u,r[o])}function Px(i){switch(i){case 5126:return ux;case 35664:return dx;case 35665:return fx;case 35666:return px;case 35674:return mx;case 35675:return gx;case 35676:return xx;case 5124:case 35670:return _x;case 35667:case 35671:return vx;case 35668:case 35672:return Mx;case 35669:case 35673:return yx;case 5125:return Sx;case 36294:return bx;case 36295:return wx;case 36296:return Ex;case 35678:case 36198:case 36298:case 36306:case 35682:return Tx;case 35679:case 36299:case 36307:return Ax;case 35680:case 36300:case 36308:case 36293:return Rx;case 36289:case 36303:case 36311:case 36292:return Cx}}class Lx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=hx(e.type)}}class Dx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Px(e.type)}}class Ix{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const pa=/(\w+)(\])?(\[|\.)?/g;function bh(i,t){i.seq.push(t),i.map[t.id]=t}function zx(i,t,e){const n=i.name,s=n.length;for(pa.lastIndex=0;;){const r=pa.exec(n),o=pa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){bh(e,l===void 0?new Lx(a,i,t):new Dx(a,i,t));break}else{let h=e.map[a];h===void 0&&(h=new Ix(a),bh(e,h)),e=h}}}class Qr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);zx(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function wh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Ux=37297;let Nx=0;function Fx(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Eh=new Xt;function Ox(i){ee._getMatrix(Eh,ee.workingColorSpace,i);const t=`mat3( ${Eh.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case no:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Th(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Fx(i.getShaderSource(t),a)}else return r}function Bx(i,t){const e=Ox(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function kx(i,t){let e;switch(t){case of:e="Linear";break;case af:e="Reinhard";break;case cf:e="Cineon";break;case hu:e="ACESFilmic";break;case hf:e="AgX";break;case uf:e="Neutral";break;case lf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Gr=new z;function Vx(){ee.getLuminanceCoefficients(Gr);const i=Gr.x.toFixed(4),t=Gr.y.toFixed(4),e=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function Gx(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Wx(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Fs(i){return i!==""}function Ah(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Rh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Xx=/^[ \t]*#include +<([\w\d./]+)>/gm;function gc(i){return i.replace(Xx,Yx)}const qx=new Map;function Yx(i,t){let e=Yt[t];if(e===void 0){const n=qx.get(t);if(n!==void 0)e=Yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return gc(e)}const Zx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ch(i){return i.replace(Zx,$x)}function $x(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ph(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Jx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===au?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===cu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function Kx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fs:case ps:t="ENVMAP_TYPE_CUBE";break;case xo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function jx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ps:t="ENVMAP_MODE_REFRACTION";break}return t}function Qx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case lu:t="ENVMAP_BLENDING_MULTIPLY";break;case sf:t="ENVMAP_BLENDING_MIX";break;case rf:t="ENVMAP_BLENDING_ADD";break}return t}function t_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function e_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Jx(e),l=Kx(e),u=jx(e),h=Qx(e),f=t_(e),d=Hx(e),g=Gx(r),x=s.createProgram();let p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fs).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fs).join(`
`),m.length>0&&(m+=`
`)):(p=[Ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),m=[Ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==si?"#define TONE_MAPPING":"",e.toneMapping!==si?Yt.tonemapping_pars_fragment:"",e.toneMapping!==si?kx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,Bx("linearToOutputTexel",e.outputColorSpace),Vx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),o=gc(o),o=Ah(o,e),o=Rh(o,e),a=gc(a),a=Ah(a,e),a=Rh(a,e),o=Ch(o),a=Ch(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===Al?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=y+p+o,_=y+m+a,A=wh(s,s.VERTEX_SHADER,v),T=wh(s,s.FRAGMENT_SHADER,_);s.attachShader(x,A),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function D(U){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(x)||"",W=s.getShaderInfoLog(A)||"",L=s.getShaderInfoLog(T)||"",C=k.trim(),E=W.trim(),F=L.trim();let R=!0,B=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(R=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,T);else{const Y=Th(s,A,"vertex"),Q=Th(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+C+`
`+Y+`
`+Q)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(E===""||F==="")&&(B=!1);B&&(U.diagnostics={runnable:R,programLog:C,vertexShader:{log:E,prefix:p},fragmentShader:{log:F,prefix:m}})}s.deleteShader(A),s.deleteShader(T),N=new Qr(s,x),b=Wx(s,x)}let N;this.getUniforms=function(){return N===void 0&&D(this),N};let b;this.getAttributes=function(){return b===void 0&&D(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,Ux)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Nx++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=T,this}let n_=0;class i_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new s_(t),e.set(t,n)),n}}class s_{constructor(t){this.id=n_++,this.code=t,this.usedTimes=0}}function r_(i,t,e,n,s,r,o){const a=new wu,c=new i_,l=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return l.add(b),b===0?"uv":`uv${b}`}function p(b,S,U,k,W){const L=k.fog,C=W.geometry,E=b.isMeshStandardMaterial?k.environment:null,F=(b.isMeshStandardMaterial?e:t).get(b.envMap||E),R=F&&F.mapping===xo?F.image.height:null,B=g[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const Y=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,Q=Y!==void 0?Y.length:0;let ft=0;C.morphAttributes.position!==void 0&&(ft=1),C.morphAttributes.normal!==void 0&&(ft=2),C.morphAttributes.color!==void 0&&(ft=3);let Ct,et,ht,X;if(B){const ne=bn[B];Ct=ne.vertexShader,et=ne.fragmentShader}else Ct=b.vertexShader,et=b.fragmentShader,c.update(b),ht=c.getVertexShaderID(b),X=c.getFragmentShaderID(b);const K=i.getRenderTarget(),nt=i.state.buffers.depth.getReversed(),st=W.isInstancedMesh===!0,ct=W.isBatchedMesh===!0,Vt=!!b.map,Wt=!!b.matcap,I=!!F,$t=!!b.aoMap,zt=!!b.lightMap,Pt=!!b.bumpMap,vt=!!b.normalMap,jt=!!b.displacementMap,yt=!!b.emissiveMap,Ot=!!b.metalnessMap,fe=!!b.roughnessMap,re=b.anisotropy>0,P=b.clearcoat>0,M=b.dispersion>0,G=b.iridescence>0,q=b.sheen>0,j=b.transmission>0,Z=re&&!!b.anisotropyMap,gt=P&&!!b.clearcoatMap,it=P&&!!b.clearcoatNormalMap,Mt=P&&!!b.clearcoatRoughnessMap,At=G&&!!b.iridescenceMap,rt=G&&!!b.iridescenceThicknessMap,mt=q&&!!b.sheenColorMap,It=q&&!!b.sheenRoughnessMap,Et=!!b.specularMap,dt=!!b.specularColorMap,qt=!!b.specularIntensityMap,O=j&&!!b.transmissionMap,lt=j&&!!b.thicknessMap,ut=!!b.gradientMap,wt=!!b.alphaMap,ot=b.alphaTest>0,tt=!!b.alphaHash,Rt=!!b.extensions;let Ht=si;b.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ht=i.toneMapping);const ue={shaderID:B,shaderType:b.type,shaderName:b.name,vertexShader:Ct,fragmentShader:et,defines:b.defines,customVertexShaderID:ht,customFragmentShaderID:X,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:ct,batchingColor:ct&&W._colorsTexture!==null,instancing:st,instancingColor:st&&W.instanceColor!==null,instancingMorph:st&&W.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:ms,alphaToCoverage:!!b.alphaToCoverage,map:Vt,matcap:Wt,envMap:I,envMapMode:I&&F.mapping,envMapCubeUVHeight:R,aoMap:$t,lightMap:zt,bumpMap:Pt,normalMap:vt,displacementMap:f&&jt,emissiveMap:yt,normalMapObjectSpace:vt&&b.normalMapType===mf,normalMapTangentSpace:vt&&b.normalMapType===vu,metalnessMap:Ot,roughnessMap:fe,anisotropy:re,anisotropyMap:Z,clearcoat:P,clearcoatMap:gt,clearcoatNormalMap:it,clearcoatRoughnessMap:Mt,dispersion:M,iridescence:G,iridescenceMap:At,iridescenceThicknessMap:rt,sheen:q,sheenColorMap:mt,sheenRoughnessMap:It,specularMap:Et,specularColorMap:dt,specularIntensityMap:qt,transmission:j,transmissionMap:O,thicknessMap:lt,gradientMap:ut,opaque:b.transparent===!1&&b.blending===ls&&b.alphaToCoverage===!1,alphaMap:wt,alphaTest:ot,alphaHash:tt,combine:b.combine,mapUv:Vt&&x(b.map.channel),aoMapUv:$t&&x(b.aoMap.channel),lightMapUv:zt&&x(b.lightMap.channel),bumpMapUv:Pt&&x(b.bumpMap.channel),normalMapUv:vt&&x(b.normalMap.channel),displacementMapUv:jt&&x(b.displacementMap.channel),emissiveMapUv:yt&&x(b.emissiveMap.channel),metalnessMapUv:Ot&&x(b.metalnessMap.channel),roughnessMapUv:fe&&x(b.roughnessMap.channel),anisotropyMapUv:Z&&x(b.anisotropyMap.channel),clearcoatMapUv:gt&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:it&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:It&&x(b.sheenRoughnessMap.channel),specularMapUv:Et&&x(b.specularMap.channel),specularColorMapUv:dt&&x(b.specularColorMap.channel),specularIntensityMapUv:qt&&x(b.specularIntensityMap.channel),transmissionMapUv:O&&x(b.transmissionMap.channel),thicknessMapUv:lt&&x(b.thicknessMap.channel),alphaMapUv:wt&&x(b.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(vt||re),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!C.attributes.uv&&(Vt||wt),fog:!!L,useFog:b.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:nt,skinning:W.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ft,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ht,decodeVideoTexture:Vt&&b.map.isVideoTexture===!0&&ee.getTransfer(b.map.colorSpace)===ae,decodeVideoTextureEmissive:yt&&b.emissiveMap.isVideoTexture===!0&&ee.getTransfer(b.emissiveMap.colorSpace)===ae,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Te,flipSided:b.side===qe,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Rt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Rt&&b.extensions.multiDraw===!0||ct)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ue.vertexUv1s=l.has(1),ue.vertexUv2s=l.has(2),ue.vertexUv3s=l.has(3),l.clear(),ue}function m(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const U in b.defines)S.push(U),S.push(b.defines[U]);return b.isRawShaderMaterial===!1&&(y(S,b),v(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function y(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function v(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){const S=g[b.type];let U;if(S){const k=bn[S];U=Wf.clone(k.uniforms)}else U=b.uniforms;return U}function A(b,S){let U;for(let k=0,W=u.length;k<W;k++){const L=u[k];if(L.cacheKey===S){U=L,++U.usedTimes;break}}return U===void 0&&(U=new e_(i,S,b,r),u.push(U)),U}function T(b){if(--b.usedTimes===0){const S=u.indexOf(b);u[S]=u[u.length-1],u.pop(),b.destroy()}}function D(b){c.remove(b)}function N(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:_,acquireProgram:A,releaseProgram:T,releaseShaderCache:D,programs:u,dispose:N}}function o_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function a_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Lh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Dh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(h,f,d,g,x,p){let m=i[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:x,group:p},i[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=x,m.group=p),t++,m}function a(h,f,d,g,x,p){const m=o(h,f,d,g,x,p);d.transmission>0?n.push(m):d.transparent===!0?s.push(m):e.push(m)}function c(h,f,d,g,x,p){const m=o(h,f,d,g,x,p);d.transmission>0?n.unshift(m):d.transparent===!0?s.unshift(m):e.unshift(m)}function l(h,f){e.length>1&&e.sort(h||a_),n.length>1&&n.sort(f||Lh),s.length>1&&s.sort(f||Lh)}function u(){for(let h=t,f=i.length;h<f;h++){const d=i[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:u,sort:l}}function c_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Dh,i.set(n,[o])):s>=r.length?(o=new Dh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function l_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new kt};break;case"SpotLight":e={position:new z,direction:new z,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function h_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let u_=0;function d_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function f_(i){const t=new l_,e=h_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);const s=new z,r=new Qt,o=new Qt;function a(l){let u=0,h=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,g=0,x=0,p=0,m=0,y=0,v=0,_=0,A=0,T=0,D=0;l.sort(d_);for(let b=0,S=l.length;b<S;b++){const U=l[b],k=U.color,W=U.intensity,L=U.distance,C=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)u+=k.r*W,h+=k.g*W,f+=k.b*W;else if(U.isLightProbe){for(let E=0;E<9;E++)n.probe[E].addScaledVector(U.sh.coefficients[E],W);D++}else if(U.isDirectionalLight){const E=t.get(U);if(E.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const F=U.shadow,R=e.get(U);R.shadowIntensity=F.intensity,R.shadowBias=F.bias,R.shadowNormalBias=F.normalBias,R.shadowRadius=F.radius,R.shadowMapSize=F.mapSize,n.directionalShadow[d]=R,n.directionalShadowMap[d]=C,n.directionalShadowMatrix[d]=U.shadow.matrix,y++}n.directional[d]=E,d++}else if(U.isSpotLight){const E=t.get(U);E.position.setFromMatrixPosition(U.matrixWorld),E.color.copy(k).multiplyScalar(W),E.distance=L,E.coneCos=Math.cos(U.angle),E.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),E.decay=U.decay,n.spot[x]=E;const F=U.shadow;if(U.map&&(n.spotLightMap[A]=U.map,A++,F.updateMatrices(U),U.castShadow&&T++),n.spotLightMatrix[x]=F.matrix,U.castShadow){const R=e.get(U);R.shadowIntensity=F.intensity,R.shadowBias=F.bias,R.shadowNormalBias=F.normalBias,R.shadowRadius=F.radius,R.shadowMapSize=F.mapSize,n.spotShadow[x]=R,n.spotShadowMap[x]=C,_++}x++}else if(U.isRectAreaLight){const E=t.get(U);E.color.copy(k).multiplyScalar(W),E.halfWidth.set(U.width*.5,0,0),E.halfHeight.set(0,U.height*.5,0),n.rectArea[p]=E,p++}else if(U.isPointLight){const E=t.get(U);if(E.color.copy(U.color).multiplyScalar(U.intensity),E.distance=U.distance,E.decay=U.decay,U.castShadow){const F=U.shadow,R=e.get(U);R.shadowIntensity=F.intensity,R.shadowBias=F.bias,R.shadowNormalBias=F.normalBias,R.shadowRadius=F.radius,R.shadowMapSize=F.mapSize,R.shadowCameraNear=F.camera.near,R.shadowCameraFar=F.camera.far,n.pointShadow[g]=R,n.pointShadowMap[g]=C,n.pointShadowMatrix[g]=U.shadow.matrix,v++}n.point[g]=E,g++}else if(U.isHemisphereLight){const E=t.get(U);E.skyColor.copy(U.color).multiplyScalar(W),E.groundColor.copy(U.groundColor).multiplyScalar(W),n.hemi[m]=E,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const N=n.hash;(N.directionalLength!==d||N.pointLength!==g||N.spotLength!==x||N.rectAreaLength!==p||N.hemiLength!==m||N.numDirectionalShadows!==y||N.numPointShadows!==v||N.numSpotShadows!==_||N.numSpotMaps!==A||N.numLightProbes!==D)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=D,N.directionalLength=d,N.pointLength=g,N.spotLength=x,N.rectAreaLength=p,N.hemiLength=m,N.numDirectionalShadows=y,N.numPointShadows=v,N.numSpotShadows=_,N.numSpotMaps=A,N.numLightProbes=D,n.version=u_++)}function c(l,u){let h=0,f=0,d=0,g=0,x=0;const p=u.matrixWorldInverse;for(let m=0,y=l.length;m<y;m++){const v=l[m];if(v.isDirectionalLight){const _=n.directional[h];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),h++}else if(v.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(p),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(p),d++}else if(v.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(p),o.identity(),r.copy(v.matrixWorld),r.premultiply(p),o.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(p),x++}}}return{setup:a,setupView:c,state:n}}function Ih(i){const t=new f_(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function c(u){t.setupView(e,u)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function p_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ih(i),t.set(s,[a])):r>=o.length?(a=new Ih(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
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
}`;function x_(i,t,e){let n=new _o;const s=new St,r=new St,o=new Se,a=new Fp({depthPacking:pf}),c=new Op,l={},u=e.maxTextureSize,h={[oi]:qe,[qe]:oi,[Te]:Te},f=new ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new ve;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ie(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=au;let m=this.type;this.render=function(T,D,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),k=i.state;k.setBlending(ii),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const W=m!==On&&this.type===On,L=m===On&&this.type!==On;for(let C=0,E=T.length;C<E;C++){const F=T[C],R=F.shadow;if(R===void 0){console.warn("THREE.WebGLShadowMap:",F,"has no shadow.");continue}if(R.autoUpdate===!1&&R.needsUpdate===!1)continue;s.copy(R.mapSize);const B=R.getFrameExtents();if(s.multiply(B),r.copy(R.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/B.x),s.x=r.x*B.x,R.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/B.y),s.y=r.y*B.y,R.mapSize.y=r.y)),R.map===null||W===!0||L===!0){const Q=this.type!==On?{minFilter:tn,magFilter:tn}:{};R.map!==null&&R.map.dispose(),R.map=new Li(s.x,s.y,Q),R.map.texture.name=F.name+".shadowMap",R.camera.updateProjectionMatrix()}i.setRenderTarget(R.map),i.clear();const Y=R.getViewportCount();for(let Q=0;Q<Y;Q++){const ft=R.getViewport(Q);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),k.viewport(o),R.updateMatrices(F,Q),n=R.getFrustum(),_(D,N,R.camera,F,this.type)}R.isPointLightShadow!==!0&&this.type===On&&y(R,N),R.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(b,S,U)};function y(T,D){const N=t.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Li(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(D,null,N,f,x,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(D,null,N,d,x,null)}function v(T,D,N,b){let S=null;const U=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)S=U;else if(S=N.isPointLight===!0?c:a,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const k=S.uuid,W=D.uuid;let L=l[k];L===void 0&&(L={},l[k]=L);let C=L[W];C===void 0&&(C=S.clone(),L[W]=C,D.addEventListener("dispose",A)),S=C}if(S.visible=D.visible,S.wireframe=D.wireframe,b===On?S.side=D.shadowSide!==null?D.shadowSide:D.side:S.side=D.shadowSide!==null?D.shadowSide:h[D.side],S.alphaMap=D.alphaMap,S.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,S.map=D.map,S.clipShadows=D.clipShadows,S.clippingPlanes=D.clippingPlanes,S.clipIntersection=D.clipIntersection,S.displacementMap=D.displacementMap,S.displacementScale=D.displacementScale,S.displacementBias=D.displacementBias,S.wireframeLinewidth=D.wireframeLinewidth,S.linewidth=D.linewidth,N.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=i.properties.get(S);k.light=N}return S}function _(T,D,N,b,S){if(T.visible===!1)return;if(T.layers.test(D.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===On)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const W=t.update(T),L=T.material;if(Array.isArray(L)){const C=W.groups;for(let E=0,F=C.length;E<F;E++){const R=C[E],B=L[R.materialIndex];if(B&&B.visible){const Y=v(T,B,b,S);T.onBeforeShadow(i,T,D,N,W,Y,R),i.renderBufferDirect(N,null,W,Y,T,R),T.onAfterShadow(i,T,D,N,W,Y,R)}}}else if(L.visible){const C=v(T,L,b,S);T.onBeforeShadow(i,T,D,N,W,C,null),i.renderBufferDirect(N,null,W,C,T,null),T.onAfterShadow(i,T,D,N,W,C,null)}}const k=T.children;for(let W=0,L=k.length;W<L;W++)_(k[W],D,N,b,S)}function A(T){T.target.removeEventListener("dispose",A);for(const N in l){const b=l[N],S=T.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const __={[Ra]:Ca,[Pa]:Ia,[La]:za,[ds]:Da,[Ca]:Ra,[Ia]:Pa,[za]:La,[Da]:ds};function v_(i,t){function e(){let O=!1;const lt=new Se;let ut=null;const wt=new Se(0,0,0,0);return{setMask:function(ot){ut!==ot&&!O&&(i.colorMask(ot,ot,ot,ot),ut=ot)},setLocked:function(ot){O=ot},setClear:function(ot,tt,Rt,Ht,ue){ue===!0&&(ot*=Ht,tt*=Ht,Rt*=Ht),lt.set(ot,tt,Rt,Ht),wt.equals(lt)===!1&&(i.clearColor(ot,tt,Rt,Ht),wt.copy(lt))},reset:function(){O=!1,ut=null,wt.set(-1,0,0,0)}}}function n(){let O=!1,lt=!1,ut=null,wt=null,ot=null;return{setReversed:function(tt){if(lt!==tt){const Rt=t.get("EXT_clip_control");tt?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),lt=tt;const Ht=ot;ot=null,this.setClear(Ht)}},getReversed:function(){return lt},setTest:function(tt){tt?K(i.DEPTH_TEST):nt(i.DEPTH_TEST)},setMask:function(tt){ut!==tt&&!O&&(i.depthMask(tt),ut=tt)},setFunc:function(tt){if(lt&&(tt=__[tt]),wt!==tt){switch(tt){case Ra:i.depthFunc(i.NEVER);break;case Ca:i.depthFunc(i.ALWAYS);break;case Pa:i.depthFunc(i.LESS);break;case ds:i.depthFunc(i.LEQUAL);break;case La:i.depthFunc(i.EQUAL);break;case Da:i.depthFunc(i.GEQUAL);break;case Ia:i.depthFunc(i.GREATER);break;case za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}wt=tt}},setLocked:function(tt){O=tt},setClear:function(tt){ot!==tt&&(lt&&(tt=1-tt),i.clearDepth(tt),ot=tt)},reset:function(){O=!1,ut=null,wt=null,ot=null,lt=!1}}}function s(){let O=!1,lt=null,ut=null,wt=null,ot=null,tt=null,Rt=null,Ht=null,ue=null;return{setTest:function(ne){O||(ne?K(i.STENCIL_TEST):nt(i.STENCIL_TEST))},setMask:function(ne){lt!==ne&&!O&&(i.stencilMask(ne),lt=ne)},setFunc:function(ne,Ln,yn){(ut!==ne||wt!==Ln||ot!==yn)&&(i.stencilFunc(ne,Ln,yn),ut=ne,wt=Ln,ot=yn)},setOp:function(ne,Ln,yn){(tt!==ne||Rt!==Ln||Ht!==yn)&&(i.stencilOp(ne,Ln,yn),tt=ne,Rt=Ln,Ht=yn)},setLocked:function(ne){O=ne},setClear:function(ne){ue!==ne&&(i.clearStencil(ne),ue=ne)},reset:function(){O=!1,lt=null,ut=null,wt=null,ot=null,tt=null,Rt=null,Ht=null,ue=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,x=!1,p=null,m=null,y=null,v=null,_=null,A=null,T=null,D=new kt(0,0,0),N=0,b=!1,S=null,U=null,k=null,W=null,L=null;const C=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let E=!1,F=0;const R=i.getParameter(i.VERSION);R.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(R)[1]),E=F>=1):R.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(R)[1]),E=F>=2);let B=null,Y={};const Q=i.getParameter(i.SCISSOR_BOX),ft=i.getParameter(i.VIEWPORT),Ct=new Se().fromArray(Q),et=new Se().fromArray(ft);function ht(O,lt,ut,wt){const ot=new Uint8Array(4),tt=i.createTexture();i.bindTexture(O,tt),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<ut;Rt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,wt,0,i.RGBA,i.UNSIGNED_BYTE,ot):i.texImage2D(lt+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ot);return tt}const X={};X[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),K(i.DEPTH_TEST),o.setFunc(ds),Pt(!1),vt(Sl),K(i.CULL_FACE),$t(ii);function K(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function nt(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function st(O,lt){return h[O]!==lt?(i.bindFramebuffer(O,lt),h[O]=lt,O===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=lt),O===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function ct(O,lt){let ut=d,wt=!1;if(O){ut=f.get(lt),ut===void 0&&(ut=[],f.set(lt,ut));const ot=O.textures;if(ut.length!==ot.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,Rt=ot.length;tt<Rt;tt++)ut[tt]=i.COLOR_ATTACHMENT0+tt;ut.length=ot.length,wt=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,wt=!0);wt&&i.drawBuffers(ut)}function Vt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}const Wt={[yi]:i.FUNC_ADD,[kd]:i.FUNC_SUBTRACT,[Vd]:i.FUNC_REVERSE_SUBTRACT};Wt[Hd]=i.MIN,Wt[Gd]=i.MAX;const I={[Wd]:i.ZERO,[Xd]:i.ONE,[qd]:i.SRC_COLOR,[Ta]:i.SRC_ALPHA,[jd]:i.SRC_ALPHA_SATURATE,[Jd]:i.DST_COLOR,[Zd]:i.DST_ALPHA,[Yd]:i.ONE_MINUS_SRC_COLOR,[Aa]:i.ONE_MINUS_SRC_ALPHA,[Kd]:i.ONE_MINUS_DST_COLOR,[$d]:i.ONE_MINUS_DST_ALPHA,[Qd]:i.CONSTANT_COLOR,[tf]:i.ONE_MINUS_CONSTANT_COLOR,[ef]:i.CONSTANT_ALPHA,[nf]:i.ONE_MINUS_CONSTANT_ALPHA};function $t(O,lt,ut,wt,ot,tt,Rt,Ht,ue,ne){if(O===ii){x===!0&&(nt(i.BLEND),x=!1);return}if(x===!1&&(K(i.BLEND),x=!0),O!==Bd){if(O!==p||ne!==b){if((m!==yi||_!==yi)&&(i.blendEquation(i.FUNC_ADD),m=yi,_=yi),ne)switch(O){case ls:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bl:i.blendFunc(i.ONE,i.ONE);break;case wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case El:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ls:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case El:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}y=null,v=null,A=null,T=null,D.set(0,0,0),N=0,p=O,b=ne}return}ot=ot||lt,tt=tt||ut,Rt=Rt||wt,(lt!==m||ot!==_)&&(i.blendEquationSeparate(Wt[lt],Wt[ot]),m=lt,_=ot),(ut!==y||wt!==v||tt!==A||Rt!==T)&&(i.blendFuncSeparate(I[ut],I[wt],I[tt],I[Rt]),y=ut,v=wt,A=tt,T=Rt),(Ht.equals(D)===!1||ue!==N)&&(i.blendColor(Ht.r,Ht.g,Ht.b,ue),D.copy(Ht),N=ue),p=O,b=!1}function zt(O,lt){O.side===Te?nt(i.CULL_FACE):K(i.CULL_FACE);let ut=O.side===qe;lt&&(ut=!ut),Pt(ut),O.blending===ls&&O.transparent===!1?$t(ii):$t(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const wt=O.stencilWrite;a.setTest(wt),wt&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),yt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Pt(O){S!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),S=O)}function vt(O){O!==Fd?(K(i.CULL_FACE),O!==U&&(O===Sl?i.cullFace(i.BACK):O===Od?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):nt(i.CULL_FACE),U=O}function jt(O){O!==k&&(E&&i.lineWidth(O),k=O)}function yt(O,lt,ut){O?(K(i.POLYGON_OFFSET_FILL),(W!==lt||L!==ut)&&(i.polygonOffset(lt,ut),W=lt,L=ut)):nt(i.POLYGON_OFFSET_FILL)}function Ot(O){O?K(i.SCISSOR_TEST):nt(i.SCISSOR_TEST)}function fe(O){O===void 0&&(O=i.TEXTURE0+C-1),B!==O&&(i.activeTexture(O),B=O)}function re(O,lt,ut){ut===void 0&&(B===null?ut=i.TEXTURE0+C-1:ut=B);let wt=Y[ut];wt===void 0&&(wt={type:void 0,texture:void 0},Y[ut]=wt),(wt.type!==O||wt.texture!==lt)&&(B!==ut&&(i.activeTexture(ut),B=ut),i.bindTexture(O,lt||X[O]),wt.type=O,wt.texture=lt)}function P(){const O=Y[B];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function G(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function q(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function j(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function gt(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Mt(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function At(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function rt(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(O){Ct.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Ct.copy(O))}function It(O){et.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),et.copy(O))}function Et(O,lt){let ut=l.get(lt);ut===void 0&&(ut=new WeakMap,l.set(lt,ut));let wt=ut.get(O);wt===void 0&&(wt=i.getUniformBlockIndex(lt,O.name),ut.set(O,wt))}function dt(O,lt){const wt=l.get(lt).get(O);c.get(lt)!==wt&&(i.uniformBlockBinding(lt,wt,O.__bindingPointIndex),c.set(lt,wt))}function qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},B=null,Y={},h={},f=new WeakMap,d=[],g=null,x=!1,p=null,m=null,y=null,v=null,_=null,A=null,T=null,D=new kt(0,0,0),N=0,b=!1,S=null,U=null,k=null,W=null,L=null,Ct.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:K,disable:nt,bindFramebuffer:st,drawBuffers:ct,useProgram:Vt,setBlending:$t,setMaterial:zt,setFlipSided:Pt,setCullFace:vt,setLineWidth:jt,setPolygonOffset:yt,setScissorTest:Ot,activeTexture:fe,bindTexture:re,unbindTexture:P,compressedTexImage2D:M,compressedTexImage3D:G,texImage2D:At,texImage3D:rt,updateUBOMapping:Et,uniformBlockBinding:dt,texStorage2D:it,texStorage3D:Mt,texSubImage2D:q,texSubImage3D:j,compressedTexSubImage2D:Z,compressedTexSubImage3D:gt,scissor:mt,viewport:It,reset:qt}}function M_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new St,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,M){return d?new OffscreenCanvas(P,M):ro("canvas")}function x(P,M,G){let q=1;const j=re(P);if((j.width>G||j.height>G)&&(q=G/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(q*j.width),gt=Math.floor(q*j.height);h===void 0&&(h=g(Z,gt));const it=M?g(Z,gt):h;return it.width=Z,it.height=gt,it.getContext("2d").drawImage(P,0,0,Z,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Z+"x"+gt+")."),it}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),P;return P}function p(P){return P.generateMipmaps}function m(P){i.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(P,M,G,q,j=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=M;if(M===i.RED&&(G===i.FLOAT&&(Z=i.R32F),G===i.HALF_FLOAT&&(Z=i.R16F),G===i.UNSIGNED_BYTE&&(Z=i.R8)),M===i.RED_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.R8UI),G===i.UNSIGNED_SHORT&&(Z=i.R16UI),G===i.UNSIGNED_INT&&(Z=i.R32UI),G===i.BYTE&&(Z=i.R8I),G===i.SHORT&&(Z=i.R16I),G===i.INT&&(Z=i.R32I)),M===i.RG&&(G===i.FLOAT&&(Z=i.RG32F),G===i.HALF_FLOAT&&(Z=i.RG16F),G===i.UNSIGNED_BYTE&&(Z=i.RG8)),M===i.RG_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RG8UI),G===i.UNSIGNED_SHORT&&(Z=i.RG16UI),G===i.UNSIGNED_INT&&(Z=i.RG32UI),G===i.BYTE&&(Z=i.RG8I),G===i.SHORT&&(Z=i.RG16I),G===i.INT&&(Z=i.RG32I)),M===i.RGB_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),G===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),G===i.UNSIGNED_INT&&(Z=i.RGB32UI),G===i.BYTE&&(Z=i.RGB8I),G===i.SHORT&&(Z=i.RGB16I),G===i.INT&&(Z=i.RGB32I)),M===i.RGBA_INTEGER&&(G===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),G===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),G===i.UNSIGNED_INT&&(Z=i.RGBA32UI),G===i.BYTE&&(Z=i.RGBA8I),G===i.SHORT&&(Z=i.RGBA16I),G===i.INT&&(Z=i.RGBA32I)),M===i.RGB&&(G===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),G===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),M===i.RGBA){const gt=j?no:ee.getTransfer(q);G===i.FLOAT&&(Z=i.RGBA32F),G===i.HALF_FLOAT&&(Z=i.RGBA16F),G===i.UNSIGNED_BYTE&&(Z=gt===ae?i.SRGB8_ALPHA8:i.RGBA8),G===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),G===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function _(P,M){let G;return P?M===null||M===Pi||M===Zs?G=i.DEPTH24_STENCIL8:M===En?G=i.DEPTH32F_STENCIL8:M===Ys&&(G=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Pi||M===Zs?G=i.DEPTH_COMPONENT24:M===En?G=i.DEPTH_COMPONENT32F:M===Ys&&(G=i.DEPTH_COMPONENT16),G}function A(P,M){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==tn&&P.minFilter!==mn?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function T(P){const M=P.target;M.removeEventListener("dispose",T),N(M),M.isVideoTexture&&u.delete(M)}function D(P){const M=P.target;M.removeEventListener("dispose",D),S(M)}function N(P){const M=n.get(P);if(M.__webglInit===void 0)return;const G=P.source,q=f.get(G);if(q){const j=q[M.__cacheKey];j.usedTimes--,j.usedTimes===0&&b(P),Object.keys(q).length===0&&f.delete(G)}n.remove(P)}function b(P){const M=n.get(P);i.deleteTexture(M.__webglTexture);const G=P.source,q=f.get(G);delete q[M.__cacheKey],o.memory.textures--}function S(P){const M=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let j=0;j<M.__webglFramebuffer[q].length;j++)i.deleteFramebuffer(M.__webglFramebuffer[q][j]);else i.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)i.deleteFramebuffer(M.__webglFramebuffer[q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=P.textures;for(let q=0,j=G.length;q<j;q++){const Z=n.get(G[q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(G[q])}n.remove(P)}let U=0;function k(){U=0}function W(){const P=U;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),U+=1,P}function L(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function C(P,M){const G=n.get(P);if(P.isVideoTexture&&Ot(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&G.__version!==P.version){const q=P.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(G,P,M);return}}else P.isExternalTexture&&(G.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,G.__webglTexture,i.TEXTURE0+M)}function E(P,M){const G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){X(G,P,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,G.__webglTexture,i.TEXTURE0+M)}function F(P,M){const G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){X(G,P,M);return}e.bindTexture(i.TEXTURE_3D,G.__webglTexture,i.TEXTURE0+M)}function R(P,M){const G=n.get(P);if(P.version>0&&G.__version!==P.version){K(G,P,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,G.__webglTexture,i.TEXTURE0+M)}const B={[Hn]:i.REPEAT,[bi]:i.CLAMP_TO_EDGE,[Fa]:i.MIRRORED_REPEAT},Y={[tn]:i.NEAREST,[df]:i.NEAREST_MIPMAP_NEAREST,[fr]:i.NEAREST_MIPMAP_LINEAR,[mn]:i.LINEAR,[Lo]:i.LINEAR_MIPMAP_NEAREST,[wi]:i.LINEAR_MIPMAP_LINEAR},Q={[gf]:i.NEVER,[Sf]:i.ALWAYS,[xf]:i.LESS,[Mu]:i.LEQUAL,[_f]:i.EQUAL,[yf]:i.GEQUAL,[vf]:i.GREATER,[Mf]:i.NOTEQUAL};function ft(P,M){if(M.type===En&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===mn||M.magFilter===Lo||M.magFilter===fr||M.magFilter===wi||M.minFilter===mn||M.minFilter===Lo||M.minFilter===fr||M.minFilter===wi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,B[M.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,B[M.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,B[M.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,Y[M.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,Y[M.minFilter]),M.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Q[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===tn||M.minFilter!==fr&&M.minFilter!==wi||M.type===En&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ct(P,M){let G=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",T));const q=M.source;let j=f.get(q);j===void 0&&(j={},f.set(q,j));const Z=L(M);if(Z!==P.__cacheKey){j[Z]===void 0&&(j[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,G=!0),j[Z].usedTimes++;const gt=j[P.__cacheKey];gt!==void 0&&(j[P.__cacheKey].usedTimes--,gt.usedTimes===0&&b(M)),P.__cacheKey=Z,P.__webglTexture=j[Z].texture}return G}function et(P,M,G){return Math.floor(Math.floor(P/G)/M)}function ht(P,M,G,q){const Z=P.updateRanges;if(Z.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,G,q,M.data);else{Z.sort((rt,mt)=>rt.start-mt.start);let gt=0;for(let rt=1;rt<Z.length;rt++){const mt=Z[gt],It=Z[rt],Et=mt.start+mt.count,dt=et(It.start,M.width,4),qt=et(mt.start,M.width,4);It.start<=Et+1&&dt===qt&&et(It.start+It.count-1,M.width,4)===dt?mt.count=Math.max(mt.count,It.start+It.count-mt.start):(++gt,Z[gt]=It)}Z.length=gt+1;const it=i.getParameter(i.UNPACK_ROW_LENGTH),Mt=i.getParameter(i.UNPACK_SKIP_PIXELS),At=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let rt=0,mt=Z.length;rt<mt;rt++){const It=Z[rt],Et=Math.floor(It.start/4),dt=Math.ceil(It.count/4),qt=Et%M.width,O=Math.floor(Et/M.width),lt=dt,ut=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,qt),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,qt,O,lt,ut,G,q,M.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(i.UNPACK_SKIP_ROWS,At)}}function X(P,M,G){let q=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=i.TEXTURE_3D);const j=Ct(P,M),Z=M.source;e.bindTexture(q,P.__webglTexture,i.TEXTURE0+G);const gt=n.get(Z);if(Z.version!==gt.__version||j===!0){e.activeTexture(i.TEXTURE0+G);const it=ee.getPrimaries(ee.workingColorSpace),Mt=M.colorSpace===ti?null:ee.getPrimaries(M.colorSpace),At=M.colorSpace===ti||it===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let rt=x(M.image,!1,s.maxTextureSize);rt=fe(M,rt);const mt=r.convert(M.format,M.colorSpace),It=r.convert(M.type);let Et=v(M.internalFormat,mt,It,M.colorSpace,M.isVideoTexture);ft(q,M);let dt;const qt=M.mipmaps,O=M.isVideoTexture!==!0,lt=gt.__version===void 0||j===!0,ut=Z.dataReady,wt=A(M,rt);if(M.isDepthTexture)Et=_(M.format===Js,M.type),lt&&(O?e.texStorage2D(i.TEXTURE_2D,1,Et,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,Et,rt.width,rt.height,0,mt,It,null));else if(M.isDataTexture)if(qt.length>0){O&&lt&&e.texStorage2D(i.TEXTURE_2D,wt,Et,qt[0].width,qt[0].height);for(let ot=0,tt=qt.length;ot<tt;ot++)dt=qt[ot],O?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,dt.width,dt.height,mt,It,dt.data):e.texImage2D(i.TEXTURE_2D,ot,Et,dt.width,dt.height,0,mt,It,dt.data);M.generateMipmaps=!1}else O?(lt&&e.texStorage2D(i.TEXTURE_2D,wt,Et,rt.width,rt.height),ut&&ht(M,rt,mt,It)):e.texImage2D(i.TEXTURE_2D,0,Et,rt.width,rt.height,0,mt,It,rt.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){O&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Et,qt[0].width,qt[0].height,rt.depth);for(let ot=0,tt=qt.length;ot<tt;ot++)if(dt=qt[ot],M.format!==gn)if(mt!==null)if(O){if(ut)if(M.layerUpdates.size>0){const Rt=lh(dt.width,dt.height,M.format,M.type);for(const Ht of M.layerUpdates){const ue=dt.data.subarray(Ht*Rt/dt.data.BYTES_PER_ELEMENT,(Ht+1)*Rt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,Ht,dt.width,dt.height,1,mt,ue)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,dt.width,dt.height,rt.depth,mt,dt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,Et,dt.width,dt.height,rt.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,dt.width,dt.height,rt.depth,mt,It,dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,Et,dt.width,dt.height,rt.depth,0,mt,It,dt.data)}else{O&&lt&&e.texStorage2D(i.TEXTURE_2D,wt,Et,qt[0].width,qt[0].height);for(let ot=0,tt=qt.length;ot<tt;ot++)dt=qt[ot],M.format!==gn?mt!==null?O?ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,dt.width,dt.height,mt,dt.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,Et,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,dt.width,dt.height,mt,It,dt.data):e.texImage2D(i.TEXTURE_2D,ot,Et,dt.width,dt.height,0,mt,It,dt.data)}else if(M.isDataArrayTexture)if(O){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,wt,Et,rt.width,rt.height,rt.depth),ut)if(M.layerUpdates.size>0){const ot=lh(rt.width,rt.height,M.format,M.type);for(const tt of M.layerUpdates){const Rt=rt.data.subarray(tt*ot/rt.data.BYTES_PER_ELEMENT,(tt+1)*ot/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,rt.width,rt.height,1,mt,It,Rt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,mt,It,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,rt.width,rt.height,rt.depth,0,mt,It,rt.data);else if(M.isData3DTexture)O?(lt&&e.texStorage3D(i.TEXTURE_3D,wt,Et,rt.width,rt.height,rt.depth),ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,mt,It,rt.data)):e.texImage3D(i.TEXTURE_3D,0,Et,rt.width,rt.height,rt.depth,0,mt,It,rt.data);else if(M.isFramebufferTexture){if(lt)if(O)e.texStorage2D(i.TEXTURE_2D,wt,Et,rt.width,rt.height);else{let ot=rt.width,tt=rt.height;for(let Rt=0;Rt<wt;Rt++)e.texImage2D(i.TEXTURE_2D,Rt,Et,ot,tt,0,mt,It,null),ot>>=1,tt>>=1}}else if(qt.length>0){if(O&&lt){const ot=re(qt[0]);e.texStorage2D(i.TEXTURE_2D,wt,Et,ot.width,ot.height)}for(let ot=0,tt=qt.length;ot<tt;ot++)dt=qt[ot],O?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,mt,It,dt):e.texImage2D(i.TEXTURE_2D,ot,Et,mt,It,dt);M.generateMipmaps=!1}else if(O){if(lt){const ot=re(rt);e.texStorage2D(i.TEXTURE_2D,wt,Et,ot.width,ot.height)}ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,It,rt)}else e.texImage2D(i.TEXTURE_2D,0,Et,mt,It,rt);p(M)&&m(q),gt.__version=Z.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function K(P,M,G){if(M.image.length!==6)return;const q=Ct(P,M),j=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+G);const Z=n.get(j);if(j.version!==Z.__version||q===!0){e.activeTexture(i.TEXTURE0+G);const gt=ee.getPrimaries(ee.workingColorSpace),it=M.colorSpace===ti?null:ee.getPrimaries(M.colorSpace),Mt=M.colorSpace===ti||gt===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const At=M.isCompressedTexture||M.image[0].isCompressedTexture,rt=M.image[0]&&M.image[0].isDataTexture,mt=[];for(let tt=0;tt<6;tt++)!At&&!rt?mt[tt]=x(M.image[tt],!0,s.maxCubemapSize):mt[tt]=rt?M.image[tt].image:M.image[tt],mt[tt]=fe(M,mt[tt]);const It=mt[0],Et=r.convert(M.format,M.colorSpace),dt=r.convert(M.type),qt=v(M.internalFormat,Et,dt,M.colorSpace),O=M.isVideoTexture!==!0,lt=Z.__version===void 0||q===!0,ut=j.dataReady;let wt=A(M,It);ft(i.TEXTURE_CUBE_MAP,M);let ot;if(At){O&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,qt,It.width,It.height);for(let tt=0;tt<6;tt++){ot=mt[tt].mipmaps;for(let Rt=0;Rt<ot.length;Rt++){const Ht=ot[Rt];M.format!==gn?Et!==null?O?ut&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,0,0,Ht.width,Ht.height,Et,Ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,qt,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,0,0,Ht.width,Ht.height,Et,dt,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt,qt,Ht.width,Ht.height,0,Et,dt,Ht.data)}}}else{if(ot=M.mipmaps,O&&lt){ot.length>0&&wt++;const tt=re(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,wt,qt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(rt){O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,mt[tt].width,mt[tt].height,Et,dt,mt[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,mt[tt].width,mt[tt].height,0,Et,dt,mt[tt].data);for(let Rt=0;Rt<ot.length;Rt++){const ue=ot[Rt].image[tt].image;O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,0,0,ue.width,ue.height,Et,dt,ue.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,qt,ue.width,ue.height,0,Et,dt,ue.data)}}else{O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Et,dt,mt[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,qt,Et,dt,mt[tt]);for(let Rt=0;Rt<ot.length;Rt++){const Ht=ot[Rt];O?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,0,0,Et,dt,Ht.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Rt+1,qt,Et,dt,Ht.image[tt])}}}p(M)&&m(i.TEXTURE_CUBE_MAP),Z.__version=j.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function nt(P,M,G,q,j,Z){const gt=r.convert(G.format,G.colorSpace),it=r.convert(G.type),Mt=v(G.internalFormat,gt,it,G.colorSpace),At=n.get(M),rt=n.get(G);if(rt.__renderTarget=M,!At.__hasExternalTextures){const mt=Math.max(1,M.width>>Z),It=Math.max(1,M.height>>Z);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?e.texImage3D(j,Z,Mt,mt,It,M.depth,0,gt,it,null):e.texImage2D(j,Z,Mt,mt,It,0,gt,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),yt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,j,rt.__webglTexture,0,jt(M)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,j,rt.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(P,M,G){if(i.bindRenderbuffer(i.RENDERBUFFER,P),M.depthBuffer){const q=M.depthTexture,j=q&&q.isDepthTexture?q.type:null,Z=_(M.stencilBuffer,j),gt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=jt(M);yt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,Z,M.width,M.height):G?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,Z,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Z,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,P)}else{const q=M.textures;for(let j=0;j<q.length;j++){const Z=q[j],gt=r.convert(Z.format,Z.colorSpace),it=r.convert(Z.type),Mt=v(Z.internalFormat,gt,it,Z.colorSpace),At=jt(M);G&&yt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,At,Mt,M.width,M.height):yt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,At,Mt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ct(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(M.depthTexture);q.__renderTarget=M,(!q.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),C(M.depthTexture,0);const j=q.__webglTexture,Z=jt(M);if(M.depthTexture.format===$s)yt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(M.depthTexture.format===Js)yt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Vt(P){const M=n.get(P),G=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){const q=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){const j=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),M.__depthDisposeCallback=j}M.__boundDepthTexture=q}if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const q=P.texture.mipmaps;q&&q.length>0?ct(M.__webglFramebuffer[0],P):ct(M.__webglFramebuffer,P)}else if(G){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=i.createRenderbuffer(),st(M.__webglDepthbuffer[q],P,!1);else{const j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Z)}}else{const q=P.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),st(M.__webglDepthbuffer,P,!1);else{const j=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,Z)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Wt(P,M,G){const q=n.get(P);M!==void 0&&nt(q.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),G!==void 0&&Vt(P)}function I(P){const M=P.texture,G=n.get(P),q=n.get(M);P.addEventListener("dispose",D);const j=P.textures,Z=P.isWebGLCubeRenderTarget===!0,gt=j.length>1;if(gt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=M.version,o.memory.textures++),Z){G.__webglFramebuffer=[];for(let it=0;it<6;it++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[it]=[];for(let Mt=0;Mt<M.mipmaps.length;Mt++)G.__webglFramebuffer[it][Mt]=i.createFramebuffer()}else G.__webglFramebuffer[it]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let it=0;it<M.mipmaps.length;it++)G.__webglFramebuffer[it]=i.createFramebuffer()}else G.__webglFramebuffer=i.createFramebuffer();if(gt)for(let it=0,Mt=j.length;it<Mt;it++){const At=n.get(j[it]);At.__webglTexture===void 0&&(At.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&yt(P)===!1){G.__webglMultisampledFramebuffer=i.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let it=0;it<j.length;it++){const Mt=j[it];G.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,G.__webglColorRenderbuffer[it]);const At=r.convert(Mt.format,Mt.colorSpace),rt=r.convert(Mt.type),mt=v(Mt.internalFormat,At,rt,Mt.colorSpace,P.isXRRenderTarget===!0),It=jt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,It,mt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,G.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(G.__webglDepthRenderbuffer=i.createRenderbuffer(),st(G.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),ft(i.TEXTURE_CUBE_MAP,M);for(let it=0;it<6;it++)if(M.mipmaps&&M.mipmaps.length>0)for(let Mt=0;Mt<M.mipmaps.length;Mt++)nt(G.__webglFramebuffer[it][Mt],P,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Mt);else nt(G.__webglFramebuffer[it],P,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(M)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let it=0,Mt=j.length;it<Mt;it++){const At=j[it],rt=n.get(At);let mt=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(mt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,rt.__webglTexture),ft(mt,At),nt(G.__webglFramebuffer,P,At,i.COLOR_ATTACHMENT0+it,mt,0),p(At)&&m(mt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(it=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,q.__webglTexture),ft(it,M),M.mipmaps&&M.mipmaps.length>0)for(let Mt=0;Mt<M.mipmaps.length;Mt++)nt(G.__webglFramebuffer[Mt],P,M,i.COLOR_ATTACHMENT0,it,Mt);else nt(G.__webglFramebuffer,P,M,i.COLOR_ATTACHMENT0,it,0);p(M)&&m(it),e.unbindTexture()}P.depthBuffer&&Vt(P)}function $t(P){const M=P.textures;for(let G=0,q=M.length;G<q;G++){const j=M[G];if(p(j)){const Z=y(P),gt=n.get(j).__webglTexture;e.bindTexture(Z,gt),m(Z),e.unbindTexture()}}}const zt=[],Pt=[];function vt(P){if(P.samples>0){if(yt(P)===!1){const M=P.textures,G=P.width,q=P.height;let j=i.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(P),it=M.length>1;if(it)for(let At=0;At<M.length;At++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);const Mt=P.texture.mipmaps;Mt&&Mt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let At=0;At<M.length;At++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[At]);const rt=n.get(M[At]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,rt,0)}i.blitFramebuffer(0,0,G,q,0,0,G,q,j,i.NEAREST),c===!0&&(zt.length=0,Pt.length=0,zt.push(i.COLOR_ATTACHMENT0+At),P.depthBuffer&&P.resolveDepthBuffer===!1&&(zt.push(Z),Pt.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,zt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let At=0;At<M.length;At++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.RENDERBUFFER,gt.__webglColorRenderbuffer[At]);const rt=n.get(M[At]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+At,i.TEXTURE_2D,rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const M=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function jt(P){return Math.min(s.maxSamples,P.samples)}function yt(P){const M=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ot(P){const M=o.render.frame;u.get(P)!==M&&(u.set(P,M),P.update())}function fe(P,M){const G=P.colorSpace,q=P.format,j=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||G!==ms&&G!==ti&&(ee.getTransfer(G)===ae?(q!==gn||j!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function re(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=W,this.resetTextureUnits=k,this.setTexture2D=C,this.setTexture2DArray=E,this.setTexture3D=F,this.setTextureCube=R,this.rebindTextures=Wt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=nt,this.useMultisampledRTT=yt}function y_(i,t){function e(n,s=ti){let r;const o=ee.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===Dc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ic)return i.UNSIGNED_SHORT_5_5_5_1;if(n===pu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===mu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===du)return i.BYTE;if(n===fu)return i.SHORT;if(n===Ys)return i.UNSIGNED_SHORT;if(n===Lc)return i.INT;if(n===Pi)return i.UNSIGNED_INT;if(n===En)return i.FLOAT;if(n===or)return i.HALF_FLOAT;if(n===gu)return i.ALPHA;if(n===xu)return i.RGB;if(n===gn)return i.RGBA;if(n===$s)return i.DEPTH_COMPONENT;if(n===Js)return i.DEPTH_STENCIL;if(n===zc)return i.RED;if(n===Uc)return i.RED_INTEGER;if(n===_u)return i.RG;if(n===Nc)return i.RG_INTEGER;if(n===Fc)return i.RGBA_INTEGER;if(n===$r||n===Jr||n===Kr||n===jr)if(o===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$r)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$r)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oa||n===Ba||n===ka||n===Va)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Oa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ka)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ha||n===Ga||n===Wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ha||n===Ga)return o===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xa||n===qa||n===Ya||n===Za||n===$a||n===Ja||n===Ka||n===ja||n===Qa||n===tc||n===ec||n===nc||n===ic||n===sc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ya)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Za)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$a)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ja)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ka)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ja)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qa)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===tc)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ec)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nc)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ic)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sc)return o===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===rc||n===oc||n===ac)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===rc)return o===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ac)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===cc||n===lc||n===hc||n===uc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===cc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===lc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===hc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===uc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const S_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b_=`
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

}`;class w_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Nu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ai({vertexShader:S_,fragmentShader:b_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ie(new cr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class E_ extends vs{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const x=typeof XRWebGLBinding<"u",p=new w_,m={},y=e.getContextAttributes();let v=null,_=null;const A=[],T=[],D=new St;let N=null;const b=new fn;b.viewport=new Se;const S=new fn;S.viewport=new Se;const U=[b,S],k=new Gp;let W=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=A[X];return K===void 0&&(K=new ta,A[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=A[X];return K===void 0&&(K=new ta,A[X]=K),K.getGripSpace()},this.getHand=function(X){let K=A[X];return K===void 0&&(K=new ta,A[X]=K),K.getHandSpace()};function C(X){const K=T.indexOf(X.inputSource);if(K===-1)return;const nt=A[K];nt!==void 0&&(nt.update(X.inputSource,X.frame,l||o),nt.dispatchEvent({type:X.type,data:X.inputSource}))}function E(){s.removeEventListener("select",C),s.removeEventListener("selectstart",C),s.removeEventListener("selectend",C),s.removeEventListener("squeeze",C),s.removeEventListener("squeezestart",C),s.removeEventListener("squeezeend",C),s.removeEventListener("end",E),s.removeEventListener("inputsourceschange",F);for(let X=0;X<A.length;X++){const K=T[X];K!==null&&(T[X]=null,A[X].disconnect(K))}W=null,L=null,p.reset();for(const X in m)delete m[X];t.setRenderTarget(v),d=null,f=null,h=null,s=null,_=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(N),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(s,e)),h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",C),s.addEventListener("selectstart",C),s.addEventListener("selectend",C),s.addEventListener("squeeze",C),s.addEventListener("squeezestart",C),s.addEventListener("squeezeend",C),s.addEventListener("end",E),s.addEventListener("inputsourceschange",F),y.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(D),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let nt=null,st=null,ct=null;y.depth&&(ct=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=y.stencil?Js:$s,st=y.stencil?Zs:Pi);const Vt={colorFormat:e.RGBA8,depthFormat:ct,scaleFactor:r};h=this.getBinding(),f=h.createProjectionLayer(Vt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Li(f.textureWidth,f.textureHeight,{format:gn,type:Cn,depthTexture:new Uu(f.textureWidth,f.textureHeight,st,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const nt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new Li(d.framebufferWidth,d.framebufferHeight,{format:gn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function F(X){for(let K=0;K<X.removed.length;K++){const nt=X.removed[K],st=T.indexOf(nt);st>=0&&(T[st]=null,A[st].disconnect(nt))}for(let K=0;K<X.added.length;K++){const nt=X.added[K];let st=T.indexOf(nt);if(st===-1){for(let Vt=0;Vt<A.length;Vt++)if(Vt>=T.length){T.push(nt),st=Vt;break}else if(T[Vt]===null){T[Vt]=nt,st=Vt;break}if(st===-1)break}const ct=A[st];ct&&ct.connect(nt)}}const R=new z,B=new z;function Y(X,K,nt){R.setFromMatrixPosition(K.matrixWorld),B.setFromMatrixPosition(nt.matrixWorld);const st=R.distanceTo(B),ct=K.projectionMatrix.elements,Vt=nt.projectionMatrix.elements,Wt=ct[14]/(ct[10]-1),I=ct[14]/(ct[10]+1),$t=(ct[9]+1)/ct[5],zt=(ct[9]-1)/ct[5],Pt=(ct[8]-1)/ct[0],vt=(Vt[8]+1)/Vt[0],jt=Wt*Pt,yt=Wt*vt,Ot=st/(-Pt+vt),fe=Ot*-Pt;if(K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(fe),X.translateZ(Ot),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ct[10]===-1)X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const re=Wt+Ot,P=I+Ot,M=jt-fe,G=yt+(st-fe),q=$t*I/P*re,j=zt*I/P*re;X.projectionMatrix.makePerspective(M,G,q,j,re,P),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Q(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let K=X.near,nt=X.far;p.texture!==null&&(p.depthNear>0&&(K=p.depthNear),p.depthFar>0&&(nt=p.depthFar)),k.near=S.near=b.near=K,k.far=S.far=b.far=nt,(W!==k.near||L!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),W=k.near,L=k.far),k.layers.mask=X.layers.mask|6,b.layers.mask=k.layers.mask&3,S.layers.mask=k.layers.mask&5;const st=X.parent,ct=k.cameras;Q(k,st);for(let Vt=0;Vt<ct.length;Vt++)Q(ct[Vt],st);ct.length===2?Y(k,b,S):k.projectionMatrix.copy(b.projectionMatrix),ft(X,k,st)};function ft(X,K,nt){nt===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(nt.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=fc*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(k)},this.getCameraTexture=function(X){return m[X]};let Ct=null;function et(X,K){if(u=K.getViewerPose(l||o),g=K,u!==null){const nt=u.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let st=!1;nt.length!==k.cameras.length&&(k.cameras.length=0,st=!0);for(let I=0;I<nt.length;I++){const $t=nt[I];let zt=null;if(d!==null)zt=d.getViewport($t);else{const vt=h.getViewSubImage(f,$t);zt=vt.viewport,I===0&&(t.setRenderTargetTextures(_,vt.colorTexture,vt.depthStencilTexture),t.setRenderTarget(_))}let Pt=U[I];Pt===void 0&&(Pt=new fn,Pt.layers.enable(I),Pt.viewport=new Se,U[I]=Pt),Pt.matrix.fromArray($t.transform.matrix),Pt.matrix.decompose(Pt.position,Pt.quaternion,Pt.scale),Pt.projectionMatrix.fromArray($t.projectionMatrix),Pt.projectionMatrixInverse.copy(Pt.projectionMatrix).invert(),Pt.viewport.set(zt.x,zt.y,zt.width,zt.height),I===0&&(k.matrix.copy(Pt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),st===!0&&k.cameras.push(Pt)}const ct=s.enabledFeatures;if(ct&&ct.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){h=n.getBinding();const I=h.getDepthInformation(nt[0]);I&&I.isValid&&I.texture&&p.init(I,s.renderState)}if(ct&&ct.includes("camera-access")&&x){t.state.unbindTexture(),h=n.getBinding();for(let I=0;I<nt.length;I++){const $t=nt[I].camera;if($t){let zt=m[$t];zt||(zt=new Nu,m[$t]=zt);const Pt=h.getCameraImage($t);zt.sourceTexture=Pt}}}}for(let nt=0;nt<A.length;nt++){const st=T[nt],ct=A[nt];st!==null&&ct!==void 0&&ct.update(st,K,l||o)}Ct&&Ct(X,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ht=new Yu;ht.setAnimationLoop(et),this.setAnimationLoop=function(X){Ct=X},this.dispose=function(){}}}const _i=new Mn,T_=new Qt;function A_(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Ru(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,v,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),h(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m)):m.isMeshStandardMaterial?(r(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,_)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),x(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,y,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===qe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===qe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),v=y.envMap,_=y.envMapRotation;v&&(p.envMap.value=v,_i.copy(_),_i.x*=-1,_i.y*=-1,_i.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),p.envMapRotation.value.setFromMatrix4(T_.makeRotationFromEuler(_i)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===qe&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function R_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const _=v.program;n.uniformBlockBinding(y,_)}function l(y,v){let _=s[y.id];_===void 0&&(g(y),_=u(y),s[y.id]=_,y.addEventListener("dispose",p));const A=v.program;n.updateUBOMapping(y,A);const T=t.render.frame;r[y.id]!==T&&(f(y),r[y.id]=T)}function u(y){const v=h();y.__bindingPointIndex=v;const _=i.createBuffer(),A=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function h(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=s[y.id],_=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,D=_.length;T<D;T++){const N=Array.isArray(_[T])?_[T]:[_[T]];for(let b=0,S=N.length;b<S;b++){const U=N[b];if(d(U,T,b,A)===!0){const k=U.__offset,W=Array.isArray(U.value)?U.value:[U.value];let L=0;for(let C=0;C<W.length;C++){const E=W[C],F=x(E);typeof E=="number"||typeof E=="boolean"?(U.__data[0]=E,i.bufferSubData(i.UNIFORM_BUFFER,k+L,U.__data)):E.isMatrix3?(U.__data[0]=E.elements[0],U.__data[1]=E.elements[1],U.__data[2]=E.elements[2],U.__data[3]=0,U.__data[4]=E.elements[3],U.__data[5]=E.elements[4],U.__data[6]=E.elements[5],U.__data[7]=0,U.__data[8]=E.elements[6],U.__data[9]=E.elements[7],U.__data[10]=E.elements[8],U.__data[11]=0):(E.toArray(U.__data,L),L+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,v,_,A){const T=y.value,D=v+"_"+_;if(A[D]===void 0)return typeof T=="number"||typeof T=="boolean"?A[D]=T:A[D]=T.clone(),!0;{const N=A[D];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return A[D]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function g(y){const v=y.uniforms;let _=0;const A=16;for(let D=0,N=v.length;D<N;D++){const b=Array.isArray(v[D])?v[D]:[v[D]];for(let S=0,U=b.length;S<U;S++){const k=b[S],W=Array.isArray(k.value)?k.value:[k.value];for(let L=0,C=W.length;L<C;L++){const E=W[L],F=x(E),R=_%A,B=R%F.boundary,Y=R+B;_+=B,Y!==0&&A-Y<F.storage&&(_+=A-Y),k.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=F.storage}}}const T=_%A;return T>0&&(_+=A-T),y.__size=_,y.__cache={},this}function x(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){const v=y.target;v.removeEventListener("dispose",p);const _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:m}}class C_{constructor(t={}){const{canvas:e=wf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),x=new Int32Array(4);let p=null,m=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let A=!1;this._outputColorSpace=Le;let T=0,D=0,N=null,b=-1,S=null;const U=new Se,k=new Se;let W=null;const L=new kt(0);let C=0,E=e.width,F=e.height,R=1,B=null,Y=null;const Q=new Se(0,0,E,F),ft=new Se(0,0,E,F);let Ct=!1;const et=new _o;let ht=!1,X=!1;const K=new Qt,nt=new z,st=new Se,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function Wt(){return N===null?R:1}let I=n;function $t(w,V){return e.getContext(w,V)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Pc}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",wt,!1),e.addEventListener("webglcontextcreationerror",ot,!1),I===null){const V="webgl2";if(I=$t(V,w),I===null)throw $t(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let zt,Pt,vt,jt,yt,Ot,fe,re,P,M,G,q,j,Z,gt,it,Mt,At,rt,mt,It,Et,dt,qt;function O(){zt=new B0(I),zt.init(),Et=new y_(I,zt),Pt=new D0(I,zt,t,Et),vt=new v_(I,zt),Pt.reversedDepthBuffer&&f&&vt.buffers.depth.setReversed(!0),jt=new H0(I),yt=new o_,Ot=new M_(I,zt,vt,yt,Pt,Et,jt),fe=new z0(_),re=new O0(_),P=new Zp(I),dt=new P0(I,P),M=new k0(I,P,jt,dt),G=new W0(I,M,P,jt),rt=new G0(I,Pt,Ot),it=new I0(yt),q=new r_(_,fe,re,zt,Pt,dt,it),j=new A_(_,yt),Z=new c_,gt=new p_(zt),At=new C0(_,fe,re,vt,G,d,c),Mt=new x_(_,G,Pt),qt=new R_(I,jt,Pt,vt),mt=new L0(I,zt,jt),It=new V0(I,zt,jt),jt.programs=q.programs,_.capabilities=Pt,_.extensions=zt,_.properties=yt,_.renderLists=Z,_.shadowMap=Mt,_.state=vt,_.info=jt}O();const lt=new E_(_,I);this.xr=lt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=zt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=zt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return R},this.setPixelRatio=function(w){w!==void 0&&(R=w,this.setSize(E,F,!1))},this.getSize=function(w){return w.set(E,F)},this.setSize=function(w,V,$=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}E=w,F=V,e.width=Math.floor(w*R),e.height=Math.floor(V*R),$===!0&&(e.style.width=w+"px",e.style.height=V+"px"),this.setViewport(0,0,w,V)},this.getDrawingBufferSize=function(w){return w.set(E*R,F*R).floor()},this.setDrawingBufferSize=function(w,V,$){E=w,F=V,R=$,e.width=Math.floor(w*$),e.height=Math.floor(V*$),this.setViewport(0,0,w,V)},this.getCurrentViewport=function(w){return w.copy(U)},this.getViewport=function(w){return w.copy(Q)},this.setViewport=function(w,V,$,J){w.isVector4?Q.set(w.x,w.y,w.z,w.w):Q.set(w,V,$,J),vt.viewport(U.copy(Q).multiplyScalar(R).round())},this.getScissor=function(w){return w.copy(ft)},this.setScissor=function(w,V,$,J){w.isVector4?ft.set(w.x,w.y,w.z,w.w):ft.set(w,V,$,J),vt.scissor(k.copy(ft).multiplyScalar(R).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(w){vt.setScissorTest(Ct=w)},this.setOpaqueSort=function(w){B=w},this.setTransparentSort=function(w){Y=w},this.getClearColor=function(w){return w.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor(...arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,$=!0){let J=0;if(w){let H=!1;if(N!==null){const at=N.texture.format;H=at===Fc||at===Nc||at===Uc}if(H){const at=N.texture.type,xt=at===Cn||at===Pi||at===Ys||at===Zs||at===Dc||at===Ic,Tt=At.getClearColor(),bt=At.getClearAlpha(),Nt=Tt.r,Bt=Tt.g,Lt=Tt.b;xt?(g[0]=Nt,g[1]=Bt,g[2]=Lt,g[3]=bt,I.clearBufferuiv(I.COLOR,0,g)):(x[0]=Nt,x[1]=Bt,x[2]=Lt,x[3]=bt,I.clearBufferiv(I.COLOR,0,x))}else J|=I.COLOR_BUFFER_BIT}V&&(J|=I.DEPTH_BUFFER_BIT),$&&(J|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",wt,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),At.dispose(),Z.dispose(),gt.dispose(),yt.dispose(),fe.dispose(),re.dispose(),G.dispose(),dt.dispose(),qt.dispose(),q.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",yn),lt.removeEventListener("sessionend",dl),ui.stop()};function ut(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function wt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const w=jt.autoReset,V=Mt.enabled,$=Mt.autoUpdate,J=Mt.needsUpdate,H=Mt.type;O(),jt.autoReset=w,Mt.enabled=V,Mt.autoUpdate=$,Mt.needsUpdate=J,Mt.type=H}function ot(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function tt(w){const V=w.target;V.removeEventListener("dispose",tt),Rt(V)}function Rt(w){Ht(w),yt.remove(w)}function Ht(w){const V=yt.get(w).programs;V!==void 0&&(V.forEach(function($){q.releaseProgram($)}),w.isShaderMaterial&&q.releaseShaderCache(w))}this.renderBufferDirect=function(w,V,$,J,H,at){V===null&&(V=ct);const xt=H.isMesh&&H.matrixWorld.determinant()<0,Tt=md(w,V,$,J,H);vt.setMaterial(J,xt);let bt=$.index,Nt=1;if(J.wireframe===!0){if(bt=M.getWireframeAttribute($),bt===void 0)return;Nt=2}const Bt=$.drawRange,Lt=$.attributes.position;let Jt=Bt.start*Nt,oe=(Bt.start+Bt.count)*Nt;at!==null&&(Jt=Math.max(Jt,at.start*Nt),oe=Math.min(oe,(at.start+at.count)*Nt)),bt!==null?(Jt=Math.max(Jt,0),oe=Math.min(oe,bt.count)):Lt!=null&&(Jt=Math.max(Jt,0),oe=Math.min(oe,Lt.count));const Me=oe-Jt;if(Me<0||Me===1/0)return;dt.setup(H,J,Tt,$,bt);let de,he=mt;if(bt!==null&&(de=P.get(bt),he=It,he.setIndex(de)),H.isMesh)J.wireframe===!0?(vt.setLineWidth(J.wireframeLinewidth*Wt()),he.setMode(I.LINES)):he.setMode(I.TRIANGLES);else if(H.isLine){let Ut=J.linewidth;Ut===void 0&&(Ut=1),vt.setLineWidth(Ut*Wt()),H.isLineSegments?he.setMode(I.LINES):H.isLineLoop?he.setMode(I.LINE_LOOP):he.setMode(I.LINE_STRIP)}else H.isPoints?he.setMode(I.POINTS):H.isSprite&&he.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Ks("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),he.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))he.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ut=H._multiDrawStarts,pe=H._multiDrawCounts,te=H._multiDrawCount,Ye=bt?P.get(bt).bytesPerElement:1,Oi=yt.get(J).currentProgram.getUniforms();for(let Ze=0;Ze<te;Ze++)Oi.setValue(I,"_gl_DrawID",Ze),he.render(Ut[Ze]/Ye,pe[Ze])}else if(H.isInstancedMesh)he.renderInstances(Jt,Me,H.count);else if($.isInstancedBufferGeometry){const Ut=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,pe=Math.min($.instanceCount,Ut);he.renderInstances(Jt,Me,pe)}else he.render(Jt,Me)};function ue(w,V,$){w.transparent===!0&&w.side===Te&&w.forceSinglePass===!1?(w.side=qe,w.needsUpdate=!0,dr(w,V,$),w.side=oi,w.needsUpdate=!0,dr(w,V,$),w.side=Te):dr(w,V,$)}this.compile=function(w,V,$=null){$===null&&($=w),m=gt.get($),m.init(V),v.push(m),$.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),w!==$&&w.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights();const J=new Set;return w.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const at=H.material;if(at)if(Array.isArray(at))for(let xt=0;xt<at.length;xt++){const Tt=at[xt];ue(Tt,$,H),J.add(Tt)}else ue(at,$,H),J.add(at)}),m=v.pop(),J},this.compileAsync=function(w,V,$=null){const J=this.compile(w,V,$);return new Promise(H=>{function at(){if(J.forEach(function(xt){yt.get(xt).currentProgram.isReady()&&J.delete(xt)}),J.size===0){H(w);return}setTimeout(at,10)}zt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let ne=null;function Ln(w){ne&&ne(w)}function yn(){ui.stop()}function dl(){ui.start()}const ui=new Yu;ui.setAnimationLoop(Ln),typeof self<"u"&&ui.setContext(self),this.setAnimationLoop=function(w){ne=w,lt.setAnimationLoop(w),w===null?ui.stop():ui.start()},lt.addEventListener("sessionstart",yn),lt.addEventListener("sessionend",dl),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(V),V=lt.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,V,N),m=gt.get(w,v.length),m.init(V),v.push(m),K.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),et.setFromProjectionMatrix(K,Tn,V.reversedDepth),X=this.localClippingEnabled,ht=it.init(this.clippingPlanes,X),p=Z.get(w,y.length),p.init(),y.push(p),lt.enabled===!0&&lt.isPresenting===!0){const at=_.xr.getDepthSensingMesh();at!==null&&Co(at,V,-1/0,_.sortObjects)}Co(w,V,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(B,Y),Vt=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,Vt&&At.addToRenderList(p,w),this.info.render.frame++,ht===!0&&it.beginShadows();const $=m.state.shadowsArray;Mt.render($,w,V),ht===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=p.opaque,H=p.transmissive;if(m.setupLights(),V.isArrayCamera){const at=V.cameras;if(H.length>0)for(let xt=0,Tt=at.length;xt<Tt;xt++){const bt=at[xt];pl(J,H,w,bt)}Vt&&At.render(w);for(let xt=0,Tt=at.length;xt<Tt;xt++){const bt=at[xt];fl(p,w,bt,bt.viewport)}}else H.length>0&&pl(J,H,w,V),Vt&&At.render(w),fl(p,w,V);N!==null&&D===0&&(Ot.updateMultisampleRenderTarget(N),Ot.updateRenderTargetMipmap(N)),w.isScene===!0&&w.onAfterRender(_,w,V),dt.resetDefaultState(),b=-1,S=null,v.pop(),v.length>0?(m=v[v.length-1],ht===!0&&it.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?p=y[y.length-1]:p=null};function Co(w,V,$,J){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||et.intersectsSprite(w)){J&&st.setFromMatrixPosition(w.matrixWorld).applyMatrix4(K);const xt=G.update(w),Tt=w.material;Tt.visible&&p.push(w,xt,Tt,$,st.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||et.intersectsObject(w))){const xt=G.update(w),Tt=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),st.copy(w.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),st.copy(xt.boundingSphere.center)),st.applyMatrix4(w.matrixWorld).applyMatrix4(K)),Array.isArray(Tt)){const bt=xt.groups;for(let Nt=0,Bt=bt.length;Nt<Bt;Nt++){const Lt=bt[Nt],Jt=Tt[Lt.materialIndex];Jt&&Jt.visible&&p.push(w,xt,Jt,$,st.z,Lt)}}else Tt.visible&&p.push(w,xt,Tt,$,st.z,null)}}const at=w.children;for(let xt=0,Tt=at.length;xt<Tt;xt++)Co(at[xt],V,$,J)}function fl(w,V,$,J){const H=w.opaque,at=w.transmissive,xt=w.transparent;m.setupLightsView($),ht===!0&&it.setGlobalState(_.clippingPlanes,$),J&&vt.viewport(U.copy(J)),H.length>0&&ur(H,V,$),at.length>0&&ur(at,V,$),xt.length>0&&ur(xt,V,$),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function pl(w,V,$,J){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[J.id]===void 0&&(m.state.transmissionRenderTarget[J.id]=new Li(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?or:Cn,minFilter:wi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const at=m.state.transmissionRenderTarget[J.id],xt=J.viewport||U;at.setSize(xt.z*_.transmissionResolutionScale,xt.w*_.transmissionResolutionScale);const Tt=_.getRenderTarget(),bt=_.getActiveCubeFace(),Nt=_.getActiveMipmapLevel();_.setRenderTarget(at),_.getClearColor(L),C=_.getClearAlpha(),C<1&&_.setClearColor(16777215,.5),_.clear(),Vt&&At.render($);const Bt=_.toneMapping;_.toneMapping=si;const Lt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),m.setupLightsView(J),ht===!0&&it.setGlobalState(_.clippingPlanes,J),ur(w,$,J),Ot.updateMultisampleRenderTarget(at),Ot.updateRenderTargetMipmap(at),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let oe=0,Me=V.length;oe<Me;oe++){const de=V[oe],he=de.object,Ut=de.geometry,pe=de.material,te=de.group;if(pe.side===Te&&he.layers.test(J.layers)){const Ye=pe.side;pe.side=qe,pe.needsUpdate=!0,ml(he,$,J,Ut,pe,te),pe.side=Ye,pe.needsUpdate=!0,Jt=!0}}Jt===!0&&(Ot.updateMultisampleRenderTarget(at),Ot.updateRenderTargetMipmap(at))}_.setRenderTarget(Tt,bt,Nt),_.setClearColor(L,C),Lt!==void 0&&(J.viewport=Lt),_.toneMapping=Bt}function ur(w,V,$){const J=V.isScene===!0?V.overrideMaterial:null;for(let H=0,at=w.length;H<at;H++){const xt=w[H],Tt=xt.object,bt=xt.geometry,Nt=xt.group;let Bt=xt.material;Bt.allowOverride===!0&&J!==null&&(Bt=J),Tt.layers.test($.layers)&&ml(Tt,V,$,bt,Bt,Nt)}}function ml(w,V,$,J,H,at){w.onBeforeRender(_,V,$,J,H,at),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),H.onBeforeRender(_,V,$,J,w,at),H.transparent===!0&&H.side===Te&&H.forceSinglePass===!1?(H.side=qe,H.needsUpdate=!0,_.renderBufferDirect($,V,J,H,w,at),H.side=oi,H.needsUpdate=!0,_.renderBufferDirect($,V,J,H,w,at),H.side=Te):_.renderBufferDirect($,V,J,H,w,at),w.onAfterRender(_,V,$,J,H,at)}function dr(w,V,$){V.isScene!==!0&&(V=ct);const J=yt.get(w),H=m.state.lights,at=m.state.shadowsArray,xt=H.state.version,Tt=q.getParameters(w,H.state,at,V,$),bt=q.getProgramCacheKey(Tt);let Nt=J.programs;J.environment=w.isMeshStandardMaterial?V.environment:null,J.fog=V.fog,J.envMap=(w.isMeshStandardMaterial?re:fe).get(w.envMap||J.environment),J.envMapRotation=J.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,Nt===void 0&&(w.addEventListener("dispose",tt),Nt=new Map,J.programs=Nt);let Bt=Nt.get(bt);if(Bt!==void 0){if(J.currentProgram===Bt&&J.lightsStateVersion===xt)return xl(w,Tt),Bt}else Tt.uniforms=q.getUniforms(w),w.onBeforeCompile(Tt,_),Bt=q.acquireProgram(Tt,bt),Nt.set(bt,Bt),J.uniforms=Tt.uniforms;const Lt=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Lt.clippingPlanes=it.uniform),xl(w,Tt),J.needsLights=xd(w),J.lightsStateVersion=xt,J.needsLights&&(Lt.ambientLightColor.value=H.state.ambient,Lt.lightProbe.value=H.state.probe,Lt.directionalLights.value=H.state.directional,Lt.directionalLightShadows.value=H.state.directionalShadow,Lt.spotLights.value=H.state.spot,Lt.spotLightShadows.value=H.state.spotShadow,Lt.rectAreaLights.value=H.state.rectArea,Lt.ltc_1.value=H.state.rectAreaLTC1,Lt.ltc_2.value=H.state.rectAreaLTC2,Lt.pointLights.value=H.state.point,Lt.pointLightShadows.value=H.state.pointShadow,Lt.hemisphereLights.value=H.state.hemi,Lt.directionalShadowMap.value=H.state.directionalShadowMap,Lt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Lt.spotShadowMap.value=H.state.spotShadowMap,Lt.spotLightMatrix.value=H.state.spotLightMatrix,Lt.spotLightMap.value=H.state.spotLightMap,Lt.pointShadowMap.value=H.state.pointShadowMap,Lt.pointShadowMatrix.value=H.state.pointShadowMatrix),J.currentProgram=Bt,J.uniformsList=null,Bt}function gl(w){if(w.uniformsList===null){const V=w.currentProgram.getUniforms();w.uniformsList=Qr.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function xl(w,V){const $=yt.get(w);$.outputColorSpace=V.outputColorSpace,$.batching=V.batching,$.batchingColor=V.batchingColor,$.instancing=V.instancing,$.instancingColor=V.instancingColor,$.instancingMorph=V.instancingMorph,$.skinning=V.skinning,$.morphTargets=V.morphTargets,$.morphNormals=V.morphNormals,$.morphColors=V.morphColors,$.morphTargetsCount=V.morphTargetsCount,$.numClippingPlanes=V.numClippingPlanes,$.numIntersection=V.numClipIntersection,$.vertexAlphas=V.vertexAlphas,$.vertexTangents=V.vertexTangents,$.toneMapping=V.toneMapping}function md(w,V,$,J,H){V.isScene!==!0&&(V=ct),Ot.resetTextureUnits();const at=V.fog,xt=J.isMeshStandardMaterial?V.environment:null,Tt=N===null?_.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:ms,bt=(J.isMeshStandardMaterial?re:fe).get(J.envMap||xt),Nt=J.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Bt=!!$.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Lt=!!$.morphAttributes.position,Jt=!!$.morphAttributes.normal,oe=!!$.morphAttributes.color;let Me=si;J.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Me=_.toneMapping);const de=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,he=de!==void 0?de.length:0,Ut=yt.get(J),pe=m.state.lights;if(ht===!0&&(X===!0||w!==S)){const Be=w===S&&J.id===b;it.setState(J,w,Be)}let te=!1;J.version===Ut.__version?(Ut.needsLights&&Ut.lightsStateVersion!==pe.state.version||Ut.outputColorSpace!==Tt||H.isBatchedMesh&&Ut.batching===!1||!H.isBatchedMesh&&Ut.batching===!0||H.isBatchedMesh&&Ut.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ut.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ut.instancing===!1||!H.isInstancedMesh&&Ut.instancing===!0||H.isSkinnedMesh&&Ut.skinning===!1||!H.isSkinnedMesh&&Ut.skinning===!0||H.isInstancedMesh&&Ut.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ut.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ut.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ut.instancingMorph===!1&&H.morphTexture!==null||Ut.envMap!==bt||J.fog===!0&&Ut.fog!==at||Ut.numClippingPlanes!==void 0&&(Ut.numClippingPlanes!==it.numPlanes||Ut.numIntersection!==it.numIntersection)||Ut.vertexAlphas!==Nt||Ut.vertexTangents!==Bt||Ut.morphTargets!==Lt||Ut.morphNormals!==Jt||Ut.morphColors!==oe||Ut.toneMapping!==Me||Ut.morphTargetsCount!==he)&&(te=!0):(te=!0,Ut.__version=J.version);let Ye=Ut.currentProgram;te===!0&&(Ye=dr(J,V,H));let Oi=!1,Ze=!1,bs=!1;const me=Ye.getUniforms(),en=Ut.uniforms;if(vt.useProgram(Ye.program)&&(Oi=!0,Ze=!0,bs=!0),J.id!==b&&(b=J.id,Ze=!0),Oi||S!==w){vt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),me.setValue(I,"projectionMatrix",w.projectionMatrix),me.setValue(I,"viewMatrix",w.matrixWorldInverse);const We=me.map.cameraPosition;We!==void 0&&We.setValue(I,nt.setFromMatrixPosition(w.matrixWorld)),Pt.logarithmicDepthBuffer&&me.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&me.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,Ze=!0,bs=!0)}if(H.isSkinnedMesh){me.setOptional(I,H,"bindMatrix"),me.setOptional(I,H,"bindMatrixInverse");const Be=H.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),me.setValue(I,"boneTexture",Be.boneTexture,Ot))}H.isBatchedMesh&&(me.setOptional(I,H,"batchingTexture"),me.setValue(I,"batchingTexture",H._matricesTexture,Ot),me.setOptional(I,H,"batchingIdTexture"),me.setValue(I,"batchingIdTexture",H._indirectTexture,Ot),me.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&me.setValue(I,"batchingColorTexture",H._colorsTexture,Ot));const nn=$.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&rt.update(H,$,Ye),(Ze||Ut.receiveShadow!==H.receiveShadow)&&(Ut.receiveShadow=H.receiveShadow,me.setValue(I,"receiveShadow",H.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(en.envMap.value=bt,en.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&V.environment!==null&&(en.envMapIntensity.value=V.environmentIntensity),Ze&&(me.setValue(I,"toneMappingExposure",_.toneMappingExposure),Ut.needsLights&&gd(en,bs),at&&J.fog===!0&&j.refreshFogUniforms(en,at),j.refreshMaterialUniforms(en,J,R,F,m.state.transmissionRenderTarget[w.id]),Qr.upload(I,gl(Ut),en,Ot)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Qr.upload(I,gl(Ut),en,Ot),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&me.setValue(I,"center",H.center),me.setValue(I,"modelViewMatrix",H.modelViewMatrix),me.setValue(I,"normalMatrix",H.normalMatrix),me.setValue(I,"modelMatrix",H.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Be=J.uniformsGroups;for(let We=0,Po=Be.length;We<Po;We++){const di=Be[We];qt.update(di,Ye),qt.bind(di,Ye)}}return Ye}function gd(w,V){w.ambientLightColor.needsUpdate=V,w.lightProbe.needsUpdate=V,w.directionalLights.needsUpdate=V,w.directionalLightShadows.needsUpdate=V,w.pointLights.needsUpdate=V,w.pointLightShadows.needsUpdate=V,w.spotLights.needsUpdate=V,w.spotLightShadows.needsUpdate=V,w.rectAreaLights.needsUpdate=V,w.hemisphereLights.needsUpdate=V}function xd(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(w,V,$){const J=yt.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),yt.get(w.texture).__webglTexture=V,yt.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:$,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,V){const $=yt.get(w);$.__webglFramebuffer=V,$.__useDefaultFramebuffer=V===void 0};const _d=I.createFramebuffer();this.setRenderTarget=function(w,V=0,$=0){N=w,T=V,D=$;let J=!0,H=null,at=!1,xt=!1;if(w){const bt=yt.get(w);if(bt.__useDefaultFramebuffer!==void 0)vt.bindFramebuffer(I.FRAMEBUFFER,null),J=!1;else if(bt.__webglFramebuffer===void 0)Ot.setupRenderTarget(w);else if(bt.__hasExternalTextures)Ot.rebindTextures(w,yt.get(w.texture).__webglTexture,yt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Lt=w.depthTexture;if(bt.__boundDepthTexture!==Lt){if(Lt!==null&&yt.has(Lt)&&(w.width!==Lt.image.width||w.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ot.setupDepthRenderbuffer(w)}}const Nt=w.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(xt=!0);const Bt=yt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Bt[V])?H=Bt[V][$]:H=Bt[V],at=!0):w.samples>0&&Ot.useMultisampledRTT(w)===!1?H=yt.get(w).__webglMultisampledFramebuffer:Array.isArray(Bt)?H=Bt[$]:H=Bt,U.copy(w.viewport),k.copy(w.scissor),W=w.scissorTest}else U.copy(Q).multiplyScalar(R).floor(),k.copy(ft).multiplyScalar(R).floor(),W=Ct;if($!==0&&(H=_d),vt.bindFramebuffer(I.FRAMEBUFFER,H)&&J&&vt.drawBuffers(w,H),vt.viewport(U),vt.scissor(k),vt.setScissorTest(W),at){const bt=yt.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+V,bt.__webglTexture,$)}else if(xt){const bt=V;for(let Nt=0;Nt<w.textures.length;Nt++){const Bt=yt.get(w.textures[Nt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Nt,Bt.__webglTexture,$,bt)}}else if(w!==null&&$!==0){const bt=yt.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,bt.__webglTexture,$)}b=-1},this.readRenderTargetPixels=function(w,V,$,J,H,at,xt,Tt=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=yt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xt!==void 0&&(bt=bt[xt]),bt){vt.bindFramebuffer(I.FRAMEBUFFER,bt);try{const Nt=w.textures[Tt],Bt=Nt.format,Lt=Nt.type;if(!Pt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Pt.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=w.width-J&&$>=0&&$<=w.height-H&&(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Tt),I.readPixels(V,$,J,H,Et.convert(Bt),Et.convert(Lt),at))}finally{const Nt=N!==null?yt.get(N).__webglFramebuffer:null;vt.bindFramebuffer(I.FRAMEBUFFER,Nt)}}},this.readRenderTargetPixelsAsync=async function(w,V,$,J,H,at,xt,Tt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=yt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xt!==void 0&&(bt=bt[xt]),bt)if(V>=0&&V<=w.width-J&&$>=0&&$<=w.height-H){vt.bindFramebuffer(I.FRAMEBUFFER,bt);const Nt=w.textures[Tt],Bt=Nt.format,Lt=Nt.type;if(!Pt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Pt.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Jt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Jt),I.bufferData(I.PIXEL_PACK_BUFFER,at.byteLength,I.STREAM_READ),w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Tt),I.readPixels(V,$,J,H,Et.convert(Bt),Et.convert(Lt),0);const oe=N!==null?yt.get(N).__webglFramebuffer:null;vt.bindFramebuffer(I.FRAMEBUFFER,oe);const Me=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Ef(I,Me,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Jt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,at),I.deleteBuffer(Jt),I.deleteSync(Me),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,V=null,$=0){const J=Math.pow(2,-$),H=Math.floor(w.image.width*J),at=Math.floor(w.image.height*J),xt=V!==null?V.x:0,Tt=V!==null?V.y:0;Ot.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,xt,Tt,H,at),vt.unbindTexture()};const vd=I.createFramebuffer(),Md=I.createFramebuffer();this.copyTextureToTexture=function(w,V,$=null,J=null,H=0,at=null){at===null&&(H!==0?(Ks("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=H,H=0):at=0);let xt,Tt,bt,Nt,Bt,Lt,Jt,oe,Me;const de=w.isCompressedTexture?w.mipmaps[at]:w.image;if($!==null)xt=$.max.x-$.min.x,Tt=$.max.y-$.min.y,bt=$.isBox3?$.max.z-$.min.z:1,Nt=$.min.x,Bt=$.min.y,Lt=$.isBox3?$.min.z:0;else{const nn=Math.pow(2,-H);xt=Math.floor(de.width*nn),Tt=Math.floor(de.height*nn),w.isDataArrayTexture?bt=de.depth:w.isData3DTexture?bt=Math.floor(de.depth*nn):bt=1,Nt=0,Bt=0,Lt=0}J!==null?(Jt=J.x,oe=J.y,Me=J.z):(Jt=0,oe=0,Me=0);const he=Et.convert(V.format),Ut=Et.convert(V.type);let pe;V.isData3DTexture?(Ot.setTexture3D(V,0),pe=I.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Ot.setTexture2DArray(V,0),pe=I.TEXTURE_2D_ARRAY):(Ot.setTexture2D(V,0),pe=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,V.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,V.unpackAlignment);const te=I.getParameter(I.UNPACK_ROW_LENGTH),Ye=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Oi=I.getParameter(I.UNPACK_SKIP_PIXELS),Ze=I.getParameter(I.UNPACK_SKIP_ROWS),bs=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,de.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,de.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Nt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Bt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Lt);const me=w.isDataArrayTexture||w.isData3DTexture,en=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){const nn=yt.get(w),Be=yt.get(V),We=yt.get(nn.__renderTarget),Po=yt.get(Be.__renderTarget);vt.bindFramebuffer(I.READ_FRAMEBUFFER,We.__webglFramebuffer),vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Po.__webglFramebuffer);for(let di=0;di<bt;di++)me&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,yt.get(w).__webglTexture,H,Lt+di),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,yt.get(V).__webglTexture,at,Me+di)),I.blitFramebuffer(Nt,Bt,xt,Tt,Jt,oe,xt,Tt,I.DEPTH_BUFFER_BIT,I.NEAREST);vt.bindFramebuffer(I.READ_FRAMEBUFFER,null),vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||w.isRenderTargetTexture||yt.has(w)){const nn=yt.get(w),Be=yt.get(V);vt.bindFramebuffer(I.READ_FRAMEBUFFER,vd),vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Md);for(let We=0;We<bt;We++)me?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,nn.__webglTexture,H,Lt+We):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,nn.__webglTexture,H),en?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Be.__webglTexture,at,Me+We):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Be.__webglTexture,at),H!==0?I.blitFramebuffer(Nt,Bt,xt,Tt,Jt,oe,xt,Tt,I.COLOR_BUFFER_BIT,I.NEAREST):en?I.copyTexSubImage3D(pe,at,Jt,oe,Me+We,Nt,Bt,xt,Tt):I.copyTexSubImage2D(pe,at,Jt,oe,Nt,Bt,xt,Tt);vt.bindFramebuffer(I.READ_FRAMEBUFFER,null),vt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else en?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(pe,at,Jt,oe,Me,xt,Tt,bt,he,Ut,de.data):V.isCompressedArrayTexture?I.compressedTexSubImage3D(pe,at,Jt,oe,Me,xt,Tt,bt,he,de.data):I.texSubImage3D(pe,at,Jt,oe,Me,xt,Tt,bt,he,Ut,de):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,at,Jt,oe,xt,Tt,he,Ut,de.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,at,Jt,oe,de.width,de.height,he,de.data):I.texSubImage2D(I.TEXTURE_2D,at,Jt,oe,xt,Tt,he,Ut,de);I.pixelStorei(I.UNPACK_ROW_LENGTH,te),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ye),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Oi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ze),I.pixelStorei(I.UNPACK_SKIP_IMAGES,bs),at===0&&V.generateMipmaps&&I.generateMipmap(pe),vt.unbindTexture()},this.initRenderTarget=function(w){yt.get(w).__webglFramebuffer===void 0&&Ot.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ot.setTextureCube(w,0):w.isData3DTexture?Ot.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ot.setTexture2DArray(w,0):Ot.setTexture2D(w,0),vt.unbindTexture()},this.resetState=function(){T=0,D=0,N=null,vt.reset(),dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}function P_(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}function to(i,t){return Math.hypot(i.x-t.x,i.z-t.z)}function ju(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Math.max(0,Math.min(1,((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1)));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function zh(i,t){let e=1/0;for(let n=1;n<(t||[]).length;n++)e=Math.min(e,ju(i,t[n-1],t[n]));return e}function Uh(i,t,e=.8){const n=i.bounds,s=i.target,r=i.spawn;return!(t.x<n.minX+2||t.x>n.maxX-2||t.z<n.minZ+2||t.z>n.maxZ-2||!be(i,t.x,t.z,e)||r&&to(t,r)<14||s&&to(t,s)<(s.radius||5)+11||(i.roads||[]).some(o=>zh(t,o.points)<(o.width||4)/2+2.8)||(i.rivers||[]).some(o=>zh(t,o.points)<o.width/2+1.4)||(i.obstacles||[]).some(o=>to(t,o)<(o.radius||1)+2.1)||(i.fenceSegments||[]).some(o=>ju(t,o.a,o.b)<2.8))}function L_(i,{seed:t=(i.seed||42)+93371,maxClusters:e}={}){const n=i.bounds,s=(n.maxX-n.minX)*(n.maxZ-n.minZ),r=Math.max(3,Math.min(24,Math.ceil(s/1600))),o=Math.max(0,Math.min(32,Math.floor(e??r))),a=P_(t),c=[],l=[];for(let u=0;u<o*90&&l.length<o;u++){const h={x:n.minX+2+a()*(n.maxX-n.minX-4),z:n.minZ+2+a()*(n.maxZ-n.minZ-4)};if(!Uh(i,h,.85)||l.some(x=>to(h,x)<5.5))continue;const f=3+Math.floor(a()*3),d=l.length,g=[];for(let x=0;x<f;x++){const p=a()*Math.PI*2,m=x===0?0:.55+a()*1.25,y={x:h.x+Math.cos(p)*m,z:h.z+Math.sin(p)*m};Uh(i,y,.55)&&g.push({x:y.x,z:y.z,variant:Math.floor(a()*3),scale:.66+a()*.48,cluster:d})}g.length<2||(l.push(h),c.push(...g))}return c}const D_="#9ceeff",I_="#39bfe8",z_="#ff7062",U_="#ff241b";function ma(i,t){const n=(i?.userData?.parts||i)?.tailLight?.material;if(!n)return!1;const s=t?z_:D_,r=t?U_:I_;return n.color?.set&&n.color.set(s),n.emissive?.set&&n.emissive.set(r),n.emissiveIntensity=t?1.9:1.25,!0}const N_=[{id:"speed",name:"Turbo paws",icon:"paw",costs:[80,120,200],unlockLevels:[2,6,11],description:"Circle a roaming flock faster with upgraded paw motors.",tierNames:["Quick paws","Trail runner","Meadow racer"],tierDescriptions:["+1.8 m/s running speed","+2.7 m/s running speed","+3.5 m/s running speed"]},{id:"flock",name:"Friendly signal",icon:"signal",costs:[120,180,260],unlockLevels:[7,10,15],description:"Reach more robots with a wider herding signal.",tierNames:["Clear signal","Pasture beacon","Far-field beacon"],tierDescriptions:["+2 m herding range","+3 m herding range","+4 m herding range"]},{id:"drone",name:"Scout drone",icon:"drone",costs:[200,360,540],unlockLevels:[10,14,18],description:"A hovering helper keeps the main herd together while you lead the way.",tierNames:["Scout","Shepherd scout","Flock captain"],tierDescriptions:["Keeps the main herd together; holds when you leave","33% stronger drone support","67% stronger drone support"]},{id:"helper",name:"Buddy dog",icon:"dog",costs:[600,850,1200],unlockLevels:[20,24,28],description:"Herds from the rear, supports split flocks, and learns to retrieve strays.",tierNames:["Farm friend","Trail partner","Senior shepherd"],tierDescriptions:["Herds from behind in the flock’s direction of travel","Guides the smaller flock and passages; barks autonomously","Also retrieves wanderers and bolters to the nearest flock"]},{id:"bark",name:"Happy bark",icon:"bark",costs:[100,160,240],unlockLevels:[4,8,13],description:"A stronger bark gives wandering robots a cheerful nudge.",tierNames:["Bright bark","Resonant bark","Meadow chorus"],tierDescriptions:["+0.25 bark strength","+0.45 bark strength","+0.65 bark strength"]},{id:"cohesion",name:"Flock harmony",icon:"harmony",costs:[160,220,320],unlockLevels:[12,14,15],description:"Robots regroup more readily when the flock stretches across a meadow.",tierNames:["Stay together","Close companions","Perfect formation"],tierDescriptions:["12% stronger regrouping","23% stronger regrouping","35% stronger regrouping"]}],So=Object.freeze(N_.map(i=>Object.freeze({...i,cost:i.costs[0],maxLevel:i.costs.length,costs:Object.freeze(i.costs),unlockLevels:Object.freeze(i.unlockLevels),tierNames:Object.freeze(i.tierNames),tierDescriptions:Object.freeze(i.tierDescriptions)}))),lr=i=>So.find(t=>t.id===i);function Wn(i,t){const e=lr(t);if(!e||!i||typeof i!="object")return 0;const n=Object.hasOwn(i,t)?i[t]:void 0;return n===!0?1:Number.isInteger(n)&&n>0?Math.min(n,e.maxLevel):0}function qc(i,t){const e=lr(t);return e?e.costs[Wn(i,t)]??null:null}function Qu(i){const t={};for(const e of So){const n=Wn(i,e.id);n&&(t[e.id]=n)}return t}function td(i,t){return lr(t)?.unlockLevels[Wn(i,t)]??null}function Yc(i){if(typeof i=="number")return Number.isInteger(i)?Math.max(1,Math.min(100,i)):1;const t=i;if(!t||typeof t!="object")return 1;const e=Number.isInteger(t.highestLevel)&&t.highestLevel>=0?Math.min(99,t.highestLevel):0,s=(Array.isArray(t.completedLevels)?t.completedLevels:[]).reduce((r,o)=>Number.isInteger(o)&&o>=0&&o<=99?Math.max(r,Math.min(100,o+2)):r,1);return Math.max(e+1,s)}function F_(i,t,e=i){const n=typeof i=="object"?i:null,s=lr(t),r=Yc(e),o=Wn(n?.upgrades,t),a=qc(n?.upgrades,t),c=td(n?.upgrades,t),l=s?a===null?"owned":r<c?"locked":n&&(!Number.isFinite(n.points)||n.points<a)?"points":null:"unknown";return{available:l===null,reason:l,level:o,nextLevel:a===null?null:o+1,cost:a,unlockLevel:c,currentLevelNumber:r}}function ed(i,t=1){const e=Yc(t),n={};for(const s of So){const r=Wn(i,s.id),o=s.unlockLevels.filter(c=>c<=e).length,a=Math.min(r,o);a&&(n[s.id]=a)}return n}function O_(i,t,e=i){const n=lr(t);if(!n)return{ok:!1,reason:"unknown"};if(!i||typeof i!="object")return{ok:!1,reason:"points"};const s=Wn(i.upgrades,t),r=qc(i.upgrades,t);if(r===null)return{ok:!1,reason:"owned"};const o=td(i.upgrades,t);return Yc(e)<o?{ok:!1,reason:"locked",unlockLevel:o}:!Number.isFinite(i.points)||i.points<r?{ok:!1,reason:"points"}:(i.points-=r,i.upgrades={...Qu(i.upgrades),[t]:s+1},{ok:!0,upgrade:n,level:s+1,cost:r})}function B_(i,t=1){const e=ed(i,t),n=r=>Wn(e,r);return{speedBoost:[0,1.8,2.7,3.5][n("speed")],signalBoost:[0,2,3,4][n("flock")],barkBoost:[0,.25,.45,.65][n("bark")],cohesionBoost:[0,.12,.23,.35][n("cohesion")],droneStrength:[0,.7,.93,1.17][n("drone")],helperStrength:[0,1,1.3,1.58][n("helper")],drone:n("drone")>0,helper:n("helper")>0,helperTier:n("helper")}}const jn=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z);function Wr(i,t,e,n=.6){if(!be(i,e.x,e.z,n)){let f=null,d=1/0;for(const g of[.6,1.2,1.8,2.4,3.2,4.5,6]){for(let x=0;x<24;x++){const p=x*Math.PI/12,m={x:e.x+Math.cos(p)*g,z:e.z+Math.sin(p)*g},y=g+jn(t,m)*.015;y<d&&be(i,m.x,m.z,n+.08)&&(f=m,d=y)}if(f)break}if(!f)return{x:t.x,z:t.z};e=f}let s=Cc(i,t,e,n);Ae({...i,obstacles:[]},t,e,n)&&(s=e);const r=t.buddyNavigation;if(r&&jn(r.goal,s)<3&&i.time<r.until){for(;r.path.length&&jn(t,r.path[0])<.45;)r.path.shift();if(r.path.length&&Ae(i,t,r.path[0],n))return r.path[0]}if(Ae(i,t,s,n))return delete t.buddyNavigation,s;const o=(i.obstacles||[]).filter(f=>jn(t,f)<Math.min(24,jn(t,s)+6)&&on(f,t,s)<f.radius+n+4).sort((f,d)=>jn(t,f)-jn(t,d)).slice(0,6);if(!o.length)return s;const a=[t,s];for(const f of o){const d=(f.radius+n+.16)/Math.cos(Math.PI/12);for(let g=0;g<12;g++){const x=g*Math.PI/6,p={x:f.x+Math.cos(x)*d,z:f.z+Math.sin(x)*d};be(i,p.x,p.z,n)&&a.push(p)}}const c=a.map(()=>1/0),l=[],u=new Set;c[0]=0;for(let f=0;f<a.length;f++){let d=-1;for(let g=0;g<a.length;g++)!u.has(g)&&(d<0||c[g]<c[d])&&(d=g);if(d<0||!Number.isFinite(c[d])||d===1)break;u.add(d);for(let g=1;g<a.length;g++){if(u.has(g))continue;const x=c[d]+jn(a[d],a[g]);x>=c[g]||!Ae(i,a[d],a[g],n)||(c[g]=x,l[g]=d)}}if(!Number.isFinite(c[1]))return s;const h=[];for(let f=1;f!==0;f=l[f])h.unshift({x:a[f].x,z:a[f].z});return t.buddyNavigation={goal:{x:s.x,z:s.z},path:h,until:i.time+2},h[0]}const nd=(i,t)=>Math.atan2(Math.sin(i-t),Math.cos(i-t));function xc(i,t,e,n){const s=nd(t,i),r=e*n;return i+Math.max(-r,Math.min(r,s))}function k_(i,t,e,n,s){const r=e.x-t.x,o=e.z-t.z,a=Math.hypot(r,o),c={x:t.x,z:t.z};if(a>.22){const l=Math.atan2(r,o);t.heading=xc(t.heading??l,l,2.8,n);const u=Math.max(0,Math.cos(nd(l,t.heading))),h=Math.min(Math.max(0,a-.15),n*s*u);Bs(i,t,Math.sin(t.heading)*h,Math.cos(t.heading)*h,.6)}t.vx=(t.x-c.x)/n,t.vz=(t.z-c.z)/n}const we=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),os=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:0}},Gs=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function Zc(i,t,e=(n,s)=>Ae(i,n,s,.15)){const n=new Set(t),s=[];for(;n.size;){const r=n.values().next().value,o=[r];n.delete(r);for(let a=0;a<o.length;a++)for(const c of n)we(o[a],c)<=6.5&&e(o[a],c)&&(o.push(c),n.delete(c));s.push(o)}return s}const Nh=(i,t=[])=>i.filter(e=>t.includes(e.id)).length,ga=(i,t,e)=>Nh(t,e)-Nh(i,e)||Math.min(...i.map(n=>n.id))-Math.min(...t.map(n=>n.id)),lo=i=>i.type==="cow"?.78:.55,Ws=(i,t,e)=>((i.x-t.x)*Math.sin(t.heading)+(i.z-t.z)*Math.cos(t.heading))*e;function id(i,t,e){return!e.length||(t.kind==="goal"?e.every(n=>go(i.target,n,lo(n))):e.every(n=>Ws(n,t.bridge,t.sign)>t.bridge.length/2+3))}function V_(i,t){return we(t,i.target)<an(i.target).halfLength+12||(i.rivers||[]).some(e=>e.bridges.some(n=>we(t,n)<n.length/2+12))}function H_(i,t,e,n){if(t.passage){const l=t.passage,u=l.kind==="goal"?i.target:l.bridge;if(!id(i,l,e)&&we(Gs(e),u)<(u.length||u.radius||5)+22)return l;delete t.passage}const s=Gs(e),r=an(i.target),o=we(i.dog,i.target)<i.target.radius+12||e.some(l=>we(l,i.dog)<14&&Ae(i,l,i.dog,.15));if(o&&we(s,i.target)<r.halfLength+12&&!e.every(l=>go(i.target,l,lo(l))))return t.passage={kind:"goal",ids:e.map(l=>l.id)};const a=(i.rivers||[]).flatMap(l=>l.bridges).sort((l,u)=>we(l,s)-we(u,s));let c=t.forward&&n;if(!c&&o&&(c=os(s.x-i.dog.x,s.z-i.dog.z)),!c)return null;for(const l of a){if(we(s,l)>l.length/2+12)continue;const u=c.x*Math.sin(l.heading)+c.z*Math.cos(l.heading);if(Math.abs(u)<.25)continue;const h=Math.sign(u);if(!(Ws(s,l,h)>l.length/2+1))return t.passage={kind:"bridge",bridge:l,sign:h,ids:e.map(d=>d.id)}}return null}function Fh(i,t,e){if(t.kind==="goal")return Ld(i,e);const n=t.bridge,s=n.length/2+4;return{x:n.x+Math.sin(n.heading)*t.sign*s,z:n.z+Math.cos(n.heading)*t.sign*s}}function G_(i,t,e,n,s){if(!e.helper)return{forces:new Map,memberIds:new Set};let r=i.helpers.find(R=>R.type==="helper");r||(r={type:"helper",x:i.dog.x,z:i.dog.z},i.helpers.push(r));const o=i.buddyHerd||={},a=e.helperTier;r.barking=i.time<(r.barkUntil||0);let c=a>=3&&t.find(R=>R.id===o.retrieveId);const l=t.filter(R=>R.id!==c?.id&&!R.wander&&!R.wanderHome),u=l.map(R=>R.id).join(",");(!o.groups||u!==o.signature||i.time-o.checkedAt>=.25)&&(o.allGroups=Zc(i,l),o.groups=o.allGroups.filter(R=>R.length>=2),o.signature=u,o.checkedAt=i.time);let h=o.groups;if(!h.length&&a>=2){const R=(o.allGroups||[]).filter(B=>V_(i,B[0])).sort((B,Y)=>we(r,B[0])-we(r,Y[0]))[0];R&&(h=[R])}h.sort((R,B)=>B.length-R.length||ga(R,B,o.travelIds));const f=h[0];if(!f)return r.mode="standby",r.clusterIds=[],r.targetId=null,r.barking=!1,delete o.retrieveId,{forces:new Map,memberIds:new Set};o.travelIds=f.map(R=>R.id);const d=f.reduce((R,B)=>({x:R.x+(B.vx||0)/f.length,z:R.z+(B.vz||0)/f.length}),{x:0,z:0}),g=Math.hypot(d.x,d.z)>.28;if(g){const R=os(d.x,d.z);if(o.forward){const B=Math.atan2(o.forward.x,o.forward.z),Y=Math.atan2(R.x,R.z),Q=xc(B,Y,1.8,n);o.forward={x:Math.sin(Q),z:Math.cos(Q)}}else o.forward=R}const x=o.forward||{x:0,z:1},p=R=>[...h].sort((B,Y)=>we(R,Gs(B))-we(R,Gs(Y))||ga(B,Y))[0];c&&p(c).some(B=>we(B,c)<=4.5&&Ae(i,B,c,.15))&&(delete o.retrieveId,c=null),a>=3&&!c&&h.some(R=>R.length>=2)&&(c=t.filter(R=>(R.wander||R.wanderHome)&&!h.some(B=>B.some(Y=>Y.id===R.id))).sort((R,B)=>+!!B.wander?.bolting-+!!R.wander?.bolting||we(r,R)-we(r,B)||R.id-B.id)[0],c&&(o.retrieveId=c.id)),c||delete o.retrieveId;let m=a>=2?[...h].sort((R,B)=>R.length-B.length||ga(R,B,r.clusterIds))[0]:f;if(a>=2&&o.passage){const R=t.filter(B=>o.passage.ids.includes(B.id)&&!B.wander&&!B.wanderHome);R.length&&!id(i,o.passage,R)&&(m=R)}const y=c?p(c):m,v=!c&&a>=2?H_(i,o,y,x):null,_=Gs(y);r.clusterIds=y.map(R=>R.id),r.anchor=_,r.targetId=c?.id??null;let A=_,T=x;if(c){A=c;const R=c.type==="cow"?.78:.55,B=Wr(i,c,_,R);T=os(B.x-c.x,B.z-c.z)}if(v){A=[...y].sort((B,Y)=>v.kind==="bridge"?Ws(B,v.bridge,v.sign)-Ws(Y,v.bridge,v.sign):we(Y,i.target)-we(B,i.target))[0];const R=Wr(i,A,Fh(i,v,A),lo(A));T=os(R.x-A.x,R.z-A.z)}if(c||v){const R=Math.atan2(T.x,T.z);o.workHeading=xc(o.workHeading??R,R,1.8,n),T={x:Math.sin(o.workHeading),z:Math.cos(o.workHeading)}}else delete o.workHeading;r.mode=c?"retrieve":v?v.kind:g?"herd":"hold";const D=c||v?0:Math.min(...y.map(R=>(R.x-_.x)*T.x+(R.z-_.z)*T.z)),N=c?{x:(c.vx||0)*.4,z:(c.vz||0)*.4}:{x:0,z:0},b={x:A.x+T.x*(D-3.2)+N.x,z:A.z+T.z*(D-3.2)+N.z};r.desired=b,r.forward={...T};const S={x:r.x-A.x,z:r.z-A.z};let U=b;if(S.x*T.x+S.z*T.z>-2.5&&we(r,A)<8){const R=o.orbitSide||=Math.sign(S.x*-T.z+S.z*T.x)||1;U={x:A.x-T.x*4.5-T.z*R*5+N.x,z:A.z-T.z*4.5+T.x*R*5+N.z}}S.x*T.x+S.z*T.z<-3&&delete o.orbitSide;const k=Wr(i,r,U,.6);k_(i,r,k,n,c?9:7);const W=c?[c]:y,L=new Map,C=new Set;if(!g&&!c&&!v)return{forces:L,memberIds:C};const E=R=>{if(!v)return T;const B=Wr(i,R,Fh(i,v,R),lo(R));return os(B.x-R.x,B.z-R.z)},F=R=>{if(v?.kind==="bridge"&&Ws(R,v.bridge,v.sign)>v.bridge.length/2+3)return!1;const B=E(R),Y=os(R.x-r.x,R.z-r.z);return Y.x*B.x+Y.z*B.z>.6&&we(r,R)<8&&Ae(i,r,R,.15)};a>=2&&i.time>=(r.nextBarkAt||0)&&W.some(F)&&(r.barkUntil=i.time+.65,r.nextBarkAt=i.time+3.2,r.barking=!0,s.push({type:"buddyBark",x:r.x,z:r.z}));for(const R of W){if(!F(R))continue;const B=R.type==="cow"?.78:.55,Y=(c?3.7:v?2.4:1.15)*e.helperStrength*(r.barking?1.45:1),Q=E(R),ft=c||v?0:(_.x-R.x)*-T.z+(_.z-R.z)*T.x,Ct=Math.max(-.6,Math.min(.6,ft*.12)),et={x:Q.x*Y-Q.z*Ct,z:Q.z*Y+Q.x*Ct},ht={x:R.x+Q.x*.7,z:R.z+Q.z*.7};!be(i,ht.x,ht.z,B)||!Ae(i,R,ht,B)||(L.set(R.id,et),C.add(R.id))}return{forces:L,memberIds:C}}const W_=i=>i.type==="cow"?.78:.55,xa=i=>({x:Math.sin(i.heading),z:Math.cos(i.heading)}),Oh=(i,t,e)=>(i.x-t.x)*e.x+(i.z-t.z)*e.z;function X_(i,t,e){let n=t.bridgeCrossing;const s=W_(t);if(n){const f=xa(n.bridge);if(Oh(e,n.bridge,f)*n.sign>n.bridge.length/2+s+.7&&be(i,e.x,e.z,s))return delete t.bridgeCrossing,{finished:!0}}else t:for(const f of i.rivers||[])for(const d of f.bridges){const g=xa(d),x=Oh(e,d,g),p=(e.x-d.x)*g.z-(e.z-d.z)*g.x;if(Math.abs(x)>d.length/2+.15||Math.abs(p)>d.width/2-s||!be(i,e.x,e.z,s))continue;const m=(e.vx||0)*g.x+(e.vz||0)*g.z;if(!(Math.abs(m)<.12)){n=t.bridgeCrossing={bridge:d,sign:Math.sign(m),lane:Math.max(-d.width/2+s+.35,Math.min(d.width/2-s-.35,p))};break t}}if(!n)return null;const r=n.bridge,o=xa(r);let a;for(const f of[s+1.2,s+2,s+3.2,s+5]){const d=n.sign*(r.length/2+f),g={x:r.x+o.x*d+o.z*n.lane,z:r.z+o.z*d-o.x*n.lane};if(be(i,g.x,g.z,s)){a=g;break}}if(!a)return null;const c=Cc(i,e,a,s),l=c.x-e.x,u=c.z-e.z,h=Math.hypot(l,u);return h<.02||!Ae(i,e,c,s)?{x:0,z:0,forward:o}:{x:l/h,z:u/h,forward:o}}function q_(i){let t=i>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,(t>>>0)/4294967296}function cs(i,t,e,n=0){return q_((i^Math.imul(t+1,2654435761)^Math.imul(e+1,2246822507)^n)>>>0)}const Y_=i=>Math.floor(Math.max(0,i)*.2);function Z_(i){const t=i+1;return{wanderChance:t>70?.25:t>40?.2:.33,boltChance:t>40?.2:.1,duration:t>=70?[5,10]:t>=40?[4,6]:[3,5]}}function _c(i){const t=i.animals.filter(s=>!s.saved),e=t.map(s=>s.id).join(",");if(i.wanderCohort&&i.wanderCohortSignature===e)return i.wanderCohort;const n=new Set(t.map(s=>({id:s.id,rank:cs(i.seed^Math.imul(i.index+1,7919),s.id,0,5370206)})).sort((s,r)=>s.rank-r.rank||s.id-r.id).slice(0,Y_(t.length)).map(s=>s.id));return i.wanderCohort=n,i.wanderCohortSignature=e,i.wanderCohort}function $_(i,t,e,n,s=!1){if(i.index<7||t.saved||s||t.wander||t.wanderHome)return null;const r=Z_(i.index);if(!_c(i).has(t.id)||cs(i.seed,t.id,e,96785)>=r.wanderChance)return null;const o=t.x-n.x,a=t.z-n.z,c=Math.hypot(o,a),l=c>.01?{x:o/c,z:a/c}:{x:0,z:1},u=i.index>=16&&cs(i.seed,t.id,e,45079)<r.boltChance,h=u?r.duration[0]+cs(i.seed,t.id,e,1004)*(r.duration[1]-r.duration[0]):2.5,f=u?6*h+1:4+cs(i.seed,t.id,e,4292)*3;return{x:t.x+l.x*f,z:t.z+l.z*f,until:i.time+h,bolting:u}}function _a(i,t,e){return 5+3*cs(i.seed^Math.imul(i.index+1,7919),t.id,e,49420)}function J_(i,t,e){if(!(e>0)||i.index<7||t.saved||(Number.isFinite(t.nextWanderCheck)||(t.wanderOpportunity=0,t.nextWanderCheck=i.time-e+_a(i,t,0)),i.time+1e-8<t.nextWanderCheck))return null;const n=t.wanderOpportunity++;return t.nextWanderCheck+=_a(i,t,t.wanderOpportunity),t.nextWanderCheck<=i.time&&(t.nextWanderCheck=i.time+_a(i,t,t.wanderOpportunity)),n}const _n=(i,t,e)=>Math.max(t,Math.min(e,i)),nr=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Bn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-4?{x:i/e,z:t/e}:{x:0,z:0}},vc=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function bo(i){const t=Math.max(0,(i.animals?.length||0)-5),e=Math.max(1,i.routes?.length||1),n=i.spawn&&i.target?nr(i.spawn,i.target):0;return _n(30+Math.ceil(t/5)+(e-1)*4+Math.floor(n/40)*2,30,60)}function $c(i,t=i.animals.filter(e=>e.saved).length){const e=i.animals.length;return e?Math.floor(Math.max(0,i.reward)*_n(t,0,e)/e):0}function Mc(i,t=[],e=!1,n={blockedX:!1,blockedZ:!1}){const s=i.result?.saved??i.animals.filter(a=>a.saved).length,r=i.result?.total??i.animals.length,o=i.result?.score??$c(i,s);return{saved:s,total:r,score:o,possibleScore:i.reward,completed:!!i.completed,justCompleted:e,reward:e?o:0,remaining:i.delivery?.remaining??null,countdownStarted:!!i.delivery?.started,events:t,helpers:i.helpers||[],dogCollision:n}}function Bh(i,t,e=[],n){i.completed=!0;const s=i.animals.filter(r=>r.saved).length;return i.result={saved:s,total:i.animals.length,score:$c(i,s),possibleScore:i.reward,reason:t},e.push({type:"levelCompleted",index:i.index,reward:i.result.score,reason:t}),Mc(i,e,!0,n)}function ho(i,t,e,n=.15){return Ae(i,t,e,n)}function K_(i,t,e=[]){const n=Zc(i,t);return n.sort((s,r)=>r.length-s.length||r.filter(o=>e.includes(o.id)).length-s.filter(o=>e.includes(o.id)).length||Math.min(...s.map(o=>o.id))-Math.min(...r.map(o=>o.id))),n[0]||[]}function j_(i,t,e,n){const s=[e.drone&&"drone"].filter(Boolean);if(i.helpers||=[],i.helpers=i.helpers.filter(x=>s.includes(x.type)||e.helper&&x.type==="helper"),!s.length||!t.length)return{helpers:[],group:[],memberIds:new Set,hold:!1};const r=i.companionHerd||={},o=t.map(x=>x.id).join(",");(!r.group||r.activeSignature!==o||i.time-r.clusterTime>.25)&&(r.group=K_(i,t,r.clusterIds),r.activeSignature=o,r.clusterTime=i.time);const a=r.group;if(a.length<2){r.mode="standby",r.clusterIds=[],r.positions={};for(const x of s){let p=i.helpers.find(m=>m.type===x);p||(p={type:x,x:i.dog.x,z:i.dog.z},i.helpers.push(p)),p.mode="standby",p.clusterIds=[],p.anchor={x:p.x,z:p.z}}return{helpers:i.helpers,group:[],memberIds:new Set,hold:!1,state:r}}const c=vc(a),l=a.map(x=>x.id),u=new Set(l);let h=1/0;for(const x of a){const p=nr(i.dog,x);p<=18&&p<h&&ho(i,i.dog,x)&&(h=p)}const f=r.mode&&r.mode!=="standby"?r.mode==="hold"?h>=12:h>18:h>14,d=(r.clusterIds||[]).filter(x=>u.has(x)).length,g=!r.clusterIds||d<Math.min(r.clusterIds.length,l.length)/2;if(f&&(r.mode!=="hold"||g)&&(r.anchor={...c},r.positions=Object.fromEntries(a.map(x=>[x.id,{x:x.x,z:x.z}]))),f||(r.anchor={...c},r.positions={}),f)for(const x of a)r.positions[x.id]||={x:x.x,z:x.z};r.mode=f?"hold":"assist",r.clusterIds=l;for(const x of s){let p=i.helpers.find(v=>v.type===x);p||(p={type:x,x:x==="drone"?c.x:i.dog.x,z:x==="drone"?c.z:i.dog.z},i.helpers.push(p)),p.mode=r.mode,p.clusterIds=[...l],p.anchor={...r.anchor};const m=Bn(c.x-p.x,c.z-p.z),y=Math.min(nr(p,c),n*6);p.x+=m.x*y,p.z+=m.z*y}return{helpers:i.helpers,group:a,centroid:c,memberIds:u,hold:f,state:r}}function Q_(i,t,e,n){const s=new Map;if(!t.group.length||t.hold)return s;const{group:r,centroid:o}=t,a=Bn(o.x-e.x,o.z-e.z),c={x:-a.z,z:a.x},l=Math.min(1.2,n.droneStrength*.35),u=Math.max(2.1,Math.sqrt(r.length)*.66);for(const f of r){const d=(o.x-f.x)*c.x+(o.z-f.z)*c.z,g=_n(Math.sign(d)*Math.max(0,Math.abs(d)-u)*l,-.75,.75),x={x:c.x*g,z:c.z*g},p=f.type==="cow"?.78:.55;g&&!ho(i,f,{x:f.x+x.x,z:f.z+x.z},p)||be(i,f.x+x.x*.7,f.z+x.z*.7,p)&&s.set(f.id,x)}const h=[...s.values()].reduce((f,d)=>({x:f.x+d.x,z:f.z+d.z}),{x:0,z:0});for(const f of s.values())f.x-=h.x/s.size,f.z-=h.z/s.size;return s}function sd(i,t,e){if(t<=0)return;const n=an(i.target);for(const s of i.animals){if(!s.saved)continue;const r=s.type==="cow"?.78:.55,o=Ec(i.target,s),a=s.roamPhase??s.id*2.399963229728653;s.roamPhase=a;const c=n.halfLength-r-.48,l=n.halfWidth-r-.24,u={forward:Math.sin(e*.22+a)*c*.72,lateral:Math.cos(e*.19+a*1.7)*l*.72};let h=(u.forward-o.forward)*.32,f=(u.lateral-o.lateral)*.32;for(const _ of i.animals){if(_===s||!_.saved)continue;const A=s.x-_.x,T=s.z-_.z,D=Math.hypot(A,T),N=r+(_.type==="cow"?.78:.55)+.35;if(D>1e-4&&D<N){const b=(N-D)/D*.6;h+=(A*n.forward.x+T*n.forward.z)*b,f+=(A*n.side.x+T*n.side.z)*b}}const d=-n.halfLength+r;o.forward<d+.45&&(h+=(d+.45-o.forward)*1.2);const g=n.forward,x=n.side;let p=g.x*h+x.x*f,m=g.z*h+x.z*f;const y=Math.hypot(p,m);y>.65&&(p*=.65/y,m*=.65/y);const v={x:s.x,z:s.z};Bs(i,s,p*t,m*t,r),be(i,s.x,s.z,r)&&go(i.target,s,r)||(s.x=v.x,s.z=v.z),s.vx=(s.x-v.x)/t,s.vz=(s.z-v.z)/t,s.heading=Math.hypot(s.vx,s.vz)>.03?Math.atan2(s.vx,s.vz):s.heading||0}}function tv(i,t=1/60){t=_n(Number(t)||0,0,.1),i.completed&&t>0&&(i.savedRoamTime=(i.savedRoamTime??(i.time||0))+t,sd(i,t,i.savedRoamTime))}function ev(i,t,e={},n=1/60,s={}){const r=B_(s,i.index+1);if(n=_n(Number(n)||0,0,.1),i.completed||n<=0)return Mc(i);if(n>0&&i.delivery?.started&&(i.delivery.remaining=Math.max(0,i.delivery.remaining-n),i.delivery.remaining<=1e-8))return i.delivery.remaining=0,Bh(i,"timeout");i.time=(i.time||0)+n;const o=_c(i);sd(i,n,i.time);const a=[],c=Number(e.x)||0,l=Number(e.z??e.y)||0,u=Math.min(1,Math.hypot(c,l)),h=Bn(c,l),f=7.8+r.speedBoost,d={x:t.x,z:t.z},g=Bs(i,t,h.x*u*f*n,h.z*u*f*n,.62);t.vx=n?(t.x-d.x)/n:0,t.vz=n?(t.z-d.z)/n:0,t.heading=u>.03?Math.atan2(h.x,h.z):t.heading||0,i.dog=t;const x=i.animals.filter(C=>!C.saved),p=j_(i,x,r,n),m=Q_(i,p,t,r),y=G_(i,x,r,n,a),v=7.6+r.signalBoost+(e.bark?3.3:0),_=x.map(C=>({...C})),A=i.flockVisibility||=new Map,T=new Map(_.map(C=>[C.id,`${Math.floor(C.x*5)},${Math.floor(C.z*5)}`])),D=(C,E)=>{const F=C.id<E.id?C:E,R=C.id<E.id?E:C,B=`${F.id}:${R.id}`,Y=`${T.get(F.id)}:${T.get(R.id)}`,Q=A.get(B);if(Q?.position===Y)return Q.clear;const ft=Ae(i,C,E,.15);return A.set(B,{position:Y,clear:ft}),ft},N=new Map(_.map(C=>{const E=nr(C,t),F=E<v&&Rd(i,C,t),R=F?Math.pow(1-E/v,.65)*(e.bark?1.65+r.barkBoost:1):0,B=E>.01?Bn(C.x-t.x,C.z-t.z):Bn(Math.sin(t.heading||0),Math.cos(t.heading||0));return[C.id,{active:F,urgency:R,x:B.x*R*5.2,z:B.z*R*5.2}]})),b=new Map,S=new Map,U=i.flockTravel||[],k=[];Zc(i,_,D).forEach((C,E)=>{const F=C.filter(Wt=>!Wt.wander&&!Wt.wanderHome),R=F.length?F:C,B=vc(R);let Y=0,Q=0,ft=0,Ct=0;for(const Wt of R){Y+=(Wt.vx||0)/R.length,Q+=(Wt.vz||0)/R.length;const I=N.get(Wt.id),$t=y.forces.get(Wt.id);ft+=(I.x+($t?.x||0))/R.length,Ct+=(I.z+($t?.z||0))/R.length}const et=C.map(Wt=>Wt.id),ht=new Set(et),X=U.map(Wt=>({v:Wt,count:Wt.ids.filter(I=>ht.has(I)).length})).sort((Wt,I)=>I.count-Wt.count)[0],K=Math.hypot(Y,Q),nt=Math.hypot(ft,Ct),st=K>.28?Bn(Y,Q):nt>.03?Bn(ft,Ct):X?.count?X.v.forward:null,ct=st?Math.max(K>.28?Y*st.x+Q*st.z:0,nt>.03?(ft*st.x+Ct*st.z)*.65:0,0):0,Vt={center:B,forward:st,drive:ct,pressure:nt};k.push({ids:et,forward:st}),S.set(E,Vt);for(const Wt of C)b.set(Wt.id,E)}),i.flockTravel=k;for(let C=0;C<x.length;C++){const E=x[C],F=_[C],R=E.type==="cow"?.78:.55,B=X_(i,E,F),Y=B?.finished?null:B;B?.finished&&p.hold&&p.memberIds.has(E.id)&&(p.state.positions[E.id]={x:F.x,z:F.z});let Q=0,ft=0,Ct=0,et=0,ht=0,X=0,K=0,nt=0;for(const q of _){if(q.id===E.id)continue;const j=F.x-q.x,Z=F.z-q.z,gt=Math.hypot(j,Z);if(gt<2&&gt>.01){const it=(2-gt)/gt;Q+=j*it,ft+=Z*it}gt<18&&b.get(F.id)===b.get(q.id)&&D(F,q)&&(Ct+=q.x,et+=q.z,ht+=q.vx,X+=q.vz,K++)}let st=Q*2.5,ct=ft*2.5;const Vt=N.get(E.id),Wt=Vt.active,I=y.memberIds.has(E.id),$t=!p.hold&&p.memberIds.has(E.id)||I;if((Wt||$t||Y)&&(delete E.wander,delete E.wanderHome),Wt&&(st+=Vt.x,ct+=Vt.z,nt=Vt.urgency,E.lastPlayerPressure=i.time),I){const q=y.forces.get(E.id);st+=q.x,ct+=q.z,nt=Math.max(nt,.45)}const zt=!Y&&p.hold&&p.memberIds.has(E.id)&&nt<.03,Pt=()=>{E.wanderHome={x:F.x,z:F.z},delete E.wander};E.wander&&(i.time>=E.wander.until||!o.has(E.id))&&Pt();const vt=J_(i,E,n);if(vt!==null&&nt<.03){const q=p.centroid||vc(_),j=$_(i,E,vt,q,Wt||$t||zt||!!Y);j&&(E.wander=j)}let jt=E.wander;if(zt){const q=p.state.positions[E.id];st=_n((q.x-F.x)*2.6+Q*.35,-1.1,1.1),ct=_n((q.z-F.z)*2.6+ft*.35,-1.1,1.1)}else{if(K&&!jt&&!E.wanderHome&&!(I&&i.buddyHerd?.retrieveId===E.id)){const j=Ct/K-F.x,Z=et/K-F.z,gt=Math.hypot(j,Z),it=S.get(b.get(E.id)),Mt=it.forward,At=Mt&&(F.x-it.center.x)*Mt.x+(F.z-it.center.z)*Mt.z>.6;if(gt>2.6){const rt=Bn(j,Z),mt=Math.min(2.6,(gt-2.6)*.36)*.7*(1+r.cohesionBoost);let It=rt.x*mt,Et=rt.z*mt;const dt=At?Math.min(0,It*Mt.x+Et*Mt.z):0;dt&&(It-=Mt.x*dt,Et-=Mt.z*dt),st+=It,ct+=Et}if(st+=ht/K*.45,ct+=X/K*.45,At&&it.drive>.03&&!Wt&&!I){const rt=Math.max(0,it.drive-st*Mt.x-ct*Mt.z);st+=Mt.x*rt,ct+=Mt.z*rt,it.pressure>.03&&(nt=Math.max(nt,Math.min(.35,it.pressure/5.2)))}}const q=m.get(E.id);if(q&&be(i,F.x+q.x*.7,F.z+q.z*.7,R)&&ho(i,F,{x:F.x+q.x,z:F.z+q.z},R)&&(st+=q.x,ct+=q.z),nt<.03&&(st+=Math.sin(i.time*.6+E.id*2.1)*.12,ct+=Math.cos(i.time*.5+E.id*1.7)*.12),jt){const j=jt.x-F.x,Z=jt.z-F.z,gt=Math.hypot(j,Z);gt>.35?(st+=j/gt*(jt.bolting?5.8:2.1),ct+=Z/gt*(jt.bolting?5.8:2.1)):(Pt(),jt=null)}if(E.wanderHome&&!Wt&&!$t){const j=E.wanderHome,Z=E.id*2.39996;st=(j.x+Math.sin(i.time*.24+Z)*1.4-F.x)*.35+Q*.2,ct=(j.z+Math.cos(i.time*.19+Z)*1.4-F.z)*.35+ft*.2}}if(Y){const q=_n(Q*Y.forward.z-ft*Y.forward.x,-.7,.7),j=E.type==="cow"?2.7:3.2;st=Y.x*j+Y.forward.z*q*.5,ct=Y.z*j-Y.forward.x*q*.5,nt=Math.max(nt,.4)}if(nt>.03&&!Y){const q=Id(i,E,st,ct,R);st+=q.x,ct+=q.z}const yt=E.wanderHome&&!zt?.75:jt?.bolting?6:E.type==="cow"?3.3:4.2,Ot=Math.hypot(st,ct);Ot>yt&&(st*=yt/Ot,ct*=yt/Ot);const fe=1-Math.exp(-n*(zt?12:E.type==="cow"?3.5:5.5));E.vx+=(st-E.vx)*fe,E.vz+=(ct-E.vz)*fe;const re=!zt&&E.wanderHome,P=re&&Math.hypot(E.x+E.vx*n-re.x,E.z+E.vz*n-re.z)>3,M=Bs(i,E,P?0:E.vx*n,P?0:E.vz*n,R);if((M.blockedX||M.blockedZ)&&nt>.03){const q=Bn(E.vx,E.vz),j=Math.min(.24,Math.hypot(E.vx,E.vz)*n);for(const Z of[Math.PI/6,-Math.PI/6,Math.PI/3,-Math.PI/3,Math.PI/2,-Math.PI/2]){const gt=(q.x*Math.cos(Z)-q.z*Math.sin(Z))*j,it=(q.x*Math.sin(Z)+q.z*Math.cos(Z))*j;if(be(i,E.x+gt,E.z+it,R)){Bs(i,E,gt,it,R);break}}}M.blockedX&&(E.vx*=.45),M.blockedZ&&(E.vz*=.45),E.heading=Math.hypot(E.vx,E.vz)>.1?Math.atan2(E.vx,E.vz):E.heading||0,E.alert=nt;const G=nr(t,i.target)<i.target.radius+12;n>0&&G&&!zt&&go(i.target,E,R)&&ho(i,t,E)&&(E.saved=!0,E.vx=0,E.vz=0,delete E.wander,delete E.wanderHome,delete E.nextWanderCheck,delete E.wanderOpportunity,delete E.buddyNavigation,delete E.bridgeCrossing,a.push({type:"animalSaved",id:E.id,animalType:E.type}))}const W=_c(i);for(const C of i.animals)!C.saved&&C.wander&&!W.has(C.id)&&(C.wanderHome={x:C.x,z:C.z},delete C.wander);const L=i.animals.filter(C=>C.saved).length;if(a.some(C=>C.type==="animalSaved")&&!i.delivery?.started){const C=bo(i);i.delivery={started:!0,duration:C,remaining:C},a.push({type:"countdownStarted",duration:C})}return L===i.animals.length&&L>0?Bh(i,"all-arrived",a,g):Mc(i,a,!1,g)}function ir(){return{version:2,points:0,upgrades:{},completedLevels:[],bestScores:{},bestEarnedBolts:{},highestLevel:0,music:!0}}const Jc=i=>80+i*25;function nv(i){const t={};if(!i||typeof i!="object"||Array.isArray(i))return t;for(const[e,n]of Object.entries(i)){const s=Number(e);String(s)!==e||!Number.isInteger(s)||s<0||s>99||!Number.isFinite(n)||n<=0||(t[s]=_n(Math.floor(n),0,Jc(s)),t[s]||delete t[s])}return t}function Kc(i){const t=ir();if(!i||typeof i!="object")return t;t.points=Number.isFinite(i.points)?_n(Math.floor(i.points),0,1e9):0,t.upgrades=Qu(i.upgrades);const e=[...new Set((Array.isArray(i.completedLevels)?i.completedLevels:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<=99))];if(t.bestEarnedBolts=nv(i.bestEarnedBolts),i.version===void 0||i.version===1)for(const n of e)t.bestEarnedBolts[n]=Jc(n);return t.bestScores={...t.bestEarnedBolts},t.completedLevels=Object.keys(t.bestEarnedBolts).map(Number).sort((n,s)=>n-s),t.highestLevel=_n(Math.max(Number.isInteger(i.highestLevel)?i.highestLevel:0,...t.completedLevels.map(n=>n+1)),0,99),t.music=i.music!==!1,t}function iv(i,t){if(!t.completed||!Number.isInteger(t.index)||t.index<0||t.index>99)return 0;const e=t.result?.saved??t.animals.filter(o=>o.saved).length;if(e<=0||!t.animals.length)return 0;Object.assign(i,Kc(i));const n=Math.min(Jc(t.index),$c(t,e)),s=i.bestEarnedBolts[t.index]||0,r=Math.max(0,n-s);return i.bestScores[t.index]=Math.max(i.bestScores[t.index]||0,n),i.bestEarnedBolts[t.index]=Math.max(s,n),i.completedLevels.includes(t.index)||i.completedLevels.push(t.index),i.completedLevels.sort((o,a)=>o-a),i.highestLevel=Math.min(99,Math.max(i.highestLevel,t.index+1)),i.points+=r,r}function sv(i,t="flock-foundry-v1"){try{return i||=globalThis.localStorage,Kc(JSON.parse(i.getItem(t)))}catch{return ir()}}function rv(i,t,e="flock-foundry-v1"){try{return t||=globalThis.localStorage,t.setItem(e,JSON.stringify(Kc(i))),!0}catch{return!1}}const Ke=(i,t=0,e=1)=>Math.max(t,Math.min(e,i));function ov(i){const t=Math.max(0,...(i.routes||[]).map(e=>Number.isFinite(e.length)?e.length:0));return Ke(t/2+bo(i),45,240)}function zs(i,t){let e=((i||0)^Math.imul(t,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),((e^e>>>15)>>>0)/4294967296}const kh=i=>i?.position?{x:i.position.x,z:i.position.z}:i,av=new kt(4350794),cv=new kt(5784367),lv=new kt(7714243);function hv(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Ke(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function va(i,t){if(!be(i,t.x,t.z,.4))return!1;for(const e of i.rivers||[]){if(e.points.some((n,s)=>s&&hv(t,e.points[s-1],n)<e.width/2+.8))return!1;for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,o=s*Math.sin(n.heading)+r*Math.cos(n.heading),a=s*Math.cos(n.heading)-r*Math.sin(n.heading);if(Math.abs(o)<n.length/2+.45&&Math.abs(a)<n.width/2+.45)return!1}}return!0}function uv(){const t=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=(n*64+s)*4,o=(Math.sin(n*.72+Math.sin(s*.31)*1.5)+Math.sin(n*1.37+s*.18))*.5,a=Math.round(145+o*28);t[r]=Math.round(a*.65),t[r+1]=a,t[r+2]=Math.min(255,a+24),t[r+3]=255}const e=new Iu(t,64,64);return e.wrapS=e.wrapT=Hn,e.repeat.set(1,5),e.magFilter=e.minFilter=mn,e.needsUpdate=!0,e}class dv{constructor(t,{maxSplashes:e=12,maxPuddles:n=8}={}){this.scene=t,this.root=new se,this.root.name="Water and wetness effects",t.add(this.root),this.maxSplashes=Math.max(0,e|0),this.maxPuddles=Math.max(0,n|0),this.elapsed=0,this.wetness=0,this.level=null,this.flowMap=uv(),this.flowMaterial=new rn({map:this.flowMap,color:9096146,transparent:!0,opacity:.16,depthWrite:!1,side:Te}),this.splashGeometry=new vo(.2,.025,4,12),this.splashes=[],this.puddles=[],this.materialSnapshots=[],this.riverSnapshots=[],this.lastMoverPositions=new Map,this.lastSplashAt=new Map}setLevel(t,{grassMaterials:e=[],pathMaterials:n=[],waterMaterial:s=null,terrain:r=null,rivers:o=[],weather:a=null}={}){this.restoreMaterials(),this.clearEffects(),this.level=t,this.terrain=r,this.rivers=o,this.wetness=0,this.elapsed=0,this.puddleGrowthDuration=ov(t),this.rainElapsed=0,this.lastMoverPositions.clear(),this.lastSplashAt.clear();for(const[h,f]of[["grass",e],["path",n]])for(const d of Array.isArray(f)?f:[f])d?.color&&this.materialSnapshots.push({material:d,kind:h,color:d.color.clone(),roughness:d.roughness});this.waterSnapshot=s?{material:s,color:s.color?.clone(),roughness:s.roughness}:null;for(const h of o){if(!h?.mesh)continue;const f=h.mesh,d=this.flowMap.clone();d.repeat.set(1,1);const g=this.flowMaterial.clone();g.map=d,g.userData.ownedFlowMap=d;const x=f.geometry.clone(),p=x.attributes.position,m=x.attributes.uv,y=h.points;if(y?.length>1){for(let _=0;_<p.count;_++){const A=p.getX(_),T=p.getZ(_);let D=1/0,N=0,b=0,S=0;for(let U=1;U<y.length;U++){const k=y[U-1],W=y[U],L=W.x-k.x,C=W.z-k.z,E=Math.hypot(L,C);if(!E)continue;const F=Ke(((A-k.x)*L+(T-k.z)*C)/(E*E)),R=A-k.x-F*L,B=T-k.z-F*C,Y=R*R+B*B;Y<D&&(D=Y,N=S+F*E,b=(-C*R+L*B)/E),S+=E}m.setXY(_,b/Math.max(1,h.width||4),N/4)}m.needsUpdate=!0}const v=new ie(x,g);v.name="River flow",v.position.copy(f.position),v.position.y+=.003,v.rotation.copy(f.rotation),v.scale.copy(f.scale),v.frustumCulled=f.frustumCulled,v.userData.flow={heading:h.heading||0,speed:h.flowSpeed??.12,localUV:y?.length>1},this.root.add(v)}for(let h=0;h<this.maxSplashes;h++){const f=new rn({color:13233904,transparent:!0,opacity:.78,depthWrite:!1}),d=new ie(this.splashGeometry,f);d.visible=!1,d.rotation.x=-Math.PI/2,this.root.add(d),this.splashes.push({mesh:d,material:f,age:1})}const c=new kc(1,20);this.puddleResources={geometry:c};const l=t.seed??t.index??0,u=zs(l,71)<.5?0:1+Math.floor(zs(l,72)*3);for(const h of this.findPuddleSites()){const f=new rn({color:4549225,transparent:!0,opacity:.2,depthWrite:!1,side:Te}),d=new ie(c,f);d.rotation.x=-Math.PI/2,d.visible=!1,d.position.set(h.x,Ti(t,h.x,h.z)+.024,h.z),d.scale.set(h.radius,h.radius*.62,1),this.root.add(d),this.puddles.push({mesh:d,material:f,depth:0,site:h,initialDepth:this.puddles.length<u?.1+zs(l,80+this.puddles.length)*.1:0})}if(a){this.wetness=a.kind==="storm"?.6:a.kind==="heavy-rain"?.35:a.type==="rain"?.03:0;for(const h of this.puddles)h.depth=a.type==="rain"?h.initialDepth:0,this.applyPuddleAppearance(h);this.applySurfaceWeather(a)}}findPuddleSites(){const t=this.level,e=t.bounds,n=[],s=e.maxX-e.minX,r=e.maxZ-e.minZ,o=t.seed??t.index??0,a=(l,u)=>{const{x:h,z:f}=l,d=Array.from({length:48},(g,x)=>{const p=1+Math.floor(x/16),m=x%16*Math.PI/8;return{x:h+Math.cos(m)*u*p/3,z:f+Math.sin(m)*u*.62*p/3}});return!va(t,l)||d.some(g=>!va(t,g))||n.some(g=>Math.hypot(g.x-h,g.z-f)<g.radius+u+.3)?!1:(n.push({...l,radius:u}),!0)},c=(t.routes||[]).filter(l=>l.points?.length>1);for(let l=0;l<this.maxPuddles&&c.length;l++){const u=c[l%c.length],h=u.points,f=h.slice(1).map((p,m)=>Math.hypot(p.x-h[m].x,p.z-h[m].z)),d=f.reduce((p,m)=>p+m,0),g=1.35+zs(o,150+l)*.69,x=l/Math.max(1,this.maxPuddles-1);for(let p=0;p<35;p++){let m=Ke(x+(p<7?0:(Math.ceil((p-6)/7)%2?1:-1)*.035))*d,y=0;for(;y<f.length-1&&m>f[y];)m-=f[y++];const v=h[y],_=h[y+1],A=f[y]||1,T=Ke(m/A),D=[0,2.5,-2.5,4,-4,6,-6][p%7]*(zs(o,200+l)<.5?-1:1),N={x:v.x+(_.x-v.x)*T-(_.z-v.z)/A*D,z:v.z+(_.z-v.z)*T+(_.x-v.x)/A*D};if(a(N,g))break}}for(let l=1;l<Math.max(100,this.maxPuddles*80)&&n.length<this.maxPuddles;l++){const u=e.minX+2+l*.61803398875%1*Math.max(1,s-4),h=e.minZ+2+l*.75487766625%1*Math.max(1,r-4);a({x:u,z:h},1.35+l*37%70/100)}return n}applyPuddleAppearance(t){const e=Math.sqrt(t.depth);t.mesh.scale.set(t.site.radius*e,t.site.radius*.62*e,1),t.mesh.visible=t.depth>.008,t.material.opacity=t.mesh.visible?.18+t.depth*.24:0}restoreMaterials(){for(const t of this.materialSnapshots)t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color.dispose?.();if(this.materialSnapshots=[],this.waterSnapshot){const t=this.waterSnapshot;t.color&&t.material.color&&t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color?.dispose?.(),this.waterSnapshot=null}}clearEffects(){for(const t of this.splashes)this.root.remove(t.mesh),t.material.dispose();for(const t of this.puddles)this.root.remove(t.mesh),t.material.dispose();this.splashes=[],this.puddles=[],this.puddleResources&&(this.puddleResources.geometry.dispose(),this.puddleResources=null);for(const t of[...this.root.children])t.name==="River flow"&&(this.root.remove(t),t.material.userData.ownedFlowMap?.dispose(),t.material.dispose(),t.geometry.dispose())}applySurfaceWeather(t={}){const e=t.type==="rain"?Ke(t.rainIntensity??t.intensity??0):0;for(const n of this.materialSnapshots){const s=this.wetness*(n.kind==="grass"?.62:.85);n.material.color.copy(n.color).lerp(n.kind==="grass"?av:cv,s),n.roughness!==void 0&&(n.material.roughness=Math.max(.28,n.roughness-this.wetness*.22))}if(this.waterSnapshot){const n=this.waterSnapshot,s=Ke(t.cloudCoverage??0);n.material.color&&n.color&&n.material.color.copy(n.color).lerp(lv,Ke((t.rainIntensity??e)*.11+s*.035+(t.severity||0)*.025+(t.lightningFlash||0)*.09)),n.roughness!==void 0&&(n.material.roughness=Ke(n.roughness-(t.rainIntensity??e)*.16,.12,1))}}update(t,{weather:e={},movers:n=[],paused:s=!1}={}){if(!this.level||s||!(t>0))return;t=Math.min(t,.1),this.elapsed+=t;const r=e.type==="rain"?Ke(e.rainIntensity??e.intensity??0):0;this.wetness=Ke(this.wetness+r*t*.012-t*(e.type==="sun"?.004:.0012)),this.applySurfaceWeather(e);for(const o of this.root.children)if(o.userData.flow){const a=o.userData.flow,c=o.material.map,l=t*(a.speed+(e.windIntensity||0)*.025);c.offset.x=(c.offset.x+(a.localUV?0:Math.sin(a.heading))*l)%1,c.offset.y=(c.offset.y+(a.localUV?1:Math.cos(a.heading))*l)%1,o.material.opacity=.08+r*.18+(e.daylight??.7)*.025+(e.lightningFlash||0)*.2}r>0&&(this.rainElapsed+=t);for(const o of this.puddles)o.depth=r>0?Ke(o.initialDepth+(1-o.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):Ke(o.depth-t*(e.type==="sun"?.006:8e-4)),this.applyPuddleAppearance(o);for(const o of n){const a=kh(o);if(!a||!Number.isFinite(a.x)||!Number.isFinite(a.z))continue;const c=o.id??o.kind??"mover",l=kh(o.previousPosition)||(Number.isFinite(o.previousX)?{x:o.previousX,z:o.previousZ}:this.lastMoverPositions.get(c)),u=l&&Math.hypot(a.x-l.x,a.z-l.z)>.008,h=this.puddles.find(f=>f.mesh.visible&&(a.x-f.site.x)**2/f.site.radius**2+(a.z-f.site.z)**2/(f.site.radius*.62)**2<f.depth);u&&h&&va(this.level,a)&&this.elapsed-(this.lastSplashAt.get(c)||-10)>.22&&(this.spawnSplash(a),this.lastSplashAt.set(c,this.elapsed)),this.lastMoverPositions.set(c,{x:a.x,z:a.z})}for(const o of this.splashes)o.age>=1||(o.age=Math.min(1,o.age+t*2.4),o.mesh.scale.setScalar(.4+o.age*2.3),o.mesh.position.y=.06+Ti(this.level,o.mesh.position.x,o.mesh.position.z)+o.age*.06,o.material.opacity=.78*(1-o.age),o.age>=1&&(o.mesh.visible=!1))}spawnSplash(t){const e=this.splashes.find(n=>n.age>=1);e&&(e.age=0,e.mesh.position.set(t.x,Ti(this.level,t.x,t.z)+.08,t.z),e.mesh.scale.setScalar(.35),e.mesh.visible=!0)}dispose(){this.restoreMaterials(),this.clearEffects(),this.root.removeFromParent(),this.flowMap.dispose(),this.flowMaterial.dispose(),this.splashGeometry.dispose(),this.level=null,this.scene=null}}const rd={sun:{rainIntensity:0,windIntensity:.12,severity:0,cloudCoverage:.22,daylight:1},wind:{rainIntensity:0,windIntensity:.6,severity:.3,cloudCoverage:.4,daylight:.96},rain:{rainIntensity:.3,windIntensity:.3,severity:.28,cloudCoverage:.5,daylight:.94},"heavy-rain":{rainIntensity:.65,windIntensity:.55,severity:.6,cloudCoverage:.7,daylight:.82},storm:{rainIntensity:.9,windIntensity:.85,severity:.88,cloudCoverage:.85,daylight:.7}};function jc(i,t){let e=(i^Math.imul(t+1,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),(e^e>>>15)>>>0}function fv(i,t,e){const n=e+1;if(n<=5)return"sun";const s=typeof i.weather=="string"?i.weather:i.weather?.kind||i.weather?.type,r=s==="light-rain"||s==="snow"?"rain":s;if(r&&rd[r])return r==="sun"||r==="wind"?r:n<9?"sun":r==="storm"&&n>=24?"storm":(r==="storm"||r==="heavy-rain")&&n>=16?"heavy-rain":"rain";if(n===9)return"rain";if(n===16)return"heavy-rain";if(n===24)return"storm";const o=jc(t,e)/4294967296;return n<9?o<.65?"sun":"wind":n<16?o<.35?"sun":o<.5?"wind":"rain":n<24?o<.25?"sun":o<.35?"wind":o<.65?"rain":"heavy-rain":o<.2?"sun":o<.3?"wind":o<.5?"rain":o<.75?"heavy-rain":"storm"}function od(i={}){const t=Number.isFinite(i.index)?Math.max(0,Math.floor(i.index)):0,e=Number.isFinite(i.seed)?i.seed>>>0:42,n=fv(i,e,t),s=rd[n];return{...s,kind:n,type:n==="heavy-rain"||n==="storm"?"rain":n,snowIntensity:0,storm:n==="storm",elapsed:0,seed:e,levelIndex:t,intensity:Math.max(s.rainIntensity,n==="wind"?s.windIntensity:0),wind:.2+s.windIntensity*1.6,particles:s.rainIntensity>0?128:0,lightningId:null,lightningAge:1/0,thunderDelay:.8,lightningFlash:0,clouds:0,butterflies:n==="storm"?0:s.rainIntensity>0?4:8,birds:n==="storm"?0:5,squirrels:n==="storm"?0:3,lightningStart:8+jc(e,t+1e3)%401/100,lightningInterval:24}}function pv(i,t){if(Number.isFinite(t)&&t>0&&(i.elapsed+=t),!i.storm)return i;const e=Math.floor((i.elapsed-i.lightningStart)/i.lightningInterval);return e<0||(i.lightningId=`${i.seed}:${i.levelIndex}:${e}`,i.lightningAge=Math.max(0,i.elapsed-(i.lightningStart+e*i.lightningInterval)),i.thunderDelay=.8+jc(i.seed,i.levelIndex+e+2e3)%9/10,i.lightningFlash=i.lightningAge<.22?.9*(1-i.lightningAge/.22):0),i}const Xs=(i,t,e)=>Math.max(t,Math.min(e,i)),uo=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Qc=i=>()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);function mv(i,t=od(i)){if(t.kind==="storm"||t.storm)return{squirrel:0,rabbit:0,bird:0,butterfly:0};const e=(i.bounds.maxX-i.bounds.minX)*(i.bounds.maxZ-i.bounds.minZ),n=Qc((i.seed||42)^1464421444),s=Xs(e/3600,.55,2.4),r=(o,a)=>Math.min(a,Math.max(1,Math.round(o*s*(.78+n()*.44))));return{squirrel:r(2,7),rabbit:r(2,8),bird:Math.min(6,Math.max(2,Math.round(3*s))),butterfly:Math.min(8,Math.max(0,Math.round(5*s)))}}function gv(i,t){let e=1/0;for(const n of i.roads||[]){const s=n.points||[n.from,n.to];for(let r=1;r<s.length;r++){const o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,u=Xs(((t.x-o.x)*c+(t.z-o.z)*l)/(c*c+l*l||1),0,1);e=Math.min(e,Math.hypot(t.x-o.x-c*u,t.z-o.z-l*u))}}return e}const Vh=new WeakMap;function xv(i,t){let e=Vh.get(i);e||(e=new Map,Vh.set(i,e));let n=e.get(t);if(!n||n.sourceRivers!==i.rivers||n.sourceObstacles!==i.obstacles||n.sourceFenceSegments!==i.fenceSegments||n.targetType!==i.target?.type){const s=i.bounds,r=(i.fenceSegments||[]).filter(o=>o.kind==="wall"||o.kind==="stone"||o.material==="stone"||o.kind==="target"&&i.target?.type==="barn");n={...i,sourceRivers:i.rivers,sourceObstacles:i.obstacles,sourceFenceSegments:i.fenceSegments,targetType:i.target?.type,fenceSegments:r,bounds:{minX:s.minX-t-1,maxX:s.maxX+t+1,minZ:s.minZ-t-1,maxZ:s.maxZ+t+1}},e.set(t,n)}return n}function tl(i,t,e=.45){const n=i.bounds;return t.x>=n.minX-e&&t.x<=n.maxX+e&&t.z>=n.minZ-e&&t.z<=n.maxZ+e&&be(xv(i,e),t.x,t.z,.4)}function _v(i,t,e=[],n=.45){return gv(i,t)>5.5&&tl(i,t,n)&&e.every(s=>uo(t,s)>8)}const vv={butterfly:.54,squirrel:.58,bird:.64,rabbit:.76};function Mv(i,t){let e=null,n=18;for(const s of i.obstacles||[]){const r=uo(t,s);if(r>=n||r<.01)continue;const o=s.radius+.85,a=(t.x-s.x)/r,c=(t.z-s.z)/r,l={x:s.x+a*o,z:s.z+c*o};tl(i,l,.2)&&(e=l,n=r)}return e||{x:t.homeX,z:t.homeZ}}function yv(i){const t=Qc(i.randomSeed||(Math.floor((i.phase||0)*1e6)^i.slot||1)>>>0);i.randomSeed=Math.floor(t()*4294967295)||1;const e=t()*Math.PI*2,n=3+t()*8;i.waypointX=i.homeX+Math.cos(e)*n,i.waypointZ=i.homeZ+Math.sin(e)*n,i.waitTimer=0}function Sv(i,t,e,n=[],s=0,r=i.weather,o=tl){const a=typeof r=="function";if(a&&(o=r,r=i.weather),!(e>0))return t;const c=t.x,l=t.z,u=Xs(Number(r?.severity)||0,0,1),h=vv[t.kind]??.64;u>=h?t.sheltering=!0:u<h-.12&&(t.sheltering=!1);const f=t.kind==="bird"?10:t.kind==="butterfly"?6:7.5;let d=!1,g=0,x=0;for(const T of n){const D=uo(t,T);D<f&&(d=!0,g+=(t.x-T.x)/Math.max(.1,D)*(f-D),x+=(t.z-T.z)/Math.max(.1,D)*(f-D))}if(d)t.fleeing||(t.homeX=t.x,t.homeZ=t.z),t.waypointX=void 0,t.waypointZ=void 0,t.alertTimer=1.15,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,t.shelterX=void 0;else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.sheltering){if(t.shelterX===void 0){const T=Mv(i,t);t.shelterX=T.x,t.shelterZ=T.z}t.shelter=Math.min(1,(t.shelter||0)+e*.32),g=t.shelterX-t.x,x=t.shelterZ-t.z}else if(t.shelter=Math.max(0,(t.shelter||0)-e*.48),t.hidden=t.shelter>=.995,t.shelterX!==void 0&&t.shelter===0&&(t.shelterX=void 0,t.shelterZ=void 0,t.waypointX=void 0),t.alertTimer>0)g=x=0;else if((t.waitTimer||0)>0)t.waitTimer=Math.max(0,t.waitTimer-e),g=x=0;else if(t.waypointX!==void 0&&uo(t,{x:t.waypointX,z:t.waypointZ})<.45){const T=Qc(t.randomSeed||1);t.randomSeed=Math.floor(T()*4294967295)||1,t.waypointX=void 0,t.waypointZ=void 0,t.waitTimer=.55+T()*2.1,g=x=0}else t.waypointX===void 0&&yv(t),g=t.waypointX-t.x,x=t.waypointZ-t.z;let p=Math.hypot(g,x);if(d&&p<.01){const T=Number.isFinite(t.heading)?t.heading:t.phase||0;g=Math.sin(T),x=Math.cos(T),p=1}const m=t.kind==="rabbit",y=((t.gait||0)%1+1)%1,v=!m||y<.54;let _=d?t.kind==="bird"?5.2:m?4.2:3.5:t.kind==="squirrel"?.9:m?3.5:t.kind==="bird"?1.4:.8;t.sheltering&&!d&&(_=.95);const A=p>.01&&v?Math.min(p,e*_):0;if(A){const T=t.x+g/p*A,D=t.z+x/p*A,N=b=>a?o(i,b.x,b.z,.4):o(i,b,.45);t.kind==="bird"||N({x:T,z:D})?(t.x=T,t.z=D):N({x:T,z:t.z})?t.x=T:N({x:t.x,z:D})&&(t.z=D)}if(t.moving=Math.hypot(t.x-c,t.z-l)>.001,t.moving)t.heading=Math.atan2(t.x-c,t.z-l),t.stuckTimer=0;else if(A>.001&&(t.stuckTimer=(t.stuckTimer||0)+e,t.stuckTimer>=1)){const T=i.bounds;t.waypointX=t.x>T.maxX-.2?T.maxX-1.2:t.x<T.minX+.2?T.minX+1.2:Xs(t.homeX,T.minX+1.2,T.maxX-1.2),t.waypointZ=t.z>T.maxZ-.2?T.maxZ-1.2:t.z<T.minZ+.2?T.minZ+1.2:Xs(t.homeZ,T.minZ+1.2,T.maxZ-1.2),t.shelterX=void 0,t.shelterZ=void 0,t.stuckTimer=0,t.waitTimer=.2}return t.fleeing=d,t.alert=d||t.alertTimer>0,t.gait=(t.gait||0)+e*(d?1.8:m?1.35:t.kind==="squirrel"?1.7:1.2),t.hidden=t.shelter>=.995&&!d,t}const ad={squirrel:[{part:"body",at:[0,.31,0],scale:[.2,.23,.32],color:"#a97552"},{part:"head",at:[0,.47,.2],scale:[.17,.17,.17],color:"#bd8960"},{part:"tail",at:[0,.48,-.34],scale:[.2,.31,.19],color:"#8e5b3e",tilt:-.48},{part:"ear",at:[-.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"ear",at:[.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"paw",at:[-.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"eye",at:[-.105,.5,.33],scale:[.025,.03,.018],color:"#171819"},{part:"eye",at:[.105,.5,.33],scale:[.025,.03,.018],color:"#171819"}],rabbit:[{part:"body",at:[0,.31,-.02],scale:[.25,.27,.34],color:"#d6c7aa"},{part:"haunch",at:[0,.25,-.23],scale:[.23,.23,.22],color:"#c4b08f"},{part:"head",at:[0,.48,.25],scale:[.17,.17,.17],color:"#e4d6bd"},{part:"ear",at:[-.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"ear",at:[.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"tail",at:[0,.34,-.4],scale:[.095,.1,.095],color:"#f0e9dc"},{part:"paw",at:[-.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"eye",at:[-.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"},{part:"eye",at:[.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"}]};function bv(i){const t=[],e=[],n=[],s=new Ii(1,10,8).toNonIndexed(),r=s.getAttribute("position"),o=s.getAttribute("normal"),a=new kt,c=new Xt;for(const u of ad[i]){if(u.part==="paw")continue;const h=new Mn(u.tilt||0,0,0),f=new Qt().compose(new z(...u.at),new Gn().setFromEuler(h),new z(...u.scale));c.getNormalMatrix(f),a.set(u.color);for(let d=0;d<r.count;d++){const g=new z().fromBufferAttribute(r,d).applyMatrix4(f),x=new z().fromBufferAttribute(o,d).applyMatrix3(c).normalize();t.push(g.x,g.y,g.z),e.push(x.x,x.y,x.z),n.push(a.r,a.g,a.b)}}s.dispose();const l=new ve;return l.setAttribute("position",new Zt(t,3)),l.setAttribute("normal",new Zt(e,3)),l.setAttribute("color",new Zt(n,3)),l.computeBoundingSphere(),l}const wv={light:96,heavy:176,storm:256},Ev={light:16,heavy:23,storm:30},Fn=1.25;class Tv{constructor(t){this.root=new se,this.root.name="Visible rain",t.add(this.root),this.geometry=new ve,this.material=new zu({color:"#e5f2f4",transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1}),this.lines=new sp(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=20,this.root.add(this.lines),this.randomState=8029,this.positions=new Float32Array(0),this.drops=[],this.active=0,this.fallbackCamera=new Mo(-30,30,20,-20,.1,180),this.fallbackCamera.position.set(0,36,29),this.fallbackCamera.lookAt(0,0,-2)}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}resize(t){t!==this.active&&(this.active=t,this.positions=new Float32Array(t*6),this.drops=Array.from({length:t},()=>({x:(this.random()*2-1)*Fn,y:(this.random()*2-1)*Fn})),this.geometry.setAttribute("position",new Ge(this.positions,3)),this.geometry.setDrawRange(0,t*2))}update(t,{weather:e={},camera:n=this.fallbackCamera,paused:s=!1}={}){const r=e.kind||e.type,o=Math.max(0,Math.min(1,e.rainIntensity??e.intensity??0)),a=r==="storm"||e.severity>=.78?"storm":r==="heavy-rain"||o>=.68?"heavy":r==="rain"&&o>.02?"light":null;if(this.resize(a?wv[a]:0),!this.active)return;this.material.opacity=a==="light"?.48:a==="heavy"?.6:.7;const c=s?0:Math.min(.1,Math.max(0,Number(t)||0)),l=Math.max(-8,Math.min(8,e.windIntensity??e.wind??0)),u=Ev[a],h=a==="storm"?(l<0?-1:1)*Math.max(10,Math.abs(l)*16):l*3,f=new z(h,-u,0),d=a==="light"?.8:a==="heavy"?1.3:1.8;n.updateMatrixWorld(!0);const x=new z(0,0,0).unproject(n).clone().add(f).project(n);for(let p=0;p<this.active;p++){const m=this.drops[p];m.x+=x.x*c,m.y+=x.y*c,m.y<-Fn&&(m.y+=Fn*2,m.x=(this.random()*2-1)*Fn),m.x>Fn&&(m.x-=Fn*2),m.x<-Fn&&(m.x+=Fn*2);const y=new z(m.x,m.y,0).unproject(n),v=y.clone().addScaledVector(f,d/u);y.toArray(this.positions,p*6),v.toArray(this.positions,p*6+3)}this.geometry.attributes.position.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose(),this.root.removeFromParent()}}const Av=(i,t,e)=>Math.max(t,Math.min(e,i));function Rv(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}class Cv{constructor(t){this.scene=t,this.root=new se,this.root.name="Meadow nature",t.add(this.root),this.resources=new Set,this.time=0,this.wildlife=[],this.batches={},this.transform=new _e}own(t){return this.resources.add(t),t}clear(){this.root.traverse(t=>{t.isInstancedMesh&&t.dispose()}),this.root.clear(),this.resources.forEach(t=>t.dispose()),this.resources.clear(),this.rainView?.dispose(),this.rainView=null,this.wildlife=[],this.batches={},this.precipitation=null}batch(t,e,n,s){const r=new Ei(e,n,s);return r.instanceMatrix.setUsage(io),r.frustumCulled=!1,this.root.add(r),this.batches[t]=r,r}setLevel(t){this.clear(),this.level=t,this.time=0,this.weather=od(t);const e=Rv((t.seed||42)+71053),n=t.bounds,s=n.maxX-n.minX,r=n.maxZ-n.minZ,o=[t.dog||t.spawn,...t.animals||[]].filter(Boolean),a=this.own(new Ii(1,10,8)),c=mv(t),l=["butterfly","bird","squirrel","rabbit"];for(const h of l){const f=c[h]||0;if(f)for(let d=0;d<f;d++){let g=null;for(let x=0;x<240;x++){const p=(t.roads||[]).flatMap(A=>A.points||[A.from,A.to]).filter(Boolean),m=x<120&&p.length?p[Math.floor(e()*p.length)]:null,y=e()*Math.PI*2,v=8+e()*13,_=m?{x:m.x+Math.cos(y)*v,z:m.z+Math.sin(y)*v}:{x:n.minX+2+e()*(s-4),z:n.minZ+2+e()*(r-4)};if(_v(t,_,o,.5)){g=_;break}}this.wildlife.push({kind:h,slot:d,x:g?.x??0,z:g?.z??0,homeX:g?.x??0,homeZ:g?.z??0,phase:e()*Math.PI*2,heading:e()*Math.PI*2,visible:!!g,gait:0,hidden:!1,hideTimer:0})}}const u={bird:["#54777b","#91adb0"],butterfly:["#65523f","#f2ac75"]};for(const h of["bird","butterfly"]){const f=c[h]||0;if(!f)continue;const[d,g]=u[h];this.batch(`${h}Body`,a,this.own(new ge({color:d,roughness:1})),f),this.batch(`${h}Wing`,a,this.own(new ge({color:g,roughness:1})),f*2)}for(const h of["squirrel","rabbit"]){const f=c[h]||0;if(!f)continue;this.batch(`${h}Body`,this.own(bv(h)),this.own(new ge({vertexColors:!0,roughness:.94})),f);const d=h==="squirrel"?"#74503b":"#b09b7c";this.batch(`${h}Paw`,a,this.own(new ge({color:d,roughness:.94})),f*2)}this.rainView=new Tv(this.root),this.update(0,{dog:t.dog||t.spawn,animals:t.animals})}pose(t,e,n,s,r,o,a,c,l=0,u=0,h=0){const f=this.transform;f.position.set(n,s,r),f.rotation.set(h,l,u),f.scale.set(o,a,c),f.updateMatrix(),t.setMatrixAt(e,f.matrix)}hideParts(t){if(t.kind==="bird"||t.kind==="butterfly"){this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Wing`],t.slot*2+e,0,-100,0,0,0,0)}else{this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Paw`],t.slot*2+e,0,-100,0,0,0,0)}}update(t,{dog:e,animals:n=[],camera:s,paused:r=!1}={}){if(!this.level)return;t=r?0:Av(Number(t)||0,0,.1),this.time+=t,pv(this.weather,t);const o=this.time,a=[e,...n,...this.level.helpers||[]].filter(Boolean);for(const c of this.wildlife){if(Sv(this.level,c,t,a,o,this.weather),!c.visible||c.hidden){this.hideParts(c);continue}const l=c.kind==="bird"||c.kind==="butterfly",u=c.kind==="squirrel",h=c.kind==="rabbit",f=((c.gait||0)%1+1)%1,d=f<.54,g=h&&c.moving&&d?Math.sin(f/.54*Math.PI)*.24:u&&c.moving?Math.abs(Math.sin(f*Math.PI*2))*.1:0,x=Math.max(.06,1-(c.shelter||0)*.94),p=(u?.12:h?.04:l?3.2:1)+Ti(this.level,c.x,c.z)+(l?Math.sin(o*(c.kind==="bird"?1.5:2)+c.phase)*.28:g)+(c.alert?.08:0);if(u||h){const m=h&&!d?.9:1,y=h&&d?-.14*Math.sin(f/.54*Math.PI):0,v=u&&c.moving?Math.sin(f*Math.PI*2)*.06:0;this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,p,c.z,x,x*m,x,c.heading,v,y);const _=ad[c.kind].filter(A=>A.part==="paw");for(let A=0;A<_.length;A++){const T=_[A],D=c.moving?h&&d?Math.sin(f/.54*Math.PI)*.08:Math.sin(f*Math.PI*2+A*Math.PI)*.07:0,N=T.at[0],b=T.at[2],S=c.x+Math.cos(c.heading)*N+Math.sin(c.heading)*b,U=c.z-Math.sin(c.heading)*N+Math.cos(c.heading)*b;this.pose(this.batches[`${c.kind}Paw`],c.slot*2+A,S,p+T.at[1]*x+D,U,T.scale[0]*x,T.scale[1]*x,T.scale[2]*x,c.heading)}}else{this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,p,c.z,(c.kind==="bird"?.09:.075)*x,(c.kind==="bird"?.08:.06)*x,(c.kind==="bird"?.28:.12)*x,c.heading);for(let m=0;m<2;m++){const y=Math.sin(o*(c.kind==="bird"?11:18)+c.phase)*(c.kind==="bird"?.5:.85);this.pose(this.batches[`${c.kind}Wing`],c.slot*2+m,c.x+(m?1:-1)*.15,p+.04,c.z,.22*x,.025*x,.16*x,c.heading,(m?1:-1)*y)}}}for(const c of Object.values(this.batches))c.instanceMatrix.needsUpdate=!0;this.rainView?.update(t,{weather:this.weather,camera:s,paused:r})}dispose(){this.clear(),this.scene.remove(this.root),this.level=null}}const eo=0,Pv=1,Lv=new z,Hh=new qp,Ma=new Qn,Gh=new z,Xr=new Qe;class Dv{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Wh,this.unassigned=new Wh,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new Iv(t[e]));this._compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){const s=n.geometry;if(s!==void 0){const r=s.attributes.position;if(r!==void 0)for(let o=0,a=r.count;o<a;o++){const c=new z;c.fromBufferAttribute(r,o).applyMatrix4(n.matrixWorld),e.push(c)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,s=e.length;n<s;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let s=-1/0,r=1/0;for(let o=0,a=n.length;o<a;o++){const c=n[o],l=c.distanceToPoint(t.origin),u=c.normal.dot(t.direction);if(l>0&&u>=0)return null;const h=u!==0?-l/u:0;if(!(h<=0)&&(u>0?r=Math.min(h,r):s=Math.max(h,s),s>r))return null}return s!==-1/0?t.at(s,e):t.at(r,e),e}intersectsRay(t){return this.intersectRay(t,Lv)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}_removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}_removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}_deleteFaceVertices(t,e){const n=this._removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let s=n;do{const r=s.next;e.distanceToPoint(s.point)>this.tolerance?this._addVertexToFace(s,e):this.unassigned.append(s),s=r}while(s!==null)}return this}_resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const n=e.next;let s=this.tolerance,r=null;for(let o=0;o<t.length;o++){const a=t[o];if(a.mark===eo){const c=a.distanceToPoint(e.point);if(c>s&&(s=c,r=a),s>1e3*this.tolerance)break}}r!==null&&this._addVertexToFace(e,r),e=n}while(e!==null)}return this}_computeExtremes(){const t=new z,e=new z,n=[],s=[];for(let r=0;r<3;r++)n[r]=s[r]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let r=0,o=this.vertices.length;r<o;r++){const a=this.vertices[r],c=a.point;for(let l=0;l<3;l++)c.getComponent(l)<t.getComponent(l)&&(t.setComponent(l,c.getComponent(l)),n[l]=a);for(let l=0;l<3;l++)c.getComponent(l)>e.getComponent(l)&&(e.setComponent(l,c.getComponent(l)),s[l]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:s}}_computeInitialHull(){const t=this.vertices,e=this._computeExtremes(),n=e.min,s=e.max;let r=0,o=0;for(let f=0;f<3;f++){const d=s[f].point.getComponent(f)-n[f].point.getComponent(f);d>r&&(r=d,o=f)}const a=n[o],c=s[o];let l,u;r=0,Hh.set(a.point,c.point);for(let f=0,d=this.vertices.length;f<d;f++){const g=t[f];if(g!==a&&g!==c){Hh.closestPointToPoint(g.point,!0,Gh);const x=Gh.distanceToSquared(g.point);x>r&&(r=x,l=g)}}r=-1,Ma.setFromCoplanarPoints(a.point,c.point,l.point);for(let f=0,d=this.vertices.length;f<d;f++){const g=t[f];if(g!==a&&g!==c&&g!==l){const x=Math.abs(Ma.distanceToPoint(g.point));x>r&&(r=x,u=g)}}const h=[];if(Ma.distanceToPoint(u.point)<0){h.push(un.create(a,c,l),un.create(u,c,a),un.create(u,l,c),un.create(u,a,l));for(let f=0;f<3;f++){const d=(f+1)%3;h[f+1].getEdge(2).setTwin(h[0].getEdge(d)),h[f+1].getEdge(1).setTwin(h[d+1].getEdge(0))}}else{h.push(un.create(a,l,c),un.create(u,a,c),un.create(u,c,l),un.create(u,l,a));for(let f=0;f<3;f++){const d=(f+1)%3;h[f+1].getEdge(2).setTwin(h[0].getEdge((3-f)%3)),h[f+1].getEdge(0).setTwin(h[d+1].getEdge(1))}}for(let f=0;f<4;f++)this.faces.push(h[f]);for(let f=0,d=t.length;f<d;f++){const g=t[f];if(g!==a&&g!==c&&g!==l&&g!==u){r=this.tolerance;let x=null;for(let p=0;p<4;p++){const m=this.faces[p].distanceToPoint(g.point);m>r&&(r=m,x=this.faces[p])}x!==null&&this._addVertexToFace(g,x)}}return this}_reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];n.mark===eo&&t.push(n)}return this.faces=t,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const n=this.assigned.first().face;let s=n.outside;do{const r=n.distanceToPoint(s.point);r>e&&(e=r,t=s),s=s.next}while(s!==null&&s.face===n);return t}}_computeHorizon(t,e,n,s){this._deleteFaceVertices(n),n.mark=Pv;let r;e===null?r=e=n.getEdge(0):r=e.next;do{const o=r.twin,a=o.face;a.mark===eo&&(a.distanceToPoint(t)>this.tolerance?this._computeHorizon(t,o,a,s):s.push(r)),r=r.next}while(r!==e);return this}_addAdjoiningFace(t,e){const n=un.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}_addNewFaces(t,e){this.newFaces=[];let n=null,s=null;for(let r=0;r<e.length;r++){const o=e[r],a=this._addAdjoiningFace(t,o);n===null?n=a:a.next.setTwin(s),this.newFaces.push(a.face),s=a}return n.next.setTwin(s),this}_addVertexToHull(t){const e=[];return this.unassigned.clear(),this._removeVertexFromFace(t,t.face),this._computeHorizon(t.point,null,t.face,e),this._addNewFaces(t,e),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let t;for(this._computeInitialHull();(t=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(t);return this._reindexFaces(),this._cleanup(),this}}class un{constructor(){this.normal=new z,this.midpoint=new z,this.area=0,this.constant=0,this.outside=null,this.mark=eo,this.edge=null}static create(t,e,n){const s=new un,r=new ya(t,s),o=new ya(e,s),a=new ya(n,s);return r.next=a.prev=o,o.next=r.prev=a,a.next=o.prev=r,s.edge=r,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return Xr.set(t.point,e.point,n.point),Xr.getNormal(this.normal),Xr.getMidpoint(this.midpoint),this.area=Xr.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class ya{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class Iv{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class Wh{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class zv extends ve{constructor(t=[]){super();const e=[],n=[],r=new Dv().setFromPoints(t).faces;for(let o=0;o<r.length;o++){const a=r[o];let c=a.edge;do{const l=c.head().point;e.push(l.x,l.y,l.z),n.push(a.normal.x,a.normal.y,a.normal.z),c=c.next}while(c!==a.edge)}this.setAttribute("position",new Zt(e,3)),this.setAttribute("normal",new Zt(n,3))}}function Uv(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new ve;let l=0;for(let u=0;u<i.length;++u){const h=i[u];let f=0;if(e!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in h.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(h.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in h.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(h.morphAttributes[d])}if(t){let d;if(e)d=h.index.count;else if(h.attributes.position!==void 0)d=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,u),l+=d}}if(e){let u=0;const h=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let g=0;g<d.count;++g)h.push(d.getX(g)+u);u+=i[f].attributes.position.count}c.setIndex(h)}for(const u in r){const h=Xh(r[u]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;c.setAttribute(u,h)}for(const u in o){const h=o[u][0].length;if(h===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[u]=[];for(let f=0;f<h;++f){const d=[];for(let x=0;x<o[u].length;++x)d.push(o[u][x][f]);const g=Xh(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;c.morphAttributes[u].push(g)}}return c}function Xh(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const u=i[l];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Ge(o,e,n);let c=0;for(let l=0;l<i.length;++l){const u=i[l];if(u.isInterleavedBufferAttribute){const h=c/e;for(let f=0,d=u.count;f<d;f++)for(let g=0;g<e;g++){const x=u.getComponent(f,g);a.setComponent(f+h,g,x)}}else o.set(u.array,c);c+=u.count*e}return s!==void 0&&(a.gpuType=s),a}function Nv(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},u=[],h=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let y=0,v=a.length;y<v;y++){const _=a[y],A=i.attributes[_];c[_]=new A.constructor(new A.array.constructor(A.count*A.itemSize),A.itemSize,A.normalized);const T=i.morphAttributes[_];T&&(l[_]||(l[_]=[]),T.forEach((D,N)=>{const b=new D.array.constructor(D.count*D.itemSize);l[_][N]=new D.constructor(b,D.itemSize,D.normalized)}))}const d=t*.5,g=Math.log10(1/t),x=Math.pow(10,g),p=d*x;for(let y=0;y<r;y++){const v=n?n.getX(y):y;let _="";for(let A=0,T=a.length;A<T;A++){const D=a[A],N=i.getAttribute(D),b=N.itemSize;for(let S=0;S<b;S++)_+=`${~~(N[h[S]](v)*x+p)},`}if(_ in e)u.push(e[_]);else{for(let A=0,T=a.length;A<T;A++){const D=a[A],N=i.getAttribute(D),b=i.morphAttributes[D],S=N.itemSize,U=c[D],k=l[D];for(let W=0;W<S;W++){const L=h[W],C=f[W];if(U[C](o,N[L](v)),b)for(let E=0,F=b.length;E<F;E++)k[E][C](o,b[E][L](v))}}e[_]=o,u.push(o),o++}}const m=i.clone();for(const y in i.attributes){const v=c[y];if(m.setAttribute(y,new v.constructor(v.array.slice(0,o*v.itemSize),v.itemSize,v.normalized)),y in l)for(let _=0;_<l[y].length;_++){const A=l[y][_];m.morphAttributes[y][_]=new A.constructor(A.array.slice(0,o*A.itemSize),A.itemSize,A.normalized)}}return m.setIndex(u),m}function cd(){const i=new se,t=new Set,e=new Set;return i.ownGeometry=n=>(t.add(n),n),i.ownMaterial=n=>(e.add(n),n),i.dispose=()=>{i.traverse(n=>{n.isInstancedMesh&&n.dispose()}),t.forEach(n=>n.dispose()),e.forEach(n=>n.dispose())},i}function Fv(i=[]){const t=cd(),e=t.ownMaterial(new ge({color:"#a97640",roughness:.9})),n=t.ownMaterial(new ge({color:"#4e594b",roughness:.7})),s=t.ownGeometry(new xn(1,1,1)),r=[],o=new Map,a=(l,u,h,f,d,g,x)=>{let p=o.get(l);p||o.set(l,p=new Map);let m=p.get(x);m||p.set(x,m=[]),m.push({x:u,y:h,w:f,h:d,d:g})};for(const l of i.filter(u=>u.operable)){const u=new se;u.position.set(l.x,0,l.z),u.rotation.y=l.heading,t.add(u);for(const f of[-l.width/2,l.width/2])a(u,f,.85,.22,1.7,.3,n);const h=new se;h.name="gate-panel",u.add(h);for(const f of[.45,1.2])a(h,0,f,l.width,.15,.22,e);for(let f=0;f<=Math.ceil(l.width/1.2);f++)a(h,-l.width/2+l.width*f/Math.ceil(l.width/1.2),.82,.14,1.05,.19,e);a(h,l.width/2-.35,.85,.24,.28,.3,n),r.push({gate:l,panel:h})}const c=new Qt;for(const[l,u]of o)for(const[h,f]of u){const d=new Ei(s,h,f.length);f.forEach((g,x)=>{c.makeScale(g.w,g.h,g.d),c.setPosition(g.x,g.y,0),d.setMatrixAt(x,c)}),d.castShadow=d.receiveShadow=!0,l.add(d)}return t.update=()=>{for(const{gate:l,panel:u}of r)u.position.x=l.open?-l.width:0},t.update(),t}function Ov(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function Bv(i){const t=[];for(let d=0;d<3;d++)for(const g of[-1,1])for(const x of[-.34,.34])for(const p of[-.34,.34]){const m=new z;m.setComponent(d,g*.5),m.setComponent((d+1)%3,x),m.setComponent((d+2)%3,p);const y=1+.13*Math.sin(m.x*11+m.y*7+m.z*9+i*2.7);m.multiplyScalar(y),m.x+=m.y*(i-1)*.16,t.push(m)}const e=new zv(t),n=e.attributes.position;for(let d=0;d<n.count;d++){const g=n.getX(d),x=n.getY(d),p=n.getZ(d),m=1+.06*Math.sin(g*8+x*5+p*7+i*2.3);n.setXYZ(d,g*m,x*m,p*m)}e.deleteAttribute("normal");const s=Nv(e);e.dispose(),s.computeBoundingBox();const r=new z,o=new z;s.boundingBox.getSize(r),s.boundingBox.getCenter(o),s.translate(-o.x,-o.y,-o.z),s.scale(1/r.x,1/r.y,1/r.z),s.computeVertexNormals(),s.computeBoundingBox();const a=[],c=s.attributes.position,l=new kt("#eee7d5"),u=new kt("#68785a"),h=new kt("#ffffff"),f=new kt;for(let d=0;d<c.count;d++){const g=c.getX(d),x=c.getY(d),p=c.getZ(d),m=Math.sin(g*15+p*13+i*3)*Math.sin(x*11-p*9);f.copy(h).multiplyScalar(.91+.09*Math.sin(g*8+x*12+p*6+i)),m>.24&&f.lerp(l,(m-.24)*.42),x<-.05&&m<.3&&f.lerp(u,Math.min(.34,(-x+.05)*.55)),a.push(f.r,f.g,f.b)}return s.setAttribute("color",new Zt(a,3)),s}function kv(i=[]){const t=cd(),e=t.ownMaterial(new ge({color:"#ffffff",roughness:1,vertexColors:!0})),n=[[],[],[]],s=["#aba595","#c2b59d","#8b9189","#c5bfac","#969d97","#aaa99b","#858c7d","#b4a28d"];for(const d of i.filter(g=>g.material==="stone")){const{a:g,b:x}=d,p=Math.hypot(x.x-g.x,x.z-g.z);if(p<.001)continue;const m=Ov(Math.round(g.x*997+g.z*7919+x.x*104729+x.z*1543)),y=-Math.atan2(x.z-g.z,x.x-g.x);for(let v=0;v<4;v++){const _=v===3,T=Math.max(1,Math.ceil(p/(_?.48:v===0?1.24:.98))),D=Array.from({length:T},()=>.45+m()*1.2),N=D.reduce((S,U)=>S+U,0);let b=0;for(const S of D){const U=p*S/N,k=b+U,W=(b+k)/2,L=Math.max(1e-4,U-Math.min(.018,U*.08)),C=_?.19+m()*.2:.29+m()*.105,E=(m()-.5)*2*Math.min(.065,L/(C*2)),F=Math.abs(Math.sin(E)),R=Math.cos(E),B=Math.max(1e-5,(L-C*F)/R),Y=(B*F+C*R)/2,Q=Math.sin(W*.79+g.x*.13+g.z*.17)*.035;n[Math.floor(m()*3)].push({x:g.x+(x.x-g.x)*W/p,z:g.z+(x.z-g.z)*W/p,yaw:y+(m()<.5?Math.PI:0),tilt:E,y:v===0?Y+.005:_?1.1+Q+(m()-.5)*.055:.175+v*.325+Q+(m()-.5)*.04,width:B,height:C,depth:(_?.43:.59-v*.055)*(.94+m()*.06),color:s[Math.floor(m()*s.length)]}),b=k}}}const r=new Qt,o=new Gn,a=new Gn,c=new z(0,1,0),l=new z(0,0,1),u=new z,h=new z,f=new kt;for(const[d,g]of n.entries()){if(!g.length)continue;const x=new Ei(t.ownGeometry(Bv(d)),e,g.length);x.name="clay-drystone",g.forEach((p,m)=>{h.set(p.x,p.y,p.z),o.setFromAxisAngle(c,p.yaw).multiply(a.setFromAxisAngle(l,p.tilt)),u.set(p.width,p.height,p.depth),r.compose(h,o,u),x.setMatrixAt(m,r),x.setColorAt(m,f.set(p.color))}),x.castShadow=x.receiveShadow=!0,t.add(x)}return t}class Vv{constructor(t,e,{halfExtent:n=t.radius+1.4,opacity:s=.7}={}){this.target=t,this.halfExtent=n,this.opacity=s,this.covered=new Set,this.disposed=!1,this.parts=e.map(r=>{const o=r.material,a=o.clone();return r.material=a,r.geometry.computeBoundingBox(),{mesh:r,original:o,material:a,shadow:r.castShadow,alpha:1}}),this.cameraLocal=new z,this.cameraDirection=new z,this.up=new z(0,1,0)}update(t,e,n){if(this.disposed||!Number.isFinite(n)||n<=0)return;t.updateMatrixWorld(!0),t.getWorldDirection(this.cameraDirection).negate(),this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));const s=new Set;Math.abs(this.cameraLocal.x)>.02&&s.add(this.cameraLocal.x>=0?"+x":"-x"),Math.abs(this.cameraLocal.z)>.02&&s.add(this.cameraLocal.z>=0?"+z":"-z");const r=this.target.heading||0,o=Math.cos(r),a=Math.sin(r),c=[],l=new Set(e);for(const h of this.covered)l.has(h)||this.covered.delete(h);for(const h of e){const f=h.x-this.target.x,d=h.z-this.target.z,g=f*o-d*a,x=f*a+d*o,p=h.type==="cow"?.65:.4,m=this.halfExtent+p+(this.covered.has(h)?.18:0);Math.abs(g)<=m&&Math.abs(x)<=m?(this.covered.add(h),c.push({actor:h,radius:p})):this.covered.delete(h)}const u=-Math.expm1(-12*Math.min(n,.25));for(const h of this.parts){const{mesh:f,material:d}=h,x=c.length>0&&(f.userData.coverKind==="roof"||s.has(f.userData.coverSide))?this.opacity:1;h.alpha+=(x-h.alpha)*u,Math.abs(h.alpha-x)<.001&&(h.alpha=x),d.opacity=h.original.opacity*h.alpha;const p=h.alpha<1;d.transparent!==(p||h.original.transparent)&&(d.transparent=p||h.original.transparent,d.needsUpdate=!0),d.depthWrite=p?!1:h.original.depthWrite,f.castShadow=p?!1:h.shadow}}dispose(){if(!this.disposed){this.disposed=!0;for(const{mesh:t,original:e,material:n,shadow:s}of this.parts)t.material=e,t.castShadow=s,n.dispose();this.parts=[],this.covered.clear()}}}function qh(i,t=.033){const e=new ve,n=an(i).corners;return e.setAttribute("position",new Zt(n.flatMap(s=>[s.x,t,s.z]),3)),e.setAttribute("uv",new Zt([0,0,1,0,1,1,0,1],2)),e.setIndex([0,1,2,0,2,3]),e.computeVertexNormals(),e}function Hv(i,t=.26,e=.04){const n=an(i),s=Math.max(0,n.halfLength-t),r=Math.max(0,n.halfWidth-t),o=[[-s,-r],[s,-r],[s,r],[-s,r]].map(([l,u])=>Ci(i,l,u)),a=new ve,c=[];a.setAttribute("position",new Zt([...n.corners,...o].flatMap(l=>[l.x,e,l.z]),3));for(let l=0;l<4;l++){const u=(l+1)%4;c.push(l,u,u+4,l,u+4,l+4)}return a.setIndex(c),a.computeVertexNormals(),a}function Gv(i,t,e){const n=an(t).corners;i.fillStyle="#f9e7a2",i.strokeStyle="#fff0b5",i.lineWidth=1,i.beginPath(),n.forEach((s,r)=>{const o=e(s);r?i.lineTo(o.x,o.y):i.moveTo(o.x,o.y)}),i.closePath(),i.fill(),i.stroke()}const He=1e-9,qr=(i,t)=>i.x*t.z-i.z*t.x,Us=(i,t)=>({x:i.x-t.x,z:i.z-t.z});function Wv(i,t=0){const e=[],n=[],s=[];for(const d of i){const g=[];s.push(g);for(let x=0;x<d.length;x++){const p=d[x],m=d[(x+1)%d.length];if(n.push(p.x),Math.abs(p.x-m.x)>He){const y={a:p,b:m,min:Math.min(p.x,m.x),max:Math.max(p.x,m.x),id:e.length};e.push(y),g.push(y)}}}for(let d=0;d<e.length;d++)for(let g=d+1;g<e.length;g++){const x=e[d],p=e[g];if(x.max<=p.min||p.max<=x.min)continue;const m=Us(x.b,x.a),y=Us(p.b,p.a),v=qr(m,y);if(Math.abs(v)<He)continue;const _=Us(p.a,x.a),A=qr(_,y)/v,T=qr(_,m)/v;A>He&&A<1-He&&T>He&&T<1-He&&n.push(x.a.x+A*m.x)}n.sort((d,g)=>d-g);const r=n.filter((d,g)=>!g||d-n[g-1]>He),o=[],a=[],c=(d,g)=>d.a.z+(g-d.a.x)*(d.b.z-d.a.z)/(d.b.x-d.a.x),l=(d,g,x)=>{[d,g,x]=[d,g,x].map(m=>({x:Math.fround(m.x),z:Math.fround(m.z)}));const p=qr(Us(g,d),Us(x,d));if(!(Math.abs(p)<He)){p>0&&([g,x]=[x,g]);for(const m of[d,g,x])o.push(m.x,t,m.z),a.push(m.x/4,m.z/4)}};let u=new Map;const h=[];for(let d=1;d<r.length;d++){const g=r[d-1],x=r[d],p=(g+x)/2,m=[];for(const _ of s){const A=_.filter(T=>p>T.min&&p<T.max).sort((T,D)=>c(T,p)-c(D,p));A.length>=2&&m.push({low:A[0],high:A[A.length-1]})}m.sort((_,A)=>c(_.low,p)-c(A.low,p));const y=[];for(const _ of m){const A=y[y.length-1];A&&c(_.low,p)<=c(A.high,p)+He?c(_.high,p)>c(A.high,p)&&(A.high=_.high):y.push({..._})}const v=new Map;for(const{low:_,high:A}of y){const T=`${_.id}:${A.id}`,D=u.get(T);D?(D.right=x,v.set(T,D),u.delete(T)):v.set(T,{low:_,high:A,left:g,right:x})}h.push(...u.values()),u=v}h.push(...u.values());for(const{low:d,high:g,left:x,right:p}of h){const m={x,z:c(d,x)},y={x:p,z:c(d,p)},v={x:p,z:c(g,p)},_={x,z:c(g,x)};l(m,y,v),l(m,v,_)}const f=new ve;return f.setAttribute("position",new Zt(o,3)),f.setAttribute("uv",new Zt(a,2)),f.computeVertexNormals(),f}function Yr(i,t,{ragged:e=!1,y:n=.008,seed:s=1}={}){let r=s,o=0;const a=i.map((u,h)=>(h&&(o+=Math.hypot(u.x-i[h-1].x,u.z-i[h-1].z)),r=r*1664525+1013904223>>>0,e?Math.sin(o*.72)*.11+(r/4294967296-.5)*.17:0)),c=[],l=[];for(let u=1;u<i.length;u++){const h=i[u-1],f=i[u],d=Math.hypot(f.x-h.x,f.z-h.z);if(d<He)continue;const g=-(f.z-h.z)/d,x=(f.x-h.x)/d,p=(v,_,A)=>({x:v.x+g*(t/2*A+_),z:v.z+x*(t/2*A+_)}),m=[p(h,a[u-1],-1),p(h,a[u-1],1)],y=[p(f,a[u],-1),p(f,a[u],1)];c.push([m[0],y[0],y[1],m[1]]),l[u-1]&&c.push([h,l[u-1][0],m[0]],[h,l[u-1][1],m[1]]),l[u]=y}return Wv(c,n)}function Xv(i,t){const e=[],n=[];for(let s=0;s<i.length;s++){const r=i[s],o=i[(s+1)%i.length],a=t(r),c=t(o);if(a>=-He&&e.push(r),a<=He&&n.push(r),a*c<-He*He){const l=a/(a-c),u={x:r.x+(o.x-r.x)*l,z:r.z+(o.z-r.z)*l};e.push(u),n.push(u)}}return[e,n].filter(s=>s.length>=3)}function Yh(i,t,e=1,n=new ve){const r=(i.rivers||[]).flatMap(l=>l.bridges).filter(l=>Math.hypot(l.x-t.x,l.z-t.z)<l.length/2+l.width/2+1.1*e).map(l=>({...l,s:Math.sin(l.heading),c:Math.cos(l.heading),planks:Math.ceil(l.length/.3)})),o=(l,u)=>({x:(l.x-u.x)*u.c-(l.z-u.z)*u.s,z:(l.x-u.x)*u.s+(l.z-u.z)*u.c}),a=[];for(let l=0;l<64;l++){const u=(f,d)=>({x:t.x+Math.cos(f/64*Math.PI*2)*d*e,z:t.z+Math.sin(f/64*Math.PI*2)*d*e});let h=[[u(l,.9),u(l+1,.9),u(l+1,1.1),u(l,1.1)]];for(const f of r){const d=[g=>o(g,f).x-f.width/2,g=>o(g,f).x+f.width/2];for(let g=0;g<=f.planks;g++)d.push(x=>o(x,f).z-(-f.length/2+g*f.length/f.planks));for(const g of d)h=h.flatMap(x=>Xv(x,g))}for(const f of h){const d=f.reduce((x,p)=>({x:x.x+p.x/f.length,z:x.z+p.z/f.length}),{x:0,z:0});let g=.055;for(const x of r){const p=o(d,x);if(Math.abs(p.x)<=x.width/2+He&&Math.abs(p.z)<x.length/2){const m=Math.min(x.planks-1,Math.floor((p.z/x.length+.5)*x.planks));g=Math.max(g,.18+.12*Math.sin((m+.5)/x.planks*Math.PI)+.04)}}for(let x=1;x<f.length-1;x++)for(const p of[f[0],f[x],f[x+1]])a.push(p.x,g,p.z)}}let c=n.getAttribute("position");return(!c||c.array.length<a.length)&&(c&&n.dispose(),c=new Ge(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(a.length/3,1)))),3),c.setUsage(io),n.setAttribute("position",c)),c.array.set(a),c.needsUpdate=!0,n.setDrawRange(0,a.length/3),n.boundingSphere=new hi(new z(t.x,.2,t.z),1.1*e+.4),n}const us=new Map,qv={TorusGeometry:vo,SphereGeometry:Ii,BoxGeometry:xn,CylinderGeometry:ar,ConeGeometry:js},Rn=new Map;let Ie;function sr(i){i.updateMatrixWorld(!0);const t=new Map;i.traverse(n=>{n.isMesh&&(t.has(n.material)||t.set(n.material,[]),t.get(n.material).push(n.geometry.clone().applyMatrix4(n.matrixWorld)))});const e=new se;e.name=i.name,e.userData.parts={};for(const[n,s]of t){const r=Uv(s,!1);s.forEach(a=>a.dispose());const o=new ie(r,n);o.castShadow=o.receiveShadow=!0,e.add(o)}return e}function el(i,t){const e=sr(t);return Rn.set(i,e),e.clone()}function nl(i,t){const e=`${i}:${t.join(",")}`;return us.has(e)||us.set(e,new qv[i](...t)),us.get(e)}function Yv(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){const r=224+(s*13+(s>>>5)*7)%27;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);const n=new Ms(i);return n.wrapS=n.wrapT=Hn,n.repeat.set(2,2),n.colorSpace=Le,n}function Zv(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.38+Math.sin(s*.051)*1.7),a=Math.sin(Math.hypot(r-78,(s-45)*.4)*.38),c=Math.round(227+o*12+a*4+(r*7+s*11)%7),l=(s*128+r)*4;e.data[l]=e.data[l+1]=e.data[l+2]=c,e.data[l+3]=255}t.putImageData(e,0,0);const n=new Ms(i);return n.wrapS=n.wrapT=Hn,n.colorSpace=Le,n}function $v(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.31+Math.sin(s*.045)*1.65)*8+Math.sin(r*.11+Math.sin(s*.021)*2.6)*5,a=Math.sin(Math.hypot(r-35,(s-74)*.15)*.46)*4,c=(r*17+s*31+r*s%29)%9-4,l=Math.max(0,Math.min(255,Math.round(132+o+a+c))),u=(s*128+r)*4;e.data[u]=l,e.data[u+1]=l,e.data[u+2]=l,e.data[u+3]=255}t.putImageData(e,0,0);const n=new Ms(i);return n.wrapS=n.wrapT=Hn,n.repeat.set(1.2,1.7),n}function Jv(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128),n=[[188,203,148],[210,207,153],[164,191,137],[223,207,155],[154,184,133]];for(let r=0;r<128;r++)for(let o=0;o<128;o++){const a=Math.sin(o*.17+Math.sin(r*.11)*1.4)+Math.cos(r*.19-o*.07),c=(o*17+r*31+o*r%29)%13-6,l=n[(Math.floor((a+2)*1.25)+Math.floor(o/19)+Math.floor(r/23))%n.length],u=(r*128+o)*4;e.data[u]=Math.max(0,Math.min(255,l[0]+c)),e.data[u+1]=Math.max(0,Math.min(255,l[1]+c)),e.data[u+2]=Math.max(0,Math.min(255,l[2]+c)),e.data[u+3]=255}t.putImageData(e,0,0);const s=new Ms(i);return s.wrapS=s.wrapT=Hn,s.colorSpace=Le,s}function Xn(){if(Ie)return Ie;const i=Yv(),t=o=>new ge({color:o,roughness:.9,map:i}),e=o=>new ge({color:o,roughness:.55,metalness:.18,map:i});Ie={cream:e("#f5ead3"),white:e("#fff8e7"),dark:e("#354b55"),brass:new ge({color:"#ddb469",roughness:.48,metalness:.62}),orange:e("#e6a04e"),dogCream:e("#ffe5ac"),rust:e("#c7704d"),cyan:new ge({color:"#b6fbff",emissive:"#69dfe9",emissiveIntensity:.8,roughness:.32}),mint:e("#84cbb7"),black:e("#20343e"),wood:t("#ba9167"),paleWood:t("#e1bb87"),bark:t("#8b7758"),leaves:t("#8cbd8b"),leavesLight:t("#b8d28f"),leavesDark:t("#619b84"),roof:t("#bf755f"),barn:t("#d9977e"),barnTrim:t("#fae7c2"),flowerPink:t("#f2a6a6"),flowerYellow:t("#ffe28a"),flowerWhite:t("#fff7e5"),flowerCenter:t("#daa661"),stem:t("#7fab72"),stone:t("#abb7a4")},Ie.eye=Ie.white,Ie.pupil=Ie.black;const n=Zv();for(const o of["wood","paleWood"])Ie[o].map=n;const s=$v();Ie.bark.map=s,Ie.bark.bumpMap=s,Ie.bark.bumpScale=.055,Ie.bark.needsUpdate=!0;const r=Jv();for(const o of["leaves","leavesLight","leavesDark"])Ie[o].map=r;return Ie.leaves.needsUpdate=Ie.leavesLight.needsUpdate=Ie.leavesDark.needsUpdate=!0,Ie}function hr(i,t,e,n,s=[0,0,0],r=[1,1,1]){const o=new ie(nl(t,e),n);return o.position.set(...s),o.scale.set(...r),o.castShadow=!0,o.receiveShadow=!0,i.add(o),o}function Kt(i,t,e,n,s=10){return hr(i,"SphereGeometry",[1,s,6],t,e,n)}function pn(i,t,e,n,s=.025){const r=`sculpted-sphere:${s}`;if(!us.has(r)){const a=nl("SphereGeometry",[1,10,6]).clone(),c=a.attributes.position;for(let l=0;l<c.count;l++){const u=c.getX(l),h=c.getY(l),f=c.getZ(l),d=1+s*Math.sin(u*4.1+f*2.8)*Math.cos(h*3.7-f*1.3);c.setXYZ(l,u*d,h*d,f*d)}a.computeVertexNormals(),us.set(r,a)}const o=new ie(us.get(r),t);return o.position.set(...e),o.scale.set(...n),o.castShadow=o.receiveShadow=!0,i.add(o),o}function Xe(i,t,e,n){return hr(i,"BoxGeometry",[1,1,1],t,e,n)}function Ne(i,t,e,n,s,r){const o=hr(i,"CylinderGeometry",[n,n,s,10],t,e);return r&&o.rotation.set(...r),o}function ci(i,t,e,n,s,r=.105){Kt(i,t.eye,[e,n,s],[r,r*1.08,r*.55]),Kt(i,t.pupil,[e,n-r*.05,s+r*.45],[r*.43,r*.58,r*.23]),Kt(i,t.white,[e-r*.14,n+r*.2,s+r*.67],[r*.15,r*.15,r*.12],8)}function yc(i,t,e,n,s=t.brass){return Kt(i,s,e,n)}function ei(i,t,e,n,s,r=t.dark){const o=new se;return o.position.set(e,s+.1,n),i.add(o),Kt(o,t.brass,[0,0,0],[.105,.105,.105]),Ne(o,t.dark,[0,-s*.45,0],.065,s*.85),Kt(o,t.brass,[0,-s*.72,0],[.078,.078,.078]),Kt(o,r,[0,-s+.025,.055],[.115,.1,.17]),o}function Kv(){const i=Xn(),t=new se;t.name="Pip the robot sheepdog";const e=pn(t,i.orange,[0,.55,0],[.29,.3,.49]);Kt(t,i.dogCream,[0,.47,.25],[.23,.24,.25]),yc(t,i,[0,.837,-.07],[.16,.04,.22],i.rust),[-1,1].forEach(c=>{yc(t,i,[c*.277,.56,-.03],[.03,.13,.16]);for(let l=0;l<3;l++)Ne(t,i.dark,[c*.311,.57,-.1+l*.07],.017,.12,[0,0,Math.PI/2])});const n=new se;n.position.set(0,.89,.38),t.add(n),pn(n,i.orange,[0,0,0],[.28,.27,.28]),Kt(n,i.dogCream,[0,-.085,.23],[.235,.145,.17]),Kt(n,i.dark,[0,-.025,.365],[.1,.067,.058]),Kt(n,i.rust,[0,-.2,.265],[.057,.072,.05]),ci(n,i,-.115,.06,.231,.099),ci(n,i,.115,.06,.231,.099),[-1,1].forEach(c=>{const l=Kt(n,i.dark,[c*.26,.05,-.025],[.11,.23,.13]);l.rotation.z=c*.38,Kt(n,i.brass,[c*.23,.14,-.025],[.07,.07,.07])}),Ne(t,i.dark,[0,.76,.37],.18,.085);const s=new ge({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),r=[ei(t,i,-.22,.28,.34),ei(t,i,.22,.28,.34),ei(t,i,-.22,-.3,.34),ei(t,i,.22,-.3,.34)],o=new se;o.position.set(0,.64,-.44),t.add(o),Ne(o,i.brass,[0,.16,-.08],.047,.32,[-.42,0,0]);const a=Kt(o,s,[0,.32,-.15],[.077,.077,.077]);return a.name="Pip tail light",a.userData.ownedMaterial=!0,t.userData.parts={body:e,head:n,legs:r,tail:o,tailLight:a},t}function jv(){const i=Xn(),t=new se,e=new ge({color:"#a6b4b6",metalness:.72,roughness:.48}),n=new ge({color:"#667278",metalness:.8,roughness:.38});Xe(t,e,[0,.83,-.06],[.62,.51,.92]),Xe(t,n,[0,1.095,-.08],[.64,.035,.8]);for(const h of[-1,1]){Xe(t,n,[h*.315,.84,-.08],[.016,.018,.84]),Xe(t,n,[h*.316,.84,-.13],[.018,.48,.018]);for(const f of[-.43,.28])for(const d of[.64,1.03])Kt(t,i.brass,[h*.327,d,f],[.025,.025,.025])}Ne(t,i.dark,[0,1.03,.38],.21,.18,[Math.PI/2,0,0]),Xe(t,e,[0,1.32,.47],[.57,.45,.43]),Xe(t,i.dark,[0,1.35,.696],[.49,.25,.025]);const s=Xe(t,e,[0,1.15,.79],[.49,.25,.45]);s.rotation.x=-.18,Xe(t,n,[0,.99,.8],[.46,.04,.42]),Kt(t,i.black,[0,1.2,1.025],[.1,.095,.085]),ci(t,i,-.135,1.36,.72,.109),ci(t,i,.135,1.36,.72,.109);for(const h of[-1,1]){const f=Xe(t,e,[h*.28,1.69,.43],[.22,.4,.12]);f.rotation.z=h*-.42,Xe(f,i.dark,[0,0,.52],[.68,.75,.12])}const r=[];for(const h of[-.3,.3])for(const f of[-.35,.29])Xe(t,e,[h,.64,f],[.23,.43,.27]),Ne(t,n,[h*1.35,.78,f],.105,.06,[0,0,Math.PI/2]),Ne(t,i.dark,[h,.39,f],.12,.09),Ne(t,n,[h,.335,f],.13,.05),r.push(new z(h,.3,f));const o=sr(t);o.name="Pip the hovering robot sheepdog",o.traverse(h=>{h.isMesh&&(h.userData.ownedGeometry=!0,(h.material===e||h.material===n)&&(h.userData.ownedMaterial=!0))});const a=new se;a.position.set(0,.94,-.52),o.add(a);for(let h=0;h<7;h++)Ne(a,h%2?i.dark:n,[0,.04+h*.05,-h*.035],.035,.055,[-.6,0,0]);const c=new ge({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),l=Kt(a,c,[0,.41,-.27],[.075,.075,.075]);l.userData.ownedMaterial=!0;const u=r.map(h=>Array.from({length:3},(f,d)=>{const g=new rn({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),x=new ie(nl("TorusGeometry",[.135,.014,6,24]),g);return x.name=`Pip thruster ring ${d+1}`,x.rotation.x=Math.PI/2,x.userData.ownedMaterial=!0,o.add(x),x}));return o.userData.parts={body:o.children[0],legs:[],tail:a,tailLight:l,pods:r,rings:u},o.userData.hover={time:0,previous:null,trails:[]},o}function Qv(i,t){const e=i.userData.hover;if(!e)return;i.updateMatrixWorld(!0);const n=i.userData.parts.pods.map(r=>i.localToWorld(r.clone()));(!e.previous||i.position.distanceTo(e.previous)>3)&&(e.trails=n.map(r=>r.clone())),t>0&&(e.time+=t);for(let r=0;r<n.length;r++){t>0&&e.trails[r].lerp(n[r],1-Math.exp(-t/.13));const o=e.time/.55%1;for(let a=0;a<3;a++){const c=i.userData.parts.rings[r][a],l=n[r].clone().lerp(e.trails[r],a===0?0:(a-1+o)/2),u=i.worldToLocal(l);u.y=i.userData.parts.pods[r].y-.055-(a===0?0:(a-1+o)*.1+.055),c.position.copy(u),c.material.opacity=a===0?.95:a===1?.85*Math.min(1,o/.15):.85*(1-o),c.scale.setScalar(1+(a===0?0:(a-1+o)*.15))}}e.previous=i.position.clone()}function tM(i="sheep"){const t=`animal:${i}`;if(Rn.has(t))return Rn.get(t).clone();const e=Xn(),n=i==="cow",s=new se;if(s.name=n?"Robot cow":"Robot sheep",pn(s,e.cream,[0,.54,0],[.32,.34,n?.5:.39]),n)[-1,1].forEach(l=>{Kt(s,e.dark,[l*.295,.57,-.13],[.047,.16,.2]),Kt(s,e.dark,[l*.282,.67,.19],[.045,.11,.11])});else{for(let l=0;l<3;l++)pn(s,e.white,[0,.625,-.23+l*.22],[.335,.3,.145]);[-1,1].forEach(l=>{for(let u=0;u<3;u++)Kt(s,e.brass,[l*.312,.56,-.21+u*.21],[.029,.033,.033],8)})}yc(s,e,[0,.87,-.11],[.1,.024,.105],e.mint);const r=new se;r.position.set(0,.7,n?.46:.34),s.add(r),Kt(r,n?e.cream:e.dark,[0,0,.06],[.22,.235,.205]),Kt(r,n?e.rust:e.black,[0,-.08,.225],[.185,.12,.09]),ci(r,e,-.096,.055,.221,.075),ci(r,e,.096,.055,.221,.075),[-1,1].forEach(l=>{const u=Kt(r,n?e.rust:e.cream,[l*.235,.075,.025],[.135,.048,.082]);if(u.rotation.z=l*.25,Kt(r,e.brass,[l*.193,.075,.025],[.045,.045,.045]),n){const h=hr(r,"ConeGeometry",[.047,.2,8],e.brass,[l*.15,.255,-.018]);h.rotation.z=l*-.32,Kt(r,e.dark,[l*.077,-.082,.305],[.025,.021,.016],8)}}),Kt(r,e.cyan,[0,.22,.008],[.033,.033,.033],8),Ne(s,e.dark,[0,.64,.31],.13,.11,[Math.PI/2,0,0]);const o=[ei(s,e,-.22,.22,.25),ei(s,e,.22,.22,.25),ei(s,e,-.22,-.24,.25),ei(s,e,.22,-.24,.25)];Kt(s,e.dark,[0,.6,n?-.53:-.39],[.061,n?.15:.065,.07]);const a=n?1.23:1;s.scale.setScalar(a);for(const l of o)s.remove(l);const c=sr(s);for(let l=0;l<o.length;l++){const u=o[l],h=u.position.clone().multiplyScalar(a);u.position.set(0,0,0),u.scale.setScalar(a);const f=sr(u);for(const d of[...f.children])d.name=`leg-${l}`,d.position.copy(h),d.userData={limbIndex:l,pivot:h.toArray()},c.add(d)}return c.userData.articulated=!0,Rn.set(t,c),c.clone()}function eM(){const i=Xn(),t=new se;t.name="Autonomous meadow drone",Kt(t,i.mint,[0,0,0],[.3,.14,.25]),Kt(t,i.cream,[0,.09,0],[.2,.085,.17]),ci(t,i,-.1,-.005,.238,.068),ci(t,i,.1,-.005,.238,.068);const e=[];return[-1,1].forEach(n=>[-1,1].forEach(s=>{const r=Ne(t,i.brass,[n*.24,0,s*.2],.035,.32,[0,0,n*Math.PI/2]);r.rotation.y=s*-.5;const o=new se;o.position.set(n*.39,.09,s*.29),t.add(o),Kt(o,i.dark,[0,-.045,0],[.071,.08,.071]),Kt(o,i.cream,[0,0,0],[.23,.017,.04]),Kt(o,i.cream,[0,0,0],[.04,.017,.23]),Kt(o,i.cyan,[0,.014,0],[.036,.027,.036]),e.push(o)})),t.userData.parts={propellers:e},t}function Zh(i=0){i=Math.abs(Math.floor(i))%3;const t=`tree:${i}`;if(Rn.has(t))return Rn.get(t).clone();const e=Xn(),n=new se;hr(n,"CylinderGeometry",[.46,.62,2.25,12],e.bark,[0,1.125,0]);for(let a=0;a<4;a++){const c=a*Math.PI/2+i*.17,l=Ne(n,e.bark,[Math.cos(c)*.31,.13,Math.sin(c)*.31],.16,.92,[0,0,-Math.cos(c)*.8]);l.rotation.z=Math.sin(c)*.8}const s=Ne(n,e.bark,[.36,1.67,0],.22,1.1,[0,0,-.72]);s.rotation.x=.2;const r=[e.leaves,e.leavesDark,e.leavesLight][i],o=[[[0,2.37,0],[1.08,.92,.94]],[[-.63,2.05,.22],[.78,.69,.76]],[[.68,2.22,-.12],[.79,.73,.77]],[[.08,2.91,.08],[.68,.67,.7]],[[-.2,2.63,-.58],[.72,.61,.69]],[[.62,2.62,.54],[.7,.62,.66]]];for(const[a,c]of o)pn(n,r,a,c,.075);for(let a=0;a<6;a++){const c=a*Math.PI*2/6+i*.21,l=pn(n,r,[Math.cos(c)*.85,2.45+a%2*.22,Math.sin(c)*.75],[.34,.2,.4],.045);l.rotation.y=c,l.rotation.z=(a%2?1:-1)*.22}return el(t,n)}function nM(i=2.2,t=4.5){const e=Xn(),n=new se,s=Math.ceil(t/.3);for(let r=0;r<s;r++){const o=-t/2+(r+.5)*t/s,a=Math.sin((r+.5)/s*Math.PI)*.12;Xe(n,r%3?e.paleWood:e.wood,[0,a+.09,o],[i,.18,t/s-.025]),[-1,1].forEach(c=>Kt(n,e.brass,[c*(i/2-.16),a+.184,o],[.025,.01,.025],6))}return[-1,1].forEach(r=>{for(let o=0;o<4;o++)Ne(n,e.wood,[r*i/2,.56,-t/2+o*t/3],.065,.96);Xe(n,e.paleWood,[r*i/2,.86,0],[.1,.1,t+.2]),Xe(n,e.wood,[r*i/2,.46,0],[.08,.075,t+.2])}),sr(n)}function iM(i=0,t=5){i=Number.isFinite(i)?Math.abs(Math.floor(i))%6:0,t=Number.isFinite(t)?Math.max(1,Math.min(12,Math.floor(t))):5;const e=`flowers:${i}:${t}`;if(Rn.has(e))return Rn.get(e).clone();const n=Xn(),s=new se;for(let r=0;r<t;r++){const o=r*2.39996+i,a=Math.sqrt(r/t)*.65,c=new se;c.position.set(Math.cos(o)*a,0,Math.sin(o)*a),s.add(c);const l=.18+(r*7+i)%4*.03;Ne(c,n.stem,[0,l/2,0],.014,l);const u=[n.flowerYellow,n.flowerPink,n.flowerWhite][(r+i)%3];for(let h=0;h<5;h++){const f=h*Math.PI*2/5;Kt(c,u,[Math.cos(f)*.05,l,Math.sin(f)*.05],[.045,.022,.045],6)}Kt(c,n.flowerCenter,[0,l+.015,0],[.027,.023,.027],6)}return el(e,s)}function Sa(i=0){i=Math.abs(Math.floor(i))%3;const t=`bush:${i}`;if(Rn.has(t))return Rn.get(t).clone();const e=Xn(),n=new se,s=[e.leaves,e.leavesDark,e.leavesLight][i%3];Ne(n,e.bark,[0,.16,0],.08,.3),pn(n,s,[0,.42,0],[.62,.46,.48],.075),pn(n,s,[-.42,.28,.12],[.38,.34,.35],.075),pn(n,s,[.42,.34,-.1],[.4,.37,.36],.075),pn(n,s,[.1,.65,-.13],[.38,.34,.37],.075);for(let r=0;r<4;r++){const o=r*Math.PI/2+i*.29,a=pn(n,s,[Math.cos(o)*.52,.46+r%2*.1,Math.sin(o)*.42],[.25,.16,.33],.04);a.rotation.y=o}return el(t,n)}function ld(i){let t=i;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Zr(i,t=!1){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d"),s=ld(i==="grass"?83:193);n.fillStyle=t?"#909090":i==="grass"?"#779c4d":"#b79763",n.fillRect(0,0,512,512);for(let o=0;o<90;o++){const a=s()*512,c=s()*512,l=12+s()*57;n.fillStyle=t?["#858585","#999999","#aaaaaa"][o%3]:i==="grass"?["#92ad56","#4f854a","#bdba67","#6a964d"][o%4]:["#c9ad78","#9c8055","#ddc18e"][o%3],n.globalAlpha=.08;for(const u of[-512,0,512])for(const h of[-512,0,512])n.beginPath(),n.ellipse(a+u,c+h,l,l*.6,0,0,Math.PI*2),n.fill()}for(let o=0;o<7200;o++){const a=s()*512,c=s()*512;n.fillStyle=t?["#777777","#bbbbbb","#dddddd"][o%3]:i==="grass"?["#496f39","#9eb568","#d0c480","#789b4b"][o%4]:["#826b48","#e4c995","#b99a6a"][o%3],n.globalAlpha=.14+s()*.25,n.beginPath(),n.ellipse(a,c,.35+s()*.85,i==="grass"?1.2+s()*3.8:.3+s()*1.4,s()*Math.PI,0,Math.PI*2),n.fill()}n.globalAlpha=1;const r=new Ms(e);return t||(r.colorSpace=Le),r.wrapS=r.wrapT=Hn,r}function hd(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.max(0,Math.min(1,((i-e.x)*s+(t-e.z)*r)/(s*s+r*r||1))),a=i-e.x-o*s,c=t-e.z-o*r;return a*a+c*c}function sM(i,t,e,n){return Math.sqrt(hd(i,t,e,n))}function ba(i,t,e){let n=1/0;for(let s=1;s<e.length;s++)n=Math.min(n,hd(i,t,e[s-1],e[s]));return Math.sqrt(n)}function rM(i,t="#45684d"){const e=document.createElement("canvas");e.width=512,e.height=128;const n=e.getContext("2d");n.fillStyle="#faf6e9",n.beginPath(),n.roundRect(8,12,496,98,35),n.fill(),n.fillStyle=t,n.font="bold 34px sans-serif",n.textAlign="center",n.fillText(i,256,76);const s=new Ms(e);s.colorSpace=Le;const r=new jf(new Lu({map:s,depthTest:!1}));return r.scale.set(6,1.5,1),r}class oM{constructor(t){this.renderer=new C_({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=cu,this.renderer.outputColorSpace=Le,this.renderer.toneMapping=hu,this.renderer.toneMappingExposure=1.05,this.scene=new Jf,this.scene.background=new kt("#bdd6df"),this.scene.fog=new Bc("#bdd6df",95,195),this.hemisphere=new Bp("#eaf7ff","#536747",1.65),this.scene.add(this.hemisphere),this.skyDay=new kt("#bdd6df"),this.skyStorm=new kt("#899da7"),this.sun=new Hp("#fff4dc",2.05),this.sun.position.set(-18,35,20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100}),this.sun.shadow.camera.updateProjectionMatrix(),this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.camera=new Mo(-30,30,20,-20,.1,180),this.center=new z(-7,0,0),this.targetCenter=this.center.clone(),this.terrain=new se,this.actors=new se,this.scene.add(this.terrain,this.actors),this.materials=Xn(),this.grass=new ge({color:"#ffffff",roughness:.96,map:Zr("grass"),bumpMap:Zr("grass",!0),bumpScale:.12}),this.path=new ge({color:"#fff1d3",roughness:.95,map:Zr("path"),bumpMap:Zr("path",!0),bumpScale:.08,side:Te}),this.pathShoulder=new ge({color:"#a99261",roughness:1,transparent:!0,opacity:.36,depthWrite:!1,side:Te}),this.water=new ge({color:"#4b9fae",roughness:.29,metalness:.08,side:Te}),this.targetMat=new rn({color:"#ffe8a0",transparent:!0,opacity:.56,depthWrite:!1,side:Te}),this.fenceParts=[new ie(new ar(.075,.075,.92,10),this.materials.paleWood),new ie(new Ii(1,8,6),this.materials.paleWood),new ie(new xn(1,.105,.085),this.materials.wood)],this.sceneryBatches=[],this.sceneryFrustum=new _o,this.viewMatrix=new Qt,this.animalMeshes=[],this.animalBatches=[],this.helperMeshes=new Map,this.resize(),this.preview=!0,this.particles=[],this.nature=new Cv(this.scene),this.waterEffects=new dv(this.scene)}resize(){this.width=innerWidth,this.height=innerHeight,this.renderer.setSize(this.width,this.height,!1),this.aspect=this.width/this.height}place(t,e,n,s=1,r=!1){return t.position.set(e,0,n),t.scale.multiplyScalar(s),r&&t.traverse(o=>{o.isMesh&&(o.userData.ownedGeometry=!0)}),this.terrain.add(t),t}flat(t,e,n,s,r=.02){const o=new ie(t,e);return o.rotation.x=-Math.PI/2,o.position.set(n,r,s),o.receiveShadow=!0,this.terrain.add(o),o}setLevel(t){this.level=t,this.barkEffects=[],this.cutaway?.dispose(),this.cutaway=null,this.gateView?.dispose(),this.gateView?.removeFromParent(),this.stoneView?.dispose(),this.stoneView?.removeFromParent(),this.gateView=this.stoneView=null;const e=new Set,n=new Set;for(const L of[this.terrain,this.actors])L.traverse(C=>{C.userData.ownedGeometry&&e.add(C.geometry),C.userData.ownedMaterial&&n.add(C.material),C.userData.ownedLabel&&(C.material.map.dispose(),n.add(C.material)),C.isInstancedMesh&&C.dispose()});e.forEach(L=>L?.dispose()),n.forEach(L=>L?.dispose()),this.terrain.clear(),this.actors.clear(),this.sceneryBatches=[],this.helperMeshes.clear(),this.animalMeshes=[],this.animalBatches=[],this.particles=[];const s=t.bounds,r=s.maxX-s.minX,o=s.maxZ-s.minZ,a=ld(t.seed),c=(s.maxX+s.minX)/2,l=(s.maxZ+s.minZ)/2,u=this.flat(new cr(r+90,o+90,1,1),this.grass,c,l,-.035);u.userData.ownedGeometry=!0,this.grass.map.repeat.set((r+90)/15,(o+90)/15),this.grass.bumpMap.repeat.copy(this.grass.map.repeat);for(const L of t.sceneryHills||[]){const C=new ie(new Ii(1,20,12),new ge({color:["#799552","#6f914e","#93a75d"][Math.floor(a()*3)],roughness:1}));C.position.set(L.x,-.3,L.z),C.scale.set(L.radius,L.height,L.radius),C.userData.ownedGeometry=C.userData.ownedMaterial=!0,this.terrain.add(C)}const h=(L,C)=>{const E=new ie(L,C);return E.receiveShadow=!0,E.userData.ownedGeometry=!0,this.terrain.add(E),E};for(const L of t.roads)h(Yr(L.points,L.width+.65,{ragged:!0,y:.003,seed:t.seed+5}),this.pathShoulder),h(Yr(L.points,L.width,{ragged:!0,y:.007,seed:t.seed}),this.path);const f=[];for(const L of t.rivers){const C=new ge({color:"#6c8960",roughness:1,side:Te}),E=h(Yr(L.points,L.width+.8,{y:.002}),C);E.userData.ownedMaterial=!0;const F=h(Yr(L.points,L.width,{y:.018}),this.water),R=L.points[0],B=L.points.at(-1);f.push({mesh:F,points:L.points,width:L.width,heading:Math.atan2(B.x-R.x,B.z-R.z)});for(const Y of L.bridges){const Q=nM(Y.width,Y.length);Q.rotation.y=Y.heading,this.place(Q,Y.x,Y.z,1,!0)}}const d=t.target,g=an(d),x=g.halfLength,p=[];this.goal=h(qh(d),this.targetMat),this.goalOutline=h(Hv(d),new rn({color:"#fff0b5",side:Te})),this.goalOutline.userData.ownedMaterial=!0,this.goalFloor=null;const m=(L,C,E,F,R,B)=>{const Y=Math.hypot(C.x-L.x,C.z-L.z),Q=new ie(new xn(Y,E,F),R);return Q.position.set((L.x+C.x)/2,E/2,(L.z+C.z)/2),Q.rotation.y=-Math.atan2(C.z-L.z,C.x-L.x),Q.castShadow=Q.receiveShadow=!0,Q.userData.ownedGeometry=!0,Q.userData.coverSide=B,this.terrain.add(Q),Q};for(const L of t.fenceSegments||[]){if(L.material==="stone")continue;const{a:C,b:E,kind:F}=L,R=Math.hypot(E.x-C.x,E.z-C.z);if(F==="target"&&d.type==="barn"){const B=Math.ceil(R/3);for(let Y=0;Y<B;Y++){const Q={x:C.x+(E.x-C.x)*Y/B,z:C.z+(E.z-C.z)*Y/B},ft={x:C.x+(E.x-C.x)*(Y+1)/B,z:C.z+(E.z-C.z)*(Y+1)/B},Ct=(Q.x+ft.x)/2-d.x,et=(Q.z+ft.z)/2-d.z,ht=Math.cos(d.heading||0),X=Math.sin(d.heading||0),K=Ct*ht-et*X,nt=Ct*X+et*ht,st=Math.abs(Math.abs(K)-x)<Math.abs(Math.abs(nt)-x)?K>=0?"+x":"-x":nt>=0?"+z":"-z";p.push(m(Q,ft,2.4,.22,this.materials.barn,st));const ct=m(Q,ft,.14,.25,this.materials.barnTrim,st);ct.position.y=2.35,p.push(ct)}}else if(F==="target"&&d.type==="field"){this.placeFence(C,E);const B=Math.ceil(R/1.4);for(let Y=0;Y<B;Y++)this.place(Sa(Y),C.x+(E.x-C.x)*(Y+.5)/B,C.z+(E.z-C.z)*(Y+.5)/B,.75)}else this.placeFence(C,E)}if(this.gateView=Fv(t.gates),this.stoneView=kv(t.fenceSegments),this.terrain.add(this.gateView,this.stoneView),d.type==="barn"){this.goalFloor=h(qh(d,.013),this.path);const L=new se,C=d.heading||0,E=Math.ceil(x*2/2.4),F=(x*2+.6)/E;for(const R of[-1,1])for(let B=0;B<E;B++){const Y=new ie(new xn(x+.6,.18,F),this.materials.roof);Y.position.set(R*x/2,3.2,-x-.3+(B+.5)*F),Y.rotation.z=-R*.21,Y.castShadow=!0,Y.userData.ownedGeometry=!0,Y.userData.coverKind="roof",L.add(Y),p.push(Y)}L.position.set(d.x,0,d.z),L.rotation.y=C,this.terrain.add(L),this.cutaway=new Vv(d,p,{halfExtent:x+.3})}const y=rM(d.type==="pen"?"SUNNY PEN":d.type==="barn"?"HOME BARN":"CLOVER FIELD");y.position.set(d.x-Math.sin(d.heading||0)*(x+1),3,d.z-Math.cos(d.heading||0)*(x+1)),y.userData.ownedLabel=!0,this.terrain.add(y);for(const L of t.obstacles){this.place(Zh(Math.floor(a()*3)),L.x,L.z,L.radius*1.45);for(let C=0;C<4;C++){const E=C*Math.PI/2;this.place(Sa(C),L.x+Math.cos(E)*L.radius*.48,L.z+Math.sin(E)*L.radius*.48,L.radius*.7)}}const v=(L,C,E=0)=>L>s.minX+E&&L<s.maxX-E&&C>s.minZ+E&&C<s.maxZ-E&&!t.rivers.some(F=>ba(L,C,F.points)<F.width/2+E+.5)&&!t.roads.some(F=>ba(L,C,F.points)<F.width/2+E+.35)&&Math.hypot(L-d.x,C-d.z)>d.radius+E+2&&!t.obstacles.some(F=>Math.hypot(L-F.x,C-F.z)<F.radius+E)&&!(t.fenceSegments||[]).some(F=>sM(L,C,F.a,F.b)<E+.7),_=[];let A=0;for(const L of t.roads)for(let C=1;C<L.points.length;C++){const E=L.points[C-1],F=L.points[C],R=Math.hypot(F.x-E.x,F.z-E.z);R&&(A+=R,_.push({a:E,b:F,length:R,end:A,width:L.width}))}const T=(L,C)=>{if(L<C*.7&&A){const E=(L/(C*.7)+a()/(C*.7))*A,F=_.find(ft=>ft.end>=E)||_[_.length-1],R=(E-F.end+F.length)/F.length,B=(F.b.x-F.a.x)/F.length,Y=(F.b.z-F.a.z)/F.length,Q=(F.width/2+1.1+a()*2.8)*(L%2?1:-1);return{x:F.a.x+B*R*F.length-Y*Q,z:F.a.z+Y*R*F.length+B*Q}}return{x:s.minX+2+a()*(r-4),z:s.minZ+2+a()*(o-4)}};this.meadowDetails=[];const D=Math.min(190,Math.ceil(r*o/130));for(let L=0;L<D;L++){const{x:C,z:E}=T(L,D);v(C,E,1)&&(this.place(iM(L,3),C,E,.85+a()*.6),this.meadowDetails.push({x:C,z:E,kind:"flower"}))}const N=[],b=Math.min(650,Math.ceil(r*o/35));for(let L=0;L<b;L++){const{x:C,z:E}=T(L,b);v(C,E,.4)&&(N.push({x:C,z:E}),this.meadowDetails.push({x:C,z:E,kind:"tuft"}))}if(N.length){const L=new js(.12,.55,3),C=new ge({color:"#648844",roughness:1,transparent:!0,opacity:1,depthWrite:!1}),E=new Ei(L,C,N.length),F=new _e;N.forEach((R,B)=>{F.position.set(R.x,.18,R.z),F.scale.set(.7+a()*.6,.55+a()*.8,.7+a()*.6),F.rotation.y=a()*Math.PI,F.updateMatrix(),E.setMatrixAt(B,F.matrix)}),E.receiveShadow=!0,E.userData.decorativeGrass=!0,E.userData.ownedGeometry=E.userData.ownedMaterial=!0,this.terrain.add(E),this.trackScenery(E)}const S=[];for(const L of t.rivers)for(let C=2;C<L.points.length-2;C+=5){const E=L.points[C],F=L.points[C+1],R=F.x-E.x,B=F.z-E.z,Y=Math.hypot(R,B)||1;for(const Q of[-1,1]){const ft=E.x-B/Y*(L.width/2+.65)*Q,Ct=E.z+R/Y*(L.width/2+.65)*Q;ft>s.minX&&ft<s.maxX&&Ct>s.minZ&&Ct<s.maxZ&&!L.bridges.some(et=>Math.hypot(ft-et.x,Ct-et.z)<et.length/2+et.width)&&S.push({x:ft,z:Ct})}}if(S.length){const L=new js(.18,.95,4),C=new ge({color:"#5b7951",roughness:1}),E=new Ei(L,C,S.length),F=new _e;S.forEach((R,B)=>{F.position.set(R.x,.4,R.z),F.rotation.z=(a()-.5)*.25,F.updateMatrix(),E.setMatrixAt(B,F.matrix)}),E.userData.ownedGeometry=E.userData.ownedMaterial=!0,this.terrain.add(E),this.trackScenery(E)}const U=Math.min(62,28+Math.floor(t.index/3));for(let L=0;L<U;L++){let C,E;const F=L%4;F<2?(C=s.minX-12+a()*(r+24),E=F===0?s.minZ-4-a()*17:s.maxZ+4+a()*17):(C=F===2?s.minX-5-a()*18:s.maxX+5+a()*18,E=s.minZ+a()*o),!t.rivers.some(R=>ba(C,E,R.points)<R.width/2+3)&&this.place(Zh(L%3),C,E,1.3+a()*1.8)}this.bushPlacements=L_(t);for(const L of this.bushPlacements)this.place(Sa(L.variant),L.x,L.z,L.scale);this.nature.setLevel(t),this.waterEffects.setLevel(t,{grassMaterials:[this.grass],pathMaterials:[this.path],waterMaterial:this.water,terrain:this.terrain,rivers:f,weather:this.nature.weather}),this.batchScenery(),this.dog=jv(),this.dog.scale.setScalar(1.35),this.actors.add(this.dog);const k=new ie(new Gc(.82,.95,40),new rn({color:"#fff0bb",transparent:!0,opacity:.9,side:Te,depthWrite:!1}));k.rotation.x=-Math.PI/2,k.position.y=.03,k.userData.ownedGeometry=k.userData.ownedMaterial=!0,this.dog.add(k);const W=new Vu;W.moveTo(0,1.45),W.lineTo(-.19,1.05),W.lineTo(.19,1.05),W.closePath(),this.goalPointer=new ie(new Wc(W),new rn({color:"#be8652",side:Te,depthWrite:!1})),this.goalPointer.rotation.x=Math.PI/2,this.goalPointer.userData.ownedGeometry=this.goalPointer.userData.ownedMaterial=!0,this.dog.add(this.goalPointer);for(const L of t.animals){const C=new _e;C.position.set(L.x,0,L.z),C.rotation.y=Math.PI/2,this.animalMeshes.push(C)}for(const L of["sheep","cow"]){const C=t.animals.flatMap((B,Y)=>B.type===L?[Y]:[]);if(!C.length)continue;const E=tM(L),F=[];let R=0;for(const B of E.children){B.geometry.boundingSphere||B.geometry.computeBoundingSphere();const Y=B.geometry.boundingSphere,Q=B.userData.pivot;R=Math.max(R,Y.center.length()+Y.radius+(Q?Math.hypot(...Q):0));const ft=new Ei(B.geometry,B.material,C.length);ft.instanceMatrix.setUsage(io),ft.castShadow=ft.receiveShadow=!0,ft.frustumCulled=!1,ft.userData.limbIndex=B.userData.limbIndex,ft.userData.pivot=Q,this.actors.add(ft),F.push(ft)}this.animalBatches.push({indices:C,meshes:F,radius:R,visibleIndices:[]})}this.center.set(t.spawn.x+(this.aspect<.8?2:10),0,t.spawn.z+1),this.time=0,this.update(t,t.dog,0,!0)}placeFence(t,e){const n=Math.hypot(e.x-t.x,e.z-t.z),s=Math.max(1,Math.ceil(n/1.8)),r=new se;r.position.set((t.x+e.x)/2,0,(t.z+e.z)/2),r.rotation.y=-Math.atan2(e.z-t.z,e.x-t.x);const o=(a,c,l,u=1,h=1,f=1)=>{const d=this.fenceParts[a].clone();d.position.set(c,l,0),d.scale.set(u,h,f),d.userData.fencePart=!0,r.add(d)};for(let a=0;a<=s;a++){const c=-n/2+a*n/s;o(0,c,.46),o(1,c,.94,.083,.065,.083)}for(let a=0;a<s;a++)for(const c of[.34,.69])o(2,-n/2+(a+.5)*n/s,c,n/s+.03);this.terrain.add(r)}trackScenery(t){const e=t.instanceMatrix.array.slice(),n=new Float32Array(t.count*4),s=new Qt,r=new hi;t.geometry.boundingSphere||t.geometry.computeBoundingSphere();for(let o=0;o<t.count;o++)s.fromArray(e,o*16),r.copy(t.geometry.boundingSphere).applyMatrix4(s),n.set([r.center.x,r.center.y,r.center.z,r.radius],o*4);t.instanceMatrix.setUsage(io),t.frustumCulled=!1,this.sceneryBatches.push({batch:t,matrices:e,bounds:n})}batchScenery(){this.terrain.updateMatrixWorld(!0);const t=new Map;this.terrain.traverse(n=>{if(!n.isMesh||n.isInstancedMesh||n.userData.ownedGeometry||n.material.transparent)return;const s=`${n.geometry.id}:${n.material.id}`;t.has(s)||t.set(s,[]),t.get(s).push(n)});for(const n of t.values()){if(n.length<2)continue;const s=n[0],r=new Ei(s.geometry,s.material,n.length);n.forEach((o,a)=>{r.setMatrixAt(a,o.matrixWorld),o.parent.remove(o)}),r.castShadow=!!s.userData.fencePart,r.receiveShadow=!0,this.terrain.add(r),this.trackScenery(r)}const e=[];this.terrain.traverse(n=>{n.isGroup&&!n.children.length&&e.push(n)}),e.forEach(n=>n.parent.remove(n))}cullScenery(){this.camera.updateMatrixWorld(!0),this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);const t=this.sceneryFrustum.planes;for(const{batch:e,matrices:n,bounds:s}of this.sceneryBatches){let r=0;for(let o=0;o<s.length;o+=4){const a=s[o+3]+2;t.some(c=>c.normal.x*s[o]+c.normal.y*s[o+1]+c.normal.z*s[o+2]+c.constant<-a)||e.instanceMatrix.array.set(n.subarray(o*4,o*4+16),r++*16)}e.count=r,e.visible=r>0,e.instanceMatrix.needsUpdate=!0,e.instanceMatrix.clearUpdateRanges(),r&&e.instanceMatrix.addUpdateRange(0,r*16)}}updateAnimalBatches(t,e){const n=this.sceneryFrustum.planes,s=new Qt,r=new Qt,o=new Qt;for(const a of this.animalBatches){const c=a.visibleIndices;c.length=0;for(const l of a.indices){const u=this.animalMeshes[l],h=u.position,f=a.radius*Math.max(Math.abs(u.scale.x),Math.abs(u.scale.y),Math.abs(u.scale.z))+3;n.some(d=>d.normal.x*h.x+d.normal.y*h.y+d.normal.z*h.z+d.constant<-f)||c.push(l)}c.forEach((l,u)=>a.meshes.forEach(h=>{if(h.userData.limbIndex===void 0){h.setMatrixAt(u,this.animalMeshes[l].matrix);return}const f=t.animals[l],d=h.userData.limbIndex,g=d===0||d===3?0:Math.PI,x=Math.sin(e*12+l*.8+g)*Math.min(.5,Math.hypot(f.vx,f.vz)*.15);s.makeTranslation(...h.userData.pivot),r.makeRotationX(x),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),h.setMatrixAt(u,o)}));for(const l of a.meshes)l.count=c.length,l.visible=c.length>0,l.instanceMatrix.needsUpdate=!0,l.instanceMatrix.clearUpdateRanges(),c.length&&l.instanceMatrix.addUpdateRange(0,c.length*16)}}update(t,e,n,s=!1){this.time+=n,this.preview=s;const r=t.animals.filter(p=>!p.saved),o=r.reduce((p,m)=>({x:p.x+m.x/r.length,z:p.z+m.z/r.length}),{x:0,z:0}),c=(s?this.aspect<.8?50:44:this.aspect<.8?39:36)/2,l=c*this.aspect;let u=s?t.spawn.x+(this.aspect<.8?2:10):e.x*.68+(r.length?o.x:t.target.x)*.32+2,h=s?t.spawn.z+1:e.z*.75+(r.length?o.z:t.target.z)*.25+1;s||(u=Math.max(e.x-l*.45,Math.min(e.x+l*.45,u)),h=Math.max(e.z-4,Math.min(e.z+4,h)));const f=s?Math.min(1,n*.8):Math.min(1,n*3.5);if(this.center.x+=(u-this.center.x)*f,this.center.z+=(h-this.center.z)*f,!s){const p=Math.max(1,l-2.5);this.center.x=Math.max(e.x-p,Math.min(e.x+p,this.center.x))}this.camera.left=-l,this.camera.right=l,this.camera.top=c,this.camera.bottom=-c,this.camera.updateProjectionMatrix(),this.camera.position.set(this.center.x,36,this.center.z+29),this.camera.lookAt(this.center.x,0,this.center.z-2),this.sun.position.set(this.center.x-18,35,this.center.z+20),this.sun.target.position.set(this.center.x,0,this.center.z),this.sun.target.updateMatrixWorld(),this.dog.position.set(e.x,Ti(t,e.x,e.z)+Math.sin(this.time*16)*Math.min(.06,Math.hypot(e.vx||0,e.vz||0)*.008),e.z),this.dog.rotation.y=e.heading??Math.PI/2,this.goalPointer.rotation.set(Math.PI/2,0,0),this.goalPointer.quaternion.premultiply(new Gn().setFromAxisAngle(new z(0,1,0),Math.atan2(t.target.x-e.x,t.target.z-e.z)-this.dog.rotation.y)),this.goalPointer.position.y=.04,this.goalPointer.visible=!s;const d=this.dog.userData.parts,g=Math.floor(this.time*12)/12;Qv(this.dog,n),d.tail.rotation.z=Math.sin(g*7)*.3,t.animals.forEach((p,m)=>{const y=this.animalMeshes[m];y.position.set(p.x,Ti(t,p.x,p.z)+Math.sin(g*12+m)*Math.min(.07,Math.hypot(p.vx,p.vz)*.025),p.z),y.rotation.y=p.heading??Math.PI/2,y.rotation.z=Math.sin(g*9+m)*Math.min(.055,Math.hypot(p.vx,p.vz)*.02),y.updateMatrix()}),this.updateBarks(n);for(const p of t.helpers||[]){let m=this.helperMeshes.get(p.type);m||(m=p.type==="drone"?eM():Kv(),p.type==="helper"&&m.scale.setScalar(1.1),this.helperMeshes.set(p.type,m),this.actors.add(m));const y=p.x-m.position.x,v=p.z-m.position.z;m.position.set(p.x,p.type==="drone"?2+Math.sin(this.time*4)*.18:Ti(t,p.x,p.z),p.z),p.type==="drone"?m.userData.parts.propellers.forEach(_=>_.rotation.y=this.time*35):(Number.isFinite(p.heading)?m.rotation.y=p.heading:Math.hypot(y,v)>.001&&(m.rotation.y=Math.atan2(y,v)),m.userData.parts.legs.forEach((_,A)=>_.rotation.x=Math.sin(g*14+(A===0||A===3?0:Math.PI))*Math.min(.5,Math.hypot(y,v)*15)),m.userData.parts.tail.rotation.z=Math.sin(g*7)*.3,ma(m,(this.barkEffects||[]).some(_=>_.buddy)))}ma(this.dog,(this.barkEffects||[]).some(p=>!p.buddy)),this.gateView?.update(),this.goal.material.opacity=.38+Math.sin(this.time*2)*.09,this.cutaway?.update(this.camera,[e,...t.animals,...(t.helpers||[]).filter(p=>p.type!=="drone")],n),this.nature.update(n,{dog:e,animals:t.animals,camera:this.camera,time:this.time,paused:n<=0});const x=this.nature.weather;this.waterEffects.update(n,{weather:x,movers:[{...e,id:"pip"},...t.animals.map(p=>({...p,id:`flock-${p.id}`})),...(t.helpers||[]).filter(p=>p.type!=="drone").map(p=>({...p,id:`helper-${p.type}`}))],paused:n<=0}),this.sun.intensity=2.05*x.daylight+x.lightningFlash,this.hemisphere.intensity=1.65*x.daylight+x.lightningFlash*.6,this.scene.background.copy(this.skyDay).lerp(this.skyStorm,x.cloudCoverage*.5),this.scene.fog.color.copy(this.scene.background);for(const p of this.particles)p.life-=n,p.mesh.position.addScaledVector(p.velocity,n),p.velocity.y-=n*6,p.mesh.rotation.x+=n*2,p.mesh.scale.setScalar(Math.max(0,p.life)),p.life<=0&&(this.actors.remove(p.mesh),p.mesh.geometry.dispose(),p.mesh.material.dispose());this.particles=this.particles.filter(p=>p.life>0),this.cullScenery(),this.updateAnimalBatches(t,g),this.renderer.render(this.scene,this.camera)}celebrate(t,e){for(let n=0;n<36;n++){const s=new ie(new xn(.12,.12,.05),new rn({color:["#f0b65c","#f8e8ad","#e99585","#80b398"][n%4]}));s.userData.ownedGeometry=s.userData.ownedMaterial=!0,s.position.set(t,1.5,e),this.actors.add(s),this.particles.push({mesh:s,velocity:new z(Math.sin(n*2.4)*3,2+n%5,Math.cos(n*2.4)*3),life:1.8})}}bark(t){t||ma(this.dog,!0);const e=t?{x:t.x,z:t.z}:{x:this.dog.position.x,z:this.dog.position.z},n=new ie(Yh(this.level,e),new rn({color:"#fff6d8",side:Te,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1}));for(n.renderOrder=1,n.userData.ownedGeometry=n.userData.ownedMaterial=!0,this.actors.add(n),this.barkEffects??=[],this.barkEffects.push({mesh:n,origin:e,age:0,buddy:!!t});this.barkEffects.length>4;){const s=this.barkEffects.shift();this.actors.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose()}}updateBarks(t){for(const e of this.barkEffects||[])if(!(t<=0)){if(e.age+=t,e.age>=.6){this.actors.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();continue}Yh(this.level,e.origin,1+e.age/.6*6,e.mesh.geometry),e.mesh.material.opacity=.8*(1-e.age/.6)}this.barkEffects=(this.barkEffects||[]).filter(e=>e.age<.6)}drawMap(t,e,n){const s=t.getContext("2d"),r=t.width,o=t.height,a=e.bounds,c=d=>8+(d-a.minX)/(a.maxX-a.minX)*(r-16),l=d=>8+(d-a.minZ)/(a.maxZ-a.minZ)*(o-16);s.fillStyle="#c9d8b7",s.fillRect(0,0,r,o);const u=(d,g,x)=>{s.lineWidth=g,s.strokeStyle=x,s.lineCap="round",s.lineJoin="round",s.beginPath(),d.forEach((p,m)=>m?s.lineTo(c(p.x),l(p.z)):s.moveTo(c(p.x),l(p.z))),s.stroke()},h=Math.min((r-16)/(a.maxX-a.minX),(o-16)/(a.maxZ-a.minZ));for(const d of e.rivers){u(d.points,d.width*h,"#5dabb7");for(const g of d.bridges){const x=Math.sin(g.heading)*g.length/2,p=Math.cos(g.heading)*g.length/2;u([{x:g.x-x,z:g.z-p},{x:g.x+x,z:g.z+p}],Math.max(3,g.width*h),"#dfbd8c")}}for(const d of e.roads)u(d.points,Math.max(1.5,d.width*h),"#d4b784");Gv(s,e.target,d=>({x:c(d.x),y:l(d.z)}));for(const d of e.fenceSegments||[])u([d.a,d.b],d.material==="stone"?2:d.kind==="boundary"?1:1.5,d.material==="stone"?"#777d70":"#8f7758");for(const d of e.gates||[])if(d.operable&&!d.open){const g=Rc(d);u([g.a,g.b],2.5,"#b46c35")}const f=(d,g,x,p)=>{s.fillStyle=p,s.beginPath(),s.arc(c(d),l(g),x,0,Math.PI*2),s.fill()};for(const d of e.animals)f(d.x,d.z,d.type==="cow"?3:2.3,d.saved?"#80a777":"#fff8e7");f(n.x,n.z,4.8,"#c9843b"),s.strokeStyle="#fff2d0",s.lineWidth=2,s.beginPath(),s.arc(c(n.x),l(n.z),6,0,Math.PI*2),s.stroke();for(const d of e.helpers||[])f(d.x,d.z,3,"#4a9c9b")}}class aM{constructor(){this.context=null,this.master=null,this.music=null,this.effects=null,this.ambience=null,this.ambientSources=new Set,this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1,this.noiseBuffer=null,this.thunderSource=null,this.thunderEvent=null,this.weatherState=null,this.birdCountdown=4+Math.random()*6,this.muted=!1,this.paused=!1,this.timer=null,this.step=0,this.nextNoteTime=0,this.active=new Set,this.disposed=!1,this.activationGeneration=0,this.tempo=106}async start(){if(this.disposed)return!1;const t=++this.activationGeneration;try{if(!this.context){const n=globalThis.AudioContext||globalThis.webkitAudioContext;if(!n)return!1;this.context=new n,this.master=this.context.createGain(),this.music=this.context.createGain(),this.effects=this.context.createGain(),this.ambience=this.context.createGain(),this.master.gain.value=this.muted?0:.975,this.music.gain.value=.42,this.effects.gain.value=.6,this.ambience.gain.value=.38,this.music.connect(this.master),this.effects.connect(this.master),this.ambience.connect(this.master),this.master.connect(this.context.destination)}const e=this.context;return await e.resume(),this.disposed||t!==this.activationGeneration||this.context!==e?!1:(this.paused=!1,this.music.gain.cancelScheduledValues(this.context.currentTime),this.music.gain.setTargetAtTime(.42,this.context.currentTime,.025),this._begin(),!0)}catch{return!1}}setMuted(t){if(this.muted=!!t,this.muted&&this._stopAmbience(),!this.context||!this.master)return;const e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(this.muted?0:.975,e,.025)}pause(){this.activationGeneration++,this.paused=!0,this._stopScheduler(),this._stopAmbience(),this.context&&this.context.state!=="closed"&&this.music.gain.setTargetAtTime(1e-4,this.context.currentTime,.025)}async resume(){return this.start()}_begin(){this.timer||this.paused||this.disposed||(this.nextNoteTime=this.context.currentTime+.06,this._schedule(),this.timer=globalThis.setInterval(()=>this._schedule(),100))}_stopScheduler(){this.timer!==null&&globalThis.clearInterval(this.timer),this.timer=null}_schedule(){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;const t=60/this.tempo/2;if(!Number.isFinite(t)||t<=0)return;const e=this.context.currentTime;if(this.nextNoteTime<e){const n=Math.ceil((e-this.nextNoteTime)/t);this.step=(this.step+n)%128,this.nextNoteTime=Math.max(e,this.nextNoteTime+n*t)}for(let n=0;n<8&&this.nextNoteTime<e+.25;n++)this._musicStep(this.step,this.nextNoteTime,t),this.step=(this.step+1)%128,this.nextNoteTime+=t}_musicStep(t,e,n){const s=[48,53,48,55,57,53,55,48],r=[[72,76,79,null,76,74,72,null],[77,81,79,null,77,76,74,null],[72,76,79,81,79,null,76,null],[74,79,83,null,81,79,74,null],[76,81,84,null,83,81,79,null],[77,null,81,79,77,76,74,null],[74,77,79,null,83,81,79,74],[76,74,72,null,79,null,72,null]],o=Math.floor(t/16),a=t%16,c=s[o],l=o===4;if(a%4===0&&this._note(c+(a===8?7:0),e,.32,.15,"bass",this.music),a%4===2&&(this._note(c+12,e,.22,.048,"pluck",this.music),this._note(c+(l?15:16),e+.018,.22,.042,"pluck",this.music),this._note(c+19,e+.035,.22,.036,"pluck",this.music)),a%2===0){const u=r[o][a/2];u!==null&&this._note(u,e,n*1.5,.12,o%2?"flute":"marimba",this.music)}}updateAmbience(t,e={}){const n=e.weather||"sun",s=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed;if(this._updateThunder(typeof n=="object"?n:null,s),!s)return;const r=typeof n=="string"?n:n.type||"sun",o=typeof n=="object"&&Number.isFinite(n.intensity)?Math.max(0,Math.min(1,n.intensity)):.3,a=["rain","light-rain","heavy-rain","storm"].includes(r)?"rain":r==="wind"?"wind":"sun",c=typeof n=="object"?n.storm?"storm":n.kind||r:r,l=c==="storm"?1:c==="heavy-rain"?.85:.5;this._weather(a,o,l),this.birdCountdown-=Number.isFinite(t)?Math.max(0,Math.min(t,.25)):0,!(this.birdCountdown>0)&&(this.birdCountdown=a==="rain"?10+Math.random()*10:4+Math.random()*6,!(typeof n=="object"&&(n.storm||n.kind==="storm")||r==="storm"||a==="rain"&&o>=.7)&&this._chirp(a==="rain"?.018:.03))}_noise(){if(!this.noiseBuffer){const t=this.context;this.noiseBuffer=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const e=this.noiseBuffer.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1}return this.noiseBuffer}_updateThunder(t,e){t!==this.weatherState&&(this.thunderSource&&this._releaseAmbience(this.thunderSource),this.thunderSource=null,this.thunderEvent=null,this.weatherState=t,this._restoreMusicMix());const n=t?.lightningId;if(!n||n===this.thunderEvent)return;this.thunderEvent=n;const s=t.lightningAge,r=t.thunderDelay;if(!e||!Number.isFinite(s)||!Number.isFinite(r)||s<0||r<0||s>r+.2)return;this.thunderSource&&this._releaseAmbience(this.thunderSource);const o=this.context,a=o.createBufferSource(),c=o.createBiquadFilter(),l=o.createGain(),u=o.currentTime+Math.max(.01,r-s),h=3+Math.random()*2;a.buffer=this._noise(),a.loop=!0,c.type="lowpass",c.Q.value=.35,c.frequency.setValueAtTime(400,u),c.frequency.exponentialRampToValueAtTime(85,u+h*.65),l.gain.setValueAtTime(1e-4,u),l.gain.exponentialRampToValueAtTime(.65,u+.12),l.gain.exponentialRampToValueAtTime(.32,u+h*.23),l.gain.exponentialRampToValueAtTime(.035,u+h*.56),l.gain.exponentialRampToValueAtTime(1e-4,u+h*.76),a.connect(c),c.connect(l),l.connect(this.effects);const f=[];for(const[g,x]of[[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]){const p=o.createDelay(1.2),m=o.createGain();p.delayTime.value=h*g,m.gain.value=x,l.connect(p),p.connect(m),m.connect(this.effects),f.push(p,m)}this.music.gain.cancelScheduledValues(o.currentTime),this.music.gain.setValueAtTime(.42,o.currentTime),this.music.gain.setTargetAtTime(.16,u,.04),this.music.gain.setTargetAtTime(.42,u+h*.72,.35),this._trackAmbience(a,[c,l,...f]),this.thunderSource=a;const d=a.onended;a.onended=()=>{d(),this.thunderSource===a&&(this.thunderSource=null)},a.start(u),a.stop(u+h)}_chirp(t){const e=this.context.currentTime+.015,n=1600+Math.random()*1100,s=2+Math.floor(Math.random()*2);for(let r=0;r<s;r++){const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r*(.14+Math.random()*.035);o.type="sine",o.frequency.setValueAtTime(n*(1+r*.1),c),o.frequency.exponentialRampToValueAtTime(n*(r%2?.9:1.28),c+.07),o.frequency.exponentialRampToValueAtTime(n*.95,c+.13),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(t,c+.025),a.gain.exponentialRampToValueAtTime(1e-4,c+.15),o.connect(a),a.connect(this.ambience),this._trackAmbience(o,[a]),o.start(c),o.stop(c+.17)}}_trackAmbience(t,e){this.active.add(t),this.ambientSources.add(t),t.onended=()=>{t.disconnect();for(const n of e)n.disconnect();this.active.delete(t),this.ambientSources.delete(t)}}_weather(t,e,n=1){if(this.weatherKind!==t&&(this._stopWeather(),this.weatherKind=t,t!=="sun")){const s=this.context;this._noise();const r=s.createBufferSource(),o=s.createBiquadFilter(),a=s.createGain();r.buffer=this.noiseBuffer,r.loop=!0,o.type="lowpass",o.frequency.value=t==="rain"?2200:500,o.Q.value=.3,a.gain.value=1e-4,r.connect(o),o.connect(a),a.connect(this.ambience),this._trackAmbience(r,[o,a]),this.weatherSource={source:r,gain:a,filter:o},r.start()}if(this.weatherSource){const s=(t==="rain"?.032*n:.024)*e;Math.abs(s-this.weatherVolume)>.001&&(this.weatherSource.gain.gain.setTargetAtTime(s,this.context.currentTime,.8),this.weatherVolume=s)}}_stopWeather(){this.weatherSource&&this._releaseAmbience(this.weatherSource.source),this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1}_releaseAmbience(t){try{t.stop()}catch{}t.onended?.(),t.onended=null}_restoreMusicMix(){if(!this.context||!this.music||this.context.state==="closed")return;const t=this.context.currentTime;this.music.gain.cancelScheduledValues(t),this.music.gain.setTargetAtTime(this.paused?1e-4:.42,t,.025)}_stopAmbience(){this._restoreMusicMix(),this._stopWeather(),this.thunderSource=null;for(const t of[...this.ambientSources])this._releaseAmbience(t);this.birdCountdown=4+Math.random()*6}_note(t,e,n,s,r="marimba",o=this.effects){if(!this.context||!o||this.disposed)return;const a=this.context,c=a.createOscillator(),l=a.createGain(),u=440*2**((t-69)/12);c.type=r==="pluck"?"triangle":"sine",c.frequency.setValueAtTime(u,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(.001,s),e+(r==="flute"?.035:.009)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l),l.connect(o),this.active.add(c),c.onended=()=>{c.disconnect(),l.disconnect(),this.active.delete(c)},c.start(e),c.stop(e+n+.03),r==="marimba"&&this._note(t+19,e,n*.35,s*.12,"partial",o)}play(t){if(!this.context||this.context.state!=="running"||this.muted||this.disposed)return;const e=this.context.currentTime+.01;if(t==="bark"){[0,.14].forEach(r=>{const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r;o.type="triangle",o.frequency.setValueAtTime(330,c),o.frequency.exponentialRampToValueAtTime(110,c+.095),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(.11,c+.012),a.gain.exponentialRampToValueAtTime(1e-4,c+.1),o.connect(a),a.connect(this.effects),this.active.add(o),o.onended=()=>{o.disconnect(),a.disconnect(),this.active.delete(o)},o.start(c),o.stop(c+.12)});return}const s={saved:[79,84],animal:[79,84],rescue:[79,84],purchase:[72,76,79,84],unlock:[72,76,79,84],completed:[72,76,79,84,79,84],complete:[72,76,79,84,79,84],win:[72,76,79,84,79,84],click:[79]}[t];s&&s.forEach((r,o)=>this._note(r,e+o*.115,.28,.16,"marimba"))}dispose(){if(!this.disposed){this.activationGeneration++,this.disposed=!0,this._stopScheduler(),this._stopAmbience();for(const t of this.active){try{t.stop()}catch{}t.disconnect()}this.active.clear(),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{}),this.context=null,this.master=this.music=this.effects=this.ambience=null,this.noiseBuffer=null}}}const _t=i=>document.getElementById(i);let je,Dt,ni,le=sv(),Ft="intro",Ai="playing",$h=performance.now(),li=0,il=0,fo=0,Sn=0,wo=!1,sl=0,rr=!1,Jh,rl=null;const Oe=new aM,An={x:0,z:0},dn=new Set,cM=Nd({document,getState:()=>({level:Dt,dog:ni,playing:Ft==="playing"}),onOpen:()=>ol("Gate open — guide the flock through.")}),De=(i,t)=>_t(i).classList.toggle("hidden",!t);let po=!1;const Eo=()=>{po||rv(le)||ol("Progress is kept for this session; browser storage is unavailable.")},Kh=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function ol(i){_t("toast").textContent=i,De("toast",!0),clearTimeout(Jh),Jh=setTimeout(()=>De("toast",!1),2800)}function Fi(){_t("points").textContent=le.points,_t("sound").textContent=le.music?"♫":"♪",_t("sound").setAttribute("aria-label",le.music?"Mute sound":"Enable sound"),_t("sound").style.opacity=le.music?"1":".55"}function _s(){An.x=An.z=0,ri=null,dn.clear(),_t("stick").style.transform="translate(0,0)"}async function zi(i=le.highestLevel){i=Math.max(0,Math.min(99,Math.floor(Number(i)||0))),Ri(!1),Dt=ru(i),ni={...Dt.dog,heading:Dt.dog.heading??Math.atan2(Dt.spawn.x-Dt.dog.x,Dt.spawn.z-Dt.dog.z)},li=0,Sn=0,wo=!1,il=fo=0,_s(),je.setLevel(Dt),Ft="playing";for(const t of["intro","scene-tag"])De(t,!1);for(const t of["mission","controls","map-box"])De(t,!0);_t("level-name").textContent=`LEVEL ${i+1} · ${Dt.title}`,_t("objective").textContent=Dt.target.type==="pen"?"Everyone into the pen":Dt.target.type==="barn"?"Bring the flock home":"Over to Clover Field",_t("total").textContent=`/ ${Dt.animals.length}`,_t("saved").textContent=0,_t("progress").style.width="0%",_t("countdown").textContent=`First arrival starts ${bo(Dt)}s`,_t("countdown").classList.toggle("running",!1),_t("mission-score").textContent=`Score 0 / ${Dt.reward}`,rr=!1,De("toggle-tip",!1),_t("toggle-tip").setAttribute("aria-expanded","false"),De("tip",!0),mo(al(i)[0]),Oe.setMuted(!le.music),await Oe.start(),Ft!=="playing"&&Oe.pause(),Fi()}const lM=14;function al(i){return i===0?["Drag with your thumb to move Pip. Try circling behind the sheep.","Sheep move away from Pip. Stay behind them to guide them to the golden pen.","Lovely! Circle behind the stragglers. Double-tap anywhere to woof."]:[Dt.routes.length>1?"Choose a winding trail on the map. Each trail reaches home.":"Follow the winding trail. Gather stragglers before crossing."]}function cl(){wo=!0,rr=!1,De("tip",!1),De("toggle-tip",!0),_t("toggle-tip").setAttribute("aria-expanded","false"),_t("toggle-tip").setAttribute("aria-label","Show tips")}function mo(i){sl=li,_t("tip-text").textContent=i,_t("tip").querySelector(".tip-number").textContent=`0${Sn+1}`}function To(){Ft!=="playing"||performance.now()<fo||(il=performance.now()+650,fo=performance.now()+2100,Oe.play("bark"),je.bark(),navigator.vibrate&&navigator.vibrate(20))}function Ao(i,t="paused"){Ai=Ft==="playing"?"playing":Ft==="complete"?"complete":"intro",Ft=t,_s(),Oe.pause(),_t("modal").classList.contains("hidden")&&(rl=document.activeElement),_t("modal-card").innerHTML=i,De("modal",!0),De("controls",!1),setTimeout(()=>_t("modal-card").querySelector("button")?.focus(),30)}function Ri(i=!0){De("modal",!1),i&&(Ft=Ai,De("controls",Ft==="playing"),Ft==="playing"&&Oe.resume(),rl?.focus()),_s()}function Ss(){if(Ft==="reset-confirm"){_t("cancel-reset").onclick();return}if(Ft==="shop"){_t("shop-back").onclick();return}if(Ft==="paused"){Ri();return}Ft!=="complete"&&(Ao(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${Ft==="intro"?"Hello, shepherd.":"Paws for a moment."}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${Ft==="intro"?"Back to the meadow":"Keep herding"} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${le.points} bolts</button>${Ft==="playing"?'<button class="secondary" id="restart">Restart this meadow</button>':""}<button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,le.highestLevel+1)},(i,t)=>`<button class="${t===Dt.index?"current":""}" data-level="${t}" aria-label="Play level ${t+1}">${t+1}</button>`).join("")}</div>`),_t("close").onclick=()=>Ri(),_t("resume").onclick=()=>Ri(),_t("upgrades-menu").onclick=Ro,_t("restart-game-menu").onclick=ud,_t("restart")&&(_t("restart").onclick=()=>zi(Dt.index)),_t("modal-card").querySelectorAll("[data-level]").forEach(i=>i.onclick=()=>zi(Number(i.dataset.level))))}function ud(){const i=Ft,t=Ai,e=()=>{Ft=i,Ai=t,i==="paused"?(Ft=t,Ss(),_t("restart-game-menu").focus()):(Ri(!1),rl?.focus())};Ao('<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>',"reset-confirm"),_t("close").onclick=e,_t("cancel-reset").onclick=e,_t("confirm-reset").onclick=async()=>{le={...ir(),music:le.music},qs=0,Os=-1/0,Mi=null,Eo(),Fi(),await zi(0),Ft==="playing"&&_t("pause").focus()}}function Ro(){const i=Ft==="complete"?"complete":Ft==="paused"||Ft==="shop"?Ai:Ft,t=po?Dt.index+1:void 0,e=ed(le.upgrades,Dt.index+1);Ao(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${le.points} bolts</strong> to spend.</p><div class="upgrade-grid">${So.filter(s=>s.id!=="drone").map(s=>{const r=Wn(le.upgrades,s.id),o=Wn(e,s.id),a=F_(le,s.id,t),c=qc(le.upgrades,s.id),l=a.reason==="locked",u=l?`Next tier unlocks at level ${a.unlockLevel}`:c===null?"All tiers owned":s.tierDescriptions[r],h=r>o?`<small class="inactive-upgrade">${o?"Next owned tier activates":"Equipped"} from level ${s.unlockLevels[o]}</small>`:"";return`<article class="upgrade ${l?"locked":""}"><div class="upgrade-icon">${{speed:"ϟ",flock:"⌁",drone:"✥",helper:"♧",bark:"♪",cohesion:"❋"}[s.id]}</div><div><h3>${Kh(s.name)} <small style="font-size:9px;color:#839277">${r}/3</small></h3><p>${Kh(u)}</p>${h}</div><button data-buy="${s.id}" ${a.available?"":"disabled"}>${c===null?"Max tier":l?`Level ${a.unlockLevel}`:`${c} ✦`}</button></article>`}).join("")}</div><button class="primary" id="shop-back">${i==="complete"?"Back to your reward":"Back to the meadow"} <span>➜</span></button>`,"shop"),Ai=i;const n=()=>{i==="complete"?ll(!1):Ri()};_t("close").onclick=n,_t("shop-back").onclick=n,_t("modal-card").querySelectorAll("[data-buy]").forEach(s=>s.onclick=()=>{const r=O_(le,s.dataset.buy,t);r.ok&&(Oe.play("purchase"),Eo(),Fi(),Ro(),Ai=i,ol(`${r.upgrade.tierNames[r.level-1]} equipped!`))})}let qs=0;function ll(i=!0){i&&(qs=iv(le,Dt),Eo(),Fi(),Oe.play("completed"),je.celebrate(Dt.target.x,Dt.target.z)),Ft="complete";const t=Dt.result?.saved??Dt.animals.filter(s=>s.saved).length,e=Dt.animals.length,n=Dt.result?.score??0;Ao(`<div class="complete-seal">✦</div><div class="eyebrow">${t===e?"A GOOD DAY’S HERDING":"DELIVERY TIME IS UP"}</div><h2>${t===e?"Everyone’s home.":t>0?"A flock brought home.":"Try this meadow again."}</h2><p>${t} / ${e} robots delivered.<br>Score ${n} / ${Dt.reward} · Best ${le.bestScores[Dt.index]||0} / ${Dt.reward}<br>${Math.floor(li/60)}m ${Math.floor(li%60)}s in the countryside.</p><div class="reward">+${qs}<span style="font-size:20px"> ✦</span></div><p>${qs?"Bolts earned from your improved delivery score.":"No extra bolts this time. Deliver more robots to improve your best score."}${t>0&&t<e?" The next meadow is open.":""}</p><button class="primary" id="next">${t===0?"Try again":Dt.index>=99?"Return to the first meadow":"Next meadow"} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,"complete"),_t("next").onclick=()=>zi(t===0?Dt.index:Dt.index>=99?0:Dt.index+1),_t("reward-shop").onclick=Ro,_t("replay").onclick=()=>zi(Dt.index)}let ri=null,Sc={x:0,y:0},Os=-1/0,Mi=null,hl=!1;function hM(i){Ft!=="playing"||ri!==null||i.isPrimary===!1||i.target.closest("button,header,.map-box,.tip")||i.target!==_t("world")&&!i.target.closest("#joystick")||(i.preventDefault(),ri=i.pointerId,Sc={x:i.clientX,y:i.clientY},hl=!1,i.target.setPointerCapture?.(ri))}function uM(i){if(i.pointerId!==ri)return;const t=i.clientX-Sc.x,e=i.clientY-Sc.y,n=Math.hypot(t,e),s=42;hl||=n>9,An.x=t/Math.max(s,n),An.z=e/Math.max(s,n),_t("stick").style.transform=`translate(${An.x*s}px,${An.z*s}px)`}function dd(i){if(i.pointerId===ri){if(i.preventDefault(),i.type!=="pointercancel"&&!hl){const t=performance.now();Mi&&Math.hypot(i.clientX-Mi.x,i.clientY-Mi.y)<42&&t-Os<330?(To(),Os=-1/0,Mi=null):(Os=t,Mi={x:i.clientX,y:i.clientY})}else Os=-1/0,Mi=null;ri=null,An.x=An.z=0,_t("stick").style.transform="translate(0,0)"}}document.addEventListener("pointerdown",hM,{passive:!1});document.addEventListener("pointermove",uM,{passive:!1});document.addEventListener("pointerup",dd,{passive:!1});document.addEventListener("pointercancel",dd,{passive:!1});const ul=i=>i===_t("world")||!!i.closest("#controls");document.addEventListener("touchstart",i=>{Ft==="playing"&&ul(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("touchend",i=>{Ft==="playing"&&ul(i.target)&&(i.preventDefault(),i.target.closest("#bark")&&To())},{passive:!1});document.addEventListener("gesturestart",i=>{Ft==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("gesturechange",i=>{Ft==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("dblclick",i=>{Ft==="playing"&&ul(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("keydown",i=>{if(Ft==="playing"&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","w","a","s","d","W","A","S","D"].includes(i.key)&&!i.target.closest('input,textarea,[contenteditable="true"]')&&!(i.key===" "&&i.target.closest("button"))&&(i.preventDefault(),dn.add(i.key.toLowerCase()),i.key===" "&&To()),i.key==="Escape"&&(i.preventDefault(),Ss()),i.key==="Tab"&&!_t("modal").classList.contains("hidden")){const t=[..._t("modal-card").querySelectorAll("button:not([disabled])")],e=t[0],n=t.at(-1);i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())}});document.addEventListener("keyup",i=>dn.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{_s(),ri=null,Ft==="playing"&&Ss()});document.addEventListener("visibilitychange",()=>{document.hidden&&Ft==="playing"&&Ss()});window.addEventListener("resize",()=>je?.resize());_t("play").onclick=()=>zi();_t("restart-game-main").onclick=ud;_t("bark").onclick=To;_t("pause").onclick=Ss;_t("home").onclick=i=>{i.preventDefault(),Ss()};_t("wallet").onclick=Ro;_t("sound").onclick=async()=>{le.music=!le.music,Oe.setMuted(!le.music),le.music&&(await Oe.start(),(Ft!=="playing"||!le.music)&&Oe.pause()),Eo(),Fi()};_t("dismiss-tip").onclick=cl;_t("toggle-tip").onclick=()=>{if(Ft==="playing"){if(!_t("tip").classList.contains("hidden")){cl();return}wo=!1,rr=!0,Sn=0,sl=li,mo(al(Dt.index)[0]),De("tip",!0),_t("toggle-tip").setAttribute("aria-expanded","true"),_t("toggle-tip").setAttribute("aria-label","Hide tips")}};let wa=0,fd;function pd(i){requestAnimationFrame(pd);const t=Math.min((i-$h)/1e3,.05);if($h=i,!je||!Dt)return;if(Ft==="playing"){li+=t;const n=dn.has("arrowright")||dn.has("d")?1:dn.has("arrowleft")||dn.has("a")?-1:An.x,s=dn.has("arrowdown")||dn.has("s")?1:dn.has("arrowup")||dn.has("w")?-1:An.z,r=ev(Dt,ni,{x:n,z:s,bark:i<il},t,le.upgrades);_t("saved").textContent=r.saved,_t("progress").style.width=`${r.total?r.saved/r.total*100:0}%`,_t("countdown").textContent=r.countdownStarted?`${Math.ceil(r.remaining)}s to gather the rest`:`First arrival starts ${bo(Dt)}s`,_t("countdown").classList.toggle("running",r.countdownStarted),_t("mission-score").textContent=`Score ${r.score} / ${r.possibleScore}`;for(const a of r.events)a.type==="animalSaved"?Oe.play("saved"):a.type==="buddyBark"&&(Oe.play("bark"),je.bark(a));const o=i<fo;if(_t("bark").classList.toggle("cooldown",o),_t("bark").disabled=o,!wo){const a=rr||Dt.index!==0||Sn>0?lM:5;if(li-sl>=a){const c=al(Dt.index);rr?(Sn=(Sn+1)%c.length,mo(c[Sn])):Sn+1<c.length?(Sn++,mo(c[Sn])):cl()}}r.justCompleted&&ll()}else Ft==="complete"&&!document.hidden&&tv(Dt,t);cM.update(),je.update(Dt,ni,!document.hidden&&(Ft==="playing"||Ft==="intro"||Ft==="complete")?t:0,Ft==="intro"),fd?.();const e=je.nature?.weather;e&&(_t("weather-status").textContent={sun:"☀ Clear skies",wind:"↝ Breezy",rain:"☂ Light rain","heavy-rain":"☂ Heavy rain",storm:"ϟ Thunderstorm"}[e.kind||e.type]||"Clear skies"),Ft==="playing"&&Oe.updateAmbience?.(t,{weather:je.nature?.weather||Dt.weather||"sun",level:Dt.index+1,time:Dt.time,dog:ni,animals:Dt.animals}),wa+=t,wa>.1&&(wa=0,je.drawMap(_t("map"),Dt,ni))}try{je=new oM(_t("world")),Dt=ru(0),ni={...Dt.dog,heading:Math.PI/2},je.setLevel(Dt),Fi(),De("loading",!1),requestAnimationFrame(pd)}catch(i){De("loading",!1),De("error",!0),_t("error-message").textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${i.message}`,console.error(i)}bd(async()=>{const{installQA:i}=await import("./qa-BRO7Tstr.js");return{installQA:i}},__vite__mapDeps([0,1]),import.meta.url).then(({installQA:i})=>{const t=()=>{Ft="qa",_s(),Oe.pause(),Ri(!1),De("controls",!1)},e=async s=>{const r=zi(s);t(),await r,t()},n=i({getRenderer:()=>je,getMode:()=>Ft,getState:()=>({level:Dt,dog:ni,profile:le,elapsed:li}),enterSession:async()=>{po||(po=!0,le=ir(),await e(0))},pause:t,isPaused:()=>Ft==="qa",resume:()=>{if(Dt.completed){ll(!1);return}Ft="playing",_s(),De("controls",!0),Oe.resume()},jump:e,resetSession:async()=>{le=ir(),qs=0,await e(0)},canOccupy:be,updateWallet:Fi});fd=()=>n.update()});
