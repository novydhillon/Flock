# Source map

| Folder | Purpose |
|---|---|
| `app/` | Startup and application controller |
| `ui/` | Loading/landing UI and application styles |
| `simulation/` | Gameplay, herd, delivery and gate rules |
| `simulation/companions/` | Buddy decisions and companion assistance |
| `simulation/navigation/` | Physical navigation, bridges and chokepoints |
| `world/` | Seeded world, terrain and pasture generation |
| `rendering/` | Renderer, models, views, surfaces, minimap and shadows |
| `rendering/animation/` | Actor poses, turns, grazing, hover and glow |
| `rendering/environment/` | Scenery, vegetation and wildlife |
| `rendering/water/` | Rivers, water plants, pools and water effects |
| `rendering/weather/` | Weather state and rain/cloud effects |
| `audio/` | Audio lifecycle, transport, effects and music |
| `progression/` | Saved profiles, upgrades and progression |
| `qa/` | Development-only QA tools and styles |
| `config/` | Settings, validation contracts and resolver |

HTML starts at `app/bootstrap.js`; it loads `app/main.js`. Import concrete modules directly. Tests and reusable development tools remain in the repository-level `tests/` and `scripts/` directories.

Folders reflect existing responsibilities. The move does not change module dependencies or fully separate every legacy mixed concern: gate controls remain beside gate rules, grazing queries remain beside grazing animation, and weather state remains beside its effects. See [architecture and contracts](../docs/ARCHITECTURE.md) and [source instructions](AGENTS.md).
