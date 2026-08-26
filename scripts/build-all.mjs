#!/usr/bin/env node
/**
 * Build every site in the repo in turn, into dist-<slug>/. Handy as a smoke
 * test before pushing — CI builds one site per workflow, not all of them.
 *
 *   node scripts/build-all.mjs
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, rmSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const slugs = readdirSync(join(ROOT, 'src', 'config', 'presets'))
  .filter((f) => f.endsWith('.ts'))
  .map((f) => f.replace(/\.ts$/, ''))
  .sort();

let failed = 0;
for (const slug of slugs) {
  process.stdout.write(`\n── building ${slug} ─────────────────────────────\n`);
  try {
    execFileSync('npx', ['astro', 'build'], {
      cwd: ROOT,
      stdio: 'inherit',
      env: { ...process.env, SITE: slug },
    });
    const out = join(ROOT, `dist-${slug}`);
    rmSync(out, { recursive: true, force: true });
    renameSync(join(ROOT, 'dist'), out);
    console.log(`✓ ${slug} -> dist-${slug}/`);
  } catch {
    console.error(`✗ ${slug} failed`);
    failed++;
  }
}

console.log(`\n${slugs.length - failed}/${slugs.length} site(s) built`);
process.exit(failed ? 1 : 0);
