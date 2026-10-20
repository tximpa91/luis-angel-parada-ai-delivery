import assert from 'node:assert/strict'
import test from 'node:test'
import worker from '../worker/index.js'
import { markdownAssetPath, prefersMarkdown, varyOnAccept } from '../worker/markdown.js'

const origin = 'https://luisangelparada.com'
const html = '<!doctype html><html><body><main><h1>Portfolio</h1></main></body></html>'
const markdown = '# Portfolio\n\nEngineering leadership.\n'

function assetEnvironment({ missingMarkdown = false } = {}) {
  const calls = []
  return {
    calls,
    ASSETS: {
      async fetch(request) {
        calls.push(request)
        const path = new URL(request.url).pathname
        if (request.method === 'POST') return new Response(null, { status: 405 })
        if (path === '/ai-delivery/') return Response.redirect(`${origin}/ai-delivery`, 308)
        if (path === '/robots.txt') return new Response('User-agent: *\nAllow: /\n', {
          headers: { 'Content-Type': 'text/plain' },
        })
        const isMarkdown = path.startsWith('/_agent-markdown/')
        if ((isMarkdown && missingMarkdown) || path === '/missing') return new Response(html, {
          status: 404,
          headers: { 'Content-Type': 'text/html' },
        })
        const etag = isMarkdown ? '"markdown-v1"' : '"html-v1"'
        const headers = {
          'Content-Type': isMarkdown ? 'text/markdown' : 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=0, must-revalidate',
          Vary: 'Accept-Encoding',
          ETag: etag,
        }
        if (request.headers.has('If-Match') && request.headers.get('If-Match') !== etag) {
          return new Response(null, { status: 412, headers })
        }
        if (request.headers.get('If-None-Match') === etag) {
          return new Response(null, { status: 304, headers })
        }
        if (request.method === 'HEAD') return new Response(null, { headers })
        if (request.headers.get('Range') === 'bytes=999999-') {
          return new Response(null, {
            status: 416,
            headers: { ...headers, 'Content-Range': `bytes */${isMarkdown ? markdown.length : html.length}` },
          })
        }
        if (request.headers.get('Range') === 'bytes=0-9') {
          const body = isMarkdown ? markdown : html
          return new Response(body.slice(0, 10), {
            status: 206,
            headers: { ...headers, 'Content-Range': `bytes 0-9/${body.length}` },
          })
        }
        return new Response(isMarkdown ? markdown : html, { headers })
      },
    },
  }
}

test('Accept negotiation requires an explicit, positive Markdown preference', async (t) => {
  const cases = [
    ['', false], ['*/*', false], ['text/*', false],
    ['text/html,application/xhtml+xml,*/*;q=0.8', false],
    ['text/markdown', true], ['TEXT/MARKDOWN; charset=utf-8', true],
    ['text/markdown, text/html', true], ['text/markdown;q=0', false],
    ['text/markdown;q=0.000, */*;q=1', false],
    ['text/markdown;q=0.8, text/html;q=1', false],
    ['text/markdown;q=1, text/html;q=0.8', true],
    ['text/markdown;q=0.4, */*;q=0.8', false],
    ['text/markdown;q=0.4, text/html;q=0.2, */*;q=1', true],
    ['text/markdown;q=0.4, text/*;q=0, */*;q=1', true],
    ['text/markdown;q=2', false], ['text/markdown;q=invalid', false],
    ['text/markdown;q=0, text/markdown;q=1', true],
  ]
  for (const [accept, expected] of cases) {
    await t.test(accept || 'no Accept header', () => assert.equal(prefersMarkdown(accept), expected))
  }
})

test('Vary preserves existing cache dimensions without duplicating Accept', () => {
  for (const [value, expected] of [
    [null, 'Accept'], ['Accept-Encoding', 'Accept-Encoding, Accept'],
    ['accept-encoding, accept', 'accept-encoding, accept'], ['*', '*'],
  ]) {
    const headers = new Headers(value ? { Vary: value } : {})
    varyOnAccept(headers)
    assert.equal(headers.get('Vary'), expected)
  }
})

test('browser requests keep their original HTML and security/content policies', async () => {
  const env = assetEnvironment()
  const response = await worker.fetch(new Request(`${origin}/`), env)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('Content-Type'), /^text\/html/)
  assert.equal(await response.text(), html)
  assert.equal(env.calls.length, 1)
  assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Accept')
  assert.equal(response.headers.get('Content-Signal'), 'search=yes, ai-input=yes, ai-train=no, use=reference')
  assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff')
})

test('Markdown is served at the same page URL and carries its own validators', async () => {
  const env = assetEnvironment()
  const response = await worker.fetch(new Request(`${origin}/ai-delivery?source=agent`, {
    headers: { Accept: 'text/markdown' },
  }), env)
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(await response.text(), markdown)
  assert.equal(response.headers.get('Link'), `<${origin}/ai-delivery>; rel="canonical"`)
  assert.equal(response.headers.get('ETag'), '"markdown-v1"')
  assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Accept')
  assert.equal(response.headers.get('Content-Signal'), 'search=yes, ai-input=yes, ai-train=no, use=reference')
  assert.equal(new URL(env.calls[1].url).pathname, markdownAssetPath('/ai-delivery'))
})

test('HTML ETags cannot incorrectly return 304 for the Markdown variant', async () => {
  const env = assetEnvironment()
  const response = await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown', 'If-None-Match': '"html-v1"' },
  }), env)
  assert.equal(response.status, 200)
  assert.equal(await response.text(), markdown)
  assert.equal(env.calls[0].headers.get('If-None-Match'), null)
  assert.equal(env.calls[1].headers.get('If-None-Match'), '"html-v1"')
})

test('Markdown revalidation returns a bodyless 304 for the correct ETag', async () => {
  const response = await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown', 'If-None-Match': '"markdown-v1"' },
  }), assetEnvironment())
  assert.equal(response.status, 304)
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.match(response.headers.get('Vary'), /Accept/)
  assert.equal(await response.text(), '')
})

test('preconditions are checked against Markdown rather than HTML', async () => {
  const env = assetEnvironment()
  const response = await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown', 'If-Match': '"markdown-v1"' },
  }), env)
  assert.equal(response.status, 200)
  assert.equal(await response.text(), markdown)
  assert.equal(env.calls[0].headers.get('If-Match'), null)
  const mismatch = await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown', 'If-Match': '"html-v1"' },
  }), assetEnvironment())
  assert.equal(mismatch.status, 412)
  assert.equal(mismatch.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
})

test('date validators are sent only to the selected Markdown resource', async () => {
  const env = assetEnvironment()
  const date = 'Tue, 20 Oct 2026 12:00:00 GMT'
  await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown', 'If-Modified-Since': date, 'If-Unmodified-Since': date },
  }), env)
  assert.equal(env.calls[0].headers.get('If-Modified-Since'), null)
  assert.equal(env.calls[0].headers.get('If-Unmodified-Since'), null)
  assert.equal(env.calls[1].headers.get('If-Modified-Since'), date)
  assert.equal(env.calls[1].headers.get('If-Unmodified-Since'), date)
})

test('HEAD requests expose Markdown headers without a response body', async () => {
  const response = await worker.fetch(new Request(`${origin}/card`, {
    method: 'HEAD', headers: { Accept: 'text/markdown' },
  }), assetEnvironment())
  assert.equal(response.status, 200)
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
  assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, follow')
  assert.equal(await response.text(), '')
})

test('byte ranges are applied to Markdown rather than the original HTML', async () => {
  const env = assetEnvironment()
  const response = await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown', Range: 'bytes=0-9' },
  }), env)
  assert.equal(response.status, 206)
  assert.equal(await response.text(), markdown.slice(0, 10))
  assert.equal(env.calls[0].headers.get('Range'), null)
  assert.equal(env.calls[1].headers.get('Range'), 'bytes=0-9')
  assert.equal(response.headers.get('Content-Range'), `bytes 0-9/${markdown.length}`)
})

test('unsatisfiable Markdown byte ranges remain a 416, not an HTML success', async () => {
  const response = await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown', Range: 'bytes=999999-' },
  }), assetEnvironment())
  assert.equal(response.status, 416)
  assert.equal(response.headers.get('Content-Range'), `bytes */${markdown.length}`)
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8')
})

test('unknown pages, non-HTML files, redirects and unsupported methods are not converted', async () => {
  for (const [path, method, expectedStatus] of [
    ['/missing', 'GET', 404], ['/robots.txt', 'GET', 200],
    ['/ai-delivery/', 'GET', 308], ['/', 'POST', 405],
  ]) {
    const env = assetEnvironment()
    const response = await worker.fetch(new Request(`${origin}${path}`, {
      method, headers: { Accept: 'text/markdown' },
    }), env)
    assert.equal(response.status, expectedStatus)
    assert.equal(env.calls.length, 1)
    assert.doesNotMatch(response.headers.get('Content-Type') || '', /^text\/markdown/)
  }
})

test('missing Markdown artifacts safely fall back to the original HTML', async () => {
  const response = await worker.fetch(new Request(`${origin}/`, {
    headers: { Accept: 'text/markdown' },
  }), assetEnvironment({ missingMarkdown: true }))
  assert.equal(response.status, 200)
  assert.equal(await response.text(), html)
  assert.match(response.headers.get('Content-Type'), /^text\/html/)
})

test('canonical host redirects preserve query parameters before negotiation', async () => {
  const env = assetEnvironment()
  const response = await worker.fetch(new Request('http://www.luisangelparada.com/ai-delivery?ref=agent', {
    headers: { Accept: 'text/markdown' },
  }), env)
  assert.equal(response.status, 308)
  assert.equal(response.headers.get('Location'), `${origin}/ai-delivery?ref=agent`)
  assert.equal(env.calls.length, 0)
})

test('implementation-only Markdown artifact URLs cannot be fetched directly', async () => {
  const env = assetEnvironment()
  const response = await worker.fetch(new Request(`${origin}/_agent-markdown/index.md`), env)
  assert.equal(response.status, 404)
  assert.equal(env.calls.length, 0)
})
