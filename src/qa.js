import './qa.css';

/** QA 0 is a tutorial shortcut, never a 101st campaign level. */
export function qaLevelIndex(value) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0 || number > 100 || String(value).trim() === '') throw new Error('Choose QA 0 (tutorial) or a public level from 1 to 100.');
  return number === 0 ? 0 : number - 1;
}

export function adjustQABolts(profile, amount, direction = 1) {
  const count = Number(amount);
  if (String(amount).trim() === '' || !Number.isSafeInteger(count) || count < 0 || ![1, -1].includes(direction)) throw new Error('Enter a finite, nonnegative whole number of bolts.');
  const next = profile.points + count * direction;
  if (!Number.isSafeInteger(next)) throw new Error('That bolt balance is too large.');
  profile.points = Math.max(0, next);
  return profile.points;
}

export function moveQAAnimal(level, id, xValue, zValue, { override = false, canOccupy, paused = false } = {}) {
  if (!paused) throw new Error('Pause QA editing before moving animals.');
  const animal = level.animals.find(a => String(a.id) === String(id));
  if (!animal) throw new Error('Choose an animal.');
  const x = Number(xValue), z = Number(zValue), b = level.bounds;
  if ([xValue, zValue].some(v => String(v).trim() === '') || !Number.isFinite(x) || !Number.isFinite(z)) throw new Error('Coordinates must be finite numbers.');
  if (x < b.minX || x > b.maxX || z < b.minZ || z > b.maxZ) throw new Error('Coordinates must stay inside the meadow bounds.');
  if (!override && !canOccupy?.(level, x, z, animal.type === 'cow' ? .78 : .55)) throw new Error('Placement is blocked. Enable the invalid-placement override to reproduce a stuck animal.');
  animal.x = x; animal.z = z; animal.vx = 0; animal.vz = 0;
  return animal;
}

export function exportQAScenario(state) {
  return JSON.stringify({ format: 'flock-qa-scenario-v1', publicLevel: state.level.index + 1, seed: state.level.seed, elapsed: state.elapsed,
    profile: state.profile, dog: state.dog, bounds: state.level.bounds, animals: state.level.animals,
    completed: state.level.completed ?? false, level: state.level }, null, 2);
}

/** The bridge is deliberately local to a development-only import; no window API. */
export function installQA(bridge, doc = document) {
  const button = doc.createElement('button');
  button.id = 'qa-toggle'; button.className = 'qa-toggle'; button.textContent = 'QA · dev';
  button.setAttribute('aria-controls', 'qa-panel'); button.setAttribute('aria-expanded', 'false');
  const panel = doc.createElement('section'); panel.id = 'qa-panel'; panel.className = 'qa-panel'; panel.hidden = true;
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'qa-title');
  panel.innerHTML = `<h2 id="qa-title">Development QA · paused</h2><p>Isolated test session. Progress and bolts never save to your normal game. Reload to leave QA.</p>
    <form id="qa-jump"><label>QA level <select id="qa-level"><option value="0">QA 0 · tutorial shortcut</option>${Array.from({length:100},(_,i)=>`<option value="${i+1}">Level ${i+1}</option>`).join('')}</select></label><button>Jump · no unlock required</button></form>
    <form id="qa-bolts"><label>Bolts to add / remove <input id="qa-amount" type="number" min="0" step="1" value="100"></label><div><button value="add">Add bolts</button><button value="remove">Remove bolts</button></div><output id="qa-balance"></output></form>
    <button id="qa-close" class="qa-close" aria-label="Close QA">×</button>
    <form id="qa-move" hidden><label>Individual flock animal <select id="qa-animal"></select></label><div class="qa-coordinates"><label>World X <input id="qa-x" type="number" step="any" required></label><label>World Z <input id="qa-z" type="number" step="any" required></label></div><p id="qa-bounds"></p><label class="qa-check"><input id="qa-override" type="checkbox"> Allow invalid placement (water, fences, trees); meadow bounds still apply</label><button>Move selected animal</button></form>
    <div class="qa-actions"><button id="qa-reset">Reset test session</button><button id="qa-export">Export scenario JSON</button><button id="qa-resume">Resume test play</button></div><p id="qa-status" role="status" aria-live="polite"></p>`;
  doc.body.append(button, panel);
  const $ = id => panel.querySelector(`#${id}`);
  let open = false, busy = false;
  const inertBefore = new Map();
  const freezeBackground = () => { for (const child of doc.body.children) if (child !== panel && child !== button) { if (!inertBefore.has(child)) inertBefore.set(child, child.inert); child.inert = true; } };
  const restoreBackground = () => { for (const [child, inert] of inertBefore) child.inert = inert; inertBefore.clear(); };
  const report = message => { $('qa-status').textContent = message; };
  const selected = () => bridge.getState().level.animals.find(a => String(a.id) === $('qa-animal').value);
  const coordinates = () => { const a = selected(); if (a) { $('qa-x').value = a.x.toFixed(4); $('qa-z').value = a.z.toFixed(4); } };
  const refresh = () => {
    const { level, profile } = bridge.getState(), b = level.bounds;
    $('qa-level').value = String(level.index + 1);
    $('qa-animal').replaceChildren(...level.animals.map(a => { const option = doc.createElement('option'); option.value = a.id; option.textContent = `${a.type} #${a.id}${a.saved ? ' · delivered' : ''}`; return option; }));
    $('qa-balance').textContent = `Test balance: ${profile.points} bolts`;
    $('qa-bounds').textContent = `Bounds: X ${b.minX.toFixed(2)}…${b.maxX.toFixed(2)}, Z ${b.minZ.toFixed(2)}…${b.maxZ.toFixed(2)}. Delivered state is preserved when moved.`;
    $('qa-override').checked = false; coordinates();
  };
  const run = async action => { if (busy) return; busy = true; try { await action(); } catch (error) { report(error.message); } finally { busy = false; } };
  button.onclick = event => { event.preventDefault(); event.stopPropagation(); if (open) return; return run(async () => {
    await bridge.enterSession(); bridge.pause(); doc.title = 'FLOCK · QA test session'; open = true; panel.hidden = false; button.setAttribute('aria-expanded', 'true'); refresh(); freezeBackground(); report('Simulation, delivery countdowns and rewards are frozen while editing.'); $('qa-level').focus();
  }); };
  const closePanel = () => { if (!open || busy) return; open = false; panel.hidden = true; button.setAttribute('aria-expanded', 'false'); restoreBackground(); bridge.resume(); button.textContent = 'QA · test session'; button.focus(); };
  $('qa-close').onclick = closePanel;
  $('qa-resume').onclick = closePanel;
  $('qa-jump').onsubmit = event => { event.preventDefault(); run(async () => { const index = qaLevelIndex($('qa-level').value); await bridge.jump(index); refresh(); report(`Paused at public level ${index + 1}.`); }); };
  $('qa-bolts').onsubmit = event => { event.preventDefault(); run(() => { adjustQABolts(bridge.getState().profile, $('qa-amount').value, event.submitter?.value === 'remove' ? -1 : 1); bridge.updateWallet(); $('qa-balance').textContent = `Test balance: ${bridge.getState().profile.points} bolts`; report('Test balance updated.'); }); };
  $('qa-animal').onchange = coordinates;
  $('qa-move').onsubmit = event => { event.preventDefault(); run(() => { const animal = moveQAAnimal(bridge.getState().level, $('qa-animal').value, $('qa-x').value, $('qa-z').value, { override: $('qa-override').checked, paused: open && bridge.isPaused(), canOccupy: bridge.canOccupy }); bridge.onAnimalMoved?.(animal); report(`Moved ${animal.type} #${animal.id}. Simulation remains paused.`); }); };
  $('qa-reset').onclick = () => run(async () => { await bridge.resetSession(); refresh(); report('Fresh isolated profile and meadow. Normal saved progress is unchanged.'); });
  $('qa-export').onclick = () => run(() => { const blob = new Blob([exportQAScenario(bridge.getState())], {type:'application/json'}), url = URL.createObjectURL(blob), link = doc.createElement('a'); link.href = url; link.download = `flock-qa-level-${bridge.getState().level.index+1}.json`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); report('Scenario exported with level seed, profile, dog and animal state.'); });
  const keydown = event => {
    if (!open) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closePanel(); }
    if (event.key === 'Tab') { const nodes = [...panel.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled])')].filter(node => !node.closest('[hidden]')), first=nodes[0],last=nodes.at(-1); if (event.shiftKey && doc.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && doc.activeElement === last) { event.preventDefault(); first.focus(); } }
  };
  doc.addEventListener('keydown', keydown, true);
  return { destroy() { restoreBackground(); doc.removeEventListener('keydown', keydown, true); button.remove(); panel.remove(); } };
}
