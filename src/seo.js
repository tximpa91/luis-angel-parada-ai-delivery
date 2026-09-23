const SITE_URL = 'https://luisangelparada.com'
const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

export const routeSeo = {
  '/': {
    title: 'Luis Angel Parada | Digital Engineering & Applied AI Leader',
    description:
      'Luis Angel Parada is a Switzerland-based digital engineering leader specializing in global commerce platforms, applied AI, cloud architecture and AI-DLC.',
    image: '/assets/portfolio-systems.png',
    imageAlt: 'Luis Angel Parada portfolio: engineering systems, teams and outcomes',
    openGraphType: 'website',
    schemaType: 'ProfilePage',
    breadcrumbLabel: 'Portfolio',
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
  },
  '/work/applied-ai-product-discovery': {
    title: 'Boutique AI Sales Assistant Architecture | Luis Angel Parada',
    description:
      'An independent technical reference architecture for a boutique AI sales assistant using LangGraph, RAG, FastAPI, Bedrock, evaluation and guardrails.',
    image: '/assets/applied-ai-discovery.png',
    imageAlt: 'Independent boutique AI sales assistant reference architecture',
    openGraphType: 'article',
    schemaType: 'TechArticle',
    breadcrumbLabel: 'Boutique AI Sales Assistant',
    articleSection: 'Applied AI Engineering',
    keywords: ['LangGraph', 'AI sales assistant', 'hybrid RAG', 'Amazon Bedrock', 'RAGAS', 'FastAPI'],
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
      'Digital engineering',
      'Applied AI',
      'AI delivery lifecycle',
      'LangGraph',
      'Global commerce platforms',
      'Cloud architecture',
    ],
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

  const page = pathname === '/'
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
        inLanguage: 'en',
        datePublished: '2026-09-22',
        dateModified: '2026-09-23',
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
