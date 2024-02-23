-- name: CreateUserTag :one
INSERT INTO user_tags(
    name,
    owner_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetListUserTagsByUserId :many
SELECT * FROM user_tags
WHERE user_tags.owner_uuid = $1
ORDER BY uuid;


-- name: UpdateUserTag :one
UPDATE user_tags
SET
name = coalesce(sqlc.narg('name'), name)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteUserTag :exec
DELETE FROM user_tags
WHERE uuid = $1;