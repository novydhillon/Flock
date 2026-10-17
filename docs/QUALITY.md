# Flock dev2 revision quality record

## User sign-off - 15 October 2026, 16:34 Vancouver

Novy explicitly signed off all pending Review items: **F-022, F-023, F-024 and F-040 are Done**. Acceptance applies to the live development build at Pages `bf26e67732434e902fdbaef10cac72d6814c33b0`, runtime source `1909c87bc1f70c4e53f4b38d64beaa2d4bb6d3aa`, including full-view/angled rain, no storm wildlife, accumulating puddles, deeper variable 3-5 second reverberant thunder after lightning, the 50% master volume increase and brighter lightning. This is user acceptance; historical headless checks and device-performance evidence retain their original limits. **At that weather sign-off checkpoint no items remained in Review.** The later flock-behavior batch F-035/F-037/F-039/F-041 is now Review. Open queued items remain Open; F-008 clouds remain Deferred. Older Review/pending wording below describes earlier checkpoints and is superseded by this sign-off. Documentation only; game bytes are unchanged.


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

## Rain-volume follow-up - 15 October 2026, 16:42 Vancouver

Adjust only rain-loop gain: gentle rain uses .50 of its previous level, heavy rain .85, storm 1.00. Focused audio/weather suite passes 25/25, including actual public 9/16/24 states, monotonic tier volume, exact preserved storm gain, loop reuse and mute/unmute. Novy approved this rain-volume tuning on 15 October 2026 at 16:46 America/Vancouver and requested a commit. Accepted runtime source: `a26b8aa9838da25e36f2dc22abcef1f861048f2c`; Pages: `107f78237c32f546dfede3276b8432166b372280`. All 17 live files were verified. This is user acceptance of the new mix; the earlier sign-offs remain valid.

## Flock-behavior batch - 15 October 2026

F-035/F-037/F-039/F-041 implement the clarified per-level 20% undelivered cohort, independent seeded 5-8s checks, 20%/25% late wander odds, stepwise bolt duration bands, and calm local settling. Implemented together because their scheduling/state/collision paths overlap. Independent source reviewer used the inherited Sol model at high effort; documentation review used Luna at medium effort. Reviewers received requirements/source without author reasoning or prior scores for their first passes.

Source review reached **9/10** after fixing zero-time mutation. Independent probes checked exact timing schedules at 10/20/30/60Hz, natural 120s behavior on public8/17/40/70/71, local radius/collision, fresh-state reset, player/helper interruption, and no unattended scoring. Follow-up verified same-tick cohort shrink across39 delivery fixtures and all23 focused wandering/companion tests. Five unchanged full-flock journeys pass.

Companion force-isolation fixtures disable spontaneous opportunities so their exact trajectory comparisons measure helper forces. Separate excursion/helper integration tests remain enabled, and the ordinary-input full-flock journeys are unchanged. The blocked-attendance fixture now initializes outside the goal on a positive timestep before restoring entrance positions; zero-time calls freeze the entire state. No timer, route, collision, reward or journey-controller relaxation was used.

Documentation review reached **9/10** after correcting the old summary matrix and scoping weather-only historical sign-offs. Both release/development artifact checks pass (15 release files, zero QA;17 development files,two QA). Generated documentation checks pass. New flock items remain Review for player gameplay/pacing acceptance; no rendered/device test or human completion-time claim is made.

### Verified flock-behavior publication

Runtime source `41465691e7818d9dceaccd612bcd2779e0560b34`; Pages `6b612619c31e6786c940a065d07b4a05b2fc877c`. Source CI [38829202688](https://github.com/novydhillon/Flock/actions/runs/38829202688) and Pages [38829326037](https://github.com/novydhillon/Flock/actions/runs/38829326037) succeeded. Final integrated suite passes **234/234**. All **17/17** live development files match the prepared build SHA-256 hashes. Only dev2/index.html and the main runtime bundle changed; unrelated Pages content and the legacy redirect are retained. New runtime asset: `index-DQMUXGHF.js`. F-035/F-037/F-039/F-041 remain Review pending user gameplay acceptance; this evidence-only documentation update changes no game bytes.

## QA flock debug validation - 15 October 2026

The single QA debug toggle provides a one-decimal numeric next-eligible-check countdown above Woof, with subtle yellow active-wander/red active-bolt instance tints. All237 source tests pass, including actual Three.js instance-color mapping through compacted order changes, saved exclusion, neutralizing offscreen slots on disable/destroy, read-only countdown selection, pause/resume, level replacement, and QA/controller integration. Both release and development artifact checks pass: the release has no QA debug signatures/assets; development includes them. Documentation checks pass. No rendered/device screenshot or real-touch appearance validation is claimed; the prior flock-behavior items remain Review.

### Verified QA-debug publication

Runtime source `2070b016adaa554f0e94670f1d17d5562face3ff`; Pages `d3276cd6cdefff481c258965de146000d4913ec3`. Source CI [38830952927](https://github.com/novydhillon/Flock/actions/runs/38830952927) and Pages [38831086452](https://github.com/novydhillon/Flock/actions/runs/38831086452) succeeded. All17 live development files match build SHA-256 hashes. Only dev2 entry/main/QA assets changed; unrelated Pages content and legacy redirect retained. No gameplay tuning changed; new QA visual presentation remains subject to player feedback.

## QA tint visibility and local-settling recheck - 15 October 2026, 17:52 Vancouver

The earlier .72/.78 color multipliers were subtle and active-only, ending after a short excursion. Stronger yellow/red multipliers now remain through that animal's original next-check deadline, including settling/herding before the deadline. A QA-only WeakMap records selection kind/deadline separately from simulation; rescheduling cannot extend an old tint. New selection refreshes it, delivery clears it, and disable/destroy neutralizes every instance slot.

Natural generated-level probes at public8/17/41/71 run120 simulated seconds each, observing real seeded wander and bolt events without injecting states. Every recorded local home remains fixed, animals stay within3m with valid body collision, no new excursion starts after settling without herding, and no unattended delivery occurs. No production settling defect was found in these bounded scenarios; actual device perception remains unverified.

## QA workshop level-gate validation - 15 October 2026

QA jumps previously changed the meadow without changing the campaign-based shop gate. Availability and atomic purchase now share an explicit tested public level in QA. Tests cover all 18 upgrade tier gates at the level boundary and one bolt below/exact price, plus real controller/editor/shop flows: jump to level 20, purchase Buddy dog for 600 bolts, reject unaffordable purchases, add exactly 80 bolts and buy speed, jump back to level 1 despite later completion history, and buy Buddy tier 2 only at level 24. Normal-save isolation is checked.

Validation: 240/240 source tests pass. Release artifact exclusion, development QA inclusion, and generated documentation checks pass.


## Buddy behavior tiers - 15 October 2026

F-046 separates Buddy from the drone's main-herd hold logic. Buddy uses measured flock velocity for rear herding, chooses the smaller flock from tier 2, and retrieves wanderers/bolters/settled strays to the nearest connected group from tier 3. Autonomous bark has its own simulation-time cooldown, audio event, ground ring and dedicated red tail light. Existing unlock/cost/save/admission contracts remain intact.

Focused verification includes cardinal travel, a full reversal, idle/remote isolation, split-size ties and merging, tier activation at public 20/24/28, nearest-group retrieval for all excursion states, saved/missing targets, wall/river signal blocking, a real off-axis bridge retrieval alongside a holding drone, cow body clearance, bark cadence/pause/reset, controller audio/cooldown independence, and tail/ring lifecycle after gameplay ends. A sustained cohort-eligible bolter probe caught an initial circling defect: Buddy followed beside the running stray without gaining a useful rear position. Interception lead and wider circling fix it; the regression now requires interruption before bolt expiry and actual reunion. Direction reversal also has a regression against a stuck-front smoothing failure.

Validation uses source/headless simulation, actual Three.js geometry with a substituted GPU, and controller DOM/audio substitutes. No independent blind reviewer, rendered browser/phone play, audio listening or device frame-rate evidence is claimed. F-046 remains Review for user acceptance.

Final local validation: **254/254 source tests pass**, including 12 dedicated Buddy scenarios and the unchanged journey controller. Release artifact check passes with 15 files and no QA assets; development artifact check passes with 17 files and two QA assets. All 12 documentation pages, local links/anchors, nine Mermaid sources and four documentation DOM tests pass. Publication evidence follows separately.


### Verified Buddy behavior publication

Runtime source `d557d92ce57353a4c24b7980fa2d4fb1cb5081c4`; Pages `c30ca36cc263de44630fea06c2ea25e6aa06e49b`. Source CI [38837775933](https://github.com/novydhillon/Flock/actions/runs/38837775933) and native Pages [38837956296](https://github.com/novydhillon/Flock/actions/runs/38837956296) succeeded. All **17/17** live development files at [Flock/dev2](https://novydhillon.github.io/Flock/dev2/) match the checked local build SHA-256 hashes. Only the entry HTML and main runtime bundle changed; all 18 unrelated Pages files, including the legacy redirect, are preserved. Runtime asset: `index-CPSy1nTr.js`. Existing CI independently ran the 254 source tests, documentation checks and both build mode checks. F-046 remains **Review** for user gameplay acceptance; public QA 20/24/28 exercise the three Buddy tiers. This publication record changes documentation only.


## Buddy navigation, turning, split groups and local passage follow-up

User testing of the first F-046 release found a tree stall and rapid opposite-facing flicker. The user also requested independent split flocks and tier-2 bridge/goal guidance. Repairs add a cached tree visibility graph with actual body clearance, keep one circling side, limit travel/work turns to 1.8rad/s and movement/facing turns to 2.8rad/s, and render simulation heading. Tier 2 commits to the local crossing/entrance and retains its remaining tail, including a final singleton; tier 3 also uses tree detours while retrieving.

An initial attempt to limit all flock cohesion to 6.5m weakened connected-herd stability and failed the tutorial and level-16 journey. The final change retains 18m visible-neighbor forces **inside each 6.5m-linked component**, and removes all attraction/alignment between disconnected groups. The original tutorial and all five full-flock journey tests pass without controller, time-limit, scoring or collision changes. Split pairs/singletons are also checked against independently simulated groups for exact trajectory equality over 60s.

Final source suite: **263/263 tests pass**. New focused scenarios verify on/off-road tree detours with adjacent trunks, a blocked ideal rear position resolved to nearby usable ground, actual Buddy/cow ground clearance, jitter/reversal turn-rate bounds and pause, tier-2 off-axis bridge completion, three rotated goal types with 1/3 remaining sheep, local goal guidance without unattended admission, cow retrieval around a trunk, and renderer heading independent of tiny opposite displacements. The expanded Buddy suite has 20 scenarios. Documentation checks validate 12 pages, local links, nine diagrams and four DOM behavior checks. Build/publication results are recorded separately.

These are source/headless tests with substituted rendering/audio interfaces; no independent blind review, real phone rendering, device performance, human pacing or listening evidence is claimed. F-046 remains Review for user play acceptance. F-047 stays queued; no second Buddy is introduced.

Follow-up artifact checks pass: release has 15 files and no QA assets; development has 17 files including two QA assets. The intended development build is prepared for publication.

### Verified Buddy navigation follow-up publication

Published 15 October 2026 after resuming at 22:16 Vancouver. Runtime source `25c77ff05552c44e31df843631b9a464bcab9772`; Pages `e175cc0d3339988795139a1cd5cd8885838b599b`. Source CI [38840591441](https://github.com/novydhillon/Flock/actions/runs/38840591441) and native Pages [38854983832](https://github.com/novydhillon/Flock/actions/runs/38854983832) succeeded. All **17/17** live files match the checked development build SHA-256 hashes, and the canonical entry HTML without a cache-busting query also matches. Only the main runtime bundle and entry HTML changed; all 18 unrelated Pages files and the legacy redirect are preserved. New runtime asset: `index-D3LKClkf.js`. All 263 source tests, both artifact modes and documentation checks pass. F-046 remains **Review** for user gameplay/device acceptance. This evidence update changes documentation only.


## Forward pressure, gentler cohesion, tier-2 bark and committed bridge traversal

The 15 October 22:33-22:39 user follow-ups ask leading animals to keep moving with the flock, clarify back/side pushing pressure, lower cohesion, move Buddy barking to tier 2, and complete bridge crossings. Cohesion now uses 70% of its previous magnitude. Connected-group motion/actual dog pressure supply a travel direction; leading animals reject backward cohesion, and those outside direct Pip/Buddy range receive only missing forward flow. Direct pressure is not doubled, direct reversal remains possible, and split groups receive no remote push.

New `bridge-crossing.js` commits walking sheep/cows to a body-clear lane and usable far bank without goal steering. It suppresses spontaneous excursions on deck and overrides backward cohesion/dog pressure until the whole body reaches the far bank. A held animal's drone anchor updates on arrival. Idle/nearby-bank animals do not auto-launch. Physical collisions, pause/reset, saved-animal confinement and player-attended admission remain enforced. Tier 2 uses the established bark cadence, sound, ring and red tail independently of Pip; individual retrieval remains tier 3.

**274/274 source tests pass**. Six new flow scenarios cover four travel axes, initially stationary fronts outside Pip range receiving rear pressure, side pressure, weaker cohesion with retained upgrade benefit, intentional reversal/collision/pause, split isolation and no unattended scoring. Four bridge scenarios cover sheep/cows, both directions and three rotations, full-body far-bank arrival, held-flock reanchoring, pause/reset, opposing dog pressure and idle/bank exclusions. Tier gates and tier-2 controller audio/ring/cooldown routing are checked.

All five existing journey controllers, seeds, time limits and full-flock assertions remain unchanged and pass. The tutorial's old centroid-only input policy depended on animals returning toward their centroid, which this request explicitly changes. Its test now collects the furthest animal with ordinary Pip inputs and existing ground navigation, retaining the same 60s limit and completion assertion; it completes all five in 12.8 simulated seconds. No animal position/velocity, score, collision or timer is edited by this controller. These are policy simulations, not human completion-time evidence. No independent blind review or new phone/render/listening validation is claimed; changes stay Review for user acceptance.


### Verified forward-flow and bridge-completion publication

Runtime source `bf30342767e34c12bbcf239d8fa4854417fd5990`; Pages `cf41bd1f78fe825dee30205f0ff051ba501fa245`. Source CI [38857616495](https://github.com/novydhillon/Flock/actions/runs/38857616495) and native Pages [38857820963](https://github.com/novydhillon/Flock/actions/runs/38857820963) succeeded. All **17/17** live development files match the tested build SHA-256 hashes, and the canonical entry HTML without a query also matches. Only the entry HTML and main runtime bundle changed; all 18 unrelated Pages files, including the legacy redirect, are unchanged. Runtime asset: `index-DkoOvBGa.js`. The 274-test suite, release/development artifact checks and generated documentation checks pass. F-046 remains **Review** for user gameplay/device acceptance; F-048 stays Open and queued. This evidence update changes documentation only.


## Verified production root release - 15 October 2026

Merged development `5b950e3f8dc20b8928f2f2066ec2aabf7e250871` into `main` at `00ff015dc0363433915e3ea816349cbdf65b2ac3`, retaining the original 2D URL information and updating production instructions. Pages `6979d97fab9e4ceffed8b9c1509117ac921a4932` serves the production game at [Flock](https://novydhillon.github.io/Flock/). Main source CI [38859559608](https://github.com/novydhillon/Flock/actions/runs/38859559608) and native Pages [38859708558](https://github.com/novydhillon/Flock/actions/runs/38859708558) succeeded. All **274/274 tests**, generated documentation and release QA-exclusion checks pass. All **15/15** live root files match local SHA-256 hashes; canonical root HTML also matches. The release has no QA JavaScript/CSS or menu signatures. Asset: `index-B-ELN4HK.js`. All 34 pre-existing Pages files other than the intentionally replaced root redirect are preserved, including every `dev2/` and legacy `flock/` byte. No fresh device/render/listening validation is claimed.

Main packaging now stops after the release build and names its artifact `flock-production-standalone`; only non-main builds proceed to the QA development artifact. This enforces the user's production QA-menu exclusion for subsequent builds. This follow-up changes workflow/documentation only; deployed runtime bytes remain from the merge above.

### F-051 compact HUD source validation

The compact HUD batch passes all 275 source tests, including a controller regression for final-tip expiry, help reopening/hiding, and next-meadow reset. Production build and release QA-exclusion check pass (15 files, zero QA assets). Generated documentation checks pass. UI geometry and native touch presentation have not been verified on a phone; F-051 remains Review. Development publication uses source `20e39cf`; see the publication record below.


F-051 evidence: implementation commit `1e000ce` on `flock_3D_chatgpt-work`; controller/markup/styles are in `src/main.js`, `index.html`, `src/style.css`; the goal triangle is in `src/render.js`. `tests/ui.test.js` exercises tip expiry, reopening, hiding and meadow reset. `npm test` passes 275 tests; `npm run build` plus the release mode check passes with zero QA assets, and `npm run build:dev` plus the development mode check passes with two QA assets. Generated documentation checks pass. These are source/DOM/build checks; there is no dedicated pointer render regression or native phone evidence for halo placement or portrait usability.

### Verified F-051 development publication

Reviewed runtime source `20e39cfb074740a7066ea210682dc4526fc18b75` on `flock_3D_chatgpt-work`; Pages `9da398dc4baee26640227fd9915ab15b00b5663e`. Source CI [38862440050](https://github.com/novydhillon/Flock/actions/runs/38862440050) and native Pages [38862562893](https://github.com/novydhillon/Flock/actions/runs/38862562893) succeeded. All **17/17** development artifacts match local SHA-256 hashes, including canonical HTML fetched without a query. All **32** tracked files outside `dev2/` retain their original blob hashes, including the production root game. Blind source review **9.3/10**; documentation review **8/10**, follow-up **9/10** after evidence/limitation fixes. Both critics used `gpt-6-luna`, medium effort, with independent review packets. All 275 regressions, `npm run docs:check`, `npm run build` with `node scripts/check-build-mode.mjs release`, and `npm run build:dev` with `node scripts/check-build-mode.mjs development` pass. Exact phone layout/touch/pointer appearance remains pending; F-051 stays Review. This final documentation update changes no deployed runtime bytes.

### F-051 tip-02 skipped-display repair

An early saved animal satisfied two independent tutorial transitions in one frame, immediately replacing tip 02 with tip 03. Mutually exclusive transitions now preserve the initial five-second tip and full 14-second intervals for tips 02 and 03, independent of saved count. The controller regression holds an early delivery throughout, checks each interval, pause/resume, final hide/help reopening and next-meadow reset. Implementation and independent blind review used `gpt-6-luna` at medium effort; review **9.4/10**, no source defects, 29/29 focused tests independently passed. Native phone rendering remains unverified; F-051 remains Review.

Tip-02 publication: runtime source `610fc69decc25eed4ae124ff98d5810178148d6a`; Pages `132ede4b6eea6724fadf0b936a955501b30d219e`. Source CI [38863347943](https://github.com/novydhillon/Flock/actions/runs/38863347943) and native Pages [38863505048](https://github.com/novydhillon/Flock/actions/runs/38863505048) succeeded. Full regression 275/275, generated documentation checks and release/development mode checks pass. The Pages tree changes only dev2 entry and runtime; all 32 files outside dev2 retain original blob hashes. Live verification is recorded after final deployment below.

Final tip-02 live check after successful Pages deployment: **17/17** artifacts match the local build SHA-256 hashes; canonical `/Flock/dev2/` HTML without a query also matches. Initial pre-deployment checks correctly saw the previous entry/absent new bundle; the completed-deployment check has no mismatches. No phone-rendering claim follows from these byte checks.

### F-051 reopened tips cycle

Reopened help now resets to 01 and cycles the applicable list every 14 active gameplay seconds, wrapping to 01 until dismissed. Shared `tipsFor` text feeds both initial and manual sequences. The initial tutorial still displays its first tip for five seconds, then subsequent tips for 14 seconds and hides at the end. Two new controller tests cover complete manual wraparound and pause/resume/close/reopen reset. Implementation and fresh independent review used `gpt-6-luna`, medium effort. Initial source review 9/10 flagged two test expectations at timer boundaries; assertions now cross boundaries by 0.1s and the pause case correctly totals 14.1 active seconds. Follow-up 10/10 with all 31 focused UI tests passing. These tests use synthetic frames, not native phone rendering.

Reopened-loop verified publication: runtime source `24f77f5253c18e3717d16e8985372d0d1f3880ec` on `flock_3D_chatgpt-work`; Pages `199c94ef537801dc071b169f3e5a584d20ec069f`. Source CI [38864363675](https://github.com/novydhillon/Flock/actions/runs/38864363675) and Pages [38864540098](https://github.com/novydhillon/Flock/actions/runs/38864540098) succeeded. All 277 source tests, `npm run docs:check`, release/development builds and both `scripts/check-build-mode.mjs` checks pass. All 17 live development artifacts match local SHA-256 hashes, including canonical HTML without a query. All 32 unrelated Pages files retain their blob hashes; production main/root unchanged. The first automatic tip sequence still hides after its last full cycle; only manual reopening loops. Native phone acceptance remains pending.

### F-052 QA gear source review

The launcher in `src/qa.js` retains the gear glyph through QA open/close; accessible label/title identify its QA test-session role. `src/qa.css` uses left 50%, translateX(-50%), a 48px target and safe-area bottom offset. The existing lifecycle assertion in `tests/qa.test.js` now checks persistent icon and accessible identity. Implementation and fresh independent blind reviewer used `gpt-6-luna`, medium effort; **9.5/10**, no source defect. The reviewer independently passed all 12 QA unit/debug/integration tests, including focus, inert background and save isolation. Native phone appearance remains pending; F-052 stays Review.

F-052 verified development publication: source `e8b8e16108a8420c3f0528287550e499705d5cd4` on `flock_3D_chatgpt-work`; Pages `715b06c1a55bd9cd39192fd7d25167796f2de16f`. Source CI [38865151549](https://github.com/novydhillon/Flock/actions/runs/38865151549) and native Pages [38865309212](https://github.com/novydhillon/Flock/actions/runs/38865309212) succeeded. All 277 regressions, `npm run docs:check`, release/development builds and both `scripts/check-build-mode.mjs` checks pass; release has zero QA assets. All 17 live dev2 artifacts match local SHA-256 hashes; canonical HTML without query matches. All 32 tracked files outside dev2 retain their original hashes; production main/root unchanged. Blind review 9.5/10. F-052 remains Review pending phone appearance/touch acceptance.

### Production HUD release candidate

User authorized merge and root deployment on 16 October 2026. Merged the reviewed development HUD, tip-cycle fixes and QA gear into a release candidate while preserving main's QA-free packaging workflow. Documentation merge conflicts retain both production and development instructions. Fresh independent integration review 9.5/10; isolated release build and docs checks passed. Production target is `/Flock/`; development `/Flock/dev2/` and unrelated Pages bytes must be preserved. Publication evidence follows after deployment verification.


### Verified production HUD release - 16 October 2026

Merged development `81efdd780749607e68de58529ed445e9345bdc48` into main with two-parent merge `11d66427b14eab7eab3b88a8a560ef2782c0ffe8`. Pages `ee53e9cba1d042367887d8944f9f4a872c9d932c` publishes the QA-free production build at `/Flock/`. Main CI [38865892516](https://github.com/novydhillon/Flock/actions/runs/38865892516) and native Pages [38866036436](https://github.com/novydhillon/Flock/actions/runs/38866036436) succeeded. All 277 source tests, generated documentation checks and release artifact checks pass: 15 files, zero QA assets. Independent integration review 9.5/10. The Pages update replaces root entry/runtime/styles only; all 34 unrelated files, including dev2 and legacy content, retain their original blob hashes. Runtime asset `index-BnH9alW-.js`. User sign-off is recorded separately in the tracker; QA gear remains development-only. Live-file verification follows below.

Final live production verification: **15/15** artifacts match the local release SHA-256 hashes and canonical `/Flock/` HTML without a query also matches. Zero mismatches. Release QA exclusion was checked before publication; development bytes remain preserved. This records byte/source checks, not a fresh phone-rendering test.


## F-053 Pip reference model candidate - 16 October 2026

Work branch `pip_update` starts from development `d007a8a`. Player-only `createPip` uses a baked angular metallic shell, plate ears, expressive eyes, four hover pods and a cable tail with the existing bark light. Buddy retains `createDog` and its walking pose. Twelve pooled hollow blue torus meshes supply three rings per pod, without flame meshes. The attached top stays with Pip; lower rings descend over a 0.55-second pulse while their world-space lateral lag grows with pulse age. Middle-to-bottom handoff preserves position, brightness and radius; new middle fades in as the oldest ring fades away. Pause freezes pulse/trail time; new levels and teleports clear trail history.

Implementation uses inherited Sol; independent source review uses Sol at medium effort and documentation review Luna at medium effort under the least-expensive-suitable policy. Review packets exclude author reasoning and historical scores. Documentation/workflow review scored 9/10. Initial source review identified pulse recycling discontinuity; the follow-up patch adds position/brightness/radius continuity assertions. Automated rendering checks use a GPU substitute and do not establish native visual appearance or phone performance. Final source review scored 9/10 with no blockers; 6/6 focused checks passed. A minor nose-color fidelity note was corrected from blue-gray to the existing black material. Both final artifact-mode checks pass (15 release files, zero QA assets; 17 development files, two QA assets). Full regression and publication evidence follows below.

Final integrated regression: **278/278 passed** on Node 24.19.0. Generated documentation and four documentation behavior tests pass. The nose-only color adjustment passes the focused hover integration test. Native device appearance remains pending.

Source commit `88fa7b0` is local on `pip_update`. Development staging against Pages `ee53e9c` replaces only `dev2/index.html` and its main runtime bundle; all 30 unrelated Pages files are unchanged and all 17 staged development files match the checked build. Automatic approval review rejected GitHub publication because it requires explicit authorization to publish source to the public repository. No source push, CI run or live deployment is claimed. User explicitly approved pushing to the remote and deploying on 16 October 2026 at 00:37 America/Vancouver; see the subsequent publication record below.


### Verified F-053 development publication

The user approved remote publication on 16 October 2026 at 00:37 America/Vancouver. Runtime source `bcbff8f15ac97dbecd6a94d531e6daeec80efc55` on `pip_update` has the exact reviewed local tree (`9ac06d3`), published through the connected GitHub integration because shell Git lacked authentication. Source CI [38868534700](https://github.com/novydhillon/Flock/actions/runs/38868534700) succeeded with 278 tests, generated documentation checks and both build-mode checks.

Pages commit `7e524782f7d3878ecd90815c9743af6cf36aced2` publishes only the development entry and runtime replacement. Native Pages [38868657430](https://github.com/novydhillon/Flock/actions/runs/38868657430) build/deploy/report jobs succeeded. All **17/17 live development files** match the prepared build by SHA-256; all **30 unrelated Pages files** are preserved byte-for-byte, including production. Live game: https://novydhillon.github.io/Flock/dev2/. F-053 remains Review for native phone appearance; no user acceptance is claimed.


## F-033 photo-referenced clay dry-stone walls — 16 October 2026

Implemented on `stone_wall` from `pip_update` to preserve the latest development Pip. An independent parallel design agent considered silhouette, instancing and collision constraints; a fresh blind critic (`gpt-6-luna`, medium effort) received the task and candidate without author reasoning or historical scores. Review: **8.5/10**, no substantiated source blocker; final 44-triangle hull version independently rechecked with all seven gate tests passing. Primary implementation used the inherited model/effort; bounded review used the least costly suitable model.

Three instanced beveled clay-stone shapes, smooth normals, warm-grey color variation, tapered variable-width body courses and uneven coping replace regular bricks. No backing mortar or scattered obstruction is added. Geometry bounds tests check tiny/long horizontal, vertical and oblique walls, deterministic matrices/colors, endpoint and ±.30-unit width containment, disposal and at most three batches/44 triangles per shape. Seed 200 examples: public 8 = 3,623 stones / 159,412 triangles; public 24 = 4,510 / 198,440; public 100 = 8,782 / 386,408. These budgets do not prove mobile FPS; shadows remain enabled.

279/279 full source tests passed before the final hull optimization; all seven affected gate tests passed again afterward. Documentation checks and both artifact modes pass (release 15 files, zero QA assets; development 17 files, two QA assets). F-033 remains Review for normal-zoom appearance, largest-animal/gate walkthrough and phone performance; F-034 distribution remains Open. No rendered/browser claim is made.


F-033 publication preparation: runtime source commit `b48c2d6`; checked 17-file QA artifact staged in a detached Pages worktree from `7e52478`, with only the development runtime bundle and entry HTML changed. All files outside `dev2/` were byte-compared and preserved. Repository push was rejected by automatic approval review because explicit external-publication authorization was required. No remote source branch, CI run or Pages publication is claimed for this candidate; publication awaits that approval.


### F-033 development publication

Novy explicitly approved pushing and dev2 publication on 16 October 2026 at 13:36 America/Vancouver. Shell Git had no credentials, so the connected GitHub integration published the exact reviewed local tree `0720e47fbb67c3c22912ab7227e570615f316816` as source `673979e4bfaed9efef04035c034a597f1c329ec5` on `stone_wall` and fast-forwarded development. Source CI [38963658849](https://github.com/novydhillon/Flock/actions/runs/38963658849) passed all tests, documentation checks and both artifact modes.

Pages `3a3a97d0b1f9de1c92a7b7a06448a31c4c20dc75` has the exact prepared tree `1c0e0149972f115c265c32e4d40fac7584530cbd`. Only dev2 entry HTML and runtime replacement changed; all 32 unrelated tracked files remain preserved. Native Pages [38963856575](https://github.com/novydhillon/Flock/actions/runs/38963856575) build/deploy/report jobs succeeded. The live canonical page was opened in the cloud browser and its script points to the expected `index-xh40YxdP.js`. After an initially slow connection, parallel direct requests confirmed all **17/17 live development files**, including canonical entry HTML, match the prepared build by SHA-256. The cloud browser cannot create a WebGL 2 context, so it cannot verify wall appearance or gameplay. F-033 remains Review for normal-zoom appearance, gate walkthrough and phone performance. Production is unchanged.


### F-033 weathered stone refinement — 16 October 2026

Novy approved the initial appearance and requested more varied/weathered walls at 13:49 Vancouver. An independent parallel design pass examined bounded shape/color/stacking changes. Implementation strengthens asymmetric worn corners and wedge profiles, varies spans/heights, flips and gently rolls stones, contours upper courses/coping, and adds deterministic vertex mottling with pale warm and subdued lower green-grey staining. The matte clay style remains; no textures, extra meshes or triangle-budget increase is introduced. Roll is fitted to each original stone slot, and foundations sit on their rotated bounds.

A fresh independent blind critic used `gpt-6-luna`, medium effort, without author reasoning or previous scores: **8/10**, no substantiated source defect. Primary implementation used the inherited model/effort. All **279/279** source tests pass, including weathering color determinism, finite color attributes and rotated containment/resource regressions. Documentation checks and both artifact modes pass (15 release files/zero QA assets; 17 development files/two QA assets). Prepared development output matches all 17 build files and preserves 32 unrelated Pages files. Actual visual subtlety, apparent masonry continuity and phone performance remain for user review; no new rendered claim is made.


Verified weathering publication: source `19413022bac0eecb5f7f264c2f0010742ec0df8e` has the exact reviewed local tree `2b2b69a754d48b59a218a1b6bf62ba3cab0ca34b`; published on `stone_wall` and integrated into development through the connected GitHub integration. Source CI [38965423609](https://github.com/novydhillon/Flock/actions/runs/38965423609) succeeded. Pages `29f48f35455cec31850030534ffba567842ba68b` has the exact checked tree `e7239a80ca01b3cc33a251f4a00352119c8518ea`; native Pages [38965598338](https://github.com/novydhillon/Flock/actions/runs/38965598338) succeeded. All **17/17 live files**, including canonical entry HTML, match the QA build by SHA-256. All 32 unrelated Pages files are preserved; production is unchanged. The refinement remains Review for user visual/mobile acceptance; the previously observed cloud WebGL 2 limitation prevents an independent rendered claim.


F-033 acceptance: Novy signed off the deployed weathered wall change on 16 October 2026 at 14:00 America/Vancouver (Pages `29f48f3`, runtime `1941302`). Tracker and requirements are Done; historical source/device evidence limits remain unchanged. F-034 stays Open. This documentation-only sign-off changes no deployed game files.


## F-054 clay tree source validation

Historical first-pass validation for runtime `bf5bb48`; it does not validate the newer trunk/foliage sizing follow-up or establish that follow-up as deployed. The associated publication and live-hash record remains in [F-054-publication.json](validation/F-054-publication.json). New follow-up publication and visual sign-off are pending.

Runtime source `bf5bb48`, based on `pip_update`. Parallel implementation and Markdown ownership used separate worktrees and `gpt-6-luna` at medium effort. Parent integration corrected failures found by the full suite and independent review.

- `npm test`: 280/280 pass, including vegetation dimensions, renderer resource/caching/cleanup and gameplay regressions.
- `npm run build` and `node scripts/check-build-mode.mjs release`: 15 files, no QA assets.
- `npm run build:dev -- --emptyOutDir` and `node scripts/check-build-mode.mjs development`: 17 files, two QA assets; this clean build is the publication artifact.
- Each tree variant remains two cached baked meshes and 1,748 triangles. Nearby scenery triangles at QA 1/6/20/50/100: 39,510 / 31,756 / 18,590 / 14,506 / 7,932, below the unchanged 45,000 limit.

A fresh isolated medium-effort `gpt-6-luna` source critic scored the initial candidate 6.5/10 and found a width regression, incorrect radial root orientation and detached leaf marks. Runtime `bf5bb48` broadens the crowns, orients roots/forks between endpoints and seats normal-oriented leaf ovals against the sculpted surfaces. The same critic’s follow-up at `bf5bb48` scored **9/10**, with no remaining source defect and 21/21 independently passed vegetation/render tests. This is follow-up validation after a blind first pass. A separate fresh documentation critic scored 9/10; its overview-index omission was corrected. GPU/Canvas substitutes establish source geometry, caching and budgets, not rendered likeness, native phone FPS or appearance acceptance. F-054 remains Review.


## F-054 tree proportions follow-up validation

Local runtime `8f5d44c` (requirements snapshot `1ef1030`) implements the size refinement. Trunk thickness is `.7 + .2 * clamp((worldScale - 1.015) / 2.085, 0, 1)`; its axis-aligned scale leaves height unchanged. All obstacle and background trees use this rule. Trunk, leader and bark ridges share the width transform; branch/root reach is independent. Lower branch endpoints move from radial .82 to 1.04. Cached palette/maturity models have 5/7/9 crowns; crown radius decreases from .58 near the axis toward .38 at the outer edge. Numeric canopy dimensions and tier breakpoints are implementation choices.

Parallel model/test and Markdown ownership used separate worktrees with `gpt-6-luna` medium effort. The parent integrated the change, kept the leader/ridges attached and added an actual transformed-bounds check at the three width endpoints plus all-nine-model cache checks. `npm test`: **281/281** pass. Release/dev builds with `--emptyOutDir` pass mode checks (15 release files, 17 development files). Generated docs and four DOM checks pass. Nearby scenery triangles at QA 1/6/20/50/100: **40,674 / 31,756 / 18,590 / 14,670 / 7,932**, below the unchanged 45,000 limit. QA1 has 101 draw submissions (limit170), with 157 scene objects (limit310).

Native pixels, phone FPS and new user appearance acceptance remain unverified. Prior F-054 first-pass publication/review are historical. This refinement remains Review until new visual sign-off; publication evidence is separate.

Fresh isolated `gpt-6-luna` medium-effort blind critic: **8/10**, no concrete source blocker; independently passed **22/22** renderer/vegetation tests. The score reflects remaining native appearance/performance uncertainty. It is a source review, not a rendered game rating.
