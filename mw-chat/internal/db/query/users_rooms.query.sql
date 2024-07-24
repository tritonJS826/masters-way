
-- name: AddUserToRoom :exec
INSERT INTO users_rooms(user_uuid, room_uuid, user_role, joined_at, is_room_blocked)
VALUES (@user_uuid, @room_uuid, @role, @joined_at, @is_room_blocked);