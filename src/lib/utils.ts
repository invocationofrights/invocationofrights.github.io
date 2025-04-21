// src/lib/utils.ts
// ─────────────────
// Simple “classnames” helper.
//   cn('a', false && 'b', 'c') → 'a c'
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
