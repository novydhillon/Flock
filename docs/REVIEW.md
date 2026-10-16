# Documentation review record

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
