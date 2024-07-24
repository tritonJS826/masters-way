// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: users_rooms.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const addUserToRoom = `-- name: AddUserToRoom :exec
INSERT INTO users_rooms(user_uuid, room_uuid, user_role, joined_at, is_room_blocked)
VALUES ($1, $2, $3, $4, $5)
`

type AddUserToRoomParams struct {
	UserUuid      pgtype.UUID      `json:"user_uuid"`
	RoomUuid      pgtype.UUID      `json:"room_uuid"`
	Role          UserRoleType     `json:"role"`
	JoinedAt      pgtype.Timestamp `json:"joined_at"`
	IsRoomBlocked bool             `json:"is_room_blocked"`
}

func (q *Queries) AddUserToRoom(ctx context.Context, arg AddUserToRoomParams) error {
	_, err := q.db.Exec(ctx, addUserToRoom,
		arg.UserUuid,
		arg.RoomUuid,
		arg.Role,
		arg.JoinedAt,
		arg.IsRoomBlocked,
	)
	return err
}