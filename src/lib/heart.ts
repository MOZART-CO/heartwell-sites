/**
 * The Heartwell heart, as geometry the whole design system shares.
 *
 * The approved boards use two heart devices everywhere: the layered
 * "paper-cut" heart (stacked, dimensional fills stepping through the sage
 * scale) and photography clipped inside the same organic silhouette. Both are
 * drawn from this one path so every site renders the identical shape —
 * `LayeredHeart.astro` stacks it, `BrandSprite.astro` registers it as the
 * `#heart-clip` clip-path for `.photo-heart`, and `SectionHeart.astro` sets it
 * small above headings.
 *
 * The path is a soft, slightly asymmetric heart in a 200 × 190 box: full
 * lobes, a shallow dimple, a gently rounded point — the hand-cut silhouette
 * from the boards rather than a geometric valentine.
 */
export const HEART_W = 200;
export const HEART_H = 190;

export const HEART_PATH =
  'M101 174 ' +
  'C 66 151, 20 116, 11 76 ' +
  'C 5 47, 24 22, 53 20 ' +
  'C 75 18.5, 91 29, 100 46 ' +
  'C 108 28, 124 17, 146 18 ' +
  'C 175 19.5, 193 45, 188 74 ' +
  'C 180 115, 136 151, 101 174 Z';

/**
 * The same path scaled into the 0–1 unit square, for a
 * `clipPathUnits="objectBoundingBox"` clip. Elements using the clip should
 * hold `aspect-ratio: 200 / 190` so the silhouette is not stretched.
 */
export const HEART_CLIP_TRANSFORM = `scale(${1 / HEART_W} ${1 / HEART_H})`;
