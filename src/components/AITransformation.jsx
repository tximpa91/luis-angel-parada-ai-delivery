import { useRef, useState } from 'react'
import { maturityStages, transformationJourney, transformationMandate, transformationSteps } from '../data/aiTransformation.js'
import './ai-transformation.css'

function TransformationJourney() {
  return (
    <section className="ai-transformation-journey" id="transformation-journey" aria-labelledby="transformation-journey-title">
      <div className="ai-transformation-journey-heading">
        <p className="section-number">Experience behind the capability</p>
        <h3 id="transformation-journey-title">From discovering useful work to changing how it is delivered.</h3>
        <p>I bring experience across the transformation, beyond the choice of AI tools. These are the decisions I have led, from discovering useful work to establishing specialist-agent development and delivery automation.</p>
      </div>
      <ol>
        {transformationJourney.map((step, index) => (
          <li key={step.title}>
            <div className="ai-transformation-journey-stage"><span>{String(index + 1).padStart(2, '0')}</span><span>{step.focus}</span></div>
            <h4>{step.title}</h4>
            <p>{step.detail}</p>
            <div className="ai-transformation-journey-decision"><strong>My leadership decision</strong><p>{step.decision}</p></div>
          </li>
        ))}
      </ol>
      <p className="ai-transformation-journey-status"><strong>Experience to build on</strong>L3 AI-DLC orchestration is operating in my work, with L4 implementation underway. I bring that experience to defining the right transformation path for your team and systems.</p>
    </section>
  )
}

export default function AITransformation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabs = useRef([])

  function handleKeyDown(event, index) {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % maturityStages.length
    if (event.key === 'ArrowLeft') nextIndex = (index + maturityStages.length - 1) % maturityStages.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = maturityStages.length - 1
    if (nextIndex === undefined) return
    event.preventDefault()
    setActiveIndex(nextIndex)
    tabs.current[nextIndex]?.focus()
  }

  return (
    <section className="ai-maturity section" id="transformation" aria-labelledby="ai-transformation-title">
      <div className="ai-maturity-heading">
        <p className="section-number">02 / AI engineering transformation</p>
        <h2 id="ai-transformation-title">Transform the organisation.<br />Not just the tools.</h2>
        <p>I can help you choose where AI belongs, prepare the context and platform foundations, and change how your teams plan, implement and verify software. The goal is organisational capability: clear ownership, reusable practices and controlled delivery, not simply more AI-generated code.</p>
      </div>
      <TransformationJourney />
      <div className="ai-transformation-mandate" aria-labelledby="transformation-mandate-title">
        <h3 id="transformation-mandate-title">The organisational scope I can lead</h3>
        <div>{transformationMandate.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{detail}</p></article>)}</div>
      </div>
      <div className="ai-maturity-distinction">
        <p><strong>Maturity journey</strong>How the team’s operating model evolves.</p>
        <p><strong>Delivery workflow</strong>How each change is planned, validated and released.</p>
      </div>
      <p className="ai-maturity-instruction">The framework below helps shape a transformation mandate for your organisation. Select a stage to review its leadership actions, controls and progression criteria. It is a planning lens, not an independently assessed maturity rating.</p>
      <div className="ai-maturity-tabs" role="tablist" aria-label="AI engineering maturity stages">
        {maturityStages.map((stage, index) => (
          <button
            type="button"
            role="tab"
            className={`ai-maturity-tab ${activeIndex === index ? 'ai-maturity-tab--active' : ''}`}
            id={`maturity-tab-${stage.level}`}
            aria-controls={`maturity-panel-${stage.level}`}
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            ref={(element) => { tabs.current[index] = element }}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            key={stage.level}
          >
            <span className="ai-maturity-level">{stage.level}</span>
            <span className="ai-maturity-title">{stage.title}</span>
            <span className="ai-maturity-summary">{stage.summary}</span>
            <span className="ai-maturity-metrics">{stage.metrics}</span>
          </button>
        ))}
      </div>
      {maturityStages.map((stage, index) => (
        <div className="ai-maturity-panel" id={`maturity-panel-${stage.level}`} role="tabpanel" aria-labelledby={`maturity-tab-${stage.level}`} hidden={activeIndex !== index} tabIndex={0} key={stage.level}>
          <p className="ai-maturity-shift">{stage.shift}</p>
          <dl>
            <div><dt>Leadership work</dt><dd>{stage.work}</dd></div>
            <div><dt>Controls and ownership</dt><dd>{stage.controls}</dd></div>
            <div><dt>Evidence before progression</dt><dd>{stage.evidence}</dd></div>
          </dl>
          <p className="ai-maturity-caution"><strong>The boundary</strong>{stage.caution}</p>
        </div>
      ))}
      <aside className="ai-maturity-attribution">
        <strong>Reference, not certification</strong>
        <p>The L1–L4 progression is adapted from an AWS AI-SDLC conference framework. The leadership actions and progression criteria are my interpretation, not AWS certification or endorsement. <a href="https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/" target="_blank" rel="noreferrer">Related reference: AWS AI-DLC methodology</a> (not the source of the exact four-level slide).</p>
      </aside>
      <div className="ai-transformation-playbook">
        <div><p className="section-number">My transformation playbook</p><h3>Lead adoption from mandate to operating practice.</h3><p>Align the organisation around a real business constraint, establish the foundation, prove the workflow and grow adoption where the evidence supports it.</p></div>
        <ol>{transformationSteps.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{title}</h4><p>{detail}</p></div></li>)}</ol>
      </div>
      <div className="ai-transformation-bridge">
        <h3>Platform ownership is the foundation, not a separate story.</h3>
        <p>Agents working across services need understandable contracts, data ownership, permissions, environments and recovery paths. My ownership of a three-brand distributed platform grounds this transformation approach in real engineering complexity, not only agent tooling.</p>
        <div><a href="/work/commerce-platform">Explore the platform case study ↗</a><a href="#delivery-model">Continue to the delivery workflow ↓</a></div>
      </div>
    </section>
  )
}
