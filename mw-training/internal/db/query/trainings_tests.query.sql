-- name: CreateTrainingsTests :one
INSERT INTO trainings_tests (
    training_uuid,
    test_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: GetTrainingsTestsByTrainingId :many
SELECT
    trainings_tests.training_uuid,
    trainings_tests.test_uuid,
    tests.name AS test_name,
    tests.description AS test_description,
    tests.is_private AS test_is_private,
    tests.owner_uuid AS test_owner_uuid,
    tests.created_at AS test_created_at,
    tests.updated_at AS test_updated_at
FROM
    trainings_tests
LEFT JOIN
    tests ON tests.uuid = trainings_tests.test_uuid
WHERE
    trainings_tests.training_uuid = $1;


-- name: GetTrainingsTestsByTestId :many
SELECT
    trainings_tests.training_uuid,
    trainings_tests.test_uuid,
    tests.name AS test_name,
    tests.description AS test_description,
    tests.is_private AS test_is_private,
    tests.owner_uuid AS test_owner_uuid,
    tests.created_at AS test_created_at,
    tests.updated_at AS test_updated_at
FROM
    trainings_tests
LEFT JOIN
    tests ON tests.uuid = trainings_tests.test_uuid
WHERE
    trainings_tests.test_uuid = $1;


-- name: DeleteTrainingsTests :exec
DELETE FROM trainings_tests
WHERE 
    trainings_tests.training_uuid = @training_uuid
    AND trainings_tests.test_uuid = @test_uuid;
