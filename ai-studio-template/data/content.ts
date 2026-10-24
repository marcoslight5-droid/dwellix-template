/**
 * ALL website content lives in this file, in English and Arabic.
 * Components never hard-code visible text, so the site can be redesigned
 * (styles/theme.css, components/) without touching what it says.
 *
 * Content is drafted from the public Instagram profile @dubairealtorzubayr
 * ("Realtor Zubayr"), the posts linked on each project, his LinkedIn URL and
 * his Estate Magazine feature. Optional fields left empty are hidden on the page.
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
        en: 'I help investors and end-users choose the right Dubai property at the right stage, from the first launch event to handover and beyond. My focus is off-plan launches by leading developers, ready homes, waterfront communities and Grade A commercial space.',
        ar: 'أساعد المستثمرين والمشترين بغرض السكن على اختيار العقار المناسب في دبي في الوقت المناسب، من فعالية الإطلاق الأولى وحتى التسليم وما بعده. أركّز على المشاريع على الخارطة من كبار المطورين، والمنازل الجاهزة، والمجتمعات المطلة على الواجهة البحرية، والمساحات التجارية من الفئة الممتازة.',
      },
      {
        en: 'Every client gets straight numbers: payment plans, service charges, realistic rental yields and resale potential, so decisions are made on facts, not hype. I also look after investor relations for overseas buyers, handling viewings, paperwork and handover remotely.',
        ar: 'يحصل كل عميل على أرقام واضحة: خطط الدفع ورسوم الخدمات والعوائد الإيجارية الواقعية وإمكانات إعادة البيع، لتُبنى القرارات على الحقائق لا على الدعاية. كما أتولّى علاقات المستثمرين من خارج الدولة، فأتابع المعاينات والأوراق والتسليم عن بُعد.',
      },
    ],
    // His Instagram profile photo (low-res: replace with the original headshot when available).
    photo: '/images/avatar.jpg',
    // Current agency unconfirmed (see todo): in Oct 2025 he posted as part of Marrfa
    // (@marrfahq); in Oct 2026 he is tagged on @rino.properties (rinoproperties.com).
    agency: { en: 'Rino Properties', ar: 'رينو للعقارات' },
    // RERA BRN not found yet; the BRN is hidden on the page while this is empty.
    brn: '',
    // Shown in his Oct 4 Riviera reel and his Sheikh Zayed Road offices flyer.
    whatsapp: '+971585365991',
    phone: '+971585365991',
    instagram: { handle: '@dubairealtorzubayr', url: 'https://www.instagram.com/dubairealtorzubayr/' },
    linkedin: 'https://www.linkedin.com/in/akramzubair',
    // Not found yet: languages, email and office are hidden until filled in.
    languages: [],
  },

  featuredProject: 'grade-a-offices-szr',

  // Only facts taken from his posts. No invented years, deal counts or client numbers.
  stats: [
    { value: '5', label: { en: 'Featured projects', ar: 'مشاريع مختارة' } },
    { value: '4', label: { en: 'Leading developers', ar: 'من كبار المطورين' } },
    { value: '2025', label: { en: 'First-quarter award, Marrfa', ar: 'جائزة الربع الأول، مارفا' } },
    { value: '10-yr', label: { en: 'Golden Visa guidance', ar: 'إرشاد حول الإقامة الذهبية' } },
  ],

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
      title: { en: 'Waterfront living', ar: 'الحياة على الواجهة البحرية' },
      text: {
        en: 'Marina and island addresses, from Rashid Yachts & Marina at Mina Rashid to new launches on Dubai Islands.',
        ar: 'عناوين على المرسى والجزر، من راشد يخوت ومارينا في ميناء راشد إلى الإطلاقات الجديدة في جزر دبي.',
      },
    },
    {
      icon: 'briefcase',
      title: { en: 'Commercial property', ar: 'العقارات التجارية' },
      text: {
        en: 'Grade A offices on Sheikh Zayed Road for owner-occupiers and income investors.',
        ar: 'مكاتب من الفئة الممتازة على شارع الشيخ زايد لمن يرغب في الاستخدام أو الاستثمار بعائد.',
      },
    },
  ],

  // In the order they appear on the site. Sources: his posts (postUrl on each project).
  projects: [
    {
      id: 'grade-a-offices-szr',
      name: { en: 'Grade A Office Tower, Sheikh Zayed Road', ar: 'برج مكاتب من الفئة الممتازة، شارع الشيخ زايد' },
      location: { en: 'Sheikh Zayed Road, between DIFC, Downtown and Business Bay', ar: 'شارع الشيخ زايد، بين مركز دبي المالي العالمي ووسط المدينة والخليج التجاري' },
      category: 'commercial',
      status: { en: 'Private release · Off-plan · Handover Q2 2031', ar: 'طرح خاص · على الخارطة · التسليم في الربع الثاني 2031' },
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
      postUrl: 'https://www.instagram.com/dubairealtorzubayr/p/Dev4D9ltO4W/',
    },
    {
      id: 'arancia-yards-2',
      name: { en: 'Arancia Yards 2', ar: 'أرانسيا ياردز 2' },
      developer: 'BEYOND',
      location: { en: 'The Yards, City of Arabia', ar: 'ذا ياردز، سيتي أوف أرابيا' },
      category: 'off-plan',
      status: { en: 'Off-plan · Handover Q1 2029', ar: 'على الخارطة · التسليم في الربع الأول 2029' },
      unitTypes: { en: '1–3 bedroom low-rise apartments', ar: 'شقق من غرفة إلى ثلاث غرف في مبانٍ منخفضة الارتفاع' },
      price: { en: 'Price on request', ar: 'السعر عند الطلب' },
      paymentPlan: { en: '40/60', ar: '40/60' },
      image: '/images/project-arancia-1.jpg',
      gallery: ['/images/project-arancia-1.jpg', '/images/project-arancia-2.jpg', '/images/project-arancia-3.jpg'],
      summary: {
        en: 'Low-rise residences by BEYOND in The Yards at City of Arabia, with one to three bedroom homes on a 40/60 payment plan.',
        ar: 'مساكن منخفضة الارتفاع من BEYOND في ذا ياردز بسيتي أوف أرابيا، تضم شققاً من غرفة إلى ثلاث غرف بخطة دفع 40/60.',
      },
      highlights: [
        { en: 'Low-rise living', ar: 'مبانٍ منخفضة الارتفاع' },
        { en: '1, 2 and 3 bedroom homes', ar: 'شقق بغرفة وغرفتين وثلاث غرف' },
        { en: '40/60 payment plan, handover Q1 2029', ar: 'خطة دفع 40/60 والتسليم في الربع الأول 2029' },
      ],
      postUrl: 'https://www.instagram.com/dubairealtorzubayr/p/DeMcIhFjYf8/',
    },
    {
      id: 'casagrand-hermina',
      name: { en: 'Casagrand Hermina', ar: 'كاساغراند هيرمينا' },
      developer: 'Casagrand',
      location: { en: 'Dubai Islands', ar: 'جزر دبي' },
      category: 'off-plan',
      status: { en: 'Off-plan · Handover Q2 2028', ar: 'على الخارطة · التسليم في الربع الثاني 2028' },
      unitTypes: { en: '1–4 bedroom apartments', ar: 'شقق من غرفة إلى أربع غرف' },
      price: { en: 'From AED 2.3M', ar: 'تبدأ من 2.3 مليون درهم' },
      paymentPlan: { en: '20% down payment', ar: 'دفعة أولى 20%' },
      image: '/images/project-hermina-1.jpg',
      gallery: ['/images/project-hermina-1.jpg', '/images/project-hermina-2.jpg', '/images/project-hermina-3.jpg'],
      summary: {
        en: 'One to four bedroom apartments on Dubai Islands from AED 2.3M, with 20% down and handover in Q2 2028.',
        ar: 'شقق من غرفة إلى أربع غرف في جزر دبي تبدأ من 2.3 مليون درهم، بدفعة أولى 20% والتسليم في الربع الثاني 2028.',
      },
      highlights: [
        { en: 'Dubai Islands address', ar: 'عنوان في جزر دبي' },
        { en: 'From AED 2.3M with 20% down', ar: 'تبدأ من 2.3 مليون درهم بدفعة أولى 20%' },
        { en: 'Handover Q2 2028', ar: 'التسليم في الربع الثاني 2028' },
      ],
      postUrl: 'https://www.instagram.com/rino.properties/reel/DeZitNvCnTb/',
    },
    {
      id: 'riviera-mbr-city-2br',
      name: { en: 'Riviera 2 Bedroom, Furnished', ar: 'شقة بغرفتي نوم مفروشة في ريفييرا' },
      location: { en: 'Riviera, Mohammed Bin Rashid City', ar: 'ريفييرا، مدينة محمد بن راشد' },
      category: 'ready',
      status: { en: 'Ready · Furnished', ar: 'جاهزة · مفروشة' },
      unitTypes: { en: '2 bedrooms · 2 bathrooms · 874 sq ft', ar: 'غرفتا نوم · حمّامان · 874 قدماً مربعاً' },
      price: { en: 'AED 1,850,000', ar: '1,850,000 درهم' },
      image: '/images/project-riviera-1.jpg',
      gallery: ['/images/project-riviera-1.jpg', '/images/project-riviera-2.jpg', '/images/project-riviera-3.jpg'],
      summary: {
        en: 'A ready, furnished two bedroom, two bathroom apartment of 874 sq ft in Riviera, Mohammed Bin Rashid City.',
        ar: 'شقة جاهزة ومفروشة بغرفتي نوم وحمّامين بمساحة 874 قدماً مربعاً في ريفييرا، مدينة محمد بن راشد.',
      },
      highlights: [
        { en: 'Ready to move in', ar: 'جاهزة للسكن' },
        { en: 'Fully furnished', ar: 'مفروشة بالكامل' },
        { en: '874 sq ft, 2 bathrooms', ar: '874 قدماً مربعاً وحمّامان' },
      ],
      postUrl: 'https://www.instagram.com/dubairealtorzubayr/reel/DeGhFFfhP_Z/',
    },
    {
      // From his reels of Oct 3, 2025 (full details, postUrl), Oct 7 (reel/DPgbZFdEQ_U) and
      // Oct 9 (reel/DPlIVfwEfOQ). His marketing claims (AED 25bn project, launched 2022,
      // "82% appreciation", "projected 15-20% annually") are deliberately not shown.
      id: 'rashid-yachts-marina',
      name: { en: 'Rashid Yachts & Marina', ar: 'راشد يخوت ومارينا' },
      developer: 'Emaar Properties',
      location: { en: 'Mina Rashid', ar: 'ميناء راشد' },
      category: 'off-plan',
      waterfront: true,
      status: { en: 'Off-plan · Completion 2028', ar: 'على الخارطة · الإنجاز في 2028' },
      unitTypes: { en: '1–4 bed apartments, penthouses and townhouses', ar: 'شقق من غرفة إلى أربع غرف، وبنتهاوس، وتاون هاوس' },
      price: { en: 'Price on request', ar: 'السعر عند الطلب' },
      image: '/images/project-rashid-1.jpg',
      gallery: ['/images/project-rashid-1.jpg', '/images/project-rashid-2.jpg', '/images/project-rashid-3.jpg'],
      summary: {
        en: 'Emaar’s waterfront community at Mina Rashid, Dubai’s first seaport, between Dubai Maritime City and Dubai Islands. About 10 minutes to Dubai International Airport and 20 minutes to Downtown Dubai.',
        ar: 'مجتمع إعمار على الواجهة البحرية في ميناء راشد، أول ميناء بحري في دبي، بين مدينة دبي الملاحية وجزر دبي. على بُعد نحو 10 دقائق من مطار دبي الدولي و20 دقيقة من وسط مدينة دبي.',
      },
      highlights: [
        { en: 'Dubai’s first seaport, near Al Shindagha Heritage Centre', ar: 'أول ميناء بحري في دبي، بالقرب من مركز الشندغة التراثي' },
        { en: 'Beach, infinity pools and a floating yacht club', ar: 'شاطئ ومسابح لا متناهية ونادٍ عائم لليخوت' },
        { en: '400+ superyacht berths, for yachts up to 100 m', ar: 'أكثر من 400 مرسى لليخوت الفاخرة بطول يصل إلى 100 متر' },
        { en: 'Queen Elizabeth 2 hotel', ar: 'فندق الملكة إليزابيث 2' },
        { en: '550+ retail stores, “Dubai Mall by the Sea”', ar: 'أكثر من 550 متجراً، «دبي مول على البحر»' },
        { en: '2 schools and 6 district parks', ar: 'مدرستان و6 حدائق' },
        { en: '80+ pools, 28 km of running tracks and 4 km of cycling paths', ar: 'أكثر من 80 مسبحاً و28 كم من مسارات الجري و4 كم من مسارات الدراجات' },
        { en: 'Golden Visa eligibility', ar: 'إمكانية الحصول على الإقامة الذهبية' },
      ],
      postUrl: 'https://www.instagram.com/dubairealtorzubayr/reel/DPWrA2bgWTY/',
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

  // Confirmed from his post of Oct 13, 2025. The exact award title isn't stated in the post.
  awards: [
    {
      title: { en: 'First-quarter award', ar: 'جائزة الربع الأول' },
      issuer: { en: 'Marrfa', ar: 'مارفا' },
      year: '2025',
      url: 'https://www.instagram.com/dubairealtorzubayr/p/DPvhBxykblE/',
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

  // His Instagram highlights "25-26 Oct" and "27th Sept" are these 2025 events. Images are placeholders.
  events: [
    {
      title: { en: 'Property Roadshow, Karachi', ar: 'المعرض العقاري المتنقل، كراتشي' },
      date: { en: '25–26 Oct 2025', ar: '25–26 أكتوبر 2025' },
      place: { en: 'Avari Towers, Karachi', ar: 'أفاري تاورز، كراتشي' },
      note: { en: 'Dubai property investment and the 10-year Golden Visa', ar: 'الاستثمار العقاري في دبي والإقامة الذهبية لمدة 10 سنوات' },
      image: '/images/event-1.jpg',
      url: 'https://www.instagram.com/dubairealtorzubayr/reel/DPRErUCDDbV/',
    },
    {
      title: { en: 'Ghaf Woods Open House', ar: 'يوم مفتوح في غاف وودز' },
      date: { en: '27 Sept 2025', ar: '27 سبتمبر 2025' },
      image: '/images/event-2.jpg',
      url: 'https://www.instagram.com/dubairealtorzubayr/reel/DOvPKYkEcxQ/',
    },
  ],

  // Developers seen in his posts.
  developers: ['BEYOND', 'Casagrand', 'Emaar', 'Azizi'],

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

  // To confirm with Akram before the site goes live. Everything here is either hidden
  // on the page or shown with safe wording ("price on request", placeholder photos).
  todo: [
    'Name: shown as "Akram Zubair" (LinkedIn + Estate Magazine); the offices flyer says "Zubair Akram". Confirm, plus the Arabic spelling (أكرم زبير)',
    'Current agency: shown as Rino Properties (tagged Oct 2026; he was at Marrfa in Oct 2025)',
    'RERA BRN: required on property ads in Dubai; hidden until provided',
    'Optional extras (hidden until provided): email, office location, languages',
    'Prices: Arancia Yards 2 and Rashid Yachts & Marina (shown as "price on request")',
    'Developers of the offices tower and the Riviera unit (not named in his posts)',
    'Exact title and a photo of the Marrfa first-quarter award (2025)',
    'Estate Magazine article URL (not findable online; the card links to his Instagram)',
    'Photos: original headshot (avatar is cropped from his Instagram profile picture), project renders, event photos',
    'Reels: link each cover to its post',
  ],
};
