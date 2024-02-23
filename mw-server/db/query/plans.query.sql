-- name: CreatePlan :one
INSERT INTO plans(
    created_at,
    updated_at,
    job,
    estimation_time,
    owner_uuid,
    is_done,
    day_report_uuid
) VALUES (
    $1, $2, $3, $4, $5, $6, $7
) RETURNING *;

-- name: GetListPlansByDayReportId :many
SELECT * FROM plans
WHERE plans.day_report_uuid = $1
ORDER BY created_at;

-- name: UpdatePlan :one
UPDATE plans
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
job = coalesce(sqlc.narg('job'), job),
estimation_time = coalesce(sqlc.narg('estimation_time'), estimation_time),
is_done = coalesce(sqlc.narg('is_done'), is_done)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeletePlan :exec
DELETE FROM plans
WHERE uuid = $1;