-- name: CreateMetric :one
INSERT INTO metrics(
    updated_at,
    description,
    is_done,
    done_date,
    metric_estimation,
    way_uuid,
    parent_uuid
) VALUES (
    @updated_at,
    @description,
    @is_done,
    @done_date,
    @metric_estimation,
    @way_uuid,
    @parent_uuid
) RETURNING *;

-- name: GetListMetricsByWayUuid :many
SELECT * FROM metrics
WHERE metrics.way_uuid = @way_uuid
ORDER BY created_at;

-- name: IsAllMetricsDone :one
SELECT COUNT(*) = 0 AS all_done
FROM metrics
WHERE way_uuid = @way_uuid
AND is_done = false;

-- name: UpdateMetric :one
UPDATE metrics
SET
    updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
    description = coalesce(sqlc.narg('description'), description),
    is_done = coalesce(sqlc.narg('is_done'), is_done),
    done_date = coalesce(sqlc.narg('done_date'), done_date),
    metric_estimation = coalesce(sqlc.narg('metric_estimation'), metric_estimation)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteMetric :one
DELETE FROM metrics
WHERE uuid = @metrics_uuid
RETURNING *;
