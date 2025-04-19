// src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-20 prose dark:prose-invert prose-headings:font-semibold prose-p:leading-relaxed">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-4">The Invocation of Rights</h1>
      <h2 className="text-xl sm:text-2xl font-medium text-center text-gray-500 dark:text-gray-400 mb-10">
        Four simple lines to protect yourself—<em>anytime, anywhere.</em>
      </h2>

      <div className="space-y-4 text-lg sm:text-xl">
        <p>🤐 <span className="font-medium">I invoke my right to remain silent.</span></p>
        <p>⚖️ <span className="font-medium">I invoke my right to a lawyer.</span></p>
        <p>🔍 <span className="font-medium">I don’t consent to any searches.</span></p>
        <p>🚪 <span className="font-medium">I want to leave. Am I free to go?</span></p>
      </div>

      <p className="mt-10 italic text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
        Memorize it. Share it. Make it a norm—like “stop, drop, and roll.”
      </p>
      <Link href="/docs/invocation_whitepaper.pdf" target="_blank" rel="noopener">
        Download the white‑paper (PDF)
      </Link>
    </section>
  );
}
