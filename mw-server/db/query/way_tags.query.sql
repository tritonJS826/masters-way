-- name: CreateWayTag :one
INSERT INTO way_tags(
    name
) VALUES (
    @name
) RETURNING *;

-- name: GetWayTagByName :one
SELECT * FROM way_tags
WHERE way_tags.name = @way_tag_name;

-- name: GetListWayTagsByWayId :many
SELECT
    way_tags.uuid AS uuid,
    way_tags.name AS name
FROM way_tags
JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid
WHERE ways_way_tags.way_uuid = @way_uuid
ORDER BY name;

-- name: GetListWayTagsByWayIds :many
SELECT
    way_tags.uuid AS uuid,
    way_tags.name AS name,
    ways_way_tags.way_uuid
FROM way_tags
JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid
WHERE ways_way_tags.way_uuid = ANY(@way_uuids::UUID[])
ORDER BY name;
