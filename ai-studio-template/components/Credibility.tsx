import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

export function Credibility() {
  const { s, t } = useLang();
  const { awards, press, events } = content;

  return (
    <section className="section" aria-labelledby="cred-title">
      <div className="container">
        <SectionHeading id="cred-title" eyebrow={s.credibilityEyebrow} title={s.credibilityTitle} />

        <h3 className="label">{s.awards}</h3>
        <div className="awards">
          {awards.map((a) => (
            <figure key={a.title.en} className="award">
              <img src={a.image} alt="" loading="lazy" decoding="async" width={800} height={1000} />
              <figcaption>
                <Icon name="award" size={18} />
                <span>
                  <strong>{t(a.title)}</strong>
                  <span className="muted">
                    {t(a.issuer)} · <bdi>{a.year}</bdi>
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="cred-split">
          <div>
            <h3 className="label">{s.press}</h3>
            {press.map((p) => (
              <a key={p.outlet} className="press" href={p.url} target="_blank" rel="noopener noreferrer">
                <img src={p.image} alt="" loading="lazy" decoding="async" width={800} height={1000} />
                <span>
                  <span className="press-outlet">{p.outlet}</span>
                  <span className="press-headline">“{t(p.headline)}”</span>
                  {p.byline && <span className="muted small">{t(p.byline)}</span>}
                  <span className="link">
                    {s.readArticle}
                    <Icon name="arrow" size={16} />
                  </span>
                </span>
              </a>
            ))}
          </div>
          <div>
            <h3 className="label">{s.events}</h3>
            <div className="events">
              {events.map((e) => (
                <figure key={e.title.en} className="event">
                  <img src={e.image} alt="" loading="lazy" decoding="async" width={800} height={600} />
                  <figcaption>
                    <strong>{t(e.title)}</strong>
                    <span className="muted">
                      {t(e.date)} · {t(e.place)}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
