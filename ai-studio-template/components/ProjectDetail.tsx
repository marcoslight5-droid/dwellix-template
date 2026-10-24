import { useEffect, useRef, useState } from 'react';
import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { firstName } from '../lib/utils';
import { Icon } from './Icon';
import { WhatsAppButton } from './WhatsAppButton';

/** Full-screen project sheet with a swipeable gallery. Opened via #/project/<id>. */
export function ProjectDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const { s, t } = useLang();
  const project = content.projects.find((p) => p.id === id);
  const trackRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  // Track the visible slide (works in LTR and RTL).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = [...track.children] as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setIndex(slides.indexOf(e.target as HTMLElement))),
      { root: track, threshold: 0.6 },
    );
    slides.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [id]);

  if (!project) return null;

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = track.children as HTMLCollectionOf<HTMLElement>;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    // Offsets relative to the first slide are negative in RTL, matching RTL scrollLeft.
    track.scrollTo({ left: slides[next].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
  };

  const facts: [string, string][] = [
    [s.developer, project.developer],
    [s.location, t(project.location)],
    [s.status, t(project.status)],
    [s.unitTypes, t(project.unitTypes)],
    [s.price, t(project.price)],
    ...(project.paymentPlan ? ([[s.paymentPlan, t(project.paymentPlan)]] as [string, string][]) : []),
  ];

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} type="button" className="sheet-close" onClick={onClose} aria-label={s.close}>
          <Icon name="close" size={22} />
        </button>

        <div className="gallery">
          <div className="gallery-track" ref={trackRef} tabIndex={0}>
            {project.gallery.map((src, i) => (
              <img key={src} src={src} alt={`${t(project.name)} (${i + 1}/${project.gallery.length})`} loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
          </div>
          {project.gallery.length > 1 && (
            <>
              <button type="button" className="gallery-nav prev" onClick={() => go(index - 1)} aria-label={s.prevPhoto}>
                <Icon name="chevron" flip />
              </button>
              <button type="button" className="gallery-nav next" onClick={() => go(index + 1)} aria-label={s.nextPhoto}>
                <Icon name="chevron" />
              </button>
              <p className="gallery-count">
                <bdi>
                  {index + 1} / {project.gallery.length}
                </bdi>
              </p>
            </>
          )}
        </div>

        <div className="sheet-body">
          <p className="eyebrow">{project.developer}</p>
          <h2 id="sheet-title">{t(project.name)}</h2>
          <p className="sheet-summary">{t(project.summary)}</p>

          <dl className="facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h3 className="label">{s.highlights}</h3>
          <ul className="checklist">
            {project.highlights.map((h) => (
              <li key={h.en}>
                <Icon name="check" size={18} />
                {t(h)}
              </li>
            ))}
          </ul>

          <WhatsAppButton
            className="btn-block"
            label={s.requestBrochure}
            message={s.msgProject(firstName(t(content.agent.name)), t(project.name), t(project.location))}
          />
        </div>
      </div>
    </div>
  );
}
