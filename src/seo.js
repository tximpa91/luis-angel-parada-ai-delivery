import { aiDeliveryReferences, productDiscoveryReferences } from './data/references.js'

const SITE_URL = 'https://luisangelparada.com'
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

export const routeSeo = {
  '/': {
    title: 'Luis Angel Parada | Head of Engineering & Applied AI Leader',
    description:
      'Engineering and Applied AI leader in Switzerland. Luis Angel Parada brings team leadership, distributed-platform ownership and AI transformation to roles and contracts.',
    shareTitle: 'Luis Angel Parada | Engineering Leadership & Applied AI',
    shareDescription: 'I lead engineering organisations, own complex platforms and help teams turn applied AI into working systems.',
    image: '/assets/luis-angel-parada-social-v1.png',
    imageAlt: 'Luis Angel Parada social card: engineering leadership, complex platforms and AI transformation',
    imageWidth: 1200,
    imageHeight: 630,
    openGraphType: 'website',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Portfolio',
    dateModified: '2026-10-02T11:33:32+02:00',
  },
  '/leadership-profile': {
    title: 'Head of Engineering & Applied AI Leadership | Luis Angel Parada',
    description:
      'Hire Luis Angel Parada for engineering leadership or AI transformation: manager-of-managers experience, distributed-platform ownership and roles or contracts.',
    shareTitle: 'Engineering Leadership | Luis Angel Parada',
    shareDescription: 'Engineering leader for complex distributed platforms, global teams and applied AI transformation.',
    image: '/assets/luis-angel-parada-social-v1.png',
    imageAlt: 'Luis Angel Parada social card: engineering leadership, complex platforms and AI transformation',
    imageWidth: 1200,
    imageHeight: 630,
    openGraphType: 'profile',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Leadership Profile',
    dateModified: '2026-10-02T11:33:32+02:00',
  },
  '/card': {
    title: 'Contact Luis Angel Parada | Engineering & Applied AI',
    description:
      'Connect with Luis Angel Parada, an engineering leader for complex platforms and applied AI. Save his contact details or explore his work.',
    shareTitle: 'Connect with Luis Angel Parada',
    shareDescription: 'Engineering leadership for complex platforms and applied AI. Save my contact or explore my work.',
    image: '/assets/luis-angel-parada-social-v1.png',
    imageAlt: 'Luis Angel Parada social card: engineering leadership, complex platforms and AI transformation',
    imageWidth: 1200,
    imageHeight: 630,
    openGraphType: 'profile',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Contact Card',
    dateModified: '2026-10-02T12:01:49+02:00',
    robots: 'noindex, follow',
  },
  '/ai-delivery': {
    title: 'AI Engineering Transformation & AI-DLC | Luis Angel Parada',
    description:
      'Luis Angel Parada can lead your AI engineering transformation: team practices, MCP context, specialist agents and governed AI-DLC delivery. Discuss a role or contract.',
    image: '/assets/ai-delivery-system.png',
    imageAlt: 'Governed AI delivery lifecycle and operating model',
    imageWidth: 1536,
    imageHeight: 1024,
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'AI Engineering Transformation',
    articleSection: 'Applied AI Engineering',
    keywords: ['AI engineering transformation', 'MCP context', 'specialised development subagents', 'reusable skills', 'AI-SDLC maturity', 'AI-DLC'],
    abstract: 'The engineering leadership capability Luis Angel Parada brings to organisational AI transformation, connecting use-case discovery, reusable skills, MCP context, specialised development subagents and governed AI-DLC delivery. His supporting experience includes operating L3 orchestration, with L4 implementation underway.',
    backstory: 'Luis Angel Parada describes his first-hand transformation work and states that L3 is operating and L4 implementation is underway. The maturity lens references an AWS conference framework and public AI-DLC methodology; it is not AWS certification or a claim of a completed autonomous software factory.',
    about: ['AI engineering transformation', 'Model Context Protocol', 'Specialised development subagents', 'AI-SDLC maturity', 'AI delivery lifecycle', 'Human-in-the-loop delivery'],
    citations: aiDeliveryReferences,
    dateModified: '2026-09-28T09:04:08+02:00',
  },
  '/work/commerce-platform': {
    title: 'Multibrand & Distributed Platform Architecture | Luis Angel Parada',
    description:
      'How Luis Angel Parada owns a three-brand distributed commerce platform: shared frontend and backend architecture, Azure messaging, RQ workers, data models and delivery governance.',
    image: '/assets/commerce-platform.png',
    imageAlt: 'Global commerce platform engineering case study',
    imageWidth: 1774,
    imageHeight: 887,
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'Global Commerce Platform',
    articleSection: 'Platform Engineering',
    keywords: ['multibrand architecture', 'distributed systems', 'Azure Service Bus', 'RQ workers', 'platform engineering', 'engineering leadership'],
    abstract: 'A first-hand engineering leadership case study of a three-brand commerce platform, explaining shared architecture, asynchronous execution, data ownership and the objective of further brand launches with the same team.',
    backstory: 'A first-hand account of architecture decisions, delivery responsibilities and operational ownership. Employer and client identity are intentionally omitted.',
    about: ['Multibrand architecture', 'Distributed systems', 'Azure Service Bus', 'Background workers', 'Platform engineering', 'Continuous delivery'],
    dateModified: '2026-09-28T09:04:08+02:00',
  },
  '/work/applied-ai-product-discovery': {
    title: 'AI Product Discovery Reference Architecture | Luis Angel Parada',
    description:
      'An independent, non-deployed technical reference architecture for governed AI product discovery using LangGraph, RAG, FastAPI, Bedrock, evaluation and guardrails.',
    image: '/assets/applied-ai-discovery.png',
    imageAlt: 'Independent conceptual AI product discovery reference architecture',
    imageWidth: 1774,
    imageHeight: 887,
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'AI Product Discovery Architecture',
    articleSection: 'Applied AI Engineering',
    keywords: ['LangGraph', 'AI product discovery', 'hybrid RAG', 'Amazon Bedrock', 'RAGAS', 'FastAPI'],
    abstract: 'An independent conceptual reference architecture showing how conversational product guidance could be grounded in approved catalogue data, evaluation evidence and controlled agent workflows.',
    backstory: 'An original personal reference architecture by Luis Angel Parada. It is supported by public product documentation and has not been commissioned or deployed for an employer or client.',
    about: ['LangGraph', 'Retrieval-augmented generation', 'Amazon Bedrock', 'AI evaluation', 'AI guardrails'],
    citations: productDiscoveryReferences,
    dateModified: '2026-09-28T09:04:08+02:00',
  },
}

export const notFoundSeo = {
  title: 'Page Not Found | Luis Angel Parada',
  description: 'The requested page could not be found.',
  image: '/assets/luis-angel-parada-social-v1.png',
  imageAlt: 'Luis Angel Parada social card: engineering leadership, complex platforms and AI transformation',
  imageWidth: 1200,
  imageHeight: 630,
  openGraphType: 'website',
  robots: 'noindex, follow',
}

export const indexableRoutes = Object.keys(routeSeo)

export function getSeoForPath(pathname) {
  const seo = routeSeo[pathname]
  if (!seo) return {
    ...notFoundSeo,
    shareTitle: notFoundSeo.title,
    shareDescription: notFoundSeo.description,
    imageUrl: `${SITE_URL}${notFoundSeo.image}`,
  }

  return {
    ...seo,
    canonical: `${SITE_URL}${pathname === '/' ? '/' : pathname}`,
    imageUrl: `${SITE_URL}${seo.image}`,
    shareTitle: seo.shareTitle || seo.title,
    shareDescription: seo.shareDescription || seo.description,
    robots: seo.robots || 'index, follow, max-image-preview:large',
  }
}

export function getStructuredData(pathname) {
  const seo = getSeoForPath(pathname)
  if (!routeSeo[pathname]) return null

  const person = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Luis Angel Parada',
    alternateName: 'Luis Ángel Parada Rodríguez',
    url: `${SITE_URL}/`,
    jobTitle: 'Global Head of Digital Engineering',
    description:
      'Digital engineering leader and hands-on builder across global commerce, applied AI, cloud platforms and governed software delivery.',
    sameAs: [
      'https://www.linkedin.com/in/luis-angel-parada',
      'https://github.com/tximpa91',
    ],
    knowsAbout: [
      { '@type': 'Thing', name: 'Digital engineering' },
      { '@type': 'Thing', name: 'Applied AI' },
      { '@type': 'Thing', name: 'AI delivery lifecycle' },
      {
        '@type': 'Thing',
        name: 'LangGraph',
        sameAs: 'https://reference.langchain.com/python/langgraph/overview',
      },
      { '@type': 'Thing', name: 'Global commerce platforms' },
      { '@type': 'Thing', name: 'Cloud architecture' },
    ],
    homeLocation: { '@type': 'Country', name: 'Switzerland' },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Global Head of Digital Engineering',
      description: 'Engineering leadership across global commerce, digital platforms, applied AI and governed software delivery.',
      skills: 'Engineering leadership, applied AI, platform architecture, cloud architecture, software delivery governance',
    },
    subjectOf: Object.entries(routeSeo)
      .filter(([, routeData]) => routeData.schemaType === 'TechArticle')
      .map(([route, routeData]) => ({
        '@type': routeData.schemaType,
        name: routeData.title,
        url: `${SITE_URL}${route}`,
      })),
  }

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'Luis Angel Parada',
    description: routeSeo['/'].description,
    publisher: { '@id': PERSON_ID },
    inLanguage: 'en',
  }

  const page = seo.schemaType === 'ProfilePage'
    ? {
        '@type': 'ProfilePage',
        '@id': `${seo.canonical}#profile`,
        url: seo.canonical,
        name: seo.title,
        description: seo.description,
        primaryImageOfPage: seo.imageUrl,
        mainEntity: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'en',
        ...(seo.dateModified ? { dateModified: seo.dateModified } : {}),
        publishingPrinciples: `${SITE_URL}/#editorial-standard`,
      }
    : {
        '@type': seo.schemaType,
        '@id': `${seo.canonical}#article`,
        url: seo.canonical,
        mainEntityOfPage: seo.canonical,
        headline: seo.title,
        description: seo.description,
        image: seo.imageUrl,
        author: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        articleSection: seo.articleSection,
        keywords: seo.keywords,
        abstract: seo.abstract,
        backstory: seo.backstory,
        about: seo.about.map((name) => ({ '@type': 'Thing', name })),
        ...(seo.citations?.length ? {
          citation: seo.citations.map((reference) => ({
            '@type': 'CreativeWork',
            name: reference.label,
            url: reference.href,
          })),
        } : {}),
        accountablePerson: { '@id': PERSON_ID },
        proficiencyLevel: 'Professional',
        publishingPrinciples: `${SITE_URL}/#editorial-standard`,
        inLanguage: 'en',
        datePublished: '2026-09-22',
        ...(seo.dateModified ? { dateModified: seo.dateModified } : {}),
      }

  const breadcrumb = pathname === '/' ? null : {
    '@type': 'BreadcrumbList',
    '@id': `${seo.canonical}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: seo.breadcrumbLabel,
        item: seo.canonical,
      },
    ],
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [person, website, page, ...(breadcrumb ? [breadcrumb] : [])],
  }
}
