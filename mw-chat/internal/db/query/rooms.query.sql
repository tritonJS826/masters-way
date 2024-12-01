-- name: CreateRoom :one
INSERT INTO rooms (created_at, name, type)
VALUES (@created_at, @name, @type)
RETURNING uuid, name, type;

-- name: GetPrivateRoomByUserUUIDs :one
SELECT rooms.uuid
FROM rooms
	JOIN users_rooms AS user1 on user1.room_uuid = rooms.uuid
		and user1.user_uuid = @user_1
	JOIN users_rooms AS user2 on user2.room_uuid = rooms.uuid
		and user2.user_uuid = @user_2
WHERE rooms.type = 'private';

-- name: GetRoomsByUserUUID :many
SELECT
    rooms.uuid,
    rooms.name,
    rooms.type,
    users_rooms.is_room_blocked,
    ARRAY(
        SELECT
            users_rooms.user_uuid
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY joined_at DESC
    )::UUID[] AS user_uuids,
    ARRAY(
        SELECT
            users_rooms.user_role
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY joined_at DESC
    )::VARCHAR[] AS user_roles
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE users_rooms.user_uuid = @user_uuid AND rooms.type = @room_type
ORDER BY (SELECT MAX(messages.created_at) FROM messages WHERE messages.room_uuid = rooms.uuid) DESC;

-- name: GetRoomByUUID :one
SELECT
    rooms.uuid,
    rooms.name,
    rooms.type,
    users_rooms.is_room_blocked,
    ARRAY(
        SELECT
            users_rooms.user_uuid
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY joined_at DESC
    )::UUID[] AS user_uuids,
    ARRAY(
        SELECT
            users_rooms.user_role
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY joined_at DESC
    )::VARCHAR[] AS user_roles
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE rooms.uuid = @room_uuid AND users_rooms.user_uuid = @user_uuid;
