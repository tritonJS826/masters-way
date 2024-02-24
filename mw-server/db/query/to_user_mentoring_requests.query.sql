-- name: CreateToUserMentoringRequest :one
INSERT INTO to_user_mentoring_requests(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;


-- name: DeleteToUserMentoringRequestByIds :exec
DELETE FROM to_user_mentoring_requests
WHERE user_uuid = $1 AND way_uuid = $2;

-- name: GetToMentorUserRequestsByWayId :many
SELECT users.uuid from ways
JOIN to_user_mentoring_requests ON to_user_mentoring_requests.way_uuid = ways.uuid
JOIN users ON users.uuid = to_user_mentoring_requests.user_uuid
WHERE way_uuid = $1;