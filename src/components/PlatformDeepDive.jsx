import { brandOnboarding, platformDomains, platformJourneys, platformPrinciples } from '../data/commercePlatform.js'

function SectionHeading({ number, id, title, children }) {
  return (
    <div className="pf-platform-heading">
      <div><p className="pf-eyebrow">{number}</p><h2 id={id}>{title}</h2></div>
      <p>{children}</p>
    </div>
  )
}

export function PlatformSectionNav() {
  return (
    <nav className="pf-platform-nav" aria-label="Platform case study sections">
      <span>Inside the platform</span>
      <a href="#platform-strategy">The decision</a>
      <a href="#platform-domains">System boundaries</a>
      <a href="#platform-journeys">How work moves</a>
      <a href="#platform-reliability">Reliability</a>
      <a href="#platform-onboarding">The next brand</a>
    </nav>
  )
}

export default function PlatformDeepDive() {
  return (
    <div className="pf-platform-detail">
      <section className="pf-platform-section pf-platform-strategy" aria-labelledby="platform-strategy">
        <SectionHeading number="01 / Business & architecture" id="platform-strategy" title="More brands. The same engineering team.">
          I chose a shared multibrand architecture across frontend and backend. The objective is to make the next launch a controlled extension of the platform—not another independently maintained stack.
        </SectionHeading>
        <div className="pf-platform-strategy-grid">
          <article className="pf-platform-brand-count"><strong>3</strong><h3>live brands</h3><p>One platform direction, with explicit boundaries for different experiences and capabilities.</p></article>
          <article><span className="pf-eyebrow">What is shared</span><h3>Capabilities, not just code.</h3><p>Common commerce journeys, service contracts, market configuration, integration patterns and delivery foundations create a reusable base.</p></article>
          <article><span className="pf-eyebrow">What stays distinct</span><h3>Identity and business rules.</h3><p>Brand presentation, supported features, market policy, provider configuration and customer-data context remain deliberate choices.</p></article>
        </div>
        <aside className="pf-platform-note"><strong>The business objective</strong><p>Release additional brands with the same engineering team. Three live brands describe the current scope; reduced launch effort and staffing efficiency are outcomes to measure, not assumed results.</p></aside>
      </section>

      <section className="pf-platform-section" aria-labelledby="platform-domains">
        <SectionHeading number="02 / System boundaries" id="platform-domains" title="The system behind the storefront.">
          Six views into the platform’s responsibilities. Open each area for the technical detail, the boundary it owns and the trade-off that comes with it.
        </SectionHeading>
        <div className="pf-platform-domains">
          {platformDomains.map((domain, index) => (
            <details className="pf-platform-domain" key={domain.id} open={index === 0}>
              <summary>
                <span className="pf-platform-domain-index">{String(index + 1).padStart(2, '0')}</span>
                <span><h3>{domain.title}</h3><span className="pf-platform-domain-subtitle">{domain.subtitle}</span></span>
                <span className="pf-platform-toggle" aria-hidden="true" />
              </summary>
              <div className="pf-platform-domain-body">
                <p className="pf-platform-technologies">{domain.technologies}</p>
                <p className="pf-platform-domain-intro">{domain.description}</p>
                <dl>{domain.capabilities.map(([title, detail]) => <div key={title}><dt>{title}</dt><dd>{detail}</dd></div>)}</dl>
                <div className="pf-platform-tradeoff"><strong>The engineering trade-off</strong><p>{domain.tradeoff}</p></div>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="pf-platform-section pf-platform-journeys" aria-labelledby="platform-journeys">
        <SectionHeading number="03 / Distributed execution" id="platform-journeys" title="Follow the work, not just the API.">
          These simplified flows explain the responsibilities across asynchronous boundaries. They are illustrative, not a published deployment topology or an exhaustive service map.
        </SectionHeading>
        <div className="pf-platform-journey-grid">
          {platformJourneys.map((journey) => (
            <article key={journey.title}>
              <h3>{journey.title}</h3>
              <ol>{journey.steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol>
              <p>{journey.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pf-platform-section" aria-labelledby="platform-reliability">
        <SectionHeading number="04 / Engineering judgement" id="platform-reliability" title="Complexity is an ownership problem.">
          Owning a distributed platform means understanding where it can fail, who owns the state and how it recovers. These are the operating principles I use to evaluate the architecture—not a claim that every control is already complete.
        </SectionHeading>
        <div className="pf-platform-principles">
          {platformPrinciples.map((principle, index) => <article key={principle.title}><span className="pf-eyebrow">{String(index + 1).padStart(2, '0')}</span><h3>{principle.title}</h3><p>{principle.detail}</p></article>)}
        </div>
      </section>

      <section className="pf-platform-section pf-platform-onboarding" aria-labelledby="platform-onboarding">
        <SectionHeading number="05 / Platform leverage" id="platform-onboarding" title="Make the next brand a bounded change.">
          My approach is to turn brand onboarding into explicit contracts and release responsibilities. Reuse should reduce repeated decisions, while preserving the checks each brand needs.
        </SectionHeading>
        <ol>{brandOnboarding.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{step.title}</h3><p>{step.detail}</p></div></li>)}</ol>
        <aside className="pf-platform-note"><strong>Where this meets applied AI</strong><p>Clear contracts, context, review boundaries and verification make AI-assisted engineering more useful on complex systems. My AI-DLC work connects that engineering foundation to governed delivery; it is separate from the non-deployed product-discovery reference architecture.</p></aside>
      </section>
    </div>
  )
}
