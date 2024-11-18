package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IPlanJobTagRepository interface {
	CreatePlansJobTag(ctx context.Context, arg db.CreatePlansJobTagParams) (db.PlansJobTag, error)
	DeletePlansJobTagByIds(ctx context.Context, arg db.DeletePlansJobTagByIdsParams) error
}

type PlanJobTagService struct {
	planJobTagRepository IPlanJobTagRepository
}

func NewPlanJobTagService(planJobTagRepository IPlanJobTagRepository) *PlanJobTagService {
	return &PlanJobTagService{planJobTagRepository}
}

func (pc *PlanJobTagService) CreatePlanJobTag(ctx context.Context, payload *schemas.CreatePlanJobTagPayload) (*db.PlansJobTag, error) {
	args := db.CreatePlansJobTagParams{
		PlanUuid:   pgtype.UUID{Bytes: uuid.MustParse(payload.PlanUuid), Valid: true},
		JobTagUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.JobTagUuid), Valid: true},
	}

	planJobTag, err := pc.planJobTagRepository.CreatePlansJobTag(ctx, args)
	if err != nil {
		return nil, err
	}

	return &planJobTag, err
}

func (ps *PlanJobTagService) DeletePlanJobTagById(ctx context.Context, planID, jobTagID string) error {
	return ps.planJobTagRepository.DeletePlansJobTagByIds(ctx, db.DeletePlansJobTagByIdsParams{
		PlanUuid:   pgtype.UUID{Bytes: uuid.MustParse(planID), Valid: true},
		JobTagUuid: pgtype.UUID{Bytes: uuid.MustParse(jobTagID), Valid: true},
	})
}
