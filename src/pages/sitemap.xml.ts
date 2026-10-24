import type { APIRoute } from 'astro';
import { LANGS, homePath, listingPath } from '../lib/i18n';
import { listings } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const paths = LANGS.flatMap((lang) => [homePath(lang), ...listings.map((l) => listingPath(lang, l.id))]);
  const urls = paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
