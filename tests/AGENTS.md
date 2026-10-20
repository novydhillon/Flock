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
