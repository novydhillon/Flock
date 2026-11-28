# Double-height terrain experiment

This experiment on `feat/double-terrain-height` raises the allowed terrain range from 4.5 m to 9 m while retaining the 30-degree traversable-grade limit and static camera height. It does not include the deferred compact/steep bank work.

The physical field doubles mean pasture lift (2 m to 4 m) and rounded-wave amplitude (1.9 m to 3.8 m). Each horizontal wave scale also doubles, from 5.5/7.5/9.5 m per radian to 11/15/19, preserving the wave gradients. River width, water depth, channel floor, bridge spans and layouts are retained. The normalized valley field uses a slightly lower dry-bank rise scale (2 to 1.9), widening its rise enough to keep the taller field below 30 degrees; all structures and actors continue sampling the authoritative shared height surface. The experiment uses sun offset [-24,33,28] rather than [-24,32,28] to keep shadow submissions within the existing mobile triangle budget over higher ground.

Actual sampled default level 6/20/50/100 ground ranges rise from 4.026/4.065/4.044/4.095 m to 7.867/7.922/7.846/7.883 m. The 9 m value is the ceiling, not a promised exact range on every seeded meadow. Wider hills preserve slope rather than doubling steepness.

## Repeatable measurement

Run from the repository root:

```sh
node scripts/measure-terrain.mjs --levels 6,20,50,100 --spacing 1
node scripts/measure-terrain.mjs --levels 6-100 --seeds 200-211 --spacing 4
```

The CLI prints JSON with minimum/maximum elevation, actual range, maximum and RMS ground grade, maximum deck grade, configured limits and an empirical `withinLimits` flag per level/seed. It exits nonzero on a sampled breach. `--seeds campaign` uses each normal campaign seed. Sampling covers the level bounds plus spawn/goal/boundary points and full-width deck sweeps. It is reproducible evidence, not an analytic proof or rendered phone check.

A 1,140 level/seed run found no breaches: maximum ground 27.943 degrees, support 14.988 degrees, sampled relief 7.995 m. An independent 4,256,550 ground/bank-sample scan plus deck sweeps across 100 levels/four seeds also found no breaches, including flat first-five levels. Normal phone readability, foot/hover support, bridge approaches, puddles, camera framing and FPS require playtesting; these measurements do not establish appearance or performance.


A fresh independent critic found a 30.0703-degree slope at public 6, seed 12 during finer 0.1 m refinement of the initial prototype. The dry-bank rise correction above brings that coordinate to 29.0292 degrees. A dense regression patch and follow-up independent refinement check this limiting area. This illustrates why the CLI's sampled pass is evidence rather than a proof of the global cap.


## Validation status

The corrected candidate passed `npm run build:checked:dev`: 605/605 regression tests, 7/7 documentation behavior checks, release with zero QA assets and development with its QA bundle. The fresh critic's initial score was 8/10 for the slope breach; the corrected follow-up scored 9/10 with no remaining blockers. Its 3,040 level/seed scan plus 0.1 m refinement around the highest 24 coarse peaks covered 9,546,380 samples, with maximum refined grade 29.063 degrees. The reduced measurement evidence is [stored here](../validation/double-height-measurements.json). The experiment remains in Review; no deployment or phone observation is claimed.
