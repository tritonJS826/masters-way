// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: former_mentors_ways.query.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const createFormerMentorsWay = `-- name: CreateFormerMentorsWay :one
INSERT INTO former_mentors_ways(
    former_mentor_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING former_mentor_uuid, way_uuid
`

type CreateFormerMentorsWayParams struct {
	FormerMentorUuid uuid.UUID `json:"former_mentor_uuid"`
	WayUuid          uuid.UUID `json:"way_uuid"`
}

func (q *Queries) CreateFormerMentorsWay(ctx context.Context, arg CreateFormerMentorsWayParams) (FormerMentorsWay, error) {
	row := q.queryRow(ctx, q.createFormerMentorsWayStmt, createFormerMentorsWay, arg.FormerMentorUuid, arg.WayUuid)
	var i FormerMentorsWay
	err := row.Scan(&i.FormerMentorUuid, &i.WayUuid)
	return i, err
}

const getFormerMentorUsersByWayId = `-- name: GetFormerMentorUsersByWayId :many
SELECT users.uuid, users.name, users.email, users.description, users.created_at, users.image_url, users.is_mentor, users.firebase_id from ways
JOIN former_mentors_ways ON former_mentors_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = former_mentors_ways.user_uuid
WHERE way_uuid = $1
`

func (q *Queries) GetFormerMentorUsersByWayId(ctx context.Context, wayUuid uuid.UUID) ([]User, error) {
	rows, err := q.query(ctx, q.getFormerMentorUsersByWayIdStmt, getFormerMentorUsersByWayId, wayUuid)
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
