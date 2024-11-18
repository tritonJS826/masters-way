package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IJobDoneRepository interface {
	CreateJobDone(ctx context.Context, arg db.CreateJobDoneParams) (db.CreateJobDoneRow, error)
	UpdateJobDone(ctx context.Context, arg db.UpdateJobDoneParams) (db.UpdateJobDoneRow, error)
	DeleteJobDone(ctx context.Context, jobDoneUuid pgtype.UUID) error
}

type JobDoneService struct {
	jobDoneRepository IJobDoneRepository
}

func NewJobDoneService(jobDoneRepository IJobDoneRepository) *JobDoneService {
	return &JobDoneService{jobDoneRepository}
}

type JobDone struct {
	ID          string
	CreatedAt   string
	UpdatedAt   string
	Description string
	Time        int32
	OwnerUuid   string
	OwnerName   string
	DayReportID string
	WayUUID     string
	WayName     string
	TagIDs      []string
}

func (js *JobDoneService) CreateJobDone(ctx context.Context, payload *schemas.CreateJobDonePayload) (*JobDone, error) {
	dayReportUUID := pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true}

	now := time.Now()
	jobDone, err := js.jobDoneRepository.CreateJobDone(ctx, db.CreateJobDoneParams{
		Description:   payload.Description,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		DayReportUuid: dayReportUUID,
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		Time:          int32(payload.Time),
	})
	if err != nil {
		return nil, err
	}

	return &JobDone{
		ID:          util.ConvertPgUUIDToUUID(jobDone.Uuid).String(),
		CreatedAt:   jobDone.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:   jobDone.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description: jobDone.Description,
		Time:        jobDone.Time,
		OwnerUuid:   util.ConvertPgUUIDToUUID(jobDone.OwnerUuid).String(),
		OwnerName:   jobDone.OwnerName,
		DayReportID: util.ConvertPgUUIDToUUID(jobDone.DayReportUuid).String(),
		WayUUID:     util.ConvertPgUUIDToUUID(jobDone.WayUuid).String(),
		WayName:     jobDone.WayName,
		TagIDs:      []string{},
	}, nil
}

type UpdateJobDoneParams struct {
	JobDoneID   string
	Description *string
	Time        *int32
}

func (js *JobDoneService) UpdateJobDone(ctx context.Context, params *UpdateJobDoneParams) (*JobDone, error) {
	now := time.Now()
	var descriptionPg pgtype.Text
	if params.Description != nil {
		descriptionPg = pgtype.Text{String: *params.Description, Valid: true}
	}
	var timePg pgtype.Int4
	if params.Time != nil {
		timePg = pgtype.Int4{Int32: *params.Time, Valid: true}
	}

	args := db.UpdateJobDoneParams{
		JobDoneUuid: pgtype.UUID{Bytes: uuid.MustParse(params.JobDoneID), Valid: true},
		Description: descriptionPg,
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
		Time:        timePg,
	}

	jobDone, err := js.jobDoneRepository.UpdateJobDone(ctx, args)
	if err != nil {
		return nil, err
	}

	return &JobDone{
		ID:          util.ConvertPgUUIDToUUID(jobDone.Uuid).String(),
		CreatedAt:   jobDone.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:   jobDone.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description: jobDone.Description,
		Time:        jobDone.Time,
		OwnerUuid:   util.ConvertPgUUIDToUUID(jobDone.OwnerUuid).String(),
		OwnerName:   jobDone.OwnerName,
		DayReportID: util.ConvertPgUUIDToUUID(jobDone.DayReportUuid).String(),
		WayUUID:     util.ConvertPgUUIDToUUID(jobDone.WayUuid).String(),
		WayName:     jobDone.WayName,
		TagIDs:      jobDone.TagUuids,
	}, nil
}

func (js *JobDoneService) DeleteJobDoneByID(ctx context.Context, jobDoneID string) error {
	return js.jobDoneRepository.DeleteJobDone(ctx, pgtype.UUID{Bytes: uuid.MustParse(jobDoneID), Valid: true})
}
