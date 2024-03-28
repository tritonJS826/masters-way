-- name: CreateJobDonesJobTag :one
INSERT INTO job_dones_job_tags(
    job_done_uuid,
    job_tag_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetJobDonesJoinJobTags :many
SELECT * FROM job_dones
JOIN job_dones_job_tags ON job_dones.uuid = job_dones_job_tags.job_done_uuid
JOIN job_tags ON job_dones_job_tags.job_tag_uuid = job_tags.uuid
WHERE job_dones.uuid IN (
    -- job dones uuids for day report 
    SELECT job_dones.uuid FROM job_dones 
    WHERE job_dones.day_report_uuid = $1
);

-- name: GetJobDonesByDayReportUuids :many
SELECT * FROM job_dones WHERE job_dones.day_report_uuid = ANY($1::UUID[]);

-- name: DeleteJobDonesJobTagByJobDoneId :exec
DELETE FROM job_dones_job_tags
WHERE job_done_uuid = $1 
AND job_tag_uuid = $2;