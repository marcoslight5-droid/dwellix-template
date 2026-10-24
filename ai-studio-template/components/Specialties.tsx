import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

export function Specialties() {
  const { s, t } = useLang();
  return (
    <section className="section" aria-labelledby="specialties-title">
      <div className="container">
        <SectionHeading id="specialties-title" eyebrow={s.specialtiesEyebrow} title={s.specialtiesTitle} />
        <div className="specialties">
          {content.specialties.map((item) => (
            <article key={item.title.en} className="specialty">
              <span className="specialty-icon">
                <Icon name={item.icon} size={22} />
              </span>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </article>
          ))}
        </div>
        <ul className="developers" aria-label={s.developersTitle}>
          {content.developers.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
