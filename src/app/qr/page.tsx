// src/app/qr/page.tsx
'use client';

import dynamic from 'next/dynamic';

/**
 * Lazy‑load the interactive QR generator so the rest
 * of the site never ships the extra NPM deps.
 */
const QRTool = dynamic(() => import('@/components/QRTool'), {
  loading: () => <p className="text-center mt-8">Loading QR&nbsp;tool…</p>,
  ssr: false,               // keep it purely client‑side for now
});

export default function QRPage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">QR‑Code Generator</h1>

      {/* Lazy component renders below when the chunk finishes downloading */}
      <QRTool />
    </main>
  );
}
