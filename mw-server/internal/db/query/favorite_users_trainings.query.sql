-- name: CreateFavoriteTrainingForUser :one
INSERT INTO favorite_users_trainings(
    training_uuid,
    user_uuid
) VALUES (
    @training_uuid,
    @user_uuid
) RETURNING *;

-- name: DeleteFavoriteTrainingUserByIds :exec
DELETE FROM favorite_users_trainings
WHERE user_uuid = @user_uuid AND training_uuid = @training_uuid;

