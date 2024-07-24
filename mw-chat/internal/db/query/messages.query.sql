-- name: CreateMessage :one
INSERT INTO messages (owner_uuid, room_uuid, text)
VALUES (@owner_uuid, @room_uuid, @text)
RETURNING owner_uuid, text;

-- name: GetMessagesByRoomUUID :many
SELECT owner_uuid, text 
FROM messages
WHERE room_uuid = @room_uuid;
