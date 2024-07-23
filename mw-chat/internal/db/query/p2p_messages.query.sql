-- name: CreateMessageInP2PRoom :one
INSERT INTO p2p_messages (owner_uuid, room_uuid, text)
VALUES (@owner_uuid, @room_uuid, @text)
RETURNING owner_uuid, text;

-- name: GetP2PMessagesByRoomUUID :many
SELECT owner_uuid, text FROM p2p_messages
WHERE room_uuid = @room_uuid;
