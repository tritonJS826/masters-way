-- name: CreateTrainingTrainingTag :one
INSERT INTO trainings_training_tags(
    training_uuid,
    tag_uuid
) VALUES (
    @training_uuid,
    @tag_uuid
) RETURNING *;

-- name: DeleteTrainingsTrainingTag :exec
DELETE FROM trainings_training_tags
WHERE 
    trainings_training_tags.training_uuid = @training_uuid 
    AND 
    trainings_training_tags.tag_uuid IN (
        SELECT training_tags.uuid 
        FROM training_tags 
        WHERE training_tags.name = @tag_name
    );
