import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { Icon } from './Icon';

export function Faq() {
  const { s, t } = useLang();
  return (
    <section className="section section-tint" aria-labelledby="faq-title">
      <div className="container faq">
        <h2 id="faq-title">{s.faqTitle}</h2>
        <div className="faq-list">
          {content.faqs.map((f) => (
            <details key={f.q.en}>
              <summary>
                <span>{t(f.q)}</span>
                <Icon name="plus" size={20} className="faq-icon" />
              </summary>
              <p>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
