// src/app/layout.tsx
import './globals.css';
import Script from 'next/script';
import Link from 'next/link';

export const metadata = {
  title: 'Invocation of Rights',
  description: 'A simple site to teach the four-line script of constitutional rights.',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      {/*
          Insert the GTM script in the <head>.
          "strategy" can be afterInteractive or lazyOnload.
        */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${process.env.GTM_ID}');
          `}
      </Script>
    </head>
    <body>
    {/*
          Insert the noscript fallback at the start of <body>
          (Google recommends near the opening <body>).
        */}
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}`}
        height="0"
        width="0"
        style={{display: 'none', visibility: 'hidden'}}
      />
    </noscript>

    <header style={{padding: '1rem', borderBottom: '1px solid #ccc'}}>
      <nav>
        <Link href="/">Home</Link> |{' '}
        <Link href="/why">Why</Link> |{' '}
        <Link href="/legal">Legal</Link> |{' '}
        <Link href="/for-officers">For Officers</Link> |{' '}
        <Link href="/advisors">Advisors</Link> |{' '}
        <Link href="/supporters">Supporters</Link> |{' '}
        <Link href="/resources">Resources</Link> |{' '}
        <Link href="/manual">Manual</Link>
      </nav>
    </header>

    <main>{children}</main>

    <footer style={{padding: '1rem', borderTop: '1px solid #ccc', marginTop: '1rem'}}>
      <p>© {new Date().getFullYear()} Invocation of Rights. Not legal advice.</p>
    </footer>
    </body>
    </html>
  );
}
