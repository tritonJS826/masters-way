-- name: CreateComment :one
INSERT INTO comments(
    created_at,
    updated_at,
    description,
    owner_uuid,
    day_report_uuid
) VALUES (
    $1, $2, $3, $4, $5
) RETURNING 
    *,
    (SELECT name FROM users WHERE uuid = $4) AS owner_name;


-- name: GetListCommentsByDayReportUuids :many
SELECT
    comments.*
FROM comments
JOIN users ON comments.owner_uuid = users.uuid
WHERE day_report_uuid = ANY($1::UUID[])
ORDER BY comments.created_at;

-- name: UpdateComment :one
UPDATE comments
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description)
WHERE uuid = sqlc.arg('uuid')
RETURNING *;

-- name: DeleteComment :exec
DELETE FROM comments
WHERE uuid = $1;