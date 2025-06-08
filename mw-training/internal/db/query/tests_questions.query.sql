-- name: AddQuestionToTest :one
INSERT INTO tests_questions (
    test_uuid,
    question_uuid
) VALUES (
    @test_uuid,
    @question_uuid
) RETURNING *;

-- name: RemoveQuestionFromTest :exec
DELETE FROM tests_questions
WHERE test_uuid = @test_uuid AND question_uuid = @question_uuid;

-- name: GetTestQuestionsByTestUuid :many
SELECT
    tests_questions.test_uuid,
    tests_questions.question_uuid,
    tests_questions.created_at
FROM
    tests_questions
WHERE
    tests_questions.test_uuid = @test_uuid
ORDER BY
    tests_questions.created_at ASC;

-- name: GetQuestionTestRelations :many
SELECT
    tests_questions.test_uuid,
    tests_questions.question_uuid,
    tests_questions.created_at
FROM
    tests_questions
WHERE
    tests_questions.question_uuid = @question_uuid
ORDER BY
    tests_questions.created_at ASC;

-- name: CheckQuestionInTest :one
SELECT
    EXISTS(
        SELECT 1 FROM tests_questions
        WHERE test_uuid = @test_uuid AND question_uuid = @question_uuid
    ) AS exists;

-- name: CountQuestionsInTest :one
SELECT
    COUNT(*)
FROM
    tests_questions
WHERE
    tests_questions.test_uuid = @test_uuid;

-- name: CountTestsWithQuestion :one
SELECT
    COUNT(*)
FROM
    tests_questions
WHERE
    tests_questions.question_uuid = @question_uuid;

-- name: RemoveAllQuestionsFromTest :exec
DELETE FROM tests_questions
WHERE test_uuid = @test_uuid;

-- name: RemoveQuestionFromAllTests :exec
DELETE FROM tests_questions
WHERE question_uuid = @question_uuid;
