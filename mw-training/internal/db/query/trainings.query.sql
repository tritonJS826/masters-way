-- name: CreateTraining :one
INSERT INTO trainings (
    name,
    description,
    owner_uuid,
    is_private
) VALUES (
    @name,
    @description,
    @owner_uuid,
    @is_private
) RETURNING *;

-- name: UpdateTraining :one
UPDATE trainings
SET 
    name = coalesce(sqlc.narg('name'), name),
    description = coalesce(sqlc.narg('description'), description),
    is_private = coalesce(sqlc.narg('is_private'), is_private)
WHERE trainings.uuid = @training_uuid
RETURNING *;

-- name: CountTrainings :one
SELECT
    COUNT(*)
FROM
    trainings
WHERE
    (LOWER(trainings.name) LIKE '%' || LOWER(@training_name) || '%' OR @training_name = '')
    AND
    trainings.is_private = false;

-- name: GetTrainingList :many
SELECT
    -- TODO: add filter by is private
    trainings.uuid,
    trainings.name,
    trainings.description,
    trainings.owner_uuid,
    trainings.created_at,
    trainings.updated_at,
    COALESCE(f.favorite_count, 0) AS favorite_count,
    ARRAY_AGG(training_tags.name) FILTER (WHERE training_tags.name IS NOT NULL) AS tags,
    ARRAY_AGG(trainings_mentors.mentor_uuid) AS training_mentors,
    ARRAY_AGG(trainings_students.student_uuid) AS training_students
FROM
    trainings
LEFT JOIN
    favorite_users_trainings ON trainings.uuid = favorite_users_trainings.training_uuid
LEFT JOIN
    training_tags ON training_tags.uuid IN (
        SELECT uuid
        FROM training_tags
        WHERE uuid = trainings.uuid
    )
-- lets add likes to response
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
    (LOWER(trainings.name) LIKE '%' || LOWER(@training_name) || '%' OR @training_name = '')
    AND
    trainings.is_private = false
GROUP BY
    trainings.uuid, trainings.name, trainings.is_private, trainings.owner_uuid, trainings.updated_at, f.favorite_count
ORDER BY
    favorite_count DESC,
    trainings.created_at DESC
LIMIT @request_limit
OFFSET @request_offset;

-- name: GetOwnTrainingList :many
SELECT
    -- TODO: add filter by is private
    trainings.uuid,
    trainings.name,
    trainings.description,
    trainings.owner_uuid,
    trainings.created_at,
    trainings.updated_at,
    COALESCE(f.favorite_count, 0) AS favorite_count,
    ARRAY_AGG(training_tags.name) FILTER (WHERE training_tags.name IS NOT NULL) AS tags,
    ARRAY_AGG(trainings_mentors.mentor_uuid) AS training_mentors,
    ARRAY_AGG(trainings_students.student_uuid) AS training_students
FROM
    trainings
LEFT JOIN
    favorite_users_trainings ON trainings.uuid = favorite_users_trainings.training_uuid
LEFT JOIN
    training_tags ON training_tags.uuid IN (
        SELECT uuid
        FROM training_tags
        WHERE uuid = trainings.uuid
    )
-- lets add likes to response
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
    trainings.owner_uuid = @user_uuid
    AND
    trainings.is_private = false
GROUP BY
    trainings.uuid, trainings.name, trainings.is_private, trainings.owner_uuid, trainings.updated_at, f.favorite_count
ORDER BY
    trainings.updated_at DESC;


-- name: GetTrainingsAmountByUserId :one
SELECT    
    (SELECT COUNT(*) FROM trainings WHERE trainings.owner_uuid = @user_uuid) AS owner,
    (SELECT COUNT(*) FROM trainings_mentors WHERE trainings_mentors.mentor_uuid = @user_uuid) AS mentor,
    (SELECT COUNT(*) FROM trainings_students WHERE trainings_students.student_uuid = @user_uuid) AS student,
    (SELECT COUNT(*) FROM favorite_users_trainings WHERE favorite_users_trainings.user_uuid = @user_uuid) AS favorite
FROM trainings;
    
-- name: GetMentoringTrainingList :many
SELECT
    -- TODO: add filter by is private
    trainings.uuid,
    trainings.name,
    trainings.description,
    trainings.owner_uuid,
    trainings.created_at,
    trainings.updated_at,
    COALESCE(f.favorite_count, 0) AS favorite_count,
    ARRAY_AGG(training_tags.name) FILTER (WHERE training_tags.name IS NOT NULL) AS tags,
    ARRAY_AGG(trainings_mentors.mentor_uuid) AS training_mentors,
    ARRAY_AGG(trainings_students.student_uuid) AS training_students
FROM
    trainings
LEFT JOIN
    favorite_users_trainings ON trainings.uuid = favorite_users_trainings.training_uuid
LEFT JOIN
    training_tags ON training_tags.uuid IN (
        SELECT uuid
        FROM training_tags
        WHERE uuid = trainings.uuid
    )
-- lets add likes to response
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
    trainings_mentors.mentor_uuid = @user_uuid
    AND
    trainings.is_private = false
GROUP BY
    trainings.uuid, trainings.name, trainings.is_private, trainings.owner_uuid, trainings.updated_at, f.favorite_count
ORDER BY
    trainings.updated_at DESC;


-- name: GetStudentTrainingList :many
SELECT
    -- TODO: add filter by is private
    trainings.uuid,
    trainings.name,
    trainings.description,
    trainings.owner_uuid,
    trainings.created_at,
    trainings.updated_at,
    COALESCE(f.favorite_count, 0) AS favorite_count,
    ARRAY_AGG(training_tags.name) FILTER (WHERE training_tags.name IS NOT NULL) AS tags,
    ARRAY_AGG(trainings_mentors.mentor_uuid) AS training_mentors,
    ARRAY_AGG(trainings_students.student_uuid) AS training_students
FROM
    trainings
LEFT JOIN
    favorite_users_trainings ON trainings.uuid = favorite_users_trainings.training_uuid
LEFT JOIN
    training_tags ON training_tags.uuid IN (
        SELECT uuid
        FROM training_tags
        WHERE uuid = trainings.uuid
    )
-- lets add likes to response
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
    trainings_students.student_uuid = @user_uuid
    AND
    trainings.is_private = false
GROUP BY
    trainings.uuid, trainings.name, trainings.is_private, trainings.owner_uuid, trainings.updated_at, f.favorite_count
ORDER BY
    trainings.updated_at DESC;

-- name: GetFavoriteTrainingList :many
SELECT
    -- TODO: add filter by is private
    trainings.uuid,
    trainings.name,
    trainings.description,
    trainings.owner_uuid,
    trainings.created_at,
    trainings.updated_at,
    COALESCE(f.favorite_count, 0) AS favorite_count,
    ARRAY_AGG(training_tags.name) FILTER (WHERE training_tags.name IS NOT NULL) AS tags,
    ARRAY_AGG(trainings_mentors.mentor_uuid) AS training_mentors,
    ARRAY_AGG(trainings_students.student_uuid) AS training_students
FROM
    trainings
LEFT JOIN
    favorite_users_trainings ON trainings.uuid = favorite_users_trainings.training_uuid
LEFT JOIN
    training_tags ON training_tags.uuid IN (
        SELECT uuid
        FROM training_tags
        WHERE uuid = trainings.uuid
    )
-- lets add likes to response
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
    favorite_users_trainings.user_uuid = @user_uuid
    AND
    trainings.is_private = false
GROUP BY
    trainings.uuid, trainings.name, trainings.is_private, trainings.owner_uuid, trainings.updated_at, f.favorite_count
ORDER BY
    trainings.updated_at DESC;

-- name: GetTrainingById :one
SELECT
    *
FROM trainings
WHERE trainings.uuid = @training_uuid;

-- name: DeleteTraining :exec
DELETE FROM trainings
WHERE trainings.uuid = @training_uuid;
