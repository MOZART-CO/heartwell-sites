import type { Community } from '../config/types';

/**
 * The Heartwell community catalog — the single source of truth for every
 * building. The corporate hub renders all of them (map, cards, footer, the
 * inquiry form's community select, `/locations/<id>` pages); a standalone
 * community site renders exactly one.
 *
 * Coordinates came with the original build; verify against surveyed addresses
 * before a community goes live on its own domain.
 */
export const COMMUNITIES: Community[] = [
  {
    id: 'allen-view',
    name: 'Allen View Healthcare Center',
    shortName: 'Allen View',
    city: 'Springfield',
    region: 'Ohio',
    address: '2615 Derr Rd, Springfield, OH 45503',
    street: '2615 Derr Rd',
    postal: '45503',
    phone: '(937) 390-0005',
    lat: 39.9573898,
    lng: -83.7869161,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care'],
    blurb:
      'Round-the-clock skilled nursing and subacute rehabilitation on the north side of Springfield, with the clinical depth to manage complex needs close to home.',
  },
  {
    id: 'southbrook',
    name: 'Southbrook Healthcare Center',
    shortName: 'Southbrook',
    city: 'Springfield',
    region: 'Ohio',
    address: '2299 S Yellow Springs St, Springfield, OH 45506',
    street: '2299 S Yellow Springs St',
    postal: '45506',
    phone: '(937) 322-3436',
    lat: 39.8981824,
    lng: -83.8381135,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care'],
    blurb:
      'A true home on Springfield’s south side — daily support with dignity built into every detail, alongside a therapy program aimed squarely at getting people home.',
  },
  {
    id: 'columbus',
    name: 'Columbus Healthcare Center',
    shortName: 'Columbus Healthcare Center',
    city: 'Columbus',
    region: 'Ohio',
    address: '4301 Clime Rd N, Columbus, OH 43228',
    street: '4301 Clime Rd N',
    postal: '43228',
    phone: '(614) 276-4400',
    lat: 39.9346277,
    lng: -83.1130561,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care'],
    blurb:
      'Skilled nursing, rehabilitation and long-term care on Columbus’s west side, staffed by people who answer the phone and know your mother’s name.',
  },
  {
    id: 'riverside',
    name: 'Riverside Nursing and Rehabilitation Center',
    shortName: 'Riverside',
    city: 'Dayton',
    region: 'Ohio',
    address: '1390 King Tree Dr, Dayton, OH 45405',
    street: '1390 King Tree Dr',
    postal: '45405',
    phone: '(937) 278-0723',
    lat: 39.8066561,
    lng: -84.2094478,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care'],
    blurb:
      'Physical, occupational and speech therapy in north Dayton, focused on one goal — getting people home, stronger — with licensed nursing around the clock.',
  },
  {
    id: 'wood-glen',
    name: 'Wood Glen Alzheimer’s Community',
    shortName: 'Wood Glen',
    city: 'Dayton',
    region: 'Ohio',
    address: '3800 Summit Glen Dr, Dayton, OH 45449',
    street: '3800 Summit Glen Dr',
    postal: '45449',
    phone: '(937) 436-2273',
    lat: 39.6428943,
    lng: -84.2302985,
    tags: ['Memory Care', 'Long-Term Care'],
    blurb:
      'Heartwell’s memory care anchor — specialized, secure support for residents living with Alzheimer’s and dementia, in a setting built around routine and calm.',
  },
];

export const BY_ID: Record<string, Community> = Object.fromEntries(
  COMMUNITIES.map((c) => [c.id, c]),
);
