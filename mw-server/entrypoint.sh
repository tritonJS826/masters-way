#!/bin/sh

go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
migrate create -ext sql -dir db/migration -seq init_schema

# Perform migrations
migrate -path db/migration -database "postgresql://root:secret@postgres:5432/mastersway_db?sslmode=disable" -verbose up

# Start the server
./main