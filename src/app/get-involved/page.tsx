// src/app/get-involved/page.tsx
// ──────────────────────────────

import Link from 'next/link';
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = {
  title: 'Get Involved · Invocation of Rights',
  description:
    'Help share, teach, and translate the four-line rights script. Small acts build the standard.',
};

export default function GetInvolvedPage() {
  return (
    <article className="space-y-24 max-w-3xl mx-auto px-4 py-20 prose dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed">

      {/* Hero / Summary CTA */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Get Involved</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          The script doesn’t spread by law. It spreads by people.
        </p>
        <p className="text-base">
          Share it, teach it, help refine it. Every recitation builds a norm.
        </p>
      </section>

      {/* 1. Share it */}
      <section>
        <h2>📢 Share the Script</h2>
        <p>Pick a link, post it anywhere. Normalize it by repetition.</p>
        <div className="space-y-2">
          <Link
            href="https://twitter.com/intent/tweet?text=This%204-line%20script%20protects%20your%20rights%20during%20police%20encounters.%20Say%20it%20out%20loud%20%F0%9F%91%87%0Ahttps%3A%2F%2Finvocationofrights.org%2Fhow-to"
            target="_blank"
            rel="noopener"
            className="inline-block text-blue-600 underline"
            data-analytics="share_twitter"
          >
            Tweet this →
          </Link>
          <br />
          <Link
            href="/assets/social_card.png"
            download
            className="inline-block text-blue-600 underline"
            data-analytics="download_socialcard"
          >
            Download social card image
          </Link>
        </div>
      </section>

      {/* 2. Teach it */}
      <section>
        <h2>🎓 Teach the Script</h2>
        <p>
          Use our free kit to run a 15-minute roleplay in your classroom,
          clinic, or community group.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <Link href="/assets/teaching_guide.pdf" target="_blank" className="underline">
              Classroom guide PDF
            </Link>
          </li>
          <li>
            <Link href="/assets/poster.pdf" target="_blank" className="underline">
              Printable poster
            </Link>
          </li>
          <li>
            <Link href="/how-to" className="underline">
              Practice it yourself first →
            </Link>
          </li>
        </ul>
      </section>

      {/* 3. Translate or localize */}
      <section>
        <h2>🌍 Translate or Adapt</h2>
        <p>
          Want to help make the Invocation available in another language—or adjust it for a different legal culture?
        </p>
        <p>
          We welcome translation drafts, legal vetting, or just notes on how the phrasing resonates in your context.
        </p>
        <Link
          href="mailto:info@invocationofrights.org?subject=Translation interest"
          className="underline"
        >
          Email us to coordinate →
        </Link>
      </section>

      {/* 4. Stay in the loop */}
      <section>
        <h2>📬 Stay in the Loop</h2>
        <p>
          We’ll announce pilot results, resource updates, and opportunities to collaborate—no spam.
        </p>
        <NewsletterForm/>

      </section>

      {/* 5. Closing line */}
      <section className="text-center text-neutral-500 dark:text-neutral-400 text-sm">
        This isn’t a protest. It’s a standard. Let’s build it together.
      </section>
    </article>
  );
}
