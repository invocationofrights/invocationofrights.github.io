// src/app/layout.tsx
import './globals.css';
import Script from 'next/script';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invocation of Rights',
  description: 'A simple site to teach the four-line script of constitutional rights.',
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[--background] text-[--foreground]">
    <head>
      {/* Google Tag Manager Script */}
      <Script id="gtm-script" strategy="afterInteractive">
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
    {/* Google Tag Manager <noscript> fallback */}
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{display: 'none', visibility: 'hidden'}}
      />
    </noscript>

    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <nav className="flex flex-wrap gap-4 text-sm font-medium justify-center sm:justify-start">
          {[
            ['Home', '/'],
            ['Why', '/why'],
            ['Legal', '/legal'],
            ['For Officers', '/for-officers'],
            ['Advisors', '/advisors'],
            ['Supporters', '/supporters'],
            ['Resources', '/resources'],
            ['Manual', '/manual'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[--foreground] hover:text-blue-600 transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>

    <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>

    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-10 text-xs text-neutral-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} Invocation of Rights. Not legal advice.
      </div>
    </footer>
    </body>
    </html>
  );
}
