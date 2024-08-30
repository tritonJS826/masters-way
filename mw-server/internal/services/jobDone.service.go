package services

import (
	"context"
	db "mwserver/internal/db/sqlc"
	"mwserver/internal/schemas"
	"mwserver/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type IJobDoneRepository interface {
	CreateJobDone(ctx context.Context, arg db.CreateJobDoneParams) (db.CreateJobDoneRow, error)
	UpdateJobDone(ctx context.Context, arg db.UpdateJobDoneParams) (db.UpdateJobDoneRow, error)
	DeleteJobDone(ctx context.Context, jobDoneUuid pgtype.UUID) error
	GetListLabelsByLabelUuids(ctx context.Context, jobTagUuids []pgtype.UUID) ([]db.JobTag, error)
}

type JobDoneService struct {
	jobDoneRepository IJobDoneRepository
}

func NewJobDoneService(jobDoneRepository IJobDoneRepository) *JobDoneService {
	return &JobDoneService{jobDoneRepository}
}

func (jds *JobDoneService) CreateJobDone(ctx context.Context, payload *schemas.CreateJobDonePayload) (*schemas.JobDonePopulatedResponse, error) {
	dayReportUUID := pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true}

	now := time.Now()
	jobDone, err := jds.jobDoneRepository.CreateJobDone(ctx, db.CreateJobDoneParams{
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

	return &schemas.JobDonePopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(jobDone.Uuid).String(),
		CreatedAt:     jobDone.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     jobDone.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     util.ConvertPgUUIDToUUID(jobDone.OwnerUuid).String(),
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: util.ConvertPgUUIDToUUID(jobDone.DayReportUuid).String(),
		WayUUID:       util.ConvertPgUUIDToUUID(jobDone.WayUuid).String(),
		WayName:       jobDone.WayName,
		Tags:          []schemas.JobTagResponse{},
	}, nil
}

type UpdateJobDoneParams struct {
	JobDoneID   string
	Description *string
	Time        *int32
}

func (jds *JobDoneService) UpdateJobDone(ctx context.Context, params *UpdateJobDoneParams) (*schemas.JobDonePopulatedResponse, error) {
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

	jobDone, err := jds.jobDoneRepository.UpdateJobDone(ctx, args)
	if err != nil {
		return nil, err
	}

	tagUuids := lo.Map(jobDone.TagUuids, func(stringifiedUuid string, i int) pgtype.UUID {
		return pgtype.UUID{Bytes: uuid.MustParse(stringifiedUuid), Valid: true}
	})

	dbTags, _ := jds.jobDoneRepository.GetListLabelsByLabelUuids(ctx, tagUuids)
	tags := lo.Map(dbTags, func(dbTag db.JobTag, i int) schemas.JobTagResponse {
		return schemas.JobTagResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbTag.Uuid).String(),
			Name:        dbTag.Name,
			Description: dbTag.Description,
			Color:       dbTag.Color,
		}
	})

	return &schemas.JobDonePopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(jobDone.Uuid).String(),
		CreatedAt:     jobDone.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     jobDone.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   jobDone.Description,
		Time:          jobDone.Time,
		OwnerUuid:     util.ConvertPgUUIDToUUID(jobDone.OwnerUuid).String(),
		OwnerName:     jobDone.OwnerName,
		DayReportUuid: util.ConvertPgUUIDToUUID(jobDone.DayReportUuid).String(),
		WayUUID:       util.ConvertPgUUIDToUUID(jobDone.WayUuid).String(),
		WayName:       jobDone.WayName,
		Tags:          tags,
	}, nil
}

func (jds *JobDoneService) DeleteJobDoneById(ctx context.Context, jobDoneID string) error {
	return jds.jobDoneRepository.DeleteJobDone(ctx, pgtype.UUID{Bytes: uuid.MustParse(jobDoneID), Valid: true})
}
