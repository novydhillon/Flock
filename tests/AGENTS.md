# Test notes

Deployment follows the root guide: prefer Deploy Flock dispatch; if unavailable, use the connector-only gh-pages fallback in docs/DEVELOPMENT.md with unchanged build, authorization and verification gates.

These notes add to the root [AGENTS.md](../AGENTS.md) for work in `tests/`.

- Tests use the built-in Node runner (`node:test` and `node:assert`) with no framework. `npm test` runs `tests/*.test.js`. Run one file with `node --test tests/<name>.test.js`.
- The test map in [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md#test-map) says which file covers which system. Add new tests to the file that owns the behavior, and add new files to that map.
- Tests drive real simulation, world and progression code and build real Three.js geometry. DOM, Canvas, WebGL and WebAudio are replaced with substitutes (jsdom and hand-written mocks).
- Prefer behavioral checks: delivered animals, collision clearance, pause and restart lifecycle, disposal, profile migration, release QA exclusion. Avoid tests that only restate constants or implementation details (AGENTS.md).
- Use seeded levels and fixed `1/60` steps so results are repeatable. Keep test runtime modest; the whole suite runs in CI on every pushed branch.
- `tests/tracker-*.test.js` cover the standalone `tracker/` site. `tests/deploy-pages.test.js` covers the deployment planner and publisher guards.
- Passing tests do not show rendered appearance, sound quality, touch feel or phone FPS. Say so wherever results are recorded.


## Repeatable work — 6 November 2026

Follow the root repeatable-work rule: on the fourth occurrence, save or extend a documented workflow and reusable tools under `scripts/`. Consult [the tool catalog](../scripts/README.md) first; preserve the checks and authorization gates for this area.

## Current delivery and formatting - 10 November 2026

Follow the root readable-source policy: pinned Prettier, readable Dev/QA output, minified production output, independent game/tracker entry points and explicitly authorized `/dev_performance/` staging for F-PERF-002. This supersedes older dense-source guidance. See current DEVELOPMENT.md and scripts/README.md.

## Source layout - 10 November 2026

Runtime modules now live under system folders. Resolve actual module paths in imports and source-loading fixtures. `source-layout.test.js` recursively validates local module/asset edges and startup; it intentionally avoids a duplicate hardcoded module inventory.
