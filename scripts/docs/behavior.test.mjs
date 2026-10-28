import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {JSDOM} from 'jsdom';
import {root,pages} from './build.mjs';
const read=path=>readFileSync(resolve(root,path),'utf8');
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function launch({copyFailure=false}={}){
  const dom=new JSDOM(read('docs/html/architecture.html'),{url:'file:///flock/docs/html/architecture.html',runScripts:'outside-only'}),w=dom.window,d=w.document,renders=[];
  const diagrams=[...d.querySelectorAll('.mermaid')],diagramSources=diagrams.map(node=>node.textContent);
  const dialog=d.getElementById('search-dialog');
  dialog.showModal=()=>dialog.setAttribute('open','');
  dialog.close=()=>{dialog.removeAttribute('open');dialog.dispatchEvent(new w.Event('close'));};
  d.execCommand=()=>!copyFailure;
  w.mermaid={initialize:config=>renders.push({theme:config.theme}),run:async({nodes})=>{assert.deepEqual([...nodes],diagrams);for(const [index,n] of [...nodes].entries()){assert.equal(n.textContent,diagramSources[index]);assert.equal(n.hasAttribute('data-processed'),false);n.innerHTML='<svg aria-label="DOM substitute diagram"></svg>';n.dataset.processed='true';}}};
  w.eval(read('docs/html/assets/search-index.js'));w.eval(read('docs/html/assets/docs.js'));
  return {dom,w,d,renders,diagrams};
}
test('offline search covers issue IDs, no results and keyboard/focus navigation',async()=>{
  const {dom,w,d}=launch();try{
    d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'/',bubbles:true,cancelable:true}));
    const input=d.getElementById('search-input');assert.equal(d.activeElement,input);
    input.value='F-025';input.dispatchEvent(new w.Event('input'));
    assert.ok(d.querySelector('#search-results a[href="issues-closed.html"]'));
    input.value='F-BIRD-001';input.dispatchEvent(new w.Event('input'));
    assert.ok(d.querySelector('#search-results a[href="issues.html"]'));
    input.value='not-a-real-doc-phrase-zz';input.dispatchEvent(new w.Event('input'));
    assert.equal(d.querySelectorAll('#search-results li').length,0);assert.match(d.getElementById('search-count').textContent,/No matching/);
    d.getElementById('search-dialog').close();assert.equal(d.activeElement,d.getElementById('open-search'));
  }finally{dom.window.close();}
});
test('clipboard failure leaves no temporary editor; success is announced',async()=>{
  for(const copyFailure of [false,true]){
    const {dom,d}=launch({copyFailure});try{
      const button=d.querySelector('.copy-code');button.click();await settle();
      assert.equal(d.querySelectorAll('textarea').length,0);
      assert.match(d.getElementById('copy-status').textContent,copyFailure?/Clipboard unavailable/:/Code copied/);
      assert.equal(d.activeElement,button);
    }finally{dom.window.close();}
  }
});
test('appearance changes rerender diagrams with retained source and newest theme',async()=>{
  const {dom,d,renders,diagrams}=launch();try{
    assert.ok(diagrams.length>0);
    await settle();assert.equal(renders.at(-1).theme,'neutral');
    d.getElementById('theme-toggle').click();await settle();assert.equal(renders.at(-1).theme,'dark');
    d.getElementById('theme-toggle').click();d.getElementById('theme-toggle').click();d.getElementById('theme-toggle').click();
    await settle();assert.equal(renders.at(-1).theme,'neutral');assert.equal(d.documentElement.dataset.theme,'light');
    assert.equal(d.querySelectorAll('.mermaid svg').length,diagrams.length);
    for(const node of diagrams)assert.equal(node.querySelectorAll('svg').length,1);
  }finally{dom.window.close();}
});
test('all generated diagram sources parse with the pinned Mermaid version',async()=>{
  const dom=new JSDOM('<!doctype html><html><body></body></html>');
  const previousWindow=globalThis.window,previousDocument=globalThis.document;
  globalThis.window=dom.window;globalThis.document=dom.window.document;
  try{
    const {default:mermaid}=await import('mermaid');mermaid.initialize({startOnLoad:false,securityLevel:'strict'});let diagrams=0;
    for(const page of pages)for(const match of read(page.source).matchAll(/```mermaid\r?\n([\s\S]*?)```/g)){await mermaid.parse(match[1]);diagrams++;}
    assert.ok(diagrams>=9);console.log(`Parsed ${diagrams} real Mermaid sources; no SVG layout claim.`);
  }finally{globalThis.window=previousWindow;globalThis.document=previousDocument;dom.window.close();}
});
