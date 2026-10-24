import { content } from '../data/content';

/** Full-width photo between sections. */
export function ImageBand() {
  const src = content.visuals.band;
  if (!src) return null;
  return (
    <div className="image-band" aria-hidden="true">
      <img src={src} alt="" loading="lazy" decoding="async" />
    </div>
  );
}

/** Three photos side by side (scrolls sideways on phones). */
export function Gallery() {
  const photos = content.visuals.gallery ?? [];
  if (photos.length === 0) return null;
  return (
    <div className="gallery-band" aria-hidden="true">
      {photos.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" decoding="async" />
      ))}
    </div>
  );
}
