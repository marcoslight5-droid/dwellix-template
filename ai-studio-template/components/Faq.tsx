import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';

export function Faq() {
  const { s, t } = useLang();
  return (
    <section className="section section-alt" aria-labelledby="faq-title">
      <div className="container faq">
        <SectionHeading id="faq-title" eyebrow={s.faqEyebrow} title={s.faqTitle} />
        <div className="faq-list">
          {content.faqs.map((f) => (
            <details key={f.q.en}>
              <summary>
                <span>{t(f.q)}</span>
                <Icon name="chevron" size={18} className="faq-chevron" />
              </summary>
              <p>{t(f.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
