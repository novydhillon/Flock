import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createGateView } from '../src/gate-view.js';

test('sliding gates retain every slat support and both rail endpoints on a changing steep contour', () => {
  const gate={x:2,z:-3,width:10,heading:.7,operable:true,open:false};
  const cosine=Math.cos(gate.heading),sine=Math.sin(gate.heading);
  // A bounded 3.9-unit field, with maximum grade below thirty degrees.
  const height=(x,z)=>1.9*Math.sin(((x-gate.x)*cosine-(z-gate.z)*sine)/3.6)
    +.05*Math.cos(((x-gate.x)*sine+(z-gate.z)*cosine)/3);
  const view=createGateView([gate],height),panel=view.getObjectByName('gate-panel');
  const matrix=new THREE.Matrix4(),world=new THREE.Matrix4(),position=new THREE.Vector3(),scale=new THREE.Vector3(),rotation=new THREE.Quaternion();
  let closed;
  for(const open of [false,true,false]){
    gate.open=open;view.update();view.updateMatrixWorld(true);
    assert.equal(panel.position.x,open?-gate.width:0);
    let slats=0,rails=0;
    const railSpans=Math.ceil(gate.width/1.2),railWidth=gate.width/railSpans;
    for(const mesh of panel.children){
      if(!mesh.isInstancedMesh)continue;
      for(let i=0;i<mesh.count;i++){
        mesh.getMatrixAt(i,matrix);matrix.decompose(position,rotation,scale);
        world.multiplyMatrices(mesh.matrixWorld,matrix);
        if(Math.abs(scale.y-1.05)<1e-6){
          const center=new THREE.Vector3().applyMatrix4(world);
          assert.ok(Math.abs(center.y-height(center.x,center.z)-.82)<3e-7,
            'each slat follows its current world location rather than the old closed contour');
          slats++;
        }
        if(Math.abs(scale.y-.15)<1e-6&&Math.abs(scale.z-.22)<1e-6){
          const first=new THREE.Vector3(-.5,0,0).applyMatrix4(world),last=new THREE.Vector3(.5,0,0).applyMatrix4(world);
          assert.ok(Math.abs(Math.hypot(last.x-first.x,last.z-first.z)-railWidth)<3e-7,
            'rail sections retain their horizontal span on a steep grade');
          const clearance=rails<railSpans?.45:1.2;
          for(const end of [first,last])assert.ok(Math.abs(end.y-height(end.x,end.z)-clearance)<3e-7,
            'each rail endpoint meets the support height at its own end');
          const midpoint=first.clone().add(last).multiplyScalar(.5);
          assert.ok(Math.abs(midpoint.y-height(midpoint.x,midpoint.z)-clearance)<.025,
            'short rail spans follow hill curvature between their supported endpoints');
          rails++;
        }
      }
    }
    assert.equal(slats,10);assert.equal(rails,2*railSpans);
    const matrices=panel.children.filter(mesh=>mesh.isInstancedMesh).map(mesh=>Array.from(mesh.instanceMatrix.array));
    if(!open){if(closed)assert.deepEqual(matrices,closed,'closing restores the original support without cumulative changes');else closed=matrices;}
  }
  view.dispose();
});
