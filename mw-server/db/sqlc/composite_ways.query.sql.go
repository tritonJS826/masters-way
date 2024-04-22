// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: composite_ways.query.sql

package db

import (
	"context"

	"github.com/google/uuid"
)

const addWayToCompositeWay = `-- name: AddWayToCompositeWay :one
INSERT INTO composite_ways(
    child_uuid,
    parent_uuid
) VALUES (
    $1, $2
) RETURNING child_uuid, parent_uuid
`

type AddWayToCompositeWayParams struct {
	ChildUuid  uuid.UUID `json:"child_uuid"`
	ParentUuid uuid.UUID `json:"parent_uuid"`
}

func (q *Queries) AddWayToCompositeWay(ctx context.Context, arg AddWayToCompositeWayParams) (CompositeWay, error) {
	row := q.queryRow(ctx, q.addWayToCompositeWayStmt, addWayToCompositeWay, arg.ChildUuid, arg.ParentUuid)
	var i CompositeWay
	err := row.Scan(&i.ChildUuid, &i.ParentUuid)
	return i, err
}

const deleteWayFromCompositeWay = `-- name: DeleteWayFromCompositeWay :exec
DELETE FROM composite_ways
WHERE composite_ways.child_uuid = $1 AND composite_ways.parent_uuid = $2
`

type DeleteWayFromCompositeWayParams struct {
	ChildUuid  uuid.UUID `json:"child_uuid"`
	ParentUuid uuid.UUID `json:"parent_uuid"`
}

func (q *Queries) DeleteWayFromCompositeWay(ctx context.Context, arg DeleteWayFromCompositeWayParams) error {
	_, err := q.exec(ctx, q.deleteWayFromCompositeWayStmt, deleteWayFromCompositeWay, arg.ChildUuid, arg.ParentUuid)
	return err
}
