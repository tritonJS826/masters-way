-- name: CreateMentorUserWay :one
INSERT INTO mentor_users_ways(
    user_uuid,
    way_uuid
) VALUES (
    @user_uuid,
    @way_uuid
) RETURNING *;

-- name: DeleteMentorUserWayByIds :exec
DELETE FROM mentor_users_ways
WHERE user_uuid = @user_uuid AND way_uuid = @way_uuid;

-- name: GetMentorUsersByWayId :many
SELECT
    users.*
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = mentor_users_ways.user_uuid
WHERE way_uuid = @way_uuid;

-- name: GetMentorUsersByWayIds :many
SELECT
    users.*,
    ways.uuid AS way_uuid
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = mentor_users_ways.user_uuid
WHERE way_uuid = ANY(@way_uuids::UUID[]);

-- name: GetMentoringWaysCountByUserId :one
SELECT COUNT(*) AS mentoring_ways_count
FROM mentor_users_ways
WHERE user_uuid = @user_uuid;
