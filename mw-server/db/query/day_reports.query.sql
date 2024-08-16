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

-- name: GetDayReportsByRankRange :many
WITH ranked_reports AS (
    SELECT
        dense_rank() OVER (ORDER BY day_reports.created_at ASC) AS rank,
        day_reports.*,
        ways.name AS way_name
    FROM day_reports
	INNER JOIN ways ON day_reports.way_uuid = ways.uuid
    WHERE ways.uuid = ANY (@way_uuids::UUID[])
),
max_rank_cte AS (
    SELECT
        COALESCE(MAX(rank), 0)::INTEGER AS max_rank
    FROM ranked_reports
)
SELECT ranked_reports.*, max_rank_cte.max_rank
FROM ranked_reports, max_rank_cte
WHERE rank BETWEEN (@start_rank_range::INTEGER) AND (@end_rank_range::INTEGER)
ORDER BY rank;
