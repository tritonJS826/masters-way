package services

import (
	"context"
	db "mwserver/db/sqlc"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
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
	AddWayToCompositeWay(ctx context.Context, params *AddWayToCompositeWayParams) (*schemas.CompositeWayRelation, error)
	DeleteCompositeWayRelation(ctx context.Context, parentWayID, childWayID string) error
}

type IDayReportService interface {
	CreateDayReport(ctx context.Context, wayID uuid.UUID) (*schemas.CompositeDayReportPopulatedResponse, error)
	GetDayReportsByWayID(ctx context.Context, params *GetDayReportsByWayIdParams) (*schemas.ListDayReportsResponse, error)
}

type ILimitService interface {
	CheckIsLimitReachedByPricingPlan(ctx context.Context, params *LimitReachedParams) error
	GetMaxCompositeWayDepthByUserID(ctx context.Context, userID uuid.UUID) (int, error)
}

type IWayService interface {
	GetChildrenWayIDs(ctx context.Context, wayID uuid.UUID, maxDepth int) ([]uuid.UUID, error)
	GetNestedWayIDs(ctx context.Context, parentWayUUID pgtype.UUID, currentDepth int, maxDepth int) ([]pgtype.UUID, error)
}

type IDevService interface {
	ResetDb(ctx context.Context) error
}

type IFavoriteUserService interface {
	CreateFavoriteUser(ctx context.Context, donorUserUuid, acceptorUserUuid uuid.UUID) (*db.FavoriteUser, error)
	DeleteFavoriteUserById(ctx context.Context, donorUserUuid, acceptorUserUuid string) error
}

type IFavoriteUserWayService interface {
	CreateFavoriteUserWay(ctx context.Context, userUUID, wayUUID uuid.UUID) (db.FavoriteUsersWay, error)
	DeleteFavoriteUserWayById(ctx context.Context, userID, wayID string) error
}

type Service struct {
	IUserService
	ICommentService
	IWayTagService
	ICompositeWayService
	IDayReportService
	ILimitService
	IWayService
	IDevService
	IFavoriteUserService
	IFavoriteUserWayService
}

func NewService(pool *pgxpool.Pool) *Service {
	queries := db.New(pool)

	return &Service{
		IUserService:            NewUserService(queries),
		ICommentService:         NewCommentService(queries),
		IWayTagService:          NewWayTagService(queries),
		ICompositeWayService:    NewCompositeWayService(queries),
		ILimitService:           NewLimitService(queries),
		IDayReportService:       NewDayReportService(queries),
		IDevService:             NewDevService(queries, pool),
		IFavoriteUserService:    NewFavoriteUserService(queries),
		IFavoriteUserWayService: NewFavoriteUserWayService(queries),
	}
}
