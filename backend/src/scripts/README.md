# Database Seed Scripts

## `fill_db_N_rows.sh`

Bulk-insert random short links directly into PostgreSQL for stress-testing or populating the database with large volumes of realistic data.

### Quick start

```bash
# Insert 1,000,000 random links for a specific user
NUM_LINKS=1000000 USER_ID="7b78842e-a2b5-484f-b1d2-6812d1d6edab" bash backend/src/scripts/fill_db_N_rows.sh
```

### Configuration

All settings are passed as environment variables:

| Variable       | Default                                                                    | Description                                |
|----------------|----------------------------------------------------------------------------|--------------------------------------------|
| `NUM_LINKS`    | `1000000`                                                                  | Number of random links to insert           |
| `USER_ID`      | `a0000000-0000-0000-0000-000000000001`                                     | UUID of the user who owns the links        |
| `DATABASE_URL` | Loaded from `backend/.env` automatically                                   | PostgreSQL connection string               |
| `API`          | `http://localhost:3001/api`                                                | API base URL (Phase 1 only)                |
| `TOKEN`        | _(optional)_                                                               | JWT for Phase 1 API seeding                |

### Usage examples

Insert **1 million** links for your user:

```bash
NUM_LINKS=1000000 USER_ID="7b78842e-a2b5-484f-b1d2-6812d1d6edab" bash backend/src/scripts/fill_db_N_rows.sh
```

Insert **10 million** links:

```bash
NUM_LINKS=10000000 USER_ID="7b78842e-a2b5-484f-b1d2-6812d1d6edab" bash backend/src/scripts/fill_db_N_rows.sh
```

Insert **100** links to test first:

```bash
NUM_LINKS=100 USER_ID="7b78842e-a2b5-484f-b1d2-6812d1d6edab" bash backend/src/scripts/fill_db_N_rows.sh
```

### How it works

The script runs in two phases:

1. **Phase 1 (optional)** — Creates a few links via the REST API (`POST /api/links`). Requires `TOKEN`. Useful for getting a known short code (e.g. `gh`) for quick manual testing.

2. **Phase 2 (main)** — Uses `psql` to run a single `INSERT … SELECT` that generates `NUM_LINKS` rows with:
   - Random UUIDs
   - Realistic-looking original URLs from 5 different patterns
   - Random 6–10 character short codes (via `md5`)
   - Random click counts (0–50,000)
   - Realistic status distribution (85% active, 10% expired, 5% disabled)
   - Random `created_at` / `updated_at` timestamps within the last 90 days
   - Realistic `expires_at` (70% null, 20% future, 10% past)
   - `ON CONFLICT (short_code) DO NOTHING` to safely skip collisions