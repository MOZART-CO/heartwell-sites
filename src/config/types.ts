/**
 * Everything that varies between the sites in this repo is data — either a
 * `SiteConfig` preset (identity, contacts, forms slug, which communities the
 * site presents) or the shared community catalog in `src/data/communities.ts`.
 *
 * This interface is per-repo, not shared across the Mozart site repos.
 */

/** A Heartwell community. One entry per building, shared by every site. */
export interface Community {
  /** kebab-case id — used for `/locations/<id>` and as the slug of a future standalone site. */
  id: string;
  /** Full name as it appears in copy. */
  name: string;
  /** Short name for tight spaces (cards, footers, selects). */
  shortName: string;
  city: string;
  region: string;
  /** Single-line address as displayed. */
  address: string;
  street: string;
  postal: string;
  /** Display phone, exactly as it appears in markup. */
  phone: string;
  lat: number;
  lng: number;
  /** Care lines offered here — drives the card tags and the community page. */
  tags: string[];
  /** One-paragraph description used on the community page. */
  blurb?: string;
}

export interface SiteConfig {
  /**
   * kebab-case — the `<slug>.mzrt.work` subdomain and the
   * `forms.mzrt.work/submit/<slug>` forms route. Must match the preset filename.
   */
  slug: string;

  /**
   * `hub` builds the corporate site (all communities, the full section stack).
   * `community` builds a standalone site for one community, rooted at `/`.
   */
  kind: 'hub' | 'community';

  /** For `kind: 'community'`, the `Community.id` this site is about. */
  community?: string;

  /** Brand / display name. */
  name: string;
  /** Full legal entity name, for the footer and structured data. */
  legalName: string;
  /** Short tagline — "Warm. Capable. Present." */
  tagline: string;
  /** `<title>` and meta description for the home route. */
  title: string;
  description: string;

  /** Production URL, no trailing slash. */
  url: string;
  /** Custom domain host, if one is attached; otherwise `<slug>.mzrt.work`. */
  domain: string;
  /** Public-facing corporate site, linked from the footer. */
  siteHost: string;

  email: string;
  careersEmail: string;
  /** Display phone for the site as a whole, if it has one of its own. */
  phone?: string;
  /** Headquarters, as displayed. */
  headquarters: string;

  socials: { facebook?: string; instagram?: string; linkedin?: string };

  /** The Mozart forms build-out slug — `forms.mzrt.work/submit/<formsSlug>`. */
  formsSlug: string;

  /**
   * Which communities this site presents.
   * `'all'` = the whole catalog, in catalog order.
   */
  communities: 'all' | string[];

  /** Footer copyright line year. */
  copyrightYear: number;

  /**
   * Optional external asset base (no trailing slash). Empty keeps images
   * same-origin at `/img/…`, which is what ships in this site's own dist/.
   */
  assetsBase?: string;
}
