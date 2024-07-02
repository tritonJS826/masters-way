-- name: GetMentorUsersByWayId :many
SELECT
    users.*
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = mentor_users_ways.user_uuid
WHERE way_uuid = @way_uuid;
