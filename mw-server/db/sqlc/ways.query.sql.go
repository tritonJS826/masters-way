// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: ways.query.sql

package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

const countWaysByType = `-- name: CountWaysByType :one
SELECT COUNT(*) FROM ways
WHERE ways.is_private = false AND (
    ($2 = 'inProgress' 
        AND ways.is_completed = false 
        AND ways.updated_at > ($1::timestamp - interval '14 days'))
    OR ($2 = 'completed' AND ways.is_completed = true)
    OR ($2 = 'abandoned' 
        AND (ways.is_completed = false) 
        AND (ways.updated_at < ($1::timestamp - interval '14 days'))
    ) 
    OR ($2 = 'all')
)
`

type CountWaysByTypeParams struct {
	Column1   time.Time   `json:"column_1"`
	WayStatus interface{} `json:"way_status"`
}

func (q *Queries) CountWaysByType(ctx context.Context, arg CountWaysByTypeParams) (int64, error) {
	row := q.queryRow(ctx, q.countWaysByTypeStmt, countWaysByType, arg.Column1, arg.WayStatus)
	var count int64
	err := row.Scan(&count)
	return count, err
}

const createWay = `-- name: CreateWay :one
INSERT INTO ways(
    name,
    goal_description,
    updated_at,
    created_at,
    estimation_time,
    copied_from_way_uuid,
    is_private,
    is_completed,
    owner_uuid
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9
) RETURNING uuid, name, goal_description, updated_at, created_at, estimation_time, owner_uuid, copied_from_way_uuid, is_completed, is_private
`

type CreateWayParams struct {
	Name              string        `json:"name"`
	GoalDescription   string        `json:"goal_description"`
	UpdatedAt         time.Time     `json:"updated_at"`
	CreatedAt         time.Time     `json:"created_at"`
	EstimationTime    int32         `json:"estimation_time"`
	CopiedFromWayUuid uuid.NullUUID `json:"copied_from_way_uuid"`
	IsPrivate         bool          `json:"is_private"`
	IsCompleted       bool          `json:"is_completed"`
	OwnerUuid         uuid.UUID     `json:"owner_uuid"`
}

func (q *Queries) CreateWay(ctx context.Context, arg CreateWayParams) (Way, error) {
	row := q.queryRow(ctx, q.createWayStmt, createWay,
		arg.Name,
		arg.GoalDescription,
		arg.UpdatedAt,
		arg.CreatedAt,
		arg.EstimationTime,
		arg.CopiedFromWayUuid,
		arg.IsPrivate,
		arg.IsCompleted,
		arg.OwnerUuid,
	)
	var i Way
	err := row.Scan(
		&i.Uuid,
		&i.Name,
		&i.GoalDescription,
		&i.UpdatedAt,
		&i.CreatedAt,
		&i.EstimationTime,
		&i.OwnerUuid,
		&i.CopiedFromWayUuid,
		&i.IsCompleted,
		&i.IsPrivate,
	)
	return i, err
}

const deleteWay = `-- name: DeleteWay :exec
DELETE FROM ways
WHERE uuid = $1
`

func (q *Queries) DeleteWay(ctx context.Context, argUuid uuid.UUID) error {
	_, err := q.exec(ctx, q.deleteWayStmt, deleteWay, argUuid)
	return err
}

const getFavoriteWaysByUserId = `-- name: GetFavoriteWaysByUserId :many
SELECT
    ways.uuid,
    ways.name,
    ways.owner_uuid, 
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid 
        FROM composite_ways 
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
JOIN favorite_users_ways ON favorite_users_ways.way_uuid = ways.uuid
WHERE favorite_users_ways.user_uuid = $1
ORDER BY ways.updated_at DESC
`

type GetFavoriteWaysByUserIdRow struct {
	Uuid                uuid.UUID     `json:"uuid"`
	Name                string        `json:"name"`
	OwnerUuid           uuid.UUID     `json:"owner_uuid"`
	GoalDescription     string        `json:"goal_description"`
	UpdatedAt           time.Time     `json:"updated_at"`
	CreatedAt           time.Time     `json:"created_at"`
	EstimationTime      int32         `json:"estimation_time"`
	CopiedFromWayUuid   uuid.NullUUID `json:"copied_from_way_uuid"`
	IsCompleted         bool          `json:"is_completed"`
	IsPrivate           bool          `json:"is_private"`
	WayMetricsTotal     int64         `json:"way_metrics_total"`
	WayMetricsDone      int64         `json:"way_metrics_done"`
	WayFavoriteForUsers int64         `json:"way_favorite_for_users"`
	WayDayReportsAmount int64         `json:"way_day_reports_amount"`
	ChildrenUuids       []string      `json:"children_uuids"`
}

func (q *Queries) GetFavoriteWaysByUserId(ctx context.Context, userUuid uuid.UUID) ([]GetFavoriteWaysByUserIdRow, error) {
	rows, err := q.query(ctx, q.getFavoriteWaysByUserIdStmt, getFavoriteWaysByUserId, userUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetFavoriteWaysByUserIdRow{}
	for rows.Next() {
		var i GetFavoriteWaysByUserIdRow
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.OwnerUuid,
			&i.GoalDescription,
			&i.UpdatedAt,
			&i.CreatedAt,
			&i.EstimationTime,
			&i.CopiedFromWayUuid,
			&i.IsCompleted,
			&i.IsPrivate,
			&i.WayMetricsTotal,
			&i.WayMetricsDone,
			&i.WayFavoriteForUsers,
			&i.WayDayReportsAmount,
			pq.Array(&i.ChildrenUuids),
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

const getMentoringWaysByMentorId = `-- name: GetMentoringWaysByMentorId :many
SELECT
    ways.uuid,
    ways.name,
    ways.owner_uuid, 
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid 
        FROM composite_ways 
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
JOIN mentor_users_ways ON mentor_users_ways.way_uuid = ways.uuid
WHERE mentor_users_ways.user_uuid = $1
ORDER BY ways.updated_at DESC
`

type GetMentoringWaysByMentorIdRow struct {
	Uuid                uuid.UUID     `json:"uuid"`
	Name                string        `json:"name"`
	OwnerUuid           uuid.UUID     `json:"owner_uuid"`
	GoalDescription     string        `json:"goal_description"`
	UpdatedAt           time.Time     `json:"updated_at"`
	CreatedAt           time.Time     `json:"created_at"`
	EstimationTime      int32         `json:"estimation_time"`
	CopiedFromWayUuid   uuid.NullUUID `json:"copied_from_way_uuid"`
	IsCompleted         bool          `json:"is_completed"`
	IsPrivate           bool          `json:"is_private"`
	WayMetricsTotal     int64         `json:"way_metrics_total"`
	WayMetricsDone      int64         `json:"way_metrics_done"`
	WayFavoriteForUsers int64         `json:"way_favorite_for_users"`
	WayDayReportsAmount int64         `json:"way_day_reports_amount"`
	ChildrenUuids       []string      `json:"children_uuids"`
}

func (q *Queries) GetMentoringWaysByMentorId(ctx context.Context, userUuid uuid.UUID) ([]GetMentoringWaysByMentorIdRow, error) {
	rows, err := q.query(ctx, q.getMentoringWaysByMentorIdStmt, getMentoringWaysByMentorId, userUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetMentoringWaysByMentorIdRow{}
	for rows.Next() {
		var i GetMentoringWaysByMentorIdRow
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.OwnerUuid,
			&i.GoalDescription,
			&i.UpdatedAt,
			&i.CreatedAt,
			&i.EstimationTime,
			&i.CopiedFromWayUuid,
			&i.IsCompleted,
			&i.IsPrivate,
			&i.WayMetricsTotal,
			&i.WayMetricsDone,
			&i.WayFavoriteForUsers,
			&i.WayDayReportsAmount,
			pq.Array(&i.ChildrenUuids),
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

const getOwnWaysByUserId = `-- name: GetOwnWaysByUserId :many
SELECT 
    ways.uuid,
    ways.name,
    ways.owner_uuid, 
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid 
        FROM composite_ways 
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
WHERE ways.owner_uuid = $1
ORDER BY ways.updated_at DESC
`

type GetOwnWaysByUserIdRow struct {
	Uuid                uuid.UUID     `json:"uuid"`
	Name                string        `json:"name"`
	OwnerUuid           uuid.UUID     `json:"owner_uuid"`
	GoalDescription     string        `json:"goal_description"`
	UpdatedAt           time.Time     `json:"updated_at"`
	CreatedAt           time.Time     `json:"created_at"`
	EstimationTime      int32         `json:"estimation_time"`
	CopiedFromWayUuid   uuid.NullUUID `json:"copied_from_way_uuid"`
	IsCompleted         bool          `json:"is_completed"`
	IsPrivate           bool          `json:"is_private"`
	WayMetricsTotal     int64         `json:"way_metrics_total"`
	WayMetricsDone      int64         `json:"way_metrics_done"`
	WayFavoriteForUsers int64         `json:"way_favorite_for_users"`
	WayDayReportsAmount int64         `json:"way_day_reports_amount"`
	ChildrenUuids       []string      `json:"children_uuids"`
}

func (q *Queries) GetOwnWaysByUserId(ctx context.Context, ownerUuid uuid.UUID) ([]GetOwnWaysByUserIdRow, error) {
	rows, err := q.query(ctx, q.getOwnWaysByUserIdStmt, getOwnWaysByUserId, ownerUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetOwnWaysByUserIdRow{}
	for rows.Next() {
		var i GetOwnWaysByUserIdRow
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.OwnerUuid,
			&i.GoalDescription,
			&i.UpdatedAt,
			&i.CreatedAt,
			&i.EstimationTime,
			&i.CopiedFromWayUuid,
			&i.IsCompleted,
			&i.IsPrivate,
			&i.WayMetricsTotal,
			&i.WayMetricsDone,
			&i.WayFavoriteForUsers,
			&i.WayDayReportsAmount,
			pq.Array(&i.ChildrenUuids),
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

const getWayById = `-- name: GetWayById :one
SELECT 
    ways.uuid,
    ways.name,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (ARRAY(
        SELECT composite_ways.child_uuid 
        FROM composite_ways 
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids,
    users.uuid AS owner_uuid,
    users.name AS owner_name,
    users.email AS owner_email,
    users.description AS owner_description,
    users.created_at AS owner_created_at,
    users.image_url AS owner_image_url,
    users.is_mentor AS owner_is_mentor
FROM ways
JOIN users ON users.uuid = ways.owner_uuid
WHERE ways.uuid = $1
LIMIT 1
`

type GetWayByIdRow struct {
	Uuid              uuid.UUID      `json:"uuid"`
	Name              string         `json:"name"`
	GoalDescription   string         `json:"goal_description"`
	UpdatedAt         time.Time      `json:"updated_at"`
	CreatedAt         time.Time      `json:"created_at"`
	EstimationTime    int32          `json:"estimation_time"`
	CopiedFromWayUuid uuid.NullUUID  `json:"copied_from_way_uuid"`
	IsCompleted       bool           `json:"is_completed"`
	IsPrivate         bool           `json:"is_private"`
	ChildrenUuids     []string       `json:"children_uuids"`
	OwnerUuid         uuid.UUID      `json:"owner_uuid"`
	OwnerName         string         `json:"owner_name"`
	OwnerEmail        string         `json:"owner_email"`
	OwnerDescription  string         `json:"owner_description"`
	OwnerCreatedAt    time.Time      `json:"owner_created_at"`
	OwnerImageUrl     sql.NullString `json:"owner_image_url"`
	OwnerIsMentor     bool           `json:"owner_is_mentor"`
}

func (q *Queries) GetWayById(ctx context.Context, argUuid uuid.UUID) (GetWayByIdRow, error) {
	row := q.queryRow(ctx, q.getWayByIdStmt, getWayById, argUuid)
	var i GetWayByIdRow
	err := row.Scan(
		&i.Uuid,
		&i.Name,
		&i.GoalDescription,
		&i.UpdatedAt,
		&i.CreatedAt,
		&i.EstimationTime,
		&i.CopiedFromWayUuid,
		&i.IsCompleted,
		&i.IsPrivate,
		pq.Array(&i.ChildrenUuids),
		&i.OwnerUuid,
		&i.OwnerName,
		&i.OwnerEmail,
		&i.OwnerDescription,
		&i.OwnerCreatedAt,
		&i.OwnerImageUrl,
		&i.OwnerIsMentor,
	)
	return i, err
}

const getWaysByCollectionId = `-- name: GetWaysByCollectionId :many
SELECT 
    ways.uuid,
    ways.name,
    ways.owner_uuid, 
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid 
        FROM composite_ways 
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
JOIN way_collections_ways ON way_collections_ways.way_uuid = ways.uuid
WHERE way_collections_ways.way_collection_uuid = $1
ORDER BY ways.updated_at DESC
`

type GetWaysByCollectionIdRow struct {
	Uuid                uuid.UUID     `json:"uuid"`
	Name                string        `json:"name"`
	OwnerUuid           uuid.UUID     `json:"owner_uuid"`
	GoalDescription     string        `json:"goal_description"`
	UpdatedAt           time.Time     `json:"updated_at"`
	CreatedAt           time.Time     `json:"created_at"`
	EstimationTime      int32         `json:"estimation_time"`
	CopiedFromWayUuid   uuid.NullUUID `json:"copied_from_way_uuid"`
	IsCompleted         bool          `json:"is_completed"`
	IsPrivate           bool          `json:"is_private"`
	WayMetricsTotal     int64         `json:"way_metrics_total"`
	WayMetricsDone      int64         `json:"way_metrics_done"`
	WayFavoriteForUsers int64         `json:"way_favorite_for_users"`
	WayDayReportsAmount int64         `json:"way_day_reports_amount"`
	ChildrenUuids       []string      `json:"children_uuids"`
}

func (q *Queries) GetWaysByCollectionId(ctx context.Context, wayCollectionUuid uuid.UUID) ([]GetWaysByCollectionIdRow, error) {
	rows, err := q.query(ctx, q.getWaysByCollectionIdStmt, getWaysByCollectionId, wayCollectionUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetWaysByCollectionIdRow{}
	for rows.Next() {
		var i GetWaysByCollectionIdRow
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.OwnerUuid,
			&i.GoalDescription,
			&i.UpdatedAt,
			&i.CreatedAt,
			&i.EstimationTime,
			&i.CopiedFromWayUuid,
			&i.IsCompleted,
			&i.IsPrivate,
			&i.WayMetricsTotal,
			&i.WayMetricsDone,
			&i.WayFavoriteForUsers,
			&i.WayDayReportsAmount,
			pq.Array(&i.ChildrenUuids),
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

const listWays = `-- name: ListWays :many
SELECT 
    uuid, name, goal_description, updated_at, created_at, estimation_time, owner_uuid, copied_from_way_uuid, is_completed, is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid 
        FROM composite_ways 
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
FROM ways
WHERE ways.is_private = false AND 
    (
        ($3 = 'inProgress' AND ways.is_completed = false AND ways.updated_at > $4::timestamp - interval '14 days')
    OR ($3 = 'completed' AND ways.is_completed = true)
    OR ($3 = 'abandoned' AND ways.is_completed = false AND ways.updated_at < $4::timestamp - interval '14 days') 
    OR ($3 = 'all')
    )
ORDER BY created_at DESC
LIMIT $1
OFFSET $2
`

type ListWaysParams struct {
	Limit   int32       `json:"limit"`
	Offset  int32       `json:"offset"`
	Column3 interface{} `json:"column_3"`
	Column4 time.Time   `json:"column_4"`
}

type ListWaysRow struct {
	Uuid                uuid.UUID     `json:"uuid"`
	Name                string        `json:"name"`
	GoalDescription     string        `json:"goal_description"`
	UpdatedAt           time.Time     `json:"updated_at"`
	CreatedAt           time.Time     `json:"created_at"`
	EstimationTime      int32         `json:"estimation_time"`
	OwnerUuid           uuid.UUID     `json:"owner_uuid"`
	CopiedFromWayUuid   uuid.NullUUID `json:"copied_from_way_uuid"`
	IsCompleted         bool          `json:"is_completed"`
	IsPrivate           bool          `json:"is_private"`
	WayMetricsTotal     int64         `json:"way_metrics_total"`
	WayMetricsDone      int64         `json:"way_metrics_done"`
	WayFavoriteForUsers int64         `json:"way_favorite_for_users"`
	WayDayReportsAmount int64         `json:"way_day_reports_amount"`
	ChildrenUuids       []string      `json:"children_uuids"`
}

func (q *Queries) ListWays(ctx context.Context, arg ListWaysParams) ([]ListWaysRow, error) {
	rows, err := q.query(ctx, q.listWaysStmt, listWays,
		arg.Limit,
		arg.Offset,
		arg.Column3,
		arg.Column4,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []ListWaysRow{}
	for rows.Next() {
		var i ListWaysRow
		if err := rows.Scan(
			&i.Uuid,
			&i.Name,
			&i.GoalDescription,
			&i.UpdatedAt,
			&i.CreatedAt,
			&i.EstimationTime,
			&i.OwnerUuid,
			&i.CopiedFromWayUuid,
			&i.IsCompleted,
			&i.IsPrivate,
			&i.WayMetricsTotal,
			&i.WayMetricsDone,
			&i.WayFavoriteForUsers,
			&i.WayDayReportsAmount,
			pq.Array(&i.ChildrenUuids),
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

const updateWay = `-- name: UpdateWay :one
UPDATE ways
SET
name = coalesce($1, name),
goal_description = coalesce($2, goal_description),
updated_at = coalesce($3, updated_at),
estimation_time = coalesce($4, estimation_time),
is_private = coalesce($5, is_private),
is_completed = coalesce($6, is_completed)

WHERE ways.uuid = $7
RETURNING uuid, name, goal_description, updated_at, created_at, estimation_time, owner_uuid, copied_from_way_uuid, is_completed, is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = $7) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = $7 AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = $7) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = $7) AS way_day_reports_amount,
    (ARRAY(
        SELECT composite_ways.child_uuid 
        FROM composite_ways 
        WHERE composite_ways.parent_uuid = ways.uuid
    )::VARCHAR[]) AS children_uuids
`

type UpdateWayParams struct {
	Name            sql.NullString `json:"name"`
	GoalDescription sql.NullString `json:"goal_description"`
	UpdatedAt       sql.NullTime   `json:"updated_at"`
	EstimationTime  sql.NullInt32  `json:"estimation_time"`
	IsPrivate       sql.NullBool   `json:"is_private"`
	IsCompleted     sql.NullBool   `json:"is_completed"`
	Uuid            uuid.UUID      `json:"uuid"`
}

type UpdateWayRow struct {
	Uuid                uuid.UUID     `json:"uuid"`
	Name                string        `json:"name"`
	GoalDescription     string        `json:"goal_description"`
	UpdatedAt           time.Time     `json:"updated_at"`
	CreatedAt           time.Time     `json:"created_at"`
	EstimationTime      int32         `json:"estimation_time"`
	OwnerUuid           uuid.UUID     `json:"owner_uuid"`
	CopiedFromWayUuid   uuid.NullUUID `json:"copied_from_way_uuid"`
	IsCompleted         bool          `json:"is_completed"`
	IsPrivate           bool          `json:"is_private"`
	WayMetricsTotal     int64         `json:"way_metrics_total"`
	WayMetricsDone      int64         `json:"way_metrics_done"`
	WayFavoriteForUsers int64         `json:"way_favorite_for_users"`
	WayDayReportsAmount int64         `json:"way_day_reports_amount"`
	ChildrenUuids       []string      `json:"children_uuids"`
}

func (q *Queries) UpdateWay(ctx context.Context, arg UpdateWayParams) (UpdateWayRow, error) {
	row := q.queryRow(ctx, q.updateWayStmt, updateWay,
		arg.Name,
		arg.GoalDescription,
		arg.UpdatedAt,
		arg.EstimationTime,
		arg.IsPrivate,
		arg.IsCompleted,
		arg.Uuid,
	)
	var i UpdateWayRow
	err := row.Scan(
		&i.Uuid,
		&i.Name,
		&i.GoalDescription,
		&i.UpdatedAt,
		&i.CreatedAt,
		&i.EstimationTime,
		&i.OwnerUuid,
		&i.CopiedFromWayUuid,
		&i.IsCompleted,
		&i.IsPrivate,
		&i.WayMetricsTotal,
		&i.WayMetricsDone,
		&i.WayFavoriteForUsers,
		&i.WayDayReportsAmount,
		pq.Array(&i.ChildrenUuids),
	)
	return i, err
}
