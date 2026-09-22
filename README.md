# Luis Angel Parada — Engineering portfolio

Personal portfolio for Luis Angel Parada: engineering leadership, global commerce platforms,
applied AI, cloud architecture, and governed software delivery.

The portfolio homepage is supported by three project stories:

- `/ai-delivery` — the original AI Delivery Operating System experience
- `/work/commerce-platform` — the global commerce platform case study
- `/work/boutique-sales-assistant` — the applied-AI product discovery case study

The React client is built into an nginx image. The repository also contains the Worker and
Container configuration required for a future Cloudflare deployment, but this repository does
not imply that a live deployment has been made.

## Architecture

```text
luisangelparada.com → Cloudflare Custom Domain → Worker → Container → nginx → React SPA
```

The same production Dockerfile powers local development, CI, and Cloudflare deployment. Terraform
verifies the existing Registrar-managed zone and attaches the apex and `www` hostnames to the
Worker. Cloudflare Containers requires a Workers Paid plan.

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

## Optional Cloudflare Workers + Containers

Create a `.env.deploy` file from `.env.deploy.example` and add a Cloudflare API token with Workers,
Containers, Zone Read, and Worker Custom Domains permissions, plus the account and zone IDs.

When a deployment is intentionally approved, it can run entirely through Docker:

```bash
docker compose --env-file .env.deploy --profile deploy run --rm deploy
```

The Dockerized toolchain performs the release in a controlled order:

1. Wrangler uploads the Worker and builds the `linux/amd64` container image.
2. Terraform verifies the active `luisangelparada.com` zone.
3. Terraform attaches `luisangelparada.com` and `www.luisangelparada.com` as Worker Custom Domains.
4. Cloudflare provisions the corresponding DNS records and TLS certificates.

The Worker permanently redirects `www` to the apex domain. No push to `main` deploys production;
deployment remains an explicit manual action.

## Personal GitHub

The intended repository is:

```text
https://github.com/tximpa91/luis-angel-parada-ai-delivery
```

Container CI runs on pushes and pull requests. Production deployment is a manual GitHub Actions workflow and requires these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ZONE_ID`
- `VITE_CONTACT_EMAIL`

## Project structure

- `src/` — React client
- `public/assets/` — generated production artwork used by the portfolio
- `design/portfolio-concepts/` — accepted visual direction and responsive references
- `nginx/default.conf` — SPA routing, health check, caching, and security headers
- `worker/index.js` — Worker-to-container routing
- `infra/terraform/` — zone verification and Worker Custom Domains
- `wrangler.jsonc` — Cloudflare Worker and Container configuration
- `Dockerfile` — production client image
- `Dockerfile.deploy` — containerized Wrangler deployment toolchain
- `.github/workflows/` — Docker CI and production deployment

Released under the [MIT License](LICENSE).

## Platform references

- [Cloudflare Containers](https://developers.cloudflare.com/containers/)
- [Cloudflare Worker Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Deploy Cloudflare Containers](https://developers.cloudflare.com/containers/guides/deploy/)
