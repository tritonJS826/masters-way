package controllers

import (
	"context"
	"database/sql"
	"net/http"
	"strconv"
	"time"

	db "mwserver/db/sqlc"
	"mwserver/schemas"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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
		Description: sql.NullString{String: payload.Description, Valid: payload.Description != ""},
		CreatedAt:   now,
		ImageUrl:    sql.NullString{String: payload.ImageUrl, Valid: payload.ImageUrl != ""},
		IsMentor:    payload.IsMentor,
	}

	user, err := cc.db.CreateUser(ctx, *args)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"error": err.Error()})
		return
	}

	response := schemas.UserPlainResponse{
		Uuid:        user.Uuid,
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description.String,
		CreatedAt:   user.CreatedAt,
		ImageUrl:    user.ImageUrl.String,
		IsMentor:    user.IsMentor,
	}

	ctx.JSON(http.StatusOK, gin.H{"user": response})
}

// @Summary Update user by UUID
// @Description
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

	response := responseType{
		Uuid:        user.Uuid,
		Name:        user.Name,
		Email:       user.Email,
		Description: user.Description.String,
		CreatedAt:   user.CreatedAt,
		ImageUrl:    user.ImageUrl.String,
		IsMentor:    user.IsMentor,
	}

	ctx.JSON(http.StatusOK, gin.H{"user": response})
}

// @Summary Get user by UUID
// @Description
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

	// TODO: replace user with schemas.UserPopulatedResponse in response
	// response := schemas.UserPopulatedResponse{

	// }

	ctx.JSON(http.StatusOK, gin.H{"user": user})
}

// @Summary Get all users
// @Description Get users with pagination
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

	responseUsers := make([]schemas.UserPlainResponse, len(users))
	for i, user := range users {
		responseUsers[i] = schemas.UserPlainResponse{
			Uuid:        user.Uuid,
			Name:        user.Name,
			Description: user.Description.String,
			CreatedAt:   user.CreatedAt,
			ImageUrl:    user.ImageUrl.String,
			IsMentor:    user.IsMentor,
		}
	}

	ctx.JSON(http.StatusOK, gin.H{"users": responseUsers})
}

// @Summary Delete user by UUID
// @Description
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

	ctx.JSON(http.StatusNoContent, gin.H{})

}
