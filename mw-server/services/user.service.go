package services

import (
	"context"
	dbbPGX "mwserver/db_pgx/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/samber/lo"
)

func FindOrCreateUserByEmail(dbPGX *dbbPGX.Queries, ctx context.Context, args *dbbPGX.CreateUserParams) (schemas.UserPopulatedResponse, error) {
	user, err := dbPGX.GetUserByEmail(ctx, args.Email)
	var userUuid uuid.UUID
	if err == nil {
		userUuid = util.ConvertPgUUIDToUUID(user.Uuid)
	} else {
		dbUser, _ := CreateUser(dbPGX, ctx, args)
		userUuid = uuid.MustParse(dbUser.Uuid)
	}

	populatedUser, err := GetPopulatedUserById(dbPGX, ctx, userUuid)

	return populatedUser, err
}

func CreateUser(dbPGX *dbbPGX.Queries, ctx context.Context, args *dbbPGX.CreateUserParams) (schemas.UserPlainResponse, error) {
	user, err := dbPGX.CreateUser(ctx, *args)
	if err != nil {
		return schemas.UserPlainResponse{}, err
	}

	response := schemas.UserPlainResponse{
		Uuid:        util.ConvertPgUUIDToUUID(user.Uuid).String(),
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description,
		CreatedAt:   user.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    user.ImageUrl,
		IsMentor:    user.IsMentor,
	}

	return response, nil
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

func convertDbWaysToPlainWays(dbPGX *dbbPGX.Queries, ctx context.Context, dbWays []dbWay) []schemas.WayPlainResponse {
	ways := lo.Map(dbWays, func(dbWay dbWay, i int) schemas.WayPlainResponse {
		dbOwner, _ := dbPGX.GetUserById(ctx, dbWay.OwnerUuid)
		owner := schemas.UserPlainResponse{
			Uuid:        util.ConvertPgUUIDToUUID(dbWay.OwnerUuid).String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.Time.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbOwner.ImageUrl,
			IsMentor:    dbOwner.IsMentor,
		}

		dbMentors, _ := dbPGX.GetMentorUsersByWayId(ctx, dbWay.Uuid)
		mentors := lo.Map(dbMentors, func(dbMentor dbbPGX.User, i int) schemas.UserPlainResponse {
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

		dbWayTags, _ := dbPGX.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag dbbPGX.WayTag, i int) schemas.WayTagResponse {
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

func dbCollectionWaysToDbWays(rawWay []dbbPGX.GetWaysByCollectionIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbbPGX.GetWaysByCollectionIdRow, i int) dbWay {
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

func dbOwnWaysToDbWays(rawWay []dbbPGX.GetOwnWaysByUserIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbbPGX.GetOwnWaysByUserIdRow, i int) dbWay {
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

func dbMentoringWaysToDbWays(rawWay []dbbPGX.GetMentoringWaysByMentorIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbbPGX.GetMentoringWaysByMentorIdRow, i int) dbWay {
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

func dbFavoriteWaysToDbWays(rawWay []dbbPGX.GetFavoriteWaysByUserIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbbPGX.GetFavoriteWaysByUserIdRow, i int) dbWay {
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

func GetPopulatedUserById(dbPGX *dbbPGX.Queries, ctx context.Context, userUuid uuid.UUID) (schemas.UserPopulatedResponse, error) {
	userPgUUID := pgtype.UUID{Bytes: userUuid, Valid: true}
	user, err := dbPGX.GetUserById(ctx, userPgUUID)

	dbOwnWays, _ := dbPGX.GetOwnWaysByUserId(ctx, user.Uuid)
	ownWays := convertDbWaysToPlainWays(dbPGX, ctx, dbOwnWaysToDbWays(dbOwnWays))
	dbMentoringWays, _ := dbPGX.GetMentoringWaysByMentorId(ctx, user.Uuid)
	mentoringWays := convertDbWaysToPlainWays(dbPGX, ctx, dbMentoringWaysToDbWays(dbMentoringWays))
	dbFavoriteWays, _ := dbPGX.GetFavoriteWaysByUserId(ctx, user.Uuid)
	favoriteWays := convertDbWaysToPlainWays(dbPGX, ctx, dbFavoriteWaysToDbWays(dbFavoriteWays))

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

	dbWayCollections, _ := dbPGX.GetWayCollectionsByUserId(ctx, user.Uuid)
	wayCollections := lo.Map(dbWayCollections, func(collection dbbPGX.WayCollection, i int) schemas.WayCollectionPopulatedResponse {
		dbCollectionWays, _ := dbPGX.GetWaysByCollectionId(ctx, collection.Uuid)
		dbCollectionWaysPrepared := dbCollectionWaysToDbWays(dbCollectionWays)

		ways := convertDbWaysToPlainWays(dbPGX, ctx, dbCollectionWaysPrepared)

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

	tagsRaw, _ := dbPGX.GetListUserTagsByUserId(ctx, user.Uuid)
	tags := lo.Map(tagsRaw, func(dbUserTag dbbPGX.UserTag, i int) schemas.UserTagResponse {
		return schemas.UserTagResponse{
			Name: dbUserTag.Name,
			Uuid: util.ConvertPgUUIDToUUID(dbUserTag.Uuid).String(),
		}
	})

	wayRequestsRaw, _ := dbPGX.GetFromUserMentoringRequestWaysByUserId(ctx, user.Uuid)
	wayRequests := lo.Map(wayRequestsRaw, func(dbWay dbbPGX.GetFromUserMentoringRequestWaysByUserIdRow, i int) schemas.WayPlainResponse {
		dbWayTags, _ := dbPGX.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag dbbPGX.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: util.ConvertPgUUIDToUUID(dbWayTag.Uuid).String(),
				Name: dbWayTag.Name,
			}
		})
		dbMentors, _ := dbPGX.GetMentorUsersByWayId(ctx, dbWay.Uuid)
		mentors := lo.Map(dbMentors, func(dbMentor dbbPGX.User, i int) schemas.UserPlainResponse {
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
		dbOwner, _ := dbPGX.GetUserById(ctx, dbWay.Uuid)
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

	favoriteForUsersUuidRaw, _ := dbPGX.GetFavoriteUserUuidsByAcceptorUserId(ctx, user.Uuid)
	favoriteForUsersUuid := lo.Map(favoriteForUsersUuidRaw, func(uuid pgtype.UUID, i int) string {
		return util.ConvertPgUUIDToUUID(uuid).String()
	})

	favoriteUsersRaw, _ := dbPGX.GetFavoriteUserByDonorUserId(ctx, user.Uuid)
	favoriteUsers := lo.Map(favoriteUsersRaw, func(dbUser dbbPGX.User, i int) schemas.UserPlainResponse {
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

	response := schemas.UserPopulatedResponse{
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
	}

	return response, err
}
