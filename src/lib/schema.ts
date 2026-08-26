import type { Community, SiteConfig } from '../config/types';

function postalAddress(c: Community) {
  return {
    '@type': 'PostalAddress',
    streetAddress: c.street,
    addressLocality: c.city,
    addressRegion: 'OH',
    postalCode: c.postal,
    addressCountry: 'US',
  };
}

/**
 * One building. `logo` points at the community's own lockup, which ships in
 * that site's asset tree; on the hub it resolves against the hub's tree, so it
 * is only emitted for the site the community actually owns.
 */
export function nursingHome(
  site: SiteConfig,
  c: Community,
  url: string,
  { withLogo = false }: { withLogo?: boolean } = {},
) {
  return {
    '@type': 'NursingHome',
    name: c.name,
    url,
    ...(withLogo ? { logo: `${site.url}/img/logo.svg` } : {}),
    telephone: c.phone,
    ...(c.fax ? { faxNumber: c.fax } : {}),
    address: postalAddress(c),
    geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng },
    description: c.blurb,
    ...(c.beds ? { numberOfRooms: c.beds } : {}),
    parentOrganization: {
      '@type': 'Organization',
      name: site.legalName,
      url: site.hubUrl ?? `https://${site.siteHost}`,
    },
    availableService: c.services.map((s) => ({
      '@type': 'MedicalTherapy',
      name: s.name,
      description: s.body,
    })),
  };
}

export function organization(
  site: SiteConfig,
  communities: Community[],
  baseUrl: string,
  hrefFor: (c: Community) => string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    slogan: site.tagline,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.headquarters.split(',')[0]?.trim(),
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
    subOrganization: communities.map((c) =>
      nursingHome(site, c, `${baseUrl}${hrefFor(c)}`),
    ),
  };
}

export function communityGraph(site: SiteConfig, c: Community, url: string) {
  return {
    '@context': 'https://schema.org',
    ...nursingHome(site, c, url, { withLogo: site.kind === 'community' }),
  };
}
