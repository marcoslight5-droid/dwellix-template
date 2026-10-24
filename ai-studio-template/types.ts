/** Text in both site languages. Every visible string in data/content.ts uses this. */
export interface L {
  en: string;
  ar: string;
}

export type Lang = 'en' | 'ar';

export type IconName = 'whatsapp' | 'phone' | 'instagram' | 'linkedin' | 'arrow' | 'close' | 'chevron' | 'plus';

export interface Agent {
  name: L;
  /** Short role line, e.g. "Property advisor, Dubai". */
  role: L;
  /** The hero statement (large type). */
  headline: L;
  /** One or two sentences under the headline, in the agent's voice. */
  intro: L;
  /** About section paragraphs. */
  bio: L[];
  /** Square headshot. */
  photo: string;
  agency: L;
  /** RERA Broker Registration Number. Leave empty ('') to hide it until confirmed. */
  brn: string;
  /** E.164, e.g. +971501234567. Used for wa.me links. */
  whatsapp: string;
  phone: string;
  /** Optional: hidden when missing. */
  email?: string;
  instagram: { handle: string; url: string };
  linkedin?: string;
  /** Hidden when empty. */
  languages: string[];
}

export type ProjectCategory = 'off-plan' | 'ready' | 'commercial';

export interface Project {
  /** URL-safe id, used in #/project/<id>. */
  id: string;
  name: L;
  /** Hidden when the developer isn't known. */
  developer?: string;
  location: L;
  category: ProjectCategory;
  /** e.g. "Off-plan · Handover Q4 2027". */
  status: L;
  /** e.g. "1–4 bedroom apartments". */
  unitTypes: L;
  /** e.g. "From AED 2.1M" or "Price on request". */
  price: L;
  paymentPlan?: L;
  /**
   * Real photos only (public/images/...). Without photos the project shows a
   * typographic cover instead of a fake render.
   */
  photos?: string[];
  summary: L;
  highlights: L[];
  /** The agent's own post about this project. */
  postUrl?: string;
}

export interface Step {
  title: L;
  text: L;
}

export interface Fact {
  title: L;
  text: L;
}

/** One line in the "Recognition & activity" list. */
export interface Milestone {
  /** Left column: a date or year, e.g. "Oct 2025". */
  when: L;
  title: L;
  /** Where / who / what, one short line. */
  detail?: L;
  url?: string;
}

export interface Reel {
  image: string;
  caption: L;
  url: string;
}

export interface Faq {
  q: L;
  a: L;
}

export interface SiteContent {
  agent: Agent;
  projects: Project[];
  /** "How I work", three short steps. */
  process: Step[];
  /** Short facts about buying in Dubai. */
  facts: Fact[];
  milestones: Milestone[];
  /** Real images from the agent's Instagram. */
  reels: Reel[];
  faqs: Faq[];
  /** Content still to confirm with the agent (not shown on the site). */
  todo: string[];
}
