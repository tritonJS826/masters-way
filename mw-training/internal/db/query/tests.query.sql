-- name: CreateTest :one
INSERT INTO tests (
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

-- name: UpdateTest :one
UPDATE tests
SET 
    name = coalesce(sqlc.narg('name'), name),
    description = coalesce(sqlc.narg('description'), description),
    is_private = coalesce(sqlc.narg('is_private'), is_private),
    updated_at = CURRENT_TIMESTAMP
WHERE tests.uuid = @test_uuid
RETURNING *;

-- name: GetTestById :one
SELECT
    tests.uuid,
    tests.name,
    tests.description,
    tests.owner_uuid,
    tests.created_at,
    tests.updated_at,
    tests.is_private,
    COUNT(DISTINCT questions.uuid) FILTER (WHERE questions.uuid IS NOT NULL) AS questions_count
FROM
    tests
LEFT JOIN
    questions ON questions.test_uuid = tests.uuid AND questions.is_active = true
WHERE
    tests.uuid = @test_uuid
GROUP BY
    tests.uuid, tests.name, tests.description, tests.owner_uuid, tests.created_at, tests.updated_at, tests.is_private;

-- name: GetTestsByOwner :many
SELECT
    tests.uuid,
    tests.name,
    tests.description,
    tests.owner_uuid,
    tests.created_at,
    tests.updated_at,
    tests.is_private,
    COUNT(DISTINCT questions.uuid) FILTER (WHERE questions.uuid IS NOT NULL) AS questions_count
FROM
    tests
LEFT JOIN
    questions ON questions.test_uuid = tests.uuid AND questions.is_active = true
WHERE
    tests.owner_uuid = @owner_uuid
    AND (@include_private::boolean = true OR tests.is_private = false)
GROUP BY
    tests.uuid, tests.name, tests.description, tests.owner_uuid, tests.created_at, tests.updated_at, tests.is_private
ORDER BY
    tests.updated_at DESC;

-- name: GetPublicTests :many
SELECT
    tests.uuid,
    tests.name,
    tests.description,
    tests.owner_uuid,
    tests.created_at,
    tests.updated_at,
    tests.is_private,
    COUNT(DISTINCT questions.uuid) FILTER (WHERE questions.uuid IS NOT NULL) AS questions_count
FROM
    tests
LEFT JOIN
    questions ON questions.test_uuid = tests.uuid AND questions.is_active = true
WHERE
    tests.is_private = false
    AND (LOWER(tests.name) LIKE '%' || LOWER(@test_name) || '%' OR @test_name = '')
GROUP BY
    tests.uuid, tests.name, tests.description, tests.owner_uuid, tests.created_at, tests.updated_at, tests.is_private
ORDER BY
    tests.created_at DESC
LIMIT @request_limit
OFFSET @request_offset;

-- name: CountPublicTests :one
SELECT
    COUNT(*)
FROM
    tests
WHERE
    tests.is_private = false
    AND (LOWER(tests.name) LIKE '%' || LOWER(@test_name) || '%' OR @test_name = '');

-- name: DeleteTest :exec
DELETE FROM tests
WHERE tests.uuid = @test_uuid;
