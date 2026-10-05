import { productDiscoveryReferences } from './references.js'

export const leadershipScope = [
  {
    value: '5',
    label: 'direct managers',
    detail: 'Leading through Backend, Frontend, DevOps, QA and Delivery management.',
  },
  {
    value: '26',
    label: 'people in the organisation',
    detail: 'A distributed engineering organisation designed for clear ownership and dependable delivery.',
  },
  {
    value: '6',
    label: 'countries',
    detail: 'Global collaboration across cultures, time zones and specialist partners.',
  },
  {
    value: 'End-to-end',
    label: 'operating scope',
    detail: 'Roadmap, hiring, vendor and budget decisions, SRE, incidents, FinOps and architecture.',
  },
]

export const projects = [
  {
    index: '01',
    title: 'AI Engineering Transformation',
    description: 'I can lead the shift from individual AI tools to an accountable engineering delivery practice, connecting people, reusable skills, system context and specialist-agent workflows.',
    meta: 'Organisation & adoption · context & agents · AI-DLC delivery',
    link: '/ai-delivery',
    cta: 'Explore the transformation I can lead',
    image: '/assets/ai-delivery-system.webp',
    imageWidth: 1536,
    imageHeight: 1024,
    tone: 'dark',
  },
  {
    index: '02',
    title: 'Global Commerce Platform',
    description:
      'My architecture decision for three live brands: shared frontend and backend capabilities, distributed integrations and a foundation for further launches with the same team.',
    meta: '3 live brands · distributed systems · 40 transactional markets',
    link: '/work/commerce-platform',
    cta: 'Explore the platform',
    image: '/assets/commerce-platform.webp',
    imageWidth: 1774,
    imageHeight: 887,
    tone: 'light',
  },
  {
    index: '03',
    title: 'AI Product Discovery Architecture',
    description:
      'An independent, non-deployed reference architecture for grounded product discovery and governed AI assistance.',
    meta: 'Bedrock · Claude · LangGraph · FastAPI · RAGAS',
    link: '/work/applied-ai-product-discovery',
    cta: 'Explore the approach',
    image: '/assets/applied-ai-discovery.webp',
    imageWidth: 1774,
    imageHeight: 887,
    tone: 'light',
  },
]

export const career = [
  {
    date: '2026 to present',
    role: 'Global Head of Digital Engineering',
    company: 'Global luxury brand',
    detail: 'Five direct managers and a 26-person organisation across six countries, with accountability for the technology roadmap, hiring, vendors, budgets, reliability and applied AI.',
  },
  {
    date: '2024 to 2026',
    role: 'Delivery Lead, Digital Platforms',
    company: 'Global luxury brand',
    detail: 'Led zero-to-production platform delivery, SDLC and release governance for a shared multibrand commerce architecture.',
  },
  {
    date: '2022 to 2024',
    role: 'Technical Lead Engineer',
    company: 'Beyond Pricing',
    detail: 'Led four engineers delivering event-driven integrations and production Go services.',
  },
  {
    date: '2022 to 2024',
    role: 'Cloud Platform Engineer & MongoDB PS Consultant',
    company: 'Cogniflare',
    detail: 'Concurrent professional-services engagement alongside Beyond Pricing, delivering enterprise architecture assessments, MongoDB training and cloud platform work through April 2024.',
  },
  {
    date: '2016 to 2021',
    role: 'Engineering foundations',
    company: 'Worldline · Techonrails · A3SEC · NAGRA · CEPSA',
    detail: 'Built the hands-on foundation across AWS migration, distributed systems, cybersecurity, product development and full-stack delivery.',
  },
]

export const practices = [
  {
    index: '01',
    title: 'Engineering leadership',
    detail: 'Build and scale high-performing engineering teams with ownership, clarity and long-term impact.',
  },
  {
    index: '02',
    title: 'AI & delivery',
    detail: 'Turn emerging technology into working systems through disciplined delivery, experimentation and real-world use.',
  },
  {
    index: '03',
    title: 'Platform architecture',
    detail: 'Own complex distributed platforms across frontend and backend boundaries, queues, workers, data projections and operational recovery.',
  },
]

export const spectrum = [
  {
    title: 'Leadership',
    detail: 'Engineering organisations · roadmaps · vendors · budgets · incident leadership',
  },
  {
    title: 'Applied AI',
    detail: 'RAG · agents · Bedrock · LangChain · LangGraph · AI-DLC · evaluation · guardrails',
  },
  {
    title: 'Platforms',
    detail: 'AWS · Kubernetes · Terraform · Cloudflare · Azure Service Bus · RQ · observability',
  },
  {
    title: 'Engineering',
    detail: 'Python · Go · TypeScript · distributed systems · APIs · data',
  },
]

export const caseStudies = {
  '/work/commerce-platform': {
    number: '02 / Global commerce',
    breadcrumbLabel: 'Global Commerce Platform',
    status: 'Engineering leadership case study',
    editorialBasis:
      'First-hand engineering leadership case study focused on architecture decisions, delivery responsibilities and operational ownership. Employer and client identity are intentionally omitted.',
    title: 'Three brands. One shared platform direction.',
    intro:
      'I own a distributed commerce platform and chose its multibrand architecture across frontend and backend. The goal: release more brands with the same engineering team while retaining distinct experiences and clear system boundaries.',
    platformDetail: true,
    image: '/assets/commerce-platform.webp',
    imageAlt: 'Diagram of a cloud-native global commerce platform spanning markets, services and delivery pipelines',
    imageWidth: 1774,
    imageHeight: 887,
    facts: [
      { value: '40', label: 'transactional markets' },
      { value: '3', label: 'live brands' },
      { value: 'Async', label: 'queues, topics and workers' },
      { value: 'IaC', label: 'infrastructure and delivery' },
    ],
    roleSummary:
      'I own the platform direction, from multibrand architecture through engineering delivery and operational accountability.',
    decisions: [
      {
        title: 'One platform instead of duplicated stacks',
        detail: 'Chose shared frontend and backend capabilities with explicit brand boundaries. Build-time frontend selection, brand traits and common service contracts make reuse deliberate rather than accidental.',
      },
      {
        title: 'Delivery as an observable system',
        detail: 'Standardised infrastructure and delivery around Terraform, ArgoCD and operational telemetry so teams could release frequently with evidence.',
      },
      {
        title: 'Own the edge migration',
        detail: 'Led the staged Akamai-to-Cloudflare migration, connecting edge configuration, delivery planning and operational ownership.',
      },
    ],
    chapters: [
      {
        label: 'Context',
        title: 'One platform, distinct responsibilities.',
        copy: 'The architecture has to connect brand experiences, commerce state, customer systems, background work and operational ownership. Shared foundations must coexist with brand-specific capabilities and market rules.',
      },
      {
        label: 'System',
        title: 'More than synchronous services.',
        copy: 'Containerised services on AWS EKS operate alongside Azure queues and topics, RQ background jobs, persistent price scheduling, serverless asset processing and derived search/data models. Each execution model brings different recovery and consistency requirements.',
      },
      {
        label: 'Ownership',
        title: 'Shared architecture. Accountable operations.',
        copy: 'My scope connects the multibrand architecture, infrastructure and delivery foundations with operational ownership. The platform case includes the staged Akamai-to-Cloudflare migration and the responsibilities across services, integrations and engineering teams.',
      },
    ],
    ownership: 'Multibrand architecture · distributed systems · technology roadmap · delivery governance · operational ownership',
  },
  '/work/applied-ai-product-discovery': {
    number: '03 / Independent AI reference architecture',
    breadcrumbLabel: 'AI Product Discovery Architecture',
    status: 'Conceptual reference architecture, not deployed',
    editorialBasis:
      'Original conceptual reference architecture by Luis Angel Parada. Technical choices are explained against public product documentation; the architecture has not been commissioned or deployed for an employer or client.',
    title: 'A technical blueprint for governed AI product discovery.',
    intro:
      'A personal, employer-neutral conceptual architecture for combining conversational guidance with trustworthy product context. It has not been commissioned or deployed for any employer or client.',
    image: '/assets/applied-ai-discovery.webp',
    imageAlt: 'Conceptual AI product discovery architecture using LangGraph, hybrid retrieval and Bedrock',
    imageWidth: 1774,
    imageHeight: 887,
    facts: [
      { value: 'LangGraph', label: 'controlled agent workflow' },
      { value: 'Hybrid RAG', label: 'semantic + structured retrieval' },
      { value: 'RAGAS', label: 'regression evaluation' },
      { value: 'FastAPI', label: 'typed service boundary' },
    ],
    chapters: [
      {
        label: 'Product challenge',
        title: 'Conversation needs product truth.',
        copy: 'The reference system must understand open-ended intent while keeping recommendations anchored to approved attributes, availability and commercial rules. Unsupported answers fall back instead of becoming product advice.',
      },
      {
        label: 'Reference architecture',
        title: 'Orchestrate reasoning, retrieval and tools.',
        copy: 'FastAPI defines the service boundary while LangGraph coordinates intent classification, retrieval, bounded tool execution and response synthesis. Bedrock-hosted models use semantic search together with structured catalogue queries.',
      },
      {
        label: 'Quality and control',
        title: 'Evaluate the system, not only the answer.',
        copy: 'A golden test set and RAGAS-style measures cover faithfulness, relevance and retrieval quality. Citations, traces, guardrails and low-confidence fallbacks keep behaviour reviewable and human-led.',
      },
    ],
    flow: [
      'User intent',
      'Policy check',
      'Hybrid retrieval',
      'LangGraph workflow',
      'Bedrock model',
      'Grounded validation',
      'Cited response or safe fallback',
    ],
    questions: [
      {
        question: 'What does the reference system do?',
        answer: 'It illustrates how open-ended product questions can become grounded guidance by combining conversational intent with approved catalogue attributes, availability and commercial rules. When evidence is insufficient, the proposed system explains the limitation or falls back safely.',
      },
      {
        question: 'How does LangGraph control the workflow?',
        answer: 'LangGraph models the interaction as explicit states and transitions for intent classification, retrieval, bounded tool use, synthesis and review. That structure makes execution traceable and prevents an agent from skipping required checks.',
      },
      {
        question: 'Why combine semantic and structured retrieval?',
        answer: 'Semantic retrieval handles meaning and discovery; structured queries preserve precision for attributes, availability and rules. Hybrid retrieval keeps the experience conversational without treating generated language as product truth.',
      },
      {
        question: 'How would the system be evaluated and guarded?',
        answer: 'A golden test set and RAGAS-style measures track faithfulness, relevance and retrieval quality. Citations, tool boundaries, traces and low-confidence fallbacks keep responses reviewable and human-led.',
      },
    ],
    references: productDiscoveryReferences,
    ownership: 'Reference architecture · LangGraph orchestration · retrieval design · API contracts · evaluation · guardrails',
  },
}
