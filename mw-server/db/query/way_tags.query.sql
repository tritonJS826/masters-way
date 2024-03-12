-- name: CreateWayTag :one
INSERT INTO way_tags(
    name
) VALUES (
    $1
) RETURNING *;

-- name: GetWayTagByName :one
SELECT * FROM way_tags
WHERE way_tags.name = $1;

-- name: GetListWayTagsByWayId :many
SELECT 
    way_tags.uuid AS uuid,
    way_tags.name AS name
FROM way_tags
JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid  
WHERE ways_way_tags.way_uuid = $1
ORDER BY uuid;
