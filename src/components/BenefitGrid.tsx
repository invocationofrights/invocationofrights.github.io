// ---------------------------------------------
// File: src/components/BenefitGrid.tsx
// ---------------------------------------------
import { CheckCircle2 } from 'lucide-react';

const rows = [
  {
    role: 'Patrol Officer',
    immediate: 'Fewer “is‑this‑consent?” disputes',
    payoff: 'Reduced IA complaints',
  },
  {
    role: 'Field Supervisor',
    immediate: 'Objective body‑cam benchmark',
    payoff: 'Easier coaching & QA',
  },
  {
    role: 'Prosecutor',
    immediate: 'Cleaner invocation timestamps',
    payoff: 'Fewer suppression motions',
  },
];

export default function BenefitGrid() {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900">
        <tr className="text-left">
          <th className="px-4 py-2 font-semibold">Role</th>
          <th className="px-4 py-2 font-semibold">Immediate&nbsp;Benefit</th>
          <th className="px-4 py-2 font-semibold">Long‑Term&nbsp;Payoff</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {rows.map((r) => (
          <tr key={r.role}>
            <td className="px-4 py-2 whitespace-nowrap font-medium">{r.role}</td>
            <td className="px-4 py-2">{r.immediate}</td>
            <td className="px-4 py-2 flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
              {r.payoff}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
