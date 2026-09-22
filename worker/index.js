import { Container, getContainer } from '@cloudflare/containers'

export class WebsiteContainer extends Container {
  defaultPort = 8080
  sleepAfter = '10m'
}

export default {
  async fetch(request, env) {
    const container = getContainer(env.WEBSITE_CONTAINER, 'luis-angel-parada-portfolio')
    return container.fetch(request)
  },
}
