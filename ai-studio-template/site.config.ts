/**
 * Site-wide switches. Content lives in data/content.ts, design tokens in styles/theme.css.
 */
export const siteConfig = {
  /** Design preset from styles/theme.css: 'paper' (warm light, editorial) or 'ink' (dark). */
  theme: 'paper' as 'paper' | 'ink',
  /** Language shown on first visit. Visitors can switch; ?lang=ar also works. */
  defaultLang: 'en' as 'en' | 'ar',
  /**
   * Pitch-preview mode: adds the "Preview by Dwellix" footer line and highlights
   * placeholder content while developing. Set to false when the agent goes live
   * (and remove the robots noindex tag in index.html).
   */
  preview: true,
};
