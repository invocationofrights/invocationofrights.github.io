// src/lib/svg2png.ts
import { Resvg }    from '@resvg/resvg-js';
import { initWasm }   from '@resvg/resvg-wasm';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import { optimize } from 'svgo';
import postcss      from 'postcss';
import customProps  from 'postcss-custom-properties';

import { findInterFonts } from './font.js';
import logger             from './logger.js';

const require = createRequire(import.meta.url); // <-- resurrects require()

/** Rasterise an SVG string → PNG buffer. Width is in *points* (1 pt = 1/72"). */
export async function svg2png(svg: string, widthPts: number): Promise<Buffer> {
  /* 0. Initialise WASM once per process */
  if (!(global as any).__resvgReady) {
    const wasmPath = require.resolve('@resvg/resvg-wasm/index_bg.wasm');
    await initWasm(fs.readFileSync(wasmPath));

    (global as any).__resvgReady = true;
    logger.info('Resvg WASM loaded (svg2png)');
  }

  /* 1. Resolve CSS custom-properties (PostCSS) */
  const styleRE = /<style[^>]*>([\s\S]*?)<\/style>/;
  const match   = svg.match(styleRE);

  if (match) {
    const inCSS   = match[1];
    const { css } = await postcss([customProps({ preserve: false })])
      .process(inCSS, { from: undefined });
    svg = svg.replace(styleRE, `<style>${css}</style>`);
  }

  /* 2. Inline <style/> rules (SVGO) */
  const { data: inlined } = optimize(svg, {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'inlineStyles',
    ],
  });

  /* 3. Rasterise */
  const resvg = new Resvg(inlined, {
    fitTo: { mode: 'width', value: widthPts },
    dpi  : 600,

    /* ↓↓↓  the only font settings Resvg actually reads ↓↓↓ */
    font: {
      fontFiles: findInterFonts(),
      loadSystemFonts: false,
      defaultFontFamily: 'Inter',       // static faces use “Inter”
    },
  });

  return Buffer.from(resvg.render().asPng());
}
