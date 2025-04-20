// src/app/whitepaper/page.tsx

import Link from 'next/link';

export default function WhitepaperPage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20 prose dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed">

      <h1 className="text-4xl font-bold mb-4">Whitepaper</h1>
      <p className="text-lg text-neutral-700 dark:text-neutral-300">
        The <strong>Invocation of Rights</strong> whitepaper explains the legal, cognitive, and civic foundations of the four-line script. It presents supporting precedent, behavioral research, and a proposed implementation strategy.
      </p>

      <ul className="mt-6 space-y-2 text-base list-disc list-inside">
        <li><strong>25 pages</strong> with citations, appendices, and design rationale</li>
        <li>Grounded in Supreme Court decisions and behavioral science</li>
        <li>Includes practical guides for implementation and pilot testing</li>
      </ul>

      <div className="mt-8">
        <Link
          href="/docs/invocation_whitepaper.pdf"
          target="_blank"
          rel="noopener"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
        >
          Download the PDF
        </Link>
      </div>

      <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
        Citation: Unger, R. (2025). <em>The Invocation of Rights: A Whitepaper on Standardized Civilian Legal Language in Police Encounters</em>. invocationofrights.org.
      </p>

      <p className="mt-4 text-sm">
        View related pages: <Link href="/legal" className="text-blue-600 hover:underline">Legal Foundations</Link>, <Link href="/resources" className="text-blue-600 hover:underline">Resources</Link>, <Link href="/get-involved" className="text-blue-600 hover:underline">Get Involved</Link>
      </p>
    </section>
  );
}
