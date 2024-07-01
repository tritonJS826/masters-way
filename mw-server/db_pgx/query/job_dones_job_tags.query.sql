-- name: CreateJobDonesJobTag :one
INSERT INTO job_dones_job_tags(
    job_done_uuid,
    job_tag_uuid
) VALUES (
    @job_done_uuid, @job_tag_uuid
) RETURNING *;
