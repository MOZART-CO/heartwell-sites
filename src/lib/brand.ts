/**
 * The active site's brand artwork, prepared once for the whole build.
 *
 * Each community ships two pieces of delivered SVG artwork:
 *
 *   src/assets/lockups/<id>.svg     heart + name + descriptor, horizontal
 *   src/assets/wordmarks/<id>.svg   name + descriptor, no heart
 *
 * Both are flat single-colour files. We hand the colour back to CSS by
 * rewriting the fills to `currentColor`, so one asset serves the light chrome
 * and the dark footer, and we keep the viewBox so `<use>` renders at the right
 * aspect ratio without a layout shift.
 *
 * The corporate hub has no entry here — it uses the Heartwell mark and wordmark
 * built into `BrandSprite.astro`.
 */
import { community } from '../config/site';

const lockupFiles = import.meta.glob('../assets/lockups/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const wordmarkFiles = import.meta.glob('../assets/wordmarks/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface Sprite {
  /** The artwork's own viewBox — put it on the `<svg>` that `<use>`s it. */
  viewBox: string;
  /** The symbol body: the geometry, with fills handed over to CSS. */
  inner: string;
}

/**
 * Turn a delivered brand SVG into the body of a `<symbol>`. Returns null when
 * the file is missing or carries no viewBox, so a site without artwork falls
 * back to the Heartwell marks rather than rendering an empty symbol.
 */
function toSprite(files: Record<string, string>, id: string): Sprite | null {
  const key = Object.keys(files).find((k) => k.endsWith(`/${id}.svg`));
  if (!key) return null;

  const raw = files[key];
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1];
  if (!viewBox) return null;

  const inner = raw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    // `fill="none"` is structural — it keeps counters and bowls open.
    .replace(/fill="(?!none")[^"]*"/g, 'fill="currentColor"')
    .trim();

  return { viewBox, inner };
}

/** The building's full horizontal lockup — the nav and footer brand. */
export const lockup: Sprite | null = community
  ? toSprite(lockupFiles, community.id)
  : null;

/** The building's wordmark — the display-size word across the footer. */
export const wordmark: Sprite | null = community
  ? toSprite(wordmarkFiles, community.id)
  : null;

/** The viewBox the Heartwell wordmark built into BrandSprite is drawn in. */
export const HEARTWELL_WORDMARK_VIEWBOX = '0 0 473 106';

/** The viewBox to put on an `<svg>` that `<use href="#wordmark">`s. */
export const wordmarkViewBox = wordmark?.viewBox ?? HEARTWELL_WORDMARK_VIEWBOX;
