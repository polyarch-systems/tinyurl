-- Seed test users
INSERT INTO users (id, email, name, password_hash, plan_id, links_used, link_limit, team_members, joined_at, created_at, updated_at)
SELECT
  'a0000000-0000-0000-0000-000000000001',
  'test@example.com',
  'Test User',
  '$2a$10$dummyhashfordevelopmentonly1234567890abcdef',
  NULL,
  0,
  1000,
  1,
  NOW(), NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'test@example.com');

-- Seed test links (all owned by the test user above)
INSERT INTO links (id, user_id, original_url, short_code, clicks, status, created_at, updated_at, expires_at)
VALUES
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://github.com',           'gh',      0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://google.com',           'gl',      0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://news.ycombinator.com', 'hn',      0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://stackoverflow.com',    'so',      0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://reddit.com',           'rd',      0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://youtube.com',          'yt',      0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://x.com',                'x',       0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://wikipedia.org',        'wiki',    0, 'active',  NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://github.com/polyarch-systems/tinyurl', 'tiny', 0, 'active', NOW(), NOW(), NULL),
  (gen_random_uuid(), 'a0000000-0000-0000-0000-000000000001', 'https://example.com/long/url/path', 'ex', 0, 'active', NOW(), NOW(), NULL);

-- Insert 50 more random short links for bulk testing
INSERT INTO links (id, user_id, original_url, short_code, clicks, status, created_at, updated_at)
SELECT
  gen_random_uuid(),
  'a0000000-0000-0000-0000-000000000001',
  'https://example.com/page/' || n,
  'link' || n,
  0,
  'active',
  NOW() - (random() * INTERVAL '30 days'),
  NOW() - (random() * INTERVAL '30 days')
FROM generate_series(1, 50) AS n;