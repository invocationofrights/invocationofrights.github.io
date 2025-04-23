import { describe, it, expect } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { svg2png } from '../svg2png';

const TMP = mkdtempSync(path.join(tmpdir(), 'png-trace-'));

const svg = (w: number) => `
<svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="200" fill="#fff"/>
  <text x="20" y="150" font-family="Inter" font-weight="${w}"
        font-size="160">THE QUICK BROWN FOX</text>
</svg>`;

function diffPct(a: PNG, b: PNG) {
  const diff = pixelmatch(a.data, b.data, null, a.width, a.height);
  return diff / (a.width * a.height);
}

describe('Resvg uses Inter, not fallback', () => {
  it('weight-700 vs 100 differ > 15 % and font trace confirms Inter', async () => {
    console.log('Temp dir:', TMP);
    process.env.RUST_LOG = 'resvg_js::fonts=trace';

    const thin  = await svg2png(svg(100), 800, { collectTrace: true });
    const heavy = await svg2png(svg(700), 800, { collectTrace: true });

    writeFileSync(path.join(TMP, 'thin.png'),  thin.png);
    writeFileSync(path.join(TMP, 'heavy.png'), heavy.png);

    /* 1 . pixel diff must be significant */
    const pct = diffPct(PNG.sync.read(thin.png), PNG.sync.read(heavy.png));
    expect(pct).toBeGreaterThan(0.15);

    /* 2 . font trace MUST exist and mention Inter */
    const traceLines = [...thin.trace, ...heavy.trace];
    console.log('Trace:', traceLines);

    expect(traceLines.length).toBeGreaterThan(0);

    const traceTxt = traceLines.join('\n');
    expect(traceTxt).toMatch(/default_font_family = 'Inter'/);
    expect(traceTxt).not.toMatch(/default_font_family = 'Arial'/);
  });
});
