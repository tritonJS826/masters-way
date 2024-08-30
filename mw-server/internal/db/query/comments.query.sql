-- name: CreateComment :one
WITH way_info AS (
    SELECT
        ways.uuid AS way_uuid,
        ways.name AS way_name
    FROM day_reports
    INNER JOIN ways ON ways.uuid = day_reports.way_uuid
    WHERE day_reports.uuid = @day_report_uuid
),
owner_info AS (
    SELECT name AS owner_name
    FROM users
    WHERE uuid = @owner_uuid
)
INSERT INTO comments(
    created_at,
    updated_at,
    description,
    owner_uuid,
    day_report_uuid
) VALUES (
    @created_at, @updated_at, @description, @owner_uuid, @day_report_uuid
) RETURNING *,
    (SELECT way_uuid FROM way_info) AS way_uuid,
    (SELECT way_name FROM way_info) AS way_name,
    (SELECT owner_name FROM owner_info) AS owner_name;

-- name: GetListCommentsByDayReportUuids :many
SELECT
    comments.*
FROM comments
JOIN users ON comments.owner_uuid = users.uuid
WHERE day_report_uuid = ANY(@day_report_uuids::UUID[])
ORDER BY comments.created_at;

-- name: UpdateComment :one
WITH way_info AS (
    SELECT
        ways.uuid AS way_uuid,
        ways.name AS way_name
    FROM day_reports
    INNER JOIN ways ON ways.uuid = day_reports.way_uuid
    WHERE day_reports.uuid = (SELECT day_report_uuid FROM comments WHERE uuid =  @comment_uuid)
),
owner_info AS (
    SELECT name AS owner_name
    FROM users
    WHERE uuid = (SELECT owner_uuid FROM comments WHERE uuid = @comment_uuid)
)
UPDATE comments
SET
updated_at = coalesce(sqlc.narg('updated_at'), updated_at),
description = coalesce(sqlc.narg('description'), description)
WHERE comments.uuid = @comment_uuid
RETURNING *,
    (SELECT way_uuid FROM way_info) AS way_uuid,
    (SELECT way_name FROM way_info) AS way_name,
    (SELECT owner_name FROM owner_info) AS owner_name;

-- name: DeleteComment :exec
DELETE FROM comments
WHERE uuid = @comment_uuid;

-- name: GetIsUserHavingPermissionsForComment :one
SELECT
    ways.uuid as way_uuid,
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
