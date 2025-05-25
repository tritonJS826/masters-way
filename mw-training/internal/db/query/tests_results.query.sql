-- name: CreateTestResult :one
INSERT INTO test_session_results (
    test_uuid,
    user_uuid,
    result_description
) VALUES (
    @test_uuid,
    @user_uuid,
    @result_description
) RETURNING *;

-- name: UpdateTestResult :one
UPDATE test_session_results
SET 
    result_description = coalesce(sqlc.narg('result_description'), result_description)
WHERE test_session_results.uuid = @result_uuid
RETURNING *;

-- name: GetTestResultById :one
SELECT
    test_session_results.uuid,
    test_session_results.test_uuid,
    test_session_results.user_uuid,
    test_session_results.result_description,
    test_session_results.created_at
FROM
    test_session_results
WHERE
    test_session_results.uuid = @result_uuid;

-- name: GetTestResultsByUser :many
SELECT
    test_session_results.uuid,
    test_session_results.test_uuid,
    test_session_results.user_uuid,
    test_session_results.result_description,
    test_session_results.created_at
FROM
    test_session_results
WHERE
    test_session_results.user_uuid = @user_uuid
ORDER BY
    test_session_results.created_at DESC;

-- name: GetTestResultsByTest :many
SELECT
    test_session_results.uuid,
    test_session_results.test_uuid,
    test_session_results.user_uuid,
    test_session_results.result_description,
    test_session_results.created_at
FROM
    test_session_results
WHERE
    test_session_results.test_uuid = @test_uuid
ORDER BY
    test_session_results.created_at DESC;

-- name: GetUserTestResult :one
SELECT
    test_session_results.uuid,
    test_session_results.test_uuid,
    test_session_results.user_uuid,
    test_session_results.result_description,
    test_session_results.created_at
FROM
    test_session_results
WHERE
    test_session_results.user_uuid = @user_uuid
    AND test_session_results.test_uuid = @test_uuid
ORDER BY
    test_session_results.created_at DESC
LIMIT 1;

-- name: GetTestResultsWithStats :many
SELECT
    test_session_results.uuid,
    test_session_results.test_uuid,
    test_session_results.user_uuid,
    test_session_results.result_description,
    test_session_results.created_at,
    COALESCE(qr_stats.total_questions, 0) AS total_questions,
    COALESCE(qr_stats.correct_answers, 0) AS correct_answers,
    COALESCE(qr_stats.incorrect_answers, 0) AS incorrect_answers,
    CASE 
        WHEN COALESCE(qr_stats.total_questions, 0) > 0 
        THEN ROUND((qr_stats.correct_answers::float / qr_stats.total_questions::float) * 100, 2)
        ELSE 0
    END AS score_percentage
FROM
    test_session_results
LEFT JOIN (
    SELECT
        test_uuid,
        user_uuid,
        COUNT(*) AS total_questions,
        COUNT(*) FILTER (WHERE is_ok = true) AS correct_answers,
        COUNT(*) FILTER (WHERE is_ok = false) AS incorrect_answers
    FROM
        question_results
    GROUP BY
        test_uuid, user_uuid
) qr_stats ON test_session_results.test_uuid = qr_stats.test_uuid 
    AND test_session_results.user_uuid = qr_stats.user_uuid
WHERE
    test_session_results.test_uuid = @test_uuid
ORDER BY
    test_session_results.created_at DESC;

-- name: GetUserTestResultsWithStats :many
SELECT
    test_session_results.uuid,
    test_session_results.test_uuid,
    test_session_results.user_uuid,
    test_session_results.result_description,
    test_session_results.created_at,
    COALESCE(qr_stats.total_questions, 0) AS total_questions,
    COALESCE(qr_stats.correct_answers, 0) AS correct_answers,
    COALESCE(qr_stats.incorrect_answers, 0) AS incorrect_answers,
    CASE 
        WHEN COALESCE(qr_stats.total_questions, 0) > 0 
        THEN ROUND((qr_stats.correct_answers::float / qr_stats.total_questions::float) * 100, 2)
        ELSE 0
    END AS score_percentage
FROM
    test_session_results
LEFT JOIN (
    SELECT
        test_uuid,
        user_uuid,
        COUNT(*) AS total_questions,
        COUNT(*) FILTER (WHERE is_ok = true) AS correct_answers,
        COUNT(*) FILTER (WHERE is_ok = false) AS incorrect_answers
    FROM
        question_results
    GROUP BY
        test_uuid, user_uuid
) qr_stats ON test_session_results.test_uuid = qr_stats.test_uuid 
    AND test_session_results.user_uuid = qr_stats.user_uuid
WHERE
    test_session_results.user_uuid = @user_uuid
ORDER BY
    test_session_results.created_at DESC;

-- name: GetTestLeaderboard :many
SELECT
    test_session_results.user_uuid,
    test_session_results.created_at,
    COALESCE(qr_stats.total_questions, 0) AS total_questions,
    COALESCE(qr_stats.correct_answers, 0) AS correct_answers,
    CASE 
        WHEN COALESCE(qr_stats.total_questions, 0) > 0 
        THEN ROUND((qr_stats.correct_answers::float / qr_stats.total_questions::float) * 100, 2)
        ELSE 0
    END AS score_percentage
FROM
    test_session_results
LEFT JOIN (
    SELECT
        test_uuid,
        user_uuid,
        COUNT(*) AS total_questions,
        COUNT(*) FILTER (WHERE is_ok = true) AS correct_answers
    FROM
        question_results
    GROUP BY
        test_uuid, user_uuid
) qr_stats ON test_session_results.test_uuid = qr_stats.test_uuid 
    AND test_session_results.user_uuid = qr_stats.user_uuid
WHERE
    test_session_results.test_uuid = @test_uuid
ORDER BY
    score_percentage DESC,
    test_session_results.created_at ASC
LIMIT @limit_count;

-- name: CountTestAttempts :one
SELECT
    COUNT(*) AS total_attempts,
    COUNT(DISTINCT user_uuid) AS unique_users
FROM
    test_session_results
WHERE
    test_session_results.test_uuid = @test_uuid;

-- name: GetTestAverageScore :one
SELECT
    ROUND(AVG(
        CASE 
            WHEN qr_stats.total_questions > 0 
            THEN (qr_stats.correct_answers::float / qr_stats.total_questions::float) * 100
            ELSE 0
        END
    ), 2) AS average_score
FROM
    test_session_results
LEFT JOIN (
    SELECT
        test_uuid,
        user_uuid,
        COUNT(*) AS total_questions,
        COUNT(*) FILTER (WHERE is_ok = true) AS correct_answers
    FROM
        question_results
    GROUP BY
        test_uuid, user_uuid
) qr_stats ON test_session_results.test_uuid = qr_stats.test_uuid 
    AND test_session_results.user_uuid = qr_stats.user_uuid
WHERE
    test_session_results.test_uuid = @test_uuid;

-- name: DeleteTestResult :exec
DELETE FROM test_session_results
WHERE test_session_results.uuid = @result_uuid;

-- name: DeleteTestResultsByTest :exec
DELETE FROM test_session_results
WHERE test_session_results.test_uuid = @test_uuid;

-- name: DeleteTestResultsByUser :exec
DELETE FROM test_session_results
WHERE test_session_results.user_uuid = @user_uuid;
