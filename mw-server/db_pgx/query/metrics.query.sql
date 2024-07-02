-- name: GetListMetricsByWayUuid :many
SELECT * FROM metrics
WHERE metrics.way_uuid = @way_uuid
ORDER BY created_at;
