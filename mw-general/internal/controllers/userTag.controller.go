package controllers

import (
	"net/http"

	"mwgeneral/internal/schemas"
	"mwgeneral/internal/services"
	"mwgeneral/pkg/util"

	"github.com/gin-gonic/gin"
)

type UserTagController struct {
	limitService   *services.LimitService
	userTagService *services.UserTagService
}

func NewUserTagController(limitService *services.LimitService, userTagService *services.UserTagService) *UserTagController {
	return &UserTagController{limitService, userTagService}
}

// Create userTag  handler
// @Summary Create a new userTag
// @Description
// @Tags userTag
// @ID create-userTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateUserTagPayload true "query params"
// @Success 200 {object} schemas.UserTagResponse
// @Router /userTags [post]
func (uc *UserTagController) AddUserTagByName(ctx *gin.Context) {
	var payload *schemas.CreateUserTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := uc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
		LimitName: services.MaxUserTags,
		UserID:    payload.OwnerUuid,
	})
	util.HandleErrorGin(ctx, err)

	response, err := uc.userTagService.AddUserTagByName(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, response)
}

// Deleting userTag handlers
// @Summary Delete userTag by UUID
// @Description
// @Tags userTag
// @ID delete-userTag
// @Accept  json
// @Produce  json
// @Param userTagId path string true "userTag ID"
// @Param userId path string true "user ID"
// @Success 204
// @Router /userTags/{userTagId}/{userId} [delete]
func (uc *UserTagController) DeleteUserTagByFromUserByTag(ctx *gin.Context) {
	userID := ctx.Param("userId")
	userTagID := ctx.Param("userTagId")

	err := uc.userTagService.DeleteUserTagByFromUserByTag(ctx, userID, userTagID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
