/**
 * Everything that varies between the sites in this repo is data — either a
 * `SiteConfig` preset (identity, contacts, forms slug, which communities the
 * site presents) or the shared community catalog in `src/data/communities.ts`.
 *
 * This interface is per-repo, not shared across the Mozart site repos.
 */

/** A care line as it is presented on a community's own page. */
export interface Service {
  name: string;
  /** One or two plain sentences. Heartwell voice: say the thing, then stop. */
  body: string;
  /** Root-relative photo for the card, resolved inside the active site's tree. */
  photo: string;
}

/** Something this building does that its sister buildings do not. */
export interface Highlight {
  label: string;
  body: string;
}

/** The two photographs a community's page leads with. */
export interface CommunityPhotos {
  /** Wide plate behind the hero. */
  hero: string;
  /** The inset portrait beside the hero copy. */
  feature: string;
  /** The plate beside the "about" copy. */
  about: string;
}

/** A Heartwell community. One entry per building, shared by every site. */
export interface Community {
  /** kebab-case id — used for `/locations/<id>` and as the slug of its own site. */
  id: string;
  /** Full name as it appears in copy. */
  name: string;
  /** Short name for tight spaces (cards, footers, selects). */
  shortName: string;
  /**
   * The line under the name in the building's logo lockup — "Healthcare Center",
   * "Nursing and Rehabilitation Center", "Alzheimer's Community". Kept in the
   * catalog so copy and the artwork cannot drift apart.
   */
  descriptor: string;
  city: string;
  region: string;
  /** Single-line address as displayed. */
  address: string;
  street: string;
  postal: string;
  /** Display phone, exactly as it appears in markup. */
  phone: string;
  /** Display fax, where the building publishes one. */
  fax?: string;
  /** Licensed bed count, where it is known. */
  beds?: number;
  lat: number;
  lng: number;
  /** Care lines offered here — drives the card tags and the community page. */
  tags: string[];
  /** One-paragraph description used in cards and as the meta description. */
  blurb: string;
  /** The longer "about this building" copy on its own page. */
  intro: string;
  /** How to find it, and what is nearby. */
  neighborhood?: string;
  /** The care lines this building actually runs. */
  services: Service[];
  /** What sets this building apart — rendered as the about-section pillars. */
  highlights: Highlight[];
  /** Day-to-day life here: activities, amenities, the things residents show up for. */
  life: string[];
  photos: CommunityPhotos;
  /** This community's own site, once it has one. Used for cross-site links. */
  siteUrl?: string;
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
  /**
   * The corporate hub's production URL. A community site links back to it and
   * falls back to `<hubUrl>/locations/<id>` for any sister without its own site.
   */
  hubUrl?: string;

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
