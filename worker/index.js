export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.protocol === 'http:' || url.hostname === 'www.luisangelparada.com') {
      url.protocol = 'https:'
      url.hostname = 'luisangelparada.com'
      return Response.redirect(url.toString(), 308)
    }

    const assetResponse = await env.ASSETS.fetch(request)
    const headers = new Headers(assetResponse.headers)
    headers.set('Content-Signal', 'search=yes, ai-input=yes, ai-train=no, use=reference')
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

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
