# Flock: Little Robot, Big Pastures

## User sign-off - 15 October 2026, 16:34 Vancouver

Novy explicitly signed off all pending Review items: **F-022, F-023, F-024 and F-040 are Done**. Acceptance applies to the live development build at Pages `bf26e67732434e902fdbaef10cac72d6814c33b0`, runtime source `1909c87bc1f70c4e53f4b38d64beaa2d4bb6d3aa`, including full-view/angled rain, no storm wildlife, accumulating puddles, deeper variable 3-5 second reverberant thunder after lightning, the 50% master volume increase and brighter lightning. This is user acceptance; historical headless checks and device-performance evidence retain their original limits. **At that weather sign-off checkpoint no items remained in Review.** The later flock-behavior batch F-035/F-037/F-039/F-041 is now Review. Open queued items remain Open; F-008 clouds remain Deferred. Older Review/pending wording below describes earlier checkpoints and is superseded by this sign-off. Documentation only; game bytes are unchanged.


A cheerful 3D herding game for portrait phones. Guide a robotic sheepdog through handmade-looking countryside and bring your robotic flock home. Start with a small sheep flock, then tackle longer routes, larger groups, bridges, gates, and other destinations. Earn points for upgrades and autonomous helpers.

Development branch: `flock_3D_chatgpt-work`.

Documentation: [Start here](docs/README.md) · [HTML field guide](docs/html/index.html) · [Requirements](docs/REQUIREMENTS.md) · [Issue tracker](docs/ISSUES.md).

Play the standalone development build at [novydhillon.github.io/Flock/dev2/](https://novydhillon.github.io/Flock/dev2/). The existing `flock/dev/` game is preserved separately.

## Engine choice

This build uses **Three.js**, with Vite for packaging. The requested ThreeRust engine at [threerust.com](https://threerust.com/) was investigated first. Its public offering is an early-access Rust/WebAssembly/WebGPU browser editor with RHAI scripting; a reusable runtime SDK suitable for this repository was not available through its public documentation. The user approved the Three.js fallback. This project does not claim to use ThreeRust or the separate `three-rs`/`threers` Rust projects.

Three.js renders the world in true 3D with WebGL. The original characters and scenery use rounded clay-like shapes, colorful metal panels, visible mechanical joints, and glowing robot details.

## Run locally

Use Node.js 22 or newer:

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

Open the local URL printed by Vite. To run the simulation tests and build a standalone site:

```sh
npm test
npm run build
npm run preview -- --host 0.0.0.0
```

The production build is written to `dist/`. Relative asset paths allow it to run beneath `/Flock/dev2/` without a backend or CDN dependency.

## Playing

- Use one thumb on the movement control to steer the robotic dog.
- Drag anywhere on the meadow to steer, or use WASD/arrow keys on desktop. Double-tap the meadow or tap Woof for a short herding burst.
- Approach the flock from behind to guide it toward the highlighted destination.
- Keep the flock together while following routes through the countryside.
- Delivered robots keep roaming gently inside the goal enclosure, with full-body confinement even at the entrance. They remain delivered; pause and QA editing freeze their motion.
- The first attended arrival starts a 30–60 second recovery countdown. Bring everyone home early or finish with a partial score at timeout. Any positive delivery opens the next meadow.
- Earn bolts equal to improvements in your lifetime best proportional score, then spend them on skills and helpers. Replays at the same or a lower score pay no extra bolts.
- Six skills have three tiers each: Turbo paws, Friendly signal, Scout drone, Buddy dog, Happy bark, and Flock harmony. The workshop shows the next tier's effect, cost, and level requirement. Skills appear throughout the first fifteen levels; the drone starts at level 10, and the more expensive Buddy dog starts at level 20.
- The drone holds the main herd when Pip leaves. Buddy works from the rear along flock travel; its second tier supports the smaller split flock, and its third tier retrieves wanderers/bolters to the nearest flock group and barks autonomously. Pip still leads admission at the destination.
- Music starts after a player interaction, following mobile browser audio rules. Use the sound control to mute it.

The opening pasture teaches herding with a small sheep flock and a nearby pen. Later procedural pastures introduce longer routes, rivers and bridges, roads, operable gates from level 20, selected stone walls, more animals and new destinations. Ambient wildlife and scenery scale with meadow size. The new weather candidate removes snow and uses fixed per-level weather: light rain from public level 9, heavy rain from 16 and storms from 24. Each type stays fixed while rain, cloud drift, ground wetness and lightning animate. Eleven other P2 features in the published build were accepted on 15 October 2026 at approximately 10:56 America/Vancouver (Pages `cc13865`, source `b1fdac3`). F-030–F-039 are separately queued enhancements; F-040 is implemented and in Review pending weather acceptance. Progress is stored locally in the browser; clearing site data clears that progress.

## Deployment

Latest development release: delivered animals roam gently within the goal with full-body confinement, including the open entrance. Pages `639a9b4`, source `e03ba16`; CI and 165 tests pass, blind review 9.5/10, all 18 expected live files match. User acceptance recorded 15 October 2026 at 00:28 America/Vancouver. [Validation details](docs/validation/P0-P1.md).

Previous verified follow-up: shorter bridge landings with actual-body clearance steering, and the entire occupied barn roof/facing sides at 30% transparency (opacity 0.70). Pages `8a76de3`; source `4d3cadc`. All 18 expected live files match; source CI passes 162 tests. See the [validation record](docs/validation/P0-P1.md).

The canonical development game is [https://novydhillon.github.io/Flock/dev2/](https://novydhillon.github.io/Flock/dev2/), served from `dev2/` on `gh-pages`. F-025 migration was published at Pages commit `baca95c7ba618d736730194b433254bf5058dd66`: all 15 game files and the legacy redirect were hash-verified; 17 unrelated blobs were unchanged. The previous `/Flock/flock/dev2/` address redirects to the canonical game while retaining query and fragment. The reviewed P1 development build is now published at Pages `9346f26c5a145698b34e2c4504236c494023817d` from source `7a8519d37a8f447652f0449e16a050fc76a6d3e0`. All 17 game files plus the legacy redirect match the prepared build hashes; all 18 blobs outside `dev2/` are unchanged.

The source workflow tests the game, builds/checks release without QA, then builds/checks the QA-enabled development distribution for its artifact; upload does not publish Pages. `npm run build` makes a production bundle without QA. `npm run build:dev` makes the explicit development distribution with the QA menu. Use the intended build before preparing a release:

```sh
npm run build:dev
node scripts/check-build-mode.mjs development
node scripts/deploy-pages.mjs /tmp/flock-pages-review
git -C /tmp/flock-pages-review diff --cached --stat
```

The helper validates local HTML/CSS/JavaScript asset references before creating a detached worktree from the locally fetched `origin/gh-pages`. It stages `dev2/`, the legacy redirect and `.nojekyll` only if missing; it never fetches, commits or pushes. Review the full diff, preserve unrelated content, and verify live hashes after native Pages publication. See [release instructions](docs/DEVELOPMENT.md) and the [P0/P1 validation runbook](docs/validation/P0-P1.md).

Local development and explicit development builds expose **QA · dev**. Opening it starts an isolated test profile: QA 0 is a tutorial shortcut, public levels remain 1–100, and test edits never save to the normal profile. Jump levels, adjust test bolts, reset the session, or export scenario JSON. Animal selection and coordinate positioning are temporarily hidden. Close QA with the × button or Resume; reload also exits QA. Physical touch usability remains awaiting device validation.

## Scope

This is a playable development build. It stores progress on-device and uses procedural geometry and generated material textures. It has no account system, online multiplayer, or cloud save service.

The campaign contains 100 deterministic procedural meadows. Flock size increases to a maximum of 65; journey distance continues increasing afterward. Levels 1–5 have compact, single-route lessons. From level 6 the fenced roaming area expands, with one or two trails through level 15 and up to three afterward. Destinations rotate across compass directions, and winding trails connect real bridges and gate openings with clear staging space before the goal. Gates become operable at level 20; selected levels use stone barriers. Rivers continue beyond the perimeter; scenery hills stay outside playable ground.

Sheep and cows use articulated, instanced leg poses at a stop-motion cadence. Grass and dirt have deterministic tileable color and bump textures, with decorative flowers, grasses and reeds. Trees and bushes add procedural bark/leaf detail. Area-scaled rabbits, squirrels, birds and butterflies react to nearby robots; ambient wildlife can cross fences and briefly wander outside the field while water and trees remain obstacles. F-040 replaces changing weather and snow with fixed clear/breezy/light-rain/heavy-rain/storm levels. QA levels 9/16/24 demonstrate the three rain tiers immediately; the mission panel labels the weather. Clouds and their shadows are disabled. Rain covers the full view, storm levels omit wildlife and use slanted rain with paired thunder, and seeded small puddles grow over the level. Other weather retains wildlife shelter; directional river flow, wet ground and bounded footstep splashes remain. Pip's tail light turns red during a bark, and the player can open nearby level-20+ gates. Novy accepted the published squirrel, water-flow, gate, wall, tail-light, wanderer, rabbit, bush, tree-detail and wildlife-edge items on 15 October 2026 at approximately 10:56 America/Vancouver (Pages `cc13865`, source `b1fdac3`). New requirements F-030–F-040 are not part of that acceptance.

Automated checks cover simulation, upgrades, controller navigation, touch cancellation, denied storage, renderer matrices and resource disposal. The renderer tests use real Three.js geometry with a substituted GPU interface; they do not verify rendered pixels or phone frame rates. Actual mobile play, sound balance and GPU performance need device testing.

Prior accepted P2 release is published at [Flock/dev2](https://novydhillon.github.io/Flock/dev2/), runtime source `b1fdac3` / Pages `cc13865`. Independent source reviews meet 8/10; CI and live hashes are verified. Eleven P2 items were accepted for this published build on 15 October; F-030–F-039 remain Open; fixed-weather work F-040 and its related P1 items are in Review. See [tracker](docs/ISSUES.md) and [quality evidence](docs/QUALITY.md).

Latest weather candidate is live at [Flock/dev2](https://novydhillon.github.io/Flock/dev2/): source `878efee`, Pages `27b1bf5`. CI/Pages passed, all 18 intended live files match, and unrelated Pages files are preserved. Test QA levels **9** (light rain), **16** (heavy rain) and **24** (storm). These weather items remain Review; the 11 earlier approvals remain Done, and new non-weather requests F-030–F-039 remain queued.

Clouds are temporarily disabled at Novy’s request on 15 October 2026 (F-008 Deferred), including cloud ground shadows. Rain, fixed-level weather, storm lighting/thunder and wet-ground effects remain active. Test QA 9/16/24 for light/heavy/storm weather; no cloud overlay or cloud shadow should appear.

Current weather repairs: [requirements](docs/REQUIREMENTS.md#weather-follow-up---15-october-2026-1222-vancouver). Weather is Done by user acceptance on 15 October 2026 at 16:34 Vancouver; clouds remain Deferred.

Current flock-behavior candidate: a per-level 20% undelivered cohort gets individual 5-8s checks; wander/bolt outcomes settle near their reached positions until actively herded. Late-level odds and duration bands are in [requirements](docs/REQUIREMENTS.md#flock-wandering-and-bolting-revision---15-october-2026). F-035/F-037/F-039/F-041 are Review, separate from accepted weather/audio.
