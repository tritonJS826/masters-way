package services

import (
	"context"
	db "mwserver/internal/db/sqlc"
	"mwserver/internal/schemas"
	"mwserver/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IJobTagRepository interface {
	CreateJobTag(ctx context.Context, arg db.CreateJobTagParams) (db.JobTag, error)
	UpdateJobTag(ctx context.Context, arg db.UpdateJobTagParams) (db.JobTag, error)
	DeleteJobTagById(ctx context.Context, jobTagUuid pgtype.UUID) error
}

type JobTagService struct {
	jobTagRepository IJobTagRepository
}

func NewJobTagService(jobTagRepository IJobTagRepository) *JobTagService {
	return &JobTagService{jobTagRepository}
}

func (js *JobTagService) CreateJobTag(ctx context.Context, payload *schemas.CreateJobTagPayload) (*schemas.JobTagResponse, error) {
	args := db.CreateJobTagParams{
		Name:        payload.Name,
		WayUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
		Description: payload.Description,
		Color:       payload.Color,
	}

	jobTag, err := js.jobTagRepository.CreateJobTag(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.JobTagResponse{
		Uuid:        util.ConvertPgUUIDToUUID(jobTag.Uuid).String(),
		Name:        jobTag.Name,
		Description: jobTag.Description,
		Color:       jobTag.Color,
	}, nil
}

type UpdateJobTagParams struct {
	JobTagID    string
	Name        string
	Description string
	Color       string
}

func (jc *JobTagService) UpdateJobTag(ctx context.Context, params *UpdateJobTagParams) (*schemas.JobTagResponse, error) {
	args := db.UpdateJobTagParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(params.JobTagID), Valid: true},
		Name:        pgtype.Text{String: params.Name, Valid: params.Name != ""},
		Description: pgtype.Text{String: params.Description, Valid: true},
		Color:       pgtype.Text{String: params.Color, Valid: params.Color != ""},
	}

	jobTag, err := jc.jobTagRepository.UpdateJobTag(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.JobTagResponse{
		Uuid:        util.ConvertPgUUIDToUUID(jobTag.Uuid).String(),
		Name:        jobTag.Name,
		Description: jobTag.Description,
		Color:       jobTag.Color,
	}, nil
}

func (jc *JobTagService) DeleteJobTagById(ctx context.Context, jobTagID string) error {
	return jc.jobTagRepository.DeleteJobTagById(ctx, pgtype.UUID{Bytes: uuid.MustParse(jobTagID), Valid: true})
}
