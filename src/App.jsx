import { useEffect, useState } from 'react'
import AIDeliveryPage from './pages/AIDeliveryPage.jsx'
import { career, caseStudies, practices, projects, proof, spectrum } from './data/portfolio.js'
import { getSeoForPath, getStructuredData, routeSeo } from './seo.js'

const EMAIL = 'luisparada364@icloud.com'

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
    ['Practice', '/#practice'],
    ['About', '/#about'],
  ]

  return (
    <header className={`pf-header ${scrolled ? 'pf-header--scrolled' : ''} ${compact ? 'pf-header--compact' : ''}`}>
      <RouteLink className="pf-wordmark" to="/" onNavigate={() => setOpen(false)}>
        Luis Angel Parada
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
            <p className="pf-kicker">Global Head of Digital Engineering · Switzerland</p>
            <h1>I build the engineering systems behind ambitious digital products.</h1>
            <p className="pf-lede">
              Luis Angel Parada is a Switzerland-based digital engineering leader specializing in global commerce platforms, applied AI, cloud architecture and governed software delivery.
            </p>
            <div className="pf-actions">
              <a className="pf-button pf-button--primary" href="#work">Explore selected work <Arrow /></a>
              <a className="pf-text-link" href="#career">View career <Arrow /></a>
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

        <section className="pf-proof" aria-label="Selected engineering outcomes">
          {proof.map((item, index) => (
            <div className="pf-proof-item" data-reveal style={{ '--delay': `${index * 60}ms` }} key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="pf-section pf-work" id="work">
          <div className="pf-section-heading" data-reveal>
            <div>
              <p className="pf-eyebrow">01 / Selected work</p>
              <h2>Systems that make<br />ambition operational.</h2>
            </div>
            <p>Three views into the work: how software is delivered, how platforms scale, and how applied AI becomes a dependable product.</p>
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
              <div><dt>Education</dt><dd>B.Sc. Software Engineering</dd></div>
              <div><dt>Languages</dt><dd>Spanish · Native<br />English · C1</dd></div>
              <div><dt>Location</dt><dd>Switzerland · Permit B</dd></div>
            </dl>
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
            <h2>Let’s build the system behind what’s next.</h2>
            <p>For engineering leadership, platform transformation and applied AI opportunities.</p>
            <a className="pf-button pf-button--light" href={`mailto:${EMAIL}`}>Start a conversation <Arrow diagonal /></a>
          </div>
          <nav aria-label="Contact links">
            <a href="https://www.linkedin.com/in/luis-angel-parada" target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
            <a href="https://github.com/tximpa91" target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
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
        <section className="pf-case-hero">
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
            <p><span>Last reviewed</span><strong><time dateTime="2026-09-23">23 September 2026</time></strong></p>
          </div>
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
          <div><p className="pf-eyebrow">Continue</p><h2>See the AI delivery operating system.</h2></div>
          <RouteLink className="pf-button pf-button--primary" to="/ai-delivery">Open AI delivery <Arrow /></RouteLink>
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
    setMeta('property', 'og:title', seo.title)
    setMeta('property', 'og:description', seo.description)
    setMeta('property', 'og:image', seo.imageUrl || `https://luisangelparada.com${seo.image}`)
    setMeta('property', 'og:image:alt', seo.imageAlt)
    setMeta('name', 'twitter:title', seo.title)
    setMeta('name', 'twitter:description', seo.description)
    setMeta('name', 'twitter:image', seo.imageUrl || `https://luisangelparada.com${seo.image}`)

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
  if (pathname === '/') return <PortfolioHome />
  if (routeSeo[pathname] && caseStudies[pathname]) return <CaseStudyPage study={caseStudies[pathname]} />
  return <NotFound />
}

export default App
