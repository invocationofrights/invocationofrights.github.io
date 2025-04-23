import { describe, it, expect } from 'vitest';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);

describe('wallet build CLI', () => {
  it('runs to completion in dry mode', async () => {
    const { stderr } = await exec(
      'tsx',
      ['scripts/build-wallet-card.ts'],
      { env: { ...process.env, DRY_RUN: '1' } },
    );
    expect(stderr).toBe('');
  });
});
