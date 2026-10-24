import type { ImageMetadata } from 'astro';

// Lazy importers so only the photos of the selected agent end up in the build.
const files = import.meta.glob<{ default: ImageMetadata }>('/agents/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}');

/** Resolves a photo path from the JSON ("sample/marina-1.jpg") to Astro image metadata. */
export async function resolveImage(rel: string): Promise<ImageMetadata> {
  const importer = files[`/agents/${rel}`];
  if (!importer) throw new Error(`Image not found: agents/${rel}`);
  return (await importer()).default;
}
