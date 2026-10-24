import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L, Lang } from '../types';
import { ui, type UI } from '../data/ui';
import { siteConfig } from '../site.config';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Interface labels for the current language. */
  s: UI;
  /** Picks the current language from an { en, ar } pair. */
  t: (value: L) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

function applyLang(lang: Lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

function initialLang(): Lang {
  const lang = detectLang();
  // Set before the first render so Arabic pages don't paint in LTR first (layout shift).
  applyLang(lang);
  return lang;
}

function detectLang(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'en' || param === 'ar') return param;
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'ar') return saved;
  } catch {
    // Storage can be unavailable (private mode, sandboxed iframes).
  }
  return siteConfig.defaultLang;
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    applyLang(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const value = useMemo<LangContextValue>(() => ({ lang, setLang, s: ui[lang], t: (v) => v[lang] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
