import { Resvg } from '@resvg/resvg-js';
import { initWasm } from '@resvg/resvg-wasm';
import { optimize } from 'svgo';
import postcss from 'postcss';
import customProps from 'postcss-custom-properties';
import { findInterFonts } from './font';
import logger from './logger';

let wasmReady = false;

export interface Svg2PngOptions {
  collectTrace?: boolean;     // capture Resvg font-trace lines
  loadSystemFonts?: boolean;  // allow system fonts (default=false)
}

export interface Svg2PngResult {
  png: Buffer;                         // 600-dpi raster
  trace: string[];                     // font trace lines (may be empty)
}

/** Rasterise an SVG string → PNG buffer (width in *points*). */
export async function svg2png(
  svg: string,
  widthPts: number,
  opts: Svg2PngOptions = {},
): Promise<Svg2PngResult> {
  /* 0. init WASM once */
  if (!wasmReady) {
    await initWasm(
      require('node:fs').readFileSync(
        require.resolve('@resvg/resvg-wasm/index_bg.wasm'),
      ),
    );
    wasmReady = true;
    logger.info('Resvg WASM loaded (svg2png)');
  }

  /* 1. resolve CSS custom-properties */
  const styleRE = /<style[^>]*>([\s\S]*?)<\/style>/;
  const m = svg.match(styleRE);
  if (m) {
    const { css } = await postcss([customProps({ preserve: false })])
      .process(m[1], { from: undefined });
    svg = svg.replace(styleRE, `<style>${css}</style>`);
  }

  /* 2. inline <style> rules */
  const { data: inlined } = optimize(svg, {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'inlineStyles',
    ],
  });

  /* 3. optional font trace hook */
  const trace: string[] = [];
  let restore: (() => void) | undefined;

  if (opts.collectTrace) {
    const hook = (s: NodeJS.WriteStream) => {
      const orig = s.write;
      s.write = function (chunk: any, enc?: any, cb?: any) {
        const str = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk);
        if (str.includes('resvg_js::fonts')) trace.push(str.trim());
        return orig.call(this, chunk, enc, cb);
      };
      return () => { s.write = orig; };
    };
    const u1 = hook(process.stdout);
    const u2 = hook(process.stderr);
    restore = () => { u1(); u2(); };
  }

  /* 4. rasterise */
  const resvg = new Resvg(inlined, {
    fitTo: { mode: 'width', value: widthPts },
    dpi: 600,
    font: {
      fontFiles: findInterFonts(),
      loadSystemFonts: opts.loadSystemFonts ?? false,
      defaultFontFamily: 'Inter',
    },
  });

  const png = Buffer.from(resvg.render().asPng());

  if (restore) restore();

  return { png, trace };
}
