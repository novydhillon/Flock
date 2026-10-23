import { gateSegment, closestOnSegment, distance, hasClearGroundPath, canOccupy } from './world.js';
import { animalRadius } from './animal-size.js';

export const GATE_BUTTON_RADIUS=.65;
/** Fixed wall panels face both sides of the barrier. Their approach points
 * keep a ground body's centre outside the fence/wall collision strip. */
export function gateSwitchPanels(gate){
  const f={x:Math.sin(gate.heading),z:Math.cos(gate.heading)},side=gate.width/2+.65;
  const thickness=gate.material==='stone'?.3:.18;
  const point=(sign,offset)=>({x:gate.x+f.x*sign*offset+f.z*side,z:gate.z+f.z*sign*offset-f.x*side});
  return [-1,1].map(sign=>({...point(sign,thickness+.08),y:1.05,sign,heading:gate.heading+(sign<0?Math.PI:0),approach:point(sign,thickness+.62+.12)}));
}
/** Contact targets, retained under the original public helper name. */
export function gateButtons(gate){return gateSwitchPanels(gate).map(panel=>panel.approach);}
function changedGeometry(level){
  level.geometryRevision=(level.geometryRevision||0)+1;
  level.flockVisibility?.clear();
}
function panelOccupied(level,gate,dog){
  const {a,b}=gateSegment(gate),thickness=gate.material==='stone'?.3:.18;
  const bodies=[{body:dog,radius:.62},...(level.animals||[]).map(body=>({body,radius:animalRadius(body)})),
    ...(level.helpers||[]).filter(body=>body.type==='helper').map(body=>({body,radius:.62}))];
  return bodies.some(({body,radius})=>body&&distance(body,closestOnSegment(body,a,b))<radius+thickness+.02);
}
/** Pip and ground Buddy share one contact latch. Everyone must leave both
 * panels before another toggle; overlapping contacts never double-toggle. */
export function updateGateContacts(level,dog){
  const events=[],actors=[dog,...(level.helpers||[]).filter(body=>body.type==='helper')].filter(Boolean);
  for(const gate of level.gates||[]){
    if(!gate.operable)continue;
    const panels=gateSwitchPanels(gate),f={x:Math.sin(gate.heading),z:Math.cos(gate.heading)};
    const onSide=(body,panel)=>((body.x-gate.x)*f.x+(body.z-gate.z)*f.z)*panel.sign>0;
    const touching=actors.some(body=>panels.some(p=>onSide(body,p)&&distance(body,p)<=GATE_BUTTON_RADIUS+.62));
    const latched=Boolean(gate.buttonContact);
    // A small release margin prevents a stationary boundary contact chattering.
    if(!touching){if(actors.every(body=>panels.every(p=>!onSide(body,p)||distance(body,p)>GATE_BUTTON_RADIUS+.62+.2)))gate.buttonContact=false;continue;}
    gate.buttonContact=true;
    if(latched)continue;
    const actor=actors.find(body=>canOccupy(level,body.x,body.z,.62)&&panels.some(p=>onSide(body,p)&&distance(body,p)<=GATE_BUTTON_RADIUS+.62&&hasClearGroundPath(level,body,p.approach,.62)));
    if(!actor)continue;
    if(gate.open&&panelOccupied(level,gate,dog)){events.push({type:'gateBlocked',id:gate.id});continue;}
    gate.open=!gate.open;changedGeometry(level);events.push({type:'gateToggled',id:gate.id,open:gate.open});
  }
  return events;
}

export const GATE_REACH=3.2;
/** Select only a closed panel Pip can reach on this side. A short approach
 * ends before the solid panel, so walls/trees/water cannot grant remote access. */
export function accessibleGate(level,dog){
  if(!level||!dog)return null;
  return (level.gates||[]).filter(g=>g.operable&&!g.open).map(gate=>{
    const segment=gateSegment(gate),nearest=closestOnSegment(dog,segment.a,segment.b),d=distance(dog,nearest);
    if(d>GATE_REACH||d<.001||!canOccupy(level,dog.x,dog.z,.62))return null;
    const clearance=.62+(gate.material==='stone'?.3:.18)+.08;
    const approach={x:nearest.x+(dog.x-nearest.x)/d*clearance,z:nearest.z+(dog.z-nearest.z)/d*clearance};
    return hasClearGroundPath(level,dog,approach,.62)?{gate,d}:null;
  }).filter(Boolean).sort((a,b)=>a.d-b.d||a.gate.id.localeCompare(b.gate.id))[0]?.gate||null;
}
export function openNearbyGate(level,dog,id){
  const gate=accessibleGate(level,dog);
  if(!gate||gate.id!==id)return false;
  gate.open=true;
  // Simulation visibility memoization must not survive changed geometry.
  changedGeometry(level);
  return true;
}
/** Independent contextual action: no bark dispatch, cooldown or helper access. */
export function createGateControl({document,getState,onOpen=()=>{}}){
  const button=document.createElement('button');button.id='open-gate';button.type='button';button.className='gate-action hidden';button.textContent='Open gate';button.setAttribute('aria-label','Open nearby gate');
  document.getElementById('controls').appendChild(button);
  let selected=null;
  const update=()=>{const {level,dog,playing}=getState();selected=playing?accessibleGate(level,dog):null;button.classList.toggle('hidden',!selected);button.disabled=!selected;return selected;};
  const activate=()=>{const {level,dog,playing}=getState();if(!playing||!selected||!openNearbyGate(level,dog,selected.id))return false;onOpen(selected);update();return true;};
  button.onclick=activate;
  // The game's touchend handler cancels native clicks on the control surface.
  button.addEventListener('touchend',event=>{event.preventDefault();event.stopPropagation();activate();},{passive:false});
  return {button,update,activate};
}
