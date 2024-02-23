-- name: CreateProblem :one
INSERT INTO problems(
    created_at,
    updated_at,
    description,
    is_done,
    owner_uuid,
    day_report_uuid
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING *;

-- name: GetListProblemsByDayReportId :many
SELECT * FROM problems
WHERE problems.day_report_uuid = $1
ORDER BY created_at;


-- name: UpdateProblem :one
UPDATE problems
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description),
is_done = coalesce(sqlc.narg('is_done'), is_done)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteProblem :exec
DELETE FROM problems
WHERE uuid = $1;