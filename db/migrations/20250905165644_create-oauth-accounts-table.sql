-- migrate:up
CREATE TABLE IF NOT EXISTS oauth_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- e.g., 'google', 'github', 'facebook'
    provider_id TEXT NOT NULL, -- The ID from the OAuth provider
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP,
    scope TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE(user_id, provider),
    UNIQUE(provider, provider_id)
);

-- migrate:down
DROP TABLE IF EXISTS oauth_accounts;