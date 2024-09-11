package services

import (
	"context"
	db "mwserver/internal/db/sqlc"
	"mwserver/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IPlanLabelRepository interface {
	CreatePlansLabel(ctx context.Context, arg db.CreatePlansLabelParams) (db.PlansLabel, error)
	DeletePlansLabelByIds(ctx context.Context, arg db.DeletePlansLabelByIdsParams) error
}

type PlanLabelService struct {
	planLabelRepository IPlanLabelRepository
}

func NewPlanLabelService(planLabelRepository IPlanLabelRepository) *PlanLabelService {
	return &PlanLabelService{planLabelRepository}
}

func (pc *PlanLabelService) CreatePlanLabel(ctx context.Context, payload *schemas.CreatePlanLabelPayload) (*db.PlansLabel, error) {
	args := db.CreatePlansLabelParams{
		PlanUuid:  pgtype.UUID{Bytes: uuid.MustParse(payload.PlanUuid), Valid: true},
		LabelUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.LabelUuid), Valid: true},
	}

	planJobTag, err := pc.planLabelRepository.CreatePlansLabel(ctx, args)
	if err != nil {
		return nil, err
	}

	return &planJobTag, err
}

func (ps *PlanLabelService) DeletePlanLabelById(ctx context.Context, planID, labelID string) error {
	return ps.planLabelRepository.DeletePlansLabelByIds(ctx, db.DeletePlansLabelByIdsParams{
		PlanUuid:  pgtype.UUID{Bytes: uuid.MustParse(planID), Valid: true},
		LabelUuid: pgtype.UUID{Bytes: uuid.MustParse(labelID), Valid: true},
	})
}
