import { parseHTML } from 'linkedom'
import TurndownService from 'turndown'
export { markdownAssetPath } from '../worker/markdown.js'

// These files are build artifacts, not separate public URLs. The Worker serves
// them at the original page URL after negotiating the requested representation.
export function createMarkdown(html, seo) {
  const { document } = parseHTML(html)
  const main = document.querySelector('main')
  if (!main) throw new Error(`Cannot generate Markdown without a main element: ${seo.canonical}`)
  const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => JSON.parse(script.textContent))

  // Tab panels are public article content, not private hidden data. Include all
  // stages and their labels so a text reader does not need to operate the tabs.
  for (const panel of main.querySelectorAll('[role="tabpanel"]')) {
    const label = document.getElementById(panel.getAttribute('aria-labelledby'))
    if (label) {
      const heading = document.createElement('h3')
      heading.textContent = Array.from(label.children).slice(0, 2)
        .map((part) => part.textContent.trim()).join(' · ') || label.textContent.trim()
      panel.prepend(heading)
    }
    panel.removeAttribute('hidden')
  }

  for (const element of main.querySelectorAll([
    'script', 'style', 'svg', 'canvas', 'iframe', 'template', 'noscript',
    'header', 'footer', 'button', 'form', 'input', 'select', 'textarea',
    '[aria-hidden="true"]', '[hidden]', '[role="tablist"]',
    'nav[aria-label="Breadcrumb"]', 'nav[aria-label="Primary navigation"]',
    'nav[aria-label="Portfolio navigation"]', 'nav[aria-label="Platform case study sections"]',
  ].join(','))) element.remove()

  // CSS supplies visual spacing between many inline labels. Supply that spacing
  // in text too, and avoid producing empty links around decorative artwork.
  for (const image of main.querySelectorAll('img')) {
    if (!image.getAttribute('alt')?.trim()) image.remove()
  }
  for (const link of main.querySelectorAll('a')) {
    if (!link.textContent.trim() && !link.querySelector('img[alt]')) link.remove()
  }
  for (const element of main.querySelectorAll('span, small, strong, time, a')) {
    element.before(document.createTextNode(' '))
    element.after(document.createTextNode(' '))
  }
  for (const lineBreak of main.querySelectorAll('h1 br, h2 br, h3 br, h4 br, h5 br, h6 br')) {
    lineBreak.replaceWith(document.createTextNode(' '))
  }
  for (const counter of main.querySelectorAll('ol > li > span')) {
    if (/^\d+$/.test(counter.textContent.trim())) counter.remove()
  }

  // Keep source references and contact links, including those in content-level
  // navigation, and make all URLs usable outside the original browser page.
  for (const element of main.querySelectorAll('a[href], img[src]')) {
    const attribute = element.tagName === 'A' ? 'href' : 'src'
    const target = new URL(element.getAttribute(attribute), seo.canonical)
    if (['https:', 'http:', 'mailto:', 'tel:'].includes(target.protocol)) {
      element.setAttribute(attribute, target.href)
    } else {
      element.removeAttribute(attribute)
    }
  }

  const converter = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
  })
  converter.addRule('definitionTerm', {
    filter: 'dt',
    replacement: (content) => `\n\n**${content.trim()}**\n`,
  })
  converter.addRule('definitionDescription', {
    filter: 'dd',
    replacement: (content) => `\n${content.trim()}\n\n`,
  })
  converter.addRule('decorativeImage', {
    filter: (node) => node.nodeName === 'IMG' && !node.getAttribute('alt')?.trim(),
    replacement: () => '',
  })
  const body = converter.turndown(main).trim()
  if (!body) throw new Error(`Generated empty Markdown: ${seo.canonical}`)

  const metadata = {
    title: seo.title,
    description: seo.description,
    url: seo.canonical,
    ...(seo.robots?.includes('noindex') ? { robots: seo.robots } : {}),
  }
  const frontmatter = Object.entries(metadata)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')
  const schema = structuredData.length
    ? `\n\n## Structured data\n\n\`\`\`json\n${JSON.stringify(structuredData.length === 1 ? structuredData[0] : structuredData, null, 2)}\n\`\`\``
    : ''

  return `---\n${frontmatter}\n---\n\n${body}${schema}\n`
}
