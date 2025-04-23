#!/usr/bin/env tsx
import fg from 'fast-glob';
import { renameFontFamily } from '@/lib/renameFamilyCore';

const [, , fam, ...patterns] = process.argv;
if (!fam || patterns.length === 0) {
  console.error('\nUsage:\n  rename-font-family <Family> <glob …>\n');
  process.exit(1);
}

const files = await fg(patterns, { onlyFiles: true, unique: true });
if (files.length === 0) {
  console.error('No files matched\n'); process.exit(1);
}

renameFontFamily(fam, files).forEach((p) =>
  console.log(`✔ family set to “${fam}” — ${p}`),
);
