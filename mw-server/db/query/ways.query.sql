-- name: CreateWay :one
INSERT INTO ways(
    name,
    goal_description,
    updated_at,
    created_at,
    estimation_time,
    copied_from_way_uuid,
    is_private,
    status,
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
    ways.status,
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


-- TODO: add filter and sorters
-- name: ListWays :many
SELECT * FROM ways
ORDER BY created_at
LIMIT $1
OFFSET $2;

-- name: UpdateWay :one
UPDATE ways
SET
name = coalesce(sqlc.narg('name'), name),
goal_description = coalesce(sqlc.narg('goal_description'), goal_description),
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
estimation_time = coalesce(sqlc.narg('estimation_time'), estimation_time),
is_private = coalesce(sqlc.narg('is_private'), is_private),
status = coalesce(sqlc.narg('status'), status)

WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteWay :exec
DELETE FROM ways
WHERE uuid = $1;