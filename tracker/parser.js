// The overview is the source of truth; historical prose can add evidence but
// must never resurrect archived work or change a ticket's current status.
const ID = /\bF-(?:[A-Z]+-)*\d{3}\b/g;
const clean = (value = '') => value.replace(/~~/g, '').trim();

function idsIn(text) {
  const ids = new Set(text.match(ID) || []);
  // Both F-055–F-060 and F-BIRD-001–008 occur in the trackers.
  for (const match of text.matchAll(/\b(F-(?:[A-Z]+-)*)(\d{3})\s*[–—-]\s*(?:\1)?(\d{3})\b/g)) {
    const start = Number(match[2]), end = Number(match[3]);
    if (end >= start && end - start < 1000) {
      for (let n = start; n <= end; n++) ids.add(`${match[1]}${String(n).padStart(3, '0')}`);
    }
  }
  return ids;
}

function cells(line) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(clean);
}

function columnFor(status) {
  if (/\b(?:done|closed|complete|completed)\b/i.test(status)) return 'closed';
  if (/\b(?:review|in review)\b/i.test(status)) return 'review';
  if (/\b(?:in progress|in-progress|working)\b/i.test(status)) return 'progress';
  return 'open';
}

function overview(markdown, sourceFile) {
  const tasks = [];
  let inOverview = false, sawHeader = false;
  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(/^#{1,6}\s+(.*)/);
    if (heading) {
      if (inOverview) break;
      inOverview = /^(?:Closed\s+)?work overview\s*$/i.test(clean(heading[1]));
      continue;
    }
    if (!inOverview || !line.trim().startsWith('|')) continue;
    const row = cells(line);
    if (row[0] === 'ID' && row[1] === 'Priority') { sawHeader = true; continue; }
    if (!sawHeader || row.length < 6 || !/^F-(?:[A-Z]+-)*\d{3}$/.test(row[0])) continue;
    const [id, priority, type, title, status, depends] = row;
    tasks.push({ id, priority, type, title, status, column: columnFor(status), depends, details: '', branches: [], sourceFile });
  }
  return tasks;
}

function branchesIn(text) {
  // Conventional tracker metadata uses **Branch:** as well as Branch:.
  // Strip emphasis without changing underscores inside branch identifiers.
  text = text.replace(/\*\*/g, '').replace(/~~/g, '');
  // A documentation/planning branch does not identify runtime work ownership.
  if (/\b(?:documentation|planning)\s+branch\b/i.test(text)) return [];
  const branches = [];
  const patterns = [
    /\b(?:feature\s+|worktree\s+)?branch(?:\/worktree)?\s*:?\s*`([^`]+)`/gi,
    /\b(?:on|from)\s+(?:local\s+)?`([^`]+)`/gi,
    /\bworktree\s+(?:branch\s+)?`([^`]+)`/gi,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const value = match[1].trim();
      if (/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value)
        && !/^(?:main|gh-pages|HEAD|[a-f0-9]{7,40})$/.test(value)
        && !/^(?:docs|tests|validation|src)\//.test(value)
        && !/\.(?:md|js|json|html|css)$/.test(value)) branches.push(value);
    }
  }
  return branches;
}

function addEvidence(markdown, tasks) {
  const byId = new Map(tasks.map(task => [task.id, task]));
  const evidence = new Map(tasks.map(task => [task.id, []]));
  let heading = '', headingIds = new Set(), paragraph = [];
  let tableHeaders = null;
  const add = (ids, text, branches = branchesIn(text)) => {
    for (const id of ids) {
      const task = byId.get(id);
      if (!task) continue;
      if (text && !evidence.get(id).includes(text)) evidence.get(id).push(text);
      for (const branch of branches) if (!task.branches.includes(branch)) task.branches.push(branch);
    }
  };
  const flush = () => {
    if (!paragraph.length) return;
    const text = paragraph.join('\n').trim();
    paragraph = [];
    const explicit = idsIn(text);
    // A new ID at the start of a historical paragraph overrides an enclosing
    // ticket heading (the archive contains several such follow-up records).
    const startsId = /^\s*(?:\*\*|~~)?F-(?:[A-Z]+-)*\d{3}\b/.test(text);
    const scoped = startsId || !headingIds.size ? explicit : headingIds;
    const branches = branchesIn(text);
    add(scoped, text, []);
    // Generic integration records often mention dependencies or preserved work
    // after naming their own branch. Attribute that branch only to the leading
    // work IDs, rather than every ID mentioned later in the paragraph.
    let branchIds = scoped;
    if (!headingIds.size && branches.length) {
      const branchAt = Math.min(...branches.map(branch => text.indexOf(`\`${branch}\``)).filter(index => index >= 0));
      const leading = idsIn(text.slice(0, branchAt));
      if (leading.size) branchIds = leading;
      else {
        const first = text.match(ID)?.[0];
        branchIds = new Set(first ? [first] : []);
      }
    }
    add(branchIds, '', branches);
  };
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^#{1,6}\s+(.*)/);
    if (match) {
      flush(); tableHeaders = null;
      heading = match[1];
      headingIds = idsIn(heading);
      add(headingIds, '', branchesIn(heading));
      continue;
    }
    if (line.trim().startsWith('|')) {
      flush();
      const row = cells(line);
      if (row.some(cell => /^branch(?:\/worktree)?$/i.test(cell))) { tableHeaders = row; continue; }
      if (tableHeaders) {
        const index = tableHeaders.findIndex(cell => /^branch(?:\/worktree)?$/i.test(cell));
        const value = row[index]?.replace(/`/g, '').trim();
        const branch = value && /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value)
          && !/^(?:main|gh-pages|[a-f0-9]{7,40})$/.test(value) ? [value] : [];
        add(idsIn(row[0] || ''), row.map((cell, i) => `${tableHeaders[i]}: ${cell}`).join('\n'), branch);
      }
      continue;
    }
    if (!line.trim()) { flush(); continue; }
    paragraph.push(line);
  }
  flush();
  for (const task of tasks) task.details = evidence.get(task.id).join('\n\n');
}

/** Parse the public main tracker files without interpreting arbitrary Markdown as HTML. */
export function parseTracker(activeMarkdown = '', closedMarkdown = '') {
  const active = overview(activeMarkdown, 'docs/ISSUES.md');
  const closed = overview(closedMarkdown, 'docs/ISSUES_CLOSED.md');
  addEvidence(activeMarkdown, active);
  addEvidence(closedMarkdown, closed);
  // An accidental archive duplicate must not override the active source of truth.
  const unique = new Map();
  for (const task of [...active, ...closed]) if (!unique.has(task.id)) unique.set(task.id, task);
  const rank = priority => /^P\d+$/i.test(priority) ? Number(priority.slice(1)) : Infinity;
  return [...unique.values()].sort((a, b) => rank(a.priority) - rank(b.priority) || a.id.localeCompare(b.id, 'en', { numeric: true }));
}
