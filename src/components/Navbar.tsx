// src/components/navbar.tsx
import Link from 'next/link';

const links = [
  ['Home', '/'],
  ['Why', '/why'],
  ['Legal', '/legal'],
  ['How-to', '/how-to'],
  ['Whitepaper', '/whitepaper'],
  ['For Officers', '/for-officers'],
  ['Resources', '/resources'],
  ['Get Involved', '/get-involved'],
  ['About', '/about'],
] as const;

export default function Navbar() {
  return (
    <nav className="flex flex-wrap gap-4 text-sm font-medium">
      {links.map(([label, href]) => (
        <Link key={href} href={href} className="hover:text-blue-600">
          {label}
        </Link>
      ))}
    </nav>
  );
}
