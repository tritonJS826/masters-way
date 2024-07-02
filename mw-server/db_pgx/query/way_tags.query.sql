-- name: GetListWayTagsByWayId :many
SELECT
    way_tags.uuid AS uuid,
    way_tags.name AS name
FROM way_tags
JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid
WHERE ways_way_tags.way_uuid = @way_uuid
ORDER BY name;
