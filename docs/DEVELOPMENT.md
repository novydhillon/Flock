# Development, QA and release context

[Documentation home](README.md) · [Architecture](ARCHITECTURE.md) · [Issue tracker](ISSUES.md)

## Local setup

Use Node.js 22 or newer and the locked dependencies. Run commands from the repository root.

```sh
npm ci
npm run dev -- --host 0.0.0.0
# Production checks and static build:
npm test
npm run build
# Explicit development distribution with isolated QA controls:
npm run build:dev
```

Vite writes `dist/`; `npm run preview -- --host 0.0.0.0` serves that build when a browser-enabled environment is available. Local font assets are included. WebGL 2 is required by the current renderer. Audio requires browser user interaction; initial play or enabling sound initiates activation.

## Documentation maintenance

Markdown in `docs/` and the root README is the editable source. Generated HTML is checked in under `docs/html/`, including local CSS, navigation/search JavaScript and Mermaid. To refresh and validate:

```sh
npm run docs:build
npm run docs:check
# Open docs/html/index.html directly in a browser.
```

The generator resolves links among the documented pages, creates heading anchors and a page table of contents, and emits an offline search index. Documentation checks also parse all Mermaid diagrams and exercise search, focus, copy cleanup and theme rerendering using jsdom; these DOM substitutes do not verify native browser rendering. Edit Markdown, not generated HTML. Regeneration must be deterministic. Keep third-party diagram code and license notices together. Adding a page requires adding it to the generator's explicit document list, then rebuilding and checking links.

## Test map

| Tests | What they support |
|---|---|
| `tests/simulation.test.js` | Herd delivery, body collision, reward/profile behavior |
| `tests/companions.test.js` | Largest connected herd, holds, attendance, barriers |
| `tests/world.test.js` | Generation, route/footprint validity, clearance and seeded fixtures |
| `tests/herding-journey.test.js` | Entire flocks delivered with ordinary simulated dog inputs in selected levels |
| `tests/progression.test.js` | Tier cost/unlock/activation and legacy data validation |
| `tests/ui.test.js` | Production controller against DOM/audio substitutes; navigation, rewards, restart and input |
| `tests/delivery.test.js` | First-arrival timer, partial score, lifetime earned ledger and legacy migration |
| `tests/goal-view.test.js` | Shared target highlight/border/floor and projected minimap corners |
| `tests/world-geometry.test.js` | Perpendicular crossings, deck/path ratio and shared full-body target footprint |
| `tests/surfaces.test.js` | Ribbon union topology and bark surfaces on land/deck transitions |
| `tests/cutaway.test.js` | Camera-ray section fading, pause, hysteresis and material restoration |
| `tests/qa.test.js` | QA mapping, edit constraints, isolated controller state and build gating |
| `tests/deploy-pages.test.js` | Validated relative assets, canonical staging, redirects and preserved Pages bytes |
| `tests/render.test.js` | Geometry, camera matrices, culling, batches and disposal |
| `tests/nature.test.js` | Wildlife, weather, resource budgets and cleanup |
| `tests/audio.test.js` | Audio activation races, scheduling, ambience and disposal |

```sh
# Targeted examples; not a substitute for relevant integration checks.
node --test tests/ui.test.js tests/audio.test.js
node --test tests/world.test.js tests/herding-journey.test.js
```

No screenshot or human listening claim follows from a mocked Canvas/WebGL/WebAudio test. Record real device/browser, revision, scenario and evidence for native touch, scrolling, visibility, audio and GPU performance. Large headless triangle counts are not phone FPS.

## CI and current publishing behavior

The source branch is `flock_3D_chatgpt-work`. [The workflow](../.github/workflows/deploy-dev2.yml) installs dependencies, checks documentation/tests, builds release and verifies QA exclusion, then builds the development game and verifies QA inclusion before uploading `dist/`. Its artifact upload **does not publish Pages**. GitHub Pages uses the separate `gh-pages` branch and its native deployment workflow.

F-025 is complete. The helper stages the game under `dev2/` for **https://novydhillon.github.io/Flock/dev2/** and replaces `flock/dev2/` with a redirect preserving query/fragment. It validates the emitted relative asset dependency graph before changing a Pages worktree, rejects unsafe/missing assets and build symlinks, and preserves existing root `.nojekyll` bytes. It uses a locally fetched `origin/gh-pages` and never fetches, commits or pushes.

The verified migration Pages commit is `baca95c7ba618d736730194b433254bf5058dd66`: all 15 game files and the redirect were hash-verified, and 17 unrelated blobs stayed unchanged. The live migration contains the preceding game revision; do not infer that the new P1 source batch is deployed. See [validation evidence](validation/P0-P1.md).

`npm run dev` and `npm run build:dev` enable QA; normal `npm run build` removes the dynamic QA branch/module and its mutation handlers. CI packages the checked development build after checking both modes. `node scripts/check-build-mode.mjs release` rejects QA chunks/signatures in a release artifact; `node scripts/check-build-mode.mjs development` requires the QA JavaScript/CSS and expected entry/export signatures. For a development publication, use the checked final `build:dev` artifact.

The isolated QA panel supports level jumps, test bolts, session reset and scenario export. Animal selection and coordinate positioning are temporarily hidden; the panel can be closed with its × button or Resume.

```mermaid
flowchart TD
  Source["Commit source branch"] --> CI["Tests + build + artifact"]
  CI --> Review["Review scoped Pages tree"]
  Review --> Pages["Commit gh-pages"]
  Pages --> Native["Native Pages deployment"]
  Native --> Verify["Verify canonical URL + all assets"]
```

## Release checklist

1. Read the latest issue/requirements decisions and fetch source and `gh-pages`. Require a clean intended source revision; do not overwrite another publisher's newer Pages head.
2. Pass relevant tests and both build modes when QA is affected. Rebuild the intended final distribution (`build:dev` for this development game); inspect QA presence/absence in each bundle. Stage only the intended `dev2/` output and any explicitly agreed old-URL redirect. Preserve the root, existing `flock/dev/` and unrelated content. Do not alter saved profile keys.
3. Review the Pages-tree diff against the latest parent. Verify relative asset paths and the `/Flock/` repository URL prefix. Record the source SHA associated with the build.
4. Commit/push Pages with a checked expected parent/ref. Wait for successful native Pages deployment, not just successful source CI.
5. Fetch the new live HTML and every generated asset; compare bytes/hashes with the build. Run real-browser smoke checks when available. Record Pages SHA, workflow result, canonical URL and any validation limits.

Documentation HTML is a repository deliverable in `docs/html/`; it is not automatically copied into the game build or published as another Pages site. A future hosted docs URL needs an explicit publishing location and preserved-content review.

## Agent handoff

Use isolated worktrees for parallel owned files; integrate commits only after inspection. Blind reviewers should receive the candidate, task/requirements and scope, not historical scores or desired wording. Record confirmed problems, concrete evidence and checks. A threshold score is not a reason to relabel unverified browser behavior as tested.

See [P0/P1 runbook](validation/P0-P1.md) for concrete manual scenarios. F-014 remains Blocked without a physical phone. The installed Sites instruction says “If `$control-browser` is unavailable, skip browser QA” (`/root/.codex/plugins/cache/openai-curated-remote/sites/1.0.0/skills/sites/SKILL.md`); capability discovery found no browser tools, so this session supplies no browser screenshots or native-device claim.

Before ending a session, update the issue execution record, regenerate HTML, run documentation checks, commit/push the intended branch and state exactly what was deployed. Do not close open features just because their requirements were documented.

### Deployment validator parser

The Pages preparation helper uses Rollup’s JavaScript AST parser to inspect literal static imports, re-exports, dynamic imports and `new URL(..., import.meta.url)` assets. It does not treat words such as “Export scenario” in QA markup or comments as dependencies. Every emitted stylesheet is also checked, including lazy QA styles loaded through Vite dependency tables. Runtime-computed URLs still require final live asset verification. Rollup is an explicit development dependency; install the lockfile before invoking the helper.
