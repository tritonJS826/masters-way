-- name: CreatePlan :one
INSERT INTO plans(
    created_at,
    updated_at,
    description,
    time,
    owner_uuid,
    is_done,
    day_report_uuid
) VALUES (
    @created_at,
    @updated_at,
    @description,
    @time,
    @owner_uuid,
    @is_done,
    @day_report_uuid
) RETURNING *,
    (SELECT name FROM users WHERE uuid = @owner_uuid) AS owner_name,
    -- get tag uuids
    COALESCE(
        ARRAY(
            SELECT plans_job_tags.job_tag_uuid
            FROM plans_job_tags
            WHERE plans.uuid = plans_job_tags.plan_uuid
        ),
        '{}'
    )::VARCHAR[] AS tag_uuids;



-- name: GetListPlansByDayReportId :many
SELECT * FROM plans
WHERE plans.day_report_uuid = @day_report_uuid
ORDER BY created_at;

-- name: UpdatePlan :one
UPDATE plans
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description),
time = coalesce(sqlc.narg('time'), time),
is_done = coalesce(sqlc.narg('is_done'), is_done)
WHERE plans.uuid = sqlc.arg('uuid')
RETURNING *,
    (SELECT name FROM users WHERE plans.owner_uuid = users.uuid) AS owner_name,
    -- get tag uuids
    COALESCE(
        ARRAY(
            SELECT plans_job_tags.job_tag_uuid
            FROM plans_job_tags
            WHERE plans.uuid = plans_job_tags.plan_uuid
        ),
        '{}'
    )::VARCHAR[] AS tag_uuids;

-- name: DeletePlan :exec
DELETE FROM plans
WHERE uuid = @plan_uuid;

-- name: GetIsUserHavingPermissionsForPlan :one
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
INNER JOIN plans ON plans.day_report_uuid = day_reports.uuid
WHERE plans.uuid = @plan_uuid;
