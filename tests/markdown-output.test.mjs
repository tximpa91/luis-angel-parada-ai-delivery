import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { createMarkdown, markdownAssetPath } from '../scripts/markdown.mjs'
import { getSeoForPath, indexableRoutes } from '../src/seo.js'

test('conversion removes page chrome and scripts while retaining semantic content', () => {
  const result = createMarkdown(`<!doctype html><html><head>
    <script type="application/ld+json">{"@type":"ProfilePage"}</script>
    </head><body><header>Site navigation</header><main>
    <h1>A real heading</h1><h2>A heading<br>continued</h2><p>Readable content with <strong>evidence</strong>.</p>
    <nav aria-label="Breadcrumb">Remove breadcrumb</nav>
    <nav aria-label="AI delivery references"><a href="https://example.com/reference">A reference</a></nav>
    <a href="/work/commerce-platform">Platform case</a><a href="#details">Details</a>
    <dl><dt>Ownership</dt><dd>Distributed systems</dd></dl>
    <details><summary>Architecture</summary><p>Expandable public content.</p></details>
    <div aria-hidden="true">Decorative content</div><div hidden>Hidden utility</div>
    <button>Operate menu</button><svg><text>Drawing</text></svg>
    <script>window.unwanted = true</script><style>.unwanted { color: red }</style>
    <a href="/empty"><img src="/decorative.png" alt=""></a>
    <div><strong>5</strong><span>direct managers</span></div><p>Last paragraph.</p>
    </main><footer>Site footer</footer></body></html>`, {
    title: 'Title: "quoted"', description: 'Description', canonical: 'https://example.com/page',
  })
  assert.match(result, /^---\ntitle: "Title: \\"quoted\\""/)
  assert.match(result, /# A real heading/)
  assert.match(result, /## A heading continued/)
  assert.match(result, /Readable content with \*\*evidence\*\*/)
  assert.match(result, /\*\*5\*\* direct managers/)
  assert.match(result, /\*\*Ownership\*\*\n+Distributed systems/)
  assert.match(result, /Expandable public content\./)
  assert.match(result, /\[Platform case\]\(https:\/\/example.com\/work\/commerce-platform\)/)
  assert.match(result, /\[Details\]\(https:\/\/example.com\/page#details\)/)
  assert.match(result, /\[A reference\]\(https:\/\/example.com\/reference\)/)
  assert.match(result, /```json\n[\s\S]*"@type": "ProfilePage"[\s\S]*```/)
  assert.doesNotMatch(result, /Site navigation|Remove breadcrumb|Site footer|Decorative content|Hidden utility|Operate menu|Drawing|unwanted|decorative\.png|\[\]\(|<script|<style|<svg/)
})

test('public tab content remains readable without clicking controls', () => {
  const result = createMarkdown(`<html><body><main><h1>Maturity</h1>
    <div role="tablist"><button id="stage"><span>L4</span><span>Autonomy</span><span>Summary</span></button></div>
    <div role="tabpanel" aria-labelledby="stage" hidden><p>Implementation underway, not completed.</p></div>
    </main></body></html>`, {
    title: 'Maturity', description: 'Status', canonical: 'https://example.com/ai',
  })
  assert.match(result, /### L4 · Autonomy/)
  assert.match(result, /Implementation underway, not completed\./)
  assert.doesNotMatch(result, /Summary|<button|hidden=/)
})

test('missing primary content fails the build rather than publishing an empty document', () => {
  assert.throws(() => createMarkdown('<html><body>No main</body></html>', {
    canonical: 'https://example.com/',
  }), /without a main element/)
})

for (const route of indexableRoutes) {
  test(`built Markdown matches the public content and metadata for ${route}`, async () => {
    const markdown = await readFile(new URL(`../dist${markdownAssetPath(route)}`, import.meta.url), 'utf8')
    const seo = getSeoForPath(route)
    assert.ok(markdown.includes(`title: ${JSON.stringify(seo.title)}`))
    assert.ok(markdown.includes(`url: ${JSON.stringify(seo.canonical)}`))
    assert.match(markdown, /\n# .+/)
    assert.doesNotMatch(markdown, /<!doctype|<html|<script|<style|<svg|class=|Open navigation|Close navigation/)
    const schema = markdown.match(/```json\n([\s\S]*?)\n```/)
    assert.ok(schema, 'original JSON-LD is preserved')
    assert.ok(JSON.parse(schema[1])['@graph'])
    if (route === '/ai-delivery') {
      assert.match(markdown, /production releases with human approval/)
      for (const level of ['L1', 'L2', 'L3', 'L4']) assert.ok(markdown.includes(`### ${level} ·`))
      assert.match(markdown, /L4 underway/)
    }
    if (route === '/work/commerce-platform') {
      assert.match(markdown, /Three brands launched with the same engineering team/)
      assert.match(markdown, /Azure Service Bus/)
    }
    if (route === '/card') assert.ok(markdown.includes('robots: "noindex, follow"'))
  })
}
