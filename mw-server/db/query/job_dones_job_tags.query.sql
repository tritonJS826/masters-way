-- name: CreateJobDonesJobTag :one
INSERT INTO job_dones_job_tags(
    job_done_uuid,
    job_tag_uuid
) VALUES (
    @job_done_uuid, @job_tag_uuid
) RETURNING *;

-- name: GetJobDonesByDayReportUuids :many
SELECT
    job_dones.*,
    COALESCE(
    ARRAY(
        SELECT job_dones_job_tags.job_tag_uuid
        FROM job_dones_job_tags
        WHERE job_dones.uuid = job_dones_job_tags.job_done_uuid
    ),
    '{}'
)::VARCHAR[] AS tag_uuids
FROM job_dones
WHERE job_dones.day_report_uuid = ANY(@day_report_uuids::UUID[]);

-- name: DeleteJobDonesJobTagByJobDoneId :exec
DELETE FROM job_dones_job_tags
WHERE job_done_uuid = @job_done_uuid
AND job_tag_uuid = @job_tag_uuid;
