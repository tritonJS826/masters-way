-- name: CreateFavoriteUser :one
INSERT INTO favorite_users(
    donor_user_uuid,
    acceptor_user_uuid
) VALUES (
    @donor_user_uuid, @acceptor_user_uuid
) RETURNING *;

-- name: DeleteFavoriteUserByIds :exec
DELETE FROM favorite_users
WHERE donor_user_uuid = @donor_user_uuid AND acceptor_user_uuid = @acceptor_user_uuid;

-- name: GetFavoriteUserByDonorUserId :many
SELECT
    users.uuid,
    users.name,
    users.email,
    users.description,
    users.created_at,
    users.image_url,
    users.is_mentor
FROM favorite_users
JOIN users
    ON favorite_users.donor_user_uuid = @donor_user_uuid
    AND favorite_users.acceptor_user_uuid = users.uuid;

-- name: GetFavoriteUserUuidsByAcceptorUserId :many
SELECT favorite_users.donor_user_uuid FROM favorite_users
WHERE favorite_users.acceptor_user_uuid = @acceptor_user_uuid;
