
-- name: CreateComment :one
INSERT INTO comments(
    created_at,
    updated_at,
    description,
    owner_uuid,
    day_report_uuid
) VALUES (
    @created_at, @updated_at, @description, @owner_uuid, @day_report_uuid
) RETURNING
    *,
    (SELECT name FROM users WHERE uuid = @owner_uuid) AS owner_name;


-- name: GetListCommentsByDayReportUuids :many
SELECT
    comments.*
FROM comments
JOIN users ON comments.owner_uuid = users.uuid
WHERE day_report_uuid = ANY(@day_report_uuids::UUID[])
ORDER BY comments.created_at;

-- name: UpdateComment :one
UPDATE comments
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description)
WHERE comments.uuid = sqlc.arg('uuid')
RETURNING *, (SELECT name FROM users WHERE comments.owner_uuid = @owner_uuid) AS owner_name;

-- name: DeleteComment :exec
DELETE FROM comments
WHERE uuid = @comment_uuid;

-- name: GetIsUserHavingPermissionsForComment :one
SELECT
    ways.uuid as way_uuid,
    ways.name as way_name,
    EXISTS (
        SELECT 1
        FROM mentor_users_ways
        WHERE mentor_users_ways.way_uuid = ways.uuid
        AND mentor_users_ways.user_uuid = @user_uuid
    ) OR ways.owner_uuid = @user_uuid AS is_permission_given
FROM ways
INNER JOIN day_reports ON ways.uuid = day_reports.way_uuid
INNER JOIN comments ON comments.day_report_uuid = day_reports.uuid
WHERE comments.uuid = @comment_uuid;
