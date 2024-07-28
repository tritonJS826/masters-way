-- name: CreateMessageStatus :exec
WITH room_users AS (
    SELECT user_uuid
    FROM users_rooms
    WHERE room_uuid = @room_uuid AND user_uuid != @user_uuid
)
INSERT INTO message_status (message_uuid, receiver_uuid, is_read)
SELECT @message_uuid, user_uuid, false
FROM room_users;
