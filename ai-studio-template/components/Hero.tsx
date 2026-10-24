import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { firstName } from '../lib/utils';
import { Icon } from './Icon';
import { WhatsAppButton } from './WhatsAppButton';

export function Hero() {
  const { s, t } = useLang();
  const { agent, visuals } = content;

  return (
    <section className={`hero${visuals.hero ? ' hero--image' : ''}`} id="top">
      {visuals.hero && (
        <div className="hero-media" aria-hidden="true">
          <img src={visuals.hero} alt="" fetchPriority="high" decoding="async" />
        </div>
      )}
      <div className="container hero-content">
        <p className="kicker">
          <span>{t(agent.role)}</span>
          <span aria-hidden="true">/</span>
          <span>{t(agent.agency)}</span>
          {agent.brn && (
            <>
              <span aria-hidden="true">/</span>
              <span className="nowrap">
                {s.brn} <bdi>{agent.brn}</bdi>
              </span>
            </>
          )}
        </p>
        <h1 className="hero-headline">{t(agent.headline)}</h1>
        <div className="hero-foot">
          <div className="byline">
            <img src={agent.photo} alt={t(agent.name)} width={96} height={96} fetchPriority="high" />
            <p>{t(agent.intro)}</p>
          </div>
          <div className="hero-actions">
            <WhatsAppButton message={s.msgGeneral(firstName(t(agent.name)))} />
            <a className="btn btn-quiet" href="#projects">
              {s.seeProjects}
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
