// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: way_collections_ways.query.sql

package db

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const addWayToMentoringCollection = `-- name: AddWayToMentoringCollection :exec
WITH way_collection_uuid_query AS (
    SELECT uuid
    FROM way_collections
    WHERE owner_uuid = $1
    AND type = 'mentoring'
    LIMIT 1
)
INSERT INTO way_collections_ways (
    way_collection_uuid,
    way_uuid
)
SELECT uuid, $2
FROM way_collection_uuid_query
RETURNING way_collection_uuid, way_uuid
`

type AddWayToMentoringCollectionParams struct {
	OwnerUuid uuid.UUID `json:"owner_uuid"`
	WayUuid   uuid.UUID `json:"way_uuid"`
}

func (q *Queries) AddWayToMentoringCollection(ctx context.Context, arg AddWayToMentoringCollectionParams) error {
	_, err := q.exec(ctx, q.addWayToMentoringCollectionStmt, addWayToMentoringCollection, arg.OwnerUuid, arg.WayUuid)
	return err
}

const createWayCollectionsWays = `-- name: CreateWayCollectionsWays :one
INSERT INTO way_collections_ways(
    way_collection_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING way_collection_uuid, way_uuid
`

type CreateWayCollectionsWaysParams struct {
	WayCollectionUuid uuid.UUID `json:"way_collection_uuid"`
	WayUuid           uuid.UUID `json:"way_uuid"`
}

func (q *Queries) CreateWayCollectionsWays(ctx context.Context, arg CreateWayCollectionsWaysParams) (WayCollectionsWay, error) {
	row := q.queryRow(ctx, q.createWayCollectionsWaysStmt, createWayCollectionsWays, arg.WayCollectionUuid, arg.WayUuid)
	var i WayCollectionsWay
	err := row.Scan(&i.WayCollectionUuid, &i.WayUuid)
	return i, err
}

const deleteWayCollectionsWaysByIds = `-- name: DeleteWayCollectionsWaysByIds :exec
DELETE FROM way_collections_ways
WHERE way_collection_uuid = $1 AND way_uuid = $2
`

type DeleteWayCollectionsWaysByIdsParams struct {
	WayCollectionUuid uuid.UUID `json:"way_collection_uuid"`
	WayUuid           uuid.UUID `json:"way_uuid"`
}

func (q *Queries) DeleteWayCollectionsWaysByIds(ctx context.Context, arg DeleteWayCollectionsWaysByIdsParams) error {
	_, err := q.exec(ctx, q.deleteWayCollectionsWaysByIdsStmt, deleteWayCollectionsWaysByIds, arg.WayCollectionUuid, arg.WayUuid)
	return err
}

const getWayCollectionJoinWayByUserId = `-- name: GetWayCollectionJoinWayByUserId :many
SELECT 
    way_collections.uuid AS collection_uuid,
    way_collections.created_at AS collection_created_at,
    way_collections.updated_at AS collection_updated_at,
    way_collections.name AS collection_name,
    way_collections.type AS collection_type,
    ways.uuid AS way_uuid,
    ways.name AS way_name,
    ways.goal_description AS way_description,
    ways.updated_at AS way_updated_at,
    ways.created_at AS way_created_at,
    ways.estimation_time AS way_estimation_time,
    ways.owner_uuid AS way_owner_uuid,
    ways.copied_from_way_uuid AS way_copied_from_way_uuid,
    ways.is_completed AS is_completed,
    ways.is_private AS way_is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount
FROM users
JOIN way_collections ON users.uuid = way_collections.owner_uuid
JOIN way_collections_ways ON way_collections.uuid = way_collections_ways.way_collection_uuid
JOIN ways ON way_collections_ways.way_uuid = ways.uuid
WHERE way_collections.owner_uuid = $1
`

type GetWayCollectionJoinWayByUserIdRow struct {
	CollectionUuid       uuid.UUID         `json:"collection_uuid"`
	CollectionCreatedAt  time.Time         `json:"collection_created_at"`
	CollectionUpdatedAt  time.Time         `json:"collection_updated_at"`
	CollectionName       string            `json:"collection_name"`
	CollectionType       WayCollectionType `json:"collection_type"`
	WayUuid              uuid.UUID         `json:"way_uuid"`
	WayName              string            `json:"way_name"`
	WayDescription       string            `json:"way_description"`
	WayUpdatedAt         time.Time         `json:"way_updated_at"`
	WayCreatedAt         time.Time         `json:"way_created_at"`
	WayEstimationTime    int32             `json:"way_estimation_time"`
	WayOwnerUuid         uuid.UUID         `json:"way_owner_uuid"`
	WayCopiedFromWayUuid uuid.NullUUID     `json:"way_copied_from_way_uuid"`
	IsCompleted          bool              `json:"is_completed"`
	WayIsPrivate         bool              `json:"way_is_private"`
	WayMetricsTotal      int64             `json:"way_metrics_total"`
	WayMetricsDone       int64             `json:"way_metrics_done"`
	WayFavoriteForUsers  int64             `json:"way_favorite_for_users"`
	WayDayReportsAmount  int64             `json:"way_day_reports_amount"`
}

func (q *Queries) GetWayCollectionJoinWayByUserId(ctx context.Context, ownerUuid uuid.UUID) ([]GetWayCollectionJoinWayByUserIdRow, error) {
	rows, err := q.query(ctx, q.getWayCollectionJoinWayByUserIdStmt, getWayCollectionJoinWayByUserId, ownerUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetWayCollectionJoinWayByUserIdRow{}
	for rows.Next() {
		var i GetWayCollectionJoinWayByUserIdRow
		if err := rows.Scan(
			&i.CollectionUuid,
			&i.CollectionCreatedAt,
			&i.CollectionUpdatedAt,
			&i.CollectionName,
			&i.CollectionType,
			&i.WayUuid,
			&i.WayName,
			&i.WayDescription,
			&i.WayUpdatedAt,
			&i.WayCreatedAt,
			&i.WayEstimationTime,
			&i.WayOwnerUuid,
			&i.WayCopiedFromWayUuid,
			&i.IsCompleted,
			&i.WayIsPrivate,
			&i.WayMetricsTotal,
			&i.WayMetricsDone,
			&i.WayFavoriteForUsers,
			&i.WayDayReportsAmount,
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

const getWayCollectionsByUserId = `-- name: GetWayCollectionsByUserId :many
SELECT uuid, owner_uuid, created_at, updated_at, name, type FROM way_collections WHERE way_collections.owner_uuid = $1
`

func (q *Queries) GetWayCollectionsByUserId(ctx context.Context, ownerUuid uuid.UUID) ([]WayCollection, error) {
	rows, err := q.query(ctx, q.getWayCollectionsByUserIdStmt, getWayCollectionsByUserId, ownerUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []WayCollection{}
	for rows.Next() {
		var i WayCollection
		if err := rows.Scan(
			&i.Uuid,
			&i.OwnerUuid,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Name,
			&i.Type,
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

const removeWayFromMentoringCollection = `-- name: RemoveWayFromMentoringCollection :exec
DELETE FROM way_collections_ways
WHERE way_collection_uuid IN (
    SELECT uuid
    FROM way_collections
    WHERE owner_uuid = $1
    AND type = 'mentoring'
    LIMIT 1
)
AND way_uuid = $2
`

type RemoveWayFromMentoringCollectionParams struct {
	OwnerUuid uuid.UUID `json:"owner_uuid"`
	WayUuid   uuid.UUID `json:"way_uuid"`
}

func (q *Queries) RemoveWayFromMentoringCollection(ctx context.Context, arg RemoveWayFromMentoringCollectionParams) error {
	_, err := q.exec(ctx, q.removeWayFromMentoringCollectionStmt, removeWayFromMentoringCollection, arg.OwnerUuid, arg.WayUuid)
	return err
}
