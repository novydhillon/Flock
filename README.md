# Flock: Little Robot, Big Pastures

A cheerful 3D herding game for portrait phones. Guide a robotic sheepdog through handmade-looking countryside and bring your robotic flock home. Start with a small sheep flock, then tackle longer routes, larger groups, bridges, gates, and other destinations. Earn points for upgrades and autonomous helpers.

Development branch: `flock_3D_chatgpt-work`.

Play the standalone development build at [novydhillon.github.io/Flock/flock/dev2/](https://novydhillon.github.io/Flock/flock/dev2/). The existing `flock/dev/` game is preserved separately.

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

The production build is written to `dist/`. Relative asset paths allow it to run beneath `/Flock/flock/dev2/` without a backend or CDN dependency.

## Playing

- Use one thumb on the movement control to steer the robotic dog.
- Drag anywhere on the meadow to steer, or use WASD/arrow keys on desktop. Double-tap the meadow or tap Woof for a short herding burst.
- Approach the flock from behind to guide it toward the highlighted destination.
- Keep the flock together while following routes through the countryside.
- Complete a pasture to earn points, then spend them on skills and helpers.
- Six skills have three tiers each: Turbo paws, Friendly signal, Scout drone, Buddy dog, Happy bark, and Flock harmony. The workshop shows the next tier's effect, cost, and level requirement. Skills appear throughout the first fifteen levels; the drone starts at level 10, and the more expensive Buddy dog starts at level 20.
- Companions attend the largest connected herd. When Pip leaves, they hold that herd in place. Recover isolated stragglers yourself and return to lead the delivery.
- Music starts after a player interaction, following mobile browser audio rules. Use the sound control to mute it.

The opening pasture teaches herding with a small sheep flock and a nearby pen. Later procedural pastures introduce longer routes, rivers and bridges, roads and gates, more animals, and new destinations. Progress is stored locally in the browser; clearing site data clears that progress.

## Deployment

GitHub Pages currently publishes the repository's `gh-pages` branch. The game is deployed to **`flock/dev2/` within that branch**, so its full URL includes the case-sensitive repository prefix `/Flock/`.

`.github/workflows/deploy-dev2.yml` tests and builds pushes to `flock_3D_chatgpt-work`, then uploads the standalone `dist/` artifact. These checks do not enter the publishing environment. To publish a revision, replace only `flock/dev2/` in the latest `gh-pages` tree with that build and commit/push the Pages branch. Preserve `flock/dev/`, the site root, and all unrelated files. GitHub Pages publishes the existing `gh-pages` branch through its native workflow.

For a local review of exactly what will change, build first and prepare a detached Pages worktree:

```sh
npm run build
node scripts/deploy-pages.mjs /tmp/flock-pages-review
git -C /tmp/flock-pages-review diff --cached --stat
```

The preparation script stages the build without committing or pushing. It refuses an existing destination, validates the build output, and updates only the requested deployment folder.

## Scope

This is a playable development build. It stores progress on-device and uses procedural geometry and generated material textures. It has no account system, online multiplayer, or cloud save service.

The campaign contains 100 deterministic procedural meadows. Flock size increases to a maximum of 65; journey distance continues increasing afterward. Levels 1–5 have compact, single-route lessons. From level 6 the fenced roaming area expands, with one or two trails through level 15 and up to three afterward. Destinations rotate across compass directions, and winding trails connect real bridges and gate openings with clear staging space before the goal. Rivers continue beyond the perimeter; scenery hills stay outside playable ground.

Sheep and cows use articulated, instanced leg poses at a stop-motion cadence. Grass and dirt have deterministic tileable color and bump textures, with decorative flowers, grasses and reeds. Puffy clouds drift with soft ground shadows. Later meadows cycle through sunshine, wind, light rain, and snow after level 8. Butterflies, birds and squirrels flee nearby robots; quiet bird and weather ambience shares the sound control.

Automated checks cover simulation, upgrades, controller navigation, touch cancellation, denied storage, renderer matrices and resource disposal. The renderer tests use real Three.js geometry with a substituted GPU interface; they do not verify rendered pixels or phone frame rates. Actual mobile play, sound balance and GPU performance need device testing.
