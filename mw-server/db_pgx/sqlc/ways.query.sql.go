// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: ways.query.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

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
    COALESCE(
        ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
        ),
        '{}'
    )::VARCHAR[] AS children_uuids,
    users.uuid AS owner_uuid,
    users.name AS owner_name,
    users.email AS owner_email,
    users.description AS owner_description,
    users.created_at AS owner_created_at,
    users.image_url AS owner_image_url,
    users.is_mentor AS owner_is_mentor,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = $1) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = $1 AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = $1) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = $1) AS way_day_reports_amount
FROM ways
JOIN users ON users.uuid = ways.owner_uuid
WHERE ways.uuid = $1
LIMIT 1
`

type GetWayByIdRow struct {
	Uuid                pgtype.UUID      `json:"uuid"`
	Name                string           `json:"name"`
	GoalDescription     string           `json:"goal_description"`
	UpdatedAt           pgtype.Timestamp `json:"updated_at"`
	CreatedAt           pgtype.Timestamp `json:"created_at"`
	EstimationTime      int32            `json:"estimation_time"`
	CopiedFromWayUuid   pgtype.UUID      `json:"copied_from_way_uuid"`
	IsCompleted         bool             `json:"is_completed"`
	IsPrivate           bool             `json:"is_private"`
	ChildrenUuids       []string         `json:"children_uuids"`
	OwnerUuid           pgtype.UUID      `json:"owner_uuid"`
	OwnerName           string           `json:"owner_name"`
	OwnerEmail          string           `json:"owner_email"`
	OwnerDescription    string           `json:"owner_description"`
	OwnerCreatedAt      pgtype.Timestamp `json:"owner_created_at"`
	OwnerImageUrl       string           `json:"owner_image_url"`
	OwnerIsMentor       bool             `json:"owner_is_mentor"`
	WayMetricsTotal     int64            `json:"way_metrics_total"`
	WayMetricsDone      int64            `json:"way_metrics_done"`
	WayFavoriteForUsers int64            `json:"way_favorite_for_users"`
	WayDayReportsAmount int64            `json:"way_day_reports_amount"`
}

func (q *Queries) GetWayById(ctx context.Context, wayUuid pgtype.UUID) (GetWayByIdRow, error) {
	row := q.db.QueryRow(ctx, getWayById, wayUuid)
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
		&i.ChildrenUuids,
		&i.OwnerUuid,
		&i.OwnerName,
		&i.OwnerEmail,
		&i.OwnerDescription,
		&i.OwnerCreatedAt,
		&i.OwnerImageUrl,
		&i.OwnerIsMentor,
		&i.WayMetricsTotal,
		&i.WayMetricsDone,
		&i.WayFavoriteForUsers,
		&i.WayDayReportsAmount,
	)
	return i, err
}

const getWayDetailsById = `-- name: GetWayDetailsById :one
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
    users.uuid AS owner_uuid,
    users.name AS owner_name,
    users.email AS owner_email,
    users.description AS owner_description,
    users.created_at AS owner_created_at,
    users.image_url AS owner_image_url,
    users.is_mentor AS owner_is_mentor,

    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount,
    (ARRAY(
            SELECT composite_ways.child_uuid
            FROM composite_ways
            WHERE composite_ways.parent_uuid = ways.uuid
     )::VARCHAR[]) AS children_amount,
    (SELECT COALESCE(JSON_AGG(json_build_object(
                                      'uuid', users.uuid,
                                      'name', users.name,
                                      'email', users.email,
                                      'description', users.description,
                                      'created_at', users.created_at,
                                      'image_url', users.image_url,
                                      'is_mentor', users.is_mentor
                              ) ORDER BY users.uuid), '[]'::json)
     FROM users
              JOIN mentor_users_ways ON mentor_users_ways.user_uuid = users.uuid
     WHERE mentor_users_ways.way_uuid = ways.uuid) AS mentors,

    (SELECT COALESCE(JSON_AGG(json_build_object(
                                      'uuid', way_tags.uuid,
                                      'name', way_tags.name
                              ) ORDER BY way_tags.name), '[]'::json)
     FROM way_tags
              JOIN ways_way_tags ON ways_way_tags.way_tag_uuid = way_tags.uuid
     WHERE ways_way_tags.way_uuid = ways.uuid) AS way_tags

FROM ways
         JOIN users ON users.uuid = ways.owner_uuid
WHERE ways.uuid = $1
`

type GetWayDetailsByIdRow struct {
	Uuid                pgtype.UUID      `json:"uuid"`
	Name                string           `json:"name"`
	GoalDescription     string           `json:"goal_description"`
	UpdatedAt           pgtype.Timestamp `json:"updated_at"`
	CreatedAt           pgtype.Timestamp `json:"created_at"`
	EstimationTime      int32            `json:"estimation_time"`
	CopiedFromWayUuid   pgtype.UUID      `json:"copied_from_way_uuid"`
	IsCompleted         bool             `json:"is_completed"`
	IsPrivate           bool             `json:"is_private"`
	OwnerUuid           pgtype.UUID      `json:"owner_uuid"`
	OwnerName           string           `json:"owner_name"`
	OwnerEmail          string           `json:"owner_email"`
	OwnerDescription    string           `json:"owner_description"`
	OwnerCreatedAt      pgtype.Timestamp `json:"owner_created_at"`
	OwnerImageUrl       string           `json:"owner_image_url"`
	OwnerIsMentor       bool             `json:"owner_is_mentor"`
	WayMetricsTotal     int64            `json:"way_metrics_total"`
	WayMetricsDone      int64            `json:"way_metrics_done"`
	WayFavoriteForUsers int64            `json:"way_favorite_for_users"`
	WayDayReportsAmount int64            `json:"way_day_reports_amount"`
	ChildrenAmount      []string         `json:"children_amount"`
	Mentors             interface{}      `json:"mentors"`
	WayTags             interface{}      `json:"way_tags"`
}

func (q *Queries) GetWayDetailsById(ctx context.Context, uuid pgtype.UUID) (GetWayDetailsByIdRow, error) {
	row := q.db.QueryRow(ctx, getWayDetailsById, uuid)
	var i GetWayDetailsByIdRow
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
		&i.OwnerUuid,
		&i.OwnerName,
		&i.OwnerEmail,
		&i.OwnerDescription,
		&i.OwnerCreatedAt,
		&i.OwnerImageUrl,
		&i.OwnerIsMentor,
		&i.WayMetricsTotal,
		&i.WayMetricsDone,
		&i.WayFavoriteForUsers,
		&i.WayDayReportsAmount,
		&i.ChildrenAmount,
		&i.Mentors,
		&i.WayTags,
	)
	return i, err
}
