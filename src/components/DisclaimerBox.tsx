// src/components/DisclaimerBox.tsx
// ───────────────────────────────
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils'; // optional: if you have a class‑names helper

export default function DisclaimerBox() {
  return (
    <section id="limits">
      <div
        className={cn(
          'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
          'p-4 rounded-md space-y-2'
        )}
      >
        <p className="flex items-center font-semibold">
          <AlertTriangle size={20} className="mr-2 shrink-0" />
          Know the limits
        </p>
        <ul className="list-disc pl-6 text-sm leading-relaxed">
          <li>
            The script <em>does not</em> stop lawful searches, arrests, or ID
            requirements.
          </li>
          <li>
            After speaking it, remain silent except for required identification.
          </li>
          <li>
            This site provides civic education—not individual legal advice.
          </li>
        </ul>
      </div>
    </section>
  );
}
