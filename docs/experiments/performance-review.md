# Engineering and performance review

10 November 2026. Branch: `refactor/performance-pipelines`. Base: main `86a5b5d96d3ec38e50b76b0f32bdb5e41d58a0aa`.

## Findings and decisions

| Area | Finding | Change or decision |
|---|---|---|
| Ownership | Simulation, seeded generation and presentation generally have clear boundaries | Retain existing simulation and saved-profile contracts |
| Configuration | Documented JSON values are validated and resolved once | Retain this pattern; no tuning changes |
| Readability | Many modules compress several operations into a line | Format JavaScript with pinned Prettier and enforce scoped checks |
| Rendering | Ground glow is updated twice before drawing | Update once after Pip/Buddy poses are current |
| Rain | A storm allocates 515 temporary vectors per update | Reuse five instance-owned scratch vectors with identical arithmetic/random sequence |
| Pointer | Goal rotation allocates a quaternion and axis each update | Reuse renderer-owned objects |
| Lifetime | Owned level resources are disposed; shared robot resources are retained | Preserve disposal and cached-resource ownership |
| Delivery | Game validation also runs unrelated tracker tests | Separate test selectors, checked builds, output directories and workflows |
| Module size | Renderer/controller remain large; grazing and gates mix some responsibilities | Defer broad extraction until a focused change can validate those contracts |

## Build contract

Source JavaScript is formatted before committing. Dev/QA JavaScript is readable. Production uses Vite/esbuild minification with QA excluded. Formatting changes byte size and load/parse cost, particularly in Dev; it does not reduce visual quality. No textures, geometry, shadow resolution, drop counts, simulation timestep or graphics settings are lowered.

Game output is `dist/`; tracker output is `dist-tracker/`. Each application has its own checked command, tests and deployment workflow. Shared publication tools preserve scoped writes, unrelated deployed files, previous hashed assets and concurrent-update protection. This task explicitly stages only the game at `/dev_performance/`.

## Validation boundaries

Rain tests compare every Float32 output buffer and the random-state sequence against the old allocating algorithm across 400 frames, tier transitions, camera movement and paused updates. Glow tests check a single update after current actor transforms and Buddy removal. Existing simulation, geometry, profile, controller, disposal and tracker tests remain in the regression suite.

Source tests and exact CPU-side buffers establish neither GPU timing nor phone FPS. Compare the same seeded levels/weather on a real device before claiming overall performance or rendered equivalence. Browser and physical-device checks must be recorded separately from builds and review scores.
