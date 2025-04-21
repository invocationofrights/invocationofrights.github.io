// src/app/layout.tsx
import '@/styles/globals.css';
import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GTMScript from '@/components/GTMScript';

export const metadata: Metadata = {
  title: 'Invocation of Rights',
  description: 'A simple site to teach the four‑line script of constitutional rights.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[--background] text-[--foreground]">
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
    </head>
    <body className="min-h-screen font-sans antialiased">
    {/* Google Tag Manager */}
    <GTMScript />

    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <Navbar/>
      </div>
    </header>

    <main className="max-w-3xl mx-auto px-4 py-10">{children}</main>

    <Footer/>
    </body>
    </html>
);
}
