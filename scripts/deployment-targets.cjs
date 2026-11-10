// One destination policy shared by planning, checked builds and Actions preflight.
const targets = Object.freeze({
  dev: Object.freeze({ application: 'game', prefix: 'dev/', directory: 'dist', mode: 'development' }),
  dev_performance: Object.freeze({
    application: 'game',
    prefix: 'dev_performance/',
    directory: 'dist',
    mode: 'development',
  }),
  production: Object.freeze({ application: 'game', prefix: '', directory: 'dist', mode: 'release' }),
  tracker: Object.freeze({ application: 'tracker', prefix: 'tracker/', directory: 'dist-tracker', mode: null }),
});
function deploymentTarget(environment, branch) {
  if (!Object.hasOwn(targets, environment)) throw Error('Unknown deployment environment');
  const target = targets[environment];
  if (branch !== undefined) {
    if (!branch || branch.startsWith('refs/')) throw Error('A branch name is required');
    if ((environment === 'production' || environment === 'tracker') !== (branch === 'main')) {
      throw Error('main is required for production/tracker; other branches may deploy dev or dev_performance');
    }
  }
  return target;
}
module.exports = { deploymentTarget };
