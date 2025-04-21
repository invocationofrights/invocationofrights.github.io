// src/components/ScriptHero.tsx
// ─────────────────────────────
'use client';

import { useState } from 'react';
import logger from "@/lib/logger";

const SCRIPT_LINES = [
  'I invoke my right to remain silent.',
  'I invoke my right to a lawyer.',
  'I don’t consent to any searches.',
  'I want to leave. Am I free to go?',
];

export default function ScriptHero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SCRIPT_LINES.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      window.dataLayer?.push({ event: 'copy_script' }); // GTM
    } catch (err) {
      logger.warn('copy failed', err);
    }
  };

  const handleSpeak = () => {
    const utter = new SpeechSynthesisUtterance(SCRIPT_LINES.join('  '));
    utter.rate = 1;
    speechSynthesis.speak(utter);
    window.dataLayer?.push({ event: 'tts_script' });
  };

  return (
    <section className="text-center space-y-6" id="script">
      <h1 className="text-4xl sm:text-5xl font-bold">
        The 4‑Line Invocation
      </h1>

      <div className="space-y-4 text-lg sm:text-xl">
        {SCRIPT_LINES.map((l) => (
          <p key={l} className="font-medium">
            {l}
          </p>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleCopy}
          className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          data-analytics="copy-script"
        >
          {copied ? 'Copied!' : 'Copy Script'}
        </button>

        <button
          onClick={handleSpeak}
          className="px-5 py-2 rounded-md border border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          data-analytics="tts-script"
        >
          🔊 Listen
        </button>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
        Memorize it. Practise it. Share it.
      </p>
    </section>
  );
}
