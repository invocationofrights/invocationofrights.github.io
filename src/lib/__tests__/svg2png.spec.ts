import { describe, it, expect } from 'vitest';
import { svg2png } from '../svg2png';            // => one folder up

describe('svg2png', () => {
  it('rasterises text (non-empty PNG)', async () => {
    const buf = await svg2png(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60">
         <text font-family="Inter" y="50">Hi</text>
       </svg>`,
      200,
    );
    // crude but fast regression guard
    expect(buf.byteLength).toBeGreaterThan(200);   // 380 passes, blank-PNG ≈120
    // Optional: magic number check -> PNG signature
    expect(buf.readUInt32BE(0)).toBe(0x89504e47);
  });
});
