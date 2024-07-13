-- name: CreateWayCollection :one
INSERT INTO way_collections(
    owner_uuid,
    created_at,
    updated_at,
    name,
    type
) VALUES (
    @owner_uuid, @created_at, @updated_at, @name, @type
) RETURNING *;

-- name: GetListWayCollectionsByUserId :many
SELECT * FROM way_collections
WHERE way_collections.owner_uuid = @owner_uuid
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
WHERE uuid = @way_collections_uuid;
