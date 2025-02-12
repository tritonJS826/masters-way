-- name: CreateTrainingMentor :one
INSERT INTO trainings_mentors(
    training_uuid,
    mentor_uuid
) VALUES (
    @training_uuid,
    @mentor_uuid
) RETURNING *;

-- name: DeleteTrainingMentorByIds :exec
DELETE FROM trainings_mentors
WHERE mentor_uuid = @mentor_uuid AND training_uuid = @training_uuid;

