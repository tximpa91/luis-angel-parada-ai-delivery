export const platformDomains = [
  {
    id: 'experience',
    title: 'Brand experiences & operational tools',
    subtitle: 'Different identities. Shared engineering capabilities.',
    technologies: 'React · Next.js · TypeScript · REST / GraphQL',
    description: 'Customer storefronts and internal tools are separate surfaces of the same platform. The multibrand frontend selects the brand at build time, reusing common journeys while keeping brand-specific presentation and behaviour behind explicit boundaries.',
    capabilities: [
      ['Shared foundation', 'Account, catalogue and commerce capabilities can evolve centrally instead of becoming a separate implementation for each brand.'],
      ['Deliberate variation', 'Brand traits, capability flags, component seams, CMS adapters and design tokens preserve distinct experiences without scattering brand conditions through every feature.'],
      ['Server-side ownership', 'Checkout and customer operations need server-side access checks. Internal operational tools coordinate multiple services; hiding a button is not a substitute for backend permission enforcement.'],
    ],
    tradeoff: 'Reuse does not mean every brand has identical features. A capability must be explicitly supported, disabled or adapted, and a shared change needs verification across the affected brand builds.',
  },
  {
    id: 'transactions',
    title: 'Commerce & financial lifecycles',
    subtitle: 'Business invariants across independently failing systems.',
    technologies: 'Python services · typed APIs · payment-provider integrations',
    description: 'Orders, payments, financing, fraud, gifting, fulfilment and after-sales are connected domains with different responsibilities. The difficult work is coordinating their state, not simply connecting their APIs.',
    capabilities: [
      ['Order lifecycle', 'Order creation, capture, shipment, tracking, returns and refunds involve multiple transitions, including partial payments and split fulfilment.'],
      ['Market-specific rules', 'Payment methods, financing eligibility, currencies and provider configuration vary by market and brand while using shared transaction contracts.'],
      ['Customer and partner boundaries', 'CRM, retail inventory, communication and after-sales integrations extend the platform beyond the storefront and need clear sources of truth.'],
    ],
    tradeoff: 'A remote payment can succeed while a local update fails. Domain idempotency, explicit state transitions and reconciliation are needed; a database transaction cannot make every external side effect atomic.',
  },
  {
    id: 'asynchronous',
    title: 'Queues, topics & background workers',
    subtitle: 'Decouple work without losing accountability.',
    technologies: 'Azure Service Bus · RQ / Redis · SQL scheduling · SQS / Lambda',
    description: 'The platform uses more than one asynchronous execution model. Event consumers, local jobs, scheduled business changes and serverless tasks have different ordering, persistence and retry requirements.',
    capabilities: [
      ['Azure event transport', 'Queues handle dedicated processing paths; topics and subscriptions let independent integrations react to relevant events. Consumers have their own completion, retry and dead-letter responsibilities.'],
      ['RQ background jobs', 'Redis-backed RQ workers handle retail inventory-cache refresh and access-log work outside request handling. Job storage must be assessed separately from rebuildable cache storage.'],
      ['Scheduled and serverless work', 'A database-backed scheduler persists future price changes. Asset tasks use SQS and Lambda. These are distinct mechanisms, not different names for the same queue.'],
    ],
    tradeoff: 'Some work can scale across consumers; other flows deliberately use a single executor. Ordering requirements and replay safety determine that choice. A running worker is not proof that work is progressing.',
  },
  {
    id: 'data',
    title: 'Data ownership, search & projections',
    subtitle: 'Fast reads, explicit authority and recoverable state.',
    technologies: 'PostgreSQL · DynamoDB · Algolia · Redis-compatible caches',
    description: 'The commerce core, configuration and customer domains own different data. Search indexes and a relational replica provide specialised read models derived from upstream changes; they are not automatically the authority for financial transactions.',
    capabilities: [
      ['Derived read models', 'Event consumers update search and relational projections for discovery, operational queries and exports. Supported replay paths can fetch current upstream data rather than reapply an obsolete payload.'],
      ['Brand and market context', 'Configuration, customer data and indexes need explicit brand/market scope. Shared infrastructure must not imply unintentional sharing of customer or commercial state.'],
      ['Freshness and recovery', 'Caches and projections require invalidation, freshness monitoring and rebuild strategies. A submitted indexing task is not the same as a result already being searchable.'],
    ],
    tradeoff: 'Specialised read models improve access patterns but introduce eventual consistency. Capacity planning must include aggregate database connections, upstream load and the cost of rebuilding derived data.',
  },
  {
    id: 'operations',
    title: 'Cloud, edge & operating topology',
    subtitle: 'Architecture continues after a feature is released.',
    technologies: 'AWS EKS · Docker · Terraform · Cloudflare · observability',
    description: 'Container workloads, infrastructure-as-code and edge policies form the operating environment. APIs, event consumers and maintenance jobs have different resource, scaling and recovery characteristics.',
    capabilities: [
      ['Workload separation', 'Kubernetes manifests distinguish APIs, workers and scheduled jobs, with independent replica counts, resource budgets, health checks and secret integration.'],
      ['Edge policy', 'Domain routing, locale redirects, cache keys, security rules and maintenance behaviour are part of the platform contract, not decorative infrastructure.'],
      ['Edge coordination', 'Cache-warming work uses Worker service bindings, KV and Durable Objects to coordinate dispatch, regional completion, duplicate callbacks and recovery deadlines.'],
    ],
    tradeoff: 'Desired infrastructure configuration is not proof of live health. Cache-hit behaviour, worker progress, database saturation and recovery need their own evidence, beyond a green deployment or liveness probe.',
  },
  {
    id: 'delivery',
    title: 'Delivery governance & engineering ownership',
    subtitle: 'Independent services. Coordinated change.',
    technologies: 'Versioned contracts · CI/CD · cross-repository coordination · QA',
    description: 'A shared platform evolves across independent repositories, package versions and release boundaries. Delivery governance connects architecture decisions to changes that can be reviewed, verified and traced.',
    capabilities: [
      ['Cross-repository evolution', 'Shared authentication, market and payment contracts require compatible rollout. Repository coordination tracks source revisions rather than treating a folder of clones as a release.'],
      ['Layered verification', 'Service tests, frontend tests, journey checks and operational diagnostics answer different questions. A broad test inventory is not a guarantee that every cross-brand business flow is covered.'],
      ['Accountable ownership', 'Architecture direction, release policy, vendor choices, team responsibilities and operational readiness must support the same business objective.'],
    ],
    tradeoff: 'Shared libraries reduce duplication but increase the impact of a common mistake. Exact revisions, compatibility checks and clear change ownership are essential to keeping reuse sustainable.',
  },
]

export const platformJourneys = [
  {
    title: 'A payment changes order state',
    steps: ['Provider callback', 'Validated event', 'Domain consumer', 'Transaction / order update', 'Downstream reactions'],
    detail: 'A useful review follows the whole lifecycle: authentication, duplicate callbacks, uncertain remote success, partial capture or refund, and recovery after an interrupted update.',
  },
  {
    title: 'A catalogue change reaches discovery',
    steps: ['Upstream change', 'Event transport', 'Projection worker', 'Search / read-model update', 'Customer-facing read'],
    detail: 'The read model can lag behind its source. Replays, full rebuilds, deletion handling and freshness checks are as important as the initial event handler.',
  },
  {
    title: 'A retail cache refresh runs off-request',
    steps: ['Refresh request or schedule', 'RQ job', 'Background worker', 'Inventory-cache update', 'Retail / customer read'],
    detail: 'Separating background work protects request latency, but concurrent refreshes, timeouts and Redis/job durability still need an explicit operating policy.',
  },
]

export const platformPrinciples = [
  { title: 'Replay without duplicate business effects', detail: 'A delivery retry and a new business operation are different things. Idempotency belongs at the domain boundary, not only in the broker.' },
  { title: 'Authorise across brand boundaries', detail: 'Validate customer, order, market and brand context at service entry points. Shared infrastructure should not weaken access control.' },
  { title: 'Observe progress, not only availability', detail: 'Consumer lag, failed delivery state, projection freshness and reconciliation backlog reveal issues that pod health cannot.' },
  { title: 'Plan for partial success', detail: 'Remote side effects can succeed independently. Make repair, reconciliation and escalation part of the lifecycle rather than an afterthought.' },
]

export const brandOnboarding = [
  { title: 'Define the capability contract', detail: 'Agree which journeys the brand supports: discovery, checkout, financing, customer account, certificates and after-sales. Record intentional differences.' },
  { title: 'Configure the brand and market', detail: 'Set domains, languages, channels, provider identities, templates and catalogue mappings. Make compatibility defaults explicit.' },
  { title: 'Verify isolation and integration', detail: 'Check customer/order access, event routing, data namespaces and partner configuration. Test that one brand cannot act on another brand’s state.' },
  { title: 'Prepare release and recovery', detail: 'Identify affected services and package versions, then define rollout, rollback, replay, monitoring and operational ownership.' },
  { title: 'Measure the onboarding effort', detail: 'Track engineering effort, lead time, defects and ongoing support. Those measures show whether the shared foundation is actually creating leverage.' },
]
