const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qa-CDZoXb-o.js","./qa-DWlVkWAo.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Zd="modulepreload",$d=function(i,t){return new URL(i,t).href},Dl={},Kd=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(h=>{if(h=$d(h,n),h in Dl)return;Dl[h]=!0;const u=h.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(n)for(let g=o.length-1;g>=0;g--){const x=o[g];if(x.href===h&&(!u||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${p}`))return;const d=document.createElement("link");if(d.rel=u?"stylesheet":Zd,u||(d.as="script"),d.crossOrigin="",d.href=h,c&&d.setAttribute("nonce",c),document.head.appendChild(d),u)return new Promise((g,x)=>{d.addEventListener("load",g),d.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},Oa=Object.freeze([1,13/12,7/6,1.25]);function _s(i){return i?.type!=="cow"||!Number.isFinite(i.scale)?1:Oa.reduce((t,e)=>Math.abs(e-i.scale)<Math.abs(t-i.scale)?e:t,1)}const Oe=i=>i?.type==="cow"?.78*_s(i):.55,Zs=(i,t,e)=>Math.max(t,Math.min(e,i)),ve=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Fc=(i,t)=>{const e=Math.hypot(i,t);return e>1e-8?{x:i/e,z:t/e}:{x:0,z:0}};function Il(i){let t=i>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function Oc(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Zs(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return{x:t.x+n*r,z:t.z+s*r,t:r}}function rn(i,t,e){return ve(i,Oc(i,t,e))}const fn=i=>({x:Math.sin(i),z:Math.cos(i)});function Bc(i,t){const e=fn(i.heading),n=t.x-i.x,s=t.z-i.z;return{forward:n*e.x+s*e.z,lateral:n*e.z-s*e.x}}function Pi(i,t,e){const n=fn(i.heading);return{x:i.x+n.x*t+n.z*e,z:i.z+n.z*t-n.x*e}}function an(i){const t=i.radius+1.4,e=t,n=fn(i.heading),s={x:n.z,z:-n.x};return{x:i.x,z:i.z,heading:i.heading,halfLength:t,halfWidth:e,openingWidth:7,forward:n,side:s,corners:[[-t,-e],[t,-e],[t,e],[-t,e]].map(([r,o])=>Pi(i,r,o)),entrance:Pi(i,-t,0)}}function gr(i,t,e=0){const n=an(i),s=Bc(i,t),r=Math.max(0,e);return Math.abs(s.forward)<=n.halfLength-r&&Math.abs(s.lateral)<=n.halfWidth-r}function kc(i,t,e){const n=fn(i.heading),s=t.x-i.x,r=t.z-i.z;return Math.abs(s*n.x+r*n.z)<=i.length/2+e&&Math.abs(s*n.z-r*n.x)<=i.width/2-e}const Ll=new WeakMap;function xu(i){let t=Ll.get(i);if(t)return t;const e=fn(i.heading),n={x:e.z,z:-e.x},s=(c,l)=>({x:i.x+e.x*c+n.x*l,z:i.z+e.z*c+n.z*l}),r=[-1,1].map(c=>({a:s(-i.length/2-.1,c*i.width/2),b:s(i.length/2+.1,c*i.width/2),radius:.05,posts:Array.from({length:4},(l,h)=>s(-i.length/2+h*i.length/3,c*i.width/2))})),o=r.flatMap(c=>[c.a,c.b]),a={minX:Math.min(...o.map(c=>c.x)),maxX:Math.max(...o.map(c=>c.x)),minZ:Math.min(...o.map(c=>c.z)),maxZ:Math.max(...o.map(c=>c.z))};return t={rails:r,bounds:a},Ll.set(i,t),t}function Jd(i,t,e){const{rails:n,bounds:s}=xu(i),r=e+.065;return t.x<s.minX-r||t.x>s.maxX+r||t.z<s.minZ-r||t.z>s.maxZ+r?!1:n.some(o=>rn(t,o.a,o.b)<e+o.radius||o.posts.some(a=>ve(t,a)<e+.065))}function _u(i,t,e,n){const{rails:s,bounds:r}=xu(i),o=n+.065;return Math.max(t.x,e.x)<r.minX-o||Math.min(t.x,e.x)>r.maxX+o||Math.max(t.z,e.z)<r.minZ-o||Math.min(t.z,e.z)>r.maxZ+o?!1:s.some(a=>Mu(t,e,a.a,a.b,n+a.radius)||a.posts.some(c=>rn(c,t,e)<n+.065))}function jd(i,t,e=4){const n=i.points,s=n[0],r=n.at(-1),o=Math.abs(r.x-s.x)>Math.abs(r.z-s.z)?"x":"z",a=n[1][o]-s[o],c=Math.floor((t[o]-s[o])/a),l=Math.ceil(e/Math.abs(a))+2,h=[];for(let u=Math.max(0,c-l);u<Math.min(n.length-1,c+l+1);u++)h.push([n[u],n[u+1]]);return h}const zl=new WeakMap;function vu(i){let t=zl.get(i);return t||(t={minX:Math.min(...i.points.map(e=>e.x)),maxX:Math.max(...i.points.map(e=>e.x)),minZ:Math.min(...i.points.map(e=>e.z)),maxZ:Math.max(...i.points.map(e=>e.z))},zl.set(i,t)),t}function Gc(i,t,e){const n=vu(i),s=i.width/2+e;return t.x<n.minX-s||t.x>n.maxX+s||t.z<n.minZ-s||t.z>n.maxZ+s?!1:jd(i,t,s).some(([r,o])=>rn(t,r,o)<s)}function Qd(i,t,e,n){const s=vu(i),r=i.width/2+n;return Math.max(t.x,e.x)>=s.minX-r&&Math.min(t.x,e.x)<=s.maxX+r&&Math.max(t.z,e.z)>=s.minZ-r&&Math.min(t.z,e.z)<=s.maxZ+r}function Mu(i,t,e,n,s){if(Math.max(i.x,t.x)<Math.min(e.x,n.x)-s||Math.min(i.x,t.x)>Math.max(e.x,n.x)+s||Math.max(i.z,t.z)<Math.min(e.z,n.z)-s||Math.min(i.z,t.z)>Math.max(e.z,n.z)+s)return!1;const r=(h,u,p)=>(u.x-h.x)*(p.z-h.z)-(u.z-h.z)*(p.x-h.x),o=r(i,t,e),a=r(i,t,n),c=r(e,n,i),l=r(e,n,t);return o*a<0&&c*l<0?!0:Math.min(rn(i,e,n),rn(t,e,n),rn(e,i,t),rn(n,i,t))<s}function Vc(i){const t=fn(i.heading),e=i.width/2;return{a:{x:i.x-t.z*e,z:i.z+t.x*e},b:{x:i.x+t.z*e,z:i.z-t.x*e},kind:"gate",material:i.material||"wood"}}const yu=i=>i.material==="stone"?.3:.18;function Su(i){return[...i.fenceSegments||[],...(i.gates||[]).filter(t=>t.operable&&!t.open).map(Vc)]}function me(i,t,e,n=.55){const s={x:t,z:e},r=i.bounds;if(t<r.minX+n+.18||t>r.maxX-n-.18||e<r.minZ+n+.18||e>r.maxZ-n-.18)return!1;for(const o of Su(i))if(rn(s,o.a,o.b)<n+yu(o))return!1;for(const o of i.rivers||[])if(o.bridges.some(c=>Jd(c,s,n))||Gc(o,s,n)&&!o.bridges.some(c=>kc(c,s,n)))return!1;for(const o of i.obstacles||[])if(ve(s,o)<n+o.radius)return!1;return!0}function $s(i,t,e,n,s=.55){const r=Math.max(1,Math.ceil(Math.hypot(e,n)/.25)),o=e/r,a=n/r;let c=!1,l=!1;for(let h=0;h<r;h++)me(i,t.x+o,t.z+a,s)?(t.x+=o,t.z+=a):(me(i,t.x+o,t.z,s)?t.x+=o:Math.abs(o)>1e-8&&(c=!0),me(i,t.x,t.z+a,s)?t.z+=a:Math.abs(a)>1e-8&&(l=!0));return{blockedX:c,blockedZ:l}}function wu(i,t,e,n,s,r=!1){const o=i.bounds;for(const a of[t,e])if(a.x<o.minX+n+.18||a.x>o.maxX-n-.18||a.z<o.minZ+n+.18||a.z>o.maxZ-n-.18)return!1;for(const a of Su(i))if(!(r&&a.kind!=="gate"&&a.material!=="stone"&&(a.kind!=="target"||i.target?.type!=="barn"))&&Mu(t,e,a.a,a.b,n+yu(a)))return!1;for(const a of i.obstacles||[]){const c=n+a.radius;if(!(a.x<Math.min(t.x,e.x)-c||a.x>Math.max(t.x,e.x)+c||a.z<Math.min(t.z,e.z)-c||a.z>Math.max(t.z,e.z)+c)&&rn(a,t,e)<c)return!1}for(const a of i.rivers||[]){if(s&&a.bridges.some(l=>_u(l,t,e,n)))return!1;if(!Qd(a,t,e,n))continue;const c=Math.max(1,Math.ceil(ve(t,e)/.45));for(let l=0;l<=c;l++){const h={x:t.x+(e.x-t.x)*l/c,z:t.z+(e.z-t.z)*l/c};if(Gc(a,h,n)&&!a.bridges.some(u=>kc(u,h,n)))return!1}}return!0}function Re(i,t,e,n=.55){return wu(i,t,e,n,!0)}function tf(i,t,e){return wu(i,t,e,.15,!1,!0)}function Xn(i,t,e){for(const n of i?.rivers||[])for(const s of n.bridges)if(kc(s,{x:t,z:e},0)){const r=fn(s.heading),o=(t-s.x)*r.x+(e-s.z)*r.z;return .18+.12*Math.sin(Math.PI*(o/s.length+.5))}return 0}function ef(i){const t={x:i.minX,z:i.minZ},e={x:i.maxX,z:i.minZ},n={x:i.maxX,z:i.maxZ},s={x:i.minX,z:i.maxZ};return[[t,e],[e,n],[n,s],[s,t]].map(([r,o])=>({a:r,b:o,kind:"boundary"}))}function nf(i,t,e){const n=[i[0]];for(let s=1;s<i.length;s++){const r=i[s-1],o=i[s],a=ve(r,o),c=Math.max(1,Math.ceil(a/1.2)),l=Fc(o.x-r.x,o.z-r.z),h=t()*Math.PI*2,u=r.kind==="bridge"||o.kind==="bridge"||r.kind==="gate"||o.kind==="gate"||o.kind==="target"?0:Math.min(1.8,a*.045),p=[];for(let g=1;g<=c;g++){const x=g/c,m=Math.sin(Math.PI*x)*Math.sin(Math.PI*2*x+h)*u;p.push({x:r.x+(o.x-r.x)*x-l.z*m,z:r.z+(o.z-r.z)*x+l.x*m,...g===c&&o.kind?{kind:o.kind}:{}})}const d=!e||p.every((g,x)=>Re(e,x?p[x-1]:r,g,.85));for(let g=1;g<=c;g++){const x=g/c;n.push(d?p[g-1]:{x:r.x+(o.x-r.x)*x,z:r.z+(o.z-r.z)*x,...g===c&&o.kind?{kind:o.kind}:{}})}}return n}function bu(i=0,t=i*7919+42){i=Zs(Math.floor(Number(i)||0),0,99),t=Number(t)>>>0;const e=Il(t^1129273171),n=Il(t),s=i<5,r=Math.min(5+i*3,65),o=i===1?9.4:s?4.1:4.8,a=s?0:Zs((r-30)*.4,0,14),c=s?15+i*3:48+i*3+a,l=s?-32:-40,h=c+15,u=s?24:84+Math.floor(i/15)*14,d=(s?i===0?0:t%2*2:t%4)*Math.PI/2,g=F=>({x:Number((F.x*Math.cos(d)-F.z*Math.sin(d)).toFixed(6)),z:Number((F.x*Math.sin(d)+F.z*Math.cos(d)).toFixed(6)),...F.kind?{kind:F.kind}:{}}),x=Math.PI/2-d,m=[{x:l,z:-u},{x:h,z:u},{x:l,z:u},{x:h,z:-u}].map(g),f={minX:Math.min(...m.map(F=>F.x)),maxX:Math.max(...m.map(F=>F.x)),minZ:Math.min(...m.map(F=>F.z)),maxZ:Math.max(...m.map(F=>F.z))};s||(f.minZ=Math.min(f.minZ,-u),f.maxZ=Math.max(f.maxZ,u));const M={...g({x:c,z:0}),radius:4.7+Math.sqrt(r)*.2,type:i%3===2?"barn":i%3===1?"field":"pen",heading:x},_=g({x:s?-20:-26,z:0}),v=g({x:s?-26:-33,z:0}),b=s?1:i<15?i%2===1?2:1:i%3===0?3:2,w=s?c-21:c-32,P=i===0?[]:s?[i===1?-10:-12]:i>=15?[w-a-48,w-a-23]:[w-a-23],N=P.map(F=>{const q=n()*Math.PI*2;return{width:s?3.1:3.7+Math.min(i*.025,1.8),at:Q=>F+Math.sin(Q/21+q)*2.4+Math.sin(Q/8+q)*.65}}),E=N.map(F=>({width:F.width,points:Array.from({length:Math.ceil((u*2+64)/2)+1},(q,Q)=>{const it=-u-32+Q*2;return{x:F.at(it),z:it}}),bridges:[]})),T=[],z=[],k=n()>.5?1:-1;for(let F=0;F<b;F++){const q=b===1?0:(F-(b-1)/2)*(s?12:32),Q=[{x:_.x*Math.cos(d)+_.z*Math.sin(d),z:0}];if(i===0)Q.push({x:-8,z:2.8},{x:2,z:-2.2},{x:c-M.radius-3,z:0},{x:c,z:0,kind:"target"});else{if(N.forEach((nt,ft)=>{const Et=s?i===1?0:k*5:q+k*(ft%2?-1:1)*(14+n()*5),I=E[ft].points,jt=Zs(Math.floor((Et-I[0].z)/2),0,I.length-2),Dt=I[jt],Lt=I[jt+1],wt=(Et-Dt.z)/(Lt.z-Dt.z),Yt=Dt.x+(Lt.x-Dt.x)*wt,_t=Fc(Lt.z-Dt.z,Dt.x-Lt.x),Ht={x:Yt,z:Et,width:o*1.25,length:nt.width+1.5,heading:Math.atan2(_t.x,_t.z)-d};E[ft].bridges.push(Ht);const de=nt.width/2+2.5+(s?3:6),ae=s?de:(Yt-P[ft]+de)/_t.x,D=s?de:(P[ft]+de-Yt)/_t.x,y={x:Yt-_t.x*ae,z:Et-_t.z*ae},W={x:Yt+_t.x*D,z:Et+_t.z*D};Q.push({x:y.x-4,z:y.z-k*(s?3:8)},y,{x:Yt,z:Et,kind:"bridge"},W)}),i>=2){const nt=s?k*-4:q-k*(13+n()*4),ft={x:w,z:nt,width:s?8:10,heading:x};T.push(ft),Q.push({x:w-5,z:nt},{x:w,z:nt,kind:"gate"},{x:w+5,z:nt})}const it=c-M.radius-4;Q.push({x:it-7,z:s?k*3:q*.3},{x:it,z:0},{x:c,z:0,kind:"target"})}z.push(Q)}const G=E.map(F=>({width:F.width,points:F.points.map(g),bridges:F.bridges.map(q=>({...q,...g(q)}))})),Y=i>=7&&i%4===3,C=T.map((F,q)=>({...F,...g(F),id:`gate-${q}`,operable:i>=19,open:i<19,material:Y?"stone":"wood"})),S=ef(f);if(C.length){const F=[...T].sort((Q,it)=>Q.z-it.z);let q=-u;for(const Q of F)S.push({a:g({x:w,z:q}),b:g({x:w,z:Q.z-Q.width/2}),kind:"interior"}),q=Q.z+Q.width/2;S.push({a:g({x:w,z:q}),b:g({x:w,z:u}),kind:"interior"})}const U=an(M),A=U.halfLength,O=U.halfWidth,Z=U.openingWidth/2,$=[[[-A,-O],[A,-O]],[[A,-O],[A,O]],[[A,O],[-A,O]],[[-A,O],[-A,Z]],[[-A,-Z],[-A,-O]]];for(const[F,q]of $)S.push({a:Pi(M,...F),b:Pi(M,...q),kind:"target"});for(const F of S)F.material=Y&&F.kind!=="target"?"stone":"wood";const ot={bounds:f,rivers:G,fenceSegments:S,obstacles:[]},Rt=z.map((F,q)=>{const Q=nf(F.map(g),n,ot);return{id:`route-${q}`,points:Q,length:Q.slice(1).reduce((it,nt,ft)=>it+ve(nt,Q[ft]),0)}}),It=Rt.map(F=>({routeId:F.id,points:F.points,width:o})),gt={index:i,seed:t,title:["First day on the farm","Over the babbling brook","Through the garden gate","A mixed-up meadow","The long way home"][i]||`Pasture patrol ${i+1}`,description:i===0?"Move behind the sheep and gently guide all five into the sunny pen.":`Bring ${r} robots to the ${M.type}. ${b>1?"Choose a crossing and lead your flock through the meadow.":"Follow the winding trail and use the crossings."}`,bounds:f,spawn:_,dog:v,target:M,animals:[],rivers:G,gates:C,fences:[],fenceSegments:S,obstacles:[],routes:Rt,roads:It,reward:80+i*25,sceneryHills:[]};for(let F=0;F<r;F++){const q=g({x:(s?-20:-26)+Math.floor(F/7)*1.65+(n()-.5)*.2,z:(F%7-3)*1.65+(n()-.5)*.2}),Q=i>=3&&F%4===0?"cow":"sheep";gt.animals.push({id:F,type:Q,...Q==="cow"?{scale:Oa[Math.floor(e()*Oa.length)]}:{},...q,vx:0,vz:0,saved:!1})}if(gt.animals.some(F=>!me(gt,F.x,F.z,Oe(F)))){const F=fn(x),q=gt.animals.map(Q=>({x:Q.x,z:Q.z}));for(let Q=1;Q<=7;Q++){const it=Q*.5,nt=q.map(ft=>({x:ft.x-F.x*it,z:ft.z-F.z*it}));if(nt.every((ft,Et)=>me(gt,ft.x,ft.z,Oe(gt.animals[Et])))){nt.forEach((ft,Et)=>Object.assign(gt.animals[Et],ft));break}}}for(const F of gt.animals){if(F.type!=="cow")continue;const q=Oe(F),Q={x:F.x,z:F.z},it=ft=>me(gt,ft.x,ft.z,q)&&gt.animals.every(Et=>Et===F||ve(ft,Et)>=q+Oe(Et)+.01);if(it(Q))continue;let nt=!1;for(let ft=1;ft<=40&&!nt;ft++)for(let Et=0;Et<24;Et++){const I=Et*Math.PI/12,jt={x:Q.x+Math.cos(I)*ft*.1,z:Q.z+Math.sin(I)*ft*.1};if(it(jt)){Object.assign(F,jt),nt=!0;break}}}for(let F=0;F<Math.min(10+i*2,130);F++){const q=g({x:l+5+n()*(h-l-10),z:-u+5+n()*(u*2-10)}),Q=.7+n()*.7;ve(q,_)<14||ve(q,M)<M.radius+10||!me(gt,q.x,q.z,Q+1)||Rt.some(it=>it.points.slice(1).some((nt,ft)=>rn(q,it.points[ft],nt)<7+Q))||gt.obstacles.push({...q,radius:Q})}for(let F=0;F<14;F++){const q=7+n()*8,Q=3+n()*5,it=F%4,nt=it===0?{x:f.minX-q-3,z:f.minZ+n()*(f.maxZ-f.minZ)}:it===1?{x:f.maxX+q+3,z:f.minZ+n()*(f.maxZ-f.minZ)}:it===2?{x:f.minX+n()*(f.maxX-f.minX),z:f.minZ-q-3}:{x:f.minX+n()*(f.maxX-f.minX),z:f.maxZ+q+3};gt.sceneryHills.push({...nt,radius:q,height:Q})}return gt}function Ul(i,t,e){let n=null;for(const s of i.routes||[]){if(e&&s.id!==e)continue;let r=0;for(let o=1;o<s.points.length;o++){const a=s.points[o-1],c=s.points[o],l=Oc(t,a,c),h=ve(t,l),u=ve(a,c);(!n||h<n.distance)&&(n={route:s,routeId:s.id,index:o-1,point:l,distance:h,progress:r+u*l.t,length:s.length}),r+=u}}return n}function sf(i,t){const e=i.target,n=an(e).halfLength,{forward:s,lateral:r}=Bc(e,t),o=(a,c)=>Pi(e,a,c);return s>n+.4?o(n+2,Math.sign(r||1)*(n+2)):Math.abs(r)>n-.4&&s>-n-.8?o(-n-2,Math.sign(r||1)*(n+2)):s<-n+.7?o(-n+2,0):e}function rf(i,t,e,n){if(Re(i,t,e,n))return e;const s=Ul(i,t),r=Ul(i,e,s?.routeId);if(!s||!r)return e;const o=r.progress>=s.progress,a=s.route.points;if(s.distance>3&&Re(i,t,s.point,n))return s.point;const c=o?Math.min(a.length-1,s.index+5):Math.max(0,s.index-4);for(let l=c;o?l>s.index:l<=s.index;l+=o?-1:1)if(Re(i,t,a[l],n))return a[l];return s.point}function Hc(i,t,e,n=.62){if(Re(i,t,e,n))return e;const s=rf(i,t,e,n),r=(i.rivers||[]).flatMap(g=>g.bridges).filter(g=>ve(t,g)<g.length+g.width+8||_u(g,t,e,n)).sort((g,x)=>Math.min(ve(t,g),ve(e,g))-Math.min(ve(t,x),ve(e,x))).slice(0,2),o=i.target,a=o&&an(o),c=a&&(ve(t,o)<a.halfLength*2+6||ve(e,o)<a.halfLength*2+6);if(!r.length&&!c)return s;const l=[t,e,s];for(const g of r){const x=fn(g.heading),m=g.length/2+n+.4,f=g.width/2+n+.4;for(const[M,_]of[[-m,-f],[-m,f],[m,-f],[m,f],[-m,0],[m,0],[0,0]])l.push({x:g.x+x.x*M+x.z*_,z:g.z+x.z*M-x.x*_})}if(c){const g=a.halfLength+n+.5;for(const[x,m]of[[-g,-g],[-g,g],[g,-g],[g,g],[-g,0],[-a.halfLength+n+.5,0]])l.push(Pi(o,x,m))}const h=l.map(()=>1/0),u=[],p=new Set;h[0]=0;for(let g=0;g<l.length;g++){let x=-1;for(let m=0;m<l.length;m++)!p.has(m)&&(x<0||h[m]<h[x])&&(x=m);if(x<0||!Number.isFinite(h[x]))break;p.add(x);for(let m=1;m<l.length;m++){if(p.has(m)||!Re(i,l[x],l[m],n))continue;const f=h[x]+ve(l[x],l[m]);f<h[m]&&(h[m]=f,u[m]=x)}}let d=Number.isFinite(h[1])?1:Number.isFinite(h[2])?2:-1;if(d<0)return s;for(;u[d]!==0&&u[d]!==void 0;)d=u[d];return l[d]}function of(i,t,e,n,s=.78){const r=Math.hypot(e,n);if(r<.01)return{x:0,z:0};const o={x:t.x+e/r*2,z:t.z+n/r*2};if(Re(i,t,o,s))return{x:0,z:0};let a=null,c=1/0;for(const g of i.rivers||[])if(Gc(g,t,3))for(const x of g.bridges){const m=ve(t,x);m<c&&(c=m,a=x)}const l=i.target,h=an(l),u={...h.entrance,width:h.openingWidth,heading:l.heading,enclosure:!0};for(const g of[...(i.gates||[]).filter(x=>!x.operable||x.open),u]){const x=fn(g.heading),m=t.x-g.x,f=t.z-g.z;Math.abs(m*x.x+f*x.z)<3&&ve(t,g)<c&&(c=ve(t,g),a=g)}if((i.fenceSegments||[]).some(g=>g.kind==="target"&&rn(t,g.a,g.b)<s+2)&&(a=u),!a)return{x:0,z:0};if(a.length||a.enclosure){let g=a;if(a.length){const f=fn(a.heading),M=(t.x-a.x)*f.x+(t.z-a.z)*f.z,_=(t.x-a.x)*f.z-(t.z-a.z)*f.x,v=Math.max(0,a.width/2-s-.35),b=Zs(_,-v,v),w=(Math.sign(M)||1)*a.length/2;g={x:a.x+f.x*w+f.z*b,z:a.z+f.z*w-f.x*b}}const x=Hc(i,t,g,s),m=Fc(x.x-t.x,x.z-t.z);return{x:m.x*Math.min(2.4,r*.8+.5),z:m.z*Math.min(2.4,r*.8+.5)}}const p=fn(a.heading),d=(a.x-t.x)*p.z-(a.z-t.z)*p.x;return Math.abs(d)<a.width/2-1?{x:0,z:0}:{x:p.z*Math.sign(d)*Math.min(2.4,r*.8+.5),z:-p.x*Math.sign(d)*Math.min(2.4,r*.8+.5)}}const af=3.2;function Eu(i,t){return!i||!t?null:(i.gates||[]).filter(e=>e.operable&&!e.open).map(e=>{const n=Vc(e),s=Oc(t,n.a,n.b),r=ve(t,s);if(r>af||r<.001||!me(i,t.x,t.z,.62))return null;const o=.62+(e.material==="stone"?.3:.18)+.08,a={x:s.x+(t.x-s.x)/r*o,z:s.z+(t.z-s.z)/r*o};return Re(i,t,a,.62)?{gate:e,d:r}:null}).filter(Boolean).sort((e,n)=>e.d-n.d||e.gate.id.localeCompare(n.gate.id))[0]?.gate||null}function cf(i,t,e){const n=Eu(i,t);return!n||n.id!==e?!1:(n.open=!0,i.geometryRevision=(i.geometryRevision||0)+1,i.flockVisibility?.clear(),!0)}function lf({document:i,getState:t,onOpen:e=()=>{}}){const n=i.createElement("button");n.id="open-gate",n.type="button",n.className="gate-action hidden",n.textContent="Open gate",n.setAttribute("aria-label","Open nearby gate"),i.getElementById("controls").appendChild(n);let s=null;const r=()=>{const{level:a,dog:c,playing:l}=t();return s=l?Eu(a,c):null,n.classList.toggle("hidden",!s),n.disabled=!s,s},o=()=>{const{level:a,dog:c,playing:l}=t();return!l||!s||!cf(a,c,s.id)?!1:(e(s),r(),!0)};return n.onclick=o,n.addEventListener("touchend",a=>{a.preventDefault(),a.stopPropagation(),o()},{passive:!1}),{button:n,update:r,activate:o}}function hf(i,t,e){if(!(e>0)||!Number.isFinite(e))return;const n=t.heading??Math.PI/2,s=Math.atan2(Math.sin(n-i.rotation.y),Math.cos(n-i.rotation.y)),r=t.type==="cow"?Math.PI/1.5:Math.PI,o=Math.max(-r*e,Math.min(r*e,s));i.rotation.y+=o,i.userData.turnSpeed=Math.abs(o)/e}function uf(i,t=0){return Math.max(Math.hypot(i.vx,i.vz),Math.min(2,t))}const Nl=new WeakMap,Vi=8;function df(i,t){const e=i.roads||[];let n=Nl.get(i);if(!n||n.roads!==e){const s=new Map;for(const r of e)for(let o=1;o<r.points.length;o++){const a=r.points[o-1],c=r.points[o],l=r.width/2+.5;for(let h=Math.floor((Math.min(a.x,c.x)-l)/Vi);h<=Math.floor((Math.max(a.x,c.x)+l)/Vi);h++)for(let u=Math.floor((Math.min(a.z,c.z)-l)/Vi);u<=Math.floor((Math.max(a.z,c.z)+l)/Vi);u++){const p=`${h},${u}`,d=s.get(p)||[];d.push({a,b:c,radius:l}),s.set(p,d)}}n={roads:e,cells:s},Nl.set(i,n)}return n.cells.get(`${Math.floor(t.x/Vi)},${Math.floor(t.z/Vi)}`)||[]}function ff(i,t){if(i.target?.type==="barn"&&gr(i.target,t))return!1;for(const e of i.rivers||[])for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,o=Math.sin(n.heading),a=Math.cos(n.heading);if(Math.abs(s*o+r*a)<=n.length/2+.2&&Math.abs(s*a-r*o)<=n.width/2+.2)return!1}for(const{a:e,b:n,radius:s}of df(i,t))if(rn(t,e,n)<=s)return!1;return me(i,t.x,t.z,0)}function pf(i,t,e,n){if(!(n>0)||!Number.isFinite(n))return;const s=i.userData,r=Math.hypot(t.vx,t.vz)<.45&&(t.alert||0)<.03&&(s.turnSpeed||0)<.05&&!t.wander&&!t.bridgeCrossing;if(!r&&!(s.graze>0)){s.grazeWait=0,s.graze=0,s.grazeTime=(s.grazeTime||0)+n;return}const o=(t.type==="cow"?1.05:.65)*_s(t),a={x:t.x+Math.sin(i.rotation.y)*o,z:t.z+Math.cos(i.rotation.y)*o},c=Math.sin(i.rotation.y),l=Math.cos(i.rotation.y),h=_s(t),u=t.type==="cow",p=(u?.45:.3)*h,d=(u?.56:.36)*h,g=(u?-.59:-.36)*h,x=[-p,p].flatMap(M=>[g,d].map(_=>({x:t.x+l*M+c*_,z:t.z-c*M+l*_}))),m=[t,a,...x].every(M=>ff(e,M));s.grazeWait=m&&r?(s.grazeWait||0)+n:0;const f=s.grazeWait>=1.25?1:0;s.graze=m?(s.graze||0)+Math.max(-n*4,Math.min(n*2,f-(s.graze||0))):0,s.grazeTime=(s.grazeTime||0)+n}function mf(i,t){return(i.graze||0)*(1.05+Math.sin((i.grazeTime||0)*3+t*1.7)*.02)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wc="180",gf=0,Fl=1,xf=2,Tu=1,Au=2,Hn=3,ui=0,Ze=1,Ae=2,ci=0,ms=1,Ol=2,Bl=3,kl=4,_f=5,bi=100,vf=101,Mf=102,yf=103,Sf=104,wf=200,bf=201,Ef=202,Tf=203,Ba=204,ka=205,Af=206,Rf=207,Cf=208,Pf=209,Df=210,If=211,Lf=212,zf=213,Uf=214,Ga=0,Va=1,Ha=2,vs=3,Wa=4,Xa=5,qa=6,Ya=7,Ru=0,Nf=1,Ff=2,li=0,Of=1,Bf=2,kf=3,Cu=4,Gf=5,Vf=6,Hf=7,Pu=300,Ms=301,ys=302,Za=303,$a=304,Eo=306,Zn=1e3,Ti=1001,Ka=1002,on=1003,Wf=1004,Sr=1005,Mn=1006,ko=1007,Ai=1008,Ln=1009,Du=1010,Iu=1011,ir=1012,Xc=1013,Di=1014,Cn=1015,xr=1016,qc=1017,Yc=1018,sr=1020,Lu=35902,zu=35899,Uu=1021,Nu=1022,yn=1023,rr=1026,or=1027,Zc=1028,$c=1029,Fu=1030,Kc=1031,Jc=1033,ro=33776,oo=33777,ao=33778,co=33779,Ja=35840,ja=35841,Qa=35842,tc=35843,ec=36196,nc=37492,ic=37496,sc=37808,rc=37809,oc=37810,ac=37811,cc=37812,lc=37813,hc=37814,uc=37815,dc=37816,fc=37817,pc=37818,mc=37819,gc=37820,xc=37821,_c=36492,vc=36494,Mc=36495,yc=36283,Sc=36284,wc=36285,bc=36286,Xf=3200,qf=3201,Ou=0,Yf=1,ri="",Pe="srgb",Ss="srgb-linear",fo="linear",le="srgb",Hi=7680,Gl=519,Zf=512,$f=513,Kf=514,Bu=515,Jf=516,jf=517,Qf=518,tp=519,Ec=35044,ds=35048,Vl="300 es",Pn=2e3,po=2001;class As{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Go=Math.PI/180,Tc=180/Math.PI;function qn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Xt(i,t,e){return Math.max(t,Math.min(e,i))}function ep(i,t){return(i%t+t)%t}function Vo(i,t,e){return(1-e)*i+e*t}function Rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function he(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $n{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const p=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=p,t[e+1]=d,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==p||l!==d||h!==g){let m=1-a;const f=c*p+l*d+h*g+u*x,M=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){const b=Math.sqrt(_),w=Math.atan2(b,f*M);m=Math.sin(m*w)/b,a=Math.sin(a*w)/b}const v=a*M;if(c=c*m+p*v,l=l*m+d*v,h=h*m+g*v,u=u*m+x*v,m===1-a){const b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],p=r[o+1],d=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*d-l*p,t[e+1]=c*g+h*p+l*u-a*d,t[e+2]=l*g+h*d+a*p-c*u,t[e+3]=h*g-a*u-c*p-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),p=c(n/2),d=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=p*h*u+l*d*g,this._y=l*d*u-p*h*g,this._z=l*h*g+p*d*u,this._w=l*h*u-p*d*g;break;case"YXZ":this._x=p*h*u+l*d*g,this._y=l*d*u-p*h*g,this._z=l*h*g-p*d*u,this._w=l*h*u+p*d*g;break;case"ZXY":this._x=p*h*u-l*d*g,this._y=l*d*u+p*h*g,this._z=l*h*g+p*d*u,this._w=l*h*u-p*d*g;break;case"ZYX":this._x=p*h*u-l*d*g,this._y=l*d*u+p*h*g,this._z=l*h*g-p*d*u,this._w=l*h*u+p*d*g;break;case"YZX":this._x=p*h*u+l*d*g,this._y=l*d*u+p*h*g,this._z=l*h*g-p*d*u,this._w=l*h*u-p*d*g;break;case"XZY":this._x=p*h*u-l*d*g,this._y=l*d*u-p*h*g,this._z=l*h*g+p*d*u,this._w=l*h*u+p*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],p=n+a+u;if(p>0){const d=.5/Math.sqrt(p+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,p=Math.sin(e*h)/l;return this._w=o*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Hl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Hl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ho.copy(this).projectOnVector(t),this.sub(Ho)}reflect(t){return this.sub(Ho.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ho=new L,Hl=new $n;class qt{constructor(t,e,n,s,r,o,a,c,l){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],p=n[2],d=n[5],g=n[8],x=s[0],m=s[3],f=s[6],M=s[1],_=s[4],v=s[7],b=s[2],w=s[5],P=s[8];return r[0]=o*x+a*M+c*b,r[3]=o*m+a*_+c*w,r[6]=o*f+a*v+c*P,r[1]=l*x+h*M+u*b,r[4]=l*m+h*_+u*w,r[7]=l*f+h*v+u*P,r[2]=p*x+d*M+g*b,r[5]=p*m+d*_+g*w,r[8]=p*f+d*v+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,p=a*c-h*r,d=l*r-o*c,g=e*u+n*p+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=p*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Wo.makeScale(t,e)),this}rotate(t){return this.premultiply(Wo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Wo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Wo=new qt;function ku(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function mo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function np(){const i=mo("canvas");return i.style.display="block",i}const Wl={};function ar(i){i in Wl||(Wl[i]=!0,console.warn(i))}function ip(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Xl=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ql=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sp(){const i={enabled:!0,workingColorSpace:Ss,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===le&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===le&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?fo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ar("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ar("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ss]:{primaries:t,whitePoint:n,transfer:fo,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Pe},outputColorSpaceConfig:{drawingBufferColorSpace:Pe}},[Pe]:{primaries:t,whitePoint:n,transfer:le,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Pe}}}),i}const se=sp();function Yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Wi;class rp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Wi===void 0&&(Wi=mo("canvas")),Wi.width=t.width,Wi.height=t.height;const s=Wi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Wi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=mo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Yn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yn(e[n]/255)*255):e[n]=Yn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let op=0;class jc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=qn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Xo(s[o].image)):r.push(Xo(s[o]))}else r=Xo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Xo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?rp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ap=0;const qo=new L;class Be extends As{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=Ti,s=Ti,r=Mn,o=Ai,a=yn,c=Ln,l=Be.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=qn(),this.name="",this.source=new jc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qo).x}get height(){return this.source.getSize(qo).y}get depth(){return this.source.getSize(qo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zn:t.x=t.x-Math.floor(t.x);break;case Ti:t.x=t.x<0?0:1;break;case Ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zn:t.y=t.y-Math.floor(t.y);break;case Ti:t.y=t.y<0?0:1;break;case Ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Pu;Be.DEFAULT_ANISOTROPY=1;class be{constructor(t=0,e=0,n=0,s=1){be.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],p=c[1],d=c[5],g=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(h-p)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(l+1)/2,v=(d+1)/2,b=(f+1)/2,w=(h+p)/4,P=(u+x)/4,N=(g+m)/4;return _>v&&_>b?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=w/n,r=P/n):v>b?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=N/s):b<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(b),n=P/r,s=N/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(p-h)*(p-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(p-h)/M,this.w=Math.acos((l+d+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Xt(this.x,t.x,e.x),this.y=Xt(this.y,t.y,e.y),this.z=Xt(this.z,t.z,e.z),this.w=Xt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Xt(this.x,t,e),this.y=Xt(this.y,t,e),this.z=Xt(this.z,t,e),this.w=Xt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Xt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cp extends As{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new be(0,0,t,e),this.scissorTest=!1,this.viewport=new be(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Be(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new jc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ii extends cp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Gu extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class lp extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fi{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,pn):pn.fromBufferAttribute(r,o),pn.applyMatrix4(t.matrixWorld),this.expandByPoint(pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),wr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox)),wr.applyMatrix4(t.matrixWorld),this.union(wr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Is),br.subVectors(this.max,Is),Xi.subVectors(t.a,Is),qi.subVectors(t.b,Is),Yi.subVectors(t.c,Is),Jn.subVectors(qi,Xi),jn.subVectors(Yi,qi),gi.subVectors(Xi,Yi);let e=[0,-Jn.z,Jn.y,0,-jn.z,jn.y,0,-gi.z,gi.y,Jn.z,0,-Jn.x,jn.z,0,-jn.x,gi.z,0,-gi.x,-Jn.y,Jn.x,0,-jn.y,jn.x,0,-gi.y,gi.x,0];return!Yo(e,Xi,qi,Yi,br)||(e=[1,0,0,0,1,0,0,0,1],!Yo(e,Xi,qi,Yi,br))?!1:(Er.crossVectors(Jn,jn),e=[Er.x,Er.y,Er.z],Yo(e,Xi,qi,Yi,br))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Fn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Fn=[new L,new L,new L,new L,new L,new L,new L,new L],pn=new L,wr=new Fi,Xi=new L,qi=new L,Yi=new L,Jn=new L,jn=new L,gi=new L,Is=new L,br=new L,Er=new L,xi=new L;function Yo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){xi.fromArray(i,r);const a=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),c=t.dot(xi),l=e.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const hp=new Fi,Ls=new L,Zo=new L;class fi{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):hp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ls.subVectors(t,this.center);const e=Ls.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ls,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ls.copy(t.center).add(Zo)),this.expandByPoint(Ls.copy(t.center).sub(Zo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const On=new L,$o=new L,Tr=new L,Qn=new L,Ko=new L,Ar=new L,Jo=new L;class Vu{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,On)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=On.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(On.copy(this.origin).addScaledVector(this.direction,e),On.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){$o.copy(t).add(e).multiplyScalar(.5),Tr.copy(e).sub(t).normalize(),Qn.copy(this.origin).sub($o);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Tr),a=Qn.dot(this.direction),c=-Qn.dot(Tr),l=Qn.lengthSq(),h=Math.abs(1-o*o);let u,p,d,g;if(h>0)if(u=o*c-a,p=o*a-c,g=r*h,u>=0)if(p>=-g)if(p<=g){const x=1/h;u*=x,p*=x,d=u*(u+o*p+2*a)+p*(o*u+p+2*c)+l}else p=r,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*c)+l;else p=-r,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*c)+l;else p<=-g?(u=Math.max(0,-(-o*r+a)),p=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+p*(p+2*c)+l):p<=g?(u=0,p=Math.min(Math.max(-r,-c),r),d=p*(p+2*c)+l):(u=Math.max(0,-(o*r+a)),p=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+p*(p+2*c)+l);else p=o>0?-r:r,u=Math.max(0,-(o*p+a)),d=-u*u+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy($o).addScaledVector(Tr,p),d}intersectSphere(t,e){On.subVectors(t.center,this.origin);const n=On.dot(this.direction),s=On.dot(On)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),h>=0?(r=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-p.z)*u,c=(t.max.z-p.z)*u):(a=(t.max.z-p.z)*u,c=(t.min.z-p.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,On)!==null}intersectTriangle(t,e,n,s,r){Ko.subVectors(e,t),Ar.subVectors(n,t),Jo.crossVectors(Ko,Ar);let o=this.direction.dot(Jo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Qn.subVectors(this.origin,t);const c=a*this.direction.dot(Ar.crossVectors(Qn,Ar));if(c<0)return null;const l=a*this.direction.dot(Ko.cross(Qn));if(l<0||c+l>o)return null;const h=-a*Qn.dot(Jo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class te{constructor(t,e,n,s,r,o,a,c,l,h,u,p,d,g,x,m){te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,p,d,g,x,m)}set(t,e,n,s,r,o,a,c,l,h,u,p,d,g,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=p,f[3]=d,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Zi.setFromMatrixColumn(t,0).length(),r=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const p=o*h,d=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+g*l,e[5]=p-x*l,e[9]=-a*c,e[2]=x-p*l,e[6]=g+d*l,e[10]=o*c}else if(t.order==="YXZ"){const p=c*h,d=c*u,g=l*h,x=l*u;e[0]=p+x*a,e[4]=g*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=x+p*a,e[10]=o*c}else if(t.order==="ZXY"){const p=c*h,d=c*u,g=l*h,x=l*u;e[0]=p-x*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=x-p*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const p=o*h,d=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=g*l-d,e[8]=p*l+x,e[1]=c*u,e[5]=x*l+p,e[9]=d*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const p=o*c,d=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-p*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+g,e[10]=p-x*u}else if(t.order==="XZY"){const p=o*c,d=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=p*u+x,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=x*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(up,t,dp)}lookAt(t,e,n){const s=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),ti.crossVectors(n,Je),ti.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),ti.crossVectors(n,Je)),ti.normalize(),Rr.crossVectors(Je,ti),s[0]=ti.x,s[4]=Rr.x,s[8]=Je.x,s[1]=ti.y,s[5]=Rr.y,s[9]=Je.y,s[2]=ti.z,s[6]=Rr.z,s[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],p=n[9],d=n[13],g=n[2],x=n[6],m=n[10],f=n[14],M=n[3],_=n[7],v=n[11],b=n[15],w=s[0],P=s[4],N=s[8],E=s[12],T=s[1],z=s[5],k=s[9],G=s[13],Y=s[2],C=s[6],S=s[10],U=s[14],A=s[3],O=s[7],Z=s[11],$=s[15];return r[0]=o*w+a*T+c*Y+l*A,r[4]=o*P+a*z+c*C+l*O,r[8]=o*N+a*k+c*S+l*Z,r[12]=o*E+a*G+c*U+l*$,r[1]=h*w+u*T+p*Y+d*A,r[5]=h*P+u*z+p*C+d*O,r[9]=h*N+u*k+p*S+d*Z,r[13]=h*E+u*G+p*U+d*$,r[2]=g*w+x*T+m*Y+f*A,r[6]=g*P+x*z+m*C+f*O,r[10]=g*N+x*k+m*S+f*Z,r[14]=g*E+x*G+m*U+f*$,r[3]=M*w+_*T+v*Y+b*A,r[7]=M*P+_*z+v*C+b*O,r[11]=M*N+_*k+v*S+b*Z,r[15]=M*E+_*G+v*U+b*$,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],p=t[10],d=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+r*c*u-s*l*u-r*a*p+n*l*p+s*a*d-n*c*d)+x*(+e*c*d-e*l*p+r*o*p-s*o*d+s*l*h-r*c*h)+m*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+f*(-s*a*h-e*c*u+e*a*p+s*o*u-n*o*p+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],p=t[10],d=t[11],g=t[12],x=t[13],m=t[14],f=t[15],M=u*m*l-x*p*l+x*c*d-a*m*d-u*c*f+a*p*f,_=g*p*l-h*m*l-g*c*d+o*m*d+h*c*f-o*p*f,v=h*x*l-g*u*l+g*a*d-o*x*d-h*a*f+o*u*f,b=g*u*c-h*x*c-g*a*p+o*x*p+h*a*m-o*u*m,w=e*M+n*_+s*v+r*b;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/w;return t[0]=M*P,t[1]=(x*p*r-u*m*r-x*s*d+n*m*d+u*s*f-n*p*f)*P,t[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*f+n*c*f)*P,t[3]=(u*c*r-a*p*r-u*s*l+n*p*l+a*s*d-n*c*d)*P,t[4]=_*P,t[5]=(h*m*r-g*p*r+g*s*d-e*m*d-h*s*f+e*p*f)*P,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*f-e*c*f)*P,t[7]=(o*p*r-h*c*r+h*s*l-e*p*l-o*s*d+e*c*d)*P,t[8]=v*P,t[9]=(g*u*r-h*x*r-g*n*d+e*x*d+h*n*f-e*u*f)*P,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*f+e*a*f)*P,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*P,t[12]=b*P,t[13]=(h*x*s-g*u*s+g*n*p-e*x*p-h*n*m+e*u*m)*P,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*m-e*a*m)*P,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*p+e*a*p)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,p=r*l,d=r*h,g=r*u,x=o*h,m=o*u,f=a*u,M=c*l,_=c*h,v=c*u,b=n.x,w=n.y,P=n.z;return s[0]=(1-(x+f))*b,s[1]=(d+v)*b,s[2]=(g-_)*b,s[3]=0,s[4]=(d-v)*w,s[5]=(1-(p+f))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+_)*P,s[9]=(m-M)*P,s[10]=(1-(p+x))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Zi.set(s[0],s[1],s[2]).length();const o=Zi.set(s[4],s[5],s[6]).length(),a=Zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],mn.copy(this);const l=1/r,h=1/o,u=1/a;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=u,mn.elements[9]*=u,mn.elements[10]*=u,e.setFromRotationMatrix(mn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Pn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),d=(n+s)/(n-s);let g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===Pn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===po)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Pn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),p=-(e+t)/(e-t),d=-(n+s)/(n-s);let g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===Pn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===po)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Zi=new L,mn=new te,up=new L(0,0,0),dp=new L(1,1,1),ti=new L,Rr=new L,Je=new L,Yl=new te,Zl=new $n;class bn{constructor(t=0,e=0,n=0,s=bn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],p=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Yl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Yl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Zl.setFromEuler(this),this.setFromQuaternion(Zl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bn.DEFAULT_ORDER="XYZ";class Hu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fp=0;const $l=new L,$i=new $n,Bn=new te,Cr=new L,zs=new L,pp=new L,mp=new $n,Kl=new L(1,0,0),Jl=new L(0,1,0),jl=new L(0,0,1),Ql={type:"added"},gp={type:"removed"},Ki={type:"childadded",child:null},jo={type:"childremoved",child:null};class ye extends As{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new L,e=new bn,n=new $n,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new qt}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(Kl,t)}rotateY(t){return this.rotateOnAxis(Jl,t)}rotateZ(t){return this.rotateOnAxis(jl,t)}translateOnAxis(t,e){return $l.copy(t).applyQuaternion(this.quaternion),this.position.add($l.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kl,t)}translateY(t){return this.translateOnAxis(Jl,t)}translateZ(t){return this.translateOnAxis(jl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Cr.copy(t):Cr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),zs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(zs,Cr,this.up):Bn.lookAt(Cr,zs,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Bn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ql),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(gp),jo.child=t,this.dispatchEvent(jo),jo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ql),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,t,pp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zs,mp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),p=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ye.DEFAULT_UP=new L(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new L,kn=new L,Qo=new L,Gn=new L,Ji=new L,ji=new L,th=new L,ta=new L,ea=new L,na=new L,ia=new be,sa=new be,ra=new be;class sn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),gn.subVectors(t,e),s.cross(gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){gn.subVectors(s,e),kn.subVectors(n,e),Qo.subVectors(t,e);const o=gn.dot(gn),a=gn.dot(kn),c=gn.dot(Qo),l=kn.dot(kn),h=kn.dot(Qo),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const p=1/u,d=(l*c-a*h)*p,g=(o*h-a*c)*p;return r.set(1-d-g,g,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Gn.x),c.addScaledVector(o,Gn.y),c.addScaledVector(a,Gn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return ia.setScalar(0),sa.setScalar(0),ra.setScalar(0),ia.fromBufferAttribute(t,e),sa.fromBufferAttribute(t,n),ra.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ia,r.x),o.addScaledVector(sa,r.y),o.addScaledVector(ra,r.z),o}static isFrontFacing(t,e,n,s){return gn.subVectors(n,e),kn.subVectors(t,e),gn.cross(kn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),gn.cross(kn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ji.subVectors(s,n),ji.subVectors(r,n),ta.subVectors(t,n);const c=Ji.dot(ta),l=ji.dot(ta);if(c<=0&&l<=0)return e.copy(n);ea.subVectors(t,s);const h=Ji.dot(ea),u=ji.dot(ea);if(h>=0&&u<=h)return e.copy(s);const p=c*u-h*l;if(p<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ji,o);na.subVectors(t,r);const d=Ji.dot(na),g=ji.dot(na);if(g>=0&&d<=g)return e.copy(r);const x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(ji,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return th.subVectors(r,s),a=(u-h)/(u-h+(d-g)),e.copy(s).addScaledVector(th,a);const f=1/(m+x+p);return o=x*f,a=p*f,e.copy(n).addScaledVector(Ji,o).addScaledVector(ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function oa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=se.workingColorSpace){if(t=ep(t,1),e=Xt(e,0,1),n=Xt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=oa(o,r,t+1/3),this.g=oa(o,r,t),this.b=oa(o,r,t-1/3)}return se.colorSpaceToWorking(this,s),this}setStyle(t,e=Pe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){const n=Wu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return se.workingToColorSpace(Ne.copy(this),t),Math.round(Xt(Ne.r*255,0,255))*65536+Math.round(Xt(Ne.g*255,0,255))*256+Math.round(Xt(Ne.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.workingToColorSpace(Ne.copy(this),e);const n=Ne.r,s=Ne.g,r=Ne.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.workingToColorSpace(Ne.copy(this),e),t.r=Ne.r,t.g=Ne.g,t.b=Ne.b,t}getStyle(t=Pe){se.workingToColorSpace(Ne.copy(this),t);const e=Ne.r,n=Ne.g,s=Ne.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(Pr);const n=Vo(ei.h,Pr.h,e),s=Vo(ei.s,Pr.s,e),r=Vo(ei.l,Pr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ne=new Gt;Gt.NAMES=Wu;let xp=0;class Oi extends As{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=qn(),this.name="",this.type="Material",this.blending=ms,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ba,this.blendDst=ka,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ba&&(n.blendSrc=this.blendSrc),this.blendDst!==ka&&(n.blendDst=this.blendDst),this.blendEquation!==bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class en extends Oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.combine=Ru,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new L,Dr=new yt;let _p=0;class ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:_p++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ec,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Dr.fromBufferAttribute(this,e),Dr.applyMatrix3(t),this.setXY(e,Dr.x,Dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Rn(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Rn(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Rn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Rn(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array),r=he(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ec&&(t.usage=this.usage),t}}class Xu extends ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class qu extends ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class $t extends ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let vp=0;const hn=new te,aa=new ye,Qi=new L,je=new Fi,Us=new Fi,Le=new L;class ge extends As{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ku(t)?qu:Xu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return aa.lookAt(t),aa.updateMatrix(),this.applyMatrix4(aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $t(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(je.min,Us.min),je.expandByPoint(Le),Le.addVectors(je.max,Us.max),je.expandByPoint(Le)):(je.expandByPoint(Us.min),je.expandByPoint(Us.max))}je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Le.fromBufferAttribute(a,l),c&&(Qi.fromBufferAttribute(t,l),Le.add(Qi)),s=Math.max(s,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ke(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let N=0;N<n.count;N++)a[N]=new L,c[N]=new L;const l=new L,h=new L,u=new L,p=new yt,d=new yt,g=new yt,x=new L,m=new L;function f(N,E,T){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,T),p.fromBufferAttribute(r,N),d.fromBufferAttribute(r,E),g.fromBufferAttribute(r,T),h.sub(l),u.sub(l),d.sub(p),g.sub(p);const z=1/(d.x*g.y-g.x*d.y);isFinite(z)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(z),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(z),a[N].add(x),a[E].add(x),a[T].add(x),c[N].add(m),c[E].add(m),c[T].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let N=0,E=M.length;N<E;++N){const T=M[N],z=T.start,k=T.count;for(let G=z,Y=z+k;G<Y;G+=3)f(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const _=new L,v=new L,b=new L,w=new L;function P(N){b.fromBufferAttribute(s,N),w.copy(b);const E=a[N];_.copy(E),_.sub(b.multiplyScalar(b.dot(E))).normalize(),v.crossVectors(w,E);const z=v.dot(c[N])<0?-1:1;o.setXYZW(N,_.x,_.y,_.z,z)}for(let N=0,E=M.length;N<E;++N){const T=M[N],z=T.start,k=T.count;for(let G=z,Y=z+k;G<Y;G+=3)P(t.getX(G+0)),P(t.getX(G+1)),P(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,d=n.count;p<d;p++)n.setXYZ(p,0,0,0);const s=new L,r=new L,o=new L,a=new L,c=new L,l=new L,h=new L,u=new L;if(t)for(let p=0,d=t.count;p<d;p+=3){const g=t.getX(p+0),x=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let p=0,d=e.count;p<d;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,p=new l.constructor(c.length*h);let d=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*h;for(let f=0;f<h;f++)p[g++]=l[d++]}return new ke(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ge,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const p=l[h],d=t(p,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,p=l.length;u<p;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let p=0,d=u.length;p<d;p++)h.push(u[p].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eh=new te,_i=new Vu,Ir=new fi,nh=new L,Lr=new L,zr=new L,Ur=new L,ca=new L,Nr=new L,ih=new L,Fr=new L;class ee extends ye{constructor(t=new ge,e=new en){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Nr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(ca.fromBufferAttribute(u,t),o?Nr.addScaledVector(ca,h):Nr.addScaledVector(ca.sub(e),h))}e.add(Nr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(Ir.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Ir,nh)===null||_i.origin.distanceToSquared(nh)>(t.far-t.near)**2))&&(eh.copy(r).invert(),_i.copy(t.ray).applyMatrix4(eh),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){const m=p[g],f=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,b=_;v<b;v+=3){const w=a.getX(v),P=a.getX(v+1),N=a.getX(v+2);s=Or(this,f,t,n,l,h,u,w,P,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let m=g,f=x;m<f;m+=3){const M=a.getX(m),_=a.getX(m+1),v=a.getX(m+2);s=Or(this,o,t,n,l,h,u,M,_,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){const m=p[g],f=o[m.materialIndex],M=Math.max(m.start,d.start),_=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,b=_;v<b;v+=3){const w=v,P=v+1,N=v+2;s=Or(this,f,t,n,l,h,u,w,P,N),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let m=g,f=x;m<f;m+=3){const M=m,_=m+1,v=m+2;s=Or(this,o,t,n,l,h,u,M,_,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Mp(i,t,e,n,s,r,o,a){let c;if(t.side===Ze?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===ui,a),c===null)return null;Fr.copy(a),Fr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Fr);return l<e.near||l>e.far?null:{distance:l,point:Fr.clone(),object:i}}function Or(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Lr),i.getVertexPosition(c,zr),i.getVertexPosition(l,Ur);const h=Mp(i,t,e,n,Lr,zr,Ur,ih);if(h){const u=new L;sn.getBarycoord(ih,Lr,zr,Ur,u),s&&(h.uv=sn.getInterpolatedAttribute(s,a,c,l,u,new yt)),r&&(h.uv1=sn.getInterpolatedAttribute(r,a,c,l,u,new yt)),o&&(h.normal=sn.getInterpolatedAttribute(o,a,c,l,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new L,materialIndex:0};sn.getNormal(Lr,zr,Ur,p.normal),h.face=p,h.barycoord=u}return h}class Sn extends ge{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let p=0,d=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(u,2));function g(x,m,f,M,_,v,b,w,P,N,E){const T=v/P,z=b/N,k=v/2,G=b/2,Y=w/2,C=P+1,S=N+1;let U=0,A=0;const O=new L;for(let Z=0;Z<S;Z++){const $=Z*z-G;for(let ot=0;ot<C;ot++){const Rt=ot*T-k;O[x]=Rt*M,O[m]=$*_,O[f]=Y,l.push(O.x,O.y,O.z),O[x]=0,O[m]=0,O[f]=w>0?1:-1,h.push(O.x,O.y,O.z),u.push(ot/P),u.push(1-Z/N),U+=1}}for(let Z=0;Z<N;Z++)for(let $=0;$<P;$++){const ot=p+$+C*Z,Rt=p+$+C*(Z+1),It=p+($+1)+C*(Z+1),gt=p+($+1)+C*Z;c.push(ot,Rt,gt),c.push(Rt,It,gt),A+=6}a.addGroup(d,A,E),d+=A,p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ws(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function We(i){const t={};for(let e=0;e<i.length;e++){const n=ws(i[e]);for(const s in n)t[s]=n[s]}return t}function yp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Yu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const Sp={clone:ws,merge:We};var wp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends Oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wp,this.fragmentShader=bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ws(t.uniforms),this.uniformsGroups=yp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Zu extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=Pn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ni=new L,sh=new yt,rh=new yt;class vn extends Zu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Tc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Go*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Tc*2*Math.atan(Math.tan(Go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ni.x,ni.y).multiplyScalar(-t/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-t/ni.z)}getViewSize(t,e){return this.getViewBounds(t,sh,rh),e.subVectors(rh,sh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Go*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ts=-90,es=1;class Ep extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new vn(ts,es,t,e);s.layers=this.layers,this.add(s);const r=new vn(ts,es,t,e);r.layers=this.layers,this.add(r);const o=new vn(ts,es,t,e);o.layers=this.layers,this.add(o);const a=new vn(ts,es,t,e);a.layers=this.layers,this.add(a);const c=new vn(ts,es,t,e);c.layers=this.layers,this.add(c);const l=new vn(ts,es,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===po)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,p,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class $u extends Be{constructor(t=[],e=Ms,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Tp extends Ii{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new $u(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Sn(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:ci});r.uniforms.tEquirect.value=e;const o=new ee(s,r),a=e.minFilter;return e.minFilter===Ai&&(e.minFilter=Mn),new Ep(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class Jt extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ap={type:"move"};class la{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),f=this._getHandJoint(l,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=h.position.distanceTo(u.position),d=.02,g=.005;l.inputState.pinching&&p>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ap)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Jt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Qc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Gt(t),this.near=e,this.far=n}clone(){return new Qc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Rp extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bn,this.environmentIntensity=1,this.environmentRotation=new bn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Cp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ec,this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const He=new L;class go{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Rn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Rn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Rn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Rn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Rn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array),r=he(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ke(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new go(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ku extends Oi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ns;const Ns=new L,is=new L,ss=new L,rs=new yt,Fs=new yt,Ju=new te,Br=new L,Os=new L,kr=new L,oh=new yt,ha=new yt,ah=new yt;class Pp extends ye{constructor(t=new Ku){if(super(),this.isSprite=!0,this.type="Sprite",ns===void 0){ns=new ge;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Cp(e,5);ns.setIndex([0,1,2,0,2,3]),ns.setAttribute("position",new go(n,3,0,!1)),ns.setAttribute("uv",new go(n,2,3,!1))}this.geometry=ns,this.material=t,this.center=new yt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),is.setFromMatrixScale(this.matrixWorld),Ju.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ss.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&is.multiplyScalar(-ss.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Gr(Br.set(-.5,-.5,0),ss,o,is,s,r),Gr(Os.set(.5,-.5,0),ss,o,is,s,r),Gr(kr.set(.5,.5,0),ss,o,is,s,r),oh.set(0,0),ha.set(1,0),ah.set(1,1);let a=t.ray.intersectTriangle(Br,Os,kr,!1,Ns);if(a===null&&(Gr(Os.set(-.5,.5,0),ss,o,is,s,r),ha.set(0,1),a=t.ray.intersectTriangle(Br,kr,Os,!1,Ns),a===null))return;const c=t.ray.origin.distanceTo(Ns);c<t.near||c>t.far||e.push({distance:c,point:Ns.clone(),uv:sn.getInterpolation(Ns,Br,Os,kr,oh,ha,ah,new yt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Gr(i,t,e,n,s,r){rs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Fs.x=r*rs.x-s*rs.y,Fs.y=s*rs.x+r*rs.y):Fs.copy(rs),i.copy(t),i.x+=Fs.x,i.y+=Fs.y,i.applyMatrix4(Ju)}class ju extends Be{constructor(t=null,e=1,n=1,s,r,o,a,c,l=on,h=on,u,p){super(null,o,a,c,l,h,s,r,u,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ac extends ke{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const os=new te,ch=new te,Vr=[],lh=new Fi,Dp=new te,Bs=new ee,ks=new fi;class oi extends ee{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ac(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Dp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,os),lh.copy(t.boundingBox).applyMatrix4(os),this.boundingBox.union(lh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,os),ks.copy(t.boundingSphere).applyMatrix4(os),this.boundingSphere.union(ks)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Bs.geometry=this.geometry,Bs.material=this.material,Bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),t.ray.intersectsSphere(ks)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,os),ch.multiplyMatrices(n,os),Bs.matrixWorld=ch,Bs.raycast(t,Vr);for(let o=0,a=Vr.length;o<a;o++){const c=Vr[o];c.instanceId=r,c.object=this,e.push(c)}Vr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ac(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ju(new Float32Array(s*this.count),s,this.count,Zc,Cn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ua=new L,Ip=new L,Lp=new qt;class si{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ua.subVectors(n,e).cross(Ip.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ua),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Lp.getNormalMatrix(t),s=this.coplanarPoint(ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vi=new fi,zp=new yt(.5,.5),Hr=new L;class To{constructor(t=new si,e=new si,n=new si,s=new si,r=new si,o=new si){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Pn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],p=r[6],d=r[7],g=r[8],x=r[9],m=r[10],f=r[11],M=r[12],_=r[13],v=r[14],b=r[15];if(s[0].setComponents(l-o,d-h,f-g,b-M).normalize(),s[1].setComponents(l+o,d+h,f+g,b+M).normalize(),s[2].setComponents(l+a,d+u,f+x,b+_).normalize(),s[3].setComponents(l-a,d-u,f-x,b-_).normalize(),n)s[4].setComponents(c,p,m,v).normalize(),s[5].setComponents(l-c,d-p,f-m,b-v).normalize();else if(s[4].setComponents(l-c,d-p,f-m,b-v).normalize(),e===Pn)s[5].setComponents(l+c,d+p,f+m,b+v).normalize();else if(e===po)s[5].setComponents(c,p,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(t){vi.center.set(0,0,0);const e=zp.distanceTo(t.center);return vi.radius=.7071067811865476+e,vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Hr.x=s.normal.x>0?t.max.x:t.min.x,Hr.y=s.normal.y>0?t.max.y:t.min.y,Hr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Hr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Qu extends Oi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xo=new L,_o=new L,hh=new te,Gs=new Vu,Wr=new fi,da=new L,uh=new L;class Up extends ye{constructor(t=new ge,e=new Qu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)xo.fromBufferAttribute(e,s-1),_o.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=xo.distanceTo(_o);t.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere),Wr.applyMatrix4(s),Wr.radius+=r,t.ray.intersectsSphere(Wr)===!1)return;hh.copy(s).invert(),Gs.copy(t.ray).applyMatrix4(hh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){const f=h.getX(x),M=h.getX(x+1),_=Xr(this,t,Gs,c,f,M,x);_&&e.push(_)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(d),f=Xr(this,t,Gs,c,x,m,g-1);f&&e.push(f)}}else{const d=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let x=d,m=g-1;x<m;x+=l){const f=Xr(this,t,Gs,c,x,x+1,x);f&&e.push(f)}if(this.isLineLoop){const x=Xr(this,t,Gs,c,g-1,d,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Xr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(xo.fromBufferAttribute(a,s),_o.fromBufferAttribute(a,r),e.distanceSqToSegment(xo,_o,da,uh)>n)return;da.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(da);if(!(l<t.near||l>t.far))return{distance:l,point:uh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const dh=new L,fh=new L;class Np extends Up{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)dh.fromBufferAttribute(e,s),fh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+dh.distanceTo(fh);t.setAttribute("lineDistance",new $t(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Bi extends Be{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class td extends Be{constructor(t,e,n=Di,s,r,o,a=on,c=on,l,h=rr,u=1){if(h!==rr&&h!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:u};super(p,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new jc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class ed extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class tl extends ge{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new L,h=new yt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,p=3;u<=e;u++,p+=3){const d=n+u/e*s;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[p]/t+1)/2,h.y=(o[p+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new $t(o,3)),this.setAttribute("normal",new $t(a,3)),this.setAttribute("uv",new $t(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Rs extends ge{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],p=[],d=[];let g=0;const x=[],m=n/2;let f=0;M(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new $t(u,3)),this.setAttribute("normal",new $t(p,3)),this.setAttribute("uv",new $t(d,2));function M(){const v=new L,b=new L;let w=0;const P=(e-t)/n;for(let N=0;N<=r;N++){const E=[],T=N/r,z=T*(e-t)+t;for(let k=0;k<=s;k++){const G=k/s,Y=G*c+a,C=Math.sin(Y),S=Math.cos(Y);b.x=z*C,b.y=-T*n+m,b.z=z*S,u.push(b.x,b.y,b.z),v.set(C,P,S).normalize(),p.push(v.x,v.y,v.z),d.push(G,1-T),E.push(g++)}x.push(E)}for(let N=0;N<s;N++)for(let E=0;E<r;E++){const T=x[E][N],z=x[E+1][N],k=x[E+1][N+1],G=x[E][N+1];(t>0||E!==0)&&(h.push(T,z,G),w+=3),(e>0||E!==r-1)&&(h.push(z,k,G),w+=3)}l.addGroup(f,w,0),f+=w}function _(v){const b=g,w=new yt,P=new L;let N=0;const E=v===!0?t:e,T=v===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*T,0),p.push(0,T,0),d.push(.5,.5),g++;const z=g;for(let k=0;k<=s;k++){const Y=k/s*c+a,C=Math.cos(Y),S=Math.sin(Y);P.x=E*S,P.y=m*T,P.z=E*C,u.push(P.x,P.y,P.z),p.push(0,T,0),w.x=C*.5+.5,w.y=S*.5*T+.5,d.push(w.x,w.y),g++}for(let k=0;k<s;k++){const G=b+k,Y=z+k;v===!0?h.push(Y,Y+1,G):h.push(Y+1,Y,G),N+=3}l.addGroup(f,N,v===!0?1:2),f+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class cr extends Rs{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new cr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],p=n[s+1]-h,d=(o-h)/p;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new yt:new L);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,c=new te;for(let d=0;d<=t;d++){const g=d/t;s[d]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),p<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Xt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Xt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],d*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class el extends Un{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new yt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=c-this.aX,d=l-this.aY;c=p*h-d*u+this.aX,l=p*u+d*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Fp extends el{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function nl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let p=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;p*=h,d*=h,s(o,a,p,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const qr=new L,fa=new nl,pa=new nl,ma=new nl;class Op extends Un{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(qr.subVectors(s[0],s[1]).add(s[0]),l=qr);const u=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(qr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=qr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(p),d),m=Math.pow(p.distanceToSquared(h),d);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),fa.initNonuniformCatmullRom(l.x,u.x,p.x,h.x,g,x,m),pa.initNonuniformCatmullRom(l.y,u.y,p.y,h.y,g,x,m),ma.initNonuniformCatmullRom(l.z,u.z,p.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(fa.initCatmullRom(l.x,u.x,p.x,h.x,this.tension),pa.initCatmullRom(l.y,u.y,p.y,h.y,this.tension),ma.initCatmullRom(l.z,u.z,p.z,h.z,this.tension));return n.set(fa.calc(c),pa.calc(c),ma.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ph(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Bp(i,t){const e=1-i;return e*e*t}function kp(i,t){return 2*(1-i)*i*t}function Gp(i,t){return i*i*t}function Ks(i,t,e,n){return Bp(i,t)+kp(i,e)+Gp(i,n)}function Vp(i,t){const e=1-i;return e*e*e*t}function Hp(i,t){const e=1-i;return 3*e*e*i*t}function Wp(i,t){return 3*(1-i)*i*i*t}function Xp(i,t){return i*i*i*t}function Js(i,t,e,n,s){return Vp(i,t)+Hp(i,e)+Wp(i,n)+Xp(i,s)}class nd extends Un{constructor(t=new yt,e=new yt,n=new yt,s=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new yt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Js(t,s.x,r.x,o.x,a.x),Js(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qp extends Un{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Js(t,s.x,r.x,o.x,a.x),Js(t,s.y,r.y,o.y,a.y),Js(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class id extends Un{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yp extends Un{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sd extends Un{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ks(t,s.x,r.x,o.x),Ks(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zp extends Un{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Ks(t,s.x,r.x,o.x),Ks(t,s.y,r.y,o.y),Ks(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rd extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(ph(a,c.x,l.x,h.x,u.x),ph(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new yt().fromArray(s))}return this}}var mh=Object.freeze({__proto__:null,ArcCurve:Fp,CatmullRomCurve3:Op,CubicBezierCurve:nd,CubicBezierCurve3:qp,EllipseCurve:el,LineCurve:id,LineCurve3:Yp,QuadraticBezierCurve:sd,QuadraticBezierCurve3:Zp,SplineCurve:rd});class $p extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new mh[s.type]().fromJSON(s))}return this}}class gh extends $p{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new id(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new sd(this.currentPoint.clone(),new yt(t,e),new yt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new nd(this.currentPoint.clone(),new yt(t,e),new yt(n,s),new yt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new rd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new el(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class od extends gh{constructor(t){super(t),this.uuid=qn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new gh().fromJSON(s))}return this}}function Kp(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=ad(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=em(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let p=e;p<s;p+=e){const d=i[p],g=i[p+1];d<a&&(a=d),g<c&&(c=g),d>h&&(h=d),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return lr(r,o,e,a,c,l,0),o}function ad(i,t,e,n,s){let r;if(s===dm(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=xh(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=xh(o/n|0,i[o],i[o+1],r);return r&&bs(r,r.next)&&(ur(r),r=r.next),r}function Li(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(bs(e,e.next)||Me(e.prev,e,e.next)===0)){if(ur(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function lr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&om(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?jp(i,n,s,r):Jp(i)){t.push(c.i,i.i,l.i),ur(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Qp(Li(i),t),lr(i,t,e,n,s,r,2)):o===2&&tm(i,t,e,n,s,r):lr(Li(i),t,e,n,s,r,1);break}}}function Jp(i){const t=i.prev,e=i,n=i.next;if(Me(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),p=Math.max(s,r,o),d=Math.max(a,c,l);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=p&&g.y>=u&&g.y<=d&&Xs(s,a,r,c,o,l,g.x,g.y)&&Me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function jp(i,t,e,n){const s=i.prev,r=i,o=i.next;if(Me(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,p=o.y,d=Math.min(a,c,l),g=Math.min(h,u,p),x=Math.max(a,c,l),m=Math.max(h,u,p),f=Rc(d,g,t,e,n),M=Rc(x,m,t,e,n);let _=i.prevZ,v=i.nextZ;for(;_&&_.z>=f&&v&&v.z<=M;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Xs(a,h,c,u,l,p,_.x,_.y)&&Me(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Xs(a,h,c,u,l,p,v.x,v.y)&&Me(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=f;){if(_.x>=d&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Xs(a,h,c,u,l,p,_.x,_.y)&&Me(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=M;){if(v.x>=d&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Xs(a,h,c,u,l,p,v.x,v.y)&&Me(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Qp(i,t){let e=i;do{const n=e.prev,s=e.next.next;!bs(n,s)&&ld(n,e,e.next,s)&&hr(n,s)&&hr(s,n)&&(t.push(n.i,e.i,s.i),ur(e),ur(e.next),e=i=s),e=e.next}while(e!==i);return Li(e)}function tm(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&lm(o,a)){let c=hd(o,a);o=Li(o,o.next),c=Li(c,c.next),lr(o,t,e,n,s,r,0),lr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function em(i,t,e,n){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=ad(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(cm(l))}s.sort(nm);for(let r=0;r<s.length;r++)e=im(s[r],e);return e}function nm(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function im(i,t){const e=sm(i,t);if(!e)return t;const n=hd(e,i);return Li(n,n.next),Li(e,e.next)}function sm(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,o;if(bs(i,e))return e;do{if(bs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&cd(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);hr(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&rm(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function rm(i,t){return Me(i.prev,i,t.prev)<0&&Me(t.next,i,i.next)<0}function om(i,t,e,n){let s=i;do s.z===0&&(s.z=Rc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,am(s)}function am(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Rc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function cm(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function cd(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Xs(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&cd(i,t,e,n,s,r,o,a)}function lm(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!hm(i,t)&&(hr(i,t)&&hr(t,i)&&um(i,t)&&(Me(i.prev,i,t.prev)||Me(i,t.prev,t))||bs(i,t)&&Me(i.prev,i,i.next)>0&&Me(t.prev,t,t.next)>0)}function Me(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function bs(i,t){return i.x===t.x&&i.y===t.y}function ld(i,t,e,n){const s=Zr(Me(i,t,e)),r=Zr(Me(i,t,n)),o=Zr(Me(e,n,i)),a=Zr(Me(e,n,t));return!!(s!==r&&o!==a||s===0&&Yr(i,e,t)||r===0&&Yr(i,n,t)||o===0&&Yr(e,i,n)||a===0&&Yr(e,t,n))}function Yr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Zr(i){return i>0?1:i<0?-1:0}function hm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ld(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function hr(i,t){return Me(i.prev,i,i.next)<0?Me(i,t,i.next)>=0&&Me(i,i.prev,t)>=0:Me(i,t,i.prev)<0||Me(i,i.next,t)<0}function um(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function hd(i,t){const e=Cc(i.i,i.x,i.y),n=Cc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function xh(i,t,e,n){const s=Cc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ur(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Cc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function dm(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class fm{static triangulate(t,e,n=2){return Kp(t,e,n)}}class js{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return js.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];_h(t),vh(n,t);let o=t.length;e.forEach(_h);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,vh(n,e[c]);const a=fm.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function _h(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function vh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class _r extends ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,p=e/c,d=[],g=[],x=[],m=[];for(let f=0;f<h;f++){const M=f*p-o;for(let _=0;_<l;_++){const v=_*u-r;g.push(v,-M,0),x.push(0,0,1),m.push(_/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<a;M++){const _=M+l*f,v=M+l*(f+1),b=M+1+l*(f+1),w=M+1+l*f;d.push(_,v,w),d.push(v,b,w)}this.setIndex(d),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _r(t.width,t.height,t.widthSegments,t.heightSegments)}}class il extends ge{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const p=(e-t)/s,d=new L,g=new yt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const f=r+m/n*o;d.x=u*Math.cos(f),d.y=u*Math.sin(f),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=p}for(let x=0;x<s;x++){const m=x*(n+1);for(let f=0;f<n;f++){const M=f+m,_=M,v=M+n+1,b=M+n+2,w=M+1;a.push(_,v,w),a.push(v,b,w)}}this.setIndex(a),this.setAttribute("position",new $t(c,3)),this.setAttribute("normal",new $t(l,3)),this.setAttribute("uv",new $t(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new il(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class sl extends ge{constructor(t=new od([new yt(0,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new $t(s,3)),this.setAttribute("normal",new $t(r,3)),this.setAttribute("uv",new $t(o,2));function l(h){const u=s.length/3,p=h.extractPoints(e);let d=p.shape;const g=p.holes;js.isClockWise(d)===!1&&(d=d.reverse());for(let m=0,f=g.length;m<f;m++){const M=g[m];js.isClockWise(M)===!0&&(g[m]=M.reverse())}const x=js.triangulateShape(d,g);for(let m=0,f=g.length;m<f;m++){const M=g[m];d=d.concat(M)}for(let m=0,f=d.length;m<f;m++){const M=d[m];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,f=x.length;m<f;m++){const M=x[m],_=M[0]+u,v=M[1]+u,b=M[2]+u;n.push(_,v,b),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return pm(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new sl(n,t.curveSegments)}}function pm(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class zi extends ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new L,p=new L,d=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){const M=[],_=f/n;let v=0;f===0&&o===0?v=.5/e:f===n&&c===Math.PI&&(v=-.5/e);for(let b=0;b<=e;b++){const w=b/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),p.copy(u).normalize(),x.push(p.x,p.y,p.z),m.push(w+v,1-_),M.push(l++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<e;M++){const _=h[f][M+1],v=h[f][M],b=h[f+1][M],w=h[f+1][M+1];(f!==0||o>0)&&d.push(_,v,w),(f!==n-1||c<Math.PI)&&d.push(v,b,w)}this.setIndex(d),this.setAttribute("position",new $t(g,3)),this.setAttribute("normal",new $t(x,3)),this.setAttribute("uv",new $t(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ao extends ge{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new L,u=new L,p=new L;for(let d=0;d<=n;d++)for(let g=0;g<=s;g++){const x=g/s*r,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),p.subVectors(u,h).normalize(),c.push(p.x,p.y,p.z),l.push(g/s),l.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=s;g++){const x=(s+1)*d+g-1,m=(s+1)*(d-1)+g-1,f=(s+1)*(d-1)+g,M=(s+1)*d+g;o.push(x,m,M),o.push(m,f,M)}this.setIndex(o),this.setAttribute("position",new $t(a,3)),this.setAttribute("normal",new $t(c,3)),this.setAttribute("uv",new $t(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class oe extends Oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ou,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class mm extends Oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class gm extends Oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ud extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class xm extends ud{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ga=new te,Mh=new L,yh=new L;class _m{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new To,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new be(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Mh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mh),yh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yh),e.updateMatrixWorld(),ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ro extends Zu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class vm extends _m{constructor(){super(new Ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mm extends ud{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new vm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ym extends vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Sh=new L,$r=new L,as=new L,cs=new L,xa=new L,Sm=new L,wm=new L;class bm{constructor(t=new L,e=new L){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Sh.subVectors(t,this.start),$r.subVectors(this.end,this.start);const n=$r.dot($r);let r=$r.dot(Sh)/n;return e&&(r=Xt(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=Sm,n=wm){const s=10000000000000001e-32;let r,o;const a=this.start,c=t.start,l=this.end,h=t.end;as.subVectors(l,a),cs.subVectors(h,c),xa.subVectors(a,c);const u=as.dot(as),p=cs.dot(cs),d=cs.dot(xa);if(u<=s&&p<=s)return e.copy(a),n.copy(c),e.sub(n),e.dot(e);if(u<=s)r=0,o=d/p,o=Xt(o,0,1);else{const g=as.dot(xa);if(p<=s)o=0,r=Xt(-g/u,0,1);else{const x=as.dot(cs),m=u*p-x*x;m!==0?r=Xt((x*d-g*p)/m,0,1):r=0,o=(x*r+d)/p,o<0?(o=0,r=Xt(-g/u,0,1)):o>1&&(o=1,r=Xt((x-g)/u,0,1))}}return e.copy(a).add(as.multiplyScalar(r)),n.copy(c).add(cs.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function wh(i,t,e,n){const s=Em(n);switch(e){case Uu:return i*t;case Zc:return i*t/s.components*s.byteLength;case $c:return i*t/s.components*s.byteLength;case Fu:return i*t*2/s.components*s.byteLength;case Kc:return i*t*2/s.components*s.byteLength;case Nu:return i*t*3/s.components*s.byteLength;case yn:return i*t*4/s.components*s.byteLength;case Jc:return i*t*4/s.components*s.byteLength;case ro:case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ao:case co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ja:case tc:return Math.max(i,16)*Math.max(t,8)/4;case Ja:case Qa:return Math.max(i,8)*Math.max(t,8)/2;case ec:case nc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ic:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case sc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case rc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case oc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ac:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case cc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case lc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case hc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case uc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case dc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case fc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case pc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case mc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case gc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case xc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case _c:case vc:case Mc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case yc:case Sc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case wc:case bc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Em(i){switch(i){case Ln:case Du:return{byteLength:1,components:1};case ir:case Iu:case xr:return{byteLength:2,components:1};case qc:case Yc:return{byteLength:2,components:4};case Di:case Xc:case Cn:return{byteLength:4,components:1};case Lu:case zu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function dd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Tm(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,g)=>d.start-g.start);let p=0;for(let d=1;d<u.length;d++){const g=u[p],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++p,u[p]=x)}u.length=p+1;for(let d=0,g=u.length;d<g;d++){const x=u[d];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Am=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rm=`#ifdef USE_ALPHAHASH
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
#endif`,Cm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Im=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lm=`#ifdef USE_AOMAP
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
#endif`,zm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Um=`#ifdef USE_BATCHING
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
#endif`,Nm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,km=`#ifdef USE_IRIDESCENCE
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
#endif`,Gm=`#ifdef USE_BUMPMAP
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
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ym=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,$m=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Km=`#define PI 3.141592653589793
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
} // validated`,Jm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jm=`vec3 transformedNormal = objectNormal;
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
#endif`,Qm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,eg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ng=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ig="gl_FragColor = linearToOutputTexel( gl_FragColor );",sg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rg=`#ifdef USE_ENVMAP
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
#endif`,og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ag=`#ifdef USE_ENVMAP
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
#endif`,cg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
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
#endif`,hg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ug=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pg=`#ifdef USE_GRADIENTMAP
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
}`,mg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_g=`uniform bool receiveShadow;
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
#endif`,vg=`#ifdef USE_ENVMAP
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
#endif`,Mg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bg=`PhysicalMaterial material;
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
#endif`,Eg=`struct PhysicalMaterial {
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
}`,Tg=`
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
#endif`,Ag=`#if defined( RE_IndirectDiffuse )
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
#endif`,Rg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Pg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ig=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Lg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ug=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ng=`#if defined( USE_POINTS_UV )
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
#endif`,Fg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,kg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vg=`#ifdef USE_MORPHTARGETS
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
#endif`,Hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,qg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$g=`#ifdef USE_NORMALMAP
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
#endif`,Kg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,t0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,n0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,i0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,s0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,o0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,a0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,c0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,l0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,h0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,u0=`float getShadowMask() {
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
}`,d0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,f0=`#ifdef USE_SKINNING
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
#endif`,p0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,m0=`#ifdef USE_SKINNING
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
#endif`,g0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,x0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,M0=`#ifdef USE_TRANSMISSION
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
#endif`,y0=`#ifdef USE_TRANSMISSION
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
#endif`,S0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,b0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,E0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const T0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,A0=`uniform sampler2D t2D;
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
}`,R0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,P0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,I0=`#include <common>
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
}`,L0=`#if DEPTH_PACKING == 3200
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
}`,z0=`#define DISTANCE
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
}`,U0=`#define DISTANCE
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
}`,N0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O0=`uniform float scale;
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
}`,B0=`uniform vec3 diffuse;
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
}`,k0=`#include <common>
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
}`,G0=`uniform vec3 diffuse;
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
}`,V0=`#define LAMBERT
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
}`,H0=`#define LAMBERT
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
}`,W0=`#define MATCAP
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
}`,X0=`#define MATCAP
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
}`,q0=`#define NORMAL
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
}`,Y0=`#define NORMAL
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
}`,Z0=`#define PHONG
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
}`,$0=`#define PHONG
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
}`,K0=`#define STANDARD
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
}`,J0=`#define STANDARD
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
}`,j0=`#define TOON
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
}`,Q0=`#define TOON
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
}`,tx=`uniform float size;
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
}`,ex=`uniform vec3 diffuse;
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
}`,nx=`#include <common>
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
}`,ix=`uniform vec3 color;
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
}`,sx=`uniform float rotation;
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
}`,rx=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:Am,alphahash_pars_fragment:Rm,alphamap_fragment:Cm,alphamap_pars_fragment:Pm,alphatest_fragment:Dm,alphatest_pars_fragment:Im,aomap_fragment:Lm,aomap_pars_fragment:zm,batching_pars_vertex:Um,batching_vertex:Nm,begin_vertex:Fm,beginnormal_vertex:Om,bsdfs:Bm,iridescence_fragment:km,bumpmap_pars_fragment:Gm,clipping_planes_fragment:Vm,clipping_planes_pars_fragment:Hm,clipping_planes_pars_vertex:Wm,clipping_planes_vertex:Xm,color_fragment:qm,color_pars_fragment:Ym,color_pars_vertex:Zm,color_vertex:$m,common:Km,cube_uv_reflection_fragment:Jm,defaultnormal_vertex:jm,displacementmap_pars_vertex:Qm,displacementmap_vertex:tg,emissivemap_fragment:eg,emissivemap_pars_fragment:ng,colorspace_fragment:ig,colorspace_pars_fragment:sg,envmap_fragment:rg,envmap_common_pars_fragment:og,envmap_pars_fragment:ag,envmap_pars_vertex:cg,envmap_physical_pars_fragment:vg,envmap_vertex:lg,fog_vertex:hg,fog_pars_vertex:ug,fog_fragment:dg,fog_pars_fragment:fg,gradientmap_pars_fragment:pg,lightmap_pars_fragment:mg,lights_lambert_fragment:gg,lights_lambert_pars_fragment:xg,lights_pars_begin:_g,lights_toon_fragment:Mg,lights_toon_pars_fragment:yg,lights_phong_fragment:Sg,lights_phong_pars_fragment:wg,lights_physical_fragment:bg,lights_physical_pars_fragment:Eg,lights_fragment_begin:Tg,lights_fragment_maps:Ag,lights_fragment_end:Rg,logdepthbuf_fragment:Cg,logdepthbuf_pars_fragment:Pg,logdepthbuf_pars_vertex:Dg,logdepthbuf_vertex:Ig,map_fragment:Lg,map_pars_fragment:zg,map_particle_fragment:Ug,map_particle_pars_fragment:Ng,metalnessmap_fragment:Fg,metalnessmap_pars_fragment:Og,morphinstance_vertex:Bg,morphcolor_vertex:kg,morphnormal_vertex:Gg,morphtarget_pars_vertex:Vg,morphtarget_vertex:Hg,normal_fragment_begin:Wg,normal_fragment_maps:Xg,normal_pars_fragment:qg,normal_pars_vertex:Yg,normal_vertex:Zg,normalmap_pars_fragment:$g,clearcoat_normal_fragment_begin:Kg,clearcoat_normal_fragment_maps:Jg,clearcoat_pars_fragment:jg,iridescence_pars_fragment:Qg,opaque_fragment:t0,packing:e0,premultiplied_alpha_fragment:n0,project_vertex:i0,dithering_fragment:s0,dithering_pars_fragment:r0,roughnessmap_fragment:o0,roughnessmap_pars_fragment:a0,shadowmap_pars_fragment:c0,shadowmap_pars_vertex:l0,shadowmap_vertex:h0,shadowmask_pars_fragment:u0,skinbase_vertex:d0,skinning_pars_vertex:f0,skinning_vertex:p0,skinnormal_vertex:m0,specularmap_fragment:g0,specularmap_pars_fragment:x0,tonemapping_fragment:_0,tonemapping_pars_fragment:v0,transmission_fragment:M0,transmission_pars_fragment:y0,uv_pars_fragment:S0,uv_pars_vertex:w0,uv_vertex:b0,worldpos_vertex:E0,background_vert:T0,background_frag:A0,backgroundCube_vert:R0,backgroundCube_frag:C0,cube_vert:P0,cube_frag:D0,depth_vert:I0,depth_frag:L0,distanceRGBA_vert:z0,distanceRGBA_frag:U0,equirect_vert:N0,equirect_frag:F0,linedashed_vert:O0,linedashed_frag:B0,meshbasic_vert:k0,meshbasic_frag:G0,meshlambert_vert:V0,meshlambert_frag:H0,meshmatcap_vert:W0,meshmatcap_frag:X0,meshnormal_vert:q0,meshnormal_frag:Y0,meshphong_vert:Z0,meshphong_frag:$0,meshphysical_vert:K0,meshphysical_frag:J0,meshtoon_vert:j0,meshtoon_frag:Q0,points_vert:tx,points_frag:ex,shadow_vert:nx,shadow_frag:ix,sprite_vert:sx,sprite_frag:rx},pt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},An={basic:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:We([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:We([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:We([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:We([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:We([pt.points,pt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:We([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:We([pt.common,pt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:We([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:We([pt.sprite,pt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:We([pt.common,pt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:We([pt.lights,pt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};An.physical={uniforms:We([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const Kr={r:0,b:0,g:0},Mi=new bn,ox=new te;function ax(i,t,e,n,s,r,o){const a=new Gt(0);let c=r===!0?0:1,l,h,u=null,p=0,d=null;function g(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?e:t).get(v)),v}function x(_){let v=!1;const b=g(_);b===null?f(a,c):b&&b.isColor&&(f(b,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,v){const b=g(v);b&&(b.isCubeTexture||b.mapping===Eo)?(h===void 0&&(h=new ee(new Sn(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:ws(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,P,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Mi.copy(v.backgroundRotation),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ox.makeRotationFromEuler(Mi)),h.material.toneMapped=se.getTransfer(b.colorSpace)!==le,(u!==b||p!==b.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=b,p=b.version,d=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new ee(new _r(2,2),new di({name:"BackgroundMaterial",uniforms:ws(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=se.getTransfer(b.colorSpace)!==le,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||p!==b.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,p=b.version,d=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function f(_,v){_.getRGB(Kr,Yu(i)),n.buffers.color.setClear(Kr.r,Kr.g,Kr.b,v,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),c=v,f(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,f(a,c)},render:x,addToRenderList:m,dispose:M}}function cx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(T,z,k,G,Y){let C=!1;const S=u(G,k,z);r!==S&&(r=S,l(r.object)),C=d(T,G,k,Y),C&&g(T,G,k,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(C||o)&&(o=!1,v(T,z,k,G),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function h(T){return i.deleteVertexArray(T)}function u(T,z,k){const G=k.wireframe===!0;let Y=n[T.id];Y===void 0&&(Y={},n[T.id]=Y);let C=Y[z.id];C===void 0&&(C={},Y[z.id]=C);let S=C[G];return S===void 0&&(S=p(c()),C[G]=S),S}function p(T){const z=[],k=[],G=[];for(let Y=0;Y<e;Y++)z[Y]=0,k[Y]=0,G[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:k,attributeDivisors:G,object:T,attributes:{},index:null}}function d(T,z,k,G){const Y=r.attributes,C=z.attributes;let S=0;const U=k.getAttributes();for(const A in U)if(U[A].location>=0){const Z=Y[A];let $=C[A];if($===void 0&&(A==="instanceMatrix"&&T.instanceMatrix&&($=T.instanceMatrix),A==="instanceColor"&&T.instanceColor&&($=T.instanceColor)),Z===void 0||Z.attribute!==$||$&&Z.data!==$.data)return!0;S++}return r.attributesNum!==S||r.index!==G}function g(T,z,k,G){const Y={},C=z.attributes;let S=0;const U=k.getAttributes();for(const A in U)if(U[A].location>=0){let Z=C[A];Z===void 0&&(A==="instanceMatrix"&&T.instanceMatrix&&(Z=T.instanceMatrix),A==="instanceColor"&&T.instanceColor&&(Z=T.instanceColor));const $={};$.attribute=Z,Z&&Z.data&&($.data=Z.data),Y[A]=$,S++}r.attributes=Y,r.attributesNum=S,r.index=G}function x(){const T=r.newAttributes;for(let z=0,k=T.length;z<k;z++)T[z]=0}function m(T){f(T,0)}function f(T,z){const k=r.newAttributes,G=r.enabledAttributes,Y=r.attributeDivisors;k[T]=1,G[T]===0&&(i.enableVertexAttribArray(T),G[T]=1),Y[T]!==z&&(i.vertexAttribDivisor(T,z),Y[T]=z)}function M(){const T=r.newAttributes,z=r.enabledAttributes;for(let k=0,G=z.length;k<G;k++)z[k]!==T[k]&&(i.disableVertexAttribArray(k),z[k]=0)}function _(T,z,k,G,Y,C,S){S===!0?i.vertexAttribIPointer(T,z,k,Y,C):i.vertexAttribPointer(T,z,k,G,Y,C)}function v(T,z,k,G){x();const Y=G.attributes,C=k.getAttributes(),S=z.defaultAttributeValues;for(const U in C){const A=C[U];if(A.location>=0){let O=Y[U];if(O===void 0&&(U==="instanceMatrix"&&T.instanceMatrix&&(O=T.instanceMatrix),U==="instanceColor"&&T.instanceColor&&(O=T.instanceColor)),O!==void 0){const Z=O.normalized,$=O.itemSize,ot=t.get(O);if(ot===void 0)continue;const Rt=ot.buffer,It=ot.type,gt=ot.bytesPerElement,F=It===i.INT||It===i.UNSIGNED_INT||O.gpuType===Xc;if(O.isInterleavedBufferAttribute){const q=O.data,Q=q.stride,it=O.offset;if(q.isInstancedInterleavedBuffer){for(let nt=0;nt<A.locationSize;nt++)f(A.location+nt,q.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let nt=0;nt<A.locationSize;nt++)m(A.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let nt=0;nt<A.locationSize;nt++)_(A.location+nt,$/A.locationSize,It,Z,Q*gt,(it+$/A.locationSize*nt)*gt,F)}else{if(O.isInstancedBufferAttribute){for(let q=0;q<A.locationSize;q++)f(A.location+q,O.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let q=0;q<A.locationSize;q++)m(A.location+q);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let q=0;q<A.locationSize;q++)_(A.location+q,$/A.locationSize,It,Z,$*gt,$/A.locationSize*q*gt,F)}}else if(S!==void 0){const Z=S[U];if(Z!==void 0)switch(Z.length){case 2:i.vertexAttrib2fv(A.location,Z);break;case 3:i.vertexAttrib3fv(A.location,Z);break;case 4:i.vertexAttrib4fv(A.location,Z);break;default:i.vertexAttrib1fv(A.location,Z)}}}}M()}function b(){N();for(const T in n){const z=n[T];for(const k in z){const G=z[k];for(const Y in G)h(G[Y].object),delete G[Y];delete z[k]}delete n[T]}}function w(T){if(n[T.id]===void 0)return;const z=n[T.id];for(const k in z){const G=z[k];for(const Y in G)h(G[Y].object),delete G[Y];delete z[k]}delete n[T.id]}function P(T){for(const z in n){const k=n[z];if(k[T.id]===void 0)continue;const G=k[T.id];for(const Y in G)h(G[Y].object),delete G[Y];delete k[T.id]}}function N(){E(),o=!0,r!==s&&(r=s,l(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:E,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function lx(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function c(l,h,u,p){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],h[g],p[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*p[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function hx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==yn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const N=P===xr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Ln&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Cn&&!N)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),b=g>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:b,maxSamples:w}}function ux(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new si,a=new qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const d=u.length!==0||p||n!==0||s;return s=p,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=h(u,p,0)},this.setState=function(u,p,d){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,_=M*4;let v=f.clippingState||null;c.value=v,v=h(g,p,_,d);for(let b=0;b!==_;++b)v[b]=e[b];f.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,p,d,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const f=d+x*4,M=p.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,v=d;_!==x;++_,v+=4)o.copy(u[_]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function dx(i){let t=new WeakMap;function e(o,a){return a===Za?o.mapping=Ms:a===$a&&(o.mapping=ys),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Za||a===$a)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Tp(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const fs=4,bh=[.125,.215,.35,.446,.526,.582],Ei=20,_a=new Ro,Eh=new Gt;let va=null,Ma=0,ya=0,Sa=!1;const Si=(1+Math.sqrt(5))/2,ls=1/Si,Th=[new L(-Si,ls,0),new L(Si,ls,0),new L(-ls,0,Si),new L(ls,0,Si),new L(0,Si,-ls),new L(0,Si,ls),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],fx=new L;class Ah{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=fx}=r;va=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ph(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ch(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(va,Ma,ya),this._renderer.xr.enabled=Sa,t.scissorTest=!1,Jr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ms||t.mapping===ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),va=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),ya=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:xr,format:yn,colorSpace:Ss,depthBuffer:!1},s=Rh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=px(r)),this._blurMaterial=mx(r,t,e)}return s}_compileMaterial(t){const e=new ee(this._lodPlanes[0],t);this._renderer.compile(e,_a)}_sceneToCubeUV(t,e,n,s,r){const c=new vn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,d=u.toneMapping;u.getClearColor(Eh),u.toneMapping=li,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const x=new en({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),m=new ee(new Sn,x);let f=!1;const M=t.background;M?M.isColor&&(x.color.copy(M),t.background=null,f=!0):(x.color.copy(Eh),f=!0);for(let _=0;_<6;_++){const v=_%3;v===0?(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[_],r.y,r.z)):v===1?(c.up.set(0,0,l[_]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[_],r.z)):(c.up.set(0,l[_],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[_]));const b=this._cubeSize;Jr(s,v*b,_>2?b:0,b,b),u.setRenderTarget(s),f&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=d,u.autoClear=p,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ms||t.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ph()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ch());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ee(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Jr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,_a)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Th[(s-r-1)%Th.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ee(this._lodPlanes[s],l),p=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ei-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ei;m>Ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ei}`);const f=[];let M=0;for(let P=0;P<Ei;++P){const N=P/x,E=Math.exp(-N*N/2);f.push(E),P===0?M+=E:P<m&&(M+=2*E)}for(let P=0;P<f.length;P++)f[P]=f[P]/M;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:_}=this;p.dTheta.value=g,p.mipInt.value=_-n;const v=this._sizeLods[s],b=3*v*(s>_-fs?s-_+fs:0),w=4*(this._cubeSize-v);Jr(e,b,w,3*v,2*v),c.setRenderTarget(e),c.render(u,_a)}}function px(i){const t=[],e=[],n=[];let s=i;const r=i-fs+1+bh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-fs?c=bh[o-i+fs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,p=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,x=3,m=2,f=1,M=new Float32Array(x*g*d),_=new Float32Array(m*g*d),v=new Float32Array(f*g*d);for(let w=0;w<d;w++){const P=w%3*2/3-1,N=w>2?0:-1,E=[P,N,0,P+2/3,N,0,P+2/3,N+1,0,P,N,0,P+2/3,N+1,0,P,N+1,0];M.set(E,x*g*w),_.set(p,m*g*w);const T=[w,w,w,w,w,w];v.set(T,f*g*w)}const b=new ge;b.setAttribute("position",new ke(M,x)),b.setAttribute("uv",new ke(_,m)),b.setAttribute("faceIndex",new ke(v,f)),t.push(b),s>fs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Rh(i,t,e){const n=new Ii(i,t,e);return n.texture.mapping=Eo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Jr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function mx(i,t,e){const n=new Float32Array(Ei),s=new L(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:rl(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Ch(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:rl(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Ph(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:rl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function rl(){return`

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
	`}function gx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Za||c===$a,h=c===Ms||c===ys;if(l||h){let u=t.get(a);const p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new Ah(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Ah(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function xx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ar("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function _x(i,t,e,n){const s={},r=new WeakMap;function o(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete s[p.id];const d=r.get(p);d&&(t.remove(d),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(u,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,e.memory.geometries++),p}function c(u){const p=u.attributes;for(const d in p)t.update(p[d],i.ARRAY_BUFFER)}function l(u){const p=[],d=u.index,g=u.attributes.position;let x=0;if(d!==null){const M=d.array;x=d.version;for(let _=0,v=M.length;_<v;_+=3){const b=M[_+0],w=M[_+1],P=M[_+2];p.push(b,w,w,P,P,b)}}else if(g!==void 0){const M=g.array;x=g.version;for(let _=0,v=M.length/3-1;_<v;_+=3){const b=_+0,w=_+1,P=_+2;p.push(b,w,w,P,P,b)}}else return;const m=new(ku(p)?qu:Xu)(p,1);m.version=x;const f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){const p=r.get(u);if(p){const d=u.index;d!==null&&p.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function vx(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,d){i.drawElements(n,d,r,p*o),e.update(d,n,1)}function l(p,d,g){g!==0&&(i.drawElementsInstanced(n,d,r,p*o,g),e.update(d,n,g))}function h(p,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,p,0,g);let m=0;for(let f=0;f<g;f++)m+=d[f];e.update(m,n,1)}function u(p,d,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<p.length;f++)l(p[f]/o,d[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,r,p,0,x,0,g);let f=0;for(let M=0;M<g;M++)f+=d[M]*x[M];e.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Mx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function yx(i,t,e){const n=new WeakMap,s=new be;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==u){let E=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",E)};p!==void 0&&p.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let _=0;d===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let v=a.attributes.position.count*_,b=1;v>t.maxTextureSize&&(b=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const w=new Float32Array(v*b*4*u),P=new Gu(w,v,b,u);P.type=Cn,P.needsUpdate=!0;const N=_*4;for(let T=0;T<u;T++){const z=m[T],k=f[T],G=M[T],Y=v*b*4*T;for(let C=0;C<z.count;C++){const S=C*N;d===!0&&(s.fromBufferAttribute(z,C),w[Y+S+0]=s.x,w[Y+S+1]=s.y,w[Y+S+2]=s.z,w[Y+S+3]=0),g===!0&&(s.fromBufferAttribute(k,C),w[Y+S+4]=s.x,w[Y+S+5]=s.y,w[Y+S+6]=s.z,w[Y+S+7]=0),x===!0&&(s.fromBufferAttribute(G,C),w[Y+S+8]=s.x,w[Y+S+9]=s.y,w[Y+S+10]=s.z,w[Y+S+11]=G.itemSize===4?s.w:1)}}p={count:u,texture:P,size:new yt(v,b)},n.set(a,p),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let x=0;x<l.length;x++)d+=l[x];const g=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Sx(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const fd=new Be,Dh=new td(1,1),pd=new Gu,md=new lp,gd=new $u,Ih=[],Lh=[],zh=new Float32Array(16),Uh=new Float32Array(9),Nh=new Float32Array(4);function Cs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ih[s];if(r===void 0&&(r=new Float32Array(s),Ih[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function De(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ie(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Co(i,t){let e=Lh[t];e===void 0&&(e=new Int32Array(t),Lh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function wx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2fv(this.addr,t),Ie(e,t)}}function Ex(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(De(e,t))return;i.uniform3fv(this.addr,t),Ie(e,t)}}function Tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4fv(this.addr,t),Ie(e,t)}}function Ax(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ie(e,t)}else{if(De(e,n))return;Nh.set(n),i.uniformMatrix2fv(this.addr,!1,Nh),Ie(e,n)}}function Rx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ie(e,t)}else{if(De(e,n))return;Uh.set(n),i.uniformMatrix3fv(this.addr,!1,Uh),Ie(e,n)}}function Cx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(De(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ie(e,t)}else{if(De(e,n))return;zh.set(n),i.uniformMatrix4fv(this.addr,!1,zh),Ie(e,n)}}function Px(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Dx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2iv(this.addr,t),Ie(e,t)}}function Ix(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3iv(this.addr,t),Ie(e,t)}}function Lx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4iv(this.addr,t),Ie(e,t)}}function zx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ux(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(De(e,t))return;i.uniform2uiv(this.addr,t),Ie(e,t)}}function Nx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(De(e,t))return;i.uniform3uiv(this.addr,t),Ie(e,t)}}function Fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(De(e,t))return;i.uniform4uiv(this.addr,t),Ie(e,t)}}function Ox(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Dh.compareFunction=Bu,r=Dh):r=fd,e.setTexture2D(t||r,s)}function Bx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||md,s)}function kx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||gd,s)}function Gx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||pd,s)}function Vx(i){switch(i){case 5126:return wx;case 35664:return bx;case 35665:return Ex;case 35666:return Tx;case 35674:return Ax;case 35675:return Rx;case 35676:return Cx;case 5124:case 35670:return Px;case 35667:case 35671:return Dx;case 35668:case 35672:return Ix;case 35669:case 35673:return Lx;case 5125:return zx;case 36294:return Ux;case 36295:return Nx;case 36296:return Fx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ox;case 35679:case 36299:case 36307:return Bx;case 35680:case 36300:case 36308:case 36293:return kx;case 36289:case 36303:case 36311:case 36292:return Gx}}function Hx(i,t){i.uniform1fv(this.addr,t)}function Wx(i,t){const e=Cs(t,this.size,2);i.uniform2fv(this.addr,e)}function Xx(i,t){const e=Cs(t,this.size,3);i.uniform3fv(this.addr,e)}function qx(i,t){const e=Cs(t,this.size,4);i.uniform4fv(this.addr,e)}function Yx(i,t){const e=Cs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Zx(i,t){const e=Cs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function $x(i,t){const e=Cs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Kx(i,t){i.uniform1iv(this.addr,t)}function Jx(i,t){i.uniform2iv(this.addr,t)}function jx(i,t){i.uniform3iv(this.addr,t)}function Qx(i,t){i.uniform4iv(this.addr,t)}function t_(i,t){i.uniform1uiv(this.addr,t)}function e_(i,t){i.uniform2uiv(this.addr,t)}function n_(i,t){i.uniform3uiv(this.addr,t)}function i_(i,t){i.uniform4uiv(this.addr,t)}function s_(i,t,e){const n=this.cache,s=t.length,r=Co(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||fd,r[o])}function r_(i,t,e){const n=this.cache,s=t.length,r=Co(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||md,r[o])}function o_(i,t,e){const n=this.cache,s=t.length,r=Co(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||gd,r[o])}function a_(i,t,e){const n=this.cache,s=t.length,r=Co(e,s);De(n,r)||(i.uniform1iv(this.addr,r),Ie(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||pd,r[o])}function c_(i){switch(i){case 5126:return Hx;case 35664:return Wx;case 35665:return Xx;case 35666:return qx;case 35674:return Yx;case 35675:return Zx;case 35676:return $x;case 5124:case 35670:return Kx;case 35667:case 35671:return Jx;case 35668:case 35672:return jx;case 35669:case 35673:return Qx;case 5125:return t_;case 36294:return e_;case 36295:return n_;case 36296:return i_;case 35678:case 36198:case 36298:case 36306:case 35682:return s_;case 35679:case 36299:case 36307:return r_;case 35680:case 36300:case 36308:case 36293:return o_;case 36289:case 36303:case 36311:case 36292:return a_}}class l_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Vx(e.type)}}class h_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=c_(e.type)}}class u_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const wa=/(\w+)(\])?(\[|\.)?/g;function Fh(i,t){i.seq.push(t),i.map[t.id]=t}function d_(i,t,e){const n=i.name,s=n.length;for(wa.lastIndex=0;;){const r=wa.exec(n),o=wa.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Fh(e,l===void 0?new l_(a,i,t):new h_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new u_(a),Fh(e,u)),e=u}}}class lo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);d_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Oh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const f_=37297;let p_=0;function m_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Bh=new qt;function g_(i){se._getMatrix(Bh,se.workingColorSpace,i);const t=`mat3( ${Bh.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(i)){case fo:return[t,"LinearTransferOETF"];case le:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function kh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+m_(i.getShaderSource(t),a)}else return r}function x_(i,t){const e=g_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function __(i,t){let e;switch(t){case Of:e="Linear";break;case Bf:e="Reinhard";break;case kf:e="Cineon";break;case Cu:e="ACESFilmic";break;case Vf:e="AgX";break;case Hf:e="Neutral";break;case Gf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const jr=new L;function v_(){se.getLuminanceCoefficients(jr);const i=jr.x.toFixed(4),t=jr.y.toFixed(4),e=jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function M_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qs).join(`
`)}function y_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function S_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function qs(i){return i!==""}function Gh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const w_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pc(i){return i.replace(w_,E_)}const b_=new Map;function E_(i,t){let e=Kt[t];if(e===void 0){const n=b_.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Pc(e)}const T_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hh(i){return i.replace(T_,A_)}function A_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Wh(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function R_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Tu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Au?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Hn&&(t="SHADOWMAP_TYPE_VSM"),t}function C_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ms:case ys:t="ENVMAP_TYPE_CUBE";break;case Eo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function P_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ys:t="ENVMAP_MODE_REFRACTION";break}return t}function D_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ru:t="ENVMAP_BLENDING_MULTIPLY";break;case Nf:t="ENVMAP_BLENDING_MIX";break;case Ff:t="ENVMAP_BLENDING_ADD";break}return t}function I_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function L_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=R_(e),l=C_(e),h=P_(e),u=D_(e),p=I_(e),d=M_(e),g=y_(r),x=s.createProgram();let m,f,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(qs).join(`
`),f.length>0&&(f+=`
`)):(m=[Wh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qs).join(`
`),f=[Wh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==li?"#define TONE_MAPPING":"",e.toneMapping!==li?Kt.tonemapping_pars_fragment:"",e.toneMapping!==li?__("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,x_("linearToOutputTexel",e.outputColorSpace),v_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(qs).join(`
`)),o=Pc(o),o=Gh(o,e),o=Vh(o,e),a=Pc(a),a=Gh(a,e),a=Vh(a,e),o=Hh(o),a=Hh(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Vl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const _=M+m+o,v=M+f+a,b=Oh(s,s.VERTEX_SHADER,_),w=Oh(s,s.FRAGMENT_SHADER,v);s.attachShader(x,b),s.attachShader(x,w),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(z){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(x)||"",G=s.getShaderInfoLog(b)||"",Y=s.getShaderInfoLog(w)||"",C=k.trim(),S=G.trim(),U=Y.trim();let A=!0,O=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(A=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,b,w);else{const Z=kh(s,b,"vertex"),$=kh(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+C+`
`+Z+`
`+$)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(S===""||U==="")&&(O=!1);O&&(z.diagnostics={runnable:A,programLog:C,vertexShader:{log:S,prefix:m},fragmentShader:{log:U,prefix:f}})}s.deleteShader(b),s.deleteShader(w),N=new lo(s,x),E=S_(s,x)}let N;this.getUniforms=function(){return N===void 0&&P(this),N};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(x,f_)),T},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=p_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=b,this.fragmentShader=w,this}let z_=0;class U_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new N_(t),e.set(t,n)),n}}class N_{constructor(t){this.id=z_++,this.code=t,this.usedTimes=0}}function F_(i,t,e,n,s,r,o){const a=new Hu,c=new U_,l=new Set,h=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let d=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,T,z,k,G){const Y=k.fog,C=G.geometry,S=E.isMeshStandardMaterial?k.environment:null,U=(E.isMeshStandardMaterial?e:t).get(E.envMap||S),A=U&&U.mapping===Eo?U.image.height:null,O=g[E.type];E.precision!==null&&(d=s.getMaxPrecision(E.precision),d!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",d,"instead."));const Z=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,$=Z!==void 0?Z.length:0;let ot=0;C.morphAttributes.position!==void 0&&(ot=1),C.morphAttributes.normal!==void 0&&(ot=2),C.morphAttributes.color!==void 0&&(ot=3);let Rt,It,gt,F;if(O){const re=An[O];Rt=re.vertexShader,It=re.fragmentShader}else Rt=E.vertexShader,It=E.fragmentShader,c.update(E),gt=c.getVertexShaderID(E),F=c.getFragmentShaderID(E);const q=i.getRenderTarget(),Q=i.state.buffers.depth.getReversed(),it=G.isInstancedMesh===!0,nt=G.isBatchedMesh===!0,ft=!!E.map,Et=!!E.matcap,I=!!U,jt=!!E.aoMap,Dt=!!E.lightMap,Lt=!!E.bumpMap,wt=!!E.normalMap,Yt=!!E.displacementMap,_t=!!E.emissiveMap,Ht=!!E.metalnessMap,de=!!E.roughnessMap,ae=E.anisotropy>0,D=E.clearcoat>0,y=E.dispersion>0,W=E.iridescence>0,X=E.sheen>0,tt=E.transmission>0,K=ae&&!!E.anisotropyMap,vt=D&&!!E.clearcoatMap,st=D&&!!E.clearcoatNormalMap,xt=D&&!!E.clearcoatRoughnessMap,Ct=W&&!!E.iridescenceMap,rt=W&&!!E.iridescenceThicknessMap,mt=X&&!!E.sheenColorMap,Ut=X&&!!E.sheenRoughnessMap,Tt=!!E.specularMap,ut=!!E.specularColorMap,Zt=!!E.specularIntensityMap,B=tt&&!!E.transmissionMap,lt=tt&&!!E.thicknessMap,ht=!!E.gradientMap,bt=!!E.alphaMap,at=E.alphaTest>0,et=!!E.alphaHash,Pt=!!E.extensions;let Wt=li;E.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Wt=i.toneMapping);const fe={shaderID:O,shaderType:E.type,shaderName:E.name,vertexShader:Rt,fragmentShader:It,defines:E.defines,customVertexShaderID:gt,customFragmentShaderID:F,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:d,batching:nt,batchingColor:nt&&G._colorsTexture!==null,instancing:it,instancingColor:it&&G.instanceColor!==null,instancingMorph:it&&G.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:q===null?i.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:Ss,alphaToCoverage:!!E.alphaToCoverage,map:ft,matcap:Et,envMap:I,envMapMode:I&&U.mapping,envMapCubeUVHeight:A,aoMap:jt,lightMap:Dt,bumpMap:Lt,normalMap:wt,displacementMap:p&&Yt,emissiveMap:_t,normalMapObjectSpace:wt&&E.normalMapType===Yf,normalMapTangentSpace:wt&&E.normalMapType===Ou,metalnessMap:Ht,roughnessMap:de,anisotropy:ae,anisotropyMap:K,clearcoat:D,clearcoatMap:vt,clearcoatNormalMap:st,clearcoatRoughnessMap:xt,dispersion:y,iridescence:W,iridescenceMap:Ct,iridescenceThicknessMap:rt,sheen:X,sheenColorMap:mt,sheenRoughnessMap:Ut,specularMap:Tt,specularColorMap:ut,specularIntensityMap:Zt,transmission:tt,transmissionMap:B,thicknessMap:lt,gradientMap:ht,opaque:E.transparent===!1&&E.blending===ms&&E.alphaToCoverage===!1,alphaMap:bt,alphaTest:at,alphaHash:et,combine:E.combine,mapUv:ft&&x(E.map.channel),aoMapUv:jt&&x(E.aoMap.channel),lightMapUv:Dt&&x(E.lightMap.channel),bumpMapUv:Lt&&x(E.bumpMap.channel),normalMapUv:wt&&x(E.normalMap.channel),displacementMapUv:Yt&&x(E.displacementMap.channel),emissiveMapUv:_t&&x(E.emissiveMap.channel),metalnessMapUv:Ht&&x(E.metalnessMap.channel),roughnessMapUv:de&&x(E.roughnessMap.channel),anisotropyMapUv:K&&x(E.anisotropyMap.channel),clearcoatMapUv:vt&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:st&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&x(E.sheenRoughnessMap.channel),specularMapUv:Tt&&x(E.specularMap.channel),specularColorMapUv:ut&&x(E.specularColorMap.channel),specularIntensityMapUv:Zt&&x(E.specularIntensityMap.channel),transmissionMapUv:B&&x(E.transmissionMap.channel),thicknessMapUv:lt&&x(E.thicknessMap.channel),alphaMapUv:bt&&x(E.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(wt||ae),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!C.attributes.uv&&(ft||bt),fog:!!Y,useFog:E.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:E.flatShading===!0&&E.wireframe===!1,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Q,skinning:G.isSkinnedMesh===!0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:ot,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Wt,decodeVideoTexture:ft&&E.map.isVideoTexture===!0&&se.getTransfer(E.map.colorSpace)===le,decodeVideoTextureEmissive:_t&&E.emissiveMap.isVideoTexture===!0&&se.getTransfer(E.emissiveMap.colorSpace)===le,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ae,flipSided:E.side===Ze,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Pt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&E.extensions.multiDraw===!0||nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return fe.vertexUv1s=l.has(1),fe.vertexUv2s=l.has(2),fe.vertexUv3s=l.has(3),l.clear(),fe}function f(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const z in E.defines)T.push(z),T.push(E.defines[z]);return E.isRawShaderMaterial===!1&&(M(T,E),_(T,E),T.push(i.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function M(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function _(E,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),E.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),E.push(a.mask)}function v(E){const T=g[E.type];let z;if(T){const k=An[T];z=Sp.clone(k.uniforms)}else z=E.uniforms;return z}function b(E,T){let z;for(let k=0,G=h.length;k<G;k++){const Y=h[k];if(Y.cacheKey===T){z=Y,++z.usedTimes;break}}return z===void 0&&(z=new L_(i,T,E,r),h.push(z)),z}function w(E){if(--E.usedTimes===0){const T=h.indexOf(E);h[T]=h[h.length-1],h.pop(),E.destroy()}}function P(E){c.remove(E)}function N(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:b,releaseProgram:w,releaseShaderCache:P,programs:h,dispose:N}}function O_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function B_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Xh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function qh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,p,d,g,x,m){let f=i[t];return f===void 0?(f={id:u.id,object:u,geometry:p,material:d,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=f):(f.id=u.id,f.object=u,f.geometry=p,f.material=d,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function a(u,p,d,g,x,m){const f=o(u,p,d,g,x,m);d.transmission>0?n.push(f):d.transparent===!0?s.push(f):e.push(f)}function c(u,p,d,g,x,m){const f=o(u,p,d,g,x,m);d.transmission>0?n.unshift(f):d.transparent===!0?s.unshift(f):e.unshift(f)}function l(u,p){e.length>1&&e.sort(u||B_),n.length>1&&n.sort(p||Xh),s.length>1&&s.sort(p||Xh)}function h(){for(let u=t,p=i.length;u<p;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function k_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new qh,i.set(n,[o])):s>=r.length?(o=new qh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function G_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Gt};break;case"SpotLight":e={position:new L,direction:new L,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function V_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let H_=0;function W_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function X_(i){const t=new G_,e=V_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new L);const s=new L,r=new te,o=new te;function a(l){let h=0,u=0,p=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let d=0,g=0,x=0,m=0,f=0,M=0,_=0,v=0,b=0,w=0,P=0;l.sort(W_);for(let E=0,T=l.length;E<T;E++){const z=l[E],k=z.color,G=z.intensity,Y=z.distance,C=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)h+=k.r*G,u+=k.g*G,p+=k.b*G;else if(z.isLightProbe){for(let S=0;S<9;S++)n.probe[S].addScaledVector(z.sh.coefficients[S],G);P++}else if(z.isDirectionalLight){const S=t.get(z);if(S.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const U=z.shadow,A=e.get(z);A.shadowIntensity=U.intensity,A.shadowBias=U.bias,A.shadowNormalBias=U.normalBias,A.shadowRadius=U.radius,A.shadowMapSize=U.mapSize,n.directionalShadow[d]=A,n.directionalShadowMap[d]=C,n.directionalShadowMatrix[d]=z.shadow.matrix,M++}n.directional[d]=S,d++}else if(z.isSpotLight){const S=t.get(z);S.position.setFromMatrixPosition(z.matrixWorld),S.color.copy(k).multiplyScalar(G),S.distance=Y,S.coneCos=Math.cos(z.angle),S.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),S.decay=z.decay,n.spot[x]=S;const U=z.shadow;if(z.map&&(n.spotLightMap[b]=z.map,b++,U.updateMatrices(z),z.castShadow&&w++),n.spotLightMatrix[x]=U.matrix,z.castShadow){const A=e.get(z);A.shadowIntensity=U.intensity,A.shadowBias=U.bias,A.shadowNormalBias=U.normalBias,A.shadowRadius=U.radius,A.shadowMapSize=U.mapSize,n.spotShadow[x]=A,n.spotShadowMap[x]=C,v++}x++}else if(z.isRectAreaLight){const S=t.get(z);S.color.copy(k).multiplyScalar(G),S.halfWidth.set(z.width*.5,0,0),S.halfHeight.set(0,z.height*.5,0),n.rectArea[m]=S,m++}else if(z.isPointLight){const S=t.get(z);if(S.color.copy(z.color).multiplyScalar(z.intensity),S.distance=z.distance,S.decay=z.decay,z.castShadow){const U=z.shadow,A=e.get(z);A.shadowIntensity=U.intensity,A.shadowBias=U.bias,A.shadowNormalBias=U.normalBias,A.shadowRadius=U.radius,A.shadowMapSize=U.mapSize,A.shadowCameraNear=U.camera.near,A.shadowCameraFar=U.camera.far,n.pointShadow[g]=A,n.pointShadowMap[g]=C,n.pointShadowMatrix[g]=z.shadow.matrix,_++}n.point[g]=S,g++}else if(z.isHemisphereLight){const S=t.get(z);S.skyColor.copy(z.color).multiplyScalar(G),S.groundColor.copy(z.groundColor).multiplyScalar(G),n.hemi[f]=S,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pt.LTC_FLOAT_1,n.rectAreaLTC2=pt.LTC_FLOAT_2):(n.rectAreaLTC1=pt.LTC_HALF_1,n.rectAreaLTC2=pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=p;const N=n.hash;(N.directionalLength!==d||N.pointLength!==g||N.spotLength!==x||N.rectAreaLength!==m||N.hemiLength!==f||N.numDirectionalShadows!==M||N.numPointShadows!==_||N.numSpotShadows!==v||N.numSpotMaps!==b||N.numLightProbes!==P)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=P,N.directionalLength=d,N.pointLength=g,N.spotLength=x,N.rectAreaLength=m,N.hemiLength=f,N.numDirectionalShadows=M,N.numPointShadows=_,N.numSpotShadows=v,N.numSpotMaps=b,N.numLightProbes=P,n.version=H_++)}function c(l,h){let u=0,p=0,d=0,g=0,x=0;const m=h.matrixWorldInverse;for(let f=0,M=l.length;f<M;f++){const _=l[f];if(_.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(_.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(_.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(_.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const v=n.point[p];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(m),p++}else if(_.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function Yh(i){const t=new X_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function q_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Yh(i),t.set(s,[a])):r>=o.length?(a=new Yh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Y_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z_=`uniform sampler2D shadow_pass;
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
}`;function $_(i,t,e){let n=new To;const s=new yt,r=new yt,o=new be,a=new mm({depthPacking:qf}),c=new gm,l={},h=e.maxTextureSize,u={[ui]:Ze,[Ze]:ui,[Ae]:Ae},p=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:Y_,fragmentShader:Z_}),d=p.clone();d.defines.HORIZONTAL_PASS=1;const g=new ge;g.setAttribute("position",new ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ee(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tu;let f=this.type;this.render=function(w,P,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),T=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),k=i.state;k.setBlending(ci),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const G=f!==Hn&&this.type===Hn,Y=f===Hn&&this.type!==Hn;for(let C=0,S=w.length;C<S;C++){const U=w[C],A=U.shadow;if(A===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;s.copy(A.mapSize);const O=A.getFrameExtents();if(s.multiply(O),r.copy(A.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/O.x),s.x=r.x*O.x,A.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/O.y),s.y=r.y*O.y,A.mapSize.y=r.y)),A.map===null||G===!0||Y===!0){const $=this.type!==Hn?{minFilter:on,magFilter:on}:{};A.map!==null&&A.map.dispose(),A.map=new Ii(s.x,s.y,$),A.map.texture.name=U.name+".shadowMap",A.camera.updateProjectionMatrix()}i.setRenderTarget(A.map),i.clear();const Z=A.getViewportCount();for(let $=0;$<Z;$++){const ot=A.getViewport($);o.set(r.x*ot.x,r.y*ot.y,r.x*ot.z,r.y*ot.w),k.viewport(o),A.updateMatrices(U,$),n=A.getFrustum(),v(P,N,A.camera,U,this.type)}A.isPointLightShadow!==!0&&this.type===Hn&&M(A,N),A.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,T,z)};function M(w,P){const N=t.update(x);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Ii(s.x,s.y)),p.uniforms.shadow_pass.value=w.map.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(P,null,N,p,x,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(P,null,N,d,x,null)}function _(w,P,N,E){let T=null;const z=N.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(z!==void 0)T=z;else if(T=N.isPointLight===!0?c:a,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const k=T.uuid,G=P.uuid;let Y=l[k];Y===void 0&&(Y={},l[k]=Y);let C=Y[G];C===void 0&&(C=T.clone(),Y[G]=C,P.addEventListener("dispose",b)),T=C}if(T.visible=P.visible,T.wireframe=P.wireframe,E===Hn?T.side=P.shadowSide!==null?P.shadowSide:P.side:T.side=P.shadowSide!==null?P.shadowSide:u[P.side],T.alphaMap=P.alphaMap,T.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,T.map=P.map,T.clipShadows=P.clipShadows,T.clippingPlanes=P.clippingPlanes,T.clipIntersection=P.clipIntersection,T.displacementMap=P.displacementMap,T.displacementScale=P.displacementScale,T.displacementBias=P.displacementBias,T.wireframeLinewidth=P.wireframeLinewidth,T.linewidth=P.linewidth,N.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const k=i.properties.get(T);k.light=N}return T}function v(w,P,N,E,T){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===Hn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,w.matrixWorld);const G=t.update(w),Y=w.material;if(Array.isArray(Y)){const C=G.groups;for(let S=0,U=C.length;S<U;S++){const A=C[S],O=Y[A.materialIndex];if(O&&O.visible){const Z=_(w,O,E,T);w.onBeforeShadow(i,w,P,N,G,Z,A),i.renderBufferDirect(N,null,G,Z,w,A),w.onAfterShadow(i,w,P,N,G,Z,A)}}}else if(Y.visible){const C=_(w,Y,E,T);w.onBeforeShadow(i,w,P,N,G,C,null),i.renderBufferDirect(N,null,G,C,w,null),w.onAfterShadow(i,w,P,N,G,C,null)}}const k=w.children;for(let G=0,Y=k.length;G<Y;G++)v(k[G],P,N,E,T)}function b(w){w.target.removeEventListener("dispose",b);for(const N in l){const E=l[N],T=w.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}const K_={[Ga]:Va,[Ha]:qa,[Wa]:Ya,[vs]:Xa,[Va]:Ga,[qa]:Ha,[Ya]:Wa,[Xa]:vs};function J_(i,t){function e(){let B=!1;const lt=new be;let ht=null;const bt=new be(0,0,0,0);return{setMask:function(at){ht!==at&&!B&&(i.colorMask(at,at,at,at),ht=at)},setLocked:function(at){B=at},setClear:function(at,et,Pt,Wt,fe){fe===!0&&(at*=Wt,et*=Wt,Pt*=Wt),lt.set(at,et,Pt,Wt),bt.equals(lt)===!1&&(i.clearColor(at,et,Pt,Wt),bt.copy(lt))},reset:function(){B=!1,ht=null,bt.set(-1,0,0,0)}}}function n(){let B=!1,lt=!1,ht=null,bt=null,at=null;return{setReversed:function(et){if(lt!==et){const Pt=t.get("EXT_clip_control");et?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),lt=et;const Wt=at;at=null,this.setClear(Wt)}},getReversed:function(){return lt},setTest:function(et){et?q(i.DEPTH_TEST):Q(i.DEPTH_TEST)},setMask:function(et){ht!==et&&!B&&(i.depthMask(et),ht=et)},setFunc:function(et){if(lt&&(et=K_[et]),bt!==et){switch(et){case Ga:i.depthFunc(i.NEVER);break;case Va:i.depthFunc(i.ALWAYS);break;case Ha:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case Wa:i.depthFunc(i.EQUAL);break;case Xa:i.depthFunc(i.GEQUAL);break;case qa:i.depthFunc(i.GREATER);break;case Ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=et}},setLocked:function(et){B=et},setClear:function(et){at!==et&&(lt&&(et=1-et),i.clearDepth(et),at=et)},reset:function(){B=!1,ht=null,bt=null,at=null,lt=!1}}}function s(){let B=!1,lt=null,ht=null,bt=null,at=null,et=null,Pt=null,Wt=null,fe=null;return{setTest:function(re){B||(re?q(i.STENCIL_TEST):Q(i.STENCIL_TEST))},setMask:function(re){lt!==re&&!B&&(i.stencilMask(re),lt=re)},setFunc:function(re,Nn,En){(ht!==re||bt!==Nn||at!==En)&&(i.stencilFunc(re,Nn,En),ht=re,bt=Nn,at=En)},setOp:function(re,Nn,En){(et!==re||Pt!==Nn||Wt!==En)&&(i.stencilOp(re,Nn,En),et=re,Pt=Nn,Wt=En)},setLocked:function(re){B=re},setClear:function(re){fe!==re&&(i.clearStencil(re),fe=re)},reset:function(){B=!1,lt=null,ht=null,bt=null,at=null,et=null,Pt=null,Wt=null,fe=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},p=new WeakMap,d=[],g=null,x=!1,m=null,f=null,M=null,_=null,v=null,b=null,w=null,P=new Gt(0,0,0),N=0,E=!1,T=null,z=null,k=null,G=null,Y=null;const C=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let S=!1,U=0;const A=i.getParameter(i.VERSION);A.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(A)[1]),S=U>=1):A.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(A)[1]),S=U>=2);let O=null,Z={};const $=i.getParameter(i.SCISSOR_BOX),ot=i.getParameter(i.VIEWPORT),Rt=new be().fromArray($),It=new be().fromArray(ot);function gt(B,lt,ht,bt){const at=new Uint8Array(4),et=i.createTexture();i.bindTexture(B,et),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<ht;Pt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(lt+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return et}const F={};F[i.TEXTURE_2D]=gt(i.TEXTURE_2D,i.TEXTURE_2D,1),F[i.TEXTURE_CUBE_MAP]=gt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),F[i.TEXTURE_2D_ARRAY]=gt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),F[i.TEXTURE_3D]=gt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),q(i.DEPTH_TEST),o.setFunc(vs),Lt(!1),wt(Fl),q(i.CULL_FACE),jt(ci);function q(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function Q(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function it(B,lt){return u[B]!==lt?(i.bindFramebuffer(B,lt),u[B]=lt,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=lt),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function nt(B,lt){let ht=d,bt=!1;if(B){ht=p.get(lt),ht===void 0&&(ht=[],p.set(lt,ht));const at=B.textures;if(ht.length!==at.length||ht[0]!==i.COLOR_ATTACHMENT0){for(let et=0,Pt=at.length;et<Pt;et++)ht[et]=i.COLOR_ATTACHMENT0+et;ht.length=at.length,bt=!0}}else ht[0]!==i.BACK&&(ht[0]=i.BACK,bt=!0);bt&&i.drawBuffers(ht)}function ft(B){return g!==B?(i.useProgram(B),g=B,!0):!1}const Et={[bi]:i.FUNC_ADD,[vf]:i.FUNC_SUBTRACT,[Mf]:i.FUNC_REVERSE_SUBTRACT};Et[yf]=i.MIN,Et[Sf]=i.MAX;const I={[wf]:i.ZERO,[bf]:i.ONE,[Ef]:i.SRC_COLOR,[Ba]:i.SRC_ALPHA,[Df]:i.SRC_ALPHA_SATURATE,[Cf]:i.DST_COLOR,[Af]:i.DST_ALPHA,[Tf]:i.ONE_MINUS_SRC_COLOR,[ka]:i.ONE_MINUS_SRC_ALPHA,[Pf]:i.ONE_MINUS_DST_COLOR,[Rf]:i.ONE_MINUS_DST_ALPHA,[If]:i.CONSTANT_COLOR,[Lf]:i.ONE_MINUS_CONSTANT_COLOR,[zf]:i.CONSTANT_ALPHA,[Uf]:i.ONE_MINUS_CONSTANT_ALPHA};function jt(B,lt,ht,bt,at,et,Pt,Wt,fe,re){if(B===ci){x===!0&&(Q(i.BLEND),x=!1);return}if(x===!1&&(q(i.BLEND),x=!0),B!==_f){if(B!==m||re!==E){if((f!==bi||v!==bi)&&(i.blendEquation(i.FUNC_ADD),f=bi,v=bi),re)switch(B){case ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFunc(i.ONE,i.ONE);break;case Bl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ol:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Bl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}M=null,_=null,b=null,w=null,P.set(0,0,0),N=0,m=B,E=re}return}at=at||lt,et=et||ht,Pt=Pt||bt,(lt!==f||at!==v)&&(i.blendEquationSeparate(Et[lt],Et[at]),f=lt,v=at),(ht!==M||bt!==_||et!==b||Pt!==w)&&(i.blendFuncSeparate(I[ht],I[bt],I[et],I[Pt]),M=ht,_=bt,b=et,w=Pt),(Wt.equals(P)===!1||fe!==N)&&(i.blendColor(Wt.r,Wt.g,Wt.b,fe),P.copy(Wt),N=fe),m=B,E=!1}function Dt(B,lt){B.side===Ae?Q(i.CULL_FACE):q(i.CULL_FACE);let ht=B.side===Ze;lt&&(ht=!ht),Lt(ht),B.blending===ms&&B.transparent===!1?jt(ci):jt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const bt=B.stencilWrite;a.setTest(bt),bt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),_t(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?q(i.SAMPLE_ALPHA_TO_COVERAGE):Q(i.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(B){T!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),T=B)}function wt(B){B!==gf?(q(i.CULL_FACE),B!==z&&(B===Fl?i.cullFace(i.BACK):B===xf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Q(i.CULL_FACE),z=B}function Yt(B){B!==k&&(S&&i.lineWidth(B),k=B)}function _t(B,lt,ht){B?(q(i.POLYGON_OFFSET_FILL),(G!==lt||Y!==ht)&&(i.polygonOffset(lt,ht),G=lt,Y=ht)):Q(i.POLYGON_OFFSET_FILL)}function Ht(B){B?q(i.SCISSOR_TEST):Q(i.SCISSOR_TEST)}function de(B){B===void 0&&(B=i.TEXTURE0+C-1),O!==B&&(i.activeTexture(B),O=B)}function ae(B,lt,ht){ht===void 0&&(O===null?ht=i.TEXTURE0+C-1:ht=O);let bt=Z[ht];bt===void 0&&(bt={type:void 0,texture:void 0},Z[ht]=bt),(bt.type!==B||bt.texture!==lt)&&(O!==ht&&(i.activeTexture(ht),O=ht),i.bindTexture(B,lt||F[B]),bt.type=B,bt.texture=lt)}function D(){const B=Z[O];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function y(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function X(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function tt(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function vt(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function st(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xt(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function rt(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function mt(B){Rt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),Rt.copy(B))}function Ut(B){It.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),It.copy(B))}function Tt(B,lt){let ht=l.get(lt);ht===void 0&&(ht=new WeakMap,l.set(lt,ht));let bt=ht.get(B);bt===void 0&&(bt=i.getUniformBlockIndex(lt,B.name),ht.set(B,bt))}function ut(B,lt){const bt=l.get(lt).get(B);c.get(lt)!==bt&&(i.uniformBlockBinding(lt,bt,B.__bindingPointIndex),c.set(lt,bt))}function Zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},O=null,Z={},u={},p=new WeakMap,d=[],g=null,x=!1,m=null,f=null,M=null,_=null,v=null,b=null,w=null,P=new Gt(0,0,0),N=0,E=!1,T=null,z=null,k=null,G=null,Y=null,Rt.set(0,0,i.canvas.width,i.canvas.height),It.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:q,disable:Q,bindFramebuffer:it,drawBuffers:nt,useProgram:ft,setBlending:jt,setMaterial:Dt,setFlipSided:Lt,setCullFace:wt,setLineWidth:Yt,setPolygonOffset:_t,setScissorTest:Ht,activeTexture:de,bindTexture:ae,unbindTexture:D,compressedTexImage2D:y,compressedTexImage3D:W,texImage2D:Ct,texImage3D:rt,updateUBOMapping:Tt,uniformBlockBinding:ut,texStorage2D:st,texStorage3D:xt,texSubImage2D:X,texSubImage3D:tt,compressedTexSubImage2D:K,compressedTexSubImage3D:vt,scissor:mt,viewport:Ut,reset:Zt}}function j_(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new yt,h=new WeakMap;let u;const p=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,y){return d?new OffscreenCanvas(D,y):mo("canvas")}function x(D,y,W){let X=1;const tt=ae(D);if((tt.width>W||tt.height>W)&&(X=W/Math.max(tt.width,tt.height)),X<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const K=Math.floor(X*tt.width),vt=Math.floor(X*tt.height);u===void 0&&(u=g(K,vt));const st=y?g(K,vt):u;return st.width=K,st.height=vt,st.getContext("2d").drawImage(D,0,0,K,vt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+K+"x"+vt+")."),st}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),D;return D}function m(D){return D.generateMipmaps}function f(D){i.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(D,y,W,X,tt=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let K=y;if(y===i.RED&&(W===i.FLOAT&&(K=i.R32F),W===i.HALF_FLOAT&&(K=i.R16F),W===i.UNSIGNED_BYTE&&(K=i.R8)),y===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.R8UI),W===i.UNSIGNED_SHORT&&(K=i.R16UI),W===i.UNSIGNED_INT&&(K=i.R32UI),W===i.BYTE&&(K=i.R8I),W===i.SHORT&&(K=i.R16I),W===i.INT&&(K=i.R32I)),y===i.RG&&(W===i.FLOAT&&(K=i.RG32F),W===i.HALF_FLOAT&&(K=i.RG16F),W===i.UNSIGNED_BYTE&&(K=i.RG8)),y===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.RG8UI),W===i.UNSIGNED_SHORT&&(K=i.RG16UI),W===i.UNSIGNED_INT&&(K=i.RG32UI),W===i.BYTE&&(K=i.RG8I),W===i.SHORT&&(K=i.RG16I),W===i.INT&&(K=i.RG32I)),y===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.RGB8UI),W===i.UNSIGNED_SHORT&&(K=i.RGB16UI),W===i.UNSIGNED_INT&&(K=i.RGB32UI),W===i.BYTE&&(K=i.RGB8I),W===i.SHORT&&(K=i.RGB16I),W===i.INT&&(K=i.RGB32I)),y===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),W===i.UNSIGNED_INT&&(K=i.RGBA32UI),W===i.BYTE&&(K=i.RGBA8I),W===i.SHORT&&(K=i.RGBA16I),W===i.INT&&(K=i.RGBA32I)),y===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),y===i.RGBA){const vt=tt?fo:se.getTransfer(X);W===i.FLOAT&&(K=i.RGBA32F),W===i.HALF_FLOAT&&(K=i.RGBA16F),W===i.UNSIGNED_BYTE&&(K=vt===le?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(D,y){let W;return D?y===null||y===Di||y===sr?W=i.DEPTH24_STENCIL8:y===Cn?W=i.DEPTH32F_STENCIL8:y===ir&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Di||y===sr?W=i.DEPTH_COMPONENT24:y===Cn?W=i.DEPTH_COMPONENT32F:y===ir&&(W=i.DEPTH_COMPONENT16),W}function b(D,y){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==on&&D.minFilter!==Mn?Math.log2(Math.max(y.width,y.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?y.mipmaps.length:1}function w(D){const y=D.target;y.removeEventListener("dispose",w),N(y),y.isVideoTexture&&h.delete(y)}function P(D){const y=D.target;y.removeEventListener("dispose",P),T(y)}function N(D){const y=n.get(D);if(y.__webglInit===void 0)return;const W=D.source,X=p.get(W);if(X){const tt=X[y.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&E(D),Object.keys(X).length===0&&p.delete(W)}n.remove(D)}function E(D){const y=n.get(D);i.deleteTexture(y.__webglTexture);const W=D.source,X=p.get(W);delete X[y.__cacheKey],o.memory.textures--}function T(D){const y=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let tt=0;tt<y.__webglFramebuffer[X].length;tt++)i.deleteFramebuffer(y.__webglFramebuffer[X][tt]);else i.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)i.deleteFramebuffer(y.__webglFramebuffer[X]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const W=D.textures;for(let X=0,tt=W.length;X<tt;X++){const K=n.get(W[X]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(W[X])}n.remove(D)}let z=0;function k(){z=0}function G(){const D=z;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),z+=1,D}function Y(D){const y=[];return y.push(D.wrapS),y.push(D.wrapT),y.push(D.wrapR||0),y.push(D.magFilter),y.push(D.minFilter),y.push(D.anisotropy),y.push(D.internalFormat),y.push(D.format),y.push(D.type),y.push(D.generateMipmaps),y.push(D.premultiplyAlpha),y.push(D.flipY),y.push(D.unpackAlignment),y.push(D.colorSpace),y.join()}function C(D,y){const W=n.get(D);if(D.isVideoTexture&&Ht(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&W.__version!==D.version){const X=D.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{F(W,D,y);return}}else D.isExternalTexture&&(W.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+y)}function S(D,y){const W=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&W.__version!==D.version){F(W,D,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+y)}function U(D,y){const W=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&W.__version!==D.version){F(W,D,y);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+y)}function A(D,y){const W=n.get(D);if(D.version>0&&W.__version!==D.version){q(W,D,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+y)}const O={[Zn]:i.REPEAT,[Ti]:i.CLAMP_TO_EDGE,[Ka]:i.MIRRORED_REPEAT},Z={[on]:i.NEAREST,[Wf]:i.NEAREST_MIPMAP_NEAREST,[Sr]:i.NEAREST_MIPMAP_LINEAR,[Mn]:i.LINEAR,[ko]:i.LINEAR_MIPMAP_NEAREST,[Ai]:i.LINEAR_MIPMAP_LINEAR},$={[Zf]:i.NEVER,[tp]:i.ALWAYS,[$f]:i.LESS,[Bu]:i.LEQUAL,[Kf]:i.EQUAL,[Qf]:i.GEQUAL,[Jf]:i.GREATER,[jf]:i.NOTEQUAL};function ot(D,y){if(y.type===Cn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Mn||y.magFilter===ko||y.magFilter===Sr||y.magFilter===Ai||y.minFilter===Mn||y.minFilter===ko||y.minFilter===Sr||y.minFilter===Ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,O[y.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,O[y.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,O[y.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Z[y.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Z[y.minFilter]),y.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,$[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===on||y.minFilter!==Sr&&y.minFilter!==Ai||y.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Rt(D,y){let W=!1;D.__webglInit===void 0&&(D.__webglInit=!0,y.addEventListener("dispose",w));const X=y.source;let tt=p.get(X);tt===void 0&&(tt={},p.set(X,tt));const K=Y(y);if(K!==D.__cacheKey){tt[K]===void 0&&(tt[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),tt[K].usedTimes++;const vt=tt[D.__cacheKey];vt!==void 0&&(tt[D.__cacheKey].usedTimes--,vt.usedTimes===0&&E(y)),D.__cacheKey=K,D.__webglTexture=tt[K].texture}return W}function It(D,y,W){return Math.floor(Math.floor(D/W)/y)}function gt(D,y,W,X){const K=D.updateRanges;if(K.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,W,X,y.data);else{K.sort((rt,mt)=>rt.start-mt.start);let vt=0;for(let rt=1;rt<K.length;rt++){const mt=K[vt],Ut=K[rt],Tt=mt.start+mt.count,ut=It(Ut.start,y.width,4),Zt=It(mt.start,y.width,4);Ut.start<=Tt+1&&ut===Zt&&It(Ut.start+Ut.count-1,y.width,4)===ut?mt.count=Math.max(mt.count,Ut.start+Ut.count-mt.start):(++vt,K[vt]=Ut)}K.length=vt+1;const st=i.getParameter(i.UNPACK_ROW_LENGTH),xt=i.getParameter(i.UNPACK_SKIP_PIXELS),Ct=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let rt=0,mt=K.length;rt<mt;rt++){const Ut=K[rt],Tt=Math.floor(Ut.start/4),ut=Math.ceil(Ut.count/4),Zt=Tt%y.width,B=Math.floor(Tt/y.width),lt=ut,ht=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Zt),i.pixelStorei(i.UNPACK_SKIP_ROWS,B),e.texSubImage2D(i.TEXTURE_2D,0,Zt,B,lt,ht,W,X,y.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,st),i.pixelStorei(i.UNPACK_SKIP_PIXELS,xt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ct)}}function F(D,y,W){let X=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=i.TEXTURE_3D);const tt=Rt(D,y),K=y.source;e.bindTexture(X,D.__webglTexture,i.TEXTURE0+W);const vt=n.get(K);if(K.version!==vt.__version||tt===!0){e.activeTexture(i.TEXTURE0+W);const st=se.getPrimaries(se.workingColorSpace),xt=y.colorSpace===ri?null:se.getPrimaries(y.colorSpace),Ct=y.colorSpace===ri||st===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let rt=x(y.image,!1,s.maxTextureSize);rt=de(y,rt);const mt=r.convert(y.format,y.colorSpace),Ut=r.convert(y.type);let Tt=_(y.internalFormat,mt,Ut,y.colorSpace,y.isVideoTexture);ot(X,y);let ut;const Zt=y.mipmaps,B=y.isVideoTexture!==!0,lt=vt.__version===void 0||tt===!0,ht=K.dataReady,bt=b(y,rt);if(y.isDepthTexture)Tt=v(y.format===or,y.type),lt&&(B?e.texStorage2D(i.TEXTURE_2D,1,Tt,rt.width,rt.height):e.texImage2D(i.TEXTURE_2D,0,Tt,rt.width,rt.height,0,mt,Ut,null));else if(y.isDataTexture)if(Zt.length>0){B&&lt&&e.texStorage2D(i.TEXTURE_2D,bt,Tt,Zt[0].width,Zt[0].height);for(let at=0,et=Zt.length;at<et;at++)ut=Zt[at],B?ht&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,ut.width,ut.height,mt,Ut,ut.data):e.texImage2D(i.TEXTURE_2D,at,Tt,ut.width,ut.height,0,mt,Ut,ut.data);y.generateMipmaps=!1}else B?(lt&&e.texStorage2D(i.TEXTURE_2D,bt,Tt,rt.width,rt.height),ht&&gt(y,rt,mt,Ut)):e.texImage2D(i.TEXTURE_2D,0,Tt,rt.width,rt.height,0,mt,Ut,rt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){B&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,bt,Tt,Zt[0].width,Zt[0].height,rt.depth);for(let at=0,et=Zt.length;at<et;at++)if(ut=Zt[at],y.format!==yn)if(mt!==null)if(B){if(ht)if(y.layerUpdates.size>0){const Pt=wh(ut.width,ut.height,y.format,y.type);for(const Wt of y.layerUpdates){const fe=ut.data.subarray(Wt*Pt/ut.data.BYTES_PER_ELEMENT,(Wt+1)*Pt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,Wt,ut.width,ut.height,1,mt,fe)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,ut.width,ut.height,rt.depth,mt,ut.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,at,Tt,ut.width,ut.height,rt.depth,0,ut.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?ht&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,at,0,0,0,ut.width,ut.height,rt.depth,mt,Ut,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,at,Tt,ut.width,ut.height,rt.depth,0,mt,Ut,ut.data)}else{B&&lt&&e.texStorage2D(i.TEXTURE_2D,bt,Tt,Zt[0].width,Zt[0].height);for(let at=0,et=Zt.length;at<et;at++)ut=Zt[at],y.format!==yn?mt!==null?B?ht&&e.compressedTexSubImage2D(i.TEXTURE_2D,at,0,0,ut.width,ut.height,mt,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,at,Tt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?ht&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,ut.width,ut.height,mt,Ut,ut.data):e.texImage2D(i.TEXTURE_2D,at,Tt,ut.width,ut.height,0,mt,Ut,ut.data)}else if(y.isDataArrayTexture)if(B){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,bt,Tt,rt.width,rt.height,rt.depth),ht)if(y.layerUpdates.size>0){const at=wh(rt.width,rt.height,y.format,y.type);for(const et of y.layerUpdates){const Pt=rt.data.subarray(et*at/rt.data.BYTES_PER_ELEMENT,(et+1)*at/rt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,et,rt.width,rt.height,1,mt,Ut,Pt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,rt.width,rt.height,rt.depth,mt,Ut,rt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Tt,rt.width,rt.height,rt.depth,0,mt,Ut,rt.data);else if(y.isData3DTexture)B?(lt&&e.texStorage3D(i.TEXTURE_3D,bt,Tt,rt.width,rt.height,rt.depth),ht&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,rt.width,rt.height,rt.depth,mt,Ut,rt.data)):e.texImage3D(i.TEXTURE_3D,0,Tt,rt.width,rt.height,rt.depth,0,mt,Ut,rt.data);else if(y.isFramebufferTexture){if(lt)if(B)e.texStorage2D(i.TEXTURE_2D,bt,Tt,rt.width,rt.height);else{let at=rt.width,et=rt.height;for(let Pt=0;Pt<bt;Pt++)e.texImage2D(i.TEXTURE_2D,Pt,Tt,at,et,0,mt,Ut,null),at>>=1,et>>=1}}else if(Zt.length>0){if(B&&lt){const at=ae(Zt[0]);e.texStorage2D(i.TEXTURE_2D,bt,Tt,at.width,at.height)}for(let at=0,et=Zt.length;at<et;at++)ut=Zt[at],B?ht&&e.texSubImage2D(i.TEXTURE_2D,at,0,0,mt,Ut,ut):e.texImage2D(i.TEXTURE_2D,at,Tt,mt,Ut,ut);y.generateMipmaps=!1}else if(B){if(lt){const at=ae(rt);e.texStorage2D(i.TEXTURE_2D,bt,Tt,at.width,at.height)}ht&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Ut,rt)}else e.texImage2D(i.TEXTURE_2D,0,Tt,mt,Ut,rt);m(y)&&f(X),vt.__version=K.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function q(D,y,W){if(y.image.length!==6)return;const X=Rt(D,y),tt=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+W);const K=n.get(tt);if(tt.version!==K.__version||X===!0){e.activeTexture(i.TEXTURE0+W);const vt=se.getPrimaries(se.workingColorSpace),st=y.colorSpace===ri?null:se.getPrimaries(y.colorSpace),xt=y.colorSpace===ri||vt===st?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);const Ct=y.isCompressedTexture||y.image[0].isCompressedTexture,rt=y.image[0]&&y.image[0].isDataTexture,mt=[];for(let et=0;et<6;et++)!Ct&&!rt?mt[et]=x(y.image[et],!0,s.maxCubemapSize):mt[et]=rt?y.image[et].image:y.image[et],mt[et]=de(y,mt[et]);const Ut=mt[0],Tt=r.convert(y.format,y.colorSpace),ut=r.convert(y.type),Zt=_(y.internalFormat,Tt,ut,y.colorSpace),B=y.isVideoTexture!==!0,lt=K.__version===void 0||X===!0,ht=tt.dataReady;let bt=b(y,Ut);ot(i.TEXTURE_CUBE_MAP,y);let at;if(Ct){B&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Zt,Ut.width,Ut.height);for(let et=0;et<6;et++){at=mt[et].mipmaps;for(let Pt=0;Pt<at.length;Pt++){const Wt=at[Pt];y.format!==yn?Tt!==null?B?ht&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,0,0,Wt.width,Wt.height,Tt,Wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,Zt,Wt.width,Wt.height,0,Wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,0,0,Wt.width,Wt.height,Tt,ut,Wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt,Zt,Wt.width,Wt.height,0,Tt,ut,Wt.data)}}}else{if(at=y.mipmaps,B&&lt){at.length>0&&bt++;const et=ae(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,bt,Zt,et.width,et.height)}for(let et=0;et<6;et++)if(rt){B?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,mt[et].width,mt[et].height,Tt,ut,mt[et].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Zt,mt[et].width,mt[et].height,0,Tt,ut,mt[et].data);for(let Pt=0;Pt<at.length;Pt++){const fe=at[Pt].image[et].image;B?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,0,0,fe.width,fe.height,Tt,ut,fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,Zt,fe.width,fe.height,0,Tt,ut,fe.data)}}else{B?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,Tt,ut,mt[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Zt,Tt,ut,mt[et]);for(let Pt=0;Pt<at.length;Pt++){const Wt=at[Pt];B?ht&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,0,0,Tt,ut,Wt.image[et]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+et,Pt+1,Zt,Tt,ut,Wt.image[et])}}}m(y)&&f(i.TEXTURE_CUBE_MAP),K.__version=tt.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function Q(D,y,W,X,tt,K){const vt=r.convert(W.format,W.colorSpace),st=r.convert(W.type),xt=_(W.internalFormat,vt,st,W.colorSpace),Ct=n.get(y),rt=n.get(W);if(rt.__renderTarget=y,!Ct.__hasExternalTextures){const mt=Math.max(1,y.width>>K),Ut=Math.max(1,y.height>>K);tt===i.TEXTURE_3D||tt===i.TEXTURE_2D_ARRAY?e.texImage3D(tt,K,xt,mt,Ut,y.depth,0,vt,st,null):e.texImage2D(tt,K,xt,mt,Ut,0,vt,st,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),_t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,tt,rt.__webglTexture,0,Yt(y)):(tt===i.TEXTURE_2D||tt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,tt,rt.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function it(D,y,W){if(i.bindRenderbuffer(i.RENDERBUFFER,D),y.depthBuffer){const X=y.depthTexture,tt=X&&X.isDepthTexture?X.type:null,K=v(y.stencilBuffer,tt),vt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=Yt(y);_t(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st,K,y.width,y.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,st,K,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,K,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,vt,i.RENDERBUFFER,D)}else{const X=y.textures;for(let tt=0;tt<X.length;tt++){const K=X[tt],vt=r.convert(K.format,K.colorSpace),st=r.convert(K.type),xt=_(K.internalFormat,vt,st,K.colorSpace),Ct=Yt(y);W&&_t(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,xt,y.width,y.height):_t(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ct,xt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,xt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function nt(D,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(y.depthTexture);X.__renderTarget=y,(!X.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),C(y.depthTexture,0);const tt=X.__webglTexture,K=Yt(y);if(y.depthTexture.format===rr)_t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,tt,0);else if(y.depthTexture.format===or)_t(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function ft(D){const y=n.get(D),W=D.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==D.depthTexture){const X=D.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){const tt=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",tt)};X.addEventListener("dispose",tt),y.__depthDisposeCallback=tt}y.__boundDepthTexture=X}if(D.depthTexture&&!y.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const X=D.texture.mipmaps;X&&X.length>0?nt(y.__webglFramebuffer[0],D):nt(y.__webglFramebuffer,D)}else if(W){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=i.createRenderbuffer(),it(y.__webglDepthbuffer[X],D,!1);else{const tt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,K)}}else{const X=D.texture.mipmaps;if(X&&X.length>0?e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),it(y.__webglDepthbuffer,D,!1);else{const tt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,tt,i.RENDERBUFFER,K)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Et(D,y,W){const X=n.get(D);y!==void 0&&Q(X.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&ft(D)}function I(D){const y=D.texture,W=n.get(D),X=n.get(y);D.addEventListener("dispose",P);const tt=D.textures,K=D.isWebGLCubeRenderTarget===!0,vt=tt.length>1;if(vt||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=y.version,o.memory.textures++),K){W.__webglFramebuffer=[];for(let st=0;st<6;st++)if(y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer[st]=[];for(let xt=0;xt<y.mipmaps.length;xt++)W.__webglFramebuffer[st][xt]=i.createFramebuffer()}else W.__webglFramebuffer[st]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){W.__webglFramebuffer=[];for(let st=0;st<y.mipmaps.length;st++)W.__webglFramebuffer[st]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(vt)for(let st=0,xt=tt.length;st<xt;st++){const Ct=n.get(tt[st]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&_t(D)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let st=0;st<tt.length;st++){const xt=tt[st];W.__webglColorRenderbuffer[st]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[st]);const Ct=r.convert(xt.format,xt.colorSpace),rt=r.convert(xt.type),mt=_(xt.internalFormat,Ct,rt,xt.colorSpace,D.isXRRenderTarget===!0),Ut=Yt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,mt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+st,i.RENDERBUFFER,W.__webglColorRenderbuffer[st])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),it(W.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),ot(i.TEXTURE_CUBE_MAP,y);for(let st=0;st<6;st++)if(y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)Q(W.__webglFramebuffer[st][xt],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,xt);else Q(W.__webglFramebuffer[st],D,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);m(y)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let st=0,xt=tt.length;st<xt;st++){const Ct=tt[st],rt=n.get(Ct);let mt=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(mt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,rt.__webglTexture),ot(mt,Ct),Q(W.__webglFramebuffer,D,Ct,i.COLOR_ATTACHMENT0+st,mt,0),m(Ct)&&f(mt)}e.unbindTexture()}else{let st=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(st=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(st,X.__webglTexture),ot(st,y),y.mipmaps&&y.mipmaps.length>0)for(let xt=0;xt<y.mipmaps.length;xt++)Q(W.__webglFramebuffer[xt],D,y,i.COLOR_ATTACHMENT0,st,xt);else Q(W.__webglFramebuffer,D,y,i.COLOR_ATTACHMENT0,st,0);m(y)&&f(st),e.unbindTexture()}D.depthBuffer&&ft(D)}function jt(D){const y=D.textures;for(let W=0,X=y.length;W<X;W++){const tt=y[W];if(m(tt)){const K=M(D),vt=n.get(tt).__webglTexture;e.bindTexture(K,vt),f(K),e.unbindTexture()}}}const Dt=[],Lt=[];function wt(D){if(D.samples>0){if(_t(D)===!1){const y=D.textures,W=D.width,X=D.height;let tt=i.COLOR_BUFFER_BIT;const K=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,vt=n.get(D),st=y.length>1;if(st)for(let Ct=0;Ct<y.length;Ct++)e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);const xt=D.texture.mipmaps;xt&&xt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Ct=0;Ct<y.length;Ct++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(tt|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(tt|=i.STENCIL_BUFFER_BIT)),st){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,vt.__webglColorRenderbuffer[Ct]);const rt=n.get(y[Ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,rt,0)}i.blitFramebuffer(0,0,W,X,0,0,W,X,tt,i.NEAREST),c===!0&&(Dt.length=0,Lt.length=0,Dt.push(i.COLOR_ATTACHMENT0+Ct),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Dt.push(K),Lt.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Lt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Dt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),st)for(let Ct=0;Ct<y.length;Ct++){e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,vt.__webglColorRenderbuffer[Ct]);const rt=n.get(y[Ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,vt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const y=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Yt(D){return Math.min(s.maxSamples,D.samples)}function _t(D){const y=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ht(D){const y=o.render.frame;h.get(D)!==y&&(h.set(D,y),D.update())}function de(D,y){const W=D.colorSpace,X=D.format,tt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||W!==Ss&&W!==ri&&(se.getTransfer(W)===le?(X!==yn||tt!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),y}function ae(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=G,this.resetTextureUnits=k,this.setTexture2D=C,this.setTexture2DArray=S,this.setTexture3D=U,this.setTextureCube=A,this.rebindTextures=Et,this.setupRenderTarget=I,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=ft,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=_t}function Q_(i,t){function e(n,s=ri){let r;const o=se.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===qc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Lu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Du)return i.BYTE;if(n===Iu)return i.SHORT;if(n===ir)return i.UNSIGNED_SHORT;if(n===Xc)return i.INT;if(n===Di)return i.UNSIGNED_INT;if(n===Cn)return i.FLOAT;if(n===xr)return i.HALF_FLOAT;if(n===Uu)return i.ALPHA;if(n===Nu)return i.RGB;if(n===yn)return i.RGBA;if(n===rr)return i.DEPTH_COMPONENT;if(n===or)return i.DEPTH_STENCIL;if(n===Zc)return i.RED;if(n===$c)return i.RED_INTEGER;if(n===Fu)return i.RG;if(n===Kc)return i.RG_INTEGER;if(n===Jc)return i.RGBA_INTEGER;if(n===ro||n===oo||n===ao||n===co)if(o===le)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ja||n===ja||n===Qa||n===tc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ja)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===tc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ec||n===nc||n===ic)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ec||n===nc)return o===le?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ic)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sc||n===rc||n===oc||n===ac||n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===xc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===sc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===rc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ac)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===lc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===hc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===uc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===dc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===fc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===pc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===mc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===gc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xc)return o===le?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===_c||n===vc||n===Mc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===_c)return o===le?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Mc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yc||n===Sc||n===wc||n===bc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===yc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Sc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===sr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const tv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ev=`
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

}`;class nv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new ed(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new di({vertexShader:tv,fragmentShader:ev,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new _r(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class iv extends As{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,p=null,d=null,g=null;const x=typeof XRWebGLBinding<"u",m=new nv,f={},M=e.getContextAttributes();let _=null,v=null;const b=[],w=[],P=new yt;let N=null;const E=new vn;E.viewport=new be;const T=new vn;T.viewport=new be;const z=[E,T],k=new ym;let G=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let q=b[F];return q===void 0&&(q=new la,b[F]=q),q.getTargetRaySpace()},this.getControllerGrip=function(F){let q=b[F];return q===void 0&&(q=new la,b[F]=q),q.getGripSpace()},this.getHand=function(F){let q=b[F];return q===void 0&&(q=new la,b[F]=q),q.getHandSpace()};function C(F){const q=w.indexOf(F.inputSource);if(q===-1)return;const Q=b[q];Q!==void 0&&(Q.update(F.inputSource,F.frame,l||o),Q.dispatchEvent({type:F.type,data:F.inputSource}))}function S(){s.removeEventListener("select",C),s.removeEventListener("selectstart",C),s.removeEventListener("selectend",C),s.removeEventListener("squeeze",C),s.removeEventListener("squeezestart",C),s.removeEventListener("squeezeend",C),s.removeEventListener("end",S),s.removeEventListener("inputsourceschange",U);for(let F=0;F<b.length;F++){const q=w[F];q!==null&&(w[F]=null,b[F].disconnect(q))}G=null,Y=null,m.reset();for(const F in f)delete f[F];t.setRenderTarget(_),d=null,p=null,u=null,s=null,v=null,gt.stop(),n.isPresenting=!1,t.setPixelRatio(N),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){r=F,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){a=F,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(F){l=F},this.getBaseLayer=function(){return p!==null?p:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(F){if(s=F,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",C),s.addEventListener("selectstart",C),s.addEventListener("selectend",C),s.addEventListener("squeeze",C),s.addEventListener("squeezestart",C),s.addEventListener("squeezeend",C),s.addEventListener("end",S),s.addEventListener("inputsourceschange",U),M.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Q=null,it=null,nt=null;M.depth&&(nt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Q=M.stencil?or:rr,it=M.stencil?sr:Di);const ft={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(ft),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),v=new Ii(p.textureWidth,p.textureHeight,{format:yn,type:Ln,depthTexture:new td(p.textureWidth,p.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const Q={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,Q),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Ii(d.framebufferWidth,d.framebufferHeight,{format:yn,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),gt.setContext(s),gt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(F){for(let q=0;q<F.removed.length;q++){const Q=F.removed[q],it=w.indexOf(Q);it>=0&&(w[it]=null,b[it].disconnect(Q))}for(let q=0;q<F.added.length;q++){const Q=F.added[q];let it=w.indexOf(Q);if(it===-1){for(let ft=0;ft<b.length;ft++)if(ft>=w.length){w.push(Q),it=ft;break}else if(w[ft]===null){w[ft]=Q,it=ft;break}if(it===-1)break}const nt=b[it];nt&&nt.connect(Q)}}const A=new L,O=new L;function Z(F,q,Q){A.setFromMatrixPosition(q.matrixWorld),O.setFromMatrixPosition(Q.matrixWorld);const it=A.distanceTo(O),nt=q.projectionMatrix.elements,ft=Q.projectionMatrix.elements,Et=nt[14]/(nt[10]-1),I=nt[14]/(nt[10]+1),jt=(nt[9]+1)/nt[5],Dt=(nt[9]-1)/nt[5],Lt=(nt[8]-1)/nt[0],wt=(ft[8]+1)/ft[0],Yt=Et*Lt,_t=Et*wt,Ht=it/(-Lt+wt),de=Ht*-Lt;if(q.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(de),F.translateZ(Ht),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert(),nt[10]===-1)F.projectionMatrix.copy(q.projectionMatrix),F.projectionMatrixInverse.copy(q.projectionMatrixInverse);else{const ae=Et+Ht,D=I+Ht,y=Yt-de,W=_t+(it-de),X=jt*I/D*ae,tt=Dt*I/D*ae;F.projectionMatrix.makePerspective(y,W,X,tt,ae,D),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}}function $(F,q){q===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(q.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(s===null)return;let q=F.near,Q=F.far;m.texture!==null&&(m.depthNear>0&&(q=m.depthNear),m.depthFar>0&&(Q=m.depthFar)),k.near=T.near=E.near=q,k.far=T.far=E.far=Q,(G!==k.near||Y!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),G=k.near,Y=k.far),k.layers.mask=F.layers.mask|6,E.layers.mask=k.layers.mask&3,T.layers.mask=k.layers.mask&5;const it=F.parent,nt=k.cameras;$(k,it);for(let ft=0;ft<nt.length;ft++)$(nt[ft],it);nt.length===2?Z(k,E,T):k.projectionMatrix.copy(E.projectionMatrix),ot(F,k,it)};function ot(F,q,Q){Q===null?F.matrix.copy(q.matrixWorld):(F.matrix.copy(Q.matrixWorld),F.matrix.invert(),F.matrix.multiply(q.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(q.projectionMatrix),F.projectionMatrixInverse.copy(q.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Tc*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(p===null&&d===null))return c},this.setFoveation=function(F){c=F,p!==null&&(p.fixedFoveation=F),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=F)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(F){return f[F]};let Rt=null;function It(F,q){if(h=q.getViewerPose(l||o),g=q,h!==null){const Q=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let it=!1;Q.length!==k.cameras.length&&(k.cameras.length=0,it=!0);for(let I=0;I<Q.length;I++){const jt=Q[I];let Dt=null;if(d!==null)Dt=d.getViewport(jt);else{const wt=u.getViewSubImage(p,jt);Dt=wt.viewport,I===0&&(t.setRenderTargetTextures(v,wt.colorTexture,wt.depthStencilTexture),t.setRenderTarget(v))}let Lt=z[I];Lt===void 0&&(Lt=new vn,Lt.layers.enable(I),Lt.viewport=new be,z[I]=Lt),Lt.matrix.fromArray(jt.transform.matrix),Lt.matrix.decompose(Lt.position,Lt.quaternion,Lt.scale),Lt.projectionMatrix.fromArray(jt.projectionMatrix),Lt.projectionMatrixInverse.copy(Lt.projectionMatrix).invert(),Lt.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),I===0&&(k.matrix.copy(Lt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),it===!0&&k.cameras.push(Lt)}const nt=s.enabledFeatures;if(nt&&nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const I=u.getDepthInformation(Q[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(nt&&nt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let I=0;I<Q.length;I++){const jt=Q[I].camera;if(jt){let Dt=f[jt];Dt||(Dt=new ed,f[jt]=Dt);const Lt=u.getCameraImage(jt);Dt.sourceTexture=Lt}}}}for(let Q=0;Q<b.length;Q++){const it=w[Q],nt=b[Q];it!==null&&nt!==void 0&&nt.update(it,q,l||o)}Rt&&Rt(F,q),q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:q}),g=null}const gt=new dd;gt.setAnimationLoop(It),this.setAnimationLoop=function(F){Rt=F},this.dispose=function(){}}}const yi=new bn,sv=new te;function rv(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Yu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,_,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),p(m,f),f.isMeshPhysicalMaterial&&d(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,M,_):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ze&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ze&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const M=t.get(f),_=M.envMap,v=M.envMapRotation;_&&(m.envMap.value=_,yi.copy(v),yi.x*=-1,yi.y*=-1,yi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),m.envMapRotation.value.setFromMatrix4(sv.makeRotationFromEuler(yi)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=_*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function d(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ze&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const M=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ov(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,_){const v=_.program;n.uniformBlockBinding(M,v)}function l(M,_){let v=s[M.id];v===void 0&&(g(M),v=h(M),s[M.id]=v,M.addEventListener("dispose",m));const b=_.program;n.updateUBOMapping(M,b);const w=t.render.frame;r[M.id]!==w&&(p(M),r[M.id]=w)}function h(M){const _=u();M.__bindingPointIndex=_;const v=i.createBuffer(),b=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,v),v}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(M){const _=s[M.id],v=M.uniforms,b=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let w=0,P=v.length;w<P;w++){const N=Array.isArray(v[w])?v[w]:[v[w]];for(let E=0,T=N.length;E<T;E++){const z=N[E];if(d(z,w,E,b)===!0){const k=z.__offset,G=Array.isArray(z.value)?z.value:[z.value];let Y=0;for(let C=0;C<G.length;C++){const S=G[C],U=x(S);typeof S=="number"||typeof S=="boolean"?(z.__data[0]=S,i.bufferSubData(i.UNIFORM_BUFFER,k+Y,z.__data)):S.isMatrix3?(z.__data[0]=S.elements[0],z.__data[1]=S.elements[1],z.__data[2]=S.elements[2],z.__data[3]=0,z.__data[4]=S.elements[3],z.__data[5]=S.elements[4],z.__data[6]=S.elements[5],z.__data[7]=0,z.__data[8]=S.elements[6],z.__data[9]=S.elements[7],z.__data[10]=S.elements[8],z.__data[11]=0):(S.toArray(z.__data,Y),Y+=U.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,_,v,b){const w=M.value,P=_+"_"+v;if(b[P]===void 0)return typeof w=="number"||typeof w=="boolean"?b[P]=w:b[P]=w.clone(),!0;{const N=b[P];if(typeof w=="number"||typeof w=="boolean"){if(N!==w)return b[P]=w,!0}else if(N.equals(w)===!1)return N.copy(w),!0}return!1}function g(M){const _=M.uniforms;let v=0;const b=16;for(let P=0,N=_.length;P<N;P++){const E=Array.isArray(_[P])?_[P]:[_[P]];for(let T=0,z=E.length;T<z;T++){const k=E[T],G=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,C=G.length;Y<C;Y++){const S=G[Y],U=x(S),A=v%b,O=A%U.boundary,Z=A+O;v+=O,Z!==0&&b-Z<U.storage&&(v+=b-Z),k.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=U.storage}}}const w=v%b;return w>0&&(v+=b-w),M.__size=v,M.__cache={},this}function x(M){const _={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(_.boundary=4,_.storage=4):M.isVector2?(_.boundary=8,_.storage=8):M.isVector3||M.isColor?(_.boundary=16,_.storage=12):M.isVector4?(_.boundary=16,_.storage=16):M.isMatrix3?(_.boundary=48,_.storage=48):M.isMatrix4?(_.boundary=64,_.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),_}function m(M){const _=M.target;_.removeEventListener("dispose",m);const v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function f(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}class av{constructor(t={}){const{canvas:e=np(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,f=null;const M=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let b=!1;this._outputColorSpace=Pe;let w=0,P=0,N=null,E=-1,T=null;const z=new be,k=new be;let G=null;const Y=new Gt(0);let C=0,S=e.width,U=e.height,A=1,O=null,Z=null;const $=new be(0,0,S,U),ot=new be(0,0,S,U);let Rt=!1;const It=new To;let gt=!1,F=!1;const q=new te,Q=new L,it=new be,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ft=!1;function Et(){return N===null?A:1}let I=n;function jt(R,V){return e.getContext(R,V)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Wc}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",bt,!1),e.addEventListener("webglcontextcreationerror",at,!1),I===null){const V="webgl2";if(I=jt(V,R),I===null)throw jt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Dt,Lt,wt,Yt,_t,Ht,de,ae,D,y,W,X,tt,K,vt,st,xt,Ct,rt,mt,Ut,Tt,ut,Zt;function B(){Dt=new xx(I),Dt.init(),Tt=new Q_(I,Dt),Lt=new hx(I,Dt,t,Tt),wt=new J_(I,Dt),Lt.reversedDepthBuffer&&p&&wt.buffers.depth.setReversed(!0),Yt=new Mx(I),_t=new O_,Ht=new j_(I,Dt,wt,_t,Lt,Tt,Yt),de=new dx(v),ae=new gx(v),D=new Tm(I),ut=new cx(I,D),y=new _x(I,D,Yt,ut),W=new Sx(I,y,D,Yt),rt=new yx(I,Lt,Ht),st=new ux(_t),X=new F_(v,de,ae,Dt,Lt,ut,st),tt=new rv(v,_t),K=new k_,vt=new q_(Dt),Ct=new ax(v,de,ae,wt,W,d,c),xt=new $_(v,W,Lt),Zt=new ov(I,Yt,Lt,wt),mt=new lx(I,Dt,Yt),Ut=new vx(I,Dt,Yt),Yt.programs=X.programs,v.capabilities=Lt,v.extensions=Dt,v.properties=_t,v.renderLists=K,v.shadowMap=xt,v.state=wt,v.info=Yt}B();const lt=new iv(v,I);this.xr=lt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const R=Dt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Dt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return A},this.setPixelRatio=function(R){R!==void 0&&(A=R,this.setSize(S,U,!1))},this.getSize=function(R){return R.set(S,U)},this.setSize=function(R,V,J=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}S=R,U=V,e.width=Math.floor(R*A),e.height=Math.floor(V*A),J===!0&&(e.style.width=R+"px",e.style.height=V+"px"),this.setViewport(0,0,R,V)},this.getDrawingBufferSize=function(R){return R.set(S*A,U*A).floor()},this.setDrawingBufferSize=function(R,V,J){S=R,U=V,A=J,e.width=Math.floor(R*J),e.height=Math.floor(V*J),this.setViewport(0,0,R,V)},this.getCurrentViewport=function(R){return R.copy(z)},this.getViewport=function(R){return R.copy($)},this.setViewport=function(R,V,J,j){R.isVector4?$.set(R.x,R.y,R.z,R.w):$.set(R,V,J,j),wt.viewport(z.copy($).multiplyScalar(A).round())},this.getScissor=function(R){return R.copy(ot)},this.setScissor=function(R,V,J,j){R.isVector4?ot.set(R.x,R.y,R.z,R.w):ot.set(R,V,J,j),wt.scissor(k.copy(ot).multiplyScalar(A).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(R){wt.setScissorTest(Rt=R)},this.setOpaqueSort=function(R){O=R},this.setTransparentSort=function(R){Z=R},this.getClearColor=function(R){return R.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(R=!0,V=!0,J=!0){let j=0;if(R){let H=!1;if(N!==null){const ct=N.texture.format;H=ct===Jc||ct===Kc||ct===$c}if(H){const ct=N.texture.type,Mt=ct===Ln||ct===Di||ct===ir||ct===sr||ct===qc||ct===Yc,At=Ct.getClearColor(),St=Ct.getClearAlpha(),Ft=At.r,Vt=At.g,zt=At.b;Mt?(g[0]=Ft,g[1]=Vt,g[2]=zt,g[3]=St,I.clearBufferuiv(I.COLOR,0,g)):(x[0]=Ft,x[1]=Vt,x[2]=zt,x[3]=St,I.clearBufferiv(I.COLOR,0,x))}else j|=I.COLOR_BUFFER_BIT}V&&(j|=I.DEPTH_BUFFER_BIT),J&&(j|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",bt,!1),e.removeEventListener("webglcontextcreationerror",at,!1),Ct.dispose(),K.dispose(),vt.dispose(),_t.dispose(),de.dispose(),ae.dispose(),W.dispose(),ut.dispose(),Zt.dispose(),X.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",En),lt.removeEventListener("sessionend",El),pi.stop()};function ht(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function bt(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const R=Yt.autoReset,V=xt.enabled,J=xt.autoUpdate,j=xt.needsUpdate,H=xt.type;B(),Yt.autoReset=R,xt.enabled=V,xt.autoUpdate=J,xt.needsUpdate=j,xt.type=H}function at(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function et(R){const V=R.target;V.removeEventListener("dispose",et),Pt(V)}function Pt(R){Wt(R),_t.remove(R)}function Wt(R){const V=_t.get(R).programs;V!==void 0&&(V.forEach(function(J){X.releaseProgram(J)}),R.isShaderMaterial&&X.releaseShaderCache(R))}this.renderBufferDirect=function(R,V,J,j,H,ct){V===null&&(V=nt);const Mt=H.isMesh&&H.matrixWorld.determinant()<0,At=Vd(R,V,J,j,H);wt.setMaterial(j,Mt);let St=J.index,Ft=1;if(j.wireframe===!0){if(St=y.getWireframeAttribute(J),St===void 0)return;Ft=2}const Vt=J.drawRange,zt=J.attributes.position;let Qt=Vt.start*Ft,ce=(Vt.start+Vt.count)*Ft;ct!==null&&(Qt=Math.max(Qt,ct.start*Ft),ce=Math.min(ce,(ct.start+ct.count)*Ft)),St!==null?(Qt=Math.max(Qt,0),ce=Math.min(ce,St.count)):zt!=null&&(Qt=Math.max(Qt,0),ce=Math.min(ce,zt.count));const Se=ce-Qt;if(Se<0||Se===1/0)return;ut.setup(H,j,At,J,St);let pe,ue=mt;if(St!==null&&(pe=D.get(St),ue=Ut,ue.setIndex(pe)),H.isMesh)j.wireframe===!0?(wt.setLineWidth(j.wireframeLinewidth*Et()),ue.setMode(I.LINES)):ue.setMode(I.TRIANGLES);else if(H.isLine){let Nt=j.linewidth;Nt===void 0&&(Nt=1),wt.setLineWidth(Nt*Et()),H.isLineSegments?ue.setMode(I.LINES):H.isLineLoop?ue.setMode(I.LINE_LOOP):ue.setMode(I.LINE_STRIP)}else H.isPoints?ue.setMode(I.POINTS):H.isSprite&&ue.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)ar("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ue.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(Dt.get("WEBGL_multi_draw"))ue.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Nt=H._multiDrawStarts,xe=H._multiDrawCounts,ie=H._multiDrawCount,$e=St?D.get(St).bytesPerElement:1,Gi=_t.get(j).currentProgram.getUniforms();for(let Ke=0;Ke<ie;Ke++)Gi.setValue(I,"_gl_DrawID",Ke),ue.render(Nt[Ke]/$e,xe[Ke])}else if(H.isInstancedMesh)ue.renderInstances(Qt,Se,H.count);else if(J.isInstancedBufferGeometry){const Nt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,xe=Math.min(J.instanceCount,Nt);ue.renderInstances(Qt,Se,xe)}else ue.render(Qt,Se)};function fe(R,V,J){R.transparent===!0&&R.side===Ae&&R.forceSinglePass===!1?(R.side=Ze,R.needsUpdate=!0,yr(R,V,J),R.side=ui,R.needsUpdate=!0,yr(R,V,J),R.side=Ae):yr(R,V,J)}this.compile=function(R,V,J=null){J===null&&(J=R),f=vt.get(J),f.init(V),_.push(f),J.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),R!==J&&R.traverseVisible(function(H){H.isLight&&H.layers.test(V.layers)&&(f.pushLight(H),H.castShadow&&f.pushShadow(H))}),f.setupLights();const j=new Set;return R.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ct=H.material;if(ct)if(Array.isArray(ct))for(let Mt=0;Mt<ct.length;Mt++){const At=ct[Mt];fe(At,J,H),j.add(At)}else fe(ct,J,H),j.add(ct)}),f=_.pop(),j},this.compileAsync=function(R,V,J=null){const j=this.compile(R,V,J);return new Promise(H=>{function ct(){if(j.forEach(function(Mt){_t.get(Mt).currentProgram.isReady()&&j.delete(Mt)}),j.size===0){H(R);return}setTimeout(ct,10)}Dt.get("KHR_parallel_shader_compile")!==null?ct():setTimeout(ct,10)})};let re=null;function Nn(R){re&&re(R)}function En(){pi.stop()}function El(){pi.start()}const pi=new dd;pi.setAnimationLoop(Nn),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(R){re=R,lt.setAnimationLoop(R),R===null?pi.stop():pi.start()},lt.addEventListener("sessionstart",En),lt.addEventListener("sessionend",El),this.render=function(R,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(V),V=lt.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,V,N),f=vt.get(R,_.length),f.init(V),_.push(f),q.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),It.setFromProjectionMatrix(q,Pn,V.reversedDepth),F=this.localClippingEnabled,gt=st.init(this.clippingPlanes,F),m=K.get(R,M.length),m.init(),M.push(m),lt.enabled===!0&&lt.isPresenting===!0){const ct=v.xr.getDepthSensingMesh();ct!==null&&Oo(ct,V,-1/0,v.sortObjects)}Oo(R,V,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(O,Z),ft=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,ft&&Ct.addToRenderList(m,R),this.info.render.frame++,gt===!0&&st.beginShadows();const J=f.state.shadowsArray;xt.render(J,R,V),gt===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,H=m.transmissive;if(f.setupLights(),V.isArrayCamera){const ct=V.cameras;if(H.length>0)for(let Mt=0,At=ct.length;Mt<At;Mt++){const St=ct[Mt];Al(j,H,R,St)}ft&&Ct.render(R);for(let Mt=0,At=ct.length;Mt<At;Mt++){const St=ct[Mt];Tl(m,R,St,St.viewport)}}else H.length>0&&Al(j,H,R,V),ft&&Ct.render(R),Tl(m,R,V);N!==null&&P===0&&(Ht.updateMultisampleRenderTarget(N),Ht.updateRenderTargetMipmap(N)),R.isScene===!0&&R.onAfterRender(v,R,V),ut.resetDefaultState(),E=-1,T=null,_.pop(),_.length>0?(f=_[_.length-1],gt===!0&&st.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Oo(R,V,J,j){if(R.visible===!1)return;if(R.layers.test(V.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(V);else if(R.isLight)f.pushLight(R),R.castShadow&&f.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||It.intersectsSprite(R)){j&&it.setFromMatrixPosition(R.matrixWorld).applyMatrix4(q);const Mt=W.update(R),At=R.material;At.visible&&m.push(R,Mt,At,J,it.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||It.intersectsObject(R))){const Mt=W.update(R),At=R.material;if(j&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),it.copy(R.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),it.copy(Mt.boundingSphere.center)),it.applyMatrix4(R.matrixWorld).applyMatrix4(q)),Array.isArray(At)){const St=Mt.groups;for(let Ft=0,Vt=St.length;Ft<Vt;Ft++){const zt=St[Ft],Qt=At[zt.materialIndex];Qt&&Qt.visible&&m.push(R,Mt,Qt,J,it.z,zt)}}else At.visible&&m.push(R,Mt,At,J,it.z,null)}}const ct=R.children;for(let Mt=0,At=ct.length;Mt<At;Mt++)Oo(ct[Mt],V,J,j)}function Tl(R,V,J,j){const H=R.opaque,ct=R.transmissive,Mt=R.transparent;f.setupLightsView(J),gt===!0&&st.setGlobalState(v.clippingPlanes,J),j&&wt.viewport(z.copy(j)),H.length>0&&Mr(H,V,J),ct.length>0&&Mr(ct,V,J),Mt.length>0&&Mr(Mt,V,J),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function Al(R,V,J,j){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[j.id]===void 0&&(f.state.transmissionRenderTarget[j.id]=new Ii(1,1,{generateMipmaps:!0,type:Dt.has("EXT_color_buffer_half_float")||Dt.has("EXT_color_buffer_float")?xr:Ln,minFilter:Ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const ct=f.state.transmissionRenderTarget[j.id],Mt=j.viewport||z;ct.setSize(Mt.z*v.transmissionResolutionScale,Mt.w*v.transmissionResolutionScale);const At=v.getRenderTarget(),St=v.getActiveCubeFace(),Ft=v.getActiveMipmapLevel();v.setRenderTarget(ct),v.getClearColor(Y),C=v.getClearAlpha(),C<1&&v.setClearColor(16777215,.5),v.clear(),ft&&Ct.render(J);const Vt=v.toneMapping;v.toneMapping=li;const zt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),f.setupLightsView(j),gt===!0&&st.setGlobalState(v.clippingPlanes,j),Mr(R,J,j),Ht.updateMultisampleRenderTarget(ct),Ht.updateRenderTargetMipmap(ct),Dt.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let ce=0,Se=V.length;ce<Se;ce++){const pe=V[ce],ue=pe.object,Nt=pe.geometry,xe=pe.material,ie=pe.group;if(xe.side===Ae&&ue.layers.test(j.layers)){const $e=xe.side;xe.side=Ze,xe.needsUpdate=!0,Rl(ue,J,j,Nt,xe,ie),xe.side=$e,xe.needsUpdate=!0,Qt=!0}}Qt===!0&&(Ht.updateMultisampleRenderTarget(ct),Ht.updateRenderTargetMipmap(ct))}v.setRenderTarget(At,St,Ft),v.setClearColor(Y,C),zt!==void 0&&(j.viewport=zt),v.toneMapping=Vt}function Mr(R,V,J){const j=V.isScene===!0?V.overrideMaterial:null;for(let H=0,ct=R.length;H<ct;H++){const Mt=R[H],At=Mt.object,St=Mt.geometry,Ft=Mt.group;let Vt=Mt.material;Vt.allowOverride===!0&&j!==null&&(Vt=j),At.layers.test(J.layers)&&Rl(At,V,J,St,Vt,Ft)}}function Rl(R,V,J,j,H,ct){R.onBeforeRender(v,V,J,j,H,ct),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),H.onBeforeRender(v,V,J,j,R,ct),H.transparent===!0&&H.side===Ae&&H.forceSinglePass===!1?(H.side=Ze,H.needsUpdate=!0,v.renderBufferDirect(J,V,j,H,R,ct),H.side=ui,H.needsUpdate=!0,v.renderBufferDirect(J,V,j,H,R,ct),H.side=Ae):v.renderBufferDirect(J,V,j,H,R,ct),R.onAfterRender(v,V,J,j,H,ct)}function yr(R,V,J){V.isScene!==!0&&(V=nt);const j=_t.get(R),H=f.state.lights,ct=f.state.shadowsArray,Mt=H.state.version,At=X.getParameters(R,H.state,ct,V,J),St=X.getProgramCacheKey(At);let Ft=j.programs;j.environment=R.isMeshStandardMaterial?V.environment:null,j.fog=V.fog,j.envMap=(R.isMeshStandardMaterial?ae:de).get(R.envMap||j.environment),j.envMapRotation=j.environment!==null&&R.envMap===null?V.environmentRotation:R.envMapRotation,Ft===void 0&&(R.addEventListener("dispose",et),Ft=new Map,j.programs=Ft);let Vt=Ft.get(St);if(Vt!==void 0){if(j.currentProgram===Vt&&j.lightsStateVersion===Mt)return Pl(R,At),Vt}else At.uniforms=X.getUniforms(R),R.onBeforeCompile(At,v),Vt=X.acquireProgram(At,St),Ft.set(St,Vt),j.uniforms=At.uniforms;const zt=j.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(zt.clippingPlanes=st.uniform),Pl(R,At),j.needsLights=Wd(R),j.lightsStateVersion=Mt,j.needsLights&&(zt.ambientLightColor.value=H.state.ambient,zt.lightProbe.value=H.state.probe,zt.directionalLights.value=H.state.directional,zt.directionalLightShadows.value=H.state.directionalShadow,zt.spotLights.value=H.state.spot,zt.spotLightShadows.value=H.state.spotShadow,zt.rectAreaLights.value=H.state.rectArea,zt.ltc_1.value=H.state.rectAreaLTC1,zt.ltc_2.value=H.state.rectAreaLTC2,zt.pointLights.value=H.state.point,zt.pointLightShadows.value=H.state.pointShadow,zt.hemisphereLights.value=H.state.hemi,zt.directionalShadowMap.value=H.state.directionalShadowMap,zt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,zt.spotShadowMap.value=H.state.spotShadowMap,zt.spotLightMatrix.value=H.state.spotLightMatrix,zt.spotLightMap.value=H.state.spotLightMap,zt.pointShadowMap.value=H.state.pointShadowMap,zt.pointShadowMatrix.value=H.state.pointShadowMatrix),j.currentProgram=Vt,j.uniformsList=null,Vt}function Cl(R){if(R.uniformsList===null){const V=R.currentProgram.getUniforms();R.uniformsList=lo.seqWithValue(V.seq,R.uniforms)}return R.uniformsList}function Pl(R,V){const J=_t.get(R);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function Vd(R,V,J,j,H){V.isScene!==!0&&(V=nt),Ht.resetTextureUnits();const ct=V.fog,Mt=j.isMeshStandardMaterial?V.environment:null,At=N===null?v.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Ss,St=(j.isMeshStandardMaterial?ae:de).get(j.envMap||Mt),Ft=j.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Vt=!!J.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),zt=!!J.morphAttributes.position,Qt=!!J.morphAttributes.normal,ce=!!J.morphAttributes.color;let Se=li;j.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Se=v.toneMapping);const pe=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ue=pe!==void 0?pe.length:0,Nt=_t.get(j),xe=f.state.lights;if(gt===!0&&(F===!0||R!==T)){const Ve=R===T&&j.id===E;st.setState(j,R,Ve)}let ie=!1;j.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==xe.state.version||Nt.outputColorSpace!==At||H.isBatchedMesh&&Nt.batching===!1||!H.isBatchedMesh&&Nt.batching===!0||H.isBatchedMesh&&Nt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Nt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Nt.instancing===!1||!H.isInstancedMesh&&Nt.instancing===!0||H.isSkinnedMesh&&Nt.skinning===!1||!H.isSkinnedMesh&&Nt.skinning===!0||H.isInstancedMesh&&Nt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Nt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Nt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Nt.instancingMorph===!1&&H.morphTexture!==null||Nt.envMap!==St||j.fog===!0&&Nt.fog!==ct||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==st.numPlanes||Nt.numIntersection!==st.numIntersection)||Nt.vertexAlphas!==Ft||Nt.vertexTangents!==Vt||Nt.morphTargets!==zt||Nt.morphNormals!==Qt||Nt.morphColors!==ce||Nt.toneMapping!==Se||Nt.morphTargetsCount!==ue)&&(ie=!0):(ie=!0,Nt.__version=j.version);let $e=Nt.currentProgram;ie===!0&&($e=yr(j,V,H));let Gi=!1,Ke=!1,Ds=!1;const _e=$e.getUniforms(),cn=Nt.uniforms;if(wt.useProgram($e.program)&&(Gi=!0,Ke=!0,Ds=!0),j.id!==E&&(E=j.id,Ke=!0),Gi||T!==R){wt.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),_e.setValue(I,"projectionMatrix",R.projectionMatrix),_e.setValue(I,"viewMatrix",R.matrixWorldInverse);const Ye=_e.map.cameraPosition;Ye!==void 0&&Ye.setValue(I,Q.setFromMatrixPosition(R.matrixWorld)),Lt.logarithmicDepthBuffer&&_e.setValue(I,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&_e.setValue(I,"isOrthographic",R.isOrthographicCamera===!0),T!==R&&(T=R,Ke=!0,Ds=!0)}if(H.isSkinnedMesh){_e.setOptional(I,H,"bindMatrix"),_e.setOptional(I,H,"bindMatrixInverse");const Ve=H.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),_e.setValue(I,"boneTexture",Ve.boneTexture,Ht))}H.isBatchedMesh&&(_e.setOptional(I,H,"batchingTexture"),_e.setValue(I,"batchingTexture",H._matricesTexture,Ht),_e.setOptional(I,H,"batchingIdTexture"),_e.setValue(I,"batchingIdTexture",H._indirectTexture,Ht),_e.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&_e.setValue(I,"batchingColorTexture",H._colorsTexture,Ht));const ln=J.morphAttributes;if((ln.position!==void 0||ln.normal!==void 0||ln.color!==void 0)&&rt.update(H,J,$e),(Ke||Nt.receiveShadow!==H.receiveShadow)&&(Nt.receiveShadow=H.receiveShadow,_e.setValue(I,"receiveShadow",H.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(cn.envMap.value=St,cn.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&V.environment!==null&&(cn.envMapIntensity.value=V.environmentIntensity),Ke&&(_e.setValue(I,"toneMappingExposure",v.toneMappingExposure),Nt.needsLights&&Hd(cn,Ds),ct&&j.fog===!0&&tt.refreshFogUniforms(cn,ct),tt.refreshMaterialUniforms(cn,j,A,U,f.state.transmissionRenderTarget[R.id]),lo.upload(I,Cl(Nt),cn,Ht)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(lo.upload(I,Cl(Nt),cn,Ht),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&_e.setValue(I,"center",H.center),_e.setValue(I,"modelViewMatrix",H.modelViewMatrix),_e.setValue(I,"normalMatrix",H.normalMatrix),_e.setValue(I,"modelMatrix",H.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Ve=j.uniformsGroups;for(let Ye=0,Bo=Ve.length;Ye<Bo;Ye++){const mi=Ve[Ye];Zt.update(mi,$e),Zt.bind(mi,$e)}}return $e}function Hd(R,V){R.ambientLightColor.needsUpdate=V,R.lightProbe.needsUpdate=V,R.directionalLights.needsUpdate=V,R.directionalLightShadows.needsUpdate=V,R.pointLights.needsUpdate=V,R.pointLightShadows.needsUpdate=V,R.spotLights.needsUpdate=V,R.spotLightShadows.needsUpdate=V,R.rectAreaLights.needsUpdate=V,R.hemisphereLights.needsUpdate=V}function Wd(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(R,V,J){const j=_t.get(R);j.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),_t.get(R.texture).__webglTexture=V,_t.get(R.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:J,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,V){const J=_t.get(R);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0};const Xd=I.createFramebuffer();this.setRenderTarget=function(R,V=0,J=0){N=R,w=V,P=J;let j=!0,H=null,ct=!1,Mt=!1;if(R){const St=_t.get(R);if(St.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(I.FRAMEBUFFER,null),j=!1;else if(St.__webglFramebuffer===void 0)Ht.setupRenderTarget(R);else if(St.__hasExternalTextures)Ht.rebindTextures(R,_t.get(R.texture).__webglTexture,_t.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const zt=R.depthTexture;if(St.__boundDepthTexture!==zt){if(zt!==null&&_t.has(zt)&&(R.width!==zt.image.width||R.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ht.setupDepthRenderbuffer(R)}}const Ft=R.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(Mt=!0);const Vt=_t.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Vt[V])?H=Vt[V][J]:H=Vt[V],ct=!0):R.samples>0&&Ht.useMultisampledRTT(R)===!1?H=_t.get(R).__webglMultisampledFramebuffer:Array.isArray(Vt)?H=Vt[J]:H=Vt,z.copy(R.viewport),k.copy(R.scissor),G=R.scissorTest}else z.copy($).multiplyScalar(A).floor(),k.copy(ot).multiplyScalar(A).floor(),G=Rt;if(J!==0&&(H=Xd),wt.bindFramebuffer(I.FRAMEBUFFER,H)&&j&&wt.drawBuffers(R,H),wt.viewport(z),wt.scissor(k),wt.setScissorTest(G),ct){const St=_t.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+V,St.__webglTexture,J)}else if(Mt){const St=V;for(let Ft=0;Ft<R.textures.length;Ft++){const Vt=_t.get(R.textures[Ft]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ft,Vt.__webglTexture,J,St)}}else if(R!==null&&J!==0){const St=_t.get(R.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,St.__webglTexture,J)}E=-1},this.readRenderTargetPixels=function(R,V,J,j,H,ct,Mt,At=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=_t.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Mt!==void 0&&(St=St[Mt]),St){wt.bindFramebuffer(I.FRAMEBUFFER,St);try{const Ft=R.textures[At],Vt=Ft.format,zt=Ft.type;if(!Lt.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Lt.textureTypeReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=R.width-j&&J>=0&&J<=R.height-H&&(R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+At),I.readPixels(V,J,j,H,Tt.convert(Vt),Tt.convert(zt),ct))}finally{const Ft=N!==null?_t.get(N).__webglFramebuffer:null;wt.bindFramebuffer(I.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(R,V,J,j,H,ct,Mt,At=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=_t.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Mt!==void 0&&(St=St[Mt]),St)if(V>=0&&V<=R.width-j&&J>=0&&J<=R.height-H){wt.bindFramebuffer(I.FRAMEBUFFER,St);const Ft=R.textures[At],Vt=Ft.format,zt=Ft.type;if(!Lt.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Lt.textureTypeReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Qt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Qt),I.bufferData(I.PIXEL_PACK_BUFFER,ct.byteLength,I.STREAM_READ),R.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+At),I.readPixels(V,J,j,H,Tt.convert(Vt),Tt.convert(zt),0);const ce=N!==null?_t.get(N).__webglFramebuffer:null;wt.bindFramebuffer(I.FRAMEBUFFER,ce);const Se=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await ip(I,Se,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Qt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ct),I.deleteBuffer(Qt),I.deleteSync(Se),ct}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,V=null,J=0){const j=Math.pow(2,-J),H=Math.floor(R.image.width*j),ct=Math.floor(R.image.height*j),Mt=V!==null?V.x:0,At=V!==null?V.y:0;Ht.setTexture2D(R,0),I.copyTexSubImage2D(I.TEXTURE_2D,J,0,0,Mt,At,H,ct),wt.unbindTexture()};const qd=I.createFramebuffer(),Yd=I.createFramebuffer();this.copyTextureToTexture=function(R,V,J=null,j=null,H=0,ct=null){ct===null&&(H!==0?(ar("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ct=H,H=0):ct=0);let Mt,At,St,Ft,Vt,zt,Qt,ce,Se;const pe=R.isCompressedTexture?R.mipmaps[ct]:R.image;if(J!==null)Mt=J.max.x-J.min.x,At=J.max.y-J.min.y,St=J.isBox3?J.max.z-J.min.z:1,Ft=J.min.x,Vt=J.min.y,zt=J.isBox3?J.min.z:0;else{const ln=Math.pow(2,-H);Mt=Math.floor(pe.width*ln),At=Math.floor(pe.height*ln),R.isDataArrayTexture?St=pe.depth:R.isData3DTexture?St=Math.floor(pe.depth*ln):St=1,Ft=0,Vt=0,zt=0}j!==null?(Qt=j.x,ce=j.y,Se=j.z):(Qt=0,ce=0,Se=0);const ue=Tt.convert(V.format),Nt=Tt.convert(V.type);let xe;V.isData3DTexture?(Ht.setTexture3D(V,0),xe=I.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Ht.setTexture2DArray(V,0),xe=I.TEXTURE_2D_ARRAY):(Ht.setTexture2D(V,0),xe=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,V.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,V.unpackAlignment);const ie=I.getParameter(I.UNPACK_ROW_LENGTH),$e=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Gi=I.getParameter(I.UNPACK_SKIP_PIXELS),Ke=I.getParameter(I.UNPACK_SKIP_ROWS),Ds=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,pe.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pe.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ft),I.pixelStorei(I.UNPACK_SKIP_ROWS,Vt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,zt);const _e=R.isDataArrayTexture||R.isData3DTexture,cn=V.isDataArrayTexture||V.isData3DTexture;if(R.isDepthTexture){const ln=_t.get(R),Ve=_t.get(V),Ye=_t.get(ln.__renderTarget),Bo=_t.get(Ve.__renderTarget);wt.bindFramebuffer(I.READ_FRAMEBUFFER,Ye.__webglFramebuffer),wt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Bo.__webglFramebuffer);for(let mi=0;mi<St;mi++)_e&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.get(R).__webglTexture,H,zt+mi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,_t.get(V).__webglTexture,ct,Se+mi)),I.blitFramebuffer(Ft,Vt,Mt,At,Qt,ce,Mt,At,I.DEPTH_BUFFER_BIT,I.NEAREST);wt.bindFramebuffer(I.READ_FRAMEBUFFER,null),wt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||R.isRenderTargetTexture||_t.has(R)){const ln=_t.get(R),Ve=_t.get(V);wt.bindFramebuffer(I.READ_FRAMEBUFFER,qd),wt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Yd);for(let Ye=0;Ye<St;Ye++)_e?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ln.__webglTexture,H,zt+Ye):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ln.__webglTexture,H),cn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ve.__webglTexture,ct,Se+Ye):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ve.__webglTexture,ct),H!==0?I.blitFramebuffer(Ft,Vt,Mt,At,Qt,ce,Mt,At,I.COLOR_BUFFER_BIT,I.NEAREST):cn?I.copyTexSubImage3D(xe,ct,Qt,ce,Se+Ye,Ft,Vt,Mt,At):I.copyTexSubImage2D(xe,ct,Qt,ce,Ft,Vt,Mt,At);wt.bindFramebuffer(I.READ_FRAMEBUFFER,null),wt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else cn?R.isDataTexture||R.isData3DTexture?I.texSubImage3D(xe,ct,Qt,ce,Se,Mt,At,St,ue,Nt,pe.data):V.isCompressedArrayTexture?I.compressedTexSubImage3D(xe,ct,Qt,ce,Se,Mt,At,St,ue,pe.data):I.texSubImage3D(xe,ct,Qt,ce,Se,Mt,At,St,ue,Nt,pe):R.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ct,Qt,ce,Mt,At,ue,Nt,pe.data):R.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ct,Qt,ce,pe.width,pe.height,ue,pe.data):I.texSubImage2D(I.TEXTURE_2D,ct,Qt,ce,Mt,At,ue,Nt,pe);I.pixelStorei(I.UNPACK_ROW_LENGTH,ie),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,$e),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Gi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Ke),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ds),ct===0&&V.generateMipmaps&&I.generateMipmap(xe),wt.unbindTexture()},this.initRenderTarget=function(R){_t.get(R).__webglFramebuffer===void 0&&Ht.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ht.setTextureCube(R,0):R.isData3DTexture?Ht.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ht.setTexture2DArray(R,0):Ht.setTexture2D(R,0),wt.unbindTexture()},this.resetState=function(){w=0,P=0,N=null,wt.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}function cv(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}function ho(i,t){return Math.hypot(i.x-t.x,i.z-t.z)}function xd(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Math.max(0,Math.min(1,((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1)));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function Zh(i,t){let e=1/0;for(let n=1;n<(t||[]).length;n++)e=Math.min(e,xd(i,t[n-1],t[n]));return e}function $h(i,t,e=.8){const n=i.bounds,s=i.target,r=i.spawn;return!(t.x<n.minX+2||t.x>n.maxX-2||t.z<n.minZ+2||t.z>n.maxZ-2||!me(i,t.x,t.z,e)||r&&ho(t,r)<14||s&&ho(t,s)<(s.radius||5)+11||(i.roads||[]).some(o=>Zh(t,o.points)<(o.width||4)/2+2.8)||(i.rivers||[]).some(o=>Zh(t,o.points)<o.width/2+1.4)||(i.obstacles||[]).some(o=>ho(t,o)<(o.radius||1)+2.1)||(i.fenceSegments||[]).some(o=>xd(t,o.a,o.b)<2.8))}function lv(i,{seed:t=(i.seed||42)+93371,maxClusters:e}={}){const n=i.bounds,s=(n.maxX-n.minX)*(n.maxZ-n.minZ),r=Math.max(3,Math.min(24,Math.ceil(s/1600))),o=Math.max(0,Math.min(32,Math.floor(e??r))),a=cv(t),c=[],l=[];for(let h=0;h<o*90&&l.length<o;h++){const u={x:n.minX+2+a()*(n.maxX-n.minX-4),z:n.minZ+2+a()*(n.maxZ-n.minZ-4)};if(!$h(i,u,.85)||l.some(x=>ho(u,x)<5.5))continue;const p=3+Math.floor(a()*3),d=l.length,g=[];for(let x=0;x<p;x++){const m=a()*Math.PI*2,f=x===0?0:.55+a()*1.25,M={x:u.x+Math.cos(m)*f,z:u.z+Math.sin(m)*f};$h(i,M,.55)&&g.push({x:M.x,z:M.z,variant:Math.floor(a()*3),scale:.66+a()*.48,cluster:d})}g.length<2||(l.push(u),c.push(...g))}return c}const hv="#9ceeff",uv="#39bfe8",dv="#ff7062",fv="#ff241b";function ba(i,t){const n=(i?.userData?.parts||i)?.tailLight?.material;if(!n)return!1;const s=t?dv:hv,r=t?fv:uv;return n.color?.set&&n.color.set(s),n.emissive?.set&&n.emissive.set(r),n.emissiveIntensity=t?1.9:1.25,!0}const pv=[{id:"speed",name:"Turbo paws",icon:"paw",costs:[80,120,200],unlockLevels:[2,6,11],description:"Circle a roaming flock faster with upgraded paw motors.",tierNames:["Quick paws","Trail runner","Meadow racer"],tierDescriptions:["+1.8 m/s running speed","+2.7 m/s running speed","+3.5 m/s running speed"]},{id:"flock",name:"Friendly signal",icon:"signal",costs:[120,180,260],unlockLevels:[7,10,15],description:"Reach more robots with a wider herding signal.",tierNames:["Clear signal","Pasture beacon","Far-field beacon"],tierDescriptions:["+2 m herding range","+3 m herding range","+4 m herding range"]},{id:"drone",name:"Scout drone",icon:"drone",costs:[200,360,540],unlockLevels:[10,14,18],description:"A hovering helper keeps the main herd together while you lead the way.",tierNames:["Scout","Shepherd scout","Flock captain"],tierDescriptions:["Keeps the main herd together; holds when you leave","33% stronger drone support","67% stronger drone support"]},{id:"helper",name:"Buddy dog",icon:"dog",costs:[600,850,1200],unlockLevels:[20,24,28],description:"Herds from the rear, supports split flocks, and learns to retrieve strays.",tierNames:["Farm friend","Trail partner","Senior shepherd"],tierDescriptions:["Herds from behind in the flock’s direction of travel","Guides the smaller flock and passages; barks autonomously","Also retrieves wanderers and bolters to the nearest flock"]},{id:"bark",name:"Happy bark",icon:"bark",costs:[100,160,240],unlockLevels:[4,8,13],description:"A stronger bark gives wandering robots a cheerful nudge.",tierNames:["Bright bark","Resonant bark","Meadow chorus"],tierDescriptions:["+0.25 bark strength","+0.45 bark strength","+0.65 bark strength"]},{id:"cohesion",name:"Flock harmony",icon:"harmony",costs:[160,220,320],unlockLevels:[12,14,15],description:"Robots regroup more readily when the flock stretches across a meadow.",tierNames:["Stay together","Close companions","Perfect formation"],tierDescriptions:["12% stronger regrouping","23% stronger regrouping","35% stronger regrouping"]}],Po=Object.freeze(pv.map(i=>Object.freeze({...i,cost:i.costs[0],maxLevel:i.costs.length,costs:Object.freeze(i.costs),unlockLevels:Object.freeze(i.unlockLevels),tierNames:Object.freeze(i.tierNames),tierDescriptions:Object.freeze(i.tierDescriptions)}))),vr=i=>Po.find(t=>t.id===i);function Kn(i,t){const e=vr(t);if(!e||!i||typeof i!="object")return 0;const n=Object.hasOwn(i,t)?i[t]:void 0;return n===!0?1:Number.isInteger(n)&&n>0?Math.min(n,e.maxLevel):0}function ol(i,t){const e=vr(t);return e?e.costs[Kn(i,t)]??null:null}function _d(i){const t={};for(const e of Po){const n=Kn(i,e.id);n&&(t[e.id]=n)}return t}function vd(i,t){return vr(t)?.unlockLevels[Kn(i,t)]??null}function al(i){if(typeof i=="number")return Number.isInteger(i)?Math.max(1,Math.min(100,i)):1;const t=i;if(!t||typeof t!="object")return 1;const e=Number.isInteger(t.highestLevel)&&t.highestLevel>=0?Math.min(99,t.highestLevel):0,s=(Array.isArray(t.completedLevels)?t.completedLevels:[]).reduce((r,o)=>Number.isInteger(o)&&o>=0&&o<=99?Math.max(r,Math.min(100,o+2)):r,1);return Math.max(e+1,s)}function mv(i,t,e=i){const n=typeof i=="object"?i:null,s=vr(t),r=al(e),o=Kn(n?.upgrades,t),a=ol(n?.upgrades,t),c=vd(n?.upgrades,t),l=s?a===null?"owned":r<c?"locked":n&&(!Number.isFinite(n.points)||n.points<a)?"points":null:"unknown";return{available:l===null,reason:l,level:o,nextLevel:a===null?null:o+1,cost:a,unlockLevel:c,currentLevelNumber:r}}function Md(i,t=1){const e=al(t),n={};for(const s of Po){const r=Kn(i,s.id),o=s.unlockLevels.filter(c=>c<=e).length,a=Math.min(r,o);a&&(n[s.id]=a)}return n}function gv(i,t,e=i){const n=vr(t);if(!n)return{ok:!1,reason:"unknown"};if(!i||typeof i!="object")return{ok:!1,reason:"points"};const s=Kn(i.upgrades,t),r=ol(i.upgrades,t);if(r===null)return{ok:!1,reason:"owned"};const o=vd(i.upgrades,t);return al(e)<o?{ok:!1,reason:"locked",unlockLevel:o}:!Number.isFinite(i.points)||i.points<r?{ok:!1,reason:"points"}:(i.points-=r,i.upgrades={..._d(i.upgrades),[t]:s+1},{ok:!0,upgrade:n,level:s+1,cost:r})}function xv(i,t=1){const e=Md(i,t),n=r=>Kn(e,r);return{speedBoost:[0,1.8,2.7,3.5][n("speed")],signalBoost:[0,2,3,4][n("flock")],barkBoost:[0,.25,.45,.65][n("bark")],cohesionBoost:[0,.12,.23,.35][n("cohesion")],droneStrength:[0,.7,.93,1.17][n("drone")],helperStrength:[0,1,1.3,1.58][n("helper")],drone:n("drone")>0,helper:n("helper")>0,helperTier:n("helper")}}const ii=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z);function Qr(i,t,e,n=.6){if(!me(i,e.x,e.z,n)){let p=null,d=1/0;for(const g of[.6,1.2,1.8,2.4,3.2,4.5,6]){for(let x=0;x<24;x++){const m=x*Math.PI/12,f={x:e.x+Math.cos(m)*g,z:e.z+Math.sin(m)*g},M=g+ii(t,f)*.015;M<d&&me(i,f.x,f.z,n+.08)&&(p=f,d=M)}if(p)break}if(!p)return{x:t.x,z:t.z};e=p}let s=Hc(i,t,e,n);Re({...i,obstacles:[]},t,e,n)&&(s=e);const r=t.buddyNavigation;if(r&&ii(r.goal,s)<3&&i.time<r.until){for(;r.path.length&&ii(t,r.path[0])<.45;)r.path.shift();if(r.path.length&&Re(i,t,r.path[0],n))return r.path[0]}if(Re(i,t,s,n))return delete t.buddyNavigation,s;const o=(i.obstacles||[]).filter(p=>ii(t,p)<Math.min(24,ii(t,s)+6)&&rn(p,t,s)<p.radius+n+4).sort((p,d)=>ii(t,p)-ii(t,d)).slice(0,6);if(!o.length)return s;const a=[t,s];for(const p of o){const d=(p.radius+n+.16)/Math.cos(Math.PI/12);for(let g=0;g<12;g++){const x=g*Math.PI/6,m={x:p.x+Math.cos(x)*d,z:p.z+Math.sin(x)*d};me(i,m.x,m.z,n)&&a.push(m)}}const c=a.map(()=>1/0),l=[],h=new Set;c[0]=0;for(let p=0;p<a.length;p++){let d=-1;for(let g=0;g<a.length;g++)!h.has(g)&&(d<0||c[g]<c[d])&&(d=g);if(d<0||!Number.isFinite(c[d])||d===1)break;h.add(d);for(let g=1;g<a.length;g++){if(h.has(g))continue;const x=c[d]+ii(a[d],a[g]);x>=c[g]||!Re(i,a[d],a[g],n)||(c[g]=x,l[g]=d)}}if(!Number.isFinite(c[1]))return s;const u=[];for(let p=1;p!==0;p=l[p])u.unshift({x:a[p].x,z:a[p].z});return t.buddyNavigation={goal:{x:s.x,z:s.z},path:u,until:i.time+2},u[0]}const yd=(i,t)=>Math.atan2(Math.sin(i-t),Math.cos(i-t));function Dc(i,t,e,n){const s=yd(t,i),r=e*n;return i+Math.max(-r,Math.min(r,s))}function _v(i,t,e,n,s){if(!(n>0)||!Number.isFinite(n))return;const r=e.x-t.x,o=e.z-t.z,a=Math.hypot(r,o),c={x:t.x,z:t.z};if(a>1e-4){const l=Math.atan2(r,o);t.heading=Dc(t.heading??l,l,2.8,n);const h=Math.max(0,Math.cos(yd(l,t.heading))),u=5,p=10,d=Math.min(Math.max(0,s),a*u)*h,g=Math.max(0,t.moveSpeed??Math.hypot(t.vx||0,t.vz||0)),x=g+Math.max(-p*n,Math.min(p*n,d-g)),m=Math.min(a,n*x),f=$s(i,t,Math.sin(t.heading)*m,Math.cos(t.heading)*m,.6),M=Math.hypot(t.x-c.x,t.z-c.z);t.moveSpeed=f.blockedX||f.blockedZ?M/n:x}else t.moveSpeed=Math.max(0,(t.moveSpeed||0)-10*n);t.vx=(t.x-c.x)/n,t.vz=(t.z-c.z)/n}const Ee=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),us=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:0}},Qs=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function cl(i,t,e=(n,s)=>Re(i,n,s,.15)){const n=new Set(t),s=[];for(;n.size;){const r=n.values().next().value,o=[r];n.delete(r);for(let a=0;a<o.length;a++)for(const c of n)Ee(o[a],c)<=6.5&&e(o[a],c)&&(o.push(c),n.delete(c));s.push(o)}return s}const Kh=(i,t=[])=>i.filter(e=>t.includes(e.id)).length,Ea=(i,t,e)=>Kh(t,e)-Kh(i,e)||Math.min(...i.map(n=>n.id))-Math.min(...t.map(n=>n.id)),vo=i=>Oe(i),tr=(i,t,e)=>((i.x-t.x)*Math.sin(t.heading)+(i.z-t.z)*Math.cos(t.heading))*e;function Sd(i,t,e){return!e.length||(t.kind==="goal"?e.every(n=>gr(i.target,n,vo(n))):e.every(n=>tr(n,t.bridge,t.sign)>t.bridge.length/2+3))}function vv(i,t){return Ee(t,i.target)<an(i.target).halfLength+12||(i.rivers||[]).some(e=>e.bridges.some(n=>Ee(t,n)<n.length/2+12))}function Mv(i,t,e,n){if(t.passage){const l=t.passage,h=l.kind==="goal"?i.target:l.bridge;if(!Sd(i,l,e)&&Ee(Qs(e),h)<(h.length||h.radius||5)+22)return l;delete t.passage}const s=Qs(e),r=an(i.target),o=Ee(i.dog,i.target)<i.target.radius+12||e.some(l=>Ee(l,i.dog)<14&&Re(i,l,i.dog,.15));if(o&&Ee(s,i.target)<r.halfLength+12&&!e.every(l=>gr(i.target,l,vo(l))))return t.passage={kind:"goal",ids:e.map(l=>l.id)};const a=(i.rivers||[]).flatMap(l=>l.bridges).sort((l,h)=>Ee(l,s)-Ee(h,s));let c=t.forward&&n;if(!c&&o&&(c=us(s.x-i.dog.x,s.z-i.dog.z)),!c)return null;for(const l of a){if(Ee(s,l)>l.length/2+12)continue;const h=c.x*Math.sin(l.heading)+c.z*Math.cos(l.heading);if(Math.abs(h)<.25)continue;const u=Math.sign(h);if(!(tr(s,l,u)>l.length/2+1))return t.passage={kind:"bridge",bridge:l,sign:u,ids:e.map(d=>d.id)}}return null}function Jh(i,t,e){if(t.kind==="goal")return sf(i,e);const n=t.bridge,s=n.length/2+4;return{x:n.x+Math.sin(n.heading)*t.sign*s,z:n.z+Math.cos(n.heading)*t.sign*s}}function yv(i,t,e,n,s){if(!e.helper)return{forces:new Map,memberIds:new Set};let r=i.helpers.find(A=>A.type==="helper");r||(r={type:"helper",x:i.dog.x,z:i.dog.z},i.helpers.push(r));const o=i.buddyHerd||={},a=e.helperTier;r.barking=i.time<(r.barkUntil||0);let c=a>=3&&t.find(A=>A.id===o.retrieveId);const l=t.filter(A=>A.id!==c?.id&&!A.wander&&!A.wanderHome),h=l.map(A=>A.id).join(",");(!o.groups||h!==o.signature||i.time-o.checkedAt>=.25)&&(o.allGroups=cl(i,l),o.groups=o.allGroups.filter(A=>A.length>=2),o.signature=h,o.checkedAt=i.time);let u=o.groups;if(!u.length&&a>=2){const A=(o.allGroups||[]).filter(O=>vv(i,O[0])).sort((O,Z)=>Ee(r,O[0])-Ee(r,Z[0]))[0];A&&(u=[A])}u.sort((A,O)=>O.length-A.length||Ea(A,O,o.travelIds));const p=u[0];if(!p)return r.mode="standby",r.clusterIds=[],r.targetId=null,r.barking=!1,r.moveSpeed=0,r.vx=0,r.vz=0,delete o.retrieveId,{forces:new Map,memberIds:new Set};o.travelIds=p.map(A=>A.id);const d=p.reduce((A,O)=>({x:A.x+(O.vx||0)/p.length,z:A.z+(O.vz||0)/p.length}),{x:0,z:0}),g=Math.hypot(d.x,d.z)>.28;if(g){const A=us(d.x,d.z);if(o.forward){const O=Math.atan2(o.forward.x,o.forward.z),Z=Math.atan2(A.x,A.z),$=Dc(O,Z,1.8,n);o.forward={x:Math.sin($),z:Math.cos($)}}else o.forward=A}const x=o.forward||{x:0,z:1},m=A=>[...u].sort((O,Z)=>Ee(A,Qs(O))-Ee(A,Qs(Z))||Ea(O,Z))[0];c&&m(c).some(O=>Ee(O,c)<=4.5&&Re(i,O,c,.15))&&(delete o.retrieveId,c=null),a>=3&&!c&&u.some(A=>A.length>=2)&&(c=t.filter(A=>(A.wander||A.wanderHome)&&!u.some(O=>O.some(Z=>Z.id===A.id))).sort((A,O)=>+!!O.wander?.bolting-+!!A.wander?.bolting||Ee(r,A)-Ee(r,O)||A.id-O.id)[0],c&&(o.retrieveId=c.id)),c||delete o.retrieveId;let f=a>=2?[...u].sort((A,O)=>A.length-O.length||Ea(A,O,r.clusterIds))[0]:p;if(a>=2&&o.passage){const A=t.filter(O=>o.passage.ids.includes(O.id)&&!O.wander&&!O.wanderHome);A.length&&!Sd(i,o.passage,A)&&(f=A)}const M=c?m(c):f,_=!c&&a>=2?Mv(i,o,M,x):null,v=Qs(M);r.clusterIds=M.map(A=>A.id),r.anchor=v,r.targetId=c?.id??null;let b=v,w=x;if(c){b=c;const A=Oe(c),O=Qr(i,c,v,A);w=us(O.x-c.x,O.z-c.z)}if(_){b=[...M].sort((O,Z)=>_.kind==="bridge"?tr(O,_.bridge,_.sign)-tr(Z,_.bridge,_.sign):Ee(Z,i.target)-Ee(O,i.target))[0];const A=Qr(i,b,Jh(i,_,b),vo(b));w=us(A.x-b.x,A.z-b.z)}if(c||_){const A=Math.atan2(w.x,w.z);o.workHeading=Dc(o.workHeading??A,A,1.8,n),w={x:Math.sin(o.workHeading),z:Math.cos(o.workHeading)}}else delete o.workHeading;r.mode=c?"retrieve":_?_.kind:g?"herd":"hold";const P=c||_?0:Math.min(...M.map(A=>(A.x-v.x)*w.x+(A.z-v.z)*w.z)),N=c?{x:(c.vx||0)*.4,z:(c.vz||0)*.4}:{x:0,z:0},E={x:b.x+w.x*(P-3.2)+N.x,z:b.z+w.z*(P-3.2)+N.z};r.desired=E,r.forward={...w};const T={x:r.x-b.x,z:r.z-b.z};let z=E;if(T.x*w.x+T.z*w.z>-2.5&&Ee(r,b)<8){const A=o.orbitSide||=Math.sign(T.x*-w.z+T.z*w.x)||1;z={x:b.x-w.x*4.5-w.z*A*5+N.x,z:b.z-w.z*4.5+w.x*A*5+N.z}}T.x*w.x+T.z*w.z<-3&&delete o.orbitSide;const k=Qr(i,r,z,.6);_v(i,r,k,n,c?9:7);const G=c?[c]:M,Y=new Map,C=new Set;if(!g&&!c&&!_)return{forces:Y,memberIds:C};const S=A=>{if(!_)return w;const O=Qr(i,A,Jh(i,_,A),vo(A));return us(O.x-A.x,O.z-A.z)},U=A=>{if(_?.kind==="bridge"&&tr(A,_.bridge,_.sign)>_.bridge.length/2+3)return!1;const O=S(A),Z=us(A.x-r.x,A.z-r.z);return Z.x*O.x+Z.z*O.z>.6&&Ee(r,A)<8&&Re(i,r,A,.15)};a>=2&&i.time>=(r.nextBarkAt||0)&&G.some(U)&&(r.barkUntil=i.time+.65,r.nextBarkAt=i.time+3.2,r.barking=!0,s.push({type:"buddyBark",x:r.x,z:r.z}));for(const A of G){if(!U(A))continue;const O=Oe(A),Z=(c?3.7:_?2.4:1.15)*e.helperStrength*(r.barking?1.45:1),$=S(A),ot=c||_?0:(v.x-A.x)*-w.z+(v.z-A.z)*w.x,Rt=Math.max(-.6,Math.min(.6,ot*.12)),It={x:$.x*Z-$.z*Rt,z:$.z*Z+$.x*Rt},gt={x:A.x+$.x*.7,z:A.z+$.z*.7};!me(i,gt.x,gt.z,O)||!Re(i,A,gt,O)||(Y.set(A.id,It),C.add(A.id))}return{forces:Y,memberIds:C}}const Sv=i=>Oe(i),wv=3,Ta=i=>({x:Math.sin(i.heading),z:Math.cos(i.heading)}),jh=(i,t,e)=>(i.x-t.x)*e.x+(i.z-t.z)*e.z;function bv(i,t,e){let n=t.bridgeCrossing;const s=Sv(t);if(n){const p=Ta(n.bridge);if(jh(e,n.bridge,p)*n.sign>n.bridge.length/2+s+.7&&me(i,e.x,e.z,s))return t.lastBridge={bridge:n.bridge,sign:n.sign},delete t.bridgeCrossing,{finished:!0}}else t:for(const p of i.rivers||[])for(const d of p.bridges){const g=Ta(d),x=jh(e,d,g),m=(e.x-d.x)*g.z-(e.z-d.z)*g.x,f=(e.vx||0)*g.x+(e.vz||0)*g.z,M=t.lastBridge?.bridge===d&&Math.sign(f)!==t.lastBridge.sign,_=Math.abs(x)<=d.length/2+.15,v=!_&&!M&&e.pushed&&Math.abs(x)<=d.length/2+wv&&f*x<0;if(!(!_&&!v||Math.abs(m)>d.width/2-s-(v?.1:0)||!me(i,e.x,e.z,s))&&!(Math.abs(f)<.12)){n=t.bridgeCrossing={bridge:d,sign:Math.sign(f),lane:Math.max(-d.width/2+s+.35,Math.min(d.width/2-s-.35,m))};break t}}if(!n)return null;const r=n.bridge,o=Ta(r);let a;for(const p of[s+1.2,s+2,s+3.2,s+5]){const d=n.sign*(r.length/2+p),g={x:r.x+o.x*d+o.z*n.lane,z:r.z+o.z*d-o.x*n.lane};if(me(i,g.x,g.z,s)){a=g;break}}if(!a)return null;const c=Hc(i,e,a,s),l=c.x-e.x,h=c.z-e.z,u=Math.hypot(l,h);return u<.02||!Re(i,e,c,s)?{x:0,z:0,forward:o}:{x:l/u,z:h/u,forward:o}}const Ev=8,Tv=3,Av=2,Rv=9,wd=i=>({x:Math.sin(i),z:Math.cos(i)}),Qh=new WeakMap;function Cv(i){const t=`${i.geometryRevision||0}:${(i.gates||[]).map(s=>s.open?1:0).join("")}`,e=Qh.get(i);if(e?.key===t)return e.list;const n=Pv(i);return Qh.set(i,{key:t,list:n}),n}function Pv(i){const t=(i.rivers||[]).flatMap(r=>r.bridges).map(r=>({bridge:r,x:r.x,z:r.z,heading:r.heading,width:r.width,half:r.length/2})),e=(i.gates||[]).filter(r=>!r.operable||r.open).map(r=>({x:r.x,z:r.z,heading:r.heading,width:r.width,half:0})),n=i.target&&an(i.target),s=n?[{x:n.entrance.x,z:n.entrance.z,heading:i.target.heading,width:n.openingWidth,half:0,inwardOnly:!0}]:[];return[...t,...e,...s].filter(r=>r.width<Rv)}function Dv(i,t,e=Oe(t)){let n=null;for(const s of Cv(i)){const r=wd(s.heading),o=(t.x-s.x)*r.x+(t.z-s.z)*r.z,a=(t.x-s.x)*r.z-(t.z-s.z)*r.x,c=Math.abs(o)-s.half;if(c<-.01&&Math.abs(a)<=s.width/2||c<-1.5||c>Ev||Math.abs(a)>s.width/2+3||s.inwardOnly&&o>0||n&&c>=n.outside)continue;const l=Math.sign(o)||1,h=Math.max(0,s.width/2-e-.35),u=Math.max(-h,Math.min(h,a)),p={x:-r.x*l,z:-r.z*l};n={opening:s,outside:c,inward:p,side:l,lateral:a,lane:u,mouth:{x:s.x+r.x*l*s.half+r.z*u,z:s.z+r.z*l*s.half-r.x*u}}}return n}function Iv(i,t,e,n,s,r,o){const a=Oe(t),c=Dv(i,e,a);if(!c||r.x*c.inward.x+r.z*c.inward.z<=.05)return delete t.chokeYield,s;const l=t.lastBridge;if(l&&l.bridge===c.opening.bridge&&-c.side!==l.sign)return delete t.chokeYield,s;const h=c.inward;let{x:u,z:p}=s;const d=o.x*h.x+o.z*h.z;d<0&&(u-=h.x*d,p-=h.z*d);const g=u*h.x+p*h.z;g<0&&Math.abs(c.lane-c.lateral)<.3&&(u-=h.x*g,p-=h.z*g);const x=wd(c.opening.heading),m=c.lane-c.lateral;if(Math.abs(m)>.3&&c.outside<a+1.5){const _=Math.abs(c.lateral)>c.opening.width/2-a-.05&&c.outside<a+.45?-.5:Math.min(u*h.x+p*h.z,.3),v=Math.max(-1.5,Math.min(1.5,m*1.5));u=h.x*_+x.z*v,p=h.z*_-x.x*v}else{const M=Math.max(-1,Math.min(1,m*.8));u+=x.z*M,p-=x.x*M}if(t.chokeYield?.escapeUntil<=i.time&&delete t.chokeYield,!(t.chokeYield?.escapeUntil>i.time)){let M=null;for(const v of n){if(v.id===t.id)continue;const b=v.x-e.x,w=v.z-e.z,P=b*h.x+w*h.z,N=Math.abs(b*h.z-w*h.x),E=a+Oe(v)+.25;P>0&&P<E+.3&&N<E&&(!M||P<M.front)&&(M={other:v,front:P,room:E})}const _=u*h.x+p*h.z;if(M){const v=t.chokeYield||={since:i.time};if(i.time-v.since>Tv)t.chokeYield={since:i.time,escapeUntil:i.time+Av};else{const b=Math.max(0,(M.other.vx||0)*h.x+(M.other.vz||0)*h.z)+Math.max(0,M.front-M.room)*1.5;_>b&&(u-=h.x*(_-b),p-=h.z*(_-b))}}else delete t.chokeYield}return{x:u,z:p}}function Lv(i){let t=i>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,(t>>>0)/4294967296}function ps(i,t,e,n=0){return Lv((i^Math.imul(t+1,2654435761)^Math.imul(e+1,2246822507)^n)>>>0)}const zv=i=>Math.floor(Math.max(0,i)*.2);function Uv(i){const t=i+1;return{wanderChance:t>70?.25:t>40?.2:.33,boltChance:t>40?.2:.1,duration:t>=70?[5,10]:t>=40?[4,6]:[3,5]}}function Ic(i){const t=i.animals.filter(s=>!s.saved),e=t.map(s=>s.id).join(",");if(i.wanderCohort&&i.wanderCohortSignature===e)return i.wanderCohort;const n=new Set(t.map(s=>({id:s.id,rank:ps(i.seed^Math.imul(i.index+1,7919),s.id,0,5370206)})).sort((s,r)=>s.rank-r.rank||s.id-r.id).slice(0,zv(t.length)).map(s=>s.id));return i.wanderCohort=n,i.wanderCohortSignature=e,i.wanderCohort}function Nv(i,t,e,n,s=!1){if(i.index<7||t.saved||s||t.wander||t.wanderHome)return null;const r=Uv(i.index);if(!Ic(i).has(t.id)||ps(i.seed,t.id,e,96785)>=r.wanderChance)return null;const o=t.x-n.x,a=t.z-n.z,c=Math.hypot(o,a),l=c>.01?{x:o/c,z:a/c}:{x:0,z:1},h=i.index>=16&&ps(i.seed,t.id,e,45079)<r.boltChance,u=h?r.duration[0]+ps(i.seed,t.id,e,1004)*(r.duration[1]-r.duration[0]):2.5,p=h?6*u+1:4+ps(i.seed,t.id,e,4292)*3;return{x:t.x+l.x*p,z:t.z+l.z*p,until:i.time+u,bolting:h}}function Aa(i,t,e){return 5+3*ps(i.seed^Math.imul(i.index+1,7919),t.id,e,49420)}function Fv(i,t,e){if(!(e>0)||i.index<7||t.saved||(Number.isFinite(t.nextWanderCheck)||(t.wanderOpportunity=0,t.nextWanderCheck=i.time-e+Aa(i,t,0)),i.time+1e-8<t.nextWanderCheck))return null;const n=t.wanderOpportunity++;return t.nextWanderCheck+=Aa(i,t,t.wanderOpportunity),t.nextWanderCheck<=i.time&&(t.nextWanderCheck=i.time+Aa(i,t,t.wanderOpportunity)),n}const wn=(i,t,e)=>Math.max(t,Math.min(e,i)),dr=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Wn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-4?{x:i/e,z:t/e}:{x:0,z:0}},Lc=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function bd(i){const t=Math.max(0,(i.animals?.length||0)-5),e=Math.max(1,i.routes?.length||1),n=i.spawn&&i.target?dr(i.spawn,i.target):0;return wn(30+Math.ceil(t/5)+(e-1)*4+Math.floor(n/40)*2,30,60)}function ll(i,t=i.animals.filter(e=>e.saved).length){const e=i.animals.length;return e?Math.floor(Math.max(0,i.reward)*wn(t,0,e)/e):0}function zc(i,t=[],e=!1,n={blockedX:!1,blockedZ:!1}){const s=i.result?.saved??i.animals.filter(a=>a.saved).length,r=i.result?.total??i.animals.length,o=i.result?.score??ll(i,s);return{saved:s,total:r,score:o,possibleScore:i.reward,completed:!!i.completed,justCompleted:e,reward:e?o:0,remaining:i.delivery?.remaining??null,countdownStarted:!!i.delivery?.started,events:t,helpers:i.helpers||[],dogCollision:n}}function tu(i,t,e=[],n){i.completed=!0;const s=i.animals.filter(r=>r.saved).length;return i.result={saved:s,total:i.animals.length,score:ll(i,s),possibleScore:i.reward,reason:t},e.push({type:"levelCompleted",index:i.index,reward:i.result.score,reason:t}),zc(i,e,!0,n)}function Mo(i,t,e,n=.15){return Re(i,t,e,n)}function Ov(i,t,e=[]){const n=cl(i,t);return n.sort((s,r)=>r.length-s.length||r.filter(o=>e.includes(o.id)).length-s.filter(o=>e.includes(o.id)).length||Math.min(...s.map(o=>o.id))-Math.min(...r.map(o=>o.id))),n[0]||[]}function Bv(i,t,e,n){const s=[e.drone&&"drone"].filter(Boolean);if(i.helpers||=[],i.helpers=i.helpers.filter(x=>s.includes(x.type)||e.helper&&x.type==="helper"),!s.length||!t.length)return{helpers:[],group:[],memberIds:new Set,hold:!1};const r=i.companionHerd||={},o=t.map(x=>x.id).join(",");(!r.group||r.activeSignature!==o||i.time-r.clusterTime>.25)&&(r.group=Ov(i,t,r.clusterIds),r.activeSignature=o,r.clusterTime=i.time);const a=r.group;if(a.length<2){r.mode="standby",r.clusterIds=[],r.positions={};for(const x of s){let m=i.helpers.find(f=>f.type===x);m||(m={type:x,x:i.dog.x,z:i.dog.z},i.helpers.push(m)),m.mode="standby",m.clusterIds=[],m.anchor={x:m.x,z:m.z}}return{helpers:i.helpers,group:[],memberIds:new Set,hold:!1,state:r}}const c=Lc(a),l=a.map(x=>x.id),h=new Set(l);let u=1/0;for(const x of a){const m=dr(i.dog,x);m<=18&&m<u&&Mo(i,i.dog,x)&&(u=m)}const p=r.mode&&r.mode!=="standby"?r.mode==="hold"?u>=12:u>18:u>14,d=(r.clusterIds||[]).filter(x=>h.has(x)).length,g=!r.clusterIds||d<Math.min(r.clusterIds.length,l.length)/2;if(p&&(r.mode!=="hold"||g)&&(r.anchor={...c},r.positions=Object.fromEntries(a.map(x=>[x.id,{x:x.x,z:x.z}]))),p||(r.anchor={...c},r.positions={}),p)for(const x of a)r.positions[x.id]||={x:x.x,z:x.z};r.mode=p?"hold":"assist",r.clusterIds=l;for(const x of s){let m=i.helpers.find(_=>_.type===x);m||(m={type:x,x:x==="drone"?c.x:i.dog.x,z:x==="drone"?c.z:i.dog.z},i.helpers.push(m)),m.mode=r.mode,m.clusterIds=[...l],m.anchor={...r.anchor};const f=Wn(c.x-m.x,c.z-m.z),M=Math.min(dr(m,c),n*6);m.x+=f.x*M,m.z+=f.z*M}return{helpers:i.helpers,group:a,centroid:c,memberIds:h,hold:p,state:r}}function kv(i,t,e,n){const s=new Map;if(!t.group.length||t.hold)return s;const{group:r,centroid:o}=t,a=Wn(o.x-e.x,o.z-e.z),c={x:-a.z,z:a.x},l=Math.min(1.2,n.droneStrength*.35),h=Math.max(2.1,Math.sqrt(r.length)*.66);for(const p of r){const d=(o.x-p.x)*c.x+(o.z-p.z)*c.z,g=wn(Math.sign(d)*Math.max(0,Math.abs(d)-h)*l,-.75,.75),x={x:c.x*g,z:c.z*g},m=Oe(p);g&&!Mo(i,p,{x:p.x+x.x,z:p.z+x.z},m)||me(i,p.x+x.x*.7,p.z+x.z*.7,m)&&s.set(p.id,x)}const u=[...s.values()].reduce((p,d)=>({x:p.x+d.x,z:p.z+d.z}),{x:0,z:0});for(const p of s.values())p.x-=u.x/s.size,p.z-=u.z/s.size;return s}function Ed(i,t,e){if(t<=0)return;const n=an(i.target);for(const s of i.animals){if(!s.saved)continue;const r=Oe(s),o=Bc(i.target,s),a=s.roamPhase??s.id*2.399963229728653;s.roamPhase=a;const c=n.halfLength-r-.48,l=n.halfWidth-r-.24,h={forward:Math.sin(e*.22+a)*c*.72,lateral:Math.cos(e*.19+a*1.7)*l*.72};let u=(h.forward-o.forward)*.32,p=(h.lateral-o.lateral)*.32;for(const v of i.animals){if(v===s||!v.saved)continue;const b=s.x-v.x,w=s.z-v.z,P=Math.hypot(b,w),N=r+Oe(v)+.35;if(P>1e-4&&P<N){const E=(N-P)/P*.6;u+=(b*n.forward.x+w*n.forward.z)*E,p+=(b*n.side.x+w*n.side.z)*E}}const d=-n.halfLength+r;o.forward<d+.45&&(u+=(d+.45-o.forward)*1.2);const g=n.forward,x=n.side;let m=g.x*u+x.x*p,f=g.z*u+x.z*p;const M=Math.hypot(m,f);M>.65&&(m*=.65/M,f*=.65/M);const _={x:s.x,z:s.z};$s(i,s,m*t,f*t,r),me(i,s.x,s.z,r)&&gr(i.target,s,r)||(s.x=_.x,s.z=_.z),s.vx=(s.x-_.x)/t,s.vz=(s.z-_.z)/t,s.heading=Math.hypot(s.vx,s.vz)>.03?Math.atan2(s.vx,s.vz):s.heading||0}}function Gv(i,t=1/60){t=wn(Number(t)||0,0,.1),i.completed&&t>0&&(i.savedRoamTime=(i.savedRoamTime??(i.time||0))+t,Ed(i,t,i.savedRoamTime))}function Vv(i,t,e={},n=1/60,s={}){const r=xv(s,i.index+1);if(n=wn(Number(n)||0,0,.1),i.completed||n<=0)return zc(i);if(n>0&&i.delivery?.started&&(i.delivery.remaining=Math.max(0,i.delivery.remaining-n),i.delivery.remaining<=1e-8))return i.delivery.remaining=0,tu(i,"timeout");i.time=(i.time||0)+n;const o=Ic(i);Ed(i,n,i.time);const a=[],c=Number(e.x)||0,l=Number(e.z??e.y)||0,h=Math.min(1,Math.hypot(c,l)),u=Wn(c,l),p=7.8+r.speedBoost,d={x:t.x,z:t.z},g=$s(i,t,u.x*h*p*n,u.z*h*p*n,.62);t.vx=n?(t.x-d.x)/n:0,t.vz=n?(t.z-d.z)/n:0,t.heading=h>.03?Math.atan2(u.x,u.z):t.heading||0,i.dog=t;const x=i.animals.filter(C=>!C.saved),m=Bv(i,x,r,n),f=kv(i,m,t,r),M=yv(i,x,r,n,a),_=7.6+r.signalBoost+(e.bark?3.3:0),v=x.map(C=>({...C})),b=i.flockVisibility||=new Map,w=new Map(v.map(C=>[C.id,`${Math.floor(C.x*5)},${Math.floor(C.z*5)}`])),P=(C,S)=>{const U=C.id<S.id?C:S,A=C.id<S.id?S:C,O=`${U.id}:${A.id}`,Z=`${w.get(U.id)}:${w.get(A.id)}`,$=b.get(O);if($?.position===Z)return $.clear;const ot=Re(i,C,S,.15);return b.set(O,{position:Z,clear:ot}),ot},N=new Map(v.map(C=>{const S=dr(C,t),U=S<_&&tf(i,C,t),A=U?Math.pow(1-S/_,.65)*(e.bark?1.65+r.barkBoost:1):0,O=S>.01?Wn(C.x-t.x,C.z-t.z):Wn(Math.sin(t.heading||0),Math.cos(t.heading||0));return[C.id,{active:U,urgency:A,x:O.x*A*5.2,z:O.z*A*5.2}]})),E=new Map,T=new Map,z=i.flockTravel||[],k=[];cl(i,v,P).forEach((C,S)=>{const U=C.filter(Et=>!Et.wander&&!Et.wanderHome),A=U.length?U:C,O=Lc(A);let Z=0,$=0,ot=0,Rt=0;for(const Et of A){Z+=(Et.vx||0)/A.length,$+=(Et.vz||0)/A.length;const I=N.get(Et.id),jt=M.forces.get(Et.id);ot+=(I.x+(jt?.x||0))/A.length,Rt+=(I.z+(jt?.z||0))/A.length}const It=C.map(Et=>Et.id),gt=new Set(It),F=z.map(Et=>({v:Et,count:Et.ids.filter(I=>gt.has(I)).length})).sort((Et,I)=>I.count-Et.count)[0],q=Math.hypot(Z,$),Q=Math.hypot(ot,Rt),it=q>.28?Wn(Z,$):Q>.03?Wn(ot,Rt):F?.count?F.v.forward:null,nt=it?Math.max(q>.28?Z*it.x+$*it.z:0,Q>.03?(ot*it.x+Rt*it.z)*.65:0,0):0,ft={center:O,forward:it,drive:nt,pressure:Q};k.push({ids:It,forward:it}),T.set(S,ft);for(const Et of C)E.set(Et.id,S)}),i.flockTravel=k;for(let C=0;C<x.length;C++){const S=x[C],U=v[C],A=Oe(S),O=bv(i,S,U),Z=O?.finished?null:O;O?.finished&&m.hold&&m.memberIds.has(S.id)&&(m.state.positions[S.id]={x:U.x,z:U.z});let $=0,ot=0,Rt=0,It=0,gt=0,F=0,q=0,Q=0;for(const X of v){if(X.id===S.id)continue;const tt=U.x-X.x,K=U.z-X.z,vt=Math.hypot(tt,K),st=Math.max(2,A+Oe(X)+.35);if(vt<st&&vt>.01){const xt=(st-vt)/vt;$+=tt*xt,ot+=K*xt}vt<18&&E.get(U.id)===E.get(X.id)&&P(U,X)&&(Rt+=X.x,It+=X.z,gt+=X.vx,F+=X.vz,q++)}let it=$*2.5,nt=ot*2.5;const ft=N.get(S.id),Et=ft.active,I=M.memberIds.has(S.id),jt=!m.hold&&m.memberIds.has(S.id)||I;if((Et||jt||Z)&&(delete S.wander,delete S.wanderHome),Et&&(it+=ft.x,nt+=ft.z,Q=ft.urgency,S.lastPlayerPressure=i.time),I){const X=M.forces.get(S.id);it+=X.x,nt+=X.z,Q=Math.max(Q,.45)}const Dt=!Z&&m.hold&&m.memberIds.has(S.id)&&Q<.03,Lt=()=>{S.wanderHome={x:U.x,z:U.z},delete S.wander};S.wander&&(i.time>=S.wander.until||!o.has(S.id))&&Lt();const wt=Fv(i,S,n);if(wt!==null&&Q<.03){const X=m.centroid||Lc(v),tt=Nv(i,S,wt,X,Et||jt||Dt||!!Z);tt&&(S.wander=tt)}let Yt=S.wander;if(Dt){const X=m.state.positions[S.id];it=wn((X.x-U.x)*2.6+$*.35,-1.1,1.1),nt=wn((X.z-U.z)*2.6+ot*.35,-1.1,1.1)}else{if(q&&!Yt&&!S.wanderHome&&!(I&&i.buddyHerd?.retrieveId===S.id)){const tt=Rt/q-U.x,K=It/q-U.z,vt=Math.hypot(tt,K),st=T.get(E.get(S.id)),xt=st.forward,Ct=xt&&(U.x-st.center.x)*xt.x+(U.z-st.center.z)*xt.z>.6;if(vt>2.6){const rt=Wn(tt,K),mt=Math.min(2.6,(vt-2.6)*.36)*.7*(1+r.cohesionBoost);let Ut=rt.x*mt,Tt=rt.z*mt;const ut=Ct?Math.min(0,Ut*xt.x+Tt*xt.z):0;ut&&(Ut-=xt.x*ut,Tt-=xt.z*ut),it+=Ut,nt+=Tt}if(it+=gt/q*.45,nt+=F/q*.45,Ct&&st.drive>.03&&!Et&&!I){const rt=Math.max(0,st.drive-it*xt.x-nt*xt.z);it+=xt.x*rt,nt+=xt.z*rt,st.pressure>.03&&(Q=Math.max(Q,Math.min(.35,st.pressure/5.2)))}}const X=f.get(S.id);if(X&&me(i,U.x+X.x*.7,U.z+X.z*.7,A)&&Mo(i,U,{x:U.x+X.x,z:U.z+X.z},A)&&(it+=X.x,nt+=X.z),Q<.03&&(it+=Math.sin(i.time*.6+S.id*2.1)*.12,nt+=Math.cos(i.time*.5+S.id*1.7)*.12),Yt){const tt=Yt.x-U.x,K=Yt.z-U.z,vt=Math.hypot(tt,K);vt>.35?(it+=tt/vt*(Yt.bolting?5.8:2.1),nt+=K/vt*(Yt.bolting?5.8:2.1)):(Lt(),Yt=null)}if(S.wanderHome&&!Et&&!jt){const tt=S.wanderHome,K=S.id*2.39996;it=(tt.x+Math.sin(i.time*.24+K)*1.4-U.x)*.35+$*.2,nt=(tt.z+Math.cos(i.time*.19+K)*1.4-U.z)*.35+ot*.2}}if(Q>.03&&!Z&&!Dt&&!S.wanderHome&&!Yt?.bolting){const X=I?M.forces.get(S.id):null,tt={x:(Et?ft.x:0)+(X?.x||0),z:(Et?ft.z:0)+(X?.z||0)};({x:it,z:nt}=Iv(i,S,U,v,{x:it,z:nt},tt,{x:$*2.5,z:ot*2.5}))}else delete S.chokeYield;if(Z){const X=wn($*Z.forward.z-ot*Z.forward.x,-.7,.7),tt=S.type==="cow"?2.7:3.2;it=Z.x*tt+Z.forward.z*X*.5,nt=Z.z*tt-Z.forward.x*X*.5,Q=Math.max(Q,.4)}if(Q>.03&&!Z){const X=of(i,S,it,nt,A);it+=X.x,nt+=X.z}const _t=S.wanderHome&&!Dt?.75:Yt?.bolting?6:S.type==="cow"?3.3:4.2,Ht=Math.hypot(it,nt);Ht>_t&&(it*=_t/Ht,nt*=_t/Ht);const de=1-Math.exp(-n*(Dt?12:S.type==="cow"?3.5:5.5));S.vx+=(it-S.vx)*de,S.vz+=(nt-S.vz)*de;const ae=!Dt&&S.wanderHome,D=ae&&Math.hypot(S.x+S.vx*n-ae.x,S.z+S.vz*n-ae.z)>3,y=$s(i,S,D?0:S.vx*n,D?0:S.vz*n,A);if((y.blockedX||y.blockedZ)&&Q>.03){const X=Wn(S.vx,S.vz),tt=Math.min(.24,Math.hypot(S.vx,S.vz)*n);for(const K of[Math.PI/6,-Math.PI/6,Math.PI/3,-Math.PI/3,Math.PI/2,-Math.PI/2]){const vt=(X.x*Math.cos(K)-X.z*Math.sin(K))*tt,st=(X.x*Math.sin(K)+X.z*Math.cos(K))*tt;if(me(i,S.x+vt,S.z+st,A)){$s(i,S,vt,st,A);break}}}y.blockedX&&(S.vx*=.45),y.blockedZ&&(S.vz*=.45),S.heading=Math.hypot(S.vx,S.vz)>.1?Math.atan2(S.vx,S.vz):S.heading||0,S.alert=Q,S.pushed=Et||I;const W=dr(t,i.target)<i.target.radius+12;n>0&&W&&!Dt&&gr(i.target,S,A)&&Mo(i,t,S)&&(S.saved=!0,S.vx=0,S.vz=0,delete S.wander,delete S.wanderHome,delete S.nextWanderCheck,delete S.wanderOpportunity,delete S.buddyNavigation,delete S.bridgeCrossing,delete S.chokeYield,delete S.lastBridge,delete S.pushed,a.push({type:"animalSaved",id:S.id,animalType:S.type}))}const G=Ic(i);for(const C of i.animals)!C.saved&&C.wander&&!G.has(C.id)&&(C.wanderHome={x:C.x,z:C.z},delete C.wander);const Y=i.animals.filter(C=>C.saved).length;if(a.some(C=>C.type==="animalSaved")&&!i.delivery?.started){const C=bd(i);i.delivery={started:!0,duration:C,remaining:C},a.push({type:"countdownStarted",duration:C})}return Y===i.animals.length&&Y>0?tu(i,"all-arrived",a,g):zc(i,a,!1,g)}function fr(){return{version:2,points:0,upgrades:{},completedLevels:[],bestScores:{},bestEarnedBolts:{},highestLevel:0,music:!0}}const hl=i=>80+i*25;function Hv(i){const t={};if(!i||typeof i!="object"||Array.isArray(i))return t;for(const[e,n]of Object.entries(i)){const s=Number(e);String(s)!==e||!Number.isInteger(s)||s<0||s>99||!Number.isFinite(n)||n<=0||(t[s]=wn(Math.floor(n),0,hl(s)),t[s]||delete t[s])}return t}function ul(i){const t=fr();if(!i||typeof i!="object")return t;t.points=Number.isFinite(i.points)?wn(Math.floor(i.points),0,1e9):0,t.upgrades=_d(i.upgrades);const e=[...new Set((Array.isArray(i.completedLevels)?i.completedLevels:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<=99))];if(t.bestEarnedBolts=Hv(i.bestEarnedBolts),i.version===void 0||i.version===1)for(const n of e)t.bestEarnedBolts[n]=hl(n);return t.bestScores={...t.bestEarnedBolts},t.completedLevels=Object.keys(t.bestEarnedBolts).map(Number).sort((n,s)=>n-s),t.highestLevel=wn(Math.max(Number.isInteger(i.highestLevel)?i.highestLevel:0,...t.completedLevels.map(n=>n+1)),0,99),t.music=i.music!==!1,t}function Wv(i,t){if(!t.completed||!Number.isInteger(t.index)||t.index<0||t.index>99)return 0;const e=t.result?.saved??t.animals.filter(o=>o.saved).length;if(e<=0||!t.animals.length)return 0;Object.assign(i,ul(i));const n=Math.min(hl(t.index),ll(t,e)),s=i.bestEarnedBolts[t.index]||0,r=Math.max(0,n-s);return i.bestScores[t.index]=Math.max(i.bestScores[t.index]||0,n),i.bestEarnedBolts[t.index]=Math.max(s,n),i.completedLevels.includes(t.index)||i.completedLevels.push(t.index),i.completedLevels.sort((o,a)=>o-a),i.highestLevel=Math.min(99,Math.max(i.highestLevel,t.index+1)),i.points+=r,r}function Xv(i,t="flock-foundry-v1"){try{return i||=globalThis.localStorage,ul(JSON.parse(i.getItem(t)))}catch{return fr()}}function qv(i,t,e="flock-foundry-v1"){try{return t||=globalThis.localStorage,t.setItem(e,JSON.stringify(ul(i))),!0}catch{return!1}}const tn=(i,t=0,e=1)=>Math.max(t,Math.min(e,i));function Yv(i){const t=Math.max(0,...(i.routes||[]).map(e=>Number.isFinite(e.length)?e.length:0));return tn(t/2+bd(i),45,240)}function Vs(i,t){let e=((i||0)^Math.imul(t,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),((e^e>>>15)>>>0)/4294967296}const eu=i=>i?.position?{x:i.position.x,z:i.position.z}:i,Zv=new Gt(4350794),$v=new Gt(5784367),Kv=new Gt(7714243);function Jv(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=tn(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function Ra(i,t){if(!me(i,t.x,t.z,.4))return!1;for(const e of i.rivers||[]){if(e.points.some((n,s)=>s&&Jv(t,e.points[s-1],n)<e.width/2+.8))return!1;for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,o=s*Math.sin(n.heading)+r*Math.cos(n.heading),a=s*Math.cos(n.heading)-r*Math.sin(n.heading);if(Math.abs(o)<n.length/2+.45&&Math.abs(a)<n.width/2+.45)return!1}}return!0}function jv(){const t=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=(n*64+s)*4,o=(Math.sin(n*.72+Math.sin(s*.31)*1.5)+Math.sin(n*1.37+s*.18))*.5,a=Math.round(145+o*28);t[r]=Math.round(a*.65),t[r+1]=a,t[r+2]=Math.min(255,a+24),t[r+3]=255}const e=new ju(t,64,64);return e.wrapS=e.wrapT=Zn,e.repeat.set(1,5),e.magFilter=e.minFilter=Mn,e.needsUpdate=!0,e}class Qv{constructor(t,{maxSplashes:e=12,maxPuddles:n=8}={}){this.scene=t,this.root=new Jt,this.root.name="Water and wetness effects",t.add(this.root),this.maxSplashes=Math.max(0,e|0),this.maxPuddles=Math.max(0,n|0),this.elapsed=0,this.wetness=0,this.level=null,this.flowMap=jv(),this.flowMaterial=new en({map:this.flowMap,color:9096146,transparent:!0,opacity:.16,depthWrite:!1,side:Ae}),this.splashGeometry=new Ao(.2,.025,4,12),this.splashes=[],this.puddles=[],this.materialSnapshots=[],this.riverSnapshots=[],this.lastMoverPositions=new Map,this.lastSplashAt=new Map}setLevel(t,{grassMaterials:e=[],pathMaterials:n=[],waterMaterial:s=null,terrain:r=null,rivers:o=[],weather:a=null}={}){this.restoreMaterials(),this.clearEffects(),this.level=t,this.terrain=r,this.rivers=o,this.wetness=0,this.elapsed=0,this.puddleGrowthDuration=Yv(t),this.rainElapsed=0,this.lastMoverPositions.clear(),this.lastSplashAt.clear();for(const[u,p]of[["grass",e],["path",n]])for(const d of Array.isArray(p)?p:[p])d?.color&&this.materialSnapshots.push({material:d,kind:u,color:d.color.clone(),roughness:d.roughness});this.waterSnapshot=s?{material:s,color:s.color?.clone(),roughness:s.roughness}:null;for(const u of o){if(!u?.mesh)continue;const p=u.mesh,d=this.flowMap.clone();d.repeat.set(1,1);const g=this.flowMaterial.clone();g.map=d,g.userData.ownedFlowMap=d;const x=p.geometry.clone(),m=x.attributes.position,f=x.attributes.uv,M=u.points;if(M?.length>1){for(let v=0;v<m.count;v++){const b=m.getX(v),w=m.getZ(v);let P=1/0,N=0,E=0,T=0;for(let z=1;z<M.length;z++){const k=M[z-1],G=M[z],Y=G.x-k.x,C=G.z-k.z,S=Math.hypot(Y,C);if(!S)continue;const U=tn(((b-k.x)*Y+(w-k.z)*C)/(S*S)),A=b-k.x-U*Y,O=w-k.z-U*C,Z=A*A+O*O;Z<P&&(P=Z,N=T+U*S,E=(-C*A+Y*O)/S),T+=S}f.setXY(v,E/Math.max(1,u.width||4),N/4)}f.needsUpdate=!0}const _=new ee(x,g);_.name="River flow",_.position.copy(p.position),_.position.y+=.003,_.rotation.copy(p.rotation),_.scale.copy(p.scale),_.frustumCulled=p.frustumCulled,_.userData.flow={heading:u.heading||0,speed:u.flowSpeed??.12,localUV:M?.length>1},this.root.add(_)}for(let u=0;u<this.maxSplashes;u++){const p=new en({color:13233904,transparent:!0,opacity:.78,depthWrite:!1}),d=new ee(this.splashGeometry,p);d.visible=!1,d.rotation.x=-Math.PI/2,this.root.add(d),this.splashes.push({mesh:d,material:p,age:1})}const c=new tl(1,20);this.puddleResources={geometry:c};const l=t.seed??t.index??0,h=Vs(l,71)<.5?0:1+Math.floor(Vs(l,72)*3);for(const u of this.findPuddleSites()){const p=new en({color:4549225,transparent:!0,opacity:.2,depthWrite:!1,side:Ae}),d=new ee(c,p);d.rotation.x=-Math.PI/2,d.visible=!1,d.position.set(u.x,Xn(t,u.x,u.z)+.024,u.z),d.scale.set(u.radius,u.radius*.62,1),this.root.add(d),this.puddles.push({mesh:d,material:p,depth:0,site:u,initialDepth:this.puddles.length<h?.1+Vs(l,80+this.puddles.length)*.1:0})}if(a){this.wetness=a.kind==="storm"?.6:a.kind==="heavy-rain"?.35:a.type==="rain"?.03:0;for(const u of this.puddles)u.depth=a.type==="rain"?u.initialDepth:0,this.applyPuddleAppearance(u);this.applySurfaceWeather(a)}}findPuddleSites(){const t=this.level,e=t.bounds,n=[],s=e.maxX-e.minX,r=e.maxZ-e.minZ,o=t.seed??t.index??0,a=(l,h)=>{const{x:u,z:p}=l,d=Array.from({length:48},(g,x)=>{const m=1+Math.floor(x/16),f=x%16*Math.PI/8;return{x:u+Math.cos(f)*h*m/3,z:p+Math.sin(f)*h*.62*m/3}});return!Ra(t,l)||d.some(g=>!Ra(t,g))||n.some(g=>Math.hypot(g.x-u,g.z-p)<g.radius+h+.3)?!1:(n.push({...l,radius:h}),!0)},c=(t.routes||[]).filter(l=>l.points?.length>1);for(let l=0;l<this.maxPuddles&&c.length;l++){const h=c[l%c.length],u=h.points,p=u.slice(1).map((m,f)=>Math.hypot(m.x-u[f].x,m.z-u[f].z)),d=p.reduce((m,f)=>m+f,0),g=1.35+Vs(o,150+l)*.69,x=l/Math.max(1,this.maxPuddles-1);for(let m=0;m<35;m++){let f=tn(x+(m<7?0:(Math.ceil((m-6)/7)%2?1:-1)*.035))*d,M=0;for(;M<p.length-1&&f>p[M];)f-=p[M++];const _=u[M],v=u[M+1],b=p[M]||1,w=tn(f/b),P=[0,2.5,-2.5,4,-4,6,-6][m%7]*(Vs(o,200+l)<.5?-1:1),N={x:_.x+(v.x-_.x)*w-(v.z-_.z)/b*P,z:_.z+(v.z-_.z)*w+(v.x-_.x)/b*P};if(a(N,g))break}}for(let l=1;l<Math.max(100,this.maxPuddles*80)&&n.length<this.maxPuddles;l++){const h=e.minX+2+l*.61803398875%1*Math.max(1,s-4),u=e.minZ+2+l*.75487766625%1*Math.max(1,r-4);a({x:h,z:u},1.35+l*37%70/100)}return n}applyPuddleAppearance(t){const e=Math.sqrt(t.depth);t.mesh.scale.set(t.site.radius*e,t.site.radius*.62*e,1),t.mesh.visible=t.depth>.008,t.material.opacity=t.mesh.visible?.18+t.depth*.24:0}restoreMaterials(){for(const t of this.materialSnapshots)t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color.dispose?.();if(this.materialSnapshots=[],this.waterSnapshot){const t=this.waterSnapshot;t.color&&t.material.color&&t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color?.dispose?.(),this.waterSnapshot=null}}clearEffects(){for(const t of this.splashes)this.root.remove(t.mesh),t.material.dispose();for(const t of this.puddles)this.root.remove(t.mesh),t.material.dispose();this.splashes=[],this.puddles=[],this.puddleResources&&(this.puddleResources.geometry.dispose(),this.puddleResources=null);for(const t of[...this.root.children])t.name==="River flow"&&(this.root.remove(t),t.material.userData.ownedFlowMap?.dispose(),t.material.dispose(),t.geometry.dispose())}applySurfaceWeather(t={}){const e=t.type==="rain"?tn(t.rainIntensity??t.intensity??0):0;for(const n of this.materialSnapshots){const s=this.wetness*(n.kind==="grass"?.62:.85);n.material.color.copy(n.color).lerp(n.kind==="grass"?Zv:$v,s),n.roughness!==void 0&&(n.material.roughness=Math.max(.28,n.roughness-this.wetness*.22))}if(this.waterSnapshot){const n=this.waterSnapshot,s=tn(t.cloudCoverage??0);n.material.color&&n.color&&n.material.color.copy(n.color).lerp(Kv,tn((t.rainIntensity??e)*.11+s*.035+(t.severity||0)*.025+(t.lightningFlash||0)*.09)),n.roughness!==void 0&&(n.material.roughness=tn(n.roughness-(t.rainIntensity??e)*.16,.12,1))}}update(t,{weather:e={},movers:n=[],paused:s=!1}={}){if(!this.level||s||!(t>0))return;t=Math.min(t,.1),this.elapsed+=t;const r=e.type==="rain"?tn(e.rainIntensity??e.intensity??0):0;this.wetness=tn(this.wetness+r*t*.012-t*(e.type==="sun"?.004:.0012)),this.applySurfaceWeather(e);for(const o of this.root.children)if(o.userData.flow){const a=o.userData.flow,c=o.material.map,l=t*(a.speed+(e.windIntensity||0)*.025);c.offset.x=(c.offset.x+(a.localUV?0:Math.sin(a.heading))*l)%1,c.offset.y=(c.offset.y+(a.localUV?1:Math.cos(a.heading))*l)%1,o.material.opacity=.08+r*.18+(e.daylight??.7)*.025+(e.lightningFlash||0)*.2}r>0&&(this.rainElapsed+=t);for(const o of this.puddles)o.depth=r>0?tn(o.initialDepth+(1-o.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):tn(o.depth-t*(e.type==="sun"?.006:8e-4)),this.applyPuddleAppearance(o);for(const o of n){const a=eu(o);if(!a||!Number.isFinite(a.x)||!Number.isFinite(a.z))continue;const c=o.id??o.kind??"mover",l=eu(o.previousPosition)||(Number.isFinite(o.previousX)?{x:o.previousX,z:o.previousZ}:this.lastMoverPositions.get(c)),h=l&&Math.hypot(a.x-l.x,a.z-l.z)>.008,u=this.puddles.find(p=>p.mesh.visible&&(a.x-p.site.x)**2/p.site.radius**2+(a.z-p.site.z)**2/(p.site.radius*.62)**2<p.depth);h&&u&&Ra(this.level,a)&&this.elapsed-(this.lastSplashAt.get(c)||-10)>.22&&(this.spawnSplash(a),this.lastSplashAt.set(c,this.elapsed)),this.lastMoverPositions.set(c,{x:a.x,z:a.z})}for(const o of this.splashes)o.age>=1||(o.age=Math.min(1,o.age+t*2.4),o.mesh.scale.setScalar(.4+o.age*2.3),o.mesh.position.y=.06+Xn(this.level,o.mesh.position.x,o.mesh.position.z)+o.age*.06,o.material.opacity=.78*(1-o.age),o.age>=1&&(o.mesh.visible=!1))}spawnSplash(t){const e=this.splashes.find(n=>n.age>=1);e&&(e.age=0,e.mesh.position.set(t.x,Xn(this.level,t.x,t.z)+.08,t.z),e.mesh.scale.setScalar(.35),e.mesh.visible=!0)}dispose(){this.restoreMaterials(),this.clearEffects(),this.root.removeFromParent(),this.flowMap.dispose(),this.flowMaterial.dispose(),this.splashGeometry.dispose(),this.level=null,this.scene=null}}const Td={sun:{rainIntensity:0,windIntensity:.12,severity:0,cloudCoverage:.22,daylight:1},wind:{rainIntensity:0,windIntensity:.6,severity:.3,cloudCoverage:.4,daylight:.96},rain:{rainIntensity:.3,windIntensity:.3,severity:.28,cloudCoverage:.5,daylight:.94},"heavy-rain":{rainIntensity:.65,windIntensity:.55,severity:.6,cloudCoverage:.7,daylight:.82},storm:{rainIntensity:.9,windIntensity:.85,severity:.88,cloudCoverage:.85,daylight:.7}};function dl(i,t){let e=(i^Math.imul(t+1,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),(e^e>>>15)>>>0}function tM(i,t,e){const n=e+1;if(n<=5)return"sun";const s=typeof i.weather=="string"?i.weather:i.weather?.kind||i.weather?.type,r=s==="light-rain"||s==="snow"?"rain":s;if(r&&Td[r])return r==="sun"||r==="wind"?r:n<9?"sun":r==="storm"&&n>=24?"storm":(r==="storm"||r==="heavy-rain")&&n>=16?"heavy-rain":"rain";if(n===9)return"rain";if(n===16)return"heavy-rain";if(n===24)return"storm";const o=dl(t,e)/4294967296;return n<9?o<.65?"sun":"wind":n<16?o<.35?"sun":o<.5?"wind":"rain":n<24?o<.25?"sun":o<.35?"wind":o<.65?"rain":"heavy-rain":o<.2?"sun":o<.3?"wind":o<.5?"rain":o<.75?"heavy-rain":"storm"}function Ad(i={}){const t=Number.isFinite(i.index)?Math.max(0,Math.floor(i.index)):0,e=Number.isFinite(i.seed)?i.seed>>>0:42,n=tM(i,e,t),s=Td[n];return{...s,kind:n,type:n==="heavy-rain"||n==="storm"?"rain":n,snowIntensity:0,storm:n==="storm",elapsed:0,seed:e,levelIndex:t,intensity:Math.max(s.rainIntensity,n==="wind"?s.windIntensity:0),wind:.2+s.windIntensity*1.6,particles:s.rainIntensity>0?128:0,lightningId:null,lightningAge:1/0,thunderDelay:.8,lightningFlash:0,clouds:0,butterflies:n==="storm"?0:s.rainIntensity>0?4:8,birds:n==="storm"?0:5,squirrels:n==="storm"?0:3,lightningStart:8+dl(e,t+1e3)%401/100,lightningInterval:24}}function eM(i,t){if(Number.isFinite(t)&&t>0&&(i.elapsed+=t),!i.storm)return i;const e=Math.floor((i.elapsed-i.lightningStart)/i.lightningInterval);return e<0||(i.lightningId=`${i.seed}:${i.levelIndex}:${e}`,i.lightningAge=Math.max(0,i.elapsed-(i.lightningStart+e*i.lightningInterval)),i.thunderDelay=.8+dl(i.seed,i.levelIndex+e+2e3)%9/10,i.lightningFlash=i.lightningAge<.22?.9*(1-i.lightningAge/.22):0),i}const er=(i,t,e)=>Math.max(t,Math.min(e,i)),yo=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),fl=i=>()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);function nM(i,t=Ad(i)){if(t.kind==="storm"||t.storm)return{squirrel:0,rabbit:0,bird:0,butterfly:0};const e=(i.bounds.maxX-i.bounds.minX)*(i.bounds.maxZ-i.bounds.minZ),n=fl((i.seed||42)^1464421444),s=er(e/3600,.55,2.4),r=(o,a)=>Math.min(a,Math.max(1,Math.round(o*s*(.78+n()*.44))));return{squirrel:r(2,7),rabbit:r(2,8),bird:Math.min(6,Math.max(2,Math.round(3*s))),butterfly:Math.min(8,Math.max(0,Math.round(5*s)))}}function iM(i,t){let e=1/0;for(const n of i.roads||[]){const s=n.points||[n.from,n.to];for(let r=1;r<s.length;r++){const o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,h=er(((t.x-o.x)*c+(t.z-o.z)*l)/(c*c+l*l||1),0,1);e=Math.min(e,Math.hypot(t.x-o.x-c*h,t.z-o.z-l*h))}}return e}const nu=new WeakMap;function sM(i,t){let e=nu.get(i);e||(e=new Map,nu.set(i,e));let n=e.get(t);if(!n||n.sourceRivers!==i.rivers||n.sourceObstacles!==i.obstacles||n.sourceFenceSegments!==i.fenceSegments||n.targetType!==i.target?.type){const s=i.bounds,r=(i.fenceSegments||[]).filter(o=>o.kind==="wall"||o.kind==="stone"||o.material==="stone"||o.kind==="target"&&i.target?.type==="barn");n={...i,sourceRivers:i.rivers,sourceObstacles:i.obstacles,sourceFenceSegments:i.fenceSegments,targetType:i.target?.type,fenceSegments:r,bounds:{minX:s.minX-t-1,maxX:s.maxX+t+1,minZ:s.minZ-t-1,maxZ:s.maxZ+t+1}},e.set(t,n)}return n}function pl(i,t,e=.45){const n=i.bounds;return t.x>=n.minX-e&&t.x<=n.maxX+e&&t.z>=n.minZ-e&&t.z<=n.maxZ+e&&me(sM(i,e),t.x,t.z,.4)}function rM(i,t,e=[],n=.45){return iM(i,t)>5.5&&pl(i,t,n)&&e.every(s=>yo(t,s)>8)}const oM={butterfly:.54,squirrel:.58,bird:.64,rabbit:.76};function aM(i,t){let e=null,n=18;for(const s of i.obstacles||[]){const r=yo(t,s);if(r>=n||r<.01)continue;const o=s.radius+.85,a=(t.x-s.x)/r,c=(t.z-s.z)/r,l={x:s.x+a*o,z:s.z+c*o};pl(i,l,.2)&&(e=l,n=r)}return e||{x:t.homeX,z:t.homeZ}}function cM(i){const t=fl(i.randomSeed||(Math.floor((i.phase||0)*1e6)^i.slot||1)>>>0);i.randomSeed=Math.floor(t()*4294967295)||1;const e=t()*Math.PI*2,n=3+t()*8;i.waypointX=i.homeX+Math.cos(e)*n,i.waypointZ=i.homeZ+Math.sin(e)*n,i.waitTimer=0}function lM(i,t,e,n=[],s=0,r=i.weather,o=pl){const a=typeof r=="function";if(a&&(o=r,r=i.weather),!(e>0))return t;const c=t.x,l=t.z,h=er(Number(r?.severity)||0,0,1),u=oM[t.kind]??.64;h>=u?t.sheltering=!0:h<u-.12&&(t.sheltering=!1);const p=t.kind==="bird"?10:t.kind==="butterfly"?6:7.5;let d=!1,g=0,x=0;for(const w of n){const P=yo(t,w);P<p&&(d=!0,g+=(t.x-w.x)/Math.max(.1,P)*(p-P),x+=(t.z-w.z)/Math.max(.1,P)*(p-P))}if(d)t.fleeing||(t.homeX=t.x,t.homeZ=t.z),t.waypointX=void 0,t.waypointZ=void 0,t.alertTimer=1.15,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,t.shelterX=void 0;else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.sheltering){if(t.shelterX===void 0){const w=aM(i,t);t.shelterX=w.x,t.shelterZ=w.z}t.shelter=Math.min(1,(t.shelter||0)+e*.32),g=t.shelterX-t.x,x=t.shelterZ-t.z}else if(t.shelter=Math.max(0,(t.shelter||0)-e*.48),t.hidden=t.shelter>=.995,t.shelterX!==void 0&&t.shelter===0&&(t.shelterX=void 0,t.shelterZ=void 0,t.waypointX=void 0),t.alertTimer>0)g=x=0;else if((t.waitTimer||0)>0)t.waitTimer=Math.max(0,t.waitTimer-e),g=x=0;else if(t.waypointX!==void 0&&yo(t,{x:t.waypointX,z:t.waypointZ})<.45){const w=fl(t.randomSeed||1);t.randomSeed=Math.floor(w()*4294967295)||1,t.waypointX=void 0,t.waypointZ=void 0,t.waitTimer=.55+w()*2.1,g=x=0}else t.waypointX===void 0&&cM(t),g=t.waypointX-t.x,x=t.waypointZ-t.z;let m=Math.hypot(g,x);if(d&&m<.01){const w=Number.isFinite(t.heading)?t.heading:t.phase||0;g=Math.sin(w),x=Math.cos(w),m=1}const f=t.kind==="rabbit",M=((t.gait||0)%1+1)%1,_=!f||M<.54;let v=d?t.kind==="bird"?5.2:f?4.2:3.5:t.kind==="squirrel"?.9:f?3.5:t.kind==="bird"?1.4:.8;t.sheltering&&!d&&(v=.95);const b=m>.01&&_?Math.min(m,e*v):0;if(b){const w=t.x+g/m*b,P=t.z+x/m*b,N=E=>a?o(i,E.x,E.z,.4):o(i,E,.45);t.kind==="bird"||N({x:w,z:P})?(t.x=w,t.z=P):N({x:w,z:t.z})?t.x=w:N({x:t.x,z:P})&&(t.z=P)}if(t.moving=Math.hypot(t.x-c,t.z-l)>.001,t.moving)t.heading=Math.atan2(t.x-c,t.z-l),t.stuckTimer=0;else if(b>.001&&(t.stuckTimer=(t.stuckTimer||0)+e,t.stuckTimer>=1)){const w=i.bounds;t.waypointX=t.x>w.maxX-.2?w.maxX-1.2:t.x<w.minX+.2?w.minX+1.2:er(t.homeX,w.minX+1.2,w.maxX-1.2),t.waypointZ=t.z>w.maxZ-.2?w.maxZ-1.2:t.z<w.minZ+.2?w.minZ+1.2:er(t.homeZ,w.minZ+1.2,w.maxZ-1.2),t.shelterX=void 0,t.shelterZ=void 0,t.stuckTimer=0,t.waitTimer=.2}return t.fleeing=d,t.alert=d||t.alertTimer>0,t.gait=(t.gait||0)+e*(d?1.8:f?1.35:t.kind==="squirrel"?1.7:1.2),t.hidden=t.shelter>=.995&&!d,t}const Rd={squirrel:[{part:"body",at:[0,.31,0],scale:[.2,.23,.32],color:"#a97552"},{part:"head",at:[0,.47,.2],scale:[.17,.17,.17],color:"#bd8960"},{part:"tail",at:[0,.48,-.34],scale:[.2,.31,.19],color:"#8e5b3e",tilt:-.48},{part:"ear",at:[-.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"ear",at:[.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"paw",at:[-.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"eye",at:[-.105,.5,.33],scale:[.025,.03,.018],color:"#171819"},{part:"eye",at:[.105,.5,.33],scale:[.025,.03,.018],color:"#171819"}],rabbit:[{part:"body",at:[0,.31,-.02],scale:[.25,.27,.34],color:"#d6c7aa"},{part:"haunch",at:[0,.25,-.23],scale:[.23,.23,.22],color:"#c4b08f"},{part:"head",at:[0,.48,.25],scale:[.17,.17,.17],color:"#e4d6bd"},{part:"ear",at:[-.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"ear",at:[.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"tail",at:[0,.34,-.4],scale:[.095,.1,.095],color:"#f0e9dc"},{part:"paw",at:[-.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"eye",at:[-.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"},{part:"eye",at:[.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"}]};function hM(i){const t=[],e=[],n=[],s=new zi(1,10,8).toNonIndexed(),r=s.getAttribute("position"),o=s.getAttribute("normal"),a=new Gt,c=new qt;for(const h of Rd[i]){if(h.part==="paw")continue;const u=new bn(h.tilt||0,0,0),p=new te().compose(new L(...h.at),new $n().setFromEuler(u),new L(...h.scale));c.getNormalMatrix(p),a.set(h.color);for(let d=0;d<r.count;d++){const g=new L().fromBufferAttribute(r,d).applyMatrix4(p),x=new L().fromBufferAttribute(o,d).applyMatrix3(c).normalize();t.push(g.x,g.y,g.z),e.push(x.x,x.y,x.z),n.push(a.r,a.g,a.b)}}s.dispose();const l=new ge;return l.setAttribute("position",new $t(t,3)),l.setAttribute("normal",new $t(e,3)),l.setAttribute("color",new $t(n,3)),l.computeBoundingSphere(),l}const uM={light:96,heavy:176,storm:256},dM={light:16,heavy:23,storm:30},Vn=1.25;class fM{constructor(t){this.root=new Jt,this.root.name="Visible rain",t.add(this.root),this.geometry=new ge,this.material=new Qu({color:"#e5f2f4",transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1}),this.lines=new Np(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=20,this.root.add(this.lines),this.randomState=8029,this.positions=new Float32Array(0),this.drops=[],this.active=0,this.fallbackCamera=new Ro(-30,30,20,-20,.1,180),this.fallbackCamera.position.set(0,36,29),this.fallbackCamera.lookAt(0,0,-2)}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}resize(t){t!==this.active&&(this.active=t,this.positions=new Float32Array(t*6),this.drops=Array.from({length:t},()=>({x:(this.random()*2-1)*Vn,y:(this.random()*2-1)*Vn})),this.geometry.setAttribute("position",new ke(this.positions,3)),this.geometry.setDrawRange(0,t*2))}update(t,{weather:e={},camera:n=this.fallbackCamera,paused:s=!1}={}){const r=e.kind||e.type,o=Math.max(0,Math.min(1,e.rainIntensity??e.intensity??0)),a=r==="storm"||e.severity>=.78?"storm":r==="heavy-rain"||o>=.68?"heavy":r==="rain"&&o>.02?"light":null;if(this.resize(a?uM[a]:0),!this.active)return;this.material.opacity=a==="light"?.48:a==="heavy"?.6:.7;const c=s?0:Math.min(.1,Math.max(0,Number(t)||0)),l=Math.max(-8,Math.min(8,e.windIntensity??e.wind??0)),h=dM[a],u=a==="storm"?(l<0?-1:1)*Math.max(10,Math.abs(l)*16):l*3,p=new L(u,-h,0),d=a==="light"?.8:a==="heavy"?1.3:1.8;n.updateMatrixWorld(!0);const x=new L(0,0,0).unproject(n).clone().add(p).project(n);for(let m=0;m<this.active;m++){const f=this.drops[m];f.x+=x.x*c,f.y+=x.y*c,f.y<-Vn&&(f.y+=Vn*2,f.x=(this.random()*2-1)*Vn),f.x>Vn&&(f.x-=Vn*2),f.x<-Vn&&(f.x+=Vn*2);const M=new L(f.x,f.y,0).unproject(n),_=M.clone().addScaledVector(p,d/h);M.toArray(this.positions,m*6),_.toArray(this.positions,m*6+3)}this.geometry.attributes.position.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose(),this.root.removeFromParent()}}const pM=(i,t,e)=>Math.max(t,Math.min(e,i));function mM(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}class gM{constructor(t){this.scene=t,this.root=new Jt,this.root.name="Meadow nature",t.add(this.root),this.resources=new Set,this.time=0,this.wildlife=[],this.batches={},this.transform=new ye}own(t){return this.resources.add(t),t}clear(){this.root.traverse(t=>{t.isInstancedMesh&&t.dispose()}),this.root.clear(),this.resources.forEach(t=>t.dispose()),this.resources.clear(),this.rainView?.dispose(),this.rainView=null,this.wildlife=[],this.batches={},this.precipitation=null}batch(t,e,n,s){const r=new oi(e,n,s);return r.instanceMatrix.setUsage(ds),r.frustumCulled=!1,this.root.add(r),this.batches[t]=r,r}setLevel(t){this.clear(),this.level=t,this.time=0,this.weather=Ad(t);const e=mM((t.seed||42)+71053),n=t.bounds,s=n.maxX-n.minX,r=n.maxZ-n.minZ,o=[t.dog||t.spawn,...t.animals||[]].filter(Boolean),a=this.own(new zi(1,10,8)),c=nM(t),l=["butterfly","bird","squirrel","rabbit"];for(const u of l){const p=c[u]||0;if(p)for(let d=0;d<p;d++){let g=null;for(let x=0;x<240;x++){const m=(t.roads||[]).flatMap(b=>b.points||[b.from,b.to]).filter(Boolean),f=x<120&&m.length?m[Math.floor(e()*m.length)]:null,M=e()*Math.PI*2,_=8+e()*13,v=f?{x:f.x+Math.cos(M)*_,z:f.z+Math.sin(M)*_}:{x:n.minX+2+e()*(s-4),z:n.minZ+2+e()*(r-4)};if(rM(t,v,o,.5)){g=v;break}}this.wildlife.push({kind:u,slot:d,x:g?.x??0,z:g?.z??0,homeX:g?.x??0,homeZ:g?.z??0,phase:e()*Math.PI*2,heading:e()*Math.PI*2,visible:!!g,gait:0,hidden:!1,hideTimer:0})}}const h={bird:["#54777b","#91adb0"],butterfly:["#65523f","#f2ac75"]};for(const u of["bird","butterfly"]){const p=c[u]||0;if(!p)continue;const[d,g]=h[u];this.batch(`${u}Body`,a,this.own(new oe({color:d,roughness:1})),p),this.batch(`${u}Wing`,a,this.own(new oe({color:g,roughness:1})),p*2)}for(const u of["squirrel","rabbit"]){const p=c[u]||0;if(!p)continue;this.batch(`${u}Body`,this.own(hM(u)),this.own(new oe({vertexColors:!0,roughness:.94})),p);const d=u==="squirrel"?"#74503b":"#b09b7c";this.batch(`${u}Paw`,a,this.own(new oe({color:d,roughness:.94})),p*2)}this.rainView=new fM(this.root),this.update(0,{dog:t.dog||t.spawn,animals:t.animals})}pose(t,e,n,s,r,o,a,c,l=0,h=0,u=0){const p=this.transform;p.position.set(n,s,r),p.rotation.set(u,l,h),p.scale.set(o,a,c),p.updateMatrix(),t.setMatrixAt(e,p.matrix)}hideParts(t){if(t.kind==="bird"||t.kind==="butterfly"){this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Wing`],t.slot*2+e,0,-100,0,0,0,0)}else{this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Paw`],t.slot*2+e,0,-100,0,0,0,0)}}update(t,{dog:e,animals:n=[],camera:s,paused:r=!1}={}){if(!this.level)return;t=r?0:pM(Number(t)||0,0,.1),this.time+=t,eM(this.weather,t);const o=this.time,a=[e,...n,...this.level.helpers||[]].filter(Boolean);for(const c of this.wildlife){if(lM(this.level,c,t,a,o,this.weather),!c.visible||c.hidden){this.hideParts(c);continue}const l=c.kind==="bird"||c.kind==="butterfly",h=c.kind==="squirrel",u=c.kind==="rabbit",p=((c.gait||0)%1+1)%1,d=p<.54,g=u&&c.moving&&d?Math.sin(p/.54*Math.PI)*.24:h&&c.moving?Math.abs(Math.sin(p*Math.PI*2))*.1:0,x=Math.max(.06,1-(c.shelter||0)*.94),m=(h?.12:u?.04:l?3.2:1)+Xn(this.level,c.x,c.z)+(l?Math.sin(o*(c.kind==="bird"?1.5:2)+c.phase)*.28:g)+(c.alert?.08:0);if(h||u){const f=u&&!d?.9:1,M=u&&d?-.14*Math.sin(p/.54*Math.PI):0,_=h&&c.moving?Math.sin(p*Math.PI*2)*.06:0;this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,x,x*f,x,c.heading,_,M);const v=Rd[c.kind].filter(b=>b.part==="paw");for(let b=0;b<v.length;b++){const w=v[b],P=c.moving?u&&d?Math.sin(p/.54*Math.PI)*.08:Math.sin(p*Math.PI*2+b*Math.PI)*.07:0,N=w.at[0],E=w.at[2],T=c.x+Math.cos(c.heading)*N+Math.sin(c.heading)*E,z=c.z-Math.sin(c.heading)*N+Math.cos(c.heading)*E;this.pose(this.batches[`${c.kind}Paw`],c.slot*2+b,T,m+w.at[1]*x+P,z,w.scale[0]*x,w.scale[1]*x,w.scale[2]*x,c.heading)}}else{this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,(c.kind==="bird"?.09:.075)*x,(c.kind==="bird"?.08:.06)*x,(c.kind==="bird"?.28:.12)*x,c.heading);for(let f=0;f<2;f++){const M=Math.sin(o*(c.kind==="bird"?11:18)+c.phase)*(c.kind==="bird"?.5:.85);this.pose(this.batches[`${c.kind}Wing`],c.slot*2+f,c.x+(f?1:-1)*.15,m+.04,c.z,.22*x,.025*x,.16*x,c.heading,(f?1:-1)*M)}}}for(const c of Object.values(this.batches))c.instanceMatrix.needsUpdate=!0;this.rainView?.update(t,{weather:this.weather,camera:s,paused:r})}dispose(){this.clear(),this.scene.remove(this.root),this.level=null}}const uo=0,xM=1,_M=new L,iu=new bm,Ca=new si,su=new L,to=new sn;class vM{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new ru,this.unassigned=new ru,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new MM(t[e]));this._compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){const s=n.geometry;if(s!==void 0){const r=s.attributes.position;if(r!==void 0)for(let o=0,a=r.count;o<a;o++){const c=new L;c.fromBufferAttribute(r,o).applyMatrix4(n.matrixWorld),e.push(c)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,s=e.length;n<s;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let s=-1/0,r=1/0;for(let o=0,a=n.length;o<a;o++){const c=n[o],l=c.distanceToPoint(t.origin),h=c.normal.dot(t.direction);if(l>0&&h>=0)return null;const u=h!==0?-l/h:0;if(!(u<=0)&&(h>0?r=Math.min(u,r):s=Math.max(u,s),s>r))return null}return s!==-1/0?t.at(s,e):t.at(r,e),e}intersectsRay(t){return this.intersectRay(t,_M)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}_removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}_removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}_deleteFaceVertices(t,e){const n=this._removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let s=n;do{const r=s.next;e.distanceToPoint(s.point)>this.tolerance?this._addVertexToFace(s,e):this.unassigned.append(s),s=r}while(s!==null)}return this}_resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const n=e.next;let s=this.tolerance,r=null;for(let o=0;o<t.length;o++){const a=t[o];if(a.mark===uo){const c=a.distanceToPoint(e.point);if(c>s&&(s=c,r=a),s>1e3*this.tolerance)break}}r!==null&&this._addVertexToFace(e,r),e=n}while(e!==null)}return this}_computeExtremes(){const t=new L,e=new L,n=[],s=[];for(let r=0;r<3;r++)n[r]=s[r]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let r=0,o=this.vertices.length;r<o;r++){const a=this.vertices[r],c=a.point;for(let l=0;l<3;l++)c.getComponent(l)<t.getComponent(l)&&(t.setComponent(l,c.getComponent(l)),n[l]=a);for(let l=0;l<3;l++)c.getComponent(l)>e.getComponent(l)&&(e.setComponent(l,c.getComponent(l)),s[l]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:s}}_computeInitialHull(){const t=this.vertices,e=this._computeExtremes(),n=e.min,s=e.max;let r=0,o=0;for(let p=0;p<3;p++){const d=s[p].point.getComponent(p)-n[p].point.getComponent(p);d>r&&(r=d,o=p)}const a=n[o],c=s[o];let l,h;r=0,iu.set(a.point,c.point);for(let p=0,d=this.vertices.length;p<d;p++){const g=t[p];if(g!==a&&g!==c){iu.closestPointToPoint(g.point,!0,su);const x=su.distanceToSquared(g.point);x>r&&(r=x,l=g)}}r=-1,Ca.setFromCoplanarPoints(a.point,c.point,l.point);for(let p=0,d=this.vertices.length;p<d;p++){const g=t[p];if(g!==a&&g!==c&&g!==l){const x=Math.abs(Ca.distanceToPoint(g.point));x>r&&(r=x,h=g)}}const u=[];if(Ca.distanceToPoint(h.point)<0){u.push(xn.create(a,c,l),xn.create(h,c,a),xn.create(h,l,c),xn.create(h,a,l));for(let p=0;p<3;p++){const d=(p+1)%3;u[p+1].getEdge(2).setTwin(u[0].getEdge(d)),u[p+1].getEdge(1).setTwin(u[d+1].getEdge(0))}}else{u.push(xn.create(a,l,c),xn.create(h,a,c),xn.create(h,c,l),xn.create(h,l,a));for(let p=0;p<3;p++){const d=(p+1)%3;u[p+1].getEdge(2).setTwin(u[0].getEdge((3-p)%3)),u[p+1].getEdge(0).setTwin(u[d+1].getEdge(1))}}for(let p=0;p<4;p++)this.faces.push(u[p]);for(let p=0,d=t.length;p<d;p++){const g=t[p];if(g!==a&&g!==c&&g!==l&&g!==h){r=this.tolerance;let x=null;for(let m=0;m<4;m++){const f=this.faces[m].distanceToPoint(g.point);f>r&&(r=f,x=this.faces[m])}x!==null&&this._addVertexToFace(g,x)}}return this}_reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];n.mark===uo&&t.push(n)}return this.faces=t,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const n=this.assigned.first().face;let s=n.outside;do{const r=n.distanceToPoint(s.point);r>e&&(e=r,t=s),s=s.next}while(s!==null&&s.face===n);return t}}_computeHorizon(t,e,n,s){this._deleteFaceVertices(n),n.mark=xM;let r;e===null?r=e=n.getEdge(0):r=e.next;do{const o=r.twin,a=o.face;a.mark===uo&&(a.distanceToPoint(t)>this.tolerance?this._computeHorizon(t,o,a,s):s.push(r)),r=r.next}while(r!==e);return this}_addAdjoiningFace(t,e){const n=xn.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}_addNewFaces(t,e){this.newFaces=[];let n=null,s=null;for(let r=0;r<e.length;r++){const o=e[r],a=this._addAdjoiningFace(t,o);n===null?n=a:a.next.setTwin(s),this.newFaces.push(a.face),s=a}return n.next.setTwin(s),this}_addVertexToHull(t){const e=[];return this.unassigned.clear(),this._removeVertexFromFace(t,t.face),this._computeHorizon(t.point,null,t.face,e),this._addNewFaces(t,e),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let t;for(this._computeInitialHull();(t=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(t);return this._reindexFaces(),this._cleanup(),this}}class xn{constructor(){this.normal=new L,this.midpoint=new L,this.area=0,this.constant=0,this.outside=null,this.mark=uo,this.edge=null}static create(t,e,n){const s=new xn,r=new Pa(t,s),o=new Pa(e,s),a=new Pa(n,s);return r.next=a.prev=o,o.next=r.prev=a,a.next=o.prev=r,s.edge=r,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return to.set(t.point,e.point,n.point),to.getNormal(this.normal),to.getMidpoint(this.midpoint),this.area=to.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class Pa{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class MM{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class ru{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class yM extends ge{constructor(t=[]){super();const e=[],n=[],r=new vM().setFromPoints(t).faces;for(let o=0;o<r.length;o++){const a=r[o];let c=a.edge;do{const l=c.head().point;e.push(l.x,l.y,l.z),n.push(a.normal.x,a.normal.y,a.normal.z),c=c.next}while(c!==a.edge)}this.setAttribute("position",new $t(e,3)),this.setAttribute("normal",new $t(n,3))}}function SM(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new ge;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let p=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(e){let h=0;const u=[];for(let p=0;p<i.length;++p){const d=i[p].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[p].attributes.position.count}c.setIndex(u)}for(const h in r){const u=ou(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let p=0;p<u;++p){const d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][p]);const g=ou(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function ou(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new ke(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let p=0,d=h.count;p<d;p++)for(let g=0;g<e;g++){const x=h.getComponent(p,g);a.setComponent(p+u,g,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function wM(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],p=["setX","setY","setZ","setW"];for(let M=0,_=a.length;M<_;M++){const v=a[M],b=i.attributes[v];c[v]=new b.constructor(new b.array.constructor(b.count*b.itemSize),b.itemSize,b.normalized);const w=i.morphAttributes[v];w&&(l[v]||(l[v]=[]),w.forEach((P,N)=>{const E=new P.array.constructor(P.count*P.itemSize);l[v][N]=new P.constructor(E,P.itemSize,P.normalized)}))}const d=t*.5,g=Math.log10(1/t),x=Math.pow(10,g),m=d*x;for(let M=0;M<r;M++){const _=n?n.getX(M):M;let v="";for(let b=0,w=a.length;b<w;b++){const P=a[b],N=i.getAttribute(P),E=N.itemSize;for(let T=0;T<E;T++)v+=`${~~(N[u[T]](_)*x+m)},`}if(v in e)h.push(e[v]);else{for(let b=0,w=a.length;b<w;b++){const P=a[b],N=i.getAttribute(P),E=i.morphAttributes[P],T=N.itemSize,z=c[P],k=l[P];for(let G=0;G<T;G++){const Y=u[G],C=p[G];if(z[C](o,N[Y](_)),E)for(let S=0,U=E.length;S<U;S++)k[S][C](o,E[S][Y](_))}}e[v]=o,h.push(o),o++}}const f=i.clone();for(const M in i.attributes){const _=c[M];if(f.setAttribute(M,new _.constructor(_.array.slice(0,o*_.itemSize),_.itemSize,_.normalized)),M in l)for(let v=0;v<l[M].length;v++){const b=l[M][v];f.morphAttributes[M][v]=new b.constructor(b.array.slice(0,o*b.itemSize),b.itemSize,b.normalized)}}return f.setIndex(h),f}function Cd(){const i=new Jt,t=new Set,e=new Set;return i.ownGeometry=n=>(t.add(n),n),i.ownMaterial=n=>(e.add(n),n),i.dispose=()=>{i.traverse(n=>{n.isInstancedMesh&&n.dispose()}),t.forEach(n=>n.dispose()),e.forEach(n=>n.dispose())},i}function bM(i=[]){const t=Cd(),e=t.ownMaterial(new oe({color:"#a97640",roughness:.9})),n=t.ownMaterial(new oe({color:"#4e594b",roughness:.7})),s=t.ownGeometry(new Sn(1,1,1)),r=[],o=new Map,a=(l,h,u,p,d,g,x)=>{let m=o.get(l);m||o.set(l,m=new Map);let f=m.get(x);f||m.set(x,f=[]),f.push({x:h,y:u,w:p,h:d,d:g})};for(const l of i.filter(h=>h.operable)){const h=new Jt;h.position.set(l.x,0,l.z),h.rotation.y=l.heading,t.add(h);for(const p of[-l.width/2,l.width/2])a(h,p,.85,.22,1.7,.3,n);const u=new Jt;u.name="gate-panel",h.add(u);for(const p of[.45,1.2])a(u,0,p,l.width,.15,.22,e);for(let p=0;p<=Math.ceil(l.width/1.2);p++)a(u,-l.width/2+l.width*p/Math.ceil(l.width/1.2),.82,.14,1.05,.19,e);a(u,l.width/2-.35,.85,.24,.28,.3,n),r.push({gate:l,panel:u})}const c=new te;for(const[l,h]of o)for(const[u,p]of h){const d=new oi(s,u,p.length);p.forEach((g,x)=>{c.makeScale(g.w,g.h,g.d),c.setPosition(g.x,g.y,0),d.setMatrixAt(x,c)}),d.castShadow=d.receiveShadow=!0,l.add(d)}return t.update=()=>{for(const{gate:l,panel:h}of r)h.position.x=l.open?-l.width:0},t.update(),t}function EM(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function TM(i){const t=[];for(let d=0;d<3;d++)for(const g of[-1,1])for(const x of[-.34,.34])for(const m of[-.34,.34]){const f=new L;f.setComponent(d,g*.5),f.setComponent((d+1)%3,x),f.setComponent((d+2)%3,m);const M=1+.13*Math.sin(f.x*11+f.y*7+f.z*9+i*2.7);f.multiplyScalar(M),f.x+=f.y*(i-1)*.16,t.push(f)}const e=new yM(t),n=e.attributes.position;for(let d=0;d<n.count;d++){const g=n.getX(d),x=n.getY(d),m=n.getZ(d),f=1+.06*Math.sin(g*8+x*5+m*7+i*2.3);n.setXYZ(d,g*f,x*f,m*f)}e.deleteAttribute("normal");const s=wM(e);e.dispose(),s.computeBoundingBox();const r=new L,o=new L;s.boundingBox.getSize(r),s.boundingBox.getCenter(o),s.translate(-o.x,-o.y,-o.z),s.scale(1/r.x,1/r.y,1/r.z),s.computeVertexNormals(),s.computeBoundingBox();const a=[],c=s.attributes.position,l=new Gt("#eee7d5"),h=new Gt("#68785a"),u=new Gt("#ffffff"),p=new Gt;for(let d=0;d<c.count;d++){const g=c.getX(d),x=c.getY(d),m=c.getZ(d),f=Math.sin(g*15+m*13+i*3)*Math.sin(x*11-m*9);p.copy(u).multiplyScalar(.91+.09*Math.sin(g*8+x*12+m*6+i)),f>.24&&p.lerp(l,(f-.24)*.42),x<-.05&&f<.3&&p.lerp(h,Math.min(.34,(-x+.05)*.55)),a.push(p.r,p.g,p.b)}return s.setAttribute("color",new $t(a,3)),s}function AM(i=[]){const t=Cd(),e=t.ownMaterial(new oe({color:"#ffffff",roughness:1,vertexColors:!0})),n=[[],[],[]],s=["#aba595","#c2b59d","#8b9189","#c5bfac","#969d97","#aaa99b","#858c7d","#b4a28d"];for(const d of i.filter(g=>g.material==="stone")){const{a:g,b:x}=d,m=Math.hypot(x.x-g.x,x.z-g.z);if(m<.001)continue;const f=EM(Math.round(g.x*997+g.z*7919+x.x*104729+x.z*1543)),M=-Math.atan2(x.z-g.z,x.x-g.x);for(let _=0;_<4;_++){const v=_===3,w=Math.max(1,Math.ceil(m/(v?.48:_===0?1.24:.98))),P=Array.from({length:w},()=>.45+f()*1.2),N=P.reduce((T,z)=>T+z,0);let E=0;for(const T of P){const z=m*T/N,k=E+z,G=(E+k)/2,Y=Math.max(1e-4,z-Math.min(.018,z*.08)),C=v?.19+f()*.2:.29+f()*.105,S=(f()-.5)*2*Math.min(.065,Y/(C*2)),U=Math.abs(Math.sin(S)),A=Math.cos(S),O=Math.max(1e-5,(Y-C*U)/A),Z=(O*U+C*A)/2,$=Math.sin(G*.79+g.x*.13+g.z*.17)*.035;n[Math.floor(f()*3)].push({x:g.x+(x.x-g.x)*G/m,z:g.z+(x.z-g.z)*G/m,yaw:M+(f()<.5?Math.PI:0),tilt:S,y:_===0?Z+.005:v?1.1+$+(f()-.5)*.055:.175+_*.325+$+(f()-.5)*.04,width:O,height:C,depth:(v?.43:.59-_*.055)*(.94+f()*.06),color:s[Math.floor(f()*s.length)]}),E=k}}}const r=new te,o=new $n,a=new $n,c=new L(0,1,0),l=new L(0,0,1),h=new L,u=new L,p=new Gt;for(const[d,g]of n.entries()){if(!g.length)continue;const x=new oi(t.ownGeometry(TM(d)),e,g.length);x.name="clay-drystone",g.forEach((m,f)=>{u.set(m.x,m.y,m.z),o.setFromAxisAngle(c,m.yaw).multiply(a.setFromAxisAngle(l,m.tilt)),h.set(m.width,m.height,m.depth),r.compose(u,o,h),x.setMatrixAt(f,r),x.setColorAt(f,p.set(m.color))}),x.castShadow=x.receiveShadow=!0,t.add(x)}return t}class RM{constructor(t,e,{halfExtent:n=t.radius+1.4,opacity:s=.7}={}){this.target=t,this.halfExtent=n,this.opacity=s,this.covered=new Set,this.disposed=!1,this.parts=e.map(r=>{const o=r.material,a=o.clone();return r.material=a,r.geometry.computeBoundingBox(),{mesh:r,original:o,material:a,shadow:r.castShadow,alpha:1}}),this.cameraLocal=new L,this.cameraDirection=new L,this.up=new L(0,1,0)}update(t,e,n){if(this.disposed||!Number.isFinite(n)||n<=0)return;t.updateMatrixWorld(!0),t.getWorldDirection(this.cameraDirection).negate(),this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));const s=new Set;Math.abs(this.cameraLocal.x)>.02&&s.add(this.cameraLocal.x>=0?"+x":"-x"),Math.abs(this.cameraLocal.z)>.02&&s.add(this.cameraLocal.z>=0?"+z":"-z");const r=this.target.heading||0,o=Math.cos(r),a=Math.sin(r),c=[],l=new Set(e);for(const u of this.covered)l.has(u)||this.covered.delete(u);for(const u of e){const p=u.x-this.target.x,d=u.z-this.target.z,g=p*o-d*a,x=p*a+d*o,m=u.type==="cow"?.65*_s(u):.4,f=this.halfExtent+m+(this.covered.has(u)?.18:0);Math.abs(g)<=f&&Math.abs(x)<=f?(this.covered.add(u),c.push({actor:u,radius:m})):this.covered.delete(u)}const h=-Math.expm1(-12*Math.min(n,.25));for(const u of this.parts){const{mesh:p,material:d}=u,x=c.length>0&&(p.userData.coverKind==="roof"||s.has(p.userData.coverSide))?this.opacity:1;u.alpha+=(x-u.alpha)*h,Math.abs(u.alpha-x)<.001&&(u.alpha=x),d.opacity=u.original.opacity*u.alpha;const m=u.alpha<1;d.transparent!==(m||u.original.transparent)&&(d.transparent=m||u.original.transparent,d.needsUpdate=!0),d.depthWrite=m?!1:u.original.depthWrite,p.castShadow=m?!1:u.shadow}}dispose(){if(!this.disposed){this.disposed=!0;for(const{mesh:t,original:e,material:n,shadow:s}of this.parts)t.material=e,t.castShadow=s,n.dispose();this.parts=[],this.covered.clear()}}}class CM{constructor(){this.centers={value:Array.from({length:4},()=>new L(0,-1e3,0))},this.buddyCenters={value:Array.from({length:4},()=>new L(0,-1e3,0))},this.buddyRadius={value:.4},this.radius={value:.54},this.strength={value:.85*.7},this.tint={value:new Gt("#39bfff")}}install(t){const e=t.onBeforeCompile,s=t.customProgramCacheKey.bind(t)();return t.onBeforeCompile=(r,o)=>{e.call(t,r,o),Object.assign(r.uniforms,{pipGlowCenters:this.centers,pipGlowRadius:this.radius,pipGlowTint:this.tint,pipGlowStrength:this.strength}),Object.assign(r.uniforms,{buddyGlowCenters:this.buddyCenters,buddyGlowRadius:this.buddyRadius}),r.vertexShader=`varying vec3 pipSurfaceWorld;
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
        totalEmissiveRadiance+=pipGlowTint*min(pipGlowAmount,1.0)*pipGlowStrength*smoothstep(0.45,0.9,pipWorldNormal.y);`)},t.customProgramCacheKey=()=>s+"|pip-ground-glow-v3",t.needsUpdate=!0,t}update(t,e,n=null){this.radius.value=.54*t.scale.x,t.userData.parts.pods.forEach((s,r)=>{const o=this.centers.value[r];o.copy(s),t.localToWorld(o),o.y=e(o.x,o.z)}),this.buddyRadius.value=.54*(n?.scale.x||.75),this.buddyCenters.value.forEach((s,r)=>{if(!n){s.set(0,-1e3,0);return}s.copy(n.userData.parts.pods[r]),n.localToWorld(s),s.y=e(s.x,s.z)})}}function au(i,t=.033){const e=new ge,n=an(i).corners;return e.setAttribute("position",new $t(n.flatMap(s=>[s.x,t,s.z]),3)),e.setAttribute("uv",new $t([0,0,1,0,1,1,0,1],2)),e.setIndex([0,1,2,0,2,3]),e.computeVertexNormals(),e}function PM(i,t=.26,e=.04){const n=an(i),s=Math.max(0,n.halfLength-t),r=Math.max(0,n.halfWidth-t),o=[[-s,-r],[s,-r],[s,r],[-s,r]].map(([l,h])=>Pi(i,l,h)),a=new ge,c=[];a.setAttribute("position",new $t([...n.corners,...o].flatMap(l=>[l.x,e,l.z]),3));for(let l=0;l<4;l++){const h=(l+1)%4;c.push(l,h,h+4,l,h+4,l+4)}return a.setIndex(c),a.computeVertexNormals(),a}function DM(i,t,e){const n=an(t).corners;i.fillStyle="#f9e7a2",i.strokeStyle="#fff0b5",i.lineWidth=1,i.beginPath(),n.forEach((s,r)=>{const o=e(s);r?i.lineTo(o.x,o.y):i.moveTo(o.x,o.y)}),i.closePath(),i.fill(),i.stroke()}const Xe=1e-9,eo=(i,t)=>i.x*t.z-i.z*t.x,Hs=(i,t)=>({x:i.x-t.x,z:i.z-t.z});function IM(i,t=0){const e=[],n=[],s=[];for(const d of i){const g=[];s.push(g);for(let x=0;x<d.length;x++){const m=d[x],f=d[(x+1)%d.length];if(n.push(m.x),Math.abs(m.x-f.x)>Xe){const M={a:m,b:f,min:Math.min(m.x,f.x),max:Math.max(m.x,f.x),id:e.length};e.push(M),g.push(M)}}}for(let d=0;d<e.length;d++)for(let g=d+1;g<e.length;g++){const x=e[d],m=e[g];if(x.max<=m.min||m.max<=x.min)continue;const f=Hs(x.b,x.a),M=Hs(m.b,m.a),_=eo(f,M);if(Math.abs(_)<Xe)continue;const v=Hs(m.a,x.a),b=eo(v,M)/_,w=eo(v,f)/_;b>Xe&&b<1-Xe&&w>Xe&&w<1-Xe&&n.push(x.a.x+b*f.x)}n.sort((d,g)=>d-g);const r=n.filter((d,g)=>!g||d-n[g-1]>Xe),o=[],a=[],c=(d,g)=>d.a.z+(g-d.a.x)*(d.b.z-d.a.z)/(d.b.x-d.a.x),l=(d,g,x)=>{[d,g,x]=[d,g,x].map(f=>({x:Math.fround(f.x),z:Math.fround(f.z)}));const m=eo(Hs(g,d),Hs(x,d));if(!(Math.abs(m)<Xe)){m>0&&([g,x]=[x,g]);for(const f of[d,g,x])o.push(f.x,t,f.z),a.push(f.x/4,f.z/4)}};let h=new Map;const u=[];for(let d=1;d<r.length;d++){const g=r[d-1],x=r[d],m=(g+x)/2,f=[];for(const v of s){const b=v.filter(w=>m>w.min&&m<w.max).sort((w,P)=>c(w,m)-c(P,m));b.length>=2&&f.push({low:b[0],high:b[b.length-1]})}f.sort((v,b)=>c(v.low,m)-c(b.low,m));const M=[];for(const v of f){const b=M[M.length-1];b&&c(v.low,m)<=c(b.high,m)+Xe?c(v.high,m)>c(b.high,m)&&(b.high=v.high):M.push({...v})}const _=new Map;for(const{low:v,high:b}of M){const w=`${v.id}:${b.id}`,P=h.get(w);P?(P.right=x,_.set(w,P),h.delete(w)):_.set(w,{low:v,high:b,left:g,right:x})}u.push(...h.values()),h=_}u.push(...h.values());for(const{low:d,high:g,left:x,right:m}of u){const f={x,z:c(d,x)},M={x:m,z:c(d,m)},_={x:m,z:c(g,m)},v={x,z:c(g,x)};l(f,M,_),l(f,_,v)}const p=new ge;return p.setAttribute("position",new $t(o,3)),p.setAttribute("uv",new $t(a,2)),p.computeVertexNormals(),p}function no(i,t,{ragged:e=!1,y:n=.008,seed:s=1}={}){let r=s,o=0;const a=i.map((h,u)=>(u&&(o+=Math.hypot(h.x-i[u-1].x,h.z-i[u-1].z)),r=r*1664525+1013904223>>>0,e?Math.sin(o*.72)*.11+(r/4294967296-.5)*.17:0)),c=[],l=[];for(let h=1;h<i.length;h++){const u=i[h-1],p=i[h],d=Math.hypot(p.x-u.x,p.z-u.z);if(d<Xe)continue;const g=-(p.z-u.z)/d,x=(p.x-u.x)/d,m=(_,v,b)=>({x:_.x+g*(t/2*b+v),z:_.z+x*(t/2*b+v)}),f=[m(u,a[h-1],-1),m(u,a[h-1],1)],M=[m(p,a[h],-1),m(p,a[h],1)];c.push([f[0],M[0],M[1],f[1]]),l[h-1]&&c.push([u,l[h-1][0],f[0]],[u,l[h-1][1],f[1]]),l[h]=M}return IM(c,n)}function LM(i,t){const e=[],n=[];for(let s=0;s<i.length;s++){const r=i[s],o=i[(s+1)%i.length],a=t(r),c=t(o);if(a>=-Xe&&e.push(r),a<=Xe&&n.push(r),a*c<-Xe*Xe){const l=a/(a-c),h={x:r.x+(o.x-r.x)*l,z:r.z+(o.z-r.z)*l};e.push(h),n.push(h)}}return[e,n].filter(s=>s.length>=3)}function cu(i,t,e=1,n=new ge){const r=(i.rivers||[]).flatMap(l=>l.bridges).filter(l=>Math.hypot(l.x-t.x,l.z-t.z)<l.length/2+l.width/2+1.1*e).map(l=>({...l,s:Math.sin(l.heading),c:Math.cos(l.heading),planks:Math.ceil(l.length/.3)})),o=(l,h)=>({x:(l.x-h.x)*h.c-(l.z-h.z)*h.s,z:(l.x-h.x)*h.s+(l.z-h.z)*h.c}),a=[];for(let l=0;l<64;l++){const h=(p,d)=>({x:t.x+Math.cos(p/64*Math.PI*2)*d*e,z:t.z+Math.sin(p/64*Math.PI*2)*d*e});let u=[[h(l,.9),h(l+1,.9),h(l+1,1.1),h(l,1.1)]];for(const p of r){const d=[g=>o(g,p).x-p.width/2,g=>o(g,p).x+p.width/2];for(let g=0;g<=p.planks;g++)d.push(x=>o(x,p).z-(-p.length/2+g*p.length/p.planks));for(const g of d)u=u.flatMap(x=>LM(x,g))}for(const p of u){const d=p.reduce((x,m)=>({x:x.x+m.x/p.length,z:x.z+m.z/p.length}),{x:0,z:0});let g=.055;for(const x of r){const m=o(d,x);if(Math.abs(m.x)<=x.width/2+Xe&&Math.abs(m.z)<x.length/2){const f=Math.min(x.planks-1,Math.floor((m.z/x.length+.5)*x.planks));g=Math.max(g,.18+.12*Math.sin((f+.5)/x.planks*Math.PI)+.04)}}for(let x=1;x<p.length-1;x++)for(const m of[p[0],p[x],p[x+1]])a.push(m.x,g,m.z)}}let c=n.getAttribute("position");return(!c||c.array.length<a.length)&&(c&&n.dispose(),c=new ke(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(a.length/3,1)))),3),c.setUsage(ds),n.setAttribute("position",c)),c.array.set(a),c.needsUpdate=!0,n.setDrawRange(0,a.length/3),n.boundingSphere=new fi(new L(t.x,.2,t.z),1.1*e+.4),n}const Da=new Map,Qe=10,lu=i=>new L(...i),hs=i=>[.07*Math.sin(i*1.8),i,.055*Math.sin(i*2.1)];function zM(i){const t=i.attributes.position,e=i.attributes.treeCenter,n=[0,1,2].map(()=>new Float32Array(t.count*3)),s=new L,r=new L,o=new L,a=new L,c=(h,u)=>new L().fromBufferAttribute(h,u),l=i.index.array;for(let h=0;h<l.length;h+=3){const[u,p,d]=l.slice(h,h+3),g=c(e,u),x=c(t,u).sub(g);s.copy(c(e,p)).sub(g),r.copy(c(e,d)).sub(g),o.copy(c(t,p)).sub(c(e,p)).sub(x),a.copy(c(t,d)).sub(c(e,d)).sub(x);const m=[s.clone().cross(r),s.clone().cross(a).add(o.clone().cross(r)),o.clone().cross(a)];for(let f=0;f<3;f++)for(const M of[u,p,d])n[f][M*3]+=m[f].x,n[f][M*3+1]+=m[f].y,n[f][M*3+2]+=m[f].z}n.forEach((h,u)=>i.setAttribute(`treeNormal${u}`,new ke(h,3)))}function UM(i=0){if(i=Math.abs(Math.floor(i))%3,Da.has(i))return Da.get(i);const t=[],e=[],n=[],s=[],r=[],o=[],a=(x,m)=>{const f=t.length/3;return t.push(...x),e.push(...m),f},c=(x,m,f)=>n.push(x,m,f),l=[{y:-.06,r:.62},{y:.16,r:.57},{y:.6,r:.49},{y:1.08,r:.4}];let h=.34;for(let x=0;x<4;x++){const m=1.56+.35*x,f=h*.6,M=h*.8,_=l.length;l.push({y:m-.12,r:h},{y:m+.12,r:M});const v=(x*4+i)%Qe;r.push({point:hs(m),parentRadius:h,childRadii:[M,f],lower:_,sector:v}),h=M*.89}l.push({y:2.94,r:.075},{y:3.12,r:.025});for(const{y:x,r:m}of l){const f=hs(x),M=[];for(let _=0;_<Qe;_++){const v=_*2*Math.PI/Qe,b=m+Math.max(0,1-(x+.06)/.3)*.14*Math.pow(Math.cos(v*2+i*.2),4);M.push(a([f[0]+b*Math.cos(v),x,f[2]+b*Math.sin(v)],f))}s.push(M)}for(let x=0;x<s.length-1;x++)for(let m=0;m<Qe;m++){const f=r.find(P=>P.lower===x);if(f&&(m-f.sector+Qe)%Qe<3)continue;const M=(m+1)%Qe,_=s[x][m],v=s[x][M],b=s[x+1][m],w=s[x+1][M];c(_,b,v),c(v,b,w)}const u=a(hs(l[0].y),hs(l[0].y)),p=a(hs(3.15),hs(3.15));for(let x=0;x<Qe;x++)c(s[0][x],s[0][(x+1)%Qe],u),c(s.at(-1)[(x+1)%Qe],s.at(-1)[x],p);for(const x of r){const{lower:m,sector:f,point:M,childRadii:_}=x,v=[];for(let G=0;G<=3;G++)v.push(s[m][(f+G)%Qe]);for(let G=3;G>=0;G--)v.push(s[m+1][(f+G)%Qe]);const b=(f+1.5)*2*Math.PI/Qe,w=new L(Math.cos(b),0,Math.sin(b)),P=new L(-Math.sin(b),0,Math.cos(b)),N=2.48+(M[1]-1.56)*.48,E=lu(M).addScaledVector(w,.54);E.y+=.08;const T=lu(M).addScaledVector(w,1.08);T.y=N;let z=v;x.branchRings=[],x.parentRing=s[m],x.continuingRing=s[m+1];for(let G=0;G<4;G++){const Y=G/3,C=E.clone().lerp(T,Y).addScaledVector(P,.065*Math.sin(Y*Math.PI));C.y-=.09*Math.sin(Y*Math.PI);const S=T.clone().sub(E).addScaledVector(P,.065*Math.PI*Math.cos(Y*Math.PI));S.y-=.09*Math.PI*Math.cos(Y*Math.PI),S.normalize();const U=P.clone(),A=U.clone().cross(S).normalize(),O=_[1]*(1-.78*Y),Z=[];for(let $=0;$<8;$++){const ot=-Math.PI*.625-$*Math.PI/4;Z.push(a(C.clone().addScaledVector(U,Math.sin(ot)*O).addScaledVector(A,Math.cos(ot)*O).toArray(),C.toArray()))}for(let $=0;$<8;$++){const ot=($+1)%8;c(z[ot],z[$],Z[$]),c(z[ot],Z[$],Z[ot])}x.branchRings.push({indices:Z,center:C.toArray(),radius:O}),z=Z}const k=a(T.clone().addScaledVector(T.clone().sub(E).normalize(),.025).toArray(),T.toArray());for(let G=0;G<8;G++)c(z[(G+1)%8],z[G],k);o.push(T.toArray())}const d=new ge;d.setAttribute("position",new $t(t,3)),d.setAttribute("treeCenter",new $t(e,3));const g=t.map((x,m)=>{const f=t[m-m%3],M=t[m-m%3+1],_=t[m-m%3+2];return .94+.035*Math.sin(f*16+Math.sin(M*2)+_*11)});return d.setAttribute("color",new $t(g,3)),d.setIndex(n),d.computeVertexNormals(),zM(d),d.computeBoundingBox(),d.computeBoundingSphere(),d.userData={forks:r,tips:o,trunkRings:s,trunkProfile:l},Da.set(i,d),d}function Pd(i){const t={value:1};i.userData.treeWidth=t,i.onBeforeCompile=e=>{e.uniforms.treeWidth=t,e.vertexShader=`attribute vec3 treeCenter;
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
vec3 objectNormal = normalize(treeNormal0 + woodWidth * treeNormal1 + woodWidth * woodWidth * treeNormal2);`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","vec3 transformed = treeCenter + woodWidth * (position - treeCenter);")},i.customProgramCacheKey=()=>"continuous-tree-v1"}const Ia=(i,t)=>Math.max(-t,Math.min(t,i)),La=Math.PI/180,Ws=(i,t,e,n)=>i+(t-i)*-Math.expm1(-e/n),Dd=i=>.05+Math.sin(i*Math.PI*2/2.4)*.04;function Id(){return{time:0,hover:Dd(0),headYaw:0,roll:0,pitch:0,turnRate:0,filteredSpeed:0,previous:null}}function NM(i,t,e){const n={x:t.x,z:t.z,heading:t.heading??Math.PI/2},s=Math.hypot(t.vx||0,t.vz||0);if(i.previous||(i.previous=n,i.filteredSpeed=s),!(e>0)||!Number.isFinite(e))return i;if(i.time+=e,i.hover=Dd(i.time),Math.hypot(n.x-i.previous.x,n.z-i.previous.z)>3)return i.headYaw=i.roll=i.pitch=i.turnRate=0,i.filteredSpeed=s,i.previous=n,i;const r=n.heading-i.previous.heading,o=Math.atan2(Math.sin(r),Math.cos(r))/e;i.turnRate=Ws(i.turnRate,o,e,.12);const a=-Ia(i.turnRate/Math.max(1,s)*Math.min(1,s)*.28,20*La);i.roll=Ws(i.roll,a,e,.2),i.headYaw=Ws(i.headYaw,Ia(i.turnRate*.2,30*La),e,.09);const c=Ws(i.filteredSpeed,s,e,.18),l=(c-i.filteredSpeed)/e;return i.filteredSpeed=c,i.pitch=Ws(i.pitch,-Ia(l/6,1)*10*La,e,.22),i.previous=n,i}const xs=new Map,FM={TorusGeometry:Ao,SphereGeometry:zi,BoxGeometry:Sn,CylinderGeometry:Rs,ConeGeometry:cr},un=new Map;let we;function OM(i){return .7+.2*Math.max(0,Math.min(1,(i-1.015)/(3.1-1.015)))}function In(i){i.updateMatrixWorld(!0);const t=new Map;i.traverse(n=>{n.isMesh&&(t.has(n.material)||t.set(n.material,[]),t.get(n.material).push(n.geometry.clone().applyMatrix4(n.matrixWorld)))});const e=new Jt;e.name=i.name,e.userData.parts={};for(const[n,s]of t){const r=SM(s,!1);s.forEach(a=>a.dispose());const o=new ee(r,n);o.castShadow=o.receiveShadow=!0,e.add(o)}return e}function Ld(i,t){const e=In(t);return un.set(i,e),e.clone()}function Do(i,t){const e=`${i}:${t.join(",")}`;return xs.has(e)||xs.set(e,new FM[i](...t)),xs.get(e)}function BM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){const r=224+(s*13+(s>>>5)*7)%27;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);const n=new Bi(i);return n.wrapS=n.wrapT=Zn,n.repeat.set(2,2),n.colorSpace=Pe,n}function kM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.38+Math.sin(s*.051)*1.7),a=Math.sin(Math.hypot(r-78,(s-45)*.4)*.38),c=Math.round(227+o*12+a*4+(r*7+s*11)%7),l=(s*128+r)*4;e.data[l]=e.data[l+1]=e.data[l+2]=c,e.data[l+3]=255}t.putImageData(e,0,0);const n=new Bi(i);return n.wrapS=n.wrapT=Zn,n.colorSpace=Pe,n}function GM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.31+Math.sin(s*.045)*1.65)*8+Math.sin(r*.11+Math.sin(s*.021)*2.6)*5,a=Math.sin(Math.hypot(r-35,(s-74)*.15)*.46)*4,c=(r*17+s*31+r*s%29)%9-4,l=Math.max(0,Math.min(255,Math.round(132+o+a+c))),h=(s*128+r)*4;e.data[h]=l,e.data[h+1]=l,e.data[h+2]=l,e.data[h+3]=255}t.putImageData(e,0,0);const n=new Bi(i);return n.wrapS=n.wrapT=Zn,n.repeat.set(1.2,1.7),n}function VM(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128),n=[[188,203,148],[210,207,153],[164,191,137],[223,207,155],[154,184,133]];for(let r=0;r<128;r++)for(let o=0;o<128;o++){const a=Math.sin(o*.17+Math.sin(r*.11)*1.4)+Math.cos(r*.19-o*.07),c=(o*17+r*31+o*r%29)%13-6,l=n[(Math.floor((a+2)*1.25)+Math.floor(o/19)+Math.floor(r/23))%n.length],h=(r*128+o)*4;e.data[h]=Math.max(0,Math.min(255,l[0]+c)),e.data[h+1]=Math.max(0,Math.min(255,l[1]+c)),e.data[h+2]=Math.max(0,Math.min(255,l[2]+c)),e.data[h+3]=255}t.putImageData(e,0,0);const s=new Bi(i);return s.wrapS=s.wrapT=Zn,s.colorSpace=Pe,s}function zn(){if(we)return we;const i=BM(),t=o=>new oe({color:o,roughness:.9,map:i}),e=o=>new oe({color:o,roughness:.55,metalness:.18,map:i});we={cream:e("#f5ead3"),white:e("#fff8e7"),dark:e("#354b55"),brass:new oe({color:"#ddb469",roughness:.48,metalness:.62}),orange:e("#e6a04e"),dogCream:e("#ffe5ac"),rust:e("#c7704d"),cyan:new oe({color:"#b6fbff",emissive:"#69dfe9",emissiveIntensity:.8,roughness:.32}),mint:e("#84cbb7"),black:e("#20343e"),wood:t("#ba9167"),paleWood:t("#e1bb87"),bark:t("#8b7758"),leaves:t("#8cbd8b"),leavesLight:t("#b8d28f"),leavesDark:t("#619b84"),roof:t("#bf755f"),barn:t("#d9977e"),barnTrim:t("#fae7c2"),flowerPink:t("#f2a6a6"),flowerYellow:t("#ffe28a"),flowerWhite:t("#fff7e5"),flowerCenter:t("#daa661"),stem:t("#7fab72"),stone:t("#abb7a4")},we.eye=we.white,we.pupil=we.black;const n=kM();for(const o of["wood","paleWood"])we[o].map=n;const s=GM();we.bark.map=we.bark.bumpMap=s,we.bark.bumpScale=.055,we.treeWood=we.bark.clone(),we.treeWood.map=we.treeWood.bumpMap=null,we.treeWood.vertexColors=!0,Pd(we.treeWood);const r=VM();for(const o of["leaves","leavesLight","leavesDark"])we[o].map=r;return we.leaves.needsUpdate=we.leavesLight.needsUpdate=we.leavesDark.needsUpdate=!0,we}function Es(i,t,e,n,s=[0,0,0],r=[1,1,1]){const o=new ee(Do(t,e),n);return o.position.set(...s),o.scale.set(...r),o.castShadow=!0,o.receiveShadow=!0,i.add(o),o}function Ot(i,t,e,n,s=10){return Es(i,"SphereGeometry",[1,s,6],t,e,n)}function qe(i,t,e,n,s=.025,r=10){const o=`sculpted-sphere:${s}:${r}`;if(!xs.has(o)){const c=Do("SphereGeometry",[1,r,Math.max(3,Math.round(r*.6))]).clone(),l=c.attributes.position;for(let h=0;h<l.count;h++){const u=l.getX(h),p=l.getY(h),d=l.getZ(h),g=1+s*Math.sin(u*4.1+d*2.8)*Math.cos(p*3.7-d*1.3);l.setXYZ(h,u*g,p*g,d*g)}c.computeVertexNormals(),xs.set(o,c)}const a=new ee(xs.get(o),t);return a.position.set(...e),a.scale.set(...n),a.castShadow=a.receiveShadow=!0,i.add(a),a}function ze(i,t,e,n){return Es(i,"BoxGeometry",[1,1,1],t,e,n)}function Fe(i,t,e,n,s,r){const o=Es(i,"CylinderGeometry",[n,n,s,10],t,e);return r&&o.rotation.set(...r),o}function Ui(i,t,e,n,s,r=.105){Ot(i,t.eye,[e,n,s],[r,r*1.08,r*.55]),Ot(i,t.pupil,[e,n-r*.05,s+r*.45],[r*.43,r*.58,r*.23]),Ot(i,t.white,[e-r*.14,n+r*.2,s+r*.67],[r*.15,r*.15,r*.12],8)}function HM(i,t,e,n,s=t.brass){return Ot(i,s,e,n)}function io(i,t,e,n,s,r=t.dark){const o=new Jt;return o.position.set(e,s+.1,n),i.add(o),Ot(o,t.brass,[0,0,0],[.105,.105,.105]),Fe(o,t.dark,[0,-s*.45,0],.065,s*.85),Ot(o,t.brass,[0,-s*.72,0],[.078,.078,.078]),Ot(o,r,[0,-s+.025,.055],[.115,.1,.17]),o}function WM(){const i=zn(),t=new Jt,e=new Jt,n=new oe({color:"#dce4e5",metalness:.45,roughness:.55}),s=new oe({color:"#9caaae",metalness:.55,roughness:.45});ze(t,n,[0,.83,-.06],[.62,.51,.92]),ze(t,s,[0,1.095,-.08],[.64,.035,.8]);for(const x of[-1,1]){ze(t,s,[x*.315,.84,-.08],[.016,.018,.84]),ze(t,s,[x*.316,.84,-.13],[.018,.48,.018]);for(const m of[-.43,.28])for(const f of[.64,1.03])Ot(t,i.brass,[x*.327,f,m],[.025,.025,.025])}Fe(t,i.dark,[0,1.03,.38],.21,.18,[Math.PI/2,0,0]),ze(e,n,[0,1.32,.47],[.57,.45,.43]),ze(e,i.dark,[0,1.35,.696],[.49,.25,.025]);const r=ze(e,n,[0,1.15,.79],[.49,.25,.45]);r.rotation.x=-.18,ze(e,s,[0,.99,.8],[.46,.04,.42]),Ot(e,i.black,[0,1.2,1.025],[.1,.095,.085]),Ui(e,i,-.135,1.36,.72,.109),Ui(e,i,.135,1.36,.72,.109);for(const x of[-1,1]){const m=ze(e,n,[x*.28,1.69,.43],[.22,.4,.12]);m.rotation.z=x*-.42,ze(m,i.dark,[0,0,.52],[.68,.75,.12])}const o=[];for(const x of[-.3,.3])for(const m of[-.35,.29])ze(t,n,[x,.64,m],[.23,.43,.27]),Fe(t,s,[x*1.35,.78,m],.105,.06,[0,0,Math.PI/2]),Fe(t,i.dark,[x,.39,m],.12,.09),Fe(t,s,[x,.335,m],.13,.05),o.push(new L(x,.3,m));const a=new Jt,c=new Jt;a.name="Pip the hovering robot sheepdog",c.name="Pip floating body rig",a.add(c);const l=In(t),h=In(e);l.position.y=-.83,h.position.set(0,1.03-.83,.38);for(const x of h.children)x.geometry.translate(0,-1.03,-.38);c.position.y=.83,c.add(l,h),c.traverse(x=>{x.isMesh&&(x.userData.ownedGeometry=!0,(x.material===n||x.material===s)&&(x.userData.ownedMaterial=!0))});const u=new Jt;u.position.set(0,.94-.83,-.52),c.add(u);for(let x=0;x<7;x++)Fe(u,x%2?i.dark:s,[0,.04+x*.05,-x*.035],.035,.055,[-.6,0,0]);const p=new oe({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),d=Ot(u,p,[0,.41,-.27],[.075,.075,.075]);d.userData.ownedMaterial=!0;const g=o.map(x=>Array.from({length:3},(m,f)=>{const M=new en({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),_=new ee(Do("TorusGeometry",[.135,.014,6,24]),M);return _.name=`Pip thruster ring ${f+1}`,_.rotation.x=Math.PI/2,_.userData.ownedMaterial=!0,a.add(_),_}));return a.userData.parts={body:l,rig:c,head:h,legs:[],tail:u,tailLight:d,basePods:o.map(x=>x.clone().add(new L(0,-.83,0))),pods:o,rings:g},a.userData.motion=Id(),So(a,{x:0,z:0,heading:0,vx:0,vz:0},0),a.userData.motion.previous=null,a.userData.hover={time:0,previous:null,trails:[]},a}function XM(){const i=zn(),t=new Jt,e=new Jt,n=[],s=new oe({color:"#d4dfe0",metalness:.28,roughness:.68}),r=new oe({color:"#eee5d5",metalness:.12,roughness:.82}),o=new oe({color:"#b8b1a7",metalness:.24,roughness:.72}),a=new oe({color:"#4a4a43",metalness:.08,roughness:.6});qe(t,s,[0,.83,-.08],[.3,.27,.42],.012,12),ze(t,r,[0,.78,.27],[.39,.27,.28]),ze(t,o,[0,.61,.31],[.3,.045,.19]);for(const _ of[-1,1]){const v=Ot(t,o,[_*.275,.84,-.02],[.055,.16,.19]);v.rotation.z=_*-.12;for(const b of[-.31,.25])Ot(t,a,[_*.25,.81,b],[.025,.025,.025],8)}Fe(t,i.dark,[0,1,.31],.15,.15,[Math.PI/2,0,0]),qe(e,s,[0,1.31,.43],[.3,.31,.28],.01,14);for(const _ of[-1,1])Fe(e,a,[_*.135,1.36,.676],.117,.032,[Math.PI/2,0,0]),Ot(e,i.white,[_*.135,1.36,.704],[.088,.098,.043],12),Ot(e,i.black,[_*.135,1.35,.744],[.047,.058,.024],10),Ot(e,i.white,[_*.115,1.381,.764],[.018,.019,.012],8);qe(e,r,[0,1.145,.68],[.235,.135,.18],.006,12),Ot(e,i.black,[0,1.188,.835],[.078,.067,.055],10);const c=Es(e,"ConeGeometry",[1,1,3],s,[-.255,1.68,.4],[.14,.25,.065]);c.rotation.z=-.16,Es(e,"ConeGeometry",[1,1,3],o,[.27,1.57,.4],[.21,.14,.07]).rotation.set(0,0,Math.PI/2+.22),ze(e,i.dark,[.28,1.53,.459],[.13,.075,.018]);const h=[];for(const _ of[-.29,.29])for(const v of[-.3,.25]){qe(t,s,[_,.59,v],[.14,.24,.16],.006,10),Fe(t,o,[_,.72,v],.084,.055,[0,0,Math.PI/2]),Fe(t,i.dark,[_,.37,v],.105,.075);const b=new oe({color:"#7cecff",emissive:"#27c8ff",emissiveIntensity:1.1,roughness:.35});n.push(b);const w=Ot(t,b,[_,.325,v],[.112,.052,.112],10);w.userData.ownedMaterial=!0,h.push(new L(_,.3,v))}const u=new Jt,p=new Jt;u.name="Buddy the hovering robot puppy",p.name="Buddy floating body rig",u.add(p);const d=In(t),g=In(e);d.position.y=-.83,g.position.set(0,1.03-.83,.38);for(const _ of g.children)_.geometry.translate(0,-1.03,-.38);p.position.y=.83,p.add(d,g),p.traverse(_=>{_.isMesh&&(_.userData.ownedGeometry=!0,[s,r,o,a,...n].includes(_.material)&&(_.userData.ownedMaterial=!0))});const x=new Jt;x.name="Buddy spring tail",x.position.set(0,.89-.83,-.47),p.add(x);for(let _=0;_<6;_++){const v=Fe(x,_%2?i.dark:o,[0,.035+_*.047,-_*.032],.034,.052,[-.62,0,0]);v.name=`Buddy tail spring segment ${_+1}`}const m=new oe({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.45,roughness:.28}),f=Ot(x,m,[0,.32,-.205],[.071,.071,.071]);f.name="Buddy blue tail light",f.userData.ownedMaterial=!0;const M=h.map(_=>Array.from({length:3},(v,b)=>{const w=new en({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),P=new ee(Do("TorusGeometry",[.125,.013,6,24]),w);return P.name=`Buddy hover ring ${b+1}`,P.rotation.x=Math.PI/2,P.userData.ownedMaterial=!0,u.add(P),P}));return u.userData.parts={body:d,rig:p,head:g,legs:[],tail:x,tailLight:f,basePods:h.map(_=>_.clone().add(new L(0,-.83,0))),pods:h,rings:M},u.userData.motion=Id(),So(u,{x:0,z:0,heading:0,vx:0,vz:0},0),u.userData.motion.previous=null,u.userData.hover={time:0,previous:null,trails:[]},u.userData.suggestedScale=.82,u.userData.modelContract="pip-pose-hover-v1",u}function So(i,t,e){const n=NM(i.userData.motion,t,e),s=i.userData.parts;s.rig.position.y=.83+n.hover,s.rig.rotation.set(n.pitch,0,n.roll),s.head.rotation.y=n.headYaw,s.rig.updateMatrix(),s.pods.forEach((r,o)=>r.copy(s.basePods[o]).applyMatrix4(s.rig.matrix))}function hu(i,t){const e=i.userData.hover;if(!e)return;i.updateMatrixWorld(!0);const n=i.userData.parts.pods.map(r=>i.localToWorld(r.clone()));(!e.previous||i.position.distanceTo(e.previous)>3)&&(e.trails=n.map(r=>r.clone())),t>0&&(e.time+=t);for(let r=0;r<n.length;r++){t>0&&e.trails[r].lerp(n[r],1-Math.exp(-t/.13));const o=e.time/.55%1;for(let a=0;a<3;a++){const c=i.userData.parts.rings[r][a],l=n[r].clone().lerp(e.trails[r],a===0?0:(a-1+o)/2),h=i.worldToLocal(l);h.y=i.userData.parts.pods[r].y-.055-(a===0?0:(a-1+o)*.1+.055),c.position.copy(h),c.material.opacity=a===0?.95:a===1?.85*Math.min(1,o/.15):.85*(1-o),c.scale.setScalar(1+(a===0?0:(a-1+o)*.15))}}e.previous=i.position.clone()}const qM=[[[.11,.47,.105,.25],[.38,.42,.14,.31],[.65,.52,.12,.28],[.87,.43,.13,.3],[.52,.88,.09,.14]],[[.06,.36,.13,.22],[.29,.6,.095,.33],[.56,.36,.17,.27],[.85,.65,.1,.25],[.68,.87,.08,.12]],[[.15,.65,.16,.25],[.43,.34,.11,.24],[.68,.62,.18,.32],[.94,.3,.08,.18],[.35,.86,.07,.12]],[[.02,.58,.1,.31],[.25,.34,.16,.23],[.51,.65,.12,.28],[.78,.38,.15,.32],[.91,.84,.06,.11]]],za=[];function YM(i,t){let e=0;for(const s of String(t))e=Math.imul(e^s.charCodeAt(0),16777619);let n=(i^e^1129267540)>>>0;return n=Math.imul(n^n>>>16,2246822507),n=Math.imul(n^n>>>13,3266489909),(n^n>>>16)>>>30}function zd(i=0){if(!Number.isInteger(i)||i<0||i>3)throw new RangeError("Unknown cow coat variant");if(za[i])return za[i];const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d"),n=e.createImageData(256,128),s=qM[i];for(let a=0;a<128;a++)for(let c=0;c<256;c++){const l=c/256,h=a/128,p=s.some(([x,m,f,M])=>{const _=Math.min(Math.abs(l-x),1-Math.abs(l-x))/f,v=(h-m)/M,b=Math.atan2(v,_);return _*_+v*v<1+.19*Math.sin(b*3+x*30)+.1*Math.cos(b*5+m*12)})?[49,48,46]:[238,228,204],d=(c*13+a*7)%9-4,g=(a*256+c)*4;for(let x=0;x<3;x++)n.data[g+x]=p[x]+d;n.data[g+3]=255}e.putImageData(n,0,0);const r=new Bi(t);r.colorSpace=Pe;const o=new oe({color:"#ffffff",map:r,roughness:.94});return o.userData.cowCoatVariant=i,za[i]=o,o}function ZM(i){const t=new Jt;t.name="Clay Holstein cow";const e=h=>new oe({color:h,roughness:.94,map:i.cream.map}),n=e("#d99f91"),s=e("#704c49"),r=e("#e4d1ae"),o=zd();qe(t,o,[0,.54,0],[.32,.34,.4875],.025,20);const a=new Jt;a.position.set(0,.73,.4175),t.add(a),qe(a,i.cream,[0,-.015,.065],[.215,.225,.215],.018,16),qe(a,i.dark,[0,.065,.055],[.205,.205,.18],.018,16),Ot(a,i.cream,[0,-.055,.21],[.095,.15,.065],16),Ot(a,n,[0,-.115,.255],[.224,.115,.125],16),Ot(a,s,[0,-.203,.245],[.145,.012,.06],12),Ot(a,n,[0,-.215,.237],[.157,.026,.065],12);for(const h of[-1,1]){Ui(a,i,h*.087,.075,.207,.068),Ot(a,i.dark,[h*.086,.133,.2],[.078,.026,.043],12);const u=Ot(a,i.dark,[h*.255,.09,.005],[.139,.065,.08],14);u.rotation.z=h*.28;const p=Ot(a,s,[h*.265,.096,.055],[.09,.037,.023],12);p.rotation.z=h*.28;const d=Ot(a,s,[h*.115,-.089,.359],[.037,.045,.014],12);d.rotation.z=h*-.22,Ot(a,n,[h*.115,-.074,.36],[.028,.014,.015],10);const g=new Rs(.008,.045,.16,10,4),x=g.attributes.position;for(let f=0;f<x.count;f++){const M=(x.getY(f)+.08)/.16;x.setXYZ(f,x.getX(f)+h*(.055*M-.04*M*M),x.getY(f),x.getZ(f)-.025*M*M)}g.computeVertexNormals(),g.userData.temporaryCowHorn=!0;const m=new ee(g,r);m.position.set(h*.145,.25,.015),a.add(m)}const c=[];for(const[h,u]of[[-.215,.275],[.215,.275],[-.215,-.29375],[.215,-.29375]]){const p=new Jt;p.position.set(h,.36,u),t.add(p),Ot(p,i.cream,[0,-.105,0],[.073,.19,.075],12);for(const d of[-1,1])Ot(p,i.dark,[d*.035,-.272,.029],[.034,.063,.091],10);c.push(p)}Ot(t,n,[0,.295,-.23125],[.105,.067,.12],12);for(const h of[-.052,.052])for(const u of[-.2875,-.1875])Ot(t,n,[h,.24,u],[.019,.038,.02],8);const l=Ot(t,i.cream,[.035,.48,-.4835],[.027,.18,.027],10);return l.rotation.x=.2,Ot(t,i.dark,[.035,.312,-.5175],[.048,.069,.043],10),{animal:t,legs:c,head:a}}function uu(i,t,e,n){i.scale.setScalar(n);for(const o of t)i.remove(o);i.remove(e);const s=In(i),r=e.position.clone().multiplyScalar(n);e.position.set(0,0,0),e.scale.setScalar(n);for(const o of[...In(e).children])o.name="head",o.position.copy(r),o.userData={headPart:!0,pivot:r.toArray(),grazeDrop:.3*n},s.add(o);for(let o=0;o<t.length;o++){const a=t[o],c=a.position.clone().multiplyScalar(n);a.position.set(0,0,0),a.scale.setScalar(n);for(const l of[...In(a).children])l.name=`leg-${o}`,l.position.copy(c),l.userData={limbIndex:o,pivot:c.toArray()},s.add(l)}return s.userData.articulated=!0,s}function $M(i="sheep"){const t=`animal:${i}`;if(un.has(t))return un.get(t).clone();const e=zn();if(i==="cow"){const{animal:c,legs:l,head:h}=ZM(e),u=uu(c,l,h,1.5);return h.traverse(p=>{p.geometry?.userData.temporaryCowHorn&&p.geometry.dispose()}),un.set(t,u),u.clone()}const n=new Jt;n.name="Robot sheep",qe(n,e.cream,[0,.54,0],[.32,.34,.39]);{for(let c=0;c<3;c++)qe(n,e.white,[0,.625,-.23+c*.22],[.335,.3,.145]);[-1,1].forEach(c=>{for(let l=0;l<3;l++)Ot(n,e.brass,[c*.312,.56,-.21+l*.21],[.029,.033,.033],8)})}HM(n,e,[0,.87,-.11],[.1,.024,.105],e.mint);const s=new Jt;s.position.set(0,.7,.34),n.add(s),Ot(s,e.dark,[0,0,.06],[.22,.235,.205]),Ot(s,e.black,[0,-.08,.225],[.185,.12,.09]),Ui(s,e,-.096,.055,.221,.075),Ui(s,e,.096,.055,.221,.075),[-1,1].forEach(c=>{const l=Ot(s,e.cream,[c*.235,.075,.025],[.135,.048,.082]);l.rotation.z=c*.25,Ot(s,e.brass,[c*.193,.075,.025],[.045,.045,.045])}),Ot(s,e.cyan,[0,.22,.008],[.033,.033,.033],8),Fe(n,e.dark,[0,.64,.31],.13,.11,[Math.PI/2,0,0]);const r=[io(n,e,-.22,.22,.25),io(n,e,.22,.22,.25),io(n,e,-.22,-.24,.25),io(n,e,.22,-.24,.25)];Ot(n,e.dark,[0,.6,-.39],[.061,.065,.07]);const a=uu(n,r,s,1);return un.set(t,a),a.clone()}function KM(){const i=zn(),t=new Jt;t.name="Autonomous meadow drone",Ot(t,i.mint,[0,0,0],[.3,.14,.25]),Ot(t,i.cream,[0,.09,0],[.2,.085,.17]),Ui(t,i,-.1,-.005,.238,.068),Ui(t,i,.1,-.005,.238,.068);const e=[];return[-1,1].forEach(n=>[-1,1].forEach(s=>{const r=Fe(t,i.brass,[n*.24,0,s*.2],.035,.32,[0,0,n*Math.PI/2]);r.rotation.y=s*-.5;const o=new Jt;o.position.set(n*.39,.09,s*.29),t.add(o),Ot(o,i.dark,[0,-.045,0],[.071,.08,.071]),Ot(o,i.cream,[0,0,0],[.23,.017,.04]),Ot(o,i.cream,[0,0,0],[.04,.017,.23]),Ot(o,i.cyan,[0,.014,0],[.036,.027,.036]),e.push(o)})),t.userData.parts={propellers:e},t}function du(i=0,t=0){i=Math.abs(Math.floor(i))%3;const e=Math.max(0,Math.min(2,Math.round(t))),n=`tree:${i}:${e}`;if(un.has(n))return fu(un.get(n));const s=zn(),r=new Jt;r.name="clay tree";const o=new ee(UM(i),s.treeWood);o.name="tree-wood",o.userData.treeWidth=1,o.castShadow=!1,o.receiveShadow=!0,r.add(o),r.userData.forks=o.geometry.userData.forks;const a=o.geometry.userData.tips,c=new L(0,1,0),l=[s.leaves,s.leavesDark,s.leavesLight][i],u=[[.14,3.12,.02],[-.26,2.85,-.13],[.32,2.83,.27],...a,[-.52,2.64,.47],[.52,2.75,-.47],[-.48,3.19,.27],[.44,3.21,-.3]].slice(0,7+e*2).map((g,x)=>{const m=Math.hypot(g[0],g[2]),f=1+.12*Math.sin(x*4.71+i*1.93),M=(.59-.21*Math.min(1,m/1.2))*f;return[g,[M,M*(1.02+.1*Math.sin(x+i)),M*(.94+.08*Math.cos(x*2))]]}),p=new Jt;for(const[g,x]of u)qe(p,l,g,x,.075,8);for(let g=0;g<u.length*2;g++){const[x,m]=u[g%u.length],f=g*2.399963+i*.27,M=g%2?.3:-.25,_=Math.sqrt(1-M*M),v=Math.cos(f)*_,b=Math.sin(f)*_,w=1+.075*Math.sin(v*4.1+b*2.8)*Math.cos(M*3.7-b*1.3),P=new L(v/m[0],M/m[1],b/m[2]).normalize();Es(p,"SphereGeometry",[1,6,3],l,[x[0]+v*m[0]*w*.92,x[1]+M*m[1]*w*.92,x[2]+b*m[2]*w*.92],[.14,.07,.11]).quaternion.setFromUnitVectors(c,P)}const d=In(p).children[0];return d.name="tree-foliage",d.userData.crownProfile=u.map(([g,x])=>({position:g,radial:Math.hypot(g[0],g[2]),size:x[0]})),r.add(d),un.set(n,r),fu(r)}function fu(i){const t=i.clone(),e=t.getObjectByName("tree-wood");return e.material=e.material.clone(),Pd(e.material),e.userData.ownedMaterial=!0,t}function JM(i=2.2,t=4.5){const e=zn(),n=new Jt,s=Math.ceil(t/.3);for(let r=0;r<s;r++){const o=-t/2+(r+.5)*t/s,a=Math.sin((r+.5)/s*Math.PI)*.12;ze(n,r%3?e.paleWood:e.wood,[0,a+.09,o],[i,.18,t/s-.025]),[-1,1].forEach(c=>Ot(n,e.brass,[c*(i/2-.16),a+.184,o],[.025,.01,.025],6))}return[-1,1].forEach(r=>{for(let o=0;o<4;o++)Fe(n,e.wood,[r*i/2,.56,-t/2+o*t/3],.065,.96);ze(n,e.paleWood,[r*i/2,.86,0],[.1,.1,t+.2]),ze(n,e.wood,[r*i/2,.46,0],[.08,.075,t+.2])}),In(n)}function jM(i=0,t=5){i=Number.isFinite(i)?Math.abs(Math.floor(i))%6:0,t=Number.isFinite(t)?Math.max(1,Math.min(12,Math.floor(t))):5;const e=`flowers:${i}:${t}`;if(un.has(e))return un.get(e).clone();const n=zn(),s=new Jt;for(let r=0;r<t;r++){const o=r*2.39996+i,a=Math.sqrt(r/t)*.65,c=new Jt;c.position.set(Math.cos(o)*a,0,Math.sin(o)*a),s.add(c);const l=.18+(r*7+i)%4*.03;Fe(c,n.stem,[0,l/2,0],.014,l);const h=[n.flowerYellow,n.flowerPink,n.flowerWhite][(r+i)%3];for(let u=0;u<5;u++){const p=u*Math.PI*2/5;Ot(c,h,[Math.cos(p)*.05,l,Math.sin(p)*.05],[.045,.022,.045],6)}Ot(c,n.flowerCenter,[0,l+.015,0],[.027,.023,.027],6)}return Ld(e,s)}function Ua(i=0){i=Math.abs(Math.floor(i))%3;const t=`bush:${i}`;if(un.has(t))return un.get(t).clone();const e=zn(),n=new Jt,s=[e.leaves,e.leavesDark,e.leavesLight][i%3];Fe(n,e.bark,[0,.16,0],.08,.3),qe(n,s,[0,.42,0],[.62,.46,.48],.075),qe(n,s,[-.42,.28,.12],[.38,.34,.35],.075),qe(n,s,[.42,.34,-.1],[.4,.37,.36],.075),qe(n,s,[.1,.65,-.13],[.38,.34,.37],.075);for(let r=0;r<4;r++){const o=r*Math.PI/2+i*.29,a=qe(n,s,[Math.cos(o)*.52,.46+r%2*.1,Math.sin(o)*.42],[.25,.16,.33],.04);a.rotation.y=o}return Ld(t,n)}function Uc(i){let t=i;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function so(i,t=!1){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d"),s=Uc(i==="grass"?83:193);n.fillStyle=t?"#909090":i==="grass"?"#779c4d":"#b79763",n.fillRect(0,0,512,512);for(let o=0;o<90;o++){const a=s()*512,c=s()*512,l=12+s()*57;n.fillStyle=t?["#858585","#999999","#aaaaaa"][o%3]:i==="grass"?["#92ad56","#4f854a","#bdba67","#6a964d"][o%4]:["#c9ad78","#9c8055","#ddc18e"][o%3],n.globalAlpha=.08;for(const h of[-512,0,512])for(const u of[-512,0,512])n.beginPath(),n.ellipse(a+h,c+u,l,l*.6,0,0,Math.PI*2),n.fill()}for(let o=0;o<7200;o++){const a=s()*512,c=s()*512;n.fillStyle=t?["#777777","#bbbbbb","#dddddd"][o%3]:i==="grass"?["#496f39","#9eb568","#d0c480","#789b4b"][o%4]:["#826b48","#e4c995","#b99a6a"][o%3],n.globalAlpha=.14+s()*.25,n.beginPath(),n.ellipse(a,c,.35+s()*.85,i==="grass"?1.2+s()*3.8:.3+s()*1.4,s()*Math.PI,0,Math.PI*2),n.fill()}n.globalAlpha=1;const r=new Bi(e);return t||(r.colorSpace=Pe),r.wrapS=r.wrapT=Zn,r}function Ud(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.max(0,Math.min(1,((i-e.x)*s+(t-e.z)*r)/(s*s+r*r||1))),a=i-e.x-o*s,c=t-e.z-o*r;return a*a+c*c}function QM(i,t,e,n){return Math.sqrt(Ud(i,t,e,n))}function Na(i,t,e){let n=1/0;for(let s=1;s<e.length;s++)n=Math.min(n,Ud(i,t,e[s-1],e[s]));return Math.sqrt(n)}function ty(i,t="#45684d"){const e=document.createElement("canvas");e.width=512,e.height=128;const n=e.getContext("2d");n.fillStyle="#faf6e9",n.beginPath(),n.roundRect(8,12,496,98,35),n.fill(),n.fillStyle=t,n.font="bold 34px sans-serif",n.textAlign="center",n.fillText(i,256,76);const s=new Bi(e);s.colorSpace=Pe;const r=new Pp(new Ku({map:s,depthTest:!1}));return r.scale.set(6,1.5,1),r}class ey{constructor(t){this.renderer=new av({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Au,this.renderer.outputColorSpace=Pe,this.renderer.toneMapping=Cu,this.renderer.toneMappingExposure=1.05,this.scene=new Rp,this.scene.background=new Gt("#bdd6df"),this.scene.fog=new Qc("#bdd6df",95,195),this.hemisphere=new xm("#eaf7ff","#536747",1.65),this.scene.add(this.hemisphere),this.skyDay=new Gt("#bdd6df"),this.skyStorm=new Gt("#899da7"),this.sun=new Mm("#fff4dc",2.05),this.sun.position.set(-18,35,20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100}),this.sun.shadow.camera.updateProjectionMatrix(),this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.camera=new Ro(-30,30,20,-20,.1,180),this.center=new L(-7,0,0),this.targetCenter=this.center.clone(),this.terrain=new Jt,this.actors=new Jt,this.scene.add(this.terrain,this.actors),this.materials=zn(),this.grass=new oe({color:"#ffffff",roughness:.96,map:so("grass"),bumpMap:so("grass",!0),bumpScale:.12}),this.path=new oe({color:"#fff1d3",roughness:.95,map:so("path"),bumpMap:so("path",!0),bumpScale:.08,side:Ae}),this.pathShoulder=new oe({color:"#a99261",roughness:1,transparent:!0,opacity:.36,depthWrite:!1,side:Ae}),this.thrusterGlow=new CM;for(const e of[this.grass,this.path,this.pathShoulder])this.thrusterGlow.install(e);this.water=new oe({color:"#4b9fae",roughness:.29,metalness:.08,side:Ae}),this.targetMat=new en({color:"#ffe8a0",transparent:!0,opacity:.56,depthWrite:!1,side:Ae}),this.fenceParts=[new ee(new Rs(.075,.075,.92,10),this.materials.paleWood),new ee(new zi(1,8,6),this.materials.paleWood),new ee(new Sn(1,.105,.085),this.materials.wood)],this.sceneryBatches=[],this.sceneryFrustum=new To,this.viewMatrix=new te,this.animalMeshes=[],this.animalBatches=[],this.helperMeshes=new Map,this.resize(),this.preview=!0,this.particles=[],this.nature=new gM(this.scene),this.waterEffects=new Qv(this.scene)}resize(){this.width=innerWidth,this.height=innerHeight,this.renderer.setSize(this.width,this.height,!1),this.aspect=this.width/this.height}place(t,e,n,s=1,r=!1){return t.position.set(e,0,n),t.scale.multiplyScalar(s),t.traverse(o=>{o.userData.treeWidth!==void 0&&(o.userData.treeWidth=OM(s),o.material.userData.treeWidth.value=o.userData.treeWidth)}),r&&t.traverse(o=>{o.isMesh&&(o.userData.ownedGeometry=!0)}),this.terrain.add(t),t}flat(t,e,n,s,r=.02){const o=new ee(t,e);return o.rotation.x=-Math.PI/2,o.position.set(n,r,s),o.receiveShadow=!0,this.terrain.add(o),o}setLevel(t){this.level=t,this.barkEffects=[],this.cutaway?.dispose(),this.cutaway=null,this.gateView?.dispose(),this.gateView?.removeFromParent(),this.stoneView?.dispose(),this.stoneView?.removeFromParent(),this.gateView=this.stoneView=null;const e=new Set,n=new Set;for(const C of[this.terrain,this.actors])C.traverse(S=>{S.userData.ownedGeometry&&e.add(S.geometry),S.userData.ownedMaterial&&n.add(S.material),S.userData.ownedLabel&&(S.material.map.dispose(),n.add(S.material)),S.isInstancedMesh&&S.dispose()});e.forEach(C=>C?.dispose()),n.forEach(C=>C?.dispose()),this.terrain.clear(),this.actors.clear(),this.sceneryBatches=[],this.helperMeshes.clear(),this.animalMeshes=[],this.animalBatches=[],this.particles=[];const s=t.bounds,r=s.maxX-s.minX,o=s.maxZ-s.minZ,a=Uc(t.seed),c=Uc(t.seed^7628133),l=(s.maxX+s.minX)/2,h=(s.maxZ+s.minZ)/2,u=this.flat(new _r(r+90,o+90,1,1),this.grass,l,h,-.035);u.userData.ownedGeometry=!0,this.grass.map.repeat.set((r+90)/15,(o+90)/15),this.grass.bumpMap.repeat.copy(this.grass.map.repeat);for(const C of t.sceneryHills||[]){const S=new ee(new zi(1,20,12),new oe({color:["#799552","#6f914e","#93a75d"][Math.floor(a()*3)],roughness:1}));S.position.set(C.x,-.3,C.z),S.scale.set(C.radius,C.height,C.radius),S.userData.ownedGeometry=S.userData.ownedMaterial=!0,this.terrain.add(S)}const p=(C,S)=>{const U=new ee(C,S);return U.receiveShadow=!0,U.userData.ownedGeometry=!0,this.terrain.add(U),U};for(const C of t.roads)p(no(C.points,C.width+.65,{ragged:!0,y:.003,seed:t.seed+5}),this.pathShoulder),p(no(C.points,C.width,{ragged:!0,y:.007,seed:t.seed}),this.path);const d=[];for(const C of t.rivers){const S=new oe({color:"#6c8960",roughness:1,side:Ae});this.thrusterGlow.install(S);const U=p(no(C.points,C.width+.8,{y:.002}),S);U.userData.ownedMaterial=!0;const A=p(no(C.points,C.width,{y:.018}),this.water),O=C.points[0],Z=C.points.at(-1);d.push({mesh:A,points:C.points,width:C.width,heading:Math.atan2(Z.x-O.x,Z.z-O.z)});for(const $ of C.bridges){const ot=JM($.width,$.length),Rt=new Map;ot.traverse(It=>{if(!It.isMesh)return;const gt=It.material;Rt.has(gt)||Rt.set(gt,this.thrusterGlow.install(gt.clone())),It.material=Rt.get(gt),It.userData.ownedMaterial=!0}),ot.rotation.y=$.heading,this.place(ot,$.x,$.z,1,!0)}}const g=t.target,x=an(g),m=x.halfLength,f=[];this.goal=p(au(g),this.targetMat),this.goalOutline=p(PM(g),new en({color:"#fff0b5",side:Ae})),this.goalOutline.userData.ownedMaterial=!0,this.goalFloor=null;const M=(C,S,U,A,O,Z)=>{const $=Math.hypot(S.x-C.x,S.z-C.z),ot=new ee(new Sn($,U,A),O);return ot.position.set((C.x+S.x)/2,U/2,(C.z+S.z)/2),ot.rotation.y=-Math.atan2(S.z-C.z,S.x-C.x),ot.castShadow=ot.receiveShadow=!0,ot.userData.ownedGeometry=!0,ot.userData.coverSide=Z,this.terrain.add(ot),ot};for(const C of t.fenceSegments||[]){if(C.material==="stone")continue;const{a:S,b:U,kind:A}=C,O=Math.hypot(U.x-S.x,U.z-S.z);if(A==="target"&&g.type==="barn"){const Z=Math.ceil(O/3);for(let $=0;$<Z;$++){const ot={x:S.x+(U.x-S.x)*$/Z,z:S.z+(U.z-S.z)*$/Z},Rt={x:S.x+(U.x-S.x)*($+1)/Z,z:S.z+(U.z-S.z)*($+1)/Z},It=(ot.x+Rt.x)/2-g.x,gt=(ot.z+Rt.z)/2-g.z,F=Math.cos(g.heading||0),q=Math.sin(g.heading||0),Q=It*F-gt*q,it=It*q+gt*F,nt=Math.abs(Math.abs(Q)-m)<Math.abs(Math.abs(it)-m)?Q>=0?"+x":"-x":it>=0?"+z":"-z";f.push(M(ot,Rt,2.4,.22,this.materials.barn,nt));const ft=M(ot,Rt,.14,.25,this.materials.barnTrim,nt);ft.position.y=2.35,f.push(ft)}}else if(A==="target"&&g.type==="field"){this.placeFence(S,U);const Z=Math.ceil(O/1.4);for(let $=0;$<Z;$++)this.place(Ua($),S.x+(U.x-S.x)*($+.5)/Z,S.z+(U.z-S.z)*($+.5)/Z,.75)}else this.placeFence(S,U)}if(this.gateView=bM(t.gates),this.stoneView=AM(t.fenceSegments),this.terrain.add(this.gateView,this.stoneView),g.type==="barn"){this.goalFloor=p(au(g,.013),this.path);const C=new Jt,S=g.heading||0,U=Math.ceil(m*2/2.4),A=(m*2+.6)/U;for(const O of[-1,1])for(let Z=0;Z<U;Z++){const $=new ee(new Sn(m+.6,.18,A),this.materials.roof);$.position.set(O*m/2,3.2,-m-.3+(Z+.5)*A),$.rotation.z=-O*.21,$.castShadow=!0,$.userData.ownedGeometry=!0,$.userData.coverKind="roof",C.add($),f.push($)}C.position.set(g.x,0,g.z),C.rotation.y=S,this.terrain.add(C),this.cutaway=new RM(g,f,{halfExtent:m+.3})}const _=ty(g.type==="pen"?"SUNNY PEN":g.type==="barn"?"HOME BARN":"CLOVER FIELD");_.scale.set(4.5,1.125,1),_.position.set(g.x-Math.sin(g.heading||0)*(m+1),3,g.z-Math.cos(g.heading||0)*(m+1)),_.name="Destination introduction",_.userData.ownedLabel=!0,this.destinationSign=_,this.terrain.add(_);for(const C of t.obstacles){const S=C.radius*1.45,U=du(Math.floor(a()*3),S<1.7?0:S<2.4?1:2);U.rotation.y=c()*Math.PI*2,this.place(U,C.x,C.z,S);for(let A=0;A<4;A++){const O=A*Math.PI/2;this.place(Ua(A),C.x+Math.cos(O)*C.radius*.48,C.z+Math.sin(O)*C.radius*.48,C.radius*.7)}}const v=(C,S,U=0)=>C>s.minX+U&&C<s.maxX-U&&S>s.minZ+U&&S<s.maxZ-U&&!t.rivers.some(A=>Na(C,S,A.points)<A.width/2+U+.5)&&!t.roads.some(A=>Na(C,S,A.points)<A.width/2+U+.35)&&Math.hypot(C-g.x,S-g.z)>g.radius+U+2&&!t.obstacles.some(A=>Math.hypot(C-A.x,S-A.z)<A.radius+U)&&!(t.fenceSegments||[]).some(A=>QM(C,S,A.a,A.b)<U+.7),b=[];let w=0;for(const C of t.roads)for(let S=1;S<C.points.length;S++){const U=C.points[S-1],A=C.points[S],O=Math.hypot(A.x-U.x,A.z-U.z);O&&(w+=O,b.push({a:U,b:A,length:O,end:w,width:C.width}))}const P=(C,S)=>{if(C<S*.7&&w){const U=(C/(S*.7)+a()/(S*.7))*w,A=b.find(Rt=>Rt.end>=U)||b[b.length-1],O=(U-A.end+A.length)/A.length,Z=(A.b.x-A.a.x)/A.length,$=(A.b.z-A.a.z)/A.length,ot=(A.width/2+1.1+a()*2.8)*(C%2?1:-1);return{x:A.a.x+Z*O*A.length-$*ot,z:A.a.z+$*O*A.length+Z*ot}}return{x:s.minX+2+a()*(r-4),z:s.minZ+2+a()*(o-4)}};this.meadowDetails=[];const N=Math.min(190,Math.ceil(r*o/130));for(let C=0;C<N;C++){const{x:S,z:U}=P(C,N);v(S,U,1)&&(this.place(jM(C,3),S,U,.85+a()*.6),this.meadowDetails.push({x:S,z:U,kind:"flower"}))}const E=[],T=Math.min(650,Math.ceil(r*o/35));for(let C=0;C<T;C++){const{x:S,z:U}=P(C,T);v(S,U,.4)&&(E.push({x:S,z:U}),this.meadowDetails.push({x:S,z:U,kind:"tuft"}))}if(E.length){const C=new cr(.12,.55,3),S=new oe({color:"#648844",roughness:1,transparent:!0,opacity:1,depthWrite:!1}),U=new oi(C,S,E.length),A=new ye;E.forEach((O,Z)=>{A.position.set(O.x,.18,O.z),A.scale.set(.7+a()*.6,.55+a()*.8,.7+a()*.6),A.rotation.y=a()*Math.PI,A.updateMatrix(),U.setMatrixAt(Z,A.matrix)}),U.receiveShadow=!0,U.userData.decorativeGrass=!0,U.userData.ownedGeometry=U.userData.ownedMaterial=!0,this.terrain.add(U),this.trackScenery(U)}const z=[];for(const C of t.rivers)for(let S=2;S<C.points.length-2;S+=5){const U=C.points[S],A=C.points[S+1],O=A.x-U.x,Z=A.z-U.z,$=Math.hypot(O,Z)||1;for(const ot of[-1,1]){const Rt=U.x-Z/$*(C.width/2+.65)*ot,It=U.z+O/$*(C.width/2+.65)*ot;Rt>s.minX&&Rt<s.maxX&&It>s.minZ&&It<s.maxZ&&!C.bridges.some(gt=>Math.hypot(Rt-gt.x,It-gt.z)<gt.length/2+gt.width)&&z.push({x:Rt,z:It})}}if(z.length){const C=new cr(.18,.95,4),S=new oe({color:"#5b7951",roughness:1}),U=new oi(C,S,z.length),A=new ye;z.forEach((O,Z)=>{A.position.set(O.x,.4,O.z),A.rotation.z=(a()-.5)*.25,A.updateMatrix(),U.setMatrixAt(Z,A.matrix)}),U.userData.ownedGeometry=U.userData.ownedMaterial=!0,this.terrain.add(U),this.trackScenery(U)}const k=Math.min(62,28+Math.floor(t.index/3));for(let C=0;C<k;C++){let S,U;const A=C%4;if(A<2?(S=s.minX-12+a()*(r+24),U=A===0?s.minZ-4-a()*17:s.maxZ+4+a()*17):(S=A===2?s.minX-5-a()*18:s.maxX+5+a()*18,U=s.minZ+a()*o),t.rivers.some($=>Na(S,U,$.points)<$.width/2+3))continue;const O=1.3+a()*1.8,Z=du(C%3,O<1.7?0:O<2.4?1:2);Z.rotation.y=c()*Math.PI*2,this.place(Z,S,U,O)}this.bushPlacements=lv(t);for(const C of this.bushPlacements)this.place(Ua(C.variant),C.x,C.z,C.scale);this.nature.setLevel(t),this.waterEffects.setLevel(t,{grassMaterials:[this.grass],pathMaterials:[this.path],waterMaterial:this.water,terrain:this.terrain,rivers:d,weather:this.nature.weather}),this.batchScenery(),this.dog=WM(),this.dog.scale.setScalar(1.35*.75),this.actors.add(this.dog);const G=new ee(new il(.82,.95,40),new en({color:"#fff0bb",transparent:!0,opacity:.9,side:Ae,depthWrite:!1}));G.scale.setScalar(1/.75),G.rotation.x=-Math.PI/2,G.position.y=.03/.75,G.userData.ownedGeometry=G.userData.ownedMaterial=!0,this.dog.add(G);const Y=new od;Y.moveTo(0,1.45),Y.lineTo(-.19,1.05),Y.lineTo(.19,1.05),Y.closePath(),this.goalPointer=new ee(new sl(Y),new en({color:"#be8652",side:Ae,depthWrite:!1})),this.goalPointer.scale.setScalar(1/.75),this.goalPointer.rotation.x=Math.PI/2,this.goalPointer.userData.ownedGeometry=this.goalPointer.userData.ownedMaterial=!0,this.dog.add(this.goalPointer);for(const C of t.animals){const S=new ye;S.position.set(C.x,0,C.z),S.rotation.y=C.heading??Math.PI/2,S.scale.setScalar(_s(C)),this.animalMeshes.push(S)}for(const C of["sheep","cow"]){const S=t.animals.flatMap(($,ot)=>$.type===C?[ot]:[]);if(!S.length)continue;const U=$M(C),A=[];let O=0;const Z=[];for(const $ of U.children){$.geometry.boundingSphere||$.geometry.computeBoundingSphere();const ot=$.geometry.boundingSphere,Rt=$.userData.pivot;if(O=Math.max(O,ot.center.length()+ot.radius+(Rt?Math.hypot(...Rt):0)),$.material.userData.cowCoatVariant!==void 0){for(let gt=0;gt<4;gt++){const F=S.filter(Q=>YM(t.seed,t.animals[Q].id??Q)===gt);if(!F.length)continue;const q=new oi($.geometry,zd(gt),F.length);q.instanceMatrix.setUsage(ds),q.castShadow=q.receiveShadow=!0,q.frustumCulled=!1,this.actors.add(q),Z.push({indices:F,meshes:[q],visibleIndices:[],coatVariant:gt})}continue}const It=new oi($.geometry,$.material,S.length);It.instanceMatrix.setUsage(ds),It.castShadow=It.receiveShadow=!0,It.frustumCulled=!1,It.userData={...$.userData},this.actors.add(It),A.push(It)}this.animalBatches.push({indices:S,meshes:A,radius:O,visibleIndices:[]},...Z.map($=>({...$,radius:O})))}this.center.set(t.spawn.x+(this.aspect<.8?2:10),0,t.spawn.z+1),this.time=0,this.update(t,t.dog,0,!0)}placeFence(t,e){const n=Math.hypot(e.x-t.x,e.z-t.z),s=Math.max(1,Math.ceil(n/1.8)),r=new Jt;r.position.set((t.x+e.x)/2,0,(t.z+e.z)/2),r.rotation.y=-Math.atan2(e.z-t.z,e.x-t.x);const o=(a,c,l,h=1,u=1,p=1)=>{const d=this.fenceParts[a].clone();d.position.set(c,l,0),d.scale.set(h,u,p),d.userData.fencePart=!0,r.add(d)};for(let a=0;a<=s;a++){const c=-n/2+a*n/s;o(0,c,.46),o(1,c,.94,.083,.065,.083)}for(let a=0;a<s;a++)for(const c of[.34,.69])o(2,-n/2+(a+.5)*n/s,c,n/s+.03);this.terrain.add(r)}trackScenery(t){const e=t.instanceMatrix.array.slice(),n=new Float32Array(t.count*4),s=new te,r=new fi;t.geometry.boundingSphere||t.geometry.computeBoundingSphere();for(let a=0;a<t.count;a++)s.fromArray(e,a*16),r.copy(t.geometry.boundingSphere).applyMatrix4(s),n.set([r.center.x,r.center.y,r.center.z,r.radius],a*4);t.instanceMatrix.setUsage(ds),t.frustumCulled=!1;const o=t.geometry.attributes.treeInstanceWidth?.array.slice();this.sceneryBatches.push({batch:t,matrices:e,bounds:n,widths:o})}batchScenery(){this.terrain.updateMatrixWorld(!0);const t=new Map;this.terrain.traverse(n=>{if(!n.isMesh||n.isInstancedMesh||n.userData.ownedGeometry||n.material.transparent)return;const s=`${n.geometry.id}:${n.userData.treeWidth!==void 0?"treeWood":n.material.id}`;t.has(s)||t.set(s,[]),t.get(s).push(n)});for(const n of t.values()){if(n.length<2&&n[0].userData.treeWidth===void 0)continue;const s=n[0],r=s.userData.treeWidth!==void 0,o=r?s.geometry.clone():s.geometry;r&&o.setAttribute("treeInstanceWidth",new Ac(new Float32Array(n.map(c=>c.userData.treeWidth)),1).setUsage(ds));const a=new oi(o,r?zn().treeWood:s.material,n.length);r&&(a.userData.ownedGeometry=!0,a.userData.treeWood=!0),n.forEach((c,l)=>{a.setMatrixAt(l,c.matrixWorld),r&&c.userData.ownedMaterial&&c.material.dispose(),c.parent.remove(c)}),a.castShadow=!!s.userData.fencePart,a.receiveShadow=!0,this.terrain.add(a),this.trackScenery(a)}const e=[];this.terrain.traverse(n=>{n.isGroup&&!n.children.length&&e.push(n)}),e.forEach(n=>n.parent.remove(n))}cullScenery(){this.camera.updateMatrixWorld(!0),this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);const t=this.sceneryFrustum.planes;for(const{batch:e,matrices:n,bounds:s,widths:r}of this.sceneryBatches){let o=0;for(let a=0;a<s.length;a+=4){const c=s[a+3]+2;t.some(l=>l.normal.x*s[a]+l.normal.y*s[a+1]+l.normal.z*s[a+2]+l.constant<-c)||(e.instanceMatrix.array.set(n.subarray(a*4,a*4+16),o*16),r&&(e.geometry.attributes.treeInstanceWidth.array[o]=r[a/4]),o++)}if(e.count=o,e.visible=o>0,e.instanceMatrix.needsUpdate=!0,e.instanceMatrix.clearUpdateRanges(),o&&e.instanceMatrix.addUpdateRange(0,o*16),r){const a=e.geometry.attributes.treeInstanceWidth;a.needsUpdate=!0,a.clearUpdateRanges(),o&&a.addUpdateRange(0,o)}}}updateAnimalBatches(t,e){const n=this.sceneryFrustum.planes,s=new te,r=new te,o=new te;for(const a of this.animalBatches){const c=a.visibleIndices;c.length=0;for(const l of a.indices){const h=this.animalMeshes[l],u=h.position,p=a.radius*Math.max(Math.abs(h.scale.x),Math.abs(h.scale.y),Math.abs(h.scale.z))+3;n.some(d=>d.normal.x*u.x+d.normal.y*u.y+d.normal.z*u.z+d.constant<-p)||c.push(l)}c.forEach((l,h)=>a.meshes.forEach(u=>{if(u.userData.headPart){const m=this.animalMeshes[l].userData,f=u.userData.pivot;s.makeTranslation(f[0],f[1]-(m.graze||0)*u.userData.grazeDrop,f[2]),r.makeRotationX(mf(m,l)),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o);return}if(u.userData.limbIndex===void 0){u.setMatrixAt(h,this.animalMeshes[l].matrix);return}const p=t.animals[l],d=u.userData.limbIndex,g=d===0||d===3?0:Math.PI,x=Math.sin(e*12+l*.8+g)*Math.min(.5,uf(p,this.animalMeshes[l].userData.turnSpeed)*.15);s.makeTranslation(...u.userData.pivot),r.makeRotationX(x),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o)}));for(const l of a.meshes)l.count=c.length,l.visible=c.length>0,l.instanceMatrix.needsUpdate=!0,l.instanceMatrix.clearUpdateRanges(),c.length&&l.instanceMatrix.addUpdateRange(0,c.length*16)}}update(t,e,n,s=!1){this.time+=n,this.preview=s;const r=t.animals.filter(f=>!f.saved);this.destinationSign.material.opacity=s?1:Math.max(0,Math.min(1,1-((t.time||0)-4)/1.2)),this.destinationSign.visible=this.destinationSign.material.opacity>0;const o=r.reduce((f,M)=>({x:f.x+M.x/r.length,z:f.z+M.z/r.length}),{x:0,z:0}),c=(s?this.aspect<.8?50:44:this.aspect<.8?39:36)/2,l=c*this.aspect;let h=s?t.spawn.x+(this.aspect<.8?2:10):e.x*.68+(r.length?o.x:t.target.x)*.32+2,u=s?t.spawn.z+1:e.z*.75+(r.length?o.z:t.target.z)*.25+1;s||(h=Math.max(e.x-l*.45,Math.min(e.x+l*.45,h)),u=Math.max(e.z-4,Math.min(e.z+4,u)));const p=s?Math.min(1,n*.8):Math.min(1,n*3.5);if(this.center.x+=(h-this.center.x)*p,this.center.z+=(u-this.center.z)*p,!s){const f=Math.max(1,l-2.5);this.center.x=Math.max(e.x-f,Math.min(e.x+f,this.center.x))}this.camera.left=-l,this.camera.right=l,this.camera.top=c,this.camera.bottom=-c,this.camera.updateProjectionMatrix(),this.camera.position.set(this.center.x,36,this.center.z+29),this.camera.lookAt(this.center.x,0,this.center.z-2),this.sun.position.set(this.center.x-18,35,this.center.z+20),this.sun.target.position.set(this.center.x,0,this.center.z),this.sun.target.updateMatrixWorld(),this.dog.position.set(e.x,Xn(t,e.x,e.z),e.z),this.dog.rotation.y=e.heading??Math.PI/2,this.goalPointer.rotation.set(Math.PI/2,0,0),this.goalPointer.quaternion.premultiply(new $n().setFromAxisAngle(new L(0,1,0),Math.atan2(t.target.x-e.x,t.target.z-e.z)-this.dog.rotation.y)),this.goalPointer.position.y=.04/.75,this.goalPointer.visible=!s;const d=this.dog.userData.parts,g=Math.floor(this.time*12)/12;So(this.dog,e,n),hu(this.dog,n),d.tail.rotation.z=Math.sin(g*7)*.3,this.thrusterGlow.update(this.dog,(f,M)=>Xn(t,f,M)),t.animals.forEach((f,M)=>{const _=this.animalMeshes[M];_.scale.setScalar(_s(f)),_.position.set(f.x,Xn(t,f.x,f.z)+Math.sin(g*12+M)*Math.min(.07,Math.hypot(f.vx,f.vz)*.025),f.z),hf(_,f,n),pf(_,f,t,n),_.rotation.z=Math.sin(g*9+M)*Math.min(.055,Math.hypot(f.vx,f.vz)*.02),_.updateMatrix()}),this.updateBarks(n);for(const f of this.helperMeshes.values())f.visible=!1;for(const f of t.helpers||[]){let M=this.helperMeshes.get(f.type);M||(M=f.type==="drone"?KM():XM(),f.type==="helper"&&M.scale.setScalar(this.dog.scale.x*(M.userData.suggestedScale??.82)),this.helperMeshes.set(f.type,M),this.actors.add(M)),M.visible=!0,M.position.set(f.x,f.type==="drone"?2+Math.sin(this.time*4)*.18:Xn(t,f.x,f.z),f.z),f.type==="drone"?M.userData.parts.propellers.forEach(_=>_.rotation.y=this.time*35):(Number.isFinite(f.heading)&&(M.rotation.y=f.heading),So(M,{...f,heading:M.rotation.y},n),hu(M,n),M.userData.parts.tail.rotation.z=Math.sin(g*7)*.3,ba(M,(this.barkEffects||[]).some(_=>_.buddy)))}const x=(t.helpers||[]).some(f=>f.type==="helper")?this.helperMeshes.get("helper"):null;this.thrusterGlow.update(this.dog,(f,M)=>Xn(t,f,M),x),ba(this.dog,(this.barkEffects||[]).some(f=>!f.buddy)),this.gateView?.update(),this.goal.material.opacity=.38+Math.sin(this.time*2)*.09,this.cutaway?.update(this.camera,[e,...t.animals,...(t.helpers||[]).filter(f=>f.type!=="drone")],n),this.nature.update(n,{dog:e,animals:t.animals,camera:this.camera,time:this.time,paused:n<=0});const m=this.nature.weather;this.waterEffects.update(n,{weather:m,movers:[{...e,id:"pip"},...t.animals.map(f=>({...f,id:`flock-${f.id}`})),...(t.helpers||[]).filter(f=>f.type!=="drone").map(f=>({...f,id:`helper-${f.type}`}))],paused:n<=0}),this.sun.intensity=2.05*m.daylight+m.lightningFlash,this.hemisphere.intensity=1.65*m.daylight+m.lightningFlash*.6,this.scene.background.copy(this.skyDay).lerp(this.skyStorm,m.cloudCoverage*.5),this.scene.fog.color.copy(this.scene.background);for(const f of this.particles)f.life-=n,f.mesh.position.addScaledVector(f.velocity,n),f.velocity.y-=n*6,f.mesh.rotation.x+=n*2,f.mesh.scale.setScalar(Math.max(0,f.life)),f.life<=0&&(this.actors.remove(f.mesh),f.mesh.geometry.dispose(),f.mesh.material.dispose());this.particles=this.particles.filter(f=>f.life>0),this.cullScenery(),this.updateAnimalBatches(t,g),this.renderer.render(this.scene,this.camera)}celebrate(t,e){for(let n=0;n<36;n++){const s=new ee(new Sn(.12,.12,.05),new en({color:["#f0b65c","#f8e8ad","#e99585","#80b398"][n%4]}));s.userData.ownedGeometry=s.userData.ownedMaterial=!0,s.position.set(t,1.5,e),this.actors.add(s),this.particles.push({mesh:s,velocity:new L(Math.sin(n*2.4)*3,2+n%5,Math.cos(n*2.4)*3),life:1.8})}}bark(t){t||ba(this.dog,!0);const e=t?{x:t.x,z:t.z}:{x:this.dog.position.x,z:this.dog.position.z},n=new ee(cu(this.level,e),new en({color:"#fff6d8",side:Ae,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1}));for(n.renderOrder=1,n.userData.ownedGeometry=n.userData.ownedMaterial=!0,this.actors.add(n),this.barkEffects??=[],this.barkEffects.push({mesh:n,origin:e,age:0,buddy:!!t});this.barkEffects.length>4;){const s=this.barkEffects.shift();this.actors.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose()}}updateBarks(t){for(const e of this.barkEffects||[])if(!(t<=0)){if(e.age+=t,e.age>=.6){this.actors.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();continue}cu(this.level,e.origin,1+e.age/.6*6,e.mesh.geometry),e.mesh.material.opacity=.8*(1-e.age/.6)}this.barkEffects=(this.barkEffects||[]).filter(e=>e.age<.6)}drawMap(t,e,n){const s=t.getContext("2d"),r=t.width,o=t.height,a=e.bounds,c=d=>8+(d-a.minX)/(a.maxX-a.minX)*(r-16),l=d=>8+(d-a.minZ)/(a.maxZ-a.minZ)*(o-16);s.fillStyle="#29483a",s.fillRect(0,0,r,o);const h=(d,g,x)=>{s.lineWidth=g,s.strokeStyle=x,s.lineCap="round",s.lineJoin="round",s.beginPath(),d.forEach((m,f)=>f?s.lineTo(c(m.x),l(m.z)):s.moveTo(c(m.x),l(m.z))),s.stroke()},u=Math.min((r-16)/(a.maxX-a.minX),(o-16)/(a.maxZ-a.minZ));for(const d of e.rivers){h(d.points,d.width*u,"#35b9ed");for(const g of d.bridges){const x=Math.sin(g.heading)*g.length/2,m=Math.cos(g.heading)*g.length/2;h([{x:g.x-x,z:g.z-m},{x:g.x+x,z:g.z+m}],Math.max(3,g.width*u),"#dfbd8c")}}for(const d of e.roads)h(d.points,Math.max(1.5,d.width*u),"#f0c777");DM(s,e.target,d=>({x:c(d.x),y:l(d.z)}));for(const d of e.fenceSegments||[])h([d.a,d.b],d.material==="stone"?2:d.kind==="boundary"?1:1.5,d.material==="stone"?"#d5d9c9":"#c0a67b");for(const d of e.gates||[])if(d.operable&&!d.open){const g=Vc(d);h([g.a,g.b],2.5,"#ffad45")}const p=(d,g,x,m,f="#183027")=>{s.fillStyle=m,s.strokeStyle=f,s.lineWidth=1.5,s.beginPath(),s.arc(c(d),l(g),x,0,Math.PI*2),s.fill(),s.stroke()};for(const d of e.animals)p(d.x,d.z,d.type==="cow"?3:2.3,d.saved?"#8be0b4":"#fff8e7");p(n.x,n.z,4.8,"#ffd166"),s.strokeStyle="#ffe6a3",s.lineWidth=2,s.beginPath(),s.arc(c(n.x),l(n.z),7,0,Math.PI*2),s.stroke();for(const d of e.helpers||[])p(d.x,d.z,3,"#45d9ef","#102c39")}}class ny{constructor(){this.context=null,this.master=null,this.music=null,this.effects=null,this.ambience=null,this.ambientSources=new Set,this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1,this.noiseBuffer=null,this.thunderSource=null,this.thunderEvent=null,this.weatherState=null,this.birdCountdown=4+Math.random()*6,this.muted=!1,this.paused=!1,this.timer=null,this.step=0,this.nextNoteTime=0,this.active=new Set,this.disposed=!1,this.activationGeneration=0,this.tempo=106}async start(){if(this.disposed)return!1;const t=++this.activationGeneration;try{if(!this.context){const n=globalThis.AudioContext||globalThis.webkitAudioContext;if(!n)return!1;this.context=new n,this.master=this.context.createGain(),this.music=this.context.createGain(),this.effects=this.context.createGain(),this.ambience=this.context.createGain(),this.master.gain.value=this.muted?0:.975,this.music.gain.value=.42,this.effects.gain.value=.6,this.ambience.gain.value=.38,this.music.connect(this.master),this.effects.connect(this.master),this.ambience.connect(this.master),this.master.connect(this.context.destination)}const e=this.context;return await e.resume(),this.disposed||t!==this.activationGeneration||this.context!==e?!1:(this.paused=!1,this.music.gain.cancelScheduledValues(this.context.currentTime),this.music.gain.setTargetAtTime(.42,this.context.currentTime,.025),this._begin(),!0)}catch{return!1}}setMuted(t){if(this.muted=!!t,this.muted&&this._stopAmbience(),!this.context||!this.master)return;const e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(this.muted?0:.975,e,.025)}pause(){this.activationGeneration++,this.paused=!0,this._stopScheduler(),this._stopAmbience(),this.context&&this.context.state!=="closed"&&this.music.gain.setTargetAtTime(1e-4,this.context.currentTime,.025)}async resume(){return this.start()}_begin(){this.timer||this.paused||this.disposed||(this.nextNoteTime=this.context.currentTime+.06,this._schedule(),this.timer=globalThis.setInterval(()=>this._schedule(),100))}_stopScheduler(){this.timer!==null&&globalThis.clearInterval(this.timer),this.timer=null}_schedule(){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;const t=60/this.tempo/2;if(!Number.isFinite(t)||t<=0)return;const e=this.context.currentTime;if(this.nextNoteTime<e){const n=Math.ceil((e-this.nextNoteTime)/t);this.step=(this.step+n)%128,this.nextNoteTime=Math.max(e,this.nextNoteTime+n*t)}for(let n=0;n<8&&this.nextNoteTime<e+.25;n++)this._musicStep(this.step,this.nextNoteTime,t),this.step=(this.step+1)%128,this.nextNoteTime+=t}_musicStep(t,e,n){const s=[48,53,48,55,57,53,55,48],r=[[72,76,79,null,76,74,72,null],[77,81,79,null,77,76,74,null],[72,76,79,81,79,null,76,null],[74,79,83,null,81,79,74,null],[76,81,84,null,83,81,79,null],[77,null,81,79,77,76,74,null],[74,77,79,null,83,81,79,74],[76,74,72,null,79,null,72,null]],o=Math.floor(t/16),a=t%16,c=s[o],l=o===4;if(a%4===0&&this._note(c+(a===8?7:0),e,.32,.15,"bass",this.music),a%4===2&&(this._note(c+12,e,.22,.048,"pluck",this.music),this._note(c+(l?15:16),e+.018,.22,.042,"pluck",this.music),this._note(c+19,e+.035,.22,.036,"pluck",this.music)),a%2===0){const h=r[o][a/2];h!==null&&this._note(h,e,n*1.5,.12,o%2?"flute":"marimba",this.music)}}updateAmbience(t,e={}){const n=e.weather||"sun",s=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed;if(this._updateThunder(typeof n=="object"?n:null,s),!s)return;const r=typeof n=="string"?n:n.type||"sun",o=typeof n=="object"&&Number.isFinite(n.intensity)?Math.max(0,Math.min(1,n.intensity)):.3,a=["rain","light-rain","heavy-rain","storm"].includes(r)?"rain":r==="wind"?"wind":"sun",c=typeof n=="object"?n.storm?"storm":n.kind||r:r,l=c==="storm"?1:c==="heavy-rain"?.85:.5;this._weather(a,o,l),this.birdCountdown-=Number.isFinite(t)?Math.max(0,Math.min(t,.25)):0,!(this.birdCountdown>0)&&(this.birdCountdown=a==="rain"?10+Math.random()*10:4+Math.random()*6,!(typeof n=="object"&&(n.storm||n.kind==="storm")||r==="storm"||a==="rain"&&o>=.7)&&this._chirp(a==="rain"?.018:.03))}_noise(){if(!this.noiseBuffer){const t=this.context;this.noiseBuffer=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const e=this.noiseBuffer.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1}return this.noiseBuffer}_updateThunder(t,e){t!==this.weatherState&&(this.thunderSource&&this._releaseAmbience(this.thunderSource),this.thunderSource=null,this.thunderEvent=null,this.weatherState=t,this._restoreMusicMix());const n=t?.lightningId;if(!n||n===this.thunderEvent)return;this.thunderEvent=n;const s=t.lightningAge,r=t.thunderDelay;if(!e||!Number.isFinite(s)||!Number.isFinite(r)||s<0||r<0||s>r+.2)return;this.thunderSource&&this._releaseAmbience(this.thunderSource);const o=this.context,a=o.createBufferSource(),c=o.createBiquadFilter(),l=o.createGain(),h=o.currentTime+Math.max(.01,r-s),u=3+Math.random()*2;a.buffer=this._noise(),a.loop=!0,c.type="lowpass",c.Q.value=.35,c.frequency.setValueAtTime(400,h),c.frequency.exponentialRampToValueAtTime(85,h+u*.65),l.gain.setValueAtTime(1e-4,h),l.gain.exponentialRampToValueAtTime(.65,h+.12),l.gain.exponentialRampToValueAtTime(.32,h+u*.23),l.gain.exponentialRampToValueAtTime(.035,h+u*.56),l.gain.exponentialRampToValueAtTime(1e-4,h+u*.76),a.connect(c),c.connect(l),l.connect(this.effects);const p=[];for(const[g,x]of[[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]){const m=o.createDelay(1.2),f=o.createGain();m.delayTime.value=u*g,f.gain.value=x,l.connect(m),m.connect(f),f.connect(this.effects),p.push(m,f)}this.music.gain.cancelScheduledValues(o.currentTime),this.music.gain.setValueAtTime(.42,o.currentTime),this.music.gain.setTargetAtTime(.16,h,.04),this.music.gain.setTargetAtTime(.42,h+u*.72,.35),this._trackAmbience(a,[c,l,...p]),this.thunderSource=a;const d=a.onended;a.onended=()=>{d(),this.thunderSource===a&&(this.thunderSource=null)},a.start(h),a.stop(h+u)}_chirp(t){const e=this.context.currentTime+.015,n=1600+Math.random()*1100,s=2+Math.floor(Math.random()*2);for(let r=0;r<s;r++){const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r*(.14+Math.random()*.035);o.type="sine",o.frequency.setValueAtTime(n*(1+r*.1),c),o.frequency.exponentialRampToValueAtTime(n*(r%2?.9:1.28),c+.07),o.frequency.exponentialRampToValueAtTime(n*.95,c+.13),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(t,c+.025),a.gain.exponentialRampToValueAtTime(1e-4,c+.15),o.connect(a),a.connect(this.ambience),this._trackAmbience(o,[a]),o.start(c),o.stop(c+.17)}}_trackAmbience(t,e){this.active.add(t),this.ambientSources.add(t),t.onended=()=>{t.disconnect();for(const n of e)n.disconnect();this.active.delete(t),this.ambientSources.delete(t)}}_weather(t,e,n=1){if(this.weatherKind!==t&&(this._stopWeather(),this.weatherKind=t,t!=="sun")){const s=this.context;this._noise();const r=s.createBufferSource(),o=s.createBiquadFilter(),a=s.createGain();r.buffer=this.noiseBuffer,r.loop=!0,o.type="lowpass",o.frequency.value=t==="rain"?2200:500,o.Q.value=.3,a.gain.value=1e-4,r.connect(o),o.connect(a),a.connect(this.ambience),this._trackAmbience(r,[o,a]),this.weatherSource={source:r,gain:a,filter:o},r.start()}if(this.weatherSource){const s=(t==="rain"?.032*n:.024)*e;Math.abs(s-this.weatherVolume)>.001&&(this.weatherSource.gain.gain.setTargetAtTime(s,this.context.currentTime,.8),this.weatherVolume=s)}}_stopWeather(){this.weatherSource&&this._releaseAmbience(this.weatherSource.source),this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1}_releaseAmbience(t){try{t.stop()}catch{}t.onended?.(),t.onended=null}_restoreMusicMix(){if(!this.context||!this.music||this.context.state==="closed")return;const t=this.context.currentTime;this.music.gain.cancelScheduledValues(t),this.music.gain.setTargetAtTime(this.paused?1e-4:.42,t,.025)}_stopAmbience(){this._restoreMusicMix(),this._stopWeather(),this.thunderSource=null;for(const t of[...this.ambientSources])this._releaseAmbience(t);this.birdCountdown=4+Math.random()*6}_note(t,e,n,s,r="marimba",o=this.effects){if(!this.context||!o||this.disposed)return;const a=this.context,c=a.createOscillator(),l=a.createGain(),h=440*2**((t-69)/12);c.type=r==="pluck"?"triangle":"sine",c.frequency.setValueAtTime(h,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(.001,s),e+(r==="flute"?.035:.009)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l),l.connect(o),this.active.add(c),c.onended=()=>{c.disconnect(),l.disconnect(),this.active.delete(c)},c.start(e),c.stop(e+n+.03),r==="marimba"&&this._note(t+19,e,n*.35,s*.12,"partial",o)}play(t){if(!this.context||this.context.state!=="running"||this.muted||this.disposed)return;const e=this.context.currentTime+.01;if(t==="bark"){[0,.14].forEach(r=>{const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r;o.type="triangle",o.frequency.setValueAtTime(330,c),o.frequency.exponentialRampToValueAtTime(110,c+.095),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(.11,c+.012),a.gain.exponentialRampToValueAtTime(1e-4,c+.1),o.connect(a),a.connect(this.effects),this.active.add(o),o.onended=()=>{o.disconnect(),a.disconnect(),this.active.delete(o)},o.start(c),o.stop(c+.12)});return}const s={saved:[79,84],animal:[79,84],rescue:[79,84],purchase:[72,76,79,84],unlock:[72,76,79,84],completed:[72,76,79,84,79,84],complete:[72,76,79,84,79,84],win:[72,76,79,84,79,84],click:[79]}[t];s&&s.forEach((r,o)=>this._note(r,e+o*.115,.28,.16,"marimba"))}dispose(){if(!this.disposed){this.activationGeneration++,this.disposed=!0,this._stopScheduler(),this._stopAmbience();for(const t of this.active){try{t.stop()}catch{}t.disconnect()}this.active.clear(),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{}),this.context=null,this.master=this.music=this.effects=this.ambience=null,this.noiseBuffer=null}}}const dt=i=>document.getElementById(i);let nn,kt,ai,ne=Xv(),Bt="intro",Ri="playing",pu=performance.now(),dn=0,ml=0,pr=0,Tn=0,Io=!1,gl=0,mr=!1,mu,xl=null;const Ge=new ny,Dn={x:0,z:0},_n=new Set,iy=lf({document,getState:()=>({level:kt,dog:ai,playing:Bt==="playing"}),onOpen:()=>_l("Gate open — guide the flock through.")}),Ce=(i,t)=>dt(i).classList.toggle("hidden",!t);let wo=!1;const Lo=()=>{wo||qv(ne)||_l("Progress is kept for this session; browser storage is unavailable.")},gu=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function _l(i){dt("toast").textContent=i,Ce("toast",!0),clearTimeout(mu),mu=setTimeout(()=>Ce("toast",!1),2800)}function ki(){dt("points").textContent=ne.points,dt("sound").textContent=ne.music?"♫":"♪",dt("sound").setAttribute("aria-label",ne.music?"Mute sound":"Enable sound"),dt("sound").style.opacity=ne.music?"1":".55",dt("menu-sound")&&(dt("menu-sound").textContent=`Sound: ${ne.music?"On":"Off"}`,dt("menu-sound").setAttribute("aria-pressed",String(ne.music)))}async function Nd(){ne.music=!ne.music,Ge.setMuted(!ne.music),Lo(),ki(),ne.music&&(await Ge.start(),(Bt!=="playing"||!ne.music)&&Ge.pause())}function vl(i){const t=i<pr;dt("bark").classList.toggle("cooldown",t),dt("bark").disabled=t,dt("bark").style.setProperty("--bark-progress",String(Math.max(0,Math.min(1,1-(pr-i)/2100))))}function Fd(i=!1,t=0){Ce("countdown",i),dt("countdown").textContent=i?`${Math.ceil(t)}s`:"",dt("countdown").setAttribute("aria-label",i?`${Math.ceil(t)} seconds remaining to deliver the flock`:"Delivery countdown has not started"),dt("countdown").classList.toggle("running",i),dt("countdown").classList.toggle("urgent",i&&t<=10)}function Ts(){Dn.x=Dn.z=0,hi=null,_n.clear(),dt("stick").style.transform="translate(0,0)"}function zo(){const i=Math.max(0,Math.min(1,dn/3)),t=Math.max(0,Math.min(1,dn/.65,(3-dn)/1.2));dt("level-introduction").style.opacity=String(t),dt("level-introduction").style.setProperty("--level-scale",String(.72+.48*(1-(1-i)**2))),Ce("level-introduction",Bt==="playing"&&dn<3)}async function Ni(i=ne.highestLevel){i=Math.max(0,Math.min(99,Math.floor(Number(i)||0))),Ci(!1),kt=bu(i),ai={...kt.dog,heading:kt.dog.heading??Math.atan2(kt.spawn.x-kt.dog.x,kt.spawn.z-kt.dog.z)},dn=0,Tn=0,Io=!1,ml=pr=0,Ts(),nn.setLevel(kt),Bt="playing",document.body.classList.toggle("in-game",!0),vl(performance.now());for(const t of["intro","scene-tag"])Ce(t,!1);for(const t of["mission","controls","map-box"])Ce(t,!0);dt("level-number").textContent=`Level ${i+1}`,zo(),dt("mission").setAttribute("aria-label",`Level ${i+1} · Livestock delivery status`),dt("total").textContent=kt.animals.length,dt("saved").textContent=0,Fd(),mr=!1,Ce("toggle-tip",!1),dt("toggle-tip").setAttribute("aria-expanded","false"),Ce("tip",!0),bo(Ml(i)[0]),Ge.setMuted(!ne.music),await Ge.start(),(Bt!=="playing"||!ne.music)&&Ge.pause(),ki()}const sy=14;function Ml(i){return i===0?["Drag to move Pip.","Move behind the flock to guide it.","Double-tap to woof."]:[kt.routes.length>1?"Choose a trail on the map.":"Gather stragglers before crossing."]}function yl(){Io=!0,mr=!1,Ce("tip",!1),Ce("toggle-tip",!0),dt("toggle-tip").setAttribute("aria-expanded","false"),dt("toggle-tip").setAttribute("aria-label","Show tips")}function bo(i){gl=dn,dt("tip-text").textContent=i,dt("tip").querySelector(".tip-number").textContent=`0${Tn+1}`}function Uo(){Bt!=="playing"||performance.now()<pr||(ml=performance.now()+650,pr=performance.now()+2100,vl(performance.now()),Ge.play("bark"),nn.bark(),navigator.vibrate&&navigator.vibrate(20))}function No(i,t="paused"){Ri=Bt==="playing"?"playing":Bt==="complete"?"complete":"intro",Bt=t,zo(),Ts(),Ge.pause(),dt("modal").classList.contains("hidden")&&(xl=document.activeElement),dt("modal-card").innerHTML=i,Ce("modal",!0),Ce("controls",!1),setTimeout(()=>dt("modal-card").querySelector("button")?.focus(),30)}function Ci(i=!0){Ce("modal",!1),i&&(Bt=Ri,Ce("controls",Bt==="playing"),Bt==="playing"&&Ge.resume(),xl?.focus()),zo(),Ts()}function Ps(){if(Bt==="reset-confirm"){dt("cancel-reset").onclick();return}if(Bt==="shop"){dt("shop-back").onclick();return}if(Bt==="paused"){Ci();return}Bt!=="complete"&&(No(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${Bt==="intro"?"Hello, shepherd.":"Paws for a moment."}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${Bt==="intro"?"Back to the meadow":"Keep herding"} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${ne.points} bolts</button>${Bt==="playing"?'<button class="secondary" id="restart">Restart this meadow</button>':""}<button class="secondary" id="menu-sound" aria-pressed="${ne.music}">Sound: ${ne.music?"On":"Off"}</button><button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,ne.highestLevel+1)},(i,t)=>`<button class="${t===kt.index?"current":""}" data-level="${t}" aria-label="Play level ${t+1}">${t+1}</button>`).join("")}</div>`),dt("close").onclick=()=>Ci(),dt("resume").onclick=()=>Ci(),dt("menu-sound").onclick=Nd,dt("upgrades-menu").onclick=Fo,dt("restart-game-menu").onclick=Od,dt("restart")&&(dt("restart").onclick=()=>Ni(kt.index)),dt("modal-card").querySelectorAll("[data-level]").forEach(i=>i.onclick=()=>Ni(Number(i.dataset.level))))}function Od(){const i=Bt,t=Ri,e=()=>{Bt=i,Ri=t,i==="paused"?(Bt=t,Ps(),dt("restart-game-menu").focus()):(Ci(!1),xl?.focus())};No('<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>',"reset-confirm"),dt("close").onclick=e,dt("cancel-reset").onclick=e,dt("confirm-reset").onclick=async()=>{ne={...fr(),music:ne.music},nr=0,Ys=-1/0,wi=null,Lo(),ki(),await Ni(0),Bt==="playing"&&dt("pause").focus()}}function Fo(){const i=Bt==="complete"?"complete":Bt==="paused"||Bt==="shop"?Ri:Bt,t=wo?kt.index+1:void 0,e=Md(ne.upgrades,kt.index+1);No(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${ne.points} bolts</strong> to spend.</p><div class="upgrade-grid">${Po.filter(s=>s.id!=="drone").map(s=>{const r=Kn(ne.upgrades,s.id),o=Kn(e,s.id),a=mv(ne,s.id,t),c=ol(ne.upgrades,s.id),l=a.reason==="locked",h=l?`Next tier unlocks at level ${a.unlockLevel}`:c===null?"All tiers owned":s.tierDescriptions[r],u=r>o?`<small class="inactive-upgrade">${o?"Next owned tier activates":"Equipped"} from level ${s.unlockLevels[o]}</small>`:"";return`<article class="upgrade ${l?"locked":""}"><div class="upgrade-icon">${{speed:"ϟ",flock:"⌁",drone:"✥",helper:"♧",bark:"♪",cohesion:"❋"}[s.id]}</div><div><h3>${gu(s.name)} <small style="font-size:9px;color:#839277">${r}/3</small></h3><p>${gu(h)}</p>${u}</div><button data-buy="${s.id}" ${a.available?"":"disabled"}>${c===null?"Max tier":l?`Level ${a.unlockLevel}`:`${c} ✦`}</button></article>`}).join("")}</div><button class="primary" id="shop-back">${i==="complete"?"Back to your reward":"Back to the meadow"} <span>➜</span></button>`,"shop"),Ri=i;const n=()=>{i==="complete"?Sl(!1):Ci()};dt("close").onclick=n,dt("shop-back").onclick=n,dt("modal-card").querySelectorAll("[data-buy]").forEach(s=>s.onclick=()=>{const r=gv(ne,s.dataset.buy,t);r.ok&&(Ge.play("purchase"),Lo(),ki(),Fo(),Ri=i,_l(`${r.upgrade.tierNames[r.level-1]} equipped!`))})}let nr=0;function Sl(i=!0){i&&(nr=Wv(ne,kt),Lo(),ki(),Ge.play("completed"),nn.celebrate(kt.target.x,kt.target.z)),Bt="complete";const t=kt.result?.saved??kt.animals.filter(s=>s.saved).length,e=kt.animals.length,n=kt.result?.score??0;No(`<div class="complete-seal">✦</div><div class="eyebrow">${t===e?"A GOOD DAY’S HERDING":"DELIVERY TIME IS UP"}</div><h2>${t===e?"Everyone’s home.":t>0?"A flock brought home.":"Try this meadow again."}</h2><p>${t} / ${e} robots delivered.<br>Score ${n} / ${kt.reward} · Best ${ne.bestScores[kt.index]||0} / ${kt.reward}<br>${Math.floor(dn/60)}m ${Math.floor(dn%60)}s in the countryside.</p><div class="reward">+${nr}<span style="font-size:20px"> ✦</span></div><p>${nr?"Bolts earned from your improved delivery score.":"No extra bolts this time. Deliver more robots to improve your best score."}${t>0&&t<e?" The next meadow is open.":""}</p><button class="primary" id="next">${t===0?"Try again":kt.index>=99?"Return to the first meadow":"Next meadow"} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,"complete"),dt("next").onclick=()=>Ni(t===0?kt.index:kt.index>=99?0:kt.index+1),dt("reward-shop").onclick=Fo,dt("replay").onclick=()=>Ni(kt.index)}let hi=null,Nc={x:0,y:0},Ys=-1/0,wi=null,wl=!1;function ry(i){Bt!=="playing"||hi!==null||i.isPrimary===!1||i.target.closest("button,header,.map-box,.tip")||i.target!==dt("world")&&!i.target.closest("#joystick")||(i.preventDefault(),hi=i.pointerId,Nc={x:i.clientX,y:i.clientY},wl=!1,i.target.setPointerCapture?.(hi))}function oy(i){if(i.pointerId!==hi)return;const t=i.clientX-Nc.x,e=i.clientY-Nc.y,n=Math.hypot(t,e),s=42;wl||=n>9,Dn.x=t/Math.max(s,n),Dn.z=e/Math.max(s,n),dt("stick").style.transform=`translate(${Dn.x*s}px,${Dn.z*s}px)`}function Bd(i){if(i.pointerId===hi){if(i.preventDefault(),i.type!=="pointercancel"&&!wl){const t=performance.now();wi&&Math.hypot(i.clientX-wi.x,i.clientY-wi.y)<42&&t-Ys<330?(Uo(),Ys=-1/0,wi=null):(Ys=t,wi={x:i.clientX,y:i.clientY})}else Ys=-1/0,wi=null;hi=null,Dn.x=Dn.z=0,dt("stick").style.transform="translate(0,0)"}}document.addEventListener("pointerdown",ry,{passive:!1});document.addEventListener("pointermove",oy,{passive:!1});document.addEventListener("pointerup",Bd,{passive:!1});document.addEventListener("pointercancel",Bd,{passive:!1});const bl=i=>i===dt("world")||!!i.closest("#controls");document.addEventListener("touchstart",i=>{Bt==="playing"&&bl(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("touchend",i=>{Bt==="playing"&&bl(i.target)&&(i.preventDefault(),i.target.closest("#bark")&&Uo())},{passive:!1});document.addEventListener("gesturestart",i=>{Bt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("gesturechange",i=>{Bt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("dblclick",i=>{Bt==="playing"&&bl(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("keydown",i=>{if(Bt==="playing"&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","w","a","s","d","W","A","S","D"].includes(i.key)&&!i.target.closest('input,textarea,[contenteditable="true"]')&&!(i.key===" "&&i.target.closest("button"))&&(i.preventDefault(),_n.add(i.key.toLowerCase()),i.key===" "&&Uo()),i.key==="Escape"&&(i.preventDefault(),Ps()),i.key==="Tab"&&!dt("modal").classList.contains("hidden")){const t=[...dt("modal-card").querySelectorAll("button:not([disabled])")],e=t[0],n=t.at(-1);i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())}});document.addEventListener("keyup",i=>_n.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{Ts(),hi=null,Bt==="playing"&&Ps()});document.addEventListener("visibilitychange",()=>{document.hidden&&Bt==="playing"&&Ps()});window.addEventListener("resize",()=>nn?.resize());dt("play").onclick=()=>Ni();dt("restart-game-main").onclick=Od;dt("bark").onclick=Uo;dt("pause").onclick=Ps;dt("home").onclick=i=>{i.preventDefault(),Ps()};dt("wallet").onclick=Fo;dt("sound").onclick=Nd;dt("dismiss-tip").onclick=yl;dt("toggle-tip").onclick=()=>{if(Bt==="playing"){if(!dt("tip").classList.contains("hidden")){yl();return}Io=!1,mr=!0,Tn=0,gl=dn,bo(Ml(kt.index)[0]),Ce("tip",!0),dt("toggle-tip").setAttribute("aria-expanded","true"),dt("toggle-tip").setAttribute("aria-label","Hide tips")}};let Fa=0,kd;function Gd(i){requestAnimationFrame(Gd);const t=Math.min((i-pu)/1e3,.05);if(pu=i,!nn||!kt)return;if(Bt==="playing"){dn+=t;const n=_n.has("arrowright")||_n.has("d")?1:_n.has("arrowleft")||_n.has("a")?-1:Dn.x,s=_n.has("arrowdown")||_n.has("s")?1:_n.has("arrowup")||_n.has("w")?-1:Dn.z,r=Vv(kt,ai,{x:n,z:s,bark:i<ml},t,ne.upgrades);dt("saved").textContent=r.saved,Fd(r.countdownStarted,r.remaining);for(const o of r.events)o.type==="animalSaved"?Ge.play("saved"):o.type==="buddyBark"&&(Ge.play("bark"),nn.bark(o));if(vl(i),!Io){const o=mr||kt.index!==0||Tn>0?sy:5;if(dn-gl>=o){const a=Ml(kt.index);mr?(Tn=(Tn+1)%a.length,bo(a[Tn])):Tn+1<a.length?(Tn++,bo(a[Tn])):yl()}}r.justCompleted&&Sl()}else Bt==="complete"&&!document.hidden&&Gv(kt,t);zo(),iy.update(),nn.update(kt,ai,!document.hidden&&(Bt==="playing"||Bt==="intro"||Bt==="complete")?t:0,Bt==="intro"),kd?.();const e=nn.nature?.weather||kt.weather;if(e){const[n,s]={sun:["☀","Clear skies"],wind:["↝","Breezy"],rain:["☂","Light rain"],"heavy-rain":["☂","Heavy rain"],storm:["ϟ","Thunderstorm"]}[e.kind||e.type||e]||["☀","Clear skies"];dt("weather-status").textContent=n,dt("weather-status").setAttribute("title",s),dt("weather-status").setAttribute("aria-label",s)}Bt==="playing"&&Ge.updateAmbience?.(t,{weather:nn.nature?.weather||kt.weather||"sun",level:kt.index+1,time:kt.time,dog:ai,animals:kt.animals}),Fa+=t,Fa>.1&&(Fa=0,nn.drawMap(dt("map"),kt,ai))}try{nn=new ey(dt("world")),kt=bu(0),ai={...kt.dog,heading:Math.PI/2},nn.setLevel(kt),ki(),Ce("loading",!1),requestAnimationFrame(Gd)}catch(i){Ce("loading",!1),Ce("error",!0),dt("error-message").textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${i.message}`,console.error(i)}Kd(async()=>{const{installQA:i}=await import("./qa-CDZoXb-o.js");return{installQA:i}},__vite__mapDeps([0,1]),import.meta.url).then(({installQA:i})=>{const t=()=>{Bt="qa",Ts(),Ge.pause(),Ci(!1),Ce("controls",!1)},e=async s=>{const r=Ni(s);t(),await r,t()},n=i({getRenderer:()=>nn,getMode:()=>Bt,getState:()=>({level:kt,dog:ai,profile:ne,elapsed:dn}),enterSession:async()=>{wo||(wo=!0,ne=fr(),await e(0))},pause:t,isPaused:()=>Bt==="qa",resume:()=>{if(kt.completed){Sl(!1);return}Bt="playing",Ts(),Ce("controls",!0),Ge.resume()},jump:e,resetSession:async()=>{ne=fr(),nr=0,await e(0)},canOccupy:me,updateWallet:ki});kd=()=>n.update()});export{Oe as a};
