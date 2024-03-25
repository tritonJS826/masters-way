-- name: CreateJobTag :one
INSERT INTO job_tags(
    name,
    description,
    color,
    way_uuid
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: GetListJobTagsByWayUuid :many
SELECT * FROM job_tags
WHERE way_uuid = $1
ORDER BY uuid;

-- name: GetJobTagByUuid :one
SELECT * FROM job_tags
WHERE job_tags.uuid = $1;

-- name: UpdateJobTag :one
UPDATE job_tags
SET
name = coalesce(sqlc.narg('name'), name),
description = coalesce(sqlc.narg('description'), description),
color = coalesce(sqlc.narg('color'), color)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;


-- name: DeleteJobTagById :exec
DELETE FROM job_tags
WHERE uuid = $1;