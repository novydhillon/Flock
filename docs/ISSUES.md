# FLOCK — Active issue tracker

Updated 19 October 2026 (America/Creston). Repository: `novydhillon/Flock`.

This file contains Open, In progress, Review, Blocked and Deferred work only. Completed issues, acceptance records and historical execution evidence live in [Closed issues](ISSUES_CLOSED.md). References to a closed ID below are dependencies, not reopened issues. The 42 new bird/herd/companion/UI planning items remain Open.

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
| F-UI-001 | P2 | Gameplay UI | Clear bark cooldown-to-ready feedback | Open | Existing Woof/cooldown UI; coordinate F-050 |
| F-UI-002 | P2 | Gameplay UI | Distinct livestock states on the minimap | Open | Accepted top-center minimap; existing delivery/flock state |
| F-UI-003 | P2 | Workshop UI | Current-to-next upgrade benefits and previews | Open | Existing tier availability/costs; F-050 descriptions |
| F-UI-004 | P2 | Loading | Clay meadow loading vignette | Open | Current loading overlay; F-UI-005/006 |
| F-UI-005 | P2 | Loading | Honest initialization progress | Open | Actual asset/renderer initialization tasks |
| F-UI-006 | P2 | Loading | Smooth reveal of the ready meadow | Open | F-UI-005; existing scene initialization |
| F-UI-007 | P2 | Loading/recovery | Retry and clear loading-error recovery | Open | Initialization/error handling; F-UI-005 |
| F-UI-008 | P2 | Landing | Progress-aware Start or Continue action | Open | Saved campaign progression; existing begin/resume behavior |
| F-UI-009 | P2 | Landing | Living showcase meadow | Open | Existing intro simulation; bird/herd/companion future features when available |
| F-UI-010 | P2 | Landing/settings | Move full-game reset out of the Play area | Open | Existing reset confirmation; F-UI-011 |
| F-UI-011 | P2 | Landing/navigation | Clear meadow selector with remembered browsing position | Open | Existing unlocked-level picker and saved progress |
| F-UI-012 | P2 | Landing/content | Introduction copy for sheep, cows, Pip and Buddy | Open | Current landing copy; Buddy ownership/unlock context |
| F-COMP-001 | P2 | Behavior | Buddy gives Pip room to work | Open | F-046 accepted tier behavior; F-048 movement |
| F-COMP-002 | P2 | Behavior | More useful Buddy herding positions | Open | F-COMP-001; F-046 accepted roles |
| F-COMP-003 | P2 | Navigation | Progress-aware Buddy obstacle recovery | Open | F-048 accepted smooth movement; existing Buddy detours |
| F-COMP-004 | P2 | Animation | Clear attention and working intent | Open | F-061 accepted head/body motion; F-COMP-002 |
| F-COMP-005 | P2 | Animation/feedback | Bark pose and recovery gesture | Open | Existing actual Pip/Buddy bark events and feedback |
| F-COMP-006 | P2 | Animation | Distinct Pip and Buddy personalities | Open | F-061 accepted puppy proportions; existing Pip/Buddy hover poses; F-COMP-004 |
| F-COMP-007 | P2 | Behavior | Calm useful Buddy standby | Open | F-COMP-001; F-COMP-003; accepted standby resets |
| F-COMP-008 | P2 | Animation/results | Brief shared arrival celebration | Open | F-COMP-006; existing full-completion/results flow |
| F-HERD-001 | P2 | Behavior | Bounded individual temperaments | Open | Existing wander/bolt and pressure behavior |
| F-HERD-002 | P2 | Animation/behavior | Anticipation before movement | Open | F-065 accepted turning; existing pressure signals |
| F-HERD-003 | P2 | Animation | Natural herd resting gestures | Open | Current sheep/cow articulated models |
| F-HERD-004 | P2 | Behavior | Gentle preferred-neighbor relationships | Open | F-HERD-001; accepted forward-flow and local-flock behavior |
| F-HERD-005 | P2 | Navigation | Yielding at gates and bridge bottlenecks | In progress | Existing gate/bridge traversal; F-065 |
| F-WORLD-001 | P2 | World generation | Room to breathe between the last bridge and the gate for large herds | In progress | F-HERD-005 findings; F-038 |
| F-HERD-006 | P2 | Behavior/animation | Readable relaxation and settling | Open | F-HERD-002; existing F-041 local settling; grass/bush grazing work |
| F-HERD-007 | P2 | Behavior | Distinct sheep and cow movement character | Open | F-HERD-001; F-HERD-005; F-065 |
| F-HERD-008 | P2 | Gameplay/behavior | Spread and settle after arrival | Open | F-028 delivered-animal containment/roaming; F-HERD-005; F-HERD-006 |
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
| F-013 | P2 | Known review concern | Level-5 pacing spike | Open | F-005; retest after F-009/F-012 |
| F-015 | P3 | Validation gap | Mobile GPU performance and transition stability | Open | Rendering batches |
| F-026 | P3 | UI | Pause-menu Quit returns to landing page | Open | — |
| F-030 | P3 | Environment | Lighter, more contrasting water waves | Open | — |
| F-031 | P2 | World generation | Gates on 20+ levels, with some ungated alternative paths | Open | F-006 |
| F-032 | P3 | Gameplay/UI | Open/close buttons on both sides of each gate; closed red/open green; dog touch activates | Open | F-031 |
| F-034 | P3 | World generation | Seeded 15% stone-wall chance per level | Open | F-033 |
| F-036 | P3 | Gameplay | Unattended flock spreads out in the field | Open | F-012, F-028 |
| F-038 | P2 | World generation/gameplay | Progressively larger, multi-directional, less-linear fields with body-clear routes; later difficulty accounts for helpers | Open | F-005, F-006, F-031 |
| F-042 | P3 | Wildlife/art | Investigate and fix missing back legs on small wild animals | Open | - |
| F-043 | P3 | Audio | Make the bark sound resemble a barking dog | Open | - |
| F-044 | P3 | Audio | Add sheep and cow calls with state-dependent frequency and volume | Open | - |
| F-045 | P4 | Weather/water | Add rain impacts and splashes on water during heavy rain or stronger | Open | - |
| F-047 | P4 | Gameplay/companions/economy | Second Buddy after meadow 40 with independent leveling and max tier by meadow 70 | Open | F-046 |
| F-049 | P4 | QA/UI | Prevent automatic level dropdown focus and expansion when opening QA | Open | - |
| F-050 | P2 | Gameplay/upgrades/UI | Level-2 bark +33% strength shown in workshop; level 3 gets two barks before cooldown | Open | - |

## Acceptance criteria and planned work

### F-008 — Clouds temporarily deferred

**Current decision, 15 October 2026 at 11:22 America/Vancouver:** Novy requested removing clouds for now because they are not working as intended. Disable all visible cloud puffs and their associated ground shadows. Rain, fixed per-level weather, sky/fog/daylight, lightning/thunder, wet ground and wildlife remain active.

**Status:** Deferred. The renderer no longer instantiates or updates `Atmosphere`; its source and unit tests are retained as dormant reference for future work. No cloud texture, billboard or shadow resource is allocated by normal game rendering. Earlier cloud appearance/opacity criteria and review evidence are historical, not current runtime requirements. Do not re-enable clouds as part of routine weather maintenance.

### F-013 — Known level-5 pacing concern

The fresh gameplay critic's unchanged input controller completed default levels 1–5 in **18.2, 17.2, 28.7, 38.7 and 208.0 simulated seconds**. Level 5's jump warrants human playtesting; it is not proof of an impossible level or a measured human time.

**Accept when:** document human attempts, retrieval/chokepoint behavior and difficulty progression; adjust only where evidence supports it. Re-run the existing ordinary-input journey policies after crossing/countdown/wandering changes. Avoid solving pacing by weakening collision or allowing autonomous completion.

### F-015 — Performance verification gap

Real phone GPU frame rate and level-transition memory stability remain unmeasured. The existing bounded submission/resource tests are useful but do not establish FPS. Historical production JavaScript was roughly **576 kB / 155 kB gzip**, with an advisory Vite chunk-size warning; this is an optimization consideration, not a confirmed gameplay bug.

**Accept when:** measure normal/large/split herds, later expansive worlds, weather/cloud effects and repeated transitions on representative phones. Record frame-time distribution, load behavior and resource growth. Set a device-specific performance target before judging success.

### F-026 — Quit to landing page

**Requirement:** the pause menu should include a Quit button that returns to the landing page. Added directly on GitHub while this batch was in progress; retained as an Open P3 item.

**Accept when:** Quit returns to the intro/landing screen with movement stopped and transient gameplay/audio handled consistently. Normal saved progress and earned money are preserved. Define whether the current in-progress meadow is discarded or can be resumed; do not treat Quit as Restart Game.

### F-030 — Lighter, more contrasting water waves (P3)

**Requirement:** make river waves lighter and more contrasting.

**Accept when:** wave detail is visibly lighter and has stronger contrast against the river base at normal portrait zoom, follows the local river direction through bends, remains seamless at banks/bridges and stays readable in all fixed weather types. Check pause and mobile rendering cost.

**Status:** Open; no implementation authorized by the acceptance of F-004.

### F-031 — Random gates and ungated alternatives (P2)

**Requirement:** gates are present on 20+ levels, but not every level; some gate levels offer an alternative route without a gate.

**Accept when:** deterministic per-level generation can produce gated and gate-free levels at 20+, never places gates on levels below 20, and some gated levels have a complete, navigable ungated alternative. Tests cover multiple seeds, route connectivity, body clearance and helper navigation. Preserve the existing approved gate interaction in F-006.

**Status:** Open. Exact random distribution is unspecified and must not be invented as user-approved.

### F-032 — World-fence gate indicator and dog activation (P3)

**Requirement:** place an open/close button on each side of every gate so the dog can operate the gate from either approach. Both buttons show red when closed and green when open; touching either button with the dog toggles the same gate open or closed.

**Accept when:** each gate has a reachable button on both sides, including when the gate is closed. Dog contact with either button opens a closed gate or closes an open gate. Both buttons stay synchronized: red when closed and green when open. Each activation reliably updates the same gate and its collision/navigation/minimap state, and provides accessible feedback. It must work on touch and keyboard/mouse without requiring a second thumb. Coordinate with F-031 generated gates.

**Status:** Open. Clarify the interaction mapping during implementation if the visual button/control relationship is ambiguous; do not silently change F-006's accepted action.

### F-034 — Seeded per-level stone-wall chance (P3)

**Requirement:** each level has a seeded 15% chance to use stone walls, replacing the existing fixed four-level sequence.

**Accept when:** each level's wall selection is reproducible from its seed and uses a 15% per-level probability; no deterministic every-fourth-level rule remains. Statistical tests assess broad distribution across a large seed set without brittle per-seed expectations; route openings and clearance remain valid.

**Status:** Open; depends on the F-033 appearance contract and F-007 accepted wall functionality.

### F-036 — Unattended flock spreads across the field (P3)

**Requirement:** when unattended, the flock spreads out across the field.

**Accept when:** with Pip and helpers not actively controlling the herd, eligible undelivered animals disperse across usable field area; spread remains bounded by gameplay barriers and field edges, does not cause stuck animals or autonomous goal delivery, and stops/reverses appropriately when herding resumes. Saved animals continue to follow F-028's enclosure roaming contract. Define measurable spread/coverage during implementation without presenting a chosen metric as user-approved.

**Status:** Open; distinct from F-012 straggler wandering and F-028 delivered-animal roaming.

### F-038 — Larger, less-linear multi-directional levels (P2)

**Requirement:** levels should grow progressively larger and less linear, using multiple directions, fields, rivers and tree clusters; routes must preserve body clearance and avoid stuck animals, and later difficulty must account for helpers.

**Accept when:** public level progression includes larger usable fields and more multi-directional route choices across generated fields, rivers and tree clusters. Every route fits the largest applicable animal body and helper footprint, avoids pinches/stalls, and remains connected under gates/walls; later levels are evaluated with helpers present so added companions do not make progression artificially easy. Use seeded route sweeps and ordinary-input journeys while preserving the level-2 bridge retrieval regression. Exact size/progression thresholds remain implementation decisions, not user-approved values.

**Status:** Open.

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


### F-050 - Bark strength and two-bark upgrade tiers (P2)

**Status:** Open, queued only; unassigned.

**Requirement:** Bark level 2 increases bark strength by 33%, and the workshop displays that percentage. Bark level 3 allows two barks before the cooldown.

**Accept when:**
- Bark level 2 applies a 33% strength increase relative to level 1.
- The workshop clearly displays the level-2 bark strength bonus as +33%.
- Bark level 3 allows two barks before entering cooldown.

**Scope:** queued bark upgrade request only; no implementation or acceptance claimed. Exact cooldown duration and charge-recovery details are not specified by this request.

## Bird behavior feature plan — 18 October 2026 (America/Creston)

Planning requested by Novy; **all F-BIRD items are Open, unassigned and not implemented**. Planning owner: Codex; documentation branch: `plan/bird-behaviour`, based on main `5fd8cf5`. Runtime implementation branch: to be claimed from current main when scheduled. Bird-scoped IDs avoid collisions with concurrently assigned numeric F-IDs. Proposed priority: P2 for this ambient-life feature. This request authorizes planning/tracker updates; no runtime work or game deployment is included.

**Existing foundation:** `src/wildlife.js` already supplies seeded, area-scaled birds (currently capped at six), threat response and weather sheltering. `src/nature.js` renders continuously airborne birds; `src/audio.js` schedules generic ambient calls. Extend these systems rather than introduce a second population/audio loop. New ambient birds do not affect herding, collision admission, scoring or progression.

**Requested behavior:** birds fly, land and peck for food on the ground, land in trees and chirp, and perch on fences/other structures to chirp or sit quietly. Ground birds fly away from Pip and Buddy. Quickly approaching livestock also cause takeoff; grazing or slowly moving livestock alone do not. Each level has a random 10% chance of one nest in one tree.

**Planning assumptions and tunable decisions:** interpret the nest probability as one Bernoulli roll per level, not one roll per tree: zero or one nest, never multiple nests. Select one eligible tree only on success; levels without trees have no nest. Use a dedicated seeded random stream so restart is stable and existing terrain/herd generation is unchanged. Nests are decorative; eggs, chicks, breeding and nest defense are outside the requested scope. Retain current population caps initially. Threat radii, fast-livestock speed threshold, approach prediction, quiet/chirp intervals and ground/perch dwell times are implementation tuning, not user-specified numbers. Existing storm exclusion and heavy-rain shelter policy still apply; a decorative nest may remain in storm levels.

**Implementation order:** first define states and landing-site contracts (001/003); then integrate animated transitions (002) and threat handling (004). Audio (005) and nest decoration (006) can follow independently with disjoint ownership. Add social groups (009), idle gestures (010), bark response (011), nest visits (012), bird varieties (013) and gradual return (014) on their listed foundations. Prioritize 009/010/011 within these additions. Integrate lifecycle/weather/performance (007), then validate and review the complete scope (008). Compare simple discrete takeoff/landing phases with a full flight physics controller; prefer bounded state-driven curved trajectories and reserved landing anchors for this ambient feature. Use terrain/obstacle clearance along the flight path rather than ground navigation for flying birds.

### F-BIRD-001 — Bird states and seeded population (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** one authoritative bird state machine supports flight, approach/landing, ground idle/pecking, perched quiet/chirp and takeoff/flee. States have bounded randomized dwell times and legal transitions, with interrupted landing safely returning to flight. Population and behavior RNG are reproducible without changing existing level/herd streams; no duplicate legacy bird population remains. Threats take precedence over ground pecking. State must be testable separately from rendering and audio.

### F-BIRD-002 — Clay birds and animated transitions (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** birds match the current handmade clay style and remain legible at normal gameplay zoom. Flight has visible wing beats; takeoff gains height and landing decelerates to the actual surface, with wings settling when grounded/perched. Ground pecking visibly lowers the head/beak toward food with pauses. Feet align with the support surface, and silhouettes do not hover, sink or snap between flight and rest. Pause freezes animation. Ordinary phone-scale appearance requires rendered user review.

### F-BIRD-003 — Safe ground and elevated landing sites (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** birds find reachable dry ground for pecking, usable tree branches, fence tops and explicitly supported structure tops (initially stone-wall tops and barn roof edges where present). Support positions use actual world transforms/heights, including rotated/scaled trees and fences. Birds do not land in water, inside trunks/foliage/solid structures, on unsupported air, or through roofs. Air trajectories clear obstacles; invalid/occupied anchors are skipped with bounded search and a safe continue-flying fallback. Reserve elevated anchors to prevent overlapping perched birds. Opening a supporting gate or otherwise losing a support causes safe takeoff rather than floating. Ground birds do not block gameplay actors.

### F-BIRD-004 — Conditional ground-bird fleeing (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** nearby Pip or active Buddy triggers ground-bird takeoff and flight away from the threat, including during pecking/ground landing. Nearby livestock trigger takeoff only when moving quickly toward the bird; grazing or slow movement alone leaves the bird grounded. Use actual velocity and closing direction/proximity so distant, stationary or fast-moving-away livestock do not falsely startle birds. Dog threats override calm livestock; multiple threats produce a safe escape direction. Cooldown/hysteresis prevents immediate relanding beside a threat or repeated takeoff/landing flicker. Verify sheep and all four cow sizes; preserve existing livestock/companion behavior. Elevated birds also respond to barking under F-BIRD-011; other elevated-perch proximity reactions remain unspecified.

### F-BIRD-005 — Perched chirping and quiet sitting (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** tree-perched birds chirp intermittently with natural quiet gaps. Fence/structure birds can chirp or sit quietly. Schedule calls from actual visible, eligible perched birds, with distance-aware audibility and bounded concurrent voices; reconcile the existing generic ambient bird loop to avoid duplicate/orphan calls. Honor sound settings, pause/backgrounding, weather shelter and restart/level disposal. Enabling audio after interaction must not replay a backlog. Source scheduling checks and a listening check are separate evidence.

### F-BIRD-006 — Rare tree nest (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** a dedicated per-level seeded roll succeeds with probability 0.10 and selects exactly one eligible tree; failure or no trees yields zero nests. The rule is independent of tree count and does not make a roll for every tree. Restarting the same level preserves nest presence/location. A nest fits the clay style, rests in a supported branch fork, respects tree size/rotation and can be seen from a useful camera angle without changing the tree mesh or route clearance. Tests cover roll boundaries, zero/one/many trees, restart stability and unchanged original world/herd generation. A random sample is not expected to contain exactly 10% nests.

### F-BIRD-007 — Weather, lifecycle and resource integration (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** fixed storms contain no birds and no bird calls; current light-rain activity/heavy-weather shelter is preserved. All bird states freeze on pause and reset cleanly on restart, level jump, results and disposal, with no stale perch reservations/audio. Shared geometry/materials, capped actors/voices, bounded landing searches and sensible culling keep cost measurable. Offscreen birds and nests do not leak resources. Confirm wildlife additions do not change gameplay collisions, saved progress, delivery or other fauna. Record source resource checks separately from measured phone FPS.

### F-BIRD-008 — Validation, blind review and dev sign-off (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Accept when:** meaningful state/trajectory/perch/threat/nest/audio/weather tests pass along with full regressions, both build/artifact modes and generated documentation checks. Exercise Pip and Buddy separately, grazing/slow/fast approaching livestock, fast receding livestock, interrupted landings, multiple threats, no valid perch, varied trees/fences/structures, weather and pause/restart. Use independent implementation ownership for substantial work and a fresh blind reviewer under AGENTS.md; resolve blockers and meet the standing 9/10 threshold. Record actual models/effort and validation limits. After development publication is authorized, publish only to `/Flock/dev/` and verify CI, native Pages and live asset hashes. Leave implemented issues in Review for Novy's phone appearance/motion/listening sign-off; only then mark Done and strike through closed rows/headings. Production merge/publication requires separate user authorization.

**Planning evidence:** inspected current main tracker, requirements, development rules and existing bird rendering/behavior/audio entry points. Routine documentation-only plan; no runtime blind review or performance claim. Generated documentation checks are recorded with the documentation commit. Remaining checks: all implementation, runtime tests, rendered/listening review and publication above remain future work.


## Bird feature additions — 18 October 2026, 21:47 America/Creston

Novy requested adding all six suggested features to the tracker. F-BIRD-009–014 are P2, Open, unassigned and not implemented. They extend the original plan and share F-BIRD-007 lifecycle/resource integration and F-BIRD-008 regression, blind review and user acceptance gates. Include group-response timing, gesture interruption, muted bark response, nest-absent levels, seeded varieties and safe delayed return in that validation scope. Birds remain ambient wildlife without feeding chores or rewards.

### F-BIRD-009 — Small social foraging groups (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on:** F-BIRD-001; F-BIRD-004.

**Accept when:** Two or three birds can forage together when the population permits. A startled bird can cause nearby group members to take flight after small varied delays, without synchronizing every bird on the level. Grouping stays within the existing population cap, allows separation, and never overrides safe escape paths, landing reservations or weather shelter.

### F-BIRD-010 — Ground hops and perched idle gestures (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on:** F-BIRD-002; F-BIRD-003.

**Accept when:** Ground birds make occasional short hops between pecks. Perched birds sometimes tilt their heads, preen or ruffle feathers, with varied timing and quiet rests. Feet remain supported, poses remain readable at ordinary gameplay zoom, and threats interrupt gestures immediately. Pause freezes all motion; shared animation resources remain bounded.

### F-BIRD-011 — React to Pip and Buddy barking (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on:** F-BIRD-004; F-BIRD-005.

**Accept when:** Actual bark events from either Pip or active Buddy startle nearby grounded or perched birds into safe flight away from the bark source. Use a tunable finite response radius and existing bark event timing rather than audio playback or a new global polling loop. A group response may follow F-BIRD-009; airborne birds do not repeatedly restart takeoff. Mute does not disable behavioral response, paused play does not trigger it, and normal bark strength, cooldown and livestock effects are unchanged.

### F-BIRD-012 — Occasional visits to the nest (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on:** F-BIRD-003; F-BIRD-006.

**Accept when:** On a level with a nest, an existing bird can occasionally approach it, land safely and settle briefly before leaving. Visits use reserved nest support and natural intervals, yield to threats and weather shelter, and do not spawn extra birds. Levels without nests need no special fallback behavior. Eggs, chicks, breeding, nest defense and player chores remain outside scope.

### F-BIRD-013 — Two or three recognizable bird varieties (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on:** F-BIRD-002; F-BIRD-005.

**Accept when:** Provide two or three stylized bird varieties with distinguishable colors and calls while sharing core geometry/animations where practical. Choose varieties with stable seeded variation; keep the total population cap unchanged. Each remains recognizable in the clay art style at normal phone zoom, with calls balanced against music, bark and livestock audio. This is ambient variety, without collection objectives or progression rewards.

### F-BIRD-014 — Gradual return after the meadow settles (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on:** F-BIRD-003; F-BIRD-004; F-BIRD-009; F-BIRD-011.

**Accept when:** After Pip, Buddy and quickly approaching livestock leave an area, birds can gradually return to safe ground and resume foraging. Require a tunable clear interval and recheck threats before landing; stagger returns so the meadow settles naturally. Calm or grazing livestock do not prevent return. Repeated barking or a renewed threat postpones landing without rapid oscillation. Returns use existing birds, honor weather shelter and cannot teleport or add population.

**Documentation handoff:** the original planning commit is `1fbfe08`; remote publication was blocked by automatic approval review, which required explicit authorization for `novydhillon/Flock`. This follow-up updates the same local planning branch; no new push is attempted without that authorization. Documentation generation/checks cover this addition; runtime implementation and acceptance remain future work.


## Herd life and readability plan — 18 October 2026, 21:49 America/Creston

Novy requested tracking all eight suggested herd enhancements. **F-HERD-001–008 are P2, Open, unassigned and not implemented.** Planning owner: Codex. Documentation recorded on the existing local `plan/bird-behaviour` planning branch; runtime branch/owner to be claimed from current main when implementation is scheduled. Herd-scoped IDs avoid collisions with concurrently assigned numeric issues. Prioritize bottleneck yielding (005), anticipation (002) and arrival behavior (008); dependencies below describe integration prerequisites, not a requirement to finish every other item first.

These extend accepted behavior rather than reopen signed-off issues. Preserve current collision/navigation, turn caps, weaker cohesion, forward bridge commitment, local settling, delivered-animal containment and progression. The separate requested surface-aware grazing change remains distinct and must be integrated from its actual latest implementation when these items are claimed. No implementation or game deployment is authorized by this tracker update.

### F-HERD-001 — Bounded individual temperaments (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Existing wander/bolt and pressure behavior.

**Accept when:** Give animals small, stable seeded differences in confidence, curiosity and willingness to follow. Keep variation bounded and readable: every animal remains responsive to appropriate herding pressure, with no unbeatable stubbornness or new uncontrolled bolting. Preserve accepted wander/bolt frequencies, local settling and weak cohesion unless a separately reviewed adjustment is necessary. Restart preserves traits without altering original world/herd random streams.

### F-HERD-002 — Anticipation before movement (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-065 accepted turning; existing pressure signals.

**Accept when:** Animals look toward a disturbance, lift their heads and visibly shift weight before ordinary movement or flight. Strong nearby pressure or an actual bark still produces an immediate gameplay response: anticipation must not add input latency or stall escape. Blend out of grazing safely and coordinate head, body and legs with current turn limits; preserve simulation-owned movement and collisions.

### F-HERD-003 — Natural herd resting gestures (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Current sheep/cow articulated models.

**Accept when:** Add occasional ear flicks, tail swishes, blinking and chewing with varied timing and restful gaps. Species-appropriate gestures remain subtle and legible in the clay style at gameplay zoom. They do not synchronize the entire herd or change gameplay state; locomotion and threats take precedence. Respect grass/bush-only head-down grazing and its exclusions for paths, bridges and barns. Keep shared geometry/materials and bounded instance cost.

### F-HERD-004 — Gentle preferred-neighbor relationships (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-HERD-001; accepted forward-flow and local-flock behavior.

**Accept when:** Animals may prefer a few familiar nearby neighbors, helping small groups form naturally. Relationships are stable and seeded, use bounded local influence and do not strengthen the accepted overall cohesion, pull front animals backward, reunite intentionally separated flocks across barriers or cause remote attraction. Dog pressure, barrier navigation and bridge commitment override social preference. Distinguish this feature from F-036 unattended spreading; preserve that item as separate work.

### F-HERD-005 — Yielding at gates and bridge bottlenecks (P2)

**Status:** In progress. Owner: Claude Code.

**Branch:** `feature/herd-bottlenecks`

**Depends on / preserve:** Existing gate/bridge traversal; F-065.

**Accept when:** Animals locally yield and take turns at narrow gates and bridge entries instead of piling up or repeatedly reversing. Use actual body sizes, including all cow size variants, and bounded yielding with an escape from deadlock/starvation. Preserve committed onward bridge crossing, physical barriers, closed-gate rules and player ability to steer or deliberately reverse a flock. No teleporting, collision bypass or global queue stalls. Verify mixed herds, opposing approaches, stopped leaders, dog pressure, pause and restart.

**Investigation — 20 October 2026:** A scripted player herded seeded levels 6–81 (20–65 animals, all cow sizes) while every bridge, gate and pen entrance recorded reversals (forward-to-backward turns in the approach) and stalls under pressure. 144 runs compared the current game with wider openings, more spacing and a smaller personal-space radius. Findings: herds rarely stall (under 0.2 s per animal) but reverse repeatedly in the last metres before a bridge deck: about 1.9 reversals per animal on levels 6–13 and 5.4 at the second bridge on levels 16+, worst 23. Bridges, not gates, are the bottleneck. No animal reversed once on a deck, so committed crossing works. The strongest backward forces at a reversal were the fixed 2 m separation radius, convergence of every pressured animal on the bridge centre (`openingSteer`), cohesion and player pressure. Wider decks and a smaller separation radius each cut the worst bridge by about 25%; extra spacing mainly helped the gate. The approved fix is behavioural (lanes, yielding, an approach commit zone, a deadlock escape), with spacing tracked separately as F-WORLD-001. Scripted-player counts are directional; they are not human playtesting or device evidence.

**Connector waiver — 20 October 2026:** Regenerated docs HTML (about 600 KB) is too large for the connector. Novy explicitly authorized shell `git commit`/`git push` for F-HERD-005 and F-WORLD-001 on the new branch `feature/herd-bottlenecks`. The connector-only rule stays in force for other work.

**Execution — 20 October 2026:** Implemented in `src/chokepoints.js`, `src/bridge-crossing.js`, `src/simulation.js` and `openingSteer` in `src/world.js`, with F-WORLD-001 spacing. Pressured animals with direct Pip or Buddy intent take lanes at bridge deck ends, open gates and the destination entrance, follow rather than shove the animal ahead, slide into a lane when pinned beside a deck end, and stop yielding after 3 s for a 2 s escape. Pushed animals lined up with a deck commit from 3 m before it, never back over a deck they already crossed. 10 new tests in `tests/chokepoints.test.js`; full suite 351/351. `npm run measure:chokepoints` on 36 seeded layouts (levels 6–81, four seeds each), before and after, with the same scripted player:

| Measure (mean per animal) | Levels 6–13, before | Levels 6–13, after | Levels 16–81, before | Levels 16–81, after |
|---|---|---|---|---|
| Layouts finished | 12/12 | 12/12 | 17/24 | 24/24 |
| Median time to finish | 96 s | 85 s | 254 s | 211 s |
| First bridge reversals | 1.78 | 0.85 | 2.38 | 1.50 |
| Last bridge reversals | 1.78 | 0.85 | 4.03 | 1.88 |
| Worst bridge reversals in any layout | 2.98 | 1.71 | 12.95 | 3.95 |
| Last bridge stalled seconds | 0.12 | 0.03 | 0.22 | 0.11 |
| Gate reversals | 1.51 | 2.21 | 0.65 | 0.29 |
| Gate stalled seconds | 0.01 | 0.05 | 0.06 | 0.02 |
| Entrance reversals | 0.35 | 0.60 | 1.19 | 1.50 |

Bridges improved on every band and every large-herd layout finished. Trade-offs: gate reversals on levels 6–13 and entrance reversals rose slightly with negligible stalls. Variants that dropped queuing at gates or the entrance improved those counts but left three large-herd layouts unfinished and failed existing journey tests, so all openings keep the behaviour. Scripted-player evidence only; human feel, rendered appearance and phone FPS need device checks.
### F-HERD-006 — Readable relaxation and settling (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-HERD-002; existing F-041 local settling; grass/bush grazing work.

**Accept when:** After pressure ends, transition progressively from alert to walking to calm/grazing, with varied timing and hysteresis that prevents rapid state flicker. Renewed pressure interrupts relaxation immediately. Keep accepted local settling locations and wander/bolt rules; do not reset their schedules just for presentation. Graze only where the separately requested surface eligibility allows it, with no head-down feeding on paths, bridges or in barns.

### F-HERD-007 — Distinct sheep and cow movement character (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-HERD-001; F-HERD-005; F-065.

**Accept when:** Sheep read as a somewhat tighter group; cows move more deliberately with somewhat greater personal space, using bounded species tuning. Preserve sheep turning at no more than 180 degrees/second and cows at no more than 120 degrees/second, with walking legs during stationary turns. Do not reintroduce stronger flock-wide magnetic attraction or rear-to-front pushing. Validate route clearance, delivery pacing and all cow sizes; any tuning values are proposed implementation choices requiring gameplay review.

### F-HERD-008 — Spread and settle after arrival (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-028 delivered-animal containment/roaming; F-HERD-005; F-HERD-006.

**Accept when:** Delivered animals move toward available space inside the destination and settle naturally, keeping the entrance clear for arrivals when space permits. Retain accepted F-028 roaming and strict goal containment; avoid overlap and test full/mixed herds and all cow sizes. Do not force grazing inside a barn or on ineligible surfaces. Preserve Pip-at-goal scoring, delivery counts/timer/rewards, and one-time delivery registration; no exits, teleportation or scoring from the arrival animation.

**Shared validation and acceptance:** test sheep, every cow size, mixed herds, open/closed gates, rotated bridges, split groups, Pip/Buddy pressure, destination capacity, pause/resume/restart and stable seeded behavior. Source checks must verify no collision escape, deadlock or delivery/progression regression. Follow AGENTS.md independent ownership/blind-review requirements for substantial runtime work, full relevant regressions and both artifact modes. Record measured resource costs separately from phone FPS. Phone appearance, animation readability and herding feel require rendered/play testing; leave implementations in Review until Novy's sign-off. Regenerate/check documentation. Publish future authorized development builds only to `/Flock/dev/`; production merge/publication requires separate authorization.

**Planning handoff:** documentation-only scope, with no runtime tests or blind review claim. Generated documentation and link/behavior checks are run for this update. All runtime implementation and acceptance remain outstanding. The earlier automatic approval rejection still blocks remote publication without explicit push authorization; these additions are committed locally without retrying the blocked action.


## Pip and Buddy teamwork and personality plan — 18 October 2026, 21:52 America/Creston

Novy requested tracking all eight suggested improvements. **F-COMP-001–008 are P2, Open, unassigned and not implemented.** Planning owner: Codex; documentation branch: existing local `plan/bird-behaviour`. Claim runtime owner/feature branch from current main when scheduled. Scoped companion IDs avoid concurrent numeric-ID collisions. Prioritize working space (001), useful herding positions (002) and progress-aware obstacle recovery (003).

Extend accepted F-046/F-048/F-061 behavior and Pip presentation rather than reopening completed fixes. No second Buddy, upgrade pricing, new control scheme, automated Pip navigation or new gameplay resource is included. This request adds tracker scope only; runtime implementation, review and publication remain future work.

### F-COMP-001 — Buddy gives Pip room to work (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-046 accepted tier behavior; F-048 movement.

**Accept when:** Buddy avoids crowding Pip and repositions when both approach the same side of the flock. Maintain a tunable comfortable working gap without steering Pip or allowing Buddy through barriers. Yield predictably with hysteresis so brief crossings do not cause jitter or alternating sides. Preserve actual herd selection, tier rules, bridge commitment and the last-animal passage assistance. A constrained gate/bridge must not create a permanent avoidance deadlock.

### F-COMP-002 — More useful Buddy herding positions (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-COMP-001; F-046 accepted roles.

**Accept when:** Buddy selects a useful position behind or beside the actual chosen flock travel direction, with sufficient standoff to guide rather than repeatedly scatter animals. Retain separate-flock selection, tier-2 smaller-group support and tier-3 retrieval of a stray through ordinary pursuit. Existing local navigation and barriers override preferred geometry; stabilize side changes. Verify moving/stopped/reversing flocks, mixed sizes, splits and final singletons without changing accepted livestock cohesion or bolting rules.

### F-COMP-003 — Progress-aware Buddy obstacle recovery (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-048 accepted smooth movement; existing Buddy detours.

**Accept when:** Detect sustained lack of meaningful progress toward a valid task, then choose another feasible route or back out of a tight spot with bounded recovery attempts and a safe wait/retry fallback. Do not treat intentional arrival, standby, pause or a temporarily yielding animal as stuck. Respect trees, walls, water, gates, bridges and body clearance, with no teleportation, collision bypass or repeated pushing into the same obstacle. Clear stale path/recovery history on task changes and level reset; preserve low-speed smoothness.

### F-COMP-004 — Clear attention and working intent (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-061 accepted head/body motion; F-COMP-002.

**Accept when:** Buddy looks toward the actual animal/group he is helping, including during task transitions, with smooth bounded head motion. Idle Pip can glance at nearby livestock without changing player-controlled movement or body heading. Existing turn-directed head motion takes priority during movement; avoid snapping, excessive twisting and gaze flicker between equally close animals. Restore neutral attention when no eligible target exists; reset/freeze correctly on restart/pause.

### F-COMP-005 — Bark pose and recovery gesture (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Existing actual Pip/Buddy bark events and feedback.

**Accept when:** Briefly accompany each actual Pip/Buddy bark with a readable pose and a subtle recovery gesture. The bark gameplay event remains immediate; preparation animation never delays or creates an additional bark. Preserve cooldowns, strength, double-tap/keyboard inputs, autonomous Buddy eligibility, red-tail/ring feedback and independent cooldown ownership. Animate from the event even when muted, handle repeated permitted barks cleanly, and avoid stuck poses on pause/restart. Coordinate bird bark reactions with F-BIRD-011.

### F-COMP-006 — Distinct Pip and Buddy personalities (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-061 accepted puppy proportions; existing Pip/Buddy hover poses; F-COMP-004.

**Accept when:** Pip reads as attentive and purposeful; Buddy as eager and puppy-like through subtle head tilts, Buddy ear gestures and occasional small celebratory motions. Keep accepted reference appearances, relative scales, hover, turn lean, acceleration/braking lean and ground glow. Vary idle timing; task, movement and bark poses take priority. Gestures do not alter navigation, input, rewards or animal pressure, and remain readable at ordinary phone zoom with bounded rendering cost.

### F-COMP-007 — Calm useful Buddy standby (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-COMP-001; F-COMP-003; accepted standby resets.

**Accept when:** When no valid help task exists, Buddy waits calmly near Pip in a reachable, useful location, keeping gate/bridge throats and the destination entrance clear when space permits. Avoid continuous circling, low-speed stutter and rapid alternation between standby/work. Resume a valid tier-appropriate task promptly; clear stale target, path and pose state on transitions. Never autonomously move Pip or herd delivered animals. Narrow spaces use a safe bounded fallback rather than a blocked entrance or collision bypass.

### F-COMP-008 — Brief shared arrival celebration (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-COMP-006; existing full-completion/results flow.

**Accept when:** After a successful final delivery, Pip and an active Buddy briefly acknowledge each other with a look or small playful motion. Do not play for partial timeout, an absent/inactive Buddy or duplicate completion events. The celebration is nonblocking: results and Continue remain available immediately, and user input/next level cancels it safely. Preserve finalized delivery counts, rewards and saved progress; no unscripted gameplay movement or repeated celebration after pause/resume/restart.

**Shared validation and acceptance:** test all Buddy tiers, absent/inactive Buddy, split/merged/stopped/reversing flocks, all cow sizes, tree detours, narrow gates, rotated bridges, last-animal passage, stray retrieval, simultaneous barks and transitions among work/standby/results. Verify controller responsiveness, low-speed continuity, physical collisions, Pip-at-goal scoring, bark event ownership, pause/background/resume/restart and clean task/animation state. Resolve pose priorities across attention, idle, bark and celebration before integration. Follow AGENTS.md independent ownership/blind gauntlet for substantial runtime work, meaningful focused/full regressions and both artifact-mode checks. Record source evidence separately from phone motion, touch usability, listening and FPS. Leave implementations in Review until Novy's sign-off. Authorized non-main publication targets `/Flock/dev/`; production merge/publication requires separate authorization.

**Planning handoff:** routine documentation-only additions with generated documentation/link/behavior checks; no runtime implementation, performance claim or runtime blind review. Remote publication remains blocked by the previously reported automatic approval rejection requiring explicit push authorization for `novydhillon/Flock`; no new push is attempted for this local commit.


## Gameplay, loading and landing UI plan — 18 October 2026, 21:57 America/Creston

Novy requested tracking the twelve remaining suggestions and explicitly skipped **contextual gate controls, cleaner results and control preferences**. Those three suggestions are not new work items in this batch; this exclusion does not close or cancel unrelated existing tracker issues. **F-UI-001–012 are P2, Open, unassigned and not implemented.** Planning owner: Codex; documentation branch: existing local `plan/bird-behaviour`; runtime owner/feature branch to be claimed from current main when scheduled. UI-scoped IDs avoid concurrent numeric-ID collisions.

Prioritize progress-aware Continue (008), moving full-game reset (010), loading recovery (007) and workshop clarity (003). Retain the approved cream/green/clay visual language, minimal weather/livestock HUD, Level # introduction, top-center minimap, numbered tips, circular Woof and production QA exclusion. Respect existing reduced-motion behavior when animating; this is not authorization to add the skipped control-preference/settings feature. Optional bark haptics remain within the explicitly retained bark-feedback suggestion.

### F-UI-001 — Clear bark cooldown-to-ready feedback (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Existing Woof/cooldown UI; coordinate F-050.

**Accept when:** Make the transition from cooldown to ready unmistakable through a brief restrained visual accent; optional light haptics may supplement it where supported. Preserve the circular Woof button, readable cooldown, existing input/cooldown behavior and independent Buddy bark. Readiness must match actual ability to bark, including any future F-050 multi-bark tier. Unsupported haptics must be harmless and never required; no automatic sound or vibration during loading, pause or backgrounding. Do not change bark balance or add control-preference scope.

### F-UI-002 — Distinct livestock states on the minimap (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Accepted top-center minimap; existing delivery/flock state.

**Accept when:** Distinguish undelivered, delivered and separated livestock using shape or outline as well as color, readable at normal phone size. Derive separation from actual flock grouping rather than a contradictory UI-only grouping rule. Preserve map size/position, routes, goal and actor contrast, with no extra permanent HUD panel or overlap in narrow portrait/landscape. Delivered counts and markers reflect actual simulation state; do not modify flock behavior.

### F-UI-003 — Current-to-next upgrade benefits and previews (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Existing tier availability/costs; F-050 descriptions.

**Accept when:** Show current and next-tier benefits, cost and unlock requirements together with clear maxed/unaffordable/locked states. Add small visual previews for Buddy and bark upgrades without implying ownership or changing gameplay. Keep purchased-but-inactive tier messaging accurate on earlier levels and isolated QA sessions. Values come from actual upgrade definitions; retain hidden drone, existing prices/progression and safe purchase behavior. Previews stop/reset appropriately and do not activate real barks or persist a purchase.

### F-UI-004 — Clay meadow loading vignette (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Current loading overlay; F-UI-005/006.

**Accept when:** Show a small clay-style vignette of hovering Pip beside a few subtly moving sheep. Display it promptly without depending on the full game renderer or adding a substantial new blocking asset download. A static fallback remains readable if animation/graphics are unavailable. Honor existing reduced-motion preferences, pause animation when hidden and dispose it after load; keep loading status and recovery controls clear.

### F-UI-005 — Honest initialization progress (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Actual asset/renderer initialization tasks.

**Accept when:** Show meaningful loading stages based on real initialization events. Use a percentage only for a measurable known workload; otherwise show a clear indeterminate state without fake progress or a stalled 99% counter. Announce stage changes accessibly without excessive repetition. Distinguish slow work from failure and do not claim readiness until essential assets, renderer and initial scene are usable.

### F-UI-006 — Smooth reveal of the ready meadow (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** F-UI-005; existing scene initialization.

**Accept when:** Transition smoothly from loading into the ready landing meadow with no unnecessary minimum wait, blank flash or visibly uninitialized scene. Release the overlay after a usable frame is ready, and prevent clicks passing through it during the transition. Honor reduced motion and work on fast cached loads, slow first loads and narrow/rotated screens. Do not start gameplay or audio without the intended user action.

### F-UI-007 — Retry and clear loading-error recovery (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Initialization/error handling; F-UI-005.

**Accept when:** Provide a usable Retry action and concise understandable failure explanation. Distinguish unsupported graphics from recoverable loading/initialization failures where evidence allows, avoiding a generic WebGL claim for every error. Retry safely cancels/disposes prior work, avoids duplicate loops/audio/listeners and preserves all saved progress, currency and upgrades. Failure UI works even if the 3D renderer cannot initialize; do not require clearing saves to recover.

### F-UI-008 — Progress-aware Start or Continue action (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Saved campaign progression; existing begin/resume behavior.

**Accept when:** Show Start herding for a new player and Continue · Level # for a returning player. Label and destination agree with the existing intended campaign continuation rule, not the decorative landing scene or transient QA state. Retain replay/highest-unlocked distinctions and avoid silently promising mid-level resume when no such save exists. Verify fresh, returning, completed-campaign and reset profiles without changing unlocks or saves.

### F-UI-009 — Living showcase meadow (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Existing intro simulation; bird/herd/companion future features when available.

**Accept when:** Present a calm showcase of Pip, appropriate grazing livestock, owned/active Buddy where eligible and occasional weather-appropriate wildlife. Do not reveal an unowned Buddy or require unfinished bird/herd features to ship the landing work. Use current systems and integrate later features when available. Maintain text/Play legibility and mobile resource limits; no gameplay timer, delivery rewards, currency or progress advances during the showcase. Keep wildlife storm exclusion and surface-aware grazing restrictions.

### F-UI-010 — Move full-game reset out of the Play area (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Existing reset confirmation; F-UI-011.

**Accept when:** Remove Restart Game from directly beneath Play and put it in the settings/menu area while preserving the explicit destructive-action confirmation and cancel path. Use the freed landing space for Choose meadow or workshop access as fits the selected design; no duplicate/confusing primary action. Existing in-menu reset remains discoverable, keyboard accessible and distinct from restarting only the current meadow. Opening settings or browsing never clears progress.

### F-UI-011 — Clear meadow selector with remembered browsing position (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Existing unlocked-level picker and saved progress.

**Accept when:** Provide a simple selector that clearly distinguishes completed, current and locked meadows using existing recorded progress and accessible labels. Locked levels remain nonplayable in normal play. Remember browsing position when returning from a selection/menu during the session; keep this browsing state separate from campaign continuation and QA state. Support up to 100 levels without clipping, excessive scrolling friction or focus loss on small screens; preserve replay and unlock behavior.

### F-UI-012 — Introduction copy for sheep, cows, Pip and Buddy (P2)

**Status:** Open. Owner: unassigned. Branch: not yet claimed.

**Depends on / preserve:** Current landing copy; Buddy ownership/unlock context.

**Accept when:** Refresh concise landing copy to include both sheep and cows and explain guiding the herd home with Pip and Buddy. Keep an inviting plain tone, acknowledge Buddy as a companion to unlock rather than imply every new player already owns him, and fit existing phone/desktop layouts without crowding Play. Preserve current branding and visual hierarchy; no new tutorial modal or long instructions.

**Shared validation and acceptance:** verify smallest supported phone portrait/landscape, safe areas, long labels, keyboard/focus, touch targets and screen-reader names; fresh/returning/max-progress profiles; workshop purchases/locks; fast/slow/failed loading, retry and unsupported graphics; pause/background/restart and menu transitions. Record actual native-browser/device evidence separately from DOM/source substitutes. Preserve current saved progress keys and state, avoid duplicate renderer/audio loops, and measure loading/resource impact. Follow AGENTS.md independent implementation ownership/blind review for substantial runtime batches, meaningful focused/full regressions, release/development artifact checks and generated documentation validation. Keep implemented items in Review until Novy's appearance/usability sign-off; future authorized non-main publications target `/Flock/dev/`, with production merge/publication separately authorized.

**Planning handoff:** documentation-only scope, no runtime implementation, loading measurements, blind-review score or device-validation claim. Generated documentation/link/behavior checks cover this update. The earlier automatic approval rejection still requires explicit push authorization for `novydhillon/Flock`; commit locally without retrying the blocked publication.



## Tracker archive maintenance — 18 October 2026, 22:04 America/Creston

Moved 48 closed issues and historical acceptance/execution records to [ISSUES_CLOSED.md](ISSUES_CLOSED.md); 59 active items remain, including all 42 new planning items. Current overview statuses and explicit user acceptance control migration; older Review wording is retained only as historical evidence. F-065 had a signed-off detail without an overview row; its closed row is included in the archive. No Open, Review or Deferred issue was closed by this reorganization. Archived source paragraphs are preserved; moved-heading links are updated.

Root AGENTS.md and DEVELOPMENT.md now require connector-only repository operations and same-commit archival on closure. Shell remains available for local files/builds/checks. The docs generator includes the archive in navigation/search; checks enforce active/closed separation, unique scoped IDs, detail/overview coverage and archive strikethrough. No runtime or Pages changes. Independent documentation review and final validation are recorded in QUALITY.md.


## Main integration — 18 October 2026, 22:17 America/Creston

Requested integration of main `d2484b9` into planning branch `plan/bird-behaviour` (`6ca2b35`). Main contributes five commits since shared base `5fd8cf5`: accepted surface-aware grazing, its tests and development/production evidence, and a CI branch-trigger change. Runtime, tests, workflow and new validation manifests are imported without competing edits. Shared development/requirements/quality additions are retained alongside this branch's planning/archive rules; generated HTML is rebuilt rather than merged. F-066 is Done by Novy's 22:10 approval and is added directly to [Closed issues](ISSUES_CLOSED.md); 59 active items and all 42 new planning items remain unchanged. Archive now contains 49 closed items.

Preserve connector-only repository operations, same-commit archive-on-closure and all earlier planning scope/exclusions. This integrates source into the planning branch only; no main merge or game deployment is requested. Validation and independent integration review are recorded in QUALITY.md. Runtime is identical to the imported main revision; no new bird/herd/companion/UI features are implemented by this merge.


### F-WORLD-001 — Room to breathe between crossings (P2)

**Status:** In progress. Owner: Claude Code.

**Branch:** `feature/herd-bottlenecks`

**Depends on / preserve:** F-HERD-005 findings; F-038 (larger fields) remains the broader layout item.

**Execution — 20 October 2026:** `createLevel` adds 0.4 m of trail per animal above 30 (capped at 14 m) before the gate on non-early levels, keeping rivers at the same distance from the spawn. The last bridge exit to gate distance on 50–65 animal levels grows from about 22 m to 28–37 m; single-river levels 6–15 already have 41–49 m; levels 1–5 are unchanged. Measured gate reversals on levels 16–81 fell from 0.65 to 0.29 per animal with stalls 0.06 → 0.02 s (see F-HERD-005).

**Accept when:** On levels with large herds, the trail distance between the last bridge exit and the gate grows with herd size so a flock can leave the deck before reaching the gate. Spawn-to-first-river distance and early levels (1–5) stay unchanged. Generated routes keep full-body clearance for the largest cow and stay connected with gates open or closed. Seeded route sweeps, existing journeys and bridge regressions pass, and the chokepoint measurement shows lower gate reversals without new stalls. No teleporting or collision bypass.
