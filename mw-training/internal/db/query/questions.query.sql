-- name: CreateQuestion :one
INSERT INTO questions (
    test_uuid,
    name,
    practice_type,
    question_text,
    question_order,
    time_to_answer,
    answer,
    is_active,
    is_private
) VALUES (
    @test_uuid,
    @name,
    @practice_type,
    @question_text,
    (SELECT COALESCE(MAX(question_order), 0) + 1 FROM questions WHERE test_uuid = @test_uuid),
    @time_to_answer,
    @answer,
    @is_active,
    @is_private
) RETURNING *;

-- name: UpdateQuestion :one
UPDATE questions
SET 
    name = coalesce(sqlc.narg('name'), name),
    practice_type = coalesce(sqlc.narg('practice_type'), practice_type),
    question_text = coalesce(sqlc.narg('question_text'), question_text),
    question_order = coalesce(sqlc.narg('question_order'), question_order),
    time_to_answer = coalesce(sqlc.narg('time_to_answer'), time_to_answer),
    answer = coalesce(sqlc.narg('answer'), answer),
    is_active = coalesce(sqlc.narg('is_active'), is_active),
    is_private = coalesce(sqlc.narg('is_private'), is_private),
    updated_at = CURRENT_TIMESTAMP
WHERE questions.uuid = @question_uuid
RETURNING *;

-- name: GetQuestionsByTestId :many
SELECT
    questions.uuid,
    questions.name,
    practice_type,
    questions.test_uuid,
    questions.question_text,
    questions.question_order,
    questions.time_to_answer,
    questions.answer,
    questions.is_active,
    questions.is_private,
    questions.created_at,
    questions.updated_at
FROM
    questions
WHERE
    questions.test_uuid = @test_uuid
    AND (@include_inactive::boolean = true OR questions.is_active = true)
    AND (@include_private::boolean = true OR questions.is_private = false)
ORDER BY
    questions.question_order ASC,
    questions.created_at ASC;

-- name: GetActiveQuestionsByTestId :many
SELECT
    questions.uuid,
    questions.name,
    practice_type,
    questions.test_uuid,
    questions.question_text,
    questions.question_order,
    questions.time_to_answer,
    questions.is_active,
    questions.is_private,
    questions.created_at,
    questions.updated_at
FROM
    questions
WHERE
    questions.test_uuid = @test_uuid
    AND questions.is_active = true
    AND (@include_private::boolean = true OR questions.is_private = false)
ORDER BY
    questions.question_order ASC,
    questions.created_at ASC;

-- name: GetQuestionById :one
SELECT
    *
FROM questions
WHERE questions.uuid = @question_uuid;

-- name: CountQuestionsByTestId :one
SELECT
    COUNT(*)
FROM
    questions
WHERE
    questions.test_uuid = @test_uuid
    AND (@include_inactive::boolean = true OR questions.is_active = true);

-- name: DeleteQuestion :exec
WITH deleted_question AS (
    DELETE FROM questions
    WHERE questions.uuid = @question_uuid
    RETURNING test_uuid, question_order
)
UPDATE questions
SET question_order = questions.question_order - 1
FROM deleted_question
WHERE questions.test_uuid = deleted_question.test_uuid
  AND questions.question_order > deleted_question.question_order;

-- name: DeactivateQuestion :one
UPDATE questions
SET 
    is_active = false,
    updated_at = CURRENT_TIMESTAMP
WHERE questions.uuid = @question_uuid
RETURNING *;

-- name: ReorderQuestions :exec
UPDATE questions
SET question_order = @new_order,
    updated_at = CURRENT_TIMESTAMP
WHERE questions.uuid = @question_uuid;
