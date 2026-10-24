import { loadAgent, agentSlug } from './load-agent';
import { resolveImage } from './images';

export const SLUG = agentSlug();
export const PREVIEW = process.env.PREVIEW === '1' || process.env.PREVIEW === 'true';

// Loaded once per build; validated (with a readable error) in astro.config.ts first.
export const data = loadAgent(SLUG);
export const { agent, listings } = data;

export async function listingImages(listingId: string) {
  const listing = listings.find((l) => l.id === listingId)!;
  return Promise.all(listing.photos.map(resolveImage));
}

export const agentPhoto = () => resolveImage(agent.photo);

/** Picks black or white text for the accent, whichever has better contrast. */
export function accentInk(hex: string): string {
  let h = hex.replace('#', '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return (1.05 / (lum + 0.05)) >= ((lum + 0.05) / 0.05) ? '#ffffff' : '#111111';
}

export const ACCENT = agent.accentColor ?? '#8c6239';
