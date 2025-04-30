// src/scripts/generate-redirects.ts
/**
 * Generate /public/go/<slug>/index.html meta‑refresh pages
 * from redirects.json
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const redirects = JSON.parse(
  readFileSync('scripts/redirects.json', 'utf8')
) as Record<string, string>;

const TEMPLATE = (url: string) => `<!doctype html>
<html lang="en"><meta charset="utf-8"><title>Redirect</title>
<script>location.replace(${JSON.stringify(url)})</script>
<meta http-equiv="refresh" content="0;url=${url}">
<style>body{background:Canvas;color:CanvasText;display:grid;place-content:center;
font-family:system-ui,sans-serif;height:100vh;margin:0}</style>
<p>If you are not redirected, <a href="${url}">click here</a>.</p>
</html>`;

for (const [slug, url] of Object.entries(redirects)) {
  const dir = join('public', 'go', slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), TEMPLATE(url));
  console.log(`✓ /go/${slug} → ${url}`);
}
