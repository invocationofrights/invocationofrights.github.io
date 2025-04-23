// src/lib/exec.ts
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import process from 'node:process';

export interface ExecResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

const exec = promisify(execFile);

/**
 * Cross‑platform helper to run a Node‑based CLI (e.g. tsx) and capture
 * stdout / stderr as **strings** so tests can assert on them.
 *
 * @param cliPath   Absolute path to the JS entry (e.g. require.resolve('tsx'))
 * @param args      Remaining argv items, NOT including `node` or the cliPath
 * @param env       Extra env vars to merge with process.env
 * @returns         ExecResult with .stdout / .stderr already toString()‑ed
 * @throws          Re‑throws the underlying spawn error OR non‑zero exit.
 */
export async function runNodeCli(
  cliPath: string,
  args: string[] = [],
  env: NodeJS.ProcessEnv = {},
): Promise<ExecResult> {
  const nodeExe = process.execPath; // current Node runtime

  try {
    const { stdout, stderr } = await exec(nodeExe, [cliPath, ...args], {
      env: { ...process.env, ...env },
      maxBuffer: 10 * 1024 * 1024, // 10 MB
    });

    return {
      code: 0,
      stdout: stdout.toString(),
      stderr: stderr.toString(),
    };
  } catch (err: unknown) {
    const stdout = err?.stdout?.toString?.() ?? '';
    const stderr = err?.stderr?.toString?.() ?? '';
    throw new Error(
      `CLI failed: ${err}\nstdout:\n${stdout}\n\nstderr:\n${stderr}`,
    );
  }
}
