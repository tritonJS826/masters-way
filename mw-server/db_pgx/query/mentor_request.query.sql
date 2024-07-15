-- name: GetMentorRequestByUserId :many
SELECT *
FROM to_user_mentoring_requests
         JOIN ways ON to_user_mentoring_requests.way_uuid = ways.uuid
WHERE to_user_mentoring_requests.user_uuid = @user_uuid;
