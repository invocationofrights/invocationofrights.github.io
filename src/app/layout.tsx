// src/app/layout.tsx
import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Invocation of Rights',
  description: 'A simple site to teach the four‑line script of constitutional rights.',
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[--background] text-[--foreground]">
    <head>
      {/* Google Tag Manager */}
      <Script id="gtm‑script" strategy="afterInteractive">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
      </Script>
    </head>

    <body className="min-h-screen font-sans antialiased">
    {/* GTM <noscript> fallback */}
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>

    {/* ---------- site chrome ---------- */}
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <Navbar />
      </div>
    </header>

    <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>

    <Footer />
    </body>
    </html>
  );
}
