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

-- name: GetWayCollectionJoinWayByUserId :many
SELECT 
    way_collections.uuid AS collection_uuid,
    way_collections.created_at AS collection_created_at,
    way_collections.updated_at AS collection_updated_at,
    way_collections.name AS collection_name,
    ways.uuid AS way_uuid,
    ways.name AS way_name,
    ways.goal_description as way_description,
    ways.updated_at as way_updated_at,
    ways.created_at as way_created_at,
    ways.estimation_time as way_estimation_time,
    ways.owner_uuid as way_owner_uuid,
    ways.copied_from_way_uuid as way_copied_from_way_uuid,
    ways.status as way_status,
    ways.is_private as way_is_private
FROM users
JOIN way_collections ON $1 = way_collections.owner_uuid
JOIN way_collections_ways ON way_collections.uuid = way_collections_ways.way_collections_uuid
JOIN ways ON way_collections_ways.way_uuid = ways.uuid;