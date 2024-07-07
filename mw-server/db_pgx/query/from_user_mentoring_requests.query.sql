-- name: GetFromUserMentoringRequestWaysByWayId :many
SELECT
    users.*
FROM from_user_mentoring_requests
JOIN users ON from_user_mentoring_requests.user_uuid = users.uuid
WHERE from_user_mentoring_requests.way_uuid = @way_uuid;
