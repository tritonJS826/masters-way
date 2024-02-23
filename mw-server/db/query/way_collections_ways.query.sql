-- name: CreateWayCollectionsWays :one
INSERT INTO way_collections_ways(
    way_collections_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteWayCollectionsWaysByIds :exec
DELETE FROM way_collections_ways
WHERE way_collections_uuid = $1 AND way_uuid = $2;