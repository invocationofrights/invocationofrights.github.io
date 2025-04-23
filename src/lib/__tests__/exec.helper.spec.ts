import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { runNodeCli } from '../exec';
import process from 'node:process';
const node = process.execPath;
const tsx  = require.resolve('tsx');

/**
 * This spec verifies that runNodeCli() actually captures stdout/stderr
 * from a Node‑based CLI and returns exit code 0. We create a tiny JS file
 * on the fly so the helper receives a *node script* (not node itself).
 */

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

  it('should exit 0 when invoked via explicit node shell', async () => {
    await expect(
      runNodeCli(node, [tsx, '-e', 'console.log(1)']),
    ).resolves.toMatchObject({ code: 0, stdout: '1\n', stderr: '' });
  });
});
