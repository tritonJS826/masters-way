-- name: GetFavoriteForUserUuidsByWayId :one
SELECT COUNT(*)
FROM favorite_users_ways
WHERE favorite_users_ways.way_uuid = @way_uuid;
