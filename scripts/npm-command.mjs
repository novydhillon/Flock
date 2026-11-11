import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

// npm.cmd is not executable by execFile on Windows without a shell. Use npm's
// Node entry point both under npm run and when Actions invokes a script directly.
export function npmCommand(args, npmCLI = process.env.npm_execpath) {
  const cli =
    npmCLI ||
    (process.platform === 'win32' ? join(dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npm-cli.js') : null);
  if (cli && existsSync(cli)) return { command: process.execPath, args: [cli, ...args] };
  if (process.platform === 'win32') throw Error('Cannot locate npm CLI; invoke this command through npm run');
  return { command: 'npm', args };
}
