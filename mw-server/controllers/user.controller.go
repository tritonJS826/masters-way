package controllers

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"strconv"

	db "mwserver/db/sqlc"
	"mwserver/schemas"
	"mwserver/services"
	"mwserver/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"

	"github.com/samber/lo"
)

type UserController struct {
	db  *db.Queries
	ctx context.Context
}

func NewUserController(db *db.Queries, ctx context.Context) *UserController {
	return &UserController{db, ctx}
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

	var description, imageUrl, name pgtype.Text
	var isMentor pgtype.Bool
	if payload.Description != nil {
		description = pgtype.Text{String: *payload.Description, Valid: true}
	}
	if payload.ImageUrl != nil {
		imageUrl = pgtype.Text{String: *payload.ImageUrl, Valid: true}
	}
	if payload.Name != nil {
		name = pgtype.Text{String: *payload.Name, Valid: true}
	}
	if payload.IsMentor != nil {
		isMentor = pgtype.Bool{Bool: *payload.IsMentor, Valid: true}
	}

	params := db.UpdateUserParams{
		Uuid:        pgtype.UUID{Bytes: uuid.MustParse(userId), Valid: true},
		Name:        name,
		Description: description,
		ImageUrl:    imageUrl,
		IsMentor:    isMentor,
	}

	user, err := cc.db.UpdateUser(ctx, params)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve user with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
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

	populatedUser, err := services.GetPopulatedUserById(cc.db, ctx, uuid.MustParse(userId))
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Failed to retrieve user with this ID"})
			return
		}
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, populatedUser)
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
// @Param mentorStatus query string false "'mentor' | 'all' status for filter"
// @Success 200 {object} schemas.GetAllUsersResponse
// @Router /users [get]
func (cc *UserController) GetAllUsers(ctx *gin.Context) {
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "10")
	email := ctx.DefaultQuery("email", "")
	name := ctx.DefaultQuery("name", "")
	// mentorStatus = "mentor" | "all"
	mentorStatus := ctx.DefaultQuery("mentorStatus", "all")

	reqPageID, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPageID - 1) * reqLimit

	countUsersArgs := db.CountUsersParams{
		Email:        email,
		Name:         name,
		MentorStatus: mentorStatus,
	}
	usersSize, err := cc.db.CountUsers(ctx, countUsersArgs)
	util.HandleErrorGin(ctx, err)

	listUsersArgs := db.ListUsersParams{
		Limit:        int32(reqLimit),
		Offset:       int32(offset),
		Email:        email,
		Name:         name,
		MentorStatus: mentorStatus,
	}

	users, err := cc.db.ListUsers(ctx, listUsersArgs)
	util.HandleErrorGin(ctx, err)

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

	ctx.JSON(http.StatusOK, schemas.GetAllUsersResponse{Size: usersSize, Users: response})
}

// @Summary Get users by ids
// @Description
// @Tags user
// @ID get-users-by-ids
// @Accept  json
// @Produce  json
// @Param request body []string true "query params"
// @Success 200 {object} []schemas.GetUsersByIDsResponse
// @Router /users/list-by-ids [get]
func (cc *UserController) GetUsersByIDs(ctx *gin.Context) {
	var payload []string

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	usersPgUUIDs := lo.Map(payload, func(userID string, i int) pgtype.UUID {
		return pgtype.UUID{Bytes: uuid.MustParse(userID), Valid: true}
	})

	dbUsers, err := cc.db.GetUsersByIds(ctx, usersPgUUIDs)
	util.HandleErrorGin(ctx, err)

	dbUsersMap := lo.SliceToMap(dbUsers, func(dbUser db.GetUsersByIdsRow) (string, db.GetUsersByIdsRow) {
		return util.ConvertPgUUIDToUUID(dbUser.Uuid).String(), dbUser
	})

	response := lo.Map(payload, func(userID string, _ int) schemas.GetUsersByIDsResponse {
		dbUser, exists := dbUsersMap[userID]
		if !exists {
			util.HandleErrorGin(ctx, fmt.Errorf("User ID %s not found in the database", userID))
		}

		return schemas.GetUsersByIDsResponse{
			UserID:   util.ConvertPgUUIDToUUID(dbUser.Uuid).String(),
			Name:     dbUser.Name,
			ImageURL: dbUser.ImageUrl,
		}
	})

	ctx.JSON(http.StatusOK, response)
}
