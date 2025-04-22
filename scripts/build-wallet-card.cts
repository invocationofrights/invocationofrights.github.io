/* -----------------------------------------------------------------
   scripts/build-wallet-card.cts
   Wallet‑card generator
   • SVG front / back  →  PostCSS (resolve CSS vars) →  SVGO inline
   • Resvg → 600 dpi PNG  →  pdf‑lib 8‑up PDF with dashed cut‑guides
------------------------------------------------------------------ */

import { readFileSync, writeFileSync } from 'fs';
import { join, relative }             from 'path';
import {PDFDocument, rgb, PDFPage, PDFImage} from 'pdf-lib';
import { Resvg }                      from '@resvg/resvg-js';
import { initWasm }                   from '@resvg/resvg-wasm';
import { optimize }                   from 'svgo';
import postcss                        from 'postcss';
import customProps                    from 'postcss-custom-properties';
import logger                         from '../src/lib/logger';
import { BUILD }                      from '../src/config/build';

/* ---------- geometry (points) ---------------------------------- */
const IN      = 72;            // 1 inch = 72 pt
const CARD_W  = 3.37  * IN;    // CR‑80 width
const CARD_H  = 2.125 * IN;    // CR‑80 height
const GUT     = 0.25  * IN;    // gap between cards
const COLS    = 2;
const ROWS    = 4;             // 8 cards / sheet
const SHEET_W = 8.5  * IN;     // US‑Letter
const SHEET_H = 11    * IN;

/* ---------- iterator over card slots --------------------------- */
function* slots() {
  const gridW = COLS * CARD_W + (COLS - 1) * GUT;
  const gridH = ROWS * CARD_H + (ROWS - 1) * GUT;
  const x0 = (SHEET_W - gridW) / 2;
  const yTop = (SHEET_H + gridH) / 2 - CARD_H;

  for (let r = 0; r < ROWS; r++) {
    const y = yTop - r * (CARD_H + GUT);
    for (let c = 0; c < COLS; c++) {
      const x = x0 + c * (CARD_W + GUT);
      yield { x, y };
    }
  }
}

/* ---------- dashed cut‑guides helper --------------------------- */
const GUIDE_STYLE = {
  color: rgb(0, 0, 0),
  opacity: 0.4,
  thickness: 0.6,
  dashArray: [3, 3] as number[],   // mutable for pdf‑lib typing
};

function drawCutGuides(page: PDFPage) {
  // vertical centre line
  const v = SHEET_W / 2;
  page.drawLine({
    start: { x: v, y: 36 },
    end:   { x: v, y: SHEET_H - 36 },
    ...GUIDE_STYLE,
  });

  // three horizontals between 4 rows
  for (let r = 1; r < ROWS; r++) {
    const y = SHEET_H / 2 + (ROWS / 2 - r) * (CARD_H + GUT);
    page.drawLine({
      start: { x: 36, y },
      end:   { x: SHEET_W - 36, y },
      ...GUIDE_STYLE,
    });
  }
}

/* ---------- SVG → PNG buffer (resolves CSS vars) --------------- */
async function raster(svgPath: string, dpi = 600) {
  let svg = readFileSync(svgPath, 'utf8');

  // resolve CSS custom properties inside <style>
  const styleRE = /<style[^>]*>([\s\S]*?)<\/style>/;
  const m = svg.match(styleRE);
  if (m) {
    const { css } = await postcss([customProps({ preserve: false })])
      .process(m[1], { from: undefined });
    svg = svg.replace(styleRE, `<style>${css}</style>`);
  }

  // inline styles with SVGO
  const { data: inlined } = optimize(svg, {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'inlineStyles',
    ],
  });

  // rasterise via Resvg
  const resvg = new Resvg(inlined, {
    dpi,
    fitTo: { mode: 'width', value: (CARD_W / IN) * dpi },
  });
  return resvg.render().asPng();   // Uint8Array buffer
}

/* ---------- main ------------------------------------------------ */
(async () => {
  /* init Resvg WASM */
  const wasmPath = require.resolve('@resvg/resvg-wasm/index_bg.wasm');
  await initWasm(readFileSync(wasmPath));

  /* paths */
  const frontSVG = join(process.cwd(), BUILD.WALLET_SVG_DIR, BUILD.WALLET_FRONT);
  const backSVG  = join(process.cwd(), BUILD.WALLET_SVG_DIR, BUILD.WALLET_BACK);
  const outPDF   = join(process.cwd(), BUILD.DOWNLOADS_DIR, BUILD.WALLET_PDF_OUT);

  /* rasterise */
  const [frontBuf, backBuf] = await Promise.all([
    raster(frontSVG),
    raster(backSVG),
  ]);

  /* assemble PDF */
  const pdf       = await PDFDocument.create();
  const frontImg  = await pdf.embedPng(frontBuf);
  const backImg   = await pdf.embedPng(backBuf);

  const place = (img: PDFImage) => {
    const page = pdf.addPage([SHEET_W, SHEET_H]);
    drawCutGuides(page);
    for (const pos of slots()) {
      page.drawImage(img, { ...pos, width: CARD_W, height: CARD_H });
    }
  };

  place(frontImg);   // page 1
  place(backImg);    // page 2

  writeFileSync(outPDF, await pdf.save());
  logger.info(`✓ ${relative(process.cwd(), outPDF)} generated`);
})().catch((err) => {
  logger.error('wallet‑card build failed', err);
  process.exit(1);
});
