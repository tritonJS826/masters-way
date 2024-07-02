-- name: GetListDayReportsByWayUuid :many
SELECT * FROM day_reports
WHERE day_reports.way_uuid = @way_uuid
ORDER BY day_reports.created_at DESC;
