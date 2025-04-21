// src/components/InvolveTeaser.tsx
// ────────────────────────────────
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function InvolveTeaser() {
  return (
    <section id="cta" className="text-center space-y-4">
      <h2 className="text-2xl font-semibold">Ready to help spread it?</h2>
      <p>
        From role‑play workshops to translation sprints, there’s a way for
        everyone to pitch in.
      </p>
      <Link
        href="/get-involved"
        className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        data-analytics="cta_get_involved"
      >
        Get&nbsp;Involved <ArrowRight size={18} />
      </Link>
    </section>
  );
}
