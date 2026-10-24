# Dwellix template

> Also in this repo: [`ai-studio-template/`](./ai-studio-template), a React + Vite version of an agent site (off-plan and investment advisor layout) that can be imported into Google AI Studio and redesigned with prompts.

A reusable website template for UAE real estate agents. Each agent gets a personalised, bilingual (English/Arabic) preview site generated from **one JSON file**, deployed to `https://<slug>.dwellix.site`, plus a phone screenshot and a scroll video you can send them.

- Astro (static output) + TypeScript, plain CSS, no client framework. The only JavaScript is a few tiny vanilla scripts for the filters, the gallery and the language toggle.
- Mobile-first, minimal design: one accent colour, Cormorant Garamond / Noto Naskh Arabic headings, IBM Plex Sans Arabic body text. All fonts are self-hosted.
- `/en/` and `/ar/` routes, `dir="rtl"`, CSS logical properties, hreflang links, Western digits everywhere.
- Responsive WebP images through Astro's `<Image>`, lazy-loaded below the fold.
- SEO: per-page title and description, Open Graph image (the first listing photo), JSON-LD `RealEstateAgent`, sitemap.

## Setup

```bash
npm install
npm run dev                # http://localhost:4321 (uses agents/sample.json)
AGENT=sample npm run build # static site in dist/
```

Requirements: Node 20+. `ffmpeg` is optional; with it, the preview script also writes an MP4 and trims the video to exactly 15 s. Playwright's Chromium is installed with `npx playwright install chromium` if you don't already have it.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server for `AGENT` (default `sample`) |
| `npm run build` | Static build into `dist/` |
| `npm run serve` | Serve `dist/` locally (`astro preview`) |
| `npm run validate -- <slug>` | Validate one agent file (or all of them, with no slug) |
| `npm run preview -- <slug>` | Validate, build, deploy and capture a preview (see below) |
| `npm run setup:cloudflare` | One-time Cloudflare setup |
| `npm run generate:samples` | Regenerate the placeholder images in `agents/sample/` |
| `npm run check` | Type-check the project |

Environment variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `AGENT` | `sample` | Which `agents/<slug>.json` to build |
| `PREVIEW` | off (`1` in the preview script) | Adds `noindex, nofollow` to every page, a `Disallow: /` robots.txt and a small "Preview by Dwellix" footer line |
| `SITE_URL` | `https://<slug>.dwellix.site` | Absolute base for canonical, hreflang and Open Graph URLs |
| `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` | | Needed for deploying (put them in `.env`, see `.env.example`) |

## Adding an agent

1. Create a folder for their photos, e.g. `agents/jane-doe/`, and add the agent portrait and the listing photos (`.jpg`, `.png`, `.webp` or `.avif`; ideally at least 1600 px wide).
2. Copy `agents/sample.json` to `agents/jane-doe.json` and edit it. The file name is the **slug**: it becomes the subdomain, so use lowercase letters, digits and dashes, 28 characters at most.
3. Run `npm run validate -- jane-doe` and fix anything it reports.
4. Run `npm run preview -- jane-doe --no-deploy` to check it locally, then `npm run preview -- jane-doe` to publish it.

## JSON format

Every `{ "en", "ar" }` field needs both languages. Photo paths are relative to the `agents/` folder.

```jsonc
{
  "agent": {
    "name":      { "en": "Layla Haddad", "ar": "ليلى حداد" },
    "photo":     "sample/agent.jpg",
    "agency":    { "en": "Harbour & Dune Properties", "ar": "هاربر آند ديون العقارية" },
    "brn":       "12345",                 // RERA BRN, digits only
    "whatsapp":  "+971501234567",         // E.164
    "email":     "layla@example.com",     // optional
    "focusArea": { "en": "Dubai Marina & Palm Jumeirah", "ar": "دبي مارينا ونخلة جميرا" },
    "languages": ["English", "العربية"],
    "bio":       { "en": "…", "ar": "…" },
    "accentColor": "#8c6239"              // optional; button text colour is picked automatically for contrast
  },
  "listings": [                           // 3 to 6
    {
      "id": "marina-2br-sea-view",        // URL-safe, unique: /en/listings/<id>/
      "title":   { "en": "Sea-view 2 bedroom apartment", "ar": "…" },
      "type":    "apartment",             // apartment | villa | townhouse | penthouse | office
      "purpose": "sale",                  // sale | rent
      "priceAED": 2450000,
      "rentPeriod": "yearly",             // only with "rent" (defaults to yearly)
      "beds": 2,                          // 0 = studio (beds are not shown for offices)
      "baths": 3,
      "area": { "en": "Dubai Marina", "ar": "دبي مارينا" },   // or just "Dubai Marina"
      "sqft": 1320,
      "photos": ["sample/marina-1.jpg", "sample/marina-2.jpg"],
      "description": { "en": "…", "ar": "…" },
      "permitNumber": "7100000001"        // optional DLD/Trakheesi permit; shown on the card and detail page
    }
  ]
}
```

The build fails with a readable list of problems if the file is invalid, for example:

```
✖ agents/jane-doe.json is invalid:
  • agent.whatsapp: whatsapp must be in E.164 format, e.g. +971501234567
  • listings.2.photos.0: file not found: agents/jane-doe/kitchen.jpg
```

Prices render as `AED 1,250,000` and `AED 95,000/yr` (Arabic: `1,250,000 درهم` and `95,000 درهم/سنوياً`). Every WhatsApp button opens `https://wa.me/<number>?text=…` with a prefilled message naming that property, in the page's language.

## One-time Cloudflare setup

Every agent preview is a **branch deployment** of a single Cloudflare Pages project (`dwellix-previews`, branch = slug), which Cloudflare serves at `<slug>.dwellix-previews.pages.dev`. A small Worker (`worker/`) on the route `*.dwellix.site/*` proxies `<slug>.dwellix.site` to that address, so adding an agent never needs DNS or dashboard changes.

1. `dwellix.site` must be a zone in your Cloudflare account.
2. Create an API token (My Profile → API Tokens → Create Token → Custom) with:
   - Account → **Cloudflare Pages: Edit**
   - Account → **Workers Scripts: Edit**
   - Zone → **Workers Routes: Edit** and **Zone: Read**, for `dwellix.site`
3. `cp .env.example .env` and fill in `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` (shown on the zone's overview page). `.env` is gitignored; never commit it.
4. Run:

   ```bash
   npm run setup:cloudflare
   ```

   This creates the Pages project (its production branch is called `production` and is never used) and deploys the Worker with its route. It is safe to re-run.
5. **Manual DNS step:** in the Cloudflare dashboard → `dwellix.site` → DNS → Records, add

   | Type | Name | Content | Proxy status |
   | --- | --- | --- | --- |
   | `AAAA` | `*` | `100::` | **Proxied** (orange cloud) |

   `100::` is a placeholder address: the Worker answers every request, so the record only has to exist and be proxied. Wildcard certificates for `*.dwellix.site` are covered by Cloudflare's Universal SSL.

To use a different domain or project name, set `PREVIEW_DOMAIN` and/or `PAGES_PROJECT` in `.env` before running both scripts.

## Publishing a preview

```bash
npm run preview -- <slug>               # build, deploy, capture
npm run preview -- <slug> --no-deploy   # build, serve dist/ locally, capture from localhost
npm run preview -- <slug> --lang=ar     # capture the Arabic version
```

The script:

1. validates `agents/<slug>.json`,
2. builds with `AGENT=<slug> PREVIEW=1`,
3. runs `wrangler pages deploy dist --project-name=dwellix-previews --branch=<slug>`,
4. waits (up to about 60 s) for `https://<slug>.dwellix.site/` to return 200, falling back to the `pages.dev` address with a warning if the Worker or DNS isn't set up yet,
5. opens the page in Chromium as a 390×844 @3x touch phone, waits for fonts and every image, and writes:
   - `out/<slug>/screenshot.png`: the first screen
   - `out/<slug>/full-page.png`: the whole page
   - `out/<slug>/scroll.webm`: a 15 s eased scroll from top to bottom, pausing on the hero and the listings
   - `out/<slug>/scroll.mp4`: the same video as MP4, if `ffmpeg` is installed

   With `--lang=ar` the files go to `out/<slug>/ar/`.
6. prints the live URL and the output paths.

`out/` and `dist/` are gitignored.

## Project layout

```
agents/              one JSON per agent + their photos (agents/<slug>/…)
src/lib/schema.ts    zod schema for the JSON
src/lib/i18n.ts      UI strings, price formatting, WhatsApp links
src/pages/[lang]/    home and listing detail pages (en + ar)
src/styles/          global CSS (logical properties only)
scripts/             preview, validate, Cloudflare setup, sample image generator
worker/              Cloudflare Worker for *.dwellix.site
```
