# Claude Code guide for Flock

Flock ("Little Robot, Big Pastures") is a static Three.js/Vite herding game for portrait phones. It has no backend. This file adapts the repository rules for Claude Code sessions. **[AGENTS.md](AGENTS.md) is the binding policy and is imported below.** If this guide and AGENTS.md disagree, follow AGENTS.md and fix this guide in the same change. Explicit user instructions take precedence over both.

@AGENTS.md

## Read before changing anything

1. [AGENTS.md](AGENTS.md): branches, connector-only GitHub access, review gauntlet, tracking, publishing and sign-off.
2. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md): the dated section at the top is current. Sections that mention dev2 staging or shell git are historical.
3. [docs/ISSUES.md](docs/ISSUES.md): active work, owners, branches and acceptance criteria. Closed work is in [docs/ISSUES_CLOSED.md](docs/ISSUES_CLOSED.md).
4. [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) before touching runtime code. Then read the matching system page in `docs/systems/` (GAMEPLAY, WORLD or PRESENTATION).

Long docs grow by appending dated sections, so older paragraphs often contradict newer ones. Trust the newest dated section, the tracker's overview table and the source. Treat the status prose in README.md and docs/README.md as possibly stale.

More context loads automatically when you work in a directory: [src/CLAUDE.md](src/CLAUDE.md), [tests/CLAUDE.md](tests/CLAUDE.md) and [docs/CLAUDE.md](docs/CLAUDE.md).

## Commands

Use Node.js 22 or newer: the documented requirement, and the version CI uses (`package.json` has no `engines` field). Run everything from the repository root, and run `npm ci` first in a fresh container.

| Purpose | Command | Notes |
|---|---|---|
| Dev server (QA enabled) | `npm run dev` | Vite on `0.0.0.0`. WebGL 2 required |
| Full regression suite | `npm test` | `node --test tests/*.test.js`. About 340 tests, under a minute |
| Focused tests | `node --test tests/buddy.test.js tests/world.test.js` | Run focused tests first, then the full suite |
| Release build | `npm run build` | Writes `dist/` with relative base. QA excluded |
| Development build | `npm run build:dev` | Vite mode `qa`. Includes the QA panel |
| Artifact mode check | `node scripts/check-build-mode.mjs release` or `... development` | Run it on the matching `dist/` |
| Regenerate docs HTML | `npm run docs:build` | Required after editing any generated-page Markdown |
| Check docs | `npm run docs:check` | Staleness, links, anchors, diagrams, tracker lifecycle, DOM tests |
| Checked dev build | `npm run build:checked:dev` | docs:check, tests, release build and check, then dev build and check. Leaves `dist/` as the dev build |
| Checked production build | `npm run build:checked:production` | docs:check, tests, release build and check |

The checked builds are what CI runs (`.github/workflows/deploy-dev2.yml`, despite its historical name, on every pushed branch except `gh-pages`). Stale `docs/html` therefore fails CI. A runtime batch needs both checked builds to pass before you hand it off.

## GitHub operations in Claude Code

AGENTS.md makes the GitHub connector mandatory for repository operations. That overrides the generic Claude Code habit of `git commit` and `git push`. In Claude Code, the connector is the `mcp__github__*` tool family. Load the schemas with ToolSearch if they are not listed.

| Operation | Connector tool |
|---|---|
| List branches, read refs | `mcp__github__list_branches`, `mcp__github__list_commits`, `mcp__github__get_commit` |
| Read a file at a ref | `mcp__github__get_file_contents` (pass `ref`) |
| Create a branch | `mcp__github__create_branch` (from the intended source branch, usually `main`) |
| Commit one or more text files | `mcp__github__push_files` (one commit), `mcp__github__create_or_update_file` (needs the blob `sha`) |
| Delete a file | `mcp__github__delete_file` |
| Pull requests and merges | `mcp__github__create_pull_request`, `mcp__github__pull_request_read`, `mcp__github__merge_pull_request` |
| CI runs and logs | `mcp__github__actions_list`, `mcp__github__actions_get`, `mcp__github__get_job_logs` |
| Start Deploy Flock | `mcp__github__actions_run_trigger` with `run_workflow`, workflow `deploy-pages.yml` |

Practical consequences:

- Edit, build and test in the local checkout with shell tools. Then commit the final file contents with `push_files` to the requested branch. The local checkout does not see that commit. Do not "sync" it with shell git; compare through the connector instead.
- `push_files` sends whole file contents as text. It cannot carry binary files such as `public/icons/*.png`. A regenerated `docs/html/assets/search-index.js` is about 600 KB, so a docs change can produce a commit too large to send. Plan for this before you start a docs-heavy change. If a commit cannot go through the connector, report the limitation and keep the prepared work, as AGENTS.md requires. Do not fall back to shell git unless the user explicitly authorizes it, and record that authorization.
- The Claude Code harness may tell you to retry `git push`. AGENTS.md takes precedence over that default.
- Never create pull requests, merge, run Deploy Flock or publish to `gh-pages` unless the user asked. Production (`main`, environment `production`, confirmation `deploy-production`) always needs explicit user authorization.
- Before the first commit, check that the target branch exists and what it is based on. Preserve other contributors' commits.

## Model and effort selection for Claude

AGENTS.md names Codex-era defaults (`gpt-6-luna`, `gpt-6.1-sol`). In Claude Code, apply the same rule (the least costly suitable model) with the Agent tool's `model` option:

| AGENTS.md default | Typical work | Claude choice |
|---|---|---|
| `gpt-6-luna`, medium | Routine docs, bounded source reviews | `sonnet` (or `haiku` for mechanical lookups) |
| `gpt-6.1-sol`, medium | Multi-file UI/controller work, integration | `sonnet` |
| Escalation | Complex geometry, repeated failures, unresolved review findings | `opus`, with the reason recorded |

A user's explicit model or effort choice overrides these defaults. Record the model and effort actually used for implementation and review in `docs/QUALITY.md`. If the session cannot reveal the model, or the harness forbids writing model identifiers into repository files, write "session model, identifier not recorded" and say why. Never imply a model that was not used.

## Blind review gauntlet with Claude subagents

Substantial changes need a fresh independent critic, scoring at least 9/10 with no material blocker, unless the user sets another threshold. Use the `flock-blind-critic` agent in [.claude/agents/flock-blind-critic.md](.claude/agents/flock-blind-critic.md), or a fresh `general-purpose` agent with the same instructions.

1. Give the critic an isolated copy of the candidate. Local edits are uncommitted, and connector commits never reach the local checkout, so `isolation: "worktree"` cannot see the candidate. Copy the working tree to the scratchpad without history instead, and point the critic at that directory:
   `mkdir -p <scratchpad>/candidate && tar --exclude=.git --exclude=node_modules --exclude=dist -cf - . | tar -xf - -C <scratchpad>/candidate`, then `ln -s "$PWD/node_modules" <scratchpad>/candidate/node_modules`.
   This copy is the "isolated candidate worktree" that AGENTS.md asks for. For a revision already committed through the connector, the critic can read that revision with `mcp__github__get_file_contents` instead. Tell the critic to stay inside the candidate and not to read git history or the live checkout.
2. The review packet contains only four things: the task, the acceptance criteria, the candidate files or revision, and instructions to find defects and score. Leave out your reasoning, earlier reviews or scores, and the target score.
3. Verify every finding. Fix the confirmed ones, rerun the relevant checks, and ask for follow-up review. Use SendMessage to the same critic for a recheck; that is follow-up validation, not a new blind first pass. Repeat until the threshold is met.
4. Record each pass in `docs/QUALITY.md` (runtime) or `docs/REVIEW.md` (documentation): the score, confirmed findings, fixes, checks run, models and limits. A score is never user acceptance.

Headless tests and review scores do not show rendered appearance, listening quality, touch usability or phone FPS. [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) records that a cloud Chrome session could not create a WebGL2 context. Assume that rendered game checks are unavailable in cloud sessions until you have shown otherwise. Do not claim browser or device evidence you did not observe.

## Project facts that are easy to get wrong

- Public levels are 1–100. `level.index` and saved completion indexes are 0–99. QA level 0 is the tutorial.
- The ground plane is `x`/`z`; `y` is elevation. Headings are radians.
- The simulation must not depend on rendering. `src/simulation.js`, `src/world.js` and their helpers own physics, collision, delivery and profile state; the renderer only reads them.
- QA code is development-only. `vite.config.js` sets `__FLOCK_QA__` for modes `development`/`qa`. Release artifacts must contain no QA files or identifiers (`scripts/check-build-mode.mjs`).
- Saved progress lives in `localStorage` under `flock-foundry-v1` (a version-2 profile). Do not change saved-profile keys or the ledger semantics without migration and tests.
- Deploy destinations: every non-`main` branch goes to `https://novydhillon.github.io/Flock/dev/`; only `main` goes to the root. Never publish new builds to `dev2/` or `flock/dev/`, and never delete existing Pages content.
- The tracker site in `tracker/` is a separate buildless page that reads the public `main` tracker files.
- Clouds (F-008) are deferred; `src/atmosphere.js` is dormant on purpose.

## Workflow checklist

1. Read the files above. Check branch status through the connector. Work on the requested feature branch, never directly on `main`.
2. Add or claim a tracker item in `docs/ISSUES.md` before implementing. Give it a scoped ID, acceptance criteria, owner, branch and status, and add matching traceability in `docs/REQUIREMENTS.md`.
3. For substantial work, compare plausible approaches briefly and pick one. Split independent work across subagents with disjoint file ownership or worktrees, and inspect their output before integrating it.
4. Implement, then run focused tests, `npm test`, both checked builds (for runtime batches), and `npm run docs:build` plus `npm run docs:check`.
5. Run the blind review gauntlet. Update the tracker, requirements, system docs, quality or review record and generated HTML.
6. Commit through the connector to the requested branch. Wait for source CI and inspect the result.
7. Hand off with what is implemented, reviewed, published and still awaiting user sign-off. Leave items in Review until the user signs off. Never claim a blocked check or deployment as done.
