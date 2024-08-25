package services

import (
	"context"
	db "mwserver/internal/db/sqlc"
	"mwserver/internal/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IWayCollectionWayRepository interface {
	CreateWayCollectionsWays(ctx context.Context, arg db.CreateWayCollectionsWaysParams) (db.WayCollectionsWay, error)
	DeleteWayCollectionsWaysByIds(ctx context.Context, arg db.DeleteWayCollectionsWaysByIdsParams) error
}

type WayCollectionWayService struct {
	wayCollectionWayRepository IWayCollectionWayRepository
}

func NewWayCollectionWayService(wayCollectionWayRepository IWayCollectionWayRepository) *WayCollectionWayService {
	return &WayCollectionWayService{wayCollectionWayRepository}
}

func (ws *WayCollectionWayService) CreateWayCollectionWay(ctx context.Context, payload *schemas.CreateWayCollectionWay) (*db.WayCollectionsWay, error) {
	args := db.CreateWayCollectionsWaysParams{
		WayCollectionUuid: pgtype.UUID{Bytes: uuid.MustParse(payload.WayCollectionUuid), Valid: true},
		WayUuid:           pgtype.UUID{Bytes: uuid.MustParse(payload.WayUuid), Valid: true},
	}

	wayCollectionWay, err := ws.wayCollectionWayRepository.CreateWayCollectionsWays(ctx, args)
	if err != nil {
		return nil, err
	}

	return &wayCollectionWay, nil
}

func (ws *WayCollectionWayService) DeleteWayCollectionWayById(ctx context.Context, wayID, wayCollectionID string) error {
	return ws.wayCollectionWayRepository.DeleteWayCollectionsWaysByIds(ctx, db.DeleteWayCollectionsWaysByIdsParams{
		WayUuid:           pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
		WayCollectionUuid: pgtype.UUID{Bytes: uuid.MustParse(wayCollectionID), Valid: true},
	})
}
