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

    return env.ASSETS.fetch(request)
  },
}
