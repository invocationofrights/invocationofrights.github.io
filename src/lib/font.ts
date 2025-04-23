// src/lib/font.ts
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import logger from './logger';

/**
 * Return an array of file-paths for the requested Inter weights.
 * Falls back to 400 if a weight isn’t present. Supports both
 * `@fontsource/inter` (static) and `@fontsource-variable/inter`.
 */
export function findInterFonts(
  weights: number[] = [400],
): string[] {
  const pkgs = [
    '@fontsource/inter',
    '@fontsource-variable/inter',
    'typeface-inter',
  ];

  for (const pkg of pkgs) {
    try {
      const root = dirname(require.resolve(join(pkg, 'package.json')));
      const files: string[] = [];

      for (const w of weights) {
        const guess = [
          `files/inter-latin-${w}-normal.ttf`,
          `files/inter-latin-${w}.ttf`,
          `files/inter-latin-${w}-normal.woff`,
          `files/inter-latin-${w}-normal.woff2`,
          `ttf/Inter-${w}.ttf`,
        ].map((p) => join(root, p)).find((p) => {
          try { readFileSync(p); return true; } catch { return false; }
        });

        if (guess) files.push(guess);
        else logger.warn(`Inter weight ${w} not found in ${pkg}; falling back.`);
      }

      if (files.length) return files;
    } catch { /* pkg not installed – ignore */ }
  }

  logger.error('⚠️  No Inter fonts found; text may rasterise blank');
  return [];
}
