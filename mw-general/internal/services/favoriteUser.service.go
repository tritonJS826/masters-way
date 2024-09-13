package services

import (
	"context"
	db "mw-general/internal/db/sqlc"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IFavoriteUserRepository interface {
	CreateFavoriteUser(ctx context.Context, arg db.CreateFavoriteUserParams) (db.FavoriteUser, error)
	DeleteFavoriteUserByIds(ctx context.Context, arg db.DeleteFavoriteUserByIdsParams) error
}

type FavoriteUserService struct {
	favoriteUserRepository IFavoriteUserRepository
}

func NewFavoriteUserService(favoriteUserRepository IFavoriteUserRepository) *FavoriteUserService {
	return &FavoriteUserService{favoriteUserRepository}
}

func (fus *FavoriteUserService) CreateFavoriteUser(ctx context.Context, donorUserUuid, acceptorUserUuid uuid.UUID) (*db.FavoriteUser, error) {
	favoriteUser, err := fus.favoriteUserRepository.CreateFavoriteUser(ctx, db.CreateFavoriteUserParams{
		DonorUserUuid:    pgtype.UUID{Bytes: donorUserUuid, Valid: true},
		AcceptorUserUuid: pgtype.UUID{Bytes: acceptorUserUuid, Valid: true},
	})
	if err != nil {
		return nil, err
	}

	return &favoriteUser, nil
}

func (fus *FavoriteUserService) DeleteFavoriteUserById(ctx context.Context, donorUserUuid, acceptorUserUuid string) error {
	return fus.favoriteUserRepository.DeleteFavoriteUserByIds(ctx, db.DeleteFavoriteUserByIdsParams{
		DonorUserUuid:    pgtype.UUID{Bytes: uuid.MustParse(donorUserUuid), Valid: true},
		AcceptorUserUuid: pgtype.UUID{Bytes: uuid.MustParse(acceptorUserUuid), Valid: true},
	})
}
