# Flock project development rules

These rules apply to the whole repository. Read this file, `docs/DEVELOPMENT.md`, `docs/ISSUES.md` and the current requirements before changing code. Explicit user instructions take precedence. Record an explicit review waiver when one is given; never infer one.

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
- Strike through every cell of closed overview rows and the title after the ID in closed issue headings. Preserve evidence; remove strikethrough if reopened.
- Update affected requirements, system context, development/quality records and generated HTML. Regenerate and check docs before commits. Keep current status clear when historical records remain.

## Validation and publishing

- Run meaningful focused checks, then the full regression suite and both release/development builds with their artifact-mode checks for runtime batches. Avoid redundant tests that only restate implementation.
- Check phone portrait/landscape layouts, smallest supported screens, safe areas, keyboard focus, pause/resume/restart, input cancellation and existing progress when relevant. Record unavailable checks accurately.
- Effective 18 October 2026 (America/Creston), **every branch other than `main` deploys to `https://novydhillon.github.io/Flock/dev/`**, using `dev/` on `gh-pages`. `main` alone deploys to the production root `https://novydhillon.github.io/Flock/`. Do not publish new non-main builds to `dev2/` or the legacy nested `flock/dev/` path. This overrides older instructions and historical release records.
- This is a forward-looking destination policy, not authorization to move/delete existing deployments or publish production. Preserve existing `dev2/`, legacy `flock/`, production and unrelated Pages content unless separately authorized. Verify the latest Pages parent before pushing; do not overwrite concurrent publication.
- Read this instruction from the default branch when starting work on older feature branches. The legacy staging helper currently targets `dev2/`; update its target to `dev/` before using it for a future publication, or prepare the scoped `dev/` tree explicitly. Never follow its obsolete destination unmodified.
- Source CI upload is not deployment. Wait for source CI and native Pages success, then compare live HTML and all emitted asset hashes against the checked build. Record source SHA, Pages SHA, workflow evidence and verification limits.
- Production merge and root publication require user authorization. Production artifacts must exclude all QA UI/code; the QA gear is development-only.

## Handoff

Before ending, commit/push the intended branch, update tracker/validation evidence, and state what is implemented, reviewed, published and still awaiting sign-off. Never claim completion of a blocked check or deployment.
