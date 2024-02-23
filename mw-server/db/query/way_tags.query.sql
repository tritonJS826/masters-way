-- name: CreateWayTag :one
INSERT INTO way_tags(
    name,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetListWayTagsByWayId :many
SELECT * FROM way_tags
WHERE way_tags.way_uuid = $1
ORDER BY uuid;


-- name: UpdateWayTag :one
UPDATE way_tags
SET
name = coalesce(sqlc.narg('name'), name)

WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteWayTag :exec
DELETE FROM way_tags
WHERE uuid = $1;