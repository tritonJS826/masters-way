-- name: CreateWayCollection :one
INSERT INTO way_collections(
    owner_uuid,
    created_at,
    updated_at,
    name,
    type
) VALUES (
    $1, $2, $3, $4, $5
) RETURNING *;


-- name: GetListWayCollectionsByUserId :many
SELECT * FROM way_collections
WHERE way_collections.owner_uuid = $1
ORDER BY created_at;

-- name: GetWayCollectionsCountByUserId :one
SELECT COUNT(*) AS way_collections_count
FROM way_collections
WHERE owner_uuid = @user_uuid;

-- name: UpdateWayCollection :one
UPDATE way_collections
SET
name = coalesce(sqlc.narg('name'), name),
updated_at = coalesce(sqlc.narg('updated_at'), updated_at)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteWayCollection :exec
DELETE FROM way_collections
WHERE uuid = $1;
