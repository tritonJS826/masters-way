-- name: CreateJobDone :one
WITH way_info AS (
    SELECT
        ways.uuid AS way_uuid,
        ways.name AS way_name
    FROM day_reports
        INNER JOIN ways ON ways.uuid = day_reports.way_uuid
    WHERE day_reports.uuid = @day_report_uuid
    ),
    owner_info AS (
        SELECT name AS owner_name
        FROM users
        WHERE uuid = @owner_uuid
    )
INSERT INTO job_dones(
    created_at,
    updated_at,
    description,
    time,
    owner_uuid,
    day_report_uuid
)
VALUES (
    @created_at, @updated_at, @description, @time, @owner_uuid, @day_report_uuid
)
RETURNING *,
    (SELECT way_uuid FROM way_info) AS way_uuid,
    (SELECT way_name FROM way_info) AS way_name,
    (SELECT owner_name FROM owner_info) AS owner_name,
    -- get label uuids
    COALESCE(
        ARRAY(
            SELECT job_dones_labels.label_uuid
            FROM job_dones_labels
            WHERE job_dones.uuid = job_dones_labels.job_done_uuid
        ),
    '{}'
    )::VARCHAR[] AS label_uuids;

-- name: GetListJobsDoneByDayReportId :many
SELECT * FROM job_dones
WHERE job_dones.day_report_uuid = @day_report_uuid
ORDER BY created_at;

-- name: UpdateJobDone :one
WITH way_info AS (
    SELECT
        ways.uuid AS way_uuid,
        ways.name AS way_name
    FROM day_reports
        INNER JOIN ways ON ways.uuid = day_reports.way_uuid
    WHERE day_reports.uuid = (
            SELECT day_report_uuid
            FROM job_dones
            WHERE uuid = @job_done_uuid
        )
    ),
         owner_info AS (
             SELECT name AS owner_name
             FROM users
             WHERE uuid = (SELECT owner_uuid FROM job_dones WHERE uuid = @job_done_uuid)
         )
UPDATE job_dones
SET
    updated_at = COALESCE(sqlc.narg('updated_at'), updated_at),
    description = COALESCE(sqlc.narg('description'), description),
    time = COALESCE(sqlc.narg('time'), time)
WHERE job_dones.uuid = @job_done_uuid
    RETURNING *,
    (SELECT way_uuid FROM way_info) AS way_uuid,
    (SELECT way_name FROM way_info) AS way_name,
    (SELECT owner_name FROM owner_info) AS owner_name,
    -- get label uuids
    COALESCE(
        ARRAY(
            SELECT job_dones_labels.label_uuid
            FROM job_dones_labels
            WHERE job_dones.uuid = job_dones_labels.job_done_uuid
        ),
    '{}'
    )::VARCHAR[] AS label_uuids;

-- name: DeleteJobDone :exec
DELETE FROM job_dones
WHERE uuid = @job_done_uuid;

-- name: GetIsUserHavingPermissionsForJobDone :one
SELECT
    ways.uuid as way_uuid,
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