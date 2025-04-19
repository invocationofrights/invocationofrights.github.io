// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-10 text-xs text-neutral-500">
      <div className="max-w-3xl mx-auto px-4 text-center">
        © {new Date().getFullYear()} Invocation of Rights. Not legal advice.
      </div>
    </footer>
  );
}
