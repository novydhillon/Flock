# flock. — Little Big Adventures

A bright, portrait-first, one-thumb herding game where **Pip**, an original clay-like robotic sheepdog, guides a flock of tiny robotic animals to their new home. Pure HTML, CSS, Canvas 2D, and JavaScript; no game engine, backend, build tool, or third-party runtime dependency.

## Play

**Development site:** [novydhillon.github.io/Flock/flock/dev/](https://novydhillon.github.io/Flock/flock/dev/) — after GitHub Pages is enabled for this repository and its workflow successfully deploys.

**Local:** Serve the repository root over HTTP, then open `http://localhost:4173/flock/dev/`:

```bash
python3 -m http.server 4173
```

The root `index.html` redirects to `flock/dev/`. On a phone, drag the large thumb joystick or drag anywhere over the meadow to steer Pip. On a computer, use **WASD / arrow keys**. Get behind your flock: the robots shy away from Pip and gradually head toward their destination. Press **WHISTLE** (keyboard: Space) to motivate nearby stragglers. The upper-right arrow points toward the goal. Walk up to gates to open them, and bring the animals onto the bridges to cross rivers.

Every rescued flock earns coins and up to three stars. Visit the Workshop to buy **Mega Bark**, **Turbo Paws**, **Buddy Bot** (available from level 10), and **Scout Drone** (available from level 20). The camera shows more of the meadow at once. Upgrades and level progress are saved locally. Music is synthesized with Web Audio after a user gesture, can be muted, and uses no downloaded samples.

## Procedural levels

- Level 1: four sheep in an open meadow → safe pen, with in-game tutorial.
- Level 2: a larger flock, more ground to cover, and a swing gate.
- Level 3: river, bridge, and gate. Levels 4 onward also introduce robot cows, barns, and destination fields.
- Subsequent levels deterministically generate larger roaming meadows, new terrain patches, paths, obstacles, and animal group sizes. Deterministic seeds make levels replayable and testable.
- Flock movement combines local avoidance, goal-directed movement, group cohesion, a player pressure radius, and bridge/path waypoints. Autonomous helpers actively chase and flank stragglers, applying directional herding pressure. Sheep and cows keep personal space with flock-style neighbour avoidance and physical separation.

## Project layout

- [`flock/dev/`](flock/dev/) — standalone static site and installable web app.
- [`flock/dev/src/world.js`](flock/dev/src/world.js) — deterministic procedural map generation, collision, herd behavior, goal logic.
- [`flock/dev/src/render.js`](flock/dev/src/render.js) — all original illustrated landscape and character rendering.
- [`flock/dev/src/main.js`](flock/dev/src/main.js) — mobile controls, screens, save data, progression, helper logic.
- [`flock/dev/src/audio.js`](flock/dev/src/audio.js) — synthesized background tune and events.
- [`.github/workflows/deploy-dev.yml`](.github/workflows/deploy-dev.yml) — tests and GitHub Pages artifact deployment when `dev/flock-game` is pushed.

## Verify

```bash
cd flock/dev
npm test
node --check src/main.js
node --check src/render.js
```

## GitHub Pages setup

The live `gh-pages` branch publishes the standalone `/flock/dev/` site through GitHub Pages. The `dev/flock-game` branch also runs test and packaging checks on push. In a GitHub **project** Pages site, the canonical path includes the repository name, so the development game appears at **`/Flock/flock/dev/`**. The route `/flock/dev/` at a domain root requires a separate root Pages site or matching custom-domain routing. Private-repository Pages hosting also depends on your GitHub plan and configuration.

This is an original stop-motion-inspired robotic-farm look; it does not reproduce third-party animated characters or licensed assets.
