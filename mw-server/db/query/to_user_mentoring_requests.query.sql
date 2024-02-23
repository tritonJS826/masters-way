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