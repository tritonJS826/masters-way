// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: comments.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createComment = `-- name: CreateComment :one
INSERT INTO comments(
    created_at,
    updated_at,
    description,
    owner_uuid,
    day_report_uuid
) VALUES (
    $1, $2, $3, $4, $5
) RETURNING
    uuid, created_at, updated_at, description, owner_uuid, day_report_uuid,
    (SELECT name FROM users WHERE uuid = $4) AS owner_name
`

type CreateCommentParams struct {
	CreatedAt     pgtype.Timestamp `json:"created_at"`
	UpdatedAt     pgtype.Timestamp `json:"updated_at"`
	Description   string           `json:"description"`
	OwnerUuid     pgtype.UUID      `json:"owner_uuid"`
	DayReportUuid pgtype.UUID      `json:"day_report_uuid"`
}

type CreateCommentRow struct {
	Uuid          pgtype.UUID      `json:"uuid"`
	CreatedAt     pgtype.Timestamp `json:"created_at"`
	UpdatedAt     pgtype.Timestamp `json:"updated_at"`
	Description   string           `json:"description"`
	OwnerUuid     pgtype.UUID      `json:"owner_uuid"`
	DayReportUuid pgtype.UUID      `json:"day_report_uuid"`
	OwnerName     string           `json:"owner_name"`
}

func (q *Queries) CreateComment(ctx context.Context, arg CreateCommentParams) (CreateCommentRow, error) {
	row := q.db.QueryRow(ctx, createComment,
		arg.CreatedAt,
		arg.UpdatedAt,
		arg.Description,
		arg.OwnerUuid,
		arg.DayReportUuid,
	)
	var i CreateCommentRow
	err := row.Scan(
		&i.Uuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Description,
		&i.OwnerUuid,
		&i.DayReportUuid,
		&i.OwnerName,
	)
	return i, err
}

const deleteComment = `-- name: DeleteComment :exec
DELETE FROM comments
WHERE uuid = $1
`

func (q *Queries) DeleteComment(ctx context.Context, commentUuid pgtype.UUID) error {
	_, err := q.db.Exec(ctx, deleteComment, commentUuid)
	return err
}

const getListCommentsByDayReportUuids = `-- name: GetListCommentsByDayReportUuids :many
SELECT
    comments.uuid, comments.created_at, comments.updated_at, comments.description, comments.owner_uuid, comments.day_report_uuid
FROM comments
JOIN users ON comments.owner_uuid = users.uuid
WHERE day_report_uuid = ANY($1::UUID[])
ORDER BY comments.created_at
`

func (q *Queries) GetListCommentsByDayReportUuids(ctx context.Context, dayReportUuids []pgtype.UUID) ([]Comment, error) {
	rows, err := q.db.Query(ctx, getListCommentsByDayReportUuids, dayReportUuids)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Comment{}
	for rows.Next() {
		var i Comment
		if err := rows.Scan(
			&i.Uuid,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Description,
			&i.OwnerUuid,
			&i.DayReportUuid,
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

const updateComment = `-- name: UpdateComment :one
UPDATE comments
SET
updated_at = coalesce($1, updated_at),
description = coalesce($2, description)
WHERE uuid = $3
RETURNING uuid, created_at, updated_at, description, owner_uuid, day_report_uuid
`

type UpdateCommentParams struct {
	UpdatedAt   pgtype.Timestamp `json:"updated_at"`
	Description pgtype.Text      `json:"description"`
	Uuid        pgtype.UUID      `json:"uuid"`
}

func (q *Queries) UpdateComment(ctx context.Context, arg UpdateCommentParams) (Comment, error) {
	row := q.db.QueryRow(ctx, updateComment, arg.UpdatedAt, arg.Description, arg.Uuid)
	var i Comment
	err := row.Scan(
		&i.Uuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Description,
		&i.OwnerUuid,
		&i.DayReportUuid,
	)
	return i, err
}
