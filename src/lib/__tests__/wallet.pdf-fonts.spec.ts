// src/lib/_tests__/wallet.pdf-fonts.spec.ts
import { describe, it, expect, test } from 'vitest';
import { mkdtempSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import {resolveJsCli, runNodeCli} from '../exec';
import { listPdfFonts } from '../pdfFonts';

const tsxCli = resolveJsCli('tsx');  // auto-resolves to cli.mjs
const buildTS  = path.join('scripts', 'build-wallet-card.ts');

/* Actually, the PDF contains no fonts. Just PNGs. */
describe('wallet build embeds no fonts', () => {
  it('PDF exists', async () => {
    /* temp output file */
    const tmpDir = mkdtempSync(path.join(tmpdir(), 'wallet-test-'));
    const outPdf = path.join(tmpDir, 'card.pdf');
    console.log('Temp dir:', tmpDir);

    /* run build script via tsx */
    const result = await runNodeCli(tsxCli, [buildTS], {
        env: { OUT_PDF: outPdf },
      });
    console.log('Exec result:', result);

    /* parse embedded fonts */
    const pdfBytes = readFileSync(outPdf);
    const fonts = await listPdfFonts(pdfBytes); // ['Inter-Light', …]

    console.log('Fonts:', fonts);

    expect(fonts.length).toBe(0);
  });
});
