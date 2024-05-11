// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: metrics.query.sql

package db

import (
	"context"
	"database/sql"
	"time"

	"github.com/google/uuid"
)

const createMetric = `-- name: CreateMetric :one
INSERT INTO metrics(
    updated_at,
    description,
    is_done,
    done_date,
    metric_estimation,
    way_uuid
) VALUES (
    $1, $2, $3, $4, $5, $6
) RETURNING uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid
`

type CreateMetricParams struct {
	UpdatedAt        time.Time    `json:"updated_at"`
	Description      string       `json:"description"`
	IsDone           bool         `json:"is_done"`
	DoneDate         sql.NullTime `json:"done_date"`
	MetricEstimation int32        `json:"metric_estimation"`
	WayUuid          uuid.UUID    `json:"way_uuid"`
}

func (q *Queries) CreateMetric(ctx context.Context, arg CreateMetricParams) (Metric, error) {
	row := q.queryRow(ctx, q.createMetricStmt, createMetric,
		arg.UpdatedAt,
		arg.Description,
		arg.IsDone,
		arg.DoneDate,
		arg.MetricEstimation,
		arg.WayUuid,
	)
	var i Metric
	err := row.Scan(
		&i.Uuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Description,
		&i.IsDone,
		&i.DoneDate,
		&i.MetricEstimation,
		&i.WayUuid,
	)
	return i, err
}

const deleteMetric = `-- name: DeleteMetric :exec
DELETE FROM metrics
WHERE uuid = $1
`

func (q *Queries) DeleteMetric(ctx context.Context, argUuid uuid.UUID) error {
	_, err := q.exec(ctx, q.deleteMetricStmt, deleteMetric, argUuid)
	return err
}

const getListMetricsByWayUuid = `-- name: GetListMetricsByWayUuid :many
SELECT uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid FROM metrics
WHERE metrics.way_uuid = $1
ORDER BY created_at
`

func (q *Queries) GetListMetricsByWayUuid(ctx context.Context, wayUuid uuid.UUID) ([]Metric, error) {
	rows, err := q.query(ctx, q.getListMetricsByWayUuidStmt, getListMetricsByWayUuid, wayUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []Metric{}
	for rows.Next() {
		var i Metric
		if err := rows.Scan(
			&i.Uuid,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Description,
			&i.IsDone,
			&i.DoneDate,
			&i.MetricEstimation,
			&i.WayUuid,
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

const updateMetric = `-- name: UpdateMetric :one
UPDATE metrics
SET
updated_at = coalesce($1, updated_at),
description = coalesce($2, description),
is_done = coalesce($3, is_done),
done_date = coalesce($4, done_date), 
metric_estimation = coalesce($5, metric_estimation)
WHERE uuid = $6
RETURNING uuid, created_at, updated_at, description, is_done, done_date, metric_estimation, way_uuid
`

type UpdateMetricParams struct {
	UpdatedAt        sql.NullTime   `json:"updated_at"`
	Description      sql.NullString `json:"description"`
	IsDone           sql.NullBool   `json:"is_done"`
	DoneDate         sql.NullTime   `json:"done_date"`
	MetricEstimation sql.NullInt32  `json:"metric_estimation"`
	Uuid             uuid.UUID      `json:"uuid"`
}

func (q *Queries) UpdateMetric(ctx context.Context, arg UpdateMetricParams) (Metric, error) {
	row := q.queryRow(ctx, q.updateMetricStmt, updateMetric,
		arg.UpdatedAt,
		arg.Description,
		arg.IsDone,
		arg.DoneDate,
		arg.MetricEstimation,
		arg.Uuid,
	)
	var i Metric
	err := row.Scan(
		&i.Uuid,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Description,
		&i.IsDone,
		&i.DoneDate,
		&i.MetricEstimation,
		&i.WayUuid,
	)
	return i, err
}
