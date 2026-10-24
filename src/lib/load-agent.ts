import fs from 'node:fs';
import path from 'node:path';
import { agentFileSchema, type AgentFile } from './schema';

export const AGENTS_DIR = path.resolve(process.cwd(), 'agents');

export class AgentValidationError extends Error {}

export function agentSlug(): string {
  return (process.env.AGENT || 'sample').trim();
}

/**
 * Reads and validates agents/<slug>.json. Throws an AgentValidationError with a
 * readable, multi-line message if anything is wrong (including missing photos).
 */
export function loadAgent(slug: string = agentSlug()): AgentFile {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new AgentValidationError(`Invalid agent slug "${slug}". Use lowercase letters, digits and dashes (it becomes a subdomain).`);
  }
  const file = path.join(AGENTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) {
    throw new AgentValidationError(`Agent file not found: agents/${slug}.json`);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new AgentValidationError(`agents/${slug}.json is not valid JSON: ${(err as Error).message}`);
  }

  const result = agentFileSchema.safeParse(raw);
  const problems: string[] = [];
  if (!result.success) {
    for (const issue of result.error.issues) {
      problems.push(`  • ${issue.path.join('.') || '(root)'}: ${issue.message}`);
    }
  } else {
    const images = [
      ['agent.photo', result.data.agent.photo],
      ...result.data.listings.flatMap((l, i) => l.photos.map((p, j) => [`listings.${i}.photos.${j}`, p])),
    ];
    for (const [where, rel] of images) {
      if (!fs.existsSync(path.join(AGENTS_DIR, rel))) problems.push(`  • ${where}: file not found: agents/${rel}`);
    }
  }

  if (problems.length) {
    throw new AgentValidationError(`agents/${slug}.json is invalid:\n${problems.join('\n')}`);
  }
  return result.data!;
}
