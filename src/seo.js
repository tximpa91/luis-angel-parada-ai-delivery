import { aiDeliveryReferences, productDiscoveryReferences } from './data/references.js'
import { professionalProfile } from './data/profile.js'

const SITE_URL = 'https://luisangelparada.com'
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

export const routeSeo = {
  '/': {
    title: 'Luis Angel Parada | Head of Engineering & AI | Switzerland',
    description:
      'Engineering leader in Switzerland for global teams, distributed platforms and AI transformation. Explore my experience, leadership roles and contract work.',
    shareTitle: 'Luis Angel Parada | Engineering Leadership & Applied AI',
    shareDescription: 'I lead engineering organisations, own complex platforms and help teams turn applied AI into working systems.',
    image: '/assets/luis-angel-parada-social-v1.png',
    imageAlt: 'Luis Angel Parada social card: engineering leadership, complex platforms and AI transformation',
    imageWidth: 1200,
    imageHeight: 630,
    openGraphType: 'website',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Portfolio',
    dateModified: professionalProfile.dateModified,
  },
  '/leadership-profile': {
    title: 'Engineering Leadership Roles & Contracts | Luis Angel Parada',
    description:
      'Head, Director and Applied AI leadership for Switzerland and remote Europe. Explore Luis Angel Parada’s team, platform and transformation experience.',
    shareTitle: 'Engineering Leadership | Luis Angel Parada',
    shareDescription: 'Engineering leader for complex distributed platforms, global teams and applied AI transformation.',
    image: '/assets/luis-angel-parada-social-v1.png',
    imageAlt: 'Luis Angel Parada social card: engineering leadership, complex platforms and AI transformation',
    imageWidth: 1200,
    imageHeight: 630,
    openGraphType: 'profile',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Leadership Profile',
    dateModified: professionalProfile.dateModified,
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
      'AI engineering transformation with Luis Angel Parada: specialist agents, MCP context and AI-DLC workflows supporting production releases with human approval.',
    image: '/assets/ai-delivery-system.png',
    imageAlt: 'Governed AI delivery lifecycle and operating model',
    imageWidth: 1536,
    imageHeight: 1024,
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'AI Engineering Transformation',
    articleSection: 'Applied AI Engineering',
    keywords: ['AI engineering transformation', 'MCP context', 'specialised development subagents', 'reusable skills', 'AI-SDLC maturity', 'AI-DLC'],
    abstract: 'The engineering leadership capability Luis Angel Parada brings to organisational AI transformation, connecting use-case discovery, reusable skills, MCP context and specialised development agents. His operating L3 AI-DLC workflow spans development, testing and independent validation through to production releases with human approval. L4 implementation is underway.',
    backstory: 'A first-hand account by Luis Angel Parada of transformation work with an operating L3 workflow supporting production releases with human approval, and L4 implementation underway. The maturity lens references an AWS conference framework and public AI-DLC methodology; it is not AWS certification or a claim of a completed autonomous software factory.',
    about: ['AI engineering transformation', 'Model Context Protocol', 'Specialised development subagents', 'AI-SDLC maturity', 'AI delivery lifecycle', 'Human-in-the-loop delivery'],
    citations: aiDeliveryReferences,
    dateModified: professionalProfile.dateModified,
  },
  '/work/commerce-platform': {
    title: 'Multibrand Commerce & Distributed Systems | Luis Angel Parada',
    description:
      'Three brands launched with the same engineering team. Luis Angel Parada’s shared commerce architecture spans distributed services, messaging and workers.',
    image: '/assets/commerce-platform.png',
    imageAlt: 'Global commerce platform engineering case study',
    imageWidth: 1774,
    imageHeight: 887,
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'Global Commerce Platform',
    articleSection: 'Platform Engineering',
    keywords: ['multibrand architecture', 'distributed systems', 'Azure Service Bus', 'RQ workers', 'platform engineering', 'engineering leadership'],
    abstract: 'A first-hand engineering leadership case study of three brands launched with the same engineering team, explaining Luis Angel Parada’s shared frontend and backend architecture, asynchronous execution, data ownership and operational responsibilities.',
    backstory: 'A first-hand account of architecture decisions, delivery responsibilities and operational ownership. Employer and client identity are intentionally omitted.',
    about: ['Multibrand architecture', 'Distributed systems', 'Azure Service Bus', 'Background workers', 'Platform engineering', 'Continuous delivery'],
    dateModified: professionalProfile.dateModified,
  },
  '/work/applied-ai-product-discovery': {
    title: 'LangGraph & RAG Reference Architecture | Luis Angel Parada',
    description:
      'An independent AI product discovery blueprint by Luis Angel Parada, using LangGraph, RAG, Bedrock and evaluation. Conceptual architecture, not deployed.',
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
    dateModified: professionalProfile.dateModified,
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
    description: professionalProfile.description,
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
