import type { Community } from '../config/types';

/**
 * The Heartwell community catalog — the single source of truth for every
 * building. The corporate hub renders all of them (map, cards, footer, the
 * inquiry form's community select, `/locations/<id>` pages); a standalone
 * community site renders exactly one, at `/`.
 *
 * Care lines, bed counts, fax numbers and the activities under `life` were
 * reconciled against each building's existing public listing. The prose is
 * Heartwell's own.
 *
 * Coordinates came with the original build; verify against surveyed addresses
 * before a community goes live on its own domain.
 */
export const COMMUNITIES: Community[] = [
  {
    id: 'allen-view',
    name: 'Allen View Healthcare Center',
    shortName: 'Allen View',
    descriptor: 'Healthcare Center',
    city: 'Springfield',
    region: 'Ohio',
    address: '2615 Derr Rd, Springfield, OH 45503',
    street: '2615 Derr Rd',
    postal: '45503',
    phone: '(937) 390-0005',
    fax: '(877) 366-5844',
    beds: 124,
    lat: 39.9573898,
    lng: -83.7869161,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care', 'In-House Dialysis'],
    blurb:
      'Round-the-clock skilled nursing and subacute rehabilitation on the north side of Springfield, with the clinical depth to manage complex needs close to home.',
    intro:
      'Allen View is a 124-bed skilled nursing and rehabilitation community on Derr Road, north of downtown Springfield. It is the building we send the complicated cases to. Dialysis runs on site, so residents who need it three days a week are not spending those days in a transport van. Licensed nursing covers every shift, and the therapy gym runs seven days.',
    neighborhood:
      'North Springfield, off Derr Road and minutes from Springfield Regional Medical Center.',
    services: [
      {
        name: 'Skilled Nursing',
        body: 'Licensed nursing on every shift, with the clinical depth to take residents other buildings turn down.',
        photo: '/img/hero.jpg',
      },
      {
        name: 'Subacute Rehabilitation',
        body: 'Physical, occupational and speech therapy seven days a week, aimed at one thing — getting people home, stronger.',
        photo: '/img/gym.jpg',
      },
      {
        name: 'In-House Dialysis',
        body: 'Dialysis happens here, in the building. No transport, no lost mornings, no missed therapy sessions.',
        photo: '/img/office.jpg',
      },
      {
        name: 'Long-Term Care',
        body: 'A real home for residents who need daily support, with dignity built into the ordinary parts of the day.',
        photo: '/img/hands.jpg',
      },
      {
        name: 'Respite Care',
        body: 'Short stays that give a family caregiver a genuine break, with the same nursing everyone else here gets.',
        photo: '/img/visit.jpg',
      },
    ],
    highlights: [
      {
        label: 'Dialysis under this roof',
        body: 'An on-site dialysis program means fewer transports, steadier days, and therapy that actually happens on schedule.',
      },
      {
        label: 'Built for complex cases',
        body: '124 beds and the staffing to match. When a discharge planner has a hard one, this is the phone number.',
      },
      {
        label: 'Springfield, not somewhere else',
        body: 'Families visit on a lunch break. That proximity is part of the clinical plan, not a nice extra.',
      },
    ],
    life: [
      'Bingo, most weeks, competitively',
      'Monthly birthday parties for everyone with a birthday that month',
      'Family Nights a few times a year',
      'Holiday events, including Trunk or Treat in the fall',
    ],
    photos: { hero: '/img/lobby.jpg', feature: '/img/welcome.jpg', about: '/img/reception.jpg' },
    siteUrl: 'https://allen-view.mzrt.work',
  },
  {
    id: 'southbrook',
    name: 'Southbrook Healthcare Center',
    shortName: 'Southbrook',
    descriptor: 'Healthcare Center',
    city: 'Springfield',
    region: 'Ohio',
    address: '2299 S Yellow Springs St, Springfield, OH 45506',
    street: '2299 S Yellow Springs St',
    postal: '45506',
    phone: '(937) 322-3436',
    fax: '(937) 322-2470',
    beds: 98,
    lat: 39.8981824,
    lng: -83.8381135,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care', 'Memory Care'],
    blurb:
      'A true home on Springfield’s south side — daily support with dignity built into every detail, alongside a therapy program aimed squarely at getting people home.',
    intro:
      'Southbrook is a 98-bed community on South Yellow Springs Street, and the smallest of the Springfield buildings by design. Residents get individual medical attention from full-time staff and are pushed to keep as much independence as they can hold onto. It runs a dedicated Alzheimer’s and dementia program alongside its therapy and medically complex care.',
    neighborhood: 'South Springfield, on Yellow Springs Street below the city centre.',
    services: [
      {
        name: 'Physical, Occupational & Speech Therapy',
        body: 'All three disciplines in one building, coordinated by one team, working the same discharge goal.',
        photo: '/img/gym.jpg',
      },
      {
        name: 'Alzheimer’s & Dementia Care',
        body: 'A dedicated program with routine, calm and staff who know what a hard afternoon looks like before it arrives.',
        photo: '/img/icons.jpg',
      },
      {
        name: 'Medically Complex Care',
        body: 'Wound care, post-surgical recovery and the multi-diagnosis residents who need more than a standard plan.',
        photo: '/img/office.jpg',
      },
      {
        name: 'Hospice & Palliative Care',
        body: 'Comfort-focused care, run in partnership with the family, so nobody has to move at the end.',
        photo: '/img/hands.jpg',
      },
      {
        name: 'Respite Care',
        body: 'A planned short stay so a family caregiver can have a surgery, a holiday, or a week of sleep.',
        photo: '/img/visit.jpg',
      },
    ],
    highlights: [
      {
        label: 'A dedicated memory program',
        body: 'Alzheimer’s and dementia care is a named program here with its own routine, not a wing with a different door code.',
      },
      {
        label: 'Small enough to be known',
        body: '98 beds. Staff know which resident takes their coffee before breakfast and which one waits until ten.',
      },
      {
        label: 'Independence, on purpose',
        body: 'Every care plan is written to keep as much of a person’s own routine intact as their health allows.',
      },
    ],
    life: [
      'Therapy that starts the day after admission, not the week after',
      'Small-group activities sized to the memory program',
      'Family involved in the care plan from the first meeting',
      'Sunday visitors welcome without an appointment',
    ],
    photos: { hero: '/img/welcome.jpg', feature: '/img/embrace.jpg', about: '/img/lobby.jpg' },
    siteUrl: 'https://southbrook.mzrt.work',
  },
  {
    id: 'columbus',
    name: 'Columbus Healthcare Center',
    shortName: 'Columbus Healthcare Center',
    descriptor: 'Healthcare Center',
    city: 'Columbus',
    region: 'Ohio',
    address: '4301 Clime Rd N, Columbus, OH 43228',
    street: '4301 Clime Rd N',
    postal: '43228',
    phone: '(614) 276-4400',
    fax: '(614) 276-5509',
    beds: 100,
    lat: 39.9346277,
    lng: -83.1130561,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care'],
    blurb:
      'Skilled nursing, rehabilitation and long-term care on Columbus’s west side, staffed by people who answer the phone and know your mother’s name.',
    intro:
      'Columbus Healthcare Center is a 100-bed community on Clime Road, on the west side of the city. Short-term recovery is the centre of gravity here — most people arrive from a hospital bed with a date they want to be home by, and the team builds backward from that date. Residents and families sit in on the planning, every time.',
    neighborhood: 'West Columbus, off Clime Road N, inside I-270 and close to the Hilltop.',
    services: [
      {
        name: 'Short-Term Recovery',
        body: 'You arrive from a hospital with a goal and a date. We build the plan backward from the date.',
        photo: '/img/hero.jpg',
      },
      {
        name: 'Physical Rehabilitation',
        body: 'A therapy gym and a team that measures progress in stairs climbed and doors opened, not in visits billed.',
        photo: '/img/gym.jpg',
      },
      {
        name: 'Occupational & Speech Therapy',
        body: 'Dressing, cooking, swallowing, speaking. The unglamorous skills that decide whether home is possible.',
        photo: '/img/icons.jpg',
      },
      {
        name: 'Medically Complex Care',
        body: 'Multiple diagnoses, complicated medication lists, and the nursing judgement to hold it all together.',
        photo: '/img/office.jpg',
      },
      {
        name: 'Long-Term Care',
        body: 'For residents who are staying, a home with routine, company and someone who notices a bad day.',
        photo: '/img/hands.jpg',
      },
    ],
    highlights: [
      {
        label: 'Families in the room',
        body: 'Care planning happens with the resident and the family present. No decisions get made about someone in their absence.',
      },
      {
        label: 'Aimed at discharge',
        body: 'Short-term recovery is what this building is built around. The plan has a date on it from day one.',
      },
      {
        label: 'A real social calendar',
        body: 'Live music, bingo, happy hour, and a prom every year with a Prom King and Queen crowned properly.',
      },
    ],
    life: [
      'Live musical performances in the common room',
      'Bingo, held often and taken seriously',
      'Happy hour on the calendar, not as a joke',
      'An annual prom night, with a Prom King and Prom Queen crowned',
    ],
    photos: { hero: '/img/reception.jpg', feature: '/img/lobby.jpg', about: '/img/welcome.jpg' },
    siteUrl: 'https://columbus.mzrt.work',
  },
  {
    id: 'riverside',
    name: 'Riverside Nursing and Rehabilitation Center',
    shortName: 'Riverside',
    descriptor: 'Nursing and Rehabilitation Center',
    city: 'Dayton',
    region: 'Ohio',
    address: '1390 King Tree Dr, Dayton, OH 45405',
    street: '1390 King Tree Dr',
    postal: '45405',
    phone: '(937) 278-0723',
    fax: '(937) 276-8675',
    lat: 39.8066561,
    lng: -84.2094478,
    tags: ['Skilled Nursing', 'Rehabilitation', 'Long-Term Care'],
    blurb:
      'Physical, occupational and speech therapy in north Dayton, focused on one goal — getting people home, stronger — with licensed nursing around the clock.',
    intro:
      'Riverside sits on King Tree Drive in north Dayton, five minutes from downtown. Rehabilitation is the point of the building: the gym is the busiest room in it, and the therapy team works the same discharge goal the nursing team does. Being this close to the city means residents stay part of it — outings, visitors, and a bistro that people actually sit in.',
    neighborhood: 'North Dayton, on King Tree Drive, about five minutes from downtown.',
    services: [
      {
        name: 'Short-Term Recovery',
        body: 'The stretch between the hospital and the front door of your own house. We make it as short as it should be.',
        photo: '/img/hero.jpg',
      },
      {
        name: 'Physical Therapy',
        body: 'Strength, balance and walking, rebuilt in a gym that is busy from morning through the afternoon.',
        photo: '/img/gym.jpg',
      },
      {
        name: 'Occupational & Speech Therapy',
        body: 'Relearning the ordinary things — a shirt, a stove, a sentence — until home stops being a risk.',
        photo: '/img/icons.jpg',
      },
      {
        name: 'Skilled Nursing',
        body: 'Licensed nursing around the clock, coordinated with each resident’s own physician.',
        photo: '/img/reception.jpg',
      },
      {
        name: 'Long-Term Care',
        body: 'Daily support for residents who are staying, in a building that stays connected to the city around it.',
        photo: '/img/hands.jpg',
      },
    ],
    highlights: [
      {
        label: 'Five minutes from downtown',
        body: 'Close enough that visiting is not a project, and close enough that residents keep going out into the city.',
      },
      {
        label: 'The gym is the point',
        body: 'Rehabilitation is not a department here. It is what the building is organised around.',
      },
      {
        label: 'The Orange Spot Bistro',
        body: 'A dining room people choose to sit in, which turns out to matter as much as any care plan.',
      },
    ],
    life: [
      'The Orange Spot Bistro, open for residents and their visitors',
      'A rehabilitation gym that runs all day',
      'Community outings into Dayton',
      'Bingo, crafts, and long strolls around the campus',
    ],
    photos: { hero: '/img/visit.jpg', feature: '/img/lobby.jpg', about: '/img/office.jpg' },
    siteUrl: 'https://riverside.mzrt.work',
  },
  {
    id: 'wood-glen',
    name: 'Wood Glen Alzheimer’s Community',
    shortName: 'Wood Glen',
    descriptor: 'Alzheimer’s Community',
    city: 'Dayton',
    region: 'Ohio',
    address: '3800 Summit Glen Dr, Dayton, OH 45449',
    street: '3800 Summit Glen Dr',
    postal: '45449',
    phone: '(937) 436-2273',
    fax: '(937) 433-2017',
    beds: 148,
    lat: 39.6428943,
    lng: -84.2302985,
    tags: ['Memory Care', 'Skilled Nursing', 'Long-Term Care', 'Behavioral Health'],
    blurb:
      'Heartwell’s memory care anchor — specialized, secure support for residents living with Alzheimer’s and dementia, in a setting built around routine and calm.',
    intro:
      'Wood Glen is the memory care anchor of the Heartwell group and the only all-dementia nursing community in the Miami Valley. Every one of its 148 beds is for someone living with Alzheimer’s or another dementia, which means the routine, the staffing and the building itself are built for it rather than adapted to it. The work here is reconnecting a person to their own history — what they did, who they loved, what they were good at — and then caring for them from there.',
    neighborhood:
      'Southern Dayton near the Dayton Mall, minutes from I-75 and serving the whole Miami Valley.',
    services: [
      {
        name: 'Alzheimer’s & Dementia Care',
        body: 'The whole building, not a wing. Routine, security and staff trained for this and nothing else.',
        photo: '/img/lobby.jpg',
      },
      {
        name: 'Memory Care Planning',
        body: 'A plan built from a life story — the job, the family, the habits — so care fits the person in front of us.',
        photo: '/img/icons.jpg',
      },
      {
        name: 'Behavioral Health',
        body: 'Psychiatric support on site, because a hard week is a clinical event and should be treated as one.',
        photo: '/img/office.jpg',
      },
      {
        name: 'Physical, Occupational & Speech Therapy',
        body: 'Therapy delivered the way dementia requires it — short, familiar, repeated, and never rushed.',
        photo: '/img/gym.jpg',
      },
      {
        name: 'Hospice Care',
        body: 'Comfort care at the end, in the room a resident already knows, with the faces they already know.',
        photo: '/img/reception.jpg',
      },
    ],
    highlights: [
      {
        label: 'The only one of its kind here',
        body: 'The Miami Valley’s only all-dementia nursing community. Every resident, every shift, every room.',
      },
      {
        label: 'Wound, orthopedic and psychiatric care',
        body: 'Dementia does not arrive alone. The clinical services here are built to handle what comes with it.',
      },
      {
        label: 'The past, kept present',
        body: 'Care plans start from a life story. Families tell us who someone was, and we care for that person.',
      },
    ],
    life: [
      'Exercise classes pitched at every level of ability',
      'Gardening, for the residents who have always gardened',
      'Therapy dog visits on a regular schedule',
      'Group outings, planned around what the day actually allows',
    ],
    photos: { hero: '/img/embrace.jpg', feature: '/img/hands.jpg', about: '/img/visit.jpg' },
    siteUrl: 'https://wood-glen.mzrt.work',
  },
];

export const BY_ID: Record<string, Community> = Object.fromEntries(
  COMMUNITIES.map((c) => [c.id, c]),
);
