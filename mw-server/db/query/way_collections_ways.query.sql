-- name: CreateWayCollectionsWays :one
INSERT INTO way_collections_ways(
    way_collection_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteWayCollectionsWaysByIds :exec
DELETE FROM way_collections_ways
WHERE way_collection_uuid = $1 AND way_uuid = $2;

-- name: GetWayCollectionJoinWayByUserId :many
SELECT 
    way_collections.uuid AS collection_uuid,
    way_collections.created_at AS collection_created_at,
    way_collections.updated_at AS collection_updated_at,
    way_collections.name AS collection_name,
    ways.uuid AS way_uuid,
    ways.name AS way_name,
    ways.goal_description AS way_description,
    ways.updated_at AS way_updated_at,
    ways.created_at AS way_created_at,
    ways.estimation_time AS way_estimation_time,
    ways.owner_uuid AS way_owner_uuid,
    ways.copied_from_way_uuid AS way_copied_from_way_uuid,
    ways.is_completed AS is_completed,
    ways.is_private AS way_is_private,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount
FROM users
JOIN way_collections ON $1 = way_collections.owner_uuid
JOIN way_collections_ways ON way_collections.uuid = way_collections_ways.way_collection_uuid
JOIN ways ON way_collections_ways.way_uuid = ways.uuid;
