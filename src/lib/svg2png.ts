// src/lib/svg2png.ts
import { optimize }           from 'svgo';
import postcss                from 'postcss';
import customProps            from 'postcss-custom-properties';
import { Resvg }              from '@resvg/resvg-js';
import { initWasm }           from '@resvg/resvg-wasm';
import { readFileSync }       from 'fs';
import { findInterFonts }     from './font.ts';

/* one-time WASM bootstrap --------------------------------------- */
let wasmReady = false;
export async function initResvgWasm() {
  if (wasmReady) return;
  const wasm = readFileSync(require.resolve('@resvg/resvg-wasm/index_bg.wasm'));
  await initWasm(wasm);
  wasmReady = true;
}

/* --------------------------------------------------------------- */
export interface RasterOpts {
  widthPt : number;      // target width in PDF points
  dpi     : number;      // raster DPI
  weights?: number[];    // Inter weights to preload
}

/** SVG string → PNG buffer (Uint8Array) */
export async function svgToPng(svg: string, opts: RasterOpts) {
  await initResvgWasm();

  /* post-process CSS custom props */
  const styleRE = /<style[^>]*>([\s\S]*?)<\/style>/;
  const hit = svg.match(styleRE);
  if (hit) {
    const { css } = await postcss([
      customProps({ preserve: false }) as unknown as postcss.AcceptedPlugin,
    ]).process(hit[1], { from: undefined });
    svg = svg.replace(styleRE, `<style>${css}</style>`);
  }

  /* inline + minify */
  const { data } = optimize(svg, {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'inlineStyles',
    ],
  });

  const resvg = new Resvg(data, {
    dpi   : opts.dpi,
    fitTo : { mode: 'width', value: opts.widthPt / 72 * opts.dpi },
    font  : {
      loadSystemFonts: false,
      fontFiles      : findInterFonts(opts.weights),
      defaultFontFamily: 'Inter',
    },
  });

  return resvg.render().asPng();
}
