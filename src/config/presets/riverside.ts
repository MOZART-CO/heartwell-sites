import type { SiteConfig } from '../types';
import { BY_ID } from '../../data/communities';

/**
 * Riverside Nursing and Rehabilitation Center — Dayton, Ohio.
 *
 * A standalone site for one building. Everything the page says about the
 * building comes from the shared catalog entry — services, contact details,
 * activities, photography — so this preset only carries what is site-specific:
 * where it is published, which inbox it writes to, and its forms slug.
 */
const c = BY_ID['riverside'];

export const preset: SiteConfig = {
  slug: 'riverside',
  kind: 'community',
  community: 'riverside',

  name: c.name,
  legalName: 'Heartwell Healthcare',
  tagline: 'Warm. Skilled. Present.',
  title: `${c.name} | ${c.tags.slice(0, 2).join(' and ')} in ${c.city}, ${c.region}`,
  description: c.blurb,

  url: 'https://riverside.mzrt.work',
  domain: 'riverside.mzrt.work',
  siteHost: 'heartwellhc.com',
  hubUrl: 'https://heartwell.mzrt.work',

  email: 'info@heartwellhc.com',        // TODO: the building's own inbox, if it has one
  careersEmail: 'careers@heartwellhc.com',
  phone: c.phone,
  headquarters: `${c.city}, ${c.region}`,

  socials: {},

  formsSlug: 'riverside',                    // TODO: run the mozart-form-setup skill for this slug

  communities: ['riverside'],
  copyrightYear: 2026,
  assetsBase: '',
};
