package services

import (
	"context"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"
	"time"

	"github.com/google/uuid"
	"github.com/samber/lo"
)

func FindOrCreateUserByEmail(db *dbb.Queries, ctx context.Context, args *dbb.CreateUserParams) (schemas.UserPopulatedResponse, error) {
	user, err := db.GetUserByEmail(ctx, args.Email)
	var userUuid uuid.UUID
	if err == nil {
		userUuid = user.Uuid
	} else {
		dbUser, _ := CreateUser(db, ctx, args)
		userUuid = uuid.MustParse(dbUser.Uuid)
	}

	populatedUser, err := GetPopulatedUserById(db, ctx, userUuid)

	return populatedUser, err
}

func CreateUser(db *dbb.Queries, ctx context.Context, args *dbb.CreateUserParams) (schemas.UserPlainResponse, error) {
	user, err := db.CreateUser(ctx, *args)
	if err != nil {
		return schemas.UserPlainResponse{}, err
	}

	response := schemas.UserPlainResponse{
		Uuid:        user.Uuid.String(),
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description,
		CreatedAt:   user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
		ImageUrl:    user.ImageUrl,
		IsMentor:    user.IsMentor,
	}

	return response, nil
}

type dbWay struct {
	Uuid                uuid.UUID
	Name                string
	OwnerUuid           uuid.UUID
	GoalDescription     string
	UpdatedAt           time.Time
	CreatedAt           time.Time
	EstimationTime      int32
	CopiedFromWayUuid   uuid.NullUUID
	IsCompleted         bool
	IsPrivate           bool
	WayMetricsTotal     int64
	WayMetricsDone      int64
	WayFavoriteForUsers int64
	WayDayReportsAmount int64
	ChildrenUuids       []string
}

func convertDbWaysToPlainWays(db *dbb.Queries, ctx context.Context, dbWays []dbWay) []schemas.WayPlainResponse {
	ways := lo.Map(dbWays, func(dbWay dbWay, i int) schemas.WayPlainResponse {
		dbOwner, _ := db.GetUserById(ctx, dbWay.OwnerUuid)
		owner := schemas.UserPlainResponse{
			Uuid:        dbWay.OwnerUuid.String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbOwner.ImageUrl,
			IsMentor:    dbOwner.IsMentor,
		}

		dbMentors, _ := db.GetMentorUsersByWayId(ctx, dbWay.Uuid)
		mentors := lo.Map(dbMentors, func(dbMentor dbb.User, i int) schemas.UserPlainResponse {
			return schemas.UserPlainResponse{
				Uuid:        dbMentor.Uuid.String(),
				Name:        dbMentor.Name,
				Email:       dbMentor.Email,
				Description: dbMentor.Description,
				CreatedAt:   dbMentor.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				ImageUrl:    dbMentor.ImageUrl,
				IsMentor:    dbMentor.IsMentor,
			}
		})

		dbWayTags, _ := db.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag dbb.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: dbWayTag.Uuid.String(),
				Name: dbWayTag.Name,
			}
		})

		return schemas.WayPlainResponse{
			Uuid:              dbWay.Uuid.String(),
			Name:              dbWay.Name,
			GoalDescription:   dbWay.GoalDescription,
			UpdatedAt:         dbWay.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			CreatedAt:         dbWay.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			EstimationTime:    dbWay.EstimationTime,
			IsCompleted:       dbWay.IsCompleted,
			Owner:             owner,
			CopiedFromWayUuid: util.MarshalNullUuid(dbWay.CopiedFromWayUuid),
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

func dbCollectionWaysToDbWays(rawWay []dbb.GetWaysByCollectionIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbb.GetWaysByCollectionIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt,
			CreatedAt:           dbWayRaw.CreatedAt,
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

func dbOwnWaysToDbWays(rawWay []dbb.GetOwnWaysByUserIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbb.GetOwnWaysByUserIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt,
			CreatedAt:           dbWayRaw.CreatedAt,
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

func dbMentoringWaysToDbWays(rawWay []dbb.GetMentoringWaysByMentorIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbb.GetMentoringWaysByMentorIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt,
			CreatedAt:           dbWayRaw.CreatedAt,
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

func dbFavoriteWaysToDbWays(rawWay []dbb.GetFavoriteWaysByUserIdRow) []dbWay {
	return lo.Map(rawWay, func(dbWayRaw dbb.GetFavoriteWaysByUserIdRow, i int) dbWay {
		return dbWay{
			Uuid:                dbWayRaw.Uuid,
			Name:                dbWayRaw.Name,
			OwnerUuid:           dbWayRaw.OwnerUuid,
			GoalDescription:     dbWayRaw.GoalDescription,
			UpdatedAt:           dbWayRaw.UpdatedAt,
			CreatedAt:           dbWayRaw.CreatedAt,
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

func GetPopulatedUserById(db *dbb.Queries, ctx context.Context, userUuid uuid.UUID) (schemas.UserPopulatedResponse, error) {
	user, err := db.GetUserById(ctx, userUuid)

	dbOwnWays, _ := db.GetOwnWaysByUserId(ctx, user.Uuid)
	ownWays := convertDbWaysToPlainWays(db, ctx, dbOwnWaysToDbWays(dbOwnWays))
	dbMentoringWays, _ := db.GetMentoringWaysByMentorId(ctx, user.Uuid)
	mentoringWays := convertDbWaysToPlainWays(db, ctx, dbMentoringWaysToDbWays(dbMentoringWays))
	dbFavoriteWays, _ := db.GetFavoriteWaysByUserId(ctx, user.Uuid)
	favoriteWays := convertDbWaysToPlainWays(db, ctx, dbFavoriteWaysToDbWays(dbFavoriteWays))

	defaultCollections := schemas.DefaultWayCollections{
		Own: schemas.WayCollectionPopulatedResponse{
			Uuid:      "00000000-0000-0000-0000-00000000001",
			Name:      "Own",
			Ways:      ownWays,
			CreatedAt: user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: user.Uuid.String(),
			Type:      "own",
		},
		Mentoring: schemas.WayCollectionPopulatedResponse{
			Uuid:      "00000000-0000-0000-0000-00000000002",
			Name:      "Mentoring",
			Ways:      mentoringWays,
			CreatedAt: user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: user.Uuid.String(),
			Type:      "mentoring",
		},
		Favorite: schemas.WayCollectionPopulatedResponse{
			Uuid:      "00000000-0000-0000-0000-00000000003",
			Name:      "Favorite",
			Ways:      favoriteWays,
			CreatedAt: user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: user.Uuid.String(),
			Type:      "favorite",
		},
	}

	dbWayCollections, _ := db.GetWayCollectionsByUserId(ctx, user.Uuid)
	wayCollections := lo.Map(dbWayCollections, func(collection dbb.WayCollection, i int) schemas.WayCollectionPopulatedResponse {
		dbCollectionWays, _ := db.GetWaysByCollectionId(ctx, collection.Uuid)
		dbCollectionWaysPrepared := dbCollectionWaysToDbWays(dbCollectionWays)

		ways := convertDbWaysToPlainWays(db, ctx, dbCollectionWaysPrepared)

		wayCollection := schemas.WayCollectionPopulatedResponse{
			Uuid:      collection.Uuid.String(),
			Name:      collection.Name,
			Ways:      ways,
			CreatedAt: collection.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			UpdatedAt: collection.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			OwnerUuid: collection.OwnerUuid.String(),
			Type:      string(collection.Type),
		}
		return wayCollection
	})

	tagsRaw, _ := db.GetListUserTagsByUserId(ctx, user.Uuid)
	tags := lo.Map(tagsRaw, func(dbUserTag dbb.UserTag, i int) schemas.UserTagResponse {
		return schemas.UserTagResponse{
			Name: dbUserTag.Name,
			Uuid: dbUserTag.Uuid.String(),
		}
	})

	wayRequestsRaw, _ := db.GetFromUserMentoringRequestWaysByUserId(ctx, user.Uuid)
	wayRequests := lo.Map(wayRequestsRaw, func(dbWay dbb.GetFromUserMentoringRequestWaysByUserIdRow, i int) schemas.WayPlainResponse {
		copiedFromWayUuid := util.MarshalNullUuid(dbWay.CopiedFromWayUuid)
		dbWayTags, _ := db.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag dbb.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: dbWayTag.Uuid.String(),
				Name: dbWayTag.Name,
			}
		})
		dbMentors, _ := db.GetMentorUsersByWayId(ctx, dbWay.Uuid)
		mentors := lo.Map(dbMentors, func(dbMentor dbb.User, i int) schemas.UserPlainResponse {
			return schemas.UserPlainResponse{
				Uuid:        dbMentor.Uuid.String(),
				Name:        dbMentor.Name,
				Email:       dbMentor.Email,
				Description: dbMentor.Description,
				CreatedAt:   dbMentor.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
				ImageUrl:    dbMentor.ImageUrl,
				IsMentor:    dbMentor.IsMentor,
			}
		})
		dbOwner, _ := db.GetUserById(ctx, dbWay.Uuid)
		owner := schemas.UserPlainResponse{
			Uuid:        dbOwner.Uuid.String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbOwner.ImageUrl,
			IsMentor:    dbOwner.IsMentor,
		}
		return schemas.WayPlainResponse{
			Uuid:              dbWay.Uuid.String(),
			Name:              dbWay.Name,
			GoalDescription:   dbWay.GoalDescription,
			UpdatedAt:         dbWay.UpdatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			CreatedAt:         dbWay.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			EstimationTime:    dbWay.EstimationTime,
			IsCompleted:       dbWay.IsCompleted,
			Owner:             owner,
			CopiedFromWayUuid: copiedFromWayUuid,
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

	favoriteForUsersUuidRaw, _ := db.GetFavoriteUserUuidsByAcceptorUserId(ctx, user.Uuid)
	favoriteForUsersUuid := lo.Map(favoriteForUsersUuidRaw, func(uuid uuid.UUID, i int) string {
		return uuid.String()
	})

	favoriteUsersRaw, _ := db.GetFavoriteUserByDonorUserId(ctx, user.Uuid)
	favoriteUsers := lo.Map(favoriteUsersRaw, func(dbUser dbb.User, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        dbUser.Uuid.String(),
			Name:        dbUser.Name,
			Email:       dbUser.Email,
			Description: dbUser.Description,
			CreatedAt:   dbUser.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
			ImageUrl:    dbUser.ImageUrl,
			IsMentor:    dbUser.IsMentor,
		}
	})

	response := schemas.UserPopulatedResponse{
		Uuid:               user.Uuid.String(),
		Name:               user.Name,
		Email:              user.Email,
		Description:        user.Description,
		CreatedAt:          user.CreatedAt.Format(util.DEFAULT_STRING_LAYOUT),
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
