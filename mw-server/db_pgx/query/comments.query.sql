-- name: GetListCommentsByDayReportUuids :many
SELECT
    comments.*
FROM comments
JOIN users ON comments.owner_uuid = users.uuid
WHERE day_report_uuid = ANY(@day_report_uuids::UUID[])
ORDER BY comments.created_at;
