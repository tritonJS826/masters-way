-- name: CreateJobDonesLabel :one
INSERT INTO job_dones_labels(
    job_done_uuid,
    label_uuid
) VALUES (
             @job_done_uuid, @label_uuid
         ) RETURNING *;

-- name: GetJobDonesByDayReportUuids :many
SELECT
    job_dones.*,
    COALESCE(
            ARRAY(
                SELECT job_dones_labels.label_uuid
        FROM job_dones_labels
        WHERE job_dones.uuid = job_dones_labels.job_done_uuid
    ),
            '{}'
    )::VARCHAR[] AS label_uuids
FROM job_dones
WHERE job_dones.day_report_uuid = ANY(@day_report_uuids::UUID[]);

-- name: DeleteJobDonesLabelByJobDoneId :exec
DELETE FROM job_dones_labels
WHERE job_done_uuid = @job_done_uuid
  AND label_uuid = @label_uuid;