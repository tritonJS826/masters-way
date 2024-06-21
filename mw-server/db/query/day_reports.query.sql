-- name: CreateDayReport :one
INSERT INTO day_reports(
    way_uuid,
    created_at,
    updated_at,
    is_day_off
) VALUES (
    $1, $2, $3, $4
) RETURNING *;

-- name: GetListDayReportsByWayUuid :many
SELECT * FROM day_reports
WHERE day_reports.way_uuid = $1
ORDER BY day_reports.created_at DESC;

-- name: GetDayReportsCountByWayId :one
SELECT
    COUNT(*) AS day_reports_count
FROM day_reports
WHERE way_uuid = @way_uuid;

-- name: UpdateDayReport :one
UPDATE day_reports
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
is_day_off = coalesce(sqlc.narg('is_day_off'), is_day_off)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;
