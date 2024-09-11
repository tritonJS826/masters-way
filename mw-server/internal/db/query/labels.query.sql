-- name: CreateLabel :one
INSERT INTO labels(
    name,
    description,
    color,
    way_uuid
) VALUES (
             @name,
             @description,
             @color,
             @way_uuid
         ) RETURNING *;

-- name: GetListLabelsByWayUuid :many
SELECT * FROM labels
WHERE way_uuid = @way_uuid
ORDER BY uuid;

-- name: GetListLabelsByLabelUuids :many
SELECT * FROM labels
WHERE labels.uuid = ANY(@label_uuids::UUID[])
ORDER BY uuid;

-- name: GetListLabelsByWayUuids :many
SELECT * FROM labels
WHERE way_uuid = ANY(@way_uuids::UUID[]);

-- name: GetLabelByUuid :one
SELECT * FROM labels
WHERE labels.uuid = @label_uuid;

-- name: UpdateLabel :one
UPDATE labels
SET
    name = coalesce(sqlc.narg('name'), name),
    description = coalesce(sqlc.narg('description'), description),
    color = coalesce(sqlc.narg('color'), color)
WHERE uuid = sqlc.arg('uuid')
    RETURNING *;

-- name: DeleteLabelById :exec
DELETE FROM labels
WHERE uuid = @label_uuid;