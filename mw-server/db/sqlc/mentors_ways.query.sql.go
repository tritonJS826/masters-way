// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: mentors_ways.query.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const createMentorUserWay = `-- name: CreateMentorUserWay :one
INSERT INTO mentor_users_ways(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING user_uuid, way_uuid
`

type CreateMentorUserWayParams struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

func (q *Queries) CreateMentorUserWay(ctx context.Context, arg CreateMentorUserWayParams) (MentorUsersWay, error) {
	row := q.queryRow(ctx, q.createMentorUserWayStmt, createMentorUserWay, arg.UserUuid, arg.WayUuid)
	var i MentorUsersWay
	err := row.Scan(&i.UserUuid, &i.WayUuid)
	return i, err
}

const deleteMentorUserWayByIds = `-- name: DeleteMentorUserWayByIds :exec
DELETE FROM mentor_users_ways
WHERE user_uuid = $1 AND way_uuid = $2
`

type DeleteMentorUserWayByIdsParams struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

func (q *Queries) DeleteMentorUserWayByIds(ctx context.Context, arg DeleteMentorUserWayByIdsParams) error {
	_, err := q.exec(ctx, q.deleteMentorUserWayByIdsStmt, deleteMentorUserWayByIds, arg.UserUuid, arg.WayUuid)
	return err
}

const getMentorUsersByWayId = `-- name: GetMentorUsersByWayId :many
SELECT 
    users.uuid, users.name, users.email, users.description, users.created_at, users.image_url, users.is_mentor, users.firebase_id
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = mentor_users_ways.user_uuid
WHERE way_uuid = $1
`

func (q *Queries) GetMentorUsersByWayId(ctx context.Context, wayUuid uuid.UUID) ([]User, error) {
	rows, err := q.query(ctx, q.getMentorUsersByWayIdStmt, getMentorUsersByWayId, wayUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []User{}
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.Email,
			&i.Description,
			&i.CreatedAt,
			&i.ImageUrl,
			&i.IsMentor,
			&i.FirebaseID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
