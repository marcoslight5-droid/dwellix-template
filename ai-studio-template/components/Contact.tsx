import { useState, type FormEvent } from 'react';
import { content } from '../data/content';
import { siteConfig } from '../site.config';
import { useLang } from '../lib/i18n';
import { firstName, whatsappLink } from '../lib/utils';
import { Icon } from './Icon';
import { WhatsAppButton } from './WhatsAppButton';

/** Closing section: a short brief form that opens WhatsApp, and direct contact details. */
export function Contact() {
  const { s, t } = useLang();
  const { agent } = content;
  const goals = Object.values(s.form.goals);
  const [form, setForm] = useState({ name: '', goal: 0, budget: 1, timeline: 1 });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = s.msgConsult(firstName(t(agent.name)), {
      name: form.name.trim(),
      goal: goals[form.goal],
      budget: s.form.budgets[form.budget],
      timeline: s.form.timelines[form.timeline],
    });
    window.open(whatsappLink(agent.whatsapp, text), '_blank', 'noopener');
  };

  const select = (label: string, options: readonly string[], key: 'goal' | 'budget' | 'timeline') => (
    <label className="field">
      <span>{label}</span>
      <select value={form[key]} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}>
        {options.map((o, i) => (
          <option key={o} value={i}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <section className={`contact${content.visuals.contact ? ' contact--image' : ''}`} id="contact" aria-labelledby="contact-title">
      {content.visuals.contact && (
        <div className="contact-media" aria-hidden="true">
          <img src={content.visuals.contact} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="container contact-inner">
        <form className="brief" onSubmit={submit}>
          <h2 id="contact-title">{s.consultTitle}</h2>
          <p className="lead">{s.consultLead}</p>
          <div className="brief-fields">
            <label className="field field-wide">
              <span>{s.form.name}</span>
              <input type="text" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
            {select(s.form.goal, goals, 'goal')}
            {select(s.form.budget, s.form.budgets, 'budget')}
            {select(s.form.timeline, s.form.timelines, 'timeline')}
          </div>
          <button type="submit" className="btn btn-primary">
            <Icon name="whatsapp" />
            <span>{s.form.submit}</span>
          </button>
        </form>

        <div className="direct">
          <p className="label">{s.contactTitle}</p>
          <a className="direct-phone" href={`tel:${agent.phone}`}>
            <bdi>{agent.phone.replace(/^\+971(\d{2})(\d{3})(\d{4})$/, '+971 $1 $2 $3')}</bdi>
          </a>
          <ul className="direct-links">
            <li>
              <a href={`tel:${agent.phone}`}>
                <Icon name="phone" size={18} />
                {s.call}
              </a>
            </li>
            <li>
              <a href={agent.instagram.url} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" size={18} />
                <bdi>{agent.instagram.handle}</bdi>
              </a>
            </li>
            {agent.linkedin && (
              <li>
                <a href={agent.linkedin} target="_blank" rel="noopener noreferrer">
                  <Icon name="linkedin" size={18} />
                  LinkedIn
                </a>
              </li>
            )}
            {agent.email && (
              <li>
                <a href={`mailto:${agent.email}`}>{agent.email}</a>
              </li>
            )}
          </ul>
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
          © {new Date().getFullYear()} {t(agent.name)} · {t(agent.agency)}
          {agent.brn && (
            <>
              {' · '}
              <span className="nowrap">
                {s.brn} <bdi>{agent.brn}</bdi>
              </span>
            </>
          )}
        </p>
        <p>{s.disclaimer}</p>
        {siteConfig.preview && <p>{s.previewBy}</p>}
      </div>
    </footer>
  );
}

/** Floating WhatsApp button on phones, shown once the hero is out of view. */
export function FloatingWhatsApp({ visible }: { visible: boolean }) {
  const { s, t } = useLang();
  return (
    <div className={`fab${visible ? ' is-visible' : ''}`} inert={!visible}>
      <WhatsAppButton label={s.whatsapp} message={s.msgGeneral(firstName(t(content.agent.name)))} />
    </div>
  );
}
