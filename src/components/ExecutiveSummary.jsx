import './executive-summary.css'

export default function ExecutiveSummary({ id, title, items, dark = false }) {
  return (
    <section className={`executive-summary${dark ? ' executive-summary--dark' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <p className="executive-summary-label">At a glance</p>
      <h2 id={`${id}-title`}>{title}</h2>
      <dl>
        {items.map(([label, detail]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
