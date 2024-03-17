package services

import (
	"context"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
)

func CreateUser(db *db.Queries, ctx context.Context, args *db.CreateUserParams) (schemas.UserPlainResponse, error) {
	user, err := db.CreateUser(ctx, *args)

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
