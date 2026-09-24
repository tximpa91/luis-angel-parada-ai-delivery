import { aiDeliveryReferences, productDiscoveryReferences } from './data/references.js'

const SITE_URL = 'https://luisangelparada.com'
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

export const routeSeo = {
  '/': {
    title: 'Luis Angel Parada | Digital Engineering & Applied AI Leader',
    description:
      'Luis Angel Parada is a Switzerland-based engineering leader managing five managers and a 26-person global organisation across platforms, commerce and applied AI.',
    image: '/assets/portfolio-systems.png',
    imageAlt: 'Luis Angel Parada portfolio: engineering systems, teams and outcomes',
    openGraphType: 'website',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Portfolio',
  },
  '/leadership-profile': {
    title: 'Engineering Leadership Profile | Luis Angel Parada',
    description:
      'Leadership profile of Luis Angel Parada: Global Head of Digital Engineering leading five managers and a 26-person engineering organisation across six countries.',
    image: '/assets/portfolio-systems.png',
    imageAlt: 'Luis Angel Parada engineering leadership profile',
    openGraphType: 'profile',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Leadership Profile',
  },
  '/ai-delivery': {
    title: 'AI Delivery Lifecycle (AI-DLC) | Luis Angel Parada',
    description:
      'A governed AI delivery operating model for moving from AI-assisted coding to validated, human-led implementation, deployment and QA.',
    image: '/assets/ai-delivery-system.png',
    imageAlt: 'Governed AI delivery lifecycle and operating model',
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'AI Delivery Lifecycle',
    articleSection: 'Applied AI Engineering',
    keywords: ['AI-DLC', 'AI delivery lifecycle', 'AI engineering', 'human validation', 'software delivery governance'],
    abstract: 'AI-DLC is a human-led operating model for using AI across software delivery while keeping validation, deployment authority and risk acceptance accountable to people.',
    backstory: 'An original operating model by Luis Angel Parada, informed by first-hand platform delivery and SDLC governance work. It is a personal framework, not an industry standard or prior client deliverable.',
    about: ['AI delivery lifecycle', 'AI engineering governance', 'Independent software validation', 'Human-in-the-loop delivery'],
    citations: aiDeliveryReferences,
  },
  '/work/commerce-platform': {
    title: 'Global Commerce Platform Engineering | Luis Angel Parada',
    description:
      'Case study of a cloud-native multibrand commerce platform spanning 40 markets, 26 EKS microservices, 273 weekly deployments and up to 1B monthly requests.',
    image: '/assets/commerce-platform.png',
    imageAlt: 'Global commerce platform engineering case study',
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'Global Commerce Platform',
    articleSection: 'Platform Engineering',
    keywords: ['global commerce platform', 'AWS EKS', 'platform engineering', 'continuous delivery', 'cloud architecture'],
    abstract: 'A first-hand engineering leadership case study of a cloud-native multibrand commerce platform operating across 40 transactional markets.',
    backstory: 'Scale, delivery and operating-cost figures summarize platform operating data from the period described; employer and client identity are intentionally omitted.',
    about: ['Global commerce platforms', 'Platform engineering', 'AWS EKS', 'Continuous delivery', 'Cloud infrastructure'],
  },
  '/work/applied-ai-product-discovery': {
    title: 'AI Product Discovery Reference Architecture | Luis Angel Parada',
    description:
      'An independent, non-deployed technical reference architecture for governed AI product discovery using LangGraph, RAG, FastAPI, Bedrock, evaluation and guardrails.',
    image: '/assets/applied-ai-discovery.png',
    imageAlt: 'Independent conceptual AI product discovery reference architecture',
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'AI Product Discovery Architecture',
    articleSection: 'Applied AI Engineering',
    keywords: ['LangGraph', 'AI product discovery', 'hybrid RAG', 'Amazon Bedrock', 'RAGAS', 'FastAPI'],
    abstract: 'An independent conceptual reference architecture showing how conversational product guidance could be grounded in approved catalogue data, evaluation evidence and controlled agent workflows.',
    backstory: 'An original personal reference architecture by Luis Angel Parada. It is supported by public product documentation and has not been commissioned or deployed for an employer or client.',
    about: ['LangGraph', 'Retrieval-augmented generation', 'Amazon Bedrock', 'AI evaluation', 'AI guardrails'],
    citations: productDiscoveryReferences,
  },
}

export const notFoundSeo = {
  title: 'Page Not Found | Luis Angel Parada',
  description: 'The requested page could not be found.',
  image: '/assets/portfolio-systems.png',
  imageAlt: 'Luis Angel Parada engineering portfolio',
  openGraphType: 'website',
  robots: 'noindex, follow',
}

export const indexableRoutes = Object.keys(routeSeo)

export function getSeoForPath(pathname) {
  const seo = routeSeo[pathname]
  if (!seo) return notFoundSeo

  return {
    ...seo,
    canonical: `${SITE_URL}${pathname === '/' ? '/' : pathname}`,
    imageUrl: `${SITE_URL}${seo.image}`,
    robots: 'index, follow, max-image-preview:large',
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
        dateModified: '2026-09-24',
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
        dateModified: '2026-09-24',
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
