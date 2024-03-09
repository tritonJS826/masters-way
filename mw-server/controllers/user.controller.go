package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
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
	}

	user, err := cc.db.CreateUser(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

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
// @Success 200 {object} GetUserByIdResponseType
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
	for _, collectionJoinWay := range ownWaysRaw {
		way := schemas.WayPlainResponse{
			Uuid:              collectionJoinWay.WayUuid.String(),
			Name:              collectionJoinWay.WayName,
			GoalDescription:   collectionJoinWay.WayDescription,
			UpdatedAt:         collectionJoinWay.WayUpdatedAt.String(),
			CreatedAt:         collectionJoinWay.WayCreatedAt.String(),
			EstimationTime:    collectionJoinWay.WayEstimationTime,
			Status:            collectionJoinWay.WayStatus,
			OwnerUuid:         collectionJoinWay.WayOwnerUuid.String(),
			CopiedFromWayUuid: util.MarshalNullUuid(collectionJoinWay.WayCopiedFromWayUuid).(string),
			IsPrivate:         collectionJoinWay.WayIsPrivate,
		}

		wayCollectionsMap[collectionJoinWay.CollectionUuid.String()] = schemas.WayCollectionPopulatedResponse{
			Uuid:      collectionJoinWay.CollectionUuid.String(),
			Name:      collectionJoinWay.CollectionName,
			CreatedAt: collectionJoinWay.CollectionCreatedAt.String(),
			UpdatedAt: collectionJoinWay.CollectionUpdatedAt.String(),
			OwnerUuid: user.Uuid.String(),
			Ways:      append(wayCollectionsMap[collectionJoinWay.CollectionUuid.String()].Ways, way),
		}

	}

	wayCollections := util.MapToSlice(wayCollectionsMap)
	tagsRaw, _ := cc.db.GetListUserTagsByUserId(ctx, user.Uuid)
	tags := lo.Map(tagsRaw, func(dbUserTag db.UserTag, i int) schemas.UserTagResponse {
		return schemas.UserTagResponse{
			Name: dbUserTag.Name,
			Uuid: dbUserTag.Uuid.String(),
		}
	})

	wayRequestsRaw, _ := cc.db.GetFromUserMentoringRequestWaysByUserId(ctx, user.Uuid)
	wayRequests := lo.Map(wayRequestsRaw, func(dbWay db.Way, i int) schemas.WayPlainResponse {
		return schemas.WayPlainResponse{
			Uuid:              dbWay.Uuid.String(),
			Name:              dbWay.Name,
			GoalDescription:   dbWay.GoalDescription,
			UpdatedAt:         dbWay.UpdatedAt.String(),
			CreatedAt:         dbWay.CreatedAt.String(),
			EstimationTime:    dbWay.EstimationTime,
			Status:            dbWay.Status,
			OwnerUuid:         dbWay.OwnerUuid.String(),
			CopiedFromWayUuid: util.MarshalNullUuid(dbWay.CopiedFromWayUuid).(string),
			IsPrivate:         dbWay.IsPrivate,
		}
	})

	favoriteForUsersUuidRaw, _ := cc.db.GetFavoriteUserUuidsByAcceptorUserId(ctx, user.Uuid)
	favoriteForUsersUuid := lo.Map(favoriteForUsersUuidRaw, func(uuid uuid.UUID, i int) string {
		return uuid.String()
	})

	favoriteUsersRaw, _ := cc.db.GetFavoriteUserByDonorUserId(ctx, user.Uuid)
	favoriteUsers := lo.Map(favoriteUsersRaw, func(dbUser db.User, i int) schemas.UserPlainResponse {
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
// @Success 200 {array} schemas.UserPlainResponse
// @Router /users [get]
func (cc *UserController) GetAllUsers(ctx *gin.Context) {
	var page = ctx.DefaultQuery("page", "1")
	var limit = ctx.DefaultQuery("limit", "10")

	reqPageID, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPageID - 1) * reqLimit

	args := &db.ListUsersParams{
		Limit:  int32(reqLimit),
		Offset: int32(offset),
	}

	users, err := cc.db.ListUsers(ctx, *args)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	if users == nil {
		users = []db.User{}
	}

	response := make([]schemas.UserPlainResponse, len(users))
	for i, user := range users {
		imageUrl, _ := util.MarshalNullString(user.ImageUrl)
		response[i] = schemas.UserPlainResponse{
			Uuid:        user.Uuid.String(),
			Name:        user.Name,
			Description: user.Description,
			CreatedAt:   user.CreatedAt.String(),
			ImageUrl:    string(imageUrl),
			IsMentor:    user.IsMentor,
		}
	}

	ctx.JSON(http.StatusOK, response)
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
