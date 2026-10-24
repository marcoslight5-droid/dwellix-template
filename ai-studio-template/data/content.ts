/**
 * ALL website content lives in this file, in English and Arabic.
 * Components never hard-code visible text, so the site can be redesigned
 * (styles/theme.css, components/) without touching what it says.
 *
 * Content is drafted from the public Instagram profile @dubairealtorzubayr
 * ("Realtor Zubayr"), his LinkedIn and his Estate Magazine feature.
 * Anything not confirmed by the agent is listed in `todo` at the bottom:
 * check each item with him and delete it from the list once it's correct.
 */
import type { SiteContent } from '../types';

export const content: SiteContent = {
  agent: {
    name: { en: 'Akram Zubair', ar: 'أكرم زبير' },
    role: { en: 'Off-plan & Investment Advisor', ar: 'مستشار المشاريع على الخارطة والاستثمار العقاري' },
    tagline: {
      en: 'Client-centric property advice for investors and families buying into Dubai’s next landmarks.',
      ar: 'استشارات عقارية تضع العميل أولاً، للمستثمرين والعائلات الراغبين في امتلاك معالم دبي القادمة.',
    },
    bio: [
      {
        en: 'I help investors and end-users choose the right Dubai property at the right stage, from the first launch event to handover and beyond. My focus is off-plan launches by leading developers, waterfront and branded residences, and Grade A commercial space.',
        ar: 'أساعد المستثمرين والمشترين بغرض السكن على اختيار العقار المناسب في دبي في الوقت المناسب، من فعالية الإطلاق الأولى وحتى التسليم وما بعده. أركّز على المشاريع على الخارطة من كبار المطورين، والمساكن المطلة على الواجهة البحرية والمساكن ذات العلامات التجارية، والمساحات التجارية من الفئة الممتازة.',
      },
      {
        en: 'Every client gets straight numbers: payment plans, service charges, realistic rental yields and resale potential, so decisions are made on facts, not hype. I also look after investor relations for overseas buyers, handling viewings, paperwork and handover remotely.',
        ar: 'يحصل كل عميل على أرقام واضحة: خطط الدفع ورسوم الخدمات والعوائد الإيجارية الواقعية وإمكانات إعادة البيع، لتُبنى القرارات على الحقائق لا على الدعاية. كما أتولّى علاقات المستثمرين من خارج الدولة، فأتابع المعاينات والأوراق والتسليم عن بُعد.',
      },
    ],
    photo: '/images/portrait.jpg',
    photoAlt: '/images/portrait-2.jpg',
    agency: { en: 'Agency name', ar: 'اسم الوكالة' },
    brn: '00000',
    // From his "Grade A offices on Sheikh Zayed Road" post.
    whatsapp: '+971585365991',
    phone: '+971585365991',
    email: 'hello@example.com',
    instagram: { handle: '@dubairealtorzubayr', url: 'https://www.instagram.com/dubairealtorzubayr/' },
    linkedin: 'https://www.linkedin.com/in/akramzubair',
    languages: ['English'],
    office: { en: 'Business Bay, Dubai', ar: 'الخليج التجاري، دبي' },
    mapUrl: 'https://maps.google.com/?q=Business+Bay+Dubai',
  },

  // Hidden until real numbers are confirmed (years, deals closed, clients advised…).
  stats: [],

  specialties: [
    {
      icon: 'key',
      title: { en: 'Off-plan launches', ar: 'مشاريع على الخارطة' },
      text: {
        en: 'Priority access to new launches with developer payment plans, early-bird pricing and unit selection before public release.',
        ar: 'وصول مبكر إلى الإطلاقات الجديدة مع خطط دفع المطورين وأسعار الحجز المبكر واختيار الوحدات قبل الطرح العام.',
      },
    },
    {
      icon: 'chart',
      title: { en: 'Investor consultations', ar: 'استشارات المستثمرين' },
      text: {
        en: 'Yield, capital growth and exit planning for first-time and portfolio investors, including Golden Visa eligible purchases.',
        ar: 'تخطيط العائد ونمو رأس المال واستراتيجية التخارج للمستثمرين الجدد وأصحاب المحافظ، بما في ذلك الصفقات المؤهلة للإقامة الذهبية.',
      },
    },
    {
      icon: 'wave',
      title: { en: 'Waterfront & branded living', ar: 'مساكن الواجهة البحرية والعلامات التجارية' },
      text: {
        en: 'Marina, harbour and island addresses with hotel-grade services, from Mina Rashid to Dubai Maritime City.',
        ar: 'عناوين على المرسى والميناء والجزر مع خدمات بمستوى الفنادق، من ميناء راشد إلى مدينة دبي الملاحية.',
      },
    },
    {
      icon: 'briefcase',
      title: { en: 'Commercial property', ar: 'العقارات التجارية' },
      text: {
        en: 'Grade A offices on Sheikh Zayed Road and in Business Bay for owner-occupiers and income investors.',
        ar: 'مكاتب من الفئة الممتازة على شارع الشيخ زايد وفي الخليج التجاري لمن يرغب في الاستخدام أو الاستثمار بعائد.',
      },
    },
  ],

  projects: [
    {
      id: 'grade-a-offices-szr',
      name: { en: 'Grade A Office Tower, Sheikh Zayed Road', ar: 'برج مكاتب من الفئة الممتازة، شارع الشيخ زايد' },
      developer: 'Private release',
      location: { en: 'Sheikh Zayed Road, between DIFC, Downtown and Business Bay', ar: 'شارع الشيخ زايد، بين مركز دبي المالي العالمي ووسط المدينة والخليج التجاري' },
      category: 'commercial',
      status: { en: 'Off-plan · Handover Q2 2031', ar: 'على الخارطة · التسليم في الربع الثاني 2031' },
      unitTypes: { en: '332 offices from 1,077 sq ft · Freehold', ar: '332 مكتباً بمساحات تبدأ من 1,077 قدماً مربعاً · تملك حر' },
      price: { en: 'Indicative from AED 4,000/sq ft', ar: 'أسعار استرشادية تبدأ من 4,000 درهم للقدم المربع' },
      paymentPlan: { en: '20/30/50', ar: '20/30/50' },
      image: '/images/project-offices-1.jpg',
      gallery: ['/images/project-offices-1.jpg', '/images/project-offices-2.jpg', '/images/project-offices-3.jpg'],
      summary: {
        en: 'An 87-storey, 372-metre landmark between DIFC, Downtown and Business Bay. Private floor plans and pricing on request.',
        ar: 'معلم من 87 طابقاً بارتفاع 372 متراً بين مركز دبي المالي العالمي ووسط المدينة والخليج التجاري. المخططات والأسعار الخاصة عند الطلب.',
      },
      highlights: [
        { en: '87 floors, 372 m tall', ar: '87 طابقاً بارتفاع 372 متراً' },
        { en: '332 Grade A offices from 1,077 sq ft', ar: '332 مكتباً من الفئة الممتازة تبدأ من 1,077 قدماً مربعاً' },
        { en: 'Freehold ownership', ar: 'تملك حر' },
        { en: '20/30/50 payment plan, handover Q2 2031', ar: 'خطة دفع 20/30/50 والتسليم في الربع الثاني 2031' },
      ],
    },
    {
      id: 'beyond-maritime-city',
      name: { en: 'BEYOND Waterfront Residences', ar: 'مساكن BEYOND على الواجهة البحرية' },
      developer: 'BEYOND by Omniyat',
      location: { en: 'Dubai Maritime City', ar: 'مدينة دبي الملاحية' },
      category: 'off-plan',
      waterfront: true,
      status: { en: 'Off-plan · Handover TBC', ar: 'على الخارطة · موعد التسليم يُحدَّد لاحقاً' },
      unitTypes: { en: '1–4 bedroom apartments & penthouses', ar: 'شقق من غرفة إلى أربع غرف وبنتهاوس' },
      price: { en: 'Price on request', ar: 'السعر عند الطلب' },
      paymentPlan: { en: 'Developer payment plan available', ar: 'خطة دفع ميسّرة من المطور' },
      image: '/images/project-beyond-1.jpg',
      gallery: ['/images/project-beyond-1.jpg', '/images/project-beyond-2.jpg', '/images/project-beyond-3.jpg'],
      summary: {
        en: 'Sculpted towers on the water between Port Rashid and the Sheikh Zayed Road skyline, with resort-style podium amenities and open sea views.',
        ar: 'أبراج بتصاميم منحوتة على الماء بين ميناء راشد وأفق شارع الشيخ زايد، مع مرافق على طراز المنتجعات وإطلالات مفتوحة على البحر.',
      },
      highlights: [
        { en: 'Panoramic sea and skyline views', ar: 'إطلالات بانورامية على البحر وأفق المدينة' },
        { en: 'Resort-style pools and wellness deck', ar: 'مسابح على طراز المنتجعات ومنطقة للعافية' },
        { en: 'Minutes to Downtown and DIFC', ar: 'على بُعد دقائق من وسط المدينة ومركز دبي المالي العالمي' },
      ],
    },
    {
      id: 'rashid-yachts-marina',
      name: { en: 'Rashid Yachts & Marina', ar: 'راشد يخوت ومارينا' },
      developer: 'Emaar',
      location: { en: 'Mina Rashid', ar: 'ميناء راشد' },
      category: 'off-plan',
      waterfront: true,
      status: { en: 'Off-plan · Phased handovers', ar: 'على الخارطة · تسليم على مراحل' },
      unitTypes: { en: '1–4 bedroom marina apartments', ar: 'شقق على المارينا من غرفة إلى أربع غرف' },
      price: { en: 'Price on request', ar: 'السعر عند الطلب' },
      paymentPlan: { en: 'Developer payment plan available', ar: 'خطة دفع ميسّرة من المطور' },
      image: '/images/project-rashid-1.jpg',
      gallery: ['/images/project-rashid-1.jpg', '/images/project-rashid-2.jpg', '/images/project-rashid-3.jpg'],
      summary: {
        en: 'A yachting community at Dubai’s historic first port, with a superyacht marina, promenade dining and direct sea access.',
        ar: 'مجتمع لليخوت في أول موانئ دبي التاريخية، مع مرسى لليخوت الفاخرة وممشى للمطاعم ووصول مباشر إلى البحر.',
      },
      highlights: [
        { en: 'Superyacht marina on your doorstep', ar: 'مرسى لليخوت الفاخرة أمام منزلك' },
        { en: 'Waterfront promenade and beach', ar: 'ممشى على الواجهة البحرية وشاطئ' },
        { en: 'Strong short-let and holiday-home demand', ar: 'طلب قوي على الإيجار القصير وبيوت العطلات' },
      ],
    },
    {
      id: 'azizi-new-launch',
      name: { en: 'Azizi New Launch', ar: 'إطلاق جديد من عزيزي' },
      developer: 'Azizi Developments',
      location: { en: 'Dubai', ar: 'دبي' },
      category: 'off-plan',
      status: { en: 'Off-plan · Launch pricing', ar: 'على الخارطة · أسعار الإطلاق' },
      unitTypes: { en: 'Studios to 3 bedroom apartments', ar: 'استوديو حتى شقق بثلاث غرف' },
      price: { en: 'Price on request', ar: 'السعر عند الطلب' },
      paymentPlan: { en: 'Post-handover options', ar: 'خيارات للدفع بعد التسليم' },
      image: '/images/project-azizi-1.jpg',
      gallery: ['/images/project-azizi-1.jpg', '/images/project-azizi-2.jpg', '/images/project-azizi-3.jpg'],
      summary: {
        en: 'An entry point to off-plan investing with launch pricing, fully fitted kitchens and 40+ lifestyle amenities.',
        ar: 'مدخل مثالي للاستثمار على الخارطة بأسعار الإطلاق، مع مطابخ مجهزة بالكامل وأكثر من 40 مرفقاً لأسلوب حياة متكامل.',
      },
      highlights: [
        { en: '40+ amenities', ar: 'أكثر من 40 مرفقاً' },
        { en: 'Fully fitted kitchens', ar: 'مطابخ مجهزة بالكامل' },
        { en: 'Investor-friendly unit sizes', ar: 'مساحات وحدات مناسبة للمستثمرين' },
      ],
    },
  ],

  investReasons: [
    {
      icon: 'percent',
      title: { en: 'No income or capital gains tax', ar: 'لا ضريبة على الدخل أو الأرباح الرأسمالية' },
      text: {
        en: 'Rental income and resale profits on Dubai property are not taxed for individual investors.',
        ar: 'لا تُفرض ضرائب على دخل الإيجار أو أرباح إعادة البيع للأفراد المستثمرين في عقارات دبي.',
      },
    },
    {
      icon: 'passport',
      title: { en: 'Golden Visa pathway', ar: 'طريق إلى الإقامة الذهبية' },
      text: {
        en: 'Property worth AED 2 million or more can qualify you for a 10-year UAE Golden Visa.',
        ar: 'العقار بقيمة مليوني درهم أو أكثر قد يؤهلك للحصول على الإقامة الذهبية في الإمارات لمدة 10 سنوات.',
      },
    },
    {
      icon: 'shield',
      title: { en: 'Escrow-protected off-plan', ar: 'حماية حسابات الضمان للمشاريع على الخارطة' },
      text: {
        en: 'Off-plan payments go into RERA-regulated escrow accounts tied to construction progress.',
        ar: 'تُودَع دفعات المشاريع على الخارطة في حسابات ضمان تنظمها مؤسسة التنظيم العقاري وترتبط بمراحل الإنجاز.',
      },
    },
    {
      icon: 'globe',
      title: { en: 'Freehold for foreigners', ar: 'تملّك حر للأجانب' },
      text: {
        en: 'International buyers can own property outright in designated freehold areas, and buy remotely.',
        ar: 'يمكن للمشترين الدوليين تملّك العقار بالكامل في مناطق التملك الحر المحددة، والشراء عن بُعد.',
      },
    },
  ],

  awards: [
    {
      title: { en: 'Top Achiever Award', ar: 'جائزة أفضل إنجاز' },
      issuer: { en: 'Developer sales recognition', ar: 'تكريم مبيعات من المطور' },
      year: '2025',
      image: '/images/award-1.jpg',
    },
    {
      title: { en: 'Certificate of Recognition', ar: 'شهادة تقدير' },
      issuer: { en: 'Developer partner programme', ar: 'برنامج شركاء المطور' },
      year: '2024',
      image: '/images/award-2.jpg',
    },
    {
      title: { en: 'Best Deals Award', ar: 'جائزة أفضل الصفقات' },
      issuer: { en: 'Brokerage awards night', ar: 'حفل جوائز الوساطة' },
      year: '2024',
      image: '/images/award-3.jpg',
    },
  ],

  press: [
    {
      outlet: 'Estate Magazine',
      headline: {
        en: 'Akram Zubair Is Turning Dubai Real Estate Leadership Into Results',
        ar: 'أكرم زبير يحوّل الريادة في عقارات دبي إلى نتائج',
      },
      byline: { en: 'By Aditi Goyal · 17 September 2026', ar: 'بقلم أديتي غويال · 17 سبتمبر 2026' },
      url: 'https://www.instagram.com/dubairealtorzubayr/',
      image: '/images/press-1.jpg',
    },
  ],

  events: [
    {
      title: { en: 'Dubai Property Expo', ar: 'معرض دبي العقاري' },
      date: { en: 'Exclusive invitation', ar: 'دعوة خاصة' },
      place: { en: 'Dubai', ar: 'دبي' },
      image: '/images/event-1.jpg',
    },
    {
      title: { en: 'Open House', ar: 'يوم مفتوح' },
      date: { en: 'Weekend viewings', ar: 'معاينات نهاية الأسبوع' },
      place: { en: 'Sales gallery', ar: 'صالة المبيعات' },
      image: '/images/event-2.jpg',
    },
  ],

  developers: ['Emaar', 'Omniyat', 'Azizi', 'Sobha', 'Damac', 'Ellington'],

  // Covers cropped from his Instagram grid. Swap in full-resolution covers and post links.
  reels: [
    { image: '/images/reel-1.jpg', caption: { en: 'Show apartment walkthrough', ar: 'جولة في الشقة النموذجية' }, url: 'https://www.instagram.com/dubairealtorzubayr/', video: true },
    { image: '/images/reel-2.jpg', caption: { en: 'Smart sofa: massages and music', ar: 'أريكة ذكية للتدليك والموسيقى' }, url: 'https://www.instagram.com/dubairealtorzubayr/', video: true },
    { image: '/images/reel-3.jpg', caption: { en: 'Fully equipped kitchen', ar: 'مطبخ مجهز بالكامل' }, url: 'https://www.instagram.com/dubairealtorzubayr/', video: true },
    { image: '/images/reel-4.jpg', caption: { en: 'More than 40 amenities', ar: 'أكثر من 40 مرفقاً' }, url: 'https://www.instagram.com/dubairealtorzubayr/', video: true },
    { image: '/images/reel-5.jpg', caption: { en: 'Waterfront living', ar: 'الحياة على الواجهة البحرية' }, url: 'https://www.instagram.com/dubairealtorzubayr/' },
    { image: '/images/reel-6.jpg', caption: { en: 'Lagoon community', ar: 'مجتمع البحيرات' }, url: 'https://www.instagram.com/dubairealtorzubayr/' },
  ],

  faqs: [
    {
      q: { en: 'Can I buy in Dubai without living in the UAE?', ar: 'هل يمكنني الشراء في دبي دون الإقامة في الإمارات؟' },
      a: {
        en: 'Yes. Foreign nationals can buy freehold property, and the whole process (reservation, payments, signing and handover) can be handled remotely, with a power of attorney where needed.',
        ar: 'نعم. يمكن لغير المواطنين شراء عقارات التملك الحر، ويمكن إتمام العملية كلها عن بُعد من الحجز والدفع والتوقيع حتى التسليم، مع وكالة قانونية عند الحاجة.',
      },
    },
    {
      q: { en: 'What does buying off-plan cost on top of the price?', ar: 'ما التكاليف الإضافية عند الشراء على الخارطة؟' },
      a: {
        en: 'The main extra is the Dubai Land Department fee of 4% of the price, plus a small registration fee. I give you a full cost sheet for each unit before you reserve.',
        ar: 'التكلفة الإضافية الرئيسية هي رسوم دائرة الأراضي والأملاك بنسبة 4% من السعر، إضافة إلى رسوم تسجيل بسيطة. أقدّم لك بياناً كاملاً بالتكاليف لكل وحدة قبل الحجز.',
      },
    },
    {
      q: { en: 'How are off-plan payments protected?', ar: 'كيف تُحمى دفعات الشراء على الخارطة؟' },
      a: {
        en: 'Payments go into an escrow account regulated by RERA and are released to the developer as construction milestones are met. Your purchase is registered with the DLD (Oqood).',
        ar: 'تُودَع الدفعات في حساب ضمان تنظمه مؤسسة التنظيم العقاري وتُصرف للمطور مع إنجاز مراحل البناء، ويُسجَّل الشراء لدى دائرة الأراضي والأملاك (أوقود).',
      },
    },
    {
      q: { en: 'Which areas give the best rental yields?', ar: 'ما المناطق التي تحقق أفضل عائد إيجاري؟' },
      a: {
        en: 'It depends on your budget and whether you want long-term or holiday-home income. Book a consultation and I’ll compare live yields and service charges for your shortlist.',
        ar: 'يعتمد ذلك على ميزانيتك وما إذا كنت تفضّل الإيجار طويل الأمد أو بيوت العطلات. احجز استشارة وسأقارن لك العوائد الحالية ورسوم الخدمات للمشاريع التي تهمّك.',
      },
    },
  ],

  todo: [
    'Name order: the offices flyer says "Zubair Akram", LinkedIn and Estate Magazine say "Akram Zubair"; Instagram shows "Realtor Zubayr"',
    'Arabic spelling of his name (currently أكرم زبير)',
    'Agency name and RERA BRN',
    'Email address and office location / map link',
    'Languages spoken (currently English only)',
    'Stats for the hero strip (hidden until provided)',
    'Projects: confirm BEYOND, Rashid Yachts & Marina and the Azizi launch (name, price, payment plan, handover); offices tower developer name',
    'Awards: real titles, issuers and years',
    'Estate Magazine article URL',
    'Reels: links to the individual Instagram posts and full-resolution covers',
    'High-resolution portraits (hero + about) and project photos in public/images/',
  ],
};
