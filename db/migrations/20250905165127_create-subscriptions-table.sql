-- migrate:up
CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly', 'weekly', 'daily');

CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'paused', 'expired');

CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    cost DECIMAL(10,2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    billing_cycle billing_cycle NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status subscription_status NOT NULL DEFAULT 'active',
    category_id UUID,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- migrate:down
DROP TABLE IF EXISTS subscriptions;
DROP TYPE IF EXISTS subscription_status;
DROP TYPE IF EXISTS billing_cycle;
