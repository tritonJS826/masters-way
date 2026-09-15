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
        ORDER BY updated_at DESC
    )::UUID[] AS user_uuids,
    ARRAY(
        SELECT
            users_rooms.user_role
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY updated_at DESC
    )::VARCHAR[] AS user_roles,
    COALESCE((
        SELECT COUNT(*)
        FROM messages
        LEFT JOIN message_status ON message_status.message_uuid = messages.uuid
        WHERE message_status.is_read = false
        AND messages.owner_uuid <> @user_uuid
        AND messages.room_uuid = rooms.uuid), 0
    )::INTEGER AS unread_message_count,
    (SELECT MAX(messages.created_at)
     FROM messages
     WHERE messages.room_uuid = rooms.uuid) AS last_message_date
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE users_rooms.user_uuid = @user_uuid AND rooms.type = @room_type
ORDER BY last_message_date DESC;

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
        ORDER BY updated_at DESC
    )::UUID[] AS user_uuids,
    ARRAY(
        SELECT
            users_rooms.user_role
        FROM users_rooms
        WHERE users_rooms.room_uuid = rooms.uuid
        ORDER BY updated_at DESC
    )::VARCHAR[] AS user_roles,
    COALESCE((
        SELECT COUNT(*)
        FROM messages
        LEFT JOIN message_status ON message_status.message_uuid = messages.uuid
        WHERE message_status.is_read = false
        AND messages.owner_uuid <> @user_uuid
        AND messages.room_uuid = rooms.uuid), 0
    )::INTEGER AS unread_message_count
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE rooms.uuid = @room_uuid;
