// src/components/QRTool.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getQrSvg } from '@/lib/getQrSvg';
import logger from '@/lib/logger';

const QrSvg = dynamic(() => import('./QrSvg'), { ssr: false });
const LS_KEY = 'qr-tool-state';

function readPersisted() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    logger.warn('Failed to parse persisted QR‑tool state', err);
    return {};
  }
}

export default function QRTool() {
  /* initial state (restored if available) */
  const persisted = readPersisted();
  const [url, setUrl]         = useState(persisted.url        ?? 'bit.ly/42o5BXl');
  const [size, setSize]       = useState(persisted.size       ?? 300);
  const [standalone, setStandalone] = useState(persisted.standalone ?? false);
  const [tx, setTx]           = useState(persisted.tx         ?? 0);
  const [ty, setTy]           = useState(persisted.ty         ?? 0);
  const [copied, setCopied]   = useState(false);
  const [svgRaw, setSvgRaw]   = useState<string | null>(null);

  /* save state whenever it changes */
  useEffect(() => {
    const state = { url, size, standalone, tx, ty };
    logger.debug('Persisting QR‑tool state', state);
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [url, size, standalone, tx, ty]);

  /* regenerate SVG when URL or size change */
  useMemo(() => {
    getQrSvg(url, { size }).then(setSvgRaw);
  }, [url, size]);

  /* build markup */
  const innerSvg    = svgRaw
    ? svgRaw
      .replace(/<\?xml.*?\?>/, '')
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
    : '';
  const embedMarkup = `<g transform="translate(${tx} ${ty})">${innerSvg}</g>`;
  const codeToShow  = standalone ? svgRaw : embedMarkup;

  /* helpers */
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

  /* UI */
  return (
    <section className="w-full max-w-4xl mx-auto space-y-8 text-gray-900 dark:text-gray-100">
      {/* URL input */}
      <div>
        <label htmlFor="qr-url" className="block mb-1 font-medium">URL to encode</label>
        <input
          id="qr-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-900"
        />
      </div>

      {/* Size input */}
      <div className="flex items-center gap-3">
        <label htmlFor="qr-size" className="font-medium">Size (px)</label>
        <input
          id="qr-size"
          type="number"
          min={64}
          max={1024}
          step={16}
          value={size}
          onChange={(e) => setSize(Number(e.target.value) || 0)}
          className="w-28 border rounded px-2 py-1 bg-white dark:bg-gray-900"
        />
      </div>

      {/* QR preview */}
      <div className="inline-block p-1 border rounded">
        <QrSvg value={url} size={size} />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={downloadSvg}
          disabled={!standalone}
          className={`px-4 py-2 rounded text-white ${
            standalone ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
          }`}
        >
          Download SVG
        </button>

        <button
          onClick={copyToClipboard}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center gap-2"
        >
          {copied ? 'Copied!' : 'Copy Markup'}
          {copied && <span className="animate-ping w-2 h-2 bg-green-400 rounded-full" />}
        </button>
      </div>

      {/* Embed controls + code viewer */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={standalone}
              onChange={(e) => setStandalone(e.target.checked)}
            />
            Stand‑alone <code>&lt;svg&gt;</code>
          </label>

          {/* tx/ty stay visible but are disabled when standalone */}
          <div className="flex items-center gap-2">
            <span>tx:</span>
            <input
              type="number"
              value={tx}
              onChange={(e) => setTx(Number(e.target.value) || 0)}
              disabled={standalone}
              className={`w-20 border rounded px-2 py-1 bg-white dark:bg-gray-900 ${
                standalone ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            />
          </div>
          <div className="flex items-center gap-2">
            <span>ty:</span>
            <input
              type="number"
              value={ty}
              onChange={(e) => setTy(Number(e.target.value) || 0)}
              disabled={standalone}
              className={`w-20 border rounded px-2 py-1 bg-white dark:bg-gray-900 ${
                standalone ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            />
          </div>
        </div>

        <pre className="border rounded bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 h-64 overflow-auto text-xs whitespace-pre-wrap">
{codeToShow || 'Generating SVG…'}
        </pre>
      </div>
    </section>
  );
}
