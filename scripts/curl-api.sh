#!/usr/bin/env bash
# Smoke-test public API routes. Requires dev or production server running.
#
# Examples:
#   ./scripts/curl-api.sh health
#   ./scripts/curl-api.sh products
#   PRODUCTS_ADMIN_SECRET=... ./scripts/curl-api.sh product halo-ring
#   PRODUCTS_ADMIN_SECRET=... ./scripts/curl-api.sh patch halo-ring '{"price":42500000}'

set -euo pipefail

BASE="${API_BASE_URL:-http://localhost:3000}"
CMD="${1:-health}"

case "$CMD" in
  health)
    curl -sS "${BASE}/api/health"
  ;;
  products)
    curl -sS "${BASE}/api/products"
  ;;
  product)
    SLUG="${2:?Usage: $0 product SLUG}"
    curl -sS "${BASE}/api/products/${SLUG}"
  ;;
  patch)
    SLUG="${2:?Usage: $0 patch SLUG JSON}"
    JSON="${3:?Usage: $0 patch SLUG JSON}"
    SECRET="${PRODUCTS_ADMIN_SECRET:?Set PRODUCTS_ADMIN_SECRET}"
    curl -sS -X PATCH "${BASE}/api/products/${SLUG}" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${SECRET}" \
      -d "${JSON}"
  ;;
  *)
    echo "Usage: $0 [health|products|product|patch]" >&2
    echo "  health            GET /api/health" >&2
    echo "  products          GET /api/products" >&2
    echo "  product SLUG      GET /api/products/SLUG" >&2
    echo "  patch SLUG JSON   PATCH /api/products/SLUG (needs PRODUCTS_ADMIN_SECRET)" >&2
    exit 1
  ;;
esac
echo
