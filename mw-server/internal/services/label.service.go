package services

import (
	"context"
	db "mwserver/internal/db/sqlc"
	"mwserver/internal/schemas"
	"mwserver/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type ILabelRepository interface {
	CreateLabel(ctx context.Context, arg db.CreateLabelParams) (db.Label, error)
	UpdateLabel(ctx context.Context, arg db.UpdateLabelParams) (db.Label, error)
	DeleteLabelById(ctx context.Context, labelUuid pgtype.UUID) error
}

type LabelService struct {
	labelRepository ILabelRepository
}

func NewLabelService(LabelRepository ILabelRepository) *LabelService {
	return &LabelService{LabelRepository}
}

func (js *LabelService) CreateLabel(ctx context.Context, payload *schemas.CreateLabelPayload) (*schemas.LabelResponse, error) {
	args := db.CreateLabelParams{
		Name:        payload.Name,
		WayUuid:     pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
		Description: payload.Description,
		Color:       payload.Color,
	}

	label, err := js.labelRepository.CreateLabel(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.LabelResponse{
		Uuid:        util.ConvertPgUUIDToUUID(label.Uuid).String(),
		Name:        label.Name,
		Description: label.Description,
		Color:       label.Color,
	}, nil
}

type UpdateLabelParams struct {
	LabelID     string
	Name        string
	Description string
	Color       string
}

func (jc *LabelService) UpdateLabel(ctx context.Context, params *UpdateLabelParams) (*schemas.LabelResponse, error) {
	args := db.UpdateLabelParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(params.LabelID), Valid: true},
		Name:        pgtype.Text{String: params.Name, Valid: params.Name != ""},
		Description: pgtype.Text{String: params.Description, Valid: true},
		Color:       pgtype.Text{String: params.Color, Valid: params.Color != ""},
	}

	label, err := jc.labelRepository.UpdateLabel(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.LabelResponse{
		Uuid:        util.ConvertPgUUIDToUUID(label.Uuid).String(),
		Name:        label.Name,
		Description: label.Description,
		Color:       label.Color,
	}, nil
}

func (jc *LabelService) DeleteLabelById(ctx context.Context, labelID string) error {
	return jc.labelRepository.DeleteLabelById(ctx, pgtype.UUID{Bytes: uuid.MustParse(labelID), Valid: true})
}
