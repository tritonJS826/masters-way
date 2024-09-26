-- name: CreateFavoriteUserWay :one
INSERT INTO favorite_users_ways(
    user_uuid,
    way_uuid
) VALUES (
    @user_uuid,
    @way_uuid
) RETURNING *;

-- name: DeleteFavoriteUserWayByIds :exec
DELETE FROM favorite_users_ways
WHERE user_uuid = @user_uuid AND way_uuid = @way_uuid;

-- name: GetFavoriteForUserUuidsByWayId :one
SELECT COUNT(*)
FROM favorite_users_ways
WHERE favorite_users_ways.way_uuid = @way_uuid;
