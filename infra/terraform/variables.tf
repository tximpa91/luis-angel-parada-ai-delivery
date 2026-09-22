variable "cloudflare_account_id" {
  description = "Cloudflare account that owns the portfolio zone and Worker."
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_account_id))
    error_message = "cloudflare_account_id must be a 32-character Cloudflare account ID."
  }
}

variable "cloudflare_zone_id" {
  description = "Existing Cloudflare zone ID for the Registrar-managed domain."
  type        = string

  validation {
    condition     = can(regex("^[0-9a-f]{32}$", var.cloudflare_zone_id))
    error_message = "cloudflare_zone_id must be a 32-character Cloudflare zone ID."
  }
}

variable "domain_name" {
  description = "Primary portfolio domain registered with Cloudflare Registrar."
  type        = string
  default     = "luisangelparada.com"

  validation {
    condition     = var.domain_name == lower(var.domain_name) && !startswith(var.domain_name, "www.")
    error_message = "domain_name must be the lowercase apex domain without www."
  }
}

variable "worker_service_name" {
  description = "Cloudflare Worker service deployed by Wrangler."
  type        = string
  default     = "luis-angel-parada-ai-delivery"
}
