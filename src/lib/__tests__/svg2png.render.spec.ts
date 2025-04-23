// src/lib/__tests__/svg2png.render.spec.ts
import { describe, it, expect } from 'vitest';
import { PNG } from 'pngjs';
import { svg2png } from '../svg2png';

const demo = (w: number) => `
<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="120" fill="#fff"/>
  <text x="20" y="80" font-family="Inter"
        font-size="72"
        font-weight="${w}">Aa</text>
</svg>`;

async function renderAndCountDarkPixels(weight: number) {
  const buf = await svg2png(demo(weight), 400);
  const png = PNG.sync.read(buf);
  let dark = 0;
  for (let i = 0; i < png.data.length; i += 4) {
    const [r,g,b] = png.data.slice(i, i+3);
    if (r < 200 && g < 200 && b < 200) dark++;   // rough “ink” pixel
  }
  return dark;
}

describe('svg2png variable-font render', () => {
  it('produces more “ink” in weight-500 than weight-100', async () => {
    const thin  = await renderAndCountDarkPixels(100);
    const heavy = await renderAndCountDarkPixels(500);
    console.log(`Weight-100 dark pixels: ${thin}`);
    console.log(`Weight-500 dark pixels: ${heavy}`);
    const pct = (heavy - thin) / thin;
    console.log(`Weight-500 is ${(pct * 100).toFixed(1)}% darker`);
    expect(pct).toBeGreaterThan(0.20); // > 20 % darker
  });
});
