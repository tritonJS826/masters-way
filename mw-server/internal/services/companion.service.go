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

type ICompanionFeedbackRepository interface {
	CreateCompanionFeedback(ctx context.Context, arg db.CreateCompanionFeedbackParams) (pgtype.UUID, error)
	GetCompanionFeedbackByWayId(ctx context.Context, wayUuid pgtype.UUID) (db.CompanionFeedback, error)
	UpdateCompanionFeedback(ctx context.Context, arg db.UpdateCompanionFeedbackParams) (pgtype.UUID, error)
}

type CompanionFeedbackService struct {
	ICompanionFeedbackRepository
}

func NewCompanionFeedbackService(repository ICompanionFeedbackRepository) *CompanionFeedbackService {
	return &CompanionFeedbackService{repository}
}

func (s *CompanionFeedbackService) GetCompanionFeedbackByWayId(ctx context.Context, wayID uuid.UUID) (*schemas.CompanionFeedback, error) {
	result, err := s.ICompanionFeedbackRepository.GetCompanionFeedbackByWayId(ctx, pgtype.UUID{Bytes: wayID, Valid: true})
	if err != nil {
		return nil, err
	}
	return &schemas.CompanionFeedback{
		UUID:          util.ConvertPgUUIDToUUID(result.Uuid).String(),
		WayUUID:       util.ConvertPgUUIDToUUID(result.WayUuid).String(),
		Status:        int(result.Status),
		Comment:       result.Comment,
		Character:     schemas.CompanionCharacter(result.Character),
		LastUpdatedAt: result.LastUpdatedAt.Time.Format(time.RFC3339),
	}, nil
}

type CreateCompanionFeedbackParams struct {
	WayUUID       uuid.UUID
	Status        int32
	Comment       string
	Character     string
	LastUpdatedAt time.Time
}

func (s *CompanionFeedbackService) CreateCompanionFeedback(ctx context.Context, params *CreateCompanionFeedbackParams) (pgtype.UUID, error) {
	return s.ICompanionFeedbackRepository.CreateCompanionFeedback(ctx, db.CreateCompanionFeedbackParams{
		WayUuid:       pgtype.UUID{Bytes: params.WayUUID, Valid: true},
		Status:        params.Status,
		Comment:       params.Comment,
		Character:     params.Character,
		LastUpdatedAt: pgtype.Timestamp{Time: params.LastUpdatedAt, Valid: true},
	})
}

type UpdateCompanionFeedbackParams struct {
	WayUUID       uuid.UUID
	Status        int32
	Comment       string
	Character     string
	LastUpdatedAt time.Time
}

func (s *CompanionFeedbackService) UpdateCompanionFeedback(ctx context.Context, params *UpdateCompanionFeedbackParams) (pgtype.UUID, error) {
	return s.ICompanionFeedbackRepository.UpdateCompanionFeedback(ctx, db.UpdateCompanionFeedbackParams{
		Status:        params.Status,
		Comment:       params.Comment,
		Character:     params.Character,
		LastUpdatedAt: pgtype.Timestamp{Time: params.LastUpdatedAt, Valid: true},
		WayUuid:       pgtype.UUID{Bytes: params.WayUUID, Valid: true},
	})
}
