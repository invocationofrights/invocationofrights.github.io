// src/components/PracticeDrill.tsx
// ────────────────────────────────
'use client';

import { useState } from 'react';

const lines = [
  'I invoke my right to remain silent.',
  'I invoke my right to a lawyer.',
  'I don’t consent to any searches.',
  'I want to leave. Am I free to go?',
];

export default function PracticeDrill() {
  const [step, setStep] = useState<number>(0);

  const next = () => setStep((s) => (s + 1) % (lines.length + 1));

  return (
    <section className="space-y-4" id="practice">
      <h2 className="text-2xl font-semibold">30‑Second Practice</h2>

      {step === lines.length ? (
        <p className="text-center text-green-600 font-medium">
          Nice — you’ve completed the drill!
        </p>
      ) : (
        <p className="text-center text-lg font-medium">{lines[step]}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={next}
          className="px-6 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition"
          data-analytics="practice-next"
        >
          {step === lines.length ? 'Restart' : 'Next'}
        </button>
      </div>
    </section>
  );
}
