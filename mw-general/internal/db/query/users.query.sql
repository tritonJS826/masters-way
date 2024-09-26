-- name: CreateUser :one
INSERT INTO users(
    name,
    email,
    description,
    created_at,
    image_url,
    is_mentor
) VALUES (
    @name, @email, @description, @created_at, @image_url, @is_mentor
) RETURNING *;

-- name: GetUsersByIds :many
SELECT uuid, name, image_url
FROM users
WHERE uuid = ANY(@user_uuids::UUID[]);

-- name: GetUserById :one
SELECT * FROM users
WHERE uuid = @user_uuid
LIMIT 1;

-- name: GetUserByEmail :one
SELECT * FROM users
WHERE email = @user_email
LIMIT 1;

-- name: GetUserByIds :many
SELECT * FROM users
WHERE uuid = ANY($1::UUID[]);

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
    COALESCE(
        ARRAY(
            SELECT user_tags.uuid
            FROM user_tags
            INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
            WHERE users_user_tags.user_uuid = users.uuid
        ),
        '{}'
    )::VARCHAR[] AS tag_uuids,
    -- get user tag names
    COALESCE(
        ARRAY(
            SELECT user_tags.name
            FROM user_tags
            INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
            WHERE users_user_tags.user_uuid = users.uuid
        ),
        '{}'
    )::VARCHAR[] AS tag_names,
    (SELECT COUNT(*) FROM users) AS users_size
FROM users
WHERE (LOWER(users.email) LIKE '%' || LOWER(@email) || '%' OR @email = '')
    AND (LOWER(users.name) LIKE '%' || LOWER(@name) || '%' OR @name = '')
    -- mentoring status filter
    AND (
        (@mentor_status = 'mentor' AND users.is_mentor = true)
        OR (@mentor_status = 'all')
    )
ORDER BY created_at DESC
LIMIT $1
OFFSET $2;

-- name: GetPlainUserWithInfoByIDs :many
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
    COALESCE(
        ARRAY(
            SELECT user_tags.uuid
            FROM user_tags
            INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
            WHERE users_user_tags.user_uuid = users.uuid
        ),
        '{}'
    )::VARCHAR[] AS tag_uuids,
    -- get user tag names
    COALESCE(
        ARRAY(
            SELECT user_tags.name
            FROM user_tags
            INNER JOIN users_user_tags ON user_tags.uuid = users_user_tags.user_tag_uuid
            WHERE users_user_tags.user_uuid = users.uuid
        ),
        '{}'
    )::VARCHAR[] AS tag_names
FROM users
WHERE users.uuid IN (
    SELECT user_uuid 
    FROM users_projects 
    WHERE users_projects.project_uuid = @project_uuid
);

-- name: CountUsers :one
SELECT COUNT(*) FROM users
WHERE ((LOWER(users.email) LIKE '%' || LOWER(@email) || '%') OR (@email = ''))
    AND ((LOWER(users.name) LIKE '%' || LOWER(@name) || '%') OR (@name = ''))
    AND (
        (@mentor_status = 'mentor' AND users.is_mentor = true)
        OR (@mentor_status = 'all'));

-- name: UpdateUser :one
UPDATE users
SET
name = coalesce(sqlc.narg('name'), name),
description = coalesce(sqlc.narg('description'), description),
image_url = coalesce(sqlc.narg('image_url'), image_url),
is_mentor = coalesce(sqlc.narg('is_mentor'), is_mentor)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE uuid = @user_uuid;
