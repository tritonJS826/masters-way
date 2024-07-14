-- name: CreateJobDone :one
INSERT INTO job_dones(
    created_at,
    updated_at,
    description,
    time,
    owner_uuid,
    day_report_uuid
) VALUES (
    @created_at, @updated_at, @description, @time, @owner_uuid, @day_report_uuid
) RETURNING *,
    (SELECT name FROM users WHERE uuid = @owner_uuid) AS owner_name,
    -- get tag uuids
    COALESCE(
        ARRAY(
            SELECT job_dones_job_tags.job_tag_uuid
            FROM job_dones_job_tags
            WHERE job_dones.uuid = job_dones_job_tags.job_done_uuid
        ),
    '{}'
    )::VARCHAR[] AS tag_uuids;

-- name: GetListJobsDoneByDayReportId :many
SELECT * FROM job_dones
WHERE job_dones.day_report_uuid = @day_report_uuid
ORDER BY created_at;

-- name: UpdateJobDone :one
UPDATE job_dones
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description),
time = coalesce(sqlc.narg('time'), time)
WHERE job_dones.uuid = sqlc.arg('uuid')
RETURNING *,
    (SELECT name FROM users WHERE job_dones.owner_uuid = users.uuid) AS owner_name,
    -- get tag uuids
    COALESCE(
        ARRAY(
            SELECT job_dones_job_tags.job_tag_uuid
            FROM job_dones_job_tags
            WHERE job_dones.uuid = job_dones_job_tags.job_done_uuid
        ),
    '{}'
    )::VARCHAR[] AS tag_uuids;

-- name: DeleteJobDone :exec
DELETE FROM job_dones
WHERE uuid = @job_done_uuid;
