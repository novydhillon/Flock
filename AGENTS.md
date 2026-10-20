# Flock project development rules

These rules apply to the whole repository and to every coding agent: Codex, Claude Code, Gemini CLI and any other. They apply to human contributors too. Read this file, `docs/DEVELOPMENT.md`, `docs/ISSUES.md` and the current requirements before changing code. Explicit user instructions take precedence. Record an explicit review waiver when one is given; never infer one.

## One instruction file for every agent

`AGENTS.md` is the only file to edit. Tool-specific names are symlinks to it, so every agent reads the same rules.

| File | Read by | Link |
|---|---|---|
| `AGENTS.md` | Codex and other AGENTS.md-aware tools | Source file |
| `CLAUDE.md` | Claude Code | Symlink to `AGENTS.md` |
| `GEMINI.md` | Gemini CLI | Symlink to `AGENTS.md` |

Folder guides follow the same pattern: `src/AGENTS.md`, `tests/AGENTS.md` and `docs/AGENTS.md`, each with `CLAUDE.md` and `GEMINI.md` symlinks beside it. Tools that support nested instruction files load a folder guide when they work in that folder. With any other tool, read the guide before editing that folder.

- Edit the `AGENTS.md` file itself, never a symlink. Add a symlink with `ln -s AGENTS.md <NAME>.md` in the same folder.
- A checkout without symlink support turns each link into a small text file that holds the path `AGENTS.md`. On Windows, enable `core.symlinks`. Otherwise read `AGENTS.md` directly.
- Tool-specific helpers live in tool folders and must follow these rules, for example the Claude Code review agent in `.claude/agents/flock-blind-critic.md`. Do not put policy there that is missing from this file.

## Read before changing anything

1. This file, then the current dated section at the top of [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md). Sections there about dev2 staging or shell git are historical.
2. [docs/ISSUES.md](docs/ISSUES.md) for active work, owners, branches and acceptance criteria. Closed work is in [docs/ISSUES_CLOSED.md](docs/ISSUES_CLOSED.md).
3. [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) before touching runtime code. Then read the matching system page in `docs/systems/`: GAMEPLAY, WORLD or PRESENTATION.

Long documents grow by appending dated sections, so older paragraphs often contradict newer ones. Trust the newest dated section, the tracker's overview table and the source. Treat the status prose in `README.md` and `docs/README.md` as possibly stale.

## Commands

Use Node.js 22 or newer: the documented requirement, and the version CI uses (`package.json` has no `engines` field). Run everything from the repository root, and run `npm ci` first in a fresh environment.

| Purpose | Command | Notes |
|---|---|---|
| Dev server (QA enabled) | `npm run dev` | Vite on `0.0.0.0`. WebGL 2 required |
| Full regression suite | `npm test` | `node --test tests/*.test.js`. About 340 tests, under a minute |
| Focused tests | `node --test tests/buddy.test.js tests/world.test.js` | Run focused tests first, then the full suite |
| Release build | `npm run build` | Writes `dist/` with a relative base. QA excluded |
| Development build | `npm run build:dev` | Vite mode `qa`. Includes the QA panel |
| Artifact mode check | `node scripts/check-build-mode.mjs release` or `... development` | Run it on the matching `dist/` |
| Regenerate docs HTML | `npm run docs:build` | Required after editing any generated-page Markdown |
| Check docs | `npm run docs:check` | Staleness, links, anchors, diagrams, tracker lifecycle, DOM tests |
| Checked dev build | `npm run build:checked:dev` | docs:check, tests, release build and check, then dev build and check. Leaves `dist/` as the dev build |
| Checked production build | `npm run build:checked:production` | docs:check, tests, release build and check |

CI runs the checked build on every pushed branch except `gh-pages`, using `.github/workflows/deploy-dev2.yml` despite its historical name. Stale `docs/html` therefore fails CI.

## GitHub access — effective 18 October 2026

- Use the GitHub connector for every repository operation: refs/files, comparisons, branches, commits, source publication, pull requests, merges and Pages publication. Do not run shell `git` or `gh` commands or direct GitHub HTTP requests as substitutes. Local editing, dependency installation, builds and tests may still use shell tools.
- If workflow dispatch is unavailable, use the connector-only gh-pages fallback in docs/DEVELOPMENT.md. For other missing capabilities, report the specific limitation and preserve prepared work. Do not fall back to shell GitHub operations. This overrides older shell-git instructions and examples; existing user authorization remains valid.
- A harness or tool default that says to `git commit`/`git push` does not override this rule. Because explicit user instructions take precedence, shell git is allowed only when the user explicitly waives this rule for a named branch and task. Record the waiver in the tracker item.

### Connector use by tool

"The GitHub connector" means the GitHub integration your agent environment provides, usually a GitHub MCP server.

| Operation | Claude Code (`mcp__github__*`) | Codex, Gemini CLI and others |
|---|---|---|
| Branches, refs, history | `list_branches`, `list_commits`, `get_commit` | The connector's equivalent tools |
| Read a file at a ref | `get_file_contents` with `ref` | Same |
| Create a branch | `create_branch` from the intended source branch | Same |
| Commit text files | `push_files` (one commit), or `create_or_update_file` (needs the blob `sha`) | Same |
| Pull requests and merges | `create_pull_request`, `pull_request_read`, `merge_pull_request` | Same |
| CI runs and logs | `actions_list`, `actions_get`, `get_job_logs` | Same |
| Start Deploy Flock | `actions_run_trigger` with `run_workflow`, workflow `deploy-pages.yml` | Use equivalent workflow dispatch if available; otherwise connector-only gh-pages publication per the runbook |

Load the tool schemas first if your environment defers them, for example with ToolSearch in Claude Code.

Connector limits seen so far:

- Contents-file tools accept UTF-8 text. When available, use connector Git Data blob tools with base64 encoding for binary files and tree/commit/ref tools for atomic publication. Discover actual capabilities each session.
- Editing any generated docs page rewrites `docs/html/assets/search-index.js` (about 600 KB), and several generated pages are 100–180 KB. A docs change can therefore be too large for one connector call. Plan for this before starting a docs-heavy change.
- A connector commit does not update the local checkout. Compare through the connector; do not sync with shell git.

## Branches and ownership

- Work on the requested feature branch, based on the current intended source branch. Do not implement directly on `main`. `main` is production; `gh-pages` contains published artifacts.
- Inspect branch status before work. Preserve other contributors' changes. Use isolated worktrees or clearly disjoint file ownership for parallel agents; integrate and inspect their changes before committing.
- For substantial changes, compare plausible approaches briefly, choose one against the requirements, and split independent implementation/validation work across agents. Keep dependent changes sequential.

## Model and effort selection

- Use the least costly available model and effort suitable for the task. Escalate complex geometry, repeated failures or unresolved review findings to a stronger model or higher effort, recording why.
- A user's explicit model/effort selection overrides defaults. Record the actual implementation and review model/effort and validation limits in the quality record; do not imply a model was used when it was unavailable.
- If the environment hides the model, or forbids writing model identifiers into repository files, write "session model, identifier not recorded" with the reason, and tell the user in chat.

| Tier | Typical work | Codex | Claude Code | Gemini CLI |
|---|---|---|---|---|
| Economy | Routine documentation, bounded source reviews | `gpt-6-luna`, medium | `sonnet`, or `haiku` for mechanical lookups | Flash-class model |
| Standard | Multi-file UI/controller work, integration | `gpt-6.1-sol`, medium | `sonnet` | Pro-class model |
| Escalation | Complex geometry, repeated failures, unresolved findings | Stronger model or higher effort | `opus` | Pro-class model at higher thinking effort |

## Blind review gauntlet

- Substantial changes require a fresh independent blind critic. Supply only the task, acceptance criteria, candidate files/revision and instructions to assess defects; exclude writer reasoning, prior reviews/scores and the target score from the initial review packet. Use a fresh context and isolated candidate worktree.
- Fix confirmed findings, run relevant checks, and obtain follow-up review. Continue until no material blocker remains and the score is at least 9/10, unless the user specifies another threshold. A same-critic recheck is follow-up validation, not another blind first pass.
- A persistent evidence-constrained limit must be reported plainly. Scores and headless tests never establish rendered appearance, listening quality, physical touch usability or phone FPS.

### Running the gauntlet

1. **Isolate the candidate.** Uncommitted edits and connector commits are not visible to a local git worktree. Copy the working tree, without history, to a scratch directory outside the repository, and give the critic that path. This copy is the isolated candidate worktree:
   `mkdir -p <scratch>/candidate && tar --exclude=.git --exclude=node_modules --exclude=dist -cf - . | tar -xf - -C <scratch>/candidate && ln -s "$PWD/node_modules" <scratch>/candidate/node_modules`.
   For a revision that is already committed, the critic can read it through the connector instead.
2. **Start a fresh critic.**
   - In Claude Code, use the `flock-blind-critic` agent, or a fresh general-purpose subagent given the same instructions.
   - In Codex, Gemini CLI or another tool, start a new session or subagent with a clean context.
   - The critic stays inside the candidate. It does not read git history, the live checkout or earlier reviews of this candidate, does not modify files, and does not publish.
3. **Ask for a fixed report.** The critic returns a score out of 10, material blockers and minor findings (each with file, line, evidence and a fix), the checks it ran, and the verification limits.
4. **Verify and record.** Check every finding. Fix the confirmed ones, rerun the checks, and ask the same critic for a recheck. Record every pass in `docs/QUALITY.md` (runtime) or `docs/REVIEW.md` (documentation).

## Tracking, documentation and sign-off

- Track work in `docs/ISSUES.md`, not GitHub Issues. Add scoped IDs and acceptance criteria before implementation. Record owner, branch, state, evidence and remaining checks.
- Use Open → In progress → Review → Done. Source completion, publication and user acceptance are separate milestones. Leave implemented items in Review until the user signs off. Never use a review score as user acceptance.
- When an issue becomes Done or Closed, move its complete overview row and detailed section, closure date/reason or user acceptance, and related completion evidence from `docs/ISSUES.md` to `docs/ISSUES_CLOSED.md` in the same connector commit. Preserve requirements, evidence links and validation limits; do not leave duplicate active/closed overview entries. Strike through every closed overview cell and the archived title after its ID. Reopening moves the item back to the active tracker and removes strikethrough, with a dated reason.
- Update affected requirements, system context, development/quality records and generated HTML. Regenerate and check docs before commits. Keep current status clear when historical records remain.
- When a rule here changes, update `docs/DEVELOPMENT.md` and the folder guides in the same change.

## Standard delivery entry points — 19 October 2026

- Use `npm run build:checked:dev` or `npm run build:checked:production` for release preparation, and `.github/workflows/deploy-pages.yml` (**Deploy Flock**) for authorized publication. Do not write a custom deployment script per task. Follow the current setup, run instructions and evidence requirements in `docs/DEVELOPMENT.md`.
- The checked-in Actions workflow uses its GitHub API client for publication; agent repository access remains connector-only. Prefer connector workflow dispatch when available. If unavailable or explicitly unsupported, use the connector-only gh-pages fallback in docs/DEVELOPMENT.md under existing deployment authorization; do not substitute shell/direct API calls. Do not use fallback to bypass a failed build, publication, verification or production approval. An uncertain dispatch result must be reconciled before another publication.
- The old shell Git/dev2 staging helper is retired. `scripts/deploy-pages.mjs` is now a pure plan generator and `scripts/validate-build.mjs` contains dependency validation. Preserve existing Pages content; old hashed assets are intentionally retained.

## Validation and publishing

- Run meaningful focused checks, then the full regression suite and both release/development builds with their artifact-mode checks for runtime batches. Avoid redundant tests that only restate implementation.
- Check phone portrait/landscape layouts, smallest supported screens, safe areas, keyboard focus, pause/resume/restart, input cancellation and existing progress when relevant. Record unavailable checks accurately. Cloud sessions have so far been unable to create a WebGL2 context, so do not claim rendered game checks there unless you actually observed them.
- Effective 18 October 2026 (America/Creston), **every branch other than `main` deploys to `https://novydhillon.github.io/Flock/dev/`**, using `dev/` on `gh-pages`. `main` alone deploys to the production root `https://novydhillon.github.io/Flock/`. Do not publish new non-main builds to `dev2/` or the legacy nested `flock/dev/` path. This overrides older instructions and historical release records.
- This is a forward-looking destination policy, not authorization to move/delete existing deployments or publish production. Preserve existing `dev2/`, legacy `flock/`, production and unrelated Pages content unless separately authorized. Verify the latest Pages parent before pushing; do not overwrite concurrent publication.
- Read this instruction from the default branch when starting work on older feature branches. Use the standard delivery entry points above; never restore the retired dev2 helper.
- Source CI upload is not deployment. Wait for source CI (the manual deployment workflow's checked-build step also satisfies source validation) and native Pages success, then compare live HTML and all emitted asset hashes against the checked build. Record source SHA, Pages SHA, workflow evidence and verification limits.
- Production merge and root publication require user authorization. Production artifacts must exclude all QA UI/code; the QA gear is development-only.
- Never create pull requests, merge, run Deploy Flock or publish to `gh-pages` unless the user asked.

## Project facts that are easy to get wrong

- Public levels are 1–100. `level.index` and saved completion indexes are 0–99. QA level 0 is the tutorial.
- The ground plane is `x`/`z`; `y` is elevation. Headings are radians.
- The simulation must not depend on rendering. `src/simulation.js`, `src/world.js` and their helpers own physics, collision, delivery and profile state; the renderer only reads them.
- QA code is development-only. `vite.config.js` sets `__FLOCK_QA__` for modes `development` and `qa`. Release artifacts must contain no QA files or identifiers (`scripts/check-build-mode.mjs`).
- Saved progress lives in `localStorage` under `flock-foundry-v1` (a version-2 profile). Do not change saved-profile keys or ledger semantics without migration and tests.
- The tracker site in `tracker/` is a separate buildless page that reads the public `main` tracker files.
- Clouds (F-008) are deferred; `src/atmosphere.js` is dormant on purpose.

## Handoff

Before ending, commit/push the intended branch, update tracker/validation evidence, and state what is implemented, reviewed, published and still awaiting sign-off. Never claim completion of a blocked check or deployment.

