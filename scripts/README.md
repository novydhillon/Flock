# Reusable Flock workflows and tools

Run commands from the repository root with Node.js 22+ and locked dependencies installed with `npm ci`. Consult this catalog before creating another script. The root [repeatable-work rule](../AGENTS.md#save-repeatable-workflows-and-tools--6-november-2026) requires saving a workflow and tools on the fourth occurrence of a task. Record observed repetition in the tracker rather than inventing counts.

## Existing tools retained after the workflow audit

| Task | Entry point | Inputs and outputs | Side effects and verification |
|---|---|---|---|
| Checked build | `npm run build:checked:dev` or `npm run build:checked:production` | Target selects final artifact mode | Runs docs checks, all tests, release build/guard and (for dev) QA build/guard; replaces `dist/`. No publication |
| Documentation refresh | `npm run docs:build`, then `npm run docs:check` | Markdown pages listed in `scripts/docs/build.mjs` | Replaces `docs/html/`; checks deterministic output, links, tracker lifecycle and DOM behavior. Commit generated files with sources |
| Build dependency validation | `validateBuild(directory)` from `scripts/validate-build.mjs` | Artifact directory; throws on invalid dependencies | Read-only shared validation used by the planner |
| QA artifact guard | `node scripts/check-build-mode.mjs release` or `development` | Existing `dist/` | Read-only check of QA exclusion/inclusion |
| Deployment planning | `deploymentPlan({ environment, branch, sourceSha, directory })` from `scripts/deploy-pages.mjs` | `dev`/`production`, branch, full source SHA, artifact directory (default `dist`) | Returns canonical URL/prefix, base64 file bytes and SHA-256 hashes. No network or mutation; direct CLI intentionally refuses publication |
| Scoped Pages publication | `scripts/publish-pages.cjs` via Deploy Flock | Actions `github`, `context`, `core`; `DEPLOY_ENV` | Writes scoped files, manifest and missing `.nojekyll` to gh-pages, retains unrelated paths/old assets, rejects changed parent; emits `pages_sha` and local `deployment.json`. Requires publication authorization |
| Live artifact verification | `node scripts/verify-deployment.mjs [manifest]` | Manifest defaults to `deployment.json` | GETs all emitted files and compares hashes; fails on HTTP/hash mismatch. Does not establish rendered/device behavior |
| Chokepoint measurement | `npm run measure:chokepoints -- 16,21 default,1001` | Optional comma-separated levels and seeds | Prints simulated reversal/stall metrics. Can take several minutes; no human difficulty, rendering or phone FPS claim |
| Pip icons | `node scripts/generate-pip-icons.mjs` | Existing project icon generator | Rewrites public icon SVG/PNGs; requires Inkscape and Python 3 with Pillow in addition to npm dependencies. Inspect generated icons before committing |

The two Actions workflows already share `scripts/build-checked.mjs`. Preserve that reuse. `.github/workflows/deploy-dev2.yml` is the historical filename for source checks and standalone artifact upload; it does not deploy dev2.

## Extracted from Deploy Flock — 6 November 2026

Repeated deployment records in `docs/validation/` and the standard delivery runbook establish more than three uses of the publication workflow. The audit retained the tools above and extracted these remaining inline operations:

| Tool | Invocation and inputs | Behavior and limits |
|---|---|---|
| Destination/authorization preflight | `node scripts/check-deploy-target.cjs`, with `TARGET`, `GITHUB_REF`, `CONFIRM`, `PUBLISH_TOKEN` supplied by Actions | Validates branch-only ref, known target, main/production pairing, production confirmation and token presence. No mutation; never logs tokens. Token presence/confirmation strings do not establish human sign-off |
| Native Pages wait and live verification | `require('./scripts/wait-for-pages.cjs').waitForPages({ github, context, core })` in actions/github-script; `PAGES_SHA` is the published full commit SHA | Polls only that Pages commit, fails on native build errors, retries CDN hash mismatches and times out after 60 attempts with 10-second intervals. Reuses `verify-deployment.mjs`; no publication. Injectable polling/verification dependencies support offline tests |

Preferred authorized publication remains **Deploy Flock**, with connector-only fallback only when dispatch is unavailable, as described in [the development runbook](../docs/DEVELOPMENT.md#standard-build-and-deployment-commands--19-october-2026). Do not add direct GitHub HTTP, shell git/gh or token handling scripts for agents. Source CI is distinct from publication and user acceptance.

Focused tool checks: `node --test tests/deploy-pages.test.js tests/deployment-workflow.test.js`. These simulate API/build states; actual native Pages success and live file hashes must still be observed for each authorized deployment.

## Workflow for future repeated tasks

1. Find an existing entry point here or under `scripts/` and `.github/workflows/`; inspect current task evidence and requirements.
2. On the fourth occurrence at the latest, move reusable scratch/inline logic into a parameterized tool; extend an existing tool where it already owns the task.
3. Document the command or module API, prerequisites, inputs, outputs, side effects and failure/verification steps here. Keep user decisions and acceptance outside automation.
4. Run meaningful focused checks, update the tracker and relevant runbook, regenerate affected documentation, and commit the tools with the task branch. Add actual execution evidence without claiming unobserved deployment/device results.


## Archive accepted tracker work

Repeated terrain, water, UI, joystick and tooling closures establish more than three tracker archival occurrences. Use `python3 scripts/close-tracker-items.py F-ID ... --date "6 November 2026" --reason "Explicit acceptance and evidence"` from the repository root for a dry-run; add `--apply` to write ISSUES.md and ISSUES_CLOSED.md together. It moves complete overview rows and detail sections, strikes archived titles/cells, records closure, and rejects missing or already archived IDs. Review linked/shared execution history separately, regenerate docs and run `npm run docs:check`. The tool does not commit, merge, deploy or infer user acceptance; supply only explicitly accepted IDs. Python 3 is required.
