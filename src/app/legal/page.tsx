// ──────────────────────────────────────────────
// File: src/app/legal/page.tsx
// ──────────────────────────────────────────────

import CaseCard from '@/components/CaseCard';
import Link from 'next/link';
import { CASES } from '@/lib/legalCases';

export const metadata = {
  title: 'Legal · Invocation of Rights',
  description:
    'The constitutional doctrine behind the four-line Invocation and the key cases every line relies on.',
};

export default function LegalPage() {
  return (
    <section className="prose dark:prose-invert space-y-16">
      {/* 1. Purpose & disclaimer */}
      <header className="space-y-4">
        <h1>Legal Foundations</h1>
        <p>
          This page explains how each line of the Invocation aligns with United
          States constitutional doctrine. It is civic education, not individual
          legal advice.
        </p>
      </header>

      {/* 2. Constitutional anchors */}
      <section className="space-y-4">
        <h2>Constitutional Anchors</h2>
        <ul className="list-disc pl-5">
          <li>Fourth Amendment — search and seizure</li>
          <li>Fifth Amendment — silence and self-incrimination</li>
          <li>Sixth Amendment — right to counsel</li>
        </ul>
      </section>

      {/* 3. Why precision matters */}
      <section className="space-y-4">
        <h2>Why Precision Matters</h2>
        <blockquote>
          “A suspect who wishes to invoke the privilege must do so clearly.”
          — Salinas v. Texas (2013)
        </blockquote>
        <p>
          Courts consistently hold that rights are preserved only when invoked
          in unmistakable terms. The four-line script provides those terms.
        </p>
      </section>

      {/* 4. Key-case spotlights */}
      <section className="space-y-4" id="case-spotlights">
        <h2>Key Case Spotlights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <CaseCard key={c.id} {...c} />
          ))}
        </div>
      </section>

      {/* 5. Line-by-line rationale */}
      <section className="space-y-4" id="rationale">
        <h2>Line-by-Line Rationale</h2>
        <table>
          <thead>
          <tr>
            <th>Script Line</th>
            <th>Key Cases</th>
            <th>Legal Effect</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>I invoke my right to remain silent.</td>
            <td>
              <a href="#berghuis">Berghuis</a>, <a href="#salinas">Salinas</a>
            </td>
            <td>Explicit invocation required; silence alone is insufficient.</td>
          </tr>
          <tr>
            <td>I want an attorney.</td>
            <td>
              <a href="#davis">Davis</a>, <a href="#edwards">Edwards</a>
            </td>
            <td>Clear request halts custodial interrogation.</td>
          </tr>
          <tr>
            <td>I do not consent to any searches.</td>
            <td>
              <a href="#schneckloth">Schneckloth</a>,{' '}
              <a href="#bostick">Bostick</a>
            </td>
            <td>
              Prevents silence or compliance from being deemed voluntary
              consent.
            </td>
          </tr>
          <tr>
            <td>Am I free to go?</td>
            <td>
              <a href="#royer">Royer</a>, <a href="#terry">Terry</a>
            </td>
            <td>
              Forces officers to clarify detention status or justify continued
              stop.
            </td>
          </tr>
          </tbody>
        </table>
      </section>

      {/* 6. Compliance duties */}
      <section className="space-y-4">
        <h2>Compliance Duties &amp; State Variations</h2>
        <p>
          The Invocation does not override obligations to show identification
          where state law requires it <a href="#hiibel">(Hiibel, 2004)</a>, nor
          does it cancel license or registration duties in traffic stops.
        </p>
      </section>

      {/* 7. Further reading */}
      <section className="space-y-4">
        <h2>Further Reading &amp; Downloads</h2>
        <p>
          For a full analysis of precedent, see Appendix B of the
          white paper.
        </p>
        <Link
          href="/whitepaper"
          className="underline hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Download the white paper →
        </Link>
      </section>
    </section>
  );
}
