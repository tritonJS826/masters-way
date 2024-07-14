-- name: CreateWaysWayTag :one
INSERT INTO ways_way_tags(
    way_uuid,
    way_tag_uuid
) VALUES (
    @way_uuid,
    @way_tag_uuid
) RETURNING *;

-- name: DeleteWayTagFromWay :exec
DELETE FROM ways_way_tags
WHERE ways_way_tags.way_uuid = @way_uuid AND ways_way_tags.way_tag_uuid = @way_tag_uuid;
