// Invoked only by actions/github-script. No shell Git or force updates.
module.exports = async ({ github, context, core }) => {
  const { deploymentPlan } = await import('./deploy-pages.mjs');
  const fs = require('node:fs');
  const { execFileSync } = require('node:child_process');
  const environment = process.env.DEPLOY_ENV;
  const plan = deploymentPlan({ environment, branch: context.ref.replace(/^refs\/heads\//, ''), sourceSha: context.sha });
  execFileSync(process.execPath, ['scripts/check-build-mode.mjs', environment === 'dev' ? 'development' : 'release'], { stdio: 'inherit' });
  const repo = context.repo;
  const parent = (await github.rest.git.getRef({ ...repo, ref: 'heads/gh-pages' })).data.object.sha;
  const commit = (await github.rest.git.getCommit({ ...repo, commit_sha: parent })).data;
  const existing = (await github.rest.git.getTree({ ...repo, tree_sha: commit.tree.sha, recursive: 'true' })).data;
  if (existing.truncated) throw Error('Pages tree is truncated');
  const entries = new Map(existing.tree.map(entry => [entry.path, entry]));
  const tree = [];
  for (const file of plan.files) {
    for (const entry of existing.tree) {
      if ((file.path === entry.path && entry.type !== 'blob') || file.path.startsWith(entry.path + '/') && entry.type !== 'tree') throw Error(`Unsafe Pages path: ${entry.path}`);
    }
    const blob = await github.rest.git.createBlob({ ...repo, content: file.content, encoding: 'base64' });
    tree.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.data.sha });
  }
  // Only replace matching build files. Keep old hashed assets: safer for cached clients
  // and avoids assuming ownership of pre-manifest Pages content.
  if (!entries.has('.nojekyll')) tree.push({ path: '.nojekyll', mode: '100644', type: 'blob', content: '' });
  const manifestPath = plan.prefix + '.flock-deployment.json';
  const manifest = { ...plan, files: plan.files.map(({ content, ...file }) => file) };
  tree.push({ path: manifestPath, mode: '100644', type: 'blob', content: JSON.stringify(manifest, null, 2) + '\n' });
  const nextTree = await github.rest.git.createTree({ ...repo, base_tree: commit.tree.sha, tree });
  const next = await github.rest.git.createCommit({ ...repo, message: `Deploy ${environment} from ${context.sha}`, tree: nextTree.data.sha, parents: [parent] });
  if ((await github.rest.git.getRef({ ...repo, ref: 'heads/gh-pages' })).data.object.sha !== parent) throw Error('Pages changed during preparation; rerun deployment');
  // A concurrent commit after the check is rejected as a non-fast-forward update.
  await github.rest.git.updateRef({ ...repo, ref: 'heads/gh-pages', sha: next.data.sha, force: false });
  core.setOutput('pages_sha', next.data.sha);
  fs.writeFileSync('deployment.json', JSON.stringify({ ...manifest, pagesSha: next.data.sha }, null, 2));
  await core.summary.addHeading('Pages publication submitted').addRaw(`Source: ${context.sha}\nPages: ${next.data.sha}\nURL: ${plan.url}\n`).write();
};
