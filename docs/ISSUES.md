# FLOCK — Remaining issues and change tracker

Current flock-behavior batch: F-035/F-037/F-039/F-041 are **Review**. Earlier weather/audio user sign-offs remain Done. See the new detailed sections below for the 17:03 user clarification; older fixed-five-second/15% descriptions are historical.

## User sign-off - 15 October 2026, 16:34 Vancouver

Novy explicitly signed off all pending Review items: **F-022, F-023, F-024 and F-040 are Done**. Acceptance applies to the live development build at Pages `bf26e67732434e902fdbaef10cac72d6814c33b0`, runtime source `1909c87bc1f70c4e53f4b38d64beaa2d4bb6d3aa`, including full-view/angled rain, no storm wildlife, accumulating puddles, deeper variable 3-5 second reverberant thunder after lightning, the 50% master volume increase and brighter lightning. This is user acceptance; historical headless checks and device-performance evidence retain their original limits. **At that weather sign-off checkpoint no items remained in Review.** The later flock-behavior batch F-035/F-037/F-039/F-041 is now Review. Open queued items remain Open; F-008 clouds remain Deferred. Older Review/pending wording below describes earlier checkpoints and is superseded by this sign-off. Documentation only; game bytes are unchanged.


Current weather repairs: [requirements](REQUIREMENTS.md#weather-follow-up---15-october-2026-1222-vancouver). Weather is Done by user acceptance on 15 October 2026 at 16:34 Vancouver; clouds remain Deferred.



Updated: 15 October 2026 (America/Vancouver). Repository: `novydhillon/Flock`. Working branch: `flock_3D_chatgpt-work`.

Latest weather follow-up is published: runtime source `8408e74`, Pages `617b4df`; CI and Pages succeeded, all 17 live game files match intended hashes, and only the dev2 entry point/main bundle changed. Rain covers the camera edges, storm fauna are omitted, thunder has music ducking, and seeded puddles grow near the playable journey. Independent rain/storm, puddle follow-up and documentation reviews reached 9/10; 229 source tests pass. F-022/F-023/F-024/F-040 remain Review pending fresh phone appearance/listening acceptance. F-008 remains Deferred. See [quality evidence](QUALITY.md#verified-weather-follow-up-publication).

Source checkpoint: integrated P0/P1 batch (delivery `1fee206`, goal view `984fc64`; see execution record). Canonical live game: https://novydhillon.github.io/Flock/dev2/. F-025 migration is published and verified at Pages `baca95c7ba618d736730194b433254bf5058dd66`; it contains the preceding game revision. The reviewed P1 development build was published at Pages `9346f26c5a145698b34e2c4504236c494023817d` from source `7a8519d37a8f447652f0449e16a050fc76a6d3e0`; all 17 game files plus redirect match live hashes, and all 18 blobs outside `dev2/` are unchanged. This tracker distinguishes source implementation from visual/device acceptance and live release.

Latest bridge/barn follow-up: source `4d3cadc393c9feaedee4e579099110e25f459c31`, Pages `8a76de36bbb61ba824bc9371f85971667f786c35`. Node 22 CI [38679079215](https://github.com/novydhillon/Flock/actions/runs/38679079215) and native Pages [38679328953](https://github.com/novydhillon/Flock/actions/runs/38679328953) succeeded. All 17 game files plus legacy redirect match live SHA-256 hashes; 18 files outside `dev2/` remain unchanged. Final source suite: 162/162; barn blind review 9/10 and final bridge recheck 9.5/10. Novy accepted F-005/F-016 on 14 October 2026 (Vancouver); both are Done. F-014 remains Done.

The original P0/P1 batch was signed off on 14 October 2026; F-008 and F-022–F-024 have since been reopened as P1 work under F-040. On 15 October 2026 at approximately 10:56 America/Vancouver, Novy accepted F-003, F-004, F-006, F-007, F-011, F-012, F-017, F-019, F-020, F-021 and F-027 for the published Pages build `cc13865` from source `b1fdac3`; these 11 items are Done. F-008 and F-022–F-024 are reopened as P1 work under the new fixed-per-level weather request F-040; they are not accepted as currently implemented. F-013 pacing and P3 statuses remain Open.

Accepted F-028 development release: F-028 is deployed at Pages `639a9b45608fa0ad6aaa8189dd91dd7ba24b082d` from source `e03ba169be760a4031d2b57887f0d6998eb07187`. Source CI [38681252991](https://github.com/novydhillon/Flock/actions/runs/38681252991) and native Pages [38681359737](https://github.com/novydhillon/Flock/actions/runs/38681359737) succeeded. All 17 game files plus the legacy redirect match live SHA-256 hashes; 18 files outside `dev2/` remain unchanged. Final suite: 165/165 on Node 22.23.3; blind review 9.5/10, with zero escapes in 30,900 independent per-step containment checks. F-028 was accepted by the user on 15 October 2026 at 00:28 America/Vancouver for this deployed build; previous P0/P1 sign-offs stay Done.

## How agents should use this document

1. Read this tracker, README and `docs/QUALITY.md`; inspect current code and branch state before starting. Public level numbers here are one-based; code indexes are zero-based.
2. Claim an issue by recording owner, branch/worktree, status and date. Use isolated worktrees for parallel implementation; coordinate ownership of shared files. Do not mark screenshot reports reproduced from a still image alone.
3. Confirm design decisions listed under each issue before coding dependent behavior. Explicit user requirements take precedence over proposed defaults. Preserve portrait, single-thumb play and the cheerful art direction.
4. Record reproduction level/seed, expected versus observed behavior, implementation commit, meaningful checks, reviewer findings and remaining limits. Use statuses: **Open → In progress → Review → Done**, or **Blocked** with the reason; **Deferred** records work explicitly postponed by the user.
5. Run relevant regression checks and the production build. Use fresh blind reviewers for a substantial gameplay/rendering batch; give them requirements and the candidate, without earlier scores or implementation rationale. Fix confirmed defects and recheck. Do not claim visual or phone validation from headless tests.
6. A completed source change and a live release are separate milestones. Record deployment commit and verification separately. Resolve F-025 before the next game release: publish to `dev2/` on the latest `gh-pages` tree, giving the public URL `/Flock/dev2/`. The old `flock/dev2/` destination is superseded. Preserve unrelated content and handle the old URL explicitly as part of migration. Changes to this tracker alone do not require a game deployment.

7. When an issue is closed (Done or Closed), apply Markdown strikethrough (`~~text~~`) to every cell in its Work overview row and to its detailed heading title after the issue ID. Keep the ID, acceptance criteria and evidence for traceability. Use the current overview status, not historical status notes. Remove strikethrough if reopened; Open, In progress, Review, Blocked and Deferred items are not closed.

Priority: **P0** = highest priority; complete before other queued work. **P1** = correctness/gameplay foundation; **P2** = planned feature/polish; **P3** = broader validation/optimization. All open items are unassigned until explicitly claimed.

## Work overview

| ID | Priority | Type | Item | Status | Depends on |
|---|---|---|---|---|---|
| ~~F-025~~ | ~~P0~~ | ~~Deployment~~ | ~~Correct public deployment URL to /Flock/dev2/~~ | ~~Done~~ | ~~Verified migration~~ |
| ~~F-001~~ | ~~P1~~ | ~~Reported defect~~ | ~~Path-corner polygon flicker~~ | ~~Done~~ | ~~—~~ |
| ~~F-002~~ | ~~P1~~ | ~~Reported defect~~ | ~~Bark effect above ground and bridge deck~~ | ~~Done~~ | ~~—~~ |
| ~~F-003~~ | ~~P2~~ | ~~Art/behavior~~ | ~~Detailed squirrel; species-appropriate motion; no spinning~~ | ~~Done~~ | ~~—~~ |
| ~~F-004~~ | ~~P2~~ | ~~Art~~ | ~~Flowing-water texture~~ | ~~Done~~ | ~~—~~ |
| ~~F-005~~ | ~~P1~~ | ~~Geometry/gameplay~~ | ~~Perpendicular crossings; bridges 25% wider than paths~~ | ~~Done~~ | ~~—~~ |
| ~~F-006~~ | ~~P2~~ | ~~Gameplay~~ | ~~Gates requiring player opening from level 20~~ | ~~Done~~ | ~~F-005~~ |
| ~~F-007~~ | ~~P2~~ | ~~Environment~~ | ~~Stone walls on selected levels~~ | ~~Done~~ | ~~F-006 interaction contract~~ |
| F-008 | P1 | Art | Cloud visuals temporarily removed at user request | Deferred | No runtime clouds or cloud shadows |
| ~~F-009~~ | ~~P1~~ | ~~Gameplay/economy~~ | ~~Arrival countdown; partial-delivery scoring~~ | ~~Done~~ | ~~F-010~~ |
| ~~F-010~~ | ~~P1~~ | ~~Correctness~~ | ~~Goal shape matches enclosure~~ | ~~Done~~ | ~~—~~ |
| ~~F-011~~ | ~~P2~~ | ~~Feedback~~ | ~~Blue dog-tail light; red bark flash~~ | ~~Done~~ | ~~F-002 shared bark event~~ |
| ~~F-012~~ | ~~P2~~ | ~~Gameplay~~ | ~~Level-gated wanderers and short bolting~~ | ~~Done~~ | ~~F-005, F-009 balance~~ |
| F-013 | P2 | Known review concern | Level-5 pacing spike | Open | F-005; retest after F-009/F-012 |
| ~~F-014~~ | ~~P1~~ | ~~Validation gap~~ | ~~Real-phone controls, appearance and sound~~ | ~~Done~~ | ~~User confirmed 14 Oct 2026~~ |
| F-015 | P3 | Validation gap | Mobile GPU performance and transition stability | Open | Rendering batches |
| ~~F-016~~ | ~~P1~~ | ~~Visibility~~ | ~~Camera-facing barn/covered-structure cutaway~~ | ~~Done~~ | ~~F-010 shared enclosure geometry~~ |
| ~~F-017~~ | ~~P2~~ | ~~Wildlife~~ | ~~Detailed hopping rabbits; random size-scaled wildlife counts~~ | ~~Done~~ | ~~F-003, F-022~~ |
| ~~F-018~~ | ~~P1~~ | ~~QA tooling~~ | ~~Dev-only level, currency and animal-placement menu~~ | ~~Done~~ | ~~—~~ |
| ~~F-019~~ | ~~P2~~ | ~~Environment~~ | ~~Add bushes~~ | ~~Done~~ | ~~—~~ |
| ~~F-020~~ | ~~P2~~ | ~~Environment~~ | ~~Increase tree size~~ | ~~Done~~ | ~~—~~ |
| ~~F-021~~ | ~~P2~~ | ~~Art~~ | ~~Richer bush/tree detail and textures~~ | ~~Done~~ | ~~F-019, F-020~~ |
| ~~F-022~~ | ~~P1~~ | ~~Wildlife/weather~~ | ~~Species retreat as weather worsens~~ | ~~Done~~ | ~~F-040 fixed-per-level weather contract~~ |
| ~~F-023~~ | ~~P1~~ | ~~Weather/feedback~~ | ~~Fixed per-level atmosphere, clouds, lightning and thunder~~ | ~~Done~~ | ~~F-040 fixed-per-level weather contract~~ |
| ~~F-024~~ | ~~P1~~ | ~~Weather/surfaces~~ | ~~Accumulating wetness, puddles, splashes and river response~~ | ~~Done~~ | ~~F-040 fixed-per-level weather contract~~ |
| F-026 | P3 | UI | Pause-menu Quit returns to landing page | Open | — |
| ~~F-027~~ | ~~P2~~ | ~~Wildlife~~ | ~~Wildlife can pass through fences and leave/enter the game area~~ | ~~Done~~ | ~~F-017~~ |
| ~~F-028~~ | ~~P2~~ | ~~Gameplay~~ | ~~Delivered animals roam inside the goal enclosure~~ | ~~Done~~ | ~~F-010 shared footprint~~ |
| ~~F-029~~ | ~~P2~~ | ~~Gameplay/economy~~ | ~~Pay only lifetime-best score improvements on replay~~ | ~~Done~~ | ~~F-009~~ |
| F-030 | P3 | Environment | Lighter, more contrasting water waves | Open | — |
| F-031 | P2 | World generation | Gates on 20+ levels, with some ungated alternative paths | Open | F-006 |
| F-032 | P3 | Gameplay/UI | Closed red and open green world-fence button; dog touch activates | Open | F-031 |
| F-033 | P2 | Environment/art | English farm dry-stone wall appearance | Open | F-007 |
| F-034 | P3 | World generation | Seeded 15% stone-wall chance per level | Open | F-033 |
| F-035 | P2 | Gameplay | Baseline bolt duration 3–5 seconds | Review | F-012 |
| F-036 | P3 | Gameplay | Unattended flock spreads out in the field | Open | F-012, F-028 |
| F-037 | P2 | Gameplay | Eligible wander cohort increases from 15% to 20% | Review | F-012 |
| F-038 | P2 | World generation/gameplay | Progressively larger, multi-directional, less-linear fields with body-clear routes; later difficulty accounts for helpers | Open | F-005, F-006, F-031 |
| F-039 | P2 | Gameplay/balance | Late-level wandering/bolting chances and durations | Review | F-012, F-035, F-037 |
| ~~F-040~~ | ~~P1~~ | ~~Weather~~ | ~~Remove snow; choose fixed weather once per level with public-level anchors~~ | ~~Done~~ | ~~Reopens F-008, F-022–F-024~~ |
| F-041 | P2 | Gameplay/behavior | Wanderers and bolters settle near their current location instead of returning to the flock | Review | F-012, F-035, F-037, F-039 |
| F-042 | P3 | Wildlife/art | Investigate and fix missing back legs on small wild animals | Open | - |
| F-043 | P3 | Audio | Make the bark sound resemble a barking dog | Open | - |
| F-044 | P3 | Audio | Add sheep and cow calls with state-dependent frequency and volume | Open | - |
| F-045 | P4 | Weather/water | Add rain impacts and splashes on water during heavy rain or stronger | Open | - |
| F-046 | P2 | Gameplay/companions | Tiered Buddy rear herding, smaller-flock support, retrieval and autonomous bark | Review | - |
| F-047 | P4 | Gameplay/companions/economy | Second Buddy after meadow 40 with independent leveling and max tier by meadow 70 | Open | F-046 |
| F-048 | P2 | Gameplay/companions | Fix Buddy stuttering movement at low speed | Open | F-046 |

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

**Accept when:** distinct head/ears, face, legs/paws and bushy tail remain readable at game scale; heading follows actual movement, with stable idle/blocked poses and believable short turns. Wildlife still avoids Pip, the robotic flock and helpers and obeys wildlife-specific water/tree/structure collision; ordinary fences and map edges are permeable under F-027. Use recognizable squirrel scurrying/bounding, brief alert pauses and coordinated legs/body/tail motion, rather than a sliding body or continuous circular orbit. Observe idle, blocked, turning and fleeing squirrels, not only open-field movement. Real-renderer observation is needed to judge motion quality.

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

### F-008 — Clouds temporarily deferred

**Current decision, 15 October 2026 at 11:22 America/Vancouver:** Novy requested removing clouds for now because they are not working as intended. Disable all visible cloud puffs and their associated ground shadows. Rain, fixed per-level weather, sky/fog/daylight, lightning/thunder, wet ground and wildlife remain active.

**Status:** Deferred. The renderer no longer instantiates or updates `Atmosphere`; its source and unit tests are retained as dormant reference for future work. No cloud texture, billboard or shadow resource is allocated by normal game rendering. Earlier cloud appearance/opacity criteria and review evidence are historical, not current runtime requirements. Do not re-enable clouds as part of routine weather maintenance.

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

**Accept when:** ears, face, body, hind legs and tail distinguish rabbits at normal portrait zoom. Hopping has coordinated crouch, push-off, airborne and landing poses, with believable idle/turn/flee transitions; avoid sliding or spinning. Both species avoid Pip/flock/helpers and water/tree/structure barriers; ordinary fences/map edges are permeable under F-027. Population varies with usable level area and randomness, with bounded counts for performance and repeatable seeded fixtures for testing. Weather visibility is handled by F-022, not by permanently deleting a level's base population.

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

**Accept when:** light conditions do not indiscriminately suppress wildlife. A documented per-species severity threshold/order causes gradual retreat/hiding as weather intensifies, and plausible return after it eases. Avoid abrupt simultaneous despawns, visible animals frozen in place, repeated threshold flicker or frame-rate-dependent population changes. Hiding wildlife still avoids the flock; ground animals retain water/tree/barn/stone-wall barriers while ordinary fences/map edges remain permeable under F-027. Define behavior for airborne species and currently supported weather types, including snow. Coordinate shelter/visibility state with population generation in F-017.

**Decisions required:** species size categories, severity thresholds/hysteresis, shelter/exit behavior and return delay. The user supplied the ordering principle, not exact numeric thresholds.

**Files:** `src/nature.js`, wildlife tests. Consume the same weather severity/transition state as F-023/F-024.

### F-023 — Fixed per-level atmosphere and storm feedback

**Current requirement:** the level retains its selected weather; rain/storm intensity is conveyed through rain, sky/fog/daylight and paired lightning/thunder. Visible clouds and cloud shadows are temporarily removed under F-008 at Novy's request on 15 October 2026. Earlier dynamic weather ramps and cloud-coverage requirements are superseded.

**Accept when:** the selected sunny/breezy/light/heavy/storm condition remains fixed throughout the level; storm flashes and thunder share one bounded event with sensible delay. Rain, lighting and ground state remain readable. Mute, pause, backgrounding, replay and level changes cancel pending/stale effects consistently. No cloud meshes or cloud ground shadows appear. Phone appearance/listening acceptance remains pending for the rain/storm effects.

**Files:** `src/weather.js`, `src/nature.js`, `src/rain-view.js`, `src/render.js`, `src/audio.js` and relevant tests. `Atmosphere` is dormant and no longer part of the runtime contract.

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

### Acceptance record — P2 items, 15 October 2026

Novy accepted F-003, F-004, F-006, F-007, F-011, F-012, F-017, F-019, F-020, F-021 and F-027 at approximately 10:56 America/Vancouver for the public Pages build `cc13865`, source `b1fdac3`. Mark these issues Done for that deployed revision. This acceptance does not imply new requirements F-030–F-039 are implemented, and does not accept the existing dynamic weather behavior: F-008 and F-022–F-024 are reopened as P1 work tied to F-040.

### F-030 — Lighter, more contrasting water waves (P3)

**Requirement:** make river waves lighter and more contrasting.

**Accept when:** wave detail is visibly lighter and has stronger contrast against the river base at normal portrait zoom, follows the local river direction through bends, remains seamless at banks/bridges and stays readable in all fixed weather types. Check pause and mobile rendering cost.

**Status:** Open; no implementation authorized by the acceptance of F-004.

### F-031 — Random gates and ungated alternatives (P2)

**Requirement:** gates are present on 20+ levels, but not every level; some gate levels offer an alternative route without a gate.

**Accept when:** deterministic per-level generation can produce gated and gate-free levels at 20+, never places gates on levels below 20, and some gated levels have a complete, navigable ungated alternative. Tests cover multiple seeds, route connectivity, body clearance and helper navigation. Preserve the existing approved gate interaction in F-006.

**Status:** Open. Exact random distribution is unspecified and must not be invented as user-approved.

### F-032 — World-fence gate indicator and dog activation (P3)

**Requirement:** show a world-fence button red when closed and green when open; touching the button with the dog activates it.

**Accept when:** the button is visibly red only for closed gates and green only for open gates; dog contact activates the associated gate reliably, updates collision/navigation/minimap state, and provides accessible feedback. It must work on touch and keyboard/mouse without requiring a second thumb. Coordinate with F-031 generated gates.

**Status:** Open. Clarify the interaction mapping during implementation if the visual button/control relationship is ambiguous; do not silently change F-006's accepted action.

### F-033 — English dry-stone wall appearance (P2)

**Requirement:** stone walls should look like drystone walls built by an English farmhand.

**Accept when:** rendered walls read as hand-laid, irregular dry-stone masonry with plausible varied stones and no visible mortar, while maintaining consistent collision, gates/openings, route clearance and mobile performance. Review at normal game zoom and across wall orientations.

**Status:** Open; appearance request only, with no runtime change in this documentation task.

### F-034 — Seeded per-level stone-wall chance (P3)

**Requirement:** each level has a seeded 15% chance to use stone walls, replacing the existing fixed four-level sequence.

**Accept when:** each level's wall selection is reproducible from its seed and uses a 15% per-level probability; no deterministic every-fourth-level rule remains. Statistical tests assess broad distribution across a large seed set without brittle per-seed expectations; route openings and clearance remain valid.

**Status:** Open; depends on the F-033 appearance contract and F-007 accepted wall functionality.

### F-035 — Baseline bolt duration (P2)

**Requirement:** baseline bolts last 3-5 seconds (public levels 17-39); public 40-69 uses 4-6 seconds and 70+ uses 5-10 seconds under F-039. Durations are seeded and interrupted only by herding, delivery, or loss of cohort eligibility as undelivered count shrinks.

**Status:** Review, implemented with regression coverage; pending user acceptance of the new gameplay build.


### F-036 — Unattended flock spreads across the field (P3)

**Requirement:** when unattended, the flock spreads out across the field.

**Accept when:** with Pip and helpers not actively controlling the herd, eligible undelivered animals disperse across usable field area; spread remains bounded by gameplay barriers and field edges, does not cause stuck animals or autonomous goal delivery, and stops/reverses appropriately when herding resumes. Saved animals continue to follow F-028's enclosure roaming contract. Define measurable spread/coverage during implementation without presenting a chosen metric as user-approved.

**Status:** Open; distinct from F-012 straggler wandering and F-028 delivered-animal roaming.

### F-037 — Per-level eligible wander cohort (P2)

**Requirement, clarified 15 October 2026 at 17:03 Vancouver:** each level has its own fresh cohort with no cross-level memory; only undelivered animals participate. Implementation retains a cap of floor(20% of the current undelivered flock) on every level, with stable seeded ranking that is recomputed as deliveries reduce that count. Active player/helper pressure suppresses opportunities. Saved animals retain separate confined goal roaming.

**Status:** Review, implemented; pending user gameplay acceptance.


### F-038 — Larger, less-linear multi-directional levels (P2)

**Requirement:** levels should grow progressively larger and less linear, using multiple directions, fields, rivers and tree clusters; routes must preserve body clearance and avoid stuck animals, and later difficulty must account for helpers.

**Accept when:** public level progression includes larger usable fields and more multi-directional route choices across generated fields, rivers and tree clusters. Every route fits the largest applicable animal body and helper footprint, avoids pinches/stalls, and remains connected under gates/walls; later levels are evaluated with helpers present so added companions do not make progression artificially easy. Use seeded route sweeps and ordinary-input journeys while preserving the level-2 bridge retrieval regression. Exact size/progression thresholds remain implementation decisions, not user-approved values.

**Status:** Open.

### F-039 — Late-level wander/bolt tuning (P2)

**User clarification, 15 October 2026 at 17:03 Vancouver:** replace the earlier 30%/50% figures with 20% chance per check above level 40 and 25% above level 70; randomize checks between 5 and 8 seconds. Each level owns its flock cap and transient state; only undelivered animals participate.

**Implemented bands:** public levels 8-40 retain 33% wander probability per eligible check; levels 41-70 use 20%, and 71+ use 25%. The eligible cohort remains capped at floor(20% of undelivered animals) per F-037. Conditional bolt probability is 10% from public level 17, and 20% at 41+. Bolt duration steps from baseline 3-5 seconds to 4-6 at public 40 and 5-10 at public 70. These are step bands, not interpolated scaling.

Each animal owns a deterministic sequence of independent seeded 5-8 second check intervals. Pause freezes simulation time; delayed calls never replay a backlog. Saved, actively herded and already-settled animals cannot begin an excursion. Fresh levels/restarts reset schedules, eligibility and local roaming.

**Status:** Review, implemented; pending user gameplay/pacing acceptance. The new clarification supersedes the earlier unresolved 30%/50% interpretation.


### F-040 — Fixed per-level weather; remove snow (P1)

**Requirement:** remove all snow. Choose each level's weather once and retain it for the whole level, beginning with light rain from public level 9; introduce heavy rain and storms later. No within-level switches to sun or another rain tier.

**Accept when:** no snow renders; one seeded kind/intensity/severity/daylight is chosen at level creation and remains fixed. Public level 9 demonstrates light rain. The implementation currently introduces heavy rain at 16 and storms at 24, with those levels guaranteed examples and seeded weighted selection elsewhere; these later thresholds/weights are source tuning choices, not user-specified requirements. Rain/cloud motion, puddle accumulation and paired lightning/thunder may animate without changing weather kind or tier. Rain/clouds must be visible immediately, including the first camera frame; pause/restart/hidden-tab/audio behavior remains deterministic and safe.

**Dependencies and reopened work:** F-008 clouds, F-022 wildlife shelter, F-023 atmosphere/lightning and F-024 wetness/puddles are all P1 candidate work under this contract. Earlier 90-second episodes and snow behavior are superseded.

**Status:** Review. Fixed weather, orthographic rain/cloud projection, first-frame wet ground, labels and bounded storm events are implemented; independent source reviews meet 8/10. Fresh phone appearance/listening acceptance is pending. See the implementation handoff below.

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
| F-003/004/006/007/011/012/017/019/020/021/027 | Published P2 acceptance | Done | Deployed Pages build | `b1fdac3` | User accepted these 11 items; new weather contract explicitly remains open | `cc13865` | 15 Oct 2026 approx. 10:56 Vancouver; F-008/F-022–F-024 reopened under F-040 |

## Decisions and session handoff

Record approved answers to the decisions above here, with date and source. At session end list changed issue IDs, remaining blockers, commands/results, branch heads and the next reproducible action. A blocked design decision does not prevent independent visual repairs.

Current handoff, 15 October 2026: F-025 migration and F-005/F-016 are Done. The P1 source and development release are published and live hashes verified (17 game files plus redirect). Source CI and native Pages publication succeeded. F-001/F-002/F-009/F-010/F-018 are Done by user sign-off; F-014 is Done by user confirmation. F-028 goal roaming is Done by user acceptance at 00:28 America/Vancouver for deployed Pages `639a9b45608fa0ad6aaa8189dd91dd7ba24b082d`. That was the pre-P2 release checkpoint. The published P2 candidate added squirrel motion, rabbits, vegetation and linked weather systems. Eleven items were accepted at approximately 10:56 Vancouver for Pages `cc13865` / source `b1fdac3`. F-008 and F-022–F-024 are now P1 and reopened under F-040 because the user requested fixed weather and no snow. F-030–F-040 are newly queued and Open; P3 and F-013 work remains Open. F-029 records the existing, tested lifetime-best replay reward rule as Done; the latest missing-bolts P0 report was withdrawn as invalid. Historical reviews are retained as historical evidence, not current game scores. The 15 October 10:56 acceptance applies to the already published build only; no F-030–F-040 implementation or newer publication is implied.

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

## P2 candidate handoff — 15 October 2026

F-003/F-004/F-006/F-007/F-008/F-011/F-012/F-017/F-019/F-020/F-021/F-022/F-023/F-024/F-027 are candidate changes in **Review**, not user sign-off. Code is developed in isolated workstreams and integrated on `flock_3D_chatgpt-work`. Do not reopen prior P0/P1 acceptance. F-013 remains Open: historical simulated pacing is not a substitute for human level-5 attempts. F-015/F-026 remain Open P3 work.

| Workstream | Owner / worktree | Source evidence |
| --- | --- | --- |
| Gates / stone walls | p2_gates_walls / `flock-gates` | `fb63a6b`; public level20 closed gates, nearby independent Open gate control; deterministic stone variants from level8 every fourth level |
| Weather / cloud / thunder | p2_weather / `flock-p2-weather` | `c6e877d`; one shared deterministic weather state, 90-second episodes with 18-second ramps, bounded paired lightning/thunder |
| Ground/water effects | p2_water / `Flock-water-fix`, integration root | `32fc389`, integrated local arc-length UV and persistent-puddle corrections in `b431cfe` |
| Vegetation / tail feedback | p2_vegetation / `flock-p2-vegetation` | `979f27b`; safe decorative clusters, larger detailed trees, isolated blue/red tail material |
| Stragglers | p2_wandering / `Flock-f012-wanderers` | `3fdd2be`; fixed seeded cohort and five-second probability opportunities, with integrated duration follow-up `8ac64a8` |
| Wildlife | p2_wildlife / `Flock-p2-wildlife` | `b648670`, shelter/motion follow-up `a6e8cb2`, actual stone-material and hysteresis integration fixes |

Weather effects are visual and ambient; collisions, rewards and robotic movement do not consume weather severity. No weather opacity exception: cloud materials stay .10–.12, with worsening cover through puff area. Weather, ground wetness and puddles evolve in unpaused presentation time (playing, intro and results) and restart dry; menus/QA freeze them. Delivery and straggler behavior advance only during gameplay. Bushes are decorative. Wildlife-specific permeability never applies to Pip, helpers or flock.

Blind source review results and test limitations are recorded in [QUALITY.md](QUALITY.md). This batch needs fresh phone appearance/motion/listening acceptance; earlier F-014 acceptance does not automatically validate these new visuals. Source-test scores are not a rendered game rating. Runtime deployment evidence is recorded separately after publication.

Node 22 integration follow-up `30abd2a` repairs actual-radius route fallback and pressured enclosure-corner retrieval exposed by stone geometry. Five unchanged journeys pass on Node 22 and Node 24; F-013 still needs human pacing attempts.


## Verified P2 development publication — 15 October 2026

Live game: **https://novydhillon.github.io/Flock/dev2/**. Runtime source snapshot `b1fdac3697de6dd597cfb6f98e8d1fbbda1be5a8`; Pages `cc138652cc55f5c88cc36c336f575aa26120ebee`. Source CI [38703120954](https://github.com/novydhillon/Flock/actions/runs/38703120954) and native Pages [38703297030](https://github.com/novydhillon/Flock/actions/runs/38703297030) both succeeded. All 17 development-game files plus the legacy redirect match live SHA-256 hashes; all 18 blobs outside `dev2/` are unchanged. Main runtime asset: `assets/index-BPDTiqRn.js`.

Final source CI passes the 212-test aggregate, generated-documentation checks and both release/development build checks. Local full suites before the final hidden-tab guard passed 211/211 on Node 22 and Node 24; the guard's focused UI/QA tests passed 28/28, and final CI includes its added regression. Blind source reviews meet the 8/10 target; documentation follow-up is 8.5/10. No fresh rendered/device acceptance is claimed.

Implemented P2 items stay **Review** for Novy's acceptance. F-013 remains **Open** pending human level-5 pacing; F-015/F-026 remain **Open** P3 work. Previous P0/P1 and F-028/F-029 sign-offs remain Done. Workstream SHAs elsewhere in this record identify local development evidence; the published runtime snapshot above contains their integrated code. The following documentation-only commit does not change the verified runtime build.


## Fixed-weather implementation handoff — 15 October 2026

The 11 accepted P2 items remain Done. F-030–F-039 remain Open, queued enhancements; **none of the new gate/wall/wander/map features are implemented in this weather batch**. F-008/F-022/F-023/F-024/F-040 are **Review** after source fixes and independent review, pending Novy's new weather appearance/listening acceptance. Earlier 90-second transitions and snow are superseded.

| Candidate ownership | Branch/worktree | Evidence |
| --- | --- | --- |
| Fixed state / audio | `fix/fixed-weather-state`, `Flock-weather-state` | `58b563c`; no snow, no within-level weather changes, deterministic bounded paired storm events |
| Cloud/rain projection | `fix/weather-visibility`, `Flock-visible-weather`; `fix/weather-projection`, `Flock-weather-projection` | `2afe4de`, `7b4b515`; actual orthographic rays, visible first-camera rain, moving shadows, three bounded weather draws |
| Integrated wet ground / labels | main integration | `8afd27e`; initial wet heavy/storm meadow, mission weather label, normalized signed cloud drift, pause/reset tests |

QA public **9** = light rain, **16** = heavy rain, **24** = storm, for every seed unless an explicit permitted weather override is used. Level 9 is the user-specified light-rain start; 16/24 and seeded weights on other levels are initial tuning choices. Each level's kind/intensity/daylight stays fixed. Ground water accumulation, cloud/rain motion and lightning events can animate without changing that weather. No snow render/audio type remains; the legacy `snow` override maps to an allowed light rain/dry state.

Source review: **8/10**, geometry/visibility review: **8.3/10**. These do not establish perceived appearance on a phone. Geometry review used actual camera rays and texture-alpha sampling, found discrete clouds in portrait/landscape across small/large maps, and verified first-camera rain distribution, shadow motion, pauses and disposal. See [quality record](QUALITY.md) for final test/publication evidence.


## Verified fixed-weather publication — 15 October 2026

Live candidate: **https://novydhillon.github.io/Flock/dev2/**. Runtime source `878efee1db3c781c7d60c3f0f620ed6a9467dbcd`; Pages `27b1bf535c09642f86d5a6ce032b88906eb695c5`. Source CI [38783755137](https://github.com/novydhillon/Flock/actions/runs/38783755137) and native Pages [38783945804](https://github.com/novydhillon/Flock/actions/runs/38783945804) succeeded. All 17 game files plus legacy redirect match live SHA-256 hashes; 18 blobs outside `dev2/` remain unchanged. Main runtime asset: `assets/index-BLaryV1o.js`.

Final source CI passes 220 tests, documentation checks and release/development QA-exclusion/inclusion builds. Independent source and geometry reviews are 8/10 and 8.3/10; documentation is 8/10. Source publication does not constitute phone appearance/audio acceptance.

The 11 previously approved P2 issues remain Done. F-030–F-039 remain queued Open; F-008/F-022/F-023/F-024/F-040 stay Review pending the new weather test. Public QA levels 9/16/24 demonstrate fixed light/heavy/storm conditions without waiting for a transition; storm lightning starts after 8–12 unpaused presentation seconds. No snow is rendered. The thresholds 16/24 remain tuning choices. Development workstream SHAs identify local evidence; the runtime snapshot above contains the integrated source. The following evidence-only documentation commit does not change the verified build.


## Temporary cloud removal — 15 October 2026

At 11:22 Vancouver, Novy requested removing clouds for now. F-008 is Deferred; both cloud puffs and cloud shadows are removed from the game renderer. The `cloudCoverage` weather value still influences sky/fog/lighting and river appearance; it does not create visible cloud objects. Rain/storms and the fixed-level contract remain in Review pending weather acceptance. No new queued P2/P3 request is implemented by this change.


### F-041 — Wanderers and bolters adopt their new local area (P2)

**Requirement:** an animal finishing a spontaneous wander/bolt calmly roams near the position it reached, rather than automatically returning to its flock.

**Implementation:** excursion motion omits ordinary cohesion/alignment. On expiry or reaching a wander target, save a local home; calm motion remains within 3 metres of it, with normal body collision. It cannot begin another escape while settled. Active clear player pressure or active helper herding clears excursion/home state and restores normal herding. Helper hold behavior remains authoritative. Delivery clears transient excursion fields before confined saved-animal roaming. Cohort shrink may also end a current excursion at its reached position to respect the current undelivered cap.

**Status:** Review, implemented; pending user gameplay acceptance. Test both wander and bolt expiry, nearby herd attraction, collision, player/helper interruption, pause, restart and delivery.


## Rain-volume approval - 15 October 2026, 16:46 Vancouver

Novy approved and requested committing the deployed rain-volume update: gentle rain 50% quieter, heavy rain 15% quieter, storm rain unchanged. Runtime source `a26b8aa`, Pages `107f782`. Approval recorded as Done; no new Review item remains. Existing Open/Deferred items retain their status.


## Requests migrated from GitHub Issues - 15 October 2026

This document is the authoritative issue tracker. Record future issue requests here, rather than creating GitHub Issues. GitHub copies #2-#5 are closed because tracking moved here; the work remains Open and unassigned.

### F-042 - Investigate and fix missing back legs on small wild animals (P3)

**Status:** Open, queued only; unassigned.

Small wild animals appear to be missing their back legs. Investigate the cause and fix their appearance.

Acceptance criteria:
- Identify why the back legs are not visible.
- Ensure small wild animals display their back legs correctly while idle and moving.

**Migration source:** [GitHub #2](https://github.com/novydhillon/Flock/issues/2); moved to this document without implementing or completing the request.

### F-043 - Make the bark sound resemble a barking dog (P3)

**Status:** Open, queued only; unassigned.

The current bark sound does not sound like a barking dog. Update or replace it so the bark is clearly recognizable as a dog barking.

Acceptance criteria:
- Triggering the bark plays a recognizable dog bark.

**Migration source:** [GitHub #3](https://github.com/novydhillon/Flock/issues/3); moved to this document without implementing or completing the request.

### F-044 - Add sheep and cow calls with state-dependent frequency and volume (P3)

**Status:** Open, queued only; unassigned.

Add recognizable sheep bleats ("bahhh") and cow moos. Each individual animal should vocalize intermittently at random intervals, so the combined calls sound like a flock/herd rather than synchronized playback.

Behavior by state:
- Wandering: more frequent calls at baseline volume.
- Being herded / flocked: less frequent calls, 25% louder than baseline.
- Bolting: use the same sound behavior as being herded / flocked (less frequent calls, 25% louder than baseline), with a call starting immediately when the animal begins bolting. Subsequent calls occur intermittently at random intervals.

Acceptance criteria:
- Sheep sound recognizably like sheep and cows sound recognizably like cows.
- Each animal calls occasionally on its own randomized schedule; combined calls create a natural flock/herd sound.
- Wandering calls occur more frequently than herding calls and use baseline volume.
- Herding calls occur less frequently and are 25% louder than baseline.
- Bolting immediately triggers a call and then follows the herding call frequency and volume.

**Migration source:** [GitHub #4](https://github.com/novydhillon/Flock/issues/4); moved to this document without implementing or completing the request.

### F-045 - Add rain impacts and splashes on water during heavy rain or stronger (P4)

**Status:** Open, queued only; unassigned.

Add visible raindrop impacts and splashes on rivers, streams, and other water surfaces when heavy rain or stronger rain is falling.

Acceptance criteria:
- Rivers, streams, and other water surfaces show raindrop impacts/splashes during heavy rain and stronger rainfall, including thunderstorms.
- The effect is active only at heavy rain intensity or above.

**Migration source:** [GitHub #5](https://github.com/novydhillon/Flock/issues/5); moved to this document without implementing or completing the request.


## QA testing follow-up - 15 October 2026, 17:37 Vancouver

Added the requested single flock-debug toggle: next eligible check countdown above Woof and subtle yellow wander/red bolt tints. This is read-only development QA instrumentation; F-035/F-037/F-039/F-041 remain Review for gameplay acceptance. Prior F-018 acceptance remains historical; the new debug presentation awaits player testing. See [QA usage](DEVELOPMENT.md#qa-flock-behavior-debug---15-october-2026-1737-vancouver).


### F-046 - Improve Buddy dog behavior by upgrade tier (P2)

**Request (15 October 2026):** Buddy starts at the back of the flock and helps along its actual group direction of travel. From Buddy tier 2, stay with the smaller flock after a split. From tier 3, retrieve wanderers and bolters to the closest flock group and bark autonomously to guide groups or individuals.

**Implementation:** separate Buddy decisions from drone hold/assist. Measure flock velocity, navigate behind the rearmost member, select smaller connected groups from tier 2, and retain tier-3 retrieval targets until reunited. Bark and pressure require a useful local rear position and clear ground; all bodies retain collision and bridge/gate clearance. Bark audio/rings originate at Buddy and its tail flashes independently. Existing tier unlocks, prices, saved profiles and Pip-attended scoring remain unchanged.

**Status:** Review; source/headless checks complete, user gameplay acceptance pending. New tests cover cardinal directions and reversal, idle/remote behavior, smaller-group ties and merge, wander/bolt/settled retrieval to the nearest group, activation gates, barriers, real bridge retrieval with a holding drone, bark cooldown/pause/reset, target invalidation, audio routing and independent tail/ring lifecycle. No rendered/device or listening claim is made.

F-046 clarification at 18:53 Vancouver: bolters are allowed to get away initially; Buddy should catch up through ordinary pursuit. Immediate interception is not an acceptance requirement.


### F-047 - Second Buddy dog with independent progression (P4)

**Status:** Open, queued only; unassigned.

**Requirement:** after meadow level 40, make a second Buddy dog available with its own independent leveling. Its purchase and upgrade costs should reflect the later stage of the game. Its maximum upgrade tier should be available by meadow level 70.

**Accept when:**
- A second Buddy becomes available after meadow 40.
- Each Buddy has its own saved upgrade level and can be upgraded independently.
- Purchase and upgrade prices are balanced for later-game bolt earnings; exact prices remain to be tuned.
- The second Buddy can reach its maximum upgrade tier by meadow 70, with unlock gates and costs supporting that progression.

**Scope:** queued feature request only; no second Buddy or pricing changes implemented by this tracker update. Coordinate with F-046 Buddy behavior tiers.

### Buddy execution and publication - 15 October 2026

Implemented and published from source `d557d92` to Pages `c30ca36`. Source CI and native Pages deployment succeeded; 254 source tests pass, both release/development artifact checks pass, and all 17 live files match the intended SHA-256 hashes. All 18 unrelated Pages files are unchanged. Test Buddy tiers at public QA 20/24/28. **Review** remains pending user gameplay acceptance. See [publication evidence](QUALITY.md#verified-buddy-behavior-publication). Bolters may escape ahead while Buddy runs to catch up; immediate interception is not required.


### Buddy navigation and split-flock follow-up - 15 October 2026, 19:11 Vancouver

F-046 remains **Review** after the user reported tree stalls and instant opposite-facing flicker, requested independent split flocks, and added tier-2 help across nearby bridges/goal entrances. The repaired source adds cached body-clear tree detours (also for retrieved sheep/cows), stable circling sides, bounded movement/facing turns and explicit local passage guidance. Cohesion/alignment only operate within each connected flock; separated groups and single animals no longer attract back together. The old 18m range remains within a connected group so normal herding is not weakened. Local passage help retains the final singleton; ordinary tier-3 stray retrieval and player-attended scoring stay distinct. F-047 remains queued.

Acceptance checks: Buddy gets around a blocking trunk on/off roads; it turns gradually inside a flock and after reversal; split groups stay independent; tier 2 guides an off-axis bridge and a rotated pen/field/barn entrance including the final sheep; all bodies respect clearance and no unattended scoring occurs. User play/device acceptance is pending; this is not sign-off.

Publication completed after resuming at 22:16 Vancouver: source `25c77ff`, Pages `e175cc0`. Source CI and native Pages succeeded; all 17 live files and canonical entry HTML match the checked build, and all 18 unrelated Pages files are preserved. The 263-test suite, release/development checks and generated documentation checks pass. F-046 stays **Review**. Test tree navigation/turning at QA 20, tier-2 passage help at QA 24, and retrieval at QA 28. See [verified publication](QUALITY.md#verified-buddy-navigation-follow-up-publication).


### F-048 - Buddy stutters when moving slowly (P2)

**Status:** Open, queued only; unassigned.

**Reported behavior:** Buddy dog has stuttering movement when moving slowly. Investigate and fix the low-speed movement so Buddy moves smoothly.

**Accept when:**
- Buddy moves smoothly at low speed without repeated stop-start jitter.
- Slow movement, stopping, and resuming remain smooth while preserving intended herding behavior and collision handling.

**Scope:** bug report only; no fix or user acceptance is claimed by this tracker update.

### Forward flock movement, lower cohesion, tier-2 bark and bridge completion

User follow-ups at 22:33-22:39 Vancouver on 15 October 2026: front animals should keep moving with the flock; back/side animals near the dogs carry pushing pressure forward; lower cohesion; add Buddy barking at tier 2; animals walking onto a bridge should proceed to its opposite side. These extend the current F-046 flock/Buddy behavior work and remain **Review**.

Implemented source: cohesion is 30% weaker; leading members reject backward centre pull while receiving missing forward flow from their own connected group. Direct dog steering is not doubled or overridden, and split flocks stay independent. New per-animal bridge intent commits sheep/cows through the deck to body-clear far-bank ground, with pause/reset and drone far-bank anchors. Bark now starts at tier 2; individual retrieval stays tier 3. Collision, purchase gates/costs and player-attended scoring are unchanged. Human/device play acceptance remains pending.


Verified publication: source `bf30342`, Pages `cf41bd1`; source CI [38857616495](https://github.com/novydhillon/Flock/actions/runs/38857616495) and native Pages [38857820963](https://github.com/novydhillon/Flock/actions/runs/38857820963) succeeded. All 17 live development files and canonical entry HTML match the tested build; all 18 unrelated Pages files remain unchanged. All 274 source tests and both build modes pass. See [publication evidence](QUALITY.md#verified-forward-flow-and-bridge-completion-publication). User gameplay/device acceptance remains pending; F-046 stays Review and the separate F-048 low-speed stutter report stays queued.
