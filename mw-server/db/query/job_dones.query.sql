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

-- name: GetIsUserHavingPermissionsForJobDone :one
SELECT
    ways.uuid as way_uuid,
    ways.name as way_name,
    EXISTS (
        SELECT 1
        FROM mentor_users_ways
        WHERE mentor_users_ways.way_uuid = ways.uuid
        AND mentor_users_ways.user_uuid = @user_uuid
    ) OR ways.owner_uuid = @user_uuid AS is_permission_given
FROM ways
INNER JOIN day_reports ON ways.uuid = day_reports.way_uuid
INNER JOIN job_dones ON job_dones.day_report_uuid = day_reports.uuid
WHERE job_dones.uuid = @job_dones_uuid;
