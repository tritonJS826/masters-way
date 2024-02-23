-- name: CreateFormerMentorsWay :one
INSERT INTO former_mentors_ways(
    former_mentor_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;