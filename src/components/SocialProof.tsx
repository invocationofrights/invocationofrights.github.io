// src/components/SocialProof.tsx
// ─────────────────────────────
const QUOTES = [
  ['“Clean, clear, and empowering.”', 'Civil‑rights attorney'],
  ['“Finally a Miranda for the rest of us.”', 'High‑school teacher'],
  ['“Takes the fear out of saying the words.”', 'Community organizer'],
];

export default function SocialProof() {
  return (
    <section className="space-y-6" id="testimonials">
      <h2 className="text-2xl font-semibold text-center">What people say</h2>
      <ul className="grid sm:grid-cols-3 gap-6 text-sm">
        {QUOTES.map(([body, author]) => (
          <li
            key={author}
            className="border rounded-md p-4 bg-neutral-50 dark:bg-neutral-800/40"
          >
            <p className="mb-2 italic">&ldquo;{body.replace(/(^“|”$)/g, '')}&rdquo;</p>
            <p className="text-right text-xs text-neutral-500">— {author}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
