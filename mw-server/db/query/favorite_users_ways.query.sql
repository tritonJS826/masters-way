-- name: CreateFavoriteUserWay :one
INSERT INTO favorite_users_ways(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING *;

-- name: DeleteFavoriteUserWayByIds :exec
DELETE FROM favorite_users_ways
WHERE user_uuid = $1 AND way_uuid = $2;