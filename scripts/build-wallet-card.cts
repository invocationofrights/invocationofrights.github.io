/* --------------------------------------------------------------
   Wallet card generator
   SVG (with CSS vars) → PostCSS (resolve vars) → SVGO inline
   → Resvg PNG → pdf‑lib 4‑up duplex PDF
--------------------------------------------------------------- */
import { readFileSync, writeFileSync } from 'fs';
import { join, relative }            from 'path';
import { PDFDocument, rgb, PDFImage} from 'pdf-lib';
import { Resvg }                     from '@resvg/resvg-js';
import { initWasm }                  from '@resvg/resvg-wasm';
import { optimize }                  from 'svgo';
import postcss                       from 'postcss';
import customProps                   from 'postcss-custom-properties';
import logger                        from '../src/lib/logger';
import { BUILD }                     from '../src/config/build';

/* ---------- constants (in points = 1/72 in) -------------------- */
const IN = 72;
const CARD_W = 3.37 * IN;
const CARD_H = 2.125 * IN;
const GUT    = 0.50 * IN;           // ½‑inch gaps
const COLS   = 2, ROWS = 4;         // 4‑up per side
const PAD    = 0.5 * IN;            // ½‑inch sheet margin
const SHEET_W = 8.5 * IN, SHEET_H = 11 * IN;

/* ---------- cut‑guide style ------------------------------------ */
const GUIDE = {
  color     : rgb(0.7, 0.7, 0.7),
  thickness : 0.5,
  opacity   : 0.6,
  dashArray : [3, 3] as number[],
};

/* ---------- helper: slot iterator ------------------------------ */
function* slots() {
  const totalW = COLS * CARD_W + (COLS - 1) * GUT;
  const totalH = ROWS * CARD_H + (ROWS - 1) * GUT;
  const x0 = (SHEET_W - totalW) / 2;
  const y0 = (SHEET_H - totalH) / 2;

  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      yield {
        x: x0 + c * (CARD_W + GUT),
        y: SHEET_H - (y0 + r * (CARD_H + GUT)) - CARD_H,
      };
}

/* ---------- helper: resolve CSS vars & rasterise --------------- */
async function raster(svgPath: string, dpi = 600) {
  // 1 read SVG
  let svg = readFileSync(svgPath, 'utf8');

  // 2 resolve custom properties in <style> blocks
  const styleRE = /<style[^>]*>([\s\S]*?)<\/style>/;
  const m = svg.match(styleRE);
  if (m) {
    const { css } = await postcss([customProps({ preserve: false })])
      .process(m[1], { from: undefined });
    svg = svg.replace(styleRE, `<style>${css}</style>`);
  }

  // 3 inline styles & keep viewBox
  const { data: inlined } = optimize(svg, {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'inlineStyles',
    ],
  });

  // 4 → PNG buffer
  const resvg = new Resvg(inlined, {
    dpi,
    fitTo     : { mode: 'width', value: (CARD_W / IN) * dpi },
    font: {
      loadSystemFonts: false,
      fontFiles : FONT_FILES,         // <‑‑ see below
      defaultFontFamily: 'Inter',
    },

  });
  return resvg.render().asPng();
}

/* ---------- fonts ---------------------------------------------- */
const FONT_FILES = [
  require.resolve('@fontsource/inter/files/inter-latin-100-normal.woff'),
  require.resolve('@fontsource/inter/files/inter-latin-300-normal.woff'),
  require.resolve('@fontsource/inter/files/inter-latin-500-normal.woff'),
];

/* ---------- main ------------------------------------------------ */
(async () => {
  // WASM bootstrap for Resvg
  const wasmPath = require.resolve('@resvg/resvg-wasm/index_bg.wasm');
  await initWasm(readFileSync(wasmPath));
  logger.info('resvg‑wasm initialised');

  // paths
  const frontSVG = join(process.cwd(), BUILD.WALLET_SVG_DIR, BUILD.WALLET_FRONT);
  const backSVG  = join(process.cwd(), BUILD.WALLET_SVG_DIR, BUILD.WALLET_BACK);
  const outPDF   = join(process.cwd(), BUILD.WALLET_PDF_OUT);

  // rasterise both sides
  logger.info('Rasterising SVG → PNG …');
  const [frontBuf, backBuf] = await Promise.all([raster(frontSVG), raster(backSVG)]);

  /* ---- assemble PDF ------------------------------------------ */
  const pdf  = await PDFDocument.create();
  const fImg = await pdf.embedPng(frontBuf);
  const bImg = await pdf.embedPng(backBuf);

  const place = (img: PDFImage) => {
    const page = pdf.addPage([SHEET_W, SHEET_H]);

    // crop / registration marks
    for (let col = 1; col < COLS; col++) {
      const v = PAD + col * CARD_W + (col - 0.5) * GUT;
      page.drawLine({ start: { x: v, y: PAD }, end: { x: v, y: SHEET_H - PAD }, ...GUIDE });
    }
    for (let row = 1; row < ROWS; row++) {
      const y = PAD + row * CARD_H + (row - 0.5) * GUT;
      page.drawLine({ start: { x: PAD, y }, end: { x: SHEET_W - PAD, y }, ...GUIDE });
    }

    for (const p of slots())
      page.drawImage(img, { ...p, width: CARD_W, height: CARD_H });
  };

  place(fImg);   // page 1
  place(bImg);   // page 2

  writeFileSync(outPDF, await pdf.save());
  logger.info(`✓ PDF saved → ${relative(process.cwd(), outPDF)}`);
})().catch((err) => {
  logger.error('wallet‑card build failed', err);
  process.exit(1);
});
