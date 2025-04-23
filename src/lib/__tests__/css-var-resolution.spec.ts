import { describe, it, expect } from 'vitest';
import { optimize } from 'svgo';
import postcss from 'postcss';
import customProps from 'postcss-custom-properties';
import { getFrontSvg } from '../getSvg';

function extractFontFamilies(css: string): string[] {
  const out: string[] = [];
  css.replace(/font-family:\s*['"]?([^;"']+)/gi, (_, fam) => {
    out.push(fam.trim());
    return '';
  });
  return [...new Set(out)];
}

describe('wallet SVG resolves font-family var', () => {
  it('produces "Inter", not var(--font)', async () => {
    const svg = getFrontSvg();
    const styleMatch = svg.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    expect(styleMatch).toBeTruthy();

    const { css } = await postcss([customProps({ preserve: false })])
      .process(styleMatch![1], { from: undefined });

    const fams = extractFontFamilies(css);
    expect(fams).toContain('Inter');
    expect(fams.some((f) => f.includes('var('))).toBe(false);
  });
});
