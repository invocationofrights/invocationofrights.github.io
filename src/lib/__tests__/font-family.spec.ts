import { describe, it, expect } from 'vitest';
import * as fontkit from 'fontkit';
import { findInterFonts } from '../font';

/** Get the family name from either a Font or FontCollection */
function familyName(f: fontkit.Font | fontkit.FontCollection): string {
  return 'fonts' in f
    ? (f.fonts[0] as fontkit.Font).familyName
    : (f as fontkit.Font).familyName;
}

describe('static Inter faces share one family', () => {
  it('all report family name "Inter"', () => {
    const fonts = findInterFonts();
    expect(fonts.length).toBeGreaterThan(0);

    const families = new Set<string>(
      fonts.map((p) => familyName(fontkit.openSync(p))),
    );

    if (families.size !== 1 || !families.has('Inter')) {
      console.error('Family names detected:', [...families].join(', '));
    }

    expect(families.size).toBe(1);
    expect(families.has('Inter')).toBe(true);
  });
});
