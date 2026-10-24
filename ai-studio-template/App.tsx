import { useEffect, useState } from 'react';
import { content } from './data/content';
import { siteConfig } from './site.config';
import { useLang } from './lib/i18n';
import { useProjectRoute } from './lib/useHashRoute';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { ProjectDetail } from './components/ProjectDetail';
import { Approach } from './components/Approach';
import { Activity } from './components/Activity';
import { About } from './components/About';
import { Faq } from './components/Faq';
import { Contact, Footer, FloatingWhatsApp } from './components/Contact';
import { ImageBand, Gallery } from './components/Visuals';

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
    document.querySelector('meta[name="description"]')?.setAttribute('content', t(agent.headline));
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'RealEstateAgent',
      name: t(agent.name),
      description: t(agent.headline),
      image: new URL(agent.photo, window.location.origin).href,
      telephone: agent.phone,
      ...(agent.email ? { email: agent.email } : {}),
      sameAs: [agent.instagram.url, agent.linkedin].filter(Boolean),
      ...(agent.languages.length ? { knowsLanguage: agent.languages } : {}),
      areaServed: 'Dubai',
      ...(agent.brn ? { identifier: { '@type': 'PropertyValue', name: 'RERA BRN', value: agent.brn } } : {}),
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
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a className="skip" href="#projects">
        {s.seeProjects}
      </a>
      <Header />
      <main>
        <Hero />
        <Projects onOpen={openProject} />
        <ImageBand />
        <Approach />
        <Activity />
        <Gallery />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp visible={pastHero && !projectId} />
      {projectId && <ProjectDetail id={projectId} onClose={() => openProject(null)} />}
      {import.meta.env.DEV && siteConfig.preview && content.todo.length > 0 && (
        <p className="todo-badge" title={content.todo.join('\n')}>
          {content.todo.length} to confirm (data/content.ts → todo)
        </p>
      )}
    </>
  );
}
