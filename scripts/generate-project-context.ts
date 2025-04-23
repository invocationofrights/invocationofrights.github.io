#!/usr/bin/env ts-node

/**
 * generate-project-context.ts
 * ------------------------------------------------------------
 * Collects high‑signal project metadata, trims large files, and
 * emits a JSON payload suitable for pasting into a fresh LLM
 * thread. Designed for Next.js repos but works for any Node
 * project. Excludes heavy dirs (node_modules, .next, dist, etc.)
 * and never reads secret values.
 * ------------------------------------------------------------
 * Usage (from repo root):
 *   npx ts-node scripts/generate-project-context.ts > project-context.json
 *
 *   # or compiled:
 *   tsc scripts/generate-project-context.ts && \
 *   node scripts/generate-project-context.js > project-context.json
 *
 * Environment variables:
 *   ROUTE_ROOTS   Space‑separated list of route root dirs to scan
 *                 (defaults: "app pages src/pages")
 *   MAX_BYTES     Max bytes per file to include (default 32 000)
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { execSync } from "node:child_process";

// ---------- constants ---------- //

const ROOT = process.cwd();
const MAX_FILE_BYTES = Number(process.env.MAX_BYTES ?? 32_000);
const TREE_DEPTH = 2;
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  "out",
  "dist",
  "coverage",
]);
const ROUTE_ROOTS = (process.env.ROUTE_ROOTS?.split(" ") ?? [
  "app",
  "pages",
  "src/pages",
]).filter(Boolean);

// ---------- helpers ---------- //

type Dict<T = unknown> = Record<string, T>;

function safeRead(file: string): string | undefined {
  if (!existsSync(file)) return undefined;
  try {
    const buf = readFileSync(file);
    if (buf.length > MAX_FILE_BYTES) {
      return (
        buf.subarray(0, MAX_FILE_BYTES).toString() +
        "\n[...truncated " +
        (buf.length - MAX_FILE_BYTES) +
        " bytes]"
      );
    }
    return buf.toString();
  } catch {
    return undefined;
  }
}

function tree(dir: string, depth = 0): string[] {
  if (!existsSync(dir) || depth > TREE_DEPTH) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => !IGNORE_DIRS.has(d.name))
    .flatMap((d) => {
      const p = join(dir, d.name);
      return d.isDirectory() ? tree(p, depth + 1) : relative(ROOT, p);
    });
}

function git(cmd: string): string | undefined {
  try {
    return execSync(`git ${cmd}`, { encoding: "utf8" }).trim();
  } catch {
    return undefined;
  }
}

function envKeys(examplePath = ".env.example"): string[] | undefined {
  const txt = safeRead(examplePath);
  if (!txt) return undefined;
  return txt
    .split(/\r?\n/)
    .map((l) => l.split("=")[0].trim())
    .filter(Boolean);
}

// ---------- collect ---------- //

const output: Dict = {
  node: execSync("node -v", { encoding: "utf8" }).trim(),
  npm: execSync("npm -v", { encoding: "utf8" }).trim(),
  packageJson: JSON.parse(safeRead("package.json") ?? "{}"),
  readme: safeRead("README.md"),
  llmNotes: safeRead("LLM Notes.md"),
  nextConfig:
    safeRead("next.config.js") ??
    safeRead("next.config.mjs") ??
    safeRead("next.config.ts"),
  tsconfig: safeRead("tsconfig.json"),
  tailwindConfig: safeRead("tailwind.config.js") ?? safeRead("tailwind.config.ts"),
  eslint:
    safeRead(".eslintrc.js") ??
    safeRead(".eslintrc.cjs") ??
    safeRead(".eslintrc.json"),
  scripts: JSON.parse(safeRead("package.json") ?? "{}").scripts,
  envKeys: envKeys(),
  routesTree: ROUTE_ROOTS.flatMap((r) => tree(r)),
  docs: safeRead("docs/README.md"),
  git: {
    branch: git("rev-parse --abbrev-ref HEAD"),
    lastCommit: git("log -1 --oneline"),
    dirty: Boolean(git("status --porcelain")),
  },
};

console.log(JSON.stringify(output, null, 2));
