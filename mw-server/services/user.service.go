package services

import (
	"context"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
)

func CreateUser(db *dbb.Queries, ctx context.Context, args *dbb.CreateUserParams) (schemas.UserPlainResponse, error) {
	user, err := db.CreateUser(ctx, *args)

	createWayCollectionParamsOwn := dbb.CreateWayCollectionParams{
		OwnerUuid: user.Uuid,
		CreatedAt: user.CreatedAt,
		Name:      "own",
		Type:      dbb.WayCollectionTypeOwn,
	}
	createWayCollectionParamsFavorite := dbb.CreateWayCollectionParams{
		OwnerUuid: user.Uuid,
		CreatedAt: user.CreatedAt,
		Name:      "favorite",
		Type:      dbb.WayCollectionTypeFavorite,
	}
	createWayCollectionParamsMentoring := dbb.CreateWayCollectionParams{
		OwnerUuid: user.Uuid,
		CreatedAt: user.CreatedAt,
		Name:      "mentoring",
		Type:      dbb.WayCollectionTypeMentoring,
	}

	db.CreateWayCollection(ctx, createWayCollectionParamsOwn)
	db.CreateWayCollection(ctx, createWayCollectionParamsFavorite)
	db.CreateWayCollection(ctx, createWayCollectionParamsMentoring)

	imageUrl, _ := util.MarshalNullString(user.ImageUrl)
	response := schemas.UserPlainResponse{
		Uuid:        user.Uuid.String(),
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description,
		CreatedAt:   user.CreatedAt.String(),
		ImageUrl:    string(imageUrl),
		IsMentor:    user.IsMentor,
	}

	return response, err
}

// func GetUserByFirebaseId
