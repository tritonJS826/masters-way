package services

import (
	"context"
	db "mwgeneral/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IFavoriteUserWayRepository interface {
	CreateFavoriteUserWay(ctx context.Context, arg db.CreateFavoriteUserWayParams) (db.FavoriteUsersWay, error)
	DeleteFavoriteUserWayByIds(ctx context.Context, arg db.DeleteFavoriteUserWayByIdsParams) error
}

type FavoriteUserWayService struct {
	favoriteUserWayRepository IFavoriteUserWayRepository
}

func NewFavoriteUserWayService(favoriteUserWayRepository IFavoriteUserWayRepository) *FavoriteUserWayService {
	return &FavoriteUserWayService{favoriteUserWayRepository}
}

func (fuws *FavoriteUserWayService) CreateFavoriteUserWay(ctx context.Context, userUUID, wayUUID uuid.UUID) (db.FavoriteUsersWay, error) {
	return fuws.favoriteUserWayRepository.CreateFavoriteUserWay(ctx, db.CreateFavoriteUserWayParams{
		UserUuid: pgtype.UUID{Bytes: userUUID, Valid: true},
		WayUuid:  pgtype.UUID{Bytes: wayUUID, Valid: true},
	})
}

func (fuws *FavoriteUserWayService) DeleteFavoriteUserWayById(ctx context.Context, userID, wayID string) error {
	return fuws.favoriteUserWayRepository.DeleteFavoriteUserWayByIds(ctx, db.DeleteFavoriteUserWayByIdsParams{
		UserUuid: pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		WayUuid:  pgtype.UUID{Bytes: uuid.MustParse(wayID), Valid: true},
	})
}
