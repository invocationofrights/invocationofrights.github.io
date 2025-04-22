// ─────────────────────────────────────────────
// src/config/build.ts   ← private, build‑only
// ─────────────────────────────────────────────
export const BUILD = {
  PUBLIC_DIR   : 'public',     // where Next copies static assets from
  DOWNLOADS_DIR     : 'public/downloads',   // where JSON manifests live in source
  RES_JSON_NAME: 'resources.json',

  /* Wallet‑card asset locations ----------------------------- */
  WALLET_SVG_DIR : 'public/images',          // where the SVG masters live
  WALLET_FRONT   : 'wallet_card_front-en.svg',
  WALLET_BACK    : 'wallet_card_back-en.svg',
  WALLET_PDF_OUT : 'wallet_card_en.pdf',
} as const;
