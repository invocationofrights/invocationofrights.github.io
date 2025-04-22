// src/components/QrSvg.tsx
'use client';

import { useEffect, useState } from 'react';
import { getQrSvg, QROpts } from '@/lib/getQrSvg';

interface Props extends QROpts {
  value: string;
  className?: string;
}

export default function QrSvg({ value, size = 300, error, className }: Props) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getQrSvg(value, { size, error }).then((raw) => !cancelled && setSvg(raw));
    return () => { cancelled = true; };
  }, [value, size, error]);

  if (!svg) return <p className="mt-6 text-center text-gray-600">Generating…</p>;

  /* eslint-disable-next-line react/no-danger */
  return <div className={className} dangerouslySetInnerHTML={{ __html: svg }} />;
}
