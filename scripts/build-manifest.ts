// src/scripts/build-manifest.ts
import { readdirSync, mkdirSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { SITE }  from '../src/config/site';
import { BUILD } from '../src/config/build';

/* derive absolute paths */
const DL_DIR  = join(process.cwd(), BUILD.PUBLIC_DIR, SITE.DOWNLOAD_DIR.slice(1));
const OUT_DIR = join(process.cwd(), BUILD.DOWNLOADS_DIR);
const OUT_FILE = join(OUT_DIR, BUILD.RES_JSON_NAME);

/* helper types */
type LangMap     = Record<string, string>;
type ResourceMap = Record<string, LangMap>;

function buildManifest(): ResourceMap {
  const manifest: ResourceMap = {};

  for (const file of readdirSync(DL_DIR)) {
    const match = file.match(/^(.+?)(?:\.([a-z]{2}))?\.(\w+)$/i);
    if (!match) continue;

    const [, base, lang = SITE.DEFAULT_LANG] = match;
    manifest[base] ??= {};
    manifest[base][lang] = `${SITE.DOWNLOAD_DIR}/${file}`; // URL used by app
  }

  return manifest;
}

(function main() {
  const data = buildManifest();
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(data, null, 2));

  console.log('✓ resources manifest →', relative(process.cwd(), OUT_FILE));
})();
