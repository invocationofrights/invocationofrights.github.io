// src/lib/getQrSvg.ts
export interface QROpts {
  size?: number;
  error?: 'L' | 'M' | 'Q' | 'H';
  fg?: string;          // “pips” colour
  bg?: string | null;   // null/undefined → transparent
}

export async function getQrSvg(
  text: string,
  {
    size  = 256,
    error = 'M',
    fg    = '#000000',
    bg    = null,       // ❶ default = transparent
  }: QROpts = {}
): Promise<string> {
  const { default: QRCode } = await import('qrcode-svg');

  return new QRCode({
    content: text,
    width: size,
    height: size,
    padding: 0,
    color: fg,
    // only emit the <rect> if a bg colour is supplied
    ...(bg ? { background: bg } : {}),
    ecl: error,
  }).svg();
}
