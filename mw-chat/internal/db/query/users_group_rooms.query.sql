-- name: AddUserToGroupRoom :exec
INSERT INTO users_group_rooms(user_uuid, room_uuid, role, joined_at)
VALUES (@user_uuid, @room_uuid, @role, @joined_at);
