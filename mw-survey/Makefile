build: ## Build the project
	@echo "Building the project..."
	go build -o main cmd/survey/main.go

start: ## Run the project
	go run cmd/survey/main.go

test: ## Run all tests
	go test ./... -count=1

db-run: ## Start the database using Docker
	docker-compose -f surveyPostgres.docker-compose.yaml up

install: ## Install dependencies
	go mod tidy

swag: ##  Generate swagger specification
	swag init -g cmd/survey/main.go --parseDependency

db-schema: ## Generate db schema
	sqlc generate

help: ## Display help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' Makefile
