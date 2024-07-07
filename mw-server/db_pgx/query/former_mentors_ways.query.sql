-- name: GetFormerMentorUsersByWayId :many
SELECT users.* from ways
JOIN former_mentors_ways ON former_mentors_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = former_mentors_ways.former_mentor_uuid
WHERE ways.uuid = @way_uuid;
