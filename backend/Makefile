.PHONY: help generate run dev build lint test

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
