# Luis Angel Parada — Engineering portfolio

Personal portfolio for Luis Angel Parada: engineering leadership, global commerce platforms,
applied AI, cloud architecture, and governed software delivery.

The portfolio homepage is supported by three project stories:

- `/ai-delivery` — the original AI Delivery Operating System experience
- `/work/commerce-platform` — the global commerce platform case study
- `/work/applied-ai-product-discovery` — a client-safe applied-AI capability overview

The React client is built and tested through Docker. Production uses Cloudflare Workers Static
Assets so the portfolio can run on Cloudflare's free tier without a persistent container. The live
portfolio is available at [luisangelparada.com](https://luisangelparada.com).

The build pre-renders every public route with its visible page content, canonical URL, social
metadata and JSON-LD. Search crawlers therefore receive complete HTML without waiting for client
JavaScript. Unknown routes return a real `404` page marked `noindex`.

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

## Project structure

- `src/` — React client
- `src/seo.js` — route metadata and structured data
- `scripts/prerender.mjs` — static route generation after the Vite build
- `public/assets/` — generated production artwork used by the portfolio
- `design/portfolio-concepts/` — accepted visual direction and responsive references
- `nginx/default.conf` — SPA routing, health check, caching, and security headers
- `worker/index.js` — canonical hostname redirect and static asset routing
- `infra/terraform/` — zone verification and Worker Custom Domains
- `wrangler.jsonc` — Cloudflare Worker Static Assets configuration
- `Dockerfile` — production client image
- `Dockerfile.deploy` — containerized Wrangler deployment toolchain
- `.github/workflows/` — Docker CI and production deployment

Released under the [MIT License](LICENSE).

## Platform references

- [Cloudflare Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Static Assets billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
