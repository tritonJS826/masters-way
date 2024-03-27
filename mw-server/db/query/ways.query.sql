-- name: CreateWay :one
INSERT INTO ways(
    name,
    goal_description,
    updated_at,
    created_at,
    estimation_time,
    copied_from_way_uuid,
    is_private,
    is_completed,
    owner_uuid
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
) RETURNING *;


-- name: GetWayById :one
SELECT 
    ways.uuid,
    ways.name,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    users.uuid AS owner_uuid,
    users.name AS owner_name,
    users.email AS owner_email,
    users.description AS owner_description,
    users.created_at AS owner_created_at,
    users.image_url AS owner_image_url,
    users.is_mentor AS owner_is_mentor
FROM ways
JOIN users ON users.uuid = ways.owner_uuid
WHERE ways.uuid = $1
LIMIT 1;


-- AND ($2 IS NULL OR age = $2)

-- TODO: add filter and sorters
-- name: ListWays :many
SELECT 
    *,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount
FROM ways
WHERE ($3 = 'inProgress' AND ways.is_completed = false)
    OR ($3 = 'completed' AND ways.is_completed = true)
    OR ($3 = 'abandoned' AND ways.is_completed = false AND ways.updated_at < $4::timestamp - interval '14 days') 
    OR ($3 = 'all')
ORDER BY created_at
LIMIT $1
OFFSET $2;

-- name: CountWaysByType :one
SELECT COUNT(*) FROM ways
WHERE ($1 = 'inProgress' AND ways.is_completed = false)
    OR ($1 = 'completed' AND ways.is_completed = true)
    OR ($1 = 'abandoned' AND ways.is_completed = false AND ways.updated_at < $2::timestamp - interval '14 days') 
    OR ($1 = 'all');

-- name: UpdateWay :one
UPDATE ways
SET
name = coalesce(sqlc.narg('name'), name),
goal_description = coalesce(sqlc.narg('goal_description'), goal_description),
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
estimation_time = coalesce(sqlc.narg('estimation_time'), estimation_time),
is_private = coalesce(sqlc.narg('is_private'), is_private),
is_completed = coalesce(sqlc.narg('is_completed'), is_completed)

WHERE ways.uuid = sqlc.arg('uuid')
RETURNING *,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = sqlc.arg('uuid')) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = sqlc.arg('uuid') AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = sqlc.arg('uuid')) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = sqlc.arg('uuid')) AS way_day_reports_amount;

-- name: DeleteWay :exec
DELETE FROM ways
WHERE uuid = $1;