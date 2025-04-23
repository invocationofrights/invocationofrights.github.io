// src/lib/__tests__/exec.helper.spec.ts
import { describe, it, expect } from 'vitest';
import fs, {mkdtempSync} from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { runNodeCli } from '../exec';
import process from 'node:process';
import {writeFileSync} from "fs";
import { createRequire } from 'node:module';

/**
 * This spec verifies that runNodeCli() actually captures stdout/stderr
 * from a Node‑based CLI and returns exit code 0. We create a tiny JS file
 * on the fly so the helper receives a *node script* (not node itself).
 */

const require = createRequire(import.meta.url);
const node = process.execPath;
const tsxBin = path.join(
  path.dirname(require.resolve('tsx')), // .../node_modules/tsx/dist
  'cli.mjs',                            // real JS CLI entry
);

describe('runNodeCli()', () => {
  it('captures stdout and stderr from a node script', async () => {
    /* 1. create throw‑away script */
    const dir = fs.mkdtempSync(path.join(tmpdir(), 'exec-test-'));
    const scriptPath = path.join(dir, 'echo.js');
    fs.writeFileSync(scriptPath, "console.log('OK'); console.error('ERR');\n");

    /* 2. run helper (it will spawn `node <script>` internally) */
    const res = await runNodeCli(scriptPath, []);

    console.log('Exec result:', res);

    expect(res.code).toBe(0);
    expect(res.stdout.trim()).toBe('OK');
    expect(res.stderr.trim()).toBe('ERR');
  });

  it('1) captures stdout from plain node -e', async () => {
    const { stdout } = await runNodeCli(node, ['-e', "console.log('OK')"]);
    expect(stdout.trim()).toBe('OK');
  });

  it('2) tsx shim executes .ts file and captures stdout', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'tsx-test-'));
    const tsFile = path.join(dir, 'hello.ts');
    writeFileSync(tsFile, "console.log('✅');");

    const { stdout, stderr } = await runNodeCli(tsxBin, [tsFile]);

    expect(stdout.trim()).toBe('✅');
    expect(stderr).toBe('');
  });

  it('3) duplicate-node invocation should throw', async () => {
    await expect(
      runNodeCli(node, [node, '-e', "console.log('dup')"]),
    ).rejects.toThrow();
  });

  it('4) executes a TypeScript script via tsx and captures stdout', async () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'cli-test-'));
    const script = path.join(dir, 'test.ts');
    writeFileSync(script, "console.log('✅');\n");

    // pass tsxCli as the CLI; runNodeCli will prepend node for us
    const res = await runNodeCli(tsxBin, [script]);

    expect(res.code).toBe(0);
    expect(res.stdout.trim()).toBe('✅');
    expect(res.stderr).toBe('');
  });
});
