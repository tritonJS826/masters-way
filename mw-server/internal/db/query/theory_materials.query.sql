-- name: GetTheoryMaterialsByTopicId :many
SELECT * FROM theory_materials
WHERE theory_materials.topic_uuid = @topic_uuid
ORDER BY created_at;

-- name: CreateTheoryMaterialInTopic :one
INSERT INTO theory_materials(
    name,
    description,
    topic_uuid
) VALUES (
    @name,
    @description,
    @topic_uuid
) RETURNING *;

-- name: UpdateTheoryMaterial :one
UPDATE theory_materials
SET
    name = coalesce(sqlc.narg('name'), name),
    description = coalesce(sqlc.narg('description'), description),
    updated_at = CURRENT_TIMESTAMP
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteTheoryMaterial :one
DELETE FROM theory_materials
WHERE uuid = @theory_material_uuid
RETURNING *;
