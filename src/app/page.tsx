// src/app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <section
      className="max-w-3xl mx-auto px-4 py-20 prose dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed">

      {/* Hero */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">
        The Invocation of Rights
      </h1>
      <h2 className="text-xl sm:text-2xl font-medium text-center text-gray-500 dark:text-gray-400 mb-10">
        Four simple lines to protect yourself—like “stop, drop, and roll” for your rights.
      </h2>

      {/* Script Block */}
      <div id="script" className="mt-20 space-y-4 text-lg sm:text-xl">
        <p>🤐 <span className="font-medium">I invoke my right to remain silent.</span></p>
        <p>⚖️ <span className="font-medium">I invoke my right to a lawyer.</span></p>
        <p>🔍 <span className="font-medium">I don’t consent to any searches.</span></p>
        <p>🚪 <span className="font-medium">I want to leave. Am I free to go?</span></p>
      </div>
      <p className="text-center">
        <Link
          href="/whitepaper"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
        >
          Download the whitepaper (PDF)
        </Link>
      </p>
      <p className="mt-6 text-center">
        <Link
          href="/resources"
          className="inline-block border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/10 transition"
        >
          Download wallet card
        </Link>
      </p>

      {/* Why this matters (teaser) */}
      <div className="mt-24">
        <h3 className="text-lg font-semibold">Why does this exist?</h3>
        <p>
          29% of DNA-overturned convictions involved false confessions. In many cases, civilians didn’t clearly invoke
          their rights—and courts treated silence as waiver.
        </p>
        <p>
          The Invocation makes your rights speak for themselves. No guesswork. No legalese.
        </p>
        <p className="mt-2">
          <Link href="/why" className="text-blue-600 hover:underline">
            Learn why this matters →
          </Link>
        </p>
      </div>

      {/* Legal trust (micro signal) */}
      <div className="mt-16 border-t pt-10">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
          Built on Supreme Court precedent. Valid across all U.S. jurisdictions.
        </p>
        <p className="text-center mt-2">
          <Link href="/legal" className="text-blue-600 text-sm hover:underline">
            See legal basis →
          </Link>
        </p>
      </div>

      {/* Share / Get Involved */}
      <div className="mt-16 text-center">
        <h3 className="text-lg font-semibold">Join the movement</h3>
        <p className="mb-4">Help normalize the script—share it or join a pilot.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/get-involved"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Get involved
          </Link>
          <Link
            href="https://twitter.com/intent/tweet?text=Learn%20this%204-line%20script%20to%20invoke%20your%20rights.%20https%3A%2F%2Finvocationofrights.org"
            target="_blank"
            rel="noopener"
            className="inline-block border border-blue-600 text-blue-600 px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/10 transition"
          >
            Share on Twitter
          </Link>
        </div>
      </div>
    </section>
  );
}
