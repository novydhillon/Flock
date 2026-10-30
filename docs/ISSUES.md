# FLOCK — Active issue tracker

## Static camera correction — 29 October 2026

F-TERRAIN-002 correction on feat/rolling-terrain: remove automatic vertical camera movement with terrain elevation. Accept when gameplay and landing cameras keep the same world height/view angle over hills and raised bridges, through pause and level replacement, while horizontal tracking and original scale remain coherent. Actor/deck/terrain heights are unchanged. High implementation, fresh medium review, focused/full checked builds and replacement dev verification are required; user sign-off remains pending.

## Elevated bridge scope — 29 October 2026

Novy additionally permits river bridges from elevated positions that match the bank elevation on both sides. F-TERRAIN-002–004 remain In progress while elevated crossings are integrated and validated. Where needed, extend the shared bridge span to reach raised banks and keep deck, rails, collision, navigation, routes and approach clearances coherent. Earlier field/grid checks describe the pre-elevated-bridge candidate and must be supplemented; no new source or dev publication is claimed.

## Riverbank relief clarification — 29 October 2026

For F-TERRAIN-002/003, Novy permits larger riverbank height differences except at bridges. The current high-effort candidate must allow raised, smoothly graded banks away from crossings while retaining gentle bridge approaches, coherent water and the overall 4.5m/30-degree bounds. Broad mandatory low shelves along every bank are superseded. Implementation, focused checks, fresh medium review and dev replacement are still in progress; earlier published builds do not contain this clarification.

Updated 29 October 2026 (America/Creston). Repository: `novydhillon/Flock`.

This file contains active work only. The fourteen P1 items and three follow-ups on `p1_gameplay_polish` were accepted on 25 October 2026 and moved in full to [Closed issues](ISSUES_CLOSED.md#p1-gameplay-and-follow-up-acceptance--25-october-2026). Clouds remain Deferred. Unimplemented bird, companion, UI and other queued work remain active; partial bird foundations in F-POLISH-001 do not close the broader bird plan.

F-ARCH-001 was accepted on 28 October 2026 and its complete record moved to [Closed issues](ISSUES_CLOSED.md#configuration-refactor-user-acceptance--28-october-2026). The user authorized its main source merge; F-AUDIO-003 remains Open.

## P2 UI acceptance — 28 October 2026

The 18 implemented UI, water and shadow items on `feat/p2-ui` are accepted and archived in [Closed issues](ISSUES_CLOSED.md#p2-ui-user-acceptance--28-october-2026). Historical Review/pending acceptance statements are superseded for this batch. Terrain work and unrelated open items retain their states.

## Tracker lifecycle and ownership

1. Read [AGENTS.md](../AGENTS.md), [development rules](DEVELOPMENT.md), current requirements and this tracker before implementation. Public level numbers are one-based.
2. Claim owner, feature branch, status and date. Preserve concurrent changes and separate source completion, publication and user acceptance. Use Open → In progress → Review → Done, with Blocked/Deferred where appropriate. A review score is not user sign-off.
3. When an item becomes **Done or Closed**, move its complete overview row and detailed section (requirements, acceptance criteria, owner/branch, evidence, remaining limitations and user sign-off) into [ISSUES_CLOSED.md](ISSUES_CLOSED.md) in the same connector commit; remove them from this active file. Move related completed execution/acceptance records too, preserving links and shared evidence. Record closure date and reason/acceptance without inventing missing historical dates.
4. Strike through every cell of closed overview rows and the detailed title after its ID in the archive. For reopening, move the row/details back here, remove strikethrough and record why and when. Do not duplicate the same issue in both overviews or reuse an ID.
5. Keep active mixed-work dependencies here; archive completed material without losing evidence required by remaining work. Preserve evidence files in `docs/validation/` and quality history. Update links to moved headings, regenerate HTML and run documentation checks before publication.
6. Use the **GitHub connector for all repository operations**: reading refs/files, comparing revisions, branches, commits, source publication, PRs, merges and Pages publication. Do not use shell `git` or `gh` commands or direct GitHub HTTP calls as alternatives. Local file editing, builds and checks may use shell tools. If a connector operation is unsupported or fails, report it and retain the prepared work; do not fall back to shell GitHub operations.
7. Track work here, not in GitHub Issues. Non-main development builds target `/Flock/dev/`; production main merge/root publication requires user authorization. Tracker-only changes do not need a game deployment.

Priority: P0 highest; P1 correctness/gameplay foundation; P2 planned features/polish; P3 broader validation/optimization; P4 later enhancements. Open items are unassigned unless explicitly claimed.

## Work overview

| ID | Priority | Type | Item | Status | Depends on |
|---|---|---|---|---|---|
| F-QA-CAMERA-001 | P2 | QA/camera | Add paused camera orbit controls | Open | QA menu and gameplay camera |
| F-BUTTERFLY-001 | P2 | Animation bug | Butterfly wings should flap instead of spinning | Open | Existing butterfly presentation |
| F-AUDIO-003 | P1 | Audio regression | Music stays silent on browser/app launch until audio is toggled off/on | Open | Accepted soundtrack; physical launch investigation |
| F-AUDIO-002 | P3 | Audio investigation | Soften existing saturated bolt voice stealing without delaying onset | Open | Existing six-call cap |
| F-COMP-004 | P2 | Animation | Clear attention and working intent | Open | F-061 accepted head/body motion; F-COMP-002 |
| F-COMP-005 | P2 | Animation/feedback | Bark pose and recovery gesture | Open | Existing actual Pip/Buddy bark events and feedback |
| F-COMP-006 | P2 | Animation | Distinct Pip and Buddy personalities | Open | F-061 accepted puppy proportions; existing Pip/Buddy hover poses; F-COMP-004 |
| F-COMP-008 | P2 | Animation/results | Brief shared arrival celebration | Open | F-COMP-006; existing full-completion/results flow |
| F-BIRD-009 | P2 | Behavior | Small social foraging groups | Open | F-BIRD-001; F-BIRD-004 |
| F-BIRD-010 | P2 | Animation | Ground hops and perched idle gestures | Open | F-BIRD-002; F-BIRD-003 |
| F-BIRD-011 | P2 | Behavior/audio | React to Pip and Buddy barking | Open | F-BIRD-004; F-BIRD-005 |
| F-BIRD-012 | P2 | Behavior | Occasional visits to the nest | Open | F-BIRD-003; F-BIRD-006 |
| F-BIRD-013 | P2 | Art/audio | Two or three recognizable bird varieties | Open | F-BIRD-002; F-BIRD-005 |
| F-BIRD-014 | P2 | Behavior | Gradual return after the meadow settles | Open | F-BIRD-003; F-BIRD-004; F-BIRD-009; F-BIRD-011 |
| F-BIRD-001 | P2 | Behavior | Bird states and seeded population | Open | — |
| F-BIRD-002 | P2 | Art/animation | Clay birds, flight, landing and peck animations | Open | F-BIRD-001 |
| F-BIRD-003 | P2 | World/perching | Ground, tree, fence and structure landing sites | Open | F-BIRD-001 |
| F-BIRD-004 | P2 | Behavior | Pip/Buddy avoidance and speed-sensitive livestock response | Open | F-BIRD-001; F-BIRD-003 |
| F-BIRD-005 | P2 | Audio | Perched chirping and quiet sitting | Open | F-BIRD-001; F-BIRD-003 |
| F-BIRD-006 | P2 | World/art | 10% per-level chance of a single tree nest | Open | F-BIRD-003 |
| F-BIRD-007 | P2 | Integration | Weather, lifecycle and mobile resource limits | Open | F-BIRD-002–006 |
| F-BIRD-008 | P2 | Validation | Regression, blind review and development acceptance | Open | F-BIRD-007 |
| F-008 | P1 | Art | Cloud visuals temporarily removed at user request | Deferred | No runtime clouds or cloud shadows |
| F-015 | P3 | Validation gap | Mobile GPU performance and transition stability | Open | Rendering batches |
| F-045 | P4 | Weather/water | Add rain impacts and splashes on water during heavy rain or stronger | Open | - |
| F-047 | P4 | Gameplay/companions/economy | Second Buddy after meadow 40 with independent leveling and max tier by meadow 70 | Open | F-046 |
| F-049 | P4 | QA/UI | Prevent automatic level dropdown focus and expansion when opening QA | Open | - |
| F-TERRAIN-001 | P3 | Environment/art | Rough pasture appearance on selected levels | Review | Existing clay grass and ground presentation |
| F-TERRAIN-002 | P2 | Terrain/navigation | Navigable undulating fields | Review | Existing world generation, navigation and actor presentation |
| F-TERRAIN-003 | P2 | World/structures | Fences and stone walls follow terrain undulations | Review | F-TERRAIN-002; existing fences, stone walls and gates |
| F-TERRAIN-004 | P2 | Terrain/water/weather | Lowland rivers and slope-aware rain pooling | Review | F-TERRAIN-002; F-TERRAIN-003; existing rivers, puddles and fixed weather |

## Acceptance criteria and planned work

### F-QA-CAMERA-001 — QA camera orbit controls

**Status:** Open. Owner: Unassigned.

**Branch:** `unassigned`

**User request — 29 October 2026:** Add a QA toggle that enables camera modification. When enabled, show a camera icon at the bottom left next to the gear button. Activating the icon pauses gameplay and allows touch dragging to orbit the camera around its existing target while maintaining a constant distance.

**Accept when:** Vertical dragging moves the camera smoothly along an arc from a 90-degree top-down view to a 0-degree view parallel to the ground, clamped to that range. Horizontal dragging rotates around the target continuously through 360 degrees in either direction. Horizontal rotation speed increases with finger distance from the center on a logarithmic scale, reaching a maximum of 60 degrees per second at the screen edge. The direction follows the drag direction. Clicking the camera icon again exits camera modification and returns to regular gameplay. Disabling camera modification in the QA menu turns off and removes the camera icon; if camera mode is active, exit it and return to regular gameplay. Confirm the toggle and icon work on supported screen sizes, gameplay stays paused during camera modification, and normal controls and pause/resume behavior work when leaving the mode.

**Scope:** Tracker addition only; implementation and device validation remain pending.


### F-BUTTERFLY-001 — Butterfly wings should flap instead of spinning

**Status:** Open. Owner: Unassigned.

**Branch:** `unassigned`

**User report — 29 October 2026:** Butterfly wings currently appear to spin. They should flap.

**Accept when:** Wings visibly flap back and forth around their attachment to the body, with bounded alternating motion rather than continuous full rotation. Verify at normal gameplay zoom and during butterfly flight, preserving existing movement and pause/resume behavior.

**Scope:** Tracker addition only; animation fix and rendered verification remain pending.


### F-AUDIO-003 — Music requires audio off/on after browser or app launch

**Status:** Open. Owner: Unassigned.

**Branch:** `unassigned`

**User report — 26 October 2026:** Music does not start automatically on app launch. The user must toggle audio off and on to start it. This persists in the browser and an iOS Home Screen launch after the attempted launch-recovery build. Workaround: turn audio off, then on.

**Accept when:** reproduce and diagnose the remaining launch failure on the affected browser and iOS Home Screen path; enabled music begins at the earliest browser-permitted activation without requiring an off/on toggle; saved mute, foreground/background handling, existing playback and bounded resources remain intact. Record the actual browser/device and audible result. Browser autoplay policy may require interaction, but neither that policy nor passing mock tests establishes the cause or resolution of this reported defect.

**26 October 2026:** Logged at Novy's explicit request while accepting the soundtrack feature for main merge. Prior automated activation tests, 9.5/10 source review, CI and live asset hashes did not establish physical launch resolution. This issue stays Open independently of F-MUSIC-001 acceptance. No new runtime fix is included in the merge/logging task.


### F-008 — Clouds temporarily deferred

**Current decision, 15 October 2026 at 11:22 America/Vancouver:** Novy requested removing clouds for now because they are not working as intended. Disable all visible cloud puffs and their associated ground shadows. Rain, fixed per-level weather, sky/fog/daylight, lightning/thunder, wet ground and wildlife remain active.

**Status:** Deferred. The renderer no longer instantiates or updates `Atmosphere`; its source and unit tests are retained as dormant reference for future work. No cloud texture, billboard or shadow resource is allocated by normal game rendering. Earlier cloud appearance/opacity criteria and review evidence are historical, not current runtime requirements. Do not re-enable clouds as part of routine weather maintenance.

### F-015 — Performance verification gap

Real phone GPU frame rate and level-transition memory stability remain unmeasured. The existing bounded submission/resource tests are useful but do not establish FPS. Historical production JavaScript was roughly **576 kB / 155 kB gzip**, with an advisory Vite chunk-size warning; this is an optimization consideration, not a confirmed gameplay bug.

**Accept when:** measure normal/large/split herds, later expansive worlds, weather/cloud effects and repeated transitions on representative phones. Record frame-time distribution, load behavior and resource growth. Set a device-specific performance target before judging success.

### F-045 - Add rain impacts and splashes on water during heavy rain or stronger (P4)

**Status:** Open, queued only; unassigned.

Add visible raindrop impacts and splashes on rivers, streams, and other water surfaces when heavy rain or stronger rain is falling.

Acceptance criteria:
- Rivers, streams, and other water surfaces show raindrop impacts/splashes during heavy rain and stronger rainfall, including thunderstorms.
- The effect is active only at heavy rain intensity or above.

**Migration source:** [GitHub #5](https://github.com/novydhillon/Flock/issues/5); moved to this document without implementing or completing the request.


### F-047 - Second Buddy dog with independent progression (P4)

**Status:** Open, queued only; unassigned.

**Requirement:** after meadow level 40, make a second Buddy dog available with its own independent leveling. Its purchase and upgrade costs should reflect the later stage of the game. Its maximum upgrade tier should be available by meadow level 70.

**Accept when:**
- A second Buddy becomes available after meadow 40.
- Each Buddy has its own saved upgrade level and can be upgraded independently.
- Purchase and upgrade prices are balanced for later-game bolt earnings; exact prices remain to be tuned.
- The second Buddy can reach its maximum upgrade tier by meadow 70, with unlock gates and costs supporting that progression.

**Scope:** queued feature request only; no second Buddy or pricing changes implemented by this tracker update. Coordinate with F-046 Buddy behavior tiers.

### F-049 - Keep the QA level dropdown unfocused on menu opening (P4)

**Status:** Open, queued only; unassigned.

**Reported behavior:** Opening the QA menu initially focuses or activates the level dropdown and shows the full level list.

**Requirement:** Open the QA menu without automatically focusing, selecting or expanding the level dropdown. Keep the list collapsed until the player deliberately activates it.

**Accept when:**
- Opening the QA menu does not automatically focus or activate the level dropdown or show its full list.
- The level dropdown opens normally when deliberately selected, and the current level value is preserved.
- Initial focus goes to the QA menu container or a suitable non-dropdown control.

**Scope:** queued QA usability fix only; no implementation or acceptance claimed.


## Bird behavior feature plan — 18 October 2026 (America/Creston)

Planning requested by Novy; **all F-BIRD items are Open, unassigned and not implemented**. Planning owner: Codex; documentation branch: `plan/bird-behaviour`, based on main `5fd8cf5`. Runtime implementation branch: to be claimed from current main when scheduled. Bird-scoped IDs avoid collisions with concurrently assigned numeric F-IDs. Proposed priority: P2 for this ambient-life feature. This request authorizes planning/tracker updates; no runtime work or game deployment is included.

**Existing foundation:** `src/wildlife.js` already supplies seeded, area-scaled birds (currently capped at six), threat response and weather sheltering. `src/nature.js` renders continuously airborne birds; `src/audio.js` schedules generic ambient calls. Extend these systems rather than introduce a second population/audio loop. New ambient birds do not affect herding, collision admission, scoring or progression.

**Requested behavior:** birds fly, land and peck for food on the ground, land in trees and chirp, and perch on fences/other structures to chirp or sit quietly. Ground birds fly away from Pip and Buddy. Quickly approaching livestock also cause takeoff; grazing or slowly moving livestock alone do not. Each level has a random 10% chance of one nest in one tree.

**Planning assumptions and tunable decisions:** interpret the nest probability as one Bernoulli roll per level, not one roll per tree: zero or one nest, never multiple nests. Select one eligible tree only on success; levels without trees have no nest. Use a dedicated seeded random stream so restart is stable and existing terrain/herd generation is unchanged. Nests are decorative; eggs, chicks, breeding and nest defense are outside the requested scope. Retain current population caps initially. Threat radii, fast-livestock speed threshold, approach prediction, quiet/chirp intervals and ground/perch dwell times are implementation tuning, not user-specified numbers. Existing storm exclusion and heavy-rain shelter policy still apply; a decorative nest may remain in storm levels.

**Implementation order:** first define states and landing-site contracts (001/003); then integrate animated transitions (002) and threat handling (004). Audio (005) and nest decoration (006) can follow independently with disjoint ownership. Add social groups (009), idle gestures (010), bark response (011), nest visits (012), bird varieties (013) and gradual return (014) on their listed foundations. Prioritize 009/010/011 within these additions. Integrate lifecycle/weather/performance (007), then validate and review the complete scope (008). Compare simple discrete takeoff/landing phases with a full flight physics controller; prefer bounded state-driven curved trajectories and reserved landing anchors for this ambient feature. Use terrain/obstacle clearance along the flight path rather than ground navigation for flying birds.

### F-BIRD-001 — Bird states and seeded population (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** one authoritative bird state machine supports flight, approach/landing, ground idle/pecking, perched quiet/chirp and takeoff/flee. States have bounded randomized dwell times and legal transitions, with interrupted landing safely returning to flight. Population and behavior RNG are reproducible without changing existing level/herd streams; no duplicate legacy bird population remains. Threats take precedence over ground pecking. State must be testable separately from rendering and audio.

### F-BIRD-002 — Clay birds and animated transitions (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** birds match the current handmade clay style and remain legible at normal gameplay zoom. Flight has visible wing beats; takeoff gains height and landing decelerates to the actual surface, with wings settling when grounded/perched. Ground pecking visibly lowers the head/beak toward food with pauses. Feet align with the support surface, and silhouettes do not hover, sink or snap between flight and rest. Pause freezes animation. Ordinary phone-scale appearance requires rendered user review.

### F-BIRD-003 — Safe ground and elevated landing sites (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** birds find reachable dry ground for pecking, usable tree branches, fence tops and explicitly supported structure tops (initially stone-wall tops and barn roof edges where present). Support positions use actual world transforms/heights, including rotated/scaled trees and fences. Birds do not land in water, inside trunks/foliage/solid structures, on unsupported air, or through roofs. Air trajectories clear obstacles; invalid/occupied anchors are skipped with bounded search and a safe continue-flying fallback. Reserve elevated anchors to prevent overlapping perched birds. Opening a supporting gate or otherwise losing a support causes safe takeoff rather than floating. Ground birds do not block gameplay actors.

### F-BIRD-004 — Conditional ground-bird fleeing (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** nearby Pip or active Buddy triggers ground-bird takeoff and flight away from the threat, including during pecking/ground landing. Nearby livestock trigger takeoff only when moving quickly toward the bird; grazing or slow movement alone leaves the bird grounded. Use actual velocity and closing direction/proximity so distant, stationary or fast-moving-away livestock do not falsely startle birds. Dog threats override calm livestock; multiple threats produce a safe escape direction. Cooldown/hysteresis prevents immediate relanding beside a threat or repeated takeoff/landing flicker. Verify sheep and all four cow sizes; preserve existing livestock/companion behavior. Elevated birds also respond to barking under F-BIRD-011; other elevated-perch proximity reactions remain unspecified.

### F-BIRD-005 — Perched chirping and quiet sitting (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** tree-perched birds chirp intermittently with natural quiet gaps. Fence/structure birds can chirp or sit quietly. Schedule calls from actual visible, eligible perched birds, with distance-aware audibility and bounded concurrent voices; reconcile the existing generic ambient bird loop to avoid duplicate/orphan calls. Honor sound settings, pause/backgrounding, weather shelter and restart/level disposal. Enabling audio after interaction must not replay a backlog. Source scheduling checks and a listening check are separate evidence.

### F-BIRD-006 — Rare tree nest (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** a dedicated per-level seeded roll succeeds with probability 0.10 and selects exactly one eligible tree; failure or no trees yields zero nests. The rule is independent of tree count and does not make a roll for every tree. Restarting the same level preserves nest presence/location. A nest fits the clay style, rests in a supported branch fork, respects tree size/rotation and can be seen from a useful camera angle without changing the tree mesh or route clearance. Tests cover roll boundaries, zero/one/many trees, restart stability and unchanged original world/herd generation. A random sample is not expected to contain exactly 10% nests.

### F-BIRD-007 — Weather, lifecycle and resource integration (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** fixed storms contain no birds and no bird calls; current light-rain activity/heavy-weather shelter is preserved. All bird states freeze on pause and reset cleanly on restart, level jump, results and disposal, with no stale perch reservations/audio. Shared geometry/materials, capped actors/voices, bounded landing searches and sensible culling keep cost measurable. Offscreen birds and nests do not leak resources. Confirm wildlife additions do not change gameplay collisions, saved progress, delivery or other fauna. Record source resource checks separately from measured phone FPS.

### F-BIRD-008 — Validation, blind review and dev sign-off (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** meaningful state/trajectory/perch/threat/nest/audio/weather tests pass along with full regressions, both build/artifact modes and generated documentation checks. Exercise Pip and Buddy separately, grazing/slow/fast approaching livestock, fast receding livestock, interrupted landings, multiple threats, no valid perch, varied trees/fences/structures, weather and pause/restart. Use independent implementation ownership for substantial work and a fresh blind reviewer under AGENTS.md; resolve blockers and meet the standing 9/10 threshold. Record actual models/effort and validation limits. After development publication is authorized, publish only to `/Flock/dev/` and verify CI, native Pages and live asset hashes. Leave implemented issues in Review for Novy's phone appearance/motion/listening sign-off; only then mark Done and strike through closed rows/headings. Production merge/publication requires separate user authorization.

**Planning evidence:** inspected current main tracker, requirements, development rules and existing bird rendering/behavior/audio entry points. Routine documentation-only plan; no runtime blind review or performance claim. Generated documentation checks are recorded with the documentation commit. Remaining checks: all implementation, runtime tests, rendered/listening review and publication above remain future work.


## Bird feature additions — 18 October 2026, 21:47 America/Creston

Novy requested adding all six suggested features to the tracker. F-BIRD-009–014 are P2, implemented and in Review on `feat/p2-ui` as of 28 October 2026. They extend the original plan and share F-BIRD-007 lifecycle/resource integration and F-BIRD-008 regression, blind review and user acceptance gates. Include group-response timing, gesture interruption, muted bark response, nest-absent levels, seeded varieties and safe delayed return in that validation scope. Birds remain ambient wildlife without feeding chores or rewards.

### F-BIRD-009 — Small social foraging groups (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on:** F-BIRD-001; F-BIRD-004.

**Accept when:** Two or three birds can forage together when the population permits. A startled bird can cause nearby group members to take flight after small varied delays, without synchronizing every bird on the level. Grouping stays within the existing population cap, allows separation, and never overrides safe escape paths, landing reservations or weather shelter.

### F-BIRD-010 — Ground hops and perched idle gestures (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on:** F-BIRD-002; F-BIRD-003.

**Accept when:** Ground birds make occasional short hops between pecks. Perched birds sometimes tilt their heads, preen or ruffle feathers, with varied timing and quiet rests. Feet remain supported, poses remain readable at ordinary gameplay zoom, and threats interrupt gestures immediately. Pause freezes all motion; shared animation resources remain bounded.

### F-BIRD-011 — React to Pip and Buddy barking (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on:** F-BIRD-004; F-BIRD-005.

**Accept when:** Actual bark events from either Pip or active Buddy startle nearby grounded or perched birds into safe flight away from the bark source. Use a tunable finite response radius and existing bark event timing rather than audio playback or a new global polling loop. A group response may follow F-BIRD-009; airborne birds do not repeatedly restart takeoff. Mute does not disable behavioral response, paused play does not trigger it, and normal bark strength, cooldown and livestock effects are unchanged.

### F-BIRD-012 — Occasional visits to the nest (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on:** F-BIRD-003; F-BIRD-006.

**Accept when:** On a level with a nest, an existing bird can occasionally approach it, land safely and settle briefly before leaving. Visits use reserved nest support and natural intervals, yield to threats and weather shelter, and do not spawn extra birds. Levels without nests need no special fallback behavior. Eggs, chicks, breeding, nest defense and player chores remain outside scope.

### F-BIRD-013 — Two or three recognizable bird varieties (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on:** F-BIRD-002; F-BIRD-005.

**Accept when:** Provide two or three stylized bird varieties with distinguishable colors and calls while sharing core geometry/animations where practical. Choose varieties with stable seeded variation; keep the total population cap unchanged. Each remains recognizable in the clay art style at normal phone zoom, with calls balanced against music, bark and livestock audio. This is ambient variety, without collection objectives or progression rewards.

### F-BIRD-014 — Gradual return after the meadow settles (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on:** F-BIRD-003; F-BIRD-004; F-BIRD-009; F-BIRD-011.

**Accept when:** After Pip, Buddy and quickly approaching livestock leave an area, birds can gradually return to safe ground and resume foraging. Require a tunable clear interval and recheck threats before landing; stagger returns so the meadow settles naturally. Calm or grazing livestock do not prevent return. Repeated barking or a renewed threat postpones landing without rapid oscillation. Returns use existing birds, honor weather shelter and cannot teleport or add population.

**Documentation handoff:** the original planning commit is `1fbfe08`; remote publication was blocked by automatic approval review, which required explicit authorization for `novydhillon/Flock`. This follow-up updates the same local planning branch; no new push is attempted without that authorization. Documentation generation/checks cover this addition; runtime implementation and acceptance remain future work.


## Pip and Buddy teamwork and personality plan — 18 October 2026, 21:52 America/Creston

**Historical planning record:** the Open/unimplemented status statements in this planning introduction are superseded by the 19 October execution records, current overview and individual issue details. F-COMP-001/002/003/007/009/010 are now Done in [Closed issues](ISSUES_CLOSED.md), accepted 22 October 2026; F-COMP-004/005/006/008 remain Open.

Novy requested tracking all eight suggested improvements. **F-COMP-001–008 are P2, implemented and in Review on `feat/p2-ui` as of 28 October 2026.** Planning owner: Codex; documentation branch: existing local `plan/bird-behaviour`. Claim runtime owner/feature branch from current main when scheduled. Scoped companion IDs avoid concurrent numeric-ID collisions. Prioritize working space (001), useful herding positions (002) and progress-aware obstacle recovery (003).

Extend accepted F-046/F-048/F-061 behavior and Pip presentation rather than reopening completed fixes. No second Buddy, upgrade pricing, new control scheme, automated Pip navigation or new gameplay resource is included. This request adds tracker scope only; runtime implementation, review and publication remain future work.

### F-COMP-004 — Clear attention and working intent (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on / preserve:** F-061 accepted head/body motion; F-COMP-002.

**Accept when:** Buddy looks toward the actual animal/group he is helping, including during task transitions, with smooth bounded head motion. Idle Pip can glance at nearby livestock without changing player-controlled movement or body heading. Existing turn-directed head motion takes priority during movement; avoid snapping, excessive twisting and gaze flicker between equally close animals. Restore neutral attention when no eligible target exists; reset/freeze correctly on restart/pause.

### F-COMP-005 — Bark pose and recovery gesture (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on / preserve:** Existing actual Pip/Buddy bark events and feedback.

**Accept when:** Briefly accompany each actual Pip/Buddy bark with a readable pose and a subtle recovery gesture. The bark gameplay event remains immediate; preparation animation never delays or creates an additional bark. Preserve cooldowns, strength, double-tap/keyboard inputs, autonomous Buddy eligibility, red-tail/ring feedback and independent cooldown ownership. Animate from the event even when muted, handle repeated permitted barks cleanly, and avoid stuck poses on pause/restart. Coordinate bird bark reactions with F-BIRD-011.

### F-COMP-006 — Distinct Pip and Buddy personalities (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on / preserve:** F-061 accepted puppy proportions; existing Pip/Buddy hover poses; F-COMP-004.

**Accept when:** Pip reads as attentive and purposeful; Buddy as eager and puppy-like through subtle head tilts, Buddy ear gestures and occasional small celebratory motions. Keep accepted reference appearances, relative scales, hover, turn lean, acceleration/braking lean and ground glow. Vary idle timing; task, movement and bark poses take priority. Gestures do not alter navigation, input, rewards or animal pressure, and remain readable at ordinary phone zoom with bounded rendering cost.

### F-COMP-008 — Brief shared arrival celebration (P2)

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Depends on / preserve:** F-COMP-006; existing full-completion/results flow.

**Accept when:** After a successful final delivery, Pip and an active Buddy briefly acknowledge each other with a look or small playful motion. Do not play for partial timeout, an absent/inactive Buddy or duplicate completion events. The celebration is nonblocking: results and Continue remain available immediately, and user input/next level cancels it safely. Preserve finalized delivery counts, rewards and saved progress; no unscripted gameplay movement or repeated celebration after pause/resume/restart.

**Shared validation and acceptance:** test all Buddy tiers, absent/inactive Buddy, split/merged/stopped/reversing flocks, all cow sizes, tree detours, narrow gates, rotated bridges, last-animal passage, stray retrieval, simultaneous barks and transitions among work/standby/results. Verify controller responsiveness, low-speed continuity, physical collisions, Pip-at-goal scoring, bark event ownership, pause/background/resume/restart and clean task/animation state. Resolve pose priorities across attention, idle, bark and celebration before integration. Follow AGENTS.md independent ownership/blind gauntlet for substantial runtime work, meaningful focused/full regressions and both artifact-mode checks. Record source evidence separately from phone motion, touch usability, listening and FPS. Leave implementations in Review until Novy's sign-off. Authorized non-main publication targets `/Flock/dev/`; production merge/publication requires separate authorization.

**Planning handoff:** routine documentation-only additions with generated documentation/link/behavior checks; no runtime implementation, performance claim or runtime blind review. Remote publication remains blocked by the previously reported automatic approval rejection requiring explicit push authorization for `novydhillon/Flock`; no new push is attempted for this local commit.


## Tracker archive maintenance — 18 October 2026, 22:04 America/Creston

Moved 48 closed issues and historical acceptance/execution records to [ISSUES_CLOSED.md](ISSUES_CLOSED.md); 59 active items remain, including all 42 new planning items. Current overview statuses and explicit user acceptance control migration; older Review wording is retained only as historical evidence. F-065 had a signed-off detail without an overview row; its closed row is included in the archive. No Open, Review or Deferred issue was closed by this reorganization. Archived source paragraphs are preserved; moved-heading links are updated.

Root AGENTS.md and DEVELOPMENT.md now require connector-only repository operations and same-commit archival on closure. Shell remains available for local files/builds/checks. The docs generator includes the archive in navigation/search; checks enforce active/closed separation, unique scoped IDs, detail/overview coverage and archive strikethrough. No runtime or Pages changes. Independent documentation review and final validation are recorded in QUALITY.md.


## Main integration — 18 October 2026, 22:17 America/Creston

Requested integration of main `d2484b9` into planning branch `plan/bird-behaviour` (`6ca2b35`). Main contributes five commits since shared base `5fd8cf5`: accepted surface-aware grazing, its tests and development/production evidence, and a CI branch-trigger change. Runtime, tests, workflow and new validation manifests are imported without competing edits. Shared development/requirements/quality additions are retained alongside this branch's planning/archive rules; generated HTML is rebuilt rather than merged. F-066 is Done by Novy's 22:10 approval and is added directly to [Closed issues](ISSUES_CLOSED.md); 59 active items and all 42 new planning items remain unchanged. Archive now contains 49 closed items.

Preserve connector-only repository operations, same-commit archive-on-closure and all earlier planning scope/exclusions. This integrates source into the planning branch only; no main merge or game deployment is requested. Validation and independent integration review are recorded in QUALITY.md. Runtime is identical to the imported main revision; no new bird/herd/companion/UI features are implemented by this merge.








## Delivery fallback integration — 19 October 2026

User requested merging fallback changes to main and integrating main into buddy_behaviour. Main PR #18 merged at c35c466; this integration preserves Buddy runtime/tests and all branch-specific tracker/evidence records, resolves append conflicts and regenerates HTML. No Pages publication is included.

## Buddy user acceptance — 22 October 2026

Novy accepted the development build with “Looks good. Merge to main and close the tickets.” F-COMP-001/002/003/007/009/010 are Done, with their complete details and publication/integration evidence moved to [Closed issues](ISSUES_CLOSED.md#buddy-user-acceptance--22-october-2026). F-COMP-004/005/006/008 and unrelated work retain their current states; F-OPS-004 is not part of this sign-off. Accepted dev source `17f648d`, Pages `45110fa`; source branch `buddy_behaviour` (documentation head before closure `15666f2`). Main merge is authorized, but no production deployment was requested. Historical planning statements are retained as history, not current status.




## Accepted P1 branch — 25 October 2026

The fourteen P1 items and F-POLISH-001/002/003 were accepted by Novy and archived in [Closed issues](ISSUES_CLOSED.md#p1-gameplay-and-follow-up-acceptance--25-october-2026). All other Open/Deferred work retains its state. This updates source acceptance and authorizes main merge only, with no production deployment.

### F-AUDIO-002 — Existing bolt voice-steal hard-cut risk

**Status:** In progress. Owner: Codex rendering team. Branch: not yet claimed.

**Accept when:** Investigate a short release for a livestock voice replaced at the six-call cap, avoiding potential discontinuity while retaining immediate bolt onset, bounded audible/resource ownership, mute/pause/dispose cleanup and no delayed catch-up. Source inspection identifies possible risk, not an observed/listening-confirmed defect.

**25 October provenance:** Independent F-AUDIO-001 review observed existing immediate `_releaseAmbience` stop/disconnect during saturated bolt replacement. Verified unchanged in approved main `1386c7a` and the new patch. Root explicitly keeps this outside current tuning scope and tracks it separately; no implementation or audible click claim.


## Rough pasture and rolling terrain — 25 October 2026

Reference photos supplied by Novy: picture 1 `IMG_8450.webp` and picture 2 `IMG_8451.jpeg` guide rough tufted pasture; `IMG_8454.jpeg`, `IMG_8453.jpeg` and `IMG_8452.webp` guide rolling fields, low valleys and terrain-following boundaries. Translate these landscape references into the existing claymation style. References are visual direction, not a request to reproduce photographic textures or watermarks.

All four items are Open and unassigned. Rough-ground appearance is P3 polish; navigable relief, aligned boundaries and terrain-aware water are linked P2 features that must be coordinated before a rolling-terrain release. This adds planned work only; no terrain, physics, water or game deployment changes are implemented.

### F-TERRAIN-001 — Rough pasture appearance on selected levels (P3)

**Status:** Review. Owner: Codex terrain team.

**Branch:** `feat/rolling-terrain`.

**Requirement:** Give some levels a rougher ground appearance inspired by reference pictures 1 and 2: uneven tufted grass, patchy pasture and varied natural ground coverage, retaining the game's claymation style.

**Depends on / preserve:** Existing clay grass and ground presentation.

**Accept when:** Selected levels visibly differ from smoother meadows through bounded tufts, patchiness and ground variation, without obscuring animals or routes. Preserve navigable clearance, collision and mobile performance. Do not apply the rough look to every level or invent a user-approved frequency. Coordinate physical height variation with F-TERRAIN-002; visual roughness alone must not silently add blockers.

### F-TERRAIN-002 — Navigable undulating fields (P2)

**Status:** Review. Owner: Codex terrain team.

**Branch:** `feat/rolling-terrain`.

**Requirement:** Add rolling, undulating ground to fields that Pip, Buddy and livestock can navigate over.

**Depends on / preserve:** Existing world generation, navigation and actor presentation.

**Accept when:** Generate continuous terrain heights with traversable rolling slopes, safe spawn/goal areas and connected routes. Keep simulation, rendering and navigation consistent about surface elevation; livestock stay grounded and Pip/Buddy retain appropriate hover clearance without clipping, floating or becoming stuck. Paths, bridge landings and goal approaches join the terrain cleanly. Verify sheep, all cow sizes, helpers, split herds and terrain edges across seeds. Agree on height, slope limits and which levels use relief before implementation; do not require jumping or change controls.

### F-TERRAIN-003 — Fences and stone walls follow terrain undulations (P2)

**Status:** Review. Owner: Codex terrain team.

**Branch:** `feat/rolling-terrain`.

**Requirement:** Make fences and stone walls follow the undulating ground instead of remaining on a flat plane.

**Depends on / preserve:** F-TERRAIN-002; existing fences, stone walls and gates.

**Accept when:** Fence posts, rails, stone-wall bases and associated collision follow local terrain with no floating spans, buried sections or unintended gaps. Gates, switch panels, openings and traversable clearances remain usable from both sides on slopes. Preserve the accepted wall appearance, gate states and navigation connectivity. Test changing grades, corners, boundaries and crossings rather than only one straight slope.

### F-TERRAIN-004 — Lowland rivers and slope-aware rain pooling (P2)

**Status:** Review. Owner: Codex terrain team.

**Branch:** `feat/rolling-terrain`.

**Requirement:** Route rivers and water through low areas so they do not run uphill. Large rain pools must not form on hillsides or other substantial grades.

**Depends on / preserve:** F-TERRAIN-002; F-TERRAIN-003; existing rivers, puddles and fixed weather.

**Accept when:** Generate watercourses with coherent downstream elevation: flowing river surfaces and channels follow low terrain and do not climb uphill. Standing water has level surfaces in suitable basins. Restrict large rain puddles/pools to sufficiently flat low areas or depressions; reject or limit them on significant slopes and hillsides without floating water sheets or uphill edges. Keep banks, crossings, bridge heights and navigation coherent. Define slope thresholds, drainage/placement rules and pooling limits before implementation; wet ground or small splashes may still appear on slopes. Preserve weather behavior and bounded mobile rendering/resource costs.

## Water vegetation acceptance — 29 October 2026

Novy accepted `feat/water-vegetation` with “Looks good. Merge to main and close any tickets.” F-WATER-002 and F-WATER-003 are Done; complete requirements, correction history and validation records moved to [Closed issues](ISSUES_CLOSED.md#water-vegetation-user-acceptance--29-october-2026). Source revision `d2bae96da0ed1b59f1d389616b64a0b53e45842c` is accepted for main merge. Unrelated open work, including F-BUTTERFLY-001, remains active. This authorizes source merge, not production publication.

## Rolling terrain execution — 29 October 2026

F-TERRAIN-001–004 are claimed on `feat/rolling-terrain`, based on main `3c656ac2d590e0fea58cc02cc47a5963d0cfe0e4`. This supersedes the older unassigned and `feat/p2-ui` ownership statements for terrain only. Implementation uses the session model at high reasoning; independent review uses medium reasoning as explicitly requested.

**Agreed design:** up to 1.5 world units of relief with slopes capped at 12 degrees, on a seeded selection of public levels after level 5. Terrain transitions must be smooth, with no visible triangulation. Spawn areas may lie on any traversable grade. Goals and bridges may have slight slopes; neither requires a perfectly flat pad. Large rain pools require low terrain and grades below 3 degrees; rivers follow coherent downhill channels. Rough pasture uses a separate seeded selection and retains navigable clearance. Frequency and detailed visual tuning are provisional implementation settings, not a user-approved percentage.

**State:** implementation in progress. Source review, automated checks and rendered/device acceptance remain separate; no deployment or main merge requested.

## Rolling terrain source completion — 29 October 2026

F-TERRAIN-001–004 are implemented on `feat/rolling-terrain` and move to Review, awaiting Novy's rendered/playtest sign-off. This supersedes earlier implementation-in-progress and unassigned terrain statements. Smooth analytic rolling support, independently selected rough pasture, graded barriers/structures/actors, downhill channels and horizontal terrain-clipped lowland pools are implemented with documented bounds. Spawn areas retain their terrain grade; goals and bridges may slope gently. Bark feedback, flowers, water rocks/wakes, guidance and hover clearance share elevation contracts.

High-effort implementation; medium independent source reviews scored 9/10 and then 9.2/10, with no outstanding blocker after corrections. Final full regression: 579/579; 113 focused review checks; 8/8 targeted terrain-view checks after the final behavior-preserving cleanup. Release/development artifact checks and documentation checks are recorded in [QUALITY.md](QUALITY.md). Source publication is separate from deployment and user acceptance. No Pages publication or main merge requested.

**Remaining checks:** actual WebGL smooth appearance/no visible triangulation, clay pasture legibility, phone touch/gameplay and native FPS remain unverified because local Chromium startup was blocked. F-015 remains Open: public-level-100 mocked setup measured roughly 2.4 seconds slower with rolling terrain after optimization, and submitted geometry increased. This is a known setup/workload increase, not a measured phone-FPS verdict.

## Terrain visual correction — 29 October 2026

Novy's dev screenshot IMG_8476.jpeg rejects the current visual result: play area reads flat, and rough patches read as flat color with sparse dark blades. F-TERRAIN-001/002 return to In progress on `feat/rolling-terrain`; earlier source scores do not establish appearance acceptance. Increase perceptible smooth relief within the agreed 1.5-unit/12-degree limits; replace polygon-only rough spots with dense tangible overgrown grass and seeded boulders/outcroppings, preserving route/body clearance and bounded resources. Rocks that block actors require shared physical representation. Existing dev deployment source1212bd6/Pages2d42e24 verified35livefiles; this feedback requests correction, not acceptance.

## Terrain visual correction candidate complete — 29 October 2026

F-TERRAIN-001/002 return to Review on `feat/rolling-terrain` after screenshot-driven correction: stronger actual rolling terrain, dimensional dense grass without colored discs/double tint, and physical seeded boulders. Shared pasture config and actual rendered-ground pool clipping are integrated. High implementation / fresh medium independent source review9.1/10; no confirmed source defect or material blocker remains. Rendered phone appearance and FPS still need Novy's playtest; no source score is visual acceptance. Updated dev publication follows successful checked build and source CI, separately from main/production.


## Flat meadow black-ground regression — 29 October 2026

F-TERRAIN-002 remains Review on `feat/rolling-terrain`, owner Codex. Screenshot IMG_8478.jpeg reports black grass on public levels 1–5 while roads and props remain visible. **Accept when:** every mesh using the shared vertex-colored grass material supplies a complete RGB color attribute; flat ground and angular playable overlays use neutral white, rolling ground retains its smooth height tint, and rolling-to-flat level replacement preserves this shader contract. Add actual scene regressions covering all first five levels, a later angular flat meadow and repeated level switches. High implementation and a fresh medium blind review apply; keep existing hill dimensions and limits unchanged. Checked dev publication is authorized; visual/device confirmation and user acceptance remain separate.

## Expanded rolling-terrain limits — 29 October 2026

Novy explicitly authorizes up to30-degree slopes and4.5m total height difference in the playable area, superseding the earlier12-degree/1.5-unit limits. This changes the actual generated terrain as well as its supported bounds; it is not approval to claim a larger hill from configuration alone. Retain smooth slope transitions/no visible triangulation, grounded livestock and correct hover clearance, terrain-following fences/gates/structures, safe routes and coherent downhill rivers/level lowland pools. Large standing pools still require grades below3degrees. Keep firstfivelevels flat unless separately requested. Blackflatground vertex-color regression is part of this same candidate. Previous source reviews/builds of the lowerrelief terrain do not validate the expanded scope; rerun focused/full checks and freshmediumreview, with high implementation. New visual/phoneacceptance remains pending.

F-TERRAIN-002–004 are In progress for expanded terrain integration on `feat/rolling-terrain`; F-TERRAIN-001 remains Review for the existing dimensional pasture. Do not close on source review.


## Expanded terrain source review — 29 October 2026

F-TERRAIN-002–004 return to Review after higher relief/banks, elevated crossings, full-width plank correction and black-flat-grass regression integration. Public6 demonstrates rolling hills and elevated crossings; public100 is a later example. Fresh independent medium review9.2/10 has no confirmed defect and73/73 focused checks. Full checked build passes; exact counts and deployment evidence are recorded in QUALITY and the publication manifest. This supersedes earlier In-progress scope notes without implying user/device acceptance. New dev publication remains a separate gate until its pinned source CI, native Pages run and live emitted-file hashes pass.


## Fixed-height camera correction reviewed — 29 October 2026

F-TERRAIN-002 remains Review on feat/rolling-terrain after removing terrain elevation from camera initialization/following. Fixed world-height and look-target behavior cover gameplay, preview, rolling showcase, restart and level replacement; original scale, angle and horizontal movement are retained. Actor and hover-glow support remain terrain-following.6/6 focused renderer cases and593/593 full regressions pass; fresh medium blind review9/10 has no confirmed blocker. This supersedes the previous elevation-following camera implementation. Dev publication and physical-device acceptance are separate milestones.

