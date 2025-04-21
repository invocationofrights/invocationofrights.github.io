// src/components/DownloadsSection.tsx
// ───────────────────────────────────
import Link from 'next/link';
import { Download } from 'lucide-react';

const ITEMS = [
  {
    label: 'White‑paper (PDF)',
    href: '/docs/invocation_whitepaper.pdf',
  },
  {
    label: 'Wallet card (PDF)',
    href: '/assets/wallet_card.pdf',
  },
  {
    label: 'Lock‑screen image',
    href: '/assets/lockscreen.png',
  },
];

export default function DownloadsSection() {
  return (
    <section className="space-y-4" id="downloads">
      <h2 className="text-2xl font-semibold">Downloads</h2>
      <ul className="space-y-3">
        {ITEMS.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              data-analytics={`download_${label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Download size={18} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
