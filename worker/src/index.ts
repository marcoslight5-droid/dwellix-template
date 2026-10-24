/**
 * Proxies <slug>.dwellix.site/* to <slug>.dwellix-previews.pages.dev/*.
 * Each agent preview is a Pages branch deployment (branch = slug), so this one
 * Worker plus a wildcard DNS record covers every agent with no per-agent setup.
 */
interface Env {
  ROOT_DOMAIN: string;
  PAGES_PROJECT: string;
}

// Pages branch aliases are at most 28 characters of [a-z0-9-].
const SUBDOMAIN = /^[a-z0-9](?:[a-z0-9-]{0,26}[a-z0-9])?$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const suffix = `.${env.ROOT_DOMAIN}`;
    const sub = url.hostname.endsWith(suffix) ? url.hostname.slice(0, -suffix.length) : '';

    if (!SUBDOMAIN.test(sub) || sub === 'www') {
      return new Response('Not found', { status: 404, headers: { 'content-type': 'text/plain' } });
    }

    const pagesHost = `${sub}.${env.PAGES_PROJECT}.pages.dev`;
    const target = new URL(url.pathname + url.search, `https://${pagesHost}`);
    const upstream = await fetch(new Request(target, request), { redirect: 'manual' });

    const headers = new Headers(upstream.headers);
    // Keep redirects on the pretty domain.
    const location = headers.get('location');
    if (location) {
      const loc = new URL(location, target);
      if (loc.hostname === pagesHost) {
        loc.hostname = url.hostname;
        headers.set('location', loc.toString());
      }
    }
    // Previews must never be indexed, whatever the page says.
    headers.set('x-robots-tag', 'noindex, nofollow');

    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers });
  },
};
