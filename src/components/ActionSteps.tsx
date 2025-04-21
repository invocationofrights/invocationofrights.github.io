// ---------------------------------------------
// File: src/components/ActionSteps.tsx
// ---------------------------------------------
import { ClipboardEdit, Clock3, Film, Mail } from 'lucide-react';

const steps = [
  {
    icon: ClipboardEdit,
    label: 'Acknowledge',
    text: 'Note the Invocation verbatim in your report.',
  },
  {
    icon: Clock3,
    label: 'Timestamp',
    text: 'Mark the body‑cam time for easy review.',
  },
  {
    icon: Film,
    label: 'Continue within limits',
    text: 'Questioning after an Invocation requires lawful basis.',
  },
  {
    icon: Mail,
    label: 'Log & share feedback',
    text: 'Send lessons to the pilot team (2‑min form).',
  },
];

export default function ActionSteps() {
  return (
    <section id="recognize" className="space-y-6">
      <h2 className="text-2xl font-semibold">Recognize & Respond</h2>
      <ul className="grid sm:grid-cols-2 gap-6">
        {steps.map(({ icon: Icon, label, text }) => (
          <li
            key={label}
            className="flex items-start gap-4 border border-neutral-200 dark:border-neutral-800 rounded-md p-4"
          >
            <Icon className="h-6 w-6 shrink-0 text-blue-600" />
            <div>
              <h3 className="font-medium">{label}</h3>
              <p className="text-sm">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
