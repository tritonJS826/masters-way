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

type ICommentService interface {
	CreateComment(ctx context.Context, params *CreateCommentParams) (*schemas.CommentPopulatedResponse, error)
	UpdateComment(ctx context.Context, params *UpdateCommentParams) (*schemas.CommentPopulatedResponse, error)
	DeleteCommentById(ctx context.Context, userID, commentID string) error
}

type IWayTagService interface {
	AddWayTagToWay(ctx context.Context, name string, wayID string) (*schemas.WayTagResponse, error)
	DeleteWayTagFromWayByTagID(ctx context.Context, wayTagID string, wayID string) error
}

type ICompositeWayService interface {
	AddWayToCompositeWay(ctx context.Context, params AddWayToCompositeWayParams) (*schemas.CompositeWayRelation, error)
}

type Service struct {
	IUserService
	ICommentService
	IWayTagService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)
	return &Service{
		IUserService: NewUserService(queries),
		ICommentService: NewCommentService(queries),
		IWayTagService: NewWayTagService(queries),
	}
}
