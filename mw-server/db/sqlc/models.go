// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package db

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Comment struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Description   string    `json:"description"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
}

type DayReport struct {
	Uuid      uuid.UUID `json:"uuid"`
	WayUuid   uuid.UUID `json:"way_uuid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	IsDayOff  bool      `json:"is_day_off"`
}

type FavoriteUser struct {
	DonorUserUuid    uuid.UUID `json:"donor_user_uuid"`
	AcceptorUserUuid uuid.UUID `json:"acceptor_user_uuid"`
}

type FavoriteUsersWay struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

type FormerMentorsWay struct {
	FormerMentorUuid uuid.UUID `json:"former_mentor_uuid"`
	WayUuid          uuid.UUID `json:"way_uuid"`
}

type FromUserMentoringRequest struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

type JobDone struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Description   string    `json:"description"`
	Time          int32     `json:"time"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
}

type JobDonesJobTag struct {
	JobDoneUuid uuid.UUID `json:"job_done_uuid"`
	JobTagUuid  uuid.UUID `json:"job_tag_uuid"`
}

type JobTag struct {
	Uuid        uuid.UUID `json:"uuid"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Color       string    `json:"color"`
	WayUuid     uuid.UUID `json:"way_uuid"`
}

type MentorUsersWay struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

type Metric struct {
	Uuid             uuid.UUID    `json:"uuid"`
	CreatedAt        time.Time    `json:"created_at"`
	UpdatedAt        time.Time    `json:"updated_at"`
	Description      string       `json:"description"`
	IsDone           bool         `json:"is_done"`
	DoneDate         sql.NullTime `json:"done_date"`
	MetricEstimation int32        `json:"metric_estimation"`
	WayUuid          uuid.UUID    `json:"way_uuid"`
}

type Plan struct {
	Uuid           uuid.UUID `json:"uuid"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
	Job            string    `json:"job"`
	EstimationTime int32     `json:"estimation_time"`
	OwnerUuid      uuid.UUID `json:"owner_uuid"`
	IsDone         bool      `json:"is_done"`
	DayReportUuid  uuid.UUID `json:"day_report_uuid"`
}

type PlansJobTag struct {
	PlanUuid   uuid.UUID `json:"plan_uuid"`
	JobTagUuid uuid.UUID `json:"job_tag_uuid"`
}

type Problem struct {
	Uuid          uuid.UUID `json:"uuid"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
	Description   string    `json:"description"`
	IsDone        bool      `json:"is_done"`
	OwnerUuid     uuid.UUID `json:"owner_uuid"`
	DayReportUuid uuid.UUID `json:"day_report_uuid"`
}

type ProblemsJobTag struct {
	ProblemUuid uuid.UUID `json:"problem_uuid"`
	JobTagUuid  uuid.UUID `json:"job_tag_uuid"`
}

type ToUserMentoringRequest struct {
	UserUuid uuid.UUID `json:"user_uuid"`
	WayUuid  uuid.UUID `json:"way_uuid"`
}

type User struct {
	Uuid        uuid.UUID      `json:"uuid"`
	Name        string         `json:"name"`
	Email       string         `json:"email"`
	Description string         `json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	ImageUrl    sql.NullString `json:"image_url"`
	IsMentor    bool           `json:"is_mentor"`
}

type UserTag struct {
	Uuid uuid.UUID `json:"uuid"`
	Name string    `json:"name"`
}

type UsersUserTag struct {
	UserUuid    uuid.UUID `json:"user_uuid"`
	UserTagUuid uuid.UUID `json:"user_tag_uuid"`
}

type Way struct {
	Uuid              uuid.UUID     `json:"uuid"`
	Name              string        `json:"name"`
	GoalDescription   string        `json:"goal_description"`
	UpdatedAt         time.Time     `json:"updated_at"`
	CreatedAt         time.Time     `json:"created_at"`
	EstimationTime    int32         `json:"estimation_time"`
	OwnerUuid         uuid.UUID     `json:"owner_uuid"`
	CopiedFromWayUuid uuid.NullUUID `json:"copied_from_way_uuid"`
	Status            string        `json:"status"`
	IsPrivate         bool          `json:"is_private"`
}

type WayCollection struct {
	Uuid      uuid.UUID `json:"uuid"`
	OwnerUuid uuid.UUID `json:"owner_uuid"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name      string    `json:"name"`
}

type WayCollectionsWay struct {
	WayCollectionsUuid uuid.UUID `json:"way_collections_uuid"`
	WayUuid            uuid.UUID `json:"way_uuid"`
}

type WayTag struct {
	Uuid uuid.UUID `json:"uuid"`
	Name string    `json:"name"`
}

type WaysWayTag struct {
	WayUuid    uuid.UUID `json:"way_uuid"`
	WayTagUuid uuid.UUID `json:"way_tag_uuid"`
}
