// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: comments.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

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
