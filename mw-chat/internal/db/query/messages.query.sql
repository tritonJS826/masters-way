-- name: CreateMessage :one
INSERT INTO messages (owner_uuid, room_uuid, text)
VALUES (@owner_uuid, @room_uuid, @text)
RETURNING uuid, owner_uuid, text;

-- name: GetMessagesByRoomUUID :many
SELECT
    messages.owner_uuid,
    messages.text,
    ARRAY(
    SELECT receiver_uuid
     FROM message_status
     WHERE messages.uuid = message_status.message_uuid
        AND is_read = true
     ORDER BY updated_at DESC
    )::UUID[] AS message_status_user_uuids,
    ARRAY(
    SELECT updated_at
     FROM message_status
     WHERE messages.uuid = message_status.message_uuid
        AND is_read = true
     ORDER BY updated_at DESC
    )::UUID[] AS message_status_updated_at
FROM messages
WHERE room_uuid = @room_uuid;
