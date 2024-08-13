-- name: CreateDayReport :one
INSERT INTO day_reports(
    way_uuid,
    created_at,
    updated_at,
    is_day_off
) VALUES (
    @way_uuid, @created_at, @updated_at, @is_day_off
) RETURNING *;

-- name: GetListDayReportsByWayUuid :many
SELECT *
FROM day_reports
WHERE day_reports.way_uuid = @way_uuid
ORDER BY day_reports.created_at DESC
LIMIT @request_limit
OFFSET @request_offset;

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
