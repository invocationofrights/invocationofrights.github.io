import { PDFDocument, PDFDict, PDFName } from 'pdf-lib';

/**
 * Extract unique embedded font base names using pdf-lib public API.
 * Works with pdf-lib ≥ 2.0 which provides context.enumerateIndirectObjects().
 */
export async function listPdfFonts(bytes: Uint8Array | ArrayBuffer): Promise<string[]> {
  const doc = await PDFDocument.load(bytes);
  const found = new Set<string>();

  // enumerate every indirect PDF object once
  for (const [, obj] of doc.context.enumerateIndirectObjects()) {
    if (!(obj instanceof PDFDict)) continue;

    const type = obj.get(PDFName.of('Type'));
    if (type?.toString() !== '/Font') continue;

    const base = obj.get(PDFName.of('BaseFont'));
    if (base) found.add(base.toString().slice(1)); // drop leading slash
  }

  return [...found].sort();
}
