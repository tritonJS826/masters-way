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
    -- return only readd notifications if @only_new = TRUE and all notification other way
    AND (                                                                 
        @is_only_new = TRUE AND is_read = FALSE                                
        OR @is_only_new = FALSE                                               
        ) 
ORDER BY created_at DESC
LIMIT @request_limit
OFFSET @request_offset;

-- name: GetAmountOfUnreadNotificationsByUserID :one
SELECT count(*)
FROM notifications
WHERE user_uuid = @user_uuid AND is_read = false;

-- name: UpdateNotification :one
UPDATE notifications
SET is_read = COALESCE(sqlc.narg('is_read'), is_read)
WHERE uuid = @notification_uuid
RETURNING *;
