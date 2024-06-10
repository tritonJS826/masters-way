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
JOIN users ON users.uuid = former_mentors_ways.former_mentor_uuid
WHERE ways.uuid = @way_uuid;

-- name: DeleteFormerMentorWayIfExist :exec
DELETE FROM former_mentors_ways
WHERE former_mentors_ways.former_mentor_uuid = $1 
AND former_mentors_ways.way_uuid = $2
AND EXISTS (
    SELECT 1 FROM former_mentors_ways
    WHERE former_mentor_uuid = $1 
    AND way_uuid = $2
    LIMIT 1
);