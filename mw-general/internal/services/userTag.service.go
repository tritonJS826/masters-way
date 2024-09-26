package services

import (
	"context"
	db "mwgeneral/internal/db/sqlc"
	"mwgeneral/internal/schemas"
	"mwgeneral/pkg/util"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type IUserTagRepository interface {
	GetUserTagByName(ctx context.Context, tagName string) (db.UserTag, error)
	CreateUserTag(ctx context.Context, tagName string) (db.UserTag, error)
	CreateUsersUserTag(ctx context.Context, arg db.CreateUsersUserTagParams) (db.UsersUserTag, error)
	DeleteUserTagFromUser(ctx context.Context, arg db.DeleteUserTagFromUserParams) error
}

type UserTagService struct {
	userTagRepository IUserTagRepository
}

func NewUserTagService(userTagRepository IUserTagRepository) *UserTagService {
	return &UserTagService{userTagRepository}
}

func (uc *UserTagService) AddUserTagByName(ctx context.Context, payload *schemas.CreateUserTagPayload) (*schemas.UserTagResponse, error) {
	userTag, err := uc.userTagRepository.GetUserTagByName(ctx, payload.Name)
	if err != nil {
		newUserTag, _ := uc.userTagRepository.CreateUserTag(ctx, payload.Name)
		userTag = newUserTag
	}

	args := db.CreateUsersUserTagParams{
		UserTagUuid: userTag.Uuid,
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(payload.OwnerUuid), Valid: true},
	}
	_, err = uc.userTagRepository.CreateUsersUserTag(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.UserTagResponse{
		Uuid: util.ConvertPgUUIDToUUID(userTag.Uuid).String(),
		Name: userTag.Name,
	}, nil
}

func (us *UserTagService) DeleteUserTagByFromUserByTag(ctx context.Context, userID, userTagID string) error {
	return us.userTagRepository.DeleteUserTagFromUser(ctx, db.DeleteUserTagFromUserParams{
		UserUuid:    pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true},
		UserTagUuid: pgtype.UUID{Bytes: uuid.MustParse(userTagID), Valid: true},
	})
}
