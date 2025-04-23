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

/**
 * Run a CLI and capture stdout / stderr as **strings**.
 *
 * ─ Behaviour ────────────────────────────────────────────────
 * • If `cliPath` _is already_ the current Node executable
 *   (e.g. process.execPath, "node", "node.exe"), run it
 *   directly:    node [...argv]
 *
 * • Otherwise prepend the active Node binary so we always
 *   execute a JS entry file cross-platform:
 *      node  <cliPath> [...argv]
 *
 * • Throws if the child exits with non-zero code.
 */
export async function runNodeCli(
  cliPath: string,
  argv: string[],
  options: Parameters<typeof exec>[2] = {},
): Promise<ExecResult> {
  const isNodeExe = (() => {
    const cliBase = path.basename(cliPath).toLowerCase();
    const nodeBase = path.basename(process.execPath).toLowerCase();
    return (
      cliPath === process.execPath ||
      cliBase === 'node' ||
      cliBase === 'node.exe' ||
      cliBase === nodeBase
    );
  })();

  const cmd = isNodeExe ? cliPath : process.execPath;
  const args = isNodeExe ? argv : [cliPath, ...argv];

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
