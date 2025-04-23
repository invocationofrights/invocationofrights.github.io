import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Return absolute, platform-correct paths to the static Inter faces.
 * No leading slash on Windows.
 */
export function findInterFonts(): string[] {
  const here   = dirname(fileURLToPath(import.meta.url));
  const fonts  = join(here, '..', '..', 'assets', 'fonts'); // assets/fonts/

  return [
    join(fonts, 'Inter-Thin.ttf'),
    join(fonts, 'Inter-Light.ttf'),
    join(fonts, 'Inter-Medium.ttf'),
  ];
}
