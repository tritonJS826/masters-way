package services

import (
	"context"
	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

type IUserRepository interface {
	GetUserByEmail(ctx context.Context, userEmail string) (db.User, error)
	CreateUser(ctx context.Context, arg db.CreateUserParams) (db.User, error)
	GetUserById(ctx context.Context, userUuid pgtype.UUID) (db.User, error)
	GetWayCollectionsByUserId(ctx context.Context, ownerUuid pgtype.UUID) ([]db.WayCollection, error)
	GetOwnWaysByUserId(ctx context.Context, ownerUuid pgtype.UUID) ([]db.GetOwnWaysByUserIdRow, error)
	GetMentoringWaysByMentorId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetMentoringWaysByMentorIdRow, error)
	GetFavoriteWaysByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetFavoriteWaysByUserIdRow, error)
	GetMentorUsersByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.User, error)
	GetListWayTagsByWayId(ctx context.Context, wayUuid pgtype.UUID) ([]db.WayTag, error)
	GetWaysByCollectionId(ctx context.Context, wayCollectionUuid pgtype.UUID) ([]db.GetWaysByCollectionIdRow, error)
	GetListUserTagsByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.UserTag, error)
	GetFromUserMentoringRequestWaysByUserId(ctx context.Context, userUuid pgtype.UUID) ([]db.GetFromUserMentoringRequestWaysByUserIdRow, error)
	GetFavoriteUserUuidsByAcceptorUserId(ctx context.Context, acceptorUserUuid pgtype.UUID) ([]pgtype.UUID, error)
	GetFavoriteUserByDonorUserId(ctx context.Context, donorUserUuid pgtype.UUID) ([]db.User, error)
}

type UserService struct {
	IUserRepository
}

func NewUserService(userRepository IUserRepository) *UserService {
	return &UserService{userRepository}
}

type CreateUserParams struct {
	Name        string
	Email       string
	Description string
	CreatedAt   time.Time
	ImageUrl    string
	IsMentor    bool
}

func (userService *UserService) FindOrCreateUserByEmail(ctx context.Context, params *CreateUserParams) (*schemas.UserPopulatedResponse, error) {
	user, err := userService.IUserRepository.GetUserByEmail(ctx, params.Email)

	var userUUID uuid.UUID
	if err == nil {
		userUUID = user.Uuid.Bytes
	} else {
		dbUser, _ := userService.CreateUser(ctx, params)
		userUUID = uuid.MustParse(dbUser.Uuid)
	}

	populatedUser, err := userService.GetPopulatedUserById(ctx, userUUID)
	if err != nil {
		return nil, err
	}

	return populatedUser, nil
}

func (userService *UserService) CreateUser(ctx context.Context, params *CreateUserParams) (*schemas.UserPlainResponse, error) {
	args := db.CreateUserParams{
		Name:        params.Name,
		Email:       params.Email,
		Description: params.Description,
		CreatedAt:   pgtype.Timestamp{Time: params.CreatedAt, Valid: true},
		ImageUrl:    params.ImageUrl,
		IsMentor:    params.IsMentor,
	}

	user, err := userService.IUserRepository.CreateUser(ctx, args)
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
	IsCompleted         bool
	IsPrivate           bool
	WayMetricsTotal     int64
	WayMetricsDone      int64
	WayFavoriteForUsers int64
	WayDayReportsAmount int64
	ChildrenUuids       []string
}

func (userService *UserService) convertDbWaysToPlainWays(ctx context.Context, dbWays []dbWay) []schemas.WayPlainResponse {
	ways := lo.Map(dbWays, func(dbWay dbWay, i int) schemas.WayPlainResponse {
		dbOwner, _ := userService.IUserRepository.GetUserById(ctx, dbWay.OwnerUuid)
		owner := schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbWay.OwnerUuid).String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbOwner.ImageUrl,
			IsMentor:    dbOwner.IsMentor,
		}

		dbMentors, _ := userService.IUserRepository.GetMentorUsersByWayId(ctx, dbWay.Uuid)
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

		dbWayTags, _ := userService.IUserRepository.GetListWayTagsByWayId(ctx, dbWay.Uuid)
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

func (userService *UserService) dbCollectionWaysToDbWays(rawWay []db.GetWaysByCollectionIdRow) []dbWay {
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

func (userService *UserService) dbMentoringWaysToDbWays(rawWay []db.GetMentoringWaysByMentorIdRow) []dbWay {
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

func (userService *UserService) dbFavoriteWaysToDbWays(rawWay []db.GetFavoriteWaysByUserIdRow) []dbWay {
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

func (userService *UserService) GetPopulatedUserById(ctx context.Context, userUuid uuid.UUID) (*schemas.UserPopulatedResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: userUuid, Valid: true}
	user, err := userService.IUserRepository.GetUserById(ctx, userPgUUID)
	if err != nil {
		return nil, err
	}

	dbOwnWays, _ := userService.IUserRepository.GetOwnWaysByUserId(ctx, user.Uuid)
	ownWays := userService.convertDbWaysToPlainWays(ctx, userService.dbOwnWaysToDbWays(dbOwnWays))
	dbMentoringWays, _ := userService.IUserRepository.GetMentoringWaysByMentorId(ctx, user.Uuid)
	mentoringWays := userService.convertDbWaysToPlainWays(ctx, userService.dbMentoringWaysToDbWays(dbMentoringWays))
	dbFavoriteWays, _ := userService.IUserRepository.GetFavoriteWaysByUserId(ctx, user.Uuid)
	favoriteWays := userService.convertDbWaysToPlainWays(ctx, userService.dbFavoriteWaysToDbWays(dbFavoriteWays))

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

	dbWayCollections, _ := userService.IUserRepository.GetWayCollectionsByUserId(ctx, user.Uuid)
	wayCollections := lo.Map(dbWayCollections, func(collection db.WayCollection, i int) schemas.WayCollectionPopulatedResponse {
		dbCollectionWays, _ := userService.IUserRepository.GetWaysByCollectionId(ctx, collection.Uuid)
		dbCollectionWaysPrepared := userService.dbCollectionWaysToDbWays(dbCollectionWays)

		ways := userService.convertDbWaysToPlainWays(ctx, dbCollectionWaysPrepared)

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

	tagsRaw, _ := userService.IUserRepository.GetListUserTagsByUserId(ctx, user.Uuid)
	tags := lo.Map(tagsRaw, func(dbUserTag db.UserTag, i int) schemas.UserTagResponse {
		return schemas.UserTagResponse{
			Name: dbUserTag.Name,
			Uuid: util.ConvertPgUUIDToUUID(dbUserTag.Uuid).String(),
		}
	})

	wayRequestsRaw, _ := userService.IUserRepository.GetFromUserMentoringRequestWaysByUserId(ctx, user.Uuid)
	wayRequests := lo.Map(wayRequestsRaw, func(dbWay db.GetFromUserMentoringRequestWaysByUserIdRow, i int) schemas.WayPlainResponse {
		dbWayTags, _ := userService.IUserRepository.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: util.ConvertPgUUIDToUUID(dbWayTag.Uuid).String(),
				Name: dbWayTag.Name,
			}
		})
		dbMentors, _ := userService.IUserRepository.GetMentorUsersByWayId(ctx, dbWay.Uuid)
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
		dbOwner, _ := userService.IUserRepository.GetUserById(ctx, dbWay.Uuid)
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

	favoriteForUsersUuidRaw, _ := userService.IUserRepository.GetFavoriteUserUuidsByAcceptorUserId(ctx, user.Uuid)
	favoriteForUsersUuid := lo.Map(favoriteForUsersUuidRaw, func(uuid pgtype.UUID, i int) string {
		return util.ConvertPgUUIDToUUID(uuid).String()
	})

	favoriteUsersRaw, _ := userService.IUserRepository.GetFavoriteUserByDonorUserId(ctx, user.Uuid)
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
