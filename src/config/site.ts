// ─────────────────────────────────────────────────────────────
// src/config/site.ts
// Public (non‑secret) build‑time / run‑time constants
// ─────────────────────────────────────────────────────────────

export const SITE = {
  /* Basic brand info ------------------------------------------------------ */
  NAME       : 'Invocation of Rights',
  BASE_URL   : 'https://invocationofrights.org',
  SHORT_URL  : 'https://invoc8.org',          // used in QR slugs

  /* Marketing / analytics -------------------------------------------------- */
  GTM_ID     : 'GTM-5NK8GLBX',                // Google Tag Manager
  EMAIL_FORM : 'https://assets.mailerlite.com/jsonp/1468023/forms/152307388990359351/subscribe',

  /* Localised downloads ---------------------------------------------------- */
  DOWNLOAD_DIR: '/downloads',                 // where payloads live
  THUMB_DIR   : '/thumbs',                    // preview images

  // localisation
  DEFAULT_LANG   : 'default',              // change to 'en' later if desired
  SUPPORTED_LANGS: ['default', 'es', 'fr'] as const,
} as const;

/* -------------------------------------------------------------------------
   Helper types so you can write:
       import { SITE } from '@/config/site';
       type Lang = typeof SITE.SUPPORTED_LANGS[number];   // 'default' | 'es' | 'fr'
------------------------------------------------------------------------- */
export type SupportedLang = typeof SITE.SUPPORTED_LANGS[number];
