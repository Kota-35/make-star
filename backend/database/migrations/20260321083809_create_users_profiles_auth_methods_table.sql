-- +goose Up
-- updated_atを自動で更新するための関数を作成
-- +goose StatementBegin
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at := now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;
-- +goose StatementEnd

-- NOTE: gen_random_uuid() を使用するため
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_users_set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE
);

CREATE TRIGGER trg_profiles_set_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();

CREATE TYPE auth_provider_id AS ENUM (
  'password',
  'phone',
  'google.com',
  'facebook.com'
);

CREATE TABLE auth_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id auth_provider_id NOT NULL,
  provider_uid TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (provider_id, provider_uid)
);

CREATE INDEX idx_auth_methods_user_id ON auth_methods(user_id);
CREATE INDEX idx_auth_methods_provider ON auth_methods(provider_id, provider_uid);

CREATE TRIGGER trg_auth_methods_set_updated_at
BEFORE UPDATE ON auth_methods
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();


-- +goose Down

DROP TRIGGER IF EXISTS trg_auth_methods_set_updated_at ON users;
DROP TABLE IF EXISTS auth_methods;
DROP TYPE IF EXISTS auth_provider_id;
DROP TRIGGER IF EXISTS trg_profiles_set_updated_at ON profiles;
DROP TABLE IF EXISTS profiles;
DROP TRIGGER IF EXISTS trg_users_set_updated_at ON users;
DROP TABLE IF EXISTS users;
DROP EXTENSION IF EXISTS pgcrypto;
DROP FUNCTION set_updated_at();
