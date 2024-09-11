package services

import (
	"context"
	db "mwserver/internal/db/sqlc"
	"mwserver/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IJobDoneLabelRepository interface {
	CreateJobDonesLabel(ctx context.Context, arg db.CreateJobDonesLabelParams) (db.JobDonesLabel, error)
	DeleteJobDonesLabelByJobDoneId(ctx context.Context, arg db.DeleteJobDonesLabelByJobDoneIdParams) error
}

type JobDoneLabelService struct {
	jobDoneLabelRepository IJobDoneLabelRepository
}

func NewJobDoneLabelService(jobDoneLabelRepository IJobDoneLabelRepository) *JobDoneLabelService {
	return &JobDoneLabelService{jobDoneLabelRepository}
}

func (js *JobDoneLabelService) CreateJobDoneLabel(ctx context.Context, payload *schemas.CreateJobDoneLabelPayload) (*db.JobDonesLabel, error) {
	args := db.CreateJobDonesLabelParams{
		JobDoneUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.JobDoneUuid), Valid: true},
		LabelUuid:   pgtype.UUID{Bytes: uuid.MustParse(payload.LabelUuid), Valid: true},
	}

	jobDoneJobTag, err := js.jobDoneLabelRepository.CreateJobDonesLabel(ctx, args)
	if err != nil {
		return nil, err
	}

	return &jobDoneJobTag, nil
}

func (js *JobDoneLabelService) DeleteJobDoneLabelById(ctx context.Context, jobDoneID, labelID string) error {
	return js.jobDoneLabelRepository.DeleteJobDonesLabelByJobDoneId(ctx, db.DeleteJobDonesLabelByJobDoneIdParams{
		JobDoneUuid: pgtype.UUID{Bytes: uuid.MustParse(jobDoneID), Valid: true},
		LabelUuid:   pgtype.UUID{Bytes: uuid.MustParse(labelID), Valid: true},
	})
}
