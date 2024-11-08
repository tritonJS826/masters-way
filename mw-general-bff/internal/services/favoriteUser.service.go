package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"

// 	"github.com/google/uuid"
// )

// type IFavoriteUserRepository interface {
// 	CreateFavoriteUser(ctx context.Context, arg db.CreateFavoriteUserParams) (db.FavoriteUser, error)
// 	DeleteFavoriteUserByIds(ctx context.Context, arg db.DeleteFavoriteUserByIdsParams) error
// }

// type FavoriteUserService struct {
// 	favoriteUserRepository IFavoriteUserRepository
// }

// func NewFavoriteUserService(favoriteUserRepository IFavoriteUserRepository) *FavoriteUserService {
// 	return &FavoriteUserService{favoriteUserRepository}
// }

// func (fus *FavoriteUserService) CreateFavoriteUser(ctx context.Context, donorUserUuid, acceptorUserUuid uuid.UUID) (*db.FavoriteUser, error) {
// }

// func (fus *FavoriteUserService) DeleteFavoriteUserById(ctx context.Context, donorUserUuid, acceptorUserUuid string) error {
// }
