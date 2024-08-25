package services

import (
	"context"
	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IJobDoneJobTagRepository interface {
	CreateJobDonesJobTag(ctx context.Context, arg db.CreateJobDonesJobTagParams) (db.JobDonesJobTag, error)
	DeleteJobDonesJobTagByJobDoneId(ctx context.Context, arg db.DeleteJobDonesJobTagByJobDoneIdParams) error
}

type JobDoneJobTagService struct {
	jobDoneJobTagRepository IJobDoneJobTagRepository
}

func NewJobDoneJobTagService(jobDoneJobTagRepository IJobDoneJobTagRepository) *JobDoneJobTagService {
	return &JobDoneJobTagService{jobDoneJobTagRepository}
}

func (js *JobDoneJobTagService) CreateJobDoneJobTag(ctx context.Context, payload *schemas.CreateJobDoneJobTagPayload) (*db.JobDonesJobTag, error) {
	args := db.CreateJobDonesJobTagParams{
		JobDoneUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.JobDoneUuid), Valid: true},
		JobTagUuid:  pgtype.UUID{Bytes: uuid.MustParse(payload.JobTagUuid), Valid: true},
	}

	jobDoneJobTag, err := js.jobDoneJobTagRepository.CreateJobDonesJobTag(ctx, args)
	if err != nil {
		return nil, err
	}

	return &jobDoneJobTag, nil
}

func (js *JobDoneJobTagService) DeleteJobDoneJobTagById(ctx context.Context, jobDoneID, jobTagID string) error {
	return js.jobDoneJobTagRepository.DeleteJobDonesJobTagByJobDoneId(ctx, db.DeleteJobDonesJobTagByJobDoneIdParams{
		JobDoneUuid: pgtype.UUID{Bytes: uuid.MustParse(jobDoneID), Valid: true},
		JobTagUuid:  pgtype.UUID{Bytes: uuid.MustParse(jobTagID), Valid: true},
	})
}
