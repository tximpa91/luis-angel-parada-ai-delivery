# Luis Angel Parada — AI Delivery Architect

Personal portfolio for Luis Angel Parada. The React client is built into an nginx image and deployed as a Cloudflare Container controlled by a Worker.

## Architecture

```text
Browser → Cloudflare Worker → Cloudflare Container → nginx → React SPA
```

The same production Dockerfile powers local development, CI, and Cloudflare deployment. Cloudflare Containers requires a Workers Paid plan.

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
VITE_CONTACT_EMAIL=angel@example.com docker compose up --build app
```

Without that variable, the site copies a ready-made introduction instead of publishing invented contact information.

## Cloudflare Workers + Containers

Create a `.env.deploy` file from `.env.deploy.example` and add a Cloudflare API token with Workers and Containers deployment permissions plus the account ID.

Deploy entirely through Docker:

```bash
docker compose --env-file .env.deploy --profile deploy run --rm deploy
```

Wrangler uploads the Worker, builds the `linux/amd64` image from `Dockerfile`, pushes it to Cloudflare, and starts the container rollout.
If `VITE_CONTACT_EMAIL` is set, the Dockerized deployment passes that public address into the production image as a build argument.

## Personal GitHub

The intended repository is:

```text
https://github.com/tximpa91/luis-angel-parada-ai-delivery
```

Container CI runs on pushes and pull requests. Production deployment is a manual GitHub Actions workflow and requires these repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `VITE_CONTACT_EMAIL`

## Project structure

- `src/` — React client
- `nginx/default.conf` — SPA routing, health check, caching, and security headers
- `worker/index.js` — Worker-to-container routing
- `wrangler.jsonc` — Cloudflare Worker and Container configuration
- `Dockerfile` — production client image
- `Dockerfile.deploy` — containerized Wrangler deployment toolchain
- `.github/workflows/` — Docker CI and production deployment

Released under the [MIT License](LICENSE).

## Platform references

- [Cloudflare Containers](https://developers.cloudflare.com/containers/)
- [Deploy Cloudflare Containers](https://developers.cloudflare.com/containers/guides/deploy/)
