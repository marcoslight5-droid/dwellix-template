/**
 * One-time Cloudflare setup:
 *   1. creates the Pages project that holds every agent preview (one branch per agent)
 *   2. deploys the Worker that maps <slug>.dwellix.site → <slug>.dwellix-previews.pages.dev
 *
 *   npm run setup:cloudflare
 *
 * The wildcard DNS record is a manual step; see README.
 */
import 'dotenv/config';
import path from 'node:path';
import { binPath, runNode, requireCloudflareEnv, PAGES_PROJECT, PREVIEW_DOMAIN } from './lib/run';

async function main() {
  requireCloudflareEnv();
  const wrangler = binPath('wrangler');
  const root = process.cwd();

  console.log(`\n→ Creating Pages project "${PAGES_PROJECT}"`);
  try {
    // The production branch is never deployed to; every agent is a preview branch.
    await runNode(wrangler, ['pages', 'project', 'create', PAGES_PROJECT, '--production-branch=production'], { capture: true, cwd: root });
  } catch (err) {
    const out = String((err as { output?: string }).output ?? '');
    if (/already exists|8000002/i.test(out)) console.log(`  Project already exists, continuing.`);
    else throw err;
  }

  console.log(`\n→ Deploying the preview Worker on *.${PREVIEW_DOMAIN}/*`);
  const args = ['deploy', '--config', path.join('worker', 'wrangler.toml')];
  if (PREVIEW_DOMAIN !== 'dwellix.site' || PAGES_PROJECT !== 'dwellix-previews') {
    args.push('--routes', `*.${PREVIEW_DOMAIN}/*`, '--var', `ROOT_DOMAIN:${PREVIEW_DOMAIN}`, '--var', `PAGES_PROJECT:${PAGES_PROJECT}`);
  }
  await runNode(wrangler, args, { cwd: root });

  console.log(`
✓ Cloudflare setup complete.

One manual step remains (only once): in the Cloudflare dashboard for ${PREVIEW_DOMAIN},
add a DNS record  Type: AAAA  Name: *  IPv6: 100::  Proxy: Proxied (orange cloud).
Then run: npm run preview -- sample
`);
}

main().catch((err) => {
  console.error(`\n✖ ${err.message ?? err}`);
  process.exit(1);
});
