-- name: CreateMessageInGroupRoom :one
INSERT INTO group_messages (owner_uuid, room_uuid, text)
VALUES (@owner_uuid, @room_uuid, @text)
RETURNING owner_uuid, text;

-- name: GetGroupMessagesByRoomUUID :many
SELECT owner_uuid, text FROM group_messages
WHERE room_uuid = @room_uuid;
