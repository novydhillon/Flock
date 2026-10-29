// Independent of the renderer, downloaded assets and saved profile.
export function createLoading({document:doc=globalThis.document,window:win=globalThis.window,reload=()=>win.location.reload()}={}){
  const overlay=doc.getElementById('loading'),status=doc.getElementById('loading-status'),detail=doc.getElementById('loading-detail'),retry=doc.getElementById('loading-retry');
  let state='loading',slowTimer,fadeTimer;
  const blocked=[...doc.body.children].filter(node=>node!==overlay&&node.tagName!=='SCRIPT').map(node=>[node,node.inert]);
  blocked.forEach(([node])=>{node.inert=true;});
  const retryNow=()=>{if(retry.hidden||retry.disabled)return;retry.disabled=true;status.textContent='Trying again...';reload();};
  const block=event=>{
    if(state==='disposed')return;
    // Capture before controller handlers, including its global audio activation.
    event.stopImmediatePropagation();
    // The loading card may scroll on short screens; never forward input to the game.
    if(overlay.contains(event.target)&&!['keydown','keyup'].includes(event.type)){
      if(event.target===retry&&event.type==='click'){event.preventDefault();retryNow();}
      return;
    }
    event.preventDefault();
    if(event.type==='keydown'&&event.key==='Tab'&&!retry.hidden)retry.focus();
    if(event.target===retry&&(event.type==='click'||event.type==='keydown'&&['Enter',' '].includes(event.key)))retryNow();
  };
  const events=['pointerdown','pointerup','click','keydown','keyup','touchstart','touchend'];
  events.forEach(type=>doc.addEventListener(type,block,{capture:true,passive:false}));
  const visibility=()=>overlay.classList.toggle('loading-paused',doc.hidden);
  doc.addEventListener('visibilitychange',visibility);visibility();
  const clearSlow=()=>win.clearTimeout(slowTimer);
  function stage(message){
    if(state!=='loading')return;
    if(status.textContent!==message)status.textContent=message;
    detail.textContent='';retry.hidden=true;clearSlow();
    slowTimer=win.setTimeout(()=>{if(state==='loading'){detail.textContent='Still getting things ready. You can wait, or retry.';retry.hidden=false;}},12000);
  }
  function dispose(){
    if(state==='disposed')return;
    state='disposed';clearSlow();win.clearTimeout(fadeTimer);
    doc.removeEventListener('visibilitychange',visibility);
    events.forEach(type=>doc.removeEventListener(type,block,true));
    blocked.forEach(([node,inert])=>{node.inert=inert;});overlay.remove();
  }
  function ready(){
    if(state!=='loading')return Promise.resolve();
    state='revealing';clearSlow();status.textContent='The meadow is ready.';
    overlay.setAttribute('aria-busy','false');overlay.classList.add('loading-ready');
    return new Promise(resolve=>{
      const finish=()=>{dispose();resolve();};
      if(win.matchMedia?.('(prefers-reduced-motion: reduce)').matches)finish();
      else fadeTimer=win.setTimeout(finish,320);
    });
  }
  function fail(error){
    if(state==='disposed')return;
    state='error';clearSlow();overlay.setAttribute('aria-busy','false');overlay.classList.add('loading-failed');
    status.textContent=error?.code==='WEBGL_UNAVAILABLE'?'This browser could not open the 3D meadow.':'The meadow could not finish loading.';
    detail.textContent=error?.code==='WEBGL_UNAVAILABLE'?'WebGL 2 is unavailable. Enable graphics acceleration or try another browser.':'Check your connection and try again. Your saved progress and upgrades are safe.';
    retry.hidden=false;retry.focus();
  }
  retry.addEventListener('click',retryNow);
  stage('Waking up the meadow…');
  return {stage,ready,fail,dispose};
}

export function requireWebGL2(canvas){
  let context;
  try{context=canvas.getContext('webgl2',{antialias:true,powerPreference:'high-performance',alpha:true,depth:true,stencil:false,premultipliedAlpha:true,preserveDrawingBuffer:false});}catch{/* Context creation can be refused. */}
  if(!context){const error=new Error('WebGL 2 context unavailable');error.code='WEBGL_UNAVAILABLE';throw error;}
  return context;
}
