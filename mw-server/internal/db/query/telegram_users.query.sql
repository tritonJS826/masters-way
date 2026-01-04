-- name: CreatePendingTelegramUser :one
INSERT INTO telegram_users (
    telegram_id,
    user_uuid,
    telegram_name,
    auth_code,
    auth_code_expires_at,
    status
) VALUES (
    @telegram_id, NULL, @telegram_name, @auth_code, @auth_code_expires_at, 'initiated'
)
ON CONFLICT (telegram_id) DO UPDATE SET
    user_uuid = NULL,
    telegram_name = EXCLUDED.telegram_name,
    auth_code = EXCLUDED.auth_code,
    auth_code_expires_at = EXCLUDED.auth_code_expires_at,
    status = 'initiated',
    updated_at = CURRENT_TIMESTAMP
RETURNING *;

-- name: GetPendingTelegramUserByAuthCode :one
SELECT * FROM telegram_users
WHERE auth_code = @auth_code
  AND status = 'initiated'
  AND auth_code_expires_at > CURRENT_TIMESTAMP;

-- name: GetTelegramUserByAuthCode :one
SELECT * FROM telegram_users
WHERE auth_code = @auth_code
  AND auth_code_expires_at > CURRENT_TIMESTAMP;

-- name: GetTelegramUserByTelegramId :one
SELECT * FROM telegram_users
WHERE telegram_id = @telegram_id;

-- name: LinkTelegramUserByAuthCode :exec
UPDATE telegram_users SET
    user_uuid = @user_uuid,
    status = 'linked',
    auth_code_expires_at = CURRENT_TIMESTAMP,
    updated_at = CURRENT_TIMESTAMP
WHERE auth_code = @auth_code
  AND status = 'initiated'
  AND auth_code_expires_at > CURRENT_TIMESTAMP;

-- name: LinkTelegramUser :exec
INSERT INTO telegram_users (
    telegram_id,
    user_uuid,
    telegram_name,
    auth_code,
    auth_code_expires_at,
    status
) VALUES (
    @telegram_id, @user_uuid, @telegram_name, @auth_code, CURRENT_TIMESTAMP + INTERVAL '10 minutes', 'linked'
)
ON CONFLICT (telegram_id) DO UPDATE SET
    user_uuid = EXCLUDED.user_uuid,
    telegram_name = COALESCE(EXCLUDED.telegram_name, telegram_users.telegram_name),
    auth_code = EXCLUDED.auth_code,
    auth_code_expires_at = EXCLUDED.auth_code_expires_at,
    status = EXCLUDED.status,
    updated_at = CURRENT_TIMESTAMP;

-- name: DeleteTelegramUserByAuthCode :exec
DELETE FROM telegram_users
WHERE auth_code = @auth_code;

-- name: DeleteTelegramUserByTelegramId :exec
DELETE FROM telegram_users
WHERE telegram_id = @telegram_id;

-- name: CleanupExpiredTelegramCodes :exec
DELETE FROM telegram_users
WHERE status = 'initiated' AND auth_code_expires_at < CURRENT_TIMESTAMP;

-- name: GetLinkedUserByTelegramId :one
SELECT tu.*, u.email, u.name as user_name, u.image_url as user_image
FROM telegram_users tu
LEFT JOIN users u ON tu.user_uuid = u.uuid
WHERE tu.telegram_id = @telegram_id
  AND tu.status = 'linked'
  AND tu.user_uuid IS NOT NULL;
