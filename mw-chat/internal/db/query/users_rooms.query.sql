-- name: AddUserToRoom :one
INSERT INTO users_rooms(user_uuid, room_uuid, user_role, joined_at)
VALUES (@user_uuid, @room_uuid, @user_role, @joined_at)
RETURNING user_uuid, user_role;
