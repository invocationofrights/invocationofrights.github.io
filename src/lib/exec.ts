// src/lib/exec.ts
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import process from 'node:process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export interface ExecResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

interface ExecError extends Error {
  stdout?: string | Buffer;
  stderr?: string | Buffer;
}

const exec = promisify(execFile);
const JS_EXT = new Set(['.js', '.mjs', '.cjs']);

/**
 * Return the *JS* entry file defined in a package.json "bin" field.
 * Works cross-platform so callers don’t hard-code dist/cli.mjs paths.
 */
export function resolveJsCli(pkgName: string): string {
  const pkg = require(`${pkgName}/package.json`);
  const bin  = typeof pkg.bin === 'string' ? pkg.bin
    : pkg.bin?.[pkgName] ?? Object.values(pkg.bin ?? {})[0];
  if (!bin) throw new Error(`Package ${pkgName} has no bin entry`);
  const abs = path.resolve(path.dirname(require.resolve(`${pkgName}/package.json`)), bin);
  if (!existsSync(abs)) throw new Error(`Resolved CLI not found: ${abs}`);
  return abs;
}

/** Run a CLI, capturing stdout/stderr as strings. */
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
    const e = err as ExecError;
    throw new Error(
      `CLI failed: ${e}\nstdout:\n${e.stdout?.toString()}\nstderr:\n${e.stderr?.toString()}`,
    );
  });

  return {
    code: 0,
    stdout: stdout.toString(),
    stderr: stderr.toString(),
  };
}
