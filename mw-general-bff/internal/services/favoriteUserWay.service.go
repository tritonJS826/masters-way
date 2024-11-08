package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"

// 	"github.com/google/uuid"
// )

// type IFavoriteUserWayRepository interface {
// 	CreateFavoriteUserWay(ctx context.Context, arg db.CreateFavoriteUserWayParams) (db.FavoriteUsersWay, error)
// 	DeleteFavoriteUserWayByIds(ctx context.Context, arg db.DeleteFavoriteUserWayByIdsParams) error
// }

// type FavoriteUserWayService struct {
// 	favoriteUserWayRepository IFavoriteUserWayRepository
// }

// func NewFavoriteUserWayService(favoriteUserWayRepository IFavoriteUserWayRepository) *FavoriteUserWayService {
// 	return &FavoriteUserWayService{favoriteUserWayRepository}
// }

// func (fuws *FavoriteUserWayService) CreateFavoriteUserWay(ctx context.Context, userUUID, wayUUID uuid.UUID) (db.FavoriteUsersWay, error) {
// }

// func (fuws *FavoriteUserWayService) DeleteFavoriteUserWayById(ctx context.Context, userID, wayID string) error {
// }
