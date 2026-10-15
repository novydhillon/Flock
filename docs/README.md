# FLOCK documentation

This is the starting point for humans and agents working on the robotic-herding game. Updated 15 October 2026. [Open the HTML documentation](html/index.html) for linked pages, search, diagrams, code examples and a page table of contents. Open that file directly after cloning; no application server is required.

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
| [P0/P1 validation](validation/P0-P1.md) | Source checks, release evidence, reproducible scenarios and remaining limits |
| [Quality record](QUALITY.md) | Historical reviews and the boundaries of their evidence |
| [Documentation reviews](REVIEW.md) | Blind content/HTML findings, corrections and verification limits |

## Source of truth

Runtime behavior comes from source and tests. The requirements describe intended behavior and identify gaps; they do not make requested features exist. The issue tracker records pending work. Historical quality scores apply only to the reviewed revision. HTML is generated from Markdown; edit the Markdown and run `npm run docs:build`.

F-025 is Done: the canonical game is `https://novydhillon.github.io/Flock/dev2/`; the nested legacy address redirects there. The reviewed P1 development release is now published and hash-verified. The original P0/P1 items were signed off on 14 October 2026; F-008 and F-022–F-024 have since reopened as P1 weather work. F-014 is Done by Novy’s real-phone QA confirmation on 14 October 2026. F-028 delivered-animal roaming is Done by user acceptance on 15 October 2026 at 00:28 America/Vancouver for its deployed build. Novy accepted 11 published P2 items (F-003/004/006/007/011/012/017/019/020/021/027) at approximately 10:56 Vancouver on 15 October for Pages `cc13865` / source `b1fdac3`. F-008 and F-022–F-024 are reopened as P1 weather work under F-040; the fixed-weather candidate removes snow and transitions and remains in Review. F-030–F-039 are newly queued enhancements. F-013 pacing and P3 work remain Open. See the validation runbook for separate source and publication milestones.

## Examples and diagrams

Node examples are intended to run from the repository root with dependencies installed. Snippets labeled illustrative describe a contract rather than a supported public API. Diagram arrows show ownership, calls or transitions, not network services. This application has no backend.

The HTML copy uses local assets and a bundled Mermaid renderer. Without JavaScript, documentation text and code remain readable; diagram source remains available. Source links in the HTML point back to files in the cloned repository. The repository HTML files are viewable locally; GitHub's file browser displays their source rather than serving them as a website.

Latest verified bridge/barn release: Pages `8a76de3`, source `4d3cadc`; 162 source tests pass, both build modes pass, and all 18 intended live files match. See the [validation runbook](validation/P0-P1.md).

Prior accepted development release: F-028 goal roaming at Pages `639a9b4`, source `e03ba16`; CI and 165 tests pass, blind review 9.5/10, all 18 live files verified. F-028 was accepted by the user on 15 October 2026 at 00:28 America/Vancouver; all earlier P0/P1 sign-offs are Done.

Prior accepted P2 release is live at [Flock/dev2](https://novydhillon.github.io/Flock/dev2/): source `b1fdac3`, Pages `cc13865`. Source CI and Pages succeeded; all 18 intended live files match and 18 unrelated blobs are preserved. The 11 accepted P2 items are Done; fixed-weather work F-040 is in Review, and F-030–F-039 remain Open. See [quality record](QUALITY.md#verified-p2-development-publication--15-october-2026) and [tracker](ISSUES.md).

Latest weather candidate is live at [Flock/dev2](https://novydhillon.github.io/Flock/dev2/): source `878efee`, Pages `27b1bf5`. CI/Pages passed, all 18 intended live files match, and unrelated Pages files are preserved. Test QA levels **9** (light rain), **16** (heavy rain) and **24** (storm). These weather items remain Review; the 11 earlier approvals remain Done, and new non-weather requests F-030–F-039 remain queued.
