package controllers

import (
	"github.com/gin-gonic/gin"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"mw-general-bff/pkg/utils"
	"net/http"
)

type FavoriteUserWayController struct {
	generalService *services.GeneralService
}

func NewFavoriteUserWayController(generalService *services.GeneralService) *FavoriteUserWayController {
	return &FavoriteUserWayController{generalService}
}

// Create favoriteUserWay handler
// @Summary Create a new favoriteUserWay
// @Description
// @Tags favoriteUserWay
// @ID create-favoriteUserWay
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateFavoriteUserWayPayload true "query params"
// @Success 204
// @Router /favoriteUserWays [post]
func (fuwc *FavoriteUserWayController) CreateFavoriteUserWay(ctx *gin.Context) {
	var payload schemas.CreateFavoriteUserWayPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	err := fuwc.generalService.CreateFavoriteUserWay(ctx, payload.UserUuid, payload.WayUuid)
	if err != nil {
		utils.HandleErrorGin(ctx, err)
		return
	}

	ctx.Status(http.StatusNoContent)
}

// Deleting favoriteUserWay handlers
// @Summary Delete favoriteUserWay by UUID
// @Description
// @Tags favoriteUserWay
// @ID delete-favoriteUserWay
// @Accept  json
// @Produce  json
// @Param userUuid path string true "user UUID"
// @Param wayUuid path string true "way ID"
// @Success 204
// @Router /favoriteUserWays/{userUuid}/{wayUuid} [delete]
func (fuwc *FavoriteUserWayController) DeleteFavoriteUserWayById(ctx *gin.Context) {
	userID := ctx.Param("userUuid")
	wayID := ctx.Param("wayUuid")

	err := fuwc.generalService.DeleteFavoriteUserWayById(ctx, userID, wayID)
	if err != nil {
		utils.HandleErrorGin(ctx, err)
		return
	}

	ctx.Status(http.StatusNoContent)
}
