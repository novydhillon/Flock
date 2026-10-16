import { gateSegment, closestOnSegment, distance, hasClearGroundPath, canOccupy } from './world.js';

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
  level.geometryRevision=(level.geometryRevision||0)+1;
  level.flockVisibility?.clear();
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
