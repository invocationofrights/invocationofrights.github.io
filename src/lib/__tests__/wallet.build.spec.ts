// src/lib/__tests__/wallet.build.spec.ts
import { describe, it, expect } from 'vitest';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve as r } from 'node:path';

const exec = promisify(execFile);

const nodeExe   = process.execPath;                 // absolute path to node
const tsxCli    = require.resolve('tsx');           // …/node_modules/tsx/dist/cli.cjs
const buildFile = r('scripts', 'build-wallet-card.ts');

describe('wallet build CLI', () => {
  it('runs to completion in dry mode', async () => {
    const { stderr } = await exec(
      nodeExe,
      [tsxCli, buildFile],
      { env: { ...process.env, DRY_RUN: '1' } },
    );

    expect(stderr).toBe('');
  });
});
