import type { APIRoute } from 'astro';
import { PREVIEW } from '../lib/site';

export const GET: APIRoute = ({ site }) => {
  const body = PREVIEW ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
