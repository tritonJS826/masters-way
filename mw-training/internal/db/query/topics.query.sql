-- name: GetTopicsByTrainingId :many
SELECT 
    topics.*, 
    COUNT(theory_materials.uuid) AS theory_materials_amount,
    COUNT(practice_materials.uuid) AS practice_materials_amount
FROM 
    topics
LEFT JOIN 
    theory_materials ON topics.uuid = theory_materials.topic_uuid
LEFT JOIN 
    practice_materials ON topics.uuid = practice_materials.topic_uuid
WHERE 
    topics.training_uuid = @training_uuid
GROUP BY 
    topics.uuid;


-- name: GetTopicByUuid :one
SELECT 
    topics.*, 
    COUNT(theory_materials.uuid) AS theory_materials_amount,
    COUNT(practice_materials.uuid) AS practice_materials_amount
FROM
    topics
LEFT JOIN
    theory_materials ON topics.uuid = theory_materials.topic_uuid
LEFT JOIN
    practice_materials ON topics.uuid = practice_materials.topic_uuid
WHERE
    topics.uuid = @topic_uuid
GROUP BY
    topics.uuid;

-- name: CreateTopicInTraining :one
INSERT INTO topics(
    name,
    training_uuid,
    topic_order,
    parent
) VALUES (
    @name,
    @training_uuid,
    @topic_order,
    @parent
) RETURNING *;

-- name: UpdateTopic :one
UPDATE topics
SET
    name = coalesce(sqlc.narg('name'), name),
    topic_order = coalesce(sqlc.narg('topic_order'), topic_order),
    parent = coalesce(sqlc.narg('parent'), parent)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteTopic :one
DELETE FROM topics
WHERE uuid = @topic_uuid
RETURNING *;
