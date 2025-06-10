-- name: CreateQuestionResult :one
INSERT INTO question_results (
    question_uuid,
    user_answer,
    test_session_uuid,
    user_uuid,
    test_uuid,
    is_ok,
    result_description
) VALUES (
    @question_uuid,
    @user_answer,
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
    question_results.created_at,
    questions.uuid AS question_uuid,
    questions.name AS question_name,
    questions.question_text AS question_text,
    questions.question_order AS question_order,
    questions.answer AS question_answer
FROM
    question_results
JOIN questions ON questions.uuid = question_results.question_uuid
WHERE
    question_results.uuid = @result_uuid;


-- name: GetQuestionResultsBySessionUuid :many
SELECT
    question_results.uuid,
    question_results.question_uuid,
    question_results.test_session_uuid,
    question_results.user_uuid,
    question_results.test_uuid,
    question_results.is_ok,
    question_results.result_description,
    question_results.user_answer,
    question_results.created_at,
    questions.uuid AS question_uuid,
    questions.name AS question_name,
    questions.question_text AS question_text,
    questions.question_order AS question_order,
    questions.answer AS question_answer
FROM
    question_results
JOIN questions ON questions.uuid = question_results.question_uuid
WHERE
    question_results.test_session_uuid = @test_session_uuid
ORDER BY
    question_results.created_at DESC;

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

-- name: DeleteQuestionResult :exec
DELETE FROM question_results
WHERE question_results.uuid = @result_uuid;

