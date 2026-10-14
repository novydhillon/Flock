# FLOCK documentation

This is the starting point for humans and agents working on the robotic-herding game. Updated 14 October 2026. [Open the HTML documentation](html/index.html) for linked pages, search, diagrams, code examples and a page table of contents. Open that file directly after cloning; no application server is required.

## Read in this order

| Document | Use it for |
|---|---|
| [Requirements](REQUIREMENTS.md) | Product intent, implemented behavior, pending requirements and open decisions |
| [Architecture](ARCHITECTURE.md) | Module ownership, shared contracts and safe change boundaries |
| [Gameplay](systems/GAMEPLAY.md) | Input, simulation, companions, rewards, profile and upgrades |
| [World](systems/WORLD.md) | Procedural routes, barriers, footprints and navigation |
| [Presentation](systems/PRESENTATION.md) | Rendering, animation, nature, weather and audio |
| [Development and release](DEVELOPMENT.md) | Build, tests, documentation generation, QA evidence and publishing |
| [Issue tracker](ISSUES.md) | Prioritized work, acceptance criteria and agent handoffs |
| [Quality record](QUALITY.md) | Historical reviews and the boundaries of their evidence |
| [Documentation reviews](REVIEW.md) | Blind content/HTML findings, corrections and verification limits |

## Source of truth

Runtime behavior comes from source and tests. The requirements describe intended behavior and identify gaps; they do not make requested features exist. The issue tracker records pending work. Historical quality scores apply only to the reviewed revision. HTML is generated from Markdown; edit the Markdown and run `npm run docs:build`.

F-025 is the highest-priority pending implementation: the required public deployment URL is `https://novydhillon.github.io/Flock/dev2/`. The current game is still at the old nested path, `https://novydhillon.github.io/Flock/flock/dev2/`. This documentation update does not migrate the game.

## Examples and diagrams

Node examples are intended to run from the repository root with dependencies installed. Snippets labeled illustrative describe a contract rather than a supported public API. Diagram arrows show ownership, calls or transitions, not network services. This application has no backend.

The HTML copy uses local assets and a bundled Mermaid renderer. Without JavaScript, documentation text and code remain readable; diagram source remains available. Source links in the HTML point back to files in the cloned repository. The repository HTML files are viewable locally; GitHub's file browser displays their source rather than serving them as a website.
