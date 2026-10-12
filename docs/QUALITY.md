# Flock dev2 quality record

Independent reviewers received the game brief and current source without writer history, previous scores, or the requested score threshold. They inspected source and ran deterministic/headless checks. No browser rendering, phone play session, or listening test was available.

| Round | Reviewer | Overall | Main findings |
|---|---|---:|---|
| 1 | Gameplay | 7.2/10 | Destination collisions, workshop navigation, rendering cost, static animal legs, limited progression |
| 1 | Technical | 7.0/10 | Resource disposal, blocked storage, collision agreement, rendering load |
| 2 | Gameplay | 7.2/10 | Helpers at second river, static locomotion, early upgrade exhaustion, campaign-end indexing |
| 2 | Technical | 8.0/10 | Focused-button keyboard input, helper spawning on bridges, mobile GPU risk |
| 3 | Gameplay | 8.4/10 | Strong core game; portrait camera containment and later helper limits |
| 3 | Technical | 8.0/10 | Camera containment, later helper recovery, cached scenery ownership |

Changes responding to review include physical destination boundaries; safe storage fallback; complete workshop/reward navigation; articulated robot legs and stop-motion pose cadence; instanced animals and repeated scenery; bounded texture/model caches; deterministic resource cleanup; six three-tier skills; safe ground helper spawning; crossing-aware helper subgroups; roads through real crossings; continued journey growth; keyboard focus handling; and a camera containment regression test.

## Verification boundary

Automated tests exercise actual simulation, profile economy, controller code and real Three.js scene construction. Canvas/WebGL and DOM substitutes enable headless checks. These tests establish finite matrices, articulated movement, resource ownership, collision behavior, progression and UI state transitions; they do not establish rendered appearance, GPU frame rate, audible soundtrack quality or real touchscreen feel.

All 100 default levels have valid spawns and traversable crossing routes. Route traversal tests remove animals, so this is not a claim that the entire campaign has been completed with a full flock. Actual helper-driven flock completion is covered on the first seven levels. A later-level regression also checks recovery from the stationary helper equilibrium identified by review. Later levels require active player supervision; autonomous helpers assist rather than replace the player.

Real-device priorities are portrait playability, large-flock performance, readable robot silhouettes, soundtrack volume, and WebGL context recovery. The Vite build warns about the bundled Three.js/application chunk size; the production JavaScript is approximately 202 kB compressed by gzip.
