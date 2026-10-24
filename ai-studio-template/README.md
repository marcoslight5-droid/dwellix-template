# Dwellix agent site: AI Studio template

A premium, bilingual (English / Arabic) website template for Dubai real estate agents, built as a **React + TypeScript + Vite** app so it can be imported into **Google AI Studio** and redesigned with prompts. See [AI_STUDIO.md](./AI_STUDIO.md) for the import steps, the rules to give the AI, and example redesign prompts.

The current content is a **pitch preview** for Akram Zubair ([@dubairealtorzubayr](https://www.instagram.com/dubairealtorzubayr/)). It is drafted from his public Instagram (each project links to his post about it), his LinkedIn URL and his Estate Magazine feature; the Instagram and press images are low-resolution crops from his profile. Everything still unconfirmed is listed in `content.todo` in `data/content.ts`.

## Who this template is for

It's designed for an **off-plan and investment advisor**: an agent who sells developer launches (Emaar, Omniyat, Azizi…), waterfront and branded residences, and some commercial space. Their clients are mostly investors, including overseas buyers. So the site leads with:

1. **Hero:** a full-screen photo (`visuals.hero`) behind a large serif statement, his headshot with a one-line intro, and the WhatsApp call to action. Further photo slots: a band after the projects, a three-photo band before About, and the contact background (`visuals` in `content.ts`)
2. **Current projects:** a numbered index (developer, homes, status, price); each row opens a sheet with photos (or a typographic cover when there are none), facts, highlights, a WhatsApp button and a link to his post
3. **How I work:** three steps, plus short facts about buying in Dubai
4. **Recognition & activity:** press, award and events as a dated list, plus a strip of his Instagram posts
5. **About**, **FAQ**, and a closing **contact** block: a four-question brief that opens WhatsApp, and his phone number

Every WhatsApp link is prefilled with a message about that project, in the visitor's language.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/
```

`?lang=ar` opens the Arabic version directly. The visitor's choice is remembered.

## Personalising it for an agent

1. **Text:** edit `data/content.ts`. Every visible string is an `{ en, ar }` pair. Interface labels and WhatsApp message templates are in `data/ui.ts`.
   Anything not known yet can be left empty and is hidden on the page: `brn: ''`, no `email`, `languages: []`, and no `developer` or `photos` on a project. Projects can link to the agent's own post with `postUrl`.
2. **Photos:** drop the agent's photos into `public/images/`, either replacing the placeholder files (same names) or updating the paths in `content.ts`. Recommended sizes:
   - headshot: square, at least 600×600 (shown round)
   - project photos: 1600×1200, added as `photos: [...]` on a project
   - Instagram covers: 720×960

   Compress them first, e.g. with squoosh.app.
3. **Look:** pick a preset in `site.config.ts` (`paper` or `ink`) or edit `styles/theme.css`.
4. Empty `content.todo` as you confirm each item. While it isn't empty, `npm run dev` shows a yellow reminder badge (never in production builds).

## Going live

The preview is `noindex` by default. When the agent approves:

- set `preview: false` in `site.config.ts`,
- remove `<meta name="robots" content="noindex, nofollow">` from `index.html`,
- remove `public/robots.txt` (or allow crawling),
- update the `og:` tags in `index.html` with his domain and image.

The `dist/` folder is a static site: deploy it to Cloudflare Pages, Netlify, Vercel or Firebase Hosting (AI Studio can also deploy to Cloud Run).

## Quality checks done on this version

- No horizontal scroll at 320, 390, 768 or 1440px, in English and Arabic, including the project sheet.
- Lighthouse (mobile, production build): performance 97 EN / 91 AR, accessibility 100, best practices 100. SEO is lower only because the preview is deliberately `noindex`.
- WhatsApp links are URL-encoded and prefilled in the page language.
