import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import { findInterFonts } from '../font';

describe('findInterFonts()', () => {
  it('returns at least one readable file', () => {
    const fonts = findInterFonts();
    expect(fonts.length).toBeGreaterThan(0);
    fonts.forEach(p => expect(fs.existsSync(p)).toBe(true));
  });
});
