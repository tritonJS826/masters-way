package services

import (
	"context"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IProblemRepository interface {
	CreateProblem(ctx context.Context, arg db.CreateProblemParams) (db.CreateProblemRow, error)
	UpdateProblem(ctx context.Context, arg db.UpdateProblemParams) (db.UpdateProblemRow, error)
	DeleteProblem(ctx context.Context, problemUuid pgtype.UUID) error
}

type ProblemService struct {
	problemRepository IProblemRepository
}

func NewProblemService(problemRepository IProblemRepository) *ProblemService {
	return &ProblemService{problemRepository}
}

func (ps *ProblemService) CreateProblem(ctx context.Context, payload *schemas.CreateProblemPayload) (*schemas.ProblemPopulatedResponse, error) {
	now := time.Now()
	args := db.CreateProblemParams{
		CreatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt:     pgtype.Timestamp{Time: now, Valid: true},
		Description:   payload.Description,
		IsDone:        payload.IsDone,
		OwnerUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		DayReportUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.DayReportUuid), Valid: true},
	}

	problem, err := ps.problemRepository.CreateProblem(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.ProblemPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(problem.Uuid).String(),
		CreatedAt:     problem.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     problem.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   problem.Description,
		IsDone:        problem.IsDone,
		OwnerUuid:     util.ConvertPgUUIDToUUID(problem.OwnerUuid).String(),
		OwnerName:     problem.OwnerName,
		DayReportUuid: util.ConvertPgUUIDToUUID(problem.DayReportUuid).String(),
		// WayUUID:       util.ConvertPgUUIDToUUID(userPermission.WayUuid).String(),
		// WayName:       userPermission.WayName,
	}, nil
}

type UpdateProblemParams struct {
	problemID   string
	Description *string
	IsDone      *bool
}

func (ps *ProblemService) UpdateProblem(ctx context.Context, params *UpdateProblemParams) (*schemas.ProblemPopulatedResponse, error) {
	var descriptionPg pgtype.Text
	if params.Description != nil {
		descriptionPg = pgtype.Text{String: *params.Description, Valid: true}
	}
	var isDonePg pgtype.Bool
	if params.IsDone != nil {
		isDonePg = pgtype.Bool{Bool: *params.IsDone, Valid: true}
	}
	now := time.Now()
	args := db.UpdateProblemParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(params.problemID), Valid: true},
		UpdatedAt:   pgtype.Timestamp{Time: now, Valid: true},
		IsDone:      isDonePg,
		Description: descriptionPg,
	}

	problem, err := ps.problemRepository.UpdateProblem(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.ProblemPopulatedResponse{
		Uuid:          util.ConvertPgUUIDToUUID(problem.Uuid).String(),
		CreatedAt:     problem.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt:     problem.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		Description:   problem.Description,
		IsDone:        problem.IsDone,
		OwnerUuid:     util.ConvertPgUUIDToUUID(problem.OwnerUuid).String(),
		OwnerName:     problem.OwnerName,
		DayReportUuid: util.ConvertPgUUIDToUUID(problem.DayReportUuid).String(),
		// WayUUID:       util.ConvertPgUUIDToUUID(userPermission.WayUuid).String(),
		// WayName:       userPermission.WayName,
	}, nil
}

func (ps *ProblemService) DeleteProblemById(ctx context.Context, problemID string) error {
	return ps.problemRepository.DeleteProblem(ctx, pgtype.UUID{Bytes: uuid.MustParse(problemID), Valid: true})
}
