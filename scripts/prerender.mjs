import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { getSeoForPath, getStructuredData, indexableRoutes } from '../src/seo.js'

const rootDirectory = resolve(import.meta.dirname, '..')
const outputDirectory = resolve(rootDirectory, 'dist')
const template = await readFile(resolve(outputDirectory, 'index.html'), 'utf8')
const serverBundle = await import(pathToFileURL(resolve(rootDirectory, 'dist-ssr/entry-server.js')))

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function setMeta(html, attribute, key, content) {
  const expression = new RegExp(`<meta\\s+[^>]*${attribute}="${key}"[^>]*>`, 'i')
  const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`
  return expression.test(html) ? html.replace(expression, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function createHtml(pathname) {
  const seo = getSeoForPath(pathname)
  const structuredData = getStructuredData(pathname)
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${serverBundle.render(pathname)}</div>`,
  )

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(seo.title)}</title>`)
  html = setMeta(html, 'name', 'description', seo.description)
  html = setMeta(html, 'name', 'robots', seo.robots)
  html = setMeta(html, 'property', 'og:type', seo.openGraphType)
  html = setMeta(html, 'property', 'og:title', seo.title)
  html = setMeta(html, 'property', 'og:description', seo.description)
  html = setMeta(html, 'property', 'og:image', seo.imageUrl || `https://luisangelparada.com${seo.image}`)
  html = setMeta(html, 'property', 'og:image:alt', seo.imageAlt)
  html = setMeta(html, 'name', 'twitter:title', seo.title)
  html = setMeta(html, 'name', 'twitter:description', seo.description)
  html = setMeta(html, 'name', 'twitter:image', seo.imageUrl || `https://luisangelparada.com${seo.image}`)

  if (seo.canonical) {
    html = html.replace(
      /<link\s+rel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${seo.canonical}" />`,
    )
    html = setMeta(html, 'property', 'og:url', seo.canonical)
  } else {
    html = html.replace(/\s*<link\s+rel="canonical"[^>]*>\s*/i, '\n')
    html = html.replace(/\s*<meta\s+[^>]*property="og:url"[^>]*>\s*/i, '\n')
  }

  if (structuredData) {
    const json = JSON.stringify(structuredData).replaceAll('<', '\\u003c')
    html = html.replace('</head>', `    <script id="seo-jsonld" type="application/ld+json">${json}</script>\n  </head>`)
  }

  return `<!doctype html>${html.split('<!doctype html>').pop()}`
}

for (const pathname of indexableRoutes) {
  const outputPath = pathname === '/'
    ? resolve(outputDirectory, 'index.html')
    : resolve(outputDirectory, pathname.slice(1), 'index.html')
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, createHtml(pathname))
}

await writeFile(resolve(outputDirectory, '404.html'), createHtml('/404'))
