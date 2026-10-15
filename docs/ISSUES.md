# FLOCK — Remaining issues and change tracker

Updated: 15 October 2026 (America/Vancouver). Repository: `novydhillon/Flock`. Working branch: `flock_3D_chatgpt-work`.

Source checkpoint: integrated P0/P1 batch (delivery `1fee206`, goal view `984fc64`; see execution record). Canonical live game: https://novydhillon.github.io/Flock/dev2/. F-025 migration is published and verified at Pages `baca95c7ba618d736730194b433254bf5058dd66`; it contains the preceding game revision. The reviewed P1 development build is published at Pages `9346f26c5a145698b34e2c4504236c494023817d` from source `7a8519d37a8f447652f0449e16a050fc76a6d3e0`; all 17 game files plus redirect match live hashes, and all 18 blobs outside `dev2/` are unchanged. This tracker distinguishes source implementation from visual/device acceptance and live release.

Latest bridge/barn follow-up: source `4d3cadc393c9feaedee4e579099110e25f459c31`, Pages `8a76de36bbb61ba824bc9371f85971667f786c35`. Node 22 CI [38679079215](https://github.com/novydhillon/Flock/actions/runs/38679079215) and native Pages [38679328953](https://github.com/novydhillon/Flock/actions/runs/38679328953) succeeded. All 17 game files plus legacy redirect match live SHA-256 hashes; 18 files outside `dev2/` remain unchanged. Final source suite: 162/162; barn blind review 9/10 and final bridge recheck 9.5/10. Novy accepted F-005/F-016 on 14 October 2026 (Vancouver); both are Done. F-014 remains Done.

Current acceptance: **all P0/P1 issues are Done** by user sign-off on 14 October 2026. P2/P3 statuses are unchanged.

Latest development release: F-028 is deployed at Pages `639a9b45608fa0ad6aaa8189dd91dd7ba24b082d` from source `e03ba169be760a4031d2b57887f0d6998eb07187`. Source CI [38681252991](https://github.com/novydhillon/Flock/actions/runs/38681252991) and native Pages [38681359737](https://github.com/novydhillon/Flock/actions/runs/38681359737) succeeded. All 17 game files plus the legacy redirect match live SHA-256 hashes; 18 files outside `dev2/` remain unchanged. Final suite: 165/165 on Node 22.23.3; blind review 9.5/10, with zero escapes in 30,900 independent per-step containment checks. F-028 was accepted by the user on 15 October 2026 at 00:28 America/Vancouver for this deployed build; previous P0/P1 sign-offs stay Done.

## How agents should use this document

1. Read this tracker, README and `docs/QUALITY.md`; inspect current code and branch state before starting. Public level numbers here are one-based; code indexes are zero-based.
2. Claim an issue by recording owner, branch/worktree, status and date. Use isolated worktrees for parallel implementation; coordinate ownership of shared files. Do not mark screenshot reports reproduced from a still image alone.
3. Confirm design decisions listed under each issue before coding dependent behavior. Explicit user requirements take precedence over proposed defaults. Preserve portrait, single-thumb play and the cheerful art direction.
4. Record reproduction level/seed, expected versus observed behavior, implementation commit, meaningful checks, reviewer findings and remaining limits. Use statuses: **Open → In progress → Review → Done**, or **Blocked** with the reason.
5. Run relevant regression checks and the production build. Use fresh blind reviewers for a substantial gameplay/rendering batch; give them requirements and the candidate, without earlier scores or implementation rationale. Fix confirmed defects and recheck. Do not claim visual or phone validation from headless tests.
6. A completed source change and a live release are separate milestones. Record deployment commit and verification separately. Resolve F-025 before the next game release: publish to `dev2/` on the latest `gh-pages` tree, giving the public URL `/Flock/dev2/`. The old `flock/dev2/` destination is superseded. Preserve unrelated content and handle the old URL explicitly as part of migration. Changes to this tracker alone do not require a game deployment.

Priority: **P0** = highest priority; complete before other queued work. **P1** = correctness/gameplay foundation; **P2** = planned feature/polish; **P3** = broader validation/optimization. All open items are unassigned until explicitly claimed.

## Work overview

| ID | Priority | Type | Item | Status | Depends on |
|---|---|---|---|---|---|
| F-025 | P0 | Deployment | Correct public deployment URL to /Flock/dev2/ | Done | Verified migration |
| F-001 | P1 | Reported defect | Path-corner polygon flicker | Done | — |
| F-002 | P1 | Reported defect | Bark effect above ground and bridge deck | Done | — |
| F-003 | P2 | Art/behavior | Detailed squirrel; species-appropriate motion; no spinning | Open | — |
| F-004 | P2 | Art | Flowing-water texture | Open | — |
| F-005 | P1 | Geometry/gameplay | Perpendicular crossings; bridges 25% wider than paths | Done | — |
| F-006 | P2 | Gameplay | Gates requiring player opening from level 20 | Open | F-005 |
| F-007 | P2 | Environment | Stone walls on selected levels | Open | F-006 interaction contract |
| F-008 | P2 | Art | Soft textured clouds at 10–25% opacity | Open | — |
| F-009 | P1 | Gameplay/economy | Arrival countdown; partial-delivery scoring | Done | F-010 |
| F-010 | P1 | Correctness | Goal shape matches enclosure | Done | — |
| F-011 | P2 | Feedback | Blue dog-tail light; red bark flash | Open | F-002 shared bark event |
| F-012 | P2 | Gameplay | Level-gated wanderers and short bolting | Open | F-005, F-009 balance |
| F-013 | P2 | Known review concern | Level-5 pacing spike | Open | F-005; retest after F-009/F-012 |
| F-014 | P1 | Validation gap | Real-phone controls, appearance and sound | Done | User confirmed 14 Oct 2026 |
| F-015 | P3 | Validation gap | Mobile GPU performance and transition stability | Open | Rendering batches |
| F-016 | P1 | Visibility | Camera-facing barn/covered-structure cutaway | Done | F-010 shared enclosure geometry |
| F-017 | P2 | Wildlife | Detailed hopping rabbits; random size-scaled wildlife counts | Open | F-003, F-022 |
| F-018 | P1 | QA tooling | Dev-only level, currency and animal-placement menu | Done | — |
| F-019 | P2 | Environment | Add bushes | Open | — |
| F-020 | P2 | Environment | Increase tree size | Open | — |
| F-021 | P2 | Art | Richer bush/tree detail and textures | Open | F-019, F-020 |
| F-022 | P2 | Wildlife/weather | Species retreat as weather worsens | Open | F-017; shared weather state with F-023/F-024 |
| F-023 | P2 | Weather/feedback | Weather transitions, clouds, lighting, lightning and thunder | Open | F-008 |
| F-024 | P2 | Weather/surfaces | Accumulating wetness, puddles, splashes and river response | Open | F-004; shared weather state with F-023 |
| F-026 | P3 | UI | Pause-menu Quit returns to landing page | Open | — |
| F-027 | P2 | Wildlife | Wildlife can pass through fences and leave/enter the game area | Open | F-017 |
| F-028 | P2 | Gameplay | Delivered animals roam inside the goal enclosure | Done | F-010 shared footprint |
| F-029 | P2 | Gameplay/economy | Pay only lifetime-best score improvements on replay | Done | F-009 |

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

### F-025 — Correct the deployment URL (P0 — highest priority)

**Requirement:** deploy the standalone game at **https://novydhillon.github.io/Flock/dev2/** instead of **https://novydhillon.github.io/Flock/flock/dev2/**. This issue takes precedence over all other open work.

**Accept when:** the current standalone build loads directly at the required URL, including on a fresh visit/reload, with all JavaScript, styles, fonts and other assets resolving successfully beneath `/Flock/dev2/`. The `gh-pages` output directory is **`dev2/`**, not `flock/dev2/`; `/Flock/` is GitHub Pages' repository URL prefix, not an extra output directory. Verify deployed file hashes against the intended production build and record the Pages commit/workflow result and final URL.

**Implementation scope:** inspect and update `scripts/deploy-pages.mjs`, deployment/build configuration, README, tracker instructions and any other hard-coded publish destinations or game links. Keep relative asset support. Preserve the Pages root, existing `flock/dev/` and all unrelated files. Do not clear or rename saved-profile keys as part of this URL correction; verify existing progress remains available at the new path on the same origin.

**Migration decision:** explicitly record what happens to the previous `/Flock/flock/dev2/` URL (for example, a redirect to the canonical URL). Do not leave two independently maintained game copies or delete unrelated legacy content. Any redirect must retain working navigation and use the correct repository prefix.

**Done evidence:** helper source `6616c41`; published Pages commit `baca95c7ba618d736730194b433254bf5058dd66`; canonical entry and all 15 game files plus redirect hash-verified; 17 unrelated blobs unchanged. Legacy address redirects with query/fragment retained. Independent blind medium review: 9/10 for the bounded P0 migration. This does not score or deploy the P1 batch, verify real pixels or establish phone storage continuity. See [validation](validation/P0-P1.md).

### F-001 — Path-corner polygon flicker

**Requirement:** eliminate polygon flickering at path corners (pictures 1 and 4).

**Accept when:** sharp and gentle turns have continuous textured coverage without black triangles, overlapping flicker, holes or abrupt spikes during camera movement. Check default levels 4 and 8 and multiple seeds/directions on a real renderer.

**Implementation evidence:** `eed14e5` replaces stacked ribbon pieces with convex-stroke union, disjoint upward triangles and world UVs in `surfaces.js`; topology/coverage tests include turns, reversals, crossings and reported levels 4/8. Novy accepted F-001 on 14 October 2026; topology tests remain source evidence rather than agent-rendered validation.

### F-002 — Bark effect above ground and bridge deck

**Requirement:** bark remains visible above path, grass, ground and bridge planks; fences and railings still occlude it (picture 2).

**Accept when:** bark works on land, center/end of each bridge and both approaches, with no deck clipping and normal occlusion by raised obstacles. Do not force the ring over every object by disabling depth testing globally.

**Implementation evidence:** `eed14e5` splits bark geometry at deck and plank boundaries and lifts each piece above its local surface, with depth testing retained. Renderer-owned .6-second lifetime freezes at zero `dt`, reuses buffers and caps effects at four; replacement clears owned resources. Tests compare against real bridge geometry behind a substituted renderer. Novy accepted F-002 on 14 October 2026.

### F-003 — Squirrel detail and movement

**Requirement:** recognizable, more detailed squirrel; it must not spin in place, and must move like a squirrel (expanded user report, 14 October 2026).

**Accept when:** distinct head/ears, face, legs/paws and bushy tail remain readable at game scale; heading follows actual movement, with stable idle/blocked poses and believable short turns. Wildlife still avoids Pip, the robotic flock and helpers and obeys ground collision. Use recognizable squirrel scurrying/bounding, brief alert pauses and coordinated legs/body/tail motion, rather than a sliding body or continuous circular orbit. Observe idle, blocked, turning and fleeing squirrels, not only open-field movement. Real-renderer observation is needed to judge motion quality.

**Files:** `src/nature.js`; reusable art may belong in `src/models.js`. Current heading follows desired direction even when occupancy blocks movement; investigate that distinction without treating it as a proved sole cause.

### F-004 — Flowing water

**Requirement:** add water texture conveying running water.

**Accept when:** subtle moving ripples/flow follow each river's local direction across bends; bridges remain clear, banks have no seams, and water continues beyond map bounds. Pause freezes animation. Reuse/dispose resources and assess mobile cost. Collision stays tied to the river geometry.

**Files:** `src/render.js`, `src/world.js`, renderer tests.

### F-005 — Bridge and crossing alignment

**Requirement:** bridges and path segments crossing water are perpendicular to the river at the crossing. Bridge width is **1.25 × crossing path width**. Minimize unnecessary bridge extension into dry ground so animals do not get stuck.

**Accept when:** orientation uses the local river tangent, not a global axis; approaching/exiting paths align with the deck; mesh, terrain height, deck occupancy and rails share the same footprint. Retain enough landing overlap to cross both banks safely. Validate cow-sized bodies, helpers, the full initial flock, alternative routes, all campaign levels and representative seeds.

**Files:** `src/world.js`, `src/render.js`, `src/models.js`, world/journey tests. Preserve the solved level-2 retrieval case; narrower replacement geometry must not reintroduce its stall. The implementation compares usable road width, excluding decorative shoulders. `4887ea7` aligns decks and straight approaches perpendicular to sampled river segments; deck width is 1.25 × road width, including the widened level-2 road/deck. Follow-up shortens decks to river width + 1.5 (0.75 nominal bank overlap per end) without changing width or dry route turning planes. Blocked opening steering follows collision-valid local bridge waypoints using each animal’s actual radius (.55 sheep, .78 cow), rather than pushing sideways through rail/bank corners. Sampled wet-strip coverage and unchanged full-flock journeys support the repair; Novy accepted the reported landing fix on 14 October 2026.

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

**Implementation / decisions recorded 14 October 2026:** user approved positive partial unlock, `floor(reward * saved / total)` score/earned entitlement and lifetime best improvement paying only its delta. `1fee206` implements a 30–60 second complexity formula, first-arrival start, timeout-before-admission, early full completion, consistent HUD/results and v2 ledger migration. Legacy completions become fully earned without crediting points again. Replay spending/reload cannot farm duplicate rewards. See [Gameplay](systems/GAMEPLAY.md) for exact formula. Novy accepted F-009 on 14 October 2026; future pacing changes remain tracked separately.

**Files:** `src/simulation.js`, `src/main.js`, `src/progression.js`, UI/style and persistence tests. Depends on F-010 so timer starts only inside the correct goal.

### F-010 — Goal shape matches enclosure

**Requirement:** goal areas follow their pen, barn or fenced-field enclosure shape.

**Accept when:** highlight, valid delivery region, minimap and enclosure footprint agree for rotated destinations; animals outside the wall or near a circular corner cannot score. Entrance remains clear and animal body radius is handled consistently. Check all three destination types across seeds.

**Implementation evidence:** world `4887ea7` exports rotated target local/world transforms, footprint and full-body containment. Goal view `984fc64` uses footprint corners for highlight, border, barn floor and minimap. Wall endpoints derive from the same shape. Body-contracted admission includes safe rectangular corners and rejects edge-straddling bodies. Rotated pen/field/barn geometry tests support the contract; Novy accepted F-010 on 14 October 2026.

### F-011 — Dog-tail light feedback

**Requirement:** dog's tail light is blue normally and flashes red on bark.

**Accept when:** Pip's blue light visibly flashes red for the bark feedback interval and returns blue reliably. Repeated bark, cooldown, pause and level restart leave no stuck-red state. Decide whether Buddy dog uses the same convention when it has an actual bark event. Do not recolor every shared cyan robotic material.

**Files:** `src/models.js`, `src/render.js`, `src/main.js`; use the same bark event as F-002.

### F-012 — Wandering and bolting animals

**Requirement:** up to **15%** of animals may have a **33%** chance to move randomly away from the flock when not actively herded. This begins at **level 8**. Such an animal has up to **10%** chance to bolt away for **1–3 seconds**; bolting begins **after level 16** (level 17 onward).

**Accept when:** levels 1–7 have no new wandering; levels 1–16 have no bolting. Eligible cohort never exceeds 15% of the flock; document integer rounding. Probabilities are tied to defined behavior opportunities/time, never rolled every frame. No fleeing through rails, walls, river or map fences; saved animals never use this straggler/bolting behavior; their confined goal roaming is F-028. Active herding suppresses this behavior, and brief bolts end within the specified range. Pause/restart reset behavior safely and seeded tests exercise gates, duration, collision and statistical bounds without flaky expectations.

**Decisions required:** selection/rounding, probability evaluation interval, wander distance/speed/cooldown, what counts as active herding (Pip versus companions), and whether the 10% is conditional on a wander event. Do not silently interpret a chance as a per-second or per-frame rate. Balance together with F-009 to avoid unfair late losses.

**Files:** `src/simulation.js`, `src/world.js`, companion/journey/simulation tests.

### F-013 — Known level-5 pacing concern

The fresh gameplay critic's unchanged input controller completed default levels 1–5 in **18.2, 17.2, 28.7, 38.7 and 208.0 simulated seconds**. Level 5's jump warrants human playtesting; it is not proof of an impossible level or a measured human time.

**Accept when:** document human attempts, retrieval/chokepoint behavior and difficulty progression; adjust only where evidence supports it. Re-run the existing ordinary-input journey policies after crossing/countdown/wandering changes. Avoid solving pacing by weakening collision or allowing autonomous completion.

### F-014 — Real-phone verification gap

**Done: Novy confirmed F-014 on 14 October 2026 (America/Vancouver), after the QA-controls release at Pages `50128cdef86c47a383938cc0aac01a29e1f072d2`. This is user acceptance of real-phone controls, appearance and sound; device/browser details and measurements were not supplied. It does not close the separate visual issues or F-015 performance testing.**

**Accept when:** record device/browser, tested source/deployment revision, scenarios, results and screenshot/video evidence. Include restart confirmation/cancellation/persistence. Existing user screenshots provide evidence of specific visual issues; they do not validate every input/audio scenario.

### F-015 — Performance verification gap

Real phone GPU frame rate and level-transition memory stability remain unmeasured. The existing bounded submission/resource tests are useful but do not establish FPS. Historical production JavaScript was roughly **576 kB / 155 kB gzip**, with an advisory Vite chunk-size warning; this is an optimization consideration, not a confirmed gameplay bug.

**Accept when:** measure normal/large/split herds, later expansive worlds, weather/cloud effects and repeated transitions on representative phones. Record frame-time distribution, load behavior and resource growth. Set a device-specific performance target before judging success.

### F-016 — See Pip and the flock under cover

**Requirement:** barns and other covered structures must not obscure Pip or flock animals. When any dog or flock animal enters, fade the **entire roof and complete camera-facing wall side(s)** together to **30% transparency (opacity 0.70)**; do not limit fading to individual panels intersecting an actor ray. Restore when the structure is empty.

**Accept when:** a dog alone, a flock animal alone (including delivered animals), partial entry and split groups trigger the whole roof and every panel of camera-facing wall sides at opacity 0.70. Select sides using the current camera direction for rotated structures; keep far wall sides opaque. Restore smoothly only after the last actor leaves, without flicker or rapid threshold toggles. Transparency changes visibility only; collision, goal admission and enclosure boundaries remain intact.

**Implementation evidence:** initial `4cf9719` segmented barn roof/walls are retained. Follow-up `b322e7d` fades all roof panels and full facing wall/trim sides to opacity 0.70 using orthographic camera direction in barn-local coordinates. Pip, helper dogs and all flock animals including saved animals activate coverage; hysteresis/smoothed fades and original material/shadow cleanup remain. Pause freezes fades; collision/admission do not change. Blind source review passed 9/10; Novy accepted F-016 on 14 October 2026.

### F-017 — Rabbits and variable wildlife populations

**Requirement:** add rabbits alongside squirrels. Rabbits must be recognizably detailed and move like rabbits. Rabbit and squirrel counts are random and depend on level size.

**Accept when:** ears, face, body, hind legs and tail distinguish rabbits at normal portrait zoom. Hopping has coordinated crouch, push-off, airborne and landing poses, with believable idle/turn/flee transitions; avoid sliding or spinning. Both species avoid Pip/flock/helpers and obey ground barriers. Population varies with usable level area and randomness, with bounded counts for performance and repeatable seeded fixtures for testing. Weather visibility is handled by F-022, not by permanently deleting a level's base population.

**Decisions to resolve:** area-to-count ranges/caps, whether either species may be absent, and spawn spacing/habitat. Do not silently replace the requested randomness with a fixed count per level.

**Files:** `src/nature.js`, `src/models.js`, wildlife/resource tests. Coordinate squirrel motion work with F-003.

### F-018 — Dev-build QA menu

**Requirement:** add a QA menu available in development builds. Testers can jump to any level **0–100**, add bolts, remove bolts, and pause the simulation while moving individual flock animals to reproduce scenarios such as animals stuck in game-hindering positions.

**Accept when:** the menu is clearly marked as QA and available in the deployed development build as well as the intended local development configuration. Release builds expose no QA entry point or enabled mutation handlers. Testers can choose a level without campaign unlock restrictions, enter a bolt amount to add/remove, pause gameplay and select/reposition a particular animal. Currency remains finite and nonnegative. Selection and placement work with touch and mouse and identify the selected animal clearly. Editing does not accidentally steer Pip, resume the simulation, advance countdowns, award progress or trigger delivery. Resume uses the edited scenario normally.

**Implementation evidence:** `df1d193` adds a dynamically imported QA module only in local development/explicit `build:dev`; normal production excludes the entry and handlers. User approved QA 0 = tutorial shortcut and public 1–100 = campaign indexes 0–99. First entry starts an isolated default test profile; persistence is suppressed until reload. Dialog pauses gameplay/countdowns/audio, makes background controls inert, permits finite safe bolt edits, identifies animals by species/ID, and edits finite coordinates within bounds. Explicit invalid-placement override bypasses occupancy only; velocity resets and saved state is retained. Reset starts fresh; export downloads a scenario JSON. `7acc632` restores results when resuming a completed QA meadow without another award. QA-enabled live publication is verified. Novy accepted F-018 on 14 October 2026; animal selection/position controls remain temporarily hidden as requested.

**Files:** build configuration, `src/main.js`, `src/style.css`, `src/simulation.js`, controller/profile tests. QA pause must permit manual edits while freezing all normal simulation; gameplay pause alone is insufficient. Exercise development and release builds separately to verify gating.

### F-019 — Bushes

**Requirement:** add bushes to the environment.

**Accept when:** organic bush clusters vary in shape/placement and fit fields/woodland edges without hiding critical controls, destinations or crossings. Generation preserves safe spawns, flock staging space and route clearance. Explicitly decide whether bushes are decorative or physical; if physical, mesh and collision footprints must agree and all routes remain traversable. Include visibility/culling and resource cleanup checks.

**Files:** `src/world.js`, `src/models.js`, `src/render.js`, scenery/world tests. Coordinate appearance with F-021 rather than duplicating the assets.

### F-020 — Larger trees

**Requirement:** increase the size of trees.

**Accept when:** trees are visibly larger at the normal camera scale and remain proportionate to Pip, animals and structures. Maintain readable play space and valid routes/entrances. If trunk or canopy dimensions change, update placement clearance, physical footprints where applicable, bounds and shadow/culling data together. Verify that larger near-camera trees do not introduce new actor-visibility problems; F-016 covers structures specifically.

**Decision to resolve:** target scale or size range and variation across levels. `src/models.js`, `src/world.js` and `src/render.js` are likely touch points.

### F-021 — Bush and tree surface detail

**Requirement:** add more detail and textures to bushes and trees.

**Accept when:** foliage has readable volume, color/leaf variation and softened organic forms; trunks/branches have bark detail. Preserve the established cheerful handmade appearance and consistency between new bushes and larger trees. Avoid flat uniform blobs, repetitive obvious tiling and excessive fine-detail shimmer at portrait scale. Assess shader/texture memory, draw submissions, shadows and mobile performance; shared/cached resources must dispose correctly.

**Files:** `src/models.js`, `src/render.js`, scenery/resource tests. Dependencies F-019/F-020 establish the base shapes and size targets.

### F-022 — Weather-aware wildlife and shelter

**Requirement:** light rain and light wind still allow butterflies, birds, squirrels, rabbits and other wildlife. As weather worsens, smaller animals disappear/hide first; larger animals remain until more extreme conditions, then hide too.

**Accept when:** light conditions do not indiscriminately suppress wildlife. A documented per-species severity threshold/order causes gradual retreat/hiding as weather intensifies, and plausible return after it eases. Avoid abrupt simultaneous despawns, visible animals frozen in place, repeated threshold flicker or frame-rate-dependent population changes. Hiding wildlife still avoids the flock; ground animals never flee through barriers. Define behavior for airborne species and currently supported weather types, including snow. Coordinate shelter/visibility state with population generation in F-017.

**Decisions required:** species size categories, severity thresholds/hysteresis, shelter/exit behavior and return delay. The user supplied the ordering principle, not exact numeric thresholds.

**Files:** `src/nature.js`, wildlife tests. Consume the same weather severity/transition state as F-023/F-024.

### F-023 — Worsening-weather atmosphere and storms

**Requirement:** when weather changes toward rain or storms, increase cloud cover and change lighting to signal worsening conditions. If lightning occurs, show flashes and play thunder sounds.

**Accept when:** transitions adjust cloud coverage and ground lighting smoothly, preserving legibility of Pip, flock and goal. Cloud coverage works with F-008's soft semi-transparent cloud requirement; resolve any storm opacity exception explicitly rather than silently overriding it. Lightning flashes and thunder belong to the same bounded event, with sensible audio timing, and do not create uncontrolled flash bursts or stacked audio sources. Mute, pause, backgrounding, replay and level transitions handle storm effects and pending sounds consistently; clean up event resources. Record real-phone visual/listening checks.

**Decisions required:** severity model/transition timing, whether weather changes during a level, lightning frequency/intensity and thunder timing. A new within-level weather system must explicitly define pause/restart/seed behavior; current fixed per-level choices must not be assumed to provide it.

**Files:** `src/nature.js`, `src/render.js`, `src/audio.js`, weather/audio/resource tests. Provide shared rain/wind severity and event state to F-022 and F-024.

### F-024 — Rain accumulation, puddles and water response

**Requirement:** ground appearance reflects rainfall. Light rain has little effect; sustained heavier rain slowly darkens grass green and dirt tracks brown. Rainstorms produce standing puddles and splashes when animals walk through them. River water also reflects the weather change.

**Accept when:** wetness accumulates with rain amount over simulation time, rather than switching instantly to a fixed dark material. Grass and paths respond distinctly while remaining readable. Storm puddles occupy plausible ground locations without clipping across bridges or raised surfaces, and flock movement through them generates brief localized splashes; stationary animals do not emit continuous splash bursts. River surface appearance responds coherently to rain/storm intensity while retaining directional flow (F-004). These visual effects do not silently alter movement/collision. Pause freezes accumulation and events; restart/level replacement clears transient resources correctly. Preserve mobile performance under large moving flocks.

**Decisions required:** accumulation/saturation and drying rates, puddle formation thresholds/placement, river changes (for example ripples, roughness or color), and whether Pip/helpers/wildlife also splash. Those examples are implementation options, not approved extra mechanics.

**Files:** `src/nature.js`, `src/render.js`, `src/world.js`, weather/renderer/resource tests. Use shared weather state from F-023 and check material sharing does not leak wetness into the next level.

### F-026 — Quit to landing page

**Requirement:** the pause menu should include a Quit button that returns to the landing page. Added directly on GitHub while this batch was in progress; retained as an Open P3 item.

**Accept when:** Quit returns to the intro/landing screen with movement stopped and transient gameplay/audio handled consistently. Normal saved progress and earned money are preserved. Define whether the current in-progress meadow is discarded or can be resumed; do not treat Quit as Restart Game.

### F-027 — Wildlife crossing fences and map edges

**Requirement:** wildlife can pass through fences and leave and enter the game area. Added directly on GitHub as a second F-025; recorded here as F-027 to preserve the existing P0 deployment issue ID.

**Accept when:** the wildlife movement/spawn rules explicitly support crossing fences and departing/returning at the playable perimeter without permitting the robotic flock or Pip to cross their physical boundaries. Coordinate population budgets and natural entry/exit behavior with F-017. Decide how ground wildlife handles rivers, other obstacles and weather shelter; do not silently remove all wildlife collision checks.

### F-028 — Delivered animals roam inside the goal

**Requirement:** once an animal is delivered, let it continue gentle movement within the goal instead of stopping at the entry edge. Its entire body must remain inside the shared rotated enclosure footprint, including the entrance opening. Keep saved state permanent and the score/countdown/result contract unchanged.

**Accept when:** sheep and cows entering at any wall/corner move into and roam around the enclosure without leaving through the entrance, crossing solid obstacles or jittering at boundaries. Saved animals stay excluded from herding, companion membership and additional admission events. Gentle deterministic roaming continues behind completed results without moving Pip/undelivered animals, changing finalized counts/rewards or advancing the recovery clock. Pause, workshop, QA editing and hidden/background state freeze roaming. Restart/level replacement clears transient roaming state. Test rotated pen, field and barn footprints, actual species radii, timeout/full completion and multiple delivered animals.

**Implementation:** source `637111e` uses deterministic per-animal interior targets, gentle movement capped at 0.65 units/second, saved-only separation and full-body rotated-footprint validation after world collision. Saved animals stay excluded from active herding/admission. A saved-only step continues behind visible results and freezes with menus/QA editing/hidden-page state. Normal moving headings and gaits replace fixed saved headings. Node 22.23.3 final source suite passes 165/165; Node 24 journeys pass 5/5. Blind review passed 9.5/10 with 30,900 independent per-step containment checks and zero escapes. User acceptance for deployed build `639a9b45608fa0ad6aaa8189dd91dd7ba24b082d` was recorded 15 October 2026 at 00:28 America/Vancouver.

**Scope:** approved replacement for stationary delivered animals. This is separate from F-012 straggler wandering/bolting. User requested 14 October 2026 (America/Vancouver). Existing P0/P1 sign-offs remain closed.

### F-029 — Lifetime-best score improvement pays only its difference

**Requirement:** on each completed level, award only the positive improvement over that level's best previously earned bolts. Equal or lower scores pay zero. Spending bolts, reloading, or replaying must not reset the lifetime best.

**Accept when:** an initial earned score of 32 followed by 64 pays 32 additional bolts; an equal or lower replay pays zero. Spending bolts and reloading preserve the best-earned ledger, so subsequent equal/worse runs still pay zero. The best score and earned-bolt ledger remain consistent.

**Status / evidence:** Done; this was already implemented and verified, not a new economy change. `applyLevelReward` uses `bestEarnedBolts`/`bestScores` to pay only the positive difference. The focused replay tests in `tests/delivery.test.js` cover better, equal and worse replays and persistent ledger behavior. See [Gameplay](systems/GAMEPLAY.md) and [Requirements](REQUIREMENTS.md).

**Report disposition, 15 October 2026 (Vancouver):** the latest P0 “missing bolts on replay” report is withdrawn as invalid because it describes the intended lifetime-best delta rule. No active bug remains. No gameplay or economy code changes are requested or included.

## Previously repaired — retain as regressions

These are not open defects unless reproduced again: drone selecting the largest herd and holding when Pip leaves; no unattended goal completion; unlocks (drone 10, Buddy 20); path variety/map extent/continuous rivers; scenery hill collision alignment; pending audio activation overriding pause; overdue music scheduling burst; the default level-2 bridge stall; full-game restart persistence and delayed-audio focus. See `docs/QUALITY.md` and current tests for scope and limitations.

The latest Restart Game source passed CI tests/build and deployment byte verification. Historical blind scores **9.1 technical / 8.6 gameplay** describe the earlier bounded review, not a review of these newly requested changes. Do not update scores without a new independent assessment.

## Execution record

Copy one row per claimed issue; retain older entries when reopening work.

| Issue | Owner | Status | Branch/worktree | Source commit | Checks and review evidence | Deployment commit | Date / next action |
|---|---|---|---|---|---|---|---|
| F-025 | P0 implementation/release | Done | Integrated source | `6616c41` | Asset graph/helper tests; all 15 live game files + redirect hashes; 17 unrelated blobs preserved; independent blind medium 9/10 | `baca95c7ba618d736730194b433254bf5058dd66` | 14 Oct 2026; P1 release separate |
| F-001 | P1 surfaces | Done | Integrated source | `eed14e5` | Union topology/coverage regressions; final integrated checks tracked in runbook | `9346f26` | 14 Oct 2026; user signed off |
| F-002 | P1 surfaces | Done | Integrated source | `eed14e5` | Surface/deck geometry, pause and ownership checks | `9346f26` | 14 Oct 2026; user signed off |
| F-005 | P1 world | Done | Integrated source | `4887ea7`, `185116a` | Short landings, full water-strip/bevel coverage, rotated cow steering and unchanged full-flock journeys; user accepted deployed follow-up | `8a76de3` | 14 Oct 2026; user signed off |
| F-009 | P1 delivery | Done | Integrated source | `1fee206` | Timer, proportional score, canonical ledger/migration and controller checks | `9346f26` | 14 Oct 2026; user signed off |
| F-010 | P1 world/presentation | Done | Integrated source | `4887ea7`, `984fc64` | Rotated corners, full-body containment, goal/map/floor geometry | `9346f26` | 14 Oct 2026; user signed off |
| F-016 | P1 cutaway | Done | Integrated source | `4cf9719`, `b322e7d` | Whole roof/facing sides at .70 opacity, covered actors, pause and clone cleanup; user accepted deployed follow-up | `8a76de3` | 14 Oct 2026; user signed off |
| F-018 | P1 QA | Done | Integrated source | `df1d193` | Isolated session, mapping, pause/edit validation, bundle gating | `9346f26` | 14 Oct 2026; user signed off |
| F-028 | Goal roaming | Done | Integrated source | `e03ba16` | 165 tests, per-step mixed-species confinement, blind 9.5/10 | `639a9b4` | 15 Oct 2026 00:28 Vancouver; user accepted deployed build |
| F-029 | Best-score replay reward | Done | Existing implementation; docs-only record | `c4422cd` | Focused replay tests in `tests/delivery.test.js`; best improvement pays difference, equal/worse pay zero, ledger survives spending/reload | — | 15 Oct 2026; withdrawn P0 report was invalid |
| F-014 | Device QA | Done | User acceptance | `b663de7` | Novy confirmed real-phone QA; device/browser details not supplied | `50128cd` | 14 Oct 2026 (Vancouver); retain separate visual/performance issues |

## Decisions and session handoff

Record approved answers to the decisions above here, with date and source. At session end list changed issue IDs, remaining blockers, commands/results, branch heads and the next reproducible action. A blocked design decision does not prevent independent visual repairs.

Current handoff, 15 October 2026: F-025 migration and F-005/F-016 are Done. The P1 source and development release are published and live hashes verified (17 game files plus redirect). Source CI and native Pages publication succeeded. F-001/F-002/F-009/F-010/F-018 are Done by user sign-off; F-014 is Done by user confirmation. F-028 goal roaming is Done by user acceptance at 00:28 America/Vancouver for deployed Pages `639a9b45608fa0ad6aaa8189dd91dd7ba24b082d`. Other P2/P3 requests remain Open, including expanded squirrel motion, rabbits, vegetation and linked weather systems. F-029 records the existing, tested lifetime-best replay reward rule as Done; the latest missing-bolts P0 report was withdrawn as invalid. Historical reviews are retained as historical evidence, not current game scores.

Approved user decisions today: any positive partial delivery opens the next level; earned entitlement is proportional floor score; later lifetime-best improvements pay only the delta; QA 0 shortcuts the tutorial while public campaign remains 1–100. Source balance choices (duration formula, usable road-width comparison/landing overlap) are documented in Gameplay/World and remain subject to review. QA isolation, bounds-limited invalid placement, reset/export and production exclusion are implemented and await applicable device checks. See [P0/P1 validation](validation/P0-P1.md) for exact scenarios and limitations.

Integration note, 14 October 2026: remote commit `6ac8eb7` added Quit (F-026) and wildlife crossing fences/edges under a duplicate F-025. Both requests are preserved; the latter is now F-027. Neither P2/P3 feature is included in this P0/P1 implementation batch.

P1 medium-effort blind review: first pass gameplay 9.0/10 and technical 8.5/10; follow-up at `f0a87a1` gameplay 9.4/10 and technical 9.0/10. Confirmed QA-results, grass/bark composition and CI-artifact issues were fixed. Final source checks: 159/159 tests, release/dev artifact mode checks and documentation checks passed. Pixel/device acceptance remains open.


## Follow-up device reports — 14 October 2026 (Vancouver)

- `IMG_8375.jpeg` (level 4): user confirmed deck width and reported excessive length into land and animals caught near the bank/rail ends. Shorter landing follow-up was deployed and accepted; F-005 is Done.
- `IMG_8376.jpeg` (level 3 barn): roof remained opaque over Pip. Whole-roof/camera-facing-side fade was deployed and accepted; F-016 is Done.
- F-014 remains Done by user confirmation; these specific follow-up reports retain their own acceptance checks.

## Follow-up acceptance — 14 October 2026 (Vancouver)

Novy replied “Looks good” to the deployed bridge (F-005) and barn cutaway (F-016) follow-up at Pages `8a76de36bbb61ba824bc9371f85971667f786c35`. Mark F-005 and F-016 Done by user acceptance. The historical blind reviews and device limitation records above remain historical evidence; this acceptance applies to the deployed reported fixes only. F-014 was already Done.

## Final P1 user acceptance — 14 October 2026

Novy signed off all remaining P1 review items (F-001, F-002, F-009, F-010 and F-018) on 14 October 2026 at 21:10 America/Vancouver, following F-005/F-016 acceptance at 21:08. All P0 and P1 issues are Done. Acceptance applies to the deployed development build at Pages `8a76de36bbb61ba824bc9371f85971667f786c35`, including the approved temporarily hidden animal-position controls. This is user acceptance; it does not expand the measured scope of source tests or close P2/P3 work.


## Current follow-up — F-028

F-028 delivered goal roaming is Done by user acceptance on 15 October 2026 at 00:28 America/Vancouver for the deployed build at Pages `639a9b45608fa0ad6aaa8189dd91dd7ba24b082d`, source `e03ba169be760a4031d2b57887f0d6998eb07187`. The acceptance covers the reported goal-roaming behavior on that build; source review, test counts and device evidence retain their recorded scope. Existing P0/P1 sign-offs remain Done.
