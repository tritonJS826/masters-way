-- name: CreateRoom :one
INSERT INTO rooms (created_at, name, type)
VALUES (@created_at, @name, @type)
RETURNING uuid, name, type;

-- name: GetIsPrivateRoomAlreadyExists :one
SELECT EXISTS (
    SELECT 1
    FROM (
        SELECT DISTINCT room_uuid
        FROM users_rooms
        WHERE users_rooms.user_uuid = @user_1
    ) AS user1_rooms
    JOIN (
        SELECT DISTINCT room_uuid
        FROM users_rooms
        WHERE users_rooms.user_uuid = @user_2
    ) AS user2_rooms ON user1_rooms.room_uuid = user2_rooms.room_uuid
    JOIN rooms ON rooms.uuid = user1_rooms.room_uuid
    WHERE rooms.type = 'private'
) AS is_private_room_already_exists;

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
    )::UUID[] AS user_uuids,
    ARRAY(
            SELECT
                users_rooms.user_role
            FROM users_rooms
            WHERE users_rooms.room_uuid = rooms.uuid
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
    )::UUID[] AS user_uuids,
    ARRAY(
            SELECT
                users_rooms.user_role
            FROM users_rooms
            WHERE users_rooms.room_uuid = rooms.uuid
    )::VARCHAR[] AS user_roles
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE rooms.uuid = @room_uuid AND users_rooms.user_uuid = @user_uuid;
