# Flock revision quality record

## F-066 grazing candidate

Novy approved the verified dev candidate and authorized merge to main and live publication on 18 October 2026, 22:10 America/Creston. F-066 is Done by user acceptance, superseding historical pending-sign-off wording below. The production release preserves the reviewed runtime and excludes QA. Production validation/publication evidence follows separately; user acceptance does not measure phone FPS.

Published to dev: runtime source `54cc8c5`, source CI `39200668701`, Pages `d3bc2b8`, native deployment `39200819719`, all successful. CI passes all 338 regressions, docs and both artifact modes; release has 15 files/no QA and dev has 17 files/two QA assets. All 17 live dev files match the checked build by SHA-256; all 49 unrelated Pages blobs are preserved. Final same-critic review of `002b204` scored 9/10, with 60,000 randomized road queries matching brute-force checks and no material blocker. Reviewer inherited the session model without override; exact backend identity is unavailable. [Publication evidence](validation/F-066-grazing-publication.json). F-066 stays Review for native appearance and user sign-off.

Initial independent source review of `0af6876` found a large cow could overlap a barn/deck boundary with its hooves while its center stayed on grass (8/10). `10ec4ec` adds a rotated, species-scaled hoof envelope and boundary regressions. Same-critic follow-up accepted the fix at 9/10 without remaining material blockers. `002b204` skips queries for moving nongrazing animals and indexes static road segments per level; exact segment-distance exclusions remain authoritative. A grid-boundary sweep matches the brute-force polyline query. Neutral standing vertex counts are unchanged (sheep 3043, cow 4082), with maximum nearest-vertex deviations below 0.00000008 world units from main. Source checks do not prove neck appearance, grass contact pixels or phone FPS. Final validation and publication evidence follow below.

Owner Codex, branch `livestock_grazing`, base main `5fd8cf5`. Implementation uses the current session model without override; resumed a partial model edit from the earlier parallel implementation. Chosen approach: renderer-owned feeding state plus shared surface queries and independent head batches; no simulation steering or save changes. Full heads use shared neck-local geometry and existing instanced identities. Cow anatomy adds one material batch (19 instead of 18); triangle counts remain unchanged. Sheep buffer snapshot is updated for the head split. Focused surface/state and actual instanced head grounding/pause/restart checks pass. Full regression, both artifact modes, generated docs and independent source review are recorded below when complete. Native phone appearance/FPS remain unverified; user acceptance is separate.

## F-057 top-center minimap — 18 October 2026

Verified publication: source `3999228197d2d1baece786e5c05f41b8cf4748ef`, source CI `39177156337`; Pages `771c93fe7ca709ec121703e0d0633e29ba604208`, native deployment `39177264534`. All 17 live dev files match the isolated checked artifact by SHA-256. All 49 unrelated Pages blobs remain unchanged. [Publication manifest](validation/F-057-top-center-map-publication.json). User appearance acceptance remains pending.

Validation: 318/318 regression tests, generated docs and both isolated build-mode checks pass (release15/no QA; development17/two QA). No controller/rendering logic changed. Publication evidence follows separately; no native appearance acceptance is implied.

Bounded CSS placement change by the root session (platform-selected model/effort not exposed); no new substantial-change gauntlet is required. Horizontal centering applies to all breakpoints. The below-384px second lane preserves current map size and clears the 65.4px maximum status height with 10.6px spacing. At 384px with standard 12px portrait side clearance, the map begins at126px while maximum weather/count ends near118px; pause/help begins at280px and the map ends258px. These are CSS/font source coordinates, not native browser/device evidence. Validation/publication results follow; visual sign-off remains Review.

## Minimal HUD and Level-number animation — 18 October 2026

Verified dev publication: source `94d0b891315883492bdf74d15c3e6dfcfd47b069` passed CI `39175874260`; Pages `6df73afcd118b777a5b6ba7071b3e0a6bcd37519` passed native deployment `39175960644`. All 17 live files match the isolated checked development output by SHA-256; all 49 unrelated Pages blobs are unchanged. [Publication manifest](validation/F-056-F-063-minimal-hud-publication.json). Source review is complete; user appearance acceptance remains Review.

Parallel markup/layout ownership uses `gpt-6.1-sol` medium; root owns controller/tests/docs with platform-selected model/effort not exposed. This replaces the prior level-title/card design with weather/livestock count and a Level-number fade/scale introduction. Meaningful controller checks cover fade-in, expansion, pause freeze/resume, fade-out, restart, Level 100, completion, count reset and retained reward/results scoring. All 318 regression tests and 45 focused UI/layout/QA checks pass. Isolated release/development artifacts pass mode checks (15/no QA and 17/two QA files); generated docs pass. A fresh isolated `gpt-6.1-sol` medium blind critic scored 9.2/10, independently passed 97 focused checks and found no material blocker. Actual Outfit metrics support source fit at 320px/short landscape: 65/65 at 28px occupies 73.78px, and Level 100 at 36px occupies 156.78px before scaling. These are source/font checks, not native pixels, touch/safe-area or phone-FPS evidence. Publication follows; F-056/F-063 remain Review for user sign-off.

## F-063 level-title overlay — 18 October 2026

Panel-removal follow-up: bounded CSS-only adjustment removes the introduction background, corner treatment and box shadow, retaining spacing, text, fixed font and controller behavior. Root implementation model/effort is platform-selected; no separate substantial-change gauntlet is needed for this decorative adjustment. Prior title-overlay review covers the retained behavior, not this new rendered appearance. Validation/publication evidence follows; F-063 remains Review.

Panel-removal validation: 317/317 regression tests and generated docs pass. Development artifact has 17 files/two QA assets. The first shared-directory release check found leftover QA files; a clean isolated release output passes with 15 files/no QA assets. Publication uses the checked final development artifact. No native-phone appearance claim is made.

Publication verified at `/Flock/dev/`: source `bf4478885f5ea9acfd3d141797a246ec2e86f138`, CI `39173868806`; Pages `34d0160194385230cea648ef36cfe36411a81718`, native deployment `39173966107`. All 17 live files match the final separately rebuilt development artifact by SHA-256; all 49 unrelated Pages blobs are unchanged. [Publication manifest](validation/F-063-title-publication.json). User appearance acceptance remains pending.

Parallel ownership: `gpt-6-luna` medium for markup/layout, root session for controller/tests/docs (platform-selected model/effort not exposed). The overlay uses a fixed 28px title with centered wrapping and at least 20px safe side margins. Active gameplay elapsed time drives its hold/fade; pause hides and freezes it, restart resets it, completion hides it, and pointer input passes through. Focused controller/QA tests pass 42/42, including fade progression, menu suspension, resumption, restart/new title and completion. All 317 regression tests pass, both artifact modes pass (release 15 files/no QA; development 17 files/two QA assets), and generated documentation checks pass. A fresh isolated `gpt-6.1-sol` medium blind source critic scored 9/10 with no material blocker; it independently passed 36 UI tests and a production build. Exact wrapping geometry, native phone appearance/touch and screen-reader behavior are not verified by these source/DOM checks. Publication evidence follows separately; F-063 remains Review for user acceptance.

## Combined development publication verified — 18 October 2026

Combined runtime source `1ad864563f7d714006e3d150f1e518ddd7c51212` passed [source CI](https://github.com/novydhillon/Flock/actions/runs/39160805430); Pages `079ed982ff2ad000a2a3c12337206b483de0943f` passed [native deployment](https://github.com/novydhillon/Flock/actions/runs/39160919364). All 17 files at `/Flock/dev/`, including canonical HTML, match the checked final development build by SHA-256. All 49 unrelated Pages blobs, including production, dev2 and legacy content, are unchanged. The final development distribution was rebuilt separately and mode-checked before staging. [Combined publication evidence](validation/UI-Buddy-combined-publication.json). This supersedes pending-build/publication wording below. UI and combined integration remain Review; prior Buddy acceptance is preserved. No new rendered phone, touch, audio or FPS validation is claimed.

## Buddy user acceptance — 18 October 2026

At 12:45 America/Creston, Novy said “Looks great. Merge to main.” F-048 and F-061 are Done for the verified `/Flock/dev/` candidate, runtime source `6b5e6504535037f5db2ec3ee57c6ccdcac41e81a`, Pages `2e1ec4c052ece61c3ffb0eaf11c956901753ca84`. This supersedes pending-acceptance descriptions below without altering historical review scores, the disclosed review-integrity caveat, or device/performance limits. No production deployment is authorized by this sign-off.

The original [Buddy publication manifest](validation/F-048-F-056-buddy-publication.json) is retained unchanged; its historical F-056 identifier maps to Buddy's current F-061. The manifest's earlier Review statuses are superseded by the sign-off above.

## Combined integration record — 18 October 2026

The Buddy source is being integrated with `UI_refinement` for development-only deployment at `/Flock/dev/`. Documentation integration used `gpt-6-luna`, medium effort. The root session's implementation model/effort is not exposed and is not attributed here. Pre-review combined validation passed **90/90 focused UI/Buddy/model/render tests** and **315/315 full regression tests**; these results predate the standby-state correction. Post-fix full regression passes **316/316**; release artifact has 15 files with no QA assets, and development has 17 files with two QA assets. Documentation generation/check passed: 12 pages, 1,200 local links/anchors, nine parsed diagrams, four DOM behavior tests, deterministic output and offline assets. The initial independent runtime review found stale Buddy `moveSpeed`, `vx` and `vz` state could survive entering standby (8.5/10). A no-main standby reset and transition regression were added. Same-critic follow-up scored **9.2/10**, with no material blocker and **44/44** relevant checks; the Buddy suite passes **26/26**. The final dev build and publication verification remain pending. UI F-055–F-060 remain Review pending user sign-off.

## F-048/F-061 Buddy puppy and movement validation - 17 October 2026

`buddy_update` starts from main `8cc4275`. Disjoint model and locomotion implementation worktrees used `gpt-6-luna` at medium effort. Model commit `c2f29eb` (integrated `c4a9ff0`) creates a silver rounded puppy with large eyes, short muzzle, asymmetrical ears, blue pod tips and spring tail; movement commit `b9a7663` (integrated `0c793e7`) replaces fixed-speed/dead-zone pursuit with proportional arrival and acceleration limiting. Integrated renderer candidate `c3c325a` gives Buddy independent Pip-compatible hover/head/bank/pitch state, twelve bounded pulse rings, four actual-surface glow anchors, .82 relative scale, missing-helper hiding and owned-resource cleanup. Simulation body radius, tier costs/gates, herding and scoring remain unchanged. No other outstanding Buddy movement issue was found beyond F-048; F-047 remains queued.

All **306/306** integrated source tests pass. Focused model/Pip-motion/renderer suite: 36/36. The dedicated slow-waypoint regression reproduces the old waiting/burst pattern and verifies smooth .25m/s pursuit, dt variation, zero-time and reset. Existing tree detours, bounded reversal, bridge/cow clearance, split-group assistance, sustained bolter retrieval and attended scoring tests pass. The added renderer test checks independent pose, 20-degree bank/10-degree pitch limits, grass/deck glow projection, frozen pause, missing-helper reset and twelve ring-material disposals. Release is 15 files with no QA assets; clean development is 17 files with two QA assets. Generated documentation and four DOM behavior checks pass.

A fresh isolated blind source/geometry critic using `gpt-6-luna` medium reviewed `c3c325a`, independently passed 52/52 Buddy/model/render tests and found no confirmed defect: **8.5/10** source confidence. The critic did not see writer reasoning or prior scores. A separate fresh documentation critic scored **8/10**, finding a stale requirements sentence still calling F-048 queued; it is corrected. Current presentation/architecture instructions no longer describe Buddy as walking.

The existing scene budget test now includes the hovering Buddy at levels 1/6/20/50/100: maximum 259 scene objects and 149 submitted draws, below unchanged limits 310/170. These are workload counts, not measured FPS. The shader adds four bounded Buddy pod samples alongside Pip's four. Source geometry, DOM and substituted GPU tests do not prove reference likeness, legibility or real-phone performance. F-048/F-061 are now Done by user sign-off (recorded above); this historical evidence still does not prove native shader appearance or phone performance. Publication to `/Flock/dev/` was verified before acceptance.

### Resumed review — 18 October 2026

The first source critic rechecked `32b8245`: no runtime blocker, 8.5/10 source confidence with a persistent native-appearance/FPS evidence ceiling. This is below the current AGENTS.md 9/10 gate, not a claimed passing gauntlet. The documentation recheck found conflicting old actionable deployment/threshold instructions and the malformed README heading; these are corrected before publication. Independent stronger integration review is requested because the first source review cannot resolve the geometry/shader confidence limit. Native appearance/FPS remain pending regardless of source review score.

Stronger integration review of `19ec61a` used `gpt-6.1-sol` at medium effort, justified by the unresolved multi-file geometry/shader confidence limit. It found no confirmed material source defect, independently passed 52 focused tests and scored source implementation/coverage **9.1/10**. This is independent follow-up, not a second fully blind first pass: the reviewer accidentally saw a prior score adjacent to the tracker acceptance text, reported the exposure, and did not inspect prior reasoning/history/quality sections. The original blind first pass remains 8.5/10. Scores do not establish rendered likeness, phone legibility, native shader execution or FPS. The follow-up's coverage suggestion is implemented as an explicit moving–stopped–moving .25m/s pursuit beside a trunk, asserting bounded acceleration, body clearance, settling and burst-free resumption. A separate documentation follow-up reached **9/10**, with no material blocker, after all current deployment directions, status and pending-publication wording were corrected. The general quality-record title no longer implies dev2 is the new destination.

Final resumed validation: **307/307** source tests pass, including the new stop/resume scenario; focused Buddy suite 25/25. Both clean builds pass their mode checks (15 release files without QA, 17 development files with QA), and generated docs/four DOM checks pass. The runtime is unchanged by the final test/documentation follow-up. The standing publication destination is `/Flock/dev/`; existing production, dev2 and legacy files must remain unchanged. User appearance/movement acceptance is still pending.

## Numbered tip badge — 18 October 2026

Bounded CSS restoration on `UI_refinement`: visible 32px cream-gold numbered badge, non-shrinking, with the existing 44px dismiss target. Controller numbering, timing and manual looping are unchanged. Root session implementation/model effort is platform-selected and not exposed; no separate substantial-change gauntlet is required for this single-rule restoration. Focused UI checks pass 35/35; full regression passes 307/307, release/development mode checks pass (15/17 files, zero/two QA assets), and generated documentation checks pass. Physical-phone appearance remains pending user sign-off under F-057. Publication target is `/Flock/dev/`, preserving dev2 and production; publication evidence follows separately.

## Accepted presentation production publication — 17 October 2026

Post-deployment verification: all 15/15 live production files, including the canonical root HTML, match the checked release build by SHA-256.

User-authorized production deployment follows the accepted presentation merge to main at `8ae3bae835a95ef23e957b47db6251964614234a` (PR #6). Main CI [39095630964](https://github.com/novydhillon/Flock/actions/runs/39095630964) passed. Local merge validation passed 299/299 tests, documentation checks and both artifact-mode checks. A fresh release build contains 15 files and zero QA assets. Pages `c2e03932862bb8733683464209e745cc34918831` replaces only production entry/assets; all 34 unrelated Pages files, including dev2, are preserved. Native Pages deployment [39095701525](https://github.com/novydhillon/Flock/actions/runs/39095701525) succeeded. Live game: https://novydhillon.github.io/Flock/. F-033, F-053 and F-054 user acceptance remains recorded; no new device/FPS measurement is implied.

## F-053 user acceptance — 17 October 2026

Novy signed off the current Pip presentation and floating movement at 20:56 America/Creston. F-053 is Done for runtime source `f0cb0c2cb99bfa874fd72783421e5592d584290f`, deployed at Pages `c4e275b33d1aa372e88db7b704450d7e63735c3d` on dev2. This supersedes earlier F-053 Review/pending acceptance wording. The 299 passing tests and 9/10 blind source review remain recorded below; user acceptance does not constitute an independent device/FPS measurement. Documentation only; no runtime redeployment.

## F-053 floating robot-dog movement candidate

Local validation passed: **299/299 full regressions**, **32/32 focused motion/render checks**, release artifact without QA (15 files), clean development artifact with QA (17 files), generated documentation and four documentation behavior checks. Native motion appearance and phone FPS remain unverified.

Published runtime source `f0cb0c2cb99bfa874fd72783421e5592d584290f` on `pip_update` exactly matches the tested integration worktree tree. Source CI [39093988697](https://github.com/novydhillon/Flock/actions/runs/39093988697) passed. Pages `c4e275b33d1aa372e88db7b704450d7e63735c3d` and native deployment [39094083857](https://github.com/novydhillon/Flock/actions/runs/39094083857) succeeded. All **17/17 live files** match the clean checked build by SHA-256; the canonical entry was rechecked after deployment completed. All **30 unrelated Pages files**, including production, remain unchanged. Live: https://novydhillon.github.io/Flock/dev2/. F-053 remains Review for native feel/appearance acceptance.

Requested gentle continuous hover, head looks into turns, turn-tightness bank capped at 20 degrees and acceleration/braking pitch capped at 10 degrees, leveling after roughly two seconds of steady speed. Integration worktree `pip-motion` / `pip_motion` and source worktree `pip-motion-model` / `pip_motion_model` start from remote `c9a25da`. Source implementation and independent test ownership use Sol at medium effort; blind source review uses Sol at high effort for transforms, signed angular rates and frame-rate response. Root simulation position, Buddy, current appearance/glow, guidance and unrelated accepted art remain unchanged.

Independent focused tests: **32/32 passed**. Fresh blind source review scored **9/10**, no blocking defects. Head meshes are rebased around the neck and the rig pivots near the torso; root heading remains immediate while the head reacts into the turn. Reviewer-measured step-start peak pitch is 7.46–7.49 degrees at 15–240 Hz; a sudden 90-degree input produces about 26.75 degrees relative head yaw and 10.6 degrees inward bank before settling. Body roll/pitch stay within requested caps. Tests cover sine hover, proportion/sign/caps, two-second settling, real frame traces, heading wrap, pause, level/teleport reset, pod/ring/glow/guidance alignment and owned resource cleanup. Source checks do not establish native visual feel; final regression/build/publication evidence follows.

## F-053 additional 30% brightness reduction

Verified publication: glow runtime source `78ed293e96f9b985cfa6c5657f0d6b885e8149b3`; source CI [39092794606](https://github.com/novydhillon/Flock/actions/runs/39092794606) passed. Pages `12621784e6aa7ea4ab6ca021c639da8af5f1c30b` and native deployment [39092856029](https://github.com/novydhillon/Flock/actions/runs/39092856029) succeeded. All 17 live dev2 files match the checked build by SHA-256; all 30 unrelated Pages files, including production, are preserved. Native glow appearance remains Review. Newer tree acceptance at `de2c035` is preserved by this documentation-only update.

In the existing isolated worktree, change glow strength from 0.85 to `0.85 * 0.7 = 0.595`, applying the repeated user request once. Radius 0.54, color, smooth falloff, receivers and ground opacity remain unchanged. Blind review was explicitly waived; none is performed for this change. Existing tests assert the new strength. All **288/288 tests pass**, along with generated documentation/four behavior checks and both artifact-mode checks. The final development artifact is built with `--emptyOutDir`. Publication evidence follows; native GPU appearance remains unverified.

## F-053 softer and subtler ground glow

In the existing isolated worktree, halve emissive strength from 1.7 to 0.85 to interpret “50% more transparent” without making ground materials transparent. Widen pod-scaled radius from 0.36 to 0.54 and replace linear radial falloff with squared smoothstep falloff for softer center/edges. Shader uniforms/cache version are updated; surface receivers, Pip/rings and movement remain unchanged. Source review had completed before the user waived blind review for this adjustment; no further review was requested. Native GPU appearance remains unverified. Full regression: 283/283 passed; the final focused glow test, documentation checks and both artifact modes pass.

Published glow runtime source `ff5e2cd334c442d60eb443e6677c50f900c0610b` on `pip_update`; source CI [39012350770](https://github.com/novydhillon/Flock/actions/runs/39012350770) passed. Pages `93ea5fea3ecdcc5fd27eaa5e3f62114691aff800` and native deployment [39012434377](https://github.com/novydhillon/Flock/actions/runs/39012434377) succeeded. All 17 intended live files match the clean development build by SHA-256; the two changed files were rechecked after deployment completed. All 30 unrelated Pages files, including production, were preserved. Live: https://novydhillon.github.io/Flock/dev2/. Newer tree source `b6ef52f` was preserved when recording this evidence; this glow publication does not claim deployment of that subsequent tree change. Status remains Review for appearance acceptance.

## F-053 surface-bound blue glow correction

Novy's 16 October 2026 19:16 clarification requires light on the ground. The previous separate additive sheet at `terrainHeight + 0.025` is removed. `ThrusterGroundGlow` injects a blue emissive footprint into the actual grass/path/river-bank/bridge material shaders, using world-space pod x/z, compact radial falloff and upward-normal/height masks. Four centers share uniform holders across all receivers and levels. Bridge material clones are level-owned so cached fence wood stays untouched. Pip's scale, rings, gameplay and concurrent tree art remain unchanged. Tests check real receiving-material shader hooks, translated/rotated pod projection, exact ground/bridge center heights, pause, level reset and bridge material disposal. Implementation uses inherited Sol; blind review uses Sol at high effort for GLSL/world-transform correctness. Source review scored 9/10 after adding opaque river-bank receivers; no source blockers remain. A cloud-browser attempt on the preceding live build failed to create a WebGL2 context, so actual GPU shader compilation, contact appearance and mobile FPS remain unverified.

Final validation: **283/283 tests passed**, both release/development builds and artifact-mode checks passed (15 release files, no QA; 17 development files, QA included). Generated documentation and four documentation behavior tests pass. The final development artifact was rebuilt with `--emptyOutDir` so no stale release bundle is included.

Runtime source `84ad35229cd469cea840d11ed62630e679c2a664` on `pip_update` exactly matches the reviewed worktree tree. Source CI [39011793668](https://github.com/novydhillon/Flock/actions/runs/39011793668) passed. Pages `b666edfdb5dc363acd2cc94f9db2a4db4283e458` and native deployment [39011889168](https://github.com/novydhillon/Flock/actions/runs/39011889168) succeeded. All **17/17 live dev2 files** match the clean checked build by SHA-256. The Pages change replaces only the development entry and runtime; all **30 unrelated Pages files**, including production, are preserved. Live: https://novydhillon.github.io/Flock/dev2/. Native appearance remains Review for user confirmation.

## F-053 smaller Pip and thruster ground glow candidate

Isolated worktree `pip-thruster-glow`, branch `pip_thruster_glow`, starts at remote `pip_update` source `e96126e`, preserving current tree/wall work and the original worktree's unfinished edit. The latest 25% request supersedes the uncommitted 33% reduction. Visual scale is 1.0125; the earlier pending lighter steel/trim finish is retained. Gameplay, Buddy and halo/pointer world sizes are unchanged. Four soft additive blue quads follow pod x/z and terrain/bridge y, independent of body bob and ring motion. Shared geometry/material are owned/disposed with the level. Tests cover scale, guidance transforms, pod tracking, grounding, pause, no added lights and disposal. Independent test ownership uses Luna at medium effort; source review uses Sol at medium effort. No native visual acceptance is claimed.

Blind source review scored **9.2/10**, no blocking defects; the reviewer independently passed 44 renderer/Buddy/bridge tests. At bridge entrances a horizontal glow may straddle a height transition and partially clip or float; center-height tracking is source-tested, while edge appearance remains native QA. Both artifact-mode checks pass (15 release files, no QA; 17 development files, QA present), as do generated docs and four documentation DOM checks. Full regression: **282/282 passed**; the added test includes raised bridge glow heights and paused bridge placement. Newer remote tree-publication docs at `c0637f6` were integrated without changing that art.

Published runtime source `ddae15bd4bc1108b6ac2ff38a3204628c204519a` on `pip_update` exactly matches the reviewed worktree tree. Source CI [38992863370](https://github.com/novydhillon/Flock/actions/runs/38992863370) passed. Pages `934fd37d6c33eb3ec29a288ecc7d8506b7918a36` and native deployment [38992957410](https://github.com/novydhillon/Flock/actions/runs/38992957410) succeeded. All **17/17 live development files** match the prepared build by SHA-256; **30 unrelated Pages files** remain unchanged, including production. Live: https://novydhillon.github.io/Flock/dev2/. Phone appearance remains Review, not accepted.

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

Historical proportions candidate, published before the subsequent organic-branching request; this evidence does not validate the current geometry.

Local runtime `8f5d44c` (requirements snapshot `1ef1030`) implements the size refinement. Trunk thickness is `.7 + .2 * clamp((worldScale - 1.015) / 2.085, 0, 1)`; its axis-aligned scale leaves height unchanged. All obstacle and background trees use this rule. Trunk, leader and bark ridges share the width transform; branch/root reach is independent. Lower branch endpoints move from radial .82 to 1.04. Cached palette/maturity models have 5/7/9 crowns; crown radius decreases from .58 near the axis toward .38 at the outer edge. Numeric canopy dimensions and tier breakpoints are implementation choices.

Parallel model/test and Markdown ownership used separate worktrees with `gpt-6-luna` medium effort. The parent integrated the change, kept the leader/ridges attached and added an actual transformed-bounds check at the three width endpoints plus all-nine-model cache checks. `npm test`: **281/281** pass. Release/dev builds with `--emptyOutDir` pass mode checks (15 release files, 17 development files). Generated docs and four DOM checks pass. Nearby scenery triangles at QA 1/6/20/50/100: **40,674 / 31,756 / 18,590 / 14,670 / 7,932**, below the unchanged 45,000 limit. QA1 has 101 draw submissions (limit170), with 157 scene objects (limit310).

Native pixels, phone FPS and new user appearance acceptance remain unverified. Prior F-054 first-pass publication/review are historical. This refinement remains Review until new visual sign-off; publication evidence is separate.

Fresh isolated `gpt-6-luna` medium-effort blind critic: **8/10**, no concrete source blocker; independently passed **22/22** renderer/vegetation tests. The score reflects remaining native appearance/performance uncertainty. It is a source review, not a rendered game rating.


## F-054 organic tree validation

Local runtime `5399dcc` replaces the flat-cap trunk and central stem with shared connected tapering curved limbs. Forks use exponent 2, including the continuing trunk; local radial instance transforms preserve that rule at every tree size. The 7/9/11 crown tiers have three central overlapping crowns plus peripheral variation. Geometry/resource tests include actual transformed mesh radii, connected endpoints, staggered fork heights, bent directions, independent deterministic yaw and cached-geometry non-disposal.

Model/test implementation used `gpt-6.1-sol` at medium effort because connected tubular geometry and exponent-2 transforms required more complex reasoning than the prior cosmetic changes. Parallel Markdown ownership and independent blind review use `gpt-6-luna` at medium effort in separate worktrees. Release and clean development builds pass artifact checks (15 files without QA; 17 development files with QA). Full `npm test`: **283/283** pass. Documentation generation/check and four DOM checks pass. Nearby scenery triangles at QA 1/6/20/50/100 are **39,886 / 31,756 / 18,590 / 13,982 / 7,932**, below the unchanged 45,000 limit; sampled draw submissions peak at 117 (limit170) and scene objects at224 (limit310). Fresh isolated `gpt-6-luna` medium-effort blind critic: **8/10**, no source geometry defect; independently passed renderer/vegetation **24/24** and nature **18/18**. Its stale presentation-description finding was corrected (7/9/11 crowns and shared skeleton geometry). The critic notes that segmented taper/joints still need native visual acceptance; source tests do not establish their smoothness in pixels. A CPU triangle projection was inspected only as a geometry diagnostic; it is not a screenshot of the game. Cloud Chrome explicitly failed WebGL context creation, so no native rendered appearance or phone FPS is claimed. F-054 remains Review until user sign-off.


## F-054 contiguous wood mesh repair

The IMG8395/IMG8396 follow-up replaces segmented limbs and joint covers with one closed indexed wood surface per tree (274 vertices / 544 triangles; three cached variants). Implementation uses `gpt-6-astra` at high effort in an isolated worktree. First forks occur at half trunk height and later forks are staggered upward; curved limbs, gradual taper and the exponent-2 area rule include the continuing trunk. Dedicated vertex-color wood avoids the former cylindrical texture seam while ordinary bushes retain their bark materials. Per-instance thickness travels with culling matrices and batch-owned buffers are disposed on level recreation. The latest Pip ground-light receiving-material fix is preserved.

A software OpenGL 4.5 Mesa EGL context compiled and linked the actual injected tree vertex hook in a diagnostic shader. Transform feedback matches CPU-deformed positions and smooth normals for all three variants at widths .7/.8/.9 (nine cases; maximum position error below 6e-8 and normal error below 4.6e-6). Three offscreen wood views show the actual welded geometry without the former detached rings. This is mesh/custom-hook evidence, not a full Three.js game screenshot or phone GPU/FPS result. Cloud Chrome could not create WebGL2. F-054 remains Review for native appearance acceptance.

Integrated baseline validation: 287/287 source tests, release artifact (15 files, no QA assets), development artifact (17 files, two QA assets), generated documentation/link/diagram checks and four documentation behavior tests pass. The obsolete vegetation assertion for separate limb/joint geometries was replaced with the new single-mesh/material contract. Fresh Astra high-effort blind review approves the junction-corrected candidate at 9/10 with no source blockers; see REVIEW.md. The correction removes inward-folded upper-fork normal corners; the independent sweep covers 303 variant/width combinations. Final integrated regression/build evidence follows the correction.

Final junction-corrected runtime `29f7fcc`: **288/288** source tests pass, both release/development artifact checks pass (15/17 files), and generated documentation checks pass. Regenerated EGL shader checks pass all nine cases (maximum normal error below 4.2e-6). Scenery budget remains bounded at sampled maxima 225 objects / 117 draws / 38,754 triangles, under unchanged 310 / 170 / 45,000 limits. These workload counts do not measure mobile FPS.

### F-054 publication and visual acceptance

Novy accepted the trees in dev2 on 17 October 2026 (America/Creston): “The trees look good in the dev2 build.” F-054 is Done. Source `b6ef52f` passed CI run `39012507770`; Pages `6dddee1` passed native deployment run `39012588519`. All 17 live game files matched the checked development build; all 31 unrelated Pages files were preserved. Implementation and independent blind review used Astra at high effort; review 9/10. The acceptance establishes the user's visual approval, while measured mobile FPS remains outside this evidence. See [publication record](validation/F-054-contiguous-publication.json). No game asset is changed by this sign-off.


## F-064 cow art candidate — 18 October 2026

Branch `art_update_cow` starts from main `396121d`. Implementation, validation and review used the inherited session model/effort without overrides. Exact backend variant/effort was not independently exposed; no specific alternate model is claimed. Curved procedural geometry, surface patching and the baked instancing contract justified retaining the current model. Disjoint ownership: model author `src/models.js`; validation author `tests/cow-model.test.js` and the mixed-species lifecycle fixture; integrator documentation/CI. No alternate model is claimed.

The cow uses a single generated 256×128 organic Holstein coat texture, rounded muzzle/nostrils, sleepy eyes, dark floppy ears, ivory curved horns, cloven hooves, udder and tail. Native torso dimensions match the sheep core before uniform 1.5 scaling: resulting coat diameters approximately 0.96×1.02×1.17. This measures linear torso scale, not volume or the horn/ear extremities. Sheep geometry checksum remains unchanged. Cow has 5,456 triangles and 16 material/hip batches including four paired animated hips; cached geometries/materials/texture are shared across cows and survive level teardown. Gameplay colliders and movement are unchanged.

Initial full suite: 307/307 pass. New cow geometry checks: 3/3 pass; render+cow checks: 28/28 pass. Mixed-species disposal fixture then extended and passed focused validation; final integrated suite follows below. Release and QA builds plus artifact-mode checks pass (release excludes QA, development has two QA assets). Generated documentation checks pass. Fresh independent blind source critic completed: 9/10, no confirmed functional blockers; focused render suite 25/25 pass. Low-severity unverified art concern: head/ears/hooves retain the established blue-gray enamel while body coat is matte neutral black; rendered inspection should decide. Final integrated suite: 310/310 pass including the three new geometry checks and expanded mixed-species disposal fixture.

**Publication held by explicit user instruction:** dev is being used for another review. No Pages files were changed or pushed; no live publication/hash verification is claimed. Rendered likeness, grazing/turning appearance, mobile FPS and phone acceptance remain unverified. Before future publication, re-read current main AGENTS and fetch latest Pages; publish only `/Flock/dev/` when instructed.

F-064 handoff: source implementation is committed locally as `7cc7035`. Automatic approval review rejected the push to the configured `novydhillon/Flock` remote, stating explicit authorization to publish the branch is required. No workaround attempted. Remote branch publication/CI are blocked pending user authorization; local checks passed. Deployment remains explicitly held and Pages unchanged.

F-064 push authorization: Novy explicitly approved pushing `art_update_cow` on 18 October 2026 at 15:54 America/Creston. Deployment remains held. The earlier approval block above is historical. Source publication uses the connected GitHub service because shell git has no HTTPS credentials.

## UI refinement gauntlet — F-055–F-060 (17 October 2026)

The 18 October F-056/F-057 minimap-size/contrast and compact-status follow-up is a new candidate; the 17 October review/publication evidence below does not validate that follow-up. Parallel ownership: `gpt-6-luna` medium for bounded map rendering/tests, root session for CSS/controller/documentation. F-056/F-057 stay Review for user sign-off. Follow-up source `e2f55d2` passed CI [39113239224](https://github.com/novydhillon/Flock/actions/runs/39113239224); Pages `dbdf3c1` passed native deployment [39113364683](https://github.com/novydhillon/Flock/actions/runs/39113364683). All 17 live dev2 files match the checked final build, and 32 unrelated Pages blobs including production are unchanged. [Follow-up publication evidence](validation/UI-minimap-followup-publication.json). The final development distribution was rebuilt separately with explicit empty output and mode-checked before staging.

Independent blind gauntlet: a fresh isolated `gpt-6-luna` medium critic found no blocker but scored 8.5/10 because native layout remained unverified. A separate fresh `gpt-6.1-sol` medium critic independently reproduced the maximum-value text metrics from bundled WOFF fonts and scored 8.5/10, identifying the accumulated CSS override stack as a nonblocking maintenance issue. The workhorse escalation addressed the earlier critic's inability to reproduce the font diagnostic. Consolidating the follow-up into the original base/mobile/narrow/landscape rules resolves the maintenance finding. Same-workhorse-critic follow-up: **9/10**, no functional blocker; four focused HUD/controller checks pass. A remaining 1px mobile radius discrepancy was corrected to the intended 13px. Parent checked 14 viewport/timer-state combinations for effective size/font/position property parity with jsdom during consolidation. These checks and font advances are diagnostics, not native visual/touch approval.

Follow-up checks: 307/307 full source tests pass; final clean release/development builds pass their artifact-mode checks (15 files without QA, 17 files with two QA assets). The added canvas-recording test measures relative-luminance contrast of at least 3:1 for line features against the map field and actor fills against their outlines, including closed gates. It preserves the shared goal polygon projection. A FreeType advance-width diagnostic using the actual bundled WOFF fonts checks maximum campaign text at 320/360/390/480/568/844 widths. At 320, content width is 140px: Score label plus gap plus 2555 / 2555 at 18px uses 125.16px; Delivered plus 65 / 65 uses 102.33px. Level 100 and the 60s timer retain 26.55px horizontal separation. This is font-metric and CSS-coordinate evidence, not browser layout or physical-phone approval. The WOFF2 decoder was unavailable; the packaged WOFF equivalents supplied the same family/weight diagnostic without adding dependencies.

Candidate branch: `UI_refinement`, based on `8cc4275`. Controller/tests and markup/layout use parallel disjoint ownership with `gpt-6.1-sol` at medium effort. Root session integrates renderer, workflow and documentation; its exact model/effort is platform-selected and not exposed by the agent tools. This level of model is appropriate for coupled responsive UI, modal lifecycle and active-time behavior. No geometry/model escalation is needed for this batch. Standing defaults are now in root AGENTS.md.

Fresh isolated blind source reviewer: `gpt-6.1-sol`, medium effort, no history/writer reasoning/past scores/target threshold supplied. Initial **8/10**: the short-landscape breakpoint excluded 568×320, causing gate/toast overlaps with the top HUD. The correction extends short-landscape lanes to smaller widths; follow-up **9/10**, no remaining source blocker; 63 focused tests independently pass. Critic independently passed 59 focused UI/markup/audio/goal tests, destination introduction regression and a production build. A separate fresh `gpt-6-luna` medium-effort documentation critic scored **8/10**, finding a stale documentation-home summary and missing current quality evidence; current status/home links and this record correct those findings, with follow-up **9.5/10**, no remaining material documentation defect. The presentation source lives at `docs/systems/PRESENTATION.md`; no new `docs/PRESENTATION.md` path is required.

Parent baseline: **306/306 source tests**, documentation checks (12 pages, 1,142 links/anchors, nine parsed diagrams and four DOM behavior tests), release artifact (15 files, zero QA assets), and development artifact (17 files, two QA assets) pass. The final recheck after the layout correction also passes all 306 source tests and both artifact modes. DOM/controller/scene checks support behavior, not exact rendered layout or physical touch. Cloud Chrome cannot initialize the game's WebGL2 context, and its separate browser cannot reach the container localhost server; no game-pixel or physical-phone evidence is claimed. User phone visual/touch sign-off is pending.

Publication verified: runtime source `d47ae6c0363fd2e26cbec06c851724bb0942825a` passed source CI [39096990195](https://github.com/novydhillon/Flock/actions/runs/39096990195). Pages `ce24bf3397397143c092d50681cdb0e672e1507a` passed native workflow [39097086089](https://github.com/novydhillon/Flock/actions/runs/39097086089). All **17 live dev2 files** match the clean development artifact hashes; **32 unrelated Pages blobs** are unchanged, including production root. The final publication artifact was rebuilt with explicit `--emptyOutDir` and rechecked before staging. [Publication manifest](validation/UI-refinement-publication.json). Production root is unchanged. F-055–F-060 are Review until the user signs off. No screenshot/physical-touch approval is implied by the publication. The cloud browser also disallowed a local data-URL layout fixture, so that optional approach was stopped; no fixture-render claim is made.


## Accepted UI production release — 18 October 2026

User explicitly approved pushing, merging and production deployment. Source `0e62198` preserves main Buddy sign-off and accepted UI refinements. All 318 regressions, generated documentation checks and clean development/release artifact checks pass (17/15 files; 2/0 QA assets). Main CI `39178264323` and native Pages run `39178339857` succeeded. Pages `2adab7b` replaces production HTML/assets only; all 51 unrelated files, including dev/dev2/legacy deployments, retain their hashes. All 15 live production artifacts match the checked build by SHA-256. [Publication evidence](validation/UI-production-publication.json). This release adds no runtime implementation beyond the independently reviewed candidates; no new phone FPS or rendered-device claim is made.

## Cow integration and deployment authorization — 18 October 2026

Novy requested merging current main into `art_update_cow` and publishing to dev at 16:54 America/Creston; this supersedes the prior deployment hold. Merge main `0e62198` with cow source `e8c3c34`, preserving the accepted minimal HUD/top-center minimap and Buddy updates. Cow tracking is renumbered **F-064** because main already owns F-057 for minimap improvements. F-064 stays Review pending appearance sign-off. Source checks/publication evidence will be recorded separately.


F-064 integrated cow development publication: runtime source `04ce8eb` merges main `0e62198` into `art_update_cow`. All 321 tests, generated documentation checks and release/development artifact-mode checks pass. Independent blind integration review: 9/10 with 95 focused checks; no blocker. Source CI [39178525673](https://github.com/novydhillon/Flock/actions/runs/39178525673) succeeded. Pages candidate `d9b8ee8` changes only dev entry/main bundle, preserving all 49 outside-dev blobs. Deployment is authorized by the latest request; earlier hold/block paragraphs are historical. Native Pages/live hashes are recorded in `docs/validation/F-064-cow-publication.json`. Appearance acceptance remains Review; source checks do not establish phone likeness or FPS.


## F-064 longer body and four herd sizes — 18 October 2026

`art_update_cow` follow-up uses disjoint model/renderer and physical-sizing/generation agents with a fresh independent source critic. All inherit the session model/effort without overrides; exact backend variant is not independently exposed. Torso length increases 25%; head/hips/udder/tail attachment positions follow the torso. Four uniformly scaled variants (1, 13/12, 7/6, 1.25) share the existing baked geometry/materials/coat, with scale applied to body and animated hip matrices. Culling already uses pose scale. Sheep geometry remains unchanged.

A separate seeded size RNG assigns equal-probability choices without consuming layout randomness. The shared animal size/radius helpers propagate scale through active/saved separation, clear paths, bridge commitment, Buddy retrieval, delivery, QA placement and cutaway. Spawn overlap correction moves only cows to bounded deterministic clear samples. Geometry tests check the lengthened torso and unchanged sheep; instance tests check all sizes and moving hip matrices; physical tests cover deterministic assignment, all four choices, 400 seed/level spawn fixtures and largest-size admission. QA data-URL/VM harnesses and fixed-radius delivery fixtures were updated for the actual imported helper and selected size.

Rendered likeness/phone FPS remain unverified; F-064 remains Review pending user sign-off. Full integrated validation, independent review and publication evidence follow below.


F-064 size variation validation: 325/325 integrated tests pass before the additional explicit largest-cow bridge/gate fixture; all four cow-size tests pass afterward. Release/development builds and artifact-mode checks pass. Source QA import harnesses and the fixed-radius delivery fixture were corrected rather than weakening selected-size admission. Sheep geometry checksum and all terrain/sheep generation fields across 400 seed/meadow comparisons remain unchanged. Initial reviewer identified a quantized-gait timing mismatch in the new test; same-critic follow-up independently passed all five targeted size/render checks and scored 9/10 with no source blocker. User appearance acceptance remains Review.


F-064 longer-body/size-variation runtime source `e46d5cb` passed source CI [39179684108](https://github.com/novydhillon/Flock/actions/runs/39179684108), including the final 326-test suite, docs and both artifact modes. Independent source review reached 9/10 after the test timing correction. Development Pages revision `0681cff` contains the checked 17-file build, preserving 49 blobs outside dev. Native Pages/live verification evidence is in [F-064 size publication](validation/F-064-cow-size-publication.json). This supersedes the prior runtime-only cow publication; user appearance sign-off remains Review.


## F-064 coat diversity and forward horns — 18 October 2026

Four cached 256×128 clay torso textures vary the Holstein patch locations, shapes and coverage. Only torso rendering is split by coat; all geometry and remaining anatomy/material batches stay shared. This adds at most three torso draw calls rather than duplicating complete cows, and uses standard materials so QA tints remain compatible. Pattern selection is deterministic per level/animal, independent from body scale and visibility compaction. Both horns move +0.05 local forward Z, with no changes to body length, four size factors, sheep or simulation. Model/render implementation and parent documentation use disjoint ownership with an independent fresh critic. Agents inherit the session model/effort; exact backend identifiers are not independently exposed. Automated/source evidence and publication follow below; native likeness/FPS remain unverified.


F-064 coat/horn source validation: full existing regression suite 326/326 and both release/development build artifact-mode checks pass. New coat/horn/compaction/size checks pass 5/5, including four distinct pixel hashes, bounded black/cream coverage, shared materials/geometry, forward horn roots, ID-stable culling/reorder/restart and actual QA tint/reset. Generated documentation checks pass. Independent review and publication evidence are recorded below; rendered acceptance remains Review.

F-064 coat/horn independent source review: 9/10, no material blocker. Initial candidate review found a test-fixture frustum was not restored before restart; final fixture restores it and reviewer independently passed corrected horn/coat checks. Production code had no corresponding defect. Publication remains a separate milestone and user appearance sign-off remains Review.


F-064 varied-coat/forward-horn runtime source `b3fb4f5` passed source CI [39180629102](https://github.com/novydhillon/Flock/actions/runs/39180629102), including all 329 tests, docs and both artifact modes. Independent source review: 9/10. Development Pages `90ee1f5` contains the checked 17-file build, preserving 49 blobs outside dev. Native Pages/live hashes are recorded in [coat publication evidence](validation/F-064-cow-coat-publication.json). Source implementation/publication does not establish rendered acceptance; F-064 remains Review.


## F-064 production acceptance — 18 October 2026

Novy approved the current cow update at 17:30 America/Creston and authorized merging `art_update_cow` into main and production-root deployment. F-064 is Done by user acceptance, superseding prior Review/hold wording for this cow work. Accepted dev runtime `b3fb4f5` / Pages `90ee1f5`; current source docs `e05bf79`. Production source must preserve accepted UI/Buddy behavior and exclude QA. Runtime identity and publication verification follow separately; user acceptance adds no independent device FPS measurement.


F-064 approved production release: main runtime `3301a54` merges accepted cow branch `e05bf79` and preserves reviewed runtime bytes. All 329 regressions, generated documentation checks and the release artifact check pass; 15 emitted files include zero QA assets. Main CI [39181194506](https://github.com/novydhillon/Flock/actions/runs/39181194506) succeeded. Production Pages `2e807ae` replaces only root entry/main bundle and preserves all 51 unrelated blobs, including dev/dev2/legacy builds. Native Pages and live SHA-256 evidence is recorded in [F-064 production manifest](validation/F-064-cow-production-publication.json). F-064 remains Done by Novy's approval; prior Review/hold notes are historical.


## Herd pivot presentation — F-065

Candidate branch `herd_turning_visual`, based on main `c819a89`. Implementation: current session model (no model override), bounded renderer-only change. 332/332 full regressions passed; additional actual instanced-leg pivot/pause test passed separately (333 total checks). Release artifact: 15 files, zero QA; development: 17 files, two QA assets. Generated documentation checks passed. Rate tests cover sheep/cow timing at 30/60/120 Hz, shortest wraparound, idle and pause. Fresh independent source review recorded below. Native WebGL appearance and user acceptance remain pending. No publication in this session: another active process was editing the original checkout; this candidate is isolated to avoid overwriting its work.

Independent review: `gpt-6-luna`, medium effort, fresh context; final 10/10 with no material blocker. Initial undefined-turn-speed concern was disproved by the existing default parameter and direct runtime check; no source fix required. Review covers source behavior, not native rendered appearance.


## F-065 production acceptance

Novy approved the dev candidate and authorized main merge and live publication on 18 October 2026, 18:03 America/Creston. Preserve the independently reviewed runtime. Release integration uses the current session model without override; no new runtime work or new blind review is needed. Production build must exclude QA. Native phone FPS is not established by source checks. Publication evidence follows separately.


## Tracker archive and connector-only workflow — 18 October 2026

Documentation maintenance on `plan/bird-behaviour`, based on connector revision `2358bc1`. No runtime, main merge or Pages changes. Root session model/effort is not exposed and is not attributed. A fresh independent critic used an empty conversation context with the task, acceptance criteria, candidate files and original tracker snapshot; no writer reasoning or target score was provided. An initial full-history reviewer was interrupted before assessment and is not counted as blind review.

Migration retains all 106 original overview entries unchanged apart from strike markup, moves closed work and historical execution records into `docs/ISSUES_CLOSED.md`, leaves 59 active entries including all 42 planning items, and adds the already signed-off F-065 missing from the old overview to make 48 archived rows. Independent review checked paragraph conservation, disjoint IDs and closure/reopening/connector-only rules: 9.2/10, no material blockers. The old search fixture expected F-025 in the active tracker; it now checks the archive and separately checks active F-BIRD-001, with reviewer recheck passing all four behaviors. Optional forward-guard improvements from review were applied: archive details are required and scoped closed titles are checked.

Validation: documentation generation is deterministic across 13 offline pages; all local links/anchors and nine diagram sources pass, along with four DOM behavior tests. Checks enforce active/closed row separation, IDs, details, requirement traceability including ranges and closure strikethrough. Native browser appearance is not claimed. Publication uses the connected GitHub service only, with expected-parent branch update and remote tree verification; it does not authorize production merge or deployment.


## Main into planning branch integration — 18 October 2026, 22:17 America/Creston

Integrate main `d2484b9` (five commits after shared base `5fd8cf5`) into `plan/bird-behaviour` parent `6ca2b35`, preserving both histories in a merge commit. The approved grazing runtime/tests/workflow and its two publication manifests match main Git blob hashes exactly; no new runtime edits. Main's shared documentation additions are retained, generated HTML is rebuilt, and accepted F-066 is archived with user sign-off and publication evidence. All 59 active items and 42 new planning items remain unchanged; 49 closed items are archived. Connector-only and archive-on-closure rules remain in force.

Validation: 338/338 regressions, deterministic 13-page documentation checks and all four DOM behavior tests pass. Release artifact: 15 files, zero QA assets; development artifact: 17 files, two QA assets. A fresh empty-context independent source integration critic used an isolated candidate snapshot, task/acceptance criteria and main/base files, without writer reasoning or prior review scores. Independent verification passed the same tests/docs/build modes and scored 9.5/10 with no material blockers. Exact backend identity/effort is not exposed; no model override was used. No new native appearance, listening or device FPS claim.

[Integration evidence and upstream blob hashes](validation/main-planning-integration.json). Publication is source-only through the GitHub connector with both parent SHAs and an expected-head branch update; no main merge or Pages changes. The existing workflow push filter does not include this planning branch, so local validation above is not presented as a new GitHub CI run.



## F-TRACK-001 — Read-only tracker, 18 October 2026

Branch `feature/work-tracker`, based on main `61bea8720ef1acb7519f5de9de679077b5753624`. Chose dependency-free static HTML/CSS/ES modules instead of coupling the viewing tool to the game build. Separate parser owner and UI/integration owner used disjoint files. Implementation and independent reviewer used the session-default inherited model/effort without overrides; the runtime exposes no exact identifier/effort, so no named-model claim is made.

Fresh blind reviewer received only task/acceptance criteria, isolated candidate files and source/test fixtures. First pass 7.8/10 found bold Branch labels omitted and HTTP-200 malformed archives accepted as partial boards. Both defects fixed with regressions; same-critic follow-up 9/10, no material source blockers. Twelve focused parser/UI checks pass, including all real tracker overview IDs, priorities, branches, safe rendering, details, keyboard focus restoration under DOM substitution, snapshot consistency and refresh recovery. The 13-page documentation build/check and four behavior checks pass. Release (15 files/no QA) and development (17 files/2 QA assets) build-mode checks pass; the existing game bundle-size advisory remains. Full-suite outcome and publication evidence are recorded separately.

No browser-control capability is available for managed preview, so rendered CSS/mobile, actual native dialog/focus/touch and live browser networking are not verified. DOM tests stub dialog methods and establish no screenshot/phone claim. Explicit user `/tracker` request authorizes only this dedicated Pages path. Game and other Pages content are preserved. Keep F-TRACK-001 Review until user acceptance.

Full repository regression suite: **350/350 pass** (including 12 new tracker checks), plus four documentation behavior checks. Both game artifact modes passed; no game source is changed or published by the tracker deployment.


## F-TRACK-001 user acceptance — 18 October 2026, 22:45 America/Creston

Novy signed off the deployed `/Flock/tracker/` site and authorized pushing and merging PR #11 to main. F-TRACK-001 is Done and its complete tracker record is archived in ISSUES_CLOSED.md. This acceptance supersedes historical Review/pending-user-acceptance notes; independent native/browser verification limits remain as recorded. No application files change in this sign-off batch. Source and native Pages CI previously passed; publication details and user acceptance are in [the evidence record](validation/F-TRACK-001-publication.json).


## F-067 Pip app icons — 19 October 2026 UTC

Implementation: parent gpt-6.1-sol session (effort setting not exposed). Independent fresh critic: gpt-6-luna, medium. First review 8/10 identified manual rasterization drift; generator now regenerates SVG and all PNGs in one command, and 48/96 icons are declared. Follow-up review recorded below.

All 350 regressions pass; both build modes and artifact guards pass; documentation build/check passes. PNGs checked for expected dimensions, RGBA range 0–255 and transparent corners. Emitted HTML icon/manifest URLs resolve. SVG portrait visually inspected at 512 pixels: actual silver Pip head, ears, eye band and muzzle centered. SVGRenderer uses simplified lighting without model texture sampling. Browser installation and iOS compositing untested. Browser download failed (truncated download); no native appearance or installability claim.

Follow-up critic: **9/10**, no blocking defects; both findings resolved and dimensions/transparency rechecked. User acceptance remains pending.

F-067 dev publication: source CI 39207762707 and Pages 39207932067 succeeded. All 29 live files SHA-256 match the checked dev build, including HTML, manifest, all icons, fonts and QA assets. Pages 46ce3a7 preserves all 53 unrelated blobs. Device appearance remains pending; see validation/F-067-publication.json.

F-067 green revision: bounded asset-only change, same head geometry/framing. A full-square SVG rectangle uses the field texture base colour #779c4d. All PNGs regenerated; verify dimensions, opaque alpha and corners. Previous transparency evidence is historical. Prior independent review still describes the head/markup; no new blind review for this bounded colour change.

Green revision release/development clean builds and artifact checks passed; source CI 39208378316 including docs and regression tests passed. Pages workflow 39208561127 succeeded. 53 unrelated blobs preserved. Background pixel/alpha checks passed for all ten PNGs, and 512px output visually inspected.

All 29 live development files match the checked green build by SHA-256. Evidence: validation/F-067-green-publication.json.

F-067 accepted by Novy 18 October 2026 at 23:15 America/Creston; authorized main merge and production deployment. Moved complete issue/evidence into ISSUES_CLOSED.md.


## Buddy behaviour batch — 19 October 2026

**Scope/source:** `buddy_behaviour` from main `1ad55f0f0118d4a579f44826f68d8e4b5388db71`; F-COMP-001/002/003/007 remain Review, awaiting user playtest/sign-off. No game deployment or main merge is part of this handoff. Branch CI trigger is included. Repository operations use the GitHub connector.

**Ownership/approach:** separate agents owned Buddy behaviour/standby and navigation/recovery, with disjoint new regression files; root integrated the existing standby test adjustment, requirements/system/development/tracker docs and generated HTML. Prefer retained lateral work positions plus existing physical navigation over a new global planner; add bounded recovery observation/backouts rather than changing livestock movement or collision. Implementation and fresh independent critic used the inherited session model/effort; exact backend model/effort was not independently exposed, so no specific model configuration is claimed.

**Blind review:** fresh context and isolated `/tmp/buddy-review` snapshot received task/acceptance criteria and candidate files only, without implementation reasoning, prior scores or target score. First pass **7.5/10** found remote standby refusing a valid large-tree detour and false recovery after arrival at a valid substitute beside an obstructed ideal endpoint; it also identified slow continuous progress falsely treated as oscillation. Fixes share feasible standing-goal resolution, accept monotonic progress and check routed standby reachability. Follow-up **8.5/10** found a multi-waypoint bridge return rejected by an incomplete reachability probe. The final bounded waypoint-chain probe checks each physical edge and final endpoint, rejects repeats/no progress, and passes the exact bridge regression. Same-critic follow-ups are rechecks, not additional blind first passes. Final **9/10**, no remaining material defect found; **77 focused Buddy/simulation/world tests passed** in the critic snapshot.

**Coverage:** selected smaller flock moving opposite the main flock; stable Pip yielding including orbit and narrow gates/bridges; return, park and task resume; impassable wall fallback; large-tree/bridge standby routes; real physical recovery around a short wall; bounded no-exit recovery and retry; substituted standing-point arrival; .04m/s monotonic pursuit; futile oscillation; task/level/pause resets. Existing regressions preserve tier gates, retrieval, rotated goal/final singleton help, independent bark, body clearance and no unattended scoring. The old standby test now places Pip beside the parked Buddy to test zero-motion rest/resume; remote return has its own regressions.

**Validation limits:** headless source/module and DOM/WebGL substitutes do not establish rendered motion, phone touch feel, arbitrary-layout route completeness or FPS. Vite retains its advisory >500kB chunk warning. Public icon PNGs were recreated locally from the unchanged repository SVG with the existing Inkscape/Pillow process because connector text fetch cannot decode binary blobs; icon files are excluded from source changes and no artifact publication is attempted. Phone smoke scenarios are in DEVELOPMENT.md.

**Final local checks:** all **368 full regression tests passed**. Release and development builds and their QA artifact-mode checks passed after the suite finished (the suite also invokes Vite, so the final builds run sequentially). Generated documentation/link/lifecycle/behavior checks passed after regenerating HTML. Native device/browser inspection and deployment remain pending.


## Buddy development publication — 19 October 2026

Novy authorized dev deployment. Runtime source `f1e31a6965859d3af15ff59b5396176b2f2a8a2b` on `buddy_behaviour` passed [source CI](https://github.com/novydhillon/Flock/actions/runs/39295154656). A fresh development build passed QA artifact-mode and emitted-dependency-graph checks. Local runtime/config/package hashes matched the published source; all icon/font files also matched existing repository blobs.

Published only `dev/` through connector Pages commit `af7333ae5288310d64eff913ea3ab45d7faa7aff`, parent `f0a044ff4678d0ec8aff0edd38c2a4f084c90f2e`. Verified 29 build blobs and 65 unchanged blobs outside dev before updating the expected Pages parent. [Native Pages workflow](https://github.com/novydhillon/Flock/actions/runs/39296577670) succeeded. All **29 live HTML/assets matched SHA-256 hashes** at https://novydhillon.github.io/Flock/dev/. Earlier probes during deployment saw missing new assets; final post-publication verification passed for every file.

See [publication manifest](validation/Buddy-behaviour-publication.json) for source/Pages identities and per-file evidence. This supersedes the preceding not-deployed handoff for F-COMP-001/002/003/007. They remain Review, awaiting Novy's phone gameplay/motion sign-off. No main merge or production publication; no native-browser/device motion, touch or FPS claim.


## Buddy containment and seven-second grazing — 19 October 2026

**Scope:** F-COMP-009 on `buddy_behaviour`, extending the previously published Buddy batch. Runtime ownership split: one agent owned buddy/simulation/containment tests and attended-fixture adjustments; another owned grazing/render timing tests. Root owned a separate full-simulation/pose integration test, companion/UI expectation updates, documents, integration and publication. Session model/effort was inherited; exact backend model/effort is not independently exposed.

**Approach:** keep a fixed local holding area and physically patrol its perimeter rather than add another preferred travel direction. Pip attendance uses18m entry/14m return hysteresis and structural-clear visibility ignoring tree-only occlusion. Buddy must reach a selected connected member before acquisition; passive calm can then propagate through the selected connected group while Buddy remains within the current group's bounded, structurally connected perimeter. Acquisition/reacquisition snapshots the current physical locations, preventing remote freezes or stale-position pullback. Separate holding signals suppress inherited forward alignment with zero alert/bark pressure; Pip pressure and committed bridge crossing take priority. Existing tier-3 retrieval remains physical. Grazing requires seven calm seconds inside a fixed.75m area and head-down speed below.1m/s, retaining all accepted mouth/hoof surface exclusions.

**Blind review:** fresh-context critic received only task/acceptance criteria and isolated candidate source/tests at `/tmp/flock-containment-review`, excluding rationale, earlier scores and target score. First pass7/10 found a material wide-flock defect: an expiring12s per-animal contact window did not reach interior animals from the outer patrol, causing nine sheep to move up to16.02m in30s. Corrected connected-flock acquisition/rest replaced that window. Follow-up9/10 found no remaining concrete material defect;63 focused tests passed, plus independent nine-sheep drift, remote new-flock selection and fence-split ownership probes. Follow-up is a recheck, not another blind first pass.

**Coverage:** long-running9sheep and 65mixed holds and grazing over60–90s, all cow scales, local acquisition after physical remote arrival, no initial remote influence, split/merge selection, distance hysteresis, rivers/fences/closed/open gates/tree-only occlusion, Pip pressure, inactive Buddy, pause/reset, committed sheep/cow crossing and dry-bank rest. Updated existing companion modes reflect `contain`; autonomous-bark UI tests now keep Pip within clear attendance range, so ordinary bark/audio/cooldown behavior remains tested separately.

**Limits:** deterministic source/module/renderer substitutes do not establish native phone appearance, grazing timing feel, touch usability, arbitrary-layout route completeness or FPS. User sign-off is pending; F-COMP-009 and earlier Buddy review items remain Review. Production is unchanged.

**Final local validation:** all 379 full regression tests passed; release/development builds and their QA exclusion/inclusion checks passed. Generated documentation/link/lifecycle checks and4 documentation behavior tests passed. Vite retains the advisory large-chunk warning. Development publication follows only after source CI success, with native Pages/live-hash evidence recorded separately.


## Buddy containment development publication — 19 October 2026

Updated the previously authorized development review. Runtime source `cf6e182a8c78e2f6068364542cdad3b0ff7a35eb` passed [source CI](https://github.com/novydhillon/Flock/actions/runs/39299937130). Local full regression 379/379, release and development QA artifact-mode checks, generated documentation checks and emitted dependency-graph validation passed before publication.

Connector-only Pages commit `83125c07f652d524cf753295b9aea07a6d8f8600`, parent `af7333ae5288310d64eff913ea3ab45d7faa7aff`, replaces only `dev/`. All 29 build blobs match the staged tree, and 65 unrelated blobs outside dev remain unchanged. [Native Pages deployment](https://github.com/novydhillon/Flock/actions/runs/39300214359) succeeded; all 29 live files match checked-build SHA-256 hashes at https://novydhillon.github.io/Flock/dev/.

[Per-file evidence](validation/Buddy-containment-publication.json) records runtime/Pages/CI identities and hashes. This supersedes the earlier Buddy dev runtime for F-COMP-009. Keep F-COMP-009 and earlier review items in Review; user phone gameplay/motion sign-off remains pending. No main merge or production publication.


## F-OPS-001 — Standard delivery tooling, 19 October 2026

Branch: `feature/build-deploy-runbook`. Implementation: parent session model (no model/effort override); fresh blind critic: gpt-6-luna, medium, separate context. Initial 7.5/10 identified contradictory current README/development instructions; corrected the current sections and retained dated evidence as history. Follow-up 9/10, no material blocker. Clarified that the manual workflow's own checked-build job satisfies source CI validation; native Pages and live hashes remain separate gates.

Validation: full shared checked-dev invocation passes 340 regression tests, 4 documentation behavior tests, release build/QA exclusion and development build/QA inclusion. Expanded deployment tests pass 10/10 after adding a mocked publisher run exercising exact base-tree preservation, protected content, non-force update and changed-head rejection. Current docs checks pass 13 pages/1,543 local links and anchors/9 diagrams. YAML parses and publisher syntax check pass. Real development artifact produces a scoped plan. Existing icon generator supplied local binary inputs because connector binary reads fail; regenerated public files are excluded from the commit.

No Actions execution, secret inspection/configuration, native Pages deployment or live-hash verification is claimed for the new workflow. It needs the documented repository publish secret and default-branch availability; the connector lacks workflow dispatch. No game deployment or main merge requested/performed. Implemented item remains Review pending workflow execution and user acceptance.


## Natural containment correction — 19 October 2026

**User evidence/problem:** the uploaded phone screenshot and report show packed livestock facing one way while a robot dog circles. Source confirmed that the containment spring pinned each animal at its arrival position and retained inherited travel headings. The screenshot does not independently establish actual Pip coordinates or the cause of circling.

**Implementation/ownership:** one agent owned Buddy/simulation and natural-containment tests, another investigated player input and owned main/controller tests, and a third imported approved main delivery tooling with three-way document reconciliation. Root integrated, documented and ran the standard checked build. Natural rest uses per-animal bounded targets, staggered browsing cycles and long quiet/grazing periods. Hard surfaces receive varied capped resting turns without allowing grazing. Buddy uses persistent perimeter check destinations and 4–7s watching pauses facing the flock, with bounded inaccessible-sector fallback. A separate concrete input defect is fixed: lost pointer capture now cancels motion without tap/bark; idle Pip remains player-controlled. This may explain continued movement but is not proven as the screenshot's cause.

**Main integration:** imported delivery changes from main `3ccc8db39298159cc9c0c26f0c91919486a084d6`, preserving all Buddy source and tracking history. Standard `npm run build:checked:dev`, Deploy Flock, pure deployment planner/validator/publisher and runbook are used; legacy custom per-task publication is retired. The GitHub connector has no workflow-dispatch capability. Per current AGENTS.md, actual dev publication must be started through Actions UI on `buddy_behaviour`, environment `dev`; this correction is not live yet. Production is unchanged.

**Blind review:** fresh-context critic received acceptance criteria and isolated `/tmp/flock-natural-review` source/tests only, excluding writer rationale, prior scores and a target score. It found no material defect and scored 9/10:88 focused simulation/pose tests passed, including three-minute 65 mixed motion/diversity/grazing, tier/retrieval/crossing/pressure/state checks. An independent two-minute physical clearance probe had no Buddy/livestock overlap (minimum clearance beyond combined radii 2.85m). The initial reviewer snapshot lacked index.html, so controller tests could not launch; after root supplied the missing fixture, all 38 UI/controller tests passed. A later probe found avoidable watching before a distant flock was acquired. The final revision approaches the current nearest edge at working speed and permits checking/watching only after local acquisition. Same-critic recheck retained 9/10 with no material defect: 57 final-revision tests passed, including all 38 UI tests. Independent distant-flock probes acquired at 9.95s and 6.8s with zero unacquired watching, through bounded physical steps. Reviewer/model effort inherited the session; exact backend model/effort is not independently exposed and is not claimed.

**Final checks:** `npm run build:checked:dev` passed documentation/link/lifecycle and4 docs behavior checks, all 375 full regressions, release artifact QA exclusion and development QA inclusion. Three-minute65mixed integration checks bound centroid drift and individual home excursion, require diverse headings, asynchronous steps, long uninterrupted quiet/grazing and both physical Buddy checks and watching. Prior exact-pinning assertions became bounded/cumulative natural-rest assertions; independent travel, collision, tier, scoring and surface exclusions remain checked. No code changes follow the checked build; generated documentation is regenerated/checked after this evidence update.

**Limits/handoff:** metrics establish source behavior, not phone animation quality, subjective fun, touch usability or FPS. The Vite advisory large-chunk warning remains. F-COMP-010 and earlier Buddy items stay Review pending Novy's playtest/sign-off. Source will be pushed; publication remains the standard Actions UI step, not an unrecorded custom deployment.

## F-OPS-002 — Claude Code guidance, 19 October 2026

Branch: `claude/project-documentation-md-4kf197`, based on main `3ccc8db`. Documentation and agent-configuration change only; no runtime source, tests or build configuration changed.

Approach: the root `CLAUDE.md` imports AGENTS.md instead of restating it, and adds only Claude-specific mappings. The alternative, a standalone copy of the rules, was rejected because it would drift from AGENTS.md. Directory guides keep the root file short and load only where they apply.

Models: the implementation ran on the Claude Code session model, and the critic ran as a fresh lower-cost Claude subagent. Their exact model identifiers are not recorded here, because the Claude Code harness forbids writing model identifiers into repository files. This is a known gap in the AGENTS.md model-record rule.

Review: a fresh critic worked on a history-free isolated copy of the candidate, given only the task, the acceptance criteria and the scope. The first pass scored 8/10 with no material blocker. It found four problems: the review-isolation step could not work because the worktree needs commits the connector does not provide locally; the WebGL2 claim was unsupported; the Node and dev-server wording was imprecise; and the critic's restrictions were not marked as instruction-only. All were fixed. The same critic's follow-up scored 9/10 with no material blocker, and its one nit (a missing `mkdir -p`) was applied.

Validation: `npm run docs:check` passes, and `npm test` passes 341/341, run by the author and independently by the critic. `npm run build:checked:dev` passes. Claude Code mechanics (the `@` import, subagent frontmatter, lazy loading of directory guides) were judged from documentation knowledge, not exercised in a new session.

Delivery: committed with shell git under Novy's one-time waiver (see the F-OPS-002 tracker entry). There was no game deployment. Remains Review pending user sign-off.

### F-OPS-002 shared agent instructions — 19 October 2026

At Novy's request, the separate Claude guide was merged into AGENTS.md, which now serves Codex, Claude Code, Gemini CLI and other agents. `CLAUDE.md` and `GEMINI.md` are symlinks at the root and beside each folder guide. This supersedes the "imports AGENTS.md" approach above. One file avoids two copies of the policy drifting apart. Every existing AGENTS.md rule was kept; per-tool detail moved into tables.

Review: a new fresh critic got a history-free copy of the candidate, the previous AGENTS.md for a rule-by-rule comparison, the task and the acceptance criteria. It scored **9/10** with no material blocker. It confirmed every reference rule is present and not weakened, all eight symlinks resolve, and the commands and source facts match. Three minor findings were fixed:
- the shell-git waiver sentence is now tied to the user-precedence rule and mirrored in DEVELOPMENT.md;
- the scratch copy must sit outside the repository;
- the critic's pinned model can be overridden for escalation.

The Claude and Gemini model names in the tier table are family aliases, not verified model IDs.

Validation: `npm run docs:check` passes, `npm test` passes 341/341, and `npm run build:checked:dev` passes. Nobody has confirmed in live Codex, Claude Code or Gemini CLI sessions that each tool loads the nested symlinks. Models are recorded as described above. Remains Review pending user sign-off.

Source CI: run 39323862997 passed on `d3a1058`. Novy signed off on 19 October 2026, 14:03 America/Creston, and F-OPS-002 is Done ([closed record](ISSUES_CLOSED.md)). User acceptance covers the instruction files. Live loading of the symlinks by each agent tool is still unverified.


## F-OPS-003 — Live dev validation of the delivery workflow, 19 October 2026

Branch: `claude/build-deployment-scripts-6p1dnt`, created from main `6edfa57` with the connector. Model: Claude Code session model, identifier not recorded (the harness forbids model identifiers in repository files). No model or effort override.

Approach: exercise the checked-in entry points unchanged first, then fix only what the real run exposed. The alternative, editing the scripts before any run, was rejected: it could not show whether the tooling as merged actually works.

First run, unchanged tooling: local `npm run build:checked:dev` passed (docs check, 4/4 documentation behavior tests, 341/341 regression tests, release 27 files/0 QA assets, development 29 files/2 QA assets). A mocked dev publication of the real `dist/` produced 29 `dev/` paths plus `dev/.flock-deployment.json`. Deploy Flock run 39327138760 passed every step, and its live verification matched 29 files by SHA-256. A connector tree comparison confirmed the `dev/` blobs equal the local build and every other Pages path is unchanged. Headless Chromium with SwiftShader WebGL2 rendered the dev build under a `/Flock/dev/` path and started level 1 in portrait and landscape with no page errors or failed requests.

Fixes: action majors moved off Node.js 20 (`checkout@v5`, `setup-node@v5`, `github-script@v8`, `upload-artifact@v6`) in both workflows; the Pages wait loop logs each attempt; the runbook now documents connector dispatch. Both workflow files parse as YAML, and the extracted wait-step script passes `node --check`.

Review: no blind gauntlet. The change is a version bump, two log lines and documentation, judged not substantial. The stronger check is a real Deploy Flock run on the fixed revision. Run 39328324058 (`eed872a`) passed but showed `upload-artifact@v5` still targets Node.js 20; after the move to `@v6`, run 39328751422 (`032f03e`) passed with no warning and verified 29 live files. Source CI 39328751141 is green on `032f03e`.

Limits: the live site is not reachable from this cloud container, so live checks rely on the workflow's own hash verification. SwiftShader is a software renderer: no phone appearance, GPU, FPS, touch or listening evidence. Review pending user sign-off. The documentation commit used shell git under Novy's session waiver for large files (see the F-OPS-003 tracker entry).

Novy signed off F-OPS-001 and F-OPS-003 on 19 October 2026, 14:47 America/Creston; both are Done ([closed record](ISSUES_CLOSED.md)). User acceptance covers the delivery tooling and the dev deployments. Phone appearance, FPS, touch and audio remain unverified by this work, and no production deployment or merge was made.

## F-HERD-005 and F-WORLD-001 — crossing bottlenecks, 20 October 2026

Branch `feature/herd-bottlenecks` from main `7d848bc`. Implementation: session model, identifier not recorded because the Claude Code harness forbids model identifiers in repository files. Reviews: fresh `flock-blind-critic` Claude Code subagent (the economy tier configured in `.claude/agents/flock-blind-critic.md`) on a history-free copy with the baseline source beside it.

Approach: behaviour first (the investigation showed approach reversals, not geometry alone), as a separate simulation-layer module that only shapes a pressured animal's desired velocity, plus a level-generation spacing change for large herds. Rejected: wider decks only (helped the worst bridge by about 25% but left the behaviour) and bending rivers or fences (gates were not the bottleneck).

First blind review: **5/10**. Confirmed blockers:
- The measurement showed new pathological first-bridge cases (27–55 reversals per animal). Two causes: flock-travel direction counted as intent, and early commitment could send crossed animals back. A third cause was a measurement-player flaw: an animal far off the trail ahead of the flock ranked as "rearmost", so Pip ran back across the river.

Fixes:
- Intent is now direct Pip/Buddy pressure only.
- Early commitment needs that pressure and never recrosses a deck.
- Animals pinned beside a deck count as approaching it.
- The measurement player is corrected; baseline and candidate are measured with it alike.

The reviewer's spacing finding (gaps of 4–8 m on levels 10–15) did not reproduce. It measured a bridge on a different route; along the measured route those levels have 41–49 m, and the test now samples levels 6–100 using only the route's own bridges. Minor findings fixed:
- Tests added for the commit zone, turn-back inside it, gates, the entrance, opposing groups and state cleanup.
- The trivial pause test is replaced.
- Openings are cached; step cost is now within noise of the baseline (about 3.8–4.2 ms against 3.75–4.0 ms for 65 animals in Node).
- The docs give runtime estimates.

Measured results are in the F-HERD-005 tracker entry. Follow-up review results follow. Validation limits: scripted-player counts, Node timings and headless tests do not establish human feel, rendered appearance, touch usability or phone FPS.

Follow-up review by the same critic: **8/10**, no material blocker. B1 resolved on its own reruns (level 16 and 21 default layouts now better than baseline); B2 withdrawn after it re-measured with route-0 bridges only (minimum gap 26.6 m candidate vs 16.6 m baseline). Remaining minor findings and responses:
- Gate/entrance trade-off: confirmed by ablation (gate lanes and following both add small-level gate reversals); kept for completion reasons, recorded in the tracker.
- Oscillation when a player shoves a flock back and forth across a river: fixed; animals pushed back toward a deck they already crossed get no queuing help (old-player level 21 first-bridge reversals 35.7 → 6.7 per animal, baseline 3.6).
- Gate/entrance test did not discriminate: added an entrance test that fails with entrance queuing removed.
- Step-cost drift: about 5–10% at identical state in the reviewer's measurement; watch on phones.
- No early commit back over a crossed deck: intended, documented in GAMEPLAY.md.

The final measurement uses a steadier scripted player (keeps its target unless another animal is at least 3 m further back) after a re-run showed dithering between two strays; both baseline and candidate were re-measured with it.

Second follow-up by the same critic: **8/10**, no material blocker; m2 and m3 confirmed fixed, B1 still resolved. Remaining items:
- No test for the no-recross queuing rule: added (fails if the rule is removed).
- Small-level gate reversals rose with queuing at 10 m gates: queuing now applies only to openings narrower than 9 m; the final 36-layout table is in the tracker.
- Completion flips both ways in the critic's 12-layout sample: the inspected cases are scripted-player failures after the flock passed every opening; recorded as a measurement limit.

Third follow-up by the same critic: **9/10, no material blocker**. The no-recross rule and the 9 m width cut-off are each guarded by a test, and removing either fails it. Small-level gate reversals returned near the baseline, and the default-seed layouts on levels 16 and 21 finish with low bridge counts. Two layouts in the critic's 12-layout sweep that did not finish were probed. In both, the flock rested past every opening while the scripted Pip idled out of admission range: these are scripted-player failures, not herd stalls. The scripted measurement therefore cannot confirm "no new unfinished layouts", and this is recorded as a limit. Remaining minor items:
- The wide-opening exemption is now stated in GAMEPLAY.md.
- Buddy and drone herding at gates and the entrance remain untested by focused tests; Buddy pressure counts as intent in the code.

Final validation: `npm run build:checked:dev` and `npm run build:checked:production` pass (docs, full suite and both artifact modes). Implementation and source review are complete; F-HERD-005 and F-WORLD-001 are in Review pending device checks and user sign-off.

## Buddy/chokepoint main integration and fresh review — 20 October 2026

**Candidate:** `buddy_behaviour` head `368c4526577ac99c3642c6bfc4d6277d0013503b` combined with main `75ad6e1ea8ca91858c6ee8c5096234222c25cc22`, shared base `c35c466600f695f760294cd822209f5e4659c4d0`. Implementation and review: session model, identifier not recorded because exact backend model/effort metadata is not exposed; no model override. Implementation used an isolated candidate; a fresh independent critic received requirements and candidate files without writer reasoning, prior reviews/scores or target score, and did not read historical quality/review records.

**Integration:** retained both append-only documentation histories and combined the simulation's individual resting headings with main's direct-pressure `pushed` flag, narrow-opening yielding and traversal cleanup. Unconflicted runtime imports match main; Buddy navigation, natural containment, seven-second grazing and Pip cancellation are preserved. A combined narrow-bridge/open-gate regression verifies that containment cannot acquire approach drive, queuing state or premature deck commitment. Existing sheep/cow crossing coverage verifies dry-bank completion before local resting positions update. F-COMP-001/002/003/007/009/010 remain Review; main's accepted F-HERD-005/F-WORLD-001 archive is retained. Historical Review wording above is superseded by that accepted archive.

**Fresh blind review:** 9.3/10, no material blocker. One minor coverage gap: the crossing-state cleanup test mentioned delivered animals without actually delivering one. Strengthened it with seeded traversal history, actual attended admission, the matching `animalSaved` event and own-property absence checks for `bridgeCrossing`, `chokeYield`, `lastBridge` and `pushed`. A separate mutation copy fails when admission cleanup is removed. Follow-up by the same critic: 9.4/10, no remaining findings; focused recheck 12/12. This is follow-up validation, not a second blind first pass.

**Checks:** implementation focused combined suite 30/30; critic focused suite 78/78 and independent full suite 388/388. Final post-finding `npm run build:checked:dev` and `npm run build:checked:production` each pass all 388 regressions and docs checks. Release artifact: 27 files, zero QA assets; development artifact: 29 files, two QA assets. Standard Vite bundle-size advisory remains. Regenerate/check HTML after this evidence update. No runtime changes follow the reviewed candidate.

**Limits and delivery:** headless source/test review only; no new rendered gameplay, native touch/fun, audio or phone-FPS verification. This request merges main into the feature branch only. No deployment, production merge or new user acceptance is implied.

## Buddy merged-candidate dev deployment — 20 October 2026

User authorized dev publication of `buddy_behaviour`. Pinned source `17f648d16a33a4114f529b398dc67ece78b8a5bc` was verified byte-for-byte against all 191 source blobs, including binary assets and symlinks. Fresh `npm ci` and `npm run build:checked:dev` passed 388/388 regressions, docs checks, release 27 files/zero QA assets and dev 29 files/two QA assets. Source CI [39545969093](https://github.com/novydhillon/Flock/actions/runs/39545969093) succeeded. Runtime is unchanged from the fresh 9.4/10 follow-up reviewed candidate.

Workflow dispatch is absent from this session's connector registry, so the approved runbook's connector-only gh-pages fallback used the existing deployment planner, base64 blobs, a tree based on Pages `38d5e5a0d9abdf64cd6f659a1d296a0c8c166bfc`, and a non-force expected-head update. Pages commit `45110fa71db2922ed1cd6efe62d2f75984b8e886` changes only planned dev files and `dev/.flock-deployment.json`. All unrelated blobs and old hashed assets are preserved; production/main are unchanged. Native Pages [39546313498](https://github.com/novydhillon/Flock/actions/runs/39546313498) succeeded. An early verifier saw a missing new asset while Pages was still running; after native success, `node scripts/verify-deployment.mjs deployment.json` verified all 29 live files by SHA-256 against the checked build.

This supersedes earlier statements that the natural correction is not live. Evidence: [Buddy merged-candidate publication](validation/Buddy-natural-integration-publication.json). This is publication, not user sign-off. F-COMP-001/002/003/007/009/010 remain Review, with native phone feel/appearance, touch, audio and FPS unverified. No Deploy Flock run or workflow evidence artifact is claimed for the fallback.


## Map generation improvements — 22 October 2026

**Branch:** `map_generation_improvements`. Base: main `f5301a4fd8cf3fc6110bb692b1f0978145a4e594`. Scope: F-031/F-032/F-034/F-038, including Novy's later angular/L-shaped boundary and scrolling minimap clarifications. Owner/integration: Codex. Implementation and documentation agents inherited `gpt-6.1-sol`; inherited effort was not exposed. The fresh blind critic uses `gpt-6-luna` at medium effort; first-pass and follow-up evidence are recorded below. No economy-model implementation use is claimed. Parallel ownership separated world generation, gate/contact integration and documentation, with renderer/minimap integration owned by the coordinating agent. Complexity includes concave boundary geometry and cross-system collision/render/map agreement.

Approach: preserve early route teaching and existing physical herding, extend later field/route variation, use independent seeded streams for gates/walls/shapes and share a playable polygon between physics and views. Derive two gate pads from each panel rather than introduce another movement control; latch contact and refuse occupied-panel closing. Exact field/gate/shape weights are implementation tuning choices; only stone probability is fixed by the user at 15%.

Focused evidence so far: `node --test tests/gates.test.js tests/ui.test.js` passed 48/48 (gate agent). Coverage includes both pad approaches, four rotations, wood/stone, stay/reentry debounce, occupied-panel closing refusal, helper nonactivation, path/cache state, pause/restart, synchronized pad color and disposal. Generation checks cover seeded gate-free/gated alternatives, largest-cow (.975) and helper (.62) route walks, later field/lateral growth, angular outlines and a 1,000-seed stone distribution. An additional 240 later-map shape/route sweep reported clear routes. Three focused minimap tests passed. Combined full checks/review will be recorded below after the integrated candidate is frozen. An earlier shape test exposed an overly small stepped cutout; the geometry was increased before final review.

Source checks are separate from rendered/device evidence, human difficulty, touch feel and phone FPS. The four items are Review as prepared source candidates, with source validation and independent follow-up review recorded below; they remain Review until user acceptance. No development deployment, production merge or acceptance is claimed by this source record.

Helper comparison used the same representative ordinary-input policy on public level 20, with owned maximum upgrades filtered to that level's eligible effects (Buddy tier 1 and drone tier 3). Without helpers, the run ended partial at 55/62 after 177.1 simulated seconds; with helpers, it delivered 62/62 in 140.2 simulated seconds. This shows the candidate was exercised with helpers and that they materially assist this policy. It is one scenario, not a human-play difficulty target, universal completion proof or final balance approval.

Additional angular-map journey evidence used public level 40, gate-free seed 201. Without helpers, the same policy delivered 65/65 after 197.4 simulated seconds. With owned maximum upgrades activating Buddy tier 3 and drone tier 3, the run hit a 45-second wall-time cap at 130.9 simulated seconds with 0 saved and no completion. This run is inconclusive: it ended earlier in simulation time than the unassisted completion baseline, and neither proves a gameplay failure nor establishes helper balance. Human pacing and helper-balance acceptance remain pending. The 240-case polygon sweep covered indexes 39/40/59/69/89/99 across 40 seeds, checking actual cow/Pip spawns and .975-radius route clearance without failure. Final focused world/map tests passed 25/25, including five map-generation tests.

Documentation regeneration/check passed: 13 pages, 1,696 local links/anchors, nine parsed diagrams and four DOM behavior tests. These checks verify generated consistency, links and behavior substitutes; they do not establish native diagram or game rendering.

**First independent blind review:** `gpt-6-luna`, medium effort, scored the isolated candidate 7.5/10. Findings included three full-suite fixture failures exposed by the new gate distribution/contact behavior and a visual-contract gap: playable turf did not yet distinguish the concave polygon from the rectangular surrounding ground. Confirmed fixtures were updated to exercise the intended generated/contact state. The renderer now triangulates the concave polygon into brighter playable turf above darker surrounding countryside, owns its geometry and disposes it on replacement; a focused area/upward-normal/disposal test passes. This is source/geometry evidence, not a rendered appearance claim. Follow-up review is recorded below.

A final route-spacing check matches each actual gate to its own route, covering 64 panels/open gaps rather than assuming route 0. It exposed a pre-existing 0.006-unit shortfall against the 26-unit exit-spacing assertion on public level 16, route 2. An extra .1-unit breathing tolerance for herds over 30 moves the downstream gate/target while preserving river bases. The adapted spacing, map and journey group passed 22 tests. The checked development build and explicit artifact checks pass after these changes; the production checked build also passes.

Browser smoke verification was attempted but unavailable: Playwright is installed, while its Chromium executable is absent. No browser-rendering, mobile touch or phone-FPS checks are claimed.

**Independent follow-up:** the same critic rechecked the refreshed isolated candidate, scored it **9.2/10**, and found no material source blocker. It independently ran `npm test`: **399/399 passed**. This is follow-up validation, not a second blind first pass. Root `npm run build:checked:dev` also passed all 399 regressions and docs checks; explicit development artifact verification confirms 29 files/two QA assets, and the release check confirms 27 files/zero QA assets. Standard Vite bundle-size advisory remains.

**Final validation:** `npm run build:checked:production` passed all 399 regressions, docs checks, production build and release artifact check (27 files, zero QA assets). The checked development build also passed; explicit dev verification found 29 files/two QA assets. Final regenerated documentation passes 13 pages, 1,699 links/anchors, nine diagrams and four DOM tests. No runtime edits follow the 9.2/10 recheck. Source is prepared for connector publication on the feature branch; no Pages deployment, main merge or user acceptance is included.
