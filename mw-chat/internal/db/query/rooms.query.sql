-- name: CreateRoom :one
INSERT INTO rooms (created_at, name, type)
VALUES (@created_at, @name, @type)
RETURNING uuid;

-- name: GetRoomsByUserUUID :many
SELECT
    rooms.uuid,
    rooms.type
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE users_rooms.user_uuid = @user_uuid AND rooms.type = @room_type;


