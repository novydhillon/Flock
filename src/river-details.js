import * as THREE from 'three';

const clamp=v=>Math.max(0,Math.min(1,v));
const cross=(a,b,c)=>(b.x-a.x)*(c.z-a.z)-(b.z-a.z)*(c.x-a.x);
function roll(seed,salt){let n=(seed^Math.imul(salt,0x9e3779b9))>>>0;n=Math.imul(n^(n>>>16),0x21f0aaad);return ((n^(n>>>15))>>>0)/4294967296;}
function triangles(geometry){const p=geometry.attributes.position,index=geometry.index,result=[];for(let i=0;i<(index?.count??p.count);i+=3){const t=[];for(let j=0;j<3;j++){const k=index?index.getX(i+j):i+j;t.push({x:p.getX(k),z:p.getZ(k)});}if(Math.abs(cross(...t))>1e-9)result.push(t);}return result;}
function contains(tris,x,z){const p={x,z};return tris.some(t=>{const a=cross(t[0],t[1],p),b=cross(t[1],t[2],p),c=cross(t[2],t[0],p),epsilon=2e-5*Math.max(1,Math.hypot(t[1].x-t[0].x,t[1].z-t[0].z),Math.hypot(t[2].x-t[1].x,t[2].z-t[1].z),Math.hypot(t[0].x-t[2].x,t[0].z-t[2].z));return a>=-epsilon&&b>=-epsilon&&c>=-epsilon||a<=epsilon&&b<=epsilon&&c<=epsilon;});}
export function riverSurfaceContains(geometry,x,z){return contains(triangles(geometry),x,z);}
// Positive texture V offsets move crests toward the first centerline point.
function tangent(river,p){const points=river.points||[];let best=Infinity,result={x:-Math.sin(river.heading||0),z:-Math.cos(river.heading||0)};for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz);if(l<1e-8)continue;const t=clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/(l*l)),d=Math.hypot(p.x-a.x-dx*t,p.z-a.z-dz*t);if(d<best){best=d;result={x:-dx/l,z:-dz/l};}}return result;}
// Intersect each bridge rail with the rendered ribbon triangles, then union the
// covered intervals. Their outer endpoints are the real bank intersections.
function bankSites(river,tris){const sites=[];for(const bridge of river.bridges||[])for(const side of [-1,1]){
  const dx=Math.sin(bridge.heading),dz=Math.cos(bridge.heading),x=bridge.x+side*dz*bridge.width/2,z=bridge.z-side*dx*bridge.width/2,intervals=[];
  for(const t of tris){const hits=[];for(let i=0;i<3;i++){const a=t[i],b=t[(i+1)%3],ex=b.x-a.x,ez=b.z-a.z,den=dx*ez-dz*ex;if(Math.abs(den)<1e-9)continue;const ax=a.x-x,az=a.z-z,u=(ax*dz-az*dx)/den,s=(ax*ez-az*ex)/den;if(u>=-1e-6&&u<=1+1e-6)hits.push(s);}if(hits.length>1){const lo=Math.max(-bridge.length/2,Math.min(...hits)),hi=Math.min(bridge.length/2,Math.max(...hits));if(hi>lo+1e-7)intervals.push([lo,hi]);}}
  intervals.sort((a,b)=>a[0]-b[0]);const merged=[];for(const v of intervals){const last=merged.at(-1);if(last&&v[0]<=last[1]+1e-5)last[1]=Math.max(last[1],v[1]);else merged.push(v.slice());}
  for(const v of merged)for(const s of v){if(Math.abs(s)>=bridge.length/2-1e-4)continue;const p={x:x+dx*s,z:z+dz*s,kind:'footing',radius:.18};sites.push({...p,direction:tangent(river,p)});}
}return sites;}
function clipToTriangle(poly,triangle){const sign=Math.sign(cross(...triangle));for(let i=0;i<3&&poly.length;i++){const a=triangle[i],b=triangle[(i+1)%3],next=[];for(let j=0;j<poly.length;j++){const p=poly[j],q=poly[(j+1)%poly.length],dp=sign*cross(a,b,p),dq=sign*cross(a,b,q),inside=dp>=-1e-8;if(inside)next.push(p);if(inside!==(dq>=-1e-8)){const t=dp/(dp-dq);next.push({x:p.x+(q.x-p.x)*t,z:p.z+(q.z-p.z)*t,u:p.u+(q.u-p.u)*t,v:p.v+(q.v-p.v)*t});}}poly=next;}return poly;}
function wakeGeometry(sites,tris,y){const positions=[],uv=[];for(const s of sites){const d=s.direction,nx=-d.z,nz=d.x,length=2.3+s.radius*2,width=.55+s.radius;const vertex=(along,across,u,v)=>({x:s.x+d.x*along+nx*across,z:s.z+d.z*along+nz*across,u,v});
  const quad=[vertex(s.radius*.5,-s.radius*.55,0,0),vertex(length,-width,0,1),vertex(length,width,1,1),vertex(s.radius*.5,s.radius*.55,1,0)];
  const minX=Math.min(...quad.map(p=>p.x)),maxX=Math.max(...quad.map(p=>p.x)),minZ=Math.min(...quad.map(p=>p.z)),maxZ=Math.max(...quad.map(p=>p.z));
  for(const t of tris){if(t.every(p=>p.x<minX)||t.every(p=>p.x>maxX)||t.every(p=>p.z<minZ)||t.every(p=>p.z>maxZ))continue;const clipped=clipToTriangle(quad,t);for(let i=1;i<clipped.length-1;i++)for(const p of [clipped[0],clipped[i],clipped[i+1]]){positions.push(p.x,y,p.z);uv.push(p.u,p.v);}}
}const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));return geometry;}

/** Presentation-only rocks and clipped, current-aligned wakes. Built once per level. */
export class RiverDetails {
  constructor(root,river,seed=0,vegetationSites=[]){
    this.root=new THREE.Group();this.root.name='River rocks and wakes';this.root.position.copy(river.mesh.position);this.root.rotation.copy(river.mesh.rotation);this.root.scale.copy(river.mesh.scale);root.add(this.root);
    const tris=triangles(river.mesh.geometry),points=river.points||[];this.sites=[];this.resources=[];
    if(!tris.length)return;
    const segments=[];let total=0;for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],length=Math.hypot(b.x-a.x,b.z-a.z);if(length>1e-6){segments.push({a,b,length,start:total});total+=length;}}
    const count=Math.min(18,Math.max(1,Math.floor(total/18)));
    for(let attempt=0;attempt<count*12 && this.sites.length<count;attempt++){
      const i=attempt;
      const distance=roll(seed,i*7+1)*total,segment=segments.find(s=>distance<=s.start+s.length);if(!segment)continue;const {a,b,length}=segment,t=(distance-segment.start)/length,dx=(b.x-a.x)/length,dz=(b.z-a.z)/length,lateral=(roll(seed,i*7+2)-.5)*river.width,radius=.23+roll(seed,i*7+3)*.23,x=a.x+(b.x-a.x)*t-dz*lateral,z=a.z+(b.z-a.z)*t+dx*lateral;
      if ((river.bridges || []).some(bridge => {
        const heading = bridge.heading ?? 0;
        const px = x - bridge.x, pz = z - bridge.z;
        const along = px * Math.sin(heading) + pz * Math.cos(heading);
        const across = px * Math.cos(heading) - pz * Math.sin(heading);
        return Math.abs(along) < bridge.length / 2 + radius + 0.5 &&
          Math.abs(across) < bridge.width / 2 + radius + 0.5;
      })) continue;
      if(!Array.from({length:12},(_,k)=>contains(tris,x+Math.cos(k*Math.PI/6)*radius,z+Math.sin(k*Math.PI/6)*radius)).every(Boolean))continue;
      if(this.sites.some(p=>Math.hypot(p.x-x,p.z-z)<p.radius+radius+.25))continue;
      this.sites.push({x,z,radius,direction:{x:-dx,z:-dz},kind:'rock',rotation:roll(seed,i*7+4)*Math.PI*2});
    }
    const y=river.mesh.geometry.attributes.position.getY(0),rocks=this.sites.length;
    if(rocks){const geometry=new THREE.IcosahedronGeometry(1,0),material=new THREE.MeshStandardMaterial({color:0x797c72,roughness:.96}),mesh=new THREE.InstancedMesh(geometry,material,rocks),pose=new THREE.Object3D();mesh.name='Seeded river rocks';for(let i=0;i<rocks;i++){const p=this.sites[i];pose.position.set(p.x,y+.02,p.z);pose.rotation.set(.15,p.rotation,.1);pose.scale.set(p.radius,p.radius*.72,p.radius*.85);pose.updateMatrix();mesh.setMatrixAt(i,pose.matrix);}mesh.castShadow=true;mesh.receiveShadow=true;this.root.add(mesh);this.resources.push(geometry,material);}
    this.sites.push(...bankSites(river,tris));
    // Plant clumps share the clipped, current-responsive obstacle wake surface.
    this.sites.push(...vegetationSites.map(site => ({ ...site, kind: 'vegetation', direction: tangent(river, site) })));
    const geometry=wakeGeometry(this.sites,tris,y+.006),material=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:false,uniforms:{time:{value:0},strength:{value:.22},speed:{value:1}},vertexShader:'varying vec2 vUv; void main(){vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec2 vUv; uniform float time; uniform float strength; uniform float speed; void main(){float edge=abs(vUv.x-.5)*2.; float phase=vUv.y*25.-edge*4.-time*speed*4.; float crest=pow(max(0.,sin(phase)),7.); float alpha=crest*(1.-vUv.y)*(1.-smoothstep(.62,1.,edge))*smoothstep(0.,.08,vUv.y)*strength; gl_FragColor=vec4(.77,.9,.91,alpha); }'});
    this.wakes=new THREE.Mesh(geometry,material);this.wakes.name='Rock and footing wakes';this.root.add(this.wakes);this.resources.push(geometry,material);
  }
  update(dt,activity,currentSpeed=.12){
    if(!this.wakes)return;
    const u=this.wakes.material.uniforms;
    // Integrating actual current into phase prevents wake jumps as weather changes.
    const speedRatio=Math.max(0,currentSpeed)/.12;
    u.time.value+=dt*speedRatio;
    u.strength.value=(.22+activity*.3)*Math.min(1.5,.8+speedRatio*.2);
    u.speed.value=1;
  }
  dispose(){this.root.traverse(o=>{if(o.isInstancedMesh)o.dispose();});this.root.removeFromParent();for(const r of this.resources)r.dispose();this.resources.length=0;}
}
