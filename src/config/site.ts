import type { Community, SiteConfig } from './types';
import { BY_ID, COMMUNITIES } from '../data/communities';

/**
 * Auto-discovers presets and picks the active one from the SITE env var.
 * Dropping in `presets/<slug>.ts` is the only wiring a new site needs —
 * nothing in src/ references sites by name.
 */
const presetModules = import.meta.glob<{ preset: SiteConfig }>('./presets/*.ts', {
  eager: true,
});

const PRESETS: Record<string, SiteConfig> = {};
for (const mod of Object.values(presetModules)) {
  if (mod.preset) PRESETS[mod.preset.slug] = mod.preset;
}

const BASE = 'heartwell';
const active = process.env.SITE || BASE;

if (!PRESETS[active]) {
  throw new Error(
    `Unknown SITE="${active}". Known sites: ${Object.keys(PRESETS).sort().join(', ')}`,
  );
}

export const slug = active;
export const site: SiteConfig = PRESETS[active];

/** Every slug this repo can build — used by scripts/build-all.mjs. */
export const allSlugs = Object.keys(PRESETS).sort();

if (site.kind === 'community') {
  if (!site.community) {
    throw new Error(`Preset "${site.slug}" is kind:"community" but has no community id.`);
  }
  if (!BY_ID[site.community]) {
    throw new Error(
      `Preset "${site.slug}" points at unknown community "${site.community}". ` +
        `Known communities: ${COMMUNITIES.map((c) => c.id).join(', ')}`,
    );
  }
}

/** The communities this site presents, in catalog order. */
export const communities: Community[] =
  site.communities === 'all'
    ? COMMUNITIES
    : site.communities.map((id) => {
        const c = BY_ID[id];
        if (!c) {
          throw new Error(
            `Preset "${site.slug}" lists unknown community "${id}". ` +
              `Known communities: ${COMMUNITIES.map((x) => x.id).join(', ')}`,
          );
        }
        return c;
      });

/** For a standalone community site, the community it is about. */
export const community: Community | null = site.community
  ? (BY_ID[site.community] as Community)
  : null;

/** True when this build is one community's own site rather than the corporate hub. */
export const isCommunitySite = site.kind === 'community';

/** Every community in the catalog, whichever site is building. */
export const allCommunities: Community[] = COMMUNITIES;

/** The corporate hub, for the "part of Heartwell" links a community site carries. */
export const hubUrl = site.hubUrl ?? `https://${site.siteHost}`;

/**
 * Where a community's page lives in *this* build.
 *
 * The hub keeps every community on its own `/locations/<id>` route. A community
 * site is its own root, and points at its sisters' sites — falling back to the
 * hub's location page for any sister that does not have one yet.
 */
export function communityHref(c: Community): string {
  if (!isCommunitySite) return `/locations/${c.id}`;
  if (site.community === c.id) return '/';
  return c.siteUrl ?? `${hubUrl}/locations/${c.id}`;
}

/** `forms.mzrt.work/submit/<slug>` — the endpoint every form on this site POSTs to. */
export const formAction = `https://forms.mzrt.work/submit/${site.formsSlug}`;
