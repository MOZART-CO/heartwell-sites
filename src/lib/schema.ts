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

export function nursingHome(site: SiteConfig, c: Community, url: string) {
  return {
    '@type': 'NursingHome',
    name: c.name,
    url,
    telephone: c.phone,
    address: postalAddress(c),
    geo: { '@type': 'GeoCoordinates', latitude: c.lat, longitude: c.lng },
    parentOrganization: { '@type': 'Organization', name: site.legalName },
    availableService: c.tags.map((t) => ({ '@type': 'MedicalTherapy', name: t })),
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
  return { '@context': 'https://schema.org', ...nursingHome(site, c, url) };
}
