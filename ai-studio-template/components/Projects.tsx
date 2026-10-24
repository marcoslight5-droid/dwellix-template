import { useState } from 'react';
import { content } from '../data/content';
import type { Project } from '../types';
import { useLang } from '../lib/i18n';
import { firstName } from '../lib/utils';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';

type Filter = 'all' | 'off-plan' | 'ready' | 'commercial' | 'waterfront';

const matches = (p: Project, f: Filter) => f === 'all' || (f === 'waterfront' ? !!p.waterfront : p.category === f);

export function Projects({ onOpen }: { onOpen: (id: string) => void }) {
  const { s, t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const { projects, agent } = content;

  // Only offer filters that have at least one project.
  const filters = (['all', 'off-plan', 'ready', 'commercial', 'waterfront'] as Filter[]).filter((f) => projects.some((p) => matches(p, f)));
  const visible = projects.filter((p) => matches(p, filter));

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading id="projects-title" eyebrow={s.projectsEyebrow} title={s.projectsTitle} lead={s.projectsLead} />

        <div className="chips" role="group" aria-label={s.projectsEyebrow}>
          {filters.map((f) => (
            <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {s.filters[f]}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visible.map((p, i) => (
            <article key={p.id} className="project-card">
              <button type="button" className="project-media" onClick={() => onOpen(p.id)} aria-label={`${s.viewProject}: ${t(p.name)}`}>
                <img src={p.image} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" width={1200} height={900} />
                <span className="tag">{s.filters[p.category]}</span>
              </button>
              <div className="project-body">
                <p className="project-dev">{p.developer}</p>
                <h3 className="project-name">
                  <button type="button" onClick={() => onOpen(p.id)}>
                    {t(p.name)}
                  </button>
                </h3>
                <p className="project-loc">
                  <Icon name="pin" size={16} />
                  {t(p.location)}
                </p>
                <p className="project-units">{t(p.unitTypes)}</p>
                <div className="project-foot">
                  <p className="project-price">{t(p.price)}</p>
                  <WhatsAppButton
                    variant="small"
                    label={s.whatsapp}
                    message={s.msgProject(firstName(t(agent.name)), t(p.name), t(p.location))}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && <p className="empty">{s.noProjects}</p>}
      </div>
    </section>
  );
}
