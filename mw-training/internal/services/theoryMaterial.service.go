package services

import (
	"context"
	db "mw-training/internal/db/sqlc"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/jackc/pgx/v5/pgxpool"
)

type TheoryMaterialRepository interface {
	CreateTheoryMaterialInTopic(ctx context.Context, params db.CreateTheoryMaterialInTopicParams) (db.TheoryMaterial, error)
	UpdateTheoryMaterial(ctx context.Context, params db.UpdateTheoryMaterialParams) (db.TheoryMaterial, error)
	DeleteTheoryMaterial(ctx context.Context, TheoryMaterialUuid pgtype.UUID) (db.TheoryMaterial, error)
	WithTx(tx pgx.Tx) *db.Queries
}

type TheoryMaterialService struct {
	theoryMaterialRepository TheoryMaterialRepository
	pgxPool                  *pgxpool.Pool
}

func NewTheoryMaterialService(pgxPool *pgxpool.Pool, theoryMaterialRepository TheoryMaterialRepository) *TheoryMaterialService {
	return &TheoryMaterialService{
		pgxPool:                  pgxPool,
		theoryMaterialRepository: theoryMaterialRepository,
	}
}

func (pms *TheoryMaterialService) CreateTheoryMaterial(ctx context.Context, params db.CreateTheoryMaterialInTopicParams) (db.TheoryMaterial, error) {
	return pms.theoryMaterialRepository.CreateTheoryMaterialInTopic(ctx, params)
}

func (pms *TheoryMaterialService) UpdateTheoryMaterial(ctx context.Context, params db.UpdateTheoryMaterialParams) (db.TheoryMaterial, error) {
	return pms.theoryMaterialRepository.UpdateTheoryMaterial(ctx, params)
}

func (pms *TheoryMaterialService) DeleteTheoryMaterial(ctx context.Context, theoryMaterialUuid pgtype.UUID) (db.TheoryMaterial, error) {
	return pms.theoryMaterialRepository.DeleteTheoryMaterial(ctx, theoryMaterialUuid)
}
