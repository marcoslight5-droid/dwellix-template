import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { firstName } from '../lib/utils';
import { Icon } from './Icon';
import { WhatsAppButton } from './WhatsAppButton';

export function Hero({ onOpen }: { onOpen: (id: string) => void }) {
  const { s, t } = useLang();
  const { agent, stats } = content;
  const featured = content.projects.find((p) => p.id === content.featuredProject) ?? content.projects[0];

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <img src="/images/hero.jpg" alt="" width={1920} height={1200} decoding="async" />
      </div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="agent-badge">
            <img src={agent.photo} alt="" width={64} height={64} fetchPriority="high" />
            <span>
              <span className="agent-badge-role">{t(agent.role)}</span>
              <span className="muted">
                {t(agent.agency)}
                {agent.brn && (
                  <>
                    {' · '}
                    <span className="nowrap">
                      {s.brn} <bdi>{agent.brn}</bdi>
                    </span>
                  </>
                )}
              </span>
            </span>
          </div>
          <h1 className="hero-title">{t(agent.name)}</h1>
          <p className="hero-tagline">{t(agent.tagline)}</p>
          <div className="hero-actions">
            <WhatsAppButton label={s.bookConsultation} message={s.msgGeneral(firstName(t(agent.name)))} />
            <a className="btn btn-ghost" href="#projects">
              {s.exploreProjects}
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
        {featured && (
          <button type="button" className="hero-feature" onClick={() => onOpen(featured.id)}>
            <img src={featured.image} alt="" width={1200} height={900} fetchPriority="high" />
            <span className="hero-feature-body">
              <span className="eyebrow">{s.featured}</span>
              <span className="hero-feature-name">{t(featured.name)}</span>
              <span className="hero-feature-meta">
                {t(featured.price)}
                {featured.paymentPlan && <> · {t(featured.paymentPlan)}</>}
              </span>
              <span className="link">
                {s.viewProject}
                <Icon name="arrow" size={16} />
              </span>
            </span>
          </button>
        )}
      </div>
      {stats.length > 0 && (
        <div className="container">
          <dl className="stats">
            {stats.map((stat) => (
              <div key={stat.label.en} className="stat">
                <dt>{t(stat.label)}</dt>
                <dd>
                  <bdi>{stat.value}</bdi>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
