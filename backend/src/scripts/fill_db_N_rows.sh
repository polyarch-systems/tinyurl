#!/usr/bin/env bash
#
# Bulk-insert random short links into the database for stress-testing.
#
# Phase 1 — creates a few links via the API (requires TOKEN)
# Phase 2 — bulk-inserts millions of random links directly via psql
#
# Environment variables:
#   API          — API base URL (default: http://localhost:3001/api)
#   DATABASE_URL — Postgres connection string (default: from backend/.env)
#   NUM_LINKS    — how many bulk links to insert (default: 1000000)
#   USER_ID      — owner of the bulk links (default: a0000000-...-000000000001)
#   TOKEN        — JWT token for Phase 1 (optional)
#

set -euo pipefail

# ── Config ──────────────────────────────────────────────────────────────────
API="${API:-http://localhost:3001/api}"

# Load DATABASE_URL from backend/.env (script is at backend/src/scripts/,
# so .env is two directories up)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

if [ -z "${DATABASE_URL:-}" ]; then
  if [ -f "$PROJECT_DIR/.env" ]; then
    DATABASE_URL="$(grep '^DATABASE_URL=' "$PROJECT_DIR/.env" | cut -d= -f2- | tr -d '"')"
  fi
fi
DATABASE_URL="${DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/app?schema=public}"

# Strip query params for psql (it doesn't support ?schema=...)
PSQL_URL="${DATABASE_URL%%\?*}"

NUM_LINKS="${NUM_LINKS:-1000000}"
USER_ID="${USER_ID:-a0000000-0000-0000-0000-000000000001}"

# ── Phase 1: API-based seeding (requires TOKEN) ─────────────────────────────
if [ -n "${TOKEN:-}" ]; then
  echo "=== Phase 1: Seeding via API ==="

  # Single link
  echo "Creating single link 'gh'..."
  curl -s -X POST "$API/links" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"originalUrl":"https://github.com","shortCode":"gh"}' | jq .

  # 20 random links
  echo "Creating 20 random links..."
  for i in $(seq 1 20); do
    SHORT="test$i"
    URL="https://example.com/page/$RANDOM"
    curl -s -X POST "$API/links" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d "$(printf '{"originalUrl":"%s","shortCode":"%s"}' "$URL" "$SHORT")" \
      | jq -c '{shortCode, originalUrl, status}'
  done

  echo ""
  echo "Phase 1 done."
else
  echo "=== Phase 1: Skipped (TOKEN not set) ==="
  echo "  Set TOKEN to seed links via the API."
  echo "  Bulk insert via psql will still run."
fi

# ── Phase 2: Bulk insert via psql ───────────────────────────────────────────
echo ""
echo "=== Phase 2: Bulk-inserting $NUM_LINKS random links via psql ==="
echo "  Started at: $(date)"
echo "  This may take a while — no output until it finishes..."
echo ""

psql "$PSQL_URL" --echo-errors <<SQL
-- Insert $NUM_LINKS random links
INSERT INTO links (
  id,
  user_id,
  original_url,
  short_code,
  clicks,
  status,
  created_at,
  updated_at,
  expires_at
)
SELECT
  gen_random_uuid(),
  '$USER_ID'::uuid,
  CASE (random() * 4)::int
    WHEN 0 THEN 'https://example.com/page/' || (random() * 1e7)::int
    WHEN 1 THEN 'https://news.example.org/article/' || (random() * 1e7)::int
    WHEN 2 THEN 'https://blog.example.net/' || md5(random()::text)
    WHEN 3 THEN 'https://shop.example.com/product/' || (random() * 1e6)::int
    ELSE 'https://docs.example.io/v/' || (random() * 99)::int || '.' || (random() * 99)::int
  END,
  -- Short code: 6-10 random alphanumeric characters
  substring(
    md5(random()::text || clock_timestamp()::text)
    from 1 for (6 + (random() * 4)::int)
  ),
  -- Random click count (0 – 50 000)
  (random() * 50000)::bigint,
  -- Status: 85% active, 10% expired, 5% disabled
  CASE
    WHEN random() < 0.85 THEN 'active'::"LinkStatus"
    WHEN random() < 0.95 THEN 'expired'::"LinkStatus"
    ELSE 'disabled'::"LinkStatus"
  END,
  -- Created at: random timestamp within the last 90 days
  now() - (random() * interval '90 days'),
  now() - (random() * interval '90 days'),
  -- Expires at: 70% null, 20% future (within 1 year), 10% past (already expired)
  CASE
    WHEN random() < 0.70 THEN NULL
    WHEN random() < 0.90 THEN now() + (random() * interval '365 days')
    ELSE now() - (random() * interval '30 days')
  END
FROM generate_series(1, $NUM_LINKS) AS i
ON CONFLICT (short_code) DO NOTHING;
SQL

echo ""
echo "=== Done at $(date) ==="
echo "  Inserted up to $NUM_LINKS random links (some may have been skipped due to short_code conflicts)."
echo ""
echo "Verify:"
echo "  psql \"$PSQL_URL\" -c 'SELECT count(*) FROM links;'"