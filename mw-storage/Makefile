build: ## Build the project
	@echo "Building the project..."
	go build -o main cmd/storage/main.go

start: ## Run the project
	go run cmd/storage/main.go

test: ## Run all tests
	go test ./...

db-run: ## Start the database using Docker
	docker-compose -f storagePostgres.docker-compose.yaml up

install: ## Install dependencies
	go mod tidy

swag: ##  Generate swagger specification
	swag init -g cmd/storage/main.go

db-schema: ## Generate db schema
	sqlc generate

help: ## Display help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' Makefile
