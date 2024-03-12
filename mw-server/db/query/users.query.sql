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
SELECT 
    users.uuid,
    users.name,
    users.email,
    users.description,
    users.created_at,
    users.image_url,
    users.is_mentor,
    (SELECT COUNT(*) FROM ways WHERE ways.owner_uuid = users.uuid) AS own_ways_amount,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.user_uuid = users.uuid) AS favorite_ways,
    (SELECT COUNT(*) FROM mentor_users_ways WHERE mentor_users_ways.user_uuid = users.uuid) AS mentoring_ways_amount,
    (SELECT COUNT(*) FROM favorite_users WHERE favorite_users.acceptor_user_uuid = users.uuid) AS favorite_for_users_amount,
    -- get user tag uuids
    ARRAY(
        SELECT user_tags.uuid 
        FROM user_tags 
        INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
        WHERE users_user_tags.owner_uuid = users.uuid
    )::VARCHAR[] AS tag_uuids,
    -- get user tag names
    ARRAY(
        SELECT user_tags.name 
        FROM user_tags 
        INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
        WHERE users_user_tags.owner_uuid = users.uuid
    )::VARCHAR[] AS tag_names
FROM users
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







