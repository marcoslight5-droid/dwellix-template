/**
 * Generates the tasteful placeholder photos used by agents/sample.json.
 * Pure SVG rendered to JPEG with sharp, so no network access is needed.
 *
 *   npm run generate:samples
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('agents/sample');
const W = 1600;
const H = 1200;

type Palette = { skyTop: string; skyBottom: string; sun: string; far: string; near: string; ground: string; water?: string };

const palettes: Record<string, Palette> = {
  marina: { skyTop: '#c9d7e3', skyBottom: '#f3e6d6', sun: '#f7d6a8', far: '#9fb1c2', near: '#5d7286', ground: '#3f5264', water: '#7f9db5' },
  downtown: { skyTop: '#e9c9a9', skyBottom: '#f7ece0', sun: '#fbe3bf', far: '#c7a98c', near: '#8a6f5a', ground: '#5e4a3d' },
  jvc: { skyTop: '#d5e3dc', skyBottom: '#f5efe4', sun: '#f4dfb6', far: '#b5c4b8', near: '#7d9483', ground: '#4f6656' },
  palm: { skyTop: '#bcd9e4', skyBottom: '#f6ead8', sun: '#fbe0b0', far: '#d8c7ad', near: '#a68e6e', ground: '#e8dcc6', water: '#6fa3b8' },
  bay: { skyTop: '#2f3b52', skyBottom: '#c98d6b', sun: '#f2b183', far: '#4a5670', near: '#283246', ground: '#1c2333', water: '#3c4a66' },
};

// Deterministic pseudo-random so re-running produces identical files.
function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

const label = `<text x="${W - 40}" y="${H - 36}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="3" fill="#ffffff" fill-opacity="0.55">SAMPLE IMAGE</text>`;

function sky(p: Palette, sunX = 1180, sunY = 380) {
  return `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.skyTop}"/><stop offset="1" stop-color="${p.skyBottom}"/></linearGradient>
    <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${p.sun}" stop-opacity="1"/><stop offset="1" stop-color="${p.sun}" stop-opacity="0"/></radialGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.water ?? p.far}"/><stop offset="1" stop-color="${p.ground}"/></linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0.18"/><stop offset="0.5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0.08"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <circle cx="${sunX}" cy="${sunY}" r="420" fill="url(#sun)"/>
  <circle cx="${sunX}" cy="${sunY}" r="70" fill="${p.sun}"/>`;
}

function towers(r: () => number, color: string, baseY: number, count: number, minH: number, maxH: number, minW = 60, maxW = 140, windows = false) {
  let x = -40;
  let out = '';
  for (let i = 0; i < count && x < W + 40; i++) {
    const w = minW + r() * (maxW - minW);
    const h = minH + r() * (maxH - minH);
    const y = baseY - h;
    const rounded = r() > 0.7;
    out += rounded
      ? `<path d="M${x} ${baseY} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${baseY} Z" fill="${color}"/>`
      : `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${color}"/>`;
    if (r() > 0.8) out += `<rect x="${x + w / 2 - 2}" y="${y - 60}" width="4" height="60" fill="${color}"/>`;
    if (windows) {
      for (let wy = y + 30; wy < baseY - 20; wy += 34) {
        out += `<rect x="${x + 10}" y="${wy}" width="${w - 20}" height="3" fill="#ffffff" fill-opacity="0.12"/>`;
      }
    }
    x += w + 8 + r() * 30;
  }
  return out;
}

function palmTree(x: number, y: number, s: number, color: string) {
  let fronds = '';
  for (let a = -150; a <= -30; a += 24) {
    const rad = (a * Math.PI) / 180;
    const ex = x + Math.cos(rad) * 120 * s;
    const ey = y + Math.sin(rad) * 60 * s + 40 * s;
    fronds += `<path d="M${x} ${y} Q${(x + ex) / 2} ${y - 50 * s} ${ex} ${ey}" stroke="${color}" stroke-width="${14 * s}" fill="none" stroke-linecap="round"/>`;
  }
  return `<path d="M${x} ${y} Q${x - 20 * s} ${y + 200 * s} ${x + 10 * s} ${y + 380 * s}" stroke="${color}" stroke-width="${16 * s}" fill="none"/>${fronds}`;
}

function exterior(kind: keyof typeof palettes, seed: number) {
  const p = palettes[kind];
  const r = rng(seed);
  let body = sky(p, 300 + r() * 1000, 300 + r() * 150);
  if (kind === 'marina') {
    body += towers(r, p.far, 820, 30, 250, 560);
    body += towers(r, p.near, 860, 22, 300, 640, 80, 150, true);
    body += `<rect y="860" width="${W}" height="${H - 860}" fill="url(#water)"/>`;
    for (let i = 0; i < 6; i++) {
      const bx = 120 + i * 250 + r() * 60;
      body += `<path d="M${bx} 960 h150 l-25 26 h-110 z" fill="#ffffff" fill-opacity="0.85"/><rect x="${bx + 70}" y="900" width="4" height="60" fill="#ffffff" fill-opacity="0.8"/>`;
    }
    for (let i = 0; i < 14; i++) body += `<rect x="${r() * W}" y="${880 + r() * 300}" width="${80 + r() * 200}" height="3" fill="#ffffff" fill-opacity="0.18"/>`;
  } else if (kind === 'downtown') {
    body += towers(r, p.far, 900, 34, 160, 420);
    body += `<path d="M760 900 L790 300 L805 120 L812 20 L819 120 L834 300 L864 900 Z" fill="${p.near}"/>`;
    body += towers(r, p.near, 960, 20, 120, 360, 90, 170, true);
    body += `<rect y="960" width="${W}" height="${H - 960}" fill="${p.ground}"/>`;
    body += `<rect x="0" y="1010" width="${W}" height="40" fill="#ffffff" fill-opacity="0.08"/>`;
  } else if (kind === 'jvc') {
    body += towers(r, p.far, 860, 30, 120, 300, 100, 180);
    body += towers(r, p.near, 920, 14, 160, 280, 160, 260, true);
    body += `<rect y="920" width="${W}" height="${H - 920}" fill="${p.ground}"/>`;
    for (let i = 0; i < 16; i++) {
      const tx = r() * W;
      body += `<circle cx="${tx}" cy="${930 + r() * 40}" r="${40 + r() * 40}" fill="#3f5a48"/>`;
    }
    body += `<rect y="1000" width="${W}" height="${H - 1000}" fill="#e6dccb"/>`;
  } else if (kind === 'palm') {
    body += `<rect y="700" width="${W}" height="${H - 700}" fill="url(#water)"/>`;
    body += `<path d="M0 860 Q400 820 800 850 T1600 840 V${H} H0 Z" fill="${p.ground}"/>`;
    // Villa
    body += `<rect x="520" y="560" width="620" height="300" fill="#f8f3ea"/><rect x="460" y="540" width="740" height="26" fill="#efe6d6"/>`;
    body += `<rect x="600" y="620" width="180" height="240" fill="${p.water}" fill-opacity="0.7"/><rect x="820" y="620" width="260" height="160" fill="${p.water}" fill-opacity="0.7"/>`;
    body += `<rect x="440" y="860" width="780" height="40" fill="#78b4c8"/>`;
    body += palmTree(300, 480, 1.1, '#56704f') + palmTree(1330, 460, 1.2, '#4c6646') + palmTree(1480, 560, 0.8, '#5b7552');
  } else if (kind === 'bay') {
    body += towers(r, p.far, 820, 30, 260, 600);
    body += towers(r, p.near, 860, 20, 300, 700, 90, 170, true);
    body += `<rect y="860" width="${W}" height="${H - 860}" fill="url(#water)"/>`;
    for (let i = 0; i < 40; i++) body += `<rect x="${r() * W}" y="${870 + r() * 320}" width="${20 + r() * 120}" height="3" fill="${p.sun}" fill-opacity="${0.15 + r() * 0.35}"/>`;
    for (let i = 0; i < 120; i++) body += `<rect x="${r() * W}" y="${200 + r() * 640}" width="6" height="8" fill="${p.sun}" fill-opacity="${r() * 0.7}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}<rect width="${W}" height="${H}" fill="url(#shade)"/>${label}</svg>`;
}

function interior(kind: keyof typeof palettes, room: 'living' | 'bedroom' | 'kitchen', seed: number) {
  const p = palettes[kind];
  const r = rng(seed);
  const wall = kind === 'bay' ? '#e9e4dc' : '#f3eee6';
  const floor = kind === 'palm' ? '#d9cbb3' : '#c9b79c';
  const view = `<g clip-path="url(#win)">${exterior(kind, seed + 7).replace(/^<svg[^>]*>|<\/svg>$/g, '').replace(label, '')}</g>`;
  let furniture = '';
  if (room === 'living') {
    furniture = `
      <rect x="260" y="820" width="760" height="150" rx="30" fill="#8d8172"/>
      <rect x="230" y="760" width="820" height="110" rx="40" fill="#a69a8a"/>
      <rect x="1120" y="880" width="260" height="20" rx="10" fill="#5a4f45"/>
      <rect x="1140" y="900" width="10" height="90" fill="#5a4f45"/><rect x="1350" y="900" width="10" height="90" fill="#5a4f45"/>
      <ellipse cx="800" cy="1080" rx="560" ry="70" fill="#000" fill-opacity="0.06"/>
      <circle cx="1250" cy="860" r="22" fill="#d6c3a3"/>`;
  } else if (room === 'bedroom') {
    furniture = `
      <rect x="300" y="640" width="900" height="200" rx="20" fill="#6f655b"/>
      <rect x="260" y="820" width="980" height="200" rx="24" fill="#f8f5f0"/>
      <rect x="260" y="880" width="980" height="140" rx="24" fill="#d9cfc2"/>
      <rect x="340" y="760" width="260" height="90" rx="30" fill="#ffffff"/><rect x="900" y="760" width="260" height="90" rx="30" fill="#ffffff"/>
      <rect x="1300" y="820" width="160" height="200" fill="#8b7b6a"/>
      <path d="M1340 820 l40 -120 l40 120 z" fill="#e8dcc8"/>`;
  } else {
    furniture = `
      <rect x="0" y="780" width="${W}" height="40" fill="#eae4da"/>
      <rect x="0" y="820" width="${W}" height="250" fill="#5c5249"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${i * 230 + 10}" y="840" width="210" height="210" fill="#665b51"/><rect x="${i * 230 + 95}" y="860" width="40" height="5" fill="#c9b79c"/>`).join('')}
      <rect x="420" y="700" width="140" height="80" rx="6" fill="#d8d1c6"/>
      ${[0, 1, 2].map((i) => `<path d="M${560 + i * 200} 150 v170" stroke="#3d3630" stroke-width="3"/><path d="M${520 + i * 200} 380 q40 -70 80 0 z" fill="#c8a46a"/>`).join('')}`;
  }
  const winX = room === 'kitchen' ? 1000 : 160;
  const winW = room === 'kitchen' ? 520 : 1280;
  const winY = room === 'kitchen' ? 140 : 120;
  const winH = room === 'kitchen' ? 560 : 560;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs><clipPath id="win"><rect x="${winX}" y="${winY}" width="${winW}" height="${winH}"/></clipPath>
      <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${floor}"/><stop offset="1" stop-color="#a8977d"/></linearGradient>
      <linearGradient id="light" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.35"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="${wall}"/>
    <g transform="translate(0 0)">${view}</g>
    <rect x="${winX}" y="${winY}" width="${winW}" height="${winH}" fill="none" stroke="#2f2a26" stroke-width="10"/>
    ${room !== 'kitchen' ? `<path d="M${winX + winW / 2} ${winY} v${winH}" stroke="#2f2a26" stroke-width="8"/>` : ''}
    <rect y="1000" width="${W}" height="${H - 1000}" fill="url(#floorG)"/>
    <path d="M${winX} 1000 L${winX - 120} ${H} H${winX + winW + 120} L${winX + winW} 1000 Z" fill="url(#light)"/>
    ${furniture}
    <rect x="${80 + r() * 40}" y="${520 + r() * 40}" width="40" height="${480}" fill="#e2d8c9" fill-opacity="0.6"/>
    ${label}
  </svg>`;
  return svg;
}

function portrait() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1500" viewBox="0 0 1200 1500">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e9dfd2"/><stop offset="1" stop-color="#cdbba5"/></linearGradient>
      <linearGradient id="coat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3632"/><stop offset="1" stop-color="#24211f"/></linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.35" r="0.6"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1200" height="1500" fill="url(#bg)"/>
    <rect width="1200" height="1500" fill="url(#glow)"/>
    <path d="M200 1500 C220 1180 380 1060 600 1060 C820 1060 980 1180 1000 1500 Z" fill="url(#coat)"/>
    <path d="M520 1060 L600 1240 L680 1060 Z" fill="#efe7dc"/>
    <path d="M330 760 C330 470 460 380 600 380 C740 380 870 470 870 760 C870 900 860 1010 820 1080 L380 1080 C340 1010 330 900 330 760 Z" fill="#2c2420"/>
    <rect x="545" y="900" width="110" height="180" rx="40" fill="#b88f70"/>
    <ellipse cx="600" cy="730" rx="190" ry="235" fill="#c39a7a"/>
    <path d="M405 700 C420 540 520 480 640 490 C740 500 800 560 800 680 C740 600 640 560 520 600 C470 620 430 660 405 700 Z" fill="#2c2420"/>
    <text x="1160" y="1460" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="3" fill="#ffffff" fill-opacity="0.6">SAMPLE PORTRAIT</text>
  </svg>`;
}

async function write(name: string, svg: string, width = W) {
  await sharp(Buffer.from(svg)).resize({ width }).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, name));
  console.log(`  agents/sample/${name}`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  console.log('Generating sample images…');
  await write('agent.jpg', portrait(), 1200);
  const sets: [string, keyof typeof palettes, ('ext' | 'living' | 'bedroom' | 'kitchen')[]][] = [
    ['marina', 'marina', ['ext', 'living', 'bedroom', 'kitchen']],
    ['downtown', 'downtown', ['ext', 'living', 'bedroom']],
    ['jvc', 'jvc', ['living', 'ext', 'kitchen']],
    ['palm', 'palm', ['ext', 'living', 'bedroom', 'kitchen']],
    ['bay', 'bay', ['ext', 'living', 'bedroom', 'kitchen']],
  ];
  let seed = 11;
  for (const [prefix, kind, shots] of sets) {
    for (const [i, shot] of shots.entries()) {
      seed += 13;
      const svg = shot === 'ext' ? exterior(kind, seed) : interior(kind, shot, seed);
      await write(`${prefix}-${i + 1}.jpg`, svg);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
