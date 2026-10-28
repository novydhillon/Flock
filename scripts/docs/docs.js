(() => {
  const dialog=document.getElementById('search-dialog'),input=document.getElementById('search-input'),results=document.getElementById('search-results'),count=document.getElementById('search-count');
  const opener=document.getElementById('open-search');
  function openSearch(){dialog.showModal();input.focus();}
  opener.addEventListener('click',openSearch);
  dialog.addEventListener('close',()=>opener.focus());
  document.addEventListener('keydown',e=>{const editing=e.target.closest?.('input,textarea,[contenteditable]');if(!editing&&(e.key==='/'||((e.ctrlKey||e.metaKey)&&e.key==='k'))){e.preventDefault();if(!dialog.open)openSearch();}});
  input.addEventListener('input',()=>{
    const terms=input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);results.replaceChildren();
    if(!terms.length){count.textContent='Type to search all documents.';return;}
    const matches=(window.FLOCK_DOC_SEARCH||[]).filter(p=>terms.every(t=>(p.title+' '+p.text).toLowerCase().includes(t))).sort((a,b)=>Number(b.title.toLowerCase().includes(terms[0]))-Number(a.title.toLowerCase().includes(terms[0])));
    count.textContent=matches.length?`${matches.length} matching document${matches.length===1?'':'s'}.`:'No matching documents. Try a shorter phrase or an issue ID.';
    for(const p of matches){const li=document.createElement('li'),a=document.createElement('a'),title=document.createElement('strong'),excerpt=document.createElement('small');a.href=p.url;title.textContent=p.title;const at=p.text.toLowerCase().indexOf(terms[0]),start=Math.max(0,at-60);excerpt.textContent=(start?'…':'')+p.text.slice(start,start+200)+'…';a.append(title,excerpt);li.append(a);results.append(li);}
  });
  let theme='light';try{theme=localStorage.getItem('flock-doc-theme')||'light';}catch{}
  if(theme==='dark')document.documentElement.dataset.theme='dark';
  document.getElementById('theme-toggle').addEventListener('click',()=>{theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('flock-doc-theme',theme);}catch{}paintDiagrams();});
  for(const button of document.querySelectorAll('.copy-code'))button.addEventListener('click',async()=>{
    const code=button.closest('.code-block').querySelector('code').textContent;
    let area;try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(code);else{area=document.createElement('textarea');area.value=code;area.className='clipboard-helper';area.setAttribute('aria-label','Temporary clipboard helper');document.body.append(area);area.select();if(!document.execCommand('copy'))throw Error('Clipboard unavailable');}button.textContent='Copied';document.getElementById('copy-status').textContent='Code copied to clipboard.';}catch{button.textContent='Select code to copy';document.getElementById('copy-status').textContent='Clipboard unavailable. Select the code and copy it manually.';}finally{area?.remove();button.focus();}setTimeout(()=>button.textContent='Copy code',2400);
  });
  // Enhance only tracker overview tables; other reference tables retain source order.
  const collator=new Intl.Collator('en',{numeric:true,sensitivity:'base'});
  for(const table of document.querySelectorAll('main table')){
    const headers=[...table.querySelectorAll('thead th')];
    if(headers.map(h=>h.textContent.trim()).join('|')!=='ID|Priority|Type|Item|Status|Depends on')continue;
    const body=table.tBodies[0];
    if(!body)continue;
    const rows=[...body.rows];
    let active=-1,descending=false;
    for(const index of [0,1,2,4]){
      const header=headers[index],label=header.textContent.trim(),button=document.createElement('button');
      button.type='button';button.className='sort-column';button.textContent=label;
      button.setAttribute('aria-label',`Sort by ${label}`);
      header.replaceChildren(button);header.setAttribute('aria-sort','none');
      button.addEventListener('click',()=>{
        descending=active===index?!descending:false;active=index;
        for(const i of [0,1,2,4])headers[i].setAttribute('aria-sort',i===index?(descending?'descending':'ascending'):'none');
        const ordered=rows.map((row,original)=>({row,original})).sort((a,b)=>{
          const comparison=collator.compare(a.row.cells[index].textContent.trim(),b.row.cells[index].textContent.trim());
          return (descending?-comparison:comparison)||a.original-b.original;
        });
        body.append(...ordered.map(entry=>entry.row));
      });
    }
  }
  const diagrams=[...document.querySelectorAll('.mermaid')].map(node=>({node,source:node.textContent}));
  let diagramWork=Promise.resolve();
  function paintDiagrams(){
    if(!window.mermaid)return;
    const requestedTheme=theme;
    diagramWork=diagramWork.catch(()=>{}).then(async()=>{
      if(requestedTheme!==theme)return;
      for(const {node,source} of diagrams){node.textContent=source;node.removeAttribute('data-processed');}
      mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:requestedTheme==='dark'?'dark':'neutral',flowchart:{htmlLabels:false},themeVariables:{fontFamily:'system-ui, sans-serif'},suppressErrorRendering:true});
      try{await mermaid.run({nodes:diagrams.map(d=>d.node)});}catch{document.getElementById('copy-status').textContent='A diagram could not render. Expand its source below the diagram.';}
    });
  }
  paintDiagrams();
})();
