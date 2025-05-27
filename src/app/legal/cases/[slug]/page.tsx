// ──────────────────────────────────────────────
// File: src/app/legal/cases/[slug]/page.tsx
// ──────────────────────────────────────────────

import { CASES, LegalCase } from '@/lib/legalCases';
import { notFound } from 'next/navigation';
import Link from 'next/link';

/** Build-time prerender of every legal-case slug */
export async function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

/** Page props for async route — `params` arrives as a Promise */
type PageProps = {
  params: Promise<{ slug: string }>;
};

/** Dynamic route: /legal/cases/[slug] */
export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;            // unwrap promised params
  const legalCase: LegalCase | undefined = CASES.find(
    (c) => c.slug === slug,
  );

  if (!legalCase) notFound();

  return (
    <section className="prose dark:prose-invert space-y-8">
      <h1>{legalCase.title}</h1>

      <h2>Holding</h2>
      <p>{legalCase.holding}</p>

      <h2>Relevance to the Invocation</h2>
      <p>Reinforces: {legalCase.scriptLine}</p>

      <Link
        href="/legal#rationale"
        className="underline hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        ← Back to Legal overview
      </Link>
    </section>
  );
}
