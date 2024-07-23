-- name: CreateP2PRoom :one
INSERT INTO p2p_rooms (created_at)
VALUES (@created_at)
RETURNING uuid, blocked_by_user_uuid;

-- name: GetP2PRoomsWithInterlocutorByUserUUID :many
SELECT
    p2p_rooms.uuid,
    p2p_rooms.blocked_by_user_uuid,
    (SELECT user_uuid
     FROM users_p2p_rooms
     WHERE room_uuid = p2p_rooms.uuid AND users_p2p_rooms.user_uuid <> @user_uuid
    ) AS interlocutor
FROM p2p_rooms
JOIN users_p2p_rooms ON p2p_rooms.uuid = users_p2p_rooms.room_uuid
WHERE users_p2p_rooms.user_uuid = @user_uuid;

-- name: GetP2PRoomByUUID :one
SELECT * FROM p2p_rooms
WHERE uuid = @p2p_room_uuid;

-- name: ToggleBlockP2PRoom :exec
UPDATE p2p_rooms
SET blocked_by_user_uuid = CASE
    WHEN @user_uuid IS NOT NULL THEN @user_uuid
    ELSE NULL
END
WHERE uuid = @room_uuid;
