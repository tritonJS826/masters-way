-- name: CreateNotification :one
INSERT INTO notifications (
    user_uuid,
    description,
    url,
    nature
) VALUES (
    @user_uuid,
    @description,
    @url,
    @nature
) RETURNING *;

-- name: GetNotificationListByUserID :many
SELECT *
FROM notifications
WHERE user_uuid = @user_uuid
ORDER BY created_at DESC;

-- name: UpdateNotification :one
UPDATE notifications
SET is_read = COALESCE(sqlc.narg('is_read'), is_read)
WHERE uuid = @notification_uuid
RETURNING *;
