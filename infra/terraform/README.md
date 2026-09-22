# Cloudflare domain infrastructure

This Terraform configuration verifies the existing `luisangelparada.com` zone and attaches both
the apex and `www` hostnames to the portfolio Worker as Cloudflare Custom Domains. The
Registrar-managed zone is intentionally treated as read-only infrastructure.

Cloudflare owns DNS and certificate provisioning for Custom Domains. The Worker serves the Vite
build through Workers Static Assets and redirects `www` requests to the apex hostname, so
`https://luisangelparada.com` remains canonical.

## Credentials

Keep credentials outside Terraform files and state:

```bash
export CLOUDFLARE_API_TOKEN="..."
export TF_VAR_cloudflare_account_id="..."
export TF_VAR_cloudflare_zone_id="..."
```

The token needs Zone Read plus Workers Scripts and Workers Custom Domains read/write access. The
Registrar registration remains owned by Cloudflare Registrar and is intentionally not modified by
Terraform.

## Validate and plan

```bash
terraform -chdir=infra/terraform init
terraform -chdir=infra/terraform fmt -check -recursive
terraform -chdir=infra/terraform validate
terraform -chdir=infra/terraform plan
```

Do not apply this configuration before the Worker service exists. The repository's manual deploy
workflow builds the site inside Docker, uploads it to Workers Static Assets, and applies Terraform
second.

Each run discovers and imports any existing Custom Domains before planning. This makes the manual
deployment workflow repeatable without committing or remotely persisting Terraform state. State
and plan files are ignored by Git and must never be committed.
