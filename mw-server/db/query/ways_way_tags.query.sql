-- name: CreateWaysWayTag :one
INSERT INTO ways_way_tags(
    way_uuid,
    way_tag_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteWayTagFromWay :exec
DELETE FROM ways_way_tags
WHERE ways_way_tags.way_uuid = $1 AND ways_way_tags.way_tag_uuid = $2;