-- name: CreateTraining :exec
INSERT INTO trainings (
    name,
    description,
    owner_uuid
) VALUES (
    @name,
    @description,
    @owner_uuid
);

-- name: UpdateTraining :exec
UPDATE trainings
SET 
    name = coalesce(sqlc.narg('name'), name),
    description = coalesce(sqlc.narg('description'), description),
    is_private = coalesce(sqlc.narg('is_private'), is_private)
WHERE trainings.uuid = @training_uuid
RETURNING *;


-- TODO: add filter by is private
-- name: GetTrainingList :many
SELECT
    trainings.uuid,
    trainings.name,
    trainings.is_private,
    trainings.owner_uuid,
    trainings.updated_at,
    COALESCE(f.favorite_count, 0) AS favorite_count,
    ARRAY_AGG(training_tags.name) FILTER (WHERE training_tags.name IS NOT NULL) AS tags,
    ARRAY_AGG(trainings_mentors.mentor_uuid) AS training_mentors,
    ARRAY_AGG(trainings_students.student_uuid) AS training_students
FROM
    trainings
LEFT JOIN
    favorite_users_trainings fuc ON trainings.uuid = fuc.training_uuid
LEFT JOIN
    training_tags ON training_tags.uuid IN (
        SELECT tag_uuid
        FROM training_tags
        WHERE training_uuid = trainings.uuid
    )
LEFT JOIN (
    SELECT
        training_uuid,
        COUNT(user_uuid) AS favorite_count
    FROM
        favorite_users_trainings
    GROUP BY
        training_uuid
) f ON f.training_uuid = trainings.uuid
LEFT JOIN
    trainings_mentors ON trainings_mentors.training_uuid = trainings.uuid
LEFT JOIN
    trainings_students ON trainings_students.training_uuid = trainings.uuid
WHERE
    trainings.name ILIKE @training_name
GROUP BY
    trainings.uuid, trainings.name, trainings.is_private, trainings.owner_uuid, trainings.updated_at, f.favorite_count
ORDER BY
    favorite_count DESC,
    trainings.created_at DESC;
-- LIMIT @limit 
-- OFFSET @offset;

-- name: GetOwnTrainingList :many
SELECT 
    *
FROM trainings;

-- name: GetMentoringTrainingList :many
SELECT 
    *
FROM trainings;


-- name: GetStudentTrainingList :many
SELECT 
    *
FROM trainings;

-- name: GetFavoriteTrainingList :many
SELECT 
    *
FROM trainings;

-- name: DeleteTraining :exec
DELETE FROM trainings
WHERE trainings.uuid = @training_uuid;