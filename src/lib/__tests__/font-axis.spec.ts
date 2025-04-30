import { describe, expect, test } from 'vitest';
import * as fontkit from 'fontkit';          // ← namespace import
import { findInterFonts } from '../font';
import {Font} from "fontkit";

describe('InterVariable – weight axis present', () => {
  test.skip('exposes wght axis covering 100–900', () => {
    const fontPath = findInterFonts()[0];          // should be InterVariable.ttf
    const font     = fontkit.openSync(fontPath);   // returns a Font object

    const axis = (font as Font).variationAxes?.wght;
    expect(axis, 'missing wght axis').toBeTruthy();

    if (!axis) return;
    expect(axis.min).toBeLessThanOrEqual(100);
    expect(axis.max).toBeGreaterThanOrEqual(900);
  });
});
