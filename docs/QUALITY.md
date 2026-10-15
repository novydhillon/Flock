# Flock dev2 revision quality record

## P0/P1 implementation batch — 14 October 2026

Medium-effort blind first passes scored gameplay **9.0/10** and technical **8.5/10**. Their follow-up checks of `f0a87a1` scored **9.4/10 gameplay** and **9.0/10 technical**, with no new confirmed defects. The P0 migration separately scored **9/10** and was published at canonical `/Flock/dev2/`. These are bounded source/headless implementation scores, not verified phone visual quality.

Final integrated checks pass **159/159 source tests**, release without QA (15 files, zero QA assets), development with QA (17 files, two QA assets), and generated documentation checks. The P1 development build is published at Pages `9346f26c5a145698b34e2c4504236c494023817d`; all 17 game files and the legacy redirect match live hashes. Source CI and native Pages publication succeeded. See [the validation runbook](validation/P0-P1.md). F-014 is Done by user confirmation on 14 October 2026; visual acceptance for paths, bark and cutaways remains in Review.

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

F-001/F-002/F-005/F-009/F-010/F-016/F-018 now have source implementations and are **Review**. The new surface, world/goal, countdown/ledger, cutaway and QA tests support their source contracts. Final integrated totals, independent P1 findings and a separate P1 Pages release must be recorded after the integrated candidate is checked; none is inferred here. The old 93/99-test snapshots and 9.1/8.6 scores above remain historical.

Done: Novy confirmed F-014 on 14 October 2026 (America/Vancouver), after the QA-controls release at Pages `50128cdef86c47a383938cc0aac01a29e1f072d2`. This is user acceptance of real-phone controls, appearance and sound; device/browser details and measurements were not supplied. It does not close the separate visual issues or F-015 performance testing. Agent browser QA was skipped under the installed Sites guidance; no agent device test or GPU profiling is claimed. All P2 work remains Open.

See [P0/P1 validation and release runbook](validation/P0-P1.md) for source checkpoints, build modes, exact manual scenarios and publication boundaries.


## Bridge and barn follow-up — 14 October 2026 (Vancouver)

The bridge landing and coherent barn fade repairs are recorded in the [validation runbook](validation/P0-P1.md). Integrated source `185116a` passes 161/161 tests, including all five unchanged full-flock journeys; the expanded rendered-water quad/bevel coverage tests pass. Barn blind source review scored 9/10, with generated HTML freshness the only finding (regenerated during integration). Separate device acceptance for F-005/F-016 remains Review; F-014 stays Done by user confirmation.

Bridge follow-up blind review scored **9/10**, with 32/32 focused geometry, simulation and journey tests passing and no blocking defects. Full-flock delivery coverage remains five representative scenarios; route/body traversal covers all 100 default levels and representative seeded rotations. Both release and development artifact inspections pass. Generated HTML checks pass: 12 pages, 726 local links/anchors, 9 parsed diagrams and 4 DOM behavior tests.


### Node 22 CI follow-up

The first follow-up source CI (run 38678616308, source `c6e9303`) failed the level-16 exact-all journey at 49/50 although Node 24 and the blind source run passed. This was reproduced with the exact CI version, Node 22.23.3. `8df0fd5` corrects a physical-clearance mismatch: sheep previously planned with a .78 cow radius despite moving at .55, disconnecting valid sheep escape routes. The simulation now supplies each animal’s actual radius to the initial blocked-path test and bridge opening planner. A rotated sheep-start regression is valid at .55 but invalid at .78. No time, deck-length or test-policy tuning was retained. Node 22.23.3 full suite passes **162/162** (25.41 seconds); all five unchanged journeys also pass Node 24.19.0. Earlier 161-test evidence is the prior checkpoint, not the final CI result.

The clearance follow-up received a medium blind recheck at **9.5/10** with no defects found; the reviewer independently ran 33/33 focused checks on Node 22.23.3, including the previously failing level-16 full-flock journey. Both corrected build-mode inspections and regenerated documentation checks pass.
