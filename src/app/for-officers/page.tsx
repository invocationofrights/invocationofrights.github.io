// ---------------------------------------------
// File: src/app/for-officers/page.tsx
// ---------------------------------------------
import BenefitGrid from '@/components/BenefitGrid';
import OfficerFAQ from '@/components/OfficerFAQ';
import ActionSteps from '@/components/ActionSteps';
import Link from 'next/link';

export const metadata = {
  title: 'For Law Enforcement – Invocation of Rights',
  description:
    'How the four‑line Invocation helps officers, supervisors, and prosecutors by clarifying civilian intent and reducing liability.',
};

export default function ForOfficersPage() {
  return (
    <article className="prose dark:prose-invert mx-auto">
      {/* Hero */}
      <header className="not-prose text-center mb-12 space-y-4">
        <h1 className="text-4xl font-bold">
          A Procedural <span className="text-blue-600">Ally</span> for Officers
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          The Invocation removes guess‑work. Clear rights assertion means cleaner
          cases, fewer complaints, and faster resolutions.
        </p>
      </header>

      {/* Benefits */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Why It Helps You</h2>
        <BenefitGrid />
      </section>

      {/* How‑to */}
      <ActionSteps />

      {/* FAQ */}
      <OfficerFAQ />

      {/*/!* Resources *!/*/}
      {/*<section id="resources" className="space-y-4">*/}
      {/*  <h2 className="text-2xl font-semibold">Quick Resources</h2>*/}
      {/*  <ul className="list-disc pl-5 space-y-2">*/}
      {/*    <li>*/}
      {/*      <Link*/}
      {/*        href="/docs/roll‑call_onepager.pdf"*/}
      {/*        className="text-blue-600 hover:underline"*/}
      {/*      >*/}
      {/*        Roll‑call one‑pager&nbsp;⇩*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link*/}
      {/*        href="/docs/bodycam_checklist.pdf"*/}
      {/*        className="text-blue-600 hover:underline"*/}
      {/*      >*/}
      {/*        Body‑cam checklist&nbsp;⇩*/}
      {/*      </Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</section>*/}

      {/* Invitation */}
      <section id="pilot" className="mt-12 p-6 rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 not-prose">
        <h2 className="text-2xl font-semibold mb-2">Pilot &amp; Feedback</h2>
        <p className="mb-4">
          We’re partnering with agencies nationwide to measure real‑world impact
          on stop duration, complaint volume, and evidentiary clarity.
        </p>
        <Link
          href="mailto:pilot@invocationofrights.org"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
        >
          Join the pilot program →
        </Link>
      </section>

      {/* Disclaimer */}
      <footer className="mt-12 text-sm text-neutral-600 dark:text-neutral-400">
        This page is informational only. Always follow your agency’s policies
        and legal counsel.
      </footer>
    </article>
  );
}
