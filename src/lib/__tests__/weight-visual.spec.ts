// src/lib/__tests__/weight-visual.spec.ts
import { describe, it, expect } from 'vitest';
import fs, {mkdtempSync} from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { svg2png } from '../svg2png';
import {tmpdir} from "node:os";

// ───── config ────────────────────────────────────────────────────────────
const TMP = mkdtempSync(path.join(tmpdir(), 'png-weight-'));

const SVG = (weight: number): string => `
<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
  <rect width="320" height="160" fill="#fff"/>
  <text x="12" y="125"
        font-family="Inter"
        font-weight="${weight}"
        font-size="128">H</text>
</svg>`;

// ───── helpers ───────────────────────────────────────────────────────────
async function raster(weight: number, outfile: string): Promise<PNG> {
  const buf = await svg2png(SVG(weight), 320);          // -> Buffer
  fs.writeFileSync(outfile, buf.png);
  return PNG.sync.read(buf.png);                            // -> PNG instance
}

function diffPct(a: PNG, b: PNG): number {
  const diffBuf = new Uint8Array(a.width * a.height * 4);
  const diff    = pixelmatch(
    a.data,
    b.data,
    diffBuf,
    a.width,
    a.height,
  );
  return diff / (a.width * a.height);
}

// ───── spec ──────────────────────────────────────────────────────────────
describe('static Inter weights render distinctly', () => {
  it('pixel diff between 100 and 700 ≥ 5 %', async () => {
    const png100Path = path.join(TMP, 'weight-100.png');
    const png700Path = path.join(TMP, 'weight-700.png');

    const thin  = await raster(100, png100Path);
    const heavy = await raster(700, png700Path);

    console.log(`Snapshots saved to\n  ${png100Path}\n  ${png700Path}`);

    const pct = diffPct(thin, heavy);
    console.log(`Pixel difference: ${(pct * 100).toFixed(1)} %`);

    expect(pct).toBeGreaterThanOrEqual(0.05); // ≥ 5 % pixels differ
  });
});
