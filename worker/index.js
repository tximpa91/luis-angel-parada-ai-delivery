export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.hostname === 'www.luisangelparada.com') {
      url.hostname = 'luisangelparada.com'
      return Response.redirect(url.toString(), 308)
    }

    if (url.pathname === '/work/boutique-sales-assistant') {
      url.pathname = '/work/applied-ai-product-discovery'
      return Response.redirect(url.toString(), 308)
    }

    const assetResponse = await env.ASSETS.fetch(request)
    const headers = new Headers(assetResponse.headers)
    headers.set('Content-Signal', 'search=yes, ai-input=yes, ai-train=no, use=reference')

    return new Response(assetResponse.body, {
      status: assetResponse.status,
      statusText: assetResponse.statusText,
      headers,
    })
  },
}
