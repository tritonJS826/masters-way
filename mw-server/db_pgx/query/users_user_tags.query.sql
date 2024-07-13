-- name: CreateUsersUserTag :one
INSERT INTO users_user_tags(
    user_uuid,
    user_tag_uuid
) VALUES (
    @user_uuid, @user_tag_uuid
) RETURNING *;

-- name: GetTagsCountByUserId :one
SELECT COUNT(*) AS tags_count
FROM users_user_tags
WHERE user_uuid = @user_uuid;

-- name: DeleteUserTagFromUser :exec
DELETE FROM users_user_tags
WHERE users_user_tags.user_uuid = @user_uuid AND users_user_tags.user_tag_uuid = @user_tag_uuid;
