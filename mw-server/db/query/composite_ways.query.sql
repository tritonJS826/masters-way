-- name: AddWayToCompositeWay :one
INSERT INTO composite_ways(
    child_uuid,
    parent_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteWayFromCompositeWay :exec
DELETE FROM composite_ways
WHERE composite_ways.child_uuid = $1 AND composite_ways.parent_uuid = $2;
