-- name: AddWayToCompositeWay :one
INSERT INTO composite_ways(
    child_uuid,
    parent_uuid
) VALUES (
    @child_uuid,
    @parent_uuid
) RETURNING *;

-- name: DeleteWayFromCompositeWay :exec
DELETE FROM composite_ways
WHERE composite_ways.child_uuid = @child_uuid  AND composite_ways.parent_uuid = @parent_uuid ;
