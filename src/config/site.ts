// ─────────────────────────────────────────────────────────────
// src/config/site.ts   ← public, non‑secret constants
// ─────────────────────────────────────────────────────────────
export const SITE = {
  GTM_ID: 'GTM-5NK8GLBX', // Google Tag Manager (public, so fine in VCS)
  EMAIL_COLLECTION: 'https://assets.mailerlite.com/jsonp/1468023/forms/152307388990359351/subscribe',
} as const;
