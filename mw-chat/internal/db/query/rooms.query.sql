-- name: CreateRoom :one
INSERT INTO rooms (created_at, name, type)
VALUES (@created_at, @name, @type)
RETURNING uuid;

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
                users_rooms.role
            FROM users_rooms
            WHERE users_rooms.room_uuid = rooms.uuid
    )::VARCHAR[] AS user_roles
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE users_rooms.user_uuid = @user_uuid AND rooms.type = @room_type;

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
                users_rooms.role
            FROM users_rooms
            WHERE users_rooms.room_uuid = rooms.uuid
    )::VARCHAR[] AS user_roles
FROM rooms
JOIN users_rooms ON rooms.uuid = users_rooms.room_uuid
WHERE rooms.uuid = @room_uuid AND users_rooms.user_uuid = @user_uuid;
