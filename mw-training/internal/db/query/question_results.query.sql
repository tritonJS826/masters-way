-- name: CreateQuestionResult :one
INSERT INTO question_results (
    question_uuid,
    test_session_uuid,
    user_uuid,
    test_uuid,
    is_ok,
    result_description
) VALUES (
    @question_uuid,
    @test_session_uuid,
    @user_uuid,
    @test_uuid,
    @is_ok,
    @result_description
) RETURNING *;

-- name: GetQuestionResultById :one
SELECT
    question_results.uuid,
    question_results.question_uuid,
    question_results.test_session_uuid,
    question_results.user_uuid,
    question_results.test_uuid,
    question_results.is_ok,
    question_results.result_description,
    question_results.created_at
FROM
    question_results
WHERE
    question_results.uuid = @result_uuid;

-- name: GetQuestionResultsBySessionUser :many
SELECT
    question_results.uuid,
    question_results.question_uuid,
    question_results.test_session_uuid,
    question_results.user_uuid,
    question_results.test_uuid,
    question_results.is_ok,
    question_results.result_description,
    question_results.created_at
FROM
    question_results
WHERE
    question_results.user_uuid = @user_uuid
ORDER BY
    question_results.created_at DESC;

-- name: GetQuestionResultsByTest :many
SELECT
    question_results.uuid,
    question_results.question_uuid,
    question_results.test_session_uuid,
    question_results.user_uuid,
    question_results.test_uuid,
    question_results.is_ok,
    question_results.result_description,
    question_results.created_at
FROM
    question_results
WHERE
    question_results.test_uuid = @test_uuid
ORDER BY
    question_results.created_at DESC;

-- name: GetQuestionResultsBySessionUuid :many
SELECT
    question_results.uuid,
    question_results.question_uuid,
    question_results.test_session_uuid,
    question_results.user_uuid,
    question_results.test_uuid,
    question_results.is_ok,
    question_results.result_description,
    question_results.created_at
FROM
    question_results
WHERE
    question_results.test_session_uuid = @test_session_uuid
ORDER BY
    question_results.created_at DESC;

-- name: GetQuestionResultsByQuestion :many
SELECT
    question_results.uuid,
    question_results.question_uuid,
    question_results.test_session_uuid,
    question_results.user_uuid,
    question_results.test_uuid,
    question_results.is_ok,
    question_results.result_description,
    question_results.created_at
FROM
    question_results
WHERE
    question_results.question_uuid = @question_uuid
ORDER BY
    question_results.created_at DESC;

-- name: GetUserQuestionResult :one
SELECT
    question_results.uuid,
    question_results.question_uuid,
    question_results.test_session_uuid,
    question_results.user_uuid,
    question_results.test_uuid,
    question_results.is_ok,
    question_results.result_description,
    question_results.created_at
FROM
    question_results
WHERE
    question_results.user_uuid = @user_uuid
    AND question_results.question_uuid = @question_uuid
    AND question_results.test_uuid = @test_uuid
ORDER BY
    question_results.created_at DESC
LIMIT 1;

-- name: GetQuestionStats :one
SELECT
    COUNT(*) AS total_attempts,
    COUNT(*) FILTER (WHERE is_ok = true) AS correct_answers,
    COUNT(*) FILTER (WHERE is_ok = false) AS incorrect_answers,
    ROUND(
        (COUNT(*) FILTER (WHERE is_ok = true)::float / COUNT(*)::float) * 100, 2
    ) AS success_rate
FROM
    question_results
WHERE
    question_results.question_uuid = @question_uuid;

-- name: GetTestQuestionStats :many
SELECT
    question_results.question_uuid,
    COUNT(*) AS total_attempts,
    COUNT(*) FILTER (WHERE is_ok = true) AS correct_answers,
    COUNT(*) FILTER (WHERE is_ok = false) AS incorrect_answers,
    ROUND(
        (COUNT(*) FILTER (WHERE is_ok = true)::float / COUNT(*)::float) * 100, 2
    ) AS success_rate
FROM
    question_results
WHERE
    question_results.test_uuid = @test_uuid
GROUP BY
    question_results.question_uuid;

-- name: GetUserTestProgress :one
SELECT
    COUNT(DISTINCT question_results.question_uuid) AS answered_questions,
    COUNT(*) FILTER (WHERE is_ok = true) AS correct_answers,
    COUNT(*) FILTER (WHERE is_ok = false) AS incorrect_answers
FROM
    question_results
WHERE
    question_results.user_uuid = @user_uuid
    AND question_results.test_uuid = @test_uuid;

-- name: DeleteQuestionResult :exec
DELETE FROM question_results
WHERE question_results.uuid = @result_uuid;

-- name: DeleteQuestionResultsByTest :exec
DELETE FROM question_results
WHERE question_results.test_uuid = @test_uuid;

-- name: DeleteQuestionResultsByQuestion :exec
DELETE FROM question_results
WHERE question_results.question_uuid = @question_uuid;
