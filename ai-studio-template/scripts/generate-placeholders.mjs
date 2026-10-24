/**
 * Generates tasteful placeholder images in public/images/ (pure SVG → JPEG via sharp).
 * Replace each file with the agent's real photo, keeping the same file name,
 * or point data/content.ts at new names.
 *
 *   npm run images             # only creates images that don't exist yet
 *   npm run images -- --force  # regenerates every placeholder (overwrites real photos!)
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/images');
fs.mkdirSync(OUT, { recursive: true });

function rng(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const tag = (w, h) =>
  `<text x="${w - 28}" y="${h - 26}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(w / 70)}" letter-spacing="3" fill="#fff" fill-opacity="0.5">PLACEHOLDER</text>`;

const defs = (sky1, sky2, sun) => `<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky1}"/><stop offset="1" stop-color="${sky2}"/></linearGradient>
  <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${sun}"/><stop offset="1" stop-color="${sun}" stop-opacity="0"/></radialGradient>
  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2633"/><stop offset="1" stop-color="#07090c"/></linearGradient>
  <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a3442"/><stop offset="0.5" stop-color="#3b4859"/><stop offset="1" stop-color="#1f2731"/></linearGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e6cf9c"/><stop offset="1" stop-color="#9d7c3f"/></linearGradient>
</defs>`;

function towers(r, { baseY, count, minH, maxH, minW, maxW, color, lights, w }) {
  let x = -30;
  let out = '';
  for (let i = 0; i < count && x < w + 30; i++) {
    const bw = minW + r() * (maxW - minW);
    const bh = minH + r() * (maxH - minH);
    const y = baseY - bh;
    out += r() > 0.75
      ? `<path d="M${x} ${baseY}V${y + bw / 2}A${bw / 2} ${bw / 2} 0 0 1 ${x + bw} ${y + bw / 2}V${baseY}Z" fill="${color}"/>`
      : `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${color}"/>`;
    if (lights) {
      for (let k = 0; k < bh / 18; k++) {
        if (r() > 0.55) out += `<rect x="${x + 6 + r() * (bw - 16)}" y="${y + 12 + k * 18}" width="5" height="7" fill="#f3d9a4" fill-opacity="${0.25 + r() * 0.6}"/>`;
      }
    }
    x += bw + 6 + r() * 24;
  }
  return out;
}

function skyline(w, h, seed, opts = {}) {
  const r = rng(seed);
  const horizon = h * (opts.horizon ?? 0.68);
  let s = defs(opts.sky1 ?? '#1a1f2b', opts.sky2 ?? '#c98b62', opts.sun ?? '#f5c08a');
  s += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  s += `<circle cx="${w * (opts.sunX ?? 0.7)}" cy="${horizon - h * 0.08}" r="${w * 0.35}" fill="url(#sun)" opacity="0.8"/>`;
  s += towers(r, { baseY: horizon, count: 60, minH: h * 0.12, maxH: h * 0.32, minW: w * 0.025, maxW: w * 0.06, color: '#2b303b', lights: false, w });
  // Spire
  const sx = w * (opts.spireX ?? 0.38);
  s += `<path d="M${sx - w * 0.03} ${horizon} L${sx - w * 0.012} ${horizon - h * 0.42} L${sx} ${horizon - h * 0.62} L${sx + w * 0.012} ${horizon - h * 0.42} L${sx + w * 0.03} ${horizon}Z" fill="#161a22"/>`;
  s += towers(r, { baseY: horizon, count: 40, minH: h * 0.18, maxH: h * 0.45, minW: w * 0.035, maxW: w * 0.08, color: '#161a22', lights: true, w });
  s += `<rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#water)"/>`;
  for (let i = 0; i < 50; i++) s += `<rect x="${r() * w}" y="${horizon + 6 + r() * (h - horizon)}" width="${20 + r() * 120}" height="2" fill="#f3d9a4" fill-opacity="${0.08 + r() * 0.25}"/>`;
  return s;
}

function svg(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}${tag(w, h)}</svg>`;
}

function portrait(w, h, variant) {
  const bg = variant === 2 ? ['#2a2620', '#0f0e0c'] : ['#3a3530', '#14120f'];
  return svg(w, h, `<defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.3" r="0.6"><stop offset="0" stop-color="#c8a96a" stop-opacity="0.35"/><stop offset="1" stop-color="#c8a96a" stop-opacity="0"/></radialGradient>
      <linearGradient id="suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b4f57"/><stop offset="1" stop-color="#2a2d33"/></linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>
    <path d="M${w * 0.12} ${h} C${w * 0.15} ${h * 0.78} ${w * 0.3} ${h * 0.7} ${w * 0.5} ${h * 0.7} C${w * 0.7} ${h * 0.7} ${w * 0.85} ${h * 0.78} ${w * 0.88} ${h}Z" fill="url(#suit)"/>
    <path d="M${w * 0.44} ${h * 0.7} L${w * 0.5} ${h * 0.86} L${w * 0.56} ${h * 0.7}Z" fill="#f1ede6"/>
    <path d="M${w * 0.485} ${h * 0.73} L${w * 0.5} ${h * 0.9} L${w * 0.515} ${h * 0.73}Z" fill="#7d6640"/>
    <rect x="${w * 0.45}" y="${h * 0.58}" width="${w * 0.1}" height="${h * 0.14}" rx="${w * 0.04}" fill="#a77d5f"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.46}" rx="${w * 0.15}" ry="${h * 0.16}" fill="#b98c6c"/>
    <path d="M${w * 0.36} ${h * 0.47} C${w * 0.37} ${h * 0.6} ${w * 0.43} ${h * 0.64} ${w * 0.5} ${h * 0.64} C${w * 0.57} ${h * 0.64} ${w * 0.63} ${h * 0.6} ${w * 0.64} ${h * 0.47} C${w * 0.6} ${h * 0.54} ${w * 0.4} ${h * 0.54} ${w * 0.36} ${h * 0.47}Z" fill="#1c1714"/>
    <path d="M${w * 0.35} ${h * 0.44} C${w * 0.33} ${h * 0.3} ${w * 0.42} ${h * 0.26} ${w * 0.51} ${h * 0.26} C${w * 0.61} ${h * 0.26} ${w * 0.68} ${h * 0.32} ${w * 0.65} ${h * 0.44} C${w * 0.62} ${h * 0.36} ${w * 0.55} ${h * 0.34} ${w * 0.5} ${h * 0.34} C${w * 0.44} ${h * 0.34} ${w * 0.38} ${h * 0.36} ${w * 0.35} ${h * 0.44}Z" fill="#1c1714"/>`);
}

function waterfrontTowers(w, h, seed, mood = 'day') {
  const r = rng(seed);
  const day = mood === 'day';
  let s = skyline(w, h, seed, day ? { sky1: '#8fb3c9', sky2: '#f1dcc0', sun: '#fff1d6', horizon: 0.74 } : { horizon: 0.74 });
  // Sculpted foreground towers
  const cols = day ? ['#e8e4dc', '#d9d3c8', '#cfc8bc'] : ['#2c3440', '#252c37', '#1f252f'];
  for (let i = 0; i < 3; i++) {
    const cx = w * (0.22 + i * 0.25) + r() * 30;
    const tw = w * 0.11;
    const top = h * (0.12 + r() * 0.12);
    s += `<path d="M${cx - tw} ${h * 0.74} C${cx - tw * 1.2} ${h * 0.45} ${cx - tw * 0.6} ${top + 40} ${cx} ${top} C${cx + tw * 0.6} ${top + 40} ${cx + tw * 1.2} ${h * 0.45} ${cx + tw} ${h * 0.74}Z" fill="${cols[i]}"/>`;
    for (let y = top + 50; y < h * 0.72; y += 22) s += `<path d="M${cx - tw * 0.8} ${y} Q${cx} ${y + 6} ${cx + tw * 0.8} ${y}" stroke="${day ? '#9fb6c6' : '#f3d9a4'}" stroke-opacity="${day ? 0.6 : 0.3}" stroke-width="3" fill="none"/>`;
  }
  return svg(w, h, s);
}

function marina(w, h, seed) {
  const r = rng(seed);
  let s = skyline(w, h, seed, { sky1: '#6f8fae', sky2: '#f0d2b0', sun: '#ffe7c4', horizon: 0.6, spireX: 0.8 });
  for (let i = 0; i < 7; i++) {
    const bx = w * 0.05 + i * w * 0.14 + r() * 20;
    const by = h * (0.72 + (i % 2) * 0.08);
    s += `<path d="M${bx} ${by} h${w * 0.11} l-${w * 0.018} ${h * 0.03} h-${w * 0.075}z" fill="#f8f6f2"/><rect x="${bx + w * 0.03}" y="${by - h * 0.025}" width="${w * 0.045}" height="${h * 0.025}" rx="6" fill="#e9e5de"/><rect x="${bx + w * 0.05}" y="${by - h * 0.1}" width="3" height="${h * 0.075}" fill="#f8f6f2"/>`;
  }
  s += `<rect y="${h * 0.9}" width="${w}" height="${h * 0.1}" fill="#c9b79a"/>`;
  return svg(w, h, s);
}

function midrise(w, h, seed) {
  const r = rng(seed);
  let s = defs('#9fc0d6', '#f3e3cc', '#fff3dc');
  s += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  const bx = w * 0.2;
  const bw = w * 0.6;
  const top = h * 0.12;
  s += `<rect x="${bx}" y="${top}" width="${bw}" height="${h * 0.7}" fill="#efe9e0"/>`;
  for (let y = top + 30; y < h * 0.78; y += 46) {
    s += `<rect x="${bx}" y="${y}" width="${bw}" height="8" fill="#d8cfc1"/>`;
    for (let x = bx + 24; x < bx + bw - 40; x += 70) s += `<rect x="${x}" y="${y + 14}" width="44" height="26" fill="#6e8aa0" fill-opacity="${0.6 + r() * 0.3}"/>`;
  }
  s += `<rect y="${h * 0.82}" width="${w}" height="${h * 0.18}" fill="#7da6b8"/>`;
  s += `<rect y="${h * 0.9}" width="${w}" height="${h * 0.1}" fill="#e6dccb"/>`;
  for (let i = 0; i < 6; i++) s += `<circle cx="${w * 0.08 + i * w * 0.17}" cy="${h * 0.8}" r="${w * 0.035}" fill="#4e6b52"/>`;
  return svg(w, h, s);
}

function offices(w, h, seed) {
  const r = rng(seed);
  let s = skyline(w, h, seed, { sky1: '#202838', sky2: '#6f86a3', sun: '#c9d6e6', horizon: 0.86, spireX: 0.15 });
  for (let i = 0; i < 3; i++) {
    const x = w * (0.28 + i * 0.22);
    const tw = w * 0.16;
    const top = h * (0.08 + r() * 0.1);
    s += `<rect x="${x}" y="${top}" width="${tw}" height="${h * 0.86 - top}" fill="url(#glass)"/>`;
    for (let y = top + 10; y < h * 0.86; y += 16) s += `<rect x="${x}" y="${y}" width="${tw}" height="2" fill="#9fb3c8" fill-opacity="0.25"/>`;
    for (let k = 0; k < 40; k++) s += `<rect x="${x + r() * (tw - 10)}" y="${top + r() * (h * 0.78 - top)}" width="8" height="10" fill="#f6e2b8" fill-opacity="${r() * 0.6}"/>`;
  }
  s += `<rect y="${h * 0.86}" width="${w}" height="${h * 0.14}" fill="#0d1016"/>`;
  for (let i = 0; i < 30; i++) s += `<rect x="${r() * w}" y="${h * 0.9 + r() * h * 0.06}" width="${30 + r() * 60}" height="3" fill="${r() > 0.5 ? '#f5c08a' : '#e35b4f'}" fill-opacity="0.7"/>`;
  return svg(w, h, s);
}

function interior(w, h, seed, kind) {
  const r = rng(seed);
  const view = skyline(w, h, seed + 3, { sky1: '#9fbad0', sky2: '#f2dfc4', sun: '#fff1d6' });
  let s = `<defs><clipPath id="win"><rect x="${w * 0.08}" y="${h * 0.08}" width="${w * 0.84}" height="${h * 0.52}"/></clipPath></defs>`;
  s += `<rect width="${w}" height="${h}" fill="#e9e3d9"/>`;
  s += `<g clip-path="url(#win)">${view}</g>`;
  s += `<rect x="${w * 0.08}" y="${h * 0.08}" width="${w * 0.84}" height="${h * 0.52}" fill="none" stroke="#2b2622" stroke-width="10"/>`;
  s += `<path d="M${w * 0.5} ${h * 0.08}v${h * 0.52}" stroke="#2b2622" stroke-width="8"/>`;
  s += `<rect y="${h * 0.78}" width="${w}" height="${h * 0.22}" fill="#c7b394"/>`;
  if (kind === 'kitchen') {
    s += `<rect y="${h * 0.62}" width="${w}" height="${h * 0.04}" fill="#f4f0ea"/><rect y="${h * 0.66}" width="${w}" height="${h * 0.2}" fill="#3b3631"/>`;
    for (let i = 0; i < 6; i++) s += `<rect x="${i * w * 0.17 + 10}" y="${h * 0.68}" width="${w * 0.15}" height="${h * 0.16}" fill="#47413b"/>`;
  } else {
    s += `<rect x="${w * 0.15}" y="${h * 0.66}" width="${w * 0.48}" height="${h * 0.12}" rx="24" fill="#8d8172"/><rect x="${w * 0.13}" y="${h * 0.62}" width="${w * 0.52}" height="${h * 0.08}" rx="30" fill="#a69a8a"/>`;
    s += `<rect x="${w * 0.7}" y="${h * 0.7}" width="${w * 0.18}" height="12" rx="6" fill="#5a4f45"/><circle cx="${w * 0.79}" cy="${h * 0.68}" r="${w * 0.015 + r() * 4}" fill="#c8a96a"/>`;
  }
  return svg(w, h, s);
}

function certificate(w, h, title) {
  return svg(w, h, `${defs('#1a1a1a', '#0d0d0d', '#c8a96a')}
    <rect width="${w}" height="${h}" fill="#141414"/>
    <rect x="${w * 0.1}" y="${h * 0.1}" width="${w * 0.8}" height="${h * 0.8}" fill="#f6f1e6"/>
    <rect x="${w * 0.13}" y="${h * 0.13}" width="${w * 0.74}" height="${h * 0.74}" fill="none" stroke="url(#gold)" stroke-width="6"/>
    <circle cx="${w * 0.5}" cy="${h * 0.32}" r="${w * 0.08}" fill="url(#gold)"/>
    <text x="${w / 2}" y="${h * 0.5}" text-anchor="middle" font-family="Georgia, serif" font-size="${w * 0.07}" fill="#2a2418">${title}</text>
    ${[0.58, 0.63, 0.68].map((y, i) => `<rect x="${w * (0.25 + i * 0.03)}" y="${h * y}" width="${w * (0.5 - i * 0.06)}" height="6" fill="#cfc6b4"/>`).join('')}
    <path d="M${w * 0.6} ${h * 0.78} q${w * 0.05} -${h * 0.04} ${w * 0.12} 0" stroke="#2a2418" stroke-width="3" fill="none"/>`);
}

function magazine(w, h) {
  const inner = portrait(w, h, 2).replace(/^<svg[^>]*>|<\/svg>$/g, '').replace(tag(w, h), '');
  return svg(w, h, `${inner}
    <text x="${w * 0.08}" y="${h * 0.14}" font-family="Georgia, serif" font-size="${w * 0.16}" font-weight="bold" fill="#f6f1e6" letter-spacing="4">ESTATE</text>
    <rect x="${w * 0.08}" y="${h * 0.16}" width="${w * 0.84}" height="4" fill="#c8a96a"/>`);
}

function expo(w, h, seed) {
  const r = rng(seed);
  let s = defs('#120f0c', '#2b2117', '#c8a96a');
  s += `<rect width="${w}" height="${h}" fill="url(#sky)"/>`;
  for (let i = 0; i < 14; i++) s += `<circle cx="${r() * w}" cy="${r() * h * 0.4}" r="${20 + r() * 60}" fill="url(#sun)" opacity="0.35"/>`;
  s += `<rect x="${w * 0.15}" y="${h * 0.35}" width="${w * 0.7}" height="${h * 0.35}" fill="#1d1813" stroke="#c8a96a" stroke-width="3"/>`;
  s += `<text x="${w / 2}" y="${h * 0.55}" text-anchor="middle" font-family="Georgia, serif" font-size="${w * 0.07}" fill="#e6cf9c" letter-spacing="6">${seed % 2 ? 'OPEN HOUSE' : 'ROADSHOW'}</text>`;
  s += `<rect y="${h * 0.8}" width="${w}" height="${h * 0.2}" fill="#0b0907"/>`;
  for (let i = 0; i < 18; i++) s += `<ellipse cx="${r() * w}" cy="${h * 0.86 + r() * h * 0.08}" rx="${w * 0.02}" ry="${h * 0.06}" fill="#000" opacity="0.7"/>`;
  return svg(w, h, s);
}

const FORCE = process.argv.includes('--force');

async function write(name, markup, width) {
  // Never overwrite a real photo that was dropped in with a placeholder's name.
  if (!FORCE && fs.existsSync(path.join(OUT, name))) return;
  await sharp(Buffer.from(markup)).resize({ width }).jpeg({ quality: 74, mozjpeg: true }).toFile(path.join(OUT, name));
  console.log(`  public/images/${name}`);
}

const L = [1600, 1200];
const P = [900, 1125];
const R = [720, 1120];

console.log('Generating placeholder images…');
await write('hero.jpg', svg(1920, 1200, skyline(1920, 1200, 7)), 1920);
await write('og.jpg', svg(1200, 630, skyline(1200, 630, 9)), 1200);
await write('portrait.jpg', portrait(...P, 1), P[0]);
await write('portrait-2.jpg', portrait(...P, 2), P[0]);
await write('project-arancia-1.jpg', midrise(...L, 11), L[0]);
await write('project-arancia-2.jpg', interior(...L, 12, 'living'), L[0]);
await write('project-arancia-3.jpg', interior(...L, 13, 'kitchen'), L[0]);
await write('project-hermina-1.jpg', waterfrontTowers(...L, 14, 'day'), L[0]);
await write('project-hermina-2.jpg', waterfrontTowers(...L, 15, 'night'), L[0]);
await write('project-hermina-3.jpg', interior(...L, 16, 'living'), L[0]);
await write('project-rashid-1.jpg', marina(...L, 21), L[0]);
await write('project-rashid-2.jpg', marina(...L, 22), L[0]);
await write('project-rashid-3.jpg', interior(...L, 23, 'living'), L[0]);
await write('project-riviera-1.jpg', interior(...L, 31, 'living'), L[0]);
await write('project-riviera-2.jpg', interior(...L, 32, 'kitchen'), L[0]);
await write('project-riviera-3.jpg', midrise(...L, 33), L[0]);
await write('project-offices-1.jpg', offices(...L, 41), L[0]);
await write('project-offices-2.jpg', offices(...L, 42), L[0]);
await write('project-offices-3.jpg', interior(...L, 43, 'living'), L[0]);
await write('award-1.jpg', certificate(800, 1000, 'AWARD'), 800);
await write('award-2.jpg', certificate(800, 1000, 'CERTIFICATE'), 800);
await write('award-3.jpg', certificate(800, 1000, 'BEST DEALS'), 800);
await write('press-1.jpg', magazine(800, 1000), 800);
await write('event-1.jpg', expo(800, 600, 2), 800);
await write('event-2.jpg', expo(800, 600, 3), 800);
await write('reel-1.jpg', waterfrontTowers(...R, 51, 'night'), R[0]);
await write('reel-2.jpg', marina(...R, 52), R[0]);
await write('reel-3.jpg', offices(...R, 53), R[0]);
await write('reel-4.jpg', interior(...R, 54, 'kitchen'), R[0]);
await write('reel-5.jpg', svg(...R, skyline(...R, 55, { horizon: 0.62 })), R[0]);
await write('reel-6.jpg', midrise(...R, 56), R[0]);
