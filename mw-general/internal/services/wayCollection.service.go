package services

import (
	"context"
	db "mw-general/internal/db/sqlc"
	"mw-general/internal/schemas"
	"mw-general/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IWayCollectionRepository interface {
	CreateWayCollection(ctx context.Context, arg db.CreateWayCollectionParams) (db.WayCollection, error)
	UpdateWayCollection(ctx context.Context, arg db.UpdateWayCollectionParams) (db.WayCollection, error)
	DeleteWayCollection(ctx context.Context, wayCollectionsUuid pgtype.UUID) error
}

type WayCollectionService struct {
	wayCollectionRepository IWayCollectionRepository
}

func NewWayCollectionService(wayCollectionRepository IWayCollectionRepository) *WayCollectionService {
	return &WayCollectionService{wayCollectionRepository}
}

func (ws *WayCollectionService) CreateWayCollection(ctx context.Context, payload *schemas.CreateWayCollectionPayload) (*schemas.WayCollectionPopulatedResponse, error) {
	now := time.Now()
	args := db.CreateWayCollectionParams{
		Name:      payload.Name,
		OwnerUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
		CreatedAt: pgtype.Timestamp{Time: now, Valid: true},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
		Type:      "custom",
	}

	wayCollection, err := ws.wayCollectionRepository.CreateWayCollection(ctx, args)
	if err != nil {
		// TODO: refactor this error
		// ctx.JSON(http.StatusBadGateway, gin.H{"status": "Failed retrieving way collection", "error": err.Error()})
		return nil, err
	}

	return &schemas.WayCollectionPopulatedResponse{
		Uuid:      util.ConvertPgUUIDToUUID(wayCollection.Uuid).String(),
		Name:      wayCollection.Name,
		Ways:      []schemas.WayPlainResponse{},
		CreatedAt: wayCollection.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		UpdatedAt: wayCollection.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		OwnerUuid: util.ConvertPgUUIDToUUID(wayCollection.OwnerUuid).String(),
		Type:      string(wayCollection.Type),
	}, nil
}

func (cc *WayCollectionService) UpdateWayCollection(ctx context.Context, wayCollectionID, wayCollectionName string) (*schemas.WayCollectionPlainResponse, error) {
	now := time.Now()
	// TODO: If payload.Name is empty, we should not perform an update in the database
	args := db.UpdateWayCollectionParams{
		Uuid:      pgtype.UUID{Bytes: uuid.MustParse(wayCollectionID), Valid: true},
		Name:      pgtype.Text{String: wayCollectionName, Valid: wayCollectionName != ""},
		UpdatedAt: pgtype.Timestamp{Time: now, Valid: true},
	}

	wayCollection, err := cc.wayCollectionRepository.UpdateWayCollection(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.WayCollectionPlainResponse{
		Uuid: util.ConvertPgUUIDToUUID(wayCollection.Uuid).String(),
		Name: wayCollection.Name,
	}, nil
}

func (ws *WayCollectionService) DeleteWayCollectionById(ctx context.Context, wayCollectionID string) error {
	return ws.wayCollectionRepository.DeleteWayCollection(ctx, pgtype.UUID{Bytes: uuid.MustParse(wayCollectionID), Valid: true})
}
