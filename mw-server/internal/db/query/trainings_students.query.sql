-- name: CreateTrainingStudent :one
INSERT INTO trainings_students(
    training_uuid,
    student_uuid
) VALUES (
    @training_uuid,
    @student_uuid
) RETURNING *;

-- name: DeleteTrainingStudentByIds :exec
DELETE FROM trainings_students
WHERE student_uuid = @student_uuid AND training_uuid = @training_uuid;

