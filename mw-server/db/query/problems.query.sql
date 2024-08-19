-- name: CreateProblem :one
INSERT INTO problems(
    created_at,
    updated_at,
    description,
    is_done,
    owner_uuid,
    day_report_uuid
) VALUES (
    @created_at,
    @updated_at,
    @description,
    @is_done,
    @owner_uuid,
    @day_report_uuid
) RETURNING *, (SELECT name FROM users WHERE uuid = @owner_uuid) AS owner_name;

-- name: GetListProblemsByDayReportId :many
SELECT * FROM problems
WHERE problems.day_report_uuid = @day_report_uuid
ORDER BY created_at;

-- name: UpdateProblem :one
UPDATE problems
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description),
is_done = coalesce(sqlc.narg('is_done'), is_done)
WHERE problems.uuid = sqlc.arg('uuid')
RETURNING *, (SELECT name FROM users WHERE problems.owner_uuid = users.uuid) AS owner_name;

-- name: DeleteProblem :exec
DELETE FROM problems
WHERE uuid = @problem_uuid;

-- name: GetProblemsByDayReportUuids :many
SELECT *
FROM problems
WHERE problems.day_report_uuid = ANY($1::UUID[]);
