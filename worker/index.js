import { markdownAssetPath, prefersMarkdown, varyOnAccept } from './markdown.js'

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.protocol === 'http:' || url.hostname === 'www.luisangelparada.com') {
      url.protocol = 'https:'
      url.hostname = 'luisangelparada.com'
      return Response.redirect(url.toString(), 308)
    }

    const negotiateMarkdown = ['GET', 'HEAD'].includes(request.method)
      && prefersMarkdown(request.headers.get('Accept') || '')
    let assetRequest = request
    if (negotiateMarkdown) {
      const lookupHeaders = new Headers(request.headers)
      // HTML validators and byte ranges cannot decide the Markdown variant.
      for (const name of ['If-None-Match', 'If-Modified-Since', 'If-Match', 'If-Unmodified-Since', 'Range', 'If-Range']) {
        lookupHeaders.delete(name)
      }
      lookupHeaders.set('Accept', 'text/html')
      assetRequest = new Request(request, { headers: lookupHeaders })
    }

    // Do not expose generated implementation paths as duplicate public pages.
    let assetResponse = url.pathname.startsWith('/_agent-markdown/')
      ? new Response(request.method === 'HEAD' ? null : 'Not found\n', {
          status: 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        })
      : await env.ASSETS.fetch(assetRequest)
    let isMarkdown = false

    if (negotiateMarkdown && assetResponse.status === 200
      && /^text\/html(?:;|$)/i.test(assetResponse.headers.get('Content-Type') || '')) {
      const markdownUrl = new URL(url)
      markdownUrl.pathname = markdownAssetPath(url.pathname)
      const markdownResponse = await env.ASSETS.fetch(new Request(markdownUrl, request))
      if ([200, 206, 304, 412, 416].includes(markdownResponse.status)) {
        assetResponse = markdownResponse
        isMarkdown = true
      }
    }

    const headers = new Headers(assetResponse.headers)
    varyOnAccept(headers)
    headers.set('Content-Signal', 'search=yes, ai-input=yes, ai-train=no, use=reference')
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

    if (isMarkdown) {
      headers.set('Content-Type', 'text/markdown; charset=utf-8')
      headers.set('Link', `<https://luisangelparada.com${url.pathname}>; rel="canonical"`)
      if (url.pathname === '/card') headers.set('X-Robots-Tag', 'noindex, follow')
    }

    if (url.pathname === '/luis-angel-parada.vcf' && assetResponse.ok) {
      headers.set('Content-Type', 'text/vcard; charset=utf-8')
      headers.set('Content-Disposition', 'attachment; filename="Luis-Angel-Parada.vcf"')
    }

    if (/^\/assets\/index-[\w-]+\.(?:css|js)$/.test(url.pathname)) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    } else if (url.pathname.startsWith('/assets/')) {
      headers.set('Cache-Control', 'public, max-age=86400')
    }

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    })
  },
}
