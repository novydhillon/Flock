# Runtime source notes

These notes add to the root [AGENTS.md](../AGENTS.md) for work in `src/`. [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) holds the full module map and contracts. The system pages in `docs/systems/` hold API detail.

## Reading these files

Many modules use long, dense lines. A file with a few hundred lines can hold tens of kilobytes, so `wc -l` understates its size. Use Grep to find a symbol, then read a narrow range. Match the surrounding style: terse arrow helpers, few comments, ES modules, and no new dependencies without a stated reason.

## Ownership boundaries

| Layer | Modules | Rule |
|---|---|---|
| Controller | `main.js` | Owns UI mode, pause, input, the frame loop, and profile actions. Dispatches events to audio and render |
| Simulation | `simulation.js`, `world.js`, `buddy.js`, `buddy-navigation.js`, `bridge-crossing.js`, `chokepoints.js`, `wandering.js`, `progression.js`, `gates.js`, `animal-size.js` | Mutates `level` and `dog`, returns events, never touches the DOM or rendering |
| Presentation | `render.js`, `models.js`, `nature.js`, `weather.js`, `water-effects.js`, `rain-view.js`, `gate-view.js`, `goal-view.js`, `vegetation.js`, `tree-geometry.js`, `surfaces.js`, `cutaway.js`, `grazing.js`, `animal-turn.js`, `pip-motion.js`, `thruster-glow.js`, `tail-light.js`, `wildlife*.js` | Reads simulation state. Visual state must never decide collision, delivery or rewards |
| Audio | `audio.js` | Async activation guarded by generation counters |
| Styles | `style.css`, `gates.css` | Presentation only. `gates.css` styles the gate action button, while `gates.js` owns the gate state and rules |
| QA | `qa.js`, `qa.css` | Dynamically imported only when `__FLOCK_QA__` is true |
| Dormant | `atmosphere.js` | Clouds are deferred (F-008). It is not constructed by the renderer |

## Invariants to preserve

- **Coordinates.** The ground plane is `x`/`z` and `y` is elevation. Some input APIs accept `y` as an alias for planar `z`. Headings are radians.
- **Level numbering.** Public levels are 1–100; `level.index` is 0–99. Do not equate index 100 with public level 100.
- **Shared geometry.** Collision, minimap, target highlight and admission all use `targetFootprint`, `targetWorldPoint`, `targetLocalPoint` and `containsTarget` from `world.js`. When bridges, gates, walls or the goal change, update the generator, physical footprint, navigation, render model, minimap and journey tests together.
- **Frame time.** The loop is variable-step, and the per-frame simulation `dt` is capped at 0.05 s. Tests usually step `1/60`. Pausing must freeze simulation and presentation clocks.
- **Determinism.** Levels, weather, wandering cohorts and decoration placement are seeded. Presentation randomness must not consume the simulation's random sequence.
- **Transient vs saved state.** Helper, flock, crossing and wander state lives on `level` and its animals and is rebuilt with each level. Only the profile persists (`loadProfile`/`saveProfile`, key `flock-foundry-v1`, version 2, `bestEarnedBolts` is authoritative). A profile change needs migration and tests.
- **Resources.** Level replacement must dispose owned geometries, materials and nature resources without disposing shared cached robot geometry. Do not allocate geometry or materials per frame. Culling bounds must cover limbs, heads and shadows.
- **Audio races.** Start and resume can finish after pause, disposal or a newer activation. Check the generation guard; never follow an awaited start with an unconditional resume.
- **QA isolation.** QA code must not reach release builds. Guard with `typeof __FLOCK_QA__!=='undefined'&&__FLOCK_QA__` and dynamic import, as `main.js` does. QA sessions never write the normal campaign profile. Confirm with `node scripts/check-build-mode.mjs release` after `npm run build`.

## Before you finish a runtime change

- Add or extend tests that use the real simulation or geometry code and check behavior (see [tests/AGENTS.md](../tests/AGENTS.md)).
- Run focused tests, `npm test`, `npm run build:checked:dev` and `npm run build:checked:production`.
- Update `docs/ARCHITECTURE.md` or the matching `docs/systems/*.md` page when a contract changes, then regenerate the HTML.
- Add phone smoke-check steps to `docs/DEVELOPMENT.md` when the change affects appearance, input or performance. Record those checks as pending until someone observes them on a device.
