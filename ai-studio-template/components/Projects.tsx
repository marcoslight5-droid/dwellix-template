import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { Icon } from './Icon';

/** Numbered project index: one row per project, opening the detail sheet. */
export function Projects({ onOpen }: { onOpen: (id: string) => void }) {
  const { s, t } = useLang();

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-head">
          <h2 id="projects-title">{s.projectsTitle}</h2>
          <p className="lead">{s.projectsLead}</p>
        </div>

        <ol className="index">
          <li className="index-head" aria-hidden="true">
            <span />
            <span />
            <span>{s.cols.developer}</span>
            <span>{s.cols.homes}</span>
            <span>{s.cols.status}</span>
            <span>{s.cols.price}</span>
            <span />
          </li>
          {content.projects.map((p, i) => (
            <li key={p.id}>
              <button type="button" className="index-row" onClick={() => onOpen(p.id)}>
                <span className="index-no">
                  <bdi>{String(i + 1).padStart(2, '0')}</bdi>
                </span>
                <span className="index-name">
                  <span className="index-title">{t(p.name)}</span>
                  <span className="index-loc">
                    {t(p.location)}
                    <span className="index-cat"> · {s.categories[p.category]}</span>
                  </span>
                </span>
                <span className="index-cell index-dev" data-label={s.cols.developer}>
                  {p.developer ?? ''}
                </span>
                <span className="index-cell" data-label={s.cols.homes}>
                  {t(p.unitTypes)}
                </span>
                <span className="index-cell" data-label={s.cols.status}>
                  {t(p.status)}
                </span>
                <span className="index-cell index-price" data-label={s.cols.price}>
                  {t(p.price)}
                </span>
                <span className="index-go" aria-hidden="true">
                  <Icon name="arrow" size={20} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
