import { useEffect, useState } from 'react';
import { content } from './data/content';
import { siteConfig } from './site.config';
import { useLang } from './lib/i18n';
import { useProjectRoute } from './lib/useHashRoute';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Specialties } from './components/Specialties';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Invest } from './components/Invest';
import { Credibility } from './components/Credibility';
import { Reels } from './components/Reels';
import { About } from './components/About';
import { Faq } from './components/Faq';
import { Contact, Footer, FloatingWhatsApp } from './components/Contact';

/**
 * Page order lives here: reorder, remove or duplicate sections freely.
 * Every section reads its text from data/content.ts and data/ui.ts.
 */
export default function App() {
  const { s, t, lang } = useLang();
  const [projectId, openProject] = useProjectRoute();
  const [pastHero, setPastHero] = useState(false);
  const { agent } = content;

  useEffect(() => {
    document.documentElement.dataset.theme = siteConfig.theme;
  }, []);

  // Per-language title, description and structured data.
  useEffect(() => {
    document.title = `${t(agent.name)} · ${t(agent.role)}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t(agent.tagline));
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: t(agent.name),
      description: t(agent.tagline),
      image: new URL(agent.photo, window.location.origin).href,
      telephone: agent.phone,
      email: agent.email,
      sameAs: [agent.instagram.url, agent.linkedin].filter(Boolean),
      knowsLanguage: agent.languages,
      areaServed: 'Dubai',
      identifier: { '@type': 'PropertyValue', name: 'RERA BRN', value: agent.brn },
      address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    };
    let script = document.getElementById('ld-agent');
    if (!script) {
      script = document.createElement('script');
      script.id = 'ld-agent';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a className="skip" href="#projects">
        {s.exploreProjects}
      </a>
      <Header />
      <main>
        <Hero />
        <Specialties />
        <Projects onOpen={openProject} />
        <Invest />
        <Credibility />
        <Reels />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp visible={pastHero && !projectId} />
      {projectId && <ProjectDetail id={projectId} onClose={() => openProject(null)} />}
      {import.meta.env.DEV && siteConfig.preview && content.todo.length > 0 && (
        <p className="todo-badge" title={content.todo.join('\n')}>
          {s.placeholderBadge(content.todo.length)}
        </p>
      )}
    </>
  );
}
