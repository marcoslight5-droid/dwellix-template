import { content } from '../data/content';
import { useLang } from '../lib/i18n';

export function About() {
  const { s, t } = useLang();
  const { agent } = content;
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about">
        <img className="about-photo" src={agent.photoAlt ?? agent.photo} alt={t(agent.name)} loading="lazy" decoding="async" width={900} height={1125} />
        <div>
          <p className="eyebrow">{s.aboutEyebrow}</p>
          <h2 id="about-title">{t(agent.name)}</h2>
          <p className="about-role">{t(agent.role)}</p>
          {agent.bio.map((p) => (
            <p key={p.en} className="about-text">
              {t(p)}
            </p>
          ))}
          <dl className="facts facts-inline">
            <div>
              <dt>{s.languages}</dt>
              <dd>
                <ul className="pills">
                  {agent.languages.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt>{s.brn}</dt>
              <dd>
                <bdi>{agent.brn}</bdi> · {t(agent.agency)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
