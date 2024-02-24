-- name: CreateMentorUserWay :one
INSERT INTO mentor_users_ways(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteMentorUserWayByIds :exec
DELETE FROM mentor_users_ways
WHERE user_uuid = $1 AND way_uuid = $2;

-- name: GetMentorUsersByWayId :many
SELECT 
    users.*
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = mentor_users_ways.user_uuid
WHERE way_uuid = $1;