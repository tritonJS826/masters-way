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
description = coalesce(sqlc.narg('description'), description),
time = coalesce(sqlc.narg('time'), time),
is_done = coalesce(sqlc.narg('is_done'), is_done)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeletePlan :exec
DELETE FROM plans
WHERE uuid = $1;