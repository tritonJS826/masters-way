-- name: CreateFromUserMentoringRequest :one
INSERT INTO from_user_mentoring_requests(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteFromUserMentoringRequestByIds :exec
DELETE FROM from_user_mentoring_requests
WHERE user_uuid = $1 AND way_uuid = $2;