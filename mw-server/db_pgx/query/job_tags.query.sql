-- name: GetJobTagByUuid :one
SELECT * FROM job_tags
WHERE job_tags.uuid = @job_tags_uuid;

-- name: GetListJobTagsByWayUuid :many
SELECT * FROM job_tags
WHERE way_uuid = @way_uuid
ORDER BY uuid;
