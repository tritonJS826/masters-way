-- name: CreateFavoriteUser :one
INSERT INTO favorite_users(
    donor_user_uuid,
    acceptor_user_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteFavoriteUserByIds :exec
DELETE FROM favorite_users
WHERE donor_user_uuid = $1 AND acceptor_user_uuid = $2;