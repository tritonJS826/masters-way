-- name: CreateJobDonesJobTag :one
INSERT INTO job_dones_job_tags(
    job_done_uuid,
    job_tag_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetJobDonesByDayReportUuids :many
SELECT 
    job_dones.*,
    ARRAY(
        SELECT job_dones_job_tags.job_tag_uuid 
        FROM job_dones_job_tags 
        WHERE job_dones.uuid = job_dones_job_tags.job_done_uuid
    )::VARCHAR[] AS tag_uuids
FROM job_dones WHERE job_dones.day_report_uuid = ANY($1::UUID[]);

-- name: DeleteJobDonesJobTagByJobDoneId :exec
DELETE FROM job_dones_job_tags
WHERE job_done_uuid = $1 
AND job_tag_uuid = $2;