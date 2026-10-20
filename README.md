# Luis Angel Parada: Engineering portfolio

Personal portfolio for Luis Angel Parada: engineering leadership, global commerce platforms,
applied AI, cloud architecture, and governed software delivery.

The portfolio homepage is supported by three project stories:

- `/ai-delivery`: the original AI Delivery Operating System experience
- `/work/commerce-platform`: the global commerce platform case study
- `/work/applied-ai-product-discovery`: an independent technical applied-AI reference architecture

The React client is built and tested through Docker. Production uses Cloudflare Workers Static
Assets so the portfolio can run on Cloudflare's free tier without a persistent container. The live
portfolio is available at [luisangelparada.com](https://luisangelparada.com).

The build pre-renders every public route with its visible page content, canonical URL, social
metadata and JSON-LD. Search crawlers therefore receive complete HTML without waiting for client
JavaScript. Unknown routes return a real `404` page marked `noindex`.

## Markdown for agents

The Worker supports content negotiation on every public page, including nested case-study routes:

```bash
curl -H 'Accept: text/markdown' https://luisangelparada.com/ai-delivery
```

An explicit, nonzero Markdown preference returns `Content-Type: text/markdown; charset=utf-8`.
Requests with no `Accept` header, wildcard-only requests, or a stronger HTML preference keep
receiving HTML. Both variants include `Vary: Accept` so caches do not mix their representations.

Markdown is generated from the same pre-rendered HTML during the Docker build. It preserves
headings, lists, links, public expandable/tabbed content, canonical page metadata and JSON-LD,
while removing scripts, styles, decorative elements and global navigation. No converter or
conversion dependency is shipped to the browser or run at request time. The site's existing
content-use policy (`ai-train=no`) and `/card` noindex policy are retained. No exact tokenizer is
configured, so the optional `x-markdown-tokens` header is deliberately omitted rather than
reporting an estimate as an exact count.

Implementation assets in `dist/_agent-markdown/` are not separate public URLs. Request Markdown
at the original page URL. This does not require enabling Cloudflare's paid-zone conversion
feature. The Nginx container remains an HTML preview; use the Dockerized Wrangler toolchain to
exercise the production Worker's negotiation. `npm test` (after `npm run build`, inside Docker)
checks generated content, Accept preferences, validators, ranges, redirects, HEAD and 404s.

To preview the real Worker locally, without Cloudflare credentials or deployment:

```bash
docker build --platform linux/amd64 -f Dockerfile.deploy -t portfolio-worker:local .
docker run --rm --platform linux/amd64 -p 127.0.0.1:8878:8787 --entrypoint sh \
  portfolio-worker:local -lc 'npm run build && npm run worker:dev -- --local --ip 0.0.0.0 --port 8787 --local-protocol https'
```

In another terminal, request `https://127.0.0.1:8878/` with `Accept: text/markdown`.
Wrangler uses a self-signed certificate for this local HTTPS preview. Production uses normal
Cloudflare TLS. The deployment-toolchain image uses Debian rather than Alpine because the
local Worker engine requires glibc; this does not change the production site's runtime.

## Architecture

```text
luisangelparada.com → Cloudflare Custom Domain → Worker → Static Assets → React SPA
```

The production Dockerfile powers local execution and CI. A second Dockerized toolchain builds the
same Vite application, uploads `dist/` to Workers Static Assets, and applies Terraform. Terraform
verifies the existing Registrar-managed zone and attaches the apex and `www` hostnames to the
Worker. No Workers Paid plan or production container is required.

## Local Docker workflow

Build and run the production container:

```bash
docker compose up --build app
```

Open `http://localhost:8080`. The container health endpoint is `http://localhost:8080/healthz`.

Stop it with:

```bash
docker compose down
```

## Contact configuration

Set the public contact address at image build time:

```bash
VITE_CONTACT_EMAIL=luis@example.com docker compose up --build app
```

The public portfolio contact uses Luis Angel Parada's personal contact address by default. The
build argument can replace it for another environment.

## Optional Cloudflare Workers Static Assets

Create a `.env.deploy` file from `.env.deploy.example` and add a Cloudflare API token with Workers
Scripts, Zone Read, and Workers Routes permissions, plus the account and zone IDs.

When a deployment is intentionally approved, it can run entirely through Docker:

```bash
docker compose --env-file .env.deploy --profile deploy run --rm deploy
```

The Dockerized toolchain performs the release in a controlled order:

1. The Dockerized toolchain builds the Vite application.
2. Wrangler uploads the Worker and the generated static assets.
3. Terraform verifies the active `luisangelparada.com` zone.
4. Terraform attaches `luisangelparada.com` and `www.luisangelparada.com` as Worker Custom Domains.
5. Cloudflare provisions the corresponding DNS records and TLS certificates.

The Worker permanently redirects `www` to the apex domain. No push to `main` deploys production;
deployment remains an explicit manual action.

## Personal GitHub

The intended repository is:

```text
https://github.com/tximpa91/luis-angel-parada-ai-delivery
```

Docker CI runs on pushes and pull requests. Production deployment is a manual GitHub Actions workflow and requires these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ZONE_ID`
- `VITE_CONTACT_EMAIL`

The manual workflow verifies that the credentials target the active personal portfolio zone,
then builds, tests and publishes only the Worker code and assets through Docker. It leaves
existing DNS records and Custom Domains unchanged. Use the full Docker Compose deployment
workflow above only when domain infrastructure reconciliation is intentionally required.

## Project structure

- `src/`: React client
- `src/seo.js`: route metadata and structured data
- `scripts/prerender.mjs`: static route generation after the Vite build
- `public/assets/`: generated production artwork used by the portfolio
- `design/portfolio-concepts/`: accepted visual direction and responsive references
- `nginx/default.conf`: SPA routing, health check, caching, and security headers
- `worker/index.js`: canonical hostname redirect and static asset routing
- `infra/terraform/`: zone verification and Worker Custom Domains
- `wrangler.jsonc`: Cloudflare Worker Static Assets configuration
- `Dockerfile`: production client image
- `Dockerfile.deploy`: containerized Wrangler deployment toolchain
- `.github/workflows/`: Docker CI and production deployment

Released under the [MIT License](LICENSE).

## Platform references

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Static Assets billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
