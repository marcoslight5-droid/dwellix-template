import { content } from '../data/content';
import { useLang } from '../lib/i18n';

/** "How I work" steps and short facts about buying in Dubai. */
export function Approach() {
  const { s, t } = useLang();
  return (
    <section className="section section-tint" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <div className="section-head">
          <h2 id="approach-title">{s.approachTitle}</h2>
        </div>
        <ol className="steps">
          {content.process.map((step, i) => (
            <li key={step.title.en}>
              <span className="step-no">
                <bdi>{String(i + 1).padStart(2, '0')}</bdi>
              </span>
              <h3>{t(step.title)}</h3>
              <p>{t(step.text)}</p>
            </li>
          ))}
        </ol>

        <h3 className="label">{s.factsTitle}</h3>
        <dl className="fact-grid">
          {content.facts.map((f) => (
            <div key={f.title.en}>
              <dt>{t(f.title)}</dt>
              <dd>{t(f.text)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
