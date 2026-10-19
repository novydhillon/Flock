import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseTracker } from '../tracker/parser.js';

const table = rows => `## Work overview\n\n| ID | Priority | Type | Item | Status | Depends on |\n|---|---|---|---|---|---|\n${rows}\n\n## Details\n`;
const row = (id, priority, status = 'Open') => `| ${id} | ${priority} | Feature | Title ${id} | ${status} | — |`;

test('parses only authoritative overview IDs and preserves statuses with priority ordering', () => {
  const active = table([
    row('F-BIRD-001', 'P2'), row('F-002', 'P0', 'In progress'), row('F-003', 'P1', 'In review'),
    row('F-004', 'P3', 'Blocked'), row('F-005', 'P4', 'Deferred'), row('F-006', 'Later'), row('F-007', 'P2'),
  ].join('\n')) + '\n### F-999 — Historical mention\nDo not create a ticket.\n';
  const items = parseTracker(active, '');
  assert.equal(items.length, 7);
  assert.deepEqual(items.map(task => task.priority), ['P0', 'P1', 'P2', 'P2', 'P3', 'P4', 'Later']);
  assert.equal(items.find(task => task.id === 'F-002').column, 'progress');
  assert.equal(items.find(task => task.id === 'F-003').column, 'review');
  assert.equal(items.find(task => task.id === 'F-004').status, 'Blocked');
  assert.equal(items.find(task => task.id === 'F-005').column, 'open');
});

test('unstrikes closed overview fields without inheriting historical status', () => {
  const closed = table(row('F-001', 'P1', 'Done').replace(/ ([^|]+) (?=\|)/g, ' ~~$1~~ '))
    .replace('## Work overview', '## Closed work overview')
    + '\n### F-001 — ~~Accepted work~~\n\n**Status:** Review on `feature/accepted`.\n';
  const [task] = parseTracker('', closed);
  assert.equal(task.id, 'F-001');
  assert.equal(task.title, 'Title F-001');
  assert.equal(task.column, 'closed');
  assert.equal(task.status, 'Done');
  assert.deepEqual(task.branches, ['feature/accepted']);
  assert.equal(task.sourceFile, 'docs/ISSUES_CLOSED.md');
});

test('scopes branches to matching IDs, heading groups and execution-table rows', () => {
  const active = table([row('F-001', 'P1', 'In progress'), row('F-002', 'P1'), row('F-003', 'P1'), row('F-004', 'P1')].join('\n')) + `
### F-001 — Own work

Owner Codex, branch \`feature/one\` from main \`abcdef1\`.

F-002 execution: source \`abcdef2\` on local \`feature/two\`.

## Shared execution — F-003–F-004

Owner: Codex; branch \`shared/fix\`.

## Unrelated history

Working branch: \`unrelated\`.

| Issue | Owner | Branch/worktree |
|---|---|---|
| F-003 | Codex | \`table/three\` |
| F-004 | Codex | Integrated source |
`;
  const tasks = new Map(parseTracker(active, '').map(task => [task.id, task]));
  assert.deepEqual(tasks.get('F-001').branches, ['feature/one']);
  assert.deepEqual(tasks.get('F-002').branches, ['feature/two']);
  assert.deepEqual(tasks.get('F-003').branches, ['shared/fix', 'table/three']);
  assert.deepEqual(tasks.get('F-004').branches, ['shared/fix']);
  assert.match(tasks.get('F-001').details, /Own|Owner/);
  assert.doesNotMatch(tasks.get('F-001').details, /feature\/two/);
});

test('planning branches are not represented as implementation ownership', () => {
  const tasks = parseTracker(table(row('F-BIRD-001', 'P2')) + `
## Bird planning

F-BIRD-001 is Open; documentation branch: \`plan/bird-behaviour\`.

### F-BIRD-001 — Planned bird

**Status:** Open. Owner: unassigned. Branch: not yet claimed.
`, '');
  assert.deepEqual(tasks[0].branches, []);
});

test('bold branch labels and exact issue heading ownership remain scoped', () => {
  const tasks = parseTracker(table([row('F-TRACK-001', 'P2', 'In progress'), row('F-061', 'P2'), row('F-003', 'P2')].join('\n')) + `
### F-TRACK-001 — Tracker

**Status:** In progress. **Owner:** Codex. **Branch:** \`feature/work-tracker\`, based on main \`abcdef1\`.

### F-061 — Buddy

**Review**, owner Codex, branch \`buddy_update\`.

### F-003 — Branch: \`feature/heading\`

Own details.
`, '');
  assert.deepEqual(tasks.find(task => task.id === 'F-TRACK-001').branches, ['feature/work-tracker']);
  assert.deepEqual(tasks.find(task => task.id === 'F-061').branches, ['buddy_update']);
  assert.deepEqual(tasks.find(task => task.id === 'F-003').branches, ['feature/heading']);
});

test('integration branch does not leak onto preserved dependencies mentioned later', () => {
  const tasks = parseTracker(table([row('F-001', 'P2'), row('F-002', 'P2')].join('\n')) + `
## Integration record

The candidate is combined on \`integration/one\`. F-001 is Review. Preserve F-002 acceptance.
`, '');
  assert.deepEqual(tasks.find(task => task.id === 'F-001').branches, ['integration/one']);
  assert.deepEqual(tasks.find(task => task.id === 'F-002').branches, []);
});

test('active duplicate wins, escaped pipes do not shift fields, CRLF is accepted', () => {
  const active = table(row('F-001', 'P2', 'Review').replace('Title F-001', 'Title \\| detail')).replace(/\n/g, '\r\n');
  const closed = table(row('F-001', 'P1', 'Done')).replace('## Work overview', '## Closed work overview');
  const tasks = parseTracker(active, closed);
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].column, 'review');
  assert.equal(tasks[0].depends, '—');
});

test('real main tracker rows remain unique, complete and historically scoped', () => {
  const active = readFileSync(new URL('../docs/ISSUES.md', import.meta.url), 'utf8');
  const closed = readFileSync(new URL('../docs/ISSUES_CLOSED.md', import.meta.url), 'utf8');
  const tasks = parseTracker(active, closed);
  const map = new Map(tasks.map(task => [task.id, task]));
  const overviewIds = [...active.matchAll(/^\| (F-(?:[A-Z]+-)*\d{3}) \|/gm), ...closed.matchAll(/^\| ~~(F-(?:[A-Z]+-)*\d{3})~~ \|/gm)];
  assert.equal(tasks.length, new Set(overviewIds.map(match => match[1])).size);
  assert.ok(tasks.length >= 108);
  assert.equal(map.get('F-008').status, 'Deferred');
  assert.equal(map.get('F-066').column, 'closed');
  assert.ok(map.get('F-066').branches.includes('livestock_grazing'));
  assert.ok(map.get('F-064').branches.includes('art_update_cow'));
  assert.ok(map.get('F-053').branches.includes('pip_update'));
  assert.ok(map.get('F-033').branches.includes('stone_wall'));
  assert.ok(!map.get('F-053').branches.includes('stone_wall'));
  assert.deepEqual(map.get('F-BIRD-001').branches, []);
  assert.match(map.get('F-BIRD-001').details, /reproducible/);
});
