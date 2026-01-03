.PHONY: build start test install help

build: ## Build the project
	@echo "Building the project..."
	go build -o main cmd/telegram-bot/main.go

start: ## Run the project
	go run cmd/telegram-bot/main.go

test: ## Run all tests
	go test ./... -count=1

install: ## Install dependencies
	go mod tidy

help: ## Display help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' Makefile
