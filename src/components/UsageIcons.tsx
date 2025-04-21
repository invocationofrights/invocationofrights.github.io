// src/components/UsageIcons.tsx
// ─────────────────────────────
import { ShieldCheck, Users, Car, Briefcase } from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, label: 'Street encounter' },
  { icon: Car,         label: 'Traffic stop'     },
  { icon: Users,       label: 'Protest / rally'  },
  { icon: Briefcase,   label: 'Workplace visit'  },
];

export default function UsageIcons() {
  return (
    <section className="space-y-4" id="where">
      <h2 className="text-2xl font-semibold">When should I use it?</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {ITEMS.map(({ icon: Icon, label }) => (
          <li key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon size={32} aria-hidden />
            <span className="text-sm">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
