-- name: CreateUserTag :one
INSERT INTO user_tags(
    name
) VALUES (
    @tag_name
) RETURNING *;

-- name: GetUserTagByName :one
SELECT * FROM user_tags
WHERE user_tags.name = @tag_name;

-- name: GetListUserTagsByUserId :many
SELECT
    user_tags.uuid AS uuid,
    user_tags.name AS name
FROM user_tags
JOIN users_user_tags ON users_user_tags.user_tag_uuid = user_tags.uuid
WHERE users_user_tags.user_uuid = @user_uuid
ORDER BY user_tags.name;
