include .env
export

.PHONY: help generate run dev build lint test migrate-up migrate-down migrate-status migrate-reset migrate-create sqlc

help: ## ヘルプを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

generate: ## OpenAPI からコードを生成
	go tool oapi-codegen -config=oapi-codegen.yml ../api/openapi.yaml

dev: generate ## ホットリロードで起動
	go tool air -c .air.toml

build: generate ## バイナリをビルド
	go build -o bin/server ./cmd/server/

run: generate ## サーバーを起動
	go run ./cmd/server/

lint: generate ## 静的解析を実行
	go vet ./...

test: generate ## テストを実行
	go test ./...

# ----- DB Migration (goose) -----
migrate-up: ## マイグレーションを実行
	go tool goose -dir database/migrations postgres "$(DATABASE_URL)" up

migrate-down: ## 直前のマイグレーションをロールバック
	go tool goose -dir database/migrations postgres "$(DATABASE_URL)" down

migrate-status: ## マイグレーションの状態を確認
	go tool goose -dir database/migrations postgres "$(DATABASE_URL)" status

migrate-reset: ## 全マイグレーションをロールバック
	go tool goose -dir database/migrations postgres "$(DATABASE_URL)" reset

# NOTE: `make migrate-create <name>` のようにスペースで引数を渡せるようにするためのトリック
# `make migrate-create create_users_table` と実行すると:
#   1. MIGRATION_NAME = "create_users_table" として取り出す
#   2. "create_users_table" を no-op ターゲットとして動的に定義する
#      → make が "create_users_table" を別のターゲットとして実行しようとするのを防ぐ
ifeq (migrate-create,$(firstword $(MAKECMDGOALS)))
  MIGRATION_NAME := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(MIGRATION_NAME):;@:)
endif

migrate-create: ## マイグレーションファイルを作成 (例: make migrate-create create_users_table)
	go tool goose -dir database/migrations create $(MIGRATION_NAME) sql

# ----- sqlc -----
sqlc: ## sqlc でGoコードを生成
	go tool sqlc generate
