export const proof = [
  { value: '1B', label: 'peak monthly requests' },
  { value: '273', label: 'deployments / week' },
  { value: '26', label: 'person engineering organisation' },
  { value: '$800k', label: 'annual Opex saved' },
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
    title: 'Conversational Product Discovery',
    description:
      'A capability pattern for useful, governed product guidance without client-specific implementation details.',
    meta: 'Grounding · evaluation · guardrails · human oversight',
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
    detail: 'Engineering organisation, technology roadmap, global commerce, applied AI and delivery systems.',
  },
  {
    date: '2024—2026',
    role: 'Delivery Lead, Digital Platforms',
    company: 'Global luxury brand',
    detail: 'Platform delivery, SDLC, release governance and multibrand architecture.',
  },
  {
    date: '2022—2024',
    role: 'Technical Lead Engineer',
    company: 'Beyond Pricing',
    detail: 'Event-driven integrations and production Go services.',
  },
  {
    date: '2022—2024',
    role: 'Cloud Platform Engineer & MongoDB PS Consultant',
    company: 'Cogniflare',
    detail: 'Enterprise architecture, MongoDB and cloud delivery.',
  },
  {
    date: '2016—2021',
    role: 'Engineering foundations',
    company: 'Worldline · Techonrails · A3SEC · NAGRA · CEPSA',
    detail: 'Cloud migration, distributed systems, cybersecurity, product development and full-stack delivery.',
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
    title: 'A commerce platform engineered for global scale.',
    intro:
      'A shared, multibrand platform that turns complex global operations into one observable and continuously delivered engineering system.',
    image: '/assets/commerce-platform.png',
    imageWidth: 1774,
    imageHeight: 887,
    facts: [
      { value: '40', label: 'transactional markets' },
      { value: '26', label: 'AWS EKS microservices' },
      { value: '176', label: 'pipelines and environments' },
      { value: '6 min', label: 'average deployment' },
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
    number: '03 / Applied AI capability',
    title: 'A safe pattern for conversational product discovery.',
    intro:
      'A high-level capability overview for grounding AI responses in approved product information while keeping quality, oversight and user trust at the centre. It intentionally contains no client implementation, data, metrics or deployment claims.',
    image: '/assets/applied-ai-discovery.png',
    imageWidth: 1774,
    imageHeight: 887,
    facts: [
      { value: 'Grounded', label: 'approved information' },
      { value: 'Evaluated', label: 'quality before release' },
      { value: 'Guarded', label: 'clear operating boundaries' },
      { value: 'Human-led', label: 'accountable decisions' },
    ],
    chapters: [
      {
        label: 'Opportunity',
        title: 'Useful before impressive.',
        copy: 'Conversational discovery should help people navigate choices without inventing facts or hiding uncertainty. Trust and usefulness are the product requirements.',
      },
      {
        label: 'Approach',
        title: 'Ground responses in approved context.',
        copy: 'A dependable assistant connects user intent with governed sources, applies explicit boundaries and makes uncertainty visible. The implementation should follow each company’s data and control environment.',
      },
      {
        label: 'Assurance',
        title: 'Treat quality as a product discipline.',
        copy: 'Evaluation, feedback loops, escalation paths and observability belong in the delivery model from the start—not as additions after launch.',
      },
    ],
    ownership: 'Capability framing · delivery model · evaluation strategy · guardrails · human oversight',
  },
}
