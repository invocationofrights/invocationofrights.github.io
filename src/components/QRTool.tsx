// src/components/QRTool.tsx
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getQrSvg } from '@/lib/getQrSvg';

const QrSvg = dynamic(() => import('./QrSvg'), { ssr: false });

export default function QRTool() {
  const [url, setUrl]       = useState('bit.ly/42o5BXl');
  const [size, setSize]     = useState(300);
  const [standalone, setStandalone] = useState(true);
  const [svgRaw, setSvgRaw] = useState<string | null>(null);

  // Regenerate & cache SVG for copy/download
  useMemo(() => {
    getQrSvg(url, { size }).then(setSvgRaw);
  }, [url, size]);

  // Helper: extract inner markup for embed mode
  const embedMarkup = svgRaw
    ? svgRaw.replace(/<\?xml.*?\?>/, '')        // drop XML prolog
      .replace(/<svg[^>]*>/, '')          // drop opening <svg>
      .replace(/<\/svg>\s*$/, '')          // drop closing </svg>
    : '';

  const codeToShow = standalone ? svgRaw : embedMarkup;

  const downloadSvg = () => {
    if (!svgRaw) return;
    const blob = new Blob([svgRaw], { type: 'image/svg+xml' });
    const urlObj = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), {
      href: urlObj,
      download: 'qr-code.svg',
    });
    link.click();
    URL.revokeObjectURL(urlObj);
  };

  const copyToClipboard = async () => {
    if (codeToShow) await navigator.clipboard.writeText(codeToShow);
  };

  return (
    <section className="w-full max-w-lg space-y-6">
      {/* URL input */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="qr-input">URL to encode</label>
        <input
          id="qr-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Size / scaling */}
      <div className="flex items-center gap-3">
        <label htmlFor="qr-size" className="font-medium">Size&nbsp;(px)</label>
        <input
          id="qr-size"
          type="number"
          min={64}
          max={1024}
          step={16}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-24 border rounded px-2 py-1"
        />
      </div>

      {/* Live preview */}
      <QrSvg value={url} size={size} className="mx-auto" />

      {/* Controls */}
      <div className="flex gap-4 justify-center">
        <button onClick={downloadSvg} className="px-4 py-2 rounded bg-blue-600 text-white">
          Download SVG
        </button>
        <button onClick={copyToClipboard} className="px-4 py-2 rounded bg-gray-200">
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
          Stand‑alone `svg` (uncheck for embed)
        </label>

        <pre className="border rounded bg-gray-50 p-3 h-52 overflow-auto text-xs">
{codeToShow || 'Generating SVG…'}
        </pre>
      </div>
    </section>
);
}
