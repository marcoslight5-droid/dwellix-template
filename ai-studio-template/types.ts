/** Text in both site languages. Every visible string in data/content.ts uses this. */
export interface L {
  en: string;
  ar: string;
}

export type Lang = 'en' | 'ar';

export type IconName =
  | 'whatsapp'
  | 'phone'
  | 'mail'
  | 'instagram'
  | 'linkedin'
  | 'pin'
  | 'arrow'
  | 'close'
  | 'chevron'
  | 'building'
  | 'wave'
  | 'chart'
  | 'briefcase'
  | 'key'
  | 'shield'
  | 'passport'
  | 'percent'
  | 'calendar'
  | 'award'
  | 'play'
  | 'check'
  | 'globe';

export interface Agent {
  name: L;
  /** Short role line under the name, e.g. "Off-plan & Investment Advisor". */
  role: L;
  /** One-sentence promise shown in the hero. */
  tagline: L;
  /** About section paragraphs. */
  bio: L[];
  photo: string;
  /** Second portrait used in the About section (falls back to photo). */
  photoAlt?: string;
  agency: L;
  /** RERA Broker Registration Number. Leave empty ('') to hide it until confirmed. */
  brn: string;
  /** E.164, e.g. +971501234567. Used for wa.me links. */
  whatsapp: string;
  phone: string;
  /** Optional: the email row is hidden when missing. */
  email?: string;
  instagram: { handle: string; url: string };
  linkedin?: string;
  /** Hidden when empty. */
  languages: string[];
  /** Optional: the office row is hidden when missing. */
  office?: L;
  mapUrl?: string;
}

export interface Stat {
  value: string;
  label: L;
}

export interface Specialty {
  icon: IconName;
  title: L;
  text: L;
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
  waterfront?: boolean;
  /** e.g. "Off-plan · Handover Q4 2027". */
  status: L;
  /** e.g. "1–4 bedroom apartments". */
  unitTypes: L;
  /** e.g. "From AED 2.1M" or "Price on request". */
  price: L;
  paymentPlan?: L;
  image: string;
  gallery: string[];
  summary: L;
  highlights: L[];
  /** The agent's own post about this project (shown as a link in the detail sheet). */
  postUrl?: string;
}

export interface InvestReason {
  icon: IconName;
  title: L;
  text: L;
}

export interface Award {
  title: L;
  issuer: L;
  year: string;
  /** Optional photo of the award or certificate. */
  image?: string;
  /** The agent's post about it. */
  url?: string;
}

export interface PressItem {
  outlet: string;
  headline: L;
  /** e.g. "By Aditi Goyal · 17 September 2026". */
  byline?: L;
  url: string;
  image: string;
}

export interface EventItem {
  title: L;
  date: L;
  place?: L;
  /** One line on what the event was about. */
  note?: L;
  image: string;
  /** The agent's post about it. */
  url?: string;
}

export interface Reel {
  image: string;
  caption: L;
  url: string;
  video?: boolean;
}

export interface Faq {
  q: L;
  a: L;
}

export interface SiteContent {
  agent: Agent;
  /** Hero stat strip; leave empty to hide it until real numbers are confirmed. */
  stats: Stat[];
  specialties: Specialty[];
  projects: Project[];
  investReasons: InvestReason[];
  awards: Award[];
  press: PressItem[];
  events: EventItem[];
  /** Developers whose projects the agent sells (shown as a text logo row). */
  developers: string[];
  reels: Reel[];
  faqs: Faq[];
  /**
   * Content still to confirm with the agent. While this list is non-empty and
   * siteConfig.preview is on, a small badge in dev mode reminds you.
   */
  todo: string[];
}
