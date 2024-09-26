package services

import (
	"context"
	"fmt"
	db "mwgeneral/internal/db/sqlc"
	"mwgeneral/internal/schemas"
	"mwgeneral/pkg/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type IUserRepository interface {
	CreateUser(ctx context.Context, arg db.CreateUserParams) (db.User, error)
	UpdateUser(ctx context.Context, arg db.UpdateUserParams) (db.User, error)
	GetUserByEmail(ctx context.Context, userEmail string) (db.User, error)
	GetUserById(ctx context.Context, userUuid pgtype.UUID) (db.User, error)
	GetWayCollectionsByUserId(ctx context.Context, ownerUuid pgtype.UUID) ([]db.WayCollection, error)
	GetOwnWaysByUserId(ctx context.Context, ownerUuid pgtype.UUID) ([]db.GetOwnWaysByUserIdRow, error)
	GetMentoringWaysByMentorId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetMentoringWaysByMentorIdRow, error)
	GetFavoriteWaysByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetFavoriteWaysByUserIdRow, error)
	GetMentorUsersByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.User, error)
	GetListWayTagsByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.WayTag, error)
	GetPlainUserWithInfoByIDs(ctx context.Context, projectUuid pgtype.UUID) ([]db.GetPlainUserWithInfoByIDsRow, error)
	GetWaysByCollectionId(ctx context.Context, wayCollectionUuid pgtype.UUID) ([]db.GetWaysByCollectionIdRow, error)
	GetListUserTagsByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.UserTag, error)
	GetFromUserMentoringRequestWaysByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetFromUserMentoringRequestWaysByUserIdRow, error)
	GetFavoriteUserUuidsByAcceptorUserId(ctx context.Context, acceptorUserUuid pgtype.UUID) ([]pgtype.UUID, error)
	GetFavoriteUserByDonorUserId(ctx context.Context, donorUserUuid pgtype.UUID) ([]db.User, error)
	CountUsers(ctx context.Context, arg db.CountUsersParams) (int64, error)
	ListUsers(ctx context.Context, arg db.ListUsersParams) ([]db.ListUsersRow, error)
	GetUsersByIds(ctx context.Context, userUuids []pgtype.UUID) ([]db.GetUsersByIdsRow, error)
}

type UserService struct {
	IUserRepository
}

func NewUserService(userRepository IUserRepository) *UserService {
	return &UserService{userRepository}
}

type UpdateUserParams struct {
	UserID      string
	Name        *string
	Description *string
	ImageUrl    *string
	IsMentor    *bool
}

func (us *UserService) UpdateUser(ctx context.Context, params *UpdateUserParams) (*schemas.UserPlainResponse, error) {
	var description, imageUrl, name pgtype.Text
	var isMentor pgtype.Bool
	if params.Description != nil {
		description = pgtype.Text{String: *params.Description, Valid: true}
	}
	if params.ImageUrl != nil {
		imageUrl = pgtype.Text{String: *params.ImageUrl, Valid: true}
	}
	if params.Name != nil {
		name = pgtype.Text{String: *params.Name, Valid: true}
	}
	if params.IsMentor != nil {
		isMentor = pgtype.Bool{Bool: *params.IsMentor, Valid: true}
	}

	args := db.UpdateUserParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(params.UserID), Valid: true},
		Name:        name,
		Description: description,
		ImageUrl:    imageUrl,
		IsMentor:    isMentor,
	}

	user, err := us.IUserRepository.UpdateUser(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.UserPlainResponse{
		Uuid:        util.ConvertPgUUIDToUUID(user.Uuid).String(),
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description,
		CreatedAt:   user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    user.ImageUrl,
		IsMentor:    user.IsMentor,
	}, nil
}

type GetAllUsersParams struct {
	MentorStatus string
	UserName     string
	UserEmail    string
	Offset       int
	ReqLimit     int
}

func (us *UserService) GetAllUsers(ctx context.Context, params *GetAllUsersParams) (*schemas.GetAllUsersResponse, error) {
	countUsersArgs := db.CountUsersParams{
		Email:        params.UserEmail,
		Name:         params.UserName,
		MentorStatus: params.MentorStatus,
	}
	usersSize, err := us.IUserRepository.CountUsers(ctx, countUsersArgs)
	if err != nil {
		return nil, err
	}

	listUsersArgs := db.ListUsersParams{
		Limit:        int32(params.ReqLimit),
		Offset:       int32(params.Offset),
		Email:        params.UserEmail,
		Name:         params.UserName,
		MentorStatus: params.MentorStatus,
	}

	users, err := us.IUserRepository.ListUsers(ctx, listUsersArgs)
	if err != nil {
		return nil, err
	}

	response := make([]schemas.UserPlainResponseWithInfo, len(users))
	for i, user := range users {

		userTags := lo.Map(user.TagUuids, func(tagUuid string, i int) schemas.UserTagResponse {
			return schemas.UserTagResponse{
				Uuid: tagUuid,
				Name: user.TagNames[i],
			}
		})

		response[i] = schemas.UserPlainResponseWithInfo{
			Uuid:             util.ConvertPgUUIDToUUID(user.Uuid).String(),
			Name:             user.Name,
			Description:      user.Description,
			CreatedAt:        user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:         user.ImageUrl,
			IsMentor:         user.IsMentor,
			Email:            user.Email,
			FavoriteForUsers: int32(user.FavoriteForUsersAmount),
			FavoriteWays:     int32(user.FavoriteWays),
			MentoringWays:    int32(user.MentoringWaysAmount),
			OwnWays:          int32(user.OwnWaysAmount),
			Tags:             userTags,
		}
	}

	return &schemas.GetAllUsersResponse{Size: usersSize, Users: response}, nil
}

func (us *UserService) GetUsersByIDs(ctx context.Context, userIDs []string) ([]schemas.GetUsersByIDsResponse, error) {
	usersPgUUIDs := lo.Map(userIDs, func(userID string, i int) pgtype.UUID {
		return pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}
	})

	dbUsers, err := us.IUserRepository.GetUsersByIds(ctx, usersPgUUIDs)
	if err != nil {
		return nil, err
	}

	dbUsersMap := lo.SliceToMap(dbUsers, func(dbUser db.GetUsersByIdsRow) (string, db.GetUsersByIdsRow) {
		return util.ConvertPgUUIDToUUID(dbUser.Uuid).String(), dbUser
	})

	response := make([]schemas.GetUsersByIDsResponse, 0, len(userIDs))
	for _, userID := range userIDs {
		dbUser, exists := dbUsersMap[userID]
		if !exists {
			return nil, fmt.Errorf("User ID %s not found in the database", userID)
		}

		response = append(response, schemas.GetUsersByIDsResponse{
			UserID:   util.ConvertPgUUIDToUUID(dbUser.Uuid).String(),
			Name:     dbUser.Name,
			ImageURL: dbUser.ImageUrl,
		})
	}

	return response, nil
}

type CreateUserParams struct {
	Name        string
	Email       string
	Description string
	CreatedAt   time.Time
	ImageUrl    string
	IsMentor    bool
}

func (us *UserService) FindOrCreateUserByEmail(ctx context.Context, params *CreateUserParams) (*schemas.UserPopulatedResponse, error) {
	user, err := us.IUserRepository.GetUserByEmail(ctx, params.Email)

	var userUUID uuid.UUID
	if err == nil {
		userUUID = user.Uuid.Bytes
	} else {
		dbUser, _ := us.CreateUser(ctx, params)
		userUUID = uuid.MustParse(dbUser.Uuid)
	}

	populatedUser, err := us.GetPopulatedUserById(ctx, userUUID)
	if err != nil {
		return nil, err
	}

	return populatedUser, nil
}

func (us *UserService) CreateUser(ctx context.Context, params *CreateUserParams) (*schemas.UserPlainResponse, error) {
	args := db.CreateUserParams{
		Name:        params.Name,
		Email:       params.Email,
		Description: params.Description,
		CreatedAt:   pgtype.Timestamp{Time: params.CreatedAt, Valid: true},
		ImageUrl:    params.ImageUrl,
		IsMentor:    params.IsMentor,
	}

	user, err := us.IUserRepository.CreateUser(ctx, args)
	if err != nil {
		return nil, err
	}

	return &schemas.UserPlainResponse{
		Uuid:        util.ConvertPgUUIDToUUID(user.Uuid).String(),
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description,
		CreatedAt:   user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    user.ImageUrl,
		IsMentor:    user.IsMentor,
	}, nil
}

type dbWay struct {
	Uuid                pgtype.UUID
	Name                string
	OwnerUuid           pgtype.UUID
	GoalDescription     string
	UpdatedAt           time.Time
	CreatedAt           time.Time
	EstimationTime      int32
	CopiedFromWayUuid   pgtype.UUID
	ProjectUuid         pgtype.UUID
	IsCompleted         bool
	IsPrivate           bool
	WayMetricsTotal     int64
	WayMetricsDone      int64
	WayFavoriteForUsers int64
	WayDayReportsAmount int64
	ChildrenUuids       []string
}

func (us *UserService) GetPopulatedUserById(ctx context.Context, userUuid uuid.UUID) (*schemas.UserPopulatedResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: userUuid, Valid: true}
	user, err := us.IUserRepository.GetUserById(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	dbOwnWays, _ := us.IUserRepository.GetOwnWaysByUserId(ctx, user.Uuid)
	ownWays := us.convertDbWaysToPlainWays(ctx, us.dbOwnWaysToDbWays(dbOwnWays))
	dbMentoringWays, _ := us.IUserRepository.GetMentoringWaysByMentorId(ctx, user.Uuid)
	mentoringWays := us.convertDbWaysToPlainWays(ctx, us.dbMentoringWaysToDbWays(dbMentoringWays))
	dbFavoriteWays, _ := us.IUserRepository.GetFavoriteWaysByUserId(ctx, user.Uuid)
	favoriteWays := us.convertDbWaysToPlainWays(ctx, us.dbFavoriteWaysToDbWays(dbFavoriteWays))

	defaultCollections := schemas.DefaultWayCollections{
		Own: schemas.WayCollectionPopulatedResponse{
			Uuid:      "00000000-0000-0000-0000-00000000001",
			Name:      "Own",
			Ways:      ownWays,
			CreatedAt: user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: util.ConvertPgUUIDToUUID(user.Uuid).String(),
			Type:      "own",
		},
		Mentoring: schemas.WayCollectionPopulatedResponse{
			Uuid:      "00000000-0000-0000-0000-00000000002",
			Name:      "Mentoring",
			Ways:      mentoringWays,
			CreatedAt: user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: util.ConvertPgUUIDToUUID(user.Uuid).String(),
			Type:      "mentoring",
		},
		Favorite: schemas.WayCollectionPopulatedResponse{
			Uuid:      "00000000-0000-0000-0000-00000000003",
			Name:      "Favorite",
			Ways:      favoriteWays,
			CreatedAt: user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: util.ConvertPgUUIDToUUID(user.Uuid).String(),
			Type:      "favorite",
		},
	}

	dbWayCollections, _ := us.IUserRepository.GetWayCollectionsByUserId(ctx, user.Uuid)
	wayCollections := lo.Map(dbWayCollections, func(collection db.WayCollection, i int) schemas.WayCollectionPopulatedResponse {
		dbCollectionWays, _ := us.IUserRepository.GetWaysByCollectionId(ctx, collection.Uuid)
		dbCollectionWaysPrepared := us.dbCollectionWaysToDbWays(dbCollectionWays)

		ways := us.convertDbWaysToPlainWays(ctx, dbCollectionWaysPrepared)

		wayCollection := schemas.WayCollectionPopulatedResponse{
			Uuid:      util.ConvertPgUUIDToUUID(collection.Uuid).String(),
			Name:      collection.Name,
			Ways:      ways,
			CreatedAt: collection.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: collection.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: util.ConvertPgUUIDToUUID(collection.OwnerUuid).String(),
			Type:      string(collection.Type),
		}
		return wayCollection
	})

	tagsRaw, _ := us.IUserRepository.GetListUserTagsByUserId(ctx, user.Uuid)
	tags := lo.Map(tagsRaw, func(dbUserTag db.UserTag, i int) schemas.UserTagResponse {
		return schemas.UserTagResponse{
			Name: dbUserTag.Name,
			Uuid: util.ConvertPgUUIDToUUID(dbUserTag.Uuid).String(),
		}
	})

	wayRequestsRaw, _ := us.IUserRepository.GetFromUserMentoringRequestWaysByUserId(ctx, user.Uuid)
	wayRequests := lo.Map(wayRequestsRaw, func(dbWay db.GetFromUserMentoringRequestWaysByUserIdRow, i int) schemas.WayPlainResponse {
		dbWayTags, _ := us.IUserRepository.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: util.ConvertPgUUIDToUUID(dbWayTag.Uuid).String(),
				Name: dbWayTag.Name,
			}
		})
		dbMentors, _ := us.IUserRepository.GetMentorUsersByWayId(ctx, dbWay.Uuid)
		mentors := lo.Map(dbMentors, func(dbMentor db.User, i int) schemas.UserPlainResponse {
			return schemas.UserPlainResponse{
				Uuid:        util.ConvertPgUUIDToUUID(dbMentor.Uuid).String(),
				Name:        dbMentor.Name,
				Email:       dbMentor.Email,
				Description: dbMentor.Description,
				CreatedAt:   dbMentor.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				ImageUrl:    dbMentor.ImageUrl,
				IsMentor:    dbMentor.IsMentor,
			}
		})
		dbOwner, _ := us.IUserRepository.GetUserById(ctx, dbWay.Uuid)
		owner := schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbOwner.Uuid).String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbOwner.ImageUrl,
			IsMentor:    dbOwner.IsMentor,
		}
		return schemas.WayPlainResponse{
			Uuid:              util.ConvertPgUUIDToUUID(dbWay.Uuid).String(),
			Name:              dbWay.Name,
			GoalDescription:   dbWay.GoalDescription,
			UpdatedAt:         dbWay.UpdatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			CreatedAt:         dbWay.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			EstimationTime:    dbWay.EstimationTime,
			IsCompleted:       dbWay.IsCompleted,
			ProjectUuid:       util.MarshalPgUUID(dbWay.ProjectUuid),
			Owner:             owner,
			CopiedFromWayUuid: util.MarshalPgUUID(dbWay.CopiedFromWayUuid),
			IsPrivate:         dbWay.IsPrivate,
			FavoriteForUsers:  int32(dbWay.WayFavoriteForUsers),
			DayReportsAmount:  int32(dbWay.WayDayReportsAmount),
			Mentors:           mentors,
			WayTags:           wayTags,
			MetricsDone:       int32(dbWay.WayMetricsDone),
			MetricsTotal:      int32(dbWay.WayMetricsTotal),
			ChildrenUuids:     dbWay.ChildrenUuids,
		}
	})

	favoriteForUsersUuidRaw, _ := us.IUserRepository.GetFavoriteUserUuidsByAcceptorUserId(ctx, user.Uuid)
	favoriteForUsersUuid := lo.Map(favoriteForUsersUuidRaw, func(uuid pgtype.UUID, i int) string {
		return util.ConvertPgUUIDToUUID(uuid).String()
	})

	favoriteUsersRaw, _ := us.IUserRepository.GetFavoriteUserByDonorUserId(ctx, user.Uuid)
	favoriteUsers := lo.Map(favoriteUsersRaw, func(dbUser db.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbUser.Uuid).String(),
			Name:        dbUser.Name,
			Email:       dbUser.Email,
			Description: dbUser.Description,
			CreatedAt:   dbUser.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbUser.ImageUrl,
			IsMentor:    dbUser.IsMentor,
		}
	})

	return &schemas.UserPopulatedResponse{
		Uuid:               util.ConvertPgUUIDToUUID(user.Uuid).String(),
		Name:               user.Name,
		Email:              user.Email,
		Description:        user.Description,
		CreatedAt:          user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:           user.ImageUrl,
		IsMentor:           user.IsMentor,
		WayCollections:     wayCollections,
		DefaultCollections: defaultCollections,
		FavoriteForUsers:   favoriteForUsersUuid,
		FavoriteUsers:      favoriteUsers,
		Tags:               tags,
		WayRequests:        wayRequests,
	}, nil
}

func (us *UserService) convertDbWaysToPlainWays(ctx context.Context, dbWays []dbWay) []schemas.WayPlainResponse {
	ways := lo.Map(dbWays, func(dbWay dbWay, i int) schemas.WayPlainResponse {
		dbOwner, _ := us.IUserRepository.GetUserById(ctx, dbWay.OwnerUuid)
		owner := schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbWay.OwnerUuid).String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbOwner.ImageUrl,
			IsMentor:    dbOwner.IsMentor,
		}

		dbMentors, _ := us.IUserRepository.GetMentorUsersByWayId(ctx, dbWay.Uuid)
		mentors := lo.Map(dbMentors, func(dbMentor db.User, i int) schemas.UserPlainResponse {
			return schemas.UserPlainResponse{
				Uuid:        util.ConvertPgUUIDToUUID(dbMentor.Uuid).String(),
				Name:        dbMentor.Name,
				Email:       dbMentor.Email,
				Description: dbMentor.Description,
				CreatedAt:   dbMentor.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
				ImageUrl:    dbMentor.ImageUrl,
				IsMentor:    dbMentor.IsMentor,
			}
		})

		dbWayTags, _ := us.IUserRepository.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: util.ConvertPgUUIDToUUID(dbWayTag.Uuid).String(),
				Name: dbWayTag.Name,
			}
		})

		return schemas.WayPlainResponse{
			Uuid:              util.ConvertPgUUIDToUUID(dbWay.Uuid).String(),
			Name:              dbWay.Name,
			GoalDescription:   dbWay.GoalDescription,
			UpdatedAt:         dbWay.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			CreatedAt:         dbWay.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			EstimationTime:    dbWay.EstimationTime,
			IsCompleted:       dbWay.IsCompleted,
			Owner:             owner,
			CopiedFromWayUuid: util.MarshalPgUUID(dbWay.CopiedFromWayUuid),
			ProjectUuid:       util.MarshalPgUUID(dbWay.ProjectUuid),
			IsPrivate:         dbWay.IsPrivate,
			FavoriteForUsers:  int32(dbWay.WayFavoriteForUsers),
			DayReportsAmount:  int32(dbWay.WayDayReportsAmount),
			Mentors:           mentors,
			WayTags:           wayTags,
			MetricsDone:       int32(dbWay.WayMetricsDone),
			MetricsTotal:      int32(dbWay.WayMetricsTotal),
			ChildrenUuids:     dbWay.ChildrenUuids,
		}
	})

	return ways
}

func (us *UserService) dbCollectionWaysToDbWays(rawWay []db.GetWaysByCollectionIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw db.GetWaysByCollectionIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt.Time,
			CreatedAt:           dbWayRaw.CreatedAt.Time,
			EstimationTime:      dbWayRaw.EstimationTime,
			CopiedFromWayUuid:   dbWayRaw.CopiedFromWayUuid,
			IsCompleted:         dbWayRaw.IsCompleted,
			IsPrivate:           dbWayRaw.IsPrivate,
			WayMetricsTotal:     dbWayRaw.WayMetricsTotal,
			WayMetricsDone:      dbWayRaw.WayMetricsDone,
			WayFavoriteForUsers: dbWayRaw.WayFavoriteForUsers,
			WayDayReportsAmount: dbWayRaw.WayDayReportsAmount,
			ChildrenUuids:       dbWayRaw.ChildrenUuids,
		}
	})
}

func (userService *UserService) dbOwnWaysToDbWays(rawWay []db.GetOwnWaysByUserIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw db.GetOwnWaysByUserIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt.Time,
			CreatedAt:           dbWayRaw.CreatedAt.Time,
			EstimationTime:      dbWayRaw.EstimationTime,
			CopiedFromWayUuid:   dbWayRaw.CopiedFromWayUuid,
			IsCompleted:         dbWayRaw.IsCompleted,
			IsPrivate:           dbWayRaw.IsPrivate,
			WayMetricsTotal:     dbWayRaw.WayMetricsTotal,
			WayMetricsDone:      dbWayRaw.WayMetricsDone,
			WayFavoriteForUsers: dbWayRaw.WayFavoriteForUsers,
			WayDayReportsAmount: dbWayRaw.WayDayReportsAmount,
			ChildrenUuids:       dbWayRaw.ChildrenUuids,
		}
	})
}

func (us *UserService) dbMentoringWaysToDbWays(rawWay []db.GetMentoringWaysByMentorIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw db.GetMentoringWaysByMentorIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt.Time,
			CreatedAt:           dbWayRaw.CreatedAt.Time,
			EstimationTime:      dbWayRaw.EstimationTime,
			CopiedFromWayUuid:   dbWayRaw.CopiedFromWayUuid,
			IsCompleted:         dbWayRaw.IsCompleted,
			IsPrivate:           dbWayRaw.IsPrivate,
			WayMetricsTotal:     dbWayRaw.WayMetricsTotal,
			WayMetricsDone:      dbWayRaw.WayMetricsDone,
			WayFavoriteForUsers: dbWayRaw.WayFavoriteForUsers,
			WayDayReportsAmount: dbWayRaw.WayDayReportsAmount,
			ChildrenUuids:       dbWayRaw.ChildrenUuids,
		}
	})
}

func (us *UserService) dbFavoriteWaysToDbWays(rawWay []db.GetFavoriteWaysByUserIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw db.GetFavoriteWaysByUserIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt.Time,
			CreatedAt:           dbWayRaw.CreatedAt.Time,
			EstimationTime:      dbWayRaw.EstimationTime,
			CopiedFromWayUuid:   dbWayRaw.CopiedFromWayUuid,
			IsCompleted:         dbWayRaw.IsCompleted,
			IsPrivate:           dbWayRaw.IsPrivate,
			WayMetricsTotal:     dbWayRaw.WayMetricsTotal,
			WayMetricsDone:      dbWayRaw.WayMetricsDone,
			WayFavoriteForUsers: dbWayRaw.WayFavoriteForUsers,
			WayDayReportsAmount: dbWayRaw.WayDayReportsAmount,
			ChildrenUuids:       dbWayRaw.ChildrenUuids,
		}
	})
}

func (us *UserService) GetPlainUserWithInfoByIDs(ctx context.Context, projectID string) ([]schemas.UserPlainResponseWithInfo, error) {
	projectUuid := pgtype.UUID{Bytes: uuid.MustParse(projectID), Valid: true}
	users, err := us.IUserRepository.GetPlainUserWithInfoByIDs(ctx, projectUuid)
	if err != nil {
		return nil, err
	}

	response := make([]schemas.UserPlainResponseWithInfo, len(users))
	for i, user := range users {

		userTags := lo.Map(user.TagUuids, func(tagUuid string, i int) schemas.UserTagResponse {
			return schemas.UserTagResponse{
				Uuid: tagUuid,
				Name: user.TagNames[i],
			}
		})

		response[i] = schemas.UserPlainResponseWithInfo{
			Uuid:             util.ConvertPgUUIDToUUID(user.Uuid).String(),
			Name:             user.Name,
			Description:      user.Description,
			CreatedAt:        user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:         user.ImageUrl,
			IsMentor:         user.IsMentor,
			Email:            user.Email,
			FavoriteForUsers: int32(user.FavoriteForUsersAmount),
			FavoriteWays:     int32(user.FavoriteWays),
			MentoringWays:    int32(user.MentoringWaysAmount),
			OwnWays:          int32(user.OwnWaysAmount),
			Tags:             userTags,
		}
	}

	return response, nil
}
