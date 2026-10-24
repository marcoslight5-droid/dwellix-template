import type { Agent, Listing, Localized } from './schema';

export const LANGS = ['en', 'ar'] as const;
export type Lang = (typeof LANGS)[number];

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ar' : 'en');
export const dirOf = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const t = (value: Localized, lang: Lang) => value[lang];

const strings = {
  en: {
    langName: 'English',
    switchTo: 'العربية',
    switchLabel: 'View this page in Arabic',
    brn: 'BRN',
    brnLong: 'RERA BRN',
    whatsappCta: 'Chat on WhatsApp',
    whatsapp: 'WhatsApp',
    viewListings: 'View properties',
    listingsTitle: 'Featured properties',
    listingsLead: 'A short, hand-picked selection. Message me for anything not listed here.',
    findTitle: 'Find a property',
    area: 'Area',
    allAreas: 'All areas',
    type: 'Type',
    allTypes: 'All types',
    purpose: 'Buy or rent',
    anyPurpose: 'Buy or rent',
    minBeds: 'Bedrooms',
    anyBeds: 'Any',
    studioPlus: 'Studio+',
    bedsPlus: (n: number) => `${n}+`,
    reset: 'Reset',
    results: (n: number) => (n === 1 ? '1 property' : `${n} properties`),
    noResults: 'No properties match these filters.',
    forSale: 'For sale',
    forRent: 'For rent',
    studio: 'Studio',
    beds: (n: number) => (n === 1 ? '1 bed' : `${n} beds`),
    baths: (n: number) => (n === 1 ? '1 bath' : `${n} baths`),
    sqft: (s: string) => `${s} sq ft`,
    perYear: '/yr',
    permit: 'Permit',
    permitLong: 'DLD permit no.',
    details: 'View details',
    aboutTitle: 'About',
    languages: 'Languages',
    focus: 'Focus',
    contactTitle: 'Get in touch',
    contactLead: 'The fastest way to reach me is WhatsApp. I usually reply within the hour.',
    call: 'Call',
    email: 'Email',
    back: 'All properties',
    specs: 'Details',
    description: 'About this property',
    price: 'Price',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    size: 'Size',
    community: 'Community',
    reference: 'Reference',
    listedBy: 'Listed by',
    photo: (i: number, n: number) => `Photo ${i} of ${n}`,
    prev: 'Previous photo',
    next: 'Next photo',
    previewBy: 'Preview by Dwellix',
    rights: 'All rights reserved.',
    types: { apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse', penthouse: 'Penthouse', office: 'Office' },
    homeTitle: (name: string, focus: string) => `${name} · Real estate agent, ${focus}`,
    homeDescription: (name: string, agency: string, focus: string) =>
      `${name} of ${agency}: property for sale and rent in ${focus}. Message on WhatsApp for viewings.`,
  },
  ar: {
    langName: 'العربية',
    switchTo: 'English',
    switchLabel: 'View this page in English',
    brn: 'BRN',
    brnLong: 'رقم تسجيل الوسيط (BRN)',
    whatsappCta: 'تواصل عبر واتساب',
    whatsapp: 'واتساب',
    viewListings: 'تصفح العقارات',
    listingsTitle: 'عقارات مميزة',
    listingsLead: 'مجموعة مختارة بعناية. راسلني لأي عقار غير معروض هنا.',
    findTitle: 'ابحث عن عقار',
    area: 'المنطقة',
    allAreas: 'جميع المناطق',
    type: 'النوع',
    allTypes: 'جميع الأنواع',
    purpose: 'شراء أو إيجار',
    anyPurpose: 'شراء أو إيجار',
    minBeds: 'غرف النوم',
    anyBeds: 'الكل',
    studioPlus: 'استوديو+',
    bedsPlus: (n: number) => `+${n}`,
    reset: 'إعادة تعيين',
    results: (n: number) => (n === 1 ? 'عقار واحد' : n === 2 ? 'عقاران' : `${n} عقارات`),
    noResults: 'لا توجد عقارات تطابق هذه الخيارات.',
    forSale: 'للبيع',
    forRent: 'للإيجار',
    studio: 'استوديو',
    beds: (n: number) => (n === 1 ? 'غرفة نوم' : n === 2 ? 'غرفتا نوم' : `${n} غرف نوم`),
    baths: (n: number) => (n === 1 ? 'حمّام' : n === 2 ? 'حمّامان' : `${n} حمّامات`),
    sqft: (s: string) => `${s} قدم²`,
    perYear: '/سنوياً',
    permit: 'التصريح',
    permitLong: 'رقم تصريح دائرة الأراضي',
    details: 'عرض التفاصيل',
    aboutTitle: 'نبذة',
    languages: 'اللغات',
    focus: 'التخصص',
    contactTitle: 'تواصل معي',
    contactLead: 'أسرع طريقة للتواصل معي هي واتساب، وعادةً أرد خلال ساعة.',
    call: 'اتصال',
    email: 'البريد الإلكتروني',
    back: 'جميع العقارات',
    specs: 'التفاصيل',
    description: 'عن هذا العقار',
    price: 'السعر',
    bedrooms: 'غرف النوم',
    bathrooms: 'الحمّامات',
    size: 'المساحة',
    community: 'المجتمع',
    reference: 'الرقم المرجعي',
    listedBy: 'معروض بواسطة',
    photo: (i: number, n: number) => `الصورة ${i} من ${n}`,
    prev: 'الصورة السابقة',
    next: 'الصورة التالية',
    previewBy: 'معاينة من Dwellix',
    rights: 'جميع الحقوق محفوظة.',
    types: { apartment: 'شقة', villa: 'فيلا', townhouse: 'تاون هاوس', penthouse: 'بنتهاوس', office: 'مكتب' },
    homeTitle: (name: string, focus: string) => `${name} · وسيط عقاري، ${focus}`,
    homeDescription: (name: string, agency: string, focus: string) =>
      `${name} من ${agency}: عقارات للبيع والإيجار في ${focus}. تواصل عبر واتساب لحجز معاينة.`,
  },
} as const;

export const ui = (lang: Lang) => strings[lang];

/** Western digits with thousands separators in both languages. */
export const formatNumber = (n: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);

/** "AED 1,250,000" / "AED 95,000/yr" (Arabic: "1,250,000 درهم" / "95,000 درهم/سنوياً"). */
export function formatPrice(listing: Pick<Listing, 'priceAED' | 'purpose'>, lang: Lang): string {
  const amount = formatNumber(listing.priceAED);
  const suffix = listing.purpose === 'rent' ? ui(lang).perYear : '';
  return lang === 'ar' ? `${amount} درهم${suffix}` : `AED ${amount}${suffix}`;
}

export function bedsLabel(beds: number, lang: Lang) {
  return beds === 0 ? ui(lang).studio : ui(lang).beds(beds);
}

export const firstName = (agent: Agent, lang: Lang) => t(agent.name, lang).split(/\s+/)[0];

/** wa.me wants the number as digits only, without "+" or spaces. */
export const waNumber = (e164: string) => e164.replace(/\D/g, '');

export function whatsappMessage(agent: Agent, listing: Listing, lang: Lang): string {
  const name = firstName(agent, lang);
  const title = t(listing.title, lang);
  const area = t(listing.area, lang);
  const price = formatPrice(listing, lang);
  return lang === 'ar'
    ? `مرحباً ${name}، أنا مهتم بهذا العقار: ${title} في ${area} (${price}). هل لا يزال متاحاً؟`
    : `Hi ${name}, I'm interested in ${title} in ${area} (${price}). Is it still available?`;
}

export function whatsappGeneral(agent: Agent, lang: Lang): string {
  const name = firstName(agent, lang);
  return lang === 'ar'
    ? `مرحباً ${name}، أبحث عن عقار وأرغب في التحدث معك.`
    : `Hi ${name}, I'm looking for a property and would like to talk.`;
}

export function whatsappLink(agent: Agent, text: string): string {
  return `https://wa.me/${waNumber(agent.whatsapp)}?text=${encodeURIComponent(text)}`;
}

export const homePath = (lang: Lang) => `/${lang}/`;
export const listingPath = (lang: Lang, id: string) => `/${lang}/listings/${id}/`;
