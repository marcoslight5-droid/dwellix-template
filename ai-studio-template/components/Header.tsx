import { useEffect, useState } from 'react';
import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { firstName } from '../lib/utils';
import { WhatsAppButton } from './WhatsAppButton';

export function Header() {
  const { s, t, lang, setLang } = useLang();
  const { agent } = content;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['#projects', s.nav.projects],
    ['#invest', s.nav.invest],
    ['#about', s.nav.about],
    ['#contact', s.nav.contact],
  ] as const;

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#top">
          <span className="brand-name">{t(agent.name)}</span>
          <span className="brand-role">{t(agent.role)}</span>
        </a>
        <nav className="nav" aria-label="Main">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="lang-toggle"
            lang={lang === 'en' ? 'ar' : 'en'}
            title={s.switchLangLabel}
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          >
            {s.switchLang}
          </button>
          <WhatsAppButton variant="small" label={s.whatsapp} message={s.msgGeneral(firstName(t(agent.name)))} className="header-wa" />
        </div>
      </div>
    </header>
  );
}
