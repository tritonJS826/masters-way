-- name: CreateNotificationSettings :exec
INSERT INTO notification_settings (
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

-- name: GetNotificationSettingListByUserID :many
SELECT *
FROM notification_settings
WHERE user_uuid = @user_uuid;

-- name: GetEnabledNotificationSettingListByUserID :many
SELECT *
FROM notification_settings
WHERE user_uuid = @user_uuid
    AND is_enabled = TRUE;

-- name: UpdateNotificationSetting :one
UPDATE notification_settings
SET is_enabled = COALESCE(sqlc.narg('is_enabled'), is_enabled)
WHERE uuid = @notification_setting_uuid
RETURNING *;
