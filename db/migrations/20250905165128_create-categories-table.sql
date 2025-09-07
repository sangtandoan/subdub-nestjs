-- migrate:up
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    color TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now(),
    UNIQUE(user_id, name)
);

-- Add foreign key to subscriptions
ALTER TABLE subscriptions ADD CONSTRAINT fk_subscriptions_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- migrate:down
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS fk_subscriptions_category;
DROP TABLE IF EXISTS categories;