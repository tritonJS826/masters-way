-- name: GetJobTagByUuid :one
SELECT * FROM job_tags
WHERE job_tags.uuid = @job_tags_uuid;
