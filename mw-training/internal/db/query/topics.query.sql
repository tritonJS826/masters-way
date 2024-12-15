-- name: GetTopicsByTrainingId :many
SELECT * FROM topics
WHERE topics.training_uuid = @training_uuid;

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
