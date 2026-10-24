import { spawn, spawnSync, type ChildProcess, type SpawnOptions } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

/** Absolute path of a package's CLI entry, so we can run it with `node` (cross-platform, killable). */
export function binPath(pkg: string, bin = pkg): string {
  const pkgJsonPath = require.resolve(`${pkg}/package.json`);
  const pkgJson = require(pkgJsonPath);
  const rel = typeof pkgJson.bin === 'string' ? pkgJson.bin : pkgJson.bin[bin];
  return path.join(path.dirname(pkgJsonPath), rel);
}

export function startNode(script: string, args: string[], options: SpawnOptions = {}): ChildProcess {
  return spawn(process.execPath, [script, ...args], { stdio: 'inherit', ...options });
}

/** Runs a node CLI to completion. Resolves with captured output when `capture` is set. */
export function runNode(script: string, args: string[], options: SpawnOptions & { capture?: boolean } = {}): Promise<string> {
  const { capture, ...rest } = options;
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...args], { stdio: capture ? ['inherit', 'pipe', 'pipe'] : 'inherit', ...rest });
    let out = '';
    child.stdout?.on('data', (d) => {
      out += d;
      process.stdout.write(d);
    });
    child.stderr?.on('data', (d) => {
      out += d;
      process.stderr.write(d);
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve(out);
      else reject(Object.assign(new Error(`${path.basename(script)} ${args[0] ?? ''} exited with code ${code}`), { output: out }));
    });
  });
}

export function hasCommand(cmd: string): boolean {
  const r = spawnSync(cmd, ['-version'], { stdio: 'ignore' });
  return r.status === 0;
}

export function requireCloudflareEnv() {
  const missing = ['CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID'].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`\n✖ Missing ${missing.join(' and ')}. Add them to .env (see .env.example) or export them.\n`);
    process.exit(1);
  }
}

export const PAGES_PROJECT = process.env.PAGES_PROJECT || 'dwellix-previews';
export const PREVIEW_DOMAIN = process.env.PREVIEW_DOMAIN || 'dwellix.site';
