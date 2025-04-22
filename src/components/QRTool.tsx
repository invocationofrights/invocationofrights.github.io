// src/components/QRTool.tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Lazy‑load the SVG renderer too – separate chunk from the page shell
const QrSvg = dynamic(() => import('./QrSvg'), {
  ssr: false,
  loading: () => null,
});

export default function QRTool() {
  const [url, setUrl] = useState('bit.ly/42o5BXl');

  return (
    <section className="w-full max-w-md">
      <label className="block mb-2 font-medium" htmlFor="qr-input">
        URL&nbsp;to encode
      </label>

      <input
        id="qr-input"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="w-full border rounded px-3 py-2"
      />

      {/* Live preview */}
      <QrSvg value={url} size={300} className="mt-6 mx-auto" />

      <p className="mt-6 text-sm text-gray-600 text-center">
        QR code is rendered entirely client‑side as an SVG. <br />
        No extra JS is downloaded unless you visit this page.
      </p>
    </section>
  );
}
