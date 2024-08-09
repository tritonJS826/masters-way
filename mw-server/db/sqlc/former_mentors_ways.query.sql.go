// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: former_mentors_ways.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createFormerMentorsWay = `-- name: CreateFormerMentorsWay :one
INSERT INTO former_mentors_ways(
    former_mentor_uuid,
    way_uuid
) VALUES (
    $1,
    $2
) RETURNING former_mentor_uuid, way_uuid
`

type CreateFormerMentorsWayParams struct {
	FormerMentorUuid pgtype.UUID `json:"former_mentor_uuid"`
	WayUuid          pgtype.UUID `json:"way_uuid"`
}

func (q *Queries) CreateFormerMentorsWay(ctx context.Context, arg CreateFormerMentorsWayParams) (FormerMentorsWay, error) {
	row := q.db.QueryRow(ctx, createFormerMentorsWay, arg.FormerMentorUuid, arg.WayUuid)
	var i FormerMentorsWay
	err := row.Scan(&i.FormerMentorUuid, &i.WayUuid)
	return i, err
}

const deleteFormerMentorWayIfExist = `-- name: DeleteFormerMentorWayIfExist :exec
DELETE FROM former_mentors_ways
WHERE former_mentors_ways.former_mentor_uuid = $1
AND former_mentors_ways.way_uuid = $2
AND EXISTS (
    SELECT 1 FROM former_mentors_ways
    WHERE former_mentor_uuid = $1
    AND way_uuid = $2
    LIMIT 1
)
`

type DeleteFormerMentorWayIfExistParams struct {
	FormerMentorUuid pgtype.UUID `json:"former_mentor_uuid"`
	WayUuid          pgtype.UUID `json:"way_uuid"`
}

func (q *Queries) DeleteFormerMentorWayIfExist(ctx context.Context, arg DeleteFormerMentorWayIfExistParams) error {
	_, err := q.db.Exec(ctx, deleteFormerMentorWayIfExist, arg.FormerMentorUuid, arg.WayUuid)
	return err
}

const getFormerMentorUsersByWayId = `-- name: GetFormerMentorUsersByWayId :many
SELECT users.uuid, users.name, users.email, users.description, users.created_at, users.image_url, users.is_mentor from ways
JOIN former_mentors_ways ON former_mentors_ways.way_uuid = ways.uuid
JOIN users ON users.uuid = former_mentors_ways.former_mentor_uuid
WHERE ways.uuid = $1
`

func (q *Queries) GetFormerMentorUsersByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]User, error) {
	rows, err := q.db.Query(ctx, getFormerMentorUsersByWayId, wayUuid)
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
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
