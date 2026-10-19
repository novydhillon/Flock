import { parseTracker } from './parser.js';

const REPO = 'https://github.com/novydhillon/Flock';
const API = 'https://api.github.com/repos/novydhillon/Flock';
const RAW = 'https://raw.githubusercontent.com/novydhillon/Flock';
const COLUMNS = [['open','Open'],['progress','In progress'],['review','In review'],['closed','Closed']];
const KNOWN = ['P0','P1','P2','P3','P4'];

export function createTracker(doc, fetcher = globalThis.fetch) {
  const $ = id => doc.getElementById(id);
  let items = [], revision = '', loaded = false, busy = false, lastCard;
  const board = $('board'), dialog = $('ticket-dialog');
  function element(tag, text, className) {
    const node = doc.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function openTicket(ticket, card) {
    lastCard = card;
    $('ticket-id').textContent = ticket.id;
    $('ticket-title').textContent = ticket.title;
    $('ticket-tags').replaceChildren(...[ticket.priority,ticket.status,ticket.type].filter(Boolean).map(t => element('span',t,'tag')));
    const meta = $('ticket-meta'); meta.replaceChildren();
    const pair = (label,value) => { meta.append(element('dt',label),value); };
    const branches = element('dd');
    if (ticket.branches.length) ticket.branches.forEach(branch => {
      const a = element('a',branch,'branch');
      a.href = `${REPO}/tree/${encodeURIComponent(branch)}`;
      a.target = '_blank'; a.rel = 'noopener noreferrer'; branches.append(a);
    });
    else branches.textContent = ticket.column === 'open' ? 'Not assigned / not recorded' : 'Not recorded in ticket history';
    pair(ticket.column === 'closed' ? 'Worked in' : 'Branch',branches);
    if (ticket.depends) pair('Dependencies',element('dd',ticket.depends));
    pair('Snapshot',element('dd',`main · ${revision.slice(0,7)}`));
    $('ticket-details').replaceChildren(...(ticket.details || 'No additional details recorded.').split(/\n\s*\n/).map(p => element('p',p)));
    $('ticket-source').href = `${REPO}/blob/${revision}/${ticket.sourceFile}`;
    dialog.showModal();
  }
  function render() {
    const query = $('search').value.trim().toLowerCase(), priority = $('priority').value;
    const visible = items.filter(t => (!priority || (priority === 'other' ? !KNOWN.includes(t.priority) : t.priority === priority)) && (!query || [t.id,t.title,t.type,t.status,t.details,...t.branches].join(' ').toLowerCase().includes(query)));
    board.replaceChildren();
    for (const [key,title] of COLUMNS) {
      const tickets = visible.filter(t => t.column === key);
      const section = element('section',undefined,`column ${key}`);
      section.setAttribute('aria-labelledby',`${key}-title`);
      const header = element('div',undefined,'column-header'), heading = element('h2');
      heading.id = `${key}-title`; const icon = element('span',undefined,'status-icon'); icon.setAttribute('aria-hidden','true');
      heading.append(icon,doc.createTextNode(title));
      const count = element('span',String(tickets.length),'count'); count.setAttribute('aria-label',`${tickets.length} ${title.toLowerCase()} tasks`);
      header.append(heading,count);
      const cards = element('div',undefined,'cards');
      for (const ticket of tickets) {
        const card = element('button',undefined,'task'); card.type = 'button'; card.dataset.id = ticket.id;
        card.style.setProperty('--priority-color',`var(--${KNOWN.includes(ticket.priority) ? ticket.priority.toLowerCase() : 'other'})`);
        card.setAttribute('aria-label',`${ticket.id}: ${ticket.title}, ${ticket.priority}, ${ticket.status}. View details`);
        const top = element('div',undefined,'task-top'); top.append(element('span',ticket.id),element('span',ticket.priority,'priority-tag'));
        const bottom = element('div',undefined,'task-bottom');
        bottom.append(element('span', ['Blocked','Deferred'].includes(ticket.status) ? `${ticket.status} · ${ticket.type}` : ticket.type,'task-type'),element('span','↗','arrow'));
        card.append(top,element('h3',ticket.title),bottom);
        card.addEventListener('click',() => openTicket(ticket,card)); cards.append(card);
      }
      if (!tickets.length) {
        const empty = element('p',undefined,'empty');
        empty.append(element('span','—','empty-symbol'),doc.createTextNode(loaded ? (query || priority ? 'No matching tasks' : 'Nothing here at the moment') : (busy ? 'Loading tasks…' : 'Tasks unavailable'))); cards.append(empty);
      }
      section.append(header,cards); board.append(section);
    }
    $('result-count').textContent = loaded ? `${visible.length} of ${items.length} tasks${query || priority ? ' · filtered' : ' across the project'}` : (busy ? 'Loading work items…' : 'Unable to load work items');
  }
  async function request(url, json = false) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(),20000);
    try {
      const response = await fetcher(url,{signal:controller.signal,cache:'no-store',credentials:'omit'});
      if (!response.ok) throw Error(`GitHub returned ${response.status}`);
      return await (json ? response.json() : response.text());
    } finally { clearTimeout(timer); }
  }
  async function refresh() {
    if (busy) return;
    busy = true; $('refresh').disabled = true; board.setAttribute('aria-busy','true');
    $('notice').hidden = true;
    if (!loaded) render();
    try {
      const head = await request(`${API}/commits/main`,true);
      if (!/^[a-f0-9]{40}$/.test(head.sha)) throw Error('GitHub did not return a valid main revision');
      const [active,closed] = await Promise.all([
        request(`${RAW}/${head.sha}/docs/ISSUES.md`),
        request(`${RAW}/${head.sha}/docs/ISSUES_CLOSED.md`)
      ]);
      for (const [text,heading] of [[active,'Work overview'],[closed,'Closed work overview']]) {
        const section = text.split(new RegExp(`^## ${heading}\\s*$`,'mi'))[1]?.split(/^## /m)[0];
        if (!section || !/^\|\s*ID\s*\|\s*Priority\s*\|\s*Type\s*\|\s*Item\s*\|\s*Status\s*\|/mi.test(section)) {
          throw Error(`The ${heading.toLowerCase()} table is missing or malformed`);
        }
      }
      const next = parseTracker(active,closed);
      if (!next.length) throw Error('No tracker overview entries found');
      items = next; revision = head.sha; loaded = true;
      $('sync').textContent = `GitHub main · ${revision.slice(0,7)} · Updated ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;
    } catch (error) {
      $('notice').textContent = `${loaded ? 'Refresh failed. Showing the last loaded snapshot.' : 'Could not load the board. Both tracker files are required; no partial board is shown.'} ${error.name === 'AbortError' ? 'The request timed out.' : error.message}. Use Refresh to try again.`;
      $('notice').hidden = false;
      if (!loaded) $('sync').textContent = 'GitHub connection unavailable';
    } finally {
      busy = false; $('refresh').disabled = false; board.setAttribute('aria-busy','false'); render();
    }
  }
  $('search').addEventListener('input',render);
  $('priority').addEventListener('change',render);
  $('refresh').addEventListener('click',refresh);
  $('close-dialog').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => {
    // Refresh/filter may have replaced the original card while the dialog was open.
    const replacement = [...board.querySelectorAll('.task')].find(n => n.dataset.id === lastCard?.dataset.id);
    (replacement || $('search')).focus();
  });
  return { refresh };
}

if (typeof document !== 'undefined') {
  const app = createTracker(document);
  app.refresh();
  setInterval(() => { if (!document.hidden && !document.getElementById('ticket-dialog').open) app.refresh(); },300000);
}
