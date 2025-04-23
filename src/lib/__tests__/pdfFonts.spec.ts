// src/lib/__tests__/pdfFonts.spec.ts
import { describe, it, expect } from 'vitest';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { listPdfFonts } from '../pdfFonts';

describe('listPdfFonts()', () => {
  it('detects embedded Helvetica', async () => {
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);
    const page = pdf.addPage([200, 200]);
    page.drawText('Test', { x: 10, y: 150, font });

    const bytes = await pdf.save();
    const fonts = await listPdfFonts(bytes);

    expect(fonts).toContain('Helvetica-Bold');
  });
});
