# heartwell-sites

Heartwell Healthcare as a **multi-site Astro build**: one repo, one shared
design system and component vocabulary, and a per-site preset selected at build
time by the `SITE` env var. Today it builds the corporate hub; each community
can be promoted to its own site with one command.

Follows the Mozart build playbook in
[`mozart-co/mzrt-site-build`](https://github.com/mozart-co/mzrt-site-build) —
`ASTRO-MULTI-SITE-SCALING.md` for the multi-site model and
`MULTI-SITE-SETUP.md` for the `mzrt.sites.json` manifest.

## Sites

| slug | what it is | build |
|---|---|---|
| `heartwell` | the corporate hub — all five communities, `/locations/<id>` for each | `SITE=heartwell npm run build` |

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
  styles/site.css            the shared design system — the original build's CSS, verbatim
  data/communities.ts        THE community catalog: one entry per building
  config/
    types.ts                 SiteConfig + Community shapes
    site.ts                  auto-discovers presets, resolves the active site
    presets/<slug>.ts        one file per site — the only thing that changes per site
  layouts/Layout.astro       HTML shell + shared chrome (nav, footer, brand sprite)
  components/
    sections/*.astro         the hub's section stack, ported from the source page
    LocationPage.astro       one community's page — `standalone` prop switches hub/own-site
  lib/schema.ts              JSON-LD builders
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

## Adding a community's own site

```bash
npm run new-site wood-glen --community=wood-glen   # preset + public/ tree
# fill in the TODOs in src/config/presets/wood-glen.ts (domain, inbox, forms slug)
# swap that community's photography into public/wood-glen/img/
SITE=wood-glen npm run build                       # verify
node scripts/gen-sites-manifest.mjs                # refresh the manifest
```

The community's page is the same `LocationPage.astro` the hub already renders at
`/locations/wood-glen` — with `standalone`, it becomes the root of its own site
(no "all communities" link, no sister-community grid, its own forms slug). Add a
new building by adding an entry to `src/data/communities.ts`; the map, the cards,
the footer, the inquiry form's select and the `/locations/<id>` route all pick it
up.

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
  (`https://forms.mzrt.work/submit/heartwell`) with a JSON `fetch`, a `_gotcha`
  honeypot and inline status, instead of opening a `mailto:` draft.
- **Shared CSS and fonts are bundled from `src/`** rather than duplicated into
  every `public/<slug>/` tree — the sister sites here share one design system,
  so only photography is per-site. Each build's `dist/` still contains only that
  site's assets, which is what `aws s3 sync --delete` needs.
- Image paths are root-relative (`/img/…`) so they resolve identically from `/`
  and from `/locations/<id>`.
- Per-community pages, JSON-LD (`Organization` + `NursingHome` per community)
  and canonical URLs are new.

### Still to do before launch

- **Wire the form recipients.** The HTML posts to
  `forms.mzrt.work/submit/heartwell`, but the KV config for that slug (recipients,
  origin allowlist, routing) is not written yet — run the `mozart-form-setup`
  skill and send a real test submission. Until then submissions will be rejected.
- **Verify community coordinates** against surveyed addresses; the lat/lng in the
  catalog came with the original build and are approximate.
- **Register the site(s) in the Mozart app** and attach the domain. Linking the
  repo is what wires up CI — the app writes
  `.github/workflows/mzrt-deploy-<slug>.yml` itself, one per site. Don't
  hand-write those workflows.

## External calls

The build makes no request to any CDN for its own runtime — fonts, CSS, JS and
images are all same-origin. What remains is deliberate: CARTO/OpenStreetMap map
tiles, Google Maps directions links, and the `forms.mzrt.work` form endpoint.
