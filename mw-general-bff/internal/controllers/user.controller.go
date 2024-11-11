package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserController struct {
	generalService *services.GeneralService
}

func NewUserController(generalService *services.GeneralService) *UserController {
	return &UserController{generalService}
}

// @Summary Update user by UUID
// @Description
// @Tags user
// @ID update-user
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateUserPayload true "query params"
// @Param userId path string true "user ID"
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasUserPlainResponse
// @Router /users/{userId} [patch]
func (uc *UserController) UpdateUser(ctx *gin.Context) {
	var payload *schemas.UpdateUserPayload
	userID := ctx.Param("userId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := uc.generalService.UpdateUser(ctx, &services.UpdateUserParams{
		UserID:      userID,
		Name:        payload.Name,
		Description: payload.Description,
		ImageUrl:    payload.ImageUrl,
		IsMentor:    payload.IsMentor,
	})
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, user)
}

// @Summary Get user by UUID
// @Description
// @Tags user
// @ID get-user-by-uuid
// @Accept  json
// @Produce  json
// @Param userId path string true "user ID"
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasUserPopulatedResponse
// @Router /users/{userId} [get]
func (uc *UserController) GetUserById(ctx *gin.Context) {
	userID := ctx.Param("userId")

	populatedUser, err := uc.generalService.GetPopulatedUserById(ctx, uuid.MustParse(userID))
	utils.HandleErrorGin(ctx, err)

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
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasGetAllUsersResponse
// @Router /users [get]
func (uc *UserController) GetAllUsers(ctx *gin.Context) {
	page := ctx.DefaultQuery("page", "1")
	limit := ctx.DefaultQuery("limit", "10")
	email := ctx.DefaultQuery("email", "")
	name := ctx.DefaultQuery("name", "")
	// mentorStatus = "mentor" | "all"
	mentorStatus := ctx.DefaultQuery("mentorStatus", "all")

	reqPage, _ := strconv.Atoi(page)
	reqLimit, _ := strconv.Atoi(limit)

	response, err := uc.generalService.GetAllUsers(ctx, &services.GetAllUsersParams{
		MentorStatus: mentorStatus,
		UserName:     name,
		UserEmail:    email,
		Page:         reqPage,
		Limit:        reqLimit,
	})
	utils.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}
