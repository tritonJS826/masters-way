package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// )

// type IUserTagRepository interface {
// 	GetUserTagByName(ctx context.Context, tagName string) (db.UserTag, error)
// 	CreateUserTag(ctx context.Context, tagName string) (db.UserTag, error)
// 	CreateUsersUserTag(ctx context.Context, arg db.CreateUsersUserTagParams) (db.UsersUserTag, error)
// 	DeleteUserTagFromUser(ctx context.Context, arg db.DeleteUserTagFromUserParams) error
// }

// type UserTagService struct {
// 	userTagRepository IUserTagRepository
// }

// func NewUserTagService(userTagRepository IUserTagRepository) *UserTagService {
// 	return &UserTagService{userTagRepository}
// }

// func (uc *UserTagService) AddUserTagByName(ctx context.Context, payload *schemas.CreateUserTagPayload) (*schemas.UserTagResponse, error) {
// }

// func (us *UserTagService) DeleteUserTagByFromUserByTag(ctx context.Context, userID, userTagID string) error {
// }
