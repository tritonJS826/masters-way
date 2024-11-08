package services

// import (
// 	"context"
// 	"fmt"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// 	"mwserver/pkg/util"
// 	"time"

// 	"github.com/google/uuid"
// 	"github.com/jackc/pgx/v5/pgtype"
// 	"github.com/samber/lo"
// )

// type IUserRepository interface {
// 	CreateUser(ctx context.Context, arg db.CreateUserParams) (db.User, error)
// 	UpdateUser(ctx context.Context, arg db.UpdateUserParams) (db.User, error)
// 	GetUserByEmail(ctx context.Context, userEmail string) (db.User, error)
// 	GetUserByID(ctx context.Context, userUuid pgtype.UUID) (db.User, error)
// 	GetWayCollectionsByUserId(ctx context.Context, ownerUuid pgtype.UUID) ([]db.WayCollection, error)
// 	GetOwnWaysByUserId(ctx context.Context, ownerUuid pgtype.UUID) ([]db.GetOwnWaysByUserIdRow, error)
// 	GetMentoringWaysByMentorId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetMentoringWaysByMentorIdRow, error)
// 	GetFavoriteWaysByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetFavoriteWaysByUserIdRow, error)
// 	GetMentorUsersByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.User, error)
// 	GetListWayTagsByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.WayTag, error)
// 	GetPlainUserWithInfoByIDs(ctx context.Context, projectUuid pgtype.UUID) ([]db.GetPlainUserWithInfoByIDsRow, error)
// 	GetWaysByCollectionId(ctx context.Context, wayCollectionUuid pgtype.UUID) ([]db.GetWaysByCollectionIdRow, error)
// 	GetListUserTagsByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.UserTag, error)
// 	GetFromUserMentoringRequestWaysByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetFromUserMentoringRequestWaysByUserIdRow, error)
// 	GetFavoriteUserUuidsByAcceptorUserId(ctx context.Context, acceptorUserUuid pgtype.UUID) ([]pgtype.UUID, error)
// 	GetFavoriteUserByDonorUserId(ctx context.Context, donorUserUuid pgtype.UUID) ([]db.User, error)
// 	CountUsers(ctx context.Context, arg db.CountUsersParams) (int64, error)
// 	ListUsers(ctx context.Context, arg db.ListUsersParams) ([]db.ListUsersRow, error)
// 	GetUsersByIDs(ctx context.Context, userUuids []pgtype.UUID) ([]db.User, error)
// 	GetProjectsByUserID(ctx context.Context, userUuid pgtype.UUID) ([]db.GetProjectsByUserIDRow, error)
// }

// type UserService struct {
// 	IUserRepository
// }

// func NewUserService(userRepository IUserRepository) *UserService {
// 	return &UserService{userRepository}
// }

// type UpdateUserParams struct {
// 	UserID      string
// 	Name        *string
// 	Description *string
// 	ImageUrl    *string
// 	IsMentor    *bool
// }

// func (us *UserService) UpdateUser(ctx context.Context, params *UpdateUserParams) (*schemas.UserPlainResponse, error) {
// }

// type GetAllUsersParams struct {
// 	MentorStatus string
// 	UserName     string
// 	UserEmail    string
// 	Offset       int
// 	ReqLimit     int
// }

// func (us *UserService) GetAllUsers(ctx context.Context, params *GetAllUsersParams) (*schemas.GetAllUsersResponse, error) {
// }

// func (us *UserService) GetUsersByIDs(ctx context.Context, userIDs []string) ([]schemas.GetUsersByIDsResponse, error) {	usersPgUUIDs := lo.Map(userIDs, func(userID string, i int) pgtype.UUID {
// }

// type CreateUserParams struct {
// 	Name        string
// 	Email       string
// 	Description string
// 	CreatedAt   time.Time
// 	ImageUrl    string
// 	IsMentor    bool
// }

// func (us *UserService) FindOrCreateUserByEmail(ctx context.Context, params *CreateUserParams) (*schemas.UserPopulatedResponse, error) {
// }

// func (us *UserService) CreateUser(ctx context.Context, params *CreateUserParams) (*schemas.UserPlainResponse, error) {
// }

// type dbWay struct {
// 	Uuid                pgtype.UUID
// 	Name                string
// 	OwnerUuid           pgtype.UUID
// 	GoalDescription     string
// 	UpdatedAt           time.Time
// 	CreatedAt           time.Time
// 	EstimationTime      int32
// 	CopiedFromWayUuid   pgtype.UUID
// 	ProjectUuid         pgtype.UUID
// 	IsCompleted         bool
// 	IsPrivate           bool
// 	WayMetricsTotal     int64
// 	WayMetricsDone      int64
// 	WayFavoriteForUsers int64
// 	WayDayReportsAmount int64
// 	ChildrenUuids       []string
// }

// func (us *UserService) GetPopulatedUserById(ctx context.Context, userUuid uuid.UUID) (*schemas.UserPopulatedResponse, error) {
// }

// func (us *UserService) convertDbWaysToPlainWays(ctx context.Context, dbWays []dbWay) []schemas.WayPlainResponse {
// }

// func (us *UserService) dbCollectionWaysToDbWays(rawWay []db.GetWaysByCollectionIdRow) []dbWay {
// }

// func (us *UserService) dbMentoringWaysToDbWays(rawWay []db.GetMentoringWaysByMentorIdRow) []dbWay {
// }

// func (us *UserService) dbFavoriteWaysToDbWays(rawWay []db.GetFavoriteWaysByUserIdRow) []dbWay {
// }

// func (us *UserService) GetPlainUserWithInfoByIDs(ctx context.Context, projectID string) ([]schemas.UserPlainResponseWithInfo, error) {
// }
