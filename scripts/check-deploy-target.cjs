// Shared preflight for the manual publication workflow. Never log token values.
function checkDeployTarget({ environment, ref, confirmation, publishToken }) {
  if (!['dev', 'production'].includes(environment)) {
    throw Error('Unknown deployment environment');
  }
  if (!ref?.startsWith('refs/heads/')) {
    throw Error('Deployment requires a branch ref');
  }
  const production = environment === 'production';
  if (production !== (ref === 'refs/heads/main')) {
    throw Error('main is production-only; other branches are dev-only');
  }
  if (production && confirmation !== 'deploy-production') {
    throw Error('Production confirmation missing');
  }
  if (!publishToken) {
    throw Error('Configure PAGES_PUBLISH_TOKEN; GITHUB_TOKEN pushes do not trigger native Pages');
  }
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
