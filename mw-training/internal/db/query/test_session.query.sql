-- name: CreateTestSession :one
INSERT INTO test_sessions DEFAULT VALUES RETURNING *;
