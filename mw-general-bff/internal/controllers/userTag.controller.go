package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	//"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	//"mw-general-bff/pkg/utils"
	//"net/http"

	"github.com/gin-gonic/gin"
)

type UserTagController struct {
	generalService *services.GeneralService
}

func NewUserTagController(generalService *services.GeneralService) *UserTagController {
	return &UserTagController{generalService}
}

// Create userTag  handler
// @Summary Create a new userTag
// @Description
// @Tags userTag
// @ID create-userTag
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateUserTagPayload true "query params"
// @Success 200 {object} openapiGeneral.MwserverInternalSchemasUserTagResponse
// @Router /userTags [post]
func (uc *UserTagController) AddUserTagByName(ctx *gin.Context) {
	var payload *schemas.CreateUserTagPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	response, err := uc.generalService.AddUserTagByName(ctx, payload)
	utils.HandleErrorGin(ctx, err)

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

	err := uc.generalService.DeleteUserTagByFromUserByTag(ctx, userTagID, userID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
