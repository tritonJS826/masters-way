-- name: CreateTrainingTag :one
INSERT INTO training_tags(
    name
) VALUES (
    @name
) RETURNING *;

-- name: GetTrainingTagByName :one
SELECT * FROM training_tags
WHERE training_tags.name = @training_tag_name;

-- name: GetListTrainingTagsByTrainingId :many
SELECT
    training_tags.uuid,
    training_tags.name
FROM training_tags
JOIN trainings_training_tags 
    ON trainings_training_tags.training_tag_uuid = training_tags.uuid
WHERE trainings_training_tags.training_uuid = @training_uuid
ORDER BY training_tags.name;

-- name: GetListTrainingTagsByTrainingIds :many
SELECT
    training_tags.uuid AS uuid,
    training_tags.name AS name,
    trainings_training_tags.training_uuid
FROM training_tags
JOIN trainings_training_tags ON trainings_training_tags.training_tag_uuid = training_tags.uuid
WHERE trainings_training_tags.training_uuid = ANY(@training_uuids::UUID[])
ORDER BY name;
