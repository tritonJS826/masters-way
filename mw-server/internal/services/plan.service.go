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

type IPlanRepository interface {
	CreatePlan(ctx context.Context, arg db.CreatePlanParams) (db.CreatePlanRow, error)
	UpdatePlan(ctx context.Context, arg db.UpdatePlanParams) (db.UpdatePlanRow, error)
	DeletePlan(ctx context.Context, planUuid pgtype.UUID) error
}

type PlanService struct {
	planRepository IPlanRepository
}

func NewPlanService(planRepository IPlanRepository) *PlanService {
	return &PlanService{planRepository}
}

type Plan struct {
	ID          string
	CreatedAt   string
	UpdatedAt   string
	Description string
	Time        int32
	OwnerUuid   string
	OwnerName   string
	IsDone      bool
	DayReportID string
	WayUUID     string
	WayName     string
	TagIDs      []string
}

func (ps *PlanService) CreatePlan(ctx context.Context, payload *schemas.CreatePlanPayload) (*Plan, error) {
	now := time.Now()
	args := db.CreatePlanParams{
		Description:   payload.Description,
		Time:          int32(payload.Time),
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		IsDone:        payload.IsDone,
		DayReportUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true},
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
	}

	plan, err := ps.planRepository.CreatePlan(ctx, args)
	if err != nil {
		return nil, err
	}

	return &Plan{
		ID:          util.ConvertPgUUIDToUUID(plan.Uuid).String(),
		CreatedAt:   plan.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:   plan.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description: plan.Description,
		Time:        plan.Time,
		OwnerUuid:   util.ConvertPgUUIDToUUID(plan.OwnerUuid).String(),
		OwnerName:   plan.OwnerName,
		IsDone:      plan.IsDone,
		DayReportID: util.ConvertPgUUIDToUUID(plan.DayReportUuid).String(),
		WayUUID:     util.ConvertPgUUIDToUUID(plan.WayUuid).String(),
		WayName:     plan.WayName,
		TagIDs:      []string{},
	}, nil
}

type UpdatePlanParams struct {
	PlanID      string
	Description *string
	Time        *int32
	IsDone      *bool
}

func (ps *PlanService) UpdatePlan(ctx context.Context, params *UpdatePlanParams) (*Plan, error) {
	planUUID := pgtype.UUID{Bytes: uuid.MustParse(params.PlanID), Valid: true}

	var descriptionPg pgtype.Text
	if params.Description != nil {
		descriptionPg = pgtype.Text{String: *params.Description, Valid: true}
	}
	var timePg pgtype.Int4
	if params.Time != nil {
		timePg = pgtype.Int4{Int32: *params.Time, Valid: true}
	}
	var isDonePg pgtype.Bool
	if params.IsDone != nil {
		isDonePg = pgtype.Bool{Bool: *params.IsDone, Valid: true}
	}
	now := time.Now()
	args := db.UpdatePlanParams{
		PlanUuid:    planUUID,
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
		Description: descriptionPg,
		Time:        timePg,
		IsDone:      isDonePg,
	}

	plan, err := ps.planRepository.UpdatePlan(ctx, args)
	if err != nil {
		return nil, err
	}

	return &Plan{
		ID:          util.ConvertPgUUIDToUUID(plan.Uuid).String(),
		CreatedAt:   plan.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:   plan.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description: plan.Description,
		Time:        plan.Time,
		OwnerUuid:   util.ConvertPgUUIDToUUID(plan.OwnerUuid).String(),
		OwnerName:   plan.OwnerName,
		IsDone:      plan.IsDone,
		DayReportID: util.ConvertPgUUIDToUUID(plan.DayReportUuid).String(),
		WayUUID:     util.ConvertPgUUIDToUUID(plan.WayUuid).String(),
		WayName:     plan.WayName,
		TagIDs:      plan.TagUuids,
	}, nil
}

func (ps *PlanService) DeletePlanById(ctx context.Context, planID string) error {
	return ps.planRepository.DeletePlan(ctx, pgtype.UUID{Bytes: uuid.MustParse(planID), Valid: true})
}
