-- name: CreateUser :one
INSERT INTO users(
    name,
    email,
    description,
    created_at,
    image_url,
    is_mentor
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING *;


-- name: GetUserById :one
SELECT * FROM users
WHERE uuid = $1
LIMIT 1;


-- TODO: add filter and sorters
-- name: ListUsers :many
SELECT * FROM users
ORDER BY created_at
LIMIT $1
OFFSET $2;

-- name: UpdateUser :one
UPDATE users
SET
name = coalesce(sqlc.narg('name'), name),
email = coalesce(sqlc.narg('email'), email),
description = coalesce(sqlc.narg('description'), description),
image_url = coalesce(sqlc.narg('image_url'), image_url),
is_mentor = coalesce(sqlc.narg('is_mentor'), is_mentor)

WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE uuid = $1;




