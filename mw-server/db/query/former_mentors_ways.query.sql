-- name: CreateFormerMentorsWay :one
INSERT INTO former_mentors_ways(
    former_mentor_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetFormerMentorUsersByWayId :many
SELECT users.* from ways
JOIN former_mentors_ways ON former_mentors_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = former_mentors_ways.user_uuid
WHERE way_uuid = $1;