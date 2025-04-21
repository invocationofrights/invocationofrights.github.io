// ---------------------------------------------
// File: src/components/OfficerFAQ.tsx
// ---------------------------------------------
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type QA = { q: string; a: string };
const items: QA[] = [
  {
    q: 'Does this stop me from asking questions?',
    a: 'Only custodial interrogation requires you to pause. You may still ask ID or safety questions in the field.',
  },
  {
    q: 'Is this sovereign‑citizen language?',
    a: 'No. The Invocation affirms court authority and mirrors Miranda from the civilian side.',
  },
  {
    q: 'Will it slow down traffic stops?',
    a: 'Experience from pilot tests shows clearer boundaries actually shorten stop length by cutting side‑conversations.',
  },
];

export default function OfficerFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="space-y-4">
      <h2 className="text-2xl font-semibold">Common Questions</h2>

      {items.map((item, idx) => (
        <button
          key={item.q}
          onClick={() => setOpen(open === idx ? null : idx)}
          className="w-full text-left border border-neutral-200 dark:border-neutral-800 rounded-md p-4 transition hover:bg-neutral-50 dark:hover:bg-neutral-900"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">{item.q}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                open === idx ? 'rotate-180' : ''
              }`}
            />
          </div>
          {open === idx && <p className="mt-2 text-sm">{item.a}</p>}
        </button>
      ))}
    </section>
  );
}
