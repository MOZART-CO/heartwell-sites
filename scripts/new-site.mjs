#!/usr/bin/env node
/**
 * Scaffold a new per-site preset.
 *
 *   node scripts/new-site.mjs <slug>                    # a new site from scratch
 *   node scripts/new-site.mjs <slug> --community=<id>   # promote a community to its own site
 *
 * Because src/config/site.ts auto-discovers presets with import.meta.glob,
 * writing the preset file is the only wiring a new site needs.
 */
import { mkdirSync, existsSync, readFileSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRESETS = join(ROOT, 'src', 'config', 'presets');
const BASE_SITE = 'heartwell';

// Subdomains the mzrt.work router and its neighbours already own.
const RESERVED = new Set([
  'www', 'api', 'admin', 'app', 'forms', 'mail', 'assets', 'cdn', 'static',
  'dev', 'staging', 'test', 'preview', 'mzrt', 'root',
]);

const [slugArg, ...rest] = process.argv.slice(2);
const flags = Object.fromEntries(
  rest
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v = 'true'] = a.replace(/^--/, '').split('=');
      return [k, v];
    }),
);

if (!slugArg) {
  console.error('Usage: node scripts/new-site.mjs <slug> [--community=<id>]');
  process.exit(1);
}

const slug = slugArg.trim();
if (!/^[a-z][a-z0-9-]{0,57}$/.test(slug) || slug.endsWith('-') || slug.includes('--')) {
  console.error(
    `"${slug}" is not a valid slug. Use kebab-case: lowercase letters, digits and single hyphens, starting with a letter.`,
  );
  process.exit(1);
}
if (RESERVED.has(slug)) {
  console.error(`"${slug}" is a reserved subdomain. Pick another slug.`);
  process.exit(1);
}

const target = join(PRESETS, `${slug}.ts`);
if (existsSync(target)) {
  console.error(`src/config/presets/${slug}.ts already exists — refusing to overwrite it.`);
  process.exit(1);
}

/** Read the community catalog without needing a TS toolchain. */
function readCommunities() {
  const src = readFileSync(join(ROOT, 'src', 'data', 'communities.ts'), 'utf8');
  return [...src.matchAll(/^\s{4}id:\s*'([^']+)',\s*$/gm)].map((m) => m[1]);
}

const ids = readCommunities();
const community = flags.community;

if (community && !ids.includes(community)) {
  console.error(
    `Unknown community "${community}". Known communities: ${ids.join(', ')}`,
  );
  process.exit(1);
}

const body = community
  ? `import type { SiteConfig } from '../types';
import { BY_ID } from '../../data/communities';

/**
 * ${community} — a standalone site for one community. Its content comes from the
 * shared catalog entry; only the fields below are site-specific.
 *
 * TODO before launch: confirm the domain, the forms slug, and the community's
 * own email/phone if it has one distinct from the corporate line.
 */
const c = BY_ID['${community}'];

export const preset: SiteConfig = {
  slug: '${slug}',
  kind: 'community',
  community: '${community}',

  name: c.name,
  legalName: 'Heartwell Healthcare',
  tagline: 'Warm. Capable. Present.',
  title: \`\${c.name} | \${c.city}, \${c.region} — Skilled Nursing and Rehabilitation\`,
  description: c.blurb ?? '',

  url: 'https://${slug}.mzrt.work',
  domain: '${slug}.mzrt.work',
  siteHost: 'heartwellhc.com',

  email: 'info@heartwellhc.com',        // TODO: the community's own inbox, if it has one
  careersEmail: 'careers@heartwellhc.com',
  phone: c.phone,
  headquarters: \`\${c.city}, \${c.region}\`,

  socials: {},

  formsSlug: '${slug}',                  // TODO: run the mozart-form-setup skill for this slug

  communities: ['${community}'],
  copyrightYear: ${new Date().getFullYear()},
  assetsBase: '',
};
`
  : `import type { SiteConfig } from '../types';

/** TODO: fill this in from the site's onboarding data. */
export const preset: SiteConfig = {
  slug: '${slug}',
  kind: 'hub',

  name: 'TODO',
  legalName: 'TODO',
  tagline: 'TODO',
  title: 'TODO',
  description: 'TODO',

  url: 'https://${slug}.mzrt.work',
  domain: '${slug}.mzrt.work',
  siteHost: 'TODO',

  email: 'TODO',
  careersEmail: 'TODO',
  headquarters: 'TODO',

  socials: {},

  formsSlug: '${slug}',                  // TODO: run the mozart-form-setup skill for this slug

  communities: 'all',
  copyrightYear: ${new Date().getFullYear()},
  assetsBase: '',
};
`;

mkdirSync(PRESETS, { recursive: true });
writeFileSync(target, body);
console.log(`wrote src/config/presets/${slug}.ts`);

// Every site needs its own public/ tree, because astro.config.mjs points
// publicDir at public/<slug>. Seed it from the base site.
const pub = join(ROOT, 'public', slug);
if (!existsSync(pub)) {
  cpSync(join(ROOT, 'public', BASE_SITE), pub, { recursive: true });
  console.log(`seeded public/${slug}/ from public/${BASE_SITE}/`);
} else {
  console.log(`public/${slug}/ already exists — left alone`);
}

console.log(`
Next:
  1. Fill in the TODOs in src/config/presets/${slug}.ts
  2. Swap in this site's own photography under public/${slug}/img/
  3. SITE=${slug} npm run build      # verify
  4. node scripts/gen-sites-manifest.mjs
  5. Wire its form: the mozart-form-setup skill, slug "${slug}"`);
