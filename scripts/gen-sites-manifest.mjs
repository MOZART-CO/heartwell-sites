#!/usr/bin/env node
/**
 * Regenerate mzrt.sites.json from the presets, so the manifest cannot drift
 * from the sites that actually exist. Run it after adding or editing a preset,
 * before registering the site in the Mozart app.
 *
 *   node scripts/gen-sites-manifest.mjs
 *
 * See MULTI-SITE-SETUP.md in mozart-co/mzrt-site-build for the schema.
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRESETS = join(ROOT, 'src', 'config', 'presets');
const REPO = 'mozart-co/heartwell-sites';

/** Pull a single-quoted string field out of a preset source file. */
const str = (src, key) => {
  const m = src.match(new RegExp(`^\\s*${key}:\\s*'([^']*)'`, 'm'));
  return m ? m[1] : '';
};

const sites = readdirSync(PRESETS)
  .filter((f) => f.endsWith('.ts'))
  .map((f) => {
    const src = readFileSync(join(PRESETS, f), 'utf8');
    const slug = str(src, 'slug') || f.replace(/\.ts$/, '');
    const community = str(src, 'community');

    // A community preset takes its display name from the catalog, so
    // read it from there rather than from the preset source.
    let name = str(src, 'name');
    if ((!name || name === 'TODO' || name.startsWith('c.')) && community) {
      const cat = readFileSync(join(ROOT, 'src', 'data', 'communities.ts'), 'utf8');
      const block = cat.split(`id: '${community}'`)[1] ?? '';
      name = (block.match(/name:\s*'([^']*)'/) ?? [])[1] ?? slug;
    }

    const domain = str(src, 'domain') || `${slug}.mzrt.work`;
    const url = str(src, 'url') || `https://${domain}`;

    // A site has content when its preset resolves to real communities and its
    // asset tree exists — that is what a build needs.
    const hasContent =
      name !== 'TODO' &&
      !src.includes("name: 'TODO'") &&
      existsSync(join(ROOT, 'public', slug));

    return {
      slug,
      name,
      domain,
      url,
      hasContent,
      install: 'npm ci',
      build: `SITE=${slug} npm run build`,
      outputDir: 'dist',
    };
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const manifest = { repo: REPO, sites };
writeFileSync(join(ROOT, 'mzrt.sites.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`mzrt.sites.json — ${sites.length} site(s): ${sites.map((s) => s.slug).join(', ')}`);
