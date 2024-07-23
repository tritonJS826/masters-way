-- name: CreateMessageInP2PRoom :one
INSERT INTO p2p_messages (owner_uuid, room_uuid, text)
VALUES (@owner_uuid, @room_uuid, @text)
RETURNING owner_uuid, text;

-- name: GetMessagesByP2PRoomUUID :many
SELECT * FROM p2p_messages
WHERE room_uuid = @p2p_room_uuid;
