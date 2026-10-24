import { defineConfig } from 'astro/config';
import 'dotenv/config';
import { loadAgent, agentSlug, AgentValidationError } from './src/lib/load-agent';

const slug = agentSlug();

// Fail fast with a readable message before Astro starts building.
try {
  loadAgent(slug);
} catch (err) {
  if (err instanceof AgentValidationError) {
    console.error(`\n✖ ${err.message}\n`);
    process.exit(1);
  }
  throw err;
}

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || `https://${slug}.dwellix.site`,
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
