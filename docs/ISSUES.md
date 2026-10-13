# FLOCK — Remaining issues and change tracker

Updated: 12 October 2026 (America/Vancouver). Repository: `novydhillon/Flock`. Working branch: `flock_3D_chatgpt-work`.

Baseline source: `88ddb66495acaee94bfbc4653ccc818dfe459bc0` (Restart Game revision). Live game: https://novydhillon.github.io/Flock/flock/dev2/. This document records future work; creating it does not implement the changes below.

## How agents should use this document

1. Read this tracker, README and `docs/QUALITY.md`; inspect current code and branch state before starting. Public level numbers here are one-based; code indexes are zero-based.
2. Claim an issue by recording owner, branch/worktree, status and date. Use isolated worktrees for parallel implementation; coordinate ownership of shared files. Do not mark screenshot reports reproduced from a still image alone.
3. Confirm design decisions listed under each issue before coding dependent behavior. Explicit user requirements take precedence over proposed defaults. Preserve portrait, single-thumb play and the cheerful art direction.
4. Record reproduction level/seed, expected versus observed behavior, implementation commit, meaningful checks, reviewer findings and remaining limits. Use statuses: **Open → In progress → Review → Done**, or **Blocked** with the reason.
5. Run relevant regression checks and the production build. Use fresh blind reviewers for a substantial gameplay/rendering batch; give them requirements and the candidate, without earlier scores or implementation rationale. Fix confirmed defects and recheck. Do not claim visual or phone validation from headless tests.
6. A completed source change and a live release are separate milestones. Record deployment commit and verification separately. Publish only `flock/dev2/` on the latest `gh-pages` tree; preserve other content. Changes to this tracker alone do not require a game deployment.

Priority: **P1** = correctness/gameplay foundation; **P2** = planned feature/polish; **P3** = broader validation/optimization. All open items are unassigned until explicitly claimed.

## Open work overview

| ID | Priority | Type | Item | Status | Depends on |
|---|---|---|---|---|---|
| F-001 | P1 | Reported defect | Path-corner polygon flicker | Open | — |
| F-002 | P1 | Reported defect | Bark effect above ground and bridge deck | Open | — |
| F-003 | P2 | Art/behavior | Detailed squirrel; no spinning in place | Open | — |
| F-004 | P2 | Art | Flowing-water texture | Open | — |
| F-005 | P1 | Geometry/gameplay | Perpendicular crossings; bridges 25% wider than paths | Open | — |
| F-006 | P2 | Gameplay | Gates requiring player opening from level 20 | Open | F-005 |
| F-007 | P2 | Environment | Stone walls on selected levels | Open | F-006 interaction contract |
| F-008 | P2 | Art | Soft textured clouds at 10–25% opacity | Open | — |
| F-009 | P1 | Gameplay/economy | Arrival countdown; partial-delivery scoring | Open | F-010 |
| F-010 | P1 | Correctness | Goal shape matches enclosure | Open | — |
| F-011 | P2 | Feedback | Blue dog-tail light; red bark flash | Open | F-002 shared bark event |
| F-012 | P2 | Gameplay | Level-gated wanderers and short bolting | Open | F-005, F-009 balance |
| F-013 | P2 | Known review concern | Level-5 pacing spike | Open | F-005; retest after F-009/F-012 |
| F-014 | P1 | Validation gap | Real-phone controls, appearance and sound | Open | Feature batches |
| F-015 | P3 | Validation gap | Mobile GPU performance and transition stability | Open | Rendering batches |

## Screenshot evidence

Picture numbers refer to the user's attachment order, including the duplicate uploads.

| Picture | Filename | Evidence visible / reported |
|---|---|---|
| 1 | `IMG_8372.jpeg` / `IMG_8372(1).jpeg` | Level 4, 10/14 delivered; black triangular/striped artifacts at path corners. User reports flickering. |
| 2 | `IMG_8367.jpeg` / `IMG_8367(1).jpeg` | Level 8; bark ring is visible around but hidden beneath bridge planks. |
| 3 | `IMG_8368.jpeg` / `IMG_8368(1).jpeg` | Level 9; squirrel appears as a simple body and tail. User reports spinning in place. |
| 4 | `IMG_8364.jpeg` / `IMG_8364(1).jpeg` | Level 8; black triangular artifacts at winding path bends near crossing. |

The images are visible in the conversation. Their advertised local attachment paths were unavailable during earlier reads; binaries are not embedded in this repository. Preserve these filenames and descriptions when handing off. Static images establish visible artifacts, not their temporal behavior or root cause.

## Acceptance criteria and implementation notes

### F-001 — Path-corner polygon flicker

**Requirement:** eliminate polygon flickering at path corners (pictures 1 and 4).

**Accept when:** sharp and gentle turns have continuous textured coverage without black triangles, overlapping flicker, holes or abrupt spikes during camera movement. Check default levels 4 and 8 and multiple seeds/directions on a real renderer.

**Investigate:** `src/render.js` ribbon triangulation, tight-turn/self-overlap geometry, shoulders, depth offsets and shadow behavior. Degenerate triangles, overlap and z-fighting are hypotheses, not established causes. Add meaningful geometry checks; rendered verification is still required.

### F-002 — Bark effect above ground and bridge deck

**Requirement:** bark remains visible above path, grass, ground and bridge planks; fences and railings still occlude it (picture 2).

**Accept when:** bark works on land, center/end of each bridge and both approaches, with no deck clipping and normal occlusion by raised obstacles. Do not force the ring over every object by disabling depth testing globally.

**Code evidence:** `MeadowRenderer.bark()` in `src/render.js` copies the dog's position, then assigns a fixed `.08` world height. Inspect surface-following height over the expanding ring, not only its origin. Pause/cleanup must retain bounded effect resources.

### F-003 — Squirrel detail and movement

**Requirement:** recognizable, more detailed squirrel; it must not spin in place.

**Accept when:** distinct head/ears, face, legs/paws and bushy tail remain readable at game scale; heading follows actual movement, with stable idle/blocked poses and believable short turns. Wildlife still avoids Pip, the robotic flock and helpers and obeys ground collision. Observe blocked and fleeing squirrels, not only open-field movement.

**Files:** `src/nature.js`; reusable art may belong in `src/models.js`. Current heading follows desired direction even when occupancy blocks movement; investigate that distinction without treating it as a proved sole cause.

### F-004 — Flowing water

**Requirement:** add water texture conveying running water.

**Accept when:** subtle moving ripples/flow follow each river's local direction across bends; bridges remain clear, banks have no seams, and water continues beyond map bounds. Pause freezes animation. Reuse/dispose resources and assess mobile cost. Collision stays tied to the river geometry.

**Files:** `src/render.js`, `src/world.js`, renderer tests.

### F-005 — Bridge and crossing alignment

**Requirement:** bridges and path segments crossing water are perpendicular to the river at the crossing. Bridge width is **1.25 × crossing path width**. Minimize unnecessary bridge extension into dry ground so animals do not get stuck.

**Accept when:** orientation uses the local river tangent, not a global axis; approaching/exiting paths align with the deck; mesh, terrain height, deck occupancy and rails share the same footprint. Retain enough landing overlap to cross both banks safely. Validate cow-sized bodies, helpers, the full initial flock, alternative routes, all campaign levels and representative seeds.

**Files:** `src/world.js`, `src/render.js`, `src/models.js`, world/journey tests. Preserve the solved level-2 retrieval case; narrower replacement geometry must not reintroduce its stall. Specify whether the 25% comparison excludes decorative shoulders before implementation.

### F-006 — Operable gates from level 20

**Requirement:** introduce gates that need to be opened on higher levels (**20+**).

**Accept when:** closed gates visibly and physically block dog/flock/helpers; an accessible single-thumb action opens them; geometry, collision, navigation and minimap agree on state. Levels 1–19 retain their existing accessible openings. Generated routes remain solvable and restart resets gate state.

**Decision to resolve:** proximity action, auto-open interaction or dedicated contextual button; whether gates close again. Do not add a second-thumb requirement. Current gate openings do not implement this requested closed/open state.

### F-007 — Stone wall variants

**Requirement:** use stone walls instead of fences on some levels.

**Accept when:** selected deterministic levels have readable stone boundaries, consistent visible/physical footprints and usable entrances. Define whether walls block herding signals and how gates join them; raised walls should occlude effects correctly. Keep goals and route clearance valid.

**Decision to resolve:** level/theme distribution and wall height. Candidate files: `src/world.js`, `src/models.js`, `src/render.js`, collision tests.

### F-008 — Soft textured clouds

**Requirement:** clouds may be overlapping blurred soft-edge blob textures instead of models, remaining semi-transparent at **10–25%**.

**Accept when:** soft blobs form moving puffy clouds without hard edges or obvious planes; they do not obscure play. Preserve drifting movement and soft ground shadows, pause behavior and resource cleanup. Validate overlapping transparency and mobile rendering.

**Working interpretation to confirm:** material/composited opacity 0.10–0.25 (not 75–90% opacity). Avoid stacking blobs into a much darker or opaque cloud. Current cloud material opacity is `.5`; see `src/nature.js`.

### F-009 — Delivery countdown and score

**Requirement:** the first flock animal entering the goal starts a **30–60 second** countdown, chosen by level complexity. End the level when time reaches zero or the last animal arrives. Score reflects animals delivered and displays **score / possible score**.

**Accept when:** a single first valid delivery starts one timer; no pre-arrival timer; duration stays within 30–60 seconds; all-delivered ends early; timeout produces a partial result. Final counts and score settle once, late arrivals cannot change the finalized result, pause freezes gameplay time, and replay/restart clears transient state. Display delivered count and earned/possible score consistently in play and results. Preserve player-attended delivery; helpers cannot complete the level alone.

**Decisions required:** complexity-to-duration rule; score per animal/type; whether score and spendable bolts are identical; partial result's next-level unlock rule; replay/best-score/reward policy and save migration. Proposed equal points per animal is not an approved formula. Prevent repeat reward farming while allowing meaningful improvement attempts. Existing full-flock reward and completion tests will need intentional revision.

**Files:** `src/simulation.js`, `src/main.js`, `src/progression.js`, UI/style and persistence tests. Depends on F-010 so timer starts only inside the correct goal.

### F-010 — Goal shape matches enclosure

**Requirement:** goal areas follow their pen, barn or fenced-field enclosure shape.

**Accept when:** highlight, valid delivery region, minimap and enclosure footprint agree for rotated destinations; animals outside the wall or near a circular corner cannot score. Entrance remains clear and animal body radius is handled consistently. Check all three destination types across seeds.

**Code evidence:** `src/render.js` currently draws a circular goal; `src/simulation.js` uses radial delivery distance. Derive rendering and admission from shared enclosure geometry rather than separate approximations.

### F-011 — Dog-tail light feedback

**Requirement:** dog's tail light is blue normally and flashes red on bark.

**Accept when:** Pip's blue light visibly flashes red for the bark feedback interval and returns blue reliably. Repeated bark, cooldown, pause and level restart leave no stuck-red state. Decide whether Buddy dog uses the same convention when it has an actual bark event. Do not recolor every shared cyan robotic material.

**Files:** `src/models.js`, `src/render.js`, `src/main.js`; use the same bark event as F-002.

### F-012 — Wandering and bolting animals

**Requirement:** up to **15%** of animals may have a **33%** chance to move randomly away from the flock when not actively herded. This begins at **level 8**. Such an animal has up to **10%** chance to bolt away for **1–3 seconds**; bolting begins **after level 16** (level 17 onward).

**Accept when:** levels 1–7 have no new wandering; levels 1–16 have no bolting. Eligible cohort never exceeds 15% of the flock; document integer rounding. Probabilities are tied to defined behavior opportunities/time, never rolled every frame. No fleeing through rails, walls, river or map fences; saved animals never wander. Active herding suppresses this behavior, and brief bolts end within the specified range. Pause/restart reset behavior safely and seeded tests exercise gates, duration, collision and statistical bounds without flaky expectations.

**Decisions required:** selection/rounding, probability evaluation interval, wander distance/speed/cooldown, what counts as active herding (Pip versus companions), and whether the 10% is conditional on a wander event. Do not silently interpret a chance as a per-second or per-frame rate. Balance together with F-009 to avoid unfair late losses.

**Files:** `src/simulation.js`, `src/world.js`, companion/journey/simulation tests.

### F-013 — Known level-5 pacing concern

The fresh gameplay critic's unchanged input controller completed default levels 1–5 in **18.2, 17.2, 28.7, 38.7 and 208.0 simulated seconds**. Level 5's jump warrants human playtesting; it is not proof of an impossible level or a measured human time.

**Accept when:** document human attempts, retrieval/chokepoint behavior and difficulty progression; adjust only where evidence supports it. Re-run the existing ordinary-input journey policies after crossing/countdown/wandering changes. Avoid solving pacing by weakening collision or allowing autonomous completion.

### F-014 — Real-phone verification gap

Still open: portrait readability, thumb control feel, native Safari double-tap zoom prevention, modal focus/scrolling, actual music/bird/weather balance, and rendered visual defects above. Headless checks cannot close these.

**Accept when:** record device/browser, tested source/deployment revision, scenarios, results and screenshot/video evidence. Include restart confirmation/cancellation/persistence. Existing user screenshots provide evidence of specific visual issues; they do not validate every input/audio scenario.

### F-015 — Performance verification gap

Real phone GPU frame rate and level-transition memory stability remain unmeasured. The existing bounded submission/resource tests are useful but do not establish FPS. Production JavaScript is roughly **576 kB / 155 kB gzip**, with an advisory Vite chunk-size warning; this is an optimization consideration, not a confirmed gameplay bug.

**Accept when:** measure normal/large/split herds, later expansive worlds, weather/cloud effects and repeated transitions on representative phones. Record frame-time distribution, load behavior and resource growth. Set a device-specific performance target before judging success.

## Previously repaired — retain as regressions

These are not open defects unless reproduced again: drone selecting the largest herd and holding when Pip leaves; no unattended goal completion; unlocks (drone 10, Buddy 20); path variety/map extent/continuous rivers; scenery hill collision alignment; pending audio activation overriding pause; overdue music scheduling burst; the default level-2 bridge stall; full-game restart persistence and delayed-audio focus. See `docs/QUALITY.md` and current tests for scope and limitations.

The latest Restart Game source passed CI tests/build and deployment byte verification. Historical blind scores **9.1 technical / 8.6 gameplay** describe the earlier bounded review, not a review of these newly requested changes. Do not update scores without a new independent assessment.

## Execution record

Copy one row per claimed issue; retain older entries when reopening work.

| Issue | Owner | Status | Branch/worktree | Source commit | Checks and review evidence | Deployment commit | Date / next action |
|---|---|---|---|---|---|---|---|
| — | Unassigned | Open | — | — | — | — | Claim an issue before implementation |

## Decisions and session handoff

Record approved answers to the decisions above here, with date and source. At session end list changed issue IDs, remaining blockers, commands/results, branch heads and the next reproducible action. A blocked design decision does not prevent independent visual repairs.

Suggested order: F-001/F-002/F-010 → F-005 → F-009 and gate/wall contracts → F-006/F-007/F-012. Art items F-003/F-004/F-008/F-011 can proceed in coordinated worktrees; F-013–F-015 remain cross-cutting validation work.
