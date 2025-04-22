// src/lib/getQrSvg.ts
export interface QROpts {
  size?: number;          // final width/height in px
  error?: 'L' | 'M' | 'Q' | 'H';
}

export async function getQrSvg(
  text: string,
  { size = 256, error = 'M' }: QROpts = {}
): Promise<string> {
  const { default: QRCode } = await import('qrcode-svg');

  return new QRCode({
    content: text,
    width: size,
    height: size,
    padding: 0,          // ❶ no white border
    background: '#ffffff',
    color: '#000000',
    ecl: error,
  }).svg();
}
