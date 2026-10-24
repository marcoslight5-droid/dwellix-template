# Redesigning this site in Google AI Studio

This project is a standard **React + TypeScript + Vite** app, the same shape as the apps Google AI Studio's Build mode creates. It is organised so an AI can restyle it safely:

| What | Where | AI should… |
| --- | --- | --- |
| Every word on the site (EN + AR) | `data/content.ts`, `data/ui.ts` | leave alone unless asked to change copy |
| Colours, fonts, radii, spacing | `styles/theme.css` (2 presets: `paper`, `ink`) | change freely |
| Layout and component styling | `styles/global.css` | change freely |
| Section markup | `components/*.tsx` | change structure, keep reading text from `content` / `s` |
| Section order | `App.tsx` | reorder, remove or add sections |
| Theme preset, language, preview mode | `site.config.ts` | switch values |

## Getting it into AI Studio

1. Put this folder in its own GitHub repository, with `index.html`, `package.json` and `metadata.json` at the top level. That is the layout AI Studio's own apps use.
2. Open [AI Studio → Build](https://aistudio.google.com/apps), click **+** in the prompt box, choose **Import from GitHub**, and pick the repository.
3. Before your first change, paste the **project rules** below into the prompt (or into the app's system instructions if your AI Studio version has them).

You can also run it locally: `npm install`, `npm run dev`, then open http://localhost:3000.

## Project rules (paste this first)

```
You are editing a bilingual (English/Arabic) real estate agent website.
Rules:
1. Never hard-code visible text in components. All text comes from data/content.ts
   (agent content, { en, ar } pairs) and data/ui.ts (interface labels, both languages).
   If you add text, add it to those files in BOTH English and Arabic.
2. Style only with the CSS variables in styles/theme.css. To change the look, edit
   or add a [data-theme] preset there and select it in site.config.ts.
3. Use CSS logical properties only (margin-inline-start, padding-inline, inset-inline-end,
   text-align: start/end). Never use left/right, so Arabic (RTL) mirrors correctly.
4. Keep numbers and prices in Western digits.
5. Keep every WhatsApp button using components/WhatsAppButton.tsx with a prefilled
   message from data/ui.ts.
6. Mobile first: the site must work at 320px wide with no horizontal scrolling.
7. Do not add UI libraries or Tailwind; plain CSS only. Keep images in public/images/.
8. Keep the robots noindex tag in index.html while siteConfig.preview is true.
```

## Redesign prompts that work well

- "Switch to the dark `ink` preset in site.config.ts and make the hero headline one size smaller."
- "Create a new theme preset called `desert` in styles/theme.css: warm sand background, terracotta accent, deep brown text. Select it in site.config.ts."
- "Turn the hero into a full-screen video-style layout: the portrait as a large image on the inline-end side, name and tagline overlaid at the bottom. Keep all text from content.ts."
- "Turn the project index into large image cards once projects have `photos`, keeping the numbered rows on phones."
- "Move the Recognition & activity section above How I work."
- "Use Playfair Display for headings and Inter for body text (Arabic: keep IBM Plex Sans Arabic). Update index.html and styles/theme.css."
- "Add a 'Market insights' section after Invest with three article cards. Add the content to data/content.ts in English and Arabic."

After any redesign, check the Arabic version (language toggle top right, or add `?lang=ar` to the URL) and a 320px-wide phone view.
