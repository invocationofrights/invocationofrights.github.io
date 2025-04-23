import fs   from 'node:fs';
import path from 'node:path';
import { Font } from 'fonteditor-core';

/** Minimal shape returned by Font.get() that we actually use */
interface NameTableHolder {
  name: Record<string, string>;
}

/**
 * Overwrite name-IDs 1 & 16 so every face reports the same family.
 * Returns absolute, patched file paths.
 */
export function renameFontFamily(
  newFamily: string,
  files: string[],
): string[] {
  if (!newFamily.trim()) throw new Error('newFamily must be non-empty');

  const patched: string[] = [];

  for (const fp of files) {
    const buf  = fs.readFileSync(fp);
    const font = Font.create(buf, { type: 'ttf' }); // Inter statics are TTF

    const meta  = font.get() as NameTableHolder;
    const names = meta.name;
    if (!names) throw new Error(`No name table in ${fp}`);

    (['fontFamily', 'preferredFamily'] as const).forEach((key) => {
      if (key in names) names[key] = newFamily;
    });

    const raw = font.write({ type: 'ttf' });    // string | ArrayBuffer | Uint8Array

    let out: Buffer;
    if (typeof raw === 'string') {
      out = Buffer.from(raw, 'binary');
    } else if (raw instanceof ArrayBuffer) {
      out = Buffer.from(new Uint8Array(raw));
    } else {
      // Uint8Array (and Buffer is a subclass, so this covers both)
      out = Buffer.from(raw);
    }

    fs.writeFileSync(fp, out);
    patched.push(path.resolve(fp));
  }

  return patched;
}
