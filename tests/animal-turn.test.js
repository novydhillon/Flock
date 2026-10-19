import test from 'node:test';
import assert from 'node:assert/strict';
import {updateAnimalTurn,animalGaitSpeed} from '../src/animal-turn.js';
for (const [type,seconds] of [['sheep',.5],['cow',.75]]) {
  test(`${type} quarter turn timing and stationary walking at multiple frame rates`,()=>{
    for (const fps of [30,60,120]) {
      const pose={rotation:{y:0},userData:{}},animal={type,heading:Math.PI/2,vx:0,vz:0};
      const frames=seconds*fps;
      for(let i=0;i<Math.floor(frames);i++) {
        const before=pose.rotation.y;
        updateAnimalTurn(pose,animal,1/fps);
        assert.ok(pose.rotation.y-before<=Math.PI/2/seconds/fps+1e-12);
        assert.ok(animalGaitSpeed(animal,pose.userData.turnSpeed)>0);
      }
      if(frames%1)updateAnimalTurn(pose,animal,(frames%1)/fps);
      assert.ok(Math.abs(pose.rotation.y-Math.PI/2)<1e-10);
      updateAnimalTurn(pose,animal,1/fps);
      assert.ok(animalGaitSpeed(animal,pose.userData.turnSpeed)<1e-10);
    }
  });
}
test('shortest wraparound, pause and moving gait',()=>{
  const pose={rotation:{y:Math.PI-.1},userData:{}},animal={type:'sheep',heading:-Math.PI+.1,vx:0,vz:0};
  updateAnimalTurn(pose,animal,.1);
  assert.ok(Math.abs(pose.rotation.y-(Math.PI+.1))<1e-10);
  const frozen=structuredClone(pose);updateAnimalTurn(pose,animal,0);assert.deepEqual(pose,frozen);
  assert.equal(animalGaitSpeed({...animal,vx:3,vz:4},1),5);
});
