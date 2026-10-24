/**
 * Validates one agent file (or all of them) without building.
 *
 *   npm run validate -- <slug>
 *   npm run validate            # every agents/*.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadAgent, AGENTS_DIR } from '../src/lib/load-agent';

const slugs = process.argv[2]
  ? [process.argv[2]]
  : fs.readdirSync(AGENTS_DIR).filter((f) => f.endsWith('.json')).map((f) => path.basename(f, '.json'));

let failed = false;
for (const slug of slugs) {
  try {
    const { agent, listings } = loadAgent(slug);
    console.log(`✓ agents/${slug}.json (${agent.name.en}, ${listings.length} listings)`);
  } catch (err) {
    failed = true;
    console.error(`✖ ${(err as Error).message}`);
  }
}
process.exit(failed ? 1 : 0);
