// src/components/QrSvg.tsx
'use client';

import { useEffect, useState } from 'react';
import { getQrSvg } from '@/lib/getQrSvg';

type Props = {
  value: string;
  size?: number;            // pixels (square)
  className?: string;
};

export default function QrSvg({ value, size = 280, className }: Props) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getQrSvg(value, size).then((raw) => {
      if (!cancelled) setSvg(raw);
    });

    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!svg) {
    return <p className="mt-6 text-center text-gray-600">Generating…</p>;
  }

  return (
    /* eslint-disable-next-line react/no-danger */
    <div
      className={className}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
