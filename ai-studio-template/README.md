# Dwellix agent site: AI Studio template

A premium, bilingual (English / Arabic) website template for Dubai real estate agents, built as a **React + TypeScript + Vite** app so it can be imported into **Google AI Studio** and redesigned with prompts. See [AI_STUDIO.md](./AI_STUDIO.md) for the import steps, the rules to give the AI, and example redesign prompts.

The current content is a **pitch preview** for [@dubairealtorzubayr](https://www.instagram.com/dubairealtorzubayr/). It's drafted from his public Instagram, and everything still unconfirmed is listed in `content.todo` in `data/content.ts`.

## Who this template is for

It's designed for an **off-plan and investment advisor**: an agent who sells developer launches (Emaar, Omniyat, Azizi…), waterfront and branded residences, and some commercial space. Their clients are mostly investors, including overseas buyers. So the site leads with:

1. **Hero:** name, role, tagline, WhatsApp "Book a consultation", portrait with agency and RERA BRN, key stats
2. **Specialities:** off-plan launches, investor consultations, waterfront & branded living, commercial; developer row
3. **Projects:** filterable cards (Off-plan / Ready / Commercial / Waterfront) that open a detail sheet (`#/project/<id>`) with a swipeable gallery, facts, highlights and a "Request brochure & payment plan" WhatsApp button
4. **Investor relations:** why invest in Dubai, a rental-yield calculator, and a consultation form that sends a structured WhatsApp message
5. **Recognition:** awards and certificates, press feature, events (Property Expo, open houses)
6. **Instagram:** reels grid linking to his posts
7. **About**, **FAQ** (buying in Dubai) and **Contact** (WhatsApp, call, email, Instagram, office)

Every WhatsApp link is prefilled with a message about that project, in the visitor's language.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/
npm run images     # regenerate the placeholder images in public/images/
```

`?lang=ar` opens the Arabic version directly. The visitor's choice is remembered.

## Personalising it for an agent

1. **Text:** edit `data/content.ts`. Every visible string is an `{ en, ar }` pair. Interface labels and WhatsApp message templates are in `data/ui.ts`.
2. **Photos:** drop the agent's photos into `public/images/`, either replacing the placeholder files (same names) or updating the paths in `content.ts`. Recommended sizes:
   - portrait: 900×1125 (4:5)
   - project photos: 1600×1200
   - reels: 720×1120
   - hero background: 1920×1200

   Compress them first, e.g. with squoosh.app.
3. **Look:** pick a preset in `site.config.ts` (`noir`, `ivory`, `marina`) or edit `styles/theme.css`.
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
