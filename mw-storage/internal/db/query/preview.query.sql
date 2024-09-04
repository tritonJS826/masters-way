-- name: GetChatPreview :one
SELECT 
    COUNT(*) as unread_messages
FROM message_status
WHERE message_status.is_read = false AND message_status.receiver_uuid = @receiver_uuid;
