# FLOCK documentation

This is the starting point for humans and agents working on the robotic-herding game. Updated 17 October 2026 (America/Creston). [Open the HTML documentation](html/index.html) for linked pages, search, diagrams, code examples and a page table of contents. Open that file directly after cloning; no application server is required.

## Read in this order

| Document | Use it for |
|---|---|
| [Requirements](REQUIREMENTS.md) | Product intent, implemented behavior, pending requirements and open decisions |
| [Architecture](ARCHITECTURE.md) | Module ownership, shared contracts and safe change boundaries |
| [Configuration editing](DEVELOPMENT.md#editing-area-configuration--27-october-2026) | Area ownership, validated values/bounds and the rebuild workflow |
| [Gameplay](systems/GAMEPLAY.md) | Input, simulation, companions, rewards, profile and upgrades |
| [World](systems/WORLD.md) | Procedural routes, barriers, footprints and navigation |
| [Presentation](systems/PRESENTATION.md) | Rendering, animation, nature, weather and audio |
| [Development and release](DEVELOPMENT.md) | Build, tests, documentation generation, QA evidence and publishing |
| [Issue tracker](ISSUES.md) | Active work, acceptance criteria and agent handoffs |
| [Closed issues](ISSUES_CLOSED.md) | Completed work, user sign-offs and preserved execution evidence |
| [P0/P1 validation](validation/P0-P1.md) | Source checks, release evidence, reproducible scenarios and remaining limits |
| [Quality record](QUALITY.md) | Historical reviews and the boundaries of their evidence |
| [Documentation reviews](REVIEW.md) | Blind content/HTML findings, corrections and verification limits |
| [Agent rules](../AGENTS.md) | The one instruction file for Codex, Claude Code (`CLAUDE.md` symlink), Gemini CLI (`GEMINI.md` symlink) and people; folder guides in `src/`, `tests/` and `docs/` |

## Source of truth

Runtime behavior comes from source and tests. The requirements describe intended behavior and identify gaps; they do not make requested features exist. The issue tracker records pending work. Historical quality scores apply only to the reviewed revision. HTML is generated from Markdown; edit the Markdown and run `npm run docs:build`.

Current production source is `main` (`8cc4275` at the start of this batch); accepted Pip, trees and stone-wall presentation were published to production before UI refinement began. F-053 and F-054 are Done by user sign-off. Clouds remain Deferred. New UI work **F-055–F-060** is on `UI_refinement`, with implementation and independent review complete (source 9/10, documentation 9.5/10). It is published to dev2 at source `d47ae6c` / Pages `ce24bf3` and remains in Review pending user sign-off. The [tracker](ISSUES.md) owns current per-item status; [quality evidence](QUALITY.md) separates checks, review, live publication and native acceptance.

The production game is [Flock](https://novydhillon.github.io/Flock/); review builds use [Flock/dev2](https://novydhillon.github.io/Flock/dev2/). The old nested development address redirects to the canonical dev2 location. The original 2D `flock/dev/` build is preserved separately. Historical release details remain in the [validation runbook](validation/P0-P1.md) and [quality record](QUALITY.md); older checkpoint statuses there do not override the current tracker.

Latest UI follow-up, 18 October: F-056/F-057 now include a larger high-contrast minimap and tighter status panel. Source `e2f55d2` / Pages `dbdf3c1` is verified live on dev2; user sign-off remains pending. [Publication evidence](validation/UI-minimap-followup-publication.json). This supersedes the preceding UI publication for these two items.

## Examples and diagrams

Node examples are intended to run from the repository root with dependencies installed. Snippets labeled illustrative describe a contract rather than a supported public API. Diagram arrows show ownership, calls or transitions, not network services. This application has no backend.

The HTML copy uses local assets and a bundled Mermaid renderer. Without JavaScript, documentation text and code remain readable; diagram source remains available. Source links in the HTML point back to files in the cloned repository. The repository HTML files are viewable locally; GitHub's file browser displays their source rather than serving them as a website.

Clouds are temporarily disabled at Novy’s request on 15 October 2026 (F-008 Deferred), including cloud ground shadows. Rain, fixed-level weather, storm lighting/thunder and wet-ground effects remain active. Test QA 9/16/24 for light/heavy/storm weather; no cloud overlay or cloud shadow should appear.


Project workflow: [root AGENTS.md](../AGENTS.md) records the standing development rules, including model selection, parallel work, blind review gauntlets and sign-off.

Repository operations use the GitHub connector, not shell git/gh. Move Done/Closed work from the active tracker into [Closed issues](ISSUES_CLOSED.md) in the same commit; see [AGENTS.md](../AGENTS.md) for the complete lifecycle rule.
