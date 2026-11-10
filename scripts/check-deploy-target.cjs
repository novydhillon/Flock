// Shared preflight for manual publication workflows. Never log token values.
const { deploymentTarget } = require('./deployment-targets.cjs');
function checkDeployTarget({ environment, ref, confirmation, publishToken }) {
  if (!ref?.startsWith('refs/heads/')) throw Error('Deployment requires a branch ref');
  deploymentTarget(environment, ref.slice('refs/heads/'.length));
  if (environment === 'production' && confirmation !== 'deploy-production')
    throw Error('Production confirmation missing');
  if (environment === 'tracker' && confirmation !== 'deploy-tracker') throw Error('Tracker confirmation missing');
  if (!publishToken) throw Error('Configure PAGES_PUBLISH_TOKEN; GITHUB_TOKEN pushes do not trigger native Pages');
}
module.exports = { checkDeployTarget };
if (require.main === module) {
  checkDeployTarget({
    environment: process.env.TARGET,
    ref: process.env.GITHUB_REF,
    confirmation: process.env.CONFIRM,
    publishToken: process.env.PUBLISH_TOKEN,
  });
}
