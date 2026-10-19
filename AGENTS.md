# Personal portfolio context

- This repository is Luis Angel Parada's personal portfolio, hosted at
  https://luisangelparada.com/ and owned on GitHub by `tximpa91`.
- The audience is hiring managers, recruiters and prospective contract clients.
  Present engineering leadership, ownership of complex distributed platforms and
  applied AI transformation as complementary strengths.
- Support both permanent senior leadership roles and contract or interim mandates.
  Luis is based in Switzerland and is interested in Switzerland and remote Europe.
- Keep employer and client identities out of the case studies. Do not add company
  branding or publish internal implementation material from other repositories.
- Use the facts in `src/data/` and the user's confirmed corrections. Ask concise
  questions one at a time when a new claim needs evidence; do not request a CV.
- Avoid em dashes in public copy. Preserve the established visual identity.

## Confirmed evidence

- Current role: Global Head of Digital Engineering.
- Leadership scope: five direct managers, 26 people, six countries.
- Platform result: three brands launched with the same engineering team, using a
  shared frontend and backend architecture. The platform spans 40 transactional
  markets.
- AI delivery: an operating L3 AI-DLC workflow spans specialist-agent development,
  testing and independent validation through production releases with human
  approval. L4 implementation is underway, not a completed autonomous factory.
- The AI product-discovery reference architecture is independent and conceptual;
  it was not commissioned or deployed for an employer or client.
- Beyond Pricing and the concurrent Cogniflare engagement ended in April 2024.
- Do not invent savings, performance gains, delivery percentages or endorsements.

## Architecture and important files

- React and Vite, with pre-rendered HTML for public routes.
- `src/seo.js`: route metadata and JSON-LD.
- `src/data/profile.js`: shared identity, engagement copy and review dates.
- `src/data/portfolio.js`: career facts and case-study content.
- `src/data/aiTransformation.js`: AI transformation experience and maturity lens.
- `scripts/prerender.mjs`: static HTML generation and dateModified validation.
- `public/sitemap.xml`: canonical indexable pages. `/card` is intentionally noindex.
- `worker/index.js`: Cloudflare Worker serving static assets.
- `README.md`: local, deployment and infrastructure workflow.

## Build and verification

- Use Docker for application builds, execution and deployment tooling. A cloud
  environment must have a working Docker daemon, not just the Docker CLI. Report
  a missing daemon rather than silently switching to a native build workflow.
- Build: `docker build --platform linux/amd64 -t portfolio:check .`
- Preview: `docker run --rm -p 127.0.0.1:8080:8080 portfolio:check`
- Deployment toolchain:
  `docker build --platform linux/amd64 -f Dockerfile.deploy -t portfolio-deploy:check .`
- The Docker build runs the client, SSR and pre-render steps. Follow the checks in
  `.github/workflows/ci.yml` when validating a release.
- For SEO changes, verify the returned HTML contains the correct page content,
  unique metadata, canonical URL and parseable JSON-LD. Keep dateModified values
  in ISO 8601 with a timezone and use real content modification dates.
- Verify affected layouts and navigation on desktop and mobile when browser tools
  are available. State any checks that the cloud environment cannot perform.

## Publishing and cloud continuation

- Production runs on the existing Cloudflare Worker
  `luis-angel-parada-ai-delivery`. The domain already exists; a content release
  does not require a new domain, hosting provider or Terraform redesign.
- Deploy only when the user requests publication for the changes being made.
  GitHub pushes do not automatically deploy production.
- Use the personal Cloudflare account owning `luisangelparada.com`. Do not rely on
  a workstation's default work-account login.
- Supply credentials through approved environment secrets or a personal vault.
  Never commit credentials, copy them into handoff prompts or reuse local browser
  sessions as a cloud authentication mechanism.
- The SEO and portfolio copy in this handoff was deployed and checked on the live
  site on 19 October 2026. Subsequent cloud work should preserve that baseline.
- This cloud continuation concerns this repository only. Other repositories,
  print outputs, local logs and unrelated project files are outside its scope.
