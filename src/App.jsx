import { useEffect, useState } from 'react'
import AIDeliveryPage from './pages/AIDeliveryPage.jsx'
import PlatformDeepDive, { PlatformSectionNav } from './components/PlatformDeepDive.jsx'
import { career, caseStudies, leadershipScope, practices, projects, spectrum } from './data/portfolio.js'
import { getSeoForPath, getStructuredData, routeSeo } from './seo.js'

const EMAIL = 'luisparada364@icloud.com'
const LINKEDIN_PROFILE = 'https://www.linkedin.com/in/luis-angel-parada/'
const SOURCE_REPOSITORY = 'https://github.com/tximpa91/luis-angel-parada-ai-delivery'

function Arrow({ diagonal = false }) {
  return (
    <svg className="pf-arrow" viewBox="0 0 24 24" aria-hidden="true">
      {diagonal ? <path d="M6 18 18 6M8 6h10v10" /> : <path d="M4 12h16M14 6l6 6-6 6" />}
    </svg>
  )
}

function usePathname(initialPathname) {
  const [pathname, setPathname] = useState(
    () => initialPathname || (typeof window === 'undefined' ? '/' : window.location.pathname),
  )

  useEffect(() => {
    const update = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  return [pathname, setPathname]
}

function RouteLink({ to, children, className = '', onNavigate, ...props }) {
  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || props.target === '_blank') return
    event.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
    const hash = new URL(to, window.location.origin).hash
    window.setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }, 0)
    onNavigate?.()
  }

  return (
    <a className={className} href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

function usePortfolioEffects(pathname) {
  useEffect(() => {
    document.body.classList.toggle('ai-mode', pathname === '/ai-delivery')
    document.body.classList.toggle('portfolio-mode', pathname !== '/ai-delivery')
    return () => document.body.classList.remove('ai-mode', 'portfolio-mode')
  }, [pathname])

  useEffect(() => {
    if (pathname === '/ai-delivery') return undefined
    const elements = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])
}

function PortfolioHeader({ compact = false }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    ['Work', '/#work'],
    ['Career', '/#career'],
    ['Leadership', '/leadership-profile'],
    ['Practice', '/#practice'],
    ['About', '/#about'],
  ]

  return (
    <header className={`pf-header ${scrolled ? 'pf-header--scrolled' : ''} ${compact ? 'pf-header--compact' : ''}`}>
      <RouteLink className="pf-wordmark" to="/" onNavigate={() => setOpen(false)}>
        <img src="/assets/lap-brand-mark.svg" alt="" width="40" height="40" aria-hidden="true" />
        <span>Luis Angel Parada</span>
      </RouteLink>
      <nav className={open ? 'pf-nav pf-nav--open' : 'pf-nav'} aria-label="Portfolio navigation">
        {navItems.map(([label, href]) => (
          <a href={href} key={label} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
      <a className="pf-header-cta" href={`mailto:${EMAIL}`}>Let’s talk <Arrow diagonal /></a>
      <button
        className="pf-menu"
        type="button"
        aria-expanded={open}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
  )
}

function PortfolioHome() {
  return (
    <div className="pf-shell">
      <PortfolioHeader />
      <main>
        <section className="pf-hero" id="top">
          <div className="pf-hero-copy" data-reveal>
            <p className="pf-kicker">Head / Director of Engineering · Applied AI Leadership</p>
            <h1>I lead engineering organisations and turn applied AI into working systems.</h1>
            <p className="pf-lede">
              I bring global engineering leadership, hands-on distributed-system ownership and the ability to lead AI transformation.
              As Global Head of Digital Engineering, I lead a 26-person organisation across six countries and own a shared platform for three live brands.
              I can help you connect technology strategy, team ownership and dependable delivery—whether you are scaling a platform or changing how engineering works with AI.
            </p>
            <div className="pf-actions">
              <a className="pf-button pf-button--primary" href="#work">Explore selected work <Arrow /></a>
              <RouteLink className="pf-text-link" to="/leadership-profile">Leadership profile <Arrow /></RouteLink>
            </div>
          </div>
          <div className="pf-hero-art" data-reveal aria-hidden="true">
            <span className="pf-orbit pf-orbit--one" />
            <span className="pf-orbit pf-orbit--two" />
            <img
              src="/assets/portfolio-systems.png"
              alt=""
              width="1672"
              height="941"
              fetchPriority="high"
            />
          </div>
          <div className="pf-hero-note" aria-hidden="true">
            <span>Systems</span><span>Teams</span><span>Outcomes</span>
          </div>
        </section>

        <section className="pf-leadership" aria-labelledby="leadership-scope-title">
          <div className="pf-leadership-heading" data-reveal>
            <div>
              <p className="pf-eyebrow">Leadership scope</p>
              <h2 id="leadership-scope-title">Manager of managers.<br />Operator of systems.</h2>
            </div>
            <div>
              <p>I connect organisation design, platform architecture and delivery economics—then stay accountable when the system is under pressure.</p>
              <RouteLink className="pf-text-link" to="/leadership-profile">Read the full profile <Arrow /></RouteLink>
            </div>
          </div>
          <div className="pf-leadership-grid">
            {leadershipScope.map((item, index) => (
              <article data-reveal style={{ '--delay': `${index * 60}ms` }} key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pf-section pf-work" id="work">
          <div className="pf-section-heading" data-reveal>
            <div>
              <p className="pf-eyebrow">01 / Selected work</p>
              <h2>Systems that make<br />ambition operational.</h2>
            </div>
            <p>Explore the experience and technical thinking I bring to your organisation: AI engineering transformation, ownership of a three-brand distributed platform, and an independent AI product-discovery reference architecture.</p>
          </div>
          <div className="pf-projects">
            {projects.map((project, index) => (
              <article className={`pf-project pf-project--${project.tone}`} data-reveal key={project.title}>
                <div className="pf-project-copy">
                  <span className="pf-project-index">{project.index}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <small>{project.meta}</small>
                  <RouteLink className="pf-project-link" to={project.link}>
                    {project.cta} <Arrow diagonal />
                  </RouteLink>
                </div>
                <RouteLink className="pf-project-media" to={project.link} aria-label={`${project.cta}: ${project.title}`}>
                  <img
                    src={project.image}
                    alt=""
                    width={project.imageWidth}
                    height={project.imageHeight}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </RouteLink>
              </article>
            ))}
          </div>
        </section>

        <section className="pf-section pf-career" id="career">
          <div className="pf-career-intro" data-reveal>
            <p className="pf-eyebrow">02 / Career</p>
            <h2>A decade building software, platforms and teams.</h2>
            <p>From hands-on product engineering to global digital leadership.</p>
            <RouteLink className="pf-text-link" to="/leadership-profile">Open leadership profile <Arrow /></RouteLink>
          </div>
          <ol className="pf-timeline">
            {career.map((entry, index) => (
              <li data-reveal style={{ '--delay': `${index * 40}ms` }} key={`${entry.date}-${entry.role}`}>
                <span className="pf-date">{entry.date}</span>
                <span className="pf-timeline-dot" aria-hidden="true" />
                <div className="pf-role">
                  <h3>{entry.role}</h3>
                  <span>{entry.company}</span>
                </div>
                <p>{entry.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="pf-practice" id="practice">
          <div className="pf-practice-heading" data-reveal>
            <p className="pf-eyebrow">03 / Practice</p>
            <h2>Leadership that stays close to the system.</h2>
            <p>I lead through clear operating models, technical depth and evidence—connecting people, architecture and outcomes.</p>
          </div>
          <div className="pf-practice-grid">
            {practices.map((item, index) => (
              <article data-reveal style={{ '--delay': `${index * 70}ms` }} key={item.title}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pf-section pf-about" id="about">
          <div className="pf-about-lead" data-reveal>
            <p className="pf-eyebrow">04 / About</p>
            <h2>Technology is the medium. Better systems are the work.</h2>
          </div>
          <div className="pf-about-copy" data-reveal>
            <p>I am an engineering leader and hands-on builder based in Switzerland. My work connects product ambition, platform architecture, delivery discipline and applied AI—so teams can move faster without losing control.</p>
            <dl>
              <div><dt>Current role</dt><dd>Global Head of Digital Engineering</dd></div>
              <div><dt>Education</dt><dd>B.Sc. Software Engineering</dd></div>
              <div><dt>Languages</dt><dd>Spanish · Native<br />English · C1</dd></div>
              <div><dt>Location</dt><dd>Switzerland · Permit B</dd></div>
            </dl>
            <p className="pf-editorial-standard" id="editorial-standard">
              <strong>About the work.</strong> Case studies explain my responsibilities and decisions.
              Independent reference architectures are labelled separately; employer and client details stay private.
            </p>
          </div>
          <div className="pf-spectrum" data-reveal>
            <p className="pf-spectrum-title">Technical spectrum</p>
            {spectrum.map((item) => (
              <div key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></div>
            ))}
          </div>
        </section>

        <section className="pf-contact" id="contact">
          <p className="pf-eyebrow">05 / Contact</p>
          <div data-reveal>
            <h2>Need a leader for complex platforms and AI transformation?</h2>
            <p>Let’s discuss a permanent leadership role or a contract to lead platform strategy, engineering delivery or AI transformation. Based in Switzerland, open to international conversations.</p>
            <a className="pf-button pf-button--light" href={`mailto:${EMAIL}?subject=Engineering%20leadership%20role%20or%20contract`}>Discuss a role or contract <Arrow diagonal /></a>
          </div>
          <nav aria-label="Contact links">
            <a href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">LinkedIn <Arrow diagonal /></a>
            <RouteLink to="/leadership-profile">Leadership profile <Arrow diagonal /></RouteLink>
            <a href={SOURCE_REPOSITORY} target="_blank" rel="noreferrer">View source <Arrow diagonal /></a>
            <a href={`mailto:${EMAIL}`}>Email <Arrow diagonal /></a>
          </nav>
        </section>
      </main>
      <PortfolioFooter />
    </div>
  )
}

function CaseStudyPage({ study }) {
  return (
    <div className="pf-shell pf-case-shell">
      <PortfolioHeader compact />
      <main>
        <section className="pf-case-hero" id="top">
          <nav className="pf-breadcrumb" aria-label="Breadcrumb">
            <RouteLink to="/">Home</RouteLink>
            <span aria-hidden="true">/</span>
            <RouteLink to="/#work">Selected work</RouteLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{study.breadcrumbLabel}</span>
          </nav>
          <div className="pf-case-heading" data-reveal>
            <div>
              <p className="pf-eyebrow">{study.number}</p>
              <h1>{study.title}</h1>
            </div>
            <p>{study.intro}</p>
          </div>
          <div className="pf-article-meta" aria-label="Article details" data-reveal>
            <p><span>Author</span><strong>Luis Angel Parada</strong></p>
            <p><span>Status</span><strong>{study.status}</strong></p>
            <p><span>Last reviewed</span><strong><time dateTime={study.platformDetail ? '2026-09-27' : '2026-09-25'}>{study.platformDetail ? '27 September 2026' : '25 September 2026'}</time></strong></p>
          </div>
          <aside className="pf-editorial-note" id="evidence-basis" data-reveal>
            <span>Evidence basis</span>
            <p>{study.editorialBasis}</p>
          </aside>
          {study.platformDetail ? <PlatformSectionNav /> : null}
          <div className="pf-case-art" data-reveal>
            <img
              src={study.image}
              alt={study.imageAlt}
              width={study.imageWidth}
              height={study.imageHeight}
            />
          </div>
        </section>
        <section className="pf-case-facts" aria-label="Project facts">
          {study.facts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
        </section>
        {study.roleSummary && (
          <section className="pf-role-summary" aria-labelledby="role-summary-title" data-reveal>
            <p className="pf-eyebrow">My role</p>
            <h2 id="role-summary-title">{study.roleSummary}</h2>
          </section>
        )}
        {study.platformDetail ? <PlatformDeepDive /> : null}
        {study.decisions && (
          <section className="pf-decisions" aria-labelledby="key-decisions-title">
            <div className="pf-decisions-heading" data-reveal>
              <p className="pf-eyebrow">Key decisions</p>
              <h2 id="key-decisions-title">What I chose—and why it mattered.</h2>
            </div>
            <div className="pf-decisions-grid">
              {study.decisions.map((decision, index) => (
                <article data-reveal style={{ '--delay': `${index * 60}ms` }} key={decision.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.detail}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        <section className="pf-case-chapters">
          {study.chapters.map((chapter, index) => (
            <article data-reveal key={chapter.label}>
              <span>{String(index + 1).padStart(2, '0')} / {chapter.label}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.copy}</p>
            </article>
          ))}
        </section>
        {study.flow && (
          <section className="pf-reference-flow" aria-labelledby="reference-flow-title" data-reveal>
            <p className="pf-eyebrow">Text architecture</p>
            <h2 id="reference-flow-title">How a grounded answer moves through the system.</h2>
            <ol>
              {study.flow.map((step, index) => (
                <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>
              ))}
            </ol>
          </section>
        )}
        {study.questions && (
          <section className="pf-answer-section" aria-labelledby="technical-answers-title">
            <div className="pf-answer-heading" data-reveal>
              <p className="pf-eyebrow">Technical answers</p>
              <h2 id="technical-answers-title">The architecture, in plain language.</h2>
            </div>
            <div className="pf-answer-grid">
              {study.questions.map((item, index) => (
                <article data-reveal style={{ '--delay': `${index * 60}ms` }} key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
            <div className="pf-references" data-reveal>
              <p>Primary technical references</p>
              <div>
                {study.references.map((reference) => (
                  <a href={reference.href} key={reference.href} target="_blank" rel="noreferrer">
                    {reference.label} <Arrow diagonal />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="pf-ownership" data-reveal>
          <p className="pf-eyebrow">My scope</p>
          <h2>{study.ownership}</h2>
        </section>
        <section className="pf-next">
          <div><p className="pf-eyebrow">Continue</p><h2>See how I can lead AI engineering transformation.</h2></div>
          <RouteLink className="pf-button pf-button--primary" to="/ai-delivery">Explore AI transformation <Arrow /></RouteLink>
        </section>
      </main>
      <PortfolioFooter />
    </div>
  )
}

function LeadershipProfile() {
  const scope = [
    ['Organisation', '5 direct managers · 26 people · 6 countries'],
    ['Platform scope', '3 live brands · 40 transactional markets'],
    ['System ownership', 'Services · integrations · queues · workers'],
    ['Operating remit', 'Architecture · delivery · reliability'],
  ]
  const remit = [
    {
      title: 'Lead the engineering organisation',
      detail: 'Connect the roadmap to team responsibilities, hiring, coaching and delivery decisions. I bring manager-of-managers experience across backend, frontend, DevOps, QA and delivery.',
      link: '#profile-experience-title',
      cta: 'Explore my leadership experience',
    },
    {
      title: 'Own complex distributed platforms',
      detail: 'Set architecture direction across frontend, backend, integrations, queues and workers—and stay accountable for reliability. My experience includes choosing a shared multibrand architecture to support further launches with the same team.',
      link: '/work/commerce-platform',
      cta: 'Explore my platform decisions',
    },
    {
      title: 'Lead AI engineering transformation',
      detail: 'Move beyond isolated AI tools to a repeatable engineering practice. I connect use-case discovery, reusable skills, MCP context and specialist development agents with governed AI-DLC delivery automation.',
      link: '/ai-delivery#transformation',
      cta: 'Explore my transformation approach',
    },
    {
      title: 'Connect technology and business decisions',
      detail: 'Bring architecture, operational risk and delivery capacity into roadmap, vendor and investment choices. My remit includes contract negotiation, vendor and hiring budgets, incident leadership and FinOps.',
      link: '#profile-experience-title',
      cta: 'Review my career and responsibilities',
    },
  ]

  return (
    <div className="pf-shell pf-profile-shell">
      <PortfolioHeader compact />
      <main>
        <section className="pf-profile-hero" id="top">
          <nav className="pf-breadcrumb" aria-label="Breadcrumb">
            <RouteLink to="/">Home</RouteLink><span aria-hidden="true">/</span><span aria-current="page">Leadership profile</span>
          </nav>
          <div className="pf-profile-heading" data-reveal>
            <div>
              <p className="pf-eyebrow">Head / Director of Engineering · Applied AI Leadership</p>
              <h1>I lead complex platforms, engineering teams and AI transformation.</h1>
            </div>
            <div>
              <p>I bring the leadership to align teams, the technical depth to own distributed systems, and the experience to change how engineering delivers with AI. A decade from hands-on engineering to Global Head of Digital Engineering grounds the capability I bring to your next leadership role or contract.</p>
              <div className="pf-profile-actions">
                <a className="pf-button pf-button--primary" href={`mailto:${EMAIL}?subject=Engineering%20leadership%20role%20or%20contract`}>Discuss a role or contract <Arrow diagonal /></a>
                <a className="pf-button" href={LINKEDIN_PROFILE} target="_blank" rel="noopener noreferrer">View LinkedIn profile <Arrow diagonal /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="pf-profile-impact" aria-label="Leadership scope">
          {scope.map(([label, value], index) => (
            <article data-reveal style={{ '--delay': `${index * 50}ms` }} key={label}><span>{label}</span><strong>{value}</strong></article>
          ))}
        </section>

        <section className="pf-profile-section">
          <div className="pf-profile-section-heading" data-reveal>
            <p className="pf-eyebrow">What you can hire me to lead</p>
            <h2>Teams, platforms and transformation. One accountable leader.</h2>
          </div>
          <div className="pf-profile-remit">
            {remit.map((item, index) => (
              <article data-reveal style={{ '--delay': `${index * 50}ms` }} key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.detail}</p>
                <RouteLink className="pf-text-link" to={item.link}>{item.cta} <Arrow /></RouteLink>
              </article>
            ))}
          </div>
        </section>

        <section className="pf-profile-section pf-profile-experience" aria-labelledby="profile-experience-title">
          <div className="pf-profile-section-heading" data-reveal>
            <p className="pf-eyebrow">Experience</p>
            <h2 id="profile-experience-title">From hands-on engineering to global leadership.</h2>
          </div>
          <ol>
            {career.map((entry, index) => (
              <li data-reveal style={{ '--delay': `${index * 40}ms` }} key={`${entry.date}-${entry.role}`}>
                <span>{entry.date}</span>
                <div><h3>{entry.role}</h3><strong>{entry.company}</strong><p>{entry.detail}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="pf-profile-close">
          <div data-reveal>
            <p className="pf-eyebrow">Roles & contracts</p>
            <h2>Let’s discuss the engineering challenge you need me to own.</h2>
          </div>
          <dl data-reveal>
            <div><dt>Education</dt><dd>B.Sc. Software Engineering</dd></div>
            <div><dt>Languages</dt><dd>Spanish · Native<br />English · C1</dd></div>
            <div><dt>Location</dt><dd>Switzerland · Permit B</dd></div>
            <div><dt>Opportunities</dt><dd>Head / Director of Engineering · VP Engineering / CTO-level mandates · Applied AI leadership · Permanent roles or contracts</dd></div>
          </dl>
          <a className="pf-button pf-button--light" href={`mailto:${EMAIL}?subject=Engineering%20leadership%20role%20or%20contract`}>Discuss a role or contract <Arrow diagonal /></a>
        </section>
      </main>
      <PortfolioFooter />
    </div>
  )
}

function ContactCardPage() {
  return (
    <div className="pf-shell pf-card-shell">
      <PortfolioHeader compact />
      <main id="top" className="pf-card-main">
        <section className="pf-card" aria-labelledby="card-name">
          <div className="pf-card-topline">
            <span>Digital contact card</span>
            <span>Based in Switzerland</span>
          </div>
          <div className="pf-card-layout">
            <div className="pf-card-intro">
              <img className="pf-card-mark" src="/assets/lap-brand-mark.svg" alt="" width="128" height="128" aria-hidden="true" />
              <p className="pf-eyebrow">Good to meet you</p>
              <h1 id="card-name">Luis Angel<br /><span>Parada<span className="pf-card-period">.</span></span></h1>
              <p className="pf-card-position">Engineering leadership for complex platforms and applied AI.</p>
              <p className="pf-card-summary">
                I lead engineering organisations, own distributed systems and help teams turn AI ambition into dependable delivery.
              </p>
              <div className="pf-card-actions">
                <a className="pf-button pf-button--primary" href="/luis-angel-parada.vcf" download="Luis-Angel-Parada.vcf">
                  Save my contact <span className="pf-card-download" aria-hidden="true">↓</span>
                </a>
                <a className="pf-button pf-card-email" href={`mailto:${EMAIL}?subject=Great%20to%20meet%20you`}>
                  Send an email <Arrow diagonal />
                </a>
              </div>
              <p className="pf-card-hint">Keep this page handy, or save my details to your contacts.</p>
            </div>
            <nav className="pf-card-links" aria-label="Explore Luis Angel Parada's work and profile">
              <div className="pf-card-links-heading"><span>Explore</span><span>01 — 04</span></div>
              <RouteLink to="/" className="pf-card-link"><span><small>01 / Overview</small><strong>Portfolio</strong></span><Arrow diagonal /></RouteLink>
              <RouteLink to="/leadership-profile" className="pf-card-link"><span><small>02 / Leadership</small><strong>Engineering leadership</strong></span><Arrow diagonal /></RouteLink>
              <RouteLink to="/ai-delivery" className="pf-card-link"><span><small>03 / Applied AI</small><strong>AI transformation</strong></span><Arrow diagonal /></RouteLink>
              <a href={LINKEDIN_PROFILE} className="pf-card-link" target="_blank" rel="noopener noreferrer"><span><small>04 / Connect</small><strong>LinkedIn</strong></span><Arrow diagonal /></a>
              <p className="pf-card-links-note">Platforms · Teams · AI delivery</p>
            </nav>
          </div>
        </section>
      </main>
      <PortfolioFooter />
    </div>
  )
}

function PortfolioFooter() {
  return (
    <footer className="pf-footer">
      <div><strong>Luis Angel Parada</strong><span>Switzerland</span></div>
      <p>Human-led. Evidence-driven.</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}

function NotFound() {
  return (
    <div className="pf-shell">
      <PortfolioHeader compact />
      <main className="pf-not-found"><p className="pf-eyebrow">404</p><h1>This route is still being engineered.</h1><RouteLink className="pf-button pf-button--primary" to="/">Return home <Arrow /></RouteLink></main>
    </div>
  )
}

function App({ initialPathname }) {
  const [pathname] = usePathname(initialPathname)
  usePortfolioEffects(pathname)

  useEffect(() => {
    const seo = getSeoForPath(pathname)
    const setMeta = (attribute, key, value) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, key)
        document.head.append(element)
      }
      element.setAttribute('content', value)
    }

    document.title = seo.title
    setMeta('name', 'description', seo.description)
    setMeta('name', 'robots', seo.robots)
    setMeta('property', 'og:type', seo.openGraphType)
    setMeta('property', 'og:title', seo.shareTitle)
    setMeta('property', 'og:description', seo.shareDescription)
    setMeta('property', 'og:image', seo.imageUrl || `https://luisangelparada.com${seo.image}`)
    setMeta('property', 'og:image:alt', seo.imageAlt)
    setMeta('property', 'og:image:type', 'image/png')
    setMeta('property', 'og:image:width', String(seo.imageWidth))
    setMeta('property', 'og:image:height', String(seo.imageHeight))
    setMeta('name', 'twitter:title', seo.shareTitle)
    setMeta('name', 'twitter:description', seo.shareDescription)
    setMeta('name', 'twitter:image', seo.imageUrl || `https://luisangelparada.com${seo.image}`)
    setMeta('name', 'twitter:image:alt', seo.imageAlt)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (seo.canonical) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.append(canonical)
      }
      canonical.setAttribute('href', seo.canonical)
      setMeta('property', 'og:url', seo.canonical)
    } else {
      canonical?.remove()
      document.querySelector('meta[property="og:url"]')?.remove()
    }

    const structuredData = getStructuredData(pathname)
    let jsonLd = document.querySelector('#seo-jsonld')
    if (structuredData) {
      if (!jsonLd) {
        jsonLd = document.createElement('script')
        jsonLd.id = 'seo-jsonld'
        jsonLd.type = 'application/ld+json'
        document.head.append(jsonLd)
      }
      jsonLd.textContent = JSON.stringify(structuredData)
    } else {
      jsonLd?.remove()
    }
  }, [pathname])

  if (pathname === '/ai-delivery') return <AIDeliveryPage />
  if (pathname === '/leadership-profile') return <LeadershipProfile />
  if (pathname === '/card') return <ContactCardPage />
  if (pathname === '/') return <PortfolioHome />
  if (routeSeo[pathname] && caseStudies[pathname]) return <CaseStudyPage study={caseStudies[pathname]} />
  return <NotFound />
}

export default App
