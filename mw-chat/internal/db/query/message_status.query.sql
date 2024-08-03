-- name: CreateMessageStatus :exec
WITH room_users AS (
    SELECT user_uuid
    FROM users_rooms
    WHERE room_uuid = @room_uuid AND user_uuid != @user_uuid
)
INSERT INTO message_status (message_uuid, receiver_uuid, is_read)
SELECT @message_uuid, user_uuid, false
FROM room_users;

-- name: SetMessagesAsRead :exec
UPDATE message_status
SET is_read = true
FROM messages
WHERE message_status.message_uuid = messages.uuid
    AND messages.room_uuid = @room_uuid
    AND message_status.receiver_uuid = @user_uuid
    AND message_status.is_read = false;
