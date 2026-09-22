output "zone" {
  description = "Cloudflare zone connected to the portfolio."
  value = {
    id           = data.cloudflare_zones.portfolio.result[0].id
    name         = data.cloudflare_zones.portfolio.result[0].name
    status       = data.cloudflare_zones.portfolio.result[0].status
    name_servers = data.cloudflare_zones.portfolio.result[0].name_servers
  }
}

output "portfolio_urls" {
  description = "Public hostnames attached to the Worker after apply."
  value = {
    primary = "https://${var.domain_name}"
    www     = "https://www.${var.domain_name}"
  }
}

output "worker_custom_domains" {
  description = "Custom Domain IDs created by Cloudflare."
  value = {
    for hostname, domain in cloudflare_workers_custom_domain.portfolio : hostname => domain.id
  }
}
