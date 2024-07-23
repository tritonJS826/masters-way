-- name: AddUserToP2PRoom :one
INSERT INTO users_p2p_rooms (user_uuid, room_uuid, joined_at)
VALUES (@user_uuid, @room_uuid, @joined_at)
RETURNING *;
