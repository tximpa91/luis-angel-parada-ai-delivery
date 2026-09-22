locals {
  target_hostnames = toset([
    var.domain_name,
    "www.${var.domain_name}",
  ])
}

data "cloudflare_zones" "portfolio" {
  account = {
    id = var.cloudflare_account_id
  }
  name   = var.domain_name
  status = "active"
}

check "portfolio_zone" {
  assert {
    condition = (
      length(data.cloudflare_zones.portfolio.result) == 1 &&
      data.cloudflare_zones.portfolio.result[0].id == var.cloudflare_zone_id
    )
    error_message = "The active Cloudflare zone does not match cloudflare_zone_id."
  }
}

# The Registrar-managed zone is intentionally read-only in Terraform. This
# protects registration and nameserver ownership while still making the zone a
# verified dependency of the Worker Custom Domains below.

data "cloudflare_workers_custom_domains" "existing" {
  account_id = var.cloudflare_account_id
  zone_id    = var.cloudflare_zone_id
}

locals {
  existing_custom_domains = {
    for domain in data.cloudflare_workers_custom_domains.existing.result :
    domain.hostname => domain
    if contains(local.target_hostnames, domain.hostname)
  }
}

# Custom Domains make the Worker the origin and let Cloudflare provision the
# required DNS records and TLS certificates. Both hostnames reach the Worker;
# worker/index.js canonicalizes www to the apex domain.
resource "cloudflare_workers_custom_domain" "portfolio" {
  for_each = local.target_hostnames

  account_id = var.cloudflare_account_id
  hostname   = each.value
  service    = var.worker_service_name
  zone_id    = var.cloudflare_zone_id

  lifecycle {
    prevent_destroy = true
  }
}

# Deployment runs are deliberately stateless: Cloudflare remains the source of
# truth. Existing Custom Domains are discovered and imported before planning,
# so repeated manual deployments reconcile instead of trying to recreate them.
import {
  for_each = local.existing_custom_domains

  to = cloudflare_workers_custom_domain.portfolio[each.key]
  id = "${var.cloudflare_account_id}/${each.value.id}"
}
