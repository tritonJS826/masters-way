package services

import (
	"context"
	dbb "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/util"

	"github.com/google/uuid"
	"github.com/samber/lo"
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

	response := schemas.UserPlainResponse{
		Uuid:        user.Uuid.String(),
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description,
		CreatedAt:   user.CreatedAt.String(),
		ImageUrl:    util.MarshalNullString(user.ImageUrl),
		IsMentor:    user.IsMentor,
	}

	return response, err
}

func GetPopulatedUserById(db *dbb.Queries, ctx context.Context, userUuid uuid.UUID) (schemas.UserPopulatedResponse, error) {
	user, err := db.GetUserById(ctx, userUuid)

	dbWayCollections, _ := db.GetWayCollectionsByUserId(ctx, user.Uuid)
	wayCollections := lo.Map(dbWayCollections, func(collection dbb.WayCollection, i int) schemas.WayCollectionPopulatedResponse {
		dbWays, _ := db.GetWaysByCollectionId(ctx, collection.Uuid)
		ways := lo.Map(dbWays, func(dbWay dbb.GetWaysByCollectionIdRow, i int) schemas.WayPlainResponse {
			dbOwner, _ := db.GetUserById(ctx, dbWay.OwnerUuid)
			owner := schemas.UserPlainResponse{
				Uuid:        dbWay.OwnerUuid.String(),
				Name:        dbOwner.Name,
				Email:       dbOwner.Email,
				Description: dbOwner.Description,
				CreatedAt:   dbOwner.CreatedAt.String(),
				ImageUrl:    util.MarshalNullString(dbOwner.ImageUrl),
				IsMentor:    dbOwner.IsMentor,
			}

			dbMentors, _ := db.GetMentorUsersByWayId(ctx, dbWay.Uuid)
			mentors := lo.Map(dbMentors, func(dbMentor dbb.User, i int) schemas.UserPlainResponse {
				return schemas.UserPlainResponse{
					Uuid:        dbMentor.Uuid.String(),
					Name:        dbMentor.Name,
					Email:       dbMentor.Email,
					Description: dbMentor.Description,
					CreatedAt:   dbMentor.CreatedAt.String(),
					ImageUrl:    util.MarshalNullString(dbMentor.ImageUrl),
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
				UpdatedAt:         dbWay.UpdatedAt.String(),
				CreatedAt:         dbWay.CreatedAt.String(),
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
			}
		})
		wayCollection := schemas.WayCollectionPopulatedResponse{
			Uuid:      collection.Uuid.String(),
			Name:      collection.Name,
			Ways:      ways,
			CreatedAt: collection.CreatedAt.String(),
			UpdatedAt: collection.UpdatedAt.String(),
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
				CreatedAt:   dbMentor.CreatedAt.String(),
				ImageUrl:    util.MarshalNullString(dbMentor.ImageUrl),
				IsMentor:    dbMentor.IsMentor,
			}
		})
		dbOwner, _ := db.GetUserById(ctx, dbWay.Uuid)
		owner := schemas.UserPlainResponse{
			Uuid:        dbOwner.Uuid.String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.String(),
			ImageUrl:    util.MarshalNullString(dbOwner.ImageUrl),
			IsMentor:    dbOwner.IsMentor,
		}
		return schemas.WayPlainResponse{
			Uuid:              dbWay.Uuid.String(),
			Name:              dbWay.Name,
			GoalDescription:   dbWay.GoalDescription,
			UpdatedAt:         dbWay.UpdatedAt.String(),
			CreatedAt:         dbWay.CreatedAt.String(),
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
		}
	})

	favoriteForUsersUuidRaw, _ := db.GetFavoriteUserUuidsByAcceptorUserId(ctx, user.Uuid)
	favoriteForUsersUuid := lo.Map(favoriteForUsersUuidRaw, func(uuid uuid.UUID, i int) string {
		return uuid.String()
	})

	favoriteUsersRaw, _ := db.GetFavoriteUserByDonorUserId(ctx, user.Uuid)
	favoriteUsers := lo.Map(favoriteUsersRaw, func(dbUser dbb.GetFavoriteUserByDonorUserIdRow, i int) schemas.UserPlainResponse {
		return schemas.UserPlainResponse{
			Uuid:        dbUser.Uuid.String(),
			Name:        dbUser.Name,
			Email:       dbUser.Email,
			Description: dbUser.Description,
			CreatedAt:   dbUser.CreatedAt.String(),
			ImageUrl:    util.MarshalNullString(dbUser.ImageUrl),
			IsMentor:    dbUser.IsMentor,
		}
	})

	response := schemas.UserPopulatedResponse{
		Uuid:             user.Uuid.String(),
		Name:             user.Name,
		Email:            user.Email,
		Description:      user.Description,
		CreatedAt:        user.CreatedAt.String(),
		ImageUrl:         util.MarshalNullString(user.ImageUrl),
		IsMentor:         user.IsMentor,
		WayCollections:   wayCollections,
		FavoriteForUsers: favoriteForUsersUuid,
		FavoriteUsers:    favoriteUsers,
		Tags:             tags,
		WayRequests:      wayRequests,
	}

	return response, err
}
