package services

import (
	"context"
	db "mw-server/internal/db/sqlc"
	"mw-server/internal/schemas"
	"mw-server/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IWayTagRepository interface {
	GetWayTagByName(ctx context.Context, wayTagName string) (db.WayTag, error)
	CreateWayTag(ctx context.Context, name string) (db.WayTag, error)
	CreateWaysWayTag(ctx context.Context, arg db.CreateWaysWayTagParams) (db.WaysWayTag, error)
	DeleteWayTagFromWay(ctx context.Context, arg db.DeleteWayTagFromWayParams) error
}

type WayTagService struct {
	IWayTagRepository
}

func NewWayTagService(wayTagRepository IWayTagRepository) *WayTagService {
	return &WayTagService{wayTagRepository}
}

func (wts *WayTagService) AddWayTagToWay(ctx context.Context, name string, wayID string) (*schemas.WayTagResponse, error) {
	wayTag, err := wts.IWayTagRepository.GetWayTagByName(ctx, name)
	if err != nil {
		newWayTag, _ := wts.IWayTagRepository.CreateWayTag(ctx, name)
		wayTag = newWayTag
	}

	args := &db.CreateWaysWayTagParams{
		WayTagUuid: wayTag.Uuid,
		WayUuid:    pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
	}
	_, err = wts.IWayTagRepository.CreateWaysWayTag(ctx, *args)
	if err != nil {
		return nil, err
	}

	return &schemas.WayTagResponse{
		Uuid: util.ConvertPgUUIDToUUID(wayTag.Uuid).String(),
		Name: wayTag.Name,
	}, nil
}

func (wts *WayTagService) DeleteWayTagFromWayByTagID(ctx context.Context, wayTagID string, wayID string) error {
	return wts.IWayTagRepository.DeleteWayTagFromWay(ctx, db.DeleteWayTagFromWayParams{
		WayUuid:    pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
		WayTagUuid: pgtype.UUID{Bytes: uuid.MustParse(wayTagID), Valid: true},
	})
}
