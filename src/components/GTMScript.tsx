//src/components/GTMScript.tsx
'use client'; // needed because <Script> runs on the client side

import Script from 'next/script';
import logger from '@/lib/logger';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function GTMScript() {
  if (!GTM_ID) {
    logger.warn('GTM initialisation skipped –NEXT_PUBLIC_GTM_ID not set');
    return null;
  }

  logger.info('GTM initialising', { GTM_ID });
  return (
    <>
      {/* GTM –script */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      {/* GTM –noscript fallback */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}
