-- name: GetP2PRooms :many
SELECT * FROM p2p_rooms
WHERE user_1_uuid = @user_uuid OR user_2_uuid = @user_uuid;

-- name: CreateP2PRoom :one
INSERT INTO p2p_rooms (user_1_uuid, user_2_uuid, created_at, is_blocked)
VALUES (@user_1_uuid, @user_2_uuid, CURRENT_TIMESTAMP, false)
RETURNING *;

-- name: UpdateP2PRoomsIsBlocked :one
UPDATE p2p_rooms
SET is_blocked = @is_blocked
WHERE uuid = @p2p_room_uuid
RETURNING *;
