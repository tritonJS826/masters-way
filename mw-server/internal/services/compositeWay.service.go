package services

import (
	"context"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type ICompositeWayRepository interface {
	AddWayToCompositeWay(ctx context.Context, arg db.AddWayToCompositeWayParams) (db.CompositeWay, error)
}

type CompositeWayService struct {
	ICompositeWayRepository
}

func NewCompositeWayService(compositeWayRepository ICompositeWayRepository) *CompositeWayService {
	return &CompositeWayService{compositeWayRepository}
}

type AddWayToCompositeWayParams struct {
	ChildWayID string
	ParentWayID string
}

func (cws *CompositeWayService) AddWayToCompositeWay(ctx context.Context, params AddWayToCompositeWayParams) (*schemas.CompositeWayRelation, error) {
	compositeWayRelationDb, err := cws.ICompositeWayRepository.AddWayToCompositeWay(ctx, db.AddWayToCompositeWayParams{
		ChildUuid:  pgtype.UUID{Bytes: uuid.MustParse(params.ChildWayID), Valid: true},
		ParentUuid: pgtype.UUID{Bytes: uuid.MustParse(params.ParentWayID), Valid: true},
	})
	
	if err != nil {
		return nil, err
	}

	return &schemas.CompositeWayRelation{
		ChildWayUuid:  util.ConvertPgUUIDToUUID(compositeWayRelationDb.ChildUuid).String(),
		ParentWayUuid: util.ConvertPgUUIDToUUID(compositeWayRelationDb.ChildUuid).String(),
	}, nil
}