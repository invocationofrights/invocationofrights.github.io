// ──────────────────────────────────────────────
// src/lib/getSvg.ts        (NEW helper)
// Read the front– / back-side SVG masters
// ──────────────────────────────────────────────
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { BUILD } from '@/config/build';
import logger from './logger';

/** absolute path helpers */
function frontPath(): string {
  return join(
    process.cwd(),
    BUILD.WALLET_SVG_DIR,   // e.g. "public/images"
    BUILD.WALLET_FRONT      // e.g. "wallet_card_front-en.svg"
  );
}
function backPath(): string {
  return join(
    process.cwd(),
    BUILD.WALLET_SVG_DIR,
    BUILD.WALLET_BACK
  );
}

/** return raw SVG strings */
export function getFrontSvg(): string {
  const fp = frontPath();
  logger.info(`Loaded front SVG: ${fp}`);
  return readFileSync(fp, 'utf8');
}
export function getBackSvg(): string {
  const bp = backPath();
  logger.info(`Loaded back SVG:  ${bp}`);
  return readFileSync(bp, 'utf8');
}
