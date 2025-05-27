// ──────────────────────────────────────────────
// File: src/components/CaseCard.tsx
// ──────────────────────────────────────────────

import Link from 'next/link';

export interface CaseCardProps {
  id: string;
  title: string;
  holding: string;
  scriptLine: string;
  slug: string;
}

export default function CaseCard({
                                   id,
                                   title,
                                   holding,
                                   scriptLine,
                                   slug,
                                 }: CaseCardProps) {
  return (
    <article
      id={id}
      className="rounded-xl border border-slate-300 dark:border-slate-700 p-4 space-y-2 bg-slate-50 dark:bg-slate-800"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm">{holding}</p>
      <p className="text-xs italic">Reinforces: {scriptLine}</p>
      <Link
        href={`/legal/cases/${slug}`}
        className="text-sm underline hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Read full brief →
      </Link>
    </article>
  );
}
