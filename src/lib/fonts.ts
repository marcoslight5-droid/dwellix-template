// Self-hosted fonts (from @fontsource), declared here instead of importing fontsource's
// CSS so we control unicode-range, font-display and preloading per language.
import plexLatin400 from '@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-400-normal.woff2?url';
import plexLatin500 from '@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-latin-500-normal.woff2?url';
import plexArabic400 from '@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2?url';
import plexArabic500 from '@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2?url';
import cormorant500 from '@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2?url';
import naskh600 from '@fontsource/noto-naskh-arabic/files/noto-naskh-arabic-arabic-600-normal.woff2?url';
import type { Lang } from './i18n';

const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD';
const ARABIC = 'U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0897-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC';

// Latin faces swap in (metrics are close, no layout shift). Arabic faces use `optional`:
// they are preloaded on Arabic pages, and if they miss the first ~100ms the system Arabic
// font is kept for that visit instead of reflowing the hero (which costs CLS).
const faces: [family: string, weight: number, url: string, range: string, display: string][] = [
  ['IBM Plex Sans Arabic', 400, plexLatin400, LATIN, 'swap'],
  ['IBM Plex Sans Arabic', 500, plexLatin500, LATIN, 'swap'],
  ['IBM Plex Sans Arabic', 400, plexArabic400, ARABIC, 'optional'],
  ['IBM Plex Sans Arabic', 500, plexArabic500, ARABIC, 'optional'],
  ['Cormorant Garamond', 500, cormorant500, LATIN, 'swap'],
  ['Noto Naskh Arabic', 600, naskh600, ARABIC, 'optional'],
];

export const fontFaceCss = faces
  .map(([family, weight, url, range, display]) => `@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:${display};src:url(${url}) format('woff2');unicode-range:${range}}`)
  .join('');

export const preloadFonts = (lang: Lang) => (lang === 'ar' ? [plexArabic400, plexArabic500, naskh600] : [plexLatin400, cormorant500]);
