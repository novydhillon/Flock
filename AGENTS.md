# Flock project development rules

These rules apply to the whole repository. Read this file, `docs/DEVELOPMENT.md`, `docs/ISSUES.md` and the current requirements before changing code. Explicit user instructions take precedence. Record an explicit review waiver when one is given; never infer one.

## GitHub access — effective 18 October 2026

- Use the GitHub connector for every repository operation: refs/files, comparisons, branches, commits, source publication, pull requests, merges and Pages publication. Do not run shell `git` or `gh` commands or direct GitHub HTTP requests as substitutes. Local editing, dependency installation, builds and tests may still use shell tools.
- If a required connector capability is unavailable or fails, report the specific limitation and preserve prepared work. Do not fall back to shell GitHub operations. This overrides older shell-git instructions and examples; existing user authorization remains valid.

## Branches and ownership

- Work on the requested feature branch, based on the current intended source branch. Do not implement directly on `main`. `main` is production; `gh-pages` contains published artifacts.
- Inspect branch status before work. Preserve other contributors' changes. Use isolated worktrees or clearly disjoint file ownership for parallel agents; integrate and inspect their changes before committing.
- For substantial changes, compare plausible approaches briefly, choose one against the requirements, and split independent implementation/validation work across agents. Keep dependent changes sequential.

## Model and effort selection

- Use the least costly available model and effort suitable for the task. Routine documentation and bounded source reviews may use `gpt-6-luna` at medium effort. Multi-file UI/controller work and integration may use `gpt-6.1-sol` at medium effort. Escalate complex geometry, repeated failures or unresolved review findings to a stronger model/higher effort, recording why.
- A user's explicit model/effort selection overrides defaults. Record the actual implementation and review model/effort and validation limits in the quality record; do not imply a model was used when it was unavailable.

## Blind review gauntlet

- Substantial changes require a fresh independent blind critic. Supply only the task, acceptance criteria, candidate files/revision and instructions to assess defects; exclude writer reasoning, prior reviews/scores and the target score from the initial review packet. Use a fresh context and isolated candidate worktree.
- Fix confirmed findings, run relevant checks, and obtain follow-up review. Continue until no material blocker remains and the score is at least 9/10, unless the user specifies another threshold. A same-critic recheck is follow-up validation, not another blind first pass.
- A persistent evidence-constrained limit must be reported plainly. Scores and headless tests never establish rendered appearance, listening quality, physical touch usability or phone FPS.

## Tracking, documentation and sign-off

- Track work in `docs/ISSUES.md`, not GitHub Issues. Add scoped IDs and acceptance criteria before implementation. Record owner, branch, state, evidence and remaining checks.
- Use Open → In progress → Review → Done. Source completion, publication and user acceptance are separate milestones. Leave implemented items in Review until the user signs off. Never use a review score as user acceptance.
- When an issue becomes Done or Closed, move its complete overview row and detailed section, closure date/reason or user acceptance, and related completion evidence from `docs/ISSUES.md` to `docs/ISSUES_CLOSED.md` in the same connector commit. Preserve requirements, evidence links and validation limits; do not leave duplicate active/closed overview entries. Strike through every closed overview cell and the archived title after its ID. Reopening moves the item back to the active tracker and removes strikethrough, with a dated reason.
- Update affected requirements, system context, development/quality records and generated HTML. Regenerate and check docs before commits. Keep current status clear when historical records remain.

## Standard delivery entry points — 19 October 2026

- Use `npm run build:checked:dev` or `npm run build:checked:production` for release preparation, and `.github/workflows/deploy-pages.yml` (**Deploy Flock**) for authorized publication. Do not write a custom deployment script per task. Follow the current setup, run instructions and evidence requirements in `docs/DEVELOPMENT.md`.
- The checked-in Actions workflow uses its GitHub API client for publication; agent repository access remains connector-only. If connector workflow dispatch is unavailable, report that the workflow must be started in the Actions UI; do not substitute shell/API calls. Manual production execution still requires user authorization.
- The old shell Git/dev2 staging helper is retired. `scripts/deploy-pages.mjs` is now a pure plan generator and `scripts/validate-build.mjs` contains dependency validation. Preserve existing Pages content; old hashed assets are intentionally retained.

## Validation and publishing

- Run meaningful focused checks, then the full regression suite and both release/development builds with their artifact-mode checks for runtime batches. Avoid redundant tests that only restate implementation.
- Check phone portrait/landscape layouts, smallest supported screens, safe areas, keyboard focus, pause/resume/restart, input cancellation and existing progress when relevant. Record unavailable checks accurately.
- Effective 18 October 2026 (America/Creston), **every branch other than `main` deploys to `https://novydhillon.github.io/Flock/dev/`**, using `dev/` on `gh-pages`. `main` alone deploys to the production root `https://novydhillon.github.io/Flock/`. Do not publish new non-main builds to `dev2/` or the legacy nested `flock/dev/` path. This overrides older instructions and historical release records.
- This is a forward-looking destination policy, not authorization to move/delete existing deployments or publish production. Preserve existing `dev2/`, legacy `flock/`, production and unrelated Pages content unless separately authorized. Verify the latest Pages parent before pushing; do not overwrite concurrent publication.
- Read this instruction from the default branch when starting work on older feature branches. Use the standard delivery entry points above; never restore the retired dev2 helper.
- Source CI upload is not deployment. Wait for source CI (the manual deployment workflow's checked-build step also satisfies source validation) and native Pages success, then compare live HTML and all emitted asset hashes against the checked build. Record source SHA, Pages SHA, workflow evidence and verification limits.
- Production merge and root publication require user authorization. Production artifacts must exclude all QA UI/code; the QA gear is development-only.

## Handoff

Before ending, commit/push the intended branch, update tracker/validation evidence, and state what is implemented, reviewed, published and still awaiting sign-off. Never claim completion of a blocked check or deployment.
