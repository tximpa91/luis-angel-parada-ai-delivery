import { productDiscoveryReferences } from './references.js'

export const proof = [
  { value: '1B', label: 'peak monthly requests' },
  { value: '273', label: 'deployments / week' },
  { value: '6 min', label: 'average deployment' },
  { value: '$800k', label: 'annual Opex saved' },
]

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
    title: 'AI Delivery Operating System',
    description: 'From AI-assisted coding to governed, evidence-led software delivery.',
    meta: 'Implementation · independent validation · deployment · QA',
    link: '/ai-delivery',
    cta: 'Open case study',
    image: '/assets/ai-delivery-system.png',
    imageWidth: 1536,
    imageHeight: 1024,
    tone: 'dark',
  },
  {
    index: '02',
    title: 'Global Commerce Platform',
    description:
      'A shared multibrand architecture built for global reach, reliability and continuous delivery.',
    meta: '40 transactional markets · up to 1B monthly requests',
    link: '/work/commerce-platform',
    cta: 'Explore the platform',
    image: '/assets/commerce-platform.png',
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
    image: '/assets/applied-ai-discovery.png',
    imageWidth: 1774,
    imageHeight: 887,
    tone: 'light',
  },
]

export const career = [
  {
    date: '2026—Now',
    role: 'Global Head of Digital Engineering',
    company: 'Global luxury brand',
    detail: 'Five direct managers and a 26-person organisation across six countries, with accountability for the technology roadmap, hiring, vendors, budgets, reliability and applied AI.',
  },
  {
    date: '2024—2026',
    role: 'Delivery Lead, Digital Platforms',
    company: 'Global luxury brand',
    detail: 'Led zero-to-production platform delivery, SDLC and release governance for a shared multibrand commerce architecture.',
  },
  {
    date: '2022—2024',
    role: 'Technical Lead Engineer',
    company: 'Beyond Pricing',
    detail: 'Led four engineers delivering event-driven integrations and production Go services.',
  },
  {
    date: '2022—2024',
    role: 'Cloud Platform Engineer & MongoDB PS Consultant',
    company: 'Cogniflare',
    detail: 'Concurrent professional-services engagement alongside Beyond Pricing, delivering enterprise architecture assessments, MongoDB training and cloud platform work through April 2024.',
  },
  {
    date: '2016—2021',
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
    detail: 'Design and evolve resilient platforms that enable global commerce and accelerate what comes next.',
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
    detail: 'AWS · Kubernetes · Terraform · GitOps · Cloudflare · observability',
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
      'First-hand engineering leadership case study. Scale, delivery and operating-cost figures summarize platform operating data from the period described; employer and client identity are intentionally omitted.',
    title: 'A commerce platform engineered for global scale.',
    intro:
      'A shared, multibrand platform that turns complex global operations into one observable and continuously delivered engineering system.',
    image: '/assets/commerce-platform.png',
    imageAlt: 'Diagram of a cloud-native global commerce platform spanning markets, services and delivery pipelines',
    imageWidth: 1774,
    imageHeight: 887,
    facts: [
      { value: '40', label: 'transactional markets' },
      { value: '26', label: 'AWS EKS microservices' },
      { value: '176', label: 'pipelines and environments' },
      { value: '6 min', label: 'average deployment' },
    ],
    evidence: [
      {
        claim: 'Peak traffic',
        value: 'Up to 1B requests in a peak month',
        context: 'Observed operating scale across the multibrand commerce platform during peak periods.',
      },
      {
        claim: 'Delivery cadence',
        value: '273 deployments per week',
        context: 'A delivery-throughput measure across the platform pipeline and environment landscape.',
      },
      {
        claim: 'Deployment speed',
        value: '6-minute average deployment',
        context: 'Average pipeline deployment duration used to track delivery-system performance.',
      },
      {
        claim: 'Operating leverage',
        value: 'Approximately $800k annual Opex removed',
        context: 'Annualized infrastructure savings attributed to the Akamai-to-Cloudflare migration.',
      },
    ],
    roleSummary:
      'I led the architecture and zero-to-production delivery, aligned engineering execution with the roadmap, and owned SDLC, release, vendor and reliability decisions across the platform.',
    decisions: [
      {
        title: 'One platform instead of duplicated stacks',
        detail: 'Established a shared multibrand architecture with brand-aware routing, common services and backward-compatible evolution across markets.',
      },
      {
        title: 'Delivery as an observable system',
        detail: 'Standardised infrastructure and delivery around Terraform, ArgoCD and operational telemetry so teams could release frequently with evidence.',
      },
      {
        title: 'Move control and cost to the edge',
        detail: 'Led the staged Akamai-to-Cloudflare migration to improve platform control while removing approximately $800k in annual operating cost.',
      },
    ],
    chapters: [
      {
        label: 'Context',
        title: 'One platform, many markets.',
        copy: 'The challenge was bigger than shipping features: align architecture, delivery, reliability and team ownership across a global commerce estate serving millions of visitors.',
      },
      {
        label: 'System',
        title: 'Cloud-native by design.',
        copy: 'Twenty-six microservices run on AWS EKS with infrastructure expressed through Terraform, delivery orchestrated by ArgoCD and change flowing through a broad pipeline and environment landscape.',
      },
      {
        label: 'Outcome',
        title: 'Scale with operational leverage.',
        copy: 'The platform supports up to one billion requests in peak months and 273 deployments per week. The Akamai-to-Cloudflare migration also removed approximately $800k in annual operating cost.',
      },
    ],
    ownership: 'Technology roadmap · SDLC · release governance · platform delivery · vendors · reliability',
  },
  '/work/applied-ai-product-discovery': {
    number: '03 / Independent AI reference architecture',
    breadcrumbLabel: 'AI Product Discovery Architecture',
    status: 'Conceptual reference architecture — not deployed',
    editorialBasis:
      'Original conceptual reference architecture by Luis Angel Parada. Technical choices are explained against public product documentation; the architecture has not been commissioned or deployed for an employer or client.',
    title: 'A technical blueprint for governed AI product discovery.',
    intro:
      'A personal, employer-neutral conceptual architecture for combining conversational guidance with trustworthy product context. It has not been commissioned or deployed for any employer or client.',
    image: '/assets/applied-ai-discovery.png',
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
