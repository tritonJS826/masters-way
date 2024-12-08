package controllers

import (
	"net/http"
	"strconv"

	"mw-server/internal/schemas"
	"mw-server/internal/services"
	"mw-server/pkg/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserController struct {
	userService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{userService}
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
func (uc *UserController) UpdateUser(ctx *gin.Context) {
	var payload *schemas.UpdateUserPayload
	userID := ctx.Param("userId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := uc.userService.UpdateUser(ctx, &services.UpdateUserParams{
		UserID:      userID,
		Name:        payload.Name,
		Description: payload.Description,
		ImageUrl:    payload.ImageUrl,
		IsMentor:    payload.IsMentor,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, user)
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
func (uc *UserController) GetUserById(ctx *gin.Context) {
	userID := ctx.Param("userId")

	populatedUser, err := uc.userService.GetPopulatedUserById(ctx, uuid.MustParse(userID))
	util.HandleErrorGin(ctx, err)

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
func (uc *UserController) GetAllUsers(ctx *gin.Context) {
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "10")
	email := ctx.DefaultQuery("email", "")
	name := ctx.DefaultQuery("name", "")
	// mentorStatus = "mentor" | "all"
	mentorStatus := ctx.DefaultQuery("mentorStatus", "all")

	reqPageID, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)
	offset := (reqPageID - 1) * reqLimit

	response, err := uc.userService.GetAllUsers(ctx, &services.GetAllUsersParams{
		MentorStatus: mentorStatus,
		UserName:     name,
		UserEmail:    email,
		Offset:       offset,
		ReqLimit:     reqLimit,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// @Summary Get users by ids
// @Description
// @Tags user
// @ID get-users-by-ids
// @Accept  json
// @Produce  json
// @Param request body []string true "query params"
// @Success 200 {object} []schemas.ShortUser
// @Router /users/list-by-ids [get]
func (uc *UserController) GetUsersByIDs(ctx *gin.Context) {
	var userIDs []string

	if err := ctx.ShouldBindJSON(&userIDs); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	response, err := uc.userService.GetUsersByIDs(ctx, userIDs)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
