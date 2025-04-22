/* ------------------------------------------------------------
   build-wallet-card.cts  (run via ts-node/register)
   Converts front/back SVG into duplex 10‑up PDF for home print.
------------------------------------------------------------- */
import {PDFDocument, PDFImage} from 'pdf-lib';
import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import { BUILD } from '../src/config/build';

/* ---- resolve full SVG paths from config ------------------- */
const FRONT_SVG = join(process.cwd(), BUILD.WALLET_SVG_DIR, BUILD.WALLET_FRONT);
const BACK_SVG  = join(process.cwd(), BUILD.WALLET_SVG_DIR, BUILD.WALLET_BACK);
const OUT_PDF   = join(process.cwd(), BUILD.DOWNLOADS_DIR, BUILD.WALLET_PDF_OUT);

/* ---- card + sheet geometry -------------------------------- */
const CARD_W_IN = 3.37;
const CARD_H_IN = 2.125;
const GUTTER_IN = 0.25;
const COLS = 2, ROWS = 5;
const PT = 72;
const CARD_W = CARD_W_IN * PT;
const CARD_H = CARD_H_IN * PT;
const GUTTER  = GUTTER_IN * PT;
const SHEET_W = 8.5 * PT;
const SHEET_H = 11  * PT;

/* grid positions */
function* positions() {
  const totalW = COLS * CARD_W + (COLS - 1) * GUTTER;
  const totalH = ROWS * CARD_H + (ROWS - 1) * GUTTER;
  const x0 = (SHEET_W - totalW) / 2;
  const y0 = (SHEET_H - totalH) / 2;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      yield { x: x0 + c * (CARD_W + GUTTER),
        y: y0 + r * (CARD_H + GUTTER) };
}

/* ---- main ------------------------------------------------- */
(async () => {
  /* 1. read SVGs and rasterise at 600 dpi */
  const DPI = 600;
  const PX_W = Math.round(CARD_W_IN * DPI);
  const PX_H = Math.round(CARD_H_IN * DPI);

  const frontPNG = await sharp(readFileSync(FRONT_SVG))
    .resize(PX_W, PX_H)
    .png()
    .toBuffer();

  const backPNG = await sharp(readFileSync(BACK_SVG))
    .resize(PX_W, PX_H)
    .png()
    .toBuffer();

  /* 2. create PDF */
  const pdf = await PDFDocument.create();
  const frontImg = await pdf.embedPng(frontPNG);
  const backImg  = await pdf.embedPng(backPNG);

  const addSide = (img: PDFImage) => {
    const page = pdf.addPage([SHEET_W, SHEET_H]);
    for (const pos of positions())
      page.drawImage(img, { x: pos.x, y: pos.y, width: CARD_W, height: CARD_H });
  };

  addSide(frontImg);   // page 1
  addSide(backImg);    // page 2

  writeFileSync(OUT_PDF, await pdf.save());
  console.log('✓', relative(process.cwd(), OUT_PDF), 'generated');
})();
