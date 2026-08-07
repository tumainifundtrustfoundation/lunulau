import React, { useEffect } from 'react';

interface SEOHeadProps {
  activeView: string;
}

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogType?: string;
  ogImage?: string;
  categoryName?: string;
}

const SITE_NAME = 'Lupanulla Elimu Hub';
const BASE_URL = 'https://lupanulla.co.tz';
const DEFAULT_IMAGE = `${BASE_URL}/logo.jpg`;

const SEO_MAPPINGS: Record<string, SEOData> = {
  portal: {
    title: 'Lupanulla Elimu Hub | Kitovu cha Elimu Tanzania - Notisi, Mitihani na Ratiba za NECTA',
    description: 'Jukwaa namba moja la elimu Tanzania. Pata notisi za Form 1 - 6, mitihani ya NECTA past papers, ratiba rasmi za mitihani, matokeo, duka la vitabu, na msaidizi wa AI.',
    keywords: 'Lupanulla, Elimu Hub, Notisi Tanzania, Mitihani ya NECTA, NECTA past papers, CSEE, FTNA, ACSEE, Form 4 past papers, Form 2 past papers, ratiba ya necta, kiswahili notes, fizikia notes, elimu tanzania',
    canonicalUrl: `${BASE_URL}/`,
    categoryName: 'Nyumbani'
  },
  masomo: {
    title: 'Notisi na Mada za Masomo Yote Sekondari (Form 1 - 6) | Lupanulla Elimu Hub',
    description: 'Soma na pakua notisi na mada za masomo yote ya sekondari Tanzania: Kiswahili, Physics, Chemistry, Biology, Mathematics, Geography, History, Civics na English kulingana na mtaala wa NECTA.',
    keywords: 'Notisi za sekondari tanzania, form 1 notes, form 2 notes, form 3 notes, form 4 notes, form 5 notes, form 6 notes, notes za kiswahili, physics notes, chemistry notes, biology notes tanzania',
    canonicalUrl: `${BASE_URL}/masomo`,
    categoryName: 'Masomo na Notisi'
  },
  mitihani: {
    title: 'Mitihani ya NECTA & Past Papers za Form 2, Form 4 na Form 6 | Lupanulla',
    description: 'Pakua na usome mitihani ya NECTA na Past Papers bure: CSEE, FTNA, ACSEE, Mocks za Mikoa, na Marking Schemes rasmi za masomo yote tangu 2000 hadi 2026.',
    keywords: 'NECTA past papers, mitihani ya necta, form 4 past papers, form 2 past papers, form 6 past papers, CSEE past papers, FTNA past papers, regional mock exams, marking schemes necta',
    canonicalUrl: `${BASE_URL}/mitihani`,
    categoryName: 'Mitihani ya NECTA'
  },
  timetable: {
    title: 'Ratiba Rasmi ya NECTA 2025/2026 - CSEE, FTNA na ACSEE | Lupanulla Elimu Hub',
    description: 'Kagua na pakua ratiba rasmi ya mitihani ya taifa ya NECTA 2025/2026 kwa Kidato cha Pili (FTNA), Kidato cha Nne (CSEE), na Kidato cha Sasa (ACSEE). Tazama tarehe za masomo na muda wa mitihani.',
    keywords: 'Ratiba ya NECTA, NECTA timetable 2025, ratiba ya mtihani wa kidato cha nne, CSEE timetable, FTNA timetable, ACSEE timetable, ratiba ya necta pdf, necta timetable download',
    canonicalUrl: `${BASE_URL}/timetable`,
    categoryName: 'Ratiba ya NECTA'
  },
  library: {
    title: 'Maktaba ya Dijitali ya Vitabu na Notisi Tanzania | Lupanulla Elimu Hub',
    description: 'Tafuta na pakua vitabu vya kiada, notisi zilizoidhinishwa, na miongozo ya walimu katika Maktaba Kuu ya Dijitali ya Lupanulla Elimu Hub.',
    keywords: 'Maktaba ya Lupanulla, vitabu vya necta, digital library tanzania, books download tanzania, secondary school textbooks, miongozo ya walimu',
    canonicalUrl: `${BASE_URL}/library`,
    categoryName: 'Maktaba Kuu'
  },
  matokeo: {
    title: 'Matokeo ya NECTA CSEE, FTNA na ACSEE | Lupanulla Elimu Hub',
    description: 'Kagua matokeo ya mitihani ya NECTA CSEE (Form 4), FTNA (Form 2), na ACSEE (Form 6) kwa haraka, kwa mfumo rahisi wa kutafuta shule na namba ya mtahiniwa.',
    keywords: 'Matokeo ya NECTA, necta results, matokeo ya kidato cha nne, matokeo ya kidato cha pili, matokeo form 4, matokeo form 6, necta format 2025, matokeo ya necta tanzania',
    canonicalUrl: `${BASE_URL}/matokeo`,
    categoryName: 'Matokeo ya NECTA'
  },
  combinations: {
    title: 'Mwongozo wa Combinations za Kidato cha 5 na 6 Tanzania | Lupanulla',
    description: 'Pata ushauri na mwongozo kamili wa kuchagua Combinations za Kidato cha Tano na Seta (PCB, PCM, HGL, HGK, EGM, ECA, CBG, HKL) na viwango vya udahili vya Vyuo Vikuu (TCU Cut-off Points).',
    keywords: 'Form 5 combinations, A-Level combinations tanzania, PCB combination, PCM combination, CBG combination, university cut-off points tanzania, TCU guide',
    canonicalUrl: `${BASE_URL}/combinations`,
    categoryName: 'Combinations za A-Level'
  },
  workspace: {
    title: 'Lupanulla Workspace - Msaidizi wa AI kwa Wanafunzi na Walimu',
    description: 'Tumia akili mbandia (AI) kusoma, kutatua maswali magumu, kuandika insha, kutafsiri masomo, na kutengeneza ratiba binafsi za kujisomea.',
    keywords: 'Lupanulla AI workspace, msaidizi wa AI elimu, tanzania AI education tool, solve homework AI tanzania, mwalimu wa AI',
    canonicalUrl: `${BASE_URL}/workspace`,
    categoryName: 'AI Workspace'
  },
  mwalimuhub: {
    title: 'Mwalimu Hub - Zana za Walimu, Scheme of Work na Lesson Plans | Lupanulla',
    description: 'Kitovu maalum cha walimu Tanzania: tengeneza Lesson Plans, Scheme of Work, Log Books, na ratiba za vipindi kiotomatiki kulingana na mtaala mpya wa NECTA.',
    keywords: 'Mwalimu Hub, scheme of work tanzania, lesson plan format tanzania, necta syllabus, teacher tools tanzania, ratiba ya walimu',
    canonicalUrl: `${BASE_URL}/mwalimuhub`,
    categoryName: 'Mwalimu Hub'
  },
  forum: {
    title: 'Jukwaa la Wanafunzi na Walimu Tanzania | Lupanulla Forum',
    description: 'Jiunge na majadiliano ya kisomo, uliza maswali ya masomo magumu, na shiriki uzoefu na wanafunzi na walimu kote nchini Tanzania.',
    keywords: 'Lupanulla forum, jukwaa la elimu tanzania, majadiliano ya wanafunzi, elimu ya sekondari forum, uliza maswali tanzania',
    canonicalUrl: `${BASE_URL}/forum`,
    categoryName: 'Jukwaa la Elimu'
  },
  fisimaji: {
    title: 'Duka la Vitabu na Vifaa vya Shule | Fisimaji Store Lupanulla',
    description: 'Nunua vitabu vya masomo, past papers zilizochapishwa, na vifaa vya shule kwa bei nafuu kupitia Fisimaji Store na utumishi wa haraka Tanzania.',
    keywords: 'Fisimaji store, nunua vitabu tanzania, school supplies online tanzania, necta revision book shop, duka la vitabu tanzania',
    canonicalUrl: `${BASE_URL}/fisimaji`,
    categoryName: 'Duka la Fisimaji'
  },
  videos: {
    title: 'Masomo ya Video za Masomo Yote ya Sekondari | Lupanulla Videos',
    description: 'Tazama masomo ya video kutoka kwa walimu bora Tanzania. Jifunze Fizikia, Kemia, Biolojia, Hisabati na Kiswahili kwa njia ya picha na sauti iliyo wazi.',
    keywords: 'Video lessons tanzania, masomo ya video necta, physics video lessons, online learning tanzania, masomo kwa njia ya video',
    canonicalUrl: `${BASE_URL}/videos`,
    categoryName: 'Masomo ya Video'
  },
  leaderboard: {
    title: 'Bodi ya Uongozi wa Wanafunzi (Leaderboard) | Lupanulla Elimu Hub',
    description: 'Orodha ya wanafunzi bora wanaofanya vizuri katika mazoezi na mitihani ya majaribio katika jukwaa la Lupanulla Elimu Hub.',
    keywords: 'Leaderboard lupanulla, wanafunzi bora tanzania, necta top students, mazoezi ya mitihani',
    canonicalUrl: `${BASE_URL}/leaderboard`,
    categoryName: 'Bodi ya Uongozi'
  },
  nectaProgress: {
    title: 'Ufuatiliaji wa Maendeleo ya NECTA (NECTA Progress Tracker) | Lupanulla',
    description: 'Pima na fuatilia maendeleo yako ya kujiandaa na mtihani wa taifa wa NECTA kwa kuhesabu mada ulizomaliza na mitihani uliyofanya.',
    keywords: 'NECTA progress tracker, maendeleo ya mitihani, kujiandaa na necta, form 4 revision checklist',
    canonicalUrl: `${BASE_URL}/nectaProgress`,
    categoryName: 'Ufuatiliaji wa NECTA'
  }
};

export const SEOHead: React.FC<SEOHeadProps> = ({ activeView }) => {
  useEffect(() => {
    const seoData = SEO_MAPPINGS[activeView] || SEO_MAPPINGS.portal;

    // 1. Update Document Title
    document.title = seoData.title;

    // Helper function to update or create a meta tag
    const setMeta = (selector: string, attribute: string, value: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tag
    const setLink = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Set Meta Description, Keywords, and Robots
    setMeta('meta[name="description"]', 'name', 'description', seoData.description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', seoData.keywords);
    setMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMeta('meta[name="author"]', 'name', 'author', 'Lupanulla Elimu Hub');

    // 3. Set Canonical URL
    setLink('canonical', seoData.canonicalUrl);

    // 4. OpenGraph Tags
    setMeta('meta[property="og:title"]', 'property', 'og:title', seoData.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seoData.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', seoData.canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', seoData.ogType || 'website');
    setMeta('meta[property="og:image"]', 'property', 'og:image', seoData.ogImage || DEFAULT_IMAGE);
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', 'sw_TZ');

    // 5. Twitter Card Tags
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seoData.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seoData.description);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', seoData.canonicalUrl);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seoData.ogImage || DEFAULT_IMAGE);

    // 6. JSON-LD Breadcrumb Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Nyumbani',
          'item': BASE_URL
        },
        ...(seoData.categoryName && activeView !== 'portal' ? [{
          '@type': 'ListItem',
          'position': 2,
          'name': seoData.categoryName,
          'item': seoData.canonicalUrl
        }] : [])
      ]
    };

    let breadcrumbScript = document.getElementById('json-ld-breadcrumb');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'json-ld-breadcrumb';
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);

    // 7. JSON-LD Page / LearningResource Schema
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': activeView === 'portal' ? 'EducationalOrganization' : 'LearningResource',
      'name': seoData.title,
      'description': seoData.description,
      'url': seoData.canonicalUrl,
      'provider': {
        '@type': 'Organization',
        'name': SITE_NAME,
        'url': BASE_URL,
        'logo': DEFAULT_IMAGE
      },
      'inLanguage': 'sw',
      'educationalUse': 'Exam Preparation & Classroom Learning',
      'learningResourceType': activeView === 'mitihani' ? 'Examination Past Paper' : activeView === 'masomo' ? 'Course Notes' : 'Educational Platform'
    };

    let pageScript = document.getElementById('json-ld-page');
    if (!pageScript) {
      pageScript = document.createElement('script');
      pageScript.id = 'json-ld-page';
      pageScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(pageScript);
    }
    pageScript.textContent = JSON.stringify(pageSchema);

  }, [activeView]);

  return null;
};

export default SEOHead;
