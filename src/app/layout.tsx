// app/layout.js
import './globals.css';
import Link from 'next/link';

// Layout is a Server Component by default in Next 13
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
    <body>
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
