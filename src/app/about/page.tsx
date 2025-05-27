// ──────────────────────────────────────────────
// File: src/app/about/page.tsx
// ──────────────────────────────────────────────

import Link from 'next/link';

export const metadata = {
  title: 'About · Invocation of Rights',
  description:
    'Who created Invocation of Rights, why the project exists, and the experts we still need.',
};

export default function AboutPage() {
  return (
    <article className="space-y-16">
      {/* 0. Hero */}
      <header className="space-y-4">
        <h1 className="text-4xl font-bold">About Invocation&nbsp;of&nbsp;Rights</h1>
        <p className="max-w-prose text-lg">
          Because it is unfair that people can lose their rights simply by misspeaking,
          failing to speak, or not studying Supreme Court case law. Our founders intended
          these rights to be present and active—not dormant or available only sometimes.
        </p>
      </header>

      {/* 1. Founder */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Founder</h2>
        <p>
          <strong>Randy&nbsp;Unger</strong>, Founder&nbsp;&amp; Project Lead. Randy is a
          technologist and entrepreneur with 20 + years building data-driven products and
          leading teams. Highlights include product leadership at&nbsp;Honey (acquired by
          PayPal), strategy consulting at&nbsp;Vertebrae (acquired by Snap&nbsp;Inc.), and
          engineering management roles at Gravity (acquired by AOL/Verizon). He holds a
          B.A. in Cognitive Science from the University of Virginia—expertise that informs
          the project’s behavioral-design focus.
        </p>
      </section>

      {/* 2. Currently seeking */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">We’re currently seeking</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Police-academy instructors to pilot a training module</li>
          <li>Law-clinic or research partners for mock-stop studies</li>
          <li>Web or UX volunteers to improve open-source assets</li>
        </ul>
      </section>

      {/* 3. Call to action */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Get involved</h2>
        <p>
          If you or your organization can help, head over to the&nbsp;
          <Link
            href="/get-involved"
            className="underline hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Get&nbsp;Involved form
          </Link>
          . We’ll follow up promptly.
        </p>
      </section>
    </article>
  );
}
