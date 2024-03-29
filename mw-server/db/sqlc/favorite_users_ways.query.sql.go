// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: favorite_users_ways.query.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const createFavoriteUserWay = `-- name: CreateFavoriteUserWay :one
INSERT INTO favorite_users_ways(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING user_uuid, way_uuid
`

type CreateFavoriteUserWayParams struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

func (q *Queries) CreateFavoriteUserWay(ctx context.Context, arg CreateFavoriteUserWayParams) (FavoriteUsersWay, error) {
	row := q.queryRow(ctx, q.createFavoriteUserWayStmt, createFavoriteUserWay, arg.UserUuid, arg.WayUuid)
	var i FavoriteUsersWay
	err := row.Scan(&i.UserUuid, &i.WayUuid)
	return i, err
}

const deleteFavoriteUserWayByIds = `-- name: DeleteFavoriteUserWayByIds :exec
DELETE FROM favorite_users_ways
WHERE user_uuid = $1 AND way_uuid = $2
`

type DeleteFavoriteUserWayByIdsParams struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

func (q *Queries) DeleteFavoriteUserWayByIds(ctx context.Context, arg DeleteFavoriteUserWayByIdsParams) error {
	_, err := q.exec(ctx, q.deleteFavoriteUserWayByIdsStmt, deleteFavoriteUserWayByIds, arg.UserUuid, arg.WayUuid)
	return err
}

const getFavoriteForUserUuidsByWayId = `-- name: GetFavoriteForUserUuidsByWayId :one
SELECT COUNT(*) 
FROM favorite_users_ways 
WHERE favorite_users_ways.way_uuid = $1
`

func (q *Queries) GetFavoriteForUserUuidsByWayId(ctx context.Context, wayUuid uuid.UUID) (int64, error) {
	row := q.queryRow(ctx, q.getFavoriteForUserUuidsByWayIdStmt, getFavoriteForUserUuidsByWayId, wayUuid)
	var count int64
	err := row.Scan(&count)
	return count, err
}
