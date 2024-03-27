package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	"github.com/samber/lo"
)

type UserController struct {
	db  *db.Queries
	ctx context.Context
}

func NewUserController(db *db.Queries, ctx context.Context) *UserController {
	return &UserController{db, ctx}
}

// @Summary Create a new user
// @Description Email should be unique
// @Tags user
// @ID create-user
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateUserPayload true "query params"
// @Success 200 {object} schemas.UserPlainResponse
// @Router /users [post]
func (cc *UserController) CreateUser(ctx *gin.Context) {
	var payload *schemas.CreateUserPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreateUserParams{
		Name:        payload.Name,
		Email:       payload.Email,
		Description: payload.Description,
		CreatedAt:   now,
		ImageUrl:    sql.NullString{String: payload.ImageUrl, Valid: payload.ImageUrl != ""},
		IsMentor:    payload.IsMentor,
		FirebaseID:  payload.FirebaseId,
	}

	response, err := services.CreateUser(cc.db, ctx, args)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, response)
}

// @Summary Create a new user or return already existent user if user with this firebase id already exist
// @Description Temporal method. Shod be removed after improving auth logic. Email should be unique
// @Tags user
// @ID create-user-if-required
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateUserPayload true "query params"
// @Success 200 {object} schemas.UserPlainResponse
// @Router /users/getOrCreateByFirebaseId [post]
func (cc *UserController) GetOrCreateUserByFirebaseId(ctx *gin.Context) {
	var payload *schemas.CreateUserPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	now := time.Now()
	args := &db.CreateUserParams{
		Name:        payload.Name,
		Email:       payload.Email,
		Description: payload.Description,
		CreatedAt:   now,
		ImageUrl:    sql.NullString{String: payload.ImageUrl, Valid: payload.ImageUrl != ""},
		IsMentor:    payload.IsMentor,
		FirebaseID:  payload.FirebaseId,
	}

	user, err := cc.db.GetUserByFirebaseId(ctx, payload.FirebaseId)
	if err == nil {
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
		ctx.JSON(http.StatusOK, response)
	} else {
		response, _ := services.CreateUser(cc.db, ctx, args)
		ctx.JSON(http.StatusOK, response)
	}

}

// @Summary Update user by UUID
// @Description
// @Tags user
// @ID update-user
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateUserPayload true "query params"
// @Param userId path string true "user ID"
// @Success 200 {object} schemas.UserPlainResponse
// @Router /users/{userId} [patch]
func (cc *UserController) UpdateUser(ctx *gin.Context) {
	var payload *schemas.UpdateUserPayload
	userId := ctx.Param("userId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	args := &db.UpdateUserParams{
		Uuid:        uuid.MustParse(userId),
		Name:        sql.NullString{String: payload.Name, Valid: payload.Name != ""},
		Email:       sql.NullString{String: payload.Email, Valid: payload.Email != ""},
		Description: sql.NullString{String: payload.Description, Valid: payload.Description != ""},
		ImageUrl:    sql.NullString{String: payload.ImageUrl, Valid: payload.ImageUrl != ""},
		IsMentor:    sql.NullBool{Bool: payload.IsMentor, Valid: true},
	}

	user, err := cc.db.UpdateUser(ctx, *args)

	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve user with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	type responseType struct {
		Uuid        uuid.UUID
		Name        string
		Email       string
		Description string
		CreatedAt   time.Time
		ImageUrl    string
		IsMentor    bool
	}

	imageUrl, _ := util.MarshalNullString(user.ImageUrl)
	response := responseType{
		Uuid:        user.Uuid,
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description,
		CreatedAt:   user.CreatedAt,
		ImageUrl:    string(imageUrl),
		IsMentor:    user.IsMentor,
	}

	ctx.JSON(http.StatusOK, response)
}

// @Summary Get user by UUID
// @Description
// @Tags user
// @ID get-user-by-uuid
// @Accept  json
// @Produce  json
// @Param userId path string true "user ID"
// @Success 200 {object} schemas.UserPopulatedResponse
// @Router /users/{userId} [get]
func (cc *UserController) GetUserById(ctx *gin.Context) {
	userId := ctx.Param("userId")

	user, err := cc.db.GetUserById(ctx, uuid.MustParse(userId))
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve user with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	ownWaysRaw, _ := cc.db.GetWayCollectionJoinWayByUserId(ctx, user.Uuid)
	wayCollectionsMap := make(map[string]schemas.WayCollectionPopulatedResponse)
	lo.ForEach(ownWaysRaw, func(collectionJoinWay db.GetWayCollectionJoinWayByUserIdRow, i int) {
		copiedFromWayUuid, _ := util.MarshalNullUuid(collectionJoinWay.WayCopiedFromWayUuid)
		dbWayTags, _ := cc.db.GetListWayTagsByWayId(ctx, collectionJoinWay.WayUuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: dbWayTag.Uuid.String(),
				Name: dbWayTag.Name,
			}
		})
		dbMentors, _ := cc.db.GetMentorUsersByWayId(ctx, collectionJoinWay.WayUuid)
		mentors := lo.Map(dbMentors, func(dbMentor db.User, i int) schemas.UserPlainResponse {
			imageUrl, _ := util.MarshalNullString(dbMentor.ImageUrl)
			return schemas.UserPlainResponse{
				Uuid:        dbMentor.Uuid.String(),
				Name:        dbMentor.Name,
				Email:       dbMentor.Email,
				Description: dbMentor.Description,
				CreatedAt:   dbMentor.CreatedAt.String(),
				ImageUrl:    string(imageUrl),
				IsMentor:    dbMentor.IsMentor,
			}
		})
		dbOwner, _ := cc.db.GetUserById(ctx, collectionJoinWay.WayOwnerUuid)
		imageUrl, _ := util.MarshalNullString(dbOwner.ImageUrl)
		owner := schemas.UserPlainResponse{
			Uuid:        collectionJoinWay.WayOwnerUuid.String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    dbOwner.IsMentor,
		}
		way := schemas.WayPlainResponse{
			Uuid:              collectionJoinWay.WayUuid.String(),
			Name:              collectionJoinWay.WayName,
			GoalDescription:   collectionJoinWay.WayDescription,
			UpdatedAt:         collectionJoinWay.WayUpdatedAt.String(),
			CreatedAt:         collectionJoinWay.WayCreatedAt.String(),
			EstimationTime:    collectionJoinWay.WayEstimationTime,
			IsCompleted:       collectionJoinWay.IsCompleted,
			Owner:             owner,
			CopiedFromWayUuid: string(copiedFromWayUuid),
			IsPrivate:         collectionJoinWay.WayIsPrivate,
			FavoriteForUsers:  int32(collectionJoinWay.WayFavoriteForUsers),
			DayReportsAmount:  int32(collectionJoinWay.WayDayReportsAmount),
			Mentors:           mentors,
			WayTags:           wayTags,
			MetricsDone:       int32(collectionJoinWay.WayMetricsDone),
			MetricsTotal:      int32(collectionJoinWay.WayMetricsTotal),
		}

		// avoid way duplicates
		waysMap := lo.SliceToMap(wayCollectionsMap[collectionJoinWay.CollectionUuid.String()].Ways, func(wayRaw schemas.WayPlainResponse) (string, schemas.WayPlainResponse) {
			return wayRaw.Uuid, wayRaw
		})
		waysMap[way.Uuid] = way
		ways := lo.MapToSlice(waysMap, func(key string, value schemas.WayPlainResponse) schemas.WayPlainResponse {
			return value
		})
		wayCollectionsMap[collectionJoinWay.CollectionUuid.String()] = schemas.WayCollectionPopulatedResponse{
			Uuid:      collectionJoinWay.CollectionUuid.String(),
			Name:      collectionJoinWay.CollectionName,
			CreatedAt: collectionJoinWay.CollectionCreatedAt.String(),
			UpdatedAt: collectionJoinWay.CollectionUpdatedAt.String(),
			OwnerUuid: user.Uuid.String(),
			Ways:      ways,
			Type:      string(collectionJoinWay.CollectionType),
		}

	})

	wayCollections := util.MapToSlice(wayCollectionsMap)
	tagsRaw, _ := cc.db.GetListUserTagsByUserId(ctx, user.Uuid)
	tags := lo.Map(tagsRaw, func(dbUserTag db.UserTag, i int) schemas.UserTagResponse {
		return schemas.UserTagResponse{
			Name: dbUserTag.Name,
			Uuid: dbUserTag.Uuid.String(),
		}
	})

	wayRequestsRaw, _ := cc.db.GetFromUserMentoringRequestWaysByUserId(ctx, user.Uuid)
	wayRequests := lo.Map(wayRequestsRaw, func(dbWay db.GetFromUserMentoringRequestWaysByUserIdRow, i int) schemas.WayPlainResponse {
		copiedFromWayUuid, _ := util.MarshalNullUuid(dbWay.CopiedFromWayUuid)
		dbWayTags, _ := cc.db.GetListWayTagsByWayId(ctx, dbWay.Uuid)
		wayTags := lo.Map(dbWayTags, func(dbWayTag db.WayTag, i int) schemas.WayTagResponse {
			return schemas.WayTagResponse{
				Uuid: dbWayTag.Uuid.String(),
				Name: dbWayTag.Name,
			}
		})
		dbMentors, _ := cc.db.GetMentorUsersByWayId(ctx, dbWay.Uuid)
		mentors := lo.Map(dbMentors, func(dbMentor db.User, i int) schemas.UserPlainResponse {
			imageUrl, _ := util.MarshalNullString(dbMentor.ImageUrl)
			return schemas.UserPlainResponse{
				Uuid:        dbMentor.Uuid.String(),
				Name:        dbMentor.Name,
				Email:       dbMentor.Email,
				Description: dbMentor.Description,
				CreatedAt:   dbMentor.CreatedAt.String(),
				ImageUrl:    string(imageUrl),
				IsMentor:    dbMentor.IsMentor,
			}
		})
		dbOwner, _ := cc.db.GetUserById(ctx, dbWay.Uuid)
		imageUrl, _ := util.MarshalNullString(dbOwner.ImageUrl)
		owner := schemas.UserPlainResponse{
			Uuid:        dbOwner.Uuid.String(),
			Name:        dbOwner.Name,
			Email:       dbOwner.Email,
			Description: dbOwner.Description,
			CreatedAt:   dbOwner.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
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
			CopiedFromWayUuid: string(copiedFromWayUuid),
			IsPrivate:         dbWay.IsPrivate,
			FavoriteForUsers:  int32(dbWay.WayFavoriteForUsers),
			DayReportsAmount:  int32(dbWay.WayDayReportsAmount),
			Mentors:           mentors,
			WayTags:           wayTags,
			MetricsDone:       int32(dbWay.WayMetricsDone),
			MetricsTotal:      int32(dbWay.WayMetricsTotal),
		}
	})

	favoriteForUsersUuidRaw, _ := cc.db.GetFavoriteUserUuidsByAcceptorUserId(ctx, user.Uuid)
	favoriteForUsersUuid := lo.Map(favoriteForUsersUuidRaw, func(uuid uuid.UUID, i int) string {
		return uuid.String()
	})

	favoriteUsersRaw, _ := cc.db.GetFavoriteUserByDonorUserId(ctx, user.Uuid)
	favoriteUsers := lo.Map(favoriteUsersRaw, func(dbUser db.GetFavoriteUserByDonorUserIdRow, i int) schemas.UserPlainResponse {
		imageUrl, _ := util.MarshalNullString(user.ImageUrl)
		return schemas.UserPlainResponse{
			Uuid:        user.Uuid.String(),
			Name:        user.Name,
			Email:       user.Email,
			Description: user.Description,
			CreatedAt:   user.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    user.IsMentor,
		}
	})

	imageUrl, _ := util.MarshalNullString(user.ImageUrl)
	response := schemas.UserPopulatedResponse{
		Uuid:             user.Uuid.String(),
		Name:             user.Name,
		Email:            user.Email,
		Description:      user.Description,
		CreatedAt:        user.CreatedAt.String(),
		ImageUrl:         string(imageUrl),
		IsMentor:         user.IsMentor,
		WayCollections:   wayCollections,
		FavoriteForUsers: favoriteForUsersUuid,
		FavoriteUsers:    favoriteUsers,
		Tags:             tags,
		WayRequests:      wayRequests,
	}

	ctx.JSON(http.StatusOK, response)
}

// @Summary Get all users
// @Description Get users with pagination
// @Tags user
// @ID get-all-users
// @Accept  json
// @Produce  json
// @Param page query integer false "Page number for pagination"
// @Param limit query integer false "Number of items per page"
// @Param email query string false "Part of user email for filters"
// @Param name query string false "Part of user name for filters"
// @Success 200 {object} schemas.GetAllUsersResponse
// @Router /users [get]
func (cc *UserController) GetAllUsers(ctx *gin.Context) {
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "10")
	email := ctx.DefaultQuery("email", "")
	name := ctx.DefaultQuery("name", "")

	reqPageID, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPageID - 1) * reqLimit

	countUsersArgs := &db.CountUsersParams{
		Column1: sql.NullString{String: email, Valid: true},
		Column2: sql.NullString{String: name, Valid: true},
	}
	usersSize, _ := cc.db.CountUsers(ctx, *countUsersArgs)

	listUsersArgs := &db.ListUsersParams{
		Limit:   int32(reqLimit),
		Offset:  int32(offset),
		Column3: sql.NullString{String: email, Valid: true},
		Column4: sql.NullString{String: name, Valid: true},
	}

	users, err := cc.db.ListUsers(ctx, *listUsersArgs)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	response := make([]schemas.UserPlainResponseWithInfo, len(users))
	for i, user := range users {

		userTags := lo.Map(user.TagUuids, func(tagUuid string, i int) schemas.UserTagResponse {
			return schemas.UserTagResponse{
				Uuid: tagUuid,
				Name: user.TagNames[i],
			}
		})

		imageUrl, _ := util.MarshalNullString(user.ImageUrl)
		response[i] = schemas.UserPlainResponseWithInfo{
			Uuid:             user.Uuid.String(),
			Name:             user.Name,
			Description:      user.Description,
			CreatedAt:        user.CreatedAt.String(),
			ImageUrl:         string(imageUrl),
			IsMentor:         user.IsMentor,
			Email:            user.Email,
			FavoriteForUsers: int32(user.FavoriteForUsersAmount),
			FavoriteWays:     int32(user.FavoriteWays),
			MentoringWays:    int32(user.MentoringWaysAmount),
			OwnWays:          int32(user.OwnWaysAmount),
			Tags:             userTags,
		}
	}

	ctx.JSON(http.StatusOK, schemas.GetAllUsersResponse{Size: usersSize, Users: response})
}

// @Summary Delete user by UUID
// @Description
// @Tags user
// @ID delete-user
// @Accept  json
// @Produce  json
// @Param userId path string true "user ID"
// @Success 200
// @Router /users/{userId} [delete]
func (cc *UserController) DeleteUserById(ctx *gin.Context) {
	userId := ctx.Param("userId")

	err := cc.db.DeleteUser(ctx, uuid.MustParse(userId))
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusNoContent, gin.H{"status": "successfully deleted"})

}
