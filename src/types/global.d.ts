// src/types/global.d.ts
// (automatically picked up by the TS compiler)

// Extend the global Window interface so TypeScript knows `window.dataLayer` exists.
declare global {
  interface Window {
    dataLayer: unknown[]; // GTM pushes an array of objects; `unknown[]` is fine
  }
}

export {};
