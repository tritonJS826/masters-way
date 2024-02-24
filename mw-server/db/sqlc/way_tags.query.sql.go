// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: way_tags.query.sql

package db

import (
	"context"
	"database/sql"

	"github.com/google/uuid"
)

const createWayTag = `-- name: CreateWayTag :one
INSERT INTO way_tags(
    name,
    way_uuid
) VALUES (
    $1, $2
) RETURNING uuid, name, way_uuid
`

type CreateWayTagParams struct {
	Name    string    `json:"name"`
	WayUuid uuid.UUID `json:"way_uuid"`
}

func (q *Queries) CreateWayTag(ctx context.Context, arg CreateWayTagParams) (WayTag, error) {
	row := q.queryRow(ctx, q.createWayTagStmt, createWayTag, arg.Name, arg.WayUuid)
	var i WayTag
	err := row.Scan(&i.Uuid, &i.Name, &i.WayUuid)
	return i, err
}

const deleteWayTag = `-- name: DeleteWayTag :exec
DELETE FROM way_tags
WHERE uuid = $1
`

func (q *Queries) DeleteWayTag(ctx context.Context, argUuid uuid.UUID) error {
	_, err := q.exec(ctx, q.deleteWayTagStmt, deleteWayTag, argUuid)
	return err
}

const getListWayTagsByWayId = `-- name: GetListWayTagsByWayId :many
SELECT uuid, name, way_uuid FROM way_tags
WHERE way_tags.way_uuid = $1
ORDER BY uuid
`

func (q *Queries) GetListWayTagsByWayId(ctx context.Context, wayUuid uuid.UUID) ([]WayTag, error) {
	rows, err := q.query(ctx, q.getListWayTagsByWayIdStmt, getListWayTagsByWayId, wayUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []WayTag{}
	for rows.Next() {
		var i WayTag
		if err := rows.Scan(&i.Uuid, &i.Name, &i.WayUuid); err != nil {
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

const updateWayTag = `-- name: UpdateWayTag :one
UPDATE way_tags
SET
name = coalesce($1, name)

WHERE uuid = $2
RETURNING uuid, name, way_uuid
`

type UpdateWayTagParams struct {
	Name sql.NullString `json:"name"`
	Uuid uuid.UUID      `json:"uuid"`
}

func (q *Queries) UpdateWayTag(ctx context.Context, arg UpdateWayTagParams) (WayTag, error) {
	row := q.queryRow(ctx, q.updateWayTagStmt, updateWayTag, arg.Name, arg.Uuid)
	var i WayTag
	err := row.Scan(&i.Uuid, &i.Name, &i.WayUuid)
	return i, err
}