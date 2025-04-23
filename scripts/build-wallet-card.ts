/* --------------------------------------------------------------
   Wallet-card generator
   SVG (CSS vars) → PostCSS (resolve vars) → SVGO inline
   → Resvg PNG → pdf-lib 4-up duplex PDF
---------------------------------------------------------------- */

import {dirname, join, relative} from 'node:path';
import { writeFileSync } from 'node:fs';

import { PDFDocument, rgb, PDFImage, PDFPage } from 'pdf-lib';
import logger                     from '../src/lib/logger';
import { getFrontSvg, getBackSvg } from '@/lib/getSvg';
import { svg2png }                from '@/lib/svg2png';
import { BUILD }                  from '@/config/build';
import {mkdirSync} from "fs";

const OUT_PATH = process.env.OUT_PDF || join(
  process.cwd(), BUILD.DOWNLOADS_DIR, BUILD.WALLET_PDF_OUT,
);

/* ---------- constants ---------------------------------------- */
const IN      = 72;
const CARD_W  = 3.37 * IN;
const CARD_H  = 2.125 * IN;
const GUTTER  = 0.25 * IN;

const COLS    = 2;
const ROWS    = 4;                         // 4-up instead of 5-up
const PADDING = 0.5 * IN;                 // white margin

const SHEET_W = 8.5 * IN;
const SHEET_H = 11 * IN;

/* ---------- slot iterator ------------------------------------ */
function* slots() {
  const gridW = COLS * CARD_W + (COLS - 1) * GUTTER;
  const gridH = ROWS * CARD_H + (ROWS - 1) * GUTTER;
  const x0    = (SHEET_W - gridW) / 2;
  const y0    = (SHEET_H - gridH) / 2;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      yield {
        x: x0 + c * (CARD_W + GUTTER),
        y: SHEET_H - (y0 + r * (CARD_H + GUTTER)) - CARD_H,
      };
    }
  }
}

/* ---------- helper to stamp a side --------------------------- */
const place = (page: PDFPage, img: PDFImage) => {
  for (const pos of slots()) {
    page.drawImage(img, { ...pos, width: CARD_W, height: CARD_H });
  }
};

/* ---------- main --------------------------------------------- */
(async () => {
  /* 1 . read + rasterise the two SVGs */
  const frontSvg = getFrontSvg();
  const backSvg  = getBackSvg();

  const [frontBuf, backBuf] = await Promise.all([
    svg2png(frontSvg, CARD_W),
    svg2png(backSvg , CARD_W),
  ]);
  logger.info('SVG → PNG completed');

  /* 2 . embed PNGs into a fresh PDF */
  const pdf  = await PDFDocument.create();
  const fImg = await pdf.embedPng(frontBuf);
  const bImg = await pdf.embedPng(backBuf);

  const front = pdf.addPage([SHEET_W, SHEET_H]);
  place(front, fImg);

  const back  = pdf.addPage([SHEET_W, SHEET_H]);
  place(back,  bImg);

  /* 3 . dashed trim guides (one page is enough) */
  const GUIDE = { color: rgb(0.7, 0.7, 0.7), opacity: 0.5, thickness: 0.6,
    dashArray: [3, 3] };

  const guides = pdf.getPage(0);
  // vertical
  const v = SHEET_W / 2;
  guides.drawLine({ start: { x: v, y: PADDING },
    end  : { x: v, y: SHEET_H - PADDING },
    ...GUIDE });
  // horizontal
  const h = SHEET_H / 2;
  guides.drawLine({ start: { x: PADDING, y: h },
    end  : { x: SHEET_W - PADDING, y: h },
    ...GUIDE });

  /* 4 . save */
  if (!process.env.DRY_RUN) {
    /* ensure destination folder exists */
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, await pdf.save());
    logger.info(`✓ ${relative(process.cwd(), OUT_PATH)} generated`);
  } else {
    await pdf.save();            // serialise once to catch encode errors
    logger.info('✓ PDF build (dry-run, not written)');
  }
})().catch((err) => {
  logger.error('Wallet-card build failed', err);
  process.exit(1);
});
