// src/lib/exec.ts
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import process from 'node:process';

export interface ExecResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

const exec = promisify(execFile);

/** JS file extensions that need `node` in front */
const JS_EXT = new Set(['.js', '.mjs', '.cjs']);

export async function runNodeCli(
  cliPath: string,
  argv: string[],
  options: Parameters<typeof exec>[2] = {},
): Promise<ExecResult> {
  const base = path.basename(cliPath).toLowerCase();
  const isNodeExe =
    cliPath === process.execPath ||
    base === 'node' ||
    base === 'node.exe';

  const needsNode = isNodeExe || JS_EXT.has(path.extname(cliPath));

  const cmd  = needsNode ? process.execPath : cliPath;
  const args = needsNode ? (isNodeExe ? argv : [cliPath, ...argv]) : argv;

  const { stdout, stderr } = await exec(cmd, args, {
    maxBuffer: 10 * 1024 * 1024,
    ...options,
  }).catch((err: unknown) => {
    throw new Error(
      `CLI failed: ${err}\nstdout:\n${err.stdout?.toString()}\nstderr:\n${err.stderr?.toString()}`,
    );
  });

  return {
    code: 0,
    stdout: stdout.toString(),
    stderr: stderr.toString(),
  };
}
