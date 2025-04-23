import { PDFDocument, PDFName, PDFDict } from 'pdf-lib';

/**
 * Extract distinct font names embedded in a PDF.
 *
 * @param pdfBytes A Uint8Array / ArrayBuffer / Node Buffer containing a full PDF file
 * @returns Sorted array of unique font names (e.g. ["Inter", "Helvetica-Bold"])
 */
export async function listPdfFonts(pdfBytes: Uint8Array | ArrayBuffer): Promise<string[]> {
  const doc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
  const context = doc.context;

  const out = new Set<string>();

  for (const [, obj] of context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFDict)) continue;

    const type = obj.get(PDFName.of('Type'));
    if (!(type instanceof PDFName)) continue;
    if (type.asString() !== 'Font') continue;

    // Prefer BaseFont; fall back to Name if present
    const base = obj.get(PDFName.of('BaseFont')) ?? obj.get(PDFName.of('Name'));
    if (base instanceof PDFName) {
      // strip leading "/" and subset tags (AAAAAA+)
      const raw = base.asString();
      const name = raw.replace(/^.*\+/, '');
      out.add(name);
    }
  }

  return Array.from(out).sort();
}
