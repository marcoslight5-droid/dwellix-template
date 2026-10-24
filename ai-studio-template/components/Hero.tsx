import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { firstName } from '../lib/utils';
import { Icon } from './Icon';
import { WhatsAppButton } from './WhatsAppButton';

export function Hero() {
  const { s, t } = useLang();
  const { agent, stats } = content;

  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <img src="/images/hero.jpg" alt="" width={1920} height={1200} decoding="async" />
      </div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">{t(agent.role)}</p>
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
        <figure className="hero-portrait">
          <img src={agent.photo} alt={t(agent.name)} width={900} height={1125} fetchPriority="high" />
          <figcaption>
            <span>{t(agent.agency)}</span>
            {agent.brn && (
              <span className="nowrap">
                {s.brn} <bdi>{agent.brn}</bdi>
              </span>
            )}
          </figcaption>
        </figure>
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
