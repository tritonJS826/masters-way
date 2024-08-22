package services

import (
	"context"
	db "mwserver/db/sqlc"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type IUserService interface {
	FindOrCreateUserByEmail(ctx context.Context, params *CreateUserParams) (*schemas.UserPopulatedResponse, error)
	CreateUser(ctx context.Context, params *CreateUserParams) (*schemas.UserPlainResponse, error)
	convertDbWaysToPlainWays(ctx context.Context, dbWays []dbWay) []schemas.WayPlainResponse
	dbCollectionWaysToDbWays(rawWay []dbb.GetWaysByCollectionIdRow) []dbWay
	dbOwnWaysToDbWays(rawWay []dbb.GetOwnWaysByUserIdRow) []dbWay
	dbMentoringWaysToDbWays(rawWay []dbb.GetMentoringWaysByMentorIdRow) []dbWay
	dbFavoriteWaysToDbWays(rawWay []dbb.GetFavoriteWaysByUserIdRow) []dbWay
	GetPopulatedUserById(ctx context.Context, userUuid uuid.UUID) (*schemas.UserPopulatedResponse, error)
}

type Service struct {
	IUserService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		IUserService: NewUserService(queries),
	}
}
