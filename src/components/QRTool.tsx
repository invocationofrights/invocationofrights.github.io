// src/components/QRTool.tsx
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getQrSvg } from '@/lib/getQrSvg';

// Lazy load the SVG renderer so the extra deps stay in /qr chunk
const QrSvg = dynamic(() => import('./QrSvg'), { ssr: false });

export default function QRTool() {
  /* ────────────────────────── state ────────────────────────── */
  const [url, setUrl]           = useState('bit.ly/42o5BXl');
  const [size, setSize]         = useState(300);       // scaling input
  const [standalone, setStandalone] = useState(true);  // <svg> vs <g>
  const [svgRaw, setSvgRaw]     = useState<string | null>(null);

  /* ───────── regenerate SVG whenever url / size changes ────── */
  useMemo(() => {
    getQrSvg(url, { size }).then(setSvgRaw);
  }, [url, size]);

  /* ───────── helper: strip wrapper for embed mode ──────────── */
  const embedMarkup = svgRaw
    ? svgRaw
      .replace(/<\?xml.*?\?>/, '')        // drop XML prolog
      .replace(/<svg[^>]*>/, '')          // drop opening tag
      .replace(/<\/svg>\s*$/, '')         // drop closing tag
    : '';

  const codeToShow = standalone ? svgRaw : embedMarkup;

  /* ───────── download & clipboard helpers ──────────────────── */
  const downloadSvg = () => {
    if (!svgRaw) return;
    const blob = new Blob([svgRaw], { type: 'image/svg+xml' });
    const urlObj = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement('a'), {
      href: urlObj,
      download: 'qr-code.svg',
    });
    a.click();
    URL.revokeObjectURL(urlObj);
  };

  const copyToClipboard = async () => {
    if (codeToShow) await navigator.clipboard.writeText(codeToShow);
  };

  /* ────────────────────────── render ───────────────────────── */
  return (
    <section className="w-full max-w-lg space-y-6 text-gray-900 dark:text-gray-100">
      {/* URL input */}
      <div>
        <label htmlFor="qr-input" className="block mb-1 font-medium">
          URL to encode
        </label>
        <input
          id="qr-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-900"
        />
      </div>

      {/* Size / scaling input */}
      <div className="flex items-center gap-3">
        <label htmlFor="qr-size" className="font-medium">
          Size (px)
        </label>
        <input
          id="qr-size"
          type="number"
          min={64}
          max={1024}
          step={16}
          value={size}
          onChange={(e) => setSize(Number(e.target.value) || 0)}
          className="w-24 border rounded px-2 py-1 bg-white dark:bg-gray-900"
        />
      </div>

      {/* Live preview (transparent background) */}
      <QrSvg value={url} size={size} className="mx-auto" />

      {/* Action buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={downloadSvg}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          Download SVG
        </button>
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Copy {standalone ? 'SVG' : '<g>'} Markup
        </button>
      </div>

      {/* Toggle + code viewer */}
      <div className="space-y-2">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={standalone}
            onChange={(e) => setStandalone(e.target.checked)}
          />
          Stand‑alone <code>&lt;svg&gt;</code> (uncheck for embed)
        </label>

        <pre className="border rounded bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-3 h-56 overflow-auto text-xs whitespace-pre-wrap">
{codeToShow || 'Generating SVG…'}
        </pre>
      </div>
    </section>
  );
}
