// src/hooks/usePreferredLang.ts
import { useState, useEffect } from 'react';

/**
 * Returns the browser’s preferred language code that your
 * site supports ("es", "fr", …) or "default" for English.
 *
 * Extend the `supported` array when you add more languages.
 */
export default function usePreferredLang() {
  type Lang = 'es' | 'fr' | 'default';    // expand as needed
  const [lang, setLang] = useState<Lang>('default');

  useEffect(() => {
    if (typeof navigator === 'undefined') return;       // SSR safety
    const supported = ['es', 'fr'];                     // add 'de', 'pt', …
    const code = navigator.language.split('-')[0];      // e.g. "en-US" → "en"
    if (supported.includes(code)) setLang(code as Lang);
  }, []);

  return lang;
}
