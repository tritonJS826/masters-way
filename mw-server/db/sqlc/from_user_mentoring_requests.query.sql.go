// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: from_user_mentoring_requests.query.sql

package db

import (
	"context"
	"time"

	"github.com/google/uuid"
)

const createFromUserMentoringRequest = `-- name: CreateFromUserMentoringRequest :one
INSERT INTO from_user_mentoring_requests(
    user_uuid,
    way_uuid
) VALUES (
    $1, $2
) RETURNING user_uuid, way_uuid
`

type CreateFromUserMentoringRequestParams struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

func (q *Queries) CreateFromUserMentoringRequest(ctx context.Context, arg CreateFromUserMentoringRequestParams) (FromUserMentoringRequest, error) {
	row := q.queryRow(ctx, q.createFromUserMentoringRequestStmt, createFromUserMentoringRequest, arg.UserUuid, arg.WayUuid)
	var i FromUserMentoringRequest
	err := row.Scan(&i.UserUuid, &i.WayUuid)
	return i, err
}

const deleteFromUserMentoringRequestByIds = `-- name: DeleteFromUserMentoringRequestByIds :exec
DELETE FROM from_user_mentoring_requests
WHERE user_uuid = $1 AND way_uuid = $2
`

type DeleteFromUserMentoringRequestByIdsParams struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

func (q *Queries) DeleteFromUserMentoringRequestByIds(ctx context.Context, arg DeleteFromUserMentoringRequestByIdsParams) error {
	_, err := q.exec(ctx, q.deleteFromUserMentoringRequestByIdsStmt, deleteFromUserMentoringRequestByIds, arg.UserUuid, arg.WayUuid)
	return err
}

const getFromUserMentoringRequestWaysByUserId = `-- name: GetFromUserMentoringRequestWaysByUserId :many
SELECT 
    ways.uuid,
    ways.name,
    ways.goal_description,
    ways.updated_at,
    ways.created_at,
    ways.estimation_time,
    ways.owner_uuid,
    ways.copied_from_way_uuid,
    ways.is_completed,
    ways.is_private,
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid) AS way_metrics_total,    
    (SELECT COUNT(*) FROM metrics WHERE metrics.way_uuid = ways.uuid AND metrics.is_done = true) AS way_metrics_done,
    (SELECT COUNT(*) FROM favorite_users_ways WHERE favorite_users_ways.way_uuid = ways.uuid) AS way_favorite_for_users,
    (SELECT COUNT(*) FROM day_reports WHERE day_reports.way_uuid = ways.uuid) AS way_day_reports_amount
FROM from_user_mentoring_requests
JOIN ways 
    ON $1 = from_user_mentoring_requests.user_uuid 
    AND from_user_mentoring_requests.way_uuid = ways.uuid
`

type GetFromUserMentoringRequestWaysByUserIdRow struct {
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
}

func (q *Queries) GetFromUserMentoringRequestWaysByUserId(ctx context.Context, userUuid uuid.UUID) ([]GetFromUserMentoringRequestWaysByUserIdRow, error) {
	rows, err := q.query(ctx, q.getFromUserMentoringRequestWaysByUserIdStmt, getFromUserMentoringRequestWaysByUserId, userUuid)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	items := []GetFromUserMentoringRequestWaysByUserIdRow{}
	for rows.Next() {
		var i GetFromUserMentoringRequestWaysByUserIdRow
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

const getFromUserMentoringRequestWaysByWayId = `-- name: GetFromUserMentoringRequestWaysByWayId :many
SELECT 
    users.uuid, users.name, users.email, users.description, users.created_at, users.image_url, users.is_mentor, users.firebase_id
FROM from_user_mentoring_requests
JOIN users
    ON $1 = from_user_mentoring_requests.way_uuid 
    AND from_user_mentoring_requests.user_uuid = users.uuid
WHERE ways.uuid = $1
`

func (q *Queries) GetFromUserMentoringRequestWaysByWayId(ctx context.Context, wayUuid uuid.UUID) ([]User, error) {
	rows, err := q.query(ctx, q.getFromUserMentoringRequestWaysByWayIdStmt, getFromUserMentoringRequestWaysByWayId, wayUuid)
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
