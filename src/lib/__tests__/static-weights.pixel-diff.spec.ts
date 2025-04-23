import { describe, it, expect } from 'vitest';
import { svg2png } from '../svg2png';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const demo = (w: number) => `
<svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="120" fill="#fff"/>
  <text x="20" y="80" font-family="Inter" font-weight="${w}"
        font-size="96">W</text>
</svg>`;

async function pngOf(weight: number) {
  return PNG.sync.read(await svg2png(demo(weight), 300));
}

describe('static Inter weights differ', () => {
  it('pixel diff between 100 & 500 is > 2 %', async () => {
    const thin  = await pngOf(100);
    const heavy = await pngOf(500);

    const diffBuf = new Uint8Array(thin.width * thin.height * 4); // <- output
    const diff    = pixelmatch(
      thin.data,
      heavy.data,
      diffBuf,
      thin.width,
      thin.height,
    );

    const pct = diff / (thin.width * thin.height);
    expect(pct).toBeGreaterThan(0.02);
  });
});
