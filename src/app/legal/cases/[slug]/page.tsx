// ──────────────────────────────────────────────
// File: src/app/legal/cases/[slug]/page.tsx
// ──────────────────────────────────────────────

import { CASES, LegalCase } from '@/lib/legalCases';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

function findCase(slug: string): LegalCase | undefined {
  return CASES.find((c) => c.slug === slug);
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const c = findCase(params.slug);
  if (!c) notFound();

  return (
    <section className="prose dark:prose-invert space-y-8">
      <h1>{c.title}</h1>

      <h2>Holding</h2>
      <p>{c.holding}</p>

      <h2>Relevance to the Invocation</h2>
      <p>Reinforces: {c.scriptLine}</p>

      <Link
        href="/legal#rationale"
        className="underline hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        ← Back to Legal overview
      </Link>
    </section>
  );
}
