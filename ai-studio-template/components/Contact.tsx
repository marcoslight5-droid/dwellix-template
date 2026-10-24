import { content } from '../data/content';
import { siteConfig } from '../site.config';
import { useLang } from '../lib/i18n';
import { firstName } from '../lib/utils';
import { Icon } from './Icon';
import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';

export function Contact() {
  const { s, t } = useLang();
  const { agent } = content;
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <SectionHeading id="contact-title" eyebrow={s.contactEyebrow} title={s.contactTitle} lead={s.contactLead} />
        <div className="contact-actions">
          <WhatsAppButton label={s.chatWhatsapp} message={s.msgGeneral(firstName(t(agent.name)))} className="btn-block" />
          <a className="contact-row" href={`tel:${agent.phone}`}>
            <Icon name="phone" />
            <span>{s.call}</span>
            <bdi className="muted">{agent.phone}</bdi>
          </a>
          <a className="contact-row" href={`mailto:${agent.email}`}>
            <Icon name="mail" />
            <span>{s.email}</span>
            <span className="muted ellipsis">{agent.email}</span>
          </a>
          <a className="contact-row" href={agent.instagram.url} target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" />
            <span>{s.instagram}</span>
            <bdi className="muted">{agent.instagram.handle}</bdi>
          </a>
          <a className="contact-row" href={agent.mapUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="pin" />
            <span>{s.office}</span>
            <span className="muted">{t(agent.office)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { s, t } = useLang();
  const { agent } = content;
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {t(agent.name)} · {t(agent.agency)} ·{' '}
          <span className="nowrap">
            {s.brn} <bdi>{agent.brn}</bdi>
          </span>
        </p>
        <p className="fine">{s.disclaimer}</p>
        {siteConfig.preview && <p className="fine">{s.previewBy}</p>}
      </div>
    </footer>
  );
}

/** Floating WhatsApp button on phones, shown after the hero. */
export function FloatingWhatsApp({ visible }: { visible: boolean }) {
  const { s, t } = useLang();
  return (
    <div className={`fab${visible ? ' is-visible' : ''}`} aria-hidden={!visible}>
      <WhatsAppButton label={s.whatsapp} message={s.msgGeneral(firstName(t(content.agent.name)))} />
    </div>
  );
}
