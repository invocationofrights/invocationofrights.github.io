// src/components/QRTool.tsx
'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { getQrSvg } from '@/lib/getQrSvg';

const QrSvg = dynamic(() => import('./QrSvg'), { ssr: false });

export default function QRTool() {
  /* ─── state ───────────────────────────────────── */
  const [url, setUrl]       = useState('bit.ly/42o5BXl');
  const [size, setSize]     = useState(300);
  const [standalone, setStandalone] = useState(false);   // ⬅ default = embedded
  const [tx, setTx]         = useState(0);
  const [ty, setTy]         = useState(0);
  const [svgRaw, setSvgRaw] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  /* ─── regenerate SVG on change ─────────────────── */
  useMemo(() => {
    getQrSvg(url, { size }).then(setSvgRaw);
  }, [url, size]);

  /* ─── build code output (no blank lines) ───────── */
  const innerSvg = svgRaw
    ? svgRaw
      .replace(/<\?xml.*?\?>/, '')
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
    : '';

  const embedMarkup = `<g transform="translate(${tx} ${ty})">${innerSvg}</g>`;
  const codeToShow  = standalone ? svgRaw : embedMarkup;

  /* ─── helpers ──────────────────────────────────── */
  const copyToClipboard = async () => {
    if (!codeToShow) return;
    await navigator.clipboard.writeText(codeToShow);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const downloadSvg = () => {
    if (!svgRaw) return;
    const blob = new Blob([svgRaw], { type: 'image/svg+xml' });
    const href = URL.createObjectURL(blob);
    Object.assign(document.createElement('a'), { href, download: 'qr-code.svg' }).click();
    URL.revokeObjectURL(href);
  };

  /* ─── render ───────────────────────────────────── */
  return (
    <section className="w-full max-w-4xl mx-auto space-y-8 text-gray-900 dark:text-gray-100">
      {/* URL */}
      <div>
        <label className="block mb-1 font-medium" htmlFor="qr-url">URL to encode</label>
        <input
          id="qr-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-900"
        />
      </div>

      {/* size */}
      <div className="flex items-center gap-3">
        <label htmlFor="qr-size" className="font-medium">Size (px)</label>
        <input
          id="qr-size"
          type="number" min={64} max={1024} step={16}
          value={size}
          onChange={(e) => setSize(Number(e.target.value) || 0)}
          className="w-28 border rounded px-2 py-1 bg-white dark:bg-gray-900"
        />
      </div>

      {/* preview with thin border */}
      <div className="inline-block p-1 border rounded">
        <QrSvg value={url} size={size} />
      </div>

      {/* buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={downloadSvg}
          disabled={!standalone}                        /* only relevant when file exists */
          className={`px-4 py-2 rounded text-white ${
            standalone
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-400 cursor-not-allowed'
          }`}
        >
          Download SVG
        </button>

        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center gap-2"
        >
          {copied ? 'Copied!' : 'Copy Markup'}
          {copied && (
            <span className="animate-ping inline-block w-2 h-2 rounded-full bg-green-400" />
          )}
        </button>
      </div>

      {/* embed / standalone toggle */}
      <div className="space-y-4">
        {!standalone && (
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium">Embedded location</span>
            <div className="flex items-center gap-2">
              <span>tx:</span>
              <input
                type="number" value={tx}
                onChange={(e) => setTx(Number(e.target.value) || 0)}
                className="w-20 border rounded px-2 py-1 bg-white dark:bg-gray-900"
              />
            </div>
            <div className="flex items-center gap-2">
              <span>ty:</span>
              <input
                type="number" value={ty}
                onChange={(e) => setTy(Number(e.target.value) || 0)}
                className="w-20 border rounded px-2 py-1 bg-white dark:bg-gray-900"
              />
            </div>
          </div>
        )}

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={standalone}
            onChange={(e) => setStandalone(e.target.checked)}
          />
          Stand‑alone <code>&lt;svg&gt;</code>
        </label>

        <pre className="border rounded bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 h-64 overflow-auto text-xs whitespace-pre-wrap">
{codeToShow || 'Generating SVG…'}
        </pre>
      </div>
    </section>
  );
}
