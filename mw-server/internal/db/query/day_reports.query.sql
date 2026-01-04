-- name: CreateDayReport :one
INSERT INTO day_reports(
    way_uuid,
    created_at,
    updated_at
) VALUES (
    @way_uuid, @created_at, @updated_at
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

-- name: GetDayReportsByRankRange :many
WITH ranked_reports AS (
    SELECT
        dense_rank() OVER (ORDER BY date(day_reports.created_at) DESC) AS rank,
        day_reports.uuid, day_reports.way_uuid, day_reports.created_at, day_reports.updated_at,
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
SELECT ranked_reports.rank, ranked_reports.uuid, ranked_reports.way_uuid, ranked_reports.created_at, ranked_reports.updated_at, ranked_reports.way_name, max_rank_cte.max_rank
FROM ranked_reports, max_rank_cte
WHERE rank BETWEEN (@start_rank_range::INTEGER) AND (@end_rank_range::INTEGER)
ORDER BY rank;

-- name: GetIsUserHavingPermissionsForDayReport :one
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
WHERE day_reports.uuid = @day_report_uuid;

-- name: GetLast14DayReportsByWayUuid :many
SELECT uuid, way_uuid, created_at, updated_at
FROM day_reports
WHERE way_uuid = @way_uuid
ORDER BY created_at DESC
LIMIT 14;

-- name: GetTodayDayReportByWayUuid :one
SELECT uuid, way_uuid, created_at, updated_at
FROM day_reports
WHERE way_uuid = @way_uuid
AND DATE(created_at) = CURRENT_DATE
LIMIT 1;
