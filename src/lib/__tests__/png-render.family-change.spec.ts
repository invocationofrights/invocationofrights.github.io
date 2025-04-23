import { describe, it, expect } from 'vitest';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { svg2png } from '../svg2png';

const TMP = mkdtempSync(path.join(tmpdir(), 'png-family-'));
console.log('Temp dir:', TMP);

const svg = (family: string) => `
<svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="200" fill="#fff"/>
  <text x="20" y="150"
        font-family="'${family}'"
        font-weight="500"
        font-size="160">QUICK FOX 123</text>
</svg>`;

function diffPct(a: PNG, b: PNG) {
  const diff = pixelmatch(a.data, b.data, null, a.width, a.height);
  return diff / (a.width * a.height);
}

describe('svg2png respects font-family', () => {
  it('Inter vs Courier New differ ≥ 25 % and trace shows correct families', async () => {
    process.env.RUST_LOG = 'resvg_js::fonts=trace';

    const inter = await svg2png(svg('Inter'), 800, { collectTrace: true });
    const mono  = await svg2png(svg('Courier New'), 800, { collectTrace: true });

    /* save snapshots for manual inspection */
    const interPath = path.join(TMP, 'inter.png');
    const monoPath  = path.join(TMP, 'courier.png');
    writeFileSync(interPath, inter.png);
    writeFileSync(monoPath,  mono.png);
    console.log('Snapshots:', interPath, monoPath);

    /* font traces */
    const interTrace = inter.trace.join('\n');
    const monoTrace  = mono.trace.join('\n');
    console.log('Inter trace lines:\n', interTrace);
    console.log('Courier trace lines:\n', monoTrace);

    /* pixel difference */
    const pct = diffPct(PNG.sync.read(inter.png), PNG.sync.read(mono.png));
    console.log(`Pixel diff: ${(pct * 100).toFixed(1)} %`);

    expect(pct).toBeGreaterThan(0.25);

    expect(interTrace).toMatch(/default_font_family = 'Inter'/);
    expect(monoTrace).not.toMatch(/default_font_family = 'Inter'/);
  });
});
