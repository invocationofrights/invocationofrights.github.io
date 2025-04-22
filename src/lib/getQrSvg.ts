// src/lib/getQrSvg.ts
/**
 * Dynamically imports `qrcode-svg` and returns raw SVG markup.
 *
 * NOTE: keep this function *small* so the heavy library isn’t pulled
 * into any JS chunk unless it’s actually called.
 */
export async function getQrSvg(
  text: string,
  size = 256,
  padding = 4
): Promise<string> {
  const { default: QRCode } = await import('qrcode-svg');   // on‑demand
  const svg: string = new QRCode({
    content: text,
    width: size,
    height: size,
    padding,                      // white border
    background: '#ffffff',
    color: '#000000',
    ecl: 'M',                     // error‑correction level
  }).svg();
  return svg;
}
