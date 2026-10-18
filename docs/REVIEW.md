# Documentation review record

## Buddy puppy and movement blind review - 17 October 2026

Candidate `c3c325a` received fresh isolated `gpt-6-luna` medium source/geometry and documentation critics without implementation discussion or prior scores. Source critic: **8.5/10**, no confirmed defect, 52/52 focused tests independently passed. Documentation critic: **8/10**, generated docs/four DOM tests pass; found requirements still calling F-048 queued while tracker correctly claimed implementation. The stale status is corrected, as are old current-system descriptions of a walking Buddy. Source review is not rendered likeness, phone legibility or mobile-FPS evidence; F-048/F-056 remain Review for user acceptance.

18 October follow-up: current policy requires 9/10 and `/Flock/dev/`. The original source critic held 8.5/10 with native evidence limits; documentation found old operational policy conflicts, now corrected. Independent `gpt-6.1-sol` medium integration review of `19ec61a` scored source implementation/coverage 9.1/10 with no material defect and 52 passing tests. A prior score was accidentally exposed in the adjacent tracker status; this is disclosed independent follow-up, not claimed as another fully blind first pass. Added the suggested moving/stopped/moving low-speed test beside an obstacle. Documentation follow-up: 9/10, no material blocker, docs plus four DOM tests pass. Native/device acceptance remains pending and is not inferred from the source scores.

Scope: requirements, system context and the generated HTML documentation. These scores rate documentation, **not the game**. Updated 14 October 2026.

## Blind review method

Two fresh agents received the same committed candidate (`bd227d3`) in separate detached worktrees. They were instructed not to inspect Git history, sibling workspaces, other agents' findings or earlier documentation scores. They received the user’s documentation task without a target score. One reviewed content against source/tests; the other reviewed HTML fidelity, navigation, accessibility and behavior with DOM substitutes. Historical game scores in QUALITY.md were explicitly excluded as documentation evidence.

| Review | First pass | Confirmed findings | Follow-up |
|---|---:|---|---|
| Content | 8.8/10 | Root README still gave superseded publish instructions; helper validation/scope claims overstated; promised review record absent | Resolved; follow-up 9.2/10 at `7899759` |
| HTML format/content | 8.6/10 | Appearance toggle left diagram theme unchanged; failed legacy clipboard copy leaked a textarea | Resolved; follow-up 9.0/10 at `7899759` |

The HTML critic’s first-pass categories were content/fidelity 9.1, format/navigation 8.5, accessibility 8.2 and functionality 8.6. Both first passes exceeded the user’s 8/10 threshold; confirmed issues were still repaired rather than ignored.

## Final follow-up results

The original critics independently rechecked `7899759`: content **9.2/10**, HTML overall **9.0/10** (content/fidelity 9.1, format/navigation 8.7, accessibility 8.7, functionality 9.2). Both reported no remaining confirmed defect or blocker. This is follow-up validation after a blind first pass, not a new blind review. The final review-record edit only records these results.

Both reran `npm run docs:check`: **11 pages, 614 local links/anchors, nine parsed diagrams and four passing DOM behavior tests**. The HTML reviewer additionally held a diagram render open across rapid theme changes and confirmed no overlap with the correct final theme; repeated false clipboard returns, thrown exceptions and async Clipboard API rejection left no temporary textareas. Native browser limits below still apply.

## Evidence

- Independent content review ran all **99 source tests**, the documentation checks and all three runnable architecture/gameplay/world examples successfully.
- Both critics independently ran the first candidate’s deterministic generator/link checks: 10 pages, 551 local links/anchors and nine diagrams.
- The HTML critic parsed all nine diagram sources with the actual bundled Mermaid library; DOM substitutes exercised search, keyboard focus, clipboard and appearance persistence and reproduced both UI issues.
- Revisions clarify that F-025 remains P0 and unimplemented; the preparation script checks only `dist/index.html`, replaces the old nested folder and also writes/stages `.nojekyll` at the Pages root.
- HTML revisions serialize diagram theme rerenders and clean up temporary clipboard fields in a `finally` block. The source alternatives beneath diagrams remain readable.
- The generator checks local document/source links and anchors, current generated output, offline runtime assets and traceability of all F-001–F-025 requirements. CI runs documentation checks before source tests/build.

## Verification limits

No approved browser environment was available for real rendered screenshots, SVG layout, native dialogs, touchscreen interaction, actual `file://` clipboard permission or print output. Source, parsed diagram syntax and DOM substitutes support the scores; they do not prove pixel-level visual quality. Manual browser smoke tests remain useful.

The external 12ui design workflow was blocked by automatic approval review because sending the project brief to that service was not authorized. The documentation interface was built locally; no approval to disclose that brief is implied by these review scores.

## Maintenance

Update this record when subsequent documentation changes receive new review evidence. Keep writer context and past documentation scores out of any new blind review packet. Rechecks by the original critics are follow-up validation, not a new blind first pass. Regenerate HTML after editing this record and keep requirements/issue statuses unchanged unless implementation evidence justifies a change.


## P2 documentation maintenance review — 15 October 2026

A fresh independent source/document critic checked the updated requirements, architecture, system contexts, tracker and generated HTML against the P2 source candidate. Initial result: **7.5/10**. Findings were stale blanket Open/pending-blind-review status summaries and an inaccurate weather time boundary: visual weather advances in playing, intro and visible results, while gameplay simulation advances only during playing. The revisions distinguish Review candidates from the currently deployed F-028 release, link completed source reviews, retain pending physical/device acceptance, and document presentation time. A hidden-intro/results guard now explicitly freezes scenery time while the tab is hidden.

The reviewer executed the Architecture Node example and checked API/river-descriptor shapes against source. HTML validation covers 12 generated pages, local links/anchors, nine parsed Mermaid diagrams and four DOM behavior checks. Final follow-up: **8.5/10**. Status/time-scope findings were resolved; the critic also found a stale F-014 Blocked sentence in Development, now corrected to prior user acceptance plus unavailable independent P2 device verification. Final check: 12 pages, 783 local links/anchors, nine parsed diagrams and four DOM tests. These are content/source and DOM checks; no native browser layout, screenshot or print-quality claim is made.


## Acceptance and fixed-weather documentation update — 15 October 2026

The user accepted 11 P2 issues; the tracker records those as Done and queues F-030–F-039 separately. F-040 supersedes snow and dynamic weather, with related P1 items in Review for the new source candidate. Requirements distinguish explicit user requests from chosen tuning values (heavy level 16, storm level 24 and seeded weights). Context now describes fixed state, actual orthographic rays, line precipitation, matched shadow drift, first-frame wet-ground baselines, labels and pause/audio lifecycle. Generated HTML remains the navigable copy. The weather source/geometry critics' scores are recorded in QUALITY.md, with no browser-render claim.

Independent documentation follow-up: **8/10**. Corrected the mistaken attribution of fixed weather to the prior `b1fdac3` runtime and the summary calling already accepted P2 items pending. Current source vs prior release, 11 accepted items, reopened weather and queued requests are now distinct. Checks: 12 pages, 828 links/anchors, nine parsed diagrams and four DOM tests. New weather appearance/audio acceptance is pending; it is not a source-publication blocker.

Cloud-removal maintenance, 15 October 2026: current requirements/context now defer F-008 and remove cloud/shadow runtime ownership while retaining rain/storm effects. F-041 is separately queued P2 behavior. Historical cloud geometry scores remain historical; no new cloud appearance success is claimed.

## F-051 compact HUD blind source review

A fresh critic reviewed the candidate in a detached worktree without history, implementation reasoning or previous scores, using `gpt-6-luna` at medium effort. Result: **9.3/10**, no source defects. The critic independently passed 29 focused controller tests and a production build. Exact CSS layout and pointer appearance across aspect ratios require native-device acceptance; these were not claimed as rendered tests. Documentation received a separate fresh medium-effort critic.

The separate blind documentation critic scored **8/10**, requesting explicit commit/command evidence, source/test references and sharper distinction between controller checks and rendered geometry/layout. These records now include all three; phone acceptance remains pending.

Documentation follow-up reached **9/10**, with all requested evidence and limitation fixes resolved. The critic independently passed `npm run docs:check`. Exact artifact checks used `node scripts/check-build-mode.mjs release` and `node scripts/check-build-mode.mjs development`.

### F-051 tip-02 repair blind review

A fresh critic in an isolated detached worktree reviewed only the tutorial fix, requirements and tests, without implementation history or past scores. `gpt-6-luna`, medium effort: **9.4/10**, no source defect; independently passed all 29 UI tests. The critic confirmed mutually exclusive progression, full dwell, pause/manual/reset behavior and documentation consistency. Source/DOM timing evidence does not prove phone appearance.

### F-051 manually reopened loop review

Fresh isolated medium-effort `gpt-6-luna` critic: source 9/10, with two test timing expectations needing correction. Final follow-up passed all 31 UI tests and scored 10/10 with no remaining issue. Controller/source/document consistency checked; no phone rendering claim. The implementation uses one applicable tip list for both automatic and manual display; only manual display loops.

### F-052 QA gear blind review

Fresh isolated medium-effort `gpt-6-luna` critic: **9.5/10**, no source-level defect; all 12 focused QA unit/debug/integration tests passed. Reviewed launcher placement, touch size, accessible identity, lifecycle and production exclusion guards against F-052 documentation. Native phone safe-area/tap appearance remains unverified.

### Production HUD integration review

Fresh medium-effort `gpt-6-luna` critic reviewed the merged production candidate independently: **9.5/10**, no release blocker. Documentation checks passed (12 pages, 1,028 links/anchors, nine diagrams, four DOM behavior checks). An isolated release build independently passed artifact-mode checks with 15 files and zero QA assets. Main workflow skips QA packaging; development workflow remains intact. No fresh phone rendering claim.


## F-054 clay tree review

Historical review of the earlier tree candidate; it does not cover the trunk-thickness, longer-branch and foliage-scale follow-up now pending on `pip_update` / `dev2`.

A fresh isolated `gpt-6-luna` medium-effort critic reviewed candidate `b071369` against the tree request, source and tests without implementation history or earlier scores. Initial 6.5/10: crown width failed its existing test, roots did not flare radially and leaf marks sat outside crown shells. Runtime `bf5bb48` corrects those findings. Same-critic follow-up: **9/10**, no remaining source defect; 21/21 vegetation/render tests passed independently. A separate fresh documentation critic scored 9/10; the missing tracker overview entries were added. Parent final checks: 280 source tests, both artifact-mode checks and generated documentation checks pass. This is source/DOM geometry evidence; native appearance, phone FPS and F-054 user sign-off remain pending.


## F-054 proportions follow-up review

A new isolated `gpt-6-luna` medium-effort critic reviewed `1ef1030`, without prior implementation reasoning/history or scores. Result: **8/10**, no concrete source blocker; independently passed 22/22 renderer/vegetation tests. It confirmed actual transformed width interpolation at smallest/middle/largest supported scales, unchanged branch scaling, nine cached palette/maturity models, increasing 5/7/9 crown counts and radial crown-size taper. Native likeness, separation, occlusion and phone performance remain pending; the score is source evidence only. Parent full suite passes 281 tests, both artifact-mode checks and documentation checks.


## F-054 organic branching blind review

A fresh isolated `gpt-6-luna` medium-effort critic reviewed runtime `5399dcc` against the organic-tree requirements without earlier implementation reasoning/history or scores. **8/10**, no source geometry defect. It independently passed renderer/vegetation24/24 and nature18/18, checking actual transformed fork radii (including continuing leaders), staggered connected bent limbs, 7/9/11 overlapping crowns, independent repeatable yaw, bounded caching and non-disposal of shared geometry. The stale 5/7/9 / three-baked-mesh presentation description was corrected during documentation integration. Joint/frustum appearance remains a native visual check; cloud Chrome could not create WebGL2. Parent full suite:283/283; both artifact modes and generated docs pass. This is source validation, not phone appearance/FPS acceptance.


## F-054 welded mesh blind review

Fresh isolated `gpt-6-astra`, high effort, reviewed integrated runtime `8946992` and independently evaluated the subsequent branch-junction correction without prior implementation reasoning or scores. Initial review found exposed upper-fork corner normals crossing behind adjacent face normals. Moving the first branch ring outward and slightly lowering its lift removes that inversion; the implementation owner applied the correction and added an above-ground corner-normal regression. Final verdict: **9/10**, no remaining source blockers.

The critic independently checked 303 variant/width combinations for upper-wood normal alignment (minimum face-corner dot +0.10087), plus 21 geometry cases for manifold vertex links, triangle crossings including shared-vertex neighborhoods, bounds, areas and shader-normal agreement. It confirmed 274 vertices / 544 triangles in a single closed welded surface, smooth taper, curved staggered forks, area-preserving branching, width/yaw/foliage integration, culling, ownership/disposal and preservation of Pip lighting. Baseline focused tests and production build passed. Offscreen EGL diagnostics support mesh/shader behavior; no browser WebGL2 game render, mobile FPS or user appearance acceptance is claimed.
