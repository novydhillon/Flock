const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./qa-DS5F87nJ.js","./qa-DWlVkWAo.css"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const od="modulepreload",ad=function(i,t){return new URL(i,t).href},Hl={},cd=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let l=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const o=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=l(e.map(h=>{if(h=ad(h,n),h in Hl)return;Hl[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(n)for(let g=o.length-1;g>=0;g--){const x=o[g];if(x.href===h&&(!u||x.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":od,u||(p.as="script"),p.crossOrigin="",p.href=h,c&&p.setAttribute("nonce",c),document.head.appendChild(p),u)return new Promise((g,x)=>{p.addEventListener("load",g),p.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})};function ld(i,t,e){if(!(e>0)||!Number.isFinite(e))return;const n=t.heading??Math.PI/2,s=Math.atan2(Math.sin(n-i.rotation.y),Math.cos(n-i.rotation.y)),r=t.type==="cow"?Math.PI/1.5:Math.PI,o=Math.max(-r*e,Math.min(r*e,s));i.rotation.y+=o,i.userData.turnSpeed=Math.abs(o)/e}function hd(i,t=0){return Math.max(Math.hypot(i.vx,i.vz),Math.min(2,t))}const Ya=Object.freeze([1,13/12,7/6,1.25]);function Es(i){return i?.type!=="cow"||!Number.isFinite(i.scale)?1:Ya.reduce((t,e)=>Math.abs(e-i.scale)<Math.abs(t-i.scale)?e:t,1)}const Ae=i=>i?.type==="cow"?.78*Es(i):.55,tr=(i,t,e)=>Math.max(t,Math.min(e,i)),xe=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),$c=(i,t)=>{const e=Math.hypot(i,t);return e>1e-8?{x:i/e,z:t/e}:{x:0,z:0}};function qi(i){let t=i>>>0;return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function Kc(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=tr(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return{x:t.x+n*r,z:t.z+s*r,t:r}}function on(i,t,e){return xe(i,Kc(i,t,e))}const mn=i=>({x:Math.sin(i),z:Math.cos(i)});function Jc(i,t){const e=mn(i.heading),n=t.x-i.x,s=t.z-i.z;return{forward:n*e.x+s*e.z,lateral:n*e.z-s*e.x}}function Ii(i,t,e){const n=mn(i.heading);return{x:i.x+n.x*t+n.z*e,z:i.z+n.z*t-n.x*e}}function cn(i){const t=i.radius+1.4,e=t,n=mn(i.heading),s={x:n.z,z:-n.x};return{x:i.x,z:i.z,heading:i.heading,halfLength:t,halfWidth:e,openingWidth:7,forward:n,side:s,corners:[[-t,-e],[t,-e],[t,e],[-t,e]].map(([r,o])=>Ii(i,r,o)),entrance:Ii(i,-t,0)}}function Sr(i,t,e=0){const n=cn(i),s=Jc(i,t),r=Math.max(0,e);return Math.abs(s.forward)<=n.halfLength-r&&Math.abs(s.lateral)<=n.halfWidth-r}function jc(i,t,e){const n=mn(i.heading),s=t.x-i.x,r=t.z-i.z;return Math.abs(s*n.x+r*n.z)<=i.length/2+e&&Math.abs(s*n.z-r*n.x)<=i.width/2-e}const Vl=new WeakMap;function Au(i){let t=Vl.get(i);if(t)return t;const e=mn(i.heading),n={x:e.z,z:-e.x},s=(c,l)=>({x:i.x+e.x*c+n.x*l,z:i.z+e.z*c+n.z*l}),r=[-1,1].map(c=>({a:s(-i.length/2-.1,c*i.width/2),b:s(i.length/2+.1,c*i.width/2),radius:.05,posts:Array.from({length:4},(l,h)=>s(-i.length/2+h*i.length/3,c*i.width/2))})),o=r.flatMap(c=>[c.a,c.b]),a={minX:Math.min(...o.map(c=>c.x)),maxX:Math.max(...o.map(c=>c.x)),minZ:Math.min(...o.map(c=>c.z)),maxZ:Math.max(...o.map(c=>c.z))};return t={rails:r,bounds:a},Vl.set(i,t),t}function ud(i,t,e){const{rails:n,bounds:s}=Au(i),r=e+.065;return t.x<s.minX-r||t.x>s.maxX+r||t.z<s.minZ-r||t.z>s.maxZ+r?!1:n.some(o=>on(t,o.a,o.b)<e+o.radius||o.posts.some(a=>xe(t,a)<e+.065))}function Ru(i,t,e,n){const{rails:s,bounds:r}=Au(i),o=n+.065;return Math.max(t.x,e.x)<r.minX-o||Math.min(t.x,e.x)>r.maxX+o||Math.max(t.z,e.z)<r.minZ-o||Math.min(t.z,e.z)>r.maxZ+o?!1:s.some(a=>Pu(t,e,a.a,a.b,n+a.radius)||a.posts.some(c=>on(c,t,e)<n+.065))}function fd(i,t,e=4){const n=i.points,s=n[0],r=n.at(-1),o=Math.abs(r.x-s.x)>Math.abs(r.z-s.z)?"x":"z",a=n[1][o]-s[o],c=Math.floor((t[o]-s[o])/a),l=Math.ceil(e/Math.abs(a))+2,h=[];for(let u=Math.max(0,c-l);u<Math.min(n.length-1,c+l+1);u++)h.push([n[u],n[u+1]]);return h}const Wl=new WeakMap;function Cu(i){let t=Wl.get(i);return t||(t={minX:Math.min(...i.points.map(e=>e.x)),maxX:Math.max(...i.points.map(e=>e.x)),minZ:Math.min(...i.points.map(e=>e.z)),maxZ:Math.max(...i.points.map(e=>e.z))},Wl.set(i,t)),t}function Qc(i,t,e){const n=Cu(i),s=i.width/2+e;return t.x<n.minX-s||t.x>n.maxX+s||t.z<n.minZ-s||t.z>n.maxZ+s?!1:fd(i,t,s).some(([r,o])=>on(t,r,o)<s)}function dd(i,t,e,n){const s=Cu(i),r=i.width/2+n;return Math.max(t.x,e.x)>=s.minX-r&&Math.min(t.x,e.x)<=s.maxX+r&&Math.max(t.z,e.z)>=s.minZ-r&&Math.min(t.z,e.z)<=s.maxZ+r}function Pu(i,t,e,n,s){if(Math.max(i.x,t.x)<Math.min(e.x,n.x)-s||Math.min(i.x,t.x)>Math.max(e.x,n.x)+s||Math.max(i.z,t.z)<Math.min(e.z,n.z)-s||Math.min(i.z,t.z)>Math.max(e.z,n.z)+s)return!1;const r=(h,u,f)=>(u.x-h.x)*(f.z-h.z)-(u.z-h.z)*(f.x-h.x),o=r(i,t,e),a=r(i,t,n),c=r(e,n,i),l=r(e,n,t);return o*a<0&&c*l<0?!0:Math.min(on(i,e,n),on(t,e,n),on(e,i,t),on(n,i,t))<s}function tl(i){const t=mn(i.heading),e=i.width/2;return{a:{x:i.x-t.z*e,z:i.z+t.x*e},b:{x:i.x+t.z*e,z:i.z-t.x*e},kind:"gate",material:i.material||"wood"}}const zu=i=>i.material==="stone"?.3:.18;function Du(i){return[...i.fenceSegments||[],...(i.gates||[]).filter(t=>t.operable&&!t.open).map(tl)]}function Za(i,t){const e=i.boundary;if(!e)return!0;let n=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const o=e[s],a=e[r];o.z>t.z!=a.z>t.z&&t.x<(a.x-o.x)*(t.z-o.z)/(a.z-o.z)+o.x&&(n=!n)}return n}function he(i,t,e,n=.55){const s={x:t,z:e},r=i.bounds;if(t<r.minX+n+.18||t>r.maxX-n-.18||e<r.minZ+n+.18||e>r.maxZ-n-.18||!Za(i,s))return!1;for(const o of Du(i))if(on(s,o.a,o.b)<n+zu(o))return!1;for(const o of i.rivers||[])if(o.bridges.some(c=>ud(c,s,n))||Qc(o,s,n)&&!o.bridges.some(c=>jc(c,s,n)))return!1;for(const o of i.obstacles||[])if(xe(s,o)<n+o.radius)return!1;return!0}function er(i,t,e,n,s=.55){const r=Math.max(1,Math.ceil(Math.hypot(e,n)/.25)),o=e/r,a=n/r;let c=!1,l=!1;for(let h=0;h<r;h++)he(i,t.x+o,t.z+a,s)?(t.x+=o,t.z+=a):(he(i,t.x+o,t.z,s)?t.x+=o:Math.abs(o)>1e-8&&(c=!0),he(i,t.x,t.z+a,s)?t.z+=a:Math.abs(a)>1e-8&&(l=!0));return{blockedX:c,blockedZ:l}}function Iu(i,t,e,n,s,r=!1){const o=i.bounds;for(const a of[t,e])if(a.x<o.minX+n+.18||a.x>o.maxX-n-.18||a.z<o.minZ+n+.18||a.z>o.maxZ-n-.18)return!1;if(!Za(i,t)||!Za(i,e))return!1;for(const a of Du(i))if(!(r&&a.kind!=="boundary"&&a.kind!=="gate"&&a.material!=="stone"&&(a.kind!=="target"||i.target?.type!=="barn"))&&Pu(t,e,a.a,a.b,n+zu(a)))return!1;for(const a of i.obstacles||[]){const c=n+a.radius;if(!(a.x<Math.min(t.x,e.x)-c||a.x>Math.max(t.x,e.x)+c||a.z<Math.min(t.z,e.z)-c||a.z>Math.max(t.z,e.z)+c)&&on(a,t,e)<c)return!1}for(const a of i.rivers||[]){if(s&&a.bridges.some(l=>Ru(l,t,e,n)))return!1;if(!dd(a,t,e,n))continue;const c=Math.max(1,Math.ceil(xe(t,e)/.45));for(let l=0;l<=c;l++){const h={x:t.x+(e.x-t.x)*l/c,z:t.z+(e.z-t.z)*l/c};if(Qc(a,h,n)&&!a.bridges.some(u=>jc(u,h,n)))return!1}}return!0}function le(i,t,e,n=.55){return Iu(i,t,e,n,!0)}function pd(i,t,e){return Iu(i,t,e,.15,!1,!0)}function qn(i,t,e){for(const n of i?.rivers||[])for(const s of n.bridges)if(jc(s,{x:t,z:e},0)){const r=mn(s.heading),o=(t-s.x)*r.x+(e-s.z)*r.z;return .18+.12*Math.sin(Math.PI*(o/s.length+.5))}return 0}function md(i,t,e){const n=[i[0]];for(let s=1;s<i.length;s++){const r=i[s-1],o=i[s],a=xe(r,o),c=Math.max(1,Math.ceil(a/1.2)),l=$c(o.x-r.x,o.z-r.z),h=t()*Math.PI*2,u=r.kind==="bridge"||o.kind==="bridge"||r.kind==="gate"||o.kind==="gate"||o.kind==="target"?0:Math.min(1.8,a*.045),f=[];for(let g=1;g<=c;g++){const x=g/c,m=Math.sin(Math.PI*x)*Math.sin(Math.PI*2*x+h)*u;f.push({x:r.x+(o.x-r.x)*x-l.z*m,z:r.z+(o.z-r.z)*x+l.x*m,...g===c&&o.kind?{kind:o.kind}:{}})}const p=!e||f.every((g,x)=>le(e,x?f[x-1]:r,g,.85));for(let g=1;g<=c;g++){const x=g/c;n.push(p?f[g-1]:{x:r.x+(o.x-r.x)*x,z:r.z+(o.z-r.z)*x,...g===c&&o.kind?{kind:o.kind}:{}})}}return n}function Lu(i=0,t=i*7919+42){i=tr(Math.floor(Number(i)||0),0,99),t=Number(t)>>>0;const e=qi(t^1129273171),n=qi(t^1296126035),s=qi(t),r=i<5,o=Math.min(5+i*3,65),a=i===1?9.4:r?4.1:4.8,c=r?0:tr((o-30)*.4,0,14)+(o>30?.1:0),l=Math.max(0,i-19),h=r?15+i*3:48+i*3+c+l*.45,u=r?-32:-40,f=h+15,p=r?24:84+Math.floor(i/15)*14+l*.3,g=i<19?0:(n()-.5)*Math.min(p*.7,24+l*.7),m=(r?i===0?0:t%2*2:t%4)*Math.PI/2,d=et=>({x:Number((et.x*Math.cos(m)-et.z*Math.sin(m)).toFixed(6)),z:Number((et.x*Math.sin(m)+et.z*Math.cos(m)).toFixed(6)),...et.kind?{kind:et.kind}:{}}),M=Math.PI/2-m,v=[{x:u,z:-p},{x:f,z:p},{x:u,z:p},{x:f,z:-p}].map(d),_={minX:Math.min(...v.map(et=>et.x)),maxX:Math.max(...v.map(et=>et.x)),minZ:Math.min(...v.map(et=>et.z)),maxZ:Math.max(...v.map(et=>et.z))};r||(_.minZ=Math.min(_.minZ,-p),_.maxZ=Math.max(_.maxZ,p));const y={...d({x:h,z:g}),radius:4.7+Math.sqrt(o)*.2,type:i%3===2?"barn":i%3===1?"field":"pen",heading:M},E=d({x:r?-20:-26,z:0}),C=d({x:r?-26:-33,z:0}),L=r?1:i<15?i%2===1?2:1:i%3===0?3:2,S=r?h-21:h-32,T=i===0?[]:r?[i===1?-10:-12]:i>=15?[S-c-48,S-c-23]:[S-c-23],U=T.map(et=>{const rt=s()*Math.PI*2;return{width:r?3.1:3.7+Math.min(i*.025,1.8),at:st=>et+Math.sin(st/21+rt)*2.4+Math.sin(st/8+rt)*.65}}),k=U.map(et=>({width:et.width,points:Array.from({length:Math.ceil((p*2+64)/2)+1},(rt,st)=>{const It=-p-32+st*2;return{x:et.at(It),z:It}}),bridges:[]})),B=[],W=[],R=s()>.5?1:-1;for(let et=0;et<L;et++){const rt=32+Math.min(l*.32,24),st=L===1?0:(et-(L-1)/2)*(r?12:rt),It=[{x:E.x*Math.cos(m)+E.z*Math.sin(m),z:0}];if(i===0)It.push({x:-8,z:2.8},{x:2,z:-2.2},{x:h-y.radius-3,z:0},{x:h,z:0,kind:"target"});else{if(U.forEach((xt,Yt)=>{const ne=r?i===1?0:R*5:st+R*(Yt%2?-1:1)*(14+Math.min(l*.22,16)+s()*5),P=k[Yt].points,w=tr(Math.floor((ne-P[0].z)/2),0,P.length-2),V=P[w],tt=P[w+1],$=(ne-V.z)/(tt.z-V.z),X=V.x+(tt.x-V.x)*$,ft=$c(tt.z-V.z,V.x-tt.x),it={x:X,z:ne,width:a*1.25,length:xt.width+1.5,heading:Math.atan2(ft.x,ft.z)-m};k[Yt].bridges.push(it);const gt=xt.width/2+2.5+(r?3:6),_t=r?gt:(X-T[Yt]+gt)/ft.x,at=r?gt:(T[Yt]+gt-X)/ft.x,mt={x:X-ft.x*_t,z:ne-ft.z*_t},Lt={x:X+ft.x*at,z:ne+ft.z*at};It.push({x:mt.x-4,z:mt.z-R*(r?3:8)},mt,{x:X,z:ne,kind:"bridge"},Lt)}),i>=2){const xt=r?R*-4:st-R*(13+s()*4),Yt={x:S,z:xt,width:r?8:10,heading:M};B.push(Yt),It.push({x:S-5,z:xt},{x:S,z:xt,kind:"gate"},{x:S+5,z:xt})}const ct=h-y.radius-4;It.push({x:ct-7,z:r?R*3:g+st*.3},{x:ct,z:g},{x:h,z:g,kind:"target"})}W.push(It)}const b=k.map(et=>({width:et.width,points:et.points.map(d),bridges:et.bridges.map(rt=>({...rt,...d(rt)}))})),N=qi(t^1398034254)()<.15,D=qi(t^1195463749),Y=i>=19&&D()<.65,q=Y&&B.length>1&&D()<.5?Math.floor(D()*B.length):-1,F=B.map((et,rt)=>({...et,...d(et),id:`gate-${rt}`,operable:i>=19,open:i<19,material:N?"stone":"wood"})).filter((et,rt)=>i<19||Y&&rt!==q);let K=[{x:_.minX,z:_.minZ},{x:_.maxX,z:_.minZ},{x:_.maxX,z:_.maxZ},{x:_.minX,z:_.maxZ}],wt=-p,Rt=p;if(i>=39){const et=qi(t^1397244240),rt=et()<.5?-1:1,st=et()<.5,It=Math.max(...W.flat().map(w=>w.z*rt),g*rt+y.radius+1.4,8),ct=Math.max(p*.45,It+12),xt=u+(f-u)*.32,Yt=u+(f-u)*.6;K=[{x:u,z:-p},{x:f,z:-p},{x:f,z:ct},...st?[{x:Yt,z:ct},{x:Yt,z:(ct+p)/2},{x:xt,z:(ct+p)/2}]:[{x:xt,z:ct}],{x:xt,z:p},{x:u,z:p}].map(w=>d({x:w.x,z:w.z*rt}));const P=S>=Yt||!st&&S>=xt?ct:S>=xt?(ct+p)/2:p;rt>0?Rt=P:wt=-P}const Tt=K.map((et,rt)=>({a:et,b:K[(rt+1)%K.length],kind:"boundary"}));if(F.length){const et=[...B].sort((st,It)=>st.z-It.z);let rt=wt;for(const st of et)Tt.push({a:d({x:S,z:rt}),b:d({x:S,z:st.z-st.width/2}),kind:"interior"}),rt=st.z+st.width/2;Tt.push({a:d({x:S,z:rt}),b:d({x:S,z:Rt}),kind:"interior"})}const Z=cn(y),Q=Z.halfLength,ot=Z.halfWidth,pt=Z.openingWidth/2,dt=[[[-Q,-ot],[Q,-ot]],[[Q,-ot],[Q,ot]],[[Q,ot],[-Q,ot]],[[-Q,ot],[-Q,pt]],[[-Q,-pt],[-Q,-ot]]];for(const[et,rt]of dt)Tt.push({a:Ii(y,...et),b:Ii(y,...rt),kind:"target"});for(const et of Tt)et.material=N&&et.kind!=="target"?"stone":"wood";const kt={bounds:_,boundary:K,rivers:b,fenceSegments:Tt,obstacles:[]},Vt=W.map((et,rt)=>{const st=md(et.map(d),s,kt);return{id:`route-${rt}`,points:st,length:st.slice(1).reduce((It,ct,xt)=>It+xe(ct,st[xt]),0)}}),I=Vt.map(et=>({routeId:et.id,points:et.points,width:a})),qt={index:i,seed:t,title:["First day on the farm","Over the babbling brook","Through the garden gate","A mixed-up meadow","The long way home"][i]||`Pasture patrol ${i+1}`,description:i===0?"Move behind the sheep and gently guide all five into the sunny pen.":`Bring ${o} robots to the ${y.type}. ${L>1?"Choose a crossing and lead your flock through the meadow.":"Follow the winding trail and use the crossings."}`,bounds:_,boundary:K,spawn:E,dog:C,target:y,animals:[],rivers:b,gates:F,fences:[],fenceSegments:Tt,obstacles:[],routes:Vt,roads:I,reward:80+i*25,sceneryHills:[]};for(let et=0;et<o;et++){const rt=d({x:(r?-20:-26)+Math.floor(et/7)*1.65+(s()-.5)*.2,z:(et%7-3)*1.65+(s()-.5)*.2}),st=i>=3&&et%4===0?"cow":"sheep";qt.animals.push({id:et,type:st,...st==="cow"?{scale:Ya[Math.floor(e()*Ya.length)]}:{},...rt,vx:0,vz:0,saved:!1})}if(qt.animals.some(et=>!he(qt,et.x,et.z,Ae(et)))){const et=mn(M),rt=qt.animals.map(st=>({x:st.x,z:st.z}));for(let st=1;st<=7;st++){const It=st*.5,ct=rt.map(xt=>({x:xt.x-et.x*It,z:xt.z-et.z*It}));if(ct.every((xt,Yt)=>he(qt,xt.x,xt.z,Ae(qt.animals[Yt])))){ct.forEach((xt,Yt)=>Object.assign(qt.animals[Yt],xt));break}}}for(const et of qt.animals){if(et.type!=="cow")continue;const rt=Ae(et),st={x:et.x,z:et.z},It=xt=>he(qt,xt.x,xt.z,rt)&&qt.animals.every(Yt=>Yt===et||xe(xt,Yt)>=rt+Ae(Yt)+.01);if(It(st))continue;let ct=!1;for(let xt=1;xt<=40&&!ct;xt++)for(let Yt=0;Yt<24;Yt++){const ne=Yt*Math.PI/12,P={x:st.x+Math.cos(ne)*xt*.1,z:st.z+Math.sin(ne)*xt*.1};if(It(P)){Object.assign(et,P),ct=!0;break}}}for(let et=0;et<Math.min(10+i*2,130);et++){const rt=d({x:u+5+s()*(f-u-10),z:-p+5+s()*(p*2-10)}),st=.7+s()*.7;xe(rt,E)<14||xe(rt,y)<y.radius+10||!he(qt,rt.x,rt.z,st+1)||Vt.some(It=>It.points.slice(1).some((ct,xt)=>on(rt,It.points[xt],ct)<7+st))||qt.obstacles.push({...rt,radius:st})}for(let et=0;et<14;et++){const rt=7+s()*8,st=3+s()*5,It=et%4,ct=It===0?{x:_.minX-rt-3,z:_.minZ+s()*(_.maxZ-_.minZ)}:It===1?{x:_.maxX+rt+3,z:_.minZ+s()*(_.maxZ-_.minZ)}:It===2?{x:_.minX+s()*(_.maxX-_.minX),z:_.minZ-rt-3}:{x:_.minX+s()*(_.maxX-_.minX),z:_.maxZ+rt+3};qt.sceneryHills.push({...ct,radius:rt,height:st})}return qt}function Xl(i,t,e){let n=null;for(const s of i.routes||[]){if(e&&s.id!==e)continue;let r=0;for(let o=1;o<s.points.length;o++){const a=s.points[o-1],c=s.points[o],l=Kc(t,a,c),h=xe(t,l),u=xe(a,c);(!n||h<n.distance)&&(n={route:s,routeId:s.id,index:o-1,point:l,distance:h,progress:r+u*l.t,length:s.length}),r+=u}}return n}function Uu(i,t){const e=i.target,n=cn(e).halfLength,{forward:s,lateral:r}=Jc(e,t),o=(a,c)=>Ii(e,a,c);return s>n+.4?o(n+2,Math.sign(r||1)*(n+2)):Math.abs(r)>n-.4&&s>-n-.8?o(-n-2,Math.sign(r||1)*(n+2)):s<-n+.7?o(-n+2,0):e}function gd(i,t,e,n){if(le(i,t,e,n))return e;const s=Xl(i,t),r=Xl(i,e,s?.routeId);if(!s||!r)return e;const o=r.progress>=s.progress,a=s.route.points;if(s.distance>3&&le(i,t,s.point,n))return s.point;const c=o?Math.min(a.length-1,s.index+5):Math.max(0,s.index-4);for(let l=c;o?l>s.index:l<=s.index;l+=o?-1:1)if(le(i,t,a[l],n))return a[l];return s.point}function el(i,t,e,n=.62){if(le(i,t,e,n))return e;const s=gd(i,t,e,n),r=(i.rivers||[]).flatMap(g=>g.bridges).filter(g=>xe(t,g)<g.length+g.width+8||Ru(g,t,e,n)).sort((g,x)=>Math.min(xe(t,g),xe(e,g))-Math.min(xe(t,x),xe(e,x))).slice(0,2),o=i.target,a=o&&cn(o),c=a&&(xe(t,o)<a.halfLength*2+6||xe(e,o)<a.halfLength*2+6);if(!r.length&&!c)return s;const l=[t,e,s];for(const g of r){const x=mn(g.heading),m=g.length/2+n+.4,d=g.width/2+n+.4;for(const[M,v]of[[-m,-d],[-m,d],[m,-d],[m,d],[-m,0],[m,0],[0,0]])l.push({x:g.x+x.x*M+x.z*v,z:g.z+x.z*M-x.x*v})}if(c){const g=a.halfLength+n+.5;for(const[x,m]of[[-g,-g],[-g,g],[g,-g],[g,g],[-g,0],[-a.halfLength+n+.5,0]])l.push(Ii(o,x,m))}const h=l.map(()=>1/0),u=[],f=new Set;h[0]=0;for(let g=0;g<l.length;g++){let x=-1;for(let m=0;m<l.length;m++)!f.has(m)&&(x<0||h[m]<h[x])&&(x=m);if(x<0||!Number.isFinite(h[x]))break;f.add(x);for(let m=1;m<l.length;m++){if(f.has(m)||!le(i,l[x],l[m],n))continue;const d=h[x]+xe(l[x],l[m]);d<h[m]&&(h[m]=d,u[m]=x)}}let p=Number.isFinite(h[1])?1:Number.isFinite(h[2])?2:-1;if(p<0)return s;for(;u[p]!==0&&u[p]!==void 0;)p=u[p];return l[p]}function xd(i,t,e,n,s=.78){const r=Math.hypot(e,n);if(r<.01)return{x:0,z:0};const o={x:t.x+e/r*2,z:t.z+n/r*2};if(le(i,t,o,s))return{x:0,z:0};let a=null,c=1/0;for(const g of i.rivers||[])if(Qc(g,t,3))for(const x of g.bridges){const m=xe(t,x);m<c&&(c=m,a=x)}const l=i.target,h=cn(l),u={...h.entrance,width:h.openingWidth,heading:l.heading,enclosure:!0};for(const g of[...(i.gates||[]).filter(x=>!x.operable||x.open),u]){const x=mn(g.heading),m=t.x-g.x,d=t.z-g.z;Math.abs(m*x.x+d*x.z)<3&&xe(t,g)<c&&(c=xe(t,g),a=g)}if((i.fenceSegments||[]).some(g=>g.kind==="target"&&on(t,g.a,g.b)<s+2)&&(a=u),!a)return{x:0,z:0};if(a.length||a.enclosure){let g=a;if(a.length){const d=mn(a.heading),M=(t.x-a.x)*d.x+(t.z-a.z)*d.z,v=(t.x-a.x)*d.z-(t.z-a.z)*d.x,_=Math.max(0,a.width/2-s-.35),y=tr(v,-_,_),E=(Math.sign(M)||1)*a.length/2;g={x:a.x+d.x*E+d.z*y,z:a.z+d.z*E-d.x*y}}const x=el(i,t,g,s),m=$c(x.x-t.x,x.z-t.z);return{x:m.x*Math.min(2.4,r*.8+.5),z:m.z*Math.min(2.4,r*.8+.5)}}const f=mn(a.heading),p=(a.x-t.x)*f.z-(a.z-t.z)*f.x;return Math.abs(p)<a.width/2-1?{x:0,z:0}:{x:f.z*Math.sign(p)*Math.min(2.4,r*.8+.5),z:-f.x*Math.sign(p)*Math.min(2.4,r*.8+.5)}}const ql=new WeakMap,Yi=8;function _d(i,t){const e=i.roads||[];let n=ql.get(i);if(!n||n.roads!==e){const s=new Map;for(const r of e)for(let o=1;o<r.points.length;o++){const a=r.points[o-1],c=r.points[o],l=r.width/2+.5;for(let h=Math.floor((Math.min(a.x,c.x)-l)/Yi);h<=Math.floor((Math.max(a.x,c.x)+l)/Yi);h++)for(let u=Math.floor((Math.min(a.z,c.z)-l)/Yi);u<=Math.floor((Math.max(a.z,c.z)+l)/Yi);u++){const f=`${h},${u}`,p=s.get(f)||[];p.push({a,b:c,radius:l}),s.set(f,p)}}n={roads:e,cells:s},ql.set(i,n)}return n.cells.get(`${Math.floor(t.x/Yi)},${Math.floor(t.z/Yi)}`)||[]}function Nu(i,t){if(i.target?.type==="barn"&&Sr(i.target,t))return!1;for(const e of i.rivers||[])for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,o=Math.sin(n.heading),a=Math.cos(n.heading);if(Math.abs(s*o+r*a)<=n.length/2+.2&&Math.abs(s*a-r*o)<=n.width/2+.2)return!1}for(const{a:e,b:n,radius:s}of _d(i,t))if(on(t,e,n)<=s)return!1;return he(i,t.x,t.z,0)}function vd(i,t,e,n){if(!(n>0)||!Number.isFinite(n))return;const s=i.userData,r=Math.hypot(t.vx,t.vz)<.45&&(t.alert||0)<.03&&(s.turnSpeed||0)<.05&&!t.wander&&!t.bridgeCrossing,o=s.grazeAnchor,a=o&&Math.hypot(t.x-o.x,t.z-o.z)<=.75;if((!r||!a)&&(s.grazeAnchor={x:t.x,z:t.z},s.grazeWait=0),!r&&!(s.graze>0)){s.grazeWait=0,s.graze=0,s.grazeTime=(s.grazeTime||0)+n;return}const c=(t.type==="cow"?1.05:.65)*Es(t),l={x:t.x+Math.sin(i.rotation.y)*c,z:t.z+Math.cos(i.rotation.y)*c},h=Math.sin(i.rotation.y),u=Math.cos(i.rotation.y),f=Es(t),p=t.type==="cow",g=(p?.45:.3)*f,x=(p?.56:.36)*f,m=(p?-.59:-.36)*f,d=[-g,g].flatMap(_=>[m,x].map(y=>({x:t.x+u*_+h*y,z:t.z-h*_+u*y}))),M=[t,l,...d].every(_=>Nu(e,_));s.grazeWait=M&&r?(s.grazeWait||0)+n:0;const v=s.grazeWait+1e-9>=7&&Math.hypot(t.vx,t.vz)<.1?1:0;s.graze=M?(s.graze||0)+Math.max(-n*4,Math.min(n*2,v-(s.graze||0))):0,s.grazeTime=(s.grazeTime||0)+n}function Md(i,t){return(i.graze||0)*(1.05+Math.sin((i.grazeTime||0)*3+t*1.7)*.02)}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nl="180",yd=0,Yl=1,Sd=2,Fu=1,Ou=2,Wn=3,fi=0,$e=1,Ce=2,ci=0,Ms=1,Zl=2,$l=3,Kl=4,wd=5,Ei=100,bd=101,Ed=102,Td=103,Ad=104,Rd=200,Cd=201,Pd=202,zd=203,$a=204,Ka=205,Dd=206,Id=207,Ld=208,Ud=209,Nd=210,Fd=211,Od=212,Bd=213,kd=214,Ja=0,ja=1,Qa=2,Ts=3,tc=4,ec=5,nc=6,ic=7,Bu=0,Gd=1,Hd=2,li=0,Vd=1,Wd=2,Xd=3,ku=4,qd=5,Yd=6,Zd=7,Gu=300,As=301,Rs=302,sc=303,rc=304,Do=306,$n=1e3,Ai=1001,oc=1002,an=1003,$d=1004,Rr=1005,Sn=1006,Zo=1007,Ri=1008,Ln=1009,Hu=1010,Vu=1011,lr=1012,il=1013,Li=1014,Pn=1015,wr=1016,sl=1017,rl=1018,hr=1020,Wu=35902,Xu=35899,qu=1021,Yu=1022,wn=1023,ur=1026,fr=1027,ol=1028,al=1029,Zu=1030,cl=1031,ll=1033,ho=33776,uo=33777,fo=33778,po=33779,ac=35840,cc=35841,lc=35842,hc=35843,uc=36196,fc=37492,dc=37496,pc=37808,mc=37809,gc=37810,xc=37811,_c=37812,vc=37813,Mc=37814,yc=37815,Sc=37816,wc=37817,bc=37818,Ec=37819,Tc=37820,Ac=37821,Rc=36492,Cc=36494,Pc=36495,zc=36283,Dc=36284,Ic=36285,Lc=36286,Kd=3200,Jd=3201,$u=0,jd=1,ri="",De="srgb",Cs="srgb-linear",_o="linear",de="srgb",Zi=7680,Jl=519,Qd=512,tp=513,ep=514,Ku=515,np=516,ip=517,sp=518,rp=519,Uc=35044,gs=35048,jl="300 es",zn=2e3,vo=2001;class Ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$o=Math.PI/180,Nc=180/Math.PI;function Yn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[i&255]+Fe[i>>8&255]+Fe[i>>16&255]+Fe[i>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Kt(i,t,e){return Math.max(t,Math.min(e,i))}function op(i,t){return(i%t+t)%t}function Ko(i,t,e){return(1-e)*i+e*t}function Cn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function pe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(u!==x||c!==f||l!==p||h!==g){let m=1-a;const d=c*f+l*p+h*g+u*x,M=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const y=Math.sqrt(v),E=Math.atan2(y,d*M);m=Math.sin(m*E)/y,a=Math.sin(a*E)/y}const _=a*M;if(c=c*m+f*_,l=l*m+p*_,h=h*m+g*_,u=u*m+x*_,m===1-a){const y=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=y,l*=y,h*=y,u*=y}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+h*u+c*p-l*f,t[e+1]=c*g+h*f+l*u-a*p,t[e+2]=l*g+h*p+a*f-c*u,t[e+3]=h*g-a*u-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u+f*p*g;break;case"YZX":this._x=f*h*u+l*p*g,this._y=l*p*u+f*h*g,this._z=l*h*g-f*p*u,this._w=l*h*u-f*p*g;break;case"XZY":this._x=f*h*u-l*p*g,this._y=l*p*u-f*h*g,this._z=l*h*g+f*p*u,this._w=l*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){const p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Kt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ql.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ql.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Jo.copy(this).projectOnVector(t),this.sub(Jo)}reflect(t){return this.sub(Jo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jo=new z,Ql=new Kn;class Jt{constructor(t,e,n,s,r,o,a,c,l){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],p=n[5],g=n[8],x=s[0],m=s[3],d=s[6],M=s[1],v=s[4],_=s[7],y=s[2],E=s[5],C=s[8];return r[0]=o*x+a*M+c*y,r[3]=o*m+a*v+c*E,r[6]=o*d+a*_+c*C,r[1]=l*x+h*M+u*y,r[4]=l*m+h*v+u*E,r[7]=l*d+h*_+u*C,r[2]=f*x+p*M+g*y,r[5]=f*m+p*v+g*E,r[8]=f*d+p*_+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,p=l*r-o*c,g=e*u+n*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(s*l-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-a*e)*x,t[6]=p*x,t[7]=(n*c-l*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(jo.makeScale(t,e)),this}rotate(t){return this.premultiply(jo.makeRotation(-t)),this}translate(t,e){return this.premultiply(jo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const jo=new Jt;function Ju(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Mo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ap(){const i=Mo("canvas");return i.style.display="block",i}const th={};function dr(i){i in th||(th[i]=!0,console.warn(i))}function cp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const eh=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),nh=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lp(){const i={enabled:!0,workingColorSpace:Cs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===de&&(s.r=Zn(s.r),s.g=Zn(s.g),s.b=Zn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===de&&(s.r=ys(s.r),s.g=ys(s.g),s.b=ys(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ri?_o:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return dr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return dr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Cs]:{primaries:t,whitePoint:n,transfer:_o,toXYZ:eh,fromXYZ:nh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:De},outputColorSpaceConfig:{drawingBufferColorSpace:De}},[De]:{primaries:t,whitePoint:n,transfer:de,toXYZ:eh,fromXYZ:nh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:De}}}),i}const ae=lp();function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ys(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let $i;class hp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{$i===void 0&&($i=Mo("canvas")),$i.width=t.width,$i.height=t.height;const s=$i.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=$i}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Mo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Zn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Zn(e[n]/255)*255):e[n]=Zn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let up=0;class hl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:up++}),this.uuid=Yn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Qo(s[o].image)):r.push(Qo(s[o]))}else r=Qo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Qo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?hp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let fp=0;const ta=new z;class ke extends Ls{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,n=Ai,s=Ai,r=Sn,o=Ri,a=wn,c=Ln,l=ke.DEFAULT_ANISOTROPY,h=ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Yn(),this.name="",this.source=new hl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ta).x}get height(){return this.source.getSize(ta).y}get depth(){return this.source.getSize(ta).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $n:t.x=t.x-Math.floor(t.x);break;case Ai:t.x=t.x<0?0:1;break;case oc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $n:t.y=t.y-Math.floor(t.y);break;case Ai:t.y=t.y<0?0:1;break;case oc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null;ke.DEFAULT_MAPPING=Gu;ke.DEFAULT_ANISOTROPY=1;class Te{constructor(t=0,e=0,n=0,s=1){Te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],g=c[9],x=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,_=(p+1)/2,y=(d+1)/2,E=(h+f)/4,C=(u+x)/4,L=(g+m)/4;return v>_&&v>y?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=E/n,r=C/n):_>y?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=E/s,r=L/s):y<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(y),n=C/r,s=L/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(f-h)/M,this.w=Math.acos((l+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Kt(this.x,t.x,e.x),this.y=Kt(this.y,t.y,e.y),this.z=Kt(this.z,t.z,e.z),this.w=Kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Kt(this.x,t,e),this.y=Kt(this.y,t,e),this.z=Kt(this.z,t,e),this.w=Kt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dp extends Ls{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new ke(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:Sn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new hl(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ui extends dp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ju extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class pp extends ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ki{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Cr.copy(n.boundingBox)),Cr.applyMatrix4(t.matrixWorld),this.union(Cr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),Pr.subVectors(this.max,Os),Ki.subVectors(t.a,Os),Ji.subVectors(t.b,Os),ji.subVectors(t.c,Os),jn.subVectors(Ji,Ki),Qn.subVectors(ji,Ji),xi.subVectors(Ki,ji);let e=[0,-jn.z,jn.y,0,-Qn.z,Qn.y,0,-xi.z,xi.y,jn.z,0,-jn.x,Qn.z,0,-Qn.x,xi.z,0,-xi.x,-jn.y,jn.x,0,-Qn.y,Qn.x,0,-xi.y,xi.x,0];return!ea(e,Ki,Ji,ji,Pr)||(e=[1,0,0,0,1,0,0,0,1],!ea(e,Ki,Ji,ji,Pr))?!1:(zr.crossVectors(jn,Qn),e=[zr.x,zr.y,zr.z],ea(e,Ki,Ji,ji,Pr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const On=[new z,new z,new z,new z,new z,new z,new z,new z],gn=new z,Cr=new ki,Ki=new z,Ji=new z,ji=new z,jn=new z,Qn=new z,xi=new z,Os=new z,Pr=new z,zr=new z,_i=new z;function ea(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){_i.fromArray(i,r);const a=s.x*Math.abs(_i.x)+s.y*Math.abs(_i.y)+s.z*Math.abs(_i.z),c=t.dot(_i),l=e.dot(_i),h=n.dot(_i);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const mp=new ki,Bs=new z,na=new z;class pi{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):mp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Bs.subVectors(t,this.center);const e=Bs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Bs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(na.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Bs.copy(t.center).add(na)),this.expandByPoint(Bs.copy(t.center).sub(na))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Bn=new z,ia=new z,Dr=new z,ti=new z,sa=new z,Ir=new z,ra=new z;class Qu{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ia.copy(t).add(e).multiplyScalar(.5),Dr.copy(e).sub(t).normalize(),ti.copy(this.origin).sub(ia);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Dr),a=ti.dot(this.direction),c=-ti.dot(Dr),l=ti.lengthSq(),h=Math.abs(1-o*o);let u,f,p,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const x=1/h;u*=x,f*=x,p=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ia).addScaledVector(Dr,f),p}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,s,r){sa.subVectors(e,t),Ir.subVectors(n,t),ra.crossVectors(sa,Ir);let o=this.direction.dot(ra),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,t);const c=a*this.direction.dot(Ir.crossVectors(ti,Ir));if(c<0)return null;const l=a*this.direction.dot(sa.cross(ti));if(l<0||c+l>o)return null;const h=-a*ti.dot(ra);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,n,s,r,o,a,c,l,h,u,f,p,g,x,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,p,g,x,m)}set(t,e,n,s,r,o,a,c,l,h,u,f,p,g,x,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=x,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Qi.setFromMatrixColumn(t,0).length(),r=1/Qi.setFromMatrixColumn(t,1).length(),o=1/Qi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,p=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+g*l,e[5]=f-x*l,e[9]=-a*c,e[2]=x-f*l,e[6]=g+p*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,p=c*u,g=l*h,x=l*u;e[0]=f+x*a,e[4]=g*a-p,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-g,e[6]=x+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,p=c*u,g=l*h,x=l*u;e[0]=f-x*a,e[4]=-o*u,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,p=o*u,g=a*h,x=a*u;e[0]=c*h,e[4]=g*l-p,e[8]=f*l+x,e[1]=c*u,e[5]=x*l+f,e[9]=p*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=x-f*u,e[8]=g*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*u+g,e[10]=f-x*u}else if(t.order==="XZY"){const f=o*c,p=o*l,g=a*c,x=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+x,e[5]=o*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(gp,t,xp)}lookAt(t,e,n){const s=this.elements;return je.subVectors(t,e),je.lengthSq()===0&&(je.z=1),je.normalize(),ei.crossVectors(n,je),ei.lengthSq()===0&&(Math.abs(n.z)===1?je.x+=1e-4:je.z+=1e-4,je.normalize(),ei.crossVectors(n,je)),ei.normalize(),Lr.crossVectors(je,ei),s[0]=ei.x,s[4]=Lr.x,s[8]=je.x,s[1]=ei.y,s[5]=Lr.y,s[9]=je.y,s[2]=ei.z,s[6]=Lr.z,s[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],p=n[13],g=n[2],x=n[6],m=n[10],d=n[14],M=n[3],v=n[7],_=n[11],y=n[15],E=s[0],C=s[4],L=s[8],S=s[12],T=s[1],U=s[5],k=s[9],B=s[13],W=s[2],R=s[6],b=s[10],N=s[14],D=s[3],Y=s[7],q=s[11],F=s[15];return r[0]=o*E+a*T+c*W+l*D,r[4]=o*C+a*U+c*R+l*Y,r[8]=o*L+a*k+c*b+l*q,r[12]=o*S+a*B+c*N+l*F,r[1]=h*E+u*T+f*W+p*D,r[5]=h*C+u*U+f*R+p*Y,r[9]=h*L+u*k+f*b+p*q,r[13]=h*S+u*B+f*N+p*F,r[2]=g*E+x*T+m*W+d*D,r[6]=g*C+x*U+m*R+d*Y,r[10]=g*L+x*k+m*b+d*q,r[14]=g*S+x*B+m*N+d*F,r[3]=M*E+v*T+_*W+y*D,r[7]=M*C+v*U+_*R+y*Y,r[11]=M*L+v*k+_*b+y*q,r[15]=M*S+v*B+_*N+y*F,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],x=t[7],m=t[11],d=t[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*p-n*c*p)+x*(+e*c*p-e*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+m*(+e*l*u-e*a*p-r*o*u+n*o*p+r*a*h-n*l*h)+d*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],x=t[13],m=t[14],d=t[15],M=u*m*l-x*f*l+x*c*p-a*m*p-u*c*d+a*f*d,v=g*f*l-h*m*l-g*c*p+o*m*p+h*c*d-o*f*d,_=h*x*l-g*u*l+g*a*p-o*x*p-h*a*d+o*u*d,y=g*u*c-h*x*c-g*a*f+o*x*f+h*a*m-o*u*m,E=e*M+n*v+s*_+r*y;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/E;return t[0]=M*C,t[1]=(x*f*r-u*m*r-x*s*p+n*m*p+u*s*d-n*f*d)*C,t[2]=(a*m*r-x*c*r+x*s*l-n*m*l-a*s*d+n*c*d)*C,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*p-n*c*p)*C,t[4]=v*C,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*C,t[6]=(g*c*r-o*m*r-g*s*l+e*m*l+o*s*d-e*c*d)*C,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*p+e*c*p)*C,t[8]=_*C,t[9]=(g*u*r-h*x*r-g*n*p+e*x*p+h*n*d-e*u*d)*C,t[10]=(o*x*r-g*a*r+g*n*l-e*x*l-o*n*d+e*a*d)*C,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*p-e*a*p)*C,t[12]=y*C,t[13]=(h*x*s-g*u*s+g*n*f-e*x*f-h*n*m+e*u*m)*C,t[14]=(g*a*s-o*x*s-g*n*c+e*x*c+o*n*m-e*a*m)*C,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*C,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,p=r*h,g=r*u,x=o*h,m=o*u,d=a*u,M=c*l,v=c*h,_=c*u,y=n.x,E=n.y,C=n.z;return s[0]=(1-(x+d))*y,s[1]=(p+_)*y,s[2]=(g-v)*y,s[3]=0,s[4]=(p-_)*E,s[5]=(1-(f+d))*E,s[6]=(m+M)*E,s[7]=0,s[8]=(g+v)*C,s[9]=(m-M)*C,s[10]=(1-(f+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Qi.set(s[0],s[1],s[2]).length();const o=Qi.set(s[4],s[5],s[6]).length(),a=Qi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],xn.copy(this);const l=1/r,h=1/o,u=1/a;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,e.setFromRotationMatrix(xn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=zn,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),p=(n+s)/(n-s);let g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===zn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===vo)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=zn,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),p=-(n+s)/(n-s);let g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===zn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===vo)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Qi=new z,xn=new se,gp=new z(0,0,0),xp=new z(1,1,1),ei=new z,Lr=new z,je=new z,ih=new se,sh=new Kn;class En{constructor(t=0,e=0,n=0,s=En.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ih.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ih,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return sh.setFromEuler(this),this.setFromQuaternion(sh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}En.DEFAULT_ORDER="XYZ";class tf{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let _p=0;const rh=new z,ts=new Kn,kn=new se,Ur=new z,ks=new z,vp=new z,Mp=new Kn,oh=new z(1,0,0),ah=new z(0,1,0),ch=new z(0,0,1),lh={type:"added"},yp={type:"removed"},es={type:"childadded",child:null},oa={type:"childremoved",child:null};class we extends Ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=Yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=we.DEFAULT_UP.clone();const t=new z,e=new En,n=new Kn,s=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new se},normalMatrix:{value:new Jt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=we.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.multiply(ts),this}rotateOnWorldAxis(t,e){return ts.setFromAxisAngle(t,e),this.quaternion.premultiply(ts),this}rotateX(t){return this.rotateOnAxis(oh,t)}rotateY(t){return this.rotateOnAxis(ah,t)}rotateZ(t){return this.rotateOnAxis(ch,t)}translateOnAxis(t,e){return rh.copy(t).applyQuaternion(this.quaternion),this.position.add(rh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oh,t)}translateY(t){return this.translateOnAxis(ah,t)}translateZ(t){return this.translateOnAxis(ch,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ur.copy(t):Ur.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(ks,Ur,this.up):kn.lookAt(Ur,ks,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),ts.setFromRotationMatrix(kn),this.quaternion.premultiply(ts.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lh),es.child=t,this.dispatchEvent(es),es.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(yp),oa.child=t,this.dispatchEvent(oa),oa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(kn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lh),es.child=t,this.dispatchEvent(es),es.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,t,vp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ks,Mp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}we.DEFAULT_UP=new z(0,1,0);we.DEFAULT_MATRIX_AUTO_UPDATE=!0;we.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const _n=new z,Gn=new z,aa=new z,Hn=new z,ns=new z,is=new z,hh=new z,ca=new z,la=new z,ha=new z,ua=new Te,fa=new Te,da=new Te;class rn{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),_n.subVectors(t,e),s.cross(_n);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){_n.subVectors(s,e),Gn.subVectors(n,e),aa.subVectors(t,e);const o=_n.dot(_n),a=_n.dot(Gn),c=_n.dot(aa),l=Gn.dot(Gn),h=Gn.dot(aa),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Hn.x),c.addScaledVector(o,Hn.y),c.addScaledVector(a,Hn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return ua.setScalar(0),fa.setScalar(0),da.setScalar(0),ua.fromBufferAttribute(t,e),fa.fromBufferAttribute(t,n),da.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ua,r.x),o.addScaledVector(fa,r.y),o.addScaledVector(da,r.z),o}static isFrontFacing(t,e,n,s){return _n.subVectors(n,e),Gn.subVectors(t,e),_n.cross(Gn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),_n.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return rn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return rn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return rn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return rn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return rn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ns.subVectors(s,n),is.subVectors(r,n),ca.subVectors(t,n);const c=ns.dot(ca),l=is.dot(ca);if(c<=0&&l<=0)return e.copy(n);la.subVectors(t,s);const h=ns.dot(la),u=is.dot(la);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ns,o);ha.subVectors(t,r);const p=ns.dot(ha),g=is.dot(ha);if(g>=0&&p<=g)return e.copy(r);const x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(is,a);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return hh.subVectors(r,s),a=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(hh,a);const d=1/(m+x+f);return o=x*d,a=f*d,e.copy(n).addScaledVector(ns,o).addScaledVector(is,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ef={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},Nr={h:0,s:0,l:0};function pa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=De){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=op(t,1),e=Kt(e,0,1),n=Kt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=pa(o,r,t+1/3),this.g=pa(o,r,t),this.b=pa(o,r,t-1/3)}return ae.colorSpaceToWorking(this,s),this}setStyle(t,e=De){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=De){const n=ef[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=ys(t.r),this.g=ys(t.g),this.b=ys(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=De){return ae.workingToColorSpace(Oe.copy(this),t),Math.round(Kt(Oe.r*255,0,255))*65536+Math.round(Kt(Oe.g*255,0,255))*256+Math.round(Kt(Oe.b*255,0,255))}getHexString(t=De){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace(Oe.copy(this),e);const n=Oe.r,s=Oe.g,r=Oe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=De){ae.workingToColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,s=Oe.b;return t!==De?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ni),this.setHSL(ni.h+t,ni.s+e,ni.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ni),t.getHSL(Nr);const n=Ko(ni.h,Nr.h,e),s=Ko(ni.s,Nr.s,e),r=Ko(ni.l,Nr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Ht;Ht.NAMES=ef;let Sp=0;class Gi extends Ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=Yn(),this.name="",this.type="Material",this.blending=Ms,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$a,this.blendDst=Ka,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=Ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zi,this.stencilZFail=Zi,this.stencilZPass=Zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(n.blending=this.blending),this.side!==fi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$a&&(n.blendSrc=this.blendSrc),this.blendDst!==Ka&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class nn extends Gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Bu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Re=new z,Fr=new Et;let wp=0;class Ge{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Uc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fr.fromBufferAttribute(this,e),Fr.applyMatrix3(t),this.setXY(e,Fr.x,Fr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Cn(e,this.array)),e}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Cn(e,this.array)),e}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Cn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Cn(e,this.array)),e}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Uc&&(t.usage=this.usage),t}}class nf extends Ge{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class sf extends Ge{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class jt extends Ge{constructor(t,e,n){super(new Float32Array(t),e,n)}}let bp=0;const un=new se,ma=new we,ss=new z,Qe=new ki,Gs=new ki,Ue=new z;class ve extends Ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ju(t)?sf:nf)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return un.makeRotationFromQuaternion(t),this.applyMatrix4(un),this}rotateX(t){return un.makeRotationX(t),this.applyMatrix4(un),this}rotateY(t){return un.makeRotationY(t),this.applyMatrix4(un),this}rotateZ(t){return un.makeRotationZ(t),this.applyMatrix4(un),this}translate(t,e,n){return un.makeTranslation(t,e,n),this.applyMatrix4(un),this}scale(t,e,n){return un.makeScale(t,e,n),this.applyMatrix4(un),this}lookAt(t){return ma.lookAt(t),ma.updateMatrix(),this.applyMatrix4(ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ss).negate(),this.translate(ss.x,ss.y,ss.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ki);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Ue.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Ue),Ue.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Ue)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Gs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ue.addVectors(Qe.min,Gs.min),Qe.expandByPoint(Ue),Ue.addVectors(Qe.max,Gs.max),Qe.expandByPoint(Ue)):(Qe.expandByPoint(Gs.min),Qe.expandByPoint(Gs.max))}Qe.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Ue.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ue));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ue.fromBufferAttribute(a,l),c&&(ss.fromBufferAttribute(t,l),Ue.add(ss)),s=Math.max(s,n.distanceToSquared(Ue))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new z,c[L]=new z;const l=new z,h=new z,u=new z,f=new Et,p=new Et,g=new Et,x=new z,m=new z;function d(L,S,T){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,T),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,T),h.sub(l),u.sub(l),p.sub(f),g.sub(f);const U=1/(p.x*g.y-g.x*p.y);isFinite(U)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(U),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(U),a[L].add(x),a[S].add(x),a[T].add(x),c[L].add(m),c[S].add(m),c[T].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,S=M.length;L<S;++L){const T=M[L],U=T.start,k=T.count;for(let B=U,W=U+k;B<W;B+=3)d(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const v=new z,_=new z,y=new z,E=new z;function C(L){y.fromBufferAttribute(s,L),E.copy(y);const S=a[L];v.copy(S),v.sub(y.multiplyScalar(y.dot(S))).normalize(),_.crossVectors(E,S);const U=_.dot(c[L])<0?-1:1;o.setXYZW(L,v.x,v.y,v.z,U)}for(let L=0,S=M.length;L<S;++L){const T=M[L],U=T.start,k=T.count;for(let B=U,W=U+k;B<W;B+=3)C(t.getX(B+0)),C(t.getX(B+1)),C(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const s=new z,r=new z,o=new z,a=new z,c=new z,l=new z,h=new z,u=new z;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ue.fromBufferAttribute(t,e),Ue.normalize(),t.setXYZ(e,Ue.x,Ue.y,Ue.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let p=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let d=0;d<h;d++)f[g++]=l[p++]}return new Ge(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ve,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],p=t(f,n);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uh=new se,vi=new Qu,Or=new pi,fh=new z,Br=new z,kr=new z,Gr=new z,ga=new z,Hr=new z,dh=new z,Vr=new z;class ie extends we{constructor(t=new ve,e=new nn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Hr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(ga.fromBufferAttribute(u,t),o?Hr.addScaledVector(ga,h):Hr.addScaledVector(ga.sub(e),h))}e.add(Hr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(r),vi.copy(t.ray).recast(t.near),!(Or.containsPoint(vi.origin)===!1&&(vi.intersectSphere(Or,fh)===null||vi.origin.distanceToSquared(fh)>(t.far-t.near)**2))&&(uh.copy(r).invert(),vi.copy(t.ray).applyMatrix4(uh),!(n.boundingBox!==null&&vi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,vi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],d=o[m.materialIndex],M=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,y=v;_<y;_+=3){const E=a.getX(_),C=a.getX(_+1),L=a.getX(_+2);s=Wr(this,d,t,n,l,h,u,E,C,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){const M=a.getX(m),v=a.getX(m+1),_=a.getX(m+2);s=Wr(this,o,t,n,l,h,u,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const m=f[g],d=o[m.materialIndex],M=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let _=M,y=v;_<y;_+=3){const E=_,C=_+1,L=_+2;s=Wr(this,d,t,n,l,h,u,E,C,L),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,d=x;m<d;m+=3){const M=m,v=m+1,_=m+2;s=Wr(this,o,t,n,l,h,u,M,v,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Ep(i,t,e,n,s,r,o,a){let c;if(t.side===$e?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===fi,a),c===null)return null;Vr.copy(a),Vr.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Vr);return l<e.near||l>e.far?null:{distance:l,point:Vr.clone(),object:i}}function Wr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Br),i.getVertexPosition(c,kr),i.getVertexPosition(l,Gr);const h=Ep(i,t,e,n,Br,kr,Gr,dh);if(h){const u=new z;rn.getBarycoord(dh,Br,kr,Gr,u),s&&(h.uv=rn.getInterpolatedAttribute(s,a,c,l,u,new Et)),r&&(h.uv1=rn.getInterpolatedAttribute(r,a,c,l,u,new Et)),o&&(h.normal=rn.getInterpolatedAttribute(o,a,c,l,u,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new z,materialIndex:0};rn.getNormal(Br,kr,Gr,f.normal),h.face=f,h.barycoord=u}return h}class bn extends ve{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new jt(l,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function g(x,m,d,M,v,_,y,E,C,L,S){const T=_/C,U=y/L,k=_/2,B=y/2,W=E/2,R=C+1,b=L+1;let N=0,D=0;const Y=new z;for(let q=0;q<b;q++){const F=q*U-B;for(let K=0;K<R;K++){const wt=K*T-k;Y[x]=wt*M,Y[m]=F*v,Y[d]=W,l.push(Y.x,Y.y,Y.z),Y[x]=0,Y[m]=0,Y[d]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(K/C),u.push(1-q/L),N+=1}}for(let q=0;q<L;q++)for(let F=0;F<C;F++){const K=f+F+R*q,wt=f+F+R*(q+1),Rt=f+(F+1)+R*(q+1),Tt=f+(F+1)+R*q;c.push(K,wt,Tt),c.push(wt,Rt,Tt),D+=6}a.addGroup(p,D,S),p+=D,f+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ps(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Xe(i){const t={};for(let e=0;e<i.length;e++){const n=Ps(i[e]);for(const s in n)t[s]=n[s]}return t}function Tp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function rf(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const Ap={clone:Ps,merge:Xe};var Rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Cp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends Gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Rp,this.fragmentShader=Cp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ps(t.uniforms),this.uniformsGroups=Tp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class of extends we{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new z,ph=new Et,mh=new Et;class yn extends of{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Nc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan($o*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Nc*2*Math.atan(Math.tan($o*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ii.x,ii.y).multiplyScalar(-t/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-t/ii.z)}getViewSize(t,e){return this.getViewBounds(t,ph,mh),e.subVectors(mh,ph)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan($o*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const rs=-90,os=1;class Pp extends we{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yn(rs,os,t,e);s.layers=this.layers,this.add(s);const r=new yn(rs,os,t,e);r.layers=this.layers,this.add(r);const o=new yn(rs,os,t,e);o.layers=this.layers,this.add(o);const a=new yn(rs,os,t,e);a.layers=this.layers,this.add(a);const c=new yn(rs,os,t,e);c.layers=this.layers,this.add(c);const l=new yn(rs,os,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===vo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class af extends ke{constructor(t=[],e=As,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class zp extends Ui{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new af(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new bn(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$e,blending:ci});r.uniforms.tEquirect.value=e;const o=new ie(s,r),a=e.minFilter;return e.minFilter===Ri&&(e.minFilter=Sn),new Pp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class te extends we{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dp={type:"move"};class xa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),d=this._getHandJoint(l,x);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Dp)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ul{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=n}clone(){return new ul(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Ip extends we{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Lp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Uc,this.updateRanges=[],this.version=0,this.uuid=Yn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const We=new z;class yo{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pe(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=pe(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Cn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Cn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Cn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Cn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=pe(e,this.array),n=pe(n,this.array),s=pe(s,this.array),r=pe(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new yo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class cf extends Gi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let as;const Hs=new z,cs=new z,ls=new z,hs=new Et,Vs=new Et,lf=new se,Xr=new z,Ws=new z,qr=new z,gh=new Et,_a=new Et,xh=new Et;class Up extends we{constructor(t=new cf){if(super(),this.isSprite=!0,this.type="Sprite",as===void 0){as=new ve;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lp(e,5);as.setIndex([0,1,2,0,2,3]),as.setAttribute("position",new yo(n,3,0,!1)),as.setAttribute("uv",new yo(n,2,3,!1))}this.geometry=as,this.material=t,this.center=new Et(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cs.setFromMatrixScale(this.matrixWorld),lf.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ls.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cs.multiplyScalar(-ls.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Yr(Xr.set(-.5,-.5,0),ls,o,cs,s,r),Yr(Ws.set(.5,-.5,0),ls,o,cs,s,r),Yr(qr.set(.5,.5,0),ls,o,cs,s,r),gh.set(0,0),_a.set(1,0),xh.set(1,1);let a=t.ray.intersectTriangle(Xr,Ws,qr,!1,Hs);if(a===null&&(Yr(Ws.set(-.5,.5,0),ls,o,cs,s,r),_a.set(0,1),a=t.ray.intersectTriangle(Xr,qr,Ws,!1,Hs),a===null))return;const c=t.ray.origin.distanceTo(Hs);c<t.near||c>t.far||e.push({distance:c,point:Hs.clone(),uv:rn.getInterpolation(Hs,Xr,Ws,qr,gh,_a,xh,new Et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Yr(i,t,e,n,s,r){hs.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Vs.x=r*hs.x-s*hs.y,Vs.y=s*hs.x+r*hs.y):Vs.copy(hs),i.copy(t),i.x+=Vs.x,i.y+=Vs.y,i.applyMatrix4(lf)}class hf extends ke{constructor(t=null,e=1,n=1,s,r,o,a,c,l=an,h=an,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fc extends Ge{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const us=new se,_h=new se,Zr=[],vh=new ki,Np=new se,Xs=new ie,qs=new pi;class oi extends ie{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Fc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Np)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ki),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),vh.copy(t.boundingBox).applyMatrix4(us),this.boundingBox.union(vh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,us),qs.copy(t.boundingSphere).applyMatrix4(us),this.boundingSphere.union(qs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Xs.geometry=this.geometry,Xs.material=this.material,Xs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qs.copy(this.boundingSphere),qs.applyMatrix4(n),t.ray.intersectsSphere(qs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,us),_h.multiplyMatrices(n,us),Xs.matrixWorld=_h,Xs.raycast(t,Zr);for(let o=0,a=Zr.length;o<a;o++){const c=Zr[o];c.instanceId=r,c.object=this,e.push(c)}Zr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Fc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hf(new Float32Array(s*this.count),s,this.count,ol,Pn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const va=new z,Fp=new z,Op=new Jt;class si{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=va.subVectors(n,e).cross(Fp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(va),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Op.getNormalMatrix(t),s=this.coplanarPoint(va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new pi,Bp=new Et(.5,.5),$r=new z;class Io{constructor(t=new si,e=new si,n=new si,s=new si,r=new si,o=new si){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],p=r[7],g=r[8],x=r[9],m=r[10],d=r[11],M=r[12],v=r[13],_=r[14],y=r[15];if(s[0].setComponents(l-o,p-h,d-g,y-M).normalize(),s[1].setComponents(l+o,p+h,d+g,y+M).normalize(),s[2].setComponents(l+a,p+u,d+x,y+v).normalize(),s[3].setComponents(l-a,p-u,d-x,y-v).normalize(),n)s[4].setComponents(c,f,m,_).normalize(),s[5].setComponents(l-c,p-f,d-m,y-_).normalize();else if(s[4].setComponents(l-c,p-f,d-m,y-_).normalize(),e===zn)s[5].setComponents(l+c,p+f,d+m,y+_).normalize();else if(e===vo)s[5].setComponents(c,f,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(t){Mi.center.set(0,0,0);const e=Bp.distanceTo(t.center);return Mi.radius=.7071067811865476+e,Mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if($r.x=s.normal.x>0?t.max.x:t.min.x,$r.y=s.normal.y>0?t.max.y:t.min.y,$r.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($r)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class uf extends Gi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const So=new z,wo=new z,Mh=new se,Ys=new Qu,Kr=new pi,Ma=new z,yh=new z;class kp extends we{constructor(t=new ve,e=new uf){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)So.fromBufferAttribute(e,s-1),wo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=So.distanceTo(wo);t.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(s),Kr.radius+=r,t.ray.intersectsSphere(Kr)===!1)return;Mh.copy(s).invert(),Ys.copy(t.ray).applyMatrix4(Mh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){const d=h.getX(x),M=h.getX(x+1),v=Jr(this,t,Ys,c,d,M,x);v&&e.push(v)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(p),d=Jr(this,t,Ys,c,x,m,g-1);d&&e.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){const d=Jr(this,t,Ys,c,x,x+1,x);d&&e.push(d)}if(this.isLineLoop){const x=Jr(this,t,Ys,c,g-1,p,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Jr(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(So.fromBufferAttribute(a,s),wo.fromBufferAttribute(a,r),e.distanceSqToSegment(So,wo,Ma,yh)>n)return;Ma.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ma);if(!(l<t.near||l>t.far))return{distance:l,point:yh.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Sh=new z,wh=new z;class Gp extends kp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Sh.fromBufferAttribute(e,s),wh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Sh.distanceTo(wh);t.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Hi extends ke{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ff extends ke{constructor(t,e,n=Li,s,r,o,a=an,c=an,l,h=ur,u=1){if(h!==ur&&h!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new hl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class df extends ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class fl extends ve{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new z,h=new Et;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const p=n+u/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new jt(o,3)),this.setAttribute("normal",new jt(a,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Vi extends ve{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const x=[],m=n/2;let d=0;M(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new jt(u,3)),this.setAttribute("normal",new jt(f,3)),this.setAttribute("uv",new jt(p,2));function M(){const _=new z,y=new z;let E=0;const C=(e-t)/n;for(let L=0;L<=r;L++){const S=[],T=L/r,U=T*(e-t)+t;for(let k=0;k<=s;k++){const B=k/s,W=B*c+a,R=Math.sin(W),b=Math.cos(W);y.x=U*R,y.y=-T*n+m,y.z=U*b,u.push(y.x,y.y,y.z),_.set(R,C,b).normalize(),f.push(_.x,_.y,_.z),p.push(B,1-T),S.push(g++)}x.push(S)}for(let L=0;L<s;L++)for(let S=0;S<r;S++){const T=x[S][L],U=x[S+1][L],k=x[S+1][L+1],B=x[S][L+1];(t>0||S!==0)&&(h.push(T,U,B),E+=3),(e>0||S!==r-1)&&(h.push(U,k,B),E+=3)}l.addGroup(d,E,0),d+=E}function v(_){const y=g,E=new Et,C=new z;let L=0;const S=_===!0?t:e,T=_===!0?1:-1;for(let k=1;k<=s;k++)u.push(0,m*T,0),f.push(0,T,0),p.push(.5,.5),g++;const U=g;for(let k=0;k<=s;k++){const W=k/s*c+a,R=Math.cos(W),b=Math.sin(W);C.x=S*b,C.y=m*T,C.z=S*R,u.push(C.x,C.y,C.z),f.push(0,T,0),E.x=R*.5+.5,E.y=b*.5*T+.5,p.push(E.x,E.y),g++}for(let k=0;k<s;k++){const B=y+k,W=U+k;_===!0?h.push(W,W+1,B):h.push(W+1,W,B),L+=3}l.addGroup(d,L,_===!0?1:2),d+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class pr extends Vi{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new pr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,p=(o-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Et:new z);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new z,s=[],r=[],o=[],a=new z,c=new se;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new z)}r[0]=new z,o[0]=new z;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Kt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Kt(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class dl extends Nn{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new Et){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*h-p*u+this.aX,l=f*u+p*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Hp extends dl{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function pl(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,p*=h,s(o,a,f,p)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const jr=new z,ya=new pl,Sa=new pl,wa=new pl;class Vp extends Nn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new z){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(jr.subVectors(s[0],s[1]).add(s[0]),l=jr);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(jr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=jr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),p),x=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),ya.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,g,x,m),Sa.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,g,x,m),wa.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(ya.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Sa.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),wa.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(ya.calc(c),Sa.calc(c),wa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new z().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function bh(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function Wp(i,t){const e=1-i;return e*e*t}function Xp(i,t){return 2*(1-i)*i*t}function qp(i,t){return i*i*t}function nr(i,t,e,n){return Wp(i,t)+Xp(i,e)+qp(i,n)}function Yp(i,t){const e=1-i;return e*e*e*t}function Zp(i,t){const e=1-i;return 3*e*e*i*t}function $p(i,t){return 3*(1-i)*i*i*t}function Kp(i,t){return i*i*i*t}function ir(i,t,e,n,s){return Yp(i,t)+Zp(i,e)+$p(i,n)+Kp(i,s)}class pf extends Nn{constructor(t=new Et,e=new Et,n=new Et,s=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Et){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ir(t,s.x,r.x,o.x,a.x),ir(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Jp extends Nn{constructor(t=new z,e=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new z){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ir(t,s.x,r.x,o.x,a.x),ir(t,s.y,r.y,o.y,a.y),ir(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class mf extends Nn{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jp extends Nn{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gf extends Nn{constructor(t=new Et,e=new Et,n=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Et){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(nr(t,s.x,r.x,o.x),nr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qp extends Nn{constructor(t=new z,e=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new z){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(nr(t,s.x,r.x,o.x),nr(t,s.y,r.y,o.y),nr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xf extends Nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(bh(a,c.x,l.x,h.x,u.x),bh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Et().fromArray(s))}return this}}var Eh=Object.freeze({__proto__:null,ArcCurve:Hp,CatmullRomCurve3:Vp,CubicBezierCurve:pf,CubicBezierCurve3:Jp,EllipseCurve:dl,LineCurve:mf,LineCurve3:jp,QuadraticBezierCurve:gf,QuadraticBezierCurve3:Qp,SplineCurve:xf});class tm extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Eh[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Eh[s.type]().fromJSON(s))}return this}}class Th extends tm{constructor(t){super(),this.type="Path",this.currentPoint=new Et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new mf(this.currentPoint.clone(),new Et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new gf(this.currentPoint.clone(),new Et(t,e),new Et(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new pf(this.currentPoint.clone(),new Et(t,e),new Et(n,s),new Et(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new xf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new dl(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Oc extends Th{constructor(t){super(t),this.uuid=Yn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Th().fromJSON(s))}return this}}function em(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=_f(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=om(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let f=e;f<s;f+=e){const p=i[f],g=i[f+1];p<a&&(a=p),g<c&&(c=g),p>h&&(h=p),g>u&&(u=g)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return mr(r,o,e,a,c,l,0),o}function _f(i,t,e,n,s){let r;if(s===xm(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=Ah(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Ah(o/n|0,i[o],i[o+1],r);return r&&zs(r,r.next)&&(xr(r),r=r.next),r}function Ni(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(zs(e,e.next)||Se(e.prev,e,e.next)===0)){if(xr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function mr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&um(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?im(i,n,s,r):nm(i)){t.push(c.i,i.i,l.i),xr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=sm(Ni(i),t),mr(i,t,e,n,s,r,2)):o===2&&rm(i,t,e,n,s,r):mr(Ni(i),t,e,n,s,r,1);break}}}function nm(i){const t=i.prev,e=i,n=i.next;if(Se(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),p=Math.max(a,c,l);let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=f&&g.y>=u&&g.y<=p&&Js(s,a,r,c,o,l,g.x,g.y)&&Se(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function im(i,t,e,n){const s=i.prev,r=i,o=i.next;if(Se(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,p=Math.min(a,c,l),g=Math.min(h,u,f),x=Math.max(a,c,l),m=Math.max(h,u,f),d=Bc(p,g,t,e,n),M=Bc(x,m,t,e,n);let v=i.prevZ,_=i.nextZ;for(;v&&v.z>=d&&_&&_.z<=M;){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Js(a,h,c,u,l,f,v.x,v.y)&&Se(v.prev,v,v.next)>=0||(v=v.prevZ,_.x>=p&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Js(a,h,c,u,l,f,_.x,_.y)&&Se(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;v&&v.z>=d;){if(v.x>=p&&v.x<=x&&v.y>=g&&v.y<=m&&v!==s&&v!==o&&Js(a,h,c,u,l,f,v.x,v.y)&&Se(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;_&&_.z<=M;){if(_.x>=p&&_.x<=x&&_.y>=g&&_.y<=m&&_!==s&&_!==o&&Js(a,h,c,u,l,f,_.x,_.y)&&Se(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function sm(i,t){let e=i;do{const n=e.prev,s=e.next.next;!zs(n,s)&&Mf(n,e,e.next,s)&&gr(n,s)&&gr(s,n)&&(t.push(n.i,e.i,s.i),xr(e),xr(e.next),e=i=s),e=e.next}while(e!==i);return Ni(e)}function rm(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&pm(o,a)){let c=yf(o,a);o=Ni(o,o.next),c=Ni(c,c.next),mr(o,t,e,n,s,r,0),mr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function om(i,t,e,n){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=_f(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(dm(l))}s.sort(am);for(let r=0;r<s.length;r++)e=cm(s[r],e);return e}function am(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function cm(i,t){const e=lm(i,t);if(!e)return t;const n=yf(e,i);return Ni(n,n.next),Ni(e,e.next)}function lm(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,o;if(zs(i,e))return e;do{if(zs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&vf(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){const u=Math.abs(s-e.y)/(n-e.x);gr(e,i)&&(u<h||u===h&&(e.x>o.x||e.x===o.x&&hm(o,e)))&&(o=e,h=u)}e=e.next}while(e!==a);return o}function hm(i,t){return Se(i.prev,i,t.prev)<0&&Se(t.next,i,i.next)<0}function um(i,t,e,n){let s=i;do s.z===0&&(s.z=Bc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,fm(s)}function fm(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function Bc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function dm(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function vf(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Js(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&vf(i,t,e,n,s,r,o,a)}function pm(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!mm(i,t)&&(gr(i,t)&&gr(t,i)&&gm(i,t)&&(Se(i.prev,i,t.prev)||Se(i,t.prev,t))||zs(i,t)&&Se(i.prev,i,i.next)>0&&Se(t.prev,t,t.next)>0)}function Se(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function zs(i,t){return i.x===t.x&&i.y===t.y}function Mf(i,t,e,n){const s=to(Se(i,t,e)),r=to(Se(i,t,n)),o=to(Se(e,n,i)),a=to(Se(e,n,t));return!!(s!==r&&o!==a||s===0&&Qr(i,e,t)||r===0&&Qr(i,n,t)||o===0&&Qr(e,i,n)||a===0&&Qr(e,t,n))}function Qr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function to(i){return i>0?1:i<0?-1:0}function mm(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Mf(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function gr(i,t){return Se(i.prev,i,i.next)<0?Se(i,t,i.next)>=0&&Se(i,i.prev,t)>=0:Se(i,t,i.prev)<0||Se(i,i.next,t)<0}function gm(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function yf(i,t){const e=kc(i.i,i.x,i.y),n=kc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ah(i,t,e,n){const s=kc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function xr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function kc(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function xm(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class _m{static triangulate(t,e,n=2){return em(t,e,n)}}class sr{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return sr.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];Rh(t),Ch(n,t);let o=t.length;e.forEach(Rh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,Ch(n,e[c]);const a=_m.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Rh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ch(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class br extends ve{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,p=[],g=[],x=[],m=[];for(let d=0;d<h;d++){const M=d*f-o;for(let v=0;v<l;v++){const _=v*u-r;g.push(_,-M,0),x.push(0,0,1),m.push(v/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let M=0;M<a;M++){const v=M+l*d,_=M+l*(d+1),y=M+1+l*(d+1),E=M+1+l*d;p.push(v,_,E),p.push(_,y,E)}this.setIndex(p),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new br(t.width,t.height,t.widthSegments,t.heightSegments)}}class ml extends ve{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const f=(e-t)/s,p=new z,g=new Et;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const d=r+m/n*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let x=0;x<s;x++){const m=x*(n+1);for(let d=0;d<n;d++){const M=d+m,v=M,_=M+n+1,y=M+n+2,E=M+1;a.push(v,_,E),a.push(_,y,E)}}this.setIndex(a),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class bo extends ve{constructor(t=new Oc([new Et(0,.5),new Et(-.5,-.5),new Et(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new jt(s,3)),this.setAttribute("normal",new jt(r,3)),this.setAttribute("uv",new jt(o,2));function l(h){const u=s.length/3,f=h.extractPoints(e);let p=f.shape;const g=f.holes;sr.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,d=g.length;m<d;m++){const M=g[m];sr.isClockWise(M)===!0&&(g[m]=M.reverse())}const x=sr.triangulateShape(p,g);for(let m=0,d=g.length;m<d;m++){const M=g[m];p=p.concat(M)}for(let m=0,d=p.length;m<d;m++){const M=p[m];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let m=0,d=x.length;m<d;m++){const M=x[m],v=M[0]+u,_=M[1]+u,y=M[2]+u;n.push(v,_,y),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return vm(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];n.push(o)}return new bo(n,t.curveSegments)}}function vm(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Fi extends ve{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new z,f=new z,p=[],g=[],x=[],m=[];for(let d=0;d<=n;d++){const M=[],v=d/n;let _=0;d===0&&o===0?_=.5/e:d===n&&c===Math.PI&&(_=-.5/e);for(let y=0;y<=e;y++){const E=y/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+v*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),m.push(E+_,1-v),M.push(l++)}h.push(M)}for(let d=0;d<n;d++)for(let M=0;M<e;M++){const v=h[d][M+1],_=h[d][M],y=h[d+1][M],E=h[d+1][M+1];(d!==0||o>0)&&p.push(v,_,E),(d!==n-1||c<Math.PI)&&p.push(_,y,E)}this.setIndex(p),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(x,3)),this.setAttribute("uv",new jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Lo extends ve{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new z,u=new z,f=new z;for(let p=0;p<=n;p++)for(let g=0;g<=s;g++){const x=g/s*r,m=p/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(x),u.y=(t+e*Math.cos(m))*Math.sin(x),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(p/n)}for(let p=1;p<=n;p++)for(let g=1;g<=s;g++){const x=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,M=(s+1)*p+g;o.push(x,m,M),o.push(m,d,M)}this.setIndex(o),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(c,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ce extends Gi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$u,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Mm extends Gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Kd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ym extends Gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Sf extends we{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Sm extends Sf{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ba=new se,Ph=new z,zh=new z;class wm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Io,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ph.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ph),zh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zh),e.updateMatrixWorld(),ba.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ba,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ba)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Uo extends of{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class bm extends wm{constructor(){super(new Uo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Em extends Sf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(we.DEFAULT_UP),this.updateMatrix(),this.target=new we,this.shadow=new bm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Tm extends yn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Dh=new z,eo=new z,fs=new z,ds=new z,Ea=new z,Am=new z,Rm=new z;class Cm{constructor(t=new z,e=new z){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Dh.subVectors(t,this.start),eo.subVectors(this.end,this.start);const n=eo.dot(eo);let r=eo.dot(Dh)/n;return e&&(r=Kt(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=Am,n=Rm){const s=10000000000000001e-32;let r,o;const a=this.start,c=t.start,l=this.end,h=t.end;fs.subVectors(l,a),ds.subVectors(h,c),Ea.subVectors(a,c);const u=fs.dot(fs),f=ds.dot(ds),p=ds.dot(Ea);if(u<=s&&f<=s)return e.copy(a),n.copy(c),e.sub(n),e.dot(e);if(u<=s)r=0,o=p/f,o=Kt(o,0,1);else{const g=fs.dot(Ea);if(f<=s)o=0,r=Kt(-g/u,0,1);else{const x=fs.dot(ds),m=u*f-x*x;m!==0?r=Kt((x*p-g*f)/m,0,1):r=0,o=(x*r+p)/f,o<0?(o=0,r=Kt(-g/u,0,1)):o>1&&(o=1,r=Kt((x-g)/u,0,1))}}return e.copy(a).add(fs.multiplyScalar(r)),n.copy(c).add(ds.multiplyScalar(o)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}function Ih(i,t,e,n){const s=Pm(n);switch(e){case qu:return i*t;case ol:return i*t/s.components*s.byteLength;case al:return i*t/s.components*s.byteLength;case Zu:return i*t*2/s.components*s.byteLength;case cl:return i*t*2/s.components*s.byteLength;case Yu:return i*t*3/s.components*s.byteLength;case wn:return i*t*4/s.components*s.byteLength;case ll:return i*t*4/s.components*s.byteLength;case ho:case uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case fo:case po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case cc:case hc:return Math.max(i,16)*Math.max(t,8)/4;case ac:case lc:return Math.max(i,8)*Math.max(t,8)/2;case uc:case fc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case pc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case gc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case xc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case _c:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case vc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case yc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Sc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case wc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case bc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Tc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ac:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Rc:case Cc:case Pc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case zc:case Dc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ic:case Lc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Pm(i){switch(i){case Ln:case Hu:return{byteLength:1,components:1};case lr:case Vu:case wr:return{byteLength:2,components:1};case sl:case rl:return{byteLength:2,components:4};case Li:case il:case Pn:return{byteLength:4,components:1};case Wu:case Xu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function zm(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const x=u[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Dm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Im=`#ifdef USE_ALPHAHASH
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
#endif`,Hm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vm=`vec3 objectNormal = vec3( normal );
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
}`,zg=`
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
#endif`,Dg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ig=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vg=`#ifdef USE_METALNESSMAP
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
#endif`;const z0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,D0=`uniform sampler2D t2D;
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
}`,I0=`varying vec3 vWorldDirection;
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
}`,H0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V0=`uniform float scale;
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
}`,Qt={alphahash_fragment:Dm,alphahash_pars_fragment:Im,alphamap_fragment:Lm,alphamap_pars_fragment:Um,alphatest_fragment:Nm,alphatest_pars_fragment:Fm,aomap_fragment:Om,aomap_pars_fragment:Bm,batching_pars_vertex:km,batching_vertex:Gm,begin_vertex:Hm,beginnormal_vertex:Vm,bsdfs:Wm,iridescence_fragment:Xm,bumpmap_pars_fragment:qm,clipping_planes_fragment:Ym,clipping_planes_pars_fragment:Zm,clipping_planes_pars_vertex:$m,clipping_planes_vertex:Km,color_fragment:Jm,color_pars_fragment:jm,color_pars_vertex:Qm,color_vertex:tg,common:eg,cube_uv_reflection_fragment:ng,defaultnormal_vertex:ig,displacementmap_pars_vertex:sg,displacementmap_vertex:rg,emissivemap_fragment:og,emissivemap_pars_fragment:ag,colorspace_fragment:cg,colorspace_pars_fragment:lg,envmap_fragment:hg,envmap_common_pars_fragment:ug,envmap_pars_fragment:fg,envmap_pars_vertex:dg,envmap_physical_pars_fragment:bg,envmap_vertex:pg,fog_vertex:mg,fog_pars_vertex:gg,fog_fragment:xg,fog_pars_fragment:_g,gradientmap_pars_fragment:vg,lightmap_pars_fragment:Mg,lights_lambert_fragment:yg,lights_lambert_pars_fragment:Sg,lights_pars_begin:wg,lights_toon_fragment:Eg,lights_toon_pars_fragment:Tg,lights_phong_fragment:Ag,lights_phong_pars_fragment:Rg,lights_physical_fragment:Cg,lights_physical_pars_fragment:Pg,lights_fragment_begin:zg,lights_fragment_maps:Dg,lights_fragment_end:Ig,logdepthbuf_fragment:Lg,logdepthbuf_pars_fragment:Ug,logdepthbuf_pars_vertex:Ng,logdepthbuf_vertex:Fg,map_fragment:Og,map_pars_fragment:Bg,map_particle_fragment:kg,map_particle_pars_fragment:Gg,metalnessmap_fragment:Hg,metalnessmap_pars_fragment:Vg,morphinstance_vertex:Wg,morphcolor_vertex:Xg,morphnormal_vertex:qg,morphtarget_pars_vertex:Yg,morphtarget_vertex:Zg,normal_fragment_begin:$g,normal_fragment_maps:Kg,normal_pars_fragment:Jg,normal_pars_vertex:jg,normal_vertex:Qg,normalmap_pars_fragment:t0,clearcoat_normal_fragment_begin:e0,clearcoat_normal_fragment_maps:n0,clearcoat_pars_fragment:i0,iridescence_pars_fragment:s0,opaque_fragment:r0,packing:o0,premultiplied_alpha_fragment:a0,project_vertex:c0,dithering_fragment:l0,dithering_pars_fragment:h0,roughnessmap_fragment:u0,roughnessmap_pars_fragment:f0,shadowmap_pars_fragment:d0,shadowmap_pars_vertex:p0,shadowmap_vertex:m0,shadowmask_pars_fragment:g0,skinbase_vertex:x0,skinning_pars_vertex:_0,skinning_vertex:v0,skinnormal_vertex:M0,specularmap_fragment:y0,specularmap_pars_fragment:S0,tonemapping_fragment:w0,tonemapping_pars_fragment:b0,transmission_fragment:E0,transmission_pars_fragment:T0,uv_pars_fragment:A0,uv_pars_vertex:R0,uv_vertex:C0,worldpos_vertex:P0,background_vert:z0,background_frag:D0,backgroundCube_vert:I0,backgroundCube_frag:L0,cube_vert:U0,cube_frag:N0,depth_vert:F0,depth_frag:O0,distanceRGBA_vert:B0,distanceRGBA_frag:k0,equirect_vert:G0,equirect_frag:H0,linedashed_vert:V0,linedashed_frag:W0,meshbasic_vert:X0,meshbasic_frag:q0,meshlambert_vert:Y0,meshlambert_frag:Z0,meshmatcap_vert:$0,meshmatcap_frag:K0,meshnormal_vert:J0,meshnormal_frag:j0,meshphong_vert:Q0,meshphong_frag:tx,meshphysical_vert:ex,meshphysical_frag:nx,meshtoon_vert:ix,meshtoon_frag:sx,points_vert:rx,points_frag:ox,shadow_vert:ax,shadow_frag:cx,sprite_vert:lx,sprite_frag:hx},St={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Rn={basic:{uniforms:Xe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:Xe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:Xe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:Xe([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:Xe([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:Xe([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:Xe([St.points,St.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:Xe([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:Xe([St.common,St.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:Xe([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:Xe([St.sprite,St.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:Xe([St.common,St.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:Xe([St.lights,St.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};Rn.physical={uniforms:Xe([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const no={r:0,b:0,g:0},yi=new En,ux=new se;function fx(i,t,e,n,s,r,o){const a=new Ht(0);let c=r===!0?0:1,l,h,u=null,f=0,p=null;function g(v){let _=v.isScene===!0?v.background:null;return _&&_.isTexture&&(_=(v.backgroundBlurriness>0?e:t).get(_)),_}function x(v){let _=!1;const y=g(v);y===null?d(a,c):y&&y.isColor&&(d(y,1),_=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(v,_){const y=g(_);y&&(y.isCubeTexture||y.mapping===Do)?(h===void 0&&(h=new ie(new bn(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:Ps(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:$e,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,C,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),yi.copy(_.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(ux.makeRotationFromEuler(yi)),h.material.toneMapped=ae.getTransfer(y.colorSpace)!==de,(u!==y||f!==y.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,p=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new ie(new br(2,2),new di({name:"BackgroundMaterial",uniforms:Ps(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=ae.getTransfer(y.colorSpace)!==de,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,p=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function d(v,_){v.getRGB(no,rf(i)),n.buffers.color.setClear(no.r,no.g,no.b,_,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),c=_,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(a,c)},render:x,addToRenderList:m,dispose:M}}function dx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(T,U,k,B,W){let R=!1;const b=u(B,k,U);r!==b&&(r=b,l(r.object)),R=p(T,B,k,W),R&&g(T,B,k,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(R||o)&&(o=!1,_(T,U,k,B),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return i.createVertexArray()}function l(T){return i.bindVertexArray(T)}function h(T){return i.deleteVertexArray(T)}function u(T,U,k){const B=k.wireframe===!0;let W=n[T.id];W===void 0&&(W={},n[T.id]=W);let R=W[U.id];R===void 0&&(R={},W[U.id]=R);let b=R[B];return b===void 0&&(b=f(c()),R[B]=b),b}function f(T){const U=[],k=[],B=[];for(let W=0;W<e;W++)U[W]=0,k[W]=0,B[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:k,attributeDivisors:B,object:T,attributes:{},index:null}}function p(T,U,k,B){const W=r.attributes,R=U.attributes;let b=0;const N=k.getAttributes();for(const D in N)if(N[D].location>=0){const q=W[D];let F=R[D];if(F===void 0&&(D==="instanceMatrix"&&T.instanceMatrix&&(F=T.instanceMatrix),D==="instanceColor"&&T.instanceColor&&(F=T.instanceColor)),q===void 0||q.attribute!==F||F&&q.data!==F.data)return!0;b++}return r.attributesNum!==b||r.index!==B}function g(T,U,k,B){const W={},R=U.attributes;let b=0;const N=k.getAttributes();for(const D in N)if(N[D].location>=0){let q=R[D];q===void 0&&(D==="instanceMatrix"&&T.instanceMatrix&&(q=T.instanceMatrix),D==="instanceColor"&&T.instanceColor&&(q=T.instanceColor));const F={};F.attribute=q,q&&q.data&&(F.data=q.data),W[D]=F,b++}r.attributes=W,r.attributesNum=b,r.index=B}function x(){const T=r.newAttributes;for(let U=0,k=T.length;U<k;U++)T[U]=0}function m(T){d(T,0)}function d(T,U){const k=r.newAttributes,B=r.enabledAttributes,W=r.attributeDivisors;k[T]=1,B[T]===0&&(i.enableVertexAttribArray(T),B[T]=1),W[T]!==U&&(i.vertexAttribDivisor(T,U),W[T]=U)}function M(){const T=r.newAttributes,U=r.enabledAttributes;for(let k=0,B=U.length;k<B;k++)U[k]!==T[k]&&(i.disableVertexAttribArray(k),U[k]=0)}function v(T,U,k,B,W,R,b){b===!0?i.vertexAttribIPointer(T,U,k,W,R):i.vertexAttribPointer(T,U,k,B,W,R)}function _(T,U,k,B){x();const W=B.attributes,R=k.getAttributes(),b=U.defaultAttributeValues;for(const N in R){const D=R[N];if(D.location>=0){let Y=W[N];if(Y===void 0&&(N==="instanceMatrix"&&T.instanceMatrix&&(Y=T.instanceMatrix),N==="instanceColor"&&T.instanceColor&&(Y=T.instanceColor)),Y!==void 0){const q=Y.normalized,F=Y.itemSize,K=t.get(Y);if(K===void 0)continue;const wt=K.buffer,Rt=K.type,Tt=K.bytesPerElement,Z=Rt===i.INT||Rt===i.UNSIGNED_INT||Y.gpuType===il;if(Y.isInterleavedBufferAttribute){const Q=Y.data,ot=Q.stride,pt=Y.offset;if(Q.isInstancedInterleavedBuffer){for(let dt=0;dt<D.locationSize;dt++)d(D.location+dt,Q.meshPerAttribute);T.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let dt=0;dt<D.locationSize;dt++)m(D.location+dt);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let dt=0;dt<D.locationSize;dt++)v(D.location+dt,F/D.locationSize,Rt,q,ot*Tt,(pt+F/D.locationSize*dt)*Tt,Z)}else{if(Y.isInstancedBufferAttribute){for(let Q=0;Q<D.locationSize;Q++)d(D.location+Q,Y.meshPerAttribute);T.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Q=0;Q<D.locationSize;Q++)m(D.location+Q);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let Q=0;Q<D.locationSize;Q++)v(D.location+Q,F/D.locationSize,Rt,q,F*Tt,F/D.locationSize*Q*Tt,Z)}}else if(b!==void 0){const q=b[N];if(q!==void 0)switch(q.length){case 2:i.vertexAttrib2fv(D.location,q);break;case 3:i.vertexAttrib3fv(D.location,q);break;case 4:i.vertexAttrib4fv(D.location,q);break;default:i.vertexAttrib1fv(D.location,q)}}}}M()}function y(){L();for(const T in n){const U=n[T];for(const k in U){const B=U[k];for(const W in B)h(B[W].object),delete B[W];delete U[k]}delete n[T]}}function E(T){if(n[T.id]===void 0)return;const U=n[T.id];for(const k in U){const B=U[k];for(const W in B)h(B[W].object),delete B[W];delete U[k]}delete n[T.id]}function C(T){for(const U in n){const k=n[U];if(k[T.id]===void 0)continue;const B=k[T.id];for(const W in B)h(B[W].object),delete B[W];delete k[T.id]}}function L(){S(),o=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:S,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function px(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,n,1)}function c(l,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*f[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function mx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==wn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const L=C===wr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Ln&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Pn&&!L)}function c(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),y=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:M,maxVaryings:v,maxFragmentUniforms:_,vertexTextures:y,maxSamples:E}}function gx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new si,a=new Jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||n!==0||s;return s=f,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const M=r?0:n,v=M*4;let _=d.clippingState||null;c.value=_,_=h(g,f,v,p);for(let y=0;y!==v;++y)_[y]=e[y];d.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,p,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const d=p+x*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,_=p;v!==x;++v,_+=4)o.copy(u[v]).applyMatrix4(M,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function xx(i){let t=new WeakMap;function e(o,a){return a===sc?o.mapping=As:a===rc&&(o.mapping=Rs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===sc||a===rc)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new zp(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const xs=4,Lh=[.125,.215,.35,.446,.526,.582],Ti=20,Ta=new Uo,Uh=new Ht;let Aa=null,Ra=0,Ca=0,Pa=!1;const wi=(1+Math.sqrt(5))/2,ps=1/wi,Nh=[new z(-wi,ps,0),new z(wi,ps,0),new z(-ps,0,wi),new z(ps,0,wi),new z(0,wi,-ps),new z(0,wi,ps),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],_x=new z;class Fh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=_x}=r;Aa=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Aa,Ra,Ca),this._renderer.xr.enabled=Pa,t.scissorTest=!1,io(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===As||t.mapping===Rs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Aa=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ca=this._renderer.getActiveMipmapLevel(),Pa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:wr,format:wn,colorSpace:Cs,depthBuffer:!1},s=Oh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vx(r)),this._blurMaterial=Mx(r,t,e)}return s}_compileMaterial(t){const e=new ie(this._lodPlanes[0],t);this._renderer.compile(e,Ta)}_sceneToCubeUV(t,e,n,s,r){const c=new yn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,p=u.toneMapping;u.getClearColor(Uh),u.toneMapping=li,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const x=new nn({name:"PMREM.Background",side:$e,depthWrite:!1,depthTest:!1}),m=new ie(new bn,x);let d=!1;const M=t.background;M?M.isColor&&(x.color.copy(M),t.background=null,d=!0):(x.color.copy(Uh),d=!0);for(let v=0;v<6;v++){const _=v%3;_===0?(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[v],r.y,r.z)):_===1?(c.up.set(0,0,l[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[v],r.z)):(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[v]));const y=this._cubeSize;io(s,_*y,v>2?y:0,y,y),u.setRenderTarget(s),d&&u.render(m,c),u.render(t,c)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=p,u.autoClear=f,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===As||t.mapping===Rs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=kh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ie(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;io(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Ta)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Nh[(s-r-1)%Nh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ie(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ti-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ti;m>Ti&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ti}`);const d=[];let M=0;for(let C=0;C<Ti;++C){const L=C/x,S=Math.exp(-L*L/2);d.push(S),C===0?M+=S:C<m&&(M+=2*S)}for(let C=0;C<d.length;C++)d[C]=d[C]/M;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=g,f.mipInt.value=v-n;const _=this._sizeLods[s],y=3*_*(s>v-xs?s-v+xs:0),E=4*(this._cubeSize-_);io(e,y,E,3*_,2*_),c.setRenderTarget(e),c.render(u,Ta)}}function vx(i){const t=[],e=[],n=[];let s=i;const r=i-xs+1+Lh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-xs?c=Lh[o-i+xs-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,x=3,m=2,d=1,M=new Float32Array(x*g*p),v=new Float32Array(m*g*p),_=new Float32Array(d*g*p);for(let E=0;E<p;E++){const C=E%3*2/3-1,L=E>2?0:-1,S=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];M.set(S,x*g*E),v.set(f,m*g*E);const T=[E,E,E,E,E,E];_.set(T,d*g*E)}const y=new ve;y.setAttribute("position",new Ge(M,x)),y.setAttribute("uv",new Ge(v,m)),y.setAttribute("faceIndex",new Ge(_,d)),t.push(y),s>xs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Oh(i,t,e){const n=new Ui(i,t,e);return n.texture.mapping=Do,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function io(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Mx(i,t,e){const n=new Float32Array(Ti),s=new z(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:gl(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Bh(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gl(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function kh(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function gl(){return`

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
	`}function yx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===sc||c===rc,h=c===As||c===Rs;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Fh(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const p=a.image;return l&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new Fh(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Sx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&dr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function wx(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const p in f)t.update(f[p],i.ARRAY_BUFFER)}function l(u){const f=[],p=u.index,g=u.attributes.position;let x=0;if(p!==null){const M=p.array;x=p.version;for(let v=0,_=M.length;v<_;v+=3){const y=M[v+0],E=M[v+1],C=M[v+2];f.push(y,E,E,C,C,y)}}else if(g!==void 0){const M=g.array;x=g.version;for(let v=0,_=M.length/3-1;v<_;v+=3){const y=v+0,E=v+1,C=v+2;f.push(y,E,E,C,C,y)}}else return;const m=new(Ju(f)?sf:nf)(f,1);m.version=x;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function bx(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,p){i.drawElements(n,p,r,f*o),e.update(p,n,1)}function l(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,f*o,g),e.update(p,n,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,n,1)}function u(f,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)l(f[d]/o,p[d],x[d]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,f,0,x,0,g);let d=0;for(let M=0;M<g;M++)d+=p[M]*x[M];e.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Ex(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Tx(i,t,e){const n=new WeakMap,s=new Te;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let S=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",S)};f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;p===!0&&(v=1),g===!0&&(v=2),x===!0&&(v=3);let _=a.attributes.position.count*v,y=1;_>t.maxTextureSize&&(y=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const E=new Float32Array(_*y*4*u),C=new ju(E,_,y,u);C.type=Pn,C.needsUpdate=!0;const L=v*4;for(let T=0;T<u;T++){const U=m[T],k=d[T],B=M[T],W=_*y*4*T;for(let R=0;R<U.count;R++){const b=R*L;p===!0&&(s.fromBufferAttribute(U,R),E[W+b+0]=s.x,E[W+b+1]=s.y,E[W+b+2]=s.z,E[W+b+3]=0),g===!0&&(s.fromBufferAttribute(k,R),E[W+b+4]=s.x,E[W+b+5]=s.y,E[W+b+6]=s.z,E[W+b+7]=0),x===!0&&(s.fromBufferAttribute(B,R),E[W+b+8]=s.x,E[W+b+9]=s.y,E[W+b+10]=s.z,E[W+b+11]=B.itemSize===4?s.w:1)}}f={count:u,texture:C,size:new Et(_,y)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];const g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ax(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const bf=new ke,Gh=new ff(1,1),Ef=new ju,Tf=new pp,Af=new af,Hh=[],Vh=[],Wh=new Float32Array(16),Xh=new Float32Array(9),qh=new Float32Array(4);function Us(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Hh[s];if(r===void 0&&(r=new Float32Array(s),Hh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ie(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Le(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function No(i,t){let e=Vh[t];e===void 0&&(e=new Int32Array(t),Vh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Rx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Cx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2fv(this.addr,t),Le(e,t)}}function Px(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;i.uniform3fv(this.addr,t),Le(e,t)}}function zx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4fv(this.addr,t),Le(e,t)}}function Dx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;qh.set(n),i.uniformMatrix2fv(this.addr,!1,qh),Le(e,n)}}function Ix(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;Xh.set(n),i.uniformMatrix3fv(this.addr,!1,Xh),Le(e,n)}}function Lx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Ie(e,n))return;Wh.set(n),i.uniformMatrix4fv(this.addr,!1,Wh),Le(e,n)}}function Ux(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Nx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2iv(this.addr,t),Le(e,t)}}function Fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3iv(this.addr,t),Le(e,t)}}function Ox(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4iv(this.addr,t),Le(e,t)}}function Bx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;i.uniform2uiv(this.addr,t),Le(e,t)}}function Gx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;i.uniform3uiv(this.addr,t),Le(e,t)}}function Hx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;i.uniform4uiv(this.addr,t),Le(e,t)}}function Vx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Gh.compareFunction=Ku,r=Gh):r=bf,e.setTexture2D(t||r,s)}function Wx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Tf,s)}function Xx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Af,s)}function qx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ef,s)}function Yx(i){switch(i){case 5126:return Rx;case 35664:return Cx;case 35665:return Px;case 35666:return zx;case 35674:return Dx;case 35675:return Ix;case 35676:return Lx;case 5124:case 35670:return Ux;case 35667:case 35671:return Nx;case 35668:case 35672:return Fx;case 35669:case 35673:return Ox;case 5125:return Bx;case 36294:return kx;case 36295:return Gx;case 36296:return Hx;case 35678:case 36198:case 36298:case 36306:case 35682:return Vx;case 35679:case 36299:case 36307:return Wx;case 35680:case 36300:case 36308:case 36293:return Xx;case 36289:case 36303:case 36311:case 36292:return qx}}function Zx(i,t){i.uniform1fv(this.addr,t)}function $x(i,t){const e=Us(t,this.size,2);i.uniform2fv(this.addr,e)}function Kx(i,t){const e=Us(t,this.size,3);i.uniform3fv(this.addr,e)}function Jx(i,t){const e=Us(t,this.size,4);i.uniform4fv(this.addr,e)}function jx(i,t){const e=Us(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Qx(i,t){const e=Us(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function t_(i,t){const e=Us(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function e_(i,t){i.uniform1iv(this.addr,t)}function n_(i,t){i.uniform2iv(this.addr,t)}function i_(i,t){i.uniform3iv(this.addr,t)}function s_(i,t){i.uniform4iv(this.addr,t)}function r_(i,t){i.uniform1uiv(this.addr,t)}function o_(i,t){i.uniform2uiv(this.addr,t)}function a_(i,t){i.uniform3uiv(this.addr,t)}function c_(i,t){i.uniform4uiv(this.addr,t)}function l_(i,t,e){const n=this.cache,s=t.length,r=No(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||bf,r[o])}function h_(i,t,e){const n=this.cache,s=t.length,r=No(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Tf,r[o])}function u_(i,t,e){const n=this.cache,s=t.length,r=No(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Af,r[o])}function f_(i,t,e){const n=this.cache,s=t.length,r=No(e,s);Ie(n,r)||(i.uniform1iv(this.addr,r),Le(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ef,r[o])}function d_(i){switch(i){case 5126:return Zx;case 35664:return $x;case 35665:return Kx;case 35666:return Jx;case 35674:return jx;case 35675:return Qx;case 35676:return t_;case 5124:case 35670:return e_;case 35667:case 35671:return n_;case 35668:case 35672:return i_;case 35669:case 35673:return s_;case 5125:return r_;case 36294:return o_;case 36295:return a_;case 36296:return c_;case 35678:case 36198:case 36298:case 36306:case 35682:return l_;case 35679:case 36299:case 36307:return h_;case 35680:case 36300:case 36308:case 36293:return u_;case 36289:case 36303:case 36311:case 36292:return f_}}class p_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Yx(e.type)}}class m_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=d_(e.type)}}class g_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function Yh(i,t){i.seq.push(t),i.map[t.id]=t}function x_(i,t,e){const n=i.name,s=n.length;for(za.lastIndex=0;;){const r=za.exec(n),o=za.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Yh(e,l===void 0?new p_(a,i,t):new m_(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new g_(a),Yh(e,u)),e=u}}}class mo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);x_(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Zh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const __=37297;let v_=0;function M_(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const $h=new Jt;function y_(i){ae._getMatrix($h,ae.workingColorSpace,i);const t=`mat3( ${$h.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(i)){case _o:return[t,"LinearTransferOETF"];case de:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Kh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+M_(i.getShaderSource(t),a)}else return r}function S_(i,t){const e=y_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function w_(i,t){let e;switch(t){case Vd:e="Linear";break;case Wd:e="Reinhard";break;case Xd:e="Cineon";break;case ku:e="ACESFilmic";break;case Yd:e="AgX";break;case Zd:e="Neutral";break;case qd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const so=new z;function b_(){ae.getLuminanceCoefficients(so);const i=so.x.toFixed(4),t=so.y.toFixed(4),e=so.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function E_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function T_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function A_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function js(i){return i!==""}function Jh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const R_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gc(i){return i.replace(R_,P_)}const C_=new Map;function P_(i,t){let e=Qt[t];if(e===void 0){const n=C_.get(t);if(n!==void 0)e=Qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Gc(e)}const z_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qh(i){return i.replace(z_,D_)}function D_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function tu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function I_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Fu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ou?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function L_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case As:case Rs:t="ENVMAP_TYPE_CUBE";break;case Do:t="ENVMAP_TYPE_CUBE_UV";break}return t}function U_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Rs:t="ENVMAP_MODE_REFRACTION";break}return t}function N_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Bu:t="ENVMAP_BLENDING_MULTIPLY";break;case Gd:t="ENVMAP_BLENDING_MIX";break;case Hd:t="ENVMAP_BLENDING_ADD";break}return t}function F_(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function O_(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=I_(e),l=L_(e),h=U_(e),u=N_(e),f=F_(e),p=E_(e),g=T_(r),x=s.createProgram();let m,d,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(js).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(js).join(`
`),d.length>0&&(d+=`
`)):(m=[tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),d=[tu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==li?"#define TONE_MAPPING":"",e.toneMapping!==li?Qt.tonemapping_pars_fragment:"",e.toneMapping!==li?w_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,S_("linearToOutputTexel",e.outputColorSpace),b_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(js).join(`
`)),o=Gc(o),o=Jh(o,e),o=jh(o,e),a=Gc(a),a=Jh(a,e),a=jh(a,e),o=Qh(o),a=Qh(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=M+m+o,_=M+d+a,y=Zh(s,s.VERTEX_SHADER,v),E=Zh(s,s.FRAGMENT_SHADER,_);s.attachShader(x,y),s.attachShader(x,E),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(U){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(x)||"",B=s.getShaderInfoLog(y)||"",W=s.getShaderInfoLog(E)||"",R=k.trim(),b=B.trim(),N=W.trim();let D=!0,Y=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(D=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,y,E);else{const q=Kh(s,y,"vertex"),F=Kh(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+R+`
`+q+`
`+F)}else R!==""?console.warn("THREE.WebGLProgram: Program Info Log:",R):(b===""||N==="")&&(Y=!1);Y&&(U.diagnostics={runnable:D,programLog:R,vertexShader:{log:b,prefix:m},fragmentShader:{log:N,prefix:d}})}s.deleteShader(y),s.deleteShader(E),L=new mo(s,x),S=A_(s,x)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let S;this.getAttributes=function(){return S===void 0&&C(this),S};let T=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=s.getProgramParameter(x,__)),T},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=v_++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=y,this.fragmentShader=E,this}let B_=0;class k_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new G_(t),e.set(t,n)),n}}class G_{constructor(t){this.id=B_++,this.code=t,this.usedTimes=0}}function H_(i,t,e,n,s,r,o){const a=new tf,c=new k_,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,T,U,k,B){const W=k.fog,R=B.geometry,b=S.isMeshStandardMaterial?k.environment:null,N=(S.isMeshStandardMaterial?e:t).get(S.envMap||b),D=N&&N.mapping===Do?N.image.height:null,Y=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const q=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,F=q!==void 0?q.length:0;let K=0;R.morphAttributes.position!==void 0&&(K=1),R.morphAttributes.normal!==void 0&&(K=2),R.morphAttributes.color!==void 0&&(K=3);let wt,Rt,Tt,Z;if(Y){const ue=Rn[Y];wt=ue.vertexShader,Rt=ue.fragmentShader}else wt=S.vertexShader,Rt=S.fragmentShader,c.update(S),Tt=c.getVertexShaderID(S),Z=c.getFragmentShaderID(S);const Q=i.getRenderTarget(),ot=i.state.buffers.depth.getReversed(),pt=B.isInstancedMesh===!0,dt=B.isBatchedMesh===!0,kt=!!S.map,Vt=!!S.matcap,I=!!N,qt=!!S.aoMap,et=!!S.lightMap,rt=!!S.bumpMap,st=!!S.normalMap,It=!!S.displacementMap,ct=!!S.emissiveMap,xt=!!S.metalnessMap,Yt=!!S.roughnessMap,ne=S.anisotropy>0,P=S.clearcoat>0,w=S.dispersion>0,V=S.iridescence>0,tt=S.sheen>0,$=S.transmission>0,X=ne&&!!S.anisotropyMap,ft=P&&!!S.clearcoatMap,it=P&&!!S.clearcoatNormalMap,gt=P&&!!S.clearcoatRoughnessMap,_t=V&&!!S.iridescenceMap,at=V&&!!S.iridescenceThicknessMap,mt=tt&&!!S.sheenColorMap,Lt=tt&&!!S.sheenRoughnessMap,Pt=!!S.specularMap,Mt=!!S.specularColorMap,Zt=!!S.specularIntensityMap,O=$&&!!S.transmissionMap,ut=$&&!!S.thicknessMap,vt=!!S.gradientMap,Ct=!!S.alphaMap,lt=S.alphaTest>0,nt=!!S.alphaHash,Dt=!!S.extensions;let $t=li;S.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&($t=i.toneMapping);const ge={shaderID:Y,shaderType:S.type,shaderName:S.name,vertexShader:wt,fragmentShader:Rt,defines:S.defines,customVertexShaderID:Tt,customFragmentShaderID:Z,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:dt,batchingColor:dt&&B._colorsTexture!==null,instancing:pt,instancingColor:pt&&B.instanceColor!==null,instancingMorph:pt&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Cs,alphaToCoverage:!!S.alphaToCoverage,map:kt,matcap:Vt,envMap:I,envMapMode:I&&N.mapping,envMapCubeUVHeight:D,aoMap:qt,lightMap:et,bumpMap:rt,normalMap:st,displacementMap:f&&It,emissiveMap:ct,normalMapObjectSpace:st&&S.normalMapType===jd,normalMapTangentSpace:st&&S.normalMapType===$u,metalnessMap:xt,roughnessMap:Yt,anisotropy:ne,anisotropyMap:X,clearcoat:P,clearcoatMap:ft,clearcoatNormalMap:it,clearcoatRoughnessMap:gt,dispersion:w,iridescence:V,iridescenceMap:_t,iridescenceThicknessMap:at,sheen:tt,sheenColorMap:mt,sheenRoughnessMap:Lt,specularMap:Pt,specularColorMap:Mt,specularIntensityMap:Zt,transmission:$,transmissionMap:O,thicknessMap:ut,gradientMap:vt,opaque:S.transparent===!1&&S.blending===Ms&&S.alphaToCoverage===!1,alphaMap:Ct,alphaTest:lt,alphaHash:nt,combine:S.combine,mapUv:kt&&x(S.map.channel),aoMapUv:qt&&x(S.aoMap.channel),lightMapUv:et&&x(S.lightMap.channel),bumpMapUv:rt&&x(S.bumpMap.channel),normalMapUv:st&&x(S.normalMap.channel),displacementMapUv:It&&x(S.displacementMap.channel),emissiveMapUv:ct&&x(S.emissiveMap.channel),metalnessMapUv:xt&&x(S.metalnessMap.channel),roughnessMapUv:Yt&&x(S.roughnessMap.channel),anisotropyMapUv:X&&x(S.anisotropyMap.channel),clearcoatMapUv:ft&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:it&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:at&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Lt&&x(S.sheenRoughnessMap.channel),specularMapUv:Pt&&x(S.specularMap.channel),specularColorMapUv:Mt&&x(S.specularColorMap.channel),specularIntensityMapUv:Zt&&x(S.specularIntensityMap.channel),transmissionMapUv:O&&x(S.transmissionMap.channel),thicknessMapUv:ut&&x(S.thicknessMap.channel),alphaMapUv:Ct&&x(S.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(st||ne),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!R.attributes.uv&&(kt||Ct),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ot,skinning:B.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:F,morphTextureStride:K,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:$t,decodeVideoTexture:kt&&S.map.isVideoTexture===!0&&ae.getTransfer(S.map.colorSpace)===de,decodeVideoTextureEmissive:ct&&S.emissiveMap.isVideoTexture===!0&&ae.getTransfer(S.emissiveMap.colorSpace)===de,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ce,flipSided:S.side===$e,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Dt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Dt&&S.extensions.multiDraw===!0||dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ge.vertexUv1s=l.has(1),ge.vertexUv2s=l.has(2),ge.vertexUv3s=l.has(3),l.clear(),ge}function d(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)T.push(U),T.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(M(T,S),v(T,S),T.push(i.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function M(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function v(S,T){a.disableAll(),T.supportsVertexTextures&&a.enable(0),T.instancing&&a.enable(1),T.instancingColor&&a.enable(2),T.instancingMorph&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),T.dispersion&&a.enable(20),T.batchingColor&&a.enable(21),T.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const T=g[S.type];let U;if(T){const k=Rn[T];U=Ap.clone(k.uniforms)}else U=S.uniforms;return U}function y(S,T){let U;for(let k=0,B=h.length;k<B;k++){const W=h[k];if(W.cacheKey===T){U=W,++U.usedTimes;break}}return U===void 0&&(U=new O_(i,T,S,r),h.push(U)),U}function E(S){if(--S.usedTimes===0){const T=h.indexOf(S);h[T]=h[h.length-1],h.pop(),S.destroy()}}function C(S){c.remove(S)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:_,acquireProgram:y,releaseProgram:E,releaseShaderCache:C,programs:h,dispose:L}}function V_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function W_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function eu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function nu(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,p,g,x,m){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},i[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=x,d.group=m),t++,d}function a(u,f,p,g,x,m){const d=o(u,f,p,g,x,m);p.transmission>0?n.push(d):p.transparent===!0?s.push(d):e.push(d)}function c(u,f,p,g,x,m){const d=o(u,f,p,g,x,m);p.transmission>0?n.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function l(u,f){e.length>1&&e.sort(u||W_),n.length>1&&n.sort(f||eu),s.length>1&&s.sort(f||eu)}function h(){for(let u=t,f=i.length;u<f;u++){const p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function X_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new nu,i.set(n,[o])):s>=r.length?(o=new nu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function q_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new Ht};break;case"SpotLight":e={position:new z,direction:new z,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function Y_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Z_=0;function $_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function K_(i){const t=new q_,e=Y_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new z);const s=new z,r=new se,o=new se;function a(l){let h=0,u=0,f=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let p=0,g=0,x=0,m=0,d=0,M=0,v=0,_=0,y=0,E=0,C=0;l.sort($_);for(let S=0,T=l.length;S<T;S++){const U=l[S],k=U.color,B=U.intensity,W=U.distance,R=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=k.r*B,u+=k.g*B,f+=k.b*B;else if(U.isLightProbe){for(let b=0;b<9;b++)n.probe[b].addScaledVector(U.sh.coefficients[b],B);C++}else if(U.isDirectionalLight){const b=t.get(U);if(b.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const N=U.shadow,D=e.get(U);D.shadowIntensity=N.intensity,D.shadowBias=N.bias,D.shadowNormalBias=N.normalBias,D.shadowRadius=N.radius,D.shadowMapSize=N.mapSize,n.directionalShadow[p]=D,n.directionalShadowMap[p]=R,n.directionalShadowMatrix[p]=U.shadow.matrix,M++}n.directional[p]=b,p++}else if(U.isSpotLight){const b=t.get(U);b.position.setFromMatrixPosition(U.matrixWorld),b.color.copy(k).multiplyScalar(B),b.distance=W,b.coneCos=Math.cos(U.angle),b.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),b.decay=U.decay,n.spot[x]=b;const N=U.shadow;if(U.map&&(n.spotLightMap[y]=U.map,y++,N.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[x]=N.matrix,U.castShadow){const D=e.get(U);D.shadowIntensity=N.intensity,D.shadowBias=N.bias,D.shadowNormalBias=N.normalBias,D.shadowRadius=N.radius,D.shadowMapSize=N.mapSize,n.spotShadow[x]=D,n.spotShadowMap[x]=R,_++}x++}else if(U.isRectAreaLight){const b=t.get(U);b.color.copy(k).multiplyScalar(B),b.halfWidth.set(U.width*.5,0,0),b.halfHeight.set(0,U.height*.5,0),n.rectArea[m]=b,m++}else if(U.isPointLight){const b=t.get(U);if(b.color.copy(U.color).multiplyScalar(U.intensity),b.distance=U.distance,b.decay=U.decay,U.castShadow){const N=U.shadow,D=e.get(U);D.shadowIntensity=N.intensity,D.shadowBias=N.bias,D.shadowNormalBias=N.normalBias,D.shadowRadius=N.radius,D.shadowMapSize=N.mapSize,D.shadowCameraNear=N.camera.near,D.shadowCameraFar=N.camera.far,n.pointShadow[g]=D,n.pointShadowMap[g]=R,n.pointShadowMatrix[g]=U.shadow.matrix,v++}n.point[g]=b,g++}else if(U.isHemisphereLight){const b=t.get(U);b.skyColor.copy(U.color).multiplyScalar(B),b.groundColor.copy(U.groundColor).multiplyScalar(B),n.hemi[d]=b,d++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=St.LTC_FLOAT_1,n.rectAreaLTC2=St.LTC_FLOAT_2):(n.rectAreaLTC1=St.LTC_HALF_1,n.rectAreaLTC2=St.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==p||L.pointLength!==g||L.spotLength!==x||L.rectAreaLength!==m||L.hemiLength!==d||L.numDirectionalShadows!==M||L.numPointShadows!==v||L.numSpotShadows!==_||L.numSpotMaps!==y||L.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=_+y-E,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=C,L.directionalLength=p,L.pointLength=g,L.spotLength=x,L.rectAreaLength=m,L.hemiLength=d,L.numDirectionalShadows=M,L.numPointShadows=v,L.numSpotShadows=_,L.numSpotMaps=y,L.numLightProbes=C,n.version=Z_++)}function c(l,h){let u=0,f=0,p=0,g=0,x=0;const m=h.matrixWorldInverse;for(let d=0,M=l.length;d<M;d++){const v=l[d];if(v.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(v.isSpotLight){const _=n.spot[p];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const _=n.rectArea[g];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(v.width*.5,0,0),_.halfHeight.set(0,v.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(v.matrixWorld),_.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const _=n.hemi[x];_.direction.setFromMatrixPosition(v.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:c,state:n}}function iu(i){const t=new K_(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function J_(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new iu(i),t.set(s,[a])):r>=o.length?(a=new iu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const j_=`void main() {
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
}`;function tv(i,t,e){let n=new Io;const s=new Et,r=new Et,o=new Te,a=new Mm({depthPacking:Jd}),c=new ym,l={},h=e.maxTextureSize,u={[fi]:$e,[$e]:fi,[Ce]:Ce},f=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:j_,fragmentShader:Q_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new ve;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ie(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fu;let d=this.type;this.render=function(E,C,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const S=i.getRenderTarget(),T=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),k=i.state;k.setBlending(ci),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=d!==Wn&&this.type===Wn,W=d===Wn&&this.type!==Wn;for(let R=0,b=E.length;R<b;R++){const N=E[R],D=N.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const Y=D.getFrameExtents();if(s.multiply(Y),r.copy(D.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,D.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,D.mapSize.y=r.y)),D.map===null||B===!0||W===!0){const F=this.type!==Wn?{minFilter:an,magFilter:an}:{};D.map!==null&&D.map.dispose(),D.map=new Ui(s.x,s.y,F),D.map.texture.name=N.name+".shadowMap",D.camera.updateProjectionMatrix()}i.setRenderTarget(D.map),i.clear();const q=D.getViewportCount();for(let F=0;F<q;F++){const K=D.getViewport(F);o.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),k.viewport(o),D.updateMatrices(N,F),n=D.getFrustum(),_(C,L,D.camera,N,this.type)}D.isPointLightShadow!==!0&&this.type===Wn&&M(D,L),D.needsUpdate=!1}d=this.type,m.needsUpdate=!1,i.setRenderTarget(S,T,U)};function M(E,C){const L=t.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ui(s.x,s.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(C,null,L,f,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(C,null,L,p,x,null)}function v(E,C,L,S){let T=null;const U=L.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)T=U;else if(T=L.isPointLight===!0?c:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=T.uuid,B=C.uuid;let W=l[k];W===void 0&&(W={},l[k]=W);let R=W[B];R===void 0&&(R=T.clone(),W[B]=R,C.addEventListener("dispose",y)),T=R}if(T.visible=C.visible,T.wireframe=C.wireframe,S===Wn?T.side=C.shadowSide!==null?C.shadowSide:C.side:T.side=C.shadowSide!==null?C.shadowSide:u[C.side],T.alphaMap=C.alphaMap,T.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,T.map=C.map,T.clipShadows=C.clipShadows,T.clippingPlanes=C.clippingPlanes,T.clipIntersection=C.clipIntersection,T.displacementMap=C.displacementMap,T.displacementScale=C.displacementScale,T.displacementBias=C.displacementBias,T.wireframeLinewidth=C.wireframeLinewidth,T.linewidth=C.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const k=i.properties.get(T);k.light=L}return T}function _(E,C,L,S,T){if(E.visible===!1)return;if(E.layers.test(C.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&T===Wn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,E.matrixWorld);const B=t.update(E),W=E.material;if(Array.isArray(W)){const R=B.groups;for(let b=0,N=R.length;b<N;b++){const D=R[b],Y=W[D.materialIndex];if(Y&&Y.visible){const q=v(E,Y,S,T);E.onBeforeShadow(i,E,C,L,B,q,D),i.renderBufferDirect(L,null,B,q,E,D),E.onAfterShadow(i,E,C,L,B,q,D)}}}else if(W.visible){const R=v(E,W,S,T);E.onBeforeShadow(i,E,C,L,B,R,null),i.renderBufferDirect(L,null,B,R,E,null),E.onAfterShadow(i,E,C,L,B,R,null)}}const k=E.children;for(let B=0,W=k.length;B<W;B++)_(k[B],C,L,S,T)}function y(E){E.target.removeEventListener("dispose",y);for(const L in l){const S=l[L],T=E.target.uuid;T in S&&(S[T].dispose(),delete S[T])}}}const ev={[Ja]:ja,[Qa]:nc,[tc]:ic,[Ts]:ec,[ja]:Ja,[nc]:Qa,[ic]:tc,[ec]:Ts};function nv(i,t){function e(){let O=!1;const ut=new Te;let vt=null;const Ct=new Te(0,0,0,0);return{setMask:function(lt){vt!==lt&&!O&&(i.colorMask(lt,lt,lt,lt),vt=lt)},setLocked:function(lt){O=lt},setClear:function(lt,nt,Dt,$t,ge){ge===!0&&(lt*=$t,nt*=$t,Dt*=$t),ut.set(lt,nt,Dt,$t),Ct.equals(ut)===!1&&(i.clearColor(lt,nt,Dt,$t),Ct.copy(ut))},reset:function(){O=!1,vt=null,Ct.set(-1,0,0,0)}}}function n(){let O=!1,ut=!1,vt=null,Ct=null,lt=null;return{setReversed:function(nt){if(ut!==nt){const Dt=t.get("EXT_clip_control");nt?Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.ZERO_TO_ONE_EXT):Dt.clipControlEXT(Dt.LOWER_LEFT_EXT,Dt.NEGATIVE_ONE_TO_ONE_EXT),ut=nt;const $t=lt;lt=null,this.setClear($t)}},getReversed:function(){return ut},setTest:function(nt){nt?Q(i.DEPTH_TEST):ot(i.DEPTH_TEST)},setMask:function(nt){vt!==nt&&!O&&(i.depthMask(nt),vt=nt)},setFunc:function(nt){if(ut&&(nt=ev[nt]),Ct!==nt){switch(nt){case Ja:i.depthFunc(i.NEVER);break;case ja:i.depthFunc(i.ALWAYS);break;case Qa:i.depthFunc(i.LESS);break;case Ts:i.depthFunc(i.LEQUAL);break;case tc:i.depthFunc(i.EQUAL);break;case ec:i.depthFunc(i.GEQUAL);break;case nc:i.depthFunc(i.GREATER);break;case ic:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ct=nt}},setLocked:function(nt){O=nt},setClear:function(nt){lt!==nt&&(ut&&(nt=1-nt),i.clearDepth(nt),lt=nt)},reset:function(){O=!1,vt=null,Ct=null,lt=null,ut=!1}}}function s(){let O=!1,ut=null,vt=null,Ct=null,lt=null,nt=null,Dt=null,$t=null,ge=null;return{setTest:function(ue){O||(ue?Q(i.STENCIL_TEST):ot(i.STENCIL_TEST))},setMask:function(ue){ut!==ue&&!O&&(i.stencilMask(ue),ut=ue)},setFunc:function(ue,Fn,Tn){(vt!==ue||Ct!==Fn||lt!==Tn)&&(i.stencilFunc(ue,Fn,Tn),vt=ue,Ct=Fn,lt=Tn)},setOp:function(ue,Fn,Tn){(nt!==ue||Dt!==Fn||$t!==Tn)&&(i.stencilOp(ue,Fn,Tn),nt=ue,Dt=Fn,$t=Tn)},setLocked:function(ue){O=ue},setClear:function(ue){ge!==ue&&(i.clearStencil(ue),ge=ue)},reset:function(){O=!1,ut=null,vt=null,Ct=null,lt=null,nt=null,Dt=null,$t=null,ge=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,M=null,v=null,_=null,y=null,E=null,C=new Ht(0,0,0),L=0,S=!1,T=null,U=null,k=null,B=null,W=null;const R=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let b=!1,N=0;const D=i.getParameter(i.VERSION);D.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(D)[1]),b=N>=1):D.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),b=N>=2);let Y=null,q={};const F=i.getParameter(i.SCISSOR_BOX),K=i.getParameter(i.VIEWPORT),wt=new Te().fromArray(F),Rt=new Te().fromArray(K);function Tt(O,ut,vt,Ct){const lt=new Uint8Array(4),nt=i.createTexture();i.bindTexture(O,nt),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Dt=0;Dt<vt;Dt++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ut,0,i.RGBA,1,1,Ct,0,i.RGBA,i.UNSIGNED_BYTE,lt):i.texImage2D(ut+Dt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,lt);return nt}const Z={};Z[i.TEXTURE_2D]=Tt(i.TEXTURE_2D,i.TEXTURE_2D,1),Z[i.TEXTURE_CUBE_MAP]=Tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[i.TEXTURE_2D_ARRAY]=Tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Z[i.TEXTURE_3D]=Tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),Q(i.DEPTH_TEST),o.setFunc(Ts),rt(!1),st(Yl),Q(i.CULL_FACE),qt(ci);function Q(O){h[O]!==!0&&(i.enable(O),h[O]=!0)}function ot(O){h[O]!==!1&&(i.disable(O),h[O]=!1)}function pt(O,ut){return u[O]!==ut?(i.bindFramebuffer(O,ut),u[O]=ut,O===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ut),O===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ut),!0):!1}function dt(O,ut){let vt=p,Ct=!1;if(O){vt=f.get(ut),vt===void 0&&(vt=[],f.set(ut,vt));const lt=O.textures;if(vt.length!==lt.length||vt[0]!==i.COLOR_ATTACHMENT0){for(let nt=0,Dt=lt.length;nt<Dt;nt++)vt[nt]=i.COLOR_ATTACHMENT0+nt;vt.length=lt.length,Ct=!0}}else vt[0]!==i.BACK&&(vt[0]=i.BACK,Ct=!0);Ct&&i.drawBuffers(vt)}function kt(O){return g!==O?(i.useProgram(O),g=O,!0):!1}const Vt={[Ei]:i.FUNC_ADD,[bd]:i.FUNC_SUBTRACT,[Ed]:i.FUNC_REVERSE_SUBTRACT};Vt[Td]=i.MIN,Vt[Ad]=i.MAX;const I={[Rd]:i.ZERO,[Cd]:i.ONE,[Pd]:i.SRC_COLOR,[$a]:i.SRC_ALPHA,[Nd]:i.SRC_ALPHA_SATURATE,[Ld]:i.DST_COLOR,[Dd]:i.DST_ALPHA,[zd]:i.ONE_MINUS_SRC_COLOR,[Ka]:i.ONE_MINUS_SRC_ALPHA,[Ud]:i.ONE_MINUS_DST_COLOR,[Id]:i.ONE_MINUS_DST_ALPHA,[Fd]:i.CONSTANT_COLOR,[Od]:i.ONE_MINUS_CONSTANT_COLOR,[Bd]:i.CONSTANT_ALPHA,[kd]:i.ONE_MINUS_CONSTANT_ALPHA};function qt(O,ut,vt,Ct,lt,nt,Dt,$t,ge,ue){if(O===ci){x===!0&&(ot(i.BLEND),x=!1);return}if(x===!1&&(Q(i.BLEND),x=!0),O!==wd){if(O!==m||ue!==S){if((d!==Ei||_!==Ei)&&(i.blendEquation(i.FUNC_ADD),d=Ei,_=Ei),ue)switch(O){case Ms:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zl:i.blendFunc(i.ONE,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case Ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Zl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case $l:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kl:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}M=null,v=null,y=null,E=null,C.set(0,0,0),L=0,m=O,S=ue}return}lt=lt||ut,nt=nt||vt,Dt=Dt||Ct,(ut!==d||lt!==_)&&(i.blendEquationSeparate(Vt[ut],Vt[lt]),d=ut,_=lt),(vt!==M||Ct!==v||nt!==y||Dt!==E)&&(i.blendFuncSeparate(I[vt],I[Ct],I[nt],I[Dt]),M=vt,v=Ct,y=nt,E=Dt),($t.equals(C)===!1||ge!==L)&&(i.blendColor($t.r,$t.g,$t.b,ge),C.copy($t),L=ge),m=O,S=!1}function et(O,ut){O.side===Ce?ot(i.CULL_FACE):Q(i.CULL_FACE);let vt=O.side===$e;ut&&(vt=!vt),rt(vt),O.blending===Ms&&O.transparent===!1?qt(ci):qt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),r.setMask(O.colorWrite);const Ct=O.stencilWrite;a.setTest(Ct),Ct&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),ct(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function rt(O){T!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),T=O)}function st(O){O!==yd?(Q(i.CULL_FACE),O!==U&&(O===Yl?i.cullFace(i.BACK):O===Sd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ot(i.CULL_FACE),U=O}function It(O){O!==k&&(b&&i.lineWidth(O),k=O)}function ct(O,ut,vt){O?(Q(i.POLYGON_OFFSET_FILL),(B!==ut||W!==vt)&&(i.polygonOffset(ut,vt),B=ut,W=vt)):ot(i.POLYGON_OFFSET_FILL)}function xt(O){O?Q(i.SCISSOR_TEST):ot(i.SCISSOR_TEST)}function Yt(O){O===void 0&&(O=i.TEXTURE0+R-1),Y!==O&&(i.activeTexture(O),Y=O)}function ne(O,ut,vt){vt===void 0&&(Y===null?vt=i.TEXTURE0+R-1:vt=Y);let Ct=q[vt];Ct===void 0&&(Ct={type:void 0,texture:void 0},q[vt]=Ct),(Ct.type!==O||Ct.texture!==ut)&&(Y!==vt&&(i.activeTexture(vt),Y=vt),i.bindTexture(O,ut||Z[O]),Ct.type=O,Ct.texture=ut)}function P(){const O=q[Y];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function V(){try{i.compressedTexImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function tt(){try{i.texSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function $(){try{i.texSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function X(){try{i.compressedTexSubImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{i.compressedTexSubImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{i.texStorage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function gt(){try{i.texStorage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function _t(){try{i.texImage2D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function at(){try{i.texImage3D(...arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(O){wt.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),wt.copy(O))}function Lt(O){Rt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Rt.copy(O))}function Pt(O,ut){let vt=l.get(ut);vt===void 0&&(vt=new WeakMap,l.set(ut,vt));let Ct=vt.get(O);Ct===void 0&&(Ct=i.getUniformBlockIndex(ut,O.name),vt.set(O,Ct))}function Mt(O,ut){const Ct=l.get(ut).get(O);c.get(ut)!==Ct&&(i.uniformBlockBinding(ut,Ct,O.__bindingPointIndex),c.set(ut,Ct))}function Zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Y=null,q={},u={},f=new WeakMap,p=[],g=null,x=!1,m=null,d=null,M=null,v=null,_=null,y=null,E=null,C=new Ht(0,0,0),L=0,S=!1,T=null,U=null,k=null,B=null,W=null,wt.set(0,0,i.canvas.width,i.canvas.height),Rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:Q,disable:ot,bindFramebuffer:pt,drawBuffers:dt,useProgram:kt,setBlending:qt,setMaterial:et,setFlipSided:rt,setCullFace:st,setLineWidth:It,setPolygonOffset:ct,setScissorTest:xt,activeTexture:Yt,bindTexture:ne,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:V,texImage2D:_t,texImage3D:at,updateUBOMapping:Pt,uniformBlockBinding:Mt,texStorage2D:it,texStorage3D:gt,texSubImage2D:tt,texSubImage3D:$,compressedTexSubImage2D:X,compressedTexSubImage3D:ft,scissor:mt,viewport:Lt,reset:Zt}}function iv(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Et,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,w){return p?new OffscreenCanvas(P,w):Mo("canvas")}function x(P,w,V){let tt=1;const $=ne(P);if(($.width>V||$.height>V)&&(tt=V/Math.max($.width,$.height)),tt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const X=Math.floor(tt*$.width),ft=Math.floor(tt*$.height);u===void 0&&(u=g(X,ft));const it=w?g(X,ft):u;return it.width=X,it.height=ft,it.getContext("2d").drawImage(P,0,0,X,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+X+"x"+ft+")."),it}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),P;return P}function m(P){return P.generateMipmaps}function d(P){i.generateMipmap(P)}function M(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(P,w,V,tt,$=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let X=w;if(w===i.RED&&(V===i.FLOAT&&(X=i.R32F),V===i.HALF_FLOAT&&(X=i.R16F),V===i.UNSIGNED_BYTE&&(X=i.R8)),w===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(X=i.R8UI),V===i.UNSIGNED_SHORT&&(X=i.R16UI),V===i.UNSIGNED_INT&&(X=i.R32UI),V===i.BYTE&&(X=i.R8I),V===i.SHORT&&(X=i.R16I),V===i.INT&&(X=i.R32I)),w===i.RG&&(V===i.FLOAT&&(X=i.RG32F),V===i.HALF_FLOAT&&(X=i.RG16F),V===i.UNSIGNED_BYTE&&(X=i.RG8)),w===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(X=i.RG8UI),V===i.UNSIGNED_SHORT&&(X=i.RG16UI),V===i.UNSIGNED_INT&&(X=i.RG32UI),V===i.BYTE&&(X=i.RG8I),V===i.SHORT&&(X=i.RG16I),V===i.INT&&(X=i.RG32I)),w===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(X=i.RGB8UI),V===i.UNSIGNED_SHORT&&(X=i.RGB16UI),V===i.UNSIGNED_INT&&(X=i.RGB32UI),V===i.BYTE&&(X=i.RGB8I),V===i.SHORT&&(X=i.RGB16I),V===i.INT&&(X=i.RGB32I)),w===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),V===i.UNSIGNED_INT&&(X=i.RGBA32UI),V===i.BYTE&&(X=i.RGBA8I),V===i.SHORT&&(X=i.RGBA16I),V===i.INT&&(X=i.RGBA32I)),w===i.RGB&&(V===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(X=i.R11F_G11F_B10F)),w===i.RGBA){const ft=$?_o:ae.getTransfer(tt);V===i.FLOAT&&(X=i.RGBA32F),V===i.HALF_FLOAT&&(X=i.RGBA16F),V===i.UNSIGNED_BYTE&&(X=ft===de?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function _(P,w){let V;return P?w===null||w===Li||w===hr?V=i.DEPTH24_STENCIL8:w===Pn?V=i.DEPTH32F_STENCIL8:w===lr&&(V=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Li||w===hr?V=i.DEPTH_COMPONENT24:w===Pn?V=i.DEPTH_COMPONENT32F:w===lr&&(V=i.DEPTH_COMPONENT16),V}function y(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==an&&P.minFilter!==Sn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function E(P){const w=P.target;w.removeEventListener("dispose",E),L(w),w.isVideoTexture&&h.delete(w)}function C(P){const w=P.target;w.removeEventListener("dispose",C),T(w)}function L(P){const w=n.get(P);if(w.__webglInit===void 0)return;const V=P.source,tt=f.get(V);if(tt){const $=tt[w.__cacheKey];$.usedTimes--,$.usedTimes===0&&S(P),Object.keys(tt).length===0&&f.delete(V)}n.remove(P)}function S(P){const w=n.get(P);i.deleteTexture(w.__webglTexture);const V=P.source,tt=f.get(V);delete tt[w.__cacheKey],o.memory.textures--}function T(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(w.__webglFramebuffer[tt]))for(let $=0;$<w.__webglFramebuffer[tt].length;$++)i.deleteFramebuffer(w.__webglFramebuffer[tt][$]);else i.deleteFramebuffer(w.__webglFramebuffer[tt]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[tt])}else{if(Array.isArray(w.__webglFramebuffer))for(let tt=0;tt<w.__webglFramebuffer.length;tt++)i.deleteFramebuffer(w.__webglFramebuffer[tt]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let tt=0;tt<w.__webglColorRenderbuffer.length;tt++)w.__webglColorRenderbuffer[tt]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[tt]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const V=P.textures;for(let tt=0,$=V.length;tt<$;tt++){const X=n.get(V[tt]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),o.memory.textures--),n.remove(V[tt])}n.remove(P)}let U=0;function k(){U=0}function B(){const P=U;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),U+=1,P}function W(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function R(P,w){const V=n.get(P);if(P.isVideoTexture&&xt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&V.__version!==P.version){const tt=P.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(V,P,w);return}}else P.isExternalTexture&&(V.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+w)}function b(P,w){const V=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){Z(V,P,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+w)}function N(P,w){const V=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){Z(V,P,w);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+w)}function D(P,w){const V=n.get(P);if(P.version>0&&V.__version!==P.version){Q(V,P,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+w)}const Y={[$n]:i.REPEAT,[Ai]:i.CLAMP_TO_EDGE,[oc]:i.MIRRORED_REPEAT},q={[an]:i.NEAREST,[$d]:i.NEAREST_MIPMAP_NEAREST,[Rr]:i.NEAREST_MIPMAP_LINEAR,[Sn]:i.LINEAR,[Zo]:i.LINEAR_MIPMAP_NEAREST,[Ri]:i.LINEAR_MIPMAP_LINEAR},F={[Qd]:i.NEVER,[rp]:i.ALWAYS,[tp]:i.LESS,[Ku]:i.LEQUAL,[ep]:i.EQUAL,[sp]:i.GEQUAL,[np]:i.GREATER,[ip]:i.NOTEQUAL};function K(P,w){if(w.type===Pn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Sn||w.magFilter===Zo||w.magFilter===Rr||w.magFilter===Ri||w.minFilter===Sn||w.minFilter===Zo||w.minFilter===Rr||w.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,Y[w.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,Y[w.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,Y[w.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,q[w.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,q[w.minFilter]),w.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,F[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===an||w.minFilter!==Rr&&w.minFilter!==Ri||w.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function wt(P,w){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",E));const tt=w.source;let $=f.get(tt);$===void 0&&($={},f.set(tt,$));const X=W(w);if(X!==P.__cacheKey){$[X]===void 0&&($[X]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),$[X].usedTimes++;const ft=$[P.__cacheKey];ft!==void 0&&($[P.__cacheKey].usedTimes--,ft.usedTimes===0&&S(w)),P.__cacheKey=X,P.__webglTexture=$[X].texture}return V}function Rt(P,w,V){return Math.floor(Math.floor(P/V)/w)}function Tt(P,w,V,tt){const X=P.updateRanges;if(X.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,V,tt,w.data);else{X.sort((at,mt)=>at.start-mt.start);let ft=0;for(let at=1;at<X.length;at++){const mt=X[ft],Lt=X[at],Pt=mt.start+mt.count,Mt=Rt(Lt.start,w.width,4),Zt=Rt(mt.start,w.width,4);Lt.start<=Pt+1&&Mt===Zt&&Rt(Lt.start+Lt.count-1,w.width,4)===Mt?mt.count=Math.max(mt.count,Lt.start+Lt.count-mt.start):(++ft,X[ft]=Lt)}X.length=ft+1;const it=i.getParameter(i.UNPACK_ROW_LENGTH),gt=i.getParameter(i.UNPACK_SKIP_PIXELS),_t=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let at=0,mt=X.length;at<mt;at++){const Lt=X[at],Pt=Math.floor(Lt.start/4),Mt=Math.ceil(Lt.count/4),Zt=Pt%w.width,O=Math.floor(Pt/w.width),ut=Mt,vt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Zt),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),e.texSubImage2D(i.TEXTURE_2D,0,Zt,O,ut,vt,V,tt,w.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,it),i.pixelStorei(i.UNPACK_SKIP_PIXELS,gt),i.pixelStorei(i.UNPACK_SKIP_ROWS,_t)}}function Z(P,w,V){let tt=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(tt=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(tt=i.TEXTURE_3D);const $=wt(P,w),X=w.source;e.bindTexture(tt,P.__webglTexture,i.TEXTURE0+V);const ft=n.get(X);if(X.version!==ft.__version||$===!0){e.activeTexture(i.TEXTURE0+V);const it=ae.getPrimaries(ae.workingColorSpace),gt=w.colorSpace===ri?null:ae.getPrimaries(w.colorSpace),_t=w.colorSpace===ri||it===gt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let at=x(w.image,!1,s.maxTextureSize);at=Yt(w,at);const mt=r.convert(w.format,w.colorSpace),Lt=r.convert(w.type);let Pt=v(w.internalFormat,mt,Lt,w.colorSpace,w.isVideoTexture);K(tt,w);let Mt;const Zt=w.mipmaps,O=w.isVideoTexture!==!0,ut=ft.__version===void 0||$===!0,vt=X.dataReady,Ct=y(w,at);if(w.isDepthTexture)Pt=_(w.format===fr,w.type),ut&&(O?e.texStorage2D(i.TEXTURE_2D,1,Pt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,Pt,at.width,at.height,0,mt,Lt,null));else if(w.isDataTexture)if(Zt.length>0){O&&ut&&e.texStorage2D(i.TEXTURE_2D,Ct,Pt,Zt[0].width,Zt[0].height);for(let lt=0,nt=Zt.length;lt<nt;lt++)Mt=Zt[lt],O?vt&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,Mt.width,Mt.height,mt,Lt,Mt.data):e.texImage2D(i.TEXTURE_2D,lt,Pt,Mt.width,Mt.height,0,mt,Lt,Mt.data);w.generateMipmaps=!1}else O?(ut&&e.texStorage2D(i.TEXTURE_2D,Ct,Pt,at.width,at.height),vt&&Tt(w,at,mt,Lt)):e.texImage2D(i.TEXTURE_2D,0,Pt,at.width,at.height,0,mt,Lt,at.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){O&&ut&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ct,Pt,Zt[0].width,Zt[0].height,at.depth);for(let lt=0,nt=Zt.length;lt<nt;lt++)if(Mt=Zt[lt],w.format!==wn)if(mt!==null)if(O){if(vt)if(w.layerUpdates.size>0){const Dt=Ih(Mt.width,Mt.height,w.format,w.type);for(const $t of w.layerUpdates){const ge=Mt.data.subarray($t*Dt/Mt.data.BYTES_PER_ELEMENT,($t+1)*Dt/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,$t,Mt.width,Mt.height,1,mt,ge)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,Mt.width,Mt.height,at.depth,mt,Mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,lt,Pt,Mt.width,Mt.height,at.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?vt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,lt,0,0,0,Mt.width,Mt.height,at.depth,mt,Lt,Mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,lt,Pt,Mt.width,Mt.height,at.depth,0,mt,Lt,Mt.data)}else{O&&ut&&e.texStorage2D(i.TEXTURE_2D,Ct,Pt,Zt[0].width,Zt[0].height);for(let lt=0,nt=Zt.length;lt<nt;lt++)Mt=Zt[lt],w.format!==wn?mt!==null?O?vt&&e.compressedTexSubImage2D(i.TEXTURE_2D,lt,0,0,Mt.width,Mt.height,mt,Mt.data):e.compressedTexImage2D(i.TEXTURE_2D,lt,Pt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?vt&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,Mt.width,Mt.height,mt,Lt,Mt.data):e.texImage2D(i.TEXTURE_2D,lt,Pt,Mt.width,Mt.height,0,mt,Lt,Mt.data)}else if(w.isDataArrayTexture)if(O){if(ut&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ct,Pt,at.width,at.height,at.depth),vt)if(w.layerUpdates.size>0){const lt=Ih(at.width,at.height,w.format,w.type);for(const nt of w.layerUpdates){const Dt=at.data.subarray(nt*lt/at.data.BYTES_PER_ELEMENT,(nt+1)*lt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,nt,at.width,at.height,1,mt,Lt,Dt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,mt,Lt,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,at.width,at.height,at.depth,0,mt,Lt,at.data);else if(w.isData3DTexture)O?(ut&&e.texStorage3D(i.TEXTURE_3D,Ct,Pt,at.width,at.height,at.depth),vt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,mt,Lt,at.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,at.width,at.height,at.depth,0,mt,Lt,at.data);else if(w.isFramebufferTexture){if(ut)if(O)e.texStorage2D(i.TEXTURE_2D,Ct,Pt,at.width,at.height);else{let lt=at.width,nt=at.height;for(let Dt=0;Dt<Ct;Dt++)e.texImage2D(i.TEXTURE_2D,Dt,Pt,lt,nt,0,mt,Lt,null),lt>>=1,nt>>=1}}else if(Zt.length>0){if(O&&ut){const lt=ne(Zt[0]);e.texStorage2D(i.TEXTURE_2D,Ct,Pt,lt.width,lt.height)}for(let lt=0,nt=Zt.length;lt<nt;lt++)Mt=Zt[lt],O?vt&&e.texSubImage2D(i.TEXTURE_2D,lt,0,0,mt,Lt,Mt):e.texImage2D(i.TEXTURE_2D,lt,Pt,mt,Lt,Mt);w.generateMipmaps=!1}else if(O){if(ut){const lt=ne(at);e.texStorage2D(i.TEXTURE_2D,Ct,Pt,lt.width,lt.height)}vt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,mt,Lt,at)}else e.texImage2D(i.TEXTURE_2D,0,Pt,mt,Lt,at);m(w)&&d(tt),ft.__version=X.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Q(P,w,V){if(w.image.length!==6)return;const tt=wt(P,w),$=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+V);const X=n.get($);if($.version!==X.__version||tt===!0){e.activeTexture(i.TEXTURE0+V);const ft=ae.getPrimaries(ae.workingColorSpace),it=w.colorSpace===ri?null:ae.getPrimaries(w.colorSpace),gt=w.colorSpace===ri||ft===it?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,gt);const _t=w.isCompressedTexture||w.image[0].isCompressedTexture,at=w.image[0]&&w.image[0].isDataTexture,mt=[];for(let nt=0;nt<6;nt++)!_t&&!at?mt[nt]=x(w.image[nt],!0,s.maxCubemapSize):mt[nt]=at?w.image[nt].image:w.image[nt],mt[nt]=Yt(w,mt[nt]);const Lt=mt[0],Pt=r.convert(w.format,w.colorSpace),Mt=r.convert(w.type),Zt=v(w.internalFormat,Pt,Mt,w.colorSpace),O=w.isVideoTexture!==!0,ut=X.__version===void 0||tt===!0,vt=$.dataReady;let Ct=y(w,Lt);K(i.TEXTURE_CUBE_MAP,w);let lt;if(_t){O&&ut&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,Zt,Lt.width,Lt.height);for(let nt=0;nt<6;nt++){lt=mt[nt].mipmaps;for(let Dt=0;Dt<lt.length;Dt++){const $t=lt[Dt];w.format!==wn?Pt!==null?O?vt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,$t.width,$t.height,Pt,$t.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Zt,$t.width,$t.height,0,$t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?vt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,$t.width,$t.height,Pt,Mt,$t.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,Zt,$t.width,$t.height,0,Pt,Mt,$t.data)}}}else{if(lt=w.mipmaps,O&&ut){lt.length>0&&Ct++;const nt=ne(mt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,Zt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(at){O?vt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,mt[nt].width,mt[nt].height,Pt,Mt,mt[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,mt[nt].width,mt[nt].height,0,Pt,Mt,mt[nt].data);for(let Dt=0;Dt<lt.length;Dt++){const ge=lt[Dt].image[nt].image;O?vt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,ge.width,ge.height,Pt,Mt,ge.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Zt,ge.width,ge.height,0,Pt,Mt,ge.data)}}else{O?vt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Pt,Mt,mt[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,Pt,Mt,mt[nt]);for(let Dt=0;Dt<lt.length;Dt++){const $t=lt[Dt];O?vt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,Pt,Mt,$t.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,Zt,Pt,Mt,$t.image[nt])}}}m(w)&&d(i.TEXTURE_CUBE_MAP),X.__version=$.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ot(P,w,V,tt,$,X){const ft=r.convert(V.format,V.colorSpace),it=r.convert(V.type),gt=v(V.internalFormat,ft,it,V.colorSpace),_t=n.get(w),at=n.get(V);if(at.__renderTarget=w,!_t.__hasExternalTextures){const mt=Math.max(1,w.width>>X),Lt=Math.max(1,w.height>>X);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,X,gt,mt,Lt,w.depth,0,ft,it,null):e.texImage2D($,X,gt,mt,Lt,0,ft,it,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,$,at.__webglTexture,0,It(w)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,tt,$,at.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(P,w,V){if(i.bindRenderbuffer(i.RENDERBUFFER,P),w.depthBuffer){const tt=w.depthTexture,$=tt&&tt.isDepthTexture?tt.type:null,X=_(w.stencilBuffer,$),ft=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=It(w);ct(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,it,X,w.width,w.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,it,X,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,X,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,P)}else{const tt=w.textures;for(let $=0;$<tt.length;$++){const X=tt[$],ft=r.convert(X.format,X.colorSpace),it=r.convert(X.type),gt=v(X.internalFormat,ft,it,X.colorSpace),_t=It(w);V&&ct(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,_t,gt,w.width,w.height):ct(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_t,gt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,gt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function dt(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=n.get(w.depthTexture);tt.__renderTarget=w,(!tt.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),R(w.depthTexture,0);const $=tt.__webglTexture,X=It(w);if(w.depthTexture.format===ur)ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(w.depthTexture.format===fr)ct(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function kt(P){const w=n.get(P),V=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const tt=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),tt){const $=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,tt.removeEventListener("dispose",$)};tt.addEventListener("dispose",$),w.__depthDisposeCallback=$}w.__boundDepthTexture=tt}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");const tt=P.texture.mipmaps;tt&&tt.length>0?dt(w.__webglFramebuffer[0],P):dt(w.__webglFramebuffer,P)}else if(V){w.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[tt]),w.__webglDepthbuffer[tt]===void 0)w.__webglDepthbuffer[tt]=i.createRenderbuffer(),pt(w.__webglDepthbuffer[tt],P,!1);else{const $=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=w.__webglDepthbuffer[tt];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,X)}}else{const tt=P.texture.mipmaps;if(tt&&tt.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),pt(w.__webglDepthbuffer,P,!1);else{const $=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,X)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(P,w,V){const tt=n.get(P);w!==void 0&&ot(tt.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&kt(P)}function I(P){const w=P.texture,V=n.get(P),tt=n.get(w);P.addEventListener("dispose",C);const $=P.textures,X=P.isWebGLCubeRenderTarget===!0,ft=$.length>1;if(ft||(tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture()),tt.__version=w.version,o.memory.textures++),X){V.__webglFramebuffer=[];for(let it=0;it<6;it++)if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer[it]=[];for(let gt=0;gt<w.mipmaps.length;gt++)V.__webglFramebuffer[it][gt]=i.createFramebuffer()}else V.__webglFramebuffer[it]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){V.__webglFramebuffer=[];for(let it=0;it<w.mipmaps.length;it++)V.__webglFramebuffer[it]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(ft)for(let it=0,gt=$.length;it<gt;it++){const _t=n.get($[it]);_t.__webglTexture===void 0&&(_t.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&ct(P)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let it=0;it<$.length;it++){const gt=$[it];V.__webglColorRenderbuffer[it]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[it]);const _t=r.convert(gt.format,gt.colorSpace),at=r.convert(gt.type),mt=v(gt.internalFormat,_t,at,gt.colorSpace,P.isXRRenderTarget===!0),Lt=It(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,mt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+it,i.RENDERBUFFER,V.__webglColorRenderbuffer[it])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),pt(V.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),K(i.TEXTURE_CUBE_MAP,w);for(let it=0;it<6;it++)if(w.mipmaps&&w.mipmaps.length>0)for(let gt=0;gt<w.mipmaps.length;gt++)ot(V.__webglFramebuffer[it][gt],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,gt);else ot(V.__webglFramebuffer[it],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(w)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let it=0,gt=$.length;it<gt;it++){const _t=$[it],at=n.get(_t);let mt=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(mt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(mt,at.__webglTexture),K(mt,_t),ot(V.__webglFramebuffer,P,_t,i.COLOR_ATTACHMENT0+it,mt,0),m(_t)&&d(mt)}e.unbindTexture()}else{let it=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(it=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(it,tt.__webglTexture),K(it,w),w.mipmaps&&w.mipmaps.length>0)for(let gt=0;gt<w.mipmaps.length;gt++)ot(V.__webglFramebuffer[gt],P,w,i.COLOR_ATTACHMENT0,it,gt);else ot(V.__webglFramebuffer,P,w,i.COLOR_ATTACHMENT0,it,0);m(w)&&d(it),e.unbindTexture()}P.depthBuffer&&kt(P)}function qt(P){const w=P.textures;for(let V=0,tt=w.length;V<tt;V++){const $=w[V];if(m($)){const X=M(P),ft=n.get($).__webglTexture;e.bindTexture(X,ft),d(X),e.unbindTexture()}}}const et=[],rt=[];function st(P){if(P.samples>0){if(ct(P)===!1){const w=P.textures,V=P.width,tt=P.height;let $=i.COLOR_BUFFER_BIT;const X=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=n.get(P),it=w.length>1;if(it)for(let _t=0;_t<w.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer);const gt=P.texture.mipmaps;gt&&gt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let _t=0;_t<w.length;_t++){if(P.resolveDepthBuffer&&(P.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),it){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ft.__webglColorRenderbuffer[_t]);const at=n.get(w[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,at,0)}i.blitFramebuffer(0,0,V,tt,0,0,V,tt,$,i.NEAREST),c===!0&&(et.length=0,rt.length=0,et.push(i.COLOR_ATTACHMENT0+_t),P.depthBuffer&&P.resolveDepthBuffer===!1&&(et.push(X),rt.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,rt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),it)for(let _t=0;_t<w.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,ft.__webglColorRenderbuffer[_t]);const at=n.get(w[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,at,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const w=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function It(P){return Math.min(s.maxSamples,P.samples)}function ct(P){const w=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function xt(P){const w=o.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function Yt(P,w){const V=P.colorSpace,tt=P.format,$=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==Cs&&V!==ri&&(ae.getTransfer(V)===de?(tt!==wn||$!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),w}function ne(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=k,this.setTexture2D=R,this.setTexture2DArray=b,this.setTexture3D=N,this.setTextureCube=D,this.rebindTextures=Vt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=qt,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=kt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=ct}function sv(i,t){function e(n,s=ri){let r;const o=ae.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===sl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===rl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Wu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Xu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hu)return i.BYTE;if(n===Vu)return i.SHORT;if(n===lr)return i.UNSIGNED_SHORT;if(n===il)return i.INT;if(n===Li)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===wr)return i.HALF_FLOAT;if(n===qu)return i.ALPHA;if(n===Yu)return i.RGB;if(n===wn)return i.RGBA;if(n===ur)return i.DEPTH_COMPONENT;if(n===fr)return i.DEPTH_STENCIL;if(n===ol)return i.RED;if(n===al)return i.RED_INTEGER;if(n===Zu)return i.RG;if(n===cl)return i.RG_INTEGER;if(n===ll)return i.RGBA_INTEGER;if(n===ho||n===uo||n===fo||n===po)if(o===de)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ho)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ho)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ac||n===cc||n===lc||n===hc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ac)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===cc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===hc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===uc||n===fc||n===dc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===uc||n===fc)return o===de?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===dc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===pc||n===mc||n===gc||n===xc||n===_c||n===vc||n===Mc||n===yc||n===Sc||n===wc||n===bc||n===Ec||n===Tc||n===Ac)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===pc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_c)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===yc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===wc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ec)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Tc)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ac)return o===de?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rc||n===Cc||n===Pc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Rc)return o===de?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Cc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Pc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zc||n===Dc||n===Ic||n===Lc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===zc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ic)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===hr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const rv=`
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

}`;class av{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new df(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new di({vertexShader:rv,fragmentShader:ov,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ie(new br(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class cv extends Ls{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new av,d={},M=e.getContextAttributes();let v=null,_=null;const y=[],E=[],C=new Et;let L=null;const S=new yn;S.viewport=new Te;const T=new yn;T.viewport=new Te;const U=[S,T],k=new Tm;let B=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let Q=y[Z];return Q===void 0&&(Q=new xa,y[Z]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(Z){let Q=y[Z];return Q===void 0&&(Q=new xa,y[Z]=Q),Q.getGripSpace()},this.getHand=function(Z){let Q=y[Z];return Q===void 0&&(Q=new xa,y[Z]=Q),Q.getHandSpace()};function R(Z){const Q=E.indexOf(Z.inputSource);if(Q===-1)return;const ot=y[Q];ot!==void 0&&(ot.update(Z.inputSource,Z.frame,l||o),ot.dispatchEvent({type:Z.type,data:Z.inputSource}))}function b(){s.removeEventListener("select",R),s.removeEventListener("selectstart",R),s.removeEventListener("selectend",R),s.removeEventListener("squeeze",R),s.removeEventListener("squeezestart",R),s.removeEventListener("squeezeend",R),s.removeEventListener("end",b),s.removeEventListener("inputsourceschange",N);for(let Z=0;Z<y.length;Z++){const Q=E[Z];Q!==null&&(E[Z]=null,y[Z].disconnect(Q))}B=null,W=null,m.reset();for(const Z in d)delete d[Z];t.setRenderTarget(v),p=null,f=null,u=null,s=null,_=null,Tt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",R),s.addEventListener("selectstart",R),s.addEventListener("selectend",R),s.addEventListener("squeeze",R),s.addEventListener("squeezestart",R),s.addEventListener("squeezeend",R),s.addEventListener("end",b),s.addEventListener("inputsourceschange",N),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,pt=null,dt=null;M.depth&&(dt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=M.stencil?fr:ur,pt=M.stencil?hr:Li);const kt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(kt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new Ui(f.textureWidth,f.textureHeight,{format:wn,type:Ln,depthTexture:new ff(f.textureWidth,f.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ot={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Ui(p.framebufferWidth,p.framebufferHeight,{format:wn,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Tt.setContext(s),Tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function N(Z){for(let Q=0;Q<Z.removed.length;Q++){const ot=Z.removed[Q],pt=E.indexOf(ot);pt>=0&&(E[pt]=null,y[pt].disconnect(ot))}for(let Q=0;Q<Z.added.length;Q++){const ot=Z.added[Q];let pt=E.indexOf(ot);if(pt===-1){for(let kt=0;kt<y.length;kt++)if(kt>=E.length){E.push(ot),pt=kt;break}else if(E[kt]===null){E[kt]=ot,pt=kt;break}if(pt===-1)break}const dt=y[pt];dt&&dt.connect(ot)}}const D=new z,Y=new z;function q(Z,Q,ot){D.setFromMatrixPosition(Q.matrixWorld),Y.setFromMatrixPosition(ot.matrixWorld);const pt=D.distanceTo(Y),dt=Q.projectionMatrix.elements,kt=ot.projectionMatrix.elements,Vt=dt[14]/(dt[10]-1),I=dt[14]/(dt[10]+1),qt=(dt[9]+1)/dt[5],et=(dt[9]-1)/dt[5],rt=(dt[8]-1)/dt[0],st=(kt[8]+1)/kt[0],It=Vt*rt,ct=Vt*st,xt=pt/(-rt+st),Yt=xt*-rt;if(Q.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Yt),Z.translateZ(xt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),dt[10]===-1)Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const ne=Vt+xt,P=I+xt,w=It-Yt,V=ct+(pt-Yt),tt=qt*I/P*ne,$=et*I/P*ne;Z.projectionMatrix.makePerspective(w,V,tt,$,ne,P),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function F(Z,Q){Q===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(Q.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let Q=Z.near,ot=Z.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(ot=m.depthFar)),k.near=T.near=S.near=Q,k.far=T.far=S.far=ot,(B!==k.near||W!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),B=k.near,W=k.far),k.layers.mask=Z.layers.mask|6,S.layers.mask=k.layers.mask&3,T.layers.mask=k.layers.mask&5;const pt=Z.parent,dt=k.cameras;F(k,pt);for(let kt=0;kt<dt.length;kt++)F(dt[kt],pt);dt.length===2?q(k,S,T):k.projectionMatrix.copy(S.projectionMatrix),K(Z,k,pt)};function K(Z,Q,ot){ot===null?Z.matrix.copy(Q.matrixWorld):(Z.matrix.copy(ot.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(Q.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(Q.projectionMatrix),Z.projectionMatrixInverse.copy(Q.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Nc*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Z){c=Z,f!==null&&(f.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function(Z){return d[Z]};let wt=null;function Rt(Z,Q){if(h=Q.getViewerPose(l||o),g=Q,h!==null){const ot=h.views;p!==null&&(t.setRenderTargetFramebuffer(_,p.framebuffer),t.setRenderTarget(_));let pt=!1;ot.length!==k.cameras.length&&(k.cameras.length=0,pt=!0);for(let I=0;I<ot.length;I++){const qt=ot[I];let et=null;if(p!==null)et=p.getViewport(qt);else{const st=u.getViewSubImage(f,qt);et=st.viewport,I===0&&(t.setRenderTargetTextures(_,st.colorTexture,st.depthStencilTexture),t.setRenderTarget(_))}let rt=U[I];rt===void 0&&(rt=new yn,rt.layers.enable(I),rt.viewport=new Te,U[I]=rt),rt.matrix.fromArray(qt.transform.matrix),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.projectionMatrix.fromArray(qt.projectionMatrix),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert(),rt.viewport.set(et.x,et.y,et.width,et.height),I===0&&(k.matrix.copy(rt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),pt===!0&&k.cameras.push(rt)}const dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const I=u.getDepthInformation(ot[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(dt&&dt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let I=0;I<ot.length;I++){const qt=ot[I].camera;if(qt){let et=d[qt];et||(et=new df,d[qt]=et);const rt=u.getCameraImage(qt);et.sourceTexture=rt}}}}for(let ot=0;ot<y.length;ot++){const pt=E[ot],dt=y[ot];pt!==null&&dt!==void 0&&dt.update(pt,Q,l||o)}wt&&wt(Z,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Tt=new wf;Tt.setAnimationLoop(Rt),this.setAnimationLoop=function(Z){wt=Z},this.dispose=function(){}}}const Si=new En,lv=new se;function hv(i,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,rf(i)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,M,v,_){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,_)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),x(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,M,v):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===$e&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===$e&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const M=t.get(d),v=M.envMap,_=M.envMapRotation;v&&(m.envMap.value=v,Si.copy(_),Si.x*=-1,Si.y*=-1,Si.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),m.envMapRotation.value.setFromMatrix4(lv.makeRotationFromEuler(Si)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,M,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*M,m.scale.value=v*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,M){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===$e&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function x(m,d){const M=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function uv(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,v){const _=v.program;n.uniformBlockBinding(M,_)}function l(M,v){let _=s[M.id];_===void 0&&(g(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",m));const y=v.program;n.updateUBOMapping(M,y);const E=t.render.frame;r[M.id]!==E&&(f(M),r[M.id]=E)}function h(M){const v=u();M.__bindingPointIndex=v;const _=i.createBuffer(),y=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,y,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const v=s[M.id],_=M.uniforms,y=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,C=_.length;E<C;E++){const L=Array.isArray(_[E])?_[E]:[_[E]];for(let S=0,T=L.length;S<T;S++){const U=L[S];if(p(U,E,S,y)===!0){const k=U.__offset,B=Array.isArray(U.value)?U.value:[U.value];let W=0;for(let R=0;R<B.length;R++){const b=B[R],N=x(b);typeof b=="number"||typeof b=="boolean"?(U.__data[0]=b,i.bufferSubData(i.UNIFORM_BUFFER,k+W,U.__data)):b.isMatrix3?(U.__data[0]=b.elements[0],U.__data[1]=b.elements[1],U.__data[2]=b.elements[2],U.__data[3]=0,U.__data[4]=b.elements[3],U.__data[5]=b.elements[4],U.__data[6]=b.elements[5],U.__data[7]=0,U.__data[8]=b.elements[6],U.__data[9]=b.elements[7],U.__data[10]=b.elements[8],U.__data[11]=0):(b.toArray(U.__data,W),W+=N.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(M,v,_,y){const E=M.value,C=v+"_"+_;if(y[C]===void 0)return typeof E=="number"||typeof E=="boolean"?y[C]=E:y[C]=E.clone(),!0;{const L=y[C];if(typeof E=="number"||typeof E=="boolean"){if(L!==E)return y[C]=E,!0}else if(L.equals(E)===!1)return L.copy(E),!0}return!1}function g(M){const v=M.uniforms;let _=0;const y=16;for(let C=0,L=v.length;C<L;C++){const S=Array.isArray(v[C])?v[C]:[v[C]];for(let T=0,U=S.length;T<U;T++){const k=S[T],B=Array.isArray(k.value)?k.value:[k.value];for(let W=0,R=B.length;W<R;W++){const b=B[W],N=x(b),D=_%y,Y=D%N.boundary,q=D+Y;_+=Y,q!==0&&y-q<N.storage&&(_+=y-q),k.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=N.storage}}}const E=_%y;return E>0&&(_+=y-E),M.__size=_,M.__cache={},this}function x(M){const v={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(v.boundary=4,v.storage=4):M.isVector2?(v.boundary=8,v.storage=8):M.isVector3||M.isColor?(v.boundary=16,v.storage=12):M.isVector4?(v.boundary=16,v.storage=16):M.isMatrix3?(v.boundary=48,v.storage=48):M.isMatrix4?(v.boundary=64,v.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),v}function m(M){const v=M.target;v.removeEventListener("dispose",m);const _=o.indexOf(v.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}class fv{constructor(t={}){const{canvas:e=ap(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,d=null;const M=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let y=!1;this._outputColorSpace=De;let E=0,C=0,L=null,S=-1,T=null;const U=new Te,k=new Te;let B=null;const W=new Ht(0);let R=0,b=e.width,N=e.height,D=1,Y=null,q=null;const F=new Te(0,0,b,N),K=new Te(0,0,b,N);let wt=!1;const Rt=new Io;let Tt=!1,Z=!1;const Q=new se,ot=new z,pt=new Te,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function Vt(){return L===null?D:1}let I=n;function qt(A,G){return e.getContext(A,G)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${nl}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",lt,!1),I===null){const G="webgl2";if(I=qt(G,A),I===null)throw qt(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let et,rt,st,It,ct,xt,Yt,ne,P,w,V,tt,$,X,ft,it,gt,_t,at,mt,Lt,Pt,Mt,Zt;function O(){et=new Sx(I),et.init(),Pt=new sv(I,et),rt=new mx(I,et,t,Pt),st=new nv(I,et),rt.reversedDepthBuffer&&f&&st.buffers.depth.setReversed(!0),It=new Ex(I),ct=new V_,xt=new iv(I,et,st,ct,rt,Pt,It),Yt=new xx(_),ne=new yx(_),P=new zm(I),Mt=new dx(I,P),w=new wx(I,P,It,Mt),V=new Ax(I,w,P,It),at=new Tx(I,rt,xt),it=new gx(ct),tt=new H_(_,Yt,ne,et,rt,Mt,it),$=new hv(_,ct),X=new X_,ft=new J_(et),_t=new fx(_,Yt,ne,st,V,p,c),gt=new tv(_,V,rt),Zt=new uv(I,It,rt,st),mt=new px(I,et,It),Lt=new bx(I,et,It),It.programs=tt.programs,_.capabilities=rt,_.extensions=et,_.properties=ct,_.renderLists=X,_.shadowMap=gt,_.state=st,_.info=It}O();const ut=new cv(_,I);this.xr=ut,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const A=et.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=et.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(A){A!==void 0&&(D=A,this.setSize(b,N,!1))},this.getSize=function(A){return A.set(b,N)},this.setSize=function(A,G,J=!0){if(ut.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}b=A,N=G,e.width=Math.floor(A*D),e.height=Math.floor(G*D),J===!0&&(e.style.width=A+"px",e.style.height=G+"px"),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(b*D,N*D).floor()},this.setDrawingBufferSize=function(A,G,J){b=A,N=G,D=J,e.width=Math.floor(A*J),e.height=Math.floor(G*J),this.setViewport(0,0,A,G)},this.getCurrentViewport=function(A){return A.copy(U)},this.getViewport=function(A){return A.copy(F)},this.setViewport=function(A,G,J,j){A.isVector4?F.set(A.x,A.y,A.z,A.w):F.set(A,G,J,j),st.viewport(U.copy(F).multiplyScalar(D).round())},this.getScissor=function(A){return A.copy(K)},this.setScissor=function(A,G,J,j){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,G,J,j),st.scissor(k.copy(K).multiplyScalar(D).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(A){st.setScissorTest(wt=A)},this.setOpaqueSort=function(A){Y=A},this.setTransparentSort=function(A){q=A},this.getClearColor=function(A){return A.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor(...arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,J=!0){let j=0;if(A){let H=!1;if(L!==null){const ht=L.texture.format;H=ht===ll||ht===cl||ht===al}if(H){const ht=L.texture.type,bt=ht===Ln||ht===Li||ht===lr||ht===hr||ht===sl||ht===rl,zt=_t.getClearColor(),At=_t.getClearAlpha(),Ot=zt.r,Wt=zt.g,Ut=zt.b;bt?(g[0]=Ot,g[1]=Wt,g[2]=Ut,g[3]=At,I.clearBufferuiv(I.COLOR,0,g)):(x[0]=Ot,x[1]=Wt,x[2]=Ut,x[3]=At,I.clearBufferiv(I.COLOR,0,x))}else j|=I.COLOR_BUFFER_BIT}G&&(j|=I.DEPTH_BUFFER_BIT),J&&(j|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",lt,!1),_t.dispose(),X.dispose(),ft.dispose(),ct.dispose(),Yt.dispose(),ne.dispose(),V.dispose(),Mt.dispose(),Zt.dispose(),tt.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",Tn),ut.removeEventListener("sessionend",Nl),mi.stop()};function vt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const A=It.autoReset,G=gt.enabled,J=gt.autoUpdate,j=gt.needsUpdate,H=gt.type;O(),It.autoReset=A,gt.enabled=G,gt.autoUpdate=J,gt.needsUpdate=j,gt.type=H}function lt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function nt(A){const G=A.target;G.removeEventListener("dispose",nt),Dt(G)}function Dt(A){$t(A),ct.remove(A)}function $t(A){const G=ct.get(A).programs;G!==void 0&&(G.forEach(function(J){tt.releaseProgram(J)}),A.isShaderMaterial&&tt.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,J,j,H,ht){G===null&&(G=dt);const bt=H.isMesh&&H.matrixWorld.determinant()<0,zt=td(A,G,J,j,H);st.setMaterial(j,bt);let At=J.index,Ot=1;if(j.wireframe===!0){if(At=w.getWireframeAttribute(J),At===void 0)return;Ot=2}const Wt=J.drawRange,Ut=J.attributes.position;let ee=Wt.start*Ot,fe=(Wt.start+Wt.count)*Ot;ht!==null&&(ee=Math.max(ee,ht.start*Ot),fe=Math.min(fe,(ht.start+ht.count)*Ot)),At!==null?(ee=Math.max(ee,0),fe=Math.min(fe,At.count)):Ut!=null&&(ee=Math.max(ee,0),fe=Math.min(fe,Ut.count));const be=fe-ee;if(be<0||be===1/0)return;Mt.setup(H,j,zt,J,At);let _e,me=mt;if(At!==null&&(_e=P.get(At),me=Lt,me.setIndex(_e)),H.isMesh)j.wireframe===!0?(st.setLineWidth(j.wireframeLinewidth*Vt()),me.setMode(I.LINES)):me.setMode(I.TRIANGLES);else if(H.isLine){let Ft=j.linewidth;Ft===void 0&&(Ft=1),st.setLineWidth(Ft*Vt()),H.isLineSegments?me.setMode(I.LINES):H.isLineLoop?me.setMode(I.LINE_LOOP):me.setMode(I.LINE_STRIP)}else H.isPoints?me.setMode(I.POINTS):H.isSprite&&me.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)dr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),me.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(et.get("WEBGL_multi_draw"))me.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const Ft=H._multiDrawStarts,Me=H._multiDrawCounts,oe=H._multiDrawCount,Ke=At?P.get(At).bytesPerElement:1,Xi=ct.get(j).currentProgram.getUniforms();for(let Je=0;Je<oe;Je++)Xi.setValue(I,"_gl_DrawID",Je),me.render(Ft[Je]/Ke,Me[Je])}else if(H.isInstancedMesh)me.renderInstances(ee,be,H.count);else if(J.isInstancedBufferGeometry){const Ft=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Me=Math.min(J.instanceCount,Ft);me.renderInstances(ee,be,Me)}else me.render(ee,be)};function ge(A,G,J){A.transparent===!0&&A.side===Ce&&A.forceSinglePass===!1?(A.side=$e,A.needsUpdate=!0,Ar(A,G,J),A.side=fi,A.needsUpdate=!0,Ar(A,G,J),A.side=Ce):Ar(A,G,J)}this.compile=function(A,G,J=null){J===null&&(J=A),d=ft.get(J),d.init(G),v.push(d),J.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),A!==J&&A.traverseVisible(function(H){H.isLight&&H.layers.test(G.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),d.setupLights();const j=new Set;return A.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ht=H.material;if(ht)if(Array.isArray(ht))for(let bt=0;bt<ht.length;bt++){const zt=ht[bt];ge(zt,J,H),j.add(zt)}else ge(ht,J,H),j.add(ht)}),d=v.pop(),j},this.compileAsync=function(A,G,J=null){const j=this.compile(A,G,J);return new Promise(H=>{function ht(){if(j.forEach(function(bt){ct.get(bt).currentProgram.isReady()&&j.delete(bt)}),j.size===0){H(A);return}setTimeout(ht,10)}et.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let ue=null;function Fn(A){ue&&ue(A)}function Tn(){mi.stop()}function Nl(){mi.start()}const mi=new wf;mi.setAnimationLoop(Fn),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(A){ue=A,ut.setAnimationLoop(A),A===null?mi.stop():mi.start()},ut.addEventListener("sessionstart",Tn),ut.addEventListener("sessionend",Nl),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(G),G=ut.getCamera()),A.isScene===!0&&A.onBeforeRender(_,A,G,L),d=ft.get(A,v.length),d.init(G),v.push(d),Q.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Rt.setFromProjectionMatrix(Q,zn,G.reversedDepth),Z=this.localClippingEnabled,Tt=it.init(this.clippingPlanes,Z),m=X.get(A,M.length),m.init(),M.push(m),ut.enabled===!0&&ut.isPresenting===!0){const ht=_.xr.getDepthSensingMesh();ht!==null&&qo(ht,G,-1/0,_.sortObjects)}qo(A,G,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(Y,q),kt=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,kt&&_t.addToRenderList(m,A),this.info.render.frame++,Tt===!0&&it.beginShadows();const J=d.state.shadowsArray;gt.render(J,A,G),Tt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,H=m.transmissive;if(d.setupLights(),G.isArrayCamera){const ht=G.cameras;if(H.length>0)for(let bt=0,zt=ht.length;bt<zt;bt++){const At=ht[bt];Ol(j,H,A,At)}kt&&_t.render(A);for(let bt=0,zt=ht.length;bt<zt;bt++){const At=ht[bt];Fl(m,A,At,At.viewport)}}else H.length>0&&Ol(j,H,A,G),kt&&_t.render(A),Fl(m,A,G);L!==null&&C===0&&(xt.updateMultisampleRenderTarget(L),xt.updateRenderTargetMipmap(L)),A.isScene===!0&&A.onAfterRender(_,A,G),Mt.resetDefaultState(),S=-1,T=null,v.pop(),v.length>0?(d=v[v.length-1],Tt===!0&&it.setGlobalState(_.clippingPlanes,d.state.camera)):d=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function qo(A,G,J,j){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)J=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)d.pushLight(A),A.castShadow&&d.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Rt.intersectsSprite(A)){j&&pt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Q);const bt=V.update(A),zt=A.material;zt.visible&&m.push(A,bt,zt,J,pt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Rt.intersectsObject(A))){const bt=V.update(A),zt=A.material;if(j&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),pt.copy(A.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),pt.copy(bt.boundingSphere.center)),pt.applyMatrix4(A.matrixWorld).applyMatrix4(Q)),Array.isArray(zt)){const At=bt.groups;for(let Ot=0,Wt=At.length;Ot<Wt;Ot++){const Ut=At[Ot],ee=zt[Ut.materialIndex];ee&&ee.visible&&m.push(A,bt,ee,J,pt.z,Ut)}}else zt.visible&&m.push(A,bt,zt,J,pt.z,null)}}const ht=A.children;for(let bt=0,zt=ht.length;bt<zt;bt++)qo(ht[bt],G,J,j)}function Fl(A,G,J,j){const H=A.opaque,ht=A.transmissive,bt=A.transparent;d.setupLightsView(J),Tt===!0&&it.setGlobalState(_.clippingPlanes,J),j&&st.viewport(U.copy(j)),H.length>0&&Tr(H,G,J),ht.length>0&&Tr(ht,G,J),bt.length>0&&Tr(bt,G,J),st.buffers.depth.setTest(!0),st.buffers.depth.setMask(!0),st.buffers.color.setMask(!0),st.setPolygonOffset(!1)}function Ol(A,G,J,j){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[j.id]===void 0&&(d.state.transmissionRenderTarget[j.id]=new Ui(1,1,{generateMipmaps:!0,type:et.has("EXT_color_buffer_half_float")||et.has("EXT_color_buffer_float")?wr:Ln,minFilter:Ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const ht=d.state.transmissionRenderTarget[j.id],bt=j.viewport||U;ht.setSize(bt.z*_.transmissionResolutionScale,bt.w*_.transmissionResolutionScale);const zt=_.getRenderTarget(),At=_.getActiveCubeFace(),Ot=_.getActiveMipmapLevel();_.setRenderTarget(ht),_.getClearColor(W),R=_.getClearAlpha(),R<1&&_.setClearColor(16777215,.5),_.clear(),kt&&_t.render(J);const Wt=_.toneMapping;_.toneMapping=li;const Ut=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),d.setupLightsView(j),Tt===!0&&it.setGlobalState(_.clippingPlanes,j),Tr(A,J,j),xt.updateMultisampleRenderTarget(ht),xt.updateRenderTargetMipmap(ht),et.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let fe=0,be=G.length;fe<be;fe++){const _e=G[fe],me=_e.object,Ft=_e.geometry,Me=_e.material,oe=_e.group;if(Me.side===Ce&&me.layers.test(j.layers)){const Ke=Me.side;Me.side=$e,Me.needsUpdate=!0,Bl(me,J,j,Ft,Me,oe),Me.side=Ke,Me.needsUpdate=!0,ee=!0}}ee===!0&&(xt.updateMultisampleRenderTarget(ht),xt.updateRenderTargetMipmap(ht))}_.setRenderTarget(zt,At,Ot),_.setClearColor(W,R),Ut!==void 0&&(j.viewport=Ut),_.toneMapping=Wt}function Tr(A,G,J){const j=G.isScene===!0?G.overrideMaterial:null;for(let H=0,ht=A.length;H<ht;H++){const bt=A[H],zt=bt.object,At=bt.geometry,Ot=bt.group;let Wt=bt.material;Wt.allowOverride===!0&&j!==null&&(Wt=j),zt.layers.test(J.layers)&&Bl(zt,G,J,At,Wt,Ot)}}function Bl(A,G,J,j,H,ht){A.onBeforeRender(_,G,J,j,H,ht),A.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),H.onBeforeRender(_,G,J,j,A,ht),H.transparent===!0&&H.side===Ce&&H.forceSinglePass===!1?(H.side=$e,H.needsUpdate=!0,_.renderBufferDirect(J,G,j,H,A,ht),H.side=fi,H.needsUpdate=!0,_.renderBufferDirect(J,G,j,H,A,ht),H.side=Ce):_.renderBufferDirect(J,G,j,H,A,ht),A.onAfterRender(_,G,J,j,H,ht)}function Ar(A,G,J){G.isScene!==!0&&(G=dt);const j=ct.get(A),H=d.state.lights,ht=d.state.shadowsArray,bt=H.state.version,zt=tt.getParameters(A,H.state,ht,G,J),At=tt.getProgramCacheKey(zt);let Ot=j.programs;j.environment=A.isMeshStandardMaterial?G.environment:null,j.fog=G.fog,j.envMap=(A.isMeshStandardMaterial?ne:Yt).get(A.envMap||j.environment),j.envMapRotation=j.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Ot===void 0&&(A.addEventListener("dispose",nt),Ot=new Map,j.programs=Ot);let Wt=Ot.get(At);if(Wt!==void 0){if(j.currentProgram===Wt&&j.lightsStateVersion===bt)return Gl(A,zt),Wt}else zt.uniforms=tt.getUniforms(A),A.onBeforeCompile(zt,_),Wt=tt.acquireProgram(zt,At),Ot.set(At,Wt),j.uniforms=zt.uniforms;const Ut=j.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ut.clippingPlanes=it.uniform),Gl(A,zt),j.needsLights=nd(A),j.lightsStateVersion=bt,j.needsLights&&(Ut.ambientLightColor.value=H.state.ambient,Ut.lightProbe.value=H.state.probe,Ut.directionalLights.value=H.state.directional,Ut.directionalLightShadows.value=H.state.directionalShadow,Ut.spotLights.value=H.state.spot,Ut.spotLightShadows.value=H.state.spotShadow,Ut.rectAreaLights.value=H.state.rectArea,Ut.ltc_1.value=H.state.rectAreaLTC1,Ut.ltc_2.value=H.state.rectAreaLTC2,Ut.pointLights.value=H.state.point,Ut.pointLightShadows.value=H.state.pointShadow,Ut.hemisphereLights.value=H.state.hemi,Ut.directionalShadowMap.value=H.state.directionalShadowMap,Ut.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Ut.spotShadowMap.value=H.state.spotShadowMap,Ut.spotLightMatrix.value=H.state.spotLightMatrix,Ut.spotLightMap.value=H.state.spotLightMap,Ut.pointShadowMap.value=H.state.pointShadowMap,Ut.pointShadowMatrix.value=H.state.pointShadowMatrix),j.currentProgram=Wt,j.uniformsList=null,Wt}function kl(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=mo.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Gl(A,G){const J=ct.get(A);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function td(A,G,J,j,H){G.isScene!==!0&&(G=dt),xt.resetTextureUnits();const ht=G.fog,bt=j.isMeshStandardMaterial?G.environment:null,zt=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Cs,At=(j.isMeshStandardMaterial?ne:Yt).get(j.envMap||bt),Ot=j.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Wt=!!J.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ut=!!J.morphAttributes.position,ee=!!J.morphAttributes.normal,fe=!!J.morphAttributes.color;let be=li;j.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(be=_.toneMapping);const _e=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,me=_e!==void 0?_e.length:0,Ft=ct.get(j),Me=d.state.lights;if(Tt===!0&&(Z===!0||A!==T)){const Ve=A===T&&j.id===S;it.setState(j,A,Ve)}let oe=!1;j.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==Me.state.version||Ft.outputColorSpace!==zt||H.isBatchedMesh&&Ft.batching===!1||!H.isBatchedMesh&&Ft.batching===!0||H.isBatchedMesh&&Ft.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Ft.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Ft.instancing===!1||!H.isInstancedMesh&&Ft.instancing===!0||H.isSkinnedMesh&&Ft.skinning===!1||!H.isSkinnedMesh&&Ft.skinning===!0||H.isInstancedMesh&&Ft.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Ft.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Ft.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Ft.instancingMorph===!1&&H.morphTexture!==null||Ft.envMap!==At||j.fog===!0&&Ft.fog!==ht||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==it.numPlanes||Ft.numIntersection!==it.numIntersection)||Ft.vertexAlphas!==Ot||Ft.vertexTangents!==Wt||Ft.morphTargets!==Ut||Ft.morphNormals!==ee||Ft.morphColors!==fe||Ft.toneMapping!==be||Ft.morphTargetsCount!==me)&&(oe=!0):(oe=!0,Ft.__version=j.version);let Ke=Ft.currentProgram;oe===!0&&(Ke=Ar(j,G,H));let Xi=!1,Je=!1,Fs=!1;const ye=Ke.getUniforms(),ln=Ft.uniforms;if(st.useProgram(Ke.program)&&(Xi=!0,Je=!0,Fs=!0),j.id!==S&&(S=j.id,Je=!0),Xi||T!==A){st.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),ye.setValue(I,"projectionMatrix",A.projectionMatrix),ye.setValue(I,"viewMatrix",A.matrixWorldInverse);const Ze=ye.map.cameraPosition;Ze!==void 0&&Ze.setValue(I,ot.setFromMatrixPosition(A.matrixWorld)),rt.logarithmicDepthBuffer&&ye.setValue(I,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ye.setValue(I,"isOrthographic",A.isOrthographicCamera===!0),T!==A&&(T=A,Je=!0,Fs=!0)}if(H.isSkinnedMesh){ye.setOptional(I,H,"bindMatrix"),ye.setOptional(I,H,"bindMatrixInverse");const Ve=H.skeleton;Ve&&(Ve.boneTexture===null&&Ve.computeBoneTexture(),ye.setValue(I,"boneTexture",Ve.boneTexture,xt))}H.isBatchedMesh&&(ye.setOptional(I,H,"batchingTexture"),ye.setValue(I,"batchingTexture",H._matricesTexture,xt),ye.setOptional(I,H,"batchingIdTexture"),ye.setValue(I,"batchingIdTexture",H._indirectTexture,xt),ye.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&ye.setValue(I,"batchingColorTexture",H._colorsTexture,xt));const hn=J.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0)&&at.update(H,J,Ke),(Je||Ft.receiveShadow!==H.receiveShadow)&&(Ft.receiveShadow=H.receiveShadow,ye.setValue(I,"receiveShadow",H.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(ln.envMap.value=At,ln.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&G.environment!==null&&(ln.envMapIntensity.value=G.environmentIntensity),Je&&(ye.setValue(I,"toneMappingExposure",_.toneMappingExposure),Ft.needsLights&&ed(ln,Fs),ht&&j.fog===!0&&$.refreshFogUniforms(ln,ht),$.refreshMaterialUniforms(ln,j,D,N,d.state.transmissionRenderTarget[A.id]),mo.upload(I,kl(Ft),ln,xt)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(mo.upload(I,kl(Ft),ln,xt),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ye.setValue(I,"center",H.center),ye.setValue(I,"modelViewMatrix",H.modelViewMatrix),ye.setValue(I,"normalMatrix",H.normalMatrix),ye.setValue(I,"modelMatrix",H.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const Ve=j.uniformsGroups;for(let Ze=0,Yo=Ve.length;Ze<Yo;Ze++){const gi=Ve[Ze];Zt.update(gi,Ke),Zt.bind(gi,Ke)}}return Ke}function ed(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function nd(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,G,J){const j=ct.get(A);j.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),ct.get(A.texture).__webglTexture=G,ct.get(A.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:J,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const J=ct.get(A);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0};const id=I.createFramebuffer();this.setRenderTarget=function(A,G=0,J=0){L=A,E=G,C=J;let j=!0,H=null,ht=!1,bt=!1;if(A){const At=ct.get(A);if(At.__useDefaultFramebuffer!==void 0)st.bindFramebuffer(I.FRAMEBUFFER,null),j=!1;else if(At.__webglFramebuffer===void 0)xt.setupRenderTarget(A);else if(At.__hasExternalTextures)xt.rebindTextures(A,ct.get(A.texture).__webglTexture,ct.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ut=A.depthTexture;if(At.__boundDepthTexture!==Ut){if(Ut!==null&&ct.has(Ut)&&(A.width!==Ut.image.width||A.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");xt.setupDepthRenderbuffer(A)}}const Ot=A.texture;(Ot.isData3DTexture||Ot.isDataArrayTexture||Ot.isCompressedArrayTexture)&&(bt=!0);const Wt=ct.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Wt[G])?H=Wt[G][J]:H=Wt[G],ht=!0):A.samples>0&&xt.useMultisampledRTT(A)===!1?H=ct.get(A).__webglMultisampledFramebuffer:Array.isArray(Wt)?H=Wt[J]:H=Wt,U.copy(A.viewport),k.copy(A.scissor),B=A.scissorTest}else U.copy(F).multiplyScalar(D).floor(),k.copy(K).multiplyScalar(D).floor(),B=wt;if(J!==0&&(H=id),st.bindFramebuffer(I.FRAMEBUFFER,H)&&j&&st.drawBuffers(A,H),st.viewport(U),st.scissor(k),st.setScissorTest(B),ht){const At=ct.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+G,At.__webglTexture,J)}else if(bt){const At=G;for(let Ot=0;Ot<A.textures.length;Ot++){const Wt=ct.get(A.textures[Ot]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ot,Wt.__webglTexture,J,At)}}else if(A!==null&&J!==0){const At=ct.get(A.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,At.__webglTexture,J)}S=-1},this.readRenderTargetPixels=function(A,G,J,j,H,ht,bt,zt=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=ct.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&bt!==void 0&&(At=At[bt]),At){st.bindFramebuffer(I.FRAMEBUFFER,At);try{const Ot=A.textures[zt],Wt=Ot.format,Ut=Ot.type;if(!rt.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-j&&J>=0&&J<=A.height-H&&(A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+zt),I.readPixels(G,J,j,H,Pt.convert(Wt),Pt.convert(Ut),ht))}finally{const Ot=L!==null?ct.get(L).__webglFramebuffer:null;st.bindFramebuffer(I.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(A,G,J,j,H,ht,bt,zt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=ct.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&bt!==void 0&&(At=At[bt]),At)if(G>=0&&G<=A.width-j&&J>=0&&J<=A.height-H){st.bindFramebuffer(I.FRAMEBUFFER,At);const Ot=A.textures[zt],Wt=Ot.format,Ut=Ot.type;if(!rt.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable(Ut))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ee=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ee),I.bufferData(I.PIXEL_PACK_BUFFER,ht.byteLength,I.STREAM_READ),A.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+zt),I.readPixels(G,J,j,H,Pt.convert(Wt),Pt.convert(Ut),0);const fe=L!==null?ct.get(L).__webglFramebuffer:null;st.bindFramebuffer(I.FRAMEBUFFER,fe);const be=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await cp(I,be,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ee),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ht),I.deleteBuffer(ee),I.deleteSync(be),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,J=0){const j=Math.pow(2,-J),H=Math.floor(A.image.width*j),ht=Math.floor(A.image.height*j),bt=G!==null?G.x:0,zt=G!==null?G.y:0;xt.setTexture2D(A,0),I.copyTexSubImage2D(I.TEXTURE_2D,J,0,0,bt,zt,H,ht),st.unbindTexture()};const sd=I.createFramebuffer(),rd=I.createFramebuffer();this.copyTextureToTexture=function(A,G,J=null,j=null,H=0,ht=null){ht===null&&(H!==0?(dr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=H,H=0):ht=0);let bt,zt,At,Ot,Wt,Ut,ee,fe,be;const _e=A.isCompressedTexture?A.mipmaps[ht]:A.image;if(J!==null)bt=J.max.x-J.min.x,zt=J.max.y-J.min.y,At=J.isBox3?J.max.z-J.min.z:1,Ot=J.min.x,Wt=J.min.y,Ut=J.isBox3?J.min.z:0;else{const hn=Math.pow(2,-H);bt=Math.floor(_e.width*hn),zt=Math.floor(_e.height*hn),A.isDataArrayTexture?At=_e.depth:A.isData3DTexture?At=Math.floor(_e.depth*hn):At=1,Ot=0,Wt=0,Ut=0}j!==null?(ee=j.x,fe=j.y,be=j.z):(ee=0,fe=0,be=0);const me=Pt.convert(G.format),Ft=Pt.convert(G.type);let Me;G.isData3DTexture?(xt.setTexture3D(G,0),Me=I.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(xt.setTexture2DArray(G,0),Me=I.TEXTURE_2D_ARRAY):(xt.setTexture2D(G,0),Me=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,G.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,G.unpackAlignment);const oe=I.getParameter(I.UNPACK_ROW_LENGTH),Ke=I.getParameter(I.UNPACK_IMAGE_HEIGHT),Xi=I.getParameter(I.UNPACK_SKIP_PIXELS),Je=I.getParameter(I.UNPACK_SKIP_ROWS),Fs=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,_e.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,_e.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ot),I.pixelStorei(I.UNPACK_SKIP_ROWS,Wt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ut);const ye=A.isDataArrayTexture||A.isData3DTexture,ln=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const hn=ct.get(A),Ve=ct.get(G),Ze=ct.get(hn.__renderTarget),Yo=ct.get(Ve.__renderTarget);st.bindFramebuffer(I.READ_FRAMEBUFFER,Ze.__webglFramebuffer),st.bindFramebuffer(I.DRAW_FRAMEBUFFER,Yo.__webglFramebuffer);for(let gi=0;gi<At;gi++)ye&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ct.get(A).__webglTexture,H,Ut+gi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,ct.get(G).__webglTexture,ht,be+gi)),I.blitFramebuffer(Ot,Wt,bt,zt,ee,fe,bt,zt,I.DEPTH_BUFFER_BIT,I.NEAREST);st.bindFramebuffer(I.READ_FRAMEBUFFER,null),st.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||A.isRenderTargetTexture||ct.has(A)){const hn=ct.get(A),Ve=ct.get(G);st.bindFramebuffer(I.READ_FRAMEBUFFER,sd),st.bindFramebuffer(I.DRAW_FRAMEBUFFER,rd);for(let Ze=0;Ze<At;Ze++)ye?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,hn.__webglTexture,H,Ut+Ze):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,hn.__webglTexture,H),ln?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ve.__webglTexture,ht,be+Ze):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ve.__webglTexture,ht),H!==0?I.blitFramebuffer(Ot,Wt,bt,zt,ee,fe,bt,zt,I.COLOR_BUFFER_BIT,I.NEAREST):ln?I.copyTexSubImage3D(Me,ht,ee,fe,be+Ze,Ot,Wt,bt,zt):I.copyTexSubImage2D(Me,ht,ee,fe,Ot,Wt,bt,zt);st.bindFramebuffer(I.READ_FRAMEBUFFER,null),st.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else ln?A.isDataTexture||A.isData3DTexture?I.texSubImage3D(Me,ht,ee,fe,be,bt,zt,At,me,Ft,_e.data):G.isCompressedArrayTexture?I.compressedTexSubImage3D(Me,ht,ee,fe,be,bt,zt,At,me,_e.data):I.texSubImage3D(Me,ht,ee,fe,be,bt,zt,At,me,Ft,_e):A.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ht,ee,fe,bt,zt,me,Ft,_e.data):A.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ht,ee,fe,_e.width,_e.height,me,_e.data):I.texSubImage2D(I.TEXTURE_2D,ht,ee,fe,bt,zt,me,Ft,_e);I.pixelStorei(I.UNPACK_ROW_LENGTH,oe),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ke),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Xi),I.pixelStorei(I.UNPACK_SKIP_ROWS,Je),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Fs),ht===0&&G.generateMipmaps&&I.generateMipmap(Me),st.unbindTexture()},this.initRenderTarget=function(A){ct.get(A).__webglFramebuffer===void 0&&xt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?xt.setTextureCube(A,0):A.isData3DTexture?xt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?xt.setTexture2DArray(A,0):xt.setTexture2D(A,0),st.unbindTexture()},this.resetState=function(){E=0,C=0,L=null,st.reset(),Mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}function dv(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}function go(i,t){return Math.hypot(i.x-t.x,i.z-t.z)}function Rf(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Math.max(0,Math.min(1,((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1)));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function su(i,t){let e=1/0;for(let n=1;n<(t||[]).length;n++)e=Math.min(e,Rf(i,t[n-1],t[n]));return e}function ru(i,t,e=.8){const n=i.bounds,s=i.target,r=i.spawn;return!(t.x<n.minX+2||t.x>n.maxX-2||t.z<n.minZ+2||t.z>n.maxZ-2||!he(i,t.x,t.z,e)||r&&go(t,r)<14||s&&go(t,s)<(s.radius||5)+11||(i.roads||[]).some(o=>su(t,o.points)<(o.width||4)/2+2.8)||(i.rivers||[]).some(o=>su(t,o.points)<o.width/2+1.4)||(i.obstacles||[]).some(o=>go(t,o)<(o.radius||1)+2.1)||(i.fenceSegments||[]).some(o=>Rf(t,o.a,o.b)<2.8))}function pv(i,{seed:t=(i.seed||42)+93371,maxClusters:e}={}){const n=i.bounds,s=(n.maxX-n.minX)*(n.maxZ-n.minZ),r=Math.max(3,Math.min(24,Math.ceil(s/1600))),o=Math.max(0,Math.min(32,Math.floor(e??r))),a=dv(t),c=[],l=[];for(let h=0;h<o*90&&l.length<o;h++){const u={x:n.minX+2+a()*(n.maxX-n.minX-4),z:n.minZ+2+a()*(n.maxZ-n.minZ-4)};if(!ru(i,u,.85)||l.some(x=>go(u,x)<5.5))continue;const f=3+Math.floor(a()*3),p=l.length,g=[];for(let x=0;x<f;x++){const m=a()*Math.PI*2,d=x===0?0:.55+a()*1.25,M={x:u.x+Math.cos(m)*d,z:u.z+Math.sin(m)*d};ru(i,M,.55)&&g.push({x:M.x,z:M.z,variant:Math.floor(a()*3),scale:.66+a()*.48,cluster:p})}g.length<2||(l.push(u),c.push(...g))}return c}const mv="#9ceeff",gv="#39bfe8",xv="#ff7062",_v="#ff241b";function Da(i,t){const n=(i?.userData?.parts||i)?.tailLight?.material;if(!n)return!1;const s=t?xv:mv,r=t?_v:gv;return n.color?.set&&n.color.set(s),n.emissive?.set&&n.emissive.set(r),n.emissiveIntensity=t?1.9:1.25,!0}const vv=[{id:"speed",name:"Turbo paws",icon:"paw",costs:[80,120,200],unlockLevels:[2,6,11],description:"Circle a roaming flock faster with upgraded paw motors.",tierNames:["Quick paws","Trail runner","Meadow racer"],tierDescriptions:["+1.8 m/s running speed","+2.7 m/s running speed","+3.5 m/s running speed"]},{id:"flock",name:"Friendly signal",icon:"signal",costs:[120,180,260],unlockLevels:[7,10,15],description:"Reach more robots with a wider herding signal.",tierNames:["Clear signal","Pasture beacon","Far-field beacon"],tierDescriptions:["+2 m herding range","+3 m herding range","+4 m herding range"]},{id:"drone",name:"Scout drone",icon:"drone",costs:[200,360,540],unlockLevels:[10,14,18],description:"A hovering helper keeps the main herd together while you lead the way.",tierNames:["Scout","Shepherd scout","Flock captain"],tierDescriptions:["Keeps the main herd together; holds when you leave","33% stronger drone support","67% stronger drone support"]},{id:"helper",name:"Buddy dog",icon:"dog",costs:[600,850,1200],unlockLevels:[20,24,28],description:"Herds from the rear, supports split flocks, and learns to retrieve strays.",tierNames:["Farm friend","Trail partner","Senior shepherd"],tierDescriptions:["Herds from behind in the flock’s direction of travel","Guides the smaller flock and passages; barks autonomously","Also retrieves wanderers and bolters to the nearest flock"]},{id:"bark",name:"Happy bark",icon:"bark",costs:[100,160,240],unlockLevels:[4,8,13],description:"A stronger bark gives wandering robots a cheerful nudge.",tierNames:["Bright bark","Resonant bark","Meadow chorus"],tierDescriptions:["+0.25 bark strength","+0.45 bark strength","+0.65 bark strength"]},{id:"cohesion",name:"Flock harmony",icon:"harmony",costs:[160,220,320],unlockLevels:[12,14,15],description:"Robots regroup more readily when the flock stretches across a meadow.",tierNames:["Stay together","Close companions","Perfect formation"],tierDescriptions:["12% stronger regrouping","23% stronger regrouping","35% stronger regrouping"]}],Fo=Object.freeze(vv.map(i=>Object.freeze({...i,cost:i.costs[0],maxLevel:i.costs.length,costs:Object.freeze(i.costs),unlockLevels:Object.freeze(i.unlockLevels),tierNames:Object.freeze(i.tierNames),tierDescriptions:Object.freeze(i.tierDescriptions)}))),Er=i=>Fo.find(t=>t.id===i);function Jn(i,t){const e=Er(t);if(!e||!i||typeof i!="object")return 0;const n=Object.hasOwn(i,t)?i[t]:void 0;return n===!0?1:Number.isInteger(n)&&n>0?Math.min(n,e.maxLevel):0}function xl(i,t){const e=Er(t);return e?e.costs[Jn(i,t)]??null:null}function Cf(i){const t={};for(const e of Fo){const n=Jn(i,e.id);n&&(t[e.id]=n)}return t}function Pf(i,t){return Er(t)?.unlockLevels[Jn(i,t)]??null}function _l(i){if(typeof i=="number")return Number.isInteger(i)?Math.max(1,Math.min(100,i)):1;const t=i;if(!t||typeof t!="object")return 1;const e=Number.isInteger(t.highestLevel)&&t.highestLevel>=0?Math.min(99,t.highestLevel):0,s=(Array.isArray(t.completedLevels)?t.completedLevels:[]).reduce((r,o)=>Number.isInteger(o)&&o>=0&&o<=99?Math.max(r,Math.min(100,o+2)):r,1);return Math.max(e+1,s)}function Mv(i,t,e=i){const n=typeof i=="object"?i:null,s=Er(t),r=_l(e),o=Jn(n?.upgrades,t),a=xl(n?.upgrades,t),c=Pf(n?.upgrades,t),l=s?a===null?"owned":r<c?"locked":n&&(!Number.isFinite(n.points)||n.points<a)?"points":null:"unknown";return{available:l===null,reason:l,level:o,nextLevel:a===null?null:o+1,cost:a,unlockLevel:c,currentLevelNumber:r}}function zf(i,t=1){const e=_l(t),n={};for(const s of Fo){const r=Jn(i,s.id),o=s.unlockLevels.filter(c=>c<=e).length,a=Math.min(r,o);a&&(n[s.id]=a)}return n}function yv(i,t,e=i){const n=Er(t);if(!n)return{ok:!1,reason:"unknown"};if(!i||typeof i!="object")return{ok:!1,reason:"points"};const s=Jn(i.upgrades,t),r=xl(i.upgrades,t);if(r===null)return{ok:!1,reason:"owned"};const o=Pf(i.upgrades,t);return _l(e)<o?{ok:!1,reason:"locked",unlockLevel:o}:!Number.isFinite(i.points)||i.points<r?{ok:!1,reason:"points"}:(i.points-=r,i.upgrades={...Cf(i.upgrades),[t]:s+1},{ok:!0,upgrade:n,level:s+1,cost:r})}function Sv(i,t=1){const e=zf(i,t),n=r=>Jn(e,r);return{speedBoost:[0,1.8,2.7,3.5][n("speed")],signalBoost:[0,2,3,4][n("flock")],barkBoost:[0,.25,.45,.65][n("bark")],cohesionBoost:[0,.12,.23,.35][n("cohesion")],droneStrength:[0,.7,.93,1.17][n("drone")],helperStrength:[0,1,1.3,1.58][n("helper")],drone:n("drone")>0,helper:n("helper")>0,helperTier:n("helper")}}const ze=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z);function Df(i,t,e,n=.6){if(!he(i,e.x,e.z,n)){let s=null,r=1/0;for(const o of[.6,1.2,1.8,2.4,3.2,4.5,6]){for(let a=0;a<24;a++){const c=a*Math.PI/12,l={x:e.x+Math.cos(c)*o,z:e.z+Math.sin(c)*o},h=o+ze(t,l)*.015;h<r&&he(i,l.x,l.z,n+.08)&&(s=l,r=h)}if(s)break}if(!s)return null;e=s}return e}function hi(i,t,e,n=.6){if(e=Df(i,t,e,n),!e)return{x:t.x,z:t.z};let s=el(i,t,e,n);le({...i,obstacles:[]},t,e,n)&&(s=e);const r=t.buddyNavigation;if(r&&ze(r.goal,s)<3&&i.time<r.until){for(;r.path.length&&ze(t,r.path[0])<.45;)r.path.shift();if(r.path.length&&le(i,t,r.path[0],n))return r.path[0]}if(le(i,t,s,n))return delete t.buddyNavigation,s;const o=(i.obstacles||[]).filter(f=>ze(t,f)<Math.min(24,ze(t,s)+6)&&on(f,t,s)<f.radius+n+4).sort((f,p)=>ze(t,f)-ze(t,p)).slice(0,6);if(!o.length)return s;const a=[t,s];for(const f of o){const p=(f.radius+n+.16)/Math.cos(Math.PI/12);for(let g=0;g<12;g++){const x=g*Math.PI/6,m={x:f.x+Math.cos(x)*p,z:f.z+Math.sin(x)*p};he(i,m.x,m.z,n)&&a.push(m)}}const c=a.map(()=>1/0),l=[],h=new Set;c[0]=0;for(let f=0;f<a.length;f++){let p=-1;for(let g=0;g<a.length;g++)!h.has(g)&&(p<0||c[g]<c[p])&&(p=g);if(p<0||!Number.isFinite(c[p])||p===1)break;h.add(p);for(let g=1;g<a.length;g++){if(h.has(g))continue;const x=c[p]+ze(a[p],a[g]);x>=c[g]||!le(i,a[p],a[g],n)||(c[g]=x,l[g]=p)}}if(!Number.isFinite(c[1]))return s;const u=[];for(let f=1;f!==0;f=l[f])u.unshift({x:a[f].x,z:a[f].z});return t.buddyNavigation={goal:{x:s.x,z:s.z},path:u,until:i.time+2},u[0]}const Hc=new WeakMap;function rr(i){delete i.buddyRecovery,Hc.delete(i),delete i.buddyNavigation,delete i.navigationBlocked}function Vc(i,t,e,n,{taskKey:s,active:r=!0,yielding:o=!1}={}){if(!(n>0)||!Number.isFinite(n))return{x:t.x,z:t.z};if(e=Df(i,t,e),!e)return rr(t),{x:t.x,z:t.z};if(!r||o||ze(t,e)<.55)return rr(t),hi(i,t,e);let a=t.buddyRecovery;if((!a||Hc.get(t)!==i||a.lastTime>i.time||a.taskKey!==s||ze(a.goal,e)>6)&&(rr(t),a=t.buddyRecovery={lastTime:i.time,taskKey:s,bestDistance:ze(t,e),goal:{...e},progressGoal:{...e},progressDistance:ze(t,e),progressElapsed:0,anchor:{x:t.x,z:t.z},blocked:0,attempts:0,elapsed:0}),Hc.set(t,i),a.lastTime=i.time,a.elapsed+=n,ze(a.progressGoal,e)>.5||ze(t,e)<a.progressDistance-1e-5?(a.progressGoal={...e},a.progressDistance=ze(t,e),a.progressElapsed=0):a.progressElapsed+=n,a.waitUntil){if(a.elapsed<a.waitUntil)return{x:t.x,z:t.z};delete a.waitUntil,a.attempts=0,a.blocked=0,delete t.buddyNavigation}if(a.escape)if(ze(t,a.escape)<.3||a.elapsed>=a.escapeUntil||!le(i,t,a.escape,.6))delete a.escape,delete t.buddyNavigation,a.blocked=0,a.progressElapsed=0,a.anchor={x:t.x,z:t.z};else return a.escape;if(ze(t,a.anchor)>.3&&(a.anchor={x:t.x,z:t.z},a.blocked=0,ze(t,e)<a.bestDistance-.5&&(a.attempts=0,a.bestDistance=ze(t,e))),a.blocked=t.navigationBlocked?a.blocked+n:Math.max(0,a.blocked-n),a.blocked<1.5&&a.progressElapsed<6)return hi(i,t,e);if(delete t.buddyNavigation,a.attempts>=3)return a.waitUntil=a.elapsed+2,a.blocked=0,{x:t.x,z:t.z};const c=Math.atan2(e.x-t.x,e.z-t.z),l=a.attempts%2?-1:1;a.attempts++,a.blocked=0,a.progressElapsed=0;for(const h of[c+l*Math.PI*.65,c-l*Math.PI*.65,c+Math.PI,c+l*Math.PI/2]){const u={x:t.x+Math.sin(h)*1.8,z:t.z+Math.cos(h)*1.8};if(he(i,u.x,u.z,.68)&&le(i,t,u,.6))return a.escape=u,a.escapeUntil=a.elapsed+2,u}return a.waitUntil=a.elapsed+2,{x:t.x,z:t.z}}const If=(i,t)=>Math.atan2(Math.sin(i-t),Math.cos(i-t));function Oo(i,t,e,n){const s=If(t,i),r=e*n;return i+Math.max(-r,Math.min(r,s))}function _s(i,t,e,n,s){if(!(n>0)||!Number.isFinite(n))return;const r=e.x-t.x,o=e.z-t.z,a=Math.hypot(r,o),c={x:t.x,z:t.z};if(t.navigationBlocked=!1,a>1e-4){const l=Math.atan2(r,o);t.heading=Oo(t.heading??l,l,2.8,n);const h=Math.max(0,Math.cos(If(l,t.heading))),u=5,f=10,p=Math.min(Math.max(0,s),a*u)*h,g=Math.max(0,t.moveSpeed??Math.hypot(t.vx||0,t.vz||0)),x=g+Math.max(-f*n,Math.min(f*n,p-g)),m=Math.min(a,n*x),d=er(i,t,Math.sin(t.heading)*m,Math.cos(t.heading)*m,.6);t.navigationBlocked=d.blockedX||d.blockedZ;const M=Math.hypot(t.x-c.x,t.z-c.z);t.moveSpeed=d.blockedX||d.blockedZ?M/n:x}else t.moveSpeed=Math.max(0,(t.moveSpeed||0)-10*n);t.vx=(t.x-c.x)/n,t.vz=(t.z-c.z)/n}const Nt=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Ci=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:0}},ai=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function vl(i,t,e=(n,s)=>le(i,n,s,.15)){const n=new Set(t),s=[];for(;n.size;){const r=n.values().next().value,o=[r];n.delete(r);for(let a=0;a<o.length;a++)for(const c of n)Nt(o[a],c)<=6.5&&e(o[a],c)&&(o.push(c),n.delete(c));s.push(o)}return s}const Ss=(i,t=[])=>i.filter(e=>t.includes(e.id)).length,Ia=(i,t,e)=>Ss(t,e)-Ss(i,e)||Math.min(...i.map(n=>n.id))-Math.min(...t.map(n=>n.id)),Eo=i=>Ae(i),ws=(i,t,e)=>((i.x-t.x)*Math.sin(t.heading)+(i.z-t.z)*Math.cos(t.heading))*e;function Lf(i,t,e){return!e.length||(t.kind==="goal"?e.every(n=>Sr(i.target,n,Eo(n))):e.every(n=>ws(n,t.bridge,t.sign)>t.bridge.length/2+3))}function wv(i,t){return Nt(t,i.target)<cn(i.target).halfLength+12||(i.rivers||[]).some(e=>e.bridges.some(n=>Nt(t,n)<n.length/2+12))}function bv(i,t,e,n){if(t.passage){const l=t.passage,h=l.kind==="goal"?i.target:l.bridge;if(!Lf(i,l,e)&&Nt(ai(e),h)<(h.length||h.radius||5)+22)return l;delete t.passage}const s=ai(e),r=cn(i.target),o=Nt(i.dog,i.target)<i.target.radius+12||e.some(l=>Nt(l,i.dog)<14&&le(i,l,i.dog,.15));if(o&&Nt(s,i.target)<r.halfLength+12&&!e.every(l=>Sr(i.target,l,Eo(l))))return t.passage={kind:"goal",ids:e.map(l=>l.id)};const a=(i.rivers||[]).flatMap(l=>l.bridges).sort((l,h)=>Nt(l,s)-Nt(h,s));let c=t.forward&&n;if(!c&&o&&(c=Ci(s.x-i.dog.x,s.z-i.dog.z)),!c)return null;for(const l of a){if(Nt(s,l)>l.length/2+12)continue;const h=c.x*Math.sin(l.heading)+c.z*Math.cos(l.heading);if(Math.abs(h)<.25)continue;const u=Math.sign(h);if(!(ws(s,l,u)>l.length/2+1))return t.passage={kind:"bridge",bridge:l,sign:u,ids:e.map(p=>p.id)}}return null}function ou(i,t,e){if(t.kind==="goal")return Uu(i,e);const n=t.bridge,s=n.length/2+4;return{x:n.x+Math.sin(n.heading)*t.sign*s,z:n.z+Math.cos(n.heading)*t.sign*s}}const La=3;function au(i,t){let e=0;for(const s of i.rivers||[])for(const r of s.bridges)Math.abs((t.x-r.x)*Math.cos(r.heading)-(t.z-r.z)*Math.sin(r.heading))<r.width/2+1&&Math.abs(ws(t,r,1))<r.length/2+2&&(e+=15);for(const s of i.gates||[])Nt(t,s)<4&&(e+=15);const n=Uu(i,i.dog);return Nt(t,n)<4&&(e+=15),e}function Ev(i,t,e,n){if(!e.standby||Nt(e.standby,i.dog)>7||Nt(e.standby,i.dog)<2||!he(i,e.standby.x,e.standby.z,.6)){const s=[];Nt(t,i.dog)>=2&&Nt(t,i.dog)<=7&&s.push({x:t.x,z:t.z});for(const o of[3.5,5.5])for(let a=0;a<12;a++){const c=a*Math.PI/6;s.push({x:i.dog.x+Math.sin(c)*o,z:i.dog.z+Math.cos(c)*o})}const r=s.filter(o=>{if(!he(i,o.x,o.z,.68)||!le(i,i.dog,o,.6))return!1;if(le(i,t,o,.6))return!0;const a={x:t.x,z:t.z},c=[];for(let l=0;l<16;l++){if(le(i,a,o,.6))return!0;const h=hi(i,a,o,.6);if(Nt(a,h)<.05||!he(i,h.x,h.z,.6)||!le(i,a,h,.6)||c.some(u=>Nt(u,h)<.1))return!1;c.push({x:a.x,z:a.z}),a.x=h.x,a.z=h.z}return!1});r.sort((o,a)=>au(i,o)-au(i,a)||Nt(t,o)-Nt(t,a)),e.standby=r[0]||{x:t.x,z:t.z}}if(t.desired={...e.standby},Nt(t,e.standby)<.08){t.moveSpeed=0,t.vx=0,t.vz=0;return}_s(i,t,hi(i,t,e.standby,.6),n,4)}function Tv(i,t,e,n,s,r){const o=i.dog,a=Nt(o,n)<La||Nt(o,t)<2.2;if(!a&&(!e.yield||Nt(o,n)>La+1)&&delete e.yield,!a&&!e.yield)return n;const c=e.yield?.side||Math.sign((t.x-o.x)*-s.z+(t.z-o.z)*s.x)||1;e.yield={side:c,since:e.yield?.since??i.time};const l=[];for(const h of[3.5,5,2])for(const u of[c,-c]){const f={x:n.x-s.z*h*u,z:n.z+s.x*h*u};he(i,f.x,f.z,.68)&&le(i,n,f,.6)&&l.push({p:f,side:u,cost:Math.max(0,La-Nt(f,o))*10+h+(u!==c?2:0)})}return l.sort((h,u)=>h.cost-u.cost),l.length?(e.yield.side=l[0].side,l[0].p):r||Nt(o,n)>=1.6||i.time-e.yield.since>1.2?n:{x:t.x,z:t.z}}function Av(i,t,e,n){const s=t.map(l=>l.id),r=(i.flows||[]).sort((l,h)=>Ss(t,h.ids)-Ss(t,l.ids))[0],o=r&&Ss(t,r.ids)>0?r:{ids:s,forward:null};o.ids=s,o.at=n;const a=t.reduce((l,h)=>({x:l.x+(h.vx||0)/t.length,z:l.z+(h.vz||0)/t.length}),{x:0,z:0}),c=Math.hypot(a.x,a.z)>.28;if(c){const l=Ci(a.x,a.z),h=o.forward?Oo(Math.atan2(o.forward.x,o.forward.z),Math.atan2(l.x,l.z),1.8,e):Math.atan2(l.x,l.z);o.forward={x:Math.sin(h),z:Math.cos(h)}}return i.flows=[...(i.flows||[]).filter(l=>l!==o&&n-l.at<5),o],{moving:c,forward:o.forward||{x:0,z:1},measured:o.forward}}const Rv=18,Cv=14;function Pv(i,t,e){const n=ai(e),s={...i,obstacles:[]},r=e.some(u=>le(s,i.dog,u,.6)),o=Math.min(...e.map(u=>Nt(i.dog,u))),a=t.containment,c=a&&Ss(e,a.ids)>0;if(!(!r||o>(c?Cv:Rv)))return delete t.containment,null;const h=c?a:{anchor:{...n},positions:{},acquired:!1,angle:null};h.ids=e.map(u=>u.id);for(const u of e)h.positions[u.id]||={x:u.x,z:u.z};return t.containment=h,h}function zv(i,t,e,n,s,r,o){if(t.mode="contain",t.barking=!1,delete t.forward,!n.acquired){delete n.check,delete n.watchUntil;const f=[...s].sort((m,d)=>Nt(t,m)-Nt(t,d))[0],p=Ci(t.x-f.x,t.z-f.z),g={x:f.x+p.x*4,z:f.z+p.z*4};t.desired=g,t.containmentActivity="approach";const x=Vc(i,t,g,r,{taskKey:o,active:!0});_s(i,t,x,r,7);return}const a=n.anchor,c=Math.max(3,...s.map(f=>Nt(f,a)+Ae(f))),l=c+3.5;if(n.angle??=Math.atan2(t.x-a.x,t.z-a.z),n.watchUntil>i.time){t.desired={x:t.x,z:t.z},_s(i,t,t.desired,r,0),t.heading=Oo(t.heading??0,Math.atan2(a.x-t.x,a.z-t.z),1.4,r),t.containmentActivity="watch";return}if(n.check&&Nt(t,n.check)<.4){n.watchUntil=i.time+4+(n.checkIndex||0)%4,delete n.check,t.containmentActivity="watch",_s(i,t,{x:t.x,z:t.z},r,0);return}if(!n.check){n.checkIndex=(n.checkIndex||0)+1;const p=s.filter(x=>n.positions[x.id]&&Nt(x,n.positions[x.id])>1.2).sort((x,m)=>Nt(m,n.positions[m.id])-Nt(x,n.positions[x.id]))[0],g=p?Math.atan2(p.x-a.x,p.z-a.z):n.angle+(n.checkIndex%2?1:-1)*Math.PI/3;for(let x=0;x<24;x++){const m=g+(x%2?1:-1)*Math.ceil(x/2)*Math.PI/12,d={x:a.x+Math.sin(m)*l,z:a.z+Math.cos(m)*l};if(!he(i,d.x,d.z,.68))continue;const M=hi(i,t,d,.6),v=M.x-t.x,_=M.z-t.z,y=v*v+_*_,E=y?Math.max(0,Math.min(1,((a.x-t.x)*v+(a.z-t.z)*_)/y)):0,C={x:t.x+v*E,z:t.z+_*E};if(!(Nt(t,a)>c+1&&Nt(C,a)<c+1)){n.check=d,n.angle=m,n.checkStarted=i.time;break}}}const h=n.check||{x:t.x,z:t.z};t.containmentActivity="check",t.desired=h;const u=Vc(i,t,h,r,{taskKey:o,active:Nt(t,h)>.5});_s(i,t,u,r,2.6),n.check&&i.time-n.checkStarted>15&&(delete n.check,n.watchUntil=i.time+4)}function Dv(i,t,e,n,s){if(!(n>0)||!e.helper)return{forces:new Map,memberIds:new Set};let r=i.helpers.find(F=>F.type==="helper");r||(r={type:"helper",x:i.dog.x,z:i.dog.z},i.helpers.push(r));const o=i.buddyHerd||={},a=e.helperTier;r.barking=i.time<(r.barkUntil||0);let c=a>=3&&t.find(F=>F.id===o.retrieveId);const l=t.filter(F=>F.id!==c?.id&&!F.wander&&!F.wanderHome),h=l.map(F=>F.id).join(",");(!o.groups||h!==o.signature||i.time-o.checkedAt>=.25)&&(o.allGroups=vl(i,l),o.groups=o.allGroups.filter(F=>F.length>=2),o.signature=h,o.checkedAt=i.time);let u=o.groups;if(!u.length&&a>=2){const F=(o.allGroups||[]).filter(K=>wv(i,K[0])).sort((K,wt)=>Nt(r,K[0])-Nt(r,wt[0]))[0];F&&(u=[F])}u.sort((F,K)=>K.length-F.length||Ia(F,K,o.travelIds));const f=u[0];if(!f)return r.mode="standby",r.clusterIds=[],r.targetId=null,r.barking=!1,o.task!=="standby"&&(r.moveSpeed=0,r.vx=0,r.vz=0,delete r.buddyNavigation,rr(r),delete o.passage,delete o.workHeading,delete o.orbitSide,delete o.yield,delete r.forward),o.task="standby",delete o.containment,delete o.retrieveId,Ev(i,r,o,n),{forces:new Map,memberIds:new Set};o.travelIds=f.map(F=>F.id);const p=F=>[...u].sort((K,wt)=>Nt(F,ai(K))-Nt(F,ai(wt))||Ia(K,wt))[0];c&&p(c).some(K=>Nt(K,c)<=4.5&&le(i,K,c,.15))&&(delete o.retrieveId,c=null),a>=3&&!c&&u.some(F=>F.length>=2)&&(c=t.filter(F=>(F.wander||F.wanderHome)&&!u.some(K=>K.some(wt=>wt.id===F.id))).sort((F,K)=>+!!K.wander?.bolting-+!!F.wander?.bolting||Nt(r,F)-Nt(r,K)||F.id-K.id)[0],c&&(o.retrieveId=c.id)),c||delete o.retrieveId;let g=a>=2?[...u].sort((F,K)=>F.length-K.length||Ia(F,K,r.clusterIds))[0]:f;if(a>=2&&o.passage){const F=t.filter(K=>o.passage.ids.includes(K.id)&&!K.wander&&!K.wanderHome);F.length&&!Lf(i,o.passage,F)&&(g=F)}const x=c?p(c):g,{moving:m,forward:d,measured:M}=Av(o,x,n,i.time);o.forward=M;const v=Pv(i,o,x),_=!v&&!c&&a>=2?bv(i,o,x,d):null;v&&delete o.passage;const y=`${c?"retrieve":v?"contain":_?.kind||"flock"}:${c?.id??x.map(F=>F.id).join(",")}`;o.task!==y&&(delete r.buddyNavigation,rr(r),delete o.standby,delete o.yield,delete o.orbitSide,delete o.workHeading),o.task=y;const E=ai(x);r.clusterIds=x.map(F=>F.id),r.anchor=E,r.targetId=c?.id??null;const C=new Map;if(v){const F=x.some(Z=>Nt(r,Z)<12&&le(i,r,Z,.15)),K=ai(x),wt=Math.max(3,...x.map(Z=>Nt(Z,K)+Ae(Z))),Rt={...i,obstacles:[]},Tt=Nt(r,K)<=wt+8&&x.some(Z=>le(Rt,r,Z,.6));if(v.acquired&&!Tt&&(v.acquired=!1),v.acquired||(v.anchor=K),!v.acquired&&F&&(v.acquired=!0,v.anchor=ai(x),v.positions=Object.fromEntries(x.map(Z=>[Z.id,{x:Z.x,z:Z.z}]))),v.acquired)for(const Z of x)C.set(Z.id,v.positions[Z.id])}if(v&&!c)return zv(i,r,o,v,x,n,y),{forces:new Map,memberIds:new Set,holds:C};let L=E,S=d;if(c){L=c;const F=Ae(c),K=hi(i,c,E,F);S=Ci(K.x-c.x,K.z-c.z)}if(_){L=[...x].sort((K,wt)=>_.kind==="bridge"?ws(K,_.bridge,_.sign)-ws(wt,_.bridge,_.sign):Nt(wt,i.target)-Nt(K,i.target))[0];const F=hi(i,L,ou(i,_,L),Eo(L));S=Ci(F.x-L.x,F.z-L.z)}if(c||_){const F=Math.atan2(S.x,S.z);o.workHeading=Oo(o.workHeading??F,F,1.8,n),S={x:Math.sin(o.workHeading),z:Math.cos(o.workHeading)}}else delete o.workHeading;r.mode=c?"retrieve":_?_.kind:m?"herd":"hold";const T=c||_?0:Math.min(...x.map(F=>(F.x-E.x)*S.x+(F.z-E.z)*S.z)),U=c?{x:(c.vx||0)*.4,z:(c.vz||0)*.4}:{x:0,z:0};let k={x:L.x+S.x*(T-3.2)+U.x,z:L.z+S.z*(T-3.2)+U.z};r.desired=k,r.forward={...S};const B={x:r.x-L.x,z:r.z-L.z};let W=k;if(B.x*S.x+B.z*S.z>-2.5&&Nt(r,L)<8){const F=o.orbitSide||=Math.sign(B.x*-S.z+B.z*S.x)||1;W={x:L.x-S.x*4.5-S.z*F*5+U.x,z:L.z-S.z*4.5+S.x*F*5+U.z}}B.x*S.x+B.z*S.z<-3&&delete o.orbitSide,W=Tv(i,r,o,W,S,_),r.desired=W;const R=Vc(i,r,W,n,{taskKey:y,active:Nt(r,W)>.5,yielding:!!o.yield&&Nt(r,i.dog)<2.2});_s(i,r,R,n,c?9:7);const b=c?[c]:x,N=new Map,D=new Set;if(!m&&!c&&!_)return{forces:N,memberIds:D,holds:C};const Y=F=>{if(!_)return S;const K=hi(i,F,ou(i,_,F),Eo(F));return Ci(K.x-F.x,K.z-F.z)},q=F=>{if(_?.kind==="bridge"&&ws(F,_.bridge,_.sign)>_.bridge.length/2+3)return!1;const K=Y(F),wt=Ci(F.x-r.x,F.z-r.z);return wt.x*K.x+wt.z*K.z>.6&&Nt(r,F)<8&&le(i,r,F,.15)};a>=2&&i.time>=(r.nextBarkAt||0)&&b.some(q)&&(r.barkUntil=i.time+.65,r.nextBarkAt=i.time+3.2,r.barking=!0,s.push({type:"buddyBark",x:r.x,z:r.z}));for(const F of b){if(!q(F))continue;const K=Ae(F),wt=(c?3.7:_?2.4:1.15)*e.helperStrength*(r.barking?1.45:1),Rt=Y(F),Tt=c||_?0:(E.x-F.x)*-S.z+(E.z-F.z)*S.x,Z=Math.max(-.6,Math.min(.6,Tt*.12)),Q={x:Rt.x*wt-Rt.z*Z,z:Rt.z*wt+Rt.x*Z},ot={x:F.x+Rt.x*.7,z:F.z+Rt.z*.7};!he(i,ot.x,ot.z,K)||!le(i,F,ot,K)||(N.set(F.id,Q),D.add(F.id))}return{forces:N,memberIds:D,holds:C}}const Iv=i=>Ae(i),Lv=3,Ua=i=>({x:Math.sin(i.heading),z:Math.cos(i.heading)}),cu=(i,t,e)=>(i.x-t.x)*e.x+(i.z-t.z)*e.z;function Uv(i,t,e){let n=t.bridgeCrossing;const s=Iv(t);if(n){const f=Ua(n.bridge);if(cu(e,n.bridge,f)*n.sign>n.bridge.length/2+s+.7&&he(i,e.x,e.z,s))return t.lastBridge={bridge:n.bridge,sign:n.sign},delete t.bridgeCrossing,{finished:!0}}else t:for(const f of i.rivers||[])for(const p of f.bridges){const g=Ua(p),x=cu(e,p,g),m=(e.x-p.x)*g.z-(e.z-p.z)*g.x,d=(e.vx||0)*g.x+(e.vz||0)*g.z,M=t.lastBridge?.bridge===p&&Math.sign(d)!==t.lastBridge.sign,v=Math.abs(x)<=p.length/2+.15,_=!v&&!M&&e.pushed&&Math.abs(x)<=p.length/2+Lv&&d*x<0;if(!(!v&&!_||Math.abs(m)>p.width/2-s-(_?.1:0)||!he(i,e.x,e.z,s))&&!(Math.abs(d)<.12)){n=t.bridgeCrossing={bridge:p,sign:Math.sign(d),lane:Math.max(-p.width/2+s+.35,Math.min(p.width/2-s-.35,m))};break t}}if(!n)return null;const r=n.bridge,o=Ua(r);let a;for(const f of[s+1.2,s+2,s+3.2,s+5]){const p=n.sign*(r.length/2+f),g={x:r.x+o.x*p+o.z*n.lane,z:r.z+o.z*p-o.x*n.lane};if(he(i,g.x,g.z,s)){a=g;break}}if(!a)return null;const c=el(i,e,a,s),l=c.x-e.x,h=c.z-e.z,u=Math.hypot(l,h);return u<.02||!le(i,e,c,s)?{x:0,z:0,forward:o}:{x:l/u,z:h/u,forward:o}}const Nv=8,Fv=3,Ov=2,Bv=9,Uf=i=>({x:Math.sin(i),z:Math.cos(i)}),lu=new WeakMap;function kv(i){const t=`${i.geometryRevision||0}:${(i.gates||[]).map(s=>s.open?1:0).join("")}`,e=lu.get(i);if(e?.key===t)return e.list;const n=Gv(i);return lu.set(i,{key:t,list:n}),n}function Gv(i){const t=(i.rivers||[]).flatMap(r=>r.bridges).map(r=>({bridge:r,x:r.x,z:r.z,heading:r.heading,width:r.width,half:r.length/2})),e=(i.gates||[]).filter(r=>!r.operable||r.open).map(r=>({x:r.x,z:r.z,heading:r.heading,width:r.width,half:0})),n=i.target&&cn(i.target),s=n?[{x:n.entrance.x,z:n.entrance.z,heading:i.target.heading,width:n.openingWidth,half:0,inwardOnly:!0}]:[];return[...t,...e,...s].filter(r=>r.width<Bv)}function Hv(i,t,e=Ae(t)){let n=null;for(const s of kv(i)){const r=Uf(s.heading),o=(t.x-s.x)*r.x+(t.z-s.z)*r.z,a=(t.x-s.x)*r.z-(t.z-s.z)*r.x,c=Math.abs(o)-s.half;if(c<-.01&&Math.abs(a)<=s.width/2||c<-1.5||c>Nv||Math.abs(a)>s.width/2+3||s.inwardOnly&&o>0||n&&c>=n.outside)continue;const l=Math.sign(o)||1,h=Math.max(0,s.width/2-e-.35),u=Math.max(-h,Math.min(h,a)),f={x:-r.x*l,z:-r.z*l};n={opening:s,outside:c,inward:f,side:l,lateral:a,lane:u,mouth:{x:s.x+r.x*l*s.half+r.z*u,z:s.z+r.z*l*s.half-r.x*u}}}return n}function Vv(i,t,e,n,s,r,o){const a=Ae(t),c=Hv(i,e,a);if(!c||r.x*c.inward.x+r.z*c.inward.z<=.05)return delete t.chokeYield,s;const l=t.lastBridge;if(l&&l.bridge===c.opening.bridge&&-c.side!==l.sign)return delete t.chokeYield,s;const h=c.inward;let{x:u,z:f}=s;const p=o.x*h.x+o.z*h.z;p<0&&(u-=h.x*p,f-=h.z*p);const g=u*h.x+f*h.z;g<0&&Math.abs(c.lane-c.lateral)<.3&&(u-=h.x*g,f-=h.z*g);const x=Uf(c.opening.heading),m=c.lane-c.lateral;if(Math.abs(m)>.3&&c.outside<a+1.5){const v=Math.abs(c.lateral)>c.opening.width/2-a-.05&&c.outside<a+.45?-.5:Math.min(u*h.x+f*h.z,.3),_=Math.max(-1.5,Math.min(1.5,m*1.5));u=h.x*v+x.z*_,f=h.z*v-x.x*_}else{const M=Math.max(-1,Math.min(1,m*.8));u+=x.z*M,f-=x.x*M}if(t.chokeYield?.escapeUntil<=i.time&&delete t.chokeYield,!(t.chokeYield?.escapeUntil>i.time)){let M=null;for(const _ of n){if(_.id===t.id)continue;const y=_.x-e.x,E=_.z-e.z,C=y*h.x+E*h.z,L=Math.abs(y*h.z-E*h.x),S=a+Ae(_)+.25;C>0&&C<S+.3&&L<S&&(!M||C<M.front)&&(M={other:_,front:C,room:S})}const v=u*h.x+f*h.z;if(M){const _=t.chokeYield||={since:i.time};if(i.time-_.since>Fv)t.chokeYield={since:i.time,escapeUntil:i.time+Ov};else{const y=Math.max(0,(M.other.vx||0)*h.x+(M.other.vz||0)*h.z)+Math.max(0,M.front-M.room)*1.5;v>y&&(u-=h.x*(v-y),f-=h.z*(v-y))}}else delete t.chokeYield}return{x:u,z:f}}function Wv(i){let t=i>>>0;return t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,(t>>>0)/4294967296}function vs(i,t,e,n=0){return Wv((i^Math.imul(t+1,2654435761)^Math.imul(e+1,2246822507)^n)>>>0)}const Xv=i=>Math.floor(Math.max(0,i)*.2);function qv(i){const t=i+1;return{wanderChance:t>70?.25:t>40?.2:.33,boltChance:t>40?.2:.1,duration:t>=70?[5,10]:t>=40?[4,6]:[3,5]}}function Wc(i){const t=i.animals.filter(s=>!s.saved),e=t.map(s=>s.id).join(",");if(i.wanderCohort&&i.wanderCohortSignature===e)return i.wanderCohort;const n=new Set(t.map(s=>({id:s.id,rank:vs(i.seed^Math.imul(i.index+1,7919),s.id,0,5370206)})).sort((s,r)=>s.rank-r.rank||s.id-r.id).slice(0,Xv(t.length)).map(s=>s.id));return i.wanderCohort=n,i.wanderCohortSignature=e,i.wanderCohort}function Yv(i,t,e,n,s=!1){if(i.index<7||t.saved||s||t.wander||t.wanderHome)return null;const r=qv(i.index);if(!Wc(i).has(t.id)||vs(i.seed,t.id,e,96785)>=r.wanderChance)return null;const o=t.x-n.x,a=t.z-n.z,c=Math.hypot(o,a),l=c>.01?{x:o/c,z:a/c}:{x:0,z:1},h=i.index>=16&&vs(i.seed,t.id,e,45079)<r.boltChance,u=h?r.duration[0]+vs(i.seed,t.id,e,1004)*(r.duration[1]-r.duration[0]):2.5,f=h?6*u+1:4+vs(i.seed,t.id,e,4292)*3;return{x:t.x+l.x*f,z:t.z+l.z*f,until:i.time+u,bolting:h}}function Na(i,t,e){return 5+3*vs(i.seed^Math.imul(i.index+1,7919),t.id,e,49420)}function Zv(i,t,e){if(!(e>0)||i.index<7||t.saved||(Number.isFinite(t.nextWanderCheck)||(t.wanderOpportunity=0,t.nextWanderCheck=i.time-e+Na(i,t,0)),i.time+1e-8<t.nextWanderCheck))return null;const n=t.wanderOpportunity++;return t.nextWanderCheck+=Na(i,t,t.wanderOpportunity),t.nextWanderCheck<=i.time&&(t.nextWanderCheck=i.time+Na(i,t,t.wanderOpportunity)),n}const or=.65;function Nf(i){const t={x:Math.sin(i.heading),z:Math.cos(i.heading)},e=i.width/2-.9;return[-1,1].map(n=>({x:i.x+t.x*n*2+t.z*e,z:i.z+t.z*n*2-t.x*e}))}function $v(i){i.geometryRevision=(i.geometryRevision||0)+1,i.flockVisibility?.clear()}function Kv(i,t,e){const{a:n,b:s}=tl(t),r=t.material==="stone"?.3:.18;return[{body:e,radius:.62},...(i.animals||[]).map(a=>({body:a,radius:Ae(a)})),...(i.helpers||[]).filter(a=>a.type==="helper").map(a=>({body:a,radius:.62}))].some(({body:a,radius:c})=>a&&xe(a,Kc(a,n,s))<c+r+.02)}function Jv(i,t){const e=[];for(const n of i.gates||[]){if(!n.operable)continue;const s=Nf(n),r=s.some(c=>xe(t,c)<=or+.62),o=!!n.buttonContact;if(!r){s.every(c=>xe(t,c)>or+.62+.2)&&(n.buttonContact=!1);continue}if(n.buttonContact=!0,!(o||!s.find(c=>xe(t,c)<=or+.62&&le(i,t,c,.62))||!he(i,t.x,t.z,.62))){if(n.open&&Kv(i,n,t)){e.push({type:"gateBlocked",id:n.id});continue}n.open=!n.open,$v(i),e.push({type:"gateToggled",id:n.id,open:n.open})}}return e}const fn=(i,t,e)=>Math.max(t,Math.min(e,i)),_r=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Xn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-4?{x:i/e,z:t/e}:{x:0,z:0}},Xc=i=>i.reduce((t,e)=>({x:t.x+e.x/i.length,z:t.z+e.z/i.length}),{x:0,z:0});function jv(i,t,e){const n=t.buddyRest;(!n||n.home!==e)&&(t.buddyRest={home:e,cycle:0,next:i.time+20+t.id*7%17});const s=t.buddyRest;if(i.time>=s.next&&(s.cycle++,s.next=i.time+24+(t.id*11+s.cycle*5)%19,delete s.target),!s.target){const r=t.id*2.399963+s.cycle*1.618,o=s.cycle===0?.45:.6,a={x:e.x+Math.sin(r)*o,z:e.z+Math.cos(r)*o},c=Nu(i,a)&&he(i,a.x,a.z,Ae(t))&&le(i,t,a,Ae(t));s.target=c?a:{x:t.x,z:t.z},s.facing=c?void 0:r}return s.target}function Ff(i){const t=Math.max(0,(i.animals?.length||0)-5),e=Math.max(1,i.routes?.length||1),n=i.spawn&&i.target?_r(i.spawn,i.target):0;return fn(30+Math.ceil(t/5)+(e-1)*4+Math.floor(n/40)*2,30,60)}function Ml(i,t=i.animals.filter(e=>e.saved).length){const e=i.animals.length;return e?Math.floor(Math.max(0,i.reward)*fn(t,0,e)/e):0}function qc(i,t=[],e=!1,n={blockedX:!1,blockedZ:!1}){const s=i.result?.saved??i.animals.filter(a=>a.saved).length,r=i.result?.total??i.animals.length,o=i.result?.score??Ml(i,s);return{saved:s,total:r,score:o,possibleScore:i.reward,completed:!!i.completed,justCompleted:e,reward:e?o:0,remaining:i.delivery?.remaining??null,countdownStarted:!!i.delivery?.started,events:t,helpers:i.helpers||[],dogCollision:n}}function hu(i,t,e=[],n){i.completed=!0;const s=i.animals.filter(r=>r.saved).length;return i.result={saved:s,total:i.animals.length,score:Ml(i,s),possibleScore:i.reward,reason:t},e.push({type:"levelCompleted",index:i.index,reward:i.result.score,reason:t}),qc(i,e,!0,n)}function To(i,t,e,n=.15){return le(i,t,e,n)}function Qv(i,t,e=[]){const n=vl(i,t);return n.sort((s,r)=>r.length-s.length||r.filter(o=>e.includes(o.id)).length-s.filter(o=>e.includes(o.id)).length||Math.min(...s.map(o=>o.id))-Math.min(...r.map(o=>o.id))),n[0]||[]}function tM(i,t,e,n){const s=[e.drone&&"drone"].filter(Boolean);if(i.helpers||=[],i.helpers=i.helpers.filter(x=>s.includes(x.type)||e.helper&&x.type==="helper"),!s.length||!t.length)return{helpers:[],group:[],memberIds:new Set,hold:!1};const r=i.companionHerd||={},o=t.map(x=>x.id).join(",");(!r.group||r.activeSignature!==o||i.time-r.clusterTime>.25)&&(r.group=Qv(i,t,r.clusterIds),r.activeSignature=o,r.clusterTime=i.time);const a=r.group;if(a.length<2){r.mode="standby",r.clusterIds=[],r.positions={};for(const x of s){let m=i.helpers.find(d=>d.type===x);m||(m={type:x,x:i.dog.x,z:i.dog.z},i.helpers.push(m)),m.mode="standby",m.clusterIds=[],m.anchor={x:m.x,z:m.z}}return{helpers:i.helpers,group:[],memberIds:new Set,hold:!1,state:r}}const c=Xc(a),l=a.map(x=>x.id),h=new Set(l);let u=1/0;for(const x of a){const m=_r(i.dog,x);m<=18&&m<u&&To(i,i.dog,x)&&(u=m)}const f=r.mode&&r.mode!=="standby"?r.mode==="hold"?u>=12:u>18:u>14,p=(r.clusterIds||[]).filter(x=>h.has(x)).length,g=!r.clusterIds||p<Math.min(r.clusterIds.length,l.length)/2;if(f&&(r.mode!=="hold"||g)&&(r.anchor={...c},r.positions=Object.fromEntries(a.map(x=>[x.id,{x:x.x,z:x.z}]))),f||(r.anchor={...c},r.positions={}),f)for(const x of a)r.positions[x.id]||={x:x.x,z:x.z};r.mode=f?"hold":"assist",r.clusterIds=l;for(const x of s){let m=i.helpers.find(v=>v.type===x);m||(m={type:x,x:x==="drone"?c.x:i.dog.x,z:x==="drone"?c.z:i.dog.z},i.helpers.push(m)),m.mode=r.mode,m.clusterIds=[...l],m.anchor={...r.anchor};const d=Xn(c.x-m.x,c.z-m.z),M=Math.min(_r(m,c),n*6);m.x+=d.x*M,m.z+=d.z*M}return{helpers:i.helpers,group:a,centroid:c,memberIds:h,hold:f,state:r}}function eM(i,t,e,n){const s=new Map;if(!t.group.length||t.hold)return s;const{group:r,centroid:o}=t,a=Xn(o.x-e.x,o.z-e.z),c={x:-a.z,z:a.x},l=Math.min(1.2,n.droneStrength*.35),h=Math.max(2.1,Math.sqrt(r.length)*.66);for(const f of r){const p=(o.x-f.x)*c.x+(o.z-f.z)*c.z,g=fn(Math.sign(p)*Math.max(0,Math.abs(p)-h)*l,-.75,.75),x={x:c.x*g,z:c.z*g},m=Ae(f);g&&!To(i,f,{x:f.x+x.x,z:f.z+x.z},m)||he(i,f.x+x.x*.7,f.z+x.z*.7,m)&&s.set(f.id,x)}const u=[...s.values()].reduce((f,p)=>({x:f.x+p.x,z:f.z+p.z}),{x:0,z:0});for(const f of s.values())f.x-=u.x/s.size,f.z-=u.z/s.size;return s}function Of(i,t,e){if(t<=0)return;const n=cn(i.target);for(const s of i.animals){if(!s.saved)continue;const r=Ae(s),o=Jc(i.target,s),a=s.roamPhase??s.id*2.399963229728653;s.roamPhase=a;const c=n.halfLength-r-.48,l=n.halfWidth-r-.24,h={forward:Math.sin(e*.22+a)*c*.72,lateral:Math.cos(e*.19+a*1.7)*l*.72};let u=(h.forward-o.forward)*.32,f=(h.lateral-o.lateral)*.32;for(const _ of i.animals){if(_===s||!_.saved)continue;const y=s.x-_.x,E=s.z-_.z,C=Math.hypot(y,E),L=r+Ae(_)+.35;if(C>1e-4&&C<L){const S=(L-C)/C*.6;u+=(y*n.forward.x+E*n.forward.z)*S,f+=(y*n.side.x+E*n.side.z)*S}}const p=-n.halfLength+r;o.forward<p+.45&&(u+=(p+.45-o.forward)*1.2);const g=n.forward,x=n.side;let m=g.x*u+x.x*f,d=g.z*u+x.z*f;const M=Math.hypot(m,d);M>.65&&(m*=.65/M,d*=.65/M);const v={x:s.x,z:s.z};er(i,s,m*t,d*t,r),he(i,s.x,s.z,r)&&Sr(i.target,s,r)||(s.x=v.x,s.z=v.z),s.vx=(s.x-v.x)/t,s.vz=(s.z-v.z)/t,s.heading=Math.hypot(s.vx,s.vz)>.03?Math.atan2(s.vx,s.vz):s.heading||0}}function nM(i,t=1/60){t=fn(Number(t)||0,0,.1),i.completed&&t>0&&(i.savedRoamTime=(i.savedRoamTime??(i.time||0))+t,Of(i,t,i.savedRoamTime))}function iM(i,t,e={},n=1/60,s={}){const r=Sv(s,i.index+1);if(n=fn(Number(n)||0,0,.1),i.completed||n<=0)return qc(i);if(n>0&&i.delivery?.started&&(i.delivery.remaining=Math.max(0,i.delivery.remaining-n),i.delivery.remaining<=1e-8))return i.delivery.remaining=0,hu(i,"timeout");i.time=(i.time||0)+n;const o=Wc(i);Of(i,n,i.time);const a=[],c=Number(e.x)||0,l=Number(e.z??e.y)||0,h=Math.min(1,Math.hypot(c,l)),u=Xn(c,l),f=7.8+r.speedBoost,p={x:t.x,z:t.z},g=er(i,t,u.x*h*f*n,u.z*h*f*n,.62);t.vx=n?(t.x-p.x)/n:0,t.vz=n?(t.z-p.z)/n:0,t.heading=h>.03?Math.atan2(u.x,u.z):t.heading||0,i.dog=t,a.push(...Jv(i,t));const x=i.animals.filter(R=>!R.saved),m=tM(i,x,r,n),d=eM(i,m,t,r),M=Dv(i,x,r,n,a),v=7.6+r.signalBoost+(e.bark?3.3:0),_=x.map(R=>({...R})),y=i.flockVisibility||=new Map,E=new Map(_.map(R=>[R.id,`${Math.floor(R.x*5)},${Math.floor(R.z*5)}`])),C=(R,b)=>{const N=R.id<b.id?R:b,D=R.id<b.id?b:R,Y=`${N.id}:${D.id}`,q=`${E.get(N.id)}:${E.get(D.id)}`,F=y.get(Y);if(F?.position===q)return F.clear;const K=le(i,R,b,.15);return y.set(Y,{position:q,clear:K}),K},L=new Map(_.map(R=>{const b=_r(R,t),N=b<v&&pd(i,R,t),D=N?Math.pow(1-b/v,.65)*(e.bark?1.65+r.barkBoost:1):0,Y=b>.01?Xn(R.x-t.x,R.z-t.z):Xn(Math.sin(t.heading||0),Math.cos(t.heading||0));return[R.id,{active:N,urgency:D,x:Y.x*D*5.2,z:Y.z*D*5.2}]})),S=new Map,T=new Map,U=i.flockTravel||[],k=[];vl(i,_,C).forEach((R,b)=>{const N=R.filter(Vt=>!Vt.wander&&!Vt.wanderHome),D=N.length?N:R,Y=Xc(D);let q=0,F=0,K=0,wt=0;for(const Vt of D){q+=(Vt.vx||0)/D.length,F+=(Vt.vz||0)/D.length;const I=L.get(Vt.id),qt=M.forces.get(Vt.id);K+=(I.x+(qt?.x||0))/D.length,wt+=(I.z+(qt?.z||0))/D.length}const Rt=R.map(Vt=>Vt.id),Tt=new Set(Rt),Z=U.map(Vt=>({v:Vt,count:Vt.ids.filter(I=>Tt.has(I)).length})).sort((Vt,I)=>I.count-Vt.count)[0],Q=Math.hypot(q,F),ot=Math.hypot(K,wt),pt=Q>.28?Xn(q,F):ot>.03?Xn(K,wt):Z?.count?Z.v.forward:null,dt=pt?Math.max(Q>.28?q*pt.x+F*pt.z:0,ot>.03?(K*pt.x+wt*pt.z)*.65:0,0):0,kt={center:Y,forward:pt,drive:dt,pressure:ot};k.push({ids:Rt,forward:pt}),T.set(b,kt);for(const Vt of R)S.set(Vt.id,b)}),i.flockTravel=k;for(let R=0;R<x.length;R++){const b=x[R],N=_[R],D=Ae(b),Y=Uv(i,b,N),q=Y?.finished?null:Y;Y?.finished&&m.hold&&m.memberIds.has(b.id)&&(m.state.positions[b.id]={x:N.x,z:N.z});let F=0,K=0,wt=0,Rt=0,Tt=0,Z=0,Q=0,ot=0;for(const $ of _){if($.id===b.id)continue;const X=N.x-$.x,ft=N.z-$.z,it=Math.hypot(X,ft),gt=Math.max(2,D+Ae($)+.35);if(it<gt&&it>.01){const _t=(gt-it)/it;F+=X*_t,K+=ft*_t}it<18&&S.get(N.id)===S.get($.id)&&C(N,$)&&(wt+=$.x,Rt+=$.z,Tt+=$.vx,Z+=$.vz,Q++)}let pt=F*2.5,dt=K*2.5;const kt=L.get(b.id),Vt=kt.active,I=M.memberIds.has(b.id),qt=!m.hold&&m.memberIds.has(b.id)||I;if((Vt||qt||q)&&(delete b.wander,delete b.wanderHome),Vt&&(pt+=kt.x,dt+=kt.z,ot=kt.urgency,b.lastPlayerPressure=i.time),I){const $=M.forces.get(b.id);pt+=$.x,dt+=$.z,ot=Math.max(ot,.45)}const et=M.holds?.get(b.id);Y?.finished&&i.buddyHerd?.containment?.positions[b.id]&&(Object.assign(i.buddyHerd.containment.positions[b.id],{x:N.x,z:N.z}),i.buddyHerd?.containment&&(i.buddyHerd.containment.anchor={x:N.x,z:N.z}));const rt=!q&&!Vt&&ot<.03&&(!!et||m.hold&&m.memberIds.has(b.id)),st=()=>{b.wanderHome={x:N.x,z:N.z},delete b.wander};b.wander&&(i.time>=b.wander.until||!o.has(b.id))&&st();const It=Zv(i,b,n);if(It!==null&&ot<.03){const $=m.centroid||Xc(_),X=Yv(i,b,It,$,Vt||qt||rt||!!q);X&&(b.wander=X)}let ct=b.wander;if(rt){const $=et||m.state.positions[b.id];if(et){const X=jv(i,b,$),ft=X.x-N.x,it=X.z-N.z,gt=Math.hypot(ft,it);pt=(gt>.055?ft*.9:0)+F*.35,dt=(gt>.055?it*.9:0)+K*.35;const _t=Math.hypot(pt,dt);_t>.38&&(pt*=.38/_t,dt*=.38/_t)}else delete b.buddyRest,pt=fn(($.x-N.x)*2.6+F*.35,-1.1,1.1),dt=fn(($.z-N.z)*2.6+K*.35,-1.1,1.1)}else{if(delete b.buddyRest,Q&&!ct&&!b.wanderHome&&!(I&&i.buddyHerd?.retrieveId===b.id)){const X=wt/Q-N.x,ft=Rt/Q-N.z,it=Math.hypot(X,ft),gt=T.get(S.get(b.id)),_t=gt.forward,at=_t&&(N.x-gt.center.x)*_t.x+(N.z-gt.center.z)*_t.z>.6;if(it>2.6){const mt=Xn(X,ft),Lt=Math.min(2.6,(it-2.6)*.36)*.7*(1+r.cohesionBoost);let Pt=mt.x*Lt,Mt=mt.z*Lt;const Zt=at?Math.min(0,Pt*_t.x+Mt*_t.z):0;Zt&&(Pt-=_t.x*Zt,Mt-=_t.z*Zt),pt+=Pt,dt+=Mt}if(pt+=Tt/Q*.45,dt+=Z/Q*.45,at&&gt.drive>.03&&!Vt&&!I){const mt=Math.max(0,gt.drive-pt*_t.x-dt*_t.z);pt+=_t.x*mt,dt+=_t.z*mt,gt.pressure>.03&&(ot=Math.max(ot,Math.min(.35,gt.pressure/5.2)))}}const $=d.get(b.id);if($&&he(i,N.x+$.x*.7,N.z+$.z*.7,D)&&To(i,N,{x:N.x+$.x,z:N.z+$.z},D)&&(pt+=$.x,dt+=$.z),ot<.03&&(pt+=Math.sin(i.time*.6+b.id*2.1)*.12,dt+=Math.cos(i.time*.5+b.id*1.7)*.12),ct){const X=ct.x-N.x,ft=ct.z-N.z,it=Math.hypot(X,ft);it>.35?(pt+=X/it*(ct.bolting?5.8:2.1),dt+=ft/it*(ct.bolting?5.8:2.1)):(st(),ct=null)}if(b.wanderHome&&!Vt&&!qt){const X=b.wanderHome,ft=b.id*2.39996;pt=(X.x+Math.sin(i.time*.24+ft)*1.4-N.x)*.35+F*.2,dt=(X.z+Math.cos(i.time*.19+ft)*1.4-N.z)*.35+K*.2}}if(ot>.03&&!q&&!rt&&!b.wanderHome&&!ct?.bolting){const $=I?M.forces.get(b.id):null,X={x:(Vt?kt.x:0)+($?.x||0),z:(Vt?kt.z:0)+($?.z||0)};({x:pt,z:dt}=Vv(i,b,N,_,{x:pt,z:dt},X,{x:F*2.5,z:K*2.5}))}else delete b.chokeYield;if(q){const $=fn(F*q.forward.z-K*q.forward.x,-.7,.7),X=b.type==="cow"?2.7:3.2;pt=q.x*X+q.forward.z*$*.5,dt=q.z*X-q.forward.x*$*.5,ot=Math.max(ot,.4)}if(ot>.03&&!q){const $=xd(i,b,pt,dt,D);pt+=$.x,dt+=$.z}const xt=b.wanderHome&&!rt?.75:ct?.bolting?6:b.type==="cow"?3.3:4.2,Yt=Math.hypot(pt,dt);Yt>xt&&(pt*=xt/Yt,dt*=xt/Yt);const ne=1-Math.exp(-n*(rt?12:b.type==="cow"?3.5:5.5));b.vx+=(pt-b.vx)*ne,b.vz+=(dt-b.vz)*ne;const P=!rt&&b.wanderHome,w=P&&Math.hypot(b.x+b.vx*n-P.x,b.z+b.vz*n-P.z)>3,V=er(i,b,w?0:b.vx*n,w?0:b.vz*n,D);if((V.blockedX||V.blockedZ)&&ot>.03){const $=Xn(b.vx,b.vz),X=Math.min(.24,Math.hypot(b.vx,b.vz)*n);for(const ft of[Math.PI/6,-Math.PI/6,Math.PI/3,-Math.PI/3,Math.PI/2,-Math.PI/2]){const it=($.x*Math.cos(ft)-$.z*Math.sin(ft))*X,gt=($.x*Math.sin(ft)+$.z*Math.cos(ft))*X;if(he(i,b.x+it,b.z+gt,D)){er(i,b,it,gt,D);break}}}if(V.blockedX&&(b.vx*=.45),V.blockedZ&&(b.vz*=.45),Math.hypot(b.vx,b.vz)>.1)b.heading=Math.atan2(b.vx,b.vz);else if(rt&&b.buddyRest?.facing!==void 0){const $=b.heading||0,X=b.buddyRest.facing,ft=Math.atan2(Math.sin(X-$),Math.cos(X-$)),it=b.type==="cow"?Math.PI/1.5:Math.PI;b.heading=$+fn(ft,-it*n,it*n)}else b.heading||=0;b.alert=ot,b.pushed=Vt||I;const tt=_r(t,i.target)<i.target.radius+12;n>0&&tt&&!rt&&Sr(i.target,b,D)&&To(i,t,b)&&(b.saved=!0,b.vx=0,b.vz=0,delete b.wander,delete b.wanderHome,delete b.nextWanderCheck,delete b.wanderOpportunity,delete b.buddyNavigation,delete b.bridgeCrossing,delete b.chokeYield,delete b.lastBridge,delete b.pushed,a.push({type:"animalSaved",id:b.id,animalType:b.type}))}const B=Wc(i);for(const R of i.animals)!R.saved&&R.wander&&!B.has(R.id)&&(R.wanderHome={x:R.x,z:R.z},delete R.wander);const W=i.animals.filter(R=>R.saved).length;if(a.some(R=>R.type==="animalSaved")&&!i.delivery?.started){const R=Ff(i);i.delivery={started:!0,duration:R,remaining:R},a.push({type:"countdownStarted",duration:R})}return W===i.animals.length&&W>0?hu(i,"all-arrived",a,g):qc(i,a,!1,g)}function vr(){return{version:2,points:0,upgrades:{},completedLevels:[],bestScores:{},bestEarnedBolts:{},highestLevel:0,music:!0}}const yl=i=>80+i*25;function sM(i){const t={};if(!i||typeof i!="object"||Array.isArray(i))return t;for(const[e,n]of Object.entries(i)){const s=Number(e);String(s)!==e||!Number.isInteger(s)||s<0||s>99||!Number.isFinite(n)||n<=0||(t[s]=fn(Math.floor(n),0,yl(s)),t[s]||delete t[s])}return t}function Sl(i){const t=vr();if(!i||typeof i!="object")return t;t.points=Number.isFinite(i.points)?fn(Math.floor(i.points),0,1e9):0,t.upgrades=Cf(i.upgrades);const e=[...new Set((Array.isArray(i.completedLevels)?i.completedLevels:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<=99))];if(t.bestEarnedBolts=sM(i.bestEarnedBolts),i.version===void 0||i.version===1)for(const n of e)t.bestEarnedBolts[n]=yl(n);return t.bestScores={...t.bestEarnedBolts},t.completedLevels=Object.keys(t.bestEarnedBolts).map(Number).sort((n,s)=>n-s),t.highestLevel=fn(Math.max(Number.isInteger(i.highestLevel)?i.highestLevel:0,...t.completedLevels.map(n=>n+1)),0,99),t.music=i.music!==!1,t}function rM(i,t){if(!t.completed||!Number.isInteger(t.index)||t.index<0||t.index>99)return 0;const e=t.result?.saved??t.animals.filter(o=>o.saved).length;if(e<=0||!t.animals.length)return 0;Object.assign(i,Sl(i));const n=Math.min(yl(t.index),Ml(t,e)),s=i.bestEarnedBolts[t.index]||0,r=Math.max(0,n-s);return i.bestScores[t.index]=Math.max(i.bestScores[t.index]||0,n),i.bestEarnedBolts[t.index]=Math.max(s,n),i.completedLevels.includes(t.index)||i.completedLevels.push(t.index),i.completedLevels.sort((o,a)=>o-a),i.highestLevel=Math.min(99,Math.max(i.highestLevel,t.index+1)),i.points+=r,r}function oM(i,t="flock-foundry-v1"){try{return i||=globalThis.localStorage,Sl(JSON.parse(i.getItem(t)))}catch{return vr()}}function aM(i,t,e="flock-foundry-v1"){try{return t||=globalThis.localStorage,t.setItem(e,JSON.stringify(Sl(i))),!0}catch{return!1}}const en=(i,t=0,e=1)=>Math.max(t,Math.min(e,i));function cM(i){const t=Math.max(0,...(i.routes||[]).map(e=>Number.isFinite(e.length)?e.length:0));return en(t/2+Ff(i),45,240)}function Zs(i,t){let e=((i||0)^Math.imul(t,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),((e^e>>>15)>>>0)/4294967296}const uu=i=>i?.position?{x:i.position.x,z:i.position.z}:i,lM=new Ht(4350794),hM=new Ht(5784367),uM=new Ht(7714243);function fM(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=en(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1));return Math.hypot(i.x-t.x-n*r,i.z-t.z-s*r)}function Fa(i,t){if(!he(i,t.x,t.z,.4))return!1;for(const e of i.rivers||[]){if(e.points.some((n,s)=>s&&fM(t,e.points[s-1],n)<e.width/2+.8))return!1;for(const n of e.bridges||[]){const s=t.x-n.x,r=t.z-n.z,o=s*Math.sin(n.heading)+r*Math.cos(n.heading),a=s*Math.cos(n.heading)-r*Math.sin(n.heading);if(Math.abs(o)<n.length/2+.45&&Math.abs(a)<n.width/2+.45)return!1}}return!0}function dM(){const t=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=(n*64+s)*4,o=(Math.sin(n*.72+Math.sin(s*.31)*1.5)+Math.sin(n*1.37+s*.18))*.5,a=Math.round(145+o*28);t[r]=Math.round(a*.65),t[r+1]=a,t[r+2]=Math.min(255,a+24),t[r+3]=255}const e=new hf(t,64,64);return e.wrapS=e.wrapT=$n,e.repeat.set(1,5),e.magFilter=e.minFilter=Sn,e.needsUpdate=!0,e}class pM{constructor(t,{maxSplashes:e=12,maxPuddles:n=8}={}){this.scene=t,this.root=new te,this.root.name="Water and wetness effects",t.add(this.root),this.maxSplashes=Math.max(0,e|0),this.maxPuddles=Math.max(0,n|0),this.elapsed=0,this.wetness=0,this.level=null,this.flowMap=dM(),this.flowMaterial=new nn({map:this.flowMap,color:9096146,transparent:!0,opacity:.16,depthWrite:!1,side:Ce}),this.splashGeometry=new Lo(.2,.025,4,12),this.splashes=[],this.puddles=[],this.materialSnapshots=[],this.riverSnapshots=[],this.lastMoverPositions=new Map,this.lastSplashAt=new Map}setLevel(t,{grassMaterials:e=[],pathMaterials:n=[],waterMaterial:s=null,terrain:r=null,rivers:o=[],weather:a=null}={}){this.restoreMaterials(),this.clearEffects(),this.level=t,this.terrain=r,this.rivers=o,this.wetness=0,this.elapsed=0,this.puddleGrowthDuration=cM(t),this.rainElapsed=0,this.lastMoverPositions.clear(),this.lastSplashAt.clear();for(const[u,f]of[["grass",e],["path",n]])for(const p of Array.isArray(f)?f:[f])p?.color&&this.materialSnapshots.push({material:p,kind:u,color:p.color.clone(),roughness:p.roughness});this.waterSnapshot=s?{material:s,color:s.color?.clone(),roughness:s.roughness}:null;for(const u of o){if(!u?.mesh)continue;const f=u.mesh,p=this.flowMap.clone();p.repeat.set(1,1);const g=this.flowMaterial.clone();g.map=p,g.userData.ownedFlowMap=p;const x=f.geometry.clone(),m=x.attributes.position,d=x.attributes.uv,M=u.points;if(M?.length>1){for(let _=0;_<m.count;_++){const y=m.getX(_),E=m.getZ(_);let C=1/0,L=0,S=0,T=0;for(let U=1;U<M.length;U++){const k=M[U-1],B=M[U],W=B.x-k.x,R=B.z-k.z,b=Math.hypot(W,R);if(!b)continue;const N=en(((y-k.x)*W+(E-k.z)*R)/(b*b)),D=y-k.x-N*W,Y=E-k.z-N*R,q=D*D+Y*Y;q<C&&(C=q,L=T+N*b,S=(-R*D+W*Y)/b),T+=b}d.setXY(_,S/Math.max(1,u.width||4),L/4)}d.needsUpdate=!0}const v=new ie(x,g);v.name="River flow",v.position.copy(f.position),v.position.y+=.003,v.rotation.copy(f.rotation),v.scale.copy(f.scale),v.frustumCulled=f.frustumCulled,v.userData.flow={heading:u.heading||0,speed:u.flowSpeed??.12,localUV:M?.length>1},this.root.add(v)}for(let u=0;u<this.maxSplashes;u++){const f=new nn({color:13233904,transparent:!0,opacity:.78,depthWrite:!1}),p=new ie(this.splashGeometry,f);p.visible=!1,p.rotation.x=-Math.PI/2,this.root.add(p),this.splashes.push({mesh:p,material:f,age:1})}const c=new fl(1,20);this.puddleResources={geometry:c};const l=t.seed??t.index??0,h=Zs(l,71)<.5?0:1+Math.floor(Zs(l,72)*3);for(const u of this.findPuddleSites()){const f=new nn({color:4549225,transparent:!0,opacity:.2,depthWrite:!1,side:Ce}),p=new ie(c,f);p.rotation.x=-Math.PI/2,p.visible=!1,p.position.set(u.x,qn(t,u.x,u.z)+.024,u.z),p.scale.set(u.radius,u.radius*.62,1),this.root.add(p),this.puddles.push({mesh:p,material:f,depth:0,site:u,initialDepth:this.puddles.length<h?.1+Zs(l,80+this.puddles.length)*.1:0})}if(a){this.wetness=a.kind==="storm"?.6:a.kind==="heavy-rain"?.35:a.type==="rain"?.03:0;for(const u of this.puddles)u.depth=a.type==="rain"?u.initialDepth:0,this.applyPuddleAppearance(u);this.applySurfaceWeather(a)}}findPuddleSites(){const t=this.level,e=t.bounds,n=[],s=e.maxX-e.minX,r=e.maxZ-e.minZ,o=t.seed??t.index??0,a=(l,h)=>{const{x:u,z:f}=l,p=Array.from({length:48},(g,x)=>{const m=1+Math.floor(x/16),d=x%16*Math.PI/8;return{x:u+Math.cos(d)*h*m/3,z:f+Math.sin(d)*h*.62*m/3}});return!Fa(t,l)||p.some(g=>!Fa(t,g))||n.some(g=>Math.hypot(g.x-u,g.z-f)<g.radius+h+.3)?!1:(n.push({...l,radius:h}),!0)},c=(t.routes||[]).filter(l=>l.points?.length>1);for(let l=0;l<this.maxPuddles&&c.length;l++){const h=c[l%c.length],u=h.points,f=u.slice(1).map((m,d)=>Math.hypot(m.x-u[d].x,m.z-u[d].z)),p=f.reduce((m,d)=>m+d,0),g=1.35+Zs(o,150+l)*.69,x=l/Math.max(1,this.maxPuddles-1);for(let m=0;m<35;m++){let d=en(x+(m<7?0:(Math.ceil((m-6)/7)%2?1:-1)*.035))*p,M=0;for(;M<f.length-1&&d>f[M];)d-=f[M++];const v=u[M],_=u[M+1],y=f[M]||1,E=en(d/y),C=[0,2.5,-2.5,4,-4,6,-6][m%7]*(Zs(o,200+l)<.5?-1:1),L={x:v.x+(_.x-v.x)*E-(_.z-v.z)/y*C,z:v.z+(_.z-v.z)*E+(_.x-v.x)/y*C};if(a(L,g))break}}for(let l=1;l<Math.max(100,this.maxPuddles*80)&&n.length<this.maxPuddles;l++){const h=e.minX+2+l*.61803398875%1*Math.max(1,s-4),u=e.minZ+2+l*.75487766625%1*Math.max(1,r-4);a({x:h,z:u},1.35+l*37%70/100)}return n}applyPuddleAppearance(t){const e=Math.sqrt(t.depth);t.mesh.scale.set(t.site.radius*e,t.site.radius*.62*e,1),t.mesh.visible=t.depth>.008,t.material.opacity=t.mesh.visible?.18+t.depth*.24:0}restoreMaterials(){for(const t of this.materialSnapshots)t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color.dispose?.();if(this.materialSnapshots=[],this.waterSnapshot){const t=this.waterSnapshot;t.color&&t.material.color&&t.material.color.copy(t.color),t.roughness!==void 0&&(t.material.roughness=t.roughness),t.color?.dispose?.(),this.waterSnapshot=null}}clearEffects(){for(const t of this.splashes)this.root.remove(t.mesh),t.material.dispose();for(const t of this.puddles)this.root.remove(t.mesh),t.material.dispose();this.splashes=[],this.puddles=[],this.puddleResources&&(this.puddleResources.geometry.dispose(),this.puddleResources=null);for(const t of[...this.root.children])t.name==="River flow"&&(this.root.remove(t),t.material.userData.ownedFlowMap?.dispose(),t.material.dispose(),t.geometry.dispose())}applySurfaceWeather(t={}){const e=t.type==="rain"?en(t.rainIntensity??t.intensity??0):0;for(const n of this.materialSnapshots){const s=this.wetness*(n.kind==="grass"?.62:.85);n.material.color.copy(n.color).lerp(n.kind==="grass"?lM:hM,s),n.roughness!==void 0&&(n.material.roughness=Math.max(.28,n.roughness-this.wetness*.22))}if(this.waterSnapshot){const n=this.waterSnapshot,s=en(t.cloudCoverage??0);n.material.color&&n.color&&n.material.color.copy(n.color).lerp(uM,en((t.rainIntensity??e)*.11+s*.035+(t.severity||0)*.025+(t.lightningFlash||0)*.09)),n.roughness!==void 0&&(n.material.roughness=en(n.roughness-(t.rainIntensity??e)*.16,.12,1))}}update(t,{weather:e={},movers:n=[],paused:s=!1}={}){if(!this.level||s||!(t>0))return;t=Math.min(t,.1),this.elapsed+=t;const r=e.type==="rain"?en(e.rainIntensity??e.intensity??0):0;this.wetness=en(this.wetness+r*t*.012-t*(e.type==="sun"?.004:.0012)),this.applySurfaceWeather(e);for(const o of this.root.children)if(o.userData.flow){const a=o.userData.flow,c=o.material.map,l=t*(a.speed+(e.windIntensity||0)*.025);c.offset.x=(c.offset.x+(a.localUV?0:Math.sin(a.heading))*l)%1,c.offset.y=(c.offset.y+(a.localUV?1:Math.cos(a.heading))*l)%1,o.material.opacity=.08+r*.18+(e.daylight??.7)*.025+(e.lightningFlash||0)*.2}r>0&&(this.rainElapsed+=t);for(const o of this.puddles)o.depth=r>0?en(o.initialDepth+(1-o.initialDepth)*this.rainElapsed/this.puddleGrowthDuration):en(o.depth-t*(e.type==="sun"?.006:8e-4)),this.applyPuddleAppearance(o);for(const o of n){const a=uu(o);if(!a||!Number.isFinite(a.x)||!Number.isFinite(a.z))continue;const c=o.id??o.kind??"mover",l=uu(o.previousPosition)||(Number.isFinite(o.previousX)?{x:o.previousX,z:o.previousZ}:this.lastMoverPositions.get(c)),h=l&&Math.hypot(a.x-l.x,a.z-l.z)>.008,u=this.puddles.find(f=>f.mesh.visible&&(a.x-f.site.x)**2/f.site.radius**2+(a.z-f.site.z)**2/(f.site.radius*.62)**2<f.depth);h&&u&&Fa(this.level,a)&&this.elapsed-(this.lastSplashAt.get(c)||-10)>.22&&(this.spawnSplash(a),this.lastSplashAt.set(c,this.elapsed)),this.lastMoverPositions.set(c,{x:a.x,z:a.z})}for(const o of this.splashes)o.age>=1||(o.age=Math.min(1,o.age+t*2.4),o.mesh.scale.setScalar(.4+o.age*2.3),o.mesh.position.y=.06+qn(this.level,o.mesh.position.x,o.mesh.position.z)+o.age*.06,o.material.opacity=.78*(1-o.age),o.age>=1&&(o.mesh.visible=!1))}spawnSplash(t){const e=this.splashes.find(n=>n.age>=1);e&&(e.age=0,e.mesh.position.set(t.x,qn(this.level,t.x,t.z)+.08,t.z),e.mesh.scale.setScalar(.35),e.mesh.visible=!0)}dispose(){this.restoreMaterials(),this.clearEffects(),this.root.removeFromParent(),this.flowMap.dispose(),this.flowMaterial.dispose(),this.splashGeometry.dispose(),this.level=null,this.scene=null}}const Bf={sun:{rainIntensity:0,windIntensity:.12,severity:0,cloudCoverage:.22,daylight:1},wind:{rainIntensity:0,windIntensity:.6,severity:.3,cloudCoverage:.4,daylight:.96},rain:{rainIntensity:.3,windIntensity:.3,severity:.28,cloudCoverage:.5,daylight:.94},"heavy-rain":{rainIntensity:.65,windIntensity:.55,severity:.6,cloudCoverage:.7,daylight:.82},storm:{rainIntensity:.9,windIntensity:.85,severity:.88,cloudCoverage:.85,daylight:.7}};function wl(i,t){let e=(i^Math.imul(t+1,2654435769))>>>0;return e=Math.imul(e^e>>>16,569420461),e=Math.imul(e^e>>>15,1935289751),(e^e>>>15)>>>0}function mM(i,t,e){const n=e+1;if(n<=5)return"sun";const s=typeof i.weather=="string"?i.weather:i.weather?.kind||i.weather?.type,r=s==="light-rain"||s==="snow"?"rain":s;if(r&&Bf[r])return r==="sun"||r==="wind"?r:n<9?"sun":r==="storm"&&n>=24?"storm":(r==="storm"||r==="heavy-rain")&&n>=16?"heavy-rain":"rain";if(n===9)return"rain";if(n===16)return"heavy-rain";if(n===24)return"storm";const o=wl(t,e)/4294967296;return n<9?o<.65?"sun":"wind":n<16?o<.35?"sun":o<.5?"wind":"rain":n<24?o<.25?"sun":o<.35?"wind":o<.65?"rain":"heavy-rain":o<.2?"sun":o<.3?"wind":o<.5?"rain":o<.75?"heavy-rain":"storm"}function kf(i={}){const t=Number.isFinite(i.index)?Math.max(0,Math.floor(i.index)):0,e=Number.isFinite(i.seed)?i.seed>>>0:42,n=mM(i,e,t),s=Bf[n];return{...s,kind:n,type:n==="heavy-rain"||n==="storm"?"rain":n,snowIntensity:0,storm:n==="storm",elapsed:0,seed:e,levelIndex:t,intensity:Math.max(s.rainIntensity,n==="wind"?s.windIntensity:0),wind:.2+s.windIntensity*1.6,particles:s.rainIntensity>0?128:0,lightningId:null,lightningAge:1/0,thunderDelay:.8,lightningFlash:0,clouds:0,butterflies:n==="storm"?0:s.rainIntensity>0?4:8,birds:n==="storm"?0:5,squirrels:n==="storm"?0:3,lightningStart:8+wl(e,t+1e3)%401/100,lightningInterval:24}}function gM(i,t){if(Number.isFinite(t)&&t>0&&(i.elapsed+=t),!i.storm)return i;const e=Math.floor((i.elapsed-i.lightningStart)/i.lightningInterval);return e<0||(i.lightningId=`${i.seed}:${i.levelIndex}:${e}`,i.lightningAge=Math.max(0,i.elapsed-(i.lightningStart+e*i.lightningInterval)),i.thunderDelay=.8+wl(i.seed,i.levelIndex+e+2e3)%9/10,i.lightningFlash=i.lightningAge<.22?.9*(1-i.lightningAge/.22):0),i}const ar=(i,t,e)=>Math.max(t,Math.min(e,i)),Ao=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),bl=i=>()=>(i=Math.imul(i,1664525)+1013904223>>>0,i/4294967296);function xM(i,t=kf(i)){if(t.kind==="storm"||t.storm)return{squirrel:0,rabbit:0,bird:0,butterfly:0};const e=(i.bounds.maxX-i.bounds.minX)*(i.bounds.maxZ-i.bounds.minZ),n=bl((i.seed||42)^1464421444),s=ar(e/3600,.55,2.4),r=(o,a)=>Math.min(a,Math.max(1,Math.round(o*s*(.78+n()*.44))));return{squirrel:r(2,7),rabbit:r(2,8),bird:Math.min(6,Math.max(2,Math.round(3*s))),butterfly:Math.min(8,Math.max(0,Math.round(5*s)))}}function _M(i,t){let e=1/0;for(const n of i.roads||[]){const s=n.points||[n.from,n.to];for(let r=1;r<s.length;r++){const o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,h=ar(((t.x-o.x)*c+(t.z-o.z)*l)/(c*c+l*l||1),0,1);e=Math.min(e,Math.hypot(t.x-o.x-c*h,t.z-o.z-l*h))}}return e}const fu=new WeakMap;function vM(i,t){let e=fu.get(i);e||(e=new Map,fu.set(i,e));let n=e.get(t);if(!n||n.sourceRivers!==i.rivers||n.sourceObstacles!==i.obstacles||n.sourceFenceSegments!==i.fenceSegments||n.targetType!==i.target?.type){const s=i.bounds,r=(i.fenceSegments||[]).filter(o=>o.kind==="wall"||o.kind==="stone"||o.material==="stone"||o.kind==="target"&&i.target?.type==="barn");n={...i,sourceRivers:i.rivers,sourceObstacles:i.obstacles,sourceFenceSegments:i.fenceSegments,targetType:i.target?.type,fenceSegments:r,bounds:{minX:s.minX-t-1,maxX:s.maxX+t+1,minZ:s.minZ-t-1,maxZ:s.maxZ+t+1}},e.set(t,n)}return n}function El(i,t,e=.45){const n=i.bounds;return t.x>=n.minX-e&&t.x<=n.maxX+e&&t.z>=n.minZ-e&&t.z<=n.maxZ+e&&he(vM(i,e),t.x,t.z,.4)}function MM(i,t,e=[],n=.45){return _M(i,t)>5.5&&El(i,t,n)&&e.every(s=>Ao(t,s)>8)}const yM={butterfly:.54,squirrel:.58,bird:.64,rabbit:.76};function SM(i,t){let e=null,n=18;for(const s of i.obstacles||[]){const r=Ao(t,s);if(r>=n||r<.01)continue;const o=s.radius+.85,a=(t.x-s.x)/r,c=(t.z-s.z)/r,l={x:s.x+a*o,z:s.z+c*o};El(i,l,.2)&&(e=l,n=r)}return e||{x:t.homeX,z:t.homeZ}}function wM(i){const t=bl(i.randomSeed||(Math.floor((i.phase||0)*1e6)^i.slot||1)>>>0);i.randomSeed=Math.floor(t()*4294967295)||1;const e=t()*Math.PI*2,n=3+t()*8;i.waypointX=i.homeX+Math.cos(e)*n,i.waypointZ=i.homeZ+Math.sin(e)*n,i.waitTimer=0}function bM(i,t,e,n=[],s=0,r=i.weather,o=El){const a=typeof r=="function";if(a&&(o=r,r=i.weather),!(e>0))return t;const c=t.x,l=t.z,h=ar(Number(r?.severity)||0,0,1),u=yM[t.kind]??.64;h>=u?t.sheltering=!0:h<u-.12&&(t.sheltering=!1);const f=t.kind==="bird"?10:t.kind==="butterfly"?6:7.5;let p=!1,g=0,x=0;for(const E of n){const C=Ao(t,E);C<f&&(p=!0,g+=(t.x-E.x)/Math.max(.1,C)*(f-C),x+=(t.z-E.z)/Math.max(.1,C)*(f-C))}if(p)t.fleeing||(t.homeX=t.x,t.homeZ=t.z),t.waypointX=void 0,t.waypointZ=void 0,t.alertTimer=1.15,t.shelter=Math.max(0,(t.shelter||0)-e*3.5),t.hidden=!1,t.shelterX=void 0;else if(t.alertTimer=Math.max(0,(t.alertTimer||0)-e),t.sheltering){if(t.shelterX===void 0){const E=SM(i,t);t.shelterX=E.x,t.shelterZ=E.z}t.shelter=Math.min(1,(t.shelter||0)+e*.32),g=t.shelterX-t.x,x=t.shelterZ-t.z}else if(t.shelter=Math.max(0,(t.shelter||0)-e*.48),t.hidden=t.shelter>=.995,t.shelterX!==void 0&&t.shelter===0&&(t.shelterX=void 0,t.shelterZ=void 0,t.waypointX=void 0),t.alertTimer>0)g=x=0;else if((t.waitTimer||0)>0)t.waitTimer=Math.max(0,t.waitTimer-e),g=x=0;else if(t.waypointX!==void 0&&Ao(t,{x:t.waypointX,z:t.waypointZ})<.45){const E=bl(t.randomSeed||1);t.randomSeed=Math.floor(E()*4294967295)||1,t.waypointX=void 0,t.waypointZ=void 0,t.waitTimer=.55+E()*2.1,g=x=0}else t.waypointX===void 0&&wM(t),g=t.waypointX-t.x,x=t.waypointZ-t.z;let m=Math.hypot(g,x);if(p&&m<.01){const E=Number.isFinite(t.heading)?t.heading:t.phase||0;g=Math.sin(E),x=Math.cos(E),m=1}const d=t.kind==="rabbit",M=((t.gait||0)%1+1)%1,v=!d||M<.54;let _=p?t.kind==="bird"?5.2:d?4.2:3.5:t.kind==="squirrel"?.9:d?3.5:t.kind==="bird"?1.4:.8;t.sheltering&&!p&&(_=.95);const y=m>.01&&v?Math.min(m,e*_):0;if(y){const E=t.x+g/m*y,C=t.z+x/m*y,L=S=>a?o(i,S.x,S.z,.4):o(i,S,.45);t.kind==="bird"||L({x:E,z:C})?(t.x=E,t.z=C):L({x:E,z:t.z})?t.x=E:L({x:t.x,z:C})&&(t.z=C)}if(t.moving=Math.hypot(t.x-c,t.z-l)>.001,t.moving)t.heading=Math.atan2(t.x-c,t.z-l),t.stuckTimer=0;else if(y>.001&&(t.stuckTimer=(t.stuckTimer||0)+e,t.stuckTimer>=1)){const E=i.bounds;t.waypointX=t.x>E.maxX-.2?E.maxX-1.2:t.x<E.minX+.2?E.minX+1.2:ar(t.homeX,E.minX+1.2,E.maxX-1.2),t.waypointZ=t.z>E.maxZ-.2?E.maxZ-1.2:t.z<E.minZ+.2?E.minZ+1.2:ar(t.homeZ,E.minZ+1.2,E.maxZ-1.2),t.shelterX=void 0,t.shelterZ=void 0,t.stuckTimer=0,t.waitTimer=.2}return t.fleeing=p,t.alert=p||t.alertTimer>0,t.gait=(t.gait||0)+e*(p?1.8:d?1.35:t.kind==="squirrel"?1.7:1.2),t.hidden=t.shelter>=.995&&!p,t}const Gf={squirrel:[{part:"body",at:[0,.31,0],scale:[.2,.23,.32],color:"#a97552"},{part:"head",at:[0,.47,.2],scale:[.17,.17,.17],color:"#bd8960"},{part:"tail",at:[0,.48,-.34],scale:[.2,.31,.19],color:"#8e5b3e",tilt:-.48},{part:"ear",at:[-.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"ear",at:[.1,.62,.19],scale:[.055,.095,.045],color:"#915b43"},{part:"paw",at:[-.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"paw",at:[.14,.13,.13],scale:[.06,.1,.09],color:"#74503b"},{part:"eye",at:[-.105,.5,.33],scale:[.025,.03,.018],color:"#171819"},{part:"eye",at:[.105,.5,.33],scale:[.025,.03,.018],color:"#171819"}],rabbit:[{part:"body",at:[0,.31,-.02],scale:[.25,.27,.34],color:"#d6c7aa"},{part:"haunch",at:[0,.25,-.23],scale:[.23,.23,.22],color:"#c4b08f"},{part:"head",at:[0,.48,.25],scale:[.17,.17,.17],color:"#e4d6bd"},{part:"ear",at:[-.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"ear",at:[.09,.78,.25],scale:[.055,.27,.055],color:"#b98278"},{part:"tail",at:[0,.34,-.4],scale:[.095,.1,.095],color:"#f0e9dc"},{part:"paw",at:[-.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"paw",at:[.15,.1,.2],scale:[.07,.1,.12],color:"#b09b7c"},{part:"eye",at:[-.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"},{part:"eye",at:[.12,.51,.36],scale:[.025,.03,.018],color:"#211c19"}]};function EM(i){const t=[],e=[],n=[],s=new Fi(1,10,8).toNonIndexed(),r=s.getAttribute("position"),o=s.getAttribute("normal"),a=new Ht,c=new Jt;for(const h of Gf[i]){if(h.part==="paw")continue;const u=new En(h.tilt||0,0,0),f=new se().compose(new z(...h.at),new Kn().setFromEuler(u),new z(...h.scale));c.getNormalMatrix(f),a.set(h.color);for(let p=0;p<r.count;p++){const g=new z().fromBufferAttribute(r,p).applyMatrix4(f),x=new z().fromBufferAttribute(o,p).applyMatrix3(c).normalize();t.push(g.x,g.y,g.z),e.push(x.x,x.y,x.z),n.push(a.r,a.g,a.b)}}s.dispose();const l=new ve;return l.setAttribute("position",new jt(t,3)),l.setAttribute("normal",new jt(e,3)),l.setAttribute("color",new jt(n,3)),l.computeBoundingSphere(),l}const TM={light:96,heavy:176,storm:256},AM={light:16,heavy:23,storm:30},Vn=1.25;class RM{constructor(t){this.root=new te,this.root.name="Visible rain",t.add(this.root),this.geometry=new ve,this.material=new uf({color:"#e5f2f4",transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1}),this.lines=new Gp(this.geometry,this.material),this.lines.frustumCulled=!1,this.lines.renderOrder=20,this.root.add(this.lines),this.randomState=8029,this.positions=new Float32Array(0),this.drops=[],this.active=0,this.fallbackCamera=new Uo(-30,30,20,-20,.1,180),this.fallbackCamera.position.set(0,36,29),this.fallbackCamera.lookAt(0,0,-2)}random(){return this.randomState=Math.imul(this.randomState,1664525)+1013904223>>>0,this.randomState/4294967296}resize(t){t!==this.active&&(this.active=t,this.positions=new Float32Array(t*6),this.drops=Array.from({length:t},()=>({x:(this.random()*2-1)*Vn,y:(this.random()*2-1)*Vn})),this.geometry.setAttribute("position",new Ge(this.positions,3)),this.geometry.setDrawRange(0,t*2))}update(t,{weather:e={},camera:n=this.fallbackCamera,paused:s=!1}={}){const r=e.kind||e.type,o=Math.max(0,Math.min(1,e.rainIntensity??e.intensity??0)),a=r==="storm"||e.severity>=.78?"storm":r==="heavy-rain"||o>=.68?"heavy":r==="rain"&&o>.02?"light":null;if(this.resize(a?TM[a]:0),!this.active)return;this.material.opacity=a==="light"?.48:a==="heavy"?.6:.7;const c=s?0:Math.min(.1,Math.max(0,Number(t)||0)),l=Math.max(-8,Math.min(8,e.windIntensity??e.wind??0)),h=AM[a],u=a==="storm"?(l<0?-1:1)*Math.max(10,Math.abs(l)*16):l*3,f=new z(u,-h,0),p=a==="light"?.8:a==="heavy"?1.3:1.8;n.updateMatrixWorld(!0);const x=new z(0,0,0).unproject(n).clone().add(f).project(n);for(let m=0;m<this.active;m++){const d=this.drops[m];d.x+=x.x*c,d.y+=x.y*c,d.y<-Vn&&(d.y+=Vn*2,d.x=(this.random()*2-1)*Vn),d.x>Vn&&(d.x-=Vn*2),d.x<-Vn&&(d.x+=Vn*2);const M=new z(d.x,d.y,0).unproject(n),v=M.clone().addScaledVector(f,p/h);M.toArray(this.positions,m*6),v.toArray(this.positions,m*6+3)}this.geometry.attributes.position.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose(),this.root.removeFromParent()}}const CM=(i,t,e)=>Math.max(t,Math.min(e,i));function PM(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296}class zM{constructor(t){this.scene=t,this.root=new te,this.root.name="Meadow nature",t.add(this.root),this.resources=new Set,this.time=0,this.wildlife=[],this.batches={},this.transform=new we}own(t){return this.resources.add(t),t}clear(){this.root.traverse(t=>{t.isInstancedMesh&&t.dispose()}),this.root.clear(),this.resources.forEach(t=>t.dispose()),this.resources.clear(),this.rainView?.dispose(),this.rainView=null,this.wildlife=[],this.batches={},this.precipitation=null}batch(t,e,n,s){const r=new oi(e,n,s);return r.instanceMatrix.setUsage(gs),r.frustumCulled=!1,this.root.add(r),this.batches[t]=r,r}setLevel(t){this.clear(),this.level=t,this.time=0,this.weather=kf(t);const e=PM((t.seed||42)+71053),n=t.bounds,s=n.maxX-n.minX,r=n.maxZ-n.minZ,o=[t.dog||t.spawn,...t.animals||[]].filter(Boolean),a=this.own(new Fi(1,10,8)),c=xM(t),l=["butterfly","bird","squirrel","rabbit"];for(const u of l){const f=c[u]||0;if(f)for(let p=0;p<f;p++){let g=null;for(let x=0;x<240;x++){const m=(t.roads||[]).flatMap(y=>y.points||[y.from,y.to]).filter(Boolean),d=x<120&&m.length?m[Math.floor(e()*m.length)]:null,M=e()*Math.PI*2,v=8+e()*13,_=d?{x:d.x+Math.cos(M)*v,z:d.z+Math.sin(M)*v}:{x:n.minX+2+e()*(s-4),z:n.minZ+2+e()*(r-4)};if(MM(t,_,o,.5)){g=_;break}}this.wildlife.push({kind:u,slot:p,x:g?.x??0,z:g?.z??0,homeX:g?.x??0,homeZ:g?.z??0,phase:e()*Math.PI*2,heading:e()*Math.PI*2,visible:!!g,gait:0,hidden:!1,hideTimer:0})}}const h={bird:["#54777b","#91adb0"],butterfly:["#65523f","#f2ac75"]};for(const u of["bird","butterfly"]){const f=c[u]||0;if(!f)continue;const[p,g]=h[u];this.batch(`${u}Body`,a,this.own(new ce({color:p,roughness:1})),f),this.batch(`${u}Wing`,a,this.own(new ce({color:g,roughness:1})),f*2)}for(const u of["squirrel","rabbit"]){const f=c[u]||0;if(!f)continue;this.batch(`${u}Body`,this.own(EM(u)),this.own(new ce({vertexColors:!0,roughness:.94})),f);const p=u==="squirrel"?"#74503b":"#b09b7c";this.batch(`${u}Paw`,a,this.own(new ce({color:p,roughness:.94})),f*2)}this.rainView=new RM(this.root),this.update(0,{dog:t.dog||t.spawn,animals:t.animals})}pose(t,e,n,s,r,o,a,c,l=0,h=0,u=0){const f=this.transform;f.position.set(n,s,r),f.rotation.set(u,l,h),f.scale.set(o,a,c),f.updateMatrix(),t.setMatrixAt(e,f.matrix)}hideParts(t){if(t.kind==="bird"||t.kind==="butterfly"){this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Wing`],t.slot*2+e,0,-100,0,0,0,0)}else{this.pose(this.batches[`${t.kind}Body`],t.slot,0,-100,0,0,0,0);for(let e=0;e<2;e++)this.pose(this.batches[`${t.kind}Paw`],t.slot*2+e,0,-100,0,0,0,0)}}update(t,{dog:e,animals:n=[],camera:s,paused:r=!1}={}){if(!this.level)return;t=r?0:CM(Number(t)||0,0,.1),this.time+=t,gM(this.weather,t);const o=this.time,a=[e,...n,...this.level.helpers||[]].filter(Boolean);for(const c of this.wildlife){if(bM(this.level,c,t,a,o,this.weather),!c.visible||c.hidden){this.hideParts(c);continue}const l=c.kind==="bird"||c.kind==="butterfly",h=c.kind==="squirrel",u=c.kind==="rabbit",f=((c.gait||0)%1+1)%1,p=f<.54,g=u&&c.moving&&p?Math.sin(f/.54*Math.PI)*.24:h&&c.moving?Math.abs(Math.sin(f*Math.PI*2))*.1:0,x=Math.max(.06,1-(c.shelter||0)*.94),m=(h?.12:u?.04:l?3.2:1)+qn(this.level,c.x,c.z)+(l?Math.sin(o*(c.kind==="bird"?1.5:2)+c.phase)*.28:g)+(c.alert?.08:0);if(h||u){const d=u&&!p?.9:1,M=u&&p?-.14*Math.sin(f/.54*Math.PI):0,v=h&&c.moving?Math.sin(f*Math.PI*2)*.06:0;this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,x,x*d,x,c.heading,v,M);const _=Gf[c.kind].filter(y=>y.part==="paw");for(let y=0;y<_.length;y++){const E=_[y],C=c.moving?u&&p?Math.sin(f/.54*Math.PI)*.08:Math.sin(f*Math.PI*2+y*Math.PI)*.07:0,L=E.at[0],S=E.at[2],T=c.x+Math.cos(c.heading)*L+Math.sin(c.heading)*S,U=c.z-Math.sin(c.heading)*L+Math.cos(c.heading)*S;this.pose(this.batches[`${c.kind}Paw`],c.slot*2+y,T,m+E.at[1]*x+C,U,E.scale[0]*x,E.scale[1]*x,E.scale[2]*x,c.heading)}}else{this.pose(this.batches[`${c.kind}Body`],c.slot,c.x,m,c.z,(c.kind==="bird"?.09:.075)*x,(c.kind==="bird"?.08:.06)*x,(c.kind==="bird"?.28:.12)*x,c.heading);for(let d=0;d<2;d++){const M=Math.sin(o*(c.kind==="bird"?11:18)+c.phase)*(c.kind==="bird"?.5:.85);this.pose(this.batches[`${c.kind}Wing`],c.slot*2+d,c.x+(d?1:-1)*.15,m+.04,c.z,.22*x,.025*x,.16*x,c.heading,(d?1:-1)*M)}}}for(const c of Object.values(this.batches))c.instanceMatrix.needsUpdate=!0;this.rainView?.update(t,{weather:this.weather,camera:s,paused:r})}dispose(){this.clear(),this.scene.remove(this.root),this.level=null}}const xo=0,DM=1,IM=new z,du=new Cm,Oa=new si,pu=new z,ro=new rn;class LM{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new mu,this.unassigned=new mu,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new UM(t[e]));this._compute()}return this}setFromObject(t){const e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){const s=n.geometry;if(s!==void 0){const r=s.attributes.position;if(r!==void 0)for(let o=0,a=r.count;o<a;o++){const c=new z;c.fromBufferAttribute(r,o).applyMatrix4(n.matrixWorld),e.push(c)}}}),this.setFromPoints(e)}containsPoint(t){const e=this.faces;for(let n=0,s=e.length;n<s;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){const n=this.faces;let s=-1/0,r=1/0;for(let o=0,a=n.length;o<a;o++){const c=n[o],l=c.distanceToPoint(t.origin),h=c.normal.dot(t.direction);if(l>0&&h>=0)return null;const u=h!==0?-l/h:0;if(!(u<=0)&&(h>0?r=Math.min(u,r):s=Math.max(u,s),s>r))return null}return s!==-1/0?t.at(s,e):t.at(r,e),e}intersectsRay(t){return this.intersectRay(t,IM)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}_removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}_removeAllVerticesFromFace(t){if(t.outside!==null){const e=t.outside;let n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}_deleteFaceVertices(t,e){const n=this._removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let s=n;do{const r=s.next;e.distanceToPoint(s.point)>this.tolerance?this._addVertexToFace(s,e):this.unassigned.append(s),s=r}while(s!==null)}return this}_resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{const n=e.next;let s=this.tolerance,r=null;for(let o=0;o<t.length;o++){const a=t[o];if(a.mark===xo){const c=a.distanceToPoint(e.point);if(c>s&&(s=c,r=a),s>1e3*this.tolerance)break}}r!==null&&this._addVertexToFace(e,r),e=n}while(e!==null)}return this}_computeExtremes(){const t=new z,e=new z,n=[],s=[];for(let r=0;r<3;r++)n[r]=s[r]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let r=0,o=this.vertices.length;r<o;r++){const a=this.vertices[r],c=a.point;for(let l=0;l<3;l++)c.getComponent(l)<t.getComponent(l)&&(t.setComponent(l,c.getComponent(l)),n[l]=a);for(let l=0;l<3;l++)c.getComponent(l)>e.getComponent(l)&&(e.setComponent(l,c.getComponent(l)),s[l]=a)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:s}}_computeInitialHull(){const t=this.vertices,e=this._computeExtremes(),n=e.min,s=e.max;let r=0,o=0;for(let f=0;f<3;f++){const p=s[f].point.getComponent(f)-n[f].point.getComponent(f);p>r&&(r=p,o=f)}const a=n[o],c=s[o];let l,h;r=0,du.set(a.point,c.point);for(let f=0,p=this.vertices.length;f<p;f++){const g=t[f];if(g!==a&&g!==c){du.closestPointToPoint(g.point,!0,pu);const x=pu.distanceToSquared(g.point);x>r&&(r=x,l=g)}}r=-1,Oa.setFromCoplanarPoints(a.point,c.point,l.point);for(let f=0,p=this.vertices.length;f<p;f++){const g=t[f];if(g!==a&&g!==c&&g!==l){const x=Math.abs(Oa.distanceToPoint(g.point));x>r&&(r=x,h=g)}}const u=[];if(Oa.distanceToPoint(h.point)<0){u.push(vn.create(a,c,l),vn.create(h,c,a),vn.create(h,l,c),vn.create(h,a,l));for(let f=0;f<3;f++){const p=(f+1)%3;u[f+1].getEdge(2).setTwin(u[0].getEdge(p)),u[f+1].getEdge(1).setTwin(u[p+1].getEdge(0))}}else{u.push(vn.create(a,l,c),vn.create(h,a,c),vn.create(h,c,l),vn.create(h,l,a));for(let f=0;f<3;f++){const p=(f+1)%3;u[f+1].getEdge(2).setTwin(u[0].getEdge((3-f)%3)),u[f+1].getEdge(0).setTwin(u[p+1].getEdge(1))}}for(let f=0;f<4;f++)this.faces.push(u[f]);for(let f=0,p=t.length;f<p;f++){const g=t[f];if(g!==a&&g!==c&&g!==l&&g!==h){r=this.tolerance;let x=null;for(let m=0;m<4;m++){const d=this.faces[m].distanceToPoint(g.point);d>r&&(r=d,x=this.faces[m])}x!==null&&this._addVertexToFace(g,x)}}return this}_reindexFaces(){const t=[];for(let e=0;e<this.faces.length;e++){const n=this.faces[e];n.mark===xo&&t.push(n)}return this.faces=t,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0;const n=this.assigned.first().face;let s=n.outside;do{const r=n.distanceToPoint(s.point);r>e&&(e=r,t=s),s=s.next}while(s!==null&&s.face===n);return t}}_computeHorizon(t,e,n,s){this._deleteFaceVertices(n),n.mark=DM;let r;e===null?r=e=n.getEdge(0):r=e.next;do{const o=r.twin,a=o.face;a.mark===xo&&(a.distanceToPoint(t)>this.tolerance?this._computeHorizon(t,o,a,s):s.push(r)),r=r.next}while(r!==e);return this}_addAdjoiningFace(t,e){const n=vn.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}_addNewFaces(t,e){this.newFaces=[];let n=null,s=null;for(let r=0;r<e.length;r++){const o=e[r],a=this._addAdjoiningFace(t,o);n===null?n=a:a.next.setTwin(s),this.newFaces.push(a.face),s=a}return n.next.setTwin(s),this}_addVertexToHull(t){const e=[];return this.unassigned.clear(),this._removeVertexFromFace(t,t.face),this._computeHorizon(t.point,null,t.face,e),this._addNewFaces(t,e),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let t;for(this._computeInitialHull();(t=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(t);return this._reindexFaces(),this._cleanup(),this}}class vn{constructor(){this.normal=new z,this.midpoint=new z,this.area=0,this.constant=0,this.outside=null,this.mark=xo,this.edge=null}static create(t,e,n){const s=new vn,r=new Ba(t,s),o=new Ba(e,s),a=new Ba(n,s);return r.next=a.prev=o,o.next=r.prev=a,a.next=o.prev=r,s.edge=r,s.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){const t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return ro.set(t.point,e.point,n.point),ro.getNormal(this.normal),ro.getMidpoint(this.midpoint),this.area=ro.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}}class Ba{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){const t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}}class UM{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}}class mu{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}}class NM extends ve{constructor(t=[]){super();const e=[],n=[],r=new LM().setFromPoints(t).faces;for(let o=0;o<r.length;o++){const a=r[o];let c=a.edge;do{const l=c.head().point;e.push(l.x,l.y,l.z),n.push(a.normal.x,a.normal.y,a.normal.z),c=c.next}while(c!==a.edge)}this.setAttribute("position",new jt(e,3)),this.setAttribute("normal",new jt(n,3))}}function FM(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new ve;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const p=i[f].index;for(let g=0;g<p.count;++g)u.push(p.getX(g)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=gu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const p=[];for(let x=0;x<o[h].length;++x)p.push(o[h][x][f]);const g=gu(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function gu(i){let t,e,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new Ge(o,e,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let f=0,p=h.count;f<p;f++)for(let g=0;g<e;g++){const x=h.getComponent(f,g);a.setComponent(f+u,g,x)}}else o.set(h.array,c);c+=h.count*e}return s!==void 0&&(a.gpuType=s),a}function OM(i,t=1e-4){t=Math.max(t,Number.EPSILON);const e={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let M=0,v=a.length;M<v;M++){const _=a[M],y=i.attributes[_];c[_]=new y.constructor(new y.array.constructor(y.count*y.itemSize),y.itemSize,y.normalized);const E=i.morphAttributes[_];E&&(l[_]||(l[_]=[]),E.forEach((C,L)=>{const S=new C.array.constructor(C.count*C.itemSize);l[_][L]=new C.constructor(S,C.itemSize,C.normalized)}))}const p=t*.5,g=Math.log10(1/t),x=Math.pow(10,g),m=p*x;for(let M=0;M<r;M++){const v=n?n.getX(M):M;let _="";for(let y=0,E=a.length;y<E;y++){const C=a[y],L=i.getAttribute(C),S=L.itemSize;for(let T=0;T<S;T++)_+=`${~~(L[u[T]](v)*x+m)},`}if(_ in e)h.push(e[_]);else{for(let y=0,E=a.length;y<E;y++){const C=a[y],L=i.getAttribute(C),S=i.morphAttributes[C],T=L.itemSize,U=c[C],k=l[C];for(let B=0;B<T;B++){const W=u[B],R=f[B];if(U[R](o,L[W](v)),S)for(let b=0,N=S.length;b<N;b++)k[b][R](o,S[b][W](v))}}e[_]=o,h.push(o),o++}}const d=i.clone();for(const M in i.attributes){const v=c[M];if(d.setAttribute(M,new v.constructor(v.array.slice(0,o*v.itemSize),v.itemSize,v.normalized)),M in l)for(let _=0;_<l[M].length;_++){const y=l[M][_];d.morphAttributes[M][_]=new y.constructor(y.array.slice(0,o*y.itemSize),y.itemSize,y.normalized)}}return d.setIndex(h),d}function Hf(){const i=new te,t=new Set,e=new Set;return i.ownGeometry=n=>(t.add(n),n),i.ownMaterial=n=>(e.add(n),n),i.dispose=()=>{i.traverse(n=>{n.isInstancedMesh&&n.dispose()}),t.forEach(n=>n.dispose()),e.forEach(n=>n.dispose())},i}function BM(i=[]){const t=Hf(),e=t.ownMaterial(new ce({color:"#a97640",roughness:.9})),n=t.ownMaterial(new ce({color:"#4e594b",roughness:.7})),s=t.ownGeometry(new bn(1,1,1)),r=[],o=t.ownGeometry(new Vi(or,or+.1,.16,12)),a=t.ownMaterial(new ce({color:"#d54b45",roughness:.8})),c=t.ownMaterial(new ce({color:"#55b76b",roughness:.8})),l=new Map,h=(f,p,g,x,m,d,M)=>{let v=l.get(f);v||l.set(f,v=new Map);let _=v.get(M);_||v.set(M,_=[]),_.push({x:p,y:g,w:x,h:m,d})};for(const f of i.filter(p=>p.operable)){const p=new te;p.position.set(f.x,0,f.z),p.rotation.y=f.heading,t.add(p);for(const m of[-f.width/2,f.width/2])h(p,m,.85,.22,1.7,.3,n);const g=new te;g.name="gate-panel",p.add(g);for(const m of[.45,1.2])h(g,0,m,f.width,.15,.22,e);for(let m=0;m<=Math.ceil(f.width/1.2);m++)h(g,-f.width/2+f.width*m/Math.ceil(f.width/1.2),.82,.14,1.05,.19,e);h(g,f.width/2-.35,.85,.24,.28,.3,n);const x=Nf(f).map(m=>{const d=new ie(o,a);return d.name="gate-button",d.position.set(m.x,.13,m.z),d.receiveShadow=!0,t.add(d),d});r.push({gate:f,panel:g,buttons:x})}const u=new se;for(const[f,p]of l)for(const[g,x]of p){const m=new oi(s,g,x.length);x.forEach((d,M)=>{u.makeScale(d.w,d.h,d.d),u.setPosition(d.x,d.y,0),m.setMatrixAt(M,u)}),m.castShadow=m.receiveShadow=!0,f.add(m)}return t.update=()=>{for(const{gate:f,panel:p,buttons:g}of r){p.position.x=f.open?-f.width:0;for(const x of g)x.material=f.open?c:a}},t.update(),t}function kM(i){let t=i>>>0;return()=>(t=Math.imul(t,1664525)+1013904223>>>0,t/4294967296)}function GM(i){const t=[];for(let p=0;p<3;p++)for(const g of[-1,1])for(const x of[-.34,.34])for(const m of[-.34,.34]){const d=new z;d.setComponent(p,g*.5),d.setComponent((p+1)%3,x),d.setComponent((p+2)%3,m);const M=1+.13*Math.sin(d.x*11+d.y*7+d.z*9+i*2.7);d.multiplyScalar(M),d.x+=d.y*(i-1)*.16,t.push(d)}const e=new NM(t),n=e.attributes.position;for(let p=0;p<n.count;p++){const g=n.getX(p),x=n.getY(p),m=n.getZ(p),d=1+.06*Math.sin(g*8+x*5+m*7+i*2.3);n.setXYZ(p,g*d,x*d,m*d)}e.deleteAttribute("normal");const s=OM(e);e.dispose(),s.computeBoundingBox();const r=new z,o=new z;s.boundingBox.getSize(r),s.boundingBox.getCenter(o),s.translate(-o.x,-o.y,-o.z),s.scale(1/r.x,1/r.y,1/r.z),s.computeVertexNormals(),s.computeBoundingBox();const a=[],c=s.attributes.position,l=new Ht("#eee7d5"),h=new Ht("#68785a"),u=new Ht("#ffffff"),f=new Ht;for(let p=0;p<c.count;p++){const g=c.getX(p),x=c.getY(p),m=c.getZ(p),d=Math.sin(g*15+m*13+i*3)*Math.sin(x*11-m*9);f.copy(u).multiplyScalar(.91+.09*Math.sin(g*8+x*12+m*6+i)),d>.24&&f.lerp(l,(d-.24)*.42),x<-.05&&d<.3&&f.lerp(h,Math.min(.34,(-x+.05)*.55)),a.push(f.r,f.g,f.b)}return s.setAttribute("color",new jt(a,3)),s}function HM(i=[]){const t=Hf(),e=t.ownMaterial(new ce({color:"#ffffff",roughness:1,vertexColors:!0})),n=[[],[],[]],s=["#aba595","#c2b59d","#8b9189","#c5bfac","#969d97","#aaa99b","#858c7d","#b4a28d"];for(const p of i.filter(g=>g.material==="stone")){const{a:g,b:x}=p,m=Math.hypot(x.x-g.x,x.z-g.z);if(m<.001)continue;const d=kM(Math.round(g.x*997+g.z*7919+x.x*104729+x.z*1543)),M=-Math.atan2(x.z-g.z,x.x-g.x);for(let v=0;v<4;v++){const _=v===3,E=Math.max(1,Math.ceil(m/(_?.48:v===0?1.24:.98))),C=Array.from({length:E},()=>.45+d()*1.2),L=C.reduce((T,U)=>T+U,0);let S=0;for(const T of C){const U=m*T/L,k=S+U,B=(S+k)/2,W=Math.max(1e-4,U-Math.min(.018,U*.08)),R=_?.19+d()*.2:.29+d()*.105,b=(d()-.5)*2*Math.min(.065,W/(R*2)),N=Math.abs(Math.sin(b)),D=Math.cos(b),Y=Math.max(1e-5,(W-R*N)/D),q=(Y*N+R*D)/2,F=Math.sin(B*.79+g.x*.13+g.z*.17)*.035;n[Math.floor(d()*3)].push({x:g.x+(x.x-g.x)*B/m,z:g.z+(x.z-g.z)*B/m,yaw:M+(d()<.5?Math.PI:0),tilt:b,y:v===0?q+.005:_?1.1+F+(d()-.5)*.055:.175+v*.325+F+(d()-.5)*.04,width:Y,height:R,depth:(_?.43:.59-v*.055)*(.94+d()*.06),color:s[Math.floor(d()*s.length)]}),S=k}}}const r=new se,o=new Kn,a=new Kn,c=new z(0,1,0),l=new z(0,0,1),h=new z,u=new z,f=new Ht;for(const[p,g]of n.entries()){if(!g.length)continue;const x=new oi(t.ownGeometry(GM(p)),e,g.length);x.name="clay-drystone",g.forEach((m,d)=>{u.set(m.x,m.y,m.z),o.setFromAxisAngle(c,m.yaw).multiply(a.setFromAxisAngle(l,m.tilt)),h.set(m.width,m.height,m.depth),r.compose(u,o,h),x.setMatrixAt(d,r),x.setColorAt(d,f.set(m.color))}),x.castShadow=x.receiveShadow=!0,t.add(x)}return t}class VM{constructor(t,e,{halfExtent:n=t.radius+1.4,opacity:s=.7}={}){this.target=t,this.halfExtent=n,this.opacity=s,this.covered=new Set,this.disposed=!1,this.parts=e.map(r=>{const o=r.material,a=o.clone();return r.material=a,r.geometry.computeBoundingBox(),{mesh:r,original:o,material:a,shadow:r.castShadow,alpha:1}}),this.cameraLocal=new z,this.cameraDirection=new z,this.up=new z(0,1,0)}update(t,e,n){if(this.disposed||!Number.isFinite(n)||n<=0)return;t.updateMatrixWorld(!0),t.getWorldDirection(this.cameraDirection).negate(),this.cameraLocal.copy(this.cameraDirection).applyAxisAngle(this.up,-(this.target.heading||0));const s=new Set;Math.abs(this.cameraLocal.x)>.02&&s.add(this.cameraLocal.x>=0?"+x":"-x"),Math.abs(this.cameraLocal.z)>.02&&s.add(this.cameraLocal.z>=0?"+z":"-z");const r=this.target.heading||0,o=Math.cos(r),a=Math.sin(r),c=[],l=new Set(e);for(const u of this.covered)l.has(u)||this.covered.delete(u);for(const u of e){const f=u.x-this.target.x,p=u.z-this.target.z,g=f*o-p*a,x=f*a+p*o,m=u.type==="cow"?.65*Es(u):.4,d=this.halfExtent+m+(this.covered.has(u)?.18:0);Math.abs(g)<=d&&Math.abs(x)<=d?(this.covered.add(u),c.push({actor:u,radius:m})):this.covered.delete(u)}const h=-Math.expm1(-12*Math.min(n,.25));for(const u of this.parts){const{mesh:f,material:p}=u,x=c.length>0&&(f.userData.coverKind==="roof"||s.has(f.userData.coverSide))?this.opacity:1;u.alpha+=(x-u.alpha)*h,Math.abs(u.alpha-x)<.001&&(u.alpha=x),p.opacity=u.original.opacity*u.alpha;const m=u.alpha<1;p.transparent!==(m||u.original.transparent)&&(p.transparent=m||u.original.transparent,p.needsUpdate=!0),p.depthWrite=m?!1:u.original.depthWrite,f.castShadow=m?!1:u.shadow}}dispose(){if(!this.disposed){this.disposed=!0;for(const{mesh:t,original:e,material:n,shadow:s}of this.parts)t.material=e,t.castShadow=s,n.dispose();this.parts=[],this.covered.clear()}}}class WM{constructor(){this.centers={value:Array.from({length:4},()=>new z(0,-1e3,0))},this.buddyCenters={value:Array.from({length:4},()=>new z(0,-1e3,0))},this.buddyRadius={value:.4},this.radius={value:.54},this.strength={value:.85*.7},this.tint={value:new Ht("#39bfff")}}install(t){const e=t.onBeforeCompile,s=t.customProgramCacheKey.bind(t)();return t.onBeforeCompile=(r,o)=>{e.call(t,r,o),Object.assign(r.uniforms,{pipGlowCenters:this.centers,pipGlowRadius:this.radius,pipGlowTint:this.tint,pipGlowStrength:this.strength}),Object.assign(r.uniforms,{buddyGlowCenters:this.buddyCenters,buddyGlowRadius:this.buddyRadius}),r.vertexShader=`varying vec3 pipSurfaceWorld;
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
        totalEmissiveRadiance+=pipGlowTint*min(pipGlowAmount,1.0)*pipGlowStrength*smoothstep(0.45,0.9,pipWorldNormal.y);`)},t.customProgramCacheKey=()=>s+"|pip-ground-glow-v3",t.needsUpdate=!0,t}update(t,e,n=null){this.radius.value=.54*t.scale.x,t.userData.parts.pods.forEach((s,r)=>{const o=this.centers.value[r];o.copy(s),t.localToWorld(o),o.y=e(o.x,o.z)}),this.buddyRadius.value=.54*(n?.scale.x||.75),this.buddyCenters.value.forEach((s,r)=>{if(!n){s.set(0,-1e3,0);return}s.copy(n.userData.parts.pods[r]),n.localToWorld(s),s.y=e(s.x,s.z)})}}function xu(i,t=.033){const e=new ve,n=cn(i).corners;return e.setAttribute("position",new jt(n.flatMap(s=>[s.x,t,s.z]),3)),e.setAttribute("uv",new jt([0,0,1,0,1,1,0,1],2)),e.setIndex([0,1,2,0,2,3]),e.computeVertexNormals(),e}function XM(i,t=.26,e=.04){const n=cn(i),s=Math.max(0,n.halfLength-t),r=Math.max(0,n.halfWidth-t),o=[[-s,-r],[s,-r],[s,r],[-s,r]].map(([l,h])=>Ii(i,l,h)),a=new ve,c=[];a.setAttribute("position",new jt([...n.corners,...o].flatMap(l=>[l.x,e,l.z]),3));for(let l=0;l<4;l++){const h=(l+1)%4;c.push(l,h,h+4,l,h+4,l+4)}return a.setIndex(c),a.computeVertexNormals(),a}function qM(i,t,e){const n=cn(t).corners;i.fillStyle="#f9e7a2",i.strokeStyle="#fff0b5",i.lineWidth=1,i.beginPath(),n.forEach((s,r)=>{const o=e(s);r?i.lineTo(o.x,o.y):i.moveTo(o.x,o.y)}),i.closePath(),i.fill(),i.stroke()}const qe=1e-9,oo=(i,t)=>i.x*t.z-i.z*t.x,$s=(i,t)=>({x:i.x-t.x,z:i.z-t.z});function YM(i,t=0){const e=[],n=[],s=[];for(const p of i){const g=[];s.push(g);for(let x=0;x<p.length;x++){const m=p[x],d=p[(x+1)%p.length];if(n.push(m.x),Math.abs(m.x-d.x)>qe){const M={a:m,b:d,min:Math.min(m.x,d.x),max:Math.max(m.x,d.x),id:e.length};e.push(M),g.push(M)}}}for(let p=0;p<e.length;p++)for(let g=p+1;g<e.length;g++){const x=e[p],m=e[g];if(x.max<=m.min||m.max<=x.min)continue;const d=$s(x.b,x.a),M=$s(m.b,m.a),v=oo(d,M);if(Math.abs(v)<qe)continue;const _=$s(m.a,x.a),y=oo(_,M)/v,E=oo(_,d)/v;y>qe&&y<1-qe&&E>qe&&E<1-qe&&n.push(x.a.x+y*d.x)}n.sort((p,g)=>p-g);const r=n.filter((p,g)=>!g||p-n[g-1]>qe),o=[],a=[],c=(p,g)=>p.a.z+(g-p.a.x)*(p.b.z-p.a.z)/(p.b.x-p.a.x),l=(p,g,x)=>{[p,g,x]=[p,g,x].map(d=>({x:Math.fround(d.x),z:Math.fround(d.z)}));const m=oo($s(g,p),$s(x,p));if(!(Math.abs(m)<qe)){m>0&&([g,x]=[x,g]);for(const d of[p,g,x])o.push(d.x,t,d.z),a.push(d.x/4,d.z/4)}};let h=new Map;const u=[];for(let p=1;p<r.length;p++){const g=r[p-1],x=r[p],m=(g+x)/2,d=[];for(const _ of s){const y=_.filter(E=>m>E.min&&m<E.max).sort((E,C)=>c(E,m)-c(C,m));y.length>=2&&d.push({low:y[0],high:y[y.length-1]})}d.sort((_,y)=>c(_.low,m)-c(y.low,m));const M=[];for(const _ of d){const y=M[M.length-1];y&&c(_.low,m)<=c(y.high,m)+qe?c(_.high,m)>c(y.high,m)&&(y.high=_.high):M.push({..._})}const v=new Map;for(const{low:_,high:y}of M){const E=`${_.id}:${y.id}`,C=h.get(E);C?(C.right=x,v.set(E,C),h.delete(E)):v.set(E,{low:_,high:y,left:g,right:x})}u.push(...h.values()),h=v}u.push(...h.values());for(const{low:p,high:g,left:x,right:m}of u){const d={x,z:c(p,x)},M={x:m,z:c(p,m)},v={x:m,z:c(g,m)},_={x,z:c(g,x)};l(d,M,v),l(d,v,_)}const f=new ve;return f.setAttribute("position",new jt(o,3)),f.setAttribute("uv",new jt(a,2)),f.computeVertexNormals(),f}function ao(i,t,{ragged:e=!1,y:n=.008,seed:s=1}={}){let r=s,o=0;const a=i.map((h,u)=>(u&&(o+=Math.hypot(h.x-i[u-1].x,h.z-i[u-1].z)),r=r*1664525+1013904223>>>0,e?Math.sin(o*.72)*.11+(r/4294967296-.5)*.17:0)),c=[],l=[];for(let h=1;h<i.length;h++){const u=i[h-1],f=i[h],p=Math.hypot(f.x-u.x,f.z-u.z);if(p<qe)continue;const g=-(f.z-u.z)/p,x=(f.x-u.x)/p,m=(v,_,y)=>({x:v.x+g*(t/2*y+_),z:v.z+x*(t/2*y+_)}),d=[m(u,a[h-1],-1),m(u,a[h-1],1)],M=[m(f,a[h],-1),m(f,a[h],1)];c.push([d[0],M[0],M[1],d[1]]),l[h-1]&&c.push([u,l[h-1][0],d[0]],[u,l[h-1][1],d[1]]),l[h]=M}return YM(c,n)}function ZM(i,t){const e=[],n=[];for(let s=0;s<i.length;s++){const r=i[s],o=i[(s+1)%i.length],a=t(r),c=t(o);if(a>=-qe&&e.push(r),a<=qe&&n.push(r),a*c<-qe*qe){const l=a/(a-c),h={x:r.x+(o.x-r.x)*l,z:r.z+(o.z-r.z)*l};e.push(h),n.push(h)}}return[e,n].filter(s=>s.length>=3)}function _u(i,t,e=1,n=new ve){const r=(i.rivers||[]).flatMap(l=>l.bridges).filter(l=>Math.hypot(l.x-t.x,l.z-t.z)<l.length/2+l.width/2+1.1*e).map(l=>({...l,s:Math.sin(l.heading),c:Math.cos(l.heading),planks:Math.ceil(l.length/.3)})),o=(l,h)=>({x:(l.x-h.x)*h.c-(l.z-h.z)*h.s,z:(l.x-h.x)*h.s+(l.z-h.z)*h.c}),a=[];for(let l=0;l<64;l++){const h=(f,p)=>({x:t.x+Math.cos(f/64*Math.PI*2)*p*e,z:t.z+Math.sin(f/64*Math.PI*2)*p*e});let u=[[h(l,.9),h(l+1,.9),h(l+1,1.1),h(l,1.1)]];for(const f of r){const p=[g=>o(g,f).x-f.width/2,g=>o(g,f).x+f.width/2];for(let g=0;g<=f.planks;g++)p.push(x=>o(x,f).z-(-f.length/2+g*f.length/f.planks));for(const g of p)u=u.flatMap(x=>ZM(x,g))}for(const f of u){const p=f.reduce((x,m)=>({x:x.x+m.x/f.length,z:x.z+m.z/f.length}),{x:0,z:0});let g=.055;for(const x of r){const m=o(p,x);if(Math.abs(m.x)<=x.width/2+qe&&Math.abs(m.z)<x.length/2){const d=Math.min(x.planks-1,Math.floor((m.z/x.length+.5)*x.planks));g=Math.max(g,.18+.12*Math.sin((d+.5)/x.planks*Math.PI)+.04)}}for(let x=1;x<f.length-1;x++)for(const m of[f[0],f[x],f[x+1]])a.push(m.x,g,m.z)}}let c=n.getAttribute("position");return(!c||c.array.length<a.length)&&(c&&n.dispose(),c=new Ge(new Float32Array(3*2**Math.ceil(Math.log2(Math.max(a.length/3,1)))),3),c.setUsage(gs),n.setAttribute("position",c)),c.array.set(a),c.needsUpdate=!0,n.setDrawRange(0,a.length/3),n.boundingSphere=new pi(new z(t.x,.2,t.z),1.1*e+.4),n}const ka=new Map,tn=10,vu=i=>new z(...i),ms=i=>[.07*Math.sin(i*1.8),i,.055*Math.sin(i*2.1)];function $M(i){const t=i.attributes.position,e=i.attributes.treeCenter,n=[0,1,2].map(()=>new Float32Array(t.count*3)),s=new z,r=new z,o=new z,a=new z,c=(h,u)=>new z().fromBufferAttribute(h,u),l=i.index.array;for(let h=0;h<l.length;h+=3){const[u,f,p]=l.slice(h,h+3),g=c(e,u),x=c(t,u).sub(g);s.copy(c(e,f)).sub(g),r.copy(c(e,p)).sub(g),o.copy(c(t,f)).sub(c(e,f)).sub(x),a.copy(c(t,p)).sub(c(e,p)).sub(x);const m=[s.clone().cross(r),s.clone().cross(a).add(o.clone().cross(r)),o.clone().cross(a)];for(let d=0;d<3;d++)for(const M of[u,f,p])n[d][M*3]+=m[d].x,n[d][M*3+1]+=m[d].y,n[d][M*3+2]+=m[d].z}n.forEach((h,u)=>i.setAttribute(`treeNormal${u}`,new Ge(h,3)))}function KM(i=0){if(i=Math.abs(Math.floor(i))%3,ka.has(i))return ka.get(i);const t=[],e=[],n=[],s=[],r=[],o=[],a=(x,m)=>{const d=t.length/3;return t.push(...x),e.push(...m),d},c=(x,m,d)=>n.push(x,m,d),l=[{y:-.06,r:.62},{y:.16,r:.57},{y:.6,r:.49},{y:1.08,r:.4}];let h=.34;for(let x=0;x<4;x++){const m=1.56+.35*x,d=h*.6,M=h*.8,v=l.length;l.push({y:m-.12,r:h},{y:m+.12,r:M});const _=(x*4+i)%tn;r.push({point:ms(m),parentRadius:h,childRadii:[M,d],lower:v,sector:_}),h=M*.89}l.push({y:2.94,r:.075},{y:3.12,r:.025});for(const{y:x,r:m}of l){const d=ms(x),M=[];for(let v=0;v<tn;v++){const _=v*2*Math.PI/tn,y=m+Math.max(0,1-(x+.06)/.3)*.14*Math.pow(Math.cos(_*2+i*.2),4);M.push(a([d[0]+y*Math.cos(_),x,d[2]+y*Math.sin(_)],d))}s.push(M)}for(let x=0;x<s.length-1;x++)for(let m=0;m<tn;m++){const d=r.find(C=>C.lower===x);if(d&&(m-d.sector+tn)%tn<3)continue;const M=(m+1)%tn,v=s[x][m],_=s[x][M],y=s[x+1][m],E=s[x+1][M];c(v,y,_),c(_,y,E)}const u=a(ms(l[0].y),ms(l[0].y)),f=a(ms(3.15),ms(3.15));for(let x=0;x<tn;x++)c(s[0][x],s[0][(x+1)%tn],u),c(s.at(-1)[(x+1)%tn],s.at(-1)[x],f);for(const x of r){const{lower:m,sector:d,point:M,childRadii:v}=x,_=[];for(let B=0;B<=3;B++)_.push(s[m][(d+B)%tn]);for(let B=3;B>=0;B--)_.push(s[m+1][(d+B)%tn]);const y=(d+1.5)*2*Math.PI/tn,E=new z(Math.cos(y),0,Math.sin(y)),C=new z(-Math.sin(y),0,Math.cos(y)),L=2.48+(M[1]-1.56)*.48,S=vu(M).addScaledVector(E,.54);S.y+=.08;const T=vu(M).addScaledVector(E,1.08);T.y=L;let U=_;x.branchRings=[],x.parentRing=s[m],x.continuingRing=s[m+1];for(let B=0;B<4;B++){const W=B/3,R=S.clone().lerp(T,W).addScaledVector(C,.065*Math.sin(W*Math.PI));R.y-=.09*Math.sin(W*Math.PI);const b=T.clone().sub(S).addScaledVector(C,.065*Math.PI*Math.cos(W*Math.PI));b.y-=.09*Math.PI*Math.cos(W*Math.PI),b.normalize();const N=C.clone(),D=N.clone().cross(b).normalize(),Y=v[1]*(1-.78*W),q=[];for(let F=0;F<8;F++){const K=-Math.PI*.625-F*Math.PI/4;q.push(a(R.clone().addScaledVector(N,Math.sin(K)*Y).addScaledVector(D,Math.cos(K)*Y).toArray(),R.toArray()))}for(let F=0;F<8;F++){const K=(F+1)%8;c(U[K],U[F],q[F]),c(U[K],q[F],q[K])}x.branchRings.push({indices:q,center:R.toArray(),radius:Y}),U=q}const k=a(T.clone().addScaledVector(T.clone().sub(S).normalize(),.025).toArray(),T.toArray());for(let B=0;B<8;B++)c(U[(B+1)%8],U[B],k);o.push(T.toArray())}const p=new ve;p.setAttribute("position",new jt(t,3)),p.setAttribute("treeCenter",new jt(e,3));const g=t.map((x,m)=>{const d=t[m-m%3],M=t[m-m%3+1],v=t[m-m%3+2];return .94+.035*Math.sin(d*16+Math.sin(M*2)+v*11)});return p.setAttribute("color",new jt(g,3)),p.setIndex(n),p.computeVertexNormals(),$M(p),p.computeBoundingBox(),p.computeBoundingSphere(),p.userData={forks:r,tips:o,trunkRings:s,trunkProfile:l},ka.set(i,p),p}function Vf(i){const t={value:1};i.userData.treeWidth=t,i.onBeforeCompile=e=>{e.uniforms.treeWidth=t,e.vertexShader=`attribute vec3 treeCenter;
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
vec3 objectNormal = normalize(treeNormal0 + woodWidth * treeNormal1 + woodWidth * woodWidth * treeNormal2);`),e.vertexShader=e.vertexShader.replace("#include <begin_vertex>","vec3 transformed = treeCenter + woodWidth * (position - treeCenter);")},i.customProgramCacheKey=()=>"continuous-tree-v1"}const Ga=(i,t)=>Math.max(-t,Math.min(t,i)),Ha=Math.PI/180,Ks=(i,t,e,n)=>i+(t-i)*-Math.expm1(-e/n),Wf=i=>.05+Math.sin(i*Math.PI*2/2.4)*.04;function Xf(){return{time:0,hover:Wf(0),headYaw:0,roll:0,pitch:0,turnRate:0,filteredSpeed:0,previous:null}}function JM(i,t,e){const n={x:t.x,z:t.z,heading:t.heading??Math.PI/2},s=Math.hypot(t.vx||0,t.vz||0);if(i.previous||(i.previous=n,i.filteredSpeed=s),!(e>0)||!Number.isFinite(e))return i;if(i.time+=e,i.hover=Wf(i.time),Math.hypot(n.x-i.previous.x,n.z-i.previous.z)>3)return i.headYaw=i.roll=i.pitch=i.turnRate=0,i.filteredSpeed=s,i.previous=n,i;const r=n.heading-i.previous.heading,o=Math.atan2(Math.sin(r),Math.cos(r))/e;i.turnRate=Ks(i.turnRate,o,e,.12);const a=-Ga(i.turnRate/Math.max(1,s)*Math.min(1,s)*.28,20*Ha);i.roll=Ks(i.roll,a,e,.2),i.headYaw=Ks(i.headYaw,Ga(i.turnRate*.2,30*Ha),e,.09);const c=Ks(i.filteredSpeed,s,e,.18),l=(c-i.filteredSpeed)/e;return i.filteredSpeed=c,i.pitch=Ks(i.pitch,-Ga(l/6,1)*10*Ha,e,.22),i.previous=n,i}const bs=new Map,jM={TorusGeometry:Lo,SphereGeometry:Fi,BoxGeometry:bn,CylinderGeometry:Vi,ConeGeometry:pr},dn=new Map;let Ee;function QM(i){return .7+.2*Math.max(0,Math.min(1,(i-1.015)/(3.1-1.015)))}function In(i){i.updateMatrixWorld(!0);const t=new Map;i.traverse(n=>{n.isMesh&&(t.has(n.material)||t.set(n.material,[]),t.get(n.material).push(n.geometry.clone().applyMatrix4(n.matrixWorld)))});const e=new te;e.name=i.name,e.userData.parts={};for(const[n,s]of t){const r=FM(s,!1);s.forEach(a=>a.dispose());const o=new ie(r,n);o.castShadow=o.receiveShadow=!0,e.add(o)}return e}function qf(i,t){const e=In(t);return dn.set(i,e),e.clone()}function Bo(i,t){const e=`${i}:${t.join(",")}`;return bs.has(e)||bs.set(e,new jM[i](...t)),bs.get(e)}function ty(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<e.data.length;s+=4){const r=224+(s*13+(s>>>5)*7)%27;e.data[s]=e.data[s+1]=e.data[s+2]=r,e.data[s+3]=255}t.putImageData(e,0,0);const n=new Hi(i);return n.wrapS=n.wrapT=$n,n.repeat.set(2,2),n.colorSpace=De,n}function ey(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.38+Math.sin(s*.051)*1.7),a=Math.sin(Math.hypot(r-78,(s-45)*.4)*.38),c=Math.round(227+o*12+a*4+(r*7+s*11)%7),l=(s*128+r)*4;e.data[l]=e.data[l+1]=e.data[l+2]=c,e.data[l+3]=255}t.putImageData(e,0,0);const n=new Hi(i);return n.wrapS=n.wrapT=$n,n.colorSpace=De,n}function ny(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128);for(let s=0;s<128;s++)for(let r=0;r<128;r++){const o=Math.sin(r*.31+Math.sin(s*.045)*1.65)*8+Math.sin(r*.11+Math.sin(s*.021)*2.6)*5,a=Math.sin(Math.hypot(r-35,(s-74)*.15)*.46)*4,c=(r*17+s*31+r*s%29)%9-4,l=Math.max(0,Math.min(255,Math.round(132+o+a+c))),h=(s*128+r)*4;e.data[h]=l,e.data[h+1]=l,e.data[h+2]=l,e.data[h+3]=255}t.putImageData(e,0,0);const n=new Hi(i);return n.wrapS=n.wrapT=$n,n.repeat.set(1.2,1.7),n}function iy(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createImageData(128,128),n=[[188,203,148],[210,207,153],[164,191,137],[223,207,155],[154,184,133]];for(let r=0;r<128;r++)for(let o=0;o<128;o++){const a=Math.sin(o*.17+Math.sin(r*.11)*1.4)+Math.cos(r*.19-o*.07),c=(o*17+r*31+o*r%29)%13-6,l=n[(Math.floor((a+2)*1.25)+Math.floor(o/19)+Math.floor(r/23))%n.length],h=(r*128+o)*4;e.data[h]=Math.max(0,Math.min(255,l[0]+c)),e.data[h+1]=Math.max(0,Math.min(255,l[1]+c)),e.data[h+2]=Math.max(0,Math.min(255,l[2]+c)),e.data[h+3]=255}t.putImageData(e,0,0);const s=new Hi(i);return s.wrapS=s.wrapT=$n,s.colorSpace=De,s}function Un(){if(Ee)return Ee;const i=ty(),t=o=>new ce({color:o,roughness:.9,map:i}),e=o=>new ce({color:o,roughness:.55,metalness:.18,map:i});Ee={cream:e("#f5ead3"),white:e("#fff8e7"),dark:e("#354b55"),brass:new ce({color:"#ddb469",roughness:.48,metalness:.62}),orange:e("#e6a04e"),dogCream:e("#ffe5ac"),rust:e("#c7704d"),cyan:new ce({color:"#b6fbff",emissive:"#69dfe9",emissiveIntensity:.8,roughness:.32}),mint:e("#84cbb7"),black:e("#20343e"),wood:t("#ba9167"),paleWood:t("#e1bb87"),bark:t("#8b7758"),leaves:t("#8cbd8b"),leavesLight:t("#b8d28f"),leavesDark:t("#619b84"),roof:t("#bf755f"),barn:t("#d9977e"),barnTrim:t("#fae7c2"),flowerPink:t("#f2a6a6"),flowerYellow:t("#ffe28a"),flowerWhite:t("#fff7e5"),flowerCenter:t("#daa661"),stem:t("#7fab72"),stone:t("#abb7a4")},Ee.eye=Ee.white,Ee.pupil=Ee.black;const n=ey();for(const o of["wood","paleWood"])Ee[o].map=n;const s=ny();Ee.bark.map=Ee.bark.bumpMap=s,Ee.bark.bumpScale=.055,Ee.treeWood=Ee.bark.clone(),Ee.treeWood.map=Ee.treeWood.bumpMap=null,Ee.treeWood.vertexColors=!0,Vf(Ee.treeWood);const r=iy();for(const o of["leaves","leavesLight","leavesDark"])Ee[o].map=r;return Ee.leaves.needsUpdate=Ee.leavesLight.needsUpdate=Ee.leavesDark.needsUpdate=!0,Ee}function Ds(i,t,e,n,s=[0,0,0],r=[1,1,1]){const o=new ie(Bo(t,e),n);return o.position.set(...s),o.scale.set(...r),o.castShadow=!0,o.receiveShadow=!0,i.add(o),o}function Bt(i,t,e,n,s=10){return Ds(i,"SphereGeometry",[1,s,6],t,e,n)}function Ye(i,t,e,n,s=.025,r=10){const o=`sculpted-sphere:${s}:${r}`;if(!bs.has(o)){const c=Bo("SphereGeometry",[1,r,Math.max(3,Math.round(r*.6))]).clone(),l=c.attributes.position;for(let h=0;h<l.count;h++){const u=l.getX(h),f=l.getY(h),p=l.getZ(h),g=1+s*Math.sin(u*4.1+p*2.8)*Math.cos(f*3.7-p*1.3);l.setXYZ(h,u*g,f*g,p*g)}c.computeVertexNormals(),bs.set(o,c)}const a=new ie(bs.get(o),t);return a.position.set(...e),a.scale.set(...n),a.castShadow=a.receiveShadow=!0,i.add(a),a}function Ne(i,t,e,n){return Ds(i,"BoxGeometry",[1,1,1],t,e,n)}function Be(i,t,e,n,s,r){const o=Ds(i,"CylinderGeometry",[n,n,s,10],t,e);return r&&o.rotation.set(...r),o}function Oi(i,t,e,n,s,r=.105){Bt(i,t.eye,[e,n,s],[r,r*1.08,r*.55]),Bt(i,t.pupil,[e,n-r*.05,s+r*.45],[r*.43,r*.58,r*.23]),Bt(i,t.white,[e-r*.14,n+r*.2,s+r*.67],[r*.15,r*.15,r*.12],8)}function sy(i,t,e,n,s=t.brass){return Bt(i,s,e,n)}function co(i,t,e,n,s,r=t.dark){const o=new te;return o.position.set(e,s+.1,n),i.add(o),Bt(o,t.brass,[0,0,0],[.105,.105,.105]),Be(o,t.dark,[0,-s*.45,0],.065,s*.85),Bt(o,t.brass,[0,-s*.72,0],[.078,.078,.078]),Bt(o,r,[0,-s+.025,.055],[.115,.1,.17]),o}function ry(){const i=Un(),t=new te,e=new te,n=new ce({color:"#dce4e5",metalness:.45,roughness:.55}),s=new ce({color:"#9caaae",metalness:.55,roughness:.45});Ne(t,n,[0,.83,-.06],[.62,.51,.92]),Ne(t,s,[0,1.095,-.08],[.64,.035,.8]);for(const x of[-1,1]){Ne(t,s,[x*.315,.84,-.08],[.016,.018,.84]),Ne(t,s,[x*.316,.84,-.13],[.018,.48,.018]);for(const m of[-.43,.28])for(const d of[.64,1.03])Bt(t,i.brass,[x*.327,d,m],[.025,.025,.025])}Be(t,i.dark,[0,1.03,.38],.21,.18,[Math.PI/2,0,0]),Ne(e,n,[0,1.32,.47],[.57,.45,.43]),Ne(e,i.dark,[0,1.35,.696],[.49,.25,.025]);const r=Ne(e,n,[0,1.15,.79],[.49,.25,.45]);r.rotation.x=-.18,Ne(e,s,[0,.99,.8],[.46,.04,.42]),Bt(e,i.black,[0,1.2,1.025],[.1,.095,.085]),Oi(e,i,-.135,1.36,.72,.109),Oi(e,i,.135,1.36,.72,.109);for(const x of[-1,1]){const m=Ne(e,n,[x*.28,1.69,.43],[.22,.4,.12]);m.rotation.z=x*-.42,Ne(m,i.dark,[0,0,.52],[.68,.75,.12])}const o=[];for(const x of[-.3,.3])for(const m of[-.35,.29])Ne(t,n,[x,.64,m],[.23,.43,.27]),Be(t,s,[x*1.35,.78,m],.105,.06,[0,0,Math.PI/2]),Be(t,i.dark,[x,.39,m],.12,.09),Be(t,s,[x,.335,m],.13,.05),o.push(new z(x,.3,m));const a=new te,c=new te;a.name="Pip the hovering robot sheepdog",c.name="Pip floating body rig",a.add(c);const l=In(t),h=In(e);l.position.y=-.83,h.position.set(0,1.03-.83,.38);for(const x of h.children)x.geometry.translate(0,-1.03,-.38);c.position.y=.83,c.add(l,h),c.traverse(x=>{x.isMesh&&(x.userData.ownedGeometry=!0,(x.material===n||x.material===s)&&(x.userData.ownedMaterial=!0))});const u=new te;u.position.set(0,.94-.83,-.52),c.add(u);for(let x=0;x<7;x++)Be(u,x%2?i.dark:s,[0,.04+x*.05,-x*.035],.035,.055,[-.6,0,0]);const f=new ce({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.25,roughness:.28}),p=Bt(u,f,[0,.41,-.27],[.075,.075,.075]);p.userData.ownedMaterial=!0;const g=o.map(x=>Array.from({length:3},(m,d)=>{const M=new nn({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),v=new ie(Bo("TorusGeometry",[.135,.014,6,24]),M);return v.name=`Pip thruster ring ${d+1}`,v.rotation.x=Math.PI/2,v.userData.ownedMaterial=!0,a.add(v),v}));return a.userData.parts={body:l,rig:c,head:h,legs:[],tail:u,tailLight:p,basePods:o.map(x=>x.clone().add(new z(0,-.83,0))),pods:o,rings:g},a.userData.motion=Xf(),Ro(a,{x:0,z:0,heading:0,vx:0,vz:0},0),a.userData.motion.previous=null,a.userData.hover={time:0,previous:null,trails:[]},a}function oy(){const i=Un(),t=new te,e=new te,n=[],s=new ce({color:"#d4dfe0",metalness:.28,roughness:.68}),r=new ce({color:"#eee5d5",metalness:.12,roughness:.82}),o=new ce({color:"#b8b1a7",metalness:.24,roughness:.72}),a=new ce({color:"#4a4a43",metalness:.08,roughness:.6});Ye(t,s,[0,.83,-.08],[.3,.27,.42],.012,12),Ne(t,r,[0,.78,.27],[.39,.27,.28]),Ne(t,o,[0,.61,.31],[.3,.045,.19]);for(const v of[-1,1]){const _=Bt(t,o,[v*.275,.84,-.02],[.055,.16,.19]);_.rotation.z=v*-.12;for(const y of[-.31,.25])Bt(t,a,[v*.25,.81,y],[.025,.025,.025],8)}Be(t,i.dark,[0,1,.31],.15,.15,[Math.PI/2,0,0]),Ye(e,s,[0,1.31,.43],[.3,.31,.28],.01,14);for(const v of[-1,1])Be(e,a,[v*.135,1.36,.676],.117,.032,[Math.PI/2,0,0]),Bt(e,i.white,[v*.135,1.36,.704],[.088,.098,.043],12),Bt(e,i.black,[v*.135,1.35,.744],[.047,.058,.024],10),Bt(e,i.white,[v*.115,1.381,.764],[.018,.019,.012],8);Ye(e,r,[0,1.145,.68],[.235,.135,.18],.006,12),Bt(e,i.black,[0,1.188,.835],[.078,.067,.055],10);const c=Ds(e,"ConeGeometry",[1,1,3],s,[-.255,1.68,.4],[.14,.25,.065]);c.rotation.z=-.16,Ds(e,"ConeGeometry",[1,1,3],o,[.27,1.57,.4],[.21,.14,.07]).rotation.set(0,0,Math.PI/2+.22),Ne(e,i.dark,[.28,1.53,.459],[.13,.075,.018]);const h=[];for(const v of[-.29,.29])for(const _ of[-.3,.25]){Ye(t,s,[v,.59,_],[.14,.24,.16],.006,10),Be(t,o,[v,.72,_],.084,.055,[0,0,Math.PI/2]),Be(t,i.dark,[v,.37,_],.105,.075);const y=new ce({color:"#7cecff",emissive:"#27c8ff",emissiveIntensity:1.1,roughness:.35});n.push(y);const E=Bt(t,y,[v,.325,_],[.112,.052,.112],10);E.userData.ownedMaterial=!0,h.push(new z(v,.3,_))}const u=new te,f=new te;u.name="Buddy the hovering robot puppy",f.name="Buddy floating body rig",u.add(f);const p=In(t),g=In(e);p.position.y=-.83,g.position.set(0,1.03-.83,.38);for(const v of g.children)v.geometry.translate(0,-1.03,-.38);f.position.y=.83,f.add(p,g),f.traverse(v=>{v.isMesh&&(v.userData.ownedGeometry=!0,[s,r,o,a,...n].includes(v.material)&&(v.userData.ownedMaterial=!0))});const x=new te;x.name="Buddy spring tail",x.position.set(0,.89-.83,-.47),f.add(x);for(let v=0;v<6;v++){const _=Be(x,v%2?i.dark:o,[0,.035+v*.047,-v*.032],.034,.052,[-.62,0,0]);_.name=`Buddy tail spring segment ${v+1}`}const m=new ce({color:"#9ceeff",emissive:"#39bfe8",emissiveIntensity:1.45,roughness:.28}),d=Bt(x,m,[0,.32,-.205],[.071,.071,.071]);d.name="Buddy blue tail light",d.userData.ownedMaterial=!0;const M=h.map(v=>Array.from({length:3},(_,y)=>{const E=new nn({color:"#55dfff",transparent:!0,opacity:1,depthWrite:!1,toneMapped:!1}),C=new ie(Bo("TorusGeometry",[.125,.013,6,24]),E);return C.name=`Buddy hover ring ${y+1}`,C.rotation.x=Math.PI/2,C.userData.ownedMaterial=!0,u.add(C),C}));return u.userData.parts={body:p,rig:f,head:g,legs:[],tail:x,tailLight:d,basePods:h.map(v=>v.clone().add(new z(0,-.83,0))),pods:h,rings:M},u.userData.motion=Xf(),Ro(u,{x:0,z:0,heading:0,vx:0,vz:0},0),u.userData.motion.previous=null,u.userData.hover={time:0,previous:null,trails:[]},u.userData.suggestedScale=.82,u.userData.modelContract="pip-pose-hover-v1",u}function Ro(i,t,e){const n=JM(i.userData.motion,t,e),s=i.userData.parts;s.rig.position.y=.83+n.hover,s.rig.rotation.set(n.pitch,0,n.roll),s.head.rotation.y=n.headYaw,s.rig.updateMatrix(),s.pods.forEach((r,o)=>r.copy(s.basePods[o]).applyMatrix4(s.rig.matrix))}function Mu(i,t){const e=i.userData.hover;if(!e)return;i.updateMatrixWorld(!0);const n=i.userData.parts.pods.map(r=>i.localToWorld(r.clone()));(!e.previous||i.position.distanceTo(e.previous)>3)&&(e.trails=n.map(r=>r.clone())),t>0&&(e.time+=t);for(let r=0;r<n.length;r++){t>0&&e.trails[r].lerp(n[r],1-Math.exp(-t/.13));const o=e.time/.55%1;for(let a=0;a<3;a++){const c=i.userData.parts.rings[r][a],l=n[r].clone().lerp(e.trails[r],a===0?0:(a-1+o)/2),h=i.worldToLocal(l);h.y=i.userData.parts.pods[r].y-.055-(a===0?0:(a-1+o)*.1+.055),c.position.copy(h),c.material.opacity=a===0?.95:a===1?.85*Math.min(1,o/.15):.85*(1-o),c.scale.setScalar(1+(a===0?0:(a-1+o)*.15))}}e.previous=i.position.clone()}const ay=[[[.11,.47,.105,.25],[.38,.42,.14,.31],[.65,.52,.12,.28],[.87,.43,.13,.3],[.52,.88,.09,.14]],[[.06,.36,.13,.22],[.29,.6,.095,.33],[.56,.36,.17,.27],[.85,.65,.1,.25],[.68,.87,.08,.12]],[[.15,.65,.16,.25],[.43,.34,.11,.24],[.68,.62,.18,.32],[.94,.3,.08,.18],[.35,.86,.07,.12]],[[.02,.58,.1,.31],[.25,.34,.16,.23],[.51,.65,.12,.28],[.78,.38,.15,.32],[.91,.84,.06,.11]]],Va=[];function cy(i,t){let e=0;for(const s of String(t))e=Math.imul(e^s.charCodeAt(0),16777619);let n=(i^e^1129267540)>>>0;return n=Math.imul(n^n>>>16,2246822507),n=Math.imul(n^n>>>13,3266489909),(n^n>>>16)>>>30}function Yf(i=0){if(!Number.isInteger(i)||i<0||i>3)throw new RangeError("Unknown cow coat variant");if(Va[i])return Va[i];const t=document.createElement("canvas");t.width=256,t.height=128;const e=t.getContext("2d"),n=e.createImageData(256,128),s=ay[i];for(let a=0;a<128;a++)for(let c=0;c<256;c++){const l=c/256,h=a/128,f=s.some(([x,m,d,M])=>{const v=Math.min(Math.abs(l-x),1-Math.abs(l-x))/d,_=(h-m)/M,y=Math.atan2(_,v);return v*v+_*_<1+.19*Math.sin(y*3+x*30)+.1*Math.cos(y*5+m*12)})?[49,48,46]:[238,228,204],p=(c*13+a*7)%9-4,g=(a*256+c)*4;for(let x=0;x<3;x++)n.data[g+x]=f[x]+p;n.data[g+3]=255}e.putImageData(n,0,0);const r=new Hi(t);r.colorSpace=De;const o=new ce({color:"#ffffff",map:r,roughness:.94});return o.userData.cowCoatVariant=i,Va[i]=o,o}function ly(i){const t=new te;t.name="Clay Holstein cow";const e=h=>new ce({color:h,roughness:.94,map:i.cream.map}),n=e("#d99f91"),s=e("#704c49"),r=e("#e4d1ae"),o=Yf();Ye(t,o,[0,.54,0],[.32,.34,.4875],.025,20);const a=new te;a.position.set(0,.73,.4175),t.add(a),Ye(a,i.cream,[0,-.015,.065],[.215,.225,.215],.018,16),Ye(a,i.dark,[0,.065,.055],[.205,.205,.18],.018,16),Bt(a,i.cream,[0,-.055,.21],[.095,.15,.065],16),Bt(a,n,[0,-.115,.255],[.224,.115,.125],16),Bt(a,s,[0,-.203,.245],[.145,.012,.06],12),Bt(a,n,[0,-.215,.237],[.157,.026,.065],12);for(const h of[-1,1]){Oi(a,i,h*.087,.075,.207,.068),Bt(a,i.dark,[h*.086,.133,.2],[.078,.026,.043],12);const u=Bt(a,i.dark,[h*.255,.09,.005],[.139,.065,.08],14);u.rotation.z=h*.28;const f=Bt(a,s,[h*.265,.096,.055],[.09,.037,.023],12);f.rotation.z=h*.28;const p=Bt(a,s,[h*.115,-.089,.359],[.037,.045,.014],12);p.rotation.z=h*-.22,Bt(a,n,[h*.115,-.074,.36],[.028,.014,.015],10);const g=new Vi(.008,.045,.16,10,4),x=g.attributes.position;for(let d=0;d<x.count;d++){const M=(x.getY(d)+.08)/.16;x.setXYZ(d,x.getX(d)+h*(.055*M-.04*M*M),x.getY(d),x.getZ(d)-.025*M*M)}g.computeVertexNormals(),g.userData.temporaryCowHorn=!0;const m=new ie(g,r);m.position.set(h*.145,.25,.015),a.add(m)}const c=[];for(const[h,u]of[[-.215,.275],[.215,.275],[-.215,-.29375],[.215,-.29375]]){const f=new te;f.position.set(h,.36,u),t.add(f),Bt(f,i.cream,[0,-.105,0],[.073,.19,.075],12);for(const p of[-1,1])Bt(f,i.dark,[p*.035,-.272,.029],[.034,.063,.091],10);c.push(f)}Bt(t,n,[0,.295,-.23125],[.105,.067,.12],12);for(const h of[-.052,.052])for(const u of[-.2875,-.1875])Bt(t,n,[h,.24,u],[.019,.038,.02],8);const l=Bt(t,i.cream,[.035,.48,-.4835],[.027,.18,.027],10);return l.rotation.x=.2,Bt(t,i.dark,[.035,.312,-.5175],[.048,.069,.043],10),{animal:t,legs:c,head:a}}function yu(i,t,e,n){i.scale.setScalar(n);for(const o of t)i.remove(o);i.remove(e);const s=In(i),r=e.position.clone().multiplyScalar(n);e.position.set(0,0,0),e.scale.setScalar(n);for(const o of[...In(e).children])o.name="head",o.position.copy(r),o.userData={headPart:!0,pivot:r.toArray(),grazeDrop:.3*n},s.add(o);for(let o=0;o<t.length;o++){const a=t[o],c=a.position.clone().multiplyScalar(n);a.position.set(0,0,0),a.scale.setScalar(n);for(const l of[...In(a).children])l.name=`leg-${o}`,l.position.copy(c),l.userData={limbIndex:o,pivot:c.toArray()},s.add(l)}return s.userData.articulated=!0,s}function hy(i="sheep"){const t=`animal:${i}`;if(dn.has(t))return dn.get(t).clone();const e=Un();if(i==="cow"){const{animal:c,legs:l,head:h}=ly(e),u=yu(c,l,h,1.5);return h.traverse(f=>{f.geometry?.userData.temporaryCowHorn&&f.geometry.dispose()}),dn.set(t,u),u.clone()}const n=new te;n.name="Robot sheep",Ye(n,e.cream,[0,.54,0],[.32,.34,.39]);{for(let c=0;c<3;c++)Ye(n,e.white,[0,.625,-.23+c*.22],[.335,.3,.145]);[-1,1].forEach(c=>{for(let l=0;l<3;l++)Bt(n,e.brass,[c*.312,.56,-.21+l*.21],[.029,.033,.033],8)})}sy(n,e,[0,.87,-.11],[.1,.024,.105],e.mint);const s=new te;s.position.set(0,.7,.34),n.add(s),Bt(s,e.dark,[0,0,.06],[.22,.235,.205]),Bt(s,e.black,[0,-.08,.225],[.185,.12,.09]),Oi(s,e,-.096,.055,.221,.075),Oi(s,e,.096,.055,.221,.075),[-1,1].forEach(c=>{const l=Bt(s,e.cream,[c*.235,.075,.025],[.135,.048,.082]);l.rotation.z=c*.25,Bt(s,e.brass,[c*.193,.075,.025],[.045,.045,.045])}),Bt(s,e.cyan,[0,.22,.008],[.033,.033,.033],8),Be(n,e.dark,[0,.64,.31],.13,.11,[Math.PI/2,0,0]);const r=[co(n,e,-.22,.22,.25),co(n,e,.22,.22,.25),co(n,e,-.22,-.24,.25),co(n,e,.22,-.24,.25)];Bt(n,e.dark,[0,.6,-.39],[.061,.065,.07]);const a=yu(n,r,s,1);return dn.set(t,a),a.clone()}function uy(){const i=Un(),t=new te;t.name="Autonomous meadow drone",Bt(t,i.mint,[0,0,0],[.3,.14,.25]),Bt(t,i.cream,[0,.09,0],[.2,.085,.17]),Oi(t,i,-.1,-.005,.238,.068),Oi(t,i,.1,-.005,.238,.068);const e=[];return[-1,1].forEach(n=>[-1,1].forEach(s=>{const r=Be(t,i.brass,[n*.24,0,s*.2],.035,.32,[0,0,n*Math.PI/2]);r.rotation.y=s*-.5;const o=new te;o.position.set(n*.39,.09,s*.29),t.add(o),Bt(o,i.dark,[0,-.045,0],[.071,.08,.071]),Bt(o,i.cream,[0,0,0],[.23,.017,.04]),Bt(o,i.cream,[0,0,0],[.04,.017,.23]),Bt(o,i.cyan,[0,.014,0],[.036,.027,.036]),e.push(o)})),t.userData.parts={propellers:e},t}function Su(i=0,t=0){i=Math.abs(Math.floor(i))%3;const e=Math.max(0,Math.min(2,Math.round(t))),n=`tree:${i}:${e}`;if(dn.has(n))return wu(dn.get(n));const s=Un(),r=new te;r.name="clay tree";const o=new ie(KM(i),s.treeWood);o.name="tree-wood",o.userData.treeWidth=1,o.castShadow=!1,o.receiveShadow=!0,r.add(o),r.userData.forks=o.geometry.userData.forks;const a=o.geometry.userData.tips,c=new z(0,1,0),l=[s.leaves,s.leavesDark,s.leavesLight][i],u=[[.14,3.12,.02],[-.26,2.85,-.13],[.32,2.83,.27],...a,[-.52,2.64,.47],[.52,2.75,-.47],[-.48,3.19,.27],[.44,3.21,-.3]].slice(0,7+e*2).map((g,x)=>{const m=Math.hypot(g[0],g[2]),d=1+.12*Math.sin(x*4.71+i*1.93),M=(.59-.21*Math.min(1,m/1.2))*d;return[g,[M,M*(1.02+.1*Math.sin(x+i)),M*(.94+.08*Math.cos(x*2))]]}),f=new te;for(const[g,x]of u)Ye(f,l,g,x,.075,8);for(let g=0;g<u.length*2;g++){const[x,m]=u[g%u.length],d=g*2.399963+i*.27,M=g%2?.3:-.25,v=Math.sqrt(1-M*M),_=Math.cos(d)*v,y=Math.sin(d)*v,E=1+.075*Math.sin(_*4.1+y*2.8)*Math.cos(M*3.7-y*1.3),C=new z(_/m[0],M/m[1],y/m[2]).normalize();Ds(f,"SphereGeometry",[1,6,3],l,[x[0]+_*m[0]*E*.92,x[1]+M*m[1]*E*.92,x[2]+y*m[2]*E*.92],[.14,.07,.11]).quaternion.setFromUnitVectors(c,C)}const p=In(f).children[0];return p.name="tree-foliage",p.userData.crownProfile=u.map(([g,x])=>({position:g,radial:Math.hypot(g[0],g[2]),size:x[0]})),r.add(p),dn.set(n,r),wu(r)}function wu(i){const t=i.clone(),e=t.getObjectByName("tree-wood");return e.material=e.material.clone(),Vf(e.material),e.userData.ownedMaterial=!0,t}function fy(i=2.2,t=4.5){const e=Un(),n=new te,s=Math.ceil(t/.3);for(let r=0;r<s;r++){const o=-t/2+(r+.5)*t/s,a=Math.sin((r+.5)/s*Math.PI)*.12;Ne(n,r%3?e.paleWood:e.wood,[0,a+.09,o],[i,.18,t/s-.025]),[-1,1].forEach(c=>Bt(n,e.brass,[c*(i/2-.16),a+.184,o],[.025,.01,.025],6))}return[-1,1].forEach(r=>{for(let o=0;o<4;o++)Be(n,e.wood,[r*i/2,.56,-t/2+o*t/3],.065,.96);Ne(n,e.paleWood,[r*i/2,.86,0],[.1,.1,t+.2]),Ne(n,e.wood,[r*i/2,.46,0],[.08,.075,t+.2])}),In(n)}function dy(i=0,t=5){i=Number.isFinite(i)?Math.abs(Math.floor(i))%6:0,t=Number.isFinite(t)?Math.max(1,Math.min(12,Math.floor(t))):5;const e=`flowers:${i}:${t}`;if(dn.has(e))return dn.get(e).clone();const n=Un(),s=new te;for(let r=0;r<t;r++){const o=r*2.39996+i,a=Math.sqrt(r/t)*.65,c=new te;c.position.set(Math.cos(o)*a,0,Math.sin(o)*a),s.add(c);const l=.18+(r*7+i)%4*.03;Be(c,n.stem,[0,l/2,0],.014,l);const h=[n.flowerYellow,n.flowerPink,n.flowerWhite][(r+i)%3];for(let u=0;u<5;u++){const f=u*Math.PI*2/5;Bt(c,h,[Math.cos(f)*.05,l,Math.sin(f)*.05],[.045,.022,.045],6)}Bt(c,n.flowerCenter,[0,l+.015,0],[.027,.023,.027],6)}return qf(e,s)}function Wa(i=0){i=Math.abs(Math.floor(i))%3;const t=`bush:${i}`;if(dn.has(t))return dn.get(t).clone();const e=Un(),n=new te,s=[e.leaves,e.leavesDark,e.leavesLight][i%3];Be(n,e.bark,[0,.16,0],.08,.3),Ye(n,s,[0,.42,0],[.62,.46,.48],.075),Ye(n,s,[-.42,.28,.12],[.38,.34,.35],.075),Ye(n,s,[.42,.34,-.1],[.4,.37,.36],.075),Ye(n,s,[.1,.65,-.13],[.38,.34,.37],.075);for(let r=0;r<4;r++){const o=r*Math.PI/2+i*.29,a=Ye(n,s,[Math.cos(o)*.52,.46+r%2*.1,Math.sin(o)*.42],[.25,.16,.33],.04);a.rotation.y=o}return qf(t,n)}function Yc(i){let t=i;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function lo(i,t=!1){const e=document.createElement("canvas");e.width=e.height=512;const n=e.getContext("2d"),s=Yc(i==="grass"?83:193);n.fillStyle=t?"#909090":i==="grass"?"#779c4d":"#b79763",n.fillRect(0,0,512,512);for(let o=0;o<90;o++){const a=s()*512,c=s()*512,l=12+s()*57;n.fillStyle=t?["#858585","#999999","#aaaaaa"][o%3]:i==="grass"?["#92ad56","#4f854a","#bdba67","#6a964d"][o%4]:["#c9ad78","#9c8055","#ddc18e"][o%3],n.globalAlpha=.08;for(const h of[-512,0,512])for(const u of[-512,0,512])n.beginPath(),n.ellipse(a+h,c+u,l,l*.6,0,0,Math.PI*2),n.fill()}for(let o=0;o<7200;o++){const a=s()*512,c=s()*512;n.fillStyle=t?["#777777","#bbbbbb","#dddddd"][o%3]:i==="grass"?["#496f39","#9eb568","#d0c480","#789b4b"][o%4]:["#826b48","#e4c995","#b99a6a"][o%3],n.globalAlpha=.14+s()*.25,n.beginPath(),n.ellipse(a,c,.35+s()*.85,i==="grass"?1.2+s()*3.8:.3+s()*1.4,s()*Math.PI,0,Math.PI*2),n.fill()}n.globalAlpha=1;const r=new Hi(e);return t||(r.colorSpace=De),r.wrapS=r.wrapT=$n,r}function Zf(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.max(0,Math.min(1,((i-e.x)*s+(t-e.z)*r)/(s*s+r*r||1))),a=i-e.x-o*s,c=t-e.z-o*r;return a*a+c*c}function py(i,t,e,n){return Math.sqrt(Zf(i,t,e,n))}function Xa(i,t,e){let n=1/0;for(let s=1;s<e.length;s++)n=Math.min(n,Zf(i,t,e[s-1],e[s]));return Math.sqrt(n)}function my(i,t="#45684d"){const e=document.createElement("canvas");e.width=512,e.height=128;const n=e.getContext("2d");n.fillStyle="#faf6e9",n.beginPath(),n.roundRect(8,12,496,98,35),n.fill(),n.fillStyle=t,n.font="bold 34px sans-serif",n.textAlign="center",n.fillText(i,256,76);const s=new Hi(e);s.colorSpace=De;const r=new Up(new cf({map:s,depthTest:!1}));return r.scale.set(6,1.5,1),r}class gy{constructor(t){this.renderer=new fv({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Ou,this.renderer.outputColorSpace=De,this.renderer.toneMapping=ku,this.renderer.toneMappingExposure=1.05,this.scene=new Ip,this.scene.background=new Ht("#bdd6df"),this.scene.fog=new ul("#bdd6df",95,195),this.hemisphere=new Sm("#eaf7ff","#536747",1.65),this.scene.add(this.hemisphere),this.skyDay=new Ht("#bdd6df"),this.skyStorm=new Ht("#899da7"),this.sun=new Em("#fff4dc",2.05),this.sun.position.set(-18,35,20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024),Object.assign(this.sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:100}),this.sun.shadow.camera.updateProjectionMatrix(),this.sun.shadow.bias=-7e-4,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.camera=new Uo(-30,30,20,-20,.1,180),this.center=new z(-7,0,0),this.targetCenter=this.center.clone(),this.terrain=new te,this.actors=new te,this.scene.add(this.terrain,this.actors),this.materials=Un(),this.grass=new ce({color:"#ffffff",roughness:.96,map:lo("grass"),bumpMap:lo("grass",!0),bumpScale:.12}),this.path=new ce({color:"#fff1d3",roughness:.95,map:lo("path"),bumpMap:lo("path",!0),bumpScale:.08,side:Ce}),this.pathShoulder=new ce({color:"#a99261",roughness:1,transparent:!0,opacity:.36,depthWrite:!1,side:Ce}),this.thrusterGlow=new WM;for(const e of[this.grass,this.path,this.pathShoulder])this.thrusterGlow.install(e);this.water=new ce({color:"#4b9fae",roughness:.29,metalness:.08,side:Ce}),this.targetMat=new nn({color:"#ffe8a0",transparent:!0,opacity:.56,depthWrite:!1,side:Ce}),this.fenceParts=[new ie(new Vi(.075,.075,.92,10),this.materials.paleWood),new ie(new Fi(1,8,6),this.materials.paleWood),new ie(new bn(1,.105,.085),this.materials.wood)],this.sceneryBatches=[],this.sceneryFrustum=new Io,this.viewMatrix=new se,this.animalMeshes=[],this.animalBatches=[],this.helperMeshes=new Map,this.resize(),this.preview=!0,this.particles=[],this.nature=new zM(this.scene),this.waterEffects=new pM(this.scene)}resize(){this.width=innerWidth,this.height=innerHeight,this.renderer.setSize(this.width,this.height,!1),this.aspect=this.width/this.height}place(t,e,n,s=1,r=!1){return t.position.set(e,0,n),t.scale.multiplyScalar(s),t.traverse(o=>{o.userData.treeWidth!==void 0&&(o.userData.treeWidth=QM(s),o.material.userData.treeWidth.value=o.userData.treeWidth)}),r&&t.traverse(o=>{o.isMesh&&(o.userData.ownedGeometry=!0)}),this.terrain.add(t),t}flat(t,e,n,s,r=.02){const o=new ie(t,e);return o.rotation.x=-Math.PI/2,o.position.set(n,r,s),o.receiveShadow=!0,this.terrain.add(o),o}setLevel(t){this.level=t,this.barkEffects=[],this.cutaway?.dispose(),this.cutaway=null,this.gateView?.dispose(),this.gateView?.removeFromParent(),this.stoneView?.dispose(),this.stoneView?.removeFromParent(),this.gateView=this.stoneView=null;const e=new Set,n=new Set;for(const R of[this.terrain,this.actors])R.traverse(b=>{b.userData.ownedGeometry&&e.add(b.geometry),b.userData.ownedMaterial&&n.add(b.material),b.userData.ownedLabel&&(b.material.map.dispose(),n.add(b.material)),b.isInstancedMesh&&b.dispose()});e.forEach(R=>R?.dispose()),n.forEach(R=>R?.dispose()),this.terrain.clear(),this.actors.clear(),this.sceneryBatches=[],this.helperMeshes.clear(),this.animalMeshes=[],this.animalBatches=[],this.particles=[];const s=t.bounds,r=s.maxX-s.minX,o=s.maxZ-s.minZ,a=Yc(t.seed),c=Yc(t.seed^7628133),l=(s.maxX+s.minX)/2,h=(s.maxZ+s.minZ)/2,u=this.flat(new br(r+90,o+90,1,1),this.grass,l,h,-.035);if(u.userData.ownedGeometry=!0,this.grass.map.repeat.set((r+90)/15,(o+90)/15),this.grass.bumpMap.repeat.copy(this.grass.map.repeat),t.boundary?.length>4){u.material=this.grass.clone(),u.material.color.multiplyScalar(.72),u.userData.ownedMaterial=!0;const R=new Oc;t.boundary.forEach((q,F)=>F?R.lineTo(q.x,-q.z):R.moveTo(q.x,-q.z)),R.closePath();const b=new bo(R);b.rotateX(-Math.PI/2);const N=b.attributes.position,D=b.attributes.uv;for(let q=0;q<N.count;q++)D.setXY(q,(N.getX(q)-l)/(r+90)+.5,(N.getZ(q)-h)/(o+90)+.5);const Y=new ie(b,this.grass);Y.name="playable-meadow",Y.position.y=-.025,Y.receiveShadow=!0,Y.userData.ownedGeometry=!0,this.terrain.add(Y)}for(const R of t.sceneryHills||[]){const b=new ie(new Fi(1,20,12),new ce({color:["#799552","#6f914e","#93a75d"][Math.floor(a()*3)],roughness:1}));b.position.set(R.x,-.3,R.z),b.scale.set(R.radius,R.height,R.radius),b.userData.ownedGeometry=b.userData.ownedMaterial=!0,this.terrain.add(b)}const f=(R,b)=>{const N=new ie(R,b);return N.receiveShadow=!0,N.userData.ownedGeometry=!0,this.terrain.add(N),N};for(const R of t.roads)f(ao(R.points,R.width+.65,{ragged:!0,y:.003,seed:t.seed+5}),this.pathShoulder),f(ao(R.points,R.width,{ragged:!0,y:.007,seed:t.seed}),this.path);const p=[];for(const R of t.rivers){const b=new ce({color:"#6c8960",roughness:1,side:Ce});this.thrusterGlow.install(b);const N=f(ao(R.points,R.width+.8,{y:.002}),b);N.userData.ownedMaterial=!0;const D=f(ao(R.points,R.width,{y:.018}),this.water),Y=R.points[0],q=R.points.at(-1);p.push({mesh:D,points:R.points,width:R.width,heading:Math.atan2(q.x-Y.x,q.z-Y.z)});for(const F of R.bridges){const K=fy(F.width,F.length),wt=new Map;K.traverse(Rt=>{if(!Rt.isMesh)return;const Tt=Rt.material;wt.has(Tt)||wt.set(Tt,this.thrusterGlow.install(Tt.clone())),Rt.material=wt.get(Tt),Rt.userData.ownedMaterial=!0}),K.rotation.y=F.heading,this.place(K,F.x,F.z,1,!0)}}const g=t.target,x=cn(g),m=x.halfLength,d=[];this.goal=f(xu(g),this.targetMat),this.goalOutline=f(XM(g),new nn({color:"#fff0b5",side:Ce})),this.goalOutline.userData.ownedMaterial=!0,this.goalFloor=null;const M=(R,b,N,D,Y,q)=>{const F=Math.hypot(b.x-R.x,b.z-R.z),K=new ie(new bn(F,N,D),Y);return K.position.set((R.x+b.x)/2,N/2,(R.z+b.z)/2),K.rotation.y=-Math.atan2(b.z-R.z,b.x-R.x),K.castShadow=K.receiveShadow=!0,K.userData.ownedGeometry=!0,K.userData.coverSide=q,this.terrain.add(K),K};for(const R of t.fenceSegments||[]){if(R.material==="stone")continue;const{a:b,b:N,kind:D}=R,Y=Math.hypot(N.x-b.x,N.z-b.z);if(D==="target"&&g.type==="barn"){const q=Math.ceil(Y/3);for(let F=0;F<q;F++){const K={x:b.x+(N.x-b.x)*F/q,z:b.z+(N.z-b.z)*F/q},wt={x:b.x+(N.x-b.x)*(F+1)/q,z:b.z+(N.z-b.z)*(F+1)/q},Rt=(K.x+wt.x)/2-g.x,Tt=(K.z+wt.z)/2-g.z,Z=Math.cos(g.heading||0),Q=Math.sin(g.heading||0),ot=Rt*Z-Tt*Q,pt=Rt*Q+Tt*Z,dt=Math.abs(Math.abs(ot)-m)<Math.abs(Math.abs(pt)-m)?ot>=0?"+x":"-x":pt>=0?"+z":"-z";d.push(M(K,wt,2.4,.22,this.materials.barn,dt));const kt=M(K,wt,.14,.25,this.materials.barnTrim,dt);kt.position.y=2.35,d.push(kt)}}else if(D==="target"&&g.type==="field"){this.placeFence(b,N);const q=Math.ceil(Y/1.4);for(let F=0;F<q;F++)this.place(Wa(F),b.x+(N.x-b.x)*(F+.5)/q,b.z+(N.z-b.z)*(F+.5)/q,.75)}else this.placeFence(b,N)}if(this.gateView=BM(t.gates),this.stoneView=HM(t.fenceSegments),this.terrain.add(this.gateView,this.stoneView),g.type==="barn"){this.goalFloor=f(xu(g,.013),this.path);const R=new te,b=g.heading||0,N=Math.ceil(m*2/2.4),D=(m*2+.6)/N;for(const Y of[-1,1])for(let q=0;q<N;q++){const F=new ie(new bn(m+.6,.18,D),this.materials.roof);F.position.set(Y*m/2,3.2,-m-.3+(q+.5)*D),F.rotation.z=-Y*.21,F.castShadow=!0,F.userData.ownedGeometry=!0,F.userData.coverKind="roof",R.add(F),d.push(F)}R.position.set(g.x,0,g.z),R.rotation.y=b,this.terrain.add(R),this.cutaway=new VM(g,d,{halfExtent:m+.3})}const v=my(g.type==="pen"?"SUNNY PEN":g.type==="barn"?"HOME BARN":"CLOVER FIELD");v.scale.set(4.5,1.125,1),v.position.set(g.x-Math.sin(g.heading||0)*(m+1),3,g.z-Math.cos(g.heading||0)*(m+1)),v.name="Destination introduction",v.userData.ownedLabel=!0,this.destinationSign=v,this.terrain.add(v);for(const R of t.obstacles){const b=R.radius*1.45,N=Su(Math.floor(a()*3),b<1.7?0:b<2.4?1:2);N.rotation.y=c()*Math.PI*2,this.place(N,R.x,R.z,b);for(let D=0;D<4;D++){const Y=D*Math.PI/2;this.place(Wa(D),R.x+Math.cos(Y)*R.radius*.48,R.z+Math.sin(Y)*R.radius*.48,R.radius*.7)}}const _=(R,b,N=0)=>R>s.minX+N&&R<s.maxX-N&&b>s.minZ+N&&b<s.maxZ-N&&!t.rivers.some(D=>Xa(R,b,D.points)<D.width/2+N+.5)&&!t.roads.some(D=>Xa(R,b,D.points)<D.width/2+N+.35)&&Math.hypot(R-g.x,b-g.z)>g.radius+N+2&&!t.obstacles.some(D=>Math.hypot(R-D.x,b-D.z)<D.radius+N)&&!(t.fenceSegments||[]).some(D=>py(R,b,D.a,D.b)<N+.7),y=[];let E=0;for(const R of t.roads)for(let b=1;b<R.points.length;b++){const N=R.points[b-1],D=R.points[b],Y=Math.hypot(D.x-N.x,D.z-N.z);Y&&(E+=Y,y.push({a:N,b:D,length:Y,end:E,width:R.width}))}const C=(R,b)=>{if(R<b*.7&&E){const N=(R/(b*.7)+a()/(b*.7))*E,D=y.find(wt=>wt.end>=N)||y[y.length-1],Y=(N-D.end+D.length)/D.length,q=(D.b.x-D.a.x)/D.length,F=(D.b.z-D.a.z)/D.length,K=(D.width/2+1.1+a()*2.8)*(R%2?1:-1);return{x:D.a.x+q*Y*D.length-F*K,z:D.a.z+F*Y*D.length+q*K}}return{x:s.minX+2+a()*(r-4),z:s.minZ+2+a()*(o-4)}};this.meadowDetails=[];const L=Math.min(190,Math.ceil(r*o/130));for(let R=0;R<L;R++){const{x:b,z:N}=C(R,L);_(b,N,1)&&(this.place(dy(R,3),b,N,.85+a()*.6),this.meadowDetails.push({x:b,z:N,kind:"flower"}))}const S=[],T=Math.min(650,Math.ceil(r*o/35));for(let R=0;R<T;R++){const{x:b,z:N}=C(R,T);_(b,N,.4)&&(S.push({x:b,z:N}),this.meadowDetails.push({x:b,z:N,kind:"tuft"}))}if(S.length){const R=new pr(.12,.55,3),b=new ce({color:"#648844",roughness:1,transparent:!0,opacity:1,depthWrite:!1}),N=new oi(R,b,S.length),D=new we;S.forEach((Y,q)=>{D.position.set(Y.x,.18,Y.z),D.scale.set(.7+a()*.6,.55+a()*.8,.7+a()*.6),D.rotation.y=a()*Math.PI,D.updateMatrix(),N.setMatrixAt(q,D.matrix)}),N.receiveShadow=!0,N.userData.decorativeGrass=!0,N.userData.ownedGeometry=N.userData.ownedMaterial=!0,this.terrain.add(N),this.trackScenery(N)}const U=[];for(const R of t.rivers)for(let b=2;b<R.points.length-2;b+=5){const N=R.points[b],D=R.points[b+1],Y=D.x-N.x,q=D.z-N.z,F=Math.hypot(Y,q)||1;for(const K of[-1,1]){const wt=N.x-q/F*(R.width/2+.65)*K,Rt=N.z+Y/F*(R.width/2+.65)*K;wt>s.minX&&wt<s.maxX&&Rt>s.minZ&&Rt<s.maxZ&&!R.bridges.some(Tt=>Math.hypot(wt-Tt.x,Rt-Tt.z)<Tt.length/2+Tt.width)&&U.push({x:wt,z:Rt})}}if(U.length){const R=new pr(.18,.95,4),b=new ce({color:"#5b7951",roughness:1}),N=new oi(R,b,U.length),D=new we;U.forEach((Y,q)=>{D.position.set(Y.x,.4,Y.z),D.rotation.z=(a()-.5)*.25,D.updateMatrix(),N.setMatrixAt(q,D.matrix)}),N.userData.ownedGeometry=N.userData.ownedMaterial=!0,this.terrain.add(N),this.trackScenery(N)}const k=Math.min(62,28+Math.floor(t.index/3));for(let R=0;R<k;R++){let b,N;const D=R%4;if(D<2?(b=s.minX-12+a()*(r+24),N=D===0?s.minZ-4-a()*17:s.maxZ+4+a()*17):(b=D===2?s.minX-5-a()*18:s.maxX+5+a()*18,N=s.minZ+a()*o),t.rivers.some(F=>Xa(b,N,F.points)<F.width/2+3))continue;const Y=1.3+a()*1.8,q=Su(R%3,Y<1.7?0:Y<2.4?1:2);q.rotation.y=c()*Math.PI*2,this.place(q,b,N,Y)}this.bushPlacements=pv(t);for(const R of this.bushPlacements)this.place(Wa(R.variant),R.x,R.z,R.scale);this.nature.setLevel(t),this.waterEffects.setLevel(t,{grassMaterials:[this.grass],pathMaterials:[this.path],waterMaterial:this.water,terrain:this.terrain,rivers:p,weather:this.nature.weather}),this.batchScenery(),this.dog=ry(),this.dog.scale.setScalar(1.35*.75),this.actors.add(this.dog);const B=new ie(new ml(.82,.95,40),new nn({color:"#fff0bb",transparent:!0,opacity:.9,side:Ce,depthWrite:!1}));B.scale.setScalar(1/.75),B.rotation.x=-Math.PI/2,B.position.y=.03/.75,B.userData.ownedGeometry=B.userData.ownedMaterial=!0,this.dog.add(B);const W=new Oc;W.moveTo(0,1.45),W.lineTo(-.19,1.05),W.lineTo(.19,1.05),W.closePath(),this.goalPointer=new ie(new bo(W),new nn({color:"#be8652",side:Ce,depthWrite:!1})),this.goalPointer.scale.setScalar(1/.75),this.goalPointer.rotation.x=Math.PI/2,this.goalPointer.userData.ownedGeometry=this.goalPointer.userData.ownedMaterial=!0,this.dog.add(this.goalPointer);for(const R of t.animals){const b=new we;b.position.set(R.x,0,R.z),b.rotation.y=R.heading??Math.PI/2,b.scale.setScalar(Es(R)),this.animalMeshes.push(b)}for(const R of["sheep","cow"]){const b=t.animals.flatMap((F,K)=>F.type===R?[K]:[]);if(!b.length)continue;const N=hy(R),D=[];let Y=0;const q=[];for(const F of N.children){F.geometry.boundingSphere||F.geometry.computeBoundingSphere();const K=F.geometry.boundingSphere,wt=F.userData.pivot;if(Y=Math.max(Y,K.center.length()+K.radius+(wt?Math.hypot(...wt):0)),F.material.userData.cowCoatVariant!==void 0){for(let Tt=0;Tt<4;Tt++){const Z=b.filter(ot=>cy(t.seed,t.animals[ot].id??ot)===Tt);if(!Z.length)continue;const Q=new oi(F.geometry,Yf(Tt),Z.length);Q.instanceMatrix.setUsage(gs),Q.castShadow=Q.receiveShadow=!0,Q.frustumCulled=!1,this.actors.add(Q),q.push({indices:Z,meshes:[Q],visibleIndices:[],coatVariant:Tt})}continue}const Rt=new oi(F.geometry,F.material,b.length);Rt.instanceMatrix.setUsage(gs),Rt.castShadow=Rt.receiveShadow=!0,Rt.frustumCulled=!1,Rt.userData={...F.userData},this.actors.add(Rt),D.push(Rt)}this.animalBatches.push({indices:b,meshes:D,radius:Y,visibleIndices:[]},...q.map(F=>({...F,radius:Y})))}this.center.set(t.spawn.x+(this.aspect<.8?2:10),0,t.spawn.z+1),this.time=0,this.update(t,t.dog,0,!0)}placeFence(t,e){const n=Math.hypot(e.x-t.x,e.z-t.z),s=Math.max(1,Math.ceil(n/1.8)),r=new te;r.position.set((t.x+e.x)/2,0,(t.z+e.z)/2),r.rotation.y=-Math.atan2(e.z-t.z,e.x-t.x);const o=(a,c,l,h=1,u=1,f=1)=>{const p=this.fenceParts[a].clone();p.position.set(c,l,0),p.scale.set(h,u,f),p.userData.fencePart=!0,r.add(p)};for(let a=0;a<=s;a++){const c=-n/2+a*n/s;o(0,c,.46),o(1,c,.94,.083,.065,.083)}for(let a=0;a<s;a++)for(const c of[.34,.69])o(2,-n/2+(a+.5)*n/s,c,n/s+.03);this.terrain.add(r)}trackScenery(t){const e=t.instanceMatrix.array.slice(),n=new Float32Array(t.count*4),s=new se,r=new pi;t.geometry.boundingSphere||t.geometry.computeBoundingSphere();for(let a=0;a<t.count;a++)s.fromArray(e,a*16),r.copy(t.geometry.boundingSphere).applyMatrix4(s),n.set([r.center.x,r.center.y,r.center.z,r.radius],a*4);t.instanceMatrix.setUsage(gs),t.frustumCulled=!1;const o=t.geometry.attributes.treeInstanceWidth?.array.slice();this.sceneryBatches.push({batch:t,matrices:e,bounds:n,widths:o})}batchScenery(){this.terrain.updateMatrixWorld(!0);const t=new Map;this.terrain.traverse(n=>{if(!n.isMesh||n.isInstancedMesh||n.userData.ownedGeometry||n.material.transparent)return;const s=`${n.geometry.id}:${n.userData.treeWidth!==void 0?"treeWood":n.material.id}`;t.has(s)||t.set(s,[]),t.get(s).push(n)});for(const n of t.values()){if(n.length<2&&n[0].userData.treeWidth===void 0)continue;const s=n[0],r=s.userData.treeWidth!==void 0,o=r?s.geometry.clone():s.geometry;r&&o.setAttribute("treeInstanceWidth",new Fc(new Float32Array(n.map(c=>c.userData.treeWidth)),1).setUsage(gs));const a=new oi(o,r?Un().treeWood:s.material,n.length);r&&(a.userData.ownedGeometry=!0,a.userData.treeWood=!0),n.forEach((c,l)=>{a.setMatrixAt(l,c.matrixWorld),r&&c.userData.ownedMaterial&&c.material.dispose(),c.parent.remove(c)}),a.castShadow=!!s.userData.fencePart,a.receiveShadow=!0,this.terrain.add(a),this.trackScenery(a)}const e=[];this.terrain.traverse(n=>{n.isGroup&&!n.children.length&&e.push(n)}),e.forEach(n=>n.parent.remove(n))}cullScenery(){this.camera.updateMatrixWorld(!0),this.viewMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.sceneryFrustum.setFromProjectionMatrix(this.viewMatrix);const t=this.sceneryFrustum.planes;for(const{batch:e,matrices:n,bounds:s,widths:r}of this.sceneryBatches){let o=0;for(let a=0;a<s.length;a+=4){const c=s[a+3]+2;t.some(l=>l.normal.x*s[a]+l.normal.y*s[a+1]+l.normal.z*s[a+2]+l.constant<-c)||(e.instanceMatrix.array.set(n.subarray(a*4,a*4+16),o*16),r&&(e.geometry.attributes.treeInstanceWidth.array[o]=r[a/4]),o++)}if(e.count=o,e.visible=o>0,e.instanceMatrix.needsUpdate=!0,e.instanceMatrix.clearUpdateRanges(),o&&e.instanceMatrix.addUpdateRange(0,o*16),r){const a=e.geometry.attributes.treeInstanceWidth;a.needsUpdate=!0,a.clearUpdateRanges(),o&&a.addUpdateRange(0,o)}}}updateAnimalBatches(t,e){const n=this.sceneryFrustum.planes,s=new se,r=new se,o=new se;for(const a of this.animalBatches){const c=a.visibleIndices;c.length=0;for(const l of a.indices){const h=this.animalMeshes[l],u=h.position,f=a.radius*Math.max(Math.abs(h.scale.x),Math.abs(h.scale.y),Math.abs(h.scale.z))+3;n.some(p=>p.normal.x*u.x+p.normal.y*u.y+p.normal.z*u.z+p.constant<-f)||c.push(l)}c.forEach((l,h)=>a.meshes.forEach(u=>{if(u.userData.headPart){const m=this.animalMeshes[l].userData,d=u.userData.pivot;s.makeTranslation(d[0],d[1]-(m.graze||0)*u.userData.grazeDrop,d[2]),r.makeRotationX(Md(m,l)),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o);return}if(u.userData.limbIndex===void 0){u.setMatrixAt(h,this.animalMeshes[l].matrix);return}const f=t.animals[l],p=u.userData.limbIndex,g=p===0||p===3?0:Math.PI,x=Math.sin(e*12+l*.8+g)*Math.min(.5,hd(f,this.animalMeshes[l].userData.turnSpeed)*.15);s.makeTranslation(...u.userData.pivot),r.makeRotationX(x),s.multiply(r),o.multiplyMatrices(this.animalMeshes[l].matrix,s),u.setMatrixAt(h,o)}));for(const l of a.meshes)l.count=c.length,l.visible=c.length>0,l.instanceMatrix.needsUpdate=!0,l.instanceMatrix.clearUpdateRanges(),c.length&&l.instanceMatrix.addUpdateRange(0,c.length*16)}}update(t,e,n,s=!1){this.time+=n,this.preview=s;const r=t.animals.filter(d=>!d.saved);this.destinationSign.material.opacity=s?1:Math.max(0,Math.min(1,1-((t.time||0)-4)/1.2)),this.destinationSign.visible=this.destinationSign.material.opacity>0;const o=r.reduce((d,M)=>({x:d.x+M.x/r.length,z:d.z+M.z/r.length}),{x:0,z:0}),c=(s?this.aspect<.8?50:44:this.aspect<.8?39:36)/2,l=c*this.aspect;let h=s?t.spawn.x+(this.aspect<.8?2:10):e.x*.68+(r.length?o.x:t.target.x)*.32+2,u=s?t.spawn.z+1:e.z*.75+(r.length?o.z:t.target.z)*.25+1;s||(h=Math.max(e.x-l*.45,Math.min(e.x+l*.45,h)),u=Math.max(e.z-4,Math.min(e.z+4,u)));const f=s?Math.min(1,n*.8):Math.min(1,n*3.5);if(this.center.x+=(h-this.center.x)*f,this.center.z+=(u-this.center.z)*f,!s){const d=Math.max(1,l-2.5);this.center.x=Math.max(e.x-d,Math.min(e.x+d,this.center.x))}this.camera.left=-l,this.camera.right=l,this.camera.top=c,this.camera.bottom=-c,this.camera.updateProjectionMatrix(),this.camera.position.set(this.center.x,36,this.center.z+29),this.camera.lookAt(this.center.x,0,this.center.z-2),this.sun.position.set(this.center.x-18,35,this.center.z+20),this.sun.target.position.set(this.center.x,0,this.center.z),this.sun.target.updateMatrixWorld(),this.dog.position.set(e.x,qn(t,e.x,e.z),e.z),this.dog.rotation.y=e.heading??Math.PI/2,this.goalPointer.rotation.set(Math.PI/2,0,0),this.goalPointer.quaternion.premultiply(new Kn().setFromAxisAngle(new z(0,1,0),Math.atan2(t.target.x-e.x,t.target.z-e.z)-this.dog.rotation.y)),this.goalPointer.position.y=.04/.75,this.goalPointer.visible=!s;const p=this.dog.userData.parts,g=Math.floor(this.time*12)/12;Ro(this.dog,e,n),Mu(this.dog,n),p.tail.rotation.z=Math.sin(g*7)*.3,this.thrusterGlow.update(this.dog,(d,M)=>qn(t,d,M)),t.animals.forEach((d,M)=>{const v=this.animalMeshes[M];v.scale.setScalar(Es(d)),v.position.set(d.x,qn(t,d.x,d.z)+Math.sin(g*12+M)*Math.min(.07,Math.hypot(d.vx,d.vz)*.025),d.z),ld(v,d,n),vd(v,d,t,n),v.rotation.z=Math.sin(g*9+M)*Math.min(.055,Math.hypot(d.vx,d.vz)*.02),v.updateMatrix()}),this.updateBarks(n);for(const d of this.helperMeshes.values())d.visible=!1;for(const d of t.helpers||[]){let M=this.helperMeshes.get(d.type);M||(M=d.type==="drone"?uy():oy(),d.type==="helper"&&M.scale.setScalar(this.dog.scale.x*(M.userData.suggestedScale??.82)),this.helperMeshes.set(d.type,M),this.actors.add(M)),M.visible=!0,M.position.set(d.x,d.type==="drone"?2+Math.sin(this.time*4)*.18:qn(t,d.x,d.z),d.z),d.type==="drone"?M.userData.parts.propellers.forEach(v=>v.rotation.y=this.time*35):(Number.isFinite(d.heading)&&(M.rotation.y=d.heading),Ro(M,{...d,heading:M.rotation.y},n),Mu(M,n),M.userData.parts.tail.rotation.z=Math.sin(g*7)*.3,Da(M,(this.barkEffects||[]).some(v=>v.buddy)))}const x=(t.helpers||[]).some(d=>d.type==="helper")?this.helperMeshes.get("helper"):null;this.thrusterGlow.update(this.dog,(d,M)=>qn(t,d,M),x),Da(this.dog,(this.barkEffects||[]).some(d=>!d.buddy)),this.gateView?.update(),this.goal.material.opacity=.38+Math.sin(this.time*2)*.09,this.cutaway?.update(this.camera,[e,...t.animals,...(t.helpers||[]).filter(d=>d.type!=="drone")],n),this.nature.update(n,{dog:e,animals:t.animals,camera:this.camera,time:this.time,paused:n<=0});const m=this.nature.weather;this.waterEffects.update(n,{weather:m,movers:[{...e,id:"pip"},...t.animals.map(d=>({...d,id:`flock-${d.id}`})),...(t.helpers||[]).filter(d=>d.type!=="drone").map(d=>({...d,id:`helper-${d.type}`}))],paused:n<=0}),this.sun.intensity=2.05*m.daylight+m.lightningFlash,this.hemisphere.intensity=1.65*m.daylight+m.lightningFlash*.6,this.scene.background.copy(this.skyDay).lerp(this.skyStorm,m.cloudCoverage*.5),this.scene.fog.color.copy(this.scene.background);for(const d of this.particles)d.life-=n,d.mesh.position.addScaledVector(d.velocity,n),d.velocity.y-=n*6,d.mesh.rotation.x+=n*2,d.mesh.scale.setScalar(Math.max(0,d.life)),d.life<=0&&(this.actors.remove(d.mesh),d.mesh.geometry.dispose(),d.mesh.material.dispose());this.particles=this.particles.filter(d=>d.life>0),this.cullScenery(),this.updateAnimalBatches(t,g),this.renderer.render(this.scene,this.camera)}celebrate(t,e){for(let n=0;n<36;n++){const s=new ie(new bn(.12,.12,.05),new nn({color:["#f0b65c","#f8e8ad","#e99585","#80b398"][n%4]}));s.userData.ownedGeometry=s.userData.ownedMaterial=!0,s.position.set(t,1.5,e),this.actors.add(s),this.particles.push({mesh:s,velocity:new z(Math.sin(n*2.4)*3,2+n%5,Math.cos(n*2.4)*3),life:1.8})}}bark(t){t||Da(this.dog,!0);const e=t?{x:t.x,z:t.z}:{x:this.dog.position.x,z:this.dog.position.z},n=new ie(_u(this.level,e),new nn({color:"#fff6d8",side:Ce,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1}));for(n.renderOrder=1,n.userData.ownedGeometry=n.userData.ownedMaterial=!0,this.actors.add(n),this.barkEffects??=[],this.barkEffects.push({mesh:n,origin:e,age:0,buddy:!!t});this.barkEffects.length>4;){const s=this.barkEffects.shift();this.actors.remove(s.mesh),s.mesh.geometry.dispose(),s.mesh.material.dispose()}}updateBarks(t){for(const e of this.barkEffects||[])if(!(t<=0)){if(e.age+=t,e.age>=.6){this.actors.remove(e.mesh),e.mesh.geometry.dispose(),e.mesh.material.dispose();continue}_u(this.level,e.origin,1+e.age/.6*6,e.mesh.geometry),e.mesh.material.opacity=.8*(1-e.age/.6)}this.barkEffects=(this.barkEffects||[]).filter(e=>e.age<.6)}drawMap(t,e,n){const s=t.getContext("2d"),r=t.width,o=t.height,a=e.bounds,c=Math.min(a.maxX-a.minX,120*(r-16)/(o-16)),l=Math.min(a.maxZ-a.minZ,120),h=c<a.maxX-a.minX||l<a.maxZ-a.minZ,u=(y,E,C,L)=>Math.max(E,Math.min(C-L,y-L/2)),f=u(n.x,a.minX,a.maxX,c),p=u(n.z,a.minZ,a.maxZ,l),g={minX:f,maxX:f+c,minZ:p,maxZ:p+l},x=y=>8+(y-g.minX)/(g.maxX-g.minX)*(r-16),m=y=>8+(y-g.minZ)/(g.maxZ-g.minZ)*(o-16),d=e.boundary?.length>4;s.fillStyle=d?"#172e25":"#29483a",s.fillRect(0,0,r,o),h&&(s.save(),s.beginPath(),s.rect(8,8,r-16,o-16),s.clip()),d&&(s.save(),s.beginPath(),e.boundary.forEach((y,E)=>E?s.lineTo(x(y.x),m(y.z)):s.moveTo(x(y.x),m(y.z))),s.closePath(),s.fillStyle="#29483a",s.fill(),s.clip());const M=(y,E,C)=>{s.lineWidth=E,s.strokeStyle=C,s.lineCap="round",s.lineJoin="round",s.beginPath(),y.forEach((L,S)=>S?s.lineTo(x(L.x),m(L.z)):s.moveTo(x(L.x),m(L.z))),s.stroke()},v=Math.min((r-16)/(g.maxX-g.minX),(o-16)/(g.maxZ-g.minZ));for(const y of e.rivers){M(y.points,y.width*v,"#35b9ed");for(const E of y.bridges){const C=Math.sin(E.heading)*E.length/2,L=Math.cos(E.heading)*E.length/2;M([{x:E.x-C,z:E.z-L},{x:E.x+C,z:E.z+L}],Math.max(3,E.width*v),"#dfbd8c")}}for(const y of e.roads)M(y.points,Math.max(1.5,y.width*v),"#f0c777");qM(s,e.target,y=>({x:x(y.x),y:m(y.z)}));for(const y of e.fenceSegments||[])M([y.a,y.b],y.material==="stone"?2:y.kind==="boundary"?1:1.5,y.material==="stone"?"#d5d9c9":"#c0a67b");for(const y of e.gates||[])if(y.operable&&!y.open){const E=tl(y);M([E.a,E.b],2.5,"#ffad45")}const _=(y,E,C,L,S="#183027")=>{s.fillStyle=L,s.strokeStyle=S,s.lineWidth=1.5,s.beginPath(),s.arc(x(y),m(E),C,0,Math.PI*2),s.fill(),s.stroke()};for(const y of e.animals)_(y.x,y.z,y.type==="cow"?3:2.3,y.saved?"#8be0b4":"#fff8e7");_(n.x,n.z,4.8,"#ffd166"),s.strokeStyle="#ffe6a3",s.lineWidth=2,s.beginPath(),s.arc(x(n.x),m(n.z),7,0,Math.PI*2),s.stroke();for(const y of e.helpers||[])_(y.x,y.z,3,"#45d9ef","#102c39");d&&s.restore(),h&&s.restore()}}class xy{constructor(){this.context=null,this.master=null,this.music=null,this.effects=null,this.ambience=null,this.ambientSources=new Set,this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1,this.noiseBuffer=null,this.thunderSource=null,this.thunderEvent=null,this.weatherState=null,this.birdCountdown=4+Math.random()*6,this.muted=!1,this.paused=!1,this.timer=null,this.step=0,this.nextNoteTime=0,this.active=new Set,this.disposed=!1,this.activationGeneration=0,this.tempo=106}async start(){if(this.disposed)return!1;const t=++this.activationGeneration;try{if(!this.context){const n=globalThis.AudioContext||globalThis.webkitAudioContext;if(!n)return!1;this.context=new n,this.master=this.context.createGain(),this.music=this.context.createGain(),this.effects=this.context.createGain(),this.ambience=this.context.createGain(),this.master.gain.value=this.muted?0:.975,this.music.gain.value=.42,this.effects.gain.value=.6,this.ambience.gain.value=.38,this.music.connect(this.master),this.effects.connect(this.master),this.ambience.connect(this.master),this.master.connect(this.context.destination)}const e=this.context;return await e.resume(),this.disposed||t!==this.activationGeneration||this.context!==e?!1:(this.paused=!1,this.music.gain.cancelScheduledValues(this.context.currentTime),this.music.gain.setTargetAtTime(.42,this.context.currentTime,.025),this._begin(),!0)}catch{return!1}}setMuted(t){if(this.muted=!!t,this.muted&&this._stopAmbience(),!this.context||!this.master)return;const e=this.context.currentTime;this.master.gain.cancelScheduledValues(e),this.master.gain.setTargetAtTime(this.muted?0:.975,e,.025)}pause(){this.activationGeneration++,this.paused=!0,this._stopScheduler(),this._stopAmbience(),this.context&&this.context.state!=="closed"&&this.music.gain.setTargetAtTime(1e-4,this.context.currentTime,.025)}async resume(){return this.start()}_begin(){this.timer||this.paused||this.disposed||(this.nextNoteTime=this.context.currentTime+.06,this._schedule(),this.timer=globalThis.setInterval(()=>this._schedule(),100))}_stopScheduler(){this.timer!==null&&globalThis.clearInterval(this.timer),this.timer=null}_schedule(){if(!this.context||this.context.state!=="running"||this.paused||this.disposed)return;const t=60/this.tempo/2;if(!Number.isFinite(t)||t<=0)return;const e=this.context.currentTime;if(this.nextNoteTime<e){const n=Math.ceil((e-this.nextNoteTime)/t);this.step=(this.step+n)%128,this.nextNoteTime=Math.max(e,this.nextNoteTime+n*t)}for(let n=0;n<8&&this.nextNoteTime<e+.25;n++)this._musicStep(this.step,this.nextNoteTime,t),this.step=(this.step+1)%128,this.nextNoteTime+=t}_musicStep(t,e,n){const s=[48,53,48,55,57,53,55,48],r=[[72,76,79,null,76,74,72,null],[77,81,79,null,77,76,74,null],[72,76,79,81,79,null,76,null],[74,79,83,null,81,79,74,null],[76,81,84,null,83,81,79,null],[77,null,81,79,77,76,74,null],[74,77,79,null,83,81,79,74],[76,74,72,null,79,null,72,null]],o=Math.floor(t/16),a=t%16,c=s[o],l=o===4;if(a%4===0&&this._note(c+(a===8?7:0),e,.32,.15,"bass",this.music),a%4===2&&(this._note(c+12,e,.22,.048,"pluck",this.music),this._note(c+(l?15:16),e+.018,.22,.042,"pluck",this.music),this._note(c+19,e+.035,.22,.036,"pluck",this.music)),a%2===0){const h=r[o][a/2];h!==null&&this._note(h,e,n*1.5,.12,o%2?"flute":"marimba",this.music)}}updateAmbience(t,e={}){const n=e.weather||"sun",s=this.context&&this.context.state==="running"&&!this.paused&&!this.muted&&!this.disposed;if(this._updateThunder(typeof n=="object"?n:null,s),!s)return;const r=typeof n=="string"?n:n.type||"sun",o=typeof n=="object"&&Number.isFinite(n.intensity)?Math.max(0,Math.min(1,n.intensity)):.3,a=["rain","light-rain","heavy-rain","storm"].includes(r)?"rain":r==="wind"?"wind":"sun",c=typeof n=="object"?n.storm?"storm":n.kind||r:r,l=c==="storm"?1:c==="heavy-rain"?.85:.5;this._weather(a,o,l),this.birdCountdown-=Number.isFinite(t)?Math.max(0,Math.min(t,.25)):0,!(this.birdCountdown>0)&&(this.birdCountdown=a==="rain"?10+Math.random()*10:4+Math.random()*6,!(typeof n=="object"&&(n.storm||n.kind==="storm")||r==="storm"||a==="rain"&&o>=.7)&&this._chirp(a==="rain"?.018:.03))}_noise(){if(!this.noiseBuffer){const t=this.context;this.noiseBuffer=t.createBuffer(1,t.sampleRate*2,t.sampleRate);const e=this.noiseBuffer.getChannelData(0);for(let n=0;n<e.length;n++)e[n]=Math.random()*2-1}return this.noiseBuffer}_updateThunder(t,e){t!==this.weatherState&&(this.thunderSource&&this._releaseAmbience(this.thunderSource),this.thunderSource=null,this.thunderEvent=null,this.weatherState=t,this._restoreMusicMix());const n=t?.lightningId;if(!n||n===this.thunderEvent)return;this.thunderEvent=n;const s=t.lightningAge,r=t.thunderDelay;if(!e||!Number.isFinite(s)||!Number.isFinite(r)||s<0||r<0||s>r+.2)return;this.thunderSource&&this._releaseAmbience(this.thunderSource);const o=this.context,a=o.createBufferSource(),c=o.createBiquadFilter(),l=o.createGain(),h=o.currentTime+Math.max(.01,r-s),u=3+Math.random()*2;a.buffer=this._noise(),a.loop=!0,c.type="lowpass",c.Q.value=.35,c.frequency.setValueAtTime(400,h),c.frequency.exponentialRampToValueAtTime(85,h+u*.65),l.gain.setValueAtTime(1e-4,h),l.gain.exponentialRampToValueAtTime(.65,h+.12),l.gain.exponentialRampToValueAtTime(.32,h+u*.23),l.gain.exponentialRampToValueAtTime(.035,h+u*.56),l.gain.exponentialRampToValueAtTime(1e-4,h+u*.76),a.connect(c),c.connect(l),l.connect(this.effects);const f=[];for(const[g,x]of[[.035,.24],[.073,.18],[.119,.13],[.167,.09],[.22,.06]]){const m=o.createDelay(1.2),d=o.createGain();m.delayTime.value=u*g,d.gain.value=x,l.connect(m),m.connect(d),d.connect(this.effects),f.push(m,d)}this.music.gain.cancelScheduledValues(o.currentTime),this.music.gain.setValueAtTime(.42,o.currentTime),this.music.gain.setTargetAtTime(.16,h,.04),this.music.gain.setTargetAtTime(.42,h+u*.72,.35),this._trackAmbience(a,[c,l,...f]),this.thunderSource=a;const p=a.onended;a.onended=()=>{p(),this.thunderSource===a&&(this.thunderSource=null)},a.start(h),a.stop(h+u)}_chirp(t){const e=this.context.currentTime+.015,n=1600+Math.random()*1100,s=2+Math.floor(Math.random()*2);for(let r=0;r<s;r++){const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r*(.14+Math.random()*.035);o.type="sine",o.frequency.setValueAtTime(n*(1+r*.1),c),o.frequency.exponentialRampToValueAtTime(n*(r%2?.9:1.28),c+.07),o.frequency.exponentialRampToValueAtTime(n*.95,c+.13),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(t,c+.025),a.gain.exponentialRampToValueAtTime(1e-4,c+.15),o.connect(a),a.connect(this.ambience),this._trackAmbience(o,[a]),o.start(c),o.stop(c+.17)}}_trackAmbience(t,e){this.active.add(t),this.ambientSources.add(t),t.onended=()=>{t.disconnect();for(const n of e)n.disconnect();this.active.delete(t),this.ambientSources.delete(t)}}_weather(t,e,n=1){if(this.weatherKind!==t&&(this._stopWeather(),this.weatherKind=t,t!=="sun")){const s=this.context;this._noise();const r=s.createBufferSource(),o=s.createBiquadFilter(),a=s.createGain();r.buffer=this.noiseBuffer,r.loop=!0,o.type="lowpass",o.frequency.value=t==="rain"?2200:500,o.Q.value=.3,a.gain.value=1e-4,r.connect(o),o.connect(a),a.connect(this.ambience),this._trackAmbience(r,[o,a]),this.weatherSource={source:r,gain:a,filter:o},r.start()}if(this.weatherSource){const s=(t==="rain"?.032*n:.024)*e;Math.abs(s-this.weatherVolume)>.001&&(this.weatherSource.gain.gain.setTargetAtTime(s,this.context.currentTime,.8),this.weatherVolume=s)}}_stopWeather(){this.weatherSource&&this._releaseAmbience(this.weatherSource.source),this.weatherSource=null,this.weatherKind=null,this.weatherVolume=-1}_releaseAmbience(t){try{t.stop()}catch{}t.onended?.(),t.onended=null}_restoreMusicMix(){if(!this.context||!this.music||this.context.state==="closed")return;const t=this.context.currentTime;this.music.gain.cancelScheduledValues(t),this.music.gain.setTargetAtTime(this.paused?1e-4:.42,t,.025)}_stopAmbience(){this._restoreMusicMix(),this._stopWeather(),this.thunderSource=null;for(const t of[...this.ambientSources])this._releaseAmbience(t);this.birdCountdown=4+Math.random()*6}_note(t,e,n,s,r="marimba",o=this.effects){if(!this.context||!o||this.disposed)return;const a=this.context,c=a.createOscillator(),l=a.createGain(),h=440*2**((t-69)/12);c.type=r==="pluck"?"triangle":"sine",c.frequency.setValueAtTime(h,e),l.gain.setValueAtTime(1e-4,e),l.gain.exponentialRampToValueAtTime(Math.max(.001,s),e+(r==="flute"?.035:.009)),l.gain.exponentialRampToValueAtTime(1e-4,e+n),c.connect(l),l.connect(o),this.active.add(c),c.onended=()=>{c.disconnect(),l.disconnect(),this.active.delete(c)},c.start(e),c.stop(e+n+.03),r==="marimba"&&this._note(t+19,e,n*.35,s*.12,"partial",o)}play(t){if(!this.context||this.context.state!=="running"||this.muted||this.disposed)return;const e=this.context.currentTime+.01;if(t==="bark"){[0,.14].forEach(r=>{const o=this.context.createOscillator(),a=this.context.createGain(),c=e+r;o.type="triangle",o.frequency.setValueAtTime(330,c),o.frequency.exponentialRampToValueAtTime(110,c+.095),a.gain.setValueAtTime(1e-4,c),a.gain.exponentialRampToValueAtTime(.11,c+.012),a.gain.exponentialRampToValueAtTime(1e-4,c+.1),o.connect(a),a.connect(this.effects),this.active.add(o),o.onended=()=>{o.disconnect(),a.disconnect(),this.active.delete(o)},o.start(c),o.stop(c+.12)});return}const s={saved:[79,84],animal:[79,84],rescue:[79,84],purchase:[72,76,79,84],unlock:[72,76,79,84],completed:[72,76,79,84,79,84],complete:[72,76,79,84,79,84],win:[72,76,79,84,79,84],click:[79]}[t];s&&s.forEach((r,o)=>this._note(r,e+o*.115,.28,.16,"marimba"))}dispose(){if(!this.disposed){this.activationGeneration++,this.disposed=!0,this._stopScheduler(),this._stopAmbience();for(const t of this.active){try{t.stop()}catch{}t.disconnect()}this.active.clear(),this.context&&this.context.state!=="closed"&&this.context.close().catch(()=>{}),this.context=null,this.master=this.music=this.effects=this.ambience=null,this.noiseBuffer=null}}}const yt=i=>document.getElementById(i);let sn,Xt,Pi,re=oM(),Gt="intro",zi="playing",bu=performance.now(),pn=0,Tl=0,Mr=0,An=0,ko=!1,Al=0,yr=!1,Eu,Rl=null;const He=new xy,Dn={x:0,z:0},Mn=new Set,Pe=(i,t)=>yt(i).classList.toggle("hidden",!t);let Co=!1;const Go=()=>{Co||aM(re)||Po("Progress is kept for this session; browser storage is unavailable.")},Tu=i=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Po(i){yt("toast").textContent=i,Pe("toast",!0),clearTimeout(Eu),Eu=setTimeout(()=>Pe("toast",!1),2800)}function Wi(){yt("points").textContent=re.points,yt("sound").textContent=re.music?"♫":"♪",yt("sound").setAttribute("aria-label",re.music?"Mute sound":"Enable sound"),yt("sound").style.opacity=re.music?"1":".55",yt("menu-sound")&&(yt("menu-sound").textContent=`Sound: ${re.music?"On":"Off"}`,yt("menu-sound").setAttribute("aria-pressed",String(re.music)))}async function $f(){re.music=!re.music,He.setMuted(!re.music),Go(),Wi(),re.music&&(await He.start(),(Gt!=="playing"||!re.music)&&He.pause())}function Cl(i){const t=i<Mr;yt("bark").classList.toggle("cooldown",t),yt("bark").disabled=t,yt("bark").style.setProperty("--bark-progress",String(Math.max(0,Math.min(1,1-(Mr-i)/2100))))}function Kf(i=!1,t=0){Pe("countdown",i),yt("countdown").textContent=i?`${Math.ceil(t)}s`:"",yt("countdown").setAttribute("aria-label",i?`${Math.ceil(t)} seconds remaining to deliver the flock`:"Delivery countdown has not started"),yt("countdown").classList.toggle("running",i),yt("countdown").classList.toggle("urgent",i&&t<=10)}function Is(){Dn.x=Dn.z=0,ui=null,Mn.clear(),yt("stick").style.transform="translate(0,0)"}function Ho(){const i=Math.max(0,Math.min(1,pn/3)),t=Math.max(0,Math.min(1,pn/.65,(3-pn)/1.2));yt("level-introduction").style.opacity=String(t),yt("level-introduction").style.setProperty("--level-scale",String(.72+.48*(1-(1-i)**2))),Pe("level-introduction",Gt==="playing"&&pn<3)}async function Bi(i=re.highestLevel){i=Math.max(0,Math.min(99,Math.floor(Number(i)||0))),Di(!1),Xt=Lu(i),Pi={...Xt.dog,heading:Xt.dog.heading??Math.atan2(Xt.spawn.x-Xt.dog.x,Xt.spawn.z-Xt.dog.z)},pn=0,An=0,ko=!1,Tl=Mr=0,Is(),sn.setLevel(Xt),Gt="playing",document.body.classList.toggle("in-game",!0),Cl(performance.now());for(const t of["intro","scene-tag"])Pe(t,!1);for(const t of["mission","controls","map-box"])Pe(t,!0);yt("level-number").textContent=`Level ${i+1}`,Ho(),yt("mission").setAttribute("aria-label",`Level ${i+1} · Livestock delivery status`),yt("total").textContent=Xt.animals.length,yt("saved").textContent=0,Kf(),yr=!1,Pe("toggle-tip",!1),yt("toggle-tip").setAttribute("aria-expanded","false"),Pe("tip",!0),zo(Pl(i)[0]),He.setMuted(!re.music),await He.start(),(Gt!=="playing"||!re.music)&&He.pause(),Wi()}const _y=14;function Pl(i){return i===0?["Drag to move Pip.","Move behind the flock to guide it.","Double-tap to woof."]:[Xt.routes.length>1?"Choose a trail on the map.":"Gather stragglers before crossing."]}function zl(){ko=!0,yr=!1,Pe("tip",!1),Pe("toggle-tip",!0),yt("toggle-tip").setAttribute("aria-expanded","false"),yt("toggle-tip").setAttribute("aria-label","Show tips")}function zo(i){Al=pn,yt("tip-text").textContent=i,yt("tip").querySelector(".tip-number").textContent=`0${An+1}`}function Vo(){Gt!=="playing"||performance.now()<Mr||(Tl=performance.now()+650,Mr=performance.now()+2100,Cl(performance.now()),He.play("bark"),sn.bark(),navigator.vibrate&&navigator.vibrate(20))}function Wo(i,t="paused"){zi=Gt==="playing"?"playing":Gt==="complete"?"complete":"intro",Gt=t,Ho(),Is(),He.pause(),yt("modal").classList.contains("hidden")&&(Rl=document.activeElement),yt("modal-card").innerHTML=i,Pe("modal",!0),Pe("controls",!1),setTimeout(()=>yt("modal-card").querySelector("button")?.focus(),30)}function Di(i=!0){Pe("modal",!1),i&&(Gt=zi,Pe("controls",Gt==="playing"),Gt==="playing"&&He.resume(),Rl?.focus()),Ho(),Is()}function Ns(){if(Gt==="reset-confirm"){yt("cancel-reset").onclick();return}if(Gt==="shop"){yt("shop-back").onclick();return}if(Gt==="paused"){Di();return}Gt!=="complete"&&(Wo(`<button class="close-modal" id="close" aria-label="Close menu">×</button><div class="eyebrow">A BREATHER IN THE MEADOW</div><h2>${Gt==="intro"?"Hello, shepherd.":"Paws for a moment."}</h2><p>Move behind the flock to push it forward. Circle around stragglers. A woof gives a gentle burst of encouragement.</p><button class="primary" id="resume">${Gt==="intro"?"Back to the meadow":"Keep herding"} <span>➜</span></button><button class="secondary" id="upgrades-menu">Visit the workshop · ${re.points} bolts</button>${Gt==="playing"?'<button class="secondary" id="restart">Restart this meadow</button>':""}<button class="secondary" id="menu-sound" aria-pressed="${re.music}">Sound: ${re.music?"On":"Off"}</button><button class="secondary danger" id="restart-game-menu">Restart Game</button><div class="eyebrow" style="margin-top:23px">YOUR MEADOWS</div><div class="level-picker">${Array.from({length:Math.min(100,re.highestLevel+1)},(i,t)=>`<button class="${t===Xt.index?"current":""}" data-level="${t}" aria-label="Play level ${t+1}">${t+1}</button>`).join("")}</div>`),yt("close").onclick=()=>Di(),yt("resume").onclick=()=>Di(),yt("menu-sound").onclick=$f,yt("upgrades-menu").onclick=Xo,yt("restart-game-menu").onclick=Jf,yt("restart")&&(yt("restart").onclick=()=>Bi(Xt.index)),yt("modal-card").querySelectorAll("[data-level]").forEach(i=>i.onclick=()=>Bi(Number(i.dataset.level))))}function Jf(){const i=Gt,t=zi,e=()=>{Gt=i,zi=t,i==="paused"?(Gt=t,Ns(),yt("restart-game-menu").focus()):(Di(!1),Rl?.focus())};Wo('<button class="close-modal" id="close" aria-label="Cancel restart">×</button><div class="eyebrow">A FRESH START</div><h2>Restart the whole game?</h2><p>This clears all level progress, earned bolts, and purchased upgrades and helpers. You’ll start again at level 1. This cannot be undone.</p><button class="secondary" id="cancel-reset">Keep my progress</button><button class="primary" id="confirm-reset">Restart Game <span>↻</span></button>',"reset-confirm"),yt("close").onclick=e,yt("cancel-reset").onclick=e,yt("confirm-reset").onclick=async()=>{re={...vr(),music:re.music},cr=0,Qs=-1/0,bi=null,Go(),Wi(),await Bi(0),Gt==="playing"&&yt("pause").focus()}}function Xo(){const i=Gt==="complete"?"complete":Gt==="paused"||Gt==="shop"?zi:Gt,t=Co?Xt.index+1:void 0,e=zf(re.upgrades,Xt.index+1);Wo(`<button class="close-modal" id="close" aria-label="Close workshop">×</button><div class="eyebrow">PIP’S LITTLE WORKSHOP</div><h2>A few clever upgrades.</h2><p>New skills open as you explore.<br>You have <strong>${re.points} bolts</strong> to spend.</p><div class="upgrade-grid">${Fo.filter(s=>s.id!=="drone").map(s=>{const r=Jn(re.upgrades,s.id),o=Jn(e,s.id),a=Mv(re,s.id,t),c=xl(re.upgrades,s.id),l=a.reason==="locked",h=l?`Next tier unlocks at level ${a.unlockLevel}`:c===null?"All tiers owned":s.tierDescriptions[r],u=r>o?`<small class="inactive-upgrade">${o?"Next owned tier activates":"Equipped"} from level ${s.unlockLevels[o]}</small>`:"";return`<article class="upgrade ${l?"locked":""}"><div class="upgrade-icon">${{speed:"ϟ",flock:"⌁",drone:"✥",helper:"♧",bark:"♪",cohesion:"❋"}[s.id]}</div><div><h3>${Tu(s.name)} <small style="font-size:9px;color:#839277">${r}/3</small></h3><p>${Tu(h)}</p>${u}</div><button data-buy="${s.id}" ${a.available?"":"disabled"}>${c===null?"Max tier":l?`Level ${a.unlockLevel}`:`${c} ✦`}</button></article>`}).join("")}</div><button class="primary" id="shop-back">${i==="complete"?"Back to your reward":"Back to the meadow"} <span>➜</span></button>`,"shop"),zi=i;const n=()=>{i==="complete"?Dl(!1):Di()};yt("close").onclick=n,yt("shop-back").onclick=n,yt("modal-card").querySelectorAll("[data-buy]").forEach(s=>s.onclick=()=>{const r=yv(re,s.dataset.buy,t);r.ok&&(He.play("purchase"),Go(),Wi(),Xo(),zi=i,Po(`${r.upgrade.tierNames[r.level-1]} equipped!`))})}let cr=0;function Dl(i=!0){i&&(cr=rM(re,Xt),Go(),Wi(),He.play("completed"),sn.celebrate(Xt.target.x,Xt.target.z)),Gt="complete";const t=Xt.result?.saved??Xt.animals.filter(s=>s.saved).length,e=Xt.animals.length,n=Xt.result?.score??0;Wo(`<div class="complete-seal">✦</div><div class="eyebrow">${t===e?"A GOOD DAY’S HERDING":"DELIVERY TIME IS UP"}</div><h2>${t===e?"Everyone’s home.":t>0?"A flock brought home.":"Try this meadow again."}</h2><p>${t} / ${e} robots delivered.<br>Score ${n} / ${Xt.reward} · Best ${re.bestScores[Xt.index]||0} / ${Xt.reward}<br>${Math.floor(pn/60)}m ${Math.floor(pn%60)}s in the countryside.</p><div class="reward">+${cr}<span style="font-size:20px"> ✦</span></div><p>${cr?"Bolts earned from your improved delivery score.":"No extra bolts this time. Deliver more robots to improve your best score."}${t>0&&t<e?" The next meadow is open.":""}</p><button class="primary" id="next">${t===0?"Try again":Xt.index>=99?"Return to the first meadow":"Next meadow"} <span>➜</span></button><button class="secondary" id="reward-shop">Visit the workshop</button><button class="secondary" id="replay">Roam this meadow again</button>`,"complete"),yt("next").onclick=()=>Bi(t===0?Xt.index:Xt.index>=99?0:Xt.index+1),yt("reward-shop").onclick=Xo,yt("replay").onclick=()=>Bi(Xt.index)}let ui=null,Zc={x:0,y:0},Qs=-1/0,bi=null,Il=!1;function vy(i){Gt!=="playing"||ui!==null||i.isPrimary===!1||i.target.closest("button,header,.map-box,.tip")||i.target!==yt("world")&&!i.target.closest("#joystick")||(i.preventDefault(),ui=i.pointerId,Zc={x:i.clientX,y:i.clientY},Il=!1,i.target.setPointerCapture?.(ui))}function My(i){if(i.pointerId!==ui)return;const t=i.clientX-Zc.x,e=i.clientY-Zc.y,n=Math.hypot(t,e),s=42;Il||=n>9,Dn.x=t/Math.max(s,n),Dn.z=e/Math.max(s,n),yt("stick").style.transform=`translate(${Dn.x*s}px,${Dn.z*s}px)`}function Ll(i){if(i.pointerId===ui){if(i.preventDefault(),i.type==="pointerup"&&!Il){const t=performance.now();bi&&Math.hypot(i.clientX-bi.x,i.clientY-bi.y)<42&&t-Qs<330?(Vo(),Qs=-1/0,bi=null):(Qs=t,bi={x:i.clientX,y:i.clientY})}else Qs=-1/0,bi=null;ui=null,Dn.x=Dn.z=0,yt("stick").style.transform="translate(0,0)"}}document.addEventListener("pointerdown",vy,{passive:!1});document.addEventListener("pointermove",My,{passive:!1});document.addEventListener("pointerup",Ll,{passive:!1});document.addEventListener("pointercancel",Ll,{passive:!1});document.addEventListener("lostpointercapture",Ll,{passive:!1});const Ul=i=>i===yt("world")||!!i.closest("#controls");document.addEventListener("touchstart",i=>{Gt==="playing"&&Ul(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("touchend",i=>{Gt==="playing"&&Ul(i.target)&&(i.preventDefault(),i.target.closest("#bark")&&Vo())},{passive:!1});document.addEventListener("gesturestart",i=>{Gt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("gesturechange",i=>{Gt==="playing"&&i.preventDefault()},{passive:!1});document.addEventListener("dblclick",i=>{Gt==="playing"&&Ul(i.target)&&i.preventDefault()},{passive:!1});document.addEventListener("keydown",i=>{if(Gt==="playing"&&["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," ","w","a","s","d","W","A","S","D"].includes(i.key)&&!i.target.closest('input,textarea,[contenteditable="true"]')&&!(i.key===" "&&i.target.closest("button"))&&(i.preventDefault(),Mn.add(i.key.toLowerCase()),i.key===" "&&Vo()),i.key==="Escape"&&(i.preventDefault(),Ns()),i.key==="Tab"&&!yt("modal").classList.contains("hidden")){const t=[...yt("modal-card").querySelectorAll("button:not([disabled])")],e=t[0],n=t.at(-1);i.shiftKey&&document.activeElement===e?(i.preventDefault(),n.focus()):!i.shiftKey&&document.activeElement===n&&(i.preventDefault(),e.focus())}});document.addEventListener("keyup",i=>Mn.delete(i.key.toLowerCase()));window.addEventListener("blur",()=>{Is(),ui=null,Gt==="playing"&&Ns()});document.addEventListener("visibilitychange",()=>{document.hidden&&Gt==="playing"&&Ns()});window.addEventListener("resize",()=>sn?.resize());yt("play").onclick=()=>Bi();yt("restart-game-main").onclick=Jf;yt("bark").onclick=Vo;yt("pause").onclick=Ns;yt("home").onclick=i=>{i.preventDefault(),Ns()};yt("wallet").onclick=Xo;yt("sound").onclick=$f;yt("dismiss-tip").onclick=zl;yt("toggle-tip").onclick=()=>{if(Gt==="playing"){if(!yt("tip").classList.contains("hidden")){zl();return}ko=!1,yr=!0,An=0,Al=pn,zo(Pl(Xt.index)[0]),Pe("tip",!0),yt("toggle-tip").setAttribute("aria-expanded","true"),yt("toggle-tip").setAttribute("aria-label","Hide tips")}};let qa=0,jf;function Qf(i){requestAnimationFrame(Qf);const t=Math.min((i-bu)/1e3,.05);if(bu=i,!sn||!Xt)return;if(Gt==="playing"){pn+=t;const n=Mn.has("arrowright")||Mn.has("d")?1:Mn.has("arrowleft")||Mn.has("a")?-1:Dn.x,s=Mn.has("arrowdown")||Mn.has("s")?1:Mn.has("arrowup")||Mn.has("w")?-1:Dn.z,r=iM(Xt,Pi,{x:n,z:s,bark:i<Tl},t,re.upgrades);yt("saved").textContent=r.saved,Kf(r.countdownStarted,r.remaining);for(const o of r.events)o.type==="animalSaved"?He.play("saved"):o.type==="buddyBark"?(He.play("bark"),sn.bark(o)):o.type==="gateToggled"?Po(o.open?"Gate open — guide the flock through.":"Gate closed."):o.type==="gateBlocked"&&Po("Gate is occupied — let everyone clear it first.");if(Cl(i),!ko){const o=yr||Xt.index!==0||An>0?_y:5;if(pn-Al>=o){const a=Pl(Xt.index);yr?(An=(An+1)%a.length,zo(a[An])):An+1<a.length?(An++,zo(a[An])):zl()}}r.justCompleted&&Dl()}else Gt==="complete"&&!document.hidden&&nM(Xt,t);Ho(),sn.update(Xt,Pi,!document.hidden&&(Gt==="playing"||Gt==="intro"||Gt==="complete")?t:0,Gt==="intro"),jf?.();const e=sn.nature?.weather||Xt.weather;if(e){const[n,s]={sun:["☀","Clear skies"],wind:["↝","Breezy"],rain:["☂","Light rain"],"heavy-rain":["☂","Heavy rain"],storm:["ϟ","Thunderstorm"]}[e.kind||e.type||e]||["☀","Clear skies"];yt("weather-status").textContent=n,yt("weather-status").setAttribute("title",s),yt("weather-status").setAttribute("aria-label",s)}Gt==="playing"&&He.updateAmbience?.(t,{weather:sn.nature?.weather||Xt.weather||"sun",level:Xt.index+1,time:Xt.time,dog:Pi,animals:Xt.animals}),qa+=t,qa>.1&&(qa=0,sn.drawMap(yt("map"),Xt,Pi))}try{sn=new gy(yt("world")),Xt=Lu(0),Pi={...Xt.dog,heading:Math.PI/2},sn.setLevel(Xt),Wi(),Pe("loading",!1),requestAnimationFrame(Qf)}catch(i){Pe("loading",!1),Pe("error",!0),yt("error-message").textContent=`This meadow needs WebGL 2. Try Safari, Chrome or Firefox with graphics enabled. ${i.message}`,console.error(i)}cd(async()=>{const{installQA:i}=await import("./qa-DS5F87nJ.js");return{installQA:i}},__vite__mapDeps([0,1]),import.meta.url).then(({installQA:i})=>{const t=()=>{Gt="qa",Is(),He.pause(),Di(!1),Pe("controls",!1)},e=async s=>{const r=Bi(s);t(),await r,t()},n=i({getRenderer:()=>sn,getMode:()=>Gt,getState:()=>({level:Xt,dog:Pi,profile:re,elapsed:pn}),enterSession:async()=>{Co||(Co=!0,re=vr(),await e(0))},pause:t,isPaused:()=>Gt==="qa",resume:()=>{if(Xt.completed){Dl(!1);return}Gt="playing",Is(),Pe("controls",!0),He.resume()},jump:e,resetSession:async()=>{re=vr(),cr=0,await e(0)},canOccupy:he,updateWallet:Wi});jf=()=>n.update()});export{Ae as a};
