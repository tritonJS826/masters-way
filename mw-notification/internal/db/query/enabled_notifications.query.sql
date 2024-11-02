-- name: CreateEnabledNotifications :exec
INSERT INTO enabled_notifications (
    user_uuid,
    nature,
    channel,
    is_enabled
) VALUES
    (@user_uuid, 'private_chat', 'mail', TRUE),
    (@user_uuid, 'group_chat', 'mail', TRUE),
    (@user_uuid, 'own_way', 'mail', TRUE),
    (@user_uuid, 'mentoring_way', 'mail', TRUE),
    (@user_uuid, 'mentoring_request', 'mail', TRUE),
    (@user_uuid, 'favorite_way', 'mail', TRUE),
    (@user_uuid, 'private_chat', 'webapp', TRUE),
    (@user_uuid, 'group_chat', 'webapp', TRUE),
    (@user_uuid, 'own_way', 'webapp', TRUE),
    (@user_uuid, 'mentoring_way', 'webapp', TRUE),
    (@user_uuid, 'mentoring_request', 'webapp', TRUE),
    (@user_uuid, 'favorite_way', 'webapp', TRUE);

-- name: GetEnabledNotificationListByUserID :many
SELECT *
FROM enabled_notifications
WHERE user_uuid = @user_uuid;

-- name: UpdateEnabledNotification :one
UPDATE enabled_notifications
SET is_enabled = COALESCE(sqlc.narg('is_enabled'), is_enabled)
WHERE uuid = @enabled_notifications_uuid
RETURNING *;
