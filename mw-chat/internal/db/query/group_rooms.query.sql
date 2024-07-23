-- name: CreateGroupRoom :one
INSERT INTO group_rooms(name, created_at)
VALUES (@name, @created_at)
RETURNING uuid, name, is_blocked;

-- name: GetGroupRoomsByUserUUID :many
SELECT
    group_rooms.uuid,
    group_rooms.name,
    group_rooms.is_blocked,
    (SELECT user_uuid
     FROM users_group_rooms
     WHERE room_uuid = group_rooms.uuid AND users_group_rooms.user_uuid <> @user_uuid
     LIMIT 1
    ) AS first_user_uuid
FROM group_rooms
JOIN users_group_rooms ON group_rooms.uuid = users_group_rooms.room_uuid
WHERE users_group_rooms.user_uuid = @user_uuid;

-- name: GetGroupRoomByUUID :one
SELECT
    group_rooms.uuid,
    group_rooms.name,
    group_rooms.is_blocked,
    (SELECT user_uuid
     FROM users_group_rooms
     WHERE room_uuid = group_rooms.uuid AND users_group_rooms.user_uuid <> @user_uuid
     LIMIT 1
    ) AS first_user_uuid
FROM group_rooms
WHERE group_rooms.uuid = @room_uuid;

-- name: ToggleBlockGroupRoom :exec
UPDATE group_rooms
SET is_blocked = @is_blocked
FROM users_group_rooms
WHERE group_rooms.uuid = users_group_rooms.room_uuid
    AND users_group_rooms.user_uuid = @user_uuid
    AND users_group_rooms.role = 'admin'
    AND group_rooms.uuid = @room_uuid;
