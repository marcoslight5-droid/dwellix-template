import { content } from '../data/content';
import { useLang } from '../lib/i18n';

export function About() {
  const { s, t } = useLang();
  const { agent } = content;
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <div className="about-side">
          <h2 id="about-title">{s.aboutTitle}</h2>
          <img className="about-photo" src={agent.photo} alt={t(agent.name)} loading="lazy" decoding="async" width={320} height={320} />
        </div>
        <div className="about-body">
          {agent.bio.map((p, i) => (
            <p key={p.en} className={i === 0 ? 'about-lead' : 'about-text'}>
              {t(p)}
            </p>
          ))}
          <dl className="facts">
            <div>
              <dt>{s.agency}</dt>
              <dd>{t(agent.agency)}</dd>
            </div>
            {agent.brn && (
              <div>
                <dt>{s.brn}</dt>
                <dd>
                  <bdi>{agent.brn}</bdi>
                </dd>
              </div>
            )}
            {agent.languages.length > 0 && (
              <div>
                <dt>{s.languages}</dt>
                <dd>{agent.languages.join(' · ')}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>
  );
}
