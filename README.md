# heartwell-sites

Heartwell Healthcare as a **multi-site Astro build**: one repo, one shared
design system and component vocabulary, and a per-site preset selected at build
time by the `SITE` env var. It builds the corporate hub and a separate site for
each of the five communities, from one catalog of content.

Follows the Mozart build playbook in
[`mozart-co/mzrt-site-build`](https://github.com/mozart-co/mzrt-site-build) —
`ASTRO-MULTI-SITE-SCALING.md` for the multi-site model and
`MULTI-SITE-SETUP.md` for the `mzrt.sites.json` manifest.

## Sites

| slug | what it is | build |
|---|---|---|
| `heartwell` | the corporate hub — all five communities, `/locations/<id>` for each | `SITE=heartwell npm run build` |
| `allen-view` | Allen View Healthcare Center, Springfield | `SITE=allen-view npm run build` |
| `southbrook` | Southbrook Healthcare Center, Springfield | `SITE=southbrook npm run build` |
| `columbus` | Columbus Healthcare Center, Columbus | `SITE=columbus npm run build` |
| `riverside` | Riverside Nursing and Rehabilitation Center, Dayton | `SITE=riverside npm run build` |
| `wood-glen` | Wood Glen Alzheimer's Community, Dayton | `SITE=wood-glen npm run build` |

`mzrt.sites.json` is the generated manifest the Mozart app reads. Regenerate it
after touching a preset:

```bash
node scripts/gen-sites-manifest.mjs
```

## Local dev

```bash
npm ci
npm run dev                    # the base site (heartwell)
SITE=<slug> npm run dev        # one specific site
SITE=<slug> npm run build      # -> dist/  (only that site's assets)
node scripts/build-all.mjs     # smoke-test every site -> dist-<slug>/
```

## Project shape

```
astro.config.mjs             publicDir keyed by SITE, format:'file', trailingSlash:'never'
public/<slug>/               one complete media tree per site (img/, favicon.svg)
src/
  styles/site.css            the shared design system — the 2026 brand-board language
                             (tokens, signature devices, section styling) for every site
  lib/heart.ts               the one heart silhouette all signature devices draw from
  components/
    LayeredHeart.astro       the layered paper-cut heart (sage/mist/cream/dark tones)
    SectionHeart.astro       the small heart set above section headings
  data/communities.ts        THE community catalog: one entry per building — services,
                             contacts, activities, photography, everything the pages say
  assets/
    lockups/<id>.svg         the building's horizontal logo lockup (heart + name + descriptor)
    wordmarks/<id>.svg       the building's wordmark, for the display-size footer word
  config/
    types.ts                 SiteConfig + Community shapes
    site.ts                  auto-discovers presets, resolves the active site
    presets/<slug>.ts        one file per site — the only thing that changes per site
  lib/
    brand.ts                 turns the delivered brand SVGs into currentColor sprites
    schema.ts                JSON-LD builders
  layouts/Layout.astro       HTML shell + shared chrome (nav, footer, brand sprite)
  components/
    sections/*.astro         the section vocabulary — the hub's stack, plus About,
                             Life and Network for the community sites
    LocationPage.astro       one community's page — `standalone` prop switches hub/own-site
  pages/
    index.astro              hub stack, or the community page when kind:'community'
    locations/[location].astro   one page per community (hub builds only)
scripts/
  new-site.mjs               scaffold a preset (+ seed its public/ tree)
  gen-sites-manifest.mjs     regenerate mzrt.sites.json from the presets
  build-all.mjs              build every site in turn
```

Everything that varies between sites is data: the `SiteConfig` preset (identity,
contacts, forms slug, which communities the site presents) or the community
catalog. Nothing under `src/` references a site by name — `site.ts` discovers
presets with `import.meta.glob`, so **dropping in a preset file is the only
wiring a new site needs**.

## The design language

`src/styles/site.css` is the single source of the Heartwell visual language,
translated from the approved 2026 brand boards. Corporate establishes it; every
facility site compiles against the same file and components, so each community
inherits the identical DNA while keeping its own name, contacts, services,
photography and copy (all data, in the preset + catalog).

The system, in brief:

- **Palette** — soft sage grounds (`--sage-mist`, `--sage-light`), deep forest
  panels (`--forest`, `--forest-deep`), warm cream (`--cream`), and *selective*
  gold (`--gold`) reserved for CTAs, small heart accents, and one premium panel.
- **The layered heart** — `LayeredHeart.astro` stacks five copies of the shared
  silhouette (`src/lib/heart.ts`) into the boards' paper-cut ripple. It is the
  hub's hero device and the texture inside the deep-green bands.
- **Photography in the heart** — the same silhouette is registered as the
  `#heart-clip` clip-path (see `BrandSprite.astro`); `.photo-heart` inside a
  `.heart-stack` clips a plate into the heart with sage echo layers behind it.
  Community heroes and the hub's testimonial band use it.
- **Contour fields** — the brand's five-ring mark, oversized and faint
  (`.hcontour`), gives light sections the boards' subtle ripple texture.
- **Section hearts** — `SectionHeart.astro` sets the boards' small heart above
  headings (sage or gold on light grounds, cream-gold on dark).
- **Type** — Hanken Grotesk, large and light, with the boards' two-tone
  headline emphasis available as `.h-em`.
- **Motion** — content rises in on scroll (`.reveal`), the hero heart settles
  layer by layer then breathes. Everything renders complete without JavaScript
  and respects `prefers-reduced-motion`.

Tagline everywhere: **"Warm. Skilled. Present."**

## How a community site differs from the hub

The two builds share every component; the preset's `kind` decides what renders.

|  | hub (`kind: 'hub'`) | community site (`kind: 'community'`) |
|---|---|---|
| brand | gold Heartwell heart + "Heartwell" wordmark | the building's own horizontal lockup |
| footer word | "Heartwell" | the building's own wordmark |
| `/` | the corporate section stack | that building's page |
| care lines | the group's four-line continuum | that building's actual services |
| about | the company manifesto | that building's `About` and `Life` sections |
| other communities | in-site grid → `/locations/<id>` | `Network` band → each sister's own site |
| contact panel | corporate email + HQ | the building's address, phone and fax |
| form | community select | hidden field, preset to this building |
| JSON-LD | `Organization` + five `NursingHome` | one `NursingHome`, with its own logo |

### Brand artwork

Each community ships two delivered SVGs, `src/assets/lockups/<id>.svg` and
`src/assets/wordmarks/<id>.svg`. Both are flat, single-colour files;
`src/lib/brand.ts` strips the outer `<svg>`, rewrites the fills to
`currentColor` and hands them to `BrandSprite.astro` as `#lockup` and
`#wordmark`. One asset therefore serves the light nav (moss) and the dark
footer (cream), and the colours live in the stylesheet rather than in five
copies of the file. `public/<slug>/img/logo.svg` is the same lockup as a
standalone asset, referenced from the site's JSON-LD.

## Adding a community's own site

```bash
npm run new-site <slug> --community=<id>    # preset + public/ tree
# fill in the TODOs in src/config/presets/<slug>.ts (domain, inbox, forms slug)
# drop its lockup + wordmark into src/assets/lockups|wordmarks/<id>.svg
# swap that community's photography into public/<slug>/img/
SITE=<slug> npm run build                   # verify
node scripts/gen-sites-manifest.mjs         # refresh the manifest
```

Add a new building by adding an entry to `src/data/communities.ts`; the map, the
cards, the footer, the inquiry form's select and the `/locations/<id>` route all
pick it up.

## Notes on the port

The source was a single self-contained `index.html`, not a Webflow export, so
the `WEBFLOW-TO-ASTRO.md` slicer did not apply. The page was sliced by hand into
the layout, chrome and section components above. Design fidelity comes from
keeping the original stylesheet intact rather than rewriting it.

Deliberate changes from the source page:

- **Fonts are self-hosted** (`@fontsource-variable/hanken-grotesk`) instead of
  loaded from `fonts.googleapis.com`. No external font request.
- **Leaflet is an npm dependency**, bundled by Astro, instead of a vendored
  `vendor/leaflet.min.js` blob.
- **Community cards render server-side** from the catalog instead of being
  injected by JS, so they exist without JavaScript and are indexable. The map is
  a progressive enhancement layered on top; if tiles or the script fail, the
  cards are unaffected.
- **The inquiry form POSTs to the Mozart forms service**
  (`https://forms.mzrt.work/submit/<slug>`) with a JSON `fetch`, a `_gotcha`
  honeypot and inline status, instead of opening a `mailto:` draft.
- **Shared CSS and fonts are bundled from `src/`** rather than duplicated into
  every `public/<slug>/` tree — the sister sites here share one design system,
  so only photography and brand artwork are per-site. Each build's `dist/` still
  contains only that site's assets, which is what `aws s3 sync --delete` needs.
- Image paths are root-relative (`/img/…`) so they resolve identically from `/`
  and from `/locations/<id>`.
- Per-community pages, JSON-LD (`Organization` + `NursingHome` per community)
  and canonical URLs are new.

### Where the community content came from

Care lines, bed counts, fax numbers and the activities in each entry's `life`
list were reconciled against each building's existing public listing. The prose
is Heartwell's own — the facts were carried over, the copy was not.

### Still to do before launch

- **Photography is the shared Heartwell library, not per-building.** The brand
  Dropbox holds logos and the brand guide only; there are no facility photos in
  it. Every community site currently draws on the same image library, assigned
  so that no photo repeats within a page and each building leads with a
  different plate. Real photography drops in with no code change: replace the
  files in `public/<slug>/img/`, and adjust `Community.photos` and each
  `Service.photo` in the catalog if the filenames differ.
- **Allen View's vertical logo lockup is misspelled.** Every
  `Allen view_heartwell_vertical_logo_*` file in the brand Dropbox reads
  "Alen View". The horizontal lockup and the wordmark are correct, and those are
  the two this build uses, so nothing ships misspelled — but the vertical
  artwork needs a fix from the designer before it is used anywhere else.
- **Wire the form recipients.** Each site POSTs to
  `forms.mzrt.work/submit/<slug>`, but the KV config for those slugs
  (recipients, origin allowlist, routing) is not written yet — run the
  `mozart-form-setup` skill once per slug and send a real test submission.
  Until then submissions will be rejected.
- **Confirm each building's own inbox.** All six presets currently send to
  `info@heartwellhc.com`; if a community has its own address, set it in its
  preset.
- **Verify community coordinates** against surveyed addresses; the lat/lng in the
  catalog came with the original build and are approximate.
- **Register the sites in the Mozart app** and attach the domains. Linking the
  repo is what wires up CI — the app writes
  `.github/workflows/mzrt-deploy-<slug>.yml` itself, one per site. Don't
  hand-write those workflows.

### Known build artifact

Every build emits `_astro/Communities.astro_…js` (the bundled Leaflet map,
~152 KB) because `index.astro` imports the `Communities` section, even on a
community site that never renders it. No community page references the file, so
nothing downloads it; it is dead weight in the bucket only. Making the import
dynamic does not help — Astro collects component scripts from the whole module
graph — so removing it properly means splitting the hub's home route out of the
shared `index.astro`.

## External calls

The build makes no request to any CDN for its own runtime — fonts, CSS, JS and
images are all same-origin. What remains is deliberate: CARTO/OpenStreetMap map
tiles (hub only), Google Maps directions links, and the `forms.mzrt.work` form
endpoint.
