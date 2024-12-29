-- name: GetPracticeMaterialsByTopicId :many
SELECT * FROM practice_materials
WHERE practice_materials.topic_uuid = @topic_uuid;

-- name: CreatePracticeMaterialInTopic :one
INSERT INTO practice_materials(
    topic_uuid,
    name,
    practice_material_order,
    task_description,
    answer,
    practice_type,
    time_to_answer
) VALUES (
    @topic_uuid,
    @name,
    @practice_material_order,
    @task_description,
    @answer,
    @practice_type,
    @time_to_answer
) RETURNING *;

-- name: UpdatePracticeMaterial :one
UPDATE practice_materials
SET
    name = coalesce(sqlc.narg('name'), name),
    practice_material_order = coalesce(sqlc.narg('practice_material_order'), practice_material_order),
    task_description = coalesce(sqlc.narg('task_description'), task_description),
    answer = coalesce(sqlc.narg('answer'), answer),
    practice_type = coalesce(sqlc.narg('practice_type'), practice_type),
    time_to_answer = coalesce(sqlc.narg('time_to_answer'), time_to_answer),
    updated_at = CURRENT_TIMESTAMP
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeletePracticeMaterial :one
DELETE FROM practice_materials
WHERE uuid = @practice_material_uuid
RETURNING *;
