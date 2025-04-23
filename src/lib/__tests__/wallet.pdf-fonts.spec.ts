// src/lib/_tests__/wallet.pdf-fonts.spec.ts
import { describe, it, expect } from 'vitest';
import { mkdtempSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { runNodeCli } from '../exec';
import { listPdfFonts } from '../pdfFonts';

const tsxCli   = require.resolve('tsx');                     // CLI entry file
const buildTS  = path.join('scripts', 'build-wallet-card.ts');

describe('wallet build embeds only Inter fonts', () => {
  it('PDF contains Inter faces and no common fallbacks', async () => {
    /* temp output file */
    const tmpDir = mkdtempSync(path.join(tmpdir(), 'wallet-test-'));
    const outPdf = path.join(tmpDir, 'card.pdf');

    /* run build script via tsx */
    const result = await runNodeCli(process.execPath, [tsxCli, buildTS], {
        env: { OUT_PDF: outPdf },
      });
    console.log('Exec result:', result);

    /* parse embedded fonts */
    const pdfBytes = readFileSync(outPdf);
    const fonts = await listPdfFonts(pdfBytes); // ['Inter-Light', …]

    expect(fonts.length).toBeGreaterThan(0);
    fonts.forEach((f) => expect(f).toMatch(/^Inter/i));
  });
});
