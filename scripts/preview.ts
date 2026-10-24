/**
 * Build, deploy and capture an agent preview.
 *
 *   npm run preview -- <slug> [--no-deploy] [--lang=ar]
 *
 * 1. Validates agents/<slug>.json
 * 2. Builds with AGENT=<slug> PREVIEW=1
 * 3. Deploys to Cloudflare Pages (branch = slug), served at https://<slug>.dwellix.site
 *    (with --no-deploy: serves dist/ locally with `astro preview` instead)
 * 4. Captures out/<slug>/screenshot.png, full-page.png, scroll.webm (+ scroll.mp4 with ffmpeg)
 *    (out/<slug>/ar/ with --lang=ar)
 */
import 'dotenv/config';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { chromium, type Page } from 'playwright';
import { loadAgent, AgentValidationError } from '../src/lib/load-agent';
import { binPath, runNode, startNode, hasCommand, requireCloudflareEnv, PAGES_PROJECT, PREVIEW_DOMAIN } from './lib/run';

const VIDEO_SECONDS = 15;
const VIEWPORT = { width: 390, height: 844 };

// ---------- args ----------
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')).map((a) => a.split('=')[0]));
const slug = args.find((a) => !a.startsWith('--')) ?? 'sample';
const langArg = args.find((a) => a.startsWith('--lang='))?.split('=')[1] ?? 'en';
const deploy = !flags.has('--no-deploy');
const unknown = [...flags].filter((f) => !['--no-deploy', '--lang'].includes(f));

if (unknown.length || !['en', 'ar'].includes(langArg)) {
  console.error(`Usage: npm run preview -- <slug> [--no-deploy] [--lang=en|ar]`);
  process.exit(1);
}
const lang = langArg as 'en' | 'ar';

const step = (msg: string) => console.log(`\n\x1b[1m→ ${msg}\x1b[0m`);
const ok = (msg: string) => console.log(`  \x1b[32m✓\x1b[0m ${msg}`);
const warn = (msg: string) => console.log(`  \x1b[33m!\x1b[0m ${msg}`);

// ---------- helpers ----------
async function waitFor200(url: string, timeoutMs = 60_000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  let last = '';
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(8000) });
      if (res.status === 200) return true;
      last = `HTTP ${res.status}`;
    } catch (err) {
      last = (err as Error).message;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  warn(`${url} did not respond 200 within ${timeoutMs / 1000}s (last: ${last})`);
  return false;
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address() as net.AddressInfo;
      srv.close(() => resolve(port));
    });
    srv.on('error', reject);
  });
}

/** Load every lazy image, wait for fonts, and make sure layout is final. */
async function settle(page: Page) {
  // Walk down the page so lazy images start loading, then force the rest.
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => (img.loading = 'eager'));
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0), null, { timeout: 20_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);
}

/** Eased scroll: hold on hero, glide to listings, hold, glide to the bottom, hold. */
function smoothScroll(page: Page, totalMs: number) {
  return page.evaluate(async (total) => {
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
    const header = document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
    const maxY = document.documentElement.scrollHeight - window.innerHeight;
    const listings = document.getElementById('listings');
    const listY = Math.min(maxY, listings ? listings.getBoundingClientRect().top + window.scrollY - header : maxY / 3);

    // [duration share, from, to]; holds have from === to.
    const plan: [number, number, number][] = [
      [0.1, 0, 0],
      [0.17, 0, listY],
      [0.1, listY, listY],
      [0.56, listY, maxY],
      [0.07, maxY, maxY],
    ];
    const start = performance.now();
    await new Promise<void>((done) => {
      const frame = (now: number) => {
        let t = (now - start) / total;
        if (t >= 1) {
          window.scrollTo(0, maxY);
          return done();
        }
        for (const [share, from, to] of plan) {
          if (t <= share) {
            window.scrollTo(0, from + (to - from) * ease(t / share));
            break;
          }
          t -= share;
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  }, totalMs);
}

const contextOptions = {
  viewport: VIEWPORT,
  screen: VIEWPORT,
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  locale: lang === 'ar' ? 'ar-AE' : 'en-AE',
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
};

// tsx (esbuild keepNames) wraps named functions in __name(), which doesn't exist inside the page.
const NAME_SHIM = 'window.__name = (fn) => fn;';

async function capture(url: string, outDir: string) {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const files: string[] = [];
  try {
    // Screenshots
    const ctx = await browser.newContext(contextOptions);
    await ctx.addInitScript(NAME_SHIM);
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    // Arabic fonts use font-display: optional; a reload guarantees they come from cache and are used.
    await page.reload({ waitUntil: 'networkidle' });
    await settle(page);
    const shot = path.join(outDir, 'screenshot.png');
    await page.screenshot({ path: shot });
    const full = path.join(outDir, 'full-page.png');
    await page.screenshot({ path: full, fullPage: true });
    files.push(shot, full);
    ok('screenshot.png and full-page.png');
    await ctx.close();

    // Scroll video
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dwellix-video-'));
    const vctx = await browser.newContext({
      ...contextOptions,
      recordVideo: { dir: tmp, size: { width: VIEWPORT.width * 2, height: VIEWPORT.height * 2 } },
    });
    await vctx.addInitScript(NAME_SHIM);
    const vpage = await vctx.newPage();
    const recordingStarted = Date.now();
    await vpage.goto(url, { waitUntil: 'networkidle' });
    await vpage.reload({ waitUntil: 'networkidle' });
    await settle(vpage);
    const scrollStarted = Date.now();
    await smoothScroll(vpage, VIDEO_SECONDS * 1000);
    await vctx.close();
    const raw = await vpage.video()!.path();

    const webm = path.join(outDir, 'scroll.webm');
    const mp4 = path.join(outDir, 'scroll.mp4');
    const offset = ((scrollStarted - recordingStarted) / 1000).toFixed(2);
    if (hasCommand('ffmpeg')) {
      // Trim the page-load frames so the video is exactly the 15s scroll.
      const trim = ['-y', '-loglevel', 'error', '-ss', offset, '-i', raw, '-t', String(VIDEO_SECONDS), '-an'];
      const vp9 = spawnSync('ffmpeg', [...trim, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30', '-row-mt', '1', webm], { stdio: 'inherit' });
      if (vp9.status !== 0) fs.copyFileSync(raw, webm);
      const h264 = spawnSync(
        'ffmpeg',
        [...trim, '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', mp4],
        { stdio: 'inherit' },
      );
      files.push(webm);
      if (h264.status === 0) files.push(mp4);
      else warn('ffmpeg could not write scroll.mp4');
      ok(`scroll video (${VIDEO_SECONDS}s)`);
    } else {
      fs.copyFileSync(raw, webm);
      files.push(webm);
      warn(`ffmpeg not found: scroll.webm is untrimmed (scroll starts at ${offset}s) and scroll.mp4 was skipped`);
    }
    fs.rmSync(tmp, { recursive: true, force: true });
  } finally {
    await browser.close();
  }
  return files;
}

// ---------- main ----------
async function main() {
  const root = process.cwd();
  const liveUrl = `https://${slug}.${PREVIEW_DOMAIN}/`;
  const pagesUrl = `https://${slug}.${PAGES_PROJECT}.pages.dev/`;

  step(`Validating agents/${slug}.json`);
  try {
    const data = loadAgent(slug);
    ok(`${data.agent.name.en}, ${data.listings.length} listings`);
  } catch (err) {
    if (err instanceof AgentValidationError) {
      console.error(`\n✖ ${err.message}\n`);
      process.exit(1);
    }
    throw err;
  }
  if (deploy) {
    requireCloudflareEnv();
    if (slug.length > 28) {
      console.error(`\n✖ Slug "${slug}" is longer than 28 characters, which Cloudflare Pages branch URLs do not support.\n`);
      process.exit(1);
    }
  }

  step('Building (PREVIEW=1)');
  const astro = binPath('astro');
  const env = { ...process.env, AGENT: slug, PREVIEW: '1', SITE_URL: liveUrl };
  await runNode(astro, ['build'], { env, cwd: root });

  let baseUrl: string;
  let server: ReturnType<typeof startNode> | undefined;

  if (deploy) {
    step(`Deploying to Cloudflare Pages (${PAGES_PROJECT}, branch ${slug})`);
    await runNode(
      binPath('wrangler'),
      ['pages', 'deploy', 'dist', `--project-name=${PAGES_PROJECT}`, `--branch=${slug}`, '--commit-dirty=true'],
      { env, cwd: root },
    );
    step(`Waiting for ${liveUrl}`);
    if (await waitFor200(`${liveUrl}${lang}/`)) {
      baseUrl = liveUrl;
    } else {
      warn(`Falling back to ${pagesUrl} (is the Worker deployed and the *.${PREVIEW_DOMAIN} DNS record set up?)`);
      if (!(await waitFor200(`${pagesUrl}${lang}/`))) throw new Error('Deployment is not reachable.');
      baseUrl = pagesUrl;
    }
    ok(`${baseUrl} is live`);
  } else {
    step('Serving dist/ locally (astro preview)');
    const port = await freePort();
    server = startNode(astro, ['preview', '--host', '127.0.0.1', '--port', String(port)], { env, cwd: root, stdio: 'ignore' });
    baseUrl = `http://127.0.0.1:${port}/`;
    if (!(await waitFor200(`${baseUrl}${lang}/`, 30_000))) {
      server.kill();
      throw new Error('Local preview server did not start.');
    }
    ok(baseUrl);
  }

  // English captures go to out/<slug>/, Arabic to out/<slug>/ar/ so both can coexist.
  const outDir = path.join(root, 'out', slug, ...(lang === 'ar' ? ['ar'] : []));
  step(`Capturing ${baseUrl}${lang}/ at 390×844 @3x`);
  let files: string[];
  try {
    files = await capture(`${baseUrl}${lang}/`, outDir);
  } finally {
    server?.kill();
  }

  console.log('\n\x1b[1mDone.\x1b[0m');
  if (deploy) console.log(`  Live:  ${baseUrl}${lang}/`);
  else console.log(`  Local build captured (not deployed). Live URL after deploy: ${liveUrl}`);
  for (const f of files) console.log(`  File:  ${path.relative(root, f)}`);
}

main().catch((err) => {
  console.error(`\n✖ ${err.message ?? err}`);
  process.exit(1);
});
