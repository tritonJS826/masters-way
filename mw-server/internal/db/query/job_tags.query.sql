-- name: CreateJobTag :one
INSERT INTO job_tags(
    name,
    description,
    color,
    way_uuid
) VALUES (
    @name,
    @description,
    @color,
    @way_uuid
) RETURNING *;

-- name: GetListJobTagsByWayUuid :many
SELECT * FROM job_tags
WHERE way_uuid = @way_uuid
ORDER BY uuid;

-- name: GetLabelsByIDs :many
SELECT * from job_tags
WHERE job_tags.uuid = ANY(@job_tag_uuids::UUID[])
ORDER BY uuid;

-- name: GetListJobTagsByWayUuids :many
SELECT * FROM job_tags
WHERE way_uuid = ANY(@way_uuids::UUID[]);

-- name: GetJobTagByUuid :one
SELECT * FROM job_tags
WHERE job_tags.uuid = @job_tag_uuid;

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
WHERE uuid = @job_tag_uuid;
