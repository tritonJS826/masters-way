-- name: CreateMetric :one
INSERT INTO metrics(
    updated_at,
    description,
    is_done,
    done_date,
    metric_estimation,
    way_uuid
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: GetListMetricsByWayUuid :many
SELECT * FROM metrics
WHERE metrics.way_uuid = $1
ORDER BY updated_at;

-- name: UpdateMetric :one
UPDATE metrics
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description),
is_done = coalesce(sqlc.narg('is_done'), is_done),
done_date = coalesce(sqlc.narg('doneDate'), done_date),
metric_estimation = coalesce(sqlc.narg('metric_estimation'), metric_estimation)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteMetric :exec
DELETE FROM metrics
WHERE uuid = $1;