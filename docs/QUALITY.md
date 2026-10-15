# Flock dev2 revision quality record

## Weather follow-up validation - 15 October 2026

User report at 12:22 Vancouver requests full-screen rain, angled storm rain, no storm wildlife, clearer thunder beside music, and seeded small/empty puddles that grow during the level. Implementation ran in three isolated worktrees. Independent reviewers received requirements and source/tests without author notes, earlier scores or a requested score threshold. Rain/storm review used Sol at high effort for camera projection and asynchronous audio lifecycle; documentation review uses Luna at medium effort. The requested completion threshold is 8.5/10 for each review.

- Integrated Node 24.21.0 source suite passed **228/228** before the placement follow-up. Windows temporary Git fixtures were rerun under a writable workspace temporary directory after the default OS temporary path denied Git configuration writes; no game logic or assertions were relaxed.
- Both builds pass artifact checks: release has 15 files and zero QA assets; development has 17 files including two QA assets. Offline documentation checks pass 12 pages, 849 links/anchors, nine parsed diagrams and four DOM tests. Small portability repairs normalize generated source URLs to forward slashes and accept CRLF Mermaid fences.
- Independent rain/storm source review scored **9/10**, with 57 focused tests and 75,600 additional projection frames across seven aspect ratios, camera travel and zoom. Rain stayed finite, downward and bounded to 256 drops; storm slant stayed at least 32.27 degrees from vertical. Audio event/mix and cancellation checks pass. This is not rendered-pixel or speaker verification.
- Initial independent puddle review scored **8/10**: dense land-footprint sampling passed, but six large rainy levels had no puddles visible along any route in portrait. Placement is being corrected and will be rechecked before publication. The initial score does not satisfy the requested threshold.

The route-placement repair passed independent follow-up at **9/10**. Across all 65 rainy default levels, all eight puddles are visible somewhere along the generated portrait journey, with a site near spawn. Dense footprint sampling across all 100 levels found zero unsafe points/bridge intersections; deterministic restart, growth, pause and disposal checks pass. This is a follow-up by the same blind critic, not a new first-pass review.

Final integrated Node 24 suite passes **229/229**; both release/development build checks pass after the placement repair. Documentation accuracy and clarity reached **9/10** after removing duplicated current specifications, correcting superseded puddle/storm descriptions and distinguishing QA fixtures from provisional permanent thresholds. No requested scope remains below 8.5/10. Implementers used the inherited Sol model; independent source reviewers used Sol at high effort and documentation used Luna at medium effort.

Weather issues remain **Review** until Novy accepts the new phone appearance and sound. Clouds stay Deferred; unrelated queued gameplay/audio requests remain Open. Publication evidence is recorded separately after deployment. No browser-control or listening capability was available; source review scores are not device experience scores.

### Verified weather follow-up publication

Live: https://novydhillon.github.io/Flock/dev2/. Runtime source `8408e74779c4716063007d166db13f76efa32b71`; Pages `617b4df8edf8193c924dd5c6ca7c8cae563eb79f`. Source CI [38794709512](https://github.com/novydhillon/Flock/actions/runs/38794709512) and Pages [38794867645](https://github.com/novydhillon/Flock/actions/runs/38794867645) completed successfully. All **17/17** live development files match the prepared build's SHA-256 hashes. The Pages comparison changes only `dev2/index.html` and replaces the main JavaScript bundle (`index-C6voS5Qb.js`); the legacy redirect and all unrelated Pages files are retained unchanged.

Implementation worktree commits: rain `0ce1fe1`, storm wildlife/audio `df28504`, puddle accumulation `102abe8`, route-placement follow-up `a22ce97`. Their integration and reviewed documentation have the same source tree as the published runtime source. The publication-evidence update itself is documentation only and does not change game bytes.

Latest accepted P2 release: Pages `cc13865`, source `b1fdac3`. On 15 October 2026 at approximately 10:56 America/Vancouver Novy accepted F-003/F-004/F-006/F-007/F-011/F-012/F-017/F-019/F-020/F-021/F-027. F-008/F-022/F-023/F-024 are reopened P1 work under F-040. The fixed-weather repair below is a new Review candidate; historical checkpoint scores/totals are retained for their own revisions.

## P0/P1 implementation batch — 14 October 2026

Medium-effort blind first passes scored gameplay **9.0/10** and technical **8.5/10**. Their follow-up checks of `f0a87a1` scored **9.4/10 gameplay** and **9.0/10 technical**, with no new confirmed defects. The P0 migration separately scored **9/10** and was published at canonical `/Flock/dev2/`. These are bounded source/headless implementation scores, not verified phone visual quality.

Final integrated checks pass **159/159 source tests**, release without QA (15 files, zero QA assets), development with QA (17 files, two QA assets), and generated documentation checks. The P1 development build is published at Pages `9346f26c5a145698b34e2c4504236c494023817d`; all 17 game files and the legacy redirect match live hashes. Source CI and native Pages publication succeeded. See [the validation runbook](validation/P0-P1.md). F-014 is Done by user confirmation on 14 October 2026; paths, bark and cutaways were subsequently accepted by the user on 14 October 2026.

The earlier review results below are retained as historical records.


The historical fresh blind-review retry scored **9.1/10 for technical implementation** and **8.6/10 for gameplay implementation** after fixes. Neither critic found a remaining confirmed blocking defect in the bounded recheck. The technical review reaches 9/10; the overall game experience remains unverified at that score. Actual phone appearance, sound balance, Safari gestures, touch scrolling, human campaign pacing and GPU performance remain open validation tasks.

Review packets excluded README, quality records, writer history and requested score thresholds. Fresh critics independently inspected source and exercised simulation, geometry and controller behavior. An earlier diagnostic gameplay review accidentally read historical scores; it is excluded from the blind final assessment.

| Review | Before fixes | Final | Confirmed issues addressed |
|---|---:|---:|---|
| Runtime diagnostic | 8.0 | — | Unattended goal admission, distant rendering workload |
| Fresh source/technical critic | 8.4 | 8.9 | Cohesion through fences/trees; unnecessary engine exports; singleton companion hold |
| Fresh gameplay critic | 8.4 | 8.7 | Drone treating an isolated singleton as a main herd |
| Fresh technical retry | 8.8 | 9.1 | Pending audio activation undoing pause; unbounded overdue music scheduling |
| Fresh gameplay retry | 8.2 | 8.6 | Default level-two bridge retrieval stall under the test controller |

The retry used two new critics with no earlier scores or writer context. The default second meadow initially left all eight sheep unsaved after 400 simulated seconds under the existing test controller. Widening only its first bridge from 8.5 m to 11.5 m lets the same unchanged controller deliver all eight in 17.2 seconds. At that historical snapshot, later early crossings remained 8.5 m, and the map, river and solid rails are retained.

Audio activation now uses generation checks so a later pause/disposal/request invalidates an older pending browser resume. Controller startup and sound enabling also respect the current game mode. Delayed music callbacks skip missed beats and cap work; the independent 60-second stall probe schedules one future musical step instead of 212 overdue steps.

The gameplay critic independently completed default levels 1–5 with the unchanged legitimate-input controller: 18.2, 17.2, 28.7, 38.7 and 208.0 simulated seconds. The larger jump at level five is a pacing concern for human playtesting, not proof of an impossible level or a measured human completion time.

Earlier review findings also drove repairs to dry bridge rail collision, rare seeded spawn clearance, companion clear-ground attendance, workshop focus restoration and wildlife avoidance of delivered animals/helpers. Ground buddies now detour around bridge ends. Cohesion and alignment respect physical barriers. Pip can call over low wood fences/bridge rails, while bodies, companion membership and goal admission use strict ground paths; barns, water and trees still shield Pip's call.

## Verified checks

- **93 automated tests passed at the blind-review retry snapshot.** They exercise actual simulation/profile logic, production controller code, real Three.js geometry/matrices, resource ownership and synthesized audio lifecycle.
- All routes across 100 default levels are physically traversed by cow-sized bodies. Independent sweeps found no blocked routes or unsafe spawns in 500 additional generated worlds. A separate 1,600-fixture spawn sweep verified the rare-seed repair.
- Full original flocks in levels 2, 3, 6, 10 and 16 are delivered across four directions by a bounded simulated player using ordinary dog inputs, safe bridge/pen circling and actual collision. No animal positions or saved flags are changed by that policy. This does not establish full-flock completion of every campaign level, route, seed or player strategy.
- Retry critics independently checked 800 and 3,000 generated worlds before the first-bridge widening, with no unsafe actual-radius spawns or cow-clearance route failures. The refreshed default campaign and first-bridge geometry regressions also pass after widening.
- Independent integration of actual controller and FarmAudio, with browser surfaces substituted, confirms menu/visibility pause during pending activation settles paused, with zero music schedulers and a ducked music gain. Ten audio lifecycle tests cover both completion orders, mute, disposal and delayed scheduling.
- Regression checks cover main-herd selection, isolated-straggler retrieval, fifteen-minute stationary holds, no unattended admission, clear attendance through barriers, singleton standby and reactivation, and exact level-10/20 companion gates with preserved legacy ownership.
- Renderer checks establish finite camera/pose matrices, conservative culling, visible shadow retention, exact articulated pose restoration, bounded scenery and deterministic disposal. Level-100 actor submissions are 238,604 triangles with the full flock visible, 80,712 in the tested split view and zero at a distant view. These are geometry/submission counts, not measured FPS or rendered pixels.
- Explicit geometry constructor references reduce production JavaScript from about 786 kB/212 kB gzip to 575 kB/154 kB gzip. The remaining Vite chunk-size warning is advisory; no runtime/font asset CDN is required.

## Verification boundary

DOM, Canvas, WebGL and WebAudio substitutes support headless checks. No approved browser/phone environment was available for rendered screenshots, real touchscreen interactions, listening or GPU profiling. The tests therefore do not prove visual polish, native Safari zoom/scroll behavior, perceived audio quality or mobile frame rate.

Device priorities are portrait readability and control feel, double-tap bark without page zoom, workshop scrolling, large-flock rendering/level-transition performance, and bird/weather balance through phone speakers. These checks remain necessary before claiming a verified 9/10 game experience.

## Documentation maintenance note — 14 October 2026

The later Restart Game revision added six controller regressions, bringing the source suite to 99 tests; its source CI passed. The historical review scores above were not rerun for that small feature. See [requirements](REQUIREMENTS.md), [system context](ARCHITECTURE.md) and [issue tracker](ISSUES.md) for implemented versus queued behavior. Documentation content/HTML reviews are recorded separately in `docs/REVIEW.md`; their scores do not rate the game itself.

## P0/P1 source batch — 14 October 2026

F-025 canonical migration is published and verified at Pages `baca95c7ba618d736730194b433254bf5058dd66`, serving https://novydhillon.github.io/Flock/dev2/. All 15 game files plus the legacy redirect matched intended hashes; 17 unrelated blobs remained unchanged. An independent blind medium review scored the bounded P0 migration **9/10**. That score concerns deployment migration only. The migration published the preceding game revision; the subsequent P1 release is recorded above.

At this historical source checkpoint, F-001/F-002/F-005/F-009/F-010/F-016/F-018 had source implementations in **Review**; all were subsequently accepted by the user on 14 October 2026. The new surface, world/goal, countdown/ledger, cutaway and QA tests support their source contracts. Final integrated totals, independent P1 findings and a separate P1 Pages release must be recorded after the integrated candidate is checked; none is inferred here. The old 93/99-test snapshots and 9.1/8.6 scores above remain historical.

Done: Novy confirmed F-014 on 14 October 2026 (America/Vancouver), after the QA-controls release at Pages `50128cdef86c47a383938cc0aac01a29e1f072d2`. This is user acceptance of real-phone controls, appearance and sound; device/browser details and measurements were not supplied. It does not close the separate visual issues or F-015 performance testing. Agent browser QA was skipped under the installed Sites guidance; no agent device test or GPU profiling is claimed. At that historical checkpoint all P2 work remained Open; current candidate statuses appear below.

See [P0/P1 validation and release runbook](validation/P0-P1.md) for source checkpoints, build modes, exact manual scenarios and publication boundaries.


## Bridge and barn follow-up — 14 October 2026 (Vancouver)

The bridge landing and coherent barn fade repairs are recorded in the [validation runbook](validation/P0-P1.md). Integrated source `185116a` passes 161/161 tests, including all five unchanged full-flock journeys; the expanded rendered-water quad/bevel coverage tests pass. Barn blind source review scored 9/10, with generated HTML freshness the only finding (regenerated during integration). Novy later accepted deployed F-005/F-016 on 14 October 2026 (Vancouver); F-014 was already Done by user confirmation.

Bridge follow-up blind review scored **9/10**, with 32/32 focused geometry, simulation and journey tests passing and no blocking defects. Full-flock delivery coverage remains five representative scenarios; route/body traversal covers all 100 default levels and representative seeded rotations. Both release and development artifact inspections pass. Generated HTML checks pass: 12 pages, 726 local links/anchors, 9 parsed diagrams and 4 DOM behavior tests.


### Node 22 CI follow-up

The first follow-up source CI (run 38678616308, source `c6e9303`) failed the level-16 exact-all journey at 49/50 although Node 24 and the blind source run passed. This was reproduced with the exact CI version, Node 22.23.3. `8df0fd5` corrects a physical-clearance mismatch: sheep previously planned with a .78 cow radius despite moving at .55, disconnecting valid sheep escape routes. The simulation now supplies each animal’s actual radius to the initial blocked-path test and bridge opening planner. A rotated sheep-start regression is valid at .55 but invalid at .78. No time, deck-length or test-policy tuning was retained. Node 22.23.3 full suite passes **162/162** (25.41 seconds); all five unchanged journeys also pass Node 24.19.0. Earlier 161-test evidence is the prior checkpoint, not the final CI result.

The clearance follow-up received a medium blind recheck at **9.5/10** with no defects found; the reviewer independently ran 33/33 focused checks on Node 22.23.3, including the previously failing level-16 full-flock journey. Both corrected build-mode inspections and regenerated documentation checks pass.


Latest bridge/barn follow-up: source `4d3cadc393c9feaedee4e579099110e25f459c31`, Pages `8a76de36bbb61ba824bc9371f85971667f786c35`. Node 22 CI [38679079215](https://github.com/novydhillon/Flock/actions/runs/38679079215) and native Pages [38679328953](https://github.com/novydhillon/Flock/actions/runs/38679328953) succeeded. All 17 game files plus legacy redirect match live SHA-256 hashes; 18 files outside `dev2/` remain unchanged. Final source suite: 162/162; barn blind review 9/10 and final bridge recheck 9.5/10. Novy accepted F-005/F-016 on 14 October 2026 (Vancouver); both are Done. F-014 remains Done.


## Final P1 user acceptance — 14 October 2026

Novy signed off all remaining P1 review items (F-001, F-002, F-009, F-010 and F-018) on 14 October 2026 at 21:10 America/Vancouver, following F-005/F-016 acceptance at 21:08. All P0 and P1 issues are Done. Acceptance applies to the deployed development build at Pages `8a76de36bbb61ba824bc9371f85971667f786c35`, including the approved temporarily hidden animal-position controls. This is user acceptance; it does not expand the measured scope of source tests or close P2/P3 work.


## F-028 delivered-animal roaming

Source `637111e` adds confined, saved-only goal motion. Node 22.23.3 full suite passes 164/164; Node 24.19.0 unchanged full-flock journeys pass 5/5. This is the historical source-review checkpoint; the later integrated build and user acceptance are recorded below. Existing P0/P1 acceptance remains Done. See the validation runbook for boundaries and manual scenarios.

F-028 blind medium review scored **9.5/10** with no actionable defects. The reviewer independently passed the 164-test Node 22 suite and 30,900 per-step whole-body containment checks across rotated goals, mixed sheep/cows and crowded entrance groups with zero escapes. Integration added per-step assertions during recovery/completed roaming and a 12-fixture crowded entrance regression (22/22 focused simulation/delivery checks pass). The final full-suite count includes one additional test.

Final F-028 integrated validation: **165/165** tests pass on Node 22.23.3 (27.20 seconds), including the additional crowded mixed-species entrance test and per-step confinement assertions. Release excludes QA; development includes QA (17 files); documentation checks pass (12 pages, 756 local links/anchors, 9 diagrams and 4 DOM behavior tests).


## F-028 verified publication — 14 October 2026 (Vancouver)

F-028 is deployed at Pages `639a9b45608fa0ad6aaa8189dd91dd7ba24b082d` from source `e03ba169be760a4031d2b57887f0d6998eb07187`. Source CI [38681252991](https://github.com/novydhillon/Flock/actions/runs/38681252991) and native Pages [38681359737](https://github.com/novydhillon/Flock/actions/runs/38681359737) succeeded. All 17 game files plus the legacy redirect match live SHA-256 hashes; 18 files outside `dev2/` remain unchanged. Final suite: 165/165 on Node 22.23.3; blind review 9.5/10, with zero escapes in 30,900 independent per-step containment checks. Novy accepted this deployed build on 15 October 2026 at 00:28 America/Vancouver. This acceptance does not expand the recorded scope of source tests or device evidence; previous P0/P1 sign-offs stay Done.

Documentation-only commits after this source revision do not change the deployed game bytes.

## P2 source candidate — 15 October 2026

This is new candidate work, not a revision of prior P0/P1 sign-offs. F-003/F-004/F-006/F-007/F-008/F-011/F-012/F-017/F-019/F-020/F-021/F-022/F-023/F-024/F-027 are in Review. F-013 stays Open pending human level-5 pacing attempts; F-015 mobile GPU profiling and F-026 Quit remain Open.

Development used separate gates/world/UI, straggler simulation, vegetation/tail, wildlife, weather/audio and water-effects workstreams. The least expensive suitable models were used: Luna at medium effort for bounded implementation/reviews, with Sol at medium for the shared weather/audio lifecycle and gate geometry. Reviewers received requirements and candidate code without author reasoning or earlier scores. Subsequent checks by the same critic are follow-up validation, not a new blind first pass.

| Independent source review | Outcome / repairs |
| --- | --- |
| Gates and stone walls | 8/10; live state, nearby interaction, physical/signal collision, reset and disposal checked. A suggested masonry overlap was withdrawn after correcting interval algebra. |
| Weather/clouds/audio | 8/10 after shared-state integration; deterministic single stepping, pause/mute/restart, cloud alpha and bounded lightning/thunder. Added finite light/sky/fog renderer assertions. |
| Water and ground wetness | 7/10 initially; fixed dry-sky puddle splashes, local bend flow UVs and entire puddle footprint safety. Follow-up 8.5/10; 800 puddles across 100 default levels, 204,800 circumference checks, zero unsafe footprints. Eight real rotated-river overlays had finite local UVs and disposed owned clones without disposing sources. |
| Stragglers | Initial review identified premature bolt termination on reaching a short waypoint; `8ac64a8` fixes it with a duration-scaled target and integrated seed-6 regression. Follow-up 9/10. Levels 8/17 thresholds, floor(15%) cohort, fixed five-second opportunity cadence, pressure suppression and saved exclusion checked. |
| Wildlife | Initial review identified light-weather hiding, frozen shelters, barn-wall permeability, circular movement, blocked waypoints and malformed merged geometry; all repaired in `a6e8cb2`; follow-up 8.2/10. Integration then corrected real `material:stone` descriptors and added a direct threshold hysteresis test. |
| Vegetation/tail | 8.5/10 source review; 100-level bush probe checked 8,569 safe shrubs. Integration then moved the dedicated light from a mistaken front-body position to the actual wagging tail tip and added a parent/world-position regression; follow-up rechecked the actual tail attachment at `d8c7f32`: 8.5/10, with 17/17 Node 22 vegetation/render checks. The first reviewer missed the attachment error; the later score applies to the corrected tail. |

The first integrated Node 24 run at `b431cfe` passed 201/201 tests. Its source-level renderer budget includes fixed inactive water-effect pool slots and detailed wildlife batches; object cap is 310, submitted draw cap remains 170, and nearby scenery triangle cap remains 45,000. These caps are regression checks, not device FPS measurements. New renderer tests exercise a live gate panel, blue/red bark light, weather pause and material disposal. Local arc-length UV and persistent-puddle tests cover the water repairs.

No supported browser-control capability is available in this environment. Browser QA is skipped under the installed Sites skill; Three.js scene construction, geometry, matrices and DOM substitutes do not establish rendered appearance, native touch behavior or listening quality. Fresh phone testing should cover rabbit/squirrel gait, larger-tree visibility, cloud layering, wet ground/puddles, thunder timing and gate touch controls. Earlier F-014 acceptance applies to the earlier build and is not new P2 acceptance.


### Final integration regression

The first Node 22 full run found 205/206 passing: the unchanged public level-16 journey delivered only 46/50. Isolation identified stone physical/signal geometry exposing an existing enclosure-side/far-wall navigation weakness, rather than the new wander rolls. `30abd2a` threads real radius through route fallback and adds collision-checked enclosure-corner/entrance nodes for nearby pressured bodies. Five unchanged journeys then passed on both Node 22.23.3 and Node 24.19.0, plus 50 focused world/gate/companion/simulation checks. No timer, input policy, stone collision/signal or reward relaxation was used. Final full-suite totals and publication evidence follow below.


### Final source evidence and handoff

- Full integrated suites at `30abd2a`: **211/211 on Node 22.23.3 and Node 24.19.0**. The subsequent hidden-intro/results presentation-time guard adds one production-controller regression; focused UI/QA checks pass. CI runs the final aggregate after publication to the source branch.
- Independent navigation follow-up: **8.3/10**, 25 focused checks and 96 generated enclosure approach fixtures across levels 1–100, two seeds, sheep/cow clearances and three exterior sides. All reached the real entrance using collision-clear waypoints. This is local player-assisted routing, not an autonomous-detour guarantee for arbitrary constant pressure.
- Wildlife follow-ups retain 8.2/10 source assessment; actual generated `material:stone` boundaries were independently rechecked after correcting the initial synthetic fixture. Shelter now has explicit .12 hysteresis and a direct threshold-oscillation regression.
- Final release and development builds pass QA-exclusion/inclusion checks: 15 release files with no QA assets; 17 development files with two QA assets. The existing large-main-chunk advisory remains; F-015 performance measurement is still Open.

All implemented P2 items remain Review pending Novy's acceptance. No new P0/P1 item is left open by this batch. Human level-5 pacing remains F-013. The source and Pages branches are published separately; publication IDs/live hash evidence follow only after verification.

Documentation follow-up: **8.5/10**, with the stale F-014 Blocked sentence corrected to prior user acceptance and unavailable independent P2 device validation. HTML generation and checks pass: 12 pages, 783 links/anchors, nine parsed Mermaid diagrams and four DOM behavior checks.


## Verified P2 development publication — 15 October 2026

Live game: **https://novydhillon.github.io/Flock/dev2/**. Runtime source snapshot `b1fdac3697de6dd597cfb6f98e8d1fbbda1be5a8`; Pages `cc138652cc55f5c88cc36c336f575aa26120ebee`. Source CI [38703120954](https://github.com/novydhillon/Flock/actions/runs/38703120954) and native Pages [38703297030](https://github.com/novydhillon/Flock/actions/runs/38703297030) both succeeded. All 17 development-game files plus the legacy redirect match live SHA-256 hashes; all 18 blobs outside `dev2/` are unchanged. Main runtime asset: `assets/index-BPDTiqRn.js`.

Final source CI passes the 212-test aggregate, generated-documentation checks and both release/development build checks. Local full suites before the final hidden-tab guard passed 211/211 on Node 22 and Node 24; the guard's focused UI/QA tests passed 28/28, and final CI includes its added regression. Blind source reviews meet the 8/10 target; documentation follow-up is 8.5/10. No fresh rendered/device acceptance is claimed.

Implemented P2 items stay **Review** for Novy's acceptance. F-013 remains **Open** pending human level-5 pacing; F-015/F-026 remain **Open** P3 work. Previous P0/P1 and F-028/F-029 sign-offs remain Done. Workstream SHAs elsewhere in this record identify local development evidence; the published runtime snapshot above contains their integrated code. The following documentation-only commit does not change the verified runtime build.


## Fixed-weather P1 repair — 15 October 2026

User feedback supersedes the changing-weather/snow implementation. Eleven original P2 features are accepted; new F-030–F-039 changes remain queued and are not included in this repair. F-008/F-022/F-023/F-024/F-040 are Review candidates pending fresh phone weather acceptance.

The candidate selects fixed weather once per level, removes snow, adds visible line rain and correct orthographic cloud/rain placement, starts heavy/storm levels wet, and labels weather in the mission panel. Public levels 9/16/24 reliably show light/heavy/storm; the later thresholds and other-level seeded weights are source tuning choices. Storm flashes start after 8–12 seconds with delayed thunder and a 24-second spacing. There is no within-level tier transition.

Parallel work used `Flock-weather-state` (`58b563c`) and `Flock-visible-weather` / `Flock-weather-projection` (`2afe4de`, `7b4b515`), with root integrating wet-ground/label/lifecycle feedback (`8afd27e`). Developers used Luna medium for bounded visual implementation and Sol medium for state/audio; an independent Sol medium geometry critic was appropriate for orthographic projection, and a Luna medium critic reviewed state/lifecycle integration. Both began without author reasoning or prior scores.

| Independent review | Result and confirmed repairs |
| --- | --- |
| Fixed weather/state/audio/integration | **8/10**. Focused 88-test source run passes; deterministic fixed fields, unlock/legacy aliases, no snow, first-frame wetness/labels, pause/hidden behavior and replay-safe thunder checked. |
| Visibility geometry | **8.3/10**. Corrected perspective-style footprint math for an orthographic camera, rain initially centered at the camera eye, first-camera rain collapsed into one column, static/disconnected shadows, excessive portrait overlap and transparent double-pass submissions. |

The geometry critic independently intersected actual camera rays with puff planes and sampled the texture alpha: discrete cloud patches occurred in portrait/landscape across small/large worlds and camera travel; final sampled average aggregate alpha was 3.4–4.5%, with 24–30% of sampled viewport positions above 6%. Initial rain distributes all 96/176/256 drops across the view and its projected strokes fall downward. Clouds/shadows track motion, pause matrices freeze, and repeated disposal releases owned resources. Two single-pass cloud/shadow batches plus one rain submission keep the added draw count bounded. A follow-up normalized signed cloud drift and added a 20-minute tile-wrap regression.

Full source suites: **219/219 Node 24** before the added wrap regression, then **220/220 Node 22.23.3** including it; focused projection/weather checks also pass. Release/development artifact checks pass (no QA in release; QA included in dev). Generated Markdown/HTML documentation is refreshed and checked. Browser/GPU/pixel/listening verification is unavailable here, so these source/geometry scores are not a claim of perceived weather quality. Novy should retest 9/16/24 on the phone before acceptance. Publication evidence follows after the live build is verified.

Documentation follow-up for the acceptance/weather repair: **8/10**, with 12 generated pages, 828 links/anchors, nine diagrams and four DOM checks passing. Prior deployed behavior is separated from the fixed-weather source candidate, and the 11 accepted P2 items remain Done.


## Verified fixed-weather publication — 15 October 2026

Live candidate: **https://novydhillon.github.io/Flock/dev2/**. Runtime source `878efee1db3c781c7d60c3f0f620ed6a9467dbcd`; Pages `27b1bf535c09642f86d5a6ce032b88906eb695c5`. Source CI [38783755137](https://github.com/novydhillon/Flock/actions/runs/38783755137) and native Pages [38783945804](https://github.com/novydhillon/Flock/actions/runs/38783945804) succeeded. All 17 game files plus legacy redirect match live SHA-256 hashes; 18 blobs outside `dev2/` remain unchanged. Main runtime asset: `assets/index-BLaryV1o.js`.

Final source CI passes 220 tests, documentation checks and release/development QA-exclusion/inclusion builds. Independent source and geometry reviews are 8/10 and 8.3/10; documentation is 8/10. Source publication does not constitute phone appearance/audio acceptance.

The 11 previously approved P2 issues remain Done. F-030–F-039 remain queued Open; F-008/F-022/F-023/F-024/F-040 stay Review pending the new weather test. Public QA levels 9/16/24 demonstrate fixed light/heavy/storm conditions without waiting for a transition; storm lightning starts after 8–12 unpaused presentation seconds. No snow is rendered. The thresholds 16/24 remain tuning choices. Development workstream SHAs identify local evidence; the runtime snapshot above contains the integrated source. The following evidence-only documentation commit does not change the verified build.


## Temporary cloud removal and F-041 — 15 October 2026

At 11:22 Vancouver Novy requested removing clouds for now. F-008 is Deferred: the runtime renderer removes its `Atmosphere` import, construction, level setup and update calls, so both visible clouds and their shadows allocate no resources or draw. The dormant module and standalone tests remain for future reference. Fixed rain/storm type, sky/fog/daylight, lightning/thunder, wetness and wildlife remain active. Focused scene regression checks cover repeated level construction without cloud/shadow objects and retain rain geometry. Independent review and publication evidence follow below.

At 11:23 Vancouver Novy added F-041 (P2): wanderers/bolters should use their new position for local idle/wandering instead of returning through normal herd cohesion. The tracker, requirements and gameplay context record it as Open; no wandering/simulation code is changed by this cloud-removal release.

Cloud removal validation: source commit `d01f3c3` removes only renderer integration and updates the scene regression. All 13 renderer tests pass, including deterministic rain fixtures at indexes 8/23 (public levels 9/24). Independent blind source review: **8/10**, no substantive defect; rain, wetness and storm lighting hooks are retained. No rendered/browser check is claimed.

## Thunder reverb follow-up - 15 October 2026, 12:56 Vancouver

Thunder now has five finite irregular reflections (71-397 ms), a tapered envelope and total duration 2.9 seconds. Reflections finish before source cleanup, and all nodes are disconnected on normal completion, mute, pause, level change and disposal. The shared storm state flashes first, followed by its paired thunder after 0.8-1.6 seconds. Focused audio/weather checks pass 23/23, including a real shared-weather flash-before-rumble regression; listening acceptance remains pending.

## Deeper variable thunder - 15 October 2026, 13:21 Vancouver

Supersedes the fixed 2.9-second thunder tuning above. Each lightning event chooses a 3-5 second rumble duration. The lowpass falls from 400 to 85 Hz with Q .35 and a 120 ms attack to reduce metallic high frequencies. Fade and five reflection delays scale together; their full tail ends at 98% of duration before cleanup. Lightning-first timing and pause/mute/disposal behavior are retained. Focused audio/weather tests pass 24/24, including minimum/middle/maximum variation and tail-completion checks. Headless tests do not establish perceived pitch or speaker quality.

## Audio level and lightning brightness - 15 October 2026, 13:33 Vancouver

The shared master audio gain rises from .65 to .975 (+50% amplitude) at startup and unmute, scaling music, effects and ambience together while preserving their balance. Lightning peak increases from .38 to .90 with the same .22-second fade and 24-second event cadence. Thunder retains its 3-5 second variable deep rumble and lightning-first timing. Device loudness/appearance remain listening/visual acceptance items.
