// actions/github-script adapter; dependencies are injectable for offline tests.
const { execFileSync } = require('node:child_process');

async function waitForPages({
  github,
  context,
  core,
  pagesSha = process.env.PAGES_SHA,
  attempts = 60,
  intervalMs = 10000,
  verify = () => execFileSync(process.execPath, ['scripts/verify-deployment.mjs'], { stdio: 'inherit' }),
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)),
}) {
  if (!/^[a-f0-9]{40}$/.test(pagesSha || '')) {
    throw Error('An immutable Pages SHA is required');
  }
  if (!Number.isInteger(attempts) || attempts < 1 || !Number.isFinite(intervalMs) || intervalMs < 0) {
    throw Error('Invalid polling limits');
  }
  for (let attempt = 0; attempt < attempts; attempt++) {
    const builds = (await github.rest.repos.listPagesBuilds({ ...context.repo, per_page: 100 })).data;
    const build = builds.find(item => item.commit === pagesSha);
    if (build?.status === 'errored') throw Error('Native Pages build failed');
    core.info(`Attempt ${attempt + 1}/${attempts}: native Pages build ${build?.status ?? 'not listed yet'}`);
    if (build?.status === 'built') {
      // Native build completion can precede CDN availability. Verify every file.
      try {
        await verify();
        return;
      } catch (error) {
        if (attempt === attempts - 1) throw error;
        core.info('Live verification not yet matching; retrying');
      }
    }
    if (attempt < attempts - 1) await sleep(intervalMs);
  }
  throw Error('Timed out waiting for native Pages and live verification');
}

module.exports = { waitForPages };
