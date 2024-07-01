-- name: GetJobTagByUuid :one
SELECT * FROM job_tags
WHERE job_tags.uuid = $1;
