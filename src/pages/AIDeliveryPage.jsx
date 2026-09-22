import { useEffect, useState } from 'react'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'luisparada364@icloud.com'

const capabilities = [
  {
    number: '01',
    title: 'Governed context',
    detail: 'The right repository knowledge, commands, and permissions reach the right agent.',
  },
  {
    number: '02',
    title: 'Independent validation',
    detail: 'The agent that changes code never approves its own work.',
  },
  {
    number: '03',
    title: 'Controlled deployment',
    detail: 'Every release returns test, security, deployment, and rollback evidence.',
  },
  {
    number: '04',
    title: 'Evidence-based decisions',
    detail: 'Human authority remains explicit at the final decision gate.',
  },
]

const phases = [
  {
    number: '01',
    title: 'Foundation',
    description: 'Connect repositories and declare the delivery contract.',
    outcome: 'One governed cloud workspace with versioned context and approved commands.',
  },
  {
    number: '02',
    title: 'Independent validation',
    description: 'Separate the agent that changes code from the agent that judges it.',
    outcome: 'A repeatable verdict backed by build, test, security, and policy evidence.',
  },
  {
    number: '03',
    title: 'Controlled deployment + QA',
    description: 'Return deployment, test, security, and rollback evidence.',
    outcome: 'A controlled environment proves the change before anyone approves progression.',
  },
  {
    number: '04',
    title: 'Bounded pilot',
    description: 'Measure lead time, first-pass validation, and the number of loops.',
    outcome: 'A small, accountable pilot produces enough evidence to decide what scales.',
  },
]

const challenges = [
  'Scaling beyond pilots',
  'Independent assurance',
  'Cloud delivery controls',
  'AI engineering leadership',
]

function Arrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={scrolled ? 'site-header site-header--scrolled' : 'site-header'}>
      <a className="wordmark" href="/" aria-label="Luis Angel Parada, portfolio home">
        Luis Angel Parada
      </a>
      <nav aria-label="Primary navigation">
        <a href="/ai-delivery#capability">Capability</a>
        <a href="/ai-delivery#delivery-model">Delivery model</a>
        <a href="/ai-delivery#evidence">Evidence</a>
        <a href="/ai-delivery#contact">Contact</a>
      </nav>
      <a className="header-cta" href="/">
        View portfolio
      </a>
    </header>
  )
}

function DeliveryLoop() {
  return (
    <div className="loop-visual" aria-label="Strategy, build, deploy, and measure form one governed delivery loop">
      <svg viewBox="0 0 720 460" role="img" aria-hidden="true">
        <g className="loop-lines">
          <path d="M346 223c-56-84-108-132-170-132-74 0-126 58-126 132s52 132 126 132c62 0 114-48 170-132Z" />
          <path d="M374 223c56-84 108-132 170-132 74 0 126 58 126 132s-52 132-126 132c-62 0-114-48-170-132Z" />
          <path className="loop-line--inner" d="M342 223c-46-62-88-94-138-94-54 0-92 40-92 94s38 94 92 94c50 0 92-32 138-94Z" />
          <path className="loop-line--inner" d="M378 223c46-62 88-94 138-94 54 0 92 40 92 94s-38 94-92 94c-50 0-92-32-138-94Z" />
        </g>
        <g className="loop-nodes">
          <circle cx="162" cy="92" r="7" />
          <circle cx="558" cy="92" r="7" />
          <circle cx="162" cy="354" r="7" />
          <circle cx="558" cy="354" r="7" />
        </g>
        <g className="loop-arrows">
          <path d="M199 94l14 1-8 11Z" />
          <path d="M521 94l-14 1 8 11Z" />
          <path d="M199 352l14-1-8-11Z" />
          <path d="M521 352l-14-1 8-11Z" />
        </g>
      </svg>
      <span className="loop-label loop-label--strategy">Strategy<br />to use cases</span>
      <span className="loop-label loop-label--build">Build<br />with guardrails</span>
      <span className="loop-label loop-label--measure">Measure<br />and improve</span>
      <span className="loop-label loop-label--deploy">Deploy<br />and enable</span>
      <span className="loop-center">People<br />Process<br />AI<br />Outcomes</span>
      <span className="loop-result">Sustainable<br />AI impact<br />at scale</span>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy reveal">
        <p className="role-line">AI Delivery Architect</p>
        <h1>I turn AI ambition into a delivery system your engineers can trust.</h1>
        <p className="hero-lede">
          I help companies move from AI-assisted coding to governed, human-led AI delivery.
        </p>
        <div className="hero-actions">
          <a className="button button--gold" href="#contact">
            Discuss a pilot <Arrow />
          </a>
          <a className="text-link" href="#delivery-model">
            See the delivery model <Arrow />
          </a>
        </div>
      </div>
      <DeliveryLoop />
      <div className="hero-index" aria-hidden="true">
        <span>01</span>
        <span>From ambition to governed delivery</span>
      </div>
    </section>
  )
}

function CapabilitySection() {
  return (
    <section className="capability section" id="capability">
      <div className="section-intro reveal">
        <p className="section-number">02 / Operating model</p>
        <h2>AI needs an operating model.</h2>
        <p>
          A useful agent can complete a task. A delivery system must also control context,
          permissions, validation, deployment, QA, and the final decision.
        </p>
      </div>

      <div className="capability-flow" aria-label="Four controls in the AI delivery operating model">
        {capabilities.map((item, index) => (
          <article className="capability-item reveal" key={item.title} style={{ '--delay': `${index * 70}ms` }}>
            <div className="capability-rail">
              <span>{item.number}</span>
              <i aria-hidden="true" />
            </div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <div className="evidence-line reveal" id="evidence">
        <div>
          <p className="section-number">Evidence</p>
          <h3>Designed for a <em>30-repository</em> engineering landscape</h3>
        </div>
        <p>
          One cloud workspace. Clear role boundaries. Human authority at the decision gate.
        </p>
      </div>
    </section>
  )
}

function DeliveryModel() {
  return (
    <section className="delivery section" id="delivery-model">
      <div className="delivery-heading reveal">
        <p className="section-number">03 / Delivery roadmap</p>
        <h2>A practical path from assisted coding to <em>governed delivery.</em></h2>
        <p>
          A focused path to real outcomes, with clear separation of agent execution and human
          judgment at every stage.
        </p>
      </div>
      <InteractiveRoadmap />
      <div className="principle-band">
        <div>
          <p className="section-number">The principle</p>
          <h3>Agents execute. Humans set intent, risk, and the final GO / NO-GO.</h3>
        </div>
        <a className="principle-link" href="#architecture">
          Explore the architecture <Arrow />
        </a>
      </div>
      <Architecture />
    </section>
  )
}

function InteractiveRoadmap() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = phases[activeIndex]

  return (
    <div className="roadmap-wrap">
      <div className="roadmap-tabs" role="tablist" aria-label="Delivery roadmap phases">
        {phases.map((phase, index) => (
          <button
            className={activeIndex === index ? 'phase phase--active' : 'phase'}
            id={`phase-${index}`}
            key={phase.title}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-controls="phase-panel"
            onClick={() => setActiveIndex(index)}
          >
            <span className="phase-number">{phase.number}</span>
            <span className="phase-line" aria-hidden="true"><i /></span>
            <span className="phase-title">{phase.title}</span>
            <span className="phase-description">{phase.description}</span>
          </button>
        ))}
      </div>
      <div
        className="phase-outcome"
        id="phase-panel"
        role="tabpanel"
        aria-labelledby={`phase-${activeIndex}`}
        key={active.title}
      >
        <span>Exit evidence</span>
        <p>{active.outcome}</p>
      </div>
    </div>
  )
}

function Architecture() {
  const steps = ['Context', 'Implement', 'Validate', 'Deploy + QA', 'Decide']
  return (
    <div className="architecture reveal" id="architecture">
      <div className="architecture-copy">
        <p className="section-number">The controlled loop</p>
        <h3>No agent approves its own output.</h3>
        <p>
          Repository context and an approved change feed a bounded implementation role. A separate
          validator returns PASS, FAIL, or ESCALATE with evidence. The Delivery Lead keeps the final
          decision.
        </p>
      </div>
      <ol className="architecture-flow">
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
            {index < steps.length - 1 && <Arrow />}
          </li>
        ))}
      </ol>
      <div className="verdicts" aria-label="Possible validation verdicts">
        <span className="verdict verdict--pass">PASS</span>
        <span className="verdict">FAIL WITH EVIDENCE</span>
        <span className="verdict">ESCALATE</span>
      </div>
    </div>
  )
}

function ContactSection() {
  const [selected, setSelected] = useState(challenges[0])
  const [status, setStatus] = useState('')
  const outreachText = `I would like to speak with Luis Angel Parada about ${selected.toLowerCase()} and a governed AI delivery model for our engineering organization.`

  const startConversation = async () => {
    if (CONTACT_EMAIL) {
      const subject = encodeURIComponent(`AI delivery conversation: ${selected}`)
      const body = encodeURIComponent(`${outreachText}\n\nCompany:\nRole:\nBest time to speak:`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      return
    }

    try {
      await navigator.clipboard.writeText(outreachText)
      setStatus('Introduction copied. Send it to Luis through the channel where you received this site.')
    } catch {
      setStatus(outreachText)
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact-heading reveal">
        <p className="section-number">04 / Let’s build what works</p>
        <h2>If AI is already entering your SDLC, give it a <em>delivery system.</em></h2>
        <p>I am looking for the company where this work can become the standard, not a side experiment.</p>
      </div>

      <div className="challenge-picker reveal">
        <div className="picker-heading">
          <span>Your challenge</span>
          <span>Select the priority that matters most</span>
        </div>
        <div className="challenge-options" role="radiogroup" aria-label="Your AI delivery challenge">
          {challenges.map((challenge) => (
            <button
              className={selected === challenge ? 'challenge challenge--selected' : 'challenge'}
              key={challenge}
              type="button"
              role="radio"
              aria-checked={selected === challenge}
              onClick={() => {
                setSelected(challenge)
                setStatus('')
              }}
            >
              <span>{challenge}</span>
              <Arrow />
            </button>
          ))}
        </div>
        <div className="contact-actions">
          <button className="button button--gold" type="button" onClick={startConversation}>
            {CONTACT_EMAIL ? 'Start a conversation' : 'Copy an introduction'} <Arrow />
          </button>
          <a className="button button--outline" href="#evidence">
            Review the evidence <Arrow />
          </a>
        </div>
        <p className="contact-status" role="status" aria-live="polite">{status}</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div>
        <p>Luis Angel Parada — AI Delivery Architect</p>
        <span>Human-led. Evidence-driven.</span>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/">Portfolio</a>
        <a href="/ai-delivery#capability">Capability</a>
        <a href="/ai-delivery#evidence">Evidence</a>
        <a href="/ai-delivery#contact">Contact</a>
      </nav>
    </footer>
  )
}

function AIDeliveryPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CapabilitySection />
        <DeliveryModel />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default AIDeliveryPage
