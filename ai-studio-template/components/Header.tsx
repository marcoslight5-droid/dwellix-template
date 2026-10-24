import { useEffect, useState } from 'react';
import { content } from '../data/content';
import { useLang } from '../lib/i18n';
import { firstName, whatsappLink } from '../lib/utils';

export function Header() {
  const { s, t, lang, setLang } = useLang();
  const { agent } = content;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="wordmark" href="#top">
          {t(agent.name)}
        </a>
        <nav className="nav" aria-label="Main">
          <a href="#projects">{s.nav.projects}</a>
          <a href="#approach">{s.nav.approach}</a>
          <a href="#about">{s.nav.about}</a>
          <a href="#contact">{s.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="text-btn"
            lang={lang === 'en' ? 'ar' : 'en'}
            title={s.switchLangLabel}
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          >
            {s.switchLang}
          </button>
          <a
            className="text-btn text-btn-accent"
            href={whatsappLink(agent.whatsapp, s.msgGeneral(firstName(t(agent.name))))}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.whatsapp}
          </a>
        </div>
      </div>
    </header>
  );
}
